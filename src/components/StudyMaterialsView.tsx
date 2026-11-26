import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  Bookmark,
  ExternalLink,
  HelpCircle,
  Zap,
  Library,
  Search,
  Clock,
  ClipboardList,
  Award,
  Archive,
  PlayCircle,
  RotateCcw,
  Calculator,
  FlaskConical,
  Languages,
  Trophy,
  Printer,
  Globe,
} from 'lucide-react';
import { StudyLibrarySpecialHubs } from './StudyLibrarySpecialHubs';
import {
  QuickStudyZoneIconBar,
  SubjectMaterialSequenceBar,
  type QuickLearningNavId,
} from './OneLineIconNavBar';
import {
  GlobalSearchJumpTarget,
  StudyLibraryGlobalSearch,
} from './StudyLibraryGlobalSearch';
import {
  printChapterStudySheetA4,
  printExamPaperA4,
} from '../utils/studyMaterialPdfExporter';
import {
  getAvailableMediumsForBoard,
  loadPaginatedStudyLibraryItemsFromFirestore,
  SpecialContentDocument,
  StudyLibraryDynamicItemPayload,
  StudyMedium,
} from '../services/specialContentFirestoreService';
import { useApp } from '../context/AppContext';
import { ChapterQAFormat, ClassLevel, EducationBoard, SubjectName } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta,
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { getOfficialTextbooksForBoardClass } from '../data/studyLibrary/textbookLibraryData';
import { getChapterPracticeTest } from '../data/studyLibrary/chapterTestsData';
import { getExamPapersForSubject } from '../data/studyLibrary/examPapersData';
import { getVideoLessonsForSubject } from '../data/studyLibrary/videoLessonsData';
import {
  getEffectiveSyllabusForConsumer,
  getSyllabusStatusPresentation,
} from '../services/centralSyllabusService';
import {
  resolveAdditionalSubjectForBlockedEntry,
  resolveInlineAdditionalCurriculumFallback,
} from '../services/additionalCurriculumService';
import { ADDITIONAL_CURRICULUM_LABEL } from '../types/additionalCurriculum';
import { InlineAdditionalSubjectPanel } from './InlineAdditionalSubjectPanel';
import {
  formatStandardOrdinal,
  normalizeBoardValue,
} from '../utils/subscriptionAccess';
import {
  CHAPTER_WORKFLOW_STEPS,
  ChapterTestLocalResult,
  ChapterWorkflowProgressMap,
  ChapterWorkflowStepId,
  getChapterTestLocalResults,
  getChapterWorkflowProgressMap,
  getNotebookWrittenItemsMap,
  getStudyLibraryBookmarks,
  getStudyLibraryChecklistState,
  getStudyLibraryRecentItems,
  recordStudyLibraryRecentView,
  saveChapterTestLocalResult,
  StudyLibraryBookmarkItem,
  StudyLibraryRecentItem,
  toggleChapterWorkflowStep,
  toggleNotebookWrittenExerciseItem,
  toggleStudyLibraryBookmark,
  toggleStudyLibraryChecklistItem,
} from '../utils/studyLibraryLocalStore';
import { evaluateChapterCompleteness } from '../data/notes/chapterNotebookAndSolutionsBuilder';
import {
  fetchExternalChapterBundle,
  mergeExternalVerifiedChapters,
  type ExternalChapterBundlePayload,
} from '../services/studyContentDeliveryService';

export type StudyLibrarySectionTab =
  | 'textbooks'
  | 'chapter_notes'
  | 'textbook_solutions'
  | 'class_notebook'
  | 'qa_bank'
  | 'word_meanings'
  | 'practice_questions'
  | 'short_revision'
  | 'worksheets_ref'
  | 'chapter_test'
  | 'model_papers'
  | 'pyq_papers'
  | 'video_lessons'
  | 'math_hub'
  | 'science_diagrams'
  | 'english_grammar'
  | 'scholarship_olympiad';

interface StudyMaterialsViewProps {
  initialBoard?: EducationBoard;
  initialClass?: ClassLevel;
  initialSubject?: SubjectName;
  initialSectionTab?: StudyLibrarySectionTab;
  onNavigateTab: (tab: string, subjectParam?: SubjectName) => void;
  onOpenMembership?: (
    plan?: 'basic' | 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard
  ) => void;
  onOpenAdditionalCurriculum?: (ctx: {
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: InstructionMedium;
    subjectId?: string;
  }) => void;
}

const QA_FORMAT_FILTERS: { id: 'all' | ChapterQAFormat; label: string }[] = [
  { id: 'all', label: 'All 9 Formats' },
  { id: 'very_short', label: '1. Very Short (1M)' },
  { id: 'short_answer', label: '2. Short Answer (2M)' },
  { id: 'long_answer', label: '3. Long Answer (4M)' },
  { id: 'textbook_exercise', label: '4. Textbook Exercise' },
  { id: 'give_reason', label: '5. Give Reasons' },
  { id: 'distinguish_between', label: '6. Distinguish Between' },
  { id: 'explain_concept', label: '7. Explain Concept' },
  { id: 'fill_in_blanks', label: '8. Fill in Blanks' },
  { id: 'match_and_true_false', label: '9. Match & True/False' },
];

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  initialBoard,
  initialClass,
  initialSubject,
  initialSectionTab,
  onNavigateTab,
  onOpenAdditionalCurriculum,
}) => {
  const { currentStudent, activeBoard, updateStudentMedium } = useApp();

  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(
    normalizeBoardValue(initialBoard || activeBoard || 'Maharashtra')
  );
  const availableMediums = useMemo(
    () => getAvailableMediumsForBoard(selectedBoard),
    [selectedBoard]
  );
  const [selectedMedium, setSelectedMedium] = useState<Exclude<StudyMedium, 'All Mediums'>>(() => {
    if (currentStudent?.medium) return currentStudent.medium;
    return 'English';
  });

  useEffect(() => {
    if (currentStudent?.medium && availableMediums.includes(currentStudent.medium)) {
      setSelectedMedium(currentStudent.medium);
    }
  }, [currentStudent?.id, currentStudent?.medium, availableMediums]);

  useEffect(() => {
    if (!availableMediums.includes(selectedMedium)) {
      setSelectedMedium(availableMediums[0] || 'English');
    }
  }, [availableMediums, selectedMedium]);

  const [selectedClass, setSelectedClass] = useState<ClassLevel>(
    initialClass || currentStudent?.classLevel || 'Class 5'
  );
  const [activeSectionTab, setActiveSectionTab] = useState<StudyLibrarySectionTab>(
    initialSectionTab || 'textbooks'
  );
  const [qaFormatFilter, setQaFormatFilter] = useState<'all' | ChapterQAFormat>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [pendingChapterNumber, setPendingChapterNumber] = useState<number | null>(null);
  const [dynamicAdminItems, setDynamicAdminItems] = useState<
    SpecialContentDocument<StudyLibraryDynamicItemPayload>[]
  >([]);

  useEffect(() => {
    if (initialSectionTab) {
      setActiveSectionTab(initialSectionTab);
    }
  }, [initialSectionTab]);

  // Spark-optimized version-gated Firestore dynamic overlay (0 reads when studyLibraryVersion === 0 or cached)
  useEffect(() => {
    let active = true;
    loadPaginatedStudyLibraryItemsFromFirestore({
      board: selectedBoard,
      medium: selectedMedium,
      classLevel: selectedClass,
      pageSize: 25,
    })
      .then((items) => {
        if (active) setDynamicAdminItems(items);
      })
      .catch(() => {
        if (active) setDynamicAdminItems([]);
      });
    return () => {
      active = false;
    };
  }, [selectedBoard, selectedMedium, selectedClass]);

  // Zero-Firestore-Write LocalStorage Bookmarks, Recent Views & Revision Checklists
  const [bookmarks, setBookmarks] = useState<StudyLibraryBookmarkItem[]>(() =>
    getStudyLibraryBookmarks()
  );
  const [recentItems, setRecentItems] = useState<StudyLibraryRecentItem[]>(() =>
    getStudyLibraryRecentItems()
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() =>
    getStudyLibraryChecklistState()
  );
  const [chapterTestBestResults, setChapterTestBestResults] = useState<
    Record<string, ChapterTestLocalResult>
  >(() => getChapterTestLocalResults());

  // Interactive Chapter Test State
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);

  // Interactive Exam Papers & PYQ Answer Toggle State
  const [selectedModelPaperIdx, setSelectedModelPaperIdx] = useState<number>(0);
  const [selectedPyqPaperIdx, setSelectedPyqPaperIdx] = useState<number>(0);
  const [paperSearchQuery, setPaperSearchQuery] = useState<string>('');
  const [revealedPaperAnswers, setRevealedPaperAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialBoard) {
      setSelectedBoard(normalizeBoardValue(initialBoard));
    } else if (currentStudent?.board) {
      setSelectedBoard(normalizeBoardValue(currentStudent.board));
    }
    if (initialClass) {
      setSelectedClass(initialClass);
    } else if (currentStudent?.classLevel) {
      setSelectedClass(currentStudent.classLevel);
    }
  }, [
    currentStudent?.id,
    currentStudent?.board,
    currentStudent?.classLevel,
    initialBoard,
    initialClass,
  ]);

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

  const effectiveMedium = selectedMedium as InstructionMedium;

  const syllabusResolution = useMemo(
    () =>
      getEffectiveSyllabusForConsumer({
        board: selectedBoard,
        classLevel: selectedClass,
        subject: selectedSubject,
        medium: effectiveMedium,
      }),
    [selectedBoard, selectedClass, selectedSubject, effectiveMedium]
  );

  const [externalChapterBundle, setExternalChapterBundle] =
    useState<ExternalChapterBundlePayload | null>(null);

  useEffect(() => {
    let active = true;
    setExternalChapterBundle(null);
    fetchExternalChapterBundle({
      board: selectedBoard,
      classLevel: selectedClass,
      subject: selectedSubject,
      medium: effectiveMedium,
    })
      .then((bundle) => {
        if (active) setExternalChapterBundle(bundle);
      })
      .catch(() => {
        if (active) setExternalChapterBundle(null);
      });
    return () => {
      active = false;
    };
  }, [selectedBoard, selectedClass, selectedSubject, effectiveMedium]);

  const baseChapters = useMemo(
    () =>
      getStudyMaterialsForSubject(
        selectedBoard,
        selectedClass,
        selectedSubject,
        effectiveMedium
      ),
    [selectedBoard, selectedClass, selectedSubject, effectiveMedium]
  );

  const chapters = useMemo(
    () => mergeExternalVerifiedChapters(baseChapters, externalChapterBundle),
    [baseChapters, externalChapterBundle]
  );

  const inlineAdditional = useMemo(
    () =>
      chapters.length === 0
        ? resolveInlineAdditionalCurriculumFallback({
            board: selectedBoard,
            classLevel: selectedClass,
            subject: selectedSubject,
            medium: effectiveMedium,
          })
        : null,
    [chapters.length, selectedBoard, selectedClass, selectedSubject, effectiveMedium]
  );

  const boardClassTextbooks = useMemo(
    () =>
      getOfficialTextbooksForBoardClass(
        selectedBoard,
        selectedClass,
        effectiveMedium
      ),
    [selectedBoard, selectedClass, effectiveMedium]
  );

  const examPapersBundle = useMemo(
    () =>
      getExamPapersForSubject(
        selectedBoard,
        selectedClass,
        selectedSubject,
        effectiveMedium
      ),
    [selectedBoard, selectedClass, selectedSubject, effectiveMedium]
  );

  const videoLessons = useMemo(
    () =>
      getVideoLessonsForSubject(
        selectedBoard,
        selectedClass,
        selectedSubject,
        effectiveMedium
      ),
    [selectedBoard, selectedClass, selectedSubject, effectiveMedium]
  );

  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedQaAnswers, setRevealedQaAnswers] = useState<Record<string, boolean>>({});
  const [revealedTextbookAnswers, setRevealedTextbookAnswers] = useState<Record<string, boolean>>({});
  const [revealedPracticeAnswers, setRevealedPracticeAnswers] = useState<Record<string, boolean>>({});
  const [showNotebookAnswerKeySection, setShowNotebookAnswerKeySection] = useState<boolean>(false);
  const [revealedNotebookItemKey, setRevealedNotebookItemKey] = useState<Record<string, boolean>>({});
  const [inChapterSearchQuery, setInChapterSearchQuery] = useState<string>('');
  const [workflowProgressMap, setWorkflowProgressMap] = useState<ChapterWorkflowProgressMap>(() =>
    getChapterWorkflowProgressMap()
  );
  const [notebookWrittenItems, setNotebookWrittenItems] = useState<Record<string, boolean>>(() =>
    getNotebookWrittenItemsMap()
  );

  useEffect(() => {
    if (chapters.length > 0) {
      if (pendingChapterNumber && pendingChapterNumber > 0) {
        setSelectedChapterIdx(Math.max(0, pendingChapterNumber - 1));
        setPendingChapterNumber(null);
      } else {
        setSelectedChapterIdx(0);
      }
    } else {
      setSelectedChapterIdx(0);
    }
    setSelectedModelPaperIdx(0);
    setSelectedPyqPaperIdx(0);
    setPaperSearchQuery('');
    setRevealedSolutions({});
    setRevealedQaAnswers({});
    setRevealedTextbookAnswers({});
    setRevealedPracticeAnswers({});
    setShowNotebookAnswerKeySection(false);
    setRevealedNotebookItemKey({});
    setInChapterSearchQuery('');
    setRevealedPaperAnswers({});
    setTestAnswers({});
    setTestSubmitted(false);
  }, [selectedBoard, selectedClass, selectedSubject, chapters.length]);

  // If a subject has 0 verified chapters AND no inline supplementary curriculum,
  // ensure no empty chapter-dependent tab remains selected.
  useEffect(() => {
    if (
      chapters.length === 0 &&
      !inlineAdditional &&
      activeSectionTab !== 'textbooks' &&
      activeSectionTab !== 'math_hub' &&
      activeSectionTab !== 'science_diagrams' &&
      activeSectionTab !== 'english_grammar' &&
      activeSectionTab !== 'scholarship_olympiad'
    ) {
      setActiveSectionTab('textbooks');
    }
  }, [chapters.length, inlineAdditional, activeSectionTab]);

  const handleGlobalSearchJump = (target: GlobalSearchJumpTarget) => {
    if (target.board) setSelectedBoard(target.board);
    if (target.classLevel) setSelectedClass(target.classLevel);
    if (target.subject) setSelectedSubject(target.subject);
    if (target.chapterNumber) {
      setPendingChapterNumber(target.chapterNumber);
      setSelectedChapterIdx(Math.max(0, target.chapterNumber - 1));
    }
    setActiveSectionTab(target.tab);
  };

  useEffect(() => {
    setTestAnswers({});
    setTestSubmitted(false);
    setShowNotebookAnswerKeySection(false);
    setRevealedNotebookItemKey({});
    setInChapterSearchQuery('');
  }, [selectedChapterIdx]);

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter(
      (c) =>
        c.chapterTitle.toLowerCase().includes(q) ||
        c.overview.toLowerCase().includes(q) ||
        c.keyPoints.some((pt) => pt.toLowerCase().includes(q))
    );
  }, [chapters, searchQuery]);

  const activeChapter = chapters[selectedChapterIdx] || chapters[0];
  const boardMeta = getEducationBoardMeta(selectedBoard);
  const subjectMeta = getSubjectMeta(selectedSubject, selectedBoard);
  const activeTextbook = activeChapter?.officialTextbook;

  const activeChapterTest = useMemo(() => {
    if (!activeChapter) return null;
    return getChapterPracticeTest(
      selectedBoard,
      selectedClass,
      selectedSubject,
      activeChapter.chapterNumber,
      activeChapter.chapterTitle,
      effectiveMedium
    );
  }, [
    selectedBoard,
    selectedClass,
    selectedSubject,
    activeChapter?.chapterNumber,
    activeChapter?.chapterTitle,
    effectiveMedium,
  ]);

  const activeVideoLesson = useMemo(() => {
    if (!activeChapter) return videoLessons[0] || null;
    return (
      videoLessons.find((v) => v.chapterNumber === activeChapter.chapterNumber) ||
      videoLessons[0] ||
      null
    );
  }, [videoLessons, activeChapter?.chapterNumber]);

  const testScoreSummary = useMemo(() => {
    if (!activeChapterTest) return { correct: 0, answered: 0, total: 0, percentage: 0 };
    let correct = 0;
    let answered = 0;
    for (const q of activeChapterTest.questions) {
      const sel = testAnswers[q.id];
      if (typeof sel === 'number') {
        answered++;
        if (sel === q.correctIndex) correct++;
      }
    }
    const total = activeChapterTest.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, answered, total, percentage };
  }, [activeChapterTest, testAnswers]);

  const handleSubmitChapterTest = () => {
    if (!activeChapterTest) return;
    setTestSubmitted(true);
    const updated = saveChapterTestLocalResult(
      activeChapterTest.id,
      testScoreSummary.correct,
      activeChapterTest.questions.length
    );
    setChapterTestBestResults(updated);
  };

  const handleRetryChapterTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
  };

  // Record recently viewed chapter locally (0 Firestore writes)
  useEffect(() => {
    if (!activeChapter) return;
    const updated = recordStudyLibraryRecentView({
      id: activeChapter.id,
      title: `Ch ${activeChapter.chapterNumber}: ${activeChapter.chapterTitle}`,
      board: selectedBoard,
      classLevel: selectedClass,
      subject: selectedSubject,
      category: activeSectionTab,
      chapterNumber: activeChapter.chapterNumber,
    });
    setRecentItems(updated);
  }, [
    activeChapter?.id,
    selectedBoard,
    selectedClass,
    selectedSubject,
    activeSectionTab,
  ]);

  const isCurrentBookmarked = useMemo(
    () => Boolean(activeChapter && bookmarks.some((b) => b.id === activeChapter.id)),
    [activeChapter, bookmarks]
  );

  const handleToggleBookmark = () => {
    if (!activeChapter) return;
    const result = toggleStudyLibraryBookmark({
      id: activeChapter.id,
      title: `Ch ${activeChapter.chapterNumber}: ${activeChapter.chapterTitle}`,
      board: selectedBoard,
      classLevel: selectedClass,
      subject: selectedSubject,
      category: activeSectionTab,
      chapterNumber: activeChapter.chapterNumber,
    });
    setBookmarks(result.bookmarks);
  };

  const handleToggleChecklist = (chkKey: string) => {
    const next = toggleStudyLibraryChecklistItem(chkKey);
    setCheckedItems(next);
  };

  const filteredQaBank = useMemo(() => {
    const list = activeChapter?.qaBank || [];
    if (qaFormatFilter === 'all') return list;
    return list.filter((item) => item.format === qaFormatFilter);
  }, [activeChapter?.qaBank, qaFormatFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 font-bold">
                100% FREE STUDY MATERIAL LIBRARY
              </span>
              <span>{boardMeta.fullName}</span>
              <span aria-hidden="true">·</span>
              <span>
                Standard {formatStandardOrdinal(selectedClass)} ({selectedClass})
              </span>
              <span aria-hidden="true">·</span>
              <span>{subjects.length} Syllabus Subjects</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white [text-wrap:balance]">
              Textbooks, Chapter Notes, Online Tests, Model Papers, PYQs &amp; Video Lessons
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete chapter-wise syllabus library for{' '}
              <strong className="text-white">{selectedBoard} Board</strong> (
              <strong className="text-white">{selectedClass}</strong>). Official textbook portals,
              chapter notes, 1-page revision sheets, 9-format Q&amp;A banks, interactive chapter tests,
              model &amp; previous year papers, and educational video lessons are{' '}
              <strong className="text-emerald-300">100% Free for all students</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsGlobalSearchOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Global Search (All Boards)</span>
            </button>
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
          </div>
        </div>
      </section>

      {/* Global Cross-Library Search Modal (0 Firestore Reads) */}
      <StudyLibraryGlobalSearch
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        defaultBoard={selectedBoard}
        defaultClass={selectedClass}
        onJumpToResult={handleGlobalSearchJump}
      />

      {/* Icon-Based One-Line Quick Navigation Bar across all learning material types */}
      <QuickStudyZoneIconBar
        activeItem={
          activeSectionTab === 'textbooks' || activeSectionTab === 'video_lessons'
            ? 'chapters'
            : activeSectionTab === 'chapter_notes' || activeSectionTab === 'short_revision'
            ? 'notes'
            : activeSectionTab === 'worksheets_ref'
            ? 'worksheets'
            : activeSectionTab === 'qa_bank'
            ? 'practice_questions'
            : activeSectionTab === 'chapter_test'
            ? 'mcqs'
            : activeSectionTab === 'model_papers'
            ? 'tests'
            : activeSectionTab === 'pyq_papers'
            ? 'previous_papers'
            : 'results'
        }
        board={selectedBoard}
        classLevel={selectedClass}
        subject={selectedSubject}
        counts={{
          subjects: subjects.length,
          chapters: chapters.length,
          notes: chapters.length,
          mcqs: chapters.length > 0 ? 10 : 0,
          tests: examPapersBundle.modelPapers.length,
          previousPapers: examPapersBundle.pyqPapers.length,
        }}
        onNavigate={(target: QuickLearningNavId, studyTab?: StudyLibrarySectionTab) => {
          if (target === 'subjects') {
            onNavigateTab('all-courses', selectedSubject);
          } else if (target === 'worksheets') {
            onNavigateTab('worksheets', selectedSubject);
          } else if (target === 'mcqs') {
            if (chapters.length > 0 || inlineAdditional) setActiveSectionTab('chapter_test');
            else onNavigateTab('quizzes', selectedSubject);
          } else if (target === 'results') {
            setActiveSectionTab('math_hub');
          } else if (target === 'additional_curriculum') {
            if (onOpenAdditionalCurriculum) {
              onOpenAdditionalCurriculum({
                board: selectedBoard,
                classLevel: selectedClass,
                medium: effectiveMedium,
              });
            } else {
              onNavigateTab('additional-curriculum');
            }
          } else if (studyTab) {
            setActiveSectionTab(studyTab);
          }
        }}
      />

      {/* =====================================================================
          STRICT ACADEMIC HIERARCHY CONTROLS (PARTS 4, 5 & 6):
          1. Board -> 2. Medium -> 3. Class (1-10) -> 4. Subject -> 5. Chapter
          -> 6. Sequential Material Type Tabs -> Selected Content IMMEDIATELY Below
          ===================================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* STEP 1: BOARD SELECTION */}
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
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    {b.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: MEDIUM SELECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            <Languages className="w-4 h-4 text-emerald-600" />
            <span>2. Select Medium ({selectedBoard} Board)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {availableMediums.map((med) => {
              const isSelected = selectedMedium === med;
              return (
                <button
                  key={med}
                  type="button"
                  onClick={() => {
                    setSelectedMedium(med);
                    updateStudentMedium(med as InstructionMedium);
                  }}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {med} Medium
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: CLASS SELECTION (ASCENDING 1 TO 10) */}
        <div className="space-y-2 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              3. Select Standard (Class 1 to Class 10)
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {chapters.length > 0
                ? `All ${chapters.length} Chapters Unlocked Free · ${selectedBoard} · ${selectedMedium} Medium · ${selectedClass}`
                : inlineAdditional
                ? `Supplementary Curriculum Ready · ${inlineAdditional.chapters.length} Modules · ${selectedBoard} · ${selectedMedium} Medium · ${selectedClass}`
                : `${getSyllabusStatusPresentation(syllabusResolution).badgeLabel} · ${selectedBoard} · ${selectedMedium} Medium · ${selectedClass}`}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_10_CLASSES_META.map((meta) => {
              const isSelected = selectedClass === meta.classLevel;
              return (
                <button
                  key={meta.classLevel}
                  type="button"
                  onClick={() => setSelectedClass(meta.classLevel)}
                  className={`px-2.5 py-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  <span className="block font-black tabular-nums">{meta.shortLabel}</span>
                  <span
                    className={`text-[10px] block ${
                      isSelected ? 'text-indigo-100' : 'text-emerald-700'
                    }`}
                  >
                    100% Free
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: SUBJECT SELECTION */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              4. Select Subject ({subjects.length} Subjects for {selectedBoard} · {selectedClass})
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Active Subject: <strong className="text-slate-900">{selectedSubject}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subjects.map((sub) => {
              const sMeta = getSubjectMeta(sub, selectedBoard);
              const active = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  <span>{sMeta.icon}</span>
                  <span>{sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PROMINENT CLASS-WISE EXERCISE NOTES & NOTEBOOK QUICK-LAUNCH BAR
          ===================================================================== */}
      {chapters.length > 0 && (
        <section className="bg-gradient-to-r from-[#0f2952] via-[#17396e] to-[#1e3a8a] text-white rounded-2xl p-4 border-2 border-amber-300/80 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                <span>✨ NEW · Class-Wise Exercise Notes &amp; School Notebook System</span>
              </div>
              <h3 className="text-sm sm:text-base font-display font-black text-white mt-1">
                {selectedBoard} · {selectedClass} · {selectedSubject} — Chapter {activeChapter ? `${String(activeChapter.chapterNumber).padStart(2, '0')}: ${activeChapter.chapterTitle}` : ''}
              </h3>
              <p className="text-[11px] text-sky-100">
                Click any button below to open full chapter Study Notes (Sections A–L), Solved Textbook Exercise Answers, or Complete Your School Class Notebook Exercises:
              </p>
            </div>
            {chapters.length > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                <label htmlFor="quick-banner-chapter-select" className="text-[11px] font-bold text-amber-200 whitespace-nowrap">
                  Jump to Chapter:
                </label>
                <select
                  id="quick-banner-chapter-select"
                  value={selectedChapterIdx}
                  onChange={(e) => setSelectedChapterIdx(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs border-2 border-amber-300 max-w-[230px] cursor-pointer"
                >
                  {chapters.map((ch, idx) => (
                    <option key={ch.id} value={idx}>
                      Ch {String(ch.chapterNumber).padStart(2, '0')}: {ch.chapterTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[
              {
                id: 'chapter_notes' as StudyLibrarySectionTab,
                icon: '📄',
                title: '1. Study Notes (A–L)',
                sub: 'Topic explanations, formulas & memory tricks',
                badge: 'Complete A–L',
              },
              {
                id: 'textbook_solutions' as StudyLibrarySectionTab,
                icon: '📘',
                title: '2. Textbook Solutions',
                sub: 'All end-of-chapter exercise answers solved',
                badge: `${activeChapter?.textbookExerciseSolutions?.length || 9} Solved Qs`,
              },
              {
                id: 'class_notebook' as StudyLibrarySectionTab,
                icon: '📓',
                title: '3. Complete Class Notes',
                sub: 'School notebook exercises + hidden answer key',
                badge: `${activeChapter?.classNotebookExercises?.length || 10} Notebook Tasks`,
              },
              {
                id: 'word_meanings' as StudyLibrarySectionTab,
                icon: '🔤',
                title: '4. Word Meanings',
                sub: 'Key terms, definitions & sentence usage',
                badge: `${activeChapter?.difficultWordsAndMeanings?.length || 8} Terms`,
              },
              {
                id: 'practice_questions' as StudyLibrarySectionTab,
                icon: '✍️',
                title: '5. Extra Practice Q&A',
                sub: 'Exam-oriented extra questions & HOTS',
                badge: 'Exam Ready',
              },
            ].map((item) => {
              const isCurrent = activeSectionTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSectionTab(item.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-white shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-black flex items-center gap-1">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                        isCurrent
                          ? 'bg-[#0f2952] text-amber-200'
                          : 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-snug ${isCurrent ? 'text-slate-800 font-semibold' : 'text-sky-100'}`}>
                    {item.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          TWO-LEVEL HORIZONTAL MATERIAL TABS & SUBSECTIONS
          ROW 1: All Material Type Tabs together in ONE horizontal row
          ROW 2: Selected Material Type's horizontal subsections directly below Row 1
          AREA 3: Selected Subsection's complete materials immediately below Row 2
          ===================================================================== */}
      {(() => {
        const isSpecialHubTab =
          activeSectionTab === 'math_hub' ||
          activeSectionTab === 'science_diagrams' ||
          activeSectionTab === 'english_grammar' ||
          activeSectionTab === 'scholarship_olympiad';

        return (
          <section className="bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-hidden">
            {/* FIRST ROW — 10-STEP STRUCTURED SUBJECT LEARNING SEQUENCE (ONE-LINE ICON NAVIGATION) */}
            <SubjectMaterialSequenceBar
              activeTab={activeSectionTab}
              onSelectTab={(nextTab) => setActiveSectionTab(nextTab)}
              counts={{
                hasChapters: chapters.length > 0,
                chaptersCount: chapters.length,
                textbooksCount: boardClassTextbooks.length,
                videosCount: videoLessons.length,
                modelPapersCount: examPapersBundle.modelPapers.length,
                pyqPapersCount: examPapersBundle.pyqPapers.length,
              }}
              subjectName={selectedSubject}
              boardLabel={`${selectedBoard} Board`}
              classLabel={selectedClass}
              mediumLabel={`${selectedMedium} Medium`}
            />

            {/* SECOND ROW — ONLY THE SELECTED MATERIAL SECTION'S SUBSECTIONS (HORIZONTAL, STRICTLY BELOW ROW 1) */}
            <div className="bg-sky-50/60 border-b-2 border-slate-200 px-3.5 sm:px-4 py-3 space-y-2">
              {/* Subsections for Textbooks & Worksheets (or Inline Supplementary Subject): Subject Horizontal Row */}
              {(activeSectionTab === 'textbooks' ||
                activeSectionTab === 'worksheets_ref' ||
                (Boolean(inlineAdditional) && chapters.length === 0 && !isSpecialHubTab)) && (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                      {activeSectionTab === 'textbooks'
                        ? `Subject Textbooks (${boardClassTextbooks.length} Official Books)`
                        : inlineAdditional && chapters.length === 0
                        ? `Class Subjects (${subjects.length} Subjects · Supplementary Modules Active)`
                        : `Subject Worksheets (${subjects.length} Subjects)`}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      Selected: {selectedSubject}
                    </span>
                  </div>
                  <div
                    role="tablist"
                    aria-label="Subject Subsections"
                    className="flex items-center gap-2 overflow-x-auto pb-1"
                  >
                    {subjects.map((sub) => {
                      const sMeta = getSubjectMeta(sub, selectedBoard);
                      const isSel = selectedSubject === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          role="tab"
                          aria-selected={isSel}
                          onClick={() => setSelectedSubject(sub)}
                          className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            isSel
                              ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                          }`}
                        >
                          <span>{sMeta.icon}</span>
                          <span>{sub}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Subsections for Chapter-Based Tabs (Notes, Textbook Solutions, Class Notebook, Word Meanings, Practice Qs, Short Revision, Chapter Test, Video Lessons): Horizontal Chapters Row */}
              {!(Boolean(inlineAdditional) && chapters.length === 0) &&
                (activeSectionTab === 'chapter_notes' ||
                  activeSectionTab === 'textbook_solutions' ||
                  activeSectionTab === 'class_notebook' ||
                  activeSectionTab === 'word_meanings' ||
                  activeSectionTab === 'practice_questions' ||
                  activeSectionTab === 'short_revision' ||
                  activeSectionTab === 'chapter_test' ||
                  activeSectionTab === 'video_lessons') && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                      Chapters in Textbook Sequence ({filteredChapters.length} of {chapters.length} Units)
                    </span>
                    <div className="relative min-w-[210px]">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter chapters..."
                        className="w-full pl-8 pr-3 py-1 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div
                    role="tablist"
                    aria-label="Chapter Subsections"
                    className="flex items-stretch gap-2 overflow-x-auto pb-1.5"
                  >
                    {filteredChapters.map((ch) => {
                      const realIdx = chapters.findIndex((c) => c.id === ch.id);
                      const isSelected = realIdx === selectedChapterIdx;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedChapterIdx(realIdx >= 0 ? realIdx : 0)}
                          className={`shrink-0 max-w-[250px] px-3 py-2 rounded-xl border-2 text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50 font-semibold'
                          }`}
                        >
                          <span className="tabular-nums font-mono text-[11px] opacity-85 shrink-0">
                            Ch {String(ch.chapterNumber).padStart(2, '0')}
                          </span>
                          <span className="truncate">{ch.chapterTitle}</span>
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isSelected ? 'text-[#0f2952]' : 'text-emerald-600'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Subsections for Q&A Bank: Horizontal 9 Format Subsections + Compact Chapter Selector */}
              {!(Boolean(inlineAdditional) && chapters.length === 0) && activeSectionTab === 'qa_bank' && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                      Q&amp;A Formats (Select Format Below)
                    </span>
                    <div className="flex items-center gap-2">
                      <label htmlFor="qa-chapter-select" className="text-[11px] font-bold text-slate-600">
                        Chapter:
                      </label>
                      <select
                        id="qa-chapter-select"
                        value={selectedChapterIdx}
                        onChange={(e) => setSelectedChapterIdx(Number(e.target.value))}
                        className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 max-w-[230px]"
                      >
                        {chapters.map((ch, idx) => (
                          <option key={ch.id} value={idx}>
                            Ch {String(ch.chapterNumber).padStart(2, '0')}: {ch.chapterTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    role="tablist"
                    aria-label="Q&A Format Subsections"
                    className="flex items-center gap-2 overflow-x-auto pb-1"
                  >
                    {QA_FORMAT_FILTERS.map((f) => {
                      const active = qaFormatFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setQaFormatFilter(f.id)}
                          className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border-2 transition-all ${
                            active
                              ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                          }`}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Subsections for Model Papers & PYQ Papers: Horizontal Paper Set / Year Tabs */}
              {!(Boolean(inlineAdditional) && chapters.length === 0) &&
                (activeSectionTab === 'model_papers' || activeSectionTab === 'pyq_papers') && (() => {
                const isPyq = activeSectionTab === 'pyq_papers';
                const papers = isPyq ? examPapersBundle.pyqPapers : examPapersBundle.modelPapers;
                const activeIdx = isPyq ? selectedPyqPaperIdx : selectedModelPaperIdx;
                const setIdx = isPyq ? setSelectedPyqPaperIdx : setSelectedModelPaperIdx;
                return (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                        {isPyq
                          ? `Previous Year Question Papers (${papers.length} Years)`
                          : `Model Question Paper Sets (${papers.length} Sets)`}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative min-w-[200px]">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={paperSearchQuery}
                            onChange={(e) => setPaperSearchQuery(e.target.value)}
                            placeholder="Search questions in papers..."
                            className="w-full pl-8 pr-3 py-1 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">
                          {selectedSubject} · {selectedClass}
                        </span>
                      </div>
                    </div>
                    <div
                      role="tablist"
                      aria-label={isPyq ? 'Previous Year Paper Subsections' : 'Model Paper Subsections'}
                      className="flex items-center gap-2 overflow-x-auto pb-1"
                    >
                      {papers.map((p, idx) => {
                        const isSel = idx === activeIdx;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            role="tab"
                            aria-selected={isSel}
                            onClick={() => setIdx(idx)}
                            className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${
                              isSel
                                ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                            }`}
                          >
                            {p.yearOrTerm} ({p.totalMarks}M)
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}

              {/* Subsections for 10. Special Hubs: Horizontal Row of ONLY the 4 Special Hubs */}
              {isSpecialHubTab && (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                      Special Academic Hubs (4 Subsections)
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      100% Free Interactive Reference
                    </span>
                  </div>
                  <div
                    role="tablist"
                    aria-label="Special Academic Hub Subsections"
                    className="flex items-center gap-2 overflow-x-auto pb-1"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeSectionTab === 'math_hub'}
                      onClick={() => setActiveSectionTab('math_hub')}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border-2 ${
                        activeSectionTab === 'math_hub'
                          ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                          : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Math Formulas &amp; Drills</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeSectionTab === 'science_diagrams'}
                      onClick={() => setActiveSectionTab('science_diagrams')}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border-2 ${
                        activeSectionTab === 'science_diagrams'
                          ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                          : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Science Diagrams (12 SVGs)</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeSectionTab === 'english_grammar'}
                      onClick={() => setActiveSectionTab('english_grammar')}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border-2 ${
                        activeSectionTab === 'english_grammar'
                          ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>English Grammar &amp; Vocab</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeSectionTab === 'scholarship_olympiad'}
                      onClick={() => setActiveSectionTab('scholarship_olympiad')}
                      className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border-2 ${
                        activeSectionTab === 'scholarship_olympiad'
                          ? 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#0f2952] border-[#0f2952] shadow-xs font-black'
                          : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Scholarship &amp; Olympiad Hub</span>
                    </button>
                  </div>
                </>
              )}
            </div>

        {/* SELECTED TAB CONTENT STAGE — DISPLAYED IMMEDIATELY BELOW THE SELECTED TAB */}
        <div className="p-5 sm:p-7">
          {activeChapter ? (
            <article className="space-y-6">
              {/* Editorial Metadata, Full Academic Path, Prev/Next Navigation & Bookmark Bar */}
              <div className="border-b border-slate-100 pb-4 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span>{selectedBoard} Board</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-emerald-700 font-bold">{selectedMedium} Medium</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedClass}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {subjectMeta.icon} {selectedSubject}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums text-slate-800 font-bold">
                      Chapter {activeChapter.chapterNumber} of {chapters.length}
                    </span>
                    {(() => {
                      const comp = evaluateChapterCompleteness(
                        activeChapter,
                        syllabusResolution.verificationStatus === 'VERIFIED'
                      );
                      const isComplete =
                        comp.status === 'COMPLETE' || comp.status === 'Complete';
                      const isPartial =
                        comp.status === 'PARTIAL' || comp.status === 'Partially Complete';
                      return (
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            isComplete
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : isPartial
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {comp.status} ({comp.completedCount}/{comp.totalChecks} Quality Checks)
                        </span>
                      );
                    })()}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                    {String(activeChapter.chapterNumber).padStart(2, '0')}.{' '}
                    {activeChapter.chapterTitle}
                  </h2>
                  <p className="text-xs font-medium text-slate-600">
                    Official Textbook Alignment:{' '}
                    <strong className="text-slate-800">{activeChapter.textbookRef}</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={selectedChapterIdx <= 0}
                    onClick={() => setSelectedChapterIdx((idx) => Math.max(0, idx - 1))}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                      selectedChapterIdx <= 0
                        ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 cursor-pointer'
                    }`}
                  >
                    &larr; Prev Chapter
                  </button>
                  <button
                    type="button"
                    disabled={selectedChapterIdx >= chapters.length - 1}
                    onClick={() =>
                      setSelectedChapterIdx((idx) => Math.min(chapters.length - 1, idx + 1))
                    }
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                      selectedChapterIdx >= chapters.length - 1
                        ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 cursor-pointer'
                    }`}
                  >
                    Next Chapter &rarr;
                  </button>
                  {(activeSectionTab === 'chapter_notes' ||
                    activeSectionTab === 'textbook_solutions' ||
                    activeSectionTab === 'class_notebook' ||
                    activeSectionTab === 'word_meanings' ||
                    activeSectionTab === 'practice_questions' ||
                    activeSectionTab === 'short_revision' ||
                    activeSectionTab === 'qa_bank') && (
                    <button
                      type="button"
                      onClick={() =>
                        printChapterStudySheetA4({
                          mode: activeSectionTab,
                          board: selectedBoard,
                          classLevel: selectedClass,
                          subject: selectedSubject,
                          chapter: activeChapter,
                          includeNotebookAnswerKey: showNotebookAnswerKeySection,
                        })
                      }
                      className="px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save A4 PDF</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                      isCurrentBookmarked
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        isCurrentBookmarked ? 'fill-amber-500 text-amber-600' : ''
                      }`}
                    />
                    <span>{isCurrentBookmarked ? 'Bookmarked' : 'Bookmark Chapter'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 9: 9 CLICKABLE CHAPTER RESOURCE CARDS + SEARCH WITHIN CHAPTER */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                      Chapter {activeChapter.chapterNumber} Learning Resources — Click Any Card to Open
                    </span>
                  </div>
                  <div className="relative min-w-[230px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inChapterSearchQuery}
                      onChange={(e) => setInChapterSearchQuery(e.target.value)}
                      placeholder="Search within this chapter..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
                  {[
                    {
                      tab: 'chapter_notes' as StudyLibrarySectionTab,
                      num: 1,
                      title: 'Chapter Notes',
                      badge: `${(activeChapter.topicWiseExplanations || []).length + 9} Sections`,
                      emoji: '📄',
                      step: 'read_notes' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'textbook_solutions' as StudyLibrarySectionTab,
                      num: 2,
                      title: 'Textbook Exercise Solutions',
                      badge: `${(activeChapter.textbookExerciseSolutions || []).length} Solved`,
                      emoji: '📘',
                      step: 'textbook_solutions' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'class_notebook' as StudyLibrarySectionTab,
                      num: 3,
                      title: 'Complete Your Class Notes',
                      badge: `${(activeChapter.classNotebookExercises || []).length} Notebook Ex`,
                      emoji: '📓',
                      step: 'complete_class_notes' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'qa_bank' as StudyLibrarySectionTab,
                      num: 4,
                      title: 'Important Questions & Answers',
                      badge: `${(activeChapter.qaBank || []).length} Q&As`,
                      emoji: '✍️',
                      step: 'important_concepts' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'word_meanings' as StudyLibrarySectionTab,
                      num: 5,
                      title: 'Word Meanings & Definitions',
                      badge: `${
                        (activeChapter.difficultWordsAndMeanings || []).length +
                        (activeChapter.keyDefinitions || []).length
                      } Terms`,
                      emoji: '🔤',
                      step: 'study_chapter' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'practice_questions' as StudyLibrarySectionTab,
                      num: 6,
                      title: 'Practice Questions',
                      badge: `${(activeChapter.additionalPracticeQuestions || []).length} Practice`,
                      emoji: '🎯',
                      step: 'additional_practice' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'short_revision' as StudyLibrarySectionTab,
                      num: 7,
                      title: 'Chapter Revision',
                      badge: '1-Page Sheet',
                      emoji: '🎓',
                      step: 'chapter_revision' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'worksheets_ref' as StudyLibrarySectionTab,
                      num: 8,
                      title: 'Existing Worksheets',
                      badge: 'Interactive',
                      emoji: '📝',
                      step: 'additional_practice' as ChapterWorkflowStepId,
                    },
                    {
                      tab: 'chapter_test' as StudyLibrarySectionTab,
                      num: 9,
                      title: 'Existing MCQs',
                      badge: `${activeChapterTest?.questions.length || 10} MCQs`,
                      emoji: '❓',
                      step: 'check_answer_key' as ChapterWorkflowStepId,
                    },
                  ].map((card) => {
                    const isCardActive = activeSectionTab === card.tab;
                    const isStepDone = Boolean(
                      workflowProgressMap[activeChapter.id]?.[card.step]
                    );
                    return (
                      <button
                        key={card.tab}
                        type="button"
                        onClick={() => {
                          setActiveSectionTab(card.tab);
                          const nextWf = toggleChapterWorkflowStep(
                            activeChapter.id,
                            card.step,
                            true
                          );
                          setWorkflowProgressMap(nextWf);
                        }}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isCardActive
                            ? 'bg-[#0f2952] text-white border-amber-400 shadow-xs'
                            : 'bg-white hover:bg-indigo-50/70 text-slate-900 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm">{card.emoji}</span>
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                              isCardActive
                                ? 'bg-amber-400 text-slate-950'
                                : isStepDone
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {isStepDone ? '✓ Done' : `#${card.num}`}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold leading-tight line-clamp-2">
                          {card.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            isCardActive ? 'text-amber-200' : 'text-indigo-700'
                          }`}
                        >
                          {card.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* SECTION 10: 8-STEP CHAPTER COMPLETION WORKFLOW TRACKER */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    8-Step Chapter Completion Sequence (Click any step to mark Completed / Pending):
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CHAPTER_WORKFLOW_STEPS.map((st) => {
                      const done = Boolean(workflowProgressMap[activeChapter.id]?.[st.id]);
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            const updated = toggleChapterWorkflowStep(activeChapter.id, st.id);
                            setWorkflowProgressMap(updated);
                          }}
                          className={`px-2 py-1 rounded-lg border text-[10px] font-bold cursor-pointer flex items-center gap-1 transition-colors ${
                            done
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span>{done ? '✓' : st.stepNum + '.'}</span>
                          <span>{st.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Matching Dynamic Admin-Published Study Resources for Selected Board / Medium / Class / Subject */}
              {(() => {
                const scopedAdminItems = dynamicAdminItems.filter((docItem) => {
                  const sub = docItem.subject || docItem.payload?.subject;
                  return !sub || sub === selectedSubject;
                });
                if (scopedAdminItems.length === 0) return null;
                return (
                  <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-700" />
                        <h3 className="text-xs sm:text-sm font-black text-emerald-950">
                          Admin-Published Resources ({selectedBoard} · {selectedMedium} Medium · {selectedClass} · {selectedSubject})
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 tabular-nums">
                        {scopedAdminItems.length} Update{scopedAdminItems.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {scopedAdminItems.map((docItem) => {
                        const p = docItem.payload;
                        const linkUrl = p?.externalUrl || p?.videoUrl;
                        return (
                          <div
                            key={docItem.id}
                            className="bg-white rounded-xl border border-emerald-200/80 p-3.5 space-y-2 flex flex-col justify-between"
                          >
                            <div className="space-y-1">
                              <div className="text-[11px] font-bold text-slate-500 flex flex-wrap items-center gap-1.5">
                                <span>{p?.medium || 'All Mediums'}</span>
                                <span aria-hidden="true">·</span>
                                <span className="uppercase">
                                  {(docItem.materialCategory || p?.materialCategory || 'notes').replace(
                                    /_/g,
                                    ' '
                                  )}
                                </span>
                                {p?.chapterNumber ? (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span>Ch {p.chapterNumber}</span>
                                  </>
                                ) : null}
                              </div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                {docItem.title}
                              </h4>
                              {p?.description && (
                                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                              )}
                              {Array.isArray(p?.keyPoints) && p.keyPoints.length > 0 && (
                                <ul className="space-y-1 pt-1 text-[11px] text-slate-700 list-disc pl-4">
                                  {p.keyPoints.slice(0, 3).map((pt, i) => (
                                    <li key={i}>{pt}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            {linkUrl && (
                              <a
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-1"
                              >
                                <span>Open Official Resource</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB 5: WORKSHEETS REFERENCE (DIRECT LINK TO ORIGINAL WORKSHEETS MODULE — ZERO DUPLICATES) */}
              {activeSectionTab === 'worksheets_ref' && (
                <div className="rounded-2xl bg-indigo-50/70 border border-indigo-200 p-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <span className="inline-block text-[11px] font-black uppercase tracking-wider text-indigo-800">
                        Original Protected Worksheets Module · Zero Duplicate Copies
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">
                        {selectedBoard} Board · {selectedMedium} Medium · {selectedClass} · {selectedSubject} Worksheets
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Interactive chapter-wise worksheets for <strong>{selectedSubject}</strong> are maintained in their primary dedicated Worksheets studio (preserving all worksheet locks, answer keys, and print protections without duplicating worksheet files).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('worksheets', selectedSubject)}
                      className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open {selectedSubject} Worksheets</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 1: SUBJECT OVERVIEW, ORDERED CHAPTERS SEQUENCE & OFFICIAL TEXTBOOK LIBRARY */}
              {activeSectionTab === 'textbooks' && (
                <div className="space-y-6">
                  {/* 1A. Subject Overview & Material Availability Summary */}
                  <div className="rounded-2xl bg-gradient-to-r from-slate-50 via-indigo-50/40 to-amber-50/40 border border-slate-200 p-5 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                          {subjectMeta.icon}
                        </span>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider">
                              {getSyllabusStatusPresentation(syllabusResolution).badgeLabel}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {selectedBoard} Board &bull; {selectedMedium} Medium &bull; {selectedClass}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">
                            {selectedSubject} — Subject Overview &amp; Ordered Syllabus
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {subjectMeta.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center shrink-0">
                        <div className="px-3 py-2 rounded-xl bg-white border border-slate-200">
                          <span className="block text-base font-display font-black text-indigo-700 tabular-nums">
                            {chapters.length}
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500">
                            Chapters
                          </span>
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white border border-slate-200">
                          <span className="block text-base font-display font-black text-emerald-700 tabular-nums">
                            {examPapersBundle.modelPapers.length + examPapersBundle.pyqPapers.length}
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500">
                            Exam Papers
                          </span>
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white border border-slate-200">
                          <span className="block text-base font-display font-black text-amber-700 tabular-nums">
                            {chapters.length * 10}
                          </span>
                          <span className="block text-[10px] font-bold text-slate-500">
                            Chapter MCQs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 1B. Complete Ordered Chapter-wise Sequence Table (Chapters 1 to N) */}
                    {chapters.length > 0 && (
                      <div className="space-y-2.5 pt-3 border-t border-slate-200/80">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-xs font-display font-black uppercase tracking-wider text-[#0f2952]">
                            Ordered Chapters &amp; Chapter-wise Learning Materials ({chapters.length} Chapters)
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Click any material icon on a chapter row to open immediately
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
                          {chapters.map((ch, idx) => {
                            const isActiveCh = idx === selectedChapterIdx;
                            return (
                              <div
                                key={ch.id}
                                className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                                  isActiveCh
                                    ? 'bg-amber-50/70 border-amber-400 shadow-2xs'
                                    : 'bg-white border-slate-200 hover:border-indigo-300'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-700">
                                      Chapter {String(ch.chapterNumber).padStart(2, '0')}
                                    </span>
                                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                      {ch.chapterTitle}
                                    </h5>
                                  </div>
                                  {isActiveCh && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#0f2952] text-amber-300 text-[10px] font-black shrink-0">
                                      Active
                                    </span>
                                  )}
                                </div>

                                {/* One-Line Icon Action Buttons for this Chapter */}
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('chapter_notes');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>📄</span>
                                    <span>Notes</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('textbook_solutions');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>📘</span>
                                    <span>Solutions</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('class_notebook');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>📓</span>
                                    <span>Class Notes</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('qa_bank');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>✍️</span>
                                    <span>Imp. Q&amp;A</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('short_revision');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>🎓</span>
                                    <span>Revision</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapterIdx(idx);
                                      setActiveSectionTab('chapter_test');
                                    }}
                                    className="shrink-0 px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-950 text-[11px] font-extrabold cursor-pointer flex items-center gap-1"
                                  >
                                    <span>❓</span>
                                    <span>10 MCQs</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  {activeTextbook && (
                    <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 border border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          Selected Subject Official Textbook • {activeTextbook.syllabusCode}
                        </span>
                        <span className="text-xs font-semibold text-emerald-300">
                          {activeTextbook.editionYear}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white">
                        {activeTextbook.bookTitle}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Publisher: <strong className="text-white">{activeTextbook.publisher}</strong>{' '}
                        · Available Mediums:{' '}
                        <strong className="text-white">
                          {activeTextbook.mediums.join(', ')}
                        </strong>{' '}
                        · {activeTextbook.totalChapters} Syllabus Chapters
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={activeTextbook.officialReadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Open {activeTextbook.officialPortalName}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={activeTextbook.secondaryPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Open {activeTextbook.secondaryPortalName}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Full Class Textbook Directory */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-slate-900">
                      All Official Textbooks for {selectedBoard} Board · {selectedClass} (
                      {boardClassTextbooks.length} Books)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {boardClassTextbooks.map((tb) => {
                        const sMeta = getSubjectMeta(tb.subject, selectedBoard);
                        const isCurrentSub = tb.subject === selectedSubject;
                        return (
                          <div
                            key={tb.id}
                            className={`p-4 rounded-xl border space-y-2.5 transition-colors ${
                              isCurrentSub
                                ? 'bg-indigo-50/70 border-indigo-300'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                <span>{sMeta.icon}</span>
                                <span>{tb.subject}</span>
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500">
                                {tb.totalChapters} Chapters
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-800 leading-snug">
                              {tb.bookTitle}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Mediums: {tb.mediums.join(' / ')}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <a
                                href={tb.officialReadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1"
                              >
                                <span>Official e-Book</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedSubject(tb.subject);
                                  setActiveSectionTab('chapter_notes');
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-indigo-700 text-[11px] font-bold cursor-pointer"
                              >
                                Read Chapter Notes
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB B: COMPLETE CHAPTER-WISE STUDY NOTES (SECTIONS A TO L) */}
              {activeSectionTab === 'chapter_notes' && (() => {
                const sq = inChapterSearchQuery.trim().toLowerCase();
                const matchesSearch = (text: string) => !sq || text.toLowerCase().includes(sq);
                return (
                  <div className="space-y-6">
                    {/* A. Chapter Introduction */}
                    {matchesSearch(activeChapter.overview) && (
                      <section className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="inline-block text-[11px] font-black uppercase tracking-wider text-indigo-800">
                          A. Chapter Introduction
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {activeChapter.overview}
                        </p>
                      </section>
                    )}

                    {/* B. Complete Chapter Explanation */}
                    {activeChapter.detailedExplanation &&
                      activeChapter.detailedExplanation.some(matchesSearch) && (
                        <section className="space-y-2.5">
                          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span>B. Complete Chapter Explanation</span>
                          </h3>
                          <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                            {activeChapter.detailedExplanation
                              .filter(matchesSearch)
                              .map((para, idx) => (
                                <p key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200">
                                  {para}
                                </p>
                              ))}
                          </div>
                        </section>
                      )}

                    {/* C. Chapter Summary */}
                    {activeChapter.chapterSummary && matchesSearch(activeChapter.chapterSummary) && (
                      <section className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                        <h3 className="text-xs font-black uppercase tracking-wider text-indigo-900">
                          C. Chapter Summary
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                          {activeChapter.chapterSummary}
                        </p>
                      </section>
                    )}

                    {/* D. Topic-Wise Explanations */}
                    {activeChapter.topicWiseExplanations &&
                      activeChapter.topicWiseExplanations.some(
                        (t) =>
                          matchesSearch(t.topicTitle) ||
                          matchesSearch(t.explanation) ||
                          matchesSearch(t.keyTakeaway)
                      ) && (
                        <section className="space-y-3 pt-4 border-t border-slate-100">
                          <h3 className="text-sm font-black text-slate-900">
                            D. Topic-Wise Explanations
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {activeChapter.topicWiseExplanations
                              .filter(
                                (t) =>
                                  matchesSearch(t.topicTitle) ||
                                  matchesSearch(t.explanation) ||
                                  matchesSearch(t.keyTakeaway)
                              )
                              .map((topic, i) => (
                                <div
                                  key={i}
                                  className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-2xs"
                                >
                                  <h4 className="text-xs sm:text-sm font-black text-[#0f2952]">
                                    {topic.topicTitle}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                    {topic.explanation}
                                  </p>
                                  <div className="pt-1">
                                    <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700">
                                      • Key Takeaway: {topic.keyTakeaway}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </section>
                      )}

                    {/* E & F. Important Concepts & Important Facts */}
                    {activeChapter.keyPoints.some(matchesSearch) && (
                      <section className="space-y-2.5 pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900">
                          E &amp; F. Important Concepts &amp; Syllabus Facts
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                          {activeChapter.keyPoints.filter(matchesSearch).map((pt, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="font-mono text-xs font-bold text-indigo-600 tabular-nums mt-0.5">
                                0{i + 1}.
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* G. Definitions */}
                    {activeChapter.keyDefinitions &&
                      activeChapter.keyDefinitions.some(
                        (d) => matchesSearch(d.term) || matchesSearch(d.meaning)
                      ) && (
                        <section className="space-y-2.5 pt-4 border-t border-slate-100">
                          <h3 className="text-sm font-black text-slate-900">
                            G. Key Definitions &amp; Terminology
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeChapter.keyDefinitions
                              .filter((d) => matchesSearch(d.term) || matchesSearch(d.meaning))
                              .map((def, i) => (
                                <div
                                  key={i}
                                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                                >
                                  <p className="text-xs font-black text-indigo-900">{def.term}</p>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    {def.meaning}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </section>
                      )}

                    {/* H. Examples */}
                    {activeChapter.solvedExamples.some(
                      (ex) => matchesSearch(ex.prompt) || matchesSearch(ex.solution)
                    ) && (
                      <section className="space-y-3 pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900">
                          H. Solved Walkthrough Examples
                        </h3>
                        <div className="space-y-3">
                          {activeChapter.solvedExamples
                            .filter((ex) => matchesSearch(ex.prompt) || matchesSearch(ex.solution))
                            .map((ex, i) => {
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
                                          [key]: !prev[key],
                                        }))
                                      }
                                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-xs font-bold text-indigo-700 cursor-pointer shrink-0 self-start sm:self-center"
                                    >
                                      {isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution'}
                                    </button>
                                  </div>
                                  {isRevealed && (
                                    <div className="p-3 rounded-lg bg-white border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed whitespace-pre-line">
                                      <strong className="text-emerald-800">Solution: </strong>
                                      {ex.solution}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </section>
                    )}

                    {/* I. Difficult Words & Meanings */}
                    {activeChapter.difficultWordsAndMeanings &&
                      activeChapter.difficultWordsAndMeanings.some(
                        (w) =>
                          matchesSearch(w.word) ||
                          matchesSearch(w.meaning) ||
                          matchesSearch(w.usageExample)
                      ) && (
                        <section className="space-y-2.5 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-black text-slate-900">
                              I. Difficult Words &amp; Meanings
                            </h3>
                            <button
                              type="button"
                              onClick={() => setActiveSectionTab('word_meanings')}
                              className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
                            >
                              Open Full Vocabulary Tab &rarr;
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeChapter.difficultWordsAndMeanings
                              .filter(
                                (w) =>
                                  matchesSearch(w.word) ||
                                  matchesSearch(w.meaning) ||
                                  matchesSearch(w.usageExample)
                              )
                              .map((wm, i) => (
                                <div
                                  key={i}
                                  className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-1"
                                >
                                  <p className="text-xs font-black text-slate-900">{wm.word}</p>
                                  <p className="text-xs text-slate-700">
                                    <strong>Meaning:</strong> {wm.meaning}
                                  </p>
                                  <p className="text-[11px] text-slate-600 italic">
                                    <strong>Usage:</strong> {wm.usageExample}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </section>
                      )}

                    {/* J. Formulas, Grammar Rules & Scientific Laws */}
                    {activeChapter.formulasAndRules.some(matchesSearch) && (
                      <section className="space-y-2.5 pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900">
                          J. Key Formulas, Grammar Rules &amp; Scientific Laws
                        </h3>
                        <div className="grid grid-cols-1 gap-2.5">
                          {activeChapter.formulasAndRules.filter(matchesSearch).map((rule, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 font-mono"
                            >
                              {rule}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* K. Diagrams, Maps & Illustrations Guide */}
                    {activeChapter.diagramsAndVisuals &&
                      activeChapter.diagramsAndVisuals.some(
                        (d) =>
                          matchesSearch(d.title) ||
                          matchesSearch(d.description) ||
                          d.labels.some(matchesSearch)
                      ) && (
                        <section className="space-y-2.5 pt-4 border-t border-slate-100">
                          <h3 className="text-sm font-black text-slate-900">
                            K. Diagrams, Maps &amp; Illustrations Guide
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {activeChapter.diagramsAndVisuals
                              .filter(
                                (d) =>
                                  matchesSearch(d.title) ||
                                  matchesSearch(d.description) ||
                                  d.labels.some(matchesSearch)
                              )
                              .map((diag, i) => (
                                <div
                                  key={i}
                                  className="p-4 rounded-xl bg-sky-50/50 border border-sky-200 space-y-2"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-xs sm:text-sm font-black text-sky-950">
                                      {diag.title}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-black uppercase">
                                      {diag.category}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    {diag.description}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[11px] font-bold text-slate-600">
                                      Required Labels:
                                    </span>
                                    {diag.labels.map((lbl, li) => (
                                      <span
                                        key={li}
                                        className="px-2 py-0.5 rounded-md bg-white border border-sky-200 text-[11px] font-semibold text-sky-900"
                                      >
                                        {lbl}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-[11px] text-emerald-800 font-semibold">
                                    Notebook Drawing Tip: {diag.drawingOrMapTip}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </section>
                      )}

                    {/* L. Important Points for Revision */}
                    {activeChapter.shortRevisionNotes &&
                      activeChapter.shortRevisionNotes.quickRevisionPoints.some(matchesSearch) && (
                        <section className="space-y-2.5 pt-4 border-t border-slate-100">
                          <h3 className="text-sm font-black text-slate-900">
                            L. Important Points for Quick Revision
                          </h3>
                          <ul className="space-y-2">
                            {activeChapter.shortRevisionNotes.quickRevisionPoints
                              .filter(matchesSearch)
                              .map((pt, idx) => (
                                <li
                                  key={idx}
                                  className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                                >
                                  <span className="font-mono text-xs font-black text-emerald-700 mt-0.5">
                                    #{idx + 1}
                                  </span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                          </ul>
                        </section>
                      )}

                    {/* Next Action Callout */}
                    <div className="p-4 rounded-2xl bg-[#0f2952] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                          Step 1 Complete? Move to Step 2 &amp; Step 3
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Review Complete Textbook Exercise Solutions or Complete Your Class Notes in your physical school notebook.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = toggleChapterWorkflowStep(
                              activeChapter.id,
                              'study_chapter',
                              true
                            );
                            setWorkflowProgressMap(updated);
                            setActiveSectionTab('textbook_solutions');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                        >
                          📘 Textbook Exercise Solutions
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = toggleChapterWorkflowStep(
                              activeChapter.id,
                              'study_chapter',
                              true
                            );
                            setWorkflowProgressMap(updated);
                            setActiveSectionTab('class_notebook');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold cursor-pointer"
                        >
                          📓 Complete Your Class Notes
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* TAB B2: COMPLETE TEXTBOOK EXERCISE SOLUTIONS */}
              {activeSectionTab === 'textbook_solutions' && (() => {
                const allSolutions = activeChapter.textbookExerciseSolutions || [];
                const sq = inChapterSearchQuery.trim().toLowerCase();
                const filteredSolutions = sq
                  ? allSolutions.filter(
                      (s) =>
                        s.question.toLowerCase().includes(sq) ||
                        s.answer.toLowerCase().includes(sq) ||
                        s.typeLabel.toLowerCase().includes(sq) ||
                        s.qNo.toLowerCase().includes(sq)
                    )
                  : allSolutions;

                const comp = evaluateChapterCompleteness(
                  activeChapter,
                  syllabusResolution.verificationStatus === 'VERIFIED'
                );
                const qc = comp.qualityReport;
                const totalSubQuestions = allSolutions.reduce(
                  (acc, item) => acc + (item.subQuestionsCount || 1),
                  0
                );

                return (
                  <div className="space-y-5">
                    <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-900 text-white text-[10px] font-black uppercase tracking-wider">
                              Official Textbook Exercise Solutions
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase ${
                                qc.qualityStatus === 'COMPLETE'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : qc.qualityStatus === 'PARTIAL'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-rose-100 text-rose-900 border-rose-300'
                              }`}
                            >
                              Audit Status: {qc.qualityStatus} ({allSolutions.length} Main Questions •{' '}
                              {totalSubQuestions} Sub-Questions Solved)
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-300 text-[10px] font-bold">
                              {qc.totalExerciseSetsIdentified} Exercise Sets Covered
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-display font-black text-slate-900">
                            Chapter {activeChapter.chapterNumber}: {activeChapter.chapterTitle} — Complete Step-by-Step Textbook Exercise Answers
                          </h3>
                          <p className="text-xs text-slate-700 font-medium">
                            {qc.statusReason}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const allOpen = filteredSolutions.every(
                              (s) => revealedTextbookAnswers[s.id]
                            );
                            const next: Record<string, boolean> = { ...revealedTextbookAnswers };
                            for (const s of filteredSolutions) {
                              next[s.id] = !allOpen;
                            }
                            setRevealedTextbookAnswers(next);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-black cursor-pointer shrink-0"
                        >
                          Toggle All Solutions
                        </button>
                      </div>

                      {/* 8-Criteria Automated Quality Control Bar */}
                      <div className="pt-2.5 border-t border-blue-200/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-950 mr-1">
                          8-Criteria QC Audit:
                        </span>
                        {[
                          { label: 'A. Chapter Explanation', ok: Boolean(qc.criteria.A_completeChapterExplanation) },
                          { label: 'B. Textbook Exercises Covered', ok: Boolean(qc.criteria.B_allAvailableTextbookExercisesCovered) },
                          { label: 'C. All Questions Answered', ok: Boolean(qc.criteria.C_everyApplicableQuestionAnswered) },
                          { label: 'D. Math Calculations Verified', ok: Boolean(qc.criteria.D_mathCalculationsIndependentlyChecked) },
                          { label: 'E. Grammar Checked', ok: Boolean(qc.criteria.E_grammarAnswersChecked) },
                          { label: 'F. Science Facts Verified', ok: Boolean(qc.criteria.F_scienceFactsVerified) },
                          { label: 'G. Answer Keys Complete', ok: Boolean(qc.criteria.G_answerKeysComplete) },
                          { label: 'H. Chapter-Specific Notebook', ok: Boolean(qc.criteria.H_notebookExercisesChapterSpecific) },
                        ].map((c) => (
                          <span
                            key={c.label}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              c.ok
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                : 'bg-amber-50 text-amber-900 border-amber-300'
                            }`}
                          >
                            {c.ok ? '✓' : '•'} {c.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredSolutions.map((sol) => {
                        const isOpen = Boolean(revealedTextbookAnswers[sol.id]);
                        return (
                          <div
                            key={sol.id}
                            className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                {sol.exerciseSetLabel && (
                                  <span className="px-2.5 py-0.5 rounded-md bg-blue-900 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                                    {sol.exerciseSetLabel}
                                  </span>
                                )}
                                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[11px] font-black">
                                  {sol.qNo}
                                </span>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                                  {sol.typeLabel}
                                </span>
                                {sol.subQuestionsCount && sol.subQuestionsCount > 1 && (
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                                    {sol.subQuestionsCount} Sub-Questions Solved
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                {sol.calculationVerified && (
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black">
                                    ✓ Calculation Verified
                                  </span>
                                )}
                                <span
                                  className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${
                                    sol.verificationStatus === 'VERIFIED_TEXTBOOK_ALIGNMENT'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : 'bg-amber-50 text-amber-900 border-amber-300'
                                  }`}
                                >
                                  {sol.verificationStatus}
                                </span>
                                <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                                  {sol.marks} {sol.marks === 1 ? 'Mark' : 'Marks'}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                              {sol.question}
                            </p>

                            <div className="flex items-center justify-between pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setRevealedTextbookAnswers((prev) => ({
                                    ...prev,
                                    [sol.id]: !prev[sol.id],
                                  }))
                                }
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 border border-slate-300 text-xs font-bold text-indigo-800 cursor-pointer"
                              >
                                {isOpen
                                  ? 'Hide Textbook Solution'
                                  : 'View Complete Answer & Step-by-Step Solution'}
                              </button>
                            </div>

                            {isOpen && (
                              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                                {(sol.conceptUsed || sol.formulaExplained) && (
                                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200/80 space-y-1 text-xs">
                                    {sol.conceptUsed && (
                                      <p className="text-slate-800">
                                        <strong className="text-indigo-900">
                                          Concept / Principle Used:{' '}
                                        </strong>
                                        {sol.conceptUsed}
                                      </p>
                                    )}
                                    {sol.formulaExplained && (
                                      <p className="text-slate-800">
                                        <strong className="text-indigo-900">
                                          Formula / Rule Explained Before Application:{' '}
                                        </strong>
                                        {sol.formulaExplained}
                                      </p>
                                    )}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <p className="text-[11px] font-black uppercase tracking-wider text-emerald-900">
                                    Complete Step-by-Step Solution &amp; Final Answer:
                                  </p>
                                  <p className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-relaxed font-medium">
                                    {sol.answer}
                                  </p>
                                </div>
                                {sol.stepByStepExplanation && (
                                  <div className="pt-2 border-t border-emerald-200/70 space-y-1">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-emerald-900">
                                      Method &amp; Independent Verification Note:
                                    </p>
                                    <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                                      {sol.stepByStepExplanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB B3: COMPLETE YOUR CLASS NOTES (PHYSICAL SCHOOL NOTEBOOK EXERCISES + HIDDEN-BY-DEFAULT ANSWER KEY) */}
              {activeSectionTab === 'class_notebook' && (() => {
                const allNotebookExercises = activeChapter.classNotebookExercises || [];
                const sq = inChapterSearchQuery.trim().toLowerCase();
                const filteredExercises = sq
                  ? allNotebookExercises.filter(
                      (nb) =>
                        nb.prompt.toLowerCase().includes(sq) ||
                        nb.sectionGroup.toLowerCase().includes(sq) ||
                        nb.typeLabel.toLowerCase().includes(sq)
                    )
                  : allNotebookExercises;

                const writtenCount = allNotebookExercises.filter(
                  (nb) => notebookWrittenItems[`${activeChapter.id}-${nb.id}`]
                ).length;

                return (
                  <div className="space-y-6">
                    {/* Dedicated Class Notebook Header Banner */}
                    <div className="rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 border-2 border-amber-300 p-5 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#0f2952] text-amber-300 text-[10px] font-black uppercase tracking-wider">
                              📓 COMPLETE YOUR CLASS NOTES · SCHOOL NOTEBOOK BUILDER
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white border border-amber-300 text-amber-950 text-[10px] font-black">
                              {writtenCount} / {allNotebookExercises.length} Written in Notebook
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                            Chapter {activeChapter.chapterNumber}: {activeChapter.chapterTitle} — Complete Class Notebook Exercises
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            Write the following structured exercises neatly in your physical school notebook to build complete, self-written class notes and prepare for school exams.{' '}
                            <strong className="text-slate-900">
                              Attempt each question in your notebook first, then open &ldquo;VIEW ANSWERS &amp; CHECK YOUR WORK&rdquo; at the bottom to verify and correct your answers.
                            </strong>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              printChapterStudySheetA4({
                                board: selectedBoard,
                                classLevel: selectedClass,
                                subject: selectedSubject,
                                chapter: activeChapter,
                                mode: 'class_notebook',
                                includeNotebookAnswerKey: false,
                              })
                            }
                            className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-400 text-amber-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print Notebook Questions Only</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              printChapterStudySheetA4({
                                board: selectedBoard,
                                classLevel: selectedClass,
                                subject: selectedSubject,
                                chapter: activeChapter,
                                mode: 'class_notebook',
                                includeNotebookAnswerKey: true,
                              })
                            }
                            className="px-3.5 py-2 rounded-xl bg-[#0f2952] hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-amber-300" />
                            <span>Print with Answer Key</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Written Exercises List (NO ANSWERS SHOWN BESIDE QUESTIONS BY DEFAULT) */}
                    <div className="space-y-3">
                      {filteredExercises.map((item) => {
                        const nbStoreKey = `${activeChapter.id}-${item.id}`;
                        const isWritten = Boolean(notebookWrittenItems[nbStoreKey]);
                        return (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                              isWritten
                                ? 'bg-emerald-50/40 border-emerald-300'
                                : 'bg-white border-slate-200 shadow-2xs'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-black">
                                  {item.qNo}
                                </span>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800">
                                  {item.sectionGroup}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                                  {item.typeLabel}
                                </span>
                              </div>

                              <label className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={isWritten}
                                  onChange={() => {
                                    const updated = toggleNotebookWrittenExerciseItem(nbStoreKey);
                                    setNotebookWrittenItems(updated);
                                  }}
                                  className="w-3.5 h-3.5 rounded accent-emerald-600 cursor-pointer"
                                />
                                <span>
                                  {isWritten
                                    ? '✓ Written in My School Notebook'
                                    : 'Mark Written in Notebook'}
                                </span>
                              </label>
                            </div>

                            <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                              {item.prompt}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/80">
                              <span>
                                <strong className="text-slate-800">Notebook Guidance:</strong>{' '}
                                {item.writingGuidance}
                              </span>
                              <span className="font-bold text-indigo-700 shrink-0">
                                {item.marks} {item.marks === 1 ? 'Mark' : 'Marks'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* SEPARATE EXPANDABLE SECTION: VIEW ANSWERS & CHECK YOUR WORK (HIDDEN BY DEFAULT) */}
                    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider text-indigo-800">
                            Self-Correction &amp; Reference Key · Hidden by Default
                          </span>
                          <h4 className="text-sm sm:text-base font-display font-black text-slate-900">
                            Finished writing in your school notebook? Check your answers below.
                          </h4>
                          <p className="text-xs text-slate-600">
                            Compare your handwritten notebook answers with the complete reference answers, step-by-step calculations, and key marking points.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !showNotebookAnswerKeySection;
                            setShowNotebookAnswerKeySection(nextState);
                            if (nextState) {
                              const updated = toggleChapterWorkflowStep(
                                activeChapter.id,
                                'check_answer_key',
                                true
                              );
                              setWorkflowProgressMap(updated);
                            }
                          }}
                          className={`px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shrink-0 transition-all shadow-xs ${
                            showNotebookAnswerKeySection
                              ? 'bg-slate-900 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {showNotebookAnswerKeySection
                              ? 'HIDE ANSWERS & CHECK YOUR WORK'
                              : 'VIEW ANSWERS & CHECK YOUR WORK'}
                          </span>
                        </button>
                      </div>

                      {showNotebookAnswerKeySection && (
                        <div className="space-y-3 pt-3 border-t border-indigo-200">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-black text-indigo-950">
                              Complete Class Notebook Reference Answer Key ({filteredExercises.length}{' '}
                              Exercises)
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const allOpen = filteredExercises.every(
                                  (nb) => revealedNotebookItemKey[nb.id] !== false
                                );
                                const next: Record<string, boolean> = {};
                                for (const nb of filteredExercises) {
                                  next[nb.id] = !allOpen;
                                }
                                setRevealedNotebookItemKey(next);
                              }}
                              className="px-3 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-bold text-indigo-800 cursor-pointer"
                            >
                              Toggle Individual Answer Cards
                            </button>
                          </div>

                          {filteredExercises.map((item) => {
                            const isCardOpen = revealedNotebookItemKey[item.id] !== false;
                            return (
                              <div
                                key={`ans-${item.id}`}
                                className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2.5 shadow-2xs"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-xs font-black text-emerald-950">
                                    {item.qNo} ({item.typeLabel}):{' '}
                                    {item.prompt.split('\n')[0]}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRevealedNotebookItemKey((prev) => ({
                                        ...prev,
                                        [item.id]: prev[item.id] === false ? true : false,
                                      }))
                                    }
                                    className="text-[11px] font-bold text-indigo-700 hover:underline cursor-pointer"
                                  >
                                    {isCardOpen ? 'Collapse' : 'Expand Answer'}
                                  </button>
                                </div>

                                {isCardOpen && (
                                  <div className="space-y-2 pt-1">
                                    <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-relaxed font-medium">
                                      <strong className="text-emerald-900">
                                        Reference Notebook Answer:{' '}
                                      </strong>
                                      {item.modelAnswer}
                                    </div>
                                    {item.stepByStepExplanation && (
                                      <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                                          Self-Check &amp; Marking Points:
                                        </p>
                                        <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                                          {item.stepByStepExplanation}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* TAB B4: WORD MEANINGS & DEFINITIONS */}
              {activeSectionTab === 'word_meanings' && (() => {
                const words = activeChapter.difficultWordsAndMeanings || [];
                const defs = activeChapter.keyDefinitions || [];
                const sq = inChapterSearchQuery.trim().toLowerCase();
                return (
                  <div className="space-y-6">
                    <section className="space-y-3">
                      <h3 className="text-sm font-black text-slate-900">
                        Difficult Words, Meanings &amp; Sentence Usage ({words.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {words
                          .filter(
                            (w) =>
                              !sq ||
                              w.word.toLowerCase().includes(sq) ||
                              w.meaning.toLowerCase().includes(sq) ||
                              w.usageExample.toLowerCase().includes(sq)
                          )
                          .map((wm, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-black text-slate-900">
                                  {wm.word}
                                </span>
                              </div>
                              <p className="text-xs text-slate-800 leading-relaxed">
                                <strong>Meaning:</strong> {wm.meaning}
                              </p>
                              <p className="text-xs text-slate-600 italic leading-relaxed">
                                <strong>Example Sentence:</strong> {wm.usageExample}
                              </p>
                            </div>
                          ))}
                      </div>
                    </section>

                    <section className="space-y-3 pt-4 border-t border-slate-100">
                      <h3 className="text-sm font-black text-slate-900">
                        Key Chapter Definitions &amp; Technical Terms ({defs.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {defs
                          .filter(
                            (d) =>
                              !sq ||
                              d.term.toLowerCase().includes(sq) ||
                              d.meaning.toLowerCase().includes(sq)
                          )
                          .map((def, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                            >
                              <p className="text-xs sm:text-sm font-black text-indigo-900">
                                {def.term}
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {def.meaning}
                              </p>
                            </div>
                          ))}
                      </div>
                    </section>
                  </div>
                );
              })()}

              {/* TAB B5: ADDITIONAL PRACTICE QUESTIONS (CLEARLY SEPARATED FROM TEXTBOOK EXERCISES) */}
              {activeSectionTab === 'practice_questions' && (() => {
                const extraQuestions = activeChapter.additionalPracticeQuestions || [];
                const sq = inChapterSearchQuery.trim().toLowerCase();
                const filteredExtra = sq
                  ? extraQuestions.filter(
                      (q) =>
                        q.question.toLowerCase().includes(sq) ||
                        q.answer.toLowerCase().includes(sq) ||
                        q.formatLabel.toLowerCase().includes(sq)
                    )
                  : extraQuestions;

                return (
                  <div className="space-y-5">
                    <div className="rounded-2xl bg-cyan-50/70 border border-cyan-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-900 text-white text-[10px] font-black uppercase tracking-wider">
                          Extra Exam &amp; Competency Practice · Separate from Textbook Exercises
                        </span>
                        <h3 className="text-sm sm:text-base font-display font-black text-slate-900">
                          Additional Practice Questions for Chapter {activeChapter.chapterNumber}:{' '}
                          {activeChapter.chapterTitle}
                        </h3>
                        <p className="text-xs text-slate-600">
                          Attempt these supplementary application, HOTS, and exam-oriented practice questions after completing your official textbook exercises.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const allOpen = filteredExtra.every(
                            (q) => revealedPracticeAnswers[q.id]
                          );
                          const next: Record<string, boolean> = { ...revealedPracticeAnswers };
                          for (const q of filteredExtra) {
                            next[q.id] = !allOpen;
                          }
                          setRevealedPracticeAnswers(next);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-cyan-900 hover:bg-cyan-800 text-white text-xs font-black cursor-pointer shrink-0"
                      >
                        Toggle All Practice Answers
                      </button>
                    </div>

                    <div className="space-y-3">
                      {filteredExtra.map((pq, idx) => {
                        const isOpen = Boolean(revealedPracticeAnswers[pq.id]);
                        return (
                          <div
                            key={pq.id}
                            className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-2xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-800">
                                Practice Q{idx + 1} · {pq.formatLabel}
                              </span>
                              <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                                {pq.marks} {pq.marks === 1 ? 'Mark' : 'Marks'}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                              {pq.question}
                            </p>
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  setRevealedPracticeAnswers((prev) => ({
                                    ...prev,
                                    [pq.id]: !prev[pq.id],
                                  }))
                                }
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-50 border border-slate-300 text-xs font-bold text-cyan-900 cursor-pointer"
                              >
                                {isOpen ? 'Hide Practice Answer' : 'View Answer & Explanation'}
                              </button>
                            </div>
                            {isOpen && (
                              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                                <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                                  <strong className="text-emerald-900">Model Answer: </strong>
                                  {pq.answer}
                                </p>
                                {pq.examTip && (
                                  <p className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200 font-semibold">
                                    Tip: {pq.examTip}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB C: SHORT REVISION NOTES (1-PAGE EXAM SHEET) */}
              {activeSectionTab === 'short_revision' && (
                <div className="space-y-6">
                  {activeChapter.shortRevisionNotes && (
                    <>
                      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <span>One-Page Exam Summary Sheet</span>
                        </div>
                        <p className="text-sm text-slate-800 leading-relaxed font-medium">
                          {activeChapter.shortRevisionNotes.onePageSummary}
                        </p>
                      </div>

                      <section className="space-y-2.5">
                        <h3 className="text-sm font-black text-slate-900">
                          Quick Exam Revision Points
                        </h3>
                        <ul className="space-y-2">
                          {activeChapter.shortRevisionNotes.quickRevisionPoints.map((pt, idx) => (
                            <li
                              key={idx}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                            >
                              <span className="font-mono text-xs font-black text-indigo-600 mt-0.5">
                                #{idx + 1}
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="space-y-2.5 pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900">
                          Key Memory Tricks &amp; Mnemonics
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeChapter.shortRevisionNotes.memoryTricks.map((trick, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium"
                            >
                              {trick}
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="space-y-2.5 pt-4 border-t border-slate-100">
                        <h3 className="text-sm font-black text-slate-900">
                          Must-Remember Formulas, Rules &amp; Definitions
                        </h3>
                        <div className="space-y-2">
                          {activeChapter.shortRevisionNotes.importantFacts.map((fact, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono"
                            >
                              {fact}
                            </div>
                          ))}
                        </div>
                      </section>
                    </>
                  )}

                  {/* Interactive Revision Checklist (Saved in localStorage) */}
                  <section className="space-y-2.5 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                      <span>Chapter Self-Revision Checklist (Saved on Device)</span>
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
                              onChange={() => handleToggleChecklist(chkKey)}
                              className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </section>
                </div>
              )}

              {/* TAB D: QUESTION & ANSWER BANK (ALL 9 FORMATS) */}
              {activeSectionTab === 'qa_bank' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900">
                      Chapter Question &amp; Answer Bank ({filteredQaBank.length} Questions)
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        const allOpen = filteredQaBank.every((q) => revealedQaAnswers[q.id]);
                        const next: Record<string, boolean> = { ...revealedQaAnswers };
                        for (const q of filteredQaBank) {
                          next[q.id] = !allOpen;
                        }
                        setRevealedQaAnswers(next);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      Toggle All Model Answers
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredQaBank.map((qa, idx) => {
                      const isOpen = Boolean(revealedQaAnswers[qa.id]);
                      return (
                        <div
                          key={qa.id}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                              Q{idx + 1} · {qa.formatLabel}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                              {qa.marks} {qa.marks === 1 ? 'Mark' : 'Marks'}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                            {qa.question}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedQaAnswers((prev) => ({
                                  ...prev,
                                  [qa.id]: !prev[qa.id],
                                }))
                              }
                              className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-xs font-bold text-indigo-700 cursor-pointer"
                            >
                              {isOpen ? 'Hide Model Answer' : 'Show Model Answer'}
                            </button>
                          </div>
                          {isOpen && (
                            <div className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-2">
                              <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                                <strong className="text-emerald-800">Model Answer: </strong>
                                {qa.answer}
                              </p>
                              {qa.examTip && (
                                <p className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200 font-semibold">
                                  Exam Scoring Tip: {qa.examTip}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB E: CHAPTER-WISE ONLINE TEST (INTERACTIVE 10 MCQs + SCORE + EXPLANATION + RETRY) */}
              {activeSectionTab === 'chapter_test' && activeChapterTest && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                        100% Free Chapter Practice Test • Instant Auto-Grading
                      </span>
                      <h3 className="text-lg font-display font-black text-white">
                        Ch {activeChapterTest.chapterNumber}: {activeChapterTest.chapterTitle}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {activeChapterTest.questions.length} Questions · {activeChapterTest.totalMarks} Marks · Suggested Time: {activeChapterTest.durationMinutes} Mins
                      </p>
                    </div>
                    {chapterTestBestResults[activeChapterTest.id] && (
                      <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-right shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                          Best Local Score ({chapterTestBestResults[activeChapterTest.id].attempts} attempts)
                        </p>
                        <p className="text-base font-black text-white tabular-nums">
                          {chapterTestBestResults[activeChapterTest.id].bestScore} /{' '}
                          {chapterTestBestResults[activeChapterTest.id].totalQuestions}
                        </p>
                      </div>
                    )}
                  </div>

                  {testSubmitted && (
                    <div
                      className={`p-5 rounded-2xl border space-y-3 ${
                        testScoreSummary.percentage >= 70
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-amber-50 border-amber-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-base font-black text-slate-900">
                            Test Result: {testScoreSummary.correct} / {testScoreSummary.total} Correct ({testScoreSummary.percentage}%)
                          </h4>
                          <p className="text-xs text-slate-700 font-medium">
                            {testScoreSummary.percentage >= 80
                              ? 'Excellent chapter mastery! Review the explanations below or try the Worksheets.'
                              : 'Review every explanation below and click Retry Chapter Test to aim for 90%+.'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRetryChapterTest}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry Chapter Test</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {activeChapterTest.questions.map((q, qIdx) => {
                      const picked = testAnswers[q.id];
                      const isCorrect = testSubmitted && picked === q.correctIndex;
                      const isWrong = testSubmitted && typeof picked === 'number' && picked !== q.correctIndex;
                      return (
                        <div
                          key={q.id}
                          className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                            testSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50/50 border-emerald-300'
                                : isWrong
                                ? 'bg-rose-50/50 border-rose-300'
                                : 'bg-slate-50 border-slate-200'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-indigo-700 tabular-nums">
                              Question {qIdx + 1} of {activeChapterTest.questions.length}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                              {q.difficulty}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 leading-relaxed">
                            {q.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => {
                              const selected = picked === oIdx;
                              const isRightOpt = testSubmitted && oIdx === q.correctIndex;
                              const isWrongSelected = testSubmitted && selected && oIdx !== q.correctIndex;
                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  disabled={testSubmitted}
                                  onClick={() =>
                                    setTestAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: oIdx,
                                    }))
                                  }
                                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                                    isRightOpt
                                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                      : isWrongSelected
                                      ? 'bg-rose-600 text-white border-rose-600'
                                      : selected
                                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                                      : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 cursor-pointer'
                                  }`}
                                >
                                  <span className="font-mono mr-1.5">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                          {testSubmitted && (
                            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed">
                              <strong className="text-emerald-800">
                                Correct Answer ({String.fromCharCode(65 + q.correctIndex)}):{' '}
                              </strong>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!testSubmitted && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs font-semibold text-slate-600 tabular-nums">
                        Answered {testScoreSummary.answered} of {testScoreSummary.total} questions
                      </span>
                      <button
                        type="button"
                        onClick={handleSubmitChapterTest}
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer shadow-xs"
                      >
                        Submit Chapter Test &amp; Check Answers
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB F & TAB G: MODEL QUESTION PAPERS & PREVIOUS YEAR QUESTION PAPERS (PYQs) */}
              {(activeSectionTab === 'model_papers' || activeSectionTab === 'pyq_papers') && (() => {
                const isPyqTab = activeSectionTab === 'pyq_papers';
                const papers = isPyqTab ? examPapersBundle.pyqPapers : examPapersBundle.modelPapers;
                const activePaperIdx = isPyqTab ? selectedPyqPaperIdx : selectedModelPaperIdx;
                const activePaper = papers[activePaperIdx] || papers[0];
                if (!activePaper) return null;

                return (
                  <div className="space-y-6">
                    {/* Paper Header Card */}
                    <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 space-y-3 border border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold uppercase tracking-wider text-amber-300">
                          {activePaper.boardPatternLabel}
                        </span>
                        <span className="font-semibold text-emerald-300 tabular-nums">
                          Time: {activePaper.durationLabel} · Max Marks: {activePaper.totalMarks}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white">
                        {activePaper.title}
                      </h3>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {activePaper.generalInstructions.map((inst, i) => (
                          <li key={i}>• {inst}</li>
                        ))}
                      </ul>
                      <div className="pt-1 flex flex-wrap items-center gap-3">
                        <a
                          href={activePaper.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5"
                        >
                          <span>{activePaper.officialPortalName}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            const keys: string[] = [];
                            activePaper.sections.forEach((sec, sIdx) => {
                              sec.questions.forEach((_q, qIdx) => {
                                keys.push(`${activePaper.id}-${sIdx}-${qIdx}`);
                              });
                            });
                            const allOpen = keys.every((k) => revealedPaperAnswers[k]);
                            const next = { ...revealedPaperAnswers };
                            keys.forEach((k) => {
                              next[k] = !allOpen;
                            });
                            setRevealedPaperAnswers(next);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black cursor-pointer transition-colors"
                        >
                          Toggle All Marking Scheme Solutions
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            printExamPaperA4({
                              paper: activePaper,
                              includeSolutions: false,
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Paper A4 PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            printExamPaperA4({
                              paper: activePaper,
                              includeSolutions: true,
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Paper + Solutions PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Paper Sections */}
                    <div className="space-y-5">
                      {activePaper.sections.map((sec, sIdx) => {
                        const pq = paperSearchQuery.trim().toLowerCase();
                        const visibleQs = pq
                          ? sec.questions.filter((qItem) =>
                              `${qItem.qNo} ${qItem.question} ${qItem.modelAnswer}`.toLowerCase().includes(pq)
                            )
                          : sec.questions;
                        if (pq && visibleQs.length === 0) return null;
                        return (
                        <section
                          key={sIdx}
                          className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                            <div>
                              <h4 className="text-sm font-black text-slate-900">
                                {sec.sectionTitle}
                              </h4>
                              <p className="text-xs text-slate-500">{sec.sectionInstructions}</p>
                            </div>
                            <span className="text-xs font-extrabold text-indigo-700 tabular-nums">
                              {sec.totalSectionMarks} Marks
                            </span>
                          </div>
                          <div className="space-y-3">
                            {visibleQs.map((qItem, qIdx) => {
                              const ansKey = `${activePaper.id}-${sIdx}-${qIdx}`;
                              const open = Boolean(revealedPaperAnswers[ansKey]);
                              return (
                                <div
                                  key={ansKey}
                                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                                      <span className="text-indigo-700 mr-1.5">{qItem.qNo}</span>
                                      {qItem.question}
                                    </p>
                                    <span className="text-[11px] font-bold text-slate-500 shrink-0 tabular-nums">
                                      [{qItem.marks}M]
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRevealedPaperAnswers((prev) => ({
                                        ...prev,
                                        [ansKey]: !prev[ansKey],
                                      }))
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-[11px] font-bold text-indigo-700 cursor-pointer"
                                  >
                                    {open ? 'Hide Official Model Solution' : 'View Official Model Solution'}
                                  </button>
                                  {open && (
                                    <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                                      <strong className="text-emerald-800">Marking Scheme Solution: </strong>
                                      {qItem.modelAnswer}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </section>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB H: EDUCATIONAL VIDEO LESSONS */}
              {activeSectionTab === 'video_lessons' && activeVideoLesson && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold uppercase tracking-wider text-rose-300">
                        {activeVideoLesson.providerName}
                      </span>
                      <span className="font-semibold text-emerald-300 tabular-nums">
                        Duration: {activeVideoLesson.durationLabel} · Mediums: {activeVideoLesson.mediums.join(', ')}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white">
                      {activeVideoLesson.lessonTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeVideoLesson.keyTakeaway}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={activeVideoLesson.dikshaSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Watch Chapter Video on DIKSHA</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {activeVideoLesson.ncertVideoUrl && (
                        <a
                          href={activeVideoLesson.ncertVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Search NCERT / PM eVIDYA Lecture</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={activeVideoLesson.officialVideoPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>Open Official Board Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Learning Objectives Covered
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {activeVideoLesson.learningObjectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Structured Lecture Timeline
                      </h4>
                      <ul className="space-y-2 text-xs font-mono text-slate-800">
                        {activeVideoLesson.lessonOutline.map((step, idx) => (
                          <li
                            key={idx}
                            className="p-2.5 rounded-xl bg-white border border-slate-200"
                          >
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: PROGRESS, RESULTS & SPECIAL ACADEMIC HUBS */}
              {(activeSectionTab === 'math_hub' ||
                activeSectionTab === 'science_diagrams' ||
                activeSectionTab === 'english_grammar' ||
                activeSectionTab === 'scholarship_olympiad') && (
                <div className="space-y-6">
                  {/* Subject Progress & Results Summary Card */}
                  <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white p-5 sm:p-6 border border-indigo-400/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                          Step 10 · Subject Progress &amp; Results Summary
                        </span>
                        <h3 className="text-lg sm:text-xl font-display font-black text-white">
                          {selectedBoard} · {selectedClass} · {selectedSubject} Mastery
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateTab('certificates')}
                        className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>View Certificates &amp; Full Report Card</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                          Verified Chapters
                        </span>
                        <span className="text-xl font-display font-black text-white tabular-nums">
                          {chapters.length}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                          Chapter Tests Taken
                        </span>
                        <span className="text-xl font-display font-black text-emerald-300 tabular-nums">
                          {Object.keys(chapterTestBestResults).length}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-200">
                          Checklist Items Done
                        </span>
                        <span className="text-xl font-display font-black text-amber-300 tabular-nums">
                          {Object.values(checkedItems).filter(Boolean).length}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-200">
                          Saved Bookmarks
                        </span>
                        <span className="text-xl font-display font-black text-purple-200 tabular-nums">
                          {bookmarks.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <StudyLibrarySpecialHubs
                    mode={activeSectionTab}
                    selectedBoard={selectedBoard}
                    selectedClass={selectedClass}
                    onNavigateTab={(tab) => onNavigateTab(tab)}
                  />
                </div>
              )}

              {/* Footer Next Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500 font-medium">
                  Completed "{activeChapter.chapterTitle}"? Practice next:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeSectionTab !== 'short_revision' && (
                    <button
                      type="button"
                      onClick={() => setActiveSectionTab('short_revision')}
                      className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold cursor-pointer"
                    >
                      1-Page Revision Sheet
                    </button>
                  )}
                  {activeSectionTab !== 'chapter_test' && (
                    <button
                      type="button"
                      onClick={() => setActiveSectionTab('chapter_test')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold cursor-pointer"
                    >
                      Take Chapter Test (10 MCQs)
                    </button>
                  )}
                  {activeSectionTab !== 'video_lessons' && (
                    <button
                      type="button"
                      onClick={() => setActiveSectionTab('video_lessons')}
                      className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-950 text-xs font-bold cursor-pointer"
                    >
                      Watch Video Lesson
                    </button>
                  )}
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
            </article>
          ) : isSpecialHubTab ? (
            <StudyLibrarySpecialHubs
              mode={activeSectionTab as 'math_hub' | 'science_diagrams' | 'english_grammar' | 'scholarship_olympiad'}
              selectedBoard={selectedBoard}
              selectedClass={selectedClass}
              onNavigateTab={(tab) => onNavigateTab(tab)}
            />
          ) : inlineAdditional ? (
            <InlineAdditionalSubjectPanel
              resolution={inlineAdditional}
              board={selectedBoard}
              classLevel={selectedClass}
              medium={effectiveMedium}
              userId={currentStudent?.id}
              initialMode={
                activeSectionTab === 'worksheets_ref'
                  ? 'worksheet'
                  : activeSectionTab === 'chapter_test'
                  ? 'quiz'
                  : activeSectionTab === 'qa_bank' ||
                    activeSectionTab === 'model_papers' ||
                    activeSectionTab === 'pyq_papers'
                  ? 'qa'
                  : 'notes'
              }
              initialChapterNumber={pendingChapterNumber || undefined}
              onOpenFullWorkspace={
                onOpenAdditionalCurriculum
                  ? () =>
                      onOpenAdditionalCurriculum({
                        board: selectedBoard,
                        classLevel: selectedClass,
                        medium: effectiveMedium,
                        subjectId: inlineAdditional.additionalSubject.id,
                      })
                  : undefined
              }
            />
          ) : (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{getSyllabusStatusPresentation(syllabusResolution).badgeLabel}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">
                {selectedBoard} Board · {selectedMedium} Medium · {selectedClass} · {selectedSubject}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                {getSyllabusStatusPresentation(syllabusResolution).message}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {onOpenAdditionalCurriculum &&
                  syllabusResolution.verificationStatus === 'NOT_PUBLISHED_AS_STANDALONE' &&
                  (() => {
                    const matchedAddSubj = resolveAdditionalSubjectForBlockedEntry(
                      selectedSubject,
                      selectedBoard,
                      selectedMedium
                    );
                    if (!matchedAddSubj) return null;
                    return (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenAdditionalCurriculum({
                            board: selectedBoard,
                            classLevel: selectedClass,
                            medium: selectedMedium,
                            subjectId: matchedAddSubj.id,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>
                          Explore {matchedAddSubj.name} in {ADDITIONAL_CURRICULUM_LABEL}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    );
                  })()}
                <button
                  type="button"
                  onClick={() => setActiveSectionTab('math_hub')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Open Special Academic Hubs
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
        );
      })()}

      {/* Compact Local Bookmarks & Recently Viewed Bar (Below Content — 0 Firestore Reads/Writes) */}
      {(bookmarks.length > 0 || recentItems.length > 0) && (
        <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Saved Bookmarks on This Device ({bookmarks.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {bookmarks.slice(0, 6).map((bm) => (
                  <button
                    key={bm.id}
                    type="button"
                    onClick={() => {
                      setSelectedBoard(bm.board);
                      setSelectedClass(bm.classLevel);
                      setSelectedSubject(bm.subject as SubjectName);
                      if (bm.chapterNumber) setSelectedChapterIdx(bm.chapterNumber - 1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 border border-amber-200 text-[11px] font-semibold text-slate-800 cursor-pointer"
                  >
                    {bm.board} · {bm.classLevel} · {bm.subject} — {bm.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recentItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Recently Viewed Chapters</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {recentItems.slice(0, 6).map((rc) => (
                  <button
                    key={rc.id}
                    type="button"
                    onClick={() => {
                      setSelectedBoard(rc.board);
                      setSelectedClass(rc.classLevel);
                      setSelectedSubject(rc.subject as SubjectName);
                      if (rc.chapterNumber) setSelectedChapterIdx(rc.chapterNumber - 1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 cursor-pointer"
                  >
                    {rc.board} · {rc.classLevel} · {rc.subject} — {rc.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
