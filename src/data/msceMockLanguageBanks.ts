import { ScholarshipClass, ScholarshipLanguage } from './scholarshipData';
import {
  LangItemTuple,
  ComprehensionPassageItem,
  EN_SYNONYMS_STD4,
  EN_ANTONYMS_STD4,
  EN_IDIOMS_STD4,
  EN_ONE_WORD_STD4,
  EN_ARTICLES_STD4,
  EN_PREPOSITIONS_STD4,
  EN_TENSES_STD4,
  EN_POS_STD4,
  EN_SPELLING_STD4,
  EN_CORRECTION_STD4,
  EN_PASSAGES_STD4,
  EN_SYNONYMS_STD7,
  EN_ANTONYMS_STD7,
  EN_IDIOMS_STD7,
  EN_ONE_WORD_STD7,
  EN_ARTICLES_STD7,
  EN_PREPOSITIONS_STD7,
  EN_TENSES_STD7,
  EN_POS_STD7,
  EN_SPELLING_STD7,
  EN_CORRECTION_STD7,
  EN_PASSAGES_STD7,
} from './msceEnglishBank';
import {
  MR_SYNONYMS_STD4,
  MR_ANTONYMS_STD4,
  MR_IDIOMS_STD4,
  MR_GRAMMAR_STD4,
  MR_MORPHOLOGY_STD4,
  MR_SPELLING_WORDSUB_STD4,
  MR_PASSAGES_STD4,
} from './msceMarathiBankPart1';
import {
  MR_SYNONYMS_STD7,
  MR_ANTONYMS_STD7,
  MR_IDIOMS_STD7,
  MR_SPELLING_WORDSUB_STD7,
} from './msceMarathiStd7Vocab';
import {
  MR_GRAMMAR_STD7,
  MR_MORPHOLOGY_STD7,
  MR_PASSAGES_STD7,
} from './msceMarathiStd7Grammar';
import {
  HI_SYNONYMS_STD4,
  HI_ANTONYMS_STD4,
  HI_IDIOMS_STD4,
} from './msceHindiStd4Vocab';
import { HI_GRAMMAR_STD4 } from './msceHindiStd4Grammar';
import { HI_VOCAB_STD4 } from './msceHindiStd4Vocab2';
import { HI_PASSAGES_STD4 } from './msceHindiStd4Passages';
import {
  HI_SYNONYMS_STD7,
  HI_ANTONYMS_STD7,
  HI_IDIOMS_STD7,
} from './msceHindiStd7Vocab';
import { HI_GRAMMAR_STD7 } from './msceHindiStd7Grammar';
import { HI_VOCAB_STD7 } from './msceHindiStd7Vocab2';
import { HI_PASSAGES_STD7 } from './msceHindiStd7Passages';

export interface MsceLanguageQuestionItem {
  id: string;
  stdLevel: ScholarshipClass;
  languageSubject: ScholarshipLanguage; // The language being tested (English, Marathi, or Hindi)
  mockTestNumber: number; // 1 to 25
  questionNumber: number; // 1 to 25
  topic: string;
  difficulty: 'easy' | 'moderate' | 'difficult';
  questionText: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: Record<ScholarshipLanguage, string>;
  normalizedHash: string;
}

function normalizeLangHash(questionText: string, options: [string, string, string, string]): string {
  const cleanQ = questionText
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();
  const cleanOpts = [...options]
    .map((o) => o.trim().toLowerCase())
    .sort()
    .join('|');
  return `${cleanQ}::${cleanOpts}`;
}

type AnyTuple = LangItemTuple | [string, string, string, string, string];

function unpackEntry(raw: AnyTuple): {
  stem: string;
  correct: string;
  wrongs: [string, string, string];
  exp: string;
} {
  if (Array.isArray(raw[2])) {
    return {
      stem: raw[0],
      correct: raw[1],
      wrongs: raw[2] as [string, string, string],
      exp: (raw as LangItemTuple)[3] || '',
    };
  }
  const t = raw as [string, string, string, string, string];
  return { stem: t[0], correct: t[1], wrongs: [t[2], t[3], t[4]], exp: '' };
}

function placeCorrectOption(
  correctOpt: string,
  distractors: [string, string, string],
  targetCorrectSlot: number
): [string, string, string, string] {
  const arr: string[] = [...distractors];
  arr.splice(targetCorrectSlot, 0, correctOpt);
  return [arr[0], arr[1], arr[2], arr[3]];
}

/**
 * Generates 25 completely unique Language Questions (Q1–Q25) per Mock Test (1..25)
 * for Paper 1 (First Language) or Paper 2 (Second Language), strictly separated between
 * Std 4th (PSE) and Std 7th (UPS) with ZERO repetition across all 25 tests and NO fake tags.
 */
export function generateMsceLanguageSectionQuestions(
  stdLevel: ScholarshipClass,
  languageSubject: ScholarshipLanguage,
  mockTestNumber: number,
  paperNumber: 1 | 2,
  _studentMedium: ScholarshipLanguage
): MsceLanguageQuestionItem[] {
  const tIdx = Math.max(0, Math.min(24, mockTestNumber - 1));
  const isStd4 = stdLevel === 'Std 4th (PSE)';
  const stdCode = isStd4 ? 'std4' : 'std7';
  const langCode = languageSubject === 'English' ? 'en' : languageSubject === 'Marathi' ? 'mr' : 'hi';

  const questions: MsceLanguageQuestionItem[] = [];

  for (let qNum = 1; qNum <= 25; qNum++) {
    // 7 Easy (1–7), 10 Moderate (8–17), 8 Difficult (18–25)
    const difficulty: 'easy' | 'moderate' | 'difficult' =
      qNum <= 7 ? 'easy' : qNum <= 17 ? 'moderate' : 'difficult';

    let topic = 'Grammar & Vocabulary';
    let questionText = '';
    let options: [string, string, string, string] = ['', '', '', ''];
    const targetCorrectSlot = (mockTestNumber * 3 + qNum * 5 + paperNumber) % 4;
    const correctIndex = targetCorrectSlot;
    let explanationEn = '';
    let explanationMr = '';
    let explanationHi = '';

    if (languageSubject === 'English') {
      const synList = isStd4 ? EN_SYNONYMS_STD4 : EN_SYNONYMS_STD7;
      const antList = isStd4 ? EN_ANTONYMS_STD4 : EN_ANTONYMS_STD7;
      const idiomList = isStd4 ? EN_IDIOMS_STD4 : EN_IDIOMS_STD7;
      const oneWordList = isStd4 ? EN_ONE_WORD_STD4 : EN_ONE_WORD_STD7;
      const articleList = isStd4 ? EN_ARTICLES_STD4 : EN_ARTICLES_STD7;
      const prepList = isStd4 ? EN_PREPOSITIONS_STD4 : EN_PREPOSITIONS_STD7;
      const tenseList = isStd4 ? EN_TENSES_STD4 : EN_TENSES_STD7;
      const posList = isStd4 ? EN_POS_STD4 : EN_POS_STD7;
      const spellList = isStd4 ? EN_SPELLING_STD4 : EN_SPELLING_STD7;
      const corrList = isStd4 ? EN_CORRECTION_STD4 : EN_CORRECTION_STD7;
      const passageList: ComprehensionPassageItem[] = isStd4 ? EN_PASSAGES_STD4 : EN_PASSAGES_STD7;

      if (qNum <= 2) {
        const entry = unpackEntry(synList[tIdx * 2 + (qNum - 1)]);
        topic = 'Synonyms (Vocabulary)';
        questionText = `Choose the word closest in meaning (synonym) to '${entry.stem}':`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationEn = `'${entry.correct}' is the correct synonym for '${entry.stem}'.`;
        explanationMr = `'${entry.stem}' या इंग्रजी शब्दाचा योग्य समानार्थी शब्द '${entry.correct}' हा आहे.`;
        explanationHi = `'${entry.stem}' शब्द का सही समानार्थी शब्द '${entry.correct}' है।`;
      } else if (qNum <= 4) {
        const entry = unpackEntry(antList[tIdx * 2 + (qNum - 3)]);
        topic = 'Antonyms (Opposite Words)';
        questionText = `Select the correct opposite word (antonym) for '${entry.stem}':`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationEn = `'${entry.correct}' is the exact antonym (opposite) of '${entry.stem}'.`;
        explanationMr = `'${entry.stem}' या शब्दाचा विरुद्धार्थी शब्द '${entry.correct}' आहे.`;
        explanationHi = `'${entry.stem}' शब्द का सही विलोम (विपरीतार्थक) शब्द '${entry.correct}' है।`;
      } else if (qNum <= 6) {
        const entry = unpackEntry(idiomList[tIdx * 2 + (qNum - 5)]);
        topic = 'Idioms and Phrases';
        questionText = `What is the correct meaning of the idiom "${entry.stem}"?`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationEn = `The idiom "${entry.stem}" means "${entry.correct}".`;
        explanationMr = `"${entry.stem}" या इंग्रजी वाक्प्रचाराचा अर्थ "${entry.correct}" असा होतो.`;
        explanationHi = `"${entry.stem}" मुहावरे का सही अर्थ "${entry.correct}" है।`;
      } else if (qNum <= 8) {
        const entry = unpackEntry(oneWordList[tIdx * 2 + (qNum - 7)]);
        topic = 'One-Word Substitution';
        questionText = `Choose one word for the phrase: "${entry.stem}"`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationEn = `"${entry.stem}" is known as '${entry.correct}'.`;
        explanationMr = `"${entry.stem}" यासाठी एक शब्द '${entry.correct}' असा वापरतात.`;
        explanationHi = `"${entry.stem}" के लिए एक शब्द '${entry.correct}' है।`;
      } else if (qNum <= 10) {
        const item = unpackEntry(articleList[tIdx * 2 + (qNum - 9)]);
        topic = 'Articles & Determiners';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `व्याकरण नियम: ${item.exp}`;
        explanationHi = `व्याकरण नियम: ${item.exp}`;
      } else if (qNum <= 12) {
        const item = unpackEntry(prepList[tIdx * 2 + (qNum - 11)]);
        topic = 'Prepositions & Phrasal Verbs';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `योग्य शब्दयोगी अव्यय: ${item.exp}`;
        explanationHi = `सही संबंधबोधक अव्यय: ${item.exp}`;
      } else if (qNum <= 14) {
        const item = unpackEntry(tenseList[tIdx * 2 + (qNum - 13)]);
        topic = isStd4 ? 'Tenses & Verb Forms' : 'Tenses, Voice & Speech';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `काळ व क्रियापद नियम: ${item.exp}`;
        explanationHi = `काल एवं क्रिया नियम: ${item.exp}`;
      } else if (qNum <= 16) {
        const item = unpackEntry(posList[tIdx * 2 + (qNum - 15)]);
        topic = isStd4 ? 'Parts of Speech & Gender/Number' : 'Parts of Speech, Clauses & Figures of Speech';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `शब्दाची जात / अलंकार: ${item.exp}`;
        explanationHi = `शब्द-भेद / अलंकार: ${item.exp}`;
      } else if (qNum <= 18) {
        const item = unpackEntry(spellList[tIdx * 2 + (qNum - 17)]);
        topic = 'Correct Spelling & Word Building';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `अचूक शुद्धलेखन: '${item.correct}' (${item.exp})`;
        explanationHi = `सही वर्तनी: '${item.correct}' (${item.exp})`;
      } else if (qNum <= 20) {
        const item = unpackEntry(corrList[tIdx * 2 + (qNum - 19)]);
        topic = 'Sentence Correction & Punctuation';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationEn = item.exp;
        explanationMr = `वाक्य शुद्धीकरण व विरामचिन्हे: ${item.exp}`;
        explanationHi = `वाक्य शुद्धि एवं विराम चिह्न: ${item.exp}`;
      } else {
        const passageObj = passageList[tIdx];
        const pq = passageObj.questions[qNum - 21];
        topic = 'Reading Comprehension (Unseen Passage)';
        questionText = `Read the following passage carefully and answer the question:\n\n"${passageObj.passage}"\n\nQuestion: ${pq.q}`;
        options = placeCorrectOption(pq.correct, pq.wrongs, targetCorrectSlot);
        explanationEn = pq.exp;
        explanationMr = `उताऱ्यानुसार स्पष्टीकरण: ${pq.exp}`;
        explanationHi = `गद्यांश के अनुसार उत्तर: ${pq.exp}`;
      }
    } else if (languageSubject === 'Marathi') {
      const synList = isStd4 ? MR_SYNONYMS_STD4 : MR_SYNONYMS_STD7;
      const antList = isStd4 ? MR_ANTONYMS_STD4 : MR_ANTONYMS_STD7;
      const idiomList = isStd4 ? MR_IDIOMS_STD4 : MR_IDIOMS_STD7;
      const grammarList = isStd4 ? MR_GRAMMAR_STD4 : MR_GRAMMAR_STD7;
      const morphList = isStd4 ? MR_MORPHOLOGY_STD4 : MR_MORPHOLOGY_STD7;
      const spellWordList = isStd4 ? MR_SPELLING_WORDSUB_STD4 : MR_SPELLING_WORDSUB_STD7;
      const passageList = isStd4 ? MR_PASSAGES_STD4 : MR_PASSAGES_STD7;

      if (qNum <= 3) {
        const entry = unpackEntry(synList[tIdx * 3 + (qNum - 1)]);
        topic = 'समानार्थी शब्द (Synonyms)';
        questionText = `'${entry.stem}' या शब्दाचा योग्य समानार्थी शब्द निवडा:`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationMr = `'${entry.stem}' या शब्दाचा योग्य समानार्थी शब्द '${entry.correct}' आहे.${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Marathi synonym of '${entry.stem}' is '${entry.correct}'.`;
        explanationHi = `'${entry.stem}' का मराठी समानार्थी शब्द '${entry.correct}' है।`;
      } else if (qNum <= 6) {
        const entry = unpackEntry(antList[tIdx * 3 + (qNum - 4)]);
        topic = 'विरुद्धार्थी शब्द (Antonyms)';
        questionText = `'${entry.stem}' या शब्दाचा योग्य विरुद्धार्थी शब्द ओळखा:`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationMr = `'${entry.stem}' या शब्दाचा अचूक विरुद्धार्थी शब्द '${entry.correct}' आहे.${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Marathi antonym of '${entry.stem}' is '${entry.correct}'.`;
        explanationHi = `'${entry.stem}' का मराठी विलोम शब्द '${entry.correct}' है।`;
      } else if (qNum <= 10) {
        const entry = unpackEntry(idiomList[tIdx * 4 + (qNum - 7)]);
        topic = 'वाक्प्रचार व म्हणी (Idioms & Proverbs)';
        questionText = `खालील वाक्प्रचार किंवा म्हणीचा अचूक अर्थ निवडा:\n"${entry.stem}"`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationMr = `"${entry.stem}" चा योग्य अर्थ "${entry.correct}" असा आहे.${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Marathi idiom "${entry.stem}" means "${entry.correct}".`;
        explanationHi = `मराठी वाक्प्रचार "${entry.stem}" का अर्थ "${entry.correct}" है।`;
      } else if (qNum <= 13) {
        const item = unpackEntry(grammarList[tIdx * 3 + (qNum - 11)]);
        topic = 'मराठी व्याकरण (शब्दांच्या जाती, काळ, प्रयोग/समास)';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationMr = item.exp;
        explanationEn = `Marathi Grammar: Answer is '${item.correct}'. (${item.exp})`;
        explanationHi = `मराठी व्याकरण: सही उत्तर '${item.correct}' है। (${item.exp})`;
      } else if (qNum <= 16) {
        const item = unpackEntry(morphList[tIdx * 3 + (qNum - 14)]);
        topic = 'लिंग, वचन व विभक्ती विचार';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationMr = item.exp;
        explanationEn = `Marathi Gender/Number/Case: Answer is '${item.correct}'. (${item.exp})`;
        explanationHi = `लिंग-वचन-विभक्ति: सही उत्तर '${item.correct}' है। (${item.exp})`;
      } else if (qNum <= 20) {
        const item = unpackEntry(spellWordList[tIdx * 4 + (qNum - 17)]);
        topic = 'शुद्धलेखन, अलंकारिक व शब्दसमूहाबद्दल एक शब्द';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationMr = item.exp;
        explanationEn = `Marathi Spelling/Word Substitution: Answer is '${item.correct}'. (${item.exp})`;
        explanationHi = `शुद्धलेखन व शब्द-समूह: सही उत्तर '${item.correct}' है। (${item.exp})`;
      } else {
        const passageObj = passageList[tIdx];
        const pq = passageObj.questions[qNum - 21];
        topic = 'आकलन – अपठित उतारा (Comprehension)';
        questionText = `खालील उतारा काळजीपूर्वक वाचून विचारलेल्या प्रश्नाचे अचूक उत्तर निवडा:\n\n"${passageObj.passage}"\n\nप्रश्न: ${pq.q}`;
        options = placeCorrectOption(pq.correct, pq.wrongs, targetCorrectSlot);
        explanationMr = pq.exp;
        explanationEn = `Based on the Marathi passage, '${pq.correct}' is correct. (${pq.exp})`;
        explanationHi = `मराठी गद्यांश के अनुसार सही उत्तर '${pq.correct}' है। (${pq.exp})`;
      }
    } else {
      // Hindi (First Language for Hindi Medium)
      const synList = isStd4 ? HI_SYNONYMS_STD4 : HI_SYNONYMS_STD7;
      const antList = isStd4 ? HI_ANTONYMS_STD4 : HI_ANTONYMS_STD7;
      const idiomList = isStd4 ? HI_IDIOMS_STD4 : HI_IDIOMS_STD7;
      const grammarList = isStd4 ? HI_GRAMMAR_STD4 : HI_GRAMMAR_STD7;
      const vocabList = isStd4 ? HI_VOCAB_STD4 : HI_VOCAB_STD7;
      const passageList = isStd4 ? HI_PASSAGES_STD4 : HI_PASSAGES_STD7;

      if (qNum <= 3) {
        const entry = unpackEntry(synList[tIdx * 3 + (qNum - 1)]);
        topic = 'पर्यायवाची शब्द (Synonyms)';
        questionText = `'${entry.stem}' शब्द का सही पर्यायवाची (समानार्थी) शब्द चुनिए:`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationHi = `'${entry.stem}' का सही पर्यायवाची शब्द '${entry.correct}' है।${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Hindi synonym of '${entry.stem}' is '${entry.correct}'.`;
        explanationMr = `'${entry.stem}' या हिंदी शब्दाचा समानार्थी शब्द '${entry.correct}' आहे.`;
      } else if (qNum <= 6) {
        const entry = unpackEntry(antList[tIdx * 3 + (qNum - 4)]);
        topic = 'विलोम शब्द (Antonyms)';
        questionText = `'${entry.stem}' शब्द का सही विलोम (विपरीतार्थक) शब्द चुनिए:`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationHi = `'${entry.stem}' का सही विलोम शब्द '${entry.correct}' है।${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Hindi antonym of '${entry.stem}' is '${entry.correct}'.`;
        explanationMr = `'${entry.stem}' या शब्दाचा विरुद्धार्थी शब्द '${entry.correct}' आहे.`;
      } else if (qNum <= 10) {
        const entry = unpackEntry(idiomList[tIdx * 4 + (qNum - 7)]);
        topic = 'मुहावरे एवं लोकोक्तियाँ (Idioms)';
        questionText = `निम्नलिखित मुहावरे अथवा लोकोक्ति का सही अर्थ चुनिए:\n"${entry.stem}"`;
        options = placeCorrectOption(entry.correct, entry.wrongs, targetCorrectSlot);
        explanationHi = `"${entry.stem}" का सही अर्थ "${entry.correct}" है।${entry.exp ? ` (${entry.exp})` : ''}`;
        explanationEn = `The Hindi idiom "${entry.stem}" means "${entry.correct}".`;
        explanationMr = `"${entry.stem}" या हिंदी वाक्प्रचाराचा अर्थ "${entry.correct}" होतो.`;
      } else if (qNum <= 14) {
        const item = unpackEntry(grammarList[tIdx * 4 + (qNum - 11)]);
        topic = 'हिंदी व्याकरण (संधि, समास, लिंग, वचन, कारक)';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationHi = item.exp;
        explanationEn = `Hindi Grammar: Correct answer is '${item.correct}'. (${item.exp})`;
        explanationMr = `हिंदी व्याकरण: अचूक उत्तर '${item.correct}' आहे. (${item.exp})`;
      } else if (qNum <= 20) {
        const item = unpackEntry(vocabList[tIdx * 6 + (qNum - 15)]);
        topic = 'शुद्ध वर्तनी, वाक्यांश एवं शब्द-ज्ञान';
        questionText = item.stem;
        options = placeCorrectOption(item.correct, item.wrongs, targetCorrectSlot);
        explanationHi = item.exp;
        explanationEn = `Hindi Vocabulary & Spelling: Correct answer is '${item.correct}'. (${item.exp})`;
        explanationMr = `शुद्धलेखन व शब्दसंपत्ती: अचूक उत्तर '${item.correct}' आहे. (${item.exp})`;
      } else {
        const passageObj = passageList[tIdx];
        const pq = passageObj.questions[qNum - 21];
        topic = 'अपठित गद्यांश (Reading Comprehension)';
        questionText = `निम्नलिखित गद्यांश को ध्यानपूर्वक पढ़कर पूछे गए प्रश्न का सही उत्तर चुनिए:\n\n"${passageObj.passage}"\n\nप्रश्न: ${pq.q}`;
        options = placeCorrectOption(pq.correct, pq.wrongs, targetCorrectSlot);
        explanationHi = pq.exp;
        explanationEn = `Based on the Hindi passage, '${pq.correct}' is correct. (${pq.exp})`;
        explanationMr = `उताऱ्यानुसार अचूक उत्तर '${pq.correct}' आहे. (${pq.exp})`;
      }
    }

    questions.push({
      id: `msce_${stdCode}_mock${mockTestNumber}_p${paperNumber}_${langCode}_q${qNum}`,
      stdLevel,
      languageSubject,
      mockTestNumber,
      questionNumber: qNum,
      topic,
      difficulty,
      questionText,
      options,
      correctIndex,
      explanation: {
        English: explanationEn,
        Marathi: explanationMr,
        Hindi: explanationHi,
      },
      normalizedHash: normalizeLangHash(questionText, options),
    });
  }

  return questions;
}
