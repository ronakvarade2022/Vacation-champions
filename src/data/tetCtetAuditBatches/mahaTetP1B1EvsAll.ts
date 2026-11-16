import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_EVS_C1 } from './mahaTetP1B1EvsContent1';
import { MAHA_TET_P1_B1_EVS_C2 } from './mahaTetP1B1EvsContent2';
import { MAHA_TET_P1_B1_EVS_C3 } from './mahaTetP1B1EvsContent3';
import { MAHA_TET_P1_B1_EVS_C4 } from './mahaTetP1B1EvsContent4';
import { MAHA_TET_P1_B1_EVS_C5 } from './mahaTetP1B1EvsContent5';
import { MAHA_TET_P1_B1_EVS_P1 } from './mahaTetP1B1EvsPed1';
import { MAHA_TET_P1_B1_EVS_P2 } from './mahaTetP1B1EvsPed2';
import { MAHA_TET_P1_B1_EVS_P3 } from './mahaTetP1B1EvsPed3';
import { MAHA_TET_P1_B1_EVS_P4 } from './mahaTetP1B1EvsPed4';

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

export const MAHA_TET_P1_B1_EVS_CONTENT_180: CuratedTrilingualMcq[] = dedupeByEn([
  ...MAHA_TET_P1_B1_EVS_C1,
  ...MAHA_TET_P1_B1_EVS_C2,
  ...MAHA_TET_P1_B1_EVS_C3,
  ...MAHA_TET_P1_B1_EVS_C4,
  ...MAHA_TET_P1_B1_EVS_C5,
]).slice(0, 180);

export const MAHA_TET_P1_B1_EVS_PED_120: CuratedTrilingualMcq[] = dedupeByEn([
  ...MAHA_TET_P1_B1_EVS_P1,
  ...MAHA_TET_P1_B1_EVS_P2,
  ...MAHA_TET_P1_B1_EVS_P3,
  ...MAHA_TET_P1_B1_EVS_P4,
]).slice(0, 120);

export function getMahaTetP1B1EvsQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 1 || testNumber > 10 || slotIndex < 0 || slotIndex >= 30) return null;
  if (slotIndex < 18) {
    const idx = (testNumber - 1) * 18 + slotIndex;
    return MAHA_TET_P1_B1_EVS_CONTENT_180[idx] || null;
  }
  const pedIdx = (testNumber - 1) * 12 + (slotIndex - 18);
  return MAHA_TET_P1_B1_EVS_PED_120[pedIdx] || null;
}
