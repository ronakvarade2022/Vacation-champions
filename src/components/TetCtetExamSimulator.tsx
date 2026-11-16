import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Eye,
  Flag,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  TetCtetAttemptRecord,
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetModuleId,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestion,
  TetCtetSubjectId,
  TetCtetSubjectScoreEntry,
} from '../types/tetCtet';
import { TET_CTET_MODULES, TET_CTET_EXAM_DURATION_SECONDS } from '../data/tetCtetSyllabi';
import {
  getReportStatusBadgeStyle,
  TetCtetReportQuestionModal,
} from './TetCtetReportQuestionModal';
import {
  getStudentReportsForQuestion,
  subscribeToQuestionErrorReports,
} from '../services/questionErrorReportService';

const STORAGE_KEY = 'vc_tet_ctet_active_exam_v1';

interface SavedExamState {
  sessionKey: string;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  moduleId: TetCtetModuleId;
  mode: TetCtetPoolType;
  mockTestNumber?: number;
  practiceTitle?: string;
  language1: TetCtetLanguage;
  language2: TetCtetLanguage;
  medium: TetCtetMedium;
  stream?: TetCtetPaper2Stream;
  durationSeconds: number;
  startedAtMs: number;
  deadlineMs: number;
  currentIdx: number;
  answers: Record<number, number>;
  visited: Record<number, boolean>;
  marked: Record<number, boolean>;
  alertsShown: number[];
}

export interface TetCtetExamSimulatorProps {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  moduleId: TetCtetModuleId;
  mode: TetCtetPoolType;
  mockTestNumber?: number;
  practiceTitle?: string;
  questions: TetCtetQuestion[];
  language1: TetCtetLanguage;
  language2: TetCtetLanguage;
  medium: TetCtetMedium;
  stream?: TetCtetPaper2Stream;
  durationSeconds?: number;
  studentId: string;
  studentName?: string;
  autoStartSkipInstructions?: boolean;
  onSaveAttempt: (attempt: Omit<TetCtetAttemptRecord, 'id' | 'completedAt'>) => Promise<TetCtetAttemptRecord>;
  onPractiseWeakTopic: (subjectId: TetCtetSubjectId) => void;
  onExit: () => void;
  onOpenPerformanceTab: () => void;
}

export function formatHhMmSs(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const TetCtetExamSimulator: React.FC<TetCtetExamSimulatorProps> = ({
  exam,
  paper,
  moduleId,
  mode,
  mockTestNumber,
  practiceTitle,
  questions,
  language1,
  language2,
  medium,
  stream = 'MATH_SCIENCE',
  durationSeconds = mode === 'MOCK'
    ? TET_CTET_EXAM_DURATION_SECONDS
    : Math.max(1800, questions.length * 60),
  studentId,
  studentName = 'Student Candidate',
  autoStartSkipInstructions = false,
  onSaveAttempt,
  onPractiseWeakTopic,
  onExit,
  onOpenPerformanceTab,
}) => {
  const modMeta = TET_CTET_MODULES[moduleId];
  const sessionKey = `${moduleId}_${mode}_${mockTestNumber || practiceTitle || 'set'}_${language1}_${language2}_${medium}_${stream}`;

  const [phase, setPhase] = useState<'instructions' | 'taking' | 'result'>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: SavedExamState = JSON.parse(raw);
        if (parsed.sessionKey === sessionKey && parsed.deadlineMs > Date.now()) {
          return 'taking';
        }
      }
    } catch {}
    return autoStartSkipInstructions ? 'taking' : 'instructions';
  });

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [startedAtMs, setStartedAtMs] = useState<number>(0);
  const [deadlineMs, setDeadlineMs] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(durationSeconds);
  const [timeWarningBanner, setTimeWarningBanner] = useState<string | null>(null);
  const [alertsShown, setAlertsShown] = useState<number[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Result states (open Question Review automatically after test submission)
  const [submittedAttempt, setSubmittedAttempt] = useState<TetCtetAttemptRecord | null>(null);
  const [resultViewTab, setResultViewTab] = useState<'summary' | 'review' | 'explanations'>('review');
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'CORRECT' | 'INCORRECT' | 'UNATTEMPTED'>('ALL');
  const [reviewSubjectFilter, setReviewSubjectFilter] = useState<string>('ALL');

  // Student Question Error Reporting state (read-only question bank, separate report storage)
  const [reportingQuestion, setReportingQuestion] = useState<TetCtetQuestion | null>(null);
  const [reportRefreshTick, setReportRefreshTick] = useState<number>(0);

  useEffect(() => {
    return subscribeToQuestionErrorReports(() => {
      setReportRefreshTick((prev) => prev + 1);
    });
  }, []);

  // Hydrate active session on mount if valid
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: SavedExamState = JSON.parse(raw);
        if (parsed.sessionKey === sessionKey && parsed.deadlineMs > Date.now()) {
          setCurrentIdx(parsed.currentIdx || 0);
          setAnswers(parsed.answers || {});
          setVisited(parsed.visited || { 0: true });
          setMarked(parsed.marked || {});
          setStartedAtMs(parsed.startedAtMs);
          setDeadlineMs(parsed.deadlineMs);
          setRemainingSeconds(Math.max(0, Math.ceil((parsed.deadlineMs - Date.now()) / 1000)));
          setAlertsShown(parsed.alertsShown || []);
          setPhase('taking');
          return;
        }
      }
    } catch {}

    if (autoStartSkipInstructions && phase === 'taking' && deadlineMs === 0) {
      const now = Date.now();
      setStartedAtMs(now);
      setDeadlineMs(now + durationSeconds * 1000);
      setRemainingSeconds(durationSeconds);
      setVisited({ 0: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  // Persist exam progress immediately on any answer / mark / index change
  useEffect(() => {
    if (phase !== 'taking' || !deadlineMs) return;
    const payload: SavedExamState = {
      sessionKey,
      exam,
      paper,
      moduleId,
      mode,
      mockTestNumber,
      practiceTitle,
      language1,
      language2,
      medium,
      stream,
      durationSeconds,
      startedAtMs,
      deadlineMs,
      currentIdx,
      answers,
      visited,
      marked,
      alertsShown,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    phase,
    sessionKey,
    exam,
    paper,
    moduleId,
    mode,
    mockTestNumber,
    practiceTitle,
    language1,
    language2,
    medium,
    stream,
    durationSeconds,
    startedAtMs,
    deadlineMs,
    currentIdx,
    answers,
    visited,
    marked,
    alertsShown,
  ]);

  const handleFinalSubmit = useCallback(async () => {
    setShowSubmitModal(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    const elapsedSeconds = startedAtMs
      ? Math.min(durationSeconds, Math.max(1, Math.round((Date.now() - startedAtMs) / 1000)))
      : durationSeconds - remainingSeconds;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const incorrectNumbers: number[] = [];

    const breakdownMap: Record<string, TetCtetSubjectScoreEntry> = {};

    questions.forEach((q, idx) => {
      const sel = answers[idx];
      if (!breakdownMap[q.subjectId]) {
        breakdownMap[q.subjectId] = {
          subjectId: q.subjectId,
          label: q.subjectLabel,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          total: 0,
          marks: 0,
          maxMarks: 0,
          percentage: 0,
        };
      }
      const entry = breakdownMap[q.subjectId];
      entry.total += 1;
      entry.maxMarks += q.marks || 1;

      if (sel === undefined || sel === null) {
        unattemptedCount++;
        entry.unattempted += 1;
      } else if (sel === q.correctAnswer) {
        correctCount++;
        entry.correct += 1;
        entry.marks += q.marks || 1;
      } else {
        incorrectCount++;
        entry.incorrect += 1;
        incorrectNumbers.push(q.questionNumber);
      }
    });

    const strongSubjects: string[] = [];
    const weakSubjects: string[] = [];
    Object.values(breakdownMap).forEach((entry) => {
      entry.percentage = entry.maxMarks > 0 ? Math.round((entry.marks / entry.maxMarks) * 100) : 0;
      if (entry.percentage >= 70) strongSubjects.push(entry.label);
      else if (entry.percentage < 55) weakSubjects.push(entry.label);
    });

    const totalQ = questions.length;
    const maxMarks = totalQ;
    const marksObtained = correctCount;
    const percentage = totalQ > 0 ? Math.round((marksObtained / maxMarks) * 100) : 0;
    const attemptedTotal = correctCount + incorrectCount;
    const accuracy = attemptedTotal > 0 ? Math.round((correctCount / attemptedTotal) * 100) : 0;
    const qualified = percentage >= 60;

    const saved = await onSaveAttempt({
      studentId,
      moduleId,
      exam,
      paper,
      mode,
      mockTestNumber,
      practiceTitle,
      stream: paper === 2 ? stream : undefined,
      language1,
      language2,
      medium,
      totalQuestions: totalQ,
      maxMarks,
      marksObtained,
      correctCount,
      incorrectCount,
      unattemptedCount,
      percentage,
      accuracy,
      timeTakenSeconds: elapsedSeconds,
      qualified,
      subjectBreakdown: breakdownMap,
      weakSubjects,
      strongSubjects,
      answers,
      incorrectQuestionNumbers: incorrectNumbers,
    });

    setSubmittedAttempt(saved);
    setPhase('result');
    setResultViewTab('review');

    if (percentage >= 60) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  }, [
    answers,
    durationSeconds,
    exam,
    language1,
    language2,
    medium,
    mockTestNumber,
    moduleId,
    onSaveAttempt,
    paper,
    practiceTitle,
    questions,
    remainingSeconds,
    startedAtMs,
    stream,
    studentId,
    mode,
  ]);

  // Continuous Countdown Timer & Milestone Warnings (30m, 10m, 5m, 0s auto-submit)
  useEffect(() => {
    if (phase !== 'taking' || !deadlineMs) return;

    const tick = () => {
      const secs = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
      setRemainingSeconds(secs);

      if (secs <= 1800 && secs > 600 && !alertsShown.includes(30)) {
        setAlertsShown((prev) => [...prev, 30]);
        setTimeWarningBanner('Time Alert: 30 Minutes Remaining. Review pacing across remaining sections.');
      } else if (secs <= 600 && secs > 300 && !alertsShown.includes(10)) {
        setAlertsShown((prev) => [...prev, 10]);
        setTimeWarningBanner('Time Alert: 10 Minutes Remaining! Please complete unattempted questions.');
      } else if (secs <= 300 && secs > 0 && !alertsShown.includes(5)) {
        setAlertsShown((prev) => [...prev, 5]);
        setTimeWarningBanner('Final Warning: Only 5 Minutes Remaining! No negative marking — attempt every question.');
      }

      if (secs <= 0) {
        void handleFinalSubmit();
      }
    };

    tick();
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [phase, deadlineMs, alertsShown, handleFinalSubmit]);

  const handleStartExamination = () => {
    const now = Date.now();
    const dl = now + durationSeconds * 1000;
    setStartedAtMs(now);
    setDeadlineMs(dl);
    setRemainingSeconds(durationSeconds);
    setCurrentIdx(0);
    setAnswers({});
    setMarked({});
    setVisited({ 0: true });
    setAlertsShown([]);
    setTimeWarningBanner(null);
    setPhase('taking');
  };

  const navigateToQuestion = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    setCurrentIdx(idx);
    setVisited((prev) => ({ ...prev, [idx]: true }));
    setShowMobilePalette(false);
  };

  const handleSelectOption = (optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }));
    setVisited((prev) => ({ ...prev, [currentIdx]: true }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentIdx];
      return next;
    });
  };

  const handleMarkForReview = () => {
    setMarked((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
    setVisited((prev) => ({ ...prev, [currentIdx]: true }));
  };

  const handleSaveAndNext = () => {
    setVisited((prev) => ({ ...prev, [currentIdx]: true }));
    if (currentIdx + 1 < questions.length) {
      navigateToQuestion(currentIdx + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Palette Statistics (5 Required States)
  const paletteCounts = useMemo(() => {
    let notVisited = 0;
    let notAnswered = 0;
    let answered = 0;
    let markedOnly = 0;
    let answeredAndMarked = 0;

    for (let i = 0; i < questions.length; i++) {
      const isVis = Boolean(visited[i]);
      const hasAns = answers[i] !== undefined;
      const isMk = Boolean(marked[i]);

      if (!isVis && !hasAns && !isMk) notVisited++;
      else if (hasAns && isMk) answeredAndMarked++;
      else if (!hasAns && isMk) markedOnly++;
      else if (hasAns) answered++;
      else notAnswered++;
    }
    return { notVisited, notAnswered, answered, markedOnly, answeredAndMarked };
  }, [questions.length, visited, answers, marked]);

  const subjectSectionJumps = useMemo(() => {
    const groups: Array<{ subjectId: TetCtetSubjectId; label: string; firstIdx: number; count: number }> = [];
    const seen = new Map<TetCtetSubjectId, number>();
    questions.forEach((q, idx) => {
      if (!seen.has(q.subjectId)) {
        seen.set(q.subjectId, groups.length);
        groups.push({ subjectId: q.subjectId, label: q.subjectLabel, firstIdx: idx, count: 1 });
      } else {
        const pos = seen.get(q.subjectId)!;
        groups[pos].count += 1;
      }
    });
    return groups;
  }, [questions]);

  const currentQuestion = questions[currentIdx];

  // =========================================================================
  // VIEW 1: PRE-EXAM OFFICIAL INSTRUCTIONS (Timer has NOT started yet)
  // =========================================================================
  if (phase === 'instructions') {
    const examTitleText = exam === 'MAHA_TET' ? 'MAHA TET (MSCE Pune)' : 'CTET (CBSE New Delhi)';
    const testLabel =
      mode === 'MOCK'
        ? `Full-Length Mock Test ${String(mockTestNumber || 1).padStart(2, '0')} of 50`
        : practiceTitle || 'Targeted Practice Set';

    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-5 sm:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              Official CBT Examination Instructions
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-0.5">
              {examTitleText} — {modMeta.paperTitle}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">{testLabel}</p>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {modMeta.examTitle}</span>
          </button>
        </div>

        {/* Key Official Examination Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Questions</span>
            <span className="text-lg font-display font-black text-slate-900">{questions.length} MCQs</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Marks</span>
            <span className="text-lg font-display font-black text-slate-900">{questions.length} Marks</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
            <span className="text-[11px] font-bold text-indigo-700 uppercase block">Official Duration</span>
            <span className="text-lg font-mono tabular-nums font-black text-indigo-950">
              {formatHhMmSs(durationSeconds)}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-700 uppercase block">Marking Rule</span>
            <span className="text-sm sm:text-base font-display font-black text-emerald-950">
              +1 Correct · 0 Negative
            </span>
          </div>
        </div>

        {/* Candidate Language & Stream Selection Summary */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
          <p className="font-extrabold text-amber-950">
            Configured Examination Languages &amp; Paper Selection:
          </p>
          <div className="flex flex-wrap gap-4 font-bold text-slate-800">
            <span>Language 1: <strong className="text-indigo-800">{language1}</strong></span>
            <span>Language 2: <strong className="text-indigo-800">{language2}</strong></span>
            <span>Core Subject Medium: <strong className="text-indigo-800">{medium}</strong></span>
            {paper === 2 && (
              <span>
                Paper 2 Stream:{' '}
                <strong className="text-indigo-800">
                  {stream === 'SOCIAL_STUDIES' ? 'Social Studies / Social Science (60 Qs)' : 'Mathematics & Science (60 Qs)'}
                </strong>
              </span>
            )}
          </div>
        </div>

        {/* Section-wise Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-display font-extrabold text-slate-900">
            Question Distribution in This Paper
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {subjectSectionJumps.map((sec) => (
              <div
                key={sec.subjectId}
                className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2"
              >
                <span className="font-bold text-slate-800 truncate">{sec.label}</span>
                <span className="font-mono font-black text-indigo-800 shrink-0">
                  {sec.count} Qs · {sec.count}M
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Question Palette Status Legend */}
        <div className="space-y-2">
          <h3 className="text-sm font-display font-extrabold text-slate-900">
            Question Palette Symbols &amp; Timer Rules
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-300">
              <span className="w-6 h-6 rounded-md bg-white border border-slate-400 text-slate-700 flex items-center justify-center text-[11px] shrink-0">1</span>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200">
              <span className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center text-[11px] shrink-0">2</span>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[11px] shrink-0">3</span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-violet-50 border border-violet-200">
              <span className="w-6 h-6 rounded-md bg-violet-600 text-white flex items-center justify-center text-[11px] shrink-0">4</span>
              <span>Marked Review</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-indigo-50 border border-indigo-200 col-span-2 sm:col-span-1">
              <span className="w-6 h-6 rounded-md bg-indigo-700 text-white flex items-center justify-center text-[11px] shrink-0">✓</span>
              <span className="leading-tight">Answered &amp; Marked</span>
            </div>
          </div>
          <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1 pt-2 font-medium">
            <li>The countdown timer ({formatHhMmSs(durationSeconds)}) begins only when you click <strong>START EXAMINATION</strong>.</li>
            <li>Every selected option is auto-saved instantly; page reload preserves your timer and saved responses.</li>
            <li>On-screen alerts notify you at 30 minutes, 10 minutes, and 5 minutes remaining. Test auto-submits when the clock reaches 00:00:00.</li>
            <li><strong>There is NO negative marking</strong> in MAHA TET and CTET examinations.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onExit}
            className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStartExamination}
            className="min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white font-display font-black text-sm sm:text-base shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START EXAMINATION</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: LIVE COMPETITIVE EXAM SIMULATOR
  // =========================================================================
  if (phase === 'taking' && currentQuestion) {
    const isUrgent = remainingSeconds <= 300;
    const isWarning = remainingSeconds <= 600 && remainingSeconds > 300;
    const isAmber = remainingSeconds <= 1800 && remainingSeconds > 600;
    const selectedOpt = answers[currentIdx];
    const isMarked = Boolean(marked[currentIdx]);

    return (
      <div className="space-y-4 max-w-7xl mx-auto">
        {/* Top Competitive Exam Status Header */}
        <header className="sticky top-2 z-30 rounded-2xl bg-slate-900 text-white p-3.5 sm:p-4 shadow-lg border border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                <span>EXAMINATION: {modMeta.examTitle}</span>
                <span>•</span>
                <span>PAPER NUMBER: Paper {paper}</span>
                <span>•</span>
                <span>TOTAL QUESTIONS: {questions.length}</span>
                <span>•</span>
                <span>TOTAL MARKS: {questions.length}</span>
              </div>
              <p className="text-xs sm:text-sm font-display font-extrabold text-amber-300 mt-0.5 truncate">
                {mode === 'MOCK'
                  ? `Mock Test ${String(mockTestNumber || 1).padStart(2, '0')} · L1: ${language1} · L2: ${language2} · Medium: ${medium}`
                  : `${practiceTitle || 'Practice Set'} · L1: ${language1} · L2: ${language2}`}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <div
                aria-live="polite"
                className={`px-3.5 py-2 rounded-xl border font-mono tabular-nums font-black text-sm sm:text-base flex items-center gap-2 ${
                  isUrgent
                    ? 'bg-rose-600 text-white border-rose-400'
                    : isWarning
                    ? 'bg-orange-500 text-white border-orange-300'
                    : isAmber
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800 text-emerald-300 border-slate-600'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>TIME REMAINING: {formatHhMmSs(remainingSeconds)}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowMobilePalette((prev) => !prev)}
                className="lg:hidden min-h-[42px] px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs cursor-pointer"
              >
                Palette ({paletteCounts.answered}/{questions.length})
              </button>
            </div>
          </div>
        </header>

        {/* 30m / 10m / 5m Alert Banner */}
        {timeWarningBanner && (
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-400 px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-amber-950 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{timeWarningBanner}</span>
            </div>
            <button
              type="button"
              onClick={() => setTimeWarningBanner(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-extrabold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Section Subject Quick Jump Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {subjectSectionJumps.map((sec) => {
            const isCurrentSec = currentQuestion.subjectId === sec.subjectId;
            return (
              <button
                key={sec.subjectId}
                type="button"
                onClick={() => navigateToQuestion(sec.firstIdx)}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-display font-black whitespace-nowrap cursor-pointer transition-all shrink-0 border ${
                  isCurrentSec
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sec.label} ({sec.count})
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Simulator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Question Card (Left 8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-mono font-black text-xs">
                  Question {currentQuestion.questionNumber} of {questions.length}
                </span>
                <span className="text-xs font-bold text-indigo-800">
                  {currentQuestion.subjectLabel} · {currentQuestion.topic}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                <span className="hidden sm:inline">+1 Mark · 0 Negative</span>
                {isMarked && (
                  <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 font-extrabold">
                    Marked for Review
                  </span>
                )}
              </div>
            </div>

            {/* Question Stem */}
            <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQuestion.question}
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((optText, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const letter = String.fromCharCode(65 + oIdx);
                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full min-h-[52px] p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg font-display font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-700 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                      {optText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Control Buttons Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => navigateToQuestion(currentIdx - 1)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-45 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearResponse}
                  disabled={selectedOpt === undefined}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-45 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Eraser className="w-4 h-4" />
                  <span>Clear Response</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkForReview}
                  className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer border ${
                    isMarked
                      ? 'bg-violet-700 text-white border-violet-700'
                      : 'bg-violet-50 hover:bg-violet-100 text-violet-900 border-violet-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{isMarked ? 'Unmark Review' : 'Mark for Review'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Save &amp; Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Test</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette (Right 4 cols on desktop, toggleable drawer on mobile) */}
          <aside
            className={`lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-5 space-y-4 ${
              showMobilePalette ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-display font-black text-slate-900">
                Question Palette ({questions.length})
              </h3>
              <span className="text-[11px] font-bold text-emerald-700">Auto-Saved</span>
            </div>

            {/* 5 Status Counters */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded bg-white border border-slate-400 text-slate-800 flex items-center justify-center font-mono text-[10px]">
                  {paletteCounts.notVisited}
                </span>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200">
                <span className="w-5 h-5 rounded bg-rose-600 text-white flex items-center justify-center font-mono text-[10px]">
                  {paletteCounts.notAnswered}
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center font-mono text-[10px]">
                  {paletteCounts.answered}
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-violet-50 border border-violet-200">
                <span className="w-5 h-5 rounded bg-violet-600 text-white flex items-center justify-center font-mono text-[10px]">
                  {paletteCounts.markedOnly}
                </span>
                <span>Marked Review</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 p-2 rounded-xl bg-indigo-50 border border-indigo-200">
                <span className="w-5 h-5 rounded bg-indigo-700 text-white flex items-center justify-center font-mono text-[10px]">
                  {paletteCounts.answeredAndMarked}
                </span>
                <span>Answered and Marked for Review</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isVis = Boolean(visited[idx]);
                const hasAns = answers[idx] !== undefined;
                const isMk = Boolean(marked[idx]);
                const isCurr = idx === currentIdx;

                let statusClass = 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100';
                if (hasAns && isMk) statusClass = 'bg-indigo-700 border-indigo-800 text-white';
                else if (!hasAns && isMk) statusClass = 'bg-violet-600 border-violet-700 text-white';
                else if (hasAns) statusClass = 'bg-emerald-600 border-emerald-700 text-white';
                else if (isVis) statusClass = 'bg-rose-600 border-rose-700 text-white';

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => navigateToQuestion(idx)}
                    aria-label={`Jump to Question ${q.questionNumber}`}
                    className={`relative h-9 rounded-lg border font-mono font-bold text-xs cursor-pointer transition-all ${statusClass} ${
                      isCurr ? 'ring-2 ring-offset-1 ring-amber-500 scale-105' : ''
                    }`}
                  >
                    {q.questionNumber}
                    {hasAns && isMk && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-950 text-[8px] font-black flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-display font-black text-slate-900">
                Submit Examination Now?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Please verify your response summary before final submission. Remember, there is zero negative marking.
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  Answered: {paletteCounts.answered + paletteCounts.answeredAndMarked}
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  Not Answered: {paletteCounts.notAnswered}
                </div>
                <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-900">
                  Marked Review: {paletteCounts.markedOnly + paletteCounts.answeredAndMarked}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  Not Visited: {paletteCounts.notVisited}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Resume Exam
                </button>
                <button
                  type="button"
                  onClick={() => void handleFinalSubmit()}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs cursor-pointer"
                >
                  Confirm Final Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: RESULT & PERFORMANCE DASHBOARD + ANSWER REVIEW + EXPLANATIONS
  // =========================================================================
  if (phase === 'result' && submittedAttempt) {
    const breakdownList = Object.values(submittedAttempt.subjectBreakdown);
    const weakestEntry =
      breakdownList.length > 0
        ? [...breakdownList].sort((a, b) => a.percentage - b.percentage)[0]
        : null;

    const filteredReviewQuestions = questions
      .map((q, idx) => ({ q, idx, selected: answers[idx] }))
      .filter(({ q, selected }) => {
        if (reviewSubjectFilter !== 'ALL' && q.subjectId !== reviewSubjectFilter) return false;
        if (reviewFilter === 'CORRECT') return selected === q.correctAnswer;
        if (reviewFilter === 'INCORRECT') return selected !== undefined && selected !== q.correctAnswer;
        if (reviewFilter === 'UNATTEMPTED') return selected === undefined;
        return true;
      });

    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Top Result Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                Examination Result Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
                {modMeta.examTitle} {modMeta.paperTitle} —{' '}
                {mode === 'MOCK'
                  ? `Mock Test ${String(mockTestNumber || 1).padStart(2, '0')}`
                  : practiceTitle || 'Practice Assessment'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                L1: {language1} · L2: {language2} · Medium: {medium} · Time Consumed:{' '}
                <span className="font-mono font-bold text-slate-900">
                  {formatHhMmSs(submittedAttempt.timeTakenSeconds)}
                </span>
              </p>
            </div>

            <div
              className={`px-4 py-2.5 rounded-2xl border font-display font-black text-xs sm:text-sm flex items-center gap-2 ${
                submittedAttempt.qualified
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : submittedAttempt.percentage >= 55
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>
                {submittedAttempt.qualified
                  ? 'Qualifying Score Reached (≥60%)'
                  : submittedAttempt.percentage >= 55
                  ? 'Reserved Category Qualifying Band (≥55%)'
                  : 'Needs Targeted Revision (<55%)'}
              </span>
            </div>
          </div>

          {/* 6 KPI Scorecard Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
              <span className="text-[11px] font-bold text-indigo-700 uppercase block">Total Marks</span>
              <span className="text-xl font-display font-black text-indigo-950">
                {submittedAttempt.marksObtained} / {submittedAttempt.maxMarks}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Questions</span>
              <span className="text-xl font-display font-black text-slate-900">
                {submittedAttempt.totalQuestions}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-700 uppercase block">Correct</span>
              <span className="text-xl font-display font-black text-emerald-900">
                {submittedAttempt.correctCount}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-700 uppercase block">Incorrect</span>
              <span className="text-xl font-display font-black text-rose-900">
                {submittedAttempt.incorrectCount}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Unattempted</span>
              <span className="text-xl font-display font-black text-amber-950">
                {submittedAttempt.unattemptedCount}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <span className="text-[11px] font-bold text-purple-700 uppercase block">Score % / Accuracy</span>
              <span className="text-lg font-display font-black text-purple-950">
                {submittedAttempt.percentage}% · {submittedAttempt.accuracy}%
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onOpenPerformanceTab}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs sm:text-sm cursor-pointer"
            >
              📊 VIEW PERFORMANCE
            </button>
            <button
              type="button"
              onClick={() => setResultViewTab('review')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm cursor-pointer border ${
                resultViewTab === 'review'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300'
              }`}
            >
              📖 REVIEW ANSWERS
            </button>
            <button
              type="button"
              onClick={() => setResultViewTab('explanations')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm cursor-pointer border ${
                resultViewTab === 'explanations'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
              }`}
            >
              💡 VIEW EXPLANATIONS
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmittedAttempt(null);
                setPhase('instructions');
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-display font-black text-xs sm:text-sm cursor-pointer"
            >
              🔄 RETAKE MOCK TEST
            </button>
            {weakestEntry && (
              <button
                type="button"
                onClick={() => onPractiseWeakTopic(weakestEntry.subjectId)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 font-display font-black text-xs sm:text-sm cursor-pointer"
              >
                📚 PRACTISE WEAK TOPICS ({weakestEntry.label.split(' ')[0]})
              </button>
            )}
            <button
              type="button"
              onClick={onExit}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer ml-auto"
            >
              Back to Module Hub
            </button>
          </div>
        </div>

        {/* Subject-wise Performance + Strong/Weak Diagnostics */}
        {resultViewTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>Subject-Wise Marks Breakdown</span>
              </h3>
              <div className="space-y-4">
                {breakdownList.map((sec) => (
                  <div key={sec.subjectId} className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                      <span className="text-slate-900">{sec.label}</span>
                      <span className="text-slate-600">
                        {sec.marks} / {sec.maxMarks} Marks ({sec.percentage}%) · ✓ {sec.correct} · ✗ {sec.incorrect} · — {sec.unattempted}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          sec.percentage >= 70
                            ? 'bg-emerald-600'
                            : sec.percentage >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.max(4, sec.percentage)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-emerald-50/80 rounded-3xl border border-emerald-200 p-5 space-y-2">
                <h4 className="text-sm font-display font-black text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Strong Subjects (≥70%)</span>
                </h4>
                {submittedAttempt.strongSubjects.length > 0 ? (
                  <ul className="list-disc pl-5 text-xs font-bold text-emerald-900 space-y-1">
                    {submittedAttempt.strongSubjects.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs font-semibold text-emerald-800">
                    Keep pushing accuracy above 70% to unlock strong subject mastery badges.
                  </p>
                )}
              </div>

              <div className="bg-rose-50/80 rounded-3xl border border-rose-200 p-5 space-y-2">
                <h4 className="text-sm font-display font-black text-rose-950 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-rose-700" />
                  <span>Weak Subjects (&lt;55%)</span>
                </h4>
                {submittedAttempt.weakSubjects.length > 0 ? (
                  <ul className="list-disc pl-5 text-xs font-bold text-rose-900 space-y-1">
                    {submittedAttempt.weakSubjects.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs font-semibold text-rose-800">
                    Great balance! No subject scored below 55% in this attempt.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Answer Key & Detailed Explanations View */}
        {(resultViewTab === 'review' || resultViewTab === 'explanations') && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-display font-black text-slate-900">
                  {resultViewTab === 'explanations'
                    ? '💡 Detailed Answer Explanations & Pedagogy Notes'
                    : '📖 Complete Question-by-Question Answer Review'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Showing {filteredReviewQuestions.length} of {questions.length} questions
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                {(['ALL', 'CORRECT', 'INCORRECT', 'UNATTEMPTED'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-xl cursor-pointer border ${
                      reviewFilter === f
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
                <select
                  value={reviewSubjectFilter}
                  onChange={(e) => setReviewSubjectFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="ALL">All Subjects</option>
                  {subjectSectionJumps.map((sec) => (
                    <option key={sec.subjectId} value={sec.subjectId}>
                      {sec.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredReviewQuestions.map(({ q, selected }) => {
                const isCorrect = selected === q.correctAnswer;
                const isUnattempted = selected === undefined;
                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                      isUnattempted
                        ? 'bg-slate-50/70 border-slate-200'
                        : isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                      <span className="text-slate-900">
                        Q{q.questionNumber}. {q.subjectLabel} · {q.topic}
                      </span>
                      <span
                        className={
                          isUnattempted
                            ? 'text-slate-600'
                            : isCorrect
                            ? 'text-emerald-700'
                            : 'text-rose-700'
                        }
                      >
                        {isUnattempted ? 'Unattempted (0/1)' : isCorrect ? 'Correct (+1)' : 'Incorrect (0/1)'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isRight = oIdx === q.correctAnswer;
                        const isUserPick = oIdx === selected;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border font-semibold ${
                              isRight
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                                : isUserPick
                                ? 'bg-rose-100 border-rose-400 text-rose-950'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt}{' '}
                            {isRight && ' ✓ (Correct)'}
                            {isUserPick && !isRight && ' ✗ (Your Answer)'}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 leading-relaxed">
                      <strong className="text-amber-950">Explanation:</strong> {q.explanation}
                    </div>

                    {/* Discreet Post-Submission Question Error Reporting Footer Below Each Question */}
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        {(() => {
                          void reportRefreshTick;
                          const existingReps = getStudentReportsForQuestion(studentId, q.id);
                          const latestRep = existingReps[0];
                          return latestRep ? (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-black ${getReportStatusBadgeStyle(
                                latestRep.status
                              )}`}
                            >
                              <span>Report {latestRep.reportNumber}: {latestRep.status}</span>
                            </span>
                          ) : null;
                        })()}
                      </div>
                      <button
                        type="button"
                        onClick={() => setReportingQuestion(q)}
                        className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-rose-50 text-slate-600 hover:text-rose-800 border border-slate-200 hover:border-rose-200 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span aria-hidden="true">🚩</span>
                        <span>Report an Error</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Student Question Error Report Modal (Post-Exam Question Review) */}
        {reportingQuestion && (
          <TetCtetReportQuestionModal
            isOpen={Boolean(reportingQuestion)}
            onClose={() => setReportingQuestion(null)}
            question={reportingQuestion}
            moduleId={moduleId}
            moduleTitle={`${modMeta.examTitle} ${modMeta.paperTitle}`}
            mockTestId={
              mode === 'MOCK'
                ? `${moduleId}_MOCK_${String(mockTestNumber || 1).padStart(2, '0')}`
                : `${moduleId}_${mode}`
            }
            testNumber={mockTestNumber || 1}
            selectedLanguage={String(reportingQuestion.mediumRendered || medium)}
            studentId={studentId}
            studentName={studentName}
            onSubmitted={() => setReportRefreshTick((prev) => prev + 1)}
          />
        )}
      </div>
    );
  }

  return null;
};
