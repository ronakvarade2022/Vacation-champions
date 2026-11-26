import React, { useState } from 'react';
import {
  BookOpen,
  Building,
  Building2,
  FileDown,
  GraduationCap,
  HeartHandshake,
  Home,
  LogIn,
  Monitor,
  QrCode,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';

interface InteractiveWallpaperHeroProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  isAuthenticated?: boolean;
  currentRole?: PortalRole;
  currentUserName?: string;
  onNavigateTab: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onGlobalSearchJump?: (target: GlobalSearchJumpTarget) => void;
  onOpenAuth: (defaultTab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenPanel?: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
}

const PORTAL_REGISTRATION_OPTIONS: Array<{
  role: PortalRegisterRole;
  loginTab: AuthModalTab;
  registerTitle: string;
  loginTitle: string;
  portalName: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  gradient: string;
}> = [
  {
    role: 'student',
    loginTab: 'login',
    registerTitle: 'Student Registration',
    loginTitle: 'Student Portal Login',
    portalName: 'Student Portal',
    subtitle: 'Classes 1 to 10 · Maharashtra, CBSE & ICSE Syllabus, Notes, Solutions & Quizzes',
    icon: GraduationCap,
    gradient: 'from-sky-500 to-blue-700 border-sky-300',
  },
  {
    role: 'teacher',
    loginTab: 'teacher',
    registerTitle: 'Teacher Registration',
    loginTitle: 'Teacher Portal Login',
    portalName: 'Teacher Portal',
    subtitle: '130 Classroom Tools, 3-Tab Lesson Planner, Question Papers & TET / CTET Prep',
    icon: Users,
    gradient: 'from-violet-500 to-indigo-800 border-violet-300',
  },
  {
    role: 'parent',
    loginTab: 'parent',
    registerTitle: 'Parent Registration',
    loginTitle: 'Parent Portal Login',
    portalName: 'Parent Portal',
    subtitle: 'Child Progress Tracking, Attendance, Homework Feedback & Parenting Guides',
    icon: HeartHandshake,
    gradient: 'from-emerald-500 to-green-800 border-emerald-300',
  },
  {
    role: 'school_admin',
    loginTab: 'school_admin',
    registerTitle: 'College Registration',
    loginTitle: 'College Portal Login',
    portalName: 'School & College Portal',
    subtitle: 'Campus Academic Management, Divisions, Faculty Rosters, GPA & Report Cards',
    icon: Building2,
    gradient: 'from-amber-500 to-orange-700 border-amber-300',
  },
  {
    role: 'institute_admin',
    loginTab: 'institute_admin',
    registerTitle: 'Institute Registration',
    loginTitle: 'Institute Portal Login',
    portalName: 'Coaching & Skill Institute Portal',
    subtitle: '18 Skill Programs, Abacus & Vedic Maths Batches, Trainers, Fees & Certificates',
    icon: Building,
    gradient: 'from-cyan-500 to-teal-800 border-cyan-300',
  },
];

export const InteractiveWallpaperHero: React.FC<InteractiveWallpaperHeroProps> = ({
  isAuthenticated = false,
  currentUserName,
  onNavigateTab,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
}) => {
  const [portalSelectorMode, setPortalSelectorMode] = useState<'register' | 'login' | null>(null);

  const openPortalDestination = (portal: 'student' | 'teacher' | 'parent' | 'school_admin' | 'institute_admin') => {
    if (onOpenPortalLanding) {
      onOpenPortalLanding(portal);
      return;
    }
    if (portal === 'student') {
      if (onOpenPanel) onOpenPanel('student', 'login');
      else onOpenAuth('login', 'student');
      return;
    }
    if (portal === 'teacher') {
      if (onOpenPanel) onOpenPanel('teacher', 'login');
      else onOpenAuth('teacher', 'teacher');
      return;
    }
    if (portal === 'parent') {
      onOpenAuth('parent', 'parent');
      return;
    }
    if (portal === 'school_admin') {
      onOpenAuth('school_admin', 'school_admin');
      return;
    }
    if (portal === 'institute_admin') {
      onOpenAuth('institute_admin', 'institute_admin');
    }
  };

  return (
    <section
      aria-label="MyStudyZone Public Wallpaper Homepage"
      className="relative rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-[#07152e] text-white"
    >
      {/* 1. HIGH-RESOLUTION CLEAN EDUCATIONAL WALLPAPER (No baked-in non-functional artwork buttons)
             Original uploaded reference: /assets/aistudio/file_00000000d3a08208902716b217bdd208_b7446e2a.png
             Clean decorative wallpaper preserving schoolgirl, books, and AI robot: /assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none"
        style={{
          backgroundImage: `url('/assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg')`,
        }}
        aria-hidden="true"
      />

      {/* Subtle centre readability vignette that keeps the schoolgirl (left) and AI robot (right) vivid & uncovered on desktop */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#061229]/80 via-[#071938]/55 to-[#061229]/85 lg:bg-[radial-gradient(ellipse_at_center,rgba(7,25,56,0.72)_0%,rgba(6,18,41,0.32)_58%,rgba(6,18,41,0.55)_100%)]"
        aria-hidden="true"
      />

      {/* 2. TOP REAL INTERACTIVE NAVIGATION BAR OVER THE WALLPAPER
             Exact required items:
             1. Home | 2. Study Library | 3. AI Tools | 4. Generators | 5. Student Portal | 6. Teacher Portal | 7. Parent Portal | 8. College Portal | 9. Institute Portal | 10. Login | 11. Register */}
      <div className="relative z-20 border-b border-sky-400/25 bg-[#06132b]/85 backdrop-blur-md px-3 sm:px-5 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Brand Logo Button */}
          <button
            type="button"
            onClick={() => onNavigateTab('public-home')}
            aria-label="MyStudyZone Home"
            className="flex items-center gap-2.5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl px-1.5 py-1"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 flex items-center justify-center shadow-md border border-amber-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <div className="font-display font-black text-base sm:text-lg leading-none tracking-tight">
                <span className="text-white">MyStudy</span>
                <span className="text-amber-400">Zone</span>
              </div>
              <span className="block text-[10px] font-bold text-sky-200 tracking-wider mt-0.5">
                Learn &bull; Practice &bull; Excel
              </span>
            </div>
          </button>

          {/* Items 1 to 9: Real Interactive Navigation Links */}
          <nav
            aria-label="Public Homepage Primary Navigation"
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-0.5 no-scrollbar"
          >
            {[
              {
                id: 'hero-nav-home',
                label: 'Home',
                icon: Home,
                active: true,
                onClick: () => onNavigateTab('public-home'),
              },
              {
                id: 'hero-nav-study-library',
                label: 'Study Library',
                icon: BookOpen,
                active: false,
                onClick: () => onNavigateTab('study-materials'),
              },
              {
                id: 'hero-nav-ai-tools',
                label: 'AI Tools',
                icon: Sparkles,
                active: false,
                onClick: () => onNavigateTab('ai-tools'),
              },
              {
                id: 'hero-nav-generators',
                label: 'Generators',
                icon: QrCode,
                active: false,
                onClick: () => onNavigateTab('document-studio'),
              },
              {
                id: 'hero-nav-student-portal',
                label: 'Student Portal',
                icon: GraduationCap,
                active: false,
                onClick: () => openPortalDestination('student'),
              },
              {
                id: 'hero-nav-teacher-portal',
                label: 'Teacher Portal',
                icon: Users,
                active: false,
                onClick: () => openPortalDestination('teacher'),
              },
              {
                id: 'hero-nav-parent-portal',
                label: 'Parent Portal',
                icon: HeartHandshake,
                active: false,
                onClick: () => openPortalDestination('parent'),
              },
              {
                id: 'hero-nav-college-portal',
                label: 'College Portal',
                icon: Building2,
                active: false,
                onClick: () => openPortalDestination('school_admin'),
              },
              {
                id: 'hero-nav-institute-portal',
                label: 'Institute Portal',
                icon: Building,
                active: false,
                onClick: () => openPortalDestination('institute_admin'),
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={`shrink-0 min-h-[36px] px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    item.active
                      ? 'bg-amber-400/20 text-amber-300 border-b-2 border-amber-400'
                      : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-amber-300" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Items 10 & 11: Real Interactive Login & Register Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => onNavigateTab('dashboard')}
                className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-300/60 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="truncate max-w-[140px]">
                  {currentUserName ? `${currentUserName}'s Dashboard` : 'Open My Dashboard'}
                </span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPortalSelectorMode('login')}
                  className="min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0c2249]/90 hover:bg-[#133268] border border-sky-300/60 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-300" />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPortalSelectorMode('register')}
                  className="min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md border border-amber-200"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. CENTRAL HERO CONTENT (Padded on desktop `lg:px-[20%] xl:px-[22%]` so the schoolgirl on the left and AI robot on the right remain 100% uncovered) */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-[20%] xl:px-[22%] pt-7 sm:pt-10 pb-8 sm:pb-11 flex flex-col items-center text-center space-y-6 sm:space-y-7">
        {/* Title & Golden Tagline */}
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
            <span className="text-white">MyStudy</span>
            <span className="text-amber-400">Zone</span>
          </h1>
          <p className="text-sm sm:text-xl font-display font-extrabold text-white drop-shadow-md">
            Your Complete Learning &amp; Productivity Platform
          </p>
          <p className="text-xs sm:text-sm font-bold text-sky-200 tracking-wide">
            Study &bull; Teach &bull; Create &bull; Learn with AI
          </p>
          <div className="pt-1.5">
            <span className="inline-block px-5 sm:px-7 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-slate-950 font-display font-black text-xs sm:text-sm shadow-md border border-amber-200">
              Smart Learning for a Brighter Future
            </span>
          </div>
        </div>

        {/* 4. FIVE REAL INTERACTIVE PORTAL CARDS (Replacing the 5 illustrated square buttons in the artwork) */}
        <div
          aria-label="Five Main MyStudyZone Education Portals"
          className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 pt-1"
        >
          {[
            {
              id: 'portal-card-students',
              title: 'Students',
              subtitle: 'Study & Practice',
              role: 'student' as const,
              loginTab: 'login' as const,
              icon: GraduationCap,
              gradient: 'from-sky-500 via-blue-600 to-blue-800 border-sky-300/80 shadow-sky-500/30',
            },
            {
              id: 'portal-card-teachers',
              title: 'Teachers',
              subtitle: 'Plan & Teach',
              role: 'teacher' as const,
              loginTab: 'teacher' as const,
              icon: Users,
              gradient: 'from-violet-500 via-purple-600 to-indigo-900 border-violet-300/80 shadow-purple-500/30',
            },
            {
              id: 'portal-card-parents',
              title: 'Parents',
              subtitle: 'Track Progress',
              role: 'parent' as const,
              loginTab: 'parent' as const,
              icon: HeartHandshake,
              gradient: 'from-emerald-500 via-green-600 to-emerald-900 border-emerald-300/80 shadow-emerald-500/30',
            },
            {
              id: 'portal-card-colleges',
              title: 'Colleges',
              subtitle: 'Manage Academics',
              role: 'school_admin' as const,
              loginTab: 'school_admin' as const,
              icon: Building2,
              gradient: 'from-amber-500 via-orange-500 to-orange-800 border-amber-300/80 shadow-orange-500/30',
            },
            {
              id: 'portal-card-institutes',
              title: 'Institutes',
              subtitle: 'Build Excellence',
              role: 'institute_admin' as const,
              loginTab: 'institute_admin' as const,
              icon: Building,
              gradient: 'from-cyan-500 via-teal-600 to-teal-900 border-cyan-300/80 shadow-cyan-500/30 col-span-2 sm:col-span-1',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group rounded-2xl bg-gradient-to-b ${card.gradient} border-2 p-2.5 sm:p-3 text-white shadow-lg hover:scale-[1.02] transition-all flex flex-col items-center justify-between text-center gap-2`}
              >
                <button
                  type="button"
                  onClick={() => openPortalDestination(card.role)}
                  className="w-full flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white/25 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-black text-sm sm:text-base leading-tight text-white">
                      {card.title}
                    </div>
                    <div className="text-[11px] font-bold text-white/90 leading-tight mt-0.5">
                      {card.subtitle}
                    </div>
                  </div>
                </button>

                {/* Direct Portal Login / Register Quick Actions inside each Portal Card */}
                <div className="w-full grid grid-cols-2 gap-1 pt-1 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => onOpenAuth(card.loginTab, card.role)}
                    className="py-1 px-1.5 rounded-lg bg-black/25 hover:bg-black/40 text-[10px] font-extrabold text-white cursor-pointer transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('register', card.role)}
                    className="py-1 px-1.5 rounded-lg bg-white/20 hover:bg-amber-400 hover:text-slate-950 text-[10px] font-extrabold text-white cursor-pointer transition-colors"
                  >
                    Register
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. FIVE REAL INTERACTIVE FEATURE PILL BUTTONS (Replacing the dark bottom strip in the artwork) */}
        <div
          aria-label="Platform Capabilities Quick Bar"
          className="w-full max-w-4xl rounded-2xl bg-[#07152e]/90 backdrop-blur-md border border-sky-400/35 px-3 py-2.5 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
        >
          {[
            {
              id: 'feat-pill-ai-tools',
              icon: Sparkles,
              title: '100+ AI Tools',
              subtitle: '& Generators',
              onClick: () => onNavigateTab('ai-tools'),
            },
            {
              id: 'feat-pill-study-library',
              icon: BookOpen,
              title: 'Complete Study',
              subtitle: 'Material Library',
              onClick: () => onNavigateTab('study-materials'),
            },
            {
              id: 'feat-pill-pdf-word-excel',
              icon: FileDown,
              title: 'PDF, Word, Excel',
              subtitle: '& More Formats',
              onClick: () => onNavigateTab('document-studio'),
            },
            {
              id: 'feat-pill-safe-secure',
              icon: ShieldCheck,
              title: 'Safe & Secure',
              subtitle: 'for Everyone',
              onClick: () => (isAuthenticated ? onNavigateTab('dashboard') : setPortalSelectorMode('login')),
            },
            {
              id: 'feat-pill-all-devices',
              icon: Monitor,
              title: 'Works on All Devices',
              subtitle: '(Web, Mobile, TV)',
              onClick: () => onNavigateTab('all-courses'),
            },
          ].map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={pill.onClick}
                className="min-h-[44px] px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-left flex items-center gap-2.5 cursor-pointer transition-colors group"
              >
                <span className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-black text-white leading-tight truncate">
                    {pill.title}
                  </div>
                  <div className="text-[10px] font-bold text-sky-200 leading-tight truncate">
                    {pill.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Script Tagline */}
        <p className="font-display font-extrabold text-sm sm:text-lg text-amber-200/95 tracking-wide drop-shadow-sm pt-1">
          One Platform... Endless Possibilities...
        </p>
      </div>

      {/* STAGE 2 & STAGE 5: FIVE-PORTAL REGISTRATION / LOGIN SELECTOR MODAL */}
      {portalSelectorMode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            portalSelectorMode === 'register'
              ? 'Select Your Portal Registration Type'
              : 'Select Your Portal Login'
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
        >
          <div className="bg-[#081836] border-2 border-amber-400/80 rounded-3xl max-w-2xl w-full p-5 sm:p-7 text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 border-b border-sky-400/25 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Five Independent MyStudyZone Portals</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                  {portalSelectorMode === 'register'
                    ? 'Select Your Portal Registration'
                    : 'Select Your Portal to Sign In'}
                </h2>
                <p className="text-xs sm:text-sm text-sky-200 mt-0.5">
                  {portalSelectorMode === 'register'
                    ? 'Choose your role below to open its dedicated registration form:'
                    : 'Choose your registered portal below to open your dashboard:'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPortalSelectorMode(null)}
                aria-label="Close portal selector"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTAL_REGISTRATION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => {
                      const mode = portalSelectorMode;
                      setPortalSelectorMode(null);
                      if (mode === 'register') {
                        onOpenAuth('register', opt.role);
                      } else {
                        onOpenAuth(opt.loginTab, opt.role);
                      }
                    }}
                    className={`group rounded-2xl bg-gradient-to-br ${opt.gradient} border p-4 text-left hover:scale-[1.01] hover:brightness-110 transition-all cursor-pointer flex items-start gap-3.5 shadow-lg`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-black text-sm sm:text-base text-white">
                          {portalSelectorMode === 'register' ? opt.registerTitle : opt.loginTitle}
                        </span>
                        <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                      <p className="text-[11px] text-white/90 leading-snug mt-1">
                        {opt.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-sky-400/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-sky-200 font-semibold">
                {portalSelectorMode === 'register'
                  ? 'Already have a registered account?'
                  : 'Need to create a new portal account?'}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPortalSelectorMode(portalSelectorMode === 'register' ? 'login' : 'register')
                }
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black cursor-pointer"
              >
                {portalSelectorMode === 'register'
                  ? 'Switch to Portal Login →'
                  : 'Switch to Portal Registration →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
