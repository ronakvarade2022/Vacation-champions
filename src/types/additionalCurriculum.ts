import type { ClassLevel, EducationBoard } from './index';
import type { InstructionMedium } from './lessonPlanner';

export const ADDITIONAL_CURRICULUM_LABEL = 'MY STUDYZONE ADDITIONAL CURRICULUM' as const;

export type AdditionalSubjectId =
  | 'ADD_GK'
  | 'ADD_LR'
  | 'ADD_ME'
  | 'ADD_CK'
  | 'ADD_VG'
  | 'ADD_DC'
  | 'ADD_EA'
  | 'ADD_LS'
  | 'ADD_GS'
  | 'ADD_FD';

export type AdditionalContentWorkflowStatus =
  | 'DRAFT'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'UNPUBLISHED';

export interface LocalizedTextMap {
  English: string;
  Marathi: string;
  Hindi: string;
}

export interface AdditionalSubjectDefinition {
  id: string;
  code: string;
  name: string;
  localizedNames: LocalizedTextMap;
  tagline: string;
  description: string;
  applicableBoards: EducationBoard[];
  applicableMediums: InstructionMedium[];
  classesCovered: ClassLevel[];
  accentColor: string;
  isPublished: boolean;
  isCustom?: boolean;
  /** Optional mapping from legacy non-standalone subject names to guide users cleanly */
  mapsFromNonStandaloneSubject?: string;
}

export interface AdditionalMcqQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'challenge';
}

export interface AdditionalShortAnswer {
  id: string;
  question: string;
  modelAnswer: string;
  marks: number;
}

export interface AdditionalWorksheetItem {
  id: string;
  type: 'fill_blank' | 'true_false' | 'application' | 'matching';
  prompt: string;
  answer: string;
}

export interface AdditionalPracticeWorksheet {
  worksheetId: string;
  title: string;
  estimatedMinutes: number;
  instructions: string;
  items: AdditionalWorksheetItem[];
}

export interface AdditionalTeacherGuidance {
  suggestedPeriods: number;
  classroomStrategy: string;
  differentiationTip: string;
  assessmentCue: string;
}

export interface AdditionalChapterMaterials {
  simpleExplanation: string;
  keyTakeaways: string[];
  workedExamples: Array<{ title: string; detail: string }>;
  handsOnActivity: {
    title: string;
    materialsNeeded: string[];
    steps: string[];
  };
  practiceWorksheet: AdditionalPracticeWorksheet;
  mcqQuiz: AdditionalMcqQuestion[];
  shortAnswerQuestions: AdditionalShortAnswer[];
  revisionExercises: string[];
  teacherGuidance: AdditionalTeacherGuidance;
}

export interface AdditionalChapterRecord {
  chapterId: string;
  subjectId: string;
  classLevel: ClassLevel;
  classNumber: number;
  chapterNumber: number;
  title: string;
  localizedTitles: LocalizedTextMap;
  applicableBoards: EducationBoard[];
  applicableMediums: InstructionMedium[];
  curriculumLabel: typeof ADDITIONAL_CURRICULUM_LABEL;
  workflowStatus: AdditionalContentWorkflowStatus;
  reviewedBy?: string;
  updatedAt: string;
  learningObjectives: string[];
  materials: AdditionalChapterMaterials;
  isCustom?: boolean;
}

export interface AdditionalCurriculumProgressRecord {
  studentId: string;
  chapterId: string;
  subjectId: string;
  classLevel: ClassLevel;
  board: EducationBoard;
  medium: InstructionMedium;
  notesCompleted: boolean;
  worksheetCompleted: boolean;
  quizCompleted: boolean;
  bestQuizScore: number;
  quizTotal: number;
  lastUpdatedAt: string;
}

export interface AdditionalTeacherAssignment {
  assignmentId: string;
  teacherId: string;
  teacherName: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  medium: InstructionMedium;
  division: string;
  subjectId: string;
  chapterId: string;
  chapterTitle: string;
  dueDate: string;
  teacherNote: string;
  assignedAt: string;
  status: 'ACTIVE' | 'COMPLETED';
}

export interface AdditionalCurriculumCompletionStats {
  totalSubjects: number;
  publishedSubjects: number;
  totalChapters: number;
  publishedChapters: number;
  approvedOrPublishedChapters: number;
  draftOrReviewChapters: number;
  totalWorksheets: number;
  totalMcqQuestions: number;
  totalShortAnswerQuestions: number;
  classesCoveredCount: number;
  bySubject: Record<
    string,
    {
      subjectId: string;
      subjectName: string;
      totalChapters: number;
      publishedChapters: number;
      mcqCount: number;
      worksheetCount: number;
      classesCompleted: number;
    }
  >;
}
