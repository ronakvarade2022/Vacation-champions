import { ClassLevel, EducationBoard } from '../types';

export type PublishableLearningContentKind =
  | 'worksheet'
  | 'quiz'
  | 'notes'
  | 'video'
  | 'exam_paper'
  | 'textbook'
  | 'study_material_item';

/**
 * Global Student Learning Content Publication Freeze
 *
 * Enforced after the 382-entry Syllabus Accuracy Audit confirmed that all 382 student-facing
 * subject entries rely on unverified/synthetic chapter mappings (`getRichChaptersForSubject()`
 * and `SUBJECT_CHAPTER_THEMES`).
 *
 * Guarantees:
 * 1. Stops publishing newly generated unverified worksheets, quizzes, notes, videos, and exam papers.
 * 2. Stops runtime auto-generation of new unverified quiz questions.
 * 3. Preserves 100% of existing student content, accounts, payments, submissions, scores, and progress.
 */
export const CONTENT_PUBLICATION_FREEZE = {
  stopNewUnverifiedPublishing: true,
  stopRuntimeQuizSynthesis: true,
  verifiedStudentEntriesCount: 0,
  totalAuditedEntriesCount: 382,
  freezeNotice:
    'Publishing newly generated unverified worksheets, quizzes, notes, videos, and exam papers is paused pending central syllabus verification across Maharashtra SSC, CBSE, and ICSE (Classes 1–10).',
} as const;

export function isStudentSyllabusEntryVerified(
  _board: EducationBoard,
  _classLevel: ClassLevel,
  _subject: string
): boolean {
  // All 382 student-facing subject entries remain unverified until the central verified syllabus migration executes.
  return false;
}

export function canPublishStudentLearningContent(params: {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: string;
  contentKind: PublishableLearningContentKind;
}): { allowed: boolean; reason?: string } {
  if (!CONTENT_PUBLICATION_FREEZE.stopNewUnverifiedPublishing) {
    return { allowed: true };
  }
  if (isStudentSyllabusEntryVerified(params.board, params.classLevel, params.subject)) {
    return { allowed: true };
  }
  return {
    allowed: false,
    reason: `Publication blocked: ${params.board} · ${params.classLevel} · ${params.subject} (${params.contentKind}) is unverified. ${CONTENT_PUBLICATION_FREEZE.freezeNotice}`,
  };
}

export function canGenerateRuntimeQuizQuestions(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: string
): boolean {
  if (CONTENT_PUBLICATION_FREEZE.stopRuntimeQuizSynthesis) {
    return isStudentSyllabusEntryVerified(board, classLevel, subject);
  }
  return true;
}
