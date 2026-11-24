import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
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
  ExternalLink,
  FileText,
  PlayCircle,
  Zap,
  HelpCircle,
  Layers,
  Lock,
  LogIn,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId, NavSubItemConfig } from '../data/navigationConfig';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectMeta,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getOfficialTextbooksForBoardClass } from '../data/studyLibrary/textbookLibraryData';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { getExamPapersForSubject } from '../data/studyLibrary/examPapersData';
import { getVideoLessonsForSubject } from '../data/studyLibrary/videoLessonsData';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import {
  SpecialCardIllustration,
  KeepGoingStarMascot,
  DailyChallengeBoyMascot,
  ScholarshipChampionBannerSvg,
  HeroBoardEmblemIcon,
} from './DashboardIllustrations';
import { QuickStudyZoneIconBar, type QuickLearningNavId } from './OneLineIconNavBar';

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
  onOpenPanel?: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  isAuthenticated?: boolean;
  currentRole?: 'student' | 'teacher' | 'admin';
  currentUserName?: string;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onStartLearningClick: () => void;
  viewMode?: 'auto' | 'desktop';
  onToggleViewMode?: () => void;
  progressMetrics: RealStudentProgressMetrics;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
  activeSubActionId?: NavSubActionId;
  activatedBoards?: EducationBoard[];
  getActivatedClassesForBoard?: (board: EducationBoard) => ClassLevel[];
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
    tagline: 'Profile • Refer & Earn • Help & Support',
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
  'account',
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
  onOpenPanel,
  isAuthenticated = false,
  currentRole = 'student',
  currentUserName,
  onOpenMembership,
  onStartLearningClick,
  viewMode = 'auto',
  onToggleViewMode,
  progressMetrics,
  activeMainSection,
  onSelectMainSection,
  activeSubActionId,
  activatedBoards,
  getActivatedClassesForBoard,
}) => {
  const [expandedSectionId, setExpandedSectionId] = useState<MainMenuId>(
    activeMainSection || 'special-learning'
  );

  // Helper to build the exact subsection list for any Main Menu (without duplicating or deleting any subsection)
  const getSubsectionsForMainMenu = (
    sectionId: MainMenuId
  ): (NavSubItemConfig | { id: 'perf-leaderboard'; label: string; description: string; badgeText?: string })[] => {
    const group =
      MAIN_NAV_MENUS.find((m) => m.id === sectionId) ||
      MAIN_NAV_MENUS.find((m) => m.id === 'special-learning')!;
    if (sectionId === 'courses' && isAuthenticated && activatedBoards && activatedBoards.length > 0) {
      return group.items.filter((sub) => {
        if (sub.id === 'course-maharashtra') return activatedBoards.includes('Maharashtra');
        if (sub.id === 'course-cbse') return activatedBoards.includes('CBSE');
        if (sub.id === 'course-icse') return activatedBoards.includes('ICSE');
        if (sub.id === 'course-all') return activatedBoards.length > 1;
        return true;
      });
    }
    if (sectionId === 'performance') {
      return [
        ...group.items,
        {
          id: 'perf-leaderboard',
          label: 'Leaderboard & Rankings',
          description: 'All-India student XP leaderboard, streaks & hall of fame',
          badgeText: 'Leaderboard',
        },
      ];
    }
    return group.items;
  };

  const [selectedSubId, setSelectedSubId] = useState<string>(() => {
    const initialMenu = activeMainSection || 'special-learning';
    const subs = getSubsectionsForMainMenu(initialMenu);
    return subs[0]?.id || 'sl-drawing';
  });

  // Preview subject state for Study Material Level 3 content
  const [previewSubject, setPreviewSubject] = useState<SubjectName>(
    () => getSubjectsForClass(selectedClass, selectedBoard)[0] || 'English'
  );

  useEffect(() => {
    const subjectsForScope = getSubjectsForClass(selectedClass, selectedBoard);
    if (!subjectsForScope.includes(previewSubject)) {
      setPreviewSubject(subjectsForScope[0] || 'English');
    }
  }, [selectedBoard, selectedClass, previewSubject]);

  useEffect(() => {
    if (activeMainSection) {
      setExpandedSectionId(activeMainSection);
      const subs = getSubsectionsForMainMenu(activeMainSection);
      if (subs.length > 0) {
        setSelectedSubId(subs[0].id);
      }
    }
  }, [activeMainSection]);

  useEffect(() => {
    if (!activeSubActionId) return;
    const matchingGroup = MAIN_NAV_MENUS.find((m) =>
      m.items.some((item) => item.id === activeSubActionId)
    );
    if (matchingGroup) {
      setExpandedSectionId(matchingGroup.id);
      setSelectedSubId(activeSubActionId);
    }
  }, [activeSubActionId]);

  const handleOpenRolePortal = (
    panel: 'student' | 'teacher' | 'admin',
    intent?: 'login' | 'register'
  ) => {
    if (onOpenPanel) {
      onOpenPanel(panel, intent);
      return;
    }
    if (panel === 'teacher') {
      onOpenAuth('teacher');
    } else if (panel === 'admin') {
      onOpenAuth('admin');
    } else {
      onOpenAuth(intent === 'register' ? 'register' : 'login');
    }
  };

  const handleSelectAccordionSection = (sectionId: MainMenuId) => {
    setExpandedSectionId(sectionId);
    const subs = getSubsectionsForMainMenu(sectionId);
    if (subs.length > 0) {
      setSelectedSubId(subs[0].id);
    }
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
    } else if (actionId === 'sl-additional-curriculum') {
      onNavigateTab('additional-curriculum');
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

  // Board context for Courses Level 3 (respects board-specific subsections)
  const coursesEffectiveBoard: EducationBoard =
    selectedSubId === 'course-maharashtra'
      ? 'Maharashtra'
      : selectedSubId === 'course-cbse'
      ? 'CBSE'
      : selectedSubId === 'course-icse'
      ? 'ICSE'
      : selectedBoard;

  const currentSubjects = getSubjectsForClass(selectedClass, coursesEffectiveBoard);
  const studyPreviewSubjects = getSubjectsForClass(selectedClass, selectedBoard);

  // Live Study Material preview datasets (100% real data, zero Firestore reads)
  const previewTextbooks =
    expandedSectionId === 'study-material'
      ? getOfficialTextbooksForBoardClass(selectedBoard, selectedClass)
      : [];
  const previewChapters =
    expandedSectionId === 'study-material'
      ? getStudyMaterialsForSubject(selectedBoard, selectedClass, previewSubject)
      : [];
  const previewExamPapers =
    expandedSectionId === 'study-material' || expandedSectionId === 'exam-zone'
      ? getExamPapersForSubject(selectedBoard, selectedClass, previewSubject)
      : null;
  const previewVideos =
    expandedSectionId === 'study-material'
      ? getVideoLessonsForSubject(selectedBoard, selectedClass, previewSubject)
      : [];

  // Helper to get existing icon illustration and colour theme for any sub-action item
  const getSubItemIconVisuals = (
    subId: string,
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
    if (subId === 'home-portals') {
      return {
        emojiIcon: '🔐',
        cardGradient: 'from-[#e0e7ff] via-[#dbeafe] to-[#fef3c7]',
        borderClass: 'border-indigo-400',
      };
    }
    if (subId === 'perf-leaderboard') {
      return {
        emojiIcon: '🏆',
        cardGradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]',
        borderClass: 'border-emerald-400',
      };
    }
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
    if (subId === 'sl-additional-curriculum') {
      return {
        illustrationType: 'writing',
        cardGradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#a5b4fc]',
        borderClass: 'border-[#4f46e5]/40',
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
          ICON-BASED ONE-LINE LEARNING NAVIGATION BAR
          📚 Subjects | 📖 Chapters | 📄 Study Notes | 📝 Worksheets | ✍️ Practice Q&A | ❓ MCQs | 📋 Tests | 🗂️ Previous Papers | 🏆 Results | 🌟 Additional Curriculum
          ===================================================================== */}
      <QuickStudyZoneIconBar
        activeItem={
          expandedSectionId === 'courses'
            ? 'subjects'
            : expandedSectionId === 'study-material'
            ? 'notes'
            : expandedSectionId === 'practice-zone'
            ? 'mcqs'
            : expandedSectionId === 'exam-zone'
            ? 'tests'
            : expandedSectionId === 'performance'
            ? 'results'
            : 'subjects'
        }
        board={selectedBoard}
        classLevel={selectedClass}
        counts={{
          subjects: currentSubjects.length,
        }}
        onNavigate={(target: QuickLearningNavId) => {
          if (target === 'subjects') {
            onNavigateTab('all-courses');
          } else if (target === 'chapters') {
            triggerSubAction('sm-textbook-learning');
          } else if (target === 'notes') {
            triggerSubAction('sm-notes');
          } else if (target === 'worksheets') {
            triggerSubAction('pz-worksheets');
          } else if (target === 'practice_questions') {
            triggerSubAction('sm-question-banks');
          } else if (target === 'mcqs') {
            triggerSubAction('sm-guides');
          } else if (target === 'tests') {
            triggerSubAction('ez-chapter-tests');
          } else if (target === 'previous_papers') {
            triggerSubAction('sm-pdfs');
          } else if (target === 'results') {
            triggerSubAction('perf-results');
          } else if (target === 'additional_curriculum') {
            triggerSubAction('sl-additional-curriculum');
          }
        }}
      />

      {/* =====================================================================
          TWO-LEVEL HORIZONTAL SECTION & SUBSECTION NAVIGATION SYSTEM
          LEVEL 1 (FIRST ROW): ALL Main Section Tabs together horizontally
          LEVEL 2 (SECOND ROW): ONLY the Selected Section's Subsections horizontally
                                strictly BELOW the entire First Row
          LEVEL 3 (THIRD AREA): Selected Subsection's complete relevant content
                                immediately BELOW the Second Row
          ===================================================================== */}
      {(() => {
        const activeSubsections = getSubsectionsForMainMenu(activeMenuGroup.id);
        const activeSub =
          activeSubsections.find((s) => s.id === selectedSubId) || activeSubsections[0];
        const activeSubVisuals = activeSub
          ? getSubItemIconVisuals(activeSub.id, activeMenuGroup.id)
          : null;

        const handleOpenSelectedSubFullPage = () => {
          if (!activeSub) return;
          if (activeSub.id === 'perf-leaderboard') {
            onNavigateTab('leaderboard');
            return;
          }
          if (activeSub.id === 'course-maharashtra' && onSelectBoard) onSelectBoard('Maharashtra');
          if (activeSub.id === 'course-cbse' && onSelectBoard) onSelectBoard('CBSE');
          if (activeSub.id === 'course-icse' && onSelectBoard) onSelectBoard('ICSE');
          triggerSubAction(activeSub.id as NavSubActionId);
        };

        return (
          <section
            id="two-level-horizontal-navigation"
            aria-label="Main Dashboard Two-Level Horizontal Navigation"
            className="rounded-3xl bg-white border-2 border-sky-200/90 shadow-md overflow-hidden"
          >
            {/* ---------------------------------------------------------------
                ROW 1: ALL MAIN SECTION TABS – VERTICAL STACKED
                --------------------------------------------------------------- */}
            <div className="border-b border-sky-200/80 bg-slate-50/90">
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="All Main Sections"
                className="flex flex-col divide-y divide-slate-200/80"
              >
                {DASHBOARD_ACCORDION_MENU_IDS.map((menuId) => {
                  const menu = MAIN_NAV_MENUS.find((m) => m.id === menuId);
                  if (!menu) return null;
                  const meta = MAIN_SECTION_ICONS[menu.id];
                  const IconComp = meta.icon;
                  const isSelected = expandedSectionId === menu.id;
                  const cleanLabel = menu.label.replace('🎓 ', '');

                  return (
                    <button
                      key={menu.id}
                      id={`main-sec-tab-${menu.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="second-row-subsections"
                      onClick={() => handleSelectAccordionSection(menu.id)}
                      className={`w-full min-h-[46px] px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-3 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white border-l-4 border-l-amber-400 shadow-xs'
                          : 'bg-white hover:bg-sky-50/90 text-[#0f2952] border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${meta.badgeBg} ${meta.iconColor} flex items-center justify-center shadow-2xs shrink-0`}
                        >
                          <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </span>
                        <span
                          className={`font-display font-black text-xs sm:text-sm tracking-wide uppercase truncate ${
                            isSelected ? 'text-white' : 'text-[#0f2952]'
                          }`}
                        >
                          {cleanLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-[10px] uppercase tracking-wider hidden sm:inline-block">
                            Selected
                          </span>
                        )}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? 'text-amber-300 translate-x-0.5' : 'text-slate-400'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------------------
                ROW 2: SELECTED SECTION'S SUBSECTIONS – HORIZONTAL ONE-LINE ICON BAR
                --------------------------------------------------------------- */}
            <div
              id="second-row-subsections"
              className="bg-gradient-to-r from-[#e0f2fe]/80 via-[#f0f9ff] to-[#fef9c3]/50 border-b-2 border-sky-200/90 px-3 sm:px-4 py-2.5 space-y-2"
            >
              {/* Fixed Section Context Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white px-3 py-1 rounded-full shadow-2xs">
                  <span className="text-sm leading-none">{activeSectionMeta.pillEmoji}</span>
                  <h2 className="text-xs font-display font-black tracking-tight">
                    {activeMenuGroup.label.replace('🎓 ', '')} — Options ({activeSubsections.length})
                  </h2>
                </div>
                <span className="text-[11px] sm:text-xs font-display font-extrabold text-[#0f2952]">
                  {activeSectionMeta.tagline}
                </span>
              </div>

              {/* Horizontal Scrollable One-Line Icon Row of ONLY Selected Section's Subsections */}
              <div
                role="tablist"
                aria-label={`${activeMenuGroup.label.replace('🎓 ', '')} Subsections`}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar"
              >
                {activeSubsections.map((sub) => {
                  const isSubSelected = activeSub?.id === sub.id;
                  const vis = getSubItemIconVisuals(sub.id, activeMenuGroup.id);

                  return (
                    <button
                      key={sub.id}
                      id={`sub-sec-tab-${sub.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSubSelected}
                      aria-controls="third-area-subsection-content"
                      onClick={() => {
                        setSelectedSubId(sub.id);
                        if (sub.id === 'course-maharashtra' && onSelectBoard) {
                          onSelectBoard('Maharashtra');
                        } else if (sub.id === 'course-cbse' && onSelectBoard) {
                          onSelectBoard('CBSE');
                        } else if (sub.id === 'course-icse' && onSelectBoard) {
                          onSelectBoard('ICSE');
                        }
                      }}
                      className={`shrink-0 whitespace-nowrap min-h-[42px] rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-2 text-left border-2 ${
                        isSubSelected
                          ? 'bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fcd34d] border-[#0f2952] shadow-xs ring-1 ring-[#0f2952]/20'
                          : 'bg-white hover:bg-sky-50/90 border-sky-200/90 hover:border-sky-300 shadow-2xs'
                      }`}
                    >
                      <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                        {vis.emojiIcon ? (
                          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-2xs text-xs">
                            {vis.emojiIcon}
                          </span>
                        ) : vis.boardEmblem ? (
                          <HeroBoardEmblemIcon
                            board={vis.boardEmblem}
                            className="w-6 h-6 drop-shadow-2xs"
                          />
                        ) : (
                          <SpecialCardIllustration
                            type={vis.illustrationType || 'courses'}
                            className="w-full h-full drop-shadow-2xs"
                          />
                        )}
                      </div>
                      <span className="font-display font-black text-xs text-[#0f2952] leading-tight">
                        {sub.label}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSubSelected
                            ? 'bg-[#0f2952] text-amber-300'
                            : 'bg-sky-100/90 text-[#0f2952]/80'
                        }`}
                      >
                        {isSubSelected ? 'Selected' : sub.badgeText || 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------------------
                THIRD AREA – SELECTED SUBSECTION CONTENT (IMMEDIATELY BELOW ROW 2)
                --------------------------------------------------------------- */}
            {activeSub && activeSubVisuals && (
              <div
                id="third-area-subsection-content"
                role="tabpanel"
                aria-label={`${activeSub.label} Content`}
                className="p-4 sm:p-6 bg-white space-y-5 animate-in fade-in duration-150"
              >
                {/* Visually Connected Active Subsection Header */}
                <div
                  className={`rounded-2xl bg-gradient-to-r ${activeSubVisuals.cardGradient} border-2 ${activeSubVisuals.borderClass} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center bg-white/80 rounded-2xl p-1.5 border border-white shadow-2xs">
                      {activeSubVisuals.emojiIcon ? (
                        <span className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center text-2xl">
                          {activeSubVisuals.emojiIcon}
                        </span>
                      ) : activeSubVisuals.boardEmblem ? (
                        <HeroBoardEmblemIcon
                          board={activeSubVisuals.boardEmblem}
                          className="w-full h-full"
                        />
                      ) : (
                        <SpecialCardIllustration
                          type={activeSubVisuals.illustrationType || 'courses'}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#0f2952]/75">
                        <span>{activeMenuGroup.label.replace('🎓 ', '')}</span>
                        <span>&rarr;</span>
                        <span className="bg-[#0f2952] text-amber-300 px-2 py-0.5 rounded-full">
                          {activeSub.badgeText || 'Active Subsection'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-xl font-display font-black text-[#0f2952] leading-snug">
                        {activeSub.label}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[#0f2952]/85 leading-relaxed">
                        {activeSub.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {activeSub.id !== 'home-overview' && activeSub.id !== 'home-portals' && (
                      <button
                        type="button"
                        onClick={handleOpenSelectedSubFullPage}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] hover:brightness-110 text-white font-display font-black text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <span>Open {activeSub.label.replace(/^🎓\s*/, '')}</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    )}
                  </div>
                </div>

                {/* =========================================================
                    CONTENT FOR SECTION 1: HOME
                    ========================================================= */}
                {expandedSectionId === 'home' && (
                  <div className="space-y-4">
                    {activeSub.id === 'home-overview' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-sky-800">
                            Active Academic Scope
                          </span>
                          <p className="text-base font-display font-black text-[#0f2952]">
                            {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
                          </p>
                          <p className="text-xs font-semibold text-slate-600">
                            {studyPreviewSubjects.length} syllabus subjects with Textbooks, Notes, Worksheets &amp; Chapter Tests ready.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleSelectAccordionSection('courses')}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-[#0f2952] hover:text-blue-700 cursor-pointer pt-1"
                          >
                            <span>Browse Class Subjects</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                            100% Free Study Library
                          </span>
                          <p className="text-base font-display font-black text-[#0f2952]">
                            Classes 1 to 10 (All 3 Boards)
                          </p>
                          <p className="text-xs font-semibold text-slate-600">
                            Official Textbooks, Chapter Notes, Short Revision, 9-Format Q&amp;A Bank, Model Papers, PYQs &amp; Videos.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleSelectAccordionSection('study-material')}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900 hover:text-emerald-700 cursor-pointer pt-1"
                          >
                            <span>Explore Study Material</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                            Quick Start &amp; Free Demo
                          </span>
                          <p className="text-base font-display font-black text-[#0f2952]">
                            Try Live Quiz &amp; Worksheets
                          </p>
                          <p className="text-xs font-semibold text-slate-600">
                            Test interactive syllabus quizzes, brain puzzles, and Sudoku right away—zero registration needed for demo.
                          </p>
                          <button
                            type="button"
                            onClick={() => onOpenDemo('live-quiz')}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-amber-950 hover:text-amber-700 cursor-pointer pt-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Launch Free Demo</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {activeSub.id === 'home-how-it-works' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          {
                            id: 'sl-scholarship' as NavSubActionId,
                            title: 'Scholarship Corner',
                            sub: 'MSCE Std 4th & 7th Exam Prep',
                            ill: 'scholarship' as const,
                            bg: 'from-[#dcfce7] to-[#bbf7d0] border-emerald-300',
                          },
                          {
                            id: 'sl-shivaji' as NavSubActionId,
                            title: 'Shivaji Maharaj Stories',
                            sub: '50 Audio Swarajya Chapters',
                            ill: 'shivaji' as const,
                            bg: 'from-[#fef3c7] to-[#fde68a] border-amber-300',
                          },
                          {
                            id: 'sl-drawing' as NavSubActionId,
                            title: 'Drawing Studio',
                            sub: '120+ Templates & Paint Canvas',
                            ill: 'drawing' as const,
                            bg: 'from-[#f3e8ff] to-[#e9d5ff] border-purple-300',
                          },
                          {
                            id: 'sl-ai-academy' as NavSubActionId,
                            title: 'AI Learning Academy',
                            sub: '8 Modules & 24 Future-Tech Lessons',
                            ill: 'ai' as const,
                            bg: 'from-[#fae8ff] to-[#f5d0fe] border-fuchsia-300',
                          },
                        ].map((prog) => (
                          <button
                            key={prog.id}
                            type="button"
                            onClick={() => triggerSubAction(prog.id)}
                            className={`rounded-2xl bg-gradient-to-r ${prog.bg} border-2 p-3.5 text-left flex items-center gap-3 cursor-pointer hover:shadow-md transition-all`}
                          >
                            <span className="w-12 h-12 shrink-0 flex items-center justify-center">
                              <SpecialCardIllustration type={prog.ill} className="w-full h-full" />
                            </span>
                            <div className="min-w-0">
                              <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] truncate">
                                {prog.title}
                              </span>
                              <span className="block text-[11px] font-bold text-[#0f2952]/75 mt-0.5">
                                {prog.sub}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {activeSub.id === 'home-why-choose-us' && (
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
                              100% syllabus-verified questions across Maharashtra Board, CBSE &amp; ICSE (Classes 1–10), 4th &amp; 7th Scholarship, and 200 TET/CTET CBT Mock Tests.
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

                    {activeSub.id === 'home-portals' && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                            Dedicated Portal Sign-In &amp; Registration
                          </span>
                          <span className="text-xs text-slate-600 font-medium">
                            Protected by Firebase Authentication &amp; Single-Device Session Security
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Student Portal */}
                          <div className="bg-white rounded-3xl p-5 border border-indigo-200 shadow-xs flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                                  <GraduationCap className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                                  Classes 1–10 Learners
                                </span>
                              </div>
                              <h4 className="text-base font-display font-extrabold text-slate-900">
                                Student Portal
                              </h4>
                              <p className="text-xs text-slate-600">
                                Sign in or register to save quiz scores, track progress, and access your unlocked board &amp; class courses.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => handleOpenRolePortal('student', 'login')}
                                className="min-h-[40px] px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>
                                  {isAuthenticated && currentRole === 'student'
                                    ? 'Open Portal'
                                    : 'Student Login'}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenRolePortal('student', 'register')}
                                className="min-h-[40px] px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span>Register</span>
                              </button>
                            </div>
                          </div>

                          {/* Teacher Portal */}
                          <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-xs flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                                  <Users className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                                  Educator Hub
                                </span>
                              </div>
                              <h4 className="text-base font-display font-extrabold text-slate-900">
                                Teacher Portal
                              </h4>
                              <p className="text-xs text-slate-600">
                                Dedicated educator portal for classroom worksheets, chapter study notes, and solved question banks.
                              </p>
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => handleOpenRolePortal('teacher', 'login')}
                                className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <UserCheck className="w-4 h-4" />
                                <span>
                                  {isAuthenticated && currentRole === 'teacher'
                                    ? `Open Teacher Hub (${currentUserName?.split(' ')[0] || 'Active'})`
                                    : 'Teacher Login'}
                                </span>
                              </button>
                            </div>
                          </div>

                          {/* Admin Portal */}
                          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-xs flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/30">
                                  <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  <span>Authorized Only</span>
                                </span>
                              </div>
                              <h4 className="text-base font-display font-extrabold text-white">
                                Admin Portal
                              </h4>
                              <p className="text-xs text-slate-300">
                                Protected control console for managing students, boards, subscriptions, and platform content.
                              </p>
                            </div>

                            <div className="pt-2 border-t border-slate-800">
                              <button
                                type="button"
                                onClick={() => handleOpenRolePortal('admin', 'login')}
                                className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>
                                  {isAuthenticated && currentRole === 'admin'
                                    ? 'Open Admin Console'
                                    : 'Secure Admin Login'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 2: COURSES (CLASS 1-10 & SUBJECTS)
                    ========================================================= */}
                {expandedSectionId === 'courses' && (
                  <div className="space-y-4">
                    {/* Class-Wise Horizontal Selector (Shows only activated classes for signed-in student, or Classes 1–10 for public visitors) */}
                    {(() => {
                      const visibleCourseClasses =
                        isAuthenticated && getActivatedClassesForBoard
                          ? getActivatedClassesForBoard(coursesEffectiveBoard)
                          : ALL_10_CLASSES;
                      return (
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                            <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                              {isAuthenticated && getActivatedClassesForBoard
                                ? `Your Active Class${visibleCourseClasses.length > 1 ? 'es' : ''} (${getBoardShortLabel(coursesEffectiveBoard)})`
                                : `Select Class (${getBoardShortLabel(coursesEffectiveBoard)} — Classes 1 to 10)`}
                            </span>
                            <span className="text-[11px] font-bold text-sky-700">
                              Active Class: {selectedClass}
                            </span>
                          </div>
                          <div className="flex items-stretch gap-2 overflow-x-auto pb-1.5">
                            {visibleCourseClasses.map((cls) => {
                              const clsMeta = ALL_10_CLASSES_META.find((m) => m.classLevel === cls);
                              const isCurrentClass = selectedClass === cls;
                              return (
                                <button
                                  key={cls}
                                  type="button"
                                  onClick={() => {
                                    if (onSelectClass) onSelectClass(cls);
                                  }}
                                  className={`min-w-[104px] shrink-0 px-3 py-2 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                    isCurrentClass
                                      ? 'bg-gradient-to-r from-[#0f2952] to-[#1d4ed8] text-white border-amber-400 shadow-sm'
                                      : 'bg-sky-50/80 hover:bg-amber-50 text-[#0f2952] border-sky-200 hover:border-amber-300'
                                  }`}
                                >
                                  <div>
                                    <span className="block font-display font-black text-xs leading-tight">
                                      {cls}
                                    </span>
                                    <span
                                      className={`block text-[10px] font-bold mt-0.5 ${
                                        isCurrentClass ? 'text-amber-300' : 'text-slate-500'
                                      }`}
                                    >
                                      {coursesEffectiveBoard === 'Maharashtra'
                                        ? clsMeta?.marathiLabel
                                        : clsMeta?.shortLabel}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Subject Cards for Selected Board & Class */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                          Syllabus Subjects ({getBoardShortLabel(coursesEffectiveBoard)} &bull; {selectedClass} — {currentSubjects.length} Subjects)
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          Click any subject to open lessons
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {currentSubjects.map((subj) => {
                          const subjMeta = getSubjectMeta(subj, coursesEffectiveBoard);
                          return (
                            <button
                              key={subj}
                              type="button"
                              onClick={() => {
                                if (onSelectBoard) onSelectBoard(coursesEffectiveBoard);
                                onNavigateTab('all-courses', 'overview', subj);
                              }}
                              className="group rounded-2xl bg-gradient-to-r from-white via-sky-50/60 to-indigo-50/50 hover:from-amber-50 hover:to-sky-100 border-2 border-sky-200/90 hover:border-amber-400 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 text-left"
                            >
                              <span className="w-11 h-11 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-2xl shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                                {subjMeta.icon}
                              </span>
                              <div className="min-w-0 flex-1">
                                <span className="block font-display font-black text-xs sm:text-sm text-[#0f2952] truncate">
                                  {subj}
                                </span>
                                <span className="block text-[10px] font-bold text-slate-500 truncate mt-0.5">
                                  {subjMeta.chapters.length} Chapters &bull; Open Lessons
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-sky-600 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Direct Free Textbooks & Notes Access for Selected Board & Class */}
                    <div className="rounded-2xl bg-slate-900 text-white p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-emerald-300">
                          100% Free Forever · Official Textbooks &amp; Chapter Notes
                        </span>
                        <p className="text-xs sm:text-sm font-display font-black text-white">
                          Free Textbooks (382) &amp; Study Material for {getBoardShortLabel(coursesEffectiveBoard)} &bull; {selectedClass}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectBoard) onSelectBoard(coursesEffectiveBoard);
                            triggerSubAction('sm-textbook-learning');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Official Textbooks</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectBoard) onSelectBoard(coursesEffectiveBoard);
                            triggerSubAction('sm-notes');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span>Chapter Notes</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 3: SPECIAL LEARNING STUDIOS
                    ========================================================= */}
                {expandedSectionId === 'special-learning' && (() => {
                  const studioDetailsMap: Record<
                    string,
                    { highlights: string[]; stats: { label: string; value: string }[]; cta: string }
                  > = {
                    'sl-drawing': {
                      highlights: [
                        '120+ structured step-by-step colouring & sketching templates across Nature, Animals, Festivals & Heritage',
                        'Interactive digital paint canvas with brush sizes, colour palette, undo/redo & saved artwork gallery',
                        'Safe child-friendly creative studio encouraging fine motor skills and visual imagination',
                      ],
                      stats: [
                        { label: 'Templates', value: '120+ Artworks' },
                        { label: 'Tools', value: 'Paint & Fill' },
                        { label: 'Gallery', value: 'Save & Print' },
                      ],
                      cta: 'Launch Drawing Studio',
                    },
                    'sl-stories': {
                      highlights: [
                        '45+ curated English, Hindi & Marathi audio-narrated stories with built-in voice playback',
                        'Interactive vocabulary builder, key moral takeaways & comprehension check after every story',
                        'Organised by age group and language for effortless bedtime and classroom reading',
                      ],
                      stats: [
                        { label: 'Library', value: '45+ Stories' },
                        { label: 'Languages', value: 'EN · HI · MR' },
                        { label: 'Narration', value: 'Audio Read-Aloud' },
                      ],
                      cta: 'Open Story World',
                    },
                    'sl-shivaji': {
                      highlights: [
                        '50 chronological historical chapters tracing the life, forts, administration & Swarajya values of Chhatrapati Shivaji Maharaj',
                        'Available with multilingual narration, timeline milestones & historical quiz questions',
                        'Inspires courage, leadership, strategic thinking & respect for heritage among Classes 1–10 students',
                      ],
                      stats: [
                        { label: 'Chapters', value: '50 Chronological' },
                        { label: 'Audio', value: 'Voice Narration' },
                        { label: 'Focus', value: 'Swarajya History' },
                      ],
                      cta: 'Read Shivaji Maharaj Stories',
                    },
                    'sl-moral': {
                      highlights: [
                        'Value-education fables, Panchatantra tales & character-building life lessons',
                        'Clear moral summary highlighted at the end of every tale for daily reflection',
                        'Supports multilingual reading & read-aloud audio narration',
                      ],
                      stats: [
                        { label: 'Category', value: 'Value Education' },
                        { label: 'Themes', value: 'Honesty & Kindness' },
                        { label: 'Format', value: 'Illustrated + Audio' },
                      ],
                      cta: 'Explore Moral Stories',
                    },
                    'sl-scholarship': {
                      highlights: [
                        'Official MSCE Pune Std 4th (PSE) & Std 7th (UPS) Scholarship preparation studio',
                        'Covers Paper 1 (First Language & Mathematics) and Paper 2 (Third Language & Intelligence Test)',
                        'Includes full-length timed mock tests, mental ability drills & instant accuracy evaluation',
                      ],
                      stats: [
                        { label: 'Standards', value: 'Std 4th & 7th' },
                        { label: 'Papers', value: 'Paper 1 & 2' },
                        { label: 'Pattern', value: 'MSCE Official' },
                      ],
                      cta: 'Open Scholarship Corner',
                    },
                    'sl-tet-ctet': {
                      highlights: [
                        '200 Full-Length CBT Mock Tests (100 MAHA TET + 100 CTET) covering Paper 1 (Classes 1–5) and Paper 2 (Classes 6–8)',
                        '30,000 authentic syllabus-aligned questions across CDP, Languages, Mathematics, EVS, Science & Social Studies',
                        'Real exam interface with 150-minute countdown timer, OMR palette, review flags & detailed answer explanations',
                      ],
                      stats: [
                        { label: 'Mock Tests', value: '200 Full Mocks' },
                        { label: 'Question Bank', value: '30,000 Qs' },
                        { label: 'Duration', value: '150 Qs · 150 Mins' },
                      ],
                      cta: 'Enter TET & CTET Exam Prep',
                    },
                    'sl-gk': {
                      highlights: [
                        'Daily Cricket Current Affairs, World Cup records, Indian sports trivia & general knowledge challenges',
                        'Interactive timed GK quiz rounds covering Science, Geography, Indian History & Current Events',
                        'Fresh daily question sets designed to keep students curious and exam-ready',
                      ],
                      stats: [
                        { label: 'Updates', value: 'Daily GK' },
                        { label: 'Topics', value: 'Cricket & World' },
                        { label: 'Mode', value: 'Interactive Quiz' },
                      ],
                      cta: 'Play Cricket & GK Arena',
                    },
                    'sl-ai-academy': {
                      highlights: [
                        '8 structured student modules & 24 interactive lessons introducing Artificial Intelligence, Logic & Future Skills',
                        'Age-appropriate explanations of how smart computers learn, coding basics & safe digital citizenship',
                        'Hands-on mini challenges and knowledge checks in every lesson',
                      ],
                      stats: [
                        { label: 'Curriculum', value: '8 Modules' },
                        { label: 'Lessons', value: '24 Interactive' },
                        { label: 'Track', value: 'Future Tech' },
                      ],
                      cta: 'Open AI Learning Academy',
                    },
                    'sl-additional-curriculum': {
                      highlights: [
                        '10 original enrichment subjects (GK, Logical Reasoning, Moral Education, Computer Knowledge, Vocabulary, Drawing, Environmental Awareness, Life Skills, General Science Activities & Financial/Digital Literacy)',
                        '200 class-wise chapters (Classes 1–10), 200 interactive practice worksheets & 800 unique MCQs across English, Marathi, Hindi & Semi-English mediums',
                        'Clearly labeled MY STUDYZONE ADDITIONAL CURRICULUM — strictly separate from official Maharashtra, CBSE & ICSE board textbooks',
                      ],
                      stats: [
                        { label: 'Subjects', value: '10 Enrichment' },
                        { label: 'Chapters', value: '200 (Cls 1–10)' },
                        { label: 'Practice', value: '800 MCQs' },
                      ],
                      cta: 'Open Additional Curriculum',
                    },
                    'sl-creative': {
                      highlights: [
                        'Creative writing prompts, essay starters, craft projects & enrichment challenges for holistic growth',
                        'Designed to nurture expression, presentation skills & independent thinking alongside academics',
                        'Suitable for all Classes 1 to 10 learners across Maharashtra, CBSE & ICSE boards',
                      ],
                      stats: [
                        { label: 'Focus', value: 'Creative Writing' },
                        { label: 'Activities', value: 'Workshops & Art' },
                        { label: 'Access', value: 'Classes 1–10' },
                      ],
                      cta: 'Open Creative Activities',
                    },
                  };
                  const info = studioDetailsMap[activeSub.id] || studioDetailsMap['sl-drawing'];

                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {info.stats.map((st) => (
                          <div
                            key={st.label}
                            className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-center"
                          >
                            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                              {st.label}
                            </span>
                            <span className="block text-sm sm:text-base font-display font-black text-[#0f2952] mt-0.5">
                              {st.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2952]">
                          What You Will Learn &amp; Explore
                        </span>
                        <ul className="space-y-2">
                          {info.highlights.map((pt, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}

                {/* =========================================================
                    CONTENT FOR SECTION 4: STUDY MATERIAL (LIVE REAL MATERIALS)
                    ========================================================= */}
                {expandedSectionId === 'study-material' && (
                  <div className="space-y-4">
                    {/* Quick Subject Switcher Inside Level 3 for Live Material Preview */}
                    {activeSub.id !== 'sm-textbook-learning' &&
                      activeSub.id !== 'sm-special-hubs' && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 shrink-0">
                            Subject ({getBoardShortLabel(selectedBoard)} · {selectedClass}):
                          </span>
                          {studyPreviewSubjects.map((subj) => {
                            const sMeta = getSubjectMeta(subj, selectedBoard);
                            const isSubjSel = previewSubject === subj;
                            return (
                              <button
                                key={subj}
                                type="button"
                                onClick={() => setPreviewSubject(subj)}
                                className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                                  isSubjSel
                                    ? 'bg-[#0f2952] text-white border-[#0f2952]'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                                }`}
                              >
                                <span>{sMeta.icon}</span>
                                <span>{subj}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                    {/* 1. Textbooks & Syllabus */}
                    {activeSub.id === 'sm-textbook-learning' && (
                      <div className="space-y-4">
                        {/* 100% Free Study Material Library Showcase (Relocated into Study Material) */}
                        <div className="rounded-3xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 shadow-sm space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="space-y-1.5 max-w-2xl">
                              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-300">
                                <span>100% Free Forever</span>
                                <span aria-hidden="true">·</span>
                                <span>No Login Required</span>
                                <span aria-hidden="true">·</span>
                                <span>Maharashtra · CBSE · ICSE (Classes 1–10)</span>
                              </div>
                              <h4 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                                MyStudyZone Free Study Material Library
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Read official textbooks, chapter-wise notes, 1-page revision sheets, 9-format Q&amp;A
                                banks, 10-MCQ chapter tests, board model papers, previous year papers, video lessons,
                                and 12 Science SVG diagrams free across Classes 1 to 10.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => triggerSubAction('sm-notes')}
                              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 whitespace-nowrap"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Open Free Study Library</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-slate-800">
                            {[
                              { label: '📘 Textbook Solutions (NEW)', action: 'sm-textbook-solutions' as NavSubActionId, tab: 'textbook_solutions', highlight: true },
                              { label: '📓 Class Notebook Notes (NEW)', action: 'sm-class-notebook' as NavSubActionId, tab: 'class_notebook', highlight: true },
                              { label: '📄 Chapter Study Notes (A–L)', action: 'sm-notes' as NavSubActionId, tab: 'chapter_notes', highlight: false },
                              { label: '📚 Official Textbooks (382)', action: 'sm-textbook-learning' as NavSubActionId, tab: 'textbooks', highlight: false },
                              { label: '📋 Model Papers & PYQs', action: 'sm-pdfs' as NavSubActionId, tab: 'pyq_papers', highlight: false },
                              { label: '🔬 Math, Science & Grammar', action: 'sm-special-hubs' as NavSubActionId, tab: 'science_diagrams', highlight: false },
                            ].map((quick) => (
                              <button
                                key={quick.tab}
                                type="button"
                                onClick={() => {
                                  if (onMenuAction) {
                                    onMenuAction(quick.action);
                                  } else {
                                    onNavigateTab('study-materials', quick.tab);
                                  }
                                }}
                                className={`px-3 py-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                                  quick.highlight
                                    ? 'bg-amber-400/20 hover:bg-amber-400/30 border-amber-300/60 text-amber-200'
                                    : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-100'
                                }`}
                              >
                                <span className="truncate">{quick.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {previewTextbooks.slice(0, 6).map((tb) => {
                            const sMeta = getSubjectMeta(tb.subject, selectedBoard);
                            return (
                              <div
                                key={tb.id}
                                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between gap-2 text-[11px] font-black text-[#0f2952]">
                                    <span>
                                      {sMeta.icon} {tb.subject}
                                    </span>
                                    <span className="text-slate-500">{tb.totalChapters} Chapters</span>
                                  </div>
                                  <p className="text-xs font-bold text-slate-800 leading-snug">
                                    {tb.bookTitle}
                                  </p>
                                  <p className="text-[11px] text-slate-500">
                                    {tb.publisher} · {tb.mediums.join(' / ')}
                                  </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => onNavigateTab('study-materials', 'chapter_notes', tb.subject)}
                                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-sky-50 border border-slate-300 text-[#0f2952] text-[11px] font-bold cursor-pointer"
                                  >
                                    📄 Notes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onNavigateTab('study-materials', 'textbook_solutions', tb.subject)}
                                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-[11px] font-bold cursor-pointer"
                                  >
                                    📘 Solutions
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onNavigateTab('study-materials', 'class_notebook', tb.subject)}
                                    className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold cursor-pointer"
                                  >
                                    📓 Class Notes
                                  </button>
                                  <a
                                    href={tb.officialReadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 rounded-lg bg-[#0f2952] hover:bg-blue-900 text-white text-[11px] font-bold inline-flex items-center gap-1"
                                  >
                                    <span>e-Book</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2. Chapter Study Notes */}
                    {activeSub.id === 'sm-notes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {previewChapters.slice(0, 4).map((ch) => (
                          <div
                            key={ch.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-mono font-black text-indigo-700">
                                Chapter {String(ch.chapterNumber).padStart(2, '0')}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                100% Free Notes (Sections A–L)
                              </span>
                            </div>
                            <h4 className="text-sm font-display font-black text-[#0f2952]">
                              {ch.chapterTitle}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {ch.overview}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'chapter_notes', previewSubject)}
                                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold cursor-pointer"
                              >
                                📄 Study Notes
                              </button>
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'textbook_solutions', previewSubject)}
                                className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-[11px] font-bold cursor-pointer"
                              >
                                📘 Textbook Solutions
                              </button>
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'class_notebook', previewSubject)}
                                className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold cursor-pointer"
                              >
                                📓 Complete Class Notes
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. Textbook Exercise Solutions */}
                    {activeSub.id === 'sm-textbook-solutions' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-blue-800">
                              📘 Class-Wise Textbook Exercise Solutions · {selectedBoard} · {selectedClass} · {previewSubject}
                            </span>
                            <p className="text-xs text-slate-700 mt-0.5">
                              Complete step-by-step solved answers for every chapter&apos;s end-of-chapter textbook exercises (Fill in the Blanks, Match Pairs, True/False, Give Reasons, Short &amp; Long Answers, Numericals).
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onNavigateTab('study-materials', 'textbook_solutions', previewSubject)}
                            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Open All Textbook Solutions</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {previewChapters.slice(0, 4).map((ch) => (
                            <div
                              key={ch.id}
                              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-mono font-black text-blue-700">
                                  Chapter {String(ch.chapterNumber).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                                  {(ch.textbookExerciseSolutions || []).length || 9} Solved Exercises
                                </span>
                              </div>
                              <h4 className="text-sm font-display font-black text-[#0f2952]">
                                {ch.chapterTitle}
                              </h4>
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {ch.textbookExerciseSolutions?.[0]?.question || ch.overview}
                              </p>
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'textbook_solutions', previewSubject)}
                                className="inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:underline cursor-pointer pt-1"
                              >
                                <span>View Solved Textbook Exercises &amp; Export PDF</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Complete Your Class Notes (School Notebook Exercises) */}
                    {activeSub.id === 'sm-class-notebook' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                              📓 Complete Your Class Notes (School Notebook Writing Guide) · {selectedBoard} · {selectedClass} · {previewSubject}
                            </span>
                            <p className="text-xs text-slate-700 mt-0.5">
                              10 structured written notebook exercises per chapter with writing prompts, notebook checklists, and a hidden-by-default &ldquo;VIEW ANSWERS &amp; CHECK YOUR WORK&rdquo; teacher answer key.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onNavigateTab('study-materials', 'class_notebook', previewSubject)}
                            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Open Class Notebook Exercises</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {previewChapters.slice(0, 4).map((ch) => (
                            <div
                              key={ch.id}
                              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-mono font-black text-amber-800">
                                  Chapter {String(ch.chapterNumber).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                                  {(ch.classNotebookExercises || []).length || 10} Notebook Tasks
                                </span>
                              </div>
                              <h4 className="text-sm font-display font-black text-[#0f2952]">
                                {ch.chapterTitle}
                              </h4>
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {ch.classNotebookExercises?.[0]?.prompt || ch.overview}
                              </p>
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'class_notebook', previewSubject)}
                                className="inline-flex items-center gap-1 text-xs font-black text-amber-800 hover:underline cursor-pointer pt-1"
                              >
                                <span>Open Notebook Exercises &amp; Check Your Work</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Short Revision Sheets */}
                    {activeSub.id === 'sm-summaries' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {previewChapters.slice(0, 4).map((ch) => (
                          <div
                            key={ch.id}
                            className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2"
                          >
                            <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-900">
                              <Zap className="w-3.5 h-3.5 text-amber-600" />
                              <span>
                                Ch {String(ch.chapterNumber).padStart(2, '0')}: {ch.chapterTitle}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                              {ch.shortRevisionNotes?.onePageSummary || ch.overview}
                            </p>
                            <button
                              type="button"
                              onClick={() => onNavigateTab('study-materials', 'sm-summaries', previewSubject)}
                              className="inline-flex items-center gap-1 text-xs font-black text-amber-900 hover:underline cursor-pointer"
                            >
                              <span>Open 1-Page Revision Sheet</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 4. Important Q&A Bank */}
                    {activeSub.id === 'sm-question-banks' && (
                      previewChapters[0] ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(previewChapters[0].qaBank || []).slice(0, 4).map((qa) => (
                            <div
                              key={qa.id}
                              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                                <span className="flex items-center gap-1">
                                  <HelpCircle className="w-3 h-3" />
                                  {qa.formatLabel}
                                </span>
                                <span>{qa.marks}M</span>
                              </div>
                              <p className="text-xs font-bold text-slate-900 line-clamp-2">
                                {qa.question}
                              </p>
                              <p className="text-[11px] text-emerald-800 line-clamp-2">
                                <strong>Answer:</strong> {qa.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
                          PENDING VERIFICATION: Verified Q&amp;A bank for {selectedBoard} · {selectedClass} · {previewSubject} is pending official index verification.
                        </div>
                      )
                    )}

                    {/* 5. Worksheets Reference */}
                    {activeSub.id === 'sm-worksheets' && (
                      <div className="rounded-2xl bg-indigo-50/70 border border-indigo-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800">
                            Original Protected Worksheets Studio · Chapter-Verified Practice
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {getBoardShortLabel(selectedBoard)} &bull; {selectedClass} &bull; {previewSubject} interactive chapter worksheets with answer verification.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onNavigateTab('worksheets', undefined, previewSubject)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Open {previewSubject} Worksheets</span>
                        </button>
                      </div>
                    )}

                    {/* 6. Model & PYQ Papers */}
                    {activeSub.id === 'sm-pdfs' && previewExamPapers && (
                      previewExamPapers.modelPapers.length === 0 && previewExamPapers.pyqPapers.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
                          PENDING VERIFICATION: Model &amp; PYQ papers for {selectedBoard} · {selectedClass} · {previewSubject} are pending verification.
                        </div>
                      ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          ...previewExamPapers.modelPapers.slice(0, 2),
                          ...previewExamPapers.pyqPapers.slice(0, 2),
                        ].map((paper) => (
                          <div
                            key={paper.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2 text-[11px] font-black text-indigo-700">
                              <span>{paper.yearOrTerm}</span>
                              <span>
                                {paper.totalMarks} Marks · {paper.durationLabel}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-[#0f2952]">
                              {paper.title}
                            </p>
                            <button
                              type="button"
                              onClick={() => onNavigateTab('study-materials', 'sm-pdfs', previewSubject)}
                              className="inline-flex items-center gap-1 text-xs font-black text-indigo-700 hover:underline cursor-pointer"
                            >
                              <span>View Paper &amp; Marking Scheme</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      )
                    )}

                    {/* 7. Chapter Tests & Video Lessons */}
                    {activeSub.id === 'sm-guides' && (
                      previewVideos.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
                          PENDING VERIFICATION: Video guides for {selectedBoard} · {selectedClass} · {previewSubject} are pending verification.
                        </div>
                      ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {previewVideos.slice(0, 4).map((vid) => (
                          <div
                            key={vid.id}
                            className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2 text-[11px] font-black text-rose-800">
                              <span className="flex items-center gap-1">
                                <PlayCircle className="w-3.5 h-3.5" />
                                Ch {vid.chapterNumber} Video &amp; 10-MCQ Test
                              </span>
                              <span>{vid.durationLabel}</span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-[#0f2952]">
                              {vid.lessonTitle}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <a
                                href={vid.dikshaSearchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold inline-flex items-center gap-1"
                              >
                                <span>Watch Video</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                type="button"
                                onClick={() => onNavigateTab('study-materials', 'sm-guides', previewSubject)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold cursor-pointer"
                              >
                                Take 10-MCQ Chapter Test
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      )
                    )}

                    {/* 8. Special Academic Hubs */}
                    {activeSub.id === 'sm-special-hubs' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          {
                            title: 'Math Formulas & Drills',
                            desc: 'Class 1–10 essential formulas, squares, cubes & geometry laws',
                            badge: 'Maths Hub',
                          },
                          {
                            title: 'Science Diagrams (12 SVGs)',
                            desc: 'Clean labelled biology, physics & chemistry visual diagrams',
                            badge: '12 SVGs',
                          },
                          {
                            title: 'English Grammar & Vocab',
                            desc: 'Tenses, active-passive voice, parts of speech & idioms',
                            badge: 'Grammar',
                          },
                          {
                            title: 'Scholarship & Olympiad Hub',
                            desc: 'Mental ability tricks, HOTS sets & Olympiad preparation',
                            badge: 'Competitive',
                          },
                        ].map((hub) => (
                          <button
                            key={hub.title}
                            type="button"
                            onClick={() => onNavigateTab('study-materials', 'sm-special-hubs')}
                            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 text-left space-y-1.5 cursor-pointer transition-colors"
                          >
                            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                              {hub.badge}
                            </span>
                            <h4 className="text-xs sm:text-sm font-display font-black text-[#0f2952]">
                              {hub.title}
                            </h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{hub.desc}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 5: PRACTICE ZONE
                    ========================================================= */}
                {expandedSectionId === 'practice-zone' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-lime-50/70 border border-lime-200 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-lime-800">
                        Active Learning Scope
                      </span>
                      <p className="text-sm font-display font-black text-[#0f2952]">
                        {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
                      </p>
                      <p className="text-xs text-slate-600">
                        All drills automatically align to your selected board and standard syllabus.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-800">
                        Practice Format
                      </span>
                      <p className="text-sm font-display font-black text-[#0f2952]">
                        {activeSub.badgeText || 'Interactive Practice'}
                      </p>
                      <p className="text-xs text-slate-600">
                        Instant answer feedback, step-by-step explanations &amp; unlimited retry mastery.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                          Ready to Practice?
                        </span>
                        <p className="text-xs text-slate-700 mt-1 font-semibold">
                          Launch {activeSub.label} and earn XP toward your daily streak.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenSelectedSubFullPage}
                        className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors"
                      >
                        Start {activeSub.label} Now &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 6: EXAM ZONE
                    ========================================================= */}
                {expandedSectionId === 'exam-zone' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-pink-800">
                        Examination Specification
                      </span>
                      <p className="text-sm font-display font-black text-[#0f2952]">
                        {activeSub.badgeText || 'Timed Exam'}
                      </p>
                      <p className="text-xs text-slate-600">{activeSub.description}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800">
                        Scoring &amp; Evaluation
                      </span>
                      <p className="text-sm font-display font-black text-[#0f2952]">
                        Auto-Graded Report Card
                      </p>
                      <p className="text-xs text-slate-600">
                        Receive instant accuracy percentage, question review &amp; performance tracking upon submission.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                          Exam Hall Ready
                        </span>
                        <p className="text-xs text-slate-300 mt-1">
                          Board: {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenSelectedSubFullPage}
                        className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors"
                      >
                        Start {activeSub.label.replace(/^🎓\s*/, '')} &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 7: PERFORMANCE
                    ========================================================= */}
                {expandedSectionId === 'performance' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-indigo-800">
                        Overall Mastery
                      </span>
                      <span className="block text-xl font-display font-black text-[#0f2952] mt-1">
                        {pct}%
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-800">
                        Courses Completed
                      </span>
                      <span className="block text-xl font-display font-black text-[#0f2952] mt-1">
                        {progressMetrics.coursesCompleted}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-amber-800">
                        Practice Tests
                      </span>
                      <span className="block text-xl font-display font-black text-[#0f2952] mt-1">
                        {progressMetrics.practiceTests}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-center">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-purple-800">
                        Achievements
                      </span>
                      <span className="block text-xl font-display font-black text-[#0f2952] mt-1">
                        {progressMetrics.achievements}
                      </span>
                    </div>
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 8: PLANS & PRICING
                    ========================================================= */}
                {expandedSectionId === 'plans' && (
                  <div className="rounded-2xl bg-gradient-to-r from-[#fff7ed] via-white to-[#fef3c7]/60 border-2 border-orange-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-orange-800">
                        <Layers className="w-3.5 h-3.5" />
                        <span>
                          {activeSub.id === 'plan-free'
                            ? '₹0 Forever Free Access'
                            : '₹99 One-Time Activation · 365 Days Full Access'}
                        </span>
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#0f2952] max-w-2xl leading-relaxed">
                        {activeSub.id === 'plan-free'
                          ? 'Free Forever includes the entire Study Material Library (Textbooks, Notes, Revision Sheets, Q&A Banks, Model Papers, PYQs, Chapter Tests, Video Lessons), Free Demo Quizzes, Sudoku & Brain Puzzles.'
                          : 'Unlocks full 4-Level Progressive Quizzes, 25 Interactive Worksheets per subject, Scholarship Corner, Drawing Studio, Story World, Shivaji Maharaj Stories, AI Learning Academy & Champion Certificates for 365 full days with zero auto-renewal.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const planBoard: EducationBoard =
                          activeSub.id === 'plan-cbse'
                            ? 'CBSE'
                            : activeSub.id === 'plan-icse'
                            ? 'ICSE'
                            : activeSub.id === 'plan-maharashtra'
                            ? 'Maharashtra'
                            : selectedBoard;
                        if (activeSub.id === 'plan-free') {
                          onOpenDemo('live-quiz');
                        } else {
                          onOpenMembership(selectedClass, planBoard);
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:brightness-105 text-slate-950 font-display font-black text-xs sm:text-sm shadow-sm cursor-pointer shrink-0"
                    >
                      {activeSub.id === 'plan-free'
                        ? 'Try Free Learning Now →'
                        : 'Unlock ₹99 / 365 Days Plan →'}
                    </button>
                  </div>
                )}

                {/* =========================================================
                    CONTENT FOR SECTION 9: MY ACCOUNT (PROFILE, REFERRALS & HELP)
                    ========================================================= */}
                {expandedSectionId === 'account' && (
                  <div className="rounded-2xl bg-gradient-to-r from-[#f3e8ff]/70 via-white to-[#e0f2fe]/70 border-2 border-purple-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5 max-w-2xl">
                      <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        {activeSub.id === 'acc-referrals' ? (
                          <Gift className="w-5 h-5" />
                        ) : activeSub.id === 'acc-support' ? (
                          <Headphones className="w-5 h-5" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-800">
                          {activeSub.id === 'acc-referrals'
                            ? 'Refer & Earn Rewards · ₹5 Cashback Per Referral'
                            : activeSub.id === 'acc-support'
                            ? '24×7 Student Help Desk & Grievance Support'
                            : 'Personal Account, Purchases & Class Settings'}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-[#0f2952] leading-relaxed">
                          {activeSub.description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenSelectedSubFullPage}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0f2952] via-[#4c1d95] to-[#0f2952] hover:brightness-110 text-white font-display font-black text-xs sm:text-sm shadow-sm cursor-pointer shrink-0 flex items-center gap-2"
                    >
                      <span>Open {activeSub.label.replace(/^🎁\s*/, '')}</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })()}

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

