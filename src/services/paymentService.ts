import { ClassLevel, EducationBoard, PaymentTransaction, StudentProfile } from '../types';
import {
  CategoryId,
  PlanCatalogItem,
  PlanSkuId,
  getPlanCatalogItem,
  resolvePlanSku
} from '../data/planCatalog';
import { getLocalSessionHeaders } from './deviceSessionService';
import { buildBoardClassKey, normalizeBoardValue } from '../utils/subscriptionAccess';

export interface RazorpayConfigResponse {
  success: boolean;
  keyId: string;
  isLive: boolean;
  mode: 'LIVE' | 'TEST';
  configured: boolean;
  currency: string;
  catalog?: Record<PlanSkuId, PlanCatalogItem>;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  amount: number; // in paise
  amountRupees: number;
  currency: string;
  keyId: string;
  receiptNumber: string;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  unlockedCategories?: CategoryId[];
  selectedBoard?: EducationBoard;
  selectedClass?: string;
  isMock?: boolean;
  mode?: 'LIVE' | 'TEST';
  error?: string;
}

export interface CreateQrResponse {
  success: boolean;
  qrId: string;
  imageUrl: string;
  amount: number; // in paise
  amountRupees: number;
  currency: string;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  unlockedCategories?: CategoryId[];
  planTitle?: string;
  selectedBoard?: EducationBoard;
  selectedClass?: string;
  status: string;
  createdAt: number;
  expiresInSeconds: number;
  keyId?: string;
  error?: string;
}

export interface CheckQrStatusResponse {
  success: boolean;
  paid: boolean;
  status: 'WAITING' | 'PAID' | 'EXPIRED' | 'FAILED';
  paymentId?: string;
  orderId?: string;
  method?: string;
  amount?: number;
  planSku?: PlanSkuId;
  selectedBoard?: EducationBoard;
  selectedClass?: string;
  activatedClasses?: string[];
  activatedClassKeys?: string[];
  activatedCategoryKeys?: CategoryId[];
  message?: string;
  transaction?: PaymentTransaction;
  membership?: {
    membershipId: string;
    studentId: string;
    studentName: string;
    selectedBoard?: EducationBoard;
    selectedClass?: string;
    activatedClasses?: string[];
    activatedClassKeys?: string[];
    activatedCategoryKeys?: CategoryId[];
    planId: 'basic' | 'premium';
    planSku?: PlanSkuId;
    planTitle: string;
    amount: number;
    startDate: string;
    expiryDate: string;
    status: 'ACTIVE';
    daysRemaining: number;
  };
  error?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  alreadyProcessed?: boolean;
  message?: string;
  planSku?: PlanSkuId;
  selectedBoard?: EducationBoard;
  selectedClass?: string;
  activatedClasses?: string[];
  activatedClassKeys?: string[];
  classSubscriptions?: Record<string, any>;
  activatedCategoryKeys?: CategoryId[];
  categorySubscriptions?: Record<string, any>;
  transaction?: PaymentTransaction;
  membership?: {
    membershipId: string;
    studentId: string;
    studentName: string;
    selectedBoard?: EducationBoard;
    selectedClass?: string;
    activatedClasses?: string[];
    activatedClassKeys?: string[];
    activatedCategoryKeys?: CategoryId[];
    planId: 'basic' | 'premium';
    planSku?: PlanSkuId;
    planTitle: string;
    amount: number;
    startDate: string;
    expiryDate: string;
    status: 'ACTIVE' | 'EXPIRED' | 'PENDING PAYMENT' | 'PAYMENT FAILED';
    daysRemaining: number;
  };
  referral?: {
    credited: boolean;
    referrerReward?: number;
    buyerReward?: number;
    referrerName?: string;
    reason?: string;
  };
  error?: string;
}

export interface CheckExistingAccountResponse {
  success: boolean;
  exists: boolean;
  matchedPair?: boolean;
  mismatchField?: 'email' | 'mobile' | null;
  accountRole?: 'student' | 'teacher';
  primaryBoard?: EducationBoard;
  primaryClassLevel?: string | null;
  activeClasses?: string[];
  activeClassKeys?: string[];
  activeCategoryKeys?: CategoryId[];
  studentName?: string;
  error?: string;
}

// Helper: Fetch with explicit timeout so network stalls never cause Unhandled Promise Rejections
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 15000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(
        'Request to payment server timed out after 15 seconds. Please check your internet connection and try again.'
      );
    }
    throw new Error(
      err?.message || 'Network error while communicating with payment server.'
    );
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Calls the payment backend endpoint (e.g., '/razorpay/create-order').
 * - First calls `/api${subpath}` (or `${VITE_API_BASE_URL}/api${subpath}`).
 * - If static/CDN hosting (e.g., Netlify on mystudyzone.in) returns HTTP 404 or HTML for `/api/*`,
 *   automatically retries the Netlify Serverless Function endpoint `/.netlify/functions/api${subpath}`.
 */
async function fetchPaymentApi(
  subpath: string,
  options: RequestInit = {},
  timeoutMs: number = 15000
): Promise<{ res: Response; urlUsed: string }> {
  const envBase = String(
    (import.meta as any).env?.VITE_API_BASE_URL || ''
  )
    .trim()
    .replace(/\/+$/, '');

  const sessionHeaders = getLocalSessionHeaders();
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...sessionHeaders,
      ...((options.headers as Record<string, string>) || {})
    }
  };

  const primaryUrl = `${envBase}/api${subpath}`;
  const res = await fetchWithTimeout(primaryUrl, mergedOptions, timeoutMs);
  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  // If primary /api/... route returned 404 or a static HTML fallback page, retry /.netlify/functions/api/...
  if (res.status === 404 || contentType.includes('text/html')) {
    const netlifyUrl = `${envBase}/.netlify/functions/api${subpath}`;
    console.info(
      `[Razorpay API] ${primaryUrl} returned HTTP ${res.status} (${contentType || 'no content-type'}); retrying serverless route ${netlifyUrl}...`
    );
    try {
      const fallbackRes = await fetchWithTimeout(netlifyUrl, mergedOptions, timeoutMs);
      const fallbackType = (
        fallbackRes.headers.get('content-type') || ''
      ).toLowerCase();
      if (fallbackRes.status !== 404 && !fallbackType.includes('text/html')) {
        return { res: fallbackRes, urlUsed: netlifyUrl };
      }
    } catch (fallbackErr) {
      console.info('[Razorpay API] Serverless fallback error:', fallbackErr);
    }
  }

  return { res, urlUsed: primaryUrl };
}

// Helper: Safely resolve public Razorpay Key ID (never accepts secret keys)
export function resolveSafePublicRazorpayKeyId(serverKeyId?: string): string {
  const candidateFromServer = (serverKeyId || '').trim();
  if (
    candidateFromServer.startsWith('rzp_live_') ||
    candidateFromServer.startsWith('rzp_test_')
  ) {
    return candidateFromServer;
  }

  const envKey = String(
    (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || ''
  ).trim();
  if (envKey.startsWith('rzp_live_') || envKey.startsWith('rzp_test_')) {
    return envKey;
  }

  return '';
}

// 1. Fetch public Razorpay configuration from server
export async function getRazorpayConfig(): Promise<RazorpayConfigResponse> {
  try {
    const { res } = await fetchPaymentApi('/razorpay/config', {}, 10000);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const keyId = resolveSafePublicRazorpayKeyId(data?.keyId);
    const isLive = keyId.startsWith('rzp_live_');
    return {
      ...data,
      keyId,
      isLive,
      mode: isLive ? 'LIVE' : 'TEST'
    };
  } catch (error) {
    console.info('[Razorpay] Config check notice:', error);
    const keyId = resolveSafePublicRazorpayKeyId();
    const isLive = keyId.startsWith('rzp_live_');
    return {
      success: Boolean(keyId),
      keyId,
      isLive,
      mode: isLive ? 'LIVE' : 'TEST',
      configured: Boolean(keyId),
      currency: 'INR'
    };
  }
}

// 1b. Check existing account identity for class-wise additional registration
export async function checkExistingAccountApi(
  email: string,
  mobile: string
): Promise<CheckExistingAccountResponse> {
  try {
    const { res } = await fetchPaymentApi(
      '/auth/check-existing-account',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mobile })
      },
      10000
    );
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      return { success: false, exists: false };
    }
    return data as CheckExistingAccountResponse;
  } catch {
    return { success: false, exists: false };
  }
}

// 1c. Switch active unlocked (board, class) on server
export async function switchStudentActiveClassApi(
  studentId: string,
  targetClass: ClassLevel,
  idToken?: string,
  targetBoard?: EducationBoard,
  options?: {
    studentActivatedClassKeys?: string[];
    activateAdditionalBoardClass?: boolean;
  }
): Promise<{
  success: boolean;
  board?: EducationBoard;
  classLevel?: string;
  studentActivatedClassKeys?: string[];
  error?: string;
}> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken) headers.Authorization = `Bearer ${idToken}`;
    const resolvedBoard = normalizeBoardValue(targetBoard || 'Maharashtra');
    const { res } = await fetchPaymentApi(
      '/subscription/switch-class',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          studentId,
          targetBoard: resolvedBoard,
          selectedBoard: resolvedBoard,
          targetClass,
          ...(Array.isArray(options?.studentActivatedClassKeys)
            ? { studentActivatedClassKeys: options.studentActivatedClassKeys }
            : {}),
          ...(options?.activateAdditionalBoardClass
            ? { activateAdditionalBoardClass: true }
            : {})
        })
      },
      10000
    );
    const data = await res.json().catch(() => ({ success: false }));
    return {
      success: Boolean(res.ok && data?.success),
      board: data?.selectedBoard || resolvedBoard,
      classLevel: data?.classLevel || data?.selectedClass,
      studentActivatedClassKeys: Array.isArray(data?.studentActivatedClassKeys)
        ? data.studentActivatedClassKeys
        : undefined,
      error: data?.error
    };
  } catch {
    return { success: false };
  }
}

// 2. Request backend LIVE order creation (enforces server-side Plan SKU pricing)
export async function createRazorpayOrder(
  student: StudentProfile,
  _planId: 'basic' | 'premium' = 'premium',
  referralCode?: string,
  selectedClass?: ClassLevel,
  selectedBoard?: EducationBoard,
  planSku: PlanSkuId = 'BOARD_CLASS'
): Promise<CreateOrderResponse> {
  const planId = 'premium';
  const resolvedSku = resolvePlanSku(planSku, planId);
  const catalogItem = getPlanCatalogItem(resolvedSku);
  const targetBoard = normalizeBoardValue(selectedBoard || student.board || 'Maharashtra');
  const targetClass = selectedClass || student.classLevel;
  const payload = {
    planId,
    planSku: resolvedSku,
    studentId: student.id,
    studentName: student.name,
    email: student.email,
    mobile: student.mobile,
    selectedBoard: targetBoard,
    selectedClass: targetClass,
    referralCode: referralCode || student.referredByCode || ''
  };

  console.info(
    `[Razorpay] Creating LIVE order for ${resolvedSku} (${targetBoard} • ${targetClass} • ₹${catalogItem.amountInr} / ${catalogItem.amountPaise} paise)...`
  );

  const { res, urlUsed } = await fetchPaymentApi(
    '/razorpay/create-order',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    },
    15000
  );

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    console.info(
      `[Razorpay] Non-JSON response from ${urlUsed} (HTTP ${res.status})`
    );
    if (res.status === 404) {
      throw new Error(
        `Payment backend endpoint (${urlUsed}) returned HTTP 404. Please ensure the latest deployment with netlify.toml and netlify/functions/api.mjs is published on mystudyzone.in.`
      );
    }
    if (res.status === 503) {
      throw new Error(
        `Payment server is temporarily unavailable (HTTP 503 Service Unavailable). The Node.js application process on your hosting server is currently stopped or restarting. Please verify your Node.js application status in cPanel -> Setup Node.js App.`
      );
    }
    throw new Error(
      `Payment server returned an invalid response (HTTP ${res.status}) from ${urlUsed}. Please retry.`
    );
  }

  if (!res.ok || !data?.success || !data?.orderId) {
    const reason =
      data?.error ||
      `Server order creation failed with status ${res.status} at ${urlUsed}`;
    console.info('[Razorpay] Order creation failed:', reason);
    throw new Error(reason);
  }

  const resolvedKeyId = resolveSafePublicRazorpayKeyId(data.keyId);
  if (!resolvedKeyId) {
    throw new Error(
      'Razorpay public Key ID (rzp_live_...) was not returned by the server.'
    );
  }

  console.info(
    `[Razorpay] LIVE order created successfully: ${data.orderId} (${data.amount} paise)`
  );

  return {
    ...data,
    planSku: data.planSku || resolvedSku,
    keyId: resolvedKeyId
  };
}

// 2.1 Dynamic Razorpay UPI QR Code Generator
export async function createRazorpayQrCode(
  student: StudentProfile,
  _planId: 'basic' | 'premium' = 'premium',
  referralCode?: string,
  selectedClass?: ClassLevel,
  selectedBoard?: EducationBoard,
  planSku: PlanSkuId = 'BOARD_CLASS'
): Promise<CreateQrResponse> {
  const planId = 'premium';
  const resolvedSku = resolvePlanSku(planSku, planId);
  const catalogItem = getPlanCatalogItem(resolvedSku);
  const targetBoard = normalizeBoardValue(selectedBoard || student.board || 'Maharashtra');
  const targetClass = selectedClass || student.classLevel;
  const payload = {
    planId,
    planSku: resolvedSku,
    studentId: student.id,
    studentName: student.name,
    email: student.email,
    mobile: student.mobile,
    selectedBoard: targetBoard,
    selectedClass: targetClass,
    referralCode: referralCode || student.referredByCode || ''
  };

  console.info(`[Razorpay QR] Generating dynamic UPI QR code for ${resolvedSku} (${targetBoard} • ${targetClass} • ₹${catalogItem.amountInr})...`);

  const { res, urlUsed } = await fetchPaymentApi(
    '/razorpay/create-qr',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    },
    15000
  );

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Payment server returned an invalid response (HTTP ${res.status}) from ${urlUsed}.`);
  }

  if (!res.ok || !data?.success || !data?.qrId) {
    const reason = data?.error || `Server failed to generate dynamic QR code (HTTP ${res.status}).`;
    console.warn('[Razorpay QR] Creation failed:', reason);
    throw new Error(reason);
  }

  return data;
}

// 2.2 Live QR Code Status Poller
export async function checkRazorpayQrStatus(
  qrId: string,
  student: StudentProfile,
  _planId: 'basic' | 'premium' = 'premium',
  referralCode?: string,
  selectedClass?: ClassLevel,
  selectedBoard?: EducationBoard,
  planSku: PlanSkuId = 'BOARD_CLASS'
): Promise<CheckQrStatusResponse> {
  const resolvedSku = resolvePlanSku(planSku, 'premium');
  const targetBoard = normalizeBoardValue(selectedBoard || student.board || 'Maharashtra');
  const targetClass = selectedClass || student.classLevel;
  const params = new URLSearchParams({
    studentId: student.id,
    planId: 'premium',
    planSku: resolvedSku,
    selectedBoard: targetBoard,
    selectedClass: targetClass,
    studentName: student.name || 'Student',
    email: student.email || '',
    mobile: student.mobile || '',
    referralCode: referralCode || student.referredByCode || ''
  });

  const { res } = await fetchPaymentApi(`/razorpay/qr-status/${encodeURIComponent(qrId)}?${params.toString()}`, {}, 10000);
  const data = await res.json().catch(() => ({
    success: false,
    paid: false,
    status: 'FAILED',
    error: 'Failed to verify QR payment status.'
  }));

  return data;
}

// 3. Cryptographic server-side payment verification
export async function verifyRazorpayPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  selectedBoard?: EducationBoard;
  selectedClass?: string;
  studentId: string;
  studentName: string;
  email: string;
  mobile: string;
  method?: string;
  currentExpiresAt?: string;
  referralCode?: string;
}): Promise<VerifyPaymentResponse> {
  try {
    const resolvedSku = resolvePlanSku(payload.planSku, payload.planId);
    const { res } = await fetchPaymentApi(
      '/razorpay/verify-payment',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          planId: 'premium',
          planSku: resolvedSku
        })
      },
      15000
    );

    const data = await res.json().catch(() => ({
      success: false,
      error: `Invalid verification response from server (HTTP ${res.status}).`
    }));

    if (!res.ok || !data?.success) {
      return {
        success: false,
        error: data?.error || 'Server rejected payment signature verification.'
      };
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      error:
        err?.message ||
        'Network error while verifying payment with server. If amount was debited, your plan will be activated automatically via webhook.'
    };
  }
}

// 4. Singleton Razorpay Checkout Script Loader (loads once, never hangs)
let razorpayScriptLoadPromise: Promise<boolean> | null = null;

export function loadRazorpayScript(): Promise<boolean> {
  if (
    typeof window !== 'undefined' &&
    typeof (window as any).Razorpay === 'function'
  ) {
    return Promise.resolve(true);
  }

  if (razorpayScriptLoadPromise) {
    return razorpayScriptLoadPromise;
  }

  razorpayScriptLoadPromise = new Promise<boolean>((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      razorpayScriptLoadPromise = null;
      return resolve(false);
    }

    if (typeof (window as any).Razorpay === 'function') {
      return resolve(true);
    }

    let settled = false;
    const finish = (ok: boolean, reason?: string) => {
      if (settled) return;
      settled = true;
      if (!ok) {
        console.info(
          '[Razorpay] Checkout script load failed:',
          reason || 'unknown'
        );
        razorpayScriptLoadPromise = null;
      }
      resolve(ok);
    };

    const injectFreshScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      const timer = setTimeout(() => {
        finish(
          typeof (window as any).Razorpay === 'function',
          'Timed out loading https://checkout.razorpay.com/v1/checkout.js'
        );
      }, 8000);

      script.onload = () => {
        clearTimeout(timer);
        finish(
          typeof (window as any).Razorpay === 'function',
          'Script loaded but window.Razorpay is undefined'
        );
      };
      script.onerror = () => {
        clearTimeout(timer);
        finish(false, 'Network error loading checkout.razorpay.com');
      };
      document.head.appendChild(script);
    };

    const existingScript = document.querySelector(
      'script[src^="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement | null;

    if (existingScript) {
      // Poll briefly in case the script in index.html is still finishing execution
      let elapsed = 0;
      const pollInterval = setInterval(() => {
        elapsed += 100;
        if (typeof (window as any).Razorpay === 'function') {
          clearInterval(pollInterval);
          finish(true);
        } else if (elapsed >= 2500) {
          clearInterval(pollInterval);
          // Existing script tag did not expose window.Razorpay; inject a fresh one
          injectFreshScript();
        }
      }, 100);

      existingScript.addEventListener(
        'load',
        () => {
          if (typeof (window as any).Razorpay === 'function') {
            clearInterval(pollInterval);
            finish(true);
          }
        },
        { once: true }
      );
      existingScript.addEventListener(
        'error',
        () => {
          clearInterval(pollInterval);
          injectFreshScript();
        },
        { once: true }
      );
      return;
    }

    injectFreshScript();
  });

  return razorpayScriptLoadPromise;
}

// Active Razorpay checkout instance reference (never remove .razorpay-container from DOM!)
let activeRazorpayInstance: any = null;

function closeExistingRazorpayInstance() {
  if (activeRazorpayInstance) {
    try {
      if (typeof activeRazorpayInstance.close === 'function') {
        activeRazorpayInstance.close();
      }
    } catch {
      // Ignore close error on stale instance
    }
    activeRazorpayInstance = null;
  }
  try {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = '';
    }
  } catch {
    // Ignore style reset error
  }
}

// 5. Open Official Razorpay Standard Checkout Modal
export async function launchRazorpayCheckout(options: {
  orderData: CreateOrderResponse;
  student: StudentProfile;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  selectedBoard?: EducationBoard;
  selectedClass?: ClassLevel;
  referralCode?: string;
  onCheckoutOpened?: () => void;
  onVerifyingStart?: () => void;
  onSuccess: (verifyResult: VerifyPaymentResponse) => void;
  onFailure: (errorMessage: string, metadata?: { isDomainMismatch?: boolean; reasonCode?: string; orderId?: string }) => void;
}): Promise<void> {
  const {
    orderData,
    student,
    planId,
    planSku,
    selectedBoard,
    selectedClass,
    referralCode,
    onCheckoutOpened,
    onVerifyingStart,
    onSuccess,
    onFailure
  } = options;

  const resolvedSku = resolvePlanSku(planSku || orderData.planSku, planId, orderData.amount);
  const catalogItem = getPlanCatalogItem(resolvedSku);
  const isCategoryPlan = catalogItem.unlockedCategories.length > 0;

  const targetBoard: EducationBoard = normalizeBoardValue(
    selectedBoard || orderData.selectedBoard || student.board || 'Maharashtra'
  );
  const targetClass: ClassLevel =
    selectedClass || (orderData.selectedClass as ClassLevel) || student.classLevel;
  const compositeKey = buildBoardClassKey(targetBoard, targetClass);

  const isLoaded = await loadRazorpayScript();
  const RazorpayConstructor =
    typeof window !== 'undefined' ? (window as any).Razorpay : undefined;

  if (!isLoaded || typeof RazorpayConstructor !== 'function') {
    const msg =
      'Razorpay Checkout SDK (checkout.razorpay.com) could not be loaded. Please check your internet connection or ad-blocker settings and try again.';
    console.info('[Razorpay Checkout] Failed to open:', msg);
    onFailure(msg, { reasonCode: 'script_load_failed', orderId: orderData.orderId });
    return;
  }

  const resolvedPublicKeyId = resolveSafePublicRazorpayKeyId(orderData.keyId);
  if (!resolvedPublicKeyId) {
    const msg =
      'Missing valid Razorpay LIVE Key ID. Cannot initialize checkout.';
    console.info('[Razorpay Checkout] Failed to open:', msg);
    onFailure(msg, { reasonCode: 'missing_key_id', orderId: orderData.orderId });
    return;
  }

  if (!orderData.orderId || !String(orderData.orderId).startsWith('order_')) {
    const msg = `Invalid Razorpay Order ID (${orderData.orderId || 'empty'}). Please retry payment.`;
    console.info('[Razorpay Checkout] Failed to open:', msg);
    onFailure(msg, { reasonCode: 'invalid_order_id', orderId: orderData.orderId });
    return;
  }

  const planTitle = isCategoryPlan
    ? `${catalogItem.title} – ₹${catalogItem.amountInr} – 365 Days`
    : `PREMIUM PLAN – ₹${catalogItem.amountInr} – 365 Days (${targetBoard} • ${targetClass})`;
  const planAmountPaise = catalogItem.amountPaise;

  // Sanitize prefill fields so Razorpay Live Checkout never fails prefill validation
  const cleanDigits = (student.mobile || '').replace(/\D/g, '').slice(-10);
  const prefill: Record<string, string> = {};
  if (student.name && student.name.trim()) {
    prefill.name = student.name.trim();
  }
  if (
    student.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email.trim())
  ) {
    prefill.email = student.email.trim();
  }
  if (cleanDigits.length === 10) {
    prefill.contact = `+91${cleanDigits}`;
  }

  // Ensure any previous Razorpay modal instance is cleanly closed before creating a new one
  closeExistingRazorpayInstance();

  let hasSettled = false;

  const targetClassExistingExpiry = isCategoryPlan
    ? catalogItem.unlockedCategories
        .map((catId) => student.categorySubscriptions?.[catId]?.expiresAt)
        .filter((val): val is string => Boolean(val))
        .sort()
        .pop()
    : student.classSubscriptions?.[compositeKey]?.expiresAt ||
      (targetBoard === 'Maharashtra' ? student.classSubscriptions?.[targetClass]?.expiresAt : undefined) ||
      (student.activatedClassLevel === targetClass &&
      normalizeBoardValue(student.activatedBoard || student.board || 'Maharashtra') === targetBoard
        ? student.planExpiresAt
        : undefined);

  const rzpOptions: Record<string, any> = {
    key: resolvedPublicKeyId,
    amount: Number(orderData.amount) || planAmountPaise, // in paise
    currency: orderData.currency || 'INR',
    name: 'MyStudyZone',
    description: `${planTitle} • ${student.name}`,
    order_id: orderData.orderId,
    prefill,
    notes: {
      studentId: String(student.id),
      studentName: String(student.name),
      selectedBoard: String(targetBoard),
      board: String(targetBoard),
      selectedClass: String(targetClass),
      classLevel: String(targetClass),
      planId: 'premium',
      planSku: resolvedSku,
      unlockedCategories: catalogItem.unlockedCategories.join(','),
      subscriptionTier: 'premium',
      validityDays: '365',
      referralCode: referralCode || student.referredByCode || ''
    },
    retry: {
      enabled: true,
      max_count: 3
    },
    theme: {
      color: '#ea580c'
    },
    modal: {
      confirm_close: false,
      escape: true,
      backdropclose: false,
      ondismiss: function () {
        activeRazorpayInstance = null;
        if (hasSettled) return;
        hasSettled = true;
        console.info(
          `[Razorpay Checkout] Dismissed by user for order ${orderData.orderId}`
        );
        fetchPaymentApi('/razorpay/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            paymentId: `cancelled_${Date.now()}`,
            planId: 'premium',
            planSku: resolvedSku,
            selectedBoard: targetBoard,
            selectedClass: targetClass,
            studentId: student.id,
            studentName: student.name,
            email: student.email,
            mobile: student.mobile,
            reason: 'Payment window closed by user before completing payment'
          })
        }).catch(() => {});
        onFailure(
          'Payment was cancelled before completion. Your account was not charged and the paid plan was not activated. You can click Retry Payment anytime.',
          { reasonCode: 'user_cancelled', orderId: orderData.orderId }
        );
      }
    },
    handler: async function (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) {
      activeRazorpayInstance = null;
      if (hasSettled) return;
      hasSettled = true;
      console.info('[Razorpay Checkout] Payment completed, verifying signature on backend:', {
        orderId: response.razorpay_order_id || orderData.orderId,
        paymentId: response.razorpay_payment_id,
        planSku: resolvedSku,
        selectedBoard: targetBoard,
        selectedClass: targetClass
      });

      if (onVerifyingStart) {
        onVerifyingStart();
      }

      try {
        const verifyRes = await verifyRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id || orderData.orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          planId: 'premium',
          planSku: resolvedSku,
          selectedBoard: targetBoard,
          selectedClass: targetClass,
          studentId: student.id,
          studentName: student.name,
          email: student.email,
          mobile: student.mobile,
          currentExpiresAt: targetClassExistingExpiry,
          referralCode: referralCode || student.referredByCode || ''
        });

        if (verifyRes.success) {
          onSuccess(verifyRes);
        } else {
          const reason =
            verifyRes.error ||
            'Payment signature could not be verified by server.';
          console.info('[Razorpay Checkout] Backend verification rejected:', reason);
          onFailure(reason, {
            reasonCode: 'verification_failed',
            orderId: orderData.orderId
          });
        }
      } catch (err: any) {
        const reason =
          err?.message ||
          'Error occurred while contacting payment verification server.';
        console.info('[Razorpay Checkout] Verification exception:', reason);
        onFailure(reason, {
          reasonCode: 'verification_exception',
          orderId: orderData.orderId
        });
      }
    }
  };

  try {
    console.info(
      `[Razorpay Checkout] Opening Razorpay LIVE modal for Order ${orderData.orderId} (${resolvedSku} • ₹${catalogItem.amountInr} / ${planAmountPaise} paise)`
    );
    const razorpayInstance = new RazorpayConstructor(rzpOptions);
    activeRazorpayInstance = razorpayInstance;

    razorpayInstance.on('payment.failed', function (response: any) {
      if (hasSettled) return;
      hasSettled = true;

      const reasonCode = String(response?.error?.reason || 'payment_failed').toLowerCase();
      const desc =
        response?.error?.description ||
        response?.error?.reason ||
        'Payment was declined by bank or UPI provider';
      const isDomainMismatch =
        reasonCode === 'payment_risk_check_failed' ||
        String(desc).toLowerCase().includes('website does not match') ||
        String(desc).toLowerCase().includes('registered website');

      console.info('[Razorpay Checkout] payment.failed event:', {
        code: response?.error?.code,
        reason: reasonCode,
        description: desc,
        step: response?.error?.step,
        orderId: orderData.orderId
      });

      closeExistingRazorpayInstance();

      const failedPaymentId =
        response?.error?.metadata?.payment_id || `pay_failed_${Date.now()}`;
      const failedOrderId =
        response?.error?.metadata?.order_id || orderData.orderId;

      fetchPaymentApi('/razorpay/payment-failed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: failedOrderId,
          paymentId: failedPaymentId,
          planId: 'premium',
          planSku: resolvedSku,
          selectedBoard: targetBoard,
          selectedClass: targetClass,
          studentId: student.id,
          studentName: student.name,
          email: student.email,
          mobile: student.mobile,
          reason: desc
        })
      }).catch(() => {});

      onFailure(
        `Payment Failed: ${desc}. Subscription was not activated.`,
        {
          isDomainMismatch,
          reasonCode,
          orderId: failedOrderId
        }
      );
    });

    razorpayInstance.open();
    if (onCheckoutOpened) {
      onCheckoutOpened();
    }
  } catch (err: any) {
    activeRazorpayInstance = null;
    const reason =
      err?.message || 'Razorpay Checkout window failed to initialize.';
    console.info('[Razorpay Checkout] Exception calling razorpayInstance.open():', reason);
    onFailure(`Could not open Razorpay Checkout: ${reason}`, {
      reasonCode: 'open_exception',
      orderId: orderData.orderId
    });
  }
}
