import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Filter,
  Flag,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  TET_CTET_REPORT_CATEGORIES,
  TET_CTET_REPORT_STATUSES,
  TetCtetProposedCorrectionRecord,
  TetCtetQuestionErrorReport,
  TetCtetReportCategory,
  TetCtetReportStatus,
} from '../../types/questionErrorReport';
import {
  adminCreateSeparateProposedCorrection,
  adminUpdateQuestionReportStatus,
  fetchAllQuestionErrorReports,
  getAllLocalQuestionErrorReports,
  getAllProposedCorrectionRecords,
  subscribeToQuestionErrorReports,
  validateProposedCorrectionPayload,
} from '../../services/questionErrorReportService';
import { TET_CTET_MODULE_LIST } from '../../data/tetCtetSyllabi';
import { getReportStatusBadgeStyle } from '../TetCtetReportQuestionModal';

export const AdminQuestionErrorReportsSection: React.FC = () => {
  const { activeRole, currentUser } = useApp();
  const isAuthorizedAdmin = activeRole === 'admin' || currentUser?.role === 'admin';
  const adminDisplayName =
    currentUser?.email || 'Master Administrator (ronakvarade2022@gmail.com)';

  const [reports, setReports] = useState<TetCtetQuestionErrorReport[]>(() =>
    getAllLocalQuestionErrorReports()
  );
  const [proposedCorrections, setProposedCorrections] = useState<
    TetCtetProposedCorrectionRecord[]
  >(() => getAllProposedCorrectionRecords());
  const [activeViewMode, setActiveViewMode] = useState<'reports' | 'corrections'>('reports');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [actionBanner, setActionBanner] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // 7 Required Filters
  const [filterTestNumber, setFilterTestNumber] = useState<string>('ALL');
  const [filterModule, setFilterModule] = useState<string>('ALL');
  const [filterSubject, setFilterSubject] = useState<string>('ALL');
  const [filterQuestionId, setFilterQuestionId] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterLanguage, setFilterLanguage] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Detailed Inspector / Controlled Correction Modal state
  const [inspectingReport, setInspectingReport] = useState<TetCtetQuestionErrorReport | null>(
    null
  );
  const [adminNotesInput, setAdminNotesInput] = useState<string>('');

  // Separate Proposed Correction Form state
  const [showCorrectionForm, setShowCorrectionForm] = useState<boolean>(false);
  const [propQuestionText, setPropQuestionText] = useState<string>('');
  const [propOpt0, setPropOpt0] = useState<string>('');
  const [propOpt1, setPropOpt1] = useState<string>('');
  const [propOpt2, setPropOpt2] = useState<string>('');
  const [propOpt3, setPropOpt3] = useState<string>('');
  const [propCorrectAnswer, setPropCorrectAnswer] = useState<number>(0);
  const [propExplanation, setPropExplanation] = useState<string>('');
  const [propLanguages, setPropLanguages] = useState<string[]>(['English', 'Marathi', 'Hindi']);
  const [propSummary, setPropSummary] = useState<string>('');

  const reloadData = async () => {
    setIsRefreshing(true);
    try {
      const latest = await fetchAllQuestionErrorReports();
      setReports(latest);
      setProposedCorrections(getAllProposedCorrectionRecords());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void reloadData();
    const unsub = subscribeToQuestionErrorReports(() => {
      setReports(getAllLocalQuestionErrorReports());
      setProposedCorrections(getAllProposedCorrectionRecords());
    });
    return unsub;
  }, []);

  // 6 Required KPI Counters
  const kpiStats = useMemo(() => {
    const totalReports = reports.length;
    const pendingReports = reports.filter((r) => r.status === 'Submitted').length;
    const underReview = reports.filter((r) => r.status === 'Under Review').length;
    const confirmedErrors = reports.filter((r) => r.status === 'Confirmed').length;
    const correctedReports = reports.filter((r) => r.status === 'Corrected').length;
    const rejectedReports = reports.filter((r) => r.status === 'Rejected').length;
    return {
      totalReports,
      pendingReports,
      underReview,
      confirmedErrors,
      correctedReports,
      rejectedReports,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    const qQuery = filterQuestionId.trim().toLowerCase();
    return reports.filter((r) => {
      if (filterTestNumber !== 'ALL' && Number(r.testNumber) !== Number(filterTestNumber)) {
        return false;
      }
      if (filterModule !== 'ALL' && r.moduleId !== filterModule) {
        return false;
      }
      if (filterSubject !== 'ALL' && r.subjectId !== filterSubject) {
        return false;
      }
      if (
        qQuery &&
        !r.questionId.toLowerCase().includes(qQuery) &&
        !r.reportNumber.toLowerCase().includes(qQuery) &&
        !r.originalQuestionText.toLowerCase().includes(qQuery)
      ) {
        return false;
      }
      if (filterCategory !== 'ALL' && r.reportCategory !== filterCategory) {
        return false;
      }
      if (
        filterLanguage !== 'ALL' &&
        String(r.selectedLanguage).toLowerCase() !== filterLanguage.toLowerCase()
      ) {
        return false;
      }
      if (filterStatus !== 'ALL' && r.status !== filterStatus) {
        return false;
      }
      return true;
    });
  }, [
    reports,
    filterTestNumber,
    filterModule,
    filterSubject,
    filterQuestionId,
    filterCategory,
    filterLanguage,
    filterStatus,
  ]);

  const openReportInspector = (rep: TetCtetQuestionErrorReport, openCorrection = false) => {
    setInspectingReport(rep);
    setAdminNotesInput(rep.adminRemarks || '');
    setPropQuestionText(rep.originalQuestionText);
    setPropOpt0(rep.originalOptions[0] || '');
    setPropOpt1(rep.originalOptions[1] || '');
    setPropOpt2(rep.originalOptions[2] || '');
    setPropOpt3(rep.originalOptions[3] || '');
    setPropCorrectAnswer(rep.originalCorrectAnswer);
    setPropExplanation(rep.originalExplanation || '');
    setPropLanguages(
      rep.selectedLanguage === 'Urdu'
        ? ['Urdu', 'English', 'Marathi', 'Hindi']
        : ['English', 'Marathi', 'Hindi']
    );
    setPropSummary(
      `Manual admin verification completed for ${rep.questionId} (${rep.reportCategory}).`
    );
    setShowCorrectionForm(openCorrection);
  };

  const handleStatusAction = async (
    rep: TetCtetQuestionErrorReport,
    nextStatus: TetCtetReportStatus,
    remarksOverride?: string
  ) => {
    const res = await adminUpdateQuestionReportStatus({
      reportId: rep.id,
      newStatus: nextStatus,
      adminName: adminDisplayName,
      adminRemarks: remarksOverride ?? adminNotesInput,
      isAuthorizedAdmin,
    });

    setActionBanner({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });

    if (res.success && res.updatedReport) {
      setReports(getAllLocalQuestionErrorReports());
      if (inspectingReport?.id === rep.id) {
        setInspectingReport(res.updatedReport);
      }
    }
  };

  const liveCorrectionValidation = useMemo(() => {
    return validateProposedCorrectionPayload({
      proposedQuestionText: propQuestionText,
      proposedOptions: [propOpt0, propOpt1, propOpt2, propOpt3],
      proposedCorrectAnswer: propCorrectAnswer,
      proposedExplanation: propExplanation,
      affectedLanguages: propLanguages,
    });
  }, [
    propQuestionText,
    propOpt0,
    propOpt1,
    propOpt2,
    propOpt3,
    propCorrectAnswer,
    propExplanation,
    propLanguages,
  ]);

  const handleSaveProposedCorrection = async (approveImmediately: boolean) => {
    if (!inspectingReport) return;
    const res = await adminCreateSeparateProposedCorrection({
      reportId: inspectingReport.id,
      proposedQuestionText: propQuestionText,
      proposedOptions: [propOpt0, propOpt1, propOpt2, propOpt3],
      proposedCorrectAnswer: propCorrectAnswer,
      proposedExplanation: propExplanation,
      affectedLanguages: propLanguages,
      correctionSummary: propSummary,
      adminName: adminDisplayName,
      approveImmediately,
      isAuthorizedAdmin,
    });

    setActionBanner({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });

    if (res.success && res.updatedReport) {
      setReports(getAllLocalQuestionErrorReports());
      setProposedCorrections(getAllProposedCorrectionRecords());
      setInspectingReport(res.updatedReport);
      if (approveImmediately) {
        setShowCorrectionForm(false);
      }
    }
  };

  const toggleLanguageSelection = (lang: string) => {
    setPropLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-700">
              <Flag className="w-4 h-4 fill-current" />
              <span>Separate Read-Only Question Quality Reporting System</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
              🚩 QUESTION ERROR REPORTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Review student-submitted question reports across all 200 GREEN mock tests. Submitting or
              reviewing a report never modifies the canonical question bank automatically; confirmed
              corrections are stored in a separate auditable Proposed Corrections table.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveViewMode('reports')}
                className={`px-3.5 py-2 rounded-lg text-xs font-display font-black cursor-pointer ${
                  activeViewMode === 'reports'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Error Reports ({reports.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveViewMode('corrections')}
                className={`px-3.5 py-2 rounded-lg text-xs font-display font-black cursor-pointer ${
                  activeViewMode === 'corrections'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Proposed Corrections ({proposedCorrections.length})
              </button>
            </div>

            <button
              type="button"
              onClick={() => void reloadData()}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Read-Only Protection Status Strip */}
        <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Canonical Question Bank Protection: ACTIVE (200/200 GREEN Mock Tests · 36,480 Unique
              Canonical Questions Locked READ-ONLY)
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-800">
            Separate Storage: vc_tet_ctet_question_error_reports_v1
          </span>
        </div>

        {/* 6 Required KPI Summary Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Total Reports
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-slate-900">
              {kpiStats.totalReports}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase block">
              Pending Reports
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-amber-950">
              {kpiStats.pendingReports}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <span className="text-[11px] font-bold text-blue-800 uppercase block">
              Under Review
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-blue-950">
              {kpiStats.underReview}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-[11px] font-bold text-purple-800 uppercase block">
              Confirmed Errors
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-purple-950">
              {kpiStats.confirmedErrors}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-800 uppercase block">
              Corrected Reports
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-emerald-950">
              {kpiStats.correctedReports}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] font-bold text-rose-800 uppercase block">
              Rejected Reports
            </span>
            <span className="text-2xl font-mono tabular-nums font-black text-rose-950">
              {kpiStats.rejectedReports}
            </span>
          </div>
        </div>

        {actionBanner && (
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs font-bold ${
              actionBanner.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <span>{actionBanner.text}</span>
            <button
              type="button"
              onClick={() => setActionBanner(null)}
              className="text-xs font-black underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          VIEW 1: STUDENT QUESTION ERROR REPORTS LIST & 7 FILTERS
          ===================================================================== */}
      {activeViewMode === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          {/* 7 Required Filters Bar */}
          <div className="space-y-3 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                <Filter className="w-4 h-4 text-indigo-700" />
                <span>Filter Question Error Reports:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilterTestNumber('ALL');
                  setFilterModule('ALL');
                  setFilterSubject('ALL');
                  setFilterQuestionId('');
                  setFilterCategory('ALL');
                  setFilterLanguage('ALL');
                  setFilterStatus('ALL');
                }}
                className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* 1. Module Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">1. Module</label>
                <select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All 4 Modules</option>
                  {TET_CTET_MODULE_LIST.map((m) => (
                    <option key={m.moduleId} value={m.moduleId}>
                      {m.examTitle} · {m.paperTitle} ({m.moduleId})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Test Number Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">2. Test Number</label>
                <select
                  value={filterTestNumber}
                  onChange={(e) => setFilterTestNumber(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All Mock Tests (1–50)</option>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((tNum) => (
                    <option key={tNum} value={String(tNum)}>
                      Mock Test {String(tNum).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Subject Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">3. Subject</label>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All Subjects</option>
                  <option value="CDP">Child Development &amp; Pedagogy (CDP)</option>
                  <option value="LANGUAGE_1">Language 1</option>
                  <option value="LANGUAGE_2">Language 2</option>
                  <option value="MATHEMATICS">Mathematics</option>
                  <option value="EVS">Environmental Studies (EVS)</option>
                  <option value="SCIENCE">Science</option>
                  <option value="SOCIAL_STUDIES">Social Studies / Social Science</option>
                </select>
              </div>

              {/* 4. Error Category Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">4. Error Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All 9 Categories</option>
                  {TET_CTET_REPORT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Language Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">5. Language</label>
                <select
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All Languages (English / Marathi / Hindi / Urdu)</option>
                  <option value="English">English</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>

              {/* 6. Report Status Filter */}
              <div>
                <label className="block font-bold text-slate-600 mb-1">6. Report Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                >
                  <option value="ALL">All Statuses</option>
                  {TET_CTET_REPORT_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* 7. Question ID / Search Filter */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-600 mb-1">
                  7. Question ID / Report Ref Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={filterQuestionId}
                    onChange={(e) => setFilterQuestionId(e.target.value)}
                    placeholder="Search by Question ID (e.g. MAHA_TET_P1_T1_Q1), Report # (QER-...), or stem..."
                    className="w-full min-h-[40px] pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          {filteredReports.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <Flag className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-display font-black text-slate-900">
                No Question Error Reports Match Your Filter
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                When students click &ldquo;🚩 Report Question&rdquo; during a Mock Test or post-exam
                Question Review, their reports appear here automatically with full question metadata.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl bg-slate-50/70 border border-slate-200 p-4 sm:p-5 space-y-3 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-black">
                        {rep.reportNumber}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg border font-black ${getReportStatusBadgeStyle(
                          rep.status
                        )}`}
                      >
                        {rep.status}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 font-bold">
                        {rep.reportCategory}
                      </span>
                      <span className="font-mono font-bold text-indigo-900">
                        {rep.moduleId} · Test #{String(rep.testNumber).padStart(2, '0')} · Q
                        {rep.questionNumber}
                      </span>
                      <span className="text-slate-600 font-semibold">
                        ({rep.subject} · {rep.selectedLanguage})
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(rep.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Question Stem & Student Explanation Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                    <div className="lg:col-span-8 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span>Question ID: {rep.questionId}</span>
                        <span>
                          Correct Answer Key: Option{' '}
                          {String.fromCharCode(65 + rep.originalCorrectAnswer)}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-line">
                        {rep.originalQuestionText}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {rep.originalOptions.map((opt, oIdx) => {
                          const isKey = oIdx === rep.originalCorrectAnswer;
                          return (
                            <div
                              key={oIdx}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold ${
                                isKey
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt} {isKey ? '✓ (Key)' : ''}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between gap-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Reported By Student
                        </span>
                        <p className="font-bold text-slate-900">
                          {rep.studentName}{' '}
                          <span className="font-mono text-[11px] text-slate-500">
                            ({rep.studentId})
                          </span>
                        </p>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pt-1">
                          Student Explanation
                        </span>
                        <p className="text-slate-700 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          {rep.studentExplanation || 'No additional text provided by student.'}
                        </p>
                        {rep.reviewedByAdmin && (
                          <p className="text-[11px] text-indigo-800 font-semibold pt-1">
                            Last Reviewed by: {rep.reviewedByAdmin}
                            {rep.adminRemarks ? ` — "${rep.adminRemarks}"` : ''}
                          </p>
                        )}
                      </div>

                      {/* Admin Quick Action Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => openReportInspector(rep, false)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Full Question</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleStatusAction(rep, 'Under Review')}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-[11px] cursor-pointer"
                        >
                          Mark Under Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            void handleStatusAction(rep, 'Confirmed');
                            openReportInspector(rep, true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-[11px] cursor-pointer"
                        >
                          Confirm Error
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleStatusAction(rep, 'Rejected')}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 font-bold text-[11px] cursor-pointer"
                        >
                          Reject Report
                        </button>
                        <button
                          type="button"
                          onClick={() => openReportInspector(rep, true)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                        >
                          Mark Resolved / Propose Correction
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          VIEW 2: SEPARATE PROPOSED CORRECTIONS LOG (ORIGINAL VS PROPOSED)
          ===================================================================== */}
      {activeViewMode === 'corrections' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg font-display font-black text-slate-900">
              Separate Proposed Question Corrections Audit Log ({proposedCorrections.length})
            </h3>
            <p className="text-xs text-slate-600">
              Every confirmed correction is stored as an independent record preserving the original
              question snapshot, administrator identity, revalidated languages, and approval
              timestamp. Canonical question bank files remain 100% untouched.
            </p>
          </div>

          {proposedCorrections.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <FileCheck2 className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                No Proposed Correction Records Created Yet
              </p>
              <p className="text-xs text-slate-500">
                When an administrator confirms an error and approves a proposed correction from a
                student report, the record is logged here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {proposedCorrections.map((corr) => (
                <div
                  key={corr.id}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-mono font-black">
                        {corr.id}
                      </span>
                      <span className="font-mono font-bold text-slate-700">
                        Report: {corr.reportNumber} · Question: {corr.questionId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 font-black">
                        {corr.approvalStatus}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      Approved by {corr.approvedByAdmin || corr.createdByAdmin} ·{' '}
                      {new Date(corr.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Original Preserved Snapshot */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 block">
                        Preserved Original Question (Read-Only Bank)
                      </span>
                      <p className="font-bold text-slate-900">
                        {corr.originalQuestionSnapshot.questionText}
                      </p>
                      <div className="space-y-1">
                        {corr.originalQuestionSnapshot.options.map((o, idx) => (
                          <div
                            key={idx}
                            className={`px-2 py-1 rounded text-[11px] ${
                              idx === corr.originalQuestionSnapshot.correctAnswer
                                ? 'bg-emerald-50 font-bold text-emerald-900'
                                : 'text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}. {o}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Proposed Separate Correction */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-emerald-800">
                          Approved Proposed Correction Record
                        </span>
                        <span className="text-[10px] font-bold text-indigo-800">
                          Languages Revalidated: {corr.affectedLanguages.join(', ')}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900">{corr.proposedQuestionText}</p>
                      <div className="space-y-1">
                        {corr.proposedOptions.map((o, idx) => (
                          <div
                            key={idx}
                            className={`px-2 py-1 rounded text-[11px] ${
                              idx === corr.proposedCorrectAnswer
                                ? 'bg-emerald-100 font-bold text-emerald-950'
                                : 'text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}. {o}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-700 pt-1">
                        <strong>Explanation:</strong> {corr.proposedExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          DETAILED REPORT INSPECTOR & CONTROLLED CORRECTION MODAL
          ===================================================================== */}
      {inspectingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between gap-3 shrink-0">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase">
                  Admin Question Error Review · {inspectingReport.reportNumber}
                </span>
                <h3 className="text-base sm:text-lg font-display font-black text-white">
                  {inspectingReport.moduleTitle} · Mock Test{' '}
                  {String(inspectingReport.testNumber).padStart(2, '0')} · Question #
                  {inspectingReport.questionNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingReport(null)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Question ID
                  </span>
                  <span className="font-mono font-black text-slate-900">
                    {inspectingReport.questionId}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Subject &amp; Language
                  </span>
                  <span className="font-bold text-slate-900">
                    {inspectingReport.subject} ({inspectingReport.selectedLanguage})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Reported Category
                  </span>
                  <span className="font-bold text-rose-700">
                    {inspectingReport.reportCategory}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Current Status
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded border font-black text-[11px] ${getReportStatusBadgeStyle(
                      inspectingReport.status
                    )}`}
                  >
                    {inspectingReport.status}
                  </span>
                </div>
              </div>

              {/* Original Question, All 4 Options, Correct Answer & Explanation */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-sm text-slate-900">
                    Original Question &amp; Answer Key (Read-Only Verified Bank)
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700">
                    Original Question Preserved
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-900 whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {inspectingReport.originalQuestionText}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inspectingReport.originalOptions.map((opt, idx) => {
                    const isCorrect = idx === inspectingReport.originalCorrectAnswer;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border font-semibold ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        Option {String.fromCharCode(65 + idx)}: {opt}{' '}
                        {isCorrect && '✓ (Verified Correct Answer Key)'}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800">
                  <strong>Original Explanation:</strong>{' '}
                  {inspectingReport.originalExplanation || 'Standard syllabus explanation.'}
                </div>
              </div>

              {/* Student Report Explanation & Admin Review Remarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-rose-800 block">
                    Student Report Details ({inspectingReport.studentName} · ID:{' '}
                    {inspectingReport.studentId})
                  </span>
                  <p className="font-bold text-slate-900">
                    Category: {inspectingReport.reportCategory}
                  </p>
                  <p className="text-slate-700">
                    {inspectingReport.studentExplanation ||
                      'Student did not enter additional remarks.'}
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Submitted: {new Date(inspectingReport.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block font-bold text-slate-800">
                    Administrator Review Remarks:
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    placeholder="Add verification notes or textbook/syllabus reference..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  />
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => void handleStatusAction(inspectingReport, 'Under Review')}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                    >
                      Mark Under Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        void handleStatusAction(inspectingReport, 'Confirmed');
                        setShowCorrectionForm(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer"
                    >
                      Confirm Error
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleStatusAction(inspectingReport, 'Rejected')}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
                    >
                      Reject Report
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleStatusAction(inspectingReport, 'Corrected')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCorrectionForm((prev) => !prev)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
                    >
                      {showCorrectionForm
                        ? 'Hide Proposed Correction Builder'
                        : 'Create Proposed Correction Record'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Controlled Separate Proposed Correction Builder */}
              {showCorrectionForm && (
                <div className="p-5 rounded-2xl bg-indigo-50/60 border-2 border-indigo-300 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-display font-black text-indigo-950">
                        Controlled Proposed Correction Record Builder (Separate Table)
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Creates a separate proposed correction record preserving the original
                        question and its history. Canonical question bank files remain strictly
                        READ-ONLY.
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg font-black text-[11px] ${
                        liveCorrectionValidation.isValid
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {liveCorrectionValidation.isValid
                        ? '✓ Validation Passed'
                        : 'Validation Incomplete'}
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Proposed Question Text:
                    </label>
                    <textarea
                      rows={2}
                      value={propQuestionText}
                      onChange={(e) => setPropQuestionText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: 'Option A', val: propOpt0, setVal: setPropOpt0, idx: 0 },
                      { label: 'Option B', val: propOpt1, setVal: setPropOpt1, idx: 1 },
                      { label: 'Option C', val: propOpt2, setVal: setPropOpt2, idx: 2 },
                      { label: 'Option D', val: propOpt3, setVal: setPropOpt3, idx: 3 },
                    ].map((item) => (
                      <div key={item.idx} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-700">{item.label}</label>
                          <label className="flex items-center gap-1 text-[11px] font-bold text-indigo-800 cursor-pointer">
                            <input
                              type="radio"
                              name="propCorrectIdx"
                              checked={propCorrectAnswer === item.idx}
                              onChange={() => setPropCorrectAnswer(item.idx)}
                            />
                            <span>Correct Key</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={item.val}
                          onChange={(e) => item.setVal(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Verified Explanation:
                    </label>
                    <textarea
                      rows={2}
                      value={propExplanation}
                      onChange={(e) => setPropExplanation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="block font-bold text-slate-800 mb-1">
                        Revalidate Affected Language Versions:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Marathi', 'Hindi', 'Urdu'].map((lang) => (
                          <label
                            key={lang}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 font-bold cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={propLanguages.includes(lang)}
                              onChange={() => toggleLanguageSelection(lang)}
                            />
                            <span>{lang}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        Admin Correction Summary / Audit Note:
                      </label>
                      <input
                        type="text"
                        value={propSummary}
                        onChange={(e) => setPropSummary(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => void handleSaveProposedCorrection(false)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold cursor-pointer"
                    >
                      Save Draft Proposed Record
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleSaveProposedCorrection(true)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black cursor-pointer shadow-xs"
                    >
                      Approve Correction &amp; Mark Report Corrected
                    </button>
                  </div>
                </div>
              )}

              {/* Complete Report Status History */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-display font-black text-xs text-slate-800 uppercase">
                  Report Audit Trail &amp; History
                </h4>
                <div className="space-y-1.5">
                  {(inspectingReport.statusHistory || []).map((h, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center justify-between gap-2 text-[11px] bg-white px-3 py-2 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded border font-black text-[10px] ${getReportStatusBadgeStyle(
                            h.status
                          )}`}
                        >
                          {h.status}
                        </span>
                        <span className="font-bold text-slate-900">
                          {h.actorName} ({h.actorRole})
                        </span>
                        {h.note && <span className="text-slate-600">— {h.note}</span>}
                      </div>
                      <span className="font-mono text-slate-500">
                        {new Date(h.timestamp).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
