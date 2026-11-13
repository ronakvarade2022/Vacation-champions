import type { 
  ReferralAccount, 
  ReferralTransaction, 
  PayoutRequest, 
  ReferralSystemConfig, 
  ReferralLeaderboardEntry,
  ReferralMilestone,
  ReferralUserType,
  AmbassadorCategory
} from '../types/referral.ts';
import { serverDb } from '../../firebase/index.ts';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { dispatchRazorpayXPayout, getResolvedRazorpayXCredentials } from './razorpayxPayoutService.ts';
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
  sanitizeReferralCode,
} from '../utils/referralCoding.ts';

export const STUDENT_DEFAULT_MILESTONES: ReferralMilestone[] = [
  {
    id: 'm-stu-5',
    count: 5,
    title: 'Knowledge Ambassador Star',
    rewardType: 'badge',
    rewardDescription: 'Official Knowledge Ambassador Star Badge & Certificate',
    unlocked: false
  },
  {
    id: 'm-stu-10',
    count: 10,
    title: '30-Day Premium Extension',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 30-Day All-Access Champion Premium Extension',
    unlocked: false
  },
  {
    id: 'm-stu-25',
    count: 25,
    title: '3-Month Premium Pass',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 90-Day All-Access Champion Premium Pass',
    unlocked: false
  },
  {
    id: 'm-stu-50',
    count: 50,
    title: 'Diamond Ambassador Crown',
    rewardType: 'badge',
    rewardDescription: 'Diamond Ambassador Trophy & Lifetime Champion Hall of Fame',
    unlocked: false
  }
];

export const TEACHER_DEFAULT_MILESTONES: ReferralMilestone[] = [
  {
    id: 'm-tch-5',
    count: 5,
    title: 'Educator Achievement Badge',
    rewardType: 'badge',
    rewardDescription: 'Official Educator Excellence Pioneer Badge',
    unlocked: false
  },
  {
    id: 'm-tch-10',
    count: 10,
    title: '1-Month Classroom Premium',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 30-Day Premium Pass for Classroom Teaching',
    unlocked: false
  },
  {
    id: 'm-tch-25',
    count: 25,
    title: '3-Month Classroom Premium',
    rewardType: 'subscription_extension',
    rewardDescription: 'Free 90-Day Premium Pass with Special School Perks',
    unlocked: false
  },
  {
    id: 'm-tch-50',
    count: 50,
    title: 'Gold Educator Star Badge',
    rewardType: 'badge',
    rewardDescription: 'Gold Educator Medal & State-Level Mentor Honor',
    unlocked: false
  },
  {
    id: 'm-tch-100',
    count: 100,
    title: 'Excellence in Teaching Certificate',
    rewardType: 'certificate',
    rewardDescription: 'Distinguished State Educator Excellence Certificate (Printable/Downloadable)',
    unlocked: false
  }
];

// Persistent Stores (Synced with Firestore: /referrals, /referral_transactions, /payout_requests)
export const referralAccounts = new Map<string, ReferralAccount>();
export const referralCodeIndex = new Map<string, string>(); // UPPERCASE Code -> userId
export const referralTransactions: ReferralTransaction[] = [];
export const payoutRequests: PayoutRequest[] = [];

// Referral configuration: Premium Plan ₹99 -> ₹5 cashback, Min withdrawal: ₹50
export const referralConfig: ReferralSystemConfig = {
  programEnabled: true,
  budgetCap: 50000,
  currentBudgetSpent: 1250,
  plan49ReferrerReward: 0,
  plan49BuyerReward: 0,
  plan99ReferrerReward: 5, // ₹5 Referrer Cashback on Premium Plan (₹99)
  plan99BuyerReward: 5,    // ₹5 Buyer Cashback on Premium Plan (₹99)
  minPayoutAmount: 50,     // ₹50 Minimum Withdrawal
  fraudDetectionStrict: true
};

// Generates a unique, permanent referral code per student UID (never shared across students)
export function generateReferralCode(userType: ReferralUserType, name: string, userId: string): string {
  if (userType === 'teacher') {
    const cleanName = name
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 6) || 'TEACH';
    const suffix = (userId.replace(/[^0-9]/g, '').slice(-3)) || Math.floor(100 + Math.random() * 900).toString();
    return `VC-TCH-${cleanName}${suffix}`;
  }
  return generateUniqueStudentReferralCode(userId, name, referralCodeIndex.keys());
}

/**
 * Normalizes a ReferralAccount so it satisfies both server ReferralAccount and client ReferralAccountRecord interfaces
 */
export function normalizeReferralAccountForClient(account: ReferralAccount & Record<string, any>) {
  const code =
    sanitizeReferralCode(account.referralCode) ||
    generateUniqueStudentReferralCode(account.userId, account.name, referralCodeIndex.keys());
  const link = buildStudentReferralLink(code);
  const paidCount = Number(account.stats?.paidReferralsCount ?? account.successfulReferrals ?? 0);
  const totalSignups = Number(account.stats?.totalSignedUp ?? account.totalSignups ?? 0);
  const totalClicks = Number(account.stats?.totalClicks ?? account.totalInvitesSent ?? 0);
  const availBal = Number(account.wallet?.availableBalance ?? account.availableWalletBalance ?? 0);
  const pendBal = Number(account.wallet?.pendingBalance ?? account.pendingWithdrawalAmount ?? 0);
  const totEarned = Number(account.wallet?.totalEarned ?? account.totalEarnings ?? 0);
  const totWithdrawn = Number(account.wallet?.totalWithdrawn ?? account.withdrawnAmount ?? 0);

  let tier: 'None' | 'Bronze' | 'Silver' | 'Gold' | 'Diamond' = 'None';
  if (paidCount >= 50 || account.ambassadorCategory === 'diamond_ambassador') tier = 'Diamond';
  else if (paidCount >= 25) tier = 'Gold';
  else if (paidCount >= 10) tier = 'Silver';
  else if (paidCount >= 5) tier = 'Bronze';

  return {
    ...account,
    userId: account.userId,
    name: account.name || account.userName || 'Student Champion',
    userName: account.userName || account.name || 'Student Champion',
    userRole: account.userRole || (account.userType === 'teacher' ? 'parent' : 'student'),
    className: account.className || 'Class 5',
    schoolName: account.schoolName || '',
    city: account.city || 'Maharashtra',
    email: account.email || '',
    mobile: account.mobile || '',
    referralCode: code,
    referralLink: link,
    totalInvitesSent: totalClicks,
    totalSignups,
    successfulReferrals: paidCount,
    pendingReferrals: Math.max(0, totalSignups - paidCount),
    totalEarnings: totEarned,
    availableWalletBalance: availBal,
    withdrawnAmount: totWithdrawn,
    pendingWithdrawalAmount: pendBal,
    freeMonthsEarned: paidCount >= 25 ? 3 : paidCount >= 10 ? 1 : 0,
    totalXPBonus: paidCount * 200,
    currentTier: tier,
    unlockedRewards: (account.milestones || []).filter((m: any) => m.unlocked).map((m: any) => m.title),
  };
}

/**
 * Persists an account record directly to Firestore: /referrals/{userId} AND /students/{userId}
 */
export async function saveAccountToFirestore(account: ReferralAccount): Promise<void> {
  const normalized = normalizeReferralAccountForClient(account);
  try {
    const docRef = doc(serverDb, 'referrals', account.userId);
    await setDoc(docRef, {
      ...normalized,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn(`[Firestore Sync Notice] referrals/${account.userId}:`, (err as Error)?.message || err);
  }

  if (account.userType === 'student') {
    try {
      const stuRef = doc(serverDb, 'students', account.userId);
      await setDoc(
        stuRef,
        {
          id: account.userId,
          referralCode: normalized.referralCode,
          referralLink: normalized.referralLink,
        },
        { merge: true }
      );
    } catch {
      // Non-fatal
    }
  }
}

/**
 * Persists a transaction directly to Firestore: /referral_transactions/{transactionId}
 */
export async function saveTransactionToFirestore(tx: ReferralTransaction): Promise<void> {
  try {
    const docRef = doc(serverDb, 'referral_transactions', tx.id);
    await setDoc(docRef, {
      ...tx,
      savedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn(`[Firestore Sync Notice] referral_transactions/${tx.id}:`, (err as Error)?.message || err);
  }
}

/**
 * Persists a payout request directly to Firestore: /payout_requests/{payoutId}
 */
export async function savePayoutToFirestore(payout: PayoutRequest): Promise<void> {
  try {
    const docRef = doc(serverDb, 'payout_requests', payout.id);
    await setDoc(docRef, {
      ...payout,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn(`[Firestore Sync Notice] payout_requests/${payout.id}:`, (err as Error)?.message || err);
  }
}

// Get or initialize a referral profile with Firestore check (preserves permanent referralCode)
export async function getOrCreateReferralAccount(
  userId: string,
  userType: ReferralUserType = 'student',
  name = 'Student',
  email = '',
  mobile = '',
  schoolName = '',
  preferredReferralCode?: string
): Promise<ReferralAccount> {
  const cleanUserId = String(userId || '').trim();

  // 1. Check in-memory cache
  const cached = referralAccounts.get(cleanUserId);
  if (cached) {
    if (name && name !== 'Student' && name !== 'Champion' && cached.name === 'Student Champion') {
      cached.name = name;
    }
    if (email && !cached.email) cached.email = email;
    if (mobile && !cached.mobile) cached.mobile = mobile;
    if (cached.referralCode) {
      referralCodeIndex.set(cached.referralCode.toUpperCase(), cleanUserId);
    }
    return normalizeReferralAccountForClient(cached);
  }

  // 2. Check Firestore /referrals/{userId} and /students/{userId}
  let storedStudentData: Record<string, any> | null = null;
  try {
    const [refSnap, stuSnap] = await Promise.all([
      getDoc(doc(serverDb, 'referrals', cleanUserId)).catch(() => null),
      getDoc(doc(serverDb, 'students', cleanUserId)).catch(() => null),
    ]);

    if (stuSnap && stuSnap.exists()) {
      storedStudentData = stuSnap.data();
    }

    if (refSnap && refSnap.exists()) {
      const data = refSnap.data() as ReferralAccount & Record<string, any>;
      const existingCode =
        sanitizeReferralCode(data.referralCode) ||
        sanitizeReferralCode(storedStudentData?.referralCode) ||
        generateReferralCode(userType, data.name || data.userName || name, cleanUserId);

      const hydrated: ReferralAccount = normalizeReferralAccountForClient({
        ...data,
        id: data.id || `ref_acc_${cleanUserId}`,
        userId: cleanUserId,
        userType: data.userType || userType,
        name: data.name || data.userName || storedStudentData?.name || name || 'Student Champion',
        email: data.email || storedStudentData?.email || email || '',
        mobile: data.mobile || storedStudentData?.mobile || mobile || '',
        referralCode: existingCode,
        ambassadorCategory: data.ambassadorCategory || 'knowledge_ambassador',
        verificationStatus: data.verificationStatus || 'NOT_APPLICABLE',
        wallet: data.wallet || {
          availableBalance: Number(data.availableWalletBalance || 0),
          pendingBalance: Number(data.pendingWithdrawalAmount || 0),
          totalEarned: Number(data.totalEarnings || 0),
          totalWithdrawn: Number(data.withdrawnAmount || 0),
          currency: 'INR',
        },
        stats: data.stats || {
          totalClicks: Number(data.totalInvitesSent || 0),
          totalSignedUp: Number(data.totalSignups || 0),
          paidReferralsCount: Number(data.successfulReferrals || 0),
          plan49Referrals: 0,
          plan99Referrals: Number(data.successfulReferrals || 0),
        },
        milestones: Array.isArray(data.milestones)
          ? data.milestones
          : STUDENT_DEFAULT_MILESTONES.map((m) => ({ ...m })),
        createdAt: data.createdAt || storedStudentData?.registeredAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      });

      referralAccounts.set(cleanUserId, hydrated);
      referralCodeIndex.set(existingCode.toUpperCase(), cleanUserId);
      return hydrated;
    }
  } catch (err) {
    console.log(`[Firestore Account Lookup Notice] for ${cleanUserId}:`, (err as Error)?.message || err);
  }

  // 3. Determine unique permanent code (use stored student doc code if present, else generate unique code)
  const storedCodeFromStudent = sanitizeReferralCode(storedStudentData?.referralCode);
  const cleanPreferred = sanitizeReferralCode(preferredReferralCode);
  let code =
    storedCodeFromStudent ||
    (cleanPreferred && !referralCodeIndex.has(cleanPreferred) ? cleanPreferred : '') ||
    generateReferralCode(userType, storedStudentData?.name || name, cleanUserId);

  // Guarantee uniqueness across students
  const existingOwner = referralCodeIndex.get(code.toUpperCase());
  if (existingOwner && existingOwner !== cleanUserId) {
    code = generateUniqueStudentReferralCode(cleanUserId, name, referralCodeIndex.keys());
  }

  const now = new Date().toISOString();
  let category: AmbassadorCategory = 'knowledge_ambassador';
  if (userType === 'teacher') category = 'educator_excellence';

  const milestonesClone: ReferralMilestone[] = (
    userType === 'teacher' ? TEACHER_DEFAULT_MILESTONES : STUDENT_DEFAULT_MILESTONES
  ).map((m) => ({ ...m }));

  const newAccount: ReferralAccount = normalizeReferralAccountForClient({
    id: `ref_acc_${cleanUserId}`,
    userId: cleanUserId,
    userType,
    name: storedStudentData?.name || (name && name !== 'Champion' ? name : 'Student Champion'),
    email: storedStudentData?.email || email,
    mobile: storedStudentData?.mobile || mobile,
    referralCode: code,
    ambassadorCategory: category,
    schoolName: schoolName || storedStudentData?.schoolName || (userType === 'teacher' ? 'Vidya Mandir School' : undefined),
    verificationStatus: userType === 'teacher' ? 'PENDING' : 'NOT_APPLICABLE',
    wallet: {
      availableBalance: 0,
      pendingBalance: 0,
      totalEarned: 0,
      totalWithdrawn: 0,
      currency: 'INR',
    },
    stats: {
      totalClicks: 0,
      totalSignedUp: 0,
      paidReferralsCount: 0,
      plan49Referrals: 0,
      plan99Referrals: 0,
    },
    milestones: milestonesClone,
    createdAt: storedStudentData?.registeredAt || now,
    updatedAt: now,
  });

  referralAccounts.set(cleanUserId, newAccount);
  referralCodeIndex.set(code.toUpperCase(), cleanUserId);

  // Sync permanently to Firestore (/referrals/{userId} and /students/{userId})
  await saveAccountToFirestore(newAccount);
  return newAccount;
}

// Track referral code signup during student registration (records who referred the new student & prevents self/invalid referrals)
export async function trackReferralSignup(
  referralCode: string,
  newStudentId: string,
  newStudentName = 'Student',
  newStudentClass = 'Class 5',
  newStudentMobile = ''
) {
  const cleanCode = sanitizeReferralCode(referralCode);
  const cleanNewId = String(newStudentId || '').trim();
  if (!cleanCode) return { tracked: false, reason: 'Empty or invalid referral code.' };

  // Ensure the new student's own referral account is initialized with their unique code
  const newStudentAcc = await getOrCreateReferralAccount(cleanNewId, 'student', newStudentName);

  // Prevent self-referral
  if (cleanCode === newStudentAcc.referralCode.toUpperCase()) {
    return { tracked: false, reason: 'Self-referral is prohibited. You cannot use your own referral code.' };
  }

  let referrerUserId = referralCodeIndex.get(cleanCode);
  if (!referrerUserId) {
    // Check Firestore for referrer
    try {
      const q = query(collection(serverDb, 'referrals'), where('referralCode', '==', cleanCode), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        referrerUserId = String(snap.docs[0].data().userId || snap.docs[0].id);
        referralCodeIndex.set(cleanCode, referrerUserId);
      }
    } catch {
      // Ignore
    }
  }

  if (!referrerUserId || referrerUserId === cleanNewId) {
    return { tracked: false, reason: 'Invalid or self referral code.' };
  }

  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return { tracked: false, reason: 'Referrer account not found.' };
  }

  // Prevent duplicate signup attribution for the same newStudentId
  const alreadySignedUp = referralTransactions.some(
    (t) => t.buyerStudentId === cleanNewId && t.referrerId === referrer.userId
  );
  if (!alreadySignedUp) {
    referrer.stats.totalSignedUp += 1;
    referrer.stats.totalClicks += 1;
    referrer.updatedAt = new Date().toISOString();

    (newStudentAcc as any).referredByCode = cleanCode;
    (newStudentAcc as any).referredByUserId = referrer.userId;
    referralAccounts.set(cleanNewId, newStudentAcc);

    const signupTx: ReferralTransaction = {
      id: `ref_signup_${cleanNewId}`,
      referralCode: cleanCode,
      referrerId: referrer.userId,
      referrerName: referrer.name,
      referrerType: referrer.userType,
      buyerStudentId: cleanNewId,
      buyerStudentName: newStudentName,
      buyerPlan: 'premium',
      planAmount: 0,
      referrerReward: 0,
      buyerReward: 0,
      orderId: '',
      paymentId: '',
      status: 'PENDING',
      description: `${newStudentName} (${newStudentClass}) registered using referral link ?ref=${cleanCode}. Cashback unlocks after ₹99 Premium upgrade.`,
      createdAt: new Date().toISOString(),
    };
    referralTransactions.unshift(signupTx);
    await Promise.all([
      saveAccountToFirestore(referrer),
      saveTransactionToFirestore(signupTx),
      setDoc(
        doc(serverDb, 'students', cleanNewId),
        {
          id: cleanNewId,
          referredByCode: cleanCode,
          referredByStudentId: referrer.userId,
        },
        { merge: true }
      ).catch(() => {}),
      setDoc(
        doc(serverDb, 'referrals', cleanNewId),
        {
          userId: cleanNewId,
          referredByCode: cleanCode,
          referredByUserId: referrer.userId,
        },
        { merge: true }
      ).catch(() => {}),
    ]);
  }

  return {
    tracked: true,
    referrerId: referrer.userId,
    referrerUserId: referrer.userId,
    referrerName: referrer.name,
    referralCode: referrer.referralCode,
    message: `Referred by ${referrer.name} (${referrer.referralCode})`,
  };
}

// Process a verified paid purchase attribution with Firebase Firestore persistence
export async function processReferralPurchase(params: {
  referralCode: string;
  buyerStudentId: string;
  buyerStudentName: string;
  buyerEmail: string;
  buyerMobile: string;
  planId: 'basic' | 'premium';
  orderId: string;
  paymentId: string;
}) {
  if (!referralConfig.programEnabled) {
    return { credited: false, reason: 'The referral rewards program is temporarily paused.' };
  }

  const cleanCode = params.referralCode.trim().toUpperCase();
  let referrerUserId = referralCodeIndex.get(cleanCode);

  // If not indexed in memory, search in referralAccounts
  if (!referrerUserId) {
    for (const [uid, acc] of referralAccounts.entries()) {
      if (acc.referralCode && acc.referralCode.toUpperCase() === cleanCode) {
        referrerUserId = uid;
        referralCodeIndex.set(cleanCode, uid);
        break;
      }
    }
  }

  if (!referrerUserId) {
    return { credited: false, reason: 'Invalid or unrecognized referral code.' };
  }

  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return { credited: false, reason: 'Referrer profile not found.' };
  }

  // FRAUD DETECTION 1: Self-Referral Prevention
  if (
    referrer.userId === params.buyerStudentId ||
    (referrer.email && params.buyerEmail && referrer.email.toLowerCase() === params.buyerEmail.toLowerCase()) ||
    (referrer.mobile && params.buyerMobile && referrer.mobile === params.buyerMobile)
  ) {
    console.warn(`[Referral Security] Blocked self-referral attempt by ${params.buyerStudentId} using code ${cleanCode}`);
    return { credited: false, reason: 'Self-referral is prohibited. You cannot use your own referral code.' };
  }

  // FRAUD DETECTION 2: Duplicate Reward Prevention for same paymentId or same student on same plan
  const alreadyReferred = referralTransactions.find(
    t => (t.paymentId === params.paymentId || (t.buyerStudentId === params.buyerStudentId && t.buyerPlan === params.planId)) && t.status === 'CREDITED'
  );
  if (alreadyReferred) {
    console.warn(`[Referral Security] Duplicate referral reward skipped for student ${params.buyerStudentId} / Payment: ${params.paymentId}`);
    return { credited: false, reason: 'Referral reward has already been granted for this purchase.' };
  }

  // Exact Cashback Amounts per User Request:
  // Premium Plan ₹99: Referrer receives ₹5, Buyer receives ₹5
  const isPremium = true;
  const referrerReward = referralConfig.plan99ReferrerReward;
  const buyerReward = referralConfig.plan99BuyerReward;
  const planAmount = 99;

  // Check budget cap
  if (referralConfig.currentBudgetSpent + referrerReward + buyerReward > referralConfig.budgetCap) {
    console.warn('[Referral Budget] Referral reward skipped: monthly campaign budget cap reached.');
    return { credited: false, reason: 'Monthly reward budget pool reached.' };
  }

  // 1. Credit Referrer Wallet
  referrer.wallet.availableBalance += referrerReward;
  referrer.wallet.totalEarned += referrerReward;
  referrer.stats.paidReferralsCount += 1;
  if (isPremium) {
    referrer.stats.plan99Referrals += 1;
  } else {
    referrer.stats.plan49Referrals += 1;
  }

  // 2. Check and unlock Referrer milestones
  referrer.milestones.forEach(m => {
    if (!m.unlocked && referrer.stats.paidReferralsCount >= m.count) {
      m.unlocked = true;
      m.unlockedAt = new Date().toISOString();
      console.log(`[Referral Milestone Unlocked] Referrer ${referrer.name} unlocked ${m.title}!`);
    }
  });

  // Promote to Diamond Ambassador if 50+ paid referrals
  if (referrer.stats.paidReferralsCount >= 50 && referrer.ambassadorCategory !== 'diamond_ambassador') {
    referrer.ambassadorCategory = 'diamond_ambassador';
    console.log(`[Referral Promotion] ${referrer.name} promoted to 💎 DIAMOND AMBASSADOR!`);
  }

  // 3. Credit Buyer Wallet
  const buyerAccount = await getOrCreateReferralAccount(
    params.buyerStudentId,
    'student',
    params.buyerStudentName,
    params.buyerEmail,
    params.buyerMobile
  );
  buyerAccount.wallet.availableBalance += buyerReward;
  buyerAccount.wallet.totalEarned += buyerReward;

  // 4. Create and record ReferralTransaction
  const transaction: ReferralTransaction = {
    id: `ref_tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    referralCode: cleanCode,
    referrerId: referrer.userId,
    referrerName: referrer.name,
    referrerType: referrer.userType,
    buyerStudentId: params.buyerStudentId,
    buyerStudentName: params.buyerStudentName,
    buyerPlan: params.planId,
    planAmount,
    referrerReward,
    buyerReward,
    orderId: params.orderId,
    paymentId: params.paymentId,
    status: 'CREDITED',
    description: `Earned ₹${referrerReward} cashback from ${params.buyerStudentName}'s ₹${planAmount} (${params.planId.toUpperCase()}) enrollment.`,
    createdAt: new Date().toISOString()
  };

  referralTransactions.unshift(transaction);
  referralConfig.currentBudgetSpent += (referrerReward + buyerReward);

  // 5. Persist all changes to Firebase Firestore
  await Promise.all([
    saveAccountToFirestore(referrer),
    saveAccountToFirestore(buyerAccount),
    saveTransactionToFirestore(transaction)
  ]);

  console.log(`[Referral Credited & Saved to Firestore] Code: ${cleanCode} | Referrer: ${referrer.name} (+₹${referrerReward}) | Buyer: ${params.buyerStudentName} (+₹${buyerReward})`);

  return {
    credited: true,
    referrerReward,
    buyerReward,
    referrerName: referrer.name,
    transactionId: transaction.id
  };
}

// Reverses a referral transaction if a refund occurs
export async function reverseReferralOnRefund(paymentId: string, reason = 'Customer refund processed'): Promise<boolean> {
  const tx = referralTransactions.find(t => t.paymentId === paymentId && t.status === 'CREDITED');
  if (!tx) return false;

  const referrer = referralAccounts.get(tx.referrerId);
  if (referrer) {
    referrer.wallet.availableBalance = Math.max(0, referrer.wallet.availableBalance - tx.referrerReward);
    referrer.stats.paidReferralsCount = Math.max(0, referrer.stats.paidReferralsCount - 1);
    await saveAccountToFirestore(referrer);
  }

  const buyer = referralAccounts.get(tx.buyerStudentId);
  if (buyer) {
    buyer.wallet.availableBalance = Math.max(0, buyer.wallet.availableBalance - tx.buyerReward);
    await saveAccountToFirestore(buyer);
  }

  tx.status = 'REVERSED';
  tx.reversedAt = new Date().toISOString();
  tx.reversalReason = reason;

  await saveTransactionToFirestore(tx);

  referralConfig.currentBudgetSpent = Math.max(0, referralConfig.currentBudgetSpent - (tx.referrerReward + tx.buyerReward));
  console.log(`[Referral Reversal] Reversed rewards for payment ${paymentId} due to refund.`);
  return true;
}

// Validates a referral code prior to registration or checkout
export async function validateReferralCode(code: string, currentUserId?: string) {
  const cleanCode = sanitizeReferralCode(code);
  if (!cleanCode) {
    return {
      valid: false,
      error: 'Please enter a valid referral code.',
      message: 'Please enter a valid referral code.',
    };
  }

  let referrerUserId = referralCodeIndex.get(cleanCode);

  if (!referrerUserId) {
    for (const [uid, acc] of referralAccounts.entries()) {
      if (acc.referralCode && acc.referralCode.toUpperCase() === cleanCode) {
        referrerUserId = uid;
        referralCodeIndex.set(cleanCode, uid);
        break;
      }
    }
  }

  // Also check Firestore if not in memory
  if (!referrerUserId) {
    try {
      const q = query(collection(serverDb, 'referrals'), where('referralCode', '==', cleanCode), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0].data();
        referrerUserId = String(d.userId || snap.docs[0].id);
        referralCodeIndex.set(cleanCode, referrerUserId);
      } else {
        const sq = query(collection(serverDb, 'students'), where('referralCode', '==', cleanCode), limit(1));
        const sSnap = await getDocs(sq);
        if (!sSnap.empty) {
          const sd = sSnap.docs[0].data();
          referrerUserId = String(sd.id || sSnap.docs[0].id);
          referralCodeIndex.set(cleanCode, referrerUserId);
        }
      }
    } catch {
      // Ignore offline error
    }
  }

  if (!referrerUserId) {
    return {
      valid: false,
      error: 'Invalid referral code. Please check and try again.',
      message: 'Invalid referral code. Please check and try again.',
    };
  }

  if (currentUserId && referrerUserId === currentUserId) {
    return {
      valid: false,
      error: 'You cannot use your own referral code (Self-referral prohibited).',
      message: 'Self-referral is not allowed. You cannot use your own referral code.',
    };
  }

  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return {
      valid: false,
      error: 'Referrer profile not found.',
      message: 'Referrer profile not found.',
    };
  }

  if (currentUserId && referrer.userId === currentUserId) {
    return {
      valid: false,
      error: 'You cannot use your own referral code (Self-referral prohibited).',
      message: 'Self-referral is not allowed. You cannot use your own referral code.',
    };
  }

  return {
    valid: true,
    code: cleanCode,
    referralCode: cleanCode,
    referrerUserId: referrer.userId,
    referrerName: referrer.name,
    referrerClass: (referrer as any).className || 'Student',
    ambassadorCategory: referrer.ambassadorCategory,
    userType: referrer.userType,
    plan49Cashback: 0,
    plan99Cashback: referralConfig.plan99BuyerReward,
    message: `Valid code from ${referrer.name}! ₹${referralConfig.plan99ReferrerReward} referral cashback applies on verified ₹99 Premium subscription.`,
  };
}

// Handles user withdrawal payout request with RazorpayX automated dispatch
export async function submitPayoutRequest(params: {
  userId: string;
  amount: number;
  method: 'UPI' | 'BANK';
  upiId?: string;
  bankDetails?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
}): Promise<{ success: boolean; message: string; payout?: PayoutRequest; razorpayxResult?: any }> {
  const account = await getOrCreateReferralAccount(params.userId);
  if (!account) {
    return { success: false, message: 'Referral account not found.' };
  }

  // Enforce Minimum Withdrawal: ₹50
  if (params.amount < referralConfig.minPayoutAmount) {
    return { success: false, message: `Minimum withdrawal amount is ₹${referralConfig.minPayoutAmount}.` };
  }

  if (params.amount > account.wallet.availableBalance) {
    return { success: false, message: `Insufficient available balance. You have ₹${account.wallet.availableBalance} available.` };
  }

  // Deduct available balance and place in pending balance atomically
  account.wallet.availableBalance -= params.amount;
  account.wallet.pendingBalance += params.amount;
  await saveAccountToFirestore(account);

  const payoutId = `payout_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();

  const payout: PayoutRequest = {
    id: payoutId,
    userId: account.userId,
    userName: account.name,
    userType: account.userType,
    referralCode: account.referralCode,
    amount: params.amount,
    currency: 'INR',
    method: params.method,
    upiId: params.upiId,
    bankDetails: params.bankDetails,
    status: 'REQUESTED',
    createdAt: now,
    requestedAt: now
  };

  // Attempt Automated RazorpayX Payout Dispatch
  const rzpResult = await dispatchRazorpayXPayout({
    payoutId,
    userId: account.userId,
    userName: account.name,
    userEmail: account.email,
    userMobile: account.mobile,
    amountRupees: params.amount,
    method: params.method,
    upiId: params.upiId,
    bankDetails: params.bankDetails
  });

  if (rzpResult.status === 'COMPLETED') {
    payout.status = 'COMPLETED';
    payout.transactionReference = rzpResult.payoutReference;
    payout.processedAt = new Date().toISOString();
    payout.adminNotes = `RazorpayX automated payout completed. Reference: ${rzpResult.payoutReference}`;

    // Move pending balance to totalWithdrawn
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - params.amount);
    account.wallet.totalWithdrawn += params.amount;
    await saveAccountToFirestore(account);
  } else if (rzpResult.status === 'PROCESSING') {
    payout.status = 'PROCESSED';
    payout.transactionReference = rzpResult.payoutReference;
    payout.adminNotes = `RazorpayX payout is processing (ID: ${rzpResult.razorpayxPayoutId || rzpResult.payoutReference}).`;
  } else if (rzpResult.status === 'FAILED') {
    payout.status = 'REJECTED';
    payout.adminNotes = `RazorpayX dispatch failed: ${rzpResult.error || rzpResult.message}. Funds restored to wallet.`;

    // Automatically restore funds to available wallet balance
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - params.amount);
    account.wallet.availableBalance += params.amount;
    await saveAccountToFirestore(account);
  } else {
    // Awaiting credentials or manual review queue
    payout.status = 'PENDING';
    payout.adminNotes = rzpResult.message;
  }

  payoutRequests.unshift(payout);
  await savePayoutToFirestore(payout);

  return {
    success: true,
    message: rzpResult.message || 'Withdrawal request recorded successfully.',
    payout,
    razorpayxResult: rzpResult
  };
}

// Teacher submits school verification credentials
export async function submitTeacherVerification(params: {
  userId: string;
  schoolName: string;
  teacherIdNumber?: string;
  credentialsDocUrl?: string;
}): Promise<{ success: boolean; message: string; account?: ReferralAccount }> {
  const account = await getOrCreateReferralAccount(params.userId);
  if (!account) {
    return { success: false, message: 'Account not found.' };
  }

  account.userType = 'teacher';
  account.ambassadorCategory = 'educator_excellence';
  account.schoolName = params.schoolName;
  account.teacherIdNumber = params.teacherIdNumber;
  account.credentialsDocUrl = params.credentialsDocUrl;
  account.verificationStatus = 'PENDING';
  account.updatedAt = new Date().toISOString();

  if (account.milestones.length === 4) {
    account.milestones = TEACHER_DEFAULT_MILESTONES.map(m => ({ ...m }));
  }

  await saveAccountToFirestore(account);
  return { success: true, message: 'Teacher verification documents submitted. Admin will review within 24 hours.', account };
}

// Admin reviews and approves/rejects teacher verification
export async function reviewTeacherVerification(
  userId: string,
  status: 'VERIFIED' | 'REJECTED',
  notes = ''
): Promise<{ success: boolean; message: string; account?: ReferralAccount }> {
  const account = await getOrCreateReferralAccount(userId);
  if (!account) {
    return { success: false, message: 'Teacher account not found.' };
  }

  account.verificationStatus = status;
  account.verificationNotes = notes;
  account.updatedAt = new Date().toISOString();

  await saveAccountToFirestore(account);
  return { success: true, message: `Teacher ${account.name} marked as ${status}.`, account };
}

// Admin approves or rejects payout request
export async function processPayoutAction(
  payoutId: string,
  action: 'APPROVE' | 'REJECT',
  transactionRef = '',
  notes = ''
): Promise<{ success: boolean; message: string }> {
  const payout = payoutRequests.find(p => p.id === payoutId);
  if (!payout) {
    return { success: false, message: 'Payout request not found.' };
  }

  if (payout.status === 'COMPLETED') {
    return { success: false, message: 'Payout request has already been completed.' };
  }

  const account = await getOrCreateReferralAccount(payout.userId);
  if (!account) {
    return { success: false, message: 'Associated user account not found.' };
  }

  if (action === 'APPROVE') {
    payout.status = 'COMPLETED';
    payout.transactionReference = transactionRef || `UPI-TXN-${Date.now().toString().slice(-6)}`;
    payout.processedAt = new Date().toISOString();
    payout.adminNotes = notes || 'Payout successfully processed to beneficiary account.';

    // Move pending balance to totalWithdrawn
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - payout.amount);
    account.wallet.totalWithdrawn += payout.amount;
  } else {
    payout.status = 'REJECTED';
    payout.processedAt = new Date().toISOString();
    payout.adminNotes = notes || 'Withdrawal request rejected by administrator.';

    // Refund pending balance back to available balance
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - payout.amount);
    account.wallet.availableBalance += payout.amount;
  }

  await Promise.all([
    saveAccountToFirestore(account),
    savePayoutToFirestore(payout)
  ]);

  return { success: true, message: `Payout request ${action === 'APPROVE' ? 'Approved & Completed' : 'Rejected'}.` };
}

// Get dynamic Leaderboards
export function getLeaderboardData(): {
  students: ReferralLeaderboardEntry[];
  teachers: ReferralLeaderboardEntry[];
  diamonds: ReferralLeaderboardEntry[];
} {
  const all = Array.from(referralAccounts.values());

  const students: ReferralLeaderboardEntry[] = all
    .filter(a => a.userType === 'student')
    .sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount)
    .slice(0, 10)
    .map((a, idx) => ({
      rank: idx + 1,
      userId: a.userId,
      name: a.name,
      userType: a.userType,
      ambassadorCategory: a.ambassadorCategory,
      paidReferralsCount: a.stats.paidReferralsCount,
      paidReferrals: a.stats.paidReferralsCount,
      totalEarned: a.wallet.totalEarned,
      schoolName: a.schoolName,
      badge: a.ambassadorCategory === 'diamond_ambassador' ? '💎 Diamond' : '🎁 Knowledge Ambassador'
    }));

  const teachers: ReferralLeaderboardEntry[] = all
    .filter(a => a.userType === 'teacher')
    .sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount)
    .slice(0, 10)
    .map((a, idx) => ({
      rank: idx + 1,
      userId: a.userId,
      name: a.name,
      userType: a.userType,
      ambassadorCategory: a.ambassadorCategory,
      paidReferralsCount: a.stats.paidReferralsCount,
      paidReferrals: a.stats.paidReferralsCount,
      totalEarned: a.wallet.totalEarned,
      schoolName: a.schoolName,
      badge: '🏆 Educator Excellence'
    }));

  const diamonds: ReferralLeaderboardEntry[] = all
    .filter(a => a.ambassadorCategory === 'diamond_ambassador' || a.stats.paidReferralsCount >= 50)
    .sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount)
    .map((a, idx) => ({
      rank: idx + 1,
      userId: a.userId,
      name: a.name,
      userType: a.userType,
      ambassadorCategory: 'diamond_ambassador',
      paidReferralsCount: a.stats.paidReferralsCount,
      paidReferrals: a.stats.paidReferralsCount,
      totalEarned: a.wallet.totalEarned,
      schoolName: a.schoolName,
      badge: '💎 Hall of Fame Diamond'
    }));

  return { students, teachers, diamonds };
}

// Get Admin Comprehensive Stats for Referral & Payouts Dashboard
export function getAdminReferralStats() {
  const allAccounts = Array.from(referralAccounts.values());
  const totalPaidReferrals = allAccounts.reduce((acc, a) => acc + a.stats.paidReferralsCount, 0);
  const totalEarnedDistributed = allAccounts.reduce((acc, a) => acc + a.wallet.totalEarned, 0);
  const totalWithdrawn = allAccounts.reduce((acc, a) => acc + a.wallet.totalWithdrawn, 0);
  const totalPendingPayoutAmount = payoutRequests
    .filter(p => p.status === 'PENDING' || p.status === 'REQUESTED' || p.status === 'PROCESSED')
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingTeacherVerifications = allAccounts.filter(
    a => a.userType === 'teacher' && a.verificationStatus === 'PENDING'
  );

  const successfulPayoutCount = payoutRequests.filter(p => p.status === 'COMPLETED').length;
  const failedPayoutCount = payoutRequests.filter(p => p.status === 'FAILED' || p.status === 'REJECTED').length;
  const pendingPayoutCount = payoutRequests.filter(p => p.status === 'PENDING' || p.status === 'REQUESTED' || p.status === 'PROCESSED').length;

  const rzpCreds = getResolvedRazorpayXCredentials();

  return {
    totalAmbassadors: allAccounts.length,
    studentAmbassadors: allAccounts.filter(a => a.userType === 'student').length,
    teacherAmbassadors: allAccounts.filter(a => a.userType === 'teacher').length,
    diamondAmbassadors: allAccounts.filter(a => a.ambassadorCategory === 'diamond_ambassador').length,
    // The exact 7 metrics requested by user:
    totalReferrals: totalPaidReferrals,
    successfulReferrals: totalPaidReferrals,
    totalCashbackDistributed: totalEarnedDistributed,
    totalWithdrawalAmount: totalWithdrawn,
    pendingPayouts: pendingPayoutCount,
    successfulPayouts: successfulPayoutCount,
    failedPayouts: failedPayoutCount,

    // Additional metrics for admin UI
    totalPaidReferrals,
    totalEarnedDistributed,
    totalWithdrawn,
    totalPendingPayoutAmount,
    pendingPayoutCount,
    successfulPayoutCount,
    failedPayoutCount,
    pendingTeacherCount: pendingTeacherVerifications.length,
    razorpayxConfigured: rzpCreds.isConfigured,
    razorpayxTestMode: rzpCreds.isTestMode,
    config: referralConfig,
    recentTransactions: referralTransactions.slice(0, 30),
    payoutRequests: payoutRequests.slice(0, 30),
    pendingTeachers: pendingTeacherVerifications
  };
}

// Disabled for public launch: sample accounts must not be auto-seeded into Firestore.
export function seedSampleReferralData() {
  return;
}
