import React, { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Ban,
  CheckCircle2,
  Cpu,
  Lock,
  RefreshCw,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { auth } from '../../services/firebase';

interface PaidFeatureProposalItem {
  featureId: string;
  featureName: string;
  paidModelName: string;
  reasonFreeInsufficient: string;
  estimatedRequestsPerMonth: string;
  estimatedMonthlyCostInr: string;
  maxPossibleMonthlyCostInr: string;
  billingMustBeEnabled: boolean;
  availableFreeAlternatives: string[];
  status: 'BLOCKED_FREE_ONLY' | 'DENIED_BY_OWNER' | 'APPROVED_AWAITING_SERVER_ENV';
  ownerDecisionNote?: string;
  ownerDecidedAt?: string;
  ownerDecidedBy?: string;
}

interface AiPolicyLimitsState {
  globalDailyRequestCap: number;
  perUserDailyTotalCap: number;
  perUserDailyLimits: {
    student_ai: number;
    teacher_ai: number;
    snapsolve: number;
    dictionary_translation: number;
    help_support: number;
    core_ai: number;
  };
  perIpTenMinuteCap: number;
  maxInputChars: number;
  maxInputTokensApprox: number;
  maxOutputTokens: number;
}

interface OwnerAiPolicyReport {
  success: boolean;
  generatedAt: string;
  dateKeyIst: string;
  quotaResetAt: string;
  globalBillingStatus: 'FREE_ONLY' | 'PAID_APPROVED';
  billingStatusLabel: 'FREE ONLY' | 'PAID APPROVED';
  geminiKeyConfigured: boolean;
  currentModels: {
    primaryModel: string;
    fallbackModel: string;
    verifiedFreeAllowlist: string[];
    blockedPaidModels: string[];
  };
  usageToday: {
    totalAiRequests: number;
    studentAiRequests: number;
    teacherAiRequests: number;
    snapSolveRequests: number;
    dictionaryAndTranslationRequests: number;
    helpAndSupportRequests: number;
    coreStudioAiRequests: number;
    knowledgeBaseZeroCostHits: number;
    blockedPaidApiAttempts: number;
    fallbackHits: number;
    quotaRejections: number;
    modelHits: Record<string, number>;
    tokens: { promptTokens: number; outputTokens: number; totalTokens: number };
    activeUniqueUsersToday: number;
  };
  usageAllTime: {
    totalAiRequests: number;
    studentAiRequests: number;
    teacherAiRequests: number;
    snapSolveRequests: number;
    dictionaryAndTranslationRequests: number;
    helpAndSupportRequests: number;
    coreStudioAiRequests: number;
    knowledgeBaseZeroCostHits: number;
    blockedPaidApiAttempts: number;
    tokens: { promptTokens: number; outputTokens: number; totalTokens: number };
  };
  quotaConsumption: {
    dailyUsed: number;
    dailyCap: number;
    dailyRemaining: number;
    percentUsed: number;
    inUpstreamCooldown: boolean;
    cooldownSecondsRemaining: number;
  };
  billingProtection: {
    estimatedApiSpendingInr: number;
    estimatedApiSpendingFormatted: string;
    paidServicesStatus: string;
    billingActivationStatus: string;
    autoUpgradeBlocked: boolean;
    paidFallbackBlocked: boolean;
    paidRetryBlocked: boolean;
    serverEnvPaidLockActive: boolean;
  };
  limits: AiPolicyLimitsState;
  paidFeatureProposals: PaidFeatureProposalItem[];
  recentBlockedPaidAttempts: Array<{
    timestamp: string;
    featureCategory: string;
    attemptedModel: string;
    reason: string;
  }>;
  ownerApprovalRecords: Array<{
    featureId: string;
    decision: string;
    note: string;
    decidedBy: string;
    decidedAt: string;
  }>;
}

export const AdminAiBillingControlSection: React.FC = () => {
  const [report, setReport] = useState<OwnerAiPolicyReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);
  const [usageScope, setUsageScope] = useState<'today' | 'all_time'>('today');

  // Editable safety limits draft
  const [limitsDraft, setLimitsDraft] = useState<AiPolicyLimitsState | null>(null);
  const [savingLimits, setSavingLimits] = useState<boolean>(false);

  // Explicit written approval form state (Phase 3)
  const [approvalFeatureId, setApprovalFeatureId] = useState<string | null>(null);
  const [approvalPhrase, setApprovalPhrase] = useState<string>('');
  const [approvalNote, setApprovalNote] = useState<string>('');
  const [submittingDecision, setSubmittingDecision] = useState<boolean>(false);

  const getOwnerAuthHeaders = async (): Promise<Record<string, string>> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    try {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Let server respond with 401 cleanly
    }
    return headers;
  };

  const loadPolicyReport = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const headers = await getOwnerAuthHeaders();
      const res = await fetch('/api/admin/ai-policy', { headers });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setErrorMsg(
          data?.error || 'Owner administrator authentication required to view AI Billing Control.'
        );
        return;
      }
      setReport(data as OwnerAiPolicyReport);
      setLimitsDraft(data.limits as AiPolicyLimitsState);
    } catch {
      setErrorMsg('Unable to reach /api/admin/ai-policy on the backend server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPolicyReport();
  }, [loadPolicyReport]);

  const handleSaveLimits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!limitsDraft) return;
    setSavingLimits(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const headers = await getOwnerAuthHeaders();
      const res = await fetch('/api/admin/ai-policy/limits', {
        method: 'POST',
        headers,
        body: JSON.stringify(limitsDraft),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setErrorMsg(data?.error || data?.message || 'Failed to save free-tier safety limits.');
        return;
      }
      setNoticeMsg(data.message || 'Free-tier safety limits updated.');
      await loadPolicyReport();
    } catch {
      setErrorMsg('Network error while saving AI safety limits.');
    } finally {
      setSavingLimits(false);
    }
  };

  const handleBillingDecision = async (
    action: 'KEEP_FREE_ONLY' | 'DENY_PAID_FEATURE' | 'RECORD_FUTURE_APPROVAL',
    featureId: string
  ) => {
    setSubmittingDecision(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const headers = await getOwnerAuthHeaders();
      const res = await fetch('/api/admin/ai-policy/billing-decision', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action,
          featureId,
          note:
            approvalNote.trim() ||
            (action === 'KEEP_FREE_ONLY'
              ? 'Owner confirmed FREE ONLY billing protection.'
              : action === 'DENY_PAID_FEATURE'
              ? `Owner declined paid activation for ${featureId}.`
              : ''),
          confirmationPhrase: approvalPhrase.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setErrorMsg(data?.message || data?.error || 'Could not record owner billing decision.');
        return;
      }
      setNoticeMsg(data.message || 'Owner decision recorded.');
      setApprovalFeatureId(null);
      setApprovalPhrase('');
      setApprovalNote('');
      await loadPolicyReport();
    } catch {
      setErrorMsg('Network error while recording owner billing decision.');
    } finally {
      setSubmittingDecision(false);
    }
  };

  const activeUsage = report
    ? usageScope === 'today'
      ? report.usageToday
      : report.usageAllTime
    : null;

  return (
    <div className="space-y-6">
      {/* Top Global AI Billing Status Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Lock className="w-3.5 h-3.5" />
              <span>Owner-Only AI Usage &amp; Billing Protection Control Panel</span>
            </div>
            <h2 className="text-2xl font-display font-black tracking-tight">
              AI Usage &amp; Billing Control
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Strict FREE AI ONLY governance across all Student 30, Teacher 40, Core Studio,
              SnapSolve, Dictionary, Translation, and Help &amp; Support services. Zero paid calls or
              billing upgrades can occur without your explicit written permission and server opt-in.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="px-4 py-2.5 rounded-2xl border bg-emerald-950/80 border-emerald-500/60 text-left sm:text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                GLOBAL AI BILLING STATUS
              </div>
              <div className="text-lg font-display font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>{report?.billingStatusLabel || 'FREE ONLY'}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void loadPolicyReport()}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Live Telemetry</span>
              </button>
              <button
                type="button"
                onClick={() => void handleBillingDecision('KEEP_FREE_ONLY', 'ALL')}
                disabled={submittingDecision}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Enforce FREE ONLY</span>
              </button>
            </div>
          </div>
        </div>

        {/* Billing Safety Summary Strip */}
        {report && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3.5">
              <div className="text-[11px] font-bold text-slate-400">Estimated API Spending</div>
              <div className="text-lg font-display font-black text-emerald-300 mt-0.5">
                {report.billingProtection.estimatedApiSpendingFormatted}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3.5">
              <div className="text-[11px] font-bold text-slate-400">Paid Services Status</div>
              <div className="text-xs font-extrabold text-white mt-1">
                {report.billingProtection.paidServicesStatus}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3.5">
              <div className="text-[11px] font-bold text-slate-400">Billing Activation Status</div>
              <div className="text-xs font-extrabold text-amber-300 mt-1">
                {report.billingProtection.billingActivationStatus}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3.5">
              <div className="text-[11px] font-bold text-slate-400">Current Verified Free Models</div>
              <div className="text-xs font-mono font-bold text-sky-300 mt-1">
                Primary: {report.currentModels.primaryModel}
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                Fallback: {report.currentModels.fallbackModel}
              </div>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {noticeMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-900 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="font-semibold">{noticeMsg}</span>
        </div>
      )}

      {loading && !report && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-sm font-semibold text-slate-500">
          Loading AI Usage &amp; Billing Protection telemetry...
        </div>
      )}

      {report && activeUsage && (
        <>
          {/* Usage Breakdown Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span>AI Request Usage Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500">
                  IST Date: {report.dateKeyIst} · Unique active learners today:{' '}
                  {report.usageToday.activeUniqueUsersToday} · Total tokens processed:{' '}
                  {activeUsage.tokens.totalTokens.toLocaleString()}
                </p>
              </div>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUsageScope('today')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    usageScope === 'today'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Today (IST)
                </button>
                <button
                  type="button"
                  onClick={() => setUsageScope('all_time')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    usageScope === 'all_time'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All-Time Recorded
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total AI Requests', value: activeUsage.totalAiRequests, accent: 'text-slate-900 bg-slate-50 border-slate-200' },
                { label: 'Student AI Requests', value: activeUsage.studentAiRequests, accent: 'text-indigo-900 bg-indigo-50/70 border-indigo-200' },
                { label: 'Teacher AI Requests', value: activeUsage.teacherAiRequests, accent: 'text-teal-900 bg-teal-50/70 border-teal-200' },
                { label: 'SnapSolve Requests', value: activeUsage.snapSolveRequests, accent: 'text-sky-900 bg-sky-50/70 border-sky-200' },
                { label: 'Dictionary & Translation', value: activeUsage.dictionaryAndTranslationRequests, accent: 'text-amber-900 bg-amber-50/70 border-amber-200' },
                { label: 'Help & Support AI', value: activeUsage.helpAndSupportRequests, accent: 'text-purple-900 bg-purple-50/70 border-purple-200' },
                { label: 'Zero-Cost KB Hits', value: activeUsage.knowledgeBaseZeroCostHits, accent: 'text-emerald-900 bg-emerald-50/70 border-emerald-200' },
                { label: 'Blocked Paid API Calls', value: activeUsage.blockedPaidApiAttempts, accent: 'text-rose-900 bg-rose-50/70 border-rose-200' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-4 ${stat.accent}`}
                >
                  <div className="text-[11px] font-bold opacity-80">{stat.label}</div>
                  <div className="text-2xl font-display font-black tabular-nums mt-1">
                    {stat.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Free-Tier Quota Consumption Bar */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-black text-slate-900">
                  Daily Free-Tier Quota Consumption ({report.quotaConsumption.dailyUsed.toLocaleString()} /{' '}
                  {report.quotaConsumption.dailyCap.toLocaleString()} requests)
                </span>
                <span className="font-bold text-slate-600 tabular-nums">
                  {report.quotaConsumption.percentUsed}% used · {report.quotaConsumption.dailyRemaining.toLocaleString()} remaining · Resets midnight IST
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    report.quotaConsumption.percentUsed >= 90
                      ? 'bg-rose-500'
                      : report.quotaConsumption.percentUsed >= 70
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(2, report.quotaConsumption.percentUsed))}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 font-medium">
                <span>Core Studio AI today: {report.usageToday.coreStudioAiRequests}</span>
                <span>Free fallback hits today: {report.usageToday.fallbackHits}</span>
                <span>Quota/rate rejections today: {report.usageToday.quotaRejections}</span>
                <span>
                  Gemini Key Configured: {report.geminiKeyConfigured ? 'Yes (Server-Side Only)' : 'Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Model Allowlist & Hard Billing Safeguards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Verified Free Models &amp; Blocked Paid Models</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold text-emerald-800 mb-1.5">
                    Allowed Verified Free-Tier Models (Strict Allowlist)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report.currentModels.verifiedFreeAllowlist.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-rose-800 mb-1.5">
                    Technically Blocked Paid Models (Pre-SDK Hard Gate)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {report.currentModels.blockedPaidModels.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-mono text-[11px]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Auto-upgrade blocked
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Paid fallback blocked
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Paid retries blocked
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Server Env Lock:{' '}
                    {report.billingProtection.serverEnvPaidLockActive ? 'ACTIVE' : 'OPEN'}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Free-Tier Safety Limits */}
            {limitsDraft && (
              <form
                onSubmit={handleSaveLimits}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-600" />
                    <span>Free-Tier Rate &amp; Token Safeguards</span>
                  </h3>
                  <button
                    type="submit"
                    disabled={savingLimits}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingLimits ? 'Saving...' : 'Save Caps'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Global Daily Cap</span>
                    <input
                      type="number"
                      min={50}
                      max={5000}
                      value={limitsDraft.globalDailyRequestCap}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          globalDailyRequestCap: Number(e.target.value) || 50,
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Per-User Daily Total</span>
                    <input
                      type="number"
                      min={5}
                      max={250}
                      value={limitsDraft.perUserDailyTotalCap}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          perUserDailyTotalCap: Number(e.target.value) || 10,
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">IP 10-Min Burst</span>
                    <input
                      type="number"
                      min={5}
                      max={100}
                      value={limitsDraft.perIpTenMinuteCap}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          perIpTenMinuteCap: Number(e.target.value) || 10,
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Student Daily Cap</span>
                    <input
                      type="number"
                      min={5}
                      max={150}
                      value={limitsDraft.perUserDailyLimits.student_ai}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          perUserDailyLimits: {
                            ...limitsDraft.perUserDailyLimits,
                            student_ai: Number(e.target.value) || 5,
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Teacher Daily Cap</span>
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={limitsDraft.perUserDailyLimits.teacher_ai}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          perUserDailyLimits: {
                            ...limitsDraft.perUserDailyLimits,
                            teacher_ai: Number(e.target.value) || 5,
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">SnapSolve Daily Cap</span>
                    <input
                      type="number"
                      min={2}
                      max={60}
                      value={limitsDraft.perUserDailyLimits.snapsolve}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          perUserDailyLimits: {
                            ...limitsDraft.perUserDailyLimits,
                            snapsolve: Number(e.target.value) || 2,
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Max Input Chars</span>
                    <input
                      type="number"
                      min={2000}
                      max={32000}
                      value={limitsDraft.maxInputChars}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          maxInputChars: Number(e.target.value) || 4000,
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="font-bold text-slate-700">Max Output Tokens</span>
                    <input
                      type="number"
                      min={512}
                      max={8192}
                      value={limitsDraft.maxOutputTokens}
                      onChange={(e) =>
                        setLimitsDraft({
                          ...limitsDraft,
                          maxOutputTokens: Number(e.target.value) || 1024,
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </label>
                </div>
              </form>
            )}
          </div>

          {/* PHASE 3: OWNER PERMISSION NOTIFICATION FOR PAID FEATURES */}
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-800 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Owner Permission Required Before Any Paid AI Feature Activation</span>
                </div>
                <h3 className="text-lg font-display font-black text-slate-900 mt-0.5">
                  Features Blocked Because No Free Google API Tier Exists
                </h3>
                <p className="text-xs text-slate-600">
                  Silence, quota exhaustion, server restarts, or deployments never count as approval.
                  Paid execution remains technically locked until you give explicit written permission
                  AND enable <span className="font-mono font-bold">ALLOW_APPROVED_PAID_AI=true</span>{' '}
                  on the server.
                </p>
              </div>
            </div>

            {report.paidFeatureProposals.map((proposal) => (
              <div
                key={proposal.featureId}
                className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-display font-black text-slate-900">
                      {proposal.featureName}
                    </h4>
                    <div className="text-xs font-mono text-rose-700 font-bold mt-0.5">
                      Paid Model: {proposal.paidModelName}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-rose-100 text-rose-900 border border-rose-200">
                    {proposal.status === 'DENIED_BY_OWNER'
                      ? 'DENIED BY OWNER (BLOCKED)'
                      : proposal.status === 'APPROVED_AWAITING_SERVER_ENV'
                      ? 'INTENT LOGGED · SERVER LOCKED (FREE ONLY)'
                      : 'BLOCKED — FREE AI ONLY'}
                  </span>
                </div>

                {/* All 8 Mandatory Phase 3 Transparency Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">1. Feature Requiring Paid Access</div>
                    <div className="font-bold text-slate-900 mt-0.5">{proposal.featureName}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">2. Paid Model Name</div>
                    <div className="font-mono font-bold text-slate-900 mt-0.5">{proposal.paidModelName}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3 md:col-span-2">
                    <div className="font-bold text-slate-500">3. Why Free Alternatives Are Insufficient</div>
                    <div className="text-slate-800 mt-0.5">{proposal.reasonFreeInsufficient}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">4. Estimated Requests / Month</div>
                    <div className="font-bold text-slate-900 mt-0.5">{proposal.estimatedRequestsPerMonth}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">5. Estimated Monthly Cost (INR)</div>
                    <div className="font-bold text-rose-800 mt-0.5">{proposal.estimatedMonthlyCostInr}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">6. Maximum Possible Monthly Cost (Under Caps)</div>
                    <div className="font-bold text-rose-900 mt-0.5">{proposal.maxPossibleMonthlyCostInr}</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <div className="font-bold text-slate-500">7. Google Cloud Billing Required?</div>
                    <div className="font-black text-rose-700 mt-0.5">
                      {proposal.billingMustBeEnabled
                        ? 'YES — Billing must be explicitly enabled by Owner'
                        : 'No'}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-emerald-200 p-3 md:col-span-2">
                    <div className="font-bold text-emerald-800">8. Available Free Alternatives (Active Now at ₹0)</div>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-800">
                      {proposal.availableFreeAlternatives.map((alt) => (
                        <li key={alt}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Owner Action Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => void handleBillingDecision('DENY_PAID_FEATURE', proposal.featureId)}
                    disabled={submittingDecision}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Keep Blocked (FREE ONLY)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setApprovalFeatureId(
                        approvalFeatureId === proposal.featureId ? null : proposal.featureId
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Future Upgrade Option (Requires Written Approval)</span>
                  </button>
                </div>

                {approvalFeatureId === proposal.featureId && (
                  <div className="rounded-xl bg-white border border-amber-300 p-4 space-y-3 text-xs">
                    <p className="font-bold text-slate-900">
                      Future Paid Upgrade Authorization (Two-Layer Lock):
                    </p>
                    <p className="text-slate-600">
                      To record explicit written approval intent, type{' '}
                      <span className="font-mono font-black text-rose-700">
                        APPROVE PAID {proposal.featureId.toUpperCase()}
                      </span>{' '}
                      below. Even after recording written approval, NO paid API call can run unless
                      you also intentionally enable billing and configure{' '}
                      <span className="font-mono font-bold">ALLOW_APPROVED_PAID_AI=true</span> on the
                      server.
                    </p>
                    <input
                      type="text"
                      value={approvalPhrase}
                      onChange={(e) => setApprovalPhrase(e.target.value)}
                      placeholder={`Type: APPROVE PAID ${proposal.featureId.toUpperCase()}`}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                    <input
                      type="text"
                      value={approvalNote}
                      onChange={(e) => setApprovalNote(e.target.value)}
                      placeholder="Optional written owner budget note (e.g., max ₹3,000/month)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={submittingDecision}
                        onClick={() =>
                          void handleBillingDecision('RECORD_FUTURE_APPROVAL', proposal.featureId)
                        }
                        className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                      >
                        Record Written Approval Intent
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setApprovalFeatureId(null);
                          setApprovalPhrase('');
                          setApprovalNote('');
                        }}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Audit Logs: Blocked Paid API Attempts */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h3 className="text-base font-display font-black text-slate-900">
              Recent Blocked Paid API Attempts Audit Log ({report.recentBlockedPaidAttempts.length})
            </h3>
            {report.recentBlockedPaidAttempts.length === 0 ? (
              <p className="text-xs text-slate-500">
                No paid model calls attempted yet. Every non-free model is blocked automatically before
                leaving the server.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2 pr-3 font-bold">Time (UTC)</th>
                      <th className="py-2 pr-3 font-bold">Feature</th>
                      <th className="py-2 pr-3 font-bold">Blocked Model</th>
                      <th className="py-2 font-bold">Protection Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.recentBlockedPaidAttempts.map((entry, idx) => (
                      <tr key={`${entry.timestamp}-${idx}`} className="border-b border-slate-100">
                        <td className="py-2 pr-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {entry.timestamp.replace('T', ' ').slice(0, 19)}
                        </td>
                        <td className="py-2 pr-3 font-bold text-slate-800">{entry.featureCategory}</td>
                        <td className="py-2 pr-3 font-mono text-rose-700 font-bold">
                          {entry.attemptedModel}
                        </td>
                        <td className="py-2 text-slate-700">{entry.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
