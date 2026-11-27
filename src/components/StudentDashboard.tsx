import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel, EducationBoard, PlanSkuId, PortalRole, SubjectName, QuizLevel } from '../types';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import { ALL_10_CLASSES_META, getSubjectsForClass } from '../data/classCurriculumConfig';
import {
  formatStandardOrdinal,
  getBoardShortLabel,
  getClassSubscriptionInfo,
} from '../utils/subscriptionAccess';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Lock,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  LogIn,
  UserPlus,
  Crown,
} from 'lucide-react';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';

export interface StudentDashboardProps {
  // Authenticated StudentDashboard props (from App.tsx)
  onNavigateTab?: (tab: string, subject?: SubjectName, level?: QuizLevel) => void;
  onOpenMembership?: (
    plan?: 'basic' | 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard,
    planSku?: PlanSkuId
  ) => void;
  viewMode?: 'auto' | 'desktop';
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onGlobalSearchJump?: (target: GlobalSearchJumpTarget) => void;
  onOpenDemo?: (
    demoTab?: 'overview' | 'demo-mock-tests' | 'live-curriculum' | 'live-quiz' | 'live-puzzles'
  ) => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (section: MainMenuId) => void;
  activeSubActionId?: NavSubActionId;
  onOpenPanel?: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;

  // Optional overrides when rendered via PublicHomeDashboard
  selectedBoard?: EducationBoard;
  selectedClass?: ClassLevel;
  onSelectBoard?: (b: EducationBoard) => void;
  onSelectClass?: (c: ClassLevel) => void;
  onNavigateZone?: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onOpenAuth?: (tab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
}

type StudentCategoryFolderId =
  | 'learning-tools'
  | 'scholarship-competitive'
  | 'creative-cultural'
  | 'progress-account'
  | null;

interface SubItemCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenMembership,
  onOpenDemo,
  onOpenPanel,
  selectedBoard: propSelectedBoard,
  selectedClass: propSelectedClass,
  onSelectBoard,
  onSelectClass,
  onNavigateZone,
  onOpenAuth,
}) => {
  const {
    currentStudent,
    activeBoard,
    switchActiveBoardAndClass,
    setIsAuthModalOpen,
  } = useApp();

  const [activeFolder, setActiveFolder] = useState<StudentCategoryFolderId>(null);
  const [showBoardClassModal, setShowBoardClassModal] = useState(false);

  const isAuthenticated = Boolean(currentStudent);
  const effectiveBoard: EducationBoard =
    propSelectedBoard || (currentStudent ? activeBoard : 'Maharashtra');
  const effectiveClass: ClassLevel =
    propSelectedClass || currentStudent?.classLevel || 'Class 5';

  const currentClassUnlocked = currentStudent
    ? getClassSubscriptionInfo(currentStudent, effectiveClass, effectiveBoard).isPaidActive
    : false;

  const subjectsForCurrentClass = getSubjectsForClass(effectiveClass, effectiveBoard);

  const handleSelectBoard = (board: EducationBoard) => {
    if (onSelectBoard) {
      onSelectBoard(board);
    }
    if (currentStudent) {
      void switchActiveBoardAndClass(board, effectiveClass);
    }
  };

  const handleSelectClass = (cls: ClassLevel) => {
    if (onSelectClass) {
      onSelectClass(cls);
    }
    if (currentStudent) {
      void switchActiveBoardAndClass(effectiveBoard, cls);
    }
  };

  const navigateToSection = (tab: string, subSection?: string) => {
    if (onNavigateZone) {
      onNavigateZone(tab, subSection);
      return;
    }
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  const triggerOpenAuth = (tab: AuthModalTab = 'login', role: PortalRegisterRole = 'student') => {
    if (onOpenAuth) {
      onOpenAuth(tab, role);
      return;
    }
    if (onOpenPanel) {
      onOpenPanel('student', tab === 'register' ? 'register' : 'login');
      return;
    }
    setIsAuthModalOpen(true);
  };

  const triggerOpenPricing = (targetClass?: ClassLevel, targetBoard?: EducationBoard) => {
    if (onOpenMembership) {
      onOpenMembership('premium', targetClass || effectiveClass, targetBoard || effectiveBoard);
    }
  };

  // Main 10 Student Portal Category Cards (ONE ICON = ONE FEATURE / CATEGORY)
  const mainCategories = [
    {
      id: 'study-materials',
      icon: '📘',
      title: 'Study Materials',
      description: 'Textbooks, chapter notes & question-answer solutions',
      gradient: 'from-blue-600 to-indigo-700',
      lightBg: 'from-blue-50 to-indigo-50/70 border-blue-200 hover:border-blue-400',
      badge: `${subjectsForCurrentClass.length} Subjects`,
      onClick: () => navigateToSection('study-materials', 'chapter_notes'),
    },
    {
      id: 'worksheets',
      icon: '📝',
      title: 'Worksheets',
      description: 'Subject-wise practice sheets & revision exercises',
      gradient: 'from-sky-500 to-blue-600',
      lightBg: 'from-sky-50 to-blue-50/70 border-sky-200 hover:border-sky-400',
      badge: 'Practice Sheets',
      onClick: () => navigateToSection('worksheets'),
    },
    {
      id: 'online-exams',
      icon: '🎯',
      title: 'Online Exams & Quizzes',
      description: '4-level interactive chapter quizzes & timed tests',
      gradient: 'from-emerald-500 to-teal-700',
      lightBg: 'from-emerald-50 to-teal-50/70 border-emerald-200 hover:border-emerald-400',
      badge: 'Quiz Test',
      onClick: () => {
        if (isAuthenticated && onNavigateTab) {
          onNavigateTab('quizzes');
        } else if (onOpenDemo) {
          onOpenDemo('live-quiz');
        } else {
          navigateToSection('quizzes');
        }
      },
    },
    {
      id: 'video-lessons',
      icon: '🎬',
      title: 'Video Lessons',
      description: 'Chapter-wise visual explanations & expert lessons',
      gradient: 'from-violet-600 to-purple-700',
      lightBg: 'from-violet-50 to-purple-50/70 border-violet-200 hover:border-violet-400',
      badge: 'Expert Videos',
      onClick: () => navigateToSection('study-materials', 'video_lessons'),
    },
    {
      id: 'dictionary',
      icon: '📖',
      title: 'Trilingual Dictionary',
      description: 'English, Marathi & Hindi word meanings & examples',
      gradient: 'from-cyan-600 to-sky-700',
      lightBg: 'from-cyan-50 to-sky-50/70 border-cyan-200 hover:border-cyan-400',
      badge: 'Eng • Mar • Hin',
      onClick: () => navigateToSection('trilingual-dictionary'),
    },
    {
      id: 'thought-of-the-day',
      icon: '🌅',
      title: 'Thought of the Day',
      description: 'Daily motivational thoughts in 3 languages',
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'from-amber-50 to-orange-50/70 border-amber-200 hover:border-amber-400',
      badge: 'Daily Suvichar',
      onClick: () => navigateToSection('thought-of-the-day'),
    },
    {
      id: 'learning-tools',
      icon: '🧮',
      title: 'Learning Tools & Labs',
      description: 'Smart tools, Vedic Maths, Abacus, Phonics & PDF Studio',
      gradient: 'from-indigo-600 to-blue-800',
      lightBg: 'from-indigo-50 to-slate-50 border-indigo-200 hover:border-indigo-400',
      badge: '5 Skill Tools',
      onClick: () => setActiveFolder('learning-tools'),
    },
    {
      id: 'scholarship-competitive',
      icon: '🏅',
      title: 'Scholarship & Olympiad',
      description: '4th & 7th Scholarship exams, GK, Brain Logic & Sudoku',
      gradient: 'from-rose-500 to-pink-700',
      lightBg: 'from-rose-50 to-pink-50/70 border-rose-200 hover:border-rose-400',
      badge: 'Competitive Prep',
      onClick: () => setActiveFolder('scholarship-competitive'),
    },
    {
      id: 'creative-cultural',
      icon: '🎨',
      title: 'Creative & History Hub',
      description: 'Shivaji Maharaj History, Moral Stories & Drawing Studio',
      gradient: 'from-orange-500 to-red-600',
      lightBg: 'from-orange-50 to-amber-50/70 border-orange-200 hover:border-orange-400',
      badge: 'Stories & Art',
      onClick: () => setActiveFolder('creative-cultural'),
    },
    {
      id: 'progress-account',
      icon: '🏆',
      title: 'Progress & Certificates',
      description: 'Leaderboard ranks, certificates, plans & profile',
      gradient: 'from-teal-600 to-emerald-700',
      lightBg: 'from-teal-50 to-emerald-50/70 border-teal-200 hover:border-teal-400',
      badge: 'My Achievements',
      onClick: () => setActiveFolder('progress-account'),
    },
  ];

  // Sub-screens when a folder category is clicked (ONE SECTION OPEN AT A TIME)
  const folderDefinitions: Record<
    Exclude<StudentCategoryFolderId, null>,
    {
      title: string;
      subtitle: string;
      icon: string;
      headerGradient: string;
      items: SubItemCard[];
    }
  > = {
    'learning-tools': {
      title: 'Learning Tools & Skill Labs',
      subtitle: 'Select a learning tool or skill lab below to open it in full screen',
      icon: '🧮',
      headerGradient: 'from-indigo-600 via-blue-700 to-slate-900',
      items: [
        {
          id: 'ai-tools',
          icon: '✨',
          title: 'Interactive Learning Tools',
          description: 'Smart study planners, formula helpers & academic utilities',
          color: 'border-indigo-200 bg-indigo-50/60 hover:border-indigo-500',
          onClick: () => navigateToSection('ai-tools'),
        },
        {
          id: 'vedic-maths',
          icon: '🔢',
          title: 'Vedic Maths Lab',
          description: 'High-speed mental arithmetic sutras & step-by-step drills',
          color: 'border-amber-200 bg-amber-50/60 hover:border-amber-500',
          onClick: () => navigateToSection('core-skills-lab'),
        },
        {
          id: 'abacus-lab',
          icon: '🧮',
          title: 'Japanese Soroban Abacus',
          description: 'Interactive bead visualization & speed calculation practice',
          color: 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-500',
          onClick: () => navigateToSection('core-skills-lab'),
        },
        {
          id: 'phonics-lab',
          icon: '🗣️',
          title: 'English Phonics Audio Lab',
          description: '4-level letter sounds, blending & pronunciation studio',
          color: 'border-sky-200 bg-sky-50/60 hover:border-sky-500',
          onClick: () => navigateToSection('core-skills-lab'),
        },
        {
          id: 'pdf-tools',
          icon: '📄',
          title: 'Document & PDF Studio',
          description: 'Convert notes, images & study files into clean PDFs',
          color: 'border-purple-200 bg-purple-50/60 hover:border-purple-500',
          onClick: () => navigateToSection('document-studio'),
        },
      ],
    },
    'scholarship-competitive': {
      title: 'Scholarship & Competitive Exams',
      subtitle: 'Prepare for Maharashtra Scholarship (MSCE), GK & logical reasoning',
      icon: '🏅',
      headerGradient: 'from-rose-600 via-pink-600 to-purple-800',
      items: [
        {
          id: 'sch-4',
          icon: '🎖️',
          title: '4th Standard Scholarship (PSE)',
          description: 'Paper I & Paper II syllabus notes, practice & mock tests',
          color: 'border-amber-200 bg-amber-50/60 hover:border-amber-500',
          onClick: () => {
            handleSelectClass('Class 4');
            navigateToSection('scholarship');
          },
        },
        {
          id: 'sch-7',
          icon: '🏆',
          title: '7th Standard Scholarship (UPS)',
          description: 'Complete Paper I & II notes, intelligence tests & practice',
          color: 'border-rose-200 bg-rose-50/60 hover:border-rose-500',
          onClick: () => {
            handleSelectClass('Class 7');
            navigateToSection('scholarship');
          },
        },
        {
          id: 'gk',
          icon: '🌍',
          title: 'General Knowledge (GK)',
          description: 'India, Maharashtra, Science & current affairs capsules',
          color: 'border-sky-200 bg-sky-50/60 hover:border-sky-500',
          onClick: () => navigateToSection('cricket'),
        },
        {
          id: 'brain-quiz',
          icon: '🧠',
          title: 'Brain Quizzes & Logic Puzzles',
          description: 'Aptitude, memory & critical thinking challenges',
          color: 'border-violet-200 bg-violet-50/60 hover:border-violet-500',
          onClick: () => navigateToSection('puzzles'),
        },
        {
          id: 'sudoku',
          icon: '🧩',
          title: 'Student Sudoku Challenge',
          description: 'Daily number logic grids for concentration & focus',
          color: 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-500',
          onClick: () => navigateToSection('sudoku'),
        },
      ],
    },
    'creative-cultural': {
      title: 'Creative & Cultural Learning Hub',
      subtitle: 'Explore inspiring history, value education stories & creative drawing',
      icon: '🎨',
      headerGradient: 'from-orange-500 via-amber-600 to-red-700',
      items: [
        {
          id: 'shivaji',
          icon: '🚩',
          title: 'Chhatrapati Shivaji Maharaj History',
          description: 'Inspiring life events, forts, administration & quizzes',
          color: 'border-orange-200 bg-orange-50/60 hover:border-orange-500',
          onClick: () => navigateToSection('shivaji'),
        },
        {
          id: 'stories',
          icon: '📚',
          title: 'Moral & Inspirational Stories',
          description: 'Illustrated value-building stories with comprehension lessons',
          color: 'border-amber-200 bg-amber-50/60 hover:border-amber-500',
          onClick: () => navigateToSection('stories'),
        },
        {
          id: 'drawing',
          icon: '🎨',
          title: 'Drawing & Art Studio',
          description: 'Step-by-step digital drawing canvas & coloring templates',
          color: 'border-pink-200 bg-pink-50/60 hover:border-pink-500',
          onClick: () => navigateToSection('drawing'),
        },
      ],
    },
    'progress-account': {
      title: 'My Progress, Certificates & Account',
      subtitle: 'Track your academic performance, certificates, and active class plan',
      icon: '🏆',
      headerGradient: 'from-teal-600 via-emerald-600 to-slate-900',
      items: [
        {
          id: 'leaderboard',
          icon: '🥇',
          title: 'Student Leaderboard & Ranks',
          description: 'View top performers, points earned & quiz achievements',
          color: 'border-amber-200 bg-amber-50/60 hover:border-amber-500',
          onClick: () => navigateToSection('certificates'),
        },
        {
          id: 'certificates',
          icon: '📜',
          title: 'My Achievement Certificates',
          description: 'Download official verifiable certificates for completed exams',
          color: 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-500',
          onClick: () => navigateToSection('certificates'),
        },
        {
          id: 'pricing',
          icon: '💎',
          title: 'Class Plans & Subscription',
          description: 'Activate or switch classes (₹99 / 365 days full access)',
          color: 'border-indigo-200 bg-indigo-50/60 hover:border-indigo-500',
          onClick: () => triggerOpenPricing(effectiveClass, effectiveBoard),
        },
        {
          id: 'profile',
          icon: '👤',
          title: 'My Student Profile & Referrals',
          description: 'Manage your profile details, active classes & referral rewards',
          color: 'border-sky-200 bg-sky-50/60 hover:border-sky-500',
          onClick: () => {
            if (isAuthenticated && onNavigateTab) {
              onNavigateTab('profile');
            } else {
              triggerOpenAuth('login', 'student');
            }
          },
        },
      ],
    },
  };

  // ==================== SUB-CATEGORY FULL-SCREEN VIEW ====================
  if (activeFolder !== null) {
    const folder = folderDefinitions[activeFolder];
    return (
      <div className="space-y-5 animate-in fade-in duration-200">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between gap-3 bg-white rounded-2xl p-3.5 sm:px-5 border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveFolder(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Dashboard</span>
          </button>
          <div className="text-xs sm:text-sm font-black text-slate-700 truncate">
            Student Portal • {folder.title}
          </div>
        </div>

        {/* Folder Header Banner */}
        <div className={`rounded-3xl bg-gradient-to-r ${folder.headerGradient} text-white p-6 sm:p-8 shadow-lg`}>
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-3xl shrink-0">
              {folder.icon}
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
                Student Portal Category
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                {folder.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1">
                {folder.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folder.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`group p-5 rounded-3xl border-2 ${item.color} text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between gap-4 cursor-pointer bg-white`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-700 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end text-xs font-extrabold text-indigo-700 group-hover:translate-x-0.5 transition-transform">
                <span>Open Section</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ==================== MAIN STUDENT PORTAL DASHBOARD (MAIN CATEGORY CARDS ONLY) ====================
  return (
    <div className="space-y-5">
      {/* 1. COMPACT APP HEADER BAR */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0f296b] via-[#1d4ed8] to-[#0284c7] text-white p-5 sm:p-6 shadow-lg border border-sky-300/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Student Identity & Active Class */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
              {isAuthenticated && currentStudent ? currentStudent.avatar : '🎓'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                  Student Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs font-extrabold border border-white/20">
                  {getBoardShortLabel(effectiveBoard)} • Standard {formatStandardOrdinal(effectiveClass)} ({effectiveClass})
                </span>
                {isAuthenticated && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-black inline-flex items-center gap-1 ${
                      currentClassUnlocked
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-rose-500/90 text-white'
                    }`}
                  >
                    {currentClassUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Plan
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" /> Demo Mode
                      </>
                    )}
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-1">
                {isAuthenticated && currentStudent
                  ? `Welcome, ${currentStudent.name}!`
                  : 'Welcome to Student Portal'}
              </h1>
              <p className="text-xs sm:text-sm text-sky-100 font-medium mt-0.5">
                Select any main learning category below to open your subjects, chapters, and study tools.
              </p>
            </div>
          </div>

          {/* Right Controls: Change Board/Class + Auth / Plan Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowBoardClassModal((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm border border-white/30 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-300" />
              <span>Change Board / Class</span>
            </button>

            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => triggerOpenAuth('login', 'student')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white text-[#0f296b] hover:bg-sky-50 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Student Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerOpenAuth('register', 'student')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            ) : (
              !currentClassUnlocked && (
                <button
                  type="button"
                  onClick={() => triggerOpenPricing(effectiveClass, effectiveBoard)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  <span>Unlock {effectiveClass} (₹99/Yr)</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Collapsible Board & Class Switcher Drawer (Only shown when user clicks "Change Board / Class") */}
        {showBoardClassModal && (
          <div className="mt-5 pt-5 border-t border-white/20 bg-slate-950/35 rounded-2xl p-4 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Step 1: Select Your Education Board &amp; Standard (Classes 1 to 10)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBoardClassModal(false)}
                className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold cursor-pointer"
              >
                Done ✓
              </button>
            </div>

            {/* 3 Board Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {BOARD_META_LIST.map((bMeta) => {
                const isSel = effectiveBoard === bMeta.id;
                return (
                  <button
                    key={bMeta.id}
                    type="button"
                    onClick={() => handleSelectBoard(bMeta.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSel
                        ? 'bg-white text-slate-900 border-amber-300 shadow-md'
                        : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{bMeta.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-black truncate">{bMeta.shortLabel}</div>
                        <div className={`text-[10px] truncate ${isSel ? 'text-slate-600' : 'text-sky-200'}`}>
                          {bMeta.affiliationLabel}
                        </div>
                      </div>
                    </div>
                    {isSel && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* 10 Class Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {ALL_10_CLASSES_META.map((clsMeta) => {
                const cls = clsMeta.classLevel;
                const isSelected = effectiveClass === cls;
                const unlocked = currentStudent
                  ? getClassSubscriptionInfo(currentStudent, cls, effectiveBoard).isPaidActive
                  : false;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      handleSelectClass(cls);
                      setShowBoardClassModal(false);
                    }}
                    className={`py-2.5 px-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-300 text-slate-950 border-white font-black shadow-md'
                        : unlocked
                        ? 'bg-emerald-500/30 text-white border-emerald-300/60 font-bold hover:bg-emerald-500/40'
                        : 'bg-white/10 text-white border-white/15 font-bold hover:bg-white/20'
                    }`}
                  >
                    <div className="text-xs font-black">{cls}</div>
                    <div className="text-[10px] opacity-85 mt-0.5">
                      Std {formatStandardOrdinal(cls)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN STUDENT PORTAL CATEGORY CARDS GRID (CLEAN APP INTERFACE) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Student Portal Main Categories</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Click any category card to open that section in full screen
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-extrabold">
            {getBoardShortLabel(effectiveBoard)} • {effectiveClass}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={cat.onClick}
              className={`group relative rounded-3xl bg-gradient-to-b ${cat.lightBg} bg-white border-2 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between gap-4 cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {cat.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] font-black text-slate-700 shadow-2xs">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-700 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs font-extrabold text-indigo-700">
                <span>Open</span>
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 inline-flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
