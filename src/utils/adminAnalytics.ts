import type { ClassLevel, EducationBoard, QuizQuestion, SubjectName } from '../types';
import { normalizeBoardValue } from './subscriptionAccess';
import type { QuestionBankAnalytics } from '../services/questionBankService';

export const ALL_ADMIN_CLASSES: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export const ALL_ADMIN_SUBJECTS: SubjectName[] = [
  'Mathematics',
  'English',
  'Hindi',
  'Marathi',
  'Science',
  'General Knowledge',
  'Social Studies',
  'History',
  'Geography',
  'Computer Knowledge',
  'Logical Reasoning',
  'Environmental Studies',
  'Moral Education',
  'Vocabulary and Grammar',
  'Drawing and Creative Activities',
  'Physics',
  'Chemistry',
  'Biology',
  'Political Science',
  'Information Technology',
  'Environmental Education',
  'Physical Education',
  'Mathematics – Algebra',
  'Mathematics – Geometry',
  'Social Science',
  'History & Civics',
  'Computer Studies',
  'Computer Applications',
  'Economics',
  'Commercial Studies',
  'Sanskrit',
];

export interface QuestionBoardClassIndex {
  byBoard: Record<EducationBoard, QuizQuestion[]>;
  byBoardAndClass: Record<string, QuizQuestion[]>;
  byClass: Record<string, QuizQuestion[]>;
  boardCounts: Record<EducationBoard, number>;
  total: number;
}

/**
 * Single O(N) pass to pre-index questions by board and classLevel.
 * Subsequent switches between Maharashtra, CBSE, ICSE, and Class 1-10 are O(1) map lookups.
 */
export function buildQuestionBoardClassIndex(questions: QuizQuestion[]): QuestionBoardClassIndex {
  const byBoard: Record<EducationBoard, QuizQuestion[]> = {
    Maharashtra: [],
    CBSE: [],
    ICSE: [],
  };
  const byBoardAndClass: Record<string, QuizQuestion[]> = {};
  const byClass: Record<string, QuizQuestion[]> = {};

  for (const q of questions) {
    const b = normalizeBoardValue(q.board || 'Maharashtra');
    byBoard[b].push(q);

    const bcKey = `${b}__${q.classLevel}`;
    if (!byBoardAndClass[bcKey]) byBoardAndClass[bcKey] = [];
    byBoardAndClass[bcKey].push(q);

    if (!byClass[q.classLevel]) byClass[q.classLevel] = [];
    byClass[q.classLevel].push(q);
  }

  return {
    byBoard,
    byBoardAndClass,
    byClass,
    boardCounts: {
      Maharashtra: byBoard.Maharashtra.length,
      CBSE: byBoard.CBSE.length,
      ICSE: byBoard.ICSE.length,
    },
    total: questions.length,
  };
}

export interface BoardAwareQuestionAnalytics extends QuestionBankAnalytics {
  boardCounts: Record<EducationBoard, number>;
}

/**
 * Single-pass analytics calculation scoped to either all boards or the selected independent board.
 */
export function computeBoardAwareQuestionAnalytics(
  questions: QuizQuestion[],
  boardFilter: 'all' | EducationBoard = 'all'
): BoardAwareQuestionAnalytics {
  const classCounts: Record<ClassLevel, number> = {
    'Class 1': 0,
    'Class 2': 0,
    'Class 3': 0,
    'Class 4': 0,
    'Class 5': 0,
    'Class 6': 0,
    'Class 7': 0,
    'Class 8': 0,
    'Class 9': 0,
    'Class 10': 0,
  };

  const subjectCounts: Record<SubjectName, number> = {
    Mathematics: 0,
    English: 0,
    Hindi: 0,
    Marathi: 0,
    Science: 0,
    'General Knowledge': 0,
    'Social Studies': 0,
    History: 0,
    Geography: 0,
    'Computer Knowledge': 0,
    'Logical Reasoning': 0,
    'Environmental Studies': 0,
    'Moral Education': 0,
    'Vocabulary and Grammar': 0,
    'Drawing and Creative Activities': 0,
    Physics: 0,
    Chemistry: 0,
    Biology: 0,
    'Political Science': 0,
    'Information Technology': 0,
    'Environmental Education': 0,
    'Physical Education': 0,
    'Mathematics – Algebra': 0,
    'Mathematics – Geometry': 0,
    'Social Science': 0,
    'History & Civics': 0,
    'Computer Studies': 0,
    'Computer Applications': 0,
    Economics: 0,
    'Commercial Studies': 0,
    Sanskrit: 0,
  };

  const boardCounts: Record<EducationBoard, number> = {
    Maharashtra: 0,
    CBSE: 0,
    ICSE: 0,
  };
  const typeCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
  let totalCount = 0;

  for (const q of questions) {
    const qBoard = normalizeBoardValue(q.board || 'Maharashtra');
    boardCounts[qBoard]++;

    if (boardFilter !== 'all' && qBoard !== boardFilter) {
      continue;
    }

    totalCount++;
    if (classCounts[q.classLevel] !== undefined) {
      classCounts[q.classLevel]++;
    }
    if (subjectCounts[q.subject] !== undefined) {
      subjectCounts[q.subject]++;
    }
    const qType = q.questionType || 'mcq';
    typeCounts[qType] = (typeCounts[qType] || 0) + 1;
    if (q.difficulty) {
      difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
    }
  }

  const warnings: string[] = [];
  for (const [cls, count] of Object.entries(classCounts)) {
    if (count < 10) {
      warnings.push(
        `${cls} currently has only ${count} approved questions (minimum recommended: 10 per subject).`
      );
    }
  }

  return {
    totalCount,
    classCounts,
    subjectCounts,
    typeCounts,
    difficultyCounts,
    warnings,
    boardCounts,
  };
}
