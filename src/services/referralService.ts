/**
 * Student Knowledge Ambassador & Referral Service (Frontend Client + Direct Firestore Persistence)
 * Guarantees every student receives a permanent, unique referral code and referral link
 * saved in Firebase Firestore against their unique UID, working seamlessly on both
 * mystudyzone.in and preview environments.
 */

import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';
import {
  auth,
  db,
  ensureStudentReferralCodeInFirestore,
  findReferrerByCodeInFirestore,
} from './firebase';
import {
  ADMIN_CACHE_DEFAULT_TTL_MS,
  cachedAdminFetch,
  invalidateAdminCache,
} from './adminCacheService';
import { getLocalSessionHeaders, notifyIfSessionInvalidatedResponse } from './deviceSessionService';

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (res.status === 401) {
      const payload = await res.clone().json().catch(() => null);
      notifyIfSessionInvalidatedResponse(res.status, payload);
    }
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function getBearerAuthHeaders(extraHeaders: Record<string, string> = {}): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    ...getLocalSessionHeaders(),
    ...extraHeaders
  };
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Non-fatal if user is offline or signed out
  }
  return headers;
}
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
  sanitizeReferralCode,
} from '../utils/referralCoding';
import type {
  ReferralAccount,
  ReferralTransaction,
  PayoutRequest,
  ReferralSystemConfig,
  ReferralLeaderboardEntry,
  ReferralUserType,
  ReferralMilestone,
} from '../types/referral';

export type AmbassadorTier = 'None' | 'Bronze' | 'Silver' | 'Gold' | 'Diamond';

export interface ReferralAccountRecord extends ReferralAccount {
  userName: string;
  userRole: 'student' | 'parent' | 'teacher';
  className: string;
  city: string;
  referralLink?: string;
  referredByCode?: string;
  referredByUserId?: string;
  totalInvitesSent: number;
  totalSignups: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
  availableWalletBalance: number;
  withdrawnAmount: number;
  pendingWithdrawalAmount: number;
  freeMonthsEarned: number;
  totalXPBonus: number;
  currentTier: AmbassadorTier;
  unlockedRewards: string[];
}

export interface ReferralTransactionRecord extends ReferralTransaction {
  referrerUserId?: string;
  referrerCode?: string;
  referredUserId?: string;
  referredUserName?: string;
  referredUserClass?: string;
  referredUserMobileMasked?: string;
  planPurchased?: 'none' | 'basic' | 'premium';
  planAmountPaid?: number;
  rewardAmount?: number;
  xpAwarded?: number;
}

export interface ReferralPayoutRequestRecord extends PayoutRequest {
  userRole?: 'student' | 'parent' | 'teacher';
  mobile?: string;
  email?: string;
  payoutMethod?: 'BANK' | 'UPI' | 'SUBSCRIPTION_CREDIT';
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  adminRemarks?: string;
  transactionRefId?: string;
}

export interface AdminStatsResponse {
  success: boolean;
  stats?: {
    totalAmbassadors: number;
    studentAmbassadors: number;
    teacherAmbassadors: number;
    diamondAmbassadors: number;
    totalReferrals?: number;
    successfulReferrals?: number;
    totalCashbackDistributed?: number;
    totalWithdrawalAmount?: number;
    pendingPayouts?: number;
    successfulPayouts?: number;
    failedPayouts?: number;
    totalPaidReferrals: number;
    totalEarnedDistributed: number;
    totalWithdrawn: number;
    totalPendingPayoutAmount: number;
    pendingPayoutCount: number;
    successfulPayoutCount?: number;
    failedPayoutCount?: number;
    pendingTeacherCount: number;
    razorpayxConfigured?: boolean;
    razorpayxTestMode?: boolean;
    config: ReferralSystemConfig;
    recentTransactions: ReferralTransaction[];
    payoutRequests: PayoutRequest[];
    pendingTeachers: ReferralAccount[];
  };
  error?: string;
}

const DEFAULT_STUDENT_MILESTONES: ReferralMilestone[] = [
  {
    id: 'm-stu-5',
    count: 5,
    title: 'Knowledge Ambassador Star',
    rewardType: 'badge',
    rewardDescription: 'Official Knowledge Ambassador Star Badge & Certificate',
    unlocked: false,
  },
  {
    id: 'm-stu-10',
    count: 10,
    title: '30-Day Premium Extension',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 30-Day All-Access Champion Premium Extension',
    unlocked: false,
  },
  {
    id: 'm-stu-25',
    count: 25,
    title: '3-Month Premium Pass',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 90-Day All-Access Champion Premium Pass',
    unlocked: false,
  },
  {
    id: 'm-stu-50',
    count: 50,
    title: 'Diamond Ambassador Crown',
    rewardType: 'badge',
    rewardDescription: 'Diamond Ambassador Trophy & Lifetime Champion Hall of Fame',
    unlocked: false,
  },
];

async function buildFallbackAccountFromFirestore(
  userId: string,
  hint?: {
    userName?: string;
    userType?: ReferralUserType;
    userRole?: 'student' | 'parent' | 'teacher';
    className?: string;
    schoolName?: string;
    city?: string;
    email?: string;
    mobile?: string;
  }
): Promise<{
  account: ReferralAccountRecord;
  transactions: ReferralTransactionRecord[];
  payouts: ReferralPayoutRequestRecord[];
  payoutRequests: ReferralPayoutRequestRecord[];
}> {
  const cleanId = String(userId || '').trim();
  const ensured = await ensureStudentReferralCodeInFirestore(
    cleanId,
    hint?.userName
  );

  let stuData: Record<string, any> | null = null;
  let refData: Record<string, any> | null = null;

  try {
    const [stuSnap, refSnap] = await Promise.all([
      getDoc(doc(db, 'students', cleanId)).catch(() => null),
      getDoc(doc(db, 'referrals', cleanId)).catch(() => null),
    ]);
    if (stuSnap && stuSnap.exists()) stuData = stuSnap.data();
    if (refSnap && refSnap.exists()) refData = refSnap.data();
  } catch {
    // Offline fallback
  }

  const finalCode =
    sanitizeReferralCode(refData?.referralCode) ||
    sanitizeReferralCode(stuData?.referralCode) ||
    ensured.referralCode ||
    generateUniqueStudentReferralCode(cleanId, hint?.userName);
  const finalLink = buildStudentReferralLink(finalCode);

  const availBal = Number(
    refData?.wallet?.availableBalance ?? refData?.availableWalletBalance ?? 0
  );
  const pendBal = Number(
    refData?.wallet?.pendingBalance ?? refData?.pendingWithdrawalAmount ?? 0
  );
  const totEarned = Number(
    refData?.wallet?.totalEarned ?? refData?.totalEarnings ?? 0
  );
  const totWithdrawn = Number(
    refData?.wallet?.totalWithdrawn ?? refData?.withdrawnAmount ?? 0
  );
  const totalClicks = Number(
    refData?.stats?.totalClicks ?? refData?.totalInvitesSent ?? 0
  );
  const totalSignups = Number(
    refData?.stats?.totalSignedUp ?? refData?.totalSignups ?? 0
  );
  const paidCount = Number(
    refData?.stats?.paidReferralsCount ?? refData?.successfulReferrals ?? 0
  );

  const resolvedName =
    refData?.name ||
    refData?.userName ||
    stuData?.name ||
    hint?.userName ||
    'Student Champion';

  const account: ReferralAccountRecord = {
    id: refData?.id || `ref_acc_${cleanId}`,
    userId: cleanId,
    userType: (refData?.userType as ReferralUserType) || hint?.userType || 'student',
    name: resolvedName,
    userName: resolvedName,
    userRole: (refData?.userRole as 'student' | 'parent' | 'teacher') || hint?.userRole || 'student',
    className:
      refData?.className ||
      stuData?.classLevel ||
      hint?.className ||
      'Class 5',
    schoolName:
      refData?.schoolName ||
      stuData?.schoolName ||
      hint?.schoolName ||
      '',
    city: refData?.city || hint?.city || 'Maharashtra',
    email: refData?.email || stuData?.email || hint?.email || '',
    mobile: refData?.mobile || stuData?.mobile || hint?.mobile || '',
    referralCode: finalCode,
    referralLink: finalLink,
    ambassadorCategory: refData?.ambassadorCategory || 'knowledge_ambassador',
    verificationStatus: refData?.verificationStatus || 'NOT_APPLICABLE',
    wallet: {
      availableBalance: availBal,
      pendingBalance: pendBal,
      totalEarned: totEarned,
      totalWithdrawn: totWithdrawn,
      currency: 'INR',
    },
    stats: {
      totalClicks,
      totalSignedUp: totalSignups,
      paidReferralsCount: paidCount,
      plan49Referrals: 0,
      plan99Referrals: paidCount,
    },
    milestones: Array.isArray(refData?.milestones)
      ? refData.milestones
      : DEFAULT_STUDENT_MILESTONES.map((m) => ({
          ...m,
          unlocked: paidCount >= m.count,
        })),
    referredByCode:
      sanitizeReferralCode(refData?.referredByCode) ||
      sanitizeReferralCode(stuData?.referredByCode) ||
      undefined,
    referredByUserId:
      refData?.referredByUserId ||
      stuData?.referredByStudentId ||
      undefined,
    totalInvitesSent: totalClicks,
    totalSignups,
    successfulReferrals: paidCount,
    pendingReferrals: Math.max(0, totalSignups - paidCount),
    totalEarnings: totEarned,
    availableWalletBalance: availBal,
    withdrawnAmount: totWithdrawn,
    pendingWithdrawalAmount: pendBal,
    freeMonthsEarned: Number(refData?.freeMonthsEarned || 0),
    totalXPBonus: Number(refData?.totalXPBonus || paidCount * 200),
    currentTier: (refData?.currentTier as AmbassadorTier) || 'None',
    unlockedRewards: Array.isArray(refData?.unlockedRewards)
      ? refData.unlockedRewards
      : [],
    createdAt:
      refData?.createdAt ||
      stuData?.registeredAt ||
      new Date().toISOString(),
    updatedAt: refData?.updatedAt || new Date().toISOString(),
  };

  return {
    account,
    transactions: [],
    payouts: [],
    payoutRequests: [],
  };
}

export const referralService = {
  async getAccount(
    userId: string,
    userType: ReferralUserType = 'student',
    name = 'Student',
    email = '',
    mobile = '',
    schoolName = ''
  ): Promise<{
    success: boolean;
    account: ReferralAccountRecord;
    transactions: ReferralTransactionRecord[];
    payouts: ReferralPayoutRequestRecord[];
    payoutRequests: ReferralPayoutRequestRecord[];
  }> {
    const cleanId = String(userId || '').trim();
    try {
      const qs = new URLSearchParams({
        userType,
        name,
        email,
        mobile,
        schoolName,
      });
      const res = await fetchWithTimeout(
        `/api/referrals/account/${encodeURIComponent(cleanId)}?${qs.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.account) {
          const ensured = await ensureStudentReferralCodeInFirestore(
            cleanId,
            data.account.name || data.account.userName || name,
            data.account.referralCode
          );
          const resolvedCode =
            sanitizeReferralCode(ensured.referralCode) ||
            sanitizeReferralCode(data.account.referralCode) ||
            generateUniqueStudentReferralCode(cleanId, name);
          const resolvedLink = buildStudentReferralLink(resolvedCode);
          const acc = data.account;
          const availBal = Number(
            acc.wallet?.availableBalance ?? acc.availableWalletBalance ?? 0
          );
          const pendBal = Number(
            acc.wallet?.pendingBalance ?? acc.pendingWithdrawalAmount ?? 0
          );
          const totEarned = Number(
            acc.wallet?.totalEarned ?? acc.totalEarnings ?? 0
          );
          const totWithdrawn = Number(
            acc.wallet?.totalWithdrawn ?? acc.withdrawnAmount ?? 0
          );
          const totalClicks = Number(
            acc.stats?.totalClicks ?? acc.totalInvitesSent ?? 0
          );
          const totalSignups = Number(
            acc.stats?.totalSignedUp ?? acc.totalSignups ?? 0
          );
          const paidCount = Number(
            acc.stats?.paidReferralsCount ?? acc.successfulReferrals ?? 0
          );

          const normalizedAccount: ReferralAccountRecord = {
            ...acc,
            id: acc.id || `ref_acc_${cleanId}`,
            userId: cleanId,
            userType: acc.userType || userType,
            name: acc.name || acc.userName || name,
            userName: acc.userName || acc.name || name,
            userRole: acc.userRole || 'student',
            className: acc.className || 'Class 5',
            schoolName: acc.schoolName || schoolName || '',
            city: acc.city || 'Maharashtra',
            email: acc.email || email,
            mobile: acc.mobile || mobile,
            referralCode: resolvedCode,
            referralLink: resolvedLink,
            ambassadorCategory: acc.ambassadorCategory || 'knowledge_ambassador',
            verificationStatus: acc.verificationStatus || 'NOT_APPLICABLE',
            wallet: acc.wallet || {
              availableBalance: availBal,
              pendingBalance: pendBal,
              totalEarned: totEarned,
              totalWithdrawn: totWithdrawn,
              currency: 'INR',
            },
            stats: acc.stats || {
              totalClicks,
              totalSignedUp: totalSignups,
              paidReferralsCount: paidCount,
              plan49Referrals: 0,
              plan99Referrals: paidCount,
            },
            milestones: Array.isArray(acc.milestones)
              ? acc.milestones
              : DEFAULT_STUDENT_MILESTONES.map((m) => ({
                  ...m,
                  unlocked: paidCount >= m.count,
                })),
            totalInvitesSent: totalClicks,
            totalSignups,
            successfulReferrals: paidCount,
            pendingReferrals: Math.max(0, totalSignups - paidCount),
            totalEarnings: totEarned,
            availableWalletBalance: availBal,
            withdrawnAmount: totWithdrawn,
            pendingWithdrawalAmount: pendBal,
            freeMonthsEarned: Number(acc.freeMonthsEarned || 0),
            totalXPBonus: Number(acc.totalXPBonus || paidCount * 200),
            currentTier: (acc.currentTier as AmbassadorTier) || 'None',
            unlockedRewards: Array.isArray(acc.unlockedRewards)
              ? acc.unlockedRewards
              : [],
            createdAt: acc.createdAt || new Date().toISOString(),
            updatedAt: acc.updatedAt || new Date().toISOString(),
          };

          const payoutsList = data.payoutRequests || data.payouts || [];
          return {
            ...data,
            account: normalizedAccount,
            transactions: data.transactions || [],
            payouts: payoutsList,
            payoutRequests: payoutsList,
          };
        }
      }
    } catch {
      // Fallback to direct Firestore resolution below
    }

    const fallback = await buildFallbackAccountFromFirestore(cleanId, {
      userName: name,
      userType,
      email,
      mobile,
      schoolName,
    });
    return {
      success: true,
      ...fallback,
    };
  },

  async registerAccount(params: {
    userId: string;
    userName?: string;
    name?: string;
    userType?: ReferralUserType;
    userRole?: 'student' | 'parent' | 'teacher';
    className?: string;
    schoolName?: string;
    city?: string;
    email?: string;
    mobile?: string;
  }) {
    const cleanId = String(params.userId || '').trim();
    const resolvedName = params.userName || params.name || 'Student Champion';
    const ensured = await ensureStudentReferralCodeInFirestore(
      cleanId,
      resolvedName
    );

    try {
      const res = await fetchWithTimeout('/api/referrals/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          name: resolvedName,
          userName: resolvedName,
          preferredReferralCode: ensured.referralCode,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.account) {
          return {
            ...data,
            account: {
              ...data.account,
              referralCode: ensured.referralCode,
              referralLink: ensured.referralLink,
            },
          };
        }
      }
    } catch {
      // Fallback to Firestore
    }

    const fallback = await buildFallbackAccountFromFirestore(cleanId, {
      ...params,
      userName: resolvedName,
    });
    return {
      success: true,
      ...fallback,
    };
  },

  async trackSignup(params: {
    newUserId: string;
    newUserName: string;
    newUserRole?: 'student' | 'parent' | 'teacher';
    newUserClass?: string;
    schoolName?: string;
    city?: string;
    email?: string;
    mobile?: string;
    referralCodeUsed?: string;
  }) {
    const cleanNewUserId = String(params.newUserId || '').trim();
    const cleanCodeUsed = sanitizeReferralCode(params.referralCodeUsed);

    const ensuredNewStudent = await ensureStudentReferralCodeInFirestore(
      cleanNewUserId,
      params.newUserName
    );

    let referrerLookup: {
      valid: boolean;
      referrerUserId?: string;
      referrerName?: string;
      referralCode?: string;
      message: string;
    } = { valid: false, message: '' };

    if (cleanCodeUsed && cleanCodeUsed !== ensuredNewStudent.referralCode) {
      referrerLookup = await findReferrerByCodeInFirestore(
        cleanCodeUsed,
        cleanNewUserId
      );
      if (referrerLookup.valid && referrerLookup.referrerUserId) {
        try {
          const [existingStuSnap, existingRefSnap] = await Promise.all([
            getDoc(doc(db, 'students', cleanNewUserId)).catch(() => null),
            getDoc(doc(db, 'referrals', cleanNewUserId)).catch(() => null),
          ]);
          const existingStuRef = sanitizeReferralCode(existingStuSnap?.data()?.referredByCode);
          const existingRefDocRef = sanitizeReferralCode(existingRefSnap?.data()?.referredByCode);

          // Never overwrite an existing user's referral information
          if (!existingStuRef && !existingRefDocRef) {
            await Promise.all([
              setDoc(
                doc(db, 'students', cleanNewUserId),
                {
                  id: cleanNewUserId,
                  referralCode: ensuredNewStudent.referralCode,
                  referralLink: ensuredNewStudent.referralLink,
                  referredByCode: cleanCodeUsed,
                  referredByStudentId: referrerLookup.referrerUserId,
                },
                { merge: true }
              ),
              setDoc(
                doc(db, 'referrals', cleanNewUserId),
                {
                  userId: cleanNewUserId,
                  userName: params.newUserName,
                  userRole: params.newUserRole || 'student',
                  className: params.newUserClass || 'Class 5',
                  referralCode: ensuredNewStudent.referralCode,
                  referralLink: ensuredNewStudent.referralLink,
                  referredByCode: cleanCodeUsed,
                  referredByUserId: referrerLookup.referrerUserId,
                  updatedAt: new Date().toISOString(),
                },
                { merge: true }
              ),
            ]);
          }
        } catch {
          // Non-fatal
        }
      }
    }

    try {
      const res = await fetchWithTimeout('/api/referrals/track-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback response if API route is offline
    }

    return {
      success: Boolean(referrerLookup.valid),
      message:
        referrerLookup.message ||
        (cleanCodeUsed
          ? 'Referral recorded in Firestore.'
          : 'Student referral account initialized.'),
      referrerName: referrerLookup.referrerName,
      referrerUserId: referrerLookup.referrerUserId,
    };
  },

  async validateCode(referralCode: string, currentUserId?: string) {
    const cleanCode = sanitizeReferralCode(referralCode);
    if (!cleanCode) {
      return {
        valid: false,
        error: 'Please enter a valid referral code.',
        message: 'Please enter a valid referral code.',
      };
    }

    try {
      const res = await fetchWithTimeout('/api/referrals/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: cleanCode,
          referralCode: cleanCode,
          currentUserId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (
          data?.valid ||
          (data?.message && data.message.toLowerCase().includes('self-referral')) ||
          (data?.error && data.error.toLowerCase().includes('self-referral'))
        ) {
          return data;
        }
      }
    } catch {
      // Fallback to Firestore lookup below
    }

    return findReferrerByCodeInFirestore(cleanCode, currentUserId);
  },

  async recordInviteClick(userId: string) {
    try {
      const res = await fetchWithTimeout('/api/referrals/invite-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      }, 4000);
      if (res.ok) return await res.json();
    } catch {
      // Ignore network notice on click telemetry
    }
    return { success: true };
  },

  async requestPayout(params: {
    userId: string;
    amount: number;
    method?: 'UPI' | 'BANK';
    payoutMethod?: 'BANK' | 'UPI';
    upiId?: string;
    bankDetails?: {
      accountHolderName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
    };
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankIfsc?: string;
  }) {
    const headers = await getBearerAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetchWithTimeout('/api/referrals/payout-request', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...params,
        method: params.method || params.payoutMethod || 'BANK',
      }),
    });
    return res.json();
  },

  async submitTeacherVerification(params: {
    userId: string;
    schoolName: string;
    teacherIdNumber?: string;
    credentialsDocUrl?: string;
  }) {
    const headers = await getBearerAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetchWithTimeout('/api/referrals/teacher-verify', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async getLeaderboard(): Promise<{
    success: boolean;
    students: ReferralLeaderboardEntry[];
    teachers: ReferralLeaderboardEntry[];
    diamonds: ReferralLeaderboardEntry[];
    leaderboard: any[];
  }> {
    try {
      const res = await fetchWithTimeout('/api/referrals/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data?.success) {
          return {
            success: true,
            students: data.students || [],
            teachers: data.teachers || [],
            diamonds: data.diamonds || [],
            leaderboard: data.leaderboard || data.students || [],
          };
        }
      }
    } catch {
      // Fallback to Firestore leaderboard
    }

    try {
      const snap = await getDocs(query(collection(db, 'referrals'), limit(20)));
      const students: ReferralLeaderboardEntry[] = snap.docs
        .map((d) => d.data())
        .sort(
          (a, b) =>
            Number(b.successfulReferrals || 0) - Number(a.successfulReferrals || 0)
        )
        .slice(0, 10)
        .map((acc, idx) => ({
          rank: idx + 1,
          userId: acc.userId,
          name: acc.userName || acc.name || 'Student Champion',
          userType: 'student',
          ambassadorCategory: 'knowledge_ambassador',
          paidReferralsCount: Number(acc.successfulReferrals || 0),
          paidReferrals: Number(acc.successfulReferrals || 0),
          totalEarned: Number(acc.totalEarnings || 0),
          schoolName: acc.schoolName || '',
          badge: '🎁 Knowledge Ambassador',
        }));
      return {
        success: true,
        students,
        teachers: [],
        diamonds: [],
        leaderboard: students,
      };
    } catch {
      return {
        success: true,
        students: [],
        teachers: [],
        diamonds: [],
        leaderboard: [],
      };
    }
  },

  async getAdminStats(forceRefresh: boolean = false): Promise<AdminStatsResponse> {
    return cachedAdminFetch(
      'admin:referral_stats',
      async () => {
        const headers = await getBearerAuthHeaders();
        const res = await fetchWithTimeout('/api/referrals/admin/stats', { headers });
        return res.json();
      },
      { ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS, forceRefresh }
    );
  },

  async reviewTeacher(
    userId: string,
    status: 'VERIFIED' | 'REJECTED',
    notes?: string
  ) {
    const headers = await getBearerAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetchWithTimeout('/api/referrals/admin/verify-teacher', {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId, status, notes }),
    });
    invalidateAdminCache('admin:referral_stats');
    return res.json();
  },

  async processPayout(
    payoutId: string,
    action: 'APPROVE' | 'REJECT',
    transactionRef?: string,
    notes?: string
  ) {
    const headers = await getBearerAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetchWithTimeout('/api/referrals/admin/payout-action', {
      method: 'POST',
      headers,
      body: JSON.stringify({ payoutId, action, transactionRef, notes }),
    });
    invalidateAdminCache('admin:referral_stats');
    return res.json();
  },

  async updateConfig(updates: Partial<ReferralSystemConfig>) {
    const headers = await getBearerAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetchWithTimeout('/api/referrals/admin/update-config', {
      method: 'POST',
      headers,
      body: JSON.stringify(updates),
    });
    invalidateAdminCache('admin:referral_stats');
    return res.json();
  },

  async getAdminAll(forceRefresh: boolean = false) {
    return this.getAdminStats(forceRefresh);
  },
};
