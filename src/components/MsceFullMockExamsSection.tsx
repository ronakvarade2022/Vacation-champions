import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  buildMsceMockPaper,
  getMscePaperConfigForMedium,
  getMsceTenBatches,
  getVerifiedMockTestStatusMap,
  MsceMedium,
  MsceMockAttemptRecord,
  MsceMockQuestion,
  MscePaperNumber,
  MsceStdLevel,
} from '../data/msceMockExamEngine';
import confetti from 'canvas-confetti';
import { PlanSkuId } from '../types';
import {
  getCategorySubscriptionInfo,
  getVisibleExamCategoriesForStudent,
  hasCategoryAccess,
} from '../utils/subscriptionAccess';
import {
  Trophy,
  GraduationCap,
  Clock,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Bookmark,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Languages,
  FileText,
  Award,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Play,
  Sparkles,
  Info,
  HelpCircle,
  CheckSquare,
  ListChecks,
  TrendingUp,
  History,
  ShieldCheck,
  Lock,
  Crown,
} from 'lucide-react';
import {
  UniversalExamShell,
  type ExamPaletteItem,
  type ExamPaletteStatus,
} from './exam/UniversalExamShell';
import {
  enterElementFullscreen,
  exitElementFullscreen,
  requestReturnToDashboard,
} from '../hooks/useExamFullscreen';

const MSCE_90_MINUTES_SECONDS = 90 * 60; // 5400 seconds = 90 minutes

interface ActiveExamSessionStorage {
  stdLevel: MsceStdLevel;
  mockTestNumber: number;
  paperNumber: MscePaperNumber;
  isFullExamMode: boolean;
  medium: MsceMedium;
  startedAtMs: number;
  deadlineMs: number;
  answers: Record<number, number>;
  markedForReview: Record<number, boolean>;
  currentIdx: number;
}

const ACTIVE_SESSION_STORAGE_KEY = 'vc_msce_active_mock_exam_session_v1';

interface MsceFullMockExamsSectionProps {
  onOpenAuth?: () => void;
  onOpenMembership?: (planSku?: PlanSkuId) => void;
}

export const MsceFullMockExamsSection: React.FC<MsceFullMockExamsSectionProps> = ({
  onOpenAuth,
  onOpenMembership,
}) => {
  const {
    currentStudent,
    updateStudentScholarshipMedium,
    recordMsceMockAttempt,
    publishedMsceMockTests,
    customMsceMockQuestions,
  } = useApp();

  const visibleCats = getVisibleExamCategoriesForStudent(currentStudent);
  const [lockedMockNotice, setLockedMockNotice] = useState<string | null>(null);

  // Standard Switcher: Std 4th (PSE) vs Std 7th (UPS) scoped by student class / role
  const [selectedStd, setSelectedStd] = useState<MsceStdLevel>(() => {
    if (currentStudent && currentStudent.accountRole !== 'teacher') {
      if (visibleCats.showScholarship7th && !visibleCats.showScholarship4th) {
        return 'Std 7th';
      }
      return 'Std 4th';
    }
    if (currentStudent?.classLevel === 'Class 7') return 'Std 7th';
    return 'Std 4th';
  });

  useEffect(() => {
    if (!currentStudent || currentStudent.accountRole === 'teacher') return;
    if (visibleCats.showScholarship7th && !visibleCats.showScholarship4th) {
      setSelectedStd('Std 7th');
    } else if (visibleCats.showScholarship4th && !visibleCats.showScholarship7th) {
      setSelectedStd('Std 4th');
    }
  }, [currentStudent?.id, currentStudent?.accountRole, visibleCats.showScholarship4th, visibleCats.showScholarship7th]);

  const activeCategoryId = selectedStd === 'Std 7th' ? 'scholarship_7th' : 'scholarship_4th';
  const activePlanSku: PlanSkuId = selectedStd === 'Std 7th' ? 'SCHOLARSHIP_7TH' : 'SCHOLARSHIP_4TH';
  const hasPaidScholarshipAccess = hasCategoryAccess(currentStudent, activeCategoryId);
  const categorySubInfo = getCategorySubscriptionInfo(currentStudent, activeCategoryId);

  // Sub-view inside Full Mock Examinations: 'tests' | 'progress' | 'batches'
  const [subView, setSubView] = useState<'tests' | 'progress' | 'batches'>('tests');

  // Batch filter: 'all' or 1..5
  const [selectedBatchRange, setSelectedBatchRange] = useState<[number, number] | null>(null);

  // Compulsory Medium Selection state
  const [savedMedium, setSavedMedium] = useState<MsceMedium | null>(() => {
    if (currentStudent?.scholarshipMedium) return currentStudent.scholarshipMedium;
    try {
      const localMed = localStorage.getItem('vc_scholarship_medium') as MsceMedium | null;
      if (localMed === 'English' || localMed === 'Marathi' || localMed === 'Hindi') {
        return localMed;
      }
    } catch {}
    return null;
  });
  const [showMediumSelectorModal, setShowMediumSelectorModal] = useState<boolean>(false);
  const [pendingStartRequest, setPendingStartRequest] = useState<{
    stdLevel: MsceStdLevel;
    mockTestNumber: number;
    paperNumber: MscePaperNumber;
    isFullExamMode: boolean;
  } | null>(null);

  // Exam Flow State: 'browse' | 'instructions' | 'taking' | 'result' | 'retry_incorrect'
  const [flowState, setFlowState] = useState<
    'browse' | 'instructions' | 'taking' | 'result' | 'retry_incorrect'
  >('browse');

  // Active Mock Test Configuration
  const [activeTestNum, setActiveTestNum] = useState<number>(1);
  const [activePaperNum, setActivePaperNum] = useState<MscePaperNumber>(1);
  const [isFullExamMode, setIsFullExamMode] = useState<boolean>(false);
  const [paper1CompletedRecord, setPaper1CompletedRecord] =
    useState<MsceMockAttemptRecord | null>(null);

  // Questions & Navigation
  const [paperQuestions, setPaperQuestions] = useState<MsceMockQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Strict 90-Minute Anti-Refresh Timer
  const [startedAtMs, setStartedAtMs] = useState<number>(0);
  const [deadlineMs, setDeadlineMs] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(MSCE_90_MINUTES_SECONDS);

  // Result & Retry Incorrect states
  const [latestAttemptRecord, setLatestAttemptRecord] =
    useState<MsceMockAttemptRecord | null>(null);
  const [answerKeySectionFilter, setAnswerKeySectionFilter] = useState<'ALL' | 'SEC1' | 'SEC2'>('ALL');
  const [retryQuestions, setRetryQuestions] = useState<MsceMockQuestion[]>([]);
  const [retryAnswers, setRetryAnswers] = useState<Record<number, number>>({});
  const [retrySubmitted, setRetrySubmitted] = useState<boolean>(false);

  // Sync medium when student profile updates
  useEffect(() => {
    if (currentStudent?.scholarshipMedium) {
      setSavedMedium(currentStudent.scholarshipMedium);
    }
  }, [currentStudent?.scholarshipMedium]);

  // Restore active exam session from localStorage if authorized
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (!raw) return;
      const savedSession: ActiveExamSessionStorage = JSON.parse(raw);
      if (!savedSession || !savedSession.deadlineMs) return;
      const draftCat = savedSession.stdLevel === 'Std 7th' ? 'scholarship_7th' : 'scholarship_4th';
      if (savedSession.mockTestNumber > 1 && !hasCategoryAccess(currentStudent, draftCat)) {
        return;
      }
      const now = Date.now();
      const secsLeft = Math.max(0, Math.floor((savedSession.deadlineMs - now) / 1000));
      const builtQs = buildMsceMockPaper(
        savedSession.stdLevel,
        savedSession.mockTestNumber,
        savedSession.paperNumber,
        savedSession.medium,
        customMsceMockQuestions
      );
      setSelectedStd(savedSession.stdLevel);
      setActiveTestNum(savedSession.mockTestNumber);
      setActivePaperNum(savedSession.paperNumber);
      setIsFullExamMode(Boolean(savedSession.isFullExamMode));
      setSavedMedium(savedSession.medium);
      setPaperQuestions(builtQs);
      setAnswers(savedSession.answers || {});
      setMarkedForReview(savedSession.markedForReview || {});
      setCurrentIdx(savedSession.currentIdx || 0);
      setStartedAtMs(savedSession.startedAtMs);
      setDeadlineMs(savedSession.deadlineMs);
      setRemainingSeconds(secsLeft);
      setFlowState('taking');
    } catch {
      // Ignore corrupt session
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent?.id]);

  // Persist active exam session to localStorage whenever answers or currentIdx change
  useEffect(() => {
    if (flowState !== 'taking' || !deadlineMs || !savedMedium) return;
    try {
      const payload: ActiveExamSessionStorage = {
        stdLevel: selectedStd,
        mockTestNumber: activeTestNum,
        paperNumber: activePaperNum,
        isFullExamMode,
        medium: savedMedium,
        startedAtMs,
        deadlineMs,
        answers,
        markedForReview,
        currentIdx,
      };
      localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    flowState,
    selectedStd,
    activeTestNum,
    activePaperNum,
    isFullExamMode,
    savedMedium,
    startedAtMs,
    deadlineMs,
    answers,
    markedForReview,
    currentIdx,
  ]);

  // All attempts for current student or local storage
  const allMockAttempts: MsceMockAttemptRecord[] = useMemo(() => {
    if (currentStudent?.msceMockAttempts && currentStudent.msceMockAttempts.length > 0) {
      return currentStudent.msceMockAttempts;
    }
    try {
      const raw = localStorage.getItem('vc_msce_mock_attempts');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [currentStudent?.msceMockAttempts, latestAttemptRecord]);

  // Filtered attempts for currently selected standard (Std 4th vs Std 7th)
  const stdAttempts = useMemo(
    () => allMockAttempts.filter((a) => a.stdLevel === selectedStd),
    [allMockAttempts, selectedStd]
  );

  const effectiveMedium: MsceMedium = savedMedium || 'Marathi';
  const paperConfig = useMemo(
    () => getMscePaperConfigForMedium(effectiveMedium),
    [effectiveMedium]
  );

  const verifiedTestStatusMap = useMemo(
    () => getVerifiedMockTestStatusMap(selectedStd, effectiveMedium, customMsceMockQuestions),
    [selectedStd, effectiveMedium, customMsceMockQuestions]
  );

  // Format seconds as MM:SS or HH:MM:SS
  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  const handleSelectAndSaveMedium = (medium: MsceMedium) => {
    setSavedMedium(medium);
    updateStudentScholarshipMedium(medium);
    setShowMediumSelectorModal(false);

    if (pendingStartRequest) {
      const req = pendingStartRequest;
      setPendingStartRequest(null);
      openPreExamInstructions(req.stdLevel, req.mockTestNumber, req.paperNumber, req.isFullExamMode, medium);
    }
  };

  const openPreExamInstructions = (
    stdLevel: MsceStdLevel,
    mockTestNumber: number,
    paperNumber: MscePaperNumber,
    fullExam: boolean,
    explicitMedium?: MsceMedium
  ) => {
    const reqCategory = stdLevel === 'Std 7th' ? 'scholarship_7th' : 'scholarship_4th';
    const reqSku: PlanSkuId = stdLevel === 'Std 7th' ? 'SCHOLARSHIP_7TH' : 'SCHOLARSHIP_4TH';
    if (mockTestNumber > 1 && !hasCategoryAccess(currentStudent, reqCategory)) {
      setLockedMockNotice(
        `Mock Test 01 is open as a Free Preview for ${stdLevel}. Mock Tests 02 to 25 (Paper 1 & 2) unlock with the ${stdLevel} Scholarship Plan (₹99 / 365 Days).`
      );
      if (onOpenMembership) {
        onOpenMembership(reqSku);
      }
      return;
    }
    setLockedMockNotice(null);

    const medToUse = explicitMedium || savedMedium;
    if (!medToUse) {
      setPendingStartRequest({
        stdLevel,
        mockTestNumber,
        paperNumber,
        isFullExamMode: fullExam,
      });
      setShowMediumSelectorModal(true);
      return;
    }

    setSelectedStd(stdLevel);
    setActiveTestNum(mockTestNumber);
    setActivePaperNum(paperNumber);
    setIsFullExamMode(fullExam);
    if (paperNumber === 1) {
      setPaper1CompletedRecord(null);
    }
    setFlowState('instructions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start the actual 75-Question Paper with a fresh 90-Minute timer ONLY when clicking START TEST
  const handleStartTestNow = () => {
    const med = savedMedium || 'Marathi';
    const builtQs = buildMsceMockPaper(
      selectedStd,
      activeTestNum,
      activePaperNum,
      med,
      customMsceMockQuestions
    );
    const now = Date.now();
    const deadline = now + MSCE_90_MINUTES_SECONDS * 1000;

    setPaperQuestions(builtQs);
    setCurrentIdx(0);
    setAnswers({});
    setMarkedForReview({});
    setStartedAtMs(now);
    setDeadlineMs(deadline);
    setRemainingSeconds(MSCE_90_MINUTES_SECONDS);
    setShowSubmitConfirmModal(false);
    setFlowState('taking');
    void enterElementFullscreen();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const evaluateAndSubmitPaper = useCallback(async () => {
    if (paperQuestions.length === 0) return;

    try {
      localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
    } catch {}

    const med = savedMedium || 'Marathi';
    const cfg = getMscePaperConfigForMedium(med);
    const sec1Name =
      activePaperNum === 1
        ? `First Language (${cfg.paper1FirstLanguage})`
        : `Second Language (${cfg.paper2SecondLanguage})`;
    const sec2Name =
      activePaperNum === 1
        ? `Mathematics (${cfg.paper1MathsLanguage})`
        : `Intelligence Test (${cfg.paper2IntelligenceLanguage})`;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let sec1Score = 0;
    let sec2Score = 0;
    const incorrectQuestionNumbers: number[] = [];
    const topicBreakdown: Record<string, { correct: number; total: number; marks: number }> = {};

    paperQuestions.forEach((q, idx) => {
      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { correct: 0, total: 0, marks: 0 };
      }
      topicBreakdown[q.topic].total += 1;

      const selectedOpt = answers[idx];
      if (selectedOpt === undefined) {
        unattemptedCount += 1;
      } else if (selectedOpt === q.correctAnswer) {
        correctCount += 1;
        topicBreakdown[q.topic].correct += 1;
        topicBreakdown[q.topic].marks += 2;
        if (q.questionNumber <= 25) {
          sec1Score += 2;
        } else {
          sec2Score += 2;
        }
      } else {
        incorrectCount += 1;
        incorrectQuestionNumbers.push(q.questionNumber);
      }
    });

    const marksObtained = correctCount * 2;
    const maxMarks = 150;
    const percentage = Math.round((marksObtained / maxMarks) * 100);
    const elapsedSecs = Math.min(
      MSCE_90_MINUTES_SECONDS,
      Math.max(1, MSCE_90_MINUTES_SECONDS - remainingSeconds)
    );

    const savedAttempt = await recordMsceMockAttempt({
      studentId: currentStudent?.id || 'guest',
      stdLevel: selectedStd,
      mockTestNumber: activeTestNum,
      paperNumber: activePaperNum,
      isFullExamMode,
      medium: med,
      totalQuestions: 75,
      maxMarks: 150,
      marksObtained,
      correctCount,
      incorrectCount,
      unattemptedCount,
      percentage,
      timeTakenSeconds: elapsedSecs,
      section1Name: sec1Name,
      section1Score: sec1Score,
      section1MaxMarks: 50,
      section2Name: sec2Name,
      section2Score: sec2Score,
      section2MaxMarks: 100,
      topicBreakdown,
      answers,
      incorrectQuestionNumbers,
    });

    if (activePaperNum === 1 && isFullExamMode) {
      setPaper1CompletedRecord(savedAttempt);
    }

    setLatestAttemptRecord(savedAttempt);
    setShowSubmitConfirmModal(false);
    setFlowState('result');
    void exitElementFullscreen();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (percentage >= 60) {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
      });
    }
  }, [
    paperQuestions,
    savedMedium,
    activePaperNum,
    answers,
    remainingSeconds,
    recordMsceMockAttempt,
    currentStudent?.id,
    selectedStd,
    activeTestNum,
    isFullExamMode,
  ]);

  // Anti-Tamper 1-second tick based on deadlineMs
  useEffect(() => {
    if (flowState !== 'taking' || !deadlineMs) return;

    const tick = () => {
      const secsLeft = Math.max(0, Math.floor((deadlineMs - Date.now()) / 1000));
      setRemainingSeconds(secsLeft);
      if (secsLeft <= 0) {
        void evaluateAndSubmitPaper();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [flowState, deadlineMs, evaluateAndSubmitPaper]);

  // Launch Retry Incorrect Questions mode
  const handleStartRetryIncorrect = () => {
    if (!latestAttemptRecord) return;
    const wrongSet = new Set(latestAttemptRecord.incorrectQuestionNumbers);
    const wrongQs = paperQuestions.filter((q) => wrongSet.has(q.questionNumber));
    if (wrongQs.length === 0) return;
    setRetryQuestions(wrongQs);
    setRetryAnswers({});
    setRetrySubmitted(false);
    setFlowState('retry_incorrect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Progress Dashboard Metrics for selectedStd
  const progressStats = useMemo(() => {
    const completedTestNums = new Set<number>();
    const p1BestByTest: Record<number, number> = {};
    const p2BestByTest: Record<number, number> = {};

    for (const att of stdAttempts) {
      if (att.paperNumber === 1) {
        p1BestByTest[att.mockTestNumber] = Math.max(
          p1BestByTest[att.mockTestNumber] || 0,
          att.marksObtained
        );
      } else {
        p2BestByTest[att.mockTestNumber] = Math.max(
          p2BestByTest[att.mockTestNumber] || 0,
          att.marksObtained
        );
      }
      if (
        p1BestByTest[att.mockTestNumber] !== undefined &&
        p2BestByTest[att.mockTestNumber] !== undefined
      ) {
        completedTestNums.add(att.mockTestNumber);
      }
    }

    const totalAttemptsCount = stdAttempts.length;
    const highestPaperScore =
      totalAttemptsCount > 0
        ? Math.max(...stdAttempts.map((a) => a.marksObtained))
        : 0;
    const averagePaperScore =
      totalAttemptsCount > 0
        ? Math.round(
            stdAttempts.reduce((sum, a) => sum + a.marksObtained, 0) / totalAttemptsCount
          )
        : 0;

    return {
      completedFullTestsCount: completedTestNums.size,
      pendingFullTestsCount: 25 - completedTestNums.size,
      p1BestByTest,
      p2BestByTest,
      highestPaperScore,
      averagePaperScore,
      overallAccuracy:
        totalAttemptsCount > 0
          ? Math.round(
              stdAttempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttemptsCount
            )
          : 0,
    };
  }, [stdAttempts]);

  const activeQuestion = paperQuestions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = 75 - answeredCount;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  const visibleTestNumbers = useMemo(() => {
    const all25 = Array.from({ length: 25 }, (_, i) => i + 1);
    if (!selectedBatchRange) return all25;
    return all25.filter(
      (n) => n >= selectedBatchRange[0] && n <= selectedBatchRange[1]
    );
  }, [selectedBatchRange]);

  return (
    <div className="space-y-6 pt-6 border-t-4 border-amber-400">
      {/* MAIN SUBSECTION HEADER: 🏆 MSCE PUNE SCHOLARSHIP – FULL MOCK EXAMINATIONS */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official MSCE Pune Full Examination System • 50 Full Mock Tests</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              🏆 MSCE PUNE SCHOLARSHIP – FULL MOCK EXAMINATIONS
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium">
              25 Full Mock Tests for Std. 4th (PSE) + 25 Full Mock Tests for Std. 7th (UPS) • Paper 1 (75 Qs • 150 Marks • 90 Mins) + Paper 2 (75 Qs • 150 Marks • 90 Mins) = 300 Marks per Mock Test.
            </p>
          </div>

          {/* Compulsory Medium Selection Badge & Quick Switcher */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                Selected Examination Medium
              </span>
              <span className="text-sm font-extrabold text-white">
                {savedMedium ? `${savedMedium} Medium` : 'Not Selected Yet (Compulsory)'}
              </span>
            </div>
            <button
              type="button"
              disabled={flowState === 'taking'}
              onClick={() => setShowMediumSelectorModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{savedMedium ? 'Change Medium' : 'Select Medium'}</span>
            </button>
          </div>
        </div>

        {/* TWO OFFICIAL STANDARD SUBSECTIONS: STD 4TH (PSE) & STD 7TH (UPS) - ROLE SCOPED */}
        <div
          className={`grid grid-cols-1 ${
            (visibleCats.showScholarship4th && visibleCats.showScholarship7th) ||
            (!visibleCats.showScholarship4th && !visibleCats.showScholarship7th)
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          } gap-3.5`}
        >
          {(visibleCats.showScholarship4th || !visibleCats.showScholarship7th) && (
            <button
              type="button"
              disabled={flowState === 'taking'}
              onClick={() => {
                setSelectedStd('Std 4th');
                setLockedMockNotice(null);
                setFlowState('browse');
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedStd === 'Std 4th'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <span className="font-display font-black text-sm sm:text-base">
                    STD. 4TH – PRIMARY SCHOLARSHIP (PSE)
                  </span>
                </div>
                <p
                  className={`text-xs font-bold ${
                    selectedStd === 'Std 4th' ? 'text-slate-900' : 'text-indigo-200'
                  }`}
                >
                  Mock Test 01 (Free) &bull; Mock Tests 02–25 ({hasCategoryAccess(currentStudent, 'scholarship_4th') ? 'Unlocked ✓' : '₹99 Plan'})
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-black ${
                  selectedStd === 'Std 4th'
                    ? 'bg-slate-950 text-amber-300'
                    : 'bg-white/15 text-white'
                }`}
              >
                25 Mock Tests
              </span>
            </button>
          )}

          {(visibleCats.showScholarship7th || !visibleCats.showScholarship4th) && (
            <button
              type="button"
              disabled={flowState === 'taking'}
              onClick={() => {
                setSelectedStd('Std 7th');
                setLockedMockNotice(null);
                setFlowState('browse');
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedStd === 'Std 7th'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 border-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <span className="font-display font-black text-sm sm:text-base">
                    STD. 7TH – UPPER PRIMARY SCHOLARSHIP (UPS)
                  </span>
                </div>
                <p
                  className={`text-xs font-bold ${
                    selectedStd === 'Std 7th' ? 'text-slate-900' : 'text-indigo-200'
                  }`}
                >
                  Mock Test 01 (Free) &bull; Mock Tests 02–25 ({hasCategoryAccess(currentStudent, 'scholarship_7th') ? 'Unlocked ✓' : '₹99 Plan'})
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-black ${
                  selectedStd === 'Std 7th'
                    ? 'bg-slate-950 text-amber-300'
                    : 'bg-white/15 text-white'
                }`}
              >
                25 Mock Tests
              </span>
            </button>
          )}
        </div>

        {/* Automatic Medium-Wise Subject & Language Configuration Banner */}
        <div className="bg-white/10 rounded-2xl p-4 border border-white/15 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black uppercase shrink-0">
              Paper 1
            </span>
            <div>
              <p className="font-extrabold text-white">{paperConfig.paper1Summary}</p>
              <p className="text-indigo-200 text-[11px] mt-0.5">
                75 Questions • 150 Marks • 90 Minutes • +2 Marks/Q • No Negative Marking
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black uppercase shrink-0">
              Paper 2
            </span>
            <div>
              <p className="font-extrabold text-white">{paperConfig.paper2Summary}</p>
              <p className="text-indigo-200 text-[11px] mt-0.5">
                75 Questions • 150 Marks • 90 Minutes • +2 Marks/Q • No Negative Marking
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs: 25 Mock Tests | Student Progress Dashboard | 10-Batch Structure */}
        {flowState === 'browse' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/15">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSubView('tests')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                  subView === 'tests'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{selectedStd} – All 25 Mock Tests</span>
              </button>
              <button
                type="button"
                onClick={() => setSubView('progress')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                  subView === 'progress'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>
                  Student Progress Dashboard ({progressStats.completedFullTestsCount}/25 Completed)
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSubView('batches')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                  subView === 'batches'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>10-Batch Generation &amp; Syllabus Structure</span>
              </button>
            </div>

            <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>70 Total Tests Active (20 Practice + 50 Full Mock Exams)</span>
            </div>
          </div>
        )}
      </div>

      {/* COMPULSORY MEDIUM SELECTION MODAL */}
      {showMediumSelectorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase">
                  Compulsory MSCE Pune Configuration
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                  Select Your Official Examination Medium
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Your selected medium is saved to your Student Profile and automatically configures First Language, Mathematics, Second Language, and Intelligence Test languages.
                </p>
              </div>
              {savedMedium && (
                <button
                  type="button"
                  onClick={() => setShowMediumSelectorModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>

            <div className="space-y-3">
              {(
                [
                  {
                    id: 'English' as MsceMedium,
                    label: '1. English Medium',
                    p1: 'Paper 1: First Language: English (25 Qs) + Mathematics in English (50 Qs)',
                    p2: 'Paper 2: Second Language: Marathi (25 Qs) + Intelligence Test in English (50 Qs)',
                  },
                  {
                    id: 'Marathi' as MsceMedium,
                    label: '2. Marathi Medium (मराठी माध्यम)',
                    p1: 'Paper 1: प्रथम भाषा: मराठी (25 Qs) + गणित - मराठी माध्यम (50 Qs)',
                    p2: 'Paper 2: द्वितीय भाषा: इंग्रजी (25 Qs) + बुद्धिमत्ता चाचणी - मराठी माध्यम (50 Qs)',
                  },
                  {
                    id: 'Hindi' as MsceMedium,
                    label: '3. Hindi Medium (हिंदी माध्यम)',
                    p1: 'Paper 1: प्रथम भाषा: हिंदी (25 Qs) + गणित - हिंदी माध्यम (50 Qs)',
                    p2: 'Paper 2: द्वितीय भाषा: अंग्रेजी (25 Qs) + बुद्धिमत्ता परीक्षण - हिंदी माध्यम (50 Qs)',
                  },
                ]
              ).map((option) => {
                const isSelected = savedMedium === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectAndSaveMedium(option.id)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 shadow-sm'
                        : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-display font-black text-sm sm:text-base text-slate-900">
                        {option.label}
                      </div>
                      <p className="text-xs text-slate-700 font-semibold">{option.p1}</p>
                      <p className="text-xs text-slate-600">{option.p2}</p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-amber-600 text-white font-black text-xs shrink-0 self-start sm:self-center">
                      Select {option.id} →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PRE-EXAM OFFICIAL INSTRUCTIONS SCREEN (Timer does NOT start here; starts ONLY when clicking START TEST) */}
      {flowState === 'instructions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase">
                  {selectedStd === 'Std 4th'
                    ? 'Std. 4th – Primary Scholarship (PSE)'
                    : 'Std. 7th – Upper Primary Scholarship (UPS)'}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs uppercase">
                  Mock Test {String(activeTestNum).padStart(2, '0')} • Paper {activePaperNum}
                </span>
                {isFullExamMode && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs uppercase">
                    Full Examination Mode (Paper 1 + Paper 2)
                  </span>
                )}
                {verifiedTestStatusMap[activeTestNum]?.isVerifiedMockTest ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs uppercase">
                    🟢 VERIFIED MOCK TEST ({verifiedTestStatusMap[activeTestNum].verifiedCount}/150 Qs)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs uppercase">
                    ⏳ Verification Pending
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-2">
                Official MSCE Pune Pre-Examination Instructions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Please read all instructions carefully. Your 90-minute timer will start ONLY after you click the &ldquo;START TEST&rdquo; button below.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFlowState('browse')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs self-start cursor-pointer"
            >
              ← Back to 25 Mock Tests
            </button>
          </div>

          {/* Paper Structure Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-black uppercase text-amber-800 block">
                Examination Medium
              </span>
              <p className="text-lg font-display font-black text-slate-900 mt-0.5">
                {effectiveMedium} Medium
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {activePaperNum === 1 ? paperConfig.paper1Summary : paperConfig.paper2Summary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
              <span className="text-[11px] font-black uppercase text-indigo-800 block">
                Questions &amp; Marking Scheme
              </span>
              <p className="text-lg font-display font-black text-slate-900 mt-0.5">
                75 Questions • 150 Marks
              </p>
              <p className="text-xs text-slate-600 mt-1">
                +2 Marks for every correct answer • 0 Marks for unattempted or wrong answers (No Negative Marking).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-black uppercase text-emerald-800 block">
                Official Duration
              </span>
              <p className="text-lg font-display font-black text-slate-900 mt-0.5">
                90 Minutes (1 Hr 30 Mins)
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Strict countdown timer. Refreshing the page will NOT reset or pause the timer once started.
              </p>
            </div>
          </div>

          {/* Section Breakdown Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5">Section</th>
                  <th className="p-3.5">Subject &amp; Language</th>
                  <th className="p-3.5">Question Range</th>
                  <th className="p-3.5">Questions</th>
                  <th className="p-3.5">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="p-3.5 font-bold text-slate-900">Section 1</td>
                  <td className="p-3.5 font-semibold text-amber-900">
                    {activePaperNum === 1
                      ? `First Language: ${paperConfig.paper1FirstLanguage}`
                      : `Second Language: ${paperConfig.paper2SecondLanguage}`}
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">Q1 to Q25</td>
                  <td className="p-3.5 font-bold">25 Questions</td>
                  <td className="p-3.5 font-extrabold text-emerald-800">50 Marks</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Section 2</td>
                  <td className="p-3.5 font-semibold text-indigo-900">
                    {activePaperNum === 1
                      ? `Mathematics (${paperConfig.paper1MathsLanguage} Medium)`
                      : `Intelligence Test (${paperConfig.paper2IntelligenceLanguage} Medium)`}
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">Q26 to Q75</td>
                  <td className="p-3.5 font-bold">50 Questions</td>
                  <td className="p-3.5 font-extrabold text-emerald-800">100 Marks</td>
                </tr>
                <tr className="bg-amber-50 font-black text-slate-900">
                  <td className="p-3.5" colSpan={2}>
                    Total Paper {activePaperNum}
                  </td>
                  <td className="p-3.5 font-mono">Q1 to Q75</td>
                  <td className="p-3.5">75 Questions</td>
                  <td className="p-3.5 text-amber-900">150 Marks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <p className="font-extrabold text-slate-900">Important MSCE Examination Rules:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Each question carries 4 multiple-choice options (A, B, C, D) with only 1 correct option.</li>
              <li>Use the Question Navigation Palette (1 to 75) to jump to any question or Mark for Review.</li>
              <li>When the 90-minute timer reaches 00:00, your paper will be submitted automatically.</li>
              {isFullExamMode && activePaperNum === 1 && (
                <li className="font-bold text-indigo-900">
                  Full Examination Mode: Immediately after submitting Paper 1, you can start Paper 2 with a fresh 90-minute timer.
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setShowMediumSelectorModal(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Change Medium ({effectiveMedium})
            </button>

            <button
              type="button"
              onClick={handleStartTestNow}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-display font-black text-sm shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START TEST (Begin 90-Minute Timer)</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE 75-QUESTION EXAMINATION INTERFACE (FULL-SCREEN UNIVERSAL SHELL) */}
      {flowState === 'taking' && activeQuestion && (() => {
        const buildPaletteItem = (q: MsceMockQuestion, idx: number): ExamPaletteItem => {
          const isAns = answers[idx] !== undefined;
          const isRev = Boolean(markedForReview[idx]);
          let status: ExamPaletteStatus = 'not-visited';
          if (isAns && isRev) status = 'answered-marked';
          else if (isRev) status = 'marked';
          else if (isAns) status = 'answered';
          return {
            index: idx,
            label: q.questionNumber,
            status,
          };
        };

        const allPaletteItems = paperQuestions.map(buildPaletteItem);
        const sec1Items = allPaletteItems.slice(0, 25);
        const sec2Items = allPaletteItems.slice(25, 75);

        return (
          <UniversalExamShell
            examTitle={`${selectedStd} • Mock Test ${String(activeTestNum).padStart(2, '0')} • Paper ${activePaperNum}`}
            subjectName={activeQuestion.subjectLabel}
            subtitle={`${effectiveMedium} Medium`}
            verificationBadge={activeQuestion.verification?.greenVerified ? 'green' : 'pending'}
            questionNumber={activeQuestion.questionNumber}
            totalQuestions={75}
            marksLabel="+2 Marks"
            topicLabel={activeQuestion.topic}
            remainingSeconds={remainingSeconds}
            timerFormat="mmss"
            urgentThresholdSeconds={300}
            warningThresholdSeconds={600}
            sectionTabsSlot={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentIdx(0)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeQuestion.questionNumber <= 25
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-black truncate">
                    Section 1: {activePaperNum === 1 ? `First Language (${paperConfig.paper1FirstLanguage})` : `Second Language (${paperConfig.paper2SecondLanguage})`}
                  </div>
                  <div
                    className={`text-[10px] font-semibold ${
                      activeQuestion.questionNumber <= 25 ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    Q1 to Q25 (25 Questions • 50 Marks)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentIdx(25)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeQuestion.questionNumber >= 26
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white hover:bg-indigo-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-black truncate">
                    Section 2: {activePaperNum === 1 ? `Mathematics (${paperConfig.paper1MathsLanguage})` : `Intelligence Test (${paperConfig.paper2IntelligenceLanguage})`}
                  </div>
                  <div
                    className={`text-[10px] font-semibold ${
                      activeQuestion.questionNumber >= 26 ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    Q26 to Q75 (50 Questions • 100 Marks)
                  </div>
                </button>
              </div>
            }
            questionText={activeQuestion.question}
            options={activeQuestion.options}
            selectedOptionIndex={answers[currentIdx]}
            optionBadgeType="numeric"
            onSelectOption={(optIdx) =>
              setAnswers((prev) => ({
                ...prev,
                [currentIdx]: optIdx,
              }))
            }
            paletteItems={allPaletteItems}
            paletteSections={[
              { title: 'Section 1: Language (Q1 – Q25)', items: sec1Items },
              {
                title: `Section 2: ${activePaperNum === 1 ? 'Mathematics' : 'Intelligence Test'} (Q26 – Q75)`,
                items: sec2Items,
              },
            ]}
            paletteStats={{
              answered: answeredCount,
              unanswered: unansweredCount,
              marked: reviewCount,
            }}
            currentIndex={currentIdx}
            onJumpToQuestion={(idx) => setCurrentIdx(idx)}
            onPrevious={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            canPrevious={currentIdx > 0}
            onClearAnswer={() =>
              setAnswers((prev) => {
                const next = { ...prev };
                delete next[currentIdx];
                return next;
              })
            }
            canClearAnswer={answers[currentIdx] !== undefined}
            isMarkedForReview={Boolean(markedForReview[currentIdx])}
            onToggleMarkForReview={() =>
              setMarkedForReview((prev) => ({
                ...prev,
                [currentIdx]: !prev[currentIdx],
              }))
            }
            onNext={() => setCurrentIdx((i) => Math.min(74, i + 1))}
            nextLabel="Save & Next"
            onSubmitTest={() => setShowSubmitConfirmModal(true)}
            submitLabel={`Submit Paper ${activePaperNum}`}
            onBackToDashboard={() => {
              // Keep ACTIVE_SESSION_STORAGE_KEY intact so student can resume where they left off
              setShowSubmitConfirmModal(false);
              setFlowState('browse');
              void requestReturnToDashboard();
            }}
            progressSavedMessage="Your answers and remaining 90-minute exam timer are saved automatically. You can resume later from where you left off."
            externalModals={
              showSubmitConfirmModal ? (
                <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border-2 border-amber-300 shadow-2xl space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-lg text-slate-900">
                          Confirm Paper {activePaperNum} Submission?
                        </h4>
                        <p className="text-xs text-slate-500">
                          {selectedStd} • Mock Test {String(activeTestNum).padStart(2, '0')} • {effectiveMedium} Medium
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <span className="block text-lg font-black text-emerald-800">{answeredCount}</span>
                        <span className="font-bold text-slate-600">Answered</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                        <span className="block text-lg font-black text-slate-800">{unansweredCount}</span>
                        <span className="font-bold text-slate-600">Unanswered</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                        <span className="block text-lg font-black text-purple-800">{reviewCount}</span>
                        <span className="font-bold text-slate-600">Marked Review</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowSubmitConfirmModal(false)}
                        className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        Continue Answering
                      </button>
                      <button
                        type="button"
                        onClick={() => void evaluateAndSubmitPaper()}
                        className="min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-md"
                      >
                        Yes, Submit Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            }
          />
        );
      })()}

      {/* RESULT & PERFORMANCE ANALYSIS SCREEN */}
      {flowState === 'result' && latestAttemptRecord && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-lg space-y-8 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase">
                  {latestAttemptRecord.stdLevel} • Mock Test {String(latestAttemptRecord.mockTestNumber).padStart(2, '0')} • Paper {latestAttemptRecord.paperNumber}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs uppercase">
                  {latestAttemptRecord.medium} Medium
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2">
                Official MSCE Mock Paper {latestAttemptRecord.paperNumber} Result &amp; Analysis
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {latestAttemptRecord.incorrectCount > 0 && (
                <button
                  type="button"
                  onClick={handleStartRetryIncorrect}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry {latestAttemptRecord.incorrectCount} Incorrect Questions</span>
                </button>
              )}

              {latestAttemptRecord.paperNumber === 1 && (
                <button
                  type="button"
                  onClick={() =>
                    openPreExamInstructions(
                      latestAttemptRecord.stdLevel,
                      latestAttemptRecord.mockTestNumber,
                      2,
                      isFullExamMode,
                      latestAttemptRecord.medium
                    )
                  }
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Start Paper 2 (Fresh 90-Min Timer)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setFlowState('browse')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                All 25 Mock Tests
              </button>
            </div>
          </div>

          {/* If Full Examination Mode (Paper 1 + Paper 2 both completed), show Combined 300-Mark Summary */}
          {isFullExamMode && paper1CompletedRecord && latestAttemptRecord.paperNumber === 2 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full">
                  Full Examination Mode Completed (Paper 1 + Paper 2)
                </span>
                <h4 className="text-xl font-display font-black mt-1">
                  Combined Mock Test {String(latestAttemptRecord.mockTestNumber).padStart(2, '0')} Score:{' '}
                  {paper1CompletedRecord.marksObtained + latestAttemptRecord.marksObtained} / 300 Marks (
                  {Math.round(
                    ((paper1CompletedRecord.marksObtained + latestAttemptRecord.marksObtained) /
                      300) *
                      100
                  )}
                  %)
                </h4>
                <p className="text-xs text-amber-100 font-semibold">
                  Paper 1: {paper1CompletedRecord.marksObtained}/150 • Paper 2:{' '}
                  {latestAttemptRecord.marksObtained}/150
                </p>
              </div>
            </div>
          )}

          {/* 8 Key Performance Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Qs</span>
              <span className="text-xl font-black text-slate-900">75</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Max Marks</span>
              <span className="text-xl font-black text-slate-900">150</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300">
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Obtained</span>
              <span className="text-xl font-black text-amber-900">
                {latestAttemptRecord.marksObtained} / 150
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Correct</span>
              <span className="text-xl font-black text-emerald-800">
                {latestAttemptRecord.correctCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] font-bold uppercase text-rose-800 block">Incorrect</span>
              <span className="text-xl font-black text-rose-800">
                {latestAttemptRecord.incorrectCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-600 block">Unattempted</span>
              <span className="text-xl font-black text-slate-800">
                {latestAttemptRecord.unattemptedCount}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
              <span className="text-[10px] font-bold uppercase text-indigo-800 block">Percentage</span>
              <span className="text-xl font-black text-indigo-900">
                {latestAttemptRecord.percentage}%
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[10px] font-bold uppercase text-blue-800 block">Time Taken</span>
              <span className="text-xl font-black text-blue-900">
                {formatCountdown(latestAttemptRecord.timeTakenSeconds)}
              </span>
            </div>
          </div>

          {/* Subject-Wise Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-sm text-slate-900">
                  Section 1: {latestAttemptRecord.section1Name}
                </span>
                <span className="font-black text-base text-amber-900">
                  {latestAttemptRecord.section1Score} / 50 Marks
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-amber-200/70 overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full"
                  style={{
                    width: `${Math.round((latestAttemptRecord.section1Score / 50) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Questions 1 to 25 • {latestAttemptRecord.section1Score / 2} / 25 Correct
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-sm text-slate-900">
                  Section 2: {latestAttemptRecord.section2Name}
                </span>
                <span className="font-black text-base text-indigo-900">
                  {latestAttemptRecord.section2Score} / 100 Marks
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-indigo-200/70 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${Math.round((latestAttemptRecord.section2Score / 100) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Questions 26 to 75 • {latestAttemptRecord.section2Score / 2} / 50 Correct
              </p>
            </div>
          </div>

          {/* Topic-Wise Performance Breakdown */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-base text-slate-900">
              Topic-Wise Performance Analysis
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {Object.entries(latestAttemptRecord.topicBreakdown).map(([topic, stat]) => {
                const pct = Math.round((stat.correct / stat.total) * 100);
                return (
                  <div
                    key={topic}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900 truncate" title={topic}>
                      {topic}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                      <span>
                        {stat.correct}/{stat.total} Qs
                      </span>
                      <span className="font-black text-emerald-800">{stat.marks}M</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${pct >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed 75-Question Answer Key & Explanations in Selected Medium */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-black text-lg text-slate-900">
                  Complete 75-Question Answer Key &amp; Explanations ({latestAttemptRecord.medium} Medium)
                </h4>
                <p className="text-xs text-slate-500">
                  Review every question, your selected option, the verified correct answer, and step-by-step explanation.
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: 'ALL', label: 'All 75 Qs' },
                    { id: 'SEC1', label: 'Section 1 (Q1–25)' },
                    { id: 'SEC2', label: 'Section 2 (Q26–75)' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAnswerKeySectionFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer ${
                      answerKeySectionFilter === tab.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
              {paperQuestions
                .filter((q) => {
                  if (answerKeySectionFilter === 'SEC1') return q.questionNumber <= 25;
                  if (answerKeySectionFilter === 'SEC2') return q.questionNumber >= 26;
                  return true;
                })
                .map((q) => {
                  const idx = q.questionNumber - 1;
                  const chosen = latestAttemptRecord.answers[idx];
                  const isCorrect = chosen === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-black text-[10px]">
                              Q{q.questionNumber}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                              {q.subjectLabel}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px]">
                              {q.topic}
                            </span>
                            {q.verification?.greenVerified && (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-[10px]">
                                🟢 GREEN VERIFIED
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-slate-900 text-sm whitespace-pre-line">
                            {q.question}
                          </p>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full font-black text-[11px] shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : chosen !== undefined
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCorrect
                            ? 'Correct (+2)'
                            : chosen !== undefined
                              ? 'Incorrect (0)'
                              : 'Unattempted (0)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isAns = oIdx === q.correctAnswer;
                          const isUser = chosen === oIdx;
                          let cls = 'bg-white border-slate-200 text-slate-700';
                          if (isAns) {
                            cls = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isUser && !isAns) {
                            cls = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                          }
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl border flex items-center justify-between ${cls}`}
                            >
                              <span>
                                ({oIdx + 1}) {opt}
                              </span>
                              {isAns && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-slate-700">
                        <strong className="text-amber-950">Explanation: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* RETRY INCORRECT QUESTIONS INTERFACE */}
      {flowState === 'retry_incorrect' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-lg space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-black text-xs uppercase">
                Targeted Mistake Recovery Mode
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                Retry Incorrect Questions ({retryQuestions.length} Questions)
              </h3>
              <p className="text-xs text-slate-500">
                Re-attempt the questions you got wrong in Mock Test {String(activeTestNum).padStart(2, '0')} Paper {activePaperNum}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFlowState('result')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs self-start cursor-pointer"
            >
              ← Back to Full Result
            </button>
          </div>

          <div className="space-y-4">
            {retryQuestions.map((q, rIdx) => {
              const selected = retryAnswers[rIdx];
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded">
                      Original Q#{q.questionNumber} • {q.topic}
                    </span>
                    {retrySubmitted && (
                      <span
                        className={`font-black px-2.5 py-0.5 rounded-full ${
                          selected === q.correctAnswer
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {selected === q.correctAnswer ? 'Fixed! Correct ✓' : 'Still Incorrect'}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm text-slate-900 whitespace-pre-line">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isSel = selected === oIdx;
                      let style = 'bg-white border-slate-200 text-slate-800';
                      if (retrySubmitted) {
                        if (oIdx === q.correctAnswer) {
                          style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isSel) {
                          style = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                        }
                      } else if (isSel) {
                        style = 'bg-amber-600 border-amber-600 text-white font-bold';
                      }
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={retrySubmitted}
                          onClick={() =>
                            setRetryAnswers((prev) => ({
                              ...prev,
                              [rIdx]: oIdx,
                            }))
                          }
                          className={`p-3 rounded-xl border text-left text-xs cursor-pointer transition-all ${style}`}
                        >
                          ({oIdx + 1}) {opt}
                        </button>
                      );
                    })}
                  </div>
                  {retrySubmitted && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700">
                      <strong className="text-amber-950">Solution: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            {!retrySubmitted ? (
              <button
                type="button"
                onClick={() => setRetrySubmitted(true)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-md"
              >
                Check Retry Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFlowState('result')}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer"
              >
                Done Reviewing
              </button>
            )}
          </div>
        </div>
      )}

      {/* BROWSE MODE: 25 MOCK TESTS GRID / PROGRESS DASHBOARD / 10-BATCH VIEW */}
      {flowState === 'browse' && (
        <>
          {subView === 'tests' && (
            <div className="space-y-5">
              {/* Batch Filter Pills (Tests 1-5, 6-10, 11-15, 16-20, 21-25) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBatchRange(null)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer ${
                      selectedBatchRange === null
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All 25 Mock Tests
                  </button>
                  {(
                    [
                      { range: [1, 5] as [number, number], label: 'Tests 01–05 (Basic Level)' },
                      { range: [6, 10] as [number, number], label: 'Tests 06–10 (Intermediate I)' },
                      { range: [11, 15] as [number, number], label: 'Tests 11–15 (Intermediate II)' },
                      { range: [16, 20] as [number, number], label: 'Tests 16–20 (Advanced I)' },
                      { range: [21, 25] as [number, number], label: 'Tests 21–25 (Advanced Merit)' },
                    ]
                  ).map((b) => {
                    const isSel =
                      selectedBatchRange?.[0] === b.range[0] &&
                      selectedBatchRange?.[1] === b.range[1];
                    return (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => setSelectedBatchRange(b.range)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                          isSel
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                        }`}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Showing {visibleTestNumbers.length} Full Mock Tests ({selectedStd})
                </span>
              </div>

              {/* Category Unlock / Status Banner */}
              <div className={`rounded-2xl p-4 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                hasPaidScholarshipAccess
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-2.5 font-bold">
                  {hasPaidScholarshipAccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>
                        All 25 {selectedStd} Scholarship Full Mock Tests (Paper 1 &amp; Paper 2) are Active ({categorySubInfo.daysRemainingDisplay}).
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        {lockedMockNotice ||
                          `Mock Test 01 is a Free Preview for ${selectedStd}. Unlock Mock Tests 02 to 25 (Paper 1 & 2) with the ${selectedStd} Scholarship Plan (₹99 / 365 Days).`}
                      </span>
                    </>
                  )}
                </div>
                {!hasPaidScholarshipAccess && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {!currentStudent && onOpenAuth && (
                      <button
                        type="button"
                        onClick={onOpenAuth}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                      >
                        Sign In Free
                      </button>
                    )}
                    {onOpenMembership && (
                      <button
                        type="button"
                        onClick={() => onOpenMembership(activePlanSku)}
                        className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1 cursor-pointer"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        <span>Unlock {selectedStd} (₹99)</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 25 Full Mock Tests Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleTestNumbers.map((testNum) => {
                  const pubKey = `${selectedStd}_${testNum}`;
                  const isPublished = publishedMsceMockTests[pubKey] !== false;
                  const p1Best = progressStats.p1BestByTest[testNum];
                  const p2Best = progressStats.p2BestByTest[testNum];
                  const isTestLocked = testNum > 1 && !hasPaidScholarshipAccess;
                  const tierBadge =
                    testNum <= 5
                      ? 'Basic Scholarship Level'
                      : testNum <= 15
                        ? 'Intermediate Scholarship Level'
                        : 'Advanced Scholarship Level';

                  if (!isPublished) {
                    return (
                      <div
                        key={testNum}
                        className="bg-slate-100 rounded-3xl p-5 border border-slate-200 opacity-75 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase">
                            {selectedStd} • Mock Test {String(testNum).padStart(2, '0')}
                          </span>
                          <h4 className="font-display font-bold text-base text-slate-700 mt-1">
                            Unpublished by Admin
                          </h4>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={testNum}
                      className={`bg-white rounded-3xl p-5 border-2 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                        isTestLocked
                          ? 'border-slate-200 hover:border-amber-400'
                          : 'border-amber-200/90 hover:border-amber-500 hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs">
                            {selectedStd === 'Std 4th' ? '🎓 Std. 4th' : '🎓 Std. 7th'} – Mock Test{' '}
                            {String(testNum).padStart(2, '0')}
                          </span>
                          {isTestLocked ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-[10px] flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> ₹99 Plan
                            </span>
                          ) : testNum === 1 && !hasPaidScholarshipAccess ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                              Free Preview
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 font-bold text-[10px]">
                              {tierBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-display font-black text-base text-slate-900">
                            MSCE Pune Full Mock Examination #{String(testNum).padStart(2, '0')}
                          </h4>
                          {verifiedTestStatusMap[testNum]?.isVerifiedMockTest ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-[10px] shrink-0">
                              🟢 VERIFIED MOCK TEST
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px] shrink-0">
                              ⏳ Review Needed
                            </span>
                          )}
                        </div>

                        {/* Paper 1 & Paper 2 Details */}
                        <div className="space-y-2 pt-1 text-xs">
                          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-black text-amber-950 block">
                                Paper 1: {paperConfig.paper1FirstLanguage} (25) + Maths (50)
                              </span>
                              <span className="text-[11px] text-slate-600">
                                75 Questions • 150 Marks • 90 Mins
                              </span>
                            </div>
                            {p1Best !== undefined && (
                              <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-[10px] shrink-0">
                                Best: {p1Best}/150
                              </span>
                            )}
                          </div>

                          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-black text-indigo-950 block">
                                Paper 2: {paperConfig.paper2SecondLanguage} (25) + Intelligence (50)
                              </span>
                              <span className="text-[11px] text-slate-600">
                                75 Questions • 150 Marks • 90 Mins
                              </span>
                            </div>
                            {p2Best !== undefined && (
                              <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-[10px] shrink-0">
                                Best: {p2Best}/150
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 3 Action Buttons: Start Paper 1 | Start Paper 2 | Full Examination Mode OR Unlock */}
                      {isTestLocked ? (
                        <div className="pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => openPreExamInstructions(selectedStd, testNum, 1, false)}
                            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Unlock Mock Test #{String(testNum).padStart(2, '0')} ({selectedStd} • ₹99)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openPreExamInstructions(selectedStd, testNum, 1, false)
                              }
                              className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs cursor-pointer transition-all text-center shadow-2xs"
                            >
                              Start Paper 1
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                openPreExamInstructions(selectedStd, testNum, 2, false)
                              }
                              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer transition-all text-center shadow-2xs"
                            >
                              Start Paper 2
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              openPreExamInstructions(selectedStd, testNum, 1, true)
                            }
                            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-[11px] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Full Exam Mode (Paper 1 + Paper 2 • 300 Marks)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STUDENT PROGRESS DASHBOARD (Strictly Separated for Std 4th vs Std 7th) */}
          {subView === 'progress' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase">
                    {selectedStd === 'Std 4th'
                      ? 'Std. 4th – Primary Scholarship (PSE)'
                      : 'Std. 7th – Upper Primary Scholarship (UPS)'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                    Student Scholarship Progress Dashboard ({selectedStd})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Separate progress tracking for {selectedStd} across all 25 Full Mock Tests (Paper 1 &amp; Paper 2).
                  </p>
                </div>
              </div>

              {/* 6 Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                    Completed Mock Tests
                  </span>
                  <span className="text-2xl font-black text-emerald-900">
                    {progressStats.completedFullTestsCount} / 25
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    Pending Mock Tests
                  </span>
                  <span className="text-2xl font-black text-amber-900">
                    {progressStats.pendingFullTestsCount}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                  <span className="text-[10px] font-bold uppercase text-indigo-800 block">
                    Papers Attempted
                  </span>
                  <span className="text-2xl font-black text-indigo-900">
                    {stdAttempts.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] font-bold uppercase text-purple-800 block">
                    Highest Paper Score
                  </span>
                  <span className="text-2xl font-black text-purple-900">
                    {progressStats.highestPaperScore} / 150
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold uppercase text-blue-800 block">
                    Average Paper Score
                  </span>
                  <span className="text-2xl font-black text-blue-900">
                    {progressStats.averagePaperScore} / 150
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-[10px] font-bold uppercase text-teal-800 block">
                    Overall Performance
                  </span>
                  <span className="text-2xl font-black text-teal-900">
                    {progressStats.overallAccuracy}%
                  </span>
                </div>
              </div>

              {/* Mock Test 01 to 25 Paper 1 & Paper 2 Score Matrix & Improvement Chart */}
              <div className="space-y-3">
                <h4 className="font-display font-black text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Mock Test 01 to 25 – Paper 1 &amp; Paper 2 Scoreboard &amp; Improvement Chart</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((tNum) => {
                    const p1 = progressStats.p1BestByTest[tNum];
                    const p2 = progressStats.p2BestByTest[tNum];
                    const combined = (p1 || 0) + (p2 || 0);
                    return (
                      <div
                        key={tNum}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900">
                            Mock Test {String(tNum).padStart(2, '0')}
                          </span>
                          <span className="font-bold text-[10px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            {combined}/300
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600">Paper 1:</span>
                          <span className="font-bold text-slate-900">
                            {p1 !== undefined ? `${p1}/150` : 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600">Paper 2:</span>
                          <span className="font-bold text-slate-900">
                            {p2 !== undefined ? `${p2}/150` : 'Pending'}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${Math.round((combined / 300) * 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Previous Attempt History */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-display font-black text-base text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-600" />
                  <span>Previous Attempt History ({stdAttempts.length} Attempts)</span>
                </h4>
                {stdAttempts.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4">
                    No full mock papers attempted yet for {selectedStd}. Click &ldquo;All 25 Mock Tests&rdquo; above to begin Mock Test 01!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {stdAttempts.map((att) => (
                      <div
                        key={att.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-black text-slate-900">
                            {att.stdLevel} • Mock Test {String(att.mockTestNumber).padStart(2, '0')} • Paper {att.paperNumber} ({att.medium} Medium)
                          </span>
                          <p className="text-[11px] text-slate-500">
                            {att.section1Name}: {att.section1Score}/50 • {att.section2Name}: {att.section2Score}/100 • Completed {new Date(att.completedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-black">
                            {att.marksObtained} / 150 ({att.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 10-BATCH GENERATION & SYLLABUS STRUCTURE VIEW */}
          {subView === 'batches' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs uppercase">
                  10 Verified Batches • 7,500 Question Positions
                </span>
                <h3 className="text-xl font-display font-black text-slate-900 mt-1">
                  MSCE Pune 10-Batch Generation &amp; Progressive Difficulty Structure
                </h3>
                <p className="text-xs text-slate-500">
                  All 50 Full Mock Tests (25 Std. 4th + 25 Std. 7th) are organized into 10 systematic batches of 5 tests (750 questions per batch).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {getMsceTenBatches().map((batch) => (
                  <div
                    key={batch.batchNumber}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-black text-slate-900 block">{batch.label}</span>
                      <p className="text-slate-600">
                        {batch.totalTests} Mock Tests × {batch.questionsPerTest} Qs ={' '}
                        <strong>{batch.totalQuestionsInBatch} Questions</strong>
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold text-[10px]">
                        {batch.difficultyTier}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStd(batch.stdLevel);
                        setSelectedBatchRange(batch.testRange);
                        setSubView('tests');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs cursor-pointer shrink-0"
                    >
                      Open Batch →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
