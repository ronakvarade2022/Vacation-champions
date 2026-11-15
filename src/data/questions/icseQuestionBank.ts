import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { ICSE_CURRICULUM_BY_CLASS } from '../boards/icseCurriculumConfig';
import { getPart1SubjectQuestions, RawQuizSpec } from './subject40BankPart1';
import { getPart2SubjectQuestions } from './subject40BankPart2';
import { getPart3SubjectQuestions } from './subject40BankPart3';
import { getPart4SubjectQuestions } from './subject40BankPart4';

const CISCE_STAGE_TAG: Record<number, string> = {
  1: 'CISCE Primary Grade 1',
  2: 'CISCE Primary Grade 2',
  3: 'CISCE Upper Primary 3',
  4: 'CISCE Upper Primary 4',
  5: 'CISCE Primary Capstone 5',
  6: 'CISCE Middle School VI',
  7: 'CISCE Middle School VII',
  8: 'CISCE Pre-Board VIII',
  9: 'CISCE Secondary IX',
  10: 'ICSE Board Exam X'
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
  if ((subject === 'Computer Studies' || subject === 'Computer Knowledge') && c <= 5) {
    return getPart4SubjectQuestions(classLevel, 'Computer Studies', level) || [];
  }
  return (
    getPart1SubjectQuestions(classLevel, subject, level) ||
    getPart2SubjectQuestions(classLevel, subject, level) ||
    getPart3SubjectQuestions(classLevel, subject, level) ||
    getPart4SubjectQuestions(classLevel, subject, level) ||
    []
  );
}

function contextualizeIcseSpecs(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel,
  rawSpecs: RawQuizSpec[]
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const tag = CISCE_STAGE_TAG[c];
  const boardChapters = ICSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject] || [];

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
        : `[${tag} • ${classLevel} ${subject}] ${baseText}`;

    return {
      ...spec,
      text,
      topic: spec.topic || chapterName
    };
  });
}

function makeIcseMathSpecs(c: number, level: QuizLevel): RawQuizSpec[] {
  const tag = CISCE_STAGE_TAG[c];

  if (c <= 2) {
    const x = c * 13 + level * 4;
    const y = c * 6 + level * 3;
    const diff = 90 + c * 15 - level * 7;
    const take = 20 + level * 5;
    const grp = c + level + 2;
    const per = level + 3;
    const hundreds = c + level;
    const tens = ((level * 2 + c) % 7) + 1;
    const rawOnes = ((level * 3 + c * 2) % 8) + 1;
    const ones = rawOnes === tens ? (rawOnes % 8) + 1 : rawOnes;
    const num3d = hundreds * 100 + tens * 10 + ones;

    return [
      {
        text: `In ${tag} Number Work Level ${level}, arrange and find the sum of ${x} white shells and ${y} blue shells.`,
        options: [`${x + y - 3}`, `${x + y}`, `${x + y + 2}`, `${x + y + 4}`],
        correctIndex: 1,
        explanation: `${x} + ${y} = ${x + y} shells.`,
        topic: 'Number Work Addition'
      },
      {
        text: `Using regrouping for ICSE Grade ${c} Level ${level}, subtract ${take} from ${diff}.`,
        options: [`${diff - take - 2}`, `${diff - take}`, `${diff - take + 4}`, `${diff + take}`],
        correctIndex: 1,
        explanation: `${diff} − ${take} = ${diff - take}.`,
        topic: 'Subtraction With Borrowing'
      },
      {
        text: `Write the standard 3-digit numeral for ${hundreds} hundreds, ${tens} tens, and ${ones} ones (${tag} Level ${level}).`,
        options: [
          `${num3d - 9}`,
          `${num3d}`,
          `${num3d + 10}`,
          `${num3d + 100}`
        ],
        correctIndex: 1,
        explanation: `${hundreds}00 + ${tens}0 + ${ones} = ${num3d}.`,
        topic: 'Hundreds Tens Ones'
      },
      {
        text: `For CISCE Class ${c} Level ${level}, calculate the product of ${grp} rows with ${per} desks in each row.`,
        options: [`${grp * per - 2}`, `${grp * per}`, `${grp * per + 3}`, `${grp + per}`],
        correctIndex: 1,
        explanation: `${grp} × ${per} = ${grp * per} desks.`,
        topic: 'Multiplication Tables'
      },
      {
        text: `If ${(c + level + 4) * 3} biscuits are shared equally onto 3 plates in ICSE Class ${c} Level ${level}, how many biscuits lie on each plate?`,
        options: [`${c + level + 2}`, `${c + level + 4}`, `${c + level + 6}`, `${c + level + 8}`],
        correctIndex: 1,
        explanation: `${(c + level + 4) * 3} ÷ 3 = ${c + level + 4}.`,
        topic: 'Equal Sharing Division'
      },
      {
        text: `Count forward by 5s in ICSE Grade ${c} Level ${level}: ${25 + level * 5}, ${30 + level * 5}, ${35 + level * 5}, ___`,
        options: [`${40 + level * 5 - 1}`, `${40 + level * 5}`, `${40 + level * 5 + 5}`, `${38 + level * 5}`],
        correctIndex: 1,
        explanation: `Adding 5 to ${35 + level * 5} yields ${40 + level * 5}.`,
        topic: 'Counting in Fives'
      },
      {
        text: `How many ₹10 coins equal ₹${(c + level + 2) * 10} in CISCE Class ${c} Level ${level} currency exercises?`,
        options: [`${c + level + 1}`, `${c + level + 2}`, `${c + level + 4}`, `${c + level + 5}`],
        correctIndex: 1,
        explanation: `₹${(c + level + 2) * 10} ÷ ₹10 = ${c + level + 2} coins.`,
        topic: 'Indian Currency'
      },
      {
        text: `Which geometric solid in ICSE Grade ${c} Level ${level} has ${level === 1 ? '6 flat square faces' : level === 2 ? '2 flat circular ends and 1 curved face' : level === 3 ? '1 circular flat base and 1 pointed vertex' : 'no flat faces or sharp edges at all'}?`,
        options: [
          level === 1 ? 'Cube' : level === 2 ? 'Cylinder' : level === 3 ? 'Cone' : 'Sphere',
          'Rectangle',
          'Triangle',
          'Pentagon'
        ],
        correctIndex: 0,
        explanation: `Standard 3D solid shape attributes covered in ICSE Primary mathematics.`,
        topic: '3D Solid Shapes'
      },
      {
        text: `A water jug holds ${level + 1} litres of lemonade. In Class ${c} Level ${level}, how many half-litre bottles can be filled from it?`,
        options: [`${level + 1}`, `${2 * (level + 1)}`, `${3 * (level + 1)}`, `${level}`],
        correctIndex: 1,
        explanation: `Every 1 litre fills 2 half-litre bottles → 2 × ${level + 1} = ${2 * (level + 1)}.`,
        topic: 'Capacity Measurement'
      },
      {
        text: `What number comes halfway between ${level * 10} and ${level * 10 + 10} on the ICSE Class ${c} number line?`,
        options: [`${level * 10 + 3}`, `${level * 10 + 5}`, `${level * 10 + 7}`, `${level * 10 + 9}`],
        correctIndex: 1,
        explanation: `(${level * 10} + ${level * 10 + 10}) / 2 = ${level * 10 + 5}.`,
        topic: 'Number Line Midpoints'
      }
    ];
  }

  if (c <= 5) {
    const b1 = 12 + c * 2;
    const b2 = level + 2;
    const b3 = c + level;
    const bodmas = b1 * 2 - b2 + b3;
    const pRate = 25 * level;
    const qty = c + 3;
    const totCost = pRate * qty;
    const cp = c * 100 + 250;
    const profit = level * 45 + 30;
    const sp = cp + profit;
    const avgBase = c * 5 + level * 3;

    return [
      {
        text: `Evaluate following ${tag} BODMAS precedence (Level ${level}): (${b1} × 2) − ${b2} + ${b3} =`,
        options: [`${bodmas - 3}`, `${bodmas}`, `${bodmas + 4}`, `${bodmas + 8}`],
        correctIndex: 1,
        explanation: `${b1} × 2 = ${b1 * 2}; ${b1 * 2} − ${b2} + ${b3} = ${bodmas}.`,
        topic: 'BODMAS Simplification'
      },
      {
        text: `A CISCE school stationery shop sells ${qty} notebooks for ₹${totCost}. Using unitary method (Class ${c} Level ${level}), find cost of 1 notebook.`,
        options: [`₹${pRate - 5}`, `₹${pRate}`, `₹${pRate + 10}`, `₹${pRate + 15}`],
        correctIndex: 1,
        explanation: `₹${totCost} ÷ ${qty} = ₹${pRate}.`,
        topic: 'Unitary Method'
      },
      {
        text: `A shopkeeper buys an atlas at ₹${cp} and sells it for ₹${sp}. Calculate profit in ICSE Class ${c} Level ${level}.`,
        options: [`₹${profit - 10}`, `₹${profit}`, `₹${profit + 15}`, `₹${cp - profit}`],
        correctIndex: 1,
        explanation: `Profit = SP − CP = ₹${sp} − ₹${cp} = ₹${profit}.`,
        topic: 'Profit and Loss'
      },
      {
        text: `Find the average of three quiz marks ${avgBase}, ${avgBase + 4}, and ${avgBase + 8} (CISCE Class ${c} Level ${level}).`,
        options: [`${avgBase + 2}`, `${avgBase + 4}`, `${avgBase + 6}`, `${avgBase + 8}`],
        correctIndex: 1,
        explanation: `Middle evenly spaced term = (${avgBase} + ${avgBase + 4} + ${avgBase + 8}) / 3 = ${avgBase + 4}.`,
        topic: 'Average Calculations'
      },
      {
        text: `Convert the percentage ${level * 20}% into its simplest fraction in ICSE Class ${c} Level ${level}:`,
        options: [`${level}/5`, `${level}/10`, `${level}/4`, `1/${level + 1}`],
        correctIndex: 0,
        explanation: `${level * 20}/100 reduces by dividing numerator and denominator by 20 to ${level}/5.`,
        topic: 'Percentages & Fractions'
      },
      {
        text: `Find the Greatest Common Factor (HCF) of ${12 * level} and ${18 * level} for ICSE Class ${c} Level ${level}.`,
        options: [`${3 * level}`, `${6 * level}`, `${9 * level}`, `${12 * level}`],
        correctIndex: 1,
        explanation: `HCF(12×${level}, 18×${level}) = 6×${level} = ${6 * level}.`,
        topic: 'Factors & HCF'
      },
      {
        text: `Calculate volume of a rectangular carton with length ${c + 4} cm, breadth ${level + 3} cm, and height 5 cm (ICSE Class ${c} Level ${level}).`,
        options: [
          `${(c + 4) * (level + 3) * 5 - 10} cm³`,
          `${(c + 4) * (level + 3) * 5} cm³`,
          `${(c + 4) * (level + 3) * 5 + 20} cm³`,
          `${(c + level + 12) * 5} cm³`
        ],
        correctIndex: 1,
        explanation: `Volume = l × b × h = ${c + 4} × ${level + 3} × 5 = ${(c + 4) * (level + 3) * 5} cm³.`,
        topic: 'Volume of Cuboid'
      },
      {
        text: `Subtract decimal ${level}.25 from ${c + level + 4}.75 in CISCE Class ${c} Level ${level}.`,
        options: [`${c + 4}.25`, `${c + 4}.50`, `${c + 5}.50`, `${c + 3}.75`],
        correctIndex: 1,
        explanation: `${c + level + 4}.75 − ${level}.25 = ${c + 4}.50.`,
        topic: 'Decimal Operations'
      },
      {
        text: `What is the Least Common Multiple (LCM) of ${c + level + 2} and ${(c + level + 2) * 2} in Class ${c} Level ${level}?`,
        options: [
          `${c + level + 2}`,
          `${(c + level + 2) * 2}`,
          `${(c + level + 2) * 3}`,
          `${(c + level + 2) * 4}`
        ],
        correctIndex: 1,
        explanation: `Since ${(c + level + 2) * 2} is a direct multiple of ${c + level + 2}, their LCM is ${(c + level + 2) * 2}.`,
        topic: 'LCM Practice'
      },
      {
        text: `An ICSE train leaves at 08:20 hrs and arrives after ${level + 1} hours 35 minutes (Class ${c} Level ${level}). Arrival time is:`,
        options: [
          `${9 + level}:45 hrs`,
          `${9 + level}:55 hrs`,
          `${8 + level}:55 hrs`,
          `${10 + level}:15 hrs`
        ],
        correctIndex: 1,
        explanation: `8:20 + ${level + 1}h 35m = ${9 + level}:55 hrs.`,
        topic: '24-Hour Clock Time'
      }
    ];
  }

  if (c <= 8) {
    const setLen = c + level - 3;
    const totalClub = 30 + level * 5;
    const chess = 18 + level * 2;
    const carrom = 16 + level * 3;
    const both = chess + carrom - totalClub;
    const diag1 = 10 + level * 2;
    const diag2 = 8 + c;
    const rhombArea = (diag1 * diag2) / 2;
    const nSide = 4 + level;
    const extAngle = 360 / nSide;

    return [
      {
        text: `In ${tag} Set Theory (Level ${level}), if universal union has ${totalClub} students (${chess} play Tennis, ${carrom} play Chess), how many play BOTH?`,
        options: [`${both - 2}`, `${both}`, `${both + 2}`, `${both + 4}`],
        correctIndex: 1,
        explanation: `n(T ∩ C) = ${chess} + ${carrom} − ${totalClub} = ${both}.`,
        topic: 'Sets & Venn Diagrams'
      },
      {
        text: `If Set X = {k ∈ N : 1 ≤ k ≤ ${setLen}} in ICSE Class ${c} Level ${level}, state its cardinal number n(X):`,
        options: [`${setLen - 1}`, `${setLen}`, `${setLen + 1}`, `${setLen + 2}`],
        correctIndex: 1,
        explanation: `Set X lists integers from 1 to ${setLen} inclusive, giving n(X) = ${setLen}.`,
        topic: 'Cardinal Number of Sets'
      },
      {
        text: `Find the area of a rhombus whose perpendicular diagonals measure ${diag1} cm and ${diag2} cm (ICSE Class ${c} Level ${level}).`,
        options: [`${rhombArea - 6} cm²`, `${rhombArea} cm²`, `${diag1 * diag2} cm²`, `${rhombArea + 12} cm²`],
        correctIndex: 1,
        explanation: `Area = ½ × ${diag1} × ${diag2} = ${rhombArea} cm².`,
        topic: 'Mensuration Quadrilaterals'
      },
      {
        text: `Each exterior angle of a regular ${nSide}-sided polygon studied in CISCE Class ${c} Level ${level} measures:`,
        options: [
          `${(extAngle - 5).toFixed(0)}°`,
          `${extAngle.toFixed(0)}°`,
          `${(extAngle + 10).toFixed(0)}°`,
          `180°`
        ],
        correctIndex: 1,
        explanation: `Exterior angle = 360° ÷ ${nSide} = ${extAngle.toFixed(0)}°.`,
        topic: 'Regular Polygons'
      },
      {
        text: `Factorise algebraic quadratic x² + ${2 * level + 3}x + ${level * (level + 3)} for ICSE Class ${c} Level ${level}:`,
        options: [
          `(x + ${level})(x + ${level + 3})`,
          `(x − ${level})(x + ${level + 3})`,
          `(x + ${level + 1})(x + ${level + 2})`,
          `(x − ${level})(x − ${level + 3})`
        ],
        correctIndex: 0,
        explanation: `Sum = ${level} + ${level + 3} = ${2 * level + 3} and product = ${level * (level + 3)}.`,
        topic: 'Quadratic Factorisation'
      },
      {
        text: `In direct proportion (CISCE Class ${c} Level ${level}), if ${level + 2} notebooks weigh ${(level + 2) * 150} g, what do ${level + 5} notebooks weigh?`,
        options: [
          `${(level + 5) * 150 - 75} g`,
          `${(level + 5) * 150} g`,
          `${(level + 5) * 150 + 150} g`,
          `${(level + 5) * 100} g`
        ],
        correctIndex: 1,
        explanation: `Weight per notebook = 150 g; ${level + 5} × 150 g = ${(level + 5) * 150} g.`,
        topic: 'Direct & Inverse Variation'
      },
      {
        text: `Calculate Compound Interest on ₹10,000 for 2 years at ${5 * level}% p.a. compounded annually in Class ${c} Level ${level} ICSE:`,
        options: [
          `₹${1000 * level + 25 * level * level - 50}`,
          `₹${1000 * level + 25 * level * level}`,
          `₹${1000 * level}`,
          `₹${1000 * level + 25 * level * level + 100}`
        ],
        correctIndex: 1,
        explanation: `CI = P[(1 + r/100)² − 1] = ₹${1000 * level + 25 * level * level}.`,
        topic: 'Compound Interest'
      },
      {
        text: `Simplify algebraic expansion (${level + 1}x − 2)² in CISCE Class ${c} Level ${level}:`,
        options: [
          `${(level + 1) ** 2}x² − ${4 * (level + 1)}x + 4`,
          `${(level + 1) ** 2}x² + ${4 * (level + 1)}x + 4`,
          `${(level + 1) ** 2}x² − 4`,
          `${level + 1}x² − 4x + 4`
        ],
        correctIndex: 0,
        explanation: `(ax − b)² = a²x² − 2abx + b².`,
        topic: 'Algebraic Expansions'
      },
      {
        text: `Find cube root of ${(level + 2) ** 3} in ICSE Class ${c} Level ${level} Arithmetic:`,
        options: [`${level + 1}`, `${level + 2}`, `${level + 3}`, `${(level + 2) * 2}`],
        correctIndex: 1,
        explanation: `${level + 2} × ${level + 2} × ${level + 2} = ${(level + 2) ** 3}.`,
        topic: 'Cubes and Cube Roots'
      },
      {
        text: `If ratio A : B = 3 : 4 and B : C = 4 : ${level + 5} in ICSE Class ${c} Level ${level}, state combined ratio A : B : C:`,
        options: [
          `3 : 4 : ${level + 5}`,
          `3 : 8 : ${level + 5}`,
          `4 : 3 : ${level + 5}`,
          `3 : 4 : ${level + 9}`
        ],
        correctIndex: 0,
        explanation: `Since common middle term B = 4 matches directly, A : B : C = 3 : 4 : ${level + 5}.`,
        topic: 'Ratio & Proportion'
      }
    ];
  }

  // ICSE Class 9 & Class 10 CISCE Mathematics (Commercial Math GST/Banking/Matrices/Factor Theorem/Trig)
  const price = 2000 * (level + (c === 10 ? 2 : 0));
  const cgst9 = (price * 9) / 100;
  const rdMonthly = 500 * level;
  const rdMonths = 12 + (c === 10 ? 12 : 0);
  const rdNProd = (rdMonths * (rdMonths + 1)) / 2;
  const matR = level + 1;
  const innerDim = level + 3;
  const matC = level + 5;
  const xMid = 2 * level;
  const yMid = 3 * level;
  const secVal = level * 4;
  const secPart = 2;
  const kVal = 4 + level;

  return [
    {
      text: `In ${tag} Commercial Mathematics Level ${level}, an item marked ₹${price} is billed intrastate with 18% GST. Compute the CGST (9%) amount.`,
      options: [`₹${cgst9 / 2}`, `₹${cgst9}`, `₹${cgst9 * 2}`, `₹${cgst9 + 250}`],
      correctIndex: 1,
      explanation: `CGST = 9% of ₹${price} = ₹${cgst9}.`,
      topic: 'GST Commercial Mathematics'
    },
    {
      text: `For a CISCE Recurring Deposit (Class ${c} Level ${level}) of ₹${rdMonthly}/month over ${rdMonths} months, find the qualifying n(n+1)/2 multiplier.`,
      options: [`${rdNProd - 12}`, `${rdNProd}`, `${rdNProd + 24}`, `${rdMonths * rdMonths}`],
      correctIndex: 1,
      explanation: `(${rdMonths} × ${rdMonths + 1}) / 2 = ${rdNProd}.`,
      topic: 'Banking (Recurring Deposit)'
    },
    {
      text: `Given matrices A (order ${matR} × ${innerDim}) and B (order ${innerDim} × ${matC}) in ICSE Class ${c} Level ${level}, state the order of product matrix AB:`,
      options: [
        `${innerDim} × ${innerDim}`,
        `${matR} × ${matC}`,
        `${matC} × ${matR}`,
        `${matR} × ${innerDim}`
      ],
      correctIndex: 1,
      explanation: `Multiplying (${matR} × ${innerDim}) by (${innerDim} × ${matC}) yields order (${matR} × ${matC}).`,
      topic: 'Matrices'
    },
    {
      text: `Using ICSE Factor Theorem (Class ${c} Level ${level}), find k if (x − 2) divides f(x) = x³ − kx + ${2 * level} exactly.`,
      options: [`${kVal - 2}`, `${kVal}`, `${kVal + 2}`, `${kVal + 4}`],
      correctIndex: 1,
      explanation: `f(2) = 0 ⇒ 8 − 2k + ${2 * level} = 0 ⇒ k = ${kVal}.`,
      topic: 'Remainder & Factor Theorem'
    },
    {
      text: `In CISCE Coordinate Geometry (Class ${c} Level ${level}), compute slope m of line joining (1, 2) and (${1 + xMid}, ${2 + yMid}):`,
      options: [`${yMid}/${xMid}`, `${xMid}/${yMid}`, `${yMid + 1}/${xMid}`, `−${yMid}/${xMid}`],
      correctIndex: 0,
      explanation: `m = (y₂ − y₁) / (x₂ − x₁) = ${yMid}/${xMid}.`,
      topic: 'Coordinate Slope'
    },
    {
      text: `From an external point P (Class ${c} Level ${level} Circle Tangents), secant PAB meets at PA = ${secPart} cm and PB = ${secVal * 2} cm. Length of tangent PT equals:`,
      options: [
        `√(${secPart * secVal * 2}) = ${Math.sqrt(secPart * secVal * 2).toFixed(2)} cm`,
        `${secVal + secPart} cm`,
        `${secVal * secPart} cm`,
        `${secVal} cm`
      ],
      correctIndex: 0,
      explanation: `PT² = PA × PB = ${secPart} × ${secVal * 2} = ${secPart * secVal * 2}, so PT = √${secPart * secVal * 2} ≈ ${Math.sqrt(secPart * secVal * 2).toFixed(2)} cm.`,
      topic: 'Circle Tangent-Secant Theorem'
    },
    {
      text: `Simplify ICSE Trigonometry identity (Class ${c} Level ${level}): (sin²θ + cos²θ) × ${level + 6} − 1 =`,
      options: [`${level + 4}`, `${level + 5}`, `${level + 6}`, `${level + 7}`],
      correctIndex: 1,
      explanation: `Since sin²θ + cos²θ = 1, 1 × ${level + 6} − 1 = ${level + 5}.`,
      topic: 'Trigonometric Identities'
    },
    {
      text: `Using Componendo-Dividendo (ICSE Ratio Class ${c} Level ${level}), if (a + b) : (a − b) = ${level + 3} : 1, find ratio a : b:`,
      options: [
        `${level + 4} : ${level + 2}`,
        `${level + 2} : ${level + 4}`,
        `${level + 3} : 1`,
        `1 : ${level + 3}`
      ],
      correctIndex: 0,
      explanation: `a / b = [(${level + 3} + 1)] / [(${level + 3} − 1)] = ${level + 4} / ${level + 2}.`,
      topic: 'Ratio & Proportion'
    },
    {
      text: `Evaluate compound growth after 2 years on ₹1,000 at ${10 * level}% annually (ICSE Class ${c} Level ${level} Compound Interest formula):`,
      options: [
        `₹${Math.round(1000 * (1 + 0.1 * level) ** 2) - 50}`,
        `₹${Math.round(1000 * (1 + 0.1 * level) ** 2)}`,
        `₹${1000 + 200 * level}`,
        `₹${Math.round(1000 * (1 + 0.1 * level) ** 2) + 100}`
      ],
      correctIndex: 1,
      explanation: `A = 1000 × (1 + ${0.1 * level})² = ₹${Math.round(1000 * (1 + 0.1 * level) ** 2)}.`,
      topic: 'Compound Interest'
    },
    {
      text: `In ICSE Class ${c} Level ${level} Probability, a spinner numbered 1 to ${8 + level} is spun once. Probability of landing on 1 is:`,
      options: [
        `1/${8 + level}`,
        `3/${8 + level}`,
        `5/${8 + level}`,
        `7/${8 + level}`
      ],
      correctIndex: 0,
      explanation: `One favourable sector out of ${8 + level} equal sectors gives 1/${8 + level}.`,
      topic: 'Probability'
    }
  ];
}

function makeIcseScienceSpecs(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const tag = CISCE_STAGE_TAG[c];

  // For Science, Environmental Studies, Environmental Education (all levels) or Physics/Chemistry/Biology Levels 2–4:
  // use the verified 40-question subject-pure master banks
  if (
    level >= 2 ||
    subject === 'Science' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    const raw = lookupMasterSubjectSpecs(classLevel, subject, level);
    return contextualizeIcseSpecs(classLevel, subject, level, raw);
  }

  const densityMass = (level + 2) * 39;
  const densityVol = 5 * (level + 2);
  const fForce = 15 * level;
  const distM = c <= 7 ? 2 : 3;

  if (subject === 'Physics') {
    const echoDist = ((level + 1) * 0.5 * 340) / 2;
    return [
      {
        text: `In ${tag} Physics, a metal block of mass ${densityMass} g displaces ${densityVol} cm³ of water. Compute its density.`,
        options: [`7.8 g/cm³`, `5.4 g/cm³`, `9.2 g/cm³`, `3.9 g/cm³`],
        correctIndex: 0,
        explanation: `Density = Mass / Volume = ${densityMass} / ${densityVol} = 7.8 g/cm³.`,
        topic: 'Density & Physical Quantities'
      },
      {
        text: `Calculate turning moment (torque) of a ${fForce} N perpendicular force applied at ${distM} m from pivot in CISCE Class ${c} Physics:`,
        options: [
          `${fForce * distM - 5} N·m`,
          `${fForce * distM} N·m`,
          `${fForce / distM} N·m`,
          `${fForce + distM} N·m`
        ],
        correctIndex: 1,
        explanation: `Moment = Force × perpendicular distance = ${fForce} × ${distM} = ${fForce * distM} N·m.`,
        topic: 'Moment of Force'
      },
      {
        text: `A swimmer hears her echo from a cliff ${(level + 1) * 0.5} seconds after shouting at sound speed 340 m/s (ICSE Class ${c} Physics). Distance to cliff is:`,
        options: [
          `${echoDist - 35} m`,
          `${echoDist} m`,
          `${echoDist + 45} m`,
          `${echoDist + 90} m`
        ],
        correctIndex: 1,
        explanation: `Distance d = (v × t) / 2 = (340 × ${(level + 1) * 0.5}) / 2 = ${echoDist} m.`,
        topic: 'Sound Waves & Echo'
      },
      {
        text: `In ICSE Class ${c} Physics, how much heat energy Q raises ${c - 4} kg of water (c = 4200 J/kg·K) by 10 K?`,
        options: [
          `${(c - 4) * 42000 - 4200} J`,
          `${(c - 4) * 42000} J`,
          `${(c - 4) * 4200} J`,
          `${(c - 4) * 84000} J`
        ],
        correctIndex: 1,
        explanation: `Q = m c ΔT = ${c - 4} × 4200 × 10 = ${(c - 4) * 42000} J.`,
        topic: 'Calorimetry'
      },
      {
        text: `According to CISCE Class ${c} Electricity, an appliance rated 1000 W running for ${c - 3} hours consumes how many kWh units?`,
        options: [`${c - 4} kWh`, `${c - 3} kWh`, `${(c - 3) * 10} kWh`, `0.5 kWh`],
        correctIndex: 1,
        explanation: `1000 W = 1 kW. Energy = 1 kW × ${c - 3} h = ${c - 3} kWh.`,
        topic: 'Household Electricity'
      },
      {
        text: `Under ICSE Class ${c} Optics, why does a swimming pool bottom appear shallower than its real depth?`,
        options: [
          'Refraction of light bending away from the normal from water to air',
          'Total black absorption inside chlorine water',
          'Magnetic levitation of bottom tiles',
          'Specular reflection from sand only'
        ],
        correctIndex: 0,
        explanation: `Light rays travelling from denser water into rarer air bend away from the normal, creating a raised virtual image.`,
        topic: 'Refraction of Light'
      },
      {
        text: `Which ideal mechanical machine law holds true for an ICSE Class ${c} pulley system with Velocity Ratio ${c - 3}?`,
        options: [
          'Efficiency = Mechanical Advantage / Velocity Ratio',
          'Effort always exceeds Load infinitely',
          'Friction multiplies output energy above 100%',
          'Velocity Ratio equals Zero'
        ],
        correctIndex: 0,
        explanation: `Efficiency η = MA / VR (and equals 100% only in an ideal frictionless machine).`,
        topic: 'Simple Machines & Pulleys'
      },
      {
        text: `In CISCE Class ${c} Physics, Fleming’s Left-Hand Rule predicts the direction of:`,
        options: [
          'Mechanical force acting on a current-carrying conductor in a magnetic field',
          'Gravitational orbital period of planets',
          'Specific heat of icebergs',
          'Surface tension in capillary tubes'
        ],
        correctIndex: 0,
        explanation: `Forefinger = Magnetic field, Centre finger = Current, Thumb = Motion/Force on conductor.`,
        topic: 'Electromagnetism'
      },
      {
        text: `Convert speed of ${18 * (c - 3)} km/h to m/s for ICSE Class ${c} Physics kinematics:`,
        options: [
          `${5 * (c - 3) - 2} m/s`,
          `${5 * (c - 3)} m/s`,
          `${10 * (c - 3)} m/s`,
          `${18 * (c - 3)} m/s`
        ],
        correctIndex: 1,
        explanation: `Multiply km/h by 5/18: ${18 * (c - 3)} × (5/18) = ${5 * (c - 3)} m/s.`,
        topic: 'Motion & Speed'
      },
      {
        text: `During beta (β⁻) radioactive emission in ICSE Class ${c} Physics, the daughter nucleus atomic number Z:`,
        options: [
          'Increases by +1 while mass number A remains unchanged',
          'Decreases by −2 while A drops by 4',
          'Drops to zero immediately',
          'Doubles mass number A'
        ],
        correctIndex: 0,
        explanation: `A neutron converts to a proton + electron (β⁻), raising Z by 1 with identical A.`,
        topic: 'Radioactivity'
      }
    ];
  }

  if (subject === 'Chemistry') {
    const moles = c - 4;
    return [
      {
        text: `In ${tag} Chemistry, compute the mass of ${moles} mole(s) of CO₂ (where C = 12, O = 16):`,
        options: [`${44 * moles - 12} g`, `${44 * moles} g`, `${28 * moles} g`, `${60 * moles} g`],
        correctIndex: 1,
        explanation: `Molar mass of CO₂ = 12 + 2(16) = 44 g/mol; ${moles} mol = ${44 * moles} g.`,
        topic: 'Mole Concept & Stoichiometry'
      },
      {
        text: `Under ICSE Class ${c} Analytical Chemistry, adding NH₄OH in excess to CuSO₄ solution forms a:`,
        options: [
          'Deep inky-blue soluble tetraamminecopper(II) complex solution',
          'Chalky yellow insoluble slag',
          'Brick-red iron oxide precipitate',
          'Colourless oily benzene layer'
        ],
        correctIndex: 0,
        explanation: `Pale blue Cu(OH)₂ dissolves in excess ammonia to form deep inky-blue [Cu(NH₃)₄]²⁺.`,
        topic: 'Analytical Chemistry'
      },
      {
        text: `Which industrial CISCE process studied in Class ${c} Chemistry synthesises ammonia (NH₃) from N₂ and H₂ over finely divided iron catalyst?`,
        options: ['Haber’s Process', 'Contact Process', 'Ostwald Process', 'Bayer’s Process'],
        correctIndex: 0,
        explanation: `Haber’s Process reacts N₂ + 3H₂ ⇌ 2NH₃ at 450°C and 200 atm over Fe catalyst.`,
        topic: 'Study of Compounds (NH₃)'
      },
      {
        text: `Identify the electrolyte acid added in trace drops during ICSE Class ${c} electrolysis of acidulated water:`,
        options: [
          'Dilute sulphuric acid (H₂SO₄)',
          'Kerosene oil',
          'Liquid paraffin wax',
          'Molten sucrose'
        ],
        correctIndex: 0,
        explanation: `Dilute H₂SO₄ supplies free H⁺ and SO₄²⁻ ions so water conducts current smoothly.`,
        topic: 'Electrolysis'
      },
      {
        text: `In CISCE Class ${c} Periodic Table trends, moving left to right across Period 2 (Li to F), atomic radius steadily:`,
        options: [
          'Decreases due to stronger nuclear pull on the same valence shell',
          'Doubles every atomic step',
          'Remains frozen regardless of protons',
          'Converts metals into noble liquids'
        ],
        correctIndex: 0,
        explanation: `Increasing effective nuclear charge pulls the valence electrons closer across a period.`,
        topic: 'Periodic Properties'
      },
      {
        text: `What organic homologous series carries functional group −COOH in ICSE Class ${c} Chemistry?`,
        options: [
          'Carboxylic acids (suffix -oic acid)',
          'Alkanes',
          'Aldehydes',
          'Alkyl halides'
        ],
        correctIndex: 0,
        explanation: `Carboxylic acids like ethanoic acid carry the −COOH carboxyl group.`,
        topic: 'Organic Chemistry IUPAC'
      },
      {
        text: `In Class ${c} ICSE Chemistry, which fountain-experiment gas turns moist red litmus paper sharply BLUE?`,
        options: ['Ammonia gas (NH₃)', 'Hydrogen chloride (HCl)', 'Sulphur dioxide (SO₂)', 'Chlorine gas'],
        correctIndex: 0,
        explanation: `Ammonia is strongly alkaline in water (NH₄OH), turning red litmus blue.`,
        topic: 'Alkaline Gases'
      },
      {
        text: `State the chemical composition of rust formed on moist iron bars studied in CISCE Class ${c} Chemistry:`,
        options: [
          'Hydrated iron(III) oxide (Fe₂O₃ · xH₂O)',
          'Pure copper carbonate',
          'Anhydrous sodium chloride',
          'Calcium sulphate dihydrate'
        ],
        correctIndex: 0,
        explanation: `Iron oxidises in humid air to hydrated ferric oxide.`,
        topic: 'Metallurgy & Corrosion'
      },
      {
        text: `According to Boyle’s and Charles’ Gas Laws in ICSE Class ${c} Chemistry, absolute zero temperature equals:`,
        options: ['0 K (−273.15°C)', '273 K', '−100°C', '100 K'],
        correctIndex: 0,
        explanation: `0 Kelvin corresponds to −273.15°C where ideal gas volume extrapolates to zero.`,
        topic: 'Gas Laws'
      },
      {
        text: `Which type of coordinate bond forms when an H⁺ ion accepts a lone electron pair from water (H₂O) to yield hydronium (H₃O⁺) in Class ${c} Chemistry?`,
        options: [
          'Dative (coordinate covalent) bond',
          'Ionic transfer bond',
          'Metallic lattice bond',
          'Van der Waals dispersion bond'
        ],
        correctIndex: 0,
        explanation: `Both shared electrons in the O→H⁺ bond originate from the oxygen atom’s lone pair.`,
        topic: 'Chemical Bonding'
      }
    ];
  }

  // Biology Level 1 (Classes 6–10)
  return [
    {
      text: `In ${tag} Biology, which specialised water-conducting vascular tissue carries dissolved mineral sap from root hairs up to green leaves?`,
      options: ['Xylem vessels', 'Sieve tubes of phloem', 'Collenchyma cortex', 'Cuticle epidermis'],
      correctIndex: 0,
      explanation: `Xylem transports water and mineral ions upward via transpiration pull.`,
      topic: 'Absorption by Roots'
    },
    {
      text: `Under CISCE Class ${c} Genetics, Mendel’s dihybrid F₂ generation phenotypic ratio is:`,
      options: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '2 : 1'],
      correctIndex: 0,
      explanation: `Independent assortment of two traits yields 9:3:3:1 phenotypic ratio in F₂.`,
      topic: 'Genetics & Mendel Laws'
    },
    {
      text: `In ICSE Class ${c} Biology, during which phase of mitosis do sister chromatids align squarely along the equatorial metaphase plate?`,
      options: ['Metaphase', 'Anaphase', 'Telophase', 'Interphase G1'],
      correctIndex: 0,
      explanation: `Chromosomes line up on the equator during Metaphase before separating in Anaphase.`,
      topic: 'Cell Cycle & Mitosis'
    },
    {
      text: `Which light-independent dark reaction cycle studied in CISCE Class ${c} Biology fixes CO₂ into glucose inside chloroplast stroma?`,
      options: ['Calvin Cycle', 'Krebs Oxidation', 'Glycolysis', 'Ornithine Urea Cycle'],
      correctIndex: 0,
      explanation: `Calvin cycle reactions reduce CO₂ to sugar inside chloroplast stroma.`,
      topic: 'Photosynthesis'
    },
    {
      text: `In ICSE Class ${c} Biology, which heart valve prevents backflow of oxygenated blood from the left ventricle into the left atrium?`,
      options: [
        'Bicuspid (Mitral) valve',
        'Tricuspid valve',
        'Pulmonary semilunar valve',
        'Epiglottis flap'
      ],
      correctIndex: 0,
      explanation: `The left atrioventricular opening is guarded by the bicuspid (mitral) valve.`,
      topic: 'Human Circulatory System'
    },
    {
      text: `Which pituitary endocrine hormone studied in CISCE Class ${c} Biology increases water reabsorption in kidney distal tubules?`,
      options: ['ADH (Vasopressin)', 'Glucagon', 'Calcitonin', 'Melatonin'],
      correctIndex: 0,
      explanation: `Antidiuretic hormone (ADH) regulates urine concentration and water balance.`,
      topic: 'Endocrine & Excretory System'
    },
    {
      text: `How is the fluid filling the eyeball behind the lens labelled in ICSE Class ${c} Biology Sense Organs?`,
      options: ['Vitreous humour', 'Synovial fluid', 'Pericardial lymph', 'Bile emulsion'],
      correctIndex: 0,
      explanation: `Vitreous humour maintains spherical shape and presses retina evenly against choroid.`,
      topic: 'Human Eye & Nervous System'
    },
    {
      text: `In Class ${c} ICSE Biology, plasmolysis occurs when a turgid plant cell is placed inside a:`,
      options: [
        'Concentrated hypertonic salt/sugar solution causing exosmosis',
        'Distilled hypotonic pure water bath',
        'Warm sunlight vacuum chamber',
        'Isotonic nutrient broth'
      ],
      correctIndex: 0,
      explanation: `Water moves outward by exosmosis, shrinking protoplast away from cell wall.`,
      topic: 'Osmosis & Turgidity'
    },
    {
      text: `Which outer double membrane envelops human lungs inside the thoracic cavity (ICSE Class ${c} Biology)?`,
      options: ['Pleura', 'Pericardium', 'Meninges', 'Periosteum'],
      correctIndex: 0,
      explanation: `Pleural membranes with pleural fluid cushion lung expansion.`,
      topic: 'Respiration'
    },
    {
      text: `In CISCE Class ${c} Biology, the red blood cell iron-protein molecule that binds oxygen reversibly is:`,
      options: ['Haemoglobin', 'Fibrinogen', 'Keratin', 'Myosin'],
      correctIndex: 0,
      explanation: `Haemoglobin forms oxyhaemoglobin in alveolar capillaries.`,
      topic: 'Blood Physiology'
    }
  ];
}

function makeGenericIcseSpecs(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  const tag = CISCE_STAGE_TAG[c];

  // Primary classes (1 to 5) Computer Studies -> use age-appropriate Primary Computer Studies bank
  if ((subject === 'Computer Studies' || subject === 'Computer Knowledge') && c <= 5) {
    const raw = lookupMasterSubjectSpecs(classLevel, 'Computer Studies', level);
    return contextualizeIcseSpecs(classLevel, subject, level, raw);
  }

  // Levels 2–4 for all subjects, plus all 4 levels of History & Civics, Social Studies, Geography, Economics,
  // Commercial Studies, General Knowledge, Logical Reasoning, Moral Education, Vocabulary and Grammar,
  // Drawing and Creative Activities, Physical Education -> use the 40-question subject-pure master banks
  if (
    level >= 2 ||
    (subject !== 'Computer Applications' &&
      subject !== 'Computer Studies' &&
      subject !== 'English' &&
      subject !== 'Hindi')
  ) {
    const raw = lookupMasterSubjectSpecs(classLevel, subject, level);
    return contextualizeIcseSpecs(classLevel, subject, level, raw);
  }

  if (subject === 'Computer Applications' || subject === 'Computer Studies') {
    const numA = c + level * 2;
    const numB = level + 2;
    const rem = (numA * numB) % 5;
    return [
      {
        text: `In ${tag} ${subject}, evaluate the Java arithmetic remainder expression: (${numA} * ${numB}) % 5`,
        options: [`${rem}`, `${rem + 1}`, `${rem + 2}`, `${rem + 3}`],
        correctIndex: 0,
        explanation: `Modulus operator % returns the integer remainder of (${numA} × ${numB}) = ${numA * numB} divided by 5 → ${rem}.`,
        topic: 'Operators & Expressions'
      },
      {
        text: `How many bytes of memory does Java primitive "double" occupy in ICSE Class ${c} ${subject}?`,
        options: ['8 bytes (64 bits)', '2 bytes (16 bits)', '4 bytes (32 bits)', '1 byte (8 bits)'],
        correctIndex: 0,
        explanation: `Java double stores 64-bit IEEE 754 floating-point values (8 bytes).`,
        topic: 'Java Data Types'
      },
      {
        text: `In CISCE Class ${c} ${subject}, which Java OOP keyword creates a dynamic object instance of a Class in heap memory?`,
        options: ['new', 'static', 'void', 'break'],
        correctIndex: 0,
        explanation: `The "new" operator allocates memory and invokes the class constructor.`,
        topic: 'Classes & Objects'
      },
      {
        text: `Determine the return value of Math.ceil(${c + 0.2}) in ICSE Class ${c} ${subject} Library Methods:`,
        options: [`${c + 1}.0`, `${c}.0`, `${c + 0.5}`, `${c + 2}.0`],
        correctIndex: 0,
        explanation: `Math.ceil() rounds upward to the smallest mathematical integer ≥ argument: ${c + 1}.0.`,
        topic: 'Java Math Class'
      },
      {
        text: `What does Java String expression "CISCE_ICSE".length() return in Grade ${c} ${subject}?`,
        options: ['10', '9', '8', '11'],
        correctIndex: 0,
        explanation: `C-I-S-C-E-_-I-C-S-E contains 10 characters.`,
        topic: 'String Manipulation'
      },
      {
        text: `Which access specifier in ICSE Class ${c} ${subject} restricts class data fields so external classes cannot alter them directly?`,
        options: ['private', 'public', 'global', 'open'],
        correctIndex: 0,
        explanation: `Marking instance variables "private" enforces strict data hiding / encapsulation.`,
        topic: 'Access Specifiers'
      },
      {
        text: `In a Java single-dimensional array int a[] = new int[${5 + c}] (ICSE Class ${c} ${subject}), what is the valid index range?`,
        options: [`0 to ${4 + c}`, `1 to ${5 + c}`, `0 to ${5 + c}`, `−1 to ${4 + c}`],
        correctIndex: 0,
        explanation: `Zero-based indexing runs from 0 through length − 1 (${4 + c}).`,
        topic: 'Arrays & Indexing'
      },
      {
        text: `Which loop executes its body AT LEAST ONCE before evaluating the termination condition (Class ${c} ${subject})?`,
        options: ['do-while loop', 'while loop', 'for loop', 'if-else block'],
        correctIndex: 0,
        explanation: `do-while is an exit-controlled loop running once before condition testing.`,
        topic: 'Iterative Loops'
      },
      {
        text: `What binary representation matches decimal integer ${8 + c} in ICSE Class ${c} ${subject}?`,
        options: [
          `(${(8 + c).toString(2)})₂`,
          `(11111)₂`,
          `(100001)₂`,
          `(0101)₂`
        ],
        correctIndex: 0,
        explanation: `Converting ${8 + c} base-10 by repeated division by 2 yields ${(8 + c).toString(2)}.`,
        topic: 'Number Systems'
      },
      {
        text: `In CISCE Class ${c} ${subject} Overloading, two constructors or methods share the same name inside one class by differing in:`,
        options: [
          'Number, order, or data types of parameters (signature)',
          'Brace indentation colour only',
          'Return comment text',
          'Filename extension'
        ],
        correctIndex: 0,
        explanation: `Polymorphic method/constructor overloading resolves calls by distinct parameter lists.`,
        topic: 'Function Overloading'
      }
    ];
  }

  if (subject === 'English') {
    return [
      {
        text: `${tag} English Paper 1 (Drill 1): Choose the sentence demonstrating accurate CISCE Class ${c} synthesis with "Despite":`,
        options: [
          `Despite heavy monsoon showers, the Class ${c} science symposium proceeded on schedule.`,
          `Despite of heavy monsoon showers, the science symposium proceeded.`,
          `Despite that heavy monsoon showers, the symposium was proceeded.`,
          `Despite heavy showers, yet the symposium proceeded on schedule.`
        ],
        correctIndex: 0,
        explanation: `"Despite" is never followed by "of" or paired with "yet".`,
        topic: 'Sentence Transformation'
      },
      {
        text: `${tag} English Paper 1 (Drill 2): Choose the sentence demonstrating accurate CISCE Class ${c} preposition usage with "accustomed":`,
        options: [
          `Our Grade ${c} debating society is accustomed to rigorous parliamentary rebuttals.`,
          `Our debating society is accustomed with rigorous parliamentary rebuttals.`,
          `Our debating society is accustomed from rigorous rebuttals.`,
          `Our debating society is accustomed by rigorous rebuttals.`
        ],
        correctIndex: 0,
        explanation: `The adjective "accustomed" takes the preposition "to".`,
        topic: 'Prepositions'
      },
      {
        text: `${tag} English Paper 1 (Drill 3): Choose the sentence demonstrating accurate CISCE Class ${c} past perfect tense sequence:`,
        options: [
          `By the time the examiner arrived, every Class ${c} candidate had verified their roll number.`,
          `By the time the examiner arrived, every candidate has verify their roll number.`,
          `By the time the examiner arrives, every candidate had verifying roll numbers.`,
          `By the time the examiner arrived, every candidate will have verify their roll number.`
        ],
        correctIndex: 0,
        explanation: `An action completed before another past action uses the Past Perfect ("had verified").`,
        topic: 'Sequence of Tenses'
      },
      {
        text: `${tag} English Paper 1 (Drill 4): Choose the sentence demonstrating accurate CISCE Class ${c} indirect/reported speech:`,
        options: [
          `The principal reminded the Class ${c} candidates that they were to submit neat scripts.`,
          `The principal reminded the candidates that you are submitting neat scripts tomorrow.`,
          `The principal reminded to candidates that they must submitted neat scripts.`,
          `The principal told that candidates are to submitted neat scripts.`
        ],
        correctIndex: 0,
        explanation: `Reported speech shifts pronouns and present tense verbs into the corresponding past form.`,
        topic: 'Direct & Indirect Speech'
      },
      {
        text: `${tag} English Paper 1 (Drill 5): Choose the sentence demonstrating accurate CISCE Class ${c} conditional inversion ("Had..."):`,
        options: [
          `Had he revised the Class ${c} specimen paper thoroughly, he would have scored full marks.`,
          `Had he revised the specimen paper, he will score full marks.`,
          `Had he revise the specimen paper, he would have scoring full marks.`,
          `If had he revised the specimen paper, he would scored full marks.`
        ],
        correctIndex: 0,
        explanation: `Third conditional inversion ("Had + subject + past participle") pairs with "would have + past participle".`,
        topic: 'Conditional Sentences'
      },
      {
        text: `${tag} English Paper 1 (Drill 6): Choose the sentence demonstrating accurate CISCE Class ${c} passive voice construction:`,
        options: [
          `Valuable historical artefacts were preserved carefully by the Class ${c} museum club.`,
          `Valuable historical artefacts was preserving carefully by the museum club.`,
          `Valuable historical artefacts were preserve by the museum club.`,
          `Valuable historical artefacts has been preserved by the museum club.`
        ],
        correctIndex: 0,
        explanation: `Plural subject "artefacts" takes "were + past participle (preserved)" in past passive.`,
        topic: 'Active & Passive Voice'
      },
      {
        text: `${tag} English Paper 1 (Drill 7): Choose the sentence demonstrating an accurate CISCE Class ${c} question tag:`,
        options: [
          `None of the Class ${c} spectators left the auditorium early, did they?`,
          `None of the spectators left the auditorium early, didn't they?`,
          `None of the spectators left the auditorium early, isn't it?`,
          `None of the spectators left the auditorium early, did he?`
        ],
        correctIndex: 0,
        explanation: `A negative pronoun ("None") in the main clause takes a positive question tag ("did they?").`,
        topic: 'Question Tags'
      },
      {
        text: `${tag} English Paper 1 (Drill 8): Choose the sentence demonstrating accurate CISCE Class ${c} bare infinitive usage after a verb of perception:`,
        options: [
          `The Class ${c} coach watched the sprinters cross the finish ribbon cleanly.`,
          `The coach watched the sprinters to crossed the finish ribbon cleanly.`,
          `The coach watched the sprinters for crossing the finish ribbon.`,
          `The coach watched the sprinters had crossed the finish ribbon.`
        ],
        correctIndex: 0,
        explanation: `Verbs of perception ("watch", "see", "hear") take the bare infinitive ("cross") for a complete action.`,
        topic: 'Infinitives & Participles'
      },
      {
        text: `${tag} English Paper 1 (Drill 9): Choose the sentence demonstrating accurate CISCE Class ${c} subject-verb concord with "Neither...nor":`,
        options: [
          `Neither the Class ${c} captain nor her teammates are forfeiting tomorrow’s tie.`,
          `Neither the captain nor her teammates is forfeiting tomorrow’s tie.`,
          `Neither the captain or her teammates was forfeiting tomorrow’s tie.`,
          `Neither the captain nor her teammates has forfeiting tomorrow’s tie.`
        ],
        correctIndex: 0,
        explanation: `With "Neither...nor", the verb agrees in number with the nearer subject ("teammates" → "are").`,
        topic: 'Subject-Verb Agreement'
      },
      {
        text: `${tag} English Paper 1 (Drill 10): Choose the sentence using the idiom "a feather in one's cap" accurately for CISCE Class ${c}:`,
        options: [
          `Winning the Class ${c} inter-school literary shield was a feather in her cap.`,
          `Losing the notebook carelessly was a feather in her cap.`,
          `Postponing the examination due to rain was a feather in the cap.`,
          `Breaking the laboratory beaker was a feather in her cap.`
        ],
        correctIndex: 0,
        explanation: `"A feather in one's cap" means a proud achievement or honour to be proud of.`,
        topic: 'Idioms & Phrasal Verbs'
      }
    ];
  }

  // Hindi Level 1
  const words = ['ईमानदारी', 'विद्वान', 'शीतल', 'उन्नति', 'प्रकाश', 'दयालु', 'प्राचीन', 'मधुर', 'साहसी', 'स्वच्छ'];
  const correctAns = [
    'भाववाचक संज्ञा (ईमानदार विशेषण से निर्मित)',
    'विदुषी (शुद्ध स्त्रीलिंग रूप)',
    'उष्ण (सटीक विलोम शब्द)',
    'अवनति (सटीक विलोम शब्द)',
    'अंधकार (विपरीतार्थक शब्द)',
    'निर्दय / क्रूर (विलोम शब्द)',
    'नवीन / अर्वाचीन (विलोम शब्द)',
    'कटु / कर्कश (विलोम शब्द)',
    'कायर / भीरु (विलोम शब्द)',
    'निर्मल / साफ़ (पर्यायवाची शब्द)'
  ];
  return words.map((word, idx) => ({
    text: `${tag} हिंदी पाठ्यक्रम (अभ्यास ${idx + 1}): कक्षा ${c} ICSE मानक के अनुसार "${word}" शब्द का सटीक व्याकरणिक रूप चुनिए:`,
    options: [
      correctAns[idx],
      `अशुद्ध वर्तनी रूप (${word}-ता)`,
      `असंगत क्रिया-विशेषण प्रयोग`,
      `त्रुटिपूर्ण कारक-विभक्ति रूप`
    ],
    correctIndex: 0,
    explanation: `ICSE हिंदी व्याकरण कक्षा ${c} के मानकों के अनुसार "${word}" के लिए "${correctAns[idx]}" पूर्णतः शुद्ध उत्तर है।`,
    topic: 'हिंदी भाषा एवं व्याकरण'
  }));
}

export function getIcseSubjectQuestions(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] {
  const c = clsNum(classLevel);
  if (subject === 'Mathematics') {
    return makeIcseMathSpecs(c, level);
  }
  if (
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Science' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    return makeIcseScienceSpecs(classLevel, subject, level);
  }
  return makeGenericIcseSpecs(classLevel, subject, level);
}
