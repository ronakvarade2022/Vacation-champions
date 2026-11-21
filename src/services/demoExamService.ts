import {
  buildDefaultDemoExamQuestions,
  buildExpandedDemoQuestionPool,
  DemoExamAttemptRecord,
  DemoExamConfig,
  DemoExamQuestion,
  DemoExamTypeId,
  DemoPaper2Stream,
  getDemoExamConfigForStream,
} from '../data/demoExamEngine';
import { seededPermuteOptions } from '../data/tetCtetLanguageBanks';

const CONFIG_STORAGE_KEY = 'vc_demo_exam_custom_configs_v3';
const QUESTIONS_STORAGE_KEY = 'vc_demo_exam_custom_questions_v3';
const ATTEMPTS_STORAGE_KEY = 'vc_demo_exam_attempts_v3';
const ACTIVE_SESSION_PREFIX = 'vc_demo_exam_active_session_v3_';
const STUDENT_HISTORY_PREFIX = 'vc_demo_student_question_history_v3_';

export interface ActiveDemoSessionState {
  testId: DemoExamTypeId;
  paper2Stream?: DemoPaper2Stream;
  startedAtMs: number;
  durationSeconds: number;
  deadlineMs: number;
  answers: Record<number, number>; // questionIndex -> selectedOption (0..3)
  markedForReview: Record<number, boolean>;
  currentIndex: number;
  lastUpdatedMs: number;
  questionsSnapshot?: DemoExamQuestion[];
}

export interface DemoExamStats {
  totalAttempts: number;
  averageScore: number;
  averagePercentage: number;
  highestScore: number;
  passCount: number;
  failCount: number;
  passRatePercentage: number;
  recentAttempts: DemoExamAttemptRecord[];
}

// Memory caches
let customConfigsCache: Record<string, Partial<DemoExamConfig>> | null = null;
let customQuestionsCache: Record<string, DemoExamQuestion[]> | null = null;
let attemptsCache: DemoExamAttemptRecord[] | null = null;

function isStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getSafeStorageItem(key: string): string | null {
  if (!isStorageAvailable()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSafeStorageItem(key: string, value: string): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function removeSafeStorageItem(key: string): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {}
}

function loadLocalConfigs(): Record<string, Partial<DemoExamConfig>> {
  if (customConfigsCache) return customConfigsCache;
  const raw = getSafeStorageItem(CONFIG_STORAGE_KEY);
  customConfigsCache = raw ? JSON.parse(raw) : {};
  return customConfigsCache!;
}

function loadLocalQuestions(): Record<string, DemoExamQuestion[]> {
  if (customQuestionsCache) return customQuestionsCache;
  const raw = getSafeStorageItem(QUESTIONS_STORAGE_KEY);
  customQuestionsCache = raw ? JSON.parse(raw) : {};
  return customQuestionsCache!;
}

function loadLocalAttempts(): DemoExamAttemptRecord[] {
  if (attemptsCache) return attemptsCache;
  const raw = getSafeStorageItem(ATTEMPTS_STORAGE_KEY);
  attemptsCache = raw ? JSON.parse(raw) : [];
  return attemptsCache!;
}

function deterministicShuffle<T>(items: T[], seedStr: string): T[] {
  const arr = [...items];
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    const j = Math.abs(h) % (i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export const demoExamService = {
  /**
   * Retrieves the effective exam configuration (default merged with any admin modifications and Paper 2 stream)
   */
  getConfig(testId: DemoExamTypeId, stream: DemoPaper2Stream = 'MATH_SCIENCE'): DemoExamConfig {
    const base = getDemoExamConfigForStream(testId, stream);
    const customMap = loadLocalConfigs();
    const patch = customMap[testId] || {};

    const merged: DemoExamConfig = {
      ...base,
      ...patch,
      sections: patch.sections || base.sections,
    };

    if (patch.durationMinutes !== undefined && patch.durationSeconds === undefined) {
      merged.durationSeconds = patch.durationMinutes * 60;
    }
    if (patch.marksPerQuestion !== undefined && patch.totalMarks === undefined) {
      merged.totalMarks = merged.totalQuestions * patch.marksPerQuestion;
    }

    return merged;
  },

  /**
   * Admin: Updates configuration for an exam (duration, marks, passing %, title, etc.)
   */
  async updateConfig(
    testId: DemoExamTypeId,
    patch: Partial<DemoExamConfig>
  ): Promise<DemoExamConfig> {
    const map = loadLocalConfigs();
    const currentPatch = map[testId] || {};
    const updatedPatch: Partial<DemoExamConfig> = { ...currentPatch, ...patch };

    if (patch.durationMinutes !== undefined) {
      updatedPatch.durationSeconds = patch.durationMinutes * 60;
    }
    if (patch.totalQuestions !== undefined && patch.marksPerQuestion !== undefined) {
      updatedPatch.totalMarks = patch.totalQuestions * patch.marksPerQuestion;
    }

    map[testId] = updatedPatch;
    customConfigsCache = map;
    setSafeStorageItem(CONFIG_STORAGE_KEY, JSON.stringify(map));

    return this.getConfig(testId);
  },

  /**
   * Retrieves default or admin-customized questions for a demo test
   */
  getQuestions(
    testId: DemoExamTypeId,
    stream: DemoPaper2Stream = 'MATH_SCIENCE'
  ): DemoExamQuestion[] {
    const customMap = loadLocalQuestions();
    const storageKey = stream === 'SOCIAL_STUDIES' ? `${testId}__SOCIAL_STUDIES` : testId;
    const customList = customMap[storageKey] || customMap[testId];

    if (customList && customList.length > 0) {
      return customList;
    }

    return buildDefaultDemoExamQuestions(testId, { stream, testSetNumber: 1 });
  },

  /**
   * Retrieves per-student question history (previously attempted question signatures/IDs)
   */
  getStudentAttemptHistory(studentId: string, testId: DemoExamTypeId): {
    attemptCount: number;
    seenSignatures: string[];
  } {
    const key = `${STUDENT_HISTORY_PREFIX}${studentId || 'guest'}_${testId}`;
    const raw = getSafeStorageItem(key);
    if (!raw) {
      return { attemptCount: 0, seenSignatures: [] };
    }
    try {
      const parsed = JSON.parse(raw);
      return {
        attemptCount: Number(parsed.attemptCount || 0),
        seenSignatures: Array.isArray(parsed.seenSignatures) ? parsed.seenSignatures : [],
      };
    } catch {
      return { attemptCount: 0, seenSignatures: [] };
    }
  },

  /**
   * Records attempted question signatures for a student so future attempts prioritize unseen questions
   */
  recordStudentQuestionHistory(
    studentId: string,
    testId: DemoExamTypeId,
    questions: DemoExamQuestion[]
  ): void {
    const key = `${STUDENT_HISTORY_PREFIX}${studentId || 'guest'}_${testId}`;
    const current = this.getStudentAttemptHistory(studentId, testId);
    const sigSet = new Set<string>(current.seenSignatures);
    for (const q of questions) {
      sigSet.add(q.conceptSignature || q.id);
    }
    const maxSigs = 600;
    const arr = Array.from(sigSet).slice(-maxSigs);
    setSafeStorageItem(
      key,
      JSON.stringify({
        attemptCount: current.attemptCount + 1,
        seenSignatures: arr,
      })
    );
  },

  /**
   * Generates a student-specific attempt paper that:
   * 1. Prioritizes unseen questions from the deep validated pool based on the student's attempt history,
   * 2. Randomizes question order within each syllabus section on repeat attempts,
   * 3. Randomizes answer options for each question while updating correctAnswer accurately,
   * 4. Guarantees 0 duplicate questions and balanced syllabus coverage.
   */
  getQuestionsForStudentAttempt(
    testId: DemoExamTypeId,
    studentId = 'guest',
    stream: DemoPaper2Stream = 'MATH_SCIENCE'
  ): DemoExamQuestion[] {
    const customMap = loadLocalQuestions();
    const storageKey = stream === 'SOCIAL_STUDIES' ? `${testId}__SOCIAL_STUDIES` : testId;
    const customList = customMap[storageKey] || customMap[testId];
    if (customList && customList.length > 0) {
      return customList;
    }

    const history = this.getStudentAttemptHistory(studentId, testId);
    const attemptNumber = history.attemptCount + 1;
    const config = this.getConfig(testId, stream);

    // First attempt gets Set 1 directly; subsequent attempts draw unseen questions from the expanded pool
    // and shuffle question order within each section + permute options with an attempt-specific seed.
    if (attemptNumber === 1) {
      return buildDefaultDemoExamQuestions(testId, { stream, testSetNumber: 1 });
    }

    const seenSet = new Set(history.seenSignatures);
    const expandedPool = buildExpandedDemoQuestionPool(testId, stream);
    const finalPaper: DemoExamQuestion[] = [];
    const seedBase = `${studentId}_${testId}_${stream}_attempt_${attemptNumber}`;

    for (const sec of config.sections) {
      const sectionCandidates = expandedPool.filter((q) => q.section === sec.name);
      const unseen = sectionCandidates.filter((q) => !seenSet.has(q.conceptSignature || q.id));
      const seen = sectionCandidates.filter((q) => seenSet.has(q.conceptSignature || q.id));

      const shuffledUnseen = deterministicShuffle(unseen, `${seedBase}_${sec.name}_unseen`);
      const shuffledSeen = deterministicShuffle(seen, `${seedBase}_${sec.name}_seen`);
      const chosenForSection = [...shuffledUnseen, ...shuffledSeen].slice(0, sec.questionCount);

      chosenForSection.forEach((q, idxInSec) => {
        const qNum = sec.startQuestionNumber + idxInSec;
        const permSeed = `${seedBase}_Q${qNum}`;
        const permuted = seededPermuteOptions(q.options, q.correctAnswer, permSeed);
        finalPaper.push({
          ...q,
          id: `${testId}_att${attemptNumber}_q_${qNum}`,
          questionNumber: qNum,
          section: sec.name,
          options: permuted.options,
          correctAnswer: permuted.correctAnswer,
        });
      });
    }

    return finalPaper;
  },

  /**
   * Admin: Save/Update a single question in a demo test
   */
  async saveQuestion(testId: DemoExamTypeId, updatedQ: DemoExamQuestion): Promise<void> {
    const list = [...this.getQuestions(testId)];
    const idx = list.findIndex((q) => q.id === updatedQ.id || q.questionNumber === updatedQ.questionNumber);

    if (idx >= 0) {
      list[idx] = { ...updatedQ, testId, isCustomAdminQuestion: true };
    } else {
      list.push({ ...updatedQ, testId, isCustomAdminQuestion: true });
    }

    list.sort((a, b) => a.questionNumber - b.questionNumber);

    const map = loadLocalQuestions();
    map[testId] = list;
    customQuestionsCache = map;
    setSafeStorageItem(QUESTIONS_STORAGE_KEY, JSON.stringify(map));

    await this.updateConfig(testId, { totalQuestions: list.length });
  },

  /**
   * Admin: Add a new question to a demo test
   */
  async addQuestion(
    testId: DemoExamTypeId,
    q: Omit<DemoExamQuestion, 'id' | 'testId' | 'questionNumber'>
  ): Promise<DemoExamQuestion> {
    const list = [...this.getQuestions(testId)];
    const nextQNum = list.length + 1;
    const newQ: DemoExamQuestion = {
      ...q,
      id: `${testId}_custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      testId,
      questionNumber: nextQNum,
      isCustomAdminQuestion: true,
    };

    list.push(newQ);
    const map = loadLocalQuestions();
    map[testId] = list;
    customQuestionsCache = map;
    setSafeStorageItem(QUESTIONS_STORAGE_KEY, JSON.stringify(map));

    await this.updateConfig(testId, { totalQuestions: list.length });
    return newQ;
  },

  /**
   * Admin: Delete a question from a demo test
   */
  async deleteQuestion(testId: DemoExamTypeId, questionId: string): Promise<void> {
    let list = this.getQuestions(testId).filter((q) => q.id !== questionId);
    list = list.map((q, i) => ({ ...q, questionNumber: i + 1 }));

    const map = loadLocalQuestions();
    map[testId] = list;
    customQuestionsCache = map;
    setSafeStorageItem(QUESTIONS_STORAGE_KEY, JSON.stringify(map));

    await this.updateConfig(testId, { totalQuestions: list.length });
  },

  /**
   * Admin: Reset a demo test back to official blueprint defaults
   */
  async resetToDefaults(testId: DemoExamTypeId): Promise<void> {
    const qMap = loadLocalQuestions();
    delete qMap[testId];
    delete qMap[`${testId}__SOCIAL_STUDIES`];
    customQuestionsCache = qMap;
    setSafeStorageItem(QUESTIONS_STORAGE_KEY, JSON.stringify(qMap));

    const cMap = loadLocalConfigs();
    delete cMap[testId];
    customConfigsCache = cMap;
    setSafeStorageItem(CONFIG_STORAGE_KEY, JSON.stringify(cMap));
  },

  // =========================================================================
  // RELOAD-SAFE ACTIVE EXAM SESSION (Timer & Answers Persistence)
  // =========================================================================

  loadActiveSession(testId: DemoExamTypeId): {
    session: ActiveDemoSessionState;
    remainingSeconds: number;
    isExpired: boolean;
  } | null {
    try {
      const raw = getSafeStorageItem(`${ACTIVE_SESSION_PREFIX}${testId}`);
      if (!raw) return null;
      const session = JSON.parse(raw) as ActiveDemoSessionState;
      if (!session || session.testId !== testId) return null;

      const now = Date.now();
      const remainingMs = session.deadlineMs - now;
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      const isExpired = remainingMs <= 0;

      return { session, remainingSeconds, isExpired };
    } catch {
      return null;
    }
  },

  saveActiveSession(session: ActiveDemoSessionState): void {
    setSafeStorageItem(
      `${ACTIVE_SESSION_PREFIX}${session.testId}`,
      JSON.stringify({ ...session, lastUpdatedMs: Date.now() })
    );
  },

  clearActiveSession(testId: DemoExamTypeId): void {
    removeSafeStorageItem(`${ACTIVE_SESSION_PREFIX}${testId}`);
  },

  // =========================================================================
  // ATTEMPT RECORDING & ADMIN PARTICIPATION STATISTICS
  // =========================================================================

  async recordAttempt(
    attempt: DemoExamAttemptRecord,
    attemptedQuestions?: DemoExamQuestion[]
  ): Promise<void> {
    const list = loadLocalAttempts();
    list.unshift(attempt);
    const trimmed = list.slice(0, 200);
    attemptsCache = trimmed;
    setSafeStorageItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(trimmed));

    if (attemptedQuestions && attemptedQuestions.length > 0) {
      this.recordStudentQuestionHistory(attempt.studentId, attempt.testId, attemptedQuestions);
    }

    this.clearActiveSession(attempt.testId);
  },

  getAttempts(testId?: DemoExamTypeId): DemoExamAttemptRecord[] {
    const list = loadLocalAttempts();
    if (!testId) return list;
    return list.filter((a) => a.testId === testId);
  },

  getStats(testId: DemoExamTypeId): DemoExamStats {
    const attempts = this.getAttempts(testId);
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        averagePercentage: 0,
        highestScore: 0,
        passCount: 0,
        failCount: 0,
        passRatePercentage: 0,
        recentAttempts: [],
      };
    }

    let totalScore = 0;
    let totalPct = 0;
    let highest = 0;
    let passCount = 0;

    for (const a of attempts) {
      totalScore += a.marksObtained;
      totalPct += a.percentage;
      if (a.marksObtained > highest) highest = a.marksObtained;
      if (a.passed) passCount++;
    }

    const n = attempts.length;
    return {
      totalAttempts: n,
      averageScore: Math.round((totalScore / n) * 10) / 10,
      averagePercentage: Math.round((totalPct / n) * 10) / 10,
      highestScore: highest,
      passCount,
      failCount: n - passCount,
      passRatePercentage: Math.round((passCount / n) * 100),
      recentAttempts: attempts.slice(0, 25),
    };
  },
};
