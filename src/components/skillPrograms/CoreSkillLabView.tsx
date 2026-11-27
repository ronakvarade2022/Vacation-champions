import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Eye,
  Flame,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  Volume2,
  Zap,
} from 'lucide-react';
import {
  ABACUS_CURRICULUM_LESSONS,
  ALL_16_VEDIC_SUTRAS,
  PHONICS_LEVEL_MODULES,
  PHONICS_ONSETS,
  PHONICS_RIMES,
  VEDIC_CHAPTER_PRACTICE,
  generateVedicSpeedQuestions,
} from '../../data/skillPrograms/coreSkillLabData';
import {
  type CoreSkillProgressRecord,
  loadCoreSkillProgress,
  saveCoreSkillProgress,
} from '../../services/portalFirestoreService';
import { speechService } from '../../services/speechService';

export type CoreSkillProgramId = 'vedic-maths' | 'abacus' | 'phonics';

export interface CoreSkillLabViewProps {
  initialProgram?: CoreSkillProgramId;
  userId?: string;
  onBackHome: () => void;
}

interface RodState {
  heaven: boolean;
  earth: number; // 0..4
}

const PLACE_VALUES = [1000000, 100000, 10000, 1000, 100, 10, 1];
const PLACE_LABELS = ['10L / M', '1L / 100K', '10K', '1K', '100', '10', '1'];

const EMPTY_RODS = (): RodState[] =>
  Array.from({ length: 7 }, () => ({ heaven: false, earth: 0 }));

export const CoreSkillLabView: React.FC<CoreSkillLabViewProps> = ({
  initialProgram = 'vedic-maths',
  userId,
  onBackHome,
}) => {
  const [activeProgram, setActiveProgram] = useState<CoreSkillProgramId>(initialProgram);
  const [progress, setProgress] = useState<CoreSkillProgressRecord>(() =>
    loadCoreSkillProgress(userId)
  );

  useEffect(() => {
    setActiveProgram(initialProgram);
  }, [initialProgram]);

  useEffect(() => {
    setProgress(loadCoreSkillProgress(userId));
  }, [userId]);

  const updateProgress = (updater: (prev: CoreSkillProgressRecord) => CoreSkillProgressRecord) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveCoreSkillProgress(next, userId);
      return next;
    });
  };

  /* -------------------- VEDIC MATHS STATE -------------------- */
  const [vedicMode, setVedicMode] = useState<'sutras' | 'chapters' | 'speed'>('sutras');
  const [selectedSutraId, setSelectedSutraId] = useState<string>(ALL_16_VEDIC_SUTRAS[0].id);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(VEDIC_CHAPTER_PRACTICE[0].id);
  const [chapterAnswers, setChapterAnswers] = useState<Record<string, string>>({});
  const [chapterChecked, setChapterChecked] = useState<Record<string, boolean>>({});
  const [chapterHintOpen, setChapterHintOpen] = useState<Record<string, boolean>>({});

  // Speed Test (60s)
  const [speedQuestions, setSpeedQuestions] = useState(() => generateVedicSpeedQuestions(20));
  const [speedRunning, setSpeedRunning] = useState<boolean>(false);
  const [speedSecondsLeft, setSpeedSecondsLeft] = useState<number>(60);
  const [speedIdx, setSpeedIdx] = useState<number>(0);
  const [speedInput, setSpeedInput] = useState<string>('');
  const [speedScore, setSpeedScore] = useState<number>(0);
  const [speedAttempted, setSpeedAttempted] = useState<number>(0);
  const [speedLastFeedback, setSpeedLastFeedback] = useState<string>('');

  useEffect(() => {
    if (!speedRunning) return;
    if (speedSecondsLeft <= 0) {
      setSpeedRunning(false);
      if (speedScore > progress.vedicBestSpeedScore) {
        updateProgress((prev) => ({
          ...prev,
          vedicBestSpeedScore: Math.max(prev.vedicBestSpeedScore, speedScore),
        }));
      }
      return;
    }
    const timer = setTimeout(() => setSpeedSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [speedRunning, speedSecondsLeft, speedScore]);

  const startVedicSpeedTest = () => {
    setSpeedQuestions(generateVedicSpeedQuestions(20));
    setSpeedIdx(0);
    setSpeedInput('');
    setSpeedScore(0);
    setSpeedAttempted(0);
    setSpeedLastFeedback('');
    setSpeedSecondsLeft(60);
    setSpeedRunning(true);
  };

  const submitVedicSpeedAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speedRunning) return;
    const currentQ = speedQuestions[speedIdx];
    if (!currentQ) return;
    const parsed = Number(speedInput.trim());
    const isCorrect = Number.isFinite(parsed) && parsed === currentQ.answer;
    const nextScore = isCorrect ? speedScore + 1 : speedScore;
    setSpeedScore(nextScore);
    setSpeedAttempted((a) => a + 1);
    setSpeedLastFeedback(
      isCorrect
        ? `Correct! ${currentQ.prompt} = ${currentQ.answer}`
        : `Incorrect — ${currentQ.prompt} = ${currentQ.answer}`
    );
    setSpeedInput('');
    if (speedIdx + 1 >= speedQuestions.length) {
      setSpeedRunning(false);
      updateProgress((prev) => ({
        ...prev,
        vedicBestSpeedScore: Math.max(prev.vedicBestSpeedScore, nextScore),
      }));
    } else {
      setSpeedIdx((i) => i + 1);
    }
  };

  /* -------------------- ABACUS SOROBAN STATE -------------------- */
  const [rods, setRods] = useState<RodState[]>(EMPTY_RODS);
  const [abacusTarget, setAbacusTarget] = useState<number>(47);
  const [selectedAbacusLessonId, setSelectedAbacusLessonId] = useState<string>(
    ABACUS_CURRICULUM_LESSONS[0].id
  );

  // Flash Anzan Trainer
  const [flashTermsCount, setFlashTermsCount] = useState<number>(5);
  const [flashIntervalMs, setFlashIntervalMs] = useState<number>(1000);
  const [flashSequence, setFlashSequence] = useState<number[]>([]);
  const [flashStepIdx, setFlashStepIdx] = useState<number>(-1);
  const [flashPhase, setFlashPhase] = useState<'idle' | 'flashing' | 'answering' | 'result'>('idle');
  const [flashUserSum, setFlashUserSum] = useState<string>('');
  const [flashResultMsg, setFlashResultMsg] = useState<string>('');
  const flashTimerRef = useRef<number | null>(null);

  const abacusValue = useMemo(() => {
    return rods.reduce((sum, rod, idx) => {
      const digit = (rod.heaven ? 5 : 0) + rod.earth;
      return sum + digit * PLACE_VALUES[idx];
    }, 0);
  }, [rods]);

  const toggleHeavenBead = (rodIdx: number) => {
    setRods((prev) =>
      prev.map((r, i) => (i === rodIdx ? { ...r, heaven: !r.heaven } : r))
    );
  };

  const clickEarthBead = (rodIdx: number, beadIndex: number) => {
    // beadIndex 0 is top Earth bead (touching bar when active), 3 is bottom
    const desired = beadIndex + 1;
    setRods((prev) =>
      prev.map((r, i) => {
        if (i !== rodIdx) return r;
        return {
          ...r,
          earth: r.earth === desired ? beadIndex : desired,
        };
      })
    );
  };

  const handleNewRandomTarget = () => {
    const next = Math.floor(Math.random() * 9800) + 15;
    setAbacusTarget(next);
    setRods(EMPTY_RODS());
  };

  const startFlashAnzan = () => {
    if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    const seq = Array.from({ length: flashTermsCount }, () => Math.floor(Math.random() * 24) + 2);
    setFlashSequence(seq);
    setFlashStepIdx(0);
    setFlashUserSum('');
    setFlashResultMsg('');
    setFlashPhase('flashing');
  };

  useEffect(() => {
    if (flashPhase !== 'flashing') return;
    if (flashStepIdx >= flashSequence.length) {
      setFlashPhase('answering');
      return;
    }
    flashTimerRef.current = window.setTimeout(() => {
      setFlashStepIdx((i) => i + 1);
    }, flashIntervalMs);

    return () => {
      if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    };
  }, [flashPhase, flashStepIdx, flashSequence, flashIntervalMs]);

  const submitFlashAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = flashSequence.reduce((a, b) => a + b, 0);
    const entered = Number(flashUserSum.trim());
    const ok = Number.isFinite(entered) && entered === expected;
    if (ok) {
      const earned = flashTermsCount * (flashIntervalMs <= 800 ? 3 : 2);
      updateProgress((prev) => ({
        ...prev,
        abacusBestFlashScore: Math.max(prev.abacusBestFlashScore, earned),
      }));
      setFlashResultMsg(
        `Correct! ${flashSequence.join(' + ')} = ${expected}. Best Flash Score updated.`
      );
    } else {
      setFlashResultMsg(
        `Entered ${flashUserSum || '—'}, exact sum of (${flashSequence.join(' + ')}) is ${expected}.`
      );
    }
    setFlashPhase('result');
  };

  /* -------------------- PHONICS STUDIO STATE -------------------- */
  const [selectedPhonicsLevelId, setSelectedPhonicsLevelId] = useState<string>(
    PHONICS_LEVEL_MODULES[0].id
  );
  const [speechStatus, setSpeechStatus] = useState<string>('');
  const [selectedOnset, setSelectedOnset] = useState<string>(PHONICS_ONSETS[0]);
  const [selectedRime, setSelectedRime] = useState<string>(PHONICS_RIMES[0]);
  const [dictationTargetId, setDictationTargetId] = useState<string>('');
  const [dictationMsg, setDictationMsg] = useState<string>('');
  const [phonicsScore, setPhonicsScore] = useState<number>(0);

  const activePhonicsLevel =
    PHONICS_LEVEL_MODULES.find((l) => l.id === selectedPhonicsLevelId) || PHONICS_LEVEL_MODULES[0];

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const speakText = (text: string) => {
    if (!speechService.isSupported()) {
      setSpeechStatus(
        'Audio pronunciation is unavailable in this browser; read the phonetic sound cue printed on the card.'
      );
      return;
    }
    setSpeechStatus(`Spoken aloud: "${text}"`);
    void speechService.speakSimpleText(text, 'en-IN', {
      rate: 0.88,
      onState: (info) => {
        if (info.error) {
          setSpeechStatus(info.error);
        }
      },
    });
  };

  const startDictationPrompt = () => {
    const pool = activePhonicsLevel.phonemes;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setDictationTargetId(pick.id);
    setDictationMsg(`Listen carefully and click the matching sound card for "${pick.sampleWord}".`);
    speakText(`${pick.sampleWord}. ${pick.spokenCue}`);
  };

  const handleCheckDictation = (phonemeId: string) => {
    if (!dictationTargetId) return;
    if (phonemeId === dictationTargetId) {
      const nextScore = phonicsScore + 10;
      setPhonicsScore(nextScore);
      setDictationMsg('Spot on! +10 points earned.');
      setDictationTargetId('');
      updateProgress((prev) => ({
        ...prev,
        phonicsBestScore: Math.max(prev.phonicsBestScore, nextScore),
        phonicsCompletedLevels: prev.phonicsCompletedLevels.includes(activePhonicsLevel.id)
          ? prev.phonicsCompletedLevels
          : [...prev.phonicsCompletedLevels, activePhonicsLevel.id],
      }));
    } else {
      setDictationMsg('Try listening again and check the starting sound of the word.');
    }
  };

  const activeSutra =
    ALL_16_VEDIC_SUTRAS.find((s) => s.id === selectedSutraId) || ALL_16_VEDIC_SUTRAS[0];
  const activeChapter =
    VEDIC_CHAPTER_PRACTICE.find((c) => c.id === selectedChapterId) || VEDIC_CHAPTER_PRACTICE[0];
  const activeAbacusLesson =
    ABACUS_CURRICULUM_LESSONS.find((l) => l.id === selectedAbacusLessonId) ||
    ABACUS_CURRICULUM_LESSONS[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-xs text-slate-300 tabular-nums">
            Vedic Best: {progress.vedicBestSpeedScore} pts · Flash Anzan Best:{' '}
            {progress.abacusBestFlashScore} pts · Phonics Best: {progress.phonicsBestScore} pts
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-amber-300">
            Interactive Core Skill Studio · Vedic Maths · Soroban Abacus · Phonics Fluency
          </p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            Vedic Maths, Abacus &amp; Phonics Interactive Lab
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl">
            Master all 16 Vedic Maths Sutras with timed speed drills, manipulate a live 7-rod Soroban Abacus with Flash Anzan, and blend English phonemes with spoken audio.
          </p>
        </div>

        {/* Program Switcher */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveProgram('vedic-maths')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors ${
              activeProgram === 'vedic-maths'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Vedic Maths (16 Sutras &amp; Speed Lab)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProgram('abacus')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors ${
              activeProgram === 'abacus'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Abacus Soroban (7-Rod + Flash Anzan)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProgram('phonics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors ${
              activeProgram === 'phonics'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Phonics Studio (4 Levels &amp; Word Builder)</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: VEDIC MATHS ================= */}
      {activeProgram === 'vedic-maths' && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setVedicMode('sutras')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                vedicMode === 'sutras'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              16 Sutras Reference
            </button>
            <button
              type="button"
              onClick={() => setVedicMode('chapters')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                vedicMode === 'chapters'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              9-Chapter Guided Practice
            </button>
            <button
              type="button"
              onClick={() => setVedicMode('speed')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                vedicMode === 'speed'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              60-Second Mental Speed Test
            </button>
          </div>

          {vedicMode === 'sutras' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 space-y-2 max-h-[560px] overflow-y-auto">
                <h2 className="text-sm font-bold text-slate-900 px-1 pb-2 border-b border-slate-100">
                  All 16 Traditional Vedic Sutras
                </h2>
                {ALL_16_VEDIC_SUTRAS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSutraId(s.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                      activeSutra.id === s.id
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">
                      {s.number}. {s.sanskrit}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        activeSutra.id === s.id ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {s.english}
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-xs text-slate-500">
                    Sutra {activeSutra.number} of 16 · {activeSutra.english}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
                    {activeSutra.sanskrit}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{activeSutra.bestUse}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">Core Calculation Rule</div>
                  <p className="text-sm text-slate-800">{activeSutra.ruleSummary}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-indigo-900">
                    Worked Example: {activeSutra.exampleProblem}
                  </div>
                  <ol className="space-y-2">
                    {activeSutra.workedSteps.map((step, i) => (
                      <li
                        key={i}
                        className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-sm text-slate-800 flex items-start gap-2.5"
                      >
                        <span className="font-mono font-bold text-indigo-700 tabular-nums">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}

          {vedicMode === 'chapters' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  9 Structured Practice Chapters
                </h2>
                {VEDIC_CHAPTER_PRACTICE.map((ch) => {
                  const isDone = progress.vedicCompletedChapters.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer space-y-1 ${
                        activeChapter.id === ch.id
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span>{ch.level}</span>
                        {isDone && (
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Done
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold">{ch.title}</div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-xs text-slate-500">
                    {activeChapter.level} · {activeChapter.sutraUsed}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{activeChapter.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{activeChapter.rule}</p>
                </div>

                <div className="space-y-4">
                  {activeChapter.questions.map((q, qIdx) => {
                    const userVal = chapterAnswers[q.id] || '';
                    const isChecked = Boolean(chapterChecked[q.id]);
                    const isCorrect =
                      isChecked && Number(userVal.trim()) === q.answer;
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                            Q{qIdx + 1}. {q.prompt}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setChapterHintOpen((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:underline cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>{chapterHintOpen[q.id] ? 'Hide Hint' : 'Show Hint'}</span>
                          </button>
                        </div>

                        {chapterHintOpen[q.id] && (
                          <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                            Hint: {q.hint}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="number"
                            value={userVal}
                            onChange={(e) =>
                              setChapterAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                            }
                            placeholder="Type mental answer..."
                            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono tabular-nums w-48"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setChapterChecked((prev) => ({ ...prev, [q.id]: true }));
                              if (Number(userVal.trim()) === q.answer) {
                                updateProgress((prev) => ({
                                  ...prev,
                                  vedicCompletedChapters: prev.vedicCompletedChapters.includes(
                                    activeChapter.id
                                  )
                                    ? prev.vedicCompletedChapters
                                    : [...prev.vedicCompletedChapters, activeChapter.id],
                                }));
                              }
                            }}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                          >
                            Check Answer
                          </button>
                        </div>

                        {isChecked && (
                          <div
                            className={`text-xs p-3 rounded-lg border space-y-1 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : 'bg-rose-50 border-rose-200 text-rose-900'
                            }`}
                          >
                            <div className="font-bold">
                              {isCorrect
                                ? `Correct! Answer is ${q.answer}`
                                : `Correct answer: ${q.answer}`}
                            </div>
                            <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                              {q.steps.map((st, sIdx) => (
                                <li key={sIdx}>{st}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {vedicMode === 'speed' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">60-Second Mental Speed Drill</h2>
                  <p className="text-xs text-slate-500">
                    Solve using Ekadhikena, ×11, ×99 &amp; Nikhilam Base-100 shortcuts.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono tabular-nums">
                  <span className="inline-flex items-center gap-1.5 font-bold text-indigo-700">
                    <Timer className="w-4 h-4" />
                    {speedSecondsLeft}s
                  </span>
                  <span className="font-bold text-emerald-700">Score: {speedScore}</span>
                </div>
              </div>

              {!speedRunning ? (
                <div className="space-y-4">
                  {speedAttempted > 0 && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 font-semibold tabular-nums">
                      Drill Finished! Correct: {speedScore} out of {speedAttempted} attempted · Best:{' '}
                      {Math.max(progress.vedicBestSpeedScore, speedScore)}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={startVedicSpeedTest}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>{speedAttempted > 0 ? 'Restart 60s Drill' : 'Start 60-Second Drill'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={submitVedicSpeedAnswer} className="space-y-4">
                  <div className="p-6 rounded-xl bg-slate-900 text-white text-center space-y-2">
                    <div className="text-xs text-amber-300">
                      {speedQuestions[speedIdx]?.ruleTag} · Question {speedIdx + 1} /{' '}
                      {speedQuestions.length}
                    </div>
                    <div className="text-3xl font-mono font-bold tabular-nums">
                      {speedQuestions[speedIdx]?.prompt} = ?
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="number"
                      autoFocus
                      value={speedInput}
                      onChange={(e) => setSpeedInput(e.target.value)}
                      placeholder="Enter mental answer and press Enter..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-base font-mono tabular-nums"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>

                  {speedLastFeedback && (
                    <p className="text-xs font-medium text-slate-600">{speedLastFeedback}</p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: ABACUS SOROBAN ================= */}
      {activeProgram === 'abacus' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive 7-Rod Soroban Board + Flash Anzan */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Interactive 7-Rod Japanese Soroban
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click upper Heaven beads (value 5) and lower Earth beads (value 1 each).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNewRandomTarget}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                  >
                    New Challenge
                  </button>
                  <button
                    type="button"
                    onClick={() => setRods(EMPTY_RODS())}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset (0)</span>
                  </button>
                </div>
              </div>

              {/* Target vs Current Readout */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div>
                  <div className="text-xs text-slate-500">Target Challenge</div>
                  <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
                    {abacusTarget.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Live Soroban Value</div>
                  <div
                    className={`text-2xl font-mono font-bold tabular-nums ${
                      abacusValue === abacusTarget ? 'text-emerald-700' : 'text-indigo-700'
                    }`}
                  >
                    {abacusValue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {abacusValue === abacusTarget && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Target matched cleanly ({abacusTarget.toLocaleString('en-IN')})!</span>
                </div>
              )}

              {/* Visual Wooden/Slate Soroban Frame */}
              <div className="bg-amber-950 rounded-2xl p-4 border-4 border-amber-900 overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 min-w-[460px]">
                  {rods.map((rod, rIdx) => {
                    const rodDigit = (rod.heaven ? 5 : 0) + rod.earth;
                    return (
                      <div key={rIdx} className="flex flex-col items-center space-y-2">
                        <span className="text-[11px] font-mono text-amber-200 tabular-nums">
                          {PLACE_LABELS[rIdx]}
                        </span>

                        <div className="relative w-full bg-amber-900/40 rounded-lg py-2 px-1 flex flex-col items-center">
                          {/* Vertical brass rod line */}
                          <div className="absolute inset-y-1 w-1 bg-amber-200/40 rounded-full pointer-events-none" />

                          {/* Heaven Section (1 bead, value 5) */}
                          <div className="h-16 w-full flex flex-col justify-between items-center relative z-10 pb-2">
                            <button
                              type="button"
                              aria-label={`${PLACE_LABELS[rIdx]} Heaven bead`}
                              onClick={() => toggleHeavenBead(rIdx)}
                              className={`w-11 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                                rod.heaven
                                  ? 'translate-y-7 bg-amber-400 border-amber-200 shadow-sm'
                                  : 'translate-y-0 bg-amber-700 border-amber-500 hover:bg-amber-600'
                              }`}
                            />
                          </div>

                          {/* Horizontal Reckoning Beam */}
                          <div className="w-full h-2 bg-amber-100 rounded-sm z-10 my-1 flex items-center justify-center">
                            {rIdx === 6 || rIdx === 3 ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                            ) : null}
                          </div>

                          {/* Earth Section (4 beads, value 1 each) */}
                          <div className="w-full flex flex-col items-center gap-1.5 pt-2 relative z-10">
                            {[0, 1, 2, 3].map((bIdx) => {
                              const isActive = bIdx < rod.earth;
                              return (
                                <button
                                  key={bIdx}
                                  type="button"
                                  aria-label={`${PLACE_LABELS[rIdx]} Earth bead ${bIdx + 1}`}
                                  onClick={() => clickEarthBead(rIdx, bIdx)}
                                  className={`w-11 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                                    isActive
                                      ? '-translate-y-1.5 bg-amber-400 border-amber-200 shadow-sm'
                                      : 'translate-y-1 bg-amber-700 border-amber-500 hover:bg-amber-600'
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <span className="text-sm font-mono font-bold text-white tabular-nums">
                          {rodDigit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flash Anzan Rapid Drill */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Flash Anzan Speed Trainer</h3>
                  <p className="text-xs text-slate-500">
                    Add flashing numbers mentally by visualizing beads on your Soroban.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 tabular-nums">
                  Best Score: {progress.abacusBestFlashScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Terms Count</label>
                  <select
                    value={flashTermsCount}
                    onChange={(e) => setFlashTermsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={4}>4 Terms</option>
                    <option value={5}>5 Terms</option>
                    <option value={7}>7 Terms</option>
                    <option value={10}>10 Terms</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Flash Speed</label>
                  <select
                    value={flashIntervalMs}
                    onChange={(e) => setFlashIntervalMs(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={1600}>Slow (1.6s)</option>
                    <option value={1000}>Standard (1.0s)</option>
                    <option value={700}>Fast (0.7s)</option>
                  </select>
                </div>
              </div>

              {flashPhase === 'flashing' && (
                <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-1">
                  <div className="text-xs text-amber-300 tabular-nums">
                    Term {Math.min(flashStepIdx + 1, flashSequence.length)} / {flashSequence.length}
                  </div>
                  <div className="text-5xl font-mono font-bold tabular-nums">
                    {flashSequence[flashStepIdx] ?? ''}
                  </div>
                </div>
              )}

              {flashPhase === 'answering' && (
                <form onSubmit={submitFlashAnswer} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="number"
                    autoFocus
                    value={flashUserSum}
                    onChange={(e) => setFlashUserSum(e.target.value)}
                    placeholder="Enter total mental sum..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm tabular-nums"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Check Sum
                  </button>
                </form>
              )}

              {flashResultMsg && (
                <p className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  {flashResultMsg}
                </p>
              )}

              {flashPhase !== 'flashing' && (
                <button
                  type="button"
                  onClick={startFlashAnzan}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{flashPhase === 'idle' ? 'Start Flash Anzan' : 'Run Another Flash Set'}</span>
                </button>
              )}
            </div>
          </div>

          {/* 10 Soroban Curriculum Lessons */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              10-Step Soroban Abacus Curriculum
            </h2>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {ABACUS_CURRICULUM_LESSONS.map((lesson) => {
                const isDone = progress.abacusCompletedLessons.includes(lesson.id);
                const isActive = activeAbacusLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setSelectedAbacusLessonId(lesson.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span>{lesson.level}</span>
                      {isDone && <span>Completed</span>}
                    </div>
                    <div className="text-xs font-bold mt-0.5">
                      Lesson {lesson.lessonNo}: {lesson.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="font-bold text-slate-900 text-sm">
                {activeAbacusLesson.title}
              </div>
              <p className="text-slate-700">{activeAbacusLesson.concept}</p>
              <div className="font-mono text-indigo-900 bg-white p-2.5 rounded-lg border border-slate-200">
                Rule: {activeAbacusLesson.formulaRule}
              </div>
              <p className="text-slate-600">Example: {activeAbacusLesson.workedExample}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAbacusTarget(activeAbacusLesson.practiceTarget);
                    setRods(EMPTY_RODS());
                  }}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                >
                  Practice Target ({activeAbacusLesson.practiceTarget}) on Frame
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateProgress((prev) => ({
                      ...prev,
                      abacusCompletedLessons: prev.abacusCompletedLessons.includes(
                        activeAbacusLesson.id
                      )
                        ? prev.abacusCompletedLessons
                        : [...prev.abacusCompletedLessons, activeAbacusLesson.id],
                    }))
                  }
                  className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold cursor-pointer"
                >
                  Mark Lesson Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: PHONICS STUDIO ================= */}
      {activeProgram === 'phonics' && (
        <div className="space-y-5">
          {/* Level Selector */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-slate-200">
            {PHONICS_LEVEL_MODULES.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setSelectedPhonicsLevelId(lvl.id);
                  setDictationTargetId('');
                  setDictationMsg('');
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  activePhonicsLevel.id === lvl.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {lvl.title}
              </button>
            ))}
          </div>

          {speechStatus && (
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
              {speechStatus}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Soundboard */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{activePhonicsLevel.title}</h2>
                  <p className="text-xs text-slate-500">{activePhonicsLevel.description}</p>
                </div>
                <button
                  type="button"
                  onClick={startDictationPrompt}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listening Quiz (+10 pts)</span>
                </button>
              </div>

              {dictationMsg && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-950">
                  {dictationMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePhonicsLevel.phonemes.map((ph) => (
                  <button
                    key={ph.id}
                    type="button"
                    onClick={() => {
                      speakText(`${ph.spokenCue}. ${ph.sampleWord}. ${ph.sentence}`);
                      if (dictationTargetId) {
                        handleCheckDictation(ph.id);
                      }
                    }}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-1.5 ${
                      dictationTargetId
                        ? 'bg-amber-50/40 border-amber-300 hover:bg-amber-50'
                        : 'bg-slate-50 border-slate-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-indigo-900">{ph.grapheme}</span>
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{ph.spokenCue}</div>
                    <p className="text-xs text-slate-500">{ph.sentence}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Onset-Rime Word Builder */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Onset + Rime Word Builder</h2>
                <p className="text-xs text-slate-500">
                  Combine starting consonant blends with vowel endings and hear the blended word.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 text-white text-center space-y-2">
                <div className="text-xs text-amber-300">Blended Word</div>
                <div className="text-3xl font-bold tracking-wide">
                  <span className="text-amber-300">{selectedOnset}</span>
                  <span>{selectedRime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => speakText(`${selectedOnset}. ${selectedRime}. ${selectedOnset}${selectedRime}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold cursor-pointer mt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Blend &amp; Pronounce</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-700 mb-1.5">1. Pick Onset (Start)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {PHONICS_ONSETS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setSelectedOnset(o)}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer ${
                          selectedOnset === o
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-slate-700 mb-1.5">2. Pick Rime (Ending)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {PHONICS_RIMES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRime(r)}
                        className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer ${
                          selectedRime === r
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        -{r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
