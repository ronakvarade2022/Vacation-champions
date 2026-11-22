import { ClassLevel, EducationBoard, SubjectName } from '../../types';
import {
  ALL_10_CLASSES,
  getClassCurriculumMeta,
  getSubjectMeta,
  getSubjectsForClass,
} from '../../data/classCurriculumConfig';
import { CBSE_CURRICULUM_BY_CLASS } from '../../data/boards/cbseCurriculumConfig';
import { ICSE_CURRICULUM_BY_CLASS } from '../../data/boards/icseCurriculumConfig';
import {
  getClassNumber,
  getRichChaptersForSubject,
  getStageBand,
} from '../../data/worksheets/builders/chapterCatalog';
import { getOfficialTextbookForSubject } from '../../data/studyLibrary/textbookLibraryData';
import { getDefaultPeriodsPerWeekForSubject } from '../../data/lessonPlanner/defaultBoardCalendars';
import {
  CurriculumReviewAuditRow,
  CurriculumSourceType,
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
 * 3. Never presents fallback or stage-based planning units as official board textbook chapters.
 * 4. Clearly labels unverified subjects as "Curriculum-Based Planning Units" with `needsAdminReview: true`.
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

function getExplicitBoardMappedChapters(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): string[] | null {
  if (board === 'CBSE') {
    const mapped = CBSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject];
    if (mapped && mapped.length > 0) {
      return [...mapped];
    }
    return null;
  }
  if (board === 'ICSE') {
    const mapped = ICSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject];
    if (mapped && mapped.length > 0) {
      return [...mapped];
    }
    return null;
  }
  // Maharashtra State Board registry currently uses stage-banded units across Classes 1–10 rather than
  // per-class official Balbharati chapter-by-chapter lists; therefore mark transparently as
  // Curriculum-Based Planning Units until Admin-verified chapter maps are uploaded.
  return null;
}

export function getSubjectsForBoardAndClassGrouped(
  board: EducationBoard,
  classLevel: ClassLevel
): {
  allSubjects: SubjectName[];
  coreBoardSubjects: SubjectName[];
  combinedEnrichmentSubjects: SubjectName[];
} {
  const allSubjects = [...getSubjectsForClass(classLevel, board)];
  const coreBoardSubjects: SubjectName[] = [];
  const combinedEnrichmentSubjects: SubjectName[] = [];

  for (const subject of allSubjects) {
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
  };
}

export function resolveBoardClassSubjectCurriculum(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  textbookEditionOverride?: string
): ResolvedCurriculumSubject {
  const classNumber = getClassNumber(classLevel);
  const stageBand = getStageBand(classNumber);
  const classMeta = getClassCurriculumMeta(classLevel, board);
  const subjectMeta = getSubjectMeta(subject, board);
  const textbook = getOfficialTextbookForSubject(board, classLevel, subject);
  const subjectGroup = getSubjectGroupBucket(board, classLevel, subject);
  const defaultLoad = getDefaultPeriodsPerWeekForSubject(subject, classNumber);

  const explicitBoardChapters = getExplicitBoardMappedChapters(board, classLevel, subject);
  const isVerifiedBoardMap = explicitBoardChapters !== null;

  const curriculumSourceType: CurriculumSourceType = isVerifiedBoardMap
    ? 'verified_board_chapters'
    : 'curriculum_based_planning_units';

  const curriculumSourceLabel = isVerifiedBoardMap
    ? 'Verified Board Curriculum Chapters'
    : 'Curriculum-Based Planning Units';

  // When verified board chapters exist, use ONLY those explicit board chapters without silently
  // mixing fallback stage units. Otherwise use the existing stage-aligned curriculum units clearly
  // labeled as "Curriculum-Based Planning Units".
  const rawTitles = isVerifiedBoardMap
    ? explicitBoardChapters
    : [...getRichChaptersForSubject(board, classLevel, subject)];

  const halfIdx = Math.ceil(rawTitles.length / 2);

  const units: ResolvedPlanningUnit[] = rawTitles.map((rawTitle, idx) => {
    const cleanTitle = cleanUnitDisplayTitle(rawTitle) || rawTitle.trim();
    const subTopics = deriveSubTopicsFromTitle(cleanTitle, subject);
    // Slightly higher default weight for multi-topic chapters so pacing feels balanced
    const defaultWeight = Math.min(10, Math.max(2, subTopics.length));
    return {
      unitId: `${board.toLowerCase()}_c${classNumber}_${subjectMeta.shortCode.toLowerCase()}_u${idx + 1}`,
      unitNumber: idx + 1,
      title: rawTitle.trim(),
      cleanTitle,
      sourceKind: isVerifiedBoardMap ? 'board_mapped' : 'curriculum_planning_unit',
      defaultWeight,
      recommendedTerm: idx < halfIdx ? 'Term 1' : 'Term 2',
      subTopics,
    };
  });

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
    bookTitle: textbook.bookTitle,
    publisher: textbook.publisher,
    editionYear: textbookEditionOverride || textbook.editionYear,
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
