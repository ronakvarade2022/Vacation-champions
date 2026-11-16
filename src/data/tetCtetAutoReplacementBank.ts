import {
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetMedium,
  TetCtetPaperNumber,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../types/tetCtet';
import { getModuleId } from './tetCtetSyllabi';
import { normalizeTetText, seededPermuteOptions } from './tetCtetLanguageBanks';
import { composeVariedLanguageStem } from './tetCtetUnifiedSyllabusBanks';

interface ReplacementEntry {
  key: string;
  subjectId: TetCtetSubjectId;
  paper: 1 | 2 | 'BOTH';
  topic: string;
  question: string;
  options: [string, string, string, string];
  exp: string;
}

const REPLACEMENT_ENTRIES: ReplacementEntry[] = [
  {
    key: 'REP-CDP-1',
    subjectId: 'CDP',
    paper: 'BOTH',
    topic: 'Vygotsky Inner Speech & Self-Regulation',
    question:
      'According to Lev Vygotsky, when an 8-year-old softly talks herself through the steps of a multi-digit subtraction problem to stay organized, this private speech primarily serves as:',
    options: [
      'A cognitive tool for self-regulation and planning problem-solving steps',
      'Evidence of egocentric immaturity that teachers should immediately forbid',
      'Purely social chatter unrelated to executive attention',
      'A sign of delayed phonological awareness requiring speech therapy',
    ],
    exp: 'Vygotsky viewed private speech as a transitional self-regulatory scaffold that becomes silent inner speech for higher-order planning.',
  },
  {
    key: 'REP-CDP-2',
    subjectId: 'CDP',
    paper: 'BOTH',
    topic: 'Dynamic Assessment & ZPD',
    question:
      'Which classroom practice best exemplifies Feuerstein and Vygotsky-inspired dynamic assessment rather than static testing?',
    options: [
      'Providing calibrated hints during a task and observing how much support the learner needs to succeed',
      'Ranking students silently on a timed multiple-choice sheet with zero feedback',
      'Repeating identical factual recall worksheets every Friday without discussion',
      'Grading only neatness of handwriting rather than conceptual reasoning',
    ],
    exp: 'Dynamic assessment measures learning potential inside the Zone of Proximal Development by gauging responsiveness to mediated prompts.',
  },
  {
    key: 'REP-CDP-3',
    subjectId: 'CDP',
    paper: 'BOTH',
    topic: 'UDL Multiple Means of Representation',
    question:
      'A teacher presents a science concept using a tactile 3D model, an annotated diagram, and an audio-captioned clip together. Which Universal Design for Learning (UDL) principle is being applied?',
    options: [
      'Providing multiple means of representation so diverse learners access meaning effectively',
      'Enforcing a single rigid textbook channel for every learner',
      'Lowering academic expectations for students with sensory preferences',
      'Separating learners permanently into segregated special sections',
    ],
    exp: 'UDL recommends offering information through visual, auditory, and kinesthetic modalities to remove barriers for all learners.',
  },
  {
    key: 'REP-MATH-1',
    subjectId: 'MATHEMATICS',
    paper: 1,
    topic: 'Divisibility & Remainder Reasoning',
    question:
      'A baker packs 248 laddoos equally into boxes holding 9 laddoos each. How many MORE laddoos are needed to complete one extra full box with zero leftovers?',
    options: ['4', '5', '3', '6'],
    exp: 'Dividing 248 by 9 gives quotient 27 and remainder 5 (9 × 27 = 243). Completing one more box of 9 requires 9 − 5 = 4 additional laddoos.',
  },
  {
    key: 'REP-MATH-2',
    subjectId: 'MATHEMATICS',
    paper: 1,
    topic: 'Van Hiele Levels of Geometric Thought',
    question:
      'A Class 5 pupil argues that "every square must also be a rectangle because it has four right angles and opposite sides equal and parallel." According to the Van Hiele model, the child is operating at:',
    options: [
      'Level 2 (Informal Deduction / Abstraction)',
      'Level 0 (Visualization only by overall shape appearance)',
      'Pre-recognition sensory motor stage',
      'Level 4 (Formal axiomatic rigor)',
    ],
    exp: 'At Van Hiele Level 2 (Informal Deduction), learners deduce class-inclusion relationships among properties such as squares being special rectangles.',
  },
  {
    key: 'REP-MATH-3',
    subjectId: 'MATHEMATICS',
    paper: 2,
    topic: 'Algebraic Identities & Factorization',
    question:
      'If a + b = 13 and ab = 36, what is the numerical value of a² + b²?',
    options: ['97', '169', '133', '105'],
    exp: 'Using a² + b² = (a + b)² − 2ab = 13² − 2(36) = 169 − 72 = 97.',
  },
  {
    key: 'REP-EVS-1',
    subjectId: 'EVS',
    paper: 1,
    topic: 'Water Conservation & Stepwells',
    question:
      'Why were traditional stone stepwells (baolis / baravs) built across arid towns of Maharashtra and Western India historically effective?',
    options: [
      'They harvested seasonal rainwater, recharged surrounding aquifers, and lowered evaporation via shaded steps',
      'They generated hydroelectricity for nearby fort lighting',
      'They extracted fossil saltwater directly from coastal aquifers',
      'They relied exclusively on diesel pumps for daily irrigation',
    ],
    exp: 'Stepped stone basins captured monsoon runoff, reduced surface evaporation through deep shade, and replenished groundwater tables.',
  },
  {
    key: 'REP-EVS-2',
    subjectId: 'EVS',
    paper: 1,
    topic: 'NCF 2005 EVS Process Skills',
    question:
      'While studying seed germination, asking pupils to measure sprout lengths under sunlight versus dark cupboards over 7 days primarily develops which scientific process skill?',
    options: [
      'Controlled experimentation, systematic observation, and fair-test comparison',
      'Rote memorization of botanical Latin binomials',
      'Passive copying of encyclopedia paragraphs',
      'Mechanical multiplication of unrelated numbers',
    ],
    exp: 'Varying a single condition (light vs dark) while tracking growth nurtures experimentation, observation, and evidence-based inference.',
  },
  {
    key: 'REP-SCI-1',
    subjectId: 'SCIENCE',
    paper: 2,
    topic: 'Neutralization Reaction in Daily Life',
    question:
      'Soil testing reveals an agricultural plot has become overly acidic (pH 4.6) due to excessive ammonium fertilizer use. Which amendment helps neutralize soil acidity safely?',
    options: [
      'Slaked lime (calcium hydroxide) or powdered limestone (calcium carbonate)',
      'Dilute hydrochloric acid spray',
      'Concentrated vinegar solution',
      'Pure sodium chloride brine',
    ],
    exp: 'Mildly basic calcium compounds (slaked lime/quicklime/chalk) neutralize excess H⁺ ions in acidic soils without harming crops.',
  },
  {
    key: 'REP-SST-1',
    subjectId: 'SOCIAL_STUDIES',
    paper: 2,
    topic: 'Constitutional Federalism & Panchayati Raj',
    question:
      'Which Constitutional Amendment formally accorded constitutional status to rural three-tier Panchayati Raj Institutions with mandatory reservation for women?',
    options: [
      '73rd Constitutional Amendment Act, 1992',
      '42nd Constitutional Amendment Act, 1976',
      '61st Constitutional Amendment Act, 1988',
      '86th Constitutional Amendment Act, 2002',
    ],
    exp: 'The 73rd Amendment inserted Part IX and the Eleventh Schedule, mandating three-tier rural local governance and at least one-third seats for women.',
  },
  {
    key: 'REP-L2-EN-1',
    subjectId: 'LANGUAGE_2',
    paper: 'BOTH',
    topic: 'English Pedagogy – Top-Down Reading Process',
    question:
      'When a reader predicts the ending of a news article using its headline, photographs, and prior background knowledge before verifying specific details, she is relying primarily on:',
    options: [
      'The top-down model of reading comprehension',
      'Purely phonetic bottom-up letter decoding',
      'Verbal rote shadowing without meaning construction',
      'Mechanical dictionary translation of every single preposition',
    ],
    exp: 'Top-down reading begins with schema, context, predictions, and global meaning to interpret incoming print cues.',
  },
  {
    key: 'REP-L1-MR-1',
    subjectId: 'LANGUAGE_1',
    paper: 'BOTH',
    topic: 'मराठी व्याकरण – प्रयोग ओळखा',
    question:
      '"शेतकऱ्याने शेतात धान्य पेरले." या वाक्यातील प्रयोग कोणता आहे?',
    options: ['कर्मणी प्रयोग', 'कर्तरी प्रयोग', 'भावे प्रयोग', 'सकर्मक कर्तरी प्रयोग'],
    exp: 'या वाक्यात कर्त्याला "ने" प्रत्यय असून क्रियापद "पेरले" हे कर्म "धान्य" (नपुंसकलिंगी एकवचन) याप्रमाणे चालते, म्हणून हा कर्मणी प्रयोग आहे.',
  },
];

export function pickVerifiedReplacementQuestion(params: {
  baseQuestion: TetCtetQuestion;
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  testNumber: number;
  language: TetCtetLanguage;
  medium: TetCtetMedium;
  existingStems?: Set<string>;
}): TetCtetQuestion | null {
  const { baseQuestion, exam, paper, testNumber, language, medium, existingStems } = params;
  const modId = getModuleId(exam, paper);

  const candidates = REPLACEMENT_ENTRIES.filter((entry) => {
    const paperMatch = entry.paper === 'BOTH' || entry.paper === paper;
    const subjMatch = entry.subjectId === baseQuestion.subjectId;
    return paperMatch && subjMatch;
  });

  const fallbackPool =
    candidates.length > 0 ? candidates : REPLACEMENT_ENTRIES.filter((e) => e.subjectId === 'CDP');

  for (let i = 0; i < fallbackPool.length; i++) {
    const cand = fallbackPool[i];
    const directNorm = normalizeTetText(cand.question);
    const useDirect = !existingStems || !existingStems.has(directNorm);
    const finalQuestion = useDirect
      ? cand.question
      : composeVariedLanguageStem({
          language:
            baseQuestion.subjectId === 'LANGUAGE_1' || baseQuestion.subjectId === 'LANGUAGE_2'
              ? language
              : medium,
          topic: cand.topic,
          corePrompt: cand.question,
          bijectiveSeed: 270000 + testNumber * 211 + baseQuestion.questionNumber * 17 + i,
          paper,
          exam,
        });
    const norm = normalizeTetText(finalQuestion);
    if (existingStems && existingStems.has(norm)) continue;
    const seedId = `${baseQuestion.id}-REPL-${cand.key}`;
    const permuted = seededPermuteOptions(cand.options, 0, seedId);
    return {
      ...baseQuestion,
      id: baseQuestion.id,
      moduleId: modId,
      languageCode:
        baseQuestion.subjectId === 'LANGUAGE_1' || baseQuestion.subjectId === 'LANGUAGE_2'
          ? language
          : undefined,
      mediumRendered: medium,
      topic: cand.topic,
      question: finalQuestion,
      options: permuted.options,
      correctAnswer: permuted.correctAnswer,
      explanation: cand.exp,
      conceptSignature: `${exam}|P${paper}|T${testNumber}|${baseQuestion.subjectId}|REPLACED|${cand.key}`,
      normalizedHash: norm,
      approvalStatus: 'approved',
      isCustomOverride: true,
    };
  }
  return null;
}

