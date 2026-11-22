import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { ClassLevel, EducationBoard, QuizLevel, SubjectName } from '../types';
import { useApp } from '../context/AppContext';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectMeta,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { getAllWorksheetsForClass } from '../data/worksheetsData';
import { ALL_BADGES, calculateLevel } from '../data/badgesData';
import { EDUCATION_ILLUSTRATIONS } from '../data/educationIllustrations';
import {
  formatStandardOrdinal,
  FREE_ALLOWED_SUBJECTS,
  getActivatedBoardClassesList,
  getBoardDisplayName,
  getBoardShortLabel,
  getStudentPlanInfo,
} from '../utils/subscriptionAccess';
import { SpecialCardIllustration } from './DashboardIllustrations';
import { SectionOrientationGuide } from './SectionOrientationGuide';
import { StudentMasteryChart } from './StudentMasteryChart';

export type ExplorerZoneType =
  | 'study-material'
  | 'practice-zone'
  | 'exam-zone'
  | 'performance'
  | 'plans';

export interface PublicZoneExplorerViewProps {
  zone: ExplorerZoneType;
  subFocus: string;
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onOpenAuth: (defaultTab: 'login' | 'register') => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onBackHome: () => void;
  onNavigateTab?: (tab: string, subject?: SubjectName, level?: QuizLevel) => void;
}

const ZONE_META: Record<
  ExplorerZoneType,
  {
    sectionNumber: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    whatIsThis: string;
    whatCanILearn: string;
    whatShouldIClick: string;
    accentTheme: 'blue' | 'amber' | 'emerald' | 'purple' | 'rose' | 'indigo';
  }
> = {
  'study-material': {
    sectionNumber: 'Section 4 · Study Material',
    eyebrow: 'Educational Reference Library',
    title: 'Notes, Worksheets, Chapter Summaries, PDFs, Question Banks & Study Guides',
    subtitle:
      'Access structured reference materials exclusively for your selected Board & Class without duplicating the Courses catalog.',
    whatIsThis: 'Your educational reference library for chapter notes, worksheets, summaries, PDFs, and solved question banks.',
    whatCanILearn: 'Notes, Worksheets, Chapter Summaries, Practice PDFs, Question Banks, and Study Guides.',
    whatShouldIClick: 'Choose one of the 6 Study Material tabs below, select your Subject, and open the chapter reference.',
    accentTheme: 'emerald',
  },
  'practice-zone': {
    sectionNumber: 'Section 5 · Practice Zone',
    eyebrow: 'Interactive Practice & Brain Games',
    title: 'Maths, English, Science, Reasoning, Brain Puzzles, Sudoku, Vocabulary & Memory Games',
    subtitle:
      'Practise subject skills and logical thinking through interactive activities with clear step-by-step instructions.',
    whatIsThis: 'Your interactive skill-building and educational brain-games arena.',
    whatCanILearn: 'Maths Practice, English Practice, Science Practice, Reasoning, Brain Puzzles, Sudoku, Vocabulary & Memory Games.',
    whatShouldIClick: 'Read the clear instructions on any of the 8 practice cards below and click Start Practice.',
    accentTheme: 'blue',
  },
  'exam-zone': {
    sectionNumber: 'Section 6 · Exam Zone',
    eyebrow: 'Formal Examinations & Timed Assessments',
    title: 'Chapter Tests, Subject Tests, Full Syllabus Tests, Scholarship Mocks & Competitive Exams',
    subtitle:
      'Review the exact number of questions, time limit, and difficulty level before starting any formal examination.',
    whatIsThis: 'Formal timed tests, mock examinations, and scholarship assessments.',
    whatCanILearn: 'Chapter Tests, Subject Tests, Full Syllabus Tests, Scholarship Mock Tests, Competitive Exams & Timed Assessments.',
    whatShouldIClick: 'Check the Question Count, Time Limit, and Difficulty badge on any test card below, then click Start Exam.',
    accentTheme: 'rose',
  },
  performance: {
    sectionNumber: 'Section 7 · Performance',
    eyebrow: 'Personal Student Report Card',
    title: 'Test Results, Marks, Accuracy, Learning Progress, Completed Courses, Certificates & Achievements',
    subtitle:
      'View your private personal performance metrics, 30-day mastery graphs, unlocked certificates, and badges.',
    whatIsThis: 'Your private personal report card showing only your own marks, accuracy, and achievements.',
    whatCanILearn: 'Test Results, Marks, Accuracy %, Learning Progress, Completed Courses, Certificates & Badges.',
    whatShouldIClick: 'Review your personal scorecard below or click Open Certificate Vault to download your certificates.',
    accentTheme: 'purple',
  },
  plans: {
    sectionNumber: 'Section 8 · Plans & Pricing',
    eyebrow: 'Transparent Annual Subscriptions',
    title: 'Free Learning Programmes, Board Plans (MH · CBSE · ICSE), Special Programmes & Purchased Content',
    subtitle:
      'Compare Free Forever access vs. ₹99 one-time payment for 365 days of complete Board + Class access.',
    whatIsThis: 'Complete subscription pricing, access duration, included benefits, and your purchased content.',
    whatCanILearn: 'Free Programmes, Maharashtra Plans, CBSE Plans, ICSE Plans, Special Programmes & Purchased Content.',
    whatShouldIClick: 'Select your Board & Class below and click Unlock for ₹99 (365 Days) or view your active plans.',
    accentTheme: 'amber',
  },
};

export const PublicZoneExplorerView: React.FC<PublicZoneExplorerViewProps> = ({
  zone,
  subFocus,
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenDemo,
  onOpenAuth,
  onOpenMembership,
  onBackHome,
  onNavigateTab,
}) => {
  const { currentStudent, allAttempts, getSubjectLevelProgress } = useApp();
  const boardMeta = useMemo(() => getEducationBoardMeta(selectedBoard), [selectedBoard]);
  const subjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const [previewSubject, setPreviewSubject] = useState<SubjectName>(subjects[0] || 'English');
  const [activeMaterialCategory, setActiveMaterialCategory] = useState<string>('sm-notes');
  const [visualError, setVisualError] = useState(false);

  const effectiveSubject = subjects.includes(previewSubject)
    ? previewSubject
    : subjects[0] || 'English';

  const chapters = useMemo(
    () => getStudyMaterialsForSubject(selectedBoard, selectedClass, effectiveSubject),
    [selectedBoard, selectedClass, effectiveSubject]
  );

  const zoneInfo = ZONE_META[zone];
  const zoneVisual =
    zone === 'study-material'
      ? EDUCATION_ILLUSTRATIONS.studyMaterialStem
      : zone === 'practice-zone'
      ? EDUCATION_ILLUSTRATIONS.practiceZoneWorksheets
      : zone === 'exam-zone'
      ? EDUCATION_ILLUSTRATIONS.examZoneMockTest
      : EDUCATION_ILLUSTRATIONS.boardsCurriculum;

  const triggerTab = (tab: string, subject?: SubjectName, level?: QuizLevel) => {
    if (onNavigateTab) {
      onNavigateTab(tab, subject, level);
    } else if (tab === 'puzzles' || tab === 'sudoku') {
      onOpenDemo('live-puzzles');
    } else if (tab === 'worksheets') {
      onOpenDemo('live-curriculum');
    } else {
      onOpenDemo('live-quiz');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Card with Board & Class Switcher + Optimized WebP Visual */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                <span>{zoneInfo.sectionNumber}</span>
                <span aria-hidden="true">&bull;</span>
                <span className="text-indigo-200">{zoneInfo.eyebrow}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold">
                {zoneInfo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {zoneInfo.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={onBackHome}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs cursor-pointer transition-colors"
              >
                ← Back to Home Dashboard
              </button>
              <button
                type="button"
                onClick={() => triggerTab('all-courses')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer transition-colors"
              >
                Go to Courses Directory →
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
              {visualError ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-950 to-slate-900 text-slate-200 gap-2">
                  <GraduationCap className="w-8 h-8 text-amber-300" />
                  <p className="text-xs font-extrabold">{zoneInfo.eyebrow}</p>
                </div>
              ) : (
                <img
                  src={zoneVisual.src}
                  alt={zoneVisual.alt}
                  width={zoneVisual.width}
                  height={zoneVisual.height}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  referrerPolicy="no-referrer"
                  onError={() => setVisualError(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Strict Board & Class Filter Bar */}
        <div className="pt-5 border-t border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Active Board &amp; Class Scope:</span>
            </span>
            <span className="text-slate-300">
              Showing exclusively{' '}
              <strong className="text-white">{getBoardDisplayName(selectedBoard)}</strong> &bull;{' '}
              <strong className="text-amber-300">
                Standard {formatStandardOrdinal(selectedClass)}
              </strong>{' '}
              ({subjects.length} Subjects)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BOARD_META_LIST.map((b) => {
              const active = selectedBoard === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectBoard(b.id)}
                  className={`px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-white text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <span className="text-xs font-extrabold flex items-center gap-2">
                    <span>{b.icon}</span>
                    <span>{b.shortLabel}</span>
                  </span>
                  {active && (
                    <span className="text-[10px] font-black text-emerald-700">Selected</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_10_CLASSES_META.map((c) => {
              const active = selectedClass === c.classLevel;
              return (
                <button
                  key={c.classLevel}
                  type="button"
                  onClick={() => onSelectClass(c.classLevel)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {c.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3-Question Orientation Guide */}
      <SectionOrientationGuide
        sectionNumber={zoneInfo.sectionNumber}
        sectionTitle={zoneInfo.eyebrow}
        whatIsThis={zoneInfo.whatIsThis}
        whatCanILearn={zoneInfo.whatCanILearn}
        whatShouldIClick={zoneInfo.whatShouldIClick}
        accentTheme={zoneInfo.accentTheme}
      />

      {/* =====================================================================
          SECTION 4: STUDY MATERIAL (6 Reference Categories — Zero Course Duplication)
          ===================================================================== */}
      {zone === 'study-material' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-[11px] uppercase tracking-wider">
                100% Free For All Students &amp; Visitors
              </span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                {boardMeta.shortLabel} &bull; {selectedClass} Unified Study Material Library
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All official textbooks, chapter study notes, 1-page revision sheets, 9-format Q&amp;A banks,
                interactive chapter tests, model &amp; previous year papers, video lessons, and special academic hubs
                are organized in one central library by Board &rarr; Medium &rarr; Class &rarr; Subject &rarr; Chapter.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => triggerTab('study-materials', effectiveSubject)}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open 100% Free Study Material Library</span>
              </button>
              <button
                type="button"
                onClick={() => triggerTab('worksheets', effectiveSubject)}
                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Open Interactive Worksheets</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 5: PRACTICE ZONE (8 Dedicated Practice Activities with Clear Instructions)
          ===================================================================== */}
      {zone === 'practice-zone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'pz-worksheets',
              title: '0. Online Worksheets',
              illustration: 'writing' as const,
              gradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#a5b4fc]',
              border: 'border-[#4f46e5]/40',
              instructions:
                `Solve ${getAllWorksheetsForClass(selectedClass, selectedBoard).length} board-aligned interactive worksheets (2 Existing + 23 New per subject) for ${boardMeta.shortLabel} ${selectedClass}.`,
              buttonLabel: 'Open All Worksheets',
              onClick: () => triggerTab('worksheets'),
            },
            {
              id: 'pz-maths',
              title: '1. Maths Practice',
              illustration: 'maths' as const,
              gradient: 'from-[#ecfccb] via-[#d9f99d] to-[#bef264]',
              border: 'border-[#65a30d]/40',
              instructions:
                'Solve step-by-step calculation, geometry, and word problems across 4 progressive levels. Score 60%+ to unlock the next level.',
              buttonLabel: 'Start Maths Practice',
              onClick: () => triggerTab('quizzes', 'Mathematics', 1),
            },
            {
              id: 'pz-english',
              title: '2. English Practice',
              illustration: 'english' as const,
              gradient: 'from-[#fef3c7] via-[#fde68a] to-[#fcd34d]',
              border: 'border-[#d97706]/40',
              instructions:
                'Practise grammar rules, tenses, parts of speech, sentence correction, and reading comprehension with instant explanations.',
              buttonLabel: 'Start English Practice',
              onClick: () => triggerTab('quizzes', 'English', 1),
            },
            {
              id: 'pz-science',
              title: '3. Science Practice',
              illustration: 'science' as const,
              gradient: 'from-[#fce7f3] via-[#fbcfe8] to-[#f9a8d4]',
              border: 'border-[#db2777]/40',
              instructions:
                'Test your understanding of scientific laws, experiments, diagrams, and real-world applications for your class syllabus.',
              buttonLabel: 'Start Science Practice',
              onClick: () =>
                triggerTab(
                  'quizzes',
                  subjects.includes('Science')
                    ? 'Science'
                    : subjects.includes('Physics')
                    ? 'Physics'
                    : subjects[0],
                  1
                ),
            },
            {
              id: 'pz-reasoning',
              title: '4. Reasoning',
              illustration: 'courses' as const,
              gradient: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
              border: 'border-[#0284c7]/40',
              instructions:
                'Sharpen logical deduction, number series, odd-one-out, coding-decoding, and mental ability skills.',
              buttonLabel: 'Start Reasoning Practice',
              onClick: () => triggerTab('scholarship'),
            },
            {
              id: 'pz-puzzles',
              title: '5. Brain Puzzles',
              illustration: 'puzzles' as const,
              gradient: 'from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]',
              border: 'border-[#2563eb]/40',
              instructions:
                'Read each lateral-thinking riddle carefully, use the optional hint if needed, and select the logical answer.',
              buttonLabel: 'Open Brain Puzzles (Free)',
              onClick: () => triggerTab('puzzles'),
            },
            {
              id: 'pz-sudoku',
              title: '6. Sudoku',
              illustration: 'sudoku' as const,
              gradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]',
              border: 'border-[#16a34a]/40',
              instructions:
                'Fill every row, column, and box without repeating numbers. Choose 4×4 (Beginner), 6×6 (Intermediate), or 9×9 (Master).',
              buttonLabel: 'Play Sudoku (Free)',
              onClick: () => triggerTab('sudoku'),
            },
            {
              id: 'pz-vocabulary',
              title: '7. Vocabulary',
              illustration: 'stories' as const,
              gradient: 'from-[#f3e8ff] via-[#e9d5ff] to-[#d8b4fe]',
              border: 'border-[#9333ea]/40',
              instructions:
                'Build strong word power with synonyms, antonyms, idioms, proverbs, and multilingual vocabulary exercises.',
              buttonLabel: 'Start Vocabulary Practice',
              onClick: () => triggerTab('worksheets', 'English'),
            },
            {
              id: 'pz-memory',
              title: '8. Memory Games',
              illustration: 'memory' as const,
              gradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#a5b4fc]',
              border: 'border-[#4f46e5]/40',
              instructions:
                'Observe patterns, recall sequences, and solve memory-boosting challenges designed to improve focus and retention.',
              buttonLabel: 'Play Memory Games',
              onClick: () => triggerTab('puzzles'),
            },
          ].map((act) => (
            <div
              key={act.id}
              onClick={act.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  act.onClick();
                }
              }}
              className={`group rounded-3xl bg-gradient-to-b ${act.gradient} border-2 ${act.border} p-5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/80 p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <SpecialCardIllustration type={act.illustration} className="w-full h-full" />
                </div>
                <h2 className="font-display font-black text-base sm:text-lg text-[#0f2952]">
                  {act.title}
                </h2>
                <div className="bg-white/75 rounded-2xl p-3 border border-white/80">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-0.5">
                    Instructions:
                  </span>
                  <p className="text-xs font-semibold text-[#0f2952]/90 leading-relaxed">
                    {act.instructions}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  act.onClick();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-[#0f2952] hover:bg-[#1e3a8a] text-white font-display font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{act.buttonLabel}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          SECTION 6: EXAM ZONE (6 Formal Tests Showing Questions, Time Limit & Difficulty)
          ===================================================================== */}
      {zone === 'exam-zone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              id: 'ez-chapter-tests',
              title: '1. Chapter Tests',
              questionsCount: '10 Questions',
              timeLimit: '10 Minutes',
              difficulty: 'Basic to Intermediate',
              diffBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
              desc: `Topic-wise diagnostic tests for ${selectedClass} (${boardMeta.shortLabel}) with instant evaluation and step-by-step explanations.`,
              cta: 'Start Chapter Test',
              onClick: () => triggerTab('quizzes', effectiveSubject, 1),
            },
            {
              id: 'ez-subject-tests',
              title: '2. Subject Tests',
              questionsCount: '20 Questions',
              timeLimit: '20 Minutes',
              difficulty: 'Intermediate',
              diffBadge: 'bg-blue-100 text-blue-900 border-blue-300',
              desc: `Complete subject-wise evaluation across all chapters of ${effectiveSubject} in ${selectedClass}.`,
              cta: 'Start Subject Test',
              onClick: () => triggerTab('quizzes', effectiveSubject, 2),
            },
            {
              id: 'ez-full-syllabus',
              title: '3. Full Syllabus Tests',
              questionsCount: '40 Questions (4 Levels)',
              timeLimit: '45 Minutes',
              difficulty: 'Intermediate to Advanced',
              diffBadge: 'bg-amber-100 text-amber-900 border-amber-300',
              desc: `Board-pattern full syllabus assessment covering Level 1 to Level 4 mastery for ${boardMeta.shortLabel} ${selectedClass}.`,
              cta: 'Start Full Syllabus Test',
              onClick: () => triggerTab('quizzes', effectiveSubject, 3),
            },
            {
              id: 'ez-mock-tests',
              title: '4. Scholarship Mock Tests',
              questionsCount: '50 Questions / Paper',
              timeLimit: '90 Minutes',
              difficulty: 'Board Scholarship Level',
              diffBadge: 'bg-purple-100 text-purple-900 border-purple-300',
              desc: 'Official MSCE Std 4th (PSE) & Std 7th (UPS) full-length timed mock examinations across Paper I and Paper II.',
              cta: 'Start Scholarship Mock',
              onClick: () => triggerTab('scholarship'),
            },
            {
              id: 'ez-competitive',
              title: '5. Competitive Exams',
              questionsCount: '25 Questions',
              timeLimit: '25 Minutes',
              difficulty: 'Advanced / Olympiad (HOTS)',
              diffBadge: 'bg-rose-100 text-rose-900 border-rose-300',
              desc: 'Higher-Order Thinking Skills (HOTS), assertion-reasoning, and competitive Olympiad challenge questions.',
              cta: 'Start Competitive Exam',
              onClick: () => triggerTab('quizzes', effectiveSubject, 4),
            },
            {
              id: 'ez-timed',
              title: '6. Timed Assessments',
              questionsCount: '15 Questions',
              timeLimit: '15 Minutes',
              difficulty: 'Speed & Accuracy Drill',
              diffBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
              desc: 'Rapid timed assessment to build examination speed, time management, and zero-error accuracy.',
              cta: 'Start Timed Assessment',
              onClick: () => triggerTab('quizzes', effectiveSubject, 2),
            },
            {
              id: 'ez-tet-ctet',
              title: '7. TET & CTET Exam Prep (MAHA TET & CTET)',
              questionsCount: '150 Questions / Mock',
              timeLimit: '150 Minutes (02:30:00)',
              difficulty: '200 Full Mocks · 30,000 Qs',
              diffBadge: 'bg-violet-100 text-violet-900 border-violet-300',
              desc: 'Complete MAHA TET & CTET Paper 1 & 2 CBT preparation with 50 mocks per module, Subject Practice, Official Syllabi & Progress Charts.',
              cta: 'Open TET & CTET Hub',
              onClick: () => triggerTab('tet-ctet'),
            },
          ].map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                    <ClipboardCheck className="w-5 h-5" />
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${exam.diffBadge}`}>
                    {exam.difficulty}
                  </span>
                </div>

                <h2 className="font-display font-black text-lg text-slate-900">
                  {exam.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">{exam.desc}</p>

                {/* Pre-Exam Specification Box (Questions, Time Limit, Difficulty) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Questions
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {exam.questionsCount}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Time Limit
                    </span>
                    <span className="text-xs font-extrabold text-amber-800">
                      {exam.timeLimit}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Level
                    </span>
                    <span className="text-xs font-extrabold text-indigo-900 truncate block">
                      {exam.difficulty.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={exam.onClick}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-indigo-950 text-white font-display font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{exam.cta}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          SECTION 7: PERFORMANCE (Personal Student Results, Marks, Accuracy, Courses, Certificates & Achievements)
          ===================================================================== */}
      {zone === 'performance' && (
        <div className="space-y-6">
          {currentStudent ? (
            (() => {
              const myAttempts = allAttempts.filter((a) => a.studentId === currentStudent.id);
              const totalQuizzes = myAttempts.length;
              const totalCorrect = myAttempts.reduce((acc, a) => acc + a.correctCount, 0);
              const totalIncorrect = myAttempts.reduce((acc, a) => acc + a.incorrectCount, 0);
              const totalAnswered = totalCorrect + totalIncorrect;
              const accuracyPercent =
                totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
              const classWorksheets = getAllWorksheetsForClass(
                currentStudent.classLevel,
                selectedBoard
              );
              const completedWorksheets = classWorksheets.filter((w) =>
                (currentStudent.completedWorksheetIds || []).includes(w.id)
              ).length;
              const completedCoursesCount = subjects.filter((s) => {
                const prog = getSubjectLevelProgress(s, currentStudent.classLevel, selectedBoard);
                return prog && prog.completedLevels.length > 0;
              }).length;
              const levelInfo = calculateLevel(currentStudent.points);

              return (
                <div className="space-y-6">
                  {/* Personal Metrics Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { label: 'Tests Taken', val: `${totalQuizzes}`, sub: 'Personal Attempts' },
                      { label: 'Total Marks / XP', val: `${currentStudent.points}`, sub: levelInfo.name },
                      { label: 'Accuracy', val: `${accuracyPercent}%`, sub: `${totalCorrect} Correct Answers` },
                      {
                        label: 'Completed Courses',
                        val: `${completedCoursesCount}/${subjects.length}`,
                        sub: `${selectedClass} Subjects`,
                      },
                      {
                        label: 'Worksheets Done',
                        val: `${completedWorksheets}/${classWorksheets.length}`,
                        sub: 'Online Sheets',
                      },
                      {
                        label: 'Achievements',
                        val: `${currentStudent.badges.length}/${ALL_BADGES.length}`,
                        sub: 'Badges & Trophies',
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white rounded-2xl p-4 border border-purple-200 shadow-xs space-y-1"
                      >
                        <p className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                          {stat.label}
                        </p>
                        <p className="text-xl sm:text-2xl font-display font-black text-slate-900">
                          {stat.val}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-500">{stat.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* 30-Day Mastery Chart */}
                  <StudentMasteryChart
                    currentStudent={currentStudent}
                    allAttempts={allAttempts}
                    onSelectSubject={(subj) => triggerTab('quizzes', subj, 1)}
                  />

                  {/* Certificates & Badges Callout */}
                  <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-400/30">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-display font-black">
                        Official Certificates &amp; Achievement Badges
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-100">
                        View and download your personalised Champion Certificates and inspect your unlocked badges.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerTab('certificates')}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Open Certificates &amp; Achievements</span>
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-700">
                  <TrendingUp className="w-4 h-4" />
                  <span>Private Personal Student Performance</span>
                </div>
                <h2 className="text-2xl font-display font-extrabold text-slate-900">
                  Sign In to View Your Personal Marks, Accuracy &amp; Certificates
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Students see only their own private performance data: Test Results, Marks, Accuracy %, Learning Progress, Completed Courses, Certificates, and Achievements.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer"
                  >
                    Student Login
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('register')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
                  >
                    Register Free Account
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {[
                  { label: 'Test Results & Marks', val: 'Private', sub: 'Scorecards & Solutions' },
                  { label: 'Accuracy Tracker', val: 'Live %', sub: 'Subject-Wise Mastery' },
                  { label: 'Completed Courses', val: 'L1 – L4', sub: 'Progress Per Class' },
                  { label: 'Certificates', val: 'Download', sub: 'Official PDFs & Badges' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <p className="text-[11px] font-bold text-slate-500 uppercase">{stat.label}</p>
                    <p className="text-xl font-display font-extrabold text-slate-900">{stat.val}</p>
                    <p className="text-[11px] text-slate-500">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SECTION 8: PLANS & PRICING (Free, Maharashtra, CBSE, ICSE, Special & Purchased Content)
          ===================================================================== */}
      {zone === 'plans' && (
        <div className="space-y-6">
          {/* 1. Free Learning Programmes & 2. ₹99 Board Plans Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
                  1. Free Learning Programmes
                </span>
                <p className="text-3xl font-display font-extrabold text-slate-900">
                  ₹0 <span className="text-sm font-bold text-emerald-700">/ Lifetime Free</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start learning immediately with zero cost. Includes free demo quizzes, sample worksheets, and unlimited brain games.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2-Question Demo Quiz for every Board &amp; Class (1–10)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2 Free Demo Worksheets (English &amp; Mathematics)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited Brain Puzzles &amp; 4×4 / 6×6 / 9×9 Sudoku</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() =>
                  currentStudent ? onOpenDemo('live-quiz') : onOpenAuth('register')
                }
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer"
              >
                {currentStudent ? 'Open Free Programmes' : 'Register Free Account'}
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-md space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                  2. {boardMeta.shortLabel} &bull; {selectedClass} Plan
                </span>
                <p className="text-3xl font-display font-extrabold text-amber-800">
                  ₹99 <span className="text-sm font-bold text-slate-700">/ 365 Days (One-Time Payment)</span>
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  One-time payment via Razorpay with 365 days validity and zero automatic recurring charges.
                </p>
                <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-amber-200/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>All {subjects.length} Subjects &amp; Chapter Lessons for {selectedClass}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Complete Notes, Worksheets, Question Banks &amp; Mock Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>All Special Programmes: Scholarship, Shivaji Stories, Stories, Drawing, GK &amp; AI Academy</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onOpenMembership(selectedClass, selectedBoard)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Crown className="w-4 h-4" />
                <span>Unlock {boardMeta.shortLabel} {selectedClass} — ₹99 / 365 Days</span>
              </button>
            </div>
          </div>

          {/* 3. Board-Specific Plans Breakdown (Maharashtra · CBSE · ICSE · Special Programmes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Maharashtra Board Plans',
                price: '₹99 / 365 Days',
                desc: 'Full SSC & Balbharati curriculum for any selected Class 1 to 10 + MSCE Scholarship prep.',
                board: 'Maharashtra' as EducationBoard,
              },
              {
                title: 'CBSE Board Plans',
                price: '₹99 / 365 Days',
                desc: 'Full NCERT & NCF-SE curriculum for any selected Class 1 to 10 with competency questions.',
                board: 'CBSE' as EducationBoard,
              },
              {
                title: 'ICSE Board Plans',
                price: '₹99 / 365 Days',
                desc: 'Full CISCE curriculum for any selected Class 1 to 10 including split Sciences & Humanities.',
                board: 'ICSE' as EducationBoard,
              },
              {
                title: 'Special Programmes',
                price: 'Included Free with ₹99',
                desc: 'Drawing Studio, 45 Moral Stories, 50 Shivaji Chapters, Cricket GK & AI Academy unlocked automatically.',
                board: selectedBoard,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {p.price}
                  </span>
                  <h3 className="font-display font-extrabold text-base text-slate-900 pt-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBoard(p.board);
                    onOpenMembership(selectedClass, p.board);
                  }}
                  className="text-xs font-extrabold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer self-start"
                >
                  <span>Select &amp; Activate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* 4. Purchased Content (Active Subscriptions on Student Account) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-display font-black text-slate-900">
                  Purchased Content &amp; Active Subscriptions
                </h3>
                <p className="text-xs text-slate-600">
                  {currentStudent
                    ? `Signed in as ${currentStudent.name} (${currentStudent.email})`
                    : 'Sign in to view your purchased Board & Class activations and remaining validity days.'}
                </p>
              </div>
              {currentStudent ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
                  {getActivatedBoardClassesList(currentStudent).length} Active Paid Plan
                  {getActivatedBoardClassesList(currentStudent).length === 1 ? '' : 's'}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs cursor-pointer"
                >
                  Sign In to View Purchases
                </button>
              )}
            </div>

            {currentStudent && (
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
                <span>
                  Current Scope ({boardMeta.shortLabel} &bull; {selectedClass}):{' '}
                  <strong className="text-slate-900">
                    {
                      getStudentPlanInfo(
                        currentStudent,
                        undefined,
                        selectedClass,
                        selectedBoard
                      ).planDisplayName
                    }
                  </strong>{' '}
                  &bull;{' '}
                  <strong className="text-emerald-700">
                    {
                      getStudentPlanInfo(
                        currentStudent,
                        undefined,
                        selectedClass,
                        selectedBoard
                      ).daysRemainingDisplay
                    }
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => triggerTab('profile')}
                  className="font-extrabold text-indigo-700 hover:underline cursor-pointer"
                >
                  Open My Account &amp; Receipts →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trust Strip */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <span className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Board-isolated content &bull; Razorpay verified payments &bull; Single-device account security</span>
        </span>
        <span className="flex items-center gap-2 font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Zero duplicate categories &bull; Dedicated section pages</span>
        </span>
      </div>
    </div>
  );
};
