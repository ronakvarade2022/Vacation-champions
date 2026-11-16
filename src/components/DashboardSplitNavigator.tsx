import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Crown,
  Gift,
  GraduationCap,
  Headphones,
  Home,
  Star,
  Target,
  TrendingUp,
  Trophy,
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

export interface SectionIconCardItem {
  id: string;
  label: string;
  subtitle: string;
  badgeText?: string;
  illustrationType?:
    | 'drawing'
    | 'stories'
    | 'shivaji'
    | 'puzzles'
    | 'sudoku'
    | 'cricket'
    | 'ai'
    | 'scholarship'
    | 'courses'
    | 'maths'
    | 'english'
    | 'gk'
    | 'memory'
    | 'moral'
    | 'writing';
  boardEmblem?: EducationBoard;
  lucideIcon?: React.FC<{ className?: string }>;
  emojiIcon?: string;
  cardGradient: string;
  borderClass: string;
  iconBg?: string;
  onClick: () => void;
}

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
  onNavigateTab,
  onReturnHome,
}) => {
  const orderedSections: Array<{
    id: ExtendedSectionId;
    label: string;
    onClick: () => void;
  }> = [
    ...MAIN_NAV_MENUS.map((m) => ({
      id: m.id as ExtendedSectionId,
      label: m.label,
      onClick: () => onSelectSection(m.id),
    })),
    {
      id: 'referrals',
      label: '🎁 Refer & Earn',
      onClick: () => onNavigateTab('referrals'),
    },
  ];

  const horizontalQuickIcons: SectionIconCardItem[] = [
    {
      id: 'quick-home',
      label: 'Home',
      subtitle: 'Main Dashboard',
      lucideIcon: Home,
      iconBg: 'bg-blue-600 text-white',
      cardGradient: 'from-[#e0f2fe] to-[#bae6fd]',
      borderClass: 'border-sky-300',
      onClick: onReturnHome,
    },
    {
      id: 'quick-courses',
      label: 'Courses (Classes 1–10)',
      subtitle: `${getBoardShortLabel(selectedBoard)} · ${selectedClass}`,
      illustrationType: 'courses',
      cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8]',
      borderClass: 'border-[#0284c7]/40',
      onClick: () => onNavigateTab('all-courses'),
    },
    {
      id: 'quick-drawing',
      label: 'Drawing Studio',
      subtitle: '120+ Templates',
      illustrationType: 'drawing',
      cardGradient: 'from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]',
      borderClass: 'border-[#9333ea]/40',
      onClick: () => onNavigateTab('drawing'),
    },
    {
      id: 'quick-stories',
      label: 'Story World',
      subtitle: '45+ Audio Stories',
      illustrationType: 'stories',
      cardGradient: 'from-[#d9f99d] via-[#a3e635] to-[#84cc16]',
      borderClass: 'border-[#4d7c0f]/40',
      onClick: () => onNavigateTab('stories'),
    },
    {
      id: 'quick-shivaji',
      label: 'Shivaji Stories',
      subtitle: '50 Chapters',
      illustrationType: 'shivaji',
      cardGradient: 'from-[#fde68a] via-[#fcd34d] to-[#f59e0b]',
      borderClass: 'border-[#d97706]/40',
      onClick: () => onNavigateTab('shivaji'),
    },
    {
      id: 'quick-scholarship',
      label: 'Scholarship Corner',
      subtitle: 'Std 4th & 7th',
      illustrationType: 'scholarship',
      cardGradient: 'from-[#d9f99d] via-[#bef264] to-[#86efac]',
      borderClass: 'border-[#15803d]/40',
      onClick: () => onNavigateTab('scholarship'),
    },
    {
      id: 'quick-puzzles',
      label: 'Brain Puzzles',
      subtitle: '52+ Logic Riddles',
      illustrationType: 'puzzles',
      cardGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]',
      borderClass: 'border-[#2563eb]/40',
      onClick: () => onNavigateTab('puzzles'),
    },
    {
      id: 'quick-sudoku',
      label: 'Sudoku Game',
      subtitle: '4×4, 6×6 & 9×9',
      illustrationType: 'sudoku',
      cardGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      borderClass: 'border-[#16a34a]/40',
      onClick: () => onNavigateTab('sudoku'),
    },
    {
      id: 'quick-cricket',
      label: 'Cricket & GK',
      subtitle: 'Daily GK Arena',
      illustrationType: 'cricket',
      cardGradient: 'from-[#bfdbfe] via-[#93c5fd] to-[#60a5fa]',
      borderClass: 'border-[#1d4ed8]/40',
      onClick: () => onNavigateTab('cricket'),
    },
    {
      id: 'quick-ai',
      label: 'AI Learning Academy',
      subtitle: '8 Modules · 24 Lessons',
      illustrationType: 'ai',
      cardGradient: 'from-[#f5d0fe] via-[#e879f9] to-[#c084fc]',
      borderClass: 'border-[#9333ea]/40',
      onClick: () => onNavigateTab('future-skills'),
    },
    {
      id: 'quick-referrals',
      label: 'Refer & Earn',
      subtitle: '₹5 Cashback Hub',
      emojiIcon: '🎁',
      iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white',
      cardGradient: 'from-[#fef08a] via-[#fde047] to-[#facc15]',
      borderClass: 'border-amber-500',
      onClick: () => onNavigateTab('referrals'),
    },
  ];

  return (
    <div className="mb-6 rounded-3xl bg-white border-2 border-sky-200/90 shadow-md p-3.5 sm:p-4 space-y-3.5">
      {/* Top Bar: Return to Main Dashboard + Active Class Badge */}
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

      {/* Split Navigation Strip: Left Section Selector + Right Horizontal Icons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left-Side Vertical Section List */}
        <div className="lg:col-span-4 xl:col-span-3 bg-slate-50/90 rounded-2xl p-2.5 border border-slate-200/90 max-h-56 overflow-y-auto space-y-1.5">
          <div className="px-2 py-1 text-[10px] font-display font-black uppercase tracking-wider text-slate-500">
            All Sections (Vertical List)
          </div>
          {orderedSections.map((sec) => {
            const isSelected = activeSectionId === sec.id;
            const meta = SECTION_BADGE_ICONS[sec.id];
            const IconComp = meta.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={sec.onClick}
                className={`w-full min-h-[40px] px-3 py-2 rounded-xl flex items-center justify-between gap-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f2952] text-white font-black shadow-xs ring-2 ring-amber-400'
                    : 'bg-white hover:bg-amber-50 text-[#0f2952] font-bold border border-slate-200/80'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg ${meta.badgeBg} ${meta.iconColor} flex items-center justify-center shrink-0 text-xs`}
                  >
                    {meta.emoji ? <span>{meta.emoji}</span> : <IconComp className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-xs truncate">{sec.label.replace('🎓 ', '')}</span>
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isSelected ? 'text-amber-300' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right-Side Horizontal Icon Display */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
              Quick Section Icons (Tap Any Icon to Open)
            </span>
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
              Scroll or tap horizontally →
            </span>
          </div>
          <div className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-0.5">
            {horizontalQuickIcons.map((item) => {
              const LucideComp = item.lucideIcon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={`min-w-[140px] sm:min-w-[155px] shrink-0 rounded-2xl bg-gradient-to-b ${item.cardGradient} border-2 ${item.borderClass} p-2.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 text-left`}
                >
                  {item.illustrationType ? (
                    <span className="w-11 h-11 shrink-0 flex items-center justify-center">
                      <SpecialCardIllustration
                        type={item.illustrationType}
                        className="w-full h-full drop-shadow-xs"
                      />
                    </span>
                  ) : item.boardEmblem ? (
                    <HeroBoardEmblemIcon board={item.boardEmblem} className="w-10 h-10 shrink-0" />
                  ) : (
                    <span
                      className={`w-10 h-10 rounded-xl ${
                        item.iconBg || 'bg-blue-600 text-white'
                      } flex items-center justify-center shrink-0 shadow-2xs text-base`}
                    >
                      {item.emojiIcon ? (
                        <span>{item.emojiIcon}</span>
                      ) : LucideComp ? (
                        <LucideComp className="w-5 h-5" />
                      ) : null}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="block font-display font-black text-xs text-[#0f2952] leading-tight truncate">
                      {item.label}
                    </span>
                    <span className="block text-[10px] font-bold text-[#0f2952]/80 truncate mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
