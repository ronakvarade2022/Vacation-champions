import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Wallet, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  RefreshCw, 
  School, 
  Sparkles
} from 'lucide-react';
import { referralService, AdminStatsResponse } from '../services/referralService';
import { TeacherCertificateModal } from './TeacherCertificateModal';
import { AdminPagination } from './admin/AdminPagination';

export const AdminReferralPanel: React.FC = React.memo(() => {
  const [data, setData] = useState<AdminStatsResponse['stats'] | null>(null);
  const [, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'teachers' | 'payouts' | 'config' | 'transactions'>('teachers');

  // Pagination state
  const [teacherPage, setTeacherPage] = useState(1);
  const [payoutPage, setPayoutPage] = useState(1);
  const [txPage, setTxPage] = useState(1);
  const pageSize = 15;

  // Config Form
  const [budgetCap, setBudgetCap] = useState(50000);
  const [plan99Referrer, setPlan99Referrer] = useState(5);
  const [plan99Buyer, setPlan99Buyer] = useState(5);
  const [minPayout, setMinPayout] = useState(50);
  const [programEnabled, setProgramEnabled] = useState(true);
  const [configSaving, setConfigSaving] = useState(false);
  const [configFeedback, setConfigFeedback] = useState<string | null>(null);

  // Payout action
  const [payoutProcessingId, setPayoutProcessingId] = useState<string | null>(null);
  const [txnRefInput, setTxnRefInput] = useState('');

  // Selected teacher for certificate preview
  const [certTeacher, setCertTeacher] = useState<{ name: string; school: string; count: number } | null>(null);

  const fetchStats = useCallback(async (forceRefresh: boolean = false) => {
    try {
      setRefreshing(true);
      const res = await referralService.getAdminStats(forceRefresh);
      if (res.success && res.stats) {
        setData(res.stats);
        setBudgetCap(res.stats.config.budgetCap);
        setPlan99Referrer(res.stats.config.plan99ReferrerReward);
        setPlan99Buyer(res.stats.config.plan99BuyerReward);
        setMinPayout(res.stats.config.minPayoutAmount);
        setProgramEnabled(res.stats.config.programEnabled);
      }
    } catch (err) {
      console.error('Error fetching admin referral stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(false);
  }, [fetchStats]);

  const pendingTeachers = data?.pendingTeachers || [];
  const payoutRequests = data?.payoutRequests || [];
  const recentTransactions = data?.recentTransactions || [];

  const paginatedTeachers = useMemo(
    () => pendingTeachers.slice((teacherPage - 1) * pageSize, teacherPage * pageSize),
    [pendingTeachers, teacherPage]
  );
  const paginatedPayouts = useMemo(
    () => payoutRequests.slice((payoutPage - 1) * pageSize, payoutPage * pageSize),
    [payoutRequests, payoutPage]
  );
  const paginatedTransactions = useMemo(
    () => recentTransactions.slice((txPage - 1) * pageSize, txPage * pageSize),
    [recentTransactions, txPage]
  );

  const handleTeacherAction = async (userId: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      await referralService.reviewTeacher(userId, status, status === 'VERIFIED' ? 'State educator credentials confirmed' : 'Insufficient institutional documentation');
      await fetchStats(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayoutAction = async (payoutId: string, action: 'APPROVE' | 'REJECT') => {
    setPayoutProcessingId(payoutId);
    try {
      await referralService.processPayout(
        payoutId, 
        action, 
        txnRefInput || `UPI-${Date.now().toString().slice(-6)}`,
        action === 'APPROVE' ? 'Bank transfer processed' : 'Rejected by administrator'
      );
      setTxnRefInput('');
      await fetchStats(true);
    } catch (err) {
      console.error(err);
    } finally {
      setPayoutProcessingId(null);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaving(true);
    setConfigFeedback(null);
    try {
      const res = await referralService.updateConfig({
        programEnabled,
        budgetCap,
        plan99ReferrerReward: plan99Referrer,
        plan99BuyerReward: plan99Buyer,
        minPayoutAmount: minPayout
      });
      if (res.success) {
        setConfigFeedback('Configuration updated successfully!');
        setTimeout(() => setConfigFeedback(null), 3000);
        await fetchStats(true);
      }
    } catch (err: any) {
      setConfigFeedback(`Error saving config: ${err.message}`);
    } finally {
      setConfigSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 rounded-3xl text-white border border-amber-500/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEARN • SHARE • GROW • EARN</span>
          </div>
          <h2 className="text-2xl font-black text-white">Referral &amp; Payouts Management (₹5 / Verified ₹99 Plan)</h2>
          <p className="text-xs text-amber-200/80 mt-1">
            Student &amp; Teacher Ambassadors, Teacher Verification Queue, RazorpayX Payout Disbursements, and Fraud Rules.
          </p>
        </div>

        <button
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* 2. 7 KEY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* 1. Total Referrals */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Total Referrals</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {data?.totalReferrals ?? data?.totalPaidReferrals ?? 0}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {data?.totalAmbassadors ?? 0} Ambassadors
          </div>
        </div>

        {/* 2. Successful Referrals */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Successful Referrals</div>
          <div className="text-2xl font-black text-orange-600 mt-1">
            {data?.successfulReferrals ?? data?.totalPaidReferrals ?? 0}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">
            Verified ₹99 Purchases
          </div>
        </div>

        {/* 3. Total Cashback Distributed */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Cashback Distributed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            ₹{data?.totalCashbackDistributed ?? data?.totalEarnedDistributed ?? 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            ₹5 / Referral
          </div>
        </div>

        {/* 4. Total Withdrawal Amount */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Total Withdrawn</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{data?.totalWithdrawalAmount ?? data?.totalWithdrawn ?? 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Via Bank &amp; UPI
          </div>
        </div>

        {/* 5. Pending Payouts */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Pending Payouts</div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {data?.pendingPayouts ?? data?.pendingPayoutCount ?? 0}
          </div>
          <div className="text-[10px] text-amber-700 font-bold mt-1">
            ₹{data?.totalPendingPayoutAmount ?? 0} reserved
          </div>
        </div>

        {/* 6. Successful Payouts */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Successful Payouts</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {data?.successfulPayouts ?? 0}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">
            Completed Transfers
          </div>
        </div>

        {/* 7. Failed Payouts */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Failed Payouts</div>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {data?.failedPayouts ?? 0}
          </div>
          <div className="text-[10px] text-rose-600 font-semibold mt-1">
            Auto-Refunded to Wallet
          </div>
        </div>
      </div>

      {/* 3. SUB NAVIGATION */}
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveSubTab('teachers')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'teachers'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-amber-50'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Teacher Queue ({data?.pendingTeacherCount ?? 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('payouts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'payouts'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-amber-50'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Payout Requests ({data?.pendingPayoutCount ?? 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('config')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'config'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-amber-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Reward Rates &amp; Budget Caps</span>
        </button>

        <button
          onClick={() => setActiveSubTab('transactions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'transactions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-amber-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Attribution Ledger &amp; Anti-Fraud</span>
        </button>
      </div>

      {/* 4. SUB TAB CONTENTS */}

      {/* 4.1 TEACHER VERIFICATION QUEUE */}
      {activeSubTab === 'teachers' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Teacher Verification Requests</h3>
              <p className="text-xs text-gray-500">Verify educators to grant Educator Excellence Ambassador credentials and certificate generation</p>
            </div>
          </div>

          {pendingTeachers.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <span>All educator requests have been processed. No pending verifications in queue.</span>
            </div>
          ) : (
            <div className="space-y-3">
              <AdminPagination
                totalItems={pendingTeachers.length}
                currentPage={teacherPage}
                pageSize={pageSize}
                onPageChange={setTeacherPage}
                itemLabel="educator requests"
              />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                    <tr>
                      <th className="py-2.5 px-3">Educator Name</th>
                      <th className="py-2.5 px-3">School / Institution</th>
                      <th className="py-2.5 px-3">Teacher ID / Code</th>
                      <th className="py-2.5 px-3">Referral Code</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedTeachers.map((tch) => (
                    <tr key={tch.userId} className="hover:bg-amber-50/40">
                      <td className="py-3 px-3 font-bold text-gray-900">{tch.name}</td>
                      <td className="py-3 px-3 text-gray-700">{tch.schoolName || 'Partner School'}</td>
                      <td className="py-3 px-3 font-mono text-gray-500">{tch.teacherIdNumber || 'N/A'}</td>
                      <td className="py-3 px-3 font-mono font-bold text-orange-600">{tch.referralCode}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {tch.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => setCertTeacher({ name: tch.name, school: tch.schoolName || 'Vidya Mandir School', count: tch.stats.paidReferralsCount })}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[11px] cursor-pointer"
                        >
                          Preview Cert
                        </button>
                        <button
                          onClick={() => handleTeacherAction(tch.userId, 'VERIFIED')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleTeacherAction(tch.userId, 'REJECTED')}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4.2 PAYOUT REQUESTS */}
      {activeSubTab === 'payouts' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Ambassador Payout Requests</h3>
              <p className="text-xs text-gray-500">Approve disbursements via UPI or direct bank account transfer (IMPS)</p>
            </div>
          </div>

          {payoutRequests.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <span>No payout requests recorded.</span>
            </div>
          ) : (
            <div className="space-y-3">
              <AdminPagination
                totalItems={payoutRequests.length}
                currentPage={payoutPage}
                pageSize={pageSize}
                onPageChange={setPayoutPage}
                itemLabel="payout requests"
              />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">User</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Method &amp; Details</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPayouts.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/40">
                      <td className="py-3 px-3 text-gray-500 font-mono text-[11px]">
                        {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-3 font-bold text-gray-900">{p.userName}</td>
                      <td className="py-3 px-3 uppercase text-[10px] font-bold text-slate-500">{p.userType}</td>
                      <td className="py-3 px-3 font-black text-emerald-600 text-sm">₹{p.amount}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-gray-700">
                        {p.method === 'UPI' ? (
                          <span>UPI: {p.upiId}</span>
                        ) : (
                          <span>A/C: {p.bankDetails?.accountNumber} ({p.bankDetails?.ifscCode})</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'PENDING' || p.status === 'PROCESSING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {p.status === 'PENDING' || p.status === 'PROCESSING' ? (
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => handlePayoutAction(p.id, 'APPROVE')}
                              disabled={payoutProcessingId === p.id}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handlePayoutAction(p.id, 'REJECT')}
                              disabled={payoutProcessingId === p.id}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-400 font-mono">
                            {p.transactionReference || 'Processed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4.3 REWARD RATES & BUDGET SETTINGS */}
      {activeSubTab === 'config' && (
        <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Referral Campaign Controls</h3>
              <p className="text-xs text-gray-500">Configure exact reward rates (₹5 default for ₹99 Premium), monthly budget caps, and minimum payouts</p>
            </div>
            <label className="flex items-center space-x-2 text-xs font-bold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={programEnabled}
                onChange={(e) => setProgramEnabled(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span>Program Active</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Monthly Reward Pool Cap (₹)
              </label>
              <input
                type="number"
                value={budgetCap}
                onChange={(e) => setBudgetCap(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-xl font-bold text-sm"
              />
              <span className="text-[11px] text-gray-500">
                Current Pool Spent: ₹{data?.config.currentBudgetSpent ?? 0}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Minimum Withdrawal Threshold (₹)
              </label>
              <input
                type="number"
                value={minPayout}
                onChange={(e) => setMinPayout(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-xl font-bold text-sm"
              />
              <span className="text-[11px] text-gray-500">Default: ₹50</span>
            </div>

            {/* Plan 99 settings */}
            <div className="sm:col-span-2 p-4 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-3">
              <h4 className="font-extrabold text-xs text-orange-900 uppercase">Premium Paid Plan (₹99 – 365 Days / 1 Year) — Referral Cashback</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600">Referrer Cashback Reward (₹)</label>
                  <input
                    type="number"
                    value={plan99Referrer}
                    onChange={(e) => setPlan99Referrer(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border rounded-lg font-bold text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600">Buyer Cashback Bonus (₹)</label>
                  <input
                    type="number"
                    value={plan99Buyer}
                    onChange={(e) => setPlan99Buyer(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border rounded-lg font-bold text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {configFeedback && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl">
              {configFeedback}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={configSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              {configSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      )}

      {/* 4.4 ATTRIBUTION LEDGER & ANTI-FRAUD */}
      {activeSubTab === 'transactions' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Verified Referral Attribution Ledger</h3>
              <p className="text-xs text-gray-500">Live ledger of rewarded paid purchases with anti-fraud auditing</p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Self-Referral Active</span>
            </div>
          </div>

          <div className="space-y-3">
            <AdminPagination
              totalItems={recentTransactions.length}
              currentPage={txPage}
              pageSize={pageSize}
              onPageChange={setTxPage}
              itemLabel="referral transactions"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Referrer</th>
                    <th className="py-2.5 px-3">Buyer Student</th>
                    <th className="py-2.5 px-3">Plan Enrolled</th>
                    <th className="py-2.5 px-3">Referrer Reward</th>
                    <th className="py-2.5 px-3">Buyer Cashback</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-3 text-gray-500 font-mono text-[11px]">
                      {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{tx.referrerName}</div>
                      <div className="font-mono text-[10px] text-orange-600">{tx.referralCode}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-800">{tx.buyerStudentName}</div>
                      <div className="font-mono text-[10px] text-gray-400">{tx.buyerStudentId}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-gray-900">₹{tx.planAmount} ({tx.buyerPlan.toUpperCase()})</span>
                    </td>
                    <td className="py-3 px-3 font-extrabold text-emerald-600">
                      +₹{tx.referrerReward}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-emerald-600">
                      +₹{tx.buyerReward}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.status === 'CREDITED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL PREVIEW */}
      {certTeacher && (
        <TeacherCertificateModal
          isOpen={Boolean(certTeacher)}
          onClose={() => setCertTeacher(null)}
          teacherName={certTeacher.name}
          schoolName={certTeacher.school}
          referralCount={certTeacher.count || 100}
        />
      )}
    </div>
  );
});
AdminReferralPanel.displayName = 'AdminReferralPanel';
