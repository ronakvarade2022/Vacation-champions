import {
  formatFraction,
  gcd,
  makeNumericOptions,
  placeStringOptions,
  RawGeneratedQuestion,
  toRomanNumeral,
} from './msceQuestionHelpers';

/**
 * Generates ONE Std 4th (PSE) Mathematics question for slot idx (0..49) of Mock Test t (1..25).
 * Every idx = 0..49 is a distinct MSCE Class 4 syllabus concept; every t = 1..25 yields unique numbers/contexts.
 * Zero Class 7 topics (no Pythagoras, square roots, LCM/HCF algebra, %, or SI).
 */
export function buildStd4MathsQuestion(
  t: number,
  idx: number,
  correctIdx: number
): RawGeneratedQuestion {
  const cities = ['Pune', 'Nashik', 'Nagpur', 'Kolhapur', 'Satara', 'Solapur', 'Amravati', 'Latur', 'Jalgaon', 'Ratnagiri'];
  const city = cities[(t + idx) % cities.length];
  const names = ['Aarav', 'Riya', 'Kabir', 'Ananya', 'Vivaan', 'Meera', 'Soham', 'Tanvi', 'Pranav', 'Kavya'];
  const name = names[(t * 3 + idx) % names.length];

  switch (idx) {
    case 0: {
      // Predecessor & Successor addition
      const x = 1250 + t * 145;
      const sum = (x - 1) + (x + 1);
      const opts = makeNumericOptions(sum, [2, -2, 10], correctIdx);
      return {
        topic: 'Number System',
        enQ: `Find the sum of the predecessor and the successor of the number ${x}.`,
        mrQ: `${x} या संख्येची लगतची मागची संख्या आणि लगतची पुढची संख्या यांची बेरीज किती?`,
        hiQ: `संख्या ${x} के पूर्ववर्ती और परवर्ती का योगफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Predecessor = ${x - 1}, Successor = ${x + 1}. Sum = ${x - 1} + ${x + 1} = ${sum}.`,
        mrExp: `लगतची मागची = ${x - 1}, लगतची पुढची = ${x + 1}. बेरीज = ${sum}.`,
        hiExp: `पूर्ववर्ती = ${x - 1}, परवर्ती = ${x + 1}. योग = ${sum}।`,
      };
    }
    case 1: {
      // Forming largest 4-digit number from 4 distinct digits (25 unique 4-tuples from 1..9)
      const pool4: Array<[number, number, number, number]> = [];
      for (let a = 1; a <= 6; a++) {
        for (let b = a + 1; b <= 7; b++) {
          for (let c = b + 1; c <= 8; c++) {
            for (let d = c + 1; d <= 9; d++) {
              pool4.push([a, b, c, d]);
            }
          }
        }
      }
      const [d1, d2, d3, d4] = pool4[(t * 4) % pool4.length];
      const digs = [d4, d3, d2, d1];
      const largest = digs[0] * 1000 + digs[1] * 100 + digs[2] * 10 + digs[3];
      const swapLast = digs[0] * 1000 + digs[1] * 100 + digs[3] * 10 + digs[2];
      const smallest = digs[3] * 1000 + digs[2] * 100 + digs[1] * 10 + digs[0];
      const midVal = digs[1] * 1000 + digs[0] * 100 + digs[2] * 10 + digs[3];
      const opts = placeStringOptions(`${largest}`, [`${swapLast}`, `${smallest}`, `${midVal}`], correctIdx);
      const listStr = `${d2}, ${d4}, ${d1}, ${d3}`;
      return {
        topic: 'Number System',
        enQ: `Using each of the digits ${listStr} exactly once, what is the largest four-digit number that can be formed?`,
        mrQ: `${listStr} हे प्रत्येक अंक एकदाच वापरून तयार होणारी मोठ्यात मोठी चार अंकी संख्या कोणती?`,
        hiQ: `अंक ${listStr} में से प्रत्येक का केवल एक बार प्रयोग करके बनने वाली सबसे बड़ी चार अंकों की संख्या कौन-सी है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Arrange digits in descending order: ${digs.join(' > ')} → ${largest}.`,
        mrExp: `अंक उतरत्या क्रमाने मांडून मोठी संख्या ${largest} तयार होते.`,
        hiExp: `अंकों को अवरोही क्रम में रखने पर सबसे बड़ी संख्या ${largest} बनती है।`,
      };
    }
    case 2: {
      // Forming smallest 4-digit number containing 0 (25 unique 3-tuples from 1..9)
      const pool3: Array<[number, number, number]> = [];
      for (let a = 1; a <= 7; a++) {
        for (let b = a + 1; b <= 8; b++) {
          for (let c = b + 1; c <= 9; c++) {
            pool3.push([a, b, c]);
          }
        }
      }
      const [a, b, c] = pool3[(t * 3) % pool3.length];
      const ans = a * 1000 + 0 * 100 + b * 10 + c;
      const w1 = a * 1000 + b * 100 + 0 * 10 + c;
      const w2 = b * 1000 + 0 * 100 + a * 10 + c;
      const w3 = a * 1000 + c * 100 + b * 10;
      const opts = placeStringOptions(`${ans}`, [`${w1}`, `${w2}`, `${w3}`], correctIdx);
      const listStr = `${b}, 0, ${c}, ${a}`;
      return {
        topic: 'Number System',
        enQ: `What is the smallest 4-digit number formed using the digits ${listStr} once each?`,
        mrQ: `${listStr} हे अंक एकदाच वापरून तयार होणारी लहानात लहान चार अंकी संख्या कोणती?`,
        hiQ: `अंक ${listStr} का एक-एक बार उपयोग करके बनने वाली सबसे छोटी 4-अंकीय संख्या क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Place the smallest non-zero digit (${a}) first, followed by 0, ${b}, ${c} → ${ans}.`,
        mrExp: `शून्यापेक्षा मोठा सर्वात लहान अंक (${a}) प्रथम व नंतर 0 ठेवल्यास ${ans} मिळते.`,
        hiExp: `शून्य के अलावा सबसे छोटा अंक (${a}) पहले और फिर 0 रखने पर ${ans} बनता है।`,
      };
    }
    case 3: {
      // Roman Numerals (1..99) - distinct per test t!
      const val = 14 + t * 3; // 17, 20, ..., 89
      const rom = toRomanNumeral(val);
      const opts = makeNumericOptions(val, [10, -5, 2], correctIdx);
      return {
        topic: 'Roman Numerals',
        enQ: `What is the Hindu-Arabic value of the Roman numeral "${rom}"?`,
        mrQ: `"${rom}" या रोमन संख्याचिन्हाची आंतरराष्ट्रीय संख्या अंकात किंमत किती?`,
        hiQ: `रोमन संख्यांक "${rom}" का हिंदू-अरबी अंकों में मान कितना है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `In Roman numerals, ${rom} equals ${val}.`,
        mrExp: `रोमन संख्यालेखनानुसार ${rom} म्हणजे ${val}.`,
        hiExp: `रोमन अंक प्रणाली में ${rom} का मान ${val} होता है।`,
      };
    }
    case 4: {
      // Roman Numeral addition expression (Class 4 PSE staple)
      const a = 11 + t; // 12..36
      const b = 9 + ((t * 2) % 15); // 9..23
      const ans = a + b;
      const romA = toRomanNumeral(a);
      const romB = toRomanNumeral(b);
      const ansRom = toRomanNumeral(ans);
      const opts = placeStringOptions(
        ansRom,
        [toRomanNumeral(ans + 2), toRomanNumeral(Math.max(2, ans - 2)), toRomanNumeral(ans + 10)],
        correctIdx
      );
      return {
        topic: 'Roman Numerals',
        enQ: `Solve the Roman numeral addition and express the answer in Roman numerals: ${romA} + ${romB} = ?`,
        mrQ: `रोमन संख्यांची बेरीज रोमन संख्याचिन्हात लिहा: ${romA} + ${romB} = किती?`,
        hiQ: `रोमन अंकों का योगफल रोमन संख्या में लिखिए: ${romA} + ${romB} = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${romA} = ${a} and ${romB} = ${b}. Sum = ${a} + ${b} = ${ans} = ${ansRom}.`,
        mrExp: `${romA} = ${a} आणि ${romB} = ${b}. बेरीज = ${ans} = ${ansRom}.`,
        hiExp: `${romA} = ${a} और ${romB} = ${b}। योग = ${ans} = ${ansRom}।`,
      };
    }
    case 5: {
      // Place Value minus Face Value
      const d = (t % 7) + 2; // 2..8
      const d3 = ((t + 1) % 8) + 1;
      const d1 = ((t + 3) % 8) + 1;
      const d0 = ((t + 5) % 8) + 1;
      const num = d * 10000 + d3 * 1000 + 400 + d1 * 10 + d0;
      const pv = d * 10000;
      const diff = pv - d;
      const opts = makeNumericOptions(diff, [d, -9, 1000], correctIdx);
      return {
        topic: 'Place Value',
        enQ: `Find the difference between the place value and face value of digit ${d} in the 5-digit number ${num}.`,
        mrQ: `${num} या पाच अंकी संख्येतील ${d} या अंकाच्या स्थानिक किंमत व दर्शनी किंमत यांतील फरक किती?`,
        hiQ: `5-अंकीय संख्या ${num} में अंक ${d} के स्थानीय मान और जातीय मान के बीच का अंतर ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Place value = ${pv}, Face value = ${d}. Difference = ${pv} - ${d} = ${diff}.`,
        mrExp: `स्थानिक किंमत = ${pv}, दर्शनी किंमत = ${d}. फरक = ${diff}.`,
        hiExp: `स्थानीय मान = ${pv}, जातीय मान = ${d}। अंतर = ${diff}।`,
      };
    }
    case 6: {
      // Sum of place values of a repeated digit
      const d = (t % 6) + 3; // 3..8
      const a = ((t + 1) % 7) + 1;
      const b = ((t + 4) % 7) + 1;
      const num = d * 10000 + a * 1000 + d * 100 + b * 10 + ((t + 2) % 8) + 1;
      const ans = d * 10000 + d * 100;
      const opts = makeNumericOptions(ans, [d * 100, d * 10, 900], correctIdx);
      return {
        topic: 'Place Value',
        enQ: `In the number ${num}, what is the sum of the place values of the digit ${d}?`,
        mrQ: `${num} या संख्येमध्ये ${d} या अंकाच्या दोन्ही स्थानांवरील स्थानिक किमतींची बेरीज किती?`,
        hiQ: `संख्या ${num} में अंक ${d} के दोनों स्थानीय मानों का योगफल कितना होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Place values of ${d} are ${d * 10000} and ${d * 100}. Total sum = ${ans}.`,
        mrExp: `${d} च्या स्थानिक किमती ${d * 10000} आणि ${d * 100} आहेत. बेरीज = ${ans}.`,
        hiExp: `${d} के स्थानीय मान ${d * 10000} और ${d * 100} हैं। योग = ${ans}।`,
      };
    }
    case 7: {
      // Expanded form -> Standard 5-digit number
      const tth = ((t * 2) % 7) + 2;
      const th = (t % 8) + 1;
      const h = ((t + 3) % 8) + 1;
      const u = ((t + 5) % 9) + 1;
      const ans = tth * 10000 + th * 1000 + h * 100 + u;
      const opts = makeNumericOptions(ans, [90, 100, -10], correctIdx);
      const expForm = `${tth * 10000} + ${th * 1000} + ${h * 100} + ${u}`;
      return {
        topic: 'Place Value',
        enQ: `Write the standard 5-digit number for the expanded form: ${expForm}`,
        mrQ: `विस्तारित मांडणीवरून संख्या लिहा: ${expForm}`,
        hiQ: `विस्तारित रूप से मानक संख्या लिखिए: ${expForm}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${expForm} = ${ans} (with 0 in the tens place).`,
        mrExp: `दशक स्थानी 0 असल्याने ही संख्या ${ans} आहे.`,
        hiExp: `दहाई के स्थान पर 0 होने से मानक संख्या ${ans} है।`,
      };
    }
    case 8: {
      // Even & Odd reasoning (sum of first two consecutive even numbers after n)
      const n = 210 + t * 14;
      const e1 = n + 2;
      const e2 = n + 4;
      const ans = e1 + e2;
      const opts = makeNumericOptions(ans, [2, -2, 6], correctIdx);
      return {
        topic: 'Number System',
        enQ: `Find the sum of the two consecutive even numbers immediately after ${n}.`,
        mrQ: `${n} नंतर येणाऱ्या लगतच्या दोन सम संख्यांची बेरीज किती?`,
        hiQ: `${n} के ठीक बाद आने वाली दो क्रमागत सम संख्याओं का योग कितना है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Consecutive even numbers after ${n} are ${e1} and ${e2}. Sum = ${e1} + ${e2} = ${ans}.`,
        mrExp: `लगतच्या दोन सम संख्या ${e1} व ${e2} आहेत. बेरीज = ${ans}.`,
        hiExp: `क्रमागत सम संख्याएँ ${e1} और ${e2} हैं। योग = ${ans}।`,
      };
    }
    case 9: {
      // Three-term addition
      const a = 11420 + t * 315;
      const b = 15240 + t * 225;
      const c = 4135 + t * 110;
      const ans = a + b + c;
      const opts = makeNumericOptions(ans, [100, -100, 1000], correctIdx);
      return {
        topic: 'Addition',
        enQ: `In a library drive across ${city} district, ${a} Marathi books, ${b} English books, and ${c} Maths workbooks were distributed. Find the total books distributed.`,
        mrQ: `${city} जिल्ह्यातील वाचनालय अभियानात ${a} मराठी पुस्तके, ${b} इंग्रजी पुस्तके आणि ${c} गणित कार्यपुस्तिका वाटल्या, तर एकूण किती पुस्तके वाटली?`,
        hiQ: `${city} जिले के पुस्तकालय अभियान में ${a} मराठी पुस्तकें, ${b} अंग्रेज़ी पुस्तकें और ${c} गणित कार्यपुस्तिकाएँ बाँटी गईं। कुल कितनी पुस्तकें बाँटी गईं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total books = ${a} + ${b} + ${c} = ${ans}.`,
        mrExp: `एकूण पुस्तके = ${a} + ${b} + ${c} = ${ans}.`,
        hiExp: `कुल पुस्तकें = ${a} + ${b} + ${c} = ${ans}।`,
      };
    }
    case 10: {
      // Missing addend
      const total = 48500 + t * 650;
      const part1 = 19235 + t * 215;
      const ans = total - part1;
      const opts = makeNumericOptions(ans, [100, -100, 20], correctIdx);
      return {
        topic: 'Subtraction',
        enQ: `The sum of two numbers is ${total}. If one of them is ${part1}, find the other number.`,
        mrQ: `दोन संख्यांची बेरीज ${total} आहे. त्यांपैकी एक संख्या ${part1} असल्यास दुसरी संख्या कोणती?`,
        hiQ: `दो संख्याओं का योगफल ${total} है। यदि उनमें से एक संख्या ${part1} है, तो दूसरी संख्या ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Other number = ${total} - ${part1} = ${ans}.`,
        mrExp: `दुसरी संख्या = ${total} - ${part1} = ${ans}.`,
        hiExp: `दूसरी संख्या = ${total} - ${part1} = ${ans}।`,
      };
    }
    case 11: {
      // Subtraction word problem (tree plantation target)
      const target = 15000 + t * 500;
      const planted = 8425 + t * 185;
      const ans = target - planted;
      const opts = makeNumericOptions(ans, [150, -50, 250], correctIdx);
      return {
        topic: 'Subtraction',
        enQ: `${city} Municipal Council set a target to plant ${target} saplings. After planting ${planted} saplings, how many more saplings remain to be planted?`,
        mrQ: `${city} नगरपरिषदेने ${target} रोपे लावण्याचे उद्दिष्ट ठेवले. आतापर्यंत ${planted} रोपे लावून झाली, तर अजून किती रोपे लावणे बाकी आहे?`,
        hiQ: `${city} नगर परिषद ने ${target} पौधे लगाने का लक्ष्य रखा। ${planted} पौधे लगने के बाद कितने और पौधे लगाने बाकी हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Remaining saplings = ${target} - ${planted} = ${ans}.`,
        mrExp: `बाकी रोपे = ${target} - ${planted} = ${ans}.`,
        hiExp: `शेष पौधे = ${target} - ${planted} = ${ans}।`,
      };
    }
    case 12: {
      // Addition + Subtraction combined
      const start = 24000 + t * 400;
      const deposit = 6500 + t * 150;
      const spend = 11250 + t * 120;
      const ans = start + deposit - spend;
      const opts = makeNumericOptions(ans, [200, -150, 500], correctIdx, '₹');
      return {
        topic: 'Word Problems',
        enQ: `A school fund had ₹${start}. After receiving ₹${deposit} in donations and spending ₹${spend} on science kits, how much money remains?`,
        mrQ: `एका शाळेच्या निधीत ₹${start} होते. देणगीतून ₹${deposit} मिळाले आणि विज्ञान साहित्यावर ₹${spend} खर्च झाले, तर निधीत किती रक्कम शिल्लक राहिली?`,
        hiQ: `एक विद्यालय कोष में ₹${start} थे। ₹${deposit} दान मिलने और विज्ञान सामग्री पर ₹${spend} खर्च होने के बाद कितनी राशि शेष बची?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Remaining = (${start} + ${deposit}) - ${spend} = ${start + deposit} - ${spend} = ₹${ans}.`,
        mrExp: `शिल्लक रक्कम = (${start} + ${deposit}) - ${spend} = ₹${ans}.`,
        hiExp: `शेष राशि = (${start} + ${deposit}) - ${spend} = ₹${ans}।`,
      };
    }
    case 13: {
      // Multiplication word problem (notebook cost)
      const rate = 28 + t * 2;
      const qty = 24 + (t % 7);
      const ans = rate * qty;
      const opts = makeNumericOptions(ans, [rate, -rate, 20], correctIdx, '₹');
      return {
        topic: 'Multiplication',
        enQ: `${name} bought ${qty} geometry boxes for a school distribution at ₹${rate} each. What is the total cost?`,
        mrQ: `${name} ने शाळेसाठी प्रत्येकी ₹${rate} दराने ${qty} कंपास पेट्या खरेदी केल्या, तर एकूण खर्च किती झाला?`,
        hiQ: `${name} ने विद्यालय के लिए ₹${rate} प्रति बॉक्स की दर से ${qty} ज्यामिति बॉक्स खरीदे। कुल मूल्य क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total cost = ${qty} × ₹${rate} = ₹${ans}.`,
        mrExp: `एकूण खर्च = ${qty} × ₹${rate} = ₹${ans}.`,
        hiExp: `कुल मूल्य = ${qty} × ₹${rate} = ₹${ans}।`,
      };
    }
    case 14: {
      // Multiplication property (finding multiplier)
      const k = 15 + t;
      const prod = k * 36;
      const ans = 36;
      const opts = makeNumericOptions(ans, [2, -3, 6], correctIdx);
      return {
        topic: 'Multiplication',
        enQ: `If the product of ${k} and an unknown number is ${prod}, what is that unknown number?`,
        mrQ: `${k} आणि एका संख्येचा गुणाकार ${prod} आहे, तर ती संख्या कोणती?`,
        hiQ: `यदि ${k} और एक अज्ञात संख्या का गुणनफल ${prod} है, तो वह संख्या क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Unknown number = ${prod} ÷ ${k} = ${ans}.`,
        mrExp: `ती संख्या = ${prod} ÷ ${k} = ${ans}.`,
        hiExp: `अज्ञात संख्या = ${prod} ÷ ${k} = ${ans}।`,
      };
    }
    case 15: {
      // Division with quotient & remainder -> find dividend
      const div = 16 + (t % 9);
      const quot = 34 + t * 2;
      const rem = (t % (div - 3)) + 2;
      const ans = div * quot + rem;
      const opts = makeNumericOptions(ans, [rem, -rem, div], correctIdx);
      return {
        topic: 'Division',
        enQ: `In a division problem, the divisor is ${div}, the quotient is ${quot}, and the remainder is ${rem}. Find the dividend.`,
        mrQ: `एका भागाकाराच्या उदाहरणात भाजक ${div}, भागाकार ${quot} आणि बाकी ${rem} आहे, तर भाज्य संख्या कोणती?`,
        hiQ: `भाग के एक प्रश्न में भाजक ${div}, भागफल ${quot} और शेषफल ${rem} है। भाज्य ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Dividend = (Divisor × Quotient) + Remainder = (${div} × ${quot}) + ${rem} = ${ans}.`,
        mrExp: `भाज्य = (भाजक × भागाकार) + बाकी = (${div} × ${quot}) + ${rem} = ${ans}.`,
        hiExp: `भाज्य = (भाजक × भागफल) + शेषफल = (${div} × ${quot}) + ${rem} = ${ans}।`,
      };
    }
    case 16: {
      // Division remainder left over (packing boxes)
      const perBox = 12 + (t % 6);
      const fullBoxes = 22 + t;
      const leftover = (t % (perBox - 1)) + 1;
      const total = perBox * fullBoxes + leftover;
      const opts = makeNumericOptions(leftover, [2, -1, 4], correctIdx, '', '', true);
      return {
        topic: 'Division',
        enQ: `A sweet maker packs ${total} laddoos equally into boxes holding ${perBox} laddoos each. How many laddoos will be left unpacked?`,
        mrQ: `एका मिठाईवाल्याने ${total} लाडू प्रत्येकी ${perBox} लाडूंच्या डब्यांत भरले, तर डबे भरल्यानंतर किती लाडू शिल्लक राहतील?`,
        hiQ: `एक हलवाई ने ${total} लड्डुओं को प्रति डिब्बे ${perBox} के हिसाब से पैक किया। पूरे डिब्बे भरने के बाद कितने लड्डू शेष बचेंगे?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${total} ÷ ${perBox} gives quotient ${fullBoxes} and remainder ${leftover} laddoos.`,
        mrExp: `${total} ÷ ${perBox} केल्यास ${fullBoxes} डबे भरतात आणि ${leftover} लाडू बाकी उरतात.`,
        hiExp: `${total} को ${perBox} से भाग देने पर ${fullBoxes} डिब्बे और शेष ${leftover} लड्डू बचते हैं।`,
      };
    }
    case 17: {
      // Divisibility by 5 and 10 (candidate set included explicitly in stem)
      const base = 430 + t * 30;
      const opt5 = base + 5;
      const opt2 = base + 2;
      const opt3 = base + 3;
      const opts = placeStringOptions(`${base}`, [`${opt5}`, `${opt2}`, `${opt3}`], correctIdx);
      const listText = opts.join(', ');
      return {
        topic: 'Divisibility Rules',
        enQ: `Among the numbers (${listText}), which number is completely divisible by BOTH 5 and 10?`,
        mrQ: `(${listText}) या संख्यांपैकी कोणत्या संख्येस 5 आणि 10 या दोन्ही संख्यांनी नि:शेष भाग जातो?`,
        hiQ: `दी गई संख्याओं (${listText}) में से कौन-सी संख्या 5 और 10 दोनों से पूर्णतः विभाजित होती है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Numbers ending with 0 in the units place (${base}) are divisible by both 5 and 10.`,
        mrExp: `एकक स्थानी 0 असल्यास (${base}) त्या संख्येस 5 व 10 दोन्हीने पूर्ण भाग जातो.`,
        hiExp: `इकाई के स्थान पर 0 होने से ${base} संख्या 5 और 10 दोनों से विभाज्य है।`,
      };
    }
    case 18: {
      // Divisibility by 3 (missing digit rule - MSCE Std 4 classic)
      const lead = 41 + t;
      const dSum = String(lead).split('').reduce((s, ch) => s + Number(ch), 0);
      const rem = dSum % 3;
      const smallestValid = rem === 0 ? 3 : 3 - rem;
      const numStr = `${lead}*`;
      const wrongs: [string, string, string] = [
        String((smallestValid + 1) % 10),
        String((smallestValid + 2) % 10),
        String((smallestValid + 4) % 10),
      ];
      const opts = placeStringOptions(`${smallestValid}`, wrongs, correctIdx);
      return {
        topic: 'Divisibility Rules',
        enQ: `If the number "${numStr}" is completely divisible by 3, what is the smallest non-zero digit that can replace * ?`,
        mrQ: `"${numStr}" या संख्येस 3 ने नि:शेष भाग जाण्यासाठी * च्या जागी कोणता सर्वात लहान शून्येतर अंक असावा?`,
        hiQ: `यदि संख्या "${numStr}" 3 से पूर्णतः विभाज्य है, तो * के स्थान पर सबसे छोटा अशून्य अंक क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum of known digits = ${dSum}. Adding ${smallestValid} makes total ${dSum + smallestValid}, divisible by 3.`,
        mrExp: `दिलेल्या अंकांची बेरीज = ${dSum}. त्यात ${smallestValid} मिळवल्यास बेरीज ${dSum + smallestValid} ला 3 ने भाग जातो.`,
        hiExp: `अंकों का योग = ${dSum}। ${smallestValid} जोड़ने पर ${dSum + smallestValid} मिलता है जो 3 से विभाज्य है।`,
      };
    }
    case 19: {
      // Factors count of a number
      const nums = [12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 54, 56, 60, 64, 66, 70, 72, 75, 80, 84, 90];
      const n = nums[t - 1];
      let cnt = 0;
      for (let i = 1; i <= n; i++) if (n % i === 0) cnt++;
      const opts = makeNumericOptions(cnt, [2, -2, 3], correctIdx);
      return {
        topic: 'Factors and Multiples',
        enQ: `How many total divisors (factors) does the number ${n} have (including 1 and ${n})?`,
        mrQ: `${n} या संख्येचे एकूण किती विभाजक (अवयव) आहेत (1 आणि ${n} धरून)?`,
        hiQ: `संख्या ${n} के कुल कितने गुणनखंड (भाजक) हैं (1 और ${n} सहित)?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Counting all positive integers dividing ${n} evenly gives exactly ${cnt} factors.`,
        mrExp: `${n} ला नि:शेष भाग जाणाऱ्या एकूण ${cnt} संख्या आहेत.`,
        hiExp: `${n} को पूर्ण विभाजित करने वाले कुल ${cnt} गुणनखंड हैं।`,
      };
    }
    case 20: {
      // Sum of first k multiples of a number (bijection across 9 x 3 = 27)
      const m = 3 + ((t - 1) % 9); // 3..11
      const k = 4 + Math.floor((t - 1) / 9); // 4..6
      let sum = 0;
      const list: number[] = [];
      for (let i = 1; i <= k; i++) {
        list.push(m * i);
        sum += m * i;
      }
      const opts = makeNumericOptions(sum, [m, -m, m * 2], correctIdx);
      return {
        topic: 'Factors and Multiples',
        enQ: `Find the sum of the first ${k} multiples of ${m}.`,
        mrQ: `${m} च्या पहिल्या ${k} पटीतील संख्यांची (गुणकांची) बेरीज किती?`,
        hiQ: `${m} के प्रथम ${k} गुणजों का योगफल ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `First ${k} multiples: ${list.join(' + ')} = ${sum}.`,
        mrExp: `पहिले ${k} गुणक: ${list.join(' + ')} = ${sum}.`,
        hiExp: `प्रथम ${k} गुणज: ${list.join(' + ')} = ${sum}।`,
      };
    }
    case 21: {
      // Even Prime & Prime Numbers in a range
      const starts = [1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 12, 18, 22, 28, 32, 38, 42, 48, 52];
      const lo = starts[t - 1];
      const hi = lo + 20;
      const isPrime = (x: number) => {
        if (x < 2) return false;
        for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
        return true;
      };
      const primes: number[] = [];
      for (let x = lo; x <= hi; x++) if (isPrime(x)) primes.push(x);
      const ans = primes.length;
      const opts = makeNumericOptions(ans, [1, -1, 2], correctIdx);
      return {
        topic: 'Number System',
        enQ: `How many prime numbers lie between ${lo} and ${hi} (inclusive)?`,
        mrQ: `${lo} ते ${hi} दरम्यान (दोन्ही धरून) एकूण किती मूळ संख्या आहेत?`,
        hiQ: `${lo} से ${hi} तक (दोनों सहित) कुल कितनी अभाज्य संख्याएँ हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `The prime numbers from ${lo} to ${hi} are ${primes.join(', ')}, totaling ${ans}.`,
        mrExp: `${lo} ते ${hi} मधील मूळ संख्या (${primes.join(', ')}) एकूण ${ans} आहेत.`,
        hiExp: `${lo} से ${hi} तक अभाज्य संख्याएँ (${primes.join(', ')}) कुल ${ans} हैं।`,
      };
    }
    case 22: {
      // Simplified Like Fraction Addition (GCD reduced!)
      const den = ((t * 2) % 9) + 7; // 7..15
      const a = (t % 4) + 2;
      const b = ((t + 1) % 4) + 3;
      const [sn, sd] = [(a + b) / gcd(a + b, den), den / gcd(a + b, den)];
      const corr = sd === 1 ? `${sn}` : `${sn}/${sd}`;
      const w1 = formatFraction(a + b + 1, den);
      const w2 = formatFraction(Math.max(1, a + b - 1), den);
      const w3 = `${a + b}/${den + 3}`;
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Fractions',
        enQ: `Add the like fractions and write the answer in simplest form: (${a}/${den}) + (${b}/${den}) = ?`,
        mrQ: `समच्छेद अपूर्णांकांची बेरीज संक्षिप्त रूपात लिहा: (${a}/${den}) + (${b}/${den}) = किती?`,
        hiQ: `समान हर वाली भिन्नों को जोड़कर सरलतम रूप में लिखिए: (${a}/${den}) + (${b}/${den}) = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(${a} + ${b})/${den} = ${a + b}/${den}${corr !== `${a + b}/${den}` ? ` = ${corr}` : ''}.`,
        mrExp: `(${a} + ${b})/${den} = ${a + b}/${den} म्हणजेच संक्षिप्त रूप ${corr}.`,
        hiExp: `(${a} + ${b})/${den} = ${a + b}/${den}, जिसका सरलतम रूप ${corr} है।`,
      };
    }
    case 23: {
      // Simplified Fraction Subtraction (bijection across 9 x 3 = 27)
      const den = 8 + ((t - 1) % 9); // 8..16
      const a = 5 + Math.floor((t - 1) / 9); // 5, 6, 7
      const b = 1 + (t % 4); // 1..4 (< 5)
      const corr = formatFraction(a - b, den);
      const w1 = formatFraction(a - b + 1, den);
      const w2 = formatFraction(a + b, den);
      const w3 = `${Math.max(1, a - b - 1)}/${den + 2}`;
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Fractions',
        enQ: `Subtract the fractions and reduce to lowest terms: (${a}/${den}) - (${b}/${den}) = ?`,
        mrQ: `अपूर्णांकांची वजाबाकी संक्षिप्त रूपात लिहा: (${a}/${den}) - (${b}/${den}) = किती?`,
        hiQ: `भिन्नों को घटाकर न्यूनतम रूप में लिखिए: (${a}/${den}) - (${b}/${den}) = ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(${a} - ${b})/${den} = ${a - b}/${den} = ${corr}.`,
        mrExp: `(${a} - ${b})/${den} = ${a - b}/${den}, संक्षिप्त रूप ${corr}.`,
        hiExp: `(${a} - ${b})/${den} = ${a - b}/${den} = ${corr}।`,
      };
    }
    case 24: {
      // Equivalent Fraction missing numerator (5 x 5 bijection)
      const baseNum = 2 + ((t - 1) % 5); // 2..6
      const baseDen = baseNum + 2 + (t % 3);
      const mult = 3 + Math.floor((t - 1) / 5); // 3..7
      const targetDen = baseDen * mult;
      const ans = baseNum * mult;
      const opts = makeNumericOptions(ans, [mult, -2, baseDen], correctIdx);
      return {
        topic: 'Fractions',
        enQ: `Find the missing numerator in the equivalent fraction: ${baseNum}/${baseDen} = □/${targetDen}`,
        mrQ: `सममूल्य अपूर्णांकातील चौकोनाच्या जागी कोणती संख्या येईल? ${baseNum}/${baseDen} = □/${targetDen}`,
        hiQ: `तुल्य भिन्न में रिक्त स्थान (□) भरिए: ${baseNum}/${baseDen} = □/${targetDen}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Denominator multiplied by ${targetDen} ÷ ${baseDen} = ${mult}. So numerator = ${baseNum} × ${mult} = ${ans}.`,
        mrExp: `छेदास ${mult} ने गुणले आहे, म्हणून अंश = ${baseNum} × ${mult} = ${ans}.`,
        hiExp: `हर को ${mult} से गुणा किया गया है, अतः अंश = ${baseNum} × ${mult} = ${ans}।`,
      };
    }
    case 25: {
      // Fraction of a collection (Class 4 MSCE staple: 3/4 of 48 etc.)
      const den = (t % 4) + 3; // 3..6
      const num = 2;
      const total = den * (10 + t);
      const ans = (total / den) * num;
      const opts = makeNumericOptions(ans, [den, -den, total / den], correctIdx);
      return {
        topic: 'Fractions',
        enQ: `${name} read ${num}/${den} of a ${total}-page storybook. How many pages has ${name} read?`,
        mrQ: `${name} ने ${total} पानांच्या गोष्टीच्या पुस्तकातील ${num}/${den} भाग वाचून पूर्ण केला, तर एकूण किती पाने वाचली?`,
        hiQ: `${name} ने ${total} पृष्ठों की कहानी की पुस्तक का ${num}/${den} भाग पढ़ लिया। उसने कुल कितने पृष्ठ पढ़े?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(${num}/${den}) × ${total} = (${total} ÷ ${den}) × ${num} = ${total / den} × ${num} = ${ans} pages.`,
        mrExp: `${total} चे ${num}/${den} म्हणजे (${total} ÷ ${den}) × ${num} = ${ans} पाने.`,
        hiExp: `${total} का ${num}/${den} = (${total} ÷ ${den}) × ${num} = ${ans} पृष्ठ।`,
      };
    }
    case 26: {
      // Compare fractions explicitly listed in stem (7 x 4 = 28 bijection)
      const n = 2 + ((t - 1) % 7); // 2..8
      const dSmall = n + 1 + Math.floor((t - 1) / 7); // smallest denominator
      const cStr = `${n}/${dSmall}`;
      const w1 = `${n}/${dSmall + 2}`;
      const w2 = `${n}/${dSmall + 4}`;
      const w3 = `${n}/${dSmall + 6}`;
      const opts = placeStringOptions(cStr, [w1, w2, w3], correctIdx);
      const fracList = opts.join(', ');
      return {
        topic: 'Fractions',
        enQ: `Among the fractions (${fracList}), which one has the GREATEST value?`,
        mrQ: `(${fracList}) या अपूर्णांकांपैकी सर्वात मोठा अपूर्णांक कोणता?`,
        hiQ: `(${fracList}) में से सबसे बड़ी भिन्न कौन-सी है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `When numerators are equal (${n}), the fraction with the smallest denominator (${cStr}) is the greatest.`,
        mrExp: `अंश समान असताना ज्याचा छेद सर्वात लहान (${cStr}), तो अपूर्णांक सर्वात मोठा असतो.`,
        hiExp: `अंश समान होने पर सबसे छोटे हर वाली भिन्न (${cStr}) सबसे बड़ी होती है।`,
      };
    }
    case 27: {
      // Perimeter of a Square
      const side = 11 + t * 2;
      const ans = 4 * side;
      const opts = makeNumericOptions(ans, [side, -4, side * 2], correctIdx, '', ' cm');
      const mrOpts = makeNumericOptions(ans, [side, -4, side * 2], correctIdx, '', ' सेमी');
      return {
        topic: 'Geometry',
        enQ: `A square carrom board has each side measuring ${side} cm. Find its perimeter.`,
        mrQ: `एका चौरसाकृती कॅरम बोर्डची प्रत्येक बाजू ${side} सेमी आहे, तर त्याची परिमिती किती सेमी?`,
        hiQ: `एक वर्गाकार कैरम बोर्ड की प्रत्येक भुजा ${side} सेमी है। उसका परिमाप ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Perimeter of square = 4 × side = 4 × ${side} = ${ans} cm.`,
        mrExp: `चौरसाची परिमिती = 4 × बाजू = 4 × ${side} = ${ans} सेमी.`,
        hiExp: `वर्ग का परिमाप = 4 × भुजा = 4 × ${side} = ${ans} सेमी।`,
      };
    }
    case 28: {
      // Perimeter of a Rectangle + 3 rounds fencing
      const len = 18 + t;
      const br = 10 + (t % 9);
      const oneRound = 2 * (len + br);
      const rounds = 2 + (t % 2); // 2 or 3 rounds
      const ans = oneRound * rounds;
      const opts = makeNumericOptions(ans, [oneRound, -20, 24], correctIdx, '', ' m');
      const mrOpts = makeNumericOptions(ans, [oneRound, -20, 24], correctIdx, '', ' मीटर');
      return {
        topic: 'Geometry',
        enQ: `A rectangular playground is ${len} m long and ${br} m wide. What total distance does ${name} run while taking ${rounds} complete rounds along its boundary?`,
        mrQ: `एका आयताकृती मैदानाची लांबी ${len} मीटर व रुंदी ${br} मीटर आहे. कडेने ${rounds} फेऱ्या पूर्ण केल्यास ${name} एकूण किती मीटर धावेल?`,
        hiQ: `एक आयताकार मैदान ${len} मीटर लंबा और ${br} मीटर चौड़ा है। उसकी सीमा के ${rounds} पूरे चक्कर लगाने में ${name} कुल कितनी दूरी तय करेगा?`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Perimeter = 2×(${len} + ${br}) = ${oneRound} m. For ${rounds} rounds = ${oneRound} × ${rounds} = ${ans} m.`,
        mrExp: `परिमिती = 2×(${len} + ${br}) = ${oneRound} मी. ${rounds} फेऱ्या = ${ans} मीटर.`,
        hiExp: `परिमाप = 2×(${len} + ${br}) = ${oneRound} मी। ${rounds} चक्कर = ${ans} मीटर।`,
      };
    }
    case 29: {
      // Find side of equilateral triangle from perimeter
      const side = 12 + t * 2;
      const perim = 3 * side;
      const opts = makeNumericOptions(side, [4, -3, 6], correctIdx, '', ' cm');
      const mrOpts = makeNumericOptions(side, [4, -3, 6], correctIdx, '', ' सेमी');
      return {
        topic: 'Geometry',
        enQ: `All three sides of a triangular traffic sign board are equal, and its perimeter is ${perim} cm. Find the length of one side.`,
        mrQ: `एका समभुज त्रिकोणाकृती पाटीची परिमिती ${perim} सेमी आहे, तर तिच्या एका बाजूची लांबी किती सेमी?`,
        hiQ: `एक समबाहु त्रिभुजाकार संकेत बोर्ड की सभी भुजाएँ बराबर हैं और इसका परिमाप ${perim} सेमी है। एक भुजा की लंबाई ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Side of equilateral triangle = Perimeter ÷ 3 = ${perim} ÷ 3 = ${side} cm.`,
        mrExp: `बाजू = परिमिती ÷ 3 = ${perim} ÷ 3 = ${side} सेमी.`,
        hiExp: `भुजा = परिमाप ÷ 3 = ${perim} ÷ 3 = ${side} सेमी।`,
      };
    }
    case 30: {
      // Circle: Diameter from Radius (or Radius from Diameter)
      const rad = 6 + t;
      const ans = rad * 2;
      const opts = makeNumericOptions(ans, [rad, -2, 4], correctIdx, '', ' cm');
      const mrOpts = makeNumericOptions(ans, [rad, -2, 4], correctIdx, '', ' सेमी');
      return {
        topic: 'Geometry',
        enQ: `If the radius of a circular bicycle wheel rim is ${rad} cm, what is its diameter?`,
        mrQ: `एका वर्तुळाकृती चाकाची त्रिज्या ${rad} सेमी असल्यास, त्याचा व्यास किती सेमी असेल?`,
        hiQ: `यदि एक वृत्ताकार पहिए की त्रिज्या ${rad} सेमी है, तो उसका व्यास कितने सेमी होगा?`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Diameter = 2 × Radius = 2 × ${rad} = ${ans} cm.`,
        mrExp: `व्यास = 2 × त्रिज्या = 2 × ${rad} = ${ans} सेमी.`,
        hiExp: `व्यास = 2 × त्रिज्या = 2 × ${rad} = ${ans} सेमी।`,
      };
    }
    case 31: {
      // Angle classification (Right / Acute / Obtuse)
      const degs = [35, 42, 48, 55, 62, 68, 75, 82, 95, 105, 112, 118, 125, 132, 138, 145, 152, 160, 28, 38, 52, 72, 108, 128, 148];
      const deg = degs[t - 1];
      const isAcute = deg < 90;
      const ansEn = isAcute ? 'Acute angle' : 'Obtuse angle';
      const ansMr = isAcute ? 'लघुकोन' : 'विशालकोन';
      const ansHi = isAcute ? 'न्यून कोण' : 'अधिक कोण';
      const wrongEn = isAcute ? 'Obtuse angle' : 'Acute angle';
      const wrongMr = isAcute ? 'विशालकोन' : 'लघुकोन';
      const wrongHi = isAcute ? 'अधिक कोण' : 'न्यून कोण';
      return {
        topic: 'Geometry',
        enQ: `An angle measuring ${deg}° is classified as which type of angle?`,
        mrQ: `${deg}° मापाच्या कोनाचा प्रकार कोणता आहे?`,
        hiQ: `${deg}° माप वाले कोण को किस प्रकार का कोण कहा जाता है?`,
        enOpts: placeStringOptions(ansEn, [wrongEn, 'Right angle', 'Straight angle'], correctIdx),
        mrOpts: placeStringOptions(ansMr, [wrongMr, 'काटकोन', 'सरळकोन'], correctIdx),
        hiOpts: placeStringOptions(ansHi, [wrongHi, 'समकोण', 'ऋजु कोण'], correctIdx),
        enExp: `${deg}° is ${isAcute ? 'less than 90° (Acute)' : 'between 90° and 180° (Obtuse)'}.`,
        mrExp: `${deg}° हे माप ${isAcute ? '90° पेक्षा कमी असल्याने लघुकोन' : '90° पेक्षा जास्त व 180° पेक्षा कमी असल्याने विशालकोन'} आहे.`,
        hiExp: `${deg}° का माप ${isAcute ? '90° से कम होने से न्यून कोण' : '90° से अधिक होने से अधिक कोण'} है।`,
      };
    }
    case 32: {
      // 3D Shapes: Faces + Edges + Vertices total for n cubes / cuboids / pyramids
      const shapes = [
        { en: 'Cube', mr: 'घन', hi: 'घन', faces: 6, edges: 12, verts: 8 },
        { en: 'Square Pyramid', mr: 'चौरसाकृती पिरॅमिड', hi: 'वर्गाकार पिरामिड', faces: 5, edges: 8, verts: 5 },
        { en: 'Triangular Prism', mr: 'त्रिकोणी चिती', hi: 'त्रिभुजाकार प्रिज्म', faces: 5, edges: 9, verts: 6 },
      ];
      const sh = shapes[t % 3];
      const count = Math.floor((t - 1) / 3) + 2; // 2..10 copies
      const ans = count * (sh.edges + sh.verts);
      const opts = makeNumericOptions(ans, [sh.edges, -sh.verts, count * sh.faces], correctIdx);
      return {
        topic: 'Geometry',
        enQ: `How many total edges and vertices combined do ${count} identical ${sh.en}s have?`,
        mrQ: `${count} एकसारख्या '${sh.mr}' आकृत्यांच्या सर्व कडा आणि शिरोबिंदूंची एकत्रित बेरीज किती होईल?`,
        hiQ: `${count} समान '${sh.hi}' आकृतियों के कुल किनारों (Edges) और शीर्षों (Vertices) का योग कितना होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `One ${sh.en} has ${sh.edges} edges + ${sh.verts} vertices = ${sh.edges + sh.verts}. For ${count} shapes: ${count} × ${sh.edges + sh.verts} = ${ans}.`,
        mrExp: `एका ${sh.mr} ला ${sh.edges} कडा व ${sh.verts} शिरोबिंदू = ${sh.edges + sh.verts}. म्हणून ${count} आकृत्यांसाठी = ${ans}.`,
        hiExp: `एक ${sh.hi} में ${sh.edges} किनारे + ${sh.verts} शीर्ष = ${sh.edges + sh.verts}। ${count} के लिए कुल = ${ans}।`,
      };
    }
    case 33: {
      // Measurement: km + m -> m
      const km = 3 + (t % 12);
      const m = 125 + t * 25;
      const ans = km * 1000 + m;
      const opts = makeNumericOptions(ans, [100, -100, 900], correctIdx, '', ' m');
      const mrOpts = makeNumericOptions(ans, [100, -100, 900], correctIdx, '', ' मीटर');
      return {
        topic: 'Measurement',
        enQ: `A school bus travels ${km} km ${m} m from ${city} bus stand to a science park. Express this distance in metres.`,
        mrQ: `${city} बसस्थानकापासून विज्ञान केंद्राचे अंतर ${km} किमी ${m} मीटर आहे. हे अंतर एकूण किती मीटर?`,
        hiQ: `${city} बस स्टैंड से विज्ञान पार्क की दूरी ${km} किमी ${m} मीटर है। इसे कुल मीटर में व्यक्त कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `1 km = 1000 m. Total = (${km} × 1000) + ${m} = ${ans} m.`,
        mrExp: `1 किमी = 1000 मीटर. एकूण अंतर = ${km * 1000} + ${m} = ${ans} मीटर.`,
        hiExp: `1 किमी = 1000 मीटर। कुल दूरी = ${km * 1000} + ${m} = ${ans} मीटर।`,
      };
    }
    case 34: {
      // Measurement: kg + g -> g (unique kg across t=1..25)
      const kg = 2 + t; // 3..27
      const g = 250 + (t % 3) * 250; // 250, 500, 750
      const ans = kg * 1000 + g;
      const opts = makeNumericOptions(ans, [250, -250, 1000], correctIdx, '', ' g');
      const mrOpts = makeNumericOptions(ans, [250, -250, 1000], correctIdx, '', ' ग्रॅम');
      const hiOpts = makeNumericOptions(ans, [250, -250, 1000], correctIdx, '', ' ग्राम');
      return {
        topic: 'Measurement',
        enQ: `A sack of rice weighs ${kg} kg ${g} g. What is its total weight in grams?`,
        mrQ: `तांदळाच्या एका पोत्याचे वजन ${kg} किग्रॅ ${g} ग्रॅम आहे, तर त्याचे एकूण ग्रॅममधील वजन किती?`,
        hiQ: `चावल की एक बोरी का वजन ${kg} किग्रा ${g} ग्राम है। इसका कुल वजन ग्राम में कितना होगा?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `1 kg = 1000 g. Weight = ${kg}×1000 + ${g} = ${ans} g.`,
        mrExp: `1 किग्रॅ = 1000 ग्रॅम. एकूण वजन = ${ans} ग्रॅम.`,
        hiExp: `1 किग्रा = 1000 ग्राम। कुल वजन = ${ans} ग्राम।`,
      };
    }
    case 35: {
      // Capacity: Litres to Quarter-Litre (250 ml) packets
      const L = 4 + t; // 5..29 litres
      const ans = L * 4;
      const opts = makeNumericOptions(ans, [4, -4, 8], correctIdx);
      return {
        topic: 'Measurement',
        enQ: `How many quarter-litre (250 ml) milk pouches can be filled completely from a can holding ${L} litres of milk?`,
        mrQ: `${L} लिटर दुधाच्या कॅनमधून पाव लिटर (250 मिली) मापाच्या एकूण किती पिशव्या भरता येतील?`,
        hiQ: `${L} लीटर दूध वाले कैन से चौथाई लीटर (250 मिली) के कुल कितने पैकेट भरे जा सकते हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `1 litre contains 4 quarter-litres (4 × 250 ml = 1000 ml). So ${L} × 4 = ${ans} pouches.`,
        mrExp: `1 लिटरमध्ये 4 पाव लिटर असतात. म्हणून ${L} × 4 = ${ans} पिशव्या.`,
        hiExp: `1 लीटर में 4 चौथाई-लीटर होते हैं। अतः ${L} × 4 = ${ans} पैकेट।`,
      };
    }
    case 36: {
      // Dozen & Gross paper/pencil counting (unique gross x dozen combinations across t=1..25)
      const grossCount = 1 + ((t - 1) % 3); // 1, 2, 3
      const doz = 2 + Math.floor((t - 1) / 3); // 2..10
      const grossQty = grossCount * 144;
      const dist = doz * 12;
      const rem = grossQty - dist;
      const opts = makeNumericOptions(rem, [12, -12, 24], correctIdx);
      return {
        topic: 'Practical Mathematics',
        enQ: `From ${grossCount} gross (${grossQty}) pencils in a carton, ${doz} dozen pencils were distributed to students. How many pencils remain?`,
        mrQ: `एका खोक्यातील ${grossCount} ग्रोस (${grossQty}) पेन्सिलींपैकी ${doz} डझन पेन्सिली विद्यार्थ्यांना वाटल्या, तर खोक्यात किती पेन्सिली शिल्लक राहिल्या?`,
        hiQ: `एक डिब्बे में रखी ${grossCount} ग्रॉस (${grossQty}) पेंसिलों में से ${doz} दर्जन पेंसिलें छात्रों को बाँट दी गईं। डिब्बे में कितनी पेंसिलें शेष बचीं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${grossCount} gross = ${grossQty}. ${doz} dozen = ${doz} × 12 = ${dist}. Remaining = ${grossQty} - ${dist} = ${rem}.`,
        mrExp: `${grossCount} ग्रोस = ${grossQty} आणि ${doz} डझन = ${dist}. शिल्लक = ${grossQty} - ${dist} = ${rem}.`,
        hiExp: `${grossCount} ग्रॉस = ${grossQty} और ${doz} दर्जन = ${dist}। शेष = ${grossQty} - ${dist} = ${rem}।`,
      };
    }
    case 37: {
      // Money: Currency Notes Sum
      const n500 = 2 + (t % 5);
      const n200 = 3 + (t % 4);
      const n50 = 4 + (t % 6);
      const ans = n500 * 500 + n200 * 200 + n50 * 50;
      const opts = makeNumericOptions(ans, [150, -100, 250], correctIdx, '₹');
      return {
        topic: 'Money',
        enQ: `${name} has ${n500} notes of ₹500, ${n200} notes of ₹200, and ${n50} notes of ₹50. What is the total amount?`,
        mrQ: `${name} कडे ₹500 च्या ${n500} नोटा, ₹200 च्या ${n200} नोटा आणि ₹50 च्या ${n50} नोटा आहेत, तर एकूण रक्कम किती?`,
        hiQ: `${name} के पास ₹500 के ${n500} नोट, ₹200 के ${n200} नोट और ₹50 के ${n50} नोट हैं। कुल राशि कितनी है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `(${n500}×500) + (${n200}×200) + (${n50}×50) = ${n500 * 500} + ${n200 * 200} + ${n50 * 50} = ₹${ans}.`,
        mrExp: `एकूण रक्कम = ${n500 * 500} + ${n200 * 200} + ${n50 * 50} = ₹${ans}.`,
        hiExp: `कुल राशि = ${n500 * 500} + ${n200 * 200} + ${n50 * 50} = ₹${ans}।`,
      };
    }
    case 38: {
      // Money: ₹ & Paise Bill Change
      const itemA = 125 + t * 5;
      const itemB = 85 + (t % 7) * 5;
      const paid = 500;
      const ans = paid - (itemA + itemB);
      const opts = makeNumericOptions(ans, [15, -10, 25], correctIdx, '₹');
      return {
        topic: 'Money',
        enQ: `A school bag costs ₹${itemA} and a water bottle costs ₹${itemB}. If ${name} gives a ₹500 note to the shopkeeper, how much change will be returned?`,
        mrQ: `एका दप्तराची किंमत ₹${itemA} व पाण्याच्या बाटलीची किंमत ₹${itemB} आहे. दुकानदाराला ₹500 ची नोट दिल्यास किती रुपये परत मिळतील?`,
        hiQ: `एक स्कूल बैग की कीमत ₹${itemA} और पानी की बोतल की कीमत ₹${itemB} है। ₹500 का नोट देने पर दुकानदार कितने रुपये वापस करेगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total bill = ${itemA} + ${itemB} = ₹${itemA + itemB}. Change = 500 - ${itemA + itemB} = ₹${ans}.`,
        mrExp: `एकूण बिल = ₹${itemA + itemB}. परत रक्कम = 500 - ${itemA + itemB} = ₹${ans}.`,
        hiExp: `कुल बिल = ₹${itemA + itemB}। वापस राशि = 500 - ${itemA + itemB} = ₹${ans}।`,
      };
    }
    case 39: {
      // Money: Rupees to Paise conversion
      const rs = 14 + t;
      const ps = 25 + (t % 3) * 25; // 25, 50, 75
      const ans = rs * 100 + ps;
      const opts = makeNumericOptions(ans, [50, -50, 100], correctIdx, '', ' paise');
      const mrOpts = makeNumericOptions(ans, [50, -50, 100], correctIdx, '', ' पैसे');
      return {
        topic: 'Money',
        enQ: `Convert ${rs} rupees and ${ps} paise completely into paise.`,
        mrQ: `${rs} रुपये ${ps} पैसे म्हणजे एकूण किती पैसे?`,
        hiQ: `${rs} रुपये ${ps} पैसे को कुल पैसों में बदलिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `1 rupee = 100 paise. (${rs} × 100) + ${ps} = ${ans} paise.`,
        mrExp: `1 रुपया = 100 पैसे. एकूण = ${rs * 100} + ${ps} = ${ans} पैसे.`,
        hiExp: `1 रुपया = 100 पैसे। कुल = ${rs * 100} + ${ps} = ${ans} पैसे।`,
      };
    }
    case 40: {
      // Time: Hours & Minutes -> Total minutes
      const hrs = 2 + (t % 6);
      const mins = 15 + ((t * 3) % 40);
      const ans = hrs * 60 + mins;
      const opts = makeNumericOptions(ans, [20, -15, 30], correctIdx, '', ' mins');
      const mrOpts = makeNumericOptions(ans, [20, -15, 30], correctIdx, '', ' मिनिटे');
      const hiOpts = makeNumericOptions(ans, [20, -15, 30], correctIdx, '', ' मिनट');
      return {
        topic: 'Time',
        enQ: `A train from Pune to ${city} took ${hrs} hours and ${mins} minutes. Express the total journey time in minutes.`,
        mrQ: `पुणे ते ${city} प्रवासासाठी रेल्वेला ${hrs} तास ${mins} मिनिटे लागली, तर एकूण किती मिनिटे प्रवास झाला?`,
        hiQ: `पुणे से ${city} की यात्रा में ट्रेन को ${hrs} घंटे ${mins} मिनट लगे। कुल यात्रा समय मिनटों में बताइए।`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `(${hrs} × 60) + ${mins} = ${hrs * 60} + ${mins} = ${ans} minutes.`,
        mrExp: `(${hrs} × 60) + ${mins} = ${ans} मिनिटे.`,
        hiExp: `(${hrs} × 60) + ${mins} = ${ans} मिनट।`,
      };
    }
    case 41: {
      // Time: Elapsed duration AM -> PM (5 x 5 bijection)
      const startH = 8 + (t % 3); // 8, 9, 10 AM
      const startM = (t % 2) * 30; // 00 or 30
      const durH = 2 + Math.floor((t - 1) / 5); // 2..6 hours
      const durM = 10 + ((t - 1) % 5) * 10; // 10, 20, 30, 40, 50 mins
      const endTotalM = startH * 60 + startM + durH * 60 + durM;
      const endH24 = Math.floor(endTotalM / 60);
      const endM = endTotalM % 60;
      const endH12 = endH24 > 12 ? endH24 - 12 : endH24;
      const fmt = (h: number, m: number) => `${h}:${String(m).padStart(2, '0')} PM`;
      const corr = fmt(endH12, endM);
      const sFmt = `${startH}:${String(startM).padStart(2, '0')} AM`;
      const opts = placeStringOptions(
        corr,
        [fmt(endH12 + 1, endM), fmt(endH12, (endM + 15) % 60), fmt(Math.max(1, endH12 - 1), endM)],
        correctIdx
      );
      return {
        topic: 'Time',
        enQ: `A science exhibition started at ${sFmt} and ran for ${durH} hours ${durM} minutes. At what time did it conclude?`,
        mrQ: `एक विज्ञान प्रदर्शन सकाळी ${sFmt} वाजता सुरू होऊन ${durH} तास ${durM} मिनिटे चालले, तर ते किती वाजता संपले?`,
        hiQ: `एक विज्ञान प्रदर्शनी सुबह ${sFmt} बजे शुरू होकर ${durH} घंटे ${durM} मिनट चली। वह किस समय समाप्त हुई?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Adding ${durH} hr ${durM} min to ${sFmt} gives ${corr}.`,
        mrExp: `${sFmt} मध्ये ${durH} तास ${durM} मिनिटे मिळवल्यास ${corr} ही वेळ येते.`,
        hiExp: `${sFmt} में ${durH} घंटे ${durM} मिनट जोड़ने पर ${corr} बजते हैं।`,
      };
    }
    case 42: {
      // Calendar: Total days in two consecutive months + year variation
      const pairs = [
        ['January & February', 'जानेवारी व फेब्रुवारी', 'जनवरी और फरवरी', 31 + 29, true],
        ['July & August', 'जुलै व ऑगस्ट', 'जुलाई और अगस्त', 62, false],
        ['April & May', 'एप्रिल व मे', 'अप्रैल और मई', 61, false],
        ['October & November', 'ऑक्टोबर व नोव्हेंबर', 'अक्तूबर और नवंबर', 61, false],
        ['February & March', 'फेब्रुवारी व मार्च', 'फ़रवरी और मार्च', 29 + 31, true],
      ] as const;
      const p = pairs[t % pairs.length];
      const yr = 2000 + Math.floor((t - 1) / pairs.length) * 4 + (p[4] ? 4 : 1); // leap year 2004, 2008... when Feb involved!
      const ans = p[3];
      const opts = makeNumericOptions(ans, [1, -1, 2], correctIdx, '', ' days');
      const mrOpts = makeNumericOptions(ans, [1, -1, 2], correctIdx, '', ' दिवस');
      const hiOpts = makeNumericOptions(ans, [1, -1, 2], correctIdx, '', ' दिन');
      return {
        topic: 'Calendar',
        enQ: `In the year ${yr}, how many total days are there in the months of ${p[0]} combined?`,
        mrQ: `सन ${yr} मधील ${p[1]} या दोन महिन्यांचे मिळून एकूण किती दिवस होतात?`,
        hiQ: `वर्ष ${yr} में ${p[2]} महीनों के मिलाकर कुल कितने दिन होते हैं?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `${yr} is ${yr % 4 === 0 ? 'a leap year (Feb = 29 days)' : 'an ordinary year'}. Total days in ${p[0]} = ${ans}.`,
        mrExp: `सन ${yr} मध्ये ${p[1]} चे एकूण दिवस = ${ans}.`,
        hiExp: `वर्ष ${yr} में ${p[2]} के कुल दिन = ${ans}।`,
      };
    }
    case 43: {
      // Pictograph (1 symbol = k trees/books)
      const scale = 10 + (t % 5) * 5; // 10, 15, 20, 25, 30
      const syms = 4 + (t % 6);
      const ans = scale * syms;
      const opts = makeNumericOptions(ans, [scale, -scale, scale + 5], correctIdx);
      return {
        topic: 'Pictograph & Data',
        enQ: `In a school pictograph, 1 star picture represents ${scale} books read. If Class 4 has ${syms} stars next to its row, how many books did Class 4 read?`,
        mrQ: `एका चित्रालेखात 1 चांदणी म्हणजे ${scale} पुस्तके मानली आहेत. इयत्ता चौथीसमोर ${syms} चांदण्या असल्यास एकूण किती पुस्तके वाचली गेली?`,
        hiQ: `एक चित्रालेख में 1 तारे का चित्र ${scale} पुस्तकों को दर्शाता है। यदि कक्षा 4 के सामने ${syms} तारे हैं, तो कुल कितनी पुस्तकें पढ़ी गईं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total books = ${syms} symbols × ${scale} = ${ans}.`,
        mrExp: `एकूण पुस्तके = ${syms} × ${scale} = ${ans}.`,
        hiExp: `कुल पुस्तकें = ${syms} × ${scale} = ${ans}।`,
      };
    }
    case 44: {
      // Unitary Method (simple Class 4)
      const costOne = 14 + t * 2;
      const buy = 4;
      const ask = 7 + (t % 4);
      const givenCost = costOne * buy;
      const ans = costOne * ask;
      const opts = makeNumericOptions(ans, [costOne, -costOne, 20], correctIdx, '₹');
      return {
        topic: 'Practical Mathematics',
        enQ: `If ${buy} drawing books cost ₹${givenCost}, what will be the cost of ${ask} such drawing books?`,
        mrQ: `${buy} चित्रकला वह्यांची किंमत ₹${givenCost} असल्यास, अशाच ${ask} वह्यांची किंमत किती?`,
        hiQ: `यदि ${buy} ड्राइंग बुक्स की कीमत ₹${givenCost} है, तो ऐसी ${ask} बुक्स की कीमत क्या होगी?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Cost of 1 book = ${givenCost} ÷ ${buy} = ₹${costOne}. For ${ask} books = ${ask} × ${costOne} = ₹${ans}.`,
        mrExp: `एका वहीची किंमत = ₹${costOne}. म्हणून ${ask} वह्यांची किंमत = ₹${ans}.`,
        hiExp: `1 बुक का मूल्य = ₹${costOne}। अतः ${ask} बुक्स = ₹${ans}।`,
      };
    }
    case 45: {
      // Number Pattern (increasing equal step)
      const start = 15 + t * 7;
      const step = 9 + (t % 6);
      const s1 = start;
      const s2 = start + step;
      const s3 = start + step * 2;
      const s4 = start + step * 3;
      const ans = start + step * 4;
      const opts = makeNumericOptions(ans, [step, -step, 4], correctIdx);
      return {
        topic: 'Number Patterns',
        enQ: `What comes next in the number pattern: ${s1}, ${s2}, ${s3}, ${s4}, ___ ?`,
        mrQ: `संख्यांचा आकृतिबंध पूर्ण करा: ${s1}, ${s2}, ${s3}, ${s4}, ___ ?`,
        hiQ: `संख्या पैटर्न में अगली संख्या क्या होगी: ${s1}, ${s2}, ${s3}, ${s4}, ___ ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Each number increases by +${step}. Next number = ${s4} + ${step} = ${ans}.`,
        mrExp: `प्रत्येक संख्या ${step} ने वाढत आहे. पुढील संख्या = ${s4} + ${step} = ${ans}.`,
        hiExp: `प्रत्येक संख्या +${step} से बढ़ रही है। अगली संख्या = ${s4} + ${step} = ${ans}।`,
      };
    }
    case 46: {
      // Quarter / Half / Three-quarter combination (9 x 3 = 27 unique pairs)
      const w = 1 + Math.floor((t - 1) / 3); // 1..9
      const fIdx = (t - 1) % 3;
      const fracs = [
        { sym: '¼', extraG: 250, mrDesc: `सवा ${w}`, hiDesc: `सवा ${w}` },
        { sym: '½', extraG: 500, mrDesc: `साडे${w}`, hiDesc: `साढ़े ${w}` },
        { sym: '¾', extraG: 750, mrDesc: `पावणे${w + 1}`, hiDesc: `पौने ${w + 1}` },
      ][fIdx];
      const ans = w * 1000 + fracs.extraG;
      const opts = makeNumericOptions(ans, [250, -250, 500], correctIdx, '', ' g');
      const mrOpts = makeNumericOptions(ans, [250, -250, 500], correctIdx, '', ' ग्रॅम');
      const hiOpts = makeNumericOptions(ans, [250, -250, 500], correctIdx, '', ' ग्राम');
      return {
        topic: 'Measurement',
        enQ: `How many grams are equal to ${w}${fracs.sym} kilograms?`,
        mrQ: `${w}${fracs.sym} (${fracs.mrDesc}) किलोग्रॅम म्हणजे एकूण किती ग्रॅम?`,
        hiQ: `${w}${fracs.sym} (${fracs.hiDesc}) किलोग्राम का मान कितने ग्राम होता है?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `${w} kg = ${w * 1000} g and ${fracs.sym} kg = ${fracs.extraG} g. Total = ${ans} g.`,
        mrExp: `${w} किग्रॅ = ${w * 1000} ग्रॅम आणि ${fracs.sym} किग्रॅ = ${fracs.extraG} ग्रॅम. एकूण = ${ans} ग्रॅम.`,
        hiExp: `${w} किग्रा = ${w * 1000} ग्राम और ${fracs.sym} किग्रा = ${fracs.extraG} ग्राम। कुल = ${ans} ग्राम।`,
      };
    }
    case 47: {
      // Mathematical Reasoning: Balance Scale equality (Class 4 algebraic thinking without variables)
      const valEach = 18 + t * 3;
      const extra = 14 + (t % 5);
      const total = valEach * 2 + extra;
      const opts = makeNumericOptions(valEach, [3, -3, 6], correctIdx);
      return {
        topic: 'Mathematical Reasoning',
        enQ: `If two identical weights and a ${extra} kg block together balance ${total} kg on a weighing scale, what is the weight of each identical weight (in kg)?`,
        mrQ: `एका तराजूवर दोन समान वजने आणि ${extra} किग्रॅचा दगड मिळून एकूण ${total} किग्रॅ वजन भरते, तर प्रत्येक समान वजनाचे माप किती किग्रॅ?`,
        hiQ: `एक तराजू पर दो समान बाट और ${extra} किग्रा का एक पत्थर मिलकर ${total} किग्रा वजन के बराबर हैं। प्रत्येक समान बाट का वजन कितना है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Two weights = ${total} - ${extra} = ${valEach * 2} kg. Each weight = ${valEach * 2} ÷ 2 = ${valEach} kg.`,
        mrExp: `दोन समान वजने = ${total} - ${extra} = ${valEach * 2} किग्रॅ. एक वजन = ${valEach} किग्रॅ.`,
        hiExp: `दोनों बाट = ${total} - ${extra} = ${valEach * 2} किग्रा। एक बाट = ${valEach} किग्रा।`,
      };
    }
    case 48: {
      // Largest 4-digit vs Smallest 3-digit difference / variation per t
      const k = 100 + t * 5;
      const big = 9999 - t * 10;
      const ans = big - k;
      const opts = makeNumericOptions(ans, [10, -10, 100], correctIdx);
      return {
        topic: 'Subtraction',
        enQ: `How much greater is ${big} than ${k}?`,
        mrQ: `${big} ही संख्या ${k} पेक्षा कितीने मोठी आहे?`,
        hiQ: `संख्या ${big}, संख्या ${k} से कितनी अधिक है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Difference = ${big} - ${k} = ${ans}.`,
        mrExp: `फरक = ${big} - ${k} = ${ans}.`,
        hiExp: `अंतर = ${big} - ${k} = ${ans}।`,
      };
    }
    default: {
      // case 49: Word Problem - Equal sharing of money/sweets with remainder/two steps
      const classes = 4 + (t % 5);
      const studentsPerClass = 22 + t;
      const sweetsEach = 3;
      const ans = classes * studentsPerClass * sweetsEach;
      const opts = makeNumericOptions(ans, [studentsPerClass, -classes, 12], correctIdx);
      return {
        topic: 'Word Problems',
        enQ: `In a school in ${city}, there are ${classes} divisions of Class 4 with ${studentsPerClass} students in each division. If every student gets ${sweetsEach} sweets on Independence Day, how many sweets are needed in total?`,
        mrQ: `${city} येथील शाळेत इयत्ता चौथीच्या ${classes} तुकड्या असून प्रत्येक तुकडीत ${studentsPerClass} विद्यार्थी आहेत. स्वातंत्र्यदिनी प्रत्येक विद्यार्थ्याला ${sweetsEach} लाडू वाटण्यासाठी एकूण किती लाडू लागतील?`,
        hiQ: `${city} के एक विद्यालय में कक्षा 4 के ${classes} खंड हैं और प्रत्येक खंड में ${studentsPerClass} विद्यार्थी हैं। स्वतंत्रता दिवस पर प्रत्येक विद्यार्थी को ${sweetsEach} मिठाई देने के लिए कुल कितनी मिठाइयाँ चाहिए?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total students = ${classes} × ${studentsPerClass} = ${classes * studentsPerClass}. Total sweets = ${classes * studentsPerClass} × ${sweetsEach} = ${ans}.`,
        mrExp: `एकूण विद्यार्थी = ${classes * studentsPerClass}. एकूण लाडू = ${classes * studentsPerClass} × ${sweetsEach} = ${ans}.`,
        hiExp: `कुल विद्यार्थी = ${classes * studentsPerClass}। कुल मिठाइयाँ = ${classes * studentsPerClass} × ${sweetsEach} = ${ans}।`,
      };
    }
  }
}
