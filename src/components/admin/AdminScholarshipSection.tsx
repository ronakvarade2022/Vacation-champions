import React, { useState, useMemo, useEffect } from 'react';
import {
  STD_4_SCHOLARSHIP_BANK,
  STD_7_SCHOLARSHIP_BANK,
  MSCE_LANGUAGES,
  ScholarshipSection,
} from '../../data/scholarshipData';
import type { CustomScholarshipQuestionRecord } from '../../types';
import { AdminPagination } from './AdminPagination';
import { Plus, Trash2, X } from 'lucide-react';

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

    const handleCreateQuestion = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formQuestionEn.trim() || !formOpt0.trim() || !formOpt1.trim() || !formOpt2.trim() || !formOpt3.trim()) {
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

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Maharashtra MSCE Scholarship Practice Banks &amp; CMS
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Official syllabus for Std 4th (Primary) &amp; Std 7th (Upper Primary) plus {customQuestions.length} custom CMS questions saved to Firestore.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl">
              7 Languages
            </span>
            <button
              type="button"
              onClick={() => {
                setFormStd(selectedStd === 'Std 4' ? 'Std 4th (PSE)' : 'Std 7th (UPS)');
                setShowAddModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add MSCE Question</span>
            </button>
          </div>
        </div>

        {/* Languages overview */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
          <span className="font-bold text-amber-950 block">Approved Examination Languages:</span>
          <div className="flex flex-wrap gap-2">
            {MSCE_LANGUAGES.map((lang) => (
              <span
                key={lang.id}
                className="bg-white border border-amber-300 text-amber-900 px-3 py-1 rounded-xl font-bold"
              >
                {lang.label}
              </span>
            ))}
          </div>
        </div>

        {/* Switcher + Test Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

          <select
            value={testFilter}
            onChange={(e) => setTestFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700 self-start sm:self-auto"
          >
            <option value="all">All 10 Practice Tests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={String(num)}>
                Practice Test Set {num}
              </option>
            ))}
          </select>
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

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              {selectedStd === 'Std 4'
                ? 'Std 4th – Primary Scholarship (PSE)'
                : 'Std 7th – Upper Primary Scholarship (UPS)'}
            </h3>
            <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
              10 Tests Active
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {selectedStd === 'Std 4'
              ? 'Paper 1 (Language & Maths) + Paper 2 (Third Lang & Intelligence). Total 150 marks per paper.'
              : 'Advanced Algebra, Geometry, Reasoning, Clock Angles, Coding & Comprehension.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paginatedQuestions.map((q) => {
              const isCustom = Boolean((q as CustomScholarshipQuestionRecord).isCustom || q.id.startsWith('sch_custom_'));
              return (
                <div
                  key={q.id}
                  className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800">
                      Test {q.testNumber} • {q.subject}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCustom && (
                        <>
                          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                            Custom CMS
                          </span>
                          <button
                            type="button"
                            onClick={() => void onDeleteCustomQuestion(q.id)}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="Delete custom question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
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

        {/* Add MSCE Scholarship Question Modal */}
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
                  Add Custom MSCE Scholarship Question
                </h3>
                <p className="text-xs text-slate-500">
                  Added straight to the selected Standard &amp; Mock Test Set and synced to Firestore.
                </p>
              </div>

              <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Standard</label>
                    <select
                      value={formStd}
                      onChange={(e) => setFormStd(e.target.value as 'Std 4th (PSE)' | 'Std 7th (UPS)')}
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
                    placeholder="Enter MSCE question text..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question (Marathi - optional)</label>
                  <input
                    type="text"
                    value={formQuestionMr}
                    onChange={(e) => setFormQuestionMr(e.target.value)}
                    placeholder="Optional Marathi translation..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">4 Options (Select Correct Radio)</label>
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
                        className="accent-amber-600 cursor-pointer"
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
                    placeholder="Brief explanation for students..."
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
