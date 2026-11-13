import crypto from 'crypto';
import type { Request, Response } from 'express';
import {
  getResolvedRazorpayCredentials,
  sanitizeEnvValue,
  isPlaceholderValue
} from '../firebase/index.ts';
import { serverGetDoc, serverSetDoc } from '../firebase/admin.ts';
import { verifyAndConfirmCapturedPayment } from '../src/server/razorpayPaymentStatusService.ts';
import {
  computeSubscriptionActivationDates,
  evaluateSubscriptionValidity,
  PAID_SUBSCRIPTION_VALIDITY_DAYS
} from '../src/utils/subscriptionDateUtils.ts';

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
    // When RAZORPAY_WEBHOOK_SECRET is configured, strictly verify using only the webhook secret
    candidateSecrets.push(rawWebhookSecret);
  } else if (creds.keySecret) {
    // Only fall back to API keySecret if RAZORPAY_WEBHOOK_SECRET is unset
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
  planId: 'basic' | 'premium';
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
}

/**
 * Retrieves the user document from Firestore (/students/{studentId}) and updates
 * their subscription status ('premium' or 'standard'/'basic') with a new expiration
 * date set to 365 days from the current date (or +365 days if renewing an active plan).
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
  const subscriptionTier: 'premium' = 'premium';
  const planLabel = 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)';
  const amountInr = 99;
  let method = String(paymentEntity?.method || 'RAZORPAY').toUpperCase();

  if (amountPaise > 0 && amountPaise < 9900) {
    throw new Error(
      `Webhook payment amount (${amountPaise} paise) is below the ₹99 (9900 paise) Premium Plan price.`
    );
  }

  // Confirm live payment capture status with Razorpay API using RAZORPAY_KEY_SECRET
  const creds = getResolvedRazorpayCredentials();
  if (creds.isConfigured) {
    const apiCaptureCheck = await verifyAndConfirmCapturedPayment({
      paymentId,
      orderId: paymentEntity?.order_id || orderEntity?.id || '',
      expectedPlanId: planId,
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

  // 1. Retrieve existing user document from Firestore (/students/{studentId}) via Firebase Admin SDK
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

  const now = new Date();

  // Idempotency protection: if this paymentId was already applied to the user document
  if (existingData?.lastPaymentId && existingData.lastPaymentId === paymentId) {
    const validity = evaluateSubscriptionValidity(
      'premium',
      existingData.planPurchasedAt,
      existingData.planExpiresAt,
      now
    );
    return {
      success: true,
      alreadyProcessed: true,
      studentId,
      studentName,
      planId,
      subscriptionTier,
      planLabel,
      amountInr,
      paymentId,
      orderId,
      method,
      startDateIso: validity.purchaseDateIst || existingData.planPurchasedAt,
      expiryDateIso: validity.expiryDateIst || existingData.planExpiresAt,
      daysRemaining: validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS,
      receiptNumber: `REC-VC-${paymentId.slice(-6).toUpperCase()}`
    };
  }

  // 2. Calculate new expiration date set to 365 days from verified purchase date in IST (or +365 days if renewing before expiry)
  const activation = computeSubscriptionActivationDates({
    verificationTimestamp: now,
    existingPlan: existingData?.plan,
    existingExpiresAt: existingData?.planExpiresAt
  });

  const startDateIso = activation.purchasedDateIst;
  const expiryDateIso = activation.expiryDateIst;
  const daysRemaining = activation.daysRemaining;
  const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;

  // 3. Update the user's Firestore document with the new subscription status and 365-day expiry date via Firebase Admin SDK
  await serverSetDoc(
    'students',
    studentId,
    {
      id: studentId,
      plan: planId,
      subscriptionTier,
      planLabel,
      isLifetimeFree: false,
      planPurchasedAt: startDateIso,
      planExpiresAt: expiryDateIso,
      subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
      subscriptionStatus: 'ACTIVE',
      lastPaymentId: paymentId,
      lastOrderId: orderId,
      lastPaymentAmountInr: amountInr,
      verifiedAtUtc: activation.verifiedAtUtcIso,
      subscriptionUpdatedAt: activation.verifiedAtUtcIso
    },
    { merge: true }
  );

  // 4. Record the verified payment transaction in Firestore (/transactions/tx_{paymentId}) via Firebase Admin SDK
  const safePaymentId = paymentId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const txDocId = safePaymentId.startsWith('tx_')
    ? safePaymentId
    : `tx_${safePaymentId}`;

  await serverSetDoc(
    'transactions',
    txDocId,
    {
      id: txDocId,
      receiptNumber,
      studentId: studentId.slice(0, 128),
      studentName: studentName.slice(0, 100),
      parentEmail: email.slice(0, 150),
      parentMobile: mobile.slice(0, 20),
      planId,
      subscriptionTier,
      planTitle: planLabel,
      amount: amountInr,
      currency: 'INR',
      orderId,
      paymentId,
      signature,
      method,
      status: 'SUCCESS',
      createdAt: now.toISOString(),
      verifiedAt: now.toISOString(),
      membershipStartDate: startDateIso,
      membershipExpiryDate: expiryDateIso,
      savedToFirestoreAt: now.toISOString()
    },
    { merge: true }
  );

  return {
    success: true,
    alreadyProcessed: false,
    studentId,
    studentName,
    planId,
    subscriptionTier,
    planLabel,
    amountInr,
    paymentId,
    orderId,
    method,
    startDateIso,
    expiryDateIso,
    daysRemaining,
    receiptNumber
  };
}

/**
 * Express / Cloud Function HTTP Handler for Razorpay Webhooks.
 * Verifies 'X-Razorpay-Signature', extracts 'payment.captured', retrieves the
 * user document from Firestore, and updates their subscription with a 365-day expiry date.
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
