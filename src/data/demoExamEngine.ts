import { PlanSkuId } from '../types';
import { buildTetCtetMockPaper } from './tetCtetQuestionEngine';
import {
  generateTetCtetLanguageQuestion,
  normalizeTetText,
  seededPermuteOptions,
} from './tetCtetLanguageBanks';
import {
  CURATED_STD4_PAPER1_ENGLISH_25,
  CURATED_STD4_PAPER1_MATH_50,
  CURATED_STD4_PAPER2_MARATHI_25,
  CURATED_STD4_PAPER2_INTELLIGENCE_50,
  CURATED_STD7_PAPER1_ENGLISH_25,
  CURATED_STD7_PAPER1_MATH_50,
  CURATED_STD7_PAPER2_MARATHI_25,
  CURATED_STD7_PAPER2_INTELLIGENCE_50,
  type CuratedScholarshipMcq,
} from './demoScholarshipCuratedBanks';

export type DemoExamTypeId =
  | 'demo_ctet'
  | 'demo_ctet_p2'
  | 'demo_tet'
  | 'demo_tet_p2'
  | 'demo_scholarship_4_p1'
  | 'demo_scholarship_4_p2'
  | 'demo_scholarship_7_p1'
  | 'demo_scholarship_7_p2';

export type DemoPaper2Stream = 'MATH_SCIENCE' | 'SOCIAL_STUDIES';

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
  paperNumber?: 1 | 2;
  supportsStreamSelection?: boolean;
  defaultStream?: DemoPaper2Stream;
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
  difficulty?: 'Easy' | 'Moderate' | 'Difficult';
  questionType?: string;
  conceptSignature?: string;
  isCustomAdminQuestion?: boolean;
}

export interface DemoExamAttemptRecord {
  id: string;
  testId: DemoExamTypeId;
  testTitle: string;
  paper2Stream?: DemoPaper2Stream;
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
  demo_ctet: {
    id: 'demo_ctet',
    title: 'CTET Paper I (Classes I to V) – Full-Length CBT Mock Examination',
    shortTitle: 'CTET Paper I (Classes I–V)',
    targetAudience: 'teachers',
    patternName: 'CBSE Central Teacher Eligibility Test (CTET) Paper I – Primary Stage (Classes I to V)',
    paperNumber: 1,
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60,
    passingPercentage: 60,
    recommendedPlanSku: 'CTET_1Y',
    recommendedPlanName: 'CTET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'Complete CBSE CTET Paper I (Classes I to V) 150-question English-medium mock test covering all 20 Child Development & Pedagogy syllabus topics, Language I, Language II, Mathematics, and Environmental Studies.',
    instructions: [
      'This examination consists of 150 objective multiple-choice questions (MCQs) carrying 150 marks.',
      'Total examination duration is 150 minutes (2 Hours 30 Minutes).',
      'All five official CTET Paper I sections carry 30 questions (30 marks) each.',
      'Each correct response awards 1 mark. There is NO negative marking for wrong answers.',
      'Child Development & Pedagogy covers all 20 prescribed educational psychology and pedagogy domains with balanced thinker representation.',
      'You may navigate freely across sections and use Mark for Review before final submission.',
      'Detailed answer keys, explanations, and section-wise diagnostic analytics are displayed immediately after submission.'
    ],
    sections: [
      {
        name: 'Child Development and Pedagogy',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language I (English Comprehension & Pedagogy)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language II (English Communication & Pedagogy)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Mathematics',
        startQuestionNumber: 91,
        endQuestionNumber: 120,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Environmental Studies',
        startQuestionNumber: 121,
        endQuestionNumber: 150,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
    ],
  },

  demo_ctet_p2: {
    id: 'demo_ctet_p2',
    title: 'CTET Paper II (Classes VI to VIII) – Full-Length CBT Mock Examination',
    shortTitle: 'CTET Paper II (Classes VI–VIII)',
    targetAudience: 'teachers',
    patternName: 'CBSE Central Teacher Eligibility Test (CTET) Paper II – Elementary Stage (Classes VI to VIII)',
    paperNumber: 2,
    supportsStreamSelection: true,
    defaultStream: 'MATH_SCIENCE',
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60,
    passingPercentage: 60,
    recommendedPlanSku: 'CTET_1Y',
    recommendedPlanName: 'CTET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'Complete CBSE CTET Paper II (Classes VI to VIII) 150-question English-medium mock test featuring balanced Adolescent Child Development & Pedagogy, Language I, Language II, and your chosen stream: Mathematics & Science (60 Qs) OR Social Studies/Social Science (60 Qs).',
    instructions: [
      'This examination consists of 150 objective multiple-choice questions (MCQs) carrying 150 marks.',
      'Total examination duration is 150 minutes (2 Hours 30 Minutes).',
      'Sections 1, 2, and 3 (Child Development & Pedagogy, Language I, Language II) are compulsory (30 questions each = 90 marks).',
      'Section 4 (Questions 91 to 150 = 60 marks) offers a choice between Mathematics & Science (30 Math + 30 Science) OR Social Studies / Social Science (60 questions).',
      'Each correct answer awards 1 mark. There is NO negative marking.',
      'Questions span Easy, Moderate, and Difficult cognitive levels including conceptual, pedagogical, and application-based problems.',
      'Complete explanations and performance breakdown are shown immediately after submission.'
    ],
    sections: [
      {
        name: 'Child Development and Pedagogy',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language I (English Comprehension & Pedagogy)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language II (English Communication & Pedagogy)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Mathematics and Science',
        startQuestionNumber: 91,
        endQuestionNumber: 150,
        questionCount: 60,
        marksPerQuestion: 1,
        maxMarks: 60,
      },
    ],
  },

  demo_tet: {
    id: 'demo_tet',
    title: 'MAHA TET Paper I (English Medium) – Classes I to V Mock Examination',
    shortTitle: 'TET Paper I – English Medium',
    targetAudience: 'teachers',
    patternName: 'MSCE Maharashtra TET Paper I (Primary Stage – Classes I to V, English Medium)',
    paperNumber: 1,
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60,
    passingPercentage: 60,
    recommendedPlanSku: 'TET_1Y',
    recommendedPlanName: 'TET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'Official MSCE Pune Maharashtra Teacher Eligibility Test (MAHA TET) Paper I (Classes I to V) 100% English-medium mock test covering Child Development & Pedagogy, Language I, Language II, Mathematics, and Environmental Studies.',
    instructions: [
      'The examination consists of 150 multiple-choice questions (MCQs) carrying 150 marks in complete English medium.',
      'Total examination duration is 150 minutes (2 Hours 30 Minutes).',
      'Each question carries 1 mark. There is NO negative marking.',
      'All five official MAHA TET Paper I sections (Child Development & Pedagogy, Language I, Language II, Mathematics, Environmental Studies) contain 30 questions each.',
      'All questions, answer options, instructions, and detailed explanations are presented strictly in English.',
      'Use the Question Palette to jump to any section or question and Mark for Review when needed.',
      'Instant scorecard and step-by-step pedagogical solutions are displayed upon submission.'
    ],
    sections: [
      {
        name: 'Child Development and Pedagogy',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language I (English Comprehension & Grammar)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language II (English Communication & Pedagogy)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Mathematics',
        startQuestionNumber: 91,
        endQuestionNumber: 120,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Environmental Studies',
        startQuestionNumber: 121,
        endQuestionNumber: 150,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
    ],
  },

  demo_tet_p2: {
    id: 'demo_tet_p2',
    title: 'MAHA TET Paper II (English Medium) – Classes VI to VIII Mock Examination',
    shortTitle: 'TET Paper II – English Medium',
    targetAudience: 'teachers',
    patternName: 'MSCE Maharashtra TET Paper II (Upper Primary Stage – Classes VI to VIII, English Medium)',
    paperNumber: 2,
    supportsStreamSelection: true,
    defaultStream: 'MATH_SCIENCE',
    totalQuestions: 150,
    marksPerQuestion: 1,
    totalMarks: 150,
    durationMinutes: 150,
    durationSeconds: 150 * 60,
    passingPercentage: 60,
    recommendedPlanSku: 'TET_1Y',
    recommendedPlanName: 'TET 1-Year Premium Plan',
    recommendedPlanPrice: 299,
    description:
      'Official MSCE Pune Maharashtra Teacher Eligibility Test (MAHA TET) Paper II (Classes VI to VIII) 100% English-medium mock test covering Child Development & Pedagogy, Language I, Language II, and Mathematics & Science OR Social Studies/Social Science.',
    instructions: [
      'The examination consists of 150 multiple-choice questions (MCQs) carrying 150 marks in complete English medium.',
      'Total duration of the examination is 150 minutes (2 Hours 30 Minutes).',
      'Sections 1, 2, and 3 (Child Development & Pedagogy, Language I, Language II) contain 30 questions each (90 marks total).',
      'Section 4 (Questions 91 to 150 = 60 marks) allows you to choose between Mathematics & Science (60 Qs) OR Social Studies / Social Science (60 Qs).',
      'Each question carries 1 mark with NO negative marking.',
      'All questions, options, and solutions are strictly in English medium.',
      'Instant section-wise score report and verified explanations are shown immediately after submission.'
    ],
    sections: [
      {
        name: 'Child Development and Pedagogy',
        startQuestionNumber: 1,
        endQuestionNumber: 30,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language I (English Comprehension & Grammar)',
        startQuestionNumber: 31,
        endQuestionNumber: 60,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Language II (English Communication & Pedagogy)',
        startQuestionNumber: 61,
        endQuestionNumber: 90,
        questionCount: 30,
        marksPerQuestion: 1,
        maxMarks: 30,
      },
      {
        name: 'Mathematics and Science',
        startQuestionNumber: 91,
        endQuestionNumber: 150,
        questionCount: 60,
        marksPerQuestion: 1,
        maxMarks: 60,
      },
    ],
  },

  demo_scholarship_4_p1: {
    id: 'demo_scholarship_4_p1',
    title: 'Standard 4th Scholarship Demo – Paper 1: English (First Language) & Mathematics',
    shortTitle: 'Std 4th Scholarship – Paper 1 (English + Mathematics)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Primary Scholarship Examination (PSE – Standard 4th) · Paper 1',
    paperNumber: 1,
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60,
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Standard 4th Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Official MSCE Pune Primary Scholarship Examination (PSE) Standard 4th Paper 1 full-length mock test: Section A – English (First Language, 25 Questions, 50 Marks) and Section B – Mathematics (50 Questions, 100 Marks). Duration: 90 Minutes.',
    instructions: [
      'This is Paper 1 of the MSCE Pune Standard 4th Primary Scholarship Examination (PSE).',
      'Total Questions: 75 Multiple-Choice Questions (MCQs) carrying 2 marks each (Total Marks: 150).',
      'Total Duration: 90 Minutes (1 Hour 30 Minutes). The countdown timer starts immediately upon beginning the test.',
      'Section A: English (First Language) – Questions 1 to 25 (25 Questions × 2 Marks = 50 Marks) covering Reading Comprehension, Vocabulary, Synonyms & Antonyms, Grammar, Sentence Formation, and Appropriate Word Selection.',
      'Section B: Mathematics – Questions 26 to 75 (50 Questions × 2 Marks = 100 Marks) covering Number Work, Arithmetic Operations, Fractions, Measurement, Time & Calendar, Money, Geometry, Perimeter & Area, Patterns, and Applied Word Problems.',
      'There is NO negative marking for wrong answers.',
      'Complete answer key, step-by-step explanations, and subject-wise score breakdown are displayed immediately upon submission.'
    ],
    sections: [
      {
        name: 'Section A: English (First Language)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50,
      },
      {
        name: 'Section B: Mathematics',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100,
      },
    ],
  },

  demo_scholarship_4_p2: {
    id: 'demo_scholarship_4_p2',
    title: 'Standard 4th Scholarship Demo – Paper 2: Marathi (Second Language) & Intelligence Test',
    shortTitle: 'Std 4th Scholarship – Paper 2 (Marathi + Intelligence Test)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Primary Scholarship Examination (PSE – Standard 4th) · Paper 2',
    paperNumber: 2,
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60,
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Standard 4th Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Official MSCE Pune Primary Scholarship Examination (PSE) Standard 4th Paper 2 full-length mock test: Section A – Marathi (Second Language, 25 Questions, 50 Marks) and Section B – Intelligence Test (50 Questions, 100 Marks). Duration: 90 Minutes.',
    instructions: [
      'This is Paper 2 of the MSCE Pune Standard 4th Primary Scholarship Examination (PSE).',
      'Total Questions: 75 Multiple-Choice Questions (MCQs) carrying 2 marks each (Total Marks: 150).',
      'Total Duration: 90 Minutes (1 Hour 30 Minutes). The countdown timer starts immediately upon beginning the test.',
      'Section A: Marathi (Second Language / तृतीय भाषा मराठी) – Questions 1 to 25 (25 Questions × 2 Marks = 50 Marks) in proper Marathi covering उतारा व कविता आकलन, शब्दसंपत्ती (समानार्थी, विरुद्धार्थी, जोडशब्द, पिल्लूदर्शक, घरदर्शक, समूहदर्शक शब्द), व्याकरण (नाम, सर्वनाम, विशेषण, क्रियापद, लिंग, वचन, काळ, विरामचिन्हे, शुद्धलेखन), वाक्प्रचार व म्हणी.',
      'Section B: Intelligence Test (बुद्धिमत्ता चाचणी) – Questions 26 to 75 (50 Questions × 2 Marks = 100 Marks) covering Comprehension, Classification (Odd One Out), Analogy, Number & Alphabet Series, Coding-Decoding, Direction & Calendar Reasoning, Mirror/Water Images, Counting Figures, and Logical Reasoning.',
      'There is NO negative marking for wrong answers.',
      'Complete answer key, step-by-step explanations, and subject-wise score breakdown are displayed immediately upon submission.'
    ],
    sections: [
      {
        name: 'Section A: Marathi (Second Language)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50,
      },
      {
        name: 'Section B: Intelligence Test',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100,
      },
    ],
  },

  demo_scholarship_7_p1: {
    id: 'demo_scholarship_7_p1',
    title: 'Standard 7th Scholarship Demo – Paper 1: English (First Language) & Mathematics',
    shortTitle: 'Std 7th Scholarship – Paper 1 (English + Mathematics)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Upper Primary Scholarship Examination (UPS – Standard 7th) · Paper 1',
    paperNumber: 1,
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60,
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Standard 7th Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Official MSCE Pune Upper Primary Scholarship Examination (UPS) Standard 7th Paper 1 full-length mock test: Section A – English (First Language, 25 Questions, 50 Marks) and Section B – Mathematics (50 Questions, 100 Marks). Duration: 90 Minutes.',
    instructions: [
      'This is Paper 1 of the MSCE Pune Standard 7th Upper Primary Scholarship Examination (UPS).',
      'Total Questions: 75 Multiple-Choice Questions (MCQs) carrying 2 marks each (Total Marks: 150).',
      'Total Duration: 90 Minutes (1 Hour 30 Minutes). The countdown timer starts immediately upon beginning the test.',
      'Section A: English (First Language) – Questions 1 to 25 (25 Questions × 2 Marks = 50 Marks) covering Reading Comprehension, Vocabulary, Synonyms & Antonyms, One-Word Substitution, Idioms & Proverbs, Grammar, Tenses, Active/Passive Voice, Direct/Indirect Speech, Degrees of Comparison, Clauses, and Sentence Correction.',
      'Section B: Mathematics – Questions 26 to 75 (50 Questions × 2 Marks = 100 Marks) covering Number System, HCF & LCM, Square Roots & Indices, Fractions & Decimals, Ratio & Proportion, Direct/Inverse Variation, Percentage, Profit & Loss, Simple Interest, Algebra, Geometry, Mensuration, and Data Interpretation.',
      'There is NO negative marking for wrong answers.',
      'Complete answer key, step-by-step explanations, and subject-wise score breakdown are displayed immediately upon submission.'
    ],
    sections: [
      {
        name: 'Section A: English (First Language)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50,
      },
      {
        name: 'Section B: Mathematics',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100,
      },
    ],
  },

  demo_scholarship_7_p2: {
    id: 'demo_scholarship_7_p2',
    title: 'Standard 7th Scholarship Demo – Paper 2: Marathi (Second Language) & Intelligence Test',
    shortTitle: 'Std 7th Scholarship – Paper 2 (Marathi + Intelligence Test)',
    targetAudience: 'everyone',
    patternName: 'MSCE Pune Upper Primary Scholarship Examination (UPS – Standard 7th) · Paper 2',
    paperNumber: 2,
    totalQuestions: 75,
    marksPerQuestion: 2,
    totalMarks: 150,
    durationMinutes: 90,
    durationSeconds: 90 * 60,
    passingPercentage: 40,
    recommendedPlanSku: 'BOARD_CLASS',
    recommendedPlanName: 'Standard 7th Annual Plan (Scholarship Included Free)',
    recommendedPlanPrice: 99,
    description:
      'Official MSCE Pune Upper Primary Scholarship Examination (UPS) Standard 7th Paper 2 full-length mock test: Section A – Marathi (Second Language, 25 Questions, 50 Marks) and Section B – Intelligence Test (50 Questions, 100 Marks). Duration: 90 Minutes.',
    instructions: [
      'This is Paper 2 of the MSCE Pune Standard 7th Upper Primary Scholarship Examination (UPS).',
      'Total Questions: 75 Multiple-Choice Questions (MCQs) carrying 2 marks each (Total Marks: 150).',
      'Total Duration: 90 Minutes (1 Hour 30 Minutes). The countdown timer starts immediately upon beginning the test.',
      'Section A: Marathi (Second Language / तृतीय भाषा मराठी) – Questions 1 to 25 (25 Questions × 2 Marks = 50 Marks) in proper Marathi covering उतारा व पद्य आकलन, शब्दसंपत्ती (समानार्थी, विरुद्धार्थी, अलंकारिक शब्द, शब्दसमूहाबद्दल एक शब्द, वाक्प्रचार व म्हणी), व्याकरण (शब्दांच्या जाती, विभक्ती, काळ, प्रयोग, समास, संधी, विरामचिन्हे, शुद्धलेखन) व मराठी साहित्य.',
      'Section B: Intelligence Test (बुद्धिमत्ता चाचणी) – Questions 26 to 75 (50 Questions × 2 Marks = 100 Marks) covering Advanced Number & Alphanumeric Series, Classification, Analogy, Coding & Decoding, Mathematical Operations, Number Matrices, Direction & Pythagoras Distance, Blood Relations, Ranking & Sitting Arrangement, Clock & Calendar Reasoning, Syllogisms, Venn Diagrams, Mirror/Water Images, Counting Figures, and 3D Cube/Dice Reasoning.',
      'There is NO negative marking for wrong answers.',
      'Complete answer key, step-by-step explanations, and subject-wise score breakdown are displayed immediately upon submission.'
    ],
    sections: [
      {
        name: 'Section A: Marathi (Second Language)',
        startQuestionNumber: 1,
        endQuestionNumber: 25,
        questionCount: 25,
        marksPerQuestion: 2,
        maxMarks: 50,
      },
      {
        name: 'Section B: Intelligence Test',
        startQuestionNumber: 26,
        endQuestionNumber: 75,
        questionCount: 50,
        marksPerQuestion: 2,
        maxMarks: 100,
      },
    ],
  },
};

export function getDemoExamConfigForStream(
  testId: DemoExamTypeId,
  stream: DemoPaper2Stream = 'MATH_SCIENCE'
): DemoExamConfig {
  const base = OFFICIAL_DEMO_EXAM_CONFIGS[testId];
  if (!base.supportsStreamSelection) {
    return base;
  }
  const streamSectionName =
    stream === 'SOCIAL_STUDIES'
      ? 'Social Studies / Social Science'
      : 'Mathematics and Science';
  return {
    ...base,
    sections: base.sections.map((sec, idx) =>
      idx === 3
        ? {
            ...sec,
            name: streamSectionName,
          }
        : sec
    ),
  };
}

/**
 * The 20 mandatory Child Development & Pedagogy (CDP) syllabus categories required by the user.
 * Ensures every 30-question CDP section covers all 20 categories and caps Vygotsky at <= 2 questions.
 */
export const MANDATORY_CDP_20_TOPICS: readonly string[] = [
  'Child growth and development',
  'Principles of child development',
  "Piaget's theory",
  "Vygotsky's theory",
  "Kohlberg's theory",
  'Intelligence and individual differences',
  'Learning theories',
  'Constructivism',
  'Inclusive education',
  'Children with special needs',
  'Learning difficulties',
  'Motivation',
  'Memory and forgetting',
  'Attention and perception',
  'Assessment and evaluation',
  'Classroom teaching strategies',
  'Child-centred education',
  'Critical thinking',
  'Educational psychology',
  'Pedagogical approaches',
];

/**
 * Categorizes any CDP question into one of the 20 mandatory syllabus topics
 */
export function classifyCdpTopicToMandatory20(questionText: string, rawTopic = ''): string {
  if ((MANDATORY_CDP_20_TOPICS as readonly string[]).includes(rawTopic)) {
    return rawTopic;
  }
  const combined = `${rawTopic} ${questionText}`.toLowerCase();
  if (combined.includes('vygotsky') || combined.includes('zpd') || combined.includes('zone of proximal') || combined.includes('scaffolding') || combined.includes('private speech')) {
    return "Vygotsky's theory";
  }
  if (combined.includes('piaget') || combined.includes('pre-operational') || combined.includes('preoperational') || combined.includes('concrete operational') || combined.includes('sensorimotor') || combined.includes('object permanence') || combined.includes('assimilation') || combined.includes('conservation')) {
    return "Piaget's theory";
  }
  if (combined.includes('kohlberg') || combined.includes('moral dilemma') || combined.includes('heinz') || combined.includes('pre-conventional') || combined.includes('post-conventional') || combined.includes('moral development')) {
    return "Kohlberg's theory";
  }
  if (combined.includes('dyslexia') || combined.includes('dyscalculia') || combined.includes('dysgraphia') || combined.includes('dyspraxia') || combined.includes('learning disabilit') || combined.includes('learning difficult') || combined.includes('adhd')) {
    return 'Learning difficulties';
  }
  if (combined.includes('braille') || combined.includes('hearing') || combined.includes('visually') || combined.includes('orthopedic') || combined.includes('cwsn') || combined.includes('rpwd') || combined.includes('special needs') || combined.includes('autism') || combined.includes('assistive')) {
    return 'Children with special needs';
  }
  if (combined.includes('inclusive') || combined.includes('udl') || combined.includes('universal design') || combined.includes('equity') || combined.includes('stereotype') || combined.includes('marginalized') || combined.includes('first-generation')) {
    return 'Inclusive education';
  }
  if (combined.includes('cephalocaudal') || combined.includes('proximodistal') || combined.includes('spiral') || combined.includes('principle') || combined.includes('heredity and environment')) {
    return 'Principles of child development';
  }
  if (combined.includes('growth') || combined.includes('maturation') || combined.includes('infancy') || combined.includes('adolescen') || combined.includes('motor skill') || combined.includes('developmental milestone')) {
    return 'Child growth and development';
  }
  if (combined.includes('gardner') || combined.includes('iq') || combined.includes('intelligence') || combined.includes('sternberg') || combined.includes('spearman') || combined.includes('individual difference')) {
    return 'Intelligence and individual differences';
  }
  if (combined.includes('bandura') || combined.includes('pavlov') || combined.includes('skinner') || combined.includes('thorndike') || combined.includes('conditioning') || combined.includes('reinforcement') || combined.includes('trial and error') || combined.includes('insight learning')) {
    return 'Learning theories';
  }
  if (combined.includes('constructivis') || combined.includes('bruner') || combined.includes('discovery learning') || combined.includes('spiral curriculum') || combined.includes('active meaning')) {
    return 'Constructivism';
  }
  if (combined.includes('motivation') || combined.includes('intrinsic') || combined.includes('extrinsic') || combined.includes('maslow') || combined.includes('mastery orientation') || combined.includes('self-efficacy')) {
    return 'Motivation';
  }
  if (combined.includes('memory') || combined.includes('forgetting') || combined.includes('chunking') || combined.includes('episodic') || combined.includes('working memory') || combined.includes('retrieval') || combined.includes('interference')) {
    return 'Memory and forgetting';
  }
  if (combined.includes('attention') || combined.includes('perception') || combined.includes('gestalt') || combined.includes('sensory register') || combined.includes('selective attention')) {
    return 'Attention and perception';
  }
  if (combined.includes('assessment') || combined.includes('evaluation') || combined.includes('formative') || combined.includes('summative') || combined.includes('cce') || combined.includes('portfolio') || combined.includes('rubric') || combined.includes('diagnostic') || combined.includes('parakh')) {
    return 'Assessment and evaluation';
  }
  if (combined.includes('child-centred') || combined.includes('child-centered') || combined.includes('progressive education') || combined.includes('john dewey') || combined.includes('montessori') || combined.includes('play-way')) {
    return 'Child-centred education';
  }
  if (combined.includes('critical thinking') || combined.includes('divergent') || combined.includes('creativ') || combined.includes('metacognit') || combined.includes('problem-solving') || combined.includes('bloom')) {
    return 'Critical thinking';
  }
  if (combined.includes('strategy') || combined.includes('lesson plan') || combined.includes('micro-teaching') || combined.includes('cooperative learning') || combined.includes('jigsaw') || combined.includes('think-pair-share') || combined.includes('classroom management')) {
    return 'Classroom teaching strategies';
  }
  if (combined.includes('erikson') || combined.includes('emotional') || combined.includes('socialization') || combined.includes('bronfenbrenner') || combined.includes('attachment') || combined.includes('bowlby') || combined.includes('psychology')) {
    return 'Educational psychology';
  }
  return 'Pedagogical approaches';
}

/**
 * Curated supplemental CDP questions covering all 20 mandatory topics
 */
const SUPPLEMENTAL_BALANCED_CDP_BANK: Array<{
  mandatoryTopic: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  questionType: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
}> = [
  {
    mandatoryTopic: "Piaget's theory",
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'According to Jean Piaget, when a child modifies an existing cognitive schema to incorporate a novel experience that does not fit prior categories, the process is termed:',
    options: [
      'Accommodation',
      'Mechanical habituation',
      'Centration',
      'Operant extinction',
    ],
    correctAnswer: 0,
    explanation:
      'In Piagetian theory, Accommodation is the restructuring of existing schemas to fit new information, whereas Assimilation fits new experiences into existing schemas.',
  },
  {
    mandatoryTopic: "Vygotsky's theory",
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'In Lev Vygotsky’s sociocultural theory, young children talking aloud to guide their own actions while assembling a puzzle are engaging in:',
    options: [
      'Private speech, which serves as an instrument for self-regulation and planning',
      'Cognitive egocentrism that delays intellectual growth',
      'Unconditioned vocal reflexes without meaning',
      'Sensory habituation',
    ],
    correctAnswer: 0,
    explanation:
      'Vygotsky viewed private speech as a vital transitional step toward internalized verbal thought and self-regulation.',
  },
  {
    mandatoryTopic: "Kohlberg's theory",
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'At which stage of Lawrence Kohlberg’s moral development does an individual judge the morality of an action by universal human rights and ethical conscience, even when it conflicts with statutory law?',
    options: [
      'Stage 6: Universal Ethical Principles Orientation (Post-conventional Level)',
      'Stage 1: Obedience and Punishment Orientation (Pre-conventional Level)',
      'Stage 2: Instrumental Exchange Orientation',
      'Stage 3: Good Boy / Nice Girl Interpersonal Accord',
    ],
    correctAnswer: 0,
    explanation:
      'Post-conventional Stage 6 reasoning relies on self-chosen universal principles of justice, human dignity, and reciprocity.',
  },
  {
    mandatoryTopic: 'Inclusive education',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'Universal Design for Learning (UDL) promotes inclusive education across diverse classrooms primarily by offering:',
    options: [
      'Multiple means of engagement, representation, and action/expression tailored to varied learner needs',
      'A single rigid textbook and identical timed written test for every child',
      'Permanent segregation of first-generation learners into separate buildings',
      'Standardized lecture-only delivery without visual or tactile aids',
    ],
    correctAnswer: 0,
    explanation:
      'UDL removes curriculum barriers proactively by providing multiple means of representation, engagement, and expression.',
  },
  {
    mandatoryTopic: 'Intelligence and individual differences',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'According to Howard Gardner’s Theory of Multiple Intelligences, a botanist or environmental conservationist who excels at recognizing and classifying flora and fauna demonstrates high:',
    options: [
      'Naturalistic Intelligence',
      'Intrapersonal Intelligence',
      'Musical-Rhythmic Intelligence',
      'Existential-Motor Reflex',
    ],
    correctAnswer: 0,
    explanation:
      'Naturalistic intelligence involves sensitivity to the natural world and the ability to classify species and ecological patterns.',
  },
  {
    mandatoryTopic: 'Memory and forgetting',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'When a student learns a new telephone number and consequently struggles to recall an older telephone number, which psychological mechanism of forgetting is operating?',
    options: [
      'Retroactive interference, where newly acquired information disrupts retrieval of older memory traces',
      'Proactive facilitation of sensory registers',
      'Sensorimotor object permanence decay',
      'Classical extinction of unconditioned reflexes',
    ],
    correctAnswer: 0,
    explanation:
      'In retroactive interference, new learning works backward to interfere with the recall of previously stored memories.',
  },
  {
    mandatoryTopic: 'Memory and forgetting',
    difficulty: 'Easy',
    questionType: 'Application-Based',
    question:
      'Grouping a 12-digit historical timeline into three meaningful 4-digit year blocks (e.g., 1857–1905–1947) to expand working-memory capacity is known as:',
    options: [
      'Chunking (Miller’s information-processing strategy)',
      'Rote mechanical conditioning',
      'Proactive inhibition',
      'Perceptual constancy',
    ],
    correctAnswer: 0,
    explanation:
      'George Miller demonstrated that chunking individual items into meaningful units significantly enhances short-term / working memory retention.',
  },
  {
    mandatoryTopic: 'Attention and perception',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'When learners automatically perceive a dashed triangle on the blackboard as a complete closed triangle rather than disconnected line segments, which Gestalt principle of perception is illustrated?',
    options: [
      'Law of Closure',
      'Binocular retinal disparity',
      'Operant shaping',
      'Habituation of auditory reflexes',
    ],
    correctAnswer: 0,
    explanation:
      'The Gestalt Law of Closure states that human perception tends to fill in missing gaps to perceive complete, whole figures.',
  },
  {
    mandatoryTopic: 'Attention and perception',
    difficulty: 'Easy',
    questionType: 'Classroom Scenario',
    question:
      'During a noisy science fair, a student focuses intently on her teammate’s explanation while filtering out surrounding chatter. This cognitive process is called:',
    options: [
      'Selective attention (the cocktail-party phenomenon)',
      'Divided automaticity failure',
      'Sensory deprivation',
      'Retrograde amnesia',
    ],
    correctAnswer: 0,
    explanation:
      'Selective attention enables a learner to direct cognitive resources toward one relevant stimulus while inhibiting competing background distractions.',
  },
  {
    mandatoryTopic: 'Learning theories',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'According to Albert Bandura’s Social Cognitive Learning Theory, which four sequential processes govern observational learning?',
    options: [
      'Attention → Retention → Motor Reproduction → Motivational Reinforcement',
      'Stimulus → Reflex → Extinction → Spontaneous Recovery',
      'Assimilation → Equilibrium → Conservation → Animism',
      'Readiness → Exercise → Effect → Recency',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura identified Attention, Retention, Production (Motor Reproduction), and Motivation as the four subprocesses of observational modeling.',
  },
  {
    mandatoryTopic: 'Learning theories',
    difficulty: 'Easy',
    questionType: 'Conceptual',
    question:
      'Edward Thorndike’s Law of Effect states that connections between a stimulus and a response are strengthened when followed by:',
    options: [
      'A satisfying state of affairs (positive outcome)',
      'An aversive or annoying confusion',
      'Complete absence of feedback for several months',
      'Unconditioned salivary reflexes',
    ],
    correctAnswer: 0,
    explanation:
      'Thorndike’s Law of Effect states that responses followed by satisfying consequences are stamped in and more likely to recur.',
  },
  {
    mandatoryTopic: 'Child growth and development',
    difficulty: 'Easy',
    questionType: 'Conceptual',
    question:
      'How does physical "growth" differ fundamentally from psychological "development" in educational psychology?',
    options: [
      'Growth refers to quantitative measurable physical changes (height/weight), whereas development encompasses qualitative and quantitative functional maturation',
      'Growth continues throughout old age, whereas development stops at age five',
      'Growth is purely emotional, whereas development is purely skeletal',
      'Growth cannot be measured in units, whereas development is measured in kilograms',
    ],
    correctAnswer: 0,
    explanation:
      'Growth is quantitative and structural (size, weight), while development is holistic, qualitative + quantitative, and lifelong.',
  },
  {
    mandatoryTopic: 'Principles of child development',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'An infant gains control over the head and trunk before mastering fine finger pincer grip. Which two directional principles of development does this sequence demonstrate?',
    options: [
      'Cephalocaudal (head-to-toe) and Proximodistal (center-to-periphery) principles',
      'Reversibility and conservation principles',
      'Operant generalization and discrimination',
      'Discontinuous random mutation principles',
    ],
    correctAnswer: 0,
    explanation:
      'Head-to-tail progression is Cephalocaudal, and center-outward (shoulder/arm before fingers) progression is Proximodistal.',
  },
  {
    mandatoryTopic: 'Constructivism',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'In a constructivist classroom aligned with Jerome Bruner and NCF 2005, what is the primary role of the teacher?',
    options: [
      'Facilitator who designs inquiry tasks, connects prior schemas, and guides learners to construct meaning actively',
      'Sole transmitter who dictates fixed answers for passive rote copying',
      'Strict examiner who ranks students daily on memorization speed',
      'Silent observer who never interacts or provides feedback',
    ],
    correctAnswer: 0,
    explanation:
      'Constructivism views learners as active meaning-makers and teachers as facilitators of inquiry and conceptual discovery.',
  },
  {
    mandatoryTopic: 'Children with special needs',
    difficulty: 'Moderate',
    questionType: 'Application-Based',
    question:
      'Under the Rights of Persons with Disabilities (RPwD) Act 2016, which classroom adaptation best supports a student with low vision in an inclusive classroom?',
    options: [
      'Providing high-contrast large print, tactile diagrams, preferential front-row seating, and screen-reader audio support',
      'Exempting the student from all science and mathematics concepts permanently',
      'Seating the student in the back corner away from glare and the blackboard',
      'Asking the student to copy notes faster from a distant chalkboard',
    ],
    correctAnswer: 0,
    explanation:
      'Reasonable accommodation under RPwD 2016 requires tactile, auditory, and high-contrast visual supports within the mainstream classroom.',
  },
  {
    mandatoryTopic: 'Learning difficulties',
    difficulty: 'Moderate',
    questionType: 'Application-Based',
    question:
      'A Class 5 student displays strong verbal comprehension and storytelling ability but struggles severely with number sense, place-value alignment, and basic arithmetic estimation. This profile indicates:',
    options: [
      'Dyscalculia',
      'Dysphasia',
      'Agraphia',
      'Auditory processing deafness',
    ],
    correctAnswer: 0,
    explanation:
      'Dyscalculia is a specific learning disability affecting numerical magnitude processing, arithmetic operations, and spatial number alignment.',
  },
  {
    mandatoryTopic: 'Motivation',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'According to Carol Dweck and achievement-goal theory, learners who pursue "mastery goals" rather than "performance-avoidance goals" view challenging errors as:',
    options: [
      'Diagnostic feedback showing which strategy to refine next through effort',
      'Proof of fixed innate incompetence that cannot be changed',
      'A reason to conceal mistakes and copy answers from peers',
      'Unfair tricks designed by teachers to lower grades',
    ],
    correctAnswer: 0,
    explanation:
      'Mastery-oriented learners are intrinsically motivated to grow competence and treat errors as informative stepping stones.',
  },
  {
    mandatoryTopic: 'Classroom teaching strategies',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'In Elliot Aronson’s "Jigsaw" cooperative learning strategy, how is positive interdependence structured among heterogeneous student groups?',
    options: [
      'Each member masters one sub-topic in an expert group and teaches it back to their home group so the whole team succeeds',
      'The highest-scoring student completes the entire worksheet alone while others watch',
      'Groups compete to eliminate weaker members in timed spelling bees',
      'Students work in strict silence without sharing any notes or ideas',
    ],
    correctAnswer: 0,
    explanation:
      'The Jigsaw technique builds individual accountability and positive interdependence by making each student an indispensable expert on one segment.',
  },
  {
    mandatoryTopic: 'Child-centred education',
    difficulty: 'Easy',
    questionType: 'Conceptual',
    question:
      'John Dewey’s philosophy of progressive, child-centred education conceptualizes the school primarily as:',
    options: [
      'A democratic miniature community where learning emerges through experiential problem-solving and reflective action',
      'A factory line designed for uniform rote memorization of ancient texts',
      'An isolated examination hall detached from social life',
      'A disciplinary institution where children remain passive listeners',
    ],
    correctAnswer: 0,
    explanation:
      'John Dewey viewed schools as democratic embryonic communities rooted in "learning by doing" and reflective experience.',
  },
  {
    mandatoryTopic: 'Critical thinking',
    difficulty: 'Difficult',
    questionType: 'Pedagogical',
    question:
      'Which classroom prompt best cultivates higher-order critical thinking and metacognitive evaluation rather than lower-order factual recall?',
    options: [
      '"Compare two conflicting historical accounts of the 1857 uprising and evaluate which primary evidence is more credible and why."',
      '"In which calendar year did the 1857 uprising take place?"',
      '"Copy the five causes of the uprising neatly from page 42."',
      '"State whether New Delhi is the capital of India."',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluating source credibility, weighing conflicting evidence, and justifying conclusions activate Bloom’s higher-order Analysis and Evaluation levels.',
  },
  {
    mandatoryTopic: 'Educational psychology',
    difficulty: 'Moderate',
    questionType: 'Conceptual',
    question:
      'According to Erik Erikson’s psychosocial theory, children in the elementary and middle-school years (ages 6–12) navigate which core developmental crisis?',
    options: [
      'Industry vs. Inferiority',
      'Trust vs. Mistrust',
      'Integrity vs. Despair',
      'Intimacy vs. Isolation',
    ],
    correctAnswer: 0,
    explanation:
      'School-age children (6–12 years) strive for competence in academic and social skills; supportive feedback fosters Industry over Inferiority.',
  },
  {
    mandatoryTopic: 'Pedagogical approaches',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'In the 5E Instructional Model of inquiry pedagogy (Engage, Explore, Explain, Elaborate, Evaluate), what happens during the "Explore" phase?',
    options: [
      'Learners conduct hands-on investigations, test predictions, and gather observations before formal terminology is introduced',
      'The teacher delivers a 40-minute lecture defining all technical terms upfront',
      'Students take a final graded summative multiple-choice examination',
      'Homework defaulters are assigned repetitive copying penalties',
    ],
    correctAnswer: 0,
    explanation:
      'During the Explore phase of the 5E model, students actively investigate phenomena first to build shared concrete experiences.',
  },
  {
    mandatoryTopic: 'Assessment and evaluation',
    difficulty: 'Moderate',
    questionType: 'Pedagogical',
    question:
      'How does "Assessment AS Learning" differ from "Assessment OF Learning" in modern classroom pedagogy?',
    options: [
      'Assessment AS Learning engages students in self-monitoring and metacognitive reflection on their own progress, whereas Assessment OF Learning summarizes achievement at the end of a unit',
      'Assessment AS Learning is conducted only by external board examiners once a year',
      'Assessment AS Learning uses secret rank lists to eliminate low scorers',
      'Assessment OF Learning prohibits all grading rubrics and learning outcomes',
    ],
    correctAnswer: 0,
    explanation:
      'Assessment AS Learning empowers learners to become metacognitive assessors of their own thinking, while Assessment OF Learning is summative.',
  },
];

function stripDevanagari(str: string): string {
  return String(str || '')
    .replace(/\s*\([^)]*[\u0900-\u097F]+[^)]*\)/g, '')
    .replace(/[\u0900-\u097F]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Rebalances a 30-question CDP section so that:
 * 1. Vygotsky questions never exceed 2 per 30 questions.
 * 2. Every single one of the 20 mandatory CDP syllabus categories is represented (20/20)!
 * 3. Zero duplicate stems exist.
 */
function ensureBalancedCdp30Questions(
  rawCdp30: DemoExamQuestion[],
  testId: DemoExamTypeId,
  sectionName: string,
  seedOffset: number
): DemoExamQuestion[] {
  const usedNormStems = new Set<string>();
  const topicCounts: Record<string, number> = {};
  const kept: Array<{ q: DemoExamQuestion; mandatoryTopic: string }> = [];

  // Pass 1: Keep at most 2 questions per topic from rawCdp30 so there is room for all 20 mandatory topics
  for (const item of rawCdp30) {
    const cleanQ = stripDevanagari(item.question);
    const norm = normalizeTetText(cleanQ);
    if (usedNormStems.has(norm)) continue;
    const mTopic = classifyCdpTopicToMandatory20(cleanQ, item.topic);
    const maxForTopic = 2;
    const currentCount = topicCounts[mTopic] || 0;
    if (currentCount >= maxForTopic) continue;

    usedNormStems.add(norm);
    topicCounts[mTopic] = currentCount + 1;
    kept.push({
      q: {
        ...item,
        question: cleanQ,
        options: [
          stripDevanagari(item.options[0]),
          stripDevanagari(item.options[1]),
          stripDevanagari(item.options[2]),
          stripDevanagari(item.options[3]),
        ],
        explanation: stripDevanagari(item.explanation),
        topic: mTopic,
        difficulty: item.difficulty || 'Moderate',
        questionType: item.questionType || 'Pedagogical',
      },
      mandatoryTopic: mTopic,
    });
  }

  // Pass 2: Inject every missing topic from MANDATORY_CDP_20_TOPICS
  for (const reqTopic of MANDATORY_CDP_20_TOPICS) {
    if (!topicCounts[reqTopic]) {
      const candidates = SUPPLEMENTAL_BALANCED_CDP_BANK.filter(
        (s) => s.mandatoryTopic === reqTopic && !usedNormStems.has(normalizeTetText(s.question))
      );
      if (candidates.length > 0) {
        const chosen = candidates[seedOffset % candidates.length];
        const norm = normalizeTetText(chosen.question);
        usedNormStems.add(norm);
        topicCounts[reqTopic] = (topicCounts[reqTopic] || 0) + 1;

        const newItem: DemoExamQuestion = {
          id: `${testId}_cdp_supp_${kept.length + 1}`,
          testId,
          questionNumber: kept.length + 1,
          section: sectionName,
          subjectLabel: 'Child Development and Pedagogy',
          question: chosen.question,
          options: chosen.options,
          correctAnswer: chosen.correctAnswer,
          explanation: chosen.explanation,
          marks: 1,
          topic: chosen.mandatoryTopic,
          difficulty: chosen.difficulty,
          questionType: chosen.questionType,
        };

        if (kept.length < 30) {
          kept.push({ q: newItem, mandatoryTopic: reqTopic });
        } else {
          // Replace an entry whose topic has count > 1
          for (let i = kept.length - 1; i >= 0; i--) {
            const t = kept[i].mandatoryTopic;
            if ((topicCounts[t] || 0) > 1) {
              topicCounts[t]--;
              kept[i] = { q: newItem, mandatoryTopic: reqTopic };
              break;
            }
          }
        }
      }
    }
  }

  // Pass 3: Fill up to 30 questions if needed from SUPPLEMENTAL_BALANCED_CDP_BANK
  let suppIdx = seedOffset;
  while (kept.length < 30 && suppIdx < seedOffset + SUPPLEMENTAL_BALANCED_CDP_BANK.length * 3) {
    const cand = SUPPLEMENTAL_BALANCED_CDP_BANK[suppIdx % SUPPLEMENTAL_BALANCED_CDP_BANK.length];
    suppIdx++;
    const norm = normalizeTetText(cand.question);
    if (usedNormStems.has(norm)) continue;
    if (cand.mandatoryTopic === "Vygotsky's theory" && (topicCounts["Vygotsky's theory"] || 0) >= 2) {
      continue;
    }
    usedNormStems.add(norm);
    topicCounts[cand.mandatoryTopic] = (topicCounts[cand.mandatoryTopic] || 0) + 1;
    kept.push({
      q: {
        id: `${testId}_cdp_fill_${kept.length + 1}`,
        testId,
        questionNumber: kept.length + 1,
        section: sectionName,
        subjectLabel: 'Child Development and Pedagogy',
        question: cand.question,
        options: cand.options,
        correctAnswer: cand.correctAnswer,
        explanation: cand.explanation,
        marks: 1,
        topic: cand.mandatoryTopic,
        difficulty: cand.difficulty,
        questionType: cand.questionType,
      },
      mandatoryTopic: cand.mandatoryTopic,
    });
  }

  return kept.slice(0, 30).map((entry, idx) => {
    const qNum = idx + 1;
    const qId = `${testId}_q_${qNum}`;
    const permuted = seededPermuteOptions(entry.q.options, entry.q.correctAnswer, qId);
    return {
      ...entry.q,
      id: qId,
      questionNumber: qNum,
      section: sectionName,
      options: permuted.options,
      correctAnswer: permuted.correctAnswer,
    };
  });
}

const memoizedDefaultQuestions: Record<string, DemoExamQuestion[]> = {};

/**
 * Builds the official validated 150-question or 75-question English-medium question bank for a demo exam.
 * Supports optional Paper 2 stream ('MATH_SCIENCE' | 'SOCIAL_STUDIES') and attemptSetNumber (1..5) for fresh student attempts.
 */
export function buildDefaultDemoExamQuestions(
  testId: DemoExamTypeId,
  options?: {
    stream?: DemoPaper2Stream;
    testSetNumber?: number;
  }
): DemoExamQuestion[] {
  const stream: DemoPaper2Stream = options?.stream || 'MATH_SCIENCE';
  const testSetNumber = Math.max(1, Math.min(10, options?.testSetNumber || 1));
  const cacheKey = `${testId}__${stream}__set${testSetNumber}`;

  if (memoizedDefaultQuestions[cacheKey] && memoizedDefaultQuestions[cacheKey].length > 0) {
    return memoizedDefaultQuestions[cacheKey];
  }

  const config = getDemoExamConfigForStream(testId, stream);
  const list: DemoExamQuestion[] = [];

  if (testId === 'demo_tet' || testId === 'demo_ctet' || testId === 'demo_tet_p2' || testId === 'demo_ctet_p2') {
    const isCtet = testId === 'demo_ctet' || testId === 'demo_ctet_p2';
    const isPaper2 = testId === 'demo_tet_p2' || testId === 'demo_ctet_p2';
    const examType = isCtet ? 'CTET' : 'MAHA_TET';
    const paperNum = isPaper2 ? 2 : 1;

    const rawQs = buildTetCtetMockPaper({
      exam: examType,
      paper: paperNum,
      stream: isPaper2 ? stream : undefined,
      testNumber: testSetNumber,
      language1: 'English',
      language2: 'English',
      medium: 'English',
    });

    // Replace Q61..90 (Language II) with 100% English Language II questions (since getOfficialLanguagePairs defaults L2 to Marathi when L1===L2)
    for (let slotIdx = 0; slotIdx < 30; slotIdx++) {
      const qNum = 61 + slotIdx;
      const engL2 = generateTetCtetLanguageQuestion({
        exam: examType,
        paper: paperNum,
        poolType: 'MOCK',
        testNumber: testSetNumber,
        slotIndex: slotIdx,
        isLanguage1: false,
        language: 'English',
        questionNumber: qNum,
      });
      rawQs[60 + slotIdx] = engL2;
    }

    const mappedRaw: DemoExamQuestion[] = rawQs.slice(0, 150).map((q, idx) => {
      const qNum = idx + 1;
      const sec =
        config.sections.find((s) => qNum >= s.startQuestionNumber && qNum <= s.endQuestionNumber) ||
        config.sections[0];
      const diff: 'Easy' | 'Moderate' | 'Difficult' =
        q.difficulty === 'Easy'
          ? 'Easy'
          : q.difficulty === 'Difficult' || q.difficulty === 'Pedagogical HOTS'
          ? 'Difficult'
          : 'Moderate';
      return {
        id: `${testId}_q_${qNum}`,
        testId,
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: q.subjectLabel || sec.name,
        question: stripDevanagari(q.question),
        options: [
          stripDevanagari(q.options[0]),
          stripDevanagari(q.options[1]),
          stripDevanagari(q.options[2]),
          stripDevanagari(q.options[3]),
        ],
        correctAnswer: q.correctAnswer,
        explanation: stripDevanagari(
          q.explanation || `The correct answer is option (${q.correctAnswer + 1}).`
        ),
        marks: 1,
        topic: stripDevanagari(q.topic || sec.name),
        difficulty: diff,
        questionType: q.questionPattern || 'Conceptual',
        conceptSignature: q.conceptSignature,
      };
    });

    // Apply strict 20-topic CDP balancing & Vygotsky cap (<= 2) on Questions 1..30
    const seedOffset = (isCtet ? 3 : 0) + (isPaper2 ? 7 : 0) + testSetNumber;
    const balancedCdp = ensureBalancedCdp30Questions(
      mappedRaw.slice(0, 30),
      testId,
      config.sections[0].name,
      seedOffset
    );

    list.push(...balancedCdp, ...mappedRaw.slice(30, 150));
  } else if (
    testId === 'demo_scholarship_4_p1' ||
    testId === 'demo_scholarship_4_p2' ||
    testId === 'demo_scholarship_7_p1' ||
    testId === 'demo_scholarship_7_p2'
  ) {
    let sectionABank: CuratedScholarshipMcq[];
    let sectionBBank: CuratedScholarshipMcq[];

    if (testId === 'demo_scholarship_4_p1') {
      sectionABank = CURATED_STD4_PAPER1_ENGLISH_25;
      sectionBBank = CURATED_STD4_PAPER1_MATH_50;
    } else if (testId === 'demo_scholarship_4_p2') {
      sectionABank = CURATED_STD4_PAPER2_MARATHI_25;
      sectionBBank = CURATED_STD4_PAPER2_INTELLIGENCE_50;
    } else if (testId === 'demo_scholarship_7_p1') {
      sectionABank = CURATED_STD7_PAPER1_ENGLISH_25;
      sectionBBank = CURATED_STD7_PAPER1_MATH_50;
    } else {
      sectionABank = CURATED_STD7_PAPER2_MARATHI_25;
      sectionBBank = CURATED_STD7_PAPER2_INTELLIGENCE_50;
    }

    const combined = [
      ...sectionABank.slice(0, 25).map((item) => ({ item, secIdx: 0 })),
      ...sectionBBank.slice(0, 50).map((item) => ({ item, secIdx: 1 })),
    ];

    combined.forEach(({ item, secIdx }, idx) => {
      const qNum = idx + 1;
      const sec = config.sections[secIdx];
      const qId = `${testId}_q_${qNum}`;
      list.push({
        id: qId,
        testId,
        questionNumber: qNum,
        section: sec.name,
        subjectLabel: sec.name,
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
        marks: 2,
        topic: item.topic,
        difficulty: item.difficulty,
        questionType: item.questionType,
        conceptSignature: `${testId}|${sec.name}|${item.topic}|${item.id}`,
      });
    });
  }

  memoizedDefaultQuestions[cacheKey] = list;
  return list;
}

/**
 * Returns the full expanded pool of unique questions for a demo exam
 * so repeat student attempts draw strictly validated, non-repeating questions per section.
 */
export function buildExpandedDemoQuestionPool(
  testId: DemoExamTypeId,
  stream: DemoPaper2Stream = 'MATH_SCIENCE'
): DemoExamQuestion[] {
  const isScholarship =
    testId === 'demo_scholarship_4_p1' ||
    testId === 'demo_scholarship_4_p2' ||
    testId === 'demo_scholarship_7_p1' ||
    testId === 'demo_scholarship_7_p2';

  if (isScholarship) {
    return buildDefaultDemoExamQuestions(testId, { stream, testSetNumber: 1 });
  }

  const seenStems = new Set<string>();
  const pool: DemoExamQuestion[] = [];
  const maxSets = 3;

  for (let setNum = 1; setNum <= maxSets; setNum++) {
    const qs = buildDefaultDemoExamQuestions(testId, { stream, testSetNumber: setNum });
    for (const q of qs) {
      const norm = normalizeTetText(q.question);
      if (!seenStems.has(norm)) {
        seenStems.add(norm);
        pool.push({
          ...q,
          id: `${testId}_${stream}_set${setNum}_q${q.questionNumber}`,
        });
      }
    }
  }

  return pool;
}
