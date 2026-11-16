import {
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetModuleId,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetSubjectId,
  TetCtetSyllabusUnit,
  TetCtetUserPreferences,
} from '../types/tetCtet';

export const TET_CTET_EXAM_DURATION_MINUTES = 150; // 2 Hours 30 Minutes
export const TET_CTET_EXAM_DURATION_SECONDS = 150 * 60; // 9000 seconds -> 02:30:00
export const TET_CTET_TOTAL_QUESTIONS = 150;
export const TET_CTET_TOTAL_MARKS = 150;
export const TET_CTET_MOCKS_PER_MODULE = 50;
export const TET_CTET_BATCH_SIZE = 5; // 5 Full Mock Tests per batch = 750 Qs/batch
export const TET_CTET_BATCHES_PER_MODULE = 10; // 10 batches * 5 tests = 50 tests per module
export const TET_CTET_TOTAL_MOCKS = 200;
export const TET_CTET_TOTAL_QUESTIONS_BANK = 30000;

export interface TetCtetModuleMeta {
  moduleId: TetCtetModuleId;
  code: string;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  examTitle: string;
  paperTitle: string;
  levelLabel: string;
  classesRange: string;
  conductingBody: string;
  officialPortal: string;
  totalTests: number;
  questionsPerTest: number;
  totalQuestions: number;
  durationMinutes: number;
  qualifyingGeneralMarks: number;
  qualifyingReservedMarks: number;
  tagline: string;
  accentTheme: 'blue' | 'indigo' | 'purple' | 'violet';
  supportedLanguages: TetCtetLanguage[];
  supportedMediums: TetCtetMedium[];
  defaultL1: TetCtetLanguage;
  defaultL2: TetCtetLanguage;
}

export const TET_CTET_MODULES: Record<TetCtetModuleId, TetCtetModuleMeta> = {
  MAHA_TET_P1: {
    moduleId: 'MAHA_TET_P1',
    code: 'Module A',
    exam: 'MAHA_TET',
    paper: 1,
    examTitle: 'MAHA TET',
    paperTitle: 'Paper 1 (Primary Level)',
    levelLabel: 'Primary Teacher Eligibility',
    classesRange: 'Classes 1 to 5',
    conductingBody: 'Maharashtra State Council of Examination (MSCE), Pune',
    officialPortal: 'mahatet.in',
    totalTests: 50,
    questionsPerTest: 150,
    totalQuestions: 7500,
    durationMinutes: 150,
    qualifyingGeneralMarks: 90,
    qualifyingReservedMarks: 83,
    tagline: 'MSCE Pune Balbharati Std. 1–5 Curriculum + Pedagogy Mastery (Marathi, English, Hindi & Urdu)',
    accentTheme: 'blue',
    supportedLanguages: ['Marathi', 'English', 'Hindi', 'Urdu'],
    supportedMediums: ['English', 'Marathi', 'Hindi'],
    defaultL1: 'Marathi',
    defaultL2: 'English',
  },
  MAHA_TET_P2: {
    moduleId: 'MAHA_TET_P2',
    code: 'Module B',
    exam: 'MAHA_TET',
    paper: 2,
    examTitle: 'MAHA TET',
    paperTitle: 'Paper 2 (Upper Primary Level)',
    levelLabel: 'Upper Primary Teacher Eligibility',
    classesRange: 'Classes 6 to 8',
    conductingBody: 'Maharashtra State Council of Examination (MSCE), Pune',
    officialPortal: 'mahatet.in',
    totalTests: 50,
    questionsPerTest: 150,
    totalQuestions: 7500,
    durationMinutes: 150,
    qualifyingGeneralMarks: 90,
    qualifyingReservedMarks: 83,
    tagline: 'Std. 6–8 Maths & Science OR Social Studies Specialization + Adolescent CDP',
    accentTheme: 'indigo',
    supportedLanguages: ['Marathi', 'English', 'Hindi', 'Urdu'],
    supportedMediums: ['English', 'Marathi', 'Hindi'],
    defaultL1: 'Marathi',
    defaultL2: 'English',
  },
  CTET_P1: {
    moduleId: 'CTET_P1',
    code: 'Module C',
    exam: 'CTET',
    paper: 1,
    examTitle: 'CTET',
    paperTitle: 'Paper 1 (Primary Stage)',
    levelLabel: 'Central Primary Teacher Eligibility',
    classesRange: 'Classes 1 to 5',
    conductingBody: 'Central Board of Secondary Education (CBSE), New Delhi',
    officialPortal: 'ctet.nic.in',
    totalTests: 50,
    questionsPerTest: 150,
    totalQuestions: 7500,
    durationMinutes: 150,
    qualifyingGeneralMarks: 90,
    qualifyingReservedMarks: 82,
    tagline: 'NCERT Class 1–5 Competency, NCF 2005/2023 & NEP 2020 Classroom Pedagogy',
    accentTheme: 'purple',
    supportedLanguages: ['English', 'Hindi', 'Marathi'],
    supportedMediums: ['English', 'Hindi', 'Marathi'],
    defaultL1: 'English',
    defaultL2: 'Hindi',
  },
  CTET_P2: {
    moduleId: 'CTET_P2',
    code: 'Module D',
    exam: 'CTET',
    paper: 2,
    examTitle: 'CTET',
    paperTitle: 'Paper 2 (Elementary Stage)',
    levelLabel: 'Central Elementary Teacher Eligibility',
    classesRange: 'Classes 6 to 8',
    conductingBody: 'Central Board of Secondary Education (CBSE), New Delhi',
    officialPortal: 'ctet.nic.in',
    totalTests: 50,
    questionsPerTest: 150,
    totalQuestions: 7500,
    durationMinutes: 150,
    qualifyingGeneralMarks: 90,
    qualifyingReservedMarks: 82,
    tagline: 'NCERT Class 6–8 Maths & Science OR Social Science + NEP Assertion-Reasoning',
    accentTheme: 'violet',
    supportedLanguages: ['English', 'Hindi', 'Marathi'],
    supportedMediums: ['English', 'Hindi', 'Marathi'],
    defaultL1: 'English',
    defaultL2: 'Hindi',
  },
};

export const TET_CTET_MODULE_LIST: TetCtetModuleMeta[] = [
  TET_CTET_MODULES.MAHA_TET_P1,
  TET_CTET_MODULES.MAHA_TET_P2,
  TET_CTET_MODULES.CTET_P1,
  TET_CTET_MODULES.CTET_P2,
];

export const DEFAULT_TET_CTET_PREFERENCES: TetCtetUserPreferences = {
  mahaTetL1: 'Marathi',
  mahaTetL2: 'English',
  mahaTetMedium: 'Marathi',
  ctetL1: 'English',
  ctetL2: 'Hindi',
  ctetMedium: 'English',
  paper2Stream: 'MATH_SCIENCE',
};

export function getModuleId(exam: TetCtetExamType, paper: TetCtetPaperNumber): TetCtetModuleId {
  if (exam === 'MAHA_TET') return paper === 1 ? 'MAHA_TET_P1' : 'MAHA_TET_P2';
  return paper === 1 ? 'CTET_P1' : 'CTET_P2';
}

export function getOfficialLanguagePairs(
  exam: TetCtetExamType,
  l1: TetCtetLanguage,
  l2: TetCtetLanguage
): { language1: TetCtetLanguage; language2: TetCtetLanguage } {
  const supported =
    exam === 'MAHA_TET'
      ? TET_CTET_MODULES.MAHA_TET_P1.supportedLanguages
      : TET_CTET_MODULES.CTET_P1.supportedLanguages;

  const validL1 = supported.includes(l1) ? l1 : supported[0];
  let validL2 = supported.includes(l2) ? l2 : supported[1] || supported[0];
  if (validL2 === validL1) {
    validL2 = supported.find((lang) => lang !== validL1) || 'English';
  }
  return { language1: validL1, language2: validL2 };
}

export interface PaperSubjectSlot {
  subjectId: TetCtetSubjectId;
  label: string;
  questionCount: number;
  startQ: number; // 1-indexed
  endQ: number;   // 1-indexed
  marks: number;
}

export function getPaperSubjectDistribution(
  paper: TetCtetPaperNumber,
  stream: TetCtetPaper2Stream = 'MATH_SCIENCE',
  l1Label = 'Language 1',
  l2Label = 'Language 2'
): PaperSubjectSlot[] {
  if (paper === 1) {
    return [
      {
        subjectId: 'CDP',
        label: 'Child Development & Pedagogy',
        questionCount: 30,
        startQ: 1,
        endQ: 30,
        marks: 30,
      },
      {
        subjectId: 'LANGUAGE_1',
        label: `Language 1 (${l1Label})`,
        questionCount: 30,
        startQ: 31,
        endQ: 60,
        marks: 30,
      },
      {
        subjectId: 'LANGUAGE_2',
        label: `Language 2 (${l2Label})`,
        questionCount: 30,
        startQ: 61,
        endQ: 90,
        marks: 30,
      },
      {
        subjectId: 'MATHEMATICS',
        label: 'Mathematics',
        questionCount: 30,
        startQ: 91,
        endQ: 120,
        marks: 30,
      },
      {
        subjectId: 'EVS',
        label: 'Environmental Studies (EVS)',
        questionCount: 30,
        startQ: 121,
        endQ: 150,
        marks: 30,
      },
    ];
  }

  if (stream === 'SOCIAL_STUDIES') {
    return [
      {
        subjectId: 'CDP',
        label: 'Child Development & Pedagogy',
        questionCount: 30,
        startQ: 1,
        endQ: 30,
        marks: 30,
      },
      {
        subjectId: 'LANGUAGE_1',
        label: `Language 1 (${l1Label})`,
        questionCount: 30,
        startQ: 31,
        endQ: 60,
        marks: 30,
      },
      {
        subjectId: 'LANGUAGE_2',
        label: `Language 2 (${l2Label})`,
        questionCount: 30,
        startQ: 61,
        endQ: 90,
        marks: 30,
      },
      {
        subjectId: 'SOCIAL_STUDIES',
        label: 'Social Studies / Social Science',
        questionCount: 60,
        startQ: 91,
        endQ: 150,
        marks: 60,
      },
    ];
  }

  return [
    {
      subjectId: 'CDP',
      label: 'Child Development & Pedagogy',
      questionCount: 30,
      startQ: 1,
      endQ: 30,
      marks: 30,
    },
    {
      subjectId: 'LANGUAGE_1',
      label: `Language 1 (${l1Label})`,
      questionCount: 30,
      startQ: 31,
      endQ: 60,
      marks: 30,
    },
    {
      subjectId: 'LANGUAGE_2',
      label: `Language 2 (${l2Label})`,
      questionCount: 30,
      startQ: 61,
      endQ: 90,
      marks: 30,
    },
    {
      subjectId: 'MATHEMATICS',
      label: 'Mathematics (Paper 2)',
      questionCount: 30,
      startQ: 91,
      endQ: 120,
      marks: 30,
    },
    {
      subjectId: 'SCIENCE',
      label: 'Science (Paper 2)',
      questionCount: 30,
      startQ: 121,
      endQ: 150,
      marks: 30,
    },
  ];
}

export function getOfficialSyllabusForModule(
  moduleId: TetCtetModuleId,
  stream: TetCtetPaper2Stream = 'MATH_SCIENCE'
): TetCtetSyllabusUnit[] {
  const isCtet = moduleId.startsWith('CTET');
  const isPaper1 = moduleId.endsWith('P1');

  const cdpUnit: TetCtetSyllabusUnit = {
    id: `${moduleId}-cdp`,
    subjectId: 'CDP',
    subjectTitle: isPaper1
      ? 'Child Development & Pedagogy (Age 6–11 Years / Primary Stage)'
      : 'Child Development & Pedagogy (Age 11–14 Years / Elementary Stage)',
    marks: 30,
    questionCount: 30,
    topics: [
      'Concept of Development and its Relationship with Learning',
      'Principles of Child Development & Influence of Heredity and Environment',
      'Socialization Processes: Family, School, Teachers, and Peer Groups',
      'Piaget, Kohlberg, and Vygotsky: Constructs and Critical Perspectives',
      'Child-Centered and Progressive Education (Dewey, Tagore, Montessori)',
      'Construct of Intelligence & Gardner’s Multiple Intelligences',
      'Language and Thought; Gender as a Social Construct & Gender Bias',
      'Individual Differences among Learners (Aptitude, Interest, Culture)',
      'Assessment for Learning vs Assessment of Learning (CCE, SBA, Rubrics)',
      'Inclusive Education: CWSN, Gifted, Creative & Differently-Abled Learners',
      'Learning Disabilities: Dyslexia, Dysgraphia, Dyscalculia, ADHD, Autism',
      isCtet
        ? 'NEP 2020 Foundational/Preparatory/Middle Stage, NCF 2005 & RTE Act 2009'
        : 'MSCE Educational Psychology, RTE 2009, NCF 2005 & NEP 2020 Pedagogy',
    ],
    pedagogyFocus: [
      '15 Qs on Child Development concepts + 5 Qs on Inclusive Education + 10 Qs on Learning & Pedagogy',
      'Classroom dilemma & constructive feedback scenarios',
    ],
    recommendedStrategy:
      'Focus on constructivist reasoning: prioritize child agency, formative feedback, inclusive differentiation, and intrinsic motivation over rote memorization or punishment.',
  };

  const l1Unit: TetCtetSyllabusUnit = {
    id: `${moduleId}-l1`,
    subjectId: 'LANGUAGE_1',
    subjectTitle: 'Language 1 (Medium of Instruction Proficiency & Pedagogy)',
    marks: 30,
    questionCount: 30,
    topics: [
      'Unseen Prose Passage Comprehension (Inference, Main Idea, Tone, Vocabulary)',
      'Unseen Poetry / Literary Extract Comprehension (Figures of Speech, Rhyme, Theme)',
      'Functional Grammar in Context (Parts of Speech, Clauses, Tenses/Kaal, Samas, Sandhi, Alankar)',
      'Language Acquisition vs Language Learning (Chomsky LAD, Krashen Input Hypothesis)',
      'Principles of Language Teaching & Four Skills (LSRW: Listening, Speaking, Reading, Writing)',
      'Role of Grammar in Communicating Ideas & Remedial Language Teaching',
      'Challenges of Teaching Language in a Diverse Multilingual Classroom',
      'Teaching-Learning Materials (TLM), Textbooks & ICT in Language Assessment',
    ],
    pedagogyFocus: [
      '15 Qs Reading Comprehension (Prose + Poetry) & Applied Grammar',
      '15 Qs Pedagogy of Language Development & Multilingual Classrooms',
    ],
    recommendedStrategy:
      'Always treat mother-tongue / Language 1 as a bridge rather than a barrier; practice extracting explicit and inferential meaning strictly from passages.',
  };

  const l2Unit: TetCtetSyllabusUnit = {
    id: `${moduleId}-l2`,
    subjectId: 'LANGUAGE_2',
    subjectTitle: 'Language 2 (Second Language Communication & Pedagogy)',
    marks: 30,
    questionCount: 30,
    topics: [
      'Two Unseen Discursive / Factual Prose Passages (Inference, Vocabulary, Cohesion)',
      'Applied Grammar: Prepositions, Modals, Active-Passive, Direct-Indirect, Idioms & Syntax',
      'Second Language Acquisition & BICS vs CALP (Jim Cummins)',
      'Methods & Approaches: Communicative Language Teaching (CLT), Direct, Bilingual & TPR',
      'Diagnosing Spelling, Pronunciation & Fluency Errors; Diagnostic & Remedial Testing',
      'Evaluating Language Comprehension: Rubrics, Portfolio, Oral Reading & Dictation',
    ],
    pedagogyFocus: [
      '15 Qs Discursive Passages & Functional Grammar',
      '15 Qs Communicative Pedagogy & Error Diagnosis',
    ],
    recommendedStrategy:
      'Differentiate clearly between L1 natural acquisition and L2 scaffolded communication (CLT & Meaningful Context); focus on real-world communicative tasks.',
  };

  if (isPaper1) {
    const mathP1Unit: TetCtetSyllabusUnit = {
      id: `${moduleId}-math`,
      subjectId: 'MATHEMATICS',
      subjectTitle: 'Mathematics (Classes 1–5 Content & Math Pedagogy)',
      marks: 30,
      questionCount: 30,
      topics: [
        'Number System, Place Value, Indian & International Numeration, Roman Numerals',
        'Whole Numbers, Divisibility, LCM & HCF, Fractions & Decimals',
        'Arithmetic Operations, Unitary Method, Money, Time, Calendar & Measurement Conversions',
        'Basic 2D & 3D Shapes, Perimeter, Area of Square & Rectangle, Symmetry & Patterns',
        'Data Handling: Pictographs & Bar Graphs',
        'Nature of Mathematics & Van Hiele Levels of Geometric Thinking',
        'Place of Mathematics in Curriculum, Concrete-Pictorial-Abstract (CPA) Progression',
        'Mathematical Communication, Error Analysis (Buggy Algorithms) & Diagnostic Teaching',
      ],
      pedagogyFocus: [
        '15 Qs Primary Numerical Content + 15 Qs Mathematics Pedagogical Issues',
      ],
      recommendedStrategy:
        'Connect manipulatives (Dienes blocks, geoboards, tangrams, fraction strips) with concept building; identify student misconceptions logically.',
    };

    const evsP1Unit: TetCtetSyllabusUnit = {
      id: `${moduleId}-evs`,
      subjectId: 'EVS',
      subjectTitle: 'Environmental Studies (EVS Themes 1–6 & Integrated Pedagogy)',
      marks: 30,
      questionCount: 30,
      topics: [
        '6 Core NCF Themes: Family & Friends (Plants, Animals), Food, Shelter, Water, Travel, Things We Make & Do',
        isCtet
          ? 'NCERT Looking Around Class 3–5 Case Studies (Karnam Malleswari, Sunita Williams, Khejadi, Madhubani, Pochampalli, Changpa)'
          : 'Maharashtra Balbharati Std 3–5 Geography, Sahyadri Ecology, Water Conservation & Shivaji Swarajya Heritage',
        'Nutrition, Deficiency Diseases, Vitamins, Food Preservation & Agriculture',
        'Indian Biodiversity, National Parks, Migration of Birds & Environmental Conservation',
        'Integrated Approach to EVS (Science + Social Science + Environment Education)',
        'Field Trips, Community Resources, Observation, Experimentation & Map Skills Pedagogy',
      ],
      pedagogyFocus: [
        '15 Qs EVS Thematic Content + 15 Qs Experiential & Inquiry EVS Pedagogy',
      ],
      recommendedStrategy:
        'Memorize NCERT/Balbharati regional case studies and recognize EVS as a holistic, observation-first discipline rather than isolated definitions.',
    };

    return [cdpUnit, l1Unit, l2Unit, mathP1Unit, evsP1Unit];
  }

  // Paper 2 Units
  const mathP2Unit: TetCtetSyllabusUnit = {
    id: `${moduleId}-math-p2`,
    subjectId: 'MATHEMATICS',
    subjectTitle: 'Mathematics (Upper Primary Classes 6–8 Content & Pedagogy)',
    marks: 30,
    questionCount: 30,
    topics: [
      'Integers, Rational Numbers, Exponents, Squares/Cubes & Algebraic Identities',
      'Linear Equations in One Variable, Polynomials & Factorization',
      'Ratio, Proportion, Percentage, Profit-Loss, Discount, Simple & Compound Interest',
      'Lines, Angles, Triangles (Congruence & Pythagoras), Quadrilaterals & Circles',
      'Mensuration: Perimeter, Area (Triangle, Trapezium, Circle) & Volume/Surface Area (Cube, Cuboid, Cylinder)',
      'Data Handling: Mean, Median, Mode, Probability & Algebraic Patterns',
      'Pedagogy: Inductive-Deductive Methods, Proof Reasoning, Heuristic Method & Error Analysis',
    ],
    pedagogyFocus: [
      '20 Qs Classes 6–8 Quantitative Problem Solving + 10 Qs Upper-Primary Math Pedagogy',
    ],
    recommendedStrategy:
      'Focus on algebraic generalization, mensuration formulas with unit consistency, and distinguishing inductive exploration from deductive proof.',
  };

  const sciP2Unit: TetCtetSyllabusUnit = {
    id: `${moduleId}-sci-p2`,
    subjectId: 'SCIENCE',
    subjectTitle: 'Science (Classes 6–8 Physics, Chemistry, Biology & Scientific Inquiry)',
    marks: 30,
    questionCount: 30,
    topics: [
      'Food Components, Microorganisms, Cell Structure, Crop Production & Human Systems',
      'Materials: Metals & Non-Metals, Acids, Bases & Salts, Physical & Chemical Changes, Separation Methods',
      'Motion, Force, Pressure, Friction, Gravitation & Laws of Motion Basics',
      'Heat Transfer, Light (Reflection, Mirrors, Lenses, Human Eye), Sound & Electric Circuits/Magnets',
      'Natural Phenomena: Lightning, Earthquakes, Air/Water Conservation & Solar System',
      'Nature of Science (Tentative & Empirical), Scientific Inquiry, Laboratory & Project Method Pedagogy',
    ],
    pedagogyFocus: [
      '20 Qs NCERT/MSCE Std 6–8 Conceptual Science + 10 Qs Scientific Inquiry Pedagogy',
    ],
    recommendedStrategy:
      'Practice cause-and-effect science reasoning, acid-base indicators, ray optics, and distinguishing scientific laws from theories and hypotheses.',
  };

  const sstP2Unit: TetCtetSyllabusUnit = {
    id: `${moduleId}-sst-p2`,
    subjectId: 'SOCIAL_STUDIES',
    subjectTitle: 'Social Studies / Social Science (History, Geography, Civics & SST Pedagogy)',
    marks: 60,
    questionCount: 60,
    topics: [
      'Ancient History: Indus Valley, Vedic Age, Buddhism/Jainism, Mauryas & Guptas',
      'Medieval History: Delhi Sultanate, Bhakti-Sufi Movements, Mughals & Chhatrapati Shivaji Maharaj / Maratha Swarajya',
      'Modern History: 1857 Revolt, Social Reformers (Phule, Ambedkar, Raja Ram Mohan Roy), Freedom Struggle & Independence',
      'Geography: Earth Motions, Interior, Atmosphere, Hydrosphere, Monsoon, Indian Soils, Agriculture & Industries',
      'Civics & Polity: Indian Constitution, Fundamental Rights & Duties, Parliament, Judiciary, Local Self-Government (Panchayati Raj)',
      'Social Science Pedagogy: Primary vs Secondary Sources, Timeline/Map Skills, Critical Inquiry & Gender/Social Justice',
    ],
    pedagogyFocus: [
      '40 Qs History, Geography & Polity Content + 20 Qs Social Science Critical Pedagogy',
    ],
    recommendedStrategy:
      'Balance chronological Indian/Maharashtra history with constitutional articles, climatic factors in geography, and source-based inquiry pedagogy.',
  };

  if (stream === 'SOCIAL_STUDIES') {
    return [cdpUnit, l1Unit, l2Unit, sstP2Unit];
  }
  return [cdpUnit, l1Unit, l2Unit, mathP2Unit, sciP2Unit];
}

export function getBatchSummariesForModule(moduleId: TetCtetModuleId): Array<{
  batchNumber: number;
  label: string;
  testRange: [number, number];
  totalTests: number;
  totalQuestions: number;
  difficultyBand: string;
}> {
  return Array.from({ length: TET_CTET_BATCHES_PER_MODULE }, (_, idx) => {
    const batchNumber = idx + 1;
    const startTest = idx * TET_CTET_BATCH_SIZE + 1;
    const endTest = startTest + TET_CTET_BATCH_SIZE - 1;
    const difficultyBand =
      batchNumber <= 3
        ? 'Foundation & Concept Mastery'
        : batchNumber <= 7
        ? 'Standard Official Exam Level'
        : 'Advanced Analytical & HOTS Ranker';
    return {
      batchNumber,
      label: `Batch ${String(batchNumber).padStart(2, '0')} (Tests ${String(startTest).padStart(2, '0')}–${String(endTest).padStart(2, '0')})`,
      testRange: [startTest, endTest] as [number, number],
      totalTests: TET_CTET_BATCH_SIZE,
      totalQuestions: TET_CTET_BATCH_SIZE * TET_CTET_TOTAL_QUESTIONS,
      difficultyBand,
    };
  });
}
