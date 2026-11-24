import React, { useState, useMemo } from 'react';
import { EducationBoard, ClassLevel, SubjectName } from '../types';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta,
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { useApp } from '../context/AppContext';
import {
  FREE_ALLOWED_SUBJECTS,
  getBoardShortLabel,
  getClassSubscriptionInfo,
} from '../utils/subscriptionAccess';
import {
  BookOpen,
  FileText,
  Layers,
  CheckCircle2,
  Crown,
  Play,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
} from 'lucide-react';
import { SectionOrientationGuide } from './SectionOrientationGuide';
import { QuickStudyZoneIconBar } from './OneLineIconNavBar';
import type { StudyLibrarySectionTab } from './StudyMaterialsView';
import {
  getEffectiveSyllabusForConsumer,
  getSyllabusStatusPresentation,
} from '../services/centralSyllabusService';
import {
  resolveAdditionalSubjectForBlockedEntry,
  resolveInlineAdditionalCurriculumFallback,
} from '../services/additionalCurriculumService';
import { ADDITIONAL_CURRICULUM_LABEL } from '../types/additionalCurriculum';
import type { InstructionMedium } from '../types/lessonPlanner';
import { InlineAdditionalSubjectPanel } from './InlineAdditionalSubjectPanel';

interface AllCoursesExplorerViewProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (classLevel: ClassLevel) => void;
  onOpenSubjectPractice: (
    board: EducationBoard,
    classLevel: ClassLevel,
    subject: SubjectName,
    mode: 'quizzes' | 'worksheets' | 'study-materials',
    studyTab?: StudyLibrarySectionTab
  ) => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onBackHome: () => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAdditionalCurriculum?: (ctx: {
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: InstructionMedium;
    subjectId?: string;
  }) => void;
}

export const AllCoursesExplorerView: React.FC<AllCoursesExplorerViewProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenSubjectPractice,
  onOpenMembership,
  onBackHome,
  onNavigateTab,
  onOpenAdditionalCurriculum,
}) => {
  const { currentStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubject, setExpandedSubject] = useState<SubjectName | null>(null);

  const boardMeta = getEducationBoardMeta(selectedBoard);
  const subjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const filteredSubjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => {
      const meta = getSubjectMeta(s, selectedBoard);
      return (
        s.toLowerCase().includes(q) ||
        meta.description.toLowerCase().includes(q) ||
        meta.chaptersSummary.toLowerCase().includes(q)
      );
    });
  }, [subjects, searchTerm, selectedBoard]);

  const classSubInfo = getClassSubscriptionInfo(
    currentStudent,
    selectedClass,
    undefined,
    selectedBoard
  );

  const defaultSubj = filteredSubjects[0] || subjects[0] || ('Mathematics' as SubjectName);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home Dashboard</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-extrabold">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 2 · Courses (Maharashtra · CBSE · ICSE)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
              Courses Directory (Classes 1 to 10)
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
              Explore structured class-wise learning programmes organised strictly by Education Board, Class (1–10), Subject-wise courses, and the 10-step Chapter-wise material sequence.
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-amber-300">{subjects.length}</p>
              <p className="text-[10px] text-slate-200 font-bold">Subjects ({selectedClass})</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-emerald-300">Classes 1–10</p>
              <p className="text-[10px] text-slate-200 font-bold">{getBoardShortLabel(selectedBoard)}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-sky-300">₹99 / Yr</p>
              <p className="text-[10px] text-slate-200 font-bold">365-Day Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal One-Line Icon Quick Navigation Bar */}
      <QuickStudyZoneIconBar
        activeItem="subjects"
        onOpenSubjects={() => {
          window.scrollTo({ top: 320, behavior: 'smooth' });
        }}
        onOpenChapters={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'video_lessons')
        }
        onOpenWorksheets={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'worksheets')
        }
        onOpenNotes={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'chapter_notes')
        }
        onOpenPracticeQuestions={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'qa_bank')
        }
        onOpenMcqs={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'quizzes')
        }
        onOpenTests={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'model_papers')
        }
        onOpenPreviousPapers={() =>
          onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'pyq_papers')
        }
        onOpenResults={() =>
          onNavigateTab
            ? onNavigateTab('certificates')
            : onOpenSubjectPractice(selectedBoard, selectedClass, defaultSubj, 'study-materials', 'math_hub')
        }
        onOpenAdditionalCurriculum={
          onOpenAdditionalCurriculum
            ? () =>
                onOpenAdditionalCurriculum({
                  board: selectedBoard,
                  classLevel: selectedClass,
                  medium: (currentStudent?.medium as InstructionMedium) || 'English',
                })
            : undefined
        }
      />

      {/* 3-Question Orientation Guide */}
      <SectionOrientationGuide
        sectionNumber="Section 2 · Courses"
        sectionTitle="Class-Wise & Subject-Wise Courses"
        whatIsThis="All structured class-wise school courses organised by Maharashtra State Board, CBSE, and ICSE."
        whatCanILearn="Classes 1 to 10 subject-wise courses and chapter-wise lessons aligned 100% to your board."
        whatShouldIClick="1. Select your Board below → 2. Pick your Class (1–10) → 3. Click any icon in the 10-Step Subject Material Bar on any Subject card."
        accentTheme="indigo"
      />

      {/* Step 1: Select Education Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BOARD_META_LIST.map((b) => {
          const isSelected = selectedBoard === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                onSelectBoard(b.id);
                setExpandedSubject(null);
              }}
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-amber-50/70 border-amber-500 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      Step 1 · {b.badgeText}
                    </p>
                    <h2 className="font-display font-extrabold text-base text-slate-900">
                      {b.shortLabel}
                    </h2>
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{b.description}</p>
            </button>
          );
        })}
      </div>

      {/* Step 2: Select Class (1 to 10) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Step 2 · {boardMeta.fullName}
            </p>
            <h2 className="text-lg font-display font-extrabold text-slate-900">
              Select Class (Classes 1 to 10)
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${selectedClass} subjects or lessons...`}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {ALL_10_CLASSES_META.map((cls) => {
            const active = selectedClass === cls.classLevel;
            return (
              <button
                key={cls.classLevel}
                type="button"
                onClick={() => {
                  onSelectClass(cls.classLevel);
                  setExpandedSubject(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                {cls.classLevel}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-600 font-semibold">
            Step 3 · Showing <strong className="text-slate-900">{filteredSubjects.length}</strong>{' '}
            subject-wise courses for{' '}
            <strong className="text-slate-900">
              {getBoardShortLabel(selectedBoard)} · {selectedClass}
            </strong>
          </div>
          <button
            type="button"
            onClick={() => onOpenMembership(selectedClass, selectedBoard)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>
              {classSubInfo.isPaidActive
                ? `${getBoardShortLabel(selectedBoard)} · ${selectedClass} Unlocked`
                : `Unlock ${getBoardShortLabel(selectedBoard)} ${selectedClass} — ₹99 / 365 Days`}
            </span>
          </button>
        </div>
      </div>

      {/* Step 3: Subject-Wise Courses & Ordered 10-Step Subject Material Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subjectName) => {
          const meta = getSubjectMeta(subjectName, selectedBoard);
          const isFreeSub = FREE_ALLOWED_SUBJECTS.includes(subjectName);
          const effectiveMedium = (currentStudent?.medium as InstructionMedium) || 'English';
          const chapters = getStudyMaterialsForSubject(
            selectedBoard,
            selectedClass,
            subjectName,
            effectiveMedium
          );
          const syllabusResolution = getEffectiveSyllabusForConsumer({
            board: selectedBoard,
            classLevel: selectedClass,
            subject: subjectName,
            medium: effectiveMedium,
          });
          const statusPresentation = getSyllabusStatusPresentation(syllabusResolution);
          const inlineAdditional =
            chapters.length === 0
              ? resolveInlineAdditionalCurriculumFallback({
                  board: selectedBoard,
                  classLevel: selectedClass,
                  subject: subjectName,
                  medium: effectiveMedium,
                })
              : null;
          const additionalMapping =
            !inlineAdditional && syllabusResolution.verificationStatus === 'NOT_PUBLISHED_AS_STANDALONE'
              ? resolveAdditionalSubjectForBlockedEntry(subjectName, selectedBoard, effectiveMedium)
              : null;
          const isExpanded = expandedSubject === subjectName;

          const sequenceSteps: Array<{
            id: string;
            stepNum: number;
            icon: string;
            label: string;
            onClick: () => void;
          }> = [
            {
              id: 'overview',
              stepNum: 1,
              icon: '📚',
              label: '1. Overview',
              onClick: () =>
                onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'textbooks'),
            },
            ...(chapters.length > 0
              ? [
                  {
                    id: 'chapters',
                    stepNum: 2,
                    icon: '📖',
                    label: `2. Chapters (${chapters.length})`,
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'video_lessons'),
                  },
                  {
                    id: 'chapter_materials',
                    stepNum: 3,
                    icon: '🎓',
                    label: '3. Chapter Materials',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'short_revision'),
                  },
                  {
                    id: 'notes',
                    stepNum: 4,
                    icon: '📄',
                    label: '4. Study Notes',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'chapter_notes'),
                  },
                  {
                    id: 'worksheets',
                    stepNum: 5,
                    icon: '📝',
                    label: '5. Worksheets',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'worksheets'),
                  },
                  {
                    id: 'practice_qs',
                    stepNum: 6,
                    icon: '✍️',
                    label: '6. Practice Q&A',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'qa_bank'),
                  },
                  {
                    id: 'mcqs',
                    stepNum: 7,
                    icon: '❓',
                    label: '7. MCQ Practice',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'chapter_test'),
                  },
                  {
                    id: 'tests',
                    stepNum: 8,
                    icon: '📋',
                    label: '8. Tests & Exams',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'model_papers'),
                  },
                  {
                    id: 'pyqs',
                    stepNum: 9,
                    icon: '🗂️',
                    label: '9. Previous Papers',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'pyq_papers'),
                  },
                ]
              : inlineAdditional
              ? [
                  {
                    id: 'modules',
                    stepNum: 2,
                    icon: '📖',
                    label: `2. Modules (${inlineAdditional.chapters.length})`,
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'chapter_notes'),
                  },
                  {
                    id: 'notes',
                    stepNum: 3,
                    icon: '📄',
                    label: '3. Study Notes',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'chapter_notes'),
                  },
                  {
                    id: 'worksheets',
                    stepNum: 4,
                    icon: '📝',
                    label: '4. Worksheets',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'worksheets'),
                  },
                  {
                    id: 'practice_qs',
                    stepNum: 5,
                    icon: '✍️',
                    label: '5. Practice Q&A',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'qa_bank'),
                  },
                  {
                    id: 'mcqs',
                    stepNum: 6,
                    icon: '❓',
                    label: '6. MCQ Practice',
                    onClick: () =>
                      onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'chapter_test'),
                  },
                ]
              : []),
            {
              id: 'results',
              stepNum: 10,
              icon: '🏆',
              label: '10. Progress & Hubs',
              onClick: () =>
                onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'math_hub'),
            },
          ];

          return (
            <div
              key={`${selectedBoard}-${selectedClass}-${subjectName}`}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                        {subjectName}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-500">
                        {getBoardShortLabel(selectedBoard)} · {selectedClass} ·{' '}
                        {chapters.length > 0
                          ? `${chapters.length} Verified Chapters`
                          : inlineAdditional
                          ? `${inlineAdditional.chapters.length} Supplementary Modules`
                          : statusPresentation.badgeLabel}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                      chapters.length === 0 && !inlineAdditional
                        ? 'bg-amber-100 text-amber-900'
                        : inlineAdditional
                        ? 'bg-indigo-100 text-indigo-900'
                        : isFreeSub || classSubInfo.isPaidActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {chapters.length === 0
                      ? inlineAdditional
                        ? inlineAdditional.isIntegratedIntoParent
                          ? 'Integrated + Modules'
                          : 'Enrichment Ready'
                        : statusPresentation.badgeLabel
                      : classSubInfo.isPaidActive
                      ? 'Unlocked'
                      : isFreeSub
                      ? 'Free Demo'
                      : '₹99 Course'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>

                {/* Ordered One-Line Icon Bar for this Subject (Steps 1 to 10) */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800">
                      Subject Learning Sequence (Click Icon to Open)
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {sequenceSteps.length} Steps
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {sequenceSteps.map((step) => (
                      <button
                        key={step.id}
                        type="button"
                        onClick={step.onClick}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-950 border border-slate-200/90 hover:border-indigo-300 font-extrabold text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-all shadow-2xs"
                      >
                        <span className="text-xs leading-none" aria-hidden="true">
                          {step.icon}
                        </span>
                        <span>{step.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expandable Chapter-Wise Lessons List */}
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSubject((prev) => (prev === subjectName ? null : subjectName))
                    }
                    className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-extrabold text-xs flex items-center justify-between cursor-pointer transition-colors border border-indigo-200/80"
                  >
                    <span>
                      {chapters.length > 0
                        ? `Ordered Chapter Sequence (${chapters.length} Chapters)`
                        : inlineAdditional
                        ? `Supplementary Modules (${inlineAdditional.chapters.length} Chapters)`
                        : `Official Textbook Status (${statusPresentation.badgeLabel})`}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-indigo-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-indigo-700" />
                    )}
                  </button>

                  {isExpanded && (
                    <div
                      className={`mt-2 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 overflow-y-auto ${
                        inlineAdditional && chapters.length === 0 ? 'p-2 max-h-[480px]' : 'p-3 max-h-60'
                      }`}
                    >
                      {chapters.length === 0 && inlineAdditional ? (
                        <InlineAdditionalSubjectPanel
                          resolution={inlineAdditional}
                          board={selectedBoard}
                          classLevel={selectedClass}
                          medium={effectiveMedium}
                          userId={currentStudent?.id}
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
                      ) : chapters.length === 0 ? (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-950">
                            {statusPresentation.badgeLabel}: {statusPresentation.message}
                          </div>
                          {additionalMapping && onOpenAdditionalCurriculum && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenAdditionalCurriculum({
                                  board: selectedBoard,
                                  classLevel: selectedClass,
                                  medium: effectiveMedium,
                                  subjectId: additionalMapping.id,
                                })
                              }
                              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>
                                Open {additionalMapping.name} in {ADDITIONAL_CURRICULUM_LABEL}
                              </span>
                            </button>
                          )}
                        </div>
                      ) : (
                        chapters.map((ch) => (
                          <div
                            key={ch.id}
                            className="p-2.5 rounded-xl bg-white border border-slate-200/80 space-y-2 text-xs"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900">
                                  Ch. {String(ch.chapterNumber).padStart(2, '0')}: {ch.chapterTitle}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {ch.overview}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenSubjectPractice(
                                    selectedBoard,
                                    selectedClass,
                                    subjectName,
                                    'study-materials',
                                    'chapter_notes'
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-extrabold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                📄 Notes
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenSubjectPractice(
                                    selectedBoard,
                                    selectedClass,
                                    subjectName,
                                    'study-materials',
                                    'short_revision'
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                🎓 Revision
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenSubjectPractice(
                                    selectedBoard,
                                    selectedClass,
                                    subjectName,
                                    'worksheets'
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-extrabold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                📝 Worksheet
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenSubjectPractice(
                                    selectedBoard,
                                    selectedClass,
                                    subjectName,
                                    'study-materials',
                                    'qa_bank'
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                ✍️ Q&amp;A
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenSubjectPractice(
                                    selectedBoard,
                                    selectedClass,
                                    subjectName,
                                    'study-materials',
                                    'chapter_test'
                                  )
                                }
                                className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                ❓ MCQs
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Cross-Section Links */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials', 'textbooks')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Open 10-Step Study Library for this Subject"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Study Material</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'worksheets')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Go to Worksheets for this Subject"
                >
                  <FileText className="w-3 h-3" />
                  <span>Worksheets</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'quizzes')
                  }
                  className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Go to 4-Level Quiz Practice for this Subject"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>4-Level Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
