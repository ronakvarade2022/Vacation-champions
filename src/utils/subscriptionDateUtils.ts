/**
 * Unified Subscription Date & Validity Calculation Engine (IST / Asia/Kolkata + UTC)
 *
 * Enforces 1 Year (365 Days) subscription validity across Frontend, Backend (Express),
 * and Firebase Firestore / Cloud Functions:
 * - All calendar date calculations use India Standard Time (Asia/Kolkata, UTC+05:30).
 * - All database audit timestamps are stored in UTC ISO-8601 format.
 * - Remaining days are calculated using exact calendar-day integer math (never raw
 *   millisecond division that drifts with time-of-day or browser local timezone).
 */

export const SUBSCRIPTION_VALIDITY_DAYS = 365;
export const PAID_SUBSCRIPTION_VALIDITY_DAYS = 365;
export const IST_TIMEZONE = 'Asia/Kolkata';
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000; // +05:30 in milliseconds (19,800,000 ms)
const ONE_DAY_MS = 86_400_000; // 24 * 60 * 60 * 1000 ms in UTC calendar arithmetic

export interface IstDateParts {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
  isoDate: string; // 'YYYY-MM-DD'
}

/**
 * Pads a number to 2 digits.
 */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Validates whether (year, month, day) forms a real calendar date (including leap years).
 */
export function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (year < 1970 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const dt = new Date(Date.UTC(year, month - 1, day));
  return (
    dt.getUTCFullYear() === year &&
    dt.getUTCMonth() === month - 1 &&
    dt.getUTCDate() === day
  );
}

/**
 * Parses a date input (Date object, UTC ISO timestamp, epoch ms, or 'YYYY-MM-DD' string)
 * into exact India Standard Time (Asia/Kolkata) calendar date parts.
 *
 * - If the input is a pure 'YYYY-MM-DD' string, it is treated directly as that calendar date
 *   without shifting timezones.
 * - If the input is a Date or full timestamp (e.g. '2026-11-12T18:45:00.000Z' which is
 *   '2026-11-13 00:15:00 IST'), it converts to Asia/Kolkata (+05:30) before extracting YYYY-MM-DD.
 */
export function parseToIstDateParts(input?: Date | string | number | null): IstDateParts | null {
  if (input === null || input === undefined || input === '') {
    return null;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);
      if (!isValidCalendarDate(year, month, day)) {
        return null;
      }
      return {
        year,
        month,
        day,
        isoDate: `${year}-${pad2(month)}-${pad2(day)}`,
      };
    }
  }

  const dateObj = input instanceof Date ? input : new Date(input);
  if (isNaN(dateObj.getTime())) {
    return null;
  }

  // Shift UTC epoch by +05:30 (IST_OFFSET_MS) and read UTC getters for deterministic IST date
  const istShifted = new Date(dateObj.getTime() + IST_OFFSET_MS);
  const year = istShifted.getUTCFullYear();
  const month = istShifted.getUTCMonth() + 1;
  const day = istShifted.getUTCDate();

  if (!isValidCalendarDate(year, month, day)) {
    return null;
  }

  return {
    year,
    month,
    day,
    isoDate: `${year}-${pad2(month)}-${pad2(day)}`,
  };
}

/**
 * Returns the 'YYYY-MM-DD' calendar date in India Standard Time (Asia/Kolkata).
 */
export function toIstDateString(input?: Date | string | number | null): string {
  const parts = parseToIstDateParts(input ?? new Date());
  if (parts) {
    return parts.isoDate;
  }
  const fallback = parseToIstDateParts(new Date())!;
  return fallback.isoDate;
}

/**
 * Converts an IstDateParts object into UTC midnight milliseconds for exact integer day arithmetic.
 */
export function datePartsToUtcMidnightMs(parts: IstDateParts): number {
  return Date.UTC(parts.year, parts.month - 1, parts.day);
}

/**
 * Adds a specified number of calendar days (default 365) to a 'YYYY-MM-DD' or Date input in IST.
 * Handles month lengths and leap years (e.g., Feb 29) accurately.
 */
export function addCalendarDaysIst(
  startInput: Date | string | number,
  daysToAdd: number = SUBSCRIPTION_VALIDITY_DAYS
): string {
  const parts = parseToIstDateParts(startInput);
  if (!parts) {
    throw new Error(`Invalid start date for subscription calculation: ${String(startInput)}`);
  }

  const targetUtc = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + daysToAdd));
  const y = targetUtc.getUTCFullYear();
  const m = targetUtc.getUTCMonth() + 1;
  const d = targetUtc.getUTCDate();
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

/**
 * Calculates the exact integer number of calendar days from `startInput` to `endInput` in IST.
 * Returns `end - start` in whole calendar days:
 * - > 0 if `endInput` is in the future relative to `startInput`
 * - === 0 if `endInput` is the exact same calendar day in IST as `startInput`
 * - < 0 if `endInput` is in the past relative to `startInput`
 */
export function diffCalendarDaysIst(
  startInput: Date | string | number,
  endInput: Date | string | number
): number | null {
  const startParts = parseToIstDateParts(startInput);
  const endParts = parseToIstDateParts(endInput);
  if (!startParts || !endParts) {
    return null;
  }
  const startMs = datePartsToUtcMidnightMs(startParts);
  const endMs = datePartsToUtcMidnightMs(endParts);
  return Math.round((endMs - startMs) / ONE_DAY_MS);
}

/**
 * Formats a date string or Date object in India Standard Time for user-facing display.
 * Example: '2026-11-13' -> '13 Nov 2026'
 */
export function formatDateIstDisplay(
  input?: Date | string | number | null,
  includeIso: boolean = false
): string {
  const parts = parseToIstDateParts(input);
  if (!parts) {
    return '—';
  }
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const human = `${pad2(parts.day)} ${months[parts.month - 1]} ${parts.year}`;
  return includeIso ? `${human} (${parts.isoDate})` : human;
}

/**
 * Formats a full UTC timestamp into India Standard Time date + time string.
 * Example: '13 Nov 2026, 07:15 PM IST'
 */
export function formatDateTimeIstDisplay(input?: Date | string | number | null): string {
  if (!input) return '—';
  const dt = input instanceof Date ? input : new Date(input);
  if (isNaN(dt.getTime())) {
    return formatDateIstDisplay(input);
  }
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: IST_TIMEZONE,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(dt) + ' IST'
    );
  } catch {
    return formatDateIstDisplay(dt);
  }
}

export interface SubscriptionValidityEvaluation {
  isValidDate: boolean;
  purchasedDateIso: string | null;
  purchaseDateIst: string | null;
  purchasedDateDisplay: string;
  purchaseDateDisplay: string;
  expiryDateIso: string | null;
  expiryDateIst: string | null;
  expiryDateDisplay: string;
  todayIstIso: string;
  rawDiffDays: number | null;
  daysRemaining: number; // Always >= 0 (never negative)
  totalValidityDays: number | null; // Calendar days between purchase and expiry if both exist
  configuredValidityDays: number | null;
  isExpired: boolean;
  isExpiringToday: boolean;
  isActive: boolean;
  statusCode: 'ACTIVE' | 'EXPIRING_TODAY' | 'EXPIRED';
  statusLabel: 'ACTIVE' | 'EXPIRING TODAY' | 'EXPIRED';
  daysRemainingDisplay: string;
  expiryStatusSummary: string;
}

export interface EvaluateSubscriptionValidityParams {
  plan?: string | null;
  planPurchasedAt?: string | null;
  planExpiresAt?: string | null;
  now?: Date | string | number;
}

/**
 * Single authoritative function to evaluate a student's subscription expiry and remaining days
 * in India Standard Time (Asia/Kolkata).
 *
 * Supports both object and positional argument forms:
 * - `evaluateSubscriptionValidity({ planPurchasedAt, planExpiresAt, now })`
 * - `evaluateSubscriptionValidity(planPurchasedAt, planExpiresAt, now)`
 * - `evaluateSubscriptionValidity(plan, planPurchasedAt, planExpiresAt, now)`
 */
export function evaluateSubscriptionValidity(
  arg1?: EvaluateSubscriptionValidityParams | string | null,
  arg2?: string | null,
  arg3?: Date | string | number | null,
  arg4?: Date | string | number
): SubscriptionValidityEvaluation {
  let planPurchasedAt: string | null | undefined;
  let planExpiresAt: string | null | undefined;
  let nowRef: Date | string | number | undefined;

  if (arg1 && typeof arg1 === 'object' && !(arg1 instanceof Date)) {
    planPurchasedAt = arg1.planPurchasedAt;
    planExpiresAt = arg1.planExpiresAt;
    nowRef = arg1.now;
  } else if (
    typeof arg1 === 'string' &&
    (arg1 === 'free' || arg1 === 'basic' || arg1 === 'premium')
  ) {
    planPurchasedAt = arg2;
    planExpiresAt = typeof arg3 === 'string' ? arg3 : null;
    nowRef = arg4;
  } else {
    planPurchasedAt = typeof arg1 === 'string' ? arg1 : null;
    planExpiresAt = arg2;
    nowRef = arg3 ?? undefined;
  }

  const todayParts = parseToIstDateParts(nowRef ?? new Date()) || parseToIstDateParts(new Date())!;
  const todayIstIso = todayParts.isoDate;

  const purchasedParts = parseToIstDateParts(planPurchasedAt);
  const expiryParts = parseToIstDateParts(planExpiresAt);

  const purchasedDateIso = purchasedParts ? purchasedParts.isoDate : null;
  const purchasedDateDisplay = purchasedParts ? formatDateIstDisplay(purchasedParts.isoDate) : '—';

  if (!expiryParts) {
    return {
      isValidDate: false,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso: null,
      expiryDateIst: null,
      expiryDateDisplay: '—',
      todayIstIso,
      rawDiffDays: null,
      daysRemaining: 0,
      totalValidityDays: null,
      configuredValidityDays: null,
      isExpired: false,
      isExpiringToday: false,
      isActive: false,
      statusCode: 'EXPIRED',
      statusLabel: 'EXPIRED',
      daysRemainingDisplay: 'Missing / Invalid Expiry Date',
      expiryStatusSummary: 'Subscription expiry date is missing or invalid',
    };
  }

  const expiryDateIso = expiryParts.isoDate;
  const expiryDateDisplay = formatDateIstDisplay(expiryDateIso);

  const rawDiffDays = diffCalendarDaysIst(todayIstIso, expiryDateIso) ?? 0;
  const totalValidityDays =
    purchasedDateIso && expiryDateIso
      ? diffCalendarDaysIst(purchasedDateIso, expiryDateIso)
      : null;

  if (rawDiffDays < 0) {
    return {
      isValidDate: true,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso,
      expiryDateIst: expiryDateIso,
      expiryDateDisplay,
      todayIstIso,
      rawDiffDays,
      daysRemaining: 0,
      totalValidityDays,
      configuredValidityDays: totalValidityDays,
      isExpired: true,
      isExpiringToday: false,
      isActive: false,
      statusCode: 'EXPIRED',
      statusLabel: 'EXPIRED',
      daysRemainingDisplay: '0 Days Remaining (Expired)',
      expiryStatusSummary: `Expired on ${expiryDateDisplay} (${expiryDateIso})`,
    };
  }

  if (rawDiffDays === 0) {
    return {
      isValidDate: true,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso,
      expiryDateIst: expiryDateIso,
      expiryDateDisplay,
      todayIstIso,
      rawDiffDays: 0,
      daysRemaining: 0,
      totalValidityDays,
      configuredValidityDays: totalValidityDays,
      isExpired: false,
      isExpiringToday: true,
      isActive: true,
      statusCode: 'EXPIRING_TODAY',
      statusLabel: 'EXPIRING TODAY',
      daysRemainingDisplay: 'Expires Today (Active until 11:59 PM IST)',
      expiryStatusSummary: `Expires Today • ${expiryDateDisplay} (11:59 PM IST)`,
    };
  }

  const dayWord = rawDiffDays === 1 ? 'Day' : 'Days';
  return {
    isValidDate: true,
    purchasedDateIso,
    purchaseDateIst: purchasedDateIso,
    purchasedDateDisplay,
    purchaseDateDisplay: purchasedDateDisplay,
    expiryDateIso,
    expiryDateIst: expiryDateIso,
    expiryDateDisplay,
    todayIstIso,
    rawDiffDays,
    daysRemaining: rawDiffDays,
    totalValidityDays,
    configuredValidityDays: totalValidityDays,
    isExpired: false,
    isExpiringToday: false,
    isActive: true,
    statusCode: 'ACTIVE',
    statusLabel: 'ACTIVE',
    daysRemainingDisplay: `${rawDiffDays} ${dayWord} Remaining`,
    expiryStatusSummary: `Valid until ${expiryDateDisplay} (${expiryDateIso})`,
  };
}

export interface ComputedSubscriptionActivation {
  verifiedAtUtc: string;          // Exact UTC ISO-8601 timestamp of payment verification
  verifiedAtUtcIso: string;       // Alias for verifiedAtUtc
  purchasedAt: string;            // IST 'YYYY-MM-DD' purchase date
  purchasedDateIst: string;       // Alias for purchasedAt
  purchasedAtDisplay: string;     // '13 Nov 2026'
  expiresAt: string;              // IST 'YYYY-MM-DD' expiry date (+365 days from purchase or active expiry)
  expiresDateIst: string;         // Alias for expiresAt
  expiryDateIst: string;          // Alias for expiresAt
  expiresAtDisplay: string;       // '13 Nov 2027'
  expiresAtUtc: string;           // UTC ISO-8601 timestamp for end of expiry day in IST (23:59:59.999+05:30)
  validityDaysAdded: number;      // Always 365
  validityDays: number;           // Alias for validityDaysAdded (365)
  daysRemaining: number;          // Total remaining days from today (365 for new/expired, or existingLeft + 365 for renewal)
  isRenewalExtension: boolean;    // True if extended from an existing unexpired subscription
  isRenewalBeforeExpiry: boolean; // Alias for isRenewalExtension
}

/**
 * Converts an IST 'YYYY-MM-DD' expiry date to its exact end-of-day UTC ISO-8601 timestamp
 * (23:59:59.999 IST = 18:29:59.999Z on that date).
 */
export function istExpiryDateToUtcEndTimestamp(expiryIsoDate: string): string {
  const parts = parseToIstDateParts(expiryIsoDate);
  if (!parts) {
    return new Date().toISOString();
  }
  const endOfDayIstInUtcMs =
    Date.UTC(parts.year, parts.month - 1, parts.day, 23, 59, 59, 999) - IST_OFFSET_MS;
  return new Date(endOfDayIstInUtcMs).toISOString();
}

/**
 * Computes the exact 365-day subscription activation / renewal dates upon server-verified payment.
 *
 * Rules:
 * 1. New Purchase or Renewal After Expiry:
 *    - Start date = verified purchase date in IST ('YYYY-MM-DD').
 *    - Expiry date = verified purchase date + 365 calendar days.
 * 2. Renewal Before Expiry (when existing subscription is still active in IST):
 *    - Extends existing expiry date by +365 calendar days (`existingExpiresAt + 365 days`).
 */
export function computeSubscriptionActivationDates(params?: {
  existingPlan?: string | null;
  existingPurchasedAt?: string | null;
  existingExpiresAt?: string | null;
  existingPlanStatus?: string | null;
  verifiedAt?: Date | string | number;
  verificationTimestamp?: Date | string | number;
}): ComputedSubscriptionActivation {
  const rawTime = params?.verifiedAt ?? params?.verificationTimestamp;
  const nowDate =
    rawTime instanceof Date
      ? rawTime
      : rawTime
      ? new Date(rawTime)
      : new Date();
  const safeNow = isNaN(nowDate.getTime()) ? new Date() : nowDate;

  const verifiedAtUtc = safeNow.toISOString();
  const purchasedAt = toIstDateString(safeNow);
  const purchasedAtDisplay = formatDateIstDisplay(purchasedAt);

  let baseDateForExtension = purchasedAt;
  let isRenewalExtension = false;

  if (params?.existingExpiresAt && params?.existingPlanStatus !== 'expired') {
    const existingParts = parseToIstDateParts(params.existingExpiresAt);
    if (existingParts) {
      const diffFromToday = diffCalendarDaysIst(purchasedAt, existingParts.isoDate);
      // If existing subscription expires today (0) or in the future (> 0), extend from existing expiry date
      if (diffFromToday !== null && diffFromToday >= 0) {
        baseDateForExtension = existingParts.isoDate;
        isRenewalExtension = true;
      }
    }
  }

  const expiresAt = addCalendarDaysIst(baseDateForExtension, SUBSCRIPTION_VALIDITY_DAYS);
  const expiresAtDisplay = formatDateIstDisplay(expiresAt);
  const expiresAtUtc = istExpiryDateToUtcEndTimestamp(expiresAt);
  const daysRemaining = Math.max(0, diffCalendarDaysIst(purchasedAt, expiresAt) ?? SUBSCRIPTION_VALIDITY_DAYS);

  return {
    verifiedAtUtc,
    verifiedAtUtcIso: verifiedAtUtc,
    purchasedAt,
    purchasedDateIst: purchasedAt,
    purchasedAtDisplay,
    expiresAt,
    expiresDateIst: expiresAt,
    expiryDateIst: expiresAt,
    expiresAtDisplay,
    expiresAtUtc,
    validityDaysAdded: SUBSCRIPTION_VALIDITY_DAYS,
    validityDays: SUBSCRIPTION_VALIDITY_DAYS,
    daysRemaining,
    isRenewalExtension,
    isRenewalBeforeExpiry: isRenewalExtension,
  };
}

export type SubscriptionAuditAnomalyType =
  | 'NONE'
  | 'NONE_FREE_PLAN'
  | 'VALID_365_DAY_SUBSCRIPTION'
  | 'LEGACY_SHORT_VALIDITY'
  | 'MISSING_PURCHASE_DATE'
  | 'MISSING_EXPIRY_DATE'
  | 'INVALID_OR_INCONSISTENT_DATES';

export interface StudentSubscriptionAuditReportItem {
  studentId: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  classLevel: string;
  plan: string;
  currentPurchaseDate: string;
  currentPurchaseDateIst: string | null;
  currentPurchaseDateDisplay: string;
  currentExpiryDate: string;
  currentExpiryDateIst: string | null;
  currentExpiryDateDisplay: string;
  calculatedRemainingDays: number | null;
  calculatedDaysRemainingDisplay: string;
  remainingStatusText: string;
  configuredValidityDays: number | null;
  configuredValiditySpanDays: number | null;
  anomalyType: SubscriptionAuditAnomalyType;
  anomalyDescription: string;
  auditExplanation: string;
  needsAdminReview: boolean;
  requiresAdminApprovalToMigrate: boolean;
  proposedPurchaseDate: string;
  proposedExpiryDateIf365Days: string;
  proposed365ExpiryDateIst: string | null;
  proposed365ExpiryDateDisplay: string;
  proposedRemainingDaysIf365Days: number | null;
  proposed365DaysRemaining: number | null;
}

/**
 * Inspects an existing student/teacher subscription record without mutating it,
 * returning a full diagnostic report for Admin review.
 */
export function auditStudentSubscriptionRecord(
  student: {
    id: string;
    name: string;
    accountRole?: 'student' | 'teacher';
    classLevel: string;
    plan?: string;
    planPurchasedAt?: string | null;
    planExpiresAt?: string | null;
    registeredAt?: string;
  },
  nowInput?: Date | string | number
): StudentSubscriptionAuditReportItem {
  const role: 'student' | 'teacher' = student.accountRole === 'teacher' ? 'teacher' : 'student';
  const rawPlan = student.plan || 'free';

  if (rawPlan === 'free') {
    const explanation = 'Free Plan account — no paid subscription dates required.';
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: 'free',
      currentPurchaseDate: '—',
      currentPurchaseDateIst: null,
      currentPurchaseDateDisplay: 'Lifetime Free',
      currentExpiryDate: 'Lifetime (Never Expires)',
      currentExpiryDateIst: null,
      currentExpiryDateDisplay: 'Lifetime (Never Expires)',
      calculatedRemainingDays: null,
      calculatedDaysRemainingDisplay: 'Lifetime (Free Plan)',
      remainingStatusText: 'Lifetime (Free Plan)',
      configuredValidityDays: null,
      configuredValiditySpanDays: null,
      anomalyType: 'NONE',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: false,
      requiresAdminApprovalToMigrate: false,
      proposedPurchaseDate: '—',
      proposedExpiryDateIf365Days: 'Lifetime (No Change Needed)',
      proposed365ExpiryDateIst: null,
      proposed365ExpiryDateDisplay: 'Lifetime (No Change Needed)',
      proposedRemainingDaysIf365Days: null,
      proposed365DaysRemaining: null,
    };
  }

  const purchaseParts = parseToIstDateParts(student.planPurchasedAt);
  const expiryParts = parseToIstDateParts(student.planExpiresAt);
  const todayIso = toIstDateString(nowInput ?? new Date());

  const fallbackPurchaseIso =
    purchaseParts?.isoDate ||
    parseToIstDateParts(student.registeredAt)?.isoDate ||
    todayIso;
  const proposedExpiryIso = addCalendarDaysIst(fallbackPurchaseIso, SUBSCRIPTION_VALIDITY_DAYS);
  const proposedExpiryDisplay = formatDateIstDisplay(proposedExpiryIso);
  const proposedRemDays = Math.max(0, diffCalendarDaysIst(todayIso, proposedExpiryIso) ?? 0);

  if (!purchaseParts && !expiryParts) {
    const explanation = 'Paid subscription is missing both purchase date and expiry date. Flagged for admin review.';
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: rawPlan,
      currentPurchaseDate: String(student.planPurchasedAt || 'MISSING'),
      currentPurchaseDateIst: null,
      currentPurchaseDateDisplay: 'MISSING',
      currentExpiryDate: String(student.planExpiresAt || 'MISSING'),
      currentExpiryDateIst: null,
      currentExpiryDateDisplay: 'MISSING',
      calculatedRemainingDays: 0,
      calculatedDaysRemainingDisplay: 'Missing Purchase & Expiry Dates',
      remainingStatusText: 'Missing Purchase & Expiry Dates',
      configuredValidityDays: null,
      configuredValiditySpanDays: null,
      anomalyType: 'INVALID_OR_INCONSISTENT_DATES',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: true,
      requiresAdminApprovalToMigrate: true,
      proposedPurchaseDate: fallbackPurchaseIso,
      proposedExpiryDateIf365Days: proposedExpiryIso,
      proposed365ExpiryDateIst: proposedExpiryIso,
      proposed365ExpiryDateDisplay: proposedExpiryDisplay,
      proposedRemainingDaysIf365Days: proposedRemDays,
      proposed365DaysRemaining: proposedRemDays,
    };
  }

  if (!purchaseParts) {
    const evalRes = evaluateSubscriptionValidity({
      planExpiresAt: expiryParts?.isoDate,
      now: nowInput,
    });
    const inferredPurchase = expiryParts
      ? addCalendarDaysIst(expiryParts.isoDate, -SUBSCRIPTION_VALIDITY_DAYS)
      : fallbackPurchaseIso;
    const targetExpIso = expiryParts?.isoDate || proposedExpiryIso;
    const explanation = `Paid subscription has expiry date (${expiryParts?.isoDate}) but is missing planPurchasedAt.`;
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: rawPlan,
      currentPurchaseDate: 'MISSING',
      currentPurchaseDateIst: null,
      currentPurchaseDateDisplay: 'MISSING',
      currentExpiryDate: expiryParts?.isoDate || 'MISSING',
      currentExpiryDateIst: expiryParts?.isoDate || null,
      currentExpiryDateDisplay: expiryParts ? formatDateIstDisplay(expiryParts.isoDate) : 'MISSING',
      calculatedRemainingDays: evalRes.daysRemaining,
      calculatedDaysRemainingDisplay: evalRes.daysRemainingDisplay,
      remainingStatusText: evalRes.daysRemainingDisplay,
      configuredValidityDays: null,
      configuredValiditySpanDays: null,
      anomalyType: 'MISSING_PURCHASE_DATE',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: true,
      requiresAdminApprovalToMigrate: true,
      proposedPurchaseDate: inferredPurchase,
      proposedExpiryDateIf365Days: targetExpIso,
      proposed365ExpiryDateIst: targetExpIso,
      proposed365ExpiryDateDisplay: formatDateIstDisplay(targetExpIso),
      proposedRemainingDaysIf365Days: evalRes.daysRemaining,
      proposed365DaysRemaining: evalRes.daysRemaining,
    };
  }

  if (!expiryParts) {
    const explanation = `Paid subscription has purchase date (${purchaseParts.isoDate}) but is missing planExpiresAt.`;
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: rawPlan,
      currentPurchaseDate: purchaseParts.isoDate,
      currentPurchaseDateIst: purchaseParts.isoDate,
      currentPurchaseDateDisplay: formatDateIstDisplay(purchaseParts.isoDate),
      currentExpiryDate: 'MISSING',
      currentExpiryDateIst: null,
      currentExpiryDateDisplay: 'MISSING',
      calculatedRemainingDays: 0,
      calculatedDaysRemainingDisplay: 'Missing Expiry Date',
      remainingStatusText: 'Missing Expiry Date',
      configuredValidityDays: null,
      configuredValiditySpanDays: null,
      anomalyType: 'MISSING_EXPIRY_DATE',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: true,
      requiresAdminApprovalToMigrate: true,
      proposedPurchaseDate: purchaseParts.isoDate,
      proposedExpiryDateIf365Days: proposedExpiryIso,
      proposed365ExpiryDateIst: proposedExpiryIso,
      proposed365ExpiryDateDisplay: proposedExpiryDisplay,
      proposedRemainingDaysIf365Days: proposedRemDays,
      proposed365DaysRemaining: proposedRemDays,
    };
  }

  const evalRes = evaluateSubscriptionValidity({
    planPurchasedAt: purchaseParts.isoDate,
    planExpiresAt: expiryParts.isoDate,
    now: nowInput,
  });

  const validitySpan = diffCalendarDaysIst(purchaseParts.isoDate, expiryParts.isoDate) ?? 0;

  if (validitySpan <= 0) {
    const explanation = `Expiry date (${expiryParts.isoDate}) is on or before purchase date (${purchaseParts.isoDate}).`;
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: rawPlan,
      currentPurchaseDate: purchaseParts.isoDate,
      currentPurchaseDateIst: purchaseParts.isoDate,
      currentPurchaseDateDisplay: formatDateIstDisplay(purchaseParts.isoDate),
      currentExpiryDate: expiryParts.isoDate,
      currentExpiryDateIst: expiryParts.isoDate,
      currentExpiryDateDisplay: formatDateIstDisplay(expiryParts.isoDate),
      calculatedRemainingDays: evalRes.daysRemaining,
      calculatedDaysRemainingDisplay: evalRes.daysRemainingDisplay,
      remainingStatusText: evalRes.daysRemainingDisplay,
      configuredValidityDays: validitySpan,
      configuredValiditySpanDays: validitySpan,
      anomalyType: 'INVALID_OR_INCONSISTENT_DATES',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: true,
      requiresAdminApprovalToMigrate: true,
      proposedPurchaseDate: purchaseParts.isoDate,
      proposedExpiryDateIf365Days: proposedExpiryIso,
      proposed365ExpiryDateIst: proposedExpiryIso,
      proposed365ExpiryDateDisplay: proposedExpiryDisplay,
      proposedRemainingDaysIf365Days: proposedRemDays,
      proposed365DaysRemaining: proposedRemDays,
    };
  }

  if (validitySpan < SUBSCRIPTION_VALIDITY_DAYS) {
    const explanation = `Legacy ${validitySpan}-day validity (${purchaseParts.isoDate} → ${expiryParts.isoDate}). Preserved as-is (${evalRes.daysRemaining} days remaining); if approved for 365-day migration from purchase date, new expiry would be ${proposedExpiryIso} (${proposedRemDays} days remaining).`;
    return {
      studentId: student.id,
      studentName: student.name,
      accountRole: role,
      classLevel: student.classLevel,
      plan: rawPlan,
      currentPurchaseDate: purchaseParts.isoDate,
      currentPurchaseDateIst: purchaseParts.isoDate,
      currentPurchaseDateDisplay: formatDateIstDisplay(purchaseParts.isoDate),
      currentExpiryDate: expiryParts.isoDate,
      currentExpiryDateIst: expiryParts.isoDate,
      currentExpiryDateDisplay: formatDateIstDisplay(expiryParts.isoDate),
      calculatedRemainingDays: evalRes.daysRemaining,
      calculatedDaysRemainingDisplay: evalRes.daysRemainingDisplay,
      remainingStatusText: evalRes.daysRemainingDisplay,
      configuredValidityDays: validitySpan,
      configuredValiditySpanDays: validitySpan,
      anomalyType: 'LEGACY_SHORT_VALIDITY',
      anomalyDescription: explanation,
      auditExplanation: explanation,
      needsAdminReview: true,
      requiresAdminApprovalToMigrate: true,
      proposedPurchaseDate: purchaseParts.isoDate,
      proposedExpiryDateIf365Days: proposedExpiryIso,
      proposed365ExpiryDateIst: proposedExpiryIso,
      proposed365ExpiryDateDisplay: proposedExpiryDisplay,
      proposedRemainingDaysIf365Days: proposedRemDays,
      proposed365DaysRemaining: proposedRemDays,
    };
  }

  const explanation = `Valid ${validitySpan}-day subscription (${evalRes.daysRemainingDisplay}).`;
  return {
    studentId: student.id,
    studentName: student.name,
    accountRole: role,
    classLevel: student.classLevel,
    plan: rawPlan,
    currentPurchaseDate: purchaseParts.isoDate,
    currentPurchaseDateIst: purchaseParts.isoDate,
    currentPurchaseDateDisplay: formatDateIstDisplay(purchaseParts.isoDate),
    currentExpiryDate: expiryParts.isoDate,
    currentExpiryDateIst: expiryParts.isoDate,
    currentExpiryDateDisplay: formatDateIstDisplay(expiryParts.isoDate),
    calculatedRemainingDays: evalRes.daysRemaining,
    calculatedDaysRemainingDisplay: evalRes.daysRemainingDisplay,
    remainingStatusText: evalRes.daysRemainingDisplay,
    configuredValidityDays: validitySpan,
    configuredValiditySpanDays: validitySpan,
    anomalyType: 'NONE',
    anomalyDescription: explanation,
    auditExplanation: explanation,
    needsAdminReview: false,
    requiresAdminApprovalToMigrate: false,
    proposedPurchaseDate: purchaseParts.isoDate,
    proposedExpiryDateIf365Days: expiryParts.isoDate,
    proposed365ExpiryDateIst: null,
    proposed365ExpiryDateDisplay: formatDateIstDisplay(expiryParts.isoDate),
    proposedRemainingDaysIf365Days: evalRes.daysRemaining,
    proposed365DaysRemaining: evalRes.daysRemaining,
  };
}
