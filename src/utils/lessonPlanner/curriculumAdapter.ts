import { ClassLevel, EducationBoard, SubjectName } from '../../types';
import {
  ALL_10_CLASSES,
  getClassCurriculumMeta,
  getSubjectMeta,
  getSubjectsForClass,
} from '../../data/classCurriculumConfig';
import {
  getClassNumber,
  getStageBand,
} from '../../data/worksheets/builders/chapterCatalog';
import { getOfficialTextbookForSubject } from '../../data/studyLibrary/textbookLibraryData';
import { getDefaultPeriodsPerWeekForSubject } from '../../data/lessonPlanner/defaultBoardCalendars';
import { getVerifiedSubjectSyllabus } from '../../data/lessonPlanner/verifiedSyllabusRegistry';
import { isVerifiedSyllabusPipelineEnabled } from '../../data/verifiedSyllabus/syllabusFeatureFlags';
import { getEffectiveSyllabusForConsumer } from '../../services/centralSyllabusService';
import {
  CurriculumReviewAuditRow,
  CurriculumSourceType,
  InstructionMedium,
  ResolvedCurriculumSubject,
  ResolvedPlanningUnit,
  SubjectGroupBucket,
} from '../../types/lessonPlanner';

/**
 * STRICTLY READ-ONLY Curriculum Adapter for the Automatic Teacher Lesson Planner.
 *
 * Mandatory Guarantees:
 * 1. Never mutates existing MyStudyZone curriculum or textbook registries.
 * 2. Never mixes subjects or syllabi across Maharashtra SSC, CBSE, and ICSE.
 * 3. Uses ONLY source-verified official textbook chapter indexes from verifiedSyllabusRegistry.ts for PASS subjects.
 * 4. Keeps all unverified subjects explicitly marked as PENDING VERIFICATION (`needsAdminReview: true`).
 */

const MAHARASHTRA_COMBINED_ENRICHMENT_C9_C10 = new Set<SubjectName>([
  'Science',
  'Social Studies',
  'General Knowledge',
  'Logical Reasoning',
  'Vocabulary and Grammar',
  'Moral Education',
  'Computer Knowledge',
  'Environmental Studies',
  'Drawing and Creative Activities',
  'Environmental Awareness',
  'Life Skills',
  'General Science Activities',
  'Financial Literacy & Digital Citizenship',
]);

export function getSubjectGroupBucket(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): SubjectGroupBucket {
  if (board === 'Maharashtra' && (classLevel === 'Class 9' || classLevel === 'Class 10')) {
    if (MAHARASHTRA_COMBINED_ENRICHMENT_C9_C10.has(subject)) {
      return 'combined_enrichment';
    }
    if (classLevel === 'Class 10' && subject === 'Mathematics') {
      // Class 10 SSC splits Mathematics into Algebra & Geometry; combined Mathematics stays accessible under Combined / Enrichment
      return 'combined_enrichment';
    }
  }
  return 'core_board';
}

export function cleanUnitDisplayTitle(rawTitle: string): string {
  return rawTitle
    .replace(/^(Chapter|Unit|Module|Art|Topic|Value|पाठ|घटक|अध्याय)\s*[0-9१२३४५६७८९०]+\s*:\s*/i, '')
    .trim();
}

function deriveSubTopicsFromTitle(cleanTitle: string, subject: SubjectName): string[] {
  const rawSegments = cleanTitle
    .split(/;|,|&|\band\b|\/|—|–/i)
    .map((s) => s.trim())
    .filter((s) => s.length >= 3);

  const unique: string[] = [];
  const seen = new Set<string>();
  for (const seg of rawSegments) {
    const key = seg.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(seg);
    }
  }

  if (unique.length >= 3) {
    return unique.slice(0, 6);
  }
  if (unique.length === 2) {
    return [
      `Foundation & Core Concepts: ${unique[0]}`,
      `Deep Dive & Worked Examples: ${unique[1]}`,
      `Guided Application & Classroom Practice (${cleanTitle})`,
      `Formative Recap & Doubt Clearing (${subject})`,
    ];
  }
  return [
    `Concept Introduction & Prior Knowledge: ${cleanTitle}`,
    `Core Rules, Examples & Demonstration: ${cleanTitle}`,
    `Hands-On Classroom Practice & Application: ${cleanTitle}`,
    `Consolidation, Recap & Assessment Check: ${cleanTitle}`,
  ];
}

export function getSubjectsForBoardAndClassGrouped(
  board: EducationBoard,
  classLevel: ClassLevel,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): {
  allSubjects: SubjectName[];
  coreBoardSubjects: SubjectName[];
  combinedEnrichmentSubjects: SubjectName[];
  verifiedSubjects: SubjectName[];
  pendingSubjects: SubjectName[];
  subjectStatusMap: Record<string, { status: 'PASS' | 'PENDING'; chapterCount: number }>;
} {
  const allSubjects = [...getSubjectsForClass(classLevel, board)];
  const coreBoardSubjects: SubjectName[] = [];
  const combinedEnrichmentSubjects: SubjectName[] = [];
  const verifiedSubjects: SubjectName[] = [];
  const pendingSubjects: SubjectName[] = [];
  const subjectStatusMap: Record<string, { status: 'PASS' | 'PENDING'; chapterCount: number }> = {};
  const useCentral = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);

  for (const subject of allSubjects) {
    let isVerified = false;
    let chapterCount = 0;

    if (useCentral) {
      const central = getEffectiveSyllabusForConsumer({
        board,
        classLevel,
        subject,
        medium,
        useVerifiedPipelineOverride: true,
      });
      isVerified = central.mode === 'central_verified' && central.structuredChapters.length > 0;
      chapterCount = isVerified ? central.structuredChapters.length : 0;
    } else {
      const entry = getVerifiedSubjectSyllabus(board, classLevel, subject);
      isVerified = entry.status === 'PASS' && entry.chapters.length > 0;
      chapterCount = isVerified ? entry.chapters.length : 0;
    }

    subjectStatusMap[subject] = {
      status: isVerified ? 'PASS' : 'PENDING',
      chapterCount,
    };

    if (isVerified) {
      verifiedSubjects.push(subject);
    } else {
      pendingSubjects.push(subject);
    }

    if (getSubjectGroupBucket(board, classLevel, subject) === 'combined_enrichment') {
      combinedEnrichmentSubjects.push(subject);
    } else {
      coreBoardSubjects.push(subject);
    }
  }

  return {
    allSubjects,
    coreBoardSubjects,
    combinedEnrichmentSubjects,
    verifiedSubjects,
    pendingSubjects,
    subjectStatusMap,
  };
}

export function resolveBoardClassSubjectCurriculum(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  textbookEditionOverride?: string,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): ResolvedCurriculumSubject {
  const classNumber = getClassNumber(classLevel);
  const stageBand = getStageBand(classNumber);
  const classMeta = getClassCurriculumMeta(classLevel, board);
  const subjectMeta = getSubjectMeta(subject, board);
  const textbook = getOfficialTextbookForSubject(
    board,
    classLevel,
    subject,
    medium,
    useVerifiedPipelineOverride
  );
  const subjectGroup = getSubjectGroupBucket(board, classLevel, subject);
  const defaultLoad = getDefaultPeriodsPerWeekForSubject(subject, classNumber);
  const useCentral = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);

  const centralResolution = useCentral
    ? getEffectiveSyllabusForConsumer({
        board,
        classLevel,
        subject,
        medium,
        useVerifiedPipelineOverride: true,
      })
    : null;
  const legacyEntry = useCentral ? null : getVerifiedSubjectSyllabus(board, classLevel, subject);

  const isVerifiedBoardMap = centralResolution
    ? centralResolution.mode === 'central_verified' && centralResolution.structuredChapters.length > 0
    : Boolean(legacyEntry && legacyEntry.status === 'PASS' && legacyEntry.chapters.length > 0);

  const curriculumSourceType: CurriculumSourceType = isVerifiedBoardMap
    ? 'verified_board_chapters'
    : 'curriculum_based_planning_units';

  const curriculumSourceLabel = isVerifiedBoardMap
    ? 'Verified Official Textbook Index'
    : 'PENDING VERIFICATION';

  const sourceChapters = centralResolution
    ? centralResolution.structuredChapters
    : legacyEntry?.chapters || [];

  // STRICT RULE: Use ONLY verified textbook chapters. Never generate invented chapters for pending subjects.
  const units: ResolvedPlanningUnit[] = isVerifiedBoardMap
    ? (() => {
        const totalChapters = sourceChapters.length;
        const halfIdx = Math.ceil(totalChapters / 2);
        return sourceChapters.map((ch, idx) => {
          const rawTitle = `Chapter ${ch.chapterNumber}: ${ch.chapterTitle}`;
          const cleanTitle = ch.chapterTitle.trim();
          const subTopics = deriveSubTopicsFromTitle(cleanTitle, subject);
          const defaultWeight = Math.min(10, Math.max(2, subTopics.length));
          return {
            unitId: `${board.toLowerCase()}_c${classNumber}_${subjectMeta.shortCode.toLowerCase()}_u${ch.chapterNumber}`,
            unitNumber: ch.chapterNumber,
            title: rawTitle,
            cleanTitle,
            sourceKind: 'board_mapped',
            defaultWeight,
            recommendedTerm: idx < halfIdx ? 'Term 1' : 'Term 2',
            subTopics,
          };
        });
      })()
    : [];

  const resolvedBookTitle = centralResolution
    ? isVerifiedBoardMap
      ? centralResolution.textbookTitle
      : `${textbook.bookTitle.replace(/\s*\[PENDING VERIFICATION\]$/i, '')} [PENDING VERIFICATION]`
    : isVerifiedBoardMap && legacyEntry
    ? legacyEntry.textbookTitle
    : `${textbook.bookTitle} [PENDING VERIFICATION]`;

  const resolvedPublisher = centralResolution
    ? centralResolution.publisher
    : isVerifiedBoardMap && legacyEntry
    ? legacyEntry.publisher
    : textbook.publisher;

  const resolvedEditionYear =
    textbookEditionOverride ||
    (centralResolution
      ? centralResolution.academicYearEdition
      : isVerifiedBoardMap && legacyEntry
      ? legacyEntry.academicYearEdition
      : textbook.editionYear);

  return {
    board,
    classLevel,
    classNumber,
    subject,
    shortCode: subjectMeta.shortCode,
    icon: subjectMeta.icon,
    category: subjectMeta.category,
    subjectGroup,
    localizedTitle: subjectMeta.marathiTitle,
    marathiName: subjectMeta.marathiName,
    hindiName: subjectMeta.hindiName,
    stageLabel: classMeta.boardStage,
    stageBand,
    bookTitle: resolvedBookTitle,
    publisher: resolvedPublisher,
    editionYear: resolvedEditionYear,
    syllabusCode: textbook.syllabusCode,
    curriculumSourceType,
    curriculumSourceLabel,
    needsAdminReview: !isVerifiedBoardMap,
    defaultPeriodsPerWeek: defaultLoad.periodsPerWeek,
    defaultTeachingDays: [...defaultLoad.teachingDays],
    units,
  };
}

export function getCurriculumReviewAudit(boardFilter?: EducationBoard): {
  rows: CurriculumReviewAuditRow[];
  summary: {
    totalSubjects: number;
    verifiedBoardCount: number;
    planningUnitsReviewCount: number;
    totalUnits: number;
  };
} {
  const boards: EducationBoard[] = boardFilter
    ? [boardFilter]
    : ['Maharashtra', 'CBSE', 'ICSE'];

  const rows: CurriculumReviewAuditRow[] = [];
  let verifiedBoardCount = 0;
  let planningUnitsReviewCount = 0;
  let totalUnits = 0;

  for (const board of boards) {
    for (const classLevel of ALL_10_CLASSES) {
      const subjects = getSubjectsForClass(classLevel, board);
      for (const subject of subjects) {
        const resolved = resolveBoardClassSubjectCurriculum(board, classLevel, subject);
        if (resolved.curriculumSourceType === 'verified_board_chapters') {
          verifiedBoardCount += 1;
        } else {
          planningUnitsReviewCount += 1;
        }
        totalUnits += resolved.units.length;
        rows.push({
          board,
          classLevel,
          classNumber: resolved.classNumber,
          subject,
          subjectGroup: resolved.subjectGroup,
          bookTitle: resolved.bookTitle,
          unitCount: resolved.units.length,
          curriculumSourceType: resolved.curriculumSourceType,
          curriculumSourceLabel: resolved.curriculumSourceLabel,
          needsAdminReview: resolved.needsAdminReview,
        });
      }
    }
  }

  return {
    rows,
    summary: {
      totalSubjects: rows.length,
      verifiedBoardCount,
      planningUnitsReviewCount,
      totalUnits,
    },
  };
}
