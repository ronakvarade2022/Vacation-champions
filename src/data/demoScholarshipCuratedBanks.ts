// ============================================================================
// OFFICIAL MSCE PUNE SCHOLARSHIP EXAMINATION DEMO MOCK TEST QUESTION BANKS
// Syllabus Reference: https://mscepune.in/dtedola/scholarship_syllabusNew.aspx
//
// 1. Standard 4th – Primary Scholarship Examination (PSE):
//    - Paper 1 (90 Minutes, 75 Qs, 150 Marks):
//      Section A: English (First Language) — 25 Questions (50 Marks)
//      Section B: Mathematics — 50 Questions (100 Marks)
//    - Paper 2 (90 Minutes, 75 Qs, 150 Marks):
//      Section A: Marathi (Second Language) — 25 Questions (50 Marks)
//      Section B: Intelligence Test — 50 Questions (100 Marks)
//
// 2. Standard 7th – Upper Primary Scholarship Examination (UPS):
//    - Paper 1 (90 Minutes, 75 Qs, 150 Marks):
//      Section A: English (First Language) — 25 Questions (50 Marks)
//      Section B: Mathematics — 50 Questions (100 Marks)
//    - Paper 2 (90 Minutes, 75 Qs, 150 Marks):
//      Section A: Marathi (Second Language) — 25 Questions (50 Marks)
//      Section B: Intelligence Test — 50 Questions (100 Marks)
//
// Total Curated Questions: 300 Original, Non-Repeating Questions (75 × 4 Papers)
// ============================================================================

import { STD4_PAPER1_ENGLISH_25, STD4_PAPER1_MATH_50 } from './scholarshipDemoStd4Paper1';
import { STD4_PAPER2_MARATHI_25, STD4_PAPER2_INTELLIGENCE_50 } from './scholarshipDemoStd4Paper2';
import { STD7_PAPER1_ENGLISH_25, STD7_PAPER1_MATH_50 } from './scholarshipDemoStd7Paper1';
import { STD7_PAPER2_MARATHI_25, STD7_PAPER2_INTELLIGENCE_50 } from './scholarshipDemoStd7Paper2';

export interface CuratedScholarshipMcq {
  id: string;
  grade: 'CLASS_4' | 'CLASS_7';
  domain: 'LANGUAGE' | 'MATHEMATICS' | 'INTELLIGENCE';
  topic: string;
  questionType:
    | 'Conceptual'
    | 'Application-Based'
    | 'Passage-Based'
    | 'Numerical'
    | 'Logical-Reasoning'
    | 'Statement-Based'
    | 'Match-the-Following'
    | 'Assertion-Reasoning'
    | 'Diagram-Based';
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0..3
  explanation: string;
}

/**
 * Deterministically rotates the 4 options of each question so that correct answers
 * are balanced across A (0), B (1), C (2), and D (3) while keeping the exact
 * right option text mapped to `correctAnswer`.
 */
function balanceCorrectAnswerPositions(
  items: CuratedScholarshipMcq[],
  seedOffset: number
): CuratedScholarshipMcq[] {
  return items.map((item, idx) => {
    const targetPos = (idx + seedOffset) % 4;
    if (item.correctAnswer === targetPos) {
      return item;
    }
    const opts = [...item.options] as [string, string, string, string];
    const correctText = opts[item.correctAnswer];
    const targetText = opts[targetPos];
    opts[targetPos] = correctText;
    opts[item.correctAnswer] = targetText;
    return {
      ...item,
      options: opts,
      correctAnswer: targetPos
    };
  });
}

export const CURATED_STD4_PAPER1_ENGLISH_25: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD4_PAPER1_ENGLISH_25, 0);

export const CURATED_STD4_PAPER1_MATH_50: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD4_PAPER1_MATH_50, 1);

export const CURATED_STD4_PAPER2_MARATHI_25: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD4_PAPER2_MARATHI_25, 2);

export const CURATED_STD4_PAPER2_INTELLIGENCE_50: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD4_PAPER2_INTELLIGENCE_50, 3);

export const CURATED_STD7_PAPER1_ENGLISH_25: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD7_PAPER1_ENGLISH_25, 1);

export const CURATED_STD7_PAPER1_MATH_50: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD7_PAPER1_MATH_50, 2);

export const CURATED_STD7_PAPER2_MARATHI_25: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD7_PAPER2_MARATHI_25, 3);

export const CURATED_STD7_PAPER2_INTELLIGENCE_50: CuratedScholarshipMcq[] =
  balanceCorrectAnswerPositions(STD7_PAPER2_INTELLIGENCE_50, 0);

export interface ScholarshipValidationReport {
  isValid: boolean;
  totalQuestions: number;
  paperCounts: {
    std4Paper1: { english: number; math: number; total: number };
    std4Paper2: { marathi: number; intelligence: number; total: number };
    std7Paper1: { english: number; math: number; total: number };
    std7Paper2: { marathi: number; intelligence: number; total: number };
  };
  duplicateIds: string[];
  duplicateQuestions: string[];
  invalidOptionQuestions: string[];
}

/**
 * Validates that all 4 MSCE Pune Scholarship demo papers contain 75 unique
 * questions each (300 total) with zero duplicate question texts or IDs across
 * sections, papers, or standards.
 */
export function validateScholarshipDemoPapers(): ScholarshipValidationReport {
  const allBanks: CuratedScholarshipMcq[] = [
    ...CURATED_STD4_PAPER1_ENGLISH_25,
    ...CURATED_STD4_PAPER1_MATH_50,
    ...CURATED_STD4_PAPER2_MARATHI_25,
    ...CURATED_STD4_PAPER2_INTELLIGENCE_50,
    ...CURATED_STD7_PAPER1_ENGLISH_25,
    ...CURATED_STD7_PAPER1_MATH_50,
    ...CURATED_STD7_PAPER2_MARATHI_25,
    ...CURATED_STD7_PAPER2_INTELLIGENCE_50
  ];

  const seenIds = new Set<string>();
  const seenNormalizedQuestions = new Set<string>();
  const duplicateIds: string[] = [];
  const duplicateQuestions: string[] = [];
  const invalidOptionQuestions: string[] = [];

  for (const q of allBanks) {
    if (seenIds.has(q.id)) {
      duplicateIds.push(q.id);
    }
    seenIds.add(q.id);

    const norm = q.question.trim().toLowerCase().replace(/\s+/g, ' ');
    if (seenNormalizedQuestions.has(norm)) {
      duplicateQuestions.push(`${q.id}: ${q.question.slice(0, 60)}`);
    }
    seenNormalizedQuestions.add(norm);

    const uniqueOpts = new Set(q.options.map((o) => o.trim()));
    if (
      q.options.length !== 4 ||
      uniqueOpts.size !== 4 ||
      q.options.some((o) => !o || !o.trim()) ||
      typeof q.correctAnswer !== 'number' ||
      q.correctAnswer < 0 ||
      q.correctAnswer > 3
    ) {
      invalidOptionQuestions.push(q.id);
    }
  }

  const paperCounts = {
    std4Paper1: {
      english: CURATED_STD4_PAPER1_ENGLISH_25.length,
      math: CURATED_STD4_PAPER1_MATH_50.length,
      total: CURATED_STD4_PAPER1_ENGLISH_25.length + CURATED_STD4_PAPER1_MATH_50.length
    },
    std4Paper2: {
      marathi: CURATED_STD4_PAPER2_MARATHI_25.length,
      intelligence: CURATED_STD4_PAPER2_INTELLIGENCE_50.length,
      total: CURATED_STD4_PAPER2_MARATHI_25.length + CURATED_STD4_PAPER2_INTELLIGENCE_50.length
    },
    std7Paper1: {
      english: CURATED_STD7_PAPER1_ENGLISH_25.length,
      math: CURATED_STD7_PAPER1_MATH_50.length,
      total: CURATED_STD7_PAPER1_ENGLISH_25.length + CURATED_STD7_PAPER1_MATH_50.length
    },
    std7Paper2: {
      marathi: CURATED_STD7_PAPER2_MARATHI_25.length,
      intelligence: CURATED_STD7_PAPER2_INTELLIGENCE_50.length,
      total: CURATED_STD7_PAPER2_MARATHI_25.length + CURATED_STD7_PAPER2_INTELLIGENCE_50.length
    }
  };

  const isValid =
    allBanks.length === 300 &&
    paperCounts.std4Paper1.english === 25 &&
    paperCounts.std4Paper1.math === 50 &&
    paperCounts.std4Paper2.marathi === 25 &&
    paperCounts.std4Paper2.intelligence === 50 &&
    paperCounts.std7Paper1.english === 25 &&
    paperCounts.std7Paper1.math === 50 &&
    paperCounts.std7Paper2.marathi === 25 &&
    paperCounts.std7Paper2.intelligence === 50 &&
    duplicateIds.length === 0 &&
    duplicateQuestions.length === 0 &&
    invalidOptionQuestions.length === 0;

  return {
    isValid,
    totalQuestions: allBanks.length,
    paperCounts,
    duplicateIds,
    duplicateQuestions,
    invalidOptionQuestions
  };
}
