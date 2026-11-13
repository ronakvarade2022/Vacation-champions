import { StudentProfile, SubjectName } from '../types';

export type SubscriptionPlanId = 'free' | 'basic' | 'premium';

export const FREE_ALLOWED_SUBJECTS: SubjectName[] = ['English', 'Mathematics'];

export type DashboardFeatureKey =
  | 'dashboard'
  | 'profile'
  | 'demo'
  | 'puzzles'
  | 'sudoku'
  | 'quizzes'
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

export const SUBSCRIPTION_PLANS_CATALOG = [
  {
    id: 'free' as const,
    title: 'FREE PLAN',
    fullLabel: 'FREE PLAN – ₹0 – Lifetime',
    priceInr: 0,
    priceText: '₹0',
    validityText: 'Lifetime',
    validitySubtext: 'Never Expires',
    summary: 'Brain Puzzles, Sudoku (4×4, 6×6, 9×9), English & Mathematics Quizzes',
  },
  {
    id: 'premium' as const,
    title: 'PREMIUM PLAN',
    fullLabel: 'PREMIUM PLAN – ₹99 – 90 Days',
    priceInr: 99,
    priceText: '₹99',
    validityText: '90 Days',
    validitySubtext: '3 Months Validity',
    summary: 'Full Dashboard Unlock: All 14 Subjects, Stories, Drawing, Cricket, Scholarship (4th & 7th), AI Academy, Certificates & Referrals',
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
  expiredPlanName?: string;
  isLifetimeFree: boolean;
  expiryDisplay: string;
  daysRemaining: number | null;
  daysRemainingDisplay: string;
  statusLabel: 'ACTIVE' | 'EXPIRED';
}

/**
 * Computes the effective active subscription plan for a student.
 * - Free Plan ('free') is Lifetime and NEVER expires.
 * - Premium Plan ('premium' ₹99) has 90 Days (3 Months) validity.
 * - After a paid subscription expires, the student automatically retains the Free Plan (Lifetime)
 *   with a clear option to renew their ₹99 Premium Plan.
 */
export function getStudentPlanInfo(student: StudentProfile | null | undefined): PlanAccessInfo {
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
      isLifetimeFree: true,
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
      isLifetimeFree: true,
      expiryDisplay: 'Lifetime (Never Expires)',
      daysRemaining: null,
      daysRemainingDisplay: 'Lifetime (Never Expires)',
      statusLabel: 'ACTIVE'
    };
  }

  // Paid plan: verify if expired (end of expiry day in local time)
  const now = new Date();
  let expiry: Date | null = null;
  if (student.planExpiresAt) {
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(student.planExpiresAt.trim());
    if (isoMatch) {
      expiry = new Date(
        Number(isoMatch[1]),
        Number(isoMatch[2]) - 1,
        Number(isoMatch[3]),
        23,
        59,
        59,
        999
      );
    } else {
      const parsed = new Date(student.planExpiresAt);
      if (!isNaN(parsed.getTime())) {
        parsed.setHours(23, 59, 59, 999);
        expiry = parsed;
      }
    }
  }
  const isExpired = expiry ? expiry.getTime() < now.getTime() : false;

  if (isExpired) {
    const expiredPlanName = 'PREMIUM PLAN (₹99 – 90 Days)';
    return {
      effectivePlan: 'free',
      storedPlan: 'premium',
      planDisplayName: 'FREE PLAN – ₹0 – Lifetime',
      planFullHeader: `FREE PLAN – ₹0 – Lifetime (${expiredPlanName} Expired)`,
      planShortBadge: 'Free Plan (Renew ₹99 Premium)',
      priceLabel: '₹0 (Free Active)',
      validityPeriodLabel: 'Lifetime (Premium Plan Expired)',
      isPaidPlanExpired: true,
      expiredPlanName,
      isLifetimeFree: true,
      expiryDisplay: `Expired on ${student.planExpiresAt} • Free Plan Active`,
      daysRemaining: 0,
      daysRemainingDisplay: '0 Days (Free Plan Active • Renew ₹99 Premium Anytime)',
      statusLabel: 'EXPIRED'
    };
  }

  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  const daysRemaining = expiry
    ? Math.max(
        1,
        Math.round((expiry.getTime() - todayEnd.getTime()) / (1000 * 60 * 60 * 24))
      )
    : 90;

  return {
    effectivePlan: 'premium',
    storedPlan: 'premium',
    planDisplayName: 'PREMIUM PLAN – ₹99 – 90 Days',
    planFullHeader: 'PREMIUM PLAN – ₹99 – 90 Days',
    planShortBadge: 'Premium Plan (₹99 • 90d)',
    priceLabel: '₹99',
    validityPeriodLabel: '90 Days (3 Months)',
    isPaidPlanExpired: false,
    isLifetimeFree: false,
    expiryDisplay: student.planExpiresAt || 'Active (90 Days)',
    daysRemaining,
    daysRemainingDisplay: `${daysRemaining} Days Remaining (of 90 Days)`,
    statusLabel: 'ACTIVE'
  };
}

/**
 * Checks whether a specific Subject is unlocked for the student's current plan.
 * - Free Plan: ONLY English and Mathematics
 * - Premium Plan (₹99): All 14 Subjects
 */
export function canAccessSubject(
  student: StudentProfile | null | undefined,
  subject: SubjectName
): { allowed: boolean; requiredPlan: 'basic' | 'premium'; reason?: string } {
  const { effectivePlan } = getStudentPlanInfo(student);

  if (effectivePlan === 'premium' || effectivePlan === 'basic') {
    return { allowed: true, requiredPlan: 'premium' };
  }

  // Free Plan: Only English and Mathematics
  if (FREE_ALLOWED_SUBJECTS.includes(subject)) {
    return { allowed: true, requiredPlan: 'premium' };
  }

  return {
    allowed: false,
    requiredPlan: 'premium',
    reason: `${subject} is locked on the Free Plan. Upgrade to the Premium Plan (₹99 – 90 Days) to unlock all 14 subjects and subject-wise quizzes!`
  };
}

/**
 * Checks whether a dashboard tab/feature is accessible for the student's current plan.
 * - FREE PLAN (₹0 Lifetime):
 *   Brain Puzzles ('puzzles'), Sudoku ('sudoku'), English & Mathematics ('quizzes'),
 *   plus 'dashboard', 'profile', 'demo', 'referrals'
 * - PREMIUM PLAN (₹99 – 90 Days):
 *   EVERYTHING on the entire application dashboard ('shivaji', 'stories', 'drawing',
 *   'cricket', 'scholarship', 'future-skills', 'ai-academy', 'certificates', 'leaderboard', 'referrals', etc.)
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

  // Always accessible tabs (including Referral & Wallet Hub so students can view their referral code, ₹5 cashback, and withdraw money)
  if (
    featureTab === 'dashboard' ||
    featureTab === 'profile' ||
    featureTab === 'demo' ||
    featureTab === 'puzzles' ||
    featureTab === 'sudoku' ||
    featureTab === 'quizzes' ||
    featureTab === 'referrals'
  ) {
    return {
      allowed: true,
      requiredPlan: 'premium',
      featureTitle: 'Core Feature',
      upgradeMessage: ''
    };
  }

  // Premium Plan (₹99) Features:
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
    upgradeMessage: `${featureTitle} is unlocked with the Premium Plan (₹99 – 90 Days), which gives you complete access to all 14 subjects and every feature on the dashboard!`
  };
}
