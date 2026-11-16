import { CuratedTrilingualMcq } from './types';
import { MAHA_TET_P1_B1_CDP_300 } from './mahaTetP1B1CdpAll';
import { MAHA_TET_P1_B2_CDP_PART1 } from './mahaTetP1B2CdpPart1';
import { MAHA_TET_P1_B2_CDP_PART2 } from './mahaTetP1B2CdpPart2';
import { MAHA_TET_P1_B2_CDP_PART3 } from './mahaTetP1B2CdpPart3';
import { MAHA_TET_P1_B2_CDP_PART4 } from './mahaTetP1B2CdpPart4';
import { MAHA_TET_P1_B2_CDP_PART5 } from './mahaTetP1B2CdpPart5';
import { MAHA_TET_P1_B2_CDP_PART6 } from './mahaTetP1B2CdpPart6';
import { MAHA_TET_P1_B2_CDP_PART7 } from './mahaTetP1B2CdpPart7';
import { MAHA_TET_P1_B2_CDP_PART8 } from './mahaTetP1B2CdpPart8';
import { MAHA_TET_P1_B2_CDP_PART9 } from './mahaTetP1B2CdpPart9';
import { MAHA_TET_P1_B2_CDP_PART10 } from './mahaTetP1B2CdpPart10';

const RAW_CDP_B2_POOL: CuratedTrilingualMcq[] = [
  ...MAHA_TET_P1_B2_CDP_PART1,
  ...MAHA_TET_P1_B2_CDP_PART2,
  ...MAHA_TET_P1_B2_CDP_PART3,
  ...MAHA_TET_P1_B2_CDP_PART4,
  ...MAHA_TET_P1_B2_CDP_PART5,
  ...MAHA_TET_P1_B2_CDP_PART6,
  ...MAHA_TET_P1_B2_CDP_PART7,
  ...MAHA_TET_P1_B2_CDP_PART8,
  ...MAHA_TET_P1_B2_CDP_PART9,
  ...MAHA_TET_P1_B2_CDP_PART10,
];

const b1NormalizedEn = new Set(
  MAHA_TET_P1_B1_CDP_300.map((x) => x.en.q.trim().toLowerCase())
);

const dedupedCdpB2: CuratedTrilingualMcq[] = [];
const seenB2En = new Set<string>();
for (const item of RAW_CDP_B2_POOL) {
  const key = item.en.q.trim().toLowerCase();
  if (!b1NormalizedEn.has(key) && !seenB2En.has(key)) {
    seenB2En.add(key);
    dedupedCdpB2.push(item);
  }
}

export const MAHA_TET_P1_B2_CDP_300: CuratedTrilingualMcq[] = dedupedCdpB2.slice(0, 300);

export function getMahaTetP1B2CdpQuestion(testNumber: number, slotIndex: number): CuratedTrilingualMcq | null {
  if (testNumber < 11 || testNumber > 20 || slotIndex < 0 || slotIndex >= 30) return null;
  const idx = (testNumber - 11) * 30 + slotIndex;
  return MAHA_TET_P1_B2_CDP_300[idx] || null;
}
