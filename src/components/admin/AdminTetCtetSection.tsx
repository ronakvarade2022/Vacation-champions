import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  FileSearch,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  TetCtetAttemptRecord,
  TetCtetAuditReport,
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
  runTetCtetDuplicateAudit,
} from '../../data/tetCtetQuestionEngine';
import { formatHhMmSs } from '../TetCtetExamSimulator';

type AdminTetTab = 'batches' | 'inspector' | 'audit' | 'monitor';

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
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTetTab>('batches');
  const [batchModuleFilter, setBatchModuleFilter] = useState<TetCtetModuleId | 'ALL'>('ALL');
  const [batchFeedback, setBatchFeedback] = useState<string | null>(null);

  // Inspector states
  const [inspectModule, setInspectModule] = useState<TetCtetModuleId>('MAHA_TET_P1');
  const [inspectTestNum, setInspectTestNum] = useState<number>(1);
  const [inspectSubject, setInspectSubject] = useState<TetCtetSubjectId | 'ALL'>('ALL');
  const [editingQuestion, setEditingQuestion] = useState<TetCtetQuestion | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  // Duplicate Audit state
  const [auditReport, setAuditReport] = useState<TetCtetAuditReport | null>(null);

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

  const handleRunFullAudit = () => {
    const rep = runTetCtetDuplicateAudit(
      tetCtetBatches,
      customTetCtetQuestions,
      rejectedTetCtetIds
    );
    setAuditReport(rep);
  };

  const handleSaveEditedQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    if (
      !editingQuestion.question.trim() ||
      editingQuestion.options.some((o) => !o.trim())
    ) {
      setEditError('Question stem and all 4 options must be non-empty.');
      return;
    }

    // Check duplicate against sibling questions in the same test
    const otherHashes = new Set<string>(
      inspectedQuestions
        .filter((q) => q.id !== editingQuestion.id)
        .map((q) => q.normalizedHash)
    );
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
            <span>Run Full 30,000-Q Duplicate Audit</span>
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
            { id: 'audit' as const, label: '30,000-Q Duplicate Audit', icon: ShieldCheck },
            { id: 'monitor' as const, label: `Student Attempts Monitor (${allCandidateAttempts.length})`, icon: Users },
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
          SUB-TAB 3: 30,000-QUESTION ZERO-DUPLICATE AUDIT ENGINE
          ===================================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-display font-black text-slate-900">
                Full 200 Mock Tests (30,000 Questions) Zero-Repetition Integrity Audit
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Validates every single Mock Test position across all 4 modules + practice pools for hash collisions, cross-exam overlaps, cross-paper overlaps, and valid 4-option schema.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRunFullAudit}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs cursor-pointer"
            >
              Execute Audit Now
            </button>
          </div>

          {!auditReport ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center space-y-2">
              <ShieldCheck className="w-10 h-10 text-indigo-700 mx-auto" />
              <p className="text-sm font-display font-black text-slate-900">
                Click &ldquo;Execute Audit Now&rdquo; to inspect all 30,000 mock positions
              </p>
              <p className="text-xs text-slate-600">
                Performs normalized text hashing across MAHA TET P1, MAHA TET P2, CTET P1, CTET P2, and Practice Pools.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500">Mock Tests Verified</span>
                  <p className="text-2xl font-mono tabular-nums font-black text-slate-900 mt-1">
                    {auditReport.totalMockTests}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500">Mock Question Positions</span>
                  <p className="text-2xl font-mono tabular-nums font-black text-indigo-800 mt-1">
                    {auditReport.totalMockQuestionPositions.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800">Unique Concept Signatures</span>
                  <p className="text-2xl font-mono tabular-nums font-black text-emerald-950 mt-1">
                    {auditReport.uniqueConceptSignatures.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800">Exact Duplicates</span>
                  <p className="text-2xl font-mono tabular-nums font-black text-emerald-700 mt-1">
                    {auditReport.exactDuplicatesFound}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                <div>
                  <span className="text-slate-500 block">Cross-Exam Duplicates</span>
                  <span className="font-mono tabular-nums text-emerald-700 text-base">
                    {auditReport.crossExamDuplicatesFound}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cross-Paper Duplicates</span>
                  <span className="font-mono tabular-nums text-emerald-700 text-base">
                    {auditReport.crossPaperDuplicatesFound}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mock vs Practice Collisions</span>
                  <span className="font-mono tabular-nums text-emerald-700 text-base">
                    {auditReport.mockVsPracticeDuplicatesFound}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Invalid Option Items</span>
                  <span className="font-mono tabular-nums text-emerald-700 text-base">
                    {auditReport.invalidOptionQuestions}
                  </span>
                </div>
              </div>
            </div>
          )}
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
