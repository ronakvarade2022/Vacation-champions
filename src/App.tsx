import React, { useState, useEffect, Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { PublicHomeDashboard } from './components/PublicHomeDashboard';
import { SubPageConsistencyBar } from './components/DashboardSplitNavigator';
import { HelpSupportAssistant } from './components/HelpSupportAssistant';
import { PWAInstallButton, PWAOfflineIndicator } from './components/PWAInstallButton';
import { SectionLoadingFallback } from './components/SectionLoadingFallback';
import { EXAM_RETURN_TO_DASHBOARD_EVENT } from './hooks/useExamFullscreen';
import { lazyWithRetry } from './utils/lazyWithRetry';

const SubjectQuizView = lazyWithRetry(() =>
  import('./components/SubjectQuizView').then((m) => ({ default: m.SubjectQuizView }))
);
const DemoSectionView = lazyWithRetry(() =>
  import('./components/DemoSectionView').then((m) => ({ default: m.DemoSectionView }))
);
const MembershipModal = lazyWithRetry(() =>
  import('./components/MembershipModal').then((m) => ({ default: m.MembershipModal }))
);
const PlanUpgradePromptModal = lazyWithRetry(() =>
  import('./components/PlanUpgradePromptModal').then((m) => ({ default: m.PlanUpgradePromptModal }))
);
const AuthModal = lazyWithRetry(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const PasswordResetModal = lazyWithRetry(() =>
  import('./components/PasswordResetModal').then((m) => ({ default: m.PasswordResetModal }))
);
const HelpSupportView = lazyWithRetry(() =>
  import('./components/HelpSupportView').then((m) => ({ default: m.HelpSupportView }))
);
const GrievanceRedressalView = lazyWithRetry(() =>
  import('./components/GrievanceRedressalView').then((m) => ({ default: m.GrievanceRedressalView }))
);
const TermsAndPrivacyView = lazyWithRetry(() =>
  import('./components/TermsAndPrivacyView').then((m) => ({ default: m.TermsAndPrivacyView }))
);
const AboutUsView = lazyWithRetry(() =>
  import('./components/AboutUsView').then((m) => ({ default: m.AboutUsView }))
);
const ContactUsView = lazyWithRetry(() =>
  import('./components/ContactUsView').then((m) => ({ default: m.ContactUsView }))
);
const FaqsView = lazyWithRetry(() =>
  import('./components/FaqsView').then((m) => ({ default: m.FaqsView }))
);
const AdminDashboard = lazyWithRetry(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const StoryWorldView = lazyWithRetry(() =>
  import('./components/StoryWorldView').then((m) => ({ default: m.StoryWorldView }))
);
const DrawingChampionsView = lazyWithRetry(() =>
  import('./components/DrawingChampionsView').then((m) => ({ default: m.DrawingChampionsView }))
);
const PuzzleChampionsView = lazyWithRetry(() =>
  import('./components/PuzzleChampionsView').then((m) => ({ default: m.PuzzleChampionsView }))
);
const CertificatesView = lazyWithRetry(() =>
  import('./components/CertificatesView').then((m) => ({ default: m.CertificatesView }))
);
const CricketChampionsView = lazyWithRetry(() =>
  import('./components/CricketChampionsView').then((m) => ({ default: m.CricketChampionsView }))
);
const ScholarshipChampionsView = lazyWithRetry(() =>
  import('./components/ScholarshipChampionsView').then((m) => ({
    default: m.ScholarshipChampionsView,
  }))
);
const TetCtetView = lazyWithRetry(() =>
  import('./components/TetCtetView').then((m) => ({
    default: m.TetCtetView,
  }))
);
const StudentProfileView = lazyWithRetry(() =>
  import('./components/StudentProfileView').then((m) => ({ default: m.StudentProfileView }))
);
const ShivajiStoriesView = lazyWithRetry(() =>
  import('./components/ShivajiStoriesView').then((m) => ({ default: m.ShivajiStoriesView }))
);
const SudokuView = lazyWithRetry(() =>
  import('./components/SudokuView').then((m) => ({ default: m.SudokuView }))
);
const FutureSkillsView = lazyWithRetry(() =>
  import('./components/FutureSkillsView').then((m) => ({ default: m.FutureSkillsView }))
);
const ReferralHubView = lazyWithRetry(() =>
  import('./components/ReferralHubView').then((m) => ({ default: m.ReferralHubView }))
);
const WorksheetsView = lazyWithRetry(() =>
  import('./components/WorksheetsView').then((m) => ({ default: m.WorksheetsView }))
);
import type { StudyLibrarySectionTab } from './components/StudyMaterialsView';
const StudyMaterialsView = lazyWithRetry(() =>
  import('./components/StudyMaterialsView').then((m) => ({ default: m.StudyMaterialsView }))
);
const PublicZoneExplorerView = lazyWithRetry(() =>
  import('./components/PublicZoneExplorerView').then((m) => ({ default: m.PublicZoneExplorerView }))
);
const AllCoursesExplorerView = lazyWithRetry(() =>
  import('./components/AllCoursesExplorerView').then((m) => ({ default: m.AllCoursesExplorerView }))
);
const OtherProgramsView = lazyWithRetry(() =>
  import('./components/OtherProgramsView').then((m) => ({ default: m.OtherProgramsView }))
);

const PortalLoadingCard: React.FC<{ onReturnHome?: () => void }> = ({ onReturnHome }) => (
  <SectionLoadingFallback label="Loading study workspace..." onReturnHome={onReturnHome} />
);
import { ClassLevel, EducationBoard, PlanSkuId, SubjectName, QuizLevel, SpecialLearningSectionId } from './types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from './data/navigationConfig';
import type { HomeScrollTarget } from './components/PublicHomeDashboard';
import type { ExplorerZoneType } from './components/PublicZoneExplorerView';
import type { SupportNavigationAction } from './data/helpSupportKnowledgeBase';
import {
  canAccessFeature,
  canAccessSubject,
  formatStandardOrdinal,
  getActivatedBoardClassesList,
  getBoardShortLabel,
  getStudentPlanInfo,
  getPremiumActivatedBannerMessage,
  hasCategoryAccess,
} from './utils/subscriptionAccess';
import {
  sanitizeReferralCode,
  clearStoredBrowserReferralCodes,
  readActiveUrlReferralCode,
} from './utils/referralCoding';
import { Trophy, GraduationCap, BookOpen, FileText, Volume2, Activity, Award, Crown, Sparkles, ShieldCheck, ShieldAlert, X, User, Headphones, Gift, Lock, CheckCircle2, RefreshCw, WifiOff } from 'lucide-react';
import './firebase';

const FEATURE_TITLES: Record<string, string> = {
  stories: 'Story World (45+ Audio Moral Stories)',
  shivaji: 'Chhatrapati Shivaji Maharaj Stories (50 Chapters)',
  drawing: 'Drawing & Colouring Studio',
  cricket: 'Cricket Champions Hub',
  scholarship: 'Maharashtra Scholarship (4th & 7th Std)',
  'tet-ctet': 'TET & CTET Exam Preparation (200 Mock Tests)',
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
    isSectionVisible,
    firebaseConnectionStatus,
    firebaseConnectionError,
    isFirebaseReconnecting,
    retryFirebaseConnection,
  } = useApp();
  const [dismissedConnBanner, setDismissedConnBanner] = useState(false);

  useEffect(() => {
    if (firebaseConnectionStatus === 'connected') {
      setDismissedConnBanner(false);
    }
  }, [firebaseConnectionStatus]);

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [quizInitialSubject, setQuizInitialSubject] = useState<SubjectName | undefined>(undefined);
  const [quizInitialLevel, setQuizInitialLevel] = useState<QuizLevel | undefined>(undefined);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'teacher' | 'register' | 'admin' | 'forgot'>('login');
  const [authInitialRegisterRole, setAuthInitialRegisterRole] = useState<'student' | 'teacher'>('student');
  const [authInitialEmail, setAuthInitialEmail] = useState<string>('');
  const [capturedReferralCode, setCapturedReferralCode] = useState<string>(() => {
    clearStoredBrowserReferralCodes();
    return readActiveUrlReferralCode();
  });
  const [resetOobCode, setResetOobCode] = useState<string>('');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState<boolean>(false);
  const [membershipInitialPlan, setMembershipInitialPlan] = useState<'basic' | 'premium'>('premium');
  const [membershipPlanSku, setMembershipPlanSku] = useState<PlanSkuId>('BOARD_CLASS');
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
  const [dashboardMainSection, setDashboardMainSection] = useState<MainMenuId>('special-learning');
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState<boolean>(false);
  const [worksheetsInitialClass, setWorksheetsInitialClass] = useState<ClassLevel | undefined>(undefined);
  const [worksheetsInitialBoard, setWorksheetsInitialBoard] = useState<EducationBoard | undefined>(undefined);
  const [studyInitialClass, setStudyInitialClass] = useState<ClassLevel | undefined>(undefined);
  const [studyInitialBoard, setStudyInitialBoard] = useState<EducationBoard | undefined>(undefined);
  const [studyInitialSectionTab, setStudyInitialSectionTab] = useState<
    StudyLibrarySectionTab | undefined
  >(undefined);

  const handleSelectDashboardSection = (sectionId: MainMenuId) => {
    setDashboardMainSection(sectionId);
    if (sectionId === 'study-material') {
      setStudyInitialSectionTab(undefined);
      setCurrentTab('study-materials');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentTab !== 'dashboard' && currentTab !== 'public-home') {
      setCurrentTab('dashboard');
    }
  };

  // Desktop Site / Mobile View preference
  const [viewMode, setViewMode] = useState<'auto' | 'desktop'>('auto');

  useEffect(() => {
    try {
      localStorage.removeItem('mystudyzone_view_mode');
    } catch {
      // Ignore storage errors
    }

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('desktop-site-active', viewMode === 'desktop');
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, viewport-fit=cover'
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
      if (currentTab === 'public-home') {
        setCurrentTab('dashboard');
      }
    }
  }, [currentStudent?.id, activeBoard]);

  useEffect(() => {
    if (activeRole === 'admin' && currentUser?.role === 'admin' && (currentTab === 'public-home' || currentTab === 'explore-zone' || currentTab === 'dashboard')) {
      setCurrentTab('admin');
    }
  }, [activeRole, currentUser?.role]);

  useEffect(() => {
    const handleReturnToDashboard = () => {
      setHomeScrollTarget('home-overview');
      setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener(EXAM_RETURN_TO_DASHBOARD_EVENT, handleReturnToDashboard);
    return () => {
      window.removeEventListener(EXAM_RETURN_TO_DASHBOARD_EVENT, handleReturnToDashboard);
    };
  }, [currentStudent]);

  // Keep browser tab title dynamic and professional for each portal
  useEffect(() => {
    if (currentTab === 'admin' || (activeRole === 'admin' && currentUser?.role === 'admin')) {
      document.title = 'MyStudyZone – Admin Portal (mystudyzone.in)';
    } else if (currentStudent?.accountRole === 'teacher') {
      document.title = 'MyStudyZone – Teacher Portal (mystudyzone.in)';
    } else if (currentStudent) {
      document.title = `MyStudyZone – Student Portal • ${activeBoard} ${currentStudent.classLevel}`;
    } else {
      document.title = 'MyStudyZone (mystudyzone.in) – Classes 1 to 10 Online Learning Platform';
    }
  }, [currentTab, activeRole, currentUser?.role, currentStudent?.id, currentStudent?.accountRole, currentStudent?.classLevel, activeBoard]);

  // Warm-cache lightweight modals during idle time (skip on Data Saver / slow 2G mobile networks)
  useEffect(() => {
    const conn = typeof navigator !== 'undefined' ? (navigator as any).connection : undefined;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
      return;
    }

    const idlePrefetch = (factory: () => Promise<any>, delay: number) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        return (window as any).requestIdleCallback(() => { void factory(); }, { timeout: delay + 2000 });
      }
      return setTimeout(() => { void factory(); }, delay);
    };

    const h1 = idlePrefetch(() => Promise.all([
      import('./components/AuthModal'),
      import('./components/MembershipModal'),
    ]), 2500);

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        try { (window as any).cancelIdleCallback(h1); } catch {}
      } else {
        clearTimeout(h1);
      }
    };
  }, []);

  // Detect Firebase Authentication password reset link (?mode=resetPassword&oobCode=...) and referral links (?ref=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      const emailParam = params.get('email');
      const pathname = window.location.pathname.toLowerCase();
      const rawRef = params.get('ref') || params.get('referral');

      clearStoredBrowserReferralCodes();

      if (rawRef) {
        const cleanRef = sanitizeReferralCode(rawRef);
        if (cleanRef) {
          setCapturedReferralCode(cleanRef);
        }
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('ref');
        cleanUrl.searchParams.delete('referral');
        window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
      }

      if (mode === 'resetPassword' && oobCode) {
        setResetOobCode(oobCode);
        setIsResetModalOpen(true);
      } else if (pathname.startsWith('/register') || rawRef) {
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
    targetBoard?: EducationBoard,
    planSku: PlanSkuId = 'BOARD_CLASS'
  ) => {
    setMembershipInitialPlan('premium');
    setMembershipPlanSku(planSku || 'BOARD_CLASS');
    setMembershipTargetClass(targetClass || currentStudent?.classLevel || publicClass);
    setMembershipTargetBoard(targetBoard || (currentStudent ? activeBoard : publicBoard));
    setIsMembershipOpen(true);
  };

  const openAuthModalWithTab = (
    defaultTab: 'login' | 'teacher' | 'register' | 'admin' | 'forgot' = 'login',
    registerRole: 'student' | 'teacher' = 'student'
  ) => {
    setAuthInitialRegisterRole(registerRole);
    setAuthDefaultTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const openDemoWithTab = (
    tab: 'overview' | 'demo-mock-tests' | 'live-curriculum' | 'live-quiz' | 'live-puzzles' = 'overview'
  ) => {
    setDemoInitialTab(tab as any);
    setCurrentTab('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: string, subjectParam?: SubjectName, levelParam?: QuizLevel) => {
    if (tab === 'help-support') {
      setIsHelpDrawerOpen(true);
      return;
    }

    if (tab === 'demo-mock-tests') {
      openDemoWithTab('demo-mock-tests');
      return;
    }

    const alwaysOpenTabs = new Set([
      'demo', 'demo-mock-tests', 'dashboard', 'public-home', 'explore-zone', 'all-courses', 'other-programs',
      'scholarship', 'tet-ctet', 'drawing', 'stories', 'shivaji', 'cricket', 'puzzles', 'sudoku',
      'future-skills', 'ai-academy', 'profile', 'account', 'subscription',
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

    if (tab !== 'worksheets') {
      setWorksheetsInitialClass(undefined);
      setWorksheetsInitialBoard(undefined);
    }
    if (tab !== 'study-materials' && tab !== 'study-material') {
      setStudyInitialClass(undefined);
      setStudyInitialBoard(undefined);
      setStudyInitialSectionTab(undefined);
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

  const handleHelpSupportNavigation = (action: SupportNavigationAction) => {
    const { id, targetClass, targetBoard } = action;
    if (targetBoard) {
      setPublicBoard(targetBoard);
    }
    if (targetClass) {
      setPublicClass(targetClass);
    }

    switch (id) {
      case 'open_worksheets': {
        setWorksheetsInitialClass(targetClass);
        setWorksheetsInitialBoard(targetBoard);
        setCurrentTab('worksheets');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      case 'open_syllabus': {
        setStudyInitialClass(targetClass);
        setStudyInitialBoard(targetBoard);
        setCurrentTab('study-materials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      case 'open_all_courses': {
        handleNavigateTab('all-courses');
        return;
      }
      case 'open_quizzes': {
        if (isLearningPortal && currentStudent) {
          handleNavigateTab('quizzes');
        } else {
          openDemoWithTab('live-quiz');
        }
        return;
      }
      case 'open_scholarship': {
        handleNavigateTab('scholarship');
        return;
      }
      case 'open_tet_ctet': {
        handleNavigateTab('tet-ctet');
        return;
      }
      case 'open_teacher_resources': {
        if (currentStudent && (currentStudent.accountRole === 'teacher' || isTeacherPortal)) {
          switchRole('teacher');
          setCurrentTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (currentStudent) {
          handleNavigateTab('all-courses');
        } else {
          openAuthModalWithTab('teacher', 'teacher');
        }
        return;
      }
      case 'open_stories': {
        handleNavigateTab('stories');
        return;
      }
      case 'open_shivaji': {
        handleNavigateTab('shivaji');
        return;
      }
      case 'open_drawing': {
        handleNavigateTab('drawing');
        return;
      }
      case 'open_puzzles': {
        handleNavigateTab('puzzles');
        return;
      }
      case 'open_sudoku': {
        handleNavigateTab('sudoku');
        return;
      }
      case 'open_cricket': {
        handleNavigateTab('cricket');
        return;
      }
      case 'open_ai_academy': {
        handleNavigateTab('future-skills');
        return;
      }
      case 'open_other_programs': {
        handleNavigateTab('other-programs');
        return;
      }
      case 'open_demo': {
        openDemoWithTab('overview');
        return;
      }
      case 'open_certificates': {
        handleMenuAction('perf-certificates');
        return;
      }
      case 'open_referrals': {
        handleNavigateTab('referrals');
        return;
      }
      case 'open_profile': {
        handleMenuAction('acc-profile');
        return;
      }
      case 'open_plans': {
        openMembershipWithPlan(
          'premium',
          targetClass || currentStudent?.classLevel || publicClass,
          targetBoard || (currentStudent ? activeBoard : publicBoard)
        );
        return;
      }
      case 'open_login': {
        openAuthModalWithTab('login', 'student');
        return;
      }
      case 'open_teacher_login': {
        openAuthModalWithTab('teacher', 'teacher');
        return;
      }
      case 'open_register': {
        openAuthModalWithTab('register', 'student');
        return;
      }
      case 'open_password_reset': {
        openAuthModalWithTab('forgot', 'student');
        return;
      }
      case 'open_dashboard':
      default: {
        setHomeScrollTarget('home-overview');
        setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
  };

  const handleMenuAction = (actionId: NavSubActionId) => {
    const isSignedInLearner = Boolean(isLearningPortal && currentStudent);

    switch (actionId) {
      // SECTION 1: HOME DASHBOARD
      case 'home-overview':
      case 'home-how-it-works':
      case 'home-why-choose-us': {
        setHomeScrollTarget('home-overview');
        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 2: COURSES (Dedicated Courses Directory Page)
      case 'course-all': {
        handleNavigateTab('all-courses');
        return;
      }
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
        handleNavigateTab('all-courses');
        return;
      }

      // SECTION 3: SPECIAL LEARNING (Dedicated Enrichment Studio Pages)
      case 'sl-scholarship': {
        handleNavigateTab('scholarship');
        return;
      }
      case 'sl-tet-ctet': {
        handleNavigateTab('tet-ctet');
        return;
      }
      case 'sl-drawing': {
        handleNavigateTab('drawing');
        return;
      }
      case 'sl-stories':
      case 'sl-moral': {
        handleNavigateTab('stories');
        return;
      }
      case 'sl-shivaji': {
        handleNavigateTab('shivaji');
        return;
      }
      case 'sl-gk': {
        handleNavigateTab('cricket');
        return;
      }
      case 'sl-ai-academy': {
        handleNavigateTab('future-skills');
        return;
      }
      case 'sl-creative':
      case 'sl-programs': {
        handleNavigateTab('other-programs');
        return;
      }

      // SECTION 4: STUDY MATERIAL (100% Free Study Material Library for Visitors, Students & Teachers)
      case 'sm-notes':
      case 'sm-worksheets':
      case 'sm-summaries':
      case 'sm-pdfs':
      case 'sm-question-banks':
      case 'sm-guides':
      case 'sm-important-questions':
      case 'sm-textbook-learning': {
        if (actionId === 'sm-worksheets') {
          handleNavigateTab('worksheets');
          return;
        }
        const tabMap: Record<string, StudyLibrarySectionTab> = {
          'sm-notes': 'chapter_notes',
          'sm-summaries': 'short_revision',
          'sm-pdfs': 'model_papers',
          'sm-question-banks': 'qa_bank',
          'sm-guides': 'pyq_papers',
          'sm-important-questions': 'qa_bank',
          'sm-textbook-learning': 'textbooks',
        };
        setStudyInitialSectionTab(tabMap[actionId] || 'chapter_notes');
        setCurrentTab('study-materials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 5: PRACTICE ZONE (Maths, English, Science, Reasoning, Brain Puzzles, Sudoku, Vocabulary, Memory Games)
      case 'pz-puzzles':
      case 'pz-memory': {
        handleNavigateTab('puzzles');
        return;
      }
      case 'pz-sudoku': {
        handleNavigateTab('sudoku');
        return;
      }
      case 'pz-worksheets': {
        handleNavigateTab('worksheets');
        return;
      }
      case 'pz-maths':
      case 'pz-english':
      case 'pz-science':
      case 'pz-reasoning':
      case 'pz-vocabulary':
      case 'pz-mcq':
      case 'pz-chapter':
      case 'pz-daily': {
        setExplorerZone('practice-zone');
        setExplorerSubFocus(actionId);
        setCurrentTab('explore-zone');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 6: EXAM ZONE (Chapter Tests, Subject Tests, Full Syllabus, Scholarship Mocks, Competitive, Timed)
      case 'ez-mock-tests': {
        handleNavigateTab('scholarship');
        return;
      }
      case 'ez-tet-ctet': {
        handleNavigateTab('tet-ctet');
        return;
      }
      case 'ez-chapter-tests':
      case 'ez-subject-tests':
      case 'ez-full-syllabus':
      case 'ez-competitive':
      case 'ez-timed':
      case 'ez-model-papers':
      case 'ez-exam-practice': {
        setExplorerZone('exam-zone');
        setExplorerSubFocus(actionId);
        setCurrentTab('explore-zone');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 7: PERFORMANCE (Personal Test Results, Marks, Accuracy, Courses, Certificates, Achievements)
      case 'perf-certificates': {
        if (isSignedInLearner) {
          handleNavigateTab('certificates');
          return;
        }
        setExplorerZone('performance');
        setExplorerSubFocus(actionId);
        setCurrentTab('explore-zone');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      case 'perf-tracking':
      case 'perf-results':
      case 'perf-marks':
      case 'perf-analysis': {
        setExplorerZone('performance');
        setExplorerSubFocus(actionId);
        setCurrentTab('explore-zone');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 8: PLANS & PRICING (Free, Maharashtra, CBSE, ICSE, Special, Purchased Content)
      case 'plan-free':
      case 'plan-maharashtra':
      case 'plan-cbse':
      case 'plan-icse':
      case 'plan-special':
      case 'plan-purchased': {
        if (actionId === 'plan-cbse') setPublicBoard('CBSE');
        else if (actionId === 'plan-icse') setPublicBoard('ICSE');
        else if (actionId === 'plan-maharashtra') setPublicBoard('Maharashtra');
        setExplorerZone('plans');
        setExplorerSubFocus(actionId);
        setCurrentTab('explore-zone');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // SECTION 9: MY ACCOUNT (Profile, Personal Info, Purchases, Courses, Refer & Earn, Settings, Password, Help & Support)
      case 'acc-referrals': {
        handleNavigateTab('referrals');
        return;
      }
      case 'acc-support': {
        handleNavigateTab('help-support');
        return;
      }
      case 'acc-register': {
        openAuthModalWithTab('register');
        return;
      }
      case 'acc-profile':
      case 'acc-purchases':
      case 'acc-classes':
      case 'acc-settings':
      case 'acc-login':
      case 'acc-subscription': {
        if (isSignedInLearner) {
          handleNavigateTab('profile');
        } else {
          openAuthModalWithTab(activeRole === 'teacher' ? 'teacher' : 'login');
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
    if (currentTab === 'all-courses') return 'courses';
    if (
      currentTab === 'scholarship' ||
      currentTab === 'tet-ctet' ||
      currentTab === 'drawing' ||
      currentTab === 'stories' ||
      currentTab === 'shivaji' ||
      currentTab === 'cricket' ||
      currentTab === 'puzzles' ||
      currentTab === 'sudoku' ||
      currentTab === 'future-skills' ||
      currentTab === 'ai-academy' ||
      currentTab === 'other-programs'
    ) {
      return 'special-learning';
    }
    if (currentTab === 'study-materials') return 'study-material';
    if (currentTab === 'worksheets' || currentTab === 'quizzes') {
      return 'practice-zone';
    }
    if (currentTab === 'certificates' || currentTab === 'leaderboard') return 'performance';
    if (
      currentTab === 'profile' ||
      currentTab === 'account' ||
      currentTab === 'subscription' ||
      currentTab === 'referrals'
    ) {
      return 'account';
    }
    if ((currentTab === 'dashboard' || currentTab === 'public-home') && homeScrollTarget === 'courses-section') {
      return 'courses';
    }
    if ((currentTab === 'dashboard' || currentTab === 'public-home') && homeScrollTarget === 'plans-pricing') {
      return 'plans';
    }
    if (currentTab === 'dashboard' || currentTab === 'public-home') {
      return dashboardMainSection;
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
      openAuthModalWithTab('admin', 'student');
      return;
    }

    if (panel === 'teacher') {
      if (currentStudent && currentStudent.accountRole === 'teacher' && intent === 'login') {
        switchRole('teacher');
        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      openAuthModalWithTab(intent === 'register' ? 'register' : 'teacher', 'teacher');
      return;
    }

    if (activeRole !== 'student') {
      switchRole('student');
    }
    if (currentStudent && currentStudent.accountRole !== 'teacher' && intent === 'login') {
      setCurrentTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    openAuthModalWithTab(intent === 'register' ? 'register' : 'login', 'student');
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
        onSelectMainSection={handleSelectDashboardSection}
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

        {!dismissedConnBanner &&
          (firebaseConnectionStatus === 'offline' ||
            firebaseConnectionStatus === 'error' ||
            firebaseConnectionStatus === 'reconnecting') && (
            <div
              role="status"
              data-testid="firebase-connection-banner"
              className={`mb-5 rounded-2xl border p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                firebaseConnectionStatus === 'reconnecting'
                  ? 'bg-sky-50 border-sky-200 text-sky-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    firebaseConnectionStatus === 'reconnecting'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {firebaseConnectionStatus === 'reconnecting' ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <WifiOff className="w-4 h-4" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-wider">
                    {firebaseConnectionStatus === 'reconnecting'
                      ? 'Reconnecting to Cloud Sync...'
                      : 'Cloud Connection Notice'}
                  </p>
                  <p className="text-xs sm:text-sm font-medium leading-snug">
                    {firebaseConnectionError ||
                      'Live cloud synchronization is temporarily unavailable. Saved study materials remain active and will sync automatically when online.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  disabled={isFirebaseReconnecting}
                  onClick={() => void retryFirebaseConnection()}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFirebaseReconnecting ? 'animate-spin' : ''}`} />
                  <span>{isFirebaseReconnecting ? 'Connecting...' : 'Retry Sync'}</span>
                </button>
                <button
                  type="button"
                  aria-label="Dismiss connection notice"
                  onClick={() => setDismissedConnBanner(true)}
                  className="p-1.5 rounded-xl hover:bg-black/5 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        {/* Consistent Sub-Page Navigation Bar (Return to Main Dashboard + Active Class + Left Vertical Section List + Right Horizontal Icon Display) */}
        {isLearningPortal && currentTab !== 'public-home' && currentTab !== 'dashboard' && (
          <SubPageConsistencyBar
            activeSectionId={currentTab === 'referrals' ? 'referrals' : getActiveMenuId()}
            selectedBoard={currentStudent ? activeBoard : publicBoard}
            selectedClass={currentStudent ? currentStudent.classLevel : publicClass}
            onSelectSection={(sectionId) => {
              if (sectionId === 'referrals') {
                handleNavigateTab('referrals');
                return;
              }
              const targetMenu = MAIN_NAV_MENUS.find((m) => m.id === sectionId);
              if (targetMenu && targetMenu.items.length > 0) {
                handleMenuAction(targetMenu.items[0].id);
              } else {
                handleMenuAction('home-overview');
              }
            }}
            onTriggerSubAction={handleMenuAction}
            onNavigateTab={(tab) => handleNavigateTab(tab)}
            onReturnHome={() => {
              setHomeScrollTarget('home-overview');
              setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
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
              selectedBoard={currentStudent ? activeBoard : publicBoard}
              selectedClass={currentStudent ? currentStudent.classLevel : publicClass}
              onSelectBoard={setPublicBoard}
              onSelectClass={setPublicClass}
              onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
              onOpenAuth={(tab) => openAuthModalWithTab(tab)}
              onOpenMembership={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
              onNavigateTab={handleNavigateTab}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab('dashboard');
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
                const directStudioTabs = new Set([
                  'all-courses',
                  'other-programs',
                  'scholarship',
                  'tet-ctet',
                  'drawing',
                  'stories',
                  'shivaji',
                  'cricket',
                  'puzzles',
                  'sudoku',
                  'future-skills',
                  'ai-academy',
                  'referrals',
                  'faqs',
                ]);
                if (directStudioTabs.has(tab)) {
                  handleNavigateTab(tab, subject);
                  return;
                }
                if (tab === 'worksheets' || tab === 'study-materials') {
                  handleNavigateTab(tab, subject);
                  return;
                }
                if (isLearningPortal && currentStudent) {
                  if (tab === 'performance') {
                    handleNavigateTab('dashboard');
                  } else {
                    handleNavigateTab(tab, subject);
                  }
                } else {
                  if (tab === 'quizzes') {
                    setExplorerZone('practice-zone');
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
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
              onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
              onMenuAction={handleMenuAction}
              activeMainSection={dashboardMainSection}
              onSelectMainSection={handleSelectDashboardSection}
            />
          ) : currentTab === 'referrals' ? (
            <ReferralHubView
              currentUserId={currentStudent?.id || ''}
              userName={currentStudent?.name || ''}
              userEmail={currentStudent?.email || ''}
              userMobile={currentStudent?.mobile || ''}
              initialRole={isTeacherPortal ? 'teacher' : 'student'}
              isAuthenticated={Boolean(currentStudent)}
              onRequestAuth={(tab) => openAuthModalWithTab(tab || 'login')}
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
          ) : currentTab === 'all-courses' ? (
            <AllCoursesExplorerView
              selectedBoard={publicBoard}
              selectedClass={publicClass}
              onSelectBoard={setPublicBoard}
              onSelectClass={setPublicClass}
              onOpenSubjectPractice={(board, cls, subj, mode) => {
                setPublicBoard(board);
                setPublicClass(cls);
                if (mode === 'worksheets') {
                  setWorksheetsInitialBoard(board);
                  setWorksheetsInitialClass(cls);
                  setQuizInitialSubject(subj);
                  setCurrentTab('worksheets');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                if (mode === 'study-materials') {
                  setStudyInitialBoard(board);
                  setStudyInitialClass(cls);
                  setQuizInitialSubject(subj);
                  setCurrentTab('study-materials');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                if (currentStudent) {
                  handleNavigateTab(mode, subj);
                } else {
                  openDemoWithTab(mode === 'quizzes' ? 'live-quiz' : 'live-curriculum');
                }
              }}
              onOpenMembership={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'other-programs' ? (
            <OtherProgramsView
              onNavigateStudio={(targetTab) => handleNavigateTab(targetTab)}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'tet-ctet' ? (
            <TetCtetView
              onOpenAuth={() => openAuthModalWithTab('teacher', 'teacher')}
              onOpenMembership={(planSku) =>
                openMembershipWithPlan('premium', publicClass, publicBoard, planSku || 'TET_1Y')
              }
            />
          ) : currentTab === 'worksheets' ? (
            <WorksheetsView
              initialClassLevel={worksheetsInitialClass || currentStudent?.classLevel || publicClass}
              initialBoard={worksheetsInitialBoard || (currentStudent ? activeBoard : publicBoard)}
              initialSubject={quizInitialSubject}
              onOpenAuth={(tab) => openAuthModalWithTab(tab || 'login')}
              onUnlockClick={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
            />
          ) : currentTab === 'study-materials' ? (
            <StudyMaterialsView
              initialBoard={studyInitialBoard || (currentStudent ? activeBoard : publicBoard)}
              initialClass={studyInitialClass || currentStudent?.classLevel || publicClass}
              initialSubject={quizInitialSubject}
              initialSectionTab={studyInitialSectionTab}
              onNavigateTab={handleNavigateTab}
              onOpenMembership={(plan, targetClass, targetBoard) =>
                openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)
              }
            />
          ) : (['scholarship', 'drawing', 'stories', 'shivaji', 'cricket', 'puzzles', 'sudoku', 'future-skills', 'ai-academy'] as const).includes(currentTab as 'scholarship') ? (
            (() => {
              const sectionKeyMap: Record<string, SpecialLearningSectionId> = {
                scholarship: 'scholarship',
                drawing: 'drawing',
                stories: 'stories',
                shivaji: 'shivaji',
                cricket: 'gk_cricket',
                puzzles: 'creative_activities',
                sudoku: 'creative_activities',
                'future-skills': 'future_skills',
                'ai-academy': 'future_skills',
              };
              const visKey = sectionKeyMap[currentTab];
              if (visKey && !isSectionVisible(visKey)) {
                return (
                  <div className="max-w-lg mx-auto my-12 bg-white rounded-3xl p-8 border border-amber-200 shadow-sm text-center space-y-4">
                    <h2 className="text-xl font-display font-extrabold text-slate-900">
                      Section Temporarily Hidden
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This Special Learning section is currently hidden for your account view by the platform administrator.
                    </p>
                    <button
                      type="button"
                      onClick={() => setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home')}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
                    >
                      Return to Home
                    </button>
                  </div>
                );
              }
              if (currentTab === 'scholarship') {
                return (
                  <ScholarshipChampionsView
                    onOpenAuth={() => openAuthModalWithTab('login')}
                    onOpenMembership={(planSku) =>
                      openMembershipWithPlan('premium', publicClass, publicBoard, planSku || 'SCHOLARSHIP_COMBO')
                    }
                  />
                );
              }
              if (currentTab === 'drawing') {
                return <DrawingChampionsView onOpenAuth={() => openAuthModalWithTab('login')} />;
              }
              if (currentTab === 'stories') {
                return (
                  <StoryWorldView
                    onOpenAuth={() => openAuthModalWithTab('login')}
                    onOpenMembership={() => openMembershipWithPlan('premium', publicClass, publicBoard)}
                  />
                );
              }
              if (currentTab === 'shivaji') {
                return (
                  <ShivajiStoriesView
                    onOpenAuth={() => openAuthModalWithTab('login')}
                    onOpenMembership={() => openMembershipWithPlan('premium', publicClass, publicBoard)}
                  />
                );
              }
              if (currentTab === 'cricket') {
                return (
                  <CricketChampionsView
                    onOpenAuth={() => openAuthModalWithTab('login')}
                    onOpenMembership={() => openMembershipWithPlan('premium', publicClass, publicBoard)}
                  />
                );
              }
              if (currentTab === 'puzzles') {
                return <PuzzleChampionsView />;
              }
              if (currentTab === 'sudoku') {
                return <SudokuView />;
              }
              return (
                <FutureSkillsView
                  onOpenAuth={() => openAuthModalWithTab('login')}
                  onOpenMembership={() => openMembershipWithPlan('premium', publicClass, publicBoard)}
                />
              );
            })()
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
                onNavigateZone={(tab, subSection, subject) => {
                  const directStudioTabs = new Set([
                    'all-courses',
                    'other-programs',
                    'scholarship',
                    'tet-ctet',
                    'drawing',
                    'stories',
                    'shivaji',
                    'cricket',
                    'puzzles',
                    'sudoku',
                    'future-skills',
                    'ai-academy',
                    'referrals',
                    'faqs',
                  ]);
                  if (directStudioTabs.has(tab)) {
                    handleNavigateTab(tab, subject);
                    return;
                  }
                  if (tab === 'worksheets' || tab === 'study-materials') {
                    if (tab === 'study-materials' && subSection) {
                      const subTabMap: Record<string, StudyLibrarySectionTab> = {
                        textbooks: 'textbooks',
                        chapter_notes: 'chapter_notes',
                        short_revision: 'short_revision',
                        qa_bank: 'qa_bank',
                        chapter_test: 'chapter_test',
                        model_papers: 'model_papers',
                        pyq_papers: 'pyq_papers',
                        video_lessons: 'video_lessons',
                        math_hub: 'math_hub',
                        science_diagrams: 'science_diagrams',
                        english_grammar: 'english_grammar',
                        scholarship_olympiad: 'scholarship_olympiad',
                      };
                      if (subTabMap[subSection]) {
                        setStudyInitialSectionTab(subTabMap[subSection]);
                      }
                    }
                    handleNavigateTab(tab, subject);
                    return;
                  }
                  if (tab === 'quizzes') {
                    setExplorerZone('practice-zone');
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
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
                onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
                onMenuAction={handleMenuAction}
                activeMainSection={dashboardMainSection}
                onSelectMainSection={handleSelectDashboardSection}
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
                            <span>Teacher Portal &bull; Active: {getBoardShortLabel(activeBoard)} &bull; {currentStudent.classLevel}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>
                              Classes 1–10 + Scholarship + TET/CTET Hub ({getActivatedBoardClassesList(currentStudent).length} Paid Class{getActivatedBoardClassesList(currentStudent).length === 1 ? '' : 'es'})
                            </span>
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-display font-black">
                          Welcome, {currentStudent.name}! (Educator Workspace)
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                          {isPremiumActive
                            ? getPremiumActivatedBannerMessage(currentStudent.classLevel, activeBoard)
                            : `Browse Classes 1–10 (All Boards), 4th & 7th Scholarship, MAHA TET, and CTET Papers 1 & 2. Free demos & Mock 01 previews are open; paid tests and full banks unlock per purchased plan.`}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard, 'BOARD_CLASS')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-black text-xs cursor-pointer transition-colors"
                        >
                          <Crown className="w-4 h-4 text-amber-300" />
                          <span>{isPremiumActive ? `Class Active (${getBoardShortLabel(activeBoard)} ${currentStudent.classLevel})` : `Unlock Class (₹99)`}</span>
                        </button>
                        {!hasCategoryAccess(currentStudent, 'all_classes') && (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard, 'TET_CTET_COMBO_1Y')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md cursor-pointer transition-all"
                          >
                            <Award className="w-4 h-4" />
                            <span>TET + CTET Combo 1 Year (₹499)</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Teacher Category Access Badges (Visibility Separate from Paid Access) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-white/15 text-xs">
                      {[
                        {
                          id: 'all_classes',
                          label: 'Classes 1 to 10',
                          unlocked: hasCategoryAccess(currentStudent, 'all_classes') || getActivatedBoardClassesList(currentStudent).length > 0,
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('all_classes'),
                          sku: 'BOARD_CLASS' as PlanSkuId,
                          tab: 'all-courses',
                        },
                        {
                          id: 'scholarship_4th',
                          label: '4th Scholarship',
                          unlocked: hasCategoryAccess(currentStudent, 'scholarship_4th'),
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('scholarship_4th'),
                          sku: 'SCHOLARSHIP_COMBO' as PlanSkuId,
                          tab: 'scholarship',
                        },
                        {
                          id: 'scholarship_7th',
                          label: '7th Scholarship',
                          unlocked: hasCategoryAccess(currentStudent, 'scholarship_7th'),
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('scholarship_7th'),
                          sku: 'SCHOLARSHIP_COMBO' as PlanSkuId,
                          tab: 'scholarship',
                        },
                        {
                          id: 'maha_tet',
                          label: 'Maharashtra TET',
                          unlocked: hasCategoryAccess(currentStudent, 'maha_tet'),
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('maha_tet'),
                          sku: 'TET_1Y' as PlanSkuId,
                          tab: 'tet-ctet',
                        },
                        {
                          id: 'ctet_paper_1',
                          label: 'CTET Paper 1',
                          unlocked: hasCategoryAccess(currentStudent, 'ctet_paper_1'),
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('ctet_paper_1'),
                          sku: 'CTET_1Y' as PlanSkuId,
                          tab: 'tet-ctet',
                        },
                        {
                          id: 'ctet_paper_2',
                          label: 'CTET Paper 2',
                          unlocked: hasCategoryAccess(currentStudent, 'ctet_paper_2'),
                          selected: !currentStudent.selectedTeacherCategories?.length || currentStudent.selectedTeacherCategories.includes('ctet_paper_2'),
                          sku: 'CTET_1Y' as PlanSkuId,
                          tab: 'tet-ctet',
                        },
                        {
                          id: 'ctet_both',
                          label: 'Both CTET Papers',
                          unlocked: hasCategoryAccess(currentStudent, 'ctet_paper_1') && hasCategoryAccess(currentStudent, 'ctet_paper_2'),
                          selected: !currentStudent.selectedTeacherCategories?.length || (currentStudent.selectedTeacherCategories.includes('ctet_paper_1') && currentStudent.selectedTeacherCategories.includes('ctet_paper_2')),
                          sku: 'CTET_1Y' as PlanSkuId,
                          tab: 'tet-ctet',
                        },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            cat.unlocked
                              ? handleNavigateTab(cat.tab)
                              : openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard, cat.sku)
                          }
                          className={`px-3 py-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                            cat.unlocked
                              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-100 hover:bg-emerald-500/30'
                              : cat.selected
                              ? 'bg-white/15 border-amber-300/50 text-white hover:bg-white/20'
                              : 'bg-black/25 border-white/15 text-amber-100/80 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 w-full">
                            <span className="font-extrabold truncate">{cat.label}</span>
                            {cat.unlocked ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                            )}
                          </div>
                          <span className="text-[9px] font-bold text-emerald-200/90 truncate">
                            {cat.unlocked ? 'Purchased ✓' : cat.selected ? '✓ Selected • Preview Open' : 'Available'}
                          </span>
                        </button>
                      ))}
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
                        <span>Class-Wise Worksheets</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('study-materials')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'study-materials' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Free Study Library (12 Modules)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('quizzes')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'quizzes' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>4-Level Practice Quizzes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('scholarship')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'scholarship' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>4th &amp; 7th Scholarship</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('tet-ctet')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'tet-ctet' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>TET &amp; CTET (200 Mocks)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('stories')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'stories' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Stories &amp; Audio</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('cricket')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'cricket' ? 'bg-white text-emerald-950' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Current Affairs</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('help-support')}
                        className="px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>HELP &amp; SUPPORT</span>
                      </button>
                      <PWAInstallButton variant="teacher" />
                    </div>
                  </div>
                )}

                {currentTab === 'dashboard' && (
                  <StudentDashboard
                    onNavigateTab={handleNavigateTab}
                    onOpenMembership={(plan, targetClass, targetBoard, planSku) =>
                      openMembershipWithPlan(plan || 'premium', targetClass, targetBoard, planSku)
                    }
                    viewMode={viewMode}
                    onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
                    onMenuAction={handleMenuAction}
                    onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
                    activeMainSection={dashboardMainSection}
                    onSelectMainSection={handleSelectDashboardSection}
                  />
                )}

                {currentTab === 'quizzes' && (
                  <SubjectQuizView
                    initialSubject={quizInitialSubject}
                    initialLevel={quizInitialLevel}
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
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

        {/* Permanent Bottom Navigation Menu across all non-home student dashboard pages (Home Dashboard & Public Home render this inside ReferenceShowcaseSections so there is zero duplication) */}
        {isLearningPortal &&
          currentTab !== 'public-home' &&
          !(currentTab === 'dashboard' && currentStudent) &&
          !(currentTab === 'dashboard' && !currentStudent) && (
            <nav
              aria-label="Bottom Navigation Menu"
              className="mt-10 pt-6 border-t border-amber-200/80"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  {
                    label: 'My Courses',
                    icon: BookOpen,
                    cardBg: 'from-[#e0f2fe] to-[#bae6fd]',
                    border: 'border-sky-300',
                    iconBg: 'bg-blue-600 text-white',
                    onClick: () => handleNavigateTab('all-courses'),
                  },
                  {
                    label: 'Certificates',
                    icon: Award,
                    cardBg: 'from-[#fef3c7] to-[#fde68a]',
                    border: 'border-amber-300',
                    iconBg: 'bg-amber-600 text-white',
                    onClick: () => handleMenuAction('perf-certificates'),
                  },
                  {
                    label: 'Leaderboard',
                    icon: Trophy,
                    cardBg: 'from-[#dcfce7] to-[#bbf7d0]',
                    border: 'border-emerald-300',
                    iconBg: 'bg-emerald-600 text-white',
                    onClick: () => handleMenuAction('perf-certificates'),
                  },
                  {
                    label: 'My Account',
                    icon: User,
                    cardBg: 'from-[#f3e8ff] to-[#e9d5ff]',
                    border: 'border-purple-300',
                    iconBg: 'bg-purple-600 text-white',
                    onClick: () => handleMenuAction('acc-profile'),
                  },
                  {
                    label: 'Help & Support',
                    icon: Headphones,
                    cardBg: 'from-[#e0f2fe] to-[#cffafe]',
                    border: 'border-cyan-300',
                    iconBg: 'bg-sky-600 text-white',
                    onClick: () => handleNavigateTab('help-support'),
                  },
                  {
                    label: 'More Programs',
                    icon: Gift,
                    cardBg: 'from-[#ffe4e6] to-[#fecdd3]',
                    border: 'border-rose-300',
                    iconBg: 'bg-rose-600 text-white',
                    onClick: () => handleNavigateTab('other-programs'),
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

                <button
                  type="button"
                  onClick={() => handleNavigateTab('referrals')}
                  aria-label="Refer & Earn – Open Referral Hub"
                  className={`col-span-2 sm:col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#facc15] border-2 border-amber-500 p-3.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-center ${
                    currentTab === 'referrals'
                      ? 'ring-3 ring-emerald-600'
                      : 'ring-2 ring-amber-300/60'
                  }`}
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
          )}
      </main>

      {/* Global Modals (Mounted on-demand inside Suspense so initial page render is ultra-fast) */}
      <Suspense fallback={null}>
        {isMembershipOpen && (
          <MembershipModal
            isOpen={isMembershipOpen}
            onClose={() => setIsMembershipOpen(false)}
            initialSelectedPlan={membershipInitialPlan}
            initialPlanSku={membershipPlanSku}
            initialSelectedClass={membershipTargetClass}
            initialSelectedBoard={membershipTargetBoard}
            onRequestAuth={(defaultTab) => openAuthModalWithTab(defaultTab || 'login')}
          />
        )}

        {upgradePrompt.isOpen && (
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
        )}

        {(isAuthModalOpen || isAuthOpen) && (
          <AuthModal
            isOpen={isAuthModalOpen || isAuthOpen}
            defaultTab={authDefaultTab}
            initialRegisterRole={authInitialRegisterRole}
            initialEmail={authInitialEmail}
            initialBoard={publicBoard}
            initialClass={publicClass}
            initialReferralCode={capturedReferralCode}
            onClearReferralCode={() => setCapturedReferralCode('')}
            onExistingAccountProceedToSubscription={(targetClass, targetBoard) => {
              openMembershipWithPlan('premium', targetClass, targetBoard);
            }}
            onClose={() => {
              setIsAuthModalOpen(false);
              setIsAuthOpen(false);
              setAuthDefaultTab('login');
              setAuthInitialRegisterRole('student');
            }}
          />
        )}

        {isResetModalOpen && (
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
        )}
      </Suspense>

      {/* Unified AI-Powered Help & Support Assistant (Shared for Students, Teachers & Visitors) */}
      <HelpSupportAssistant
        isOpen={isHelpDrawerOpen}
        onOpenChange={setIsHelpDrawerOpen}
        onNavigateAction={handleHelpSupportNavigation}
        activeTab={currentTab}
      />

      {/* Non-intrusive PWA Offline Connectivity Banner */}
      <PWAOfflineIndicator />

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
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateTab('referrals')}
                    className="text-amber-300 hover:text-amber-200 font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>🎁</span>
                    <span>Refer &amp; Earn (₹5 Cashback Hub)</span>
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

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message || 'Unexpected loading issue' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[MyStudyZone ErrorBoundary]:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-amber-200 shadow-lg p-6 text-center space-y-4">
            <h1 className="text-xl font-display font-extrabold text-slate-900">
              MyStudyZone Quick Recovery
            </h1>
            <p className="text-sm text-slate-600">
              A temporary network or browser issue interrupted loading this view. Your account, tests, and progress are completely safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, message: '' })}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AppErrorBoundary>
  );
}
