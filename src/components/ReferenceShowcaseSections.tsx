import React, { useState, useEffect } from 'react';
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
  Sparkles,
  ChevronDown,
  ChevronUp,
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
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
}

export const MAIN_SECTION_ICONS: Record<
  MainMenuId,
  {
    icon: React.FC<{ className?: string }>;
    badgeBg: string;
    iconColor: string;
    headerGradient: string;
    borderClass: string;
    tagline: string;
    pillEmoji: string;
  }
> = {
  home: {
    icon: Home,
    badgeBg: 'bg-blue-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0f2fe] via-[#f0f9ff] to-[#fef3c7]',
    borderClass: 'border-sky-200',
    tagline: 'Welcome • Explore • Quick Access',
    pillEmoji: '🏠',
  },
  courses: {
    icon: BookOpen,
    badgeBg: 'bg-sky-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0f2fe] via-[#bae6fd]/60 to-[#f0f9ff]',
    borderClass: 'border-sky-300',
    tagline: 'Classes 1 to 10 • All Subjects',
    pillEmoji: '📖',
  },
  'special-learning': {
    icon: Star,
    badgeBg: 'bg-amber-400',
    iconColor: 'text-slate-950',
    headerGradient: 'from-[#fef3c7] via-[#fffbeb] to-[#fde68a]/60',
    borderClass: 'border-amber-300',
    tagline: 'Explore • Learn • Enjoy',
    pillEmoji: '🎓',
  },
  'study-material': {
    icon: BarChart3,
    badgeBg: 'bg-orange-500',
    iconColor: 'text-white',
    headerGradient: 'from-[#dcfce7] via-[#f0fdf4] to-[#fef3c7]',
    borderClass: 'border-emerald-300',
    tagline: 'Notes • Worksheets • Summaries',
    pillEmoji: '📊',
  },
  'practice-zone': {
    icon: Target,
    badgeBg: 'bg-rose-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#ecfccb] via-[#f7fee7] to-[#e0f2fe]',
    borderClass: 'border-lime-300',
    tagline: 'Practice • Solve • Master',
    pillEmoji: '🎯',
  },
  'exam-zone': {
    icon: ClipboardCheck,
    badgeBg: 'bg-indigo-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#fce7f3] via-[#fdf2f8] to-[#e0e7ff]',
    borderClass: 'border-pink-300',
    tagline: 'Mock Tests • Scholarship • TET & CTET',
    pillEmoji: '📋',
  },
  performance: {
    icon: TrendingUp,
    badgeBg: 'bg-emerald-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#e0e7ff] via-[#eef2ff] to-[#dcfce7]',
    borderClass: 'border-indigo-300',
    tagline: 'Results • Certificates • Rankings',
    pillEmoji: '📈',
  },
  plans: {
    icon: Crown,
    badgeBg: 'bg-red-500',
    iconColor: 'text-white',
    headerGradient: 'from-[#ffedd5] via-[#fff7ed] to-[#fef3c7]',
    borderClass: 'border-orange-300',
    tagline: 'Free Forever • ₹99 / 365 Days Full Access',
    pillEmoji: '🏵️',
  },
  account: {
    icon: User,
    badgeBg: 'bg-purple-600',
    iconColor: 'text-white',
    headerGradient: 'from-[#f3e8ff] via-[#faf5ff] to-[#e0f2fe]',
    borderClass: 'border-purple-300',
    tagline: 'Profile • Purchases • Support',
    pillEmoji: '👤',
  },
};

const DASHBOARD_ACCORDION_MENU_IDS: MainMenuId[] = [
  'home',
  'courses',
  'special-learning',
  'study-material',
  'practice-zone',
  'exam-zone',
  'performance',
  'plans',
];

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
  activeMainSection,
  onSelectMainSection,
}) => {
  const [expandedSectionId, setExpandedSectionId] = useState<MainMenuId>(
    activeMainSection && activeMainSection !== 'account' ? activeMainSection : 'special-learning'
  );

  useEffect(() => {
    if (activeMainSection && activeMainSection !== 'account') {
      setExpandedSectionId(activeMainSection);
    }
  }, [activeMainSection]);

  const handleSelectAccordionSection = (sectionId: MainMenuId) => {
    setExpandedSectionId(sectionId);
    if (onSelectMainSection) {
      onSelectMainSection(sectionId);
    }
  };

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
    } else if (actionId === 'pz-worksheets') {
      onNavigateTab('worksheets');
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

  // Progress Ring calculation
  const pct = Math.min(100, Math.max(0, progressMetrics.progressPercent));
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (pct / 100) * ringCircumference;

  // Subjects for selected Board & Class (displayed inside Section 2: Courses)
  const currentSubjects = getSubjectsForClass(selectedClass, selectedBoard);

  // Reference-matched 12 Special Learning Cards (preserving exact titles, illustrations, colours & destinations)
  const specialLearningReferenceCards: {
    id: string;
    title: string;
    illustrationType:
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
      | 'scholarship';
    cardGradient: string;
    borderClass: string;
    onClick: () => void;
  }[] = [
    {
      id: 'sl-card-courses',
      title: 'Courses & Classes',
      illustrationType: 'courses',
      cardGradient: 'from-[#bae6fd] via-[#93c5fd] to-[#7dd3fc]',
      borderClass: 'border-sky-400',
      onClick: () => onNavigateTab('all-courses'),
    },
    {
      id: 'sl-card-maths',
      title: 'Maths Practice',
      illustrationType: 'maths',
      cardGradient: 'from-[#d9f99d] via-[#bef264] to-[#a3e635]',
      borderClass: 'border-lime-500',
      onClick: () => triggerSubAction('pz-maths'),
    },
    {
      id: 'sl-card-science',
      title: 'Science & Discovery',
      illustrationType: 'science',
      cardGradient: 'from-[#fbcfe8] via-[#f9a8d4] to-[#f472b6]',
      borderClass: 'border-pink-400',
      onClick: () => triggerSubAction('pz-science'),
    },
    {
      id: 'sl-card-english',
      title: 'English & Grammar',
      illustrationType: 'english',
      cardGradient: 'from-[#fed7aa] via-[#fdba74] to-[#fb923c]',
      borderClass: 'border-orange-400',
      onClick: () => triggerSubAction('pz-english'),
    },
    {
      id: 'sl-card-drawing',
      title: 'Drawing Studio',
      illustrationType: 'drawing',
      cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
      borderClass: 'border-purple-400',
      onClick: () => triggerSubAction('sl-drawing'),
    },
    {
      id: 'sl-card-stories',
      title: 'Story World',
      illustrationType: 'stories',
      cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      borderClass: 'border-emerald-400',
      onClick: () => triggerSubAction('sl-stories'),
    },
    {
      id: 'sl-card-shivaji',
      title: 'Shivaji Stories',
      illustrationType: 'shivaji',
      cardGradient: 'from-[#fde68a] via-[#fcd34d] to-[#fbbf24]',
      borderClass: 'border-amber-500',
      onClick: () => triggerSubAction('sl-shivaji'),
    },
    {
      id: 'sl-card-puzzles',
      title: 'Brain Puzzles',
      illustrationType: 'puzzles',
      cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]',
      borderClass: 'border-sky-400',
      onClick: () => triggerSubAction('pz-puzzles'),
    },
    {
      id: 'sl-card-sudoku',
      title: 'Sudoku Game',
      illustrationType: 'sudoku',
      cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      borderClass: 'border-emerald-500',
      onClick: () => triggerSubAction('pz-sudoku'),
    },
    {
      id: 'sl-card-cricket',
      title: 'Cricket & GK',
      illustrationType: 'cricket',
      cardGradient: 'from-[#bae6fd] via-[#93c5fd] to-[#60a5fa]',
      borderClass: 'border-blue-400',
      onClick: () => triggerSubAction('sl-gk'),
    },
    {
      id: 'sl-card-ai',
      title: 'AI Learning Academy',
      illustrationType: 'ai',
      cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
      borderClass: 'border-purple-400',
      onClick: () => triggerSubAction('sl-ai-academy'),
    },
    {
      id: 'sl-card-scholarship',
      title: 'Scholarship Corner',
      illustrationType: 'scholarship',
      cardGradient: 'from-[#fef08a] via-[#d9f99d] to-[#a3e635]',
      borderClass: 'border-lime-500',
      onClick: () => triggerSubAction('sl-scholarship'),
    },
  ];

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
      | 'science'
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
    if (subId === 'pz-science') {
      return {
        illustrationType: 'science',
        cardGradient: 'from-[#fbcfe8] via-[#f9a8d4] to-[#f472b6]',
        borderClass: 'border-pink-400',
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
        cardGradient: 'from-[#fed7aa] via-[#fdba74] to-[#fb923c]',
        borderClass: 'border-orange-400',
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
    return {
      illustrationType: 'courses',
      cardGradient: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
      borderClass: 'border-[#0284c7]/40',
    };
  };

  const activeMenuGroup =
    MAIN_NAV_MENUS.find((m) => m.id === expandedSectionId) ||
    MAIN_NAV_MENUS.find((m) => m.id === 'special-learning')!;
  const activeSectionMeta = MAIN_SECTION_ICONS[activeMenuGroup.id];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* =====================================================================
          TOP SHORTCUT TABS (Active Class · Free Demo · Courses · Desktop Site)
          ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => handleSelectAccordionSection('courses')}
          aria-label={`Active Class: ${getBoardShortLabel(selectedBoard)} ${selectedClass}`}
          className="h-11 sm:h-12 rounded-2xl bg-gradient-to-b from-[#fef3c7] via-[#fde68a] to-[#fcd34d] hover:brightness-105 text-[#0f2952] font-display font-black text-xs sm:text-sm shadow-sm border-2 border-amber-400 flex items-center justify-center gap-2 px-3 cursor-pointer transition-all active:scale-[0.99]"
        >
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800 shrink-0" />
          <span className="truncate">
            Active Class: {selectedClass} ({getBoardShortLabel(selectedBoard)})
          </span>
        </button>

        <button
          type="button"
          onClick={() => onOpenDemo('live-quiz')}
          className="h-11 sm:h-12 rounded-2xl bg-gradient-to-b from-[#e0d4fc] via-[#c4b5fd] to-[#a78bfa] hover:brightness-105 text-[#1e1b4b] font-display font-black text-xs sm:text-base shadow-sm border-2 border-[#8b5cf6]/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span className="text-lg sm:text-xl drop-shadow-xs">🚀</span>
          <span>Free Demo</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('all-courses')}
          className="h-11 sm:h-12 rounded-2xl bg-gradient-to-b from-[#fef08a] via-[#facc15] to-[#eab308] hover:brightness-105 text-[#1e1b4b] font-display font-black text-xs sm:text-base shadow-sm border-2 border-[#ca8a04]/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          <span className="text-lg sm:text-xl drop-shadow-xs">📖</span>
          <span>Courses</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onToggleViewMode) onToggleViewMode();
          }}
          className="h-11 sm:h-12 rounded-2xl bg-gradient-to-b from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] hover:brightness-105 text-[#0c4a6e] font-display font-black text-xs sm:text-base shadow-sm border-2 border-[#0284c7]/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
        >
          {viewMode === 'desktop' ? (
            <>
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-[#0369a1]" />
              <span>Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-[#0369a1]" />
              <span>Desktop Site</span>
            </>
          )}
        </button>
      </div>

      {/* =====================================================================
          SECOND SECTION – ATTACHED MYSTUDYZONE PROMOTIONAL BANNER
          Uses exact attached reference image (/assets/aistudio/IMG-20261117-WA0052_8bad2f82.jpg)
          Positioned below top header/portal selection and above the main navigation menu.
          ===================================================================== */}
      <section
        aria-label="Welcome to MyStudyZone Promotional Banner"
        className="rounded-3xl bg-white border-2 border-sky-300 shadow-lg overflow-hidden"
      >
        <div className="relative w-full aspect-[1000/282] overflow-hidden bg-sky-100">
          <img
            src="/assets/aistudio/IMG-20261117-WA0052_8bad2f82.jpg"
            alt="Welcome to MyStudyZone! Your Learning World! Learn • Play • Excel — Start Learning"
            width={1024}
            height={1536}
            fetchPriority="high"
            decoding="async"
            className="w-[102.4%] max-w-none -ml-[1.2%] -mt-[14.6%] block select-none pointer-events-none"
          />

          {/* Interactive Clickable Hotspot over "▶ Start Learning" button in the banner */}
          <button
            type="button"
            onClick={onStartLearningClick}
            aria-label="Start Learning"
            title="Start Learning"
            style={{
              left: '19.5%',
              top: '65.5%',
              width: '22.5%',
              height: '25.5%',
            }}
            className="absolute z-10 rounded-full cursor-pointer transition-all duration-150 hover:ring-4 hover:ring-white/90 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <span className="sr-only">Start Learning</span>
          </button>
        </div>
      </section>

      {/* =====================================================================
          THIRD SECTION – MAIN DASHBOARD NAVIGATION MENU (SINGLE-OPEN ACCORDION)
          All 8 main menu sections remain visible with their existing icons & arrows.
          Clicking any section expands its subsections directly below the main menu.
          ===================================================================== */}
      <section
        aria-label="Main Dashboard Navigation Menu"
        className="rounded-3xl bg-white border-2 border-sky-200/90 shadow-md overflow-hidden divide-y divide-slate-200/80"
      >
        {DASHBOARD_ACCORDION_MENU_IDS.map((menuId) => {
          const menu = MAIN_NAV_MENUS.find((m) => m.id === menuId);
          if (!menu) return null;
          const meta = MAIN_SECTION_ICONS[menu.id];
          const IconComp = meta.icon;
          const isSelected = expandedSectionId === menu.id;
          const cleanLabel = menu.label.replace('🎓 ', '').toUpperCase();

          return (
            <button
              key={menu.id}
              type="button"
              id={`accordion-menu-${menu.id}`}
              aria-expanded={isSelected}
              aria-controls="dashboard-expanded-subsections"
              onClick={() => handleSelectAccordionSection(menu.id)}
              className={`w-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#fef3c7] via-[#fde68a]/85 to-[#fef3c7] text-[#0f2952] font-black shadow-inner'
                  : 'bg-white hover:bg-sky-50/70 text-[#0f2952]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${meta.badgeBg} ${meta.iconColor} flex items-center justify-center shadow-xs shrink-0`}
                >
                  <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span className="font-display font-black text-xs sm:text-sm md:text-base tracking-wide uppercase text-[#0f2952] truncate">
                  {cleanLabel}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`hidden sm:inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#0f2952] text-amber-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isSelected ? 'Expanded' : meta.tagline}
                </span>
                {isSelected ? (
                  <ChevronUp className="w-5 h-5 text-[#0f2952] stroke-[2.75]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-600 stroke-[2.5]" />
                )}
              </div>
            </button>
          );
        })}
      </section>

      {/* =====================================================================
          FOURTH SECTION – DYNAMIC SUBSECTIONS (DIRECTLY BELOW THE MAIN MENU)
          Only ONE main section is expanded at a time.
          ===================================================================== */}
      <section
        id="dashboard-expanded-subsections"
        aria-label={`${activeMenuGroup.label.replace('🎓 ', '')} Subsections`}
        className="rounded-3xl bg-white/95 border-2 border-sky-200/90 shadow-md overflow-hidden"
      >
        {/* Reference-Matched Navy Pill Section Header Bar */}
        <div className="bg-gradient-to-r from-[#e0f2fe] via-[#bae6fd]/60 to-[#e0f2fe] px-3 sm:px-5 py-2.5 border-b border-sky-200/80 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm">
            <span className="text-base sm:text-lg leading-none">{activeSectionMeta.pillEmoji}</span>
            <h2 className="text-sm sm:text-lg font-display font-black tracking-tight">
              {activeMenuGroup.label.replace('🎓 ', '')}
            </h2>
          </div>

          <span className="text-xs sm:text-base font-display font-black italic text-[#0f2952] pr-2">
            {activeSectionMeta.tagline}
          </span>
        </div>

        {/* Expanded Subsections Content Body */}
        <div className="p-3.5 sm:p-5 space-y-4">
          {expandedSectionId === 'special-learning' ? (
            <>
              {/* 4x3 Grid of the Exact 12 Special Learning Cards from Reference Image */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
                {specialLearningReferenceCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={card.onClick}
                    className={`group rounded-2xl bg-gradient-to-r ${card.cardGradient} border-2 ${card.borderClass} p-2.5 sm:p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3.5 text-left min-h-[78px] sm:min-h-[88px]`}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <SpecialCardIllustration
                        type={card.illustrationType}
                        className="w-full h-full drop-shadow-xs"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-display font-black text-xs sm:text-base text-[#0f2952] leading-snug">
                        {card.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Additional Special Learning Quick-Access Studios (TET/CTET, Moral Stories, Creative Activities) */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  More Special Learning Studios:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerSubAction('sl-tet-ctet')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-300 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>🎓 TET &amp; CTET Exam Prep (200 Mocks)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerSubAction('sl-moral')}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>💛 Moral Stories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerSubAction('sl-creative')}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-300 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>🎨 Creative Activities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Responsive Grid of Colourful Subsection Cards for Selected Main Menu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                {activeMenuGroup.items.map((item) => {
                  const visuals = getSubItemIconVisuals(item.id, activeMenuGroup.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => triggerSubAction(item.id)}
                      className={`group rounded-2xl bg-gradient-to-r ${visuals.cardGradient} border-2 ${visuals.borderClass} p-3 sm:p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left`}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {visuals.emojiIcon ? (
                          <span className="w-13 h-13 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-sm text-2xl">
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
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f2952] mt-1.5 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs">
                          <span>{item.badgeText || 'Open'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}

                {expandedSectionId === 'performance' && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('leaderboard')}
                    className="group rounded-2xl bg-gradient-to-r from-[#dcfce7] via-[#bbf7d0] to-[#86efac] border-2 border-emerald-400 p-3 sm:p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3 text-left"
                  >
                    <span className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] leading-tight">
                        Leaderboard &amp; Rankings
                      </span>
                      <p className="text-[11px] font-bold text-[#0f2952]/80 line-clamp-2 mt-1">
                        All-India student XP leaderboard, streaks &amp; hall of fame
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0f2952] mt-1.5 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs">
                        <span>Leaderboard</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Extra Home Quick Overview & Important Announcements when HOME is selected */}
              {expandedSectionId === 'home' && (
                <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white p-4 sm:p-5 border border-indigo-400/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
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
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                        100% syllabus-verified questions across Maharashtra Board, CBSE &amp; ICSE (Classes 1–10), 4th &amp; 7th Scholarship, and TET/CTET.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenDemo('live-quiz')}
                      className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Try Free Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenMembership(selectedClass, selectedBoard)}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>₹99 / 365 Days Plan</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Extra Class-Wise & Subject-Wise Tabs when COURSES is selected */}
              {expandedSectionId === 'courses' && (
                <div className="space-y-4 pt-3 border-t border-slate-100">
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
            </>
          )}
        </div>
      </section>

      {/* =====================================================================
          BOTTOM SECTION – MY LEARNING PROGRESS & DAILY CHALLENGE
          Appears ONLY ONCE at the bottom of the expanded subsection area.
          ===================================================================== */}
      <section
        aria-label="My Learning Progress and Daily Challenge"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      >
        {/* Left Card: My Learning Progress */}
        <div className="lg:col-span-6 rounded-3xl bg-white border-2 border-sky-300 shadow-md overflow-hidden flex flex-col justify-between">
          <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#1d4ed8] text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none">📊</span>
              <h3 className="text-base sm:text-lg font-display font-black tracking-tight">
                My Learning Progress
              </h3>
            </div>
            <button
              type="button"
              onClick={() => triggerSubAction('perf-tracking')}
              className="text-xs sm:text-sm font-extrabold text-sky-100 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Circular Progress Ring */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
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
                    stroke="url(#progressRingGradBottom)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                  />
                  <defs>
                    <linearGradient id="progressRingGradBottom" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-display font-black text-[#0f2952]">
                    {pct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Metrics List */}
            <div className="sm:col-span-5 space-y-2.5 text-xs sm:text-sm font-bold text-[#0f2952]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Courses Completed : <strong>{progressMetrics.coursesCompleted}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Practice Tests : <strong>{progressMetrics.practiceTests}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>
                  Achievements : <strong>{progressMetrics.achievements}</strong>
                </span>
              </div>
            </div>

            {/* Keep Going Star Mascot */}
            <div className="sm:col-span-3 flex items-center justify-center">
              <KeepGoingStarMascot className="w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Right Card: Daily Challenge */}
        <div className="lg:col-span-6 rounded-3xl bg-white border-2 border-purple-300 shadow-md overflow-hidden flex flex-col justify-between">
          <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-[#581c87] via-[#7e22ce] to-[#4338ca] text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none">🏆</span>
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
              className="px-3.5 py-1 rounded-full bg-white text-[#4338ca] font-extrabold text-xs flex items-center gap-1 cursor-pointer hover:bg-purple-50 transition-colors shadow-2xs"
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
      </section>

      {/* =====================================================================
          BOTTOM NAVIGATION BAR WITH PERMANENT 🎁 REFER & EARN TAB
          ===================================================================== */}
      <nav aria-label="Bottom Navigation Menu" className="space-y-4 pt-1">
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
            <h2 className="text-xl sm:text-3xl font-display font-extrabold italic text-[#0f2952] drop-shadow-xs group-hover:scale-[1.01] transition-transform">
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

