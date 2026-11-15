import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Lock,
  LogIn,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SpecialLearningSectionId, SubjectName } from '../types';
import { useApp } from '../context/AppContext';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectMeta,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getDemoQuestionsForBoardAndClass } from '../data/demoQuestionsData';
import { EDUCATION_ILLUSTRATIONS } from '../data/educationIllustrations';
import { DEFAULT_FAQS } from '../services/supportService';
import {
  formatStandardOrdinal,
  FREE_ALLOWED_SUBJECTS,
  getBoardDisplayName,
  getBoardShortLabel,
} from '../utils/subscriptionAccess';
import { NavSubActionId } from '../data/navigationConfig';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';

export type HomeScrollTarget =
  | 'home-overview'
  | 'courses-section'
  | 'special-learning-section'
  | 'home-how-it-works'
  | 'home-why-choose-us'
  | 'plans-pricing'
  | 'home-faqs'
  | null;

interface PublicHomeDashboardProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  scrollTarget?: HomeScrollTarget;
  onClearScrollTarget?: () => void;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onNavigateZone: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onOpenAuth: (defaultTab: 'login' | 'register' | 'teacher' | 'admin') => void;
  onOpenPanel: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  isAuthenticated?: boolean;
  currentRole?: 'student' | 'teacher' | 'admin';
  currentUserName?: string;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
}

const IllustrationCard: React.FC<{
  src: string;
  alt: string;
  aspectClass?: string;
  eager?: boolean;
  fallbackLabel: string;
}> = ({ src, alt, aspectClass = 'aspect-[4/3]', eager = false, fallbackLabel }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 ${aspectClass}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 text-white space-y-2">
          <BookOpen className="w-8 h-8 text-amber-300" />
          <p className="text-xs font-bold text-slate-200">{fallbackLabel}</p>
        </div>
      )}
    </div>
  );
};

const BOARD_ACCENT_STYLES: Record<
  EducationBoard,
  {
    activeCard: string;
    ctaBg: string;
    textAccent: string;
    cardTint: string;
  }
> = {
  Maharashtra: {
    activeCard: 'border-amber-500 bg-amber-50/70 shadow-md',
    ctaBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    textAccent: 'text-amber-800',
    cardTint: 'from-amber-50 to-orange-50',
  },
  CBSE: {
    activeCard: 'border-blue-600 bg-blue-50/70 shadow-md',
    ctaBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    textAccent: 'text-blue-800',
    cardTint: 'from-blue-50 to-indigo-50',
  },
  ICSE: {
    activeCard: 'border-emerald-600 bg-emerald-50/70 shadow-md',
    ctaBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    textAccent: 'text-emerald-800',
    cardTint: 'from-emerald-50 to-teal-50',
  },
};

function getClassStageColor(classNum: number, isSelected: boolean, activeBg: string): string {
  if (isSelected) return `${activeBg} border-transparent shadow-sm text-white`;
  if (classNum <= 3) return 'bg-sky-50/80 hover:bg-sky-100 text-slate-900 border-sky-200';
  if (classNum <= 5) return 'bg-emerald-50/80 hover:bg-emerald-100 text-slate-900 border-emerald-200';
  if (classNum <= 8) return 'bg-amber-50/80 hover:bg-amber-100 text-slate-900 border-amber-200';
  return 'bg-indigo-50/80 hover:bg-indigo-100 text-slate-900 border-indigo-200';
}

function getClassStageLabel(classNum: number): string {
  if (classNum <= 3) return 'Foundation';
  if (classNum <= 5) return 'Preparatory';
  if (classNum <= 8) return 'Middle';
  return 'Board Prep';
}

export const PublicHomeDashboard: React.FC<PublicHomeDashboardProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  scrollTarget,
  onClearScrollTarget,
  onOpenDemo,
  onNavigateZone,
  onOpenAuth,
  onOpenPanel,
  onOpenMembership,
  isAuthenticated = false,
  currentRole = 'student',
  currentUserName,
  isDesktopMode = false,
  onToggleViewMode,
  onMenuAction,
}) => {
  const { isSectionVisible, learningPrograms } = useApp();
  const [expandedFaqId, setExpandedFaqId] = useState<string>('faq-1');
  const [pricingBoardTab, setPricingBoardTab] = useState<EducationBoard>(selectedBoard);

  const specialLearningCards = useMemo<
    Array<{
      id: string;
      visKey: SpecialLearningSectionId;
      emoji: string;
      badge: string;
      title: string;
      desc: string;
      targetTab: string;
      secondaryTab?: { label: string; tab: string };
      accentClass: string;
    }>
  >(
    () => [
      {
        id: 'sl-scholarship',
        visKey: 'scholarship',
        emoji: '🏆',
        badge: 'Std 4 & 7 · Set #1 Free',
        title: '1. Scholarship Corner',
        desc: 'Official MSCE Std 4th (PSE) & Std 7th (UPS) practice banks across 10 mock sets in Marathi, English & Hindi.',
        targetTab: 'scholarship',
        accentClass: 'border-amber-200 bg-amber-50/40',
      },
      {
        id: 'sl-drawing',
        visKey: 'drawing',
        emoji: '🎨',
        badge: '120+ Templates · Free Canvas',
        title: '2. Drawing Studio',
        desc: 'Interactive flood-fill colouring templates, freehand painting canvas, shapes & PNG artwork export.',
        targetTab: 'drawing',
        accentClass: 'border-rose-200 bg-rose-50/40',
      },
      {
        id: 'sl-stories',
        visKey: 'stories',
        emoji: '📖',
        badge: '45+ Audio Stories · 3 Free',
        title: '3. Story World',
        desc: 'English, Hindi & Marathi moral stories with speech narration, vocabulary builder & comprehension checks.',
        targetTab: 'stories',
        accentClass: 'border-indigo-200 bg-indigo-50/40',
      },
      {
        id: 'sl-shivaji',
        visKey: 'shivaji',
        emoji: '🚩',
        badge: '50 Chapters · 3 Free',
        title: '4. Shivaji Maharaj Stories',
        desc: 'Chronological Swarajya history chapters in English, Marathi & Hindi with audio read-along.',
        targetTab: 'shivaji',
        accentClass: 'border-orange-200 bg-orange-50/40',
      },
      {
        id: 'sl-gk',
        visKey: 'gk_cricket',
        emoji: '🏏',
        badge: 'Daily GK · Level 1 Free',
        title: '5. General Knowledge',
        desc: 'Daily Cricket Current Affairs, Records, Women Cricket & General Knowledge 4-level arena.',
        targetTab: 'cricket',
        accentClass: 'border-emerald-200 bg-emerald-50/40',
      },
      {
        id: 'sl-creative',
        visKey: 'creative_activities',
        emoji: '🧩',
        badge: 'Riddles & Sudoku Open',
        title: '6. Creative Activities',
        desc: '47+ Brain Riddles, sequence logic puzzles & interactive 4×4, 6×6 & 9×9 Sudoku challenges.',
        targetTab: 'puzzles',
        secondaryTab: { label: 'Open Sudoku', tab: 'sudoku' },
        accentClass: 'border-purple-200 bg-purple-50/40',
      },
      {
        id: 'sl-programs',
        visKey: 'future_skills',
        emoji: '✨',
        badge: `${learningPrograms.filter((p) => p.published !== false).length} Programs`,
        title: '7. Other Existing Programs',
        desc: 'AI Learning Academy, Future Skills, Champion Certificates & all specialized study tracks.',
        targetTab: 'other-programs',
        secondaryTab: { label: 'AI Academy', tab: 'future-skills' },
        accentClass: 'border-sky-200 bg-sky-50/40',
      },
    ],
    [learningPrograms]
  );

  const visibleSpecialCards = useMemo(
    () => specialLearningCards.filter((card) => isSectionVisible(card.visKey)),
    [specialLearningCards, isSectionVisible]
  );

  useEffect(() => {
    setPricingBoardTab(selectedBoard);
  }, [selectedBoard]);

  useEffect(() => {
    if (!scrollTarget) return;
    const el = document.getElementById(scrollTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClearScrollTarget) {
      const timer = setTimeout(onClearScrollTarget, 400);
      return () => clearTimeout(timer);
    }
  }, [scrollTarget, onClearScrollTarget]);

  const activeBoardMeta = useMemo(
    () => getEducationBoardMeta(selectedBoard),
    [selectedBoard]
  );
  const pricingBoardMeta = useMemo(
    () => getEducationBoardMeta(pricingBoardTab),
    [pricingBoardTab]
  );

  const selectedClassSubjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const selectedClassMeta = useMemo(
    () =>
      ALL_10_CLASSES_META.find((c) => c.classLevel === selectedClass) ||
      ALL_10_CLASSES_META[0],
    [selectedClass]
  );

  // Strictly 2 unique demo questions scoped exclusively to selectedBoard + selectedClass
  const previewDemoQuestions = useMemo(
    () => getDemoQuestionsForBoardAndClass(selectedBoard, selectedClass),
    [selectedBoard, selectedClass]
  );

  const boardAccent = BOARD_ACCENT_STYLES[selectedBoard];

  return (
    <div className={`${isDesktopMode ? 'space-y-8' : 'space-y-10'} pb-12`}>
      {/* 1. COMPLETE REFERENCE-MATCHED EDUCATIONAL DASHBOARD SHOWCASE */}
      <div id="home-overview">
        <ReferenceShowcaseSections
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          onOpenDemo={(tab) => onOpenDemo(tab || 'live-quiz')}
          onNavigateTab={(tab, subSection, subject) => onNavigateZone(tab, subSection || 'overview', subject)}
          onMenuAction={onMenuAction}
          onOpenAuth={onOpenAuth}
          onOpenMembership={(targetClass, targetBoard) =>
            onOpenMembership(targetClass || selectedClass, targetBoard || selectedBoard)
          }
          onStartLearningClick={() => {
            const el = document.getElementById('courses-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else onOpenDemo('live-quiz');
          }}
          viewMode={isDesktopMode ? 'desktop' : 'auto'}
          onToggleViewMode={onToggleViewMode}
          progressMetrics={{
            isLoggedIn: false,
            coursesCompleted: 0,
            practiceTests: 0,
            achievements: 0,
            progressPercent: 0,
          }}
        />
      </div>

      {/* QUICK BOARD & CLASS 1-10 BAR + TRUST HIGHLIGHTS */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white p-5 sm:p-6 border border-indigo-400/30 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-6 space-y-2">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
              Maharashtra State Board · CBSE (NCERT) · ICSE (CISCE) · Standards 1st to 10th
            </p>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              Quick Board &amp; Standard Selector ({activeBoardMeta.shortLabel} · {selectedClassMeta.shortLabel})
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Switch between Maharashtra State Board, CBSE, and ICSE across Classes 1 to 10 below. Unlock 365 days of full board + class access for just ₹99 one-time payment.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenDemo('live-quiz')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try Free Demo ({getBoardShortLabel(selectedBoard)} · {selectedClassMeta.shortLabel})</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenMembership(selectedClass, selectedBoard)}
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>Unlock {getBoardShortLabel(selectedBoard)} {selectedClass} (₹99 / 365 Days)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-2.5 bg-slate-900/80 p-4 rounded-2xl border border-indigo-400/25">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {BOARD_META_LIST.map((b) => {
                const isActive = selectedBoard === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onSelectBoard(b.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    {getBoardShortLabel(b.id)}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {ALL_10_CLASSES_META.map((c) => {
                const isActive = selectedClass === c.classLevel;
                return (
                  <button
                    key={c.classLevel}
                    type="button"
                    onClick={() => onSelectClass(c.classLevel)}
                    className={`py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {c.shortLabel.replace('Std ', '')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STUDENT, TEACHER & ADMIN PANEL ACCESS CARDS */}
      <section aria-label="Role Access Panels" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Role-Based Access Portals
            </p>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
              Choose Your Panel to Sign In or Register
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Protected by Firebase Authentication &amp; Single-Device Session Security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* A. STUDENT PANEL */}
          <div className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/80">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                  Classes 1–10 Learners
                </span>
              </div>

              <div>
                <h3 className="text-lg font-display font-extrabold text-slate-900">
                  Student Panel
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Unified learning workspace for school courses, practice, and progress analytics.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Student Login &amp; Multi-Class Registration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Access Purchased Board &amp; Class Courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Study Materials, Worksheets &amp; Practice Tests</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>View Scorecards, Levels &amp; Progress</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenPanel('student', 'login')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>
                  {isAuthenticated && currentRole === 'student'
                    ? 'Open Dashboard'
                    : 'Student Login'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onOpenPanel('student', 'register')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* B. TEACHER PANEL */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Educator Access
                </span>
              </div>

              <div>
                <h3 className="text-lg font-display font-extrabold text-slate-900">
                  Teacher Panel
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Role-restricted portal for educators using verified teaching credentials.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dedicated Teacher Login Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Access Teacher-Authorized Portal Sections</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Permitted Worksheets, Notes &amp; Solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Strict Separate Teacher Permissions</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenPanel('teacher', 'login')}
                className="w-full min-h-[42px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>
                  {isAuthenticated && currentRole === 'teacher'
                    ? `Open Teacher Hub (${currentUserName?.split(' ')[0] || 'Active'})`
                    : 'Dedicated Teacher Login'}
                </span>
              </button>
            </div>
          </div>

          {/* C. ADMIN PANEL */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Authorized Only</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-display font-extrabold text-white">
                  Admin Panel
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Protected control console gated by administrator Firebase Authentication.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-200 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Secure Administrator Sign-In Required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Access Existing Master Admin Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Manage Boards, Classes, Students &amp; Content</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Monitor Subscriptions &amp; Platform Settings</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenPanel('admin', 'login')}
                className="w-full min-h-[42px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isAuthenticated && currentRole === 'admin'
                    ? 'Open Admin Dashboard'
                    : 'Secure Admin Login'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOARD SELECTION & CLASSES 1–10 EXPLORER */}
      <section id="courses-section" className="space-y-8 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="lg:col-span-7 space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Board-Specific Curriculum · Zero Cross-Board Mixing
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Select Your Education Board &amp; Class (1–10)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Every board maintains completely independent subjects, textbooks, notes, worksheets, and question banks. Select your board first, then pick any class from Standard 1st to 10th.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-700">
                Currently Showing:{' '}
                <span className={boardAccent.textAccent}>{getBoardDisplayName(selectedBoard)}</span> ·{' '}
                <span>{selectedClass}</span> ({selectedClassSubjects.length} Board-Exclusive Subjects)
              </span>
              {isSectionVisible('all_courses') && (
                <button
                  type="button"
                  onClick={() => onNavigateZone('all-courses')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Browse All Courses Directory (MH · CBSE · ICSE)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <IllustrationCard
              src={EDUCATION_ILLUSTRATIONS.boardsCurriculum.src}
              alt={EDUCATION_ILLUSTRATIONS.boardsCurriculum.alt}
              aspectClass="aspect-[4/3]"
              fallbackLabel="Maharashtra, CBSE & ICSE Textbooks"
            />
          </div>
        </div>

        {/* 3 Separate Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BOARD_META_LIST.map((board) => {
            const isSelected = selectedBoard === board.id;
            const style = BOARD_ACCENT_STYLES[board.id];
            return (
              <div
                key={board.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectBoard(board.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBoard(board.id);
                  }
                }}
                className={`rounded-2xl p-6 border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-5 ${
                  isSelected
                    ? style.activeCard
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${style.cardTint} border border-slate-200 flex items-center justify-center text-2xl shrink-0`}
                      >
                        <span aria-hidden="true">{board.icon}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {board.affiliationLabel}
                        </p>
                        <h3 className="text-lg font-display font-extrabold text-slate-900">
                          {board.shortLabel}
                        </h3>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{board.description}</p>

                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {board.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${style.textAccent}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-extrabold">
                  <span className={style.textAccent}>
                    {isSelected ? 'Viewing Classes 1–10 Below' : `Select ${board.shortLabel}`}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${style.textAccent}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Class Selector Cards (Classes 1 to 10) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {activeBoardMeta.fullName}
              </p>
              <h3 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                Classes 1 to 10 — {activeBoardMeta.shortLabel} Syllabus
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenDemo('live-curriculum')}
              className={`min-h-[42px] px-4 py-2 rounded-xl font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto ${boardAccent.ctaBg}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Open {selectedClass} Free Worksheets</span>
            </button>
          </div>

          {/* 10 Colourful Age-Appropriate Class Cards */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-5 gap-3 ${
              isDesktopMode ? 'lg:grid-cols-10' : 'lg:grid-cols-5'
            }`}
          >
            {ALL_10_CLASSES_META.map((cls, idx) => {
              const classNum = idx + 1;
              const isSelected = selectedClass === cls.classLevel;
              const subjCount = getSubjectsForClass(cls.classLevel, selectedBoard).length;
              return (
                <button
                  key={cls.classLevel}
                  type="button"
                  onClick={() => onSelectClass(cls.classLevel)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${getClassStageColor(
                    classNum,
                    isSelected,
                    boardAccent.ctaBg
                  )}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-display font-extrabold">
                      {cls.classLevel}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        isSelected ? 'text-white/90' : 'text-slate-500'
                      }`}
                    >
                      {getClassStageLabel(classNum)}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] font-semibold ${
                      isSelected ? 'text-white/90' : 'text-slate-600'
                    }`}
                  >
                    {subjCount} {activeBoardMeta.shortLabel.split(' ')[0]} Subjects
                  </p>
                </button>
              );
            })}
          </div>

          {/* Board-Exclusive Subjects Display for Selected Class */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h4 className="text-base font-display font-extrabold text-slate-900">
                  {activeBoardMeta.shortLabel} · {selectedClass} ({selectedClassMeta.ordinalLabel}) Subjects
                </h4>
                <p className="text-xs text-slate-600">
                  Showing strictly {activeBoardMeta.shortLabel} subjects for {selectedClass}. English &amp; Math demos are free; full board+class unlocks all {selectedClassSubjects.length} subjects.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateZone('study-materials', 'notes')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                >
                  Study Notes
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateZone('worksheets', 'worksheets')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                >
                  Worksheets
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateZone('quizzes', 'mcq')}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  MCQ Practice
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
                isDesktopMode ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
              }`}
            >
              {selectedClassSubjects.map((subName) => {
                const meta = getSubjectMeta(subName, selectedBoard);
                const isFreeSubj = FREE_ALLOWED_SUBJECTS.includes(subName);
                return (
                  <button
                    key={subName}
                    type="button"
                    onClick={() =>
                      isAuthenticated
                        ? onNavigateZone('quizzes', 'mcq', subName)
                        : onOpenDemo('live-quiz')
                    }
                    className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left flex flex-col justify-between gap-2 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl" aria-hidden="true">
                        {meta.icon}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          isFreeSubj ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {isFreeSubj ? 'Free Demo Included' : '₹99 Full Access'}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                        {subName}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {meta.chaptersSummary || meta.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3B. SPECIAL LEARNING STUDIOS & ENRICHMENT PROGRAMS */}
      {visibleSpecialCards.length > 0 && (
        <section id="special-learning-section" className="space-y-6 scroll-mt-28">
          <div className="bg-gradient-to-r from-amber-50 via-white to-indigo-50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  🎓 Special Learning Studios · Free Previews Available
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  Scholarship, Drawing, Stories, Shivaji Maharaj &amp; GK
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  All existing enrichment programs and championship studios remain live and accessible—try Set #1, Chapters 1–3, Drawing Canvas, and Puzzles right away.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateZone('other-programs')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>View All Special Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleSpecialCards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${card.accentClass}`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl" aria-hidden="true">
                        {card.emoji}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-700 bg-white/90 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/70">
                    <button
                      type="button"
                      onClick={() => onNavigateZone(card.targetTab)}
                      className="text-xs font-extrabold text-amber-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {card.secondaryTab && (
                      <button
                        type="button"
                        onClick={() => onNavigateZone(card.secondaryTab!.tab)}
                        className="ml-auto text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
                      >
                        {card.secondaryTab.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. STUDY MATERIAL & LEARNING FACILITIES (All 9 Requested Facilities + Visuals) */}
      <section className="space-y-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Study Material &amp; Learning Facilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Everything Students Receive Inside MyStudyZone
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From textbook-based chapters and important questions to timed mock examinations and subject progress tracking, every learning tool is tailored strictly to your chosen board and class.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <IllustrationCard
              src={EDUCATION_ILLUSTRATIONS.studyMaterialStem.src}
              alt={EDUCATION_ILLUSTRATIONS.studyMaterialStem.alt}
              aspectClass="aspect-[4/3]"
              fallbackLabel="Mathematics, Science & Languages"
            />
            <IllustrationCard
              src={EDUCATION_ILLUSTRATIONS.practiceZoneWorksheets.src}
              alt={EDUCATION_ILLUSTRATIONS.practiceZoneWorksheets.alt}
              aspectClass="aspect-[4/3]"
              fallbackLabel="Interactive Quizzes & Worksheets"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: BookOpen,
              color: 'text-teal-700 bg-teal-50',
              title: 'Chapter-wise Study Material',
              desc: 'Concise definitions, concept summaries, formulas, and revision notes aligned to your textbook chapters.',
              actionLabel: 'Browse Study Material',
              onClick: () => onNavigateZone('study-materials', 'notes'),
            },
            {
              icon: Layers,
              color: 'text-indigo-700 bg-indigo-50',
              title: 'Textbook-based Questions',
              desc: 'Board-accurate textbook syllabus coverage for Maharashtra, CBSE NCERT, and ICSE CISCE standards.',
              actionLabel: 'View Textbook Topics',
              onClick: () => onNavigateZone('study-materials', 'textbook-learning'),
            },
            {
              icon: Sparkles,
              color: 'text-amber-700 bg-amber-50',
              title: 'Important Questions',
              desc: 'High-weightage solved conceptual questions and key rules highlighted for faster exam revision.',
              actionLabel: 'Explore Important Questions',
              onClick: () => onNavigateZone('study-materials', 'important-questions'),
            },
            {
              icon: Target,
              color: 'text-blue-700 bg-blue-50',
              title: 'MCQ Practice',
              desc: 'Zero-repetition 4-level multiple-choice quizzes progressing from Level 1 Basic to Level 4 Challenge.',
              actionLabel: 'Start MCQ Practice',
              onClick: () => onNavigateZone('quizzes', 'mcq'),
            },
            {
              icon: FileText,
              color: 'text-emerald-700 bg-emerald-50',
              title: 'Interactive Worksheets',
              desc: 'Class-wise online worksheets with instant evaluation, model answers, and explanation feedback.',
              actionLabel: 'Open Worksheets',
              onClick: () => onNavigateZone('worksheets', 'worksheets'),
            },
            {
              icon: ClipboardCheck,
              color: 'text-purple-700 bg-purple-50',
              title: 'Chapter-wise Tests',
              desc: 'Targeted chapter quizzes checking concept accuracy across every subject in Classes 1 to 10.',
              actionLabel: 'Take Chapter Test',
              onClick: () => onNavigateZone('quizzes', 'chapter-tests'),
            },
            {
              icon: Clock,
              color: 'text-orange-700 bg-orange-50',
              title: 'Mock Examinations',
              desc: 'Timed practice examinations including Std 4th & 7th MSCE Scholarship mock rounds.',
              actionLabel: 'Enter Exam Zone',
              onClick: () => onNavigateZone('scholarship', 'mock-tests'),
            },
            {
              icon: Award,
              color: 'text-rose-700 bg-rose-50',
              title: 'Model Question Papers',
              desc: 'Exam-pattern practice sets with detailed solutions to build speed, accuracy, and exam confidence.',
              actionLabel: 'Preview Model Papers',
              onClick: () => onNavigateZone('scholarship', 'model-papers'),
            },
            {
              icon: TrendingUp,
              color: 'text-cyan-700 bg-cyan-50',
              title: 'Progress Tracking',
              desc: 'Live performance tracking, subject mastery scorecards, completed worksheets, and certificates.',
              actionLabel: 'View Performance Zone',
              onClick: () => onNavigateZone('performance', 'progress-tracking'),
            },
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-xs font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer self-start"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FREE DEMO SECTION PREVIEW (Strictly 2 Unique Demo Questions Criteria + Class Worksheets) */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-indigo-800/50 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
              Free Visitor Demo · Board &amp; Class Specific
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
              Try {activeBoardMeta.shortLabel} · {selectedClass} Before Purchasing
            </h2>
            <p className="text-sm text-indigo-100/90 leading-relaxed">
              Every board and standard from Class 1 to Class 10 provides 2 syllabus-accurate demo MCQs with instant explanations plus class-specific sample worksheets. Paid subjects and full test banks remain locked until the relevant subscription is purchased.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenDemo('live-quiz')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start 2-Question Demo ({selectedClass})</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDemo('live-curriculum')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              Open {selectedClass} Demo Worksheets
            </button>
          </div>
        </div>

        {/* Read-only Teaser of the 2 Unique Class-Specific Demo Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewDemoQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                  <span>
                    Demo Question {idx + 1} of 2 · {q.subject}
                  </span>
                  <span className="text-indigo-200">
                    {getBoardShortLabel(selectedBoard)} · {selectedClass}
                  </span>
                </div>
                <p className="text-sm font-bold text-white leading-snug">{q.question}</p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-300">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={opt}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 truncate"
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenDemo('live-quiz')}
                className="text-xs font-extrabold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer self-start pt-1"
              >
                <span>Attempt &amp; check solution in Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EXAM ZONE HIGHLIGHT + SUBSCRIPTION PLANS & PRICING */}
      <section id="plans-pricing" className="space-y-7 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="lg:col-span-5">
            <IllustrationCard
              src={EDUCATION_ILLUSTRATIONS.examZoneMockTest.src}
              alt={EDUCATION_ILLUSTRATIONS.examZoneMockTest.alt}
              aspectClass="aspect-[4/3]"
              fallbackLabel="Exam Zone & Annual Plans"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                Simple, Affordable Subscriptions · Razorpay Verified
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Free &amp; ₹99/Year Plans by Board &amp; Class
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maharashtra State Board retains all existing pricing and rules, while CBSE and ICSE plans each cost ₹99 with 1-year (365-day) validity per selected class. You can unlock additional classes or boards anytime using your same email and mobile number.
              </p>
            </div>

            {/* Board Plan Tabs */}
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {BOARD_META_LIST.map((b) => {
                const isTab = pricingBoardTab === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setPricingBoardTab(b.id);
                      onSelectBoard(b.id);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      isTab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {getBoardShortLabel(b.id)} Plans
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  {pricingBoardMeta.shortLabel} · Free Plan
                </span>
                <span className="text-xs font-bold text-slate-500">Lifetime Free</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-extrabold text-slate-900">₹0</span>
                <span className="text-sm font-bold text-emerald-700">/ Forever</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore {pricingBoardMeta.shortLabel} risk-free on your registered class before upgrading.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>2 Interactive Demo Worksheets (English &amp; Mathematics for {selectedClass})</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>English &amp; Mathematics 4-Level Practice Quizzes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>2-Question Board &amp; Class Demo Preview across Classes 1–10</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Brain Riddles &amp; 4×4 / 6×6 Sudoku Practice</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() =>
                isAuthenticated ? onOpenDemo('live-curriculum') : onOpenAuth('register')
              }
              className="w-full min-h-[44px] py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {isAuthenticated ? 'Explore Free Demo Worksheets' : 'Register Free Account'}
            </button>
          </div>

          {/* ₹99 Annual Plan Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  {pricingBoardMeta.shortLabel} · Annual Plan
                </span>
                <span className="text-xs font-extrabold text-amber-900">
                  365 Days (1 Year)
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-extrabold text-amber-700">₹99</span>
                <span className="text-sm font-bold text-slate-600">
                  / 1 Year ({getBoardShortLabel(pricingBoardTab)} · {selectedClass})
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Unlocks complete <strong>{pricingBoardMeta.shortLabel}</strong> learning access for <strong>{selectedClass}</strong> for 365 days. Plans are isolated by board—purchasing CBSE does not unlock ICSE or Maharashtra, and vice versa.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-800 pt-2 border-t border-amber-200/70">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    All {getSubjectsForClass(selectedClass, pricingBoardTab).length} {getBoardShortLabel(pricingBoardTab)} {selectedClass} Subjects, Chapter Notes &amp; Question Banks
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Full Chapter-Wise Worksheets, Chapter Tests &amp; Model Solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {pricingBoardTab === 'Maharashtra'
                      ? 'MSCE Std 4th & 7th Scholarship Mock Tests (7 Languages) + Model Papers'
                      : 'Board-Pattern Mock Examinations, Model Papers & Performance Analytics'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Audio Stories, Drawing Studio, Cricket Quiz, AI Skills &amp; Certificates
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onOpenMembership(selectedClass, pricingBoardTab)}
                className="w-full min-h-[44px] py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>
                  Purchase {getBoardShortLabel(pricingBoardTab)} {selectedClass} — ₹99 / Year
                </span>
              </button>
              {!isAuthenticated && (
                <p className="text-[11px] text-slate-500 text-center">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="font-bold text-amber-800 hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>{' '}
                  to activate on your existing mobile &amp; email.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (6-Step Student Journey) */}
      <section
        id="home-how-it-works"
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6 scroll-mt-28"
      >
        <div className="space-y-1.5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
            6 Simple Steps to Begin
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            From selecting your education board to tracking marks in your student dashboard—get started in minutes.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 ${
            isDesktopMode ? 'xl:grid-cols-6' : ''
          }`}
        >
          {[
            {
              step: '01',
              title: 'Select Your Board',
              desc: 'Choose Maharashtra State Board, CBSE, or ICSE based on your school curriculum.',
              icon: Layers,
            },
            {
              step: '02',
              title: 'Select Your Class',
              desc: 'Pick any standard from Class 1 to Class 10 to load syllabus-matched subjects.',
              icon: GraduationCap,
            },
            {
              step: '03',
              title: 'Explore Free Demo',
              desc: 'Attempt 2 class-specific demo questions and sample worksheets with zero payment required.',
              icon: Play,
            },
            {
              step: '04',
              title: 'Register Your Account',
              desc: 'Sign up once with your email and mobile number—add extra classes or boards anytime.',
              icon: UserPlus,
            },
            {
              step: '05',
              title: 'Purchase Your Plan',
              desc: 'Unlock your chosen board and class for 1 full year (365 days) at ₹99 via Razorpay.',
              icon: Crown,
            },
            {
              step: '06',
              title: 'Start Learning',
              desc: 'Read study notes, complete worksheets, take mock exams, and track your performance.',
              icon: TrendingUp,
            },
          ].map((item) => {
            const StepIcon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 tracking-wider">
                      STEP {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. WHY CHOOSE OUR PLATFORM? (7 Key Benefits) */}
      <section id="home-why-choose-us" className="space-y-6 scroll-mt-28">
        <div className="space-y-1.5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
            Built for Exam Readiness &amp; Parent Confidence
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Why Choose Our Platform?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Layers,
              title: 'Board-Specific Learning',
              desc: 'Maharashtra State Board, CBSE, and ICSE are strictly separated with zero mixed chapters.',
            },
            {
              icon: GraduationCap,
              title: 'Class-Specific Content',
              desc: 'Every class from Standard 1st to 10th has age-appropriate worksheets, notes, and difficulty.',
            },
            {
              icon: BookOpen,
              title: 'Chapter-Wise Preparation',
              desc: 'Structured study notes, important questions, formulas, and revision checklists per chapter.',
            },
            {
              icon: ClipboardCheck,
              title: 'Practice & Examination Facilities',
              desc: 'Zero-repeat 4-level MCQ quizzes, interactive worksheets, mock exams, and model papers.',
            },
            {
              icon: Crown,
              title: 'Affordable Subscriptions',
              desc: 'Try free first and unlock an entire year (365 days) of board & class access for just ₹99.',
            },
            {
              icon: Clock,
              title: 'Easy Access Anytime',
              desc: 'Responsive learning across mobile phones, tablets, laptops, and desktops with Desktop Site view.',
            },
            {
              icon: TrendingUp,
              title: 'Student Performance Tracking',
              desc: 'Live progress dashboards, level-by-level accuracy scores, and downloadable certificates.',
            },
          ].map((benefit) => {
            const BenefitIcon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                  <BenefitIcon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section
        id="home-faqs"
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6 scroll-mt-28"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Got Questions?
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateZone('faqs')}
            className="text-xs font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Open Searchable FAQ Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {DEFAULT_FAQS.slice(0, 6).map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div key={faq.id} className="py-4">
                <button
                  type="button"
                  onClick={() => setExpandedFaqId(isOpen ? '' : faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Ready-to-Start CTA Strip */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div>
            <h3 className="font-display font-extrabold text-base text-slate-900">
              Ready to start {activeBoardMeta.shortLabel} for {selectedClass}?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Try the 2-question free demo or sign in to Student, Teacher, or Admin portals.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenDemo('live-quiz')}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs cursor-pointer"
            >
              Start Free Demo
            </button>
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
                >
                  Register Free
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => onOpenMembership(selectedClass, selectedBoard)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
              >
                Manage Subscription (₹99)
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
