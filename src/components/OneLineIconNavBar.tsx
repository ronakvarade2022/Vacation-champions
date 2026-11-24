import React from 'react';
import {
  Archive,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Library,
  PlayCircle,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import type { ClassLevel, EducationBoard, SubjectName } from '../types';
import type { StudyLibrarySectionTab } from './StudyMaterialsView';

export interface OneLineNavOption<T extends string = string> {
  id: T;
  label: string;
  shortLabel?: string;
  emoji?: string;
  icon?: React.FC<{ className?: string }>;
  badge?: string | number;
  accentColor?: 'navy' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
  hidden?: boolean;
}

interface OneLineIconNavBarProps<T extends string = string> {
  items: OneLineNavOption<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  ariaLabel?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

const ACCENT_ACTIVE_CLASSES: Record<
  NonNullable<OneLineNavOption['accentColor']>,
  string
> = {
  navy: 'bg-[#0f2952] text-white border-amber-400 shadow-xs ring-2 ring-amber-300/50',
  indigo: 'bg-indigo-700 text-white border-amber-300 shadow-xs ring-2 ring-indigo-300/50',
  emerald: 'bg-emerald-700 text-white border-amber-300 shadow-xs ring-2 ring-emerald-300/50',
  amber: 'bg-amber-500 text-slate-950 border-[#0f2952] shadow-xs ring-2 ring-amber-300/60',
  rose: 'bg-rose-700 text-white border-amber-300 shadow-xs ring-2 ring-rose-300/50',
  purple: 'bg-purple-700 text-white border-amber-300 shadow-xs ring-2 ring-purple-300/50',
};

export function OneLineIconNavBar<T extends string = string>({
  items,
  activeId,
  onSelect,
  ariaLabel = 'Section Icon Navigation',
  title,
  subtitle,
  compact = false,
  className = '',
}: OneLineIconNavBarProps<T>) {
  const visibleItems = items.filter((item) => !item.hidden);
  if (visibleItems.length === 0) return null;

  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200/90 shadow-2xs px-3 sm:px-4 py-2.5 space-y-2 ${className}`}
    >
      {(title || subtitle) && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
          {title && (
            <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-[11px] font-bold text-slate-500">
              {subtitle}
            </span>
          )}
        </div>
      )}

      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar"
      >
        {visibleItems.map((item) => {
          const isActive = item.id === activeId;
          const IconComp = item.icon;
          const activeClass =
            ACCENT_ACTIVE_CLASSES[item.accentColor || 'navy'];

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(item.id)}
              className={`shrink-0 whitespace-nowrap ${
                compact
                  ? 'min-h-[38px] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs'
                  : 'min-h-[42px] px-3 sm:px-3.5 py-2 text-xs'
              } rounded-xl border-2 font-display font-extrabold flex items-center gap-1.5 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                isActive
                  ? activeClass
                  : 'bg-slate-50/90 hover:bg-sky-50/90 text-slate-800 border-slate-200/90 hover:border-sky-300'
              }`}
            >
              {item.emoji ? (
                <span className="text-sm sm:text-base leading-none shrink-0" aria-hidden="true">
                  {item.emoji}
                </span>
              ) : IconComp ? (
                <IconComp
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                    isActive ? 'text-amber-300' : 'text-[#0f2952]'
                  }`}
                />
              ) : null}

              <span>{item.label}</span>

              {item.badge !== undefined && item.badge !== '' && (
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-black tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-amber-200'
                      : 'bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type QuickLearningNavId =
  | 'subjects'
  | 'chapters'
  | 'worksheets'
  | 'notes'
  | 'practice_questions'
  | 'mcqs'
  | 'tests'
  | 'previous_papers'
  | 'results'
  | 'additional_curriculum';

interface QuickStudyZoneIconBarProps {
  activeItem?: QuickLearningNavId;
  board?: EducationBoard;
  classLevel?: ClassLevel;
  subject?: SubjectName;
  counts?: {
    subjects?: number;
    chapters?: number;
    worksheets?: number;
    notes?: number;
    mcqs?: number;
    tests?: number;
    previousPapers?: number;
  };
  onNavigate?: (
    target: QuickLearningNavId,
    studyTab?: StudyLibrarySectionTab
  ) => void;
  onOpenSubjects?: () => void;
  onOpenChapters?: () => void;
  onOpenWorksheets?: () => void;
  onOpenNotes?: () => void;
  onOpenPracticeQuestions?: () => void;
  onOpenMcqs?: () => void;
  onOpenTests?: () => void;
  onOpenPreviousPapers?: () => void;
  onOpenResults?: () => void;
  onOpenAdditionalCurriculum?: () => void;
  className?: string;
}

/**
 * Universal One-Line Icon Navigation Bar across Subjects, Chapters, Worksheets,
 * Notes, Practice Q&A, MCQs, Tests, Previous Papers, Results & Additional Curriculum.
 */
export const QuickStudyZoneIconBar: React.FC<QuickStudyZoneIconBarProps> = ({
  activeItem = 'subjects',
  board,
  classLevel,
  subject,
  counts,
  onNavigate,
  onOpenSubjects,
  onOpenChapters,
  onOpenWorksheets,
  onOpenNotes,
  onOpenPracticeQuestions,
  onOpenMcqs,
  onOpenTests,
  onOpenPreviousPapers,
  onOpenResults,
  onOpenAdditionalCurriculum,
  className = '',
}) => {
  const scopeText = [board, classLevel, subject && subject !== ('ALL' as any) ? subject : undefined]
    .filter(Boolean)
    .join(' · ');

  const options: OneLineNavOption<QuickLearningNavId>[] = [
    {
      id: 'subjects',
      emoji: '📚',
      label: 'Subjects',
      icon: Layers,
      badge: counts?.subjects,
      accentColor: 'navy',
    },
    {
      id: 'chapters',
      emoji: '📖',
      label: 'Chapters',
      icon: Library,
      badge: counts?.chapters,
      accentColor: 'navy',
    },
    {
      id: 'notes',
      emoji: '📄',
      label: 'Study Notes',
      icon: BookOpen,
      badge: counts?.notes,
      accentColor: 'emerald',
    },
    {
      id: 'worksheets',
      emoji: '📝',
      label: 'Worksheets',
      icon: FileText,
      badge: counts?.worksheets,
      accentColor: 'indigo',
    },
    {
      id: 'practice_questions',
      emoji: '✍️',
      label: 'Practice Q&A',
      icon: HelpCircle,
      accentColor: 'navy',
    },
    {
      id: 'mcqs',
      emoji: '❓',
      label: 'MCQ Practice',
      icon: Sparkles,
      badge: counts?.mcqs,
      accentColor: 'amber',
    },
    {
      id: 'tests',
      emoji: '📋',
      label: 'Tests & Exams',
      icon: ClipboardList,
      badge: counts?.tests,
      accentColor: 'rose',
    },
    {
      id: 'previous_papers',
      emoji: '🗂️',
      label: 'Previous Papers',
      icon: Archive,
      badge: counts?.previousPapers,
      accentColor: 'navy',
    },
    {
      id: 'results',
      emoji: '🏆',
      label: 'Results & Progress',
      icon: Trophy,
      accentColor: 'purple',
    },
    {
      id: 'additional_curriculum',
      emoji: '🌟',
      label: 'Additional Curriculum',
      icon: GraduationCap,
      accentColor: 'indigo',
    },
  ];

  const handleSelect = (id: QuickLearningNavId) => {
    if (onNavigate) {
      const tabMap: Partial<Record<QuickLearningNavId, StudyLibrarySectionTab>> = {
        chapters: 'textbooks',
        notes: 'chapter_notes',
        practice_questions: 'qa_bank',
        tests: 'model_papers',
        previous_papers: 'pyq_papers',
      };
      onNavigate(id, tabMap[id]);
      return;
    }
    switch (id) {
      case 'subjects':
        onOpenSubjects?.();
        break;
      case 'chapters':
        onOpenChapters?.();
        break;
      case 'worksheets':
        onOpenWorksheets?.();
        break;
      case 'notes':
        onOpenNotes?.();
        break;
      case 'practice_questions':
        onOpenPracticeQuestions?.();
        break;
      case 'mcqs':
        onOpenMcqs?.();
        break;
      case 'tests':
        onOpenTests?.();
        break;
      case 'previous_papers':
        onOpenPreviousPapers?.();
        break;
      case 'results':
        onOpenResults?.();
        break;
      case 'additional_curriculum':
        onOpenAdditionalCurriculum?.();
        break;
    }
  };

  return (
    <OneLineIconNavBar
      items={options}
      activeId={activeItem}
      onSelect={handleSelect}
      title="Quick Learning Navigation"
      subtitle={scopeText ? `Active Scope: ${scopeText}` : 'One-Click Section Switcher'}
      ariaLabel="Quick Learning Icon Navigation"
      compact
      className={className}
    />
  );
};

/**
 * 10-Step Structured Subject Material Sequence Bar
 * Used inside StudyMaterialsView and AllCoursesExplorerView when a student opens a subject:
 * 1. Subject Overview
 * 2. Chapters
 * 3. Chapter-wise Learning Materials
 * 4. Study Notes
 * 5. Worksheets
 * 6. Practice Questions
 * 7. MCQ Practice
 * 8. Tests and Assessments
 * 9. Previous Question Papers
 * 10. Progress and Results
 */
export interface SubjectSequenceCounts {
  hasChapters: boolean;
  chaptersCount: number;
  textbooksCount: number;
  videosCount: number;
  worksheetsCount?: number;
  qaCount?: number;
  modelPapersCount: number;
  pyqPapersCount: number;
}

interface SubjectMaterialSequenceBarProps {
  activeTab: StudyLibrarySectionTab;
  onSelectTab: (tab: StudyLibrarySectionTab) => void;
  counts: SubjectSequenceCounts;
  subjectName: string;
  boardLabel: string;
  classLabel: string;
  mediumLabel?: string;
}

export const SubjectMaterialSequenceBar: React.FC<SubjectMaterialSequenceBarProps> = ({
  activeTab,
  onSelectTab,
  counts,
  subjectName,
  boardLabel,
  classLabel,
  mediumLabel,
}) => {
  const isSpecialHub =
    activeTab === 'math_hub' ||
    activeTab === 'science_diagrams' ||
    activeTab === 'english_grammar' ||
    activeTab === 'scholarship_olympiad';

  const normalizedActiveTab: StudyLibrarySectionTab = isSpecialHub
    ? 'math_hub'
    : activeTab;

  const sequenceItems: OneLineNavOption<StudyLibrarySectionTab>[] = [
    {
      id: 'textbooks',
      emoji: '📚',
      label: '1. Subject Overview',
      icon: Library,
      badge: counts.textbooksCount > 0 ? `${counts.textbooksCount} Books` : undefined,
      accentColor: 'navy',
    },
    {
      id: 'chapter_notes',
      emoji: '📄',
      label: '2. Study Notes',
      icon: BookOpen,
      badge: counts.chaptersCount > 0 ? counts.chaptersCount : undefined,
      accentColor: 'emerald',
      hidden: !counts.hasChapters,
    },
    {
      id: 'textbook_solutions',
      emoji: '📘',
      label: '3. Textbook Solutions',
      icon: ClipboardCheck,
      badge: counts.hasChapters ? 'Solved' : undefined,
      accentColor: 'indigo',
      hidden: !counts.hasChapters,
    },
    {
      id: 'class_notebook',
      emoji: '📓',
      label: '4. Complete Class Notes',
      icon: FileText,
      badge: counts.hasChapters ? '10 Ex + Key' : undefined,
      accentColor: 'amber',
      hidden: !counts.hasChapters,
    },
    {
      id: 'qa_bank',
      emoji: '✍️',
      label: '5. Important Q&A',
      icon: HelpCircle,
      badge: counts.hasChapters ? '9 Formats' : undefined,
      accentColor: 'navy',
      hidden: !counts.hasChapters,
    },
    {
      id: 'word_meanings',
      emoji: '🔤',
      label: '6. Word Meanings & Defs',
      icon: Sparkles,
      badge: counts.hasChapters ? 'Glossary' : undefined,
      accentColor: 'purple',
      hidden: !counts.hasChapters,
    },
    {
      id: 'practice_questions',
      emoji: '🎯',
      label: '7. Practice Questions',
      icon: CheckCircle2,
      badge: counts.hasChapters ? 'Extra' : undefined,
      accentColor: 'emerald',
      hidden: !counts.hasChapters,
    },
    {
      id: 'short_revision',
      emoji: '🎓',
      label: '8. Chapter Revision',
      icon: Zap,
      badge: counts.hasChapters ? '1-Page' : undefined,
      accentColor: 'amber',
      hidden: !counts.hasChapters,
    },
    {
      id: 'worksheets_ref',
      emoji: '📝',
      label: '9. Existing Worksheets',
      icon: FileText,
      badge: counts.worksheetsCount && counts.worksheetsCount > 0 ? counts.worksheetsCount : undefined,
      accentColor: 'indigo',
      hidden: !counts.hasChapters,
    },
    {
      id: 'chapter_test',
      emoji: '❓',
      label: '10. Existing MCQs',
      icon: ClipboardList,
      badge: counts.hasChapters ? '10 MCQs' : undefined,
      accentColor: 'emerald',
      hidden: !counts.hasChapters,
    },
    {
      id: 'video_lessons',
      emoji: '🎬',
      label: '11. Video Lessons',
      icon: PlayCircle,
      badge: counts.chaptersCount > 0 ? counts.chaptersCount : undefined,
      accentColor: 'rose',
      hidden: !counts.hasChapters,
    },
    {
      id: 'model_papers',
      emoji: '📋',
      label: '12. Model Papers',
      icon: Award,
      badge: counts.modelPapersCount > 0 ? counts.modelPapersCount : undefined,
      accentColor: 'rose',
      hidden: !counts.hasChapters || counts.modelPapersCount === 0,
    },
    {
      id: 'pyq_papers',
      emoji: '🗂️',
      label: '13. Previous Papers',
      icon: Archive,
      badge: counts.pyqPapersCount > 0 ? counts.pyqPapersCount : undefined,
      accentColor: 'navy',
      hidden: !counts.hasChapters || counts.pyqPapersCount === 0,
    },
    {
      id: 'math_hub',
      emoji: '🏆',
      label: counts.hasChapters ? '14. Progress & Hubs' : '2. Special Hubs & Enrichment',
      icon: Trophy,
      badge: 'Results + 4 Hubs',
      accentColor: 'purple',
    },
  ];

  const pathLabel = [boardLabel, mediumLabel, classLabel, subjectName]
    .filter(Boolean)
    .join(' → ');

  return (
    <OneLineIconNavBar
      items={sequenceItems}
      activeId={normalizedActiveTab}
      onSelect={onSelectTab}
      title={`${subjectName} — Ordered Learning Sequence`}
      subtitle={pathLabel}
      ariaLabel={`${subjectName} Learning Materials Sequence`}
      className="border-0 rounded-none bg-slate-50/90 border-b-2 border-slate-200 shadow-none"
    />
  );
};
