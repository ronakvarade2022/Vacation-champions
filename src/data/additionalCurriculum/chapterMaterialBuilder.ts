import type { ClassLevel } from '../../types';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalMcqQuestion,
  type AdditionalShortAnswer,
  type AdditionalSubjectId,
  type AdditionalWorksheetItem,
  type LocalizedTextMap,
} from '../../types/additionalCurriculum';
import { ALL_ADDITIONAL_BOARDS } from './subjectsCatalog';

export interface CompactMcqSeed {
  q: string;
  opts: [string, string, string, string];
  ans: 0 | 1 | 2 | 3;
  exp: string;
}

export interface CompactChapterSeed {
  subjectId: AdditionalSubjectId;
  classNumber: number;
  chapterNumber: number;
  title: string;
  mrTitle: string;
  hiTitle: string;
  concept: string;
  objectives: [string, string, string];
  examples: [{ title: string; detail: string }, { title: string; detail: string }];
  activity: { title: string; materials: string[]; steps: string[] };
  mcqs: [CompactMcqSeed, CompactMcqSeed, CompactMcqSeed, CompactMcqSeed];
  shortAnswers: [
    { q: string; a: string },
    { q: string; a: string },
    { q: string; a: string },
  ];
  worksheetExtras: [
    { type: AdditionalWorksheetItem['type']; prompt: string; answer: string },
    { type: AdditionalWorksheetItem['type']; prompt: string; answer: string },
    { type: AdditionalWorksheetItem['type']; prompt: string; answer: string },
    { type: AdditionalWorksheetItem['type']; prompt: string; answer: string },
  ];
  teacherTip: string;
}

export function getStageGuidance(classNumber: number): {
  periods: number;
  differentiation: string;
  assessmentCue: string;
} {
  if (classNumber <= 2) {
    return {
      periods: 2,
      differentiation:
        'Use picture cards, storytelling, and oral check-ins for early readers; pair students during hands-on sorting tasks.',
      assessmentCue:
        'Observe verbal recall, visual pointing, and participation during the guided activity rather than timed written tests.',
    };
  }
  if (classNumber <= 5) {
    return {
      periods: 2,
      differentiation:
        'Provide worked step-by-step models for learners needing scaffolding and open-ended extension prompts for fast finishers.',
      assessmentCue:
        'Review practice worksheet accuracy and ask learners to explain one real-life example in their own words.',
    };
  }
  if (classNumber <= 8) {
    return {
      periods: 3,
      differentiation:
        'Facilitate pair discussion and peer explanation; offer visual graphic organizers alongside analytical challenge prompts.',
      assessmentCue:
        'Combine 4-option MCQ conceptual check with short structured responses requiring clear reasoning.',
    };
  }
  return {
    periods: 3,
    differentiation:
      'Encourage independent inquiry, real-world case analysis, and structured debate while supporting core concept summaries.',
    assessmentCue:
      'Evaluate applied reasoning in short-answer responses, real-world decision quality, and revision synthesis.',
  };
}

export function hydrateCompactChapterSeed(seed: CompactChapterSeed): AdditionalChapterRecord {
  const classLevel = `Class ${seed.classNumber}` as ClassLevel;
  const chapterId = `MSZ-ADD-${seed.subjectId}-C${seed.classNumber}-CH${seed.chapterNumber}`;
  const stage = getStageGuidance(seed.classNumber);

  const localizedTitles: LocalizedTextMap = {
    English: seed.title,
    Marathi: seed.mrTitle,
    Hindi: seed.hiTitle,
  };

  const mcqQuiz: AdditionalMcqQuestion[] = seed.mcqs.map((m, idx) => ({
    id: `${chapterId}-MCQ-${idx + 1}`,
    question: m.q,
    options: m.opts,
    correctIndex: m.ans,
    explanation: m.exp,
    difficulty: idx === 0 ? 'easy' : idx < 3 ? 'medium' : 'challenge',
  }));

  const shortAnswerQuestions: AdditionalShortAnswer[] = seed.shortAnswers.map((sa, idx) => ({
    id: `${chapterId}-SA-${idx + 1}`,
    question: sa.q,
    modelAnswer: sa.a,
    marks: seed.classNumber <= 5 ? 2 : 3,
  }));

  const worksheetItems: AdditionalWorksheetItem[] = seed.worksheetExtras.map((w, idx) => ({
    id: `${chapterId}-WS-${idx + 1}`,
    type: w.type,
    prompt: w.prompt,
    answer: w.answer,
  }));

  return {
    chapterId,
    subjectId: seed.subjectId,
    classLevel,
    classNumber: seed.classNumber,
    chapterNumber: seed.chapterNumber,
    title: seed.title,
    localizedTitles,
    applicableBoards: [...ALL_ADDITIONAL_BOARDS],
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
    workflowStatus: 'PUBLISHED',
    reviewedBy: 'MyStudyZone Curriculum Editorial Desk',
    updatedAt: '2026-11-23',
    learningObjectives: [...seed.objectives],
    materials: {
      simpleExplanation: seed.concept,
      keyTakeaways: [
        seed.objectives[0],
        seed.objectives[1],
        seed.objectives[2],
      ],
      workedExamples: [seed.examples[0], seed.examples[1]],
      handsOnActivity: {
        title: seed.activity.title,
        materialsNeeded: seed.activity.materials,
        steps: seed.activity.steps,
      },
      practiceWorksheet: {
        worksheetId: `${chapterId}-WORKSHEET`,
        title: `${seed.title} — Practice Worksheet (${classLevel})`,
        estimatedMinutes: seed.classNumber <= 4 ? 15 : 20,
        instructions:
          'Read each item carefully and write clear, original responses. Check your work against the Answer Key after completing all items.',
        items: worksheetItems,
      },
      mcqQuiz,
      shortAnswerQuestions,
      revisionExercises: [
        `Summarize the core idea of "${seed.title}" in three concise points without looking at the notes.`,
        `Connect "${seed.title}" to one situation from your school, home, or community and explain why it matters.`,
        `Review any missed MCQ or worksheet item and restate the correct reasoning in your own words.`,
      ],
      teacherGuidance: {
        suggestedPeriods: stage.periods,
        classroomStrategy: seed.teacherTip,
        differentiationTip: stage.differentiation,
        assessmentCue: stage.assessmentCue,
      },
    },
  };
}
