import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_MATH_CONTENT_200, MAHA_TET_P1_B1_MATH_PED_100 } from './mahaTetP1B1MathAll';
import { MAHA_TET_P1_B2_MATH_CONTENT_200, MAHA_TET_P1_B2_MATH_PED_100 } from './mahaTetP1B2MathAll';
import { MAHA_TET_P1_B3_MATH_C1 } from './mahaTetP1B3MathContent1';
import { MAHA_TET_P1_B3_MATH_C2 } from './mahaTetP1B3MathContent2';
import { MAHA_TET_P1_B3_MATH_C3 } from './mahaTetP1B3MathContent3';
import { MAHA_TET_P1_B3_MATH_C4 } from './mahaTetP1B3MathContent4';
import { MAHA_TET_P1_B3_MATH_C5 } from './mahaTetP1B3MathContent5';
import { MAHA_TET_P1_B3_MATH_C6 } from './mahaTetP1B3MathContent6';
import { MAHA_TET_P1_B3_MATH_C7 } from './mahaTetP1B3MathContent7';
import { MAHA_TET_P1_B3_MATH_C8 } from './mahaTetP1B3MathContent8';
import { MAHA_TET_P1_B3_MATH_C9 } from './mahaTetP1B3MathContent9';
import { MAHA_TET_P1_B3_MATH_PED1 } from './mahaTetP1B3MathPed1';
import { MAHA_TET_P1_B3_MATH_PED2 } from './mahaTetP1B3MathPed2';
import { MAHA_TET_P1_B3_MATH_PED3 } from './mahaTetP1B3MathPed3';
import { MAHA_TET_P1_B3_MATH_PED4 } from './mahaTetP1B3MathPed4';
import { MAHA_TET_P1_B3_MATH_PED5 } from './mahaTetP1B3MathPed5';

const normalizeStem = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, ' ').trim();

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
  const priorTokens = priorItems.map((it) => tokenSet(it.en.q));
  const priorShingleSet = new Set<string>();
  if (checkShingles) {
    for (const it of priorItems) {
      for (const sh of fiveShingles(it.en.q)) priorShingleSet.add(sh);
    }
  }

  const seenStems = new Set<string>();
  const keptTokens: Set<string>[] = [];
  const keptShingles = new Set<string>();
  const out: CuratedTrilingualMcq[] = [];

  for (const item of candidates) {
    const stem = normalizeStem(item.en.q);
    if (priorStems.has(stem) || seenStems.has(stem)) continue;

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

const priorMathContent = [
  ...MAHA_TET_P1_B1_MATH_CONTENT_200,
  ...MAHA_TET_P1_B2_MATH_CONTENT_200,
];

const priorMathPed = [
  ...MAHA_TET_P1_B1_MATH_PED_100,
  ...MAHA_TET_P1_B2_MATH_PED_100,
];

export const MAHA_TET_P1_B3_MATH_CONTENT_200: CuratedTrilingualMcq[] = buildStrictUniquePool(
  [
    ...MAHA_TET_P1_B3_MATH_C1,
    ...MAHA_TET_P1_B3_MATH_C2,
    ...MAHA_TET_P1_B3_MATH_C3,
    ...MAHA_TET_P1_B3_MATH_C4,
    ...MAHA_TET_P1_B3_MATH_C5,
    ...MAHA_TET_P1_B3_MATH_C6,
    ...MAHA_TET_P1_B3_MATH_C7,
    ...MAHA_TET_P1_B3_MATH_C8,
    ...MAHA_TET_P1_B3_MATH_C9,
  ],
  priorMathContent,
  0.56,
  false,
).slice(0, 200);

export const MAHA_TET_P1_B3_MATH_PED_100: CuratedTrilingualMcq[] = buildStrictUniquePool(
  [
    ...MAHA_TET_P1_B3_MATH_PED1,
    ...MAHA_TET_P1_B3_MATH_PED2,
    ...MAHA_TET_P1_B3_MATH_PED3,
    ...MAHA_TET_P1_B3_MATH_PED4,
    ...MAHA_TET_P1_B3_MATH_PED5,
  ],
  priorMathPed,
  0.43,
  true,
).slice(0, 100);

export function getMahaTetP1B3MathQuestion(
  testNumber: number,
  slotIndex: number,
): CuratedTrilingualMcq | null {
  if (testNumber < 21 || testNumber > 30 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 20) {
    const idx = (testNumber - 21) * 20 + slotIndex;
    return MAHA_TET_P1_B3_MATH_CONTENT_200[idx] || null;
  }
  const pedIdx = (testNumber - 21) * 10 + (slotIndex - 20);
  return MAHA_TET_P1_B3_MATH_PED_100[pedIdx] || null;
}
