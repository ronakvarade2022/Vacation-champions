import { ClassLevel, SubjectName } from '../types';
import { getSubjectsForClass, getSubjectMeta, ALL_10_CLASSES_META } from './classCurriculumConfig';
import { getCurriculumQuestionsForLevel } from '../services/curriculumQuestionBank';
import {
  getClassDemoWorksheets,
  getClassSpecificWorksheetQuestions
} from './classDemoWorksheetsData';

export type WorksheetItemFormat =
  | 'mcq'
  | 'fill_blank'
  | 'match_following'
  | 'true_false'
  | 'short_answer'
  | 'long_answer'
  | 'math_exercise'
  | 'grammar_practice'
  | 'science_activity'
  | 'logical_reasoning'
  | 'chapter_exercise';

export const WORKSHEET_FORMAT_LABELS: Record<WorksheetItemFormat, { label: string; badgeColor: string; icon: string }> = {
  mcq: { label: 'MCQ', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: '🎯' },
  fill_blank: { label: 'Fill in the Blanks', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', icon: '✍️' },
  match_following: { label: 'Match the Following', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🔗' },
  true_false: { label: 'True or False', badgeColor: 'bg-teal-100 text-teal-800 border-teal-200', icon: '⚖️' },
  short_answer: { label: 'Short-Answer Question', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', icon: '📝' },
  long_answer: { label: 'Long-Answer / Structured', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200', icon: '📖' },
  math_exercise: { label: 'Mathematics Exercise', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '🔢' },
  grammar_practice: { label: 'Grammar Practice', badgeColor: 'bg-pink-100 text-pink-800 border-pink-200', icon: '🔤' },
  science_activity: { label: 'Science Activity', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '🔬' },
  logical_reasoning: { label: 'Logical Reasoning', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200', icon: '🧠' },
  chapter_exercise: { label: 'Chapter-Wise Exercise', badgeColor: 'bg-violet-100 text-violet-800 border-violet-200', icon: '📚' }
};

export interface WorksheetQuestionItem {
  id: string;
  number: number;
  format: WorksheetItemFormat;
  chapterTitle: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  modelWrittenAnswer?: string;
  explanation: string;
  marks: number;
}

export interface OnlineWorksheet {
  id: string;
  classLevel: ClassLevel;
  subject: SubjectName;
  worksheetNumber: 1 | 2;
  title: string;
  marathiSubtitle: string;
  chapterName: string;
  durationMinutes: number;
  totalMarks: number;
  isDemo?: boolean;
  formatsIncluded: WorksheetItemFormat[];
  questions: WorksheetQuestionItem[];
}

export function getFreeDemoWorksheetIdsForClass(classLevel: ClassLevel = 'Class 1'): readonly [string, string] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 1;
  const mathKey = cNum === 10 ? 'MATHEMATICSALGEBRA' : 'MATHEMATICS';
  return [`WS-C${cNum}-ENGLISH-1`, `WS-C${cNum}-${mathKey}-1`] as const;
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
  'Mathematics – Geometry': ['Chapter 1: Similarity of Triangles, Pythagoras Theorem & Circles', 'Chapter 2: Coordinate Geometry, Trigonometry & 3D Mensuration']
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
export function getWorksheetsForClassAndSubject(
  classLevel: ClassLevel,
  subject: SubjectName
): OnlineWorksheet[] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 4;
  const subjMeta = getSubjectMeta(subject);
  const classMeta = ALL_10_CLASSES_META.find(c => c.classLevel === classLevel);
  const chapters = SUBJECT_CHAPTER_THEMES[subject] || ['Chapter 1: Core Concepts', 'Chapter 2: Advanced Applications'];
  const classDemoIds = getFreeDemoWorksheetIdsForClass(classLevel);

  // Pull canonical questions from Levels 1-4 so worksheets are 100% syllabus-accurate and aligned with the class & subject
  const l1 = getCurriculumQuestionsForLevel(classLevel, subject, 1);
  const l2 = getCurriculumQuestionsForLevel(classLevel, subject, 2);
  const l3 = getCurriculumQuestionsForLevel(classLevel, subject, 3);
  const l4 = getCurriculumQuestionsForLevel(classLevel, subject, 4);

  const ws1Pool = [...l1.slice(0, 5), ...l2.slice(0, 5)];
  const ws2Pool = [...l3.slice(0, 5), ...l4.slice(0, 5)];

  const buildWorksheet = (wsNum: 1 | 2, pool: typeof ws1Pool, chapterName: string): OnlineWorksheet => {
    const wsId = `WS-C${cNum}-${subject.replace(/[^A-Za-z0-9]/g, '').toUpperCase()}-${wsNum}`;
    const formatsSet = new Set<WorksheetItemFormat>();

    const classSpecificQ =
      wsNum === 1 ? getClassSpecificWorksheetQuestions(classLevel, subject) : null;

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
      classLevel,
      subject,
      worksheetNumber: wsNum,
      title: `${classLevel} • ${subject} – Worksheet #${wsNum}`,
      marathiSubtitle: `${classMeta?.marathiLabel || classLevel} • ${subjMeta.marathiTitle} सराव कार्यपत्रिका ${wsNum}`,
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

export function getAllWorksheetsForClass(classLevel: ClassLevel): OnlineWorksheet[] {
  const subjects = getSubjectsForClass(classLevel);
  const list: OnlineWorksheet[] = [];
  for (const subj of subjects) {
    list.push(...getWorksheetsForClassAndSubject(classLevel, subj));
  }
  return list;
}

/**
 * Returns the strictly TWO designated Free Demo Worksheets for a student's or teacher's registered class:
 * 1. 1 English worksheet ('WS-C{N}-ENGLISH-1')
 * 2. 1 Mathematics worksheet ('WS-C{N}-MATHEMATICS-1' or 'WS-C10-MATHEMATICSALGEBRA-1')
 */
export function getFreeDemoWorksheets(classLevel: ClassLevel = 'Class 1'): OnlineWorksheet[] {
  const englishDemo = getWorksheetsForClassAndSubject(classLevel, 'English')[0];
  const mathSubject: SubjectName = classLevel === 'Class 10' ? 'Mathematics – Algebra' : 'Mathematics';
  const mathDemo = getWorksheetsForClassAndSubject(classLevel, mathSubject)[0];
  return [englishDemo, mathDemo].filter(Boolean);
}

/**
 * Returns the 4 unique, class-specific Demo Worksheets (Mathematics, English, Science, General Knowledge)
 * for the Visitor Demo Playground across Class 1 to Class 10.
 */
export function getVisitorDemoWorksheetsForClass(
  classLevel: ClassLevel = 'Class 1'
): OnlineWorksheet[] {
  return getClassDemoWorksheets(classLevel);
}


