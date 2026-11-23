import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Printer,
  RotateCcw,
  Sparkles,
  Trash2,
  UserCheck,
} from 'lucide-react';
import type { ClassLevel, EducationBoard } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalSubjectDefinition,
} from '../types/additionalCurriculum';
import {
  ALL_ADDITIONAL_BOARDS,
  ALL_ADDITIONAL_CLASSES,
} from '../data/additionalCurriculum/subjectsCatalog';
import {
  createTeacherAdditionalAssignment,
  deleteTeacherAdditionalAssignment,
  getAllAdditionalChapters,
  getAllAdditionalSubjects,
  getAllowedMediumsForBoard,
  getLocalizedChapterTitle,
  getLocalizedSubjectName,
  getStudentAdditionalProgressMap,
  getStudentAdditionalProgressSummary,
  listTeacherAdditionalAssignments,
  markAdditionalNotesCompleted,
  markAdditionalWorksheetCompleted,
  normalizeMediumForBoard,
  recordAdditionalQuizAttempt,
  toggleTeacherAssignmentStatus,
} from '../services/additionalCurriculumService';
import { subscribeAdditionalCurriculumChanges } from '../services/additionalCurriculumPersistence';

type WorkspaceMode = 'notes' | 'worksheet' | 'quiz' | 'revision' | 'teacher';

export interface AdditionalCurriculumViewProps {
  initialBoard?: EducationBoard;
  initialClass?: ClassLevel;
  initialMedium?: InstructionMedium;
  initialSubjectId?: string;
  portalMode?: 'student' | 'teacher';
  userId?: string;
  userName?: string;
  onBack?: () => void;
}

export const AdditionalCurriculumView: React.FC<AdditionalCurriculumViewProps> = ({
  initialBoard = 'Maharashtra',
  initialClass = 'Class 5',
  initialMedium = 'English',
  initialSubjectId,
  portalMode = 'student',
  userId = 'guest-student',
  userName = 'Student',
  onBack,
}) => {
  const [board, setBoard] = useState<EducationBoard>(initialBoard);
  const [classLevel, setClassLevel] = useState<ClassLevel>(initialClass);
  const [medium, setMedium] = useState<InstructionMedium>(() =>
    normalizeMediumForBoard(initialBoard, initialMedium)
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'ADD_GK');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<WorkspaceMode>('notes');

  // Interactive worksheet state
  const [worksheetDrafts, setWorksheetDrafts] = useState<Record<string, string>>({});
  const [showWorksheetAnswers, setShowWorksheetAnswers] = useState(false);

  // Interactive quiz state
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Short answers toggle state
  const [revealedShortAnswers, setRevealedShortAnswers] = useState<Record<string, boolean>>({});

  // Separate supplementary progress refresh tick
  const [progressVersion, setProgressVersion] = useState(0);

  // Teacher assignment form state
  const [division, setDivision] = useState('A');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().slice(0, 10);
  });
  const [teacherNote, setTeacherNote] = useState('');
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null);
  const [assignmentsVersion, setAssignmentsVersion] = useState(0);
  const [cmsVersion, setCmsVersion] = useState(0);

  // Sync external initial selections if parent passes deep link (e.g. from blocked non-standalone banner)
  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setMedium((prev) => normalizeMediumForBoard(initialBoard, initialMedium || prev));
    }
  }, [initialBoard, initialMedium]);

  useEffect(() => {
    if (initialClass) setClassLevel(initialClass);
  }, [initialClass]);

  useEffect(() => {
    if (initialSubjectId) setSelectedSubjectId(initialSubjectId);
  }, [initialSubjectId]);

  const allowedMediums = useMemo(() => getAllowedMediumsForBoard(board), [board]);

  const handleBoardChange = (nextBoard: EducationBoard) => {
    setBoard(nextBoard);
    setMedium((prev) => normalizeMediumForBoard(nextBoard, prev));
  };

  const publishedSubjects = useMemo<AdditionalSubjectDefinition[]>(() => {
    void cmsVersion;
    return getAllAdditionalSubjects({ board, medium, includeUnpublished: false });
  }, [board, medium, cmsVersion]);

  // Keep selectedSubjectId valid
  useEffect(() => {
    if (publishedSubjects.length === 0) return;
    if (!publishedSubjects.some((s) => s.id === selectedSubjectId)) {
      setSelectedSubjectId(publishedSubjects[0].id);
    }
  }, [publishedSubjects, selectedSubjectId]);

  const activeSubject = useMemo(
    () => publishedSubjects.find((s) => s.id === selectedSubjectId) || publishedSubjects[0] || null,
    [publishedSubjects, selectedSubjectId]
  );

  const chaptersForSelection = useMemo<AdditionalChapterRecord[]>(() => {
    void cmsVersion;
    if (!activeSubject) return [];
    return getAllAdditionalChapters({
      board,
      classLevel,
      medium,
      subjectId: activeSubject.id,
      includeUnpublished: false,
    });
  }, [board, classLevel, medium, activeSubject, cmsVersion]);

  useEffect(() => {
    if (chaptersForSelection.length === 0) {
      setSelectedChapterId('');
      return;
    }
    if (!chaptersForSelection.some((c) => c.chapterId === selectedChapterId)) {
      setSelectedChapterId(chaptersForSelection[0].chapterId);
    }
  }, [chaptersForSelection, selectedChapterId]);

  const activeChapter = useMemo(
    () => chaptersForSelection.find((c) => c.chapterId === selectedChapterId) || chaptersForSelection[0] || null,
    [chaptersForSelection, selectedChapterId]
  );

  // Reset per-chapter interactive inputs when switching chapters
  useEffect(() => {
    setWorksheetDrafts({});
    setShowWorksheetAnswers(false);
    setSelectedMcqAnswers({});
    setQuizSubmitted(false);
    setRevealedShortAnswers({});
    setAssignmentNotice(null);
  }, [activeChapter?.chapterId]);

  useEffect(() => {
    return subscribeAdditionalCurriculumChanges((scope) => {
      if (scope === 'admin_cms' || scope === 'all') {
        setCmsVersion((v) => v + 1);
      }
      if (scope === 'assignments' || scope === 'all') {
        setAssignmentsVersion((v) => v + 1);
      }
      if (scope === 'progress' || scope === 'all') {
        setProgressVersion((v) => v + 1);
      }
    });
  }, []);

  const progressMap = useMemo(() => {
    void progressVersion;
    return getStudentAdditionalProgressMap(userId);
  }, [userId, progressVersion]);

  const progressSummary = useMemo(() => {
    void progressVersion;
    return getStudentAdditionalProgressSummary(userId);
  }, [userId, progressVersion]);

  const activeChapterProgress = activeChapter ? progressMap[activeChapter.chapterId] : undefined;

  const classAssignments = useMemo(() => {
    void assignmentsVersion;
    return listTeacherAdditionalAssignments({ board, classLevel, medium });
  }, [board, classLevel, medium, assignmentsVersion]);

  const quizScore = useMemo(() => {
    if (!activeChapter) return 0;
    return activeChapter.materials.mcqQuiz.reduce((acc, q) => {
      return acc + (selectedMcqAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [activeChapter, selectedMcqAnswers]);

  const handleMarkNotesDone = () => {
    if (!activeChapter) return;
    markAdditionalNotesCompleted(userId, activeChapter, board, medium);
    setProgressVersion((v) => v + 1);
  };

  const handleMarkWorksheetDone = () => {
    if (!activeChapter) return;
    markAdditionalWorksheetCompleted(userId, activeChapter, board, medium);
    setProgressVersion((v) => v + 1);
  };

  const handleSubmitQuiz = () => {
    if (!activeChapter) return;
    setQuizSubmitted(true);
    recordAdditionalQuizAttempt(
      userId,
      activeChapter,
      board,
      medium,
      quizScore,
      activeChapter.materials.mcqQuiz.length
    );
    setProgressVersion((v) => v + 1);
  };

  const handleRetryQuiz = () => {
    setSelectedMcqAnswers({});
    setQuizSubmitted(false);
  };

  const handleAssignChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChapter) return;
    createTeacherAdditionalAssignment({
      teacherId: userId,
      teacherName: userName || 'Class Teacher',
      board,
      classLevel,
      medium,
      division: division.trim() || 'A',
      subjectId: activeChapter.subjectId,
      chapterId: activeChapter.chapterId,
      chapterTitle: activeChapter.title,
      dueDate,
      teacherNote: teacherNote.trim() || 'Complete study notes, practice worksheet, and 4-question quiz.',
    });
    setTeacherNote('');
    setAssignmentNotice(`Assigned "${activeChapter.title}" to ${classLevel} (${division.trim() || 'A'}) · ${board} (${medium}).`);
    setAssignmentsVersion((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{ADDITIONAL_CURRICULUM_LABEL}</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  Supplementary Enrichment Track · Classes 1–10
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 tabular-nums">
              <span>
                <strong className="text-slate-900">{progressSummary.notesCompletedCount}</strong> notes read
              </span>
              <span className="text-slate-300">·</span>
              <span>
                <strong className="text-slate-900">{progressSummary.worksheetsCompletedCount}</strong> worksheets done
              </span>
              <span className="text-slate-300">·</span>
              <span>
                <strong className="text-slate-900">{progressSummary.quizzesCompletedCount}</strong> quizzes ({progressSummary.averageQuizPercent}% avg)
              </span>
            </div>
          </div>

          {/* Official vs Supplementary Boundary Clarification */}
          <p className="mt-2 text-xs text-slate-500">
            Original supplementary enrichment by MyStudyZone (10 skill subjects across Maharashtra, CBSE &amp; ICSE). Strictly separate from verified official board textbooks and official board progress.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hierarchy Selector Bar: Board -> Class -> Medium */}
        <section className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                1. Board
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_ADDITIONAL_BOARDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBoardChange(b)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                      board === b
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="add-curr-class-select"
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5"
              >
                2. Class (1–10)
              </label>
              <select
                id="add-curr-class-select"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ALL_ADDITIONAL_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                3. Medium ({board})
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allowedMediums.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMedium(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                      medium === m
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Breadcrumb summary */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div>
              Hierarchy: <strong className="text-slate-800">{board}</strong> →{' '}
              <strong className="text-slate-800">{classLevel}</strong> →{' '}
              <strong className="text-slate-800">{medium}</strong>
              {activeSubject && (
                <>
                  {' '}→ <strong className="text-slate-800">{activeSubject.name}</strong>
                </>
              )}
              {activeChapter && (
                <>
                  {' '}→ <strong className="text-indigo-700">Ch. {activeChapter.chapterNumber}: {activeChapter.title}</strong>
                </>
              )}
            </div>
            <span className="font-medium text-slate-600 tabular-nums">
              {publishedSubjects.length} supplementary subjects available
            </span>
          </div>
        </section>

        {/* Active Teacher Assignments Notice (if any exist for this Board/Class/Medium) */}
        {classAssignments.length > 0 && (
          <section className="bg-indigo-50/70 border border-indigo-200 rounded-xl px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-950">
                <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  Teacher Supplementary Assignments for {classLevel} ({board} · {medium})
                </span>
              </div>
              <span className="text-xs text-indigo-700 tabular-nums">
                {classAssignments.filter((a) => a.status === 'ACTIVE').length} active
              </span>
            </div>
            <div className="mt-2 divide-y divide-indigo-100">
              {classAssignments.slice(0, 4).map((asn) => {
                const prog = progressMap[asn.chapterId];
                const completedTasks =
                  (prog?.notesCompleted ? 1 : 0) +
                  (prog?.worksheetCompleted ? 1 : 0) +
                  (prog?.quizCompleted ? 1 : 0);
                const isDoneByStudent = completedTasks === 3;
                const quizPct =
                  prog && prog.quizTotal > 0
                    ? Math.round((prog.bestQuizScore / prog.quizTotal) * 100)
                    : null;
                return (
                  <div key={asn.assignmentId} className="py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-900">
                    <div>
                      <span className="font-semibold">{asn.chapterTitle}</span>
                      <span className="text-indigo-400 mx-1.5">·</span>
                      <span>Div {asn.division}</span>
                      <span className="text-indigo-400 mx-1.5">·</span>
                      <span>Due {asn.dueDate}</span>
                      <span className="text-indigo-400 mx-1.5">·</span>
                      <span className={isDoneByStudent ? 'font-semibold text-emerald-700' : 'text-indigo-700 tabular-nums'}>
                        {isDoneByStudent
                          ? `Completed ✓${quizPct !== null ? ` (${quizPct}% quiz)` : ''}`
                          : `${completedTasks}/3 tasks done`}
                      </span>
                      {asn.teacherNote && (
                        <>
                          <span className="text-indigo-400 mx-1.5">·</span>
                          <span className="text-indigo-700">{asn.teacherNote}</span>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubjectId(asn.subjectId);
                        setSelectedChapterId(asn.chapterId);
                        setActiveTab(prog?.notesCompleted && !prog?.worksheetCompleted ? 'worksheet' : prog?.worksheetCompleted && !prog?.quizCompleted ? 'quiz' : 'notes');
                      }}
                      className="text-indigo-700 font-semibold hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isDoneByStudent ? 'Review Chapter' : 'Continue Assignment →'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Main 2-Column Workspace: Subject & Chapter Navigator + Learning Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Navigator (4 cols) */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                4. Additional Subjects ({publishedSubjects.length})
              </h2>
            </div>

            <div className="divide-y divide-slate-100 max-h-[340px] overflow-y-auto">
              {publishedSubjects.map((subj) => {
                const isSelected = activeSubject?.id === subj.id;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      isSelected ? 'bg-indigo-50/90' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                        {getLocalizedSubjectName(subj, medium)}
                      </span>
                      <span className="text-xs font-mono text-slate-400 shrink-0">{subj.code}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{subj.tagline}</p>
                  </button>
                );
              })}
            </div>

            {/* Chapter List for Active Subject + Class */}
            <div className="px-4 py-3 border-t border-b border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                5. {classLevel} Chapters ({chaptersForSelection.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {chaptersForSelection.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">
                  No published supplementary chapters match this selection yet.
                </div>
              ) : (
                chaptersForSelection.map((ch) => {
                  const isSelected = activeChapter?.chapterId === ch.chapterId;
                  const chProg = progressMap[ch.chapterId];
                  const doneCount =
                    (chProg?.notesCompleted ? 1 : 0) +
                    (chProg?.worksheetCompleted ? 1 : 0) +
                    (chProg?.quizCompleted ? 1 : 0);

                  return (
                    <button
                      key={ch.chapterId}
                      type="button"
                      onClick={() => setSelectedChapterId(ch.chapterId)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        isSelected ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className={`text-xs font-medium ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                            Chapter {ch.chapterNumber}
                          </div>
                          <div className="text-sm font-semibold leading-snug mt-0.5">
                            {getLocalizedChapterTitle(ch, medium)}
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium tabular-nums shrink-0 ${
                            doneCount === 3
                              ? isSelected
                                ? 'text-emerald-300'
                                : 'text-emerald-600'
                              : isSelected
                                ? 'text-slate-300'
                                : 'text-slate-400'
                          }`}
                        >
                          {doneCount}/3
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Right Learning Workspace (8 cols) */}
          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
            {!activeChapter ? (
              <div className="p-10 text-center text-slate-500 text-sm">
                Select a Board, Class, Medium, and Additional Subject to begin learning.
              </div>
            ) : (
              <>
                {/* Chapter Header */}
                <div className="px-6 py-5 border-b border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold uppercase tracking-wider text-indigo-700">
                      {ADDITIONAL_CURRICULUM_LABEL}
                    </span>
                    <span className="tabular-nums">
                      {board} · {activeChapter.classLevel} · {medium} · {activeChapter.materials.teacherGuidance.suggestedPeriods} periods
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    Ch. {activeChapter.chapterNumber}: {getLocalizedChapterTitle(activeChapter, medium)}
                  </h2>

                  {/* Quiet completion summary */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className={activeChapterProgress?.notesCompleted ? 'text-emerald-700 font-semibold' : ''}>
                      {activeChapterProgress?.notesCompleted ? '✓ Notes Completed' : '○ Notes Pending'}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className={activeChapterProgress?.worksheetCompleted ? 'text-emerald-700 font-semibold' : ''}>
                      {activeChapterProgress?.worksheetCompleted ? '✓ Worksheet Completed' : '○ Worksheet Pending'}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className={activeChapterProgress?.quizCompleted ? 'text-emerald-700 font-semibold tabular-nums' : ''}>
                      {activeChapterProgress?.quizCompleted
                        ? `✓ Quiz Best: ${activeChapterProgress.bestQuizScore}/${activeChapterProgress.quizTotal}`
                        : '○ Quiz Pending'}
                    </span>
                  </div>

                  {/* Workspace Segmented Navigation */}
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                    {(
                      [
                        { id: 'notes', label: 'Study Notes', icon: BookOpen },
                        { id: 'worksheet', label: 'Practice Worksheet', icon: FileText },
                        { id: 'quiz', label: `MCQ Quiz (${activeChapter.materials.mcqQuiz.length})`, icon: ClipboardCheck },
                        { id: 'revision', label: 'Short Answers & Revision', icon: HelpCircle },
                        {
                          id: 'teacher',
                          label: portalMode === 'teacher' ? 'Teacher Guide & Assign' : 'Teacher Guidance',
                          icon: GraduationCap,
                        },
                      ] as const
                    ).map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab 1: Study Notes, Objectives, Worked Examples & Hands-On Activity */}
                {activeTab === 'notes' && (
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Simple Concept Explanation
                      </h3>
                      <p className="text-base leading-relaxed text-slate-800">
                        {activeChapter.materials.simpleExplanation}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Learning Objectives
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-800">
                        {activeChapter.learningObjectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-xs font-semibold text-indigo-700 tabular-nums mt-0.5">
                              0{idx + 1}.
                            </span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-5 border-t border-slate-100">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Worked Examples
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeChapter.materials.workedExamples.map((ex, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-lg p-4">
                            <div className="text-sm font-semibold text-slate-900">{ex.title}</div>
                            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{ex.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-100">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Hands-On Classroom / Home Activity
                      </h3>
                      <div className="bg-indigo-50/60 rounded-lg p-4 space-y-2.5">
                        <div className="text-base font-semibold text-indigo-950">
                          {activeChapter.materials.handsOnActivity.title}
                        </div>
                        <div className="text-xs text-indigo-800">
                          <strong>Materials:</strong>{' '}
                          {activeChapter.materials.handsOnActivity.materialsNeeded.join(' · ')}
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-slate-800">
                          {activeChapter.materials.handsOnActivity.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleMarkNotesDone}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                          activeChapterProgress?.notesCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {activeChapterProgress?.notesCompleted
                          ? 'Notes Completed'
                          : 'Mark Study Notes Completed'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('worksheet')}
                        className="text-sm font-semibold text-indigo-700 hover:underline"
                      >
                        Continue to Practice Worksheet →
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Practice Worksheet */}
                {activeTab === 'worksheet' && (
                  <div className="p-6 space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {activeChapter.materials.practiceWorksheet.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                          Estimated time: {activeChapter.materials.practiceWorksheet.estimatedMinutes} min ·{' '}
                          {activeChapter.materials.practiceWorksheet.items.length} tasks
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowWorksheetAnswers((prev) => !prev)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                        >
                          {showWorksheetAnswers ? 'Hide Answer Key' : 'Show Answer Key'}
                        </button>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          Print
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600">
                      {activeChapter.materials.practiceWorksheet.instructions}
                    </p>

                    <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                      {activeChapter.materials.practiceWorksheet.items.map((item, idx) => (
                        <div key={item.id} className="py-4 space-y-2">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-sm font-medium text-slate-900">
                              <span className="font-bold text-indigo-700 mr-1.5 tabular-nums">
                                Q{idx + 1}.
                              </span>
                              {item.prompt}
                            </p>
                            <span className="text-xs uppercase tracking-wide text-slate-400 shrink-0">
                              {item.type.replace('_', ' ')}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={worksheetDrafts[item.id] || ''}
                            onChange={(e) =>
                              setWorksheetDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                            }
                            placeholder="Write your response here..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          {showWorksheetAnswers && (
                            <div className="text-xs text-emerald-800 bg-emerald-50 rounded-md px-3 py-2">
                              <strong>Answer Key:</strong> {item.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleMarkWorksheetDone}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                          activeChapterProgress?.worksheetCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {activeChapterProgress?.worksheetCompleted
                          ? 'Worksheet Completed'
                          : 'Mark Worksheet Completed'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('quiz')}
                        className="text-sm font-semibold text-indigo-700 hover:underline"
                      >
                        Take Chapter MCQ Quiz →
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 3: Interactive 4-Option MCQ Quiz */}
                {activeTab === 'quiz' && (
                  <div className="p-6 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          4-Option Conceptual MCQ Quiz
                        </h3>
                        <p className="text-xs text-slate-500">
                          All answers include clear explanations. Progress saves to your supplementary record.
                        </p>
                      </div>
                      {quizSubmitted && (
                        <div className="text-sm font-bold text-indigo-700 tabular-nums">
                          Score: {quizScore} / {activeChapter.materials.mcqQuiz.length} (
                          {Math.round((quizScore / activeChapter.materials.mcqQuiz.length) * 100)}%)
                        </div>
                      )}
                    </div>

                    <div className="space-y-5 divide-y divide-slate-100">
                      {activeChapter.materials.mcqQuiz.map((q, qIdx) => {
                        const chosen = selectedMcqAnswers[q.id];
                        return (
                          <div key={q.id} className={qIdx > 0 ? 'pt-5' : ''}>
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="text-sm font-semibold text-slate-900">
                                <span className="text-indigo-700 mr-1.5 tabular-nums">
                                  Q{qIdx + 1}.
                                </span>
                                {q.question}
                              </p>
                              <span className="text-xs text-slate-400 capitalize shrink-0">
                                {q.difficulty}
                              </span>
                            </div>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isPicked = chosen === optIdx;
                                const isCorrectOpt = optIdx === q.correctIndex;
                                let btnStyle =
                                  'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
                                if (!quizSubmitted && isPicked) {
                                  btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold';
                                } else if (quizSubmitted && isCorrectOpt) {
                                  btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                                } else if (quizSubmitted && isPicked && !isCorrectOpt) {
                                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled={quizSubmitted}
                                    onClick={() =>
                                      setSelectedMcqAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                                    }
                                    className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors ${btnStyle}`}
                                  >
                                    <span className="font-mono text-xs mr-2 opacity-70">
                                      {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <p className="mt-2.5 text-xs text-slate-700 bg-slate-50 rounded-md px-3 py-2">
                                <strong>Explanation:</strong> {q.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      {!quizSubmitted ? (
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          disabled={
                            Object.keys(selectedMcqAnswers).length <
                            activeChapter.materials.mcqQuiz.length
                          }
                          className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                        >
                          Submit Quiz &amp; Save Score
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRetryQuiz}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Retry Quiz
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveTab('revision')}
                        className="text-sm font-semibold text-indigo-700 hover:underline"
                      >
                        Short Answers &amp; Revision →
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 4: Short-Answer Questions & Revision Exercises */}
                {activeTab === 'revision' && (
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Short-Answer Questions &amp; Model Keys
                      </h3>
                      <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                        {activeChapter.materials.shortAnswerQuestions.map((sa, idx) => {
                          const isOpen = !!revealedShortAnswers[sa.id];
                          return (
                            <div key={sa.id} className="py-4">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <p className="text-sm font-semibold text-slate-900">
                                  <span className="text-indigo-700 mr-1.5 tabular-nums">
                                    Q{idx + 1}.
                                  </span>
                                  {sa.question}
                                </p>
                                <span className="text-xs text-slate-400 tabular-nums shrink-0">
                                  {sa.marks} marks
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
                                className="mt-2 text-xs font-semibold text-indigo-700 hover:underline"
                              >
                                {isOpen ? 'Hide Model Answer' : 'Show Model Answer'}
                              </button>
                              {isOpen && (
                                <p className="mt-2 text-sm text-emerald-900 bg-emerald-50 rounded-md px-3 py-2 leading-relaxed">
                                  {sa.modelAnswer}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Revision &amp; Reflection Prompts
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-800">
                        {activeChapter.materials.revisionExercises.map((prompt, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {prompt}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {/* Tab 5: Teacher Guidance & Supplementary Assignment Console */}
                {activeTab === 'teacher' && (
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        <span>Classroom Delivery Guidance</span>
                      </div>
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-xs font-semibold uppercase text-slate-500">
                            Suggested Teaching Periods
                          </dt>
                          <dd className="mt-1 font-bold text-slate-900 tabular-nums">
                            {activeChapter.materials.teacherGuidance.suggestedPeriods} classroom periods
                          </dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-xs font-semibold uppercase text-slate-500">
                            Classroom Strategy
                          </dt>
                          <dd className="mt-1 text-slate-800">
                            {activeChapter.materials.teacherGuidance.classroomStrategy}
                          </dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-xs font-semibold uppercase text-slate-500">
                            Differentiation Tip
                          </dt>
                          <dd className="mt-1 text-slate-800">
                            {activeChapter.materials.teacherGuidance.differentiationTip}
                          </dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-xs font-semibold uppercase text-slate-500">
                            Assessment Cue
                          </dt>
                          <dd className="mt-1 text-slate-800">
                            {activeChapter.materials.teacherGuidance.assessmentCue}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Assign Chapter to Students Form */}
                    <div className="pt-5 border-t border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-1">
                        Assign This Supplementary Chapter to a Class
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Assignments stay strictly inside {ADDITIONAL_CURRICULUM_LABEL} and never alter official board lesson plans.
                      </p>

                      <form onSubmit={handleAssignChapter} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Division / Batch
                          </label>
                          <input
                            type="text"
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                            maxLength={12}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Target Due Date
                          </label>
                          <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="submit"
                            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 whitespace-nowrap shrink-0"
                          >
                            Assign Chapter
                          </button>
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Instruction Note for Students
                          </label>
                          <input
                            type="text"
                            value={teacherNote}
                            onChange={(e) => setTeacherNote(e.target.value)}
                            placeholder="e.g., Complete the hands-on activity and submit the 4-question MCQ quiz."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </form>

                      {assignmentNotice && (
                        <p className="mt-3 text-xs font-medium text-emerald-700">
                          ✓ {assignmentNotice}
                        </p>
                      )}
                    </div>

                    {/* Assigned List for this Class */}
                    {classAssignments.length > 0 && (
                      <div className="pt-5 border-t border-slate-200">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                          Assigned Supplementary Chapters ({classLevel} · {board} · {medium})
                        </h4>
                        <div className="divide-y divide-slate-100">
                          {classAssignments.map((asn) => (
                            <div
                              key={asn.assignmentId}
                              className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm"
                            >
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-900">
                                  {asn.chapterTitle}{' '}
                                  <span className="text-xs font-normal text-slate-500">
                                    · Div {asn.division} · Due {asn.dueDate}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">{asn.teacherNote}</div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleTeacherAssignmentStatus(asn.assignmentId);
                                    setAssignmentsVersion((v) => v + 1);
                                  }}
                                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                    asn.status === 'COMPLETED'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  }`}
                                >
                                  {asn.status === 'COMPLETED' ? 'Completed' : 'Mark Done'}
                                </button>
                                <button
                                  type="button"
                                  aria-label="Delete assignment"
                                  onClick={() => {
                                    deleteTeacherAdditionalAssignment(asn.assignmentId);
                                    setAssignmentsVersion((v) => v + 1);
                                  }}
                                  className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdditionalCurriculumView;
