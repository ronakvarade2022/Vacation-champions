import React, { useState, useEffect, startTransition, Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { PublicHomeDashboard } from './components/PublicHomeDashboard';
import { SubPageConsistencyBar } from './components/DashboardSplitNavigator';
import { HelpSupportAssistant } from './components/HelpSupportAssistant';
import { PWAInstallButton, PWAOfflineIndicator } from './components/PWAInstallButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SectionLoadingFallback } from './components/SectionLoadingFallback';
import { LiveAnnouncementTicker } from './components/LiveAnnouncementTicker';
import { EXAM_RETURN_TO_DASHBOARD_EVENT } from './hooks/useExamFullscreen';
import { lazyWithRetry, sanitizeDiagnosticErrorMessage } from './utils/lazyWithRetry';
import {
  useSmartTvNavigation,
  safeScrollToTop,
  safeScrollToElementById,
  isSmartTvOrSingleWindowBrowser,
} from './utils/smartTvCompatibility';

import type { StudyLibrarySectionTab } from './components/StudyMaterialsView';
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
const AdditionalCurriculumView = lazyWithRetry(() =>
  import('./components/AdditionalCurriculumView').then((m) => ({ default: m.AdditionalCurriculumView }))
);
const ScholarshipChampionsView = lazyWithRetry(() =>
  import('./components/ScholarshipChampionsView').then((m) => ({
    default: m.ScholarshipChampionsView,
  }))
);
const AdminDashboard = lazyWithRetry(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const TetCtetView = lazyWithRetry(() =>
  import('./components/TetCtetView').then((m) => ({
    default: m.TetCtetView,
  }))
);
const TeacherLessonPlannerView = lazyWithRetry(() =>
  import('./components/lessonPlanner/TeacherLessonPlannerView').then((m) => ({
    default: m.TeacherLessonPlannerView,
  }))
);
const TeacherDashboard = lazyWithRetry(() =>
  import('./components/TeacherDashboard').then((m) => ({ default: m.TeacherDashboard }))
);
const CoachingInstituteZoneView = lazyWithRetry(() =>
  import('./components/zones/CoachingInstituteZoneView').then((m) => ({
    default: m.CoachingInstituteZoneView,
  }))
);
const ParentZoneView = lazyWithRetry(() =>
  import('./components/zones/ParentZoneView').then((m) => ({ default: m.ParentZoneView }))
);
const SchoolCollegeZoneView = lazyWithRetry(() =>
  import('./components/zones/SchoolCollegeZoneView').then((m) => ({
    default: m.SchoolCollegeZoneView,
  }))
);
const PortalLandingViews = lazyWithRetry(() =>
  import('./components/portals/PortalLandingViews').then((m) => ({
    default: m.PortalLandingViews,
  }))
);
const AIToolsHubView = lazyWithRetry(() =>
  import('./components/aiTools/AIToolsHubView').then((m) => ({
    default: m.AIToolsHubView,
  }))
);
const DocumentPrintSuiteView = lazyWithRetry(() =>
  import('./components/productivity/DocumentPrintSuiteView').then((m) => ({
    default: m.DocumentPrintSuiteView,
  }))
);
const CoreSkillLabView = lazyWithRetry(() =>
  import('./components/skillPrograms/CoreSkillLabView').then((m) => ({
    default: m.CoreSkillLabView,
  }))
);

const PortalLoadingCard: React.FC<{ onReturnHome?: () => void }> = ({ onReturnHome }) => (
  <SectionLoadingFallback label="Loading study workspace..." onReturnHome={onReturnHome} />
);
import { ClassLevel, EducationBoard, PlanSkuId, PortalRole, SubjectName, QuizLevel, SpecialLearningSectionId } from './types';
import type { AuthModalTab, PortalRegisterRole } from './components/AuthModal';
import type { InstructionMedium } from './types/lessonPlanner';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from './data/navigationConfig';
import type { HomeScrollTarget } from './components/PublicHomeDashboard';
import type { ExplorerZoneType } from './components/PublicZoneExplorerView';
import type { SupportNavigationAction } from './data/helpSupportKnowledgeBase';
import type { GlobalSearchJumpTarget } from './components/StudyLibraryGlobalSearch';
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
import { Trophy, GraduationCap, BookOpen, FileText, Volume2, Activity, Award, Crown, Sparkles, ShieldCheck, ShieldAlert, X, Headphones, Lock, CheckCircle2, RefreshCw, WifiOff, CalendarDays } from 'lucide-react';
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
  'additional-curriculum': 'MY STUDYZONE ADDITIONAL CURRICULUM (10 Subjects · Classes 1–10)',
  'teacher-dashboard': 'Teacher & Educator Command Center (Classes 1–10)',
  'ai-tools': 'Student (30 Tools) & Teacher (40 Tools) AI Workspace',
  'document-studio': 'Document, Image, PDF (19 Tools) & Print Preview Studio',
  'qr-barcode-centre': 'Barcode & QR Generator Centre (15 Tools)',
  'core-skills-lab': 'Vedic Maths, Abacus & Phonics Interactive Lab',
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
  const [activeLandingPortal, setActiveLandingPortal] = useState<Exclude<PortalRole, 'admin'>>('student');
  const [initialCoreSkillProgram, setInitialCoreSkillProgram] = useState<'vedic-maths' | 'abacus' | 'phonics'>('vedic-maths');
  const [quizInitialSubject, setQuizInitialSubject] = useState<SubjectName | undefined>(undefined);
  const [quizInitialLevel, setQuizInitialLevel] = useState<QuizLevel | undefined>(undefined);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<AuthModalTab>('login');
  const [authInitialRegisterRole, setAuthInitialRegisterRole] = useState<PortalRegisterRole>('student');
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
  const [membershipShowAllPlans, setMembershipShowAllPlans] = useState<boolean>(false);

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
  const [activeSubActionId, setActiveSubActionId] = useState<NavSubActionId | null>(null);
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState<boolean>(false);
  const [worksheetsInitialClass, setWorksheetsInitialClass] = useState<ClassLevel | undefined>(undefined);
  const [worksheetsInitialBoard, setWorksheetsInitialBoard] = useState<EducationBoard | undefined>(undefined);
  const [studyInitialClass, setStudyInitialClass] = useState<ClassLevel | undefined>(undefined);
  const [studyInitialBoard, setStudyInitialBoard] = useState<EducationBoard | undefined>(undefined);
  const [studyInitialChapterNumber, setStudyInitialChapterNumber] = useState<number | undefined>(
    undefined
  );
  const [studyInitialSectionTab, setStudyInitialSectionTab] = useState<
    StudyLibrarySectionTab | undefined
  >(undefined);
  const [docStudioInitialTab, setDocStudioInitialTab] = useState<
    'images' | 'pdf_office' | 'print_preview' | 'qr_barcode'
  >('images');
  const [additionalCurriculumContext, setAdditionalCurriculumContext] = useState<{
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: InstructionMedium;
    subjectId?: string;
  } | null>(null);

  const handleGlobalSearchRoute = (target: GlobalSearchJumpTarget) => {
    if (target.board) setStudyInitialBoard(target.board);
    if (target.classLevel) setStudyInitialClass(target.classLevel);
    if (target.subject) setQuizInitialSubject(target.subject);
    setStudyInitialChapterNumber(target.chapterNumber);
    setStudyInitialSectionTab(target.tab as StudyLibrarySectionTab);
    setCurrentTab('study-materials');
    safeScrollToTop();
  };

  const openAdditionalCurriculum = (ctx?: {
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: InstructionMedium;
    subjectId?: string;
  }) => {
    setAdditionalCurriculumContext(ctx || null);
    setCurrentTab('additional-curriculum');
    safeScrollToTop();
  };

  const handleSelectDashboardSection = (sectionId: MainMenuId) => {
    setDashboardMainSection(sectionId);
    if (sectionId === 'study-material') {
      setStudyInitialSectionTab(undefined);
      setCurrentTab('study-materials');
      safeScrollToTop();
      return;
    }
    const wasOnDashboard = currentTab === 'dashboard' || currentTab === 'public-home';
    if (!wasOnDashboard) {
      setCurrentTab('dashboard');
    }
    if (sectionId === 'home') {
      safeScrollToTop();
      return;
    }
    setTimeout(
      () => {
        if (
          !safeScrollToElementById('second-row-subsections', {
            behavior: 'smooth',
            block: 'nearest',
          })
        ) {
          safeScrollToElementById('two-level-horizontal-navigation', {
            behavior: 'smooth',
            block: 'start',
          });
        }
      },
      wasOnDashboard ? 40 : 160
    );
  };

  // Desktop Site / Smart TV / Mobile View preference
  const [viewMode, setViewMode] = useState<'auto' | 'desktop'>(() => {
    if (typeof window !== 'undefined' && isSmartTvOrSingleWindowBrowser()) {
      return 'desktop';
    }
    return 'auto';
  });

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
      if (currentTab === 'public-home' || currentTab === 'portal-landing') {
        setCurrentTab('dashboard');
      }
    }
  }, [currentStudent?.id, activeBoard]);

  useEffect(() => {
    if (activeRole === 'admin' && currentUser?.role === 'admin' && (currentTab === 'public-home' || currentTab === 'explore-zone' || currentTab === 'dashboard' || currentTab === 'portal-landing')) {
      setCurrentTab('admin');
      return;
    }
    if (activeRole === 'parent' && currentUser && (currentTab === 'public-home' || currentTab === 'portal-landing' || currentTab === 'dashboard')) {
      setCurrentTab('parent-zone');
      return;
    }
    if (activeRole === 'school_admin' && currentUser && (currentTab === 'public-home' || currentTab === 'portal-landing' || currentTab === 'dashboard')) {
      setCurrentTab('school-college-zone');
      return;
    }
    if (activeRole === 'institute_admin' && currentUser && (currentTab === 'public-home' || currentTab === 'portal-landing' || currentTab === 'dashboard')) {
      setCurrentTab('coaching-zone');
    }
  }, [activeRole, currentUser?.uid, currentUser?.role]);

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
    } else if (activeRole === 'parent' || currentTab === 'parent-zone') {
      document.title = 'MyStudyZone – Parent & Family Zone (mystudyzone.in)';
    } else if (activeRole === 'school_admin' || currentTab === 'school-college-zone') {
      document.title = 'MyStudyZone – School & College Zone (mystudyzone.in)';
    } else if (activeRole === 'institute_admin' || currentTab === 'coaching-zone') {
      document.title = 'MyStudyZone – Coaching & Skill Institute Zone (mystudyzone.in)';
    } else if (currentStudent?.accountRole === 'teacher' || activeRole === 'teacher') {
      document.title = 'MyStudyZone – Teacher Portal (mystudyzone.in)';
    } else if (currentStudent) {
      document.title = `MyStudyZone – Student Portal • ${activeBoard} ${currentStudent.classLevel}`;
    } else {
      document.title = 'MyStudyZone (mystudyzone.in) – Classes 1 to 10 Online Learning Platform';
    }
  }, [currentTab, activeRole, currentUser?.role, currentStudent?.id, currentStudent?.accountRole, currentStudent?.classLevel, activeBoard]);

  // Warm-cache lightweight modals during idle time (skip on Data Saver / slow 2G / Smart TV browsers)
  useEffect(() => {
    if (isSmartTvOrSingleWindowBrowser()) {
      return;
    }
    const conn = typeof navigator !== 'undefined' ? (navigator as any).connection : undefined;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
      return;
    }

    const idlePrefetch = (factory: () => Promise<any>, delay: number) => {
      const safeRun = () => {
        void factory().catch(() => {});
      };
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        return (window as any).requestIdleCallback(safeRun, { timeout: delay + 2000 });
      }
      return setTimeout(safeRun, delay);
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

  const isAnyModalOpen =
    isResetModalOpen ||
    upgradePrompt.isOpen ||
    isMembershipOpen ||
    isAuthOpen ||
    isAuthModalOpen ||
    isHelpDrawerOpen;

  useSmartTvNavigation({
    currentTab,
    setCurrentTab,
    defaultHomeTab:
      activeRole === 'admin' && currentUser?.role === 'admin' ? 'admin' : 'dashboard',
    isModalOpen: isAnyModalOpen,
    closeTopModal: () => {
      if (isResetModalOpen) {
        setIsResetModalOpen(false);
        return true;
      }
      if (upgradePrompt.isOpen) {
        setUpgradePrompt((prev) => ({ ...prev, isOpen: false }));
        return true;
      }
      if (isMembershipOpen) {
        setIsMembershipOpen(false);
        return true;
      }
      if (isAuthOpen || isAuthModalOpen) {
        setIsAuthOpen(false);
        setIsAuthModalOpen(false);
        return true;
      }
      if (isHelpDrawerOpen) {
        setIsHelpDrawerOpen(false);
        return true;
      }
      return false;
    },
  });

  const openMembershipWithPlan = (
    _plan: 'basic' | 'premium' = 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard,
    planSku: PlanSkuId = 'BOARD_CLASS',
    showAllPlans: boolean = false
  ) => {
    setMembershipInitialPlan('premium');
    setMembershipPlanSku(planSku || 'BOARD_CLASS');
    setMembershipTargetClass(targetClass || currentStudent?.classLevel || publicClass);
    setMembershipTargetBoard(targetBoard || (currentStudent ? activeBoard : publicBoard));
    setMembershipShowAllPlans(showAllPlans);
    setIsMembershipOpen(true);
  };

  const openAuthModalWithTab = (
    defaultTab: AuthModalTab = 'login',
    registerRole: PortalRegisterRole = 'student'
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

    if (tab === 'lesson-planner' && (!isTeacherPortal || !currentStudent)) {
      return;
    }

    if (tab === 'teacher-dashboard' && (!isTeacherPortal || !currentStudent)) {
      openAuthModalWithTab('teacher', 'teacher');
      return;
    }

    const alwaysOpenTabs = new Set([
      'demo', 'demo-mock-tests', 'dashboard', 'dashboard-student-preview', 'public-home', 'portal-landing',
      'explore-zone', 'all-courses', 'other-programs',
      'coaching-zone', 'parent-zone', 'school-college-zone', 'ai-tools', 'document-studio', 'qr-barcode-centre', 'core-skills-lab',
      'scholarship', 'tet-ctet', 'drawing', 'stories', 'shivaji', 'cricket', 'puzzles', 'sudoku',
      'future-skills', 'ai-academy', 'profile', 'account', 'subscription',
      'worksheets', 'study-materials', 'study-material', 'lesson-planner', 'teacher-dashboard', 'additional-curriculum',
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

    startTransition(() => {
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
    });
    safeScrollToTop();
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
    setActiveSubActionId(actionId);
    const isSignedInLearner = Boolean(isLearningPortal && currentStudent);

    switch (actionId) {
      // SECTION 1: HOME DASHBOARD
      case 'home-overview':
      case 'home-how-it-works':
      case 'home-why-choose-us':
      case 'home-portals': {
        setDashboardMainSection('home');
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
      case 'sl-ai-tools': {
        handleNavigateTab('ai-tools');
        return;
      }
      case 'sl-document-studio': {
        setDocStudioInitialTab('images');
        handleNavigateTab('document-studio');
        return;
      }
      case 'sl-qr-barcode': {
        setDocStudioInitialTab('qr_barcode');
        handleNavigateTab('qr-barcode-centre');
        return;
      }
      case 'sl-core-skills-lab': {
        setInitialCoreSkillProgram('vedic-maths');
        handleNavigateTab('core-skills-lab');
        return;
      }
      case 'sl-additional-curriculum': {
        openAdditionalCurriculum({
          board: currentStudent ? activeBoard : publicBoard,
          classLevel: currentStudent?.classLevel || publicClass,
          medium: (currentStudent?.medium as InstructionMedium | undefined) || 'English',
        });
        return;
      }
      case 'sl-creative':
      case 'sl-programs': {
        handleNavigateTab('other-programs');
        return;
      }

      // SECTION 4: STUDY MATERIAL (100% Free Study Material Library for Visitors, Students & Teachers)
      case 'sm-textbook-learning':
      case 'sm-notes':
      case 'sm-textbook-solutions':
      case 'sm-class-notebook':
      case 'sm-summaries':
      case 'sm-question-banks':
      case 'sm-worksheets':
      case 'sm-pdfs':
      case 'sm-guides':
      case 'sm-special-hubs':
      case 'sm-important-questions': {
        if (actionId === 'sm-worksheets') {
          handleNavigateTab('worksheets');
          return;
        }
        const tabMap: Record<string, StudyLibrarySectionTab> = {
          'sm-textbook-learning': 'textbooks',
          'sm-notes': 'chapter_notes',
          'sm-textbook-solutions': 'textbook_solutions',
          'sm-class-notebook': 'class_notebook',
          'sm-summaries': 'short_revision',
          'sm-question-banks': 'qa_bank',
          'sm-important-questions': 'qa_bank',
          'sm-pdfs': 'model_papers',
          'sm-guides': 'chapter_test',
          'sm-special-hubs': 'math_hub',
        };
        setStudyInitialSectionTab(tabMap[actionId] || 'textbooks');
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
      currentTab === 'ai-tools' ||
      currentTab === 'document-studio' ||
      currentTab === 'qr-barcode-centre' ||
      currentTab === 'core-skills-lab' ||
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
        setCurrentTab('teacher-dashboard');
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

  const handleOpenPortalLanding = (portalRole: Exclude<PortalRole, 'admin'>) => {
    // If user is already authenticated in this exact portal, open their existing dashboard directly
    if (portalRole === 'student' && currentStudent && currentStudent.accountRole !== 'teacher') {
      switchRole('student');
      setCurrentTab('dashboard');
      safeScrollToTop();
      return;
    }
    if (portalRole === 'teacher' && currentStudent && currentStudent.accountRole === 'teacher') {
      switchRole('teacher');
      setCurrentTab('dashboard');
      safeScrollToTop();
      return;
    }
    if (portalRole === 'parent' && currentUser && activeRole === 'parent') {
      setCurrentTab('parent-zone');
      safeScrollToTop();
      return;
    }
    if (portalRole === 'school_admin' && currentUser && activeRole === 'school_admin') {
      setCurrentTab('school-college-zone');
      safeScrollToTop();
      return;
    }
    if (portalRole === 'institute_admin' && currentUser && activeRole === 'institute_admin') {
      setCurrentTab('coaching-zone');
      safeScrollToTop();
      return;
    }

    setActiveLandingPortal(portalRole);
    setCurrentTab('portal-landing');
    safeScrollToTop();
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
        onOpenPortalLanding={handleOpenPortalLanding}
        activeLandingPortal={currentTab === 'portal-landing' ? activeLandingPortal : undefined}
        onOpenMembership={(targetClass, targetBoard, showAllPlans) =>
          openMembershipWithPlan('premium', targetClass, targetBoard, 'BOARD_CLASS', Boolean(showAllPlans))
        }
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))
        }
      />

      {/* Live Announcement Ticker across Website, Student Portal & Teacher Portal */}
      {!(activeRole === 'admin' && currentUser?.role === 'admin') && (
        <LiveAnnouncementTicker
          audience={
            !currentStudent
              ? 'website'
              : isTeacherPortal
              ? 'teachers'
              : 'students'
          }
          onActionNavigate={(target) => {
            if (target === 'membership') {
              openMembershipWithPlan('premium', currentStudent?.classLevel || publicClass, activeBoard);
            } else if (target === 'demo') {
              openDemoWithTab('overview');
            } else if (target !== 'none') {
              handleNavigateTab(target);
            }
          }}
        />
      )}

      {/* Main Content Arena */}
      <main
        className={`flex-1 w-full mx-auto pt-4 sm:pt-6 pb-10 ${
          viewMode === 'desktop'
            ? 'max-w-[1840px] px-4 sm:px-6 lg:px-8 2xl:px-10'
            : 'msz-container px-4 sm:px-6 lg:px-8 2xl:px-10'
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

        {/* Public Visitor Return-to-Homepage Bar on Public Subpages */}
        {!currentStudent &&
          !currentUser &&
          currentTab !== 'public-home' &&
          currentTab !== 'dashboard' &&
          currentTab !== 'portal-landing' && (
            <div className="mb-4 rounded-2xl bg-[#07152e] text-white border border-amber-400/50 px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('public-home');
                  safeScrollToTop();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors"
              >
                &larr; Back to MyStudyZone Public Homepage
              </button>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleNavigateTab('study-materials')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                >
                  Study Library
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateTab('ai-tools')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                >
                  AI Tools
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateTab('document-studio')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                >
                  Generators
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModalWithTab('login', 'student')}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold cursor-pointer"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModalWithTab('register', 'student')}
                  className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold cursor-pointer"
                >
                  Register
                </button>
              </div>
            </div>
          )}

        {/* Consistent Sub-Page Two-Level Horizontal Navigation Bar (Authenticated Learning Portals Only) */}
        {Boolean(currentStudent) &&
          isLearningPortal &&
          currentTab !== 'public-home' &&
          currentTab !== 'portal-landing' &&
          currentTab !== 'dashboard' &&
          currentTab !== 'dashboard-student-preview' &&
          currentTab !== 'lesson-planner' && (
          <SubPageConsistencyBar
            activeSectionId={currentTab === 'referrals' ? 'referrals' : getActiveMenuId()}
            activeSubActionId={
              activeSubActionId ||
              (currentTab === 'drawing'
                ? 'sl-drawing'
                : currentTab === 'stories'
                ? 'sl-stories'
                : currentTab === 'shivaji'
                ? 'sl-shivaji'
                : currentTab === 'scholarship'
                ? 'sl-scholarship'
                : currentTab === 'tet-ctet'
                ? 'sl-tet-ctet'
                : currentTab === 'cricket'
                ? 'sl-gk'
                : currentTab === 'future-skills' || currentTab === 'ai-academy'
                ? 'sl-ai-academy'
                : currentTab === 'ai-tools'
                ? 'sl-ai-tools'
                : currentTab === 'document-studio'
                ? 'sl-document-studio'
                : currentTab === 'qr-barcode-centre'
                ? 'sl-qr-barcode'
                : currentTab === 'core-skills-lab'
                ? 'sl-core-skills-lab'
                : currentTab === 'additional-curriculum'
                ? 'sl-additional-curriculum'
                : currentTab === 'other-programs'
                ? 'sl-creative'
                : currentTab === 'worksheets'
                ? 'pz-worksheets'
                : currentTab === 'puzzles'
                ? 'pz-puzzles'
                : currentTab === 'sudoku'
                ? 'pz-sudoku'
                : currentTab === 'study-materials'
                ? 'sm-textbook-learning'
                : currentTab === 'all-courses'
                ? 'course-all'
                : currentTab === 'certificates'
                ? 'perf-certificates'
                : currentTab === 'referrals'
                ? 'acc-referrals'
                : currentTab === 'profile'
                ? 'acc-profile'
                : null)
            }
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
        <AppErrorBoundary
          resetKey={currentTab}
          onResetToHome={() => {
            setHomeScrollTarget('home-overview');
            setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
            safeScrollToTop();
          }}
        >
        <Suspense
          fallback={
            <PortalLoadingCard
              onReturnHome={
                currentTab !== 'dashboard' && currentTab !== 'public-home'
                  ? () => {
                      setHomeScrollTarget('home-overview');
                      setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
                      safeScrollToTop();
                    }
                  : undefined
              }
            />
          }
        >
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
              onOpenMembership={(targetClass, targetBoard, planSku) =>
                openMembershipWithPlan('premium', targetClass, targetBoard, planSku)
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
                  'ai-tools',
                  'document-studio',
                  'qr-barcode-centre',
                  'core-skills-lab',
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
                      textbook_solutions: 'textbook_solutions',
                      class_notebook: 'class_notebook',
                      word_meanings: 'word_meanings',
                      practice_questions: 'practice_questions',
                      'sm-notes': 'chapter_notes',
                      'sm-textbook-solutions': 'textbook_solutions',
                      'sm-class-notebook': 'class_notebook',
                      'sm-summaries': 'short_revision',
                      'sm-question-banks': 'qa_bank',
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
                if (isLearningPortal && currentStudent) {
                  if (tab === 'performance') {
                    handleNavigateTab('dashboard');
                  } else {
                    handleNavigateTab(tab, subject);
                  }
                } else {
                  if (tab === 'quizzes') {
                    setExplorerZone('practice-zone');
                    setExplorerSubFocus(subSection || 'overview');
                    setCurrentTab('explore-zone');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
                    setExplorerSubFocus(subSection || 'overview');
                    setCurrentTab('explore-zone');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    handleNavigateTab('study-materials', subject);
                  }
                }
              }}
              onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab, regRole || 'student')}
              onOpenPanel={handleOpenRolePanel}
              onOpenPortalLanding={handleOpenPortalLanding}
              onOpenMembership={(targetClass, targetBoard) =>
                openMembershipWithPlan('premium', targetClass, targetBoard)
              }
              isAuthenticated={Boolean(currentStudent || currentUser)}
              currentRole={activeRole}
              currentUserName={currentStudent?.name || currentUser?.displayName}
              isDesktopMode={viewMode === 'desktop'}
              onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
              onMenuAction={handleMenuAction}
              onGlobalSearchJump={handleGlobalSearchRoute}
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
              onOpenSubjectPractice={(board, cls, subj, mode, studyTab) => {
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
                  setStudyInitialSectionTab(studyTab || 'textbooks');
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
              onNavigateTab={handleNavigateTab}
              onOpenAdditionalCurriculum={openAdditionalCurriculum}
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
          ) : currentTab === 'portal-landing' ? (
            <PortalLandingViews
              portalRole={activeLandingPortal}
              onSelectPortalRole={(role) => setActiveLandingPortal(role)}
              isSignedInAsThisPortal={Boolean(
                currentUser &&
                  (activeRole === activeLandingPortal ||
                    (activeLandingPortal === 'teacher' && currentStudent?.accountRole === 'teacher') ||
                    (activeLandingPortal === 'student' && currentStudent && currentStudent.accountRole !== 'teacher'))
              )}
              onOpenActiveDashboard={() => {
                if (activeLandingPortal === 'parent') setCurrentTab('parent-zone');
                else if (activeLandingPortal === 'school_admin') setCurrentTab('school-college-zone');
                else if (activeLandingPortal === 'institute_admin') setCurrentTab('coaching-zone');
                else setCurrentTab('dashboard');
                safeScrollToTop();
              }}
              onLoginPortal={(role) => {
                if (role === 'student') openAuthModalWithTab('login', 'student');
                else if (role === 'teacher') openAuthModalWithTab('teacher', 'teacher');
                else if (role === 'parent') openAuthModalWithTab('parent', 'parent');
                else if (role === 'school_admin') openAuthModalWithTab('school_admin', 'school_admin');
                else openAuthModalWithTab('institute_admin', 'institute_admin');
              }}
              onRegisterPortal={(role) => {
                openAuthModalWithTab('register', role);
              }}
              onExploreResources={(targetTab) => handleNavigateTab(targetTab)}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                safeScrollToTop();
              }}
            />
          ) : currentTab === 'ai-tools' ? (
            <AIToolsHubView
              portalMode={
                isTeacherPortal
                  ? 'teacher'
                  : currentStudent
                  ? 'student'
                  : 'all'
              }
              studentContext={{
                board: currentStudent ? activeBoard : publicBoard,
                classLevel: currentStudent?.classLevel || publicClass,
                medium: currentStudent?.medium || 'English',
                name: currentStudent?.name || currentUser?.displayName || undefined,
              }}
              onOpenDocumentStudio={(subTab) => {
                setDocStudioInitialTab(subTab || 'images');
                handleNavigateTab('document-studio');
              }}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                safeScrollToTop();
              }}
            />
          ) : currentTab === 'document-studio' || currentTab === 'qr-barcode-centre' ? (
            <DocumentPrintSuiteView
              initialTab={
                currentTab === 'qr-barcode-centre' ? 'qr_barcode' : docStudioInitialTab
              }
              defaultStudentName={currentStudent?.name || currentUser?.displayName || ''}
              defaultSchoolName={currentStudent?.schoolName || 'MyStudyZone'}
              defaultBoardClass={`${currentStudent ? activeBoard : publicBoard} · ${currentStudent?.classLevel || publicClass}`}
              onOpenAiStudio={() => handleNavigateTab('ai-tools')}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                safeScrollToTop();
              }}
            />
          ) : currentTab === 'core-skills-lab' ? (
            <CoreSkillLabView
              initialProgram={initialCoreSkillProgram}
              userId={currentStudent?.id || currentUser?.uid}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                safeScrollToTop();
              }}
            />
          ) : currentTab === 'coaching-zone' ? (
            <CoachingInstituteZoneView
              userId={currentStudent?.id || currentUser?.uid || 'guest_learner'}
              userName={currentStudent?.name || currentUser?.displayName || 'Learner'}
              initialMode={activeRole === 'institute_admin' ? 'institute' : 'programs'}
              onNavigateTab={(t) => handleNavigateTab(t)}
              onOpenCoreSkillLab={(programId) => {
                setInitialCoreSkillProgram(programId);
                handleNavigateTab('core-skills-lab');
              }}
              onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'login', regRole || 'student')}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'parent-zone' ? (
            <ParentZoneView
              onNavigateTab={(t) => handleNavigateTab(t)}
              onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'parent', regRole || 'parent')}
              onBackHome={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(isLearningPortal && currentStudent ? 'dashboard' : 'public-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'school-college-zone' ? (
            <SchoolCollegeZoneView
              userId={currentStudent?.id || currentUser?.uid || 'guest_admin'}
              userName={currentStudent?.name || currentUser?.displayName || 'Institution Admin'}
              onNavigateTab={(t) => handleNavigateTab(t)}
              onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'school_admin', regRole || 'school_admin')}
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
              onOpenAdditionalCurriculum={openAdditionalCurriculum}
              onNavigateTab={handleNavigateTab}
              onNavigateStudyMaterial={(board, cls, subj, studyTab) => {
                setStudyInitialBoard(board);
                setStudyInitialClass(cls);
                setQuizInitialSubject(subj);
                setStudyInitialSectionTab(studyTab);
                setCurrentTab('study-materials');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentTab === 'study-materials' ? (
            <StudyMaterialsView
              initialBoard={studyInitialBoard || (currentStudent ? activeBoard : publicBoard)}
              initialClass={studyInitialClass || currentStudent?.classLevel || publicClass}
              initialSubject={quizInitialSubject}
              initialChapterNumber={studyInitialChapterNumber}
              initialSectionTab={studyInitialSectionTab}
              onNavigateTab={handleNavigateTab}
              onOpenMembership={(plan, targetClass, targetBoard) =>
                openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)
              }
              onOpenAdditionalCurriculum={openAdditionalCurriculum}
            />
          ) : currentTab === 'additional-curriculum' ? (
            <AdditionalCurriculumView
              initialBoard={
                additionalCurriculumContext?.board ||
                (currentStudent ? activeBoard : publicBoard)
              }
              initialClass={
                additionalCurriculumContext?.classLevel ||
                currentStudent?.classLevel ||
                publicClass
              }
              initialMedium={
                additionalCurriculumContext?.medium ||
                (currentStudent?.medium as InstructionMedium | undefined) ||
                'English'
              }
              initialSubjectId={additionalCurriculumContext?.subjectId}
              portalMode={isTeacherPortal ? 'teacher' : 'student'}
              userId={currentStudent?.id || 'guest-student'}
              userName={currentStudent?.name || (isTeacherPortal ? 'Teacher' : 'Student')}
              onNavigateTab={handleNavigateTab}
              onBack={() => {
                setHomeScrollTarget('home-overview');
                setCurrentTab(currentStudent ? 'dashboard' : 'public-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
                    'coaching-zone',
                    'parent-zone',
                    'school-college-zone',
                    'teacher-dashboard',
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
                    'ai-tools',
                    'document-studio',
                    'qr-barcode-centre',
                    'core-skills-lab',
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
                        textbook_solutions: 'textbook_solutions',
                        class_notebook: 'class_notebook',
                        word_meanings: 'word_meanings',
                        practice_questions: 'practice_questions',
                        'sm-notes': 'chapter_notes',
                        'sm-textbook-solutions': 'textbook_solutions',
                        'sm-class-notebook': 'class_notebook',
                        'sm-summaries': 'short_revision',
                        'sm-question-banks': 'qa_bank',
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
                    setExplorerSubFocus(subSection || 'overview');
                    setCurrentTab('explore-zone');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (tab === 'performance') {
                    setExplorerZone('performance');
                    setExplorerSubFocus(subSection || 'overview');
                    setCurrentTab('explore-zone');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    handleNavigateTab('study-materials', subject);
                  }
                }}
                onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab, regRole || 'student')}
                onOpenPanel={handleOpenRolePanel}
                onOpenPortalLanding={handleOpenPortalLanding}
                onOpenMembership={(targetClass, targetBoard) =>
                  openMembershipWithPlan('premium', targetClass, targetBoard)
                }
                isAuthenticated={false}
                currentRole={activeRole}
                isDesktopMode={viewMode === 'desktop'}
                onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
                onMenuAction={handleMenuAction}
                onGlobalSearchJump={handleGlobalSearchRoute}
                activeMainSection={dashboardMainSection}
                onSelectMainSection={handleSelectDashboardSection}
                activeSubActionId={activeSubActionId || undefined}
              />
            )}

            {/* Isolated Portal Views for Parent, School & College, and Coaching Institute Roles */}
            {activeRole === 'parent' && (
              <ParentZoneView
                onNavigateTab={(t) => handleNavigateTab(t)}
                onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'parent', regRole || 'parent')}
                onBackHome={() => {
                  handleOpenPortalLanding('parent');
                }}
              />
            )}
            {activeRole === 'school_admin' && (
              <SchoolCollegeZoneView
                userId={currentUser?.uid || 'guest_admin'}
                userName={currentUser?.displayName || 'Institution Admin'}
                onNavigateTab={(t) => handleNavigateTab(t)}
                onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'school_admin', regRole || 'school_admin')}
                onBackHome={() => {
                  handleOpenPortalLanding('school_admin');
                }}
              />
            )}
            {activeRole === 'institute_admin' && (
              <CoachingInstituteZoneView
                userId={currentUser?.uid || 'guest_institute'}
                userName={currentUser?.displayName || 'Institute Admin'}
                initialMode="institute"
                onNavigateTab={(t) => handleNavigateTab(t)}
                onOpenCoreSkillLab={(programId) => {
                  setInitialCoreSkillProgram(programId);
                  handleNavigateTab('core-skills-lab');
                }}
                onOpenAuth={(tab, regRole) => openAuthModalWithTab(tab || 'institute_admin', regRole || 'institute_admin')}
                onBackHome={() => {
                  handleOpenPortalLanding('institute_admin');
                }}
              />
            )}

            {/* Authenticated Student Portal & Teacher Portal Content */}
            {isLearningPortal && currentStudent && (
              <>
                {/* Dedicated Teacher Portal Workspace Quick Header (visible on sub-pages, avoiding duplicate Welcome banner on TeacherDashboard) */}
                {isTeacherPortal && currentTab !== 'dashboard' && currentTab !== 'teacher-dashboard' && (
                  <div className="mb-5 rounded-3xl bg-gradient-to-r from-[#0b1930] via-[#0f2447] to-slate-900 text-white p-4 sm:p-5 shadow-lg border border-slate-700/90 space-y-3.5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-extrabold uppercase tracking-wider">
                            <GraduationCap className="w-3.5 h-3.5 text-teal-300" />
                            <span>Teacher Portal &bull; Active: {getBoardShortLabel(activeBoard)} &bull; {currentStudent.classLevel}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>
                              Educator Workspace ({getActivatedBoardClassesList(currentStudent).length} Paid Class{getActivatedBoardClassesList(currentStudent).length === 1 ? '' : 'es'})
                            </span>
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-display font-black text-white">
                          Welcome, {currentStudent.name}!
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard, 'BOARD_CLASS')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-black text-xs cursor-pointer transition-colors"
                        >
                          <Crown className="w-4 h-4 text-amber-300" />
                          <span>{isPremiumActive ? `Class Active (${getBoardShortLabel(activeBoard)} ${currentStudent.classLevel})` : `Unlock Class (₹99)`}</span>
                        </button>
                        {!hasCategoryAccess(currentStudent, 'all_classes') && (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel, activeBoard, 'TET_CTET_COMBO_1Y')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm cursor-pointer transition-all"
                          >
                            <Award className="w-4 h-4" />
                            <span>
                              TET + CTET Combo 1Y (<span className="line-through opacity-75">₹999</span> ₹499)
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Teacher Portal Quick Module Bar */}
                    <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-slate-700/80">
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('dashboard')}
                        className="px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-2xs"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Teacher Command Center</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('lesson-planner')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'lesson-planner' ? 'bg-white text-slate-950' : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600'
                        }`}
                      >
                        <CalendarDays className="w-3.5 h-3.5 text-teal-300" />
                        <span>Lesson Planner</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('study-materials')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'study-materials' ? 'bg-white text-slate-950' : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                        <span>Study Library</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('worksheets')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'worksheets' ? 'bg-white text-slate-950' : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>Worksheets</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('ai-tools')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'ai-tools' ? 'bg-white text-slate-950' : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                        <span>40 AI Tools</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateTab('tet-ctet')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                          currentTab === 'tet-ctet' ? 'bg-white text-slate-950' : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5 text-purple-300" />
                        <span>TET &amp; CTET (200 Mocks)</span>
                      </button>
                      <PWAInstallButton variant="teacher" />
                    </div>
                  </div>
                )}

                {/* Isolated Portal Dashboards: Teachers get TeacherDashboard directly on 'dashboard'; Students get StudentDashboard */}
                {currentTab === 'dashboard' && isTeacherPortal && (
                  <TeacherDashboard
                    onNavigateTab={handleNavigateTab}
                    onGlobalSearchJump={handleGlobalSearchRoute}
                    onOpenAdditionalCurriculum={openAdditionalCurriculum}
                    onSwitchToStudentView={() => {
                      setCurrentTab('dashboard-student-preview');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {currentTab === 'dashboard' && !isTeacherPortal && (
                  <StudentDashboard
                    onNavigateTab={handleNavigateTab}
                    onOpenMembership={(plan, targetClass, targetBoard, planSku) =>
                      openMembershipWithPlan(plan || 'premium', targetClass, targetBoard, planSku)
                    }
                    viewMode={viewMode}
                    onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
                    onMenuAction={handleMenuAction}
                    onGlobalSearchJump={handleGlobalSearchRoute}
                    onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
                    activeMainSection={dashboardMainSection}
                    onSelectMainSection={handleSelectDashboardSection}
                    activeSubActionId={activeSubActionId || undefined}
                    onOpenPanel={handleOpenRolePanel}
                  />
                )}

                {currentTab === 'dashboard-student-preview' && isTeacherPortal && (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-emerald-950 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-semibold">
                        Educator Student-View Preview · Currently viewing as {getBoardShortLabel(activeBoard)} {currentStudent.classLevel}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('dashboard');
                          safeScrollToTop();
                        }}
                        className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer"
                      >
                        Return to Teacher Command Center
                      </button>
                    </div>
                    <StudentDashboard
                      onNavigateTab={handleNavigateTab}
                      onOpenMembership={(plan, targetClass, targetBoard, planSku) =>
                        openMembershipWithPlan(plan || 'premium', targetClass, targetBoard, planSku)
                      }
                      viewMode={viewMode}
                      onToggleViewMode={() => setViewMode((prev) => (prev === 'desktop' ? 'auto' : 'desktop'))}
                      onMenuAction={handleMenuAction}
                      onGlobalSearchJump={handleGlobalSearchRoute}
                      onOpenDemo={(demoTab) => openDemoWithTab(demoTab || 'overview')}
                      activeMainSection={dashboardMainSection}
                      onSelectMainSection={handleSelectDashboardSection}
                      activeSubActionId={activeSubActionId || undefined}
                      onOpenPanel={handleOpenRolePanel}
                    />
                  </div>
                )}

                {currentTab === 'quizzes' && (
                  <SubjectQuizView
                    initialSubject={quizInitialSubject}
                    initialLevel={quizInitialLevel}
                    onOpenMembership={(plan, targetClass, targetBoard) => openMembershipWithPlan(plan || 'premium', targetClass, targetBoard)}
                    onOpenAdditionalCurriculum={openAdditionalCurriculum}
                    onNavigateTab={handleNavigateTab}
                    onNavigateStudyMaterial={(board, cls, subj, studyTab) => {
                      setStudyInitialBoard(board);
                      setStudyInitialClass(cls);
                      setQuizInitialSubject(subj);
                      setStudyInitialSectionTab(studyTab);
                      setCurrentTab('study-materials');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
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

                {currentTab === 'teacher-dashboard' && isTeacherPortal && (
                  <TeacherDashboard
                    onNavigateTab={handleNavigateTab}
                    onGlobalSearchJump={handleGlobalSearchRoute}
                    onOpenAdditionalCurriculum={openAdditionalCurriculum}
                    onSwitchToStudentView={() => {
                      setCurrentTab('dashboard-student-preview');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {currentTab === 'lesson-planner' && isTeacherPortal && (
                  <TeacherLessonPlannerView
                    currentTeacher={currentStudent}
                    initialBoard={activeBoard}
                    initialClass={currentStudent.classLevel}
                    onReturnOverview={() => handleNavigateTab('teacher-dashboard')}
                    onOpenAdditionalCurriculum={openAdditionalCurriculum}
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
        </AppErrorBoundary>
      </main>

      {/* Global Modals (Mounted on-demand inside Suspense so initial page render is ultra-fast) */}
      <Suspense fallback={null}>
        {isMembershipOpen && (
          <MembershipModal
            isOpen={isMembershipOpen}
            onClose={() => {
              setIsMembershipOpen(false);
              setMembershipShowAllPlans(false);
            }}
            initialSelectedPlan={membershipInitialPlan}
            initialPlanSku={membershipPlanSku}
            initialSelectedClass={membershipTargetClass}
            initialSelectedBoard={membershipTargetBoard}
            initialShowAllPlans={membershipShowAllPlans}
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
            onPortalAuthSuccess={(role) => {
              if (role === 'parent') setCurrentTab('parent-zone');
              else if (role === 'school_admin') setCurrentTab('school-college-zone');
              else if (role === 'institute_admin') setCurrentTab('coaching-zone');
              else if (role === 'admin') setCurrentTab('admin');
              else setCurrentTab('dashboard');
              safeScrollToTop();
            }}
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

      {/* Mobile & Installed PWA Native Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        activeRole={activeRole}
        isTeacherPortal={isTeacherPortal}
        isAuthenticated={Boolean(currentStudent || currentUser)}
        viewMode={viewMode}
        onNavigateTab={(t) => handleNavigateTab(t)}
        onOpenAuth={() => openAuthModalWithTab(isTeacherPortal ? 'teacher' : 'login', isTeacherPortal ? 'teacher' : 'student')}
      />

      {/* Professional Education Platform Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-10 pb-8 text-xs">
        <div
          className={`mx-auto space-y-10 ${
            viewMode === 'desktop'
              ? 'max-w-[1840px] w-full px-4 sm:px-6 lg:px-8 2xl:px-10'
              : 'msz-container px-4 sm:px-6 lg:px-8 2xl:px-10'
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

interface AppErrorBoundaryProps {
  children: ReactNode;
  resetKey?: string;
  onResetToHome?: () => void;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  diagnosticMessage: string;
  retryCount: number;
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      diagnosticMessage: '',
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return {
      hasError: true,
      diagnosticMessage: sanitizeDiagnosticErrorMessage(error),
    };
  }

  componentDidUpdate(prevProps: AppErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({
        hasError: false,
        diagnosticMessage: '',
      });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const safeMsg = sanitizeDiagnosticErrorMessage(error);
    const safeStack = sanitizeDiagnosticErrorMessage(info?.componentStack || '');
    console.error('[MyStudyZone ErrorBoundary]:', safeMsg, safeStack);
  }

  private handleTryAgain = () => {
    try {
      sessionStorage.removeItem('msz_chunk_retry_ts');
      sessionStorage.removeItem('msz_preload_recovery_ts');
    } catch {
      // Ignore storage access restrictions on Smart TV WebViews
    }
    this.setState((prev) => ({
      hasError: false,
      diagnosticMessage: '',
      retryCount: prev.retryCount + 1,
    }));
  };

  private handleReturnHome = () => {
    try {
      sessionStorage.removeItem('msz_chunk_retry_ts');
      sessionStorage.removeItem('msz_preload_recovery_ts');
    } catch {
      // Ignore storage access restrictions
    }
    this.setState(
      {
        hasError: false,
        diagnosticMessage: '',
      },
      () => {
        if (this.props.onResetToHome) {
          this.props.onResetToHome();
        } else if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
    );
  };

  private handleReloadPage = () => {
    try {
      sessionStorage.removeItem('msz_chunk_retry_ts');
      sessionStorage.removeItem('msz_preload_recovery_ts');
    } catch {
      // Ignore storage errors
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[60vh] bg-amber-50 flex items-center justify-center p-4"
          style={{
            minHeight: this.props.onResetToHome ? '60vh' : '100vh',
            backgroundColor: '#fffbeb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <div
            className="max-w-lg w-full bg-white rounded-3xl border border-amber-200 shadow-lg p-6 text-center space-y-4"
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #fde68a',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              padding: '28px',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <h1
              className="text-xl font-display font-extrabold text-slate-900"
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 12px 0',
              }}
            >
              MyStudyZone Quick Recovery
            </h1>
            <p
              className="text-sm text-slate-600"
              style={{
                fontSize: '15px',
                lineHeight: 1.55,
                color: '#475569',
                margin: '0 0 16px 0',
              }}
            >
              A temporary network or browser issue interrupted loading this view. Your account, tests, and progress are completely safe.
            </p>
            {this.state.diagnosticMessage && (
              <p
                className="text-xs font-mono text-slate-500 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 break-words"
                style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#64748b',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  margin: '0 0 16px 0',
                  wordBreak: 'break-word',
                }}
              >
                Diagnostic: {this.state.diagnosticMessage}
              </p>
            )}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 justify-center pt-1"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                paddingTop: '4px',
              }}
            >
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm cursor-pointer"
                style={{
                  padding: '11px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              {this.props.onResetToHome && (
                <button
                  type="button"
                  onClick={this.handleReturnHome}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer"
                  style={{
                    padding: '11px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Return to Home Dashboard
                </button>
              )}
              <button
                type="button"
                onClick={this.handleReloadPage}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm cursor-pointer"
                style={{
                  padding: '11px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <React.Fragment key={this.state.retryCount}>{this.props.children}</React.Fragment>;
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
