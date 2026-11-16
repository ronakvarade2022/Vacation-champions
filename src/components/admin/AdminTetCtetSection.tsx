import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  FileSearch,
  Flag,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  TetCtetAttemptRecord,
  TetCtetModuleId,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../../types/tetCtet';
import {
  TET_CTET_MODULE_LIST,
  TET_CTET_MODULES,
} from '../../data/tetCtetSyllabi';
import {
  buildTetCtetMockPaper,
  checkTetCtetCandidateDuplicate,
} from '../../data/tetCtetQuestionEngine';
import {
  ConsolidatedTetCtetAuditReport,
  MockTestPublicationStatus,
  runCentralizedTetCtetAudit,
  validateSingleTetCtetQuestion,
} from '../../data/tetCtetCentralAuditEngine';
import { LATEST_TET_CTET_CENTRAL_AUDIT } from '../../data/tetCtetCentralAuditSnapshot';
import {
  getTetCtetAuditSummary,
  TET_CTET_AUDIT_BATCHES,
} from '../../data/tetCtetAuditTracker';
import { formatHhMmSs } from '../TetCtetExamSimulator';
import { AdminQuestionErrorReportsSection } from './AdminQuestionErrorReportsSection';

type AdminTetTab = 'batches' | 'inspector' | 'audit' | 'monitor' | 'error-reports';

export const AdminTetCtetSection: React.FC = () => {
  const {
    studentsList,
    tetCtetAttempts,
    tetCtetBatches,
    verifyAndGenerateTetCtetBatch,
    toggleTetCtetBatchApproved,
    toggleTetCtetBatchPublished,
    customTetCtetQuestions,
    saveCustomTetCtetQuestion,
    rejectedTetCtetIds,
    toggleRejectTetCtetQuestion,
    tetCtetEnforceGreenOnly,
    toggleTetCtetEnforceGreenOnly,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTetTab>('batches');
  const [batchModuleFilter, setBatchModuleFilter] = useState<TetCtetModuleId | 'ALL'>('ALL');
  const [batchFeedback, setBatchFeedback] = useState<string | null>(null);
  const [qaStatusFilter, setQaStatusFilter] = useState<'ALL' | MockTestPublicationStatus>('ALL');
  const [qaModuleFilter, setQaModuleFilter] = useState<TetCtetModuleId | 'ALL'>('ALL');

  // Inspector states
  const [inspectModule, setInspectModule] = useState<TetCtetModuleId>('MAHA_TET_P1');
  const [inspectTestNum, setInspectTestNum] = useState<number>(1);
  const [inspectSubject, setInspectSubject] = useState<TetCtetSubjectId | 'ALL'>('ALL');
  const [editingQuestion, setEditingQuestion] = useState<TetCtetQuestion | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Centralized Automated Audit state (pre-loaded from verified snapshot or saved session record)
  const [auditReport, setAuditReport] = useState<ConsolidatedTetCtetAuditReport>(() => {
    try {
      const saved = localStorage.getItem('vc_tet_ctet_central_audit_record');
      if (saved) {
        const parsed = JSON.parse(saved) as ConsolidatedTetCtetAuditReport;
        if (
          parsed &&
          typeof parsed.totalQuestions === 'number' &&
          parsed.moduleBreakdown &&
          parsed.publicationSummary &&
          parsed.defectClassification
        ) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage parse error and fall back to verified snapshot
    }
    return LATEST_TET_CTET_CENTRAL_AUDIT;
  });

  // Module Progress Calculation (X/50 Tests Verified per Module)
  const moduleStats = useMemo(() => {
    return TET_CTET_MODULE_LIST.map((mod) => {
      const modBatches = Object.values(tetCtetBatches).filter((b) => b.moduleId === mod.moduleId);
      const verifiedTests = modBatches.reduce((sum, b) => sum + (b.verified ? b.totalTests : 0), 0);
      const publishedTests = modBatches.reduce((sum, b) => sum + (b.published ? b.totalTests : 0), 0);
      const approvedBatches = modBatches.filter((b) => b.approved).length;
      return {
        ...mod,
        verifiedTests,
        publishedTests,
        approvedBatches,
      };
    });
  }, [tetCtetBatches]);

  const filteredBatches = useMemo(() => {
    return Object.values(tetCtetBatches)
      .filter((b) => batchModuleFilter === 'ALL' || b.moduleId === batchModuleFilter)
      .sort((a, b) => {
        if (a.moduleId !== b.moduleId) return a.moduleId.localeCompare(b.moduleId);
        return a.batchNumber - b.batchNumber;
      });
  }, [tetCtetBatches, batchModuleFilter]);

  // Inspected Mock Paper
  const inspectedQuestions = useMemo(() => {
    const mod = TET_CTET_MODULES[inspectModule];
    const paperQs = buildTetCtetMockPaper({
      exam: mod.exam,
      paper: mod.paper,
      testNumber: inspectTestNum,
      language1: mod.defaultL1,
      language2: mod.defaultL2,
      medium: mod.supportedMediums[0],
      stream: 'MATH_SCIENCE',
      customOverrides: customTetCtetQuestions,
      rejectedIds: rejectedTetCtetIds,
    });
    if (inspectSubject === 'ALL') return paperQs;
    return paperQs.filter((q) => q.subjectId === inspectSubject);
  }, [inspectModule, inspectTestNum, inspectSubject, customTetCtetQuestions, rejectedTetCtetIds]);

  // Consolidated student TET/CTET attempts across registered students + guest session
  const allCandidateAttempts = useMemo(() => {
    const map = new Map<string, { studentName: string; studentId: string; attempt: TetCtetAttemptRecord }>();
    for (const s of studentsList) {
      for (const att of s.tetCtetAttempts || []) {
        map.set(att.id, { studentName: s.name, studentId: s.id, attempt: att });
      }
    }
    for (const att of tetCtetAttempts) {
      if (!map.has(att.id)) {
        map.set(att.id, {
          studentName: att.studentId === 'guest_tet_ctet' ? 'Guest Aspirant' : 'Active Learner',
          studentId: att.studentId,
          attempt: att,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      b.attempt.completedAt.localeCompare(a.attempt.completedAt)
    );
  }, [studentsList, tetCtetAttempts]);

  const handleRunFullAudit = (mode: 'incremental' | 'full' = 'incremental') => {
    const rep = runCentralizedTetCtetAudit({
      auditMode: mode,
      customOverrides: customTetCtetQuestions,
      rejectedIds: rejectedTetCtetIds,
      includePaper2SocialStudies: true,
      includePracticePools: mode === 'full',
      includeMultiMediumVerification: mode === 'full',
    });
    setAuditReport(rep);
    try {
      localStorage.setItem('vc_tet_ctet_central_audit_record', JSON.stringify(rep));
    } catch {
      // Ignore storage quota warning
    }
  };

  const handleSaveEditedQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    // Check against sibling stems + strict automated validation rules
    const otherHashes = new Set<string>(
      inspectedQuestions
        .filter((q) => q.id !== editingQuestion.id)
        .map((q) => q.normalizedHash)
    );
    const otherCanonicalStems = new Set<string>(
      inspectedQuestions
        .filter((q) => q.id !== editingQuestion.id)
        .map((q) => q.question.replace(/^\[[^\]]+\]\s*/g, '').trim().toLowerCase())
    );
    const validation = validateSingleTetCtetQuestion(editingQuestion, otherCanonicalStems);
    if (!validation.isValid) {
      setEditError(validation.reasons[0]);
      return;
    }

    const dupCheck = checkTetCtetCandidateDuplicate(editingQuestion.question, otherHashes);
    if (dupCheck.isDuplicate) {
      setEditError('Duplicate question detected inside this Mock Test. Please provide an original stem.');
      return;
    }

    saveCustomTetCtetQuestion({
      ...editingQuestion,
      normalizedHash: dupCheck.normalizedHash,
      isCustomOverride: true,
    });
    setEditError(null);
    setEditingQuestion(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & 4 Module Verified Progress Trackers */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              TET &amp; CTET Exam Governance Console
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-0.5">
              200 Mock Tests · 40 Batches · 30,000 Unique Questions Control Panel
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Generate &amp; verify 5-test batches, approve or publish batches to students, edit/replace questions, and audit 30,000 positions for zero duplicates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              handleRunFullAudit();
              setActiveTab('audit');
            }}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Run Centralized 30,000-Q Audit</span>
          </button>
        </div>

        {/* 4 Module Live Progress Trackers (X/50) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {moduleStats.map((m) => (
            <div
              key={m.moduleId}
              className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-display font-black text-slate-900">
                  {m.examTitle} PAPER {m.paper}
                </span>
                <span className="font-mono tabular-nums text-xs font-black text-emerald-700">
                  {m.verifiedTests}/50
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-indigo-700 rounded-full"
                  style={{ width: `${Math.min(100, (m.verifiedTests / 50) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] font-semibold text-slate-600">
                Published: <span className="font-mono tabular-nums">{m.publishedTests}/50</span> · Approved Batches:{' '}
                <span className="font-mono tabular-nums">{m.approvedBatches}/10</span>
              </p>
            </div>
          ))}
        </div>

        {/* Admin Sub-Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-2xl">
          {[
            { id: 'batches' as const, label: '40 Batches Manager (5 Tests/Batch)', icon: RefreshCw },
            { id: 'inspector' as const, label: 'Question Inspector & Editor', icon: FileSearch },
            { id: 'audit' as const, label: 'Centralized Automated Audit', icon: ShieldCheck },
            { id: 'monitor' as const, label: `Student Attempts Monitor (${allCandidateAttempts.length})`, icon: Users },
            { id: 'error-reports' as const, label: '🚩 QUESTION ERROR REPORTS', icon: Flag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurr = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-display font-black whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isCurr ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SUB-TAB 1: 40 BATCHES MANAGER (GENERATE / VERIFY / APPROVE / PUBLISH)
          ===================================================================== */}
      {activeTab === 'batches' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                Batch Generation, Verification &amp; Publishing (5 Mock Tests = 750 Qs / Batch)
              </h3>
              <p className="text-xs text-slate-600">
                Inspect or re-verify any 5-test batch, toggle Approval status, or Publish/Unpublish batches to students.
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setBatchModuleFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${
                  batchModuleFilter === 'ALL'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                All 4 Modules (40)
              </button>
              {TET_CTET_MODULE_LIST.map((m) => (
                <button
                  key={m.moduleId}
                  type="button"
                  onClick={() => setBatchModuleFilter(m.moduleId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border whitespace-nowrap ${
                    batchModuleFilter === m.moduleId
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {m.examTitle} P{m.paper}
                </button>
              ))}
            </div>
          </div>

          {batchFeedback && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-900 flex items-center justify-between gap-2">
              <span>{batchFeedback}</span>
              <button
                type="button"
                onClick={() => setBatchFeedback(null)}
                className="text-emerald-800 hover:text-emerald-950 font-black cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                  <th className="py-2.5 pr-4">Module</th>
                  <th className="py-2.5 pr-4">Batch</th>
                  <th className="py-2.5 pr-4">Mock Range</th>
                  <th className="py-2.5 pr-4">Questions</th>
                  <th className="py-2.5 pr-4">Verification</th>
                  <th className="py-2.5 pr-4">Approved</th>
                  <th className="py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {filteredBatches.map((b) => {
                  const mod = TET_CTET_MODULES[b.moduleId];
                  return (
                    <tr key={b.batchKey}>
                      <td className="py-3 pr-4 font-bold text-slate-900 whitespace-nowrap">
                        {mod.examTitle} Paper {mod.paper}
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">
                        Batch {String(b.batchNumber).padStart(2, '0')}
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">
                        Tests {b.testRange[0]}–{b.testRange[1]}
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">{b.totalQuestions} Qs</td>
                      <td className="py-3 pr-4">
                        <span className={b.verified && b.duplicateCount === 0 ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                          {b.verified ? `Verified (${b.duplicateCount} dups)` : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={b.approved ? 'text-indigo-700 font-bold' : 'text-slate-500'}>
                          {b.approved ? 'Approved' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const res = verifyAndGenerateTetCtetBatch(b.moduleId, b.batchNumber);
                              setBatchFeedback(
                                `${mod.examTitle} P${mod.paper} Batch ${b.batchNumber}: Verified ${res.checkedQuestions} questions (${res.duplicateCount} duplicates, ${res.invalidCount} invalid options).`
                              );
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-900 font-bold cursor-pointer"
                          >
                            Verify Batch
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleTetCtetBatchApproved(b.batchKey)}
                            className={`px-2.5 py-1.5 rounded-lg font-bold cursor-pointer ${
                              b.approved
                                ? 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            }`}
                          >
                            {b.approved ? 'Unapprove' : 'Approve'}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleTetCtetBatchPublished(b.batchKey)}
                            className={`px-2.5 py-1.5 rounded-lg font-bold cursor-pointer flex items-center gap-1 ${
                              b.published
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {b.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{b.published ? 'Published' : 'Hidden'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 2: QUESTION INSPECTOR, EDITOR & REJECT/AUTO-REPLACE
          ===================================================================== */}
      {activeTab === 'inspector' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Module</label>
              <select
                value={inspectModule}
                onChange={(e) => setInspectModule(e.target.value as TetCtetModuleId)}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
              >
                {TET_CTET_MODULE_LIST.map((m) => (
                  <option key={m.moduleId} value={m.moduleId}>
                    {m.examTitle} · {m.paperTitle}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mock Test Number (1–50)</label>
              <select
                value={inspectTestNum}
                onChange={(e) => setInspectTestNum(Number(e.target.value))}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white font-mono"
              >
                {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    Mock Test {String(n).padStart(2, '0')} (Batch {Math.ceil(n / 5)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Filter Subject</label>
              <select
                value={inspectSubject}
                onChange={(e) => setInspectSubject(e.target.value as TetCtetSubjectId | 'ALL')}
                className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
              >
                <option value="ALL">All 150 Questions</option>
                <option value="CDP">Child Development &amp; Pedagogy</option>
                <option value="LANGUAGE_1">Language 1</option>
                <option value="LANGUAGE_2">Language 2</option>
                <option value="MATHEMATICS">Mathematics</option>
                <option value="EVS">EVS (Paper 1)</option>
                <option value="SCIENCE">Science (Paper 2)</option>
                <option value="SOCIAL_STUDIES">Social Studies (Paper 2)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {inspectedQuestions.map((q) => {
              const isRejectedReplaced = rejectedTetCtetIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2 font-bold">
                      <span className="font-mono text-indigo-800">Q{q.questionNumber}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-900">{q.subjectLabel}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600">{q.topic}</span>
                      {q.isCustomOverride && (
                        <span className="text-amber-700">· Customized/Replaced</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditError(null);
                          setEditingQuestion({ ...q, options: [...q.options] as [string, string, string, string] });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-900 font-bold cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleRejectTetCtetQuestion(q.id)}
                        className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                          isRejectedReplaced
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                        }`}
                      >
                        {isRejectedReplaced ? 'Restore Original' : 'Reject & Auto-Replace'}
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-slate-900 text-sm whitespace-pre-line">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`p-2 rounded-lg border ${
                          oi === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">Explanation:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 3: CENTRALIZED AUTOMATED AUDIT ENGINE & CONSOLIDATED REPORT
          ===================================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-display font-black text-slate-900">
                Centralized Automated TET &amp; CTET Audit System (200 Mock Tests · 30,000 Qs)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Single-pass engine verifying exact/near duplicates, template clones, 4 unique options &amp; keys, 150-Q pattern alignment, and stage appropriateness. Mode:{' '}
                <strong className="uppercase text-indigo-800">{auditReport.auditMode}</strong> · Skipped verified:{' '}
                <span className="font-mono font-bold">{auditReport.skippedVerifiedQuestions.toLocaleString('en-IN')}</span> Qs · Last run:{' '}
                <span className="font-mono">{new Date(auditReport.generatedAt).toLocaleString()}</span> ({auditReport.durationMs} ms).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleRunFullAudit('incremental')}
                className="min-h-[40px] px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs cursor-pointer"
              >
                Fast Incremental Audit (Skip Verified)
              </button>
              <button
                type="button"
                onClick={() => handleRunFullAudit('full')}
                className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs cursor-pointer"
              >
                Final Deep Cross-Check (All 30,000)
              </button>
            </div>
          </div>

          {/* 10 Requested Consolidated Audit Report Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Mock Tests</span>
              <p className="text-2xl font-mono tabular-nums font-black text-slate-900 mt-1">
                {auditReport.totalMockTests}
              </p>
              <span className="text-[11px] text-slate-500">
                {auditReport.patternCompliantTests}/200 pattern verified
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Questions</span>
              <p className="text-2xl font-mono tabular-nums font-black text-slate-900 mt-1">
                {auditReport.totalQuestions.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-slate-500">4 modules × 50 tests × 150</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
              <span className="text-[11px] font-bold text-indigo-800 uppercase">Questions Audited</span>
              <p className="text-2xl font-mono tabular-nums font-black text-indigo-950 mt-1">
                {auditReport.questionsAudited.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-indigo-700">100% programmatically scanned</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Questions Passed</span>
              <p className="text-2xl font-mono tabular-nums font-black text-emerald-950 mt-1">
                {auditReport.questionsPassed.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-emerald-800">
                {auditReport.verifiedCleanTests} clean tests verified
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Questions Replaced</span>
              <p className="text-2xl font-mono tabular-nums font-black text-emerald-800 mt-1">
                {auditReport.questionsReplaced.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-emerald-700">
                {auditReport.curatedBatchReplacementsCount.toLocaleString('en-IN')} curated + {auditReport.legacyMathRepairedCount} math key fixes
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-800 uppercase">Duplicate Questions Detected</span>
              <p className="text-2xl font-mono tabular-nums font-black text-rose-900 mt-1">
                {auditReport.duplicateQuestionsDetected.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-rose-700">
                {auditReport.exactDuplicatesCount.toLocaleString('en-IN')} exact + {auditReport.nearDuplicatesCount} near/clones
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Incorrect Questions Detected</span>
              <p className="text-2xl font-mono tabular-nums font-black text-emerald-800 mt-1">
                {auditReport.incorrectQuestionsDetected.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-emerald-700">All 4-option &amp; key checks clean</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase">Out-of-Syllabus / Tag Issues</span>
              <p className="text-2xl font-mono tabular-nums font-black text-amber-950 mt-1">
                {auditReport.outOfSyllabusQuestions.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-amber-800">
                {auditReport.syntheticTaggedCount.toLocaleString('en-IN')} tagged · {auditReport.stageMismatchCount.toLocaleString('en-IN')} stage overlap
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase">Requiring Manual Review</span>
              <p className="text-2xl font-mono tabular-nums font-black text-amber-950 mt-1">
                {auditReport.questionsRequiringManualReview.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-amber-800">Un-remediated legacy batches</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 uppercase">Remaining Questions</span>
              <p className="text-2xl font-mono tabular-nums font-black text-amber-950 mt-1">
                {auditReport.remainingQuestions.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-amber-800">Batches 3–20 (180 tests)</span>
            </div>
          </div>

          {(auditReport.socialStudiesExtraChecked ||
            auditReport.verifiedMediumsCheck ||
            auditReport.practicePoolSummary) && (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700 space-y-1.5">
              {auditReport.verifiedMediumsCheck && (
                <div>
                  <strong className="text-slate-900">Verified Batches Multi-Medium Parity:</strong>{' '}
                  Marathi Clean:{' '}
                  <span className="font-mono font-bold text-emerald-700">
                    {auditReport.verifiedMediumsCheck.marathiPassed.toLocaleString('en-IN')}
                  </span>{' '}
                  · Hindi Clean:{' '}
                  <span className="font-mono font-bold text-emerald-700">
                    {auditReport.verifiedMediumsCheck.hindiPassed.toLocaleString('en-IN')}
                  </span>{' '}
                  · Multi-Medium Issues:{' '}
                  <span className="font-mono font-bold text-emerald-700">
                    {auditReport.verifiedMediumsCheck.issuesFound}
                  </span>
                </div>
              )}
              {auditReport.practicePoolSummary && (
                <div>
                  <strong className="text-slate-900">Practice &amp; PYQ Pools Audit:</strong>{' '}
                  {auditReport.practicePoolSummary.totalChecked} items checked ·{' '}
                  {auditReport.practicePoolSummary.invalidOptionsOrKeys} invalid options/keys ·{' '}
                  <span className="text-amber-800 font-bold">
                    {auditReport.practicePoolSummary.exactDuplicates} duplicates &amp;{' '}
                    {auditReport.practicePoolSummary.prefixTagged} tagged stubs queued for cleanup
                  </span>
                </div>
              )}
              {auditReport.socialStudiesExtraChecked && (
                <div>
                  <strong className="text-slate-900">Paper 2 Social Studies Stream Check:</strong>{' '}
                  {auditReport.socialStudiesExtraChecked.totalSlots.toLocaleString('en-IN')} slots scanned ·{' '}
                  {auditReport.socialStudiesExtraChecked.invalidOptionsOrKeys} invalid options/keys ·{' '}
                  <span className="text-amber-800 font-bold">
                    {auditReport.socialStudiesExtraChecked.exactDuplicatesWithinP2Sst.toLocaleString('en-IN')} cyclic duplicates queued for P2 replacement batches
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Step 2 Actual Defect Classification + Step 1 Backup Checkpoint */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-display font-black text-slate-900">
                Defect Reason Classification &amp; QA Checkpoint ({auditReport.checkpoint.backupArtifactDir})
              </h4>
              <span className="text-[11px] font-mono font-bold text-indigo-800">
                Next Resume Checkpoint: {auditReport.checkpoint.nextResumeBatchId}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Clean Verified</span>
                <span className="text-base font-mono font-black text-emerald-900">
                  {auditReport.defectClassification.cleanVerified.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">Exact Duplicates</span>
                <span className="text-base font-mono font-black text-rose-900">
                  {auditReport.defectClassification.exactDuplicates.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">Template Clones</span>
                <span className="text-base font-mono font-black text-rose-900">
                  {auditReport.defectClassification.nearDuplicatesOrClones.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 uppercase block">Tag Review Only</span>
                <span className="text-base font-mono font-black text-amber-950">
                  {auditReport.defectClassification.syntheticTagOnlyNeedsReview.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 uppercase block">Stage Mismatch</span>
                <span className="text-base font-mono font-black text-amber-950">
                  {auditReport.defectClassification.stageOrSyllabusMismatchOnly.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Option / Key Errors</span>
                <span className="text-base font-mono font-black text-emerald-900">
                  {auditReport.defectClassification.incorrectKeyOrOptionsOrMissing.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Per-Module Centralized Breakdown */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold">
                  <th className="py-2.5 px-3">Module</th>
                  <th className="py-2.5 px-3 text-right">Audited</th>
                  <th className="py-2.5 px-3 text-right">Passed</th>
                  <th className="py-2.5 px-3 text-right">Exact Dups</th>
                  <th className="py-2.5 px-3 text-right">Near Dups</th>
                  <th className="py-2.5 px-3 text-right">GREEN</th>
                  <th className="py-2.5 px-3 text-right">YELLOW</th>
                  <th className="py-2.5 px-3 text-right">RED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {auditReport.moduleBreakdown.map((row) => (
                  <tr key={row.moduleId}>
                    <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">{row.title}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{row.questionsAudited.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {row.questionsPassed.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">
                      {row.exactDuplicates.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">
                      {row.nearDuplicates.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {row.greenTests}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">
                      {row.yellowTests}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-700">
                      {row.redTests}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Step 6: Student Publication Approval (GREEN / YELLOW / RED — 200 Mock Tests) */}
          <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-display font-black text-slate-900">
                  Student Publication Approval Matrix (GREEN: {auditReport.publicationSummary.greenTestsCount} · YELLOW: {auditReport.publicationSummary.yellowTestsCount} · RED: {auditReport.publicationSummary.redTestsCount})
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  GREEN = Verified &amp; ready for students · YELLOW = Manual review required · RED = Confirmed duplicates/errors (blocked when GREEN-only access is active).
                </p>
              </div>
              <button
                type="button"
                onClick={toggleTetCtetEnforceGreenOnly}
                className={`min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-display font-black cursor-pointer transition-colors ${
                  tetCtetEnforceGreenOnly
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                }`}
              >
                {tetCtetEnforceGreenOnly
                  ? 'GREEN-Only Student Lock: ACTIVE (20 Live / 180 Locked)'
                  : 'Enforce GREEN-Only Student Access (Currently All 200 Open)'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {(['ALL', 'GREEN', 'YELLOW', 'RED'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setQaStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer border ${
                    qaStatusFilter === st
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
              <select
                value={qaModuleFilter}
                onChange={(e) => setQaModuleFilter(e.target.value as TetCtetModuleId | 'ALL')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 font-bold bg-white text-slate-800"
              >
                <option value="ALL">All 4 Modules (200 Tests)</option>
                {TET_CTET_MODULE_LIST.map((m) => (
                  <option key={m.moduleId} value={m.moduleId}>
                    {m.examTitle} P{m.paper}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-100 text-slate-600 uppercase font-bold">
                  <tr>
                    <th className="py-2 px-3">Mock Test</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Clean</th>
                    <th className="py-2 px-3 text-right">Dups / Clones</th>
                    <th className="py-2 px-3 text-right">Errors</th>
                    <th className="py-2 px-3">Audit Finding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {auditReport.mockTestStatuses
                    .filter(
                      (m) =>
                        (qaModuleFilter === 'ALL' || m.moduleId === qaModuleFilter) &&
                        (qaStatusFilter === 'ALL' || m.status === qaStatusFilter)
                    )
                    .map((rec) => (
                      <tr key={rec.key}>
                        <td className="py-2 px-3 font-bold whitespace-nowrap">
                          {rec.moduleTitle} · Mock #{rec.testNumber}
                        </td>
                        <td className="py-2 px-3 font-mono font-black whitespace-nowrap">
                          <span
                            className={
                              rec.status === 'GREEN'
                                ? 'text-emerald-700'
                                : rec.status === 'YELLOW'
                                ? 'text-amber-700'
                                : 'text-rose-700'
                            }
                          >
                            {rec.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono">{rec.cleanQuestions}/150</td>
                        <td className="py-2 px-3 text-right font-mono">
                          {rec.exactDuplicates + rec.nearDuplicates}
                        </td>
                        <td className="py-2 px-3 text-right font-mono">{rec.incorrectQuestions}</td>
                        <td className="py-2 px-3 text-slate-600">{rec.reasonSummary}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sample Automated Findings Log */}
          {auditReport.sampleFindings.length > 0 && (
            <details className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <summary className="cursor-pointer text-xs font-display font-black text-slate-900">
                View Sample Automated Flagged Findings ({auditReport.sampleFindings.length} sampled issues across pending batches)
              </summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                      <th className="py-2 pr-3">Location</th>
                      <th className="py-2 pr-3">Issue</th>
                      <th className="py-2 pr-3">Detail</th>
                      <th className="py-2">Snippet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {auditReport.sampleFindings.slice(0, 15).map((f, idx) => (
                      <tr key={idx}>
                        <td className="py-2 pr-3 font-mono font-bold whitespace-nowrap">
                          {f.moduleId} · T{f.testNumber} · Q{f.questionNumber}
                        </td>
                        <td className="py-2 pr-3 font-bold text-rose-700 whitespace-nowrap">{f.issueType}</td>
                        <td className="py-2 pr-3">{f.detail}</td>
                        <td className="py-2 text-slate-600">{f.questionSnippet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          )}

          {/* Persistent 10-Test Batch Remediation Tracker (20 Batches = 200 Mock Tests) */}
          {(() => {
            const auditSummary = getTetCtetAuditSummary();
            const completedBatchesWithLogs = TET_CTET_AUDIT_BATCHES.filter(
              (b) => b.status === 'Completed' && b.correctionSummary.length > 0
            );
            return (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-display font-black text-slate-900">
                      10-Test Deep Quality Audit Tracker ({auditSummary.completedTests}/200 Completed · {auditSummary.pendingTests} Pending)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Systematic 10-test-per-batch content uniqueness, pattern alignment &amp; trilingual remediation schedule.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono tabular-nums">
                      Completed: {auditSummary.completedTests} Tests ({auditSummary.completedQuestions.toLocaleString('en-IN')} Qs)
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono tabular-nums">
                      Pending: {auditSummary.pendingTests} Tests ({auditSummary.pendingQuestions.toLocaleString('en-IN')} Qs)
                    </span>
                  </div>
                </div>

                {completedBatchesWithLogs.map((completedBatch) => (
                  <div key={completedBatch.id} className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-display font-black text-emerald-950">
                        Batch {completedBatch.batchNumber} Verified Summary — {completedBatch.examLabel} (Tests {completedBatch.testStart}–{completedBatch.testEnd} · {completedBatch.totalQuestions.toLocaleString('en-IN')} Questions)
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800">
                        {completedBatch.exactDuplicatesAfter} Duplicates · {completedBatch.prefixTaggedAfter} Synthetic Tags · 150 Qs/Test Verified
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-emerald-200 text-emerald-900 font-bold">
                            <th className="py-2 pr-3">Section</th>
                            <th className="py-2 pr-3">Q Range</th>
                            <th className="py-2 pr-3">Problem Found</th>
                            <th className="py-2 pr-3">Action Taken</th>
                            <th className="py-2 text-right">Replaced</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-100 text-slate-800">
                          {completedBatch.correctionSummary.map((log, i) => (
                            <tr key={i}>
                              <td className="py-2 pr-3 font-bold text-slate-900 whitespace-nowrap">{log.sectionRange}</td>
                              <td className="py-2 pr-3 font-mono whitespace-nowrap">{log.questionRange}</td>
                              <td className="py-2 pr-3">{log.problemFound}</td>
                              <td className="py-2 pr-3">{log.actionTaken}</td>
                              <td className="py-2 text-right font-mono font-black text-emerald-800">{log.replacedCount} Qs</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-2 pr-3">Paper</th>
                        <th className="py-2 pr-3">Batch</th>
                        <th className="py-2 pr-3">Test Range</th>
                        <th className="py-2 pr-3">Questions</th>
                        <th className="py-2 pr-3">Pattern Compliance</th>
                        <th className="py-2">Audit Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {TET_CTET_AUDIT_BATCHES.map((ab) => (
                        <tr key={ab.id}>
                          <td className="py-2.5 pr-3 font-bold text-slate-900 whitespace-nowrap">{ab.examLabel}</td>
                          <td className="py-2.5 pr-3 font-mono">Batch {ab.batchNumber}</td>
                          <td className="py-2.5 pr-3 font-mono">Tests {ab.testStart}–{ab.testEnd}</td>
                          <td className="py-2.5 pr-3 font-mono">{ab.totalQuestions.toLocaleString('en-IN')} Qs</td>
                          <td className="py-2.5 pr-3 text-slate-600">{ab.patternCompliance}</td>
                          <td className="py-2.5">
                            <span
                              className={`font-bold ${
                                ab.status === 'Completed'
                                  ? 'text-emerald-700'
                                  : ab.status === 'In Progress'
                                  ? 'text-indigo-700'
                                  : 'text-amber-700'
                              }`}
                            >
                              {ab.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 4: STUDENT PERFORMANCE MONITOR
          ===================================================================== */}
      {activeTab === 'monitor' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg font-display font-black text-slate-900">
              Candidate &amp; Student TET/CTET Attempts Monitor
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Live overview of completed Mock Tests and Practice Assessments across registered platform learners.
            </p>
          </div>

          {allCandidateAttempts.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center text-xs text-slate-600">
              No student TET/CTET attempts recorded yet. Attempts submitted by students automatically appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2.5 pr-4">Candidate</th>
                    <th className="py-2.5 pr-4">Exam &amp; Paper</th>
                    <th className="py-2.5 pr-4">Languages / Medium</th>
                    <th className="py-2.5 pr-4">Score</th>
                    <th className="py-2.5 pr-4">Time</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {allCandidateAttempts.slice(0, 50).map(({ studentName, attempt }) => (
                    <tr key={attempt.id}>
                      <td className="py-3 pr-4 font-bold text-slate-900">{studentName}</td>
                      <td className="py-3 pr-4">
                        {attempt.exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} P{attempt.paper} ·{' '}
                        {attempt.mockTestNumber ? `Mock #${attempt.mockTestNumber}` : attempt.practiceTitle || attempt.mode}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        L1: {attempt.language1} / L2: {attempt.language2} ({attempt.medium})
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums font-bold">
                        {attempt.marksObtained}/{attempt.maxMarks} ({attempt.percentage}%)
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">
                        {formatHhMmSs(attempt.timeTakenSeconds)}
                      </td>
                      <td className="py-3">
                        <span className={attempt.qualified ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                          {attempt.qualified ? 'Qualified' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 5: 🚩 QUESTION ERROR REPORTS
          ===================================================================== */}
      {activeTab === 'error-reports' && <AdminQuestionErrorReportsSection />}

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEditedQuestion}
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-display font-black text-slate-900">
                Edit Question #{editingQuestion.questionNumber} ({editingQuestion.subjectLabel})
              </h3>
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Question Stem</label>
              <textarea
                rows={3}
                value={editingQuestion.question}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, question: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">
                4 Options (Select Correct Answer):
              </label>
              {editingQuestion.options.map((optVal, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="editCorrectAnswer"
                    checked={editingQuestion.correctAnswer === oIdx}
                    onChange={() =>
                      setEditingQuestion({ ...editingQuestion, correctAnswer: oIdx })
                    }
                    className="accent-indigo-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={optVal}
                    onChange={(e) => {
                      const nextOpts = [...editingQuestion.options] as [
                        string,
                        string,
                        string,
                        string
                      ];
                      nextOpts[oIdx] = e.target.value;
                      setEditingQuestion({ ...editingQuestion, options: nextOpts });
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Pedagogy Explanation</label>
              <textarea
                rows={2}
                value={editingQuestion.explanation}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, explanation: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            {editError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold">
                {editError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black cursor-pointer"
              >
                Verify Uniqueness &amp; Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
