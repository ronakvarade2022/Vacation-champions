import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Crown,
  Gift,
  GraduationCap,
  Home,
  Star,
  Target,
  TrendingUp,
  User,
} from 'lucide-react';
import { ClassLevel, EducationBoard } from '../types';
import { MAIN_NAV_MENUS, MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import {
  HeroBoardEmblemIcon,
  SpecialCardIllustration,
} from './DashboardIllustrations';

export type ExtendedSectionId = MainMenuId | 'referrals';

export const SECTION_BADGE_ICONS: Record<
  ExtendedSectionId,
  {
    icon: React.FC<{ className?: string }>;
    badgeBg: string;
    iconColor: string;
    emoji?: string;
  }
> = {
  home: { icon: Home, badgeBg: 'bg-blue-600', iconColor: 'text-white' },
  courses: { icon: BookOpen, badgeBg: 'bg-sky-600', iconColor: 'text-white' },
  'special-learning': { icon: Star, badgeBg: 'bg-amber-500', iconColor: 'text-slate-950' },
  'study-material': { icon: BarChart3, badgeBg: 'bg-orange-500', iconColor: 'text-white' },
  'practice-zone': { icon: Target, badgeBg: 'bg-rose-600', iconColor: 'text-white' },
  'exam-zone': { icon: ClipboardCheck, badgeBg: 'bg-indigo-600', iconColor: 'text-white' },
  performance: { icon: TrendingUp, badgeBg: 'bg-emerald-600', iconColor: 'text-white' },
  plans: { icon: Crown, badgeBg: 'bg-red-500', iconColor: 'text-white' },
  account: { icon: User, badgeBg: 'bg-purple-600', iconColor: 'text-white' },
  referrals: { icon: Gift, badgeBg: 'bg-emerald-600', iconColor: 'text-white', emoji: '🎁' },
};

interface SubPageConsistencyBarProps {
  activeSectionId: ExtendedSectionId;
  activeSubActionId?: NavSubActionId | null;
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectSection: (sectionId: ExtendedSectionId) => void;
  onTriggerSubAction: (actionId: NavSubActionId) => void;
  onNavigateTab: (tab: string) => void;
  onReturnHome: () => void;
}

export const SubPageConsistencyBar: React.FC<SubPageConsistencyBarProps> = ({
  activeSectionId,
  activeSubActionId,
  selectedBoard,
  selectedClass,
  onSelectSection,
  onTriggerSubAction,
  onNavigateTab,
  onReturnHome,
}) => {
  const effectiveMenuId: MainMenuId =
    activeSectionId === 'referrals' ? 'account' : activeSectionId;

  const activeMenu =
    MAIN_NAV_MENUS.find((m) => m.id === effectiveMenuId) || MAIN_NAV_MENUS[0];
  const activeMeta = SECTION_BADGE_ICONS[effectiveMenuId];
  const ActiveIcon = activeMeta.icon;

  // Determine highlighted subsection in Row 2
  const effectiveSubId: NavSubActionId | undefined =
    activeSectionId === 'referrals'
      ? 'acc-referrals'
      : activeSubActionId && activeMenu.items.some((i) => i.id === activeSubActionId)
      ? activeSubActionId
      : activeMenu.items[0]?.id;

  const getSubVisual = (subId: NavSubActionId, menuId: MainMenuId) => {
    if (subId === 'acc-referrals') {
      return { emoji: '🎁', bg: 'from-[#fef08a] to-[#facc15]', border: 'border-amber-500' };
    }
    if (subId === 'course-maharashtra' || subId === 'plan-maharashtra') {
      return { board: 'Maharashtra' as EducationBoard, bg: 'from-[#eff6ff] to-[#bfdbfe]', border: 'border-blue-400' };
    }
    if (subId === 'course-cbse' || subId === 'plan-cbse') {
      return { board: 'CBSE' as EducationBoard, bg: 'from-[#f0fdf4] to-[#bbf7d0]', border: 'border-emerald-400' };
    }
    if (subId === 'course-icse' || subId === 'plan-icse') {
      return { board: 'ICSE' as EducationBoard, bg: 'from-[#fff7ed] to-[#fed7aa]', border: 'border-orange-400' };
    }
    if (subId === 'sl-drawing') {
      return { ill: 'drawing' as const, bg: 'from-[#f3e8ff] to-[#d8b4fe]', border: 'border-purple-300' };
    }
    if (subId === 'sl-stories') {
      return { ill: 'stories' as const, bg: 'from-[#ecfccb] to-[#bef264]', border: 'border-lime-300' };
    }
    if (subId === 'sl-shivaji') {
      return { ill: 'shivaji' as const, bg: 'from-[#fef3c7] to-[#fcd34d]', border: 'border-amber-300' };
    }
    if (subId === 'sl-moral') {
      return { ill: 'moral' as const, bg: 'from-[#ffedd5] to-[#fdba74]', border: 'border-orange-300' };
    }
    if (subId === 'sl-scholarship' || subId === 'ez-mock-tests') {
      return { ill: 'scholarship' as const, bg: 'from-[#dcfce7] to-[#86efac]', border: 'border-emerald-300' };
    }
    if (subId === 'sl-tet-ctet' || subId === 'ez-tet-ctet') {
      return { emoji: '🎓', bg: 'from-[#e0e7ff] to-[#a5b4fc]', border: 'border-indigo-400' };
    }
    if (subId === 'sl-gk') {
      return { ill: 'cricket' as const, bg: 'from-[#e0f2fe] to-[#7dd3fc]', border: 'border-sky-300' };
    }
    if (subId === 'sl-ai-academy') {
      return { ill: 'ai' as const, bg: 'from-[#fae8ff] to-[#e879f9]', border: 'border-fuchsia-300' };
    }
    if (subId === 'pz-puzzles') {
      return { ill: 'puzzles' as const, bg: 'from-[#e0f2fe] to-[#7dd3fc]', border: 'border-sky-300' };
    }
    if (subId === 'pz-sudoku') {
      return { ill: 'sudoku' as const, bg: 'from-[#dcfce7] to-[#86efac]', border: 'border-emerald-300' };
    }
    if (menuId === 'study-material') {
      return { ill: 'english' as const, bg: 'from-[#dcfce7] to-[#86efac]', border: 'border-emerald-300' };
    }
    if (menuId === 'practice-zone') {
      return { ill: 'maths' as const, bg: 'from-[#ecfccb] to-[#bef264]', border: 'border-lime-300' };
    }
    if (menuId === 'exam-zone') {
      return { ill: 'gk' as const, bg: 'from-[#fce7f3] to-[#f9a8d4]', border: 'border-pink-300' };
    }
    if (menuId === 'performance') {
      return { ill: 'memory' as const, bg: 'from-[#e0e7ff] to-[#a5b4fc]', border: 'border-indigo-300' };
    }
    if (menuId === 'plans') {
      return { ill: 'moral' as const, bg: 'from-[#ffedd5] to-[#fdba74]', border: 'border-orange-300' };
    }
    if (menuId === 'account') {
      return { ill: 'writing' as const, bg: 'from-[#f3e8ff] to-[#d8b4fe]', border: 'border-purple-300' };
    }
    return { ill: 'courses' as const, bg: 'from-[#e0f2fe] to-[#bae6fd]', border: 'border-sky-300' };
  };

  return (
    <nav
      aria-label="Two-Level Horizontal Section Navigation"
      className="mb-6 rounded-3xl bg-white border-2 border-sky-200/90 shadow-md overflow-hidden"
    >
      {/* Top Bar: Return to Main Dashboard + Active Class Badge */}
      <div className="px-3.5 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 bg-white">
        <button
          type="button"
          onClick={onReturnHome}
          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0f2952] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1d4ed8] text-white font-display font-black text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Return to Main Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('all-courses')}
          className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-950 font-display font-black text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <GraduationCap className="w-4 h-4 text-amber-800 shrink-0" />
          <span>
            Active Class: {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
          </span>
        </button>
      </div>

      {/* ROW 1: ALL MAIN SECTION TABS — Mobile Vertical Stack · Desktop & Smart TV Horizontal Grid */}
      <div className="bg-slate-50/90 border-b border-sky-200/80">
        <div
          role="tablist"
          aria-label="All Main Sections"
          className="flex flex-col divide-y divide-slate-200/80 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 md:divide-y-0 md:gap-1.5 md:p-2"
        >
          {MAIN_NAV_MENUS.map((m) => {
            const isCurr = m.id === effectiveMenuId;
            const mMeta = SECTION_BADGE_ICONS[m.id];
            const MIcon = mMeta.icon;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isCurr}
                onClick={() => onSelectSection(m.id)}
                className={`w-full min-h-[44px] px-3.5 sm:px-4 md:px-3 py-2.5 md:rounded-2xl text-xs xl:text-[11px] 2xl:text-xs font-display font-black flex items-center justify-between gap-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 ${
                  isCurr
                    ? 'bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white border-l-4 md:border-l-0 md:border-2 border-amber-400 shadow-xs'
                    : 'bg-white hover:bg-sky-50/90 text-[#0f2952] border-l-4 border-l-transparent md:border md:border-slate-200/90'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${mMeta.badgeBg} ${mMeta.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <MIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <span className="truncate uppercase tracking-wide">
                    {m.label.replace('🎓 ', '')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isCurr && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-[9px] uppercase tracking-wider hidden sm:inline-block md:hidden">
                      Selected
                    </span>
                  )}
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isCurr ? 'text-amber-300 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ROW 2: SELECTED SECTION'S SUBSECTIONS — HORIZONTAL BAR (Wraps Cleanly on Desktop & Smart TV) */}
      <div className="px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#e0f2fe]/60 via-[#f0f9ff] to-[#fef9c3]/40 space-y-1.5">
        <div className="flex items-center justify-between gap-2 px-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-5 h-5 rounded-md ${activeMeta.badgeBg} ${activeMeta.iconColor} flex items-center justify-center shadow-2xs shrink-0`}
            >
              <ActiveIcon className="w-3 h-3" />
            </span>
            <h2 className="text-[11px] sm:text-xs font-display font-black uppercase tracking-wider text-[#0f2952]">
              {activeMenu.label.replace('🎓 ', '')} Options ({activeMenu.items.length})
            </h2>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 hidden sm:inline">
            Click any option to open directly
          </span>
        </div>

        <div
          role="tablist"
          aria-label={`${activeMenu.label.replace('🎓 ', '')} Subsections`}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto md:flex-wrap md:overflow-x-visible pb-1 pt-0.5 no-scrollbar"
        >
          {activeMenu.items.map((sub) => {
            const vis = getSubVisual(sub.id, activeMenu.id);
            const isSubActive = effectiveSubId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                role="tab"
                aria-selected={isSubActive}
                onClick={() => onTriggerSubAction(sub.id)}
                className={`shrink-0 whitespace-nowrap min-h-[40px] px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-left border-2 ${
                  isSubActive
                    ? 'bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fcd34d] border-[#0f2952] shadow-xs ring-1 ring-[#0f2952]/20'
                    : 'bg-white hover:bg-sky-50/90 border-sky-200/90 hover:border-sky-300 shadow-2xs'
                }`}
              >
                {vis.emoji ? (
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs">
                    {vis.emoji}
                  </span>
                ) : vis.board ? (
                  <HeroBoardEmblemIcon board={vis.board} className="w-6 h-6 shrink-0" />
                ) : (
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                    <SpecialCardIllustration
                      type={vis.ill || 'courses'}
                      className="w-full h-full drop-shadow-2xs"
                    />
                  </span>
                )}
                <span className="font-display font-black text-xs text-[#0f2952] leading-tight">
                  {sub.label}
                </span>
                {sub.badgeText && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isSubActive
                        ? 'bg-[#0f2952] text-amber-300'
                        : 'bg-sky-100/90 text-[#0f2952]/80'
                    }`}
                  >
                    {sub.badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
