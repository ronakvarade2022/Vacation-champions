import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_CDP_300 } from './mahaTetP1B1CdpAll';
import { MAHA_TET_P1_B2_CDP_300 } from './mahaTetP1B2CdpAll';
import { MAHA_TET_P1_B3_CDP_PART1 } from './mahaTetP1B3CdpPart1';
import { MAHA_TET_P1_B3_CDP_PART2 } from './mahaTetP1B3CdpPart2';
import { MAHA_TET_P1_B3_CDP_PART3 } from './mahaTetP1B3CdpPart3';
import { MAHA_TET_P1_B3_CDP_PART4 } from './mahaTetP1B3CdpPart4';
import { MAHA_TET_P1_B3_CDP_PART5 } from './mahaTetP1B3CdpPart5';
import { MAHA_TET_P1_B3_CDP_PART6 } from './mahaTetP1B3CdpPart6';
import { MAHA_TET_P1_B3_CDP_PART7 } from './mahaTetP1B3CdpPart7';
import { MAHA_TET_P1_B3_CDP_PART8 } from './mahaTetP1B3CdpPart8';
import { MAHA_TET_P1_B3_CDP_PART9 } from './mahaTetP1B3CdpPart9';
import { MAHA_TET_P1_B3_CDP_PART10 } from './mahaTetP1B3CdpPart10';

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

const priorCdp = [...MAHA_TET_P1_B1_CDP_300, ...MAHA_TET_P1_B2_CDP_300];
const priorCdpStems = new Set(priorCdp.map((x) => normalizeStem(x.en.q)));
const priorCdpSkeletons = new Set(
  priorCdp
    .filter((x) => normalizeStem(x.en.q).length > 25 && /\d/.test(x.en.q))
    .map((x) => numericSkeleton(x.en.q)),
);
const priorCdpTokens = priorCdp.map((x) => tokenSet(x.en.q));

const RAW_CDP_B3_POOL: CuratedTrilingualMcq[] = [
  ...MAHA_TET_P1_B3_CDP_PART1,
  ...MAHA_TET_P1_B3_CDP_PART2,
  ...MAHA_TET_P1_B3_CDP_PART3,
  ...MAHA_TET_P1_B3_CDP_PART4,
  ...MAHA_TET_P1_B3_CDP_PART5,
  ...MAHA_TET_P1_B3_CDP_PART6,
  ...MAHA_TET_P1_B3_CDP_PART7,
  ...MAHA_TET_P1_B3_CDP_PART8,
  ...MAHA_TET_P1_B3_CDP_PART9,
  ...MAHA_TET_P1_B3_CDP_PART10,
];

const dedupedCdpB3: CuratedTrilingualMcq[] = [];
const seenB3Stems = new Set<string>();
const seenB3Skeletons = new Set<string>();
const keptB3Tokens: Set<string>[] = [];

for (const item of RAW_CDP_B3_POOL) {
  const key = normalizeStem(item.en.q);
  if (priorCdpStems.has(key) || seenB3Stems.has(key)) continue;

  if (key.length > 25 && /\d/.test(key)) {
    const sk = numericSkeleton(item.en.q);
    if (priorCdpSkeletons.has(sk) || seenB3Skeletons.has(sk)) continue;
    seenB3Skeletons.add(sk);
  }

  const tk = tokenSet(item.en.q);
  if (priorCdpTokens.some((pt) => jaccard(tk, pt) >= 0.56)) continue;
  if (keptB3Tokens.some((kt) => jaccard(tk, kt) >= 0.56)) continue;

  seenB3Stems.add(key);
  keptB3Tokens.push(tk);
  dedupedCdpB3.push(item);
}

export const MAHA_TET_P1_B3_CDP_300: CuratedTrilingualMcq[] = dedupedCdpB3.slice(0, 300);

export function getMahaTetP1B3CdpQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 21 || testNumber > 30 || slotIndex < 0 || slotIndex >= 30) return null;
  const idx = (testNumber - 21) * 30 + slotIndex;
  return MAHA_TET_P1_B3_CDP_300[idx] || null;
}
