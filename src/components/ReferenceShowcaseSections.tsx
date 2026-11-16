import React from 'react';
import {
  Play,
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
  Megaphone,
  GraduationCap,
  HelpCircle,
  Info,
  Phone,
  ShieldAlert,
  FileText,
  Sparkles,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from '../data/navigationConfig';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectMeta,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import {
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
  onSelectBoard?: (board: EducationBoard) => void;
  onSelectClass?: (cls: ClassLevel) => void;
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

export const MAIN_SECTION_ICONS: Record<
  MainMenuId,
  {
    icon: React.FC<{ className?: string }>;
    badgeBg: string;
    iconColor: string;
    headerGradient: string;
    borderClass: string;
  }
> = {
  home: {
    icon: Home,
    badgeBg: 'bg-blue-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0f2fe] via-[#f0f9ff] to-[#fef3c7]',
    borderClass: 'border-sky-200',
  },
  courses: {
    icon: BookOpen,
    badgeBg: 'bg-sky-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0f2fe] via-[#bae6fd]/60 to-[#f0f9ff]',
    borderClass: 'border-sky-300',
  },
  'special-learning': {
    icon: Star,
    badgeBg: 'bg-amber-500',
    iconColor: 'text-slate-950',
    headerGradient: 'from-[#fef3c7] via-[#fffbeb] to-[#fde68a]/60',
    borderClass: 'border-amber-300',
  },
  'study-material': {
    icon: BarChart3,
    badgeBg: 'bg-orange-500',
    iconColor: 'text-white',
    headerGradient: 'from-[#dcfce7] via-[#f0fdf4] to-[#fef3c7]',
    borderClass: 'border-emerald-300',
  },
  'practice-zone': {
    icon: Target,
    badgeBg: 'bg-rose-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#ecfccb] via-[#f7fee7] to-[#e0f2fe]',
    borderClass: 'border-lime-300',
  },
  'exam-zone': {
    icon: ClipboardCheck,
    badgeBg: 'bg-indigo-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#fce7f3] via-[#fdf2f8] to-[#e0e7ff]',
    borderClass: 'border-pink-300',
  },
  performance: {
    icon: TrendingUp,
    badgeBg: 'bg-emerald-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0e7ff] via-[#eef2ff] to-[#dcfce7]',
    borderClass: 'border-indigo-300',
  },
  plans: {
    icon: Crown,
    badgeBg: 'bg-red-500',
    iconColor: 'text-white',
    headerGradient: 'from-[#ffedd5] via-[#fff7ed] to-[#fef3c7]',
    borderClass: 'border-orange-300',
  },
  account: {
    icon: User,
    badgeBg: 'bg-purple-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#f3e8ff] via-[#faf5ff] to-[#e0f2fe]',
    borderClass: 'border-purple-300',
  },
};

export const ReferenceShowcaseSections: React.FC<ReferenceShowcaseSectionsProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
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
  const triggerSubAction = (actionId: NavSubActionId) => {
    if (onMenuAction) {
      onMenuAction(actionId);
      return;
    }
    if (actionId === 'acc-referrals') {
      onNavigateTab('referrals');
    } else if (actionId.startsWith('course-')) {
      onNavigateTab('all-courses');
    } else if (actionId === 'sl-scholarship' || actionId === 'ez-mock-tests') {
      onNavigateTab('scholarship');
    } else if (actionId === 'sl-tet-ctet' || actionId === 'ez-tet-ctet') {
      onNavigateTab('tet-ctet');
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

  // Three Education Board Cards Inside the Main Hero Banner
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

  // Progress Ring calculation
  const pct = Math.min(100, Math.max(0, progressMetrics.progressPercent));
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (pct / 100) * ringCircumference;

  // Subjects for selected Board & Class (displayed horizontally inside Section 2: Courses)
  const currentSubjects = getSubjectsForClass(selectedClass, selectedBoard);

  // Helper to get existing icon illustration and colour theme for any sub-action item
  const getSubItemIconVisuals = (
    subId: NavSubActionId,
    menuId: MainMenuId
  ): {
    illustrationType?:
      | 'drawing'
      | 'stories'
      | 'shivaji'
      | 'puzzles'
      | 'sudoku'
      | 'cricket'
      | 'ai'
      | 'scholarship'
      | 'courses'
      | 'maths'
      | 'english'
      | 'gk'
      | 'memory'
      | 'moral'
      | 'writing';
    boardEmblem?: EducationBoard;
    emojiIcon?: string;
    cardGradient: string;
    borderClass: string;
  } => {
    if (subId === 'acc-referrals') {
      return {
        emojiIcon: '🎁',
        cardGradient: 'from-[#fef08a] via-[#fde047] to-[#facc15]',
        borderClass: 'border-amber-500',
      };
    }
    if (subId === 'course-maharashtra' || subId === 'plan-maharashtra') {
      return {
        boardEmblem: 'Maharashtra',
        cardGradient: 'from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]',
        borderClass: 'border-[#2563eb]/60',
      };
    }
    if (subId === 'course-cbse' || subId === 'plan-cbse') {
      return {
        boardEmblem: 'CBSE',
        cardGradient: 'from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]',
        borderClass: 'border-[#16a34a]/60',
      };
    }
    if (subId === 'course-icse' || subId === 'plan-icse') {
      return {
        boardEmblem: 'ICSE',
        cardGradient: 'from-[#fff7ed] via-[#ffedd5] to-[#fed7aa]',
        borderClass: 'border-[#ea580c]/60',
      };
    }
    if (subId === 'sl-drawing') {
      return {
        illustrationType: 'drawing',
        cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
        borderClass: 'border-[#9333ea]/40',
      };
    }
    if (subId === 'sl-stories') {
      return {
        illustrationType: 'stories',
        cardGradient: 'from-[#d9f99d] via-[#a3e635] to-[#84cc16]',
        borderClass: 'border-[#4d7c0f]/40',
      };
    }
    if (subId === 'sl-shivaji') {
      return {
        illustrationType: 'shivaji',
        cardGradient: 'from-[#fde68a] via-[#fcd34d] to-[#f59e0b]',
        borderClass: 'border-[#d97706]/40',
      };
    }
    if (subId === 'sl-moral') {
      return {
        illustrationType: 'moral',
        cardGradient: 'from-[#fed7aa] via-[#fdba74] to-[#fb923c]',
        borderClass: 'border-[#ea580c]/40',
      };
    }
    if (subId === 'sl-scholarship' || subId === 'ez-mock-tests') {
      return {
        illustrationType: 'scholarship',
        cardGradient: 'from-[#d9f99d] via-[#bef264] to-[#86efac]',
        borderClass: 'border-[#15803d]/40',
      };
    }
    if (subId === 'sl-tet-ctet' || subId === 'ez-tet-ctet') {
      return {
        emojiIcon: '🎓',
        cardGradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#a5b4fc]',
        borderClass: 'border-[#4338ca]/50',
      };
    }
    if (subId === 'sl-gk') {
      return {
        illustrationType: 'cricket',
        cardGradient: 'from-[#bfdbfe] via-[#93c5fd] to-[#60a5fa]',
        borderClass: 'border-[#1d4ed8]/40',
      };
    }
    if (subId === 'sl-ai-academy') {
      return {
        illustrationType: 'ai',
        cardGradient: 'from-[#f5d0fe] via-[#e879f9] to-[#c084fc]',
        borderClass: 'border-[#9333ea]/40',
      };
    }
    if (subId === 'sl-creative') {
      return {
        illustrationType: 'writing',
        cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
        borderClass: 'border-[#9333ea]/40',
      };
    }
    if (subId === 'pz-puzzles') {
      return {
        illustrationType: 'puzzles',
        cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]',
        borderClass: 'border-[#2563eb]/40',
      };
    }
    if (subId === 'pz-sudoku') {
      return {
        illustrationType: 'sudoku',
        cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
        borderClass: 'border-[#16a34a]/40',
      };
    }
    if (subId === 'pz-memory') {
      return {
        illustrationType: 'memory',
        cardGradient: 'from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8]',
        borderClass: 'border-[#4f46e5]/40',
      };
    }
    if (subId === 'pz-english' || subId === 'pz-vocabulary') {
      return {
        illustrationType: 'english',
        cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
        borderClass: 'border-[#16a34a]/40',
      };
    }
    if (menuId === 'courses') {
      return {
        illustrationType: 'courses',
        cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8]',
        borderClass: 'border-[#0284c7]/40',
      };
    }
    if (menuId === 'study-material') {
      return {
        illustrationType: 'english',
        cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
        borderClass: 'border-[#16a34a]/40',
      };
    }
    if (menuId === 'practice-zone') {
      return {
        illustrationType: 'maths',
        cardGradient: 'from-[#d9f99d] via-[#bef264] to-[#a3e635]',
        borderClass: 'border-[#65a30d]/40',
      };
    }
    if (menuId === 'exam-zone') {
      return {
        illustrationType: 'gk',
        cardGradient: 'from-[#fbcfe8] via-[#f9a8d4] to-[#f472b6]',
        borderClass: 'border-[#db2777]/40',
      };
    }
    if (menuId === 'performance') {
      return {
        illustrationType: 'memory',
        cardGradient: 'from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8]',
        borderClass: 'border-[#4f46e5]/40',
      };
    }
    if (menuId === 'plans') {
      return {
        illustrationType: 'moral',
        cardGradient: 'from-[#fed7aa] via-[#fdba74] to-[#fb923c]',
        borderClass: 'border-[#ea580c]/40',
      };
    }
    if (menuId === 'account') {
      return {
        illustrationType: 'writing',
        cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
        borderClass: 'border-[#9333ea]/40',
      };
    }
    return {
      illustrationType: 'courses',
      cardGradient: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
      borderClass: 'border-[#0284c7]/40',
    };
  };

  return (
    <div className="space-y-7">
      {/* =====================================================================
          TOP 4 SHORTCUT TABS (Active Class · Free Demo · Courses · Desktop Site)
          ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onNavigateTab('all-courses')}
          aria-label={`Active Class: ${getBoardShortLabel(selectedBoard)} ${selectedClass}`}
          className="h-12 sm:h-13 rounded-2xl bg-gradient-to-b from-[#fef3c7] via-[#fde68a] to-[#fcd34d] hover:brightness-105 text-[#0f2952] font-display font-black text-xs sm:text-sm shadow-md border-2 border-amber-500 flex items-center justify-center gap-2 px-3 cursor-pointer transition-all active:scale-[0.99]"
        >
          <GraduationCap className="w-5 h-5 text-amber-800 shrink-0" />
          <span className="truncate">
            Active Class: {selectedClass} ({getBoardShortLabel(selectedBoard)})
          </span>
        </button>

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
          MAIN EDUCATIONAL HERO BANNER (Uploaded Banner + Interactive Board Cards)
          ===================================================================== */}
      <section
        aria-label="Welcome to MyStudyZone Educational Hero Banner"
        className="rounded-3xl bg-white border-2 border-sky-200/80 shadow-xl overflow-hidden"
      >
        <div className="relative w-full aspect-[3/1] bg-sky-50/60">
          <picture>
            <source
              srcSet="/assets/aistudio/file_00000000bcf8820bad2b1b276650f09a_9a0b6552.webp"
              type="image/webp"
            />
            <img
              src="/assets/aistudio/file_00000000bcf8820bad2b1b276650f09a_9a0b6552.png"
              alt="Welcome to MyStudyZone – Your Learning World (Classes 1 to 10) – Select Your Education Board: Maharashtra State Board, CBSE Board, ICSE Board"
              width={2172}
              height={724}
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover block select-none"
            />
          </picture>

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

        {/* Mobile-Friendly Vertical Interactive Controls */}
        {viewMode !== 'desktop' && (
          <div className="md:hidden px-3.5 pb-4 pt-2 bg-gradient-to-b from-white to-sky-50/70 border-t border-slate-100 space-y-3">
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
          SHORT INTRODUCTION & ORIENTATION GUIDE
          ===================================================================== */}
      <SectionOrientationGuide
        sectionNumber="Complete Dashboard Directory"
        sectionTitle="Welcome to MyStudyZone (Classes 1 to 10)"
        whatIsThis="All main website sections are arranged vertically below, with their related subsections and icons displayed horizontally directly underneath each main heading."
        whatCanILearn={`Complete ${getBoardShortLabel(selectedBoard)} (${selectedClass}) syllabus, 4-level quizzes, worksheets, audio stories, drawing, Sudoku, and scholarship exams.`}
        whatShouldIClick="Find your Main Section heading below and click any Subsection tab directly underneath it to open that page immediately."
        accentTheme="blue"
      />

      {/* =====================================================================
          VERTICAL SEQUENCE OF ALL 9 MAIN SECTIONS
          WITH HORIZONTAL SUBSECTIONS DIRECTLY UNDERNEATH EACH MAIN SECTION
          ===================================================================== */}
      <div className="space-y-8">
        {MAIN_NAV_MENUS.map((menu, sectionIndex) => {
          const sectionMeta = MAIN_SECTION_ICONS[menu.id];
          const MainSectionIcon = sectionMeta.icon;

          // Additional policy & support links under Section 9: My Account so 100% of website pages are included
          const extraAccountSubsections =
            menu.id === 'account'
              ? [
                  {
                    id: 'sub-faqs',
                    label: 'FAQs',
                    description: 'Frequently asked questions for students & parents',
                    badgeText: 'FAQs',
                    icon: HelpCircle,
                    iconBg: 'bg-amber-500 text-slate-950',
                    cardGradient: 'from-[#fef3c7] via-[#fde68a] to-[#fcd34d]',
                    borderClass: 'border-amber-400',
                    onClick: () => onNavigateTab('faqs'),
                  },
                  {
                    id: 'sub-about',
                    label: 'About Us',
                    description: 'Mission, educational vision & platform overview',
                    badgeText: 'About',
                    icon: Info,
                    iconBg: 'bg-sky-600 text-white',
                    cardGradient: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
                    borderClass: 'border-sky-400',
                    onClick: () => onNavigateTab('about'),
                  },
                  {
                    id: 'sub-contact',
                    label: 'Contact Us',
                    description: 'Official student & parent support contact details',
                    badgeText: 'Contact',
                    icon: Phone,
                    iconBg: 'bg-emerald-600 text-white',
                    cardGradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]',
                    borderClass: 'border-emerald-400',
                    onClick: () => onNavigateTab('contact'),
                  },
                  {
                    id: 'sub-grievance',
                    label: 'Grievance Redressal',
                    description: 'Dedicated grievance officer & resolution desk',
                    badgeText: 'Grievance',
                    icon: ShieldAlert,
                    iconBg: 'bg-rose-600 text-white',
                    cardGradient: 'from-[#ffe4e6] via-[#fecdd3] to-[#fda4af]',
                    borderClass: 'border-rose-400',
                    onClick: () => onNavigateTab('grievance'),
                  },
                  {
                    id: 'sub-terms',
                    label: 'Terms, Privacy & Refund Policy',
                    description: 'Terms of use, privacy policy, refund & educational disclaimer',
                    badgeText: 'Policies',
                    icon: FileText,
                    iconBg: 'bg-indigo-600 text-white',
                    cardGradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#a5b4fc]',
                    borderClass: 'border-indigo-400',
                    onClick: () => onNavigateTab('terms'),
                  },
                ]
              : [];

          // Extra Leaderboard subsection under Section 7: Performance so Leaderboard & Certificates are both distinct
          const extraPerformanceSubsections =
            menu.id === 'performance'
              ? [
                  {
                    id: 'sub-leaderboard',
                    label: 'Leaderboard & Rankings',
                    description: 'All-India student XP leaderboard, streaks & hall of fame',
                    badgeText: 'Leaderboard',
                    icon: Trophy,
                    iconBg: 'bg-emerald-600 text-white',
                    cardGradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]',
                    borderClass: 'border-emerald-400',
                    onClick: () => onNavigateTab('leaderboard'),
                  },
                ]
              : [];

          return (
            <section
              key={menu.id}
              id={`main-sec-${menu.id}`}
              aria-label={`${menu.label} Main Section`}
              className={`rounded-3xl bg-white border-2 ${sectionMeta.borderClass} shadow-lg p-4 sm:p-6 space-y-5 scroll-mt-24`}
            >
              {/* -------------------------------------------------------------
                  MAIN SECTION HEADING (Vertical Sequence Item)
                  ------------------------------------------------------------- */}
              <div
                className={`rounded-2xl bg-gradient-to-r ${sectionMeta.headerGradient} border ${sectionMeta.borderClass} p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${sectionMeta.badgeBg} ${sectionMeta.iconColor} flex items-center justify-center shadow-md shrink-0`}
                  >
                    <MainSectionIcon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0f2952] text-amber-300 font-display font-black text-[10px] uppercase tracking-wider">
                        Main Section {sectionIndex + 1}
                      </span>
                      <h2 className="text-lg sm:text-2xl font-display font-black text-[#0f2952] tracking-tight">
                        {menu.label}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
                      {menu.whatIsThis}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerSubAction(menu.defaultActionId)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0f2952] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1d4ed8] text-white font-display font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0"
                >
                  <span>Open {menu.label.replace('🎓 ', '')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* -------------------------------------------------------------
                  SUBSECTIONS – HORIZONTAL ARRANGEMENT DIRECTLY BELOW HEADING
                  ------------------------------------------------------------- */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="text-[11px] font-display font-black uppercase tracking-wider text-slate-600">
                    {menu.label.replace('🎓 ', '')} Subsections (Horizontal Row)
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    Swipe or scroll horizontally →
                  </span>
                </div>

                <div className="flex items-stretch gap-3.5 overflow-x-auto pb-2.5 pt-0.5">
                  {menu.items.map((item) => {
                    const visuals = getSubItemIconVisuals(item.id, menu.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => triggerSubAction(item.id)}
                        className={`min-w-[235px] sm:min-w-[255px] max-w-[285px] shrink-0 group rounded-2xl bg-gradient-to-r ${visuals.cardGradient} border-2 ${visuals.borderClass} p-3.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left`}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {visuals.emojiIcon ? (
                            <span className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm text-2xl">
                              {visuals.emojiIcon}
                            </span>
                          ) : visuals.boardEmblem ? (
                            <HeroBoardEmblemIcon
                              board={visuals.boardEmblem}
                              className="w-13 h-13 drop-shadow-xs"
                            />
                          ) : (
                            <SpecialCardIllustration
                              type={visuals.illustrationType || 'courses'}
                              className="w-full h-full drop-shadow-xs"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] leading-tight">
                            {item.label}
                          </span>
                          <p className="text-[11px] font-bold text-[#0f2952]/80 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f2952] mt-2 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>{item.badgeText || 'Open'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Extra Performance Subsections (Leaderboard) */}
                  {extraPerformanceSubsections.map((extra) => {
                    const ExtraIcon = extra.icon;
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={extra.onClick}
                        className={`min-w-[235px] sm:min-w-[255px] max-w-[285px] shrink-0 group rounded-2xl bg-gradient-to-r ${extra.cardGradient} border-2 ${extra.borderClass} p-3.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left`}
                      >
                        <span
                          className={`w-13 h-13 rounded-2xl ${extra.iconBg} flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <ExtraIcon className="w-6 h-6" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] leading-tight">
                            {extra.label}
                          </span>
                          <p className="text-[11px] font-bold text-[#0f2952]/80 line-clamp-2 mt-1">
                            {extra.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f2952] mt-2 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>{extra.badgeText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Extra Account & Support Subsections (FAQs, About, Contact, Grievance, Terms/Privacy) */}
                  {extraAccountSubsections.map((extra) => {
                    const ExtraIcon = extra.icon;
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={extra.onClick}
                        className={`min-w-[235px] sm:min-w-[255px] max-w-[285px] shrink-0 group rounded-2xl bg-gradient-to-r ${extra.cardGradient} border-2 ${extra.borderClass} p-3.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left`}
                      >
                        <span
                          className={`w-13 h-13 rounded-2xl ${extra.iconBg} flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <ExtraIcon className="w-6 h-6" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] leading-tight">
                            {extra.label}
                          </span>
                          <p className="text-[11px] font-bold text-[#0f2952]/80 line-clamp-2 mt-1">
                            {extra.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f2952] mt-2 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>{extra.badgeText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* -------------------------------------------------------------
                  SECTION 1 (HOME) NESTED HORIZONTAL WIDGETS:
                  Daily Challenge & Important Announcements
                  ------------------------------------------------------------- */}
              {menu.id === 'home' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 border-t border-slate-100">
                  {/* Daily Challenge Card */}
                  <div className="lg:col-span-6 rounded-3xl bg-white border-2 border-purple-200 shadow-md overflow-hidden flex flex-col justify-between">
                    <div className="px-5 py-3 bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#4338ca] text-white flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🏆</span>
                        <h3 className="text-base sm:text-lg font-display font-black tracking-tight">
                          Daily Challenge
                        </h3>
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
                              <span className="text-[11px] font-bold text-slate-500 block">
                                Time
                              </span>
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
                        <DailyChallengeBoyMascot className="w-24 h-24" />
                      </div>
                    </div>
                  </div>

                  {/* Important Announcements Card */}
                  <div className="lg:col-span-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white p-4 sm:p-5 border-2 border-indigo-400/30 shadow-md flex flex-col justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                            Important Announcements
                          </span>
                          <span className="text-xs font-bold text-sky-200">
                            Active Scope: {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                          100% syllabus-verified questions across Maharashtra Board, CBSE &amp; ICSE (Classes 1–10). Try the Free Demo or unlock 365 days of full access for just ₹99 one-time payment.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => onOpenDemo('live-quiz')}
                        className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Try Free Demo</span>
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
                </div>
              )}

              {/* -------------------------------------------------------------
                  SECTION 2 (COURSES) NESTED HORIZONTAL ROWS:
                  1. Class-Wise Tabs (Class 1 to Class 10)
                  2. Subject-Wise Tabs (All Subjects for Selected Board & Class)
                  ------------------------------------------------------------- */}
              {menu.id === 'courses' && (
                <div className="space-y-4 pt-3 border-t border-slate-100">
                  {/* Class-Wise Horizontal Row (Classes 1 to 10) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 px-1">
                      <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                        Class-Wise Tabs ({getBoardShortLabel(selectedBoard)} — Classes 1 to 10)
                      </span>
                      <span className="text-[11px] font-bold text-sky-700">
                        Active: {selectedClass}
                      </span>
                    </div>

                    <div className="flex items-stretch gap-2.5 overflow-x-auto pb-2">
                      {ALL_10_CLASSES.map((cls) => {
                        const clsMeta = ALL_10_CLASSES_META.find((m) => m.classLevel === cls);
                        const isCurrentClass = selectedClass === cls;
                        return (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => {
                              if (onSelectClass) {
                                onSelectClass(cls);
                              }
                              onNavigateTab('all-courses');
                            }}
                            className={`min-w-[115px] shrink-0 px-3.5 py-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isCurrentClass
                                ? 'bg-gradient-to-r from-[#0f2952] to-[#1d4ed8] text-white border-amber-400 shadow-md'
                                : 'bg-sky-50/80 hover:bg-amber-50 text-[#0f2952] border-sky-200 hover:border-amber-300'
                            }`}
                          >
                            <div>
                              <span className="block font-display font-black text-xs sm:text-sm leading-tight">
                                {cls}
                              </span>
                              <span
                                className={`block text-[10px] font-bold mt-0.5 ${
                                  isCurrentClass ? 'text-amber-300' : 'text-slate-500'
                                }`}
                              >
                                {selectedBoard === 'Maharashtra'
                                  ? clsMeta?.marathiLabel
                                  : clsMeta?.shortLabel}
                              </span>
                            </div>
                            <ArrowRight
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isCurrentClass ? 'text-amber-300' : 'text-slate-400'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject-Wise Horizontal Row (All Subjects for Selected Board & Class) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 px-1">
                      <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                        Subject-Wise Tabs ({getBoardShortLabel(selectedBoard)} &bull; {selectedClass} — {currentSubjects.length} Subjects)
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Click any subject to open lessons →
                      </span>
                    </div>

                    <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
                      {currentSubjects.map((subj) => {
                        const subjMeta = getSubjectMeta(subj, selectedBoard);
                        return (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => {
                              if (onSelectBoard) onSelectBoard(selectedBoard);
                              onNavigateTab('all-courses', 'overview', subj);
                            }}
                            className="min-w-[195px] shrink-0 group rounded-2xl bg-gradient-to-r from-white via-sky-50/60 to-indigo-50/50 hover:from-amber-50 hover:to-sky-100 border-2 border-sky-200/90 hover:border-amber-400 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 text-left"
                          >
                            <span className="w-11 h-11 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-2xl shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                              {subjMeta.icon}
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] truncate">
                                {subj}
                              </span>
                              <span className="block text-[10px] font-bold text-slate-500 truncate mt-0.5">
                                {subjMeta.chapters.length} Chapters &bull; Open
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  SECTION 7 (PERFORMANCE) NESTED PROGRESS SUMMARY CARD
                  ------------------------------------------------------------- */}
              {menu.id === 'performance' && (
                <div className="rounded-2xl bg-sky-50/60 border border-sky-200/90 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-3 flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
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
                        <span className="text-xl font-display font-black text-[#0f2952]">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6 space-y-2">
                    <h3 className="text-sm sm:text-base font-display font-black text-[#0f2952]">
                      My Live Learning Progress Summary
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Courses Completed: <strong>{progressMetrics.coursesCompleted}</strong>
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          Practice Tests: <strong>{progressMetrics.practiceTests}</strong>
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>
                          Achievements: <strong>{progressMetrics.achievements}</strong>
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-center">
                    <KeepGoingStarMascot className="w-20 h-20" />
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* =====================================================================
          BOTTOM NAVIGATION BAR WITH PERMANENT 🎁 REFER & EARN TAB
          ===================================================================== */}
      <nav aria-label="Bottom Navigation Menu" className="space-y-4 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
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
              onClick: () => onNavigateTab('leaderboard'),
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
                <span
                  className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs`}
                >
                  <IconComp className="w-5 h-5" />
                </span>
                <span className="font-display font-black text-xs sm:text-sm text-[#0f2952]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Permanent 🎁 Refer & Earn Tab in the Bottom Navigation Menu */}
          <button
            type="button"
            onClick={() => onNavigateTab('referrals')}
            aria-label="Refer & Earn – Open Referral Hub"
            className="col-span-2 sm:col-span-2 xl:col-span-1 rounded-2xl bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#facc15] border-2 border-amber-500 p-3.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-center ring-2 ring-amber-300/60"
          >
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-xs text-xl">
              🎁
            </span>
            <span className="font-display font-black text-xs sm:text-sm text-[#0f2952]">
              Refer &amp; Earn
            </span>
          </button>
        </div>
      </nav>

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
