import {
  buildDefaultDemoExamQuestions,
  DemoExamAttemptRecord,
  DemoExamConfig,
  DemoExamQuestion,
  DemoExamTypeId,
  OFFICIAL_DEMO_EXAM_CONFIGS
} from '../data/demoExamEngine';

const CONFIG_STORAGE_KEY = 'vc_demo_exam_custom_configs_v2';
const QUESTIONS_STORAGE_KEY = 'vc_demo_exam_custom_questions_v2';
const ATTEMPTS_STORAGE_KEY = 'vc_demo_exam_attempts_v2';
const ACTIVE_SESSION_PREFIX = 'vc_demo_exam_active_session_';

export interface ActiveDemoSessionState {
  testId: DemoExamTypeId;
  startedAtMs: number;
  durationSeconds: number;
  deadlineMs: number;
  answers: Record<number, number>; // questionNumber (1..N) or index -> selectedOption (0..3)
  markedForReview: Record<number, boolean>;
  currentIndex: number;
  lastUpdatedMs: number;
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

export const demoExamService = {
  /**
   * Retrieves the effective exam configuration (default merged with any admin modifications)
   */
  getConfig(testId: DemoExamTypeId): DemoExamConfig {
    const base = OFFICIAL_DEMO_EXAM_CONFIGS[testId];
    const customMap = loadLocalConfigs();
    const patch = customMap[testId] || {};

    const merged: DemoExamConfig = {
      ...base,
      ...patch,
      sections: patch.sections || base.sections
    };

    // Keep durationSeconds and totalMarks consistent
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
   * Retrieves all questions for a demo test (defaults + custom edits/additions)
   */
  getQuestions(testId: DemoExamTypeId): DemoExamQuestion[] {
    const customMap = loadLocalQuestions();
    const customList = customMap[testId];

    if (customList && customList.length > 0) {
      return customList;
    }

    const defaultList = buildDefaultDemoExamQuestions(testId);
    return defaultList;
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

    // Sort by question number
    list.sort((a, b) => a.questionNumber - b.questionNumber);

    const map = loadLocalQuestions();
    map[testId] = list;
    customQuestionsCache = map;
    setSafeStorageItem(QUESTIONS_STORAGE_KEY, JSON.stringify(map));

    // Sync question count with config
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
      isCustomAdminQuestion: true
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
    // Renumber remaining questions sequentially
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

  /**
   * Loads an in-progress demo examination session if one exists and hasn't expired
   */
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

  /**
   * Saves or updates an active examination session with its immutable deadline
   */
  saveActiveSession(session: ActiveDemoSessionState): void {
    setSafeStorageItem(
      `${ACTIVE_SESSION_PREFIX}${session.testId}`,
      JSON.stringify({ ...session, lastUpdatedMs: Date.now() })
    );
  },

  /**
   * Clears the active session for a test when completed or abandoned
   */
  clearActiveSession(testId: DemoExamTypeId): void {
    removeSafeStorageItem(`${ACTIVE_SESSION_PREFIX}${testId}`);
  },

  // =========================================================================
  // ATTEMPT RECORDING & ADMIN PARTICIPATION STATISTICS
  // =========================================================================

  /**
   * Records a completed demo exam attempt in localStorage and attempts sync
   */
  async recordAttempt(attempt: DemoExamAttemptRecord): Promise<void> {
    const list = loadLocalAttempts();
    list.unshift(attempt);
    // Keep top 200 attempts locally
    const trimmed = list.slice(0, 200);
    attemptsCache = trimmed;
    setSafeStorageItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(trimmed));

    // Clear active session for this test
    this.clearActiveSession(attempt.testId);
  },

  /**
   * Gets attempts list for admin view (filtered optionally by testId)
   */
  getAttempts(testId?: DemoExamTypeId): DemoExamAttemptRecord[] {
    const list = loadLocalAttempts();
    if (!testId) return list;
    return list.filter((a) => a.testId === testId);
  },

  /**
   * Computes participation and performance metrics for admin analytics
   */
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
        recentAttempts: []
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
      recentAttempts: attempts.slice(0, 25)
    };
  }
};
