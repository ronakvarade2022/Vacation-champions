import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  Compass,
  Filter,
  GraduationCap,
  History,
  Layers,
  Play,
  RefreshCw,
  ShieldCheck,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  TetCtetAttemptRecord,
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetModuleId,
  TetCtetPaper2Stream,
  TetCtetPoolType,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../types/tetCtet';
import {
  getBatchSummariesForModule,
  getOfficialLanguagePairs,
  getOfficialSyllabusForModule,
  getPaperSubjectDistribution,
  TET_CTET_EXAM_DURATION_SECONDS,
  TET_CTET_MODULE_LIST,
  TET_CTET_MODULES,
} from '../data/tetCtetSyllabi';
import { MOCK_TEST_QA_STATUS_BY_KEY } from '../data/tetCtetCentralAuditSnapshot';
import {
  getStudentQuestionErrorReports,
  subscribeToQuestionErrorReports,
} from '../services/questionErrorReportService';
import { getReportStatusBadgeStyle } from './TetCtetReportQuestionModal';

const TetCtetExamSimulator = lazy(() =>
  import('./TetCtetExamSimulator').then((m) => ({ default: m.TetCtetExamSimulator }))
);

function formatHhMmSs(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export type TetCtetModuleSubTab =
  | 'mock-tests'
  | 'subject-practice'
  | 'topic-practice'
  | 'revision'
  | 'syllabus'
  | 'performance'
  | 'pyq-pattern';

interface TetCtetModuleViewProps {
  moduleId: TetCtetModuleId;
  initialSubTab?: TetCtetModuleSubTab;
  onSelectModule: (moduleId: TetCtetModuleId) => void;
  onBackToLanding: () => void;
}

interface ActiveSimulatorSession {
  mode: TetCtetPoolType;
  mockTestNumber?: number;
  practiceTitle?: string;
  questions: TetCtetQuestion[];
  durationSeconds: number;
  autoStartSkipInstructions?: boolean;
}

const SUB_TABS: Array<{
  id: TetCtetModuleSubTab;
  label: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'mock-tests', label: '50 Mock Tests', icon: ClipboardList },
  { id: 'subject-practice', label: 'Subject Practice', icon: BookOpen },
  { id: 'topic-practice', label: 'Topic Practice', icon: Compass },
  { id: 'revision', label: 'Revision Tests', icon: RefreshCw },
  { id: 'pyq-pattern', label: 'Prev-Year Pattern', icon: History },
  { id: 'syllabus', label: 'Syllabus & Pattern', icon: BookMarked },
  { id: 'performance', label: 'Performance & Charts', icon: BarChart3 },
];

export const TetCtetModuleView: React.FC<TetCtetModuleViewProps> = ({
  moduleId,
  initialSubTab = 'mock-tests',
  onSelectModule,
  onBackToLanding,
}) => {
  const {
    currentStudent,
    tetCtetPreferences,
    updateTetCtetPreferences,
    tetCtetAttempts,
    recordTetCtetAttempt,
    tetCtetBatches,
    customTetCtetQuestions,
    rejectedTetCtetIds,
    tetCtetEnforceGreenOnly,
  } = useApp();

  const modMeta = TET_CTET_MODULES[moduleId];
  const [activeSubTab, setActiveSubTab] = useState<TetCtetModuleSubTab>(initialSubTab);
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<number | 'ALL'>('ALL');
  const [topicSubjectFilter, setTopicSubjectFilter] = useState<string>('ALL');
  const [subjectSetNumbers, setSubjectSetNumbers] = useState<Record<string, number>>({});
  const [performanceScope, setPerformanceScope] = useState<'module' | 'all'>('module');
  const [activeSession, setActiveSession] = useState<ActiveSimulatorSession | null>(null);
  const [reportTick, setReportTick] = useState<number>(0);

  useEffect(() => {
    return subscribeToQuestionErrorReports(() => {
      setReportTick((prev) => prev + 1);
    });
  }, []);

  const studentQuestionReports = useMemo(() => {
    void reportTick;
    return getStudentQuestionErrorReports(currentStudent?.id || 'guest_tet_ctet');
  }, [currentStudent?.id, reportTick]);

  const isMaha = modMeta.exam === 'MAHA_TET';
  const rawL1 = isMaha ? tetCtetPreferences.mahaTetL1 : tetCtetPreferences.ctetL1;
  const rawL2 = isMaha ? tetCtetPreferences.mahaTetL2 : tetCtetPreferences.ctetL2;
  const rawMedium = isMaha ? tetCtetPreferences.mahaTetMedium : tetCtetPreferences.ctetMedium;

  const { language1, language2 } = useMemo(
    () => getOfficialLanguagePairs(modMeta.exam, rawL1, rawL2),
    [modMeta.exam, rawL1, rawL2]
  );

  const activeMedium: TetCtetMedium = modMeta.supportedMediums.includes(rawMedium)
    ? rawMedium
    : modMeta.supportedMediums[0];

  const activeStream: TetCtetPaper2Stream = tetCtetPreferences.paper2Stream || 'MATH_SCIENCE';

  const paperSlots = useMemo(
    () => getPaperSubjectDistribution(modMeta.paper, activeStream, language1, language2),
    [modMeta.paper, activeStream, language1, language2]
  );

  const syllabusUnits = useMemo(
    () => getOfficialSyllabusForModule(moduleId, activeStream),
    [moduleId, activeStream]
  );

  const batches = useMemo(() => getBatchSummariesForModule(moduleId), [moduleId]);

  const moduleAttempts = useMemo(
    () => tetCtetAttempts.filter((a) => a.moduleId === moduleId),
    [tetCtetAttempts, moduleId]
  );

  const displayedAttempts = useMemo(
    () => (performanceScope === 'module' ? moduleAttempts : tetCtetAttempts),
    [performanceScope, moduleAttempts, tetCtetAttempts]
  );

  // Best score lookup per mock test number
  const mockBestByNumber = useMemo(() => {
    const map = new Map<number, { bestMarks: number; bestPct: number; attempts: number; qualified: boolean }>();
    for (const att of moduleAttempts) {
      if (att.mode === 'MOCK' && att.mockTestNumber) {
        const prev = map.get(att.mockTestNumber);
        if (!prev) {
          map.set(att.mockTestNumber, {
            bestMarks: att.marksObtained,
            bestPct: att.percentage,
            attempts: 1,
            qualified: att.qualified,
          });
        } else {
          map.set(att.mockTestNumber, {
            bestMarks: Math.max(prev.bestMarks, att.marksObtained),
            bestPct: Math.max(prev.bestPct, att.percentage),
            attempts: prev.attempts + 1,
            qualified: prev.qualified || att.qualified,
          });
        }
      }
    }
    return map;
  }, [moduleAttempts]);

  // Weakest subject detection across module attempts for auto-revision recommendations
  const subjectAnalytics = useMemo(() => {
    const agg = new Map<
      string,
      { subjectId: TetCtetSubjectId; label: string; obtained: number; max: number; correct: number; total: number }
    >();
    for (const att of displayedAttempts) {
      Object.values(att.subjectBreakdown || {}).forEach((sb) => {
        const cur = agg.get(sb.subjectId) || {
          subjectId: sb.subjectId,
          label: sb.label.replace(/\s*\([^)]*\)$/, ''),
          obtained: 0,
          max: 0,
          correct: 0,
          total: 0,
        };
        cur.obtained += sb.marks;
        cur.max += sb.maxMarks;
        cur.correct += sb.correct;
        cur.total += sb.total;
        agg.set(sb.subjectId, cur);
      });
    }
    return Array.from(agg.values())
      .map((item) => ({
        ...item,
        accuracy: item.max > 0 ? Math.round((item.obtained / item.max) * 100) : 0,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [displayedAttempts]);

  const handleLanguage1Change = (newL1: TetCtetLanguage) => {
    const fixed = getOfficialLanguagePairs(modMeta.exam, newL1, language2);
    if (isMaha) {
      updateTetCtetPreferences({ mahaTetL1: fixed.language1, mahaTetL2: fixed.language2 });
    } else {
      updateTetCtetPreferences({ ctetL1: fixed.language1, ctetL2: fixed.language2 });
    }
  };

  const handleLanguage2Change = (newL2: TetCtetLanguage) => {
    const fixed = getOfficialLanguagePairs(modMeta.exam, language1, newL2);
    if (isMaha) {
      updateTetCtetPreferences({ mahaTetL1: fixed.language1, mahaTetL2: fixed.language2 });
    } else {
      updateTetCtetPreferences({ ctetL1: fixed.language1, ctetL2: fixed.language2 });
    }
  };

  const handleMediumChange = (nextMed: TetCtetMedium) => {
    if (isMaha) updateTetCtetPreferences({ mahaTetMedium: nextMed });
    else updateTetCtetPreferences({ ctetMedium: nextMed });
  };

  const handleLaunchMockTest = async (testNumber: number) => {
    const { buildTetCtetMockPaper } = await import('../data/tetCtetQuestionEngine');
    const qs = buildTetCtetMockPaper({
      exam: modMeta.exam,
      paper: modMeta.paper,
      testNumber,
      language1,
      language2,
      medium: activeMedium,
      stream: activeStream,
      customOverrides: customTetCtetQuestions,
      rejectedIds: rejectedTetCtetIds,
    });
    setActiveSession({
      mode: 'MOCK',
      mockTestNumber: testNumber,
      questions: qs,
      durationSeconds: TET_CTET_EXAM_DURATION_SECONDS,
    });
  };

  const handleLaunchSubjectPractice = async (subjectId: TetCtetSubjectId, label: string, setIndex = 1) => {
    const { buildTetCtetPracticeSet } = await import('../data/tetCtetQuestionEngine');
    const qs = buildTetCtetPracticeSet({
      exam: modMeta.exam,
      paper: modMeta.paper,
      poolType: 'SUBJECT_PRACTICE',
      subjectId,
      setIndex,
      count: 30,
      language1,
      language2,
      medium: activeMedium,
      stream: activeStream,
    });
    setActiveSession({
      mode: 'SUBJECT_PRACTICE',
      practiceTitle: `${label} · Practice Set ${String(setIndex).padStart(2, '0')}`,
      questions: qs,
      durationSeconds: 30 * 60,
    });
  };

  const handleLaunchTopicPractice = async (subjectId: TetCtetSubjectId, topic: string, topicIdx = 0) => {
    const { buildTetCtetPracticeSet } = await import('../data/tetCtetQuestionEngine');
    const qs = buildTetCtetPracticeSet({
      exam: modMeta.exam,
      paper: modMeta.paper,
      poolType: 'TOPIC_PRACTICE',
      subjectId,
      topicFilter: topic,
      setIndex: topicIdx + 1,
      count: 20,
      language1,
      language2,
      medium: activeMedium,
      stream: activeStream,
    });
    setActiveSession({
      mode: 'TOPIC_PRACTICE',
      practiceTitle: `Topic Drill: ${topic}`,
      questions: qs,
      durationSeconds: 20 * 60,
    });
  };

  const handleLaunchRevisionTest = async (revNum: number, focusSubjectId?: TetCtetSubjectId) => {
    const { buildTetCtetPracticeSet } = await import('../data/tetCtetQuestionEngine');
    const qs = buildTetCtetPracticeSet({
      exam: modMeta.exam,
      paper: modMeta.paper,
      poolType: 'REVISION',
      subjectId: focusSubjectId,
      setIndex: revNum,
      count: focusSubjectId ? 25 : 30,
      language1,
      language2,
      medium: activeMedium,
      stream: activeStream,
    });
    setActiveSession({
      mode: 'REVISION',
      practiceTitle: focusSubjectId
        ? `Weak-Area Intensive Revision (${focusSubjectId})`
        : `High-Yield Revision Test ${String(revNum).padStart(2, '0')}`,
      questions: qs,
      durationSeconds: 30 * 60,
    });
  };

  const handleLaunchPyqTest = async (paperIdx: number, count: number, yearLabel: string) => {
    const { buildTetCtetPracticeSet } = await import('../data/tetCtetQuestionEngine');
    const qs = buildTetCtetPracticeSet({
      exam: modMeta.exam,
      paper: modMeta.paper,
      poolType: 'PYQ_PATTERN',
      setIndex: paperIdx,
      count,
      language1,
      language2,
      medium: activeMedium,
      stream: activeStream,
    });
    setActiveSession({
      mode: 'PYQ_PATTERN',
      practiceTitle: `${yearLabel} Official Pattern Paper (${count} Qs)`,
      questions: qs,
      durationSeconds: count >= 150 ? TET_CTET_EXAM_DURATION_SECONDS : count * 60,
    });
  };

  // If CBT Simulator is active, render simulator workspace cleanly
  if (activeSession) {
    return (
      <Suspense
        fallback={
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4 animate-pulse">
            <div className="h-7 w-64 bg-slate-200 rounded-xl" />
            <div className="h-4 w-96 max-w-full bg-slate-100 rounded-lg" />
          </div>
        }
      >
        <TetCtetExamSimulator
          exam={modMeta.exam}
          paper={modMeta.paper}
          moduleId={moduleId}
          mode={activeSession.mode}
          mockTestNumber={activeSession.mockTestNumber}
          practiceTitle={activeSession.practiceTitle}
          questions={activeSession.questions}
          language1={language1}
          language2={language2}
          medium={activeMedium}
          stream={modMeta.paper === 2 ? activeStream : undefined}
          durationSeconds={activeSession.durationSeconds}
          studentId={currentStudent?.id || 'guest_tet_ctet'}
          studentName={currentStudent?.name || 'Student Candidate'}
          autoStartSkipInstructions={activeSession.autoStartSkipInstructions}
          onSaveAttempt={recordTetCtetAttempt}
          onPractiseWeakTopic={(weakSubj) => {
            void import('../data/tetCtetQuestionEngine').then(({ buildTetCtetPracticeSet }) => {
              const qs = buildTetCtetPracticeSet({
                exam: modMeta.exam,
                paper: modMeta.paper,
                poolType: 'TOPIC_PRACTICE',
                subjectId: weakSubj,
                topicFilter: 'Targeted Remediation',
                setIndex: Math.floor(Math.random() * 5) + 1,
                count: 20,
                language1,
                language2,
                medium: activeMedium,
                stream: activeStream,
              });
              setActiveSession({
                mode: 'TOPIC_PRACTICE',
                practiceTitle: `Weak-Area Practice (${weakSubj})`,
                questions: qs,
                durationSeconds: 20 * 60,
                autoStartSkipInstructions: true,
              });
            });
          }}
          onExit={() => setActiveSession(null)}
          onOpenPerformanceTab={() => {
            setActiveSession(null);
            setActiveSubTab('performance');
          }}
        />
      </Suspense>
    );
  }

  const publishedMockCount = batches.reduce((acc, b) => {
    const rec = tetCtetBatches[`${moduleId}_B${b.batchNumber}`];
    return acc + (rec?.published !== false ? b.totalTests : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Top Module Navigation & Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToLanding}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TET &amp; CTET Hub</span>
          </button>

          {/* 4-Module Quick Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {TET_CTET_MODULE_LIST.map((m) => {
              const isSelected = m.moduleId === moduleId;
              return (
                <button
                  key={m.moduleId}
                  type="button"
                  onClick={() => {
                    onSelectModule(m.moduleId);
                    setSelectedBatchFilter('ALL');
                  }}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-display font-black whitespace-nowrap shrink-0 cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-900'
                  }`}
                >
                  {m.examTitle} · Paper {m.paper}
                </button>
              );
            })}
          </div>
        </div>

        {/* Module Identity Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-200">
              <span>{modMeta.code}</span>
              <span aria-hidden="true">·</span>
              <span>{modMeta.classesRange}</span>
              <span aria-hidden="true">·</span>
              <span>{modMeta.officialPortal}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white">
              {modMeta.examTitle} — {modMeta.paperTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {modMeta.tagline} · Conducted by {modMeta.conductingBody}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
              <span className="text-[11px] font-semibold text-indigo-200 block">Mock Tests</span>
              <span className="text-lg font-mono tabular-nums font-black text-white">
                {publishedMockCount}/50
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
              <span className="text-[11px] font-semibold text-indigo-200 block">Paper Marks</span>
              <span className="text-lg font-mono tabular-nums font-black text-amber-300">
                150
              </span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-center">
              <span className="text-[11px] font-semibold text-indigo-200 block">Duration</span>
              <span className="text-lg font-mono tabular-nums font-black text-emerald-300">
                150m
              </span>
            </div>
          </div>
        </div>

        {/* Official Language 1, Language 2, Medium & Paper 2 Stream Selector */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-display font-black text-slate-900">
                Configure Official Examination Languages &amp; Subject Stream
              </h2>
              <p className="text-xs text-slate-600">
                Language 1 and Language 2 must be distinct ({modMeta.supportedLanguages.join(', ')} supported for {modMeta.examTitle}).
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800">
              +1 Mark / Correct · Zero Negative Marking
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label
                htmlFor="tet-l1-select"
                className="block font-bold text-slate-700 mb-1"
              >
                Language 1 (30 Qs · Q31–Q60)
              </label>
              <select
                id="tet-l1-select"
                value={language1}
                onChange={(e) => handleLanguage1Change(e.target.value as TetCtetLanguage)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 cursor-pointer"
              >
                {modMeta.supportedLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="tet-l2-select"
                className="block font-bold text-slate-700 mb-1"
              >
                Language 2 (30 Qs · Q61–Q90)
              </label>
              <select
                id="tet-l2-select"
                value={language2}
                onChange={(e) => handleLanguage2Change(e.target.value as TetCtetLanguage)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 cursor-pointer"
              >
                {modMeta.supportedLanguages
                  .filter((lang) => lang !== language1)
                  .map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="tet-med-select"
                className="block font-bold text-slate-700 mb-1"
              >
                Core Paper Medium
              </label>
              <select
                id="tet-med-select"
                value={activeMedium}
                onChange={(e) => handleMediumChange(e.target.value as TetCtetMedium)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 cursor-pointer"
              >
                {modMeta.supportedMediums.map((med) => (
                  <option key={med} value={med}>
                    {med} Medium
                  </option>
                ))}
              </select>
            </div>

            {modMeta.paper === 2 ? (
              <div>
                <label
                  htmlFor="tet-stream-select"
                  className="block font-bold text-slate-700 mb-1"
                >
                  Paper 2 Subject Stream (60 Qs)
                </label>
                <select
                  id="tet-stream-select"
                  value={activeStream}
                  onChange={(e) =>
                    updateTetCtetPreferences({
                      paper2Stream: e.target.value as TetCtetPaper2Stream,
                    })
                  }
                  className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 cursor-pointer"
                >
                  <option value="MATH_SCIENCE">Mathematics &amp; Science (30+30)</option>
                  <option value="SOCIAL_STUDIES">Social Studies / Social Science (60)</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col justify-end">
                <div className="min-h-[42px] px-3 py-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold text-slate-700">
                  <span>Qualifying Target</span>
                  <span className="font-mono tabular-nums text-indigo-800">
                    {modMeta.qualifyingGeneralMarks}/150 (60%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7 Sub-Feature Navigation Bar */}
        <div
          role="tablist"
          aria-label="Module Preparation Features"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 rounded-2xl"
        >
          {SUB_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-display font-black whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          TAB 1: 50 FULL-LENGTH MOCK TESTS (IN 10 BATCHES OF 5 TESTS EACH)
          ===================================================================== */}
      {activeSubTab === 'mock-tests' && (
        <div className="space-y-5">
          {/* Batch Filter Strip */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-display font-black text-slate-900">
                  Full-Length Mock Test Series (50 Tests · 7,500 Unique Questions)
                </h2>
                <p className="text-xs text-slate-600">
                  Organized into 10 verified batches of 5 full 150-question CBT tests ({language1} + {language2}, {activeMedium} Medium).
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <Filter className="w-4 h-4 text-indigo-700" />
                <span>Filter by Batch:</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedBatchFilter('ALL')}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer border transition-colors ${
                  selectedBatchFilter === 'ALL'
                    ? 'bg-indigo-700 text-white border-indigo-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                All 10 Batches (1–50)
              </button>
              {batches.map((b) => (
                <button
                  key={b.batchNumber}
                  type="button"
                  onClick={() => setSelectedBatchFilter(b.batchNumber)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer border transition-colors ${
                    selectedBatchFilter === b.batchNumber
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  Batch {String(b.batchNumber).padStart(2, '0')} ({b.testRange[0]}–{b.testRange[1]})
                </button>
              ))}
            </div>
          </div>

          {/* Batches & Mock Test Cards */}
          <div className="space-y-5">
            {batches
              .filter((b) => selectedBatchFilter === 'ALL' || selectedBatchFilter === b.batchNumber)
              .map((batch) => {
                const batchKey = `${moduleId}_B${batch.batchNumber}`;
                const statusRec = tetCtetBatches[batchKey];
                const isPublished = statusRec?.published !== false;
                const isVerified = statusRec?.verified !== false;
                const testNumbers = Array.from(
                  { length: batch.totalTests },
                  (_, i) => batch.testRange[0] + i
                );

                return (
                  <section
                    key={batch.batchNumber}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                          {batch.label}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {batch.difficultyBand}
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono tabular-nums">750 Questions</span>
                          <span aria-hidden="true"> · </span>
                          <span>{isVerified ? 'Zero-Duplicate Audited' : 'Audit Pending'}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {isPublished ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Live for Practice</span>
                          </span>
                        ) : (
                          <span className="text-amber-700">Temporarily Held by Admin</span>
                        )}
                      </div>
                    </div>

                    {!isPublished ? (
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs font-semibold text-slate-600">
                        This 5-test batch is currently under editorial review by the platform administrator. Please explore other live batches or Practice Tabs.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {testNumbers.map((tNum) => {
                          const best = mockBestByNumber.get(tNum);
                          const qaRec = MOCK_TEST_QA_STATUS_BY_KEY[`${moduleId}_T${tNum}`];
                          const qaLocked = tetCtetEnforceGreenOnly && qaRec?.status !== 'GREEN';
                          return (
                            <div
                              key={tNum}
                              className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-colors ${
                                qaLocked
                                  ? 'bg-slate-100/80 border-slate-200 opacity-85'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-indigo-300'
                              }`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono tabular-nums text-xs font-black text-indigo-800">
                                    MOCK TEST {String(tNum).padStart(2, '0')}
                                  </span>
                                  {qaRec?.status === 'GREEN' ? (
                                    <span className="text-[10px] font-black uppercase text-emerald-700">
                                      Verified GREEN
                                    </span>
                                  ) : best ? (
                                    <span
                                      className={`text-[11px] font-mono tabular-nums font-black ${
                                        best.qualified ? 'text-emerald-700' : 'text-amber-700'
                                      }`}
                                    >
                                      {best.bestMarks}/150 ({best.bestPct}%)
                                    </span>
                                  ) : null}
                                </div>
                                <h4 className="text-sm font-display font-black text-slate-900">
                                  {modMeta.examTitle} P{modMeta.paper} Full Set {tNum}
                                </h4>
                                <p className="text-[11px] text-slate-600 font-medium">
                                  150 Qs · 150 Marks · 02:30:00
                                </p>
                                {best && (
                                  <p className="text-[11px] font-semibold text-slate-700">
                                    Attempted {best.attempts}×
                                  </p>
                                )}
                              </div>

                              {qaLocked ? (
                                <button
                                  type="button"
                                  disabled
                                  className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-slate-200 text-slate-600 font-display font-black text-xs flex items-center justify-center gap-1.5 cursor-not-allowed whitespace-nowrap"
                                >
                                  <span>
                                    {qaRec?.status === 'YELLOW' ? 'QA Review Pending' : 'Not Published Yet'}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleLaunchMockTest(tNum)}
                                  className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>{best ? 'Retake Test' : 'Start Test'}</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: SUBJECT-WISE PRACTICE (DISJOINT FROM MOCK TEST BANK)
          ===================================================================== */}
      {activeSubTab === 'subject-practice' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-lg font-display font-black text-slate-900">
              Subject-Wise Practice Sets ({modMeta.examTitle} · Paper {modMeta.paper})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Build deep mastery per section before taking 150-question Full Mock Tests. Every practice question comes from a separate disjoint pool with zero mock test repetition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paperSlots.map((slot) => {
              const selectedSet = subjectSetNumbers[slot.subjectId] || 1;
              return (
                <div
                  key={slot.subjectId}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-indigo-800">
                      <span>Official Weightage: {slot.questionCount} Qs</span>
                      <span className="font-mono tabular-nums">Q{slot.startQ}–Q{slot.endQ}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                      {slot.label}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      30 freshly curated subject drills in {activeMedium} medium (or {slot.subjectId === 'LANGUAGE_1' ? language1 : slot.subjectId === 'LANGUAGE_2' ? language2 : activeMedium}) with instant answer review and pedagogy explanation.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                        Select Practice Set (30 Questions · 30 Mins):
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((sNum) => (
                          <button
                            key={sNum}
                            type="button"
                            onClick={() =>
                              setSubjectSetNumbers((prev) => ({
                                ...prev,
                                [slot.subjectId]: sNum,
                              }))
                            }
                            className={`flex-1 min-h-[36px] rounded-lg font-mono tabular-nums text-xs font-black cursor-pointer border transition-colors ${
                              selectedSet === sNum
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            S{sNum}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleLaunchSubjectPractice(slot.subjectId, slot.label, selectedSet)
                    }
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Set {selectedSet} (30 Qs)</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: TOPIC-WISE PRACTICE (ALL OFFICIAL SYLLABUS TOPICS)
          ===================================================================== */}
      {activeSubTab === 'topic-practice' && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-display font-black text-slate-900">
                Topic-Wise Targeted Practice Drills
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Pick any official syllabus chapter below to launch a focused 20-question topic mastery test.
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setTopicSubjectFilter('ALL')}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer border ${
                  topicSubjectFilter === 'ALL'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                All Subjects
              </button>
              {syllabusUnits.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setTopicSubjectFilter(u.subjectId)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer border ${
                    topicSubjectFilter === u.subjectId
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {u.subjectId.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {syllabusUnits
              .filter((u) => topicSubjectFilter === 'ALL' || u.subjectId === topicSubjectFilter)
              .map((unit) => (
                <div
                  key={unit.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <h3 className="text-base font-display font-black text-slate-900">
                      {unit.subjectTitle}
                    </h3>
                    <span className="text-xs font-mono tabular-nums font-bold text-indigo-800">
                      {unit.topics.length} Official Topics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {unit.topics.map((topic, idx) => (
                      <div
                        key={topic}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] font-mono tabular-nums font-bold text-slate-500">
                            Topic {String(idx + 1).padStart(2, '0')} · 20 Qs · 20 Mins
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {topic}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleLaunchTopicPractice(unit.subjectId, topic, idx)}
                          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <span>Practise</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: REVISION TESTS & WEAK-TOPIC AUTO DRILL
          ===================================================================== */}
      {activeSubTab === 'revision' && (
        <div className="space-y-5">
          {/* Smart Weak Area Revision Card */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                Smart Weak-Area Revision Launcher
              </span>
              <h2 className="text-lg font-display font-black text-slate-900">
                {subjectAnalytics.length > 0
                  ? `Recommended Focus: ${subjectAnalytics[0].label} (${subjectAnalytics[0].accuracy}% avg)`
                  : 'Mixed Pedagogy & High-Frequency Concept Revision'}
              </h2>
              <p className="text-xs text-slate-700 max-w-2xl">
                {subjectAnalytics.length > 0
                  ? 'Based on your recorded test scores, focus on your lowest-accuracy subject with a targeted 25-question drill.'
                  : 'Complete any mock or subject test to unlock personalized weak-subject targeting, or launch a mixed CDP & pedagogy revision drill now.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleLaunchRevisionTest(
                  1,
                  subjectAnalytics.length > 0 ? subjectAnalytics[0].subjectId : 'CDP'
                )
              }
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-display font-black text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Target className="w-4 h-4" />
              <span>Start Targeted Drill (25 Qs)</span>
            </button>
          </div>

          {/* 10 Revision Tests Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                10 Mixed-Syllabus Revision Tests (30 Questions · 30 Minutes Each)
              </h3>
              <p className="text-xs text-slate-600">
                Quick daily revision rounds covering all {modMeta.paperTitle} sections in one compact session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }, (_, idx) => idx + 1).map((revNum) => (
                <div
                  key={revNum}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="font-mono tabular-nums text-xs font-black text-indigo-800">
                      REVISION {String(revNum).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-display font-black text-slate-900 mt-1">
                      Full-Paper Sprint {revNum}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      30 Mixed Qs · 30 Mins · All Sections
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLaunchRevisionTest(revNum)}
                    className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs cursor-pointer"
                  >
                    Launch Revision
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: PREVIOUS-YEAR-PATTERN PRACTICE (2018–2024 TRENDS)
          ===================================================================== */}
      {activeSubTab === 'pyq-pattern' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900">
              Previous-Year-Pattern Practice ({modMeta.examTitle} Paper {modMeta.paper})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Simulated exams modelled on official {modMeta.officialPortal} question patterns from 2018 to 2024, emphasizing NEP 2020 competency, assertion-reasoning, and real classroom dilemmas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { year: '2024 Pattern', focus: 'NEP 2020 Experiential Pedagogy & Case Reasoning' },
              { year: '2023 Pattern', focus: 'Assertion-Reasoning & Inclusion Classroom Scenarios' },
              { year: '2022 Pattern', focus: 'Multi-Lingual Comprehension & Bloom HOTS Items' },
              { year: '2021 Pattern', focus: 'CBT Pattern Transition & Conceptual Mathematics/EVS' },
              { year: '2019 Pattern', focus: 'Standard Child Psychology & Curriculum Milestones' },
              { year: '2018 Pattern', focus: 'Core Content Recall & Fundamental Pedagogy Rules' },
            ].map((item, idx) => (
              <div
                key={item.year}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs font-black text-indigo-800">
                    {modMeta.examTitle} · {item.year}
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-black text-slate-900">
                    {item.focus}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Choose a 30-Q Quick Pattern Sprint or Full 150-Q CBT Pattern Simulation.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleLaunchPyqTest(idx + 1, 30, item.year)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs whitespace-nowrap cursor-pointer"
                  >
                    30-Q Sprint
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLaunchPyqTest(idx + 1, 150, item.year)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs whitespace-nowrap cursor-pointer"
                  >
                    150-Q Full Paper
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: OFFICIAL SYLLABUS & EXAM PATTERN VIEWER
          ===================================================================== */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-5">
          {/* Official Exam Pattern Summary Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-display font-black text-slate-900">
                  Official Exam Pattern — {modMeta.examTitle} {modMeta.paperTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Source Reference: {modMeta.conductingBody} ({modMeta.officialPortal}) · Total Time: 2 Hours 30 Minutes (150 Mins) · Qualifying Score: {modMeta.qualifyingGeneralMarks}/150 (General 60%) &amp; {modMeta.qualifyingReservedMarks}/150 (Reserved Category).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2.5 pr-4">Section</th>
                    <th className="py-2.5 pr-4">Subject / Part</th>
                    <th className="py-2.5 pr-4">Question Range</th>
                    <th className="py-2.5 pr-4">MCQs</th>
                    <th className="py-2.5">Marks (+1 / 0 Neg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {paperSlots.map((slot, i) => (
                    <tr key={slot.subjectId}>
                      <td className="py-3 pr-4 font-mono tabular-nums text-slate-500">Part {i + 1}</td>
                      <td className="py-3 pr-4 font-bold text-slate-900">{slot.label}</td>
                      <td className="py-3 pr-4 font-mono tabular-nums">
                        Q{slot.startQ} – Q{slot.endQ}
                      </td>
                      <td className="py-3 pr-4 font-mono tabular-nums">{slot.questionCount}</td>
                      <td className="py-3 font-mono tabular-nums text-indigo-800">{slot.marks} Marks</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 font-black text-slate-900 bg-slate-50">
                    <td className="py-3 pr-4" colSpan={3}>
                      Total Examination Composite (No Negative Marking)
                    </td>
                    <td className="py-3 pr-4 font-mono tabular-nums">150 MCQs</td>
                    <td className="py-3 font-mono tabular-nums text-emerald-700">150 Marks</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Complete Syllabus Units */}
          <div className="space-y-4">
            {syllabusUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <h3 className="text-base sm:text-lg font-display font-black text-slate-900">
                    {unit.subjectTitle}
                  </h3>
                  <span className="font-mono tabular-nums text-xs font-black text-indigo-800">
                    {unit.questionCount} Questions · {unit.marks} Marks
                  </span>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <p className="text-slate-600">
                    <strong className="text-slate-900">Pedagogy Strategy:</strong>{' '}
                    {unit.recommendedStrategy}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleLaunchSubjectPractice(unit.subjectId, unit.subjectTitle, 1)}
                    className="min-h-[38px] px-4 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-display font-black text-xs whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Practise This Subject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 7: STUDENT PERFORMANCE ANALYSIS & PROGRESS CHARTS
          ===================================================================== */}
      {activeSubTab === 'performance' && (
        <div className="space-y-5">
          {/* Header & Scope Filter */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-display font-black text-slate-900">
                Performance Analysis &amp; Progress Tracking
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Track percentage improvement across Mock Tests, Subject Practice, and Revision Tests.
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setPerformanceScope('module')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  performanceScope === 'module'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {modMeta.examTitle} P{modMeta.paper} Only
              </button>
              <button
                type="button"
                onClick={() => setPerformanceScope('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  performanceScope === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All 4 TET/CTET Modules
              </button>
            </div>
          </div>

          {displayedAttempts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-3">
              <TrendingUp className="w-10 h-10 text-indigo-600 mx-auto" />
              <h3 className="text-lg font-display font-black text-slate-900">
                No Attempts Recorded Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Take your first Mock Test or Subject Practice set to populate your progress trend chart, accuracy table, and weak-area recommendations.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('mock-tests')}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs cursor-pointer"
              >
                Browse 50 Mock Tests
              </button>
            </div>
          ) : (
            <>
              {/* 4 Summary Metrics */}
              {(() => {
                const totalAtt = displayedAttempts.length;
                const bestPct = Math.max(...displayedAttempts.map((a) => a.percentage));
                const avgPct = Math.round(
                  displayedAttempts.reduce((s, a) => s + a.percentage, 0) / totalAtt
                );
                const qualifiedCount = displayedAttempts.filter((a) => a.qualified).length;
                return (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <span className="text-xs font-bold text-slate-500">Tests Completed</span>
                      <p className="text-2xl font-mono tabular-nums font-black text-slate-900 mt-1">
                        {totalAtt}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <span className="text-xs font-bold text-slate-500">Best Score %</span>
                      <p className="text-2xl font-mono tabular-nums font-black text-indigo-700 mt-1">
                        {bestPct}%
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <span className="text-xs font-bold text-slate-500">Average Score %</span>
                      <p className="text-2xl font-mono tabular-nums font-black text-slate-900 mt-1">
                        {avgPct}%
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <span className="text-xs font-bold text-slate-500">Qualified (≥60%)</span>
                      <p className="text-2xl font-mono tabular-nums font-black text-emerald-700 mt-1">
                        {qualifiedCount}/{totalAtt}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* SVG Progress Trend Chart Across Recent Attempts */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-display font-black text-slate-900">
                    Score Percentage Trend (Recent Attempts vs 60% Qualifying Line)
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    Latest {Math.min(12, displayedAttempts.length)} sessions
                  </span>
                </div>

                {(() => {
                  const recent = [...displayedAttempts].slice(0, 12).reverse();
                  const chartW = 720;
                  const chartH = 220;
                  const padL = 40;
                  const padR = 20;
                  const padT = 20;
                  const padB = 36;
                  const innerW = chartW - padL - padR;
                  const innerH = chartH - padT - padB;
                  const barW = Math.max(18, Math.min(40, innerW / Math.max(1, recent.length) - 10));
                  const qualY = padT + innerH * (1 - 0.6);

                  return (
                    <div className="overflow-x-auto">
                      <svg
                        viewBox={`0 0 ${chartW} ${chartH}`}
                        className="w-full min-w-[460px] h-56"
                        role="img"
                        aria-label="TET CTET Score Percentage Progress Chart"
                      >
                        {[0, 25, 50, 75, 100].map((tick) => {
                          const y = padT + innerH * (1 - tick / 100);
                          return (
                            <g key={tick}>
                              <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#E2E8F0" strokeWidth="1" />
                              <text
                                x={padL - 8}
                                y={y + 4}
                                textAnchor="end"
                                fontSize="10"
                                fill="#64748B"
                                fontFamily="monospace"
                              >
                                {tick}%
                              </text>
                            </g>
                          );
                        })}

                        {/* 60% Qualifying Benchmark Line */}
                        <line
                          x1={padL}
                          y1={qualY}
                          x2={chartW - padR}
                          y2={qualY}
                          stroke="#059669"
                          strokeWidth="1.5"
                          strokeDasharray="5 4"
                        />
                        <text
                          x={chartW - padR}
                          y={qualY - 5}
                          textAnchor="end"
                          fontSize="10"
                          fontWeight="700"
                          fill="#059669"
                        >
                          60% Qualifying Target
                        </text>

                        {recent.map((att, i) => {
                          const step = innerW / recent.length;
                          const x = padL + i * step + (step - barW) / 2;
                          const h = Math.max(4, (att.percentage / 100) * innerH);
                          const y = padT + innerH - h;
                          const fill = att.qualified ? '#059669' : att.percentage >= 55 ? '#D97706' : '#4F46E5';
                          const shortTag = att.mockTestNumber ? `M${att.mockTestNumber}` : `#${i + 1}`;
                          return (
                            <g key={att.id}>
                              <rect x={x} y={y} width={barW} height={h} rx="6" fill={fill} />
                              <text
                                x={x + barW / 2}
                                y={y - 5}
                                textAnchor="middle"
                                fontSize="10"
                                fontWeight="700"
                                fill="#0F172A"
                                fontFamily="monospace"
                              >
                                {att.percentage}%
                              </text>
                              <text
                                x={x + barW / 2}
                                y={chartH - 12}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#475569"
                                fontFamily="monospace"
                              >
                                {shortTag}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  );
                })()}
              </div>

              {/* Cumulative Subject Accuracy Breakdown */}
              {subjectAnalytics.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <h3 className="text-base font-display font-black text-slate-900">
                    Cumulative Subject Mastery &amp; Weak-Area Action
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subjectAnalytics.map((s) => (
                      <div
                        key={s.subjectId}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-display font-black text-slate-900 truncate">
                            {s.label}
                          </span>
                          <span className="font-mono tabular-nums text-xs font-black text-indigo-800">
                            {s.accuracy}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              s.accuracy >= 70
                                ? 'bg-emerald-600'
                                : s.accuracy >= 55
                                ? 'bg-amber-500'
                                : 'bg-rose-600'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(4, s.accuracy))}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-600">
                          <span className="font-mono tabular-nums">
                            {s.obtained}/{s.max} marks
                          </span>
                          <button
                            type="button"
                            onClick={() => handleLaunchSubjectPractice(s.subjectId, s.label, 1)}
                            className="text-indigo-700 hover:underline font-bold cursor-pointer"
                          >
                            Practise Subject →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attempt History Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                <h3 className="text-base font-display font-black text-slate-900">
                  Recorded Examination History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-2.5 pr-4">Test / Assessment</th>
                        <th className="py-2.5 pr-4">Mode</th>
                        <th className="py-2.5 pr-4">Score</th>
                        <th className="py-2.5 pr-4">Accuracy</th>
                        <th className="py-2.5 pr-4">Time</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {displayedAttempts.slice(0, 20).map((att) => (
                        <tr key={att.id}>
                          <td className="py-3 pr-4">
                            <span className="font-bold text-slate-900 block">
                              {att.mockTestNumber
                                ? `${att.exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} P${att.paper} Mock #${att.mockTestNumber}`
                                : att.practiceTitle || `${att.exam} Practice`}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              L1: {att.language1} · L2: {att.language2} · {att.medium}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-slate-600">{att.mode.replace('_', ' ')}</td>
                          <td className="py-3 pr-4 font-mono tabular-nums font-bold">
                            {att.marksObtained}/{att.maxMarks} ({att.percentage}%)
                          </td>
                          <td className="py-3 pr-4 font-mono tabular-nums">{att.accuracy}%</td>
                          <td className="py-3 pr-4 font-mono tabular-nums">
                            {formatHhMmSs(att.timeTakenSeconds)}
                          </td>
                          <td className="py-3">
                            <span
                              className={`font-bold ${
                                att.qualified ? 'text-emerald-700' : 'text-amber-700'
                              }`}
                            >
                              {att.qualified ? 'Qualified (≥60%)' : 'Keep Practising'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Student Question Error Reports Status Tracker (PART 7) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-display font-black text-slate-900">
                  🚩 My Question Error Reports ({studentQuestionReports.length})
                </h3>
                <p className="text-xs text-slate-600">
                  Track the live verification status of questions you reported (Submitted, Under
                  Review, Confirmed, Corrected, or Rejected).
                </p>
              </div>
            </div>

            {studentQuestionReports.length === 0 ? (
              <p className="text-xs text-slate-500 font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                You have not submitted any question reports yet. Use the &ldquo;🚩 Report
                Question&rdquo; button at the top-right of any question card during an exam or
                post-test review if you spot an issue.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                      <th className="py-2.5 pr-4">Report Ref</th>
                      <th className="py-2.5 pr-4">Module &amp; Question</th>
                      <th className="py-2.5 pr-4">Category</th>
                      <th className="py-2.5 pr-4">Language</th>
                      <th className="py-2.5 pr-4">Date</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {studentQuestionReports.slice(0, 20).map((rep) => (
                      <tr key={rep.id}>
                        <td className="py-2.5 pr-4 font-mono font-black text-indigo-800">
                          {rep.reportNumber}
                        </td>
                        <td className="py-2.5 pr-4">
                          <span className="font-bold text-slate-900 block">
                            {rep.moduleTitle} · Test #{String(rep.testNumber).padStart(2, '0')} · Q
                            {rep.questionNumber}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {rep.questionId} ({rep.subject})
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 text-rose-800 font-bold">
                          {rep.reportCategory}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600">{rep.selectedLanguage}</td>
                        <td className="py-2.5 pr-4 font-mono text-[11px] text-slate-500">
                          {new Date(rep.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`px-2.5 py-1 rounded-lg border font-black text-[11px] ${getReportStatusBadgeStyle(
                              rep.status
                            )}`}
                          >
                            {rep.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
