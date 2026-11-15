import React, { useState } from 'react';
import {
  Play,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  Award,
  Trophy,
  User,
  Headphones,
  Gift,
  Home,
  Star,
  BarChart3,
  Target,
  ClipboardCheck,
  TrendingUp,
  Crown,
  Monitor,
  Smartphone,
  Rocket,
  Sparkles,
  Megaphone,
  GraduationCap,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import {
  BrandBookCapLogo,
  HeroSchoolchildrenIllustration,
  SpecialCardIllustration,
  KeepGoingStarMascot,
  DailyChallengeBoyMascot,
  ScholarshipChampionBannerSvg,
  HeroBoardEmblemIcon,
} from './DashboardIllustrations';
import { SectionOrientationGuide } from './SectionOrientationGuide';

export interface RealStudentProgressMetrics {
  isLoggedIn: boolean;
  studentName?: string;
  coursesCompleted: number;
  practiceTests: number;
  achievements: number;
  progressPercent: number;
  badgesList?: string[];
}

interface ReferenceShowcaseSectionsProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onNavigateTab: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onOpenAuth: (defaultTab: 'login' | 'register' | 'teacher' | 'admin') => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onStartLearningClick: () => void;
  viewMode?: 'auto' | 'desktop';
  onToggleViewMode?: () => void;
  progressMetrics: RealStudentProgressMetrics;
}

const ACCORDION_ICONS: Record<
  MainMenuId,
  {
    icon: React.FC<{ className?: string }>;
    badgeBg: string;
    iconColor: string;
  }
> = {
  home: { icon: Home, badgeBg: 'bg-blue-600', iconColor: 'text-white' },
  courses: { icon: BookOpen, badgeBg: 'bg-sky-600', iconColor: 'text-white' },
  'special-learning': { icon: Star, badgeBg: 'bg-amber-500', iconColor: 'text-slate-950' },
  'study-material': { icon: BarChart3, badgeBg: 'bg-orange-500', iconColor: 'text-white' },
  'practice-zone': { icon: Target, badgeBg: 'bg-rose-600', iconColor: 'text-white' },
  'exam-zone': { icon: ClipboardCheck, badgeBg: 'bg-indigo-600', iconColor: 'text-white' },
  performance: { icon: TrendingUp, badgeBg: 'bg-emerald-600', iconColor: 'text-white' },
  plans: { icon: Crown, badgeBg: 'bg-red-500', iconColor: 'text-white' },
  account: { icon: User, badgeBg: 'bg-purple-600', iconColor: 'text-white' },
};

export const ReferenceShowcaseSections: React.FC<ReferenceShowcaseSectionsProps> = ({
  selectedBoard,
  selectedClass,
  onOpenDemo,
  onNavigateTab,
  onMenuAction,
  onOpenAuth,
  onOpenMembership,
  onStartLearningClick,
  viewMode = 'auto',
  onToggleViewMode,
  progressMetrics,
}) => {
  const [expandedMenu, setExpandedMenu] = useState<MainMenuId | null>('special-learning');

  const triggerSubAction = (actionId: NavSubActionId) => {
    if (onMenuAction) {
      onMenuAction(actionId);
      return;
    }
    if (actionId.startsWith('course-')) {
      onNavigateTab('all-courses');
    } else if (actionId === 'sl-scholarship' || actionId === 'ez-mock-tests') {
      onNavigateTab('scholarship');
    } else if (actionId === 'sl-drawing') {
      onNavigateTab('drawing');
    } else if (actionId === 'sl-stories' || actionId === 'sl-moral') {
      onNavigateTab('stories');
    } else if (actionId === 'sl-shivaji') {
      onNavigateTab('shivaji');
    } else if (actionId === 'sl-gk') {
      onNavigateTab('cricket');
    } else if (actionId === 'sl-ai-academy') {
      onNavigateTab('future-skills');
    } else if (actionId === 'sl-creative' || actionId === 'sl-programs') {
      onNavigateTab('other-programs');
    } else if (actionId === 'pz-puzzles' || actionId === 'pz-memory') {
      onNavigateTab('puzzles');
    } else if (actionId === 'pz-sudoku') {
      onNavigateTab('sudoku');
    } else if (actionId.startsWith('sm-')) {
      onNavigateTab('study-materials', actionId);
    } else if (actionId.startsWith('pz-')) {
      onNavigateTab('quizzes', actionId);
    } else if (actionId.startsWith('ez-')) {
      onNavigateTab('quizzes', actionId);
    } else if (actionId.startsWith('perf-')) {
      onNavigateTab('performance', actionId);
    } else if (actionId.startsWith('plan-')) {
      onOpenMembership(selectedClass, selectedBoard);
    } else if (actionId === 'acc-support') {
      onNavigateTab('help-support');
    } else if (actionId.startsWith('acc-')) {
      if (progressMetrics.isLoggedIn) onNavigateTab('profile');
      else onOpenAuth(actionId === 'acc-register' ? 'register' : 'login');
    }
  };

  // Three Education Board Cards Inside the Main Hero Banner (1 Horizontal Row: Blue · Green · Orange)
  const heroEducationBoards = [
    {
      id: 'Maharashtra' as EducationBoard,
      actionId: 'course-maharashtra' as NavSubActionId,
      title: 'MAHARASHTRA STATE BOARD',
      subtitle: 'Classes 1 to 10 · State Syllabus',
      cardBg: 'from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]',
      borderClass: 'border-[#2563eb] hover:border-[#1d4ed8]',
      shadowClass: 'shadow-[0_5px_0_#1d4ed8] hover:shadow-[0_6px_0_#1e40af]',
      titleColor: 'text-[#1e3a8a]',
      subtitleColor: 'text-[#1d4ed8]',
      ctaBg: 'bg-[#1d4ed8] text-white',
    },
    {
      id: 'CBSE' as EducationBoard,
      actionId: 'course-cbse' as NavSubActionId,
      title: 'CBSE BOARD',
      subtitle: 'Classes 1 to 10 · NCERT Syllabus',
      cardBg: 'from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]',
      borderClass: 'border-[#16a34a] hover:border-[#15803d]',
      shadowClass: 'shadow-[0_5px_0_#15803d] hover:shadow-[0_6px_0_#166534]',
      titleColor: 'text-[#14532d]',
      subtitleColor: 'text-[#15803d]',
      ctaBg: 'bg-[#15803d] text-white',
    },
    {
      id: 'ICSE' as EducationBoard,
      actionId: 'course-icse' as NavSubActionId,
      title: 'ICSE BOARD',
      subtitle: 'Classes 1 to 10 · CISCE Syllabus',
      cardBg: 'from-[#fff7ed] via-[#ffedd5] to-[#fed7aa]',
      borderClass: 'border-[#ea580c] hover:border-[#c2410c]',
      shadowClass: 'shadow-[0_5px_0_#c2410c] hover:shadow-[0_6px_0_#9a3412]',
      titleColor: 'text-[#7c2d12]',
      subtitleColor: 'text-[#c2410c]',
      ctaBg: 'bg-[#ea580c] text-white',
    },
  ];

  // 8 Main Learning Categories (One Primary Card Per Main Section — Zero Overlap)
  const mainCategoryCards = [
    {
      id: 'cat-courses',
      sectionBadge: 'Section 2',
      title: 'Courses (Classes 1–10)',
      whatInside: 'Maharashtra Board, CBSE & ICSE subject-wise courses & chapter lessons.',
      buttonLabel: 'Open Courses',
      illustrationType: 'courses' as const,
      cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8]',
      borderClass: 'border-[#0284c7]/40',
      onClick: () => onNavigateTab('all-courses'),
    },
    {
      id: 'cat-special',
      sectionBadge: 'Section 3',
      title: 'Special Learning',
      whatInside: 'Drawing Studio, Story World, Shivaji Maharaj, Scholarship, Cricket GK & AI.',
      buttonLabel: 'Open Special Learning',
      illustrationType: 'scholarship' as const,
      cardGradient: 'from-[#fde68a] via-[#fcd34d] to-[#fbbf24]',
      borderClass: 'border-[#d97706]/40',
      onClick: () => onNavigateTab('other-programs'),
    },
    {
      id: 'cat-study-material',
      sectionBadge: 'Section 4',
      title: 'Study Material',
      whatInside: 'Chapter Notes, Worksheets, Summaries, Practice PDFs, Question Banks & Guides.',
      buttonLabel: 'Open Study Material',
      illustrationType: 'english' as const,
      cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      borderClass: 'border-[#16a34a]/40',
      onClick: () => triggerSubAction('sm-notes'),
    },
    {
      id: 'cat-practice-zone',
      sectionBadge: 'Section 5',
      title: 'Practice Zone',
      whatInside: 'Maths, English, Science, Reasoning, Brain Puzzles, Sudoku & Memory Games.',
      buttonLabel: 'Open Practice Zone',
      illustrationType: 'maths' as const,
      cardGradient: 'from-[#d9f99d] via-[#bef264] to-[#a3e635]',
      borderClass: 'border-[#65a30d]/40',
      onClick: () => triggerSubAction('pz-maths'),
    },
    {
      id: 'cat-exam-zone',
      sectionBadge: 'Section 6',
      title: 'Exam Zone',
      whatInside: 'Chapter Tests, Subject Tests, Full Syllabus Tests & Timed Scholarship Mock Exams.',
      buttonLabel: 'Open Exam Zone',
      illustrationType: 'gk' as const,
      cardGradient: 'from-[#fbcfe8] via-[#f9a8d4] to-[#f472b6]',
      borderClass: 'border-[#db2777]/40',
      onClick: () => triggerSubAction('ez-chapter-tests'),
    },
    {
      id: 'cat-performance',
      sectionBadge: 'Section 7',
      title: 'Performance',
      whatInside: 'Personal Test Results, Marks, Accuracy %, Completed Courses & Certificates.',
      buttonLabel: 'Check Performance',
      illustrationType: 'memory' as const,
      cardGradient: 'from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8]',
      borderClass: 'border-[#4f46e5]/40',
      onClick: () => triggerSubAction('perf-results'),
    },
    {
      id: 'cat-plans',
      sectionBadge: 'Section 8',
      title: 'Plans & Pricing',
      whatInside: 'Free Forever Programmes & ₹99 / 365-Day Board & Class Subscriptions.',
      buttonLabel: 'View Plans (₹99)',
      illustrationType: 'moral' as const,
      cardGradient: 'from-[#fed7aa] via-[#fdba74] to-[#fb923c]',
      borderClass: 'border-[#ea580c]/40',
      onClick: () => triggerSubAction('plan-maharashtra'),
    },
    {
      id: 'cat-account',
      sectionBadge: 'Section 9',
      title: 'My Account',
      whatInside: 'Student Profile, Personal Info, My Purchases, My Courses, Settings & Support.',
      buttonLabel: 'Open My Account',
      illustrationType: 'writing' as const,
      cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
      borderClass: 'border-[#9333ea]/40',
      onClick: () => triggerSubAction('acc-profile'),
    },
  ];

  // Popular Enrichment Programmes (Direct Links to Dedicated Studio Pages — No Duplicated Content)
  const popularProgrammes = [
    {
      id: 'pop-drawing',
      title: 'Drawing Studio',
      subtitle: '120+ Templates & Paint Canvas',
      illustration: 'drawing' as const,
      gradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
      border: 'border-[#9333ea]/40',
      onClick: () => onNavigateTab('drawing'),
    },
    {
      id: 'pop-stories',
      title: 'Story World',
      subtitle: '45+ Audio Stories (EN · HI · MR)',
      illustration: 'stories' as const,
      gradient: 'from-[#d9f99d] via-[#a3e635] to-[#84cc16]',
      border: 'border-[#4d7c0f]/40',
      onClick: () => onNavigateTab('stories'),
    },
    {
      id: 'pop-shivaji',
      title: 'Shivaji Stories',
      subtitle: '50 Historical Chapters & Audio',
      illustration: 'shivaji' as const,
      gradient: 'from-[#fde68a] via-[#fcd34d] to-[#f59e0b]',
      border: 'border-[#d97706]/40',
      onClick: () => onNavigateTab('shivaji'),
    },
    {
      id: 'pop-puzzles',
      title: 'Brain Puzzles',
      subtitle: '52+ Logic Riddles (Free Forever)',
      illustration: 'puzzles' as const,
      gradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]',
      border: 'border-[#2563eb]/40',
      onClick: () => onNavigateTab('puzzles'),
    },
    {
      id: 'pop-sudoku',
      title: 'Sudoku Game',
      subtitle: '4×4, 6×6 & 9×9 Number Grids',
      illustration: 'sudoku' as const,
      gradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      border: 'border-[#16a34a]/40',
      onClick: () => onNavigateTab('sudoku'),
    },
    {
      id: 'pop-cricket',
      title: 'Cricket & GK',
      subtitle: 'Daily Cricket & GK Quiz Arena',
      illustration: 'cricket' as const,
      gradient: 'from-[#bfdbfe] via-[#93c5fd] to-[#60a5fa]',
      border: 'border-[#1d4ed8]/40',
      onClick: () => onNavigateTab('cricket'),
    },
    {
      id: 'pop-ai',
      title: 'AI Learning Academy',
      subtitle: '8 Modules · 24 Interactive Lessons',
      illustration: 'ai' as const,
      gradient: 'from-[#f5d0fe] via-[#e879f9] to-[#c084fc]',
      border: 'border-[#9333ea]/40',
      onClick: () => onNavigateTab('future-skills'),
    },
    {
      id: 'pop-scholarship',
      title: 'Scholarship Corner',
      subtitle: 'Std 4th (PSE) & Std 7th (UPS)',
      illustration: 'scholarship' as const,
      gradient: 'from-[#d9f99d] via-[#bef264] to-[#86efac]',
      border: 'border-[#15803d]/40',
      onClick: () => onNavigateTab('scholarship'),
    },
  ];

  // Progress Ring calculation
  const pct = Math.min(100, Math.max(0, progressMetrics.progressPercent));
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (pct / 100) * ringCircumference;

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. TOP 3 SHORTCUT PILLS (Free Demo · Courses · Desktop Site)
          ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onOpenDemo('live-quiz')}
          className="h-12 sm:h-13 rounded-2xl bg-gradient-to-b from-[#e0d4fc] via-[#c4b5fd] to-[#a78bfa] hover:brightness-105 text-[#1e1b4b] font-display font-black text-sm sm:text-base shadow-md border-2 border-[#8b5cf6]/50 flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span className="text-xl drop-shadow-xs">🚀</span>
          <span>Free Demo</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('all-courses')}
          className="h-12 sm:h-13 rounded-2xl bg-gradient-to-b from-[#fef08a] via-[#facc15] to-[#eab308] hover:brightness-105 text-[#1e1b4b] font-display font-black text-sm sm:text-base shadow-md border-2 border-[#ca8a04]/50 flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span className="text-xl drop-shadow-xs">📖</span>
          <span>Courses</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onToggleViewMode) onToggleViewMode();
          }}
          className="h-12 sm:h-13 rounded-2xl bg-gradient-to-b from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] hover:brightness-105 text-[#0c4a6e] font-display font-black text-sm sm:text-base shadow-md border-2 border-[#0284c7]/50 flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.99]"
        >
          {viewMode === 'desktop' ? (
            <>
              <Smartphone className="w-5 h-5 text-[#0369a1]" />
              <span>Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-5 h-5 text-[#0369a1]" />
              <span>Desktop Site</span>
            </>
          )}
        </button>
      </div>

      {/* =====================================================================
          2. MAIN EDUCATIONAL HERO BANNER (Uploaded Banner + Interactive Board Cards)
          ===================================================================== */}
      <section
        aria-label="Welcome to MyStudyZone Educational Hero Banner"
        className="rounded-3xl bg-white border-2 border-sky-200/80 shadow-xl overflow-hidden"
      >
        {/* Full Uncropped Uploaded Banner Image with Separate Interactive Clickable Elements */}
        <div className="relative w-full">
          <img
            src="/assets/aistudio/file_00000000bcf8820bad2b1b276650f09a_9a0b6552.png"
            alt="Welcome to MyStudyZone – Your Learning World (Classes 1 to 10) – Select Your Education Board: Maharashtra State Board, CBSE Board, ICSE Board"
            width={2172}
            height={724}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-auto block select-none"
          />

          {/* Interactive Clickable Element: ▶ START LEARNING Button */}
          <button
            type="button"
            onClick={onStartLearningClick}
            aria-label="Start Learning – Open Student Learning Courses"
            title="Start Learning"
            style={{
              left: '7.1%',
              top: '46.8%',
              width: '15.0%',
              height: '11.2%',
            }}
            className="absolute z-10 rounded-full cursor-pointer transition-all duration-150 hover:ring-4 hover:ring-white/80 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <span className="sr-only">START LEARNING</span>
          </button>

          {/* Interactive Clickable Element 1: MAHARASHTRA STATE BOARD Card & Explore Button */}
          <button
            type="button"
            onClick={() => triggerSubAction('course-maharashtra')}
            aria-label="Maharashtra State Board – Classes 1 to 10 – State Syllabus – Explore"
            title="Explore Maharashtra State Board (Classes 1 to 10)"
            style={{
              left: '8.1%',
              top: '69.2%',
              width: '27.6%',
              height: '16.5%',
            }}
            className={`absolute z-10 rounded-2xl cursor-pointer transition-all duration-150 hover:ring-3 hover:ring-[#1d4ed8] hover:bg-blue-500/5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1d4ed8] ${
              selectedBoard === 'Maharashtra' ? 'ring-2 ring-[#1e3a8a]/60' : ''
            }`}
          >
            <span className="sr-only">
              MAHARASHTRA STATE BOARD – Classes 1 to 10 · State Syllabus – Explore
            </span>
          </button>

          {/* Interactive Clickable Element 2: CBSE BOARD Card & Explore Button */}
          <button
            type="button"
            onClick={() => triggerSubAction('course-cbse')}
            aria-label="CBSE Board – Classes 1 to 10 – NCERT Syllabus – Explore"
            title="Explore CBSE Board (Classes 1 to 10)"
            style={{
              left: '36.3%',
              top: '69.2%',
              width: '27.6%',
              height: '16.5%',
            }}
            className={`absolute z-10 rounded-2xl cursor-pointer transition-all duration-150 hover:ring-3 hover:ring-[#15803d] hover:bg-emerald-500/5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15803d] ${
              selectedBoard === 'CBSE' ? 'ring-2 ring-[#14532d]/60' : ''
            }`}
          >
            <span className="sr-only">
              CBSE BOARD – Classes 1 to 10 · NCERT Syllabus – Explore
            </span>
          </button>

          {/* Interactive Clickable Element 3: ICSE BOARD Card & Explore Button */}
          <button
            type="button"
            onClick={() => triggerSubAction('course-icse')}
            aria-label="ICSE Board – Classes 1 to 10 – CISCE Syllabus – Explore"
            title="Explore ICSE Board (Classes 1 to 10)"
            style={{
              left: '64.5%',
              top: '69.2%',
              width: '27.6%',
              height: '16.5%',
            }}
            className={`absolute z-10 rounded-2xl cursor-pointer transition-all duration-150 hover:ring-3 hover:ring-[#ea580c] hover:bg-orange-500/5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ea580c] ${
              selectedBoard === 'ICSE' ? 'ring-2 ring-[#7c2d12]/60' : ''
            }`}
          >
            <span className="sr-only">
              ICSE BOARD – Classes 1 to 10 · CISCE Syllabus – Explore
            </span>
          </button>
        </div>

        {/* Mobile-Friendly Vertical Interactive Controls (Visible on Mobile Screens so buttons & board cards are large and easy to tap) */}
        {viewMode !== 'desktop' && (
          <div className="md:hidden px-3.5 pb-4 pt-2 bg-gradient-to-b from-white to-sky-50/70 border-t border-slate-100 space-y-3">
            {/* Mobile Start Learning Button */}
            <button
              type="button"
              onClick={onStartLearningClick}
              className="w-full min-h-[46px] py-2.5 px-5 rounded-full bg-gradient-to-b from-[#fb923c] via-[#f97316] to-[#ea580c] hover:brightness-105 text-white font-display font-black text-sm shadow-md shadow-orange-600/30 border-2 border-white flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
            >
              <span className="w-6 h-6 rounded-full bg-white text-[#ea580c] flex items-center justify-center shadow-2xs shrink-0">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span>START LEARNING</span>
            </button>

            <div className="flex items-center justify-between gap-2 px-1">
              <p className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                Select Your Education Board (Classes 1 to 10)
              </p>
              <span className="text-[10px] font-extrabold text-[#ea580c]">
                Tap to Explore →
              </span>
            </div>

            {/* Vertically Arranged Board Cards on Mobile */}
            <div className="grid grid-cols-1 gap-2.5">
              {heroEducationBoards.map((boardCard) => {
                const isSelected = selectedBoard === boardCard.id;

                return (
                  <button
                    key={boardCard.id}
                    type="button"
                    onClick={() => triggerSubAction(boardCard.actionId)}
                    className={`group w-full rounded-2xl bg-gradient-to-r ${boardCard.cardBg} border-2 ${
                      boardCard.borderClass
                    } ${boardCard.shadowClass} ${
                      isSelected ? 'ring-2 ring-offset-1 ring-[#0f2952]' : ''
                    } p-3 text-left transition-all duration-150 active:translate-y-0.5 cursor-pointer flex items-center justify-between gap-3`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <HeroBoardEmblemIcon
                        board={boardCard.id}
                        className="w-11 h-11 shrink-0 drop-shadow-xs"
                      />
                      <div className="min-w-0">
                        <span
                          className={`block font-display font-black text-xs sm:text-sm leading-tight tracking-tight ${boardCard.titleColor}`}
                        >
                          {boardCard.title}
                        </span>
                        <span
                          className={`block text-[11px] font-bold mt-0.5 ${boardCard.subtitleColor}`}
                        >
                          {boardCard.subtitle}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-3.5 py-2 rounded-full font-display font-black text-xs whitespace-nowrap shrink-0 flex items-center justify-center gap-1 shadow-xs ${boardCard.ctaBg}`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          3. SHORT INTRODUCTION & 3-QUESTION STUDENT ORIENTATION GUIDE
          ===================================================================== */}
      <SectionOrientationGuide
        sectionNumber="Section 1 · Home Dashboard"
        sectionTitle="Welcome to MyStudyZone (Classes 1 to 10)"
        whatIsThis="Your central learning dashboard connecting School Courses, Special Learning Studios, Study Material, Practice Zone, Exam Zone, and Personal Performance."
        whatCanILearn={`Complete ${getBoardShortLabel(selectedBoard)} (${selectedClass}) syllabus, 4-level quizzes, worksheets, audio stories, drawing, Sudoku, and scholarship exams.`}
        whatShouldIClick="Pick any of the 8 Main Learning Categories below or expand a navigation bar to open that dedicated section."
        accentTheme="blue"
      />

      {/* =====================================================================
          4. EXPANDABLE 9-SECTION NAVIGATION BARS (Reference Accordion Style)
          ===================================================================== */}
      <section
        aria-label="Main Navigation Directory"
        className="rounded-3xl bg-white/95 border-2 border-slate-200/90 shadow-md overflow-hidden divide-y divide-slate-200/80"
      >
        {MAIN_NAV_MENUS.map((menu) => {
          const isExpanded = expandedMenu === menu.id;
          const isSpecial = menu.id === 'special-learning';
          const iconMeta = ACCORDION_ICONS[menu.id];
          const IconComp = iconMeta.icon;

          return (
            <div key={menu.id} className="transition-colors">
              <button
                type="button"
                onClick={() => setExpandedMenu((prev) => (prev === menu.id ? null : menu.id))}
                className={`w-full px-4 sm:px-6 py-3 flex items-center justify-between text-left cursor-pointer transition-colors ${
                  isSpecial
                    ? 'bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fef3c7] hover:brightness-98'
                    : isExpanded
                    ? 'bg-sky-50/80'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg ${iconMeta.badgeBg} ${iconMeta.iconColor} flex items-center justify-center shadow-2xs shrink-0`}
                  >
                    <IconComp className="w-4 h-4" />
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#0f2952] truncate">
                    {menu.label.replace('🎓 ', '')}
                  </span>
                  <span className="hidden md:inline-block text-[11px] font-semibold text-slate-500 truncate">
                    — {menu.whatIsThis}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-extrabold text-slate-500 hidden sm:inline">
                    {menu.items.length} Options
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#0f2952]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 sm:px-6 py-4 bg-slate-50/90 border-t border-slate-200/60 space-y-3">
                  {/* 3-Question Mini Bar inside expanded accordion */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] bg-white p-3 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="font-black text-blue-700 uppercase">What is this? </span>
                      <span className="font-semibold text-slate-700">{menu.whatIsThis}</span>
                    </div>
                    <div>
                      <span className="font-black text-emerald-700 uppercase">What can I learn? </span>
                      <span className="font-semibold text-slate-700">{menu.whatCanILearn}</span>
                    </div>
                    <div>
                      <span className="font-black text-amber-800 uppercase">What to click? </span>
                      <span className="font-semibold text-slate-700">{menu.whatShouldIClick}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {menu.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => triggerSubAction(item.id)}
                        className="p-3 rounded-2xl bg-white hover:bg-amber-50/70 border border-slate-200/90 hover:border-amber-400 text-left transition-all cursor-pointer flex items-start justify-between gap-2 shadow-2xs group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-extrabold text-xs text-[#0f2952] group-hover:text-[#ea580c] truncate">
                              {item.label}
                            </span>
                            {item.badgeText && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-black text-[9px] shrink-0">
                                {item.badgeText}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ea580c] shrink-0 mt-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* =====================================================================
          5. MAIN LEARNING CATEGORIES (8 Primary Section Cards — Zero Duplication)
          ===================================================================== */}
      <section aria-label="Main Learning Categories" className="space-y-4">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#fef3c7] border-2 border-sky-200 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#172554] text-white shadow-md">
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <h2 className="text-base sm:text-xl font-display font-black tracking-tight">
              Main Learning Categories (8 Sections)
            </h2>
          </div>
          <p className="px-4 text-xs sm:text-sm font-display font-black italic text-[#1e3a8a]">
            One Clear Destination for Every Learning Need
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {mainCategoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={cat.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  cat.onClick();
                }
              }}
              className={`group rounded-2xl bg-gradient-to-r ${cat.cardGradient} ${cat.borderClass} border-2 p-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between gap-3`}
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <SpecialCardIllustration
                    type={cat.illustrationType}
                    className="w-full h-full drop-shadow-sm"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/80 text-[#0f2952] font-black text-[10px] uppercase tracking-wider mb-1">
                    {cat.sectionBadge}
                  </span>
                  <h3 className="font-display font-black text-base sm:text-lg text-[#0f2952] leading-tight">
                    {cat.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs font-bold text-[#0f2952]/85 leading-snug">
                {cat.whatInside}
              </p>

              <div className="pt-2 border-t border-white/50 flex items-center justify-between text-xs font-black text-[#0f2952]">
                <span>{cat.buttonLabel}</span>
                <span className="w-6 h-6 rounded-full bg-white/85 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0f2952]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. POPULAR PROGRAMMES (8 Illustrated Enrichment Shortcuts — Links Only)
          ===================================================================== */}
      <section aria-label="Popular Enrichment Programmes" className="space-y-4">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#fef3c7] via-[#fffbeb] to-[#e0f2fe] border-2 border-amber-200 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#172554] text-white shadow-md">
            <span className="text-xl">🎓</span>
            <h2 className="text-base sm:text-xl font-display font-black tracking-tight">
              Popular Programmes &amp; Special Learning
            </h2>
          </div>
          <p className="px-4 text-xs sm:text-sm font-display font-black italic text-[#1e3a8a]">
            Explore &bull; Learn &bull; Enjoy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {popularProgrammes.map((prog) => (
            <button
              key={prog.id}
              type="button"
              onClick={prog.onClick}
              className={`group rounded-2xl bg-gradient-to-r ${prog.gradient} ${prog.border} border-2 p-3 sm:p-3.5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left`}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                <SpecialCardIllustration
                  type={prog.illustration}
                  className="w-full h-full drop-shadow-sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-black text-sm sm:text-base text-[#0f2952] leading-tight">
                  {prog.title}
                </h3>
                <p className="text-[11px] font-bold text-[#0f2952]/80 mt-0.5 line-clamp-1">
                  {prog.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#0f2952] mt-1.5 bg-white/70 px-2.5 py-0.5 rounded-full">
                  <span>Open Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. STUDENT PROGRESS OVERVIEW & DAILY LEARNING CHALLENGE (2 Panels)
          ===================================================================== */}
      <section
        aria-label="Student Progress and Daily Challenge"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* LEFT PANEL: My Learning Progress */}
        <div className="rounded-3xl bg-white border-2 border-sky-200 shadow-lg overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3 bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#1d4ed8] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📊</span>
              <h2 className="text-base sm:text-lg font-display font-black tracking-tight">
                My Learning Progress
              </h2>
            </div>
            <button
              type="button"
              onClick={() => triggerSubAction('perf-results')}
              className="text-xs font-extrabold text-sky-100 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    fill="none"
                    stroke="url(#progressRingGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                  />
                  <defs>
                    <linearGradient id="progressRingGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display font-black text-[#0f2952]">
                    {pct}%
                  </span>
                </div>
              </div>
              {!progressMetrics.isLoggedIn && (
                <span className="text-[10px] font-extrabold text-slate-500 mt-1">
                  Sign in to track live progress
                </span>
              )}
            </div>

            <div className="sm:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Courses Completed :{' '}
                  <strong className="font-black text-[#0f2952]">
                    {progressMetrics.coursesCompleted}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Practice Tests :{' '}
                  <strong className="font-black text-[#0f2952]">
                    {progressMetrics.practiceTests}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>
                  Achievements :{' '}
                  <strong className="font-black text-[#0f2952]">
                    {progressMetrics.achievements}
                  </strong>
                </span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => triggerSubAction('perf-results')}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-[#0f2952] font-extrabold text-xs cursor-pointer transition-colors"
                >
                  Open Performance Report →
                </button>
              </div>
            </div>

            <div className="sm:col-span-3 flex items-center justify-center">
              <KeepGoingStarMascot className="w-28 h-28" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Daily Challenge */}
        <div className="rounded-3xl bg-white border-2 border-purple-200 shadow-lg overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3 bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#4338ca] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏆</span>
              <h2 className="text-base sm:text-lg font-display font-black tracking-tight">
                Daily Challenge
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                if (progressMetrics.isLoggedIn) onNavigateTab('quizzes');
                else onOpenDemo('live-quiz');
              }}
              className="px-3 py-1 rounded-full bg-white text-[#4338ca] font-extrabold text-xs flex items-center gap-1 cursor-pointer hover:bg-purple-50 transition-colors"
            >
              <span>Start Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 bg-sky-50/90 p-2.5 rounded-2xl border border-sky-200/80">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Today&apos;s Quiz
                    </span>
                    <span className="text-xs sm:text-sm font-display font-black text-[#0f2952]">
                      25 Questions
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-amber-50/90 p-2.5 rounded-2xl border border-amber-200/80">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block">Time</span>
                    <span className="text-xs sm:text-sm font-display font-black text-[#0f2952]">
                      15 Min
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (progressMetrics.isLoggedIn) onNavigateTab('quizzes');
                  else onOpenDemo('live-quiz');
                }}
                className="w-full py-2.5 px-5 rounded-2xl bg-gradient-to-b from-[#fde047] via-[#facc15] to-[#eab308] hover:brightness-105 text-[#0f2952] font-display font-black text-sm sm:text-base shadow-md border-2 border-[#ca8a04]/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Now</span>
              </button>
            </div>

            <div className="sm:col-span-4 flex items-center justify-center">
              <DailyChallengeBoyMascot className="w-28 h-28" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. IMPORTANT ANNOUNCEMENTS (Clean Notice Bar — No Duplicate Dump)
          ===================================================================== */}
      <section
        aria-label="Important Announcements"
        className="rounded-3xl bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white p-4 sm:p-5 border-2 border-indigo-400/30 shadow-md"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  Important Announcements
                </span>
                <span className="text-xs font-bold text-sky-200">
                  Active Scope: {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                100% syllabus-verified questions across Maharashtra Board, CBSE &amp; ICSE (Classes 1–10). Try the Free Demo or unlock 365 days of full access for just ₹99 one-time payment.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab('all-courses')}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 font-extrabold text-xs cursor-pointer transition-colors"
            >
              Change Board / Class
            </button>
            <button
              type="button"
              onClick={() => onOpenMembership(selectedClass, selectedBoard)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>₹99 / 365 Days Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. QUICK ACCESS BUTTONS (6 Pastel Cards + Single Champion Banner)
          ===================================================================== */}
      <section aria-label="Quick Access Shortcuts" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: 'My Courses',
            icon: BookOpen,
            cardBg: 'from-[#e0f2fe] to-[#bae6fd]',
            border: 'border-sky-300',
            iconBg: 'bg-blue-600 text-white',
            onClick: () => onNavigateTab('all-courses'),
          },
          {
            label: 'Certificates',
            icon: Award,
            cardBg: 'from-[#fef3c7] to-[#fde68a]',
            border: 'border-amber-300',
            iconBg: 'bg-amber-600 text-white',
            onClick: () => triggerSubAction('perf-certificates'),
          },
          {
            label: 'Leaderboard',
            icon: Trophy,
            cardBg: 'from-[#dcfce7] to-[#bbf7d0]',
            border: 'border-emerald-300',
            iconBg: 'bg-emerald-600 text-white',
            onClick: () => triggerSubAction('perf-certificates'),
          },
          {
            label: 'My Account',
            icon: User,
            cardBg: 'from-[#f3e8ff] to-[#e9d5ff]',
            border: 'border-purple-300',
            iconBg: 'bg-purple-600 text-white',
            onClick: () => triggerSubAction('acc-profile'),
          },
          {
            label: 'Help & Support',
            icon: Headphones,
            cardBg: 'from-[#e0f2fe] to-[#cffafe]',
            border: 'border-cyan-300',
            iconBg: 'bg-sky-600 text-white',
            onClick: () => onNavigateTab('help-support'),
          },
          {
            label: 'More Programs',
            icon: Gift,
            cardBg: 'from-[#ffe4e6] to-[#fecdd3]',
            border: 'border-rose-300',
            iconBg: 'bg-rose-600 text-white',
            onClick: () => onNavigateTab('other-programs'),
          },
        ].map((item) => {
          const IconComp = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={`rounded-2xl bg-gradient-to-b ${item.cardBg} border-2 ${item.border} p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-center`}
            >
              <span className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs`}>
                <IconComp className="w-5 h-5" />
              </span>
              <span className="font-display font-black text-xs sm:text-sm text-[#0f2952]">
                {item.label}
              </span>
            </button>
          );
        })}
      </section>

      {/* Single Motivational Heritage Banner */}
      <section aria-label="Scholarship Champion Banner">
        <div
          onClick={() => onNavigateTab('scholarship')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigateTab('scholarship');
            }
          }}
          className="relative overflow-hidden rounded-3xl border-2 border-sky-300 shadow-lg cursor-pointer group bg-gradient-to-r from-[#bae6fd] via-[#e0f2fe] to-[#bae6fd] min-h-[125px] flex items-center justify-center p-4 sm:p-6"
        >
          <ScholarshipChampionBannerSvg className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="relative z-10 text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-3xl font-display font-black italic text-[#0f2952] drop-shadow-xs group-hover:scale-[1.01] transition-transform">
              Be a Scholarship Champion!
            </h2>
            <p className="text-xs sm:text-base font-display font-extrabold italic text-[#1e3a8a]">
              Learn Today... Lead Tomorrow...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
