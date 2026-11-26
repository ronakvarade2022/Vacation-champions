import React, { useState } from 'react';
import {
  Building,
  Building2,
  GraduationCap,
  HeartHandshake,
  Monitor,
  Smartphone,
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
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onSetViewMode?: (mode: 'auto' | 'desktop') => void;
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

const FIVE_PORTAL_CARDS = [
  {
    id: 'portal-card-students',
    title: 'Students',
    subtitle: 'Study & Practice',
    role: 'student' as const,
    loginTab: 'login' as const,
    icon: GraduationCap,
    gradient: 'from-sky-500 via-blue-600 to-blue-800 border-sky-300/90 shadow-sky-500/30',
  },
  {
    id: 'portal-card-teachers',
    title: 'Teachers',
    subtitle: 'Plan & Teach',
    role: 'teacher' as const,
    loginTab: 'teacher' as const,
    icon: Users,
    gradient: 'from-violet-500 via-purple-600 to-indigo-900 border-violet-300/90 shadow-purple-500/30',
  },
  {
    id: 'portal-card-parents',
    title: 'Parents',
    subtitle: 'Track Progress',
    role: 'parent' as const,
    loginTab: 'parent' as const,
    icon: HeartHandshake,
    gradient: 'from-emerald-500 via-green-600 to-emerald-900 border-emerald-300/90 shadow-emerald-500/30',
  },
  {
    id: 'portal-card-colleges',
    title: 'Colleges',
    subtitle: 'Manage Academics',
    role: 'school_admin' as const,
    loginTab: 'school_admin' as const,
    icon: Building2,
    gradient: 'from-amber-500 via-orange-500 to-orange-800 border-amber-300/90 shadow-orange-500/30',
  },
  {
    id: 'portal-card-institutes',
    title: 'Institutes',
    subtitle: 'Build Excellence',
    role: 'institute_admin' as const,
    loginTab: 'institute_admin' as const,
    icon: Building,
    gradient: 'from-cyan-500 via-teal-600 to-teal-900 border-cyan-300/90 shadow-cyan-500/30',
  },
];

export const InteractiveWallpaperHero: React.FC<InteractiveWallpaperHeroProps> = ({
  isDesktopMode = false,
  onSetViewMode,
  onToggleViewMode,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
}) => {
  const [portalSelectorMode, setPortalSelectorMode] = useState<'register' | 'login' | null>(null);
  const [layoutOrientation, setLayoutOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (isDesktopMode) return 'landscape';
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'portrait';
    return 'landscape';
  });

  const handleSelectPortraitMobile = () => {
    setLayoutOrientation('portrait');
    if (onSetViewMode) {
      onSetViewMode('auto');
    } else if (isDesktopMode && onToggleViewMode) {
      onToggleViewMode();
    }
  };

  const handleSelectLandscapeDesktop = () => {
    setLayoutOrientation('landscape');
    if (onSetViewMode) {
      onSetViewMode('desktop');
    } else if (!isDesktopMode && onToggleViewMode) {
      onToggleViewMode();
    }
  };

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

  const isPortrait = layoutOrientation === 'portrait';

  return (
    <section
      aria-label="MyStudyZone Full-Screen Public Wallpaper Homepage"
      className="relative w-full min-h-screen h-screen overflow-y-auto overflow-x-hidden bg-[#07152e] text-white flex flex-col justify-between select-none"
    >
      {/* 1. FULL-SCREEN HIGH-RESOLUTION EDUCATIONAL WALLPAPER (Covers 100% of visible screen with zero empty margins) */}
      <div
        className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat pointer-events-none select-none"
        style={{
          backgroundImage: `url('/assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg')`,
        }}
        aria-hidden="true"
      />

      {/* Balanced centre vignette keeping the schoolgirl (left) and AI robot (right) bright and vivid */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none bg-gradient-to-b from-[#061229]/60 via-[#071938]/35 to-[#061229]/75 lg:bg-[radial-gradient(ellipse_at_center,rgba(7,25,56,0.58)_0%,rgba(6,18,41,0.22)_58%,rgba(6,18,41,0.5)_100%)]"
        aria-hidden="true"
      />

      {/* 2. TOP RIGHT CORNER: ONLY MOBILE VIEW (PORTRAIT) & DESKTOP VIEW (LANDSCAPE) BUTTONS */}
      <div className="relative z-20 w-full px-4 sm:px-8 pt-3 sm:pt-5 flex items-center justify-end">
        <div
          role="group"
          aria-label="Mobile View Portrait and Desktop View Landscape Switcher"
          className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#06132b]/90 backdrop-blur-md border-2 border-amber-400/70 shadow-xl"
        >
          <button
            type="button"
            onClick={handleSelectPortraitMobile}
            aria-pressed={isPortrait}
            title="Mobile View (Portrait)"
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
              isPortrait
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>Mobile View (Portrait)</span>
          </button>

          <button
            type="button"
            onClick={handleSelectLandscapeDesktop}
            aria-pressed={!isPortrait}
            title="Desktop View (Landscape)"
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
              !isPortrait
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
            }`}
          >
            <Monitor className="w-4 h-4 shrink-0" />
            <span>Desktop View (Landscape)</span>
          </button>
        </div>
      </div>

      {/* 3. CENTRAL HERO TITLE & WELL-SPACED 5 PORTAL CARDS ACROSS THE SCREEN */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-14 py-4">
        <div
          className={`w-full mx-auto flex flex-col items-center text-center ${
            isPortrait ? 'max-w-[520px] space-y-5' : 'max-w-[1360px] space-y-7 lg:space-y-9'
          }`}
        >
          {/* Main Title & Tagline (Positioned between the schoolgirl on the left and AI robot on the right) */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <h1
              className={`font-display font-black tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] ${
                isPortrait ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-6xl lg:text-7xl'
              }`}
            >
              <span className="text-white">MyStudy</span>
              <span className="text-amber-400">Zone</span>
            </h1>
            <p
              className={`font-display font-extrabold text-white drop-shadow-md ${
                isPortrait ? 'text-sm sm:text-base' : 'text-base sm:text-2xl'
              }`}
            >
              Your Complete Learning &amp; Productivity Platform
            </p>
            <p className="text-xs sm:text-base font-bold text-sky-200 tracking-wide drop-shadow-xs">
              Study &bull; Teach &bull; Create &bull; Learn with AI
            </p>
            <div className="pt-1.5">
              <span
                className={`inline-block rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-slate-950 font-display font-black shadow-lg border border-amber-200 ${
                  isPortrait ? 'px-5 py-1.5 text-xs' : 'px-7 py-2 text-xs sm:text-base'
                }`}
              >
                Smart Learning for a Brighter Future
              </span>
            </div>
          </div>

          {/* 4. FIVE PORTAL CARDS PROPERLY SPACED ACROSS THE DASHBOARD SCREEN (Not crowded together) */}
          <div
            aria-label="Five Main MyStudyZone Education Portals"
            className={
              isPortrait
                ? 'w-full grid grid-cols-2 gap-4 sm:gap-5 pt-1'
                : 'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 lg:gap-7 pt-2'
            }
          >
            {FIVE_PORTAL_CARDS.map((card, idx) => {
              const Icon = card.icon;
              const isLastInPortrait = isPortrait && idx === FIVE_PORTAL_CARDS.length - 1;
              return (
                <div
                  key={card.id}
                  onClick={() => openPortalDestination(card.role)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openPortalDestination(card.role);
                    }
                  }}
                  className={`group rounded-3xl bg-gradient-to-b ${card.gradient} border-2 text-white shadow-2xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                    isPortrait
                      ? `p-4 gap-3 ${isLastInPortrait ? 'col-span-2 max-w-[250px] mx-auto w-full' : ''}`
                      : 'p-4 sm:p-5 gap-3.5'
                  }`}
                >
                  <div className="w-full flex flex-col items-center justify-center text-center gap-2.5">
                    <div
                      className={`rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shadow-inner group-hover:bg-white/25 transition-colors ${
                        isPortrait ? 'w-12 h-12' : 'w-13 h-13 sm:w-14 sm:h-14'
                      }`}
                    >
                      <Icon className={isPortrait ? 'w-6 h-6 text-white' : 'w-6 h-6 sm:w-7 sm:h-7 text-white'} />
                    </div>
                    <div className="space-y-0.5">
                      <div
                        className={`font-display font-black leading-tight text-white ${
                          isPortrait ? 'text-base' : 'text-base sm:text-lg lg:text-xl'
                        }`}
                      >
                        {card.title}
                      </div>
                      <div className="text-xs font-bold text-white/90 leading-snug">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Well-spaced Login & Register buttons inside each Portal Card */}
                  <div
                    className="w-full grid grid-cols-2 gap-2 pt-2.5 border-t border-white/25"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onOpenAuth(card.loginTab, card.role)}
                      className="py-1.5 px-2 rounded-xl bg-black/30 hover:bg-black/50 text-[11px] font-extrabold text-white cursor-pointer transition-colors"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenAuth('register', card.role)}
                      className="py-1.5 px-2 rounded-xl bg-white/20 hover:bg-amber-400 hover:text-slate-950 text-[11px] font-extrabold text-white cursor-pointer transition-colors"
                    >
                      Register
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Tagline over the Wallpaper */}
      <div className="relative z-10 pb-4 sm:pb-6 text-center">
        <p className="font-display font-extrabold text-sm sm:text-xl text-amber-200/95 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          One Platform... Endless Possibilities...
        </p>
      </div>

      {/* FIVE-PORTAL REGISTRATION / LOGIN SELECTOR MODAL */}
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
