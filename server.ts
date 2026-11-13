import express, { type Request, type Response, type NextFunction } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import {
  getOrCreateReferralAccount,
  normalizeReferralAccountForClient,
  saveAccountToFirestore,
  processReferralPurchase,
  reverseReferralOnRefund,
  validateReferralCode,
  submitPayoutRequest,
  submitTeacherVerification,
  reviewTeacherVerification,
  processPayoutAction,
  getLeaderboardData,
  getAdminReferralStats,
  trackReferralSignup,
  referralConfig,
  referralTransactions,
  payoutRequests
} from './src/server/referralStore.ts';
import {
  getFirebaseAdminStatus,
  isFirebaseAdminConfigured,
  serverGetDoc,
  verifyAdminRequest,
  verifyBearerIdToken
} from './firebase/admin.ts';
import {
  getResolvedRazorpayCredentials,
  createRazorpayClient,
  createRazorpayOrderBackend,
  createRazorpayQrCodeBackend,
  checkRazorpayQrCodeStatusBackend,
  updateStudentSubscriptionInFirestoreBackend
} from './firebase/index.ts';
import {
  verifyWebhookSignature,
  processPaymentCapturedEvent,
  handleRazorpayWebhook
} from './functions/webhook.ts';
import {
  fetchRazorpayPaymentById,
  verifyAndConfirmCapturedPayment
} from './src/server/razorpayPaymentStatusService.ts';
import {
  verifyRazorpayXPayoutWebhookSignature,
  processRazorpayXPayoutWebhookEvent
} from './src/server/razorpayxPayoutService.ts';
import {
  computeSubscriptionActivationDates,
  evaluateSubscriptionValidity,
  PAID_SUBSCRIPTION_VALIDITY_DAYS
} from './src/utils/subscriptionDateUtils.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// In-memory persistent transaction and membership stores (backed by server runtime)
interface ServerTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  parentEmail: string;
  parentMobile: string;
  planId: 'basic' | 'premium';
  planTitle: string;
  amount: number;
  currency: string;
  orderId: string;
  paymentId: string;
  signature: string;
  method: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt: string;
  verifiedAt?: string;
  membershipStartDate?: string;
  membershipExpiryDate?: string;
}

interface ServerMembership {
  membershipId: string;
  studentId: string;
  studentName: string;
  planId: 'basic' | 'premium';
  planTitle: string;
  amount: number;
  startDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING PAYMENT' | 'PAYMENT FAILED';
  paymentId: string;
  orderId: string;
  daysRemaining: number;
}

const transactionLedger: ServerTransaction[] = [];
const processedPaymentIds = new Set<string>();
const processedOrderIds = new Set<string>();

function sanitizeEnvValue(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']+|["']+$/g, '').trim();
}

function isPlaceholderValue(val: string): boolean {
  if (!val) return true;
  const upper = val.toUpperCase();
  return (
    upper.includes('YOUR_') ||
    upper.includes('MY_') ||
    upper.includes('REPLACE_') ||
    val === 'rzp_test_VACATION_CHAMP'
  );
}

// Get Razorpay client if credentials are configured
function getRazorpayInstance(): Razorpay | null {
  return createRazorpayClient();
}

// 0. CORS & Netlify Function path alias middleware so both /api/* and /.netlify/functions/api/* work seamlessly
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Razorpay-Signature'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace(/^\/\.netlify\/functions\/api/, '/api') || '/api';
  }
  next();
});

// 1. Raw body capture middleware specifically for Razorpay & RazorpayX Webhooks
app.use('/api/razorpay/webhook', express.raw({ type: 'application/json' }));
app.use('/functions/webhook', express.raw({ type: 'application/json' }));
app.use('/api/razorpayx/webhook', express.raw({ type: 'application/json' }));

// 2. Standard JSON parser for all other API endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API ROUTES ---

// 1. Config endpoint - returns public live/test key safely (NEVER the secret)
app.get('/api/razorpay/config', (_req: Request, res: Response) => {
  const creds = getResolvedRazorpayCredentials();

  res.json({
    success: true,
    keyId: creds.keyId || 'rzp_test_VACATION_CHAMP',
    isLive: creds.isLive,
    mode: creds.isLive ? 'LIVE' : 'TEST',
    configured: creds.isConfigured,
    currency: 'INR',
    plans: {
      premium: {
        id: 'premium',
        name: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
        amount: 99,
        amountPaise: 9900,
        currency: 'INR',
        durationDays: 365
      }
    }
  });
});

// 2. Create Order endpoint - Server-authoritative pricing (9900 paise / ₹99 Premium Plan)
app.post('/api/razorpay/create-order', async (req: Request, res: Response) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || 'premium';
    const planId = rawPlan === 'premium' ? 'premium' : null;
    const { studentId, studentName, email, mobile, referralCode } = req.body;

    if (!studentId) {
      return res.status(400).json({ success: false, error: 'Student authentication required.' });
    }

    if (!planId) {
      return res.status(400).json({ success: false, error: 'Invalid plan selected. Only the ₹99 Premium Plan is available for purchase.' });
    }

    try {
      const orderPayload = await createRazorpayOrderBackend({
        planId,
        studentId: String(studentId),
        studentName,
        email,
        mobile,
        referralCode: referralCode ? String(referralCode).trim() : undefined
      });
      console.log(
        `[Razorpay ${orderPayload.mode}] Created order: ${orderPayload.orderId} for student ${studentId} (₹${orderPayload.amountRupees} / ${orderPayload.amount} paise)`
      );
      return res.json(orderPayload);
    } catch (rzpError: any) {
      console.error('[Razorpay API Error creating order]:', rzpError);
      return res.status(502).json({
        success: false,
        error: rzpError?.error?.description || rzpError?.message || 'Razorpay order creation failed. Please verify API credentials.'
      });
    }
  } catch (error: any) {
    console.error('[Create Order Error]:', error);
    return res.status(500).json({ success: false, error: 'Internal server error during order creation.' });
  }
});

// 2.1 Dynamic Razorpay UPI QR Code creation endpoint (₹99 Premium Plan)
app.post('/api/razorpay/create-qr', async (req: Request, res: Response) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || 'premium';
    const planId = rawPlan === 'premium' ? 'premium' : null;
    const { studentId, studentName, email, mobile, referralCode } = req.body;

    if (!studentId) {
      return res.status(400).json({ success: false, error: 'Student authentication required.' });
    }

    if (!planId) {
      return res.status(400).json({ success: false, error: 'Invalid plan selected. Only the ₹99 Premium Plan is available for purchase.' });
    }

    const qrPayload = await createRazorpayQrCodeBackend({
      planId,
      studentId: String(studentId),
      studentName,
      email,
      mobile,
      referralCode: referralCode ? String(referralCode).trim() : undefined
    });

    console.log(`[Razorpay QR] Dynamic QR code created: ${qrPayload.qrId} for student ${studentId} (₹${qrPayload.amountRupees})`);
    return res.json(qrPayload);
  } catch (error: any) {
    console.error('[Create QR Error]:', error);
    return res.status(502).json({
      success: false,
      error: error?.message || 'Razorpay QR Code creation failed.'
    });
  }
});

// 2.2 Live QR Code payment status polling endpoint with automated referral cashback crediting
app.get('/api/razorpay/qr-status/:qrId', async (req: Request, res: Response) => {
  try {
    const { qrId } = req.params;
    const { studentId, planId, studentName, email, mobile, referralCode } = req.query as Record<string, string>;

    if (!qrId) {
      return res.status(400).json({ success: false, error: 'QR Code ID is required.' });
    }

    const statusResult = await checkRazorpayQrCodeStatusBackend({
      qrId: String(qrId),
      studentId: String(studentId || 'student'),
      planId: 'premium',
      studentName,
      email,
      mobile,
      referralCode: referralCode ? String(referralCode).trim() : undefined
    });

    // Credit Referral Cashback on verified QR Payment
    if (statusResult.paid && statusResult.status === 'PAID') {
      const activeReferralCode = referralCode || (statusResult as any).referralCode;
      if (activeReferralCode && typeof activeReferralCode === 'string') {
        try {
          const attribution = await processReferralPurchase({
            referralCode: activeReferralCode,
            buyerStudentId: String(studentId),
            buyerStudentName: String(studentName || 'Student'),
            buyerEmail: String(email || ''),
            buyerMobile: String(mobile || ''),
            planId: 'premium',
            orderId: String(statusResult.orderId || qrId),
            paymentId: String(statusResult.paymentId)
          });
          if (attribution.credited) {
            console.log(`[QR Referral Credited] Code: ${activeReferralCode} | Referrer: ${attribution.referrerName} (+₹${attribution.referrerReward})`);
            (statusResult as any).referral = attribution;
          }
        } catch (refErr) {
          console.error('[QR Referral Crediting Error]:', refErr);
        }
      }
    }

    return res.json(statusResult);
  } catch (error: any) {
    console.error('[Check QR Status Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to check QR code payment status.'
    });
  }
});

// 3. Payment Verification endpoint - HMAC SHA256 cryptographic check
app.post('/api/razorpay/verify-payment', async (req: Request, res: Response) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      planId, 
      studentId,
      studentName,
      email,
      mobile,
      method = 'UPI',
      currentExpiresAt,
      referralCode
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Incomplete transaction information. Missing order or payment ID.' 
      });
    }

    if (!studentId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Student identification missing. Cannot activate membership without verified student account.' 
      });
    }

    if (planId !== 'premium') {
      return res.status(400).json({
        success: false,
        error: 'Only the ₹99 Premium Plan is valid for subscription verification.'
      });
    }

    // Check duplicate payment ID or duplicate order ID (strict idempotency + anti-replay protection)
    if (processedPaymentIds.has(razorpay_payment_id) || processedOrderIds.has(razorpay_order_id)) {
      const existing = transactionLedger.find(
        t => t.paymentId === razorpay_payment_id || t.orderId === razorpay_order_id
      );
      if (existing && existing.studentId && existing.studentId !== String(studentId).trim()) {
        return res.status(403).json({
          success: false,
          error: 'This payment/order belongs to another student account.'
        });
      }
      console.warn(`[Razorpay] Duplicate payment verification blocked for Payment: ${razorpay_payment_id} / Order: ${razorpay_order_id}`);
      const existingSub = serverStudentSubscriptions.get(String(studentId));
      const existingValidity = evaluateSubscriptionValidity(
        'premium',
        existing?.membershipStartDate || existingSub?.planPurchasedAt,
        existing?.membershipExpiryDate || existingSub?.planExpiresAt
      );
      return res.json({
        success: true,
        alreadyProcessed: true,
        transaction: existing,
        membership: existing
          ? {
              membershipId: `mem_${existing.id}`,
              studentId: existing.studentId,
              studentName: existing.studentName,
              planId: existing.planId,
              planTitle: existing.planTitle,
              amount: existing.amount,
              startDate:
                existingValidity.purchaseDateIst ||
                existing.membershipStartDate ||
                '',
              expiryDate:
                existingValidity.expiryDateIst ||
                existing.membershipExpiryDate ||
                existingSub?.planExpiresAt ||
                '',
              status: 'ACTIVE',
              paymentId: existing.paymentId,
              orderId: existing.orderId,
              daysRemaining:
                existingValidity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS
            }
          : undefined,
        message: 'This payment has already been verified and activated.'
      });
    }

    const creds = getResolvedRazorpayCredentials();
    if (!creds.isConfigured || !creds.keySecret) {
      return res.status(500).json({
        success: false,
        error: 'Razorpay LIVE API credentials are not configured on the server.'
      });
    }

    if (!razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing Razorpay cryptographic payment signature.'
      });
    }

    // Genuine Razorpay HMAC SHA256 Signature Verification:
    // generated_signature = hmac_sha256(order_id + "|" + payment_id, secret)
    const expectedSignature = crypto
      .createHmac('sha256', creds.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const expectedBuf = Buffer.from(expectedSignature, 'utf8');
    const providedBuf = Buffer.from(String(razorpay_signature).trim(), 'utf8');
    const isSignatureValid =
      expectedBuf.length === providedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, providedBuf);

    if (!isSignatureValid) {
      console.log(`[Razorpay Signature Mismatch] Order: ${razorpay_order_id}, Payment: ${razorpay_payment_id}`);
      return res.status(400).json({
        success: false,
        error: 'Cryptographic payment signature mismatch. Payment verification failed.'
      });
    }

    // Fetch & confirm payment capture status directly via Razorpay API using server-side RAZORPAY_KEY_SECRET
    let capturedMethod = method;
    const captureStatus = await verifyAndConfirmCapturedPayment({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      expectedPlanId: planId as 'basic' | 'premium',
      fallbackMethod: method,
      autoCaptureIfAuthorized: true
    });

    if (!captureStatus.confirmed) {
      return res.status(400).json({
        success: false,
        error:
          captureStatus.error ||
          `Payment ${razorpay_payment_id} was not confirmed as captured by Razorpay API. Subscription was not activated.`
      });
    }

    // Cross-student replay protection using Razorpay payment/order notes
    const notesStudentId = String(
      captureStatus.notes?.studentId || captureStatus.notes?.userId || ''
    ).trim();
    if (notesStudentId && notesStudentId !== String(studentId).trim()) {
      return res.status(403).json({
        success: false,
        error: 'Payment belongs to a different student account. Cross-student activation rejected.'
      });
    }

    if (captureStatus.method) {
      capturedMethod = captureStatus.method;
    }

    // Calculate 1-year (365-day) membership in IST (Asia/Kolkata) with renewal policy
    const now = new Date();
    const existingServerSub = serverStudentSubscriptions.get(String(studentId));
    const candidateExistingExpiry =
      currentExpiresAt || existingServerSub?.planExpiresAt;
    const activation = computeSubscriptionActivationDates({
      verificationTimestamp: now,
      existingPlan: candidateExistingExpiry ? 'premium' : 'free',
      existingExpiresAt: candidateExistingExpiry
    });

    const verifiedAmount = 99;
    const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;
    const startDateIso = activation.purchasedDateIst;
    const expiryDateIso = activation.expiryDateIst;
    const daysRemaining = activation.daysRemaining;

    const transactionRecord: ServerTransaction = {
      id: `tx_${razorpay_payment_id}`,
      receiptNumber,
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      parentEmail: String(email || ''),
      parentMobile: String(mobile || ''),
      planId: 'premium',
      planTitle: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
      amount: verifiedAmount,
      currency: 'INR',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || 'verified_sig',
      method: capturedMethod,
      status: 'SUCCESS',
      createdAt: activation.verifiedAtUtcIso,
      verifiedAt: activation.verifiedAtUtcIso,
      membershipStartDate: startDateIso,
      membershipExpiryDate: expiryDateIso
    };

    const membershipRecord: ServerMembership = {
      membershipId: `mem_${razorpay_payment_id}`,
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      planId: 'premium',
      planTitle: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
      amount: verifiedAmount,
      startDate: startDateIso,
      expiryDate: expiryDateIso,
      status: 'ACTIVE',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      daysRemaining
    };

    processedPaymentIds.add(razorpay_payment_id);
    processedOrderIds.add(razorpay_order_id);
    transactionLedger.unshift(transactionRecord);

    // Persist verified 365-day subscription and transaction directly to Firestore from backend
    await updateStudentSubscriptionInFirestoreBackend({
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      email: String(email || ''),
      mobile: String(mobile || ''),
      planId: planId as 'basic' | 'premium',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature || 'verified_sig',
      method: capturedMethod,
      amountInr: verifiedAmount,
      currentExpiresAt
    });

    // Also update server-side subscription state immediately
    serverStudentSubscriptions.set(String(studentId), {
      studentId: String(studentId),
      plan: planId as 'basic' | 'premium',
      isLifetimeFree: false,
      planPurchasedAt: startDateIso,
      planExpiresAt: expiryDateIso,
      paymentId: razorpay_payment_id,
      updatedAt: now.toISOString()
    });

    console.log(`[Payment Verified] Student: ${studentId} | Plan: ${planId} | Amount: ₹${verifiedAmount} | Valid till: ${membershipRecord.expiryDate}`);

    // Process Referral Cashback & Commission Attribution (Verified Paid Purchases only)
    let referralResult: any = null;
    if (referralCode && typeof referralCode === 'string') {
      try {
        const attribution = await processReferralPurchase({
          referralCode,
          buyerStudentId: String(studentId),
          buyerStudentName: String(studentName || 'Student'),
          buyerEmail: String(email || ''),
          buyerMobile: String(mobile || ''),
          planId: planId as 'basic' | 'premium',
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });
        if (attribution.credited) {
          referralResult = attribution;
          console.log(`[Referral Reward Applied] Referrer: ${attribution.referrerName} (+₹${attribution.referrerReward}) | Buyer: ${studentName} (+₹${attribution.buyerReward})`);
        } else {
          console.warn(`[Referral Not Credited] Reason: ${attribution.reason}`);
          referralResult = { credited: false, reason: attribution.reason };
        }
      } catch (refErr) {
        console.error('[Referral Processing Error]:', refErr);
      }
    }

    return res.json({
      success: true,
      message: 'Payment verified and Champion membership activated successfully.',
      transaction: transactionRecord,
      membership: membershipRecord,
      referral: referralResult
    });
  } catch (error: any) {
    console.error('[Payment Verification Exception]:', error);
    return res.status(500).json({ success: false, error: 'Internal server error during verification.' });
  }
});

// 3b. Record Failed or Cancelled Payment Attempt (Never activates subscription)
app.post('/api/razorpay/payment-failed', (req: Request, res: Response) => {
  try {
    const {
      orderId = `order_failed_${Date.now()}`,
      paymentId = `pay_failed_${Date.now()}`,
      planId = 'premium',
      studentId = 'unknown_student',
      studentName = 'Student',
      email = '',
      mobile = '',
      method = 'RAZORPAY',
      reason = 'Payment failed or cancelled by user'
    } = req.body || {};

    const validPlanId: 'premium' = 'premium';
    const amount = 99;

    const failedRecord: ServerTransaction = {
      id: `tx_failed_${Date.now()}`,
      receiptNumber: `FAIL-VC-${Date.now().toString().slice(-6)}`,
      studentId: String(studentId),
      studentName: String(studentName),
      parentEmail: String(email),
      parentMobile: String(mobile),
      planId: validPlanId,
      planTitle: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
      amount,
      currency: 'INR',
      orderId: String(orderId),
      paymentId: String(paymentId),
      signature: 'failed_or_cancelled',
      method: String(method),
      status: 'FAILED',
      createdAt: new Date().toISOString()
    };

    transactionLedger.unshift(failedRecord);
    console.log(`[Payment Failed/Cancelled] Student: ${studentId} | Plan: ${validPlanId} | Reason: ${reason}`);

    return res.json({
      success: true,
      recorded: true,
      transaction: failedRecord
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Webhook Endpoint - Genuine Razorpay Server-to-Server Event Handling (payment.captured)
app.post('/api/razorpay/webhook', async (req: Request, res: Response) => {
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

    // 1. Cryptographically verify X-Razorpay-Signature via functions/webhook.ts to prevent fraud
    const sigCheck = verifyWebhookSignature(rawBody, signature);
    if (!sigCheck.valid) {
      console.log(`[Razorpay Webhook] Rejected webhook request: ${sigCheck.reason}`);
      return res.status(400).json({
        status: 'error',
        message: sigCheck.reason || 'Invalid X-Razorpay-Signature.'
      });
    }

    // 2. Parse verified JSON payload from raw body
    const event = JSON.parse(rawBody.toString('utf8'));
    const eventType = String(event?.event || '');
    const paymentEntity = event?.payload?.payment?.entity;
    const orderEntity = event?.payload?.order?.entity;

    console.log(
      `[Razorpay Webhook Event Verified]: ${eventType} | Payment ID: ${paymentEntity?.id || 'N/A'}`
    );

    // 3. Handle 'payment.captured' (and 'order.paid') events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      if (!paymentEntity || !paymentEntity.id) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing payment entity in webhook payload.'
        });
      }

      const paymentId = String(paymentEntity.id);
      const orderId = String(
        paymentEntity.order_id || orderEntity?.id || `order_webhook_${Date.now()}`
      );
      const amountPaise = Number(paymentEntity.amount || orderEntity?.amount || 0);
      const notes = {
        ...(orderEntity?.notes || {}),
        ...(paymentEntity?.notes || {})
      };

      const studentId = String(notes.studentId || notes.userId || '').trim();
      const studentName = String(notes.studentName || 'Student').trim();
      const email = String(notes.email || paymentEntity.email || '').trim();
      const mobile = String(notes.mobile || paymentEntity.contact || '').trim();
      const referralCode = String(notes.referralCode || '').trim();
      const method = String(paymentEntity.method || 'RAZORPAY').toUpperCase();

      // Determine subscription tier ('premium' for ₹99 / 9900 paise)
      const planId: 'premium' = 'premium';
      const subscriptionTier: 'premium' = 'premium';
      const verifiedAmount = 99;

      let firestoreUpdateResult: {
        expiryDateIso: string;
        startDateIso: string;
        daysRemaining: number;
        receiptNumber: string;
        alreadyProcessed: boolean;
      } | null = null;

      if (studentId) {
        // Retrieve the user document from Firestore and update their 365-day subscription via functions/webhook.ts
        firestoreUpdateResult = await processPaymentCapturedEvent({
          paymentEntity,
          orderEntity,
          signature: signature || 'verified_webhook_signature'
        });

        // Synchronize in-memory server subscription cache
        serverStudentSubscriptions.set(studentId, {
          studentId,
          plan: planId,
          isLifetimeFree: false,
          planPurchasedAt: firestoreUpdateResult.startDateIso,
          planExpiresAt: firestoreUpdateResult.expiryDateIso,
          paymentId,
          updatedAt: new Date().toISOString()
        });
      }

      if (!processedPaymentIds.has(paymentId)) {
        processedPaymentIds.add(paymentId);
        if (orderId) {
          processedOrderIds.add(orderId);
        }

        const fallbackActivation = computeSubscriptionActivationDates({
          verificationTimestamp: new Date()
        });
        const nowIso = fallbackActivation.verifiedAtUtcIso;
        const startDateIso =
          firestoreUpdateResult?.startDateIso ||
          fallbackActivation.purchasedDateIst;
        const expiryDateIso =
          firestoreUpdateResult?.expiryDateIso ||
          fallbackActivation.expiryDateIst;
        const receiptNumber =
          firestoreUpdateResult?.receiptNumber ||
          `REC-VC-${Date.now().toString().slice(-6)}`;

        transactionLedger.unshift({
          id: `tx_${paymentId}`,
          receiptNumber,
          studentId: studentId || 'webhook_student',
          studentName,
          parentEmail: email,
          parentMobile: mobile,
          planId,
          planTitle: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
          amount: verifiedAmount,
          currency: 'INR',
          orderId,
          paymentId,
          signature: signature || 'verified_webhook_signature',
          method,
          status: 'SUCCESS',
          createdAt: nowIso,
          verifiedAt: nowIso,
          membershipStartDate: startDateIso,
          membershipExpiryDate: expiryDateIso
        });

        if (studentId && referralCode) {
          try {
            await processReferralPurchase({
              referralCode,
              buyerStudentId: studentId,
              buyerStudentName: studentName,
              buyerEmail: email,
              buyerMobile: mobile,
              planId,
              orderId,
              paymentId
            });
          } catch (refErr) {
            console.error('[Razorpay Webhook Referral Error]:', refErr);
          }
        }
      }

      console.log(
        `[Razorpay Webhook payment.captured] Student: ${studentId || 'N/A'} | Tier: ${subscriptionTier} (${planId}) | Expiry: ${firestoreUpdateResult?.expiryDateIso || '365 Days'}`
      );

      return res.status(200).json({
        status: 'ok',
        event: eventType,
        studentId: studentId || null,
        plan: planId,
        subscriptionTier,
        planExpiresAt: firestoreUpdateResult?.expiryDateIso || null,
        validityDays: 365
      });
    } else if (eventType === 'refund.processed' || eventType === 'refund.created') {
      const paymentId =
        paymentEntity?.id || event?.payload?.refund?.entity?.payment_id;
      if (paymentId) {
        reverseReferralOnRefund(paymentId, `Refund event: ${eventType}`);
        console.log(
          `[Razorpay Webhook] Reverted referral attribution for refunded payment: ${paymentId}`
        );
      }
    }

    return res.status(200).json({ status: 'ok', event: eventType });
  } catch (error: any) {
    console.error('[Razorpay Webhook Error]:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// 4b. Direct Cloud Functions Webhook Route (/functions/webhook)
app.post('/functions/webhook', handleRazorpayWebhook);

// 4c. Fetch & Confirm Razorpay Payment Capture Status via Server-Side RAZORPAY_KEY_SECRET
app.get('/api/razorpay/payment-status/:paymentId', async (req: Request, res: Response) => {
  try {
    const paymentId = String(req.params.paymentId || '').trim();
    const orderId = req.query.orderId ? String(req.query.orderId) : undefined;
    const planId =
      req.query.planId === 'basic' || req.query.planId === 'premium'
        ? (req.query.planId as 'basic' | 'premium')
        : undefined;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment ID is required.'
      });
    }

    const statusResult = await verifyAndConfirmCapturedPayment({
      paymentId,
      orderId,
      expectedPlanId: planId,
      autoCaptureIfAuthorized: true
    });

    try {
      const rawPayment = await fetchRazorpayPaymentById(paymentId);
      return res.json({
        success: statusResult.confirmed,
        ...statusResult,
        razorpayStatus: rawPayment.status
      });
    } catch {
      // Return statusResult directly if raw fetch encountered an error
    }

    return res.json({
      success: statusResult.confirmed,
      ...statusResult
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      confirmed: false,
      error: error?.message || 'Unable to fetch payment status from Razorpay API.'
    });
  }
});

// 5. Admin Payments Ledger API (Protected by Verified Admin Auth)
app.get('/api/payments', async (req: Request, res: Response) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || 'Administrator authentication required.'
    });
  }

  res.json({
    success: true,
    totalCount: transactionLedger.length,
    transactions: transactionLedger
  });
});

// 6. Server Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  const creds = getResolvedRazorpayCredentials();
  const adminStatus = getFirebaseAdminStatus();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    razorpayConfigured: creds.isConfigured,
    razorpayMode: creds.isLive ? 'LIVE' : 'TEST',
    webhookSecretConfigured: creds.hasExplicitWebhookSecret,
    firebaseAdminConfigured: adminStatus.configured,
    firebaseAdminSource: adminStatus.source,
    firestoreDatabaseId: adminStatus.databaseId
  });
});

// ==========================================
// 7. REFERRAL SYSTEM API ROUTES (LEARN • SHARE • GROW • EARN)
// ==========================================

// 7.1 Get or Create User's Referral Profile
app.get('/api/referrals/account/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { userType, name, email, mobile, schoolName } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID required.' });
    }

    const rawAccount = await getOrCreateReferralAccount(
      String(userId),
      (userType as any) || 'student',
      String(name || 'Champion'),
      String(email || ''),
      String(mobile || ''),
      String(schoolName || '')
    );
    const account = normalizeReferralAccountForClient(rawAccount);

    const userTransactions = referralTransactions
      .filter(t => t.referrerId === userId || t.buyerStudentId === userId)
      .slice(0, 30)
      .map(t => ({
        ...t,
        referrerUserId: t.referrerId,
        referrerCode: t.referralCode,
        referredUserId: t.buyerStudentId,
        referredUserName: t.buyerStudentName || 'Student',
        referredUserClass: 'Class 5',
        referredUserMobileMasked: '98******10',
        planPurchased: t.planAmount >= 99 ? 'premium' : 'none',
        planAmountPaid: t.planAmount || 0,
        rewardAmount: t.referrerId === userId ? t.referrerReward : t.buyerReward,
        xpAwarded: t.status === 'CREDITED' ? 200 : 0,
        status: t.status === 'CREDITED' ? 'VERIFIED_REWARDED' : t.status === 'PENDING' ? 'SIGNED_UP_PENDING_PAYMENT' : t.status,
      }));

    const userPayouts = payoutRequests
      .filter(p => p.userId === userId)
      .slice(0, 30)
      .map(p => ({
        ...p,
        userRole: p.userType === 'teacher' ? 'parent' : 'student',
        payoutMethod: p.method || 'BANK',
        bankAccountName: p.bankDetails?.accountHolderName || p.userName,
        bankAccountNumber: p.bankDetails?.accountNumber || '',
        bankIfsc: p.bankDetails?.ifscCode || '',
        status: p.status === 'COMPLETED' ? 'PAID' : p.status === 'REQUESTED' ? 'PENDING' : p.status,
        transactionRefId: p.transactionReference,
        adminRemarks: p.adminNotes,
        requestedAt: p.requestedAt || p.createdAt,
      }));

    return res.json({
      success: true,
      account,
      transactions: userTransactions,
      payouts: userPayouts,
      payoutRequests: userPayouts,
      config: {
        plan49ReferrerReward: referralConfig.plan49ReferrerReward,
        plan49BuyerReward: referralConfig.plan49BuyerReward,
        plan99ReferrerReward: referralConfig.plan99ReferrerReward,
        plan99BuyerReward: referralConfig.plan99BuyerReward,
        minPayoutAmount: referralConfig.minPayoutAmount,
        programEnabled: referralConfig.programEnabled
      }
    });
  } catch (error: any) {
    console.error('[Referral API] Get Account Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.2 Register / Activate Ambassador Account
app.post('/api/referrals/register', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      userType = 'student',
      userRole,
      name,
      userName,
      email,
      mobile,
      schoolName,
      preferredReferralCode,
    } = req.body;
    const resolvedName = String(name || userName || 'Student Champion');
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required.' });
    }

    const rawAccount = await getOrCreateReferralAccount(
      String(userId),
      userType === 'teacher' || userRole === 'teacher' ? 'teacher' : 'student',
      resolvedName,
      String(email || ''),
      String(mobile || ''),
      String(schoolName || ''),
      preferredReferralCode ? String(preferredReferralCode) : undefined
    );
    const account = normalizeReferralAccountForClient(rawAccount);

    return res.json({
      success: true,
      message: `Welcome ${account.name}! Your unique referral code ${account.referralCode} is ready.`,
      account
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.2b Track referral code signup during student registration
app.post('/api/referrals/track-signup', async (req: Request, res: Response) => {
  try {
    const {
      referralCode,
      referralCodeUsed,
      newStudentId,
      newUserId,
      newUserName,
      newUserClass,
      mobile,
    } = req.body;
    const resolvedCode = String(referralCode || referralCodeUsed || '').trim();
    const resolvedStudentId = String(newStudentId || newUserId || '').trim();

    if (!resolvedStudentId) {
      return res.status(400).json({ success: false, error: 'newStudentId / newUserId is required.' });
    }

    if (!resolvedCode) {
      const account = await getOrCreateReferralAccount(
        resolvedStudentId,
        'student',
        String(newUserName || 'Student Champion')
      );
      return res.json({
        success: true,
        tracked: false,
        account: normalizeReferralAccountForClient(account),
      });
    }

    const result = await trackReferralSignup(
      resolvedCode,
      resolvedStudentId,
      String(newUserName || 'Student'),
      String(newUserClass || 'Class 5'),
      String(mobile || '')
    );
    return res.json({ success: result.tracked, ...result });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.2c Record referral link share/invite click
app.post('/api/referrals/invite-click', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const acc = await getOrCreateReferralAccount(String(userId));
      acc.stats.totalClicks += 1;
      await saveAccountToFirestore(acc);
    }
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.3 Validate Referral Code prior to registration or checkout (supports both GET and POST)
const handleValidateReferralCode = async (req: Request, res: Response) => {
  try {
    const code = req.body?.code || req.body?.referralCode || req.query?.code || req.query?.referralCode || '';
    const currentUserId = req.body?.currentUserId || req.body?.studentId || req.query?.currentUserId || req.query?.studentId;
    const resolvedCode = String(code).trim();
    const result = await validateReferralCode(
      resolvedCode,
      currentUserId ? String(currentUserId) : undefined
    );
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ valid: false, error: error.message, message: error.message });
  }
};
app.post('/api/referrals/validate-code', handleValidateReferralCode);
app.get('/api/referrals/validate-code', handleValidateReferralCode);

// 7.4 Request Wallet Payout (Bank or UPI) with Automated RazorpayX Dispatch
app.post('/api/referrals/payout-request', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      amount,
      method,
      payoutMethod,
      upiId,
      bankDetails,
      bankAccountName,
      bankAccountNumber,
      bankIfsc,
    } = req.body;
    const resolvedMethod = (method || payoutMethod || 'BANK') === 'UPI' ? 'UPI' : 'BANK';

    if (!userId || !amount) {
      return res.status(400).json({ success: false, message: 'Missing required withdrawal details.' });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid withdrawal amount.' });
    }

    const resolvedBankDetails = bankDetails || (bankAccountNumber
      ? {
          accountHolderName: String(bankAccountName || '').trim(),
          accountNumber: String(bankAccountNumber || '').trim(),
          ifscCode: String(bankIfsc || '').trim().toUpperCase(),
          bankName: 'Verified Bank Account',
        }
      : undefined);

    const result = await submitPayoutRequest({
      userId: String(userId),
      amount: numAmount,
      method: resolvedMethod,
      upiId: upiId ? String(upiId).trim() : undefined,
      bankDetails: resolvedBankDetails
    });

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 7.5 Get Referral Leaderboard (Students, Teachers, Diamond Ambassadors)
app.get('/api/referrals/leaderboard', (_req: Request, res: Response) => {
  try {
    const data = getLeaderboardData();
    const leaderboard = data.students.map((s, idx) => ({
      rank: idx + 1,
      userId: s.userId,
      userName: s.name,
      className: 'Class 5',
      schoolName: s.schoolName || 'MyStudyZone Academy',
      city: 'Maharashtra',
      successfulReferrals: s.paidReferralsCount,
      totalEarnings: s.totalEarned,
      currentTier:
        s.paidReferralsCount >= 50
          ? 'Diamond'
          : s.paidReferralsCount >= 25
          ? 'Gold'
          : s.paidReferralsCount >= 10
          ? 'Silver'
          : s.paidReferralsCount >= 5
          ? 'Bronze'
          : 'None',
    }));
    return res.json({ success: true, leaderboard, ...data });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.6 Submit Teacher Verification Credentials
app.post('/api/referrals/teacher-verify', async (req: Request, res: Response) => {
  try {
    const { userId, schoolName, teacherIdNumber, credentialsDocUrl } = req.body;
    if (!userId || !schoolName) {
      return res.status(400).json({ success: false, message: 'School name is required for verification.' });
    }

    const result = await submitTeacherVerification({
      userId: String(userId),
      schoolName: String(schoolName),
      teacherIdNumber: teacherIdNumber ? String(teacherIdNumber) : undefined,
      credentialsDocUrl: credentialsDocUrl ? String(credentialsDocUrl) : undefined
    });

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 7.7 Admin Overview & Statistics (Protected)
app.get('/api/referrals/admin/stats', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        error: adminCheck.error || 'Administrator authentication required.'
      });
    }
    const stats = getAdminReferralStats();
    return res.json({ success: true, stats });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7.8 Admin: Verify or Reject Teacher (Protected)
app.post('/api/referrals/admin/verify-teacher', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        message: adminCheck.error || 'Administrator authentication required.'
      });
    }
    const { userId, status, notes } = req.body;
    if (!userId || (status !== 'VERIFIED' && status !== 'REJECTED')) {
      return res.status(400).json({ success: false, message: 'Valid userId and status (VERIFIED/REJECTED) required.' });
    }

    const result = await reviewTeacherVerification(String(userId), status, notes ? String(notes) : '');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 7.9 Admin: Process Payout Action (Approve / Reject) (Protected)
app.post('/api/referrals/admin/payout-action', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        message: adminCheck.error || 'Administrator authentication required.'
      });
    }
    const { payoutId, action, transactionRef, notes } = req.body;
    if (!payoutId || (action !== 'APPROVE' && action !== 'REJECT')) {
      return res.status(400).json({ success: false, message: 'Valid payoutId and action (APPROVE/REJECT) required.' });
    }

    const result = await processPayoutAction(String(payoutId), action, transactionRef, notes);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 7.9b RazorpayX Payout Webhook endpoint (payout.processed, payout.failed, payout.reversed)
app.post('/api/razorpayx/webhook', async (req: Request, res: Response) => {
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

    const isValid = verifyRazorpayXPayoutWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[RazorpayX Webhook] Rejected: Invalid signature');
      return res.status(400).json({ status: 'error', message: 'Invalid X-Razorpay-Signature.' });
    }

    const event = JSON.parse(rawBody.toString('utf8'));
    console.log(`[RazorpayX Payout Webhook Event]: ${event?.event}`);
    const result = await processRazorpayXPayoutWebhookEvent(event);
    return res.json({ status: 'ok', ...result });
  } catch (error: any) {
    console.error('[RazorpayX Webhook Error]:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// 7.10 Admin: Update Referral Configuration (Protected)
app.post('/api/referrals/admin/update-config', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        error: adminCheck.error || 'Administrator authentication required.'
      });
    }
    const updates = req.body;
    if (typeof updates.programEnabled === 'boolean') referralConfig.programEnabled = updates.programEnabled;
    if (typeof updates.budgetCap === 'number') referralConfig.budgetCap = updates.budgetCap;
    if (typeof updates.plan49ReferrerReward === 'number') referralConfig.plan49ReferrerReward = updates.plan49ReferrerReward;
    if (typeof updates.plan49BuyerReward === 'number') referralConfig.plan49BuyerReward = updates.plan49BuyerReward;
    if (typeof updates.plan99ReferrerReward === 'number') referralConfig.plan99ReferrerReward = updates.plan99ReferrerReward;
    if (typeof updates.plan99BuyerReward === 'number') referralConfig.plan99BuyerReward = updates.plan99BuyerReward;
    if (typeof updates.minPayoutAmount === 'number') referralConfig.minPayoutAmount = updates.minPayoutAmount;

    return res.json({ success: true, message: 'Referral system configuration updated.', config: referralConfig });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================================================
// 8. TWO-TIER CLASS-WISE SUBSCRIPTION ENFORCEMENT API (FREE LIFETIME / ₹99 PREMIUM)
// =========================================================================
interface ServerStudentSubscription {
  studentId: string;
  plan: 'free' | 'basic' | 'premium';
  selectedClass?: string;
  activatedClassLevel?: string | null;
  accountRole?: 'student' | 'teacher';
  hasStoredProfile?: boolean;
  isLifetimeFree: boolean;
  planPurchasedAt?: string;
  planExpiresAt?: string | null;
  paymentId?: string;
  updatedAt: string;
}

const serverStudentSubscriptions = new Map<string, ServerStudentSubscription>();

const SERVER_FREE_ALLOWED_SUBJECTS = new Set([
  'English',
  'Mathematics',
  'Mathematics – Algebra',
  'Mathematics – Geometry'
]);

const SERVER_FREE_ALLOWED_FEATURES = new Set([
  'dashboard',
  'profile',
  'demo',
  'puzzles',
  'sudoku',
  'quizzes',
  'worksheets',
  'referrals'
]);

function parseServerWorksheetClass(worksheetId: string): string | null {
  const m = /^WS-C(\d{1,2})-/i.exec(String(worksheetId || '').trim());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n >= 1 && n <= 10) return `Class ${n}`;
  return null;
}

function getServerFreeDemoIdsForClass(classLevel: string = 'Class 1'): string[] {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const mathKey = cNum === 10 ? 'MATHEMATICSALGEBRA' : 'MATHEMATICS';
  return [`WS-C${cNum}-ENGLISH-1`, `WS-C${cNum}-${mathKey}-1`];
}

function evaluateServerSubscription(studentId: string): ServerStudentSubscription {
  const existing = serverStudentSubscriptions.get(studentId);
  if (!existing || existing.plan === 'free') {
    return {
      studentId,
      plan: 'free',
      selectedClass: existing?.selectedClass || 'Class 1',
      activatedClassLevel: null,
      accountRole: existing?.accountRole || 'student',
      hasStoredProfile: Boolean(existing?.hasStoredProfile),
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: existing?.updatedAt || new Date().toISOString()
    };
  }

  // Check if paid plan is still active in IST (Asia/Kolkata)
  if (existing.planExpiresAt) {
    const validity = evaluateSubscriptionValidity(
      existing.plan,
      existing.planPurchasedAt,
      existing.planExpiresAt
    );
    if (validity.isExpired) {
      // Paid plan expired -> automatically falls back to Lifetime Free Plan
      return {
        studentId,
        plan: 'free',
        selectedClass: existing.selectedClass || existing.activatedClassLevel || 'Class 1',
        activatedClassLevel: null,
        accountRole: existing.accountRole || 'student',
        hasStoredProfile: Boolean(existing.hasStoredProfile),
        isLifetimeFree: true,
        planExpiresAt: null,
        updatedAt: new Date().toISOString()
      };
    }
  }

  return existing;
}

async function evaluateServerSubscriptionFromStore(
  studentId: string
): Promise<ServerStudentSubscription> {
  const cleanId = String(studentId || '').trim();
  const cached = cleanId ? serverStudentSubscriptions.get(cleanId) : undefined;
  if (cached) {
    return evaluateServerSubscription(cleanId);
  }

  if (cleanId && cleanId !== 'guest' && !cleanId.startsWith('demo_')) {
    try {
      const data = await serverGetDoc('students', cleanId);
      if (data) {
        const rawPlan = data?.plan;
        if (rawPlan === 'premium' || rawPlan === 'basic') {
          const validity = evaluateSubscriptionValidity(
            rawPlan,
            data?.planPurchasedAt,
            data?.planExpiresAt
          );
          if (!validity.isExpired) {
            const hydrated: ServerStudentSubscription = {
              studentId: cleanId,
              plan: 'premium',
              selectedClass: String(data?.classLevel || 'Class 1'),
              activatedClassLevel: String(data?.activatedClassLevel || data?.classLevel || 'Class 1'),
              accountRole: data?.accountRole === 'teacher' ? 'teacher' : 'student',
              hasStoredProfile: true,
              isLifetimeFree: false,
              planPurchasedAt: data?.planPurchasedAt || validity.purchaseDateIst || undefined,
              planExpiresAt: data?.planExpiresAt || validity.expiryDateIst || null,
              paymentId: data?.lastPaymentId ? String(data.lastPaymentId) : undefined,
              updatedAt: new Date().toISOString()
            };
            serverStudentSubscriptions.set(cleanId, hydrated);
            return hydrated;
          }
        }
        const freeHydrated: ServerStudentSubscription = {
          studentId: cleanId,
          plan: 'free',
          selectedClass: String(data?.classLevel || 'Class 1'),
          activatedClassLevel: null,
          accountRole: data?.accountRole === 'teacher' ? 'teacher' : 'student',
          hasStoredProfile: true,
          isLifetimeFree: true,
          planExpiresAt: null,
          updatedAt: new Date().toISOString()
        };
        serverStudentSubscriptions.set(cleanId, freeHydrated);
        return freeHydrated;
      }
    } catch {
      // Fall back safely to free tier if Firestore lookup is unavailable
    }
  }

  return evaluateServerSubscription(cleanId);
}

// 8.1 Sync student/teacher subscription (paid plans strictly require verified payment proof)
app.post('/api/subscription/sync', async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      plan,
      selectedClass,
      activatedClassLevel,
      accountRole,
      planPurchasedAt,
      planExpiresAt,
      paymentId
    } = req.body || {};
    const cleanStudentId = String(studentId || '').trim();
    if (!cleanStudentId) {
      return res.status(400).json({ success: false, error: 'studentId is required.' });
    }

    // Verify Bearer token identity if provided
    if (req.headers.authorization && isFirebaseAdminConfigured()) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid || !tokenCheck.uid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          error: tokenCheck.error || 'Invalid authentication token.'
        });
      }
      const existingStudent = await serverGetDoc('students', cleanStudentId).catch(() => null);
      const matchesOwner =
        tokenCheck.uid === cleanStudentId ||
        existingStudent?.firebaseUid === tokenCheck.uid;
      if (!matchesOwner) {
        const adminCheck = await verifyAdminRequest(req.headers);
        if (!adminCheck.authorized) {
          return res.status(403).json({
            success: false,
            error: 'Forbidden: Token does not match target student account.'
          });
        }
      }
    }

    const storedStudent = await serverGetDoc('students', cleanStudentId).catch(() => null);
    const resolvedClass = String(
      storedStudent?.classLevel || activatedClassLevel || selectedClass || 'Class 4'
    );
    const resolvedRole =
      storedStudent?.accountRole === 'teacher' || accountRole === 'teacher'
        ? 'teacher'
        : 'student';

    if (plan === 'basic' || plan === 'premium') {
      const cleanPaymentId = String(paymentId || '').trim();
      const isSyntheticPayment =
        !cleanPaymentId ||
        cleanPaymentId.startsWith('pay_sim_') ||
        cleanPaymentId.startsWith('demo_') ||
        cleanPaymentId === 'simulated' ||
        cleanPaymentId.length < 6;

      if (isSyntheticPayment) {
        return res.status(403).json({
          success: false,
          error: 'Paid Premium Plan (₹99) requires a verified paymentId.'
        });
      }

      // Verify payment proof against server ledger, Firestore /transactions, or live Razorpay API
      let paymentVerified = processedPaymentIds.has(cleanPaymentId);
      if (!paymentVerified) {
        const ledgerMatch = transactionLedger.find(
          (t) =>
            t.paymentId === cleanPaymentId &&
            t.status === 'SUCCESS' &&
            t.studentId === cleanStudentId
        );
        if (ledgerMatch) {
          paymentVerified = true;
        }
      }

      if (!paymentVerified) {
        const safePaymentId = cleanPaymentId.replace(/[^a-zA-Z0-9_-]/g, '_');
        const txDocId = safePaymentId.startsWith('tx_')
          ? safePaymentId
          : `tx_${safePaymentId}`;
        const txDoc = await serverGetDoc('transactions', txDocId).catch(() => null);
        if (
          txDoc &&
          txDoc.status === 'SUCCESS' &&
          (!txDoc.studentId || txDoc.studentId === cleanStudentId)
        ) {
          paymentVerified = true;
          processedPaymentIds.add(cleanPaymentId);
        }
      }

      if (!paymentVerified && storedStudent?.lastPaymentId === cleanPaymentId && storedStudent?.plan === 'premium') {
        paymentVerified = true;
      }

      if (!paymentVerified && getResolvedRazorpayCredentials().isConfigured) {
        const apiCheck = await verifyAndConfirmCapturedPayment({
          paymentId: cleanPaymentId,
          expectedPlanId: 'premium',
          autoCaptureIfAuthorized: false
        });
        const notesSid = String(apiCheck.notes?.studentId || '').trim();
        if (apiCheck.confirmed && (!notesSid || notesSid === cleanStudentId)) {
          paymentVerified = true;
          processedPaymentIds.add(cleanPaymentId);
        }
      }

      if (!paymentVerified) {
        return res.status(403).json({
          success: false,
          error: 'Unverified paymentId. Premium subscription sync rejected.'
        });
      }

      const fallbackDates = computeSubscriptionActivationDates({
        verificationTimestamp: storedStudent?.planPurchasedAt || planPurchasedAt || new Date()
      });
      const record: ServerStudentSubscription = {
        studentId: cleanStudentId,
        plan: 'premium',
        selectedClass: resolvedClass,
        activatedClassLevel: resolvedClass,
        accountRole: resolvedRole,
        hasStoredProfile:
          Boolean(storedStudent) ||
          (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')),
        isLifetimeFree: false,
        planPurchasedAt: storedStudent?.planPurchasedAt || planPurchasedAt || fallbackDates.purchasedDateIst,
        planExpiresAt: storedStudent?.planExpiresAt || planExpiresAt || fallbackDates.expiryDateIst,
        paymentId: cleanPaymentId,
        updatedAt: new Date().toISOString()
      };
      serverStudentSubscriptions.set(cleanStudentId, record);
      return res.json({ success: true, subscription: record });
    }

    // Default / Free Lifetime Plan
    const freeRecord: ServerStudentSubscription = {
      studentId: cleanStudentId,
      plan: 'free',
      selectedClass: resolvedClass,
      activatedClassLevel: null,
      accountRole: resolvedRole,
      hasStoredProfile:
        Boolean(storedStudent) ||
        (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')),
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: new Date().toISOString()
    };
    serverStudentSubscriptions.set(cleanStudentId, freeRecord);
    return res.json({ success: true, subscription: freeRecord });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 8.2 Get student/teacher subscription status
app.get('/api/subscription/status/:studentId', async (req: Request, res: Response) => {
  const studentId = String(req.params.studentId || '');
  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const userClass = sub.selectedClass || sub.activatedClassLevel || 'Class 1';
  const demoIds = getServerFreeDemoIdsForClass(userClass);
  return res.json({
    success: true,
    subscription: sub,
    plans: {
      free: {
        id: 'free',
        name: 'Free Plan',
        priceInr: 0,
        validity: 'Lifetime (Never Expires)',
        selectedClass: userClass,
        allowedSubjects: Array.from(SERVER_FREE_ALLOWED_SUBJECTS),
        allowedWorksheets: demoIds,
        allowedFeatures: Array.from(SERVER_FREE_ALLOWED_FEATURES)
      },
      premium: {
        id: 'premium',
        name: 'Premium Plan',
        priceInr: 99,
        validity: '1 Year (365 Days)',
        selectedClass: sub.activatedClassLevel || userClass,
        allowedSubjects: 'ALL_SUBJECTS_FOR_SELECTED_CLASS',
        allowedWorksheets: `ALL_WORKSHEETS_FOR_${(sub.activatedClassLevel || userClass).toUpperCase().replace(/\s+/g, '_')}`,
        allowedFeatures: 'ALL_FEATURES'
      }
    }
  });
});

const SERVER_WORKSHEET_UPGRADE_MSG =
  'Unlock All Worksheets for Your Class – Only ₹99!';

// 8.3 Backend access verification for features, subjects, and worksheets (strictly class-wise & server-verified)
app.post('/api/subscription/verify-access', async (req: Request, res: Response) => {
  const { studentId, feature, subject, worksheetId, selectedClass } = req.body || {};
  const sub = await evaluateServerSubscriptionFromStore(String(studentId || ''));
  // Security: Once a student/teacher has a registered class in the store/Firestore, lock userClass to it
  const userClass = String(
    (sub.hasStoredProfile ? sub.selectedClass : selectedClass) ||
      sub.selectedClass ||
      sub.activatedClassLevel ||
      'Class 1'
  ).trim();
  const effectivePlan: 'free' | 'premium' =
    sub.plan === 'premium' || sub.plan === 'basic' ? 'premium' : 'free';
  const isPremiumForClass =
    effectivePlan === 'premium' && (!sub.activatedClassLevel || sub.activatedClassLevel === userClass);

  if (worksheetId) {
    const cleanWsId = String(worksheetId).trim();
    const wsClass = parseServerWorksheetClass(cleanWsId) || userClass;
    const isSameClass = wsClass === userClass;
    const demoIds = new Set(getServerFreeDemoIdsForClass(userClass));
    const isDemo = isSameClass && demoIds.has(cleanWsId);
    const allowed = isSameClass && (isPremiumForClass || isDemo);
    const upgradeMsg = !isSameClass
      ? `Class-Wise Restriction: Your account is registered for ${userClass} only. Worksheets for ${wsClass} are locked.`
      : SERVER_WORKSHEET_UPGRADE_MSG;

    return res.json({
      success: true,
      allowed,
      isDemo,
      isOtherClassLocked: !isSameClass,
      selectedClass: userClass,
      worksheetClass: wsClass,
      effectivePlan,
      requiredPlan: 'premium',
      upgradeMessage: allowed ? '' : upgradeMsg,
      message: allowed ? 'Worksheet access granted.' : upgradeMsg
    });
  }

  if (subject) {
    const allowedOnFree = SERVER_FREE_ALLOWED_SUBJECTS.has(String(subject));
    const allowed = isPremiumForClass || allowedOnFree;
    return res.json({
      success: true,
      allowed,
      selectedClass: userClass,
      effectivePlan,
      requiredPlan: allowed ? effectivePlan : 'premium',
      message: allowed
        ? 'Access granted.'
        : `${subject} requires the ₹99 Premium Plan.`
    });
  }

  if (feature) {
    const cleanFeature = String(feature);
    const allowed =
      effectivePlan === 'premium' ||
      SERVER_FREE_ALLOWED_FEATURES.has(cleanFeature) ||
      sub.accountRole === 'teacher';
    const requiredPlan: 'free' | 'premium' = allowed ? effectivePlan : 'premium';

    return res.json({
      success: true,
      allowed,
      selectedClass: userClass,
      effectivePlan,
      requiredPlan,
      message: allowed
        ? 'Access granted.'
        : 'This feature requires the ₹99 Premium Plan.'
    });
  }

  return res.json({ success: true, allowed: true, selectedClass: userClass, effectivePlan });
});

// 8.4 Dedicated Class-Wise Worksheet Access Verification API (Standards 1st to 10th)
app.get('/api/worksheets/access/:studentId', async (req: Request, res: Response) => {
  const studentId = String(req.params.studentId || '').trim();
  const queryClass = req.query.selectedClass ? String(req.query.selectedClass).trim() : '';
  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const isPremium = sub.plan === 'premium' || sub.plan === 'basic';
  const userClass =
    (sub.hasStoredProfile ? sub.selectedClass : queryClass) ||
    sub.selectedClass ||
    sub.activatedClassLevel ||
    'Class 1';
  const demoIds = getServerFreeDemoIdsForClass(userClass);

  return res.json({
    success: true,
    studentId,
    selectedClass: userClass,
    activatedClassLevel: isPremium ? (sub.activatedClassLevel || userClass) : null,
    effectivePlan: isPremium ? 'premium' : 'free',
    isPremium,
    printingAllowed: false,
    downloadingAllowed: false,
    demoWorksheetIds: demoIds,
    allowedWorksheets: isPremium
      ? `ALL_WORKSHEETS_FOR_${userClass.toUpperCase().replace(/\s+/g, '_')}`
      : demoIds,
    upgradeMessage: SERVER_WORKSHEET_UPGRADE_MSG
  });
});

app.post('/api/worksheets/verify-access', async (req: Request, res: Response) => {
  const { studentId, worksheetId, selectedClass } = req.body || {};
  const cleanStudentId = String(studentId || '').trim();
  const cleanWorksheetId = String(worksheetId || '').trim();

  if (!cleanWorksheetId) {
    return res.status(400).json({
      success: false,
      allowed: false,
      error: 'worksheetId is required.'
    });
  }

  const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
  // Security: Stored student profile class takes strict priority over client-provided selectedClass
  const userClass = String(
    (sub.hasStoredProfile ? sub.selectedClass : selectedClass) ||
      sub.selectedClass ||
      sub.activatedClassLevel ||
      parseServerWorksheetClass(cleanWorksheetId) ||
      'Class 1'
  ).trim();
  const wsClass = parseServerWorksheetClass(cleanWorksheetId) || userClass;
  const isSameClass = wsClass === userClass;

  const isPremium = sub.plan === 'premium' || sub.plan === 'basic';
  const isPremiumForClass =
    isPremium && (!sub.activatedClassLevel || sub.activatedClassLevel === userClass);
  const demoIds = new Set(getServerFreeDemoIdsForClass(userClass));
  const isDemo = isSameClass && demoIds.has(cleanWorksheetId);
  const allowed = isSameClass && (isPremiumForClass || isDemo);

  const upgradeMsg = !isSameClass
    ? `Class-Wise Restriction: Your account is registered for ${userClass} only. Worksheets for ${wsClass} are locked.`
    : SERVER_WORKSHEET_UPGRADE_MSG;

  return res.status(allowed ? 200 : 403).json({
    success: allowed,
    allowed,
    isDemo,
    isOtherClassLocked: !isSameClass,
    studentId: cleanStudentId,
    selectedClass: userClass,
    worksheetClass: wsClass,
    worksheetId: cleanWorksheetId,
    effectivePlan: isPremium ? 'premium' : 'free',
    requiredPlan: 'premium',
    printingAllowed: false,
    downloadingAllowed: false,
    upgradeMessage: allowed ? '' : upgradeMsg
  });
});


// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: [
          'mystudyzone.in',
          'www.mystudyzone.in',
          '.netlify.app',
          'ais-dev-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app',
          'ais-pre-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app',
          '.run.app',
          'localhost',
          '127.0.0.1'
        ],
        hmr: false,
        ws: false,
        watch: null
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('[Dev Mode] Vite middlewares mounted to Express (HMR WebSocket disabled).');
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('[Production Mode] Static dist served.');
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Champion Learning Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
