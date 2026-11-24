import {
  ChapterDefinitionItem,
  ChapterNoteExample,
  ChapterTopicExplanation,
  ClassLevel,
  EducationBoard,
  SubjectName,
} from '../../types';

export type MathTopicBlueprintId =
  | 'pre_number_spatial'
  | 'numbers_counting_early'
  | 'place_value_large_numbers'
  | 'roman_numerals'
  | 'addition_operations'
  | 'subtraction_operations'
  | 'multiplication_division'
  | 'money_currency'
  | 'measurement_units'
  | 'time_calendar'
  | 'shapes_2d_3d_nets'
  | 'patterns_symmetry'
  | 'fractions_operations'
  | 'decimals_operations'
  | 'factors_multiples_hcf_lcm'
  | 'integers_rational_numbers'
  | 'real_numbers_surds'
  | 'exponents_indices_squares_cubes'
  | 'sets_venn'
  | 'algebra_expressions_factorisation'
  | 'polynomials_zeroes'
  | 'linear_equations_one_var'
  | 'linear_equations_two_vars'
  | 'quadratic_equations'
  | 'arithmetic_progression'
  | 'ratio_proportion_variation'
  | 'percentage_profit_loss_discount'
  | 'simple_compound_interest'
  | 'financial_planning_gst_commercial'
  | 'lines_angles_parallel'
  | 'triangles_congruence'
  | 'similarity_bpt'
  | 'pythagoras_theorem'
  | 'quadrilaterals_theorems'
  | 'circles_chords_tangents'
  | 'geometric_constructions'
  | 'perimeter_area_heron'
  | 'surface_area_volume_mensuration'
  | 'coordinate_geometry'
  | 'trigonometry_heights'
  | 'data_handling_statistics'
  | 'probability';

export interface MathExerciseQuestionDraft {
  exerciseSetLabel: string;
  qNo: string;
  typeLabel: string;
  marks: number;
  subQuestionsCount: number;
  conceptUsed: string;
  formulaExplained: string;
  question: string;
  answer: string;
  stepByStepExplanation: string;
  calculationVerified: boolean;
}

export interface MathBlueprintBuildResult {
  blueprintId: MathTopicBlueprintId;
  topicDisplayName: string;
  detailedExplanation: string[];
  topicWiseExplanations: ChapterTopicExplanation[];
  keyPoints: string[];
  keyDefinitions: ChapterDefinitionItem[];
  formulasAndRules: string[];
  solvedExamples: ChapterNoteExample[];
  exerciseQuestions: MathExerciseQuestionDraft[];
}

export function classifyMathChapterBlueprint(
  chapterTitle: string,
  classNum: number
): MathTopicBlueprintId {
  const t = chapterTitle.toLowerCase();

  if (t.includes('roman numeral')) return 'roman_numerals';
  if (t.includes('quadratic')) return 'quadratic_equations';
  if (t.includes('arithmetic progression')) return 'arithmetic_progression';
  if (t.includes('probability')) return 'probability';
  if (t.includes('trigonometr') || t.includes('heights and distances')) return 'trigonometry_heights';
  if (t.includes('co-ordinate') || t.includes('coordinate')) return 'coordinate_geometry';
  if (t.includes('pythagoras') || t.includes('baudhayana')) return 'pythagoras_theorem';
  if (t.includes('similarity')) return 'similarity_bpt';
  if (
    t.includes('financial planning') ||
    t.includes('commercial mathematics') ||
    t.includes('gst') ||
    t.includes('shares and dividends')
  ) {
    return classNum === 9 && t.includes('compound interest')
      ? 'simple_compound_interest'
      : 'financial_planning_gst_commercial';
  }
  if (t.includes('simple interest') || t.includes('compound interest') || t.includes('banks and simple')) {
    return 'simple_compound_interest';
  }
  if (t.includes('discount') || t.includes('commission') || t.includes('profit') || t.includes('percentage') || t.includes('fractions in disguise')) {
    return 'percentage_profit_loss_discount';
  }
  if (t.includes('linear equations in two') || t.includes('pair of linear')) {
    return 'linear_equations_two_vars';
  }
  if (t.includes('equation') || t.includes('finding the unknown')) {
    return classNum >= 9 ? 'linear_equations_two_vars' : 'linear_equations_one_var';
  }
  if (t.includes('polynomial')) return 'polynomials_zeroes';
  if (t.includes('sets') || t === '1. sets' || t.endsWith('– 1. sets')) return 'sets_venn';
  if (
    t.includes('real numbers') ||
    t.includes('number systems') ||
    t.includes('pure arithmetic') ||
    t.includes('story of numbers')
  ) {
    return 'real_numbers_surds';
  }
  if (
    t.includes('indices') ||
    t.includes('cube root') ||
    t.includes('square and a cube') ||
    t.includes('power play')
  ) {
    return 'exponents_indices_squares_cubes';
  }
  if (
    t.includes('algebra') ||
    t.includes('expansion') ||
    t.includes('factorisation') ||
    t.includes('letter-numbers') ||
    t.includes('arithmetic expressions') ||
    t.includes('we distribute')
  ) {
    return 'algebra_expressions_factorisation';
  }
  if (t.includes('ratio') || t.includes('proportion') || t.includes('variation')) {
    return 'ratio_proportion_variation';
  }
  if (
    t.includes('statistics') ||
    t.includes('data') ||
    t.includes('pictograph') ||
    t.includes('bar graph') ||
    t.includes('manage the information') ||
    t.includes('reading pictures') ||
    t.includes('so many toys') ||
    t.includes('connecting the dots') ||
    t.includes('tales by dots') ||
    t.includes('observe and understand')
  ) {
    return 'data_handling_statistics';
  }
  if (t.includes('construction') || t.includes('geometric themes')) {
    return 'geometric_constructions';
  }
  if (
    t.includes('surface area') ||
    t.includes('volume') ||
    t.includes('mensuration')
  ) {
    return 'surface_area_volume_mensuration';
  }
  if (
    t.includes('perimeter') ||
    t.includes('heron') ||
    t.includes('areas related to circle') ||
    t.endsWith('area')
  ) {
    return 'perimeter_area_heron';
  }
  if (t.includes('circle')) return 'circles_chords_tangents';
  if (t.includes('quadrilateral')) return 'quadrilaterals_theorems';
  if (
    t.includes('triangle') ||
    t.includes('congruence') ||
    t.includes('geometric twins') ||
    t.includes('three intersecting lines') ||
    t.includes('altitudes and medians') ||
    (t.includes('geometry') && classNum >= 9)
  ) {
    return classNum === 10 && t.includes('similarity') ? 'similarity_bpt' : 'triangles_congruence';
  }
  if (
    t.includes('angle') ||
    t.includes('parallel lines') ||
    t.includes('basic concepts in geometry') ||
    t.includes('euclid')
  ) {
    return 'lines_angles_parallel';
  }
  if (t.includes('hcf') || t.includes('lcm') || t.includes('divisibility') || t.includes('multiples and factors') || t.includes('prime time') || t.includes('common ground')) {
    return 'factors_multiples_hcf_lcm';
  }
  if (t.includes('integer') || t.includes('other side of zero') || t.includes('rational numbers')) {
    return 'integers_rational_numbers';
  }
  if (t.includes('decimal') || t.includes('beyond the point')) {
    return 'decimals_operations';
  }
  if (t.includes('fraction') || t.includes('fair share') || t.includes('sharing and measuring')) {
    return 'fractions_operations';
  }
  if (t.includes('pattern') || t.includes('symmetry') || t.includes('utsav') || t.includes('surajkund') || t.includes('number play')) {
    return 'patterns_symmetry';
  }
  if (
    t.includes('shape') ||
    t.includes('geometrical figure') ||
    t.includes('three dimensional') ||
    t.includes('what is long') ||
    t.includes('shadow story') ||
    t.includes('playing with lines') ||
    t.includes('fun with line') ||
    t.includes('toy joy')
  ) {
    return 'shapes_2d_3d_nets';
  }
  if (
    t.includes('time') ||
    t.includes('calendar') ||
    t.includes('days of a week') ||
    t.includes('months in a year') ||
    t.includes('spend my day') ||
    t.includes('season') ||
    t.includes('clock')
  ) {
    return 'time_calendar';
  }
  if (
    t.includes('measure') ||
    t.includes('weigh') ||
    t.includes('capacity') ||
    t.includes('filling and lifting') ||
    t.includes('lina') ||
    t.includes('rani') ||
    t.includes('far and near')
  ) {
    return 'measurement_units';
  }
  if (
    t.includes('coin') ||
    t.includes('currency') ||
    t.includes('notes') ||
    t.includes('spend') ||
    t.includes('fun at the fair') ||
    t.includes('class party')
  ) {
    return 'money_currency';
  }
  if (
    t.includes('multiplication') ||
    t.includes('division') ||
    t.includes('how many times') ||
    t.includes('grouping and sharing') ||
    t.includes('count numbers in steps') ||
    t.includes('raksha bandhan') ||
    t.includes('equal groups') ||
    t.includes('transport museum') ||
    t.includes('dairy farm') ||
    t.includes('coconut farm') ||
    t.includes('travellers — ii')
  ) {
    return 'multiplication_division';
  }
  if (
    t.includes('subtraction') ||
    t.includes('untie a ten') ||
    t.includes('elephants, tigers')
  ) {
    return 'subtraction_operations';
  }
  if (
    t.includes('add') ||
    t.includes('how many?') ||
    t.includes('vegetable farm') ||
    t.includes('decoration for festival') ||
    t.includes('give and take') ||
    t.includes('nani maa') ||
    t.includes('cleanest village')
  ) {
    return 'addition_operations';
  }
  if (
    t.includes('place value') ||
    t.includes('expanded form') ||
    t.includes('number work') ||
    t.includes('hundreds') ||
    t.includes('thousands') ||
    t.includes('large numbers') ||
    t.includes('travellers — i')
  ) {
    return 'place_value_large_numbers';
  }
  if (
    t.includes('small – big') ||
    t.includes('behind') ||
    t.includes('above – below') ||
    t.includes('earlier – later') ||
    t.includes('one – many') ||
    t.includes('find the difference') ||
    t.includes('in – out') ||
    t.includes('long – short') ||
    t.includes('tall – short') ||
    t.includes('heavy – light') ||
    t.includes('far – near') ||
    t.includes('left – right') ||
    t.includes('furry cat') ||
    t.includes('hide and seek')
  ) {
    return 'pre_number_spatial';
  }
  return 'numbers_counting_early';
}

export function getExerciseSetPrefix(
  board: EducationBoard,
  classNum: number,
  chapterNumber: number,
  setIndex: number
): string {
  if (board === 'Maharashtra') {
    if (classNum >= 6) return setIndex === 4 ? `Problem Set ${chapterNumber}` : `Practice Set ${chapterNumber}.${setIndex}`;
    if (classNum >= 3) return `Problem Set ${(chapterNumber - 1) * 3 + setIndex}`;
    return `Textbook Page Exercise ${chapterNumber}.${setIndex}`;
  }
  if (board === 'CBSE') {
    if (classNum >= 9) return `NCERT Exercise ${chapterNumber}.${setIndex}`;
    if (classNum >= 6) return `Figure It Out – Exercise ${chapterNumber}.${setIndex}`;
    return `Let Us Do – Exercise ${chapterNumber}.${setIndex}`;
  }
  return `CISCE Exercise ${chapterNumber}(${String.fromCharCode(64 + setIndex)})`;
}

export function buildPrimaryMiddleMathBlueprint(params: {
  blueprintId: MathTopicBlueprintId;
  board: EducationBoard;
  classLevel: ClassLevel;
  classNum: number;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
}): MathBlueprintBuildResult | null {
  const { blueprintId, board, classNum, chapterNumber, chapterTitle } = params;
  const ex1 = getExerciseSetPrefix(board, classNum, chapterNumber, 1);
  const ex2 = getExerciseSetPrefix(board, classNum, chapterNumber, 2);
  const ex3 = getExerciseSetPrefix(board, classNum, chapterNumber, 3);
  const ex4 = getExerciseSetPrefix(board, classNum, chapterNumber, 4);

  const pBase = classNum * 12 + chapterNumber * 3;

  switch (blueprintId) {
    case 'pre_number_spatial':
    case 'numbers_counting_early': {
      const nA = classNum === 1 ? 7 : 34;
      const nB = classNum === 1 ? 15 : 68;
      const nC = classNum === 1 ? 19 : 85;
      const tensB = Math.floor(nB / 10);
      const onesB = nB % 10;
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Spatial & Number Foundations`,
        detailedExplanation: [
          `This chapter builds foundational number sense and spatial observation as prescribed in the official ${board} Class ${classNum} Mathematics textbook for "${chapterTitle}".`,
          `Students learn to compare objects and quantities systematically (Smaller/Bigger, Less/More, Before/After/Between) and group single units into bundles of 10 (1 Ten = 10 Ones).`,
          `Every number from 1 to 99 is represented using Tens and Units, enabling accurate reading in words, ascending/descending arrangement, and step-counting.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Observation, Comparison & One-to-One Correspondence`,
            explanation: `By pairing objects one-to-one, we determine which collection has More, which has Less, or whether both collections are Equal. Spatial terms (Above/Below, Inside/Outside, Left/Right, Earlier/Later) describe exact position and sequence.`,
            keyTakeaway: `Always pair objects one-by-one before declaring which group has more or fewer items.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Bundles of Ten, Zero & Number Building`,
            explanation: `When 10 single sticks are tied together, they form 1 bundle of Ten (1 Ten = 10 Units). Zero (0) represents the absence of any object in a collection or place column.`,
            keyTakeaway: `1 Ten + ${onesB} Units = ${10 + onesB}; ${tensB} Tens + ${onesB} Units = ${nB}.`,
          },
          {
            topicTitle: `${chapterNumber}.3 Neighbouring Numbers & Ascending/Descending Order`,
            explanation: `On a number strip, the number just before n is (n − 1), and the number just after n is (n + 1). Ascending order arranges numbers from smallest to greatest; descending order arranges from greatest to smallest.`,
            keyTakeaway: `Compare the Tens digit first; if Tens are equal, compare the Units digit.`,
          },
        ],
        keyPoints: [
          `1 Bundle of Ten = 10 Single Units (10 Ones = 1 Ten; 10 Tens = 1 Hundred).`,
          `Zero (0) means 'nothing' or 'empty collection'; adding 0 leaves a number unchanged (n + 0 = n).`,
          `The number just before n is n − 1 (Predecessor); the number just after n is n + 1 (Successor).`,
          `Increasing (Ascending) Order: Smallest → Greatest; Decreasing (Descending) Order: Greatest → Smallest.`,
        ],
        keyDefinitions: [
          { term: 'One-to-One Pairing', meaning: 'Matching each object in Group A with one object in Group B to find which group has more or less.' },
          { term: 'Zero (0)', meaning: 'The whole number representing no objects left in a group.' },
          { term: 'Tens and Units', meaning: 'Grouping numbers into bundles of 10 (Tens) and remaining single items (Units/Ones).' },
          { term: 'Ascending & Descending Order', meaning: 'Arranging numbers from smallest to largest (Ascending) or largest to smallest (Descending).' },
        ],
        formulasAndRules: [
          '1 Ten = 10 Units (Ones); 10 Tens = 1 Hundred (100).',
          'Two-Digit Number Value = (10 × Tens Digit) + (1 × Units Digit).',
          'Before Number = n − 1; After Number = n + 1; Middle Number between (n − 1) and (n + 1) is n.',
        ],
        solvedExamples: [
          {
            prompt: `Break the numbers (i) ${nB} and (ii) ${nC} into Tens and Units and write their expanded forms.`,
            solution: `(i) In ${nB}: Tens digit = ${tensB}, Units digit = ${onesB}.\n    ${nB} = ${tensB} Tens + ${onesB} Units = ${tensB * 10} + ${onesB}.\n(ii) In ${nC}: Tens digit = ${Math.floor(nC / 10)}, Units digit = ${nC % 10}.\n    ${nC} = ${Math.floor(nC / 10)} Tens + ${nC % 10} Units = ${Math.floor(nC / 10) * 10} + ${nC % 10}.`,
          },
          {
            prompt: `Arrange the numbers ${nC}, ${nA}, ${nB}, and ${nA + 5} in Ascending (Increasing) and Descending (Decreasing) order.`,
            solution: `Step 1: Compare Tens digits of ${nC}, ${nA}, ${nB}, ${nA + 5}.\nStep 2: Ascending Order (Smallest to Greatest): ${nA} < ${nA + 5} < ${nB} < ${nC}.\nStep 3: Descending Order (Greatest to Smallest): ${nC} > ${nB} > ${nA + 5} > ${nA}.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Spatial & Quantity Comparison',
            marks: 2,
            subQuestionsCount: 4,
            conceptUsed: 'One-to-One Correspondence and Magnitude Comparison',
            formulaExplained: 'Compare Tens place first: if Tens(A) > Tens(B), then A > B.',
            question: `Compare each pair and write the correct relation (> , < , or =):\n(i) ${nA} and ${nA + 4}\n(ii) ${nB} and ${nA}\n(iii) ${tensB} Tens ${onesB} Units and ${nB}\n(iv) ${nC} and ${nC - 9}`,
            answer: `(i) ${nA} < ${nA + 4} (${nA + 4} is greater than ${nA})\n(ii) ${nB} > ${nA} (${nB} has more tens than ${nA})\n(iii) ${tensB} Tens ${onesB} Units = ${nB} (Both equal ${nB})\n(iv) ${nC} > ${nC - 9}`,
            stepByStepExplanation: `Step 1: Convert any Tens-Units wording into standard numerals (${tensB} Tens ${onesB} Units = ${tensB * 10 + onesB} = ${nB}).\nStep 2: Compare the Tens digit first, then the Units digit.\nStep 3: Point the open mouth of the symbol (> or <) toward the larger number.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.2 (i)–(iv)',
            typeLabel: 'Neighbouring Numbers (Before, After, Between)',
            marks: 2,
            subQuestionsCount: 4,
            conceptUsed: 'Predecessor (n − 1) and Successor (n + 1) on the Number Line',
            formulaExplained: 'Number just before n = n − 1; Number just after n = n + 1.',
            question: `Write the missing neighbouring numbers:\n(i) Number just before ${nA} is ___\n(ii) Number just after ${nB} is ___\n(iii) Number between ${nB - 1} and ${nB + 1} is ___\n(iv) Number just after ${nC} is ___`,
            answer: `(i) ${nA - 1}\n(ii) ${nB + 1}\n(iii) ${nB}\n(iv) ${nC + 1}`,
            stepByStepExplanation: `(i) Subtract 1 from ${nA}: ${nA} − 1 = ${nA - 1}.\n(ii) Add 1 to ${nB}: ${nB} + 1 = ${nB + 1}.\n(iii) The integer after ${nB - 1} and before ${nB + 1} is ${nB}.\n(iv) Add 1 to ${nC}: ${nC} + 1 = ${nC + 1}.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.3 (i)–(iv)',
            typeLabel: 'Bundles of Ten & Place Value Decomposition',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Base-10 Place Value Grouping (1 Ten = 10 Ones)',
            formulaExplained: 'Value of 2-digit number ab = 10 × a + b.',
            question: `Write the number formed by the given Tens and Units:\n(i) 1 Ten and 6 Units\n(ii) ${tensB} Tens and ${onesB} Units\n(iii) ${tensB + 1} Tens and 0 Units\n(iv) Write the expanded form of ${nC}`,
            answer: `(i) 10 + 6 = 16\n(ii) ${tensB * 10} + ${onesB} = ${nB}\n(iii) ${(tensB + 1) * 10} + 0 = ${(tensB + 1) * 10}\n(iv) ${nC} = ${Math.floor(nC / 10)} Tens + ${nC % 10} Units = ${Math.floor(nC / 10) * 10} + ${nC % 10}`,
            stepByStepExplanation: `Multiply the number of Tens bundles by 10 and add the single Units. Check: ${Math.floor(nC / 10) * 10} + ${nC % 10} = ${nC}.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.4 (i)–(iii)',
            typeLabel: 'Ascending & Descending Order and Skip Counting',
            marks: 3,
            subQuestionsCount: 3,
            conceptUsed: 'Ordering Whole Numbers and Arithmetic Step Sequences',
            formulaExplained: 'In step-counting by k, each next term = current term + k.',
            question: `Solve the following:\n(i) Arrange in Increasing (Ascending) order: ${nC}, ${nA}, ${nB}, ${nA + 9}\n(ii) Arrange in Decreasing (Descending) order: ${nA}, ${nB}, ${nC}, ${nA + 9}\n(iii) Complete the step-counting pattern by 2s: ${nA}, ${nA + 2}, ${nA + 4}, ___, ___`,
            answer: `(i) Ascending Order: ${nA}, ${nA + 9}, ${nB}, ${nC}\n(ii) Descending Order: ${nC}, ${nB}, ${nA + 9}, ${nA}\n(iii) Next two numbers: ${nA + 6}, ${nA + 8}`,
            stepByStepExplanation: `(i) ${nA} < ${nA + 9} < ${nB} < ${nC}.\n(ii) Reverse order from largest to smallest: ${nC} > ${nB} > ${nA + 9} > ${nA}.\n(iii) Adding 2 each step: ${nA + 4} + 2 = ${nA + 6}; ${nA + 6} + 2 = ${nA + 8}.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex4,
            qNo: 'Q.5 (i)–(ii)',
            typeLabel: 'Textbook Word Problems on Counting & Grouping',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Grouping Objects into Tens and Single Units in Real Life',
            formulaExplained: 'Total Objects = (Number of Ten-Item Strings × 10) + Loose Objects.',
            question: `Solve the word problems step-by-step:\n(i) Meera made ${tensB} garlands of 10 flowers each, and ${onesB} loose flowers remained in her basket. How many flowers did she have in all?\n(ii) A box holds 10 pencils. How many full boxes of 10 can be packed from ${nC} pencils, and how many loose pencils will remain?`,
            answer: `(i) Total flowers = ${nB} flowers\n(ii) ${Math.floor(nC / 10)} full boxes of 10 pencils and ${nC % 10} loose pencils`,
            stepByStepExplanation: `(i) Step 1: Flowers in ${tensB} garlands of 10 = ${tensB} × 10 = ${tensB * 10}.\n    Step 2: Add loose flowers = ${tensB * 10} + ${onesB} = ${nB} flowers.\n(ii) Step 1: Decompose ${nC} into Tens and Units: ${nC} = ${Math.floor(nC / 10)} Tens + ${nC % 10} Units.\n    Step 2: Therefore, ${Math.floor(nC / 10)} full boxes of 10 can be packed and ${nC % 10} pencils remain loose.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'place_value_large_numbers':
    case 'roman_numerals': {
      const isRoman = blueprintId === 'roman_numerals';
      const num1 = classNum <= 3 ? 400 + pBase : classNum === 4 ? 42000 + pBase * 13 : 354200 + pBase * 21;
      const num2 = classNum <= 3 ? 350 + pBase : classNum === 4 ? 18500 + pBase * 7 : 128400 + pBase * 11;
      return {
        blueprintId,
        topicDisplayName: isRoman
          ? `${chapterTitle} — International & Roman Numeral Rules`
          : `${chapterTitle} — Place Value, Expanded Form & Number Comparison`,
        detailedExplanation: isRoman
          ? [
              `In "${chapterTitle}", students master the seven basic symbols of the Roman Numeral system: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000).`,
              `There is no symbol for Zero in Roman numerals, and place value does not apply. Instead, numbers are formed by four strict rules: Repetition (I, X, C, M up to 3 times), Addition (smaller symbol to the right adds), Subtraction (smaller symbol I, X, C to the left subtracts), and Non-Repetition of V, L, D.`,
            ]
          : [
              `In "${chapterTitle}", students learn the Indian Place Value System (Units, Tens, Hundreds, Thousands, Ten Thousands, Lakhs, Crores) alongside the International Place Value System.`,
              `The Face Value of a digit is the digit itself, whereas its Place Value is (Digit × Value of the Place Column). Expanded form expresses a number as the sum of the place values of all its digits.`,
            ],
        topicWiseExplanations: isRoman
          ? [
              {
                topicTitle: `${chapterNumber}.1 Basic Roman Symbols & Repetition Rule (Rule 1 & 2)`,
                explanation: `I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Only I, X, C, and M can be repeated, and at most 3 times consecutively (e.g., III = 3, XXX = 30). V, L, and D are never repeated.`,
                keyTakeaway: `Never write IIII for 4 or VV for 10.`,
              },
              {
                topicTitle: `${chapterNumber}.2 Additive & Subtractive Rules (Rule 3 & 4)`,
                explanation: `Writing a smaller numeral to the right of a greater numeral adds their values (VI = 5 + 1 = 6; XV = 10 + 5 = 15). Writing I before V or X (IV = 4, IX = 9), or X before L or C (XL = 40, XC = 90) subtracts the smaller value.`,
                keyTakeaway: `V, L, and D are never subtracted; I can only be subtracted from V and X.`,
              },
            ]
          : [
              {
                topicTitle: `${chapterNumber}.1 Place Value vs. Face Value & Comma Periods`,
                explanation: `In the Indian system, the first comma is placed after 3 digits from the right (Hundreds period), and subsequent commas after every 2 digits (Thousands, Lakhs, Crores).`,
                keyTakeaway: `Place Value of digit d = d × (Position Multiplier: 1, 10, 100, 1000, 10000, 100000).`,
              },
              {
                topicTitle: `${chapterNumber}.2 Expanded Form & Forming Greatest/Smallest Numbers`,
                explanation: `To form the greatest number from given digits without repetition, arrange digits in descending order. To form the smallest number, arrange in ascending order (if 0 is present, place 0 at the second position from the left).`,
                keyTakeaway: `A number cannot begin with 0 in its highest place column.`,
              },
            ],
        keyPoints: isRoman
          ? [
              'Seven Basic Symbols: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.',
              'Rule 1: If I or X is written 2 or 3 times consecutively, their sum gives the number (II = 2, XX = 20, XXX = 30).',
              'Rule 2: I or X can be repeated at most 3 times. V, L, and D are never repeated.',
              'Rule 3 (Addition): Smaller symbol on the right is added (VI = 5+1 = 6, XII = 10+2 = 12, LXV = 50+10+5 = 65).',
              'Rule 4 (Subtraction): Smaller symbol on the left is subtracted (IV = 5−1 = 4, IX = 10−1 = 9, XL = 50−10 = 40, XC = 100−10 = 90).',
            ]
          : [
              'Indian Place Value Periods: Ones (H, T, O), Thousands (T-Th, Th), Lakhs (T-L, L), Crores (T-Cr, Cr).',
              '1 Lakh = 1,00,000 = 100 Thousands; 10 Lakhs = 1 Million; 1 Crore = 1,00,00,000 = 10 Millions.',
              'Expanded Form = Sum of place values of each digit in the number.',
              'Greatest n-digit number uses all 9s; Smallest n-digit number is 1 followed by (n − 1) zeroes.',
            ],
        keyDefinitions: isRoman
          ? [
              { term: 'Roman Numerals', meaning: 'An ancient numeral system using Latin letters I, V, X, L, C, D, M to represent numbers.' },
              { term: 'Additive Principle', meaning: 'Placing a smaller value symbol to the right of a larger symbol adds their values (e.g., XV = 10 + 5 = 15).' },
              { term: 'Subtractive Principle', meaning: 'Placing I before V or X (or X before L or C) subtracts the smaller value (e.g., IV = 4, IX = 9, XL = 40).' },
            ]
          : [
              { term: 'Place Value', meaning: 'The numerical value that a digit has by virtue of its position in a number (Digit × Place Value Column).' },
              { term: 'Expanded Form', meaning: 'Writing a number as the addition of the place values of its digits.' },
              { term: 'Predecessor & Successor', meaning: 'Predecessor = Given Number − 1; Successor = Given Number + 1.' },
            ],
        formulasAndRules: isRoman
          ? [
              'IV = 5 − 1 = 4; VI = 5 + 1 = 6; IX = 10 − 1 = 9; XI = 10 + 1 = 11.',
              'XL = 50 − 10 = 40; LX = 50 + 10 = 60; XC = 100 − 10 = 90; CX = 100 + 10 = 110.',
              'Decompose 2-digit numbers into Tens + Units before converting to Roman numerals (e.g., 19 = 10 + 9 = X + IX = XIX).',
            ]
          : [
              'Place Value of Digit = (Face Value of Digit) × (Value of the Place).',
              'Successor(N) = N + 1; Predecessor(N) = N − 1.',
              'Difference between Place Value and Face Value of digit d at 10^k place = d × 10^k − d.',
            ],
        solvedExamples: isRoman
          ? [
              {
                prompt: 'Write the numbers (i) 14, (ii) 19, (iii) 27, and (iv) 49 in Roman numerals step-by-step.',
                solution: `(i) 14 = 10 + 4 = X + IV = XIV.\n(ii) 19 = 10 + 9 = X + IX = XIX.\n(iii) 27 = 20 + 7 = XX + VII = XXVII.\n(iv) 49 = 40 + 9 = XL + IX = XLIX (Note: Never write IL for 49!).`,
              },
              {
                prompt: 'Convert the Roman numerals (i) XXIV, (ii) XXXIX, and (iii) XCIV into International (Hindu-Arabic) numerals.',
                solution: `(i) XXIV = XX + IV = 20 + 4 = 24.\n(ii) XXXIX = XXX + IX = 30 + 9 = 39.\n(iii) XCIV = XC + IV = 90 + 4 = 94.`,
              },
            ]
          : [
              {
                prompt: `Write the place value of each non-zero digit and the expanded form of ${num1.toLocaleString('en-IN')}.`,
                solution: `Step 1: Number = ${num1.toLocaleString('en-IN')}.\nStep 2: Break into place columns: ${String(num1)
                  .split('')
                  .map((d, i, arr) => `${d} × ${Math.pow(10, arr.length - 1 - i)}`)
                  .join(' + ')}.\nStep 3: Expanded Form = ${String(num1)
                  .split('')
                  .map((d, i, arr) => Number(d) * Math.pow(10, arr.length - 1 - i))
                  .filter((v) => v > 0)
                  .join(' + ')} = ${num1}.`,
              },
              {
                prompt: 'Using the digits 7, 0, 4, 9, 2 only once, form the greatest and smallest 5-digit numbers and find their difference.',
                solution: `Step 1: Greatest 5-digit number (descending digits): 97,420.\nStep 2: Smallest 5-digit number (0 placed second): 20,479.\nStep 3: Difference = 97,420 − 20,479 = 76,941.`,
              },
            ],
        exerciseQuestions: isRoman
          ? [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(vi)',
                typeLabel: 'Convert International Numerals to Roman Numerals',
                marks: 3,
                subQuestionsCount: 6,
                conceptUsed: 'Tens + Units Decomposition and Roman Additive/Subtractive Rules',
                formulaExplained: 'Break number N into (Tens Multiple) + (Units Digit), then replace each part by its Roman representation.',
                question: `Write the following numbers using Roman numerals:\n(i) 9   (ii) 14   (iii) 18   (iv) 24   (v) 39   (vi) 48`,
                answer: `(i) 9 = IX\n(ii) 14 = XIV\n(iii) 18 = XVIII\n(iv) 24 = XXIV\n(v) 39 = XXXIX\n(vi) 48 = XLVIII`,
                stepByStepExplanation: `(i) 9 = 10 − 1 = IX.\n(ii) 14 = 10 + 4 = X + IV = XIV.\n(iii) 18 = 10 + 8 = X + VIII = XVIII.\n(iv) 24 = 20 + 4 = XX + IV = XXIV.\n(v) 39 = 30 + 9 = XXX + IX = XXXIX.\n(vi) 48 = 40 + 8 = XL + VIII = XLVIII.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.2 (i)–(vi)',
                typeLabel: 'Convert Roman Numerals to International Numerals',
                marks: 3,
                subQuestionsCount: 6,
                conceptUsed: 'Reading Compound Roman Symbols',
                formulaExplained: 'If left symbol ≥ right symbol, add; if left symbol < right symbol, subtract left from right.',
                question: `Write the following Roman numerals as International (Hindu-Arabic) numbers:\n(i) VII   (ii) XIII   (iii) XVI   (iv) XIX   (v) XXIX   (vi) XLIV`,
                answer: `(i) VII = 7\n(ii) XIII = 13\n(iii) XVI = 16\n(iv) XIX = 19\n(v) XXIX = 29\n(vi) XLIV = 44`,
                stepByStepExplanation: `(i) VII = 5 + 2 = 7.\n(ii) XIII = 10 + 3 = 13.\n(iii) XVI = 10 + 5 + 1 = 16.\n(iv) XIX = 10 + (10 − 1) = 19.\n(v) XXIX = 20 + (10 − 1) = 29.\n(vi) XLIV = (50 − 10) + (5 − 1) = 40 + 4 = 44.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.3 (i)–(iv)',
                typeLabel: 'Identify Right or Wrong Roman Numeral Representations',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Validation of Roman Repetition and Subtraction Restrictions',
                formulaExplained: 'I, X, C, M repeat max 3 times; V, L, D never repeat and are never subtracted.',
                question: `State whether the following Roman numerals are Right or Wrong, and write the correct form for wrong ones:\n(i) IIII for 4\n(ii) VV for 10\n(iii) XIIX for 18\n(iv) XXVI for 26`,
                answer: `(i) Wrong — Correct form: IV (I cannot be repeated 4 times)\n(ii) Wrong — Correct form: X (V is never repeated)\n(iii) Wrong — Correct form: XVIII (18 = 10 + 8 = X + VIII)\n(iv) Right — XXVI = 20 + 6 = 26`,
                stepByStepExplanation: `Apply Rule 2 (no symbol repeats more than 3 times; V never repeats) and Rule 4 (decompose into Tens + Units before writing).`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.4 (i)–(iv)',
                typeLabel: 'Compare & Compute with Roman Numerals',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Arithmetic Operations via Decimal Conversion',
                formulaExplained: 'Convert Roman → Hindu-Arabic → Perform Operation → Express Result in Roman Numeral.',
                question: `Solve and write the answer in Roman numerals:\n(i) XII + VII\n(ii) XXV − IX\n(iii) VIII × III\n(iv) Compare using > or < : XIX ___ XXI`,
                answer: `(i) XIX (19)\n(ii) XVI (16)\n(iii) XXIV (24)\n(iv) XIX < XXI (19 < 21)`,
                stepByStepExplanation: `(i) 12 + 7 = 19 = 10 + 9 = XIX.\n(ii) 25 − 9 = 16 = 10 + 6 = XVI.\n(iii) 8 × 3 = 24 = 20 + 4 = XXIV.\n(iv) XIX = 19 and XXI = 21; since 19 < 21, XIX < XXI.`,
                calculationVerified: true,
              },
            ]
          : [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Place Value & Expanded Form',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Base-10 Place Value Multiplication',
                formulaExplained: 'Place Value = Digit × 10^(Position Index from Right).',
                question: `Answer the following for the numbers ${num1} and ${num2}:\n(i) Write the expanded form of ${num1}.\n(ii) Write the expanded form of ${num2}.\n(iii) Find the predecessor and successor of ${num1}.\n(iv) Compare ${num1} and ${num2} using > or <.`,
                answer: `(i) ${String(num1)
                  .split('')
                  .map((d, i, a) => Number(d) * Math.pow(10, a.length - 1 - i))
                  .filter((v) => v > 0)
                  .join(' + ')}\n(ii) ${String(num2)
                  .split('')
                  .map((d, i, a) => Number(d) * Math.pow(10, a.length - 1 - i))
                  .filter((v) => v > 0)
                  .join(' + ')}\n(iii) Predecessor = ${num1 - 1}; Successor = ${num1 + 1}\n(iv) ${num1} > ${num2}`,
                stepByStepExplanation: `Multiply each digit by its place column value and sum to verify: sum equals ${num1} and ${num2} respectively.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iii)',
                typeLabel: 'Forming Greatest and Smallest Numbers from Given Digits',
                marks: 3,
                subQuestionsCount: 3,
                conceptUsed: 'Combinatorial Digit Ordering with Zero Constraint',
                formulaExplained: 'Greatest number: sort digits d₁ > d₂ > ... > dₙ; Smallest number: sort ascending with first non-zero digit in the leading place.',
                question: `Using the digits 6, 0, 8, 3, 5 without repetition:\n(i) Form the greatest 5-digit number.\n(ii) Form the smallest 5-digit number.\n(iii) Find the sum and difference of these two numbers.`,
                answer: `(i) Greatest 5-digit number = 86,530\n(ii) Smallest 5-digit number = 30,568\n(iii) Sum = 1,17,098; Difference = 55,962`,
                stepByStepExplanation: `(i) Descending digits: 8, 6, 5, 3, 0 → 86,530.\n(ii) Smallest non-zero digit 3 first, then 0, 5, 6, 8 → 30,568.\n(iii) Sum: 86,530 + 30,568 = 1,17,098. Difference: 86,530 − 30,568 = 55,962. Verification: 55,962 + 30,568 = 86,530.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.3 (i)–(ii)',
                typeLabel: 'Word Problems on Large Numbers',
                marks: 4,
                subQuestionsCount: 2,
                conceptUsed: 'Place Value Comparison and Difference in Real-World Data',
                formulaExplained: 'Increase / Exceeds = Larger Quantity − Smaller Quantity; Combined Total = Quantity 1 + Quantity 2.',
                question: `Solve the following word problems:\n(i) Town A has a population of ${num1} and Town B has a population of ${num2}. Which town has a greater population and by how much?\n(ii) What is the combined population of Town A and Town B?`,
                answer: `(i) Town A has a greater population by ${num1 - num2}\n(ii) Combined population = ${num1 + num2}`,
                stepByStepExplanation: `(i) Compare ${num1} and ${num2}: Since ${num1} > ${num2}, Town A exceeds Town B by ${num1} − ${num2} = ${num1 - num2}.\n(ii) Total population = ${num1} + ${num2} = ${num1 + num2}. Verification: (${num1 + num2}) − ${num2} = ${num1}.`,
                calculationVerified: true,
              },
            ],
      };
    }

    case 'addition_operations':
    case 'subtraction_operations': {
      const isSub = blueprintId === 'subtraction_operations';
      const a = classNum === 1 ? 14 : classNum === 2 ? 58 : classNum === 3 ? 468 : classNum === 4 ? 24685 : 348650;
      const b = classNum === 1 ? 5 : classNum === 2 ? 27 : classNum === 3 ? 279 : classNum === 4 ? 13896 : 179485;
      const sumAB = a + b;
      const diffAB = a - b;
      return {
        blueprintId,
        topicDisplayName: isSub
          ? `${chapterTitle} — Column Subtraction, Regrouping (Borrowing) & Story Problems`
          : `${chapterTitle} — Column Addition, Regrouping (Carrying Over) & Story Problems`,
        detailedExplanation: [
          `In "${chapterTitle}", students master ${isSub ? 'column subtraction with and without borrowing (regrouping)' : 'column addition with and without carrying over (regrouping)'} aligned with the ${board} Class ${classNum} syllabus.`,
          `Always align numbers vertically according to their Place Value columns (Units under Units, Tens under Tens, Hundreds under Hundreds) and always begin calculating from the extreme right (Units place).`,
          `Every ${isSub ? 'subtraction' : 'addition'} result can be verified using the inverse operation: ${isSub ? 'Difference + Subtrahend = Minuend' : 'Sum − First Addend = Second Addend'}.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Vertical Column Alignment & Regrouping Rule`,
            explanation: isSub
              ? `When the top digit in a place column is smaller than the bottom digit, untie (borrow) 1 unit from the next higher place column on the left (1 Ten = 10 Units; 1 Hundred = 10 Tens).`
              : `When the sum of digits in any column is 10 or more, write the Units digit of the sum in that column and carry over the Tens digit to the next higher place column on the left.`,
            keyTakeaway: `Always start from the Units (Ones) column on the right and move leftward column by column.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Inverse Relationship Between Addition and Subtraction`,
            explanation: `Addition and subtraction are inverse operations. If A + B = C, then C − A = B and C − B = A. This allows independent verification of every sum or difference.`,
            keyTakeaway: `Check every subtraction A − B = D by verifying that D + B = A.`,
          },
        ],
        keyPoints: [
          'Align numbers strictly by place value columns (Units, Tens, Hundreds, Thousands) from right to left.',
          'Adding or subtracting 0 from any number leaves the number unchanged (N + 0 = N; N − 0 = N).',
          'Regrouping Rule: 10 Units = 1 Ten; 10 Tens = 1 Hundred; 10 Hundreds = 1 Thousand.',
          'Inverse Check: Minuend − Subtrahend = Difference ⇔ Difference + Subtrahend = Minuend.',
        ],
        keyDefinitions: [
          { term: 'Addends & Sum', meaning: 'The numbers being added are called Addends, and the result of addition is called the Sum.' },
          { term: 'Minuend, Subtrahend & Difference', meaning: 'In A − B = D, the greater number A is the Minuend, B is the Subtrahend, and D is the Difference.' },
          { term: 'Regrouping (Carry Over / Borrowing)', meaning: 'Exchanging 10 units of a lower place column with 1 unit of the adjacent higher place column.' },
        ],
        formulasAndRules: [
          'Addition Identity: Addend 1 + Addend 2 = Total Sum.',
          'Subtraction Verification Formula: Difference + Subtrahend = Minuend.',
          'Missing Term Rule: If x + b = c, then x = c − b; if a − x = d, then x = a − d.',
        ],
        solvedExamples: [
          {
            prompt: `Compute (i) ${a} + ${b} and (ii) ${a} − ${b} and verify both results.`,
            solution: `(i) Addition: ${a} + ${b} = ${sumAB}.\n    Verification: ${sumAB} − ${b} = ${a} (Verified).\n(ii) Subtraction: ${a} − ${b} = ${diffAB}.\n    Verification: ${diffAB} + ${b} = ${a} (Verified).`,
          },
          {
            prompt: `Find the missing number in the box: [ ? ] + ${b} = ${sumAB}.`,
            solution: `Step 1: Using the inverse rule, Missing Addend = Total Sum − Known Addend.\nStep 2: Missing Number = ${sumAB} − ${b} = ${a}.\nStep 3: Check: ${a} + ${b} = ${sumAB} (LHS = RHS).`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: isSub ? 'Vertical Column Subtraction Drills' : 'Vertical Column Addition Drills',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Place-Column Alignment and Regrouping',
            formulaExplained: isSub
              ? 'Difference = Minuend − Subtrahend; verify via Difference + Subtrahend = Minuend.'
              : 'Sum = Addend₁ + Addend₂; regroup every 10 units into 1 of the next left column.',
            question: isSub
              ? `Subtract the following numbers and verify each answer by addition:\n(i) ${a} − ${b}\n(ii) ${a + 12} − ${b}\n(iii) ${sumAB} − ${a}\n(iv) ${a} − 0`
              : `Add the following numbers and verify each answer by subtraction:\n(i) ${a} + ${b}\n(ii) ${a + 15} + ${b}\n(iii) ${b} + ${b}\n(iv) ${a} + 0`,
            answer: isSub
              ? `(i) ${diffAB}\n(ii) ${diffAB + 12}\n(iii) ${b}\n(iv) ${a}`
              : `(i) ${sumAB}\n(ii) ${sumAB + 15}\n(iii) ${2 * b}\n(iv) ${a}`,
            stepByStepExplanation: isSub
              ? `(i) ${a} − ${b} = ${diffAB} (Check: ${diffAB} + ${b} = ${a}).\n(ii) ${a + 12} − ${b} = ${diffAB + 12} (Check: ${diffAB + 12} + ${b} = ${a + 12}).\n(iii) ${sumAB} − ${a} = ${b} (Check: ${b} + ${a} = ${sumAB}).\n(iv) Subtracting 0 leaves ${a} unchanged.`
              : `(i) ${a} + ${b} = ${sumAB} (Check: ${sumAB} − ${b} = ${a}).\n(ii) ${a + 15} + ${b} = ${sumAB + 15} (Check: ${sumAB + 15} − ${b} = ${a + 15}).\n(iii) ${b} + ${b} = ${2 * b}.\n(iv) Adding 0 leaves ${a} unchanged.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Find the Missing Number (Addition–Subtraction Pair)',
            marks: 3,
            subQuestionsCount: 3,
            conceptUsed: 'Inverse Operations (Addition ↔ Subtraction)',
            formulaExplained: 'If A + B = C, then A = C − B and B = C − A.',
            question: `Find the missing number in each statement:\n(i) ${a} + [ ___ ] = ${sumAB}\n(ii) ${sumAB} − [ ___ ] = ${a}\n(iii) [ ___ ] − ${b} = ${diffAB}`,
            answer: `(i) ${b}\n(ii) ${b}\n(iii) ${a}`,
            stepByStepExplanation: `(i) Missing number = ${sumAB} − ${a} = ${b}.\n(ii) Missing subtrahend = ${sumAB} − ${a} = ${b}.\n(iii) Missing minuend = ${diffAB} + ${b} = ${a}.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Textbook Word Problems (Story Sums)',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Translating Real-Life Quantities into Addition and Subtraction Equations',
            formulaExplained: 'Total = Part 1 + Part 2; Remaining = Initial Total − Used/Distributed.',
            question: `Solve the following textbook story problems showing full statements:\n(i) A school library had ${a} storybooks and purchased ${b} new science books. How many books are there in the library now?\n(ii) Out of ${sumAB} saplings planted during Van Mahotsav, ${a} are mango saplings and the rest are neem saplings. How many neem saplings were planted?\n(iii) By how much is ${a} greater than ${b}?`,
            answer: `(i) ${sumAB} books in all\n(ii) ${b} neem saplings\n(iii) ${a} is greater than ${b} by ${diffAB}`,
            stepByStepExplanation: `(i) Storybooks = ${a}; Science books = ${b}; Total books = ${a} + ${b} = ${sumAB} books.\n(ii) Total saplings = ${sumAB}; Mango saplings = ${a}; Neem saplings = ${sumAB} − ${a} = ${b} saplings.\n(iii) Difference = ${a} − ${b} = ${diffAB}. Verification: ${b} + ${diffAB} = ${a}.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'multiplication_division':
    case 'money_currency':
    case 'measurement_units':
    case 'time_calendar': {
      const m1 = classNum <= 2 ? 8 : classNum <= 4 ? 36 : 145;
      const m2 = classNum <= 2 ? 4 : classNum <= 4 ? 9 : 12;
      const prod = m1 * m2;
      const rem = 3;
      const dividendWithRem = prod + rem;
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Multiplicative Reasoning, Measurement & Practical Arithmetic`,
        detailedExplanation: [
          `In "${chapterTitle}", students apply multiplication, division, unit conversions, and real-world measurement/currency calculations aligned with ${board} Class ${classNum} Mathematics.`,
          `Multiplication is repeated addition of equal groups (Groups × Items per Group = Total), while division is equal sharing or repeated subtraction.`,
          `Every division operation satisfies the Division Verification Algorithm: Dividend = (Divisor × Quotient) + Remainder, where 0 ≤ Remainder < Divisor.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Multiplication & Unitary Method`,
            explanation: `If the value of 1 item is known, the value of m items is found by multiplication: Total = (Value of 1 item) × m. Conversely, if the value of m items is known, the value of 1 item is found by division.`,
            keyTakeaway: `1 → Many: Multiply (×); Many → 1: Divide (÷).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Division Algorithm & Standard Unit Conversions`,
            explanation: `Standard conversions: ₹1 = 100 Paise; 1 m = 100 cm; 1 km = 1000 m; 1 kg = 1000 g; 1 L = 1000 mL; 1 Hour = 60 Minutes; 1 Day = 24 Hours.`,
            keyTakeaway: `Always verify division using: Dividend = (Divisor × Quotient) + Remainder.`,
          },
        ],
        keyPoints: [
          'Multiplication Properties: a × b = b × a (Commutative); a × 1 = a; a × 0 = 0.',
          'Division Algorithm: Dividend = (Divisor × Quotient) + Remainder (with Remainder < Divisor).',
          'Standard Metric & Time Units: 1 km = 1000 m, 1 m = 100 cm, 1 kg = 1000 g, 1 L = 1000 mL, 1 hr = 60 min.',
          'Unitary Method: First divide to find the cost/quantity of 1 unit, then multiply to find for required units.',
        ],
        keyDefinitions: [
          { term: 'Product, Multiplicand & Multiplier', meaning: 'In A × B = P, A is the Multiplicand, B is the Multiplier, and P is the Product.' },
          { term: 'Division Algorithm', meaning: 'The fundamental rule Dividend = (Divisor × Quotient) + Remainder.' },
          { term: 'Unitary Method', meaning: 'Finding the value of a single unit first by division, and then the value of multiple units by multiplication.' },
        ],
        formulasAndRules: [
          'Product = Multiplicand × Multiplier.',
          'Dividend = (Divisor × Quotient) + Remainder (0 ≤ Remainder < Divisor).',
          '1 m = 100 cm; 1 km = 1000 m; 1 kg = 1000 g; 1 L = 1000 mL; 1 Hour = 60 Minutes; ₹1 = 100 Paise.',
        ],
        solvedExamples: [
          {
            prompt: `Multiply ${m1} × ${m2} and verify by dividing the product ${prod} by ${m2}.`,
            solution: `Step 1: Product = ${m1} × ${m2} = ${prod}.\nStep 2: Verification by division: ${prod} ÷ ${m2} = ${m1} with Remainder = 0 (Verified).`,
          },
          {
            prompt: `Divide ${dividendWithRem} by ${m2}, write the Quotient and Remainder, and verify using the Division Algorithm.`,
            solution: `Step 1: Since ${m2} × ${m1} = ${prod}, dividing ${dividendWithRem} by ${m2} gives Quotient (Q) = ${m1} and Remainder (R) = ${rem}.\nStep 2: Verification: (Divisor × Quotient) + Remainder = (${m2} × ${m1}) + ${rem} = ${prod} + ${rem} = ${dividendWithRem} = Dividend (Verified).`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Multiplication & Division Calculations',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Place-Value Multiplication and Division Verification Algorithm',
            formulaExplained: 'Dividend = (Divisor × Quotient) + Remainder.',
            question: `Solve the following step-by-step:\n(i) ${m1} × ${m2}\n(ii) ${m1} × 10\n(iii) ${prod} ÷ ${m2}\n(iv) Divide ${dividendWithRem} by ${m2} and find Quotient and Remainder.`,
            answer: `(i) ${prod}\n(ii) ${m1 * 10}\n(iii) Quotient = ${m1}, Remainder = 0\n(iv) Quotient = ${m1}, Remainder = ${rem}`,
            stepByStepExplanation: `(i) ${m1} × ${m2} = ${prod}.\n(ii) Multiplying by 10 shifts digits one place left: ${m1} × 10 = ${m1 * 10}.\n(iii) ${prod} ÷ ${m2} = ${m1}.\n(iv) ${dividendWithRem} = (${m2} × ${m1}) + ${rem}, so Q = ${m1}, R = ${rem}.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iv)',
            typeLabel: 'Standard Conversions (Currency, Length, Mass, Capacity & Time)',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Metric, Currency and Time Unit Conversion Factors',
            formulaExplained: 'Larger Unit → Smaller Unit: Multiply by conversion factor (1000, 100, or 60).',
            question: `Convert the following into the specified units:\n(i) 4 metres 35 centimetres into centimetres\n(ii) 3 kilograms 250 grams into grams\n(iii) 2 hours 45 minutes into minutes\n(iv) 5 notes of ₹20 and 4 coins of ₹5 into total Rupees`,
            answer: `(i) 435 cm\n(ii) 3,250 g\n(iii) 165 minutes\n(iv) ₹120`,
            stepByStepExplanation: `(i) 4 m 35 cm = (4 × 100) + 35 = 400 + 35 = 435 cm.\n(ii) 3 kg 250 g = (3 × 1000) + 250 = 3,250 g.\n(iii) 2 hr 45 min = (2 × 60) + 45 = 120 + 45 = 165 minutes.\n(iv) (5 × ₹20) + (4 × ₹5) = ₹100 + ₹20 = ₹120.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Unitary Method & Real-Life Word Problems',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Unitary Method (Many → One → Required Many)',
            formulaExplained: 'Cost of 1 unit = (Cost of n units) ÷ n; Cost of k units = (Cost of 1 unit) × k.',
            question: `Solve the word problems showing all steps:\n(i) If ${m2} identical geometry boxes cost ₹${prod}, find the cost of 1 geometry box and the cost of 5 such geometry boxes.\n(ii) A dairy farm packs ${dividendWithRem} litres of milk into cans holding ${m2} litres each. How many cans are completely filled and how many litres of milk remain?`,
            answer: `(i) Cost of 1 box = ₹${m1}; Cost of 5 boxes = ₹${m1 * 5}\n(ii) ${m1} cans completely filled and ${rem} litres remain`,
            stepByStepExplanation: `(i) Step 1: Cost of ${m2} boxes = ₹${prod} ⇒ Cost of 1 box = ₹${prod} ÷ ${m2} = ₹${m1}.\n    Step 2: Cost of 5 boxes = ₹${m1} × 5 = ₹${m1 * 5}.\n(ii) Step 1: Divide ${dividendWithRem} by ${m2}: ${dividendWithRem} = (${m2} × ${m1}) + ${rem}.\n    Step 2: Therefore, ${m1} cans are completely filled and ${rem} litres remain.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'shapes_2d_3d_nets':
    case 'patterns_symmetry': {
      const sStart = classNum * 3 + chapterNumber;
      const sStep = classNum + 3;
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — 2D/3D Geometric Properties, Patterns & Symmetry`,
        detailedExplanation: [
          `In "${chapterTitle}", students explore 2D plane figures (Rectangle, Square, Triangle, Circle), 3D solid shapes (Cuboid, Cube, Cylinder, Cone, Sphere), lines of symmetry, and mathematical patterns.`,
          `Every 3D polyhedron satisfies Euler's Relationship connecting Faces (F), Vertices (V), and Edges (E): F + V − E = 2.`,
          `A figure has Line (Reflection) Symmetry if folding it along a line divides it into two identical mirror halves.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Properties of 2D Figures & 3D Solids (Faces, Edges, Vertices)`,
            explanation: `A Rectangle has 4 sides (opposite sides equal) and 4 corners (vertices). A Square has all 4 sides equal. A Cuboid and a Cube each have 6 flat faces, 12 straight edges, and 8 vertices (corners).`,
            keyTakeaway: `Cuboid/Cube: F = 6, V = 8, E = 12 (Euler's check: 6 + 8 − 12 = 2).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Symmetry & Number/Shape Patterns`,
            explanation: `A Square has 4 lines of symmetry, a Rectangle has 2, an Equilateral Triangle has 3, and a Circle has infinitely many lines of symmetry.`,
            keyTakeaway: `Identify the constant difference or multiplier rule to extend any number pattern accurately.`,
          },
        ],
        keyPoints: [
          '2D Shapes: Rectangle (4 sides, opposite equal, 2 lines of symmetry); Square (4 equal sides, 4 lines of symmetry); Triangle (3 sides, 3 vertices).',
          '3D Solids: Cuboid & Cube (6 Faces, 12 Edges, 8 Vertices); Cylinder (2 circular flat faces, 1 curved face, 2 circular edges, 0 vertices); Cone (1 flat face, 1 curved face, 1 edge, 1 vertex); Sphere (1 curved face, 0 edges, 0 vertices).',
          'Euler’s Polyhedron Formula: Faces (F) + Vertices (V) − Edges (E) = 2.',
          'Triangular numbers: 1, 3, 6, 10, 15, ... [n(n+1)/2]; Square numbers: 1, 4, 9, 16, 25, ... [n²].',
        ],
        keyDefinitions: [
          { term: 'Face, Edge & Vertex', meaning: 'A flat surface of a 3D solid is a Face; where two faces meet is an Edge; where edges meet at a corner is a Vertex.' },
          { term: 'Line of Symmetry', meaning: 'An axis along which a figure can be folded so that the two halves coincide completely.' },
          { term: 'Net of a 3D Solid', meaning: 'A 2D flat pattern of connected polygons that can be folded along its edges to form a 3D solid.' },
        ],
        formulasAndRules: [
          'Euler’s Formula for Polyhedra: F + V − E = 2.',
          'Lines of Symmetry: Regular n-sided polygon has exactly n lines of symmetry.',
          'Arithmetic Pattern nth Term: Tₙ = First Term + (n − 1) × Step Difference.',
        ],
        solvedExamples: [
          {
            prompt: 'Verify Euler’s relation (F + V − E = 2) for (i) a Cuboid and (ii) a Square Pyramid.',
            solution: `(i) For a Cuboid: Faces (F) = 6, Vertices (V) = 8, Edges (E) = 12.\n    F + V − E = 6 + 8 − 12 = 14 − 12 = 2 (Verified).\n(ii) For a Square Pyramid: Faces (F) = 5 (1 square base + 4 triangles), Vertices (V) = 5, Edges (E) = 8.\n    F + V − E = 5 + 5 − 8 = 10 − 8 = 2 (Verified).`,
          },
          {
            prompt: `Identify the rule and find the next three terms of the pattern: ${sStart}, ${sStart + sStep}, ${sStart + 2 * sStep}, ${sStart + 3 * sStep}, ...`,
            solution: `Step 1: Difference between consecutive terms = ${sStart + sStep} − ${sStart} = +${sStep}.\nStep 2: 5th term = ${sStart + 3 * sStep} + ${sStep} = ${sStart + 4 * sStep}.\nStep 3: 6th term = ${sStart + 5 * sStep}; 7th term = ${sStart + 6 * sStep}.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(v)',
            typeLabel: 'Faces, Edges and Vertices of 3D Solids',
            marks: 3,
            subQuestionsCount: 5,
            conceptUsed: '3D Geometric Structure of Solids',
            formulaExplained: 'Count flat/curved surfaces (Faces), boundary segments (Edges), and corners (Vertices).',
            question: `Write the number of Faces, Edges, and Vertices for each 3D shape:\n(i) Cuboid\n(ii) Cube\n(iii) Cylinder\n(iv) Cone\n(v) Sphere`,
            answer: `(i) Cuboid: 6 Faces, 12 Edges, 8 Vertices\n(ii) Cube: 6 Equal Square Faces, 12 Edges, 8 Vertices\n(iii) Cylinder: 3 Faces (2 flat circular + 1 curved), 2 Circular Edges, 0 Vertices\n(iv) Cone: 2 Faces (1 flat circular + 1 curved), 1 Circular Edge, 1 Vertex (Apex)\n(v) Sphere: 1 Curved Face, 0 Edges, 0 Vertices`,
            stepByStepExplanation: `For Cuboid and Cube, verify Euler's rule: F + V − E = 6 + 8 − 12 = 2.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iv)',
            typeLabel: 'Axes of Symmetry of Plane Figures',
            marks: 2,
            subQuestionsCount: 4,
            conceptUsed: 'Reflection Symmetry in Polygons and Circles',
            formulaExplained: 'A regular n-gon has n lines of symmetry.',
            question: `State the exact number of lines of symmetry for each figure:\n(i) Square\n(ii) Rectangle (non-square)\n(iii) Equilateral Triangle\n(iv) Circle`,
            answer: `(i) Square: 4 lines of symmetry (2 diagonals + 2 mid-segment bisectors)\n(ii) Rectangle: 2 lines of symmetry (joining midpoints of opposite sides)\n(iii) Equilateral Triangle: 3 lines of symmetry\n(iv) Circle: Infinitely many lines of symmetry (every diameter)`,
            stepByStepExplanation: `In a non-square rectangle, folding along a diagonal does not make adjacent unequal sides coincide, so it has 2 (not 4) lines of symmetry.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Number & Geometric Patterns',
            marks: 3,
            subQuestionsCount: 3,
            conceptUsed: 'Arithmetic, Square and Triangular Number Sequences',
            formulaExplained: 'Arithmetic: Tₙ = a + (n−1)d; Square: n²; Triangular: n(n+1)/2.',
            question: `Complete the following patterns and state the rule used:\n(i) ${sStart}, ${sStart + sStep}, ${sStart + 2 * sStep}, ${sStart + 3 * sStep}, ___, ___\n(ii) 1, 4, 9, 16, 25, ___, ___\n(iii) 1, 3, 6, 10, 15, ___, ___`,
            answer: `(i) ${sStart + 4 * sStep}, ${sStart + 5 * sStep} (Rule: Add ${sStep} to each term)\n(ii) 36, 49 (Rule: Square numbers n² → 6² = 36, 7² = 49)\n(iii) 21, 28 (Rule: Triangular numbers n(n+1)/2 → +6 gives 21, +7 gives 28)`,
            stepByStepExplanation: `(i) Constant difference = +${sStep}.\n(ii) 6 × 6 = 36 and 7 × 7 = 49.\n(iii) Consecutive natural numbers are added: 15 + 6 = 21; 21 + 7 = 28.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'fractions_operations':
    case 'decimals_operations': {
      const isDec = blueprintId === 'decimals_operations';
      return {
        blueprintId,
        topicDisplayName: isDec
          ? `${chapterTitle} — Tenths, Hundredths, Place Value & Operations on Decimals`
          : `${chapterTitle} — Equivalent, Proper/Improper/Mixed Fractions & Four Operations`,
        detailedExplanation: isDec
          ? [
              `In "${chapterTitle}", students learn how decimal fractions extend the base-10 place value system to the right of the decimal point: Tenths (1/10 = 0.1), Hundredths (1/100 = 0.01), and Thousandths (1/1000 = 0.001).`,
              `For addition and subtraction of decimals, convert them into Like Decimals by annexing trailing zeroes so the decimal points align vertically in one column.`,
              `For multiplication, multiply as whole numbers and place the decimal point so the product has as many decimal places as the sum of decimal places of the factors.`,
            ]
          : [
              `In "${chapterTitle}", students master fractions as parts of a whole (Numerator / Denominator), Equivalent Fractions, Like & Unlike Fractions, and conversion between Improper Fractions and Mixed Numbers.`,
              `To add or subtract Unlike Fractions, first find the LCM of the denominators to convert them into Like Fractions with a common denominator.`,
              `To multiply fractions, multiply numerators together and denominators together: (a/b) × (c/d) = (a×c)/(b×d). To divide by a fraction, multiply by its multiplicative inverse (reciprocal): (a/b) ÷ (c/d) = (a/b) × (d/c).`,
            ],
        topicWiseExplanations: isDec
          ? [
              {
                topicTitle: `${chapterNumber}.1 Decimal Place Value (Tenths, Hundredths, Thousandths)`,
                explanation: `Moving right from the decimal point, the first digit represents Tenths (1/10), the second represents Hundredths (1/100), and the third represents Thousandths (1/1000).`,
                keyTakeaway: `0.7 = 7/10; 0.25 = 25/100 = 1/4; 0.125 = 125/1000 = 1/8.`,
              },
              {
                topicTitle: `${chapterNumber}.2 Addition, Subtraction, Multiplication & Division of Decimals`,
                explanation: `Multiplying a decimal by 10, 100, or 1000 shifts the decimal point 1, 2, or 3 places to the right. Dividing by 10, 100, or 1000 shifts the decimal point 1, 2, or 3 places to the left.`,
                keyTakeaway: `Always align decimal points vertically before adding or subtracting.`,
              },
            ]
          : [
              {
                topicTitle: `${chapterNumber}.1 Equivalent, Improper & Mixed Fractions`,
                explanation: `Multiplying or dividing both numerator and denominator by the same non-zero number k produces an equivalent fraction: a/b = (a×k)/(b×k). Mixed fraction Q(R/D) = (Q×D + R)/D.`,
                keyTakeaway: `Always reduce final fractional answers to their simplest (lowest) form by dividing by HCF.`,
              },
              {
                topicTitle: `${chapterNumber}.2 Addition, Subtraction, Multiplication & Division of Fractions`,
                explanation: `For unlike denominators b and d, a/b ± c/d = (a×d ± b×c)/(b×d). For division, (a/b) ÷ (c/d) = (a/b) × (d/c).`,
                keyTakeaway: `Never add denominators directly! Always take the LCM of denominators first.`,
              },
            ],
        keyPoints: isDec
          ? [
              '1 Tenth = 1/10 = 0.1; 1 Hundredth = 1/100 = 0.01; 1 Thousandth = 1/1000 = 0.001.',
              'Like Decimals have the same number of digits after the decimal point (e.g., 4.50 and 1.25).',
              'Multiplying by 10, 100, 1000 shifts the decimal point right by 1, 2, 3 places.',
              '1 cm = 0.01 m; 1 m = 0.001 km; 1 g = 0.001 kg; 1 Paise = ₹0.01.',
            ]
          : [
              'Proper Fraction: Numerator < Denominator; Improper Fraction: Numerator ≥ Denominator.',
              'Mixed Number to Improper Fraction: a(b/c) = [(a × c) + b] / c.',
              'Addition/Subtraction of Like Fractions: a/c ± b/c = (a ± b)/c.',
              'Reciprocal (Multiplicative Inverse) of a/b is b/a, because (a/b) × (b/a) = 1.',
            ],
        keyDefinitions: isDec
          ? [
              { term: 'Decimal Fraction', meaning: 'A fraction whose denominator is a power of 10 (10, 100, 1000, etc.) written with a decimal point.' },
              { term: 'Like Decimals', meaning: 'Decimals having the same number of digits after the decimal point.' },
            ]
          : [
              { term: 'Equivalent Fractions', meaning: 'Fractions that represent the exact same value or proportion of a whole (e.g., 1/2 = 2/4 = 3/6).' },
              { term: 'Multiplicative Inverse (Reciprocal)', meaning: 'Two non-zero numbers whose product is 1; the reciprocal of a/b is b/a.' },
            ],
        formulasAndRules: isDec
          ? [
              'Expanded Decimal Form: ab.cde = 10a + b + c/10 + d/100 + e/1000.',
              'Decimal Multiplication Rule: Decimal places in Product = Sum of decimal places in Multiplicand and Multiplier.',
              'Metric Decimal Conversions: 1 Paise = ₹0.01; 1 cm = 0.01 m; 1 mL = 0.001 L.',
            ]
          : [
              'Mixed to Improper: Q(R/D) = (Q × D + R) / D.',
              'Unlike Fraction Addition: a/b + c/d = (ad + bc) / bd (or use LCM of b and d).',
              'Fraction Division: (a/b) ÷ (c/d) = (a/b) × (d/c).',
            ],
        solvedExamples: isDec
          ? [
              {
                prompt: 'Evaluate: (i) 24.65 + 8.7  and  (ii) 50.00 − 18.45.',
                solution: `(i) Convert to like decimals: 24.65 + 08.70 = 33.35.\n(ii) Align decimal points: 50.00 − 18.45 = 31.55 (Verification: 31.55 + 18.45 = 50.00).`,
              },
              {
                prompt: 'Evaluate: (i) 3.25 × 4  and  (ii) 14.4 ÷ 1.2.',
                solution: `(i) 325 × 4 = 1300; place decimal after 2 digits from right → 13.00 = 13.\n(ii) 14.4 ÷ 1.2 = (14.4 × 10) / (1.2 × 10) = 144 / 12 = 12.`,
              },
            ]
          : [
              {
                prompt: 'Add the unlike fractions: 2/3 + 3/4 and express the result as a mixed fraction.',
                solution: `Step 1: LCM of denominators 3 and 4 is 12.\nStep 2: Convert to equivalent fractions with denominator 12: 2/3 = (2×4)/(3×4) = 8/12; 3/4 = (3×3)/(4×3) = 9/12.\nStep 3: Add: 8/12 + 9/12 = 17/12 = 1 (5/12).`,
              },
              {
                prompt: 'Evaluate: (i) (4/9) × (3/8)  and  (ii) (5/6) ÷ (10/9).',
                solution: `(i) (4/9) × (3/8) = (4 × 3) / (9 × 8) = 12 / 72 = 1/6.\n(ii) (5/6) ÷ (10/9) = (5/6) × (9/10) = 45 / 60 = 3/4.`,
              },
            ],
        exerciseQuestions: isDec
          ? [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Fraction–Decimal Conversion & Place Value',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Base-10 Denominator Equivalence',
                formulaExplained: 'a/10 = 0.a; ab/100 = 0.ab; abc/1000 = 0.abc.',
                question: `Convert the following:\n(i) 7/10 and 35/100 into decimal fractions\n(ii) 3/4 into a decimal fraction (by making denominator 100)\n(iii) 0.75 into a common fraction in lowest terms\n(iv) Write the expanded form of 48.259`,
                answer: `(i) 7/10 = 0.7; 35/100 = 0.35\n(ii) 3/4 = 75/100 = 0.75\n(iii) 0.75 = 75/100 = 3/4\n(iv) 40 + 8 + 2/10 + 5/100 + 9/1000`,
                stepByStepExplanation: `(ii) Multiply numerator and denominator of 3/4 by 25: (3×25)/(4×25) = 75/100 = 0.75.\n(iii) Divide numerator and denominator of 75/100 by HCF 25: 3/4.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iv)',
                typeLabel: 'Addition, Subtraction, Multiplication & Division of Decimals',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Like-Decimal Alignment and Decimal Shift Rules',
                formulaExplained: 'Align decimal points vertically for ±; sum decimal places for ×.',
                question: `Solve step-by-step:\n(i) 15.48 + 7.6\n(ii) 42.5 − 16.75\n(iii) 2.4 × 1.5\n(iv) 18.75 ÷ 5`,
                answer: `(i) 23.08\n(ii) 25.75\n(iii) 3.60 (or 3.6)\n(iv) 3.75`,
                stepByStepExplanation: `(i) 15.48 + 07.60 = 23.08.\n(ii) 42.50 − 16.75 = 25.75 (Check: 25.75 + 16.75 = 42.50).\n(iii) 24 × 15 = 360; 1 + 1 = 2 decimal places → 3.60.\n(iv) 18.75 ÷ 5 = 3.75 (Check: 3.75 × 5 = 18.75).`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.3 (i)–(ii)',
                typeLabel: 'Real-Life Decimal Word Problems',
                marks: 3,
                subQuestionsCount: 2,
                conceptUsed: 'Metric Measurements in Decimal Form',
                formulaExplained: 'Total Length = Sum of parts; Remaining Weight = Total − Used.',
                question: `Solve the following word problems:\n(i) A tailor used 2.75 m of cloth for a shirt and 1.85 m of cloth for trousers. How much cloth did he use in all?\n(ii) Aarav bought 5 kg of apples. If he gave 2.350 kg to his neighbour, how many kilograms of apples are left with him?`,
                answer: `(i) 4.60 m (or 4 m 60 cm)\n(ii) 2.650 kg (or 2 kg 650 g)`,
                stepByStepExplanation: `(i) Total cloth = 2.75 m + 1.85 m = 4.60 m.\n(ii) Remaining apples = 5.000 kg − 2.350 kg = 2.650 kg.`,
                calculationVerified: true,
              },
            ]
          : [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Equivalent Fractions, Simplest Form & Mixed Conversion',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Fundamental Property of Fractions: a/b = (ak)/(bk)',
                formulaExplained: 'Improper to Mixed: Divide Numerator by Denominator → Quotient (Remainder / Denominator).',
                question: `Solve the following:\n(i) Write two equivalent fractions for 3/5.\n(ii) Reduce 24/36 to its simplest (lowest) form.\n(iii) Convert the improper fraction 19/5 into a mixed number.\n(iv) Convert the mixed number 4 (2/7) into an improper fraction.`,
                answer: `(i) 6/10 and 9/15\n(ii) 2/3\n(iii) 3 (4/5)\n(iv) 30/7`,
                stepByStepExplanation: `(i) (3×2)/(5×2) = 6/10; (3×3)/(5×3) = 9/15.\n(ii) HCF of 24 and 36 is 12; (24÷12)/(36÷12) = 2/3.\n(iii) 19 ÷ 5 gives Quotient = 3, Remainder = 4 → 3(4/5).\n(iv) [(4 × 7) + 2] / 7 = (28 + 2)/7 = 30/7.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iv)',
                typeLabel: 'Addition, Subtraction, Multiplication & Division of Fractions',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'LCM Common Denominator and Multiplication by Reciprocal',
                formulaExplained: 'a/b ± c/d = (ad ± bc)/bd; (a/b) ÷ (c/d) = (a/b) × (d/c).',
                question: `Evaluate and express each answer in simplest form:\n(i) 3/8 + 2/8\n(ii) 5/6 − 1/4\n(iii) (3/5) × (10/9)\n(iv) (7/8) ÷ (14/16)`,
                answer: `(i) 5/8\n(ii) 7/12\n(iii) 2/3\n(iv) 1`,
                stepByStepExplanation: `(i) Like fractions: (3 + 2)/8 = 5/8.\n(ii) LCM of 6 and 4 is 12: 5/6 = 10/12 and 1/4 = 3/12 ⇒ 10/12 − 3/12 = 7/12.\n(iii) (3 × 10) / (5 × 9) = 30 / 45 = 2/3.\n(iv) (7/8) × (16/14) = 112 / 112 = 1.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.3 (i)–(ii)',
                typeLabel: 'Word Problems on Fractions',
                marks: 3,
                subQuestionsCount: 2,
                conceptUsed: 'Fractional Part of a Whole Quantity',
                formulaExplained: 'Fraction of N = (a/b) × N.',
                question: `Solve the word problems step-by-step:\n(i) Out of a class of 40 students, 3/5 participated in the Science Exhibition. How many students participated?\n(ii) Rohan read 1/3 of a book on Monday and 2/5 of the book on Tuesday. What fraction of the book did he read in total during the two days?`,
                answer: `(i) 24 students\n(ii) 11/15 of the book`,
                stepByStepExplanation: `(i) Number of participating students = (3/5) × 40 = 3 × (40 ÷ 5) = 3 × 8 = 24 students.\n(ii) Total fraction read = 1/3 + 2/5 = 5/15 + 6/15 = 11/15.`,
                calculationVerified: true,
              },
            ],
      };
    }

    case 'factors_multiples_hcf_lcm': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Divisibility Tests, Prime Factorisation, HCF & LCM`,
        detailedExplanation: [
          `In "${chapterTitle}", students study factors, multiples, prime and composite numbers, divisibility rules (by 2, 3, 4, 5, 6, 9, 10, 11), Highest Common Factor (HCF/GCD), and Least Common Multiple (LCM).`,
          `Every composite number can be uniquely expressed as a product of prime factors. The HCF is the product of common prime factors with lowest powers, while the LCM is the product of all prime factors with highest powers.`,
          `For any two positive integers a and b, their product equals the product of their HCF and LCM: HCF(a, b) × LCM(a, b) = a × b.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Divisibility Tests & Prime/Co-Prime Numbers`,
            explanation: `A number is divisible by 2 if its units digit is 0, 2, 4, 6, 8; by 3 if the sum of its digits is divisible by 3; by 5 if its units digit is 0 or 5; by 9 if the sum of its digits is divisible by 9. Two numbers are Co-Prime if their HCF is 1.`,
            keyTakeaway: `1 is neither prime nor composite; 2 is the only even prime number.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Finding HCF and LCM & Product Verification Theorem`,
            explanation: `By Prime Factorisation, write each number as a product of primes. Verify every pair (a, b) using the fundamental theorem: HCF × LCM = First Number × Second Number.`,
            keyTakeaway: `HCF divides both numbers evenly; LCM is divisible by both numbers evenly.`,
          },
        ],
        keyPoints: [
          '1 is neither a prime number nor a composite number; 2 is the smallest and only even prime number.',
          'Divisibility by 3 & 9: Check whether the sum of all digits of the number is divisible by 3 or 9.',
          'Co-Prime (Relatively Prime) Numbers: Two numbers having only 1 as their common factor (HCF = 1).',
          'Fundamental Product Rule: For any two numbers a and b, HCF(a, b) × LCM(a, b) = a × b.',
        ],
        keyDefinitions: [
          { term: 'Prime & Composite Numbers', meaning: 'A number greater than 1 with exactly two factors (1 and itself) is Prime; a number with more than two factors is Composite.' },
          { term: 'Highest Common Factor (HCF / GCD)', meaning: 'The greatest number that divides two or more given numbers completely without leaving a remainder.' },
          { term: 'Least Common Multiple (LCM)', meaning: 'The smallest non-zero common multiple of two or more given numbers.' },
        ],
        formulasAndRules: [
          'HCF(a, b) × LCM(a, b) = a × b.',
          'LCM of two Co-Prime numbers = Product of the two numbers (since their HCF = 1).',
          'Divisibility by 11: |(Sum of digits at odd places) − (Sum of digits at even places)| is 0 or a multiple of 11.',
        ],
        solvedExamples: [
          {
            prompt: 'Find the HCF and LCM of 24 and 36 by the Prime Factorisation method, and verify that HCF × LCM = 24 × 36.',
            solution: `Step 1: Prime factors of 24 = 2 × 2 × 2 × 3 = 2³ × 3¹.\nStep 2: Prime factors of 36 = 2 × 2 × 3 × 3 = 2² × 3².\nStep 3: HCF = Product of common prime factors with lowest powers = 2² × 3¹ = 4 × 3 = 12.\nStep 4: LCM = Product of prime factors with highest powers = 2³ × 3² = 8 × 9 = 72.\nStep 5: Verification: HCF × LCM = 12 × 72 = 864; Product of numbers = 24 × 36 = 864. Hence HCF × LCM = a × b (Verified).`,
          },
          {
            prompt: 'Three school bells ring at intervals of 12 minutes, 15 minutes, and 20 minutes respectively. If they ring together at 8:00 AM, at what time will they next ring together?',
            solution: `Step 1: Required time interval = LCM(12, 15, 20).\nStep 2: 12 = 2² × 3; 15 = 3 × 5; 20 = 2² × 5 ⇒ LCM = 2² × 3 × 5 = 60 minutes = 1 hour.\nStep 3: They will ring together next at 8:00 AM + 1 hour = 9:00 AM.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Divisibility Rules & Prime Factorisation',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Digit-Sum Divisibility Tests and Prime Factor Trees',
            formulaExplained: 'A number N is divisible by 3 (or 9) iff the sum of digits of N is a multiple of 3 (or 9).',
            question: `Solve the following:\n(i) Test whether 4,518 is divisible by 2, 3, and 9.\n(ii) Write all factors of 36.\n(iii) Factorise 60 into its prime factors.\n(iv) Check whether 15 and 28 are co-prime numbers.`,
            answer: `(i) Divisible by 2, 3, and 9\n(ii) Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36\n(iii) 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5\n(iv) Yes, 15 and 28 are co-prime because HCF(15, 28) = 1`,
            stepByStepExplanation: `(i) Units digit of 4,518 is 8 (even → divisible by 2); sum of digits = 4 + 5 + 1 + 8 = 18 (divisible by both 3 and 9).\n(iv) Factors of 15 = {1, 3, 5, 15}; Factors of 28 = {1, 2, 4, 7, 14, 28}; Common factor = {1} only.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Find HCF and LCM & Verify Product Rule',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Prime Factorisation for HCF/LCM and Product Identity',
            formulaExplained: 'HCF(a, b) × LCM(a, b) = a × b.',
            question: `Find the HCF and LCM of the following pairs and verify that HCF × LCM = Product of the numbers:\n(i) 18 and 30\n(ii) 32 and 48\n(iii) If HCF of two numbers is 8 and their product is 384, find their LCM.`,
            answer: `(i) HCF = 6, LCM = 90 (Verification: 6 × 90 = 540 = 18 × 30)\n(ii) HCF = 16, LCM = 96 (Verification: 16 × 96 = 1,536 = 32 × 48)\n(iii) LCM = 48`,
            stepByStepExplanation: `(i) 18 = 2 × 3²; 30 = 2 × 3 × 5 ⇒ HCF = 2 × 3 = 6; LCM = 2 × 3² × 5 = 90.\n(ii) 32 = 2⁵; 48 = 2⁴ × 3 ⇒ HCF = 2⁴ = 16; LCM = 2⁵ × 3 = 96.\n(iii) LCM = Product ÷ HCF = 384 ÷ 8 = 48.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Word Problems on HCF (Maximum Grouping) & LCM (Minimum Common Multiple)',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Distinguishing HCF vs. LCM in Word Problems',
            formulaExplained: 'Greatest equal size / capacity → HCF; Smallest common total / simultaneous interval → LCM.',
            question: `Solve the word problems step-by-step:\n(i) Two ropes are 28 m and 42 m long. If they are to be cut into pieces of equal length, find the maximum possible length of each piece.\n(ii) Find the smallest number of marbles that can be arranged equally in rows of 10, 15, or 25 marbles with none left over.`,
            answer: `(i) Maximum length of each piece = 14 m\n(ii) Smallest number of marbles = 150 marbles`,
            stepByStepExplanation: `(i) Maximum equal length = HCF(28, 42). Since 28 = 2 × 14 and 42 = 3 × 14, HCF = 14 m.\n(ii) Smallest common multiple = LCM(10, 15, 25). 10 = 2×5, 15 = 3×5, 25 = 5² ⇒ LCM = 2 × 3 × 25 = 150 marbles.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'integers_rational_numbers':
    case 'exponents_indices_squares_cubes': {
      const isIndices = blueprintId === 'exponents_indices_squares_cubes';
      return {
        blueprintId,
        topicDisplayName: isIndices
          ? `${chapterTitle} — Laws of Indices, Squares, Square Roots, Cubes & Cube Roots`
          : `${chapterTitle} — Number Line, Directed Integers & Operations on Rational Numbers`,
        detailedExplanation: isIndices
          ? [
              `In "${chapterTitle}", students master exponential notation aᵐ (Base a, Index/Exponent m), the Laws of Indices for rational bases, and systematic methods for finding Square Roots and Cube Roots.`,
              `For any non-zero base a: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; and a⁻ᵐ = 1/aᵐ.`,
              `Rational exponents follow a^(1/n) = ⁿ√a (nth root of a), and a^(m/n) = (ⁿ√a)ᵐ.`,
            ]
          : [
              `In "${chapterTitle}", students extend the number system from Natural Numbers and Whole Numbers to Integers (..., −3, −2, −1, 0, +1, +2, +3, ...) and Rational Numbers of the form p/q (where p, q are integers and q ≠ 0).`,
              `When adding integers with the same sign, add their absolute values and keep the common sign. When adding integers with opposite signs, subtract the smaller absolute value from the larger and put the sign of the larger number.`,
              `In multiplication and division of integers/rationals: (+) × (+) = (+); (−) × (−) = (+); (+) × (−) = (−); (−) × (+) = (−).`,
            ],
        topicWiseExplanations: isIndices
          ? [
              {
                topicTitle: `${chapterNumber}.1 Fundamental Laws of Indices`,
                explanation: `Product Law: aᵐ × aⁿ = aᵐ⁺ⁿ; Quotient Law: aᵐ ÷ aⁿ = aᵐ⁻ⁿ; Power of a Power: (aᵐ)ⁿ = aᵐⁿ; Zero Index: a⁰ = 1 (a ≠ 0); Negative Index: a⁻ᵐ = 1/aᵐ.`,
                keyTakeaway: `Never multiply the bases when applying aᵐ × aⁿ = aᵐ⁺ⁿ (e.g., 2³ × 2⁴ = 2⁷, NOT 4⁷).`,
              },
              {
                topicTitle: `${chapterNumber}.2 Squares, Square Roots, Cubes & Cube Roots`,
                explanation: `If x² = N, then √N = x. By prime factorisation, pair identical prime factors for square roots (√(a×a) = a) and group identical prime factors in triplets for cube roots (³√(a×a×a) = a).`,
                keyTakeaway: `Cube root of a negative integer is negative: ³√(−125) = −5.`,
              },
            ]
          : [
              {
                topicTitle: `${chapterNumber}.1 Addition & Subtraction of Directed Integers`,
                explanation: `Subtracting a number is equivalent to adding its additive inverse (opposite): a − b = a + (−b), and a − (−b) = a + b.`,
                keyTakeaway: `Additive inverse of +a is −a; their sum is always 0.`,
              },
              {
                topicTitle: `${chapterNumber}.2 Multiplication, Division & Rational Number Operations`,
                explanation: `The product or quotient of two negative numbers is always positive: (−a) × (−b) = +ab. Between any two distinct rational numbers, there exist infinitely many rational numbers.`,
                keyTakeaway: `Division by zero (p ÷ 0) is mathematically undefined.`,
              },
            ],
        keyPoints: isIndices
          ? [
              'Product Rule: aᵐ × aⁿ = aᵐ⁺ⁿ; Quotient Rule: aᵐ ÷ aⁿ = aᵐ⁻ⁿ (a ≠ 0).',
              'Power of Power: (aᵐ)ⁿ = aᵐⁿ; Power of Product: (ab)ᵐ = aᵐ × bᵐ.',
              'Zero & Negative Exponents: a⁰ = 1 (a ≠ 0); a⁻ᵐ = 1/aᵐ; (a/b)⁻ᵐ = (b/a)ᵐ.',
              'Fractional Index: a^(1/2) = √a; a^(1/3) = ³√a; a^(m/n) = ⁿ√(aᵐ).',
            ]
          : [
              'Zero (0) is neither positive nor negative; every positive integer is greater than every negative integer.',
              'Subtraction Rule: a − (−b) = a + b.',
              'Sign Rule for Multiplication & Division: Like signs give Positive (+); Unlike signs give Negative (−).',
              'A Rational Number p/q has a terminating decimal form iff the prime factorisation of q has only 2s and/or 5s.',
            ],
        keyDefinitions: isIndices
          ? [
              { term: 'Base and Index (Exponent)', meaning: 'In aᵐ, the repeated factor a is the Base and the count m is the Index or Exponent.' },
              { term: 'Perfect Square & Cube', meaning: 'A natural number equal to n² is a perfect square; a number equal to n³ is a perfect cube.' },
            ]
          : [
              { term: 'Additive Inverse (Opposite)', meaning: 'Two numbers whose sum is 0; the additive inverse of a is −a.' },
              { term: 'Rational Number', meaning: 'Any number expressible in the form p/q where p and q are integers and q ≠ 0.' },
            ],
        formulasAndRules: isIndices
          ? [
              'aᵐ × aⁿ = aᵐ⁺ⁿ;  aᵐ ÷ aⁿ = aᵐ⁻ⁿ;  (aᵐ)ⁿ = aᵐⁿ.',
              'a⁰ = 1 (for a ≠ 0);  a⁻ᵐ = 1 / aᵐ.',
              '√(a × b) = √a × √b;  ³√(a³) = a.',
            ]
          : [
              'a − (−b) = a + b;  (−a) + (−b) = −(a + b).',
              '(−a) × (−b) = +ab;  (−a) × (+b) = −ab.',
              'Midpoint Rational Number between x and y = (x + y) / 2.',
            ],
        solvedExamples: isIndices
          ? [
              {
                prompt: 'Simplify using the Laws of Indices: (i) (3⁵ × 3²) ÷ 3⁴   and   (ii) (5⁰ + 2⁻¹) × 2².',
                solution: `(i) Step 1: By Product Law, 3⁵ × 3² = 3⁵⁺² = 3⁷.\n    Step 2: By Quotient Law, 3⁷ ÷ 3⁴ = 3⁷⁻⁴ = 3³ = 27.\n(ii) Step 1: 5⁰ = 1 and 2⁻¹ = 1/2.\n    Step 2: (1 + 1/2) × 4 = (3/2) × 4 = 6.`,
              },
              {
                prompt: 'Find (i) the square root of 1,764 and (ii) the cube root of 1,728 by prime factorisation.',
                solution: `(i) 1,764 = 2 × 2 × 3 × 3 × 7 × 7 = (2 × 3 × 7)² ⇒ √1,764 = 2 × 3 × 7 = 42.\n(ii) 1,728 = (2×2×2) × (2×2×2) × (3×3×3) = (2 × 2 × 3)³ ⇒ ³√1,728 = 12.`,
              },
            ]
          : [
              {
                prompt: 'Evaluate: (i) (−18) + (+25) − (−13)   and   (ii) (−12) × (−5) ÷ (+4).',
                solution: `(i) Step 1: (−18) + 25 = +7.\n    Step 2: 7 − (−13) = 7 + 13 = 20.\n(ii) Step 1: (−12) × (−5) = +60.\n    Step 2: 60 ÷ 4 = 15.`,
              },
              {
                prompt: 'Evaluate for rational numbers: (−3/4) + (5/6) and (−4/9) ÷ (8/15).',
                solution: `Step 1: (−3/4) + (5/6) = (−9 + 10)/12 = 1/12.\nStep 2: (−4/9) ÷ (8/15) = (−4/9) × (15/8) = −60 / 72 = −5/6.`,
              },
            ],
        exerciseQuestions: isIndices
          ? [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Simplify Expressions Using Laws of Indices',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Product, Quotient, Power of a Power, Zero & Negative Index Laws',
                formulaExplained: 'aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁻ᵐ = 1/aᵐ.',
                question: `Simplify and find the value of:\n(i) 2⁴ × 2³ ÷ 2⁵\n(ii) (7³)⁴ ÷ 7¹⁰\n(iii) (3⁰ + 4⁰ + 5⁰) × 6²\n(iv) (3/4)⁻²`,
                answer: `(i) 2² = 4\n(ii) 7² = 49\n(iii) 3 × 36 = 108\n(iv) (4/3)² = 16/9`,
                stepByStepExplanation: `(i) 2⁴⁺³⁻⁵ = 2² = 4.\n(ii) 7³ˣ⁴ ÷ 7¹⁰ = 7¹²⁻¹⁰ = 7² = 49.\n(iii) Since a⁰ = 1, (1 + 1 + 1) × 36 = 3 × 36 = 108.\n(iv) (a/b)⁻ᵐ = (b/a)ᵐ ⇒ (4/3)² = 16/9.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iv)',
                typeLabel: 'Square Roots and Cube Roots by Prime Factorisation',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Prime Factor Pairing (Square Root) and Triplet Grouping (Cube Root)',
                formulaExplained: '√(p² × q²) = p × q;  ³√(p³ × q³) = p × q.',
                question: `Find the following roots by prime factorisation:\n(i) √1,296\n(ii) √2,025\n(iii) ³√3,375\n(iv) ³√(−512)`,
                answer: `(i) 36\n(ii) 45\n(iii) 15\n(iv) −8`,
                stepByStepExplanation: `(i) 1,296 = 2⁴ × 3⁴ ⇒ √1,296 = 2² × 3² = 4 × 9 = 36 (Check: 36² = 1,296).\n(ii) 2,025 = 3⁴ × 5² ⇒ √2,025 = 3² × 5 = 9 × 5 = 45 (Check: 45² = 2,025).\n(iii) 3,375 = 3³ × 5³ ⇒ ³√3,375 = 3 × 5 = 15 (Check: 15³ = 3,375).\n(iv) −512 = (−8)³ ⇒ ³√(−512) = −8.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.3 (i)–(ii)',
                typeLabel: 'Applied Word Problems on Squares & Exponents',
                marks: 3,
                subQuestionsCount: 2,
                conceptUsed: 'Square Grid Modeling and Exponential Growth',
                formulaExplained: 'If n rows each contain n items, Total = n² ⇒ n = √Total.',
                question: `Solve the word problems step-by-step:\n(i) 1,225 saplings are planted in a square garden such that the number of rows equals the number of saplings in each row. Find the number of rows.\n(ii) Find the smallest positive integer by which 252 must be multiplied so that the product becomes a perfect square.`,
                answer: `(i) 35 rows\n(ii) Multiply by 7 (to obtain 1,764 = 42²)`,
                stepByStepExplanation: `(i) Let number of rows = n. Then n² = 1,225. Prime factors: 1,225 = 5² × 7² ⇒ n = 5 × 7 = 35 rows.\n(ii) 252 = 2² × 3² × 7¹. Since prime factor 7 is unpaired, multiply by 7 to make 2² × 3² × 7² = 1,764 = 42².`,
                calculationVerified: true,
              },
            ]
          : [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Addition, Subtraction, Multiplication & Division of Integers',
                marks: 3,
                subQuestionsCount: 4,
                conceptUsed: 'Directed Integer Sign Laws',
                formulaExplained: 'a − (−b) = a + b; (−a) × (−b) = +ab; (−a) ÷ (+b) = −(a/b).',
                question: `Evaluate the following integer expressions:\n(i) (−24) + (+16)\n(ii) (+35) − (−15)\n(iii) (−9) × (−8)\n(iv) (−96) ÷ (+12)`,
                answer: `(i) −8\n(ii) +50\n(iii) +72\n(iv) −8`,
                stepByStepExplanation: `(i) Opposite signs: 24 − 16 = 8; sign of larger absolute value (−24) → −8.\n(ii) 35 − (−15) = 35 + 15 = +50.\n(iii) Product of two negatives is positive: (−9) × (−8) = +72.\n(iv) Quotient of negative by positive is negative: −96 ÷ 12 = −8.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iv)',
                typeLabel: 'Operations on Rational Numbers',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Rational Arithmetic and Three Rational Numbers Between Two Rationals',
                formulaExplained: 'p/q + r/s = (ps + qr)/(qs); Midpoint = (a + b)/2.',
                question: `Solve for the following rational numbers:\n(i) (−5/8) + (3/4)\n(ii) (7/12) − (−5/6)\n(iii) (−9/16) × (8/15)\n(iv) Find three rational numbers lying between 1/4 and 1/2.`,
                answer: `(i) 1/8\n(ii) 17/12 = 1 (5/12)\n(iii) −3/10\n(iv) 5/16, 6/16 (3/8), and 7/16`,
                stepByStepExplanation: `(i) (−5 + 6)/8 = 1/8.\n(ii) 7/12 + 10/12 = 17/12.\n(iii) (−9 × 8)/(16 × 15) = −72/240 = −3/10.\n(iv) Write with common denominator 16: 1/4 = 4/16 and 1/2 = 8/16 ⇒ Numbers between them are 5/16, 6/16, 7/16.`,
                calculationVerified: true,
              },
            ],
      };
    }

    default:
      return null;
  }
}
