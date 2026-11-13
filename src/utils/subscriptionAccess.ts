import { ClassLevel, StudentProfile, SubjectName } from '../types';
import {
  evaluateSubscriptionValidity,
  formatDateIstDisplay,
  PAID_SUBSCRIPTION_VALIDITY_DAYS,
} from './subscriptionDateUtils';

export type SubscriptionPlanId = 'free' | 'basic' | 'premium';

export const FREE_ALLOWED_SUBJECTS: SubjectName[] = [
  'English',
  'Mathematics',
  'Mathematics – Algebra',
  'Mathematics – Geometry'
];

export type DashboardFeatureKey =
  | 'dashboard'
  | 'profile'
  | 'demo'
  | 'puzzles'
  | 'sudoku'
  | 'quizzes'
  | 'worksheets'
  | 'stories'
  | 'shivaji'
  | 'drawing'
  | 'cricket'
  | 'scholarship'
  | 'future-skills'
  | 'ai-academy'
  | 'certificates'
  | 'leaderboard'
  | 'referrals';

export function formatStandardOrdinal(classLevel?: ClassLevel | string | null): string {
  const num = parseInt(String(classLevel || 'Class 1').replace('Class ', ''), 10) || 1;
  if (num === 1) return '1st';
  if (num === 2) return '2nd';
  if (num === 3) return '3rd';
  return `${num}th`;
}

export function getPremiumActivatedBannerMessage(classLevel?: ClassLevel | string | null): string {
  return `Your Premium Access is Activated for Standard ${formatStandardOrdinal(classLevel)}. Enjoy All Worksheets for Your Class!`;
}

export const WORKSHEET_CLASS_LOCK_MESSAGE =
  'Unlock All Worksheets for Your Class – Only ₹99!';

export const WORKSHEET_PREMIUM_UPGRADE_MESSAGE = WORKSHEET_CLASS_LOCK_MESSAGE;

export function getFreeDemoWorksheetIdsForClass(classLevel: ClassLevel = 'Class 1'): readonly [string, string] {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const mathKey = cNum === 10 ? 'MATHEMATICSALGEBRA' : 'MATHEMATICS';
  return [`WS-C${cNum}-ENGLISH-1`, `WS-C${cNum}-${mathKey}-1`] as const;
}

export const FREE_DEMO_WORKSHEET_IDS: readonly string[] = [
  'WS-C1-ENGLISH-1',
  'WS-C1-MATHEMATICS-1'
] as const;

export const SUBSCRIPTION_PLANS_CATALOG = [
  {
    id: 'free' as const,
    title: 'FREE PLAN',
    fullLabel: 'FREE PLAN – ₹0 – Lifetime',
    priceInr: 0,
    priceText: '₹0',
    validityText: 'Lifetime',
    validitySubtext: 'Never Expires',
    summary: '2 Free Demo Worksheets (1 English & 1 Mathematics for your registered class), Brain Puzzles, Sudoku (4×4, 6×6, 9×9), English & Mathematics Quizzes',
  },
  {
    id: 'premium' as const,
    title: 'PREMIUM PLAN',
    fullLabel: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
    priceInr: 99,
    priceText: '₹99',
    validityText: '365 Days (1 Year)',
    validitySubtext: '1 Year (365 Days) Validity (Selected Class)',
    summary: 'Complete Class-Wise Unlock: All Worksheets & All Subjects for Your Selected Class, 4 Quiz Levels, Stories with Audio, Drawing, Cricket, Scholarship, AI Academy, Certificates & Referrals',
  },
];

export interface PlanAccessInfo {
  effectivePlan: SubscriptionPlanId;
  storedPlan: SubscriptionPlanId;
  planDisplayName: string;
  planFullHeader: string;
  planShortBadge: string;
  priceLabel: string;
  validityPeriodLabel: string;
  isPaidPlanExpired: boolean;
  isExpiringToday?: boolean;
  expiredPlanName?: string;
  isLifetimeFree: boolean;
  purchasedDateIso?: string | null;
  purchasedDisplay: string;
  expiryDateIso?: string | null;
  expiryDisplay: string;
  daysRemaining: number | null;
  daysRemainingDisplay: string;
  statusLabel: 'ACTIVE' | 'EXPIRING TODAY' | 'EXPIRED';
  activatedClassLevel?: ClassLevel;
}

/**
 * Computes the effective active subscription plan for a student or teacher
 * using the unified IST (Asia/Kolkata) subscription validity engine.
 * - Free Plan ('free') is Lifetime and NEVER expires.
 * - Premium Plan ('premium' ₹99) has 365 Days (1 Year) validity for the user's selected class.
 * - After a paid subscription expires, the user automatically retains the Free Plan (Lifetime)
 *   with a clear option to renew their ₹99 Premium Plan.
 */
export function getStudentPlanInfo(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): PlanAccessInfo {
  if (!student) {
    return {
      effectivePlan: 'free',
      storedPlan: 'free',
      planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
      planFullHeader: 'FREE PLAN – ₹0 – Lifetime',
      planShortBadge: 'Free Plan (Lifetime)',
      priceLabel: '₹0',
      validityPeriodLabel: 'Lifetime',
      isPaidPlanExpired: false,
      isExpiringToday: false,
      isLifetimeFree: true,
      purchasedDateIso: null,
      purchasedDisplay: 'Lifetime Free',
      expiryDateIso: null,
      expiryDisplay: 'Lifetime (Never Expires)',
      daysRemaining: null,
      daysRemainingDisplay: 'Lifetime (Never Expires)',
      statusLabel: 'ACTIVE'
    };
  }

  if (student.plan === 'free' || !student.plan) {
    return {
      effectivePlan: 'free',
      storedPlan: 'free',
      planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
      planFullHeader: 'FREE PLAN – ₹0 – Lifetime',
      planShortBadge: 'Free Plan (Lifetime)',
      priceLabel: '₹0',
      validityPeriodLabel: 'Lifetime',
      isPaidPlanExpired: false,
      isExpiringToday: false,
      isLifetimeFree: true,
      purchasedDateIso: student.registeredAt ? formatDateIstDisplay(student.registeredAt) : null,
      purchasedDisplay: 'Lifetime Free Plan',
      expiryDateIso: null,
      expiryDisplay: 'Lifetime (Never Expires)',
      daysRemaining: null,
      daysRemainingDisplay: 'Lifetime (Never Expires)',
      statusLabel: 'ACTIVE',
      activatedClassLevel: student.classLevel
    };
  }

  // Evaluate paid plan using the single shared IST (Asia/Kolkata) validity calculator
  const validity = evaluateSubscriptionValidity(
    student.plan,
    student.planPurchasedAt,
    student.planExpiresAt,
    referenceNow
  );

  if (validity.isExpired) {
    const expiredPlanName = 'PREMIUM PLAN (₹99 – 365 Days)';
    return {
      effectivePlan: 'free',
      storedPlan: 'premium',
      planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
      planFullHeader: `FREE PLAN – ₹0 – Lifetime (${expiredPlanName} Expired)`,
      planShortBadge: 'Free Plan (Renew ₹99 Premium)',
      priceLabel: '₹0 (Free Active)',
      validityPeriodLabel: 'Lifetime (Premium Plan Expired)',
      isPaidPlanExpired: true,
      isExpiringToday: false,
      expiredPlanName,
      isLifetimeFree: true,
      purchasedDateIso: validity.purchaseDateIst,
      purchasedDisplay: validity.purchaseDateDisplay,
      expiryDateIso: validity.expiryDateIst,
      expiryDisplay: `Expired on ${validity.expiryDateDisplay} (${validity.expiryDateIst || student.planExpiresAt}) • Free Plan Active`,
      daysRemaining: 0,
      daysRemainingDisplay: '0 Days Remaining (Expired • Free Plan Active)',
      statusLabel: 'EXPIRED',
      activatedClassLevel: student.classLevel
    };
  }

  const activatedClass = student.activatedClassLevel || student.classLevel;
  const daysRem = validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;

  return {
    effectivePlan: 'premium',
    storedPlan: 'premium',
    planDisplayName: `PREMIUM PLAN – ₹99 – 365 Days (${activatedClass})`,
    planFullHeader: `PREMIUM PLAN – ₹99 – 365 Days (Standard ${formatStandardOrdinal(activatedClass)})`,
    planShortBadge: validity.isExpiringToday
      ? `Premium (Expires Today • ${activatedClass})`
      : `Premium Plan (₹99 • ${activatedClass})`,
    priceLabel: '₹99',
    validityPeriodLabel: `${validity.configuredValidityDays || PAID_SUBSCRIPTION_VALIDITY_DAYS} Days (1 Year)`,
    isPaidPlanExpired: false,
    isExpiringToday: validity.isExpiringToday,
    isLifetimeFree: false,
    purchasedDateIso: validity.purchaseDateIst,
    purchasedDisplay: validity.purchaseDateDisplay,
    expiryDateIso: validity.expiryDateIst,
    expiryDisplay: validity.expiryDateIst
      ? `${validity.expiryDateDisplay} (${validity.expiryDateIst})`
      : 'Active (365 Days)',
    daysRemaining: daysRem,
    daysRemainingDisplay: validity.isExpiringToday
      ? 'Expires Today (Active until 11:59 PM IST)'
      : `${daysRem} ${daysRem === 1 ? 'Day' : 'Days'} Remaining`,
    statusLabel: validity.isExpiringToday ? 'EXPIRING TODAY' : 'ACTIVE',
    activatedClassLevel: activatedClass
  };
}

/**
 * Checks whether a specific Subject is unlocked for the user's current plan and registered class.
 * - Strict One-Class Rule: Users can only access subjects for their registered class (`student.classLevel`).
 * - Free Plan: ONLY English and Mathematics
 * - Premium Plan (₹99): All Subjects for the user's registered class
 */
export function canAccessSubject(
  student: StudentProfile | null | undefined,
  subject: SubjectName,
  targetClassLevel?: ClassLevel
): { allowed: boolean; requiredPlan: 'basic' | 'premium'; reason?: string } {
  if (student && targetClassLevel && targetClassLevel !== student.classLevel) {
    return {
      allowed: false,
      requiredPlan: 'premium',
      reason: `Your account is permanently registered for Standard ${formatStandardOrdinal(student.classLevel)} (${student.classLevel}) only. Access to ${targetClassLevel} is restricted.`
    };
  }

  const { effectivePlan } = getStudentPlanInfo(student);

  if (effectivePlan === 'premium' || effectivePlan === 'basic') {
    const activatedClass = student?.activatedClassLevel || student?.classLevel;
    if (!student || activatedClass === student.classLevel) {
      return { allowed: true, requiredPlan: 'premium' };
    }
  }

  // Free Plan: Only English and Mathematics
  if (FREE_ALLOWED_SUBJECTS.includes(subject)) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    reason: `${subject} is locked on the Free Plan. Upgrade to the Premium Plan (₹99 – 365 Days / 1 Year) to unlock all subjects and worksheets for your class!`
  };
}

/**
 * Checks whether a dashboard tab/feature is accessible for the student/teacher's current plan.
 */
export function canAccessFeature(
  student: StudentProfile | null | undefined,
  featureTab: string
): {
  allowed: boolean;
  requiredPlan: 'basic' | 'premium';
  featureTitle: string;
  upgradeMessage: string;
} {
  const { effectivePlan } = getStudentPlanInfo(student);

  // In Teacher Portal, teachers can explore their class curriculum features while worksheet lock rules still strictly apply
  const isTeacher = student?.accountRole === 'teacher';

  if (
    featureTab === 'dashboard' ||
    featureTab === 'profile' ||
    featureTab === 'demo' ||
    featureTab === 'puzzles' ||
    featureTab === 'sudoku' ||
    featureTab === 'quizzes' ||
    featureTab === 'worksheets' ||
    featureTab === 'referrals' ||
    isTeacher
  ) {
    return {
      allowed: true,
      requiredPlan: 'premium',
      featureTitle: 'Core Feature',
      upgradeMessage: ''
    };
  }

  // Premium Plan (₹99) Features for Students:
  const premiumTitleMap: Record<string, string> = {
    shivaji: 'Chhatrapati Shivaji Maharaj 50 Audio Stories',
    stories: 'Story World (45 Audio Stories)',
    drawing: 'Drawing Champions Studio',
    cricket: 'Cricket Champions Daily Quiz Arena',
    scholarship: 'Maharashtra MSCE Scholarship Arena',
    'future-skills': 'AI Learning Academy & Future Skills',
    'ai-academy': 'AI Learning Academy (8 Modules, 24 Lessons)',
    certificates: 'Champion Certificates & Trophies',
    leaderboard: 'National Champion Leaderboard',
    referrals: 'Learn • Share • Grow • Earn Ambassador Hub'
  };
  const featureTitle = premiumTitleMap[featureTab] || 'Premium Dashboard Feature';

  if (effectivePlan === 'premium' || effectivePlan === 'basic') {
    return {
      allowed: true,
      requiredPlan: 'premium',
      featureTitle,
      upgradeMessage: ''
    };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    featureTitle,
    upgradeMessage: `${featureTitle} is unlocked with the Premium Plan (₹99 – 365 Days / 1 Year), which gives you complete access to all subjects and worksheets for your class!`
  };
}

export function parseClassLevelFromWorksheetId(worksheetId: string): ClassLevel | null {
  const match = /^WS-C(\d{1,2})-/i.exec(String(worksheetId || '').trim());
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num >= 1 && num <= 10) {
    return `Class ${num}` as ClassLevel;
  }
  return null;
}

/**
 * Checks whether a worksheet ID is one of the strictly 2 designated Free Demo Worksheets
 * for a given class (1 English worksheet + 1 Mathematics worksheet).
 */
export function isFreeDemoWorksheet(worksheetId: string, classLevel?: ClassLevel): boolean {
  const targetClass = classLevel || parseClassLevelFromWorksheetId(worksheetId) || 'Class 1';
  const allowedDemos = getFreeDemoWorksheetIdsForClass(targetClass);
  return allowedDemos.includes(worksheetId);
}

/**
 * Checks whether a student or teacher has access to a specific worksheet across Standards 1st to 10th.
 * STRICT CLASS-WISE ACCESS RULES:
 * 1. Each account has ONLY ONE active registered class (`student.classLevel`).
 * 2. Worksheets belonging to ANY OTHER CLASS (`worksheetClass !== student.classLevel`) are STRICTLY LOCKED
 *    for both Free and ₹99 Premium users! (e.g., Standard 5th ₹99 Premium unlocks ONLY Standard 5th worksheets,
 *    and keeps Standards 1st, 2nd, 3rd, 4th, 6th, 7th, 8th, 9th, and 10th locked).
 * 3. Within the user's registered class (`worksheetClass === student.classLevel`):
 *    - Free Plan users: ONLY 2 Demo Worksheets (1 English worksheet + 1 Mathematics worksheet) are unlocked.
 *      All other worksheets in their class are locked with "Unlock All Worksheets for Your Class – Only ₹99!".
 *    - Verified ₹99 Premium Plan users (activated for their class): ALL worksheets and all subjects for their
 *      selected class are unlocked!
 */
export function canAccessWorksheet(
  student: StudentProfile | null | undefined,
  worksheetId: string,
  worksheetClassLevel?: ClassLevel
): {
  allowed: boolean;
  isDemo: boolean;
  isOtherClassLocked?: boolean;
  userClassLevel: ClassLevel;
  worksheetClassLevel: ClassLevel;
  effectivePlan: 'free' | 'premium';
  requiredPlan: 'premium';
  upgradeMessage: string;
  reason?: string;
} {
  const { effectivePlan } = getStudentPlanInfo(student);
  const userClass: ClassLevel = student?.classLevel || 'Class 1';
  const activatedClass: ClassLevel = student?.activatedClassLevel || userClass;
  const wsClass: ClassLevel =
    worksheetClassLevel || parseClassLevelFromWorksheetId(worksheetId) || userClass;

  // Rule 1: Strict Class-Wise Restriction — Never allow access to another class's worksheets!
  if (wsClass !== userClass) {
    const msg = `Class-Wise Restriction: Your account is permanently registered for Standard ${formatStandardOrdinal(userClass)} (${userClass}). Worksheets for Standard ${formatStandardOrdinal(wsClass)} (${wsClass}) are locked.`;
    return {
      allowed: false,
      isDemo: false,
      isOtherClassLocked: true,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: effectivePlan === 'premium' || effectivePlan === 'basic' ? 'premium' : 'free',
      requiredPlan: 'premium',
      upgradeMessage: msg,
      reason: msg
    };
  }

  const isDemo = isFreeDemoWorksheet(worksheetId, userClass);
  const isPremiumForUserClass =
    (effectivePlan === 'premium' || effectivePlan === 'basic') && activatedClass === userClass;

  // Rule 2: Verified ₹99 Premium Plan for the user's selected class -> Unlock ALL worksheets for this class
  if (isPremiumForUserClass) {
    return {
      allowed: true,
      isDemo,
      isOtherClassLocked: false,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'premium',
      requiredPlan: 'premium',
      upgradeMessage: '',
      reason: ''
    };
  }

  // Rule 3: Free Plan -> Unlock ONLY the 2 Demo Worksheets (1 English + 1 Mathematics) for the user's class
  if (isDemo) {
    return {
      allowed: true,
      isDemo: true,
      isOtherClassLocked: false,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: '',
      reason: ''
    };
  }

  // Rule 4: All other worksheets in the user's class are locked until ₹99 Premium payment
  return {
    allowed: false,
    isDemo: false,
    isOtherClassLocked: false,
    userClassLevel: userClass,
    worksheetClassLevel: wsClass,
    effectivePlan: 'free',
    requiredPlan: 'premium',
    upgradeMessage: WORKSHEET_CLASS_LOCK_MESSAGE,
    reason: WORKSHEET_CLASS_LOCK_MESSAGE
  };
}

