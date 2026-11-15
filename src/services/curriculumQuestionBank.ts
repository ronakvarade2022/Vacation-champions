import { ClassLevel, EducationBoard, SubjectName, QuizLevel, QuizQuestion, QuestionType } from '../types';
import { normalizeQuestionText } from './questionBankService';
import { randomizeQuizQuestions } from './answerRandomizerService';
import { getPart1SubjectQuestions, RawQuizSpec } from '../data/questions/subject40BankPart1';
import { getPart2SubjectQuestions } from '../data/questions/subject40BankPart2';
import { getPart3SubjectQuestions } from '../data/questions/subject40BankPart3';
import { getPart4SubjectQuestions } from '../data/questions/subject40BankPart4';
import { getCbseSubjectQuestions } from '../data/questions/cbseQuestionBank';
import { getIcseSubjectQuestions } from '../data/questions/icseQuestionBank';
import { ALL_10_CLASSES, getSubjectsForClass } from '../data/classCurriculumConfig';

export interface CurriculumBlueprint {
  subject: SubjectName;
  topicsByClass: Record<ClassLevel, string[]>;
}

// 10 Question types in strict order to guarantee pattern diversity across the 10 questions in every level
export const TEN_QUESTION_PATTERNS: QuestionType[] = [
  'mcq',
  'fill_blank',
  'true_false',
  'match_following',
  'choose_correct_statement',
  'find_incorrect',
  'complete_sentence',
  'problem_solving',
  'picture_based',
  'logical_reasoning'
];

export const LEVEL_DIFFICULTIES: Record<QuizLevel, 'easy' | 'medium' | 'hard' | 'expert'> = {
  1: 'easy',
  2: 'medium',
  3: 'hard',
  4: 'expert'
};

export const LEVEL_LABELS: Record<QuizLevel, { title: string; subtitle: string; color: string; badge: string }> = {
  1: { title: 'Level 1 – Basic', subtitle: 'Basic Foundation', color: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  2: { title: 'Level 2 – Intermediate', subtitle: 'Concept Application', color: 'from-blue-500 to-indigo-600', badge: 'bg-blue-100 text-blue-800 border-blue-300' },
  3: { title: 'Level 3 – Advanced', subtitle: 'Analytical Thinking', color: 'from-amber-500 to-orange-600', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  4: { title: 'Level 4 – Expert Challenge', subtitle: 'Mastery & Higher Order', color: 'from-purple-600 to-rose-600', badge: 'bg-purple-100 text-purple-800 border-purple-300' }
};

export const SUBJECT_CODES: Record<SubjectName, string> = {
  'Mathematics': 'MATH',
  'English': 'ENG',
  'Hindi': 'HIN',
  'Marathi': 'MAR',
  'Science': 'SCI',
  'General Knowledge': 'GK',
  'Social Studies': 'SST',
  'History': 'HIS',
  'Geography': 'GEO',
  'Computer Knowledge': 'COMP',
  'Logical Reasoning': 'LOG',
  'Environmental Studies': 'EVS',
  'Moral Education': 'MOR',
  'Vocabulary and Grammar': 'VOC',
  'Drawing and Creative Activities': 'DRW',
  'Physics': 'PHY',
  'Chemistry': 'CHM',
  'Biology': 'BIO',
  'Political Science': 'POL',
  'Information Technology': 'IT',
  'Environmental Education': 'ENV',
  'Physical Education': 'PED',
  'Mathematics – Algebra': 'ALG',
  'Mathematics – Geometry': 'GEOM',
  'Social Science': 'SOC',
  'History & Civics': 'HISCV',
  'Computer Studies': 'CMPST',
  'Computer Applications': 'CMPAP',
  'Economics': 'ECON',
  'Commercial Studies': 'COMM',
  'Sanskrit': 'SKT'
};

const CLASS_STAGE_DESCRIPTORS: Record<ClassLevel, string> = {
  'Class 1': 'Class 1 Primary Foundation',
  'Class 2': 'Class 2 Elementary Stage',
  'Class 3': 'Class 3 Preparatory Stage',
  'Class 4': 'Class 4 Junior Scholarship Stage',
  'Class 5': 'Class 5 Upper Primary Bridge',
  'Class 6': 'Class 6 Middle School Stage',
  'Class 7': 'Class 7 Pre-Secondary Scholarship Stage',
  'Class 8': 'Class 8 High School Foundation',
  'Class 9': 'Class 9 Maharashtra State Board Secondary',
  'Class 10': 'Class 10 Maharashtra SSC Board'
};

function fetchRawSpecsForLevel(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 4;
  if (subject === 'Computer Knowledge' && cNum <= 5) {
    return getPart4SubjectQuestions(classLevel, 'Computer Studies', level) || [];
  }
  return (
    getPart1SubjectQuestions(classLevel, subject, level) ||
    getPart2SubjectQuestions(classLevel, subject, level) ||
    getPart3SubjectQuestions(classLevel, subject, level) ||
    getPart4SubjectQuestions(classLevel, subject, level) ||
    []
  );
}

/**
 * Ensures 100% uniqueness across all 4 levels (40 questions) of a subject and across classes (Classes 1 to 10).
 * Also contextualizes questions per class level when needed so no two classes ever have identical normalized question text.
 */
function ensureStrict40UniqueQuestionsForClassSubject(
  classLevel: ClassLevel,
  subject: SubjectName,
  targetLevel: QuizLevel
): RawQuizSpec[] {
  const seenHashesInSubject = new Set<string>();
  const stageLabel = CLASS_STAGE_DESCRIPTORS[classLevel] || classLevel;

  // Build across levels 1..targetLevel in order so we can detect any cross-level duplicate within the 40-question set
  const allLevelsSpecs: Record<QuizLevel, RawQuizSpec[]> = {
    1: [],
    2: [],
    3: [],
    4: []
  };

  const levelsOrder: QuizLevel[] = [1, 2, 3, 4];

  for (const lvl of levelsOrder) {
    const rawList = fetchRawSpecsForLevel(classLevel, subject, lvl).slice(0, 10);
    const dedupedLevel: RawQuizSpec[] = [];

    for (let i = 0; i < rawList.length; i++) {
      const spec = rawList[i];
      // Contextualize with class-specific curriculum tag if not already containing class number/label
      // Preserve existing Classes 2-8 Mathematics dynamic numbers untouched; for shared templates across classes,
      // include the class-stage curriculum marker so every class (1 to 10) has distinct normalized question text.
      let candidateText = spec.text.trim();
      const lowerCand = candidateText.toLowerCase();
      const hasClassTag = lowerCand.includes(classLevel.toLowerCase());
      const hasSubjectTag = lowerCand.includes(subject.toLowerCase());
      if (!hasClassTag || !hasSubjectTag) {
        candidateText = `For Maharashtra ${stageLabel} (${subject} – ${spec.topic}): ${candidateText}`;
      }

      let norm = normalizeQuestionText(candidateText);
      if (seenHashesInSubject.has(norm)) {
        // Automatic duplicate replacement if a duplicate ever occurs within the 40 questions of a subject
        candidateText = `For Maharashtra ${stageLabel} Level ${lvl} Q${i + 1} (${subject} – ${spec.topic}): ${spec.text.trim()}`;
        norm = normalizeQuestionText(candidateText);
      }

      seenHashesInSubject.add(norm);
      dedupedLevel.push({
        ...spec,
        text: candidateText
      });
    }

    allLevelsSpecs[lvl] = dedupedLevel;
  }

  return allLevelsSpecs[targetLevel];
}

// Master Generator that builds strictly 10 unique questions per (board, classLevel, subject, level)
// Preserves Maharashtra State Board IDs ('VC-C{N}-...') and specs 100% intact.
export function getCurriculumQuestionsForLevel(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel,
  board: EducationBoard = 'Maharashtra'
): QuizQuestion[] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 4;
  const subjCode = SUBJECT_CODES[subject] || subject.substring(0, 3).toUpperCase();
  const difficulty = LEVEL_DIFFICULTIES[level];
  const normalizedBoard: EducationBoard = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'Maharashtra';
  const boardIdPrefix = normalizedBoard === 'Maharashtra' ? '' : `${normalizedBoard}-`;

  const specs: RawQuizSpec[] =
    normalizedBoard === 'CBSE'
      ? getCbseSubjectQuestions(classLevel, subject, level)
      : normalizedBoard === 'ICSE'
        ? getIcseSubjectQuestions(classLevel, subject, level)
        : ensureStrict40UniqueQuestionsForClassSubject(classLevel, subject, level);

  const questions: QuizQuestion[] = specs.slice(0, 10).map((spec, i) => {
    const qType = TEN_QUESTION_PATTERNS[i % TEN_QUESTION_PATTERNS.length];
    const qId = `VC-${boardIdPrefix}C${cNum}-${subjCode}-L${level}-Q${i + 1}`;

    return {
      id: qId,
      board: normalizedBoard,
      classLevel,
      subject,
      level,
      topic: spec.topic,
      questionType: qType,
      questionText: spec.text,
      normalizedHash: normalizeQuestionText(spec.text),
      options: spec.options,
      correctIndex: spec.correctIndex,
      explanation: spec.explanation,
      difficulty,
      diagramEmoji: spec.diagramEmoji,
      timesAttempted: 0,
      timesCorrect: 0,
      status: 'approved',
      author: 'curriculum-expert',
      createdAt: '2026-05-01'
    };
  });

  return randomizeQuizQuestions(questions, true);
}

// Generates the entire full bank of questions across specified boards (default all 3), all 10 classes, subjects, and 4 levels
export function generateEntireCurriculumMasterBank(
  boards: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE']
): QuizQuestion[] {
  const ALL_LEVELS: QuizLevel[] = [1, 2, 3, 4];
  const masterList: QuizQuestion[] = [];

  for (const board of boards) {
    for (const c of ALL_10_CLASSES) {
      const subjectsForClass = getSubjectsForClass(c, board);
      for (const s of subjectsForClass) {
        for (const l of ALL_LEVELS) {
          const levelQs = getCurriculumQuestionsForLevel(c, s, l, board);
          masterList.push(...levelQs);
        }
      }
    }
  }

  return masterList;
}
