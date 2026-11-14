import React, { useState } from 'react';
import { CheckCircle, Eye, EyeOff, Plus, Trash2, X } from 'lucide-react';
import type {
  SectionVisibilityConfig,
  SpecialLearningProgramItem,
  SpecialLearningSectionId,
} from '../../types';

interface AdminSettingsSectionProps {
  initialTimers: {
    classes2to3: number;
    classes4to5: number;
    classes6to8: number;
  };
  onSaveTimers: (c23: number, c45: number, c68: number) => void;
  sectionVisibility: SectionVisibilityConfig;
  onSaveSectionVisibility: (next: SectionVisibilityConfig) => Promise<void>;
  learningPrograms: SpecialLearningProgramItem[];
  onSaveLearningProgram: (program: SpecialLearningProgramItem) => Promise<void>;
  onDeleteLearningProgram: (id: string) => Promise<void>;
}

const VISIBILITY_SECTION_META: Array<{
  id: SpecialLearningSectionId;
  label: string;
  desc: string;
}> = [
  { id: 'scholarship', label: '1. Scholarship Corner', desc: 'MSCE Std 4 & Std 7 practice sets' },
  { id: 'drawing', label: '2. Drawing Studio', desc: '120+ colouring templates & freehand canvas' },
  { id: 'stories', label: '3. Story World', desc: '45+ English, Hindi & Marathi audio stories' },
  { id: 'shivaji', label: '4. Shivaji Maharaj Stories', desc: '50 chronological historical chapters' },
  { id: 'gk_cricket', label: '5. General Knowledge', desc: 'Daily Cricket Current Affairs & GK' },
  { id: 'creative_activities', label: '6. Creative Activities', desc: '47+ Brain Riddles & Sudoku (4×4/6×6/9×9)' },
  { id: 'future_skills', label: '7. Other Existing Learning Programs', desc: 'AI Learning Academy, Future Skills & Custom Programs' },
  { id: 'all_courses', label: 'Explore All Courses Directory', desc: 'MH, CBSE & ICSE unified catalog page' },
];

export const AdminSettingsSection: React.FC<AdminSettingsSectionProps> = React.memo(
  ({
    initialTimers,
    onSaveTimers,
    sectionVisibility,
    onSaveSectionVisibility,
    learningPrograms,
    onSaveLearningProgram,
    onDeleteLearningProgram,
  }) => {
    const [c23Timer, setC23Timer] = useState<number>(initialTimers.classes2to3);
    const [c45Timer, setC45Timer] = useState<number>(initialTimers.classes4to5);
    const [c68Timer, setC68Timer] = useState<number>(initialTimers.classes6to8);
    const [timerSaved, setTimerSaved] = useState<boolean>(false);

    const [visDraft, setVisDraft] = useState<SectionVisibilityConfig>(sectionVisibility);
    const [visSaved, setVisSaved] = useState<boolean>(false);

    const [showProgramModal, setShowProgramModal] = useState(false);
    const [progTitle, setProgTitle] = useState('');
    const [progSubtitle, setProgSubtitle] = useState('');
    const [progCategory, setProgCategory] = useState('Skill Enrichment');
    const [progDesc, setProgDesc] = useState('');
    const [progEmoji, setProgEmoji] = useState('🎓');
    const [progTargetTab, setProgTargetTab] = useState('future-skills');
    const [progBadge, setProgBadge] = useState('New Track');

    const handleSaveTimers = () => {
      onSaveTimers(c23Timer, c45Timer, c68Timer);
      setTimerSaved(true);
      setTimeout(() => setTimerSaved(false), 3000);
    };

    const toggleVisRule = (
      id: SpecialLearningSectionId,
      audience: 'visibleToVisitors' | 'visibleToStudents'
    ) => {
      setVisDraft((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [audience]: !prev[id]?.[audience],
        },
      }));
    };

    const handleSaveVis = async () => {
      await onSaveSectionVisibility(visDraft);
      setVisSaved(true);
      setTimeout(() => setVisSaved(false), 3000);
    };

    const handleCreateProgram = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!progTitle.trim() || !progDesc.trim()) return;
      const newProg: SpecialLearningProgramItem = {
        id: `prog_custom_${Date.now()}`,
        title: progTitle.trim(),
        subtitle: progSubtitle.trim() || 'Special Learning Module',
        category: progCategory.trim() || 'Skill Enrichment',
        description: progDesc.trim(),
        iconEmoji: progEmoji.trim() || '🎓',
        targetTab: progTargetTab,
        badgeText: progBadge.trim() || 'Featured',
        highlights: ['Interactive Access', 'Admin Curated'],
        published: true,
        isCustom: true,
      };
      await onSaveLearningProgram(newProg);
      setProgTitle('');
      setProgSubtitle('');
      setProgDesc('');
      setShowProgramModal(false);
    };

    return (
      <div className="space-y-6">
        {/* 1. QUIZ TIMERS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Quiz Timers &amp; Platform Configurations
            </h2>
            <p className="text-xs text-slate-500">
              Adjust class-wise countdown timers and sync configuration to Firestore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 2–3 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c23Timer}
                onChange={(e) => setC23Timer(parseInt(e.target.value, 10) || 30)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 30 seconds</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 4–5 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c45Timer}
                onChange={(e) => setC45Timer(parseInt(e.target.value, 10) || 25)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 25 seconds</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 6–8 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c68Timer}
                onChange={(e) => setC68Timer(parseInt(e.target.value, 10) || 20)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 20 seconds</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveTimers}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
            >
              Save Timer Changes
            </button>
            {timerSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Timers updated across platform!
              </span>
            )}
          </div>
        </div>

        {/* 2. VISITOR VS STUDENT SECTION VISIBILITY CONTROLS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200/80 shadow-xs space-y-5">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Special Learning Visibility (Visitor vs. Student Controls)
            </h2>
            <p className="text-xs text-slate-500">
              Control independently which Special Learning studios and Course Directory views are visible to Public Visitors and Signed-In Students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VISIBILITY_SECTION_META.map((item) => {
              const rule = visDraft[item.id] || { visibleToVisitors: true, visibleToStudents: true };
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.label}</h3>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs font-bold">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={rule.visibleToVisitors !== false}
                        onChange={() => toggleVisRule(item.id, 'visibleToVisitors')}
                        className="accent-indigo-600 cursor-pointer"
                      />
                      <span>Visitors</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={rule.visibleToStudents !== false}
                        onChange={() => toggleVisRule(item.id, 'visibleToStudents')}
                        className="accent-emerald-600 cursor-pointer"
                      />
                      <span>Students</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void handleSaveVis()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
            >
              Save Visibility Rules
            </button>
            {visSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Visibility rules synced to Firestore!
              </span>
            )}
          </div>
        </div>

        {/* 3. OTHER LEARNING PROGRAMS CMS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Other Learning Programs Manager ({learningPrograms.length})
              </h2>
              <p className="text-xs text-slate-500">
                Manage cards listed inside Special Learning → 7. Other Existing Learning Programs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowProgramModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Learning Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {learningPrograms.map((prog) => {
              const isPub = prog.published !== false;
              return (
                <div
                  key={prog.id}
                  className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between ${
                    isPub ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{prog.iconEmoji || '🎓'}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isPub ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPub ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{prog.title}</h4>
                    <p className="text-slate-500 line-clamp-2">{prog.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() =>
                        void onSaveLearningProgram({ ...prog, published: !isPub })
                      }
                      className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-amber-700 cursor-pointer"
                    >
                      {isPub ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isPub ? 'Hide' : 'Publish'}</span>
                    </button>
                    {prog.isCustom && (
                      <button
                        type="button"
                        onClick={() => void onDeleteLearningProgram(prog.id)}
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

        {/* Add Program Modal */}
        {showProgramModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-4">
              <button
                type="button"
                onClick={() => setShowProgramModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-extrabold text-slate-900">
                Add Special Learning Program
              </h3>
              <form onSubmit={handleCreateProgram} className="space-y-3 text-xs">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <label className="font-bold text-slate-700 block mb-1">Program Title *</label>
                    <input
                      type="text"
                      required
                      value={progTitle}
                      onChange={(e) => setProgTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Emoji</label>
                    <input
                      type="text"
                      value={progEmoji}
                      onChange={(e) => setProgEmoji(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-center"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      value={progCategory}
                      onChange={(e) => setProgCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Destination Studio</label>
                    <select
                      value={progTargetTab}
                      onChange={(e) => setProgTargetTab(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      <option value="future-skills">AI Academy / Future Skills</option>
                      <option value="scholarship">Scholarship Corner</option>
                      <option value="drawing">Drawing Studio</option>
                      <option value="stories">Story World</option>
                      <option value="shivaji">Shivaji Maharaj Stories</option>
                      <option value="cricket">General Knowledge</option>
                      <option value="puzzles">Brain Puzzles</option>
                      <option value="sudoku">Sudoku</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={progSubtitle}
                      onChange={(e) => setProgSubtitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={progBadge}
                      onChange={(e) => setProgBadge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={progDesc}
                    onChange={(e) => setProgDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProgramModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
                  >
                    Save Program
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
AdminSettingsSection.displayName = 'AdminSettingsSection';
