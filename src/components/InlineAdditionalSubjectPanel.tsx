import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Layers,
  RotateCcw,
} from 'lucide-react';
import type { ClassLevel, EducationBoard } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import { ADDITIONAL_CURRICULUM_LABEL } from '../types/additionalCurriculum';
import {
  getLocalizedChapterTitle,
  getLocalizedSubjectName,
  getStudentAdditionalProgressMap,
  markAdditionalNotesCompleted,
  markAdditionalWorksheetCompleted,
  normalizeMediumForBoard,
  recordAdditionalQuizAttempt,
  type InlineAdditionalCurriculumResolution,
} from '../services/additionalCurriculumService';
import { subscribeAdditionalCurriculumChanges } from '../services/additionalCurriculumPersistence';

export type InlineAdditionalMode = 'notes' | 'worksheet' | 'quiz' | 'qa';

export interface InlineAdditionalSubjectPanelProps {
  resolution: InlineAdditionalCurriculumResolution;
  board: EducationBoard;
  classLevel: ClassLevel;
  medium: InstructionMedium;
  userId?: string;
  initialMode?: InlineAdditionalMode;
  initialChapterNumber?: number;
  onOpenFullWorkspace?: () => void;
}

export const InlineAdditionalSubjectPanel: React.FC<InlineAdditionalSubjectPanelProps> = ({
  resolution,
  board,
  classLevel,
  medium,
  userId = 'guest-student',
  initialMode = 'notes',
  initialChapterNumber,
  onOpenFullWorkspace,
}) => {
  const effectiveMedium = normalizeMediumForBoard(board, medium);
  const { additionalSubject, chapters, syllabusResolution, isIntegratedIntoParent } = resolution;

  const [mode, setMode] = useState<InlineAdditionalMode>(initialMode);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (initialChapterNumber) {
      const found = chapters.find((c) => c.chapterNumber === initialChapterNumber);
      if (found) return found.chapterId;
    }
    return chapters[0]?.chapterId || '';
  });

  const [worksheetDrafts, setWorksheetDrafts] = useState<Record<string, string>>({});
  const [showWorksheetAnswers, setShowWorksheetAnswers] = useState(false);
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [revealedShortAnswers, setRevealedShortAnswers] = useState<Record<string, boolean>>({});
  const [progressTick, setProgressTick] = useState(0);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (chapters.length === 0) return;
    if (initialChapterNumber) {
      const byNum = chapters.find((c) => c.chapterNumber === initialChapterNumber);
      if (byNum) {
        setSelectedChapterId(byNum.chapterId);
        return;
      }
    }
    if (!chapters.some((c) => c.chapterId === selectedChapterId)) {
      setSelectedChapterId(chapters[0].chapterId);
    }
  }, [chapters, selectedChapterId, initialChapterNumber]);

  const activeChapter = useMemo(
    () => chapters.find((c) => c.chapterId === selectedChapterId) || chapters[0] || null,
    [chapters, selectedChapterId]
  );

  useEffect(() => {
    setWorksheetDrafts({});
    setShowWorksheetAnswers(false);
    setSelectedMcqAnswers({});
    setQuizSubmitted(false);
    setRevealedShortAnswers({});
  }, [activeChapter?.chapterId]);

  useEffect(() => {
    return subscribeAdditionalCurriculumChanges((scope) => {
      if (scope === 'progress' || scope === 'all') {
        setProgressTick((t) => t + 1);
      }
    });
  }, []);

  const progressMap = useMemo(() => {
    void progressTick;
    return getStudentAdditionalProgressMap(userId);
  }, [userId, progressTick]);

  const chapterProgress = activeChapter ? progressMap[activeChapter.chapterId] : undefined;

  if (!activeChapter) return null;

  const localizedSubjectTitle = getLocalizedSubjectName(additionalSubject, effectiveMedium);
  const localizedChapterTitle = getLocalizedChapterTitle(activeChapter, effectiveMedium);

  const mcqTotal = activeChapter.materials.mcqQuiz.length;
  const mcqAnsweredCount = activeChapter.materials.mcqQuiz.filter(
    (q) => typeof selectedMcqAnswers[q.id] === 'number'
  ).length;
  const mcqCorrectCount = activeChapter.materials.mcqQuiz.reduce(
    (acc, q) => acc + (selectedMcqAnswers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  const handleMarkNotesDone = () => {
    markAdditionalNotesCompleted(userId, activeChapter, board, effectiveMedium);
    setProgressTick((t) => t + 1);
  };

  const handleMarkWorksheetDone = () => {
    markAdditionalWorksheetCompleted(userId, activeChapter, board, effectiveMedium);
    setProgressTick((t) => t + 1);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    recordAdditionalQuizAttempt(
      userId,
      activeChapter,
      board,
      effectiveMedium,
      mcqCorrectCount,
      mcqTotal
    );
    setProgressTick((t) => t + 1);
  };

  const handleRetryQuiz = () => {
    setSelectedMcqAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <section
      aria-label={`${additionalSubject.name} Supplementary Class Syllabus Module`}
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
    >
      {/* Header Region: Clean unboxed metadata + honest classification */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-600">
              <span className="text-indigo-700 font-bold">{ADDITIONAL_CURRICULUM_LABEL}</span>
              <span aria-hidden="true">·</span>
              <span>{board} Board</span>
              <span aria-hidden="true">·</span>
              <span>{classLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{effectiveMedium} Medium</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{chapters.length} Modules</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-900">
              {localizedSubjectTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {isIntegratedIntoParent && syllabusResolution.integratedParentLabel
                ? `Official parent coverage: ${syllabusResolution.integratedParentLabel}. Below are the integrated supplementary lessons, worksheets, and practice quizzes directly inside ${classLevel}.`
                : `Supplementary enrichment curriculum (not an official standalone board textbook) integrated directly into ${board} ${classLevel} so students can study notes, complete worksheets, and practice MCQs in place.`}
            </p>
          </div>

          {onOpenFullWorkspace && (
            <button
              type="button"
              onClick={onOpenFullWorkspace}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer transition-colors"
            >
              <span>Full Enrichment Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Chapter Selector */}
        {chapters.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {chapters.map((ch) => {
              const isSelected = ch.chapterId === activeChapter.chapterId;
              const prog = progressMap[ch.chapterId];
              const isDone = Boolean(prog?.notesCompleted && prog?.worksheetCompleted && prog?.quizCompleted);
              return (
                <button
                  key={ch.chapterId}
                  type="button"
                  onClick={() => setSelectedChapterId(ch.chapterId)}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono tabular-nums text-[11px] opacity-80">
                    Ch {String(ch.chapterNumber).padStart(2, '0')}
                  </span>
                  <span className="max-w-[230px] truncate">{ch.title}</span>
                  {isDone && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Mode Switcher Segmented Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {(
              [
                { id: 'notes', label: 'Notes & Activity', icon: BookOpen },
                { id: 'worksheet', label: 'Practice Worksheet', icon: FileText },
                { id: 'quiz', label: 'MCQ Quiz', icon: ClipboardCheck },
                { id: 'qa', label: 'Q&A & Revision', icon: HelpCircle },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 tabular-nums">
            <span>
              Notes: <strong className="text-slate-900">{chapterProgress?.notesCompleted ? 'Done' : 'Pending'}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Worksheet:{' '}
              <strong className="text-slate-900">{chapterProgress?.worksheetCompleted ? 'Done' : 'Pending'}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Quiz:{' '}
              <strong className="text-slate-900">
                {chapterProgress?.quizCompleted
                  ? `${chapterProgress.bestQuizScore}/${chapterProgress.quizTotal}`
                  : 'Not Taken'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Stage Body */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <p className="text-xs font-semibold text-indigo-700 tabular-nums">
            Chapter {activeChapter.chapterNumber} of {chapters.length}
          </p>
          <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900">
            {localizedChapterTitle}
          </h4>
        </div>

        {/* MODE 1: NOTES & HANDS-ON ACTIVITY */}
        {mode === 'notes' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-slate-900">Concept Overview</h5>
              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                {activeChapter.materials.simpleExplanation}
              </p>
            </div>

            {activeChapter.materials.keyTakeaways.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h5 className="text-sm font-bold text-slate-900">Key Takeaways</h5>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {activeChapter.materials.keyTakeaways.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-emerald-700 tabular-nums pt-0.5">
                        •
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
              <div className="space-y-2.5">
                <h5 className="text-sm font-bold text-slate-900">Key Learning Objectives</h5>
                <ul className="space-y-2 text-sm text-slate-700">
                  {activeChapter.learningObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-slate-400 tabular-nums pt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h5 className="text-sm font-bold text-slate-900">Worked Examples</h5>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl">
                  {activeChapter.materials.workedExamples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 space-y-1">
                      <p className="text-xs font-bold text-slate-900">{ex.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{ex.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className="text-sm font-bold text-slate-900">
                  Guided Activity: {activeChapter.materials.handsOnActivity.title}
                </h5>
                <span className="text-xs text-slate-500">
                  Materials: {activeChapter.materials.handsOnActivity.materialsNeeded.join(', ')}
                </span>
              </div>
              <ol className="space-y-2 text-sm text-slate-700">
                {activeChapter.materials.handsOnActivity.steps.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs font-semibold text-indigo-700 tabular-nums pt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleMarkNotesDone}
                className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  chapterProgress?.notesCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {chapterProgress?.notesCompleted ? 'Notes Completed' : 'Mark Chapter Notes Completed'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMode('worksheet')}
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Next: Practice Worksheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: PRACTICE WORKSHEET */}
        {mode === 'worksheet' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold text-slate-900">
                  {activeChapter.materials.practiceWorksheet.title}
                </h5>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeChapter.materials.practiceWorksheet.instructions}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowWorksheetAnswers((prev) => !prev)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap"
              >
                {showWorksheetAnswers ? 'Hide Model Answers' : 'Check Answer Key'}
              </button>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
              {activeChapter.materials.practiceWorksheet.items.map((item, idx) => (
                <div key={item.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                        Q{idx + 1}.
                      </span>
                      {item.prompt}
                    </p>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide shrink-0">
                      {item.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={worksheetDrafts[item.id] || ''}
                    onChange={(e) =>
                      setWorksheetDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder="Write your answer here..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                  {showWorksheetAnswers && (
                    <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                      Model Answer: {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleMarkWorksheetDone}
                className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  chapterProgress?.worksheetCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {chapterProgress?.worksheetCompleted
                    ? 'Worksheet Completed'
                    : 'Mark Practice Worksheet Completed'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMode('quiz')}
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Take Chapter Quiz ({mcqTotal} MCQs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: INTERACTIVE MCQ QUIZ */}
        {mode === 'quiz' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold text-slate-900">
                  Interactive Practice Quiz ({mcqTotal} Questions)
                </h5>
                <p className="text-xs text-slate-600 mt-0.5 tabular-nums">
                  {quizSubmitted
                    ? `Score: ${mcqCorrectCount} of ${mcqTotal} (${Math.round(
                        (mcqCorrectCount / Math.max(1, mcqTotal)) * 100
                      )}%)`
                    : `Answered ${mcqAnsweredCount} of ${mcqTotal}`}
                </p>
              </div>
              {quizSubmitted && (
                <button
                  type="button"
                  onClick={handleRetryQuiz}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {activeChapter.materials.mcqQuiz.map((q, qIdx) => {
                const chosen = selectedMcqAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                          {qIdx + 1}.
                        </span>
                        {q.question}
                      </p>
                      <span className="text-[11px] text-slate-500 capitalize shrink-0">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isPicked = chosen === optIdx;
                        const isCorrect = q.correctIndex === optIdx;

                        let btnClass =
                          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnClass =
                              'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isPicked) {
                            btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                          }
                        } else if (isPicked) {
                          btnClass = 'border-slate-900 bg-slate-900 text-white font-semibold';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() =>
                              setSelectedMcqAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }
                            className={`px-3.5 py-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer disabled:cursor-default ${btnClass}`}
                          >
                            <span className="font-mono mr-2 opacity-75">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <div className="pt-1">
                <button
                  type="button"
                  disabled={mcqAnsweredCount < mcqTotal}
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  {mcqAnsweredCount < mcqTotal
                    ? `Answer All ${mcqTotal} Questions to Submit (${mcqAnsweredCount}/${mcqTotal})`
                    : 'Submit Practice Quiz'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: SHORT-ANSWER Q&A & REVISION */}
        {mode === 'qa' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-slate-900">
                Short-Answer Questions ({activeChapter.materials.shortAnswerQuestions.length})
              </h5>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {activeChapter.materials.shortAnswerQuestions.map((sa, idx) => {
                  const revealed = Boolean(revealedShortAnswers[sa.id]);
                  return (
                    <div key={sa.id} className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                            Q{idx + 1}.
                          </span>
                          {sa.question}
                        </p>
                        <span className="text-xs text-slate-500 tabular-nums shrink-0">
                          {sa.marks} Marks
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedShortAnswers((prev) => ({
                            ...prev,
                            [sa.id]: !prev[sa.id],
                          }))
                        }
                        className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer"
                      >
                        {revealed ? 'Hide Model Answer' : 'Show Model Answer'}
                      </button>
                      {revealed && (
                        <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 leading-relaxed">
                          {sa.modelAnswer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Quick Revision Exercises</span>
              </h5>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {activeChapter.materials.revisionExercises.map((rev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-indigo-700 tabular-nums pt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{rev}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Classroom strategy: {activeChapter.materials.teacherGuidance.classroomStrategy}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
