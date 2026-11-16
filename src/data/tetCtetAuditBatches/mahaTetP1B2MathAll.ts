import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_MATH_CONTENT_200, MAHA_TET_P1_B1_MATH_PED_100 } from './mahaTetP1B1MathAll';
import { MAHA_TET_P1_B2_MATH_C1 } from './mahaTetP1B2MathContent1';
import { MAHA_TET_P1_B2_MATH_C2 } from './mahaTetP1B2MathContent2';
import { MAHA_TET_P1_B2_MATH_C3 } from './mahaTetP1B2MathContent3';
import { MAHA_TET_P1_B2_MATH_C4 } from './mahaTetP1B2MathContent4';
import { MAHA_TET_P1_B2_MATH_C5 } from './mahaTetP1B2MathContent5';
import { MAHA_TET_P1_B2_MATH_C6 } from './mahaTetP1B2MathContent6';
import { MAHA_TET_P1_B2_MATH_C7 } from './mahaTetP1B2MathContent7';
import { MAHA_TET_P1_B2_MATH_PED1 } from './mahaTetP1B2MathPed1';
import { MAHA_TET_P1_B2_MATH_PED2 } from './mahaTetP1B2MathPed2';
import { MAHA_TET_P1_B2_MATH_PED3 } from './mahaTetP1B2MathPed3';
import { MAHA_TET_P1_B2_MATH_PED4 } from './mahaTetP1B2MathPed4';

const normalizeStem = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, ' ').trim();

const b1ContentStems = new Set(MAHA_TET_P1_B1_MATH_CONTENT_200.map((item) => normalizeStem(item.en.q)));
const b1PedStems = new Set(MAHA_TET_P1_B1_MATH_PED_100.map((item) => normalizeStem(item.en.q)));

function dedupeExcluding(
  items: CuratedTrilingualMcq[],
  excludeSet: Set<string>,
): CuratedTrilingualMcq[] {
  const seen = new Set<string>();
  const out: CuratedTrilingualMcq[] = [];
  for (const item of items) {
    const key = normalizeStem(item.en.q);
    if (!excludeSet.has(key) && !seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

export const MAHA_TET_P1_B2_MATH_CONTENT_200: CuratedTrilingualMcq[] = dedupeExcluding(
  [
    ...MAHA_TET_P1_B2_MATH_C1,
    ...MAHA_TET_P1_B2_MATH_C2,
    ...MAHA_TET_P1_B2_MATH_C3,
    ...MAHA_TET_P1_B2_MATH_C4,
    ...MAHA_TET_P1_B2_MATH_C5,
    ...MAHA_TET_P1_B2_MATH_C6,
    ...MAHA_TET_P1_B2_MATH_C7,
  ],
  b1ContentStems,
).slice(0, 200);

export const MAHA_TET_P1_B2_MATH_PED_100: CuratedTrilingualMcq[] = dedupeExcluding(
  [
    ...MAHA_TET_P1_B2_MATH_PED1,
    ...MAHA_TET_P1_B2_MATH_PED2,
    ...MAHA_TET_P1_B2_MATH_PED3,
    ...MAHA_TET_P1_B2_MATH_PED4,
  ],
  b1PedStems,
).slice(0, 100);

export function getMahaTetP1B2MathQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 11 || testNumber > 20 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 20) {
    const idx = (testNumber - 11) * 20 + slotIndex;
    return MAHA_TET_P1_B2_MATH_CONTENT_200[idx] || null;
  }
  const pedIdx = (testNumber - 11) * 10 + (slotIndex - 20);
  return MAHA_TET_P1_B2_MATH_PED_100[pedIdx] || null;
}
