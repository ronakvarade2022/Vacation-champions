import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { InstructionMedium } from '../types/lessonPlanner';
import { getRichChaptersForSubject } from '../data/worksheets/builders/chapterCatalog';
import {
  CENTRAL_SYLLABUS_ENTRIES,
  CENTRAL_SYLLABUS_MAP,
  CentralChapterItem,
  CentralMediumVariant,
  CentralSyllabusEntry,
  CentralVerificationStatus,
} from '../data/verifiedSyllabus/centralSyllabusDatabase';
import {
  isVerifiedSyllabusPipelineEnabled,
  SYLLABUS_FEATURE_FLAGS,
} from '../data/verifiedSyllabus/syllabusFeatureFlags';

export interface CentralSyllabusFilter {
  board?: EducationBoard;
  classLevel?: ClassLevel;
  verificationStatus?: CentralVerificationStatus;
}

export interface BoardSummaryBucket {
  board: EducationBoard;
  totalEntries: number;
  verifiedCount: number;
  integratedCount: number;
  notPublishedAsStandaloneCount: number;
  outdatedRebuildCount: number;
  schoolDependentCount: number;
  pendingCount: number;
  verifiedChapterCount: number;
}

export interface CentralSyllabusSummaryStats {
  version: string;
  featureFlagEnabled: boolean;
  totalEntries: number;
  verifiedCount: number;
  integratedCount: number;
  notPublishedAsStandaloneCount: number;
  outdatedRebuildCount: number;
  schoolDependentCount: number;
  pendingCount: number;
  totalVerifiedChapters: number;
  byBoard: Record<EducationBoard, BoardSummaryBucket>;
}

export interface EffectiveSyllabusResolution {
  entryId: string;
  mode: 'legacy_fallback' | 'central_verified' | 'central_pending_blocked';
  featureFlagActive: boolean;
  verificationStatus: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  officialSourceUrl: string;
  verificationNote?: string;
  integratedParentEntryIds?: string[];
  integratedParentLabel?: string;
  chapterTitles: string[];
  structuredChapters: CentralChapterItem[];
  mediumVariantApplied?: CentralMediumVariant;
}

export interface SyllabusStatusPresentation {
  badgeLabel: string;
  message: string;
}

export function getSyllabusStatusPresentation(
  resolution: Pick<
    EffectiveSyllabusResolution,
    'verificationStatus' | 'integratedParentLabel' | 'verificationNote'
  >
): SyllabusStatusPresentation {
  switch (resolution.verificationStatus) {
    case 'INTEGRATED_INTO_PARENT':
      return {
        badgeLabel: 'INTEGRATED SUBJECT',
        message: resolution.integratedParentLabel
          ? `Covered under verified parent textbook: ${resolution.integratedParentLabel}. Open the verified parent subject to access official chapters (no duplicate or synthetic chapters are generated here).`
          : resolution.verificationNote ||
            'This subject is integrated into an already-verified parent textbook. No duplicate or synthetic chapters are generated.',
      };
    case 'NOT_PUBLISHED_AS_STANDALONE':
      return {
        badgeLabel: 'NO STANDALONE TEXTBOOK',
        message:
          resolution.verificationNote ||
          'No standalone official board textbook is published for this Board, Class, Medium, and Subject. No synthetic chapters or content are generated.',
      };
    case 'SCHOOL_TEXTBOOK_DEPENDENT':
      return {
        badgeLabel: 'SCHOOL TEXTBOOK DEPENDENT',
        message:
          'This CISCE / ICSE subject relies on school-selected private publisher textbooks without a single common national index. No synthetic chapters or worksheets are published.',
      };
    default:
      return {
        badgeLabel: 'PENDING VERIFICATION',
        message:
          resolution.verificationNote ||
          'Official textbook chapter index verification for this selection is pending. No synthetic chapters, quizzes, or worksheets are generated until verified.',
      };
  }
}

export function makeCentralSyllabusKey(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): string {
  return `${board}__${classLevel}__${subject}`;
}

export function getCentralSyllabusEntry(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): CentralSyllabusEntry | null {
  const key = makeCentralSyllabusKey(board, classLevel, subject);
  return CENTRAL_SYLLABUS_MAP[key] ?? null;
}

export function listCentralSyllabusEntries(
  filter?: CentralSyllabusFilter
): CentralSyllabusEntry[] {
  if (!filter) {
    return [...CENTRAL_SYLLABUS_ENTRIES];
  }
  return CENTRAL_SYLLABUS_ENTRIES.filter((entry) => {
    if (filter.board && entry.board !== filter.board) return false;
    if (filter.classLevel && entry.classLevel !== filter.classLevel) return false;
    if (filter.verificationStatus && entry.verificationStatus !== filter.verificationStatus) {
      return false;
    }
    return true;
  });
}

export function resolveMediumVariantForEntry(
  entry: CentralSyllabusEntry,
  medium?: InstructionMedium
): CentralMediumVariant | undefined {
  if (!medium || entry.mediumVariants.length === 0) return undefined;
  return entry.mediumVariants.find((variant) => variant.medium === medium);
}

/**
 * Returns strictly verified structured textbook chapters for a subject.
 * Returns [] if entry is OUTDATED_REBUILD_REQUIRED, SCHOOL_TEXTBOOK_DEPENDENT, or PENDING_VERIFICATION.
 * If a medium is supplied and a verified medium-specific variant exists, returns that variant's chapters.
 */
export function getCentralVerifiedChaptersForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  medium?: InstructionMedium
): CentralChapterItem[] {
  const entry = getCentralSyllabusEntry(board, classLevel, subject);
  if (!entry) return [];

  if (medium) {
    const variant = resolveMediumVariantForEntry(entry, medium);
    if (variant) {
      return variant.status === 'VERIFIED' ? [...variant.chapters] : [];
    }
  }

  if (entry.verificationStatus !== 'VERIFIED') {
    return [];
  }

  return [...entry.chapters];
}

export function getCentralSyllabusSummaryStats(): CentralSyllabusSummaryStats {
  const boards: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
  const byBoard = {} as Record<EducationBoard, BoardSummaryBucket>;

  for (const board of boards) {
    byBoard[board] = {
      board,
      totalEntries: 0,
      verifiedCount: 0,
      integratedCount: 0,
      notPublishedAsStandaloneCount: 0,
      outdatedRebuildCount: 0,
      schoolDependentCount: 0,
      pendingCount: 0,
      verifiedChapterCount: 0,
    };
  }

  let verifiedCount = 0;
  let integratedCount = 0;
  let notPublishedAsStandaloneCount = 0;
  let outdatedRebuildCount = 0;
  let schoolDependentCount = 0;
  let pendingCount = 0;
  let totalVerifiedChapters = 0;

  for (const entry of CENTRAL_SYLLABUS_ENTRIES) {
    const bucket = byBoard[entry.board];
    bucket.totalEntries += 1;

    if (entry.verificationStatus === 'VERIFIED') {
      verifiedCount += 1;
      bucket.verifiedCount += 1;
      totalVerifiedChapters += entry.chapters.length;
      bucket.verifiedChapterCount += entry.chapters.length;
    } else if (entry.verificationStatus === 'INTEGRATED_INTO_PARENT') {
      integratedCount += 1;
      bucket.integratedCount += 1;
    } else if (entry.verificationStatus === 'NOT_PUBLISHED_AS_STANDALONE') {
      notPublishedAsStandaloneCount += 1;
      bucket.notPublishedAsStandaloneCount += 1;
    } else if (entry.verificationStatus === 'OUTDATED_REBUILD_REQUIRED') {
      outdatedRebuildCount += 1;
      bucket.outdatedRebuildCount += 1;
    } else if (entry.verificationStatus === 'SCHOOL_TEXTBOOK_DEPENDENT') {
      schoolDependentCount += 1;
      bucket.schoolDependentCount += 1;
    } else {
      pendingCount += 1;
      bucket.pendingCount += 1;
    }
  }

  return {
    version: SYLLABUS_FEATURE_FLAGS.CENTRAL_SYLLABUS_VERSION,
    featureFlagEnabled: isVerifiedSyllabusPipelineEnabled(),
    totalEntries: CENTRAL_SYLLABUS_ENTRIES.length,
    verifiedCount,
    integratedCount,
    notPublishedAsStandaloneCount,
    outdatedRebuildCount,
    schoolDependentCount,
    pendingCount,
    totalVerifiedChapters,
    byBoard,
  };
}

/**
 * Dual-mode resolver behind `SYLLABUS_FEATURE_FLAGS.USE_VERIFIED_SYLLABUS_PIPELINE`.
 *
 * - Default (flag OFF): Delegates cleanly to existing legacy `getRichChaptersForSubject()`
 *   so zero existing student/teacher behavior changes and instant rollback holds.
 * - Enabled (flag ON or `useVerifiedPipelineOverride: true` in dry-run tests):
 *   Returns strictly verified central chapters or empty `[]` for non-verified entries.
 */
export function getEffectiveSyllabusForConsumer(params: {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  medium?: InstructionMedium;
  useVerifiedPipelineOverride?: boolean;
}): EffectiveSyllabusResolution {
  const { board, classLevel, subject, medium, useVerifiedPipelineOverride } = params;
  const entryId = makeCentralSyllabusKey(board, classLevel, subject);
  const entry = getCentralSyllabusEntry(board, classLevel, subject);
  const flagActive = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);

  if (!flagActive) {
    const legacyChapters = getRichChaptersForSubject(board, classLevel, subject);
    return {
      entryId,
      mode: 'legacy_fallback',
      featureFlagActive: false,
      verificationStatus: entry?.verificationStatus ?? 'PENDING_VERIFICATION',
      textbookTitle: entry?.textbookTitle ?? 'Legacy Runtime Mapping',
      publisher: entry?.publisher ?? 'Existing Curriculum Config',
      academicYearEdition: entry?.academicYearEdition ?? 'Legacy Mode',
      officialSourceUrl: entry?.officialSourceUrl ?? '',
      chapterTitles: legacyChapters,
      structuredChapters: [],
    };
  }

  if (!entry) {
    return {
      entryId,
      mode: 'central_pending_blocked',
      featureFlagActive: true,
      verificationStatus: 'PENDING_VERIFICATION',
      textbookTitle: 'PENDING VERIFICATION',
      publisher: 'PENDING VERIFICATION',
      academicYearEdition: 'PENDING VERIFICATION',
      officialSourceUrl: '',
      chapterTitles: [],
      structuredChapters: [],
    };
  }

  const variant = resolveMediumVariantForEntry(entry, medium);
  const effectiveStatus = variant ? variant.status : entry.verificationStatus;
  const effectiveChapters =
    effectiveStatus === 'VERIFIED'
      ? variant
        ? variant.chapters
        : entry.chapters
      : [];

  return {
    entryId,
    mode: effectiveStatus === 'VERIFIED' ? 'central_verified' : 'central_pending_blocked',
    featureFlagActive: true,
    verificationStatus: effectiveStatus,
    textbookTitle: variant ? variant.textbookTitle : entry.textbookTitle,
    publisher: variant ? variant.publisher : entry.publisher,
    academicYearEdition: variant ? variant.academicYearEdition : entry.academicYearEdition,
    officialSourceUrl: variant ? variant.officialSourceUrl : entry.officialSourceUrl,
    verificationNote: variant ? variant.verificationNote : entry.verificationNote,
    ...(entry.integratedParentEntryIds
      ? { integratedParentEntryIds: [...entry.integratedParentEntryIds] }
      : {}),
    ...(entry.integratedParentLabel
      ? { integratedParentLabel: entry.integratedParentLabel }
      : {}),
    chapterTitles: effectiveChapters.map((c) => c.chapterTitle),
    structuredChapters: [...effectiveChapters],
    ...(variant ? { mediumVariantApplied: variant } : {}),
  };
}
