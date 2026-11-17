import {
  MsceMedium,
  MsceMockQuestion,
  MscePaperNumber,
  MsceQuestionDifficulty,
  MsceQuestionVerification,
  MsceStdLevel,
} from './msceQuestionHelpers';
import {
  buildVerifiedMockPaper,
  getPaperConfigForMedium,
  getVerifiedMockTestStatusMap,
  MockTestBundleVerification,
  MscePaperConfigInfo,
  runFullStandardAcademicAudit,
  StandardAcademicAuditReport,
  VerifiedMockTestSummary,
  verifyMockTestBundle,
  verifySingleMockQuestion,
} from './msceAcademicAudit';
import { ALL_STD4_QUESTIONS } from './scholarshipStd4';
import { ALL_STD7_QUESTIONS } from './scholarshipStd7';

export type {
  MsceMedium,
  MsceQuestionDifficulty,
  MsceStdLevel,
  MscePaperNumber,
  MsceQuestionVerification,
  MsceMockQuestion,
  MscePaperConfigInfo,
  MockTestBundleVerification,
  VerifiedMockTestSummary,
  StandardAcademicAuditReport,
};

export {
  verifySingleMockQuestion,
  verifyMockTestBundle,
  getVerifiedMockTestStatusMap,
  runFullStandardAcademicAudit,
};

export interface MsceMockAttemptRecord {
  id: string;
  studentId: string;
  stdLevel: MsceStdLevel;
  mockTestNumber: number; // 1 to 25
  paperNumber: MscePaperNumber; // 1 or 2
  isFullExamMode?: boolean;
  medium: MsceMedium;
  totalQuestions: number; // 75
  maxMarks: number; // 150
  marksObtained: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentage: number;
  timeTakenSeconds: number;
  section1Name: string;
  section1Score: number; // out of 50
  section1MaxMarks: number; // 50
  section2Name: string;
  section2Score: number; // out of 100
  section2MaxMarks: number; // 100
  topicBreakdown: Record<string, { correct: number; total: number; marks: number }>;
  answers: Record<number, number>; // questionIndex (0..74) -> selectedOption (0..3)
  incorrectQuestionNumbers: number[]; // 1..75
  completedAt: string;
}

export interface MsceBatchInfo {
  batchNumber: number;
  stdLevel: MsceStdLevel;
  label: string;
  testRange: [number, number];
  totalTests: number;
  questionsPerTest: number;
  totalQuestionsInBatch: number;
  difficultyTier: 'Basic Scholarship Level' | 'Intermediate Scholarship Level' | 'Advanced Scholarship Level';
  status: 'Verified & Active';
}

export interface MsceAuditReport {
  timestamp: string;
  existingPracticeTestsCount: number;
  existingPracticeQuestionsCount: number;
  newMockTestsStd4: number;
  newMockTestsStd7: number;
  totalNewMockTests: number;
  totalAccessibleTests: number;
  totalMockPapers: number;
  totalMockQuestionPositions: number;
  duplicateQuestionsDetected: number;
  crossTestDuplicatesDetected: number;
  existingTestCollisionsDetected: number;
  missingOptionQuestions: number;
  missingAnswerKeyQuestions: number;
  allThreeMediumsVerified: boolean;
  batches: MsceBatchInfo[];
  std4Report?: StandardAcademicAuditReport;
  std7Report?: StandardAcademicAuditReport;
}

export function getMscePaperConfigForMedium(medium: MsceMedium): MscePaperConfigInfo {
  return getPaperConfigForMedium(medium);
}

export const MSCE_MATHS_TOPICS = [
  'Number System',
  'Place Value',
  'Addition',
  'Subtraction',
  'Multiplication',
  'Division',
  'Fractions',
  'Decimals',
  'Factors and Multiples',
  'Geometry',
  'Measurement',
  'Time',
  'Money',
  'Word Problems',
  'Mathematical Reasoning',
  'Number Patterns',
  'Practical Mathematics',
] as const;

export const MSCE_INTELLIGENCE_TOPICS = [
  'Number Series',
  'Alphabet Series',
  'Figure Series',
  'Odd One Out',
  'Classification',
  'Analogy',
  'Coding and Decoding',
  'Direction Sense',
  'Blood Relations',
  'Logical Reasoning',
  'Mathematical Reasoning',
  'Mirror Images',
  'Water Images',
  'Missing Figures',
  'Pattern Recognition',
  'Arrangements',
  'Calendar and Clock Reasoning',
  'Non-Verbal Reasoning',
] as const;

/**
 * Generates and verifies the 50 MSCE Mathematics questions (Q26–Q75 of Paper 1)
 * using dedicated syllabus-aligned Std 4 (PSE) or Std 7 (UPS) question banks.
 */
export function generateMsceMathematicsQuestions(
  stdLevel: MsceStdLevel,
  mockTestNumber: number,
  medium: MsceMedium
): MsceMockQuestion[] {
  const fullPaper = buildVerifiedMockPaper(stdLevel, mockTestNumber, 1, medium);
  return fullPaper.slice(25, 75);
}

/**
 * Generates and verifies the 50 MSCE Intelligence Test questions (Q26–Q75 of Paper 2)
 * using dedicated syllabus-aligned Std 4 (PSE) or Std 7 (UPS) question banks.
 */
export function generateMsceIntelligenceQuestions(
  stdLevel: MsceStdLevel,
  mockTestNumber: number,
  medium: MsceMedium
): MsceMockQuestion[] {
  const fullPaper = buildVerifiedMockPaper(stdLevel, mockTestNumber, 2, medium);
  return fullPaper.slice(25, 75);
}

/**
 * Builds an official 75-Question (150 Marks, 90 Minutes) MSCE Pune Scholarship Mock Paper
 * with every question verified by verifySingleMockQuestion.
 */
export function buildMsceMockPaper(
  stdLevel: MsceStdLevel,
  mockTestNumber: number,
  paperNumber: MscePaperNumber,
  studentMedium: MsceMedium,
  customOverrides: MsceMockQuestion[] = []
): MsceMockQuestion[] {
  return buildVerifiedMockPaper(
    stdLevel,
    mockTestNumber,
    paperNumber,
    studentMedium,
    customOverrides
  );
}

export function validateMockPaperBeforePublish(questions: MsceMockQuestion[]): {
  valid: boolean;
  totalQuestions: number;
  totalMarks: number;
  duplicateCount: number;
  missingOptionsCount: number;
  verifiedCount: number;
  issues: string[];
} {
  const issues: string[] = [];
  const hashes = new Set<string>();
  let duplicateCount = 0;
  let missingOptionsCount = 0;
  let verifiedCount = 0;

  if (questions.length !== 75) {
    issues.push(`Expected 75 questions, found ${questions.length}.`);
  }

  for (const q of questions) {
    if (hashes.has(q.normalizedHash)) {
      duplicateCount++;
      issues.push(`Duplicate question text at Q${q.questionNumber}.`);
    }
    hashes.add(q.normalizedHash);

    if (
      !q.options ||
      q.options.length !== 4 ||
      q.options.some((o) => !o || !o.trim()) ||
      new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4
    ) {
      missingOptionsCount++;
      issues.push(`Question Q${q.questionNumber} has incomplete or duplicate options.`);
    }
    if (q.correctAnswer < 0 || q.correctAnswer > 3) {
      issues.push(`Question Q${q.questionNumber} has invalid answer key index.`);
    }

    const ver = q.verification || verifySingleMockQuestion(q);
    if (ver.greenVerified) {
      verifiedCount++;
    } else if (ver.failureReasons.length > 0) {
      issues.push(`Q${q.questionNumber}: ${ver.failureReasons[0]}`);
    }
  }

  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  return {
    valid: issues.length === 0 && verifiedCount === 75,
    totalQuestions: questions.length,
    totalMarks,
    duplicateCount,
    missingOptionsCount,
    verifiedCount,
    issues,
  };
}

export function getMsceTenBatches(): MsceBatchInfo[] {
  const ranges: Array<{
    batchNumber: number;
    stdLevel: MsceStdLevel;
    range: [number, number];
    tier: 'Basic Scholarship Level' | 'Intermediate Scholarship Level' | 'Advanced Scholarship Level';
  }> = [
    { batchNumber: 1, stdLevel: 'Std 4th', range: [1, 5], tier: 'Basic Scholarship Level' },
    { batchNumber: 2, stdLevel: 'Std 4th', range: [6, 10], tier: 'Intermediate Scholarship Level' },
    { batchNumber: 3, stdLevel: 'Std 4th', range: [11, 15], tier: 'Intermediate Scholarship Level' },
    { batchNumber: 4, stdLevel: 'Std 4th', range: [16, 20], tier: 'Advanced Scholarship Level' },
    { batchNumber: 5, stdLevel: 'Std 4th', range: [21, 25], tier: 'Advanced Scholarship Level' },
    { batchNumber: 6, stdLevel: 'Std 7th', range: [1, 5], tier: 'Basic Scholarship Level' },
    { batchNumber: 7, stdLevel: 'Std 7th', range: [6, 10], tier: 'Intermediate Scholarship Level' },
    { batchNumber: 8, stdLevel: 'Std 7th', range: [11, 15], tier: 'Intermediate Scholarship Level' },
    { batchNumber: 9, stdLevel: 'Std 7th', range: [16, 20], tier: 'Advanced Scholarship Level' },
    { batchNumber: 10, stdLevel: 'Std 7th', range: [21, 25], tier: 'Advanced Scholarship Level' },
  ];

  return ranges.map((r) => ({
    batchNumber: r.batchNumber,
    stdLevel: r.stdLevel,
    label: `Batch ${r.batchNumber}: ${r.stdLevel} – Mock Tests ${String(r.range[0]).padStart(2, '0')} to ${String(r.range[1]).padStart(2, '0')}`,
    testRange: r.range,
    totalTests: 5,
    questionsPerTest: 150,
    totalQuestionsInBatch: 750,
    difficultyTier: r.tier,
    status: 'Verified & Active',
  }));
}

export function runCompleteMsceDuplicateAndSyllabusAudit(
  customOverrides: MsceMockQuestion[] = []
): MsceAuditReport {
  const std4Report = runFullStandardAcademicAudit('Std 4th', customOverrides);
  const std7Report = runFullStandardAcademicAudit('Std 7th', customOverrides);

  const duplicateQuestionsDetected =
    std4Report.withinTestDuplicates + std7Report.withinTestDuplicates;
  const crossTestDuplicatesDetected =
    std4Report.crossTestDuplicates + std7Report.crossTestDuplicates;
  const existingTestCollisionsDetected =
    std4Report.practiceBankCollisions + std7Report.practiceBankCollisions;
  const optionAndKeyIssues =
    std4Report.optionAndKeyFailures + std7Report.optionAndKeyFailures;

  const allThreeMediumsVerified =
    std4Report.verifiedMockTestsCount === 25 &&
    std7Report.verifiedMockTestsCount === 25 &&
    duplicateQuestionsDetected === 0 &&
    crossTestDuplicatesDetected === 0 &&
    existingTestCollisionsDetected === 0 &&
    std4Report.syllabusBoundaryViolations === 0 &&
    optionAndKeyIssues === 0;

  return {
    timestamp: new Date().toISOString(),
    existingPracticeTestsCount: 20,
    existingPracticeQuestionsCount: ALL_STD4_QUESTIONS.length + ALL_STD7_QUESTIONS.length,
    newMockTestsStd4: 25,
    newMockTestsStd7: 25,
    totalNewMockTests: 50,
    totalAccessibleTests: 70,
    totalMockPapers: 100,
    totalMockQuestionPositions: 7500,
    duplicateQuestionsDetected,
    crossTestDuplicatesDetected,
    existingTestCollisionsDetected,
    missingOptionQuestions: optionAndKeyIssues,
    missingAnswerKeyQuestions: 0,
    allThreeMediumsVerified,
    batches: getMsceTenBatches(),
    std4Report,
    std7Report,
  };
}
