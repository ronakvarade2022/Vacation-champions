import {
  formatFraction,
  gcd,
  makeNumericOptions,
  placeStringOptions,
  RawGeneratedQuestion,
} from './msceQuestionHelpers';

/**
 * Generates ONE Std 7th (UPS) Mathematics question for slot idx (0..49) of Mock Test t (1..25).
 * Covers MSCE Class 7 syllabus: Integers, Rational Numbers, HCF/LCM, Exponents, Square/Cube Roots,
 * Algebraic Expressions & Equations, Ratio/Proportion, Percentage, Profit/Loss/Discount, Simple Interest,
 * Speed/Time/Distance, Mensuration (Area/Perimeter/Circle/Cuboid/Cube), Geometry & Pythagoras, Statistics.
 */
export function buildStd7MathsQuestion(
  t: number,
  idx: number,
  correctIdx: number
): RawGeneratedQuestion {
  const cities = ['Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Solapur', 'Thane', 'Amravati', 'Nanded', 'Sangli'];
  const city = cities[(t + idx) % cities.length];
  const names = ['Aditya', 'Sneha', 'Rohan', 'Priya', 'Omkar', 'Neha', 'Siddharth', 'Gauri', 'Yash', 'Kalyani'];
  const name = names[(t * 3 + idx) % names.length];

  switch (idx) {
    case 0: {
      // Integers expression: (-a) * (-b) + (-c)
      const a = 4 + (t % 7);
      const b = 5 + ((t + 2) % 6);
      const c = 7 + t;
      const ans = a * b - c;
      const opts = makeNumericOptions(ans, [c, -4, 8], correctIdx, '', '', true);
      return {
        topic: 'Integers & Operations',
        enQ: `Evaluate the integer expression: (-${a}) × (-${b}) + (-${c}) = ?`,
        mrQ: `पूर्णांक संख्यांची किंमत काढा: (-${a}) × (-${b}) + (-${c}) = किती?`,
        hiQ: `पूर्णांक व्यंजक का मान ज्ञात कीजिए: (-${a}) × (-${b}) + (-${c}) = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(-${a})×(-${b}) = +${a * b}. Adding (-${c}) gives ${a * b} - ${c} = ${ans}.`,
        mrExp: `(-${a})×(-${b}) = ${a * b}. त्यात (-${c}) मिळवल्यास ${ans}.`,
        hiExp: `(-${a})×(-${b}) = ${a * b}। (-${c}) जोड़ने पर ${ans} प्राप्त होता है।`,
      };
    }
    case 1: {
      // Rational numbers addition with unlike denominators (GCD simplified; unique for t=1..25)
      const a = 1 + ((t - 1) % 5);
      const b = 4 + (Math.floor((t - 1) / 5) % 2) * 2; // 4 or 6
      const c = 1 + Math.floor((t - 1) / 5);
      const d = 5 + (t % 3); // 5, 6, 7
      const lcmBD = (b * d) / gcd(b, d);
      const corr = formatFraction(a * d + c * b, b * d);
      const w1 = formatFraction(a * d + c * b + 1, b * d);
      const w2 = formatFraction(Math.max(1, Math.abs(a * d - c * b) + 1), b * d);
      const w3 = `${a + c}/${b + d}`;
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Rational Numbers & Fractions',
        enQ: `Simplify and express in lowest terms: (${a}/${b}) + (${c}/${d}) = ?`,
        mrQ: `सोपे रूप द्या: (${a}/${b}) + (${c}/${d}) = किती?`,
        hiQ: `सरल करके न्यूनतम रूप में लिखिए: (${a}/${b}) + (${c}/${d}) = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `LCM of ${b} and ${d} is ${lcmBD} → (${a * (lcmBD / b)} + ${c * (lcmBD / d)})/${lcmBD} = ${corr}.`,
        mrExp: `${b} व ${d} चा लसावि ${lcmBD} घेतल्यास संक्षिप्त उत्तर ${corr} येते.`,
        hiExp: `${b} और ${d} का ल.स. ${lcmBD} लेने पर सरलतम उत्तर ${corr} आता है।`,
      };
    }
    case 2: {
      // Fraction division (unique across 7 x 4 = 28)
      const n1 = 3 + ((t - 1) % 7);
      const d1 = 5;
      const n2 = 2 + Math.floor((t - 1) / 7);
      const d2 = 7 + (t % 2) * 2; // 7 or 9
      const corr = formatFraction(n1 * d2, d1 * n2);
      const w1 = formatFraction(n1 * n2, d1 * d2);
      const w2 = formatFraction(n1 * d2 + 1, d1 * n2);
      const w3 = formatFraction(d1 * n2, n1 * d2);
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Rational Numbers & Fractions',
        enQ: `Find the quotient in simplest form: (${n1}/${d1}) ÷ (${n2}/${d2})`,
        mrQ: `भागाकार संक्षिप्त रूपात लिहा: (${n1}/${d1}) ÷ (${n2}/${d2})`,
        hiQ: `भागफल न्यूनतम रूप में ज्ञात कीजिए: (${n1}/${d1}) ÷ (${n2}/${d2})`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Multiply by reciprocal: (${n1}/${d1}) × (${d2}/${n2}) = ${n1 * d2}/${d1 * n2} = ${corr}.`,
        mrExp: `व्यस्ताने गुणल्यास (${n1}/${d1}) × (${d2}/${n2}) = ${corr}.`,
        hiExp: `व्युत्क्रम से गुणा करने पर (${n1}/${d1}) × (${d2}/${n2}) = ${corr}।`,
      };
    }
    case 3: {
      // Decimal multiplication
      const dec1 = Number((1.2 + t * 0.1).toFixed(1));
      const dec2 = Number((0.4 + (t % 5) * 0.1).toFixed(1));
      const ans = Number((dec1 * dec2).toFixed(2));
      const opts = makeNumericOptions(ans, [0.1, -0.1, 1.0], correctIdx);
      return {
        topic: 'Decimals',
        enQ: `Evaluate the decimal product: ${dec1} × ${dec2} = ?`,
        mrQ: `दशांश अपूर्णांकांचा गुणाकार करा: ${dec1} × ${dec2} = किती?`,
        hiQ: `दशमलव गुणनफल ज्ञात कीजिए: ${dec1} × ${dec2} = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Multiply without decimals and place 2 decimal digits → ${ans}.`,
        mrExp: `दशांशचिन्हाशिवाय गुणाकार करून 2 घरे डावीकडे सरकल्यास ${ans}.`,
        hiExp: `गुणा करके दो अंक बाद दशमलव लगाने पर ${ans} प्राप्त होता है।`,
      };
    }
    case 4: {
      // Decimal division
      const q = 4 + t;
      const div = 0.25;
      const num = Number((q * div).toFixed(2));
      const opts = makeNumericOptions(q, [2, -2, 4], correctIdx);
      return {
        topic: 'Decimals',
        enQ: `Divide: ${num} ÷ ${div} = ?`,
        mrQ: `भागाकार करा: ${num} ÷ ${div} = किती?`,
        hiQ: `भाग दीजिए: ${num} ÷ ${div} = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${num} ÷ ${div} = (${num} × 100) ÷ 25 = ${q}.`,
        mrExp: `${num} ला ${div} ने भागल्यास भागाकार ${q} येतो.`,
        hiExp: `${num} को ${div} से भाग देने पर भागफल ${q} आता है।`,
      };
    }
    case 5: {
      // HCF & LCM relation: HCF × LCM = A × B
      const h = 3 + t; // 4..28 (unique per t)
      const x = 3;
      const y = 5;
      const A = h * x;
      const B = h * y;
      const lcm = h * x * y;
      const opts = makeNumericOptions(B, [h, -h, h * 2], correctIdx);
      return {
        topic: 'HCF and LCM',
        enQ: `The HCF and LCM of two numbers are ${h} and ${lcm} respectively. If one of the numbers is ${A}, find the other number.`,
        mrQ: `दोन संख्यांचा मसावि ${h} आणि लसावि ${lcm} आहे. त्यांपैकी एक संख्या ${A} असल्यास दुसरी संख्या कोणती?`,
        hiQ: `दो संख्याओं का म.स. (HCF) ${h} और ल.स. (LCM) ${lcm} है। यदि एक संख्या ${A} है, तो दूसरी संख्या ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Product of two numbers = HCF × LCM → Other number = (${h} × ${lcm}) ÷ ${A} = ${B}.`,
        mrExp: `दुसरी संख्या = (मसावि × लसावि) ÷ पहिली संख्या = (${h} × ${lcm}) ÷ ${A} = ${B}.`,
        hiExp: `दूसरी संख्या = (म.स. × ल.स.) ÷ पहली संख्या = (${h} × ${lcm}) ÷ ${A} = ${B}।`,
      };
    }
    case 6: {
      // LCM Bell Ringing word problem
      const b1 = 6 + (t % 3); // 6, 7, 8
      const b2 = 12;
      const l = (b1 * b2) / gcd(b1, b2);
      const ans = l;
      const opts = makeNumericOptions(ans, [6, -4, 12], correctIdx, '', ' mins');
      const mrOpts = makeNumericOptions(ans, [6, -4, 12], correctIdx, '', ' मिनिटे');
      const hiOpts = makeNumericOptions(ans, [6, -4, 12], correctIdx, '', ' मिनट');
      return {
        topic: 'HCF and LCM',
        enQ: `Two school bells in ${city} ring at intervals of ${b1} minutes and ${b2} minutes respectively. If they ring together at 9:00 AM, after how many minutes will they next ring together?`,
        mrQ: `${city} येथील दोन शाळांच्या घंटा अनुक्रमे ${b1} मिनिटे व ${b2} मिनिटांच्या अंतराने वाजतात. त्या सकाळी 9:00 वाजता एकत्र वाजल्यास पुढे किती मिनिटांनी पुन्हा एकत्र वाजतील?`,
        hiQ: `${city} में दो घंटियाँ क्रमशः ${b1} मिनट और ${b2} मिनट के अंतराल पर बजती हैं। यदि वे सुबह 9:00 बजे एक साथ बजीं, तो कितने मिनट बाद पुनः एक साथ बजेंगी?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `LCM(${b1}, ${b2}) = ${ans} minutes.`,
        mrExp: `${b1} व ${b2} चा लसावि = ${ans} मिनिटे.`,
        hiExp: `${b1} और ${b2} का ल.स. (LCM) = ${ans} मिनट।`,
      };
    }
    case 7: {
      // HCF Largest Rope/Measure length
      const k = 6 + t;
      const L1 = k * 3;
      const L2 = k * 5;
      const L3 = k * 7;
      const opts = makeNumericOptions(k, [2, -2, 4], correctIdx, '', ' m');
      const mrOpts = makeNumericOptions(k, [2, -2, 4], correctIdx, '', ' मीटर');
      return {
        topic: 'HCF and LCM',
        enQ: `Find the greatest possible length of a measuring tape that can measure ${L1} m, ${L2} m, and ${L3} m exactly.`,
        mrQ: `${L1} मी, ${L2} मी आणि ${L3} मी लांबी अचूक मोजता येईल अशा मोठ्यात मोठ्या मोजपट्टीची लांबी किती मीटर असावी?`,
        hiQ: `${L1} मी, ${L2} मी और ${L3} मी को ठीक-ठीक माप सकने वाले सबसे बड़े फीते की लंबाई ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `HCF(${L1}, ${L2}, ${L3}) = ${k} m (since 3, 5, 7 have no common factor other than 1).`,
        mrExp: `${L1}, ${L2} व ${L3} चा मसावि = ${k} मीटर.`,
        hiExp: `${L1}, ${L2}, ${L3} का म.स. (HCF) = ${k} मीटर।`,
      };
    }
    case 8: {
      // Laws of Exponents: a^m × a^n ÷ a^p (5 x 5 bijection)
      const base = 2 + ((t - 1) % 5); // 2..6
      const n = 3 + Math.floor((t - 1) / 5); // 3..7
      const m = 4 + (t % 3); // 4..6
      const p = 3;
      const expAns = m + n - p;
      const ans = Math.pow(base, expAns);
      const opts = makeNumericOptions(ans, [base, -base, base * base], correctIdx);
      return {
        topic: 'Exponents & Powers',
        enQ: `Simplify using laws of indices: (${base}^${m} × ${base}^${n}) ÷ ${base}^${p} = ?`,
        mrQ: `घातांकांच्या नियमानुसार किंमत काढा: (${base}^${m} × ${base}^${n}) ÷ ${base}^${p}`,
        hiQ: `घातांक नियमों से मान ज्ञात कीजिए: (${base}^${m} × ${base}^${n}) ÷ ${base}^${p}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${base}^(${m} + ${n} - ${p}) = ${base}^${expAns} = ${ans}.`,
        mrExp: `${base}^(${m} + ${n} - ${p}) = ${base}^${expAns} = ${ans}.`,
        hiExp: `${base}^(${m} + ${n} - ${p}) = ${base}^${expAns} = ${ans}।`,
      };
    }
    case 9: {
      // Exponent zero & negative index rule
      const a = 3 + (t % 6);
      const b = 2 + (t % 5);
      const ans = 2 * a; // (a^0 + b^0) * a
      const opts = makeNumericOptions(ans, [a, 2, -2], correctIdx);
      return {
        topic: 'Exponents & Powers',
        enQ: `Evaluate using laws of indices: (${t + 11}⁰ + ${b + 7}⁰) × ${a}`,
        mrQ: `घातांकाचे नियम वापरून किंमत काढा: (${t + 11}⁰ + ${b + 7}⁰) × ${a}`,
        hiQ: `घातांक नियम का प्रयोग कर मान ज्ञात कीजिए: (${t + 11}⁰ + ${b + 7}⁰) × ${a}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Any non-zero number raised to 0 equals 1. So (1 + 1) × ${a} = 2 × ${a} = ${ans}.`,
        mrExp: `शून्येतर संख्येचा 0 घात = 1. म्हणून (1 + 1) × ${a} = ${ans}.`,
        hiExp: `शून्येतर संख्या का घात 0 होने पर मान 1 होता है। अतः (1 + 1) × ${a} = ${ans}।`,
      };
    }
    case 10: {
      // Square Root simplification
      const r1 = 8 + t; // 9..33
      const r2 = 5 + (t % 7);
      const ans = r1 + r2;
      const opts = makeNumericOptions(ans, [2, -2, 5], correctIdx);
      return {
        topic: 'Square Roots & Cube Roots',
        enQ: `Find the value of √${r1 * r1} + √${r2 * r2} = ?`,
        mrQ: `वर्गमूळांची बेरीज काढा: √${r1 * r1} + √${r2 * r2} = किती?`,
        hiQ: `मान ज्ञात कीजिए: √${r1 * r1} + √${r2 * r2} = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `√${r1 * r1} = ${r1} and √${r2 * r2} = ${r2}. Sum = ${r1} + ${r2} = ${ans}.`,
        mrExp: `√${r1 * r1} = ${r1} आणि √${r2 * r2} = ${r2}. बेरीज = ${ans}.`,
        hiExp: `√${r1 * r1} = ${r1} और √${r2 * r2} = ${r2}। योग = ${ans}।`,
      };
    }
    case 11: {
      // Smallest multiplier to make perfect square
      const primeMult = [2, 3, 5, 7, 11][t % 5];
      const baseSq = Math.floor((t - 1) / 5) + 3; // 3..7
      const num = baseSq * baseSq * primeMult;
      const opts = makeNumericOptions(primeMult, [2, 4, 3], correctIdx);
      return {
        topic: 'Square Roots & Cube Roots',
        enQ: `By what smallest natural number must ${num} be multiplied to obtain a perfect square?`,
        mrQ: `${num} या संख्येस कोणत्या लहानात लहान नैसर्गिक संख्येने गुणल्यास ती पूर्ण वर्ग संख्या बनेल?`,
        hiQ: `${num} को किस सबसे छोटी प्राकृत संख्या से गुणा करने पर वह एक पूर्ण वर्ग संख्या बन जाएगी?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${num} = ${baseSq}² × ${primeMult}. Multiplying by ${primeMult} completes the pair → (${baseSq * primeMult})².`,
        mrExp: `${num} = ${baseSq}² × ${primeMult}. म्हणून ${primeMult} ने गुणल्यास पूर्ण वर्ग मिळतो.`,
        hiExp: `${num} = ${baseSq}² × ${primeMult}। ${primeMult} से गुणा करने पर पूर्ण वर्ग बनता है।`,
      };
    }
    case 12: {
      // Cube & Cube Root
      const c = 3 + (t % 7); // 3..9
      const d = 10 + t;
      const ans = c + d;
      const opts = makeNumericOptions(ans, [3, -2, 5], correctIdx);
      return {
        topic: 'Square Roots & Cube Roots',
        enQ: `Evaluate: ∛${c * c * c} + √${d * d} = ?`,
        mrQ: `किंमत काढा: ∛${c * c * c} + √${d * d} = किती?`,
        hiQ: `मान ज्ञात कीजिए: ∛${c * c * c} + √${d * d} = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `∛${c * c * c} = ${c} and √${d * d} = ${d}. Total = ${ans}.`,
        mrExp: `${c * c * c} चे घनमूळ = ${c} आणि ${d * d} चे वर्गमूळ = ${d}. बेरीज = ${ans}.`,
        hiExp: `∛${c * c * c} = ${c} और √${d * d} = ${d}। योग = ${ans}।`,
      };
    }
    case 13: {
      // Algebraic Identity a² - b² = (a+b)(a-b)
      const a = 35 + t * 2;
      const b = 15 + (t % 9);
      const ans = (a + b) * (a - b);
      const opts = makeNumericOptions(ans, [20, -20, 100], correctIdx);
      return {
        topic: 'Algebraic Expressions',
        enQ: `Using the algebraic identity (a² - b²) = (a + b)(a - b), find the value of ${a}² - ${b}².`,
        mrQ: `नित्यसमीकरण (a² - b²) = (a + b)(a - b) वापरून ${a}² - ${b}² ची किंमत काढा.`,
        hiQ: `सर्वसमिका (a² - b²) = (a + b)(a - b) का प्रयोग कर ${a}² - ${b}² का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(${a} + ${b}) × (${a} - ${b}) = ${a + b} × ${a - b} = ${ans}.`,
        mrExp: `(${a} + ${b}) × (${a} - ${b}) = ${a + b} × ${a - b} = ${ans}.`,
        hiExp: `(${a} + ${b}) × (${a} - ${b}) = ${a + b} × ${a - b} = ${ans}।`,
      };
    }
    case 14: {
      // Algebraic Expression value substitution
      const x = 3 + (t % 5);
      const y = 2 + (t % 3);
      const coeff = 4 + t;
      const ans = coeff * x * x - 3 * y;
      const opts = makeNumericOptions(ans, [6, -6, 12], correctIdx);
      return {
        topic: 'Algebraic Expressions',
        enQ: `If x = ${x} and y = ${y}, find the value of the expression ${coeff}x² - 3y.`,
        mrQ: `जर x = ${x} आणि y = ${y} असेल, तर ${coeff}x² - 3y या राशीची किंमत किती?`,
        hiQ: `यदि x = ${x} और y = ${y} हो, तो व्यंजक ${coeff}x² - 3y का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${coeff}(${x}²) - 3(${y}) = ${coeff * x * x} - ${3 * y} = ${ans}.`,
        mrExp: `${coeff}×${x * x} - 3×${y} = ${ans}.`,
        hiExp: `${coeff}×${x * x} - 3×${y} = ${ans}।`,
      };
    }
    case 15: {
      // Linear Equation in one variable
      const x = 7 + t;
      const a = 3 + (t % 4);
      const b = 11 + (t % 7);
      const rhs = a * x - b;
      const opts = makeNumericOptions(x, [2, -2, 4], correctIdx);
      return {
        topic: 'Linear Equations',
        enQ: `Solve for x in the linear equation: ${a}x - ${b} = ${rhs}`,
        mrQ: `समीकरण सोडवा: ${a}x - ${b} = ${rhs}, तर x ची किंमत किती?`,
        hiQ: `रैखिक समीकरण हल कीजिए: ${a}x - ${b} = ${rhs}, x का मान ज्ञात करें।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${a}x = ${rhs} + ${b} = ${rhs + b} → x = ${rhs + b} ÷ ${a} = ${x}.`,
        mrExp: `${a}x = ${rhs + b}, म्हणून x = ${x}.`,
        hiExp: `${a}x = ${rhs + b}, अतः x = ${x}।`,
      };
    }
    case 16: {
      // Linear Equation Word Problem (Sum of 3 consecutive integers)
      const mid = 18 + t * 3;
      const sum = mid * 3;
      const ans = mid + 1; // largest of the three
      const opts = makeNumericOptions(ans, [1, -1, 3], correctIdx);
      return {
        topic: 'Linear Equations',
        enQ: `The sum of three consecutive whole numbers is ${sum}. What is the largest of these three numbers?`,
        mrQ: `तीन क्रमवार नैसर्गिक संख्यांची बेरीज ${sum} आहे, तर त्यांपैकी सर्वात मोठी संख्या कोणती?`,
        hiQ: `तीन क्रमागत प्राकृत संख्याओं का योग ${sum} है। इनमें से सबसे बड़ी संख्या कौन-सी है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Middle number = ${sum} ÷ 3 = ${mid}. Numbers are ${mid - 1}, ${mid}, ${ans}. Largest = ${ans}.`,
        mrExp: `मधली संख्या = ${sum} ÷ 3 = ${mid}. म्हणून सर्वात मोठी संख्या = ${ans}.`,
        hiExp: `मध्य संख्या = ${sum} ÷ 3 = ${mid}। सबसे बड़ी संख्या = ${ans}।`,
      };
    }
    case 17: {
      // Age Problem (Linear Equations)
      const son = 8 + (t % 7);
      const mult = 4;
      const yrs = 4 + Math.floor(t / 7);
      const father = son * mult;
      const ans = father + yrs;
      const opts = makeNumericOptions(ans, [4, -4, 6], correctIdx, '', ' yrs');
      const mrOpts = makeNumericOptions(ans, [4, -4, 6], correctIdx, '', ' वर्षे');
      const hiOpts = makeNumericOptions(ans, [4, -4, 6], correctIdx, '', ' वर्ष');
      return {
        topic: 'Linear Equations',
        enQ: `Currently, a father is ${mult} times as old as his son. If the son's present age is ${son} years, what will be the father's age after ${yrs} years?`,
        mrQ: `सध्या वडिलांचे वय मुलाच्या वयाच्या ${mult} पट आहे. जर मुलाचे आजचे वय ${son} वर्षे असेल, तर ${yrs} वर्षांनंतर वडिलांचे वय किती वर्षे असेल?`,
        hiQ: `वर्तमान में पिता की आयु पुत्र की आयु की ${mult} गुनी है। यदि पुत्र की वर्तमान आयु ${son} वर्ष है, तो ${yrs} वर्ष बाद पिता की आयु क्या होगी?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Father's present age = ${mult} × ${son} = ${father} yrs. After ${yrs} years = ${father} + ${yrs} = ${ans} yrs.`,
        mrExp: `वडिलांचे आजचे वय = ${father} वर्षे. ${yrs} वर्षांनंतर = ${ans} वर्षे.`,
        hiExp: `पिता की वर्तमान आयु = ${father} वर्ष। ${yrs} वर्ष बाद = ${ans} वर्ष।`,
      };
    }
    case 18: {
      // Ratio Division of Amount
      const r1 = 3 + (t % 3);
      const r2 = 5 + (t % 2);
      const part = 200 + t * 50;
      const total = (r1 + r2) * part;
      const ans = r2 * part; // larger share
      const opts = makeNumericOptions(ans, [part, -part, 100], correctIdx, '₹');
      return {
        topic: 'Ratio and Proportion',
        enQ: `₹${total} is divided between ${name} and Rohan in the ratio ${r1} : ${r2}. Find the larger share.`,
        mrQ: `₹${total} ही रक्कम ${name} आणि रोहन यांच्यात ${r1} : ${r2} या प्रमाणात वाटली, तर मोठा हिस्सा किती रुपये येईल?`,
        hiQ: `₹${total} को ${name} और रोहन के बीच ${r1} : ${r2} के अनुपात में बाँटा गया। बड़ा हिस्सा कितना होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total parts = ${r1} + ${r2} = ${r1 + r2}. 1 part = ${total} ÷ ${r1 + r2} = ₹${part}. Larger share = ${r2} × ${part} = ₹${ans}.`,
        mrExp: `एकूण भाग = ${r1 + r2}, 1 भाग = ₹${part}. मोठा हिस्सा = ₹${ans}.`,
        hiExp: `कुल भाग = ${r1 + r2}, 1 भाग = ₹${part}। बड़ा हिस्सा = ₹${ans}।`,
      };
    }
    case 19: {
      // Inverse Proportion (Workers & Days)
      const days2 = 6;
      const validW1 = 12 + (t % 4) * 6; // divisible by 6: 12, 18, 24, 30
      const validD1 = 10 + t;
      const work2 = validW1 * validD1;
      const ans = work2 / days2;
      const opts = makeNumericOptions(ans, [4, -4, 8], correctIdx);
      return {
        topic: 'Direct & Inverse Variation',
        enQ: `If ${validW1} workers can finish paving a road in ${city} in ${validD1} days, how many workers are needed to finish the same work in ${days2} days?`,
        mrQ: `${city} मधील एका रस्त्याचे काम ${validW1} मजूर ${validD1} दिवसांत पूर्ण करतात, तर तेच काम ${days2} दिवसांत पूर्ण करण्यासाठी किती मजूर लागतील?`,
        hiQ: `${city} में एक सड़क निर्माण कार्य ${validW1} मजदूर ${validD1} दिनों में पूरा करते हैं। वही काम ${days2} दिनों में पूरा करने के लिए कितने मजदूर चाहिए?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Inverse variation: W₁ × D₁ = W₂ × D₂ → ${validW1} × ${validD1} ÷ ${days2} = ${ans} workers.`,
        mrExp: `व्यस्त चलन: (${validW1} × ${validD1}) ÷ ${days2} = ${ans} मजूर.`,
        hiExp: `व्युत्क्रमानुपात: (${validW1} × ${validD1}) ÷ ${days2} = ${ans} मजदूर।`,
      };
    }
    case 20: {
      // Percentage value calculation
      const pct = 15 + (t % 6) * 5; // 15, 20, 25, 30, 35, 40
      const base = 400 + t * 40;
      const ans = (pct * base) / 100;
      const opts = makeNumericOptions(ans, [20, -20, 40], correctIdx);
      return {
        topic: 'Percentage',
        enQ: `In an inter-school scholarship mock exam held in ${city}, ${pct}% of ${base} registered students scored above 90%. How many students scored above 90%?`,
        mrQ: `${city} येथे घेतलेल्या सराव परीक्षेत नोंदणी केलेल्या ${base} विद्यार्थ्यांपैकी ${pct}% विद्यार्थ्यांनी 90% पेक्षा अधिक गुण मिळवले, तर असे विद्यार्थी किती?`,
        hiQ: `${city} में आयोजित परीक्षा में पंजीकृत ${base} विद्यार्थियों में से ${pct}% ने 90% से अधिक अंक प्राप्त किए। ऐसे विद्यार्थियों की संख्या कितनी है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${pct}% of ${base} = (${pct}/100) × ${base} = ${ans}.`,
        mrExp: `${base} चे ${pct}% = (${pct}/100) × ${base} = ${ans}.`,
        hiExp: `${base} का ${pct}% = (${pct}/100) × ${base} = ${ans}।`,
      };
    }
    case 21: {
      // Percentage increase / decrease
      const orig = 500 + t * 50;
      const inc = 10 + (t % 3) * 10; // 10%, 20%, 30%
      const ans = orig + (orig * inc) / 100;
      const opts = makeNumericOptions(ans, [50, -50, 100], correctIdx, '₹');
      return {
        topic: 'Percentage',
        enQ: `The price of a scientific calculator was ₹${orig}. If its price increases by ${inc}%, what is the new price?`,
        mrQ: `एका कॅल्क्युलेटरची मूळ किंमत ₹${orig} होती. किंमत ${inc}% ने वाढल्यास नवी किंमत किती रुपये होईल?`,
        hiQ: `एक कैलकुलेटर का मूल्य ₹${orig} था। यदि मूल्य में ${inc}% की वृद्धि हो जाए, तो नया मूल्य क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Increase = ${inc}% of ${orig} = ₹${(orig * inc) / 100}. New price = ${orig} + ${(orig * inc) / 100} = ₹${ans}.`,
        mrExp: `वाढ = ₹${(orig * inc) / 100}. नवी किंमत = ₹${ans}.`,
        hiExp: `वृद्धि = ₹${(orig * inc) / 100}। नया मूल्य = ₹${ans}।`,
      };
    }
    case 22: {
      // Profit Percentage
      const cp = 400 + t * 50;
      const profitPct = 10 + (t % 4) * 5; // 10, 15, 20, 25
      const profit = (cp * profitPct) / 100;
      const sp = cp + profit;
      const opts = makeNumericOptions(profitPct, [5, -5, 10], correctIdx, '', '%');
      return {
        topic: 'Profit, Loss & Discount',
        enQ: `A shopkeeper bought a bicycle for ₹${cp} and sold it for ₹${sp}. Find the profit percentage.`,
        mrQ: `एका दुकानदाराने एक वस्तू ₹${cp} ला खरेदी करून ₹${sp} ला विकली, तर त्याला शेकडा नफा किती टक्के झाला?`,
        hiQ: `एक दुकानदार ने एक वस्तु ₹${cp} में खरीदकर ₹${sp} में बेची। लाभ प्रतिशत ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Profit = ${sp} - ${cp} = ₹${profit}. Profit % = (${profit} ÷ ${cp}) × 100 = ${profitPct}%.`,
        mrExp: `नफा = ₹${profit}. शेकडा नफा = (${profit} ÷ ${cp}) × 100 = ${profitPct}%.`,
        hiExp: `लाभ = ₹${profit}। लाभ% = (${profit} ÷ ${cp}) × 100 = ${profitPct}%।`,
      };
    }
    case 23: {
      // Marked Price & Discount
      const mp = 800 + t * 100;
      const discPct = 10 + (t % 3) * 5; // 10, 15, 20
      const disc = (mp * discPct) / 100;
      const sp = mp - disc;
      const opts = makeNumericOptions(sp, [disc, -40, 80], correctIdx, '₹');
      return {
        topic: 'Profit, Loss & Discount',
        enQ: `A book set has a marked price of ₹${mp}. If the publisher gives a ${discPct}% discount, what is its selling price?`,
        mrQ: `एका पुस्तक संचाची छापील किंमत ₹${mp} आहे. त्यावर ${discPct}% सूट दिल्यास विक्री किंमत किती?`,
        hiQ: `एक पुस्तक सेट का अंकित मूल्य ₹${mp} है। यदि ${discPct}% छूट दी जाए, तो विक्रय मूल्य क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Discount = ${discPct}% of ${mp} = ₹${disc}. Selling price = ${mp} - ${disc} = ₹${sp}.`,
        mrExp: `सूट = ₹${disc}. विक्री किंमत = ${mp} - ${disc} = ₹${sp}.`,
        hiExp: `छूट = ₹${disc}। विक्रय मूल्य = ${mp} - ${disc} = ₹${sp}।`,
      };
    }
    case 24: {
      // Simple Interest (SI = P*R*T / 100)
      const P = 2000 + t * 500;
      const R = 6 + (t % 5); // 6..10
      const T = 3;
      const si = (P * R * T) / 100;
      const opts = makeNumericOptions(si, [150, -100, 300], correctIdx, '₹');
      return {
        topic: 'Simple Interest',
        enQ: `${name} deposited ₹${P} in a bank for ${T} years at ${R}% per annum simple interest. How much simple interest will ${name} earn?`,
        mrQ: `${name} ने बँकेत द.सा.द.शे. ${R}% सरळव्याज दराने ${T} वर्षांसाठी ₹${P} ठेवले, तर एकूण सरळव्याज किती रुपये मिळेल?`,
        hiQ: `${name} ने बैंक में ${R}% वार्षिक साधारण ब्याज की दर से ${T} वर्षों के लिए ₹${P} जमा किए। कुल साधारण ब्याज कितना मिलेगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `SI = (P × R × T) / 100 = (${P} × ${R} × ${T}) / 100 = ₹${si}.`,
        mrExp: `सरळव्याज = (म × द × क) / 100 = ₹${si}.`,
        hiExp: `साधारण ब्याज = (मूलधन × दर × समय) / 100 = ₹${si}।`,
      };
    }
    case 25: {
      // Find Rate % in Simple Interest
      const P = 3000 + t * 400;
      const T = 4;
      const R = 5 + (t % 6); // 5..10
      const si = (P * R * T) / 100;
      const opts = makeNumericOptions(R, [2, -1, 3], correctIdx, '', '%');
      return {
        topic: 'Simple Interest',
        enQ: `At what rate percent per annum will ₹${P} yield a simple interest of ₹${si} in ${T} years?`,
        mrQ: `₹${P} मुद्दलाचे ${T} वर्षांचे सरळव्याज ₹${si} होते, तर व्याजाचा वार्षिक दर (द.सा.द.शे.) किती?`,
        hiQ: `किस वार्षिक ब्याज दर से ₹${P} पर ${T} वर्षों में ₹${si} साधारण ब्याज प्राप्त होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rate R = (SI × 100) / (P × T) = (${si} × 100) / (${P} × ${T}) = ${R}%.`,
        mrExp: `दर = (व्याज × 100) / (मुद्दल × काळ) = ${R}%.`,
        hiExp: `दर = (ब्याज × 100) / (मूलधन × समय) = ${R}%।`,
      };
    }
    case 26: {
      // Average calculation & replacement/new average
      const n = 5;
      const avg1 = 42 + t;
      const added = avg1 + 12;
      const ans = (n * avg1 + added) / 6;
      const opts = makeNumericOptions(ans, [2, -2, 4], correctIdx);
      return {
        topic: 'Average & Statistics',
        enQ: `The average marks of ${n} students in a test was ${avg1}. When a 6th student scoring ${added} marks joins the group, find the new average of all 6 students.`,
        mrQ: `${n} विद्यार्थ्यांच्या गुणांची सरासरी ${avg1} आहे. त्यात ${added} गुण मिळवणारा सहावा विद्यार्थी सामील झाल्यास सर्व 6 विद्यार्थ्यांची नवी सरासरी किती?`,
        hiQ: `${n} विद्यार्थियों के अंकों का औसत ${avg1} है। यदि ${added} अंक पाने वाला एक छठा विद्यार्थी जुड़ जाए, तो सभी 6 विद्यार्थियों का नया औसत क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total of 5 = ${n * avg1}. New total = ${n * avg1} + ${added} = ${n * avg1 + added}. New average = ${n * avg1 + added} ÷ 6 = ${ans}.`,
        mrExp: `6 जणांची एकूण बेरीज = ${n * avg1 + added}. नवी सरासरी = ${n * avg1 + added} ÷ 6 = ${ans}.`,
        hiExp: `कुल योग = ${n * avg1 + added}। नया औसत = ${n * avg1 + added} ÷ 6 = ${ans}।`,
      };
    }
    case 27: {
      // Speed unit conversion (t=1..13: km/h -> m/s; t=14..25: m/s -> km/h)
      if (t <= 13) {
        const k = t + 1; // 2..14 -> 36..252 km/h -> 10..70 m/s
        const kmh = k * 18;
        const mps = k * 5;
        const opts = makeNumericOptions(mps, [3, -2, 5], correctIdx, '', ' m/s');
        const mrOpts = makeNumericOptions(mps, [3, -2, 5], correctIdx, '', ' मी/से');
        return {
          topic: 'Speed, Time & Distance',
          enQ: `An express train passes ${city} Junction at a uniform speed of ${kmh} km/h. Express this speed in m/s.`,
          mrQ: `एक एक्सप्रेस रेल्वे ${city} स्थानकाजवळून ${kmh} किमी/तास वेगाने धावत आहे. तिचा वेग मीटर प्रति सेकंद (m/s) मध्ये किती?`,
          hiQ: `एक एक्सप्रेस ट्रेन ${city} जंक्शन के पास ${kmh} किमी/घंटा की चाल से चल रही है। इसकी चाल मीटर प्रति सेकंड (m/s) में ज्ञात कीजिए।`,
          enOpts: opts,
          mrOpts,
          hiOpts: mrOpts,
          enExp: `Multiply km/h by 5/18: ${kmh} × (5/18) = ${mps} m/s.`,
          mrExp: `किमी/तास चे मी/से करताना 5/18 ने गुणतात: ${kmh} × 5/18 = ${mps} मी/से.`,
          hiExp: `5/18 से गुणा करने पर: ${kmh} × 5/18 = ${mps} मी/से।`,
        };
      } else {
        const k = t - 12; // 2..13 -> 10..65 m/s -> 36..234 km/h
        const mps = k * 5;
        const kmh = k * 18;
        const opts = makeNumericOptions(kmh, [18, -18, 9], correctIdx, '', ' km/h');
        const mrOpts = makeNumericOptions(kmh, [18, -18, 9], correctIdx, '', ' किमी/तास');
        const hiOpts = makeNumericOptions(kmh, [18, -18, 9], correctIdx, '', ' किमी/घंटा');
        return {
          topic: 'Speed, Time & Distance',
          enQ: `A sprinter or express vehicle travels at ${mps} m/s near ${city}. Convert this speed into km/h.`,
          mrQ: `${city} जवळ एक वाहन ${mps} मीटर प्रति सेकंद (m/s) वेगाने धावत आहे, तर त्याचा ताशी वेग (km/h) किती?`,
          hiQ: `${city} के पास एक वाहन ${mps} मीटर प्रति सेकंड की चाल से चल रहा है। इस चाल को किमी/घंटा में बदलिए।`,
          enOpts: opts,
          mrOpts,
          hiOpts,
          enExp: `Multiply m/s by 18/5: ${mps} × (18/5) = ${kmh} km/h.`,
          mrExp: `मी/से चे किमी/तास करताना 18/5 ने गुणतात: ${mps} × 18/5 = ${kmh} किमी/तास.`,
          hiExp: `18/5 से गुणा करने पर: ${mps} × 18/5 = ${kmh} किमी/घंटा।`,
        };
      }
    }
    case 28: {
      // Train crossing a platform
      const trainLen = 140 + t * 10;
      const timeSec = 14 + (t % 8);
      const speedMps = 20;
      const totalDist = speedMps * timeSec;
      const pLen = totalDist - trainLen;
      const opts = makeNumericOptions(pLen, [20, -20, 40], correctIdx, '', ' m');
      const mrOpts = makeNumericOptions(pLen, [20, -20, 40], correctIdx, '', ' मीटर');
      return {
        topic: 'Speed, Time & Distance',
        enQ: `A ${trainLen}-metre-long train moving at ${speedMps} m/s completely crosses a railway platform in ${timeSec} seconds. Find the length of the platform.`,
        mrQ: `${trainLen} मीटर लांबीची रेल्वे ${speedMps} मी/से वेगाने एका प्लॅटफॉर्मला ${timeSec} सेकंदांत पूर्ण ओलांडते, तर त्या प्लॅटफॉर्मची लांबी किती मीटर?`,
        hiQ: `${trainLen} मीटर लंबी एक रेलगाड़ी ${speedMps} मी/से की चाल से एक प्लेटफॉर्म को ${timeSec} सेकंड में पार करती है। प्लेटफॉर्म की लंबाई ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Total distance covered = ${speedMps} × ${timeSec} = ${totalDist} m. Platform = ${totalDist} - ${trainLen} = ${pLen} m.`,
        mrExp: `एकूण अंतर = ${speedMps} × ${timeSec} = ${totalDist} मी. प्लॅटफॉर्म = ${totalDist} - ${trainLen} = ${pLen} मी.`,
        hiExp: `कुल दूरी = ${totalDist} मी। प्लेटफॉर्म की लंबाई = ${totalDist} - ${trainLen} = ${pLen} मीटर।`,
      };
    }
    case 29: {
      // Complementary & Supplementary Angles
      const a = 24 + t * 2; // 26..74
      const comp = 90 - a;
      const res = 90 + a;
      const opts = makeNumericOptions(res, [10, -10, 20], correctIdx, '', '°');
      return {
        topic: 'Geometry & Angles',
        enQ: `Find the measure of the supplementary angle of the complement of ${a}°.`,
        mrQ: `${a}° मापाच्या कोनाच्या कोटिकोनाचा पूरक कोन किती अंशाचा असेल?`,
        hiQ: `${a}° कोण के कोटिपूरक कोण का संपूरक कोण कितने अंश का होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Complement of ${a}° = 90° - ${a}° = ${comp}°. Supplement of ${comp}° = 180° - ${comp}° = ${res}°.`,
        mrExp: `${a}° चा कोटिकोन = ${comp}°. ${comp}° चा पूरक कोन = 180° - ${comp}° = ${res}°.`,
        hiExp: `${a}° का कोटिपूरक = ${comp}°। इसका संपूरक = 180° - ${comp}° = ${res}°।`,
      };
    }
    case 30: {
      // Parallel lines + Transversal interior angles
      const x = 14 + t; // distinct per test t = 1..25!
      const adj = 20;
      const ang1 = 2 * x + adj;
      const ang2 = 180 - ang1;
      const opts = makeNumericOptions(x, [3, -3, 5], correctIdx, '', '°');
      return {
        topic: 'Geometry & Angles',
        enQ: `Two interior angles on the same side of a transversal intersecting parallel lines measure (2x + ${adj})° and ${ang2}°. Find x.`,
        mrQ: `दोन समांतर रेषांना एका छेदिकेने छेदल्यास होणारे आंतरकोन (2x + ${adj})° व ${ang2}° आहेत, तर x ची किंमत किती?`,
        hiQ: `दो समांतर रेखाओं को एक तिर्यक रेखा द्वारा काटने पर बने एक ही ओर के अंतःकोण (2x + ${adj})° और ${ang2}° हैं। x का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum of interior angles = 180° → 2x + ${adj} + ${ang2} = 180 → 2x = ${2 * x} → x = ${x}°.`,
        mrExp: `आंतरकोनांची बेरीज = 180° → 2x + ${adj + ang2} = 180 → x = ${x}°.`,
        hiExp: `अंतःकोणों का योग = 180° → 2x + ${adj + ang2} = 180 → x = ${x}°।`,
      };
    }
    case 31: {
      // Triangle Exterior Angle Theorem
      const a1 = 42 + t;
      const a2 = 38 + (t % 8) * 2;
      const ext = a1 + a2;
      const opts = makeNumericOptions(ext, [10, -8, 15], correctIdx, '', '°');
      return {
        topic: 'Geometry & Triangles',
        enQ: `If the two remote interior angles of a triangle measure ${a1}° and ${a2}°, find the measure of the exterior angle.`,
        mrQ: `एका त्रिकोणाच्या बाह्यकोनाचे दूरस्थ आंतरकोन ${a1}° आणि ${a2}° आहेत, तर त्या बाह्यकोनाचे माप किती?`,
        hiQ: `एक त्रिभुज के दो दूरस्थ अंतःकोण ${a1}° और ${a2}° हैं। इसके बहिष्कोण (Exterior Angle) का माप ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Exterior angle = sum of remote interior angles = ${a1}° + ${a2}° = ${ext}°.`,
        mrExp: `बाह्यकोन = दूरस्थ आंतरकोनांची बेरीज = ${a1}° + ${a2}° = ${ext}°.`,
        hiExp: `बहिष्कोण = दूरस्थ अंतःकोणों का योग = ${a1}° + ${a2}° = ${ext}°।`,
      };
    }
    case 32: {
      // Pythagoras Theorem (5 primitive triples x 5 scales = 25 unique right triangles)
      const triples: Array<[number, number, number]> = [
        [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41],
      ];
      const base = triples[(t - 1) % triples.length];
      const scale = Math.floor((t - 1) / triples.length) + 2; // 2..6
      const s1 = base[0] * scale;
      const s2 = base[1] * scale;
      const hyp = base[2] * scale;
      const opts = makeNumericOptions(hyp, [4, -3, 6], correctIdx, '', ' cm');
      const mrOpts = makeNumericOptions(hyp, [4, -3, 6], correctIdx, '', ' सेमी');
      return {
        topic: 'Pythagoras Theorem',
        enQ: `In a right-angled triangle, the sides forming the right angle measure ${s1} cm and ${s2} cm. Find the length of its hypotenuse.`,
        mrQ: `एका काटकोन त्रिकोणाच्या काटकोन करणाऱ्या बाजू ${s1} सेमी व ${s2} सेमी आहेत, तर त्याच्या कर्णाची लांबी किती सेमी?`,
        hiQ: `एक समकोण त्रिभुज की समकोण बनाने वाली भुजाएँ ${s1} सेमी और ${s2} सेमी हैं। इसके कर्ण की लंबाई ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Hypotenuse = √(${s1}² + ${s2}²) = √(${s1 * s1 + s2 * s2}) = ${hyp} cm.`,
        mrExp: `कर्ण = √(${s1}² + ${s2}²) = ${hyp} सेमी.`,
        hiExp: `कर्ण = √(${s1}² + ${s2}²) = ${hyp} सेमी।`,
      };
    }
    case 33: {
      // Circle Circumference (pi = 22/7)
      const radDistinct = 7 * (t + 1);
      const circ = 2 * 22 * (t + 1);
      const opts = makeNumericOptions(circ, [22, -22, 44], correctIdx, '', ' cm');
      const mrOpts = makeNumericOptions(circ, [22, -22, 44], correctIdx, '', ' सेमी');
      return {
        topic: 'Mensuration (Circle)',
        enQ: `Find the circumference of a circular garden whose radius is ${radDistinct} cm (take π = 22/7).`,
        mrQ: `एका वर्तुळाची त्रिज्या ${radDistinct} सेमी असल्यास, त्याचा परीघ किती सेमी? (π = 22/7 घ्या)`,
        hiQ: `एक वृत्त की त्रिज्या ${radDistinct} सेमी है। इसकी परिधि ज्ञात कीजिए (π = 22/7 लें)।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Circumference = 2πr = 2 × (22/7) × ${radDistinct} = ${circ} cm.`,
        mrExp: `परीघ = 2πr = 2 × (22/7) × ${radDistinct} = ${circ} सेमी.`,
        hiExp: `परिधि = 2πr = 2 × (22/7) × ${radDistinct} = ${circ} सेमी।`,
      };
    }
    case 34: {
      // Circle Area (pi = 22/7)
      const r = 7 * t;
      const area = 22 * 7 * t * t; // (22/7) * (7t)^2 = 154 * t^2
      const opts = makeNumericOptions(area, [154, -77, 308], correctIdx, '', ' sq.cm');
      const mrOpts = makeNumericOptions(area, [154, -77, 308], correctIdx, '', ' चौ.सेमी');
      const hiOpts = makeNumericOptions(area, [154, -77, 308], correctIdx, '', ' वर्ग सेमी');
      return {
        topic: 'Mensuration (Circle)',
        enQ: `Calculate the area of a circular disc of radius ${r} cm (use π = 22/7).`,
        mrQ: `${r} सेमी त्रिज्या असलेल्या वर्तुळाकार चकतीचे क्षेत्रफळ किती चौ.सेमी? (π = 22/7)`,
        hiQ: `${r} सेमी त्रिज्या वाली वृत्ताकार तश्तरी का क्षेत्रफल ज्ञात कीजिए (π = 22/7)।`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Area = πr² = (22/7) × ${r} × ${r} = ${area} sq.cm.`,
        mrExp: `क्षेत्रफळ = πr² = (22/7) × ${r}² = ${area} चौ.सेमी.`,
        hiExp: `क्षेत्रफल = πr² = (22/7) × ${r}² = ${area} वर्ग सेमी।`,
      };
    }
    case 35: {
      // Area of Rhombus = 1/2 × d1 × d2
      const d1 = 12 + t * 2;
      const d2 = 10 + (t % 8) * 2;
      const area = (d1 * d2) / 2;
      const opts = makeNumericOptions(area, [d1, -d2, 24], correctIdx, '', ' sq.cm');
      const mrOpts = makeNumericOptions(area, [d1, -d2, 24], correctIdx, '', ' चौ.सेमी');
      const hiOpts = makeNumericOptions(area, [d1, -d2, 24], correctIdx, '', ' वर्ग सेमी');
      return {
        topic: 'Mensuration',
        enQ: `The diagonals of a rhombus measure ${d1} cm and ${d2} cm. Find the area of the rhombus.`,
        mrQ: `एका समभुज चौकोनाच्या कर्णांची लांबी ${d1} सेमी व ${d2} सेमी आहे, तर त्याचे क्षेत्रफळ किती चौ.सेमी?`,
        hiQ: `एक समचतुर्भुज के विकर्ण क्रमशः ${d1} सेमी और ${d2} सेमी हैं। इसका क्षेत्रफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Area of rhombus = ½ × d₁ × d₂ = ½ × ${d1} × ${d2} = ${area} sq.cm.`,
        mrExp: `समभुज चौकोनाचे क्षेत्रफळ = ½ × ${d1} × ${d2} = ${area} चौ.सेमी.`,
        hiExp: `समचतुर्भुज का क्षेत्रफल = ½ × ${d1} × ${d2} = ${area} वर्ग सेमी।`,
      };
    }
    case 36: {
      // Total Surface Area of Cube = 6a²
      const a = 4 + t; // 5..29
      const tsa = 6 * a * a;
      const opts = makeNumericOptions(tsa, [a * a, -a * a, 24], correctIdx, '', ' sq.cm');
      const mrOpts = makeNumericOptions(tsa, [a * a, -a * a, 24], correctIdx, '', ' चौ.सेमी');
      const hiOpts = makeNumericOptions(tsa, [a * a, -a * a, 24], correctIdx, '', ' वर्ग सेमी');
      return {
        topic: 'Mensuration (3D Solids)',
        enQ: `Find the total surface area of a wooden cube whose each edge measures ${a} cm.`,
        mrQ: `प्रत्येक बाजू ${a} सेमी असलेल्या लाकडी घनाचे एकूण पृष्ठफळ किती चौ.सेमी असेल?`,
        hiQ: `${a} सेमी भुजा वाले एक लकड़ी के घन का कुल पृष्ठीय क्षेत्रफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Total Surface Area of cube = 6a² = 6 × ${a}² = 6 × ${a * a} = ${tsa} sq.cm.`,
        mrExp: `घनाचे एकूण पृष्ठफळ = 6a² = 6 × ${a * a} = ${tsa} चौ.सेमी.`,
        hiExp: `घन का कुल पृष्ठीय क्षेत्रफल = 6a² = 6 × ${a * a} = ${tsa} वर्ग सेमी।`,
      };
    }
    case 37: {
      // Volume of Cuboid
      const l = 10 + t;
      const b = 8 + (t % 5);
      const h = 5 + (t % 4);
      const vol = l * b * h;
      const opts = makeNumericOptions(vol, [l * b, -b * h, 100], correctIdx, '', ' cm³');
      const mrOpts = makeNumericOptions(vol, [l * b, -b * h, 100], correctIdx, '', ' घ.सेमी');
      return {
        topic: 'Mensuration (3D Solids)',
        enQ: `A rectangular water tank is ${l} cm long, ${b} cm wide, and ${h} cm high. Calculate its volume.`,
        mrQ: `एका इष्टिकाचिती आकाराच्या टाकीची लांबी ${l} सेमी, रुंदी ${b} सेमी व उंची ${h} सेमी आहे, तर तिचे घनफळ किती?`,
        hiQ: `एक घनाभाकार टंकी की लंबाई ${l} सेमी, चौड़ाई ${b} सेमी और ऊँचाई ${h} सेमी है। इसका आयतन ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Volume = L × B × H = ${l} × ${b} × ${h} = ${vol} cm³.`,
        mrExp: `घनफळ = लांबी × रुंदी × उंची = ${l} × ${b} × ${h} = ${vol} घ.सेमी.`,
        hiExp: `आयतन = लं × चौ × ऊँ = ${l} × ${b} × ${h} = ${vol} घ.सेमी।`,
      };
    }
    case 38: {
      // Area of shaded border/path around rectangle
      const L = 20 + t;
      const B = 14 + (t % 7);
      const outerArea = L * B;
      const path = 2;
      const innerL = L - 2 * path;
      const innerB = B - 2 * path;
      const ans = outerArea - innerL * innerB;
      const opts = makeNumericOptions(ans, [16, -12, 24], correctIdx, '', ' sq.m');
      const mrOpts = makeNumericOptions(ans, [16, -12, 24], correctIdx, '', ' चौ.मी');
      const hiOpts = makeNumericOptions(ans, [16, -12, 24], correctIdx, '', ' वर्ग मी');
      return {
        topic: 'Mensuration',
        enQ: `A rectangular lawn is ${L} m long and ${B} m wide. A ${path}-metre-wide footpath runs inside along all four edges. Find the area of the footpath.`,
        mrQ: `${L} मी लांब व ${B} मी रुंद आयताकार बागेच्या आतील कडेने ${path} मी रुंदीचा रस्ता तयार केला, तर त्या रस्त्याचे क्षेत्रफळ किती चौ.मी?`,
        hiQ: `${L} मी लंबे और ${B} मी चौड़े आयताकार पार्क के भीतर चारों ओर ${path} मी चौड़ा रास्ता बना है। रास्ते का क्षेत्रफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Outer = ${L}×${B} = ${outerArea}. Inner = ${innerL}×${innerB} = ${innerL * innerB}. Path = ${outerArea} - ${innerL * innerB} = ${ans} sq.m.`,
        mrExp: `बाह्य क्षेत्रफळ = ${outerArea}, आतील = ${innerL * innerB}. रस्त्याचे क्षेत्रफळ = ${ans} चौ.मी.`,
        hiExp: `बाहरी = ${outerArea}, भीतरी = ${innerL * innerB}। रास्ते का क्षेत्रफल = ${ans} वर्ग मी।`,
      };
    }
    case 39: {
      // Median of 7 numbers
      const base = 14 + t * 2;
      const arr = [base - 8, base - 5, base - 2, base, base + 4, base + 9, base + 13];
      const shuffled = [arr[5], arr[1], arr[3], arr[0], arr[6], arr[2], arr[4]];
      const opts = makeNumericOptions(base, [2, -2, 4], correctIdx);
      return {
        topic: 'Statistics & Data Handling',
        enQ: `Find the median of the following data set: ${shuffled.join(', ')}.`,
        mrQ: `पुढील प्राप्तांकांचा मध्यक (Median) काढा: ${shuffled.join(', ')}.`,
        hiQ: `निम्नलिखित आँकड़ों की माध्यिका (Median) ज्ञात कीजिए: ${shuffled.join(', ')}।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sort in ascending order: ${arr.join(', ')}. The middle (4th) value is ${base}.`,
        mrExp: `चढत्या क्रमाने मांडणी: ${arr.join(', ')}. मधली (4थी) संख्या = ${base}.`,
        hiExp: `आरोही क्रम: ${arr.join(', ')}। मध्य (4था) पद = ${base}।`,
      };
    }
    case 40: {
      // Algebraic Expansion: Coefficient of x in (x + a)(x + b)
      const a = 3 + t;
      const b = 5 + (t % 7);
      const ans = a + b;
      const opts = makeNumericOptions(ans, [a, -2, a * b - ans], correctIdx);
      return {
        topic: 'Algebraic Expressions',
        enQ: `Find the coefficient of x in the expansion of (x + ${a})(x + ${b}).`,
        mrQ: `(x + ${a})(x + ${b}) या विस्तारात x चा सहगुणक किती असेल?`,
        hiQ: `(x + ${a})(x + ${b}) के विस्तार में x का गुणांक क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(x + ${a})(x + ${b}) = x² + (${a}+${b})x + ${a * b} = x² + ${ans}x + ${a * b}. Coefficient of x is ${ans}.`,
        mrExp: `विस्तार = x² + ${ans}x + ${a * b}. म्हणून x चा सहगुणक = ${ans}.`,
        hiExp: `विस्तार = x² + ${ans}x + ${a * b}। अतः x का गुणांक = ${ans}।`,
      };
    }
    case 41: {
      // Divisibility by 11 (missing middle digit; distinct 4-digit multiple of 11 for every t=1..25)
      const baseMul = 123 + t * 19;
      const full11 = baseMul * 11;
      const sFull = String(full11);
      const hiddenDigit = Number(sFull[2]);
      const masked = `${sFull[0]}${sFull[1]}*${sFull.slice(3)}`;
      const opts = makeNumericOptions(hiddenDigit, [1, 2, -1], correctIdx, '', '', true);
      return {
        topic: 'Divisibility Rules',
        enQ: `If the number ${masked} is completely divisible by 11, find the digit in place of *.`,
        mrQ: `${masked} या संख्येस 11 ने नि:शेष भाग जात असल्यास * च्या जागी कोणता अंक येईल?`,
        hiQ: `यदि संख्या ${masked} पूर्णतः 11 से विभाज्य है, तो * के स्थान पर कौन-सा अंक आएगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Divisibility by 11 requires alternating sum of digits to be 0 or multiple of 11. Replacing * with ${hiddenDigit} gives ${full11} = 11 × ${baseMul}.`,
        mrExp: `* च्या जागी ${hiddenDigit} ठेवल्यास ${full11} ही संख्या मिळते व तिला 11 ने पूर्ण भाग जातो.`,
        hiExp: `* के स्थान पर ${hiddenDigit} रखने पर ${full11} प्राप्त होता है जो 11 से विभाज्य है।`,
      };
    }
    case 42: {
      // Unitary / Man-Hours or Tap filling (Ratio/Work)
      const m1 = 12 + t * 2;
      const t1 = 6;
      const t2 = 4;
      const ans = (t1 * m1) / t2; // since m1 is even and t1=6, 6*even/4 = 3*(even/2) -> integer if m1 even!
      const opts = makeNumericOptions(ans, [6, -6, 12], correctIdx, '', ' mins');
      const mrOpts = makeNumericOptions(ans, [6, -6, 12], correctIdx, '', ' मिनिटे');
      const hiOpts = makeNumericOptions(ans, [6, -6, 12], correctIdx, '', ' मिनट');
      return {
        topic: 'Direct & Inverse Variation',
        enQ: `${t1} identical water taps can fill a tank in ${m1} minutes. How many minutes will ${t2} such taps take to fill the same tank?`,
        mrQ: `एकाच क्षमतेचे ${t1} नळ एक टाकी ${m1} मिनिटांत भरतात, तर तसेच ${t2} नळ ती टाकी किती मिनिटांत भरतील?`,
        hiQ: `एक समान ${t1} नल एक टंकी को ${m1} मिनट में भरते हैं। वैसे ही ${t2} नल उसी टंकी को कितने मिनट में भरेंगे?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Time = (${t1} × ${m1}) ÷ ${t2} = ${t1 * m1} ÷ ${t2} = ${ans} minutes.`,
        mrExp: `वेळ = (${t1} × ${m1}) ÷ ${t2} = ${ans} मिनिटे.`,
        hiExp: `समय = (${t1} × ${m1}) ÷ ${t2} = ${ans} मिनट।`,
      };
    }
    case 43: {
      // Compound Cost/Fencing Perimeter + Cost per metre
      const len = 32 + t * 2;
      const br = 18 + (t % 7);
      const rounds = 4;
      const wireLen = 2 * (len + br) * rounds;
      const rate = 15;
      const cost = wireLen * rate;
      const opts = makeNumericOptions(cost, [wireLen, -rate * 10, 600], correctIdx, '₹');
      return {
        topic: 'Mensuration',
        enQ: `A rectangular farm is ${len} m long and ${br} m wide. Find the total cost of putting a ${rounds}-round barbed wire fence around it at ₹${rate} per metre.`,
        mrQ: `${len} मी लांब व ${br} मी रुंद आयताकार शेताला ₹${rate} प्रति मीटर दराने ${rounds} पदरी तारेचे कुंपण घालण्यास एकूण किती खर्च येईल?`,
        hiQ: `${len} मी लंबे और ${br} मी चौड़े आयताकार खेत के चारों ओर ₹${rate} प्रति मीटर की दर से ${rounds} चक्कर तार की बाड़ लगाने का खर्च ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Perimeter = 2×(${len}+${br}) = ${2 * (len + br)} m. Wire for ${rounds} rounds = ${wireLen} m. Cost = ${wireLen} × ₹${rate} = ₹${cost}.`,
        mrExp: `परिमिती = ${2 * (len + br)} मी, ${rounds} पदरी तार = ${wireLen} मी. एकूण खर्च = ₹${cost}.`,
        hiExp: `परिमाप = ${2 * (len + br)} मी, कुल तार = ${wireLen} मी। कुल खर्च = ₹${cost}।`,
      };
    }
    case 44: {
      // Probability / Percentage Mix (Boys & Girls or Marbles)
      const red = 6 + (t % 7);
      const blue = 8 + (t % 5);
      const green = 10 + t;
      const total = red + blue + green;
      const corr = formatFraction(red, total);
      const w1 = formatFraction(blue, total);
      const w2 = formatFraction(red + 1, total);
      const w3 = formatFraction(red, total - green);
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Probability & Data',
        enQ: `A bag contains ${red} red, ${blue} blue, and ${green} green balls. If one ball is drawn at random, what is the probability of drawing a red ball (in simplest form)?`,
        mrQ: `एका पिशवीत ${red} लाल, ${blue} निळे आणि ${green} हिरवे चेंडू आहेत. त्यांतून यादृच्छिकपणे एक चेंडू काढल्यास तो लाल असण्याची संभाव्यता (संक्षिप्त रूपात) किती?`,
        hiQ: `एक थैले में ${red} लाल, ${blue} नीली और ${green} हरी गेंदें हैं। यदि एक गेंद यादृच्छिक रूप से निकाली जाए, तो लाल गेंद आने की प्रायिकता (सरलतम रूप में) क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total balls = ${red} + ${blue} + ${green} = ${total}. P(Red) = ${red}/${total} = ${corr}.`,
        mrExp: `एकूण चेंडू = ${total}. संभाव्यता = ${red}/${total} = ${corr}.`,
        hiExp: `कुल गेंदें = ${total}। प्रायिकता = ${red}/${total} = ${corr}।`,
      };
    }
    case 45: {
      // Sum of Interior Angles of Polygon = (n - 2) * 180
      const n = 4 + t; // 5..29 sides -> strictly unique per test t!
      const ans = (n - 2) * 180;
      const opts = makeNumericOptions(ans, [180, -180, 360], correctIdx, '', '°');
      return {
        topic: 'Geometry & Polygons',
        enQ: `What is the sum of all interior angles of a convex polygon having ${n} sides?`,
        mrQ: `${n} बाजू असलेल्या बहुभुजाकृतीच्या सर्व आंतरकोनांच्या मापांची बेरीज किती अंश असते?`,
        hiQ: `${n} भुजाओं वाले एक बहुभुज के सभी अंतःकोणों का योगफल कितने डिग्री होता है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum of interior angles = (n - 2) × 180° = (${n} - 2) × 180° = ${ans}°.`,
        mrExp: `आंतरकोनांची बेरीज = (n - 2) × 180° = (${n} - 2) × 180° = ${ans}°.`,
        hiExp: `अंतःकोणों का योग = (n - 2) × 180° = (${n} - 2) × 180° = ${ans}°।`,
      };
    }
    case 46: {
      // Mean (Average) of first k odd numbers / consecutive multiples
      const k = 6 + t; // 7..31
      const ans = k * k;
      const opts = makeNumericOptions(ans, [k, -k, 2 * k], correctIdx);
      return {
        topic: 'Number Patterns & Sequences',
        enQ: `Find the sum of the first ${k} consecutive odd natural numbers (1 + 3 + 5 + ...).`,
        mrQ: `पहिल्या ${k} क्रमवार विषम नैसर्गिक संख्यांची (1 + 3 + 5 + ...) बेरीज किती?`,
        hiQ: `प्रथम ${k} क्रमागत विषम प्राकृत संख्याओं (1 + 3 + 5 + ...) का योगफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum of first n consecutive odd numbers = n² = ${k}² = ${ans}.`,
        mrExp: `पहिल्या n विषम संख्यांची बेरीज = n² = ${k}² = ${ans}.`,
        hiExp: `प्रथम n विषम संख्याओं का योग = n² = ${k}² = ${ans}।`,
      };
    }
    case 47: {
      // Number Puzzle: Difference of Squares of consecutive numbers
      const n = 25 + t * 2;
      const ans = 2 * n + 1;
      const opts = makeNumericOptions(ans, [2, -2, 4], correctIdx);
      return {
        topic: 'Algebraic Expressions',
        enQ: `Calculate without full multiplication: ${n + 1}² - ${n}² = ?`,
        mrQ: `सोप्या पद्धतीने किंमत काढा: ${n + 1}² - ${n}² = किती?`,
        hiQ: `सरल विधि से मान ज्ञात कीजिए: ${n + 1}² - ${n}² = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(n + 1)² - n² = (n + 1 + n)(1) = ${n + 1} + ${n} = ${ans}.`,
        mrExp: `वर्गांतील फरक = ${n + 1} + ${n} = ${ans}.`,
        hiExp: `वर्गों का अंतर = ${n + 1} + ${n} = ${ans}।`,
      };
    }
    case 48: {
      // Original Number from %
      const pVal = 20;
      const partVal = 36 + t * 4;
      const orig = partVal * 5;
      const opts = makeNumericOptions(orig, [20, -25, 50], correctIdx);
      return {
        topic: 'Percentage',
        enQ: `If ${pVal}% of a number is ${partVal}, what is 100% of that number?`,
        mrQ: `एका संख्येचे ${pVal}% म्हणजे ${partVal} असेल, तर ती मूळ संख्या कोणती?`,
        hiQ: `यदि किसी संख्या का ${pVal}%, ${partVal} के बराबर है, तो वह मूल संख्या क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Number = (${partVal} × 100) ÷ ${pVal} = ${partVal} × 5 = ${orig}.`,
        mrExp: `संख्या = (${partVal} × 100) ÷ ${pVal} = ${orig}.`,
        hiExp: `संख्या = (${partVal} × 100) ÷ ${pVal} = ${orig}।`,
      };
    }
    default: {
      // case 49: Compounded Word Problem (Profit/Loss + Tax/Transport)
      const buy = 1200 + t * 100;
      const repair = 200 + (t % 5) * 50;
      const cpTotal = buy + repair;
      const pct = 20;
      const sp = cpTotal + (cpTotal * pct) / 100;
      const opts = makeNumericOptions(sp, [repair, -100, 150], correctIdx, '₹');
      return {
        topic: 'Profit, Loss & Discount',
        enQ: `${name} bought an old bicycle in ${city} for ₹${buy} and spent ₹${repair} on repairs. At what price should ${name} sell it to make a ${pct}% profit on the total cost?`,
        mrQ: `${name} ने ${city} मधून एक जुनी सायकल ₹${buy} ला विकत घेतली व तिच्या दुरुस्तीसाठी ₹${repair} खर्च केले. एकूण खर्चावर ${pct}% नफा मिळवण्यासाठी ती किती रुपयांना विकावी?`,
        hiQ: `${name} ने ${city} में एक पुरानी साइकिल ₹${buy} में खरीदी और मरम्मत पर ₹${repair} खर्च किए। कुल लागत पर ${pct}% लाभ कमाने के लिए इसे कितने रुपये में बेचना चाहिए?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total CP = ${buy} + ${repair} = ₹${cpTotal}. Selling price = ${cpTotal} + 20% of ${cpTotal} = ₹${sp}.`,
        mrExp: `एकूण खरेदी खर्च = ₹${cpTotal}. 20% नफ्याने विक्री किंमत = ₹${sp}.`,
        hiExp: `कुल लागत = ₹${cpTotal}। 20% लाभ पर विक्रय मूल्य = ₹${sp}।`,
      };
    }
  }
}
