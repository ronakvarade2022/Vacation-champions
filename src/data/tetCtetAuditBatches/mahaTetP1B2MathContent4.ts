import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 4 (29 unique Classes 1-5 Qs)
export const MAHA_TET_P1_B2_MATH_C4: CuratedTrilingualMcq[] = [
  {
    topic: '2D Area Right Triangle Height Finding',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'The area of a triangular flowerbed is `96 sq m` and its base measures `16 m`. What is its perpendicular height?',
      opts: ['12 m', '6 m', '24 m', '8 m'],
      exp: 'Area = `(1/2) × base × height` → `96 = 8 × height` → `height = 12 m`.',
    },
    mr: {
      q: 'एका त्रिकोणी फुलांच्या वाफ्याचे क्षेत्रफळ `96 चौ.मी` असून पाया `16 मी` आहे, तर त्याची उंची किती मीटर असेल?',
      opts: ['12 मी', '6 मी', '24 मी', '8 मी'],
      exp: 'क्षेत्रफळ `= (1/2) × पाया × उंची` ⇒ `96 = 8 × उंची` ⇒ `उंची = 12 मी`.',
    },
    hi: {
      q: 'एक त्रिभुजाकार फूलों की क्यारी का क्षेत्रफल `96 वर्ग मी` और आधार `16 मी` है। इसकी लंबवत ऊँचाई कितनी है?',
      opts: ['12 मी', '6 मी', '24 मी', '8 मी'],
      exp: '`96 = (1/2) × 16 × ऊँचाई` ⇒ `ऊँचाई = 12 मी`।',
    },
  },
  {
    topic: 'Number System Rounding to Nearest Thousand Difference',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the difference between `46,782` rounded to the nearest `1,000` and rounded to the nearest `100`?',
      opts: ['200', '100', '300', '1,000'],
      exp: 'Nearest `1,000` = `47,000`; nearest `100` = `46,800`. Difference = `47,000 − 46,800 = 200`.',
    },
    mr: {
      q: '`46,782` या संख्येचे नजीकच्या हजारात अंदाजित मूल्य आणि नजीकच्या शतकात अंदाजित मूल्य यांतील फरक किती?',
      opts: ['200', '100', '300', '1,000'],
      exp: 'हजारांत = `47,000`; शतकांत = `46,800`. फरक = `47,000 − 46,800 = 200`.',
    },
    hi: {
      q: '`46,782` का निकटतम हज़ार सन्निकट मान तथा निकटतम सैकड़ा सन्निकट मान में कितना अंतर है?',
      opts: ['200', '100', '300', '1,000'],
      exp: '`47,000 − 46,800 = 200`।',
    },
  },
  {
    topic: 'Fractions Equivalent Unknown Denominator Proportion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'If `7 / 12 = x / 84`, what is the value of `x + 9`?',
      opts: ['58', '49', '56', '63'],
      exp: '`x = 7 × (84 ÷ 12) = 7 × 7 = 49`. Therefore `x + 9 = 49 + 9 = 58`.',
    },
    mr: {
      q: 'जर `7 / 12 = x / 84` असेल, तर `x + 9` ची किंमत किती?',
      opts: ['58', '49', '56', '63'],
      exp: '`84 = 12 × 7` म्हणून `x = 7 × 7 = 49`. `49 + 9 = 58`.',
    },
    hi: {
      q: 'यदि `7 / 12 = x / 84` है, तो `x + 9` का मान क्या होगा?',
      opts: ['58', '49', '56', '63'],
      exp: '`x = 7 × 7 = 49` ⇒ `49 + 9 = 58`।',
    },
  },
  {
    topic: 'Measurement Fence Posts Around Closed Square Plot',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Wooden poles are planted `4 m` apart all around the boundary of a square garden of side `20 m`, with poles placed at every corner. How many poles are needed altogether?',
      opts: ['20 poles', '24 poles', '16 poles', '21 poles'],
      exp: 'Closed loop perimeter = `4 × 20 = 80 m`. Along a closed loop, number of poles equals number of `4 m` intervals: `80 ÷ 4 = 20` poles.',
    },
    mr: {
      q: '`20 मी` बाजू असलेल्या चौरसाकृती बागेच्या सर्व कडांवर (कोपऱ्यांसह) प्रत्येक `4 मी` अंतरावर लाकडी खांब रोवले, तर एकूण किती खांब लागतील?',
      opts: ['20 खांब', '24 खांब', '16 खांब', '21 खांब'],
      exp: 'बंद आकृतीची परिमिती `= 4 × 20 = 80 मी`. बंद वर्तुळावर खांब संख्या `= 80 ÷ 4 = 20` खांब.',
    },
    hi: {
      q: '`20 मी` भुजा वाले वर्गाकार बगीचे के चारों किनारों पर (कोनों सहित) `4 मी` की दूरी पर खंभे गाड़े गए। कुल कितने खंभे लगेंगे?',
      opts: ['20 खंभे', '24 खंभे', '16 खंभे', '21 खंभे'],
      exp: 'बंद परिमाप `80 मी ÷ 4 मी = 20` खंभे।',
    },
  },
  {
    topic: 'Decimal Conversion Mixed Metre-Centimetre Addition',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A weaver joins three cloth strips measuring `2 m 65 cm`, `1 m 8 cm`, and `3 m 40 cm`. What is the total length in meters?',
      opts: ['7.13 m', '7.85 m', '6.93 m', '7.23 m'],
      exp: '`2.65 + 1.08 + 3.40 = 7.13 m` (`8 cm = 0.08 m`, not `0.8 m`).',
    },
    mr: {
      q: 'एका विणकराने `2 मी 65 सेमी`, `1 मी 8 सेमी` आणि `3 मी 40 सेमी` लांबीचे तीन कापडाचे तुकडे जोडले, तर एकूण लांबी किती मीटर होईल?',
      opts: ['7.13 मी', '7.85 मी', '6.93 मी', '7.23 मी'],
      exp: '`2.65 + 1.08 + 3.40 = 7.13 मी` (`8 सेमी = 0.08 मी`).',
    },
    hi: {
      q: '`2 मी 65 सेमी`, `1 मी 8 सेमी` और `3 मी 40 सेमी` कपड़ों को जोड़ने पर कुल लंबाई कितने मीटर होगी?',
      opts: ['7.13 मी', '7.85 मी', '6.93 मी', '7.23 मी'],
      exp: '`2.65 + 1.08 + 3.40 = 7.13 मी`।',
    },
  },
  {
    topic: 'Multi-Step Candy / Marble Redistribution',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Kavita has `48` marbles and Dev has `22` marbles. How many marbles must Kavita give Dev so that both hold exactly equal marbles?',
      opts: ['13 marbles', '26 marbles', '15 marbles', '11 marbles'],
      exp: 'Combined total = `48 + 22 = 70`; equal share = `35` each. Kavita gives `48 − 35 = 13` marbles.',
    },
    mr: {
      q: 'कविताकडे `48` गोट्या आहेत आणि देवकडे `22` गोट्या आहेत. दोघांकडे समान गोट्या होण्यासाठी कविताने देवला किती गोट्या द्याव्यात?',
      opts: ['13 गोट्या', '26 गोट्या', '15 गोट्या', '11 गोट्या'],
      exp: 'एकूण `= 70`; प्रत्येकी समान वाटा `= 35`. म्हणून `48 − 35 = 13` गोट्या द्याव्यात.',
    },
    hi: {
      q: 'कविता के पास `48` और देव के पास `22` कंचे हैं। दोनों के पास बराबर कंचे होने के लिए कविता को देव को कितने कंचे देने होंगे?',
      opts: ['13 कंचे', '26 कंचे', '15 कंचे', '11 कंचे'],
      exp: 'कुल `70 ÷ 2 = 35`; अतः `48 − 35 = 13` कंचे।',
    },
  },
  {
    topic: 'Percentage Fraction Equivalence Budget Allocation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Out of a monthly household income of `₹18,000`, a family spends `35%` on groceries, `25%` on rent, and `20%` on school fees, saving the rest. How many rupees does the family save monthly?',
      opts: ['₹3,600', '₹4,500', '₹3,200', '₹2,700'],
      exp: 'Total spent = `35% + 25% + 20% = 80%`. Saved = `20%` of `18,000` = `₹3,600`.',
    },
    mr: {
      q: '`₹18,000` मासिक उत्पन्नापैकी एक कुटुंब `35%` किराणा, `25%` घरभाडे व `20%` शिक्षणावर खर्च करून उरलेली रक्कम बचत करते, तर मासिक बचत किती रुपये?',
      opts: ['₹3,600', '₹4,500', '₹3,200', '₹2,700'],
      exp: 'एकूण खर्च `= 80%`. बचत `= 20%` म्हणजे `18,000 × 20/100 = ₹3,600`.',
    },
    hi: {
      q: '`₹18,000` मासिक आय में से एक परिवार `35%` राशन, `25%` किराये व `20%` शिक्षा पर खर्च कर शेष बचाता है। मासिक बचत कितनी है?',
      opts: ['₹3,600', '₹4,500', '₹3,200', '₹2,700'],
      exp: 'बचत = `20%` अर्थात `18,000 × 0.20 = ₹3,600`।',
    },
  },
  {
    topic: '2D Geometry Regular Hexagon Symmetry Lines',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many total lines of symmetry does a regular hexagon (`6` equal sides and `6` equal angles, like a honeybee cell) possess?',
      opts: ['6 lines', '3 lines', '12 lines', '4 lines'],
      exp: 'A regular `n`-sided polygon always has exactly `n` lines of symmetry: `6` for a regular hexagon (`3` through opposite vertices + `3` through midpoints of opposite sides).',
    },
    mr: {
      q: 'मधाच्या पोळ्याच्या कोनासारख्या नियमित षटकोनाला (`6` समान बाजू व कोन) एकूण किती सममिती रेषा असतात?',
      opts: ['6 रेषा', '3 रेषा', '12 रेषा', '4 रेषा'],
      exp: 'कोणत्याही नियमित `n`-भुज बहुभुजाकृतीला `n` सममिती रेषा असतात: नियमित षटकोनास `6` सममिती रेषा असतात.',
    },
    hi: {
      q: 'मधुमक्खी के छत्ते जैसे एक सम षट्भुज (`6` बराबर भुजाएँ) में कुल कितनी सममिति रेखाएँ होती हैं?',
      opts: ['6 रेखाएँ', '3 रेखाएँ', '12 रेखाएँ', '4 रेखाएँ'],
      exp: 'सम षट्भुज में सदैव `6` सममिति रेखाएँ होती हैं।',
    },
  },
  {
    topic: 'Time Conversion Hours Minutes Seconds Addition',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Two short nature films run for `18 min 45 sec` and `24 min 35 sec`. What is their combined running duration?',
      opts: ['43 min 20 sec', '42 min 80 sec', '42 min 20 sec', '43 min 10 sec'],
      exp: '`45 + 35 = 80 sec = 1 min 20 sec`. Minutes = `18 + 24 + 1 = 43 min`. Combined = `43 min 20 sec`.',
    },
    mr: {
      q: 'दोन लघुपटांचा कालावधी अनुक्रमे `18 मि 45 से` व `24 मि 35 से` आहे, तर दोन्हींचा मिळून एकूण कालावधी किती?',
      opts: ['43 मि 20 से', '42 मि 80 से', '42 मि 20 से', '43 मि 10 से'],
      exp: '`45 + 35 = 80 सेकंद = 1 मि 20 से`. मिनिटे `= 18 + 24 + 1 = 43 मि`. एकूण `= 43 मि 20 से`.',
    },
    hi: {
      q: 'दो लघु फिल्मों की अवधि `18 मि 45 से` और `24 मि 35 से` है। कुल अवधि कितनी होगी?',
      opts: ['43 मि 20 से', '42 मि 80 से', '42 मि 20 से', '43 मि 10 से'],
      exp: '`80 सेकंड = 1 मि 20 से`; कुल = `43 मि 20 से`।',
    },
  },
  {
    topic: 'Number Divisibility Rule for 6',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following numbers is completely divisible by `6`?',
      opts: ['43,518', '43,515', '43,522', '43,514'],
      exp: 'Divisible by `6` requires divisible by BOTH `2` (even unit digit) AND `3` (digit sum divisible by 3). `43,518` is even (`8`) and `4+3+5+1+8 = 21` (divisible by `3`).',
    },
    mr: {
      q: 'खालीलपैकी कोणती संख्या `6` ने नि:शेष भाग जाते?',
      opts: ['43,518', '43,515', '43,522', '43,514'],
      exp: '`6` ने भाग जाण्यासाठी ती सम असावी व अंकांची बेरीज `3` च्या पटीत असावी: `43,518` सम आहे आणि बेरीज `21` आहे.',
    },
    hi: {
      q: 'निम्न में से कौन-सी संख्या `6` से पूर्णतः विभाज्य है?',
      opts: ['43,518', '43,515', '43,522', '43,514'],
      exp: '`43,518` सम है और अंकों का योग `21` (`3` से विभाज्य) है।',
    },
  },
  {
    topic: 'Pattern Sequence Square & Cube Hybrid',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Identify the missing term in the pattern: `1, 8, 27, 64, ___ , 216`',
      opts: ['125', '100', '144', '81'],
      exp: 'These are consecutive perfect cubes: `1³, 2³, 3³, 4³, 5³ = 125, 6³`.',
    },
    mr: {
      q: 'संख्यामालिकेतील गाळलेले पद ओळखा: `1, 8, 27, 64, ___ , 216`',
      opts: ['125', '100', '144', '81'],
      exp: 'ही क्रमवार घन संख्यांची मालिका आहे (`1³, 2³, 3³, 4³, 5³ = 125, 6³`).',
    },
    hi: {
      q: 'पैटर्न में लुप्त पद ज्ञात कीजिए: `1, 8, 27, 64, ___ , 216`',
      opts: ['125', '100', '144', '81'],
      exp: 'क्रमशः घन संख्याएँ हैं; `5³ = 125`।',
    },
  },
  {
    topic: 'Unit Rate Grocery Price Per Kilogram Comparison',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Shop A sells `400 g` of cashews for `₹320`, while Shop B sells `250 g` of the same grade for `₹195`. Which shop offers a lower price per kilogram, and by how much?',
      opts: [
        'Shop B is cheaper by ₹20 per kg',
        'Shop A is cheaper by ₹20 per kg',
        'Shop B is cheaper by ₹15 per kg',
        'Both charge identical per-kg rates',
      ],
      exp: 'Shop A per kg = `320 × (1,000 ÷ 400) = ₹800`. Shop B per kg = `195 × 4 = ₹780`. Shop B is cheaper by `₹20/kg`.',
    },
    mr: {
      q: 'दुकान A मध्ये `400 ग्रॅम` काजू `₹320` ला मिळतात, तर दुकान B मध्ये `250 ग्रॅम` काजू `₹195` ला मिळतात. तर कोणत्या दुकानात प्रति किलो दर कमी आहे व कितीने?',
      opts: [
        'दुकान B मध्ये प्रति किलो ₹20 ने स्वस्त आहे',
        'दुकान A मध्ये प्रति किलो ₹20 ने स्वस्त आहे',
        'दुकान B मध्ये प्रति किलो ₹15 ने स्वस्त आहे',
        'दोन्ही दुकानांचा दर सारखाच आहे',
      ],
      exp: 'दुकान A = `₹800/किग्रॅ`; दुकान B = `195 × 4 = ₹780/किग्रॅ`. B `₹20` ने स्वस्त आहे.',
    },
    hi: {
      q: 'दुकान A `400 ग्राम` काजू `₹320` में और दुकान B `250 ग्राम` `₹195` में बेचती है। किस दुकान में प्रति किग्रा दर सस्ती है और कितनी?',
      opts: [
        'दुकान B प्रति किग्रा ₹20 सस्ती है',
        'दुकान A प्रति किग्रा ₹20 सस्ती है',
        'दुकान B प्रति किग्रा ₹15 सस्ती है',
        'दोनों का दर समान है',
      ],
      exp: 'दुकान A `₹800/किग्रा`, दुकान B `₹780/किग्रा` ⇒ B `₹20` सस्ती है।',
    },
  },
  {
    topic: '2D Shape Circle Radius Circumference Ratio Awareness',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Using `π ≈ 22/7`, what is the circumference of a circular wooden bullock-cart wheel of diameter `70 cm`?',
      opts: ['220 cm', '110 cm', '440 cm', '154 cm'],
      exp: 'Circumference = `π × d = (22/7) × 70 = 220 cm`.',
    },
    mr: {
      q: '`π ≈ 22/7` घेऊन `70 सेमी` व्यास असलेल्या बैलगाडीच्या चाकाचा परीघ किती सेमी असेल?',
      opts: ['220 सेमी', '110 सेमी', '440 सेमी', '154 सेमी'],
      exp: 'परीघ = `π × व्यास = (22/7) × 70 = 220 सेमी`.',
    },
    hi: {
      q: '`π = 22/7` मानकर `70 सेमी` व्यास वाले गोल पहिये की परिधि कितनी होगी?',
      opts: ['220 सेमी', '110 सेमी', '440 सेमी', '154 सेमी'],
      exp: 'परिधि = `(22/7) × 70 = 220 सेमी`।',
    },
  },
  {
    topic: 'Fractions Remaining Chocolates After Two Gifts',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Neha had `48` laddoos. She gave `1/4` of them to neighbours and `1/3` of the *remaining* laddoos to her classmates. How many laddoos were still left with her?',
      opts: ['24 laddoos', '20 laddoos', '18 laddoos', '28 laddoos'],
      exp: 'Neighbours = `1/4 × 48 = 12`; remaining = `36`. Classmates = `1/3 × 36 = 12`. Final left = `36 − 12 = 24`.',
    },
    mr: {
      q: 'नेहाकडे `48` लाडू होते. त्यांपैकी `1/4` भाग तिने शेजाऱ्यांना दिले आणि *उरलेल्यांपैकी* `1/3` भाग वर्गमित्रांना वाटले, तर तिच्याकडे किती लाडू शिल्लक राहिले?',
      opts: ['24 लाडू', '20 लाडू', '18 लाडू', '28 लाडू'],
      exp: 'शेजाऱ्यांना `= 12`; उरलेले `= 36`. मित्रांना `= 1/3 × 36 = 12`. शेवटी शिल्लक `= 36 − 12 = 24` लाडू.',
    },
    hi: {
      q: 'नेहा के पास `48` लड्डू थे। उसने `1/4` पड़ोसियों को तथा *बचे हुए* में से `1/3` सहपाठियों को दिए। उसके पास कितने लड्डू बचे?',
      opts: ['24 लड्डू', '20 लड्डू', '18 लड्डू', '28 लड्डू'],
      exp: '`48 − 12 = 36`; पुनः `36 − 12 = 24` लड्डू।',
    },
  },
  {
    topic: 'Multiples & HCF Relationship Product Formula',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'The HCF and LCM of two whole numbers are `9` and `135` respectively. If one of the numbers is `45`, what is the other number?',
      opts: ['27', '18', '36', '54'],
      exp: '`First × Second = HCF × LCM` → `Second = (9 × 135) ÷ 45 = 9 × 3 = 27`.',
    },
    mr: {
      q: 'दोन संख्यांचा मसावि `9` आणि लसावि `135` आहे. त्यांपैकी एक संख्या `45` असेल, तर दुसरी संख्या कोणती?',
      opts: ['27', '18', '36', '54'],
      exp: 'दुसरी संख्या `= (मसावि × लसावि) ÷ पहिली = (9 × 135) ÷ 45 = 27`.',
    },
    hi: {
      q: 'दो संख्याओं का म.स. `9` तथा ल.स. `135` है। यदि एक संख्या `45` है, तो दूसरी संख्या क्या होगी?',
      opts: ['27', '18', '36', '54'],
      exp: '`(9 × 135) ÷ 45 = 27`।',
    },
  },
  {
    topic: 'Pie / Circle Chart Fraction Interpretation',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Out of `120` Class 5 students voting for their favorite fruit in a circle chart, `1/2` chose Mango, `1/4` chose Guava, `1/6` chose Banana, and the rest chose Chikoo. How many students voted for Chikoo?',
      opts: ['10 students', '15 students', '20 students', '12 students'],
      exp: 'Mango = `60`, Guava = `30`, Banana = `20`. Remainder = `120 − (60 + 30 + 20) = 10` students.',
    },
    mr: {
      q: '`120` विद्यार्थ्यांपैकी `1/2` जणांनी आंबा, `1/4` पेरू, `1/6` केळी आणि उरलेल्यांनी चिकू फळ निवडले, तर किती विद्यार्थ्यांनी चिकू निवडला?',
      opts: ['10 विद्यार्थी', '15 विद्यार्थी', '20 विद्यार्थी', '12 विद्यार्थी'],
      exp: 'आंबा `60` + पेरू `30` + केळी `20` = `110`. उरलेले `120 − 110 = 10` विद्यार्थी.',
    },
    hi: {
      q: '`120` छात्रों में से `1/2` ने आम, `1/4` ने अमरूद, `1/6` ने केला और शेष ने चीकू चुना। कितने छात्रों ने चीकू चुना?',
      opts: ['10 छात्र', '15 छात्र', '20 छात्र', '12 छात्र'],
      exp: '`120 − (60 + 30 + 20) = 10` छात्र।',
    },
  },
  {
    topic: '2D Parallelogram Perimeter Reverse Missing Side',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'The perimeter of a parallelogram tile is `54 cm` and its longer side measures `17 cm`. What is the length of its shorter adjacent side?',
      opts: ['10 cm', '13.5 cm', '20 cm', '8.5 cm'],
      exp: '`2 × (17 + b) = 54` → `17 + b = 27` → `b = 10 cm`.',
    },
    mr: {
      q: 'एका समांतरभुज चौकोनाकृती फरशीची परिमिती `54 सेमी` असून तिची मोठी बाजू `17 सेमी` आहे, तर लगतची लहान बाजू किती सेमी लांबीची असेल?',
      opts: ['10 सेमी', '13.5 सेमी', '20 सेमी', '8.5 सेमी'],
      exp: '`2 × (17 + b) = 54` ⇒ `17 + b = 27` ⇒ `b = 10 सेमी`.',
    },
    hi: {
      q: 'एक समांतर चतुर्भुज का परिमाप `54 सेमी` और बड़ी भुजा `17 सेमी` है। छोटी आसन्न भुजा की लंबाई कितनी है?',
      opts: ['10 सेमी', '13.5 सेमी', '20 सेमी', '8.5 सेमी'],
      exp: '`27 − 17 = 10 सेमी`।',
    },
  },
  {
    topic: 'Word Problem Staircase Steps & Height Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A stone fort staircase has `24` equal steps, each rising `17.5 cm` high. What is the total vertical climb in meters?',
      opts: ['4.2 m', '4.8 m', '3.9 m', '4.5 m'],
      exp: 'Height = `24 × 17.5 = 420 cm = 4.2 m`.',
    },
    mr: {
      q: 'एका किल्ल्याच्या पायऱ्यांची संख्या `24` असून प्रत्येक पायरीची उंची `17.5 सेमी` आहे, तर एकूण उभ्या चढणाची उंची किती मीटर होईल?',
      opts: ['4.2 मी', '4.8 मी', '3.9 मी', '4.5 मी'],
      exp: 'उंची = `24 × 17.5 = 420 सेमी = 4.2 मी`.',
    },
    hi: {
      q: 'एक किले की सीढ़ी में `24` समान सीढ़ियाँ हैं जिनमें प्रत्येक `17.5 सेमी` ऊँची है। कुल ऊँचाई कितने मीटर है?',
      opts: ['4.2 मी', '4.8 मी', '3.9 मी', '4.5 मी'],
      exp: '`24 × 17.5 = 420 सेमी = 4.2 मी`।',
    },
  },
  {
    topic: 'Multiplication Check Without Full Expansion Unit Digit',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What will be the ONES (units) digit of the product `247 × 389 × 513`?',
      opts: ['9', '3', '7', '1'],
      exp: 'Multiply units digits only: `7 × 9 = 63` (ends in `3`), then `3 × 3 = 9`. Units digit is `9`.',
    },
    mr: {
      q: '`247 × 389 × 513` या गुणाकाराच्या एकक स्थानी कोणता अंक येईल?',
      opts: ['9', '3', '7', '1'],
      exp: 'एकक स्थानच्या अंकांचा गुणाकार: `7 × 9 = 63` (एकक `3`) व `3 × 3 = 9`.',
    },
    hi: {
      q: '`247 × 389 × 513` के गुणनफल का इकाई अंक क्या होगा?',
      opts: ['9', '3', '7', '1'],
      exp: 'इकाई अंक: `7 × 9 = 63` (3), फिर `3 × 3 = 9`।',
    },
  },
  {
    topic: 'Fractions Subtraction Mixed Numbers Cloth Roll',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'From a cloth bolt holding `12 whole 1/4 m`, a tailor cuts `4 whole 3/4 m` for uniforms and `3 whole 1/2 m` for curtains. How many meters remain on the bolt?',
      opts: ['4 m', '4 whole 1/2 m', '3 whole 3/4 m', '5 m'],
      exp: 'Cut = `4.75 + 3.50 = 8.25 m`. Remaining = `12.25 − 8.25 = 4 m`.',
    },
    mr: {
      q: '`12¼ मी` कापडाच्या ताग्यातून गणवेशासाठी `4¾ मी` व पडद्यांसाठी `3½ मी` कापड कापले, तर किती मीटर कापड उरले?',
      opts: ['4 मी', '4½ मी', '3¾ मी', '5 मी'],
      exp: 'कापलेले कापड `= 4.75 + 3.50 = 8.25 मी`. शिल्लक `= 12.25 − 8.25 = 4 मी`.',
    },
    hi: {
      q: '`12¼ मी` कपड़े के थान में से `4¾ मी` और `3½ मी` काटा गया। कितना कपड़ा शेष बचा?',
      opts: ['4 मी', '4½ मी', '3¾ मी', '5 मी'],
      exp: '`12.25 − (4.75 + 3.50) = 12.25 − 8.25 = 4 मी`।',
    },
  },
  {
    topic: 'Decimal Ascending Comparison Careful Place Check',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which decimal number among the four choices below is the SMALLEST?',
      opts: ['0.089', '0.19', '0.095', '0.8'],
      exp: 'Pad to three decimal places: `0.089`, `0.190`, `0.095`, `0.800`. Clearly `0.089` is smallest.',
    },
    mr: {
      q: 'खालीलपैकी सर्वात लहान दशांश संख्या कोणती?',
      opts: ['0.089', '0.19', '0.095', '0.8'],
      exp: 'समान तीन दशांश स्थळे केल्यास `0.089, 0.190, 0.095, 0.800` पैकी `0.089` सर्वात लहान ठरते.',
    },
    hi: {
      q: 'इनमें से कौन-सी दशमलव संख्या सबसे छोटी है?',
      opts: ['0.089', '0.19', '0.095', '0.8'],
      exp: '`0.089 < 0.095 < 0.190 < 0.800`।',
    },
  },
  {
    topic: 'Speed Train Late / Early Minute Difference',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil walks `1.8 km` to school every morning at `3 km/hour`. If school prayer starts at `7:30 a.m.`, what is the LATEST time she can leave home to arrive `5` minutes early?',
      opts: ['6:49 a.m.', '6:54 a.m.', '6:45 a.m.', '6:59 a.m.'],
      exp: 'Walking time = `(1.8 ÷ 3) × 60 = 36 minutes`. Desired arrival = `7:25 a.m.`. Departure = `7:25 − 36 min = 6:49 a.m.`.',
    },
    mr: {
      q: 'एक विद्यार्थिनी घरून `1.8 किमी` अंतरावरील शाळेत `3 किमी/तास` वेगाने चालत जाते. परिपाठ `7:30` वाजता सुरू होण्यापूर्वी `5 मिनिटे` आधी पोहोचण्यासाठी तिने घरातून जास्तीत जास्त किती वाजता निघावे?',
      opts: ['सकाळी 6:49 वाजता', 'सकाळी 6:54 वाजता', 'सकाळी 6:45 वाजता', 'सकाळी 6:59 वाजता'],
      exp: 'चालायचा वेळ = `(1.8 ÷ 3) × 60 = 36 मिनिटे`. पोहोचण्याची वेळ `7:25` − `36 मि` = `6:49` वाजता.',
    },
    hi: {
      q: 'एक छात्रा `1.8 किमी` दूर स्कूल `3 किमी/घंटा` की चाल से जाती है। सुबह `7:30` की प्रार्थना से `5 मिनट` पहले पहुँचने के लिए उसे घर से कब निकलना चाहिए?',
      opts: ['सुबह 6:49 बजे', 'सुबह 6:54 बजे', 'सुबह 6:45 बजे', 'सुबह 6:59 बजे'],
      exp: 'यात्रा समय = `36 मिनट`; `7:25 − 36 मिनट = 6:49 बजे`।',
    },
  },
  {
    topic: 'Divisibility by 4 & 5 Combined Ending Check',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'For a multi-digit number to be divisible by BOTH `4` and `5` (`20`), what MUST its last two digits end in?',
      opts: ['00, 20, 40, 60, or 80', '05, 15, 25, or 35', '10, 30, 50, or 70', 'Any single digit 0'],
      exp: 'Divisible by `20` implies ending in `0` AND the tens digit must be even: `00, 20, 40, 60, 80`.',
    },
    mr: {
      q: 'कोणत्याही बहु-अंकी संख्येला `4` आणि `5` दोन्हीने नि:शेष भाग जाण्यासाठी तिचे शेवटचे दोन अंक कोणते असावेत?',
      opts: ['00, 20, 40, 60 किंवा 80', '05, 15, 25 किंवा 35', '10, 30, 50 किंवा 70', 'फक्त शेवटी 0'],
      exp: '`4` आणि `5` चा लसावि `20` असल्याने शेवटचे दोन अंक `20` च्या पटीत (`00, 20, 40, 60, 80`) असावेत.',
    },
    hi: {
      q: 'किसी संख्या को `4` और `5` दोनों से विभाज्य होने के लिए उसके अंतिम दो अंक क्या होने चाहिए?',
      opts: ['00, 20, 40, 60 या 80', '05, 15, 25 या 35', '10, 30, 50 या 70', 'केवल अंतिम अंक 0'],
      exp: '`ल.स.(4,5) = 20` अतः अंतिम दो अंक `00, 20, 40, 60, 80` होने चाहिए।',
    },
  },
  {
    topic: 'Perimeter Triangle Equilateral Wire Reshaped Square',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A copper wire bent into an equilateral triangle of side `16 cm` is straightened and bent again cleanly into a square. What is the area of the square formed?',
      opts: ['144 sq cm', '256 sq cm', '64 sq cm', '128 sq cm'],
      exp: 'Wire length = `3 × 16 = 48 cm`. Square side = `48 ÷ 4 = 12 cm`. Area = `12 × 12 = 144 sq cm`.',
    },
    mr: {
      q: '`16 सेमी` बाजू असलेल्या समभुज त्रिकोणाच्या आकारातील तांब्याची तार सरळ करून तिचा चौरस बनवला, तर त्या चौरसाचे क्षेत्रफळ किती?',
      opts: ['144 चौ.सेमी', '256 चौ.सेमी', '64 चौ.सेमी', '128 चौ.सेमी'],
      exp: 'तारेची लांबी `= 3 × 16 = 48 सेमी`. चौरसाची बाजू `= 48 ÷ 4 = 12 सेमी`. क्षेत्रफळ `= 12 × 12 = 144 चौ.सेमी`.',
    },
    hi: {
      q: '`16 सेमी` भुजा वाले समबाहु त्रिभुज के आकार के तार को सीधा कर वर्ग बनाया गया। उस वर्ग का क्षेत्रफल कितना होगा?',
      opts: ['144 वर्ग सेमी', '256 वर्ग सेमी', '64 वर्ग सेमी', '128 वर्ग सेमी'],
      exp: 'कुल तार = `48 सेमी`; वर्ग की भुजा = `12 सेमी`; क्षेत्रफल = `144 वर्ग सेमी`।',
    },
  },
  {
    topic: 'Coins & Notes Total Sum Check Word Problem',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school fee box holds `12` notes of `₹100`, `18` notes of `₹50`, and `25` notes of `₹20`. What is the total cash collected?',
      opts: ['₹2,600', '₹2,400', '₹2,800', '₹2,500'],
      exp: '`(12 × 100) + (18 × 50) + (25 × 20) = 1,200 + 900 + 500 = ₹2,600`.',
    },
    mr: {
      q: 'शाळेच्या निधी पेटीत `₹100` च्या `12` नोटा, `₹50` च्या `18` नोटा व `₹20` च्या `25` नोटा जमा झाल्या, तर एकूण किती रुपये जमा झाले?',
      opts: ['₹2,600', '₹2,400', '₹2,800', '₹2,500'],
      exp: '`1,200 + 900 + 500 = ₹2,600`.',
    },
    hi: {
      q: 'स्कूल कोष में `₹100` के `12`, `₹50` के `18` और `₹20` के `25` नोट हैं। कुल कितनी राशि जमा हुई?',
      opts: ['₹2,600', '₹2,400', '₹2,800', '₹2,500'],
      exp: '`1,200 + 900 + 500 = ₹2,600`।',
    },
  },
  {
    topic: 'Subtraction Missing Subtrahend Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'By how much does `5,00,000` exceed `2,47,685`?',
      opts: ['2,52,315', '2,62,315', '2,53,315', '2,52,415'],
      exp: '`5,00,000 − 2,47,685 = 2,52,315` (`2,47,685 + 2,52,315 = 5,00,000`).',
    },
    mr: {
      q: '`5,00,000` ही संख्या `2,47,685` पेक्षा कितीने मोठी आहे?',
      opts: ['2,52,315', '2,62,315', '2,53,315', '2,52,415'],
      exp: '`5,00,000 − 2,47,685 = 2,52,315`.',
    },
    hi: {
      q: '`5,00,000` संख्या `2,47,685` से कितनी अधिक है?',
      opts: ['2,52,315', '2,62,315', '2,53,315', '2,52,415'],
      exp: '`5,00,000 − 2,47,685 = 2,52,315`।',
    },
  },
  {
    topic: 'Clock Angle Hand Symmetry 9:00 vs Reflex',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the REFLEX angle between the hour and minute hands of a clock at exact `5:00`?',
      opts: ['210°', '150°', '180°', '240°'],
      exp: 'Smaller angle at `5:00` = `5 × 30° = 150°`. Reflex angle = `360° − 150° = 210°`.',
    },
    mr: {
      q: 'घड्याळात बरोबर `5:00` वाजता दोन्ही काट्यांमधील प्रविशाल कोनाचे (Reflex angle) माप किती अंश असते?',
      opts: ['210°', '150°', '180°', '240°'],
      exp: '`5:00` वाजता लहान कोन `150°`, म्हणून प्रविशाल कोन `= 360° − 150° = 210°`.',
    },
    hi: {
      q: 'ठीक `5:00` बजे घड़ी की दोनों सुइयों के बीच प्रतिवर्ती (Reflex) कोण कितना होता है?',
      opts: ['210°', '150°', '180°', '240°'],
      exp: 'न्यून कोण `150°`; प्रतिवर्ती कोण = `360° − 150° = 210°`।',
    },
  },
  {
    topic: 'Fractions Word Problem Watering Rows Remainder',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A gardener watered `24` rows out of `60` rows in the morning and `18` more rows in the afternoon. What simplest fraction of the garden still remained unwatered?',
      opts: ['3/10', '7/10', '2/5', '1/4'],
      exp: 'Unwatered rows = `60 − (24 + 18) = 18`. Fraction = `18/60 = 3/10`.',
    },
    mr: {
      q: 'एका माळ्याने `60` वाफ्यांपैकी सकाळी `24` व दुपारी `18` वाफ्यांना पाणी दिले, तर किती अपूर्णांक भाग (संक्षिप्त रूप) पाणी द्यायचा शिल्लक राहिला?',
      opts: ['3/10', '7/10', '2/5', '1/4'],
      exp: 'शिल्लक वाफे `= 60 − 42 = 18`. अपूर्णांक `= 18/60 = 3/10`.',
    },
    hi: {
      q: 'एक माली ने `60` क्यारियों में से `24` सुबह व `18` दोपहर को सींचीं। कितना सरलतम भिन्न भाग अभी सींचना शेष है?',
      opts: ['3/10', '7/10', '2/5', '1/4'],
      exp: 'शेष = `18/60 = 3/10`।',
    },
  },
  {
    topic: 'Geometry Cubes Painted Counting Zero Sides',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A `4 cm × 4 cm × 4 cm` wooden cube is painted blue on all `6` outside faces, then sliced into `64` small `1 cm` cubes. How many of those small cubes have ZERO blue painted faces (completely hidden inside)?',
      opts: ['8 cubes', '16 cubes', '24 cubes', '12 cubes'],
      exp: 'The unpainted interior core forms a `(4 − 2)³ = 2 × 2 × 2 = 8` cube block.',
    },
    mr: {
      q: '`4 सेमी` बाजूच्या घनाला सर्व बाह्य पृष्ठांवर निळा रंग देऊन त्याचे `1 सेमी` चे `64` लहान घन कापले, तर एकाही पृष्ठाला रंग नसलेले (पूर्ण आतले) लहान घन किती?',
      opts: ['8 घन', '16 घन', '24 घन', '12 घन'],
      exp: 'आतील रंगरहित गाभा `(4 − 2)³ = 2³ = 8` घनांचा असतो.',
    },
    hi: {
      q: '`4 सेमी` भुजा वाले घन को सभी बाहरी सतहों पर नीला रंगकर `1 सेमी` के `64` छोटे घनों में काटा गया। बिना रंगी सतह वाले कितने घन हैं?',
      opts: ['8 घन', '16 घन', '24 घन', '12 घन'],
      exp: 'भीतरी कोर = `(4 − 2)³ = 2³ = 8` घन।',
    },
  },
];
