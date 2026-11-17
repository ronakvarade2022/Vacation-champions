import crypto from 'crypto';
import type { Request, Response } from 'express';
import {
  getResolvedRazorpayCredentials,
  sanitizeEnvValue,
  isPlaceholderValue,
  normalizeBackendBoard,
  normalizeBackendClassLevel,
  updateStudentSubscriptionInFirestoreBackend
} from '../firebase/index.ts';
import { serverGetDoc } from '../firebase/admin.ts';
import { verifyAndConfirmCapturedPayment } from '../src/server/razorpayPaymentStatusService.ts';
import {
  getPlanCatalogItem,
  resolvePlanSku,
  type CategoryId,
  type PlanSkuId
} from '../src/data/planCatalog.ts';

export interface WebhookVerificationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Verifies the 'X-Razorpay-Signature' header using RAZORPAY_WEBHOOK_SECRET
 * via HMAC-SHA256 and timing-safe comparison.
 */
export function verifyWebhookSignature(
  rawBody: Buffer | string,
  signatureHeader: string | undefined
): WebhookVerificationResult {
  if (!signatureHeader || typeof signatureHeader !== 'string') {
    return { valid: false, reason: 'Missing X-Razorpay-Signature header.' };
  }

  const rawWebhookSecret = sanitizeEnvValue(process.env.RAZORPAY_WEBHOOK_SECRET);
  const creds = getResolvedRazorpayCredentials();

  const candidateSecrets: string[] = [];
  if (rawWebhookSecret && !isPlaceholderValue(rawWebhookSecret)) {
    candidateSecrets.push(rawWebhookSecret);
  } else if (creds.keySecret) {
    candidateSecrets.push(creds.keySecret);
  }

  if (candidateSecrets.length === 0) {
    return {
      valid: false,
      reason: 'RAZORPAY_WEBHOOK_SECRET is not configured on the server.'
    };
  }

  const bodyBuffer = Buffer.isBuffer(rawBody)
    ? rawBody
    : Buffer.from(String(rawBody), 'utf8');
  const providedSigBuffer = Buffer.from(signatureHeader.trim(), 'utf8');

  for (const secret of candidateSecrets) {
    const expectedHex = crypto
      .createHmac('sha256', secret)
      .update(bodyBuffer)
      .digest('hex');
    const expectedSigBuffer = Buffer.from(expectedHex, 'utf8');

    if (
      providedSigBuffer.length === expectedSigBuffer.length &&
      crypto.timingSafeEqual(providedSigBuffer, expectedSigBuffer)
    ) {
      return { valid: true };
    }
  }

  return {
    valid: false,
    reason: 'X-Razorpay-Signature verification failed.'
  };
}

export interface CapturedPaymentSubscriptionResult {
  success: boolean;
  alreadyProcessed: boolean;
  studentId: string;
  studentName: string;
  selectedBoard: 'Maharashtra' | 'CBSE' | 'ICSE';
  selectedClass: string;
  boardClassKey: string;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  unlockedCategories?: CategoryId[];
  subscriptionTier: 'standard' | 'premium';
  planLabel: string;
  amountInr: number;
  paymentId: string;
  orderId: string;
  method: string;
  startDateIso: string;
  expiryDateIso: string;
  daysRemaining: number;
  receiptNumber: string;
  activatedClasses: string[];
  activatedClassKeys: string[];
  classSubscriptions: Record<string, any>;
  activatedCategoryKeys?: CategoryId[];
  categorySubscriptions?: Record<string, any>;
}

/**
 * Retrieves the user document from Firestore (/students/{studentId}) and updates
 * their per-class subscription (`classSubscriptions[selectedClass]`) with a 365-day
 * expiry date without altering any other class's subscription dates.
 */
export async function processPaymentCapturedEvent(params: {
  paymentEntity: Record<string, any>;
  orderEntity?: Record<string, any>;
  signature: string;
}): Promise<CapturedPaymentSubscriptionResult> {
  const { paymentEntity, orderEntity, signature } = params;

  const paymentId = String(paymentEntity?.id || '').trim();
  if (!paymentId) {
    throw new Error('Missing payment.entity.id in payment.captured event.');
  }

  const orderId = String(
    paymentEntity?.order_id || orderEntity?.id || `order_webhook_${Date.now()}`
  ).trim();
  const amountPaise = Number(
    paymentEntity?.amount || orderEntity?.amount || 0
  );
  const notes = {
    ...(orderEntity?.notes || {}),
    ...(paymentEntity?.notes || {})
  };

  const studentId = String(notes.studentId || notes.userId || '').trim();
  if (!studentId) {
    throw new Error(
      'Missing studentId in payment notes. Cannot associate payment with a Firestore user document.'
    );
  }

  const planId: 'premium' = 'premium';
  const resolvedSku = resolvePlanSku(notes.planSku, notes.planId, amountPaise);
  const planItem = getPlanCatalogItem(resolvedSku);
  const amountInr = planItem.amountInr;
  let method = String(paymentEntity?.method || 'RAZORPAY').toUpperCase();

  if (amountPaise > 0 && amountPaise < planItem.amountPaise) {
    throw new Error(
      `Webhook payment amount (${amountPaise} paise) is below the ₹${amountInr} (${planItem.amountPaise} paise) plan price.`
    );
  }

  // Confirm live payment capture status with Razorpay API using RAZORPAY_KEY_SECRET
  const creds = getResolvedRazorpayCredentials();
  if (creds.isConfigured) {
    const apiCaptureCheck = await verifyAndConfirmCapturedPayment({
      paymentId,
      orderId: paymentEntity?.order_id || orderEntity?.id || '',
      expectedPlanId: planId,
      expectedPlanSku: resolvedSku,
      fallbackMethod: method,
      autoCaptureIfAuthorized: true
    });
    if (!apiCaptureCheck.confirmed) {
      throw new Error(
        apiCaptureCheck.error ||
          `Payment ${paymentId} is not confirmed as captured in Razorpay API.`
      );
    }
    if (apiCaptureCheck.method) {
      method = apiCaptureCheck.method;
    }
  } else if (
    paymentEntity?.status &&
    paymentEntity.status !== 'captured' &&
    paymentEntity.status !== 'authorized'
  ) {
    throw new Error(
      `Webhook payment status '${paymentEntity.status}' is not captured. Subscription was not activated.`
    );
  }

  const existingData = await serverGetDoc('students', studentId).catch(() => null);
  const studentName = String(
    notes.studentName || existingData?.name || 'Student'
  ).trim();
  const email = String(
    notes.email || paymentEntity?.email || existingData?.email || ''
  ).trim();
  const mobile = String(
    notes.mobile || paymentEntity?.contact || existingData?.mobile || ''
  ).trim();
  const selectedBoard = normalizeBackendBoard(
    notes.selectedBoard || notes.board || existingData?.board || 'Maharashtra'
  );
  const selectedClass =
    normalizeBackendClassLevel(notes.selectedClass || notes.classLevel) ||
    normalizeBackendClassLevel(existingData?.classLevel) ||
    'Class 1';

  const activation = await updateStudentSubscriptionInFirestoreBackend({
    studentId,
    studentName,
    email,
    mobile,
    selectedBoard,
    selectedClass,
    planId,
    planSku: resolvedSku,
    paymentId,
    orderId,
    signature,
    method,
    amountInr
  });

  return {
    success: true,
    alreadyProcessed: activation.alreadyProcessed,
    studentId,
    studentName,
    selectedBoard: activation.selectedBoard,
    selectedClass: activation.selectedClass,
    boardClassKey: activation.boardClassKey,
    planId: activation.plan,
    planSku: activation.planSku,
    unlockedCategories: activation.unlockedCategories,
    subscriptionTier: activation.subscriptionTier,
    planLabel: activation.planLabel,
    amountInr,
    paymentId,
    orderId,
    method,
    startDateIso: activation.startDateIso,
    expiryDateIso: activation.expiryDateIso,
    daysRemaining: activation.daysRemaining,
    receiptNumber: activation.receiptNumber,
    activatedClasses: activation.activatedClasses || [activation.selectedClass],
    activatedClassKeys: activation.activatedClassKeys || [activation.boardClassKey],
    classSubscriptions: activation.classSubscriptions || {},
    activatedCategoryKeys: activation.activatedCategoryKeys || [],
    categorySubscriptions: activation.categorySubscriptions || {}
  };
}

/**
 * Express / Cloud Function HTTP Handler for Razorpay Webhooks.
 */
export async function handleRazorpayWebhook(req: Request, res: Response) {
  try {
    const signature =
      (req.headers['x-razorpay-signature'] as string) ||
      (req.headers['X-Razorpay-Signature'] as string);

    const rawBody = Buffer.isBuffer((req as any).body)
      ? ((req as any).body as Buffer)
      : Buffer.from(
          typeof (req as any).body === 'string'
            ? (req as any).body
            : JSON.stringify((req as any).body || {}),
          'utf8'
        );

    const verification = verifyWebhookSignature(rawBody, signature);
    if (!verification.valid) {
      return res.status(400).json({
        status: 'error',
        message: verification.reason || 'Invalid X-Razorpay-Signature.'
      });
    }

    const event = JSON.parse(rawBody.toString('utf8'));
    const eventType = String(event?.event || '');

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderEntity = event?.payload?.order?.entity;

      if (!paymentEntity || !paymentEntity.id) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing payment.entity in webhook payload.'
        });
      }

      const result = await processPaymentCapturedEvent({
        paymentEntity,
        orderEntity,
        signature: signature || 'verified_webhook_signature'
      });

      return res.status(200).json({
        status: 'ok',
        event: eventType,
        studentId: result.studentId,
        selectedBoard: result.selectedBoard,
        selectedClass: result.selectedClass,
        boardClassKey: result.boardClassKey,
        plan: result.planId,
        subscriptionTier: result.subscriptionTier,
        planExpiresAt: result.expiryDateIso,
        validityDays: 365,
        alreadyProcessed: result.alreadyProcessed
      });
    }

    return res.status(200).json({ status: 'ok', event: eventType });
  } catch (error: any) {
    console.error('[functions/webhook.ts Error]:', error);
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Internal webhook processing error.'
    });
  }
}

export default handleRazorpayWebhook;
