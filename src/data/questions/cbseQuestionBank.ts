import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { RawQuizSpec } from './subject40BankPart1';

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

function makeMathSpecs(c: number, level: QuizLevel): RawQuizSpec[] {
  const ctx = NCERT_BOOK_TAG[c];
  const base = (c * 17 + level * 11);

  if (c <= 2) {
    const a = c * 11 + level * 3;
    const b = c * 5 + level * 2;
    const prod = (c + level + 1) * (level + 2);
    const tens = c + level + 1;
    const ones = (level * 2 + c) % 9 + 1;
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
          `${seqStart + step * 3 + 2}`,
          `${seqStart + step * 4}`
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
    const fracDen = c + 3;
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
          `1/${fracDen}`,
          `${fracDen - 1}/${fracDen}`
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
        text: `In Class ${c} Level ${level} angle classification, a corner opening of ${(c * 7 + level * 11) % 40 + 35}° is classified as:`,
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
    const triA = (c * 4 + level * 7) % 50 + 35;
    const triB = (c * 3 + level * 5) % 40 + 30;
    const triC = 180 - triA - triB;

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
        text: `What is the mean (average) of four test scores ${c + 10}, ${c + 14}, ${c + 18}, and ${c + 22} in Class ${c} Level ${level}?`,
        options: [`${c + 14}`, `${c + 16}`, `${c + 18}`, `${c + 20}`],
        correctIndex: 1,
        explanation: `Sum = ${4 * c + 64}; dividing by 4 gives ${c + 16}.`,
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
      text: `Evaluate 15 sec²A − 15 tan²A in Class ${c} Level ${level} CBSE Trigonometry.`,
      options: [`0`, `1`, `15`, `30`],
      correctIndex: 2,
      explanation: `Since sec²A − tan²A = 1, 15(1) = 15.`,
      topic: 'Trigonometric Identities'
    },
    {
      text: `In Class ${c} Level ${level} Geometry, if a tangent from P to circle of radius ${3 * level} cm has length ${4 * level} cm, distance PO is:`,
      options: [`${5 * level - 1} cm`, `${5 * level} cm`, `${5 * level + 2} cm`, `${7 * level} cm`],
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

function makeScienceSpecs(c: number, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const ctx = NCERT_BOOK_TAG[c];
  const m = c * 2 + level;
  const acc = level + 2;
  const volts = 12 * level;
  const amps = c <= 8 ? 2 : 3;

  const curatedFacts: { q: string; a: string; f1: string; f2: string; f3: string; exp: string; topic: string }[] =
    subject === 'Physics' || (subject === 'Science' && c >= 8 && level % 2 === 1)
      ? [
          {
            q: `In ${ctx} Class ${c} Level ${level} ${subject}, compute the force required to accelerate a ${m} kg cart at ${acc} m/s².`,
            a: `${m * acc} N`,
            f1: `${m + acc} N`,
            f2: `${Math.max(1, m - acc)} N`,
            f3: `${m * acc * 2} N`,
            exp: `By Newton's Second Law, F = m × a = ${m} × ${acc} = ${m * acc} Newtons.`,
            topic: 'Laws of Motion'
          },
          {
            q: `A conductor in CBSE Class ${c} Level ${level} carries ${amps} A current under ${volts} V potential difference. Calculate electrical resistance.`,
            a: `${volts / amps} Ω`,
            f1: `${volts * amps} Ω`,
            f2: `${volts + amps} Ω`,
            f3: `${volts / amps + 3} Ω`,
            exp: `Ohm's Law gives R = V / I = ${volts} / ${amps} = ${volts / amps} Ω.`,
            topic: 'Electricity & Ohm Law'
          },
          {
            q: `For Class ${c} Level ${level} ${subject}, find kinetic energy of a 2 kg ball moving at ${level + 3} m/s.`,
            a: `${(level + 3) ** 2} J`,
            f1: `${2 * (level + 3)} J`,
            f2: `${(level + 3) + 2} J`,
            f3: `${2 * (level + 3) ** 2} J`,
            exp: `KE = ½ × 2 × (${level + 3})² = ${(level + 3) ** 2} Joules.`,
            topic: 'Work and Energy'
          },
          {
            q: `What focal length does a convex lens of optical power +${level} Dioptre have in CBSE Class ${c} ${subject}?`,
            a: `+${(100 / level).toFixed(1)} cm`,
            f1: `+${level * 50} cm`,
            f2: `−${(100 / level).toFixed(1)} cm`,
            f3: `+10 cm`,
            exp: `f (in m) = 1 / P = 1/${level} m = ${(100 / level).toFixed(1)} cm.`,
            topic: 'Light & Lenses'
          },
          {
            q: `In NCERT Class ${c} Level ${level} ${subject}, if wave speed is ${330 + c} m/s and frequency is 10 Hz, wavelength equals:`,
            a: `${((330 + c) / 10).toFixed(1)} m`,
            f1: `${(330 + c) * 10} m`,
            f2: `${340 + c} m`,
            f3: `33.0 m`,
            exp: `λ = v / ν = (${330 + c}) / 10 = ${((330 + c) / 10).toFixed(1)} m.`,
            topic: 'Sound Waves'
          }
        ]
      : subject === 'Chemistry'
        ? [
            {
              q: `Compute molecular mass of calcium oxide (CaO) or carbon dioxide step in Class ${c} Level ${level} (using ${m} moles of H₂, M=2g): total grams =`,
              a: `${m * 2} g`,
              f1: `${m + 2} g`,
              f2: `${m * 4} g`,
              f3: `${m * 16} g`,
              exp: `Mass = moles × molar mass = ${m} × 2 = ${m * 2} g.`,
              topic: 'Atoms & Molecules'
            },
            {
              q: `In NCERT Class ${c} Chemistry Level ${level}, which gas evolves with brisk effervescence when dilute HCl reacts with limestone (CaCO₃)?`,
              a: 'Carbon dioxide (CO₂)',
              f1: 'Oxygen (O₂)',
              f2: 'Nitrogen (N₂)',
              f3: 'Helium (He)',
              exp: `Carbonates react with acids to liberate CO₂ gas, turning limewater milky.`,
              topic: 'Acids, Bases & Salts'
            },
            {
              q: `What is the valency of carbon (atomic number 6) studied in CBSE Class ${c} Level ${level} Chemistry?`,
              a: '4 (tetravalent)',
              f1: '1 (monovalent)',
              f2: '2 (divalent)',
              f3: '6',
              exp: `Carbon has 4 valence electrons (2, 4) and forms 4 covalent bonds.`,
              topic: 'Carbon Compounds'
            },
            {
              q: `Under Class ${c} Level ${level} NCERT Metals syllabus, which liquid metal stays molten at standard room temperature?`,
              a: 'Mercury (Hg)',
              f1: 'Gallium chloride',
              f2: 'Sodium crystal',
              f3: 'Tungsten filament',
              exp: `Mercury is the only metallic element liquid at normal room temperature.`,
              topic: 'Metals & Non-Metals'
            },
            {
              q: `According to NCERT Class ${c} Level ${level} pH concepts, distilled neutral water at 25°C measures pH equal to:`,
              a: '7',
              f1: '2',
              f2: '11',
              f3: '14',
              exp: `Pure neutral water sits squarely at pH = 7.`,
              topic: 'pH Scale'
            }
          ]
        : [
            {
              q: `In ${ctx} Class ${c} Level ${level} ${subject}, which specialised plant vascular tissue transports dissolved water upward from roots to leaves?`,
              a: 'Xylem',
              f1: 'Phloem',
              f2: 'Cambium bark',
              f3: 'Guard cell pore',
              exp: `Xylem vessels conduct water and minerals unidirectionally from roots upward.`,
              topic: 'Plant Transport'
            },
            {
              q: `Under CBSE Class ${c} Level ${level} ${subject}, which gas is released as a vital by-product during green leaf photosynthesis?`,
              a: 'Oxygen gas',
              f1: 'Methane gas',
              f2: 'Sulphur dioxide',
              f3: 'Carbon monoxide',
              exp: `Photosynthesis splits water and liberates oxygen gas into the atmosphere.`,
              topic: 'Photosynthesis'
            },
            {
              q: `Identify the vitamin deficiency studied in Class ${c} Level ${level} ${subject} that causes bleeding gums (Scurvy):`,
              a: 'Vitamin C (Ascorbic acid)',
              f1: 'Vitamin D',
              f2: 'Vitamin K',
              f3: 'Vitamin B1',
              exp: `Citrus fruits rich in Vitamin C prevent scurvy.`,
              topic: 'Nutrition & Health'
            },
            {
              q: `In NCERT Class ${c} Level ${level} ${subject}, which blood component carries oxygen bound to haemoglobin from lungs to tissues?`,
              a: 'Red Blood Cells (Erythrocytes)',
              f1: 'Blood plasma salts only',
              f2: 'White blood phagocytes',
              f3: 'Platelet fragments',
              exp: `Red blood cells contain iron-rich haemoglobin for oxygen transport.`,
              topic: 'Human Circulation'
            },
            {
              q: `At the Class ${c} Level ${level} CBSE ${subject} stage, why are Leguminous crop roots rotated with cereal crops by farmers?`,
              a: 'Root-nodule Rhizobium enriches soil with usable nitrates naturally',
              f1: 'Roots drain underground water reservoirs',
              f2: 'Legumes turn sandy fields into clay rocks',
              f3: 'Leaves shade wheat seeds from oxygen',
              exp: `Nitrogen-fixing Rhizobium replenishes soil nitrate fertility naturally.`,
              topic: 'Crop & Ecosystem Science'
            }
          ];

  const extraPool: { q: string; a: string; f1: string; f2: string; f3: string; exp: string; topic: string }[] = [
    {
      q: `For ${ctx} Class ${c} Level ${level} ${subject}, what SI unit measures mechanical work and energy?`,
      a: 'Joule (J)',
      f1: 'Watt-hour only',
      f2: 'Newton per square metre',
      f3: 'Kelvin degree',
      exp: `Work = Force × distance is measured in Joules (J).`,
      topic: 'Physical Units'
    },
    {
      q: `In Class ${c} Level ${level} ${subject}, converting 100°C boiling water into water vapour at constant temperature absorbs:`,
      a: 'Latent heat of vaporisation',
      f1: 'Specific gravity',
      f2: 'Static buoyancy',
      f3: 'Magnetic flux',
      exp: `Latent heat drives the phase transition from liquid to gas without temperature rise.`,
      topic: 'States of Matter'
    },
    {
      q: `Identify the primary waste-filtering organ system in CBSE Class ${c} Level ${level} ${subject} biology:`,
      a: 'Excretory system (Kidneys)',
      f1: 'Auditory ossicles',
      f2: 'Olfactory bulb',
      f3: 'Thyroid cartilage',
      exp: `Kidneys excrete urea and excess water as urine.`,
      topic: 'Life Processes'
    },
    {
      q: `In NCERT Class ${c} Level ${level} ${subject}, which planet rotates cleanly between Earth and Jupiter in our Solar System?`,
      a: 'Mars',
      f1: 'Mercury',
      f2: 'Neptune',
      f3: 'Venus',
      exp: `Order from Sun: Mercury, Venus, Earth, Mars, Jupiter.`,
      topic: 'Solar System'
    },
    {
      q: `During a Class ${c} Level ${level} ${subject} experiment, a compass needle deflects near a current-carrying wire because electric current creates:`,
      a: 'A magnetic field around the wire',
      f1: 'Ultrasonic echoes',
      f2: 'Electrostatic rainwater',
      f3: 'Gravitational lens inversion',
      exp: `Oersted discovered that moving charges produce surrounding magnetic fields.`,
      topic: 'Electromagnetism'
    }
  ];

  const combined = [...curatedFacts, ...extraPool];
  return combined.map((item, idx) => {
    const hasClass = item.q.includes(`Class ${c}`);
    const hasSubj = item.q.toLowerCase().includes(subject.toLowerCase());
    const text =
      hasClass && hasSubj
        ? item.q
        : `CBSE Class ${c} Level ${level} (${subject} Q${idx + 1}): ${item.q}`;
    return {
      text,
      options: [item.a, item.f1, item.f2, item.f3],
      correctIndex: 0,
      explanation: item.exp,
      topic: item.topic
    };
  });
}

function makeGenericCbseSpecs(c: number, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const ctx = NCERT_BOOK_TAG[c];
  const pairs: { q: string; a: string; f1: string; f2: string; f3: string; exp: string; topic: string }[] =
    subject === 'English' || subject === 'Vocabulary and Grammar'
      ? [
          {
            q: `In ${ctx} Class ${c} Level ${level} ${subject}, pick the proper tense: "Yesterday evening, the astronomy club ___ Saturn’s rings."`,
            a: 'observed',
            f1: 'observes',
            f2: 'will observing',
            f3: 'have observe',
            exp: `"Yesterday evening" specifies completed past time, requiring simple past "observed".`,
            topic: 'Tenses & Verbs'
          },
          {
            q: `Choose the correctly punctuated CBSE Class ${c} Level ${level} sentence using possessive apostrophe:`,
            a: `The children’s science models stood neatly along Hall ${c}.`,
            f1: `The childrens’ science models stood neatly.`,
            f2: `The child’s are standing neat along hall.`,
            f3: `The children science’s models stands.`,
            exp: `Plural noun "children" forms possession by adding ’s: children’s.`,
            topic: 'Punctuation'
          },
          {
            q: `Select an accurate synonym for the word "diligent" taught in NCERT Class ${c} Level ${level} ${subject}:`,
            a: 'Hardworking and careful',
            f1: 'Negligent and hasty',
            f2: 'Drowsy and absent',
            f3: 'Loud and boastful',
            exp: `"Diligent" describes steady, conscientious effort.`,
            topic: 'Vocabulary Synonyms'
          },
          {
            q: `Fill the right preposition for Class ${c} Level ${level} ${subject}: "Our team congratulated Priya ___ her mathematics Olympiad medal."`,
            a: 'on',
            f1: 'for',
            f2: 'with',
            f3: 'against',
            exp: `Standard collocation: "congratulate someone on an achievement".`,
            topic: 'Prepositions'
          },
          {
            q: `Convert to passive voice (CBSE Class ${c} Level ${level} Set): "The librarian catalogued forty new encyclopaedias."`,
            a: 'Forty new encyclopaedias were catalogued by the librarian.',
            f1: 'Forty new encyclopaedias was cataloguing by librarian.',
            f2: 'The librarian was catalogued by forty encyclopaedias.',
            f3: 'Forty new encyclopaedias are catalogue today.',
            exp: `Plural past passive uses "were + past participle".`,
            topic: 'Voice Transformation'
          },
          {
            q: `Pick the antonym of "scarce" for NCERT Class ${c} Level ${level} ${subject} word building:`,
            a: 'Abundant',
            f1: 'Rare',
            f2: 'Insufficient',
            f3: 'Fragile',
            exp: `Abundant (plentiful) is opposite in meaning to scarce.`,
            topic: 'Antonyms'
          },
          {
            q: `Identify the modal expressing polite advice in CBSE Class ${c} Level ${level} grammar: "Students ___ check every unit before submitting."`,
            a: 'should',
            f1: 'ought not never',
            f2: 'mustn’t ever',
            f3: 'has to',
            exp: `"Should" conveys sensible recommendation or duty.`,
            topic: 'Modals'
          },
          {
            q: `Which literary figure of speech appears in Class ${c} Level ${level} verse: "The silver moon sailed silently across velvet clouds"?`,
            a: 'Metaphor / Alliteration',
            f1: 'Hyperbole of numbers',
            f2: 'Arithmetic pun',
            f3: 'Exclamatory rhyme break',
            exp: `Repeated "s" sound ("silver...sailed silently") creates musical alliteration alongside imagery.`,
            topic: 'Poetic Devices'
          },
          {
            q: `Spot the collective noun matching Grade ${c} Level ${level} ${subject}: "A ___ of ships anchored safely in Kochi harbour."`,
            a: 'fleet',
            f1: 'troop',
            f2: 'hive',
            f3: 'bundle',
            exp: `A group of ships sailing or docked together is a fleet.`,
            topic: 'Collective Nouns'
          },
          {
            q: `In Class ${c} Level ${level} reading skill, a concise paragraph stating the central message without personal opinion is a:`,
            a: 'Summary',
            f1: 'Soliloquy',
            f2: 'Hyperlink',
            f3: 'Anagram',
            exp: `Summaries capture key points objectively and briefly.`,
            topic: 'Comprehension Skills'
          }
        ]
      : subject === 'Hindi' || subject === 'Sanskrit'
        ? Array.from({ length: 10 }, (_, idx) => ({
            q:
              subject === 'Sanskrit'
                ? `${ctx} कक्षा ${c} स्तर ${level} संस्कृत (प्रश्न ${idx + 1}): "${['पठति', 'गच्छति', 'लिखति', 'वदति', 'हसति', 'नमति', 'धावति', 'पश्यति', 'पिबति', 'क्रीडति'][idx]}" धातु-रूप किस लकार व पुरुष का उदाहरण है?`
                : `${ctx} कक्षा ${c} स्तर ${level} हिंदी (प्रश्न ${idx + 1}): "${['सूर्य', 'पृथ्वी', 'जल', 'वायु', 'आकाश', 'मित्र', 'परिश्रम', 'सत्य', 'ज्ञान', 'प्रकृति'][idx]}" शब्द के शुद्ध व्याकरण व शब्द-भंडार का चयन कीजिए:`,
            a:
              subject === 'Sanskrit'
                ? 'लट् लकार (वर्तमान काल), प्रथम पुरुष एकवचन'
                : ['रवि / भास्कर (समानार्थी)', 'धरा / वसुंधरा', 'नीर / सलिल', 'पवन / समीर', 'गगन / नभ', 'सखा / सुहृद', 'मेहनत / उद्यम', 'असत्य (विलोम)', 'अज्ञान (विलोम)', 'कुदरत / नैसर्गिक'][idx],
            f1: subject === 'Sanskrit' ? 'लृट् लकार, उत्तम पुरुष बहुवचन' : 'असंगत तद्भव अशुद्ध रूप',
            f2: subject === 'Sanskrit' ? 'लङ् लकार, मध्यम पुरुष' : 'विपरीत संधि-विच्छेद भ्रम',
            f3: subject === 'Sanskrit' ? 'लोट् लकार आज्ञार्थक बहुवचन' : 'केवल अकारांत प्रत्यय त्रुटि',
            exp:
              subject === 'Sanskrit'
                ? `तीसरे गण/प्रथम पुरुष एकवचन तिङ् प्रत्यय "-ति" लट् लकार का संकेत है।`
                : `NCERT हिंदी व्याकरण कक्षा ${c} के अनुसार यह सही पर्यायवाची/विलोम रूप है।`,
            topic: subject === 'Sanskrit' ? 'लकार व शब्द रूपाणि' : 'शब्द-भंडार एवं व्याकरण'
          }))
        : Array.from({ length: 10 }, (_, idx) => {
            const topicNames = [
              'Constitutional Governance',
              'Geographical Features',
              'Historical Heritage',
              'Computational Thinking',
              'Analytical Reasoning',
              'Scientific Curiosity',
              'Civic Ethics & Values',
              'Data Interpretation',
              'Resource Conservation',
              'Global Knowledge'
            ];
            const ansBank = [
              'Democratic Parliamentary Accountability & Fundamental Rights',
              'Plateau, River Basin & Monsoon Climate Patterns',
              'Archaeological Primary Sources & Freedom Struggle Chronology',
              'Stepwise Algorithm Design, Binary Logic & Cyber Hygiene',
              'Pattern Recognition, Deductive Syllogism & Verification',
              'Experimental Observation, Hypothesis Testing & Conclusion',
              'Empathy, Civic Discipline & Environmental Stewardship',
              'Reading Bar Graphs, Pie Charts & Scaled Coordinate Tables',
              'Rainwater Harvesting, Renewable Solar Grids & Afforestation',
              'UN Specialized Agencies, Space Missions & Olympic Heritage'
            ];
            return {
              q: `${ctx} Class ${c} Level ${level} (${subject} • Unit ${idx + 1}): Which principle is core to "${topicNames[idx]}" in this NCERT syllabus module?`,
              a: ansBank[idx],
              f1: `Ignoring primary evidence in ${subject} Unit ${idx + 1}`,
              f2: `Unverified memorisation without conceptual reasoning`,
              f3: `Disregarding textbook syllabus guidelines for Class ${c}`,
              exp: `Unit ${idx + 1} in CBSE Class ${c} ${subject} builds mastery in ${topicNames[idx]}.`,
              topic: topicNames[idx]
            };
          });

  return pairs.map((item) => {
    const needsSubjTag =
      (subject === 'English' || subject === 'Vocabulary and Grammar') &&
      !item.q.toLowerCase().includes(subject.toLowerCase());
    return {
      text: needsSubjTag ? `CBSE ${subject}: ${item.q}` : item.q,
      options: [item.a, item.f1, item.f2, item.f3],
      correctIndex: 0,
      explanation: item.exp,
      topic: item.topic
    };
  });
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
    return makeScienceSpecs(c, subject, level);
  }
  return makeGenericCbseSpecs(c, subject, level);
}
