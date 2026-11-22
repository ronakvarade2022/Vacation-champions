import { ClassLevel, EducationBoard, SubjectName } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import { getSubjectsForClass, getSubjectMeta, ALL_10_CLASSES_META } from './classCurriculumConfig';
import { getCurriculumQuestionsForLevel } from '../services/curriculumQuestionBank';
import { isVerifiedSyllabusPipelineEnabled } from './verifiedSyllabus/syllabusFeatureFlags';
import { getEffectiveSyllabusForConsumer } from '../services/centralSyllabusService';
import {
  getClassDemoWorksheets,
  getClassSpecificWorksheetQuestions
} from './classDemoWorksheetsData';

import {
  WorksheetItemFormat,
  WORKSHEET_FORMAT_LABELS,
  WorksheetFormatMeta,
  WorksheetDifficultyLevel,
  WorksheetCollectionType,
  WorksheetQuestionItem,
  OnlineWorksheet,
  NewWorksheetSpec,
  CompactWorksheetQuestionSpec
} from './worksheets/types';
import {
  getAllNew690Worksheets,
  getNew23WorksheetsForClass,
  getNew23WorksheetsForClassAndSubject
} from './worksheets/index';

export type {
  WorksheetItemFormat,
  WorksheetFormatMeta,
  WorksheetDifficultyLevel,
  WorksheetCollectionType,
  WorksheetQuestionItem,
  OnlineWorksheet,
  NewWorksheetSpec,
  CompactWorksheetQuestionSpec
};
export {
  WORKSHEET_FORMAT_LABELS,
  getAllNew690Worksheets,
  getNew23WorksheetsForClass,
  getNew23WorksheetsForClassAndSubject
};

export function getFreeDemoWorksheetIdsForClass(
  classLevel: ClassLevel = 'Class 1',
  board: EducationBoard = 'Maharashtra'
): readonly [string, string] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 1;
  const boardCode = board === 'CBSE' ? 'CBSE-' : board === 'ICSE' ? 'ICSE-' : '';
  const mathKey = board === 'Maharashtra' && cNum === 10 ? 'MATHEMATICSALGEBRA' : 'MATHEMATICS';
  return [`WS-${boardCode}C${cNum}-ENGLISH-1`, `WS-${boardCode}C${cNum}-${mathKey}-1`] as const;
}

export const FREE_DEMO_WORKSHEET_IDS: readonly string[] = [
  'WS-C1-ENGLISH-1',
  'WS-C1-MATHEMATICS-1'
] as const;

const SUBJECT_CHAPTER_THEMES: Record<SubjectName, [string, string]> = {
  'Mathematics': ['Number Operations, Fractions & Problem Solving', 'Geometry, Measurement & Applied Arithmetic'],
  'English': ['Reading Comprehension, Vocabulary & Parts of Speech', 'Grammar Structure, Tenses & Creative Writing'],
  'Hindi': ['वर्णमाला, शब्द-भंडार, संज्ञा एवं सर्वनाम अभ्यास', 'मुहावरे, विलोम-पर्यायवाची एवं गद्यांश बोध'],
  'Marathi': ['वर्णविचार, समानार्थी-विरुद्धार्थी व नाम-सर्वनाम', 'वाक्प्रचार, म्हणी, काळ व शुद्धलेखन सराव'],
  'Science': ['Living World, Nutrition & Matter Around Us', 'Force, Energy, Light & Environmental Balance'],
  'General Knowledge': ['India, Maharashtra Heritage & National Symbols', 'Science Discoveries, Space & Current Affairs'],
  'Social Studies': ['Our Community, Civic Life & Natural Resources', 'Governance, Heritage & Transport Networks'],
  'History': ['Ancient & Medieval India and Swarajya Heritage', 'Modern Indian Freedom Struggle & Reformers'],
  'Geography': ['Earth, Landforms, Climate & Map Reading', 'Rivers, Agriculture, Minerals & Maharashtra Geography'],
  'Computer Knowledge': ['Computer Hardware, Peripherals & Operating Systems', 'Networking, Cyber Safety & Coding Logic'],
  'Logical Reasoning': ['Number Series, Analogies & Coding-Decoding', 'Direction Sense, Blood Relations & Analytical Puzzles'],
  'Environmental Studies': ['Plants, Animals, Water & Our Surroundings', 'Cleanliness, Conservation & Eco-Friendly Living'],
  'Moral Education': ['Honesty, Empathy, Respect & Good Habits', 'Teamwork, Civic Duty & Responsible Citizenship'],
  'Vocabulary and Grammar': ['Synonyms, Antonyms, Prefixes & Sentence Building', 'Active-Passive Voice, Direct-Indirect Speech & Idioms'],
  'Drawing and Creative Activities': ['Primary & Secondary Colours, Shapes & Warli Folk Art', 'Shading, Perspective, Symmetry & Eco-Paper Craft'],
  'Physics': ['Chapter 1: Laws of Motion, Gravitation & Work-Energy', 'Chapter 2: Refraction of Light, Lenses & Electric Current'],
  'Chemistry': ['Chapter 1: Periodic Table, Atomic Structure & Chemical Bonds', 'Chapter 2: Chemical Reactions, Acids-Bases-Salts & Carbon Compounds'],
  'Biology': ['Chapter 1: Cell Biology, Life Processes & Classification', 'Chapter 2: Heredity, Biotechnology, Plant Physiology & Ecology'],
  'Political Science': ['Chapter 1: Indian Constitution, Fundamental Rights & Parliament', 'Chapter 2: Electoral Process, Judiciary & Local Self-Government'],
  'Information Technology': ['Chapter 1: HTML5 Web Designing, Cyber Security & Networking', 'Chapter 2: Relational Databases (SQL), Python/JS Logic & Cloud IT'],
  'Environmental Education': ['Chapter 1: Ecosystem Dynamics, Biodiversity & Western Ghats', 'Chapter 2: Water Management, Solid Waste & Climate Action'],
  'Physical Education': ['Chapter 1: Physical Fitness Components, BMI & Yogasanas', 'Chapter 2: Sports Rules, First Aid (R.I.C.E.) & Balanced Nutrition'],
  'Mathematics – Algebra': ['Chapter 1: Linear Equations in Two Variables & Quadratic Equations', 'Chapter 2: Arithmetic Progression, Probability, GST & Statistics'],
  'Mathematics – Geometry': ['Chapter 1: Similarity of Triangles, Pythagoras Theorem & Circles', 'Chapter 2: Coordinate Geometry, Trigonometry & 3D Mensuration'],
  'Social Science': ['Chapter 1: Civilisations, Earth Physical Features & Resources', 'Chapter 2: Democratic Politics, Federalism & Sectors of Economy'],
  'History & Civics': ['Chapter 1: Harappa, Revolt of 1857 & Indian Freedom Struggle', 'Chapter 2: World Wars, United Nations & Union Parliament'],
  'Computer Studies': ['Chapter 1: Computer Hardware, Memory & Number Systems', 'Chapter 2: HTML5 Web Design, Spreadsheets & Coding Logic'],
  'Computer Applications': ['Chapter 1: Java OOP Principles, Operators & Constructors', 'Chapter 2: Loops, String Handling & 1D/2D Arrays'],
  'Economics': ['Chapter 1: Factors of Production, Demand & Market Equilibrium', 'Chapter 2: Money, RBI Banking, Inflation & Food Security'],
  'Commercial Studies': ['Chapter 1: Stakeholders, E-Commerce & Marketing Strategies', 'Chapter 2: Final Accounts (Trading/P&L), Budgeting & Logistics'],
  'Sanskrit': ['अध्याय १: संस्कृत वर्णमाला, लकार व शब्द रूपाणि', 'अध्याय २: संधि, समास, उपसर्ग एवं सुभाषितानि']
};

function selectFormatForSubjectAndIndex(subject: SubjectName, index: number): WorksheetItemFormat {
  const baseSequence: WorksheetItemFormat[] = [
    'mcq',
    'fill_blank',
    'true_false',
    'match_following',
    'short_answer',
    'long_answer',
    'logical_reasoning',
    'chapter_exercise',
    'math_exercise',
    'science_activity'
  ];

  if (subject === 'Mathematics' || subject === 'Mathematics – Algebra' || subject === 'Mathematics – Geometry') {
    const mathSeq: WorksheetItemFormat[] = [
      'math_exercise',
      'mcq',
      'fill_blank',
      'short_answer',
      'match_following',
      'true_false',
      'logical_reasoning',
      'chapter_exercise',
      'math_exercise',
      'long_answer'
    ];
    return mathSeq[index % mathSeq.length];
  }

  if (subject === 'English' || subject === 'Vocabulary and Grammar' || subject === 'Marathi' || subject === 'Hindi') {
    const langSeq: WorksheetItemFormat[] = [
      'grammar_practice',
      'mcq',
      'fill_blank',
      'match_following',
      'true_false',
      'short_answer',
      'grammar_practice',
      'chapter_exercise',
      'logical_reasoning',
      'long_answer'
    ];
    return langSeq[index % langSeq.length];
  }

  if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    const sciSeq: WorksheetItemFormat[] = [
      'science_activity',
      'mcq',
      'fill_blank',
      'true_false',
      'match_following',
      'short_answer',
      'science_activity',
      'chapter_exercise',
      'logical_reasoning',
      'long_answer'
    ];
    return sciSeq[index % sciSeq.length];
  }

  return baseSequence[index % baseSequence.length];
}

/**
 * Generates 2 comprehensive chapter-wise worksheets per (classLevel, subject):
 * - Worksheet 1: Foundation & Intermediate Practice (combines Level 1 & Level 2 concepts, 10 structured questions, 20 Marks)
 * - Worksheet 2: Advanced & Expert Mastery (combines Level 3 & Level 4 concepts, 10 structured questions, 20 Marks)
 */
export function getExistingWorksheetsForClassAndSubject(
  classLevel: ClassLevel,
  subject: SubjectName,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 4;
  const normalizedBoard: EducationBoard = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'Maharashtra';
  const boardCode = normalizedBoard === 'CBSE' ? 'CBSE-' : normalizedBoard === 'ICSE' ? 'ICSE-' : '';
  const titlePrefix = normalizedBoard === 'Maharashtra' ? '' : `${normalizedBoard} `;
  const useVerifiedPipeline = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);

  let chapters: [string, string];
  if (useVerifiedPipeline) {
    const resolution = getEffectiveSyllabusForConsumer({
      board: normalizedBoard,
      classLevel,
      subject,
      medium,
      useVerifiedPipelineOverride: true,
    });
    if (resolution.mode !== 'central_verified' || resolution.chapterTitles.length === 0) {
      return [];
    }
    const firstCh = resolution.chapterTitles[0];
    const secondCh =
      resolution.chapterTitles.length > 1
        ? resolution.chapterTitles[resolution.chapterTitles.length - 1]
        : firstCh;
    chapters = [firstCh, secondCh];
  } else {
    chapters = SUBJECT_CHAPTER_THEMES[subject] || ['Chapter 1: Core Concepts', 'Chapter 2: Advanced Applications'];
  }

  const subjMeta = getSubjectMeta(subject, normalizedBoard);
  const classMeta = ALL_10_CLASSES_META.find(c => c.classLevel === classLevel);
  const classDemoIds = getFreeDemoWorksheetIdsForClass(classLevel, normalizedBoard);

  // Pull canonical questions from Levels 1-4 for this exact (classLevel, subject, board)
  const l1 = getCurriculumQuestionsForLevel(classLevel, subject, 1, normalizedBoard, medium, useVerifiedPipelineOverride);
  const l2 = getCurriculumQuestionsForLevel(classLevel, subject, 2, normalizedBoard, medium, useVerifiedPipelineOverride);
  const l3 = getCurriculumQuestionsForLevel(classLevel, subject, 3, normalizedBoard, medium, useVerifiedPipelineOverride);
  const l4 = getCurriculumQuestionsForLevel(classLevel, subject, 4, normalizedBoard, medium, useVerifiedPipelineOverride);

  const ws1Pool = [...l1.slice(0, 5), ...l2.slice(0, 5)];
  const ws2Pool = [...l3.slice(0, 5), ...l4.slice(0, 5)];

  const buildWorksheet = (wsNum: 1 | 2, pool: typeof ws1Pool, chapterName: string): OnlineWorksheet => {
    const wsId = `WS-${boardCode}C${cNum}-${subject.replace(/[^A-Za-z0-9]/g, '').toUpperCase()}-${wsNum}`;
    const formatsSet = new Set<WorksheetItemFormat>();

    const classSpecificQ =
      wsNum === 1 ? getClassSpecificWorksheetQuestions(classLevel, subject, normalizedBoard) : null;

    const questions: WorksheetQuestionItem[] = pool.map((q, idx) => {
      const override = classSpecificQ && idx < classSpecificQ.length ? classSpecificQ[idx] : null;
      if (override) {
        formatsSet.add(override.format);
        const formatLabel = WORKSHEET_FORMAT_LABELS[override.format].label;
        return {
          ...override,
          id: `${wsId}-Q${idx + 1}`,
          number: idx + 1,
          prompt: `[${formatLabel}] ${override.prompt}`
        };
      }

      const format = selectFormatForSubjectAndIndex(subject, idx);
      formatsSet.add(format);
      const formatLabel = WORKSHEET_FORMAT_LABELS[format].label;
      const cleanPrompt = q.questionText.replace(/^\[.*?\]\s*/, '');

      return {
        id: `${wsId}-Q${idx + 1}`,
        number: idx + 1,
        format,
        chapterTitle: q.topic || chapterName,
        prompt: `[${formatLabel}] ${cleanPrompt}`,
        options: q.options,
        correctIndex: q.correctIndex,
        modelWrittenAnswer: `${q.options[q.correctIndex]} — ${q.explanation}`,
        explanation: q.explanation,
        marks: 2
      };
    });

    return {
      id: wsId,
      board: normalizedBoard,
      classLevel,
      subject,
      worksheetNumber: wsNum,
      worksheetCollection: 'existing',
      difficultyLevel: wsNum === 1 ? 'Foundation' : 'Advanced',
      title: `${titlePrefix}${classLevel} • ${subject} – Worksheet #${wsNum}`,
      marathiSubtitle:
        normalizedBoard === 'Maharashtra'
          ? `${classMeta?.marathiLabel || classLevel} • ${subjMeta.marathiTitle} सराव कार्यपत्रिका ${wsNum}`
          : `${normalizedBoard} • ${classLevel} ${subject} Practice Worksheet #${wsNum}`,
      chapterName,
      durationMinutes: 20,
      totalMarks: questions.length * 2,
      isDemo: classDemoIds.includes(wsId),
      formatsIncluded: Array.from(formatsSet),
      questions
    };
  };

  return [
    buildWorksheet(1, ws1Pool, chapters[0]),
    buildWorksheet(2, ws2Pool, chapters[1])
  ];
}

/**
 * Returns ALL worksheets (existing legacy worksheets + newly added 23-worksheet set) for a (board, classLevel, subject).
 * Existing worksheets are always preserved intact and returned first, followed by new additional worksheets.
 */
export function getWorksheetsForClassAndSubject(
  classLevel: ClassLevel,
  subject: SubjectName,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const normalizedBoard: EducationBoard = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'Maharashtra';
  const existing = getExistingWorksheetsForClassAndSubject(
    classLevel,
    subject,
    normalizedBoard,
    medium,
    useVerifiedPipelineOverride
  );
  const additional = getNew23WorksheetsForClassAndSubject(
    classLevel,
    subject,
    normalizedBoard,
    medium,
    useVerifiedPipelineOverride
  );
  return [...existing, ...additional];
}

export function getExistingWorksheetsForClass(
  classLevel: ClassLevel,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const subjects = getSubjectsForClass(classLevel, board);
  const list: OnlineWorksheet[] = [];
  for (const subj of subjects) {
    list.push(
      ...getExistingWorksheetsForClassAndSubject(
        classLevel,
        subj,
        board,
        medium,
        useVerifiedPipelineOverride
      )
    );
  }
  return list;
}

export function getAllWorksheetsForClass(
  classLevel: ClassLevel,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const normalizedBoard: EducationBoard = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'Maharashtra';
  const existing = getExistingWorksheetsForClass(
    classLevel,
    normalizedBoard,
    medium,
    useVerifiedPipelineOverride
  );
  const additional = getNew23WorksheetsForClass(
    classLevel,
    normalizedBoard,
    medium,
    useVerifiedPipelineOverride
  );
  return [...existing, ...additional];
}

/**
 * Returns the strictly TWO designated Free Demo Worksheets for a student's or teacher's registered (board, class).
 */
export function getFreeDemoWorksheets(
  classLevel: ClassLevel = 'Class 1',
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const englishDemo = getExistingWorksheetsForClassAndSubject(
    classLevel,
    'English',
    board,
    medium,
    useVerifiedPipelineOverride
  )[0];
  const mathSubject: SubjectName =
    board === 'Maharashtra' && classLevel === 'Class 10' ? 'Mathematics – Algebra' : 'Mathematics';
  const mathDemo = getExistingWorksheetsForClassAndSubject(
    classLevel,
    mathSubject,
    board,
    medium,
    useVerifiedPipelineOverride
  )[0];
  return [englishDemo, mathDemo].filter(Boolean);
}

/**
 * Returns the 4 unique, class- and board-specific Demo Worksheets (Mathematics, English, Science, General Knowledge)
 * for the Visitor Demo Dashboard across Class 1 to Class 10.
 */
export function getVisitorDemoWorksheetsForClass(
  classLevel: ClassLevel = 'Class 1',
  board: EducationBoard = 'Maharashtra'
): OnlineWorksheet[] {
  return getClassDemoWorksheets(classLevel, board);
}


