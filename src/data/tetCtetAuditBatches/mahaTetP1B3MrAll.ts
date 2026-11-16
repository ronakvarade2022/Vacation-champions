import { CuratedLangMcqItem } from './types';
import { MAHA_TET_P1_B1_MR_PASSAGES_1 } from './mahaTetP1B1MrPassages1';
import { MAHA_TET_P1_B1_MR_PASSAGES_2 } from './mahaTetP1B1MrPassages2';
import { MAHA_TET_P1_B1_MR_GRAMMAR_1 } from './mahaTetP1B1MrGrammar1';
import { MAHA_TET_P1_B1_MR_GRAMMAR_2 } from './mahaTetP1B1MrGrammar2';
import { MAHA_TET_P1_B1_MR_PED_1 } from './mahaTetP1B1MrPed1';
import { MAHA_TET_P1_B1_MR_PED_2 } from './mahaTetP1B1MrPed2';
import { MAHA_TET_P1_B1_MR_PED_3 } from './mahaTetP1B1MrPed3';
import { MAHA_TET_P1_B2_MR_PASSAGES_1 } from './mahaTetP1B2MrPassages1';
import { MAHA_TET_P1_B2_MR_PASSAGES_2 } from './mahaTetP1B2MrPassages2';
import { MAHA_TET_P1_B2_MR_GRAMMAR_1 } from './mahaTetP1B2MrGrammar1';
import { MAHA_TET_P1_B2_MR_GRAMMAR_2 } from './mahaTetP1B2MrGrammar2';
import { MAHA_TET_P1_B2_MR_PED_1 } from './mahaTetP1B2MrPed1';
import { MAHA_TET_P1_B2_MR_PED_2 } from './mahaTetP1B2MrPed2';
import { MAHA_TET_P1_B2_MR_PED_3 } from './mahaTetP1B2MrPed3';
import { MAHA_TET_P1_B3_MR_PASSAGES_1 } from './mahaTetP1B3MrPassages1';
import { MAHA_TET_P1_B3_MR_PASSAGES_2 } from './mahaTetP1B3MrPassages2';
import { MAHA_TET_P1_B3_MR_GRAMMAR } from './mahaTetP1B3MrGrammar';
import { MAHA_TET_P1_B3_MR_PED_1 } from './mahaTetP1B3MrPed1';
import { MAHA_TET_P1_B3_MR_PED_2 } from './mahaTetP1B3MrPed2';

const normMr = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const PREV_MR_PASSAGE_Q = new Set(
  [
    ...MAHA_TET_P1_B1_MR_PASSAGES_1,
    ...MAHA_TET_P1_B1_MR_PASSAGES_2,
    ...MAHA_TET_P1_B2_MR_PASSAGES_1,
    ...MAHA_TET_P1_B2_MR_PASSAGES_2,
  ].flatMap((p) => p.questions.map((q) => normMr(q.q)))
);

const PREV_MR_GRAMMAR = new Set(
  [
    ...MAHA_TET_P1_B1_MR_GRAMMAR_1,
    ...MAHA_TET_P1_B1_MR_GRAMMAR_2,
    ...MAHA_TET_P1_B2_MR_GRAMMAR_1,
    ...MAHA_TET_P1_B2_MR_GRAMMAR_2,
  ].map((x) => normMr(x.q))
);

const PREV_MR_PED = new Set(
  [
    ...MAHA_TET_P1_B1_MR_PED_1,
    ...MAHA_TET_P1_B1_MR_PED_2,
    ...MAHA_TET_P1_B1_MR_PED_3,
    ...MAHA_TET_P1_B2_MR_PED_1,
    ...MAHA_TET_P1_B2_MR_PED_2,
    ...MAHA_TET_P1_B2_MR_PED_3,
  ].map((x) => normMr(x.q))
);

function dedupeMrItems(items: CuratedLangMcqItem[], exclude: Set<string>): CuratedLangMcqItem[] {
  const seen = new Set<string>();
  const out: CuratedLangMcqItem[] = [];
  for (const item of items) {
    const key = normMr(item.q);
    if (!exclude.has(key) && !seen.has(key) && !PREV_MR_PASSAGE_Q.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

const ALL_MR_B3_PASSAGES = [
  ...MAHA_TET_P1_B3_MR_PASSAGES_1,
  ...MAHA_TET_P1_B3_MR_PASSAGES_2,
];

const ALL_MR_B3_GRAMMAR: CuratedLangMcqItem[] = dedupeMrItems(
  MAHA_TET_P1_B3_MR_GRAMMAR,
  PREV_MR_GRAMMAR
).slice(0, 80);

const ALL_MR_B3_PEDAGOGY: CuratedLangMcqItem[] = dedupeMrItems(
  [...MAHA_TET_P1_B3_MR_PED_1, ...MAHA_TET_P1_B3_MR_PED_2],
  new Set([...PREV_MR_GRAMMAR, ...PREV_MR_PED])
).slice(0, 150);

export const MAHA_TET_P1_B3_MR_COUNTS = {
  passages: ALL_MR_B3_PASSAGES.length,
  comprehensionQs: ALL_MR_B3_PASSAGES.reduce((acc, p) => acc + p.questions.length, 0),
  grammarQs: ALL_MR_B3_GRAMMAR.length,
  pedagogyQs: ALL_MR_B3_PEDAGOGY.length,
};

// Returns curated Language 1 (Marathi) question for MAHA TET Paper 1 Tests 21..30
// slotIndex 0..3: Prose Passage (4 Qs)
// slotIndex 4..6: Poetry Passage (3 Qs)
// slotIndex 7..14: Marathi Vyakaran & Shabd-Sampatti (8 Qs)
// slotIndex 15..29: Marathi L1 Language Pedagogy (15 Qs)
export function getMahaTetP1B3MarathiL1Question(
  testNumber: number,
  slotIndex: number
): CuratedLangMcqItem | null {
  if (testNumber < 21 || testNumber > 30 || slotIndex < 0 || slotIndex >= 30) return null;
  const localTest = testNumber - 21;

  if (slotIndex < 7) {
    const prosePassage = ALL_MR_B3_PASSAGES[localTest * 2];
    const poemPassage = ALL_MR_B3_PASSAGES[localTest * 2 + 1];
    if (slotIndex < 4 && prosePassage) {
      const q = prosePassage.questions[slotIndex];
      if (!q) return null;
      return {
        topic: `${prosePassage.title} – ${q.topic}`,
        pattern: 'Comprehension',
        difficulty: q.difficulty,
        q: `खालील गद्य उतारा वाचून प्रश्नाचे अचूक उत्तर निवडा:\n"${prosePassage.text}"\n\nप्रश्न: ${q.q}`,
        opts: q.opts,
        exp: q.exp,
      };
    }
    if (slotIndex >= 4 && poemPassage) {
      const q = poemPassage.questions[slotIndex - 4];
      if (!q) return null;
      return {
        topic: `${poemPassage.title} – ${q.topic}`,
        pattern: 'Comprehension',
        difficulty: q.difficulty,
        q: `खालील काव्यपंक्ती वाचून प्रश्नाचे अचूक उत्तर निवडा:\n"${poemPassage.text}"\n\nप्रश्न: ${q.q}`,
        opts: q.opts,
        exp: q.exp,
      };
    }
    return null;
  }

  if (slotIndex < 15) {
    const gIdx = localTest * 8 + (slotIndex - 7);
    return ALL_MR_B3_GRAMMAR[gIdx] || null;
  }

  const pIdx = localTest * 15 + (slotIndex - 15);
  return ALL_MR_B3_PEDAGOGY[pIdx] || null;
}
