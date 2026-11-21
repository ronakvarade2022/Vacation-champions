import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { CompactWorksheetQuestionSpec, WorksheetItemFormat } from '../types';
import { getClassNumber, getBoardSyllabusLabel } from './chapterCatalog';

/**
 * Deterministic PRNG + option rotation helper so answers are spread cleanly
 * across A/B/C/D and never collide with duplicate numbers.
 */
function placeCorrectOption(
  correct: string,
  distractors: [string, string, string],
  targetIdx: 0 | 1 | 2 | 3
): { o: [string, string, string, string]; a: 0 | 1 | 2 | 3 } {
  const arr = [...distractors];
  arr.splice(targetIdx, 0, correct);
  return {
    o: [arr[0], arr[1], arr[2], arr[3]],
    a: targetIdx,
  };
}

function uniqueIntDistractors(ans: number, offsets: [number, number, number], suffix = ''): [string, string, string] {
  const used = new Set<number>([ans]);
  const out: number[] = [];
  for (let i = 0; i < 3; i++) {
    let candidate = ans + offsets[i];
    while (used.has(candidate) || candidate < 0) {
      candidate += offsets[i] >= 0 ? 1 : 2;
      if (used.has(candidate)) candidate = ans + Math.abs(offsets[i]) + out.length + 1;
    }
    used.add(candidate);
    out.push(candidate);
  }
  return [`${out[0]}${suffix}`, `${out[1]}${suffix}`, `${out[2]}${suffix}`];
}

export function generateMathQuestionForSlot(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  wsNum: number,
  qIdx: number,
  format: WorksheetItemFormat,
  chapterName: string
): CompactWorksheetQuestionSpec {
  const c = getClassNumber(classLevel);
  const bCode = board === 'Maharashtra' ? 1 : board === 'CBSE' ? 2 : 3;
  const seed = wsNum * 37 + qIdx * 13 + c * 19 + bCode * 7;
  const ansIdx = (seed % 4) as 0 | 1 | 2 | 3;
  const boardTag = getBoardSyllabusLabel(board, c);
  const slotKind = (wsNum * 6 + qIdx) % 10;

  // Class 1 - 2 Early Numeracy
  if (c <= 2) {
    const n1 = c === 1 ? 11 + ((wsNum * 3 + qIdx) % 45) : 112 + ((wsNum * 17 + qIdx * 9) % 380);
    const n2 = c === 1 ? 4 + ((wsNum + qIdx * 2) % 19) : 24 + ((wsNum * 11 + qIdx * 5) % 145);

    switch (slotKind) {
      case 0: {
        const sum = n1 + n2;
        const { o, a } = placeCorrectOption(
          `${sum}`,
          uniqueIntDistractors(sum, [-2, 3, 10]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `(${boardTag} • Set ${wsNum}) Find the sum of ${n1} marbles and ${n2} marbles.`,
          o,
          a,
          e: `Adding ${n1} + ${n2} gives ${sum} marbles in all.`,
        };
      }
      case 1: {
        const big = n1 + n2 + 12;
        const rem = big - n2;
        const { o, a } = placeCorrectOption(
          `${rem}`,
          uniqueIntDistractors(rem, [-3, 4, 11]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `There were ${big} pencils in a box. ${n2} pencils were distributed in Class ${c}. How many pencils are left?`,
          o,
          a,
          e: `${big} − ${n2} = ${rem} pencils remaining.`,
        };
      }
      case 2: {
        const hundreds = c === 2 ? ((wsNum + qIdx) % 7) + 2 : 0;
        const tens = ((wsNum * 2 + qIdx) % 8) + 1;
        const ones = ((wsNum + qIdx * 3) % 8) + 1;
        const val = hundreds * 100 + tens * 10 + ones;
        const { o, a } = placeCorrectOption(
          `${val}`,
          [
            `${hundreds * 100 + ones * 10 + tens}`,
            `${val + 10}`,
            `${hundreds * 10 + tens + ones}`,
          ],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q:
            c === 2
              ? `Which 3-digit number has ${hundreds} hundreds, ${tens} tens, and ${ones} ones?`
              : `Which 2-digit number is formed by ${tens} bundles of ten and ${ones} single sticks?`,
          o,
          a,
          e:
            c === 2
              ? `${hundreds}00 + ${tens}0 + ${ones} = ${val}.`
              : `${tens} tens (${tens * 10}) + ${ones} ones = ${val}.`,
        };
      }
      case 3: {
        const step = ((wsNum + qIdx) % 4) + 2;
        const start = (wsNum % 5) * 3 + 4;
        const nextVal = start + step * 3;
        const { o, a } = placeCorrectOption(
          `${nextVal}`,
          uniqueIntDistractors(nextVal, [-1, step, 2]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Complete the skip-counting pattern: ${start}, ${start + step}, ${start + step * 2}, ___`,
          o,
          a,
          e: `Each step increases by ${step}, so ${start + step * 2} + ${step} = ${nextVal}.`,
        };
      }
      case 4: {
        const coins5 = ((wsNum + qIdx) % 4) + 2;
        const coins2 = ((wsNum * 2 + qIdx) % 3) + 1;
        const totalRs = coins5 * 5 + coins2 * 2;
        const { o, a } = placeCorrectOption(
          `₹${totalRs}`,
          [`₹${totalRs - 3}`, `₹${totalRs + 4}`, `₹${totalRs + 7}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Rohan has ${coins5} coins of ₹5 and ${coins2} coins of ₹2. How much money does he have in total?`,
          o,
          a,
          e: `${coins5} × ₹5 = ₹${coins5 * 5} and ${coins2} × ₹2 = ₹${coins2 * 2}; Total = ₹${totalRs}.`,
        };
      }
      case 5: {
        const aVal = 14 + wsNum + qIdx;
        const bVal = aVal + 11;
        const cVal = aVal + 3;
        const dVal = aVal + 21;
        const { o, a } = placeCorrectOption(
          `${aVal}, ${cVal}, ${bVal}, ${dVal}`,
          [
            `${dVal}, ${bVal}, ${cVal}, ${aVal}`,
            `${cVal}, ${aVal}, ${dVal}, ${bVal}`,
            `${aVal}, ${bVal}, ${cVal}, ${dVal}`,
          ],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Arrange the numbers in ascending (smallest to greatest) order: ${bVal}, ${aVal}, ${dVal}, ${cVal}.`,
          o,
          a,
          e: `Smallest to greatest is ${aVal} < ${cVal} < ${bVal} < ${dVal}.`,
        };
      }
      case 6: {
        const rows = ((wsNum + qIdx) % 4) + 2;
        const perRow = ((wsNum * 3 + qIdx) % 5) + 3;
        const total = rows * perRow;
        const { o, a } = placeCorrectOption(
          `${total}`,
          uniqueIntDistractors(total, [-perRow, 3, perRow]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `In a garden, there are ${rows} rows with ${perRow} flowerpots in each row. How many flowerpots are there altogether?`,
          o,
          a,
          e: `${rows} groups of ${perRow} = ${rows} × ${perRow} = ${total} flowerpots.`,
        };
      }
      case 7: {
        const hr = ((wsNum + qIdx) % 9) + 2;
        const { o, a } = placeCorrectOption(
          `${hr}:00`,
          [`12:${hr < 10 ? '0' + hr : hr}`, `${hr === 12 ? 1 : hr + 1}:00`, `${hr}:30`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `On a clock face, the short hour hand points to ${hr} and the long minute hand points to 12. What time is it?`,
          o,
          a,
          e: `When the minute hand is on 12 and the hour hand is on ${hr}, the time is ${hr}:00.`,
        };
      }
      case 8: {
        const pairs: Array<[string, string, string]> = [
          ['Square', '4 equal straight sides and 4 corners', '3 corners'],
          ['Triangle', '3 straight sides and 3 vertices', '5 sides'],
          ['Circle', 'no corners and 1 curved boundary', '4 corners'],
          ['Rectangle', 'opposite sides equal and 4 right corners', '3 equal sides'],
        ];
        const chosen = pairs[(wsNum + qIdx) % pairs.length];
        const isTrue = (wsNum + qIdx) % 2 === 0;
        const stmt = isTrue ? chosen[1] : chosen[2];
        const { o, a } = placeCorrectOption(
          isTrue ? 'True' : 'False',
          [isTrue ? 'False' : 'True', 'Only when rotated', 'Cannot determine'],
          (ansIdx % 2) as 0 | 1
        );
        return {
          f: format,
          c: chapterName,
          q: `True or False: A ${chosen[0]} has ${stmt}.`,
          o,
          a,
          e: `A ${chosen[0]} always has ${chosen[1]}.`,
        };
      }
      default: {
        const len1 = 15 + wsNum * 2;
        const len2 = 8 + qIdx * 2;
        const totalCm = len1 + len2;
        const { o, a } = placeCorrectOption(
          `${totalCm} cm`,
          [`${totalCm - 4} cm`, `${totalCm + 5} cm`, `${Math.abs(len1 - len2)} cm`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `A red ribbon measures ${len1} cm and a blue ribbon measures ${len2} cm. What is their combined length?`,
          o,
          a,
          e: `${len1} cm + ${len2} cm = ${totalCm} cm.`,
        };
      }
    }
  }

  // Class 3 - 5 Upper Primary
  if (c <= 5) {
    switch (slotKind) {
      case 0: {
        const baseNum = c * 1000 + wsNum * 137 + qIdx * 43;
        const digits = String(baseNum).padStart(4, '2');
        const thousandsDigit = parseInt(digits[0], 10);
        const pv = thousandsDigit * 1000;
        const { o, a } = placeCorrectOption(
          `${pv}`,
          [`${thousandsDigit * 100}`, `${thousandsDigit * 10}`, `${thousandsDigit}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `(${boardTag}) What is the place value of the digit ${thousandsDigit} in the number ${digits}?`,
          o,
          a,
          e: `The digit ${thousandsDigit} stands in the thousands place, so its place value is ${thousandsDigit} × 1000 = ${pv}.`,
        };
      }
      case 1: {
        const divisor = ((wsNum + qIdx) % 7) + 4;
        const quotient = ((wsNum * 3 + qIdx) % 18) + 12;
        const rem = (wsNum + qIdx) % (divisor - 1);
        const dividend = divisor * quotient + rem;
        const { o, a } = placeCorrectOption(
          `Quotient ${quotient}, Remainder ${rem}`,
          [
            `Quotient ${quotient + 1}, Remainder ${rem}`,
            `Quotient ${quotient}, Remainder ${rem + 1}`,
            `Quotient ${quotient - 1}, Remainder ${divisor - 1}`,
          ],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Divide ${dividend} by ${divisor} and find the quotient and remainder.`,
          o,
          a,
          e: `${divisor} × ${quotient} = ${divisor * quotient}; ${dividend} − ${divisor * quotient} = ${rem}.`,
        };
      }
      case 2: {
        const denom = ((wsNum + qIdx) % 6) + 5;
        const numA = ((wsNum + qIdx) % (denom - 2)) + 1;
        const numB = 1;
        const sumNum = numA + numB;
        const { o, a } = placeCorrectOption(
          `${sumNum}/${denom}`,
          [`${sumNum}/${denom * 2}`, `${sumNum + 1}/${denom}`, `${Math.max(1, numA - numB)}/${denom}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Add the like fractions: ${numA}/${denom} + ${numB}/${denom} = ___`,
          o,
          a,
          e: `For like fractions, add numerators while keeping denominator ${denom}: (${numA} + ${numB})/${denom} = ${sumNum}/${denom}.`,
        };
      }
      case 3: {
        const l = 8 + ((wsNum * 2 + qIdx) % 14);
        const w = 4 + ((wsNum + qIdx) % 8);
        const askArea = (wsNum + qIdx) % 2 === 0;
        const val = askArea ? l * w : 2 * (l + w);
        const unit = askArea ? 'sq cm' : 'cm';
        const { o, a } = placeCorrectOption(
          `${val} ${unit}`,
          [`${askArea ? 2 * (l + w) : l * w} ${unit}`, `${val + 6} ${unit}`, `${Math.max(2, val - 4)} ${unit}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `A rectangular chart paper is ${l} cm long and ${w} cm wide. Calculate its ${askArea ? 'area' : 'perimeter'}.`,
          o,
          a,
          e: askArea
            ? `Area = Length × Breadth = ${l} × ${w} = ${val} sq cm.`
            : `Perimeter = 2 × (Length + Breadth) = 2 × (${l} + ${w}) = ${val} cm.`,
        };
      }
      case 4: {
        const meters = ((wsNum + qIdx) % 7) + 2;
        const extraCm = ((wsNum * 7 + qIdx * 11) % 85) + 10;
        const totalCm = meters * 100 + extraCm;
        const { o, a } = placeCorrectOption(
          `${totalCm} cm`,
          [`${meters * 10 + extraCm} cm`, `${meters * 1000 + extraCm} cm`, `${totalCm + 100} cm`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Convert ${meters} metres ${extraCm} centimetres completely into centimetres.`,
          o,
          a,
          e: `1 m = 100 cm, so ${meters} m ${extraCm} cm = (${meters} × 100) + ${extraCm} = ${totalCm} cm.`,
        };
      }
      case 5: {
        const nA = ((wsNum + qIdx) % 5) + 2;
        const nB = ((wsNum * 2 + qIdx) % 4) + 3;
        const mult = ((wsNum + qIdx * 2) % 3) + 2;
        const aVal = nA * mult;
        const bVal = nB * mult;
        const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
        const hcf = gcd(aVal, bVal);
        const lcm = (aVal * bVal) / hcf;
        const askLcm = (wsNum + qIdx) % 2 === 0;
        const target = askLcm ? lcm : hcf;
        const { o, a } = placeCorrectOption(
          `${target}`,
          uniqueIntDistractors(target, [askLcm ? -hcf : 2, askLcm ? hcf : 4, askLcm ? aVal : -1]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Find the ${askLcm ? 'LCM (Least Common Multiple)' : 'HCF (Highest Common Factor)'} of ${aVal} and ${bVal}.`,
          o,
          a,
          e: `For ${aVal} and ${bVal}, HCF = ${hcf} and LCM = ${lcm}.`,
        };
      }
      case 6: {
        const romans: Array<[number, string, string]> = [
          [14, 'XIV', 'XVI'],
          [19, 'XIX', 'XXI'],
          [24, 'XXIV', 'XXVI'],
          [29, 'XXIX', 'XXXI'],
          [34, 'XXXIV', 'XXXVI'],
          [40, 'XL', 'XXXX'],
          [44, 'XLIV', 'XXXXIV'],
          [49, 'XLIX', 'IL'],
          [59, 'LIX', 'LX'],
          [90, 'XC', 'LXL'],
        ];
        const item = romans[(wsNum + qIdx) % romans.length];
        const { o, a } = placeCorrectOption(
          item[1],
          [item[2], 'LV', 'XCV'],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Write the Roman numeral for the Hindu-Arabic number ${item[0]}.`,
          o,
          a,
          e: `Using subtractive/additive Roman rules, ${item[0]} is written as ${item[1]}.`,
        };
      }
      case 7: {
        const unitCost = 18 + ((wsNum * 3 + qIdx) % 25);
        const qtyGiven = 4 + ((wsNum + qIdx) % 4);
        const totalCost = unitCost * qtyGiven;
        const targetQty = qtyGiven + 3;
        const targetCost = unitCost * targetQty;
        const { o, a } = placeCorrectOption(
          `₹${targetCost}`,
          [`₹${targetCost - unitCost}`, `₹${targetCost + unitCost}`, `₹${totalCost + targetQty}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `If ${qtyGiven} Geometry Boxes cost ₹${totalCost}, what will be the cost of ${targetQty} such Geometry Boxes?`,
          o,
          a,
          e: `Cost of 1 box = ₹${totalCost} ÷ ${qtyGiven} = ₹${unitCost}. Cost of ${targetQty} boxes = ₹${unitCost} × ${targetQty} = ₹${targetCost}.`,
        };
      }
      case 8: {
        const startHr = 8 + (wsNum % 3);
        const mins = ((wsNum + qIdx) % 3 + 1) * 45;
        const addedH = Math.floor(mins / 60);
        const remM = mins % 60;
        const endH = startHr + addedH;
        const endStr = `${endH}:${remM === 0 ? '00' : remM} ${endH < 12 ? 'a.m.' : 'p.m.'}`;
        const { o, a } = placeCorrectOption(
          endStr,
          [
            `${endH + 1}:${remM === 0 ? '00' : remM} p.m.`,
            `${endH}:${remM === 15 ? '45' : '15'} a.m.`,
            `${endH - 1}:30 a.m.`,
          ],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `A science workshop starts at ${startHr}:00 a.m. and lasts ${mins} minutes. When does it finish?`,
          o,
          a,
          e: `${mins} minutes = ${addedH} hr ${remM} min. Adding to ${startHr}:00 gives ${endStr}.`,
        };
      }
      default: {
        const baseDeg = 40 + ((wsNum * 5 + qIdx * 3) % 45);
        const rightDiff = 90 - baseDeg;
        const { o, a } = placeCorrectOption(
          `${rightDiff}°`,
          [`${180 - baseDeg}°`, `${rightDiff + 10}°`, `${Math.max(5, rightDiff - 10)}°`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Two angles together form a right angle (90°). If one angle measures ${baseDeg}°, find the other angle.`,
          o,
          a,
          e: `Right angle = 90°, so the complementary angle = 90° − ${baseDeg}° = ${rightDiff}°.`,
        };
      }
    }
  }

  // Class 6 - 8 Middle School
  if (c <= 8) {
    switch (slotKind) {
      case 0: {
        const aVal = -((wsNum + qIdx) % 15 + 6);
        const bVal = (wsNum * 3 + qIdx * 2) % 19 + 8;
        const cVal = -((wsNum + qIdx * 3) % 9 + 3);
        const result = aVal + bVal - cVal;
        const { o, a } = placeCorrectOption(
          `${result}`,
          [`${aVal + bVal + cVal}`, `${result + 4}`, `${result - 6}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `(${boardTag}) Evaluate the integer expression: (${aVal}) + ${bVal} − (${cVal}).`,
          o,
          a,
          e: `Subtracting a negative adds it: ${aVal} + ${bVal} + ${Math.abs(cVal)} = ${result}.`,
        };
      }
      case 1: {
        const coeff = ((wsNum + qIdx) % 6) + 3;
        const xSol = ((wsNum * 2 + qIdx) % 9) + 2;
        const rhsConst = ((wsNum * 5 + qIdx) % 15) + 4;
        const totalRhs = coeff * xSol + rhsConst;
        const { o, a } = placeCorrectOption(
          `x = ${xSol}`,
          [`x = ${xSol + 2}`, `x = ${Math.max(1, xSol - 1)}`, `x = ${xSol + 4}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Solve the linear equation for x: ${coeff}x + ${rhsConst} = ${totalRhs}.`,
          o,
          a,
          e: `${coeff}x = ${totalRhs} − ${rhsConst} = ${coeff * xSol}; therefore x = ${coeff * xSol} ÷ ${coeff} = ${xSol}.`,
        };
      }
      case 2: {
        const principal = (((wsNum + qIdx) % 8) + 2) * 500;
        const rate = ((wsNum + qIdx) % 4) * 2 + 4;
        const timeYrs = ((wsNum + qIdx) % 3) + 2;
        const si = (principal * rate * timeYrs) / 100;
        const { o, a } = placeCorrectOption(
          `₹${si}`,
          [`₹${si + 120}`, `₹${Math.round(si / 2)}`, `₹${principal + si}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Calculate Simple Interest on ₹${principal} at ${rate}% per annum for ${timeYrs} years.`,
          o,
          a,
          e: `SI = (P × R × T)/100 = (${principal} × ${rate} × ${timeYrs})/100 = ₹${si}.`,
        };
      }
      case 3: {
        const ang1 = 42 + ((wsNum * 3 + qIdx) % 35);
        const ang2 = 38 + ((wsNum * 2 + qIdx * 5) % 40);
        const ang3 = 180 - ang1 - ang2;
        const { o, a } = placeCorrectOption(
          `${ang3}°`,
          [`${ang3 + 12}°`, `${Math.max(10, ang3 - 10)}°`, `${180 - ang1}°`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `In triangle PQR, ∠P = ${ang1}° and ∠Q = ${ang2}°. Find the measure of ∠R.`,
          o,
          a,
          e: `Sum of angles in a triangle is 180°, so ∠R = 180° − (${ang1}° + ${ang2}°) = ${ang3}°.`,
        };
      }
      case 4: {
        const cp = (((wsNum + qIdx) % 9) + 3) * 100;
        const profitPct = ((wsNum + qIdx) % 4 + 1) * 5;
        const sp = cp + (cp * profitPct) / 100;
        const { o, a } = placeCorrectOption(
          `₹${sp}`,
          [`₹${sp - 50}`, `₹${cp + profitPct}`, `₹${sp + 100}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `A shopkeeper buys a study lamp for ₹${cp} and sells it at a ${profitPct}% profit. Find the selling price.`,
          o,
          a,
          e: `Profit = ${profitPct}% of ₹${cp} = ₹${(cp * profitPct) / 100}. SP = ₹${cp} + ₹${(cp * profitPct) / 100} = ₹${sp}.`,
        };
      }
      case 5: {
        const r = (((wsNum + qIdx) % 4) + 1) * 7;
        const askArea = (wsNum + qIdx) % 2 === 0;
        const val = askArea ? Math.round((22 * r * r) / 7) : Math.round((2 * 22 * r) / 7);
        const unit = askArea ? 'cm²' : 'cm';
        const { o, a } = placeCorrectOption(
          `${val} ${unit}`,
          [`${val + 22} ${unit}`, `${Math.max(7, val - 14)} ${unit}`, `${2 * val} ${unit}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Taking π = 22/7, find the ${askArea ? 'area' : 'circumference'} of a circle of radius ${r} cm.`,
          o,
          a,
          e: askArea
            ? `Area = πr² = (22/7) × ${r} × ${r} = ${val} cm².`
            : `Circumference = 2πr = 2 × (22/7) × ${r} = ${val} cm.`,
        };
      }
      case 6: {
        const base = ((wsNum + qIdx) % 4) + 2;
        const p1 = ((wsNum + qIdx) % 4) + 2;
        const p2 = ((wsNum * 2 + qIdx) % 3) + 2;
        const expSum = p1 + p2;
        const { o, a } = placeCorrectOption(
          `${base}^${expSum}`,
          [`${base}^${p1 * p2}`, `${base * 2}^${expSum}`, `${base}^${Math.abs(p1 - p2) + 1}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Simplify using laws of exponents: ${base}^${p1} × ${base}^${p2}.`,
          o,
          a,
          e: `Using a^m × a^n = a^(m+n): ${base}^(${p1}+${p2}) = ${base}^${expSum}.`,
        };
      }
      case 7: {
        const s1 = 6 + ((wsNum + qIdx) % 5) * 2;
        const nCount = 5;
        const nums = [s1, s1 + 4, s1 + 8, s1 + 12, s1 + 16];
        const mean = nums.reduce((acc, v) => acc + v, 0) / nCount;
        const { o, a } = placeCorrectOption(
          `${mean}`,
          uniqueIntDistractors(mean, [-4, 2, 6]),
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Find the arithmetic mean of the 5 observations: ${nums.join(', ')}.`,
          o,
          a,
          e: `Sum = ${mean * nCount}; Mean = ${mean * nCount} ÷ ${nCount} = ${mean}.`,
        };
      }
      case 8: {
        const partA = ((wsNum + qIdx) % 5) + 2;
        const partB = partA + 2;
        const mult = ((wsNum * 3 + qIdx) % 12) + 6;
        const total = (partA + partB) * mult;
        const shareA = partA * mult;
        const { o, a } = placeCorrectOption(
          `₹${shareA}`,
          [`₹${partB * mult}`, `₹${shareA + mult}`, `₹${Math.max(10, shareA - mult)}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Divide ₹${total} between Ananya and Kabir in the ratio ${partA}:${partB}. How much does Ananya receive?`,
          o,
          a,
          e: `Total parts = ${partA} + ${partB} = ${partA + partB}. Ananya's share = (${partA}/${partA + partB}) × ${total} = ₹${shareA}.`,
        };
      }
      default: {
        const cubeEdge = ((wsNum + qIdx) % 6) + 3;
        const askVol = (wsNum + qIdx) % 2 === 0;
        const val = askVol ? cubeEdge ** 3 : 6 * cubeEdge * cubeEdge;
        const unit = askVol ? 'cm³' : 'cm²';
        const { o, a } = placeCorrectOption(
          `${val} ${unit}`,
          [`${val + cubeEdge * 2} ${unit}`, `${4 * cubeEdge * cubeEdge} ${unit}`, `${val - 6} ${unit}`],
          ansIdx
        );
        return {
          f: format,
          c: chapterName,
          q: `Find the ${askVol ? 'volume' : 'total surface area'} of a cube of edge ${cubeEdge} cm.`,
          o,
          a,
          e: askVol
            ? `Volume of cube = a³ = ${cubeEdge}³ = ${val} cm³.`
            : `TSA of cube = 6a² = 6 × ${cubeEdge}² = ${val} cm².`,
        };
      }
    }
  }

  // Class 9 - 10 Secondary (including Mathematics, Algebra, Geometry)
  const isGeom = subject === 'Mathematics – Geometry';
  const geomSlot = isGeom ? (slotKind % 5) + 5 : slotKind;

  switch (geomSlot) {
    case 0: {
      // Quadratic roots / discriminant
      const r1 = ((wsNum + qIdx) % 5) + 2;
      const r2 = ((wsNum * 2 + qIdx) % 4) + 3;
      const sumR = r1 + r2;
      const prodR = r1 * r2;
      const { o, a } = placeCorrectOption(
        `x = ${r1}, ${r2}`,
        [`x = -${r1}, -${r2}`, `x = ${r1}, -${r2}`, `x = ${r1 + 1}, ${r2 - 1}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `(${boardTag}) Solve the quadratic equation: x² − ${sumR}x + ${prodR} = 0.`,
        o,
        a,
        e: `Factorising (x − ${r1})(x − ${r2}) = 0 gives roots x = ${r1} and x = ${r2}.`,
      };
    }
    case 1: {
      // Arithmetic Progression nth term
      const first = 3 + ((wsNum * 2 + qIdx) % 9);
      const diff = 2 + ((wsNum + qIdx) % 5);
      const nTerm = 7 + ((wsNum + qIdx) % 6);
      const tn = first + (nTerm - 1) * diff;
      const { o, a } = placeCorrectOption(
        `${tn}`,
        uniqueIntDistractors(tn, [-diff, diff, 2]),
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `Find the ${nTerm}th term of the Arithmetic Progression (A.P.): ${first}, ${first + diff}, ${first + 2 * diff}, ...`,
        o,
        a,
        e: `Here a = ${first}, d = ${diff}. Using tₙ = a + (n − 1)d: t_${nTerm} = ${first} + ${nTerm - 1}(${diff}) = ${tn}.`,
      };
    }
    case 2: {
      // Linear Equations in two variables
      const x = ((wsNum + qIdx) % 6) + 2;
      const y = ((wsNum * 3 + qIdx) % 5) + 1;
      const s = x + y;
      const d = x - y;
      const { o, a } = placeCorrectOption(
        `(${x}, ${y})`,
        [`(${y}, ${x})`, `(${x + 1}, ${y - 1})`, `(${x - 1}, ${y + 2})`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `Solve the simultaneous equations: x + y = ${s} and x − y = ${d}.`,
        o,
        a,
        e: `Adding gives 2x = ${s + d} ⇒ x = ${x}, and y = ${s} − ${x} = ${y}.`,
      };
    }
    case 3: {
      // GST Financial Planning
      const taxable = (((wsNum + qIdx) % 6) + 2) * 1000;
      const gstRate = [12, 18, 28][(wsNum + qIdx) % 3];
      const halfRate = gstRate / 2;
      const cgst = (taxable * halfRate) / 100;
      const { o, a } = placeCorrectOption(
        `₹${cgst}`,
        [`₹${cgst * 2}`, `₹${Math.round(cgst / 2)}`, `₹${taxable + cgst}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `On a gadget with taxable value ₹${taxable} and ${gstRate}% GST (intrastate), calculate the CGST amount.`,
        o,
        a,
        e: `CGST is half of GST (${halfRate}%). ${halfRate}% of ₹${taxable} = ₹${cgst}.`,
      };
    }
    case 4: {
      // Probability
      const totalBalls = 10 + ((wsNum + qIdx) % 6);
      const redBalls = 3 + ((wsNum + qIdx) % 4);
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const g = gcd(redBalls, totalBalls);
      const ansStr = `${redBalls / g}/${totalBalls / g}`;
      const { o, a } = placeCorrectOption(
        ansStr,
        [
          `${(totalBalls - redBalls)}/${totalBalls}`,
          `${redBalls}/${totalBalls + 2}`,
          `1/${totalBalls}`,
        ],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `A bag contains ${totalBalls} balls of which ${redBalls} are red. What is the probability of drawing a red ball?`,
        o,
        a,
        e: `P(Red) = ${redBalls}/${totalBalls} = ${ansStr}.`,
      };
    }
    case 5: {
      // Coordinate Geometry Distance Formula (Pythagorean triples)
      const scale = ((wsNum + qIdx) % 3) + 1;
      const triples: Array<[number, number, number]> = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [dx0, dy0, h0] = triples[(wsNum + qIdx) % triples.length];
      const x1 = (wsNum % 4) + 1;
      const y1 = (qIdx % 3) + 1;
      const x2 = x1 + dx0 * scale;
      const y2 = y1 + dy0 * scale;
      const dist = h0 * scale;
      const { o, a } = placeCorrectOption(
        `${dist} units`,
        [`${dist + 2} units`, `${dx0 * scale + dy0 * scale} units`, `${Math.max(2, dist - 3)} units`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `Find the distance between points A(${x1}, ${y1}) and B(${x2}, ${y2}) using the distance formula.`,
        o,
        a,
        e: `d(A,B) = √[(${x2}−${x1})² + (${y2}−${y1})²] = √(${dx0 * scale}² + ${dy0 * scale}²) = ${dist} units.`,
      };
    }
    case 6: {
      // Similar triangles area ratio
      const s1 = ((wsNum + qIdx) % 4) + 2;
      const s2 = s1 + 2;
      const { o, a } = placeCorrectOption(
        `${s1 * s1} : ${s2 * s2}`,
        [`${s1} : ${s2}`, `${2 * s1} : ${2 * s2}`, `${s2 * s2} : ${s1 * s1}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `If ΔABC ~ ΔPQR with corresponding sides AB:PQ = ${s1}:${s2}, what is Area(ΔABC) : Area(ΔPQR)?`,
        o,
        a,
        e: `By the Theorem on Areas of Similar Triangles, Area ratio = (${s1})² : (${s2})² = ${s1 * s1} : ${s2 * s2}.`,
      };
    }
    case 7: {
      // Pythagoras tangent / right triangle
      const triplets: Array<[number, number, number]> = [
        [6, 8, 10],
        [9, 12, 15],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [leg1, leg2, hyp] = triplets[(wsNum + qIdx) % triplets.length];
      const { o, a } = placeCorrectOption(
        `${leg2} cm`,
        [`${hyp + leg1} cm`, `${leg2 + 2} cm`, `${Math.max(3, leg2 - 2)} cm`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `From an external point P at distance ${hyp} cm from circle centre O, a tangent PT is drawn to a circle of radius ${leg1} cm. Find length PT.`,
        o,
        a,
        e: `Radius OT ⊥ PT, so OT² + PT² = OP². PT = √(${hyp}² − ${leg1}²) = √(${hyp * hyp - leg1 * leg1}) = ${leg2} cm.`,
      };
    }
    case 8: {
      // Trigonometry Assertion-Reason / Identity
      const trigQ: Array<[string, string, [string, string, string], string]> = [
        ['If sin θ = 3/5 (acute angle), find cos θ.', '4/5', ['3/4', '5/4', '2/5'], 'sin²θ + cos²θ = 1 ⇒ cos θ = √(1 − 9/25) = 4/5.'],
        ['Evaluate 2 tan²45° + cos²30° − sin²60°.', '2', ['1', '3', '3/2'], 'tan 45° = 1, cos 30° = sin 60° = √3/2, so 2(1)² + 3/4 − 3/4 = 2.'],
        ['If √3 tan θ = 1 (0° < θ < 90°), find θ.', '30°', ['45°', '60°', '90°'], 'tan θ = 1/√3, therefore θ = 30°.'],
        ['Evaluate sec²45° − tan²45°.', '1', ['0', '2', '√2'], 'By identity 1 + tan²θ = sec²θ, sec²θ − tan²θ = 1 for any valid θ.'],
      ];
      const t = trigQ[(wsNum + qIdx) % trigQ.length];
      const { o, a } = placeCorrectOption(t[1], t[2], ansIdx);
      return { f: format, c: chapterName, q: t[0], o, a, e: t[3] };
    }
    default: {
      // Mensuration cylinder / cone / sphere
      const r = (((wsNum + qIdx) % 3) + 1) * 7;
      const h = 10 + ((wsNum + qIdx) % 5) * 2;
      const volCyl = Math.round((22 * r * r * h) / 7);
      const { o, a } = placeCorrectOption(
        `${volCyl} cm³`,
        [`${Math.round(volCyl / 3)} cm³`, `${volCyl + 220} cm³`, `${Math.round((2 * 22 * r * h) / 7)} cm³`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `Calculate the volume of a right circular cylinder with radius r = ${r} cm and height h = ${h} cm (π = 22/7).`,
        o,
        a,
        e: `Volume of cylinder = πr²h = (22/7) × ${r}² × ${h} = ${volCyl} cm³.`,
      };
    }
  }
}
