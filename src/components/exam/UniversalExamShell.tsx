import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Monitor,
  RectangleHorizontal,
  RectangleVertical,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  X,
  XCircle,
} from 'lucide-react';
import { ExamScreenMode, useExamFullscreen } from '../../hooks/useExamFullscreen';

export type ExamPaletteStatus =
  | 'not-visited'
  | 'not-answered'
  | 'answered'
  | 'marked'
  | 'answered-marked';

export interface ExamPaletteItem {
  index: number;
  label: string | number;
  status: ExamPaletteStatus;
}

export interface ExamPaletteSection {
  title: string;
  items: ExamPaletteItem[];
}

export interface ExamPaletteStats {
  answered: number;
  unanswered: number;
  marked: number;
  notVisited?: number;
  answeredAndMarked?: number;
}

export interface UniversalExamShellProps {
  // Header & Identity Metadata
  examTitle: string;
  subjectName: string;
  subtitle?: string;
  verificationBadge?: 'green' | 'pending' | null;
  questionNumber: number;
  totalQuestions: number;
  marksLabel?: string;
  topicLabel?: string;
  formatBadge?: { label: string; className?: string };

  // Timer (optional for untimed tests; supports seconds or full HH:MM:SS)
  remainingSeconds?: number;
  timerFormat?: 'mmss' | 'hhmmss' | 'ss';
  urgentThresholdSeconds?: number;
  warningThresholdSeconds?: number;

  // Section Quick-Jump Strip & Optional Alert Banner
  alertBanner?: React.ReactNode;
  sectionTabsSlot?: React.ReactNode;

  // Question Content & Answer Options
  questionText: string;
  questionMediaSlot?: React.ReactNode;
  headerRightExtra?: React.ReactNode;
  afterStemSlot?: React.ReactNode;
  options: string[];
  selectedOptionIndex: number | null | undefined;
  optionBadgeType?: 'alpha' | 'numeric';
  optionsLayout?: 'stack' | 'grid-2';
  isAnswerLocked?: boolean;
  correctOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
  instantFeedbackSlot?: React.ReactNode;

  // Navigation Palette
  paletteItems: ExamPaletteItem[];
  paletteSections?: ExamPaletteSection[];
  paletteStats?: ExamPaletteStats;
  currentIndex: number;
  onJumpToQuestion: (idx: number) => void;

  // Bottom Controls
  onPrevious?: () => void;
  canPrevious?: boolean;
  onClearAnswer?: () => void;
  canClearAnswer?: boolean;
  isMarkedForReview?: boolean;
  onToggleMarkForReview?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showNextButton?: boolean;
  primaryActionOverride?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    tone?: 'emerald' | 'amber' | 'indigo';
  };
  onSubmitTest: () => void;
  submitLabel?: string;

  // Safe Return to Dashboard
  onBackToDashboard: () => void;
  progressSavedMessage?: string;

  // Optional Print/Copy guard (e.g. online worksheets) & External Modals
  disableCopyPrint?: boolean;
  externalModals?: React.ReactNode;
}

function formatTimerDisplay(seconds: number, format: 'mmss' | 'hhmmss' | 'ss'): string {
  const safe = Math.max(0, Math.floor(seconds));
  if (format === 'ss') {
    return `${safe}s`;
  }
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (format === 'hhmmss' || hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const SCREEN_MODE_OPTIONS: Array<{
  id: ExamScreenMode;
  title: string;
  shortTag: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}> = [
  {
    id: 'auto',
    title: 'AUTO FIT',
    shortTag: 'Auto',
    description: 'Automatically adjusts cleanly to your device screen',
    icon: Monitor,
  },
  {
    id: 'landscape',
    title: 'LANDSCAPE MODE',
    shortTag: '16:9',
    description: 'Wide 16:9 horizontal exam layout with side-by-side palette',
    icon: RectangleHorizontal,
  },
  {
    id: 'portrait',
    title: 'PORTRAIT MODE',
    shortTag: '9:16',
    description: 'Vertical 9:16 mobile-friendly stacked reading layout',
    icon: RectangleVertical,
  },
];

export const UniversalExamShell: React.FC<UniversalExamShellProps> = ({
  examTitle,
  subjectName,
  subtitle,
  verificationBadge = null,
  questionNumber,
  totalQuestions,
  marksLabel,
  topicLabel,
  formatBadge,
  remainingSeconds,
  timerFormat = 'mmss',
  urgentThresholdSeconds = 300,
  warningThresholdSeconds = 600,
  alertBanner,
  sectionTabsSlot,
  questionText,
  questionMediaSlot,
  headerRightExtra,
  afterStemSlot,
  options,
  selectedOptionIndex,
  optionBadgeType = 'alpha',
  optionsLayout = 'stack',
  isAnswerLocked = false,
  correctOptionIndex,
  onSelectOption,
  instantFeedbackSlot,
  paletteItems,
  paletteSections,
  paletteStats,
  currentIndex,
  onJumpToQuestion,
  onPrevious,
  canPrevious = true,
  onClearAnswer,
  canClearAnswer = true,
  isMarkedForReview = false,
  onToggleMarkForReview,
  onNext,
  nextLabel = 'Save & Next',
  showNextButton = true,
  primaryActionOverride,
  onSubmitTest,
  submitLabel = 'Submit Test',
  onBackToDashboard,
  progressSavedMessage = 'Your current answers and exam progress will be preserved where supported. You will leave the active examination screen without submitting.',
  disableCopyPrint = false,
  externalModals,
}) => {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const screenMenuRef = useRef<HTMLDivElement | null>(null);
  const questionScrollRef = useRef<HTMLDivElement | null>(null);

  const { isFullscreen, screenMode, setScreenMode, enterFullscreen, exitFullscreen } =
    useExamFullscreen(shellRef, true);

  const [showScreenMenu, setShowScreenMenu] = useState<boolean>(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState<boolean>(false);
  const [showDashboardConfirm, setShowDashboardConfirm] = useState<boolean>(false);

  // Lock background page scroll while exam workspace is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Scroll question panel back to top cleanly when switching questions
  useEffect(() => {
    questionScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentIndex]);

  // Close Screen Adjustment popover on outside tap or Escape
  useEffect(() => {
    if (!showScreenMenu) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (screenMenuRef.current && !screenMenuRef.current.contains(e.target as Node)) {
        setShowScreenMenu(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowScreenMenu(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showScreenMenu]);

  // Computed timer urgency styles
  const isTimed = typeof remainingSeconds === 'number';
  const isUrgent = isTimed && remainingSeconds <= urgentThresholdSeconds;
  const isWarning =
    isTimed && remainingSeconds > urgentThresholdSeconds && remainingSeconds <= warningThresholdSeconds;

  // Derived palette summary if caller didn't pass explicit stats
  const computedStats: ExamPaletteStats = paletteStats || {
    answered: paletteItems.filter(
      (p) => p.status === 'answered' || p.status === 'answered-marked'
    ).length,
    unanswered: paletteItems.filter(
      (p) => p.status === 'not-answered' || p.status === 'not-visited'
    ).length,
    marked: paletteItems.filter(
      (p) => p.status === 'marked' || p.status === 'answered-marked'
    ).length,
  };

  // Determine active option grid styling based on Screen Adjustment mode
  const effectiveOptionsGridClass =
    screenMode === 'portrait'
      ? 'grid-cols-1'
      : screenMode === 'landscape'
      ? 'grid-cols-1 sm:grid-cols-2'
      : optionsLayout === 'grid-2'
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1';

  // Container framing rules for Auto Fit vs Landscape (16:9) vs Portrait (9:16)
  // Note: NEVER forces horizontal scroll; keeps same mounted subtree across switches.
  const stageFrameClass =
    screenMode === 'portrait'
      ? 'w-full max-w-[460px] mx-auto bg-white sm:rounded-2xl sm:border sm:border-slate-300 sm:shadow-2xl overflow-hidden flex flex-col flex-1 min-h-0'
      : screenMode === 'landscape'
      ? 'w-full max-w-[min(1440px,calc((100dvh-116px)*16/9))] mx-auto bg-white lg:rounded-2xl lg:border lg:border-slate-300 lg:shadow-2xl overflow-hidden flex flex-col flex-1 min-h-0'
      : 'w-full max-w-[1600px] mx-auto flex flex-col flex-1 min-h-0';

  const workspaceGridClass =
    screenMode === 'portrait'
      ? 'flex-1 min-h-0 grid grid-cols-1'
      : screenMode === 'landscape'
      ? 'flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12'
      : 'flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12';

  const questionColSpanClass =
    screenMode === 'portrait'
      ? 'flex flex-col min-h-0 bg-white'
      : screenMode === 'landscape'
      ? 'md:col-span-8 lg:col-span-9 flex flex-col min-h-0 bg-white md:border-r md:border-slate-200'
      : 'lg:col-span-8 xl:col-span-9 flex flex-col min-h-0 bg-white lg:border-r lg:border-slate-200';

  const showSidebarPalette =
    screenMode === 'landscape'
      ? 'hidden md:flex md:col-span-4 lg:col-span-3 flex-col min-h-0 bg-slate-50/80'
      : screenMode === 'auto'
      ? 'hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col min-h-0 bg-slate-50/80'
      : 'hidden';

  const showPaletteToggleBtn =
    screenMode === 'portrait'
      ? 'inline-flex'
      : screenMode === 'landscape'
      ? 'inline-flex md:hidden'
      : 'inline-flex lg:hidden';

  const renderPaletteBadgeClass = (status: ExamPaletteStatus, isCurrent: boolean) => {
    let base = 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100';
    if (status === 'answered-marked') {
      base = 'bg-indigo-700 border-indigo-800 text-white';
    } else if (status === 'marked') {
      base = 'bg-violet-600 border-violet-700 text-white';
    } else if (status === 'answered') {
      base = 'bg-emerald-600 border-emerald-700 text-white';
    } else if (status === 'not-answered') {
      base = 'bg-rose-600 border-rose-700 text-white';
    }
    return `${base} ${isCurrent ? 'ring-2 ring-offset-1 ring-amber-500 scale-[1.04]' : ''}`;
  };

  const renderPaletteBody = (closeOnSelect: boolean) => (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-display font-black text-sm text-slate-900">
            Question Palette ({totalQuestions})
          </h3>
          <p className="text-[11px] font-semibold text-slate-500">
            Tap any number to jump directly
          </p>
        </div>
        {closeOnSelect && (
          <button
            type="button"
            onClick={() => setShowPaletteDrawer(false)}
            aria-label="Close Question Palette"
            className="min-h-[40px] min-w-[40px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Status Summary Legend */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 gap-1.5 text-[11px] font-bold shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
          <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
            {computedStats.answered}
          </span>
          <span className="truncate">Answered</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">
          <span className="w-4 h-4 rounded bg-slate-200 text-slate-800 text-[10px] font-mono font-black flex items-center justify-center shrink-0">
            {computedStats.unanswered}
          </span>
          <span className="truncate">Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-50 border border-violet-200 text-violet-900">
          <span className="w-4 h-4 rounded bg-violet-600 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
            {computedStats.marked}
          </span>
          <span className="truncate">Marked Review</span>
        </div>
        {typeof computedStats.notVisited === 'number' ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
            <span className="w-4 h-4 rounded bg-rose-600 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
              {computedStats.notVisited}
            </span>
            <span className="truncate">Not Visited</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
            <span className="w-4 h-4 rounded bg-amber-500 text-white text-[10px] font-mono font-black flex items-center justify-center shrink-0">
              {totalQuestions}
            </span>
            <span className="truncate">Total Qs</span>
          </div>
        )}
      </div>

      {/* Clickable Number Grid */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 space-y-4">
        {paletteSections && paletteSections.length > 0 ? (
          paletteSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                {section.title}
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {section.items.map((item) => (
                  <button
                    key={`${section.title}-${item.index}`}
                    type="button"
                    onClick={() => {
                      onJumpToQuestion(item.index);
                      if (closeOnSelect) setShowPaletteDrawer(false);
                    }}
                    aria-label={`Jump to Question ${item.label}`}
                    className={`relative min-h-[38px] rounded-lg border font-mono tabular-nums font-bold text-xs cursor-pointer transition-all flex items-center justify-center ${renderPaletteBadgeClass(
                      item.status,
                      item.index === currentIndex
                    )}`}
                  >
                    {item.label}
                    {item.status === 'answered-marked' && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-950 text-[8px] font-black flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-5 gap-1.5">
            {paletteItems.map((item) => (
              <button
                key={item.index}
                type="button"
                onClick={() => {
                  onJumpToQuestion(item.index);
                  if (closeOnSelect) setShowPaletteDrawer(false);
                }}
                aria-label={`Jump to Question ${item.label}`}
                className={`relative min-h-[38px] rounded-lg border font-mono tabular-nums font-bold text-xs cursor-pointer transition-all flex items-center justify-center ${renderPaletteBadgeClass(
                  item.status,
                  item.index === currentIndex
                )}`}
              >
                {item.label}
                {item.status === 'answered-marked' && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-950 text-[8px] font-black flex items-center justify-center">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Submit inside Palette */}
      <div className="p-3.5 border-t border-slate-200 bg-white shrink-0">
        <button
          type="button"
          onClick={() => {
            if (closeOnSelect) setShowPaletteDrawer(false);
            onSubmitTest();
          }}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-display font-black text-xs sm:text-sm shadow-sm cursor-pointer flex items-center justify-center gap-2 transition-all"
        >
          <Send className="w-4 h-4 shrink-0" />
          <span>{submitLabel}</span>
        </button>
      </div>
    </div>
  );

  const activeModeMeta =
    SCREEN_MODE_OPTIONS.find((m) => m.id === screenMode) || SCREEN_MODE_OPTIONS[0];

  return (
    <div
      ref={shellRef}
      role="region"
      aria-label={`${examTitle} Full-Screen Examination Workspace`}
      onContextMenu={disableCopyPrint ? (e) => e.preventDefault() : undefined}
      className={`fixed inset-0 z-[95] h-dvh w-screen flex flex-col overflow-hidden ${
        screenMode === 'portrait' || screenMode === 'landscape'
          ? 'bg-slate-950'
          : 'bg-slate-100'
      } ${disableCopyPrint ? 'select-none worksheet-no-print-zone' : ''}`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* ===================================================================
          TOP EXAMINATION TOOLBAR (Always Accessible — Desktop, Tablet, Mobile)
         =================================================================== */}
      <header className="shrink-0 bg-slate-900 text-white border-b border-slate-700/90 px-3 sm:px-5 py-2.5 z-30 shadow-md">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Left: Exam Identity + Subject + Question Counter */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="min-w-0 space-y-0.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-display font-black text-xs sm:text-sm text-amber-300 truncate max-w-[230px] sm:max-w-[420px]">
                  {examTitle}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-600/80 border border-indigo-400/40 text-white font-bold text-[10px] sm:text-[11px] truncate max-w-[160px] sm:max-w-[240px]">
                  {subjectName}
                </span>
                {verificationBadge === 'green' && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-black text-[10px]">
                    🟢 GREEN VERIFIED
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold text-slate-300">
                <span className="font-mono tabular-nums text-white font-bold">
                  Q {questionNumber}/{totalQuestions}
                </span>
                {subtitle && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span className="truncate max-w-[240px] sm:max-w-none">{subtitle}</span>
                  </>
                )}
              </div>
            </div>

            {/* Mobile-only Quick Timer Pill beside Title */}
            {isTimed && (
              <div
                aria-live="polite"
                className={`sm:hidden shrink-0 px-2.5 py-1.5 rounded-xl border font-mono tabular-nums font-black text-xs flex items-center gap-1.5 ${
                  isUrgent
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                    : isWarning
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800 text-emerald-300 border-slate-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{formatTimerDisplay(remainingSeconds!, timerFormat)}</span>
              </div>
            )}
          </div>

          {/* Right: Remaining Time + Screen Adjustment + Fullscreen Toggle + Back to Dashboard */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop/Tablet Timer Pill */}
            {isTimed && (
              <div
                aria-live="polite"
                className={`hidden sm:flex min-h-[40px] px-3 py-1.5 rounded-xl border font-mono tabular-nums font-black text-xs sm:text-sm items-center gap-1.5 ${
                  isUrgent
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                    : isWarning
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800 text-emerald-300 border-slate-600'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>{formatTimerDisplay(remainingSeconds!, timerFormat)}</span>
              </div>
            )}

            {/* SCREEN ADJUSTMENT Button & Dropdown (AUTO FIT | LANDSCAPE 16:9 | PORTRAIT 9:16) */}
            <div ref={screenMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowScreenMenu((prev) => !prev)}
                aria-expanded={showScreenMenu}
                aria-haspopup="menu"
                className="min-h-[40px] sm:min-h-[42px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="hidden min-[400px]:inline">Screen Adjustment</span>
                <span className="min-[400px]:hidden">Screen</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">
                  {activeModeMeta.shortTag}
                </span>
              </button>

              {showScreenMenu && (
                <div
                  role="menu"
                  aria-label="Screen Adjustment Options"
                  className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white text-slate-900 border-2 border-slate-200 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in"
                >
                  <div className="px-2.5 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Screen Adjustment Layout
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Switches layout smoothly without losing answers or timer.
                    </p>
                  </div>
                  {SCREEN_MODE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = screenMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        role="menuitemradio"
                        aria-checked={active}
                        type="button"
                        onClick={() => {
                          setScreenMode(opt.id);
                          setShowScreenMenu(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 cursor-pointer transition-colors ${
                          active
                            ? 'bg-indigo-50 border border-indigo-400 text-indigo-950'
                            : 'hover:bg-slate-50 border border-transparent text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display font-black text-xs">{opt.title}</span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                              {opt.shortTag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* START FULL SCREEN / Exit Full Screen Button */}
            {!isFullscreen ? (
              <button
                type="button"
                onClick={() => void enterFullscreen()}
                className="min-h-[40px] sm:min-h-[42px] px-3 sm:px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black text-[11px] sm:text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                <span>START FULL SCREEN</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void exitFullscreen()}
                className="min-h-[40px] sm:min-h-[42px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 font-bold text-[11px] sm:text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5 shrink-0 text-amber-300" />
                <span>Exit Full Screen</span>
              </button>
            )}

            {/* Back to Dashboard Button */}
            <button
              type="button"
              onClick={() => setShowDashboardConfirm(true)}
              className="min-h-[40px] sm:min-h-[42px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden min-[460px]:inline">Back to Dashboard</span>
              <span className="min-[460px]:hidden">Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          CENTER STAGE CONTAINER (Adapts smoothly across Auto / 16:9 / 9:16)
         =================================================================== */}
      <div className="flex-1 min-h-0 flex flex-col p-0 sm:p-2 md:p-3 overflow-hidden">
        <div className={stageFrameClass}>
          {/* Optional Alerts & Section Navigation Tabs */}
          {(alertBanner || sectionTabsSlot) && (
            <div className="shrink-0 bg-slate-50 border-b border-slate-200 px-3 sm:px-5 py-2 space-y-2">
              {alertBanner}
              {sectionTabsSlot}
            </div>
          )}

          {/* Main Workspace Grid (Question Stage + Palette Sidebar) */}
          <div className={workspaceGridClass}>
            {/* Left / Center Question Display Column */}
            <div className={questionColSpanClass}>
              {/* Scrollable Question & Options Area */}
              <div
                ref={questionScrollRef}
                className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-7 space-y-5"
              >
                {/* Question Header Metadata Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-mono tabular-nums font-black text-xs">
                      Question {questionNumber} of {totalQuestions}
                    </span>
                    {verificationBadge === 'green' && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-[11px] flex items-center gap-1">
                        🟢 GREEN VERIFIED
                      </span>
                    )}
                    {verificationBadge === 'pending' && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[11px]">
                        ⏳ Verification Pending
                      </span>
                    )}
                    {formatBadge && (
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border ${
                          formatBadge.className || 'bg-indigo-100 text-indigo-800 border-indigo-200'
                        }`}
                      >
                        {formatBadge.label}
                      </span>
                    )}
                    {topicLabel && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px]">
                        {topicLabel}
                      </span>
                    )}
                    {marksLabel && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-[11px]">
                        {marksLabel}
                      </span>
                    )}
                    {isMarkedForReview && (
                      <span className="px-2.5 py-1 rounded-lg bg-violet-100 border border-violet-300 text-violet-900 font-extrabold text-[11px]">
                        Marked for Review
                      </span>
                    )}
                  </div>

                  {headerRightExtra && <div className="flex items-center gap-2">{headerRightExtra}</div>}
                </div>

                {/* Optional Media / Emoji Visual */}
                {questionMediaSlot}

                {/* Complete Question Text */}
                <div
                  className={`font-display font-bold text-slate-900 leading-relaxed whitespace-pre-line ${
                    screenMode === 'portrait'
                      ? 'text-base sm:text-lg'
                      : 'text-base sm:text-lg md:text-[19px]'
                  }`}
                >
                  {questionText}
                </div>

                {/* Optional Rough Work / Supplemental Input Slot */}
                {afterStemSlot}

                {/* 4 Answer Options */}
                <div className={`grid gap-3 pt-1 ${effectiveOptionsGridClass}`}>
                  {options.map((optText, oIdx) => {
                    const isSelected = selectedOptionIndex === oIdx;
                    const isRight = isAnswerLocked && correctOptionIndex === oIdx;
                    const isWrongSelected =
                      isAnswerLocked && isSelected && correctOptionIndex !== oIdx;
                    const badgeLabel =
                      optionBadgeType === 'numeric'
                        ? String(oIdx + 1)
                        : String.fromCharCode(65 + oIdx);

                    let btnStyle =
                      'bg-white hover:bg-amber-50/70 border-slate-200 hover:border-amber-400 text-slate-900';

                    if (isAnswerLocked) {
                      if (isRight) {
                        btnStyle =
                          'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-bold';
                      } else if (isWrongSelected) {
                        btnStyle =
                          'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-70';
                      }
                    } else if (isSelected) {
                      btnStyle =
                        'bg-amber-50 border-amber-600 text-slate-950 ring-2 ring-amber-300 font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={isAnswerLocked}
                        onClick={() => onSelectOption(oIdx)}
                        className={`w-full min-h-[52px] p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-start justify-between gap-3 ${
                          isAnswerLocked ? 'cursor-default' : 'cursor-pointer'
                        } ${btnStyle}`}
                      >
                        <span className="flex items-start gap-3 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-lg font-display font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                              isRight
                                ? 'bg-emerald-600 text-white'
                                : isWrongSelected
                                ? 'bg-rose-600 text-white'
                                : isSelected
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 text-slate-800 border border-slate-300'
                            }`}
                          >
                            {badgeLabel}
                          </span>
                          <span className="text-sm sm:text-base leading-snug break-words">
                            {optText}
                          </span>
                        </span>
                        {isRight && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isWrongSelected && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        {!isAnswerLocked && isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation Slot (when immediate-feedback quiz is checked) */}
                {instantFeedbackSlot}
              </div>

              {/* =============================================================
                  BOTTOM NAVIGATION CONTROLS BAR
                 ============================================================= */}
              <footer className="shrink-0 bg-slate-50 border-t border-slate-200 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {onPrevious && (
                    <button
                      type="button"
                      disabled={!canPrevious || currentIndex === 0}
                      onClick={onPrevious}
                      className="min-h-[44px] px-3 sm:px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 disabled:opacity-40 text-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  )}

                  {onClearAnswer && (
                    <button
                      type="button"
                      disabled={!canClearAnswer}
                      onClick={onClearAnswer}
                      className="min-h-[44px] px-3 py-2 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-300 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span className="hidden min-[440px]:inline">Clear Answer</span>
                      <span className="min-[440px]:hidden">Clear</span>
                    </button>
                  )}

                  {onToggleMarkForReview && (
                    <button
                      type="button"
                      onClick={onToggleMarkForReview}
                      className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isMarkedForReview
                          ? 'bg-violet-700 border-violet-700 text-white'
                          : 'bg-white border-slate-300 hover:bg-violet-50 text-slate-700'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}
                      </span>
                      <span className="sm:hidden">Review</span>
                    </button>
                  )}

                  {/* Mobile / Portrait Palette Drawer Trigger */}
                  <button
                    type="button"
                    onClick={() => setShowPaletteDrawer(true)}
                    className={`${showPaletteToggleBtn} min-h-[44px] px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs items-center gap-1.5 cursor-pointer transition-colors`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>
                      Palette ({computedStats.answered}/{totalQuestions})
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  {primaryActionOverride ? (
                    <button
                      type="button"
                      disabled={primaryActionOverride.disabled}
                      onClick={primaryActionOverride.onClick}
                      className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-xl font-display font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed shadow-sm transition-colors ${
                        primaryActionOverride.tone === 'emerald'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : primaryActionOverride.tone === 'indigo'
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      <span>{primaryActionOverride.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    showNextButton &&
                    onNext &&
                    currentIndex < totalQuestions - 1 && (
                      <button
                        type="button"
                        onClick={onNext}
                        className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-display font-black text-xs sm:text-sm flex items-center gap-1 cursor-pointer shadow-sm transition-colors"
                      >
                        <span>{nextLabel}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={onSubmitTest}
                    className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{submitLabel}</span>
                  </button>
                </div>
              </footer>
            </div>

            {/* Right Sidebar Question Palette (Desktop / Landscape Mode) */}
            <aside className={showSidebarPalette}>{renderPaletteBody(false)}</aside>
          </div>
        </div>
      </div>

      {/* ===================================================================
          MOBILE / PORTRAIT PALETTE DRAWER MODAL
         =================================================================== */}
      {showPaletteDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Question Navigation Palette"
          className="fixed inset-0 z-[110] bg-slate-950/65 backdrop-blur-xs flex justify-end"
        >
          <div className="fixed inset-0" onClick={() => setShowPaletteDrawer(false)} />
          <div className="relative z-10 w-full max-w-sm h-full bg-slate-50 shadow-2xl border-l border-slate-200 flex flex-col">
            {renderPaletteBody(true)}
          </div>
        </div>
      )}

      {/* ===================================================================
          BACK TO DASHBOARD CONFIRMATION MODAL (Never loses progress silently)
         =================================================================== */}
      {showDashboardConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exam-exit-dashboard-title"
          className="fixed inset-0 z-[115] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-amber-300 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3
                  id="exam-exit-dashboard-title"
                  className="font-display font-black text-lg text-slate-900"
                >
                  Return to Dashboard?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {progressSavedMessage}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDashboardConfirm(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDashboardConfirm(false);
                  void exitFullscreen().then(() => {
                    onBackToDashboard();
                  });
                }}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display font-black text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                Yes, Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* External Component Modals (e.g., Submit Confirmation Modal or Question Report Modal) */}
      {externalModals}
    </div>
  );
};
