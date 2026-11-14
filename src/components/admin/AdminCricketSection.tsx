import React, { useState, useMemo } from 'react';
import type { CustomGkQuestionItem, QuizLevel } from '../../types';
import { Eye, EyeOff, Plus, Trash2, X } from 'lucide-react';

interface AdminCricketSectionProps {
  gkQuestions: CustomGkQuestionItem[];
  onSaveGkQuestion: (q: CustomGkQuestionItem) => Promise<void>;
  onDeleteGkQuestion: (id: string) => Promise<void>;
}

const GK_CATEGORIES: CustomGkQuestionItem['category'][] = [
  'Current Affairs',
  'Records & Stats',
  'IPL & Leagues',
  'Rules & Terminology',
  'World Cup & History',
  'Women Cricket',
  'General Knowledge',
];

export const AdminCricketSection: React.FC<AdminCricketSectionProps> = React.memo(
  ({ gkQuestions, onSaveGkQuestion, onDeleteGkQuestion }) => {
    const [activeLevel, setActiveLevel] = useState<QuizLevel>(1);
    const [showAddModal, setShowAddModal] = useState(false);

    const [formLevel, setFormLevel] = useState<QuizLevel>(1);
    const [formCategory, setFormCategory] =
      useState<CustomGkQuestionItem['category']>('General Knowledge');
    const [formQuestion, setFormQuestion] = useState('');
    const [formOpt0, setFormOpt0] = useState('');
    const [formOpt1, setFormOpt1] = useState('');
    const [formOpt2, setFormOpt2] = useState('');
    const [formOpt3, setFormOpt3] = useState('');
    const [formCorrectIdx, setFormCorrectIdx] = useState(0);
    const [formExplanation, setFormExplanation] = useState('');

    const lvlTitle =
      activeLevel === 1
        ? 'Beginner'
        : activeLevel === 2
          ? 'Intermediate'
          : activeLevel === 3
            ? 'Advanced'
            : 'Champion';

    const levelCounts = useMemo(() => {
      const counts: Record<QuizLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
      gkQuestions.forEach((q) => {
        counts[q.level] = (counts[q.level] || 0) + 1;
      });
      return counts;
    }, [gkQuestions]);

    const qList = useMemo(
      () => gkQuestions.filter((q) => q.level === activeLevel),
      [gkQuestions, activeLevel]
    );

    const handleCreateGkQuestion = async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !formQuestion.trim() ||
        !formOpt0.trim() ||
        !formOpt1.trim() ||
        !formOpt2.trim() ||
        !formOpt3.trim()
      ) {
        return;
      }
      const options: [string, string, string, string] = [
        formOpt0.trim(),
        formOpt1.trim(),
        formOpt2.trim(),
        formOpt3.trim(),
      ];
      const newQ: CustomGkQuestionItem = {
        id: `gk_custom_${Date.now()}`,
        level: formLevel,
        category: formCategory,
        question: formQuestion.trim(),
        options,
        correctIndex: formCorrectIdx,
        explanation:
          formExplanation.trim() || `The verified correct answer is ${options[formCorrectIdx]}.`,
        published: true,
        isCustom: true,
      };
      await onSaveGkQuestion(newQ);
      setFormQuestion('');
      setFormOpt0('');
      setFormOpt1('');
      setFormOpt2('');
      setFormOpt3('');
      setFormExplanation('');
      setShowAddModal(false);
    };

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏏</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                General Knowledge &amp; Cricket Question Bank ({gkQuestions.length} Qs)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage daily cricket current affairs, records, women's cricket &amp; General Knowledge questions across 4 levels.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormLevel(activeLevel);
              setShowAddModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add GK / Cricket Question</span>
          </button>
        </div>

        {/* Level Switcher */}
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4] as QuizLevel[]).map((lvl) => {
            const title =
              lvl === 1 ? 'Beginner' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advanced' : 'Champion';
            return (
              <button
                type="button"
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  activeLevel === lvl
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                Level {lvl} – {title} ({levelCounts[lvl]} Qs)
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
              <span>
                Level {activeLevel} – {lvlTitle}
              </span>
              <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                {qList.length} Questions
              </span>
            </h3>
            <span className="text-xs text-slate-500">Anti-Pattern Randomizer Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {qList.map((q, qIdx) => {
              const isPublished = q.published !== false;
              const isCustom = Boolean(q.isCustom && q.id.startsWith('gk_custom_'));
              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border space-y-2 shadow-2xs ${
                    isPublished ? 'bg-white border-emerald-100' : 'bg-slate-50 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900">
                      Q{qIdx + 1}. {q.question}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      {q.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>Answer: </strong>
                    <span className="text-emerald-800 font-bold">{q.options[q.correctIndex]}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">{q.explanation}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <button
                      type="button"
                      onClick={() => void onSaveGkQuestion({ ...q, published: !isPublished })}
                      className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-emerald-700 cursor-pointer"
                    >
                      {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isPublished ? 'Hide' : 'Publish'}</span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => void onDeleteGkQuestion(q.id)}
                        className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add GK / Cricket Question Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-emerald-200 relative max-h-[90vh] overflow-y-auto space-y-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-extrabold text-slate-900">
                Add General Knowledge / Cricket Question
              </h3>
              <form onSubmit={handleCreateGkQuestion} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Quiz Level</label>
                    <select
                      value={formLevel}
                      onChange={(e) => setFormLevel(Number(e.target.value) as QuizLevel)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      <option value={1}>Level 1 – Beginner</option>
                      <option value={2}>Level 2 – Intermediate</option>
                      <option value={3}>Level 3 – Advanced</option>
                      <option value={4}>Level 4 – Champion</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) =>
                        setFormCategory(e.target.value as CustomGkQuestionItem['category'])
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      {GK_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question *</label>
                  <textarea
                    rows={2}
                    required
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
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
                        name="gkCorrectIdx"
                        checked={formCorrectIdx === opt.idx}
                        onChange={() => setFormCorrectIdx(opt.idx)}
                        className="accent-emerald-600 cursor-pointer"
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
                  <label className="font-bold text-slate-700 block mb-1">Explanation</label>
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
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
                  >
                    Save GK Question
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
AdminCricketSection.displayName = 'AdminCricketSection';
