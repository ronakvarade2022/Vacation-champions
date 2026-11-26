import React, { useEffect, useState } from 'react';
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
    gradient: 'from-sky-500 via-blue-600 to-blue-800 border-sky-300/95 shadow-sky-500/35',
  },
  {
    id: 'portal-card-teachers',
    title: 'Teachers',
    subtitle: 'Plan & Teach',
    role: 'teacher' as const,
    loginTab: 'teacher' as const,
    icon: Users,
    gradient: 'from-violet-500 via-purple-600 to-indigo-900 border-violet-300/95 shadow-purple-500/35',
  },
  {
    id: 'portal-card-parents',
    title: 'Parents',
    subtitle: 'Track Progress',
    role: 'parent' as const,
    loginTab: 'parent' as const,
    icon: HeartHandshake,
    gradient: 'from-emerald-500 via-green-600 to-emerald-900 border-emerald-300/95 shadow-emerald-500/35',
  },
  {
    id: 'portal-card-colleges',
    title: 'Colleges',
    subtitle: 'Manage Academics',
    role: 'school_admin' as const,
    loginTab: 'school_admin' as const,
    icon: Building2,
    gradient: 'from-amber-500 via-orange-500 to-orange-800 border-amber-300/95 shadow-orange-500/35',
  },
  {
    id: 'portal-card-institutes',
    title: 'Institutes',
    subtitle: 'Build Excellence',
    role: 'institute_admin' as const,
    loginTab: 'institute_admin' as const,
    icon: Building,
    gradient: 'from-cyan-500 via-teal-600 to-teal-900 border-cyan-300/95 shadow-cyan-500/35',
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

  // Track physical viewport aspect ratio so we never stretch or zoom-crop the 16:9 artwork
  const [isScreenVertical, setIsScreenVertical] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  });

  const [layoutOrientation, setLayoutOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerHeight > window.innerWidth || window.innerWidth < 768) {
        return 'portrait';
      }
    }
    return 'landscape';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const vertical = window.innerHeight > window.innerWidth;
      setIsScreenVertical(vertical);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const openPortalDestination = (
    portal: 'student' | 'teacher' | 'parent' | 'school_admin' | 'institute_admin'
  ) => {
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
      className="relative w-full min-h-[100dvh] bg-[#041028] text-white flex flex-col justify-between overflow-x-hidden select-none pb-safe-bottom"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* TOP RIGHT CORNER: MOBILE VIEW (PORTRAIT) & DESKTOP VIEW (LANDSCAPE) SWITCHER BUTTONS */}
      <div
        className="fixed right-2.5 sm:right-5 z-40 flex items-center justify-end"
        style={{
          top: 'max(0.625rem, env(safe-area-inset-top, 0px))',
        }}
      >
        <div
          role="group"
          aria-label="Mobile View Portrait and Desktop View Landscape Switcher"
          className="inline-flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-[#06132b]/95 backdrop-blur-md border-2 border-amber-400/85 shadow-2xl"
        >
          <button
            type="button"
            onClick={handleSelectPortraitMobile}
            aria-pressed={isPortrait}
            title="Mobile View (Portrait)"
            className={`min-h-[34px] sm:min-h-[38px] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
              isPortrait
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Mobile View (Portrait)</span>
          </button>

          <button
            type="button"
            onClick={handleSelectLandscapeDesktop}
            aria-pressed={!isPortrait}
            title="Desktop View (Landscape)"
            className={`min-h-[34px] sm:min-h-[38px] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
              !isPortrait
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Desktop View (Landscape)</span>
          </button>
        </div>
      </div>

      {/* =====================================================================================
          1. DESKTOP & LANDSCAPE DISPLAY (Matches Screenshot 1 composition at 100% proportions)
          - When the screen is landscape (laptop, desktop, tablet, or landscape phone):
            Displays the full homepage artwork at its correct 16:9 orientation with the schoolgirl
            & books on the left, MyStudyZone heading + tagline + 5 horizontal portal cards in the
            center, AI robot & sunrise on the right, and "One Platform... Endless Possibilities..."
            at the bottom.
          - When the user is on a vertical phone and taps "Desktop View (Landscape)":
            Displays the complete uncropped 16:9 artwork at the top followed immediately by the
            5 portal cards in ONE horizontal row with readable, clickable Login & Register buttons
            (no tiny unreadable text and no zoomed background).
      ===================================================================================== */}
      {!isPortrait && !isScreenVertical && (
        <div
          className="relative w-full min-h-[100dvh] h-[100dvh] flex flex-col justify-between overflow-hidden"
          style={{
            backgroundImage: `url('/assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Top spacer for the top-right view switcher */}
          <div className="w-full h-12 sm:h-14 shrink-0" />

          {/* CENTER COMPOSITION (Between the schoolgirl on the left 22% and the AI robot on the right 22%) */}
          <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-[18%] lg:px-[21%] pb-[7%]">
            <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:space-y-6">
              {/* MyStudyZone Heading & Taglines */}
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  <span className="text-white">MyStudy</span>
                  <span className="text-amber-400">Zone</span>
                </h1>
                <p className="font-display font-extrabold text-xs sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  Your Complete Learning &amp; Productivity Platform
                </p>
                <p className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-sky-100 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  Study &bull; Teach &bull; Create &bull; Learn with AI
                </p>
                <div className="pt-1">
                  <span className="inline-block px-5 sm:px-7 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-slate-950 font-display font-black text-xs sm:text-sm md:text-base lg:text-lg shadow-xl border border-amber-200">
                    Smart Learning for a Brighter Future
                  </span>
                </div>
              </div>

              {/* FIVE PORTAL CARDS IN ONE HORIZONTAL ROW (Matching Screenshot 1) */}
              <div
                aria-label="Five Main MyStudyZone Education Portals"
                className="w-full grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4 pt-1"
              >
                {FIVE_PORTAL_CARDS.map((card) => {
                  const Icon = card.icon;
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
                      className={`group rounded-2xl sm:rounded-3xl bg-gradient-to-b ${card.gradient} border-2 text-white shadow-2xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99] transition-all p-2 sm:p-3 lg:p-4 flex flex-col items-center justify-between text-center gap-2 sm:gap-2.5 cursor-pointer`}
                    >
                      <div className="w-full flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 rounded-xl sm:rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div>
                          <div className="font-display font-black text-xs sm:text-base lg:text-lg leading-tight text-white drop-shadow-xs">
                            {card.title}
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-white/95 leading-tight mt-0.5">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>

                      {/* Readable & Clickable Login and Register Buttons */}
                      <div
                        className="w-full grid grid-cols-2 gap-1.5 pt-2 border-t border-white/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenAuth(card.loginTab, card.role)}
                          className="py-1 sm:py-1.5 px-1.5 rounded-lg sm:rounded-xl bg-black/35 hover:bg-black/55 text-[10px] sm:text-xs font-extrabold text-white cursor-pointer transition-colors"
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenAuth('register', card.role)}
                          className="py-1 sm:py-1.5 px-1.5 rounded-lg sm:rounded-xl bg-white/25 hover:bg-amber-400 hover:text-slate-950 text-[10px] sm:text-xs font-extrabold text-white cursor-pointer transition-colors"
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
        </div>
      )}

      {/* =====================================================================================
          2. MOBILE & VERTICAL VIEWPORT DISPLAY (Matches Screenshot 1 composition with zero
             zooming, zero cropping, correct aspect ratio, and all 5 portal cards in ONE
             horizontal row with full-size readable text & clickable buttons)
      ===================================================================================== */}
      {(isPortrait || isScreenVertical) && (
        <div className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-gradient-to-b from-[#04122c] via-[#071d42] to-[#05132d]">
          {/* A. COMPLETE UNCROPPED HOMEPAGE ARTWORK BANNER (Correct 16:9 aspect ratio, never zoomed or rotated) */}
          <div className="relative w-full pt-12 sm:pt-14 shrink-0">
            <div className="relative w-full aspect-[16/9] overflow-hidden shadow-2xl border-y border-sky-400/30 bg-[#051533]">
              <img
                src="/assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg"
                alt="MyStudyZone Educational Wallpaper with Student, Books, and AI Tutor"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
              {/* MyStudyZone Logo, Heading & Tagline positioned between the Student (left) and AI Robot (right) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[21%] pb-[9%] text-center pointer-events-none">
                <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-none drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                  <span className="text-white">MyStudy</span>
                  <span className="text-amber-400">Zone</span>
                </h1>
                <p className="font-display font-extrabold text-[11px] sm:text-base md:text-lg text-white mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-snug">
                  Your Complete Learning &amp; Productivity Platform
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-sky-200 mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Study &bull; Teach &bull; Create &bull; Learn with AI
                </p>
                <div className="mt-1.5">
                  <span className="inline-block px-3.5 py-0.5 sm:px-5 sm:py-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-slate-950 font-display font-black text-[10px] sm:text-xs md:text-sm shadow-lg border border-amber-200">
                    Smart Learning for a Brighter Future
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* B. FIVE PORTAL CARDS IN ONE HORIZONTAL ROW (As shown in Screenshot 1)
              - On viewports >= 640px: 5-column horizontal row fitting across the container.
              - On narrower mobile screens (< 640px): 5 cards in one horizontal row with smooth
                horizontal touch scrolling and consistent 152px card width so text, icons, Login
                and Register buttons never shrink and remain 100% readable & clickable!
              - Also includes a compact 2-column quick-tap grid below on narrow portrait phones
                so all 5 portals are immediately visible at a glance without any empty space. */}
          <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-5 flex flex-col justify-center gap-3.5">
            {/* Horizontal Row of All 5 Portal Cards (Matches Screenshot 1 arrangement) */}
            <div className="w-full">
              <div
                aria-label="Five Main MyStudyZone Education Portals Horizontal Row"
                className="w-full flex sm:grid sm:grid-cols-5 gap-3 sm:gap-3.5 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory"
              >
                {FIVE_PORTAL_CARDS.map((card) => {
                  const Icon = card.icon;
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
                      className={`group shrink-0 w-[156px] sm:w-auto snap-center rounded-2xl sm:rounded-3xl bg-gradient-to-b ${card.gradient} border-2 text-white shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-all p-3.5 sm:p-4 flex flex-col items-center justify-between text-center gap-2.5 cursor-pointer`}
                    >
                      <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center shadow-inner">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-display font-black text-base sm:text-lg leading-tight text-white">
                            {card.title}
                          </div>
                          <div className="text-xs font-bold text-white/95 leading-snug mt-0.5">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>

                      <div
                        className="w-full grid grid-cols-2 gap-1.5 pt-2 border-t border-white/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenAuth(card.loginTab, card.role)}
                          className="min-h-[32px] py-1.5 px-2 rounded-xl bg-black/35 hover:bg-black/55 text-xs font-extrabold text-white cursor-pointer transition-colors"
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenAuth('register', card.role)}
                          className="min-h-[32px] py-1.5 px-2 rounded-xl bg-white/25 hover:bg-amber-400 hover:text-slate-950 text-xs font-extrabold text-white cursor-pointer transition-colors"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Quick-Access Portal Strip for Narrow Mobile Portrait Viewports (< 640px)
                Eliminates any empty dark space at the bottom of tall portrait mobile screens
                and ensures all 5 portals + Login/Register are reachable without scrolling */}
            <div className="w-full sm:hidden grid grid-cols-2 gap-2.5">
              {FIVE_PORTAL_CARDS.map((card, idx) => {
                const Icon = card.icon;
                const isLast = idx === FIVE_PORTAL_CARDS.length - 1;
                return (
                  <div
                    key={`${card.id}-compact`}
                    onClick={() => openPortalDestination(card.role)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openPortalDestination(card.role);
                      }
                    }}
                    className={`rounded-2xl bg-gradient-to-r ${card.gradient} border border-white/40 p-2.5 text-white shadow-lg flex items-center justify-between gap-2 cursor-pointer ${
                      isLast ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left min-w-0">
                        <div className="font-display font-black text-xs text-white truncate">
                          {card.title} Portal
                        </div>
                        <div className="text-[10px] font-bold text-white/90 truncate">
                          {card.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-200 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
