import { PlanSkuId } from '../types';
import { buildTetCtetMockPaper } from './tetCtetQuestionEngine';
import { buildMsceMockPaper } from './msceMockExamEngine';

export type DemoExamTypeId =
  | 'demo_tet'
  | 'demo_ctet'
  | 'demo_scholarship_4'
  | 'demo_scholarship_7';

export interface DemoExamSectionMeta {
  name: string;
  startQuestionNumber: number;
  endQuestionNumber: number;
  questionCount: number;
  marksPerQuestion: number;
  maxMarks: number;
}

export interface DemoExamConfig {
  id: DemoExamTypeId;
  title: string;
  shortTitle: string;
  targetAudience: 'teachers' | 'everyone';
  patternName: string;
  totalQuestions: number;
  marksPerQuestion: number;
  totalMarks: number;
  durationMinutes: number;
  durationSeconds: number;
  passingPercentage: number;
  recommendedPlanSku: PlanSkuId;
  recommendedPlanName: string;
  recommendedPlanPrice: number;
  description: string;
  instructions: string[];
  sections: DemoExamSectionMeta[];
}

export interface DemoExamQuestion {
  id: string;
  testId: DemoExamTypeId;
  questionNumber: number;
  section: string;
  subjectLabel: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0..3
  explanation: string;
  marks: number;
  topic?: string;
  isCustomAdminQuestion?: boolean;
}

export interface DemoExamAttemptRecord {
  id: string;
  testId: DemoExamTypeId;
  testTitle: string;
  studentId: string;
  studentName: string;
  studentRole: string;
  totalQuestions: number;
  maxMarks: number;
  marksObtained: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentage: number;
  passed: boolean;
  timeTakenSeconds: number;
  startedAt: string;
  completedAt: string;
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex
  markedForReview: Record<number, boolean>;
  sectionScores: Record<
    string,
    { correct: number; incorrect: number; unattempted: number; total: number; score: number; maxScore: number }
  >;
}

export const OFFICIAL_DEMO_EXAM_CONFIGS: Record<DemoExamTypeId, DemoExamConfig> = {
  demo_tet: {
    id: 'demo_tet',
    title: 'MAHA TET Paper 1 – Full-Length Demo Mock Examination',
    shortTitle: 'MAHA TET Demo (Paper 1)',
    targetAudience: 'teachers',
    patternName: 'MSCE MAHA TET Paper 1 (Primary Teachers – Classes 1 to 5)',
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60, // 9000 seconds = 2 hours 30 mins
    passingPercentage: 60,
    recommendedPlanSku: 'TET_1Y',
    recommendedPlanName: 'TET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'Official Maharashtra State Teacher Eligibility Test (MAHA TET) Paper 1 full-length demo mock paper with authentic questions spanning Child Development & Pedagogy, Marathi First Language, English Second Language, Mathematics, and Environmental Studies.',
    instructions: [
      'The test consists of 150 objective multiple-choice questions (MCQs) carrying 150 marks.',
      'Total duration of the examination is 150 minutes (2 Hours 30 Minutes).',
      'Each question carries 1 mark. There is NO negative marking for wrong answers.',
      'A real countdown timer runs continuously; the test will automatically submit when time expires.',
      'You can navigate questions using Previous, Next, or the Question Palette.',
      'You can Mark for Review any question and return to it anytime before submission.',
      'Once submitted, you will immediately see your detailed scorecard, percentage, and full explanations.'
    ],
    sections: [
      {
        name: 'Child Development & Pedagogy (बालविकास व अध्यापनशास्त्र)',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'First Language: Marathi (प्रथम भाषा: मराठी)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Second Language: English (द्वितीय भाषा: इंग्रजी)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Mathematics (गणित)',
        startQuestionNumber: 91,
        endQuestionNumber: 120,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Environmental Studies (परिसर अभ्यास)',
        startQuestionNumber: 121,
        endQuestionNumber: 150,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      }
    ]
  },

  demo_ctet: {
    id: 'demo_ctet',
    title: 'CTET Paper 1 – Full-Length CBT Demo Mock Examination',
    shortTitle: 'CTET Demo (Paper 1)',
    targetAudience: 'teachers',
    patternName: 'CBSE Central Teacher Eligibility Test (CTET) Paper 1 Pattern',
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60, // 9000 seconds = 2 hours 30 mins
    passingPercentage: 60,
    recommendedPlanSku: 'CTET_1Y',
    recommendedPlanName: 'CTET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'National CBSE CTET Paper 1 Computer-Based Test (CBT) full-length demo mock paper aligned with NEP 2020 pedagogical standards, experiential child psychology, and bilingual pedagogy.',
    instructions: [
      'The test consists of 150 objective multiple-choice questions (MCQs) for 150 marks.',
      'Total duration of the examination is 150 minutes (2 Hours 30 Minutes).',
      'Each correct answer earns 1 mark. There is NO negative marking in CTET.',
      'A real examination countdown timer tracks your time continuously.',
      'Use the question palette to jump across CDP, Languages, Mathematics, and EVS.',
      'You can Mark for Review to revisit questions before submitting.',
      'Full solution keys and explanations are displayed immediately on test completion.'
    ],
    sections: [
      {
        name: 'Child Development and Pedagogy (CDP)',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Language I (English Comprehension & Pedagogy)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Language II (Hindi Bhasha & Shikshan-Shastra)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Mathematics & Pedagogy',
        startQuestionNumber: 91,
        endQuestionNumber: 120,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      },
      {
        name: 'Environmental Studies (EVS)',
        startQuestionNumber: 121,
        endQuestionNumber: 150,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30
      }
    ]
  },

  demo_scholarship_4: {
    id: 'demo_scholarship_4',
    title: 'Class 4 MSCE Scholarship – Full-Length Demo Mock Examination',
    shortTitle: 'Class 4 Scholarship Demo (150 Marks)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Std 4th (PUP / PSE) Scholarship Pattern',
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60, // 5400 seconds = 1 hour 30 mins
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Class 4 Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Authentic Maharashtra State Council of Examinations (MSCE Pune) 4th Std Scholarship (Pre-Upper Primary) full mock test. Features 75 questions carrying 2 marks each for a total of 150 marks across First Language (Marathi) and Mathematics.',
    instructions: [
      'The examination contains exactly 75 questions carrying 2 marks each (Total 150 Marks).',
      'Section 1: First Language (Marathi) – 25 Questions (50 Marks).',
      'Section 2: Mathematics (गणित) – 50 Questions (100 Marks).',
      'Official examination duration is 90 minutes (1 Hour 30 Minutes).',
      'No negative marking: attempt all questions for maximum scoring.',
      'Timer starts when you begin and auto-submits when time expires.',
      'Instant result scorecard with step-by-step mathematical reasoning and solutions.'
    ],
    sections: [
      {
        name: 'Section 1: प्रथम भाषा (मराठी)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50
      },
      {
        name: 'Section 2: गणित (Mathematics)',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100
      }
    ]
  },

  demo_scholarship_7: {
    id: 'demo_scholarship_7',
    title: 'Class 7 MSCE Scholarship – Full-Length Demo Mock Examination',
    shortTitle: 'Class 7 Scholarship Demo (150 Marks)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Std 7th (UPS) Scholarship Pattern',
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60, // 5400 seconds = 1 hour 30 mins
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Class 7 Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Rigorous Maharashtra State Council of Examinations (MSCE Pune) 7th Std Scholarship (Upper Primary) full mock examination. Features 75 advanced questions carrying 2 marks each (Total 150 Marks) covering First Language and Higher-Order Mathematics.',
    instructions: [
      'The examination contains exactly 75 questions carrying 2 marks each (Total 150 Marks).',
      'Section 1: First Language (मराठी) – 25 Questions (50 Marks).',
      'Section 2: Mathematics (गणित) – 50 Questions (100 Marks).',
      'Official examination duration is 90 minutes (1 Hour 30 Minutes).',
      'No negative marking: attempt all 75 questions.',
      'Timer operates continuously with reload-protection.',
      'Detailed analytical solutions for each question provided immediately after submission.'
    ],
    sections: [
      {
        name: 'Section 1: प्रथम भाषा (मराठी)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50
      },
      {
        name: 'Section 2: गणित (Mathematics)',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100
      }
    ]
  }
};

let memoizedDefaultQuestions: Partial<Record<DemoExamTypeId, DemoExamQuestion[]>> = {};

/**
 * Builds the official 150-question or 75-question default question bank for a demo exam
 */
export function buildDefaultDemoExamQuestions(testId: DemoExamTypeId): DemoExamQuestion[] {
  if (memoizedDefaultQuestions[testId] && memoizedDefaultQuestions[testId]!.length > 0) {
    return memoizedDefaultQuestions[testId]!;
  }

  const config = OFFICIAL_DEMO_EXAM_CONFIGS[testId];
  const list: DemoExamQuestion[] = [];

  if (testId === 'demo_tet') {
    const rawQs = buildTetCtetMockPaper({
      exam: 'MAHA_TET',
      paper: 1,
      testNumber: 1,
      language1: 'Marathi',
      language2: 'English',
      medium: 'Marathi'
    });

    rawQs.slice(0, 150).forEach((q, idx) => {
      const qNum = idx + 1;
      const sec =
        config.sections.find((s) => qNum >= s.startQuestionNumber && qNum <= s.endQuestionNumber) ||
        config.sections[0];
      list.push({
        id: `demo_tet_q_${qNum}`,
        testId: 'demo_tet',
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: q.subjectLabel || sec.name,
        question: q.question,
        options: [q.options[0], q.options[1], q.options[2], q.options[3]],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `Correct answer is option (${q.correctAnswer + 1}).`,
        marks: 1,
        topic: q.topic
      });
    });
  } else if (testId === 'demo_ctet') {
    const rawQs = buildTetCtetMockPaper({
      exam: 'CTET',
      paper: 1,
      testNumber: 1,
      language1: 'English',
      language2: 'Hindi',
      medium: 'English'
    });

    rawQs.slice(0, 150).forEach((q, idx) => {
      const qNum = idx + 1;
      const sec =
        config.sections.find((s) => qNum >= s.startQuestionNumber && qNum <= s.endQuestionNumber) ||
        config.sections[0];
      list.push({
        id: `demo_ctet_q_${qNum}`,
        testId: 'demo_ctet',
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: q.subjectLabel || sec.name,
        question: q.question,
        options: [q.options[0], q.options[1], q.options[2], q.options[3]],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `Correct answer is option (${q.correctAnswer + 1}).`,
        marks: 1,
        topic: q.topic
      });
    });
  } else if (testId === 'demo_scholarship_4') {
    const rawQs = buildMsceMockPaper('Std 4th', 1, 1, 'Marathi');

    rawQs.slice(0, 75).forEach((q, idx) => {
      const qNum = idx + 1;
      const sec =
        config.sections.find((s) => qNum >= s.startQuestionNumber && qNum <= s.endQuestionNumber) ||
        config.sections[0];
      const qText = q.question;
      const opts = q.options;
      list.push({
        id: `demo_msce_4_q_${qNum}`,
        testId: 'demo_scholarship_4',
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: q.subjectLabel || sec.name,
        question: qText,
        options: [
          opts[0] || 'Option 1',
          opts[1] || 'Option 2',
          opts[2] || 'Option 3',
          opts[3] || 'Option 4'
        ],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `योग्य उत्तर पर्याय (${q.correctAnswer + 1}) आहे.`,
        marks: 2,
        topic: q.topic
      });
    });
  } else if (testId === 'demo_scholarship_7') {
    const rawQs = buildMsceMockPaper('Std 7th', 1, 1, 'Marathi');

    rawQs.slice(0, 75).forEach((q, idx) => {
      const qNum = idx + 1;
      const sec =
        config.sections.find((s) => qNum >= s.startQuestionNumber && qNum <= s.endQuestionNumber) ||
        config.sections[0];
      const qText = q.question;
      const opts = q.options;
      list.push({
        id: `demo_msce_7_q_${qNum}`,
        testId: 'demo_scholarship_7',
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: q.subjectLabel || sec.name,
        question: qText,
        options: [
          opts[0] || 'Option 1',
          opts[1] || 'Option 2',
          opts[2] || 'Option 3',
          opts[3] || 'Option 4'
        ],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `योग्य उत्तर पर्याय (${q.correctAnswer + 1}) आहे.`,
        marks: 2,
        topic: q.topic
      });
    });
  }

  memoizedDefaultQuestions[testId] = list;
  return list;
}
