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
  FileText,
  ClipboardCheck,
  Trophy,
  Calculator,
  Volume2,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { NavSubActionId } from '../data/navigationConfig';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';
import { PWAInstallButton } from './PWAInstallButton';

interface InteractiveWallpaperHeroProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard?: (board: EducationBoard) => void;
  onSelectClass?: (cls: ClassLevel) => void;
  isAuthenticated?: boolean;
  currentRole?: PortalRole;
  currentUserName?: string;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onSetViewMode?: (mode: 'auto' | 'desktop') => void;
  onOpenDemo?: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onOpenMembership?: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
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

const ALL_CLASSES: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export const InteractiveWallpaperHero: React.FC<InteractiveWallpaperHeroProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  isDesktopMode = false,
  onSetViewMode,
  onToggleViewMode,
  onOpenDemo,
  onMenuAction,
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

  const handleBoardSelectAndExplore = (board: EducationBoard, actionId: NavSubActionId) => {
    if (onSelectBoard) onSelectBoard(board);
    if (onMenuAction) {
      onMenuAction(actionId);
    } else {
      onNavigateTab('study-materials');
    }
  };

  const handleClassSelectAndOpenLibrary = (cls: ClassLevel) => {
    if (onSelectClass) onSelectClass(cls);
    onNavigateTab('study-materials', 'chapter_notes');
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
          BELOW THE HERO BANNER — COMPLETE HOMEPAGE INFORMATION SECTIONS (ZERO BLANK SPACE)
             - Uses a wide, responsive desktop container (max-w-7xl) with balanced multi-column grids.
             - Includes:
               1. MyStudyZone Mobile App Installation Card
               2. Interactive Tools & Skill Studios (10 AI Tools Studio, Vedic Maths, Soroban Abacus, 4-Level Phonics Audio Lab)
               3. Platform Benefits (100+ AI Tools, Study Library, PDF/Word/Excel, Safe & Secure, Works on Web/Mobile/TV)
               4. Educational Platform Overview (Maharashtra State Board, CBSE Board, ICSE Board, Classes 1–10)
               5. Learning Zones (Study Material, Chapter Notes, Practice Zone, Worksheets, Exam Zone, Mock Tests, Learning Resources)
      ===================================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* 1. MyStudyZone Mobile App Installation Card */}
        <PWAInstallButton variant="banner" className="w-full shadow-xl" />

        {/* 2. Interactive Tools & Skill Studios (Full-Width Card + 4 Direct Studio Launch Cards) */}
        <div
          aria-label="Interactive Tools & Skill Studios"
          className="bg-white text-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-amber-200/85 shadow-xl space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-base sm:text-xl font-display font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Interactive Tools &amp; Skill Studios</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Access our AI Study &amp; Educator Tools Studio (powered by Gemini when configured) and our hands-on Vedic Maths, Japanese Soroban Abacus &amp; 4-Level Phonics Audio Lab.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
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

          {/* 4 Studio Highlights Grid utilizing full desktop and mobile width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'studio-ai-tools',
                title: '10 AI Tools Studio',
                badge: 'AI & Productivity',
                desc: 'Image Resizer, PDF/Word/Excel Document Suite, QR/Barcode Generator, Question Paper & Worksheet Makers.',
                icon: Sparkles,
                accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
                onClick: () => onNavigateTab('ai-tools'),
              },
              {
                id: 'studio-vedic-maths',
                title: 'Vedic Maths Lab',
                badge: 'Speed Calculation',
                desc: '16 Sutras mental calculation drills, high-speed multiplication tricks & step-by-step practice challenges.',
                icon: Calculator,
                accent: 'bg-amber-50 border-amber-200 text-amber-800',
                onClick: () => onNavigateTab('core-skills-lab'),
              },
              {
                id: 'studio-soroban-abacus',
                title: 'Japanese Soroban Abacus',
                badge: 'Interactive Beads',
                desc: 'Hands-on digital Soroban bead frame with Heaven & Earth beads, place-value training & timed speed drills.',
                icon: Layers,
                accent: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                onClick: () => onNavigateTab('core-skills-lab'),
              },
              {
                id: 'studio-phonics-audio',
                title: '4-Level Phonics Audio Lab',
                badge: 'Voice Pronunciation',
                desc: 'Letter sounds, CVC blending, consonant digraphs & long-vowel reading fluency with instant audio speech.',
                icon: Volume2,
                accent: 'bg-sky-50 border-sky-200 text-sky-800',
                onClick: () => onNavigateTab('core-skills-lab'),
              },
            ].map((studio) => {
              const StudioIcon = studio.icon;
              return (
                <button
                  key={studio.id}
                  type="button"
                  onClick={studio.onClick}
                  className="group rounded-2xl bg-slate-50/90 hover:bg-amber-50/60 border border-slate-200/90 hover:border-amber-300 p-3.5 text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${studio.accent}`}>
                        <StudioIcon className="w-4 h-4" />
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[10px] font-extrabold uppercase tracking-wide">
                        {studio.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-sm text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {studio.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {studio.desc}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-xs font-extrabold text-indigo-700">
                    <span>Launch Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. MyStudyZone Platform Benefits (5 Feature Highlights) */}
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

        {/* 4. Educational Platform Overview (Maharashtra State Board, CBSE Board, ICSE Board & Classes 1–10) */}
        <div
          aria-label="Educational Platform Overview"
          className="rounded-3xl bg-[#071938] border border-sky-400/30 p-4 sm:p-6 shadow-xl space-y-5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-sky-400/20 pb-3.5">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Multi-Board School Curriculum (Standards 1st to 10th)</span>
              </span>
              <h2 className="text-base sm:text-xl font-display font-black text-white mt-0.5">
                Educational Platform Overview — Boards &amp; Classes 1–10
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => (onOpenDemo ? onOpenDemo('live-quiz') : onNavigateTab('demo'))}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition-colors"
              >
                Free Interactive Visitor Demo
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('all-courses')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-extrabold text-xs cursor-pointer transition-colors"
              >
                Explore All Courses
              </button>
            </div>
          </div>

          {/* 3 Education Boards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              {
                board: 'Maharashtra' as EducationBoard,
                actionId: 'course-maharashtra' as NavSubActionId,
                title: 'Maharashtra State Board (SSC)',
                badge: 'Balbharati · Classes 1–10',
                desc: 'Complete Marathi, Semi-English & English medium textbook chapters, digest solutions, grammar, worksheets & MSCE Scholarship preparation.',
                gradient: 'from-amber-500/20 to-orange-600/15 border-amber-400/50',
              },
              {
                board: 'CBSE' as EducationBoard,
                actionId: 'course-cbse' as NavSubActionId,
                title: 'CBSE Board (NCERT / NCF-SE)',
                badge: 'NCERT · Classes 1–10',
                desc: 'Chapter-wise NCERT textbook notes, exemplar solutions, competency-based MCQs, case-study worksheets & board mock tests.',
                gradient: 'from-sky-500/20 to-blue-600/15 border-sky-400/50',
              },
              {
                board: 'ICSE' as EducationBoard,
                actionId: 'course-icse' as NavSubActionId,
                title: 'ICSE Board (CISCE Curriculum)',
                badge: 'CISCE · Classes 1–10',
                desc: 'Comprehensive CISCE subject notes, structured analytical answers, Physics/Chemistry/Biology labs, English literature & revision papers.',
                gradient: 'from-emerald-500/20 to-teal-600/15 border-emerald-400/50',
              },
            ].map((item) => {
              const isSelected = selectedBoard === item.board;
              return (
                <div
                  key={item.board}
                  onClick={() => handleBoardSelectAndExplore(item.board, item.actionId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleBoardSelectAndExplore(item.board, item.actionId);
                    }
                  }}
                  className={`group rounded-2xl bg-gradient-to-br ${item.gradient} border p-4 flex flex-col justify-between gap-3 cursor-pointer hover:brightness-110 transition-all ${
                    isSelected ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <GraduationCap className="w-4 h-4 text-sky-200 shrink-0" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-sky-100/90 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-extrabold text-amber-300">
                    <span>Open {item.board} Syllabus &amp; Notes</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Classes 1 to 10 Quick Selector */}
          <div className="rounded-2xl bg-[#05122b] border border-sky-400/25 p-3.5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-sky-200">
                Select Your Standard (Classes 1–10) to Open Study Material, Chapter Notes, Worksheets &amp; Mock Tests:
              </span>
              <span className="text-[11px] font-bold text-amber-300">
                Active: {selectedBoard} Board · {selectedClass}
              </span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {ALL_CLASSES.map((cls) => {
                const isCurrent = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => handleClassSelectAndOpenLibrary(cls)}
                    className={`py-2 px-2 rounded-xl font-display font-black text-xs cursor-pointer transition-all border ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                    }`}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Learning Zones & Academic Facilities (Study Material, Chapter Notes, Practice Zone, Worksheets, Exam Zone, Mock Tests, Learning Resources) */}
        <div
          aria-label="MyStudyZone Learning Zones"
          className="bg-white text-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-sky-200/80 shadow-xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">
                Complete Study, Practice &amp; Examination Ecosystem
              </span>
              <h2 className="text-base sm:text-xl font-display font-black text-slate-900">
                Learning Zones — Study Material, Worksheets &amp; Mock Tests
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('study-materials')}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0f2952] hover:bg-[#163a70] text-white font-black text-xs cursor-pointer transition-colors"
            >
              Open Full Study Library →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                id: 'zone-study-notes',
                title: 'Study Material & Chapter Notes',
                subtitle: 'Textbooks, Solutions & Summaries',
                desc: 'Board textbooks, chapter-wise revision notes, textbook exercise solutions, word meanings, Q&A banks & class notebooks.',
                icon: BookOpen,
                badge: 'Study Zone',
                color: 'bg-sky-50 border-sky-200 text-sky-700',
                onClick: () =>
                  onMenuAction
                    ? onMenuAction('sm-notes')
                    : onNavigateTab('study-materials', 'chapter_notes'),
              },
              {
                id: 'zone-practice-worksheets',
                title: 'Practice Zone & Worksheets',
                subtitle: 'Printable & Interactive Worksheets',
                desc: 'Chapter-wise practice worksheets, daily homework sheets, grammar exercises, math problem sets & step-by-step solutions.',
                icon: FileText,
                badge: 'Practice Zone',
                color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                onClick: () =>
                  onMenuAction
                    ? onMenuAction('pz-worksheets')
                    : onNavigateTab('worksheets'),
              },
              {
                id: 'zone-exam-mock-tests',
                title: 'Exam Zone & Mock Tests',
                subtitle: 'Timed MCQs, Model & PYQ Papers',
                desc: 'Chapter tests, unit tests, previous year question papers (PYQs), full-length board mock exams & instant performance analytics.',
                icon: ClipboardCheck,
                badge: 'Exam Zone',
                color: 'bg-violet-50 border-violet-200 text-violet-700',
                onClick: () =>
                  onMenuAction
                    ? onMenuAction('ez-mock-tests')
                    : onNavigateTab('study-materials', 'model_papers'),
              },
              {
                id: 'zone-learning-resources',
                title: 'Learning Resources & Scholarships',
                subtitle: 'MSCE Scholarship, TET/CTET & Stories',
                desc: 'MSCE Class 5 & 8 Scholarship Hub, Teacher TET/CTET Exam Prep, Story World, Chhatrapati Shivaji Maharaj History & Drawing Studio.',
                icon: Trophy,
                badge: 'Enrichment',
                color: 'bg-amber-50 border-amber-200 text-amber-800',
                onClick: () => onNavigateTab('scholarship'),
              },
            ].map((zone) => {
              const ZoneIcon = zone.icon;
              return (
                <div
                  key={zone.id}
                  onClick={zone.onClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      zone.onClick();
                    }
                  }}
                  className="group rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${zone.color}`}>
                        <ZoneIcon className="w-5 h-5" />
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[10px] font-black uppercase">
                        {zone.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-black text-sm sm:text-base text-slate-900 group-hover:text-[#0f2952]">
                        {zone.title}
                      </h3>
                      <p className="text-[11px] font-bold text-indigo-700 mt-0.5">
                        {zone.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {zone.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-extrabold text-[#0f2952]">
                    <span>Explore {zone.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
