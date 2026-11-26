export interface VedicSutraItem {
  id: string;
  number: number;
  sanskrit: string;
  english: string;
  bestUse: string;
  ruleSummary: string;
  exampleProblem: string;
  workedSteps: string[];
}

export interface VedicChapterPractice {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  sutraUsed: string;
  rule: string;
  questions: {
    id: string;
    prompt: string;
    answer: number;
    hint: string;
    steps: string[];
  }[];
}

export interface AbacusLessonItem {
  id: string;
  lessonNo: number;
  title: string;
  level: 'Level 1: Basics' | 'Level 2: Small Friends' | 'Level 3: Big Friends' | 'Level 4: Speed & Anzan';
  concept: string;
  formulaRule: string;
  practiceTarget: number;
  workedExample: string;
}

export interface PhonicsPhonemeItem {
  id: string;
  grapheme: string;
  spokenCue: string;
  sampleWord: string;
  sentence: string;
}

export interface PhonicsLevelModule {
  id: string;
  levelNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  phonemes: PhonicsPhonemeItem[];
}

export const ALL_16_VEDIC_SUTRAS: VedicSutraItem[] = [
  {
    id: 'vs-1',
    number: 1,
    sanskrit: 'Ekadhikena Purvena',
    english: 'By one more than the previous one',
    bestUse: 'Squaring numbers ending in 5 and multiplying decimals with sum-10 units.',
    ruleSummary: 'Multiply the tens digit n by (n + 1), then append 25.',
    exampleProblem: '65 x 65',
    workedSteps: ['Tens digit n = 6, next number = 7', '6 x 7 = 42', 'Append 25 -> 4225'],
  },
  {
    id: 'vs-2',
    number: 2,
    sanskrit: 'Nikhilam Navatashcaramam Dashatah',
    english: 'All from 9 and the last from 10',
    bestUse: 'Subtraction from powers of 10 and multiplying numbers near 10, 100, 1000.',
    ruleSummary: 'Subtract every digit from 9 except the rightmost non-zero digit, which is subtracted from 10.',
    exampleProblem: '1000 - 364',
    workedSteps: ['9 - 3 = 6', '9 - 6 = 3', '10 - 4 = 6', 'Answer = 636'],
  },
  {
    id: 'vs-3',
    number: 3,
    sanskrit: 'Urdhva-Tiryagbhyam',
    english: 'Vertically and Crosswise',
    bestUse: 'Universal 2-digit and 3-digit mental multiplication in a single line.',
    ruleSummary: 'Multiply units vertically, cross-multiply tens and units, multiply tens vertically with carry.',
    exampleProblem: '23 x 14',
    workedSteps: ['Units: 3 x 4 = 12 (write 2, carry 1)', 'Cross: (2 x 4) + (3 x 1) + 1 = 12 (write 2, carry 1)', 'Tens: (2 x 1) + 1 = 3 -> 322'],
  },
  {
    id: 'vs-4',
    number: 4,
    sanskrit: 'Paravartya Yojayet',
    english: 'Transpose and Adjust',
    bestUse: 'Division by numbers slightly above a base (11, 12, 103) and linear equations.',
    ruleSummary: 'Flip the signs of the divisor digits after the leading digit and bring down quotient digits.',
    exampleProblem: '1248 / 12',
    workedSteps: ['Flag digit for 12 is -2', '1 brings down -> 2 - 2(1) = 0', 'Quotient = 104, Remainder = 0'],
  },
  {
    id: 'vs-5',
    number: 5,
    sanskrit: 'Shunyam Samyasamuccaye',
    english: 'When the sum is the same, that sum is zero',
    bestUse: 'Instant solving of algebraic equations with identical factors or equal numerators.',
    ruleSummary: 'If a common term appears across every expression, equate it directly to 0.',
    exampleProblem: '4x + 7x = 5x + 6x (common factor x)',
    workedSteps: ['Common variable term x on both sides', 'By Samyasamuccaya, x = 0'],
  },
  {
    id: 'vs-6',
    number: 6,
    sanskrit: 'Anurupyena',
    english: 'Proportionately',
    bestUse: 'Multiplying near sub-bases like 20, 50, 200, or 500.',
    ruleSummary: 'Apply the base method relative to a convenient sub-base, then scale the left side.',
    exampleProblem: '48 x 47 (sub-base 50 = 100/2)',
    workedSteps: ['Deviations from 50: -2 and -3', 'Left: (48 - 3) / 2 = 22.5 -> 22 & +50', 'Right: (-2) x (-3) = 06 -> 2256'],
  },
  {
    id: 'vs-7',
    number: 7,
    sanskrit: 'Sankalana-Vyavakalanabhyam',
    english: 'By addition and by subtraction',
    bestUse: 'Simultaneous equations where x and y coefficients are interchanged.',
    ruleSummary: 'Add both equations for (x + y) and subtract them for (x - y).',
    exampleProblem: '45x + 23y = 113 and 23x + 45y = 91',
    workedSteps: ['Add: 68(x + y) = 204 -> x + y = 3', 'Subtract: 22(x - y) = 22 -> x - y = 1', 'x = 2, y = 1'],
  },
  {
    id: 'vs-8',
    number: 8,
    sanskrit: 'Puranapuranabhyam',
    english: 'By the completion or non-completion',
    bestUse: 'Completing tens/hundreds for fast addition and completing quadratic squares.',
    ruleSummary: 'Group complementary pairs making 10 or 100 before adding remaining digits.',
    exampleProblem: '38 + 47 + 62 + 53',
    workedSteps: ['(38 + 62) = 100', '(47 + 53) = 100', '100 + 100 = 200'],
  },
  {
    id: 'vs-9',
    number: 9,
    sanskrit: 'Calana-Kalanabhyam',
    english: 'Differences and similarities',
    bestUse: 'Factorization and finding discriminants of quadratic expressions.',
    ruleSummary: 'Use first derivative/difference patterns to identify roots rapidly.',
    exampleProblem: 'Find vertex of x^2 - 6x + 5',
    workedSteps: ['Differentiate: 2x - 6 = 0 -> x = 3', 'Minimum value at x = 3 is -4'],
  },
  {
    id: 'vs-10',
    number: 10,
    sanskrit: 'Yavadunam',
    english: 'Whatever the extent of its deficiency',
    bestUse: 'Squaring numbers close to 10, 100, or 1000.',
    ruleSummary: 'Reduce the number further by its deficiency d, then append d^2.',
    exampleProblem: '96^2 (base 100, d = -4)',
    workedSteps: ['96 - 4 = 92', '(-4)^2 = 16', 'Answer = 9216'],
  },
  {
    id: 'vs-11',
    number: 11,
    sanskrit: 'Vyashtisamashti',
    english: 'Part and Whole',
    bestUse: 'Averages, factorization, and symmetric series sums.',
    ruleSummary: 'Compare parts around an assumed mean to calculate exact group averages.',
    exampleProblem: 'Average of 72, 75, 68, 77',
    workedSteps: ['Assumed base = 70 -> deviations +2, +5, -2, +7', 'Net sum = +12 / 4 = +3', 'Average = 73'],
  },
  {
    id: 'vs-12',
    number: 12,
    sanskrit: 'Sheshanyankena Charamena',
    english: 'The remainders by the last digit',
    bestUse: 'Converting fractions like 1/19 or 1/29 into exact recurring decimals.',
    ruleSummary: 'Multiply backwards from the last digit using the Ekadhika multiplier.',
    exampleProblem: 'Decimal value of 1/19',
    workedSteps: ['Ekadhika of 19 is 2', 'Generate right-to-left by multiplying each digit by 2 -> 0.05263...'],
  },
  {
    id: 'vs-13',
    number: 13,
    sanskrit: 'Sopantyadvayamantyam',
    english: 'The ultimate and twice the penultimate',
    bestUse: 'Rational equations with four symmetric denominators.',
    ruleSummary: 'Equate the last term plus twice the second-last term to zero.',
    exampleProblem: '1/(x+1)(x+2) + 1/(x+1)(x+3) = 0',
    workedSteps: ['Identify linear term progression', 'Apply Sopantyadvayamantyam -> x = -2.5'],
  },
  {
    id: 'vs-14',
    number: 14,
    sanskrit: 'Ekanyunena Purvena',
    english: 'By one less than the previous one',
    bestUse: 'Instant multiplication by 9, 99, 999, 9999.',
    ruleSummary: 'Left part = (Number - 1); Right part = Base-complement of the number.',
    exampleProblem: '74 x 99',
    workedSteps: ['Left: 74 - 1 = 73', 'Right: 99 - 73 = 26', 'Answer = 7326'],
  },
  {
    id: 'vs-15',
    number: 15,
    sanskrit: 'Gunitasamuccayah',
    english: 'The product of the sum is equal to the sum of the product',
    bestUse: 'Fast verification of polynomial expansions and factorizations.',
    ruleSummary: 'Verify coefficient sums before and after multiplication.',
    exampleProblem: 'Verify (x+2)(x+3) = x^2 + 5x + 6',
    workedSteps: ['LHS coeff sum: (1+2)(1+3) = 12', 'RHS coeff sum: 1 + 5 + 6 = 12 (Verified)'],
  },
  {
    id: 'vs-16',
    number: 16,
    sanskrit: 'Gunakasamuccayah',
    english: 'Factors of the sum equal sum of factors',
    bestUse: 'Checking factor pairs in quadratic and cubic expressions.',
    ruleSummary: 'Match factor coefficient totals against the original expression sum.',
    exampleProblem: 'Check factors of x^2 + 7x + 12',
    workedSteps: ['Sum of coefficients = 20', '(1+3)(1+4) = 4 x 5 = 20 (Verified)'],
  },
];

export const VEDIC_CHAPTER_PRACTICE: VedicChapterPractice[] = [
  {
    id: 'vc-1',
    level: 'Beginner',
    title: 'Chapter 1: Complimentary Addition (Puranapuranabhyam)',
    sutraUsed: 'Sutra 8 · Puranapuranabhyam',
    rule: 'Pair numbers ending in complementary digits (1+9, 2+8, 3+7, 4+6, 5+5) to form 10s or 100s first.',
    questions: [
      { id: 'vc1-q1', prompt: '46 + 27 + 54 = ?', answer: 127, hint: 'Group 46 + 54 first.', steps: ['46 + 54 = 100', '100 + 27 = 127'] },
      { id: 'vc1-q2', prompt: '38 + 62 + 19 = ?', answer: 119, hint: '38 + 62 makes a clean hundred.', steps: ['38 + 62 = 100', '100 + 19 = 119'] },
      { id: 'vc1-q3', prompt: '75 + 48 + 25 = ?', answer: 148, hint: '75 + 25 = 100.', steps: ['75 + 25 = 100', '100 + 48 = 148'] },
    ],
  },
  {
    id: 'vc-2',
    level: 'Beginner',
    title: 'Chapter 2: Instant Subtraction from 100 & 1000 (Nikhilam)',
    sutraUsed: 'Sutra 2 · Nikhilam',
    rule: 'Subtract all digits from 9 and the last non-zero digit from 10.',
    questions: [
      { id: 'vc2-q1', prompt: '1000 - 452 = ?', answer: 548, hint: '9-4, 9-5, 10-2.', steps: ['9 - 4 = 5', '9 - 5 = 4', '10 - 2 = 8 -> 548'] },
      { id: 'vc2-q2', prompt: '1000 - 718 = ?', answer: 282, hint: '9-7, 9-1, 10-8.', steps: ['9 - 7 = 2', '9 - 1 = 8', '10 - 8 = 2 -> 282'] },
      { id: 'vc2-q3', prompt: '100 - 37 = ?', answer: 63, hint: '9-3 and 10-7.', steps: ['9 - 3 = 6', '10 - 7 = 3 -> 63'] },
    ],
  },
  {
    id: 'vc-3',
    level: 'Beginner',
    title: 'Chapter 3: Rapid Multiplication by 11',
    sutraUsed: 'Anurupyena Shortcut',
    rule: 'Keep first and last digits outside, place the sum of adjacent digits in between.',
    questions: [
      { id: 'vc3-q1', prompt: '45 x 11 = ?', answer: 495, hint: 'Middle digit = 4 + 5.', steps: ['4 | (4+5) | 5 = 495'] },
      { id: 'vc3-q2', prompt: '72 x 11 = ?', answer: 792, hint: 'Middle digit = 7 + 2.', steps: ['7 | (7+2) | 2 = 792'] },
      { id: 'vc3-q3', prompt: '84 x 11 = ?', answer: 924, hint: '8 + 4 = 12, carry 1 to 8.', steps: ['8+1 | 2 | 4 = 924'] },
    ],
  },
  {
    id: 'vc-4',
    level: 'Intermediate',
    title: 'Chapter 4: Squares Ending in 5 (Ekadhikena)',
    sutraUsed: 'Sutra 1 · Ekadhikena Purvena',
    rule: 'Multiply tens digit n by (n + 1), then attach 25.',
    questions: [
      { id: 'vc4-q1', prompt: '35 x 35 = ?', answer: 1225, hint: '3 x 4 then 25.', steps: ['3 x 4 = 12', 'Attach 25 -> 1225'] },
      { id: 'vc4-q2', prompt: '85 x 85 = ?', answer: 7225, hint: '8 x 9 then 25.', steps: ['8 x 9 = 72', 'Attach 25 -> 7225'] },
      { id: 'vc4-q3', prompt: '105 x 105 = ?', answer: 11025, hint: '10 x 11 then 25.', steps: ['10 x 11 = 110', 'Attach 25 -> 11025'] },
    ],
  },
  {
    id: 'vc-5',
    level: 'Intermediate',
    title: 'Chapter 5: Multiplying by 99 & 999 (Ekanyunena)',
    sutraUsed: 'Sutra 14 · Ekanyunena Purvena',
    rule: 'Subtract 1 from multiplicand for left side, then subtract left side from 99 or 999.',
    questions: [
      { id: 'vc5-q1', prompt: '56 x 99 = ?', answer: 5544, hint: '56 - 1 = 55; 99 - 55 = 44.', steps: ['Left: 55', 'Right: 99 - 55 = 44 -> 5544'] },
      { id: 'vc5-q2', prompt: '83 x 99 = ?', answer: 8217, hint: '83 - 1 = 82; 99 - 82 = 17.', steps: ['Left: 82', 'Right: 17 -> 8217'] },
      { id: 'vc5-q3', prompt: '234 x 999 = ?', answer: 233766, hint: '233 followed by 999 - 233.', steps: ['Left: 233', 'Right: 766 -> 233766'] },
    ],
  },
  {
    id: 'vc-6',
    level: 'Intermediate',
    title: 'Chapter 6: Base-100 Multiplication (Nikhilam)',
    sutraUsed: 'Sutra 2 · Nikhilam Base Method',
    rule: 'Find deviations from 100; cross-add for left side and multiply deviations for 2-digit right side.',
    questions: [
      { id: 'vc6-q1', prompt: '97 x 96 = ?', answer: 9312, hint: 'Deficiencies -3 and -4.', steps: ['97 - 4 = 93', '(-3) x (-4) = 12 -> 9312'] },
      { id: 'vc6-q2', prompt: '104 x 106 = ?', answer: 11024, hint: 'Surpluses +4 and +6.', steps: ['104 + 6 = 110', '4 x 6 = 24 -> 11024'] },
      { id: 'vc6-q3', prompt: '92 x 98 = ?', answer: 9016, hint: 'Deficiencies -8 and -2.', steps: ['92 - 2 = 90', '(-8) x (-2) = 16 -> 9016'] },
    ],
  },
  {
    id: 'vc-7',
    level: 'Advanced',
    title: 'Chapter 7: Two-Digit Crosswise (Urdhva-Tiryagbhyam)',
    sutraUsed: 'Sutra 3 · Vertically & Crosswise',
    rule: 'Right product | Cross sum | Left product.',
    questions: [
      { id: 'vc7-q1', prompt: '24 x 31 = ?', answer: 744, hint: '4x1=4 | (2x1 + 4x3)=14 | 2x3=6.', steps: ['Units: 4', 'Cross: 2 + 12 = 14 (write 4, carry 1)', 'Tens: 6 + 1 = 7 -> 744'] },
      { id: 'vc7-q2', prompt: '32 x 43 = ?', answer: 1376, hint: '2x3=6 | (3x3 + 2x4)=17 | 3x4=12.', steps: ['Units: 6', 'Cross: 9 + 8 = 17 (write 7, carry 1)', 'Tens: 12 + 1 = 13 -> 1376'] },
      { id: 'vc7-q3', prompt: '52 x 23 = ?', answer: 1196, hint: '2x3=6 | (5x3 + 2x2)=19 | 5x2=10.', steps: ['Units: 6', 'Cross: 19', 'Tens: 11 -> 1196'] },
    ],
  },
  {
    id: 'vc-8',
    level: 'Advanced',
    title: 'Chapter 8: Fast Squaring near 50 & 100 (Yavadunam)',
    sutraUsed: 'Sutra 10 · Yavadunam',
    rule: 'Near 100: (N + d) | d^2. Near 50: (25 + d) | d^2.',
    questions: [
      { id: 'vc8-q1', prompt: '93^2 = ?', answer: 8649, hint: 'd = -7 from 100.', steps: ['93 - 7 = 86', '(-7)^2 = 49 -> 8649'] },
      { id: 'vc8-q2', prompt: '54^2 = ?', answer: 2916, hint: 'd = +4 from 50; 25 + 4 = 29.', steps: ['25 + 4 = 29', '4^2 = 16 -> 2916'] },
      { id: 'vc8-q3', prompt: '46^2 = ?', answer: 2116, hint: 'd = -4 from 50; 25 - 4 = 21.', steps: ['25 - 4 = 21', '(-4)^2 = 16 -> 2116'] },
    ],
  },
  {
    id: 'vc-9',
    level: 'Advanced',
    title: 'Chapter 9: Digital Root (Beejank) Verification',
    sutraUsed: 'Gunakasamuccayah Parity Check',
    rule: 'Sum digits repeatedly until single digit (1–9, with 9 ≡ 0) to verify arithmetic mentally.',
    questions: [
      { id: 'vc9-q1', prompt: 'Digital root (Beejank) of 758 = ?', answer: 2, hint: '7 + 5 + 8 = 20 -> 2 + 0.', steps: ['7 + 5 + 8 = 20', '2 + 0 = 2'] },
      { id: 'vc9-q2', prompt: 'Digital root (Beejank) of 468 = ?', answer: 9, hint: 'Cast out 9s: 4 + 6 + 8 = 18.', steps: ['4 + 6 + 8 = 18', '1 + 8 = 9'] },
      { id: 'vc9-q3', prompt: 'If 23 x 14 = 322, what is the Beejank of both sides?', answer: 7, hint: 'Beejank(23)=5, Beejank(14)=5 -> 25 -> 7.', steps: ['5 x 5 = 25 -> 2 + 5 = 7', '3 + 2 + 2 = 7 (Matches)'] },
    ],
  },
];

export const ABACUS_CURRICULUM_LESSONS: AbacusLessonItem[] = [
  {
    id: 'ab-1',
    lessonNo: 1,
    title: 'Soroban Frame, Heaven (5) & Earth (1) Beads',
    level: 'Level 1: Basics',
    concept: 'Each rod has 1 Heaven bead worth 5 above the reckoning bar and 4 Earth beads worth 1 each below.',
    formulaRule: 'Bead touching the middle reckoning bar counts as active; away from bar = 0.',
    practiceTarget: 7,
    workedExample: 'Activate Heaven bead (5) + two Earth beads (2) on the Ones rod to form 7.',
  },
  {
    id: 'ab-2',
    lessonNo: 2,
    title: 'Place Value Rods: Ones, Tens, Hundreds & Thousands',
    level: 'Level 1: Basics',
    concept: 'Rightmost rod is Ones, moving left gives Tens, Hundreds, Thousands, up to Millions.',
    formulaRule: 'Read left to right, rod by rod.',
    practiceTarget: 358,
    workedExample: 'Hundreds = 3, Tens = 5 (Heaven bead), Ones = 8 (5 + 3).',
  },
  {
    id: 'ab-3',
    lessonNo: 3,
    title: 'Direct Bead Addition & Subtraction (No Formula)',
    level: 'Level 1: Basics',
    concept: 'Push Earth beads UP with thumb to add 1–4, pull DOWN with index finger to subtract.',
    formulaRule: 'Thumb up (+1..+4), Index down (-1..-4), Index pinch for 5.',
    practiceTarget: 64,
    workedExample: 'Set 12 -> +52 direct (Tens +5 Heaven, Ones +2 Earth) = 64.',
  },
  {
    id: 'ab-4',
    lessonNo: 4,
    title: 'Small Friend +4 and +3 (Base 5 Complement)',
    level: 'Level 2: Small Friends',
    concept: 'When lower Earth beads are full, borrow the Heaven bead (+5) and subtract the small friend.',
    formulaRule: '+4 = +5 - 1  |  +3 = +5 - 2',
    practiceTarget: 26,
    workedExample: 'On Ones rod with 3 set: +3 means push Heaven (+5) and lower 2 Earth (-2) -> 6.',
  },
  {
    id: 'ab-5',
    lessonNo: 5,
    title: 'Small Friend +2, +1 and Negative Small Friends (-1..-4)',
    level: 'Level 2: Small Friends',
    concept: 'Complete the 5-complement table for both addition and subtraction.',
    formulaRule: '+2 = +5 - 3 | +1 = +5 - 4 | -4 = -5 + 1 | -3 = -5 + 2',
    practiceTarget: 41,
    workedExample: 'From 5 on Ones rod, subtract 3 by lifting Heaven (-5) and adding 2 Earth (+2) = 2.',
  },
  {
    id: 'ab-6',
    lessonNo: 6,
    title: 'Big Friend +9, +8, +7, +6 (Base 10 Complement)',
    level: 'Level 3: Big Friends',
    concept: 'When a single rod reaches 10 or more, add 1 on the left rod (+10) and subtract the complement from 10.',
    formulaRule: '+9 = -1 + 10 | +8 = -2 + 10 | +7 = -3 + 10 | +6 = -4 + 10',
    practiceTarget: 103,
    workedExample: '95 + 8 = 95 + 10 - 2 -> 103.',
  },
  {
    id: 'ab-7',
    lessonNo: 7,
    title: 'Big Friend +5 to +1 & Subtraction Borrow (-9..-1)',
    level: 'Level 3: Big Friends',
    concept: 'For subtraction below 0 on a rod, subtract 1 from the left rod (-10) and add the complement.',
    formulaRule: '-9 = -10 + 1 | -8 = -10 + 2 | -5 = -10 + 5',
    practiceTarget: 47,
    workedExample: '54 - 7 -> subtract 10 on Tens rod, add 3 on Ones rod = 47.',
  },
  {
    id: 'ab-8',
    lessonNo: 8,
    title: 'Combination Formulas (+6, +7, +8, +9 via 10 & 5)',
    level: 'Level 3: Big Friends',
    concept: 'Combine Small and Big friends when direct complement cannot be subtracted.',
    formulaRule: '+9 = +10 - 5 + 4 | +8 = +10 - 5 + 3 | +7 = +10 - 5 + 2 | +6 = +10 - 5 + 1',
    practiceTarget: 14,
    workedExample: '5 + 9 -> add 10 (Tens +1), clear 5, add 4 -> 14.',
  },
  {
    id: 'ab-9',
    lessonNo: 9,
    title: 'Two-Digit Rapid Mental Visualization',
    level: 'Level 4: Speed & Anzan',
    concept: 'Visualize the 2-rod Soroban mentally while adding sequential 2-digit terms.',
    formulaRule: 'Always add Tens rod first (left-to-right), then Ones rod.',
    practiceTarget: 185,
    workedExample: '47 + 63 + 75 = 110 + 75 = 185.',
  },
  {
    id: 'ab-10',
    lessonNo: 10,
    title: 'Flash Anzan High-Speed Bead Tracking',
    level: 'Level 4: Speed & Anzan',
    concept: 'Track flashing numbers at 0.8s–1.2s intervals and compute totals without pencil or paper.',
    formulaRule: 'Keep eyes relaxed on virtual bead positions; update after every flash.',
    practiceTarget: 240,
    workedExample: 'Practice with the interactive Flash Anzan trainer on the right panel.',
  },
];

export const PHONICS_LEVEL_MODULES: PhonicsLevelModule[] = [
  {
    id: 'ph-l1',
    levelNumber: 1,
    title: 'Level 1: Core Single Letter Phonemes',
    description: 'Master pure letter sounds (not letter names) for crisp early reading.',
    phonemes: [
      { id: 'p1', grapheme: 's', spokenCue: 'sss as in sun', sampleWord: 'sun', sentence: 'The bright sun rises in the morning.' },
      { id: 'p2', grapheme: 'a', spokenCue: 'ah as in apple', sampleWord: 'apple', sentence: 'A red apple sits on the desk.' },
      { id: 'p3', grapheme: 't', spokenCue: 'tuh as in tiger', sampleWord: 'tiger', sentence: 'The tiger walks softly through tall grass.' },
      { id: 'p4', grapheme: 'p', spokenCue: 'puh as in pencil', sampleWord: 'pencil', sentence: 'Sharpen your pencil before drawing.' },
      { id: 'p5', grapheme: 'm', spokenCue: 'mmm as in mango', sampleWord: 'mango', sentence: 'Sweet yellow mango grows in summer.' },
      { id: 'p6', grapheme: 'r', spokenCue: 'rrr as in rabbit', sampleWord: 'rabbit', sentence: 'A white rabbit hops in the garden.' },
    ],
  },
  {
    id: 'ph-l2',
    levelNumber: 2,
    title: 'Level 2: Short Vowels & CVC Blending',
    description: 'Blend Consonant-Vowel-Consonant words smoothly without pausing.',
    phonemes: [
      { id: 'p7', grapheme: 'short a', spokenCue: 'cat, bat, map', sampleWord: 'cat', sentence: 'The little cat sat on the warm mat.' },
      { id: 'p8', grapheme: 'short e', spokenCue: 'pen, red, ten', sampleWord: 'pen', sentence: 'Write neatly with your blue pen.' },
      { id: 'p9', grapheme: 'short i', spokenCue: 'pin, sit, win', sampleWord: 'win', sentence: 'Work together and your team will win.' },
      { id: 'p10', grapheme: 'short o', spokenCue: 'pot, hot, box', sampleWord: 'box', sentence: 'Pack the books inside the cardboard box.' },
      { id: 'p11', grapheme: 'short u', spokenCue: 'cup, bus, run', sampleWord: 'bus', sentence: 'The school bus arrives at eight o clock.' },
    ],
  },
  {
    id: 'ph-l3',
    levelNumber: 3,
    title: 'Level 3: Consonant Digraphs & Blends',
    description: 'Two letters forming one unified sound (sh, ch, th, wh, ph, bl).',
    phonemes: [
      { id: 'p12', grapheme: 'sh', spokenCue: 'shh as in ship', sampleWord: 'ship', sentence: 'A white ship sails across the blue sea.' },
      { id: 'p13', grapheme: 'ch', spokenCue: 'ch as in chair', sampleWord: 'chair', sentence: 'Pull your chair close to the study table.' },
      { id: 'p14', grapheme: 'th', spokenCue: 'th as in think', sampleWord: 'think', sentence: 'Read carefully and think before answering.' },
      { id: 'p15', grapheme: 'wh', spokenCue: 'wh as in wheel', sampleWord: 'wheel', sentence: 'The bicycle wheel spins smoothly.' },
      { id: 'p16', grapheme: 'ph', spokenCue: 'fff as in phone', sampleWord: 'photo', sentence: 'Look at the nature photo in the album.' },
    ],
  },
  {
    id: 'ph-l4',
    levelNumber: 4,
    title: 'Level 4: Magic-E, Vowel Teams & R-Controlled',
    description: 'Long vowel patterns and fluent multisyllabic decoding.',
    phonemes: [
      { id: 'p17', grapheme: 'a_e', spokenCue: 'long A as in cake', sampleWord: 'cake', sentence: 'We shared a birthday cake with friends.' },
      { id: 'p18', grapheme: 'ee / ea', spokenCue: 'long E as in tree and read', sampleWord: 'tree', sentence: 'A green banyan tree gives cool shade.' },
      { id: 'p19', grapheme: 'i_e', spokenCue: 'long I as in kite', sampleWord: 'kite', sentence: 'Fly your colourful kite high in the breeze.' },
      { id: 'p20', grapheme: 'ai / ay', spokenCue: 'long A as in rain and play', sampleWord: 'rain', sentence: 'Monsoon rain helps green crops grow.' },
      { id: 'p21', grapheme: 'ar / or', spokenCue: 'star and corn', sampleWord: 'star', sentence: 'A bright star shines in the night sky.' },
    ],
  },
];

export const PHONICS_ONSETS = ['c', 'b', 'm', 'p', 'r', 's', 't', 'sh', 'ch', 'st'];
export const PHONICS_RIMES = ['at', 'an', 'ap', 'en', 'et', 'in', 'ip', 'ot', 'un', 'ake'];

export function generateVedicSpeedQuestions(count = 20): { prompt: string; answer: number; ruleTag: string }[] {
  const pool: { prompt: string; answer: number; ruleTag: string }[] = [];
  const tensEnd5 = [15, 25, 35, 45, 55, 65, 75, 85, 95];
  for (const n of tensEnd5) {
    pool.push({ prompt: `${n} × ${n}`, answer: n * n, ruleTag: 'Ekadhikena (ends in 5)' });
  }
  const elevens = [23, 34, 42, 53, 62, 71, 81, 36, 45, 54];
  for (const n of elevens) {
    pool.push({ prompt: `${n} × 11`, answer: n * 11, ruleTag: '× 11 Mental Rule' });
  }
  const nines = [24, 37, 48, 59, 66, 73, 84, 91];
  for (const n of nines) {
    pool.push({ prompt: `${n} × 99`, answer: n * 99, ruleTag: 'Ekanyunena (× 99)' });
  }
  const base100Pairs: [number, number][] = [
    [98, 97],
    [96, 95],
    [94, 98],
    [102, 105],
    [103, 107],
    [108, 104],
  ];
  for (const [a, b] of base100Pairs) {
    pool.push({ prompt: `${a} × ${b}`, answer: a * b, ruleTag: 'Nikhilam Base 100' });
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
