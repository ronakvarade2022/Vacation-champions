import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { CBSE_CURRICULUM_BY_CLASS } from '../boards/cbseCurriculumConfig';
import { getPart1SubjectQuestions, RawQuizSpec } from './subject40BankPart1';
import { getPart2SubjectQuestions } from './subject40BankPart2';
import { getPart3SubjectQuestions } from './subject40BankPart3';
import { getPart4SubjectQuestions } from './subject40BankPart4';

const NCERT_BOOK_TAG: Record<number, string> = {
  1: 'NCERT Joyful Foundation',
  2: 'NCERT Foundational Stage',
  3: 'NCERT Preparatory Stage',
  4: 'NCERT Santoor & Maths Mela',
  5: 'NCERT Upper Preparatory',
  6: 'NCERT Ganita Prakash & Curiosity',
  7: 'NCERT Middle School',
  8: 'NCERT Pre-Secondary',
  9: 'NCERT Secondary IX',
  10: 'CBSE Board AISSE X'
};

function clsNum(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 4;
}

function lookupMasterSubjectSpecs(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  if (subject === 'Computer Knowledge' && c <= 5) {
    return getPart4SubjectQuestions(classLevel, 'Computer Studies', level) || [];
  }
  if (subject === 'Science' && c <= 2) {
    return (
      getPart2SubjectQuestions(classLevel, 'Environmental Studies', level) ||
      getPart1SubjectQuestions(classLevel, 'Science', level) ||
      []
    );
  }
  return (
    getPart1SubjectQuestions(classLevel, subject, level) ||
    getPart2SubjectQuestions(classLevel, subject, level) ||
    getPart3SubjectQuestions(classLevel, subject, level) ||
    getPart4SubjectQuestions(classLevel, subject, level) ||
    []
  );
}

function contextualizeCbseSpecs(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel,
  rawSpecs: RawQuizSpec[]
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const ctx = NCERT_BOOK_TAG[c];
  const boardChapters = CBSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject] || [];

  return rawSpecs.slice(0, 10).map((spec, idx) => {
    const chapterName =
      boardChapters.length > 0 ? boardChapters[(level - 1 + idx) % boardChapters.length] : spec.topic;
    const baseText = spec.text.trim();
    const lower = baseText.toLowerCase();
    const hasClass = lower.includes(`class ${c}`) || lower.includes(`grade ${c}`);
    const hasSubject = lower.includes(subject.toLowerCase());
    const text =
      hasClass && hasSubject
        ? baseText
        : `[${ctx} • ${classLevel} ${subject}] ${baseText}`;

    return {
      ...spec,
      text,
      topic: spec.topic || chapterName
    };
  });
}

function makeMathSpecs(c: number, level: QuizLevel): RawQuizSpec[] {
  const ctx = NCERT_BOOK_TAG[c];
  const base = c * 17 + level * 11;

  if (c <= 2) {
    const a = c * 11 + level * 3;
    const b = c * 5 + level * 2;
    const prod = (c + level + 1) * (level + 2);
    const tens = c + level + 1;
    const ones = ((level * 2 + c) % 9) + 1;
    const num2d = tens * 10 + ones;
    const step = c + level;
    const seqStart = c * 4 + level * 2;

    return [
      {
        text: `In ${ctx} Class ${c} number practice, add ${a} notebooks and ${b} notebooks kept on a shelf.`,
        options: [`${a + b - 2}`, `${a + b}`, `${a + b + 3}`, `${a + b + 5}`],
        correctIndex: 1,
        explanation: `${a} + ${b} = ${a + b}.`,
        topic: 'Two-Digit Addition'
      },
      {
        text: `Subtract ${b} pencils from ${a + b + 7} pencils in ${ctx} Class ${c} bundle counting.`,
        options: [`${a + 5}`, `${a + 7}`, `${a + 9}`, `${a + 11}`],
        correctIndex: 1,
        explanation: `${a + b + 7} − ${b} = ${a + 7}.`,
        topic: 'Subtraction With Bundles'
      },
      {
        text: `Which number is formed by ${tens} bundles of ten and ${ones} single sticks in ${ctx} Grade ${c}?`,
        options: [`${ones * 10 + tens}`, `${num2d}`, `${num2d + 10}`, `${tens + ones}`],
        correctIndex: 1,
        explanation: `${tens} tens (${tens * 10}) + ${ones} ones = ${num2d}.`,
        topic: 'Tens & Ones Place Value'
      },
      {
        text: `Continue the NCERT Class ${c} Level ${level} skip pattern: ${seqStart}, ${seqStart + step}, ${seqStart + step * 2}, ___`,
        options: [
          `${seqStart + step * 3 - 1}`,
          `${seqStart + step * 3}`,
          `${seqStart + step * 3 + 1}`,
          `${seqStart + step * 3 + 3}`
        ],
        correctIndex: 1,
        explanation: `Add ${step} each time: ${seqStart + step * 2} + ${step} = ${seqStart + step * 3}.`,
        topic: 'Skip Counting Sequences'
      },
      {
        text: `If ${c + level + 1} baskets hold ${level + 2} mangoes each in Class ${c} grouping, find the total mangoes.`,
        options: [`${prod - 3}`, `${prod}`, `${prod + 2}`, `${prod + 4}`],
        correctIndex: 1,
        explanation: `${c + level + 1} × ${level + 2} = ${prod} mangoes.`,
        topic: 'Equal Grouping'
      },
      {
        text: `Which number lies directly before ${num2d + 30} on a Class ${c} Level ${level} number strip?`,
        options: [`${num2d + 28}`, `${num2d + 29}`, `${num2d + 31}`, `${num2d + 32}`],
        correctIndex: 1,
        explanation: `The predecessor of ${num2d + 30} is ${num2d + 29}.`,
        topic: 'Before & After Numbers'
      },
      {
        text: `Compare amounts for CBSE Class ${c} Level ${level}: what is ₹${10 * c + 5} plus ₹${5 * level + 2}?`,
        options: [
          `₹${10 * c + 5 * level + 5}`,
          `₹${10 * c + 5 * level + 7}`,
          `₹${10 * c + 5 * level + 9}`,
          `₹${10 * c + 5 * level + 11}`
        ],
        correctIndex: 1,
        explanation: `Adding rupee notes: ₹${10 * c + 5} + ₹${5 * level + 2} = ₹${10 * c + 5 * level + 7}.`,
        topic: 'Currency Counting'
      },
      {
        text: `In Class ${c} Level ${level} shape sorting, a flat surface with ${level === 1 ? '3 sides' : level === 2 ? '4 equal sides' : level === 3 ? 'no corners and curved round boundary' : 'opposite sides equal and 4 right corners'} describes:`,
        options: [
          level === 1 ? 'Triangle' : level === 2 ? 'Square' : level === 3 ? 'Circle' : 'Rectangle',
          'Cube',
          'Cylinder',
          'Cone'
        ],
        correctIndex: 0,
        explanation: `Matching 2D geometric properties for Class ${c} Level ${level}.`,
        topic: 'Plane Shapes'
      },
      {
        text: `Out of the numbers ${num2d}, ${num2d + 14}, ${num2d - 5}, and ${num2d + 9} in Class ${c} Level ${level}, which is greatest?`,
        options: [`${num2d}`, `${num2d + 14}`, `${num2d - 5}`, `${num2d + 9}`],
        correctIndex: 1,
        explanation: `${num2d + 14} has the largest value.`,
        topic: 'Number Comparison'
      },
      {
        text: `Divide ${2 * (c + level + 3)} marbles equally between 2 classmates in CBSE Class ${c} Level ${level}. How many does each get?`,
        options: [`${c + level + 2}`, `${c + level + 3}`, `${c + level + 4}`, `${c + level + 5}`],
        correctIndex: 1,
        explanation: `${2 * (c + level + 3)} ÷ 2 = ${c + level + 3} marbles.`,
        topic: 'Halving Numbers'
      }
    ];
  }

  if (c <= 5) {
    const l = c * 3 + level * 2;
    const w = c * 2 + level;
    const perim = 2 * (l + w);
    const area = l * w;
    const x1 = c * 23 + level * 7;
    const x2 = c * 14 + level * 5;
    const multA = c * 8 + level * 3;
    const multB = level + 4;
    const fracDen = c + level + 5;
    const fracNum = level;

    return [
      {
        text: `For ${ctx} Class ${c} Level ${level}: a rectangular art board has length ${l} cm and width ${w} cm. Calculate its perimeter.`,
        options: [`${perim - 4} cm`, `${perim} cm`, `${perim + 6} cm`, `${area} cm`],
        correctIndex: 1,
        explanation: `Perimeter = 2 × (${l} + ${w}) = ${perim} cm.`,
        topic: 'Perimeter & Measurement'
      },
      {
        text: `Evaluate the area of a tiled rectangular floor measuring ${l} m by ${w} m in NCERT Class ${c} Level ${level}.`,
        options: [`${area - 6} m²`, `${area} m²`, `${area + 8} m²`, `${perim} m²`],
        correctIndex: 1,
        explanation: `Area = ${l} × ${w} = ${area} sq. metres.`,
        topic: 'Area Calculations'
      },
      {
        text: `Compute the sum ${x1 * 10} + ${x2 * 10} for CBSE Class ${c} Level ${level} place-value arithmetic.`,
        options: [
          `${(x1 + x2) * 10 - 20}`,
          `${(x1 + x2) * 10}`,
          `${(x1 + x2) * 10 + 30}`,
          `${(x1 + x2) * 10 + 100}`
        ],
        correctIndex: 1,
        explanation: `${x1 * 10} + ${x2 * 10} = ${(x1 + x2) * 10}.`,
        topic: 'Large Number Addition'
      },
      {
        text: `Multiply ${multA} by ${multB} in NCERT Maths Mela Class ${c} Level ${level}.`,
        options: [
          `${multA * multB - 8}`,
          `${multA * multB}`,
          `${multA * multB + 12}`,
          `${multA * multB + 24}`
        ],
        correctIndex: 1,
        explanation: `${multA} × ${multB} = ${multA * multB}.`,
        topic: 'Multiplication Algorithms'
      },
      {
        text: `In Class ${c} Level ${level} fractions, what fraction of ${fracDen} equal slices remain if ${fracNum} slices are eaten?`,
        options: [
          `${fracNum}/${fracDen}`,
          `${fracDen - fracNum}/${fracDen}`,
          `${fracDen - fracNum + 1}/${fracDen}`,
          `${fracDen - fracNum - 1}/${fracDen}`
        ],
        correctIndex: 1,
        explanation: `Remaining = ${fracDen} − ${fracNum} = ${fracDen - fracNum} out of ${fracDen}.`,
        topic: 'Parts and Wholes'
      },
      {
        text: `Convert ${c + level} metres and ${level * 15} centimetres entirely into centimetres for Class ${c} Level ${level}.`,
        options: [
          `${(c + level) * 10 + level * 15} cm`,
          `${(c + level) * 100 + level * 15} cm`,
          `${(c + level) * 1000 + level * 15} cm`,
          `${(c + level) * 50 + level * 15} cm`
        ],
        correctIndex: 1,
        explanation: `1 m = 100 cm, so ${c + level} m ${level * 15} cm = ${(c + level) * 100 + level * 15} cm.`,
        topic: 'Metric Conversion'
      },
      {
        text: `If ${(c + level + 4) * 6} library books are arranged equally on 6 racks in Class ${c} Level ${level}, how many fit on each rack?`,
        options: [`${c + level + 2}`, `${c + level + 4}`, `${c + level + 6}`, `${c + level + 8}`],
        correctIndex: 1,
        explanation: `${(c + level + 4) * 6} ÷ 6 = ${c + level + 4} books per rack.`,
        topic: 'Division & Quotients'
      },
      {
        text: `For Class ${c} Level ${level} Roman notation, identify the value of the symbol string ${level === 1 ? 'XIX' : level === 2 ? 'XXIV' : level === 3 ? 'XLII' : 'LXV'}:`,
        options: [
          `${level === 1 ? 19 : level === 2 ? 24 : level === 3 ? 42 : 65}`,
          `${level === 1 ? 21 : level === 2 ? 26 : level === 3 ? 62 : 45}`,
          `${level === 1 ? 14 : level === 2 ? 34 : level === 3 ? 52 : 75}`,
          `${level === 1 ? 29 : level === 2 ? 16 : level === 3 ? 38 : 55}`
        ],
        correctIndex: 0,
        explanation: `Standard Roman numeral decoding gives the exact Hindu-Arabic equivalent.`,
        topic: 'Roman Numerals'
      },
      {
        text: `Calculate the total cost of ${level + 2} geometry kits at ₹${c * 15 + 25} per kit in CBSE Class ${c} Level ${level}.`,
        options: [
          `₹${(level + 2) * (c * 15 + 25) - 20}`,
          `₹${(level + 2) * (c * 15 + 25)}`,
          `₹${(level + 2) * (c * 15 + 25) + 15}`,
          `₹${(level + 2) * (c * 15 + 25) + 30}`
        ],
        correctIndex: 1,
        explanation: `${level + 2} × ₹${c * 15 + 25} = ₹${(level + 2) * (c * 15 + 25)}.`,
        topic: 'Unitary Money Problems'
      },
      {
        text: `In Class ${c} Level ${level} angle classification, a corner opening of ${((c * 7 + level * 11) % 40) + 35}° is classified as:`,
        options: ['Obtuse angle', 'Acute angle', 'Right angle', 'Straight angle'],
        correctIndex: 1,
        explanation: `Every angle strictly between 0° and 90° is an acute angle.`,
        topic: 'Angles & Lines'
      }
    ];
  }

  if (c <= 8) {
    const xSol = c + level + 2;
    const coeff = level + 3;
    const cnst = c * 2 + 5;
    const rhs = coeff * xSol + cnst;
    const p1 = (c + 1) * 1000;
    const rRate = 5 + level * 2;
    const si2 = (p1 * rRate * 2) / 100;
    const rad = 7 * level;
    const circ = 2 * 22 * level;
    const baseNum = level + 2;
    const triA = ((c * 4 + level * 7) % 50) + 35;
    const triB = ((c * 3 + level * 5) % 40) + 30;
    const triC = 180 - triA - triB;
    const mBase = c + level * 3 + 8;

    return [
      {
        text: `In ${ctx} Class ${c} Level ${level}, solve the linear equation: ${coeff}x + ${cnst} = ${rhs}.`,
        options: [`x = ${xSol - 1}`, `x = ${xSol}`, `x = ${xSol + 2}`, `x = ${xSol + 3}`],
        correctIndex: 1,
        explanation: `${coeff}x = ${rhs - cnst} ⇒ x = ${xSol}.`,
        topic: 'Linear Equations'
      },
      {
        text: `Find the Simple Interest earned on ₹${p1} over 2 years at ${rRate}% p.a. (CBSE Class ${c} Level ${level}).`,
        options: [`₹${si2 - 100}`, `₹${si2}`, `₹${si2 + 120}`, `₹${si2 + 250}`],
        correctIndex: 1,
        explanation: `SI = (${p1} × ${rRate} × 2) / 100 = ₹${si2}.`,
        topic: 'Comparing Quantities'
      },
      {
        text: `Two interior angles of a triangle in NCERT Class ${c} Level ${level} measure ${triA}° and ${triB}°. Find the third angle.`,
        options: [`${triC - 5}°`, `${triC}°`, `${triC + 8}°`, `${triA + triB}°`],
        correctIndex: 1,
        explanation: `Sum of triangle angles is 180°: 180 − (${triA} + ${triB}) = ${triC}°.`,
        topic: 'Triangle Angle Sum'
      },
      {
        text: `Taking π = 22/7, determine the circumference of a circle of radius ${rad} cm in Class ${c} Level ${level}.`,
        options: [`${circ - 12} cm`, `${circ} cm`, `${circ + 14} cm`, `${circ * 2} cm`],
        correctIndex: 1,
        explanation: `C = 2 × (22/7) × ${rad} = ${circ} cm.`,
        topic: 'Mensuration Circles'
      },
      {
        text: `Evaluate the integer sum (−${c * 3 + level * 4}) + (+${c * 2 + level}) in CBSE Class ${c} Level ${level}.`,
        options: [
          `−${c + level * 3}`,
          `−${c + level * 3 + 4}`,
          `+${c + level * 3}`,
          `−${c * 5 + level * 5}`
        ],
        correctIndex: 0,
        explanation: `−${c * 3 + level * 4} + ${c * 2 + level} = −${c + level * 3}.`,
        topic: 'Integers Operations'
      },
      {
        text: `Simplify exponent expression in NCERT Class ${c} Level ${level}: ${baseNum}⁴ × ${baseNum}³ ÷ ${baseNum}⁵ =`,
        options: [`${baseNum}`, `${baseNum * baseNum}`, `${baseNum ** 3}`, `${baseNum * 2}`],
        correctIndex: 1,
        explanation: `${baseNum}^(4+3−5) = ${baseNum}² = ${baseNum * baseNum}.`,
        topic: 'Exponents and Powers'
      },
      {
        text: `Compute (${base + 6})² − (${base + 4})² using a² − b² identity (CBSE Class ${c} Level ${level}).`,
        options: [
          `${(2 * base + 10) * 2 - 4}`,
          `${(2 * base + 10) * 2}`,
          `${(2 * base + 10) * 2 + 8}`,
          `${base * 4}`
        ],
        correctIndex: 1,
        explanation: `(a+b)(a−b) = (${2 * base + 10}) × 2 = ${(2 * base + 10) * 2}.`,
        topic: 'Algebraic Identities'
      },
      {
        text: `A shopkeeper gives a ${level * 5}% discount on a Class ${c} NCERT textbook kit marked ₹${400 + c * 20}. Find the discount amount.`,
        options: [
          `₹${((400 + c * 20) * (level * 5)) / 100 - 5}`,
          `₹${((400 + c * 20) * (level * 5)) / 100}`,
          `₹${((400 + c * 20) * (level * 5)) / 100 + 10}`,
          `₹${((400 + c * 20) * (level * 5)) / 100 + 25}`
        ],
        correctIndex: 1,
        explanation: `Discount = ${level * 5}% of ₹${400 + c * 20} = ₹${((400 + c * 20) * (level * 5)) / 100}.`,
        topic: 'Percentage & Discount'
      },
      {
        text: `Find the Least Common Multiple (LCM) of ${6 * level} and ${9 * level} in Class ${c} Prime Time Level ${level}.`,
        options: [`${12 * level}`, `${18 * level}`, `${27 * level}`, `${36 * level}`],
        correctIndex: 1,
        explanation: `LCM(6k, 9k) = 18k → ${18 * level}.`,
        topic: 'Prime Time HCF & LCM'
      },
      {
        text: `What is the mean (average) of four test scores ${mBase}, ${mBase + 4}, ${mBase + 8}, and ${mBase + 12} in Class ${c} Level ${level}?`,
        options: [`${mBase + 4}`, `${mBase + 6}`, `${mBase + 8}`, `${mBase + 10}`],
        correctIndex: 1,
        explanation: `Sum = ${4 * mBase + 24}; dividing by 4 gives ${mBase + 6}.`,
        topic: 'Data Handling & Mean'
      }
    ];
  }

  // Class 9 & Class 10 CBSE Board Mathematics
  const k = c === 9 ? level : level + 4;
  const apFirst = 3 * k + 1;
  const apDiff = k + 2;
  const ap10th = apFirst + 9 * apDiff;
  const discB = 2 * k + 3;
  const discC = k;
  const disc = discB * discB - 4 * discC;
  const ptX = 3 * level;
  const ptY = 4 * level;
  const distOrigin = 5 * level;
  const polyVal = 2 * k * k - 3 * k + 5;
  const trigCoeff = 5 * (k + 1);

  return [
    {
      text: `In ${ctx} Level ${level}, evaluate p(${k}) for the polynomial p(x) = 2x² − 3x + 5.`,
      options: [`${polyVal - 3}`, `${polyVal}`, `${polyVal + 4}`, `${polyVal + 7}`],
      correctIndex: 1,
      explanation: `p(${k}) = 2(${k})² − 3(${k}) + 5 = ${polyVal}.`,
      topic: 'Polynomials'
    },
    {
      text: `For Class ${c} Level ${level} AP: find the 10th term of the Arithmetic Progression ${apFirst}, ${apFirst + apDiff}, ${apFirst + 2 * apDiff}, ...`,
      options: [`${ap10th - apDiff}`, `${ap10th}`, `${ap10th + apDiff}`, `${ap10th + 2}`],
      correctIndex: 1,
      explanation: `a₁₀ = ${apFirst} + 9(${apDiff}) = ${ap10th}.`,
      topic: 'Arithmetic Progressions'
    },
    {
      text: `Compute the discriminant (b² − 4ac) of the Class ${c} Level ${level} quadratic equation x² − ${discB}x + ${discC} = 0.`,
      options: [`${disc - 4}`, `${disc}`, `${disc + 4}`, `${disc + 8}`],
      correctIndex: 1,
      explanation: `Δ = (−${discB})² − 4(1)(${discC}) = ${disc}.`,
      topic: 'Quadratic Equations'
    },
    {
      text: `Calculate the Euclidean distance of Cartesian point (${ptX}, ${ptY}) from the origin (0, 0) in CBSE Class ${c} Level ${level}.`,
      options: [`${distOrigin - 2} units`, `${distOrigin} units`, `${distOrigin + 3} units`, `${ptX + ptY} units`],
      correctIndex: 1,
      explanation: `√(${ptX}² + ${ptY}²) = √(${ptX * ptX + ptY * ptY}) = ${distOrigin} units.`,
      topic: 'Coordinate Geometry'
    },
    {
      text: `A bag holds ${level + 3} red balls and ${level + 5} blue balls. Find probability of drawing a red ball in Class ${c} Level ${level}.`,
      options: [
        `${level + 3}/${2 * level + 8}`,
        `${level + 5}/${2 * level + 8}`,
        `1/${level + 3}`,
        `${level}/${level + 8}`
      ],
      correctIndex: 0,
      explanation: `Total balls = ${2 * level + 8}; favourable red = ${level + 3}.`,
      topic: 'Probability'
    },
    {
      text: `Evaluate ${trigCoeff} sec²A − ${trigCoeff} tan²A in Class ${c} Level ${level} CBSE Trigonometry.`,
      options: [`0`, `1`, `${trigCoeff}`, `${trigCoeff * 2}`],
      correctIndex: 2,
      explanation: `Since sec²A − tan²A = 1, ${trigCoeff}(1) = ${trigCoeff}.`,
      topic: 'Trigonometric Identities'
    },
    {
      text: `In Class ${c} Level ${level} Geometry, if a tangent from P to circle of radius ${3 * level} cm has length ${4 * level} cm, distance PO is:`,
      options: [`${5 * level - 1} cm`, `${5 * level} cm`, `${5 * level + 2} cm`, `${5 * level + 4} cm`],
      correctIndex: 1,
      explanation: `By Pythagoras theorem (radius ⊥ tangent), PO = √((3k)² + (4k)²) = 5k = ${5 * level} cm.`,
      topic: 'Circles & Tangents'
    },
    {
      text: `For a right circular cylinder of radius 7 cm and height ${c + level} cm (π = 22/7, Class ${c} Level ${level}), find volume in cm³.`,
      options: [
        `${154 * (c + level) - 22}`,
        `${154 * (c + level)}`,
        `${154 * (c + level) + 44}`,
        `${308 * (c + level)}`
      ],
      correctIndex: 1,
      explanation: `V = πr²h = (22/7) × 49 × ${c + level} = 154 × ${c + level} = ${154 * (c + level)} cm³.`,
      topic: 'Surface Areas & Volumes'
    },
    {
      text: `If the product of HCF and LCM of ${12 + k} and another integer n equals ${(12 + k) * (8 + k)} in Class ${c} Level ${level}, find n.`,
      options: [`${6 + k}`, `${8 + k}`, `${10 + k}`, `${12 + k}`],
      correctIndex: 1,
      explanation: `HCF × LCM = a × b ⇒ n = ${(12 + k) * (8 + k)} / ${12 + k} = ${8 + k}.`,
      topic: 'Real Numbers'
    },
    {
      text: `In similar triangles (ΔABC ~ ΔDEF, CBSE Class ${c} Level ${level}) with side ratio 2 : ${level + 2}, find perimeter ratio.`,
      options: [`4 : ${(level + 2) ** 2}`, `2 : ${level + 2}`, `1 : ${level + 4}`, `2 : 1`],
      correctIndex: 1,
      explanation: `Perimeter ratio of similar triangles equals their corresponding side ratio 2 : ${level + 2}.`,
      topic: 'Similar Triangles (BPT)'
    }
  ];
}

function makeScienceSpecs(classLevel: ClassLevel, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const ctx = NCERT_BOOK_TAG[c];

  // Primary classes (1 to 5) or Environmental Studies / Environmental Education -> use dedicated 40-question EVS / EnvEd / Science banks
  if (
    c <= 5 ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education' ||
    subject === 'Science' ||
    level >= 2
  ) {
    const raw = lookupMasterSubjectSpecs(classLevel, subject, level);
    return contextualizeCbseSpecs(classLevel, subject, level, raw);
  }

  // Level 1 custom NCERT Secondary Physics / Chemistry / Biology sets (strictly 100% subject-pure)
  const m = c * 2 + level;
  const acc = level + 2;
  const volts = 12 * level;
  const amps = c <= 8 ? 2 : 3;

  if (subject === 'Physics') {
    return [
      {
        text: `In ${ctx} Class ${c} Physics, compute the force required to accelerate a ${m} kg cart at ${acc} m/s².`,
        options: [`${m * acc} N`, `${m + acc} N`, `${Math.max(1, m - acc)} N`, `${m * acc * 2} N`],
        correctIndex: 0,
        explanation: `By Newton's Second Law, F = m × a = ${m} × ${acc} = ${m * acc} Newtons.`,
        topic: 'Laws of Motion'
      },
      {
        text: `A conductor in CBSE Class ${c} Physics carries ${amps} A current under ${volts} V potential difference. Calculate electrical resistance.`,
        options: [`${volts / amps} Ω`, `${volts * amps} Ω`, `${volts + amps} Ω`, `${volts / amps + 3} Ω`],
        correctIndex: 0,
        explanation: `Ohm's Law gives R = V / I = ${volts} / ${amps} = ${volts / amps} Ω.`,
        topic: 'Electricity & Ohm Law'
      },
      {
        text: `For Class ${c} Physics, find the kinetic energy of a 2 kg ball moving at ${level + 3} m/s.`,
        options: [`${(level + 3) ** 2} J`, `${2 * (level + 3)} J`, `${level + 5} J`, `${2 * (level + 3) ** 2} J`],
        correctIndex: 0,
        explanation: `KE = ½ × 2 × (${level + 3})² = ${(level + 3) ** 2} Joules.`,
        topic: 'Work and Energy'
      },
      {
        text: `What focal length does a convex lens of optical power +2.0 Dioptre have in CBSE Class ${c} Physics?`,
        options: ['+50.0 cm', '+200.0 cm', '−50.0 cm', '+10.0 cm'],
        correctIndex: 0,
        explanation: `f (in m) = 1 / P = 1 / 2.0 = +0.5 m = +50.0 cm.`,
        topic: 'Light – Reflection and Refraction'
      },
      {
        text: `In NCERT Class ${c} Physics, if wave speed is ${330 + c} m/s and frequency is 10 Hz, the wavelength equals:`,
        options: [`${((330 + c) / 10).toFixed(1)} m`, `${(330 + c) * 10} m`, `${340 + c} m`, `33.0 m`],
        correctIndex: 0,
        explanation: `λ = v / ν = (${330 + c}) / 10 = ${((330 + c) / 10).toFixed(1)} m.`,
        topic: 'Sound Waves'
      },
      {
        text: `For ${ctx} Class ${c} Physics, what SI unit measures mechanical work and energy?`,
        options: ['Joule (J)', 'Watt per second', 'Newton per square metre', 'Pascal (Pa)'],
        correctIndex: 0,
        explanation: `Work = Force × displacement is measured in Joules (J).`,
        topic: 'Work and Energy'
      },
      {
        text: `During a Class ${c} Physics experiment, a compass needle deflects near a current-carrying wire because electric current produces:`,
        options: [
          'A magnetic field around the conductor',
          'Ultrasonic sound echoes',
          'Electrostatic precipitation',
          'Gravitational lens inversion'
        ],
        correctIndex: 0,
        explanation: `Hans Christian Oersted demonstrated that an electric current produces a magnetic field around the wire.`,
        topic: 'Magnetic Effects of Electric Current'
      },
      {
        text: `In CBSE Class ${c} Physics (Human Eye and the Colourful World), the splitting of white light into its seven constituent colours through a glass prism is called:`,
        options: ['Dispersion of light', 'Lateral inversion', 'Echo reflection', 'Rectilinear propagation'],
        correctIndex: 0,
        explanation: `Different wavelengths of white light bend at slightly different angles inside a glass prism, producing the VIBGYOR spectrum.`,
        topic: 'Human Eye and Colourful World'
      },
      {
        text: `According to the Universal Law of Gravitation in NCERT Class ${c} Physics, if the distance between two masses is doubled, the gravitational force between them becomes:`,
        options: [
          'One-fourth (1/4) of the original force',
          'Four times the original force',
          'Double the original force',
          'Unchanged'
        ],
        correctIndex: 0,
        explanation: `Since F ∝ 1/r², doubling distance r reduces the gravitational attraction to 1/(2²) = 1/4.`,
        topic: 'Gravitation'
      },
      {
        text: `In CBSE Class ${c} Physics, an electric bulb rated 220 V and 100 W operates at 220 V. Which formula relates electric power (P), potential difference (V), and current (I)?`,
        options: ['P = V × I', 'P = V / I²', 'P = I / V', 'P = V + I'],
        correctIndex: 0,
        explanation: `Electrical power equals the product of voltage and current: P = V × I.`,
        topic: 'Electricity'
      }
    ];
  }

  if (subject === 'Chemistry') {
    return [
      {
        text: `In ${ctx} Class ${c} Chemistry, calculate the mass of ${m} moles of hydrogen gas (H₂, molar mass = 2 g/mol):`,
        options: [`${m * 2} g`, `${m + 2} g`, `${m * 4} g`, `${m * 16} g`],
        correctIndex: 0,
        explanation: `Mass = number of moles × molar mass = ${m} × 2 = ${m * 2} g.`,
        topic: 'Atoms and Molecules'
      },
      {
        text: `In NCERT Class ${c} Chemistry, which gas evolves with brisk effervescence when dilute HCl reacts with limestone (CaCO₃)?`,
        options: ['Carbon dioxide (CO₂)', 'Oxygen (O₂)', 'Nitrogen (N₂)', 'Helium (He)'],
        correctIndex: 0,
        explanation: `Metal carbonates react with dilute acids to liberate CO₂ gas, which turns lime water milky.`,
        topic: 'Acids, Bases and Salts'
      },
      {
        text: `What is the valency of carbon (atomic number 6) studied in CBSE Class ${c} Chemistry?`,
        options: ['4 (tetravalent)', '1 (monovalent)', '2 (divalent)', '6 (hexavalent)'],
        correctIndex: 0,
        explanation: `Carbon has electronic configuration (2, 4) and shares 4 valence electrons to form covalent bonds.`,
        topic: 'Carbon and its Compounds'
      },
      {
        text: `Under Class ${c} NCERT Metals and Non-Metals, which metal remains in the liquid state at standard room temperature?`,
        options: ['Mercury (Hg)', 'Magnesium (Mg)', 'Aluminium (Al)', 'Tungsten (W)'],
        correctIndex: 0,
        explanation: `Mercury (Hg) is the only metallic element that is liquid at standard room temperature.`,
        topic: 'Metals and Non-Metals'
      },
      {
        text: `According to NCERT Class ${c} Chemistry pH concepts, pure neutral distilled water at 25°C has a pH value of:`,
        options: ['7.0', '2.0', '11.0', '14.0'],
        correctIndex: 0,
        explanation: `Pure neutral water at 25°C has equal H⁺ and OH⁻ concentrations, giving pH = 7.0.`,
        topic: 'Acids, Bases and Salts'
      },
      {
        text: `In Class ${c} Chemistry, converting 100°C boiling water into water vapour at constant temperature absorbs:`,
        options: [
          'Latent heat of vaporisation',
          'Latent heat of fusion',
          'Specific gravity',
          'Magnetic flux'
        ],
        correctIndex: 0,
        explanation: `Latent heat of vaporisation overcomes intermolecular forces during the liquid-to-gas phase transition without raising temperature.`,
        topic: 'Matter in Our Surroundings'
      },
      {
        text: `In CBSE Class ${c} Chemical Reactions, why are potato chip packets flushed with unreactive Nitrogen (N₂) gas before sealing?`,
        options: [
          'To prevent oxidation of fats and oils (rancidity)',
          'To make the chips dissolve in water',
          'To increase acidic corrosion of the wrapper',
          'To convert starch into metallic sodium'
        ],
        correctIndex: 0,
        explanation: `Nitrogen displaces oxygen inside the packet, preventing oxidative rancidity of oils and fats.`,
        topic: 'Chemical Reactions and Equations'
      },
      {
        text: `What is the chemical formula of Baking Soda studied in NCERT Class ${c} Chemistry?`,
        options: [
          'NaHCO₃ (Sodium hydrogencarbonate)',
          'NaOH (Sodium hydroxide)',
          'CaSO₄ · 2H₂O (Gypsum)',
          'NaCl (Sodium chloride)'
        ],
        correctIndex: 0,
        explanation: `Baking soda is sodium hydrogencarbonate (NaHCO₃), a mild non-corrosive basic salt.`,
        topic: 'Acids, Bases and Salts'
      },
      {
        text: `According to Rutherford's alpha-particle scattering experiment in Class ${c} Chemistry, most alpha particles passed straight through the gold foil because:`,
        options: [
          'Most of the space inside an atom is empty',
          'The nucleus occupies 99% of atomic volume',
          'Electrons are heavier than alpha particles',
          'Gold atoms have no protons'
        ],
        correctIndex: 0,
        explanation: `Rutherford concluded that the positive charge and mass are concentrated in a tiny nucleus while most of the atom is empty space.`,
        topic: 'Structure of the Atom'
      },
      {
        text: `In NCERT Class ${c} Metals and Non-Metals, the process of applying a protective coating of Zinc (Zn) over iron articles to prevent rusting is called:`,
        options: ['Galvanisation', 'Sublimation', 'Esterification', 'Saponification'],
        correctIndex: 0,
        explanation: `Galvanisation coats iron or steel with a thin layer of zinc to protect it from moisture and oxygen.`,
        topic: 'Metals and Non-Metals'
      }
    ];
  }

  // Biology Level 1 (Classes 6–10)
  return [
    {
      text: `In ${ctx} Class ${c} Biology, which specialised plant vascular tissue transports dissolved water and minerals upward from roots to leaves?`,
      options: ['Xylem', 'Phloem', 'Cambium', 'Cuticle'],
      correctIndex: 0,
      explanation: `Xylem vessels and tracheids conduct water and dissolved minerals unidirectionally from roots to aerial parts.`,
      topic: 'Life Processes – Transport in Plants'
    },
    {
      text: `Under CBSE Class ${c} Biology, which gas is released as a vital by-product during green leaf photosynthesis?`,
      options: ['Oxygen (O₂)', 'Methane (CH₄)', 'Sulphur dioxide (SO₂)', 'Carbon monoxide (CO)'],
      correctIndex: 0,
      explanation: `During the photolysis of water in photosynthesis, oxygen gas is liberated into the atmosphere through stomata.`,
      topic: 'Autotrophic Nutrition'
    },
    {
      text: `Identify the vitamin deficiency studied in Class ${c} Biology that causes bleeding gums and delayed wound healing (Scurvy):`,
      options: [
        'Vitamin C (Ascorbic acid)',
        'Vitamin D (Calciferol)',
        'Vitamin K',
        'Vitamin B12'
      ],
      correctIndex: 0,
      explanation: `Vitamin C found in citrus fruits and amla is essential for collagen synthesis and healthy gums.`,
      topic: 'Nutrition and Health'
    },
    {
      text: `In NCERT Class ${c} Biology, which blood component carries oxygen bound to haemoglobin from the lungs to body tissues?`,
      options: [
        'Red Blood Cells (Erythrocytes)',
        'Blood platelets (Thrombocytes)',
        'Lymphatic valves',
        'Blood fibrinogen only'
      ],
      correctIndex: 0,
      explanation: `Red blood cells contain the iron-rich respiratory pigment haemoglobin, which binds oxygen to form oxyhaemoglobin.`,
      topic: 'Human Circulatory System'
    },
    {
      text: `In CBSE Class ${c} Biology, why are leguminous crop roots rotated with cereal crops by farmers?`,
      options: [
        'Root-nodule Rhizobium bacteria fix atmospheric nitrogen into usable soil nitrates',
        'Legumes remove all minerals from topsoil',
        'Roots turn loamy fields into granite rocks',
        'Leaves block sunlight from reaching soil microbes'
      ],
      correctIndex: 0,
      explanation: `Symbiotic Rhizobium bacteria in root nodules replenish soil nitrogen fertility naturally.`,
      topic: 'Improvement in Food Resources'
    },
    {
      text: `Identify the primary nitrogenous waste-filtering organ system in CBSE Class ${c} Human Biology:`,
      options: [
        'Excretory system (Kidneys and Nephrons)',
        'Auditory ossicles of the middle ear',
        'Olfactory epithelium',
        'Thyroid cartilage'
      ],
      correctIndex: 0,
      explanation: `Millions of nephrons inside the kidneys filter urea, uric acid, and excess water from blood to form urine.`,
      topic: 'Excretion in Humans'
    },
    {
      text: `In NCERT Class ${c} Biology (The Fundamental Unit of Life), which cell organelle is known as the "Powerhouse of the Cell" because it synthesises ATP energy currency?`,
      options: ['Mitochondria', 'Golgi apparatus', 'Ribosome', 'Lysosome'],
      correctIndex: 0,
      explanation: `Mitochondria carry out aerobic cellular respiration and store energy in Adenosine Triphosphate (ATP) molecules.`,
      topic: 'Fundamental Unit of Life'
    },
    {
      text: `Which plant hormone studied in CBSE Class ${c} Control and Coordination promotes cell elongation at shoot tips and phototropic bending toward light?`,
      options: ['Auxin', 'Abscisic acid', 'Insulin', 'Adrenaline'],
      correctIndex: 0,
      explanation: `Auxin diffuses to the shaded side of the shoot tip, stimulating cells to grow longer and bend the stem toward light.`,
      topic: 'Control and Coordination'
    },
    {
      text: `In NCERT Class ${c} Biology, the microscopic gap between the axon terminal of one neuron and the dendrite of the next neuron is called a:`,
      options: ['Synapse', 'Nephron', 'Villus', 'Alveolus'],
      correctIndex: 0,
      explanation: `Nerve impulses cross the synapse via chemical neurotransmitters released from the axon terminal.`,
      topic: 'Nervous System'
    },
    {
      text: `According to Mendel's Law of Segregation in CBSE Class ${c} Heredity, what is the phenotypic ratio of tall to dwarf pea plants in the monohybrid F₂ generation?`,
      options: ['3 : 1', '1 : 1', '9 : 3 : 3 : 1', '2 : 3'],
      correctIndex: 0,
      explanation: `Self-pollination of F₁ heterozygous tall (Tt × Tt) plants yields 3 Tall (TT, 2 Tt) : 1 Dwarf (tt) in F₂.`,
      topic: 'Heredity and Evolution'
    }
  ];
}

function makeGenericCbseSpecs(classLevel: ClassLevel, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const ctx = NCERT_BOOK_TAG[c];

  // For Levels 2, 3, and 4 of all subjects, and all 4 levels of Social Studies, Social Science, History, Geography,
  // Political Science, Economics, Computer Knowledge, Information Technology, General Knowledge, Logical Reasoning,
  // Moral Education, Vocabulary and Grammar, Drawing and Creative Activities, Physical Education -> use the 40-question subject-pure master banks
  if (
    level >= 2 ||
    (subject !== 'English' && subject !== 'Hindi' && subject !== 'Sanskrit')
  ) {
    const raw = lookupMasterSubjectSpecs(classLevel, subject, level);
    return contextualizeCbseSpecs(classLevel, subject, level, raw);
  }

  if (subject === 'English') {
    return [
      {
        text: `In ${ctx} Class ${c} English, pick the proper tense: "Yesterday evening, the astronomy club ___ Saturn’s rings."`,
        options: ['observed', 'observes', 'will observing', 'have observe'],
        correctIndex: 0,
        explanation: `"Yesterday evening" specifies completed past time, requiring simple past "observed".`,
        topic: 'Tenses & Verbs'
      },
      {
        text: `Choose the correctly punctuated CBSE Class ${c} English sentence using a possessive apostrophe:`,
        options: [
          `The children’s science models stood neatly along Hall ${c}.`,
          `The childrens’ science models stood neatly.`,
          `The child’s are standing neat along hall.`,
          `The children science’s models stands.`
        ],
        correctIndex: 0,
        explanation: `Plural noun "children" forms possession by adding ’s: children’s.`,
        topic: 'Punctuation'
      },
      {
        text: `Select an accurate synonym for the word "diligent" taught in NCERT Class ${c} English:`,
        options: [
          'Hardworking and careful',
          'Negligent and hasty',
          'Drowsy and absent',
          'Loud and boastful'
        ],
        correctIndex: 0,
        explanation: `"Diligent" describes steady, conscientious effort.`,
        topic: 'Vocabulary Synonyms'
      },
      {
        text: `Fill the right preposition for Class ${c} English: "Our team congratulated Priya ___ her mathematics Olympiad medal."`,
        options: ['on', 'for', 'with', 'against'],
        correctIndex: 0,
        explanation: `Standard collocation: "congratulate someone on an achievement".`,
        topic: 'Prepositions'
      },
      {
        text: `Convert to passive voice (CBSE Class ${c} English): "The librarian catalogued forty new encyclopaedias."`,
        options: [
          'Forty new encyclopaedias were catalogued by the librarian.',
          'Forty new encyclopaedias was cataloguing by librarian.',
          'The librarian was catalogued by forty encyclopaedias.',
          'Forty new encyclopaedias are catalogue today.'
        ],
        correctIndex: 0,
        explanation: `Plural past passive uses "were + past participle".`,
        topic: 'Voice Transformation'
      },
      {
        text: `Pick the antonym of "scarce" for NCERT Class ${c} English word building:`,
        options: ['Abundant', 'Rare', 'Insufficient', 'Fragile'],
        correctIndex: 0,
        explanation: `Abundant (plentiful) is opposite in meaning to scarce.`,
        topic: 'Antonyms'
      },
      {
        text: `Identify the modal expressing polite advice in CBSE Class ${c} English grammar: "Students ___ check every unit before submitting."`,
        options: ['should', 'ought not never', 'mustn’t ever', 'has to'],
        correctIndex: 0,
        explanation: `"Should" conveys sensible recommendation or duty.`,
        topic: 'Modals'
      },
      {
        text: `Which literary figure of speech appears in Class ${c} English verse: "The silver moon sailed silently across velvet clouds"?`,
        options: [
          'Metaphor / Alliteration',
          'Hyperbole of numbers',
          'Arithmetic pun',
          'Exclamatory rhyme break'
        ],
        correctIndex: 0,
        explanation: `Repeated "s" sound ("silver...sailed silently") creates musical alliteration alongside imagery.`,
        topic: 'Poetic Devices'
      },
      {
        text: `Spot the collective noun matching Grade ${c} English: "A ___ of ships anchored safely in Kochi harbour."`,
        options: ['fleet', 'troop', 'hive', 'bundle'],
        correctIndex: 0,
        explanation: `A group of ships sailing or docked together is a fleet.`,
        topic: 'Collective Nouns'
      },
      {
        text: `In Class ${c} English reading skills, a concise paragraph stating the central message without personal opinion is a:`,
        options: ['Summary', 'Soliloquy', 'Hyperlink', 'Anagram'],
        correctIndex: 0,
        explanation: `Summaries capture key points objectively and briefly.`,
        topic: 'Comprehension Skills'
      }
    ];
  }

  if (subject === 'Hindi') {
    const words = ['सूर्य', 'पृथ्वी', 'जल', 'वायु', 'आकाश', 'मित्र', 'परिश्रम', 'सत्य', 'ज्ञान', 'प्रकृति'];
    const correctAns = [
      'रवि / भास्कर (समानार्थी)',
      'धरा / वसुंधरा (समानार्थी)',
      'नीर / सलिल (समानार्थी)',
      'पवन / समीर (समानार्थी)',
      'गगन / नभ (समानार्थी)',
      'सखा / सहचर (समानार्थी)',
      'मेहनत / उद्यम (समानार्थी)',
      'असत्य (विलोम शब्द)',
      'अज्ञान (विलोम शब्द)',
      'कुदरत / नैसर्गिक (समानार्थी)'
    ];
    return words.map((word, idx) => ({
      text: `${ctx} कक्षा ${c} हिंदी (प्रश्न ${idx + 1}): "${word}" शब्द के शुद्ध व्याकरणिक पर्यायवाची/विलोम रूप का चयन कीजिए:`,
      options: [
        correctAns[idx],
        `असंगत तद्भव रूप (${word}-हीन)`,
        `विपरीत संधि-विच्छेद भ्रम`,
        `अशुद्ध कारक प्रत्यय प्रयोग`
      ],
      correctIndex: 0,
      explanation: `NCERT हिंदी व्याकरण कक्षा ${c} के अनुसार "${word}" के लिए "${correctAns[idx]}" सही उत्तर है।`,
      topic: 'शब्द-भंडार एवं व्याकरण'
    }));
  }

  // Sanskrit Level 1
  const dhatus = ['पठति', 'गच्छति', 'लिखति', 'वदति', 'हसति', 'नमति', 'धावति', 'पश्यति', 'पिबति', 'क्रीडति'];
  const meanings = ['पढ़ता है', 'जाता है', 'लिखता है', 'बोलता है', 'हँसता है', 'नमस्कार करता है', 'दौड़ता है', 'देखता है', 'पीता है', 'खेलता है'];
  return dhatus.map((dhatu, idx) => ({
    text: `${ctx} कक्षा ${c} संस्कृत (प्रश्न ${idx + 1}): "${dhatu}" (${meanings[idx]}) धातु-रूप किस लकार, पुरुष व वचन का उदाहरण है?`,
    options: [
      `लट् लकार (वर्तमान काल), प्रथम पुरुष एकवचन (${dhatu})`,
      'लृट् लकार (भविष्यत् काल), उत्तम पुरुष बहुवचन',
      'लङ् लकार (भूतकाल), मध्यम पुरुष द्विवचन',
      'लोट् लकार (आज्ञार्थक), उत्तम पुरुष एकवचन'
    ],
    correctIndex: 0,
    explanation: `संस्कृत व्याकरण में "${dhatu}" लट् लकार (वर्तमान काल), प्रथम पुरुष एकवचन का रूप है।`,
    topic: 'लकार व धातु-रूपाणि'
  }));
}

export function getCbseSubjectQuestions(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  if (subject === 'Mathematics') {
    return makeMathSpecs(c, level);
  }
  if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    return makeScienceSpecs(classLevel, subject, level);
  }
  return makeGenericCbseSpecs(classLevel, subject, level);
}
