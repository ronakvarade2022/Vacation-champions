import { CuratedLangMcqItem } from './types';
import { MAHA_TET_P1_B1_EN_PASSAGES_1 } from './mahaTetP1B1EnPassages1';
import { MAHA_TET_P1_B1_EN_PASSAGES_2 } from './mahaTetP1B1EnPassages2';
import { MAHA_TET_P1_B1_EN_GRAMMAR_1 } from './mahaTetP1B1EnGrammar1';
import { MAHA_TET_P1_B1_EN_GRAMMAR_2 } from './mahaTetP1B1EnGrammar2';
import { MAHA_TET_P1_B1_EN_PED_1 } from './mahaTetP1B1EnPed1';
import { MAHA_TET_P1_B1_EN_PED_2 } from './mahaTetP1B1EnPed2';
import { MAHA_TET_P1_B1_EN_PED_3 } from './mahaTetP1B1EnPed3';
import { MAHA_TET_P1_B2_EN_PASSAGES_1 } from './mahaTetP1B2EnPassages1';
import { MAHA_TET_P1_B2_EN_PASSAGES_2 } from './mahaTetP1B2EnPassages2';
import { MAHA_TET_P1_B2_EN_GRAMMAR_1 } from './mahaTetP1B2EnGrammar1';
import { MAHA_TET_P1_B2_EN_GRAMMAR_2 } from './mahaTetP1B2EnGrammar2';
import { MAHA_TET_P1_B2_EN_PED_1 } from './mahaTetP1B2EnPed1';
import { MAHA_TET_P1_B2_EN_PED_2 } from './mahaTetP1B2EnPed2';
import { MAHA_TET_P1_B2_EN_PED_3 } from './mahaTetP1B2EnPed3';
import { MAHA_TET_P1_B3_EN_PASSAGES_1 } from './mahaTetP1B3EnPassages1';
import { MAHA_TET_P1_B3_EN_PASSAGES_2 } from './mahaTetP1B3EnPassages2';
import { MAHA_TET_P1_B3_EN_GRAMMAR } from './mahaTetP1B3EnGrammar';
import { MAHA_TET_P1_B3_EN_PED_1 } from './mahaTetP1B3EnPed1';
import { MAHA_TET_P1_B3_EN_PED_2 } from './mahaTetP1B3EnPed2';

const normEn = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const PREV_EN_PASSAGE_Q = new Set(
  [
    ...MAHA_TET_P1_B1_EN_PASSAGES_1,
    ...MAHA_TET_P1_B1_EN_PASSAGES_2,
    ...MAHA_TET_P1_B2_EN_PASSAGES_1,
    ...MAHA_TET_P1_B2_EN_PASSAGES_2,
  ].flatMap((p) => p.questions.map((q) => normEn(q.q)))
);

const PREV_EN_GRAMMAR = new Set(
  [
    ...MAHA_TET_P1_B1_EN_GRAMMAR_1,
    ...MAHA_TET_P1_B1_EN_GRAMMAR_2,
    ...MAHA_TET_P1_B2_EN_GRAMMAR_1,
    ...MAHA_TET_P1_B2_EN_GRAMMAR_2,
  ].map((x) => normEn(x.q))
);

const PREV_EN_PED = new Set(
  [
    ...MAHA_TET_P1_B1_EN_PED_1,
    ...MAHA_TET_P1_B1_EN_PED_2,
    ...MAHA_TET_P1_B1_EN_PED_3,
    ...MAHA_TET_P1_B2_EN_PED_1,
    ...MAHA_TET_P1_B2_EN_PED_2,
    ...MAHA_TET_P1_B2_EN_PED_3,
  ].map((x) => normEn(x.q))
);

function dedupeEnItems(items: CuratedLangMcqItem[], exclude: Set<string>): CuratedLangMcqItem[] {
  const seen = new Set<string>();
  const out: CuratedLangMcqItem[] = [];
  for (const item of items) {
    const key = normEn(item.q);
    if (!exclude.has(key) && !seen.has(key) && !PREV_EN_PASSAGE_Q.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

const ALL_EN_B3_PASSAGES = [
  ...MAHA_TET_P1_B3_EN_PASSAGES_1,
  ...MAHA_TET_P1_B3_EN_PASSAGES_2,
];

const ALL_EN_B3_GRAMMAR: CuratedLangMcqItem[] = dedupeEnItems(
  MAHA_TET_P1_B3_EN_GRAMMAR,
  PREV_EN_GRAMMAR
).slice(0, 80);

const ALL_EN_B3_PEDAGOGY: CuratedLangMcqItem[] = dedupeEnItems(
  [...MAHA_TET_P1_B3_EN_PED_1, ...MAHA_TET_P1_B3_EN_PED_2],
  new Set([...PREV_EN_GRAMMAR, ...PREV_EN_PED])
).slice(0, 150);

export const MAHA_TET_P1_B3_EN_COUNTS = {
  passages: ALL_EN_B3_PASSAGES.length,
  comprehensionQs: ALL_EN_B3_PASSAGES.reduce((acc, p) => acc + p.questions.length, 0),
  grammarQs: ALL_EN_B3_GRAMMAR.length,
  pedagogyQs: ALL_EN_B3_PEDAGOGY.length,
};

// Returns curated Language 2 (English) question for MAHA TET Paper 1 Tests 21..30
// slotIndex 0..3: Passage A (4 Qs)
// slotIndex 4..6: Passage B (3 Qs)
// slotIndex 7..14: Functional English Grammar & Usage (8 Qs)
// slotIndex 15..29: English L2 Pedagogy (15 Qs — zero overlap with Marathi L1)
export function getMahaTetP1B3EnglishL2Question(
  testNumber: number,
  slotIndex: number
): CuratedLangMcqItem | null {
  if (testNumber < 21 || testNumber > 30 || slotIndex < 0 || slotIndex >= 30) return null;
  const localTest = testNumber - 21;

  if (slotIndex < 7) {
    const passageA = ALL_EN_B3_PASSAGES[localTest * 2];
    const passageB = ALL_EN_B3_PASSAGES[localTest * 2 + 1];
    if (slotIndex < 4 && passageA) {
      const q = passageA.questions[slotIndex];
      if (!q) return null;
      return {
        topic: `${passageA.title} – ${q.topic}`,
        pattern: 'Comprehension',
        difficulty: q.difficulty,
        q: `Read the following ${passageA.genre.toLowerCase()} extract and answer the question:\n"${passageA.text}"\n\nQuestion: ${q.q}`,
        opts: q.opts,
        exp: q.exp,
      };
    }
    if (slotIndex >= 4 && passageB) {
      const q = passageB.questions[slotIndex - 4];
      if (!q) return null;
      return {
        topic: `${passageB.title} – ${q.topic}`,
        pattern: 'Comprehension',
        difficulty: q.difficulty,
        q: `Read the following ${passageB.genre.toLowerCase()} extract and answer the question:\n"${passageB.text}"\n\nQuestion: ${q.q}`,
        opts: q.opts,
        exp: q.exp,
      };
    }
    return null;
  }

  if (slotIndex < 15) {
    const gIdx = localTest * 8 + (slotIndex - 7);
    return ALL_EN_B3_GRAMMAR[gIdx] || null;
  }

  const pIdx = localTest * 15 + (slotIndex - 15);
  return ALL_EN_B3_PEDAGOGY[pIdx] || null;
}
