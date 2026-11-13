import {
  ClassLevel,
  ClassSubscriptionRecord,
  StudentProfile,
  SubjectName,
} from '../types';
import {
  evaluateSubscriptionValidity,
  formatDateIstDisplay,
  PAID_SUBSCRIPTION_VALIDITY_DAYS,
} from './subscriptionDateUtils';

export type SubscriptionPlanId = 'free' | 'basic' | 'premium';

export const ALL_CLASS_LEVELS: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export const FREE_ALLOWED_SUBJECTS: SubjectName[] = [
  'English',
  'Mathematics',
  'Mathematics – Algebra',
  'Mathematics – Geometry',
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

export function normalizeClassLevelValue(raw?: string | null): ClassLevel | null {
  const str = String(raw || '').trim();
  const match = /^(?:Class\s*)?(\d{1,2})(?:st|nd|rd|th)?$/i.exec(str);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num >= 1 && num <= 10) {
    return `Class ${num}` as ClassLevel;
  }
  return null;
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
  'WS-C1-MATHEMATICS-1',
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
    summary:
      '2 Free Demo Worksheets (1 English & 1 Mathematics for your registered class), Brain Puzzles, Sudoku (4×4, 6×6, 9×9), English & Mathematics Quizzes',
  },
  {
    id: 'premium' as const,
    title: 'PREMIUM PLAN',
    fullLabel: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
    priceInr: 99,
    priceText: '₹99',
    validityText: '365 Days (1 Year)',
    validitySubtext: '1 Year (365 Days) Validity (Per Selected Class)',
    summary:
      'Complete Class-Wise Unlock: All Worksheets & All Subjects for Your Selected Class, 4 Quiz Levels, Stories with Audio, Drawing, Cricket, Scholarship, AI Academy, Certificates & Referrals',
  },
];

export type ClassSubscriptionStatusType =
  | 'ACTIVE_PAID'
  | 'ACTIVE_FREE'
  | 'EXPIRED'
  | 'LOCKED';

export interface ClassSubscriptionInfo {
  classLevel: ClassLevel;
  status: ClassSubscriptionStatusType;
  isPaidActive: boolean;
  isFreeBase: boolean;
  isExpired: boolean;
  isLocked: boolean;
  isAccessible: boolean;
  isExpiringToday: boolean;
  purchasedAt?: string;
  purchasedDateIso?: string | null;
  purchasedDisplay: string;
  expiresAt?: string;
  expiryDateIso?: string | null;
  expiryDisplay: string;
  daysRemaining: number | null;
  daysRemainingDisplay: string;
  paymentId?: string;
  orderId?: string;
}

/**
 * Returns the raw stored ClassSubscriptionRecord map for a student, backfilling
 * legacy single-class paid accounts (`plan !== 'free'`) without modifying storage.
 */
export function getRawClassSubscriptionsMap(
  student: StudentProfile | null | undefined
): Partial<Record<ClassLevel, ClassSubscriptionRecord>> {
  if (!student) return {};
  const map: Partial<Record<ClassLevel, ClassSubscriptionRecord>> = {};

  if (student.classSubscriptions && typeof student.classSubscriptions === 'object') {
    for (const [key, rawRec] of Object.entries(student.classSubscriptions)) {
      const cls = normalizeClassLevelValue(rawRec?.classLevel || key);
      if (!cls || !rawRec) continue;
      map[cls] = {
        ...rawRec,
        classLevel: cls,
        plan: rawRec.plan === 'basic' || rawRec.plan === 'premium' ? rawRec.plan : 'free',
        status: rawRec.status || 'LOCKED',
      };
    }
  }

  // Backward compatibility: legacy single-class paid users without `classSubscriptions` map
  if (student.plan && student.plan !== 'free') {
    const legacyClass =
      normalizeClassLevelValue(student.activatedClassLevel) ||
      normalizeClassLevelValue(student.classLevel) ||
      'Class 1';
    if (!map[legacyClass]) {
      map[legacyClass] = {
        classLevel: legacyClass,
        plan: student.plan,
        status: 'ACTIVE',
        purchasedAt: student.planPurchasedAt,
        expiresAt: student.planExpiresAt,
        paymentId: student.lastPaymentId,
        orderId: student.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
      };
    }
  }

  return map;
}

export function getPrimaryBaseClass(student: StudentProfile | null | undefined): ClassLevel {
  if (!student) return 'Class 1';
  return (
    normalizeClassLevelValue(student.primaryClassLevel) ||
    normalizeClassLevelValue(student.classLevel) ||
    'Class 1'
  );
}

/**
 * Computes detailed live subscription info for ONE specific class on a student/teacher account.
 */
export function getClassSubscriptionInfo(
  student: StudentProfile | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo {
  const normalizedTarget = normalizeClassLevelValue(targetClass) || 'Class 1';
  if (!student) {
    return {
      classLevel: normalizedTarget,
      status: 'LOCKED',
      isPaidActive: false,
      isFreeBase: false,
      isExpired: false,
      isLocked: true,
      isAccessible: false,
      isExpiringToday: false,
      purchasedDisplay: '—',
      expiryDisplay: 'Not Activated',
      daysRemaining: null,
      daysRemainingDisplay: 'Locked (₹99 / 365 Days)',
    };
  }

  const rawMap = getRawClassSubscriptionsMap(student);
  const record = rawMap[normalizedTarget];
  const baseFreeClass = getPrimaryBaseClass(student);

  if (record && (record.plan === 'premium' || record.plan === 'basic')) {
    const validity = evaluateSubscriptionValidity(
      record.plan,
      record.purchasedAt,
      record.expiresAt,
      referenceNow
    );

    if (validity.isExpired) {
      return {
        classLevel: normalizedTarget,
        status: 'EXPIRED',
        isPaidActive: false,
        isFreeBase: normalizedTarget === baseFreeClass,
        isExpired: true,
        isLocked: true,
        isAccessible: false,
        isExpiringToday: false,
        purchasedAt: record.purchasedAt,
        purchasedDateIso: validity.purchaseDateIst,
        purchasedDisplay: validity.purchaseDateDisplay,
        expiresAt: record.expiresAt,
        expiryDateIso: validity.expiryDateIst,
        expiryDisplay: `Expired on ${validity.expiryDateDisplay} (${validity.expiryDateIst || record.expiresAt})`,
        daysRemaining: 0,
        daysRemainingDisplay: 'Expired (Renew ₹99)',
        paymentId: record.paymentId,
        orderId: record.orderId,
      };
    }

    const daysRem = validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;
    return {
      classLevel: normalizedTarget,
      status: 'ACTIVE_PAID',
      isPaidActive: true,
      isFreeBase: normalizedTarget === baseFreeClass,
      isExpired: false,
      isLocked: false,
      isAccessible: true,
      isExpiringToday: validity.isExpiringToday,
      purchasedAt: record.purchasedAt,
      purchasedDateIso: validity.purchaseDateIst,
      purchasedDisplay: validity.purchaseDateDisplay,
      expiresAt: record.expiresAt,
      expiryDateIso: validity.expiryDateIst,
      expiryDisplay: validity.expiryDateIst
        ? `${validity.expiryDateDisplay} (${validity.expiryDateIst})`
        : 'Active (365 Days)',
      daysRemaining: daysRem,
      daysRemainingDisplay: validity.isExpiringToday
        ? 'Expires Today (11:59 PM IST)'
        : `${daysRem} ${daysRem === 1 ? 'Day' : 'Days'} Left`,
      paymentId: record.paymentId,
      orderId: record.orderId,
    };
  }

  // User's original Free registered base class stays active on Free Plan (Lifetime)
  if (normalizedTarget === baseFreeClass) {
    return {
      classLevel: normalizedTarget,
      status: 'ACTIVE_FREE',
      isPaidActive: false,
      isFreeBase: true,
      isExpired: false,
      isLocked: false,
      isAccessible: true,
      isExpiringToday: false,
      purchasedDateIso: student.registeredAt ? formatDateIstDisplay(student.registeredAt) : null,
      purchasedDisplay: 'Free Plan (Registered)',
      expiryDateIso: null,
      expiryDisplay: 'Lifetime Free Demo',
      daysRemaining: null,
      daysRemainingDisplay: 'Free Plan (2 Demo Worksheets)',
    };
  }

  return {
    classLevel: normalizedTarget,
    status: 'LOCKED',
    isPaidActive: false,
    isFreeBase: false,
    isExpired: false,
    isLocked: true,
    isAccessible: false,
    isExpiringToday: false,
    purchasedDisplay: 'Not Purchased',
    expiryDisplay: 'Locked',
    daysRemaining: null,
    daysRemainingDisplay: 'Locked • Unlock ₹99 (365d)',
  };
}

export function normalizeClassSubscriptions(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): Record<ClassLevel, ClassSubscriptionInfo> {
  const result = {} as Record<ClassLevel, ClassSubscriptionInfo>;
  for (const cls of ALL_CLASS_LEVELS) {
    result[cls] = getClassSubscriptionInfo(student, cls, referenceNow);
  }
  return result;
}

export function getActivatedClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo[] {
  if (!student) return [];
  return ALL_CLASS_LEVELS.map((cls) =>
    getClassSubscriptionInfo(student, cls, referenceNow)
  ).filter((info) => info.isPaidActive);
}

export function getAccessibleClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo[] {
  if (!student) return [];
  return ALL_CLASS_LEVELS.map((cls) =>
    getClassSubscriptionInfo(student, cls, referenceNow)
  ).filter((info) => info.isAccessible);
}

export function canSwitchToClass(
  student: StudentProfile | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number
): {
  allowed: boolean;
  status: ClassSubscriptionStatusType;
  needsPurchase: boolean;
  needsRenewal: boolean;
  reason: string;
} {
  const normalizedTarget = normalizeClassLevelValue(targetClass) || 'Class 1';
  if (!student) {
    return {
      allowed: false,
      status: 'LOCKED',
      needsPurchase: true,
      needsRenewal: false,
      reason: 'Please sign in or register first to access classes.',
    };
  }

  const info = getClassSubscriptionInfo(student, normalizedTarget, referenceNow);
  if (info.isPaidActive) {
    return {
      allowed: true,
      status: 'ACTIVE_PAID',
      needsPurchase: false,
      needsRenewal: false,
      reason: '',
    };
  }

  if (info.isFreeBase && !info.isExpired) {
    return {
      allowed: true,
      status: 'ACTIVE_FREE',
      needsPurchase: false,
      needsRenewal: false,
      reason: '',
    };
  }

  if (info.isExpired) {
    return {
      allowed: false,
      status: 'EXPIRED',
      needsPurchase: false,
      needsRenewal: true,
      reason: `Your subscription for ${normalizedTarget} expired (${info.expiryDisplay}). Renew for ₹99 (365 Days) to unlock ${normalizedTarget} again!`,
    };
  }

  return {
    allowed: false,
    status: 'LOCKED',
    needsPurchase: true,
    needsRenewal: false,
    reason: `${normalizedTarget} is currently locked on your account. Activate ${normalizedTarget} for ₹99 (365 Days / 1 Year) to unlock all worksheets, quizzes, and subjects for ${normalizedTarget}!`,
  };
}

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
  activatedClasses?: ClassLevel[];
}

/**
 * Computes the effective active subscription plan for a student or teacher
 * (defaults to `student.classLevel`, or evaluates `classLevelOverride` when specified)
 * using the unified IST (Asia/Kolkata) subscription validity engine.
 */
export function getStudentPlanInfo(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number,
  classLevelOverride?: ClassLevel
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
      statusLabel: 'ACTIVE',
      activatedClasses: [],
    };
  }

  const targetClass =
    normalizeClassLevelValue(classLevelOverride) ||
    normalizeClassLevelValue(student.classLevel) ||
    'Class 1';

  const activePaidList = getActivatedClassesList(student, referenceNow).map(
    (item) => item.classLevel
  );
  const classInfo = getClassSubscriptionInfo(student, targetClass, referenceNow);

  if (classInfo.status === 'ACTIVE_PAID') {
    const daysRem = classInfo.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;
    return {
      effectivePlan: 'premium',
      storedPlan: 'premium',
      planDisplayName: `PREMIUM PLAN – ₹99 – 365 Days (${targetClass})`,
      planFullHeader: `PREMIUM PLAN – ₹99 – 365 Days (Standard ${formatStandardOrdinal(targetClass)})`,
      planShortBadge: classInfo.isExpiringToday
        ? `Premium (Expires Today • ${targetClass})`
        : `Premium Plan (₹99 • ${targetClass})`,
      priceLabel: '₹99',
      validityPeriodLabel: `${PAID_SUBSCRIPTION_VALIDITY_DAYS} Days (1 Year)`,
      isPaidPlanExpired: false,
      isExpiringToday: classInfo.isExpiringToday,
      isLifetimeFree: false,
      purchasedDateIso: classInfo.purchasedDateIso,
      purchasedDisplay: classInfo.purchasedDisplay,
      expiryDateIso: classInfo.expiryDateIso,
      expiryDisplay: classInfo.expiryDisplay,
      daysRemaining: daysRem,
      daysRemainingDisplay: classInfo.isExpiringToday
        ? 'Expires Today (Active until 11:59 PM IST)'
        : `${daysRem} ${daysRem === 1 ? 'Day' : 'Days'} Remaining`,
      statusLabel: classInfo.isExpiringToday ? 'EXPIRING TODAY' : 'ACTIVE',
      activatedClassLevel: targetClass,
      activatedClasses: activePaidList,
    };
  }

  if (classInfo.status === 'EXPIRED') {
    const expiredPlanName = `PREMIUM PLAN (₹99 – 365 Days • ${targetClass})`;
    return {
      effectivePlan: 'free',
      storedPlan: 'premium',
      planDisplayName: `EXPIRED (${targetClass}) — Renew ₹99`,
      planFullHeader: `${expiredPlanName} Expired`,
      planShortBadge: `Expired • Renew ${targetClass} (₹99)`,
      priceLabel: '₹0 (Expired)',
      validityPeriodLabel: `${targetClass} Premium Expired`,
      isPaidPlanExpired: true,
      isExpiringToday: false,
      expiredPlanName,
      isLifetimeFree: classInfo.isFreeBase,
      purchasedDateIso: classInfo.purchasedDateIso,
      purchasedDisplay: classInfo.purchasedDisplay,
      expiryDateIso: classInfo.expiryDateIso,
      expiryDisplay: `${classInfo.expiryDisplay} • Renew ₹99`,
      daysRemaining: 0,
      daysRemainingDisplay: '0 Days Remaining (Expired • Renew ₹99)',
      statusLabel: 'EXPIRED',
      activatedClassLevel: targetClass,
      activatedClasses: activePaidList,
    };
  }

  // Free Plan or Locked Class
  return {
    effectivePlan: 'free',
    storedPlan: activePaidList.length > 0 ? 'premium' : 'free',
    planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
    planFullHeader: 'FREE PLAN – ₹0 – Lifetime',
    planShortBadge:
      classInfo.status === 'LOCKED'
        ? `${targetClass} Locked (Unlock ₹99)`
        : 'Free Plan (Lifetime)',
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
    activatedClassLevel: targetClass,
    activatedClasses: activePaidList,
  };
}

/**
 * Checks whether a specific Subject is unlocked for the user's selected class.
 * - Multi-Class Rule: Access is strictly scoped to unlocked/activated classes.
 *   Unpaid or expired additional classes are strictly locked.
 * - Active Paid Class (₹99): All Subjects for that class unlocked.
 * - Base Free Class: ONLY English and Mathematics unlocked.
 */
export function canAccessSubject(
  student: StudentProfile | null | undefined,
  subject: SubjectName,
  targetClassLevel?: ClassLevel,
  referenceNow?: Date | string | number
): { allowed: boolean; requiredPlan: 'basic' | 'premium'; reason?: string } {
  if (!student) {
    if (FREE_ALLOWED_SUBJECTS.includes(subject)) {
      return { allowed: true, requiredPlan: 'premium' };
    }
    return {
      allowed: false,
      requiredPlan: 'premium',
      reason: `${subject} is locked. Register or sign in and activate the ₹99 Premium Plan to unlock all subjects.`,
    };
  }

  const resolvedClass =
    normalizeClassLevelValue(targetClassLevel) ||
    normalizeClassLevelValue(student.classLevel) ||
    'Class 1';

  const classInfo = getClassSubscriptionInfo(student, resolvedClass, referenceNow);

  if (classInfo.isPaidActive) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  if (classInfo.status === 'LOCKED') {
    return {
      allowed: false,
      requiredPlan: 'premium',
      reason: `${resolvedClass} is not unlocked on your account. Purchase the ₹99 (365 Days) subscription for ${resolvedClass} to unlock all subjects and worksheets!`,
    };
  }

  if (classInfo.status === 'EXPIRED') {
    // If expired class also has another active class (or expired paid access), lock paid subjects;
    // base class fallback still allows Free English/Math only if no other paid classes exist or as base demo
    const hasOtherActiveClass = getActivatedClassesList(student, referenceNow).length > 0;
    if (hasOtherActiveClass || !classInfo.isFreeBase) {
      return {
        allowed: false,
        requiredPlan: 'premium',
        reason: `Your subscription for ${resolvedClass} has expired. Renew ${resolvedClass} for ₹99 (365 Days) to restore access!`,
      };
    }
  }

  // Base Free Plan: Only English and Mathematics
  if (FREE_ALLOWED_SUBJECTS.includes(subject)) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    reason: `${subject} is locked on the Free Plan for ${resolvedClass}. Upgrade ${resolvedClass} to the Premium Plan (₹99 – 365 Days / 1 Year) to unlock all subjects and worksheets!`,
  };
}

/**
 * Checks whether a dashboard tab/feature is accessible for the student/teacher's current active class.
 */
export function canAccessFeature(
  student: StudentProfile | null | undefined,
  featureTab: string,
  referenceNow?: Date | string | number
): {
  allowed: boolean;
  requiredPlan: 'basic' | 'premium';
  featureTitle: string;
  upgradeMessage: string;
} {
  const { effectivePlan } = getStudentPlanInfo(student, referenceNow);
  const activeClassesCount = getActivatedClassesList(student, referenceNow).length;

  // Teachers can explore curriculum features for their active registered/activated class,
  // while strict ₹99 class-wise gates still govern worksheets & multi-class unlocks.
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
      upgradeMessage: '',
    };
  }

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
    referrals: 'Learn • Share • Grow • Earn Ambassador Hub',
  };
  const featureTitle = premiumTitleMap[featureTab] || 'Premium Dashboard Feature';

  if (effectivePlan === 'premium' || effectivePlan === 'basic' || activeClassesCount > 0) {
    return {
      allowed: true,
      requiredPlan: 'premium',
      featureTitle,
      upgradeMessage: '',
    };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    featureTitle,
    upgradeMessage: `${featureTitle} is unlocked with the Premium Plan (₹99 – 365 Days / 1 Year), which gives you complete access to all subjects and worksheets for your selected class!`,
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
 * STRICT MULTI-CLASS ACCESS RULES:
 * 1. If `wsClass` has an ACTIVE unexpired paid ₹99 subscription on this account -> ALL worksheets for `wsClass` unlocked!
 * 2. If `wsClass` is EXPIRED -> strictly locked until renewed (unless it is the user's sole Free fallback base class, where only 2 Demo Worksheets remain).
 * 3. If `wsClass` is the user's Free registered base class (`primaryClassLevel`) -> ONLY the 2 Demo Worksheets (1 English + 1 Mathematics) are unlocked.
 * 4. If `wsClass` is ANY OTHER UNPURCHASED CLASS -> STRICTLY LOCKED (cannot access even Demo Worksheets of unpaid classes without purchasing/activating that class for ₹99!).
 */
export function canAccessWorksheet(
  student: StudentProfile | null | undefined,
  worksheetId: string,
  worksheetClassLevel?: ClassLevel,
  referenceNow?: Date | string | number
): {
  allowed: boolean;
  isDemo: boolean;
  isOtherClassLocked?: boolean;
  isClassExpired?: boolean;
  userClassLevel: ClassLevel;
  worksheetClassLevel: ClassLevel;
  effectivePlan: 'free' | 'premium';
  requiredPlan: 'premium';
  upgradeMessage: string;
  reason?: string;
} {
  const userClass: ClassLevel = normalizeClassLevelValue(student?.classLevel) || 'Class 1';
  const wsClass: ClassLevel =
    normalizeClassLevelValue(worksheetClassLevel) ||
    parseClassLevelFromWorksheetId(worksheetId) ||
    userClass;

  const wsClassInfo = getClassSubscriptionInfo(student, wsClass, referenceNow);
  const isDemo = isFreeDemoWorksheet(worksheetId, wsClass);

  // Rule 1: Active Paid Subscription specifically for wsClass -> Unlock ALL worksheets for wsClass!
  if (wsClassInfo.isPaidActive) {
    return {
      allowed: true,
      isDemo,
      isOtherClassLocked: false,
      isClassExpired: false,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'premium',
      requiredPlan: 'premium',
      upgradeMessage: '',
      reason: '',
    };
  }

  // Rule 2: Expired Paid Class -> Lock paid worksheets (and if not sole free base, lock entire class until renewal!)
  if (wsClassInfo.status === 'EXPIRED') {
    const hasOtherActivePaid = getActivatedClassesList(student, referenceNow).length > 0;
    if (!hasOtherActivePaid && wsClassInfo.isFreeBase && isDemo) {
      return {
        allowed: true,
        isDemo: true,
        isOtherClassLocked: false,
        isClassExpired: true,
        userClassLevel: userClass,
        worksheetClassLevel: wsClass,
        effectivePlan: 'free',
        requiredPlan: 'premium',
        upgradeMessage: '',
        reason: '',
      };
    }

    const msg = `Subscription Expired: Your 1-year subscription for ${wsClass} has expired. Renew ${wsClass} for ₹99 (365 Days) to restore all worksheets!`;
    return {
      allowed: false,
      isDemo: false,
      isOtherClassLocked: wsClass !== userClass,
      isClassExpired: true,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: msg,
      reason: msg,
    };
  }

  // Rule 3: Unpaid Additional Class (`LOCKED`) -> Strictly locked until ₹99 paid verification
  if (wsClassInfo.status === 'LOCKED') {
    const msg = `Class Locked: Purchase & activate Standard ${formatStandardOrdinal(wsClass)} (${wsClass}) for ₹99 (365 Days) to unlock all worksheets for ${wsClass}!`;
    return {
      allowed: false,
      isDemo: false,
      isOtherClassLocked: true,
      isClassExpired: false,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: msg,
      reason: msg,
    };
  }

  // Rule 4: User's Free Registered Base Class (`ACTIVE_FREE`) -> ONLY 2 Demo Worksheets
  if (isDemo) {
    return {
      allowed: true,
      isDemo: true,
      isOtherClassLocked: false,
      isClassExpired: false,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: '',
      reason: '',
    };
  }

  return {
    allowed: false,
    isDemo: false,
    isOtherClassLocked: false,
    isClassExpired: false,
    userClassLevel: userClass,
    worksheetClassLevel: wsClass,
    effectivePlan: 'free',
    requiredPlan: 'premium',
    upgradeMessage: WORKSHEET_CLASS_LOCK_MESSAGE,
    reason: WORKSHEET_CLASS_LOCK_MESSAGE,
  };
}


