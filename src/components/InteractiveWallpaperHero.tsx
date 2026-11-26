import React from 'react';
import {
  Building,
  Building2,
  GraduationCap,
  HeartHandshake,
  Monitor,
  Smartphone,
  Users,
  Sparkles,
  BookOpen,
  FileDown,
  ShieldCheck,
} from 'lucide-react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';
import { PWAInstallButton } from './PWAInstallButton';

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

const FIVE_PORTAL_CARDS = [
  {
    id: 'portal-card-students',
    title: 'Students',
    subtitle: 'Study & Practice',
    role: 'student' as const,
    loginTab: 'login' as const,
    icon: GraduationCap,
    glassGradient:
      'from-sky-500/90 via-blue-600/90 to-blue-800/95 border-sky-300/90 shadow-sky-500/30',
  },
  {
    id: 'portal-card-teachers',
    title: 'Teachers',
    subtitle: 'Plan & Teach',
    role: 'teacher' as const,
    loginTab: 'teacher' as const,
    icon: Users,
    glassGradient:
      'from-violet-500/90 via-purple-600/90 to-indigo-900/95 border-violet-300/90 shadow-purple-500/30',
  },
  {
    id: 'portal-card-parents',
    title: 'Parents',
    subtitle: 'Track Progress',
    role: 'parent' as const,
    loginTab: 'parent' as const,
    icon: HeartHandshake,
    glassGradient:
      'from-emerald-500/90 via-green-600/90 to-emerald-900/95 border-emerald-300/90 shadow-emerald-500/30',
  },
  {
    id: 'portal-card-colleges',
    title: 'Colleges',
    subtitle: 'Manage Academics',
    role: 'school_admin' as const,
    loginTab: 'school_admin' as const,
    icon: Building2,
    glassGradient:
      'from-amber-500/90 via-orange-500/90 to-orange-800/95 border-amber-300/90 shadow-orange-500/30',
  },
  {
    id: 'portal-card-institutes',
    title: 'Institutes',
    subtitle: 'Build Excellence',
    role: 'institute_admin' as const,
    loginTab: 'institute_admin' as const,
    icon: Building,
    glassGradient:
      'from-cyan-500/90 via-teal-600/90 to-teal-900/95 border-cyan-300/90 shadow-cyan-500/30',
  },
];

export const InteractiveWallpaperHero: React.FC<InteractiveWallpaperHeroProps> = ({
  isDesktopMode = false,
  onSetViewMode,
  onToggleViewMode,
  onNavigateTab,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
}) => {
  const [layoutOrientation, setLayoutOrientation] = React.useState<'portrait' | 'landscape'>(() => {
    if (isDesktopMode) return 'landscape';
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'portrait';
    }
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
      aria-label="MyStudyZone Public Homepage"
      className="relative w-full bg-[#041028] text-white flex flex-col overflow-x-hidden select-none"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* =====================================================================================
          1 & 2. MAIN MYSTUDYZONE HERO BANNER WITH ALL FIVE PORTAL CARDS INTEGRATED INSIDE
             - Preserves the existing working hero banner image, characters, graphics, and branding.
             - Integrates all 5 Portal Cards (Students, Teachers, Parents, Colleges, Institutes)
               directly into the lower portion of the hero banner as the sole portal cards on the homepage.
      ===================================================================================== */}
      <div
        data-testid="homepage-hero-banner-section"
        className="relative w-full bg-gradient-to-b from-[#04112b] via-[#07214d] to-[#051535] border-b border-sky-400/25 shadow-2xl overflow-hidden"
      >
        {/* Top Bar inside Hero Banner: Mobile View (Portrait) & Desktop View (Landscape) Switcher */}
        <div className="relative z-30 w-full px-3 sm:px-6 pt-2.5 pb-1.5 flex items-center justify-end bg-[#041028]/85 backdrop-blur-sm border-b border-sky-400/15">
          <div
            role="group"
            aria-label="Mobile View Portrait and Desktop View Landscape Switcher"
            className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-[#06132b]/95 border-2 border-amber-400/85 shadow-lg"
          >
            <button
              type="button"
              onClick={handleSelectPortraitMobile}
              aria-pressed={isPortrait}
              title="Mobile View (Portrait)"
              className={`min-h-[32px] sm:min-h-[36px] px-2.5 sm:px-3.5 py-1 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                isPortrait
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-sm'
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
              className={`min-h-[32px] sm:min-h-[36px] px-2.5 sm:px-3.5 py-1 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                !isPortrait
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-100 hover:text-amber-300 hover:bg-white/10'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Desktop View (Landscape)</span>
            </button>
          </div>
        </div>

        {/* Complete Hero Wallpaper Artwork Container (Maintains exact 16:9 aspect ratio with zero crop or zoom) */}
        <div className="relative w-full max-w-[1760px] mx-auto">
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
              src="/assets/aistudio/mystudyzone_hero_wallpaper_clean.jpg"
              alt="MyStudyZone Educational Hero Banner with Student, Books, and AI Tutor"
              className="w-full h-full object-contain block select-none pointer-events-none"
            />

            {/* Main MyStudyZone Title & Tagline (Positioned cleanly in the upper-center sky between the student on left and AI robot on right) */}
            <div className="absolute inset-x-0 top-[5%] sm:top-[6%] lg:top-[7%] flex flex-col items-center justify-start px-[21%] text-center pointer-events-none">
              <h1 className="font-display font-black text-xl xs:text-2xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                <span className="text-white">MyStudy</span>
                <span className="text-amber-400">Zone</span>
              </h1>
              <p className="font-display font-extrabold text-[10px] xs:text-xs sm:text-lg md:text-xl lg:text-2xl text-white mt-0.5 sm:mt-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-snug">
                Your Complete Learning &amp; Productivity Platform
              </p>
              <p className="text-[9px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-sky-100 mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Study &bull; Teach &bull; Create &bull; Learn with AI
              </p>
              <div className="mt-1 sm:mt-2">
                <span className="inline-block px-3 py-0.5 sm:px-6 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 text-slate-950 font-display font-black text-[9px] xs:text-[11px] sm:text-sm md:text-base shadow-xl border border-amber-200">
                  Smart Learning for a Brighter Future
                </span>
              </div>
            </div>

            {/* DESKTOP & TABLET OVERLAY: All 5 Portal Glass Cards directly inside the lower center of the 16:9 banner */}
            <div className="hidden md:flex absolute inset-x-0 bottom-[13%] lg:bottom-[14%] items-center justify-center px-[19%] lg:px-[21%] z-20">
              <div
                aria-label="Five Main MyStudyZone Education Portals Inside Hero Banner"
                className="w-full max-w-[1040px] grid grid-cols-5 gap-2.5 lg:gap-3.5"
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
                      className={`group rounded-2xl lg:rounded-3xl bg-gradient-to-b ${card.glassGradient} backdrop-blur-md border-2 text-white shadow-2xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99] transition-all p-2.5 lg:p-3.5 flex flex-col items-center justify-between text-center gap-2 cursor-pointer`}
                    >
                      <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
                        <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors">
                          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-display font-black text-xs lg:text-base xl:text-lg leading-tight text-white drop-shadow-xs">
                            {card.title}
                          </div>
                          <div className="text-[10px] lg:text-xs font-bold text-white/95 leading-tight mt-0.5">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>

                      <div
                        className="w-full grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenAuth(card.loginTab, card.role)}
                          className="py-1 px-1.5 rounded-lg bg-black/35 hover:bg-black/55 text-[10px] lg:text-[11px] font-extrabold text-white cursor-pointer transition-colors"
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenAuth('register', card.role)}
                          className="py-1 px-1.5 rounded-lg bg-white/25 hover:bg-amber-400 hover:text-slate-950 text-[10px] lg:text-[11px] font-extrabold text-white cursor-pointer transition-colors"
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

          {/* MOBILE & COMPACT VIEWPORT LOWER HERO BANNER DOCK:
              Integrates all 5 colourful glass portal cards directly into the bottom portion of the hero banner */}
          <div className="md:hidden relative z-20 -mt-3 sm:-mt-5 px-2.5 sm:px-4 pb-3.5 pt-2 bg-gradient-to-b from-[#061a3e]/85 via-[#071f4a]/95 to-[#051535] backdrop-blur-md border-t border-sky-300/25">
            <div
              aria-label="Five Main MyStudyZone Education Portals in Hero Banner"
              className={
                isPortrait
                  ? 'w-full grid grid-cols-6 gap-2'
                  : 'w-full grid grid-cols-5 gap-2'
              }
            >
              {FIVE_PORTAL_CARDS.map((card, idx) => {
                const Icon = card.icon;
                const spanClass = isPortrait
                  ? idx < 3
                    ? 'col-span-2'
                    : 'col-span-3'
                  : 'col-span-1';

                return (
                  <div
                    key={`${card.id}-mobile-hero`}
                    onClick={() => openPortalDestination(card.role)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openPortalDestination(card.role);
                      }
                    }}
                    className={`${spanClass} group rounded-2xl bg-gradient-to-b ${card.glassGradient} backdrop-blur-md border-2 text-white shadow-xl active:scale-[0.99] transition-all p-2.5 flex flex-col items-center justify-between text-center gap-2 cursor-pointer`}
                  >
                    <div className="w-full flex flex-col items-center justify-center text-center gap-1">
                      <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/35 flex items-center justify-center shadow-inner">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-display font-black text-xs sm:text-sm leading-tight text-white">
                          {card.title}
                        </div>
                        <div className="text-[10px] font-bold text-white/90 leading-tight mt-0.5">
                          {card.subtitle}
                        </div>
                      </div>
                    </div>

                    <div
                      className="w-full grid grid-cols-2 gap-1 pt-1.5 border-t border-white/25"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onOpenAuth(card.loginTab, card.role)}
                        className="min-h-[28px] py-1 px-1 rounded-lg bg-black/35 hover:bg-black/55 text-[10px] font-extrabold text-white cursor-pointer transition-colors"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenAuth('register', card.role)}
                        className="min-h-[28px] py-1 px-1 rounded-lg bg-white/25 hover:bg-amber-400 hover:text-slate-950 text-[10px] font-extrabold text-white cursor-pointer transition-colors"
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

      {/* =====================================================================================
          3, 4 & 5. BELOW THE HERO BANNER (ZERO DUPLICATE PORTAL CARDS):
             - Section 3: MyStudyZone Mobile App Installation Card
             - Section 4: Interactive Tools & Skill Studios (AI Tools Studio + Vedic / Abacus / Phonics Lab)
             - Section 5: MyStudyZone Platform Features (5 feature highlights)
      ===================================================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* SECTION 3: MyStudyZone Mobile App Installation Card */}
        <PWAInstallButton variant="banner" className="w-full shadow-xl" />

        {/* SECTION 4: Interactive Tools & Skill Studios */}
        <div
          aria-label="Interactive Tools & Skill Studios"
          className="bg-white text-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-amber-200/80 shadow-xl space-y-3.5"
        >
          <div className="space-y-1.5">
            <h2 className="text-base sm:text-lg font-display font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Interactive Tools &amp; Skill Studios</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Access our AI Study &amp; Educator Tools Studio (powered by Gemini when configured) and our hands-on Vedic Maths, Japanese Soroban Abacus &amp; 4-Level Phonics Audio Lab.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onNavigateTab('ai-tools')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors"
            >
              Open 10 AI Tools Studio
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('core-skills-lab')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors"
            >
              Open Vedic / Abacus / Phonics Lab
            </button>
          </div>
        </div>

        {/* SECTION 5: MyStudyZone Platform Features (5 Feature Highlights) */}
        <div
          aria-label="MyStudyZone Platform Features"
          className="w-full rounded-3xl bg-[#07152e] text-white border border-sky-400/35 px-4 py-4 sm:px-5 sm:py-4 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3"
        >
          {[
            {
              id: 'feature-pill-ai-tools',
              icon: Sparkles,
              title: '100+ AI Tools',
              subtitle: '& Generators',
              onClick: () => onNavigateTab('ai-tools'),
            },
            {
              id: 'feature-pill-study-library',
              icon: BookOpen,
              title: 'Complete Study',
              subtitle: 'Material Library',
              onClick: () => onNavigateTab('study-materials'),
            },
            {
              id: 'feature-pill-pdf-word-excel',
              icon: FileDown,
              title: 'PDF, Word, Excel',
              subtitle: '& More Formats',
              onClick: () => onNavigateTab('document-studio'),
            },
            {
              id: 'feature-pill-safe-secure',
              icon: ShieldCheck,
              title: 'Safe & Secure',
              subtitle: 'for Everyone',
              onClick: () => onOpenAuth('login', 'student'),
            },
            {
              id: 'feature-pill-all-devices',
              icon: Monitor,
              title: 'Works on All Devices',
              subtitle: '(Web, Mobile, TV)',
              onClick: () => onNavigateTab('all-courses'),
            },
          ].map((pill) => {
            const PillIcon = pill.icon;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={pill.onClick}
                className="min-h-[52px] px-3 py-2 rounded-2xl hover:bg-white/10 text-left flex items-center gap-3 cursor-pointer transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/45 text-amber-300 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <PillIcon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-black text-white leading-tight">
                    {pill.title}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-sky-200 leading-tight mt-0.5">
                    {pill.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
