import {
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetModuleId,
  TetCtetSubjectId,
} from './tetCtet';

export type TetCtetReportCategory =
  | 'Incorrect Question'
  | 'Wrong Answer Key'
  | 'Incorrect Options'
  | 'Out of Syllabus'
  | 'Duplicate Question'
  | 'Spelling or Grammar Error'
  | 'Marathi/Hindi/English/Urdu Translation Error'
  | 'Question Not Displaying Properly'
  | 'Other';

export const TET_CTET_REPORT_CATEGORIES: TetCtetReportCategory[] = [
  'Incorrect Question',
  'Wrong Answer Key',
  'Incorrect Options',
  'Out of Syllabus',
  'Duplicate Question',
  'Spelling or Grammar Error',
  'Marathi/Hindi/English/Urdu Translation Error',
  'Question Not Displaying Properly',
  'Other',
];

export type TetCtetReportStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Confirmed'
  | 'Corrected'
  | 'Rejected';

export const TET_CTET_REPORT_STATUSES: TetCtetReportStatus[] = [
  'Submitted',
  'Under Review',
  'Confirmed',
  'Corrected',
  'Rejected',
];

export interface TetCtetReportHistoryEntry {
  status: TetCtetReportStatus;
  timestamp: string;
  actorName: string;
  actorRole: 'student' | 'admin';
  note?: string;
}

export interface TetCtetQuestionErrorReport {
  id: string;
  reportNumber: string; // e.g. QER-2026-1042
  studentId: string;
  studentName: string;
  mockTestId: string; // e.g. MAHA_TET_P1_MOCK_01
  testNumber: number; // 1..50 (or 0 for practice set)
  moduleId: TetCtetModuleId;
  moduleTitle: string;
  subjectId: TetCtetSubjectId;
  subject: string;
  questionId: string;
  questionNumber: number;
  originalQuestionText: string;
  originalOptions: [string, string, string, string];
  originalCorrectAnswer: number; // 0..3
  originalExplanation: string;
  selectedLanguage: TetCtetLanguage | TetCtetMedium | string;
  reportCategory: TetCtetReportCategory;
  studentExplanation: string;
  status: TetCtetReportStatus;
  createdAt: string;
  updatedAt: string;
  reviewedByAdmin?: string;
  reviewedAt?: string;
  adminRemarks?: string;
  proposedCorrectionId?: string;
  statusHistory: TetCtetReportHistoryEntry[];
}

export interface TetCtetProposedCorrectionValidation {
  isValid: boolean;
  hasValidStem: boolean;
  hasFourDistinctOptions: boolean;
  hasValidAnswerKey: boolean;
  hasValidExplanation: boolean;
  revalidatedLanguages: string[];
  issues: string[];
}

export interface TetCtetProposedCorrectionRecord {
  id: string;
  reportId: string;
  reportNumber: string;
  questionId: string;
  moduleId: TetCtetModuleId;
  testNumber: number;
  subjectId: TetCtetSubjectId;
  subject: string;
  selectedLanguage: string;
  // Immutable snapshot of original question (canonical question bank remains strictly READ-ONLY)
  originalQuestionSnapshot: {
    questionId: string;
    questionNumber: number;
    questionText: string;
    options: [string, string, string, string];
    correctAnswer: number;
    explanation: string;
    language: string;
  };
  // Proposed correction details
  proposedQuestionText: string;
  proposedOptions: [string, string, string, string];
  proposedCorrectAnswer: number;
  proposedExplanation: string;
  affectedLanguages: string[];
  correctionSummary: string;
  validation: TetCtetProposedCorrectionValidation;
  approvalStatus: 'PROPOSED_FOR_REVIEW' | 'ADMIN_APPROVED_CORRECTION';
  createdByAdmin: string;
  createdAt: string;
  approvedByAdmin?: string;
  approvedAt?: string;
}
