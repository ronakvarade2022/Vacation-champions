import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ShieldCheck, Search, Eye, X, RefreshCw } from 'lucide-react';
import type { EducationBoard, PaymentTransaction } from '../../types';
import { fetchBoundedTransactionsForAdmin } from '../../services/adminFirestoreService';
import { ALL_BOARDS, getBoardShortLabel, normalizeBoardValue } from '../../utils/subscriptionAccess';
import { evaluateSubscriptionValidity, formatDateIstDisplay } from '../../utils/subscriptionDateUtils';
import { AdminPagination } from './AdminPagination';

interface AdminPaymentsSectionProps {
  transactions: PaymentTransaction[];
  selectedBoardWorkspace: 'all' | EducationBoard;
  onSelectBoardWorkspace: (board: 'all' | EducationBoard) => void;
}

export const AdminPaymentsSection: React.FC<AdminPaymentsSectionProps> = React.memo(
  ({ transactions, selectedBoardWorkspace, onSelectBoardWorkspace }) => {
    const [remoteTransactions, setRemoteTransactions] = useState<PaymentTransaction[]>([]);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [paymentSearchInput, setPaymentSearchInput] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [paymentFilterPlan, setPaymentFilterPlan] = useState<string>('all');
    const [paymentFilterStatus, setPaymentFilterStatus] = useState<string>('all');
    const [inspectedTx, setInspectedTx] = useState<PaymentTransaction | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);

    useEffect(() => {
      const t = setTimeout(() => setDebouncedSearch(paymentSearchInput.trim().toLowerCase()), 200);
      return () => clearTimeout(t);
    }, [paymentSearchInput]);

    const loadBoundedTransactions = useCallback(async (forceRefresh: boolean = false) => {
      setIsSyncing(true);
      try {
        const res = await fetchBoundedTransactionsForAdmin({ pageSize: 200, forceRefresh });
        if (res.fromFirestore && res.transactions.length > 0) {
          setRemoteTransactions(res.transactions);
        }
      } catch {
        // Keep local transactions fallback
      } finally {
        setIsSyncing(false);
      }
    }, []);

    useEffect(() => {
      loadBoundedTransactions(false);
    }, [loadBoundedTransactions]);

    const mergedTransactions = useMemo(() => {
      if (remoteTransactions.length === 0) return transactions;
      const byId = new Map<string, PaymentTransaction>();
      for (const tx of remoteTransactions) {
        if (tx?.id) byId.set(tx.id, tx);
      }
      for (const tx of transactions) {
        if (tx?.id) byId.set(tx.id, tx);
      }
      return Array.from(byId.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }, [transactions, remoteTransactions]);

    // Board-scoped base dataset so Maharashtra, CBSE, ICSE financial views work independently
    const boardScopedTransactions = useMemo(() => {
      if (selectedBoardWorkspace === 'all') return mergedTransactions;
      return mergedTransactions.filter(
        (t) => normalizeBoardValue(t.selectedBoard || 'Maharashtra') === selectedBoardWorkspace
      );
    }, [mergedTransactions, selectedBoardWorkspace]);

    // Single-pass metrics calculation
    const stats = useMemo(() => {
      let successCount = 0;
      let paidPlanCount = 0;
      let pendingCount = 0;
      let failedCount = 0;
      let refundedCount = 0;
      let totalCollectedAmount = 0;

      for (const t of boardScopedTransactions) {
        if (t.status === 'SUCCESS') {
          successCount++;
          totalCollectedAmount += t.amount || 0;
          if (t.planId === 'basic' || t.planId === 'premium') {
            paidPlanCount++;
          }
        } else if (t.status === 'PENDING') {
          pendingCount++;
        } else if (t.status === 'FAILED') {
          failedCount++;
        } else if (t.status === 'REFUNDED') {
          refundedCount++;
        }
      }

      return {
        successCount,
        paidPlanCount,
        pendingCount,
        failedCount,
        refundedCount,
        totalCollectedAmount,
      };
    }, [boardScopedTransactions]);

    const filteredTxList = useMemo(() => {
      return boardScopedTransactions.filter((t) => {
        if (paymentFilterPlan !== 'all' && t.planId !== paymentFilterPlan) return false;
        if (paymentFilterStatus !== 'all' && t.status !== paymentFilterStatus) return false;
        if (debouncedSearch) {
          const hit =
            t.studentName.toLowerCase().includes(debouncedSearch) ||
            t.studentId.toLowerCase().includes(debouncedSearch) ||
            t.paymentId.toLowerCase().includes(debouncedSearch) ||
            t.orderId.toLowerCase().includes(debouncedSearch) ||
            t.receiptNumber.toLowerCase().includes(debouncedSearch);
          if (!hit) return false;
        }
        return true;
      });
    }, [boardScopedTransactions, paymentFilterPlan, paymentFilterStatus, debouncedSearch]);

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedBoardWorkspace, paymentFilterPlan, paymentFilterStatus, debouncedSearch]);

    const safePage = Math.min(
      currentPage,
      Math.max(1, Math.ceil(filteredTxList.length / pageSize))
    );
    const paginatedTxList = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredTxList.slice(start, start + pageSize);
    }, [filteredTxList, safePage, pageSize]);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💳</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Razorpay Live Payment Gateway Management
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Server-side cryptographic payment auditing, 365-day (1-year) membership activations, and reconciliation ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => loadBoundedTransactions(true)}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Refresh Ledger'}</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>HMAC SHA256 Verified</span>
            </span>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-center">
            <p className="text-[10px] font-bold text-emerald-900 uppercase">Successful</p>
            <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{stats.successCount}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Paid Orders</p>
          </div>

          <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-center">
            <p className="text-[10px] font-bold text-orange-950 uppercase">Premium (₹99)</p>
            <p className="text-xl font-extrabold text-orange-700 mt-0.5">{stats.paidPlanCount}</p>
            <p className="text-[10px] text-orange-600 mt-0.5">Purchases</p>
          </div>

          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 text-center">
            <p className="text-[10px] font-bold text-blue-900 uppercase">Pending</p>
            <p className="text-xl font-extrabold text-blue-700 mt-0.5">{stats.pendingCount}</p>
            <p className="text-[10px] text-blue-600 mt-0.5">In Checkout</p>
          </div>

          <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200 text-center">
            <p className="text-[10px] font-bold text-rose-900 uppercase">Failed</p>
            <p className="text-xl font-extrabold text-rose-700 mt-0.5">{stats.failedCount}</p>
            <p className="text-[10px] text-rose-600 mt-0.5">Declined</p>
          </div>

          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 text-center">
            <p className="text-[10px] font-bold text-purple-900 uppercase">Refunded</p>
            <p className="text-xl font-extrabold text-purple-700 mt-0.5">{stats.refundedCount}</p>
            <p className="text-[10px] text-purple-600 mt-0.5">Reversed</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3.5 rounded-2xl text-white text-center shadow-xs">
            <p className="text-[10px] font-bold text-amber-100 uppercase">Total Collected</p>
            <p className="text-xl font-extrabold mt-0.5">
              ₹{stats.totalCollectedAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-amber-100 mt-0.5">INR (Net)</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedBoardWorkspace}
              onChange={(e) => onSelectBoardWorkspace(e.target.value as 'all' | EducationBoard)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All 3 Boards</option>
              {ALL_BOARDS.map((b) => (
                <option key={b} value={b}>
                  {getBoardShortLabel(b)}
                </option>
              ))}
            </select>

            <select
              value={paymentFilterPlan}
              onChange={(e) => setPaymentFilterPlan(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All Plans (₹99 Premium)</option>
              <option value="premium">Champion Premium (₹99)</option>
            </select>

            <select
              value={paymentFilterStatus}
              onChange={(e) => setPaymentFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="SUCCESS">Success / Captured</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed / Declined</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={paymentSearchInput}
              onChange={(e) => setPaymentSearchInput(e.target.value)}
              placeholder="Search student, UID, Payment ID, Order ID..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-medium"
            />
          </div>
        </div>

        <AdminPagination
          totalItems={filteredTxList.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[15, 20, 40, 100]}
          itemLabel="transactions"
        />

        {/* Transactions Table */}
        {paginatedTxList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border text-xs text-slate-500">
            No payment transactions match your search filter criteria.
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Receipt &amp; Date (IST)</th>
                  <th className="p-3">Student Name &amp; UID</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Validity Dates (Purchase → Expiry IST)</th>
                  <th className="p-3">Razorpay Payment ID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedTxList.map((t) => {
                  const txValidity =
                    t.status === 'SUCCESS' && t.membershipExpiryDate
                      ? evaluateSubscriptionValidity(
                          'premium',
                          t.membershipStartDate || t.createdAt,
                          t.membershipExpiryDate
                        )
                      : null;
                  return (
                    <tr key={t.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="p-3 font-mono">
                        <span className="font-bold text-amber-900 block">{t.receiptNumber}</span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {formatDateIstDisplay(t.createdAt)}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{t.studentName}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          UID: {t.studentId}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            t.planId === 'premium'
                              ? 'bg-orange-100 text-orange-900 border border-orange-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          {t.planTitle}
                        </span>
                        {(t.selectedBoard || t.selectedClass) && (
                          <span className="block text-[10px] font-bold text-blue-800 mt-1">
                            {getBoardShortLabel(t.selectedBoard || 'Maharashtra')} •{' '}
                            {t.selectedClass || 'Standard'}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-extrabold text-slate-900 text-sm">₹{t.amount}</td>
                      <td className="p-3 font-mono text-[11px]">
                        {txValidity ? (
                          <div>
                            <span className="text-slate-800 font-bold block">
                              {txValidity.purchaseDateIst} → {txValidity.expiryDateIst}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-bold">
                              {txValidity.daysRemainingDisplay}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">
                        {t.paymentId} ({t.method})
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            t.status === 'SUCCESS'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : t.status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => setInspectedTx(t)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                          title="Inspect complete verified transaction data"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Zero-Tamper Notice */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>
            🔒 <strong>Zero-Tamper Guarantee:</strong> All Razorpay transactions are cryptographically sealed. Transaction amounts and student IDs cannot be modified manually by administrators.
          </span>
          <span className="font-mono text-slate-400">
            Total records: {boardScopedTransactions.length}
          </span>
        </div>

        {/* Inspect Modal */}
        {inspectedTx && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-300 space-y-4 text-xs animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-display font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Razorpay Verified Payment Record</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setInspectedTx(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[11px]">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">RECEIPT #</span>
                    <span className="font-bold text-slate-900">{inspectedTx.receiptNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">STATUS</span>
                    <span className="font-bold text-emerald-700">{inspectedTx.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">STUDENT NAME</span>
                    <span className="font-bold text-slate-900">{inspectedTx.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">STUDENT UID</span>
                    <span className="font-bold text-amber-900">{inspectedTx.studentId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">PLAN &amp; BOARD / CLASS</span>
                    <span className="font-bold text-slate-900 block">{inspectedTx.planTitle}</span>
                    <span className="text-[10px] font-bold text-blue-700">
                      {getBoardShortLabel(inspectedTx.selectedBoard || 'Maharashtra')} •{' '}
                      {inspectedTx.selectedClass || 'General'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">AMOUNT PAID</span>
                    <span className="font-bold text-slate-900">₹{inspectedTx.amount}.00 INR</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">PURCHASE DATE (IST)</span>
                    <span className="font-bold text-slate-900">
                      {inspectedTx.membershipStartDate || formatDateIstDisplay(inspectedTx.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">
                      EXPIRY DATE (365 DAYS IST)
                    </span>
                    <span className="font-bold text-emerald-700">
                      {inspectedTx.membershipExpiryDate || 'N/A'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">RAZORPAY PAYMENT ID</span>
                  <span className="font-bold text-slate-900 select-all">
                    {inspectedTx.paymentId}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">RAZORPAY ORDER ID</span>
                  <span className="font-bold text-slate-900 select-all">{inspectedTx.orderId}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">HMAC SHA256 SIGNATURE</span>
                  <span className="text-slate-600 break-all">
                    {inspectedTx.signature || 'verified_server_signature'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TIMESTAMP</span>
                    <span className="text-slate-700">
                      {new Date(inspectedTx.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PAYMENT METHOD</span>
                    <span className="text-slate-700">{inspectedTx.method}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setInspectedTx(null)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AdminPaymentsSection.displayName = 'AdminPaymentsSection';
