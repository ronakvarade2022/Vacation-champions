import express, { type Request, type Response, type NextFunction } from 'express';
import compression from 'compression';
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
  runWithRequestBearerToken,
  serverGetDoc,
  serverSetDoc,
  serverUpdateDoc,
  serverQueryEqualsLimit1,
  verifyAdminRequest,
  verifyBearerIdToken
} from './firebase/admin.ts';
import {
  acquireDeviceSessionServer,
  validateDeviceSessionServer,
  heartbeatDeviceSessionServer,
  releaseDeviceSessionServer,
  recoverDeviceSessionServer,
  listDeviceSessionsAdminServer,
  terminateDeviceSessionAdminServer,
  loadDeviceSessionFromStore,
  SESSION_LOGGED_IN_ELSEWHERE_MESSAGE,
  SINGLE_DEVICE_BLOCK_MESSAGE
} from './src/server/deviceSessionStore.ts';
import {
  getResolvedRazorpayCredentials,
  createRazorpayClient,
  createRazorpayOrderBackend,
  createRazorpayQrCodeBackend,
  checkRazorpayQrCodeStatusBackend,
  updateStudentSubscriptionInFirestoreBackend,
  VALID_BOARDS,
  VALID_CLASS_LEVELS,
  normalizeBackendBoard,
  normalizeBackendClassLevel,
  buildBackendBoardClassKey,
  parseBackendBoardClassKey,
  type BackendBoard
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
import {
  ALL_CATEGORY_IDS,
  PLAN_CATALOG,
  getPlanCatalogItem,
  isValidPlanSku,
  resolvePlanSku,
  type CategoryId,
  type CategorySubscriptionRecord,
  type PlanSkuId
} from './src/data/planCatalog.ts';
import {
  getServerSupportTickets,
  getSupportAiStatus,
  handleSupportChatRequest,
  handleSupportTicketSubmission,
  updateServerSupportTicketStatus
} from './server/supportAssistant.ts';
import {
  getAiServiceStatus,
  handleAiImageGenerate,
  handleAiTextGenerate
} from './server/aiToolsService.ts';
import {
  getServerCustomDictionaryEntries,
  addServerCustomDictionaryEntry
} from './server/dictionaryService.ts';
import {
  getSnapSolveStatus,
  handleSnapSolveRecognize,
  handleSnapSolveSolve,
  handleSnapSolveDeleteSession
} from './server/snapSolveService.ts';
import {
  getOwnerAiPolicyReport,
  recordOwnerBillingDecision,
  updateOwnerFreeTierLimits
} from './server/aiPolicyManager.ts';
import { isGeminiConfigured } from './server/geminiClient.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
app.use(compression({ threshold: 1024 }));

// In-memory persistent transaction and membership stores (backed by server runtime)
interface ServerTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  parentEmail: string;
  parentMobile: string;
  selectedBoard?: BackendBoard;
  selectedClass?: string;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  activatedCategories?: CategoryId[];
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

// Trusted CORS origin allowlist (never wildcard '*' on authenticated APIs)
const STATIC_TRUSTED_ORIGINS = new Set<string>([
  'https://mystudyzone.in',
  'https://www.mystudyzone.in',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean),
]);

function resolveTrustedCorsOrigin(rawOrigin?: string | string[]): string | null {
  const origin = (Array.isArray(rawOrigin) ? rawOrigin[0] : rawOrigin || '').trim().replace(/\/+$/, '');
  if (!origin) return null;
  if (STATIC_TRUSTED_ORIGINS.has(origin)) return origin;
  if (/^https:\/\/ais-(dev|pre)-[a-z0-9-]+\.[a-z0-9-]+\.run\.app$/i.test(origin)) {
    return origin;
  }
  if (/^https:\/\/([a-z0-9-]+--)?[a-z0-9-]+\.netlify\.app$/i.test(origin)) {
    return origin;
  }
  return null;
}

// 0. Strict Trusted-Origin CORS & Netlify Function path alias middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const rawOrigin = req.headers.origin;
  const trustedOrigin = resolveTrustedCorsOrigin(rawOrigin);
  res.setHeader('Vary', 'Origin');
  if (trustedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', trustedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Razorpay-Signature, x-session-id, x-device-id, x-device-signature, x-hardware-signature, x-snapsolve-secret'
  );
  if (req.method === 'OPTIONS') {
    if (rawOrigin && !trustedOrigin) {
      return res.status(403).json({ success: false, error: 'Origin not allowed by CORS policy.' });
    }
    return res.status(204).end();
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

// 1b. Larger JSON payload limit strictly scoped to SnapSolve multi-page image scanning (memory-only, max 10 pages)
app.use('/api/snapsolve', express.json({ limit: '30mb' }));

// 2. Standard JSON parser for all other API endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2b. Bind request Authorization Bearer token to AsyncLocalStorage context for Firestore REST v1 operations
app.use((req: Request, _res: Response, next: NextFunction) => {
  runWithRequestBearerToken(req.headers.authorization, () => {
    next();
  });
});

// --- API ROUTES ---

// 1. Config endpoint - returns public live/test key and plan catalog safely (NEVER the secret)
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
    },
    catalog: PLAN_CATALOG
  });
});

// 2. Create Order endpoint - Server-authoritative pricing per Plan SKU
app.post('/api/razorpay/create-order', async (req: Request, res: Response) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || 'premium';
    const rawSku = req.body.planSku;
    const planSku = resolvePlanSku(rawSku, rawPlan);
    if (rawSku && !isValidPlanSku(rawSku)) {
      return res.status(400).json({ success: false, error: `Invalid plan SKU requested: ${String(rawSku)}` });
    }
    const planId = rawPlan === 'premium' || isValidPlanSku(planSku) ? 'premium' : null;
    const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel, referralCode } = req.body;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || undefined;

    if (!studentId) {
      return res.status(400).json({ success: false, error: 'Student authentication required.' });
    }

    if (!planId) {
      return res.status(400).json({ success: false, error: 'Invalid plan selected.' });
    }

    try {
      const orderPayload = await createRazorpayOrderBackend({
        planId,
        planSku,
        studentId: String(studentId),
        studentName,
        email,
        mobile,
        selectedBoard: normalizedBoard,
        selectedClass: normalizedClass,
        referralCode: referralCode ? String(referralCode).trim() : undefined
      });
      console.log(
        `[Razorpay ${orderPayload.mode}] Created order: ${orderPayload.orderId} | SKU: ${planSku} | Student: ${studentId} (${normalizedBoard} • ${normalizedClass || 'default'}) (₹${orderPayload.amountRupees} / ${orderPayload.amount} paise)`
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

// 2.1 Dynamic Razorpay UPI QR Code creation endpoint (Server-authoritative pricing per Plan SKU)
app.post('/api/razorpay/create-qr', async (req: Request, res: Response) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || 'premium';
    const rawSku = req.body.planSku;
    const planSku = resolvePlanSku(rawSku, rawPlan);
    if (rawSku && !isValidPlanSku(rawSku)) {
      return res.status(400).json({ success: false, error: `Invalid plan SKU requested: ${String(rawSku)}` });
    }
    const planId = rawPlan === 'premium' || isValidPlanSku(planSku) ? 'premium' : null;
    const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel, referralCode } = req.body;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || undefined;

    if (!studentId) {
      return res.status(400).json({ success: false, error: 'Student authentication required.' });
    }

    if (!planId) {
      return res.status(400).json({ success: false, error: 'Invalid plan selected.' });
    }

    const qrPayload = await createRazorpayQrCodeBackend({
      planId,
      planSku,
      studentId: String(studentId),
      studentName,
      email,
      mobile,
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      referralCode: referralCode ? String(referralCode).trim() : undefined
    });

    console.log(`[Razorpay QR] Dynamic QR code created: ${qrPayload.qrId} | SKU: ${planSku} | Student: ${studentId} (${normalizedBoard} • ${normalizedClass || 'default'}) (₹${qrPayload.amountRupees})`);
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
    const {
      studentId,
      planId,
      planSku,
      studentName,
      email,
      mobile,
      selectedBoard,
      board,
      selectedClass,
      classLevel,
      referralCode
    } = req.query as Record<string, string>;
    const normalizedBoard = selectedBoard || board ? normalizeBackendBoard(selectedBoard || board) : undefined;
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || undefined;
    const requestedSku = resolvePlanSku(planSku, planId);

    if (!qrId) {
      return res.status(400).json({ success: false, error: 'QR Code ID is required.' });
    }

    const statusResult = await checkRazorpayQrCodeStatusBackend({
      qrId: String(qrId),
      studentId: String(studentId || 'student'),
      planId: 'premium',
      planSku: requestedSku,
      studentName,
      email,
      mobile,
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      referralCode: referralCode ? String(referralCode).trim() : undefined
    });

    // Credit Referral Cashback & update server cache on verified QR Payment
    if (statusResult.paid && statusResult.status === 'PAID') {
      const paidSku = resolvePlanSku(
        (statusResult as any).planSku || statusResult.membership?.planSku,
        requestedSku,
        statusResult.amount || statusResult.membership?.amount
      );
      const catalogItem = getPlanCatalogItem(paidSku);
      const isCategoryPlan = catalogItem.unlockedCategories.length > 0;

      if (studentId) {
        await evaluateServerSubscriptionFromStore(String(studentId));
        const cached = serverStudentSubscriptions.get(String(studentId));
        if (cached && statusResult.membership) {
          if (isCategoryPlan) {
            const existingCatMap = { ...(cached.categorySubscriptions || {}) };
            const nowIso = new Date().toISOString();
            for (const catId of catalogItem.unlockedCategories) {
              existingCatMap[catId] = {
                categoryId: catId,
                planSku: paidSku,
                status: 'ACTIVE',
                purchasedAt: statusResult.membership.startDate,
                expiresAt: statusResult.membership.expiryDate,
                paymentId: String(statusResult.paymentId || ''),
                orderId: String(statusResult.orderId || qrId),
                amountInr: catalogItem.amountInr,
                validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
                updatedAt: nowIso
              };
            }
            const updatedDraft: ServerStudentSubscription = {
              ...cached,
              plan: 'premium',
              categorySubscriptions: existingCatMap,
              activatedCategoryKeys: Object.keys(existingCatMap) as CategoryId[],
              isLifetimeFree: false,
              planPurchasedAt: cached.planPurchasedAt || statusResult.membership.startDate,
              planExpiresAt:
                cached.planExpiresAt && cached.planExpiresAt > statusResult.membership.expiryDate
                  ? cached.planExpiresAt
                  : statusResult.membership.expiryDate,
              paymentId: String(statusResult.paymentId || ''),
              updatedAt: nowIso
            };
            serverStudentSubscriptions.set(String(studentId), updatedDraft);
          } else {
            const paidBoard = normalizeBackendBoard(
              (statusResult as any).selectedBoard || normalizedBoard || cached.selectedBoard
            );
            const paidClass =
              normalizeBackendClassLevel((statusResult as any).selectedClass || normalizedClass) ||
              cached.selectedClass ||
              'Class 1';
            const paidKey = buildBackendBoardClassKey(paidBoard, paidClass);
            const updatedMap = {
              ...(cached.classSubscriptions || {}),
              [paidKey]: {
                board: paidBoard,
                classLevel: paidClass,
                boardClassKey: paidKey,
                plan: 'premium' as const,
                status: 'ACTIVE' as const,
                purchasedAt: statusResult.membership.startDate,
                expiresAt: statusResult.membership.expiryDate,
                paymentId: String(statusResult.paymentId || ''),
                orderId: String(statusResult.orderId || qrId),
                amountInr: catalogItem.amountInr,
                validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
                updatedAt: new Date().toISOString()
              }
            };
            const updatedDraft: ServerStudentSubscription = {
              ...cached,
              plan: 'premium',
              selectedBoard: paidBoard,
              selectedClass: paidClass,
              primaryBoard: cached.primaryBoard || cached.selectedBoard || paidBoard,
              primaryClassLevel: cached.primaryClassLevel || cached.selectedClass || paidClass,
              activatedBoard: paidBoard,
              activatedClassLevel: paidClass,
              classSubscriptions: updatedMap,
              isLifetimeFree: false,
              planPurchasedAt: statusResult.membership.startDate,
              planExpiresAt: statusResult.membership.expiryDate,
              paymentId: String(statusResult.paymentId || ''),
              updatedAt: new Date().toISOString()
            };
            updatedDraft.activatedClassKeys = getServerActivatedBoardClassKeys(updatedDraft);
            updatedDraft.activatedClasses = getServerActivatedClasses(updatedDraft);
            serverStudentSubscriptions.set(String(studentId), updatedDraft);
          }
        }
      }

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
      planSku: requestedPlanSku,
      studentId,
      studentName,
      email,
      mobile,
      selectedBoard,
      board,
      selectedClass,
      classLevel,
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

    if (planId !== 'premium' && !requestedPlanSku) {
      return res.status(400).json({
        success: false,
        error: 'Valid Premium or Category Plan SKU is required for verification.'
      });
    }
    const candidatePlanSku = requestedPlanSku ? resolvePlanSku(requestedPlanSku, planId) : undefined;

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
        planSku: existing?.planSku || candidatePlanSku,
        activatedCategoryKeys: existingSub?.activatedCategoryKeys || [],
        categorySubscriptions: existingSub?.categorySubscriptions || {},
        selectedBoard: existing?.selectedBoard || existingSub?.activatedBoard || existingSub?.selectedBoard || 'Maharashtra',
        selectedClass: existing?.selectedClass || existingSub?.activatedClassLevel,
        transaction: existing,
        membership: existing
          ? {
              membershipId: `mem_${existing.id}`,
              studentId: existing.studentId,
              studentName: existing.studentName,
              selectedBoard: existing.selectedBoard || 'Maharashtra',
              selectedClass: existing.selectedClass,
              planId: existing.planId,
              planSku: existing.planSku,
              activatedCategoryKeys: existingSub?.activatedCategoryKeys || [],
              categorySubscriptions: existingSub?.categorySubscriptions || {},
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
      expectedPlanId: 'premium',
      expectedPlanSku: candidatePlanSku,
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

    const resolvedSku = resolvePlanSku(
      captureStatus.notes?.planSku || candidatePlanSku || captureStatus.planSku,
      planId,
      captureStatus.amountPaise
    );
    const planItem = getPlanCatalogItem(resolvedSku);
    const verifiedAmount = planItem.amountInr;

    const existingServerSub = await evaluateServerSubscriptionFromStore(String(studentId));
    const targetBoard = normalizeBackendBoard(
      captureStatus.notes?.selectedBoard ||
        captureStatus.notes?.board ||
        selectedBoard ||
        board ||
        existingServerSub.selectedBoard
    );
    const targetClass =
      normalizeBackendClassLevel(
        captureStatus.notes?.selectedClass ||
          captureStatus.notes?.classLevel ||
          selectedClass ||
          classLevel
      ) ||
      existingServerSub.selectedClass ||
      'Class 1';

    // Persist verified 365-day subscription (Board+Class OR Category/Bundle) and transaction to Firestore
    const backendActivation = await updateStudentSubscriptionInFirestoreBackend({
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      email: String(email || ''),
      mobile: String(mobile || ''),
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      planId: 'premium',
      planSku: resolvedSku,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature || 'verified_sig',
      method: capturedMethod,
      amountInr: verifiedAmount,
      currentExpiresAt
    });

    const receiptNumber = backendActivation.receiptNumber || `REC-VC-${Date.now().toString().slice(-6)}`;
    const startDateIso = backendActivation.startDateIso;
    const expiryDateIso = backendActivation.expiryDateIso;
    const daysRemaining = backendActivation.daysRemaining;
    const resolvedPaidBoard = backendActivation.selectedBoard || targetBoard;
    const resolvedPaidClass = backendActivation.selectedClass || targetClass;
    const resolvedBoardClassKey =
      backendActivation.boardClassKey ||
      buildBackendBoardClassKey(resolvedPaidBoard, resolvedPaidClass);
    const isCategoryPlan = backendActivation.unlockedCategories.length > 0;

    const transactionRecord: ServerTransaction = {
      id: `tx_${razorpay_payment_id}`,
      receiptNumber,
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      parentEmail: String(email || ''),
      parentMobile: String(mobile || ''),
      selectedBoard: isCategoryPlan ? undefined : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? undefined : resolvedPaidClass,
      planId: 'premium',
      planSku: resolvedSku,
      activatedCategories: backendActivation.unlockedCategories,
      planTitle: backendActivation.planLabel,
      amount: verifiedAmount,
      currency: 'INR',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || 'verified_sig',
      method: capturedMethod,
      status: 'SUCCESS',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      membershipStartDate: startDateIso,
      membershipExpiryDate: expiryDateIso
    };

    const membershipRecord: ServerMembership & {
      selectedBoard?: BackendBoard;
      selectedClass?: string;
      boardClassKey?: string;
      activatedClasses?: string[];
      activatedClassKeys?: string[];
      planSku?: PlanSkuId;
      activatedCategoryKeys?: CategoryId[];
      categorySubscriptions?: Record<string, any>;
    } = {
      membershipId: `mem_${razorpay_payment_id}`,
      studentId: String(studentId),
      studentName: String(studentName || 'Student'),
      selectedBoard: isCategoryPlan ? existingServerSub.selectedBoard : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? existingServerSub.selectedClass : resolvedPaidClass,
      boardClassKey: isCategoryPlan ? undefined : resolvedBoardClassKey,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      planId: 'premium',
      planSku: resolvedSku,
      planTitle: backendActivation.planLabel,
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

    // Update server-side subscription cache immediately without overwriting untouched subscriptions
    serverStudentSubscriptions.set(String(studentId), {
      studentId: String(studentId),
      plan: 'premium',
      selectedBoard: isCategoryPlan ? (existingServerSub.selectedBoard || 'Maharashtra') : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? (existingServerSub.selectedClass || 'Class 1') : resolvedPaidClass,
      primaryBoard:
        existingServerSub.primaryBoard || existingServerSub.selectedBoard || resolvedPaidBoard,
      primaryClassLevel:
        existingServerSub.primaryClassLevel || existingServerSub.selectedClass || resolvedPaidClass,
      activatedBoard: isCategoryPlan ? existingServerSub.activatedBoard : resolvedPaidBoard,
      activatedClassLevel: isCategoryPlan ? existingServerSub.activatedClassLevel : resolvedPaidClass,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      classSubscriptions: backendActivation.classSubscriptions,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      accountRole: existingServerSub.accountRole || 'student',
      hasStoredProfile: true,
      isLifetimeFree: false,
      planPurchasedAt: existingServerSub.planPurchasedAt || startDateIso,
      planExpiresAt:
        existingServerSub.planExpiresAt && existingServerSub.planExpiresAt > expiryDateIso
          ? existingServerSub.planExpiresAt
          : expiryDateIso,
      paymentId: razorpay_payment_id,
      updatedAt: new Date().toISOString()
    });

    console.log(`[Payment Verified] Student: ${studentId} | SKU: ${resolvedSku} | Amount: ₹${verifiedAmount} | Valid till: ${membershipRecord.expiryDate}`);

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
          planId: 'premium',
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
      planSku: resolvedSku,
      selectedBoard: isCategoryPlan ? existingServerSub.selectedBoard : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? existingServerSub.selectedClass : resolvedPaidClass,
      boardClassKey: isCategoryPlan ? undefined : resolvedBoardClassKey,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      classSubscriptions: backendActivation.classSubscriptions,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      message: isCategoryPlan
        ? `Payment verified and ${planItem.title} activated for 365 days.`
        : `Payment verified and ${resolvedPaidBoard} (${resolvedPaidClass}) subscription activated for 365 days.`,
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
      orderId = `order_cancelled_${Date.now()}`,
      paymentId = `pay_cancelled_${Date.now()}`,
      planId = 'premium',
      studentId = 'unknown_student',
      studentName = 'Student',
      email = '',
      mobile = '',
      selectedBoard,
      board,
      selectedClass,
      classLevel,
      method = 'RAZORPAY'
    } = req.body || {};

    const validPlanId: 'premium' = 'premium';
    const amount = 99;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || undefined;

    const failedRecord: ServerTransaction = {
      id: `tx_failed_${Date.now()}`,
      receiptNumber: `FAIL-VC-${Date.now().toString().slice(-6)}`,
      studentId: String(studentId),
      studentName: String(studentName),
      parentEmail: String(email),
      parentMobile: String(mobile),
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      planId: validPlanId,
      planTitle: normalizedClass
        ? `PREMIUM PLAN (${normalizedBoard} • ${normalizedClass}) – ₹99 – 365 Days (1 Year)`
        : `PREMIUM PLAN (${normalizedBoard}) – ₹99 – 365 Days (1 Year)`,
      amount,
      currency: 'INR',
      orderId: String(orderId),
      paymentId: String(paymentId),
      signature: 'failed_or_cancelled',
      method: String(method),
      status: 'FAILED',
      createdAt: new Date().toISOString()
    };

    if (String(studentId) !== 'guest_audit') {
      transactionLedger.unshift(failedRecord);
    }

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

      // Determine subscription SKU & amount from notes
      const planId: 'premium' = 'premium';
      const resolvedWebhookSku = resolvePlanSku(notes.planSku, notes.planId, amountPaise);
      const webhookPlanItem = getPlanCatalogItem(resolvedWebhookSku);
      const subscriptionTier: 'premium' = 'premium';
      const verifiedAmount = webhookPlanItem.amountInr;

      const notesSelectedBoard = normalizeBackendBoard(
        notes.selectedBoard || notes.board || 'Maharashtra'
      );
      const notesSelectedClass = normalizeBackendClassLevel(
        notes.selectedClass || notes.classLevel
      );

      let firestoreUpdateResult: {
        selectedBoard: BackendBoard;
        selectedClass: string;
        boardClassKey: string;
        planSku?: PlanSkuId;
        unlockedCategories?: CategoryId[];
        planLabel?: string;
        expiryDateIso: string;
        startDateIso: string;
        daysRemaining: number;
        receiptNumber: string;
        alreadyProcessed: boolean;
        activatedClasses: string[];
        activatedClassKeys: string[];
        classSubscriptions: Record<string, any>;
        activatedCategoryKeys?: CategoryId[];
        categorySubscriptions?: Record<string, any>;
      } | null = null;

      if (studentId) {
        // Retrieve the user document from Firestore and update their subscription via functions/webhook.ts
        const captured = await processPaymentCapturedEvent({
          paymentEntity,
          orderEntity,
          signature: signature || 'verified_webhook_signature'
        });
        firestoreUpdateResult = captured;

        const existingCached = serverStudentSubscriptions.get(studentId);
        const isCatPurchase = (captured.unlockedCategories?.length || 0) > 0;
        // Synchronize in-memory server subscription cache
        serverStudentSubscriptions.set(studentId, {
          studentId,
          plan: planId,
          selectedBoard: isCatPurchase
            ? (existingCached?.selectedBoard || captured.selectedBoard)
            : captured.selectedBoard,
          selectedClass: isCatPurchase
            ? (existingCached?.selectedClass || captured.selectedClass)
            : captured.selectedClass,
          primaryBoard:
            existingCached?.primaryBoard ||
            existingCached?.selectedBoard ||
            captured.selectedBoard,
          primaryClassLevel:
            existingCached?.primaryClassLevel ||
            existingCached?.selectedClass ||
            captured.selectedClass,
          activatedBoard: isCatPurchase ? existingCached?.activatedBoard : captured.selectedBoard,
          activatedClassLevel: isCatPurchase ? existingCached?.activatedClassLevel : captured.selectedClass,
          activatedClasses: captured.activatedClasses,
          activatedClassKeys: captured.activatedClassKeys,
          classSubscriptions: captured.classSubscriptions,
          activatedCategoryKeys: captured.activatedCategoryKeys || existingCached?.activatedCategoryKeys || [],
          categorySubscriptions: captured.categorySubscriptions || existingCached?.categorySubscriptions || {},
          accountRole: existingCached?.accountRole || 'student',
          hasStoredProfile: true,
          isLifetimeFree: false,
          planPurchasedAt: existingCached?.planPurchasedAt || captured.startDateIso,
          planExpiresAt:
            existingCached?.planExpiresAt && existingCached.planExpiresAt > captured.expiryDateIso
              ? existingCached.planExpiresAt
              : captured.expiryDateIso,
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
        const resolvedBoard =
          firestoreUpdateResult?.selectedBoard || notesSelectedBoard;
        const resolvedClass =
          firestoreUpdateResult?.selectedClass || notesSelectedClass || 'Class 1';

        transactionLedger.unshift({
          id: `tx_${paymentId}`,
          receiptNumber,
          studentId: studentId || 'webhook_student',
          studentName,
          parentEmail: email,
          parentMobile: mobile,
          selectedBoard: resolvedBoard,
          selectedClass: resolvedClass,
          planId,
          planSku: resolvedWebhookSku,
          activatedCategories: webhookPlanItem.unlockedCategories,
          planTitle:
            firestoreUpdateResult?.planLabel ||
            `${webhookPlanItem.title} – ₹${verifiedAmount} – ${webhookPlanItem.validityDays} Days (${webhookPlanItem.validityLabel})`,
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
        `[Razorpay Webhook payment.captured] Student: ${studentId || 'N/A'} | SKU: ${resolvedWebhookSku} | Tier: ${subscriptionTier} (${planId}) | Expiry: ${firestoreUpdateResult?.expiryDateIso || '365 Days'}`
      );

      return res.status(200).json({
        status: 'ok',
        event: eventType,
        studentId: studentId || null,
        planSku: resolvedWebhookSku,
        selectedBoard: firestoreUpdateResult?.selectedBoard || notesSelectedBoard,
        selectedClass: firestoreUpdateResult?.selectedClass || notesSelectedClass || null,
        boardClassKey: firestoreUpdateResult?.boardClassKey || null,
        activatedClasses: firestoreUpdateResult?.activatedClasses || [],
        activatedClassKeys: firestoreUpdateResult?.activatedClassKeys || [],
        activatedCategoryKeys: firestoreUpdateResult?.activatedCategoryKeys || [],
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

    const sessionCheck = await verifyRequestDeviceSession(req, String(userId));
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        success: false,
        code: 'SINGLE_DEVICE_SESSION_INVALID',
        message: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      });
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
// 8. TWO-TIER BOARD + CLASS SUBSCRIPTION ENFORCEMENT API (FREE LIFETIME / ₹99 PREMIUM)
// =========================================================================
interface ServerClassSubscriptionEntry {
  board?: BackendBoard;
  classLevel: string;
  boardClassKey?: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'ACTIVE' | 'EXPIRED' | 'LOCKED';
  purchasedAt?: string;
  expiresAt?: string;
  paymentId?: string;
  orderId?: string;
  amountInr?: number;
  validityDays?: number;
  updatedAt?: string;
}

interface ServerStudentSubscription {
  studentId: string;
  plan: 'free' | 'basic' | 'premium';
  selectedBoard?: BackendBoard;
  selectedClass?: string;
  primaryBoard?: BackendBoard;
  primaryClassLevel?: string;
  activatedBoard?: BackendBoard | null;
  activatedClassLevel?: string | null;
  activatedClasses?: string[];
  activatedClassKeys?: string[];
  studentActivatedClassKeys?: string[];
  classSubscriptions?: Record<string, ServerClassSubscriptionEntry>;
  activatedCategoryKeys?: CategoryId[];
  categorySubscriptions?: Partial<Record<CategoryId, CategorySubscriptionRecord>>;
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
  'study-material',
  'referrals'
]);

function parseServerWorksheetBoardAndClass(worksheetId: string): {
  board: BackendBoard;
  classLevel: string;
} | null {
  const trimmed = String(worksheetId || '').trim();
  const boardMatch = /^WS-(?:NEW-)?(CBSE|ICSE|MH|MAHARASHTRA)-C(\d{1,2})-/i.exec(trimmed);
  if (boardMatch) {
    const n = parseInt(boardMatch[2], 10);
    if (n >= 1 && n <= 10) {
      return {
        board: normalizeBackendBoard(boardMatch[1]),
        classLevel: `Class ${n}`
      };
    }
  }
  const mhMatch = /^WS-C(\d{1,2})-/i.exec(trimmed);
  if (mhMatch) {
    const n = parseInt(mhMatch[1], 10);
    if (n >= 1 && n <= 10) {
      return {
        board: 'Maharashtra',
        classLevel: `Class ${n}`
      };
    }
  }
  return null;
}

function hasServerUniversalWorksheetAccess(sub: ServerStudentSubscription): boolean {
  return (
    hasServerCategoryAccess(sub, 'all_classes') ||
    getServerActivatedBoardClassKeys(sub).length > 0
  );
}

function getServerFreeDemoIdsForClass(
  classLevel: string = 'Class 1',
  board: string = 'Maharashtra'
): string[] {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const resolvedBoard = normalizeBackendBoard(board);
  if (resolvedBoard === 'CBSE') {
    return [`WS-CBSE-C${cNum}-ENGLISH-1`, `WS-CBSE-C${cNum}-MATHEMATICS-1`];
  }
  if (resolvedBoard === 'ICSE') {
    return [`WS-ICSE-C${cNum}-ENGLISH-1`, `WS-ICSE-C${cNum}-MATHEMATICS-1`];
  }
  const mathKey = cNum === 10 ? 'MATHEMATICSALGEBRA' : 'MATHEMATICS';
  return [`WS-C${cNum}-ENGLISH-1`, `WS-C${cNum}-${mathKey}-1`];
}

function extractServerClassSubscriptionsMap(
  raw: Record<string, any> | null | undefined
): Record<string, ServerClassSubscriptionEntry> {
  const result: Record<string, ServerClassSubscriptionEntry> = {};
  if (!raw) return result;

  if (raw.classSubscriptions && typeof raw.classSubscriptions === 'object') {
    for (const [k, entry] of Object.entries(raw.classSubscriptions)) {
      if (!entry || typeof entry !== 'object') continue;
      const parsedFromKey = parseBackendBoardClassKey(k);
      const board = normalizeBackendBoard(
        (entry as any).board || parsedFromKey?.board || raw.primaryBoard || raw.board || 'Maharashtra'
      );
      const cls =
        normalizeBackendClassLevel((entry as any).classLevel || parsedFromKey?.classLevel || k);
      if (!cls) continue;
      const compositeKey = buildBackendBoardClassKey(board, cls);
      const plan =
        (entry as any).plan === 'basic' || (entry as any).plan === 'premium'
          ? (entry as any).plan
          : 'free';
      result[compositeKey] = {
        board,
        classLevel: cls,
        boardClassKey: compositeKey,
        plan,
        status: (entry as any).status || 'LOCKED',
        purchasedAt: (entry as any).purchasedAt,
        expiresAt: (entry as any).expiresAt,
        paymentId: (entry as any).paymentId,
        orderId: (entry as any).orderId,
        amountInr: (entry as any).amountInr,
        validityDays: (entry as any).validityDays,
        updatedAt: (entry as any).updatedAt
      };
    }
  }

  // Backward compatibility: legacy single-class paid profile
  if (raw.plan && raw.plan !== 'free' && raw.activatedClassLevel) {
    const legacyBoard = normalizeBackendBoard(raw.activatedBoard || raw.board || raw.primaryBoard || 'Maharashtra');
    const legacyClass =
      normalizeBackendClassLevel(raw.activatedClassLevel) ||
      normalizeBackendClassLevel(raw.classLevel) ||
      normalizeBackendClassLevel(raw.selectedClass) ||
      'Class 1';
    const legacyKey = buildBackendBoardClassKey(legacyBoard, legacyClass);
    if (!result[legacyKey]) {
      result[legacyKey] = {
        board: legacyBoard,
        classLevel: legacyClass,
        boardClassKey: legacyKey,
        plan: raw.plan === 'basic' ? 'basic' : 'premium',
        status: 'ACTIVE',
        purchasedAt: raw.planPurchasedAt,
        expiresAt: raw.planExpiresAt,
        paymentId: raw.lastPaymentId || raw.paymentId,
        orderId: raw.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
      };
    }
  }

  return result;
}

const SERVER_CATEGORY_SPLIT_DATE = '2026-11-16';

function extractServerCategorySubscriptionsMap(
  raw: Record<string, any> | null | undefined
): Partial<Record<CategoryId, CategorySubscriptionRecord>> {
  const result: Partial<Record<CategoryId, CategorySubscriptionRecord>> = {};
  if (!raw || !raw.categorySubscriptions || typeof raw.categorySubscriptions !== 'object') {
    return result;
  }
  for (const [k, rec] of Object.entries(raw.categorySubscriptions)) {
    if (!rec || typeof rec !== 'object') continue;
    const catId = k as CategoryId;
    if (ALL_CATEGORY_IDS.includes(catId)) {
      result[catId] = { ...(rec as any), categoryId: catId };
    }
  }
  return result;
}

function hasServerCategoryAccess(
  sub: ServerStudentSubscription,
  categoryId: CategoryId
): boolean {
  const catMap = extractServerCategorySubscriptionsMap(sub);
  const direct = catMap[categoryId];
  if (direct && direct.status === 'ACTIVE') {
    if (!evaluateSubscriptionValidity('premium', direct.purchasedAt, direct.expiresAt).isExpired) {
      return true;
    }
  }
  const allBundle = catMap.all_classes;
  if (categoryId !== 'all_classes' && allBundle && allBundle.status === 'ACTIVE' && allBundle.planSku === 'TEACHER_ALL_ACCESS') {
    if (!evaluateSubscriptionValidity('premium', allBundle.purchasedAt, allBundle.expiresAt).isExpired) {
      return true;
    }
  }
  if (
    sub.accountRole !== 'teacher' &&
    (categoryId === 'scholarship_4th' || categoryId === 'scholarship_7th')
  ) {
    const legacyClass = categoryId === 'scholarship_4th' ? 'Class 4' : 'Class 7';
    const classStatus = getServerBoardClassStatus(sub, sub.selectedBoard || 'Maharashtra', legacyClass);
    const pDate = String(classStatus.purchasedAt || '').slice(0, 10);
    if (classStatus.isPaidActive && (!pDate || pDate <= SERVER_CATEGORY_SPLIT_DATE)) {
      return true;
    }
  }
  return false;
}

function getServerActivatedCategoryKeys(sub: ServerStudentSubscription): CategoryId[] {
  return ALL_CATEGORY_IDS.filter((catId) => hasServerCategoryAccess(sub, catId));
}

function getServerBoardClassStatus(
  sub: ServerStudentSubscription,
  targetBoard: string | undefined | null,
  targetClass: string | undefined | null
): {
  board: BackendBoard;
  classLevel: string;
  boardClassKey: string;
  status: 'ACTIVE_PAID' | 'ACTIVE_FREE' | 'EXPIRED' | 'LOCKED';
  isPaidActive: boolean;
  isFreeBase: boolean;
  isExpired: boolean;
  isAccessible: boolean;
  expiresAt?: string | null;
  purchasedAt?: string;
} {
  const normalizedBoard = normalizeBackendBoard(targetBoard || sub.selectedBoard || sub.primaryBoard || 'Maharashtra');
  const normalizedTarget = normalizeBackendClassLevel(targetClass) || 'Class 1';
  const boardClassKey = buildBackendBoardClassKey(normalizedBoard, normalizedTarget);
  const rawMap = extractServerClassSubscriptionsMap(sub);
  const entry = rawMap[boardClassKey];
  const baseFreeBoard = normalizeBackendBoard(
    sub.primaryBoard || sub.selectedBoard || 'Maharashtra'
  );
  const baseFreeClass =
    normalizeBackendClassLevel(sub.primaryClassLevel) ||
    normalizeBackendClassLevel(sub.selectedClass) ||
    'Class 1';
  const isBaseFreePair =
    normalizedBoard === baseFreeBoard && normalizedTarget === baseFreeClass;

  const allClassesEntry = extractServerCategorySubscriptionsMap(sub).all_classes;
  if (allClassesEntry && allClassesEntry.status === 'ACTIVE') {
    const bundleVal = evaluateSubscriptionValidity('premium', allClassesEntry.purchasedAt, allClassesEntry.expiresAt);
    if (!bundleVal.isExpired) {
      return {
        board: normalizedBoard,
        classLevel: normalizedTarget,
        boardClassKey,
        status: 'ACTIVE_PAID',
        isPaidActive: true,
        isFreeBase: isBaseFreePair,
        isExpired: false,
        isAccessible: true,
        purchasedAt: bundleVal.purchaseDateIst || allClassesEntry.purchasedAt,
        expiresAt: bundleVal.expiryDateIst || allClassesEntry.expiresAt
      };
    }
  }

  if (entry && (entry.plan === 'premium' || entry.plan === 'basic')) {
    const validity = evaluateSubscriptionValidity(
      entry.plan,
      entry.purchasedAt,
      entry.expiresAt
    );
    if (validity.isExpired) {
      return {
        board: normalizedBoard,
        classLevel: normalizedTarget,
        boardClassKey,
        status: 'EXPIRED',
        isPaidActive: false,
        isFreeBase: isBaseFreePair,
        isExpired: true,
        isAccessible: false,
        purchasedAt: entry.purchasedAt,
        expiresAt: entry.expiresAt
      };
    }
    return {
      board: normalizedBoard,
      classLevel: normalizedTarget,
      boardClassKey,
      status: 'ACTIVE_PAID',
      isPaidActive: true,
      isFreeBase: isBaseFreePair,
      isExpired: false,
      isAccessible: true,
      purchasedAt: validity.purchaseDateIst || entry.purchasedAt,
      expiresAt: validity.expiryDateIst || entry.expiresAt
    };
  }

  const isStudentActivatedPair =
    (Array.isArray(sub.studentActivatedClassKeys) &&
      sub.studentActivatedClassKeys.includes(boardClassKey)) ||
    (Array.isArray(sub.activatedClassKeys) &&
      sub.activatedClassKeys.includes(boardClassKey));

  if (isBaseFreePair || isStudentActivatedPair) {
    return {
      board: normalizedBoard,
      classLevel: normalizedTarget,
      boardClassKey,
      status: 'ACTIVE_FREE',
      isPaidActive: false,
      isFreeBase: true,
      isExpired: false,
      isAccessible: true,
      expiresAt: null
    };
  }

  return {
    board: normalizedBoard,
    classLevel: normalizedTarget,
    boardClassKey,
    status: 'LOCKED',
    isPaidActive: false,
    isFreeBase: false,
    isExpired: false,
    isAccessible: false,
    expiresAt: null
  };
}

function getServerActivatedBoardClassKeys(sub: ServerStudentSubscription): string[] {
  const keys: string[] = [];
  for (const board of VALID_BOARDS) {
    for (const cls of VALID_CLASS_LEVELS) {
      if (getServerBoardClassStatus(sub, board, cls).status === 'ACTIVE_PAID') {
        keys.push(buildBackendBoardClassKey(board, cls));
      }
    }
  }
  return keys;
}

function getServerActivatedClasses(
  sub: ServerStudentSubscription,
  boardFilter?: string | null
): string[] {
  if (boardFilter) {
    const targetBoard = normalizeBackendBoard(boardFilter);
    return VALID_CLASS_LEVELS.filter(
      (cls) => getServerBoardClassStatus(sub, targetBoard, cls).status === 'ACTIVE_PAID'
    );
  }
  const activeSet = new Set<string>();
  for (const board of VALID_BOARDS) {
    for (const cls of VALID_CLASS_LEVELS) {
      if (getServerBoardClassStatus(sub, board, cls).status === 'ACTIVE_PAID') {
        activeSet.add(cls);
      }
    }
  }
  return VALID_CLASS_LEVELS.filter((c) => activeSet.has(c));
}

function evaluateServerSubscription(studentId: string): ServerStudentSubscription {
  const existing = serverStudentSubscriptions.get(studentId);
  if (!existing) {
    return {
      studentId,
      plan: 'free',
      selectedBoard: 'Maharashtra',
      selectedClass: 'Class 1',
      primaryBoard: 'Maharashtra',
      primaryClassLevel: 'Class 1',
      activatedBoard: null,
      activatedClassLevel: null,
      activatedClasses: [],
      activatedClassKeys: [],
      classSubscriptions: {},
      activatedCategoryKeys: [],
      categorySubscriptions: {},
      accountRole: 'student',
      hasStoredProfile: false,
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: new Date().toISOString()
    };
  }

  const classMap = extractServerClassSubscriptionsMap(existing);
  const categoryMap = extractServerCategorySubscriptionsMap(existing);
  const selectedBoard = normalizeBackendBoard(existing.selectedBoard || existing.primaryBoard || 'Maharashtra');
  const selected = normalizeBackendClassLevel(existing.selectedClass) || 'Class 1';
  const primaryBoard = normalizeBackendBoard(existing.primaryBoard || selectedBoard);
  const primary =
    normalizeBackendClassLevel(existing.primaryClassLevel) || selected;

  const refreshedSub: ServerStudentSubscription = {
    ...existing,
    selectedBoard,
    selectedClass: selected,
    primaryBoard,
    primaryClassLevel: primary,
    classSubscriptions: classMap,
    categorySubscriptions: categoryMap
  };

  const activePaidKeys = getServerActivatedBoardClassKeys(refreshedSub);
  const activePaidClasses = getServerActivatedClasses(refreshedSub);
  const activeCategoryKeys = getServerActivatedCategoryKeys(refreshedSub);
  const selectedInfo = getServerBoardClassStatus(refreshedSub, selectedBoard, selected);

  if (selectedInfo.isPaidActive) {
    return {
      ...refreshedSub,
      plan: 'premium',
      activatedBoard: selectedBoard,
      activatedClassLevel: selected,
      activatedClasses: activePaidClasses,
      activatedClassKeys: activePaidKeys,
      activatedCategoryKeys: activeCategoryKeys,
      isLifetimeFree: false,
      planPurchasedAt: selectedInfo.purchasedAt,
      planExpiresAt: selectedInfo.expiresAt || null
    };
  }

  if (activePaidKeys.length > 0 || activeCategoryKeys.length > 0) {
    const parsedFirst = activePaidKeys[0] ? parseBackendBoardClassKey(activePaidKeys[0]) : null;
    const firstActiveInfo = parsedFirst
      ? getServerBoardClassStatus(refreshedSub, parsedFirst.board, parsedFirst.classLevel)
      : null;
    return {
      ...refreshedSub,
      plan: 'premium',
      activatedBoard: parsedFirst?.board || null,
      activatedClassLevel: parsedFirst?.classLevel || null,
      activatedClasses: activePaidClasses,
      activatedClassKeys: activePaidKeys,
      activatedCategoryKeys: activeCategoryKeys,
      isLifetimeFree: false,
      planPurchasedAt: firstActiveInfo?.purchasedAt || existing.planPurchasedAt,
      planExpiresAt: firstActiveInfo?.expiresAt || existing.planExpiresAt || null
    };
  }

  return {
    ...refreshedSub,
    plan: 'free',
    activatedBoard: null,
    activatedClassLevel: null,
    activatedClasses: [],
    activatedClassKeys: [],
    activatedCategoryKeys: [],
    isLifetimeFree: true,
    planExpiresAt: null,
    updatedAt: new Date().toISOString()
  };
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
        const classMap = extractServerClassSubscriptionsMap(data);
        const categoryMap = extractServerCategorySubscriptionsMap(data);
        const primaryBoard = normalizeBackendBoard(data.primaryBoard || data.board || 'Maharashtra');
        const selectedBoard = normalizeBackendBoard(data.activeWorkspaceBoard || data.board || primaryBoard);
        const primary =
          normalizeBackendClassLevel(data.primaryClassLevel) ||
          normalizeBackendClassLevel(data.classLevel) ||
          'Class 1';
        const selected =
          normalizeBackendClassLevel(data.activeWorkspaceClassLevel || data.classLevel) || primary;
        const studentActivatedClassKeys = Array.isArray(data.studentActivatedClassKeys)
          ? data.studentActivatedClassKeys.filter((k: unknown) => typeof k === 'string')
          : [];

        const baseRecord: ServerStudentSubscription = {
          studentId: cleanId,
          plan: data.plan === 'premium' || data.plan === 'basic' ? 'premium' : 'free',
          selectedBoard,
          selectedClass: selected,
          primaryBoard,
          primaryClassLevel: primary,
          activatedBoard: data.activatedBoard ? normalizeBackendBoard(data.activatedBoard) : null,
          activatedClassLevel:
            normalizeBackendClassLevel(data.activatedClassLevel) || null,
          studentActivatedClassKeys,
          classSubscriptions: classMap,
          categorySubscriptions: categoryMap,
          activatedCategoryKeys: Array.isArray(data.activatedCategoryKeys) ? data.activatedCategoryKeys : [],
          accountRole: data.accountRole === 'teacher' ? 'teacher' : 'student',
          hasStoredProfile: true,
          isLifetimeFree: data.plan === 'free',
          planPurchasedAt: data.planPurchasedAt,
          planExpiresAt: data.planExpiresAt || null,
          paymentId: data.lastPaymentId ? String(data.lastPaymentId) : undefined,
          updatedAt: new Date().toISOString()
        };

        serverStudentSubscriptions.set(cleanId, baseRecord);
        const evaluated = evaluateServerSubscription(cleanId);
        serverStudentSubscriptions.set(cleanId, evaluated);
        return evaluated;
      }
    } catch {
      // Fall back safely to free tier if Firestore lookup is unavailable
    }
  }

  return evaluateServerSubscription(cleanId);
}

// 8.0 Check whether an existing account matches email/mobile during same-credentials registration (Zero PII returned)
app.post('/api/auth/check-existing-account', async (req: Request, res: Response) => {
  try {
    const rawEmail = String(req.body?.email || '').trim().toLowerCase();
    const rawMobileDigits = String(req.body?.mobile || '').replace(/\D/g, '').slice(-10);

    if (!rawEmail && rawMobileDigits.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Email or 10-digit mobile number is required.'
      });
    }

    const [
      emailMatch,
      mobileMatch,
      portalEmailMatch,
      portalMobileMatch,
      parentEmailMatch,
      parentMobileMatch,
    ] = await Promise.all([
      rawEmail
        ? serverQueryEqualsLimit1('students', 'email', rawEmail).catch(() => null)
        : Promise.resolve(null),
      rawMobileDigits.length >= 10
        ? serverQueryEqualsLimit1('students', 'mobile', rawMobileDigits).catch(() => null)
        : Promise.resolve(null),
      rawEmail
        ? serverQueryEqualsLimit1('portal_roles', 'email', rawEmail).catch(() => null)
        : Promise.resolve(null),
      rawMobileDigits.length >= 10
        ? serverQueryEqualsLimit1('portal_roles', 'mobile', rawMobileDigits).catch(() => null)
        : Promise.resolve(null),
      rawEmail
        ? serverQueryEqualsLimit1('parents', 'email', rawEmail).catch(() => null)
        : Promise.resolve(null),
      rawMobileDigits.length >= 10
        ? serverQueryEqualsLimit1('parents', 'mobile', rawMobileDigits).catch(() => null)
        : Promise.resolve(null),
    ]);

    if (!emailMatch && !mobileMatch) {
      if (portalEmailMatch || portalMobileMatch || parentEmailMatch || parentMobileMatch) {
        const mismatchField =
          portalEmailMatch || parentEmailMatch ? 'email' : 'mobile';
        const detectedRole =
          portalEmailMatch?.data?.role ||
          portalMobileMatch?.data?.role ||
          'parent';
        return res.json({
          success: true,
          exists: true,
          matchedPair: false,
          mismatchField,
          accountRole: detectedRole,
          activeClasses: [],
          activeClassKeys: [],
          message: `This ${mismatchField === 'email' ? 'email address' : 'mobile number'} is already registered under a ${String(detectedRole).replace('_', ' ')} portal account. Please sign in to that portal instead of creating a duplicate account.`,
        });
      }
      return res.json({
        success: true,
        exists: false,
        matchedPair: false,
        activeClasses: [],
        activeClassKeys: []
      });
    }

    if (emailMatch && mobileMatch && emailMatch.id === mobileMatch.id) {
      const sub = await evaluateServerSubscriptionFromStore(emailMatch.id);
      const activeClasses = getServerActivatedClasses(sub);
      const activeClassKeys = getServerActivatedBoardClassKeys(sub);
      return res.json({
        success: true,
        exists: true,
        matchedPair: true,
        accountRole: emailMatch.data.accountRole === 'teacher' ? 'teacher' : 'student',
        primaryBoard: sub.primaryBoard || sub.selectedBoard || 'Maharashtra',
        primaryClassLevel: sub.primaryClassLevel || sub.selectedClass || 'Class 1',
        activeClasses,
        activeClassKeys,
        message: 'Existing account matched by mobile & email.'
      });
    }

    // Mismatched pair (email belongs to one user or only one of email/mobile exists)
    const mismatchField =
      emailMatch && !mobileMatch
        ? 'email'
        : !emailMatch && mobileMatch
        ? 'mobile'
        : 'email';
    return res.json({
      success: true,
      exists: true,
      matchedPair: false,
      mismatchField,
      activeClasses: [],
      activeClassKeys: [],
      message:
        mismatchField === 'email'
          ? 'This email address is already linked to a different mobile number. Please enter your exact registered email and mobile number together.'
          : 'This mobile number is already linked to a different email address. Please enter your exact registered email and mobile number together.'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message || 'Account check failed.' });
  }
});

// Helper: Verify active single-device session headers when a non-demo student calls a protected API
async function verifyRequestDeviceSession(
  req: Request,
  studentId: string
): Promise<{ valid: boolean; statusCode: number; error?: string }> {
  const cleanId = String(studentId || '').trim();
  if (!cleanId || cleanId === 'guest' || cleanId.startsWith('demo_')) {
    return { valid: true, statusCode: 200 };
  }

  const sessionId = String(req.headers['x-session-id'] || '').trim();
  const sessionVersionRaw = req.headers['x-session-version'];
  const sessionVersion =
    sessionVersionRaw !== undefined && String(sessionVersionRaw).trim() !== ''
      ? Number(sessionVersionRaw)
      : undefined;
  const deviceId = String(req.headers['x-device-id'] || '').trim();
  const hardwareSignature = String(req.headers['x-hardware-signature'] || '').trim();
  const deviceSignature = String(req.headers['x-device-signature'] || '').trim();

  const existing = await loadDeviceSessionFromStore(cleanId);
  const hasSessionHeaders = Boolean(sessionId || deviceId || hardwareSignature || deviceSignature);

  if (!existing && !hasSessionHeaders) {
    return { valid: true, statusCode: 200 };
  }

  if (existing && existing.status === 'ACTIVE' && Number(existing.expiresAtMs || 0) > Date.now() && !hasSessionHeaders) {
    return {
      valid: false,
      statusCode: 401,
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  if (hasSessionHeaders) {
    const check = await validateDeviceSessionServer({
      userId: cleanId,
      activeSessionId: sessionId || undefined,
      sessionVersion: Number.isFinite(sessionVersion as number) ? sessionVersion : undefined,
      deviceId: deviceId || '',
      hardwareSignature: hardwareSignature || '',
      deviceSignature: deviceSignature || '',
      allowBootstrapIfMissing: !existing
    });
    if (!check.valid) {
      return {
        valid: false,
        statusCode: 401,
        error: check.error || SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
  }

  return { valid: true, statusCode: 200 };
}

// 8.0a Acquire Single Device Login Session (Latest Login Wins; replaces any prior device session atomically)
app.post('/api/auth/session/acquire', async (req: Request, res: Response) => {
  try {
    let verifiedUid: string | undefined;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid && isFirebaseAdminConfigured()) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          allowed: false,
          error: tokenCheck.error || 'Authentication token verification failed.'
        });
      }
      if (tokenCheck.valid) {
        verifiedUid = tokenCheck.uid;
      }
    }

    const body = req.body || {};
    const userId = String(body.userId || verifiedUid || '').trim();
    const result = await acquireDeviceSessionServer({
      userId,
      firebaseUid: body.firebaseUid || verifiedUid,
      email: String(body.email || ''),
      studentName: String(body.studentName || 'Student'),
      accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
      deviceId: String(body.deviceId || req.headers['x-device-id'] || ''),
      hardwareSignature: String(body.hardwareSignature || req.headers['x-hardware-signature'] || ''),
      deviceSignature: String(body.deviceSignature || req.headers['x-device-signature'] || ''),
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });

    if (!result.allowed) {
      return res.status(400).json({
        success: false,
        allowed: false,
        code: result.code,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE,
        activeDevice: result.activeDevice
      });
    }

    return res.json({
      success: true,
      allowed: true,
      resumed: Boolean(result.resumed),
      session: result.session
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      allowed: false,
      error: error?.message || 'Failed to acquire device session.'
    });
  }
});

// 8.0b Validate Active Single Device Session (zero-trust check on boot, refresh, focus)
app.post('/api/auth/session/validate', async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const userId = String(body.userId || '').trim();
    let verifiedUid: string | undefined;
    let verifiedEmail: string | undefined;

    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          valid: false,
          error: tokenCheck.error || 'Invalid or expired Firebase ID token.'
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }

    const isVerifiedOwner = Boolean(
      verifiedUid &&
        (verifiedUid === userId || (body.firebaseUid && verifiedUid === String(body.firebaseUid).trim()))
    );

    const rawVer = body.sessionVersion ?? req.headers['x-session-version'];
    const sessionVersion =
      rawVer !== undefined && String(rawVer).trim() !== '' && Number.isFinite(Number(rawVer))
        ? Number(rawVer)
        : undefined;

    const result = await validateDeviceSessionServer({
      userId,
      activeSessionId: body.activeSessionId || (req.headers['x-session-id'] as string) || undefined,
      sessionVersion,
      deviceId: String(body.deviceId || req.headers['x-device-id'] || ''),
      hardwareSignature: String(body.hardwareSignature || req.headers['x-hardware-signature'] || ''),
      deviceSignature: String(body.deviceSignature || req.headers['x-device-signature'] || ''),
      allowBootstrapIfMissing: isVerifiedOwner || (Boolean(body.allowBootstrapIfMissing) && !req.headers.authorization),
      firebaseUid: verifiedUid || body.firebaseUid,
      email: verifiedEmail || body.email,
      studentName: body.studentName,
      accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });

    if (!result.valid) {
      return res.status(401).json({
        success: false,
        valid: false,
        code: 'SINGLE_DEVICE_SESSION_INVALID',
        reason: result.reason,
        terminatedBy: result.terminatedBy,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }

    return res.json({
      success: true,
      valid: true,
      bootstrapped: Boolean(result.bootstrapped),
      session: result.session
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      valid: false,
      error: error?.message || 'Session validation error.'
    });
  }
});

// 8.0c Heartbeat to maintain sliding inactivity TTL on active device
// Uses Firebase Auth ID-token verification to securely recover sessions after server restarts without false 401 logouts
app.post('/api/auth/session/heartbeat', async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const userId = String(body.userId || '').trim();
    let verifiedUid: string | undefined;
    let verifiedEmail: string | undefined;

    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          valid: false,
          error: tokenCheck.error || 'Invalid or expired Firebase ID token.'
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }

    const isVerifiedOwner = Boolean(
      verifiedUid &&
        (verifiedUid === userId || (body.firebaseUid && verifiedUid === String(body.firebaseUid).trim()))
    );

    const rawVer = body.sessionVersion ?? req.headers['x-session-version'];
    const sessionVersion =
      rawVer !== undefined && String(rawVer).trim() !== '' && Number.isFinite(Number(rawVer))
        ? Number(rawVer)
        : undefined;

    const result = await heartbeatDeviceSessionServer({
      userId,
      activeSessionId: String(body.activeSessionId || req.headers['x-session-id'] || ''),
      sessionVersion,
      deviceId: String(body.deviceId || req.headers['x-device-id'] || ''),
      hardwareSignature: String(body.hardwareSignature || req.headers['x-hardware-signature'] || ''),
      deviceSignature: String(body.deviceSignature || req.headers['x-device-signature'] || ''),
      allowBootstrapIfMissing: isVerifiedOwner,
      firebaseUid: verifiedUid || body.firebaseUid,
      email: verifiedEmail || body.email,
      studentName: body.studentName,
      accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });

    if (!result.valid) {
      return res.status(401).json({
        success: false,
        valid: false,
        code: 'SINGLE_DEVICE_SESSION_INVALID',
        reason: result.reason,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }

    return res.json({
      success: true,
      valid: true,
      bootstrapped: Boolean(result.bootstrapped),
      session: result.session
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, valid: false, error: error?.message });
  }
});

// 8.0d Release active session immediately upon Logout
app.post('/api/auth/session/release', async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const result = await releaseDeviceSessionServer({
      userId: String(body.userId || '').trim(),
      activeSessionId: body.activeSessionId || (req.headers['x-session-id'] as string) || undefined,
      deviceId: body.deviceId || (req.headers['x-device-id'] as string) || undefined,
      hardwareSignature:
        body.hardwareSignature || (req.headers['x-hardware-signature'] as string) || undefined,
      reason: body.reason ? String(body.reason) : undefined
    });

    if (!result.released) {
      return res.status(403).json({
        success: false,
        released: false,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }

    return res.json({ success: true, released: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, released: false, error: error?.message });
  }
});

// 8.0e Lost / Damaged Previous Device Recovery (requires verified Firebase Auth + registered mobile match)
app.post('/api/auth/session/recover', async (req: Request, res: Response) => {
  try {
    let verifiedUid: string | undefined;
    let verifiedEmail: string | undefined;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          error: tokenCheck.error || 'Verified Firebase login required for device recovery.'
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }

    const body = req.body || {};
    const result = await recoverDeviceSessionServer({
      userId: String(body.userId || verifiedUid || '').trim(),
      firebaseUid: body.firebaseUid || verifiedUid,
      email: String(verifiedEmail || body.email || ''),
      mobile: String(body.mobile || ''),
      studentName: String(body.studentName || 'Student'),
      accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
      deviceId: String(body.deviceId || req.headers['x-device-id'] || ''),
      hardwareSignature: String(body.hardwareSignature || req.headers['x-hardware-signature'] || ''),
      deviceSignature: String(body.deviceSignature || req.headers['x-device-signature'] || ''),
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });

    return res.status(result.statusCode).json({
      success: result.success,
      error: result.error,
      session: result.session
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Device recovery failed.'
    });
  }
});

// 8.0f Admin: List all active & historical device sessions
app.get('/api/admin/sessions', async (req: Request, res: Response) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || 'Administrator authentication required.'
    });
  }

  const sessions = await listDeviceSessionsAdminServer();
  return res.json({
    success: true,
    totalCount: sessions.length,
    sessions
  });
});

// 8.0g Admin: Terminate a user's active device session immediately
app.post('/api/admin/sessions/terminate', async (req: Request, res: Response) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || 'Administrator authentication required.'
    });
  }

  try {
    const userId = String(req.body?.userId || '').trim();
    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId is required.' });
    }
    const reason = String(req.body?.reason || 'Terminated by administrator');
    const result = await terminateDeviceSessionAdminServer(userId, reason);
    return res.json({
      success: true,
      session: result.session
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to terminate session.'
    });
  }
});

// 8.1 Sync student/teacher subscription (paid plans strictly require verified payment proof)
app.post('/api/subscription/sync', async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      plan,
      selectedBoard,
      board,
      selectedClass,
      activatedBoard,
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

    // Enforce active single-device session validation
    const isGuestOrDemo = cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
    if (!isGuestOrDemo) {
      const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
      if (!sessionCheck.valid) {
        return res.status(sessionCheck.statusCode).json({
          success: false,
          code: 'SINGLE_DEVICE_SESSION_INVALID',
          error: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
        });
      }
    }

    // Require verified Firebase Bearer token on non-guest sync requests when Admin SDK is configured
    if (isFirebaseAdminConfigured() && !isGuestOrDemo) {
      if (!req.headers.authorization) {
        return res.status(401).json({
          success: false,
          error: 'Authentication Bearer token required for subscription synchronization.'
        });
      }
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

    const existingStoredSub = await evaluateServerSubscriptionFromStore(cleanStudentId);
    const storedStudent = await serverGetDoc('students', cleanStudentId).catch(() => null);
    const existingServerSub = serverStudentSubscriptions.get(cleanStudentId) || existingStoredSub;
    const existingMap = extractServerClassSubscriptionsMap(storedStudent || existingServerSub);
    const existingCatMap = extractServerCategorySubscriptionsMap(storedStudent || existingServerSub);

    const requestedTargetBoard = normalizeBackendBoard(
      selectedBoard ||
        board ||
        activatedBoard ||
        storedStudent?.board ||
        existingServerSub?.selectedBoard ||
        'Maharashtra'
    );
    const requestedTargetClass =
      normalizeBackendClassLevel(selectedClass || activatedClassLevel) ||
      normalizeBackendClassLevel(storedStudent?.classLevel) ||
      existingServerSub?.selectedClass ||
      'Class 1';
    const primaryBoard = normalizeBackendBoard(
      storedStudent?.primaryBoard ||
        existingServerSub?.primaryBoard ||
        storedStudent?.board ||
        requestedTargetBoard
    );
    const primaryClassLevel =
      normalizeBackendClassLevel(storedStudent?.primaryClassLevel) ||
      normalizeBackendClassLevel(existingServerSub?.primaryClassLevel) ||
      normalizeBackendClassLevel(storedStudent?.classLevel) ||
      requestedTargetClass;
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
          error: 'Paid Plan requires a verified paymentId.'
        });
      }

      // Verify payment proof against server ledger, Firestore /transactions, or live Razorpay API
      let verifiedBoardFromProof: BackendBoard | null = null;
      let verifiedClassFromProof: string | null = null;
      let verifiedPlanSkuFromProof: PlanSkuId | null = req.body?.planSku
        ? resolvePlanSku(req.body.planSku, 'premium')
        : null;
      let paymentVerified = processedPaymentIds.has(cleanPaymentId);
      const ledgerMatch = transactionLedger.find(
        (t) =>
          t.paymentId === cleanPaymentId &&
          t.status === 'SUCCESS' &&
          t.studentId === cleanStudentId
      );
      if (ledgerMatch) {
        paymentVerified = true;
        if (ledgerMatch.planSku) verifiedPlanSkuFromProof = ledgerMatch.planSku;
        verifiedBoardFromProof = ledgerMatch.selectedBoard
          ? normalizeBackendBoard(ledgerMatch.selectedBoard)
          : null;
        verifiedClassFromProof = normalizeBackendClassLevel(ledgerMatch.selectedClass);
      }

      if (!paymentVerified || !verifiedClassFromProof || !verifiedPlanSkuFromProof) {
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
          if (txDoc.planSku) {
            verifiedPlanSkuFromProof = resolvePlanSku(txDoc.planSku, 'premium', txDoc.amount);
          }
          if (txDoc.selectedBoard || txDoc.board) {
            verifiedBoardFromProof = normalizeBackendBoard(txDoc.selectedBoard || txDoc.board);
          }
          verifiedClassFromProof =
            normalizeBackendClassLevel(txDoc.selectedClass || txDoc.classLevel) ||
            verifiedClassFromProof;
        }
      }

      if (
        !paymentVerified &&
        storedStudent?.lastPaymentId === cleanPaymentId &&
        storedStudent?.plan === 'premium'
      ) {
        paymentVerified = true;
      }

      if (!paymentVerified && getResolvedRazorpayCredentials().isConfigured) {
        const apiCheck = await verifyAndConfirmCapturedPayment({
          paymentId: cleanPaymentId,
          expectedPlanId: 'premium',
          expectedPlanSku: verifiedPlanSkuFromProof || undefined,
          autoCaptureIfAuthorized: false
        });
        const notesSid = String(apiCheck.notes?.studentId || '').trim();
        if (apiCheck.confirmed && (!notesSid || notesSid === cleanStudentId)) {
          paymentVerified = true;
          processedPaymentIds.add(cleanPaymentId);
          verifiedPlanSkuFromProof = resolvePlanSku(
            apiCheck.notes?.planSku || apiCheck.planSku,
            'premium',
            apiCheck.amountPaise
          );
          if (apiCheck.notes?.selectedBoard || apiCheck.notes?.board) {
            verifiedBoardFromProof = normalizeBackendBoard(
              apiCheck.notes?.selectedBoard || apiCheck.notes?.board
            );
          }
          verifiedClassFromProof =
            normalizeBackendClassLevel(
              apiCheck.notes?.selectedClass || apiCheck.notes?.classLevel
            ) || verifiedClassFromProof;
        }
      }

      if (!paymentVerified) {
        return res.status(403).json({
          success: false,
          error: 'Unverified paymentId. Premium subscription sync rejected.'
        });
      }

      const resolvedSyncSku = verifiedPlanSkuFromProof || 'BOARD_CLASS';
      const syncPlanItem = getPlanCatalogItem(resolvedSyncSku);
      const isCatSync = syncPlanItem.unlockedCategories.length > 0;

      if (isCatSync) {
        const updatedCatMap: Partial<Record<CategoryId, CategorySubscriptionRecord>> = { ...existingCatMap };
        let resStart = '';
        let resExp = '';
        for (const catId of syncPlanItem.unlockedCategories) {
          const prevCat = updatedCatMap[catId];
          const fallbackCatDates = computeSubscriptionActivationDates({
            verificationTimestamp: prevCat?.purchasedAt || planPurchasedAt || new Date(),
            existingPlan: prevCat ? 'premium' : 'free',
            existingExpiresAt: prevCat?.expiresAt
          });
          resStart = prevCat?.purchasedAt || planPurchasedAt || fallbackCatDates.purchasedDateIst;
          resExp = prevCat?.expiresAt || planExpiresAt || fallbackCatDates.expiryDateIst;
          updatedCatMap[catId] = {
            categoryId: catId,
            planSku: resolvedSyncSku,
            status: 'ACTIVE',
            purchasedAt: resStart,
            expiresAt: resExp,
            paymentId: cleanPaymentId,
            amountInr: syncPlanItem.amountInr,
            validityDays: syncPlanItem.validityDays,
            updatedAt: new Date().toISOString()
          };
        }
        const draftSub: ServerStudentSubscription = {
          ...existingServerSub,
          studentId: cleanStudentId,
          plan: 'premium',
          selectedBoard: existingServerSub.selectedBoard || requestedTargetBoard,
          selectedClass: existingServerSub.selectedClass || requestedTargetClass,
          primaryBoard,
          primaryClassLevel,
          classSubscriptions: existingMap,
          categorySubscriptions: updatedCatMap,
          accountRole: resolvedRole,
          hasStoredProfile:
            Boolean(storedStudent) ||
            (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')),
          isLifetimeFree: false,
          planPurchasedAt: existingServerSub.planPurchasedAt || resStart,
          planExpiresAt:
            existingServerSub.planExpiresAt && existingServerSub.planExpiresAt > resExp
              ? existingServerSub.planExpiresAt
              : resExp,
          paymentId: cleanPaymentId,
          updatedAt: new Date().toISOString()
        };
        draftSub.activatedClassKeys = getServerActivatedBoardClassKeys(draftSub);
        draftSub.activatedClasses = getServerActivatedClasses(draftSub);
        draftSub.activatedCategoryKeys = getServerActivatedCategoryKeys(draftSub);
        serverStudentSubscriptions.set(cleanStudentId, draftSub);
        return res.json({ success: true, subscription: draftSub });
      }

      const targetPaidBoard = verifiedBoardFromProof || requestedTargetBoard;
      const targetPaidClass = verifiedClassFromProof || requestedTargetClass;
      const targetCompositeKey = buildBackendBoardClassKey(targetPaidBoard, targetPaidClass);
      const existingEntry = existingMap[targetCompositeKey];
      const fallbackDates = computeSubscriptionActivationDates({
        verificationTimestamp:
          existingEntry?.purchasedAt || planPurchasedAt || new Date(),
        existingPlan: existingEntry?.plan || 'free',
        existingExpiresAt: existingEntry?.expiresAt
      });

      const resolvedStart =
        existingEntry?.purchasedAt || planPurchasedAt || fallbackDates.purchasedDateIst;
      const resolvedExpiry =
        existingEntry?.expiresAt || planExpiresAt || fallbackDates.expiryDateIst;

      const updatedMap: Record<string, ServerClassSubscriptionEntry> = {
        ...existingMap,
        [targetCompositeKey]: {
          board: targetPaidBoard,
          classLevel: targetPaidClass,
          boardClassKey: targetCompositeKey,
          plan: 'premium',
          status: 'ACTIVE',
          purchasedAt: resolvedStart,
          expiresAt: resolvedExpiry,
          paymentId: cleanPaymentId,
          amountInr: 99,
          validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
          updatedAt: new Date().toISOString()
        }
      };

      const draftSub: ServerStudentSubscription = {
        studentId: cleanStudentId,
        plan: 'premium',
        selectedBoard: targetPaidBoard,
        selectedClass: targetPaidClass,
        primaryBoard,
        primaryClassLevel,
        activatedBoard: targetPaidBoard,
        activatedClassLevel: targetPaidClass,
        classSubscriptions: updatedMap,
        categorySubscriptions: existingCatMap,
        accountRole: resolvedRole,
        hasStoredProfile:
          Boolean(storedStudent) ||
          (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')),
        isLifetimeFree: false,
        planPurchasedAt: resolvedStart,
        planExpiresAt: resolvedExpiry,
        paymentId: cleanPaymentId,
        updatedAt: new Date().toISOString()
      };
      draftSub.activatedClassKeys = getServerActivatedBoardClassKeys(draftSub);
      draftSub.activatedClasses = getServerActivatedClasses(draftSub);
      draftSub.activatedCategoryKeys = getServerActivatedCategoryKeys(draftSub);
      serverStudentSubscriptions.set(cleanStudentId, draftSub);
      return res.json({ success: true, subscription: draftSub });
    }

    // Default / Free Lifetime Plan (preserving any other paid pairs or category subscriptions if they exist)
    const freeRecord: ServerStudentSubscription = {
      studentId: cleanStudentId,
      plan: 'free',
      selectedBoard: requestedTargetBoard,
      selectedClass: requestedTargetClass,
      primaryBoard,
      primaryClassLevel,
      activatedBoard: null,
      activatedClassLevel: null,
      activatedClasses: [],
      activatedClassKeys: [],
      classSubscriptions: existingMap,
      activatedCategoryKeys: [],
      categorySubscriptions: existingCatMap,
      accountRole: resolvedRole,
      hasStoredProfile:
        Boolean(storedStudent) ||
        (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')),
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: new Date().toISOString()
    };
    const evaluatedFree = (() => {
      serverStudentSubscriptions.set(cleanStudentId, freeRecord);
      return evaluateServerSubscription(cleanStudentId);
    })();
    serverStudentSubscriptions.set(cleanStudentId, evaluatedFree);
    return res.json({ success: true, subscription: evaluatedFree });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 8.1b Switch active (board, class) among unlocked/activated (board, class) pairs ONLY (locks unpaid/expired pairs)
app.post('/api/subscription/switch-class', async (req: Request, res: Response) => {
  try {
    const cleanStudentId = String(req.body?.studentId || '').trim();
    const targetClass = normalizeBackendClassLevel(
      req.body?.targetClass || req.body?.selectedClass || req.body?.classLevel
    );

    if (!cleanStudentId || !targetClass) {
      return res.status(400).json({
        success: false,
        allowed: false,
        error: 'Valid studentId and targetClass (Class 1 to Class 10) are required.'
      });
    }

    const isGuestOrDemo = cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
    if ((isFirebaseAdminConfigured() || req.headers.authorization) && !isGuestOrDemo) {
      if (!req.headers.authorization) {
        return res.status(401).json({
          success: false,
          allowed: false,
          error: 'Authentication Bearer token required to switch active class or board.'
        });
      }
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid || !tokenCheck.uid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          allowed: false,
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
            allowed: false,
            error: 'Forbidden: Token does not match target student account.'
          });
        }
      }
    }

    const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        success: false,
        allowed: false,
        code: 'SINGLE_DEVICE_SESSION_INVALID',
        error: sessionCheck.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }

    const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
    const targetBoard = normalizeBackendBoard(
      req.body?.targetBoard || req.body?.selectedBoard || req.body?.board || sub.selectedBoard
    );
    const targetCompositeKey = buildBackendBoardClassKey(targetBoard, targetClass);
    const incomingStudentKeys = Array.isArray(req.body?.studentActivatedClassKeys)
      ? req.body.studentActivatedClassKeys
          .map((k: unknown) => parseBackendBoardClassKey(String(k || '')))
          .filter(Boolean)
          .map((p: any) => buildBackendBoardClassKey(p.board, p.classLevel))
      : [];
    const activateIfMissing = Boolean(req.body?.activateAdditionalBoardClass);
    const mergedStudentActivatedKeys = Array.from(
      new Set<string>([
        ...(Array.isArray(sub.studentActivatedClassKeys) ? sub.studentActivatedClassKeys : []),
        ...incomingStudentKeys,
        ...(activateIfMissing ? [targetCompositeKey] : [])
      ])
    );
    const subWithActivations: ServerStudentSubscription = {
      ...sub,
      studentActivatedClassKeys: mergedStudentActivatedKeys
    };
    const classStatus = getServerBoardClassStatus(subWithActivations, targetBoard, targetClass);

    if (!classStatus.isAccessible) {
      return res.status(403).json({
        success: false,
        allowed: false,
        status: classStatus.status,
        needsPurchase: classStatus.status === 'LOCKED',
        needsRenewal: classStatus.status === 'EXPIRED',
        targetBoard,
        targetClass,
        boardClassKey: classStatus.boardClassKey,
        error:
          classStatus.status === 'EXPIRED'
            ? `Your subscription for ${targetBoard} • ${targetClass} has expired. Renew ${targetBoard} (${targetClass}) for ₹99 (365 Days) to switch.`
            : `${targetBoard} • ${targetClass} is locked on your account. Activate ${targetBoard} (${targetClass}) before switching.`
      });
    }

    const updatedSub: ServerStudentSubscription = {
      ...subWithActivations,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      plan: classStatus.isPaidActive ? 'premium' : 'free',
      activatedBoard: classStatus.isPaidActive ? targetBoard : sub.activatedBoard,
      activatedClassLevel: classStatus.isPaidActive ? targetClass : sub.activatedClassLevel,
      planPurchasedAt: classStatus.purchasedAt || sub.planPurchasedAt,
      planExpiresAt: classStatus.expiresAt ?? sub.planExpiresAt,
      updatedAt: new Date().toISOString()
    };
    serverStudentSubscriptions.set(cleanStudentId, updatedSub);

    try {
      if (!isGuestOrDemo) {
        const isPrimaryOrPaid =
          (targetBoard === (sub.primaryBoard || 'Maharashtra') &&
            targetClass === (sub.primaryClassLevel || 'Class 1')) ||
          classStatus.isPaidActive;
        const updateDocPayload: Record<string, any> = {
          activeWorkspaceBoard: targetBoard,
          activeWorkspaceClassLevel: targetClass,
          lastActiveDate: new Date().toISOString()
        };
        if (mergedStudentActivatedKeys.length > 0) {
          updateDocPayload.studentActivatedClassKeys = mergedStudentActivatedKeys;
        }
        if (isPrimaryOrPaid) {
          updateDocPayload.board = targetBoard;
          updateDocPayload.classLevel = targetClass;
        }
        await serverUpdateDoc('students', cleanStudentId, updateDocPayload);
      }
    } catch {
      // Cache still updated if document does not exist yet
    }

    return res.json({
      success: true,
      allowed: true,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      boardClassKey: classStatus.boardClassKey,
      studentActivatedClassKeys: mergedStudentActivatedKeys,
      status: classStatus.status,
      subscription: updatedSub
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, allowed: false, error: error.message });
  }
});

// Reusable Firebase Bearer authentication & student-ownership gate (fail-closed)
async function verifyStudentOwnershipOrAdmin(
  req: Request,
  targetStudentId: string
): Promise<{ authorized: boolean; statusCode: number; uid?: string; error?: string }> {
  const cleanTargetId = String(targetStudentId || '').trim();
  if (!cleanTargetId) {
    return { authorized: false, statusCode: 400, error: 'studentId is required.' };
  }
  const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
  if (!tokenCheck.valid || !tokenCheck.uid) {
    return {
      authorized: false,
      statusCode: tokenCheck.statusCode || 401,
      error: tokenCheck.error || 'Valid Firebase Authorization Bearer token required.'
    };
  }
  if (tokenCheck.uid === cleanTargetId) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  const existingStudent = await serverGetDoc('students', cleanTargetId).catch(() => null);
  if (existingStudent?.firebaseUid === tokenCheck.uid) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  const adminCheck = await verifyAdminRequest(req.headers);
  if (adminCheck.authorized) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  return {
    authorized: false,
    statusCode: 403,
    error: 'Forbidden: Authenticated user does not own this student account.'
  };
}

// 8.2 Get student/teacher subscription status (protected by Firebase Bearer auth + student ownership)
app.get('/api/subscription/status/:studentId', async (req: Request, res: Response) => {
  const studentId = String(req.params.studentId || '').trim();
  const ownerCheck = await verifyStudentOwnershipOrAdmin(req, studentId);
  if (!ownerCheck.authorized) {
    return res.status(ownerCheck.statusCode).json({
      success: false,
      error: ownerCheck.error || 'Unauthorized access to subscription status.'
    });
  }

  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const queryBoard = req.query.board ? normalizeBackendBoard(String(req.query.board)) : null;
  const userBoard = queryBoard || sub.selectedBoard || sub.primaryBoard || 'Maharashtra';
  const userClass = sub.selectedClass || sub.primaryClassLevel || 'Class 1';
  const demoIds = getServerFreeDemoIdsForClass(userClass, userBoard);
  const perClassStatus = Object.fromEntries(
    VALID_CLASS_LEVELS.map((cls) => [cls, getServerBoardClassStatus(sub, userBoard, cls)])
  );
  const perBoardClassStatus = Object.fromEntries(
    VALID_BOARDS.flatMap((b) =>
      VALID_CLASS_LEVELS.map((cls) => [
        buildBackendBoardClassKey(b, cls),
        getServerBoardClassStatus(sub, b, cls)
      ])
    )
  );
  return res.json({
    success: true,
    subscription: sub,
    perClassStatus,
    perBoardClassStatus,
    activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
    categorySubscriptions: sub.categorySubscriptions || {},
    catalog: PLAN_CATALOG,
    plans: {
      free: {
        id: 'free',
        name: 'Free Plan',
        priceInr: 0,
        validity: 'Lifetime (Never Expires)',
        selectedBoard: sub.primaryBoard || userBoard,
        selectedClass: sub.primaryClassLevel || userClass,
        allowedSubjects: Array.from(SERVER_FREE_ALLOWED_SUBJECTS),
        allowedWorksheets: demoIds,
        allowedFeatures: Array.from(SERVER_FREE_ALLOWED_FEATURES)
      },
      premium: {
        id: 'premium',
        name: 'Premium Plan',
        priceInr: 99,
        validity: '1 Year (365 Days) Per Board & Class',
        selectedBoard: userBoard,
        selectedClass: userClass,
        activatedClasses: getServerActivatedClasses(sub, userBoard),
        activatedClassKeys: getServerActivatedBoardClassKeys(sub),
        activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
        allowedSubjects: 'ALL_SUBJECTS_FOR_SELECTED_BOARD_AND_CLASS',
        allowedWorksheets: `ALL_WORKSHEETS_FOR_${userBoard.toUpperCase()}_${userClass.toUpperCase().replace(/\s+/g, '_')}`,
        allowedFeatures: 'ALL_FEATURES'
      }
    }
  });
});

const SERVER_WORKSHEET_UPGRADE_MSG =
  'Unlock All Worksheets for Your Board & Class – Only ₹99!';

// 8.3 Backend access verification for features, categories, subjects, and worksheets (strictly paid — no role bypass)
app.post('/api/subscription/verify-access', async (req: Request, res: Response) => {
  const { studentId, feature, categoryId, subject, worksheetId, selectedBoard, board, selectedClass } = req.body || {};
  const cleanStudentId = String(studentId || '').trim();
  const isGuestOrDemo = !cleanStudentId || cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
  if (!isGuestOrDemo) {
    const ownerCheck = await verifyStudentOwnershipOrAdmin(req, cleanStudentId);
    if (!ownerCheck.authorized) {
      return res.status(ownerCheck.statusCode).json({
        allowed: false,
        error: ownerCheck.error || 'Unauthorized access verification request.'
      });
    }
    const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        allowed: false,
        code: 'SINGLE_DEVICE_SESSION_INVALID',
        error: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE,
        message: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      });
    }
  }
  const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);

  if (categoryId) {
    const cat = String(categoryId) as CategoryId;
    const allowed = ALL_CATEGORY_IDS.includes(cat) && hasServerCategoryAccess(sub, cat);
    return res.json({
      success: true,
      allowed,
      categoryId: cat,
      activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
      effectivePlan: allowed ? 'premium' : 'free',
      requiredPlan: 'premium',
      message: allowed
        ? 'Category plan access granted.'
        : `Paid plan required to unlock ${cat}.`
    });
  }

  const requestedBoard =
    selectedBoard || board ? normalizeBackendBoard(selectedBoard || board) : null;
  const requestedClass = normalizeBackendClassLevel(selectedClass);
  const userBoard =
    (sub.hasStoredProfile ? sub.selectedBoard : requestedBoard) ||
    sub.selectedBoard ||
    sub.primaryBoard ||
    'Maharashtra';
  const userClass =
    (sub.hasStoredProfile ? sub.selectedClass : requestedClass) ||
    sub.selectedClass ||
    sub.primaryClassLevel ||
    'Class 1';

  if (worksheetId) {
    const cleanWsId = String(worksheetId).trim();
    const parsedWs = parseServerWorksheetBoardAndClass(cleanWsId);
    const wsBoard = parsedWs?.board || requestedBoard || userBoard;
    const wsClass = parsedWs?.classLevel || requestedClass || userClass;
    const wsClassStatus = getServerBoardClassStatus(sub, wsBoard, wsClass);
    const activePaidKeys = getServerActivatedBoardClassKeys(sub);
    const hasUniversalWs = wsClassStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
    const demoIds = new Set(getServerFreeDemoIdsForClass(wsClass, wsBoard));
    const isDemo = demoIds.has(cleanWsId);

    let allowed = false;
    let upgradeMsg = SERVER_WORKSHEET_UPGRADE_MSG;
    if (hasUniversalWs) {
      allowed = true;
      upgradeMsg = '';
    } else if (wsClassStatus.status === 'EXPIRED') {
      if (wsClassStatus.isFreeBase && activePaidKeys.length === 0 && isDemo) {
        allowed = true;
        upgradeMsg = '';
      } else {
        allowed = false;
        upgradeMsg = `Subscription Expired: Your 1-year subscription for ${wsBoard} (${wsClass}) has expired. Renew for ₹99 (365 Days) to restore access!`;
      }
    } else if (wsClassStatus.status === 'LOCKED') {
      allowed = false;
      upgradeMsg = `Board & Class Restriction: ${wsBoard} (${wsClass}) is locked on your account. Activate ${wsBoard} (${wsClass}) for ₹99 (365 Days) to unlock all worksheets.`;
    } else {
      allowed = isDemo;
    }

    return res.json({
      success: true,
      allowed,
      isDemo: hasUniversalWs ? false : isDemo && allowed,
      isOtherClassLocked: !hasUniversalWs && wsClassStatus.status === 'LOCKED',
      isClassExpired: !hasUniversalWs && wsClassStatus.status === 'EXPIRED',
      selectedBoard: userBoard,
      selectedClass: userClass,
      worksheetBoard: wsBoard,
      worksheetClass: wsClass,
      effectivePlan: hasUniversalWs ? 'premium' : 'free',
      requiredPlan: 'premium',
      upgradeMessage: allowed ? '' : upgradeMsg,
      message: allowed ? 'Worksheet access granted.' : upgradeMsg
    });
  }

  const targetBoard = requestedBoard || userBoard;
  const targetClass = requestedClass || userClass;
  const targetStatus = getServerBoardClassStatus(sub, targetBoard, targetClass);

  if (subject) {
    const allowedOnFree = SERVER_FREE_ALLOWED_SUBJECTS.has(String(subject));
    let allowed = false;
    if (targetStatus.isPaidActive) {
      allowed = true;
    } else if (targetStatus.status === 'ACTIVE_FREE') {
      allowed = allowedOnFree;
    } else if (targetStatus.status === 'EXPIRED') {
      allowed =
        targetStatus.isFreeBase &&
        getServerActivatedBoardClassKeys(sub).length === 0 &&
        allowedOnFree;
    }

    return res.json({
      success: true,
      allowed,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      effectivePlan: targetStatus.isPaidActive ? 'premium' : 'free',
      requiredPlan: 'premium',
      message: allowed
        ? 'Access granted.'
        : targetStatus.status === 'LOCKED'
        ? `${targetBoard} • ${targetClass} is locked. Activate for ₹99 (365 Days) to unlock ${subject}.`
        : `${subject} requires the ₹99 Premium Plan for ${targetBoard} (${targetClass}).`
    });
  }

  if (feature) {
    const cleanFeature = String(feature);
    const hasAnyActivePaid = getServerActivatedBoardClassKeys(sub).length > 0;
    const isBoardClassFeature = cleanFeature === 'study-material';
    const hasCategoryUnlock =
      (cleanFeature === 'scholarship' &&
        (hasServerCategoryAccess(sub, 'scholarship_4th') || hasServerCategoryAccess(sub, 'scholarship_7th'))) ||
      (cleanFeature === 'tet-ctet' &&
        (hasServerCategoryAccess(sub, 'maha_tet') ||
          hasServerCategoryAccess(sub, 'ctet_paper_1') ||
          hasServerCategoryAccess(sub, 'ctet_paper_2')));

    const allowed = isBoardClassFeature
      ? targetStatus.isPaidActive || targetStatus.status === 'ACTIVE_FREE'
      : cleanFeature === 'scholarship' || cleanFeature === 'tet-ctet'
      ? hasCategoryUnlock
      : targetStatus.isPaidActive ||
        hasAnyActivePaid ||
        SERVER_FREE_ALLOWED_FEATURES.has(cleanFeature);
    const effectivePlan: 'free' | 'premium' =
      hasCategoryUnlock || targetStatus.isPaidActive || (!isBoardClassFeature && hasAnyActivePaid)
        ? 'premium'
        : 'free';

    return res.json({
      success: true,
      allowed,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      effectivePlan,
      requiredPlan: 'premium',
      message: allowed
        ? 'Access granted.'
        : 'This feature requires an active paid subscription plan.'
    });
  }

  return res.json({
    success: true,
    allowed: targetStatus.isAccessible,
    selectedBoard: targetBoard,
    selectedClass: targetClass,
    effectivePlan: targetStatus.isPaidActive ? 'premium' : 'free'
  });
});

// 8.4 Dedicated Board & Class-Wise Worksheet Access Verification API (Standards 1st to 10th)
// Protected by Firebase Bearer auth + student ownership verification
app.get('/api/worksheets/access/:studentId', async (req: Request, res: Response) => {
  const studentId = String(req.params.studentId || '').trim();
  const ownerCheck = await verifyStudentOwnershipOrAdmin(req, studentId);
  if (!ownerCheck.authorized) {
    return res.status(ownerCheck.statusCode).json({
      success: false,
      error: ownerCheck.error || 'Unauthorized access to worksheet entitlements.'
    });
  }

  const queryBoard = req.query.selectedBoard || req.query.board
    ? normalizeBackendBoard(String(req.query.selectedBoard || req.query.board))
    : null;
  const queryClass = req.query.selectedClass
    ? normalizeBackendClassLevel(String(req.query.selectedClass))
    : null;
  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const userBoard =
    (sub.hasStoredProfile ? queryBoard || sub.selectedBoard : queryBoard) ||
    sub.selectedBoard ||
    sub.primaryBoard ||
    'Maharashtra';
  const userClass =
    (sub.hasStoredProfile ? queryClass || sub.selectedClass : queryClass) ||
    sub.selectedClass ||
    sub.primaryClassLevel ||
    'Class 1';
  const classStatus = getServerBoardClassStatus(sub, userBoard, userClass);
  const isPremium = classStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
  const demoIds = getServerFreeDemoIdsForClass(userClass, userBoard);

  return res.json({
    success: true,
    studentId,
    selectedBoard: userBoard,
    selectedClass: userClass,
    classStatus: classStatus.status,
    activatedBoard: classStatus.isPaidActive ? userBoard : null,
    activatedClassLevel: classStatus.isPaidActive ? userClass : null,
    activatedClasses: getServerActivatedClasses(sub, userBoard),
    activatedClassKeys: getServerActivatedBoardClassKeys(sub),
    effectivePlan: isPremium ? 'premium' : 'free',
    isPremium,
    printingAllowed: false,
    downloadingAllowed: false,
    demoWorksheetIds: !isPremium && classStatus.status === 'ACTIVE_FREE' ? demoIds : [],
    allowedWorksheets: isPremium
      ? 'ALL_WORKSHEETS_UNIVERSAL_ALL_BOARDS_CLASSES_1_TO_10'
      : classStatus.status === 'ACTIVE_FREE'
      ? demoIds
      : [],
    upgradeMessage: SERVER_WORKSHEET_UPGRADE_MSG
  });
});

app.post('/api/worksheets/verify-access', async (req: Request, res: Response) => {
  const { studentId, worksheetId, selectedBoard, board, selectedClass } = req.body || {};
  const cleanStudentId = String(studentId || '').trim();
  const cleanWorksheetId = String(worksheetId || '').trim();

  if (!cleanWorksheetId) {
    return res.status(400).json({
      success: false,
      allowed: false,
      error: 'worksheetId is required.'
    });
  }

  const isGuestOrDemo = !cleanStudentId || cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
  if (!isGuestOrDemo) {
    const ownerCheck = await verifyStudentOwnershipOrAdmin(req, cleanStudentId);
    if (!ownerCheck.authorized) {
      return res.status(ownerCheck.statusCode).json({
        success: false,
        allowed: false,
        error: ownerCheck.error || 'Unauthorized worksheet access verification.'
      });
    }
  }

  const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
  if (!sessionCheck.valid) {
    return res.status(sessionCheck.statusCode).json({
      success: false,
      allowed: false,
      code: 'SINGLE_DEVICE_SESSION_INVALID',
      error: sessionCheck.error || SINGLE_DEVICE_BLOCK_MESSAGE
    });
  }

  const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
  const parsedWs = parseServerWorksheetBoardAndClass(cleanWorksheetId);
  const userBoard =
    (sub.hasStoredProfile
      ? sub.selectedBoard
      : selectedBoard || board
      ? normalizeBackendBoard(selectedBoard || board)
      : null) ||
    sub.selectedBoard ||
    sub.primaryBoard ||
    parsedWs?.board ||
    'Maharashtra';
  const userClass =
    (sub.hasStoredProfile
      ? sub.selectedClass
      : normalizeBackendClassLevel(selectedClass)) ||
    sub.selectedClass ||
    sub.primaryClassLevel ||
    parsedWs?.classLevel ||
    'Class 1';
  const wsBoard = parsedWs?.board || userBoard;
  const wsClass = parsedWs?.classLevel || userClass;
  const wsClassStatus = getServerBoardClassStatus(sub, wsBoard, wsClass);
  const activePaidKeys = getServerActivatedBoardClassKeys(sub);
  const hasUniversalWs = wsClassStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
  const demoIds = new Set(getServerFreeDemoIdsForClass(wsClass, wsBoard));
  const isDemo = demoIds.has(cleanWorksheetId);

  let allowed = false;
  let upgradeMsg = SERVER_WORKSHEET_UPGRADE_MSG;
  if (hasUniversalWs) {
    allowed = true;
    upgradeMsg = '';
  } else if (wsClassStatus.status === 'EXPIRED') {
    if (wsClassStatus.isFreeBase && activePaidKeys.length === 0 && isDemo) {
      allowed = true;
      upgradeMsg = '';
    } else {
      allowed = false;
      upgradeMsg = `Subscription Expired: Your 1-year subscription for ${wsBoard} (${wsClass}) has expired. Renew for ₹99 (365 Days) to restore access!`;
    }
  } else if (wsClassStatus.status === 'LOCKED') {
    allowed = false;
    upgradeMsg = `Board & Class Restriction: ${wsBoard} (${wsClass}) is locked on your account. Activate ${wsBoard} (${wsClass}) for ₹99 (365 Days) to unlock worksheets.`;
  } else {
    allowed = isDemo;
  }

  return res.status(allowed ? 200 : 403).json({
    success: allowed,
    allowed,
    isDemo: hasUniversalWs ? false : isDemo && allowed,
    isOtherClassLocked: !hasUniversalWs && wsClassStatus.status === 'LOCKED',
    isClassExpired: !hasUniversalWs && wsClassStatus.status === 'EXPIRED',
    studentId: cleanStudentId,
    selectedBoard: userBoard,
    selectedClass: userClass,
    worksheetBoard: wsBoard,
    worksheetClass: wsClass,
    worksheetId: cleanWorksheetId,
    effectivePlan: hasUniversalWs ? 'premium' : 'free',
    requiredPlan: 'premium',
    printingAllowed: false,
    downloadingAllowed: false,
    upgradeMessage: allowed ? '' : upgradeMsg
  });
});

// 11. AI Help & Support Assistant Chat & Support Request Endpoints
function resolveClientIp(req: Request): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.trim()) {
    return fwd.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
}

app.post('/api/support/chat', async (req: Request, res: Response) => {
  try {
    const payload = await handleSupportChatRequest(
      (req.body || {}) as Record<string, unknown>,
      resolveClientIp(req),
      req.headers as Record<string, string | string[] | undefined>
    );
    return res.status(payload.success ? 200 : 400).json(payload);
  } catch (err: any) {
    console.error('[Support Chat Route Error]:', err);
    return res.status(500).json({
      success: false,
      source: 'kb_fallback',
      aiStatus: 'upstream_error',
      reply:
        'Help Desk encountered a temporary issue. Please retry your question or submit a Support Request.',
      language: 'en',
      navigationActions: [],
      suggestSupportTicket: true,
    });
  }
});

app.get('/api/support/status', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    ...getSupportAiStatus(),
  });
});

app.get('/api/support/tickets', async (req: Request, res: Response) => {
  try {
    const studentId = req.query.studentId ? String(req.query.studentId).trim() : undefined;
    const ticketNumber = req.query.ticketNumber ? String(req.query.ticketNumber).trim() : undefined;

    const authHeader = req.headers.authorization;
    const rawToken =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length).trim()
        : undefined;

    if (ticketNumber) {
      const adminCheck = rawToken
        ? await verifyAdminRequest(req.headers).catch(() => ({ authorized: false }))
        : { authorized: false };
      const tickets = await getServerSupportTickets({
        ticketNumber,
        bearerToken: rawToken,
        includeContactDetails: Boolean(adminCheck.authorized),
      });
      return res.json({
        success: true,
        count: tickets.length,
        tickets,
      });
    }

    if (studentId) {
      const tokenRes = rawToken ? await verifyBearerIdToken(authHeader).catch(() => null) : null;
      const adminCheck =
        !tokenRes?.valid || tokenRes.uid !== studentId
          ? await verifyAdminRequest(req.headers).catch(() => ({ authorized: false, statusCode: 401 }))
          : { authorized: true, statusCode: 200 };
      const isOwner = Boolean(tokenRes?.valid && tokenRes.uid === studentId);
      if (!isOwner && !adminCheck.authorized) {
        return res.status(401).json({
          success: false,
          tickets: [],
          error: 'Authentication required to list account support tickets.',
        });
      }
      const tickets = await getServerSupportTickets({
        studentId,
        bearerToken: rawToken,
        includeContactDetails: true,
      });
      return res.json({
        success: true,
        count: tickets.length,
        tickets,
      });
    }

    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        tickets: [],
        error: adminCheck.error || 'Administrator authorization required to list all support tickets.',
      });
    }

    const tickets = await getServerSupportTickets({
      bearerToken: rawToken,
      includeContactDetails: true,
    });
    return res.json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (err: any) {
    console.error('[Support Ticket List Route Error]:', err);
    return res.status(500).json({
      success: false,
      tickets: [],
      error: 'Unable to load support requests right now.',
    });
  }
});

app.post('/api/support/tickets', async (req: Request, res: Response) => {
  try {
    const result = await handleSupportTicketSubmission(
      (req.body || {}) as Record<string, unknown>,
      { authorization: req.headers.authorization },
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[Support Ticket Route Error]:', err);
    return res.status(500).json({
      success: false,
      persisted: false,
      error: 'Unable to submit your support request right now. Please try again shortly.',
    });
  }
});

app.patch('/api/support/tickets/:ticketId', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        error: adminCheck.error || 'Administrator authorization required to update support tickets.',
      });
    }
    const authHeader = req.headers.authorization;
    const rawToken =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length).trim()
        : undefined;
    const ticketId = String(req.params.ticketId || '').trim();
    const { status, adminResponse } = (req.body || {}) as Record<string, unknown>;
    const result = await updateServerSupportTicketStatus(
      ticketId,
      String(status || 'IN_PROGRESS'),
      adminResponse !== undefined ? String(adminResponse) : undefined,
      rawToken
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[Support Ticket Update Route Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to update support ticket status.',
    });
  }
});

// 11b. Real Server-Side AI Tools Endpoints (Zero Fake AI)
app.get('/api/ai/status', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    ...getAiServiceStatus(),
  });
});

app.post('/api/ai/generate', async (req: Request, res: Response) => {
  try {
    const result = await handleAiTextGenerate(
      (req.body || {}) as Record<string, unknown>,
      resolveClientIp(req),
      req.headers as Record<string, string | string[] | undefined>
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[AI Generate Route Error]:', err);
    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected AI server error.',
    });
  }
});

app.post('/api/ai/image', async (req: Request, res: Response) => {
  try {
    const result = await handleAiImageGenerate(
      (req.body || {}) as Record<string, unknown>,
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[AI Image Route Error]:', err);
    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected AI image server error.',
    });
  }
});

// 11b-1. Owner-Only AI Usage & Billing Control Panel Endpoints (FREE AI ONLY Governance)
app.get('/api/admin/ai-policy', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        error: adminCheck.error || 'Owner administrator authorization required.',
      });
    }
    return res.json(getOwnerAiPolicyReport(isGeminiConfigured()));
  } catch (err: any) {
    console.error('[Admin AI Policy Read Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to load AI usage and billing protection telemetry.',
    });
  }
});

app.post('/api/admin/ai-policy/limits', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        error: adminCheck.error || 'Owner administrator authorization required.',
      });
    }
    const result = updateOwnerFreeTierLimits((req.body || {}) as Record<string, unknown>);
    return res.json(result);
  } catch (err: any) {
    console.error('[Admin AI Policy Limits Update Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to update free-tier safety limits.',
    });
  }
});

app.post('/api/admin/ai-policy/billing-decision', async (req: Request, res: Response) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        error: adminCheck.error || 'Owner administrator authorization required.',
      });
    }
    const result = recordOwnerBillingDecision(
      (req.body || {}) as Record<string, unknown>,
      adminCheck.email || 'ronakvarade2022@gmail.com'
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[Admin AI Billing Decision Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to record owner billing decision.',
    });
  }
});

// 11b-2. SnapSolve AI - Shared Ephemeral OCR & Question Solving Endpoints
app.get('/api/snapsolve/status', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    ...getSnapSolveStatus(),
  });
});

app.post('/api/snapsolve/recognize', async (req: Request, res: Response) => {
  try {
    const result = await handleSnapSolveRecognize(
      (req.body || {}) as Record<string, unknown>,
      req.headers as Record<string, string | string[] | undefined>,
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected error while scanning uploaded pages.',
    });
  }
});

app.post('/api/snapsolve/solve', async (req: Request, res: Response) => {
  try {
    const result = await handleSnapSolveSolve(
      (req.body || {}) as Record<string, unknown>,
      req.headers as Record<string, string | string[] | undefined>,
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected error while generating SnapSolve answers.',
    });
  }
});

app.delete('/api/snapsolve/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const result = await handleSnapSolveDeleteSession(
      String(req.params.sessionId || ''),
      req.headers as Record<string, string | string[] | undefined>
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Failed to clear temporary SnapSolve session.',
    });
  }
});

// 11c. 100% Original MyStudyZone Firebase-Backed Trilingual Dictionary Endpoints
app.get('/api/dictionary/entries', async (_req: Request, res: Response) => {
  try {
    const entries = await getServerCustomDictionaryEntries();
    return res.json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (err: any) {
    console.error('[Dictionary GET Error]:', err);
    return res.status(500).json({
      success: false,
      entries: [],
      message: 'Failed to load custom dictionary entries.',
    });
  }
});

app.post('/api/dictionary/entries', async (req: Request, res: Response) => {
  try {
    const result = await addServerCustomDictionaryEntry(
      (req.body || {}) as Record<string, unknown>
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err: any) {
    console.error('[Dictionary POST Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to save dictionary entry.',
    });
  }
});

// Zero-Cost Official Textbook & Educational Video Link Verification Route (SSRF-hardened)
function isSafeExternalEducationalUrl(rawUrl: string): {
  safe: boolean;
  parsed?: URL;
  reason?: string;
} {
  try {
    const trimmed = String(rawUrl || '').trim();
    if (!trimmed) return { safe: false, reason: 'URL is required.' };
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { safe: false, reason: 'Only HTTP/HTTPS educational links are permitted.' };
    }
    const host = parsed.hostname.toLowerCase();
    // Block localhost, internal hostnames, and private IPv4/IPv6 ranges (SSRF guard)
    if (
      host === 'localhost' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host === '[::1]' ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      return { safe: false, reason: 'Private or local network addresses are not permitted.' };
    }
    return { safe: true, parsed };
  } catch {
    return { safe: false, reason: 'Malformed URL format.' };
  }
}

app.post('/api/study-library/verify-link', async (req: Request, res: Response) => {
  const rawUrl = String(req.body?.url || '').trim();
  const check = isSafeExternalEducationalUrl(rawUrl);
  if (!check.safe || !check.parsed) {
    return res.status(400).json({
      success: false,
      ok: false,
      status: 0,
      url: rawUrl,
      error: check.reason || 'Invalid URL.',
      checkedAt: new Date().toISOString(),
    });
  }

  const targetUrl = check.parsed.toString();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    let response = await fetch(targetUrl, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)',
      },
    }).catch(() => null);

    // Some government textbook servers (e.g., eBalbharati / NCERT) reject HEAD with 403/405; fallback to lightweight GET
    if (!response || response.status === 405 || response.status === 403 || response.status >= 500) {
      response = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)',
          Range: 'bytes=0-1024',
        },
      });
    }

    const ok = response.status >= 200 && response.status < 400;
    return res.status(200).json({
      success: true,
      ok,
      status: response.status,
      url: rawUrl,
      finalUrl: response.url || targetUrl,
      contentType: response.headers.get('content-type') || 'unknown',
      checkedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(200).json({
      success: true,
      ok: false,
      status: 0,
      url: rawUrl,
      finalUrl: targetUrl,
      error: err?.name === 'AbortError' ? 'Connection timed out after 5 seconds.' : 'Unable to reach destination server.',
      checkedAt: new Date().toISOString(),
    });
  } finally {
    clearTimeout(timeoutId);
  }
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
    // Serve a clean no-WebSocket /@vite/client shim when HMR/WS is intentionally disabled
    app.get('/@vite/client', (_req, res) => {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(`
const sheetsMap = new Map();
const linkSheetsMap = new Map();
if ("document" in globalThis) {
  document.querySelectorAll("style[data-vite-dev-id]").forEach((el) => {
    sheetsMap.set(el.getAttribute("data-vite-dev-id"), el);
  });
  document.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]').forEach((el) => {
    linkSheetsMap.set(el.getAttribute("data-vite-dev-id"), el);
  });
}
let lastInsertedStyle;
export function updateStyle(id, content) {
  if (linkSheetsMap.has(id)) return;
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("data-vite-dev-id", id);
    style.textContent = content;
    if (!lastInsertedStyle) {
      document.head.appendChild(style);
      setTimeout(() => { lastInsertedStyle = undefined; }, 0);
    } else {
      lastInsertedStyle.insertAdjacentElement("afterend", style);
    }
    lastInsertedStyle = style;
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  if (linkSheetsMap.has(id)) {
    document.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id="' + CSS.escape(id) + '"]').forEach((el) => el.remove());
    linkSheetsMap.delete(id);
  }
  const style = sheetsMap.get(id);
  if (style) {
    document.head.removeChild(style);
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {}
  };
}
export function injectQuery(url, queryToInject) {
  if (url[0] !== "." && url[0] !== "/") return url;
  const pathname = url.replace(/[?#].*$/, "");
  const { search, hash } = new URL(url, "http://vite.dev");
  return pathname + "?" + queryToInject + (search ? "&" + search.slice(1) : "") + (hash || "");
}
export class ErrorOverlay extends HTMLElement {}
`);
    });
    app.use(vite.middlewares);
    console.log('[Dev Mode] Vite middlewares mounted to Express (HMR WebSocket disabled).');
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        immutable: true,
        setHeaders: (res, filePath) => {
          if (
            filePath.endsWith('.html') ||
            filePath.endsWith('manifest.json') ||
            filePath.endsWith('manifest.webmanifest') ||
            filePath.endsWith('sw.js') ||
            filePath.endsWith('registerSW.js')
          ) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      })
    );
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('[Production Mode] Compressed static dist served with immutable asset caching.');
  }

  const rawPort = process.env.PORT;
  if (rawPort === 'passenger') {
    httpServer.listen('passenger', () => {
      console.log('🚀 Champion Learning Server running via Phusion Passenger');
    });
  } else if (rawPort && (rawPort.startsWith('/') || rawPort.endsWith('.sock'))) {
    httpServer.listen(rawPort, () => {
      console.log(`🚀 Champion Learning Server running on Unix socket: ${rawPort}`);
    });
  } else {
    const listenPort = parseInt(rawPort || '3000', 10) || 3000;
    httpServer.listen(listenPort, '0.0.0.0', () => {
      console.log(`🚀 Champion Learning Server running on http://0.0.0.0:${listenPort}`);
    });
  }
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
