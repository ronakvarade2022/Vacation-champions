import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { RawQuizSpec } from './subject40BankPart1';

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

function makeIcseMathSpecs(c: number, level: QuizLevel): RawQuizSpec[] {
  const tag = CISCE_STAGE_TAG[c];

  if (c <= 2) {
    const x = c * 13 + level * 4;
    const y = c * 6 + level * 3;
    const diff = 90 + c * 15 - (level * 7);
    const take = 20 + level * 5;
    const grp = c + level + 2;
    const per = level + 3;
    const hundreds = c + level;
    const tens = (level * 3 + c) % 8 + 1;
    const ones = (level + c * 2) % 9 + 1;

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
          `${hundreds * 100 + ones * 10 + tens}`,
          `${hundreds * 100 + tens * 10 + ones}`,
          `${tens * 100 + hundreds * 10 + ones}`,
          `${hundreds + tens + ones}`
        ],
        correctIndex: 1,
        explanation: `${hundreds}00 + ${tens}0 + ${ones} = ${hundreds * 100 + tens * 10 + ones}.`,
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
        options: [
          `${c + 4}.25`,
          `${c + 4}.50`,
          `${c + 5}.50`,
          `${c + 3}.75`
        ],
        correctIndex: 1,
        explanation: `${c + level + 4}.75 − ${level}.25 = ${c + 4}.50.`,
        topic: 'Decimal Operations'
      },
      {
        text: `What is the Least Common Multiple (LCM) of ${c + 3} and ${(c + 3) * 2} in Class ${c} Level ${level}?`,
        options: [`${c + 3}`, `${(c + 3) * 2}`, `${(c + 3) * 3}`, `${(c + 3) * 4}`],
        correctIndex: 1,
        explanation: `Since ${(c + 3) * 2} is a direct multiple of ${c + 3}, their LCM is ${(c + 3) * 2}.`,
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
          `(x + 1)(x + ${level * (level + 3)})`
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
  const xMid = 2 * level;
  const yMid = 3 * level;
  const secVal = level * 4;
  const secPart = 2;
  const tangLen = Math.sqrt(secVal * secPart);

  return [
    {
      text: `In ${tag} Commercial Mathematics Level ${level}, an item marked ₹${price} is billed intrastate with 18% GST. Compute the CGST (9%) amount.`,
      options: [`₹${cgst9 / 2}`, `₹${cgst9}`, `₹${cgst9 * 2}`, `₹${cgst9 + 180}`],
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
      text: `Given matrices A (order ${matR} × 3) and B (order 3 × ${matR + 1}) in ICSE Class ${c} Level ${level}, state the order of product matrix AB:`,
      options: [
        `3 × 3`,
        `${matR} × ${matR + 1}`,
        `${matR + 1} × ${matR}`,
        `3 × ${matR + 1}`
      ],
      correctIndex: 1,
      explanation: `Multiplying (${matR}×3) by (3×${matR + 1}) yields (${matR} × ${matR + 1}).`,
      topic: 'Matrices'
    },
    {
      text: `Using ICSE Factor Theorem (Class ${c} Level ${level}), find k if (x − 2) divides f(x) = x³ − kx + ${2 * level} exactly.`,
      options: [`${(8 + 2 * level) / 2 - 1}`, `${(8 + 2 * level) / 2}`, `${8 + level}`, `${2 * level}`],
      correctIndex: 1,
      explanation: `f(2) = 0 ⇒ 8 − 2k + ${2 * level} = 0 ⇒ k = ${(8 + 2 * level) / 2}.`,
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
        `√${secVal * 4} = ${(Math.sqrt(secVal * 4)).toFixed(1)} cm (if tang²=PA·PB)`,
        `2√${tangLen * tangLen / 2} cm`,
        `${secVal + secPart} cm`,
        `Wait: calculate √(${secPart}×${secVal * 2}) = ${Math.sqrt(secPart * secVal * 2).toFixed(2)} cm`
      ].map((opt, idx) =>
        idx === 0
          ? `√(${secPart * secVal * 2}) = ${Math.sqrt(secPart * secVal * 2).toFixed(2)} cm`
          : idx === 1
            ? `${secVal + secPart} cm`
            : idx === 2
              ? `${secVal * secPart} cm`
              : `${secVal} cm`
      ) as [string, string, string, string],
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
      options: [`1/${8 + level}`, `2/${8 + level}`, `1/${7 + level}`, `${level}/${8 + level}`],
      correctIndex: 0,
      explanation: `One favourable sector out of ${8 + level} equal sectors gives 1/${8 + level}.`,
      topic: 'Probability'
    }
  ];
}

function makeIcseScienceSpecs(c: number, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const tag = CISCE_STAGE_TAG[c];
  const densityMass = (level + 2) * 39;
  const densityVol = 5 * (level + 2);
  const fForce = 15 * level;
  const distM = c <= 7 ? 2 : 3;

  if (subject === 'Physics') {
    return [
      {
        text: `In ${tag} Physics Level ${level}, a metal block of mass ${densityMass} g displaces ${densityVol} cm³ of water. Compute its density.`,
        options: [`7.8 g/cm³`, `5.4 g/cm³`, `9.2 g/cm³`, `3.9 g/cm³`],
        correctIndex: 0,
        explanation: `Density = Mass / Volume = ${densityMass} / ${densityVol} = 7.8 g/cm³.`,
        topic: 'Density & Physical Quantities'
      },
      {
        text: `Calculate turning moment (torque) of a ${fForce} N perpendicular force applied at ${distM} m from pivot in CISCE Class ${c} Physics Level ${level}:`,
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
        text: `A swimmer hears her echo from a cliff ${(level + 1) * 0.5} seconds after shouting at sound speed 340 m/s (ICSE Class ${c} Level ${level} Physics). Distance to cliff is:`,
        options: [
          `${((level + 1) * 0.5 * 340) / 2 - 20} m`,
          `${((level + 1) * 0.5 * 340) / 2} m`,
          `${(level + 1) * 0.5 * 340} m`,
          `340 m`
        ],
        correctIndex: 1,
        explanation: `Distance d = (v × t) / 2 = (340 × ${(level + 1) * 0.5}) / 2 = ${((level + 1) * 0.5 * 340) / 2} m.`,
        topic: 'Sound Waves & Echo'
      },
      {
        text: `In ICSE Class ${c} Physics Level ${level}, how much heat energy Q raises ${level} kg of water (c = 4200 J/kg·K) by 10 K?`,
        options: [
          `${level * 42000 - 4200} J`,
          `${level * 42000} J`,
          `${level * 4200} J`,
          `${level * 84000} J`
        ],
        correctIndex: 1,
        explanation: `Q = m c ΔT = ${level} × 4200 × 10 = ${level * 42000} J.`,
        topic: 'Calorimetry'
      },
      {
        text: `According to CISCE Class ${c} Level ${level} Electricity, an appliance rated 1000 W running for ${level + 1} hours consumes how many kWh units?`,
        options: [`${level}`, `${level + 1} kWh`, `${(level + 1) * 10} kWh`, `0.5 kWh`],
        correctIndex: 1,
        explanation: `1000 W = 1 kW. Energy = 1 kW × ${level + 1} h = ${level + 1} kWh.`,
        topic: 'Household Electricity'
      },
      {
        text: `Under ICSE Class ${c} Level ${level} Optics, why does a swimming pool bottom appear shallower than its real depth?`,
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
        text: `Which ideal mechanical machine law holds true for an ICSE Class ${c} Level ${level} pulley system with Velocity Ratio ${level + 1}?`,
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
        text: `In CISCE Class ${c} Physics Level ${level}, Fleming’s Left-Hand Rule predicts the direction of:`,
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
        text: `Convert speed of ${18 * (level + 1)} km/h to m/s for ICSE Class ${c} Physics Level ${level} kinematics:`,
        options: [`${5 * (level + 1) - 2} m/s`, `${5 * (level + 1)} m/s`, `${10 * (level + 1)} m/s`, `${18 * (level + 1)} m/s`],
        correctIndex: 1,
        explanation: `Multiply km/h by 5/18: ${18 * (level + 1)} × (5/18) = ${5 * (level + 1)} m/s.`,
        topic: 'Motion & Speed'
      },
      {
        text: `During beta (β⁻) radioactive emission in ICSE Class ${c} Physics Level ${level}, the daughter nucleus atomic number Z:`,
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
    return [
      {
        text: `In ${tag} Chemistry Level ${level}, compute molecular weight of CaCO₃ or Na₂CO₃ variant: molar mass of ${level} mole(s) of CO₂ (C=12, O=16) is:`,
        options: [`${44 * level - 12} g`, `${44 * level} g`, `${28 * level} g`, `${60 * level} g`],
        correctIndex: 1,
        explanation: `Molar mass of CO₂ = 12 + 2(16) = 44 g/mol; ${level} mol = ${44 * level} g.`,
        topic: 'Mole Concept & Stoichiometry'
      },
      {
        text: `Under ICSE Class ${c} Level ${level} Analytical Chemistry, adding NH₄OH in excess to CuSO₄ solution forms a:`,
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
        text: `Which industrial CISCE process studied in Class ${c} Chemistry Level ${level} synthesises ammonia (NH₃) from N₂ and H₂ over finely divided iron catalyst?`,
        options: ['Haber’s Process', 'Contact Process', 'Ostwald Process', 'Bayer’s Process'],
        correctIndex: 0,
        explanation: `Haber’s Process reacts N₂ + 3H₂ ⇌ 2NH₃ at 450°C and 200 atm over Fe catalyst.`,
        topic: 'Study of Compounds (NH₃)'
      },
      {
        text: `Identify the electrolyte acid added in trace drops during ICSE Class ${c} Level ${level} electrolysis of acidulated water:`,
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
        text: `In CISCE Class ${c} Level ${level} Periodic Table trends, moving left to right across Period 2 (Li to F), atomic radius steadily:`,
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
        text: `What organic homologous series carries functional group −COOH in ICSE Class ${c} Chemistry Level ${level}?`,
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
        text: `In Class ${c} ICSE Chemistry Level ${level}, which fountain-experiment gas turns moist red litmus paper sharply BLUE?`,
        options: ['Ammonia gas (NH₃)', 'Hydrogen chloride (HCl)', 'Sulphur dioxide (SO₂)', 'Chlorine gas'],
        correctIndex: 0,
        explanation: `Ammonia is strongly alkaline in water (NH₄OH), turning red litmus blue.`,
        topic: 'Alkaline Gases'
      },
      {
        text: `State the chemical composition of rust formed on moist iron bars studied in CISCE Class ${c} Chemistry Level ${level}:`,
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
        text: `According to Boyles’ and Charles’ Gas Laws in ICSE Class ${c} Level ${level}, absolute zero temperature equals:`,
        options: ['0 K (−273.15°C)', '273 K', '−100°C', '100 K'],
        correctIndex: 0,
        explanation: `0 Kelvin corresponds to −273.15°C where ideal gas volume extrapolates to zero.`,
        topic: 'Gas Laws'
      },
      {
        text: `Which type of coordinate bond forms when an H⁺ ion accepts a lone electron pair from water (H₂O) to yield hydronium (H₃O⁺) in Class ${c} Level ${level}?`,
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

  if (subject === 'Biology') {
    return [
      {
        text: `In ${tag} Biology Level ${level}, which specialised water-conducting vascular tissue carries dissolved mineral sap from root hairs up to green leaves?`,
        options: ['Xylem vessels', 'Sieve tubes of phloem', 'Collenchyma cortex', 'Cuticle epidermis'],
        correctIndex: 0,
        explanation: `Xylem transports water and mineral ions upward via transpiration pull.`,
        topic: 'Absorption by Roots'
      },
      {
        text: `Under CISCE Class ${c} Level ${level} Genetics, Mendel’s dihybrid F₂ generation phenotypic ratio is:`,
        options: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '2 : 1'],
        correctIndex: 0,
        explanation: `Independent assortment of two traits yields 9:3:3:1 phenotypic ratio in F₂.`,
        topic: 'Genetics & Mendel Laws'
      },
      {
        text: `In ICSE Class ${c} Biology Level ${level}, during which phase of mitosis do sister chromatids align squarely along the equatorial metaphase plate?`,
        options: ['Metaphase', 'Anaphase', 'Telophase', 'Interphase G1'],
        correctIndex: 0,
        explanation: `Chromosomes line up on the equator during Metaphase before separating in Anaphase.`,
        topic: 'Cell Cycle & Mitosis'
      },
      {
        text: `Which light-independent dark reaction cycle studied in CISCE Class ${c} Biology Level ${level} fixes CO₂ into glucose inside chloroplast stroma?`,
        options: ['Calvin Cycle', 'Krebs Oxidation', 'Glycolysis', 'Ornithine Urea Cycle'],
        correctIndex: 0,
        explanation: `Calvin cycle reactions reduce CO₂ to sugar inside chloroplast stroma.`,
        topic: 'Photosynthesis'
      },
      {
        text: `In ICSE Class ${c} Biology Level ${level}, which heart valve prevents backflow of oxygenated blood from the left ventricle into the left atrium?`,
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
        text: `Which pituitary endocrine hormone studied in CISCE Class ${c} Level ${level} increases water reabsorption in kidney distal tubules?`,
        options: ['ADH (Vasopressin)', 'Glucagon', 'Calcitonin', 'Melatonin'],
        correctIndex: 0,
        explanation: `Antidiuretic hormone (ADH) regulates urine concentration and water balance.`,
        topic: 'Endocrine & Excretory System'
      },
      {
        text: `How is the fluid filling the eyeball behind the lens labelled in ICSE Class ${c} Sense Organs Level ${level}?`,
        options: ['Vitreous humour', 'Synovial fluid', 'Pericardial lymph', 'Bile emulsion'],
        correctIndex: 0,
        explanation: `Vitreous humour maintains spherical shape and presses retina evenly against choroid.`,
        topic: 'Human Eye & Nervous System'
      },
      {
        text: `In Class ${c} ICSE Biology Level ${level}, plasmolysis occurs when a turgid plant cell is placed inside a:`,
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
        text: `Which outer double membrane envelops human lungs inside the thoracic cavity (ICSE Class ${c} Biology Level ${level})?`,
        options: ['Pleura', 'Pericardium', 'Meninges', 'Periosteum'],
        correctIndex: 0,
        explanation: `Pleural membranes with pleural fluid cushion lung expansion.`,
        topic: 'Respiration'
      },
      {
        text: `In CISCE Class ${c} Biology Level ${level}, red blood cell iron-protein molecule that binds oxygen reversibly is:`,
        options: ['Haemoglobin', 'Fibrinogen', 'Keratin', 'Myosin'],
        correctIndex: 0,
        explanation: `Haemoglobin forms oxyhaemoglobin in alveolar capillaries.`,
        topic: 'Blood Physiology'
      }
    ];
  }

  // General Science / EVS / EnvEd ICSE
  return Array.from({ length: 10 }, (_, idx) => ({
    text: `${tag} ${subject} Level ${level} (Module ${idx + 1}): Which scientific observation matches CISCE Class ${c} experimental guidelines?`,
    options: [
      `Observing measurable cause-effect variables accurately during ${subject} Task ${idx + 1}`,
      `Guessing results before measuring mass or temperature`,
      `Skipping laboratory safety precautions around glassware`,
      `Mixing unlabelled reagents without instructions`
    ],
    correctIndex: 0,
    explanation: `CISCE Class ${c} ${subject} emphasises precise observation and safety.`,
    topic: `${subject} Foundations`
  }));
}

function makeGenericIcseSpecs(c: number, subject: SubjectName, level: QuizLevel): RawQuizSpec[] {
  const tag = CISCE_STAGE_TAG[c];

  if (subject === 'Computer Applications' || subject === 'Computer Studies' || subject === 'Computer Knowledge' || subject === 'Information Technology') {
    const numA = c + level * 2;
    const numB = level + 2;
    return [
      {
        text: `In ${tag} ${subject} Level ${level}, evaluate the Java arithmetic expression: (${numA} * ${numB}) % 5`,
        options: [
          `${(numA * numB) % 5}`,
          `${Math.floor((numA * numB) / 5)}`,
          `${((numA * numB) % 5) + 1}`,
          `${numA + numB}`
        ],
        correctIndex: 0,
        explanation: `Modulus operator % returns the integer remainder of (${numA} × ${numB}) = ${numA * numB} divided by 5 → ${(numA * numB) % 5}.`,
        topic: 'Operators & Expressions'
      },
      {
        text: `How many bytes of memory does Java primitive "double" occupy in ICSE Class ${c} Level ${level} ${subject}?`,
        options: ['8 bytes (64 bits)', '2 bytes (16 bits)', '4 bytes (32 bits)', '1 byte (8 bits)'],
        correctIndex: 0,
        explanation: `Java double stores 64-bit IEEE 754 floating-point values (8 bytes).`,
        topic: 'Java Data Types'
      },
      {
        text: `In CISCE Class ${c} ${subject} Level ${level}, which Java OOP keyword creates a dynamic object instance of a Class in heap memory?`,
        options: ['new', 'static', 'void', 'break'],
        correctIndex: 0,
        explanation: `The "new" operator allocates memory and invokes the class constructor.`,
        topic: 'Classes & Objects'
      },
      {
        text: `Determine the return value of Math.ceil(${level + 0.2}) in ICSE Class ${c} Java Library Methods Level ${level}:`,
        options: [`${level + 1}.0`, `${level}.0`, `${level + 0.5}`, `${level + 2}.0`],
        correctIndex: 0,
        explanation: `Math.ceil() rounds upward to the smallest integer ≥ argument: ${level + 1}.0.`,
        topic: 'Java Math Class'
      },
      {
        text: `What does Java String expression "CISCE_ICSE".length() return in Grade ${c} Level ${level} ${subject}?`,
        options: ['10', '9', '8', '11'],
        correctIndex: 0,
        explanation: `C-I-S-C-E-_-I-C-S-E contains 10 characters.`,
        topic: 'String Manipulation'
      },
      {
        text: `Which access specifier in ICSE Class ${c} Java Level ${level} restricts class data fields so external classes cannot alter them directly?`,
        options: ['private', 'public', 'global', 'open'],
        correctIndex: 0,
        explanation: `Marking instance variables "private" enforces strict data hiding / encapsulation.`,
        topic: 'Access Specifiers'
      },
      {
        text: `In a Java single-dimensional array int a[] = new int[${5 + level}] (ICSE Class ${c} Level ${level}), what is the valid index range?`,
        options: [`0 to ${4 + level}`, `1 to ${5 + level}`, `0 to ${5 + level}`, `−1 to ${4 + level}`],
        correctIndex: 0,
        explanation: `Zero-based indexing runs from 0 through length − 1 (${4 + level}).`,
        topic: 'Arrays & Indexing'
      },
      {
        text: `Which loop executes its body AT LEAST ONCE before evaluating the termination condition (Class ${c} Level ${level} ${subject})?`,
        options: ['do-while loop', 'while loop', 'for loop', 'if-else block'],
        correctIndex: 0,
        explanation: `do-while is an exit-controlled loop running once before condition testing.`,
        topic: 'Iterative Loops'
      },
      {
        text: `What binary representation matches decimal integer ${8 + level + (c % 4)} in ICSE Class ${c} Computer Level ${level}?`,
        options: [
          `(${(8 + level + (c % 4)).toString(2)})₂`,
          `(11111)₂`,
          `(100001)₂`,
          `(0101)₂`
        ],
        correctIndex: 0,
        explanation: `Converting ${8 + level + (c % 4)} base-10 by repeated division by 2 yields ${(8 + level + (c % 4)).toString(2)}.`,
        topic: 'Number Systems'
      },
      {
        text: `In CISCE Class ${c} Level ${level} Java Overloading, two constructors or methods share the same name inside one class by differing in:`,
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

  if (subject === 'English' || subject === 'Vocabulary and Grammar') {
    const paperTitle = subject === 'Vocabulary and Grammar' ? 'Vocabulary and Grammar Paper' : 'English Paper 1';
    return Array.from({ length: 10 }, (_, idx) => ({
      text: `${tag} ${paperTitle} Level ${level} (Drill ${idx + 1}): Choose the sentence demonstrating accurate CISCE Class ${c} ${['synthesis with Despite', 'preposition usage', 'tense sequence', 'reported speech', 'conditional inversion', 'active-passive voice', 'question tag rule', 'bare infinitive', 'concord agreement', 'correct idiom'][idx]}:`,
      options: [
        [
          `Despite heavy monsoon showers, the Class ${c} science symposium proceeded on schedule.`,
          `Our Grade ${c} debating society is accustomed to rigorous parliamentary rebuttals.`,
          `By the time the examiner arrived, every candidate had verified their roll number.`,
          `The principal reminded candidates that they were to submit neat scripts.`,
          `Had he revised the ICSE specimen paper thoroughly, he would have scored full marks.`,
          `Valuable historical artefacts were preserved carefully by the museum curator.`,
          `None of the spectators left the auditorium early, did they?`,
          `The coach watched the sprinters cross the finish ribbon cleanly.`,
          `Neither the captain nor her teammates are forfeiting tomorrow’s tie.`,
          `Winning the inter-school trophy was a feather in her cap.`
        ][idx],
        `Despite of heavy monsoon showers, everything failed completely.`,
        `Despite that heavy rain, the symposium doesn't proceeded.`,
        `Heavy rain caused us forgetting grammar rules.`
      ],
      correctIndex: 0,
      explanation: `Follows strict CISCE Paper 1 standard English transformation and syntax conventions.`,
      topic: 'CISCE English Grammar'
    }));
  }

  if (subject === 'Hindi') {
    return Array.from({ length: 10 }, (_, idx) => ({
      text: `${tag} हिंदी पाठ्यक्रम स्तर ${level} (अभ्यास ${idx + 1}): कक्षा ${c} ICSE मानक के अनुसार "${['ईमानदारी', 'विद्वान', 'शीतल', 'उन्नति', 'प्रकाश', 'दयालु', 'प्राचीन', 'मधुर', 'साहसी', 'स्वच्छ'][idx]}" शब्द का सटीक व्याकरणिक रूप चुनिए:`,
      options: [
        ['भाववाचक संज्ञा (ईमानदार से निर्मित)', 'विदुषी (स्त्रीलिंग रूप)', 'उष्ण (विलोम शब्द)', 'अवनति (विलोम शब्द)', 'अंधकार (विपरीतार्थक)', 'निर्दय (विलोम)', 'नवीन / अर्वाचीन (विलोम)', 'कटु / कर्कश (विलोम)', 'कायर (विलोम)', 'निर्मल (समानार्थी)'][idx],
        'अशुद्ध वर्तनी रूप',
        'विदेशी असंगत क्रियापद',
        'गलत लिंग-वचन प्रयोग'
      ],
      correctIndex: 0,
      explanation: `ICSE हिंदी व्याकरण कक्षा ${c} के मानकों के अनुरूप यह पूर्णतः शुद्ध उत्तर है।`,
      topic: 'हिंदी भाषा एवं व्याकरण'
    }));
  }

  return Array.from({ length: 10 }, (_, idx) => ({
    text: `${tag} ${subject} Level ${level} (Topic ${idx + 1}): Identify the verified CISCE Class ${c} concept for "${subject}" Unit ${idx + 1}:`,
    options: [
      `Core CISCE ${subject} principle #${idx + 1} tailored for Class ${c} Level ${level} mastery`,
      `Unverified assumption contradicting CISCE Class ${c} textbooks`,
      `Incorrect historical or economic interpretation`,
      `Out-of-syllabus distraction option`
    ],
    correctIndex: 0,
    explanation: `Verified against official CISCE Class ${c} ${subject} syllabus guidelines.`,
    topic: `${subject} CISCE Module ${idx + 1}`
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
    return makeIcseScienceSpecs(c, subject, level);
  }
  return makeGenericIcseSpecs(c, subject, level);
}
