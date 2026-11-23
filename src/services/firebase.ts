import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  reload,
  User,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  disableNetwork,
  enableNetwork,
  getDocFromCache,
  setLogLevel,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
export { firebaseConfig };
import {
  BoardClassKey,
  CategoryId,
  CategorySubscriptionRecord,
  ClassLevel,
  ClassSubscriptionRecord,
  EducationBoard,
  PlanSkuId,
  StudentProfile
} from '../types';
import {
  ALL_CATEGORY_IDS,
  getPlanCatalogItem,
  resolvePlanSku
} from '../data/planCatalog';
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
  sanitizeReferralCode,
} from '../utils/referralCoding';
import {
  computeSubscriptionActivationDates,
  PAID_SUBSCRIPTION_VALIDITY_DAYS,
} from '../utils/subscriptionDateUtils';
import {
  buildBoardClassKey,
  normalizeBoardValue,
  normalizeClassLevelValue,
  parseBoardClassKey,
} from '../utils/subscriptionAccess';

// Silence noisy internal @firebase/firestore WebChannel retry logs in iframe/proxy environments
try {
  setLogLevel('silent');
} catch {
  // Ignore if unsupported
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without specifying firestoreDatabaseId */
function initFirestoreInstance() {
  try {
    return initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true,
        localCache: memoryLocalCache(),
      },
      firebaseConfig.firestoreDatabaseId
    );
  } catch {
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
}

export const db = initFirestoreInstance();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export type { ConfirmationResult, User, RecaptchaVerifier };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// In-memory TTL cache + in-flight request deduplicator for student and referral docs
const DOC_CACHE_TTL_MS = 30_000;
const studentDocCache = new Map<string, { ts: number; data: Record<string, any> | null }>();
const studentDocInFlight = new Map<string, Promise<Record<string, any> | null>>();
const referralDocCache = new Map<string, { ts: number; data: Record<string, any> | null }>();
const referralDocInFlight = new Map<string, Promise<Record<string, any> | null>>();

async function getCachedStudentDoc(studentId: string): Promise<Record<string, any> | null> {
  const cleanId = String(studentId || '').trim();
  if (!cleanId) return null;
  const cached = studentDocCache.get(cleanId);
  if (cached && Date.now() - cached.ts < DOC_CACHE_TTL_MS) {
    return cached.data;
  }
  const existingPromise = studentDocInFlight.get(cleanId);
  if (existingPromise) {
    return existingPromise;
  }
  const promise = (async () => {
    try {
      const snap = await getDoc(doc(db, 'students', cleanId));
      const data = snap.exists() ? (snap.data() as Record<string, any>) : null;
      studentDocCache.set(cleanId, { ts: Date.now(), data });
      return data;
    } catch {
      return null;
    } finally {
      studentDocInFlight.delete(cleanId);
    }
  })();
  studentDocInFlight.set(cleanId, promise);
  return promise;
}

function updateCachedStudentDoc(studentId: string, partialData: Record<string, any>): void {
  const cleanId = String(studentId || '').trim();
  if (!cleanId) return;
  const prev = studentDocCache.get(cleanId)?.data || {};
  studentDocCache.set(cleanId, {
    ts: Date.now(),
    data: { ...prev, ...partialData },
  });
}

async function getCachedReferralDoc(studentId: string): Promise<Record<string, any> | null> {
  const cleanId = String(studentId || '').trim();
  if (!cleanId) return null;
  const cached = referralDocCache.get(cleanId);
  if (cached && Date.now() - cached.ts < DOC_CACHE_TTL_MS * 2) {
    return cached.data;
  }
  const existingPromise = referralDocInFlight.get(cleanId);
  if (existingPromise) {
    return existingPromise;
  }
  const promise = (async () => {
    try {
      const snap = await getDoc(doc(db, 'referrals', cleanId));
      const data = snap.exists() ? (snap.data() as Record<string, any>) : null;
      referralDocCache.set(cleanId, { ts: Date.now(), data });
      return data;
    } catch {
      return null;
    } finally {
      referralDocInFlight.delete(cleanId);
    }
  })();
  referralDocInFlight.set(cleanId, promise);
  return promise;
}

export type FirestoreConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'offline'
  | 'error';

export interface FirestoreConnectionState {
  status: FirestoreConnectionStatus;
  isOnline: boolean;
  lastCheckedAt: number | null;
  lastConnectedAt: number | null;
  lastError: string | null;
  configDocExists: boolean | null;
  retryCount: number;
}

const initialOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;
let firestoreConnectionState: FirestoreConnectionState = {
  status: initialOnline ? 'connecting' : 'offline',
  isOnline: initialOnline,
  lastCheckedAt: null,
  lastConnectedAt: null,
  lastError: initialOnline
    ? null
    : 'You are currently offline. Saved configuration & offline study tools remain available.',
  configDocExists: null,
  retryCount: 0,
};

const connectionListeners = new Set<(state: FirestoreConnectionState) => void>();

function notifyConnectionListeners() {
  const snapshot = { ...firestoreConnectionState };
  connectionListeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch {
      // Ignore subscriber errors
    }
  });
}

export function getFirestoreConnectionState(): FirestoreConnectionState {
  return { ...firestoreConnectionState };
}

export function subscribeFirestoreConnection(
  listener: (state: FirestoreConnectionState) => void
): () => void {
  connectionListeners.add(listener);
  try {
    listener({ ...firestoreConnectionState });
  } catch {
    // Ignore initial notification errors
  }
  return () => {
    connectionListeners.delete(listener);
  };
}

export function reportFirestoreConnectionStatus(
  partial: Partial<FirestoreConnectionState>
): void {
  firestoreConnectionState = {
    ...firestoreConnectionState,
    ...partial,
  };
  notifyConnectionListeners();
}

export function isFirestoreOfflineError(error: unknown): boolean {
  const code = String((error as any)?.code || '').toLowerCase();
  const msg = String((error as any)?.message || error || '').toLowerCase();
  return (
    code === 'unavailable' ||
    code === 'failed-precondition' ||
    msg.includes('client is offline') ||
    msg.includes('network-request-failed') ||
    msg.includes('failed to fetch') ||
    msg.includes('backend') ||
    msg.includes('unavailable')
  );
}

export async function ensureFirestoreOnline(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return false;
  }
  try {
    await enableNetwork(db);
    return true;
  } catch {
    return false;
  }
}

async function checkPlatformConfigRestReachable(): Promise<{
  reachable: boolean;
  docExists: boolean | null;
  error?: string;
}> {
  if (typeof fetch === 'undefined') {
    return { reachable: false, docExists: null };
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      firebaseConfig.projectId
    )}/databases/${encodeURIComponent(
      firebaseConfig.firestoreDatabaseId
    )}/documents/platform_config/main?key=${encodeURIComponent(firebaseConfig.apiKey)}`;
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller?.signal,
    });
    if (res.status === 200) {
      return { reachable: true, docExists: true };
    }
    if (res.status === 404) {
      return { reachable: true, docExists: false };
    }
    if (res.status === 401 || res.status === 403) {
      // Server responded over network even if restricted
      return { reachable: true, docExists: null };
    }
    return { reachable: false, docExists: null, error: `HTTP ${res.status}` };
  } catch (err) {
    return {
      reachable: false,
      docExists: null,
      error: err instanceof Error ? err.message : 'Network error',
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

let inFlightConnectionTest: Promise<{
  connected: boolean;
  via: 'sdk' | 'rest' | 'offline';
  configDocExists: boolean | null;
  error?: string;
}> | null = null;
let connectionTestedOnce = false;

// Verified Firestore connection check targeting public readable /platform_config/main (with auto-retry & REST verification)
export async function testFirestoreConnection(options?: { force?: boolean }): Promise<{
  connected: boolean;
  via: 'sdk' | 'rest' | 'offline';
  configDocExists: boolean | null;
  error?: string;
}> {
  if (!options?.force && connectionTestedOnce && firestoreConnectionState.status === 'connected') {
    return {
      connected: true,
      via: 'sdk',
      configDocExists: firestoreConnectionState.configDocExists,
    };
  }
  if (inFlightConnectionTest) {
    return inFlightConnectionTest;
  }

  connectionTestedOnce = true;

  inFlightConnectionTest = (async () => {
    const nowOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;
    if (!nowOnline) {
      const offlineMsg =
        'Your device is offline. Saved configuration will sync automatically once internet returns.';
      reportFirestoreConnectionStatus({
        status: 'offline',
        isOnline: false,
        lastCheckedAt: Date.now(),
        lastError: offlineMsg,
      });
      return {
        connected: false,
        via: 'offline' as const,
        configDocExists: null,
        error: offlineMsg,
      };
    }

    reportFirestoreConnectionStatus({
      status: firestoreConnectionState.lastConnectedAt ? 'reconnecting' : 'connecting',
      isOnline: true,
    });

    const configRef = doc(db, 'platform_config', 'main');
    let lastErr: unknown = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await ensureFirestoreOnline();
        const snap = await getDocFromServer(configRef);
        reportFirestoreConnectionStatus({
          status: 'connected',
          isOnline: true,
          lastCheckedAt: Date.now(),
          lastConnectedAt: Date.now(),
          lastError: null,
          configDocExists: snap.exists(),
          retryCount: 0,
        });
        return {
          connected: true,
          via: 'sdk' as const,
          configDocExists: snap.exists(),
        };
      } catch (err) {
        lastErr = err;
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    }

    // Fallback check via Firestore REST API to distinguish WebChannel blocking from true offline state
    const restProbe = await checkPlatformConfigRestReachable();
    if (restProbe.reachable) {
      reportFirestoreConnectionStatus({
        status: 'connected',
        isOnline: true,
        lastCheckedAt: Date.now(),
        lastConnectedAt: Date.now(),
        lastError: null,
        configDocExists: restProbe.docExists,
        retryCount: 0,
      });
      return {
        connected: true,
        via: 'rest' as const,
        configDocExists: restProbe.docExists,
      };
    }

    // Try local IndexedDB cache check so we know if offline cache is intact
    let hasCachedConfig = false;
    try {
      const cachedSnap = await getDocFromCache(configRef);
      hasCachedConfig = cachedSnap.exists();
    } catch {
      hasCachedConfig = false;
    }

    const friendlyErr =
      hasCachedConfig
        ? 'Live cloud sync is temporarily unavailable. Using saved configuration and retrying automatically.'
        : 'Unable to connect to MyStudyZone cloud database right now. Please check your connection or retry.';

    reportFirestoreConnectionStatus({
      status: isFirestoreOfflineError(lastErr) ? 'offline' : 'error',
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
      lastCheckedAt: Date.now(),
      lastError: friendlyErr,
      retryCount: firestoreConnectionState.retryCount + 1,
    });

    return {
      connected: false,
      via: 'offline' as const,
      configDocExists: hasCachedConfig ? true : null,
      error: lastErr instanceof Error ? lastErr.message : friendlyErr,
    };
  })().finally(() => {
    inFlightConnectionTest = null;
  });

  return inFlightConnectionTest;
}

export async function triggerFirestoreReconnect() {
  await ensureFirestoreOnline();
  return testFirestoreConnection({ force: true });
}

if (typeof window !== 'undefined') {
  const win = window as unknown as Record<string, unknown>;
  if (!win.__mszFirestoreNetworkListenersAttached) {
    win.__mszFirestoreNetworkListenersAttached = true;
    window.addEventListener('online', () => {
      reportFirestoreConnectionStatus({
        status: 'reconnecting',
        isOnline: true,
        lastError: null,
      });
      void triggerFirestoreReconnect();
    });
    window.addEventListener('offline', () => {
      void disableNetwork(db).catch(() => {});
      reportFirestoreConnectionStatus({
        status: 'offline',
        isOnline: false,
        lastCheckedAt: Date.now(),
        lastError:
          'You are currently offline. Saved configuration & offline study tools remain available.',
      });
    });
  }
}

// Helper to sign in with Google Popup
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Google Sign In error:', error);
    return { success: false, error };
  }
}

// Persist scholarship test attempt and update student's question history in Firestore
export async function saveScholarshipAttemptToFirestore(
  studentId: string,
  attempt: {
    id: string;
    studentId: string;
    subject: string;
    totalQuestions: number;
    correctCount: number;
    scorePercent: number;
    timeSpentSeconds: number;
    classLevel: string;
    setNumber: number;
    marksObtained: number;
    maxMarks: number;
    completedAt: string;
    sectionBreakdown?: any;
  },
  attemptedQuestionIds: string[]
) {
  try {
    const studentRef = doc(db, 'students', studentId);
    const attemptRef = doc(db, 'students', studentId, 'attempts', attempt.id);

    // Save individual attempt
    await setDoc(attemptRef, attempt);

    // Update attempted questions history on student profile to prevent repeated questions
    if (attemptedQuestionIds && attemptedQuestionIds.length > 0) {
      await updateDoc(studentRef, {
        attemptedScholarshipQuestionIds: arrayUnion(...attemptedQuestionIds),
        lastActiveDate: new Date().toISOString()
      });
    }

    return { success: true };
  } catch (error) {
    console.warn('Firestore scholarship save warning:', error);
    return { success: false, error };
  }
}

// Global reference holder for recaptcha cleanup
let activeRecaptchaVerifier: RecaptchaVerifier | null = null;

export function clearRecaptchaVerifier(): void {
  if (activeRecaptchaVerifier) {
    try {
      activeRecaptchaVerifier.clear();
    } catch (e) {
      console.warn('Failed to clear recaptcha verifier:', e);
    }
    activeRecaptchaVerifier = null;
  }
}

export function createRecaptchaVerifier(
  containerId: string,
  onSolve?: () => void,
  onExpire?: () => void
): RecaptchaVerifier {
  clearRecaptchaVerifier();
  
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      if (onSolve) onSolve();
    },
    'expired-callback': () => {
      if (onExpire) onExpire();
    }
  });

  activeRecaptchaVerifier = verifier;
  return verifier;
}

// 1. Genuine Phone OTP SMS Send (Fail closed if live SMS is unavailable)
export async function sendFirebasePhoneOtp(
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
): Promise<{
  success: boolean;
  confirmationResult?: ConfirmationResult;
  error?: string;
}> {
  let clean = phoneNumber.trim();
  if (!clean.startsWith('+')) {
    const digits = clean.replace(/\D/g, '').slice(-10);
    clean = `+91${digits}`;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, clean, appVerifier);
    return { success: true, confirmationResult };
  } catch (error: any) {
    const code = error?.code || '';
    const msg = String(error?.message || '');
    console.warn('Firebase sendFirebasePhoneOtp notice:', code || msg);
    let message = 'Failed to send SMS OTP. Please verify the mobile number or sign in with Email & Password.';
    if (code === 'auth/invalid-phone-number') {
      message = 'Invalid phone number format. Please enter a valid 10-digit mobile number.';
    } else if (code === 'auth/too-many-requests') {
      message = 'Too many requests. Please wait a few minutes before requesting another OTP.';
    } else if (
      code === 'auth/operation-not-allowed' ||
      code === 'auth/billing-not-enabled' ||
      code === 'auth/captcha-check-failed' ||
      code === 'auth/unauthorized-domain'
    ) {
      message = 'SMS OTP verification is not currently enabled on this domain. Please sign in or register using Email & Password.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 2. Genuine Phone OTP SMS Verification
export async function verifyFirebasePhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const cleanCode = otpCode.trim();
    if (!cleanCode || cleanCode.length < 6) {
      return { success: false, error: 'Please enter the complete 6-digit OTP code.' };
    }
    const result = await confirmationResult.confirm(cleanCode);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.warn('Firebase verifyFirebasePhoneOtp notice:', error?.code || error?.message);
    let message = 'Invalid or expired OTP code. Please enter the correct 6-digit code.';
    if (error?.code === 'auth/invalid-verification-code') {
      message = 'The OTP code you entered is incorrect. Please check and try again.';
    } else if (error?.code === 'auth/code-expired') {
      message = 'This OTP code has expired. Please request a new OTP code.';
    } else if (error?.code === 'auth/session-expired') {
      message = 'The SMS session has expired. Please request a fresh OTP.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 3. Genuine Email Registration & Automatic Verification Email Send
export async function registerFirebaseEmailUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const result = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    // Send genuine verification email link
    await sendEmailVerification(result.user).catch(() => {});
    return { success: true, user: result.user };
  } catch (error: any) {
    console.warn('Firebase registerFirebaseEmailUser notice:', error?.code || error?.message);
    let message = 'Failed to create authentication account.';
    if (error?.code === 'auth/email-already-in-use') {
      message = 'This email address is already registered. Please sign in or use Forgot Password.';
    } else if (error?.code === 'auth/weak-password') {
      message = 'Password is too weak. Please use at least 6 characters.';
    } else if (error?.code === 'auth/invalid-email') {
      message = 'Invalid email address format.';
    } else if (error?.code === 'auth/operation-not-allowed') {
      message = 'Email/Password sign-up is currently disabled in Firebase Authentication configuration.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 4. Resend Verification Email
export async function resendFirebaseVerificationEmail(
  user?: User | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const target = user || auth.currentUser;
    if (!target) {
      return { success: false, error: 'No active user session to send verification email to. Please sign in again.' };
    }
    await sendEmailVerification(target);
    return { success: true };
  } catch (error: any) {
    console.warn('Firebase resend verification email notice:', error?.code || error?.message);
    let message = 'Failed to send verification email.';
    if (error?.code === 'auth/too-many-requests') {
      message = 'Please wait before requesting another verification email.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 5. Check Email Verification Status from Firebase Server
export async function checkFirebaseEmailVerified(
  user?: User | null
): Promise<{ isVerified: boolean; user?: User }> {
  try {
    const target = user || auth.currentUser;
    if (!target) {
      return { isVerified: false };
    }
    // reload updates currentUser token and properties from Firebase Auth server
    await reload(target);
    return { isVerified: Boolean(target.emailVerified), user: target };
  } catch (error) {
    console.warn('Firebase check email verified warning:', error);
    return { isVerified: false };
  }
}

// 6. Genuine Email + Password Sign In
export async function loginFirebaseEmailUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.warn('Firebase loginFirebaseEmailUser notice:', error?.code || error?.message);
    let message = 'Invalid email or password.';
    if (error?.code === 'auth/user-not-found' || error?.code === 'auth/wrong-password' || error?.code === 'auth/invalid-credential') {
      message = 'Incorrect email or password. Please verify credentials.';
    } else if (error?.code === 'auth/too-many-requests') {
      message = 'Too many failed login attempts. Please reset your password or try again later.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 7. Genuine Password Reset Email & Link Verification via Firebase Authentication
export async function sendFirebasePasswordReset(
  email: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      error: 'Please enter a valid email address (for example, student@example.com).',
    };
  }

  try {
    const continueUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/?email=${encodeURIComponent(cleanEmail)}`
        : undefined;

    try {
      if (continueUrl) {
        await sendPasswordResetEmail(auth, cleanEmail, {
          url: continueUrl,
          handleCodeInApp: false,
        });
      } else {
        await sendPasswordResetEmail(auth, cleanEmail);
      }
    } catch (innerErr: any) {
      // If continueUrl domain is not yet whitelisted in Firebase Console, fall back to standard sendPasswordResetEmail
      if (
        innerErr?.code === 'auth/unauthorized-continue-uri' ||
        innerErr?.code === 'auth/invalid-continue-uri' ||
        innerErr?.code === 'auth/missing-continue-uri'
      ) {
        await sendPasswordResetEmail(auth, cleanEmail);
      } else {
        throw innerErr;
      }
    }

    return {
      success: true,
      message: `A secure password reset link has been sent via Firebase Authentication to ${cleanEmail}. Please open your email and click the reset link to set a new password.`,
    };
  } catch (error: any) {
    console.warn('Firebase password reset notice:', error?.code || error?.message);
    let message = 'Unable to send password reset email right now. Please try again.';
    if (error?.code === 'auth/user-not-found') {
      message = 'No registered account was found with this email address. Please check the email and try again.';
    } else if (error?.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    } else if (error?.code === 'auth/too-many-requests') {
      message = 'Too many password reset requests. Please wait a moment before requesting another reset link.';
    } else if (error?.message) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}

// 7b. Verify Firebase Password Reset Code (when user clicks the Firebase email reset link)
export async function verifyFirebasePasswordResetCode(
  oobCode: string
): Promise<{ valid: boolean; email?: string; expired?: boolean; error?: string }> {
  const cleanCode = oobCode.trim();
  if (!cleanCode) {
    return {
      valid: false,
      expired: false,
      error: 'Invalid password reset link. Please request a new password reset link.',
    };
  }

  try {
    const email = await verifyPasswordResetCode(auth, cleanCode);
    return {
      valid: true,
      email: email.trim().toLowerCase(),
    };
  } catch (error: any) {
    console.warn('Firebase verifyPasswordResetCode error:', error?.code || error?.message);
    if (error?.code === 'auth/expired-action-code') {
      return {
        valid: false,
        expired: true,
        error: 'This password reset link has expired. Please request a new reset link below.',
      };
    }
    if (error?.code === 'auth/invalid-action-code') {
      return {
        valid: false,
        expired: true,
        error: 'This password reset link is invalid or has already been used. Please request another reset link.',
      };
    }
    return {
      valid: false,
      expired: true,
      error: 'Unable to verify this password reset link. It may have expired or already been used.',
    };
  }
}

// 7c. Confirm New Password with Firebase Authentication
export async function confirmFirebasePasswordReset(
  oobCode: string,
  newPassword: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  const cleanCode = oobCode.trim();
  if (!cleanCode) {
    return {
      success: false,
      error: 'Missing password reset code. Please request a new reset link.',
    };
  }
  if (!newPassword || newPassword.length < 6) {
    return {
      success: false,
      error: 'Your new password must be at least 6 characters long.',
    };
  }

  try {
    const email = await verifyPasswordResetCode(auth, cleanCode);
    await confirmPasswordReset(auth, cleanCode, newPassword);
    return {
      success: true,
      email: email.trim().toLowerCase(),
    };
  } catch (error: any) {
    console.warn('Firebase confirmPasswordReset error:', error?.code || error?.message);
    if (error?.code === 'auth/expired-action-code') {
      return {
        success: false,
        error: 'Your password reset link has expired. Please request a new reset link.',
      };
    }
    if (error?.code === 'auth/invalid-action-code') {
      return {
        success: false,
        error: 'This password reset link is invalid or has already been used. Please request a new reset link.',
      };
    }
    if (error?.code === 'auth/weak-password') {
      return {
        success: false,
        error: 'Please choose a stronger password (at least 6 characters).',
      };
    }
    return {
      success: false,
      error: error?.message || 'Failed to reset password. Please request a new reset link and try again.',
    };
  }
}

// 8. Sign Out
export async function signOutFirebaseUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Sign out warning:', e);
  }
}

export const PAID_PLAN_VALIDITY_DAYS = PAID_SUBSCRIPTION_VALIDITY_DAYS; // 1 Year (365 Days) validity for ₹99 Premium Plan

export function computePaidPlanExpiryIsoDate(
  existingExpiresAt?: string | null,
  verificationTimestamp?: Date | string | number
): {
  purchasedAt: string;
  expiresAt: string;
  validityDays: number;
  verifiedAtUtcIso: string;
  isRenewalBeforeExpiry: boolean;
} {
  const activation = computeSubscriptionActivationDates({
    verificationTimestamp,
    existingPlan: existingExpiresAt ? 'premium' : 'free',
    existingExpiresAt,
  });

  return {
    purchasedAt: activation.purchasedDateIst,
    expiresAt: activation.expiryDateIst,
    validityDays: PAID_PLAN_VALIDITY_DAYS,
    verifiedAtUtcIso: activation.verifiedAtUtcIso,
    isRenewalBeforeExpiry: activation.isRenewalBeforeExpiry,
  };
}

// 9. Persist Student Profile to Firestore (with 365-day paid plan expiry enforcement & permanent unique referral code)
export async function saveStudentProfileToFirestore(student: StudentProfile & { firebaseUid?: string }) {
  try {
    const studentRef = doc(db, 'students', student.id);
    const referralRef = doc(db, 'referrals', student.id);

    // Check existing student/referral doc in Firestore so an existing student's referralCode and classSubscriptions NEVER disappear
    let existingCode = sanitizeReferralCode(student.referralCode);
    let existingReferredByCode = sanitizeReferralCode(student.referredByCode);
    let existingReferredByStudentId = student.referredByStudentId || undefined;
    let existingPrimaryBoard: EducationBoard | undefined = student.primaryBoard
      ? normalizeBoardValue(student.primaryBoard)
      : undefined;
    let existingPrimaryClass: ClassLevel | undefined = normalizeClassLevelValue(student.primaryClassLevel) || undefined;
    let existingClassSubscriptions: Partial<Record<string, ClassSubscriptionRecord>> = {};
    let existingActivatedClasses: ClassLevel[] = [];
    let existingActivatedClassKeys: BoardClassKey[] = [];

    let refDocExists = false;

    try {
      const [stuData, refData] = await Promise.all([
        getCachedStudentDoc(student.id),
        getCachedReferralDoc(student.id),
      ]);
      refDocExists = Boolean(refData);

      const storedCode =
        sanitizeReferralCode(stuData?.referralCode) ||
        sanitizeReferralCode(refData?.referralCode);
      if (storedCode) {
        existingCode = storedCode;
      }
      if (!existingReferredByCode) {
        existingReferredByCode =
          sanitizeReferralCode(stuData?.referredByCode) ||
          sanitizeReferralCode(refData?.referredByCode) ||
          '';
      }
      if (!existingReferredByStudentId) {
        existingReferredByStudentId =
          stuData?.referredByStudentId ||
          refData?.referredByUserId ||
          undefined;
      }
      if (!existingPrimaryBoard && (stuData?.primaryBoard || stuData?.board)) {
        existingPrimaryBoard = normalizeBoardValue(stuData.primaryBoard || stuData.board);
      }
      if (!existingPrimaryClass && stuData?.primaryClassLevel) {
        existingPrimaryClass = normalizeClassLevelValue(stuData.primaryClassLevel) || undefined;
      } else if (!existingPrimaryClass && stuData?.classLevel) {
        existingPrimaryClass = normalizeClassLevelValue(stuData.classLevel) || undefined;
      }
      if (stuData?.classSubscriptions && typeof stuData.classSubscriptions === 'object') {
        existingClassSubscriptions = stuData.classSubscriptions;
      }
      if (Array.isArray(stuData?.activatedClasses)) {
        existingActivatedClasses = stuData.activatedClasses
          .map((c: string) => normalizeClassLevelValue(c))
          .filter(Boolean) as ClassLevel[];
      }
      if (Array.isArray(stuData?.activatedClassKeys)) {
        existingActivatedClassKeys = stuData.activatedClassKeys
          .map((k: string) => {
            const p = parseBoardClassKey(k);
            return p ? buildBoardClassKey(p.board, p.classLevel) : null;
          })
          .filter(Boolean) as BoardClassKey[];
      }
    } catch {
      // Offline or first write — proceed with deterministic code
    }

    const permanentReferralCode =
      existingCode || generateUniqueStudentReferralCode(student.id, student.name);
    const permanentReferralLink = buildStudentReferralLink(permanentReferralCode);

    const mergedClassSubscriptions: Partial<Record<string, ClassSubscriptionRecord>> = {
      ...existingClassSubscriptions,
      ...(student.classSubscriptions || {}),
    };
    const activePaidClasses = new Set<ClassLevel>(existingActivatedClasses);
    const activePaidClassKeys = new Set<BoardClassKey>(existingActivatedClassKeys);
    for (const clsItem of student.activatedClasses || []) {
      const norm = normalizeClassLevelValue(clsItem);
      if (norm) activePaidClasses.add(norm);
    }
    for (const kItem of student.activatedClassKeys || []) {
      const p = parseBoardClassKey(kItem);
      if (p) activePaidClassKeys.add(buildBoardClassKey(p.board, p.classLevel));
    }
    for (const [k, rec] of Object.entries(mergedClassSubscriptions)) {
      const parsed = parseBoardClassKey(k);
      const cls = normalizeClassLevelValue(rec?.classLevel || parsed?.classLevel);
      const recBoard = rec?.board
        ? normalizeBoardValue(rec.board)
        : k.includes('__')
          ? parsed?.board || 'Maharashtra'
          : 'Maharashtra';
      if (cls && rec && (rec.plan === 'premium' || rec.plan === 'basic') && rec.status === 'ACTIVE') {
        activePaidClassKeys.add(buildBoardClassKey(recBoard, cls));
        if (recBoard === 'Maharashtra') activePaidClasses.add(cls);
      }
    }

    const activePlan =
      student.plan === 'basic' || student.plan === 'premium' || activePaidClassKeys.size > 0 || activePaidClasses.size > 0
        ? 'premium'
        : 'free';
    const isPaid = activePlan === 'premium';
    const fallbackDates = isPaid ? computePaidPlanExpiryIsoDate() : null;

    const resolvedBoard = normalizeBoardValue(student.board || 'Maharashtra');
    const resolvedPrimaryBoard =
      existingPrimaryBoard ||
      normalizeBoardValue(student.primaryBoard || resolvedBoard);
    const resolvedPrimaryClass =
      existingPrimaryClass ||
      normalizeClassLevelValue(student.primaryClassLevel) ||
      normalizeClassLevelValue(student.classLevel) ||
      'Class 1';

    const resolvedPurchasedAt = isPaid
      ? student.planPurchasedAt || fallbackDates?.purchasedAt
      : undefined;
    const resolvedExpiresAt = isPaid
      ? student.planExpiresAt || fallbackDates?.expiresAt
      : undefined;
    const resolvedActivatedBoard = isPaid
      ? normalizeBoardValue(student.activatedBoard || resolvedBoard)
      : undefined;
    const resolvedActivatedClass = isPaid
      ? student.activatedClassLevel || Array.from(activePaidClasses)[0] || student.classLevel
      : undefined;

    const planLabel = isPaid
      ? `PREMIUM PLAN – ₹99 – 365 Days (1 Year) (${resolvedActivatedBoard || resolvedBoard} • ${resolvedActivatedClass || student.classLevel})`
      : 'FREE PLAN – ₹0 – Lifetime';

    // Strip any passwordHash field and clean undefined values before Firestore setDoc
    const { passwordHash: _ignoredPasswordHash, ...safeStudentFields } = student;
    const cleanData = JSON.parse(
      JSON.stringify({
        ...safeStudentFields,
        board: resolvedBoard,
        accountRole: student.accountRole || 'student',
        primaryBoard: resolvedPrimaryBoard,
        primaryClassLevel: resolvedPrimaryClass,
        activatedClasses: Array.from(activePaidClasses),
        activatedClassKeys: Array.from(activePaidClassKeys),
        classSubscriptions: mergedClassSubscriptions,
        plan: activePlan,
        planLabel,
        activatedBoard: isPaid ? resolvedActivatedBoard : null,
        activatedClassLevel: isPaid ? resolvedActivatedClass : null,
        isLifetimeFree: activePlan === 'free',
        planPurchasedAt: resolvedPurchasedAt,
        planExpiresAt: isPaid ? resolvedExpiresAt : null,
        subscriptionValidityDays: isPaid ? PAID_PLAN_VALIDITY_DAYS : 'Lifetime',
        referralCode: permanentReferralCode,
        referralLink: permanentReferralLink,
        referredByCode: existingReferredByCode || undefined,
        referredByStudentId: existingReferredByStudentId || undefined,
        lastActiveDate: new Date().toISOString(),
      })
    );
    await setDoc(studentRef, cleanData, { merge: true });
    updateCachedStudentDoc(student.id, cleanData);

    // Also ensure /referrals/{student.id} exists in Firestore with the exact same permanent referralCode
    try {
      if (!refDocExists) {
        await setDoc(
          referralRef,
          JSON.parse(
            JSON.stringify({
              userId: student.id,
              userName: student.name || 'Student Champion',
              userRole: student.accountRole === 'teacher' ? 'teacher' : 'student',
              className: student.classLevel || 'Class 5',
              schoolName: student.schoolName || '',
              city: 'Maharashtra',
              email: student.email || '',
              mobile: student.mobile || '',
              referralCode: permanentReferralCode,
              referralLink: permanentReferralLink,
              referredByCode: existingReferredByCode || undefined,
              referredByUserId: existingReferredByStudentId || undefined,
              totalInvitesSent: 0,
              totalSignups: 0,
              successfulReferrals: 0,
              pendingReferrals: 0,
              totalEarnings: 0,
              availableWalletBalance: 0,
              withdrawnAmount: 0,
              pendingWithdrawalAmount: 0,
              freeMonthsEarned: 0,
              totalXPBonus: 0,
              currentTier: 'None',
              unlockedRewards: [],
              createdAt: student.registeredAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          ),
          { merge: true }
        );
      }
    } catch {
      // Non-fatal if /referrals doc already exists with strict update rule
    }

    return {
      success: true,
      referralCode: permanentReferralCode,
      referralLink: permanentReferralLink,
      planPurchasedAt: resolvedPurchasedAt,
      planExpiresAt: resolvedExpiresAt,
    };
  } catch (error) {
    console.warn('Firestore save student error:', error);
    return {
      success: false,
      referralCode: sanitizeReferralCode(student.referralCode) || generateUniqueStudentReferralCode(student.id, student.name),
      referralLink: buildStudentReferralLink(
        sanitizeReferralCode(student.referralCode) || generateUniqueStudentReferralCode(student.id, student.name)
      ),
      error,
    };
  }
}

// 9b. Ensure a student has a permanent unique referral code in Firestore and return it
export async function ensureStudentReferralCodeInFirestore(
  studentId: string,
  studentName?: string,
  currentCode?: string
): Promise<{ referralCode: string; referralLink: string }> {
  const cleanId = String(studentId || '').trim();
  const fallbackCode =
    sanitizeReferralCode(currentCode) ||
    generateUniqueStudentReferralCode(cleanId, studentName);

  if (!cleanId) {
    return {
      referralCode: fallbackCode,
      referralLink: buildStudentReferralLink(fallbackCode),
    };
  }

  try {
    const studentRef = doc(db, 'students', cleanId);
    const referralRef = doc(db, 'referrals', cleanId);
    const [stuData, refData] = await Promise.all([
      getCachedStudentDoc(cleanId),
      getCachedReferralDoc(cleanId),
    ]);

    const resolvedCode =
      sanitizeReferralCode(stuData?.referralCode) ||
      sanitizeReferralCode(refData?.referralCode) ||
      fallbackCode;
    const resolvedLink = buildStudentReferralLink(resolvedCode);

    // Persist if missing on student document
    if (stuData && sanitizeReferralCode(stuData.referralCode) !== resolvedCode) {
      await setDoc(
        studentRef,
        {
          id: cleanId,
          referralCode: resolvedCode,
          referralLink: resolvedLink,
        },
        { merge: true }
      ).catch(() => {});
    }

    // Persist if missing on referrals document
    if (!refData) {
      await setDoc(
        referralRef,
        {
          userId: cleanId,
          userName: stuData?.name || studentName || 'Student Champion',
          userRole: 'student',
          className: stuData?.classLevel || 'Class 5',
          referralCode: resolvedCode,
          referralLink: resolvedLink,
          totalInvitesSent: 0,
          totalSignups: 0,
          successfulReferrals: 0,
          pendingReferrals: 0,
          totalEarnings: 0,
          availableWalletBalance: 0,
          withdrawnAmount: 0,
          pendingWithdrawalAmount: 0,
          freeMonthsEarned: 0,
          totalXPBonus: 0,
          currentTier: 'None',
          unlockedRewards: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});
    }

    return {
      referralCode: resolvedCode,
      referralLink: resolvedLink,
    };
  } catch {
    return {
      referralCode: fallbackCode,
      referralLink: buildStudentReferralLink(fallbackCode),
    };
  }
}

// 9c. Look up a referrer in Firestore by their unique referralCode
export async function findReferrerByCodeInFirestore(
  rawCode: string,
  currentUserId?: string
): Promise<{
  valid: boolean;
  referrerUserId?: string;
  referrerName?: string;
  referrerClass?: string;
  referralCode?: string;
  message: string;
}> {
  const cleanCode = sanitizeReferralCode(rawCode);
  if (!cleanCode) {
    return { valid: false, message: 'Please enter a valid referral code.' };
  }

  try {
    const refQuery = query(
      collection(db, 'referrals'),
      where('referralCode', '==', cleanCode),
      limit(1)
    );
    const refSnap = await getDocs(refQuery);
    if (!refSnap.empty) {
      const data = refSnap.docs[0].data();
      const ownerId = String(data.userId || refSnap.docs[0].id);
      if (currentUserId && ownerId === currentUserId) {
        return {
          valid: false,
          message: 'Self-referral is not allowed. You cannot use your own referral code.',
        };
      }
      return {
        valid: true,
        referrerUserId: ownerId,
        referrerName: String(data.userName || 'Student Champion'),
        referrerClass: String(data.className || 'Student'),
        referralCode: cleanCode,
        message: `Valid code! Referred by ${data.userName || 'Student Champion'}.`,
      };
    }

    const stuQuery = query(
      collection(db, 'students'),
      where('referralCode', '==', cleanCode),
      limit(1)
    );
    const stuSnap = await getDocs(stuQuery);
    if (!stuSnap.empty) {
      const data = stuSnap.docs[0].data();
      const ownerId = String(data.id || stuSnap.docs[0].id);
      if (currentUserId && ownerId === currentUserId) {
        return {
          valid: false,
          message: 'Self-referral is not allowed. You cannot use your own referral code.',
        };
      }
      return {
        valid: true,
        referrerUserId: ownerId,
        referrerName: String(data.name || 'Student Champion'),
        referrerClass: String(data.classLevel || 'Student'),
        referralCode: cleanCode,
        message: `Valid code! Referred by ${data.name || 'Student Champion'}.`,
      };
    }
  } catch (err) {
    console.warn('Firestore referral code lookup notice:', err);
  }

  return {
    valid: false,
    message: 'Invalid referral code. Please check the code and try again.',
  };
}

// 10. Persist Subscription Upgrade to Firestore (supports Board+Class and Multi-Category SKUs without overwriting unrelated active subscriptions)
export async function saveSubscriptionToFirestore(
  studentId: string,
  subscriptionData: {
    plan: 'free' | 'basic' | 'premium';
    planSku?: PlanSkuId;
    selectedBoard?: EducationBoard | string;
    selectedClass?: string;
    planPurchasedAt?: string;
    planExpiresAt?: string;
    currentExpiresAt?: string;
    paymentId?: string;
    orderId?: string;
    amountInr?: number;
  }
): Promise<{
  success: boolean;
  alreadyActivated?: boolean;
  plan: 'free' | 'basic' | 'premium';
  planSku?: PlanSkuId;
  activatedBoard?: EducationBoard;
  activatedClassLevel?: string | null;
  activatedCategoryKeys?: CategoryId[];
  planPurchasedAt: string;
  planExpiresAt: string | null;
  validityDays: number | 'Lifetime';
  error?: unknown;
}> {
  const isPaid = subscriptionData.plan === 'basic' || subscriptionData.plan === 'premium';
  const resolvedSku = resolvePlanSku(subscriptionData.planSku, undefined, subscriptionData.amountInr);
  const catalogItem = getPlanCatalogItem(resolvedSku);
  const isCategoryPlan = isPaid && catalogItem.unlockedCategories.length > 0;
  const computedDates = computePaidPlanExpiryIsoDate(subscriptionData.currentExpiresAt);

  const planPurchasedAt =
    subscriptionData.planPurchasedAt || computedDates.purchasedAt;
  const planExpiresAt = isPaid
    ? subscriptionData.planExpiresAt || computedDates.expiresAt
    : null;
  const targetBoard = normalizeBoardValue(subscriptionData.selectedBoard || 'Maharashtra');
  const activatedClassLevel = isPaid && !isCategoryPlan ? subscriptionData.selectedClass || null : null;
  const validityDays: number | 'Lifetime' = isPaid ? PAID_SUBSCRIPTION_VALIDITY_DAYS : 'Lifetime';
  const amountInr =
    subscriptionData.amountInr ??
    (isPaid ? catalogItem.amountInr : 0);
  const planLabel = isPaid
    ? isCategoryPlan
      ? `${catalogItem.title} – ₹${amountInr} – 365 Days`
      : `PREMIUM PLAN – ₹${amountInr} – 365 Days (1 Year)${activatedClassLevel ? ` (${targetBoard} • ${activatedClassLevel})` : ''}`
    : 'FREE PLAN – ₹0 – Lifetime';

  try {
    const studentRef = doc(db, 'students', studentId);
    const targetClass = !isCategoryPlan ? normalizeClassLevelValue(subscriptionData.selectedClass) : null;
    const targetCompositeKey = targetClass ? buildBoardClassKey(targetBoard, targetClass) : null;
    let existingData: any = null;

    try {
      existingData = await getCachedStudentDoc(studentId);
      if (existingData && subscriptionData.paymentId) {
        if (isCategoryPlan) {
          const alreadyHasCategoryPayment = catalogItem.unlockedCategories.every(
            (catId) => existingData?.categorySubscriptions?.[catId]?.paymentId === subscriptionData.paymentId
          );
          if (alreadyHasCategoryPayment) {
            return {
              success: true,
              alreadyActivated: true,
              plan: subscriptionData.plan,
              planSku: resolvedSku,
              activatedBoard: existingData?.activatedBoard || undefined,
              activatedClassLevel: existingData?.activatedClassLevel || null,
              activatedCategoryKeys: existingData?.activatedCategoryKeys || [],
              planPurchasedAt: existingData?.planPurchasedAt || planPurchasedAt,
              planExpiresAt: existingData?.planExpiresAt || planExpiresAt,
              validityDays,
            };
          }
        } else {
          const existingTargetRec =
            (targetCompositeKey && existingData?.classSubscriptions?.[targetCompositeKey]) ||
            (targetBoard === 'Maharashtra' && targetClass && existingData?.classSubscriptions?.[targetClass]);
          if (
            existingTargetRec?.paymentId === subscriptionData.paymentId ||
            (!targetClass && existingData?.lastPaymentId === subscriptionData.paymentId)
          ) {
            return {
              success: true,
              alreadyActivated: true,
              plan: subscriptionData.plan,
              planSku: resolvedSku,
              activatedBoard: targetBoard,
              activatedClassLevel: existingData?.activatedClassLevel || activatedClassLevel,
              activatedCategoryKeys: existingData?.activatedCategoryKeys || [],
              planPurchasedAt: existingData?.planPurchasedAt || planPurchasedAt,
              planExpiresAt: existingData?.planExpiresAt || planExpiresAt,
              validityDays,
            };
          }
        }
      }
    } catch {
      // Proceed with setDoc if read fails
    }

    const existingClassMap: Partial<Record<string, ClassSubscriptionRecord>> =
      existingData?.classSubscriptions && typeof existingData.classSubscriptions === 'object'
        ? { ...existingData.classSubscriptions }
        : {};

    const existingCategoryMap: Partial<Record<CategoryId, CategorySubscriptionRecord>> =
      existingData?.categorySubscriptions && typeof existingData.categorySubscriptions === 'object'
        ? { ...existingData.categorySubscriptions }
        : {};

    const nowIso = new Date().toISOString();

    if (isPaid && isCategoryPlan) {
      for (const catId of catalogItem.unlockedCategories) {
        const prevCat = existingCategoryMap[catId];
        const catDates = computePaidPlanExpiryIsoDate(prevCat?.expiresAt || subscriptionData.currentExpiresAt);
        existingCategoryMap[catId] = {
          categoryId: catId,
          planSku: resolvedSku,
          status: 'ACTIVE',
          purchasedAt: subscriptionData.planPurchasedAt || catDates.purchasedAt,
          expiresAt: subscriptionData.planExpiresAt || catDates.expiresAt,
          paymentId: subscriptionData.paymentId || undefined,
          orderId: subscriptionData.orderId || undefined,
          amountInr,
          validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
          updatedAt: nowIso,
        };
      }
    } else if (isPaid && targetClass && targetCompositeKey) {
      existingClassMap[targetCompositeKey] = {
        board: targetBoard,
        classLevel: targetClass,
        plan: subscriptionData.plan,
        status: 'ACTIVE',
        purchasedAt: planPurchasedAt,
        expiresAt: planExpiresAt || undefined,
        paymentId: subscriptionData.paymentId || undefined,
        orderId: subscriptionData.orderId || undefined,
        amountInr,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
        updatedAt: nowIso,
      };
    }

    const activatedSet = new Set<ClassLevel>();
    const activatedKeySet = new Set<BoardClassKey>();
    if (Array.isArray(existingData?.activatedClasses)) {
      for (const cls of existingData.activatedClasses) {
        const norm = normalizeClassLevelValue(cls);
        if (norm) activatedSet.add(norm);
      }
    }
    if (Array.isArray(existingData?.activatedClassKeys)) {
      for (const k of existingData.activatedClassKeys) {
        const p = parseBoardClassKey(k);
        if (p) activatedKeySet.add(buildBoardClassKey(p.board, p.classLevel));
      }
    }
    for (const [k, rec] of Object.entries(existingClassMap)) {
      const parsed = parseBoardClassKey(k);
      const norm = normalizeClassLevelValue(rec?.classLevel || parsed?.classLevel);
      const b = rec?.board
        ? normalizeBoardValue(rec.board)
        : k.includes('__')
          ? parsed?.board || 'Maharashtra'
          : 'Maharashtra';
      if (norm && rec && (rec.plan === 'premium' || rec.plan === 'basic') && rec.status === 'ACTIVE') {
        activatedKeySet.add(buildBoardClassKey(b, norm));
        if (b === 'Maharashtra') activatedSet.add(norm);
      }
    }
    if (isPaid && !isCategoryPlan && targetClass) {
      activatedKeySet.add(buildBoardClassKey(targetBoard, targetClass));
      if (targetBoard === 'Maharashtra') activatedSet.add(targetClass);
    }

    const activatedCategorySet = new Set<CategoryId>();
    if (Array.isArray(existingData?.activatedCategoryKeys)) {
      for (const ck of existingData.activatedCategoryKeys) {
        if (ALL_CATEGORY_IDS.includes(ck as CategoryId)) {
          activatedCategorySet.add(ck as CategoryId);
        }
      }
    }
    for (const [ck, rec] of Object.entries(existingCategoryMap)) {
      if (ALL_CATEGORY_IDS.includes(ck as CategoryId) && rec && rec.status === 'ACTIVE') {
        activatedCategorySet.add(ck as CategoryId);
      }
    }

    const resolvedPrimaryBoard = normalizeBoardValue(
      existingData?.primaryBoard || existingData?.board || targetBoard
    );
    const resolvedPrimaryClass =
      normalizeClassLevelValue(existingData?.primaryClassLevel) ||
      normalizeClassLevelValue(existingData?.classLevel) ||
      targetClass ||
      undefined;

    const cleanSub = JSON.parse(
      JSON.stringify({
        id: studentId,
        plan: subscriptionData.plan,
        planLabel,
        board: isCategoryPlan ? (existingData?.board ? normalizeBoardValue(existingData.board) : targetBoard) : targetBoard,
        classLevel: isCategoryPlan ? existingData?.classLevel : (targetClass || existingData?.classLevel || undefined),
        primaryBoard: resolvedPrimaryBoard,
        primaryClassLevel: resolvedPrimaryClass,
        activatedBoard: isCategoryPlan ? (existingData?.activatedBoard || null) : (isPaid ? targetBoard : null),
        activatedClassLevel: isCategoryPlan ? (existingData?.activatedClassLevel || null) : activatedClassLevel,
        activatedClasses: Array.from(activatedSet),
        activatedClassKeys: Array.from(activatedKeySet),
        classSubscriptions: existingClassMap,
        activatedCategoryKeys: Array.from(activatedCategorySet),
        categorySubscriptions: existingCategoryMap,
        isLifetimeFree: subscriptionData.plan === 'free',
        planPurchasedAt: existingData?.planPurchasedAt || planPurchasedAt,
        planExpiresAt:
          existingData?.planExpiresAt && planExpiresAt && existingData.planExpiresAt > planExpiresAt
            ? existingData.planExpiresAt
            : planExpiresAt,
        subscriptionValidityDays: validityDays,
        subscriptionStatus: 'ACTIVE',
        lastPaymentId: subscriptionData.paymentId || null,
        lastOrderId: subscriptionData.orderId || null,
        lastPaymentAmountInr: amountInr,
        subscriptionUpdatedAt: nowIso,
      })
    );
    await setDoc(studentRef, cleanSub, { merge: true });
    updateCachedStudentDoc(studentId, cleanSub);
    return {
      success: true,
      plan: subscriptionData.plan,
      planSku: resolvedSku,
      activatedBoard: isCategoryPlan ? existingData?.activatedBoard : targetBoard,
      activatedClassLevel: isCategoryPlan ? existingData?.activatedClassLevel : activatedClassLevel,
      activatedCategoryKeys: Array.from(activatedCategorySet),
      planPurchasedAt,
      planExpiresAt,
      validityDays,
    };
  } catch (error) {
    console.warn('Firestore save subscription error:', error);
    return {
      success: false,
      plan: subscriptionData.plan,
      planSku: resolvedSku,
      activatedBoard: targetBoard,
      activatedClassLevel,
      planPurchasedAt,
      planExpiresAt,
      validityDays,
      error,
    };
  }
}

// 10a. Save Verified or Failed Razorpay Payment Transaction to Firestore (/transactions/{transactionId})
export async function saveTransactionToFirestore(transaction: {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  parentEmail?: string;
  parentMobile?: string;
  selectedBoard?: EducationBoard | string;
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
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  createdAt: string;
  membershipStartDate?: string;
  membershipExpiryDate?: string;
}): Promise<{ success: boolean; id: string; error?: unknown }> {
  const safePaymentId = (transaction.paymentId || transaction.id).replace(/[^a-zA-Z0-9_-]/g, '_');
  const deterministicTxId = safePaymentId.startsWith('tx_') ? safePaymentId : `tx_${safePaymentId}`;

  try {
    const txRef = doc(db, 'transactions', deterministicTxId);
    const cleanTx = JSON.parse(
      JSON.stringify({
        ...transaction,
        id: deterministicTxId,
        receiptNumber: String(transaction.receiptNumber || `REC-VC-${Date.now().toString().slice(-6)}`).slice(0, 50),
        studentId: String(transaction.studentId).slice(0, 128),
        studentName: String(transaction.studentName || 'Student').slice(0, 100),
        parentEmail: String(transaction.parentEmail || '').slice(0, 150),
        parentMobile: String(transaction.parentMobile || '').slice(0, 20),
        selectedBoard: transaction.selectedBoard ? normalizeBoardValue(transaction.selectedBoard) : undefined,
        selectedClass: transaction.selectedClass || undefined,
        planSku: transaction.planSku || undefined,
        activatedCategories: Array.isArray(transaction.activatedCategories)
          ? transaction.activatedCategories
          : undefined,
        amount: Number(transaction.amount) || 99,
        currency: 'INR',
        status: transaction.status || 'SUCCESS',
        savedToFirestoreAt: new Date().toISOString(),
      })
    );
    await setDoc(txRef, cleanTx, { merge: true });
    return { success: true, id: deterministicTxId };
  } catch (error) {
    console.warn('Firestore save transaction warning:', error);
    return { success: false, id: deterministicTxId, error };
  }
}

// 10b. Fetch Student Subscription Status from Firestore to keep Dashboard synchronized with Firebase
export async function fetchStudentSubscriptionFromFirestore(studentId: string): Promise<{
  found: boolean;
  plan?: 'free' | 'basic' | 'premium';
  board?: EducationBoard;
  classLevel?: ClassLevel;
  primaryBoard?: EducationBoard;
  primaryClassLevel?: ClassLevel;
  activatedBoard?: EducationBoard | null;
  activatedClassLevel?: string | null;
  activatedClasses?: ClassLevel[];
  activatedClassKeys?: BoardClassKey[];
  classSubscriptions?: Partial<Record<string, ClassSubscriptionRecord>>;
  activatedCategoryKeys?: CategoryId[];
  categorySubscriptions?: Partial<Record<CategoryId, CategorySubscriptionRecord>>;
  planPurchasedAt?: string;
  planExpiresAt?: string | null;
}> {
  if (!studentId) return { found: false };
  try {
    const data = await getCachedStudentDoc(studentId);
    if (!data) {
      return { found: false };
    }
    const rawPlan = data?.plan;
    const plan: 'free' | 'basic' | 'premium' =
      rawPlan === 'premium' || rawPlan === 'basic' ? rawPlan : 'free';
    const resolvedBoard = normalizeBoardValue(data?.board || data?.primaryBoard || 'Maharashtra');
    return {
      found: true,
      plan,
      board: resolvedBoard,
      classLevel: normalizeClassLevelValue(data?.classLevel) || undefined,
      primaryBoard: normalizeBoardValue(data?.primaryBoard || resolvedBoard),
      primaryClassLevel:
        normalizeClassLevelValue(data?.primaryClassLevel) ||
        normalizeClassLevelValue(data?.classLevel) ||
        undefined,
      activatedBoard: data?.activatedBoard ? normalizeBoardValue(data.activatedBoard) : null,
      activatedClassLevel: data?.activatedClassLevel || null,
      activatedClasses: Array.isArray(data?.activatedClasses)
        ? (data.activatedClasses
            .map((c: string) => normalizeClassLevelValue(c))
            .filter(Boolean) as ClassLevel[])
        : [],
      activatedClassKeys: Array.isArray(data?.activatedClassKeys)
        ? (data.activatedClassKeys
            .map((k: string) => {
              const p = parseBoardClassKey(k);
              return p ? buildBoardClassKey(p.board, p.classLevel) : null;
            })
            .filter(Boolean) as BoardClassKey[])
        : [],
      classSubscriptions:
        data?.classSubscriptions && typeof data.classSubscriptions === 'object'
          ? data.classSubscriptions
          : undefined,
      activatedCategoryKeys: Array.isArray(data?.activatedCategoryKeys)
        ? (data.activatedCategoryKeys.filter((k: string) =>
            ALL_CATEGORY_IDS.includes(k as CategoryId)
          ) as CategoryId[])
        : [],
      categorySubscriptions:
        data?.categorySubscriptions && typeof data.categorySubscriptions === 'object'
          ? data.categorySubscriptions
          : undefined,
      planPurchasedAt: data?.planPurchasedAt || undefined,
      planExpiresAt: data?.planExpiresAt || null,
    };
  } catch {
    return { found: false };
  }
}

// 10c. Persist verified switch between already-unlocked (board, class) pairs on a user account
export async function switchStudentActiveClassInFirestore(
  studentId: string,
  targetClass: ClassLevel,
  targetBoard?: EducationBoard
): Promise<{ success: boolean }> {
  if (!studentId) return { success: false };
  try {
    const updatePayload: Record<string, any> = {
      classLevel: targetClass,
      lastActiveDate: new Date().toISOString(),
    };
    if (targetBoard) {
      updatePayload.board = normalizeBoardValue(targetBoard);
    }
    await updateDoc(doc(db, 'students', studentId), updatePayload);
    updateCachedStudentDoc(studentId, updatePayload);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// 11. Aliases used by AuthModal for Email Registration, Login & Profile Lookup
export async function registerWithFirebaseEmail(
  email: string,
  password: string,
  _name?: string
) {
  return registerFirebaseEmailUser(email, password);
}

export async function loginWithFirebaseEmail(email: string, password: string) {
  return loginFirebaseEmailUser(email, password);
}

export async function fetchStudentProfileFromFirestore(
  uid: string,
  email?: string
): Promise<StudentProfile | null> {
  const cleanUid = String(uid || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanUid && !cleanEmail) return null;

  try {
    if (cleanUid) {
      const directData = await getCachedStudentDoc(cleanUid);
      if (directData) {
        const data = directData as StudentProfile;
        const { passwordHash: _ignored, ...safeProfile } = data;
        return {
          ...safeProfile,
          board: normalizeBoardValue(data.board || data.primaryBoard || 'Maharashtra'),
          primaryBoard: normalizeBoardValue(data.primaryBoard || data.board || 'Maharashtra'),
          id: data.id || cleanUid,
        };
      }

      const byFirebaseUidQuery = query(
        collection(db, 'students'),
        where('firebaseUid', '==', cleanUid),
        limit(1)
      );
      const byUidSnap = await getDocs(byFirebaseUidQuery).catch(() => null);
      if (byUidSnap && !byUidSnap.empty) {
        const docSnap = byUidSnap.docs[0];
        const data = docSnap.data() as StudentProfile;
        const { passwordHash: _ignored, ...safeProfile } = data;
        return {
          ...safeProfile,
          board: normalizeBoardValue(data.board || data.primaryBoard || 'Maharashtra'),
          primaryBoard: normalizeBoardValue(data.primaryBoard || data.board || 'Maharashtra'),
          id: data.id || docSnap.id,
        };
      }
    }

    if (cleanEmail) {
      const byEmailQuery = query(
        collection(db, 'students'),
        where('email', '==', cleanEmail),
        limit(1)
      );
      const byEmailSnap = await getDocs(byEmailQuery).catch(() => null);
      if (byEmailSnap && !byEmailSnap.empty) {
        const docSnap = byEmailSnap.docs[0];
        const data = docSnap.data() as StudentProfile;
        const { passwordHash: _ignored, ...safeProfile } = data;
        return {
          ...safeProfile,
          board: normalizeBoardValue(data.board || data.primaryBoard || 'Maharashtra'),
          primaryBoard: normalizeBoardValue(data.primaryBoard || data.board || 'Maharashtra'),
          id: data.id || docSnap.id,
        };
      }
    }
  } catch (err) {
    console.warn('Firestore fetch student profile warning:', err);
  }
  return null;
}

export async function getStudentProfileByEmailFromFirestore(
  email: string
): Promise<StudentProfile | null> {
  return fetchStudentProfileFromFirestore('', email);
}

export { onAuthStateChanged };

