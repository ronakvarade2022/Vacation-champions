import type { AdditionalChapterRecord, AdditionalSubjectDefinition } from '../../types/additionalCurriculum';
import { hydrateCompactChapterSeed, type CompactChapterSeed } from './chapterMaterialBuilder';
import { DEFAULT_ADDITIONAL_SUBJECTS } from './subjectsCatalog';
import { BATCH_GK_SEEDS } from './batch_gk';
import { BATCH_LR_SEEDS } from './batch_lr';
import { BATCH_ME_SEEDS } from './batch_me';
import { BATCH_CK_SEEDS } from './batch_ck';
import { BATCH_VG_SEEDS } from './batch_vg';
import { BATCH_DC_SEEDS } from './batch_dc';
import { BATCH_EA_SEEDS } from './batch_ea';
import { BATCH_LS_SEEDS } from './batch_ls';
import { BATCH_GS_SEEDS } from './batch_gs';
import { BATCH_FD_SEEDS } from './batch_fd';

export const ALL_ADDITIONAL_CHAPTER_SEEDS: readonly CompactChapterSeed[] = [
  ...BATCH_GK_SEEDS,
  ...BATCH_LR_SEEDS,
  ...BATCH_ME_SEEDS,
  ...BATCH_CK_SEEDS,
  ...BATCH_VG_SEEDS,
  ...BATCH_DC_SEEDS,
  ...BATCH_EA_SEEDS,
  ...BATCH_LS_SEEDS,
  ...BATCH_GS_SEEDS,
  ...BATCH_FD_SEEDS,
];

export const DEFAULT_ADDITIONAL_CHAPTERS: readonly AdditionalChapterRecord[] = Object.freeze(
  ALL_ADDITIONAL_CHAPTER_SEEDS.map((seed) => hydrateCompactChapterSeed(seed))
);

export const DEFAULT_ADDITIONAL_CHAPTERS_MAP: ReadonlyMap<string, AdditionalChapterRecord> = new Map(
  DEFAULT_ADDITIONAL_CHAPTERS.map((chapter) => [chapter.chapterId, chapter])
);

const NON_STANDALONE_ALIAS_MAP: Record<string, string> = {
  'general knowledge': 'ADD_GK',
  gk: 'ADD_GK',
  'general knowledge (gk)': 'ADD_GK',
  'logical reasoning': 'ADD_LR',
  reasoning: 'ADD_LR',
  'mental ability': 'ADD_LR',
  'moral education': 'ADD_ME',
  'moral science': 'ADD_ME',
  'value education': 'ADD_ME',
  'computer knowledge': 'ADD_CK',
  'computer science': 'ADD_CK',
  computer: 'ADD_CK',
  'computer applications': 'ADD_CK',
  'information technology': 'ADD_CK',
  'vocabulary and grammar': 'ADD_VG',
  vocabulary: 'ADD_VG',
  'additional english': 'ADD_VG',
  'additional english and grammar': 'ADD_VG',
  'english grammar': 'ADD_VG',
  grammar: 'ADD_VG',
  'drawing and creative activities': 'ADD_DC',
  drawing: 'ADD_DC',
  'art and craft': 'ADD_DC',
  'work experience': 'ADD_DC',
  'environmental awareness': 'ADD_EA',
  'environmental studies': 'ADD_EA',
  evs: 'ADD_EA',
  'life skills': 'ADD_LS',
  'health and physical education': 'ADD_LS',
  'general science activities': 'ADD_GS',
  'science activities': 'ADD_GS',
  'financial literacy': 'ADD_FD',
  'digital citizenship': 'ADD_FD',
  'financial literacy & digital citizenship': 'ADD_FD',
};

const INLINE_CLASS_ADDITIONAL_SUBJECT_ID_BY_NAME: Record<string, string> = {
  'general knowledge': 'ADD_GK',
  'logical reasoning': 'ADD_LR',
  'moral education': 'ADD_ME',
  'computer knowledge': 'ADD_CK',
  'vocabulary and grammar': 'ADD_VG',
  'drawing and creative activities': 'ADD_DC',
  'environmental awareness': 'ADD_EA',
  'life skills': 'ADD_LS',
  'general science activities': 'ADD_GS',
  'financial literacy & digital citizenship': 'ADD_FD',
};

export function findAdditionalSubjectForNonStandaloneName(
  subjectName: string | null | undefined,
  subjects: readonly AdditionalSubjectDefinition[] = DEFAULT_ADDITIONAL_SUBJECTS
): AdditionalSubjectDefinition | null {
  if (!subjectName) return null;
  const normalized = subjectName.trim().toLowerCase();
  if (!normalized) return null;

  const directAliasId = NON_STANDALONE_ALIAS_MAP[normalized];
  if (directAliasId) {
    return subjects.find((s) => s.id === directAliasId) || null;
  }

  const partialMatch = subjects.find((s) => {
    const lowerName = s.name.toLowerCase();
    const mapped = s.mapsFromNonStandaloneSubject?.toLowerCase();
    return (
      lowerName === normalized ||
      mapped === normalized ||
      normalized.includes(lowerName) ||
      (mapped ? normalized.includes(mapped) : false)
    );
  });

  return partialMatch || null;
}

/**
 * Resolves ONLY true enrichment/additional subjects to their published supplementary module
 * when accessed inside a class syllabus section (so core academic board subjects keep their
 * strict parent/school-textbook messaging rather than swapping silently).
 */
export function findInlineAdditionalSubjectForClassSubject(
  subjectName: string | null | undefined,
  subjects: readonly AdditionalSubjectDefinition[] = DEFAULT_ADDITIONAL_SUBJECTS
): AdditionalSubjectDefinition | null {
  if (!subjectName) return null;
  const normalized = subjectName.trim().toLowerCase();
  const id = INLINE_CLASS_ADDITIONAL_SUBJECT_ID_BY_NAME[normalized];
  if (!id) return null;
  return subjects.find((s) => s.id === id) || null;
}
