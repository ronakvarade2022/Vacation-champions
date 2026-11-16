import { TET_CTET_AUDIT_BATCHES } from './tetCtetAuditTracker';
import {
  buildTetCtetMockPaper,
  buildTetCtetPracticeSet,
  canonicalAuditStem,
} from './tetCtetQuestionEngine';
import { getPaperSubjectDistribution, TET_CTET_MODULE_LIST } from './tetCtetSyllabi';
import {
  VERIFIED_TET_CTET_BATCH_MANIFEST,
  VerifiedBatchManifestEntry,
} from './tetCtetVerifiedBatchManifest';
import {
  TetCtetExamType,
  TetCtetModuleId,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../types/tetCtet';

export type CentralAuditExecutionMode = 'full' | 'incremental';
export type MockTestPublicationStatus = 'GREEN' | 'YELLOW' | 'RED';

export interface MockTestQaStatusRecord {
  key: string; // `${moduleId}_T${testNumber}`
  moduleId: TetCtetModuleId;
  moduleTitle: string;
  testNumber: number;
  batchNumber: number; // 1..10 (5-test batch)
  auditBatchNumber: number; // 1..5 (10-test batch)
  status: MockTestPublicationStatus;
  readyForStudents: boolean;
  totalQuestions: number;
  cleanQuestions: number;
  exactDuplicates: number;
  nearDuplicates: number;
  incorrectQuestions: number;
  reviewOnlyQuestions: number;
  patternOk: boolean;
  reasonSummary: string;
}

export interface QaDefectClassification {
  cleanVerified: number;
  exactDuplicates: number;
  nearDuplicatesOrClones: number;
  syntheticTagOnlyNeedsReview: number;
  stageOrSyllabusMismatchOnly: number;
  incorrectKeyOrOptionsOrMissing: number;
}

export interface QaPublicationSummary {
  greenTestsCount: number;
  yellowTestsCount: number;
  redTestsCount: number;
  testsReadyForPublication: number;
  testsNotReadyForPublication: number;
}

export interface QaCheckpointRecord {
  backupArtifactDir: string;
  completedBatches: string[];
  nextResumeBatchId: string;
  lastSavedAt: string;
}

export interface CentralizedModuleAuditRow {
  moduleId: TetCtetModuleId;
  title: string;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  totalMockTests: number;
  totalQuestions: number;
  questionsAudited: number;
  questionsPassed: number;
  exactDuplicates: number;
  nearDuplicates: number;
  incorrectQuestions: number;
  outOfSyllabusQuestions: number;
  questionsReplaced: number;
  questionsRequiringManualReview: number;
  remainingQuestions: number;
  greenTests: number;
  yellowTests: number;
  redTests: number;
}

export interface AuditFindingSample {
  moduleId: TetCtetModuleId;
  testNumber: number;
  questionNumber: number;
  subjectId: TetCtetSubjectId;
  issueType:
    | 'EXACT_DUPLICATE'
    | 'NEAR_DUPLICATE'
    | 'INVALID_KEY_OR_OPTIONS'
    | 'OUT_OF_SYLLABUS_OR_STAGE'
    | 'SYNTHETIC_TEMPLATE_TAG';
  detail: string;
  questionSnippet: string;
}

export interface ConsolidatedTetCtetAuditReport {
  generatedAt: string;
  auditMode: CentralAuditExecutionMode;
  durationMs: number;
  // Core Metrics
  totalMockTests: number;
  totalQuestions: number;
  questionsAudited: number;
  questionsPassed: number;
  duplicateQuestionsDetected: number;
  incorrectQuestionsDetected: number;
  outOfSyllabusQuestions: number;
  questionsReplaced: number;
  questionsRequiringManualReview: number;
  remainingQuestions: number;
  // Speed Optimization & Manifest Cache Telemetry
  skippedVerifiedTests: number;
  skippedVerifiedQuestions: number;
  freshlyScannedTests: number;
  // Granular Diagnostic Sub-Metrics
  exactDuplicatesCount: number;
  nearDuplicatesCount: number;
  syntheticTaggedCount: number;
  stageMismatchCount: number;
  curatedBatchReplacementsCount: number;
  legacyMathRepairedCount: number;
  adminCustomReplacementsCount: number;
  patternCompliantTests: number;
  verifiedCleanTests: number;
  // Step 2, 4, 6 Additions
  defectClassification: QaDefectClassification;
  publicationSummary: QaPublicationSummary;
  checkpoint: QaCheckpointRecord;
  mockTestStatuses: MockTestQaStatusRecord[];
  verifiedMediumsCheck?: {
    marathiPassed: number;
    hindiPassed: number;
    issuesFound: number;
  };
  practicePoolSummary?: {
    totalChecked: number;
    exactDuplicates: number;
    prefixTagged: number;
    invalidOptionsOrKeys: number;
  };
  socialStudiesExtraChecked?: {
    totalSlots: number;
    invalidOptionsOrKeys: number;
    exactDuplicatesWithinP2Sst: number;
  };
  moduleBreakdown: CentralizedModuleAuditRow[];
  sampleFindings: AuditFindingSample[];
}

export interface CentralAuditOptions {
  auditMode?: CentralAuditExecutionMode;
  customOverrides?: TetCtetQuestion[];
  rejectedIds?: string[];
  includePaper2SocialStudies?: boolean;
  includePracticePools?: boolean;
  includeMultiMediumVerification?: boolean;
  repairedMathKeyCount?: number;
}

export const HISTORICAL_MATH_OPTION_REPAIRS = 450;
export const QA_BACKUP_ARTIFACT_DIR = 'backup_pre_qa';

const SYNTHETIC_TAG_REGEX = /^\[(?:MAHA TET|CTET)[^\]]+\]/i;
const LEGACY_STAGE_PREFIX_REGEX =
  /^[^:\n]{1,120}•\s*(?:Primary|Upper Primary|इयत्ता|कक्षा|جماعت)[^:\n]*:\s*/i;
const PLACEHOLDER_REGEX = /\b(?:todo|tbd|placeholder|lorem ipsum|coming soon)\b/i;
const COMPREHENSION_LEAD_REGEX = /^(?:read the following|दिलेल्या|खालील|निम्नलिखित)/i;

function extractCoreQuestionLine(rawQuestion: string): string {
  const parts = String(rawQuestion || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2 && COMPREHENSION_LEAD_REGEX.test(parts[0])) {
    return canonicalAuditStem(parts[parts.length - 1]);
  }
  return canonicalAuditStem(rawQuestion);
}

function buildFourShingles(text: string): Set<string> {
  const words = text.split(/\s+/).filter(Boolean);
  const shingles = new Set<string>();
  if (words.length < 4) return shingles;
  for (let i = 0; i <= words.length - 4; i++) {
    shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`);
  }
  return shingles;
}

function jaccardSimilarity(a: Set<string>, b: Set<string>, overlapCount: number): number {
  if (overlapCount <= 0) return 0;
  const union = a.size + b.size - overlapCount;
  return union > 0 ? overlapCount / union : 0;
}

export function validateSingleTetCtetQuestion(
  q: TetCtetQuestion,
  existingCanonicalStems: Set<string>,
  existingSkeletons?: Set<string>
): {
  isValid: boolean;
  reasons: string[];
  canonicalStem: string;
  skeleton: string;
} {
  const reasons: string[] = [];
  const rawQ = String(q.question || '').trim();
  const canonicalStem = canonicalAuditStem(rawQ);
  const coreStem = extractCoreQuestionLine(rawQ);
  const skeleton = coreStem.replace(/\d+/g, '#');

  if (rawQ.length < 15 || PLACEHOLDER_REGEX.test(rawQ)) {
    reasons.push('Question stem is incomplete or contains placeholder text.');
  }
  if (SYNTHETIC_TAG_REGEX.test(rawQ) || LEGACY_STAGE_PREFIX_REGEX.test(rawQ)) {
    reasons.push('Question contains a synthetic mock/prefix tag instead of organic exam text.');
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    reasons.push('Question must have exactly 4 answer options.');
  } else {
    const cleanedOpts = q.options.map((o) => String(o || '').trim().toLowerCase());
    if (cleanedOpts.some((o) => !o)) {
      reasons.push('One or more answer options are empty.');
    }
    if (new Set(cleanedOpts).size !== 4) {
      reasons.push('Duplicate or colliding answer options detected.');
    }
  }
  if (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer > 3) {
    reasons.push('Correct answer index is out of valid 0–3 range.');
  }
  if (!q.explanation || !q.explanation.trim()) {
    reasons.push('Pedagogical / solution explanation is missing.');
  }
  if (canonicalStem && existingCanonicalStems.has(canonicalStem)) {
    reasons.push('Exact duplicate of an existing question in the global bank.');
  } else if (
    existingSkeletons &&
    coreStem.length > 25 &&
    /\d/.test(coreStem) &&
    existingSkeletons.has(skeleton)
  ) {
    reasons.push('Near-duplicate numeric template clone detected.');
  }

  return {
    isValid: reasons.length === 0,
    reasons,
    canonicalStem,
    skeleton,
  };
}

export function runCentralizedTetCtetAudit(
  options: CentralAuditOptions = {}
): ConsolidatedTetCtetAuditReport {
  const { report } = executeCentralizedAuditWithManifest(options);
  return report;
}

export function executeCentralizedAuditWithManifest(
  options: CentralAuditOptions = {}
): {
  report: ConsolidatedTetCtetAuditReport;
  manifestEntries: VerifiedBatchManifestEntry[];
} {
  const tStart = Date.now();
  const {
    auditMode = 'full',
    customOverrides = [],
    rejectedIds = [],
    includePaper2SocialStudies = true,
    includePracticePools = true,
    includeMultiMediumVerification = true,
    repairedMathKeyCount = HISTORICAL_MATH_OPTION_REPAIRS,
  } = options;

  const modifiedModuleTests = new Set<string>();
  for (const cq of customOverrides) {
    if (cq.testNumber) modifiedModuleTests.add(`${cq.moduleId}:T${cq.testNumber}`);
  }
  for (const rid of rejectedIds) {
    const m = /^TETCTET-(MAHA_TET|CTET)-P([12])-T(\d+)/.exec(rid);
    if (m) {
      modifiedModuleTests.add(`${m[1]}_P${m[2]}:T${Number(m[3])}`);
    }
  }

  const completedTestSetByModule = new Map<TetCtetModuleId, Set<number>>();
  const completedBatchIds: string[] = [];
  let nextResumeBatchId = 'ALL_COMPLETED';
  let curatedBatchReplacementsCount = 0;

  for (const batch of TET_CTET_AUDIT_BATCHES) {
    if (!completedTestSetByModule.has(batch.moduleId)) {
      completedTestSetByModule.set(batch.moduleId, new Set<number>());
    }
    if (batch.status === 'Completed') {
      completedBatchIds.push(batch.id);
      const set = completedTestSetByModule.get(batch.moduleId)!;
      for (let t = batch.testStart; t <= batch.testEnd; t++) {
        set.add(t);
      }
      curatedBatchReplacementsCount += batch.correctionSummary.reduce(
        (sum, log) => sum + log.replacedCount,
        0
      );
    } else if (nextResumeBatchId === 'ALL_COMPLETED') {
      nextResumeBatchId = batch.id;
    }
  }

  const manifestByModuleTestRange = new Map<string, VerifiedBatchManifestEntry>();
  if (auditMode === 'incremental' && VERIFIED_TET_CTET_BATCH_MANIFEST.length > 0) {
    for (const entry of VERIFIED_TET_CTET_BATCH_MANIFEST) {
      manifestByModuleTestRange.set(entry.batchId, entry);
    }
  }

  const newManifestMap = new Map<string, VerifiedBatchManifestEntry>();
  for (const batch of TET_CTET_AUDIT_BATCHES) {
    if (batch.status === 'Completed') {
      newManifestMap.set(batch.id, {
        batchId: batch.id,
        moduleId: batch.moduleId,
        testStart: batch.testStart,
        testEnd: batch.testEnd,
        totalQuestions: batch.totalQuestions,
        verifiedAt: new Date().toISOString(),
        canonicalStems: [],
        numericSkeletons: [],
      });
    }
  }

  const seenCanonical = new Map<string, string>();
  const seenPaper1Stems = new Set<string>();
  const seenSkeleton = new Map<string, string>();
  const shingleItems: Array<{ tag: string; shingles: Set<string>; moduleId: TetCtetModuleId }> = [];
  const shingleBucket = new Map<string, number[]>();

  let totalMockTests = 0;
  let totalQuestions = 0;
  let questionsAudited = 0;
  let questionsPassed = 0;
  let exactDuplicatesCount = 0;
  let nearDuplicatesCount = 0;
  let incorrectQuestionsDetected = 0;
  let outOfSyllabusQuestions = 0;
  let syntheticTaggedCount = 0;
  let stageMismatchCount = 0;
  let patternCompliantTests = 0;
  let verifiedCleanTests = 0;
  let skippedVerifiedTests = 0;
  let skippedVerifiedQuestions = 0;
  let freshlyScannedTests = 0;

  // Mutual-exclusive primary defect reason breakdown (sums to totalQuestions)
  const defectClassification: QaDefectClassification = {
    cleanVerified: 0,
    exactDuplicates: 0,
    nearDuplicatesOrClones: 0,
    syntheticTagOnlyNeedsReview: 0,
    stageOrSyllabusMismatchOnly: 0,
    incorrectKeyOrOptionsOrMissing: 0,
  };

  let greenTestsCount = 0;
  let yellowTestsCount = 0;
  let redTestsCount = 0;

  const mockTestStatuses: MockTestQaStatusRecord[] = [];
  const sampleFindings: AuditFindingSample[] = [];
  const moduleBreakdown: CentralizedModuleAuditRow[] = [];

  const pushSample = (sample: AuditFindingSample) => {
    if (sampleFindings.length < 40) {
      sampleFindings.push(sample);
    }
  };

  for (const mod of TET_CTET_MODULE_LIST) {
    let modAudited = 0;
    let modPassed = 0;
    let modExactDup = 0;
    let modNearDup = 0;
    let modIncorrect = 0;
    let modOutOfSyllabus = 0;
    let modGreen = 0;
    let modYellow = 0;
    let modRed = 0;

    const expectedDistribution = getPaperSubjectDistribution(
      mod.paper,
      mod.paper === 2 ? 'MATH_SCIENCE' : undefined,
      mod.defaultL1,
      mod.defaultL2
    );
    const completedSet = completedTestSetByModule.get(mod.moduleId) || new Set<number>();

    const skippableBatches = new Map<number, VerifiedBatchManifestEntry>();
    if (auditMode === 'incremental') {
      for (const batch of TET_CTET_AUDIT_BATCHES) {
        if (batch.moduleId !== mod.moduleId || batch.status !== 'Completed') continue;
        const manifest = manifestByModuleTestRange.get(batch.id);
        if (!manifest || manifest.canonicalStems.length === 0) continue;
        let hasModifiedTest = false;
        for (let t = batch.testStart; t <= batch.testEnd; t++) {
          if (modifiedModuleTests.has(`${mod.moduleId}:T${t}`)) {
            hasModifiedTest = true;
            break;
          }
        }
        if (!hasModifiedTest) {
          for (let t = batch.testStart; t <= batch.testEnd; t++) {
            skippableBatches.set(t, manifest);
          }
          for (const st of manifest.canonicalStems) {
            if (!seenCanonical.has(st)) seenCanonical.set(st, `${batch.id}(cached)`);
            if (mod.paper === 1) seenPaper1Stems.add(st);
          }
          for (const sk of manifest.numericSkeletons) {
            if (!seenSkeleton.has(sk)) seenSkeleton.set(sk, `${batch.id}(cached)`);
          }
        }
      }
    }

    for (let testNum = 1; testNum <= 50; testNum++) {
      totalMockTests++;

      if (skippableBatches.has(testNum)) {
        totalQuestions += 150;
        questionsAudited += 150;
        questionsPassed += 150;
        defectClassification.cleanVerified += 150;
        patternCompliantTests++;
        verifiedCleanTests++;
        skippedVerifiedTests++;
        skippedVerifiedQuestions += 150;
        modAudited += 150;
        modPassed += 150;
        greenTestsCount++;
        modGreen++;
        mockTestStatuses.push({
          key: `${mod.moduleId}_T${testNum}`,
          moduleId: mod.moduleId,
          moduleTitle: `${mod.examTitle} Paper ${mod.paper}`,
          testNumber: testNum,
          batchNumber: Math.ceil(testNum / 5),
          auditBatchNumber: Math.ceil(testNum / 10),
          status: 'GREEN',
          readyForStudents: true,
          totalQuestions: 150,
          cleanQuestions: 150,
          exactDuplicates: 0,
          nearDuplicates: 0,
          incorrectQuestions: 0,
          reviewOnlyQuestions: 0,
          patternOk: true,
          reasonSummary: 'Verified clean (150/150 original syllabus-aligned questions)',
        });
        continue;
      }

      freshlyScannedTests++;
      const paperQs = buildTetCtetMockPaper({
        exam: mod.exam,
        paper: mod.paper,
        testNumber: testNum,
        language1: mod.defaultL1,
        language2: mod.defaultL2,
        medium: mod.supportedMediums[0],
        stream: 'MATH_SCIENCE',
        customOverrides,
        rejectedIds,
      });

      let testPatternOk = paperQs.length === 150;
      if (testPatternOk) {
        for (const slot of expectedDistribution) {
          for (let qPos = slot.startQ; qPos <= slot.endQ; qPos++) {
            if (paperQs[qPos - 1]?.subjectId !== slot.subjectId) {
              testPatternOk = false;
              break;
            }
          }
          if (!testPatternOk) break;
        }
      }
      if (testPatternOk) patternCompliantTests++;

      let testClean = 0;
      let testExactDup = 0;
      let testNearDup = 0;
      let testIncorrect = 0;
      let testReviewOnly = 0;

      const isCuratedCompleted = completedSet.has(testNum);
      const batchForManifest = isCuratedCompleted
        ? TET_CTET_AUDIT_BATCHES.find(
            (b) =>
              b.moduleId === mod.moduleId &&
              b.status === 'Completed' &&
              testNum >= b.testStart &&
              testNum <= b.testEnd
          )
        : undefined;
      const manifestTarget = batchForManifest ? newManifestMap.get(batchForManifest.id) : undefined;

      for (const q of paperQs) {
        totalQuestions++;
        questionsAudited++;
        modAudited++;

        const tag = `${mod.moduleId}:T${testNum}:Q${q.questionNumber}`;
        const rawQ = String(q.question || '').trim();
        const canonical = canonicalAuditStem(rawQ);
        const coreStem = extractCoreQuestionLine(rawQ);
        const skeleton = coreStem.replace(/\d+/g, '#');

        const trimmedLowerOpts = Array.isArray(q.options)
          ? q.options.map((o) => String(o || '').trim().toLowerCase())
          : [];
        const hasValidOptionsAndKey =
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          !trimmedLowerOpts.some((o) => !o) &&
          new Set(trimmedLowerOpts).size === 4 &&
          Number.isInteger(q.correctAnswer) &&
          q.correctAnswer >= 0 &&
          q.correctAnswer <= 3;
        const hasValidExplanation = Boolean(q.explanation && q.explanation.trim());
        const isIncomplete = rawQ.length < 15 || PLACEHOLDER_REGEX.test(rawQ);
        const isIncorrect = !hasValidOptionsAndKey || !hasValidExplanation || isIncomplete;

        const hasSyntheticTag =
          SYNTHETIC_TAG_REGEX.test(rawQ) || LEGACY_STAGE_PREFIX_REGEX.test(rawQ);
        if (hasSyntheticTag) syntheticTaggedCount++;

        const expectedSlot = expectedDistribution.find(
          (s) => q.questionNumber >= s.startQ && q.questionNumber <= s.endQ
        );
        const hasSlotMismatch = !expectedSlot || expectedSlot.subjectId !== q.subjectId;
        const hasStageMismatch =
          mod.paper === 2 && !isCuratedCompleted && seenPaper1Stems.has(canonical);
        if (hasStageMismatch) stageMismatchCount++;

        const isOutOfSyllabusOrTagIssue =
          hasSyntheticTag || hasSlotMismatch || hasStageMismatch || !isCuratedCompleted;

        const firstSeenTag = seenCanonical.get(canonical);
        const isExactDup = Boolean(canonical && firstSeenTag);

        let isNearDup = false;
        let nearReason = '';
        if (!isExactDup) {
          const prevSkelTag =
            coreStem.length > 25 && /\d/.test(coreStem) ? seenSkeleton.get(skeleton) : undefined;
          if (prevSkelTag) {
            isNearDup = true;
            nearReason = `Numeric template clone of ${prevSkelTag}`;
          } else {
            const shingles = buildFourShingles(skeleton);
            if (shingles.size >= 4) {
              const candidateOverlaps = new Map<number, number>();
              for (const sh of shingles) {
                const posting = shingleBucket.get(sh);
                if (posting && posting.length < 30) {
                  for (const idx of posting) {
                    candidateOverlaps.set(idx, (candidateOverlaps.get(idx) || 0) + 1);
                  }
                }
              }
              for (const [candIdx, overlap] of candidateOverlaps) {
                if (overlap < 3) continue;
                const prevItem = shingleItems[candIdx];
                const sim = jaccardSimilarity(shingles, prevItem.shingles, overlap);
                if (sim >= 0.72) {
                  isNearDup = true;
                  nearReason = `High textual similarity (${Math.round(sim * 100)}%) with ${prevItem.tag}`;
                  break;
                }
              }

              const newIdx = shingleItems.length;
              shingleItems.push({ tag, shingles, moduleId: mod.moduleId });
              for (const sh of shingles) {
                let list = shingleBucket.get(sh);
                if (!list) {
                  list = [];
                  shingleBucket.set(sh, list);
                }
                list.push(newIdx);
              }
            }
          }
        }

        if (canonical && !seenCanonical.has(canonical)) {
          seenCanonical.set(canonical, tag);
        }
        if (mod.paper === 1 && canonical) {
          seenPaper1Stems.add(canonical);
        }
        if (coreStem.length > 25 && /\d/.test(coreStem) && !seenSkeleton.has(skeleton)) {
          seenSkeleton.set(skeleton, tag);
        }

        if (isExactDup) {
          exactDuplicatesCount++;
          modExactDup++;
          testExactDup++;
          if (firstSeenTag) {
            pushSample({
              moduleId: mod.moduleId,
              testNumber: testNum,
              questionNumber: q.questionNumber,
              subjectId: q.subjectId,
              issueType: 'EXACT_DUPLICATE',
              detail: `Exact stem match with ${firstSeenTag}`,
              questionSnippet: rawQ.slice(0, 110),
            });
          }
        } else if (isNearDup) {
          nearDuplicatesCount++;
          modNearDup++;
          testNearDup++;
          pushSample({
            moduleId: mod.moduleId,
            testNumber: testNum,
            questionNumber: q.questionNumber,
            subjectId: q.subjectId,
            issueType: 'NEAR_DUPLICATE',
            detail: nearReason,
            questionSnippet: rawQ.slice(0, 110),
          });
        }

        if (isIncorrect) {
          incorrectQuestionsDetected++;
          modIncorrect++;
          testIncorrect++;
          pushSample({
            moduleId: mod.moduleId,
            testNumber: testNum,
            questionNumber: q.questionNumber,
            subjectId: q.subjectId,
            issueType: 'INVALID_KEY_OR_OPTIONS',
            detail: 'Invalid options, colliding options, or missing explanation/answer key',
            questionSnippet: rawQ.slice(0, 110),
          });
        }

        if (hasSyntheticTag || hasSlotMismatch || hasStageMismatch) {
          outOfSyllabusQuestions++;
          modOutOfSyllabus++;
          if (hasStageMismatch && !isExactDup) {
            pushSample({
              moduleId: mod.moduleId,
              testNumber: testNum,
              questionNumber: q.questionNumber,
              subjectId: q.subjectId,
              issueType: 'OUT_OF_SYLLABUS_OR_STAGE',
              detail: 'Paper 2 slot reuses un-upgraded Paper 1 Primary concept',
              questionSnippet: rawQ.slice(0, 110),
            });
          }
        }

        // Strict primary reason bucket so counts stay mutually exclusive and non-inflated
        if (isIncorrect) {
          defectClassification.incorrectKeyOrOptionsOrMissing++;
        } else if (isExactDup) {
          defectClassification.exactDuplicates++;
        } else if (isNearDup) {
          defectClassification.nearDuplicatesOrClones++;
        } else if (hasStageMismatch || hasSlotMismatch) {
          defectClassification.stageOrSyllabusMismatchOnly++;
          testReviewOnly++;
        } else if (hasSyntheticTag || !isCuratedCompleted) {
          defectClassification.syntheticTagOnlyNeedsReview++;
          testReviewOnly++;
        } else {
          defectClassification.cleanVerified++;
        }

        const passedAllChecks =
          !isExactDup &&
          !isNearDup &&
          !isIncorrect &&
          !isOutOfSyllabusOrTagIssue &&
          testPatternOk;

        if (passedAllChecks) {
          questionsPassed++;
          modPassed++;
          testClean++;
          if (manifestTarget) {
            manifestTarget.canonicalStems.push(canonical);
            if (coreStem.length > 25 && /\d/.test(coreStem)) {
              manifestTarget.numericSkeletons.push(skeleton);
            }
          }
        }
      }

      if (testClean === 150) {
        verifiedCleanTests++;
      }

      // Assign GREEN / YELLOW / RED publication status per Mock Test
      let status: MockTestPublicationStatus;
      let reasonSummary: string;
      if (
        testClean === 150 &&
        testExactDup === 0 &&
        testNearDup === 0 &&
        testIncorrect === 0 &&
        testReviewOnly === 0 &&
        testPatternOk
      ) {
        status = 'GREEN';
        greenTestsCount++;
        modGreen++;
        reasonSummary = 'Verified clean (150/150 original syllabus-aligned questions)';
      } else if (testIncorrect === 0 && testExactDup === 0 && testNearDup === 0 && testPatternOk) {
        status = 'YELLOW';
        yellowTestsCount++;
        modYellow++;
        reasonSummary = `${testReviewOnly} items require manual/editorial review`;
      } else {
        status = 'RED';
        redTestsCount++;
        modRed++;
        const parts: string[] = [];
        if (testExactDup > 0) parts.push(`${testExactDup} exact dups`);
        if (testNearDup > 0) parts.push(`${testNearDup} clones`);
        if (testIncorrect > 0) parts.push(`${testIncorrect} key/option errors`);
        if (testReviewOnly > 0) parts.push(`${testReviewOnly} tagged/stage review`);
        if (!testPatternOk) parts.push('pattern mismatch');
        reasonSummary = parts.join(' · ') || 'Confirmed quality defects';
      }

      mockTestStatuses.push({
        key: `${mod.moduleId}_T${testNum}`,
        moduleId: mod.moduleId,
        moduleTitle: `${mod.examTitle} Paper ${mod.paper}`,
        testNumber: testNum,
        batchNumber: Math.ceil(testNum / 5),
        auditBatchNumber: Math.ceil(testNum / 10),
        status,
        readyForStudents: status === 'GREEN',
        totalQuestions: paperQs.length,
        cleanQuestions: testClean,
        exactDuplicates: testExactDup,
        nearDuplicates: testNearDup,
        incorrectQuestions: testIncorrect,
        reviewOnlyQuestions: testReviewOnly,
        patternOk: testPatternOk,
        reasonSummary,
      });
    }

    const modCuratedReplaced = TET_CTET_AUDIT_BATCHES.filter(
      (b) => b.moduleId === mod.moduleId && b.status === 'Completed'
    ).reduce(
      (sum, b) => sum + b.correctionSummary.reduce((s, c) => s + c.replacedCount, 0),
      0
    );

    const modNeedsReview = modAudited - modPassed;
    moduleBreakdown.push({
      moduleId: mod.moduleId,
      title: `${mod.examTitle} Paper ${mod.paper}`,
      exam: mod.exam,
      paper: mod.paper,
      totalMockTests: 50,
      totalQuestions: 7500,
      questionsAudited: modAudited,
      questionsPassed: modPassed,
      exactDuplicates: modExactDup,
      nearDuplicates: modNearDup,
      incorrectQuestions: modIncorrect,
      outOfSyllabusQuestions: modOutOfSyllabus,
      questionsReplaced: modCuratedReplaced,
      questionsRequiringManualReview: modNeedsReview,
      remainingQuestions: modNeedsReview,
      greenTests: modGreen,
      yellowTests: modYellow,
      redTests: modRed,
    });
  }

  let verifiedMediumsCheck: ConsolidatedTetCtetAuditReport['verifiedMediumsCheck'];
  if (includeMultiMediumVerification && auditMode === 'full') {
    let marathiPassed = 0;
    let hindiPassed = 0;
    let issuesFound = 0;
    for (const batch of TET_CTET_AUDIT_BATCHES.filter((b) => b.status === 'Completed')) {
      const modInfo = TET_CTET_MODULE_LIST.find((m) => m.moduleId === batch.moduleId);
      if (!modInfo) continue;
      for (const med of ['Marathi', 'Hindi'] as const) {
        const seenMed = new Set<string>();
        for (let t = batch.testStart; t <= batch.testEnd; t++) {
          const mQs = buildTetCtetMockPaper({
            exam: modInfo.exam,
            paper: modInfo.paper,
            testNumber: t,
            language1: modInfo.defaultL1,
            language2: modInfo.defaultL2,
            medium: med,
            customOverrides,
            rejectedIds,
          });
          for (const q of mQs) {
            const opts = q.options.map((o) => o.trim().toLowerCase());
            const bad =
              opts.length !== 4 ||
              new Set(opts).size !== 4 ||
              q.correctAnswer < 0 ||
              q.correctAnswer > 3 ||
              !q.explanation.trim() ||
              SYNTHETIC_TAG_REGEX.test(q.question.trim());
            let dup = false;
            if (q.subjectId !== 'LANGUAGE_1' && q.subjectId !== 'LANGUAGE_2') {
              const stem = canonicalAuditStem(q.question);
              if (seenMed.has(stem)) dup = true;
              seenMed.add(stem);
            }
            if (bad || dup) {
              issuesFound++;
            } else if (med === 'Marathi') {
              marathiPassed++;
            } else {
              hindiPassed++;
            }
          }
        }
      }
    }
    verifiedMediumsCheck = { marathiPassed, hindiPassed, issuesFound };
  }

  let practicePoolSummary: ConsolidatedTetCtetAuditReport['practicePoolSummary'];
  if (includePracticePools && auditMode === 'full') {
    let totalChecked = 0;
    let exactDuplicates = 0;
    let prefixTagged = 0;
    let invalidOptionsOrKeys = 0;
    const pSeen = new Set<string>();
    const poolTypes: Array<Exclude<TetCtetPoolType, 'MOCK'>> = [
      'SUBJECT_PRACTICE',
      'TOPIC_PRACTICE',
      'REVISION',
      'PYQ_PATTERN',
    ];
    for (const mod of TET_CTET_MODULE_LIST) {
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
          totalChecked++;
          const opts = pq.options.map((o) => o.trim().toLowerCase());
          if (
            pq.options.length !== 4 ||
            new Set(opts).size !== 4 ||
            pq.correctAnswer < 0 ||
            pq.correctAnswer > 3 ||
            !pq.explanation.trim()
          ) {
            invalidOptionsOrKeys++;
          }
          if (SYNTHETIC_TAG_REGEX.test(pq.question.trim())) prefixTagged++;
          const c = canonicalAuditStem(pq.question);
          if (pSeen.has(c)) exactDuplicates++;
          pSeen.add(c);
        }
      }
    }
    practicePoolSummary = { totalChecked, exactDuplicates, prefixTagged, invalidOptionsOrKeys };
  }

  let socialStudiesExtraChecked: ConsolidatedTetCtetAuditReport['socialStudiesExtraChecked'];
  if (includePaper2SocialStudies) {
    let totalSlots = 0;
    let invalidOptionsOrKeys = 0;
    let exactDuplicatesWithinP2Sst = 0;
    const sstStems = new Set<string>();
    const p2Mods = TET_CTET_MODULE_LIST.filter((m) => m.paper === 2);

    for (const mod of p2Mods) {
      for (let t = 1; t <= 50; t++) {
        const sstPaper = buildTetCtetMockPaper({
          exam: mod.exam,
          paper: 2,
          testNumber: t,
          language1: mod.defaultL1,
          language2: mod.defaultL2,
          medium: mod.supportedMediums[0],
          stream: 'SOCIAL_STUDIES' as TetCtetPaper2Stream,
          customOverrides,
          rejectedIds,
        });
        for (const q of sstPaper) {
          if (q.subjectId !== 'SOCIAL_STUDIES') continue;
          totalSlots++;
          const opts = q.options.map((o) => o.trim().toLowerCase());
          if (
            q.options.length !== 4 ||
            new Set(opts).size !== 4 ||
            q.correctAnswer < 0 ||
            q.correctAnswer > 3 ||
            !q.explanation.trim()
          ) {
            invalidOptionsOrKeys++;
          }
          const c = canonicalAuditStem(q.question);
          if (sstStems.has(c)) exactDuplicatesWithinP2Sst++;
          sstStems.add(c);
        }
      }
    }
    socialStudiesExtraChecked = {
      totalSlots,
      invalidOptionsOrKeys,
      exactDuplicatesWithinP2Sst,
    };
  }

  const adminCustomReplacementsCount = customOverrides.length + rejectedIds.length;
  const questionsReplaced =
    curatedBatchReplacementsCount + repairedMathKeyCount + adminCustomReplacementsCount;
  const duplicateQuestionsDetected = exactDuplicatesCount + nearDuplicatesCount;
  const questionsRequiringManualReview = questionsAudited - questionsPassed;
  const remainingQuestions = totalQuestions - questionsPassed;
  const generatedAt = new Date().toISOString();

  return {
    report: {
      generatedAt,
      auditMode,
      durationMs: Date.now() - tStart,
      totalMockTests,
      totalQuestions,
      questionsAudited,
      questionsPassed,
      duplicateQuestionsDetected,
      incorrectQuestionsDetected,
      outOfSyllabusQuestions,
      questionsReplaced,
      questionsRequiringManualReview,
      remainingQuestions,
      skippedVerifiedTests,
      skippedVerifiedQuestions,
      freshlyScannedTests,
      exactDuplicatesCount,
      nearDuplicatesCount,
      syntheticTaggedCount,
      stageMismatchCount,
      curatedBatchReplacementsCount,
      legacyMathRepairedCount: repairedMathKeyCount,
      adminCustomReplacementsCount,
      patternCompliantTests,
      verifiedCleanTests,
      defectClassification,
      publicationSummary: {
        greenTestsCount,
        yellowTestsCount,
        redTestsCount,
        testsReadyForPublication: greenTestsCount,
        testsNotReadyForPublication: yellowTestsCount + redTestsCount,
      },
      checkpoint: {
        backupArtifactDir: QA_BACKUP_ARTIFACT_DIR,
        completedBatches: completedBatchIds,
        nextResumeBatchId,
        lastSavedAt: generatedAt,
      },
      mockTestStatuses,
      verifiedMediumsCheck,
      practicePoolSummary,
      socialStudiesExtraChecked,
      moduleBreakdown,
      sampleFindings,
    },
    manifestEntries: Array.from(newManifestMap.values()),
  };
}
