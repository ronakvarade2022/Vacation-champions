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
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectSection: (sectionId: ExtendedSectionId) => void;
  onTriggerSubAction: (actionId: NavSubActionId) => void;
  onNavigateTab: (tab: string) => void;
  onReturnHome: () => void;
}

export const SubPageConsistencyBar: React.FC<SubPageConsistencyBarProps> = ({
  activeSectionId,
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
    <div className="mb-6 rounded-3xl bg-white border-2 border-sky-200/90 shadow-md p-3.5 sm:p-4 space-y-3.5">
      {/* Top Bar: Return to Main Dashboard + Active Class Badge + Main Section Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={onReturnHome}
          className="min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#0f2952] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1d4ed8] text-white font-display font-black text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Return to Main Dashboard</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateTab('all-courses')}
            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-950 font-display font-black text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              Active Class: {getBoardShortLabel(selectedBoard)} &bull; {selectedClass}
            </span>
          </button>
        </div>
      </div>

      {/* Main Section Heading + Horizontal Subsections Directly Underneath */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-xl ${activeMeta.badgeBg} ${activeMeta.iconColor} flex items-center justify-center shadow-2xs shrink-0`}
            >
              <ActiveIcon className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-display font-black text-[#0f2952]">
                {activeMenu.label} — Subsections
              </h2>
            </div>
          </div>

          {/* Main Section Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {MAIN_NAV_MENUS.map((m) => {
              const isCurr = m.id === effectiveMenuId;
              const mMeta = SECTION_BADGE_ICONS[m.id];
              const MIcon = mMeta.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelectSection(m.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-display font-black whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all shrink-0 ${
                    isCurr
                      ? 'bg-[#0f2952] text-white shadow-2xs ring-2 ring-amber-400'
                      : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
                  }`}
                >
                  <MIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{m.label.replace('🎓 ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Row of Subsections Directly Underneath Main Section */}
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-0.5">
          {activeMenu.items.map((sub) => {
            const vis = getSubVisual(sub.id, activeMenu.id);
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onTriggerSubAction(sub.id)}
                className={`min-w-[180px] sm:min-w-[200px] shrink-0 rounded-2xl bg-gradient-to-r ${vis.bg} border-2 ${vis.border} p-2.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 text-left`}
              >
                {vis.emoji ? (
                  <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 text-lg shadow-2xs">
                    {vis.emoji}
                  </span>
                ) : vis.board ? (
                  <HeroBoardEmblemIcon board={vis.board} className="w-10 h-10 shrink-0" />
                ) : (
                  <span className="w-11 h-11 shrink-0 flex items-center justify-center">
                    <SpecialCardIllustration
                      type={vis.ill || 'courses'}
                      className="w-full h-full drop-shadow-xs"
                    />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <span className="block font-display font-black text-xs text-[#0f2952] leading-tight truncate">
                    {sub.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0f2952]/80 mt-0.5">
                    <span>{sub.badgeText || 'Open'}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
