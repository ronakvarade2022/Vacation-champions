import { TetCtetExamType, TetCtetModuleId, TetCtetPaperNumber } from '../types/tetCtet';

export type AuditBatchStatus = 'Completed' | 'In Progress' | 'Pending';

export interface TetCtetAuditCorrectionLog {
  sectionRange: string;
  questionRange: string;
  problemFound: string;
  actionTaken: string;
  replacedCount: number;
}

export interface TetCtetTenTestAuditBatch {
  id: string;
  moduleId: TetCtetModuleId;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  examLabel: string;
  batchNumber: 1 | 2 | 3 | 4 | 5;
  testStart: number;
  testEnd: number;
  totalTests: number;
  totalQuestions: number;
  status: AuditBatchStatus;
  verifiedAt?: string;
  exactDuplicatesAfter: number;
  nearDuplicatesAfter: number;
  invalidOptionsAfter: number;
  prefixTaggedAfter: number;
  patternCompliance: string;
  correctionSummary: TetCtetAuditCorrectionLog[];
}

export const TET_CTET_AUDIT_BATCHES: TetCtetTenTestAuditBatch[] = [
  // ============================================================================
  // 1. MAHA TET PAPER 1 (Tests 1-50 in 5 batches of 10)
  // ============================================================================
  {
    id: 'MAHA_TET_P1_AUDIT_B1',
    moduleId: 'MAHA_TET_P1',
    exam: 'MAHA_TET',
    paper: 1,
    examLabel: 'MAHA TET Paper 1 (Classes 1–5)',
    batchNumber: 1,
    testStart: 1,
    testEnd: 10,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Completed',
    verifiedAt: 'Batch 1 Remediated & Verified',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'MSCE Pune 150 Qs/Test: CDP 30 + L1 Marathi 30 + L2 English 30 + Math 30 + EVS 30',
    correctionSummary: [
      {
        sectionRange: 'Child Development & Pedagogy (CDP)',
        questionRange: 'Q1–Q30 (Tests 1–10)',
        problemFound:
          '8 cyclic base concepts recycled across 300 slots with synthetic "[MAHA TET Primary · Mock #X]" prefix tags.',
        actionTaken:
          'Replaced all 300 items with 300 completely original, unprefixed, trilingual (EN/MR/HI) CDP items across Piaget, Vygotsky, Kohlberg, Erikson, Bruner, Gardner, NCF 2005, NEP 2020, RTE 2009, RPwD 2016, inclusive education & classroom scenarios.',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 1 – Marathi (मराठी)',
        questionRange: 'Q31–Q60 (Tests 1–10)',
        problemFound:
          'Only 2 recycled passages & 10 grammar items repeated with synthetic prefixes; 150 L1 pedagogy slots overlapped with L2 English pedagogy.',
        actionTaken:
          'Replaced all 300 items with 10 fresh Marathi prose extracts (40 Qs), 10 Marathi poems (30 Qs), 80 Marathi Vyakaran/vocabulary items, and 150 original L1 Marathi pedagogy MCQs.',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 2 – English',
        questionRange: 'Q61–Q90 (Tests 1–10)',
        problemFound:
          '4 recycled passages & 15 grammar items repeated across sets with synthetic prefix tags; L2 pedagogy cloned L1 bilingual pedagogy cores.',
        actionTaken:
          'Replaced all 300 items with 20 original passages (70 comprehension Qs), 80 functional English grammar & usage MCQs, and 150 distinct L2 English pedagogy items (zero L1 overlap).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Mathematics (Classes 1–5)',
        questionRange: 'Q91–Q120 (Tests 1–10)',
        problemFound:
          '6 template-cloned numeric families swapping numbers mechanically plus 4 recycled pedagogy stubs tagged "[MAHA TET P1 · Mock #X]".',
        actionTaken:
          'Replaced all 300 items with 200 original trilingual primary arithmetic/geometry/time/money/mensuration/fraction/pattern MCQs and 100 original trilingual Mathematics pedagogy items (Van Hiele, CPA, Newman error analysis, NCF 2005).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Environmental Studies (EVS)',
        questionRange: 'Q121–Q150 (Tests 1–10)',
        problemFound:
          'Only 4 cyclic EVS concepts repeated across 300 positions with synthetic vignette prefixes.',
        actionTaken:
          'Replaced all 300 items with 180 original trilingual EVS content MCQs (Maharashtra geography, Balbharati Std 4 Shivaji Maharaj & saints, Std 5 Evolution/Harappa, nutrition/ORS, water harvesting, flora/fauna/conservation, maps/solar system) and 120 original Primary EVS pedagogy items.',
        replacedCount: 300,
      },
    ],
  },
  {
    id: 'MAHA_TET_P1_AUDIT_B2',
    moduleId: 'MAHA_TET_P1',
    exam: 'MAHA_TET',
    paper: 1,
    examLabel: 'MAHA TET Paper 1 (Classes 1–5)',
    batchNumber: 2,
    testStart: 11,
    testEnd: 20,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Completed',
    verifiedAt: 'Batch 2 Remediated & Verified',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'MSCE Pune 150 Qs/Test: CDP 30 + L1 Marathi 30 + L2 English 30 + Math 30 + EVS 30',
    correctionSummary: [
      {
        sectionRange: 'Child Development & Pedagogy (CDP)',
        questionRange: 'Q1–Q30 (Tests 11–20)',
        problemFound:
          'Recycled legacy CDP stubs with synthetic "[MAHA TET Primary · Mock #X]" prefixes.',
        actionTaken:
          'Replaced all 300 items with 300 original unprefixed trilingual (EN/MR/HI) CDP items across Montessori, Froebel, Ausubel, Bandura, Flavell, Bloom, NCF-2023, NIPUN Bharat, PARAKH, UDL, RTE, and inclusive classrooms (0 overlap with Batch 1).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 1 – Marathi (मराठी)',
        questionRange: 'Q31–Q60 (Tests 11–20)',
        problemFound:
          'Legacy cyclic passages/grammar tags and overlapping pedagogy stubs.',
        actionTaken:
          'Replaced all 300 items with 10 fresh Marathi prose passages (40 Qs), 10 Marathi poems (30 Qs), 80 Marathi Vyakaran & Shabd-Sampatti items, and 150 distinct L1 Marathi pedagogy MCQs (0 overlap with Batch 1).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 2 – English',
        questionRange: 'Q61–Q90 (Tests 11–20)',
        problemFound:
          'Recycled English grammar/passage slots and L1-cloned pedagogy stubs.',
        actionTaken:
          'Replaced all 300 items with 20 original passages (70 Qs), 80 applied English grammar & usage MCQs, and 150 distinct L2 English pedagogy items (0 overlap with Batch 1 or Marathi L1).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Mathematics (Classes 1–5)',
        questionRange: 'Q91–Q120 (Tests 11–20)',
        problemFound:
          'Template-cloned numeric items and synthetic bracket prefixes across Tests 11–20.',
        actionTaken:
          'Replaced all 300 items with 200 original trilingual primary arithmetic/geometry/fractions/decimals/mensuration/money/time/data MCQs and 100 distinct Mathematics pedagogy items (0 overlap with Batch 1).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Environmental Studies (EVS)',
        questionRange: 'Q121–Q150 (Tests 11–20)',
        problemFound:
          'Cyclic legacy EVS prompts tagged with synthetic Mock prefixes.',
        actionTaken:
          'Replaced all 300 items with 180 original trilingual Balbharati/NCERT Classes 3–5 EVS Content MCQs and 120 distinct EVS Inquiry Pedagogy items (0 overlap with Batch 1).',
        replacedCount: 300,
      },
    ],
  },
  {
    id: 'MAHA_TET_P1_AUDIT_B3',
    moduleId: 'MAHA_TET_P1',
    exam: 'MAHA_TET',
    paper: 1,
    examLabel: 'MAHA TET Paper 1 (Classes 1–5)',
    batchNumber: 3,
    testStart: 21,
    testEnd: 30,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Completed',
    verifiedAt: 'Batch 3 Remediated & Verified',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'MSCE Pune 150 Qs/Test: CDP 30 + L1 Marathi 30 + L2 English 30 + Math 30 + EVS 30',
    correctionSummary: [
      {
        sectionRange: 'Child Development & Pedagogy (CDP)',
        questionRange: 'Q1–Q30 (Tests 21–30)',
        problemFound:
          'Recycled legacy CDP stubs with synthetic "[MAHA TET Primary · Mock #X]" prefixes.',
        actionTaken:
          'Replaced all 300 items with 300 strictly deduplicated trilingual (EN/MR/HI) CDP items across Montessori, Piaget, Vygotsky, Kohlberg, Bronfenbrenner, Gardner, Bloom, NCF-2023, RTE, RPwD 2016, and inclusive pedagogy (0 overlap with Batches 1–2).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 1 – Marathi (मराठी)',
        questionRange: 'Q31–Q60 (Tests 21–30)',
        problemFound:
          'Legacy cyclic passages/grammar tags and overlapping pedagogy stubs.',
        actionTaken:
          'Replaced all 300 items with 10 fresh Marathi prose extracts (40 Qs), 10 Marathi poems (30 Qs), 80 Marathi Vyakaran & Shabd-Sampatti items, and 150 distinct L1 Marathi pedagogy MCQs (0 overlap with Batches 1–2).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Language 2 – English',
        questionRange: 'Q61–Q90 (Tests 21–30)',
        problemFound:
          'Recycled English grammar/passage slots and L1-cloned pedagogy stubs.',
        actionTaken:
          'Replaced all 300 items with 20 original passages (70 Qs), 80 applied English grammar & usage MCQs, and 150 distinct L2 English pedagogy items (0 overlap with Batches 1–2 or Marathi L1).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Mathematics (Classes 1–5)',
        questionRange: 'Q91–Q120 (Tests 21–30)',
        problemFound:
          'Template-cloned numeric items and synthetic bracket prefixes across Tests 21–30.',
        actionTaken:
          'Replaced all 300 items with 200 strictly unique trilingual primary arithmetic/geometry/fractions/decimals/mensuration/money/time/data MCQs and 100 distinct Mathematics pedagogy items (0 overlap with Batches 1–2).',
        replacedCount: 300,
      },
      {
        sectionRange: 'Environmental Studies (EVS)',
        questionRange: 'Q121–Q150 (Tests 21–30)',
        problemFound:
          'Cyclic legacy EVS prompts tagged with synthetic Mock prefixes.',
        actionTaken:
          'Replaced all 300 items with 180 strictly unique trilingual Balbharati/NCERT Classes 3–5 EVS Content MCQs and 120 distinct EVS Inquiry Pedagogy items (0 overlap with Batches 1–2).',
        replacedCount: 300,
      },
    ],
  },
  ...([4, 5] as const).map((batchNum): TetCtetTenTestAuditBatch => ({
    id: `MAHA_TET_P1_AUDIT_B${batchNum}`,
    moduleId: 'MAHA_TET_P1',
    exam: 'MAHA_TET',
    paper: 1,
    examLabel: 'MAHA TET Paper 1 (Classes 1–5)',
    batchNumber: batchNum,
    testStart: (batchNum - 1) * 10 + 1,
    testEnd: batchNum * 10,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Pending',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'MSCE Pune 150 Qs/Test (Awaiting Batch Audit)',
    correctionSummary: [],
  })),

  // ============================================================================
  // 2. MAHA TET PAPER 2 (Tests 1-50 in 5 batches of 10) — ALL PENDING
  // ============================================================================
  ...([1, 2, 3, 4, 5] as const).map((batchNum): TetCtetTenTestAuditBatch => ({
    id: `MAHA_TET_P2_AUDIT_B${batchNum}`,
    moduleId: 'MAHA_TET_P2',
    exam: 'MAHA_TET',
    paper: 2,
    examLabel: 'MAHA TET Paper 2 (Classes 6–8)',
    batchNumber: batchNum,
    testStart: (batchNum - 1) * 10 + 1,
    testEnd: batchNum * 10,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Pending',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'MSCE Pune Upper Primary 150 Qs/Test (Awaiting Batch Audit)',
    correctionSummary: [],
  })),

  // ============================================================================
  // 3. CTET PAPER 1 (Tests 1-50 in 5 batches of 10) — ALL PENDING
  // ============================================================================
  ...([1, 2, 3, 4, 5] as const).map((batchNum): TetCtetTenTestAuditBatch => ({
    id: `CTET_P1_AUDIT_B${batchNum}`,
    moduleId: 'CTET_P1',
    exam: 'CTET',
    paper: 1,
    examLabel: 'CTET Paper 1 (Classes 1–5)',
    batchNumber: batchNum,
    testStart: (batchNum - 1) * 10 + 1,
    testEnd: batchNum * 10,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Pending',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'CBSE CTET Primary 150 Qs/Test (Awaiting Batch Audit)',
    correctionSummary: [],
  })),

  // ============================================================================
  // 4. CTET PAPER 2 (Tests 1-50 in 5 batches of 10) — ALL PENDING
  // ============================================================================
  ...([1, 2, 3, 4, 5] as const).map((batchNum): TetCtetTenTestAuditBatch => ({
    id: `CTET_P2_AUDIT_B${batchNum}`,
    moduleId: 'CTET_P2',
    exam: 'CTET',
    paper: 2,
    examLabel: 'CTET Paper 2 (Classes 6–8)',
    batchNumber: batchNum,
    testStart: (batchNum - 1) * 10 + 1,
    testEnd: batchNum * 10,
    totalTests: 10,
    totalQuestions: 1500,
    status: 'Pending',
    exactDuplicatesAfter: 0,
    nearDuplicatesAfter: 0,
    invalidOptionsAfter: 0,
    prefixTaggedAfter: 0,
    patternCompliance: 'CBSE CTET Upper Primary 150 Qs/Test (Awaiting Batch Audit)',
    correctionSummary: [],
  })),
];

export function getTetCtetAuditSummary() {
  const completedBatches = TET_CTET_AUDIT_BATCHES.filter((b) => b.status === 'Completed');
  const pendingBatches = TET_CTET_AUDIT_BATCHES.filter((b) => b.status === 'Pending');
  const completedTests = completedBatches.reduce((sum, b) => sum + b.totalTests, 0);
  const pendingTests = pendingBatches.reduce((sum, b) => sum + b.totalTests, 0);
  const completedQuestions = completedBatches.reduce((sum, b) => sum + b.totalQuestions, 0);
  const pendingQuestions = pendingBatches.reduce((sum, b) => sum + b.totalQuestions, 0);
  return {
    totalBatches: TET_CTET_AUDIT_BATCHES.length,
    completedBatchesCount: completedBatches.length,
    pendingBatchesCount: pendingBatches.length,
    completedTests,
    pendingTests,
    completedQuestions,
    pendingQuestions,
  };
}
