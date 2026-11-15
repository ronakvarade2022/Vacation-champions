import crypto from 'crypto';
import fs from 'fs';
import Razorpay from 'razorpay';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { serverGetDoc, serverSetDoc } from './admin.ts';
import {
  computeSubscriptionActivationDates,
  evaluateSubscriptionValidity,
  PAID_SUBSCRIPTION_VALIDITY_DAYS
} from '../src/utils/subscriptionDateUtils.ts';

try {
  setLogLevel('silent');
} catch {
  // Ignore if unsupported
}

const firebaseConfig = JSON.parse(
  fs.readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf8')
);

// Client-fallback Firestore handle (used only by legacy callers when Admin SDK creds are absent locally)
const firebaseServerApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const serverDb = getFirestore(
  firebaseServerApp,
  firebaseConfig.firestoreDatabaseId
);

export const VALID_BOARDS = ['Maharashtra', 'CBSE', 'ICSE'] as const;
export type BackendBoard = (typeof VALID_BOARDS)[number];

export function normalizeBackendBoard(raw?: string | null): BackendBoard {
  const s = String(raw || '').trim().toUpperCase();
  if (!s || s === 'MAHARASHTRA' || s === 'MAHARASHTRA STATE BOARD' || s === 'MSBSHSE' || s === 'MH') {
    return 'Maharashtra';
  }
  if (s === 'CBSE' || s === 'NCERT' || s.includes('CENTRAL BOARD')) {
    return 'CBSE';
  }
  if (s === 'ICSE' || s === 'CISCE' || s.includes('INDIAN CERTIFICATE')) {
    return 'ICSE';
  }
  return 'Maharashtra';
}

export const VALID_CLASS_LEVELS = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10'
] as const;

export function normalizeBackendClassLevel(raw?: string | null): string | null {
  const str = String(raw || '').trim();
  const match = /^(?:Class\s*)?(\d{1,2})(?:st|nd|rd|th)?$/i.exec(str);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num >= 1 && num <= 10) {
    return `Class ${num}`;
  }
  return null;
}

export function buildBackendBoardClassKey(board?: string | null, classLevel?: string | null): string {
  const b = normalizeBackendBoard(board);
  const c = normalizeBackendClassLevel(classLevel) || 'Class 1';
  return `${b}__${c}`;
}

export function parseBackendBoardClassKey(rawKey?: string | null): { board: BackendBoard; classLevel: string } | null {
  const str = String(rawKey || '').trim();
  if (!str) return null;
  if (str.includes('__')) {
    const [bRaw, cRaw] = str.split('__');
    const c = normalizeBackendClassLevel(cRaw);
    if (!c) return null;
    return { board: normalizeBackendBoard(bRaw), classLevel: c };
  }
  const c = normalizeBackendClassLevel(str);
  if (!c) return null;
  return { board: 'Maharashtra', classLevel: c };
}

export interface ResolvedRazorpayCredentials {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
  hasExplicitWebhookSecret: boolean;
  isConfigured: boolean;
  isLive: boolean;
  wasSwappedInEnv: boolean;
}

export function sanitizeEnvValue(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']+|["']+$/g, '').trim();
}

export function isPlaceholderValue(val: string): boolean {
  if (!val) return true;
  const upper = val.toUpperCase();
  return (
    upper.includes('YOUR_') ||
    upper.includes('MY_') ||
    upper.includes('REPLACE_') ||
    val === 'rzp_test_VACATION_CHAMP'
  );
}

/**
 * Resolves Razorpay Key ID, Key Secret, and Webhook Secret securely from environment variables.
 * Automatically detects if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET were entered
 * in swapped order so the secret is never exposed to the client.
 */
export function getResolvedRazorpayCredentials(): ResolvedRazorpayCredentials {
  const rawId = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_LIVE_KEY_ID ||
      process.env.VITE_RAZORPAY_KEY_ID
  );
  const rawSecret = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_LIVE_KEY_SECRET ||
      process.env.RAZORPAY_SECRET
  );
  const rawWebhookSecret = sanitizeEnvValue(process.env.RAZORPAY_WEBHOOK_SECRET);

  const cleanId = isPlaceholderValue(rawId) ? '' : rawId;
  const cleanSecret = isPlaceholderValue(rawSecret) ? '' : rawSecret;
  const cleanWebhookSecret = isPlaceholderValue(rawWebhookSecret)
    ? ''
    : rawWebhookSecret;

  let keyId = cleanId;
  let keySecret = cleanSecret;
  let wasSwappedInEnv = false;

  if (!cleanId.startsWith('rzp_') && cleanSecret.startsWith('rzp_')) {
    keyId = cleanSecret;
    keySecret = cleanId;
    wasSwappedInEnv = true;
  }

  const hasValidKeyId =
    keyId.startsWith('rzp_live_') || keyId.startsWith('rzp_test_');
  const hasValidSecret = Boolean(
    keySecret && keySecret.length >= 12 && !keySecret.startsWith('rzp_')
  );
  const isConfigured = hasValidKeyId && hasValidSecret;
  const isLive = isConfigured && keyId.startsWith('rzp_live_');

  return {
    keyId: hasValidKeyId ? keyId : '',
    keySecret: hasValidSecret ? keySecret : '',
    webhookSecret: cleanWebhookSecret || (hasValidSecret ? keySecret : ''),
    hasExplicitWebhookSecret: Boolean(cleanWebhookSecret),
    isConfigured,
    isLive,
    wasSwappedInEnv
  };
}

export function createRazorpayClient(): Razorpay | null {
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured) return null;
  try {
    return new Razorpay({
      key_id: creds.keyId,
      key_secret: creds.keySecret
    });
  } catch (err) {
    console.error('[Firebase/Razorpay] Initialization error:', err);
    return null;
  }
}

/**
 * Cloud Function / Backend Handler: Create a Razorpay LIVE Order for ₹99 (Premium - 365 Days / 1 Year).
 * Enforces server-authoritative pricing in paise (9900) and returns only the public Key ID.
 * Never creates dummy or simulated orders.
 */
export async function createRazorpayOrderBackend(params: {
  planId: 'basic' | 'premium';
  studentId: string;
  studentName?: string;
  email?: string;
  mobile?: string;
  selectedBoard?: string;
  selectedClass?: string;
  referralCode?: string;
}) {
  const { studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;

  if (!studentId) {
    throw new Error('Student authentication required.');
  }
  if (params.planId !== 'premium') {
    throw new Error(
      'Invalid plan selected. Only the ₹99 Premium Plan is available.'
    );
  }

  const normalizedBoard = normalizeBackendBoard(selectedBoard);
  const normalizedClass = normalizeBackendClassLevel(selectedClass) || '';
  const planId = 'premium' as const;
  const amountInPaise = 9900;
  const amountInRupees = 99;
  const receiptNumber = `REC-VC-${Date.now().toString().slice(-8)}`;
  const creds = getResolvedRazorpayCredentials();
  const rzp = createRazorpayClient();

  if (!rzp || !creds.isConfigured) {
    throw new Error(
      'Razorpay LIVE API Key ID and Key Secret are not configured on the server.'
    );
  }

  // Enforce a 15-second timeout when contacting Razorpay Orders API
  const orderPromise = rzp.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: receiptNumber,
    notes: {
      studentId: String(studentId).slice(0, 250),
      studentName: String(studentName || 'Student').slice(0, 250),
      email: String(email || '').slice(0, 250),
      mobile: String(mobile || '').slice(0, 250),
      selectedBoard: normalizedBoard,
      board: normalizedBoard,
      selectedClass: normalizedClass,
      classLevel: normalizedClass,
      planId: 'premium',
      subscriptionTier: 'premium',
      validityDays: '365',
      referralCode: String(referralCode || '').slice(0, 100)
    }
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            'Razorpay order creation timed out after 15 seconds. Please check your network and try again.'
          )
        ),
      15000
    );
  });

  const order = await Promise.race([orderPromise, timeoutPromise]);

  if (!order || !order.id) {
    throw new Error('Razorpay API did not return a valid order ID.');
  }

  return {
    success: true,
    orderId: order.id,
    amount: Number(order.amount) || amountInPaise,
    amountRupees: amountInRupees,
    currency: order.currency || 'INR',
    keyId: creds.keyId,
    receiptNumber,
    planId,
    selectedBoard: normalizedBoard,
    selectedClass: normalizedClass || undefined,
    isMock: false,
    mode: (creds.isLive ? 'LIVE' : 'TEST') as 'LIVE' | 'TEST'
  };
}

/**
 * Cloud Function / Backend Helper: Verify genuine Razorpay HMAC-SHA256 Payment Signature.
 */
export function verifyRazorpaySignatureBackend(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): boolean {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
  const creds = getResolvedRazorpayCredentials();

  if (!creds.isConfigured || !creds.keySecret || !razorpay_signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', creds.keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const expectedBuf = Buffer.from(expectedSignature, 'utf8');
  const providedBuf = Buffer.from(String(razorpay_signature).trim(), 'utf8');

  if (expectedBuf.length !== providedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, providedBuf);
}

/**
 * Cloud Function / Backend Handler: Create a Razorpay LIVE Dynamic UPI QR Code
 * for ₹99 (Premium - 365 Days / 1 Year).
 * Uses Razorpay QR Code API (POST /v1/payments/qr_codes).
 */
export async function createRazorpayQrCodeBackend(params: {
  planId: 'basic' | 'premium';
  studentId: string;
  studentName?: string;
  email?: string;
  mobile?: string;
  selectedBoard?: string;
  selectedClass?: string;
  referralCode?: string;
}) {
  const { studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;
  if (!studentId) {
    throw new Error('Student authentication required.');
  }
  if (params.planId !== 'premium') {
    throw new Error('Invalid plan selected. Only the ₹99 Premium Plan is available.');
  }

  const normalizedBoard = normalizeBackendBoard(selectedBoard);
  const normalizedClass = normalizeBackendClassLevel(selectedClass) || '';
  const planId = 'premium' as const;
  const amountInPaise = 9900;
  const amountInRupees = 99;
  const planTitle = normalizedClass
    ? `PREMIUM PLAN (${normalizedBoard} • ${normalizedClass}) – ₹99 – 365 Days`
    : `PREMIUM PLAN (${normalizedBoard}) – ₹99 – 365 Days (1 Year)`;
  const creds = getResolvedRazorpayCredentials();

  if (!creds.isConfigured || !creds.keySecret) {
    throw new Error('Razorpay LIVE API credentials are not configured on the server.');
  }

  const authHeader = 'Basic ' + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

  // Request Razorpay official QR code API
  const qrRes = await fetch('https://api.razorpay.com/v1/payments/qr_codes', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'upi_qr',
      name: 'MyStudyZone',
      usage: 'single_use',
      fixed_amount: true,
      payment_amount: amountInPaise,
      description: `${planTitle} • ${studentName || 'Student'}`,
      notes: {
        studentId: String(studentId).slice(0, 250),
        studentName: String(studentName || 'Student').slice(0, 250),
        email: String(email || '').slice(0, 250),
        mobile: String(mobile || '').slice(0, 250),
        selectedBoard: normalizedBoard,
        board: normalizedBoard,
        selectedClass: normalizedClass,
        classLevel: normalizedClass,
        planId: 'premium',
        subscriptionTier: 'premium',
        validityDays: '365',
        referralCode: String(referralCode || '').slice(0, 100)
      }
    })
  });

  const qrData = await qrRes.json().catch(() => null);

  if (!qrRes.ok || !qrData || !qrData.id) {
    const errorDesc =
      qrData?.error?.description || `Razorpay QR Code API returned HTTP ${qrRes.status}`;
    console.warn('[Razorpay QR API Error]:', qrData?.error || errorDesc);
    throw new Error(
      `${errorDesc}. Note: If your Razorpay Live account does not have UPI QR enabled yet, please activate UPI QR Codes in Razorpay Dashboard → Account & Settings → Payment Methods → UPI QR.`
    );
  }

  return {
    success: true,
    qrId: qrData.id,
    imageUrl: qrData.image_url,
    amount: amountInPaise,
    amountRupees: amountInRupees,
    currency: 'INR',
    planId,
    selectedBoard: normalizedBoard,
    selectedClass: normalizedClass || undefined,
    planTitle,
    status: qrData.status || 'active',
    createdAt: qrData.created_at || Math.floor(Date.now() / 1000),
    expiresInSeconds: 600, // 10 minutes dynamic countdown
    keyId: creds.keyId,
    referralCode: referralCode || ''
  };
}

export async function checkRazorpayQrCodeStatusBackend(params: {
  qrId: string;
  studentId: string;
  planId?: 'basic' | 'premium';
  studentName?: string;
  email?: string;
  mobile?: string;
  selectedBoard?: string;
  selectedClass?: string;
  referralCode?: string;
}) {
  const { qrId, studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;
  const creds = getResolvedRazorpayCredentials();

  if (!creds.isConfigured || !creds.keySecret) {
    throw new Error('Razorpay LIVE API credentials are not configured on the server.');
  }

  const authHeader = 'Basic ' + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

  // 1. Fetch QR code status from Razorpay
  const qrRes = await fetch(
    `https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}`,
    {
      headers: { Authorization: authHeader }
    }
  );
  const qrData = await qrRes.json().catch(() => null);

  if (!qrRes.ok || !qrData) {
    throw new Error('Unable to query QR code status from Razorpay API.');
  }

  const resolvedPlanId: 'premium' = 'premium';
  const expectedAmountPaise = 9900;
  const amountRupees = 99;
  const resolvedBoard = normalizeBackendBoard(
    qrData?.notes?.selectedBoard || qrData?.notes?.board || selectedBoard
  );
  const resolvedClass =
    normalizeBackendClassLevel(qrData?.notes?.selectedClass || qrData?.notes?.classLevel || selectedClass) ||
    undefined;

  // 2. Fetch payments received on this QR Code
  const paymentsRes = await fetch(
    `https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}/payments`,
    {
      headers: { Authorization: authHeader }
    }
  );
  const paymentsData = await paymentsRes.json().catch(() => null);
  const items = Array.isArray(paymentsData?.items) ? paymentsData.items : [];

  const successfulPayment = items.find(
    (item: any) =>
      (item.status === 'captured' || item.status === 'authorized') &&
      Number(item.amount) >= expectedAmountPaise
  );

  if (successfulPayment) {
    const paymentId = successfulPayment.id;
    const orderId = qrId;
    const method = String(successfulPayment.method || 'UPI').toUpperCase();

    // Auto-update student document and transactions ledger in Firestore for 365 days!
    const activation = await updateStudentSubscriptionInFirestoreBackend({
      studentId: String(studentId),
      studentName: String(studentName || qrData?.notes?.studentName || 'Student'),
      email: String(email || qrData?.notes?.email || ''),
      mobile: String(mobile || qrData?.notes?.mobile || ''),
      selectedBoard: resolvedBoard,
      selectedClass: resolvedClass,
      planId: resolvedPlanId,
      paymentId: String(paymentId),
      orderId: String(orderId),
      signature: `qr_verified_${paymentId}`,
      method,
      amountInr: amountRupees
    });

    return {
      success: true,
      paid: true,
      status: 'PAID' as const,
      paymentId,
      orderId,
      method,
      amount: amountRupees,
      selectedBoard: activation.selectedBoard,
      selectedClass: activation.selectedClass,
      transaction: {
        id: `tx_${paymentId}`,
        receiptNumber: activation.receiptNumber,
        studentId: String(studentId),
        studentName: String(studentName || 'Student'),
        parentEmail: String(email || ''),
        parentMobile: String(mobile || ''),
        selectedBoard: activation.selectedBoard,
        selectedClass: activation.selectedClass,
        planId: resolvedPlanId,
        planTitle: activation.planLabel,
        amount: amountRupees,
        currency: 'INR',
        orderId,
        paymentId,
        signature: `qr_verified_${paymentId}`,
        method,
        status: 'SUCCESS' as const,
        createdAt: new Date().toISOString(),
        membershipStartDate: activation.startDateIso,
        membershipExpiryDate: activation.expiryDateIso
      },
      membership: {
        membershipId: `mem_${paymentId}`,
        studentId: String(studentId),
        studentName: String(studentName || 'Student'),
        selectedBoard: activation.selectedBoard,
        selectedClass: activation.selectedClass,
        activatedClasses: activation.activatedClasses,
        activatedClassKeys: activation.activatedClassKeys,
        planId: resolvedPlanId,
        planTitle: activation.planLabel,
        amount: amountRupees,
        startDate: activation.startDateIso,
        expiryDate: activation.expiryDateIso,
        status: 'ACTIVE' as const,
        paymentId,
        orderId,
        daysRemaining: activation.daysRemaining
      },
      referralCode: referralCode || qrData?.notes?.referralCode || ''
    };
  }

  if (qrData.status === 'closed') {
    return {
      success: true,
      paid: false,
      status: 'EXPIRED' as const,
      message: 'QR code has expired. Please click "Generate New QR Code" to proceed.'
    };
  }

  return {
    success: true,
    paid: false,
    status: 'WAITING' as const,
    message: 'Waiting for UPI payment confirmation...'
  };
}

/**
 * Verifies the Razorpay Webhook HMAC-SHA256 signature (`x-razorpay-signature`)
 * against the raw request body using timing-safe comparison to prevent fraud.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: Buffer | string,
  signatureHeader: string | undefined
): { valid: boolean; reason?: string } {
  if (!signatureHeader || typeof signatureHeader !== 'string') {
    return { valid: false, reason: 'Missing x-razorpay-signature header.' };
  }

  const creds = getResolvedRazorpayCredentials();
  const candidateSecrets: string[] = [];
  if (creds.hasExplicitWebhookSecret && creds.webhookSecret) {
    candidateSecrets.push(creds.webhookSecret);
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

  return { valid: false, reason: 'Invalid Razorpay webhook signature.' };
}

/**
 * Updates the student's Firestore document (`/students/{studentId}`) and
 * records the verified transaction in `/transactions/{txId}` with a 365-day expiry date.
 * Idempotent: prevents duplicate 365-day extensions if both client verification and webhook fire.
 */
export async function updateStudentSubscriptionInFirestoreBackend(params: {
  studentId: string;
  studentName?: string;
  email?: string;
  mobile?: string;
  selectedBoard?: string;
  selectedClass?: string;
  planId: 'basic' | 'premium';
  paymentId: string;
  orderId: string;
  signature?: string;
  method?: string;
  amountInr?: number;
  currentExpiresAt?: string;
}): Promise<{
  success: boolean;
  alreadyProcessed: boolean;
  selectedBoard: BackendBoard;
  selectedClass: string;
  boardClassKey: string;
  plan: 'basic' | 'premium';
  subscriptionTier: 'standard' | 'premium';
  planLabel: string;
  startDateIso: string;
  expiryDateIso: string;
  daysRemaining: number;
  receiptNumber: string;
  activatedClasses: string[];
  activatedClassKeys: string[];
  classSubscriptions: Record<string, any>;
}> {
  const {
    studentId,
    studentName = 'Student',
    email = '',
    mobile = '',
    selectedBoard,
    selectedClass,
    paymentId,
    orderId,
    signature = 'verified_webhook_signature',
    method = 'RAZORPAY',
    amountInr
  } = params;

  const normalizedPlan: 'premium' = 'premium';
  const subscriptionTier: 'premium' = 'premium';
  const verifiedAmount = amountInr || 99;
  const now = new Date();
  const safeStudentId = String(studentId).trim();

  let existingData: Record<string, any> | null = null;
  try {
    existingData = await serverGetDoc('students', safeStudentId);
  } catch (readErr) {
    console.log(
      '[Firestore Backend] Notice reading existing student doc:',
      (readErr as Error)?.message || readErr
    );
  }

  const resolvedBoard = normalizeBackendBoard(
    selectedBoard || existingData?.board || existingData?.primaryBoard || 'Maharashtra'
  );
  const resolvedClass =
    normalizeBackendClassLevel(selectedClass) ||
    normalizeBackendClassLevel(existingData?.classLevel) ||
    normalizeBackendClassLevel(existingData?.activatedClassLevel) ||
    'Class 1';
  const targetCompositeKey = buildBackendBoardClassKey(resolvedBoard, resolvedClass);

  const planLabel = `PREMIUM PLAN (${resolvedBoard} • ${resolvedClass}) – ₹99 – 365 Days (1 Year)`;

  // Reconstruct existing multi-board & multi-class subscriptions map keyed cleanly by `Board__Class`
  const existingMap: Record<string, any> = {};
  if (existingData?.classSubscriptions && typeof existingData.classSubscriptions === 'object') {
    for (const [rawKey, rawRec] of Object.entries(existingData.classSubscriptions)) {
      if (!rawRec || typeof rawRec !== 'object') continue;
      const parsedKey = parseBackendBoardClassKey(rawKey);
      const cls = normalizeBackendClassLevel((rawRec as any).classLevel || parsedKey?.classLevel);
      if (!cls) continue;
      const recBoard = (rawRec as any).board
        ? normalizeBackendBoard((rawRec as any).board)
        : rawKey.includes('__')
          ? parsedKey?.board || 'Maharashtra'
          : 'Maharashtra';
      const compositeKey = buildBackendBoardClassKey(recBoard, cls);
      existingMap[compositeKey] = {
        ...(rawRec as any),
        board: recBoard,
        classLevel: cls
      };
    }
  }

  // Legacy single-class backfill (preserve Maharashtra defaults)
  if (existingData?.plan && existingData.plan !== 'free') {
    const legacyBoard = normalizeBackendBoard(
      existingData.activatedBoard || existingData.primaryBoard || existingData.board || 'Maharashtra'
    );
    const legacyClass =
      normalizeBackendClassLevel(existingData.activatedClassLevel) ||
      normalizeBackendClassLevel(existingData.classLevel) ||
      resolvedClass;
    const legacyCompositeKey = buildBackendBoardClassKey(legacyBoard, legacyClass);
    if (!existingMap[legacyCompositeKey]) {
      existingMap[legacyCompositeKey] = {
        board: legacyBoard,
        classLevel: legacyClass,
        plan: existingData.plan === 'basic' ? 'basic' : 'premium',
        status: 'ACTIVE',
        purchasedAt: existingData.planPurchasedAt,
        expiresAt: existingData.planExpiresAt,
        paymentId: existingData.lastPaymentId,
        orderId: existingData.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
      };
    }
  }

  const collectActiveKeys = (map: Record<string, any>) => {
    const keys: string[] = [];
    const mhClasses = new Set<string>();
    for (const [key, rec] of Object.entries(map)) {
      if (!rec || rec.plan === 'free') continue;
      if (evaluateSubscriptionValidity(rec.plan, rec.purchasedAt, rec.expiresAt, now).isExpired) {
        continue;
      }
      const parsed = parseBackendBoardClassKey(key);
      const b = normalizeBackendBoard(rec.board || parsed?.board);
      const c = normalizeBackendClassLevel(rec.classLevel || parsed?.classLevel);
      if (!c) continue;
      const comp = buildBackendBoardClassKey(b, c);
      if (!keys.includes(comp)) keys.push(comp);
      if (b === 'Maharashtra') mhClasses.add(c);
    }
    return {
      activatedClassKeys: keys,
      activatedClasses: VALID_CLASS_LEVELS.filter((c) => mhClasses.has(c))
    };
  };

  // Idempotency check: check if this exact paymentId was already processed
  const existingMatchingEntry = Object.values(existingMap).find(
    (entry: any) => entry && entry.paymentId === paymentId
  );
  if (
    existingMatchingEntry ||
    (existingData?.lastPaymentId && existingData.lastPaymentId === paymentId)
  ) {
    const refEntry = existingMatchingEntry || existingMap[targetCompositeKey] || existingData;
    const refBoard = normalizeBackendBoard(refEntry?.board || resolvedBoard);
    const refClass = refEntry?.classLevel || resolvedClass;
    const refKey = buildBackendBoardClassKey(refBoard, refClass);
    const validity = evaluateSubscriptionValidity(
      'premium',
      refEntry?.purchasedAt || refEntry?.planPurchasedAt,
      refEntry?.expiresAt || refEntry?.planExpiresAt,
      now
    );
    const { activatedClasses, activatedClassKeys } = collectActiveKeys(existingMap);
    return {
      success: true,
      alreadyProcessed: true,
      selectedBoard: refBoard,
      selectedClass: refClass,
      boardClassKey: refKey,
      plan: normalizedPlan,
      subscriptionTier,
      planLabel: `PREMIUM PLAN (${refBoard} • ${refClass}) – ₹99 – 365 Days (1 Year)`,
      startDateIso:
        validity.purchaseDateIst || refEntry?.purchasedAt || refEntry?.planPurchasedAt || '',
      expiryDateIso:
        validity.expiryDateIst || refEntry?.expiresAt || refEntry?.planExpiresAt || '',
      daysRemaining: validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS,
      receiptNumber: `REC-VC-${paymentId.slice(-6).toUpperCase()}`,
      activatedClasses,
      activatedClassKeys,
      classSubscriptions: existingMap
    };
  }

  // Compute accurate 365-day activation / renewal dates ONLY for `targetCompositeKey`
  const targetExistingEntry = existingMap[targetCompositeKey];
  const candidateExistingExpiry = targetExistingEntry?.expiresAt || undefined;
  const candidateExistingPlan = targetExistingEntry?.plan || 'free';

  const activation = computeSubscriptionActivationDates({
    verificationTimestamp: now,
    existingPlan: candidateExistingPlan,
    existingExpiresAt: candidateExistingExpiry
  });

  const startDateIso = activation.purchasedDateIst;
  const expiryDateIso = activation.expiryDateIst;
  const daysRemaining = activation.daysRemaining;
  const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;

  const updatedClassSubscriptions: Record<string, any> = {
    ...existingMap,
    [targetCompositeKey]: {
      board: resolvedBoard,
      classLevel: resolvedClass,
      plan: normalizedPlan,
      status: 'ACTIVE',
      purchasedAt: startDateIso,
      expiresAt: expiryDateIso,
      paymentId: String(paymentId),
      orderId: String(orderId),
      amountInr: verifiedAmount,
      validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
      updatedAt: activation.verifiedAtUtcIso
    }
  };

  const { activatedClasses, activatedClassKeys } = collectActiveKeys(updatedClassSubscriptions);

  const preservedPrimaryBoard = normalizeBackendBoard(
    existingData?.primaryBoard || existingData?.board || resolvedBoard
  );
  const preservedPrimaryClass =
    normalizeBackendClassLevel(existingData?.primaryClassLevel) ||
    normalizeBackendClassLevel(existingData?.classLevel) ||
    resolvedClass;

  try {
    // 1. Update Student Profile Document in Firestore (/students/{studentId}) via Firebase Admin SDK
    await serverSetDoc(
      'students',
      safeStudentId,
      {
        id: safeStudentId,
        board: resolvedBoard,
        classLevel: resolvedClass,
        primaryBoard: preservedPrimaryBoard,
        primaryClassLevel: preservedPrimaryClass,
        activatedBoard: resolvedBoard,
        activatedClassLevel: resolvedClass,
        activatedClasses,
        activatedClassKeys,
        classSubscriptions: updatedClassSubscriptions,
        plan: normalizedPlan,
        subscriptionTier,
        planLabel,
        isLifetimeFree: false,
        planPurchasedAt: startDateIso,
        planExpiresAt: expiryDateIso,
        subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
        subscriptionStatus: 'ACTIVE',
        lastPaymentId: paymentId,
        lastOrderId: orderId,
        lastPaymentAmountInr: verifiedAmount,
        verifiedAtUtc: activation.verifiedAtUtcIso,
        subscriptionUpdatedAt: activation.verifiedAtUtcIso
      },
      { merge: true }
    );

    // 2. Save Verified Transaction Document in Firestore (/transactions/tx_{paymentId}) via Firebase Admin SDK
    const safePaymentId = String(paymentId).replace(/[^a-zA-Z0-9_-]/g, '_');
    const txDocId = safePaymentId.startsWith('tx_')
      ? safePaymentId
      : `tx_${safePaymentId}`;

    await serverSetDoc(
      'transactions',
      txDocId,
      {
        id: txDocId,
        receiptNumber,
        studentId: safeStudentId.slice(0, 128),
        studentName: String(studentName || 'Student').slice(0, 100),
        parentEmail: String(email || '').slice(0, 150),
        parentMobile: String(mobile || '').slice(0, 20),
        selectedBoard: resolvedBoard,
        selectedClass: resolvedClass,
        classLevel: resolvedClass,
        planId: normalizedPlan,
        subscriptionTier,
        planTitle: planLabel,
        amount: verifiedAmount,
        currency: 'INR',
        orderId: String(orderId),
        paymentId: String(paymentId),
        signature: String(signature),
        method: String(method || 'RAZORPAY').toUpperCase(),
        status: 'SUCCESS',
        createdAt: now.toISOString(),
        verifiedAt: now.toISOString(),
        membershipStartDate: startDateIso,
        membershipExpiryDate: expiryDateIso,
        savedToFirestoreAt: now.toISOString()
      },
      { merge: true }
    );
  } catch (writeErr) {
    console.warn(
      '[Firestore Backend] Error updating subscription in Firestore:',
      (writeErr as Error)?.message || writeErr
    );
  }

  return {
    success: true,
    alreadyProcessed: false,
    selectedBoard: resolvedBoard,
    selectedClass: resolvedClass,
    boardClassKey: targetCompositeKey,
    plan: normalizedPlan,
    subscriptionTier,
    planLabel,
    startDateIso,
    expiryDateIso,
    daysRemaining,
    receiptNumber,
    activatedClasses,
    activatedClassKeys,
    classSubscriptions: updatedClassSubscriptions
  };
}
