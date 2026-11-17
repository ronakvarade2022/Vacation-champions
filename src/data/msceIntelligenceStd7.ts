import {
  makeNumericOptions,
  placeStringOptions,
  RawGeneratedQuestion,
} from './msceQuestionHelpers';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const mod26Idx = (i: number) => ((i % 26) + 26) % 26;
const letterAt = (pos1to26: number) => ALPHABET[mod26Idx(pos1to26 - 1)];

/**
 * Generates ONE Std 7th (UPS) Intelligence Test question for slot idx (0..49) of Mock Test t (1..25).
 * Covers MSCE Class 7 UPS higher-order reasoning: multi-tier/cube/prime series, Pythagorean direction sense,
 * clock angle formula, calendar odd-days, painted cube cutting, dice opposite faces, 3-set/neither Venn,
 * coded blood relations, BODMAS operator/interchange, matrix puzzles, binary folding, and inequalities.
 */
export function buildStd7IntelligenceQuestion(
  t: number,
  idx: number,
  correctIdx: number
): RawGeneratedQuestion {
  const names = ['Aditya', 'Sneha', 'Rohan', 'Priya', 'Omkar', 'Neha', 'Siddharth', 'Gauri', 'Yash', 'Kalyani'];
  const name = names[(t * 3 + idx) % names.length];

  switch (idx) {
    case 0: {
      // Second-order difference series: d = step, +step+k, +step+2k...
      const start = 4 + ((t - 1) % 5) * 2;
      const d1 = 3 + Math.floor((t - 1) / 5); // 3..7 (5x5 bijection)
      const inc = 4;
      const s0 = start;
      const s1 = s0 + d1;
      const s2 = s1 + (d1 + inc);
      const s3 = s2 + (d1 + 2 * inc);
      const s4 = s3 + (d1 + 3 * inc);
      const ans = s4 + (d1 + 4 * inc);
      const opts = makeNumericOptions(ans, [4, -4, 8], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Find the missing term in the multi-tier number series: ${s0}, ${s1}, ${s2}, ${s3}, ${s4}, ?`,
        mrQ: `संख्यामालिकेतील पुढील पद ओळखा: ${s0}, ${s1}, ${s2}, ${s3}, ${s4}, ?`,
        hiQ: `संख्या श्रृंखला में अगला पद ज्ञात कीजिए: ${s0}, ${s1}, ${s2}, ${s3}, ${s4}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `First differences increase by +${inc} each step (+${d1}, +${d1 + inc}, +${d1 + 2 * inc}, +${d1 + 3 * inc}, +${d1 + 4 * inc}). Next = ${s4} + ${d1 + 4 * inc} = ${ans}.`,
        mrExp: `पहिला फरक +${inc} ने वाढत आहे. पुढील फरक +${d1 + 4 * inc} असून उत्तर ${ans} येते.`,
        hiExp: `प्रथम अंतर प्रत्येक चरण में +${inc} बढ़ता है। अतः ${s4} + ${d1 + 4 * inc} = ${ans}।`,
      };
    }
    case 1: {
      // Cube ± offset series (n³ + shift)
      const n0 = 2 + Math.floor((t - 1) / 5); // 2..6
      const shift = ((t - 1) % 5) + 1; // 1..5 -> 5x5 bijection
      const s = [0, 1, 2, 3, 4].map((k) => Math.pow(n0 + k, 3) + shift);
      const opts = makeNumericOptions(s[4], [10, -8, 12], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Determine the next term in the series: ${s.slice(0, 4).join(', ')}, ?`,
        mrQ: `संख्यामालिकेत प्रश्नचिन्हाच्या जागी कोणती संख्या येईल: ${s.slice(0, 4).join(', ')}, ?`,
        hiQ: `श्रृंखला में प्रश्नवाचक चिह्न (?) का मान ज्ञात कीजिए: ${s.slice(0, 4).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: n³ + ${shift}. The 5th term is ${n0 + 4}³ + ${shift} = ${Math.pow(n0 + 4, 3)} + ${shift} = ${s[4]}.`,
        mrExp: `नियम: n³ + ${shift}. म्हणून ${n0 + 4}³ + ${shift} = ${s[4]}.`,
        hiExp: `नियम: n³ + ${shift}। अतः ${n0 + 4}³ + ${shift} = ${s[4]}।`,
      };
    }
    case 2: {
      // Primes Square + 1 or Alternate Prime Sequence
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
      const startIdx = (t - 1) % 13; // 0..12
      const mode = Math.floor((t - 1) / 13); // 0: +1, 1: +2 (p^2+mode or prime*k) -> Wait 13x2 = 26 >= 25!
      const mult = mode === 0 ? 1 : 2;
      const add = (t % 3); // 0, 1, 2
      const s = [0, 1, 2, 3, 4].map((k) => primes[startIdx + k] * mult + add);
      const opts = makeNumericOptions(s[4], [2, -2, 4], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Observe the prime-based sequence and find the missing term: ${s.slice(0, 4).join(', ')}, ?`,
        mrQ: `मूळ संख्यांवर आधारित मालिकेतील पुढील पद ओळखा: ${s.slice(0, 4).join(', ')}, ?`,
        hiQ: `अभाज्य संख्या आधारित श्रृंखला में अगला पद ज्ञात कीजिए: ${s.slice(0, 4).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Consecutive primes (${primes.slice(startIdx, startIdx + 5).join(', ')}) multiplied by ${mult} plus ${add} → ${s[4]}.`,
        mrExp: `क्रमवार मूळ संख्यांना ${mult} ने गुणून ${add} मिळवले आहेत → ${s[4]}.`,
        hiExp: `क्रमागत अभाज्य संख्याओं को ${mult} से गुणा करके ${add} जोड़ा गया है → ${s[4]}।`,
      };
    }
    case 3: {
      // Geometric ratio × m + k
      const start = 1 + ((t - 1) % 5); // 1..5
      const m = 3;
      const k = 1 + Math.floor((t - 1) / 5); // 1..5 -> 5x5 bijection
      const s0 = start;
      const s1 = s0 * m + k;
      const s2 = s1 * m + k;
      const s3 = s2 * m + k;
      const ans = s3 * m + k;
      const opts = makeNumericOptions(ans, [k, -k, 6], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Complete the number series: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        mrQ: `संख्यामालिका पूर्ण करा: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        hiQ: `संख्या श्रृंखला को पूरा कीजिए: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Pattern: (Previous × ${m}) + ${k}. (${s3} × ${m}) + ${k} = ${ans}.`,
        mrExp: `नियम: (मागील पद × ${m}) + ${k} = ${ans}.`,
        hiExp: `नियम: (पिछला पद × ${m}) + ${k} = ${ans}।`,
      };
    }
    case 4: {
      // Fibonacci-type cumulative sum series
      const a = 2 + ((t - 1) % 5); // 2..6
      const b = 3 + Math.floor((t - 1) / 5); // 3..7 -> 5x5 bijection
      const s2 = a + b;
      const s3 = b + s2;
      const s4 = s2 + s3;
      const ans = s3 + s4;
      const opts = makeNumericOptions(ans, [b, -a, 5], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Find the next number in this additive sequence: ${a}, ${b}, ${s2}, ${s3}, ${s4}, ?`,
        mrQ: `पुढील बेरीज मालिकेतील प्रश्नचिन्हाच्या जागी काय येईल: ${a}, ${b}, ${s2}, ${s3}, ${s4}, ?`,
        hiQ: `इस योगात्मक श्रृंखला में अगली संख्या ज्ञात कीजिए: ${a}, ${b}, ${s2}, ${s3}, ${s4}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Each term (from 3rd onwards) is the sum of the preceding two terms: ${s3} + ${s4} = ${ans}.`,
        mrExp: `प्रत्येक पुढील संख्या मागील दोन संख्यांची बेरीज आहे: ${s3} + ${s4} = ${ans}.`,
        hiExp: `प्रत्येक पद पिछले दो पदों का योग है: ${s3} + ${s4} = ${ans}।`,
      };
    }
    case 5: {
      // Dual-Letter Alternating Rule (+stepA, -stepB mod 26 safe!)
      const p1 = 2 + ((t - 1) % 7); // 2..8
      const p2 = 24 - Math.floor((t - 1) / 7); // 24..21 (X..U) -> 7x4 bijection
      const terms = [0, 1, 2, 3].map((k) => `${letterAt(p1 + k * 2)}${letterAt(p2 - k * 2)}`);
      const ans = `${letterAt(p1 + 6)}${letterAt(p2 - 6)}`;
      const w1 = `${letterAt(p1 + 7)}${letterAt(p2 - 6)}`;
      const w2 = `${letterAt(p1 + 6)}${letterAt(p2 - 5)}`;
      const w3 = `${letterAt(p1 + 5)}${letterAt(p2 - 7)}`;
      const opts = placeStringOptions(ans, [w1, w2, w3], correctIdx);
      return {
        topic: 'Alphabet Series',
        enQ: `Identify the next pair in the sequence: ${terms.slice(0, 3).join(', ')}, ?`,
        mrQ: `अक्षरजोड्यांच्या मालिकेतील पुढील पद ओळखा: ${terms.slice(0, 3).join(', ')}, ?`,
        hiQ: `अक्षर-युग्म श्रृंखला में अगला पद ज्ञात कीजिए: ${terms.slice(0, 3).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `First letter shifts +2, second letter shifts -2 → ${ans}.`,
        mrExp: `पहिले अक्षर +2 ने पुढे व दुसरे अक्षर -2 ने मागे सरकते → ${ans}.`,
        hiExp: `पहला अक्षर +2 आगे और दूसरा -2 पीछे जाता है → ${ans}।`,
      };
    }
    case 6: {
      // Opposite Letter Pairs Coding (A↔Z, B↔Y, i.e., sum of positions = 27)
      const words = ['MANGO', 'TIGER', 'WATER', 'PLANT', 'LIGHT', 'SOUND', 'FORCE', 'EARTH', 'METAL', 'RIVER', 'SOLAR', 'BRAIN', 'HEART', 'CHORD', 'PRISM', 'ORBIT', 'CRUST', 'STEAM', 'CLOUD', 'MAGMA', 'GRAPH', 'SCALE', 'ANGLE', 'SOLID', 'RADIO'];
      const target = words[t - 1];
      const opp = (w: string) =>
        w.split('').map((ch) => ALPHABET[25 - ALPHABET.indexOf(ch)]).join('');
      const ex = 'CODE';
      const exCode = opp(ex);
      const ans = opp(target);
      const w1 = ans.slice(0, 4) + letterAt(ALPHABET.indexOf(ans[4]) + 2);
      const w2 = letterAt(ALPHABET.indexOf(ans[0]) + 2) + ans.slice(1);
      const w3 = ans.split('').reverse().join('');
      const candWrongs = [w1, w2, w3, target].filter((x) => x !== ans);
      const opts = placeStringOptions(ans, [candWrongs[0], candWrongs[1], candWrongs[2]], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `Using opposite-letter mirror pairs (A↔Z, B↔Y, ..., M↔N), "${ex}" is coded as "${exCode}". How will "${target}" be coded?`,
        mrQ: `विरुद्ध अक्षरजोड्या (A↔Z, B↔Y, ..., M↔N) वापरून "${ex}" चा संकेत "${exCode}" होतो, तर "${target}" चा संकेत काय?`,
        hiQ: `विपरीत अक्षर युग्म (A↔Z, B↔Y, ..., M↔N) से "${ex}" का कूट "${exCode}" है, तो "${target}" का कूट क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Replacing each letter of "${target}" with its opposite letter (position 27 - p) gives "${ans}".`,
        mrExp: `प्रत्येक अक्षराच्या विरुद्ध अक्षराने बदल केल्यास "${ans}" मिळते.`,
        hiExp: `प्रत्येक अक्षर को उसके विपरीत अक्षर से बदलने पर "${ans}" प्राप्त होता है।`,
      };
    }
    case 7: {
      // Number Analogy (n : n³ - n)
      const a = 2 + Math.floor((t - 1) / 5); // 2..6
      const c = a + 1 + ((t - 1) % 5); // unique a,c pair -> 5x5 bijection
      const b = a * a * a - a;
      const ans = c * c * c - c;
      const opts = makeNumericOptions(ans, [c, -c, 6], correctIdx);
      return {
        topic: 'Number Analogy',
        enQ: `Complete the number analogy: ${a} : ${b} :: ${c} : ?`,
        mrQ: `संख्या सहसंबंध पूर्ण करा: ${a} : ${b} :: ${c} : ?`,
        hiQ: `संख्या सादृश्य पूरा कीजिए: ${a} : ${b} :: ${c} : ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: n : n³ - n. ${a}³ - ${a} = ${b}; therefore ${c}³ - ${c} = ${c * c * c} - ${c} = ${ans}.`,
        mrExp: `नियम: n³ - n. म्हणून ${c}³ - ${c} = ${ans}.`,
        hiExp: `नियम: n³ - n। अतः ${c}³ - ${c} = ${ans}।`,
      };
    }
    case 8: {
      // Number Analogy (Product & Sum of digits or n : n(n+2))
      const a = 4 + Math.floor((t - 1) / 4); // 4..10
      const step = 2 + ((t - 1) % 4); // 2..5 (unique across 1..25 since 7x4=28)
      const c = a + step;
      const b = a * (a + 3);
      const ans = c * (c + 3);
      const opts = makeNumericOptions(ans, [6, -4, 9], correctIdx);
      return {
        topic: 'Number Analogy',
        enQ: `Find the missing number in the analogy: ${a} : ${b} :: ${c} : ?`,
        mrQ: `संख्यांमधील सहसंबंध ओळखा: ${a} : ${b} :: ${c} : ?`,
        hiQ: `समान संबंध के आधार पर (?) ज्ञात कीजिए: ${a} : ${b} :: ${c} : ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: n : n × (n + 3). Since ${a} × ${a + 3} = ${b}, ${c} × ${c + 3} = ${ans}.`,
        mrExp: `नियम: n × (n + 3). म्हणून ${c} × ${c + 3} = ${ans}.`,
        hiExp: `नियम: n × (n + 3)। अतः ${c} × ${c + 3} = ${ans}।`,
      };
    }
    case 9: {
      // Word Analogy (Class 7 Science/Geography/Instruments - 25 distinct pairs)
      const pairs: Array<{
        en: [string, string, string, string, [string, string, string]];
        mr: [string, string, string, string, [string, string, string]];
        hi: [string, string, string, string, [string, string, string]];
      }> = [
        {
          en: ['Ammeter', 'Current', 'Voltmeter', 'Potential Difference', ['Resistance', 'Power', 'Frequency']],
          mr: ['अमीटर', 'विद्युतधारा', 'व्होल्टमीटर', 'विभवांतर', ['रोध', 'शक्ती', 'वारंवारता']],
          hi: ['अमीटर', 'विद्युत धारा', 'वोल्टमीटर', 'विभवांतर', ['प्रतिरोध', 'शक्ति', 'आवृत्ति']],
        },
        {
          en: ['Botany', 'Plants', 'Zoology', 'Animals', ['Fungi', 'Rocks', 'Stars']],
          mr: ['वनस्पतिशास्त्र', 'वनस्पती', 'प्राणिशास्त्र', 'प्राणी', ['कवक', 'खडक', 'तारे']],
          hi: ['वनस्पति विज्ञान', 'पौधे', 'प्राणि विज्ञान', 'जंतु', ['कवक', 'चट्टानें', 'तारे']],
        },
        {
          en: ['Heart', 'Cardiology', 'Kidney', 'Nephrology', ['Neurology', 'Dermatology', 'Osteology']],
          mr: ['हृदय', 'कार्डिओलॉजी', 'मूत्रपिंड', 'नेफ्रॉलॉजी', ['न्यूरॉलॉजी', 'डर्मॅटॉलॉजी', 'ऑस्टिओलॉजी']],
          hi: ['हृदय', 'कार्डियोलॉजी', 'वृक्क', 'नेफ्रोलॉजी', ['न्यूरोलॉजी', 'डर्मेटोलॉजी', 'ऑस्टियोलॉजी']],
        },
        {
          en: ['India', 'New Delhi', 'Australia', 'Canberra', ['Sydney', 'Melbourne', 'Perth']],
          mr: ['भारत', 'नवी दिल्ली', 'ऑस्ट्रेलिया', 'कॅनबेरा', ['सिडनी', 'मेलबर्न', 'पर्थ']],
          hi: ['भारत', 'नई दिल्ली', 'ऑस्ट्रेलिया', 'कैनबरा', ['सिडनी', 'मेलबर्न', 'पर्थ']],
        },
        {
          en: ['Barometer', 'Pressure', 'Anemometer', 'Wind Speed', ['Humidity', 'Rainfall', 'Depth']],
          mr: ['बॅरोमीटर', 'वायुदाब', 'अॅनिमोमीटर', 'वाऱ्याचा वेग', ['आर्द्रता', 'पाऊस', 'खोली']],
          hi: ['बैरोमीटर', 'वायुदाब', 'एनीमोमीटर', 'पवन वेग', ['आर्द्रता', 'वर्षा', 'गहराई']],
        },
        {
          en: ['Force', 'Newton', 'Energy', 'Joule', ['Watt', 'Pascal', 'Hertz']],
          mr: ['बल', 'न्यूटन', 'ऊर्जा', 'ज्यूल', ['वॅट', 'पास्कल', 'हर्ट्झ']],
          hi: ['बल', 'न्यूटन', 'ऊर्जा', 'जूल', ['वाट', 'पास्कल', 'हर्ट्ज़']],
        },
        {
          en: ['Iron', 'Haemoglobin', 'Magnesium', 'Chlorophyll', ['Insulin', 'Thyroxine', 'Keratin']],
          mr: ['लोह', 'हिमोग्लोबिन', 'मॅग्नेशियम', 'हरितद्रव्य', ['इन्सुलिन', 'थायरॉक्सिन', 'केराटिन']],
          hi: ['लोहा', 'हीमोग्लोबिन', 'मैग्नीशियम', 'क्लोरोफिल', ['इंसुलिन', 'थायरॉक्सिन', 'केराटिन']],
        },
        {
          en: ['Scurvy', 'Vitamin C', 'Rickets', 'Vitamin D', ['Vitamin A', 'Vitamin B', 'Vitamin K']],
          mr: ['स्कर्व्ही', 'जीवनसत्त्व क', 'मुडदूस', 'जीवनसत्त्व ड', ['जीवनसत्त्व अ', 'जीवनसत्त्व ब', 'जीवनसत्त्व के']],
          hi: ['स्कर्वी', 'विटामिन C', 'रिकेट्स', 'विटामिन D', ['विटामिन A', 'विटामिन B', 'विटामिन K']],
        },
        {
          en: ['Mercury', 'Liquid Metal', 'Diamond', 'Hardest Non-metal', ['Soft Liquid', 'Gas', 'Alloy']],
          mr: ['पारा', 'द्रवरूप धातू', 'हिरा', 'सर्वात कठीण अधातू', ['मऊ द्रव', 'वायू', 'संमिश्र']],
          hi: ['पारा', 'द्रव धातु', 'हीरा', 'सबसे कठोर अधातु', ['मुलायम द्रव', 'गैस', 'मिश्रधातु']],
        },
        {
          en: ['Mitochondria', 'Energy Powerhouse', 'Chloroplast', 'Photosynthesis', ['Respiration', 'Digestion', 'Excretion']],
          mr: ['तंतुकणिका', 'ऊर्जा केंद्र', 'हरितलवक', 'प्रकाशसंश्लेषण', ['श्वसन', 'पचन', 'उत्सर्जन']],
          hi: ['माइटोकॉन्ड्रिया', 'ऊर्जा गृह', 'हरितलवक', 'प्रकाश संश्लेषण', ['श्वसन', 'पाचन', 'उत्सर्जन']],
        },
        {
          en: ['Frequency', 'Hertz', 'Sound Level', 'Decibel', ['Joule', 'Ampere', 'Ohm']],
          mr: ['वारंवारता', 'हर्ट्झ', 'ध्वनी पातळी', 'डेसिबल', ['ज्यूल', 'अँपिअर', 'ओहम']],
          hi: ['आवृत्ति', 'हर्ट्ज़', 'ध्वनि स्तर', 'डेसिबल', ['जूल', 'एम्पीयर', 'ओम']],
        },
        {
          en: ['Copper + Tin', 'Bronze', 'Copper + Zinc', 'Brass', ['Steel', 'Solder', 'Nichrome']],
          mr: ['तांबे + कथील', 'कांस्य', 'तांबे + जस्त', 'पितळ', ['पोलाद', 'सोल्डर', 'नायक्रोम']],
          hi: ['ताँबा + टिन', 'काँसा', 'ताँबा + जस्ता', 'पीतल', ['इस्पात', 'सोल्डर', 'नाइक्रोम']],
        },
        {
          en: ['Konkan', 'Laterite Soil', 'Deccan Plateau', 'Black Regur Soil', ['Alluvial Soil', 'Desert Soil', 'Peat Soil']],
          mr: ['कोकण', 'जांभी मृदा', 'दख्खनचे पठार', 'काळी रेगूर मृदा', ['गाळाची मृदा', 'वाळवंटी मृदा', 'दलदलीची मृदा']],
          hi: ['कोंकण', 'लैटेराइट मिट्टी', 'दक्कन का पठार', 'काली रेगुर मिट्टी', ['जलोढ़ मिट्टी', 'मरुस्थलीय मिट्टी', 'पीट मिट्टी']],
        },
        {
          en: ['Seismograph', 'Earthquake', 'Hygrometer', 'Humidity', ['Temperature', 'Altitude', 'Voltage']],
          mr: ['सिस्मोग्राफ', 'भूकंप', 'हायग्रोमीटर', 'आर्द्रता', ['तापमान', 'उंची', 'विद्युतदाब']],
          hi: ['सिस्मोग्राफ', 'भूकंप', 'हाइग्रोमीटर', 'आर्द्रता', ['तापमान', 'ऊँचाई', 'वोल्टेज']],
        },
        {
          en: ['Xylem', 'Water Transport', 'Phloem', 'Food Transport', ['Oxygen Flow', 'Root Growth', 'Pollination']],
          mr: ['जलवाहिनी', 'पाणी वहन', 'रसवाहिनी', 'अन्न वहन', ['ऑक्सिजन प्रवाह', 'मुळांची वाढ', 'परागीभवन']],
          hi: ['जाइलम', 'जल संवहन', 'फ्लोएम', 'भोजन संवहन', ['ऑक्सीजन प्रवाह', 'जड़ वृद्धि', 'परागण']],
        },
        {
          en: ['Convex Mirror', 'Rear-view Vehicle', 'Concave Mirror', 'Dentist Headlight', ['Kaleidoscope', 'Periscope', 'Window Glass']],
          mr: ['बहिर्गोल आरसा', 'वाहन बाजूचा आरसा', 'अंतर्गोल आरसा', 'दंतवैद्य तपासणी', ['कॅलिडोस्कोप', 'पेरिस्कोप', 'खिडकीची काच']],
          hi: ['उत्तल दर्पण', 'वाहन पश्च-दृश्य दर्पण', 'अवतल दर्पण', 'दंत चिकित्सक दर्पण', ['कैलिडोस्कोप', 'पेरिस्कोप', 'खिड़की का काँच']],
        },
        {
          en: ['Sodium Chloride', 'Common Salt', 'Calcium Carbonate', 'Chalk / Limestone', ['Baking Soda', 'Vinegar', 'Gypsum']],
          mr: ['सोडियम क्लोराईड', 'मीठ', 'कॅल्शियम कार्बोनेट', 'खडू / चुनखडी', ['खाण्याचा सोडा', 'व्हिनेगर', 'जिप्सम']],
          hi: ['सोडियम क्लोराइड', 'साधारण नमक', 'कैल्शियम कार्बोनेट', 'चॉक / चूना पत्थर', ['बेकिंग सोडा', 'सिरका', 'जिप्सम']],
        },
        {
          en: ['Red Blood Cells', 'Oxygen Carry', 'White Blood Cells', 'Immunity Defence', ['Clotting', 'Digestion', 'Vision']],
          mr: ['तांबड्या पेशी', 'ऑक्सिजन वहन', 'पांढऱ्या पेशी', 'रोगप्रतिकारक शक्ती', ['रक्त गोठणे', 'पचन', 'दृष्टी']],
          hi: ['लाल रक्त कणिकाएँ', 'ऑक्सीजन परिवहन', 'श्वेत रक्त कणिकाएँ', 'रोग प्रतिरक्षा', ['रक्त का थक्का', 'पाचन', 'दृष्टि']],
        },
        {
          en: ['Jupiter', 'Largest Planet', 'Saturn', 'Prominent Rings', ['Red Surface', 'Closest to Sun', 'Dwarf Planet']],
          mr: ['गुरू', 'सर्वात मोठा ग्रह', 'शनी', 'ठळक कडी असलेला ग्रह', ['लाल पृष्ठभाग', 'सूर्याजवळचा ग्रह', 'बटू ग्रह']],
          hi: ['बृहस्पति', 'सबसे बड़ा ग्रह', 'शनि', 'प्रमुख वलय वाला ग्रह', ['लाल सतह', 'सूर्य के निकटतम', 'बौना ग्रह']],
        },
        {
          en: ['Sahyadri', 'Western Ghats', 'Nilgiri', 'Southern Junction', ['Eastern Coast', 'Northern Plains', 'Thar Basin']],
          mr: ['सह्याद्री', 'पश्चिम घाट', 'निलगिरी', 'दक्षिणेकडील पर्वतजंक्शन', ['पूर्व किनारा', 'उत्तरेची मैदाने', 'थार वाळवंट']],
          hi: ['सह्याद्रि', 'पश्चिमी घाट', 'नीलगिरि', 'दक्षिणी पर्वत संगम', ['पूर्वी तट', 'उत्तरी मैदान', 'थार मरुस्थल']],
        },
        {
          en: ['Work', 'Force × Displacement', 'Speed', 'Distance ÷ Time', ['Mass × Volume', 'Time × Force', 'Area × Height']],
          mr: ['कार्य', 'बल × विस्थापन', 'वेग', 'अंतर ÷ वेळ', ['वस्तुमान × आकारमान', 'वेळ × बल', 'क्षेत्रफळ × उंची']],
          hi: ['कार्य', 'बल × विस्थापन', 'चाल', 'दूरी ÷ समय', ['द्रव्यमान × आयतन', 'समय × बल', 'क्षेत्रफल × ऊँचाई']],
        },
        {
          en: ['Boiling Water', '100°C', 'Freezing Water', '0°C', ['37°C', '50°C', '-10°C']],
          mr: ['पाण्याचा उत्कलनांक', '100°C', 'पाण्याचा गोठणबिंदू', '0°C', ['37°C', '50°C', '-10°C']],
          hi: ['जल का क्वथनांक', '100°C', 'जल का हिमांक', '0°C', ['37°C', '50°C', '-10°C']],
        },
        {
          en: ['Carbon Dioxide', 'Limewater Milky', 'Oxygen', 'Supports Combustion', ['Extinguishes Fire', 'Turns Blue Litmus', 'Freezes Air']],
          mr: ['कार्बन डायऑक्साइड', 'चुन्याची निवळी दुधी', 'ऑक्सिजन', 'ज्वलनास मदत', ['आग विझवतो', 'निळा लिटमस लाल', 'हवा गोठवतो']],
          hi: ['कार्बन डाइऑक्साइड', 'चूने का पानी दूधिया', 'ऑक्सीजन', 'दहन में सहायक', ['आग बुझाता है', 'नीला लिटमस लाल', 'हवा जमाता है']],
        },
        {
          en: ['Thermos Flask', 'Vacuum Insulation', 'Solar Cooker', 'Black Heat Absorption', ['Wind Cooling', 'Chemical Reaction', 'Electric Coil']],
          mr: ['थर्मॉस फ्लास्क', 'निर्वात पोकळी रोधक', 'सौर चूल', 'काळा रंग उष्णता शोषण', ['वाऱ्याने थंडावा', 'रासायनिक अभिक्रिया', 'विद्युत कॉइल']],
          hi: ['थर्मस फ्लास्क', 'निर्वात ऊष्मा रोधन', 'सौर कुकर', 'काला रंग ऊष्मा अवशोषण', ['पवन शीतलन', 'रासायनिक अभिक्रिया', 'विद्युत कुंडली']],
        },
        {
          en: ['Democracy', 'People Vote', 'Parliament', 'Law Making', ['Weather Report', 'Tax Collection', 'Road Building']],
          mr: ['लोकशाही', 'जनतेचे मतदान', 'संसद', 'कायदे निर्मिती', ['हवामान अहवाल', 'कर संकलन', 'रस्ते बांधणी']],
          hi: ['लोकतंत्र', 'जनता का मतदान', 'संसद', 'कानून निर्माण', ['मौसम रिपोर्ट', 'कर संग्रह', 'सड़क निर्माण']],
        },
      ];
      const p = pairs[t - 1];
      return {
        topic: 'Word & Concept Analogy',
        enQ: `Identify the matching concept to complete the analogy: ${p.en[0]} : ${p.en[1]} :: ${p.en[2]} : ?`,
        mrQ: `वैज्ञानिक/सामान्य ज्ञानाचा सहसंबंध ओळखा: ${p.mr[0]} : ${p.mr[1]} :: ${p.mr[2]} : ?`,
        hiQ: `समान वैज्ञानिक/तार्किक संबंध चुनिए: ${p.hi[0]} : ${p.hi[1]} :: ${p.hi[2]} : ?`,
        enOpts: placeStringOptions(p.en[3], p.en[4], correctIdx),
        mrOpts: placeStringOptions(p.mr[3], p.mr[4], correctIdx),
        hiOpts: placeStringOptions(p.hi[3], p.hi[4], correctIdx),
        enExp: `Just as ${p.en[0]} pairs with "${p.en[1]}", ${p.en[2]} pairs with "${p.en[3]}".`,
        mrExp: `${p.mr[0]} चा संबंध "${p.mr[1]}" शी असल्याने ${p.mr[2]} चा संबंध "${p.mr[3]}" शी आहे.`,
        hiExp: `जिस प्रकार ${p.hi[0]} का संबंध "${p.hi[1]}" से है, उसी प्रकार ${p.hi[2]} का संबंध "${p.hi[3]}" से है।`,
      };
    }
    case 10: {
      // Odd-One-Out (Numbers: 3 Perfect Cubes, 1 Non-Cube; candidates in stem!)
      const n1 = 2 + ((t - 1) % 6); // 2..7
      const c1 = Math.pow(n1, 3);
      const c2 = Math.pow(n1 + 1, 3);
      const c3 = Math.pow(n1 + 2, 3);
      let bad = c2 + t * 2 + 1;
      while (Number.isInteger(Math.cbrt(bad))) bad++;
      const opts = placeStringOptions(`${bad}`, [`${c1}`, `${c2}`, `${c3}`], correctIdx);
      const list = opts.join(', ');
      return {
        topic: 'Classification (Odd One Out)',
        enQ: `Among the numbers (${list}), three share a cube property while one does not. Identify the odd number out.`,
        mrQ: `(${list}) या चार संख्यांपैकी गटात न बसणारी वेगळी संख्या ओळखा:`,
        hiQ: `(${list}) में से कौन-सी संख्या अन्य तीन से भिन्न है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${c1} (${n1}³), ${c2} (${n1 + 1}³), and ${c3} (${n1 + 2}³) are perfect cubes, while ${bad} is not.`,
        mrExp: `${c1}, ${c2} व ${c3} या पूर्ण घन संख्या आहेत; ${bad} पूर्ण घन नाही.`,
        hiExp: `${c1}, ${c2} और ${c3} पूर्ण घन हैं, जबकि ${bad} पूर्ण घन नहीं है।`,
      };
    }
    case 11: {
      // Odd-One-Out (Class 7 Science/Geography Concepts - 25 distinct sets)
      const sets: Array<{ en: [string, string, string, string]; mr: [string, string, string, string]; hi: [string, string, string, string]; exp: string }> = [
        { en: ['Iron', 'Copper', 'Aluminium', 'Sulphur'], mr: ['लोखंड', 'तांबे', 'अॅल्युमिनियम', 'गंधक'], hi: ['लोहा', 'ताँबा', 'एल्युमिनियम', 'सल्फर'], exp: 'Iron, Copper, Aluminium are metals; Sulphur is a non-metal.' },
        { en: ['Newton', 'Joule', 'Watt', 'Kilogram'], mr: ['न्यूटन', 'ज्यूल', 'वॅट', 'किलोग्रॅम'], hi: ['न्यूटन', 'जूल', 'वाट', 'किलोग्राम'], exp: 'First three are derived SI units (force, work, power); Kilogram is a fundamental base unit of mass.' },
        { en: ['Hydrochloric Acid', 'Sulphuric Acid', 'Nitric Acid', 'Sodium Hydroxide'], mr: ['हायड्रोक्लोरिक आम्ल', 'सल्फ्युरिक आम्ल', 'नायट्रिक आम्ल', 'सोडियम हायड्रॉक्साईड'], hi: ['हाइड्रोक्लोरिक अम्ल', 'सल्फ्यूरिक अम्ल', 'नाइट्रिक अम्ल', 'सोडियम हाइड्रॉक्साइड'], exp: 'First three are strong mineral acids; Sodium Hydroxide is a base (alkali).' },
        { en: ['Xylem', 'Phloem', 'Stomata', 'Alveoli'], mr: ['जलवाहिनी', 'रसवाहिनी', 'पर्णरंध्रे', 'वायुकोश'], hi: ['जाइलम', 'फ्लोएम', 'रंध्र', 'कूपिका (Alveoli)'], exp: 'First three belong to plants; Alveoli are air sacs in animal lungs.' },
        { en: ['Conduction', 'Convection', 'Radiation', 'Evaporation'], mr: ['वहन', 'अभिसरण', 'प्रारण', 'बाष्पीभवन'], hi: ['चालन', 'संवहन', 'विकिरण', 'वाष्पीकरण'], exp: 'Conduction, Convection, Radiation are modes of heat transfer; Evaporation is a change of state.' },
        { en: ['Jupiter', 'Saturn', 'Uranus', 'Mars'], mr: ['गुरू', 'शनी', 'युरेनस', 'मंगळ'], hi: ['बृहस्पति', 'शनि', 'अरुण', 'मंगल'], exp: 'Jupiter, Saturn, Uranus are outer gas/ice giants; Mars is an inner rocky planet.' },
        { en: ['Malaria', 'Dengue', 'Chikungunya', 'Diabetes'], mr: ['हिवताप (मलेरिया)', 'डेंग्यू', 'चिकुनगुनिया', 'मधुमेह'], hi: ['मलेरिया', 'डेंगू', 'चिकनगुनिया', 'मधुमेह'], exp: 'First three are vector-borne infectious diseases; Diabetes is a non-communicable lifestyle/metabolic disorder.' },
        { en: ['Oxygen', 'Nitrogen', 'Argon', 'Distilled Water'], mr: ['ऑक्सिजन', 'नायट्रोजन', 'आर्गॉन', 'ऊर्ध्वपातित पाणी'], hi: ['ऑक्सीजन', 'नाइट्रोजन', 'आर्गन', 'आसुत जल'], exp: 'Oxygen, Nitrogen, Argon are atmospheric gases; Water is a compound.' },
        { en: ['Amoeba', 'Paramecium', 'Euglena', 'Fern'], mr: ['अमिबा', 'पॅरामेशियम', 'युग्लीना', 'नेचे (फर्न)'], hi: ['अमीबा', 'पैरामीशियम', 'यूग्लीना', 'फर्न'], exp: 'First three are unicellular organisms; Fern is a multicellular plant.' },
        { en: ['Granite', 'Basalt', 'Pumice', 'Marble'], mr: ['ग्रॅनाइट', 'बेसाल्ट', 'प्युमिस', 'संगमरवर'], hi: ['ग्रेनाइट', 'बेसाल्ट', 'प्यूमिस', 'संगमरमर'], exp: 'First three are igneous rocks; Marble is a metamorphic rock.' },
        { en: ['Concave', 'Convex', 'Parabolic', 'Prism'], mr: ['अंतर्गोल', 'बहिर्गोल', 'परवलयिक', 'लोलक (प्रिझम)'], hi: ['अवतल', 'उत्तल', 'परवलयिक', 'प्रिज्म'], exp: 'First three describe curved mirrors/lenses; Prism is a triangular glass block for dispersion.' },
        { en: ['Stomach', 'Small Intestine', 'Oesophagus', 'Kidney'], mr: ['जठर', 'लहान आतडे', 'अन्ननलिका', 'मूत्रपिंड'], hi: ['आमाशय', 'छोटी आँत', 'ग्रासनली', 'वृक्क (Kidney)'], exp: 'First three belong to digestive system; Kidney belongs to excretory system.' },
        { en: ['Raigad', 'Pratapgad', 'Sinhagad', 'Ajanta'], mr: ['रायगड', 'प्रतापगड', 'सिंहगड', 'अजिंठा'], hi: ['रायगढ़', 'प्रतापगढ़', 'सिंहगढ़', 'अजंता'], exp: 'Raigad, Pratapgad, Sinhagad are Maratha hill forts; Ajanta is renowned for ancient rock-cut caves.' },
        { en: ['Solar Energy', 'Wind Energy', 'Tidal Energy', 'Coal'], mr: ['सौर ऊर्जा', 'पवन ऊर्जा', 'भरती-ओहोटी ऊर्जा', 'दगडी कोळसा'], hi: ['सौर ऊर्जा', 'पवन ऊर्जा', 'ज्वारीय ऊर्जा', 'कोयला'], exp: 'First three are renewable energy sources; Coal is a non-renewable fossil fuel.' },
        { en: ['Bronze', 'Brass', 'Steel', 'Mercury'], mr: ['कांस्य', 'पितळ', 'पोलाद', 'पारा'], hi: ['काँसा', 'पीतल', 'इस्पात', 'पारा'], exp: 'Bronze, Brass, Steel are alloys; Mercury is a pure elemental metal.' },
        { en: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Lithosphere'], mr: ['तपांबर', 'स्थितांबर', 'मध्यांबर', 'शिलावरण'], hi: ['क्षोभमंडल', 'समतापमंडल', 'मध्यमंडल', 'स्थलमंडल'], exp: 'First three are layers of the atmosphere; Lithosphere is the Earth’s solid crust.' },
        { en: ['Rabi Crop', 'Kharif Crop', 'Zaid Crop', 'Hydroponics'], mr: ['रब्बी पीक', 'खरीप पीक', 'उन्हाळी पीक', 'जलशेती (हायड्रोपोनिक्स)'], hi: ['रबी फसल', 'खरीफ फसल', 'जायद फसल', 'हाइड्रोपोनिक्स'], exp: 'First three are seasonal cropping types; Hydroponics is a soil-less growing technique.' },
        { en: ['Pitcher Plant', 'Venus Flytrap', 'Drosera', 'Rose'], mr: ['घटपर्णी', 'व्हीनस फ्लायट्रॅप', 'ड्रॉसेरा', 'गुलाब'], hi: ['घटपर्णी', 'वीनस फ्लाईट्रैप', 'ड्रोसेरा', 'गुलाब'], exp: 'First three are insectivorous plants; Rose is purely autotrophic.' },
        { en: ['Lok Sabha', 'Rajya Sabha', 'Vidhan Sabha', 'Supreme Court'], mr: ['लोकसभा', 'राज्यसभा', 'विधानसभा', 'सर्वोच्च न्यायालय'], hi: ['लोकसभा', 'राज्यसभा', 'विधानसभा', 'उच्चतम न्यायालय'], exp: 'First three are legislative houses; Supreme Court is the judiciary.' },
        { en: ['Tungsten', 'Nichrome', 'Constantan', 'Bakelite'], mr: ['टंगस्टन', 'नायक्रोम', 'कॉन्स्टंटन', 'बॅकेलाईट'], hi: ['टंगस्टन', 'नाइक्रोम', 'कॉन्स्टेंटन', 'बैकेलाइट'], exp: 'First three are electrical conductor filaments/wires; Bakelite is a thermosetting insulator plastic.' },
        { en: ['Latitude', 'Longitude', 'Equator', 'Tectonic'], mr: ['अक्षवृत्त', 'रेखावृत्त', 'विषुववृत्त', 'भूपट्ट (टेक्टॉनिक)'], hi: ['अक्षांश', 'देशांतर', 'भूमध्य रेखा', 'विवर्तनिक'], exp: 'First three are geographic coordinate lines; Tectonic relates to crustal plates.' },
        { en: ['Vinegar', 'Citric Acid', 'Lactic Acid', 'Baking Soda'], mr: ['व्हिनेगर', 'सायट्रिक आम्ल', 'लॅक्टिक आम्ल', 'खाण्याचा सोडा'], hi: ['सिरका', 'साइट्रिक अम्ल', 'लैक्टिक अम्ल', 'बेकिंग सोडा'], exp: 'First three are acidic substances; Baking Soda (Sodium Bicarbonate) is basic.' },
        { en: ['Ruler', 'Compass', 'Protractor', 'Thermometer'], mr: ['पट्टी', 'कंपास', 'कोनमापक', 'तापमापी'], hi: ['स्केल', 'परकार', 'चाँदा', 'थर्मामीटर'], exp: 'First three are geometric instruments; Thermometer measures temperature.' },
        { en: ['Saccharomyces', 'Penicillium', 'Lactobacillus', 'Amoeba'], mr: ['सॅकॅरोमायसिस (यीस्ट)', 'पेनिसिलियम', 'लॅक्टोबॅसिलस', 'अमिबा'], hi: ['यीस्ट', 'पेनिसिलियम', 'लैक्टोबैसिलस', 'अमीबा'], exp: 'First three are fungi/beneficial bacteria; Amoeba is a protozoan.' },
        { en: ['Centripetal', 'Gravitational', 'Magnetic', 'Density'], mr: ['अभिकेंद्री बल', 'गुरुत्वाकर्षण बल', 'चुंबकीय बल', 'घनता'], hi: ['अभिकेंद्रीय बल', 'गुरुत्वाकर्षण बल', 'चुंबकीय बल', 'घनत्व'], exp: 'First three are forces; Density is mass per unit volume.' },
      ];
      const st = sets[t - 1];
      const enOpts = placeStringOptions(st.en[3], [st.en[0], st.en[1], st.en[2]], correctIdx);
      const mrOpts = placeStringOptions(st.mr[3], [st.mr[0], st.mr[1], st.mr[2]], correctIdx);
      const hiOpts = placeStringOptions(st.hi[3], [st.hi[0], st.hi[1], st.hi[2]], correctIdx);
      return {
        topic: 'Classification (Odd One Out)',
        enQ: `Find the odd term out among: ${enOpts.join(', ')}.`,
        mrQ: `गटात न बसणारा वेगळा घटक ओळखा: ${mrOpts.join(', ')}.`,
        hiQ: `निम्नलिखित में से असंगत विकल्प चुनिए: ${hiOpts.join(', ')}।`,
        enOpts,
        mrOpts,
        hiOpts,
        enExp: st.exp,
        mrExp: `${st.exp}`,
        hiExp: `${st.exp}`,
      };
    }
    case 12: {
      // Coding-Decoding: Alternate +k, -k shift (mod 26 safe!)
      const words = ['PLANET', 'ROCKET', 'SILVER', 'BRIGHT', 'NUMBER', 'SIGNAL', 'VECTOR', 'MAGNET', 'QUARTZ', 'PRISMS', 'ORBITS', 'SPHERE', 'LINEAR', 'SYSTEM', 'FACTOR', 'DIVIDE', 'SQUARE', 'RADIUS', 'DEGREE', 'HEIGHT', 'VOLUME', 'WEIGHT', 'MATTER', 'PROTON', 'NEUTRON'];
      const w = words[t - 1];
      const k = 1 + (t % 3); // 1, 2, 3
      const encode = (word: string) =>
        word.split('').map((ch, i) => letterAt(ALPHABET.indexOf(ch) + 1 + (i % 2 === 0 ? k : -k))).join('');
      const sample = 'MASTER';
      const sampleCode = encode(sample);
      const ans = encode(w);
      const w1 = ans.slice(0, 4) + letterAt(ALPHABET.indexOf(ans[4]) + 3);
      const w2 = letterAt(ALPHABET.indexOf(ans[0]) + 3) + ans.slice(1);
      const w3 = w.split('').map((ch, i) => letterAt(ALPHABET.indexOf(ch) + 1 + (i % 2 === 0 ? -k : k))).join('');
      const opts = placeStringOptions(ans, [w1, w2, w3], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `In a code language, "${sample}" is written as "${sampleCode}". Using the same alternating shift rule, how is "${w}" written?`,
        mrQ: `एका सांकेतिक भाषेत "${sample}" हा शब्द "${sampleCode}" असा लिहिला जातो, तर त्याच नियमाने "${w}" कसा लिहिला जाईल?`,
        hiQ: `एक कूट भाषा में "${sample}" को "${sampleCode}" लिखा जाता है। उसी नियम से "${w}" को कैसे लिखा जाएगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Odd positions shift +${k}, even positions shift -${k} in A–Z → "${ans}".`,
        mrExp: `पहिल्या/तिसऱ्या/पाचव्या अक्षरात +${k} आणि दुसऱ्या/चौथ्या/सहाव्या अक्षरात -${k} केल्यास "${ans}" मिळते.`,
        hiExp: `विषम स्थान +${k} और सम स्थान -${k} बदलने पर "${ans}" प्राप्त होता है।`,
      };
    }
    case 13: {
      // Coding-Decoding: Double value (A=2, B=4, ..., Z=52)
      const words = ['CUBE', 'CONE', 'EDGE', 'FACE', 'AXIS', 'NODE', 'AREA', 'MASS', 'VOLT', 'WATT', 'OHMS', 'ATOM', 'IONS', 'BOND', 'ZINC', 'GOLD', 'IRON', 'LIME', 'ACID', 'BASE', 'SALT', 'WORK', 'HEAT', 'WAVE', 'LENS'];
      const w = words[t - 1];
      const sum = w.split('').reduce((s, ch) => s + (ALPHABET.indexOf(ch) + 1) * 2, 0);
      const opts = makeNumericOptions(sum, [4, -4, 8], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `If A = 2, B = 4, C = 6, ..., Z = 52 (each letter value is doubled), what is the total code sum for the word "${w}"?`,
        mrQ: `जर A = 2, B = 4, C = 6, ..., Z = 52 मानले, तर "${w}" या शब्दातील अक्षरांच्या किमतींची बेरीज किती होईल?`,
        hiQ: `यदि A = 2, B = 4, C = 6, ..., Z = 52 हो, तो शब्द "${w}" के अक्षरों के मानों का योग कितना होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum = 2 × (${w.split('').map((ch) => ALPHABET.indexOf(ch) + 1).join(' + ')}) = ${sum}.`,
        mrExp: `एकूण बेरीज = 2 × (${w.split('').map((ch) => ALPHABET.indexOf(ch) + 1).join(' + ')}) = ${sum}.`,
        hiExp: `योग = 2 × (${w.split('').map((ch) => ALPHABET.indexOf(ch) + 1).join(' + ')}) = ${sum}।`,
      };
    }
    case 14: {
      // Sentence Code Substitution (deduce code for one word)
      const nounsEn = ['sky', 'moon', 'book', 'tree', 'river', 'gold', 'star', 'rain', 'wind', 'hill', 'leaf', 'bird', 'lamp', 'road', 'fort', 'ship', 'seed', 'snow', 'soil', 'sand', 'rock', 'iron', 'bell', 'coin', 'cake'];
      const targetWord = nounsEn[t - 1];
      const code1 = 100 + t * 3;
      const code2 = 200 + t * 5; // common code!
      const code3 = 300 + t * 7;
      const code4 = 400 + t * 2;
      const opts = makeNumericOptions(code2, [code1 - code2, code3 - code2, 11], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `In a number code language: "${code1} ${code2}" means "bright ${targetWord}", and "${code2} ${code3}" means "${targetWord} shines". What digit group stands for "${targetWord}"?`,
        mrQ: `एका सांकेतिक भाषेत "${code1} ${code2}" म्हणजे "bright ${targetWord}" आणि "${code2} ${code3}" म्हणजे "${targetWord} shines", तर "${targetWord}" साठी कोणती संख्या येईल?`,
        hiQ: `एक कूट भाषा में "${code1} ${code2}" का अर्थ "bright ${targetWord}" और "${code2} ${code3}" का अर्थ "${targetWord} shines" है। "${targetWord}" का कूट क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `The word "${targetWord}" and number "${code2}" are common to both phrases (note: ${code4} does not appear). Thus "${targetWord}" = ${code2}.`,
        mrExp: `दोन्ही वाक्यांत "${targetWord}" हा शब्द व "${code2}" हा अंक सामाईक आहे. म्हणून उत्तर ${code2}.`,
        hiExp: `दोनों वाक्यांशों में "${targetWord}" और "${code2}" उभयनिष्ठ हैं। अतः उत्तर ${code2} है।`,
      };
    }
    case 15: {
      // Direction Sense with Pythagoras Theorem (right triangle shortest straight-line distance)
      const triples: Array<[number, number, number]> = [
        [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41],
      ];
      const base = triples[(t - 1) % triples.length];
      const scale = Math.floor((t - 1) / triples.length) + 1; // 1..5
      const dN = base[0] * scale;
      const dE = base[1] * scale;
      const dist = base[2] * scale;
      const opts = makeNumericOptions(dist, [2, -2, 4], correctIdx, '', ' m');
      const mrOpts = makeNumericOptions(dist, [2, -2, 4], correctIdx, '', ' मीटर');
      return {
        topic: 'Direction Sense (Pythagoras)',
        enQ: `${name} walks ${dN} m due North, then turns East and walks ${dE} m. What is the shortest straight-line distance between the starting point and the final position?`,
        mrQ: `${name} उत्तरेकडे ${dN} मीटर चालतो आणि नंतर पूर्वेकडे वळून ${dE} मीटर चालतो, तर सुरुवातीच्या ठिकाणापासून तो सरळ रेषेत किती मीटर अंतरावर आहे?`,
        hiQ: `${name} उत्तर की ओर ${dN} मी चलता है और फिर पूर्व की ओर मुड़कर ${dE} मी चलता है। प्रारंभिक बिंदु से अंतिम स्थिति की न्यूनतम सीधी दूरी ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts,
        hiOpts: mrOpts,
        enExp: `Using Pythagoras: √(${dN}² + ${dE}²) = √(${dN * dN + dE * dE}) = ${dist} m.`,
        mrExp: `पायथागोरस प्रमेयानुसार अंतर = √(${dN}² + ${dE}²) = ${dist} मीटर.`,
        hiExp: `पाइथागोरस प्रमेय से दूरी = √(${dN}² + ${dE}²) = ${dist} मीटर।`,
      };
    }
    case 16: {
      // Direction Sense: Angular Turns (Clockwise / Anti-Clockwise)
      const dirs8En = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
      const dirs8Mr = ['उत्तर', 'ईशान्य', 'पूर्व', 'आग्नेय', 'दक्षिण', 'नैऋत्य', 'पश्चिम', 'वायव्य'];
      const dirs8Hi = ['उत्तर', 'उत्तर-पूर्व', 'पूर्व', 'दक्षिण-पूर्व', 'दक्षिण', 'दक्षिण-पश्चिम', 'पश्चिम', 'उत्तर-पश्चिम'];
      const sIdx = (t - 1) % 8; // 0..7
      const cwStep = 2 + Math.floor((t - 1) / 8); // 2, 3, 4 -> 90°, 135°, 180°
      const ccwStep = 1; // 45°
      const netStep = cwStep - ccwStep; // +1, +2, +3 (45°, 90°, 135° CW) -> wait ensure t=1..25 has unique (sIdx, cwDeg, ccwDeg)! Use sIdx (0..7) x rotIdx (0..3)!
      const rotCombos: Array<[number, number]> = [[90, 45], [135, 45], [180, 45], [225, 90]];
      const [cwDeg, ccwDeg] = rotCombos[Math.floor((t - 1) / 8)];
      void cwStep;
      void netStep;
      const netCWSteps = (cwDeg - ccwDeg) / 45;
      const endIdx = (sIdx + netCWSteps) % 8;
      const wIdx = [1, 2, 3].map((k) => (endIdx + k) % 8);
      return {
        topic: 'Direction Sense (Angles)',
        enQ: `A compass needle/student faces ${dirs8En[sIdx]}. After turning ${cwDeg}° clockwise and then ${ccwDeg}° anti-clockwise, which direction is faced now?`,
        mrQ: `${name} चे तोंड ${dirs8Mr[sIdx]} दिशेकडे आहे. तो घड्याळाच्या काट्याच्या दिशेने ${cwDeg}° व नंतर विरुद्ध दिशेने ${ccwDeg}° फिरल्यास आता त्याचे तोंड कोणत्या दिशेला असेल?`,
        hiQ: `${name} का मुख ${dirs8Hi[sIdx]} दिशा की ओर है। वह दक्षिणावर्त ${cwDeg}° और फिर वामावर्त ${ccwDeg}° घूमता है। अब उसका मुख किस दिशा की ओर है?`,
        enOpts: placeStringOptions(dirs8En[endIdx], [dirs8En[wIdx[0]], dirs8En[wIdx[1]], dirs8En[wIdx[2]]], correctIdx),
        mrOpts: placeStringOptions(dirs8Mr[endIdx], [dirs8Mr[wIdx[0]], dirs8Mr[wIdx[1]], dirs8Mr[wIdx[2]]], correctIdx),
        hiOpts: placeStringOptions(dirs8Hi[endIdx], [dirs8Hi[wIdx[0]], dirs8Hi[wIdx[1]], dirs8Hi[wIdx[2]]], correctIdx),
        enExp: `Net turn = ${cwDeg}° - ${ccwDeg}° = ${cwDeg - ccwDeg}° clockwise from ${dirs8En[sIdx]} → ${dirs8En[endIdx]}.`,
        mrExp: `निव्वळ फिरणे = ${cwDeg - ccwDeg}° घड्याळाच्या दिशेने. म्हणून अंतिम दिशा ${dirs8Mr[endIdx]}.`,
        hiExp: `शुद्ध घुमाव = ${cwDeg - ccwDeg}° दक्षिणावर्त। अंतिम दिशा ${dirs8Hi[endIdx]} होगी।`,
      };
    }
    case 17: {
      // Multi-hop Blood Relations (Pointing Riddle - 5 scenarios x 5 speaker names = 25 unique)
      const speakers = ['Rohan', 'Priya', 'Aditya', 'Sneha', 'Omkar'];
      const spk = speakers[Math.floor((t - 1) / 5)];
      const scenIdx = (t - 1) % 5;
      const sc = [
        {
          en: `Pointing to a photograph, ${spk} says, "He is the son of the only daughter of my grandfather." If ${spk}'s mother has no sister, how is the man in the photo related to ${spk}?`,
          mr: `एका फोटोतील पुरुषाकडे पाहून ${spk} म्हणाला/ली, "तो माझ्या आजोबांच्या एकुलत्या एका मुलीचा मुलगा आहे." तर तो पुरुष ${spk} चा कोण (जर ${spk} एकुलता एक भाऊ नसेल/त्याची आई एकुलती मुलगी असेल तर)?`,
          hi: `एक तस्वीर की ओर इशारा करते हुए ${spk} ने कहा, "वह मेरे नाना/दादा की इकलौती बेटी का बेटा है।" वह व्यक्ति ${spk} का कौन है (यदि ${spk} स्वयं नहीं है)?`,
          ansEn: 'Brother', ansMr: 'भाऊ', ansHi: 'भाई',
          wEn: ['Father', 'Uncle', 'Grandfather'] as [string, string, string],
          wMr: ['वडील', 'काका', 'आजोबा'] as [string, string, string],
          wHi: ['पिता', 'चाचा', 'दादा'] as [string, string, string],
          exp: `Grandfather's only daughter = Mother; Mother's other son = Brother.`,
        },
        {
          en: `Introducing a woman, ${spk} said, "Her mother is the only daughter of my mother-in-law." Wait — for a Class 7 student cleanly: "${spk}'s father's mother's only son's wife is standing on stage." Who is that woman to ${spk}?`,
          mr: `"${spk} च्या वडिलांच्या आईच्या एकुलत्या एका मुलाची पत्नी" ही व्यक्ती ${spk} ची कोण लागेल?`,
          hi: `"${spk} के पिता की माता के इकलौते बेटे की पत्नी" ${spk} की क्या लगती है?`,
          ansEn: 'Mother', ansMr: 'आई', ansHi: 'माता',
          wEn: ['Aunt', 'Sister', 'Grandmother'] as [string, string, string],
          wMr: ['आत्या', 'बहीण', 'आजी'] as [string, string, string],
          wHi: ['बुआ', 'बहन', 'दादी'] as [string, string, string],
          exp: `Father's mother's only son is Father; Father's wife is Mother.`,
        },
        {
          en: `${spk} says, "Riya is the daughter of my father's only brother." How is Riya related to ${spk}?`,
          mr: `${spk} म्हणाला/ली, "रिया ही माझ्या वडिलांच्या एकुलत्या एका भावाची मुलगी आहे." तर रिया ${spk} ची कोण?`,
          hi: `${spk} ने कहा, "रिया मेरे पिता के इकलौते भाई की बेटी है।" रिया ${spk} की क्या लगती है?`,
          ansEn: 'Cousin Sister', ansMr: 'चुलत बहीण', ansHi: 'चचेरी बहन',
          wEn: ['Real Sister', 'Aunt', 'Niece'] as [string, string, string],
          wMr: ['सख्खी बहीण', 'आत्या', 'भाची'] as [string, string, string],
          wHi: ['सगी बहन', 'बुआ', 'भतीजी'] as [string, string, string],
          exp: `Father's brother is Paternal Uncle; Uncle's daughter is Cousin Sister.`,
        },
        {
          en: `In ${spk}'s family, Amit is the brother of Neha, and Suresh is Amit's father. Meena is Suresh's sister. How is Meena related to Neha?`,
          mr: `${spk} च्या कुटुंबात अमित हा नेहाचा भाऊ आहे आणि सुरेश हे अमितचे वडील आहेत. मीना ही सुरेशची बहीण असल्यास मीना नेहाची कोण?`,
          hi: `${spk} के परिवार में अमित, नेहा का भाई है और सुरेश, अमित के पिता हैं। मीना, सुरेश की बहन है। मीना, नेहा की क्या लगती है?`,
          ansEn: 'Paternal Aunt', ansMr: 'आत्या', ansHi: 'बुआ',
          wEn: ['Maternal Aunt', 'Mother', 'Grandmother'] as [string, string, string],
          wMr: ['मावशी', 'आई', 'आजी'] as [string, string, string],
          wHi: ['मौसी', 'माता', 'दादी'] as [string, string, string],
          exp: `Suresh is Neha's father, and Meena is Suresh's sister → Paternal Aunt.`,
        },
        {
          en: `In ${spk}'s neighborhood puzzle, A is the son of B, while B and C are sisters to each other. D is the mother of C. If E is the son of D, how is E related to A?`,
          mr: `${spk} ने विचारलेल्या कोड्यात A हा B चा मुलगा आहे, B व C या बहिणी आहेत, D ही C ची आई आहे व E हा D चा मुलगा आहे, तर E हा A चा कोण?`,
          hi: `${spk} की पहेली में A, B का पुत्र है; B और C बहनें हैं; D, C की माता है; E, D का पुत्र है। E, A का क्या लगता है?`,
          ansEn: 'Maternal Uncle', ansMr: 'मामा', ansHi: 'मामा',
          wEn: ['Paternal Uncle', 'Cousin', 'Grandfather'] as [string, string, string],
          wMr: ['काका', 'मामेभाऊ', 'आजोबा'] as [string, string, string],
          wHi: ['चाचा', 'ममेरा भाई', 'दादा'] as [string, string, string],
          exp: `B and C are daughters of D; E is D's son, so E is B's brother → A's Maternal Uncle.`,
        },
      ][scenIdx];
      return {
        topic: 'Blood Relations',
        enQ: sc.en.replace(/Introducing a woman.*cleanly: "/, '').replace(/" standing/, ' standing'),
        mrQ: sc.mr,
        hiQ: sc.hi,
        enOpts: placeStringOptions(sc.ansEn, sc.wEn, correctIdx),
        mrOpts: placeStringOptions(sc.ansMr, sc.wMr, correctIdx),
        hiOpts: placeStringOptions(sc.ansHi, sc.wHi, correctIdx),
        enExp: sc.exp,
        mrExp: `${sc.ansMr} हे नाते बरोबर आहे.`,
        hiExp: `सही संबंध '${sc.ansHi}' है।`,
      };
    }
    case 18: {
      // Coded Blood Relations Expression (P @ Q, P # Q, P $ Q -> 25 unique triples)
      const trioPool = [
        ['P', 'Q', 'R'], ['K', 'L', 'M'], ['X', 'Y', 'Z'], ['A', 'B', 'C'], ['D', 'E', 'F'],
        ['M', 'N', 'O'], ['S', 'T', 'U'], ['V', 'W', 'X'], ['G', 'H', 'J'], ['R', 'S', 'T'],
        ['B', 'C', 'D'], ['E', 'F', 'G'], ['H', 'J', 'K'], ['L', 'M', 'N'], ['N', 'P', 'Q'],
        ['C', 'D', 'E'], ['F', 'G', 'H'], ['J', 'K', 'L'], ['T', 'U', 'V'], ['U', 'V', 'W'],
        ['P', 'R', 'S'], ['A', 'C', 'E'], ['B', 'D', 'F'], ['K', 'M', 'P'], ['L', 'N', 'R'],
      ];
      const [c1, c2, c3] = trioPool[t - 1];
      // Rule: X @ Y means X is father of Y; X # Y means X is sister of Y. Find c1 in c1 @ c2 # c3!
      // c1 is father of c2, c2 is sister of c3 -> c1 is Father of c3!
      return {
        topic: 'Coded Blood Relations',
        enQ: `If "A @ B" means "A is the father of B" and "A # B" means "A is the sister of B", how is ${c1} related to ${c3} in "${c1} @ ${c2} # ${c3}"?`,
        mrQ: `जर "A @ B" म्हणजे "A हा B चा वडील आहे" आणि "A # B" म्हणजे "A ही B ची बहीण आहे", तर "${c1} @ ${c2} # ${c3}" मध्ये ${c1} हा ${c3} चा कोण?`,
        hiQ: `यदि "A @ B" का अर्थ "A, B का पिता है" और "A # B" का अर्थ "A, B की बहन है", तो "${c1} @ ${c2} # ${c3}" में ${c1} का ${c3} से क्या संबंध है?`,
        enOpts: placeStringOptions('Father', ['Grandfather', 'Uncle', 'Brother'], correctIdx),
        mrOpts: placeStringOptions('वडील', ['आजोबा', 'काका', 'भाऊ'], correctIdx),
        hiOpts: placeStringOptions('पिता', ['दादा', 'चाचा', 'भाई'], correctIdx),
        enExp: `${c1} is the father of ${c2}, and ${c2} is the sister of ${c3}; hence ${c1} is the Father of ${c3}.`,
        mrExp: `${c1} हे ${c2} चे वडील आणि ${c2} ही ${c3} ची बहीण असल्याने ${c1} हे ${c3} चे वडील आहेत.`,
        hiExp: `${c1}, ${c2} का पिता है और ${c2}, ${c3} की बहन है, अतः ${c1}, ${c3} का पिता है।`,
      };
    }
    case 19: {
      // Order & Ranking: Two students interchange positions -> Total students!
      const posLeftBefore = 6 + ((t - 1) % 6); // 6..11
      const posRightBefore = 8 + Math.floor((t - 1) / 6); // 8..12 (6x5 bijection)
      const posLeftAfter = posLeftBefore + 4 + (t % 3); // 10..17
      // When A swaps with B, A's new position from left = B's old position from left!
      // Total = A_new_left + B_old_right - 1
      const total = posLeftAfter + posRightBefore - 1;
      const opts = makeNumericOptions(total, [1, -1, 2], correctIdx);
      return {
        topic: 'Order & Ranking',
        enQ: `In a row of students facing North, ${name} is ${posLeftBefore}th from the left and Rohan is ${posRightBefore}th from the right. When they interchange positions, ${name} becomes ${posLeftAfter}th from the left. How many students are in the row?`,
        mrQ: `एका रांगेत ${name} डावीकडून ${posLeftBefore} वा व रोहन उजवीकडून ${posRightBefore} वा आहे. त्यांनी आपापल्या जागा बदलल्यास ${name} डावीकडून ${posLeftAfter} वा होतो, तर रांगेत एकूण किती विद्यार्थी आहेत?`,
        hiQ: `एक पंक्ति में ${name} बाएँ से ${posLeftBefore}वें और रोहन दाएँ से ${posRightBefore}वें स्थान पर है। स्थान बदलने पर ${name} बाएँ से ${posLeftAfter}वाँ हो जाता है। पंक्ति में कुल कितने विद्यार्थी हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total students = New left rank of ${name} + Old right rank of Rohan - 1 = ${posLeftAfter} + ${posRightBefore} - 1 = ${total}.`,
        mrExp: `एकूण विद्यार्थी = ${posLeftAfter} + ${posRightBefore} - 1 = ${total}.`,
        hiExp: `कुल विद्यार्थी = ${posLeftAfter} + ${posRightBefore} - 1 = ${total}।`,
      };
    }
    case 20: {
      // Seating Arrangement (5 friends in a row -> find exact middle)
      const friendsSets: Array<[string, string, string, string, string]> = [
        ['Aarav', 'Bina', 'Chetan', 'Diya', 'Esha'],
        ['Farhan', 'Gauri', 'Harsh', 'Isha', 'Jay'],
        ['Karan', 'Lata', 'Manoj', 'Nisha', 'Om'],
        ['Pranav', 'Qasim', 'Rhea', 'Soham', 'Tara'],
        ['Uday', 'Vani', 'Wasim', 'Yash', 'Zoya'],
      ];
      const [p1, p2, p3, p4, p5] = friendsSets[(t - 1) % 5];
      const posAsked = Math.floor((t - 1) / 5); // 0..4 -> ask Leftmost, 2nd from Left, Middle, 4th from Left, Rightmost!
      const ordered = [p1, p2, p3, p4, p5];
      const labelsEn = ['at the extreme LEFT end', 'SECOND from the left', 'at the EXACT MIDDLE', 'FOURTH from the left', 'at the extreme RIGHT end'];
      const labelsMr = ['अगदी डाव्या टोकाला', 'डावीकडून दुसऱ्या स्थानावर', 'अगदी मधोमध', 'डावीकडून चौथ्या स्थानावर', 'अगदी उजव्या टोकाला'];
      const labelsHi = ['बिल्कुल बाएँ छोर पर', 'बाएँ से दूसरे स्थान पर', 'ठीक बीच में', 'बाएँ से चौथे स्थान पर', 'बिल्कुल दाएँ छोर पर'];
      const ans = ordered[posAsked];
      const wrongs = ordered.filter((_, i) => i !== posAsked).slice(0, 3) as [string, string, string];
      return {
        topic: 'Seating Arrangement',
        enQ: `Five students (${ordered.join(', ')}) sit on a bench facing North: ${p1} is immediately left of ${p2}, ${p3} sits strictly between ${p2} and ${p4}, and ${p5} is to the immediate right of ${p4}. Who is ${labelsEn[posAsked]}?`,
        mrQ: `${ordered.join(', ')} हे पाच जण उत्तरेकडे तोंड करून बसले आहेत: ${p1} हा ${p2} च्या लगत डावीकडे, ${p3} हा ${p2} व ${p4} च्या मधोमध, आणि ${p5} हा ${p4} च्या लगत उजवीकडे बसला आहे. तर ${labelsMr[posAsked]} कोण बसले आहे?`,
        hiQ: `${ordered.join(', ')} उत्तर की ओर मुँह करके बैठे हैं: ${p1}, ${p2} के ठीक बाएँ है; ${p3}, ${p2} और ${p4} के ठीक बीच में है; ${p5}, ${p4} के ठीक दाएँ है। ${labelsHi[posAsked]} कौन बैठा है?`,
        enOpts: placeStringOptions(ans, wrongs, correctIdx),
        mrOpts: placeStringOptions(ans, wrongs, correctIdx),
        hiOpts: placeStringOptions(ans, wrongs, correctIdx),
        enExp: `Left-to-right seating order: ${ordered.join(' - ')}. Therefore ${ans} is ${labelsEn[posAsked]}.`,
        mrExp: `डावीकडून उजवीकडे क्रम: ${ordered.join(' - ')}. म्हणून उत्तर ${ans}.`,
        hiExp: `बाएँ से दाएँ क्रम: ${ordered.join(' - ')}। अतः उत्तर ${ans} है।`,
      };
    }
    case 21: {
      // Circular Table Arrangement (6 friends around round table facing center)
      const groups: Array<[string, string, string, string, string, string]> = [
        ['Amit', 'Bala', 'Chitra', 'Dev', 'Ekta', 'Farid'],
        ['Gita', 'Hema', 'Imran', 'Jatin', 'Kiran', 'Leela'],
        ['Meera', 'Nitin', 'Ojas', 'Pooja', 'Qadir', 'Ravi'],
        ['Sana', 'Tarun', 'Uma', 'Varun', 'Wafa', 'Yash'],
        ['Asha', 'Bhavna', 'Chirag', 'Deepa', 'Eshan', 'Fiza'],
      ];
      const [a, b, c, d, e, f] = groups[(t - 1) % 5];
      const askIdx = Math.floor((t - 1) / 5); // 0..4
      // Clockwise order around circle: a(0), b(1), c(2), d(3), e(4), f(5) -> opposite pairs: (a,d), (b,e), (c,f)
      // Clues: d sits opposite a; b is immediate left (clockwise if facing centre! Wait: facing center, LEFT = clockwise, RIGHT = counter-clockwise; let's be unambiguous: "next clockwise", "opposite"!)
      const targets = [d, e, f, b, c];
      const ans = targets[askIdx];
      const askPersonEn = [a, b, c, e, f][askIdx];
      const others = [a, b, c, d, e, f].filter((x) => x !== ans && x !== askPersonEn).slice(0, 3) as [string, string, string];
      return {
        topic: 'Circular Seating',
        enQ: `Six friends sit evenly around a circular table facing the centre in clockwise order (${a}, ${b}, ${c}, ${d}, ${e}, ${f}). Who sits directly OPPOSITE to ${askPersonEn}?`,
        mrQ: `एका वर्तुळाकार टेबलाभोवती घड्याळाच्या काट्याच्या दिशेने (${a}, ${b}, ${c}, ${d}, ${e}, ${f}) हे सहा मित्र केंद्राकडे तोंड करून समसमान अंतरावर बसले आहेत. ${askPersonEn} च्या बरोबर समोर कोण बसले आहे?`,
        hiQ: `एक गोल मेज के चारों ओर केंद्र की ओर मुख करके दक्षिणावर्त क्रम में (${a}, ${b}, ${c}, ${d}, ${e}, ${f}) छह मित्र समान दूरी पर बैठे हैं। ${askPersonEn} के ठीक सामने कौन बैठा है?`,
        enOpts: placeStringOptions(ans, others, correctIdx),
        mrOpts: placeStringOptions(ans, others, correctIdx),
        hiOpts: placeStringOptions(ans, others, correctIdx),
        enExp: `Around a 6-seat circle, persons 3 steps apart sit opposite each other: ${askPersonEn} is opposite ${ans}.`,
        mrExp: `6 जणांच्या वर्तुळाकार बैठकीत 3 जागा अंतरावरील व्यक्ती समोरासमोर असतात: ${askPersonEn} समोर ${ans}.`,
        hiExp: `6 सीटों वाले वृत्त में 3 स्थान दूर व्यक्ति आमने-सामने होते हैं: ${askPersonEn} के सामने ${ans} है।`,
      };
    }
    case 22: {
      // BODMAS Operator Substitution (+ means ×, ÷ means +, × means -, - means ÷)
      const q = 3 + ((t - 1) % 6); // quotient = 3..8
      const d = 2 + Math.floor((t - 1) / 6); // divisor = 2..6
      const a = q * d;
      const c = 4 + (t % 5);
      const e = 3 + (t % 4);
      // Expr written with coded signs: `${a} - ${d} ÷ ${c} + ${e}` -> real: `${a} ÷ ${d} + ${c} × ${e}` = q + c * e
      const ans = q + c * e;
      const opts = makeNumericOptions(ans, [c, -e, 6], correctIdx);
      return {
        topic: 'Mathematical Operations',
        enQ: `If '-' stands for '÷', '÷' stands for '+', and '+' stands for '×', evaluate using BODMAS: ${a} - ${d} ÷ ${c} + ${e}`,
        mrQ: `जर '-' म्हणजे '÷', '÷' म्हणजे '+' आणि '+' म्हणजे '×' असेल, तर ${a} - ${d} ÷ ${c} + ${e} ची किंमत किती?`,
        hiQ: `यदि '-' का अर्थ '÷', '÷' का अर्थ '+' और '+' का अर्थ '×' हो, तो BODMAS से ${a} - ${d} ÷ ${c} + ${e} का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Substitute signs → ${a} ÷ ${d} + ${c} × ${e} = ${q} + ${c * e} = ${ans}.`,
        mrExp: `चिन्हे बदलून: ${a} ÷ ${d} + ${c} × ${e} = ${q} + ${c * e} = ${ans}.`,
        hiExp: `चिह्न बदलने पर: ${a} ÷ ${d} + ${c} × ${e} = ${q} + ${c * e} = ${ans}।`,
      };
    }
    case 23: {
      // Which two numbers or signs interchange balances the equation? (Actually find missing RHS after sign swap + & ×)
      const x = 5 + ((t - 1) % 7);
      const y = 3 + Math.floor((t - 1) / 7);
      const z = 7 + (t % 5);
      // After swapping '+' and '×' in `x × y + z` -> becomes `x + y × z`
      const ans = x + y * z;
      const opts = makeNumericOptions(ans, [z, -y, x * y + z - ans || 5], correctIdx);
      return {
        topic: 'Mathematical Operations',
        enQ: `If the signs '+' and '×' are interchanged in the expression (${x} × ${y} + ${z}), what is the new value?`,
        mrQ: `${x} × ${y} + ${z} या पदावलीत '+' आणि '×' या चिन्हांची अदलाबदल केल्यास नवीन किंमत किती येईल?`,
        hiQ: `व्यंजक ${x} × ${y} + ${z} में '+' और '×' चिह्नों को आपस में बदल देने पर नया मान क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `After swapping + and ×: ${x} + ${y} × ${z} = ${x} + ${y * z} = ${ans}.`,
        mrExp: `अदलाबदल केल्यावर: ${x} + ${y} × ${z} = ${x} + ${y * z} = ${ans}.`,
        hiExp: `बदलने के बाद: ${x} + ${y} × ${z} = ${x} + ${y * z} = ${ans}।`,
      };
    }
    case 24: {
      // Clock Angle Formula |30H - 5.5M| (even minutes so exact integer angle!)
      const h = 1 + ((t - 1) % 8); // 1..8
      const mins = [10, 20, 40, 50][Math.floor((t - 1) / 8)]; // 8x4 bijection
      const raw = Math.abs(30 * h - 5.5 * mins);
      const angle = raw > 180 ? 360 - raw : raw;
      const timeStr = `${h}:${mins}`;
      const opts = makeNumericOptions(angle, [15, -10, 30], correctIdx, '', '°');
      return {
        topic: 'Clocks (Angles)',
        enQ: `Find the smaller angle (in degrees) between the hour hand and the minute hand of a clock at ${timeStr}.`,
        mrQ: `घड्याळात ${timeStr} वाजता तास काटा व मिनिट काटा यांमधील लहान कोनाचे माप किती अंश असेल?`,
        hiQ: `घड़ी में ${timeStr} बजे घंटे की सुई और मिनट की सुई के बीच का छोटा कोण कितने डिग्री का होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Angle = |30×${h} - 5.5×${mins}| = |${30 * h} - ${5.5 * mins}| = ${raw}° (smaller angle = ${angle}°).`,
        mrExp: `कोन = |30×${h} - 5.5×${mins}| = ${raw}° (लहान कोन = ${angle}°).`,
        hiExp: `कोण = |30×${h} - 5.5×${mins}| = ${raw}° (छोटा कोण = ${angle}°)।`,
      };
    }
    case 25: {
      // Clock Mirror Image Time (11:60 - HH:MM)
      const h = 2 + ((t - 1) % 8); // 2..9
      const m = 15 + Math.floor((t - 1) / 8) * 10; // 15, 25, 35, 45 -> 8x4 bijection
      const mirH = 11 - h;
      const mirM = 60 - m;
      const givenStr = `${h}:${m}`;
      const corr = `${mirH}:${mirM}`;
      const w1 = `${mirH + 1}:${mirM}`;
      const w2 = `${mirH}:${(mirM + 10) % 60 || 10}`;
      const w3 = `${12 - h}:${mirM}`;
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Clocks (Mirror Image)',
        enQ: `When seen in a vertical plane mirror, an analog clock without numbers appears to show ${givenStr}. What is the actual time?`,
        mrQ: `अंक नसलेल्या घड्याळाची वेळ आरशात ${givenStr} दिसते, तर प्रत्यक्षात घड्याळात किती वाजले असतील?`,
        hiQ: `बिना अंक वाली घड़ी में दर्पण में समय ${givenStr} दिखाई दे रहा है। वास्तविक समय क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Subtract from 11:60 → 11:60 - ${givenStr} = ${corr}.`,
        mrExp: `11:60 मधून ${givenStr} वजा केल्यास प्रत्यक्ष वेळ ${corr} मिळते.`,
        hiExp: `11:60 में से ${givenStr} घटाने पर वास्तविक समय ${corr} आता है।`,
      };
    }
    case 26: {
      // Calendar: Odd Days across consecutive Years (1 year = +1 normal / +2 leap)
      const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const daysMr = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const daysHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const startDay = (t - 1) % 7;
      // Year transitions from March 1 of Y to March 1 of Y+1 crosses Feb of Y+1!
      const yrPairs = [
        [2023, 2024, 2], // crosses Feb 29, 2024
        [2024, 2025, 1],
        [2027, 2028, 2],
        [2025, 2026, 1],
      ];
      const [y1, y2, shift] = yrPairs[Math.floor((t - 1) / 7)];
      const endDay = (startDay + shift) % 7;
      const wIdx = [1, 2, 3].map((k) => (endDay + k) % 7);
      return {
        topic: 'Calendar',
        enQ: `If 1st March ${y1} fell on a ${daysEn[startDay]}, what day of the week falls on 1st March ${y2}?`,
        mrQ: `जर 1 मार्च ${y1} रोजी ${daysMr[startDay]} असेल, तर 1 मार्च ${y2} रोजी कोणता वार येईल?`,
        hiQ: `यदि 1 मार्च ${y1} को ${daysHi[startDay]} था, तो 1 मार्च ${y2} को कौन-सा दिन होगा?`,
        enOpts: placeStringOptions(daysEn[endDay], [daysEn[wIdx[0]], daysEn[wIdx[1]], daysEn[wIdx[2]]], correctIdx),
        mrOpts: placeStringOptions(daysMr[endDay], [daysMr[wIdx[0]], daysMr[wIdx[1]], daysMr[wIdx[2]]], correctIdx),
        hiOpts: placeStringOptions(daysHi[endDay], [daysHi[wIdx[0]], daysHi[wIdx[1]], daysHi[wIdx[2]]], correctIdx),
        enExp: `Between 1 Mar ${y1} and 1 Mar ${y2}, February of ${y2} has ${shift === 2 ? '29 days (leap year → +2 odd days)' : '28 days (ordinary year → +1 odd day)'}. So ${daysEn[startDay]} + ${shift} = ${daysEn[endDay]}.`,
        mrExp: `${y2} हे ${shift === 2 ? 'लीप वर्ष असल्याने +2 दिवस' : 'साधे वर्ष असल्याने +1 दिवस'} पुढे जातो → ${daysMr[endDay]}.`,
        hiExp: `${y2} में फरवरी ${shift === 2 ? '29 दिन की (अधिवर्ष → +2)' : '28 दिन की (सामान्य → +1)'} है। अतः उत्तर ${daysHi[endDay]} है।`,
      };
    }
    case 27: {
      // Calendar: Total Odd Days in a century/span or Days between two dates in same year
      const startMay = 1 + ((t - 1) % 9); // 1..9 May
      const endJuly = 5 + Math.floor((t - 1) / 9); // 5, 6, 7 July -> 9x3 bijection
      // Days between startMay May and endJuly July = (31 - startMay) + 30 + endJuly
      const totalDays = (31 - startMay) + 30 + endJuly;
      const oddDays = totalDays % 7;
      const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const daysMr = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const daysHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const startDay = t % 7;
      const endDay = (startDay + oddDays) % 7;
      const wIdx = [1, 2, 3].map((k) => (endDay + k) % 7);
      return {
        topic: 'Calendar',
        enQ: `If ${startMay} May of a year is ${daysEn[startDay]}, what day of the week is ${endJuly} July of the SAME year?`,
        mrQ: `एकाच वर्षात ${startMay} मे रोजी ${daysMr[startDay]} असल्यास ${endJuly} जुलै रोजी कोणता वार येईल?`,
        hiQ: `एक ही वर्ष में यदि ${startMay} मई को ${daysHi[startDay]} है, तो ${endJuly} जुलाई को कौन-सा दिन होगा?`,
        enOpts: placeStringOptions(daysEn[endDay], [daysEn[wIdx[0]], daysEn[wIdx[1]], daysEn[wIdx[2]]], correctIdx),
        mrOpts: placeStringOptions(daysMr[endDay], [daysMr[wIdx[0]], daysMr[wIdx[1]], daysMr[wIdx[2]]], correctIdx),
        hiOpts: placeStringOptions(daysHi[endDay], [daysHi[wIdx[0]], daysHi[wIdx[1]], daysHi[wIdx[2]]], correctIdx),
        enExp: `Remaining in May (${31 - startMay}) + June (30) + July (${endJuly}) = ${totalDays} days = ${Math.floor(totalDays / 7)} weeks + ${oddDays} odd day(s) → ${daysEn[endDay]}.`,
        mrExp: `एकूण ${totalDays} दिवसांत ${oddDays} जादा दिवस मिळतात. म्हणून उत्तर ${daysMr[endDay]}.`,
        hiExp: `कुल ${totalDays} दिनों में ${oddDays} विषम दिन हैं। अतः उत्तर ${daysHi[endDay]} है।`,
      };
    }
    case 28: {
      // Counting Triangles in multi-tiered Triangle (h horizontal layers × v vertical bases)
      const vParts = 3 + ((t - 1) % 6); // 3..8 vertical parts
      const hLayers = 1 + Math.floor((t - 1) / 6); // 1..5 horizontal tiers -> 6x5 bijection
      const total = hLayers * ((vParts * (vParts + 1)) / 2);
      const opts = makeNumericOptions(total, [vParts, -hLayers, 6], correctIdx);
      return {
        topic: 'Counting Figures (Triangles)',
        enQ: `A large triangle has rays from its top vertex dividing the base into ${vParts} parts, AND is also cut horizontally into ${hLayers} parallel layers. How many triangles are formed in total?`,
        mrQ: `एका मोठ्या त्रिकोणाच्या शीर्षबिंदूतून पायाचे ${vParts} भाग केले आहेत आणि पायाला समांतर ${hLayers} आडव्या रेषा/थर काढले आहेत, तर एकूण किती त्रिकोण तयार होतील?`,
        hiQ: `एक बड़े त्रिभुज के शीर्ष से आधार को ${vParts} भागों में बाँटा गया है और आधार के समानांतर ${hLayers} क्षैतिज स्तर बनाए गए हैं। कुल कितने त्रिभुज बनेंगे?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Per layer = ${vParts}×(${vParts}+1)÷2 = ${(vParts * (vParts + 1)) / 2}. Over ${hLayers} layers = ${hLayers} × ${(vParts * (vParts + 1)) / 2} = ${total}.`,
        mrExp: `प्रत्येक थरात ${(vParts * (vParts + 1)) / 2} त्रिकोण × ${hLayers} थर = ${total}.`,
        hiExp: `प्रत्येक स्तर में ${(vParts * (vParts + 1)) / 2} त्रिभुज × ${hLayers} स्तर = ${total}।`,
      };
    }
    case 29: {
      // Counting Rectangles in an m × n grid
      const m = 2 + ((t - 1) % 5); // 2..6 rows
      const n = 3 + Math.floor((t - 1) / 5); // 3..7 cols -> 5x5 bijection
      const total = ((m * (m + 1)) / 2) * ((n * (n + 1)) / 2);
      const opts = makeNumericOptions(total, [6, -6, 12], correctIdx);
      return {
        topic: 'Counting Figures (Rectangles)',
        enQ: `Find the total number of rectangles (including squares) in a ${m} × ${n} grid.`,
        mrQ: `${m} × ${n} आकाराच्या जाळीमध्ये (चौरस धरून) एकूण किती आयत तयार होतील?`,
        hiQ: `${m} × ${n} की एक जाली में (वर्गों सहित) कुल कितने आयत होंगे?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Formula = [m(m+1)/2] × [n(n+1)/2] = ${(m * (m + 1)) / 2} × ${(n * (n + 1)) / 2} = ${total}.`,
        mrExp: `सूत्र = [${m}×${m + 1}÷2] × [${n}×${n + 1}÷2] = ${total}.`,
        hiExp: `सूत्र = [${m}×${m + 1}÷2] × [${n}×${n + 1}÷2] = ${total}।`,
      };
    }
    case 30: {
      // Painted Cube Cutting (n × n × n -> 0, 1, or 2 painted faces)
      const n = 3 + ((t - 1) % 7); // 3..9
      const faceKind = Math.floor((t - 1) / 7); // 0: 2 faces, 1: 1 face, 2: 0 faces, 3: total small cubes -> 7x4 bijection!
      let ans = 0;
      let askEn = '';
      let askMr = '';
      let askHi = '';
      let formulaExp = '';
      if (faceKind === 0) {
        ans = 12 * (n - 2);
        askEn = 'painted on EXACTLY TWO faces';
        askMr = 'फक्त दोन पृष्ठभागांवर रंग असलेल्या';
        askHi = 'केवल दो सतहों पर रंगे हुए';
        formulaExp = `12(n - 2) = 12 × (${n} - 2) = ${ans}`;
      } else if (faceKind === 1) {
        ans = 6 * (n - 2) * (n - 2);
        askEn = 'painted on ONLY ONE face';
        askMr = 'फक्त एका पृष्ठभागावर रंग असलेल्या';
        askHi = 'केवल एक सतह पर रंगे हुए';
        formulaExp = `6(n - 2)² = 6 × (${n - 2})² = ${ans}`;
      } else if (faceKind === 2) {
        ans = Math.pow(n - 2, 3);
        askEn = 'with NO painted faces (completely colourless)';
        askMr = 'एकही पृष्ठभागावर रंग नसलेल्या';
        askHi = 'बिना किसी रंगे हुए फलक (रंगहीन)';
        formulaExp = `(n - 2)³ = (${n - 2})³ = ${ans}`;
      } else {
        ans = n * n * n;
        askEn = 'in TOTAL (all small unit cubes)';
        askMr = 'एकूण किती लहान घन';
        askHi = 'कुल छोटे घन';
        formulaExp = `n³ = ${n}³ = ${ans}`;
      }
      const opts = makeNumericOptions(ans, [6, -6, 12], correctIdx);
      return {
        topic: 'Painted Cube Cutting',
        enQ: `A large cube of side ${n} cm is painted red on all 6 outer faces and cut into unit cubes of side 1 cm. How many small cubes will be ${askEn}?`,
        mrQ: `${n} सेमी बाजूच्या एका मोठ्या घनाला बाहेरून सर्व बाजूंनी लाल रंग देऊन त्याचे 1 सेमीचे लहान घन कापले, तर ${askMr} लहान घनांची संख्या किती?`,
        hiQ: `${n} सेमी भुजा वाले एक बड़े घन को सभी बाहरी सतहों पर लाल रंग कर 1 सेमी के छोटे घनों में काटा गया। ${askHi} घनों की संख्या कितनी होगी?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Here n = ${n}. Formula gives ${formulaExp}.`,
        mrExp: `येथे n = ${n}. सूत्रानुसार ${formulaExp}.`,
        hiExp: `यहाँ n = ${n}। सूत्र से ${formulaExp}।`,
      };
    }
    case 31: {
      // Standard / Two-View Dice Opposite Face
      const facesPool = [1, 2, 3, 4, 5, 6];
      const common = 1 + ((t - 1) % 6);
      const others = facesPool.filter((x) => x !== common); // 5 faces
      const rot = Math.floor((t - 1) / 6); // 0..4
      // View 1: [common, a, b] clockwise; View 2: [common, c, d] clockwise -> a opposite c, b opposite d!
      const a = others[rot % 5];
      const b = others[(rot + 1) % 5];
      const c = others[(rot + 2) % 5];
      const d = others[(rot + 3) % 5];
      const remaining = others[(rot + 4) % 5];
      void remaining;
      const askA = t % 2 === 1;
      const target = askA ? a : b;
      const oppAns = askA ? c : d;
      const wrongs = facesPool.filter((x) => x !== oppAns && x !== target).slice(0, 3).map(String) as [string, string, string];
      return {
        topic: 'Dice & Cubes',
        enQ: `Two positions of a single die are given: Position 1 shows faces (${common}, ${a}, ${b}) in clockwise order; Position 2 shows faces (${common}, ${c}, ${d}) in clockwise order. Which number is on the face OPPOSITE to ${target}?`,
        mrQ: `एका फाशाच्या दोन स्थिती दिल्या आहेत: स्थिती 1 मध्ये घड्याळाच्या दिशेने (${common}, ${a}, ${b}) आणि स्थिती 2 मध्ये (${common}, ${c}, ${d}) अंक आहेत, तर ${target} च्या विरुद्ध पृष्ठभागावर कोणता अंक असेल?`,
        hiQ: `एक ही पासे की दो स्थितियाँ दी गई हैं: स्थिति 1 में दक्षिणावर्त (${common}, ${a}, ${b}) और स्थिति 2 में (${common}, ${c}, ${d}) हैं। ${target} के विपरीत फलक पर कौन-सी संख्या होगी?`,
        enOpts: placeStringOptions(`${oppAns}`, wrongs, correctIdx),
        mrOpts: placeStringOptions(`${oppAns}`, wrongs, correctIdx),
        hiOpts: placeStringOptions(`${oppAns}`, wrongs, correctIdx),
        enExp: `Rotating from common face ${common} clockwise: (${a}↔${c}) and (${b}↔${d}) are opposite pairs. Opposite ${target} is ${oppAns}.`,
        mrExp: `सामाईक अंक ${common} पासून घड्याळाच्या दिशेने मांडल्यास ${target} समोर ${oppAns} येतो.`,
        hiExp: `उभयनिष्ठ अंक ${common} से दक्षिणावर्त तुलना करने पर ${target} के विपरीत ${oppAns} आता है।`,
      };
    }
    case 32: {
      // Venn Diagram with "Neither" (Total = A + B - Both + Neither -> ask Neither)
      const total = 45 + t;
      const setA = 24 + (t % 7);
      const setB = 22 + (t % 6);
      const both = 10 + (t % 5);
      const neither = total - (setA + setB - both);
      const opts = makeNumericOptions(neither, [2, -2, 4], correctIdx, '', '', true);
      return {
        topic: 'Venn Diagrams',
        enQ: `Out of ${total} students in a Science club, ${setA} study Physics, ${setB} study Chemistry, and ${both} study BOTH subjects. How many students study NEITHER Physics nor Chemistry?`,
        mrQ: `${total} विद्यार्थ्यांच्या एका गटात ${setA} विद्यार्थी भौतिकशास्त्र, ${setB} रसायनशास्त्र आणि ${both} जण दोन्ही विषय अभ्यासतात, तर यांपैकी एकही विषय न अभ्यासणारे विद्यार्थी किती?`,
        hiQ: `${total} विद्यार्थियों के समूह में ${setA} भौतिकी, ${setB} रसायन विज्ञान और ${both} दोनों विषय पढ़ते हैं। कितने विद्यार्थी इनमें से कोई भी विषय नहीं पढ़ते हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `At least one = ${setA} + ${setB} - ${both} = ${setA + setB - both}. Neither = ${total} - ${setA + setB - both} = ${neither}.`,
        mrExp: `किमान एक विषय अभ्यासणारे = ${setA + setB - both}. एकही नाही = ${total} - ${setA + setB - both} = ${neither}.`,
        hiExp: `कम से कम एक विषय = ${setA + setB - both}। कोई भी नहीं = ${total} - ${setA + setB - both} = ${neither}।`,
      };
    }
    case 33: {
      // Mirror Image String of 4 Alphanumeric Characters (Reversal + orientation check)
      const codes = ['A7M3', 'H2W8', 'T9X4', 'M5Y1', 'U4O9', 'V8I2', 'X6A5', 'W3T7', 'Y9H4', 'O1M8', 'I5U3', 'A8V2', 'H4X9', 'M7O6', 'T2Y5', 'W9A1', 'X3I8', 'Y6U4', 'V1M7', 'O5W2', 'U8T9', 'A4Y3', 'H7V6', 'X2M9', 'W4O1'];
      const src = codes[t - 1];
      const rev = src.split('').reverse().join('');
      const w1 = src;
      const w2 = rev.slice(0, 2) + src[2] + rev[3];
      const w3 = src[1] + rev.slice(1);
      const opts = placeStringOptions(rev, [w1, w2, w3], correctIdx);
      return {
        topic: 'Mirror Image',
        enQ: `Find the left-to-right reversed character sequence of "${src}" when viewed in a vertical mirror placed on the right.`,
        mrQ: `"${src}" या अक्षर-अंक संचाच्या उजवीकडे उभा आरसा धरल्यास अक्षरे व अंकांचा क्रम कसा दिसेल?`,
        hiQ: `"${src}" के दाईं ओर ऊर्ध्वाधर दर्पण रखने पर वर्णों का क्रम कैसा दिखाई देगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `A vertical mirror reverses the sequence from right to left: "${src}" → "${rev}".`,
        mrExp: `आरशात क्रम उजवीकडून डावीकडे उलट होतो: "${rev}".`,
        hiExp: `दर्पण में क्रम दाएँ से बाएँ उलट जाता है: "${rev}"।`,
      };
    }
    case 34: {
      // Water Image Symmetry Count for 6-digit codes (digits 0, 1, 3, 8 stay identical in water!)
      const symDigits = new Set(['0', '1', '3', '8']);
      const pins = [
        '108345', '832719', '014538', '387621', '901843',
        '248031', '713850', '560812', '819304', '307185',
        '483016', '610839', '185307', '039814', '851302',
        '314086', '980135', '104389', '835017', '017834',
        '384102', '608315', '139087', '802136', '308149',
      ];
      const pin = pins[t - 1];
      const count = pin.split('').filter((d) => symDigits.has(d)).length;
      const opts = makeNumericOptions(count, [1, -1, 2], correctIdx, '', '', true);
      return {
        topic: 'Water Image Symmetry',
        enQ: `In the 6-digit code "${pin}", how many digits retain their EXACT original shape in a horizontal water reflection (symmetry set: 0, 1, 3, 8)?`,
        mrQ: `"${pin}" या सहा अंकी संख्येतील किती अंक पाण्यातील प्रतिबिंबात (0, 1, 3, 8 प्रमाणे) मूळ स्वरूपात तसेच दिसतात?`,
        hiQ: `6-अंकीय कोड "${pin}" में ऐसे कितने अंक हैं जो जल प्रतिबिंब (0, 1, 3, 8 के समान) में बिल्कुल वैसे ही दिखते हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Only digits 0, 1, 3, 8 have horizontal symmetry. Counting them in "${pin}" gives ${count}.`,
        mrExp: `0, 1, 3, 8 हे अंक पाण्यात सारखेच दिसतात. "${pin}" मध्ये असे ${count} अंक आहेत.`,
        hiExp: `0, 1, 3, 8 जल प्रतिबिंब में समान दिखते हैं। "${pin}" में कुल ${count} ऐसे अंक हैं।`,
      };
    }
    case 35: {
      // Syllogism / Deductive Logic (All A are B, All B are C -> All A are C)
      const cats: Array<[string, string, string, string, string, string]> = [
        ['Squares', 'Rectangles', 'Polygons', 'चौरस', 'आयत', 'बहुभुज'],
        ['Roses', 'Flowers', 'Plants', 'गुलाब', 'फुले', 'वनस्पती'],
        ['Sparrows', 'Birds', 'Vertebrates', 'चिमण्या', 'पक्षी', 'पृष्ठवंशीय प्राणी'],
        ['Gold items', 'Metals', 'Elements', 'सोन्याचे दागिने', 'धातू', 'मूलद्रव्ये'],
        ['Mangoes', 'Fruits', 'Foods', 'आंबे', 'फळे', 'अन्नपदार्थ'],
      ];
      const c = cats[(t - 1) % 5];
      const round = Math.floor((t - 1) / 5) + 1; // 1..5 -> distinct logic frame or statement wording
      const frameEn = [
        'Statement 1', 'Premise Set A', 'Logic Rule', 'Deductive Clue', 'Inference Test',
      ][round - 1];
      const frameMr = ['विधान 1', 'तर्कसंच अ', 'नियम', 'अनुमान संच', 'तर्क चाचणी'][round - 1];
      const frameHi = ['कथन 1', 'तर्क सेट अ', 'नियम', 'निष्कर्ष सेट', 'तर्क परीक्षण'][round - 1];
      const corrEn = `All ${c[0]} are ${c[2]}`;
      const corrMr = `सर्व ${c[3]} हे ${c[5]} आहेत`;
      const corrHi = `सभी ${c[3]} ${c[5]} हैं`;
      return {
        topic: 'Logical Deduction (Syllogism)',
        enQ: `[${frameEn}] Given: "All ${c[0]} are ${c[1]}" and "All ${c[1]} are ${c[2]}". Which conclusion definitely follows?`,
        mrQ: `[${frameMr}] विधाने: "सर्व ${c[3]} हे ${c[4]} आहेत" आणि "सर्व ${c[4]} हे ${c[5]} आहेत". यावरून कोणते निश्चित निष्कर्ष निघते?`,
        hiQ: `[${frameHi}] कथन: "सभी ${c[3]} ${c[4]} हैं" और "सभी ${c[4]} ${c[5]} हैं"। कौन-सा निष्कर्ष निश्चित रूप से सही है?`,
        enOpts: placeStringOptions(corrEn, [`No ${c[0]} are ${c[2]}`, `All ${c[2]} are ${c[0]}`, `Some ${c[0]} are not ${c[1]}`], correctIdx),
        mrOpts: placeStringOptions(corrMr, [`कोणतेही ${c[3]} हे ${c[5]} नाहीत`, `सर्व ${c[5]} हे ${c[3]} आहेत`, `काही ${c[3]} हे ${c[4]} नाहीत`], correctIdx),
        hiOpts: placeStringOptions(corrHi, [`कोई भी ${c[3]} ${c[5]} नहीं है`, `सभी ${c[5]} ${c[3]} हैं`, `कुछ ${c[3]} ${c[4]} नहीं हैं`], correctIdx),
        enExp: `By transitive inclusion (A ⊂ B ⊂ C), all ${c[0]} are ${c[2]}.`,
        mrExp: `मालिका नियम (A ⊂ B ⊂ C) नुसार सर्व ${c[3]} हे ${c[5]} आहेत.`,
        hiExp: `क्रमिक नियम (A ⊂ B ⊂ C) से सभी ${c[3]} ${c[5]} हैं।`,
      };
    }
    case 36: {
      // Alphabet Test: First half (A..M) reversed -> M..A, second half N..Z intact
      const firstHalfRev = 'MLKJIHGFEDCBA';
      const secondHalf = 'NOPQRSTUVWXYZ';
      const fullModified = firstHalfRev + secondHalf;
      const pos1Based = 2 + ((t - 1) % 12); // 2..13 -> falls inside reversed first half or boundary! Actually t=1..25 -> position 2..26? Wait in second half 14..26 stay unchanged, so let's vary BOTH position (1..12) and direction (Left vs Right)!
      // t=1..12: from Left (1..12); t=13..25: from Right (14..26 -> wait 27 - r gives index in first half 1..13)!
      let qEn = '', qMr = '', qHi = '', ans = '', explain = '';
      if (t <= 12) {
        ans = fullModified[t - 1];
        qEn = `If the first half of the English alphabet (A–M) is written in reverse order (M, L, K, ..., A, N, O, ..., Z), which letter stands at position ${t} from the LEFT?`;
        qMr = `इंग्रजी अक्षरमालेचा पहिला अर्धा भाग (A ते M) उलट्या क्रमाने (M, L, ..., A, N, ..., Z) लिहिल्यास डावीकडून ${t} व्या स्थानावर कोणते अक्षर येईल?`;
        qHi = `यदि अंग्रेज़ी वर्णमाला के पहले आधे भाग (A से M) को उलटे क्रम में (M, L, ..., A, N, ..., Z) लिखा जाए, तो बाएँ से ${t}वें स्थान पर कौन-सा अक्षर होगा?`;
        explain = `First half reversed is M(1)..A(13). Position ${t} from left = ${ans}.`;
      } else {
        const k = t - 12; // 1..13 from Right in reversed-first-half or Z..N -> wait from RIGHT, Z is 1st, N is 13th, A is 14th..M is 26th! Let's ask position (13 + k) from RIGHT = A..M reversed!
        const rPos = 13 + k; // 14..26 from right!Wait rPos from right = index (26 - rPos) from left = (13 - k) from left -> A..M!
        ans = fullModified[26 - rPos];
        qEn = `If the first half of the English alphabet (A–M) is written in reverse order (M..A followed by N..Z), which letter stands at position ${rPos} from the RIGHT end?`;
        qMr = `इंग्रजी अक्षरमालेचा पहिला अर्धा भाग (A ते M) उलट्या क्रमाने (M..A, N..Z) लिहिल्यास उजवीकडून ${rPos} व्या स्थानावर कोणते अक्षर येईल?`;
        qHi = `यदि अंग्रेज़ी वर्णमाला के पहले आधे भाग (A से M) को उलटे क्रम (M..A, N..Z) में लिखा जाए, तो दाएँ से ${rPos}वें स्थान पर कौन-सा अक्षर होगा?`;
        explain = `Counting ${rPos} from Z (right) lands at index ${27 - rPos} from left in M..A → ${ans}.`;
      }
      const pIdx = ALPHABET.indexOf(ans);
      const wrongs: [string, string, string] = [ALPHABET[(pIdx + 1) % 26], ALPHABET[(pIdx + 2) % 26], ALPHABET[(pIdx + 25) % 26]];
      return {
        topic: 'Modified Alphabet Order',
        enQ: qEn,
        mrQ: qMr,
        hiQ: qHi,
        enOpts: placeStringOptions(ans, wrongs, correctIdx),
        mrOpts: placeStringOptions(ans, wrongs, correctIdx),
        hiOpts: placeStringOptions(ans, wrongs, correctIdx),
        enExp: explain,
        mrExp: `पहिला अर्धा भाग उलट लिहिल्याने अचूक अक्षर '${ans}' येते.`,
        hiExp: `पहला आधा भाग उलटने पर सही अक्षर '${ans}' आता है।`,
      };
    }
    case 37: {
      // Meaningful Word Formation from selected 1-based letter positions of a master word
      const puzzles: Array<{ master: string; pos: [number, number, number, number]; ans: string; wrongs: [string, string, string] }> = [
        { master: 'EDUCATION', pos: [2, 5, 8, 9], ans: 'DONE', wrongs: ['NODE', 'DENO', 'ONDE'] }, // Wait NODE is also valid! Choose single valid meaningful English word! Let's check EVERY puzzle carefully:
        { master: 'CHOCOLATE', pos: [1, 3, 5, 9], ans: 'COME', wrongs: ['MOCE', 'CEOM', 'ECMO'] }, // wait C,O,O,E -> COOE not COME! Check indices strictly programmatically!!
      ];
      // Generate master + indices programmatically so pos ALWAYS extracts ans!!
      const safePuzzles: Array<{ master: string; ans: string; wrongs: [string, string, string] }> = [
        { master: 'BLACKBOARD', ans: 'BOLD', wrongs: ['BLOD', 'DOLB', 'LODB'] },
        { master: 'TELEPHONE', ans: 'HOPE', wrongs: ['PEOH', 'EOPH', 'OHEP'] },
        { master: 'MATHEMATICS', ans: 'TEAM', wrongs: ['EMTA', 'AMTE', 'MTEA'] }, // Note: MATE/TAME/MEAT are anagrams; use unscrambled direct position extraction OR single-order word! Wait: "in the exact order of selection" makes the extracted string unique if only 1 option matches indices, OR ask anagram where only 1 option uses those 4 letters! Even better: "letters arranged in reverse/given order form which meaningful word?" — only 1 real word among 4 options (3 are non-words)!
        { master: 'PLAYGROUND', ans: 'GOLD', wrongs: ['GLOD', 'DLOG', 'OGLD'] },
        { master: 'BUTTERFLY', ans: 'TRUE', wrongs: ['URET', 'RETU', 'ETRU'] },
        { master: 'DICTIONARY', ans: 'RAIN', wrongs: ['ARNI', 'NIRA', 'IRNA'] },
        { master: 'VEGETABLE', ans: 'GATE', wrongs: ['TEGA', 'EATG', 'AGET'] },
        { master: 'SUNFLOWER', ans: 'FLOW', wrongs: ['WOLF', 'OWFL', 'LFWO'] }, // WOLF is valid! Avoid WOLF! Use SNOW -> S,N,O,W!
        { master: 'ADVENTURE', ans: 'TREE', wrongs: ['ERET', 'REET', 'TEER'] },
        { master: 'IMPORTANT', ans: 'RAIN', wrongs: ['ARNI', 'NIRA', 'IRNA'] },
        { master: 'CARPENTER', ans: 'TREE', wrongs: ['ERTE', 'REET', 'ETRE'] },
        { master: 'AEROPLANE', ans: 'PLAN', wrongs: ['NPLA', 'LNPA', 'ALNP'] },
        { master: 'KNOWLEDGE', ans: 'GLOW', wrongs: ['WLOG', 'OGWL', 'LGWO'] },
        { master: 'SCIENCEBOOK', ans: 'CONE', wrongs: ['ENOC', 'OCNE', 'NEOC'] },
        { master: 'NEWSPAPER', ans: 'WEAR', wrongs: ['RAWE', 'ERWA', 'AWRU'] },
        { master: 'GEOMETRY', ans: 'TREE', wrongs: ['ERET', 'REET', 'ETRE'] },
        { master: 'CLASSROOM', ans: 'COAL', wrongs: ['OLCA', 'LAOC', 'ACOL'] },
        { master: 'MICROPHONE', ans: 'HOME', wrongs: ['MOHE', 'EHMO', 'OMHE'] },
        { master: 'TRIANGLE', ans: 'GIRL', wrongs: ['IRGL', 'LGIR', 'RLIG'] },
        { master: 'ELECTRIC', ans: 'TILE', wrongs: ['ETLI', 'ILTE', 'LEIT'] },
        { master: 'MAGNETIC', ans: 'GAME', wrongs: ['MAGE', 'EGMA', 'AMGE'] },
        { master: 'SYLLABUS', ans: 'BULL', wrongs: ['LLUB', 'ULBL', 'LUBL'] },
        { master: 'EXERCISE', ans: 'RICE', wrongs: ['ERCI', 'CIRE', 'IREC'] },
        { master: 'CHEMISTRY', ans: 'MIST', wrongs: ['SMIT', 'TIMS', 'IMTS'] },
        { master: 'WATERFALL', ans: 'LEAF', wrongs: ['FAEL', 'ALFE', 'EFAL'] },
      ];
      void puzzles;
      const item = safePuzzles[t - 1];
      // Replace index 7 SUNFLOWER->SNOW and index 2 MATHEMATICS->TIME and index 20 MAGNETIC->GATE to avoid valid anagram distractors (WOLF/MATE/MAGE)!
      if (t - 1 === 7) item.ans = 'SNOW';
      if (t - 1 === 7) item.wrongs = ['NWSO', 'OWNS', 'WSON']; // OWNS! Replace with 'WSNO', 'NOSW', 'ONWS'
      if (t - 1 === 7) item.wrongs = ['WSNO', 'NOSW', 'ONWS'];
      if (t - 1 === 2) { item.ans = 'TIME'; item.wrongs = ['EMIT', 'MITE', 'IEMT']; } // EMIT/MITE are words! Use 'TMEI', 'IMTE', 'ETMI'!
      if (t - 1 === 2) { item.wrongs = ['TMEI', 'IMTE', 'ETMI']; }
      if (t - 1 === 20) { item.ans = 'GAIN'; item.wrongs = ['NIGA', 'AGNI', 'INGA']; }
      // Compute exact 1-based positions of ans letters in master (distinct indices!)
      const used = new Set<number>();
      const positions: number[] = [];
      for (const ch of item.ans) {
        const idxCh = item.master.split('').findIndex((c, i) => c === ch && !used.has(i));
        used.add(idxCh);
        positions.push(idxCh + 1);
      }
      const posList = positions.join(', ');
      const opts = placeStringOptions(item.ans, item.wrongs, correctIdx);
      return {
        topic: 'Word Formation',
        enQ: `Take the letters at positions (${posList}) from the word "${item.master}" (counting 1st, 2nd, ...) in that exact order. Which meaningful English word is formed?`,
        mrQ: `"${item.master}" या शब्दातील अनुक्रमे (${posList}) क्रमांकाची अक्षरे त्याच क्रमाने घेतल्यास कोणता अर्थपूर्ण इंग्रजी शब्द तयार होईल?`,
        hiQ: `शब्द "${item.master}" के क्रमशः (${posList}) स्थानों के अक्षरों को उसी क्रम में लेने पर कौन-सा सार्थक अंग्रेज़ी शब्द बनता है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Extracting letters at positions ${posList} from "${item.master}" gives "${item.ans}".`,
        mrExp: `दिलेल्या क्रमांकाची अक्षरे "${item.ans}" हा अर्थपूर्ण शब्द देतात.`,
        hiExp: `दिए गए स्थानों के अक्षर क्रमशः "${item.ans}" शब्द बनाते हैं।`,
      };
    }
    case 38: {
      // Missing Number in 3×3 Grid (Row rule: Col3 = Col1 × Col2 + Col1)
      const r1c1 = 2 + ((t - 1) % 5);
      const r1c2 = 3 + Math.floor((t - 1) / 5);
      const r1c3 = r1c1 * r1c2 + 2;
      const r2c1 = r1c1 + 1;
      const r2c2 = r1c2 + 1;
      const r2c3 = r2c1 * r2c2 + 2;
      const r3c1 = r1c1 + 2;
      const r3c2 = r1c2 + 2;
      const ans = r3c1 * r3c2 + 2;
      const opts = makeNumericOptions(ans, [2, -2, r3c1], correctIdx);
      return {
        topic: 'Matrix Number Puzzle',
        enQ: `In a 3×3 number matrix, Row 1 is [${r1c1}, ${r1c2}, ${r1c3}], Row 2 is [${r2c1}, ${r2c2}, ${r2c3}], and Row 3 is [${r3c1}, ${r3c2}, ?]. Find the missing number.`,
        mrQ: `एका 3×3 संख्या सारणीत पहिली ओळ [${r1c1}, ${r1c2}, ${r1c3}], दुसरी ओळ [${r2c1}, ${r2c2}, ${r2c3}] आणि तिसरी ओळ [${r3c1}, ${r3c2}, ?] आहे. प्रश्नचिन्हाच्या जागी कोणती संख्या येईल?`,
        hiQ: `एक 3×3 संख्या आव्यूह में पंक्ति 1 [${r1c1}, ${r1c2}, ${r1c3}], पंक्ति 2 [${r2c1}, ${r2c2}, ${r2c3}] तथा पंक्ति 3 [${r3c1}, ${r3c2}, ?] है। (?) का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Row rule: Col 3 = (Col 1 × Col 2) + 2. So (${r3c1} × ${r3c2}) + 2 = ${r3c1 * r3c2} + 2 = ${ans}.`,
        mrExp: `नियम: तिसरी संख्या = (पहिली × दुसरी) + 2 = ${ans}.`,
        hiExp: `नियम: तीसरा स्तंभ = (पहला × दूसरा) + 2 = ${ans}।`,
      };
    }
    case 39: {
      // Missing Number in Cross/Wheel (Center = Top×Bottom - Left×Right)
      const top = 6 + ((t - 1) % 6);
      const bot = 5 + Math.floor((t - 1) / 6);
      const left = 2 + (t % 4);
      const right = 3 + (t % 3);
      const center = top * bot - left * right;
      const opts = makeNumericOptions(center, [left, -right, 5], correctIdx);
      return {
        topic: 'Missing Number in Figure',
        enQ: `In a 4-wing puzzle, the centre equals (Top × Bottom) - (Left × Right). If Top = ${top}, Bottom = ${bot}, Left = ${left}, and Right = ${right}, find the centre number.`,
        mrQ: `एका चार-दिशा संख्या कोडेमध्ये मधली संख्या = (वरची × खालची) - (डावी × उजवी) आहे. वर=${top}, खाली=${bot}, डावी=${left}, उजवी=${right} असल्यास मधली संख्या कोणती?`,
        hiQ: `एक आकृति में मध्य संख्या = (ऊपर × नीचे) - (बायाँ × दायाँ) है। यदि ऊपर=${top}, नीचे=${bot}, बायाँ=${left} और दायाँ=${right} हो, तो मध्य संख्या ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Centre = (${top} × ${bot}) - (${left} × ${right}) = ${top * bot} - ${left * right} = ${center}.`,
        mrExp: `मधली संख्या = ${top * bot} - ${left * right} = ${center}.`,
        hiExp: `मध्य संख्या = ${top * bot} - ${left * right} = ${center}।`,
      };
    }
    case 40: {
      // Number Pyramid (4-row pyramid bottom 4 numbers -> Top = a + 3b + 3c + d)
      const a = 2 + ((t - 1) % 6);
      const b = 3 + Math.floor((t - 1) / 6);
      const c = 4 + (t % 4);
      const d = 5 + (t % 5);
      const r2 = [a + b, b + c, c + d];
      const r3 = [r2[0] + r2[1], r2[1] + r2[2]];
      const top = r3[0] + r3[1];
      const opts = makeNumericOptions(top, [3, -3, 6], correctIdx);
      return {
        topic: 'Number Pyramid',
        enQ: `In a 4-tier addition pyramid (each upper cell is the sum of the two cells below it), the bottom row has (${a}, ${b}, ${c}, ${d}). What is the top peak number?`,
        mrQ: `4 थरांच्या बेरीज पिरॅमिडच्या तळाशी (${a}, ${b}, ${c}, ${d}) या संख्या आहेत (वरची संख्या खालील दोन संख्यांची बेरीज), तर सर्वात वरची संख्या कोणती?`,
        hiQ: `4-स्तरीय योग पिरामिड के आधार में (${a}, ${b}, ${c}, ${d}) संख्याएँ हैं (ऊपरी ब्लॉक नीचे के दो ब्लॉकों का योग है)। शीर्ष पर कौन-सी संख्या होगी?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Tier 2: ${r2.join(', ')}. Tier 3: ${r3.join(', ')}. Peak = ${r3[0]} + ${r3[1]} = ${top}.`,
        mrExp: `दुसरी ओळ: ${r2.join(', ')}, तिसरी ओळ: ${r3.join(', ')}, शिखर = ${top}.`,
        hiExp: `दूसरा स्तर: ${r2.join(', ')}, तीसरा स्तर: ${r3.join(', ')}, शीर्ष = ${top}।`,
      };
    }
    case 41: {
      // Condition Sequence Counting (Even digit followed by Odd digit, NOT preceded by 2 or 4 -> verify!)
      const strings = [
        '6745832914', '8369254187', '4963852716', '2785639148', '6587492316',
        '8943672518', '6189472356', '8765439128', '6389274516', '8563914728',
        '6947852316', '8165492738', '6729834516', '8349652718', '6527894316',
        '8965234718', '6147839526', '8725694318', '6349852716', '8529674318',
        '6985274316', '8145672938', '6783492516', '8365294718', '6549872316',
      ];
      const s = strings[t - 1];
      const isPrimeDigit = (d: number) => d === 2 || d === 3 || d === 5 || d === 7;
      let count = 0;
      for (let i = 0; i < s.length - 1; i++) {
        const curr = Number(s[i]);
        const next = Number(s[i + 1]);
        if (curr % 2 === 0 && isPrimeDigit(next)) count++;
      }
      const opts = makeNumericOptions(count, [1, -1, 2], correctIdx, '', '', true);
      return {
        topic: 'Sequence & Condition Counting',
        enQ: `In the digit string "${s}", how many EVEN digits are immediately followed by a PRIME digit (2, 3, 5, or 7)?`,
        mrQ: `"${s}" या अंकमालिकेत किती सम अंकांच्या लगेचच पुढे मूळ (Prime: 2, 3, 5, 7) अंक आला आहे?`,
        hiQ: `अंक श्रृंखला "${s}" में ऐसे कितने सम अंक हैं जिनके ठीक बाद एक अभाज्य अंक (2, 3, 5 या 7) आता है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Checking every even digit followed immediately by 2, 3, 5, or 7 in "${s}" yields ${count}.`,
        mrExp: `प्रत्येक (सम, मूळ अंक) जोडी मोजल्यास एकूण ${count} जोड्या मिळतात.`,
        hiExp: `प्रत्येक (सम, अभाज्य अंक) जोड़ा गिनने पर कुल ${count} प्राप्त होते हैं।`,
      };
    }
    case 42: {
      // Rhythmic 3-Letter Cyclic Group Pattern
      const bases3 = ['abc', 'pqr', 'xyz', 'mno', 'def', 'ghi', 'jkl', 'stu', 'vwx', 'ace', 'bdf', 'ceg', 'dfh', 'egi', 'fhj', 'gik', 'hjl', 'ikm', 'jln', 'kmo', 'lnp', 'moq', 'npr', 'oqs', 'prt'];
      const b = bases3[t - 1];
      const full = `${b}${b}${b}`; // 9 chars
      const blankIdx = (t % 2 === 0) ? [1, 3, 7, 8] : [2, 4, 6, 8];
      const disp = full.split('').map((ch, i) => (blankIdx.includes(i) ? '_' : ch)).join(' ');
      const ans = blankIdx.map((i) => full[i]).join('');
      const w1 = `${b[0]}${b[1]}${b[2]}${b[0]}`;
      const w2 = `${b[2]}${b[1]}${b[0]}${b[2]}`;
      const w3 = `${b[1]}${b[2]}${b[0]}${b[1]}`;
      const w4 = `${b[0]}${b[0]}${b[1]}${b[2]}`;
      const wrongs = [w1, w2, w3, w4].filter((x) => x !== ans).slice(0, 3) as [string, string, string];
      return {
        topic: 'Rhythmic Letter Pattern',
        enQ: `Find the 4 letters that fill the blanks in order to complete the cyclic pattern: ${disp}`,
        mrQ: `पुढील चक्रीय अक्षरमालिका पूर्ण करण्यासाठी रिकाम्या जागी कोणता अक्षरगट येईल: ${disp}`,
        hiQ: `निम्नलिखित चक्रीय अक्षर श्रृंखला को पूरा करने वाला विकल्प चुनिए: ${disp}`,
        enOpts: placeStringOptions(ans, wrongs, correctIdx),
        mrOpts: placeStringOptions(ans, wrongs, correctIdx),
        hiOpts: placeStringOptions(ans, wrongs, correctIdx),
        enExp: `The repeating 3-letter block is "${b}": full sequence "${full}" → missing letters = "${ans}".`,
        mrExp: `"${b}" हा तीन अक्षरांचा गट वारंवार येतो → उत्तर "${ans}".`,
        hiExp: `"${b}" की आवृत्ति हो रही है → सही समूह "${ans}" है।`,
      };
    }
    case 43: {
      // Binary Code Conversion (Decimal to 5-bit/6-bit Binary)
      const val = 18 + t * 2; // 20..68 (unique even numbers!)
      const bin = val.toString(2);
      const w1 = (val + 2).toString(2);
      const w2 = (val - 2).toString(2);
      const w3 = (val + 1).toString(2);
      return {
        topic: 'Binary Number Coding',
        enQ: `In binary code (base-2 system), how is the decimal number ${val} represented using 1s and 0s?`,
        mrQ: `द्विमान (Binary) संख्यापद्धतीत दशमान संख्या ${val} ही कशी लिहिली जाईल?`,
        hiQ: `द्विआधारी (Binary) प्रणाली में दशमलव संख्या ${val} को कैसे लिखा जाएगा?`,
        enOpts: placeStringOptions(bin, [w1, w2, w3], correctIdx),
        mrOpts: placeStringOptions(bin, [w1, w2, w3], correctIdx),
        hiOpts: placeStringOptions(bin, [w1, w2, w3], correctIdx),
        enExp: `Repeatedly dividing ${val} by 2 and reading remainders bottom-up gives ${bin}.`,
        mrExp: `${val} ला 2 ने भागून बाकी उलट्या क्रमाने लिहिल्यास ${bin} मिळते.`,
        hiExp: `${val} को 2 से विभाजित कर शेषफलों को नीचे से ऊपर लिखने पर ${bin} प्राप्त होता है।`,
      };
    }
    case 44: {
      // Age Ratio Reasoning
      const part = 3 + ((t - 1) % 6); // 3..8
      const rA = 2;
      const rB = 3 + Math.floor((t - 1) / 6); // 3..6 -> 6x4 = 24, add t=25 unique! Make rB = 3 + Math.floor((t - 1) / 6) and part = 3 + ((t - 1) % 6) -> (t=25 has part=3, rB=7 -> all 25 unique!)
      const ageA = rA * part;
      const ageB = rB * part;
      const sum = ageA + ageB;
      const opts = makeNumericOptions(ageB, [part, -part, 4], correctIdx, '', ' yrs');
      const mrOpts = makeNumericOptions(ageB, [part, -part, 4], correctIdx, '', ' वर्षे');
      const hiOpts = makeNumericOptions(ageB, [part, -part, 4], correctIdx, '', ' वर्ष');
      return {
        topic: 'Age Puzzle (Ratio)',
        enQ: `The present ages of ${name} and Aarav are in the ratio ${rA} : ${rB}. If the sum of their present ages is ${sum} years, what is Aarav's present age?`,
        mrQ: `${name} व आरव यांच्या आजच्या वयांचे गुणोत्तर ${rA} : ${rB} आहे आणि त्यांच्या वयांची बेरीज ${sum} वर्षे आहे, तर आरवचे आजचे वय किती वर्षे?`,
        hiQ: `${name} और आरव की वर्तमान आयु का अनुपात ${rA} : ${rB} है। यदि उनकी आयु का योग ${sum} वर्ष है, तो आरव की वर्तमान आयु कितनी है?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Total parts = ${rA + rB}. 1 part = ${sum} ÷ ${rA + rB} = ${part}. Aarav = ${rB} × ${part} = ${ageB} years.`,
        mrExp: `1 भाग = ${sum} ÷ ${rA + rB} = ${part}. म्हणून आरवचे वय = ${rB} × ${part} = ${ageB} वर्षे.`,
        hiExp: `1 भाग = ${sum} ÷ ${rA + rB} = ${part}। आरव की आयु = ${rB} × ${part} = ${ageB} वर्ष।`,
      };
    }
    case 45: {
      // Knockout Tournament Matches (n - 1) vs League Matches (n(n-1)/2)
      const teams = 11 + t; // 12..36 teams
      const isKnockout = t % 2 === 1;
      const ans = isKnockout ? teams - 1 : (teams * (teams - 1)) / 2;
      const opts = makeNumericOptions(ans, [isKnockout ? 1 : teams, isKnockout ? -1 : -teams, 2], correctIdx);
      return {
        topic: 'Logical Combinatorics',
        enQ: isKnockout
          ? `In a state-level ${teams}-team KNOCKOUT badminton tournament (loser is eliminated immediately after each match), how many total matches are played to decide the champion?`
          : `In an inter-district ${teams}-team ROUND-ROBIN league (every team plays every other team once), how many total matches are played?`,
        mrQ: isKnockout
          ? `${teams} संघांच्या बाद फेरी (Knockout) स्पर्धेत विजेता ठरवण्यासाठी एकूण किती सामने खेळावे लागतील?`
          : `${teams} संघांच्या साखळी (Round-Robin) स्पर्धेत प्रत्येक संघाने प्रत्येकाशी एक सामना खेळल्यास एकूण किती सामने होतील?`,
        hiQ: isKnockout
          ? `${teams} टीमों की नॉकआउट (Knockout) प्रतियोगिता में विजेता तय करने के लिए कुल कितने मैच खेले जाएँगे?`
          : `${teams} टीमों की राउंड-रॉबिन लीग में प्रत्येक टीम अन्य हर टीम से एक मैच खेलती है। कुल कितने मैच खेले जाएँगे?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: isKnockout
          ? `To eliminate ${teams - 1} teams (leaving 1 champion), exactly ${teams} - 1 = ${ans} matches are required.`
          : `Using n(n-1) ÷ 2 = (${teams} × ${teams - 1}) ÷ 2 = ${ans} matches.`,
        mrExp: isKnockout
          ? `${teams - 1} संघ बाद करण्यासाठी ${teams} - 1 = ${ans} सामने आवश्यक आहेत.`
          : `सूत्रानुसार (${teams} × ${teams - 1}) ÷ 2 = ${ans} सामने.`,
        hiExp: isKnockout
          ? `${teams - 1} टीमों को बाहर करने के लिए ${teams} - 1 = ${ans} मैच खेले जाएँगे।`
          : `सूत्र (${teams} × ${teams - 1}) ÷ 2 = ${ans} मैच।`,
      };
    }
    case 46: {
      // Paper Folding & Punch Holes Count (p * 2^folds)
      const folds = 2 + ((t - 1) % 4); // 2, 3, 4, 5 folds (layers = 4, 8, 16, 32)
      const holes = 1 + Math.floor((t - 1) / 4); // 1..7 holes -> 4x7 = 28 >= 25!
      const ans = holes * Math.pow(2, folds);
      const opts = makeNumericOptions(ans, [holes, -holes, Math.pow(2, folds)], correctIdx);
      return {
        topic: 'Paper Folding & Cutting',
        enQ: `A square sheet of paper is folded cleanly in half ${folds} times in succession, and then ${holes} circular hole(s) are punched right through all folded layers away from the creases. When completely unfolded, how many holes will appear on the sheet?`,
        mrQ: `एका चौरस कागदाला सलग ${folds} वेळा अर्ध्यात घडी घातली आणि घडीच्या कडेपासून दूर मध्यभागी ${holes} छिद्र पाडले, तर कागद पूर्ण उघडल्यावर एकूण किती छिद्रे दिसतील?`,
        hiQ: `एक वर्गाकार कागज़ को लगातार ${folds} बार आधा मोड़ा जाता है और मोड़ों से दूर ${holes} छेद किए जाते हैं। पूरा खोलने पर कागज़ पर कुल कितने छेद दिखेंगे?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${folds} halving folds create 2^${folds} = ${Math.pow(2, folds)} layers. Total holes = ${holes} × ${Math.pow(2, folds)} = ${ans}.`,
        mrExp: `${folds} घड्यांमुळे कागदाचे ${Math.pow(2, folds)} थर होतात. एकूण छिद्रे = ${holes} × ${Math.pow(2, folds)} = ${ans}.`,
        hiExp: `${folds} तह लगाने से ${Math.pow(2, folds)} परतें बनती हैं। कुल छेद = ${holes} × ${Math.pow(2, folds)} = ${ans}।`,
      };
    }
    case 47: {
      // Digit-to-Symbol Cipher Lookup Table
      const symMap = ['@', '#', '$', '%', '&', '*', '+', '?', '!', '='];
      const startDig = 1 + ((t - 1) % 5); // 1..5
      const d1 = startDig;
      const d2 = (startDig + 2) % 10;
      const d3 = (startDig + 4) % 10;
      const d4 = (startDig + 6) % 10;
      const d5 = (startDig + 1 + Math.floor((t - 1) / 5)) % 10;
      const numCode = `${d1}${d2}${d3}${d4}${d5}`;
      const corr = [d1, d2, d3, d4, d5].map((d) => symMap[d]).join('');
      const w1 = [d1, d3, d2, d4, d5].map((d) => symMap[d]).join('');
      const w2 = [d1, d2, d3, d5, d4].map((d) => symMap[d]).join('');
      const w3 = [d2, d1, d3, d4, (d5 + 1) % 10].map((d) => symMap[d]).join('');
      const legend = `${d1}=${symMap[d1]}, ${d2}=${symMap[d2]}, ${d3}=${symMap[d3]}, ${d4}=${symMap[d4]}, ${d5}=${symMap[d5]}`;
      // Ensure 4 distinct strings even if digits coincide
      const candWrongs = [
        w1,
        w2,
        w3,
        corr.slice(0, 4) + symMap[(d5 + 3) % 10],
        symMap[(d1 + 2) % 10] + corr.slice(1),
        corr.split('').reverse().join(''),
      ].filter((x, i, a) => x !== corr && a.indexOf(x) === i);
      const opts = placeStringOptions(corr, [candWrongs[0], candWrongs[1], candWrongs[2]], correctIdx);
      return {
        topic: 'Symbol Cipher Table',
        enQ: `Using the digit-symbol key (${legend}), how is the 5-digit number "${numCode}" encoded?`,
        mrQ: `(${legend}) या अंक-चिन्ह सारणीच्या आधारे "${numCode}" ही पाच अंकी संख्या कशी लिहाल?`,
        hiQ: `अंक-चिह्न कुंजी (${legend}) के अनुसार 5-अंकीय संख्या "${numCode}" का कूट रूप क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Replacing each digit in "${numCode}" sequentially via the key yields "${corr}".`,
        mrExp: `प्रत्येक अंकासाठी दिलेले चिन्ह ठेवल्यास "${corr}" मिळते.`,
        hiExp: `प्रत्येक अंक को उसके चिह्न से बदलने पर "${corr}" प्राप्त होता है।`,
      };
    }
    case 48: {
      // Mathematical Inequalities (P > Q = R > S < T -> valid definite conclusion)
      const chainSets = [
        ['P', 'Q', 'R', 'S', 'T'], ['A', 'B', 'C', 'D', 'E'], ['K', 'L', 'M', 'N', 'O'],
        ['V', 'W', 'X', 'Y', 'Z'], ['F', 'G', 'H', 'I', 'J'],
      ];
      const [p, q, r, s, u] = chainSets[(t - 1) % 5];
      const mode = Math.floor((t - 1) / 5); // 0..4
      const relStr = `${p} > ${q} = ${r} > ${s} < ${u}`;
      const trueStmt = [
        `${p} > ${r}`, `${p} > ${s}`, `${q} > ${s}`, `${r} > ${s}`, `${u} > ${s}`,
      ][mode];
      const falseStmts: [string, string, string] = [
        `${s} > ${p}`, `${p} = ${s}`, `${r} < ${s}`,
      ];
      const opts = placeStringOptions(trueStmt, falseStmts, correctIdx);
      return {
        topic: 'Logical Inequalities',
        enQ: `[Case #${mode + 1}] Given the inequality chain: "${relStr}". Which of the following conclusions (${opts.join(', ')}) is DEFINITELY TRUE?`,
        mrQ: `[प्रकार #${mode + 1}] दिलेल्या असमानता साखळीनुसार "${relStr}" यांपैकी कोणते विधान (${opts.join(', ')}) निश्चितपणे सत्य आहे?`,
        hiQ: `[प्रकार #${mode + 1}] दी गई असमानता श्रृंखला "${relStr}" से निम्नलिखित में से कौन-सा निष्कर्ष (${opts.join(', ')}) निश्चित रूप से सत्य है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Tracing "${relStr}" directly guarantees that ${trueStmt}.`,
        mrExp: `"${relStr}" या साखळीवरून ${trueStmt} हे निश्चितपणे सत्य ठरते.`,
        hiExp: `"${relStr}" से यह निश्चित रूप से सिद्ध होता है कि ${trueStmt}।`,
      };
    }
    default: {
      // case 49: Multi-Condition Number Riddle (Between lo and hi, multiple of m, digit sum = dSum)
      // Pick ans explicitly as a 2-digit multiple of 9 or 6 with unique digit sum!
      // Multiples of 9 in 18..99 have digit sum = 9, wait all multiples of 9 have sum 9! Instead use multiples of 7 (or 8) with specific digit sum!
      const candidates: Array<{ lo: number; hi: number; mult: number; dSum: number; ans: number }> = [
        { lo: 20, hi: 50, mult: 7, dSum: 10, ans: 28 },
        { lo: 30, hi: 65, mult: 8, dSum: 12, ans: 48 },
        { lo: 15, hi: 45, mult: 7, dSum: 8, ans: 35 },
        { lo: 40, hi: 80, mult: 12, dSum: 12, ans: 48 },
        { lo: 25, hi: 60, mult: 8, dSum: 10, ans: 55 - 1 }, // fix below!
      ];
      void candidates;
      // Compute 25 unique triples directly from a verified list of exact 2-digit numbers!
      const verifiedRiddles: Array<{ lo: number; hi: number; mult: number; dSum: number; ans: number }> = [
        { lo: 20, hi: 40, mult: 7, dSum: 10, ans: 28 }, // multiples of 7 in (20,40): 21(3), 28(10), 35(8) -> unique 28!
        { lo: 30, hi: 55, mult: 8, dSum: 12, ans: 48 }, // 32(5), 40(4), 48(12) -> unique 48!
        { lo: 25, hi: 50, mult: 7, dSum: 8, ans: 35 },  // 28(10), 35(8), 42(6), 49(13) -> unique 35!
        { lo: 40, hi: 75, mult: 11, dSum: 10, ans: 55 }, // 44(8), 55(10), 66(12) -> unique 55!
        { lo: 50, hi: 85, mult: 12, dSum: 6, ans: 60 },  // 60(6), 72(9), 84(12) -> unique 60!
        { lo: 45, hi: 80, mult: 13, dSum: 11, ans: 65 }, // 52(7), 65(11), 78(15) -> unique 65!
        { lo: 35, hi: 70, mult: 14, dSum: 11, ans: 56 }, // 42(6), 56(11) -> unique 56!
        { lo: 55, hi: 95, mult: 15, dSum: 12, ans: 75 }, // 60(6), 75(12), 90(9) -> unique 75!
        { lo: 40, hi: 75, mult: 16, dSum: 10, ans: 64 }, // 48(12), 64(10) -> unique 64!
        { lo: 20, hi: 60, mult: 17, dSum: 7, ans: 34 },  // 34(7), 51(6) -> unique 34!
        { lo: 30, hi: 70, mult: 17, dSum: 6, ans: 51 },  // 34(7), 51(6), 68(14) -> unique 51!
        { lo: 50, hi: 95, mult: 17, dSum: 13, ans: 85 }, // 51(6), 68(14), 85(13) -> unique 85!
        { lo: 60, hi: 95, mult: 19, dSum: 13, ans: 76 }, // 76(13) -> unique 76!
        { lo: 30, hi: 60, mult: 13, dSum: 12, ans: 39 }, // 39(12), 52(7) -> unique 39!
        { lo: 60, hi: 95, mult: 13, dSum: 15, ans: 78 }, // 65(11), 78(15), 91(10) -> unique 78!
        { lo: 75, hi: 99, mult: 12, dSum: 12, ans: 84 }, // 84(12), 96(15) -> unique 84!
        { lo: 20, hi: 50, mult: 16, dSum: 5, ans: 32 },  // 32(5), 48(12) -> unique 32!
        { lo: 15, hi: 45, mult: 19, dSum: 11, ans: 38 }, // 19(10), 38(11) -> unique 38!
        { lo: 70, hi: 99, mult: 14, dSum: 12, ans: 84 }, // wait 84 repeats? Use 98(17)! 70(7), 84(12), 98(17) -> ans: 98, dSum: 17!
        { lo: 40, hi: 75, mult: 19, dSum: 12, ans: 57 }, // 57(12) -> unique 57!
        { lo: 50, hi: 90, mult: 21, dSum: 9, ans: 63 },  // 63(9), 84(12) -> unique 63!
        { lo: 60, hi: 99, mult: 23, dSum: 15, ans: 69 }, // 69(15), 92(11) -> unique 69!
        { lo: 50, hi: 99, mult: 24, dSum: 15, ans: 96 }, // 72(9), 96(15) -> unique 96!
        { lo: 35, hi: 80, mult: 24, dSum: 12, ans: 48 }, // wait use 48 only once! Pick mult: 23, lo: 30, hi: 75, dSum: 10, ans: 46! (46->10, 69->15)
        { lo: 65, hi: 99, mult: 29, dSum: 15, ans: 87 }, // 87(15) -> unique 87!
      ];
      verifiedRiddles[18] = { lo: 72, hi: 99, mult: 14, dSum: 17, ans: 98 };
      verifiedRiddles[23] = { lo: 30, hi: 75, mult: 23, dSum: 10, ans: 46 };
      const rid = verifiedRiddles[t - 1];
      const opts = makeNumericOptions(rid.ans, [rid.mult, -rid.mult, 6], correctIdx);
      return {
        topic: 'Multi-Condition Number Riddle',
        enQ: `Find the unique 2-digit number strictly between ${rid.lo} and ${rid.hi} that is a multiple of ${rid.mult} and has a digit sum of ${rid.dSum}.`,
        mrQ: `${rid.lo} ते ${rid.hi} दरम्यानची अशी एकमेव दोन अंकी संख्या ओळखा की जी ${rid.mult} च्या पटीत असून तिच्या अंकांची बेरीज ${rid.dSum} आहे.`,
        hiQ: `${rid.lo} और ${rid.hi} के बीच की वह एकमात्र 2-अंकीय संख्या ज्ञात कीजिए जो ${rid.mult} का गुणज है और जिसके अंकों का योग ${rid.dSum} है।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Multiples of ${rid.mult} between ${rid.lo} and ${rid.hi}: only ${rid.ans} has digits summing to ${rid.dSum}.`,
        mrExp: `${rid.mult} च्या पटीतील ${rid.ans} या संख्येच्या अंकांची बेरीज ${rid.dSum} येते.`,
        hiExp: `${rid.mult} का गुणज ${rid.ans} है जिसके अंकों का योग ${rid.dSum} है।`,
      };
    }
  }
}
