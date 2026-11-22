export type TetCtetNoteExam = 'CTET' | 'MAHA_TET';

export type TetCtetNotePaper = 'PAPER_1' | 'PAPER_2';

export type TetCtetNoteLanguage = 'English' | 'Marathi' | 'Hindi';

export type TetCtetNoteSubjectId =
  | 'CDP'
  | 'LANGUAGE_1'
  | 'LANGUAGE_2'
  | 'MATHEMATICS'
  | 'EVS'
  | 'SCIENCE'
  | 'SOCIAL_STUDIES';

export interface TetCtetNoteMcq {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  topicReference: string;
}

export interface TetCtetNoteTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface TetCtetNoteThinker {
  name: string;
  contribution: string;
}

export interface TetCtetLocalizedNoteBody {
  documentTitle: string;
  unitTitle: string;
  topicTitle: string;
  subtopics: string[];
  introduction: string;
  meaningAndDefinition: string;
  detailedExplanation: string[];
  importantConcepts: string[];
  typesAndClassifications?: string[];
  comparisonTable?: TetCtetNoteTable;
  importantPrinciples?: string[];
  educationalTheories?: string[];
  keyThinkers?: TetCtetNoteThinker[];
  practicalExamples: string[];
  classroomApplications: string[];
  teachingMethods: string[];
  examSpecificFocus: {
    ctet: string;
    mahaTet: string;
  };
  importantExamPoints: string[];
  commonMistakes: string[];
  topicSummary: string;
  revisionPoints: string[];
  practiceQuestions: TetCtetNoteMcq[];
}

export interface TetCtetNoteTopicBlueprint {
  slug: string;
  unitNumber: number;
  topicNumber: number;
  subjectId: TetCtetNoteSubjectId;
  applicableExams: TetCtetNoteExam[];
  applicablePapers: TetCtetNotePaper[];
  syllabusSourceRef: {
    ctet: string;
    mahaTet: string;
  };
  content: Record<TetCtetNoteLanguage, TetCtetLocalizedNoteBody>;
}

export interface TetCtetStudyNoteDocument {
  id: string;
  fileReference: string;
  exam: TetCtetNoteExam;
  paper: TetCtetNotePaper;
  language: TetCtetNoteLanguage;
  subjectId: TetCtetNoteSubjectId;
  subjectName: string;
  unitNumber: number;
  unitTitle: string;
  topicNumber: number;
  topicTitle: string;
  documentTitle: string;
  syllabusSource: string;
  isPublished: boolean;
  isCustom?: boolean;
  updatedAt: string;
  body: TetCtetLocalizedNoteBody;
}

export interface TetCtetSubjectCatalogMeta {
  subjectId: TetCtetNoteSubjectId;
  marks: number;
  questions: number;
  streamGroup?: 'CORE' | 'MATH_SCIENCE' | 'SOCIAL_STUDIES';
  labels: Record<TetCtetNoteLanguage, string>;
  shortDesc: Record<TetCtetNoteLanguage, string>;
}
