import { ClassLevel, EducationBoard, StudentProfile, SubjectName } from '../types';
import {
  ADDITIONAL_CLASS_SUBJECTS,
  CORE_14_SUBJECTS,
  SubjectMetaItem,
} from '../data/classCurriculumConfig';
import { SYLLABUS_FEATURE_FLAGS } from '../data/verifiedSyllabus/syllabusFeatureFlags';

/**
 * READ-ONLY LEGACY ID COMPATIBILITY & PROGRESS PRESERVATION LAYER (PHASE 2)
 *
 * Guarantees:
 * 1. Never mutates Firestore records, payment entitlements, or historical attempt arrays.
 * 2. Recognizes and preserves all historical MyStudyZone IDs (`WS-*`, `WS-NEW-*`, `VC-*`,
 *    `CHTEST-*`, `NOTES-*`, `VID-*`, `MP-*`, `PYQ-*`, `TB-*`) across syllabus updates.
 * 3. Ensures legacy completed worksheets, attempted questions, scores, and unlocked classes
 *    remain permanently valid regardless of future chapter re-indexing.
 */

export type LegacyContentIdFamily =
  | 'WORKSHEET_CLASSIC'
  | 'WORKSHEET_23_SET'
  | 'QUIZ_QUESTION'
  | 'CHAPTER_TEST'
  | 'STUDY_NOTES'
  | 'VIDEO_GUIDE'
  | 'MODEL_PAPER'
  | 'PYQ_PAPER'
  | 'TEXTBOOK'
  | 'UNKNOWN_CUSTOM';

export interface ParsedLegacyContentId {
  rawId: string;
  family: LegacyContentIdFamily;
  isHistoricalPreserved: boolean;
  board?: EducationBoard;
  classLevel?: ClassLevel;
  subject?: SubjectName;
  rawSubjectToken?: string;
}

export interface LegacyProgressPreservationSummary {
  preserveFlagEnabled: boolean;
  studentId: string;
  totalCompletedWorksheets: number;
  preservedHistoricalWorksheetIds: string[];
  totalWorksheetAttempts: number;
  totalAttemptedQuestions: number;
  preservedHistoricalQuestionIds: string[];
  totalAttemptedScholarshipQuestions: number;
  activatedClassKeysCount: number;
  subjectProgressKeysCount: number;
}

const ALL_SUBJECT_META: SubjectMetaItem[] = [
  ...CORE_14_SUBJECTS,
  ...ADDITIONAL_CLASS_SUBJECTS,
];

function buildSubjectTokenMap(): Record<string, SubjectName> {
  const map: Record<string, SubjectName> = {
    MAT: 'Mathematics',
  };
  for (const meta of ALL_SUBJECT_META) {
    const cleanFull = meta.name.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const shortUpper = meta.shortCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    map[cleanFull] = meta.name;
    map[shortUpper] = meta.name;
  }
  return map;
}

const SUBJECT_TOKEN_MAP = buildSubjectTokenMap();

function parseBoardToken(token?: string): EducationBoard | undefined {
  if (!token) return undefined;
  const upper = token.toUpperCase();
  if (upper === 'CBSE') return 'CBSE';
  if (upper === 'ICSE') return 'ICSE';
  if (upper === 'MH' || upper === 'MAHARASHTRA') return 'Maharashtra';
  return undefined;
}

function parseClassToken(token?: string): ClassLevel | undefined {
  if (!token) return undefined;
  const m = token.match(/^C([1-9]|10)$/i);
  if (!m) return undefined;
  return `Class ${m[1]}` as ClassLevel;
}

export function parseLegacyContentId(rawId: string): ParsedLegacyContentId {
  const id = String(rawId || '').trim();
  if (!id) {
    return { rawId: id, family: 'UNKNOWN_CUSTOM', isHistoricalPreserved: false };
  }

  // 1. WS-NEW-{MH|CBSE|ICSE}-C{N}-{SUBJ}-{NUM}
  const wsNewMatch = id.match(/^WS-NEW-(MH|CBSE|ICSE)-(C(?:10|[1-9]))-([A-Z0-9]+)-(\d+)$/i);
  if (wsNewMatch) {
    const rawSubj = wsNewMatch[3].toUpperCase();
    return {
      rawId: id,
      family: 'WORKSHEET_23_SET',
      isHistoricalPreserved: true,
      board: parseBoardToken(wsNewMatch[1]),
      classLevel: parseClassToken(wsNewMatch[2]),
      subject: SUBJECT_TOKEN_MAP[rawSubj],
      rawSubjectToken: rawSubj,
    };
  }

  // 2. WS-[CBSE-|ICSE-]C{N}-{SUBJ}-{NUM}
  const wsClassicMatch = id.match(/^WS-(?:(CBSE|ICSE)-)?(C(?:10|[1-9]))-([A-Z0-9]+)-(\d+)$/i);
  if (wsClassicMatch) {
    const rawSubj = wsClassicMatch[3].toUpperCase();
    return {
      rawId: id,
      family: 'WORKSHEET_CLASSIC',
      isHistoricalPreserved: true,
      board: wsClassicMatch[1] ? parseBoardToken(wsClassicMatch[1]) : 'Maharashtra',
      classLevel: parseClassToken(wsClassicMatch[2]),
      subject: SUBJECT_TOKEN_MAP[rawSubj],
      rawSubjectToken: rawSubj,
    };
  }

  // 3. VC-[CBSE-|ICSE-]C{N}-{SUBJ}-L{1..4}-Q{M}
  const vcMatch = id.match(/^VC-(?:(CBSE|ICSE)-)?(C(?:10|[1-9]))-([A-Z0-9]+)-L[1-4]-Q\d+$/i);
  if (vcMatch) {
    const rawSubj = vcMatch[3].toUpperCase();
    return {
      rawId: id,
      family: 'QUIZ_QUESTION',
      isHistoricalPreserved: true,
      board: vcMatch[1] ? parseBoardToken(vcMatch[1]) : 'Maharashtra',
      classLevel: parseClassToken(vcMatch[2]),
      subject: SUBJECT_TOKEN_MAP[rawSubj],
      rawSubjectToken: rawSubj,
    };
  }

  // 4. Study Library / Exam IDs: CHTEST / NOTES / VID / MP / PYQ / TB
  const libMatch = id.match(
    /^(CHTEST|NOTES|VID|MP|PYQ|TB)-(MAHARASHTRA|MH|CBSE|ICSE)-(C(?:10|[1-9]))-([A-Z0-9]+)-(.+)$/i
  );
  if (libMatch) {
    const prefix = libMatch[1].toUpperCase();
    const rawSubj = libMatch[4].toUpperCase();
    const familyMap: Record<string, LegacyContentIdFamily> = {
      CHTEST: 'CHAPTER_TEST',
      NOTES: 'STUDY_NOTES',
      VID: 'VIDEO_GUIDE',
      MP: 'MODEL_PAPER',
      PYQ: 'PYQ_PAPER',
      TB: 'TEXTBOOK',
    };
    return {
      rawId: id,
      family: familyMap[prefix] || 'UNKNOWN_CUSTOM',
      isHistoricalPreserved: true,
      board: parseBoardToken(libMatch[2]),
      classLevel: parseClassToken(libMatch[3]),
      subject: SUBJECT_TOKEN_MAP[rawSubj],
      rawSubjectToken: rawSubj,
    };
  }

  // Any other custom/admin/scholarship historical ID is still preserved intact
  return {
    rawId: id,
    family: 'UNKNOWN_CUSTOM',
    isHistoricalPreserved: true,
  };
}

export function isHistoricalPreservedContentId(rawId: string): boolean {
  if (!SYLLABUS_FEATURE_FLAGS.PRESERVE_LEGACY_IDS) return false;
  return parseLegacyContentId(rawId).isHistoricalPreserved;
}

/**
 * Pure read-only compatibility merger: preserves every existing completed ID and never drops
 * legacy worksheet/question completions when syllabus chapter lists evolve.
 */
export function mergePreservedCompletionIds(
  existingCompletedIds: readonly string[] = [],
  newlyCompletedIds: readonly string[] = []
): string[] {
  const merged: string[] = [];
  const seen = new Set<string>();

  for (const id of [...existingCompletedIds, ...newlyCompletedIds]) {
    const clean = String(id || '').trim();
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      merged.push(clean);
    }
  }
  return merged;
}

/**
 * Summarizes a student's historical progress across all legacy ID families without
 * altering or mutating the underlying StudentProfile object.
 */
export function inspectHistoricalStudentProgress(
  student: Pick<
    StudentProfile,
    | 'id'
    | 'firebaseUid'
    | 'completedWorksheetIds'
    | 'worksheetAttempts'
    | 'attemptedQuestionIds'
    | 'attemptedScholarshipQuestionIds'
    | 'activatedClassKeys'
    | 'subjectProgress'
  >
): LegacyProgressPreservationSummary {
  const completedIds = Array.isArray(student.completedWorksheetIds)
    ? student.completedWorksheetIds
    : [];
  const attemptedQIds = Array.isArray(student.attemptedQuestionIds)
    ? student.attemptedQuestionIds
    : [];
  const scholarshipQIds = Array.isArray(student.attemptedScholarshipQuestionIds)
    ? student.attemptedScholarshipQuestionIds
    : [];

  return {
    preserveFlagEnabled: SYLLABUS_FEATURE_FLAGS.PRESERVE_LEGACY_IDS,
    studentId: student.id || student.firebaseUid || '',
    totalCompletedWorksheets: completedIds.length,
    preservedHistoricalWorksheetIds: completedIds.filter((id) => isHistoricalPreservedContentId(id)),
    totalWorksheetAttempts: Array.isArray(student.worksheetAttempts)
      ? student.worksheetAttempts.length
      : 0,
    totalAttemptedQuestions: attemptedQIds.length,
    preservedHistoricalQuestionIds: attemptedQIds.filter((id) =>
      isHistoricalPreservedContentId(id)
    ),
    totalAttemptedScholarshipQuestions: scholarshipQIds.length,
    activatedClassKeysCount: Array.isArray(student.activatedClassKeys)
      ? student.activatedClassKeys.length
      : 0,
    subjectProgressKeysCount: student.subjectProgress
      ? Object.keys(student.subjectProgress).length
      : 0,
  };
}
