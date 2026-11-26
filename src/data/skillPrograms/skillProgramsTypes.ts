export type SkillProgramCategory =
  | 'Numbers & Speed Maths'
  | 'Language & Communication'
  | 'Mind Sports & Logic'
  | 'Coding, Art & Creativity'
  | 'Wellness, Olympiad & Life Skills';

export type SkillCourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SkillLessonModule {
  id: string;
  level: SkillCourseLevel;
  title: string;
  durationMinutes: number;
  objectives: string[];
  conceptExplanation: string[];
  workedExamples: Array<{
    prompt: string;
    steps: string[];
    finalAnswer: string;
  }>;
  practiceExercises: Array<{
    qNo: number;
    question: string;
    answer: string;
    hint?: string;
  }>;
}

export interface SkillProgramQuizQuestion {
  id: string;
  level: SkillCourseLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface SkillProgramSummary {
  id: string;
  number: number;
  title: string;
  category: SkillProgramCategory;
  ageGroup: string;
  durationWeeks: number;
  tagline: string;
  outcomes: string[];
  certificationRule: string;
  recommendedLinkedRoute?: 'drawing' | 'puzzles' | 'future-skills' | 'additional-curriculum' | 'scholarship';
}

export interface SkillProgramCurriculum {
  programId: string;
  part: 1 | 2;
  prerequisites: string;
  materialsNeeded: string[];
  modules: SkillLessonModule[];
  worksheetActivities: Array<{
    title: string;
    instructions: string;
    tasks: string[];
  }>;
  capstoneProject: {
    title: string;
    brief: string;
    rubric: string[];
  };
  quiz: SkillProgramQuizQuestion[];
}

export interface IndependentSkillEnrollment {
  id: string;
  userId: string;
  studentName: string;
  programId: string;
  programTitle: string;
  enrolledAt: string;
  completedModuleIds: string[];
  quizBestScore?: number;
  quizTotal?: number;
  projectSubmittedNote?: string;
  certificateIssuedAt?: string;
  certificateCode?: string;
}

export interface InstituteBatchRecord {
  id: string;
  instituteId: string;
  batchName: string;
  programId: string;
  trainerName: string;
  schedule: string;
  studentIds: string[];
}

export interface InstituteStudentRecord {
  id: string;
  instituteId: string;
  name: string;
  mobile: string;
  grade: string;
  programId: string;
  batchId: string;
  feeTotalInr: number;
  feePaidInr: number;
  attendancePresent: number;
  attendanceTotal: number;
  latestAssessmentScore?: string;
  parentNote?: string;
  certificateCode?: string;
}

export interface CoachingInstituteRecord {
  id: string;
  ownerUserId: string;
  instituteName: string;
  instituteType: 'Abacus & Vedic Maths Centre' | 'Coaching Class' | 'Skill Academy' | 'Multi-Program Institute';
  city: string;
  contactPhone: string;
  directorName: string;
  programIdsOffered: string[];
  createdAt: string;
  published: boolean;
}
