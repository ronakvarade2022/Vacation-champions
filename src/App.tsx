import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { SubjectQuizView } from './components/SubjectQuizView';
import { DemoSectionView } from './components/DemoSectionView';
import { MembershipModal } from './components/MembershipModal';
import { PlanUpgradePromptModal } from './components/PlanUpgradePromptModal';
import { AuthModal } from './components/AuthModal';
import { PasswordResetModal } from './components/PasswordResetModal';
import { HelpSupportView } from './components/HelpSupportView';
import { GrievanceRedressalView } from './components/GrievanceRedressalView';
import { TermsAndPrivacyView } from './components/TermsAndPrivacyView';
import { AboutUsView } from './components/AboutUsView';
import { ContactUsView } from './components/ContactUsView';
import { FaqsView } from './components/FaqsView';

const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const StoryWorldView = lazy(() =>
  import('./components/StoryWorldView').then((m) => ({ default: m.StoryWorldView }))
);
const DrawingChampionsView = lazy(() =>
  import('./components/DrawingChampionsView').then((m) => ({ default: m.DrawingChampionsView }))
);
const PuzzleChampionsView = lazy(() =>
  import('./components/PuzzleChampionsView').then((m) => ({ default: m.PuzzleChampionsView }))
);
const CertificatesView = lazy(() =>
  import('./components/CertificatesView').then((m) => ({ default: m.CertificatesView }))
);
const CricketChampionsView = lazy(() =>
  import('./components/CricketChampionsView').then((m) => ({ default: m.CricketChampionsView }))
);
const ScholarshipChampionsView = lazy(() =>
  import('./components/ScholarshipChampionsView').then((m) => ({
    default: m.ScholarshipChampionsView,
  }))
);
const StudentProfileView = lazy(() =>
  import('./components/StudentProfileView').then((m) => ({ default: m.StudentProfileView }))
);
const ShivajiStoriesView = lazy(() =>
  import('./components/ShivajiStoriesView').then((m) => ({ default: m.ShivajiStoriesView }))
);
const SudokuView = lazy(() =>
  import('./components/SudokuView').then((m) => ({ default: m.SudokuView }))
);
const FutureSkillsView = lazy(() =>
  import('./components/FutureSkillsView').then((m) => ({ default: m.FutureSkillsView }))
);
const ReferralHubView = lazy(() =>
  import('./components/ReferralHubView').then((m) => ({ default: m.ReferralHubView }))
);
const WorksheetsView = lazy(() =>
  import('./components/WorksheetsView').then((m) => ({ default: m.WorksheetsView }))
);
const StudyMaterialsView = lazy(() =>
  import('./components/StudyMaterialsView').then((m) => ({ default: m.StudyMaterialsView }))
);
const PublicHomeDashboard = lazy(() =>
  import('./components/PublicHomeDashboard').then((m) => ({ default: m.PublicHomeDashboard }))
);
const PublicZoneExplorerView = lazy(() =>
  import('./components/PublicZoneExplorerView').then((m) => ({ default: m.PublicZoneExplorerView }))
);

const PortalLoadingCard: React.FC = () => (
  <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-xs space-y-4 animate-pulse">
    <div className="h-6 w-56 bg-slate-200 rounded-xl" />
    <div className="h-4 w-80 max-w-full bg-slate-100 rounded-lg" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
      <div className="h-24 bg-slate-100 rounded-2xl" />
      <div className="h-24 bg-slate-100 rounded-2xl" />
      <div className="h-24 bg-slate-100 rounded-2xl" />
    </div>
  </div>
);
import { ClassLevel, EducationBoard, SubjectName, QuizLevel } from './types';
import { MainMenuId, NavSubActionId } from './data/navigationConfig';
import type { HomeScrollTarget } from './components/PublicHomeDashboard';
import type { ExplorerZoneType } from './components/PublicZoneExplorerView';
import {
  canAccessFeature,
  canAccessSubject,
  formatStandardOrdinal,
  getActivatedBoardClassesList,
  getBoardShortLabel,
  getStudentPlanInfo,
  getPremiumActivatedBannerMessage
} from './utils/subscriptionAccess';
import { Trophy, GraduationCap, BookOpen, FileText, Volume2, Activity, Award, Crown, Sparkles, ShieldCheck, ShieldAlert, X } from 'lucide-react';
import './firebase';

const FEATURE_TITLES: Record<string, string> = {
  stories: 'Story World (45+ Audio Moral Stories)',
  shivaji: 'Chhatrapati Shivaji Maharaj Stories (50 Chapters)',
  drawing: 'Drawing & Colouring Studio',
  cricket: 'Cricket Champions Hub',
  scholarship: 'Maharashtra Scholarship (4th & 7th Std)',
  'future-skills': 'AI Learning Academy & Future Skills',
  'ai-academy': 'AI Learning Academy & Future Skills',
  certificates: 'Official Champion Certificates & Leaderboard',
  leaderboard: 'Official Champion Certificates & Leaderboard',
  referrals: 'Learn • Share • Grow • Earn Referral Hub',
};

const AppContent: React.FC = () => {
  const {
    activeRole,
    switchRole,
    currentUser,
    currentStudent,
    activeBoard,
    isAuthModalOpen,
    setIsAuthModalOpen,
    sessionSecurityNotice,
    clearSessionSecurityNotice,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [quizInitialSubject, setQuizInitialSubject] = useState<SubjectName | undefined>(undefined);
  const [quizInitialLevel, setQuizInitialLevel] = useState<QuizLevel | undefined>(undefined);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'teacher' | 'register' | 'admin' | 'forgot'>('login');
  const [authInitialEmail, setAuthInitialEmail] = useState<string>('');
  const [resetOobCode, setResetOobCode] = useState<string>('');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState<boolean>(false);
  const [membershipInitialPlan, setMembershipInitialPlan] = useState<'basic' | 'premium'>('premium');
  const [membershipTargetClass, setMembershipTargetClass] = useState<ClassLevel | undefined>(undefined);
  const [membershipTargetBoard, setMembershipTargetBoard] = useState<EducationBoard | undefined>(undefined);

  // Public Home Dashboard & Navigation Explorer State
  const [publicBoard, setPublicBoard] = useState<EducationBoard>('Maharashtra');
  const [publicClass, setPublicClass] = useState<ClassLevel>('Class 5');
  const [homeScrollTarget, setHomeScrollTarget] = useState<HomeScrollTarget>(null);
  const [demoInitialTab, setDemoInitialTab] = useState<
    'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles'
  >('overview');
  const [explorerZone, setExplorerZone] = useState<ExplorerZoneType>('study-material');
  const [explorerSubFocus, setExplorerSubFocus] = useState<string>('notes');

  // Desktop Site / Mobile View preference (persisted in localStorage)
  const [viewMode, setViewMode] = useState<'auto' | 'desktop'>(() => {
    try {
      return localStorage.getItem('mystudyzone_view_mode') === 'desktop' ? 'desktop' : 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mystudyzone_view_mode', viewMode);
    } catch {
      // Ignore storage errors
    }

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('desktop-site-active', viewMode === 'desktop');
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        const isSmallHardware =
          typeof window !== 'undefined' &&
          window.screen?.width > 0 &&
          window.screen.width < 1024;
        metaViewport.setAttribute(
          'content',
          viewMode === 'desktop'
            ? isSmallHardware
              ? 'width=1280, user-scalable=yes, viewport-fit=cover'
              : 'width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover'
            : 'width=device-width, initial-scale=1.0, viewport-fit=cover'
        );
      }
    }
  }, [viewMode]);

  const isLearningPortal = activeRole === 'student' || activeRole === 'teacher';
  const isTeacherPortal = activeRole === 'teacher' || currentStudent?.accountRole === 'teacher';

  useEffect(() => {
    if (currentStudent) {
      setPublicBoard(activeBoard);
      setPublicClass(currentStudent.classLevel);
      if (currentTab === 'public-home' || currentTab === 'explore-zone') {
        setCurrentTab('dashboard');
      }
    }
  }, [currentStudent?.id, activeBoard]);

  useEffect(() => {
    if (activeRole === 'admin' && currentUser?.role === 'admin' && (currentTab === 'public-home' || currentTab === 'explore-zone' || currentTab === 'dashboard')) {
      setCurrentTab('admin');
    }
  }, [activeRole, currentUser?.role]);

  // Keep browser tab title consistent
  useEffect(() => {
    document.title = 'mystudyzone.in - Visitor Demo Dashboard';
  }, [currentTab]);

  // Detect Firebase Authentication password reset link (?mode=resetPassword&oobCode=...) and Referral Registration link (/register?ref=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      const emailParam = params.get('email');
      const refParam = (params.get('ref') || params.get('referral') || '').trim().toUpperCase();
      const pathname = window.location.pathname.toLowerCase();

      if (refParam && refParam !== 'VC-STU-CHAMP') {
        localStorage.setItem('vc_pending_ref_code', refParam);
      }

      if (mode === 'resetPassword' && oobCode) {
        setResetOobCode(oobCode);
        setIsResetModalOpen(true);
      } else if (pathname.startsWith('/register') || refParam) {
        setAuthDefaultTab('register');
        setIsAuthOpen(true);
        setIsAuthModalOpen(true);
      } else if (emailParam) {
        setAuthInitialEmail(emailParam);
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, [setIsAuthModalOpen]);

  const clearResetQueryParams = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('mode');
      url.searchParams.delete('oobCode');
      url.searchParams.delete('apiKey');
      url.searchParams.delete('lang');
      window.history.replaceState({}, document.title, url.pathname + url.search);
    } catch {
      // Ignore history API errors
    }
  };

  // Upgrade prompt modal state when a student/teacher clicks a locked feature or subject
  const [upgradePrompt, setUpgradePrompt] = useState<{
    isOpen: boolean;
    featureTitle: string;
    requiredPlan: 'basic' | 'premium';
    reasonMessage: string;
  }>({
    isOpen: false,
    featureTitle: '',
    requiredPlan: 'premium',
    reasonMessage: '',
  });

  const openMembershipWithPlan = (
    _plan: 'basic' | 'premium' = 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard
  ) => {
    setMembershipInitialPlan('premium');
    setMembershipTargetClass(targetClass || currentStudent?.classLevel || publicClass);
    setMembershipTargetBoard(targetBoard || (currentStudent ? activeBoard : publicBoard));
    setIsMembershipOpen(true);
  };

  const openAuthModalWithTab = (defaultTab: 'login' | 'teacher' | 'register' | 'admin' | 'forgot' = 'login') => {
    setAuthDefaultTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const openDemoWithTab = (
    tab: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles' = 'overview'
  ) => {
    setDemoInitialTab(tab);
    setCurrentTab('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: string, subjectParam?: SubjectName, levelParam?: QuizLevel) => {
    const alwaysOpenTabs = new Set([
      'demo', 'dashboard', 'public-home', 'explore-zone', 'profile', 'account', 'subscription',
      'worksheets', 'study-materials', 'study-material',
      'help-support', 'faqs', 'terms', 'privacy', 'disclaimer',
      'grievance', 'about', 'contact', 'referrals', 'admin'
    ]);

    // Check feature restrictions for students & teachers
    if (isLearningPortal && currentStudent && !alwaysOpenTabs.has(tab)) {
      // 1. If navigating to a specific quiz subject, check subject access first
      if (tab === 'quizzes' && subjectParam) {
        const subjAccess = canAccessSubject(currentStudent, subjectParam, undefined, undefined, activeBoard);
        if (!subjAccess.allowed) {
          setUpgradePrompt({
            isOpen: true,
            featureTitle: `${subjectParam} Subject & Quizzes`,
            requiredPlan: 'premium',
            reasonMessage:
              subjAccess.reason ||
              `${subjectParam} is locked on the Free Plan. Upgrade to the ₹99 Premium Plan (365 Days / 1 Year) to unlock all subjects for your Board & Class!`,
          });
          return;
        }
      }

      // 2. Check feature-level access
      const featAccess = canAccessFeature(currentStudent, tab);
      if (!featAccess.allowed) {
        setUpgradePrompt({
          isOpen: true,
          featureTitle: FEATURE_TITLES[tab] || featAccess.featureTitle || 'Premium Learning Feature',
          requiredPlan: 'premium',
          reasonMessage:
            featAccess.upgradeMessage ||
            'Upgrade to the ₹99 Premium Plan (365 Days / 1 Year) to unlock this learning module!',
        });
        return;
      }
    }

    if (subjectParam) {
      setQuizInitialSubject(subjectParam);
    }
    if (levelParam) {
      setQuizInitialLevel(levelParam);
    }
    setCurrentTab(tab === 'study-material' ? 'study-materials' : tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuAction = (actionId: NavSubActionId) => {
    const isSignedInLearner = Boolean(isLearningPortal && currentStudent);

    switch (actionId) {
      // HOME
      case 'home-overview': {
        setHomeScrollTarget('home-overview');
        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      case 'home-how-it-works': {
        setHomeScrollTarget('home-how-it-works');
        setCurrentTab(isSignedInLearner ? 'public-home' : 'dashboard');
        return;
      }
      case 'home-why-choose-us': {
        setHomeScrollTarget('home-why-choose-us');
        setCurrentTab(isSignedInLearner ? 'public-home' : 'dashboard');
        return;
      }

      // COURSES
      case 'course-maharashtra':
      case 'course-cbse':
      case 'course-icse': {
        const targetBoard: EducationBoard =
          actionId === 'course-cbse'
            ? 'CBSE'
            : actionId === 'course-icse'
            ? 'ICSE'
            : 'Maharashtra';
        setPublicBoard(targetBoard);
        setHomeScrollTarget('courses-section');
        setCurrentTab(isSignedInLearner ? 'public-home' : 'dashboard');
        return;
      }

      // STUDY MATERIAL
      case 'sm-notes':
      case 'sm-important-questions':
      case 'sm-textbook-learning':
      case 'sm-question-banks': {
        if (isSignedInLearner) {
          handleNavigateTab(actionId === 'sm-question-banks' ? 'quizzes' : 'study-materials');
        } else {
          setExplorerZone('study-material');
          setExplorerSubFocus(actionId);
          setCurrentTab('explore-zone');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // PRACTICE ZONE
      case 'pz-mcq':
      case 'pz-chapter':
      case 'pz-worksheets':
      case 'pz-daily': {
        if (isSignedInLearner) {
          if (actionId === 'pz-worksheets') handleNavigateTab('worksheets');
          else if (actionId === 'pz-daily') handleNavigateTab('cricket');
          else handleNavigateTab('quizzes');
        } else {
          setExplorerZone('practice-zone');
          setExplorerSubFocus(actionId);
          setCurrentTab('explore-zone');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // EXAM ZONE
      case 'ez-mock-tests':
      case 'ez-model-papers':
      case 'ez-chapter-tests':
      case 'ez-exam-practice': {
        if (isSignedInLearner) {
          if (actionId === 'ez-mock-tests' || actionId === 'ez-exam-practice') {
            handleNavigateTab('scholarship');
          } else {
            handleNavigateTab('quizzes');
          }
        } else {
          setExplorerZone('exam-zone');
          setExplorerSubFocus(actionId);
          setCurrentTab('explore-zone');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // PERFORMANCE
      case 'perf-tracking':
      case 'perf-results':
      case 'perf-analysis': {
        if (isSignedInLearner) {
          if (actionId === 'perf-results') handleNavigateTab('certificates');
          else if (actionId === 'perf-analysis') handleNavigateTab('profile');
          else handleNavigateTab('dashboard');
        } else {
          setExplorerZone('performance');
          setExplorerSubFocus(actionId);
          setCurrentTab('explore-zone');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // PLANS & PRICING
      case 'plan-maharashtra':
      case 'plan-cbse':
      case 'plan-icse': {
        const targetBoard: EducationBoard =
          actionId === 'plan-cbse'
            ? 'CBSE'
            : actionId === 'plan-icse'
            ? 'ICSE'
            : 'Maharashtra';
        setPublicBoard(targetBoard);
        setHomeScrollTarget('plans-pricing');
        setCurrentTab(isSignedInLearner ? 'public-home' : 'dashboard');
        return;
      }

      // MY ACCOUNT
      case 'acc-login': {
        if (isSignedInLearner) {
          handleNavigateTab('profile');
        } else {
          openAuthModalWithTab(activeRole === 'teacher' ? 'teacher' : 'login');
        }
        return;
      }
      case 'acc-register': {
        openAuthModalWithTab('register');
        return;
      }
      case 'acc-classes': {
        if (isSignedInLearner) {
          handleNavigateTab('profile');
        } else {
          openAuthModalWithTab('login');
        }
        return;
      }
      case 'acc-subscription': {
        if (isSignedInLearner && currentStudent) {
          openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard);
        } else {
          setExplorerZone('plans');
          setExplorerSubFocus('subscription');
          setCurrentTab('explore-zone');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    }
  };

  const getActiveMenuId = (): MainMenuId => {
    if (currentTab === 'explore-zone') {
      if (explorerZone === 'study-material') return 'study-material';
      if (explorerZone === 'practice-zone') return 'practice-zone';
      if (explorerZone === 'exam-zone') return 'exam-zone';
      if (explorerZone === 'performance') return 'performance';
      if (explorerZone === 'plans') return 'plans';
    }
    if (currentTab === 'study-materials') return 'study-material';
    if (currentTab === 'worksheets' || currentTab === 'quizzes' || currentTab === 'cricket' || currentTab === 'puzzles' || currentTab === 'sudoku') {
      return 'practice-zone';
    }
    if (currentTab === 'scholarship') return 'exam-zone';
    if (currentTab === 'certificates' || currentTab === 'leaderboard') return 'performance';
    if (currentTab === 'profile' || currentTab === 'account' || currentTab === 'subscription') {
      return 'account';
    }
    if ((currentTab === 'dashboard' || currentTab === 'public-home') && homeScrollTarget === 'courses-section') {
      return 'courses';
    }
    if ((currentTab === 'dashboard' || currentTab === 'public-home') && homeScrollTarget === 'plans-pricing') {
      return 'plans';
    }
    return 'home';
  };

  const handleOpenRolePanel = (
    panel: 'student' | 'teacher' | 'admin',
    intent: 'login' | 'register' = 'login'
  ) => {
    if (panel === 'admin') {
      if (currentUser?.role === 'admin') {
        switchRole('admin');
        setCurrentTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      openAuthModalWithTab('admin');
      return;
    }

    if (panel === 'teacher') {
      if (currentStudent && currentStudent.accountRole === 'teacher') {
        switchRole('teacher');
        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      openAuthModalWithTab('teacher');
      return;
    }

    if (activeRole !== 'student') {
      switchRole('student');
    }
    if (currentStudent && intent === 'login') {
      setCurrentTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    openAuthModalWithTab(intent === 'register' ? 'register' : 'login');
  };

  const planInfo = getStudentPlanInfo(currentStudent, undefined, currentStudent?.classLevel, activeBoard);
  const isPremiumActive = planInfo.effectivePlan === 'premium' || planInfo.effectivePlan === 'basic';

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigateTab(tab)}
        onMenuAction={handleMenuAction}
        activeMenuId={getActiveMenuId()}
        onOpenAuth={(defaultTab) => openAuthModalWithTab(defaultTab || 'login')}
        onOpenPanel={handleOpenRolePanel}
        onOpenMembership={(targetClass, targetBoard) => openMembershipWithPlan('premium', targetClass, targetBoard)}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))
        }
      />

      {/* Main Content Arena */}
      <main
        className={`flex-1 w-full mx-auto pt-6 pb-12 ${
          viewMode === 'desktop'
            ? 'max-w-[1680px] px-5 sm:px-8'
            : 'max-w-7xl px-4 sm:px-6'
        }`}
      >
        {sessionSecurityNotice && (
          <div className="mb-6 rounded-2xl bg-rose-50 border-2 border-rose-300 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-black uppercase tracking-wider text-rose-900">
                  Single-Device Session Notice
                </p>
                <p className="text-xs sm:text-sm font-bold text-rose-800 leading-snug">
                  {sessionSecurityNotice}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => {
                  clearSessionSecurityNotice();
                  openAuthModalWithTab(activeRole === 'teacher' ? 'teacher' : 'login');
                }}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xs cursor-pointer transition-colors"
              >
                Sign In Again
              </button>
              <button
                type="button"
                aria-label="Dismiss session notice"
                onClick={clearSessionSecurityNotice}
                className="p-2 rounded-xl text-rose-700 hover:bg-rose-100 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Live Interactive Visitor Demo Dashboard (All Classes 1st–10th preview, zero DB writes) */}
        <Suspense fallback={<PortalLoadingCard />}>
          {currentTab === 'demo' ? (
            <DemoSectionView
              onUpgradeClick={() => openMembershipWithPlan('premium', publicClass, publicBoard)}
              onRegisterClick={() => openAuthModalWithTab('register')}
              onSignInClick={() => openAuthModalWithTab('login')}
              isAuthenticated={Boolean(currentStudent)}
              initialBoard={currentStudent ? activeBoard : publicBoard}
              initialClass={currentStudent ? currentStudent.classLevel : publicClass}
              initialInteractiveTab={demoInitialTab}
              onBoardSelectionChange={setPublicBoard}
              onClassSelectionChange={setPublicClass}
            />
          ) : currentTab === 'explore-zone' ? (
            <PublicZoneExplorerView
              zone={explorerZone}
              subFocus={explorerSubFocus}
              selectedBoard={publicBoard}
              selectedClass={publicClass}
              onSelectBoard={setPublicBoard}
              onSelectClass={setPublicClass}
              onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
              onOpenAuth={(tab) => openAuthModalWithTab(tab)}
              onOpenMembership={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'public-home' : 'dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'public-home' ? (
            <PublicHomeDashboard
              selectedBoard={publicBoard}
              selectedClass={publicClass}
              onSelectBoard={setPublicBoard}
              onSelectClass={setPublicClass}
              scrollTarget={homeScrollTarget}
              onClearScrollTarget={() => setHomeScrollTarget(null)}
              onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
              onNavigateZone={(tab, subSection, subject) => {
                if (isLearningPortal && currentStudent) {
                  if (tab === 'performance') {
                    handleNavigateTab('dashboard');
                  } else {
                    handleNavigateTab(tab, subject);
                  }
                } else {
                  if (tab === 'faqs') {
                    handleNavigateTab('faqs');
                    return;
                  }
                  if (tab === 'study-materials') setExplorerZone('study-material');
                  else if (tab === 'worksheets' || tab === 'quizzes' || tab === 'cricket') {
                    setExplorerZone('practice-zone');
                  } else if (tab === 'scholarship') {
                    setExplorerZone('exam-zone');
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
                  } else if (tab === 'stories') {
                    openDemoWithTab('overview');
                    return;
                  } else {
                    setExplorerZone('study-material');
                  }
                  setExplorerSubFocus(subSection || 'overview');
                  setCurrentTab('explore-zone');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onOpenAuth={(tab) => openAuthModalWithTab(tab)}
              onOpenPanel={handleOpenRolePanel}
              onOpenMembership={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
              isAuthenticated={Boolean(currentStudent || currentUser?.role === 'admin')}
              currentRole={activeRole}
              currentUserName={currentStudent?.name || currentUser?.displayName}
              isDesktopMode={viewMode === 'desktop'}
            />
          ) : currentTab === 'referrals' ? (
            <ReferralHubView
              currentUserId={currentStudent?.id || 'guest_ambassador'}
              userName={currentStudent?.name || 'Visitor Preview'}
              userEmail={currentStudent?.email || ''}
              userMobile={currentStudent?.mobile || ''}
              initialRole="student"
              onNavigateUpgrade={() => openMembershipWithPlan('premium')}
            />
          ) : currentTab === 'help-support' ? (
          <HelpSupportView
            onNavigateTab={(t) => handleNavigateTab(t)}
            onOpenMembership={() => openMembershipWithPlan('premium')}
          />
        ) : currentTab === 'grievance' ? (
          <GrievanceRedressalView onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'terms' ? (
          <TermsAndPrivacyView initialTab="terms" onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'privacy' ? (
          <TermsAndPrivacyView initialTab="privacy" onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'refund' ? (
          <TermsAndPrivacyView initialTab="refund" onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'disclaimer' ? (
          <TermsAndPrivacyView initialTab="disclaimer" onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'about' ? (
          <AboutUsView
            onNavigateTab={(t) => handleNavigateTab(t)}
            onOpenMembership={() => openMembershipWithPlan('premium')}
          />
        ) : currentTab === 'contact' ? (
          <ContactUsView onNavigateTab={(t) => handleNavigateTab(t)} />
        ) : currentTab === 'faqs' ? (
          <FaqsView
            onNavigateTab={(t) => handleNavigateTab(t)}
            onOpenMembership={() => openMembershipWithPlan('premium')}
          />
        ) : (
          <>
            {/* Signed-Out Public Home Dashboard */}
            {isLearningPortal && !currentStudent && (
              <PublicHomeDashboard
                selectedBoard={publicBoard}
                selectedClass={publicClass}
                onSelectBoard={setPublicBoard}
                onSelectClass={setPublicClass}
                scrollTarget={homeScrollTarget}
                onClearScrollTarget={() => setHomeScrollTarget(null)}
                onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
                onNavigateZone={(tab, subSection) => {
                  if (tab === 'faqs') {
                    handleNavigateTab('faqs');
                    return;
                  }
                  if (tab === 'study-materials') setExplorerZone('study-material');
                  else if (tab === 'worksheets' || tab === 'quizzes' || tab === 'cricket') {
                    setExplorerZone('practice-zone');
                  } else if (tab === 'scholarship') {
                    setExplorerZone('exam-zone');
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
                  } else if (tab === 'stories') {
                    openDemoWithTab('overview');
                    return;
                  } else {
                    setExplorerZone('study-material');
                  }
                  setExplorerSubFocus(subSection || 'overview');
                  setCurrentTab('explore-zone');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAuth={(tab) => openAuthModalWithTab(tab)}
                onOpenPanel={handleOpenRolePanel}
                onOpenMembership={(targetClass, targetBoard) =>
                  openMembershipWithPlan('premium', targetClass, targetBoard)
                }
                isAuthenticated={false}
                currentRole={activeRole}
                isDesktopMode={viewMode === 'desktop'}
              />
            )}

            {/* Authenticated Student Portal & Teacher Portal Content */}
            {isLearningPortal && currentStudent && (
              <>
                {/* Dedicated Teacher Portal Workspace Header Banner */}
                {isTeacherPortal && (
                  <div className="mb-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 shadow-lg border border-emerald-400/30 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 text-xs font-extrabold uppercase tracking-wider">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Dedicated Teacher Portal • Active: {getBoardShortLabel(activeBoard)} • Standard {formatStandardOrdinal(currentStudent.classLevel)} ({currentStudent.classLevel})</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>
                              Multi-Board &amp; Multi-Class ({getActivatedBoardClassesList(currentStudent).length} Paid Activation{getActivatedBoardClassesList(currentStudent).length === 1 ? '' : 's'})
                            </span>
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-display font-black">
                          Welcome, {currentStudent.name}! ({getBoardShortLabel(activeBoard)} • Standard {formatStandardOrdinal(currentStudent.classLevel)} Educator Hub)
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                          {isPremiumActive
                            ? getPremiumActivatedBannerMessage(currentStudent.classLevel, activeBoard)
                            : `Complete access to ${getBoardShortLabel(activeBoard)} Standard ${formatStandardOrdinal(currentStudent.classLevel)} curriculum: Subjects, Board & Class-Wise Worksheets, Study Notes, 4-Level Quizzes, Audio Stories, Cricket Current Affairs, Scholarship Practice, and Model Solutions.`}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {!isPremiumActive ? (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                          >
                            <Crown className="w-4 h-4" />
                            <span>Unlock {getBoardShortLabel(activeBoard)} {currentStudent.classLevel} – ₹99</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer transition-colors"
                          >
                            <Crown className="w-4 h-4" />
                            <span>₹99 Active ({getBoardShortLabel(activeBoard)} • {currentStudent.classLevel}) • Add Board/Class</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Teacher Portal Quick Module Bar */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15">
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('dashboard')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'dashboard' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{getBoardShortLabel(activeBoard)} {currentStudent.classLevel} Overview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('worksheets')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'worksheets' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Class-Wise Worksheets &amp; Solutions</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('study-materials')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'study-materials' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Chapter Study Notes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('quizzes')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'quizzes' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>4-Level Practice Quizzes &amp; Explanations</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('stories')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'stories' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Stories &amp; Story Audio (45)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('cricket')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'cricket' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Daily &amp; Cricket Current Affairs</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('scholarship')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'scholarship' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Scholarship Practice &amp; Assessments</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentTab === 'dashboard' && (
                  <StudentDashboard
                    onNavigateTab={handleNavigateTab}
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
                  />
                )}

                {currentTab === 'quizzes' && (
                  <SubjectQuizView
                    initialSubject={quizInitialSubject}
                    initialLevel={quizInitialLevel}
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
                  />
                )}

                {currentTab === 'worksheets' && (
                  <WorksheetsView
                    initialSubject={quizInitialSubject}
                    onUnlockClick={(targetClass, targetBoard) => openMembershipWithPlan('premium', targetClass, targetBoard)}
                  />
                )}

                {currentTab === 'study-materials' && (
                  <StudyMaterialsView
                    initialBoard={activeBoard}
                    initialClass={currentStudent.classLevel}
                    initialSubject={quizInitialSubject}
                    onNavigateTab={handleNavigateTab}
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
                  />
                )}

                {currentTab === 'stories' && <StoryWorldView />}

                {currentTab === 'drawing' && <DrawingChampionsView />}

                {currentTab === 'puzzles' && <PuzzleChampionsView />}

                {currentTab === 'sudoku' && <SudokuView />}

                {currentTab === 'cricket' && <CricketChampionsView />}

                {currentTab === 'scholarship' && <ScholarshipChampionsView />}

                {currentTab === 'shivaji' && <ShivajiStoriesView />}

                {(currentTab === 'future-skills' || currentTab === 'ai-academy') && (
                  <FutureSkillsView
                    onOpenMembership={() => openMembershipWithPlan('premium')}
                  />
                )}

                {(currentTab === 'leaderboard' || currentTab === 'certificates') && (
                  <CertificatesView />
                )}

                {(currentTab === 'profile' || currentTab === 'account' || currentTab === 'subscription') && (
                  <StudentProfileView
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
                    onNavigateTab={(t) => handleNavigateTab(t)}
                  />
                )}
              </>
            )}

            {activeRole === 'admin' && currentUser?.role === 'admin' && <AdminDashboard />}
            {activeRole === 'admin' && currentUser?.role !== 'admin' && (
              <div className="max-w-md mx-auto my-16 bg-white rounded-3xl p-8 border border-rose-200 shadow-lg text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Administrator Authentication Required
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Please sign in with your authorized Administrator account to access the Admin Console.
                </p>
                <button
                  type="button"
                  onClick={() => openAuthModalWithTab('admin')}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer"
                >
                  Open Admin Sign In
                </button>
              </div>
            )}
          </>
        )}
        </Suspense>
      </main>

      {/* Global Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        initialSelectedPlan={membershipInitialPlan}
        initialSelectedClass={membershipTargetClass}
        initialSelectedBoard={membershipTargetBoard}
        onRequestAuth={(defaultTab) => openAuthModalWithTab(defaultTab || 'login')}
      />

      <PlanUpgradePromptModal
        isOpen={upgradePrompt.isOpen}
        onClose={() => setUpgradePrompt((prev) => ({ ...prev, isOpen: false }))}
        currentStudent={currentStudent}
        targetClass={currentStudent?.classLevel}
        targetBoard={activeBoard}
        featureTitle={upgradePrompt.featureTitle}
        requiredPlan={upgradePrompt.requiredPlan}
        upgradeMessage={upgradePrompt.reasonMessage}
        onSelectUpgradePlan={() => {
          setUpgradePrompt((prev) => ({ ...prev, isOpen: false }));
          openMembershipWithPlan('premium', currentStudent?.classLevel, activeBoard);
        }}
        onTryDemo={() => {
          setUpgradePrompt((prev) => ({ ...prev, isOpen: false }));
          setCurrentTab('demo');
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen || isAuthOpen}
        defaultTab={authDefaultTab}
        initialEmail={authInitialEmail}
        initialBoard={publicBoard}
        initialClass={publicClass}
        onExistingAccountProceedToSubscription={(targetClass, targetBoard) => {
          openMembershipWithPlan('premium', targetClass, targetBoard);
        }}
        onClose={() => {
          setIsAuthModalOpen(false);
          setIsAuthOpen(false);
          setAuthDefaultTab('login');
        }}
      />

      <PasswordResetModal
        isOpen={isResetModalOpen}
        oobCode={resetOobCode}
        onClose={() => {
          setIsResetModalOpen(false);
          clearResetQueryParams();
        }}
        onRequestAnotherLink={(email) => {
          setIsResetModalOpen(false);
          clearResetQueryParams();
          if (email) setAuthInitialEmail(email);
          setAuthDefaultTab('forgot');
          setIsAuthModalOpen(true);
        }}
        onProceedToLogin={(email) => {
          setIsResetModalOpen(false);
          clearResetQueryParams();
          if (email) setAuthInitialEmail(email);
          setAuthDefaultTab('login');
          setIsAuthModalOpen(true);
        }}
      />

      {/* Professional Education Platform Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8 text-xs">
        <div
          className={`mx-auto space-y-10 ${
            viewMode === 'desktop'
              ? 'max-w-[1680px] w-full px-5 sm:px-8'
              : 'max-w-7xl px-4 sm:px-6'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-display font-extrabold text-white text-base">
                <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </span>
                <span>MyStudyZone.in</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Complete school learning platform for Standards 1st to 10th across Maharashtra State Board, CBSE (NCERT), and ICSE (CISCE).
              </p>
              <p className="text-[11px] font-bold text-amber-300">
                Learn, Practice, Explore and Achieve Excellence.
              </p>
            </div>

            {/* Education Boards Column */}
            <div className="space-y-3">
              <h3 className="text-white font-display font-extrabold uppercase tracking-wider text-[11px]">
                Education Boards (Classes 1–10)
              </h3>
              <ul className="space-y-2 text-slate-400 font-semibold">
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('course-maharashtra')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Maharashtra State Board (SSC)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('course-cbse')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    CBSE Board (NCERT / NCF-SE)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('course-icse')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    ICSE Board (CISCE Curriculum)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openDemoWithTab('live-quiz')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Free Interactive Visitor Demo (2 Qs/Class)
                  </button>
                </li>
              </ul>
            </div>

            {/* Learning Zones & Plans Column */}
            <div className="space-y-3">
              <h3 className="text-white font-display font-extrabold uppercase tracking-wider text-[11px]">
                Learning Zones &amp; Plans
              </h3>
              <ul className="space-y-2 text-slate-400 font-semibold">
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('sm-notes')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Study Material &amp; Chapter Notes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('pz-worksheets')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Practice Zone &amp; Worksheets
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('ez-mock-tests')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Exam Zone &amp; Mock Tests
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleMenuAction('plan-maharashtra')}
                    className="hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    Plans &amp; Pricing (Free ₹0 · Premium ₹99/Yr)
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Policies Column */}
            <div className="space-y-3">
              <h3 className="text-white font-display font-extrabold uppercase tracking-wider text-[11px]">
                Support &amp; Compliance
              </h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-slate-400 font-semibold">
                <button type="button" onClick={() => handleNavigateTab('about')} className="text-left hover:text-amber-300 cursor-pointer">About Us</button>
                <button type="button" onClick={() => handleNavigateTab('contact')} className="text-left hover:text-amber-300 cursor-pointer">Contact Us</button>
                <button type="button" onClick={() => handleNavigateTab('help-support')} className="text-left hover:text-amber-300 cursor-pointer">Help &amp; Support</button>
                <button type="button" onClick={() => handleNavigateTab('faqs')} className="text-left hover:text-amber-300 cursor-pointer">FAQs</button>
                <button type="button" onClick={() => handleNavigateTab('grievance')} className="text-left hover:text-amber-300 cursor-pointer">Grievance</button>
                <button type="button" onClick={() => handleNavigateTab('terms')} className="text-left hover:text-amber-300 cursor-pointer">Terms</button>
                <button type="button" onClick={() => handleNavigateTab('privacy')} className="text-left hover:text-amber-300 cursor-pointer">Privacy Policy</button>
                <button type="button" onClick={() => handleNavigateTab('refund')} className="text-left hover:text-amber-300 cursor-pointer">Refund Policy</button>
                <button type="button" onClick={() => handleNavigateTab('disclaimer')} className="text-left hover:text-amber-300 cursor-pointer col-span-2">Educational Disclaimer</button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <p>
              FREE PLAN – ₹0 Lifetime · PREMIUM PLAN – ₹99 / 365 Days per Board &amp; Class · Single-Device Session Protection
            </p>
            <p>© {new Date().getFullYear()} MyStudyZone.in. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
