import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_CDP_PART1 } from './mahaTetP1B1CdpPart1';
import { MAHA_TET_P1_B1_CDP_PART2 } from './mahaTetP1B1CdpPart2';
import { MAHA_TET_P1_B1_CDP_PART3 } from './mahaTetP1B1CdpPart3';
import { MAHA_TET_P1_B1_CDP_PART4 } from './mahaTetP1B1CdpPart4';
import { MAHA_TET_P1_B1_CDP_PART5 } from './mahaTetP1B1CdpPart5';
import { MAHA_TET_P1_B1_CDP_PART6 } from './mahaTetP1B1CdpPart6';

const RAW_CDP_POOL: CuratedTrilingualMcq[] = [
  ...MAHA_TET_P1_B1_CDP_PART1,
  ...MAHA_TET_P1_B1_CDP_PART2,
  ...MAHA_TET_P1_B1_CDP_PART3,
  ...MAHA_TET_P1_B1_CDP_PART4,
  ...MAHA_TET_P1_B1_CDP_PART5,
  ...MAHA_TET_P1_B1_CDP_PART6,
];

// Deduplicate defensively and expose 300 distinct items (Tests 1-10, 30 Qs each)
const dedupedCdp: CuratedTrilingualMcq[] = [];
const seenEn = new Set<string>();
for (const item of RAW_CDP_POOL) {
  const key = item.en.q.trim().toLowerCase();
  if (!seenEn.has(key)) {
    seenEn.add(key);
    dedupedCdp.push(item);
  }
}

export const MAHA_TET_P1_B1_CDP_300: CuratedTrilingualMcq[] = dedupedCdp.slice(0, 300);

export function getMahaTetP1B1CdpQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 1 || testNumber > 10 || slotIndex < 0 || slotIndex >= 30) return null;
  const idx = (testNumber - 1) * 30 + slotIndex;
  return MAHA_TET_P1_B1_CDP_300[idx] || null;
}
