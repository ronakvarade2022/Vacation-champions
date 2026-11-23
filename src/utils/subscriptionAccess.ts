import {
  BoardClassKey,
  CategoryId,
  CategorySubscriptionRecord,
  ClassLevel,
  ClassSubscriptionRecord,
  EducationBoard,
  PlanSkuId,
  StudentProfile,
  SubjectName,
} from '../types';
import {
  ALL_CATEGORY_IDS,
  formatCategoryShortLabel,
  getDefaultPlanSkuForCategory,
} from '../data/planCatalog';
import {
  evaluateSubscriptionValidity,
  formatDateIstDisplay,
  PAID_SUBSCRIPTION_VALIDITY_DAYS,
} from './subscriptionDateUtils';

export type SubscriptionPlanId = 'free' | 'basic' | 'premium';

export const ALL_BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];

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
  | 'study-material'
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

export function normalizeBoardValue(raw?: string | null): EducationBoard {
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

export function getBoardDisplayName(board?: EducationBoard | string | null): string {
  const b = normalizeBoardValue(board);
  if (b === 'CBSE') return 'CBSE Board (NCERT)';
  if (b === 'ICSE') return 'ICSE Board (CISCE)';
  return 'Maharashtra State Board';
}

export function getBoardShortLabel(board?: EducationBoard | string | null): string {
  const b = normalizeBoardValue(board);
  if (b === 'CBSE') return 'CBSE';
  if (b === 'ICSE') return 'ICSE';
  return 'Maharashtra';
}

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

export function buildBoardClassKey(
  board?: EducationBoard | string | null,
  classLevel?: ClassLevel | string | null
): BoardClassKey {
  const b = normalizeBoardValue(board);
  const c = normalizeClassLevelValue(classLevel) || 'Class 1';
  return `${b}__${c}`;
}

export function parseBoardClassKey(
  rawKey?: string | null
): { board: EducationBoard; classLevel: ClassLevel } | null {
  const str = String(rawKey || '').trim();
  if (!str) return null;
  if (str.includes('__')) {
    const [bRaw, cRaw] = str.split('__');
    const cls = normalizeClassLevelValue(cRaw);
    if (!cls) return null;
    return { board: normalizeBoardValue(bRaw), classLevel: cls };
  }
  const cls = normalizeClassLevelValue(str);
  if (!cls) return null;
  return { board: 'Maharashtra', classLevel: cls };
}

export function getPremiumActivatedBannerMessage(
  classLevel?: ClassLevel | string | null,
  board?: EducationBoard | string | null
): string {
  const boardPrefix = board ? `${getBoardShortLabel(board)} • ` : '';
  return `Your Premium Access is Activated for ${boardPrefix}Standard ${formatStandardOrdinal(classLevel)}. Enjoy All Worksheets & Study Materials for Your Class!`;
}

export const WORKSHEET_CLASS_LOCK_MESSAGE =
  'Unlock All Worksheets for Your Class – Only ₹99!';

export const WORKSHEET_PREMIUM_UPGRADE_MESSAGE = WORKSHEET_CLASS_LOCK_MESSAGE;

export function getFreeDemoWorksheetIdsForClass(
  classLevel: ClassLevel = 'Class 1',
  board: EducationBoard = 'Maharashtra'
): readonly [string, string] {
  const b = normalizeBoardValue(board);
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  if (b === 'CBSE') {
    return [`WS-CBSE-C${cNum}-ENGLISH-1`, `WS-CBSE-C${cNum}-MATHEMATICS-1`] as const;
  }
  if (b === 'ICSE') {
    return [`WS-ICSE-C${cNum}-ENGLISH-1`, `WS-ICSE-C${cNum}-MATHEMATICS-1`] as const;
  }
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
      '2 Free Demo Worksheets (1 English & 1 Mathematics for your registered Board & Class), Brain Puzzles, Sudoku (4×4, 6×6, 9×9), English & Mathematics Quizzes + Sample Notes',
  },
  {
    id: 'premium' as const,
    title: 'PREMIUM PLAN',
    fullLabel: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
    priceInr: 99,
    priceText: '₹99',
    validityText: '365 Days (1 Year)',
    validitySubtext: '1 Year (365 Days) Validity (Per Selected Board & Class)',
    summary:
      'Complete Board & Class-Wise Unlock (Maharashtra / CBSE / ICSE): All Worksheets, Study Materials, Chapter Notes & All Subjects for Your Selected Board & Class, 4 Quiz Levels, Stories with Audio, Drawing, Cricket, Scholarship, AI Academy, Certificates & Referrals',
  },
];

export type ClassSubscriptionStatusType =
  | 'ACTIVE_PAID'
  | 'ACTIVE_FREE'
  | 'EXPIRED'
  | 'LOCKED';

export interface ClassSubscriptionInfo {
  board: EducationBoard;
  boardClassKey: BoardClassKey;
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

export function getPrimaryBaseBoard(student: StudentProfile | null | undefined): EducationBoard {
  if (!student) return 'Maharashtra';
  return normalizeBoardValue(student.primaryBoard || student.board || 'Maharashtra');
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
 * Returns the raw stored Board+Class subscription map keyed by BoardClassKey (`Board__Class`),
 * safely preserving & backfilling legacy Maharashtra records without altering any existing storage.
 */
export function getRawBoardClassSubscriptionsMap(
  student: StudentProfile | null | undefined
): Partial<Record<BoardClassKey, ClassSubscriptionRecord>> {
  if (!student) return {};
  const map: Partial<Record<BoardClassKey, ClassSubscriptionRecord>> = {};
  const studentDefaultBoard = normalizeBoardValue(student.primaryBoard || student.board || 'Maharashtra');

  if (student.classSubscriptions && typeof student.classSubscriptions === 'object') {
    for (const [rawKey, rawRec] of Object.entries(student.classSubscriptions)) {
      if (!rawRec) continue;
      const parsedFromKey = parseBoardClassKey(rawKey);
      const cls = normalizeClassLevelValue(rawRec.classLevel || parsedFromKey?.classLevel);
      if (!cls) continue;
      const recBoard = rawRec.board
        ? normalizeBoardValue(rawRec.board)
        : rawKey.includes('__')
          ? parsedFromKey?.board || 'Maharashtra'
          : 'Maharashtra';
      const compositeKey = buildBoardClassKey(recBoard, cls);
      map[compositeKey] = {
        ...rawRec,
        board: recBoard,
        classLevel: cls,
        plan: rawRec.plan === 'basic' || rawRec.plan === 'premium' ? rawRec.plan : 'free',
        status: rawRec.status || 'LOCKED',
      };
    }
  }

  const hasCategoryOnlyPurchases = Boolean(
    (student.categorySubscriptions && Object.keys(student.categorySubscriptions).length > 0) ||
      (student.activatedCategoryKeys && student.activatedCategoryKeys.length > 0)
  );

  // Backward compatibility: legacy single-class paid users without `classSubscriptions` map
  // Never assume Class 1 for category-only buyers who lack an explicit activatedClassLevel
  if (
    student.plan &&
    student.plan !== 'free' &&
    (!hasCategoryOnlyPurchases || Boolean(student.activatedClassLevel))
  ) {
    const explicitLegacyClass = normalizeClassLevelValue(student.activatedClassLevel);
    const legacyClass = explicitLegacyClass || (!hasCategoryOnlyPurchases ? normalizeClassLevelValue(student.classLevel) : null);
    if (legacyClass) {
      const legacyBoard = normalizeBoardValue(student.activatedBoard || studentDefaultBoard);
      const legacyKey = buildBoardClassKey(legacyBoard, legacyClass);
      if (!map[legacyKey]) {
        map[legacyKey] = {
          board: legacyBoard,
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
  }

  return map;
}

export function getRawCategorySubscriptionsMap(
  student: StudentProfile | null | undefined
): Partial<Record<CategoryId, CategorySubscriptionRecord>> {
  if (!student) return {};
  const map: Partial<Record<CategoryId, CategorySubscriptionRecord>> = {};

  if (student.categorySubscriptions && typeof student.categorySubscriptions === 'object') {
    for (const [rawKey, rawRec] of Object.entries(student.categorySubscriptions)) {
      if (!rawRec || !ALL_CATEGORY_IDS.includes(rawKey as CategoryId)) continue;
      map[rawKey as CategoryId] = {
        ...rawRec,
        categoryId: rawKey as CategoryId,
      };
    }
  }

  // Option A: Included with Class Purchase
  // Class 4 students who purchase the Class 4 plan (Rs. 99) automatically receive access to Class 4 Scholarship content.
  // Class 7 students who purchase the Class 7 plan (Rs. 99) automatically receive access to Class 7 Scholarship content.
  // Class 4 purchase gives access ONLY to Class 4 Scholarship, and Class 7 purchase gives access ONLY to Class 7 Scholarship.
  const boardClassMap = getRawBoardClassSubscriptionsMap(student);

  // Check for any active Class 4 paid subscription (Maharashtra, CBSE, ICSE)
  const class4Record = Object.values(boardClassMap).find(
    (rec) =>
      rec &&
      rec.classLevel === 'Class 4' &&
      (rec.plan === 'premium' || rec.plan === 'basic') &&
      rec.status !== 'EXPIRED' &&
      !evaluateSubscriptionValidity('premium', rec.purchasedAt, rec.expiresAt).isExpired
  );

  const hasLegacyClass4 =
    !class4Record &&
    student.accountRole !== 'teacher' &&
    student.plan &&
    student.plan !== 'free' &&
    student.classLevel === 'Class 4' &&
    !evaluateSubscriptionValidity(student.plan, student.planPurchasedAt, student.planExpiresAt).isExpired;

  if (class4Record && (!map.scholarship_4th || map.scholarship_4th.status === 'EXPIRED')) {
    map.scholarship_4th = {
      categoryId: 'scholarship_4th',
      planSku: 'BOARD_CLASS',
      status: 'ACTIVE',
      purchasedAt: class4Record.purchasedAt || student.planPurchasedAt || '2026-01-01',
      expiresAt: class4Record.expiresAt || student.planExpiresAt || '2027-01-01',
      paymentId: class4Record.paymentId,
      orderId: class4Record.orderId,
      amountInr: class4Record.amountInr || 99,
      validityDays: class4Record.validityDays || PAID_SUBSCRIPTION_VALIDITY_DAYS,
    };
  } else if (hasLegacyClass4 && (!map.scholarship_4th || map.scholarship_4th.status === 'EXPIRED')) {
    map.scholarship_4th = {
      categoryId: 'scholarship_4th',
      planSku: 'BOARD_CLASS',
      status: 'ACTIVE',
      purchasedAt: student.planPurchasedAt || '2026-01-01',
      expiresAt: student.planExpiresAt || '2027-01-01',
      paymentId: student.lastPaymentId,
      orderId: student.lastOrderId,
      amountInr: 99,
      validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
    };
  }

  // Check for any active Class 7 paid subscription (Maharashtra, CBSE, ICSE)
  const class7Record = Object.values(boardClassMap).find(
    (rec) =>
      rec &&
      rec.classLevel === 'Class 7' &&
      (rec.plan === 'premium' || rec.plan === 'basic') &&
      rec.status !== 'EXPIRED' &&
      !evaluateSubscriptionValidity('premium', rec.purchasedAt, rec.expiresAt).isExpired
  );

  const hasLegacyClass7 =
    !class7Record &&
    student.accountRole !== 'teacher' &&
    student.plan &&
    student.plan !== 'free' &&
    student.classLevel === 'Class 7' &&
    !evaluateSubscriptionValidity(student.plan, student.planPurchasedAt, student.planExpiresAt).isExpired;

  if (class7Record && (!map.scholarship_7th || map.scholarship_7th.status === 'EXPIRED')) {
    map.scholarship_7th = {
      categoryId: 'scholarship_7th',
      planSku: 'BOARD_CLASS',
      status: 'ACTIVE',
      purchasedAt: class7Record.purchasedAt || student.planPurchasedAt || '2026-01-01',
      expiresAt: class7Record.expiresAt || student.planExpiresAt || '2027-01-01',
      paymentId: class7Record.paymentId,
      orderId: class7Record.orderId,
      amountInr: class7Record.amountInr || 99,
      validityDays: class7Record.validityDays || PAID_SUBSCRIPTION_VALIDITY_DAYS,
    };
  } else if (hasLegacyClass7 && (!map.scholarship_7th || map.scholarship_7th.status === 'EXPIRED')) {
    map.scholarship_7th = {
      categoryId: 'scholarship_7th',
      planSku: 'BOARD_CLASS',
      status: 'ACTIVE',
      purchasedAt: student.planPurchasedAt || '2026-01-01',
      expiresAt: student.planExpiresAt || '2027-01-01',
      paymentId: student.lastPaymentId,
      orderId: student.lastOrderId,
      amountInr: 99,
      validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
    };
  }

  return map;
}

export interface CategorySubscriptionInfo {
  categoryId: CategoryId;
  label: string;
  defaultSku: PlanSkuId;
  status: 'ACTIVE_PAID' | 'EXPIRED' | 'LOCKED';
  isPaidActive: boolean;
  isExpired: boolean;
  isLocked: boolean;
  isExpiringToday: boolean;
  planSku?: PlanSkuId;
  purchasedAt?: string;
  purchasedDisplay: string;
  expiresAt?: string;
  expiryDisplay: string;
  daysRemaining: number | null;
  daysRemainingDisplay: string;
}

export function getCategorySubscriptionInfo(
  student: StudentProfile | null | undefined,
  categoryId: CategoryId,
  referenceNow?: Date | string | number
): CategorySubscriptionInfo {
  const label = formatCategoryShortLabel(categoryId);
  const defaultSku = getDefaultPlanSkuForCategory(categoryId);

  if (!student) {
    return {
      categoryId,
      label,
      defaultSku,
      status: 'LOCKED',
      isPaidActive: false,
      isExpired: false,
      isLocked: true,
      isExpiringToday: false,
      purchasedDisplay: 'Not Purchased',
      expiryDisplay: 'Locked',
      daysRemaining: null,
      daysRemainingDisplay: 'Locked • Paid Plan Required',
    };
  }

  const catMap = getRawCategorySubscriptionsMap(student);
  const record = catMap[categoryId];

  if (!record) {
    return {
      categoryId,
      label,
      defaultSku,
      status: 'LOCKED',
      isPaidActive: false,
      isExpired: false,
      isLocked: true,
      isExpiringToday: false,
      purchasedDisplay: 'Not Purchased',
      expiryDisplay: 'Locked',
      daysRemaining: null,
      daysRemainingDisplay: 'Locked • Purchase Plan',
    };
  }

  const validity = evaluateSubscriptionValidity(
    'premium',
    record.purchasedAt,
    record.expiresAt,
    referenceNow
  );

  if (validity.isExpired || record.status === 'EXPIRED') {
    return {
      categoryId,
      label,
      defaultSku,
      status: 'EXPIRED',
      isPaidActive: false,
      isExpired: true,
      isLocked: true,
      isExpiringToday: false,
      planSku: record.planSku,
      purchasedAt: record.purchasedAt,
      purchasedDisplay: validity.purchaseDateDisplay,
      expiresAt: record.expiresAt,
      expiryDisplay: `Expired on ${validity.expiryDateDisplay}`,
      daysRemaining: 0,
      daysRemainingDisplay: 'Expired • Renew Plan',
    };
  }

  const daysRem = validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;
  return {
    categoryId,
    label,
    defaultSku,
    status: 'ACTIVE_PAID',
    isPaidActive: true,
    isExpired: false,
    isLocked: false,
    isExpiringToday: validity.isExpiringToday,
    planSku: record.planSku,
    purchasedAt: record.purchasedAt,
    purchasedDisplay: validity.purchaseDateDisplay,
    expiresAt: record.expiresAt,
    expiryDisplay: validity.expiryDateIst
      ? `${validity.expiryDateDisplay} (${validity.expiryDateIst})`
      : `Active (${record.validityDays || 365} Days)`,
    daysRemaining: daysRem,
    daysRemainingDisplay: validity.isExpiringToday
      ? 'Expires Today (11:59 PM IST)'
      : `${daysRem} ${daysRem === 1 ? 'Day' : 'Days'} Left`,
  };
}

export function hasCategoryAccess(
  student: StudentProfile | null | undefined,
  categoryId: CategoryId,
  referenceNow?: Date | string | number
): boolean {
  return getCategorySubscriptionInfo(student, categoryId, referenceNow).isPaidActive;
}

export function getActivatedCategoriesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): CategorySubscriptionInfo[] {
  if (!student) return [];
  return ALL_CATEGORY_IDS.map((catId) =>
    getCategorySubscriptionInfo(student, catId, referenceNow)
  ).filter((info) => info.isPaidActive);
}

export function getVisibleExamCategoriesForStudent(student: StudentProfile | null | undefined): {
  isTeacher: boolean;
  showAllClasses: boolean;
  showScholarship4th: boolean;
  showScholarship7th: boolean;
  showMahaTet: boolean;
  showCtetP1: boolean;
  showCtetP2: boolean;
} {
  if (!student) {
    // Public browsing showcase before sign-in shows all exam categories (free previews only until purchase)
    return {
      isTeacher: false,
      showAllClasses: true,
      showScholarship4th: true,
      showScholarship7th: true,
      showMahaTet: true,
      showCtetP1: true,
      showCtetP2: true,
    };
  }

  if (student.accountRole === 'teacher') {
    return {
      isTeacher: true,
      showAllClasses: true,
      showScholarship4th: true,
      showScholarship7th: true,
      showMahaTet: true,
      showCtetP1: true,
      showCtetP2: true,
    };
  }

  const cls = normalizeClassLevelValue(student.classLevel);
  return {
    isTeacher: false,
    showAllClasses: false,
    showScholarship4th: cls === 'Class 4' || hasCategoryAccess(student, 'scholarship_4th'),
    showScholarship7th: cls === 'Class 7' || hasCategoryAccess(student, 'scholarship_7th'),
    showMahaTet: hasCategoryAccess(student, 'maha_tet'),
    showCtetP1: hasCategoryAccess(student, 'ctet_paper_1'),
    showCtetP2: hasCategoryAccess(student, 'ctet_paper_2'),
  };
}

/**
 * Legacy helper preserving Maharashtra compatibility when only classLevel is indexed.
 */
export function getRawClassSubscriptionsMap(
  student: StudentProfile | null | undefined,
  board: EducationBoard = 'Maharashtra'
): Partial<Record<ClassLevel, ClassSubscriptionRecord>> {
  const b = normalizeBoardValue(board);
  const fullMap = getRawBoardClassSubscriptionsMap(student);
  const result: Partial<Record<ClassLevel, ClassSubscriptionRecord>> = {};
  for (const cls of ALL_CLASS_LEVELS) {
    const rec = fullMap[buildBoardClassKey(b, cls)];
    if (rec) result[cls] = rec;
  }
  return result;
}

/**
 * Computes detailed live subscription info for ONE specific (Board, Class) pair on an account.
 */
export function getBoardClassSubscriptionInfo(
  student: StudentProfile | null | undefined,
  targetBoard: EducationBoard | string | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo {
  const b = normalizeBoardValue(targetBoard);
  const normalizedTarget = normalizeClassLevelValue(targetClass) || 'Class 1';
  const boardClassKey = buildBoardClassKey(b, normalizedTarget);

  if (!student) {
    return {
      board: b,
      boardClassKey,
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

  const rawMap = getRawBoardClassSubscriptionsMap(student);
  const record = rawMap[boardClassKey];
  const baseFreeBoard = getPrimaryBaseBoard(student);
  const baseFreeClass = getPrimaryBaseClass(student);
  const isBasePair = b === baseFreeBoard && normalizedTarget === baseFreeClass;

  if (record && (record.plan === 'premium' || record.plan === 'basic')) {
    const validity = evaluateSubscriptionValidity(
      record.plan,
      record.purchasedAt,
      record.expiresAt,
      referenceNow
    );

    if (validity.isExpired) {
      return {
        board: b,
        boardClassKey,
        classLevel: normalizedTarget,
        status: 'EXPIRED',
        isPaidActive: false,
        isFreeBase: isBasePair,
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
      board: b,
      boardClassKey,
      classLevel: normalizedTarget,
      status: 'ACTIVE_PAID',
      isPaidActive: true,
      isFreeBase: isBasePair,
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

  // Check if All-Access Bundle ('all_classes') is active for Classes 1–10 across all boards
  const allClassesInfo = getCategorySubscriptionInfo(student, 'all_classes', referenceNow);
  if (allClassesInfo.isPaidActive && (!record || record.plan === 'free')) {
    const daysRem = allClassesInfo.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;
    return {
      board: b,
      boardClassKey,
      classLevel: normalizedTarget,
      status: 'ACTIVE_PAID',
      isPaidActive: true,
      isFreeBase: isBasePair,
      isExpired: false,
      isLocked: false,
      isAccessible: true,
      isExpiringToday: allClassesInfo.isExpiringToday,
      purchasedAt: allClassesInfo.purchasedAt,
      purchasedDisplay: allClassesInfo.purchasedDisplay,
      expiresAt: allClassesInfo.expiresAt,
      expiryDisplay: allClassesInfo.expiryDisplay,
      daysRemaining: daysRem,
      daysRemainingDisplay: allClassesInfo.daysRemainingDisplay,
    };
  }

  // User's original Free registered base (Board + Class) stays active on Free Plan (Lifetime)
  if (isBasePair) {
    return {
      board: b,
      boardClassKey,
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

  // Student-activated additional board & class workspace (via activatedClassKeys or classSubscriptions)
  const isStudentWorkspaceActivated =
    (Array.isArray(student.activatedClassKeys) && student.activatedClassKeys.includes(boardClassKey)) ||
    (b === 'Maharashtra' &&
      Array.isArray(student.activatedClasses) &&
      student.activatedClasses.includes(normalizedTarget)) ||
    Boolean(record && record.status === 'ACTIVE');

  if (isStudentWorkspaceActivated) {
    return {
      board: b,
      boardClassKey,
      classLevel: normalizedTarget,
      status: 'ACTIVE_FREE',
      isPaidActive: false,
      isFreeBase: true,
      isExpired: false,
      isLocked: false,
      isAccessible: true,
      isExpiringToday: false,
      purchasedDateIso: student.registeredAt ? formatDateIstDisplay(student.registeredAt) : null,
      purchasedDisplay: 'Activated Workspace',
      expiryDateIso: null,
      expiryDisplay: 'Active on Account',
      daysRemaining: null,
      daysRemainingDisplay: 'Active Workspace',
    };
  }

  return {
    board: b,
    boardClassKey,
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

/**
 * Backward-compatible class subscription lookup (defaults to `board` param or student's active board / 'Maharashtra').
 */
export function getClassSubscriptionInfo(
  student: StudentProfile | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number,
  targetBoard?: EducationBoard
): ClassSubscriptionInfo {
  const b = targetBoard
    ? normalizeBoardValue(targetBoard)
    : normalizeBoardValue(student?.board || 'Maharashtra');
  return getBoardClassSubscriptionInfo(student, b, targetClass, referenceNow);
}

export function normalizeClassSubscriptions(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number,
  targetBoard?: EducationBoard
): Record<ClassLevel, ClassSubscriptionInfo> {
  const b = targetBoard
    ? normalizeBoardValue(targetBoard)
    : normalizeBoardValue(student?.board || 'Maharashtra');
  const result = {} as Record<ClassLevel, ClassSubscriptionInfo>;
  for (const cls of ALL_CLASS_LEVELS) {
    result[cls] = getBoardClassSubscriptionInfo(student, b, cls, referenceNow);
  }
  return result;
}

export function getActivatedBoardClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo[] {
  if (!student) return [];
  const items: ClassSubscriptionInfo[] = [];
  for (const b of ALL_BOARDS) {
    for (const cls of ALL_CLASS_LEVELS) {
      const info = getBoardClassSubscriptionInfo(student, b, cls, referenceNow);
      if (info.isPaidActive) items.push(info);
    }
  }
  return items;
}

export function getAccessibleBoardClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): ClassSubscriptionInfo[] {
  if (!student) return [];
  const items: ClassSubscriptionInfo[] = [];
  for (const b of ALL_BOARDS) {
    for (const cls of ALL_CLASS_LEVELS) {
      const info = getBoardClassSubscriptionInfo(student, b, cls, referenceNow);
      if (info.isAccessible) items.push(info);
    }
  }
  return items;
}

/**
 * Returns only the boards that are currently activated for the student
 * (always includes the student's original registered board, current active board,
 * and any additional board where the student has activated at least one class).
 */
export function getStudentActivatedBoards(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): EducationBoard[] {
  if (!student) return ['Maharashtra'];
  const baseBoard = getPrimaryBaseBoard(student);
  const currentBoard = normalizeBoardValue(student.board || baseBoard);
  const accessible = getAccessibleBoardClassesList(student, referenceNow);
  const boardSet = new Set<EducationBoard>([baseBoard, currentBoard]);
  for (const item of accessible) {
    boardSet.add(item.board);
  }
  return ALL_BOARDS.filter((b) => boardSet.has(b));
}

/**
 * Returns only the classes that are currently activated for the student under a given board
 * (includes the original registered class on the registered board, the current active class
 * on the active board, and any additional activated classes on that board).
 */
export function getStudentActivatedClassesForBoard(
  student: StudentProfile | null | undefined,
  board: EducationBoard,
  referenceNow?: Date | string | number
): ClassLevel[] {
  if (!student) return ['Class 1'];
  const targetBoard = normalizeBoardValue(board);
  const baseBoard = getPrimaryBaseBoard(student);
  const baseClass = getPrimaryBaseClass(student);
  const currentBoard = normalizeBoardValue(student.board || baseBoard);
  const currentClass = normalizeClassLevelValue(student.classLevel) || baseClass;

  const classSet = new Set<ClassLevel>();
  if (targetBoard === baseBoard) {
    classSet.add(baseClass);
  }
  if (targetBoard === currentBoard) {
    classSet.add(currentClass);
  }
  for (const cls of ALL_CLASS_LEVELS) {
    const info = getBoardClassSubscriptionInfo(student, targetBoard, cls, referenceNow);
    if (info.isAccessible) {
      classSet.add(cls);
    }
  }
  return ALL_CLASS_LEVELS.filter((cls) => classSet.has(cls));
}

export function getActivatedClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number,
  board?: EducationBoard
): ClassSubscriptionInfo[] {
  if (!student) return [];
  if (board) {
    const b = normalizeBoardValue(board);
    return ALL_CLASS_LEVELS.map((cls) =>
      getBoardClassSubscriptionInfo(student, b, cls, referenceNow)
    ).filter((info) => info.isPaidActive);
  }
  return getActivatedBoardClassesList(student, referenceNow);
}

export function getAccessibleClassesList(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number,
  board?: EducationBoard
): ClassSubscriptionInfo[] {
  if (!student) return [];
  if (board) {
    const b = normalizeBoardValue(board);
    return ALL_CLASS_LEVELS.map((cls) =>
      getBoardClassSubscriptionInfo(student, b, cls, referenceNow)
    ).filter((info) => info.isAccessible);
  }
  return getAccessibleBoardClassesList(student, referenceNow);
}

export function canSwitchBoardAndClass(
  student: StudentProfile | null | undefined,
  targetBoard: EducationBoard | string | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number
): {
  allowed: boolean;
  status: ClassSubscriptionStatusType;
  needsPurchase: boolean;
  needsRenewal: boolean;
  reason: string;
} {
  const b = normalizeBoardValue(targetBoard);
  const normalizedTarget = normalizeClassLevelValue(targetClass) || 'Class 1';
  if (!student) {
    return {
      allowed: false,
      status: 'LOCKED',
      needsPurchase: true,
      needsRenewal: false,
      reason: 'Please sign in or register first to access boards and classes.',
    };
  }

  const info = getBoardClassSubscriptionInfo(student, b, normalizedTarget, referenceNow);
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
      reason: `Your ${getBoardShortLabel(b)} subscription for ${normalizedTarget} expired (${info.expiryDisplay}). Renew for ₹99 (365 Days) to unlock ${getBoardShortLabel(b)} ${normalizedTarget} again!`,
    };
  }

  return {
    allowed: false,
    status: 'LOCKED',
    needsPurchase: true,
    needsRenewal: false,
    reason: `${getBoardShortLabel(b)} ${normalizedTarget} is currently locked on your account. Activate ${getBoardShortLabel(b)} ${normalizedTarget} for ₹99 (365 Days / 1 Year) to unlock all worksheets, quizzes, study materials, and subjects!`,
  };
}

export function canSwitchToClass(
  student: StudentProfile | null | undefined,
  targetClass: ClassLevel,
  referenceNow?: Date | string | number,
  targetBoard?: EducationBoard
): {
  allowed: boolean;
  status: ClassSubscriptionStatusType;
  needsPurchase: boolean;
  needsRenewal: boolean;
  reason: string;
} {
  const b = targetBoard
    ? normalizeBoardValue(targetBoard)
    : normalizeBoardValue(student?.board || 'Maharashtra');
  return canSwitchBoardAndClass(student, b, targetClass, referenceNow);
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
  activatedBoard?: EducationBoard;
  activatedClassLevel?: ClassLevel;
  activatedClasses?: ClassLevel[];
  activatedClassKeys?: BoardClassKey[];
}

/**
 * Computes the effective active subscription plan for a student or teacher
 * (defaults to `student.board` + `student.classLevel`, or overrides when specified)
 * using the unified IST (Asia/Kolkata) subscription validity engine.
 */
export function getStudentPlanInfo(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number,
  classLevelOverride?: ClassLevel,
  boardOverride?: EducationBoard
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
      activatedBoard: 'Maharashtra',
      activatedClasses: [],
      activatedClassKeys: [],
    };
  }

  const targetBoard = normalizeBoardValue(boardOverride || student.board || 'Maharashtra');
  const targetClass =
    normalizeClassLevelValue(classLevelOverride) ||
    normalizeClassLevelValue(student.classLevel) ||
    'Class 1';

  const activePaidInfos = getActivatedBoardClassesList(student, referenceNow);
  const activePaidClassKeys = activePaidInfos.map((item) => item.boardClassKey);
  const activePaidClassesSameBoard = activePaidInfos
    .filter((item) => item.board === targetBoard)
    .map((item) => item.classLevel);
  const classInfo = getBoardClassSubscriptionInfo(student, targetBoard, targetClass, referenceNow);
  const boardTag = getBoardShortLabel(targetBoard);

  if (classInfo.status === 'ACTIVE_PAID') {
    const daysRem = classInfo.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS;
    return {
      effectivePlan: 'premium',
      storedPlan: 'premium',
      planDisplayName: `PREMIUM PLAN – ₹99 – 365 Days (${boardTag} • ${targetClass})`,
      planFullHeader: `PREMIUM PLAN – ₹99 – 365 Days (${boardTag} • Standard ${formatStandardOrdinal(targetClass)})`,
      planShortBadge: classInfo.isExpiringToday
        ? `Premium (Expires Today • ${boardTag} ${targetClass})`
        : `Premium Plan (₹99 • ${boardTag} ${targetClass})`,
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
      activatedBoard: targetBoard,
      activatedClassLevel: targetClass,
      activatedClasses: activePaidClassesSameBoard,
      activatedClassKeys: activePaidClassKeys,
    };
  }

  if (classInfo.status === 'EXPIRED') {
    const expiredPlanName = `PREMIUM PLAN (₹99 – 365 Days • ${boardTag} ${targetClass})`;
    return {
      effectivePlan: 'free',
      storedPlan: 'premium',
      planDisplayName: `EXPIRED (${boardTag} ${targetClass}) — Renew ₹99`,
      planFullHeader: `${expiredPlanName} Expired`,
      planShortBadge: `Expired • Renew ${boardTag} ${targetClass} (₹99)`,
      priceLabel: '₹0 (Expired)',
      validityPeriodLabel: `${boardTag} ${targetClass} Premium Expired`,
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
      activatedBoard: targetBoard,
      activatedClassLevel: targetClass,
      activatedClasses: activePaidClassesSameBoard,
      activatedClassKeys: activePaidClassKeys,
    };
  }

  // Free Plan or Locked Class
  return {
    effectivePlan: 'free',
    storedPlan: activePaidClassKeys.length > 0 ? 'premium' : 'free',
    planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
    planFullHeader: 'FREE PLAN – ₹0 – Lifetime',
    planShortBadge:
      classInfo.status === 'LOCKED'
        ? `${boardTag} ${targetClass} Locked (Unlock ₹99)`
        : `Free Plan (${boardTag} ${targetClass})`,
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
    activatedBoard: targetBoard,
    activatedClassLevel: targetClass,
    activatedClasses: activePaidClassesSameBoard,
    activatedClassKeys: activePaidClassKeys,
  };
}

/**
 * Checks whether a specific Subject is unlocked for the user's selected (Board, Class).
 */
export function canAccessSubject(
  student: StudentProfile | null | undefined,
  subject: SubjectName,
  targetClassLevel?: ClassLevel,
  referenceNow?: Date | string | number,
  targetBoard?: EducationBoard
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

  const resolvedBoard = normalizeBoardValue(targetBoard || student.board || 'Maharashtra');
  const resolvedClass =
    normalizeClassLevelValue(targetClassLevel) ||
    normalizeClassLevelValue(student.classLevel) ||
    'Class 1';
  const boardTag = getBoardShortLabel(resolvedBoard);

  const classInfo = getBoardClassSubscriptionInfo(student, resolvedBoard, resolvedClass, referenceNow);

  if (classInfo.isPaidActive) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  if (classInfo.status === 'LOCKED') {
    return {
      allowed: false,
      requiredPlan: 'premium',
      reason: `${boardTag} ${resolvedClass} is not unlocked on your account. Purchase the ₹99 (365 Days) subscription for ${boardTag} ${resolvedClass} to unlock all subjects and worksheets!`,
    };
  }

  if (classInfo.status === 'EXPIRED') {
    const hasOtherActiveClass = getActivatedBoardClassesList(student, referenceNow).length > 0;
    if (hasOtherActiveClass || !classInfo.isFreeBase) {
      return {
        allowed: false,
        requiredPlan: 'premium',
        reason: `Your ${boardTag} subscription for ${resolvedClass} has expired. Renew ${boardTag} ${resolvedClass} for ₹99 (365 Days) to restore access!`,
      };
    }
  }

  // Base Free Plan: Only English and Mathematics for the registered primary Board+Class
  if (FREE_ALLOWED_SUBJECTS.includes(subject)) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    reason: `${subject} is locked on the Free Plan for ${boardTag} ${resolvedClass}. Upgrade ${boardTag} ${resolvedClass} to the Premium Plan (₹99 – 365 Days / 1 Year) to unlock all subjects, study materials, and worksheets!`,
  };
}

/**
 * Checks whether Chapter Study Material / Free Study Material Library is unlocked for a given (Board, Class, Subject).
 * Per MyStudyZone Free Study Material Library policy, all Study Material Library content
 * across Maharashtra State Board, CBSE, and ICSE (Classes 1 to 10) is 100% FREE for all visitors,
 * free students, paid students, and teachers.
 * (Paid gates on Worksheets, 4-Level Subject Quizzes, Scholarship, and TET/CTET remain strictly enforced.)
 */
export function canAccessStudyMaterial(
  _student: StudentProfile | null | undefined,
  _board: EducationBoard,
  _classLevel: ClassLevel,
  _subject: SubjectName,
  _isFreePreview?: boolean,
  _referenceNow?: Date | string | number
): { allowed: boolean; reason?: string } {
  return { allowed: true };
}

/**
 * Checks whether a dashboard tab/feature is accessible for the student/teacher's current active Board+Class.
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
  const activeClassesCount = getActivatedBoardClassesList(student, referenceNow).length;
  const hasAllClassesBundle = hasCategoryAccess(student, 'all_classes', referenceNow);

  // Core tabs & category hubs remain browseable (paid content inside Scholarship / Worksheets / TET-CTET is gated per category & plan)
  if (
    featureTab === 'dashboard' ||
    featureTab === 'profile' ||
    featureTab === 'demo' ||
    featureTab === 'puzzles' ||
    featureTab === 'sudoku' ||
    featureTab === 'quizzes' ||
    featureTab === 'worksheets' ||
    featureTab === 'study-material' ||
    featureTab === 'scholarship' ||
    featureTab === 'tet-ctet' ||
    featureTab === 'referrals'
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
    'future-skills': 'AI Learning Academy & Future Skills',
    'ai-academy': 'AI Learning Academy (8 Modules, 24 Lessons)',
    certificates: 'Champion Certificates & Trophies',
    leaderboard: 'National Champion Leaderboard',
    referrals: 'Learn • Share • Grow • Earn Ambassador Hub',
  };
  const featureTitle = premiumTitleMap[featureTab] || 'Premium Dashboard Feature';

  // Verified paid plan (class-wise or all_classes bundle) required for Students AND Teachers alike (no free teacher bypass)
  if (effectivePlan === 'premium' || effectivePlan === 'basic' || activeClassesCount > 0 || hasAllClassesBundle) {
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
    upgradeMessage: `${featureTitle} is unlocked with the ₹99 Class Annual Plan or All-Access Bundle (365 Days / 1 Year), giving you complete access to all subjects, study materials, and worksheets!`,
  };
}

/**
 * Parses Board & Class from Worksheet IDs:
 * - Legacy Maharashtra: `WS-C5-ENGLISH-1` -> `{ board: 'Maharashtra', classLevel: 'Class 5' }`
 * - CBSE: `WS-CBSE-C5-ENGLISH-1` -> `{ board: 'CBSE', classLevel: 'Class 5' }`
 * - ICSE: `WS-ICSE-C5-ENGLISH-1` -> `{ board: 'ICSE', classLevel: 'Class 5' }`
 */
export function parseBoardAndClassFromWorksheetId(
  worksheetId: string
): { board: EducationBoard; classLevel: ClassLevel | null } {
  const idStr = String(worksheetId || '').trim();
  const boardMatch = /^WS-(?:NEW-)?(CBSE|ICSE|MH|MAHARASHTRA)-C(\d{1,2})-/i.exec(idStr);
  if (boardMatch) {
    const board = normalizeBoardValue(boardMatch[1]);
    const num = parseInt(boardMatch[2], 10);
    return {
      board,
      classLevel: num >= 1 && num <= 10 ? (`Class ${num}` as ClassLevel) : null,
    };
  }
  const legacyMatch = /^WS-C(\d{1,2})-/i.exec(idStr);
  if (legacyMatch) {
    const num = parseInt(legacyMatch[1], 10);
    return {
      board: 'Maharashtra',
      classLevel: num >= 1 && num <= 10 ? (`Class ${num}` as ClassLevel) : null,
    };
  }
  return { board: 'Maharashtra', classLevel: null };
}

export function parseClassLevelFromWorksheetId(worksheetId: string): ClassLevel | null {
  return parseBoardAndClassFromWorksheetId(worksheetId).classLevel;
}

/**
 * Checks whether a worksheet ID is one of the strictly 2 designated Free Demo Worksheets
 * for a given (Board, Class) (1 English worksheet + 1 Mathematics worksheet).
 */
export function isFreeDemoWorksheet(
  worksheetId: string,
  classLevel?: ClassLevel,
  board?: EducationBoard
): boolean {
  const parsed = parseBoardAndClassFromWorksheetId(worksheetId);
  const targetBoard = board ? normalizeBoardValue(board) : parsed.board;
  const targetClass = classLevel || parsed.classLevel || 'Class 1';
  const allowedDemos = getFreeDemoWorksheetIdsForClass(targetClass, targetBoard);
  return allowedDemos.includes(worksheetId);
}

/**
 * Checks whether a student or teacher qualifies for Universal ₹99 Worksheet Access:
 * Any user holding ANY active paid ₹99 Class subscription (across any Board/Class)
 * OR the All-Access Bundle ('all_classes') gets ALL existing and newly added worksheets
 * unlocked across ALL 3 Boards (Maharashtra, CBSE, ICSE) and Classes 1–10 with zero extra fees.
 */
export function hasUniversalWorksheetAccess(
  student: StudentProfile | null | undefined,
  referenceNow?: Date | string | number
): boolean {
  if (!student) return false;
  if (hasCategoryAccess(student, 'all_classes', referenceNow)) {
    return true;
  }
  return getActivatedBoardClassesList(student, referenceNow).length > 0;
}

/**
 * Checks whether a student or teacher has access to a specific worksheet across Boards (MH/CBSE/ICSE) and Standards 1st–10th.
 * WORKSHEET ENTITLEMENT RULES:
 * 1. Any Active Paid ₹99 Subscriber (any active Board+Class subscription OR 'all_classes' bundle) -> ALL existing & new worksheets across ALL 3 Boards & Classes 1–10 unlocked!
 * 2. Expired Paid (with NO other active paid plan) -> locked until renewed (sole Free base retains ONLY the 2 existing demo worksheets).
 * 3. Base Free (Board, Class) -> ONLY the 2 existing Demo Worksheets (1 English + 1 Mathematics) unlocked.
 * 4. Any other unpurchased (Board, Class) for unpaid users -> STRICTLY LOCKED until ₹99 paid verification.
 */
export function canAccessWorksheet(
  student: StudentProfile | null | undefined,
  worksheetId: string,
  worksheetClassLevel?: ClassLevel,
  referenceNow?: Date | string | number,
  worksheetBoard?: EducationBoard
): {
  allowed: boolean;
  isDemo: boolean;
  isOtherClassLocked?: boolean;
  isClassExpired?: boolean;
  userBoard: EducationBoard;
  worksheetBoard: EducationBoard;
  userClassLevel: ClassLevel;
  worksheetClassLevel: ClassLevel;
  effectivePlan: 'free' | 'premium';
  requiredPlan: 'premium';
  upgradeMessage: string;
  reason?: string;
} {
  const parsedFromId = parseBoardAndClassFromWorksheetId(worksheetId);
  const userBoard = normalizeBoardValue(student?.board || 'Maharashtra');
  const wsBoard = worksheetBoard ? normalizeBoardValue(worksheetBoard) : parsedFromId.board;
  const wsBoardLabel = getBoardShortLabel(wsBoard);

  const userClass: ClassLevel = normalizeClassLevelValue(student?.classLevel) || 'Class 1';
  const wsClass: ClassLevel =
    normalizeClassLevelValue(worksheetClassLevel) ||
    parsedFromId.classLevel ||
    userClass;

  const wsClassInfo = getBoardClassSubscriptionInfo(student, wsBoard, wsClass, referenceNow);
  const isDemo = isFreeDemoWorksheet(worksheetId, wsClass, wsBoard);

  // Rule 1: Active Paid Subscription for (wsBoard, wsClass) OR Universal ₹99 Worksheet Access -> Unlock ALL worksheets across all 3 boards & Classes 1–10!
  if (wsClassInfo.isPaidActive || hasUniversalWorksheetAccess(student, referenceNow)) {
    return {
      allowed: true,
      isDemo,
      isOtherClassLocked: false,
      isClassExpired: false,
      userBoard,
      worksheetBoard: wsBoard,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'premium',
      requiredPlan: 'premium',
      upgradeMessage: '',
      reason: '',
    };
  }

  // Rule 2: Expired Paid (Board, Class) -> Lock paid worksheets until renewal!
  if (wsClassInfo.status === 'EXPIRED') {
    const hasOtherActivePaid = getActivatedBoardClassesList(student, referenceNow).length > 0;
    if (!hasOtherActivePaid && wsClassInfo.isFreeBase && isDemo) {
      return {
        allowed: true,
        isDemo: true,
        isOtherClassLocked: false,
        isClassExpired: true,
        userBoard,
        worksheetBoard: wsBoard,
        userClassLevel: userClass,
        worksheetClassLevel: wsClass,
        effectivePlan: 'free',
        requiredPlan: 'premium',
        upgradeMessage: '',
        reason: '',
      };
    }

    const msg = `Subscription Expired: Your 1-year ${wsBoardLabel} subscription for ${wsClass} has expired. Renew ${wsBoardLabel} ${wsClass} for ₹99 (365 Days) to restore all worksheets!`;
    return {
      allowed: false,
      isDemo: false,
      isOtherClassLocked: wsBoard !== userBoard || wsClass !== userClass,
      isClassExpired: true,
      userBoard,
      worksheetBoard: wsBoard,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: msg,
      reason: msg,
    };
  }

  // Rule 3: Unpaid Additional (Board, Class) (`LOCKED`) -> Strictly locked until ₹99 paid verification
  if (wsClassInfo.status === 'LOCKED') {
    const msg = `Locked: Purchase & activate ${wsBoardLabel} • Standard ${formatStandardOrdinal(wsClass)} (${wsClass}) for ₹99 (365 Days) to unlock all worksheets for ${wsBoardLabel} ${wsClass}!`;
    return {
      allowed: false,
      isDemo: false,
      isOtherClassLocked: true,
      isClassExpired: false,
      userBoard,
      worksheetBoard: wsBoard,
      userClassLevel: userClass,
      worksheetClassLevel: wsClass,
      effectivePlan: 'free',
      requiredPlan: 'premium',
      upgradeMessage: msg,
      reason: msg,
    };
  }

  // Rule 4: User's Free Registered Base (Board, Class) (`ACTIVE_FREE`) -> ONLY 2 Demo Worksheets
  if (isDemo) {
    return {
      allowed: true,
      isDemo: true,
      isOtherClassLocked: false,
      isClassExpired: false,
      userBoard,
      worksheetBoard: wsBoard,
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
    userBoard,
    worksheetBoard: wsBoard,
    userClassLevel: userClass,
    worksheetClassLevel: wsClass,
    effectivePlan: 'free',
    requiredPlan: 'premium',
    upgradeMessage: WORKSHEET_CLASS_LOCK_MESSAGE,
    reason: WORKSHEET_CLASS_LOCK_MESSAGE,
  };
}



