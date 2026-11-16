import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_EVS_CONTENT_180, MAHA_TET_P1_B1_EVS_PED_120 } from './mahaTetP1B1EvsAll';
import { MAHA_TET_P1_B2_EVS_C1 } from './mahaTetP1B2EvsContent1';
import { MAHA_TET_P1_B2_EVS_C2 } from './mahaTetP1B2EvsContent2';
import { MAHA_TET_P1_B2_EVS_C3 } from './mahaTetP1B2EvsContent3';
import { MAHA_TET_P1_B2_EVS_C4 } from './mahaTetP1B2EvsContent4';
import { MAHA_TET_P1_B2_EVS_C5 } from './mahaTetP1B2EvsContent5';
import { MAHA_TET_P1_B2_EVS_C6 } from './mahaTetP1B2EvsContent6';
import { MAHA_TET_P1_B2_EVS_P1 } from './mahaTetP1B2EvsPed1';
import { MAHA_TET_P1_B2_EVS_P2 } from './mahaTetP1B2EvsPed2';
import { MAHA_TET_P1_B2_EVS_P3 } from './mahaTetP1B2EvsPed3';
import { MAHA_TET_P1_B2_EVS_P4 } from './mahaTetP1B2EvsPed4';

const normalizeStem = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, ' ').trim();

const b1ContentStems = new Set(MAHA_TET_P1_B1_EVS_CONTENT_180.map((item) => normalizeStem(item.en.q)));
const b1PedStems = new Set(MAHA_TET_P1_B1_EVS_PED_120.map((item) => normalizeStem(item.en.q)));

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

export const MAHA_TET_P1_B2_EVS_CONTENT_180: CuratedTrilingualMcq[] = dedupeExcluding(
  [
    ...MAHA_TET_P1_B2_EVS_C1,
    ...MAHA_TET_P1_B2_EVS_C2,
    ...MAHA_TET_P1_B2_EVS_C3,
    ...MAHA_TET_P1_B2_EVS_C4,
    ...MAHA_TET_P1_B2_EVS_C5,
    ...MAHA_TET_P1_B2_EVS_C6,
  ],
  b1ContentStems,
).slice(0, 180);

export const MAHA_TET_P1_B2_EVS_PED_120: CuratedTrilingualMcq[] = dedupeExcluding(
  [
    ...MAHA_TET_P1_B2_EVS_P1,
    ...MAHA_TET_P1_B2_EVS_P2,
    ...MAHA_TET_P1_B2_EVS_P3,
    ...MAHA_TET_P1_B2_EVS_P4,
  ],
  b1PedStems,
).slice(0, 120);

export function getMahaTetP1B2EvsQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 11 || testNumber > 20 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 18) {
    const idx = (testNumber - 11) * 18 + slotIndex;
    return MAHA_TET_P1_B2_EVS_CONTENT_180[idx] || null;
  }
  const pedIdx = (testNumber - 11) * 12 + (slotIndex - 18);
  return MAHA_TET_P1_B2_EVS_PED_120[pedIdx] || null;
}
