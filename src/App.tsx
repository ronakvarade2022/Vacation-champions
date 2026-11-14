import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { SubjectQuizView } from './components/SubjectQuizView';
import { StoryWorldView } from './components/StoryWorldView';
import { DrawingChampionsView } from './components/DrawingChampionsView';
import { PuzzleChampionsView } from './components/PuzzleChampionsView';
import { AdminDashboard } from './components/AdminDashboard';
import { CertificatesView } from './components/CertificatesView';
import { CricketChampionsView } from './components/CricketChampionsView';
import { ScholarshipChampionsView } from './components/ScholarshipChampionsView';
import { StudentProfileView } from './components/StudentProfileView';
import { ShivajiStoriesView } from './components/ShivajiStoriesView';
import { SudokuView } from './components/SudokuView';
import { FutureSkillsView } from './components/FutureSkillsView';
import { ReferralHubView } from './components/ReferralHubView';
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
import { WorksheetsView } from './components/WorksheetsView';
import { ClassLevel, SubjectName, QuizLevel } from './types';
import {
  canAccessFeature,
  canAccessSubject,
  formatStandardOrdinal,
  getActivatedClassesList,
  getStudentPlanInfo,
  getPremiumActivatedBannerMessage
} from './utils/subscriptionAccess';
import { Trophy, GraduationCap, Lock, BookOpen, FileText, Volume2, Activity, Award, Crown, Sparkles, CheckCircle2, Play, LogIn, UserPlus, ShieldCheck, ShieldAlert, X } from 'lucide-react';
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
    currentUser,
    currentStudent,
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

  const isLearningPortal = activeRole === 'student' || activeRole === 'teacher';
  const isTeacherPortal = activeRole === 'teacher' || currentStudent?.accountRole === 'teacher';

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

  const openMembershipWithPlan = (_plan: 'basic' | 'premium' = 'premium', targetClass?: ClassLevel) => {
    setMembershipInitialPlan('premium');
    setMembershipTargetClass(targetClass || currentStudent?.classLevel);
    setIsMembershipOpen(true);
  };

  const openAuthModalWithTab = (defaultTab: 'login' | 'teacher' | 'register' | 'admin' | 'forgot' = 'login') => {
    setAuthDefaultTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const handleNavigateTab = (tab: string, subjectParam?: SubjectName, levelParam?: QuizLevel) => {
    const alwaysOpenTabs = new Set([
      'demo', 'dashboard', 'profile', 'account', 'subscription', 'worksheets',
      'help-support', 'faqs', 'terms', 'privacy', 'disclaimer',
      'grievance', 'about', 'contact', 'referrals', 'admin'
    ]);

    // Check feature restrictions for students & teachers
    if (isLearningPortal && currentStudent && !alwaysOpenTabs.has(tab)) {
      // 1. If navigating to a specific quiz subject, check subject access first
      if (tab === 'quizzes' && subjectParam) {
        const subjAccess = canAccessSubject(currentStudent, subjectParam);
        if (!subjAccess.allowed) {
          setUpgradePrompt({
            isOpen: true,
            featureTitle: `${subjectParam} Subject & Quizzes`,
            requiredPlan: 'premium',
            reasonMessage:
              subjAccess.reason ||
              `${subjectParam} is locked on the Free Plan. Upgrade to the ₹99 Premium Plan (365 Days / 1 Year) to unlock all subjects for your class!`,
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
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const planInfo = getStudentPlanInfo(currentStudent);
  const isPremiumActive = planInfo.effectivePlan === 'premium' || planInfo.effectivePlan === 'basic';

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigateTab(tab)}
        onOpenAuth={(defaultTab) => openAuthModalWithTab(defaultTab || 'login')}
        onOpenMembership={(targetClass) => openMembershipWithPlan('premium', targetClass)}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
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

        {/* Live Interactive Visitor DEMO Playground (All Classes 1st–10th preview, zero DB writes) */}
        {currentTab === 'demo' ? (
          <DemoSectionView
            onUpgradeClick={() => openMembershipWithPlan('premium')}
            onRegisterClick={() => openAuthModalWithTab('register')}
            onSignInClick={() => openAuthModalWithTab('login')}
            isAuthenticated={Boolean(currentStudent)}
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
            {/* Signed-Out Public Welcome Screen (Explore Demo + Sign In + Register) */}
            {isLearningPortal && !currentStudent && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 text-white p-7 sm:p-10 shadow-2xl border border-amber-400/20">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-300 text-xs font-black uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Standards 1st to 10th • Maharashtra State Board Aligned</span>
                      </span>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-tight tracking-tight">
                        MyStudyZone
                        <span className="block text-amber-300 text-xl sm:text-2xl font-extrabold mt-1">
                          Learn, Practice, Explore and Achieve Excellence.
                        </span>
                      </h1>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                        Explore interactive quizzes across every subject, chapter-wise online worksheets, 95 English &amp; Marathi audio stories, Sudoku, brain riddles, Drawing Studio, Cricket quizzes, and MSCE Scholarship preparation — all before you decide to register or subscribe.
                      </p>

                      {/* Primary Visitor Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleNavigateTab('demo')}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Explore Demo (Classes 1st–10th)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openAuthModalWithTab('register')}
                          className="px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <UserPlus className="w-4 h-4 text-indigo-700" />
                          <span>Register Free Account</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openAuthModalWithTab(activeRole === 'teacher' ? 'teacher' : 'login')}
                          className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Sign In ({activeRole === 'teacher' ? 'Teacher' : 'Student'})</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Quick Overview Card */}
                    <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                          What You Can Try in Demo Mode
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[10px] font-black">
                          100% Free Preview
                        </span>
                      </div>
                      <ul className="space-y-2.5 text-xs text-slate-100 font-semibold">
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Switch &amp; preview any class from Standard 1st to 10th</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Try live English &amp; Mathematics sample worksheets</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Play 4-Level quizzes, 4×4 Sudoku &amp; Brain Riddles</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Listen to English &amp; Marathi stories with speed control</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Preview Dashboard &amp; Student Progress Analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Two Simple Membership Plans Overview */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                        Free Plan • Lifetime
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900">₹0</span>
                        <span className="text-xs font-bold text-emerald-700">/ Forever</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Every registered Student &amp; Teacher gets lifetime access to 2 Demo Worksheets (English &amp; Mathematics for their selected class), English &amp; Mathematics 4-level quizzes, Brain Puzzles, and Sudoku.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAuthModalWithTab('register')}
                      className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer transition-all"
                    >
                      Create Free Account
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 border-2 border-amber-400 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                        Premium Plan • 365 Days (1 Year)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-amber-700">₹99</span>
                        <span className="text-xs font-bold text-slate-600">/ 365 Days from verified purchase</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        Unlocks all worksheets &amp; subjects for your registered class, 45 Story World + 50 Shivaji Maharaj audio stories, Drawing Studio, Cricket Quizzes, MSCE Scholarship Prep, AI Skills Academy, Certificates &amp; ₹5 Referral Wallet.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigateTab('demo')}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs cursor-pointer shadow-xs transition-all"
                    >
                      Try Live Demo Before Subscribing →
                    </button>
                  </div>
                </section>
              </div>
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
                            <span>Dedicated Teacher Portal • Active: Standard {formatStandardOrdinal(currentStudent.classLevel)} ({currentStudent.classLevel})</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>
                              Multi-Class Ready ({getActivatedClassesList(currentStudent).length} Paid Class{getActivatedClassesList(currentStudent).length === 1 ? '' : 'es'})
                            </span>
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-display font-black">
                          Welcome, {currentStudent.name}! (Standard {formatStandardOrdinal(currentStudent.classLevel)} Educator Hub)
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                          {isPremiumActive
                            ? getPremiumActivatedBannerMessage(currentStudent.classLevel)
                            : `Complete access to Standard ${formatStandardOrdinal(currentStudent.classLevel)} curriculum: Subjects, Class-Wise Worksheets (2 Free Demos / ₹99 All Unlocked), 4-Level Quizzes, Audio Stories, Daily & Cricket Current Affairs, Scholarship Practice, and Model Solutions.`}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {!isPremiumActive ? (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium', currentStudent.classLevel)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                          >
                            <Crown className="w-4 h-4" />
                            <span>Unlock All {currentStudent.classLevel} Worksheets – ₹99</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openMembershipWithPlan('premium')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer transition-colors"
                          >
                            <Crown className="w-4 h-4" />
                            <span>₹99 Active ({currentStudent.classLevel}) • Add Class</span>
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
                        <span>{currentStudent.classLevel} Subjects &amp; Overview</span>
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
                    onOpenMembership={(plan, targetClass) => openMembershipWithPlan(plan || 'premium', targetClass)}
                  />
                )}

                {currentTab === 'quizzes' && (
                  <SubjectQuizView
                    initialSubject={quizInitialSubject}
                    initialLevel={quizInitialLevel}
                    onOpenMembership={(plan, targetClass) => openMembershipWithPlan(plan || 'premium', targetClass)}
                  />
                )}

                {currentTab === 'worksheets' && (
                  <WorksheetsView
                    initialSubject={quizInitialSubject}
                    onUnlockClick={(targetClass) => openMembershipWithPlan('premium', targetClass)}
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
                    onOpenMembership={(plan, targetClass) => openMembershipWithPlan(plan || 'premium', targetClass)}
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
      </main>

      {/* Global Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        initialSelectedPlan={membershipInitialPlan}
        initialSelectedClass={membershipTargetClass}
        onRequestAuth={(defaultTab) => openAuthModalWithTab(defaultTab || 'login')}
      />

      <PlanUpgradePromptModal
        isOpen={upgradePrompt.isOpen}
        onClose={() => setUpgradePrompt((prev) => ({ ...prev, isOpen: false }))}
        currentStudent={currentStudent}
        featureTitle={upgradePrompt.featureTitle}
        requiredPlan={upgradePrompt.requiredPlan}
        upgradeMessage={upgradePrompt.reasonMessage}
        onSelectUpgradePlan={() => {
          setUpgradePrompt((prev) => ({ ...prev, isOpen: false }));
          openMembershipWithPlan('premium', currentStudent?.classLevel);
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
        onExistingAccountProceedToSubscription={(targetClass) => {
          openMembershipWithPlan('premium', targetClass);
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

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 font-display font-bold text-amber-900 text-sm">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>MyStudyZone – An Interactive Learning Platform for Students</span>
          </div>
          <p className="text-amber-800 font-bold text-xs">
            Learn, Practice, Explore and Achieve Excellence.
          </p>
          <p className="text-slate-600 text-xs">
            Interactive learning platform for Classes 1st to 10th • All Subjects • 4 Quiz Levels • Online Worksheets • Scholarship Prep • 45 Audio Stories • Drawing &amp; Cricket Quizzes.
          </p>

          {/* Quick Informational & Compliance Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-2 text-[11px] text-slate-600 font-bold border-t border-slate-100">
            <button type="button" onClick={() => handleNavigateTab('about')} className="hover:text-amber-800 cursor-pointer">About Us</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('contact')} className="hover:text-amber-800 cursor-pointer">Contact Us</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('help-support')} className="hover:text-amber-800 cursor-pointer">Help &amp; Support</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('faqs')} className="hover:text-amber-800 cursor-pointer">FAQs</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('grievance')} className="hover:text-amber-800 cursor-pointer">Grievance Redressal</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('terms')} className="hover:text-amber-800 cursor-pointer">Terms &amp; Conditions</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('privacy')} className="hover:text-amber-800 cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('refund')} className="hover:text-amber-800 cursor-pointer">Refund Policy</button>
            <span>•</span>
            <button type="button" onClick={() => handleNavigateTab('disclaimer')} className="hover:text-amber-800 cursor-pointer">Educational Disclaimer</button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] text-slate-400 font-medium">
            <span>FREE PLAN – ₹0 – Lifetime</span>
            <span>•</span>
            <span>PREMIUM PLAN – ₹99 – 365 Days (1 Year)</span>
            <span>•</span>
            <span>English &amp; Marathi Female Story Voices</span>
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
