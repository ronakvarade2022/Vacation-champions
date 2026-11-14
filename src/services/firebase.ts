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
import { getFirestore, doc, getDoc, getDocFromServer, setDoc, updateDoc, arrayUnion, collection, getDocs, query, where, limit } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { BoardClassKey, ClassLevel, ClassSubscriptionRecord, EducationBoard, StudentProfile } from '../types';
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without specifying firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
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

// Connection test on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection notice: Client is offline or network restricted.');
    }
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
      const [stuSnap, refSnap] = await Promise.all([
        getDoc(studentRef).catch(() => null),
        getDoc(referralRef).catch(() => null),
      ]);
      const stuData = stuSnap && stuSnap.exists() ? stuSnap.data() : null;
      refDocExists = Boolean(refSnap && refSnap.exists());
      const refData = refDocExists && refSnap ? refSnap.data() : null;

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
    const [stuSnap, refSnap] = await Promise.all([
      getDoc(studentRef).catch(() => null),
      getDoc(referralRef).catch(() => null),
    ]);

    const stuData = stuSnap && stuSnap.exists() ? stuSnap.data() : null;
    const refData = refSnap && refSnap.exists() ? refSnap.data() : null;

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

// 10. Persist Subscription Upgrade to Firestore (sets 1-year / 365-day expiration & board+class-wise activation)
export async function saveSubscriptionToFirestore(
  studentId: string,
  subscriptionData: {
    plan: 'free' | 'basic' | 'premium';
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
  activatedBoard?: EducationBoard;
  activatedClassLevel?: string | null;
  planPurchasedAt: string;
  planExpiresAt: string | null;
  validityDays: number | 'Lifetime';
  error?: unknown;
}> {
  const isPaid = subscriptionData.plan === 'basic' || subscriptionData.plan === 'premium';
  const computedDates = computePaidPlanExpiryIsoDate(subscriptionData.currentExpiresAt);

  const planPurchasedAt =
    subscriptionData.planPurchasedAt || computedDates.purchasedAt;
  const planExpiresAt = isPaid
    ? subscriptionData.planExpiresAt || computedDates.expiresAt
    : null;
  const targetBoard = normalizeBoardValue(subscriptionData.selectedBoard || 'Maharashtra');
  const activatedClassLevel = isPaid ? subscriptionData.selectedClass || null : null;
  const validityDays: number | 'Lifetime' = isPaid ? PAID_SUBSCRIPTION_VALIDITY_DAYS : 'Lifetime';
  const planLabel = isPaid
    ? `PREMIUM PLAN – ₹99 – 365 Days (1 Year)${activatedClassLevel ? ` (${targetBoard} • ${activatedClassLevel})` : ''}`
    : 'FREE PLAN – ₹0 – Lifetime';
  const amountInr =
    subscriptionData.amountInr ??
    (isPaid ? 99 : 0);

  try {
    const studentRef = doc(db, 'students', studentId);
    const targetClass = normalizeClassLevelValue(subscriptionData.selectedClass);
    const targetCompositeKey = targetClass ? buildBoardClassKey(targetBoard, targetClass) : null;
    let existingData: any = null;

    try {
      const existingSnap = await getDoc(studentRef);
      if (existingSnap.exists()) {
        existingData = existingSnap.data();
        const existingTargetRec =
          (targetCompositeKey && existingData?.classSubscriptions?.[targetCompositeKey]) ||
          (targetBoard === 'Maharashtra' && targetClass && existingData?.classSubscriptions?.[targetClass]);
        if (
          subscriptionData.paymentId &&
          (existingTargetRec?.paymentId === subscriptionData.paymentId ||
            (!targetClass && existingData?.lastPaymentId === subscriptionData.paymentId))
        ) {
          return {
            success: true,
            alreadyActivated: true,
            plan: subscriptionData.plan,
            activatedBoard: targetBoard,
            activatedClassLevel: existingData?.activatedClassLevel || activatedClassLevel,
            planPurchasedAt: existingData?.planPurchasedAt || planPurchasedAt,
            planExpiresAt: existingData?.planExpiresAt || planExpiresAt,
            validityDays,
          };
        }
      }
    } catch {
      // Proceed with setDoc if read fails
    }

    const existingClassMap: Partial<Record<string, ClassSubscriptionRecord>> =
      existingData?.classSubscriptions && typeof existingData.classSubscriptions === 'object'
        ? { ...existingData.classSubscriptions }
        : {};

    if (isPaid && targetClass && targetCompositeKey) {
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
        updatedAt: new Date().toISOString(),
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
    if (isPaid && targetClass) {
      activatedKeySet.add(buildBoardClassKey(targetBoard, targetClass));
      if (targetBoard === 'Maharashtra') activatedSet.add(targetClass);
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
        board: targetBoard,
        classLevel: targetClass || existingData?.classLevel || undefined,
        primaryBoard: resolvedPrimaryBoard,
        primaryClassLevel: resolvedPrimaryClass,
        activatedBoard: isPaid ? targetBoard : null,
        activatedClassLevel,
        activatedClasses: Array.from(activatedSet),
        activatedClassKeys: Array.from(activatedKeySet),
        classSubscriptions: existingClassMap,
        isLifetimeFree: subscriptionData.plan === 'free',
        planPurchasedAt,
        planExpiresAt,
        subscriptionValidityDays: validityDays,
        subscriptionStatus: 'ACTIVE',
        lastPaymentId: subscriptionData.paymentId || null,
        lastOrderId: subscriptionData.orderId || null,
        lastPaymentAmountInr: amountInr,
        subscriptionUpdatedAt: new Date().toISOString(),
      })
    );
    await setDoc(studentRef, cleanSub, { merge: true });
    return {
      success: true,
      plan: subscriptionData.plan,
      activatedBoard: targetBoard,
      activatedClassLevel,
      planPurchasedAt,
      planExpiresAt,
      validityDays,
    };
  } catch (error) {
    console.warn('Firestore save subscription error:', error);
    return {
      success: false,
      plan: subscriptionData.plan,
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
  planPurchasedAt?: string;
  planExpiresAt?: string | null;
}> {
  if (!studentId) return { found: false };
  try {
    const snap = await getDoc(doc(db, 'students', studentId));
    if (!snap.exists()) {
      return { found: false };
    }
    const data = snap.data();
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
      activatedClassLevel: data?.activatedClassLevel || data?.classLevel || null,
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
      const directSnap = await getDoc(doc(db, 'students', cleanUid)).catch(() => null);
      if (directSnap && directSnap.exists()) {
        const data = directSnap.data() as StudentProfile;
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

