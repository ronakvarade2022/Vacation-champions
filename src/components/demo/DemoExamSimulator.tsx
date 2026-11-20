import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  DemoExamAttemptRecord,
  DemoExamConfig,
  DemoExamQuestion,
  DemoExamTypeId
} from '../../data/demoExamEngine';
import { demoExamService } from '../../services/demoExamService';
import {
  UniversalExamShell,
  ExamPaletteItem,
  ExamPaletteSection,
  ExamPaletteStats,
  ExamPaletteStatus
} from '../exam/UniversalExamShell';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Check,
  AlertTriangle,
  FileText,
  Sparkles,
  Lock,
  Crown,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanSkuId } from '../../types';

interface DemoExamSimulatorProps {
  testId: DemoExamTypeId;
  studentId?: string;
  studentName?: string;
  studentRole?: string;
  onExit: () => void;
  onOpenMembership: (planSku: PlanSkuId) => void;
}

export const DemoExamSimulator: React.FC<DemoExamSimulatorProps> = ({
  testId,
  studentId = 'demo_guest_user',
  studentName = 'Guest Teacher/Student',
  studentRole = 'guest',
  onExit,
  onOpenMembership
}) => {
  const config = useMemo(() => demoExamService.getConfig(testId), [testId]);
  const questions = useMemo(() => demoExamService.getQuestions(testId), [testId]);

  // Stage: 'instructions' | 'taking' | 'submitted'
  const [stage, setStage] = useState<'instructions' | 'taking' | 'submitted'>('instructions');

  // Exam session states
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [startedAtMs, setStartedAtMs] = useState<number>(Date.now());
  const [deadlineMs, setDeadlineMs] = useState<number>(Date.now() + config.durationSeconds * 1000);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(config.durationSeconds);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState<boolean>(false);
  const [completedAttempt, setCompletedAttempt] = useState<DemoExamAttemptRecord | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Review filter tab in result view: 'all' | 'incorrect' | 'unattempted' | 'correct'
  const [resultFilter, setResultFilter] = useState<'all' | 'incorrect' | 'unattempted' | 'correct'>('all');

  const timerIntervalRef = useRef<number | null>(null);
  const hasSubmittedRef = useRef<boolean>(false);

  // 1. Check for pre-existing active session on mount
  useEffect(() => {
    const existing = demoExamService.loadActiveSession(testId);
    if (existing) {
      if (existing.isExpired) {
        // Expired while user was away: auto-submit immediately with restored answers
        setAnswers(existing.session.answers || {});
        setMarkedForReview(existing.session.markedForReview || {});
        setCurrentIndex(existing.session.currentIndex || 0);
        setIsAutoSubmitted(true);
        finalizeSubmission(existing.session.answers || {}, existing.session.markedForReview || {}, true);
      } else {
        // Resume in-progress exam
        setAnswers(existing.session.answers || {});
        setMarkedForReview(existing.session.markedForReview || {});
        setCurrentIndex(existing.session.currentIndex || 0);
        setStartedAtMs(existing.session.startedAtMs);
        setDeadlineMs(existing.session.deadlineMs);
        setRemainingSeconds(existing.remainingSeconds);
        setStage('taking');
      }
    }
  }, [testId]);

  // 2. High-precision timer that counts down based on clock deadlineMs
  useEffect(() => {
    if (stage !== 'taking') {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    const tick = () => {
      const now = Date.now();
      const diffMs = deadlineMs - now;
      const secs = Math.max(0, Math.floor(diffMs / 1000));
      setRemainingSeconds(secs);

      if (secs <= 0) {
        if (!hasSubmittedRef.current) {
          hasSubmittedRef.current = true;
          setIsAutoSubmitted(true);
          finalizeSubmission(answers, markedForReview, true);
        }
      }
    };

    tick();
    timerIntervalRef.current = window.setInterval(tick, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [stage, deadlineMs, answers, markedForReview]);

  // 3. Persist state changes to session storage so refresh preserves everything
  useEffect(() => {
    if (stage === 'taking' && !hasSubmittedRef.current) {
      demoExamService.saveActiveSession({
        testId,
        startedAtMs,
        durationSeconds: config.durationSeconds,
        deadlineMs,
        answers,
        markedForReview,
        currentIndex,
        lastUpdatedMs: Date.now()
      });
    }
  }, [stage, testId, startedAtMs, config.durationSeconds, deadlineMs, answers, markedForReview, currentIndex]);

  // Start Exam Handler
  const handleStartExam = () => {
    const now = Date.now();
    const deadline = now + config.durationSeconds * 1000;
    setStartedAtMs(now);
    setDeadlineMs(deadline);
    setRemainingSeconds(config.durationSeconds);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview({});
    hasSubmittedRef.current = false;
    setIsAutoSubmitted(false);
    setStage('taking');

    demoExamService.saveActiveSession({
      testId,
      startedAtMs: now,
      durationSeconds: config.durationSeconds,
      deadlineMs: deadline,
      answers: {},
      markedForReview: {},
      currentIndex: 0,
      lastUpdatedMs: now
    });
  };

  // Answer selection
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Clear answer
  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  // Toggle Mark for Review
  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
    }
  };

  // Finalize Submission
  const finalizeSubmission = useCallback(
    async (
      currentAnswers: Record<number, number>,
      currentMarked: Record<number, boolean>,
      isAuto = false
    ) => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      hasSubmittedRef.current = true;

      // Calculate score & section breakdowns
      let correctCount = 0;
      let incorrectCount = 0;
      let unattemptedCount = 0;
      let marksObtained = 0;

      const sectionScores: Record<
        string,
        { correct: number; incorrect: number; unattempted: number; total: number; score: number; maxScore: number }
      > = {};

      // Initialize sections
      for (const s of config.sections) {
        sectionScores[s.name] = {
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          total: s.questionCount,
          score: 0,
          maxScore: s.maxMarks
        };
      }

      questions.forEach((q, idx) => {
        const userChoice = currentAnswers[idx];
        const secName = q.section || config.sections[0].name;
        if (!sectionScores[secName]) {
          sectionScores[secName] = {
            correct: 0,
            incorrect: 0,
            unattempted: 0,
            total: 0,
            score: 0,
            maxScore: 0
          };
        }

        const qMarks = q.marks || config.marksPerQuestion;
        sectionScores[secName].maxScore = (sectionScores[secName].maxScore || 0) + qMarks;
        sectionScores[secName].total = (sectionScores[secName].total || 0) + 1;

        if (userChoice === undefined || userChoice === null) {
          unattemptedCount++;
          sectionScores[secName].unattempted++;
        } else if (userChoice === q.correctAnswer) {
          correctCount++;
          marksObtained += qMarks;
          sectionScores[secName].correct++;
          sectionScores[secName].score += qMarks;
        } else {
          incorrectCount++;
          sectionScores[secName].incorrect++;
        }
      });

      const percentage = Math.round((marksObtained / config.totalMarks) * 1000) / 10;
      const passed = percentage >= config.passingPercentage;
      const timeTaken = Math.max(1, Math.round((Date.now() - startedAtMs) / 1000));

      const attempt: DemoExamAttemptRecord = {
        id: `demo_attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        testId,
        testTitle: config.title,
        studentId,
        studentName,
        studentRole,
        totalQuestions: questions.length,
        maxMarks: config.totalMarks,
        marksObtained,
        correctCount,
        incorrectCount,
        unattemptedCount,
        percentage,
        passed,
        timeTakenSeconds: Math.min(timeTaken, config.durationSeconds),
        startedAt: new Date(startedAtMs).toISOString(),
        completedAt: new Date().toISOString(),
        answers: currentAnswers,
        markedForReview: currentMarked,
        sectionScores
      };

      await demoExamService.recordAttempt(attempt);
      setCompletedAttempt(attempt);
      setStage('submitted');

      if (passed) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    },
    [config, questions, startedAtMs, testId, studentId, studentName, studentRole]
  );

  const handleSubmitManual = () => {
    finalizeSubmission(answers, markedForReview, false);
  };

  // Build question palette items & stats
  const paletteItems: ExamPaletteItem[] = useMemo(() => {
    return questions.map((_, idx) => {
      const hasAnswer = answers[idx] !== undefined;
      const isMarked = Boolean(markedForReview[idx]);
      let status: ExamPaletteStatus = 'not-visited';

      if (hasAnswer && isMarked) {
        status = 'answered-marked';
      } else if (hasAnswer) {
        status = 'answered';
      } else if (isMarked) {
        status = 'marked';
      } else if (idx <= currentIndex) {
        status = 'not-answered';
      }

      return {
        index: idx,
        label: idx + 1,
        status
      };
    });
  }, [questions, answers, markedForReview, currentIndex]);

  const paletteStats: ExamPaletteStats = useMemo(() => {
    let answered = 0;
    let unanswered = 0;
    let marked = 0;

    questions.forEach((_, idx) => {
      const hasAns = answers[idx] !== undefined;
      const isM = Boolean(markedForReview[idx]);
      if (hasAns) answered++;
      else unanswered++;
      if (isM) marked++;
    });

    return {
      answered,
      unanswered,
      marked
    };
  }, [questions, answers, markedForReview]);

  // Current question data
  const currentQ: DemoExamQuestion = questions[currentIndex] || questions[0];

  // Section Tabs for quick navigation
  const sectionTabsSlot = useMemo(() => {
    if (!config.sections || config.sections.length <= 1) return null;
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs font-bold scrollbar-none">
        {config.sections.map((sec) => {
          const isCurrentSec =
            currentIndex + 1 >= sec.startQuestionNumber && currentIndex + 1 <= sec.endQuestionNumber;
          return (
            <button
              key={sec.name}
              type="button"
              onClick={() => handleJumpToQuestion(sec.startQuestionNumber - 1)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                isCurrentSec
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sec.name} ({sec.questionCount} Qs)
            </button>
          );
        })}
      </div>
    );
  }, [config.sections, currentIndex]);

  // =========================================================================
  // VIEW 1: PRE-EXAM INSTRUCTIONS & LAUNCH SCREEN
  // =========================================================================
  if (stage === 'instructions') {
    return (
      <div className="max-w-4xl mx-auto my-6 p-4 sm:p-6 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black tracking-wide uppercase">
                100% Free Demo Mock Test
              </span>
              <span className="text-xs text-indigo-200 font-mono">
                Pattern: {config.patternName}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              {config.title}
            </h1>
            <p className="mt-2 text-sm text-indigo-100 max-w-2xl leading-relaxed">
              {config.description}
            </p>

            {/* Quick metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-indigo-700/60">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
                  Questions
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {questions.length}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
                  Total Marks
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {config.totalMarks}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
                  Duration
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {config.durationMinutes} Mins
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
                  Marking Scheme
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  +{config.marksPerQuestion} / 0 Neg
                </span>
              </div>
            </div>
          </div>

          {/* Body instructions */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-display font-black text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-700" />
                Examination Instructions & Rules
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {config.instructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Breakdown preview */}
            <div>
              <h3 className="text-base font-display font-black text-slate-900 mb-3">
                Subject & Section Distribution
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Section / Subject</th>
                      <th className="py-3 px-4 text-center">Questions</th>
                      <th className="py-3 px-4 text-center">Marks per Q</th>
                      <th className="py-3 px-4 text-right">Total Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {config.sections.map((sec) => (
                      <tr key={sec.name} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{sec.name}</td>
                        <td className="py-2.5 px-4 text-center font-mono">{sec.questionCount}</td>
                        <td className="py-2.5 px-4 text-center font-mono">+{sec.marksPerQuestion}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold">{sec.maxMarks}</td>
                      </tr>
                    ))}
                    <tr className="bg-indigo-50/60 font-black text-indigo-950">
                      <td className="py-3 px-4">Grand Total</td>
                      <td className="py-3 px-4 text-center font-mono">{questions.length}</td>
                      <td className="py-3 px-4 text-center font-mono">—</td>
                      <td className="py-3 px-4 text-right font-mono text-base text-indigo-900">
                        {config.totalMarks} Marks
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reload Protection Guarantee Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-950">
                <strong className="font-bold">Real Exam Reload Protection:</strong> Your test
                timer and answers are continuously backed up. If your connection drops or you
                accidentally refresh, your timer will keep counting down accurately from where you
                left off.
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onExit}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
              >
                Cancel & Return
              </button>
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-base cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Start Free Demo Test Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: REAL-TIME ACTIVE TEST TAKING (UniversalExamShell)
  // =========================================================================
  if (stage === 'taking') {
    const submitModalNode = showSubmitModal ? (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </span>
            <div>
              <h3 className="text-base font-display font-black text-slate-900">
                Confirm Final Submission
              </h3>
              <p className="text-xs text-slate-500">
                Are you ready to submit your demo examination?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 text-center text-xs">
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Answered</span>
              <span className="text-base font-mono font-black text-emerald-700">
                {paletteStats.answered}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Unanswered</span>
              <span className="text-base font-mono font-black text-rose-700">
                {paletteStats.unanswered}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Marked</span>
              <span className="text-base font-mono font-black text-amber-700">
                {paletteStats.marked}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Once submitted, your final score, percentage, section breakdown, and detailed
            step-by-step solutions will be generated immediately.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Resume Exam
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSubmitModal(false);
                handleSubmitManual();
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black text-xs cursor-pointer shadow-xs transition-colors"
            >
              Confirm Final Submit
            </button>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <UniversalExamShell
        examTitle={config.shortTitle}
        subjectName={currentQ.section || currentQ.subjectLabel}
        subtitle={`${config.patternName} · Question ${currentIndex + 1} of ${questions.length}`}
        verificationBadge="green"
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        marksLabel={`+${currentQ.marks || config.marksPerQuestion} Marks`}
        topicLabel={currentQ.topic || currentQ.section}
        remainingSeconds={remainingSeconds}
        timerFormat="hhmmss"
        urgentThresholdSeconds={300} // 5 mins
        warningThresholdSeconds={900} // 15 mins
        sectionTabsSlot={sectionTabsSlot}
        questionText={currentQ.question}
        options={currentQ.options}
        selectedOptionIndex={answers[currentIndex]}
        onSelectOption={handleSelectOption}
        paletteItems={paletteItems}
        paletteStats={paletteStats}
        currentIndex={currentIndex}
        onJumpToQuestion={handleJumpToQuestion}
        onPrevious={handlePrevious}
        canPrevious={currentIndex > 0}
        onNext={handleNext}
        showNextButton={currentIndex < questions.length - 1}
        nextLabel="Next Question"
        onClearAnswer={handleClearAnswer}
        canClearAnswer={answers[currentIndex] !== undefined}
        isMarkedForReview={Boolean(markedForReview[currentIndex])}
        onToggleMarkForReview={handleToggleMarkForReview}
        onSubmitTest={() => setShowSubmitModal(true)}
        submitLabel="Submit Test"
        onBackToDashboard={onExit}
        progressSavedMessage="Your demo test answers and timer progress are securely saved. You can safely return to the dashboard."
        externalModals={submitModalNode}
      />
    );
  }

  // =========================================================================
  // VIEW 3: COMPREHENSIVE RESULT PAGE WITH EXPLANATIONS & BUY NOW
  // =========================================================================
  const attempt = completedAttempt!;
  const filteredQuestionIndices = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ idx }) => {
      const userChoice = attempt.answers[idx];
      const correct = questions[idx].correctAnswer;
      if (resultFilter === 'incorrect') {
        return userChoice !== undefined && userChoice !== correct;
      }
      if (resultFilter === 'unattempted') {
        return userChoice === undefined;
      }
      if (resultFilter === 'correct') {
        return userChoice === correct;
      }
      return true;
    });

  const minutesTaken = Math.floor(attempt.timeTakenSeconds / 60);
  const secondsTaken = attempt.timeTakenSeconds % 60;

  return (
    <div className="max-w-5xl mx-auto my-6 p-4 sm:p-6 space-y-6">
      {/* 1. Scorecard Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div
          className={`p-6 sm:p-8 text-white ${
            attempt.passed
              ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-900'
              : 'bg-gradient-to-r from-amber-900 via-slate-900 to-indigo-950'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black tracking-wide uppercase">
              Demo Examination Completed
            </span>
            <span className="text-xs text-white/80 font-mono">
              Completed on {new Date(attempt.completedAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                {attempt.testTitle}
              </h1>
              <p className="mt-1 text-sm text-white/80">
                {isAutoSubmitted
                  ? 'Time Expired · Auto-Submitted Successfully'
                  : 'Submitted by Candidate'}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-white/70 block">
                Total Score
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {attempt.marksObtained}
                <span className="text-xl sm:text-2xl text-white/70 font-normal">
                  /{attempt.maxMarks}
                </span>
              </div>
              <span
                className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-black uppercase ${
                  attempt.passed
                    ? 'bg-emerald-400 text-emerald-950'
                    : 'bg-amber-400 text-amber-950'
                }`}
              >
                {attempt.passed ? 'Qualified ✓' : 'Needs More Practice'} · {attempt.percentage}%
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Correct
              </span>
              <span className="text-2xl font-black text-emerald-300 font-mono">
                {attempt.correctCount}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Incorrect
              </span>
              <span className="text-2xl font-black text-rose-300 font-mono">
                {attempt.incorrectCount}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Unattempted
              </span>
              <span className="text-2xl font-black text-slate-300 font-mono">
                {attempt.unattemptedCount}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                Time Taken
              </span>
              <span className="text-xl font-black text-white font-mono">
                {minutesTaken}m {secondsTaken}s
              </span>
            </div>
          </div>
        </div>

        {/* Section-Wise Breakdown Table */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-display font-black text-slate-900">
            Subject & Section-Wise Performance Breakdown
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Section Name</th>
                  <th className="py-3 px-4 text-center">Correct</th>
                  <th className="py-3 px-4 text-center">Incorrect</th>
                  <th className="py-3 px-4 text-center">Unattempted</th>
                  <th className="py-3 px-4 text-right">Marks / Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {Object.entries(attempt.sectionScores).map(([secName, sec]) => (
                  <tr key={secName} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{secName}</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-700">
                      {sec.correct}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono text-rose-700">
                      {sec.incorrect}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono text-slate-500">
                      {sec.unattempted}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-indigo-900">
                      {sec.score} / {sec.maxScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. USER-REQUESTED CALL-TO-ACTION (BUY NOW PROMO BANNER)
          ===================================================================== */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 border-2 border-amber-300 shadow-lg text-slate-950 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-950 bg-white/40 backdrop-blur-xs px-3 py-1 rounded-full w-fit">
            <Crown className="w-4 h-4" />
            Unlock Complete Examination Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 leading-tight">
            Enjoyed Your Demo Examination?
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            Purchase your premium plan to unlock complete mock tests, practice questions, detailed
            solutions and all premium examination features.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenMembership(config.recommendedPlanSku)}
              className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-display font-black text-base cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Crown className="w-5 h-5 text-amber-400" />
              <span>BUY NOW – {config.recommendedPlanName}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleStartExam}
              className="px-5 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-slate-900 font-bold text-sm cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Demo Test
            </button>
            <button
              type="button"
              onClick={onExit}
              className="px-5 py-3.5 rounded-2xl bg-black/10 hover:bg-black/20 text-slate-900 font-bold text-sm cursor-pointer transition-colors"
            >
              Exit to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. QUESTION-BY-QUESTION SOLUTIONS & DETAILED EXPLANATIONS
          ===================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-display font-black text-slate-900">
              Detailed Question Analysis & Explanations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Review every question with official answer keys and step-by-step solutions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setResultFilter('all')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                resultFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setResultFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                resultFilter === 'incorrect'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incorrect ({attempt.incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setResultFilter('unattempted')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                resultFilter === 'unattempted'
                  ? 'bg-white text-slate-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unattempted ({attempt.unattemptedCount})
            </button>
            <button
              type="button"
              onClick={() => setResultFilter('correct')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                resultFilter === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({attempt.correctCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestionIndices.map(({ q, idx }) => {
            const userChoice = attempt.answers[idx];
            const isCorrect = userChoice === q.correctAnswer;
            const isUnattempted = userChoice === undefined;

            return (
              <div
                key={q.id || idx}
                className={`rounded-2xl p-5 border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isUnattempted
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-slate-900">
                      Q{idx + 1}.
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {q.section || q.subjectLabel}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      +{q.marks || config.marksPerQuestion} Marks
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : isUnattempted
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isCorrect ? 'Correct ✓' : isUnattempted ? 'Unattempted' : 'Incorrect ✗'}
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed mb-4">
                  {q.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userChoice === optIdx;
                    const isAnswerKey = q.correctAnswer === optIdx;

                    let optStyle = 'bg-white border-slate-200 text-slate-800';
                    if (isAnswerKey) {
                      optStyle = 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      optStyle = 'bg-rose-100/70 border-rose-400 text-rose-950 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                            isAnswerKey
                              ? 'bg-emerald-600 text-white'
                              : isUserChoice
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                        {isAnswerKey && (
                          <span className="ml-auto text-[11px] font-black text-emerald-700 shrink-0">
                            (Correct Key)
                          </span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="ml-auto text-[11px] font-black text-rose-700 shrink-0">
                            (Your Choice)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step-by-Step Explanation */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1">
                  <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Explanation / स्पष्टीकरण:
                  </span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
