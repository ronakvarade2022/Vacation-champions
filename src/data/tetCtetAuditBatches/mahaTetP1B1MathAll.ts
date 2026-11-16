import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_MATH_C1 } from './mahaTetP1B1MathContent1';
import { MAHA_TET_P1_B1_MATH_C2 } from './mahaTetP1B1MathContent2';
import { MAHA_TET_P1_B1_MATH_C3 } from './mahaTetP1B1MathContent3';
import { MAHA_TET_P1_B1_MATH_C4 } from './mahaTetP1B1MathContent4';
import { MAHA_TET_P1_B1_MATH_C5 } from './mahaTetP1B1MathContent5';
import { MAHA_TET_P1_B1_MATH_C6 } from './mahaTetP1B1MathContent6';
import { MAHA_TET_P1_B1_MATH_P1 } from './mahaTetP1B1MathPed1';
import { MAHA_TET_P1_B1_MATH_P2 } from './mahaTetP1B1MathPed2';
import { MAHA_TET_P1_B1_MATH_P3 } from './mahaTetP1B1MathPed3';

function dedupeByEn(items: CuratedTrilingualMcq[]): CuratedTrilingualMcq[] {
  const seen = new Set<string>();
  const out: CuratedTrilingualMcq[] = [];
  for (const item of items) {
    const key = item.en.q.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

export const MAHA_TET_P1_B1_MATH_CONTENT_200: CuratedTrilingualMcq[] = dedupeByEn([
  ...MAHA_TET_P1_B1_MATH_C1,
  ...MAHA_TET_P1_B1_MATH_C2,
  ...MAHA_TET_P1_B1_MATH_C3,
  ...MAHA_TET_P1_B1_MATH_C4,
  ...MAHA_TET_P1_B1_MATH_C5,
  ...MAHA_TET_P1_B1_MATH_C6,
]).slice(0, 200);

export const MAHA_TET_P1_B1_MATH_PED_100: CuratedTrilingualMcq[] = dedupeByEn([
  ...MAHA_TET_P1_B1_MATH_P1,
  ...MAHA_TET_P1_B1_MATH_P2,
  ...MAHA_TET_P1_B1_MATH_P3,
]).slice(0, 100);

export function getMahaTetP1B1MathQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 1 || testNumber > 10 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 20) {
    const idx = (testNumber - 1) * 20 + slotIndex;
    return MAHA_TET_P1_B1_MATH_CONTENT_200[idx] || null;
  }
  const pedIdx = (testNumber - 1) * 10 + (slotIndex - 20);
  return MAHA_TET_P1_B1_MATH_PED_100[pedIdx] || null;
}
