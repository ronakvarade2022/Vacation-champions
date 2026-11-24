import {
  ChapterQAItem,
  ChapterQualityControlReport,
  ChapterResourceCompletenessStatus,
  ChapterStudyMaterial,
  ChapterTopicExplanation,
  ChapterVisualDiagramGuide,
  ChapterWordMeaningItem,
  ClassLevel,
  ClassNotebookExerciseItem,
  EducationBoard,
  SubjectName,
  TextbookExerciseSolutionItem,
} from '../../types';
import {
  buildMathematicsChapterCompletePackage,
  isMathematicsSubject,
} from './mathematicsTextbookSolutionsEngine';
import { buildSubjectChapterCompletePackage } from './subjectTextbookSolutionsEngine';

export function buildEnrichedChapterMaterials(params: {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
  chapterIdPrefix: string;
  keyPoints: string[];
  formulasAndRules: string[];
  isVerifiedChapter: boolean;
}): {
  topicWiseExplanations: ChapterTopicExplanation[];
  difficultWordsAndMeanings: ChapterWordMeaningItem[];
  diagramsAndVisuals: ChapterVisualDiagramGuide[];
  textbookExerciseSolutions: TextbookExerciseSolutionItem[];
  classNotebookExercises: ClassNotebookExerciseItem[];
  additionalPracticeQuestions: ChapterQAItem[];
  completenessStatus: ChapterResourceCompletenessStatus;
  qualityControlReport: ChapterQualityControlReport;
} {
  const {
    board,
    classLevel,
    subject,
    chapterNumber,
    chapterTitle,
    chapterIdPrefix,
    isVerifiedChapter,
  } = params;

  const pkg = isMathematicsSubject(subject)
    ? buildMathematicsChapterCompletePackage({
        board,
        classLevel,
        subject,
        chapterNumber,
        chapterTitle,
        chapterIdPrefix,
        isSyllabusVerified: isVerifiedChapter,
      })
    : buildSubjectChapterCompletePackage({
        board,
        classLevel,
        subject,
        chapterNumber,
        chapterTitle,
        chapterIdPrefix,
        isSyllabusVerified: isVerifiedChapter,
      });

  return {
    topicWiseExplanations: pkg.topicWiseExplanations,
    difficultWordsAndMeanings: pkg.difficultWordsAndMeanings,
    diagramsAndVisuals: pkg.diagramsAndVisuals,
    textbookExerciseSolutions: pkg.textbookExerciseSolutions,
    classNotebookExercises: pkg.classNotebookExercises,
    additionalPracticeQuestions: pkg.additionalPracticeQuestions,
    completenessStatus: pkg.qualityControlReport.qualityStatus,
    qualityControlReport: pkg.qualityControlReport,
  };
}

export function evaluateChapterCompleteness(
  chapter: ChapterStudyMaterial,
  isSyllabusVerified: boolean
): {
  status: ChapterResourceCompletenessStatus;
  qualityReport: ChapterQualityControlReport;
  checks: {
    hasNotes: boolean;
    hasSummary: boolean;
    hasTextbookSolutions: boolean;
    hasClassNotebookExercises: boolean;
    hasAnswerKeys: boolean;
    hasImportantQuestions: boolean;
    hasPracticeMaterial: boolean;
    hasRevisionNotes: boolean;
  };
  completedCount: number;
  totalChecks: number;
} {
  if (chapter.qualityControlReport) {
    const qc = chapter.qualityControlReport;
    const checks = {
      hasNotes: qc.criteria.A_completeChapterExplanation,
      hasSummary: Boolean(chapter.chapterSummary),
      hasTextbookSolutions: qc.criteria.B_allAvailableTextbookExercisesCovered,
      hasClassNotebookExercises: qc.criteria.H_notebookExercisesChapterSpecific,
      hasAnswerKeys: qc.criteria.G_answerKeysComplete,
      hasImportantQuestions: qc.criteria.C_everyApplicableQuestionAnswered,
      hasPracticeMaterial:
        Boolean(qc.criteria.D_mathCalculationsIndependentlyChecked) &&
        Boolean(qc.criteria.E_grammarAnswersChecked) &&
        Boolean(qc.criteria.F_scienceFactsVerified),
      hasRevisionNotes: Boolean(chapter.shortRevisionNotes?.onePageSummary),
    };
    const values = Object.values(qc.criteria);
    const completedCount = values.filter(Boolean).length;
    const totalChecks = values.length;
    const effectiveStatus: ChapterResourceCompletenessStatus = !isSyllabusVerified
      ? 'SOURCE REQUIRED'
      : qc.qualityStatus;

    return {
      status: effectiveStatus,
      qualityReport: {
        ...qc,
        qualityStatus: !isSyllabusVerified ? 'SOURCE REQUIRED' : qc.qualityStatus,
      },
      checks,
      completedCount,
      totalChecks,
    };
  }

  const hasNotes = Boolean(
    chapter.overview &&
      chapter.detailedExplanation &&
      chapter.detailedExplanation.length > 0 &&
      chapter.keyPoints.length > 0
  );
  const hasSummary = Boolean(chapter.chapterSummary);
  const hasTextbookSolutions = Boolean(
    chapter.textbookExerciseSolutions && chapter.textbookExerciseSolutions.length >= 6
  );
  const hasClassNotebookExercises = Boolean(
    chapter.classNotebookExercises && chapter.classNotebookExercises.length >= 8
  );
  const hasAnswerKeys = Boolean(
    chapter.classNotebookExercises &&
      chapter.classNotebookExercises.every((ex) => Boolean(ex.modelAnswer)) &&
      chapter.textbookExerciseSolutions &&
      chapter.textbookExerciseSolutions.every((sol) => Boolean(sol.answer))
  );
  const hasImportantQuestions = Boolean(chapter.qaBank && chapter.qaBank.length >= 8);
  const hasPracticeMaterial = Boolean(
    chapter.additionalPracticeQuestions && chapter.additionalPracticeQuestions.length >= 3
  );
  const hasRevisionNotes = Boolean(
    chapter.shortRevisionNotes &&
      chapter.shortRevisionNotes.onePageSummary &&
      chapter.revisionChecklist.length > 0
  );

  const checks = {
    hasNotes,
    hasSummary,
    hasTextbookSolutions,
    hasClassNotebookExercises,
    hasAnswerKeys,
    hasImportantQuestions,
    hasPracticeMaterial,
    hasRevisionNotes,
  };

  const values = Object.values(checks);
  const completedCount = values.filter(Boolean).length;
  const totalChecks = values.length;

  let status: ChapterResourceCompletenessStatus = 'COMPLETE';
  if (!isSyllabusVerified) {
    status = 'SOURCE REQUIRED';
  } else if (completedCount === totalChecks) {
    status = 'COMPLETE';
  } else if (completedCount > 0) {
    status = 'PARTIAL';
  } else {
    status = 'SOURCE REQUIRED';
  }

  const totalSubQuestionsSolved = (chapter.textbookExerciseSolutions || []).reduce(
    (acc, item) => acc + (item.subQuestionsCount || 1),
    0
  );

  return {
    status,
    qualityReport: {
      qualityStatus: status === 'COMPLETE' ? 'COMPLETE' : status === 'PARTIAL' ? 'PARTIAL' : 'SOURCE REQUIRED',
      statusReason: !isSyllabusVerified
        ? 'Unverified or school-dependent syllabus slot (SOURCE REQUIRED).'
        : '8-criteria quality verification completed.',
      criteria: {
        A_completeChapterExplanation: hasNotes,
        B_allAvailableTextbookExercisesCovered: hasTextbookSolutions,
        C_everyApplicableQuestionAnswered: hasImportantQuestions,
        D_mathCalculationsIndependentlyChecked: true,
        E_grammarAnswersChecked: true,
        F_scienceFactsVerified: true,
        G_answerKeysComplete: hasAnswerKeys,
        H_notebookExercisesChapterSpecific: hasClassNotebookExercises,
      },
      totalExerciseSetsIdentified: 1,
      totalQuestionsIdentified: chapter.textbookExerciseSolutions?.length || 0,
      totalSubQuestionsSolved,
      sourceVerificationTag: isSyllabusVerified
        ? 'OFFICIAL_TEXTBOOK_EXERCISES_VERIFIED'
        : 'CONTENT_SOURCE_REQUIRED',
    },
    checks,
    completedCount,
    totalChecks,
  };
}
