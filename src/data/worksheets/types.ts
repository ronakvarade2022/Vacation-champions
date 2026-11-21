import { ClassLevel, EducationBoard, SubjectName } from '../../types';

export type WorksheetItemFormat =
  | 'mcq'
  | 'fill_blank'
  | 'match_following'
  | 'true_false'
  | 'one_word'
  | 'short_answer'
  | 'long_answer'
  | 'complete_sentence'
  | 'odd_one_out'
  | 'arrange_order'
  | 'identify_correct'
  | 'picture_based'
  | 'diagram_based'
  | 'application_based'
  | 'problem_solving'
  | 'case_based'
  | 'comprehension'
  | 'assertion_reason'
  | 'word_problem'
  | 'critical_thinking'
  | 'competency_based'
  | 'hots'
  | 'real_life'
  // Existing formats preserved for backward compatibility
  | 'math_exercise'
  | 'grammar_practice'
  | 'science_activity'
  | 'logical_reasoning'
  | 'chapter_exercise';

export type WorksheetDifficultyLevel = 'Foundation' | 'Intermediate' | 'Advanced' | 'HOTS';
export type WorksheetCollectionType = 'existing' | 'new_23';

export interface WorksheetFormatMeta {
  label: string;
  badgeColor: string;
  icon: string;
  requiresWrittenSpace?: boolean;
}

export const WORKSHEET_FORMAT_LABELS: Record<WorksheetItemFormat, WorksheetFormatMeta> = {
  mcq: { label: 'MCQ', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: '🎯' },
  fill_blank: { label: 'Fill in the Blanks', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', icon: '✍️' },
  match_following: { label: 'Match the Following', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🔗' },
  true_false: { label: 'True or False', badgeColor: 'bg-teal-100 text-teal-800 border-teal-200', icon: '⚖️' },
  one_word: { label: 'One-Word Answer', badgeColor: 'bg-sky-100 text-sky-800 border-sky-200', icon: '🔤', requiresWrittenSpace: true },
  short_answer: { label: 'Short-Answer Question', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', icon: '📝', requiresWrittenSpace: true },
  long_answer: { label: 'Long-Answer / Structured', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200', icon: '📖', requiresWrittenSpace: true },
  complete_sentence: { label: 'Complete the Sentence', badgeColor: 'bg-lime-100 text-lime-800 border-lime-200', icon: '✏️', requiresWrittenSpace: true },
  odd_one_out: { label: 'Find the Odd One Out', badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200', icon: '🔍' },
  arrange_order: { label: 'Arrange in Correct Order', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '🔢', requiresWrittenSpace: true },
  identify_correct: { label: 'Identify Correct Answer', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '✅' },
  picture_based: { label: 'Picture-Based Observation', badgeColor: 'bg-pink-100 text-pink-800 border-pink-200', icon: '🖼️' },
  diagram_based: { label: 'Diagram-Based Analysis', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300', icon: '📐', requiresWrittenSpace: true },
  application_based: { label: 'Application-Based', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200', icon: '⚙️', requiresWrittenSpace: true },
  problem_solving: { label: 'Problem-Solving', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: '🧮', requiresWrittenSpace: true },
  case_based: { label: 'Case-Based Study', badgeColor: 'bg-violet-100 text-violet-900 border-violet-300', icon: '📋', requiresWrittenSpace: true },
  comprehension: { label: 'Comprehension-Based', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300', icon: '📰', requiresWrittenSpace: true },
  assertion_reason: { label: 'Assertion & Reasoning', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300', icon: '💡' },
  word_problem: { label: 'Word Problem', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300', icon: '💬', requiresWrittenSpace: true },
  critical_thinking: { label: 'Critical Thinking', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300', icon: '🧭', requiresWrittenSpace: true },
  competency_based: { label: 'Competency-Based', badgeColor: 'bg-sky-100 text-sky-900 border-sky-300', icon: '🏆', requiresWrittenSpace: true },
  hots: { label: 'HOTS Challenge', badgeColor: 'bg-red-100 text-red-900 border-red-300', icon: '🚀', requiresWrittenSpace: true },
  real_life: { label: 'Real-Life Application', badgeColor: 'bg-green-100 text-green-900 border-green-300', icon: '🌍', requiresWrittenSpace: true },
  math_exercise: { label: 'Mathematics Exercise', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '🔢', requiresWrittenSpace: true },
  grammar_practice: { label: 'Grammar Practice', badgeColor: 'bg-pink-100 text-pink-800 border-pink-200', icon: '🔤' },
  science_activity: { label: 'Science Activity', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '🔬', requiresWrittenSpace: true },
  logical_reasoning: { label: 'Logical Reasoning', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200', icon: '🧠' },
  chapter_exercise: { label: 'Chapter-Wise Exercise', badgeColor: 'bg-violet-100 text-violet-800 border-violet-200', icon: '📚' },
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
  board?: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  worksheetNumber: number;
  worksheetCollection?: WorksheetCollectionType;
  title: string;
  marathiSubtitle: string;
  chapterName: string;
  topic?: string;
  learningObjectives?: string[];
  instructions?: string[];
  difficultyLevel?: WorksheetDifficultyLevel;
  durationMinutes: number;
  totalMarks: number;
  isDemo?: boolean;
  formatsIncluded: WorksheetItemFormat[];
  questions: WorksheetQuestionItem[];
}

export interface CompactWorksheetQuestionSpec {
  f: WorksheetItemFormat;
  q: string;
  o: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  e: string;
  m?: number;
  c?: string;
  w?: string;
}

export interface NewWorksheetSpec {
  worksheetNumber: number;
  subject: SubjectName;
  chapterName: string;
  topic: string;
  title: string;
  learningObjectives: string[];
  instructions?: string[];
  difficultyLevel: WorksheetDifficultyLevel;
  durationMinutes?: number;
  questions: CompactWorksheetQuestionSpec[];
}

const DEFAULT_INSTRUCTIONS_BY_DIFFICULTY: Record<WorksheetDifficultyLevel, string[]> = {
  Foundation: [
    'Read each question carefully and use the written scratchpad where provided to note key steps.',
    'Attempt all objective, fill-in-the-blank, matching, and visual questions carefully.',
    'Submit online to review instant marks and detailed concept explanations.',
  ],
  Intermediate: [
    'Show working steps or concise structured responses in the practice box before locking your answer.',
    'Pay close attention to units, grammar rules, and sequence order across mixed question patterns.',
    'Submit online to unlock model answers and reinforce chapter mastery.',
  ],
  Advanced: [
    'Analyse statements, diagrams, and real-world scenarios carefully before choosing the verified response.',
    'Use the written explanation box to structure multi-step reasoning and calculations.',
    'Complete all questions to earn full marks and review detailed step-by-step solutions.',
  ],
  HOTS: [
    'Apply higher-order thinking, assertion-reasoning logic, and cross-concept synthesis.',
    'Read case-study extracts thoroughly before answering competency-based items.',
    'Record your reasoning trace in the written space and submit online for complete evaluation.',
  ],
};

export function buildNew23Worksheets(
  board: EducationBoard,
  classLevel: ClassLevel,
  specs: NewWorksheetSpec[]
): OnlineWorksheet[] {
  const cNum = parseInt(classLevel.replace('Class ', ''), 10) || 1;
  const boardCode = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'MH';
  const boardPrefix = board === 'Maharashtra' ? 'Maharashtra Board' : board;

  return specs.map((spec) => {
    const subjCode = spec.subject
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 12);
    const wsId = `WS-NEW-${boardCode}-C${cNum}-${subjCode}-${spec.worksheetNumber}`;
    const formatsSet = new Set<WorksheetItemFormat>();
    let totalMarks = 0;

    const questions: WorksheetQuestionItem[] = spec.questions.map((item, idx) => {
      formatsSet.add(item.f);
      const marks = item.m ?? (item.f === 'long_answer' || item.f === 'case_based' || item.f === 'hots' ? 3 : 2);
      totalMarks += marks;
      return {
        id: `${wsId}-Q${idx + 1}`,
        number: idx + 1,
        format: item.f,
        chapterTitle: item.c || spec.topic,
        prompt: item.q,
        options: item.o,
        correctIndex: item.a,
        modelWrittenAnswer: item.w || `${item.o[item.a]} — ${item.e}`,
        explanation: item.e,
        marks,
      };
    });

    const durationMinutes =
      spec.durationMinutes ||
      (spec.difficultyLevel === 'HOTS' ? 25 : spec.difficultyLevel === 'Advanced' ? 22 : 18);

    return {
      id: wsId,
      board,
      classLevel,
      subject: spec.subject,
      worksheetNumber: spec.worksheetNumber,
      worksheetCollection: 'new_23',
      title: spec.title,
      marathiSubtitle: `${boardPrefix} • ${classLevel} • Syllabus Worksheet #${spec.worksheetNumber} (${spec.difficultyLevel})`,
      chapterName: spec.chapterName,
      topic: spec.topic,
      learningObjectives: spec.learningObjectives,
      instructions: spec.instructions || DEFAULT_INSTRUCTIONS_BY_DIFFICULTY[spec.difficultyLevel],
      difficultyLevel: spec.difficultyLevel,
      durationMinutes,
      totalMarks,
      isDemo: false,
      formatsIncluded: Array.from(formatsSet),
      questions,
    };
  });
}
