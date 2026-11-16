import { CuratedLangMcqItem } from './types';
import { MAHA_TET_P1_B1_MR_PASSAGES_1 } from './mahaTetP1B1MrPassages1';
import { MAHA_TET_P1_B1_MR_PASSAGES_2 } from './mahaTetP1B1MrPassages2';
import { MAHA_TET_P1_B1_MR_GRAMMAR_1 } from './mahaTetP1B1MrGrammar1';
import { MAHA_TET_P1_B1_MR_GRAMMAR_2 } from './mahaTetP1B1MrGrammar2';
import { MAHA_TET_P1_B1_MR_PED_1 } from './mahaTetP1B1MrPed1';
import { MAHA_TET_P1_B1_MR_PED_2 } from './mahaTetP1B1MrPed2';
import { MAHA_TET_P1_B1_MR_PED_3 } from './mahaTetP1B1MrPed3';

const ALL_MR_PASSAGES = [
  ...MAHA_TET_P1_B1_MR_PASSAGES_1,
  ...MAHA_TET_P1_B1_MR_PASSAGES_2,
];

const ALL_MR_GRAMMAR: CuratedLangMcqItem[] = [
  ...MAHA_TET_P1_B1_MR_GRAMMAR_1,
  ...MAHA_TET_P1_B1_MR_GRAMMAR_2,
];

const ALL_MR_PEDAGOGY: CuratedLangMcqItem[] = [
  ...MAHA_TET_P1_B1_MR_PED_1,
  ...MAHA_TET_P1_B1_MR_PED_2,
  ...MAHA_TET_P1_B1_MR_PED_3,
];

export const MAHA_TET_P1_B1_MR_COUNTS = {
  passages: ALL_MR_PASSAGES.length,
  comprehensionQs: ALL_MR_PASSAGES.reduce((acc, p) => acc + p.questions.length, 0),
  grammarQs: ALL_MR_GRAMMAR.length,
  pedagogyQs: ALL_MR_PEDAGOGY.length,
};

// Returns curated Language 1 (Marathi) question for MAHA TET Paper 1 Tests 1..10
// slotIndex 0..3: Prose Passage (4 Qs)
// slotIndex 4..6: Poetry Passage (3 Qs)
// slotIndex 7..14: Marathi Vyakaran & Shabd-Sampatti (8 Qs)
// slotIndex 15..29: Marathi L1 Language Pedagogy (15 Qs)
export function getMahaTetP1B1MarathiL1Question(
  testNumber: number,
  slotIndex: number
): CuratedLangMcqItem | null {
  if (testNumber < 1 || testNumber > 10 || slotIndex < 0 || slotIndex >= 30) return null;

  if (slotIndex < 7) {
    const prosePassage = ALL_MR_PASSAGES[(testNumber - 1) * 2];
    const poemPassage = ALL_MR_PASSAGES[(testNumber - 1) * 2 + 1];
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
    const gIdx = (testNumber - 1) * 8 + (slotIndex - 7);
    return ALL_MR_GRAMMAR[gIdx] || null;
  }

  const pIdx = (testNumber - 1) * 15 + (slotIndex - 15);
  return ALL_MR_PEDAGOGY[pIdx] || null;
}
