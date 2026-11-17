import React, { useState, useMemo, useEffect } from 'react';
import {
  STD_4_SCHOLARSHIP_BANK,
  STD_7_SCHOLARSHIP_BANK,
  MSCE_LANGUAGES,
  ScholarshipSection,
} from '../../data/scholarshipData';
import {
  buildMsceMockPaper,
  getMsceTenBatches,
  MsceAuditReport,
  MsceMedium,
  MsceMockQuestion,
  MscePaperNumber,
  MsceStdLevel,
  runCompleteMsceDuplicateAndSyllabusAudit,
  validateMockPaperBeforePublish,
} from '../../data/msceMockExamEngine';
import { useApp } from '../../context/AppContext';
import type { CustomScholarshipQuestionRecord } from '../../types';
import { AdminPagination } from './AdminPagination';
import {
  Plus,
  Trash2,
  X,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Eye,
  BarChart3,
  Layers,
  Languages,
} from 'lucide-react';

interface AdminScholarshipSectionProps {
  customQuestions: CustomScholarshipQuestionRecord[];
  onSaveCustomQuestion: (q: CustomScholarshipQuestionRecord) => Promise<void>;
  onDeleteCustomQuestion: (id: string) => Promise<void>;
}

const SCHOLARSHIP_SECTIONS: ScholarshipSection[] = [
  'First Language',
  'Mathematics',
  'Second Language',
  'Intelligence Test',
];

export const AdminScholarshipSection: React.FC<AdminScholarshipSectionProps> = React.memo(
  ({ customQuestions, onSaveCustomQuestion, onDeleteCustomQuestion }) => {
    const {
      studentsList,
      publishedMsceMockTests,
      toggleMsceMockTestPublished,
      customMsceMockQuestions,
      saveCustomMsceMockQuestion,
      deleteCustomMsceMockQuestion,
      bulkImportCustomMsceMockQuestions,
    } = useApp();

    // Top-level Admin Mode: 'existing20' | 'mock50' | 'batches_audit' | 'student_monitor'
    const [adminTab, setAdminTab] = useState<
      'existing20' | 'mock50' | 'batches_audit' | 'student_monitor'
    >('mock50');

    // Existing 20 Practice Tests State
    const [selectedStd, setSelectedStd] = useState<'Std 4' | 'Std 7'>('Std 4');
    const [testFilter, setTestFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);

    const [showAddModal, setShowAddModal] = useState(false);
    const [formStd, setFormStd] = useState<'Std 4th (PSE)' | 'Std 7th (UPS)'>('Std 4th (PSE)');
    const [formTestNum, setFormTestNum] = useState<number>(1);
    const [formSection, setFormSection] = useState<ScholarshipSection>('Mathematics');
    const [formQuestionEn, setFormQuestionEn] = useState('');
    const [formQuestionMr, setFormQuestionMr] = useState('');
    const [formOpt0, setFormOpt0] = useState('');
    const [formOpt1, setFormOpt1] = useState('');
    const [formOpt2, setFormOpt2] = useState('');
    const [formOpt3, setFormOpt3] = useState('');
    const [formCorrectIdx, setFormCorrectIdx] = useState(0);
    const [formExplanation, setFormExplanation] = useState('');
    const [saving, setSaving] = useState(false);

    // 50 Full Mock Examinations Admin State
    const [mockStdFilter, setMockStdFilter] = useState<MsceStdLevel>('Std 4th');
    const [mockTestNumberFilter, setMockTestNumberFilter] = useState<number>(1);
    const [mockPaperFilter, setMockPaperFilter] = useState<MscePaperNumber>(1);
    const [mockMediumPreview, setMockMediumPreview] = useState<MsceMedium>('Marathi');
    const [mockPage, setMockPage] = useState<number>(1);

    // Add / Edit Mock Question Modal
    const [showMockQuestionModal, setShowMockQuestionModal] = useState<boolean>(false);
    const [editMockQNumber, setEditMockQNumber] = useState<number>(1);
    const [editMockTopic, setEditMockTopic] = useState<string>('Number System');
    const [editMockQEn, setEditMockQEn] = useState<string>('');
    const [editMockQMr, setEditMockQMr] = useState<string>('');
    const [editMockQHi, setEditMockQHi] = useState<string>('');
    const [editMockOptsEn, setEditMockOptsEn] = useState<[string, string, string, string]>([
      '',
      '',
      '',
      '',
    ]);
    const [editMockOptsMr, setEditMockOptsMr] = useState<[string, string, string, string]>([
      '',
      '',
      '',
      '',
    ]);
    const [editMockOptsHi, setEditMockOptsHi] = useState<[string, string, string, string]>([
      '',
      '',
      '',
      '',
    ]);
    const [editMockAns, setEditMockAns] = useState<number>(0);
    const [editMockExp, setEditMockExp] = useState<string>('');

    // Bulk Import Modal
    const [showBulkImportModal, setShowBulkImportModal] = useState<boolean>(false);
    const [bulkJsonText, setBulkJsonText] = useState<string>('');
    const [bulkStatusMsg, setBulkStatusMsg] = useState<string | null>(null);

    // Audit Report State
    const [auditReport, setAuditReport] = useState<MsceAuditReport | null>(null);

    const std4Custom = useMemo(
      () => customQuestions.filter((q) => q.stdLevel === 'Std 4th (PSE)'),
      [customQuestions]
    );
    const std7Custom = useMemo(
      () => customQuestions.filter((q) => q.stdLevel === 'Std 7th (UPS)'),
      [customQuestions]
    );

    const activeBank = useMemo(() => {
      const base = selectedStd === 'Std 4' ? STD_4_SCHOLARSHIP_BANK : STD_7_SCHOLARSHIP_BANK;
      const custom = selectedStd === 'Std 4' ? std4Custom : std7Custom;
      return [...custom, ...base];
    }, [selectedStd, std4Custom, std7Custom]);

    const filteredQuestions = useMemo(() => {
      if (testFilter === 'all') return activeBank;
      return activeBank.filter((q) => String(q.testNumber) === testFilter);
    }, [activeBank, testFilter]);

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedStd, testFilter]);

    const safePage = Math.min(
      currentPage,
      Math.max(1, Math.ceil(filteredQuestions.length / pageSize))
    );
    const paginatedQuestions = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredQuestions.slice(start, start + pageSize);
    }, [filteredQuestions, safePage, pageSize]);

    // Build active 75-Question Mock Paper for Admin Inspection / Answer Key & Translation Verification
    const inspectedPaperQuestions = useMemo(
      () =>
        buildMsceMockPaper(
          mockStdFilter,
          mockTestNumberFilter,
          mockPaperFilter,
          mockMediumPreview,
          customMsceMockQuestions
        ),
      [
        mockStdFilter,
        mockTestNumberFilter,
        mockPaperFilter,
        mockMediumPreview,
        customMsceMockQuestions,
      ]
    );

    const paperValidation = useMemo(
      () => validateMockPaperBeforePublish(inspectedPaperQuestions),
      [inspectedPaperQuestions]
    );

    const paginatedMockQuestions = useMemo(() => {
      const start = (mockPage - 1) * 15;
      return inspectedPaperQuestions.slice(start, start + 15);
    }, [inspectedPaperQuestions, mockPage]);

    const handleCreateQuestion = async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !formQuestionEn.trim() ||
        !formOpt0.trim() ||
        !formOpt1.trim() ||
        !formOpt2.trim() ||
        !formOpt3.trim()
      ) {
        return;
      }
      setSaving(true);
      try {
        const qEn = formQuestionEn.trim();
        const qMr = formQuestionMr.trim() || qEn;
        const optsEn: [string, string, string, string] = [
          formOpt0.trim(),
          formOpt1.trim(),
          formOpt2.trim(),
          formOpt3.trim(),
        ];
        const expEn = formExplanation.trim() || `Correct answer is ${optsEn[formCorrectIdx]}.`;
        const newRecord: CustomScholarshipQuestionRecord = {
          id: `sch_custom_${Date.now()}`,
          stdLevel: formStd,
          testNumber: formTestNum,
          section: formSection,
          subject: formSection,
          questionNumberInSet: 31 + customQuestions.length,
          difficulty: 'moderate',
          type: 'Multiple Choice',
          questionText: {
            English: qEn,
            Marathi: qMr,
            Hindi: qEn,
          },
          options: {
            English: optsEn,
            Marathi: optsEn,
            Hindi: optsEn,
          },
          correctIndex: formCorrectIdx,
          explanation: {
            English: expEn,
            Marathi: expEn,
            Hindi: expEn,
          },
          marks: 2,
          published: true,
          isCustom: true,
        };
        await onSaveCustomQuestion(newRecord);
        setFormQuestionEn('');
        setFormQuestionMr('');
        setFormOpt0('');
        setFormOpt1('');
        setFormOpt2('');
        setFormOpt3('');
        setFormExplanation('');
        setShowAddModal(false);
      } finally {
        setSaving(false);
      }
    };

    const handleOpenEditMockQuestion = (q: MsceMockQuestion) => {
      setEditMockQNumber(q.questionNumber);
      setEditMockTopic(q.topic);
      setEditMockQEn(q.translations.English.question);
      setEditMockQMr(q.translations.Marathi.question);
      setEditMockQHi(q.translations.Hindi.question);
      setEditMockOptsEn([...q.translations.English.options]);
      setEditMockOptsMr([...q.translations.Marathi.options]);
      setEditMockOptsHi([...q.translations.Hindi.options]);
      setEditMockAns(q.correctAnswer);
      setEditMockExp(q.translations.English.explanation);
      setShowMockQuestionModal(true);
    };

    const handleSaveMockQuestionOverride = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editMockQEn.trim()) return;
      const enQ = editMockQEn.trim();
      const mrQ = editMockQMr.trim() || enQ;
      const hiQ = editMockQHi.trim() || enQ;
      const exp = editMockExp.trim() || 'Verified MSCE solution.';

      const sectionName: MsceMockQuestion['section'] =
        mockPaperFilter === 1
          ? editMockQNumber <= 25
            ? 'First Language'
            : 'Mathematics'
          : editMockQNumber <= 25
            ? 'Second Language'
            : 'Intelligence Test';

      const newOverride: MsceMockQuestion = {
        id: `msce_admin_override_${mockStdFilter}_${mockTestNumberFilter}_p${mockPaperFilter}_q${editMockQNumber}`,
        questionNumber: editMockQNumber,
        stdLevel: mockStdFilter,
        mockTestNumber: mockTestNumberFilter,
        paperNumber: mockPaperFilter,
        section: sectionName,
        subjectLabel: sectionName,
        languageRendered: mockMediumPreview,
        topic: editMockTopic,
        difficulty: 'Medium',
        marks: 2,
        question: enQ,
        options: editMockOptsEn,
        correctAnswer: editMockAns,
        explanation: exp,
        translations: {
          English: { question: enQ, options: editMockOptsEn, explanation: exp },
          Marathi: {
            question: mrQ,
            options: editMockOptsMr.every((o) => o.trim()) ? editMockOptsMr : editMockOptsEn,
            explanation: exp,
          },
          Hindi: {
            question: hiQ,
            options: editMockOptsHi.every((o) => o.trim()) ? editMockOptsHi : editMockOptsEn,
            explanation: exp,
          },
        },
        normalizedHash: enQ.toLowerCase().replace(/\s+/g, ' ').trim(),
        isCustomOverride: true,
      };

      saveCustomMsceMockQuestion(newOverride);
      setShowMockQuestionModal(false);
    };

    const handleRunBulkImport = () => {
      try {
        const parsed = JSON.parse(bulkJsonText);
        if (!Array.isArray(parsed)) {
          setBulkStatusMsg('Error: JSON must be an array of MsceMockQuestion objects.');
          return;
        }
        const res = bulkImportCustomMsceMockQuestions(parsed);
        setBulkStatusMsg(
          `Successfully imported ${res.importedCount} questions (${res.skippedDuplicates} duplicates skipped).`
        );
        setBulkJsonText('');
      } catch {
        setBulkStatusMsg('Invalid JSON format. Please check syntax.');
      }
    };

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
        {/* Header & 70-Test Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                MSCE Pune Scholarship Control Panel (70 Total Tests: 20 Practice + 50 Full Mock Exams)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage 25 Std. 4th (PSE) Mock Tests + 25 Std. 7th (UPS) Mock Tests (7,500 Question Positions in English, Marathi &amp; Hindi) + 20 Existing Practice Sets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'mock50', label: '🏆 50 Full Mock Exams (PSE & UPS)' },
                { id: 'batches_audit', label: '🛡️ 10-Batch & Duplicate Audit' },
                { id: 'student_monitor', label: '📊 Student Performance Monitor' },
                { id: 'existing20', label: '📚 Existing 20 Practice Tests' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAdminTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                  adminTab === tab.id
                    ? 'bg-slate-900 text-amber-300 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: 50 FULL MOCK EXAMINATIONS MANAGER */}
        {adminTab === 'mock50' && (
          <div className="space-y-6">
            {/* Controls Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMockStdFilter('Std 4th');
                    setMockPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                    mockStdFilter === 'Std 4th'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  🎓 Std. 4th (PSE) – 25 Mock Tests
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMockStdFilter('Std 7th');
                    setMockPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                    mockStdFilter === 'Std 7th'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  🎓 Std. 7th (UPS) – 25 Mock Tests
                </button>

                <select
                  value={mockTestNumberFilter}
                  onChange={(e) => {
                    setMockTestNumberFilter(Number(e.target.value));
                    setMockPage(1);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                >
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Mock Test {String(n).padStart(2, '0')}
                    </option>
                  ))}
                </select>

                <select
                  value={mockPaperFilter}
                  onChange={(e) => {
                    setMockPaperFilter(Number(e.target.value) as MscePaperNumber);
                    setMockPage(1);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                >
                  <option value={1}>Paper 1 (First Lang 25 + Maths 50 = 75 Qs)</option>
                  <option value={2}>Paper 2 (Second Lang 25 + Intelligence 50 = 75 Qs)</option>
                </select>

                <select
                  value={mockMediumPreview}
                  onChange={(e) => setMockMediumPreview(e.target.value as MsceMedium)}
                  className="px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 text-xs font-extrabold text-amber-950"
                >
                  <option value="English">Preview: English Medium</option>
                  <option value="Marathi">Preview: Marathi Medium</option>
                  <option value="Hindi">Preview: Hindi Medium</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleMsceMockTestPublished(mockStdFilter, mockTestNumberFilter)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                    publishedMsceMockTests[`${mockStdFilter}_${mockTestNumberFilter}`] !== false
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {publishedMsceMockTests[`${mockStdFilter}_${mockTestNumberFilter}`] !== false
                    ? '● Published (Click to Unpublish)'
                    : '○ Unpublished (Click to Publish)'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowBulkImportModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Bulk Import JSON</span>
                </button>
              </div>
            </div>

            {/* Paper Validation Status Banner */}
            <div
              className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
                paperValidation.valid
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Paper Validation ({mockStdFilter} Mock Test {String(mockTestNumberFilter).padStart(2, '0')} Paper {mockPaperFilter}):{' '}
                  {paperValidation.totalQuestions}/75 Questions • {paperValidation.verifiedCount}/75 Green Verified • {paperValidation.totalMarks}/150 Marks •{' '}
                  {paperValidation.duplicateCount} Duplicates • {paperValidation.missingOptionsCount} Option Issues
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full font-black text-[10px] uppercase ${
                  paperValidation.valid
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-slate-950'
                }`}
              >
                {paperValidation.valid ? '🟢 VERIFIED PAPER READY' : '⏳ Needs Review'}
              </span>
            </div>

            {/* 75 Questions Inspector Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Showing Questions {(mockPage - 1) * 15 + 1} to {Math.min(75, mockPage * 15)} of 75 ({mockMediumPreview} Medium Configuration)
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setMockPage(p)}
                      className={`px-3 py-1 rounded-lg font-black cursor-pointer ${
                        mockPage === p
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Q{(p - 1) * 15 + 1}–{p * 15}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paginatedMockQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-black text-[10px]">
                          Q{q.questionNumber}
                        </span>
                        {q.verification?.greenVerified ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-[10px]">
                            🟢 GREEN VERIFIED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px]">
                            ⏳ Review
                          </span>
                        )}
                        <span className="font-bold text-amber-900">{q.subjectLabel}</span>
                        <span className="text-slate-500">• {q.topic}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {q.isCustomOverride && (
                          <button
                            type="button"
                            onClick={() => deleteCustomMsceMockQuestion(q.id)}
                            className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px] cursor-pointer"
                          >
                            Reset Override
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenEditMockQuestion(q)}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-[10px] cursor-pointer"
                        >
                          Edit / Translate
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-slate-900 whitespace-pre-line">{q.question}</p>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {q.options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`p-1.5 rounded-lg border ${
                            idx === q.correctAnswer
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          ({idx + 1}) {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 10-BATCH GENERATION & DUPLICATE AUDIT SYSTEM */}
        {adminTab === 'batches_audit' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg">
                  Zero-Duplicate &amp; 3-Language Integrity Audit (7,500 Mock Questions + 600 Existing Questions)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Scans all 50 Full Mock Examinations (100 Papers) across Std. 4th and Std. 7th and cross-checks against the 20 existing practice tests.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setAuditReport(runCompleteMsceDuplicateAndSyllabusAudit(customMsceMockQuestions))
                }
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shrink-0 shadow-md"
              >
                Run Full 70-Test Audit Now
              </button>
            </div>

            {auditReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                      Total Accessible Tests
                    </span>
                    <span className="text-2xl font-black text-emerald-900">
                      {auditReport.totalAccessibleTests} (20 + 50)
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                    <span className="text-[10px] font-bold uppercase text-indigo-800 block">
                      Mock Question Positions
                    </span>
                    <span className="text-2xl font-black text-indigo-900">
                      {auditReport.totalMockQuestionPositions}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block">
                      Duplicate Questions
                    </span>
                    <span className="text-2xl font-black text-amber-900">
                      {auditReport.duplicateQuestionsDetected + auditReport.crossTestDuplicatesDetected}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                    <span className="text-[10px] font-bold uppercase text-teal-800 block">
                      Existing Test Collisions
                    </span>
                    <span className="text-2xl font-black text-teal-900">
                      {auditReport.existingTestCollisionsDetected}
                    </span>
                  </div>
                </div>

                {/* Separate Academic Audit Reports: Std 4th (PSE) vs Std 7th (UPS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {[auditReport.std4Report, auditReport.std7Report]
                    .filter((rep): rep is NonNullable<typeof rep> => Boolean(rep))
                    .map((rep) => (
                      <div
                        key={rep.stdLevel}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-black text-sm text-slate-900">
                            {rep.stdLevel === 'Std 4th'
                              ? '🎓 Std. 4th (PSE) – 25 Mock Tests Audit'
                              : '🎓 Std. 7th (UPS) – 25 Mock Tests Audit'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                              rep.verifiedMockTestsCount === 25
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {rep.verifiedMockTestsCount === 25
                              ? '🟢 25/25 VERIFIED MOCK TESTS'
                              : `${rep.verifiedMockTestsCount}/25 Verified`}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-white border border-slate-200">
                            English Medium:{' '}
                            <strong>
                              {rep.mediumBreakdown.English.greenVerifiedCount}/
                              {rep.mediumBreakdown.English.totalQuestions}
                            </strong>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-slate-200">
                            Marathi Medium:{' '}
                            <strong>
                              {rep.mediumBreakdown.Marathi.greenVerifiedCount}/
                              {rep.mediumBreakdown.Marathi.totalQuestions}
                            </strong>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-slate-200">
                            Hindi Medium:{' '}
                            <strong>
                              {rep.mediumBreakdown.Hindi.greenVerifiedCount}/
                              {rep.mediumBreakdown.Hindi.totalQuestions}
                            </strong>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-slate-200">
                            Syllabus / Tag / Opt Failures:{' '}
                            <strong>
                              {rep.syllabusBoundaryViolations +
                                rep.fakeTagViolations +
                                rep.optionAndKeyFailures}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 font-medium">
                  <strong>Official MSCE Pune Circular Notice:</strong> Internal question banks, zero-repetition checks, answer keys, and syllabus alignment are verified above. Official exam circulars (merit list cutoffs, qualifying minimum %, age limits, exam dates, and application fees) require manual confirmation against official MSCE Pune notifications.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getMsceTenBatches().map((b) => (
                <div
                  key={b.batchNumber}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-black text-slate-900 block">{b.label}</span>
                    <span className="text-slate-600">
                      {b.totalTests} Tests • {b.totalQuestionsInBatch} Questions • {b.difficultyTier}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT PERFORMANCE MONITOR */}
        {adminTab === 'student_monitor' && (
          <div className="space-y-4">
            <h3 className="font-display font-black text-base text-slate-900">
              Student MSCE Mock Examination Performance Monitor
            </h3>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Saved Medium</th>
                    <th className="p-3">Mock Papers Completed</th>
                    <th className="p-3">Highest Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {studentsList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500">
                        No registered student records yet.
                      </td>
                    </tr>
                  ) : (
                    studentsList.map((stu) => {
                      const attempts = stu.msceMockAttempts || [];
                      const best =
                        attempts.length > 0
                          ? Math.max(...attempts.map((a) => a.marksObtained))
                          : 0;
                      return (
                        <tr key={stu.id} className="bg-white">
                          <td className="p-3 font-bold text-slate-900">{stu.name}</td>
                          <td className="p-3">{stu.classLevel}</td>
                          <td className="p-3 font-semibold text-amber-900">
                            {stu.scholarshipMedium || 'Marathi'}
                          </td>
                          <td className="p-3 font-bold">{attempts.length} Papers</td>
                          <td className="p-3 font-black text-emerald-800">
                            {attempts.length > 0 ? `${best} / 150` : '—'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EXISTING 20 PRACTICE TESTS (PRESERVED 100%) */}
        {adminTab === 'existing20' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStd('Std 4')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                    selectedStd === 'Std 4'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Std 4th – Primary ({STD_4_SCHOLARSHIP_BANK.length + std4Custom.length} Qs)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStd('Std 7')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                    selectedStd === 'Std 7'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Std 7th – Upper Primary ({STD_7_SCHOLARSHIP_BANK.length + std7Custom.length} Qs)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={testFilter}
                  onChange={(e) => setTestFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All 10 Practice Tests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={String(num)}>
                      Practice Test Set {num}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setFormStd(selectedStd === 'Std 4' ? 'Std 4th (PSE)' : 'Std 7th (UPS)');
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Practice Question</span>
                </button>
              </div>
            </div>

            <AdminPagination
              totalItems={filteredQuestions.length}
              currentPage={safePage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[10, 15, 30, 50]}
              itemLabel="scholarship questions"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paginatedQuestions.map((q) => {
                const isCustom = Boolean(
                  (q as CustomScholarshipQuestionRecord).isCustom || q.id.startsWith('sch_custom_')
                );
                return (
                  <div
                    key={q.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800">
                        Test {q.testNumber} • {q.subject}
                      </span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => void onDeleteCustomQuestion(q.id)}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-slate-600 line-clamp-2">{q.questionText.English}</p>
                    <p className="text-emerald-800 font-semibold">
                      Answer: {q.options.English[q.correctIndex]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Edit / Translate Full Mock Question Modal */}
        {showMockQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto space-y-4">
              <button
                type="button"
                onClick={() => setShowMockQuestionModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-extrabold text-slate-900">
                Edit / Translate Question Q{editMockQNumber} ({mockStdFilter} • Test{' '}
                {String(mockTestNumberFilter).padStart(2, '0')} • Paper {mockPaperFilter})
              </h3>
              <form onSubmit={handleSaveMockQuestionOverride} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question (English)</label>
                  <textarea
                    rows={2}
                    required
                    value={editMockQEn}
                    onChange={(e) => setEditMockQEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question (Marathi)</label>
                  <textarea
                    rows={2}
                    value={editMockQMr}
                    onChange={(e) => setEditMockQMr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question (Hindi)</label>
                  <textarea
                    rows={2}
                    value={editMockQHi}
                    onChange={(e) => setEditMockQHi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">
                    Options (Select Correct Answer Radio)
                  </label>
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mockCorrectOpt"
                        checked={editMockAns === idx}
                        onChange={() => setEditMockAns(idx)}
                      />
                      <input
                        type="text"
                        required
                        value={editMockOptsEn[idx]}
                        onChange={(e) => {
                          const next: [string, string, string, string] = [...editMockOptsEn];
                          next[idx] = e.target.value;
                          setEditMockOptsEn(next);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Explanation</label>
                  <input
                    type="text"
                    value={editMockExp}
                    onChange={(e) => setEditMockExp(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMockQuestionModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                  >
                    Save Question Override
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bulk Import Modal */}
        {showBulkImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Bulk Import MSCE Mock Questions (JSON)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBulkImportModal(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {bulkStatusMsg && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
                  {bulkStatusMsg}
                </div>
              )}
              <textarea
                rows={6}
                value={bulkJsonText}
                onChange={(e) => setBulkJsonText(e.target.value)}
                placeholder="Paste JSON array of MsceMockQuestion objects..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleRunBulkImport}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer"
                >
                  Import &amp; Check Duplicates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Practice Set Add Question Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto space-y-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-lg font-display font-extrabold text-slate-900">
                  Add Custom MSCE Practice Question
                </h3>
              </div>

              <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Standard</label>
                    <select
                      value={formStd}
                      onChange={(e) =>
                        setFormStd(e.target.value as 'Std 4th (PSE)' | 'Std 7th (UPS)')
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                    >
                      <option value="Std 4th (PSE)">Std 4th (PSE)</option>
                      <option value="Std 7th (UPS)">Std 7th (UPS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Practice Set</label>
                    <select
                      value={formTestNum}
                      onChange={(e) => setFormTestNum(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          Test Set {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">MSCE Section</label>
                    <select
                      value={formSection}
                      onChange={(e) => setFormSection(e.target.value as ScholarshipSection)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                    >
                      {SCHOLARSHIP_SECTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question (English) *</label>
                  <textarea
                    rows={2}
                    required
                    value={formQuestionEn}
                    onChange={(e) => setFormQuestionEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Question (Marathi - optional)
                  </label>
                  <input
                    type="text"
                    value={formQuestionMr}
                    onChange={(e) => setFormQuestionMr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">
                    4 Options (Select Correct Radio)
                  </label>
                  {[
                    { val: formOpt0, setVal: setFormOpt0, idx: 0 },
                    { val: formOpt1, setVal: setFormOpt1, idx: 1 },
                    { val: formOpt2, setVal: setFormOpt2, idx: 2 },
                    { val: formOpt3, setVal: setFormOpt3, idx: 3 },
                  ].map((opt) => (
                    <div key={opt.idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="schCorrectIdx"
                        checked={formCorrectIdx === opt.idx}
                        onChange={() => setFormCorrectIdx(opt.idx)}
                      />
                      <input
                        type="text"
                        required
                        value={opt.val}
                        onChange={(e) => opt.setVal(e.target.value)}
                        placeholder={`Option ${opt.idx + 1}`}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Solution Explanation</label>
                  <input
                    type="text"
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : 'Save Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AdminScholarshipSection.displayName = 'AdminScholarshipSection';
