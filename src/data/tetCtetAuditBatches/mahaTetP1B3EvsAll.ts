import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_EVS_CONTENT_180, MAHA_TET_P1_B1_EVS_PED_120 } from './mahaTetP1B1EvsAll';
import { MAHA_TET_P1_B2_EVS_CONTENT_180, MAHA_TET_P1_B2_EVS_PED_120 } from './mahaTetP1B2EvsAll';
import { MAHA_TET_P1_B3_EVS_C1 } from './mahaTetP1B3EvsContent1';
import { MAHA_TET_P1_B3_EVS_C2 } from './mahaTetP1B3EvsContent2';
import { MAHA_TET_P1_B3_EVS_C3 } from './mahaTetP1B3EvsContent3';
import { MAHA_TET_P1_B3_EVS_C4 } from './mahaTetP1B3EvsContent4';
import { MAHA_TET_P1_B3_EVS_C5 } from './mahaTetP1B3EvsContent5';
import { MAHA_TET_P1_B3_EVS_C6 } from './mahaTetP1B3EvsContent6';
import { MAHA_TET_P1_B3_EVS_C7 } from './mahaTetP1B3EvsContent7';
import { MAHA_TET_P1_B3_EVS_C8 } from './mahaTetP1B3EvsContent8';
import { MAHA_TET_P1_B3_EVS_PED1 } from './mahaTetP1B3EvsPed1';
import { MAHA_TET_P1_B3_EVS_PED2 } from './mahaTetP1B3EvsPed2';
import { MAHA_TET_P1_B3_EVS_PED3 } from './mahaTetP1B3EvsPed3';
import { MAHA_TET_P1_B3_EVS_PED4 } from './mahaTetP1B3EvsPed4';
import { MAHA_TET_P1_B3_EVS_PED5 } from './mahaTetP1B3EvsPed5';
import { MAHA_TET_P1_B3_EVS_PED6 } from './mahaTetP1B3EvsPed6';

const normalizeStem = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, ' ').trim();

const numericSkeleton = (q: string) => normalizeStem(q).replace(/\d+/g, '#');

const tokenSet = (q: string) =>
  new Set(normalizeStem(q).split(' ').filter((w) => w.length > 2));

const jaccard = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

const fiveShingles = (q: string) => {
  const words = normalizeStem(q).split(' ').filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i <= words.length - 5; i++) {
    out.push(words.slice(i, i + 5).join(' '));
  }
  return out;
};

function buildStrictUniquePool(
  candidates: CuratedTrilingualMcq[],
  priorItems: CuratedTrilingualMcq[],
  maxSim: number,
  checkShingles: boolean,
): CuratedTrilingualMcq[] {
  const priorStems = new Set(priorItems.map((it) => normalizeStem(it.en.q)));
  const priorSkeletons = new Set(
    priorItems
      .filter((it) => normalizeStem(it.en.q).length > 25 && /\d/.test(it.en.q))
      .map((it) => numericSkeleton(it.en.q)),
  );
  const priorTokens = priorItems.map((it) => tokenSet(it.en.q));
  const priorShingleSet = new Set<string>();
  if (checkShingles) {
    for (const it of priorItems) {
      for (const sh of fiveShingles(it.en.q)) priorShingleSet.add(sh);
    }
  }

  const seenStems = new Set<string>();
  const seenSkeletons = new Set<string>();
  const keptTokens: Set<string>[] = [];
  const keptShingles = new Set<string>();
  const out: CuratedTrilingualMcq[] = [];

  for (const item of candidates) {
    const stem = normalizeStem(item.en.q);
    if (priorStems.has(stem) || seenStems.has(stem)) continue;

    if (stem.length > 25 && /\d/.test(stem)) {
      const sk = numericSkeleton(item.en.q);
      if (priorSkeletons.has(sk) || seenSkeletons.has(sk)) continue;
      seenSkeletons.add(sk);
    }

    const tk = tokenSet(item.en.q);
    if (priorTokens.some((pt) => jaccard(tk, pt) >= maxSim)) continue;
    if (keptTokens.some((kt) => jaccard(tk, kt) >= maxSim)) continue;

    if (checkShingles) {
      const shs = fiveShingles(item.en.q);
      if (shs.some((sh) => priorShingleSet.has(sh) || keptShingles.has(sh))) continue;
      shs.forEach((sh) => keptShingles.add(sh));
    }

    seenStems.add(stem);
    keptTokens.push(tk);
    out.push(item);
  }
  return out;
}

const priorEvsContent = [
  ...MAHA_TET_P1_B1_EVS_CONTENT_180,
  ...MAHA_TET_P1_B2_EVS_CONTENT_180,
];

const priorEvsPed = [
  ...MAHA_TET_P1_B1_EVS_PED_120,
  ...MAHA_TET_P1_B2_EVS_PED_120,
];

export const MAHA_TET_P1_B3_EVS_CONTENT_180: CuratedTrilingualMcq[] = buildStrictUniquePool(
  [
    ...MAHA_TET_P1_B3_EVS_C1,
    ...MAHA_TET_P1_B3_EVS_C2,
    ...MAHA_TET_P1_B3_EVS_C3,
    ...MAHA_TET_P1_B3_EVS_C4,
    ...MAHA_TET_P1_B3_EVS_C5,
    ...MAHA_TET_P1_B3_EVS_C6,
    ...MAHA_TET_P1_B3_EVS_C7,
    ...MAHA_TET_P1_B3_EVS_C8,
  ],
  priorEvsContent,
  0.48,
  true,
).slice(0, 180);

export const MAHA_TET_P1_B3_EVS_PED_120: CuratedTrilingualMcq[] = buildStrictUniquePool(
  [
    ...MAHA_TET_P1_B3_EVS_PED1,
    ...MAHA_TET_P1_B3_EVS_PED2,
    ...MAHA_TET_P1_B3_EVS_PED3,
    ...MAHA_TET_P1_B3_EVS_PED4,
    ...MAHA_TET_P1_B3_EVS_PED5,
    ...MAHA_TET_P1_B3_EVS_PED6,
  ],
  priorEvsPed,
  0.45,
  true,
).slice(0, 120);

export function getMahaTetP1B3EvsQuestion(
  testNumber: number,
  slotIndex: number,
): CuratedTrilingualMcq | null {
  if (testNumber < 21 || testNumber > 30 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 18) {
    const idx = (testNumber - 21) * 18 + slotIndex;
    return MAHA_TET_P1_B3_EVS_CONTENT_180[idx] || null;
  }
  const pedIdx = (testNumber - 21) * 12 + (slotIndex - 18);
  return MAHA_TET_P1_B3_EVS_PED_120[pedIdx] || null;
}
