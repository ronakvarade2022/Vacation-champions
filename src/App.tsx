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
import { SubjectName, QuizLevel } from './types';
import {
  canAccessFeature,
  canAccessSubject,
  formatStandardOrdinal,
  getStudentPlanInfo,
  getPremiumActivatedBannerMessage
} from './utils/subscriptionAccess';
import { Trophy, GraduationCap, Lock, BookOpen, FileText, Volume2, Activity, Award, Crown } from 'lucide-react';
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
    currentStudent,
    studentsList,
    quickSwitchStudent,
    isAuthModalOpen,
    setIsAuthModalOpen,
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

  const isLearningPortal = activeRole === 'student' || activeRole === 'teacher';
  const isTeacherPortal = activeRole === 'teacher' || currentStudent?.accountRole === 'teacher';

  // Detect Firebase Authentication password reset link (?mode=resetPassword&oobCode=...) and Referral Registration link (/register?ref=STUDY123)
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

  const openMembershipWithPlan = (_plan: 'basic' | 'premium' = 'premium') => {
    setMembershipInitialPlan('premium');
    setIsMembershipOpen(true);
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
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMembership={() => openMembershipWithPlan('premium')}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Live Interactive DEMO Playground (No payment required, isolated state) */}
        {currentTab === 'demo' ? (
          <DemoSectionView onUpgradeClick={() => openMembershipWithPlan('premium')} />
        ) : currentTab === 'referrals' ? (
          <ReferralHubView
            currentUserId={currentStudent?.id || 'guest_ambassador'}
            userName={currentStudent?.name || 'Champion Ambassador'}
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
            {/* Signed Out Gate for Student & Teacher Portals */}
            {isLearningPortal && !currentStudent && (
              <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-amber-300 shadow-xl text-center space-y-6 animate-in zoom-in-95">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-orange-500/20">
                  {activeRole === 'teacher' ? '👩‍🏫' : '🏆'}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    MyStudyZone – An Interactive Learning Platform for Students
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-2">
                    {activeRole === 'teacher' ? 'Welcome to the Teacher Portal!' : 'Welcome to the Student Portal!'}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-amber-800">
                    Learn, Practice, Explore and Achieve Excellence.
                  </p>
                  <p className="text-sm text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
                    Sign in or register a class-wise Student or Teacher account (Standard 1st to Standard 10th) to access all subjects, online worksheets, 4-level quizzes, stories with audio, current affairs, and scholarship tests!
                  </p>
                </div>

                {/* Quick Switch from Available Registered Accounts */}
                {studentsList.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5 text-left">
                    <span className="text-xs font-extrabold text-amber-900 block">
                      Select Registered Student or Teacher Account on this Device:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {studentsList.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => quickSwitchStudent(s.id)}
                          className="p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-100/40 text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                        >
                          <span className="text-2xl">{s.avatar}</span>
                          <div className="overflow-hidden">
                            <p className="font-bold text-xs text-slate-900 truncate">{s.name}</p>
                            <p className="text-[10px] text-amber-800 font-extrabold">
                              {s.accountRole === 'teacher' ? '👩‍🏫 Teacher' : '🎓 Student'} • {s.classLevel} • {s.plan === 'premium' ? '₹99 Premium' : 'Free Plan'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setAuthDefaultTab(activeRole === 'teacher' ? 'teacher' : 'login');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Sign In ({activeRole === 'teacher' ? 'Teacher Portal' : 'Student Portal'})
                  </button>
                  <button
                    onClick={() => {
                      setAuthDefaultTab('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Register New Account
                  </button>
                </div>
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
                            <span>Dedicated Teacher Portal • Standard {formatStandardOrdinal(currentStudent.classLevel)} ({currentStudent.classLevel})</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-bold">
                            <Lock className="w-3 h-3" />
                            <span>One Account = One Active Class ({currentStudent.classLevel} Only)</span>
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
                            onClick={() => openMembershipWithPlan('premium')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                          >
                            <Crown className="w-4 h-4" />
                            <span>Unlock All {currentStudent.classLevel} Worksheets – ₹99</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500 text-white font-black text-xs">
                            <Crown className="w-4 h-4" />
                            <span>₹99 Premium Active ({currentStudent.classLevel})</span>
                          </span>
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
                    onOpenMembership={() => openMembershipWithPlan('premium')}
                  />
                )}

                {currentTab === 'quizzes' && (
                  <SubjectQuizView
                    initialSubject={quizInitialSubject}
                    initialLevel={quizInitialLevel}
                    onOpenMembership={() => openMembershipWithPlan('premium')}
                  />
                )}

                {currentTab === 'worksheets' && (
                  <WorksheetsView
                    initialSubject={quizInitialSubject}
                    onUnlockClick={() => openMembershipWithPlan('premium')}
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
                    onOpenMembership={() => openMembershipWithPlan('premium')}
                    onNavigateTab={(t) => handleNavigateTab(t)}
                  />
                )}
              </>
            )}

            {activeRole === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Global Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        initialSelectedPlan={membershipInitialPlan}
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
          openMembershipWithPlan('premium');
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
