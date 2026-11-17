import {
  getDifficultyFor50Section,
  gcd,
  MsceMedium,
  MsceMockQuestion,
  MscePaperNumber,
  MsceQuestionDifficulty,
  MsceQuestionVerification,
  MsceStdLevel,
  normalizeQuestionText,
  RawGeneratedQuestion,
} from './msceQuestionHelpers';
import { generateMsceLanguageSectionQuestions } from './msceMockLanguageBanks';
import { buildStd4MathsQuestion } from './msceMathsStd4';
import { buildStd7MathsQuestion } from './msceMathsStd7';
import { buildStd4IntelligenceQuestion } from './msceIntelligenceStd4';
import { buildStd7IntelligenceQuestion } from './msceIntelligenceStd7';
import { ALL_STD4_QUESTIONS } from './scholarshipStd4';
import { ALL_STD7_QUESTIONS } from './scholarshipStd7';

export interface MscePaperConfigInfo {
  medium: MsceMedium;
  paper1FirstLanguage: MsceMedium;
  paper1MathsLanguage: MsceMedium;
  paper2SecondLanguage: 'Marathi' | 'English';
  paper2IntelligenceLanguage: MsceMedium;
  paper1Summary: string;
  paper2Summary: string;
}

export function getPaperConfigForMedium(medium: MsceMedium): MscePaperConfigInfo {
  if (medium === 'English') {
    return {
      medium: 'English',
      paper1FirstLanguage: 'English',
      paper1MathsLanguage: 'English',
      paper2SecondLanguage: 'Marathi',
      paper2IntelligenceLanguage: 'English',
      paper1Summary: 'First Language: English (25 Qs • 50 Marks) + Mathematics in English (50 Qs • 100 Marks)',
      paper2Summary: 'Second Language: Marathi (25 Qs • 50 Marks) + Intelligence Test in English (50 Qs • 100 Marks)',
    };
  }
  if (medium === 'Marathi') {
    return {
      medium: 'Marathi',
      paper1FirstLanguage: 'Marathi',
      paper1MathsLanguage: 'Marathi',
      paper2SecondLanguage: 'English',
      paper2IntelligenceLanguage: 'Marathi',
      paper1Summary: 'प्रथम भाषा: मराठी (25 प्रश्न • 50 गुण) + गणित - मराठी माध्यम (50 प्रश्न • 100 गुण)',
      paper2Summary: 'द्वितीय भाषा: इंग्रजी (25 प्रश्न • 50 गुण) + बुद्धिमत्ता चाचणी - मराठी माध्यम (50 प्रश्न • 100 गुण)',
    };
  }
  return {
    medium: 'Hindi',
    paper1FirstLanguage: 'Hindi',
    paper1MathsLanguage: 'Hindi',
    paper2SecondLanguage: 'English',
    paper2IntelligenceLanguage: 'Hindi',
    paper1Summary: 'प्रथम भाषा: हिंदी (25 प्रश्न • 50 अंक) + गणित - हिंदी माध्यम (50 प्रश्न • 100 अंक)',
    paper2Summary: 'द्वितीय भाषा: अंग्रेजी (25 प्रश्न • 50 अंक) + बुद्धिमत्ता परीक्षण - हिंदी माध्यम (50 प्रश्न • 100 अंक)',
  };
}

const FAKE_UNIQUENESS_TAG_REGEX =
  /\[Set\s+\d|\[MSCE-|\(Case\s+\d|Album\s*#\d|\(चाचणी\s+\d|Arrangement Puzzle\s*#\d|Non-Verbal Figure\s*#\d/i;

const INVALID_VALUE_REGEX = /\b(NaN|undefined|Infinity)\b/;

const STD7_ONLY_IN_STD4_REGEX =
  /pythagoras|पायथागोरस|पाइथागोरस|√|∛|simple interest|सरळव्याज|साधारण ब्याज|\blcm\b|\bhcf\b|लसावि|मसावि|30H\s*-\s*5\.5M|discount\s*%|profit\s*%|नफा\s*%|तोटा\s*%|सूट\s*%/i;

function extractNumericFromOption(opt: string): number | null {
  const cleaned = opt.replace(/₹|,/g, '').trim();
  const match = cleaned.match(/^-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function parseFractionString(opt: string): [number, number] | null {
  const trimmed = opt.trim();
  if (/^-?\d+$/.test(trimmed)) {
    return [Number(trimmed), 1];
  }
  const m = trimmed.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2])];
}

function runIndependentLogicAndGrammarChecks(q: MsceMockQuestion): string[] {
  const errors: string[] = [];
  const enText = (q.translations?.English?.question || q.question || '').trim();
  const ansText = (q.options?.[q.correctAnswer] || '').trim();
  const enAnsText = (q.translations?.English?.options?.[q.correctAnswer] || ansText).trim();

  // Check for corrupt strings across all rendered & translated fields
  const fieldsToInspect = [
    q.question,
    q.explanation,
    ...(q.options || []),
    q.translations?.English?.question || '',
    q.translations?.Marathi?.question || '',
    q.translations?.Hindi?.question || '',
    q.translations?.English?.explanation || '',
    q.translations?.Marathi?.explanation || '',
    q.translations?.Hindi?.explanation || '',
  ];
  for (const field of fieldsToInspect) {
    if (INVALID_VALUE_REGEX.test(field)) {
      errors.push('Contains invalid placeholder token (NaN/undefined/Infinity).');
      break;
    }
    if (FAKE_UNIQUENESS_TAG_REGEX.test(field)) {
      errors.push('Contains disallowed synthetic tag/set label.');
      break;
    }
  }

  // Reject identity operator substitutions like '-' means '-'
  if (/means\s+['"]-['"][^.]*?-|(['"][+\-×÷]['"])\s+means\s+\1/i.test(enText)) {
    errors.push('Contains identity operator substitution rule.');
  }

  // Independent arithmetic checks where pattern is deterministically parseable
  // 1. Predecessor and successor sum
  const predSuccMatch = enText.match(/predecessor and the successor of the number (\d+)/i);
  if (predSuccMatch) {
    const expected = Number(predSuccMatch[1]) * 2;
    const got = extractNumericFromOption(enAnsText);
    if (got !== expected) {
      errors.push(`Predecessor+Successor mismatch: expected ${expected}, got ${got}.`);
    }
  }

  // 2. Integer expression (-a) × (-b) + (-c)
  const intExprMatch = enText.match(/\(-(\d+)\)\s*×\s*\(-(\d+)\)\s*\+\s*\(-(\d+)\)/);
  if (intExprMatch) {
    const expected = Number(intExprMatch[1]) * Number(intExprMatch[2]) - Number(intExprMatch[3]);
    const got = extractNumericFromOption(enAnsText);
    if (got !== expected) {
      errors.push(`Integer expression mismatch: expected ${expected}, got ${got}.`);
    }
  }

  // 3. Three-term addition A + B + C = ?
  const sum3Match = enText.match(/:\s*(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)\s*=\s*\?/);
  if (sum3Match) {
    const expected = Number(sum3Match[1]) + Number(sum3Match[2]) + Number(sum3Match[3]);
    const got = extractNumericFromOption(enAnsText);
    if (got !== expected) {
      errors.push(`3-term sum mismatch: expected ${expected}, got ${got}.`);
    }
  }

  // 4. Fraction addition (a/b) + (c/d) = ?
  const fracAddMatch = enText.match(/\((\d+)\/(\d+)\)\s*\+\s*\((\d+)\/(\d+)\)/);
  if (fracAddMatch) {
    const a = Number(fracAddMatch[1]);
    const b = Number(fracAddMatch[2]);
    const c = Number(fracAddMatch[3]);
    const d = Number(fracAddMatch[4]);
    const rawNum = a * d + c * b;
    const rawDen = b * d;
    const g = gcd(rawNum, rawDen);
    const expN = rawNum / g;
    const expD = rawDen / g;
    const parsedAns = parseFractionString(enAnsText);
    if (!parsedAns || parsedAns[0] !== expN || parsedAns[1] !== expD) {
      errors.push(`Fraction sum mismatch: expected ${expN}/${expD}, got ${enAnsText}.`);
    }
  }

  // 5. Rectangle perimeter or area
  const rectMatch = enText.match(/length\s+(\d+)\s*cm\s+and\s+breadth\s+(\d+)\s*cm.*?(area|perimeter)/i);
  if (rectMatch) {
    const l = Number(rectMatch[1]);
    const b = Number(rectMatch[2]);
    const mode = rectMatch[3].toLowerCase();
    const expected = mode === 'area' ? l * b : 2 * (l + b);
    const got = extractNumericFromOption(enAnsText);
    if (got !== expected) {
      errors.push(`Rectangle ${mode} mismatch: expected ${expected}, got ${got}.`);
    }
  }

  // 6. North-East straight-line Pythagoras distance
  const pythMatch = enText.match(/walks\s+(\d+)\s*m\s+due\s+North.*?walks\s+(\d+)\s*m.*?shortest\s+straight-line/i);
  if (pythMatch) {
    const dN = Number(pythMatch[1]);
    const dE = Number(pythMatch[2]);
    const expected = Math.round(Math.hypot(dN, dE));
    const got = extractNumericFromOption(enAnsText);
    if (got !== expected || dN * dN + dE * dE !== expected * expected) {
      errors.push(`Pythagoras distance mismatch: expected ${expected}, got ${got}.`);
    }
  }

  return errors;
}

function buildIndependentQuestionIdentity(q: MsceMockQuestion): {
  primaryHash: string;
  enStemHash: string;
  renderedStemHash: string;
} {
  const enStemHash = normalizeQuestionText(q.translations?.English?.question || q.question);
  const renderedStemHash = normalizeQuestionText(q.question);
  const sortedOpts = [...(q.options || [])]
    .map((o) => (o || '').trim().toLowerCase())
    .sort()
    .join('|');
  const isLanguageSection =
    q.section === 'First Language' || q.section === 'Second Language';
  const primaryHash = isLanguageSection
    ? `${renderedStemHash}::${sortedOpts}`
    : enStemHash || renderedStemHash;
  return { primaryHash, enStemHash, renderedStemHash };
}

/**
 * Performs independent programmatic academic verification on a single MSCE mock question.
 * Returns greenVerified=true ONLY when every structural, option, answer-key, logic,
 * syllabus-boundary, and zero-duplicate check passes.
 */
export function verifySingleMockQuestion(
  q: MsceMockQuestion,
  seenHashes?: Set<string>,
  practiceHashes?: Set<string>
): MsceQuestionVerification {
  const failureReasons: string[] = [];

  const qTextValid = Boolean(q.question && q.question.trim().length >= 5);
  const expValid = Boolean(q.explanation && q.explanation.trim().length >= 3);
  const sectionQRangeValid =
    q.section === 'First Language' || q.section === 'Second Language'
      ? q.questionNumber >= 1 && q.questionNumber <= 25
      : q.questionNumber >= 26 && q.questionNumber <= 75;
  const translationsExist = Boolean(
    q.translations?.English?.question?.trim() &&
      q.translations?.Marathi?.question?.trim() &&
      q.translations?.Hindi?.question?.trim()
  );

  const structureValid =
    qTextValid &&
    expValid &&
    sectionQRangeValid &&
    q.marks === 2 &&
    translationsExist &&
    !FAKE_UNIQUENESS_TAG_REGEX.test(q.question);

  if (!structureValid) {
    failureReasons.push('Failed structure, marks=2, or required 3-language text check.');
  }

  const checkFourUnique = (opts: string[] | undefined): boolean => {
    if (!opts || opts.length !== 4) return false;
    const trimmed = opts.map((o) => (o || '').trim());
    if (trimmed.some((o) => o.length === 0)) return false;
    return new Set(trimmed.map((o) => o.toLowerCase())).size === 4;
  };

  const fourDistinctOptions =
    checkFourUnique(q.options) &&
    checkFourUnique(q.translations?.English?.options) &&
    checkFourUnique(q.translations?.Marathi?.options) &&
    checkFourUnique(q.translations?.Hindi?.options);

  if (!fourDistinctOptions) {
    failureReasons.push('Requires 4 non-empty distinct options across all language sets.');
  }

  const answerKeyValid =
    Number.isInteger(q.correctAnswer) &&
    q.correctAnswer >= 0 &&
    q.correctAnswer <= 3 &&
    Boolean(q.options?.[q.correctAnswer]?.trim());

  if (!answerKeyValid) {
    failureReasons.push('Invalid correctAnswer index (must be 0..3).');
  }

  const logicErrors = runIndependentLogicAndGrammarChecks(q);
  const computationAndGrammarValid = logicErrors.length === 0;
  if (!computationAndGrammarValid) {
    failureReasons.push(...logicErrors);
  }

  let syllabusAligned = true;
  if (q.stdLevel === 'Std 4th') {
    const combinedText = `${q.question} ${q.explanation} ${q.translations?.English?.question || ''} ${q.translations?.English?.explanation || ''}`;
    if (STD7_ONLY_IN_STD4_REGEX.test(combinedText)) {
      syllabusAligned = false;
      failureReasons.push('Std 4th syllabus boundary violation (contains Std 7th-level topic/formula).');
    }
  }

  let zeroDuplicate = true;
  const isLanguageSection =
    q.section === 'First Language' || q.section === 'Second Language';
  const { primaryHash, enStemHash, renderedStemHash } = buildIndependentQuestionIdentity(q);
  if (seenHashes) {
    if (isLanguageSection) {
      if (seenHashes.has(primaryHash) || (q.normalizedHash && seenHashes.has(q.normalizedHash))) {
        zeroDuplicate = false;
        failureReasons.push('Duplicate language question+options detected within standard or mock test.');
      }
    } else if (
      seenHashes.has(primaryHash) ||
      (q.normalizedHash && seenHashes.has(q.normalizedHash)) ||
      (enStemHash && seenHashes.has(enStemHash)) ||
      (renderedStemHash && seenHashes.has(renderedStemHash))
    ) {
      zeroDuplicate = false;
      failureReasons.push('Duplicate question detected within standard or mock test.');
    }
  }
  if (practiceHashes) {
    if (
      practiceHashes.has(primaryHash) ||
      (!isLanguageSection &&
        ((enStemHash && practiceHashes.has(enStemHash)) ||
          (renderedStemHash && practiceHashes.has(renderedStemHash))))
    ) {
      zeroDuplicate = false;
      failureReasons.push('Collides with existing 20-set practice bank question.');
    }
  }

  const greenVerified =
    structureValid &&
    fourDistinctOptions &&
    answerKeyValid &&
    computationAndGrammarValid &&
    syllabusAligned &&
    zeroDuplicate;

  return {
    greenVerified,
    verifiedAt: new Date().toISOString(),
    checks: {
      structureValid,
      fourDistinctOptions,
      answerKeyValid,
      computationAndGrammarValid,
      syllabusAligned,
      zeroDuplicate,
    },
    failureReasons,
  };
}

let cachedPracticeHashes: Set<string> | null = null;
export function getExistingPracticeBankHashes(): Set<string> {
  if (cachedPracticeHashes) return cachedPracticeHashes;
  const set = new Set<string>();
  for (const q of [...ALL_STD4_QUESTIONS, ...ALL_STD7_QUESTIONS]) {
    for (const lang of ['English', 'Marathi', 'Hindi'] as const) {
      const text = q.questionText?.[lang];
      if (text) {
        const h = normalizeQuestionText(text);
        if (h) set.add(h);
      }
    }
  }
  cachedPracticeHashes = set;
  return set;
}

function buildSection2QuestionsRaw(
  stdLevel: MsceStdLevel,
  paperNumber: MscePaperNumber,
  mockTestNumber: number,
  renderMedium: MsceMedium
): MsceMockQuestion[] {
  const isStd7 = stdLevel === 'Std 7th';
  const out: MsceMockQuestion[] = [];

  for (let idx = 0; idx < 50; idx++) {
    const qNum = 26 + idx;
    const difficulty: MsceQuestionDifficulty = getDifficultyFor50Section(idx, mockTestNumber);
    const correctAnswer =
      paperNumber === 1
        ? (mockTestNumber * 5 + idx * 3 + (isStd7 ? 2 : 1)) % 4
        : (mockTestNumber * 7 + idx * 5 + (isStd7 ? 3 : 1)) % 4;

    const raw: RawGeneratedQuestion =
      paperNumber === 1
        ? isStd7
          ? buildStd7MathsQuestion(mockTestNumber, idx, correctAnswer)
          : buildStd4MathsQuestion(mockTestNumber, idx, correctAnswer)
        : isStd7
          ? buildStd7IntelligenceQuestion(mockTestNumber, idx, correctAnswer)
          : buildStd4IntelligenceQuestion(mockTestNumber, idx, correctAnswer);

    const translations = {
      English: { question: raw.enQ, options: raw.enOpts, explanation: raw.enExp },
      Marathi: { question: raw.mrQ, options: raw.mrOpts, explanation: raw.mrExp },
      Hindi: { question: raw.hiQ, options: raw.hiOpts, explanation: raw.hiExp },
    };

    const chosen = translations[renderMedium];
    const subjectLabel =
      paperNumber === 1
        ? renderMedium === 'English'
          ? 'Mathematics'
          : 'गणित (Mathematics)'
        : renderMedium === 'Marathi'
          ? 'बुद्धिमत्ता चाचणी (Intelligence Test)'
          : renderMedium === 'Hindi'
            ? 'बुद्धिमत्ता परीक्षण (Intelligence Test)'
            : 'Intelligence Test';

    const seed = mockTestNumber * 100 + idx + (isStd7 ? (paperNumber === 1 ? 5000 : 9000) : paperNumber === 1 ? 1000 : 3000);

    out.push({
      id: `msce-${isStd7 ? 'std7' : 'std4'}-t${mockTestNumber}-p${paperNumber}-q${qNum}-${seed}`,
      questionNumber: qNum,
      stdLevel,
      mockTestNumber,
      paperNumber,
      section: paperNumber === 1 ? 'Mathematics' : 'Intelligence Test',
      subjectLabel,
      languageRendered: renderMedium,
      topic: raw.topic,
      difficulty,
      marks: 2,
      question: chosen.question,
      options: chosen.options,
      correctAnswer,
      explanation: chosen.explanation,
      translations,
      normalizedHash: normalizeQuestionText(raw.enQ),
    });
  }

  return out;
}

/**
 * Builds and verifies an official 75-question (150 Marks) Paper 1 or Paper 2.
 */
export function buildVerifiedMockPaper(
  stdLevel: MsceStdLevel,
  mockTestNumber: number,
  paperNumber: MscePaperNumber,
  studentMedium: MsceMedium,
  customOverrides: MsceMockQuestion[] = []
): MsceMockQuestion[] {
  const config = getPaperConfigForMedium(studentMedium);
  const languageTarget =
    paperNumber === 1 ? config.paper1FirstLanguage : config.paper2SecondLanguage;
  const roleLabel =
    paperNumber === 1
      ? `First Language (${languageTarget})`
      : `Second Language (${languageTarget})`;
  const scholarshipStdClass =
    stdLevel === 'Std 4th' ? 'Std 4th (PSE)' : 'Std 7th (UPS)';

  const rawLangQuestions = generateMsceLanguageSectionQuestions(
    scholarshipStdClass,
    languageTarget,
    mockTestNumber,
    paperNumber,
    studentMedium
  );

  const langSectionQuestions: MsceMockQuestion[] = rawLangQuestions.map((lq) => {
    const mappedDifficulty: MsceQuestionDifficulty =
      lq.difficulty === 'easy'
        ? 'Easy'
        : lq.difficulty === 'moderate'
          ? 'Medium'
          : 'Difficult';
    const localizedExp =
      lq.explanation[studentMedium] || lq.explanation.English || '';
    return {
      id: lq.id,
      questionNumber: lq.questionNumber,
      stdLevel,
      mockTestNumber: lq.mockTestNumber,
      paperNumber,
      section: paperNumber === 1 ? 'First Language' : 'Second Language',
      subjectLabel: roleLabel,
      languageRendered: lq.languageSubject,
      topic: lq.topic,
      difficulty: mappedDifficulty,
      marks: 2,
      question: lq.questionText,
      options: lq.options,
      correctAnswer: lq.correctIndex,
      explanation: localizedExp,
      translations: {
        English: {
          question: lq.questionText,
          options: lq.options,
          explanation: lq.explanation.English || localizedExp,
        },
        Marathi: {
          question: lq.questionText,
          options: lq.options,
          explanation: lq.explanation.Marathi || localizedExp,
        },
        Hindi: {
          question: lq.questionText,
          options: lq.options,
          explanation: lq.explanation.Hindi || localizedExp,
        },
      },
      normalizedHash: lq.normalizedHash,
    };
  });

  const section2Medium =
    paperNumber === 1 ? config.paper1MathsLanguage : config.paper2IntelligenceLanguage;
  const section2Questions = buildSection2QuestionsRaw(
    stdLevel,
    paperNumber,
    mockTestNumber,
    section2Medium
  );

  const combined = [...langSectionQuestions, ...section2Questions];

  if (customOverrides.length > 0) {
    for (const override of customOverrides) {
      if (
        override.stdLevel === stdLevel &&
        override.mockTestNumber === mockTestNumber &&
        override.paperNumber === paperNumber &&
        override.questionNumber >= 1 &&
        override.questionNumber <= 75
      ) {
        const idx = override.questionNumber - 1;
        const localized = override.translations?.[studentMedium];
        combined[idx] = {
          ...override,
          question: localized?.question || override.question,
          options: localized?.options || override.options,
          explanation: localized?.explanation || override.explanation,
          isCustomOverride: true,
        };
      }
    }
  }

  const recordQuestionIdentity = (q: MsceMockQuestion, target: Set<string>) => {
    const isLang = q.section === 'First Language' || q.section === 'Second Language';
    const { primaryHash, enStemHash, renderedStemHash } = buildIndependentQuestionIdentity(q);
    if (primaryHash) target.add(primaryHash);
    if (q.normalizedHash) target.add(q.normalizedHash);
    if (!isLang) {
      if (enStemHash) target.add(enStemHash);
      if (renderedStemHash) target.add(renderedStemHash);
    }
  };

  const practiceHashes = getExistingPracticeBankHashes();
  const withinPaperSeen = new Set<string>();

  return combined.map((q) => {
    const verification = verifySingleMockQuestion(q, withinPaperSeen, practiceHashes);
    recordQuestionIdentity(q, withinPaperSeen);
    return {
      ...q,
      verification,
    };
  });
}

export interface MockTestBundleVerification {
  stdLevel: MsceStdLevel;
  mockTestNumber: number;
  medium: MsceMedium;
  totalQuestions: number; // 150
  verifiedCount: number;
  failedCount: number;
  withinTestDuplicates: number;
  isVerifiedMockTest: boolean;
  paper1VerifiedCount: number;
  paper2VerifiedCount: number;
  paper1Questions: MsceMockQuestion[];
  paper2Questions: MsceMockQuestion[];
  failures: Array<{
    paperNumber: MscePaperNumber;
    questionNumber: number;
    section: string;
    reasons: string[];
  }>;
}

export function verifyMockTestBundle(
  stdLevel: MsceStdLevel,
  mockTestNumber: number,
  medium: MsceMedium,
  customOverrides: MsceMockQuestion[] = [],
  crossTestSeenHashes?: Set<string>
): MockTestBundleVerification {
  const practiceHashes = getExistingPracticeBankHashes();
  const paper1Questions = buildVerifiedMockPaper(
    stdLevel,
    mockTestNumber,
    1,
    medium,
    customOverrides
  );
  const paper2Questions = buildVerifiedMockPaper(
    stdLevel,
    mockTestNumber,
    2,
    medium,
    customOverrides
  );

  const withinTestSeen = new Set<string>();
  const failures: MockTestBundleVerification['failures'] = [];
  let verifiedCount = 0;
  let paper1VerifiedCount = 0;
  let paper2VerifiedCount = 0;
  let withinTestDuplicates = 0;

  const isPresentIn = (q: MsceMockQuestion, target: Set<string>): boolean => {
    const isLang = q.section === 'First Language' || q.section === 'Second Language';
    const { primaryHash, enStemHash, renderedStemHash } = buildIndependentQuestionIdentity(q);
    if (target.has(primaryHash) || (q.normalizedHash && target.has(q.normalizedHash))) {
      return true;
    }
    if (!isLang) {
      if ((enStemHash && target.has(enStemHash)) || (renderedStemHash && target.has(renderedStemHash))) {
        return true;
      }
    }
    return false;
  };

  const addIdentity = (q: MsceMockQuestion, target: Set<string>) => {
    const isLang = q.section === 'First Language' || q.section === 'Second Language';
    const { primaryHash, enStemHash, renderedStemHash } = buildIndependentQuestionIdentity(q);
    if (primaryHash) target.add(primaryHash);
    if (q.normalizedHash) target.add(q.normalizedHash);
    if (!isLang) {
      if (enStemHash) target.add(enStemHash);
      if (renderedStemHash) target.add(renderedStemHash);
    }
  };

  const inspectPaper = (qs: MsceMockQuestion[], pNum: MscePaperNumber) => {
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const dupWithin = isPresentIn(q, withinTestSeen);
      if (dupWithin) withinTestDuplicates++;

      const activeSeen = crossTestSeenHashes || withinTestSeen;
      const ver = verifySingleMockQuestion(q, activeSeen, practiceHashes);
      qs[i] = { ...q, verification: ver };

      addIdentity(q, withinTestSeen);
      if (crossTestSeenHashes) addIdentity(q, crossTestSeenHashes);

      if (ver.greenVerified) {
        verifiedCount++;
        if (pNum === 1) paper1VerifiedCount++;
        else paper2VerifiedCount++;
      } else {
        failures.push({
          paperNumber: pNum,
          questionNumber: q.questionNumber,
          section: q.section,
          reasons: ver.failureReasons,
        });
      }
    }
  };

  inspectPaper(paper1Questions, 1);
  inspectPaper(paper2Questions, 2);

  return {
    stdLevel,
    mockTestNumber,
    medium,
    totalQuestions: paper1Questions.length + paper2Questions.length,
    verifiedCount,
    failedCount: paper1Questions.length + paper2Questions.length - verifiedCount,
    withinTestDuplicates,
    isVerifiedMockTest:
      paper1Questions.length + paper2Questions.length === 150 &&
      verifiedCount === 150 &&
      withinTestDuplicates === 0,
    paper1VerifiedCount,
    paper2VerifiedCount,
    paper1Questions,
    paper2Questions,
    failures,
  };
}

export interface VerifiedMockTestSummary {
  mockTestNumber: number;
  isVerifiedMockTest: boolean;
  verifiedCount: number;
  totalQuestions: number;
  paper1VerifiedCount: number;
  paper2VerifiedCount: number;
}

const verificationMapCache = new Map<string, Record<number, VerifiedMockTestSummary>>();

export function getVerifiedMockTestStatusMap(
  stdLevel: MsceStdLevel,
  medium: MsceMedium,
  customOverrides: MsceMockQuestion[] = []
): Record<number, VerifiedMockTestSummary> {
  const cacheKey = `${stdLevel}__${medium}__${customOverrides.length}`;
  if (customOverrides.length === 0 && verificationMapCache.has(cacheKey)) {
    return verificationMapCache.get(cacheKey)!;
  }

  const result: Record<number, VerifiedMockTestSummary> = {};
  const crossSeen = new Set<string>();

  for (let t = 1; t <= 25; t++) {
    const bundle = verifyMockTestBundle(stdLevel, t, medium, customOverrides, crossSeen);
    result[t] = {
      mockTestNumber: t,
      isVerifiedMockTest: bundle.isVerifiedMockTest,
      verifiedCount: bundle.verifiedCount,
      totalQuestions: bundle.totalQuestions,
      paper1VerifiedCount: bundle.paper1VerifiedCount,
      paper2VerifiedCount: bundle.paper2VerifiedCount,
    };
  }

  if (customOverrides.length === 0) {
    verificationMapCache.set(cacheKey, result);
  }
  return result;
}

export interface StandardAcademicAuditReport {
  stdLevel: MsceStdLevel;
  auditedAt: string;
  totalMockTests: number; // 25
  verifiedMockTestsCount: number; // out of 25
  totalQuestionsPerMedium: number; // 3,750
  totalRenderedSlotsAcross3Mediums: number; // 11,250
  withinTestDuplicates: number;
  crossTestDuplicates: number;
  practiceBankCollisions: number;
  syllabusBoundaryViolations: number;
  optionAndKeyFailures: number;
  fakeTagViolations: number;
  mediumBreakdown: Record<
    MsceMedium,
    {
      totalQuestions: number;
      greenVerifiedCount: number;
      verifiedMockTests: number;
      duplicates: number;
      failures: number;
    }
  >;
  sectionTotalsPerMedium: {
    firstLanguage: number; // 625
    mathematics: number; // 1250
    secondLanguage: number; // 625
    intelligenceTest: number; // 1250
  };
  sampleFailures: Array<{
    medium: MsceMedium;
    mockTestNumber: number;
    paperNumber: MscePaperNumber;
    questionNumber: number;
    reasons: string[];
  }>;
}

/**
 * Runs an independent, exhaustive academic audit across ALL 25 Mock Tests
 * for either Std. 4th (PSE) or Std. 7th (UPS) across all 3 exam mediums (English, Marathi, Hindi).
 */
export function runFullStandardAcademicAudit(
  stdLevel: MsceStdLevel,
  customOverrides: MsceMockQuestion[] = []
): StandardAcademicAuditReport {
  const mediums: MsceMedium[] = ['English', 'Marathi', 'Hindi'];
  const practiceHashes = getExistingPracticeBankHashes();

  let withinTestDuplicates = 0;
  let crossTestDuplicates = 0;
  let practiceBankCollisions = 0;
  let syllabusBoundaryViolations = 0;
  let optionAndKeyFailures = 0;
  let fakeTagViolations = 0;
  const sampleFailures: StandardAcademicAuditReport['sampleFailures'] = [];

  const mediumBreakdown: StandardAcademicAuditReport['mediumBreakdown'] = {
    English: { totalQuestions: 0, greenVerifiedCount: 0, verifiedMockTests: 0, duplicates: 0, failures: 0 },
    Marathi: { totalQuestions: 0, greenVerifiedCount: 0, verifiedMockTests: 0, duplicates: 0, failures: 0 },
    Hindi: { totalQuestions: 0, greenVerifiedCount: 0, verifiedMockTests: 0, duplicates: 0, failures: 0 },
  };

  // Track tests that pass ALL 3 mediums (150 * 3)
  const testPassedAllMediums = new Map<number, boolean>();
  for (let t = 1; t <= 25; t++) testPassedAllMediums.set(t, true);

  for (const med of mediums) {
    const crossSeenForMed = new Set<string>();
    for (let t = 1; t <= 25; t++) {
      const bundle = verifyMockTestBundle(stdLevel, t, med, customOverrides, crossSeenForMed);
      mediumBreakdown[med].totalQuestions += bundle.totalQuestions;
      mediumBreakdown[med].greenVerifiedCount += bundle.verifiedCount;
      mediumBreakdown[med].failures += bundle.failedCount;
      withinTestDuplicates += bundle.withinTestDuplicates;

      if (bundle.isVerifiedMockTest) {
        mediumBreakdown[med].verifiedMockTests += 1;
      } else {
        testPassedAllMediums.set(t, false);
      }

      const allQs = [...bundle.paper1Questions, ...bundle.paper2Questions];
      for (const q of allQs) {
        const ver = q.verification;
        if (!ver) continue;
        if (!ver.checks.zeroDuplicate) {
          const enStem = normalizeQuestionText(q.translations?.English?.question || q.question);
          if (practiceHashes.has(enStem)) {
            practiceBankCollisions++;
          } else {
            crossTestDuplicates++;
            mediumBreakdown[med].duplicates++;
          }
        }
        if (!ver.checks.syllabusAligned) syllabusBoundaryViolations++;
        if (!ver.checks.fourDistinctOptions || !ver.checks.answerKeyValid) optionAndKeyFailures++;
        if (FAKE_UNIQUENESS_TAG_REGEX.test(q.question)) fakeTagViolations++;

        if (!ver.greenVerified && sampleFailures.length < 20) {
          sampleFailures.push({
            medium: med,
            mockTestNumber: t,
            paperNumber: q.paperNumber,
            questionNumber: q.questionNumber,
            reasons: ver.failureReasons,
          });
        }
      }
    }
  }

  let verifiedMockTestsCount = 0;
  for (const ok of testPassedAllMediums.values()) {
    if (ok) verifiedMockTestsCount++;
  }

  return {
    stdLevel,
    auditedAt: new Date().toISOString(),
    totalMockTests: 25,
    verifiedMockTestsCount,
    totalQuestionsPerMedium: 3750,
    totalRenderedSlotsAcross3Mediums: 11250,
    withinTestDuplicates,
    crossTestDuplicates,
    practiceBankCollisions,
    syllabusBoundaryViolations,
    optionAndKeyFailures,
    fakeTagViolations,
    mediumBreakdown,
    sectionTotalsPerMedium: {
      firstLanguage: 625,
      mathematics: 1250,
      secondLanguage: 625,
      intelligenceTest: 1250,
    },
    sampleFailures,
  };
}
