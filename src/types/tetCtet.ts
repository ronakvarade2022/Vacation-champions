export type TetCtetExamType = 'MAHA_TET' | 'CTET';

export type TetCtetPaperNumber = 1 | 2;

export type TetCtetModuleId =
  | 'MAHA_TET_P1'
  | 'MAHA_TET_P2'
  | 'CTET_P1'
  | 'CTET_P2';

export type TetCtetPaper2Stream = 'MATH_SCIENCE' | 'SOCIAL_STUDIES';

export type TetCtetLanguage = 'English' | 'Marathi' | 'Hindi' | 'Urdu';

export type TetCtetMedium = 'English' | 'Marathi' | 'Hindi';

export type TetCtetSubjectId =
  | 'CDP'
  | 'LANGUAGE_1'
  | 'LANGUAGE_2'
  | 'MATHEMATICS'
  | 'EVS'
  | 'SCIENCE'
  | 'SOCIAL_STUDIES';

export type TetCtetPoolType =
  | 'MOCK'
  | 'SUBJECT_PRACTICE'
  | 'TOPIC_PRACTICE'
  | 'REVISION'
  | 'PYQ_PATTERN';

export type TetCtetQuestionPattern =
  | 'Conceptual'
  | 'Pedagogical'
  | 'Classroom Scenario'
  | 'Analytical'
  | 'Assertion-Reasoning'
  | 'Comprehension'
  | 'Grammar'
  | 'Problem Solving';

export type TetCtetQuestionStatus = 'approved' | 'pending' | 'rejected';

export interface TetCtetQuestion {
  id: string;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  moduleId: TetCtetModuleId;
  stream?: TetCtetPaper2Stream;
  poolType: TetCtetPoolType;
  testNumber?: number;
  batchNumber?: number;
  questionNumber: number;
  subjectId: TetCtetSubjectId;
  subjectLabel: string;
  topic: string;
  languageCode?: TetCtetLanguage;
  mediumRendered: TetCtetMedium | TetCtetLanguage;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Pedagogical HOTS';
  questionPattern: TetCtetQuestionPattern;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  marks: number; // Always 1 mark (+1 per correct, 0 negative)
  conceptSignature: string;
  normalizedHash: string;
  approvalStatus: TetCtetQuestionStatus;
  isCustomOverride?: boolean;
}

export interface TetCtetSubjectScoreEntry {
  subjectId: TetCtetSubjectId;
  label: string;
  correct: number;
  incorrect: number;
  unattempted: number;
  total: number;
  marks: number;
  maxMarks: number;
  percentage: number;
}

export interface TetCtetAttemptRecord {
  id: string;
  studentId: string;
  moduleId: TetCtetModuleId;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  mode: TetCtetPoolType;
  mockTestNumber?: number;
  practiceTitle?: string;
  stream?: TetCtetPaper2Stream;
  language1: TetCtetLanguage;
  language2: TetCtetLanguage;
  medium: TetCtetMedium;
  totalQuestions: number;
  maxMarks: number;
  marksObtained: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentage: number;
  accuracy: number;
  timeTakenSeconds: number;
  qualified: boolean;
  subjectBreakdown: Record<string, TetCtetSubjectScoreEntry>;
  weakSubjects: string[];
  strongSubjects: string[];
  answers: Record<number, number>;
  incorrectQuestionNumbers: number[];
  completedAt: string;
}

export interface TetCtetBatchStatusRecord {
  batchKey: string;
  moduleId: TetCtetModuleId;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  batchNumber: number;
  testRange: [number, number];
  totalTests: number;
  totalQuestions: number;
  generated: boolean;
  verified: boolean;
  approved: boolean;
  published: boolean;
  duplicateCount: number;
  updatedAt: string;
}

export interface TetCtetUserPreferences {
  mahaTetL1: TetCtetLanguage;
  mahaTetL2: TetCtetLanguage;
  mahaTetMedium: TetCtetMedium;
  ctetL1: TetCtetLanguage;
  ctetL2: TetCtetLanguage;
  ctetMedium: TetCtetMedium;
  paper2Stream: TetCtetPaper2Stream;
}

export interface TetCtetSyllabusUnit {
  id: string;
  subjectId: TetCtetSubjectId;
  subjectTitle: string;
  marks: number;
  questionCount: number;
  topics: string[];
  pedagogyFocus: string[];
  recommendedStrategy: string;
}

export interface TetCtetAuditReport {
  timestamp: string;
  totalModules: number;
  totalMockTests: number;
  questionsPerMockTest: number;
  totalMockQuestionPositions: number;
  practicePoolQuestionsVerified: number;
  uniqueConceptSignatures: number;
  exactDuplicatesFound: number;
  crossExamDuplicatesFound: number;
  crossPaperDuplicatesFound: number;
  mockVsPracticeDuplicatesFound: number;
  invalidOptionQuestions: number;
  verifiedBatchesCount: number;
  moduleProgress: Record<
    TetCtetModuleId,
    {
      verifiedTests: number;
      totalTests: number;
      approvedBatches: number;
      publishedTests: number;
    }
  >;
}
