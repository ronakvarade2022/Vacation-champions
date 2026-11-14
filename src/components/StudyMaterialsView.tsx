import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Crown,
  FileText,
  GraduationCap,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import {
  canAccessStudyMaterial,
  formatStandardOrdinal,
  getClassSubscriptionInfo,
  normalizeBoardValue
} from '../utils/subscriptionAccess';

interface StudyMaterialsViewProps {
  initialBoard?: EducationBoard;
  initialClass?: ClassLevel;
  initialSubject?: SubjectName;
  onNavigateTab: (tab: string, subjectParam?: SubjectName) => void;
  onOpenMembership: (
    plan?: 'basic' | 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard
  ) => void;
}

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  initialBoard,
  initialClass,
  initialSubject,
  onNavigateTab,
  onOpenMembership
}) => {
  const { currentStudent, activeBoard } = useApp();

  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(
    normalizeBoardValue(initialBoard || activeBoard || 'Maharashtra')
  );
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(
    initialClass || currentStudent?.classLevel || 'Class 5'
  );

  useEffect(() => {
    if (currentStudent?.board && !initialBoard) {
      setSelectedBoard(normalizeBoardValue(currentStudent.board));
    }
    if (currentStudent?.classLevel && !initialClass) {
      setSelectedClass(currentStudent.classLevel);
    }
  }, [currentStudent?.id, currentStudent?.board, currentStudent?.classLevel, initialBoard, initialClass]);

  const subjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(
    initialSubject && subjects.includes(initialSubject)
      ? initialSubject
      : subjects[0] || 'English'
  );

  useEffect(() => {
    if (!subjects.includes(selectedSubject)) {
      setSelectedSubject(subjects[0] || 'English');
    }
  }, [subjects, selectedSubject]);

  const chapters = useMemo(
    () => getStudyMaterialsForSubject(selectedBoard, selectedClass, selectedSubject),
    [selectedBoard, selectedClass, selectedSubject]
  );

  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSelectedChapterIdx(0);
    setRevealedSolutions({});
  }, [selectedBoard, selectedClass, selectedSubject]);

  const activeChapter = chapters[selectedChapterIdx] || chapters[0];
  const boardMeta = getEducationBoardMeta(selectedBoard);
  const subjectMeta = getSubjectMeta(selectedSubject, selectedBoard);
  const classSubInfo = getClassSubscriptionInfo(currentStudent, selectedClass, undefined, selectedBoard);

  const accessResult = activeChapter
    ? canAccessStudyMaterial(
        currentStudent,
        selectedBoard,
        selectedClass,
        selectedSubject,
        activeChapter.isFreePreview
      )
    : { allowed: false, reason: '' };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-300">
              <span>{boardMeta.fullName}</span>
              <span aria-hidden="true">·</span>
              <span>Standard {formatStandardOrdinal(selectedClass)} ({selectedClass})</span>
              <span aria-hidden="true">·</span>
              <span>{subjects.length} Syllabus Subjects</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white [text-wrap:balance]">
              Chapter-Wise Study Notes, Formulas &amp; Solved Examples
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Structured revision summaries, key rules, textbook alignments, and worked examples curated for{' '}
              <strong className="text-white">{selectedBoard}</strong>,{' '}
              <strong className="text-white">{selectedClass}</strong>. Chapter 1 of Free subjects is unlocked for preview; ₹99 Premium unlocks every chapter for a full year (365 days).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab('quizzes', selectedSubject)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice Subject Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('worksheets', selectedSubject)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-300" />
              <span>Open Worksheets</span>
            </button>
            {!classSubInfo.isPaidActive && (
              <button
                type="button"
                onClick={() => onOpenMembership('premium', selectedClass, selectedBoard)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shadow-sm"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Unlock {selectedBoard} {selectedClass} (₹99)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Controls Strip: Board Selector + Class Selector */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>1. Select Education Board</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BOARD_META_LIST.map((b) => {
              const isSelected = selectedBoard === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBoard(b.id)}
                  className={`px-3.5 py-2 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{b.icon}</span>
                    <span>{b.fullName}</span>
                  </span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                    {b.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              2. Select Standard (Class 1 to Class 10)
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {classSubInfo.isPaidActive
                ? `Active Premium • Valid ${classSubInfo.daysRemaining} days left`
                : classSubInfo.isFreeBase
                ? 'Free Base Class • Chapter 1 Free Preview (English / Math)'
                : `Locked Class • Pay ₹99 for full ${selectedBoard} ${selectedClass} unlock`}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_10_CLASSES_META.map((meta) => {
              const isSelected = selectedClass === meta.classLevel;
              const info = getClassSubscriptionInfo(currentStudent, meta.classLevel, undefined, selectedBoard);
              return (
                <button
                  key={meta.classLevel}
                  type="button"
                  onClick={() => setSelectedClass(meta.classLevel)}
                  className={`px-2.5 py-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : info.isPaidActive
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      : info.isFreeBase
                      ? 'bg-slate-50 text-slate-800 border-indigo-200 hover:bg-indigo-50'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <span className="block font-black tabular-nums">{meta.shortLabel}</span>
                  <span className={`text-[10px] block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {info.isPaidActive ? 'Active' : info.isFreeBase ? 'Free Base' : 'Preview'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Split Reading Stage */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Subjects & Chapters */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h2 className="text-sm font-black text-slate-900">
              Subjects ({selectedBoard} · {selectedClass})
            </h2>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {subjects.map((sub) => {
                const sMeta = getSubjectMeta(sub, selectedBoard);
                const active = selectedSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="shrink-0">{sMeta.icon}</span>
                      <span className="truncate">{sub}</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Chapters</h2>
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                {chapters.length} Units
              </span>
            </div>
            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {chapters.map((ch, idx) => {
                const chAccess = canAccessStudyMaterial(
                  currentStudent,
                  selectedBoard,
                  selectedClass,
                  selectedSubject,
                  ch.isFreePreview
                );
                const isSelected = idx === selectedChapterIdx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChapterIdx(idx)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <span className="truncate">
                      <span className="tabular-nums mr-1.5 opacity-75">
                        {String(ch.chapterNumber).padStart(2, '0')}.
                      </span>
                      {ch.chapterTitle}
                    </span>
                    {!chAccess.allowed ? (
                      <Lock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                    ) : ch.isFreePreview ? (
                      <span className={`text-[10px] font-bold shrink-0 ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        Free
                      </span>
                    ) : (
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Reading Stage: Chapter Content or Paywall */}
        <div className="lg:col-span-8">
          {activeChapter ? (
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Clean Editorial Metadata Line */}
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>{selectedBoard} Board</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedClass}</span>
                  <span aria-hidden="true">·</span>
                  <span>{subjectMeta.icon} {selectedSubject}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">Chapter {activeChapter.chapterNumber}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                  {String(activeChapter.chapterNumber).padStart(2, '0')}. {activeChapter.chapterTitle}
                </h2>
                <p className="text-xs font-medium text-slate-600">
                  Reference: <strong className="text-slate-800">{activeChapter.textbookRef}</strong>
                </p>
              </div>

              {!accessResult.allowed ? (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 sm:p-8 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-lg mx-auto">
                    <h3 className="text-lg font-display font-black text-slate-900">
                      Chapter Notes Locked — {selectedBoard} {selectedClass}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {accessResult.reason}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenMembership('premium', selectedClass, selectedBoard)}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Activate {selectedBoard} {selectedClass} (₹99 / 365 Days)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedChapterIdx(0)}
                      className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs cursor-pointer"
                    >
                      View Chapter 1 Preview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. Overview */}
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {activeChapter.overview}
                  </p>

                  {/* 2. Key Concepts */}
                  <section className="space-y-2.5">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Core Syllabus Concepts</span>
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                      {activeChapter.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="font-mono text-xs font-bold text-indigo-600 tabular-nums mt-0.5">
                            0{i + 1}.
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* 3. Key Formulas & Rules */}
                  <section className="space-y-2.5 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-900">
                      Key Formulas, Theorems &amp; Rules
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeChapter.formulasAndRules.map((rule, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 font-mono"
                        >
                          {rule}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 4. Worked Examples */}
                  <section className="space-y-3 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-900">
                      Solved Walkthrough Examples
                    </h3>
                    <div className="space-y-3">
                      {activeChapter.solvedExamples.map((ex, i) => {
                        const key = `${activeChapter.id}-ex-${i}`;
                        const isRevealed = Boolean(revealedSolutions[key]);
                        return (
                          <div
                            key={key}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <p className="text-sm font-bold text-slate-900">
                                Example {i + 1}: {ex.prompt}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  setRevealedSolutions((prev) => ({
                                    ...prev,
                                    [key]: !prev[key]
                                  }))
                                }
                                className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-xs font-bold text-indigo-700 cursor-pointer shrink-0 self-start sm:self-center"
                              >
                                {isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution'}
                              </button>
                            </div>
                            {isRevealed && (
                              <div className="p-3 rounded-lg bg-white border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                                <strong className="text-emerald-800">Solution: </strong>
                                {ex.solution}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* 5. Interactive Revision Checklist */}
                  <section className="space-y-2.5 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                      <span>Chapter Self-Revision Checklist</span>
                    </h3>
                    <div className="space-y-2">
                      {activeChapter.revisionChecklist.map((item, i) => {
                        const chkKey = `${activeChapter.id}-chk-${i}`;
                        const checked = Boolean(checkedItems[chkKey]);
                        return (
                          <label
                            key={chkKey}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                              checked
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setCheckedItems((prev) => ({ ...prev, [chkKey]: !prev[chkKey] }))
                              }
                              className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </section>

                  {/* Footer Next Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-500 font-medium">
                      Ready to test "{activeChapter.chapterTitle}"?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigateTab('quizzes', selectedSubject)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Start {selectedSubject} Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateTab('worksheets', selectedSubject)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Open Worksheets</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ) : null}
        </div>
      </section>
    </div>
  );
};
