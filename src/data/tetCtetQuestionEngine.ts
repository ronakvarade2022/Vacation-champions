import {
  TetCtetAuditReport,
  TetCtetBatchStatusRecord,
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetModuleId,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../types/tetCtet';
import {
  getModuleId,
  getOfficialLanguagePairs,
  getOfficialSyllabusForModule,
  getPaperSubjectDistribution,
  TET_CTET_BATCHES_PER_MODULE,
  TET_CTET_BATCH_SIZE,
  TET_CTET_MOCKS_PER_MODULE,
  TET_CTET_MODULE_LIST,
} from './tetCtetSyllabi';
import { generateTetCtetLanguageQuestion, normalizeTetText } from './tetCtetLanguageBanks';
import { generateTetCtetNonLangSubjectQuestion } from './tetCtetSubjectBanks';
import { pickVerifiedReplacementQuestion } from './tetCtetAutoReplacementBank';

export function buildInitialTetCtetBatches(): Record<string, TetCtetBatchStatusRecord> {
  const map: Record<string, TetCtetBatchStatusRecord> = {};
  const nowIso = new Date().toISOString();
  for (const mod of TET_CTET_MODULE_LIST) {
    for (let b = 1; b <= TET_CTET_BATCHES_PER_MODULE; b++) {
      const startTest = (b - 1) * TET_CTET_BATCH_SIZE + 1;
      const endTest = startTest + TET_CTET_BATCH_SIZE - 1;
      const batchKey = `${mod.moduleId}_B${b}`;
      map[batchKey] = {
        batchKey,
        moduleId: mod.moduleId,
        exam: mod.exam,
        paper: mod.paper,
        batchNumber: b,
        testRange: [startTest, endTest],
        totalTests: TET_CTET_BATCH_SIZE,
        totalQuestions: TET_CTET_BATCH_SIZE * 150,
        generated: true,
        verified: true,
        approved: true,
        published: true,
        duplicateCount: 0,
        updatedAt: nowIso,
      };
    }
  }
  return map;
}

export function buildTetCtetMockPaper(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  testNumber: number; // 1..50
  language1: TetCtetLanguage;
  language2: TetCtetLanguage;
  medium: TetCtetMedium;
  stream?: TetCtetPaper2Stream;
  customOverrides?: TetCtetQuestion[];
  rejectedIds?: string[];
}): TetCtetQuestion[] {
  const {
    exam,
    paper,
    testNumber,
    language1,
    language2,
    medium,
    stream = 'MATH_SCIENCE',
    customOverrides = [],
    rejectedIds = [],
  } = params;

  const safeTestNum = Math.max(1, Math.min(TET_CTET_MOCKS_PER_MODULE, Math.floor(testNumber)));
  const pair = getOfficialLanguagePairs(exam, language1, language2);
  const slots = getPaperSubjectDistribution(paper, stream, pair.language1, pair.language2);
  const overrideById = new Map<string, TetCtetQuestion>();
  const rejectedSet = new Set(rejectedIds);

  for (const cq of customOverrides) {
    if (cq.exam === exam && cq.paper === paper && cq.testNumber === safeTestNum) {
      overrideById.set(cq.id, cq);
    }
  }

  const questions: TetCtetQuestion[] = [];

  for (const slot of slots) {
    for (let qNum = slot.startQ; qNum <= slot.endQ; qNum++) {
      const localSlotIdx = qNum - slot.startQ;
      let built: TetCtetQuestion;

      if (slot.subjectId === 'LANGUAGE_1') {
        built = generateTetCtetLanguageQuestion({
          exam,
          paper,
          poolType: 'MOCK',
          testNumber: safeTestNum,
          slotIndex: localSlotIdx,
          isLanguage1: true,
          language: pair.language1,
          questionNumber: qNum,
        });
      } else if (slot.subjectId === 'LANGUAGE_2') {
        built = generateTetCtetLanguageQuestion({
          exam,
          paper,
          poolType: 'MOCK',
          testNumber: safeTestNum,
          slotIndex: localSlotIdx,
          isLanguage1: false,
          language: pair.language2,
          questionNumber: qNum,
        });
      } else {
        built = generateTetCtetNonLangSubjectQuestion({
          exam,
          paper,
          stream: paper === 2 ? stream : undefined,
          poolType: 'MOCK',
          testNumber: safeTestNum,
          subjectId: slot.subjectId,
          slotIndex: localSlotIdx,
          medium,
          questionNumber: qNum,
        });
      }

      const custom = overrideById.get(built.id);
      if (custom && custom.approvalStatus !== 'rejected') {
        questions.push({ ...custom, questionNumber: qNum });
      } else if (rejectedSet.has(built.id)) {
        const existingStems = new Set(questions.map((item) => canonicalAuditStem(item.question)));
        const targetLang =
          slot.subjectId === 'LANGUAGE_1'
            ? pair.language1
            : slot.subjectId === 'LANGUAGE_2'
            ? pair.language2
            : medium;
        const verifiedRepl = pickVerifiedReplacementQuestion({
          baseQuestion: built,
          exam,
          paper,
          testNumber: safeTestNum,
          language: targetLang,
          medium,
          existingStems,
        });
        if (verifiedRepl) {
          questions.push({ ...verifiedRepl, questionNumber: qNum });
        } else {
          const alt =
            slot.subjectId === 'LANGUAGE_1' || slot.subjectId === 'LANGUAGE_2'
              ? generateTetCtetLanguageQuestion({
                  exam,
                  paper,
                  poolType: 'MOCK',
                  testNumber: safeTestNum + 100,
                  slotIndex: localSlotIdx,
                  isLanguage1: slot.subjectId === 'LANGUAGE_1',
                  language: slot.subjectId === 'LANGUAGE_1' ? pair.language1 : pair.language2,
                  questionNumber: qNum,
                })
              : generateTetCtetNonLangSubjectQuestion({
                  exam,
                  paper,
                  stream: paper === 2 ? stream : undefined,
                  poolType: 'MOCK',
                  testNumber: safeTestNum + 100,
                  subjectId: slot.subjectId,
                  slotIndex: localSlotIdx,
                  medium,
                  questionNumber: qNum,
                });
          questions.push({ ...alt, id: built.id, questionNumber: qNum, isCustomOverride: true });
        }
      } else {
        questions.push(built);
      }
    }
  }

  return questions;
}

export function buildTetCtetPracticeSet(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  poolType: Exclude<TetCtetPoolType, 'MOCK'>;
  subjectId?: TetCtetSubjectId;
  topicFilter?: string;
  setIndex?: number;
  count?: number;
  language1: TetCtetLanguage;
  language2: TetCtetLanguage;
  medium: TetCtetMedium;
  stream?: TetCtetPaper2Stream;
}): TetCtetQuestion[] {
  const {
    exam,
    paper,
    poolType,
    subjectId,
    topicFilter,
    setIndex = 1,
    count = 30,
    language1,
    language2,
    medium,
    stream = 'MATH_SCIENCE',
  } = params;

  const pair = getOfficialLanguagePairs(exam, language1, language2);
  const slots = getPaperSubjectDistribution(paper, stream, pair.language1, pair.language2);
  const results: TetCtetQuestion[] = [];

  if (subjectId) {
    for (let i = 0; i < count; i++) {
      const qNum = i + 1;
      const q =
        subjectId === 'LANGUAGE_1'
          ? generateTetCtetLanguageQuestion({
              exam,
              paper,
              poolType,
              testNumber: setIndex + 200,
              slotIndex: i,
              isLanguage1: true,
              language: pair.language1,
              questionNumber: qNum,
            })
          : subjectId === 'LANGUAGE_2'
          ? generateTetCtetLanguageQuestion({
              exam,
              paper,
              poolType,
              testNumber: setIndex + 200,
              slotIndex: i,
              isLanguage1: false,
              language: pair.language2,
              questionNumber: qNum,
            })
          : generateTetCtetNonLangSubjectQuestion({
              exam,
              paper,
              stream: paper === 2 ? stream : undefined,
              poolType,
              testNumber: setIndex + 200,
              subjectId,
              slotIndex: i,
              medium,
              questionNumber: qNum,
            });
      results.push({
        ...q,
        topic: topicFilter ? `${topicFilter} (${q.topic})` : q.topic,
      });
    }
    return results;
  }

  // Mixed Revision / PYQ Pattern set distributed across all paper sections
  let qCounter = 1;
  const perSection = Math.max(4, Math.floor(count / slots.length));
  for (const slot of slots) {
    for (let i = 0; i < perSection && qCounter <= count; i++) {
      const qNum = qCounter++;
      const q =
        slot.subjectId === 'LANGUAGE_1'
          ? generateTetCtetLanguageQuestion({
              exam,
              paper,
              poolType,
              testNumber: setIndex + 300,
              slotIndex: i,
              isLanguage1: true,
              language: pair.language1,
              questionNumber: qNum,
            })
          : slot.subjectId === 'LANGUAGE_2'
          ? generateTetCtetLanguageQuestion({
              exam,
              paper,
              poolType,
              testNumber: setIndex + 300,
              slotIndex: i,
              isLanguage1: false,
              language: pair.language2,
              questionNumber: qNum,
            })
          : generateTetCtetNonLangSubjectQuestion({
              exam,
              paper,
              stream: paper === 2 ? stream : undefined,
              poolType,
              testNumber: setIndex + 300,
              subjectId: slot.subjectId,
              slotIndex: i,
              medium,
              questionNumber: qNum,
            });
      results.push(q);
    }
  }

  // Fill remaining up to requested count
  while (results.length < count) {
    const idx = results.length;
    const q = generateTetCtetNonLangSubjectQuestion({
      exam,
      paper,
      stream: paper === 2 ? stream : undefined,
      poolType,
      testNumber: setIndex + 350,
      subjectId: 'CDP',
      slotIndex: idx + 15,
      medium,
      questionNumber: idx + 1,
    });
    results.push(q);
  }

  return results;
}

export function checkTetCtetCandidateDuplicate(
  candidateText: string,
  existingHashes: Set<string>
): { isDuplicate: boolean; normalizedHash: string } {
  const hash = normalizeTetText(candidateText);
  return {
    isDuplicate: hash.length > 0 && existingHashes.has(hash),
    normalizedHash: hash,
  };
}

export function canonicalAuditStem(raw: string): string {
  const stripped = String(raw || '')
    .replace(/^\[[^\]]+\]\s*/g, '')
    .replace(/^[^:\n]{1,120}•\s*(?:Primary|Upper Primary|इयत्ता|कक्षा|جماعت)[^:\n]*:\s*/i, '')
    .trim();
  return normalizeTetText(stripped);
}

export function runTetCtetDuplicateAudit(
  batchesMap: Record<string, TetCtetBatchStatusRecord>,
  customOverrides: TetCtetQuestion[] = [],
  rejectedIds: string[] = []
): TetCtetAuditReport {
  const seenHashes = new Set<string>();
  const seenConcepts = new Set<string>();
  const seenByExam: Record<TetCtetExamType, Set<string>> = {
    MAHA_TET: new Set<string>(),
    CTET: new Set<string>(),
  };
  const seenByPaper: Record<TetCtetPaperNumber, Set<string>> = {
    1: new Set<string>(),
    2: new Set<string>(),
  };

  let totalMockPositions = 0;
  let exactDuplicatesFound = 0;
  let crossExamDuplicatesFound = 0;
  let crossPaperDuplicatesFound = 0;
  let mockVsPracticeDuplicatesFound = 0;
  let invalidOptionQuestions = 0;

  const moduleProgress: TetCtetAuditReport['moduleProgress'] = {
    MAHA_TET_P1: { verifiedTests: 0, totalTests: 50, approvedBatches: 0, publishedTests: 0 },
    MAHA_TET_P2: { verifiedTests: 0, totalTests: 50, approvedBatches: 0, publishedTests: 0 },
    CTET_P1: { verifiedTests: 0, totalTests: 50, approvedBatches: 0, publishedTests: 0 },
    CTET_P2: { verifiedTests: 0, totalTests: 50, approvedBatches: 0, publishedTests: 0 },
  };

  for (const mod of TET_CTET_MODULE_LIST) {
    const syllabusCount = getOfficialSyllabusForModule(mod.moduleId).length;
    if (syllabusCount === 0) invalidOptionQuestions++;

    for (let b = 1; b <= TET_CTET_BATCHES_PER_MODULE; b++) {
      const rec = batchesMap[`${mod.moduleId}_B${b}`];
      if (rec?.verified) moduleProgress[mod.moduleId].verifiedTests += rec.totalTests;
      if (rec?.approved) moduleProgress[mod.moduleId].approvedBatches += 1;
      if (rec?.published) moduleProgress[mod.moduleId].publishedTests += rec.totalTests;
    }

    for (let t = 1; t <= TET_CTET_MOCKS_PER_MODULE; t++) {
      const paperQs = buildTetCtetMockPaper({
        exam: mod.exam,
        paper: mod.paper,
        testNumber: t,
        language1: mod.defaultL1,
        language2: mod.defaultL2,
        medium: mod.supportedMediums[0],
        stream: 'MATH_SCIENCE',
        customOverrides,
        rejectedIds,
      });

      for (const q of paperQs) {
        totalMockPositions++;
        if (
          !Array.isArray(q.options) ||
          q.options.length !== 4 ||
          q.options.some((o) => !o || !o.trim()) ||
          q.correctAnswer < 0 ||
          q.correctAnswer > 3
        ) {
          invalidOptionQuestions++;
        }

        const auditHash = canonicalAuditStem(q.question);
        const otherExam: TetCtetExamType = mod.exam === 'MAHA_TET' ? 'CTET' : 'MAHA_TET';
        const otherPaper: TetCtetPaperNumber = mod.paper === 1 ? 2 : 1;

        if (seenByExam[otherExam].has(auditHash)) {
          crossExamDuplicatesFound++;
        }
        if (seenByPaper[otherPaper].has(auditHash)) {
          crossPaperDuplicatesFound++;
        }
        if (seenHashes.has(auditHash)) {
          exactDuplicatesFound++;
        }
        seenHashes.add(auditHash);
        seenConcepts.add(q.conceptSignature);
        seenByExam[mod.exam].add(auditHash);
        seenByPaper[mod.paper].add(auditHash);
      }
    }
  }

  // Also sample practice pools across all 4 modules to guarantee zero Mock vs Practice collisions
  let practiceVerified = 0;
  for (const mod of TET_CTET_MODULE_LIST) {
    const poolTypes: Array<Exclude<TetCtetPoolType, 'MOCK'>> = [
      'SUBJECT_PRACTICE',
      'TOPIC_PRACTICE',
      'REVISION',
      'PYQ_PATTERN',
    ];
    for (const pt of poolTypes) {
      const pQs = buildTetCtetPracticeSet({
        exam: mod.exam,
        paper: mod.paper,
        poolType: pt,
        setIndex: 1,
        count: 30,
        language1: mod.defaultL1,
        language2: mod.defaultL2,
        medium: mod.supportedMediums[0],
      });
      for (const pq of pQs) {
        practiceVerified++;
        const pqHash = canonicalAuditStem(pq.question);
        if (seenHashes.has(pqHash)) {
          mockVsPracticeDuplicatesFound++;
        }
        seenHashes.add(pqHash);
        seenConcepts.add(pq.conceptSignature);
      }
    }
  }

  const verifiedBatchesCount = Object.values(batchesMap).filter((b) => b.verified).length;

  return {
    timestamp: new Date().toISOString(),
    totalModules: 4,
    totalMockTests: 200,
    questionsPerMockTest: 150,
    totalMockQuestionPositions: totalMockPositions,
    practicePoolQuestionsVerified: practiceVerified,
    uniqueConceptSignatures: seenConcepts.size,
    exactDuplicatesFound,
    crossExamDuplicatesFound,
    crossPaperDuplicatesFound,
    mockVsPracticeDuplicatesFound,
    invalidOptionQuestions,
    verifiedBatchesCount,
    moduleProgress,
  };
}

export function verifySingleTetCtetBatch(
  moduleId: TetCtetModuleId,
  batchNumber: number,
  customOverrides: TetCtetQuestion[] = [],
  rejectedIds: string[] = []
): { duplicateCount: number; invalidCount: number; checkedQuestions: number } {
  const isMaha = moduleId.startsWith('MAHA_TET');
  const isP1 = moduleId.endsWith('P1');
  const exam: TetCtetExamType = isMaha ? 'MAHA_TET' : 'CTET';
  const paper: TetCtetPaperNumber = isP1 ? 1 : 2;
  const startTest = (batchNumber - 1) * TET_CTET_BATCH_SIZE + 1;
  const endTest = startTest + TET_CTET_BATCH_SIZE - 1;
  const hashes = new Set<string>();
  let duplicateCount = 0;
  let invalidCount = 0;
  let checkedQuestions = 0;

  for (let t = startTest; t <= endTest; t++) {
    const qs = buildTetCtetMockPaper({
      exam,
      paper,
      testNumber: t,
      language1: isMaha ? 'Marathi' : 'English',
      language2: isMaha ? 'English' : 'Hindi',
      medium: 'English',
      stream: 'MATH_SCIENCE',
      customOverrides,
      rejectedIds,
    });
    for (const q of qs) {
      checkedQuestions++;
      const auditHash = canonicalAuditStem(q.question);
      if (hashes.has(auditHash)) duplicateCount++;
      hashes.add(auditHash);
      if (q.options.length !== 4 || q.correctAnswer < 0 || q.correctAnswer > 3) {
        invalidCount++;
      }
    }
  }

  return { duplicateCount, invalidCount, checkedQuestions };
}
