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
  Flame,
  Cpu,
  Compass,
  Brain,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from '../data/navigationConfig';
import {
  HeroSchoolchildrenIllustration,
  SpecialCardIllustration,
  KeepGoingStarMascot,
  DailyChallengeBoyMascot,
  ScholarshipChampionBannerSvg,
} from './DashboardIllustrations';

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

const MENU_ICON_CONFIG: Record<
  MainMenuId,
  {
    icon: React.FC<{ className?: string }>;
    bgClass: string;
    iconColor: string;
  }
> = {
  home: {
    icon: Home,
    bgClass: 'bg-blue-600 text-white',
    iconColor: 'text-white',
  },
  courses: {
    icon: BookOpen,
    bgClass: 'bg-sky-600 text-white',
    iconColor: 'text-white',
  },
  'special-learning': {
    icon: Star,
    bgClass: 'bg-amber-400 text-slate-950',
    iconColor: 'text-slate-950',
  },
  'study-material': {
    icon: BarChart3,
    bgClass: 'bg-orange-500 text-white',
    iconColor: 'text-white',
  },
  'practice-zone': {
    icon: Target,
    bgClass: 'bg-red-600 text-white',
    iconColor: 'text-white',
  },
  'exam-zone': {
    icon: ClipboardCheck,
    bgClass: 'bg-indigo-600 text-white',
    iconColor: 'text-white',
  },
  performance: {
    icon: TrendingUp,
    bgClass: 'bg-emerald-600 text-white',
    iconColor: 'text-white',
  },
  plans: {
    icon: Crown,
    bgClass: 'bg-rose-600 text-white',
    iconColor: 'text-white',
  },
  account: {
    icon: User,
    bgClass: 'bg-purple-600 text-white',
    iconColor: 'text-white',
  },
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
  const [expandedAccordionId, setExpandedAccordionId] = useState<MainMenuId | null>(
    'special-learning'
  );

  const handleAccordionSubClick = (subId: NavSubActionId) => {
    if (onMenuAction) {
      onMenuAction(subId);
      return;
    }
    switch (subId) {
      case 'sl-scholarship':
        onNavigateTab('scholarship');
        break;
      case 'sl-drawing':
        onNavigateTab('drawing');
        break;
      case 'sl-stories':
        onNavigateTab('stories');
        break;
      case 'sl-shivaji':
        onNavigateTab('shivaji');
        break;
      case 'sl-gk':
        onNavigateTab('cricket');
        break;
      case 'sl-creative':
        onNavigateTab('puzzles');
        break;
      case 'sl-programs':
        onNavigateTab('other-programs');
        break;
      case 'course-all':
      case 'course-maharashtra':
      case 'course-cbse':
      case 'course-icse':
        onNavigateTab('all-courses');
        break;
      case 'sm-notes':
      case 'sm-important-questions':
      case 'sm-textbook-learning':
      case 'sm-question-banks':
        onNavigateTab('study-materials');
        break;
      case 'pz-worksheets':
        onNavigateTab('worksheets');
        break;
      case 'pz-mcq':
      case 'pz-chapter':
      case 'pz-daily':
        onNavigateTab('quizzes');
        break;
      case 'ez-mock-tests':
      case 'ez-exam-practice':
        onNavigateTab('scholarship');
        break;
      case 'ez-model-papers':
      case 'ez-chapter-tests':
        onNavigateTab('quizzes');
        break;
      case 'perf-results':
        onNavigateTab('certificates');
        break;
      case 'perf-tracking':
      case 'perf-analysis':
        onNavigateTab('profile');
        break;
      case 'plan-maharashtra':
      case 'plan-cbse':
      case 'plan-icse':
        onOpenMembership(selectedClass, selectedBoard);
        break;
      case 'acc-login':
        if (progressMetrics.isLoggedIn) onNavigateTab('profile');
        else onOpenAuth('login');
        break;
      case 'acc-register':
        onOpenAuth('register');
        break;
      case 'acc-classes':
        if (progressMetrics.isLoggedIn) onNavigateTab('profile');
        else onOpenAuth('login');
        break;
      case 'acc-subscription':
        onOpenMembership(selectedClass, selectedBoard);
        break;
      default:
        onStartLearningClick();
        break;
    }
  };

  // All 16 Special Learning Cards requested by user (First 12 match exact reference 4x3 grid + 4 additional requested cards)
  const specialCards: Array<{
    id: string;
    title: string;
    subtitle: string;
    illustration:
      | 'courses'
      | 'maths'
      | 'science'
      | 'english'
      | 'drawing'
      | 'stories'
      | 'shivaji'
      | 'puzzles'
      | 'sudoku'
      | 'cricket'
      | 'ai'
      | 'scholarship'
      | 'moral'
      | 'gk'
      | 'writing'
      | 'memory';
    bgClass: string;
    onClick: () => void;
  }> = [
    {
      id: 'card-courses',
      title: 'Courses & Classes',
      subtitle: 'Class 1 to 10 • All 3 Boards',
      illustration: 'courses',
      bgClass:
        'bg-gradient-to-br from-sky-200 via-sky-300 to-blue-300 border-sky-400/80 hover:shadow-sky-300/60',
      onClick: () => onNavigateTab('all-courses'),
    },
    {
      id: 'card-maths',
      title: 'Maths Practice',
      subtitle: 'Numbers, Algebra & Geometry',
      illustration: 'maths',
      bgClass:
        'bg-gradient-to-br from-lime-200 via-lime-300 to-green-300 border-lime-400/80 hover:shadow-lime-300/60',
      onClick: () =>
        progressMetrics.isLoggedIn
          ? onNavigateTab('quizzes', 'Mathematics', 'Mathematics')
          : onOpenDemo('live-quiz'),
    },
    {
      id: 'card-science',
      title: 'Science & Discovery',
      subtitle: 'Physics, Chemistry & Bio',
      illustration: 'science',
      bgClass:
        'bg-gradient-to-br from-pink-200 via-rose-300 to-pink-300 border-pink-400/80 hover:shadow-pink-300/60',
      onClick: () =>
        progressMetrics.isLoggedIn
          ? onNavigateTab('quizzes', 'Science', 'Science')
          : onNavigateTab('study-materials'),
    },
    {
      id: 'card-english',
      title: 'English & Grammar',
      subtitle: 'Vocabulary, Tenses & Skills',
      illustration: 'english',
      bgClass:
        'bg-gradient-to-br from-amber-200 via-orange-300 to-amber-300 border-orange-400/80 hover:shadow-orange-300/60',
      onClick: () =>
        progressMetrics.isLoggedIn
          ? onNavigateTab('quizzes', 'English', 'English')
          : onOpenDemo('live-curriculum'),
    },
    {
      id: 'card-drawing',
      title: 'Drawing Studio',
      subtitle: '120+ Art Templates & Canvas',
      illustration: 'drawing',
      bgClass:
        'bg-gradient-to-br from-purple-200 via-violet-300 to-fuchsia-300 border-purple-400/80 hover:shadow-purple-300/60',
      onClick: () => onNavigateTab('drawing'),
    },
    {
      id: 'card-stories',
      title: 'Story World',
      subtitle: '45+ Audio Moral Stories',
      illustration: 'stories',
      bgClass:
        'bg-gradient-to-br from-emerald-200 via-green-300 to-lime-300 border-emerald-400/80 hover:shadow-emerald-300/60',
      onClick: () => onNavigateTab('stories'),
    },
    {
      id: 'card-shivaji',
      title: 'Shivaji Maharaj Stories',
      subtitle: '50 Swarajya History Chapters',
      illustration: 'shivaji',
      bgClass:
        'bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 border-amber-400/80 hover:shadow-amber-300/60',
      onClick: () => onNavigateTab('shivaji'),
    },
    {
      id: 'card-puzzles',
      title: 'Brain Puzzles',
      subtitle: '47+ Logic & Sequence Riddles',
      illustration: 'puzzles',
      bgClass:
        'bg-gradient-to-br from-blue-200 via-sky-300 to-indigo-300 border-blue-400/80 hover:shadow-blue-300/60',
      onClick: () => onNavigateTab('puzzles'),
    },
    {
      id: 'card-sudoku',
      title: 'Sudoku Game',
      subtitle: '4×4, 6×6 & 9×9 Number Grids',
      illustration: 'sudoku',
      bgClass:
        'bg-gradient-to-br from-green-200 via-emerald-300 to-teal-300 border-green-400/80 hover:shadow-green-300/60',
      onClick: () => onNavigateTab('sudoku'),
    },
    {
      id: 'card-cricket',
      title: 'Cricket & GK',
      subtitle: 'Daily Sports & GK Arena',
      illustration: 'cricket',
      bgClass:
        'bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-300 border-sky-400/80 hover:shadow-sky-300/60',
      onClick: () => onNavigateTab('cricket'),
    },
    {
      id: 'card-ai',
      title: 'AI Learning Academy',
      subtitle: 'AI, Coding & Future Skills',
      illustration: 'ai',
      bgClass:
        'bg-gradient-to-br from-fuchsia-200 via-purple-300 to-violet-300 border-purple-400/80 hover:shadow-purple-300/60',
      onClick: () => onNavigateTab('future-skills'),
    },
    {
      id: 'card-scholarship',
      title: 'Scholarship Corner',
      subtitle: 'MSCE Std 4th & 7th Prep',
      illustration: 'scholarship',
      bgClass:
        'bg-gradient-to-br from-lime-200 via-green-300 to-emerald-300 border-lime-400/80 hover:shadow-lime-300/60',
      onClick: () => onNavigateTab('scholarship'),
    },
    {
      id: 'card-moral',
      title: 'Moral Stories',
      subtitle: 'Values in EN • HI • MR',
      illustration: 'moral',
      bgClass:
        'bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-300 border-orange-400/80 hover:shadow-orange-300/60',
      onClick: () => onNavigateTab('stories'),
    },
    {
      id: 'card-gk',
      title: 'General Knowledge',
      subtitle: 'India, Space & World Facts',
      illustration: 'gk',
      bgClass:
        'bg-gradient-to-br from-cyan-200 via-teal-200 to-sky-300 border-cyan-400/80 hover:shadow-cyan-300/60',
      onClick: () =>
        progressMetrics.isLoggedIn
          ? onNavigateTab('quizzes', 'General Knowledge', 'General Knowledge')
          : onNavigateTab('cricket'),
    },
    {
      id: 'card-writing',
      title: 'Creative Writing',
      subtitle: 'Essays, Letters & Worksheets',
      illustration: 'writing',
      bgClass:
        'bg-gradient-to-br from-rose-200 via-pink-200 to-red-200 border-rose-400/80 hover:shadow-rose-300/60',
      onClick: () => onNavigateTab('worksheets'),
    },
    {
      id: 'card-memory',
      title: 'Memory Games',
      subtitle: 'Pattern & Recall Boosters',
      illustration: 'memory',
      bgClass:
        'bg-gradient-to-br from-yellow-200 via-amber-200 to-lime-200 border-yellow-400/80 hover:shadow-yellow-300/60',
      onClick: () => onNavigateTab('puzzles'),
    },
  ];

  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const clampedPercent = Math.min(100, Math.max(0, progressMetrics.progressPercent));
  const strokeDashoffset =
    ringCircumference - (clampedPercent / 100) * ringCircumference;

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. TOP 3 COLOURFUL SHORTCUT PILL BUTTONS (Matching Reference Top Row)
             🚀 Free Demo | 📖 Courses | 🖥️ Desktop Site
          ===================================================================== */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <button
          type="button"
          onClick={() => onOpenDemo('overview')}
          className="min-h-[48px] sm:min-h-[54px] px-3 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-b from-purple-200 via-violet-200 to-purple-300 hover:from-purple-300 hover:to-violet-300 border-2 border-purple-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700 shrink-0" />
          <span className="font-display font-black text-xs sm:text-base text-slate-900 whitespace-nowrap truncate">
            Free Demo
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('all-courses')}
          className="min-h-[48px] sm:min-h-[54px] px-3 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-300 hover:from-amber-300 hover:to-yellow-400 border-2 border-amber-400 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 shrink-0" />
          <span className="font-display font-black text-xs sm:text-base text-slate-900 whitespace-nowrap truncate">
            Courses
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onToggleViewMode) onToggleViewMode();
          }}
          className="min-h-[48px] sm:min-h-[54px] px-3 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-b from-sky-200 via-blue-200 to-sky-300 hover:from-sky-300 hover:to-blue-300 border-2 border-sky-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          {viewMode === 'desktop' ? (
            <>
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 shrink-0" />
              <span className="font-display font-black text-xs sm:text-base text-slate-900 whitespace-nowrap truncate">
                Mobile View
              </span>
            </>
          ) : (
            <>
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 shrink-0" />
              <span className="font-display font-black text-xs sm:text-base text-slate-900 whitespace-nowrap truncate">
                Desktop Site
              </span>
            </>
          )}
        </button>
      </div>

      {/* =====================================================================
          2. HERO BANNER (Welcome to MyStudyZone! Your Learning World! Learn • Play • Excel)
          ===================================================================== */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-sky-300 bg-gradient-to-br from-sky-300 via-sky-100 to-lime-200 shadow-lg">
        {/* Decorative Grass & Sunny Sky Backdrop */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 opacity-85"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 p-5 sm:p-7 lg:p-8">
          {/* Left Column: Welcome to MyStudyZone + Ribbon + Start Learning CTA */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-sky-300 text-xs font-extrabold text-sky-950 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Classes 1st to 10th • Maharashtra • CBSE • ICSE</span>
            </div>

            <div className="space-y-1">
              <p className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                Welcome to
              </p>
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-[52px] leading-none tracking-tight drop-shadow-xs">
                <span className="text-blue-950">MyStudy</span>
                <span className="text-orange-600">Zone!</span>
              </h1>
            </div>

            {/* Golden Ribbon Banner: Your Learning World! */}
            <div className="inline-block px-6 py-2 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 border-2 border-amber-500 shadow-md">
              <span className="font-display font-black text-base sm:text-2xl text-slate-950 tracking-tight">
                Your Learning World!
              </span>
            </div>

            <p className="font-display font-black text-sm sm:text-lg text-slate-900 tracking-wide">
              Learn • Play • Excel
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={onStartLearningClick}
                className="min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-b from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-display font-black text-base sm:text-lg shadow-lg shadow-orange-600/30 border-2 border-amber-200 flex items-center gap-2.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-xs">
                  <Play className="w-4 h-4 fill-orange-600 ml-0.5" />
                </span>
                <span>Start Learning</span>
              </button>

              {!progressMetrics.isLoggedIn && (
                <button
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="min-h-[48px] px-5 py-3 rounded-full bg-white/95 hover:bg-white text-slate-900 font-display font-extrabold text-sm sm:text-base border-2 border-blue-900/20 shadow-sm cursor-pointer transition-transform hover:scale-105"
                >
                  Register Free
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Happy Indian Schoolchildren + Books + Trophy + Motivational Message */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto">
            <HeroSchoolchildrenIllustration className="w-full h-auto max-h-[270px] drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MAIN NAVIGATION – 9 EXPANDABLE ACCORDION CARDS (Matching Reference)
             HOME | COURSES | SPECIAL LEARNING | STUDY MATERIAL | PRACTICE ZONE |
             EXAM ZONE | PERFORMANCE | PLANS & PRICING | MY ACCOUNT
          ===================================================================== */}
      <section
        aria-label="Expandable Main Navigation"
        className="rounded-3xl bg-white border-2 border-slate-200/90 shadow-md overflow-hidden divide-y divide-slate-200/80"
      >
        {MAIN_NAV_MENUS.map((menu) => {
          const isExpanded = expandedAccordionId === menu.id;
          const iconMeta = MENU_ICON_CONFIG[menu.id] || MENU_ICON_CONFIG.home;
          const IconComponent = iconMeta.icon;
          const isSpecial = menu.id === 'special-learning';
          const cleanLabel = menu.label.replace('🎓 ', '').toUpperCase();

          return (
            <div key={menu.id} className="transition-colors">
              <button
                type="button"
                onClick={() =>
                  setExpandedAccordionId(isExpanded ? null : menu.id)
                }
                aria-expanded={isExpanded}
                className={`w-full min-h-[48px] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors ${
                  isSpecial
                    ? 'bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100/90 hover:from-amber-200/80 hover:to-amber-100'
                    : isExpanded
                    ? 'bg-sky-50/80'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${iconMeta.bgClass} flex items-center justify-center shadow-2xs shrink-0`}
                  >
                    <IconComponent className={`w-4 h-4 ${iconMeta.iconColor}`} />
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm tracking-wide text-slate-900 truncate">
                    {cleanLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline text-[11px] font-bold text-slate-500">
                    {menu.items.length} sections
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="bg-slate-50/90 px-4 sm:px-6 py-3.5 border-t border-slate-200/70">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {menu.items.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => handleAccordionSubClick(sub.id)}
                        className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200/90 hover:border-amber-300 shadow-2xs text-left flex items-center justify-between gap-2 cursor-pointer group transition-all"
                      >
                        <div className="min-w-0">
                          <p className="font-display font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-900 truncate">
                            {sub.label}
                          </p>
                          <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                            {sub.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 shrink-0" />
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
          4. SPECIAL LEARNING SECTION (16 Colourful 3D-Illustrated Cards)
          ===================================================================== */}
      <section id="special-learning-section" className="space-y-3.5">
        {/* Reference-Matched Navy Ribbon Header + Explore • Learn • Enjoy */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-100 via-blue-50 to-sky-100 border border-sky-200 p-1.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-900 text-white shadow-sm">
            <span className="text-lg sm:text-xl" aria-hidden="true">
              🎓
            </span>
            <h2 className="font-display font-black text-base sm:text-xl tracking-tight">
              Special Learning
            </h2>
          </div>

          <div className="px-3 sm:px-5 py-1 flex items-center gap-2">
            <span className="font-display font-extrabold italic text-xs sm:text-base text-blue-950">
              Explore • Learn • Enjoy
            </span>
          </div>
        </div>

        {/* 16 Individual Colourful Cards (4 columns on desktop, 2 columns on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {specialCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={card.onClick}
              className={`group relative overflow-hidden rounded-2xl border-2 p-3 sm:p-4 ${card.bgClass} shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] flex items-center gap-2.5 sm:gap-3.5 text-left cursor-pointer`}
            >
              <div className="shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow-sm">
                <SpecialCardIllustration
                  type={card.illustration}
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-black text-xs sm:text-base text-slate-950 leading-tight">
                  {card.title}
                </h3>
                <p className="text-[10px] sm:text-xs font-bold text-slate-800/85 line-clamp-1 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. STUDENT MOTIVATION SECTION (My Learning Progress & Daily Challenge)
             Uses REAL student data when signed in; never fakes personal stats.
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Left Panel: My Learning Progress */}
        <div className="rounded-3xl bg-white border-2 border-blue-200 shadow-md overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-amber-400 shrink-0" />
              <h3 className="font-display font-black text-base sm:text-lg">
                My Learning Progress
              </h3>
            </div>
            <button
              type="button"
              onClick={() =>
                progressMetrics.isLoggedIn
                  ? onNavigateTab('profile')
                  : onOpenAuth('login')
              }
              className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>{progressMetrics.isLoggedIn ? 'View Details' : 'Login to Sync'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex-1 grid grid-cols-12 items-center gap-3 sm:gap-4 bg-gradient-to-br from-white via-sky-50/50 to-amber-50/30">
            {/* Circular Progress Ring */}
            <div className="col-span-4 sm:col-span-3 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    fill="transparent"
                    stroke="url(#progRingGrad)"
                    strokeWidth="10"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progRingGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display font-black text-xl sm:text-2xl text-slate-900 tabular-nums">
                    {clampedPercent}%
                  </span>
                  <span className="text-[9px] font-extrabold uppercase text-slate-500">
                    {progressMetrics.isLoggedIn ? 'Mastery' : 'Guest Mode'}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Stats Checklist */}
            <div className="col-span-8 sm:col-span-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Courses / Subjects :{' '}
                  <strong className="text-slate-950 tabular-nums">
                    {progressMetrics.coursesCompleted}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Practice Tests :{' '}
                  <strong className="text-slate-950 tabular-nums">
                    {progressMetrics.practiceTests}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Achievements :{' '}
                  <strong className="text-slate-950 tabular-nums">
                    {progressMetrics.achievements}
                  </strong>
                </span>
              </div>
              {!progressMetrics.isLoggedIn && (
                <p className="text-[11px] font-bold text-slate-600 pt-0.5">
                  Sign in to record your live quiz scores, badges &amp; certificates.
                </p>
              )}
            </div>

            {/* Right Mascot: Keep Going! Star */}
            <div className="hidden sm:flex sm:col-span-3 items-center justify-center">
              <KeepGoingStarMascot className="w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Right Panel: Daily Challenge */}
        <div className="rounded-3xl bg-white border-2 border-purple-200 shadow-md overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-fuchsia-800 text-white px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-300 shrink-0" />
              <h3 className="font-display font-black text-base sm:text-lg">
                Daily Challenge
              </h3>
            </div>
            <button
              type="button"
              onClick={() =>
                progressMetrics.isLoggedIn
                  ? onNavigateTab('quizzes')
                  : onOpenDemo('live-quiz')
              }
              className="px-3.5 py-1 rounded-full bg-white text-purple-950 hover:bg-amber-100 text-xs font-black flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shadow-2xs"
            >
              <span>Start Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex-1 grid grid-cols-12 items-center gap-3 sm:gap-4 bg-gradient-to-br from-purple-50/70 via-white to-amber-50/40">
            <div className="col-span-12 sm:col-span-9 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-purple-200/80 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Today&apos;s Quiz
                    </span>
                    <span className="font-display font-black text-sm sm:text-base text-slate-950 tabular-nums">
                      10 Questions
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-purple-200/80 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Time Limit
                    </span>
                    <span className="font-display font-black text-sm sm:text-base text-slate-950 tabular-nums">
                      15 Min
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    progressMetrics.isLoggedIn
                      ? onNavigateTab('quizzes')
                      : onOpenDemo('live-quiz')
                  }
                  className="min-h-[44px] px-6 py-2.5 rounded-2xl bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-display font-black text-sm sm:text-base shadow-md border border-amber-500 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Play Now</span>
                </button>

                <div className="flex items-center gap-1 text-amber-500" title="Daily Achievement Stars">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-[11px] font-extrabold text-slate-700 ml-1">
                    +100 XP Bonus
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex sm:col-span-3 items-center justify-center">
              <DailyChallengeBoyMascot className="w-24 h-24" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. QUICK ACCESS SECTION (6 Illustrated Shortcut Cards)
             My Courses | Certificates | Leaderboard | My Account | Help & Support | More Programs
          ===================================================================== */}
      <section aria-label="Quick Access Shortcuts" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {[
          {
            id: 'qa-courses',
            label: 'My Courses',
            bg: 'bg-sky-100/90 hover:bg-sky-200/80 border-sky-300',
            iconBg: 'bg-blue-600 text-white',
            icon: BookOpen,
            onClick: () => onNavigateTab('all-courses'),
          },
          {
            id: 'qa-certificates',
            label: 'Certificates',
            bg: 'bg-amber-100/90 hover:bg-amber-200/80 border-amber-300',
            iconBg: 'bg-amber-500 text-slate-950',
            icon: Award,
            onClick: () => onNavigateTab('certificates'),
          },
          {
            id: 'qa-leaderboard',
            label: 'Leaderboard',
            bg: 'bg-lime-100/90 hover:bg-lime-200/80 border-lime-300',
            iconBg: 'bg-emerald-600 text-white',
            icon: Trophy,
            onClick: () => onNavigateTab('certificates'),
          },
          {
            id: 'qa-account',
            label: 'My Account',
            bg: 'bg-purple-100/90 hover:bg-purple-200/80 border-purple-300',
            iconBg: 'bg-purple-600 text-white',
            icon: User,
            onClick: () =>
              progressMetrics.isLoggedIn
                ? onNavigateTab('profile')
                : onOpenAuth('login'),
          },
          {
            id: 'qa-support',
            label: 'Help & Support',
            bg: 'bg-cyan-100/90 hover:bg-cyan-200/80 border-cyan-300',
            iconBg: 'bg-sky-600 text-white',
            icon: Headphones,
            onClick: () => onNavigateTab('help-support'),
          },
          {
            id: 'qa-more',
            label: 'More Programs',
            bg: 'bg-pink-100/90 hover:bg-pink-200/80 border-pink-300',
            iconBg: 'bg-rose-600 text-white',
            icon: Gift,
            onClick: () => onNavigateTab('other-programs'),
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 ${item.bg} shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer group active:scale-[0.98]`}
            >
              <div
                className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xs sm:text-sm text-slate-900">
                {item.label}
              </span>
            </button>
          );
        })}
      </section>

      {/* =====================================================================
          7. SPECIAL PROMOTIONAL BANNERS
             - Be a Scholarship Champion! Learn Today... Lead Tomorrow...
             - Explore Indian History | Discover Science | Improve Your Brain Power | Build Your Future with AI
          ===================================================================== */}
      <section className="space-y-4">
        {/* Primary Full-Width Banner: Be a Scholarship Champion! (Matches Bottom of Reference Image) */}
        <div
          onClick={() => onNavigateTab('scholarship')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavigateTab('scholarship');
          }}
          className="relative overflow-hidden rounded-3xl border-2 border-sky-300 shadow-md hover:shadow-xl transition-all cursor-pointer group min-h-[130px] sm:min-h-[156px] flex items-center justify-center"
        >
          <ScholarshipChampionBannerSvg className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 px-4 py-5 text-center max-w-xl mx-auto">
            <h3 className="font-display font-black italic text-xl sm:text-3xl lg:text-4xl text-blue-950 drop-shadow-xs">
              Be a Scholarship Champion!
            </h3>
            <p className="font-display font-extrabold italic text-sm sm:text-lg text-slate-900 mt-1">
              Learn Today... Lead Tomorrow...
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-950 text-amber-300 text-xs font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <span>Open Scholarship Corner (Std 4th &amp; 7th)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* 4 Colourful Promotional Feature Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            type="button"
            onClick={() => onNavigateTab('shivaji')}
            className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 border-2 border-amber-300 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-950">
                Explore Indian History
              </h4>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                50 Chapters of Chhatrapati Shivaji Maharaj &amp; Swarajya
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('study-materials')}
            className="p-4 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 border-2 border-pink-300 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-950">
                Discover Science
              </h4>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                Physics, Chemistry, Biology &amp; EVS Concept Mastery
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('puzzles')}
            className="p-4 rounded-2xl bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 border-2 border-sky-300 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-950">
                Improve Your Brain Power
              </h4>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                Sudoku 4×4/6×6/9×9, Logic Riddles &amp; Memory Games
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('future-skills')}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 via-violet-100 to-fuchsia-100 border-2 border-purple-300 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-950">
                Build Your Future with AI
              </h4>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                AI Learning Academy, Coding &amp; Digital Skills
              </p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
