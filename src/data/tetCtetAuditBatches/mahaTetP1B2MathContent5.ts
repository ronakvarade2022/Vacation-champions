import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 5 (30 unique Classes 1-5 Qs)
export const MAHA_TET_P1_B2_MATH_C5: CuratedTrilingualMcq[] = [
  {
    topic: 'Measurement Kilometre Metre Decimal Weight Split',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Convert `5 km 7 dam 4 m` completely into meters:',
      opts: ['5,074 m', '5,704 m', '5,740 m', '5,047 m'],
      exp: '`5 km = 5,000 m`, `7 dam (decametres) = 7 × 10 = 70 m`, plus `4 m` = `5,074 m`.',
    },
    mr: {
      q: '`5 किमी 7 डेकामीटर 4 मीटर` चे पूर्णपणे मीटरमध्ये रूपांतर करा:',
      opts: ['5,074 मी', '5,704 मी', '5,740 मी', '5,047 मी'],
      exp: '`5 किमी = 5,000 मी`, `7 डेकामी = 70 मी` आणि `4 मी` = `5,074 मी`.',
    },
    hi: {
      q: '`5 किमी 7 डेकामीटर 4 मीटर` को पूर्णतः मीटर में बदलिए:',
      opts: ['5,074 मी', '5,704 मी', '5,740 मी', '5,047 मी'],
      exp: '`5,000 + 70 + 4 = 5,074 मी`।',
    },
  },
  {
    topic: 'Fractions Mixed Addition School Sports Ribbon',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'What is the value of `2 whole 2/3 + 1 whole 5/6 − 1 whole 1/2` in simplest form?',
      opts: ['3', '3 whole 1/3', '2 whole 5/6', '3 whole 1/2'],
      exp: '`8/3 + 11/6 − 3/2 = (16 + 11 − 9)/6 = 18/6 = 3`.',
    },
    mr: {
      q: '`2⅔ + 1⅚ − 1½` या पदावलीचे संक्षिप्त उत्तर किती येईल?',
      opts: ['3', '3⅓', '2⅚', '3½'],
      exp: '`8/3 + 11/6 − 3/2 = (16 + 11 − 9)/6 = 18/6 = 3`.',
    },
    hi: {
      q: '`2⅔ + 1⅚ − 1½` का सरलतम मान कितना होगा?',
      opts: ['3', '3⅓', '2⅚', '3½'],
      exp: '`(16 + 11 − 9)/6 = 18/6 = 3`।',
    },
  },
  {
    topic: 'Triangle Inequality Impossible Side Trio',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which set of three bamboo stick lengths CANNOT form a closed triangle?',
      opts: [
        '5 cm, 7 cm, 13 cm',
        '6 cm, 8 cm, 11 cm',
        '9 cm, 9 cm, 15 cm',
        '4 cm, 5 cm, 8 cm',
      ],
      exp: 'The sum of any two sides must exceed the third side. Here `5 + 7 = 12 < 13`, so it cannot close into a triangle.',
    },
    mr: {
      q: 'खालीलपैकी बांबूच्या तीन काड्यांच्या कोणत्या संचापासून बंद त्रिकोण तयार होऊ *शकत नाही*?',
      opts: [
        '5 सेमी, 7 सेमी, 13 सेमी',
        '6 सेमी, 8 सेमी, 11 सेमी',
        '9 सेमी, 9 सेमी, 15 सेमी',
        '4 सेमी, 5 सेमी, 8 सेमी',
      ],
      exp: 'कोणत्याही दोन बाजूंची बेरीज तिसऱ्या बाजूहून मोठी असावी लागते; येथे `5 + 7 = 12 < 13` असल्याने त्रिकोण बनत नाही.',
    },
    hi: {
      q: 'बांस की तीन छड़ियों के किस समूह से एक त्रिभुज *नहीं* बन सकता?',
      opts: [
        '5 सेमी, 7 सेमी, 13 सेमी',
        '6 सेमी, 8 सेमी, 11 सेमी',
        '9 सेमी, 9 सेमी, 15 सेमी',
        '4 सेमी, 5 सेमी, 8 सेमी',
      ],
      exp: '`5 + 7 = 12 < 13`, अतः यह त्रिभुज नहीं बना सकता।',
    },
  },
  {
    topic: 'Number Logic Digit Count Between 100 and 200',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If you write every whole number from `100` to `199` inclusive, how many times do you write the digit `5` altogether?',
      opts: ['20 times', '19 times', '21 times', '10 times'],
      exp: 'Units place (`105, 115, ..., 195`) = `10` times; Tens place (`150..159`) = `10` times; Hundreds place (`1`) = `0`. Total = `20` times.',
    },
    mr: {
      q: '`100` ते `199` पर्यंत सर्व नैसर्गिक संख्या लिहिल्यास त्यांमध्ये `5` हा अंक एकूण किती वेळा येईल?',
      opts: ['20 वेळा', '19 वेळा', '21 वेळा', '10 वेळा'],
      exp: 'एकक स्थानी `10` वेळा (`105..195`) आणि दशक स्थानी `10` वेळा (`150..159`). एकूण `= 20` वेळा.',
    },
    hi: {
      q: '`100` से `199` तक सभी संख्याएँ लिखने पर अंक `5` कुल कितनी बार लिखा जाएगा?',
      opts: ['20 बार', '19 बार', '21 बार', '10 बार'],
      exp: 'इकाई स्थान पर `10` तथा दहाई स्थान पर `10` = कुल `20` बार।',
    },
  },
  {
    topic: 'Clock Angle 12-Hour Overlap Frequency',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Between `12:00 noon` and `6:00 p.m.` on a regular analog clock, at approximately `6:00` are the hands forming a straight angle (`180°`)? More simply: How many degrees does the MINUTE hand turn while moving from `12` to `7`?',
      opts: ['210°', '180°', '240°', '150°'],
      exp: 'Each numeral interval = `360° ÷ 12 = 30°`. Moving `7` intervals (`12` to `7`) = `7 × 30° = 210°`.',
    },
    mr: {
      q: 'घड्याळाचा मिनिटकाटा `12` पासून पुढे सरकत `7` या अंकापर्यंत पोहोचेपर्यंत किती अंश कोनातून फिरतो?',
      opts: ['210°', '180°', '240°', '150°'],
      exp: 'प्रत्येक अंकादरम्यान `30°` अंतर असते; `7 × 30° = 210°`.',
    },
    hi: {
      q: 'घड़ी की मिनट की सुई `12` से चलकर `7` तक पहुँचने में कितने डिग्री घूमती है?',
      opts: ['210°', '180°', '240°', '150°'],
      exp: '`7 × 30° = 210°`।',
    },
  },
  {
    topic: 'Unit Weight Parcel Stamp Tariff Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A post office charges `₹18` for the first `100 g` of a book parcel and `₹6` for every additional `50 g` (or part thereof). How much postage must Rohan pay to mail a `340 g` science book?',
      opts: ['₹48', '₹42', '₹54', '₹36'],
      exp: 'First `100 g = ₹18`. Remaining `240 g = 4 × 50 g + 40 g` → `5` additional `50 g` blocks (`5 × 6 = ₹30`). Total = `18 + 30 = ₹48`.',
    },
    mr: {
      q: 'टपाल कार्यालय पहिल्या `100 ग्रॅम` पार्सलसाठी `₹18` आणि त्यानंतरच्या प्रत्येक `50 ग्रॅम` (किंवा तिच्या भागासाठी) `₹6` आकारते. `340 ग्रॅम` वजनाचे पुस्तक पाठवायला किती खर्च येईल?',
      opts: ['₹48', '₹42', '₹54', '₹36'],
      exp: 'पहिले `100 ग्रॅम = ₹18`. उरलेले `240 ग्रॅम` साठी `5` भाग (`50×4 + 40`) म्हणजे `5 × 6 = ₹30`. एकूण = `₹48`.',
    },
    hi: {
      q: 'डाकघर पहले `100 ग्राम` के लिए `₹18` तथा अगले प्रत्येक `50 ग्राम` (या आंशिक भाग) के लिए `₹6` लेता है। `340 ग्राम` पुस्तक भेजने का खर्च कितना होगा?',
      opts: ['₹48', '₹42', '₹54', '₹36'],
      exp: 'प्रथम `100 ग्रा = ₹18`; शेष `240 ग्रा` हेतु `5` खंड (`5 × 6 = ₹30`)। कुल = `₹48`।',
    },
  },
  {
    topic: 'Data Handling Tally Frequency Class Favorite Sport',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 5 tally chart shows `4` full crossed-five bundles plus `3` vertical strokes (`||||` + 3) for Kho-Kho, and `3` full crossed-five bundles plus `2` strokes for Kabaddi. How many more students prefer Kho-Kho than Kabaddi?',
      opts: ['6 students', '5 students', '7 students', '4 students'],
      exp: 'Kho-Kho = `4×5 + 3 = 23`; Kabaddi = `3×5 + 2 = 17`. Difference = `23 − 17 = 6` students.',
    },
    mr: {
      q: 'ताळ्याच्या खुणांमध्ये (Tally marks) खो-खोसाठी ५ चे `4` पूर्ण गट व `3` उभ्या रेषा, तर कबड्डीसाठी ५ चे `3` पूर्ण गट व `2` रेषा आहेत. कबड्डीपेक्षा खो-खो किती विद्यार्थी जास्त आवडतात?',
      opts: ['6 विद्यार्थी', '5 विद्यार्थी', '7 विद्यार्थी', '4 विद्यार्थी'],
      exp: 'खो-खो `= 23`, कबड्डी `= 17`. फरक `= 23 − 17 = 6` विद्यार्थी.',
    },
    hi: {
      q: 'टैली चिह्नों में खो-खो हेतु `5` के `4` बंडल और `3` डंडियाँ तथा कबड्डी हेतु `5` के `3` बंडल और `2` डंडियाँ हैं। खो-खो पसंद करने वाले छात्र कितने अधिक हैं?',
      opts: ['6 छात्र', '5 छात्र', '7 छात्र', '4 छात्र'],
      exp: '`23 − 17 = 6` छात्र।',
    },
  },
  {
    topic: 'Rotational Symmetry Half-Turn Year Digits',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Printed in clean seven-segment digital font, which four-digit calendar year reads identically when rotated `180°` upside down?',
      opts: ['1961', '1986', '2005', '1818'],
      exp: 'Flipping `1→1`, `9→6`, `6→9`, `1→1` reverses `1961` straight back to `1961`! (Note `1818` upside down reads `8181`).',
    },
    mr: {
      q: 'डिजिटल घड्याळी अंकांत लिहिलेले खालीलपैकी कोणते चार-अंकी वर्ष `180°` उलटे फिरवले तरीही नेमके तसेच (`तेच वर्ष`) वाचले जाते?',
      opts: ['1961', '1986', '2005', '1818'],
      exp: '`1961` उलटे केल्यास `1→1, 6→9, 9→6, 1→1` म्हणजे पुन्हा `1961` च दिसते (`1818` उलटे `8181` दिसते).',
    },
    hi: {
      q: 'डिजिटल अंकों में लिखा कौन-सा वर्ष `180°` उल्टा घुमाने पर भी ठीक वैसा ही पढ़ा जाएगा?',
      opts: ['1961', '1986', '2005', '1818'],
      exp: '`1961` को `180°` घुमाने पर भी `1961` ही बनता है (`1818` से `8181` बनता है)।',
    },
  },
  {
    topic: 'Decimal Powers of Ten Division Shift',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate: `(36.5 ÷ 100) + (0.48 × 10)`',
      opts: ['5.165', '8.45', '4.115', '5.28'],
      exp: '`36.5 ÷ 100 = 0.365`; `0.48 × 10 = 4.8`. Sum = `0.365 + 4.8 = 5.165`.',
    },
    mr: {
      q: 'किंमत काढा: `(36.5 ÷ 100) + (0.48 × 10)`',
      opts: ['5.165', '8.45', '4.115', '5.28'],
      exp: '`0.365 + 4.8 = 5.165`.',
    },
    hi: {
      q: 'मान निकालिए: `(36.5 ÷ 100) + (0.48 × 10)`',
      opts: ['5.165', '8.45', '4.115', '5.28'],
      exp: '`0.365 + 4.8 = 5.165`।',
    },
  },
  {
    topic: 'Triangular Number Sequence Steps',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Dot triangles grow as `1, 3, 6, 10, 15, ...`. How many dots sit inside the `8th` triangular number?',
      opts: ['36 dots', '28 dots', '45 dots', '32 dots'],
      exp: 'The `n`th triangular number = `n(n + 1) ÷ 2`. For `n = 8`: `8 × 9 ÷ 2 = 36` dots.',
    },
    mr: {
      q: '`1, 3, 6, 10, 15, ...` या त्रिकोणी संख्या मालिकेतील `8` वे पद कोणते?',
      opts: ['36', '28', '45', '32'],
      exp: '`8 × 9 ÷ 2 = 36`.',
    },
    hi: {
      q: '`1, 3, 6, 10, 15, ...` त्रिकोणीय संख्या पैटर्न का `8`वाँ पद क्या होगा?',
      opts: ['36', '28', '45', '32'],
      exp: '`8 × 9 ÷ 2 = 36`।',
    },
  },
  {
    topic: 'Number Operations Missing Digit Multiplication Puzzle',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If `3A × 6 = 216`, where `A` stands for a single digit, what is the value of `A × A`?',
      opts: ['36', '16', '25', '49'],
      exp: '`216 ÷ 6 = 36`, so `3A = 36` giving `A = 6`. Then `A × A = 36`.',
    },
    mr: {
      q: 'जर `3A × 6 = 216` (येथे `A` हा एकअंकी अंक आहे), तर `A × A` किती?',
      opts: ['36', '16', '25', '49'],
      exp: '`216 ÷ 6 = 36` ⇒ `A = 6`, म्हणून `A × A = 36`.',
    },
    hi: {
      q: 'यदि `3A × 6 = 216` है (जहाँ `A` एक अंक है), तो `A × A` का मान कितना होगा?',
      opts: ['36', '16', '25', '49'],
      exp: '`216 ÷ 6 = 36` ⇒ `A = 6` ⇒ `6 × 6 = 36`।',
    },
  },
  {
    topic: 'Rupees & Paise Decimal Expressing Mixed Coins',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How is `47 rupees 5 paise` written accurately in decimal rupee notation?',
      opts: ['₹47.05', '₹47.50', '₹47.5', '₹4.705'],
      exp: '`5 paise = 5/100 rupee = ₹0.05`. Combined = `₹47.05`.',
    },
    mr: {
      q: '`47 रुपये 5 पैसे` हे दशांश रूपात अचूक कसे लिहिले जाते?',
      opts: ['₹47.05', '₹47.50', '₹47.5', '₹4.705'],
      exp: '`5 पैसे = 5/100 रुपये = 0.05`. म्हणून `₹47.05`.',
    },
    hi: {
      q: '`47 रुपये 5 पैसे` को दशमलव रूप में सही कैसे लिखा जाता है?',
      opts: ['₹47.05', '₹47.50', '₹47.5', '₹4.705'],
      exp: '`5 पैसे = 0.05 रुपये` अतः `₹47.05`।',
    },
  },
  {
    topic: '2D Area Carpet Border Minus Uncovered Floor',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular hall measures `12 m × 8 m`. A square rug of side `6 m` is spread centrally inside it. How much floor area remains uncovered around the rug?',
      opts: ['60 sq m', '96 sq m', '36 sq m', '72 sq m'],
      exp: 'Hall area = `12 × 8 = 96 sq m`; rug area = `6 × 6 = 36 sq m`. Uncovered = `96 − 36 = 60 sq m`.',
    },
    mr: {
      q: '`12 मी × 8 मी` मापाच्या सभागृहात मध्यभागी `6 मी` बाजूची चौरसाकृती सतरंजी अंथरली, तर सतरंजीशिवाय किती चौ.मी फरशी मोकळी राहील?',
      opts: ['60 चौ.मी', '96 चौ.मी', '36 चौ.मी', '72 चौ.मी'],
      exp: 'सभागृह `= 96 चौ.मी`, सतरंजी `= 36 चौ.मी`. मोकळी जागा `= 96 − 36 = 60 चौ.मी`.',
    },
    hi: {
      q: '`12 मी × 8 मी` के कमरे में `6 मी` भुजा की वर्गाकार दरी बिछाई गई। दरी के अलावा कितना फर्श खाली बचा?',
      opts: ['60 वर्ग मी', '96 वर्ग मी', '36 वर्ग मी', '72 वर्ग मी'],
      exp: '`96 − 36 = 60 वर्ग मी`।',
    },
  },
  {
    topic: 'Cube Surface Area & Face Count Stack Puzzle',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Four identical cubes of edge `2 cm` are stacked vertically into one tall `2 cm × 2 cm × 8 cm` tower sitting flat on a desk. Including top, sides, and bottom, how many `2 cm × 2 cm` outer faces are visible on the OUTSIDE of the tower?',
      opts: ['18 square faces', '24 square faces', '16 square faces', '20 square faces'],
      exp: 'Four side columns × 4 cubes high = `16` side faces + `1` top + `1` bottom = `18` outer square faces (3 glued internal joints hide 6 faces).',
    },
    mr: {
      q: '`2 सेमी` बाजूचे चार समान घन एकावर एक उभे ठेवून एक उंच स्तंभ तयार केला, तर त्या स्तंभाची बाहेरून एकूण किती चौरसाकृती पृष्ठे (तळासह) असतील?',
      opts: ['18 पृष्ठे', '24 पृष्ठे', '16 पृष्ठे', '20 पृष्ठे'],
      exp: 'चारही बाजूंची `4 × 4 = 16` पृष्ठे + वरचे `1` + तळाचे `1` = `18` पृष्ठे.',
    },
    hi: {
      q: '`2 सेमी` भुजा के चार समान घनों को एक के ऊपर एक रखकर स्तंभ बनाया गया। तल सहित स्तंभ के बाहर कुल कितने वर्गाकार फलक हैं?',
      opts: ['18 फलक', '24 फलक', '16 फलक', '20 फलक'],
      exp: 'चार पार्श्व दीवारें `16` + शीर्ष `1` + आधार `1` = `18` फलक।',
    },
  },
  {
    topic: 'Division Word Problem Packed Egg Cartons & Loose',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A poultry farm collects `1,250` eggs daily and packs them into trays holding `12` eggs each. How many FULL trays are packed, and how many loose eggs stay over?',
      opts: ['104 full trays, 2 loose eggs', '104 full trays, 4 loose eggs', '103 full trays, 10 loose eggs', '105 full trays, 0 loose eggs'],
      exp: '`1,250 = (104 × 12) + 2` (`1,248 + 2 = 1,250`).',
    },
    mr: {
      q: 'दररोज `1,250` अंडी प्रत्येकी `12` अंड्यांच्या ट्रेमध्ये भरल्यास किती ट्रे पूर्ण भरतील आणि किती अंडी सुटी उरतील?',
      opts: ['104 पूर्ण ट्रे, 2 अंडी शिल्लक', '104 पूर्ण ट्रे, 4 अंडी शिल्लक', '103 पूर्ण ट्रे, 10 अंडी शिल्लक', '105 पूर्ण ट्रे, 0 अंडी'],
      exp: '`1,250 ÷ 12`: भागाकार `104` आणि बाकी `2`.',
    },
    hi: {
      q: '`1,250` अंडों को `12` अंडों वाली ट्रे में रखने पर कितनी ट्रे पूरी भरेंगी और कितने अंडे शेष बचेंगे?',
      opts: ['104 पूरी ट्रे, 2 शेष', '104 पूरी ट्रे, 4 शेष', '103 पूरी ट्रे, 10 शेष', '105 पूरी ट्रे, 0 शेष'],
      exp: '`104 × 12 + 2 = 1,250`।',
    },
  },
  {
    topic: 'Percentage Reverse Price Before 25% Increase',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'What is `125%` of `64`?',
      opts: ['80', '72', '96', '84'],
      exp: '`125% = 5/4`. `(5/4) × 64 = 5 × 16 = 80`.',
    },
    mr: {
      q: '`64` चे `125%` किती होतात?',
      opts: ['80', '72', '96', '84'],
      exp: '`125% = 5/4`; `(5/4) × 64 = 80`.',
    },
    hi: {
      q: '`64` का `125%` कितना होता है?',
      opts: ['80', '72', '96', '84'],
      exp: '`(125/100) × 64 = (5/4) × 64 = 80`।',
    },
  },
  {
    topic: 'Fraction Word Problem Clock Fraction of Day Minutes',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many minutes are equal to `5/12` of an hour?',
      opts: ['25 minutes', '20 minutes', '30 minutes', '35 minutes'],
      exp: '`(5/12) × 60 = 5 × 5 = 25 minutes`.',
    },
    mr: {
      q: 'एका तासाचा `5/12` भाग म्हणजे किती मिनिटे?',
      opts: ['25 मिनिटे', '20 मिनिटे', '30 मिनिटे', '35 मिनिटे'],
      exp: '`(5/12) × 60 = 25 मिनिटे`.',
    },
    hi: {
      q: 'एक घंटे का `5/12` भाग कितने मिनट के बराबर होता है?',
      opts: ['25 मिनट', '20 मिनट', '30 मिनट', '35 मिनट'],
      exp: '`(5/12) × 60 = 25 मिनट`।',
    },
  },
  {
    topic: 'Algebraic Thought Primary Balance Scale Reasoning',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'On a balanced grocer’s scale, `3` identical watermelons plus a `500 g` brass weight balance `5 kg` altogether. What is the mass of `1` watermelon?',
      opts: ['1.5 kg', '1.25 kg', '2 kg', '1.75 kg'],
      exp: '`3` melons = `5 kg − 0.5 kg = 4.5 kg`. One melon = `4.5 ÷ 3 = 1.5 kg`.',
    },
    mr: {
      q: 'एका समतोल तराजूवर एका पारड्यात `3` सारखी कलिंगडे व `500 ग्रॅम`चे माप ठेवले असता दुसऱ्या पारड्यातील `5 किग्रॅ` वजनाशी बरोबर जुळते, तर एका कलिंगडाचे वजन किती?',
      opts: ['1.5 किग्रॅ', '1.25 किग्रॅ', '2 किग्रॅ', '1.75 किग्रॅ'],
      exp: '`3` कलिंगडे `= 5 − 0.5 = 4.5 किग्रॅ`. एक कलिंगड `= 4.5 ÷ 3 = 1.5 किग्रॅ`.',
    },
    hi: {
      q: 'तराजू के एक पलड़े में `3` समान तरबूज और `500 ग्राम` बाट दूसरे पलड़े के `5 किग्रा` से संतुलित हैं। एक तरबूज का भार कितना है?',
      opts: ['1.5 किग्रा', '1.25 किग्रा', '2 किग्रा', '1.75 किग्रा'],
      exp: '`(5 − 0.5) ÷ 3 = 1.5 किग्रा`।',
    },
  },
  {
    topic: 'Square Side Tripled Area Scaling',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If every side of a square is tripled (multiplied by `3`), how many times larger does its area become?',
      opts: ['9 times', '3 times', '6 times', '12 times'],
      exp: 'New area = `(3s)² = 9s²`, which is `9` times the original area.',
    },
    mr: {
      q: 'चौरसाची प्रत्येक बाजू तिप्पट (`3` पट) केली, तर त्याचे क्षेत्रफळ मूळ क्षेत्रफळाच्या किती पट होईल?',
      opts: ['9 पट', '3 पट', '6 पट', '12 पट'],
      exp: '`(3s)² = 9s²`, म्हणून क्षेत्रफळ `9` पट होते.',
    },
    hi: {
      q: 'यदि किसी वर्ग की प्रत्येक भुजा तिगुनी कर दी जाए, तो उसका क्षेत्रफल कितने गुना हो जाएगा?',
      opts: ['9 गुना', '3 गुना', '6 गुना', '12 गुना'],
      exp: '`(3s)² = 9s²` अर्थात `9` गुना।',
    },
  },
  {
    topic: 'Divisibility by 3 Smallest Digit Replacement',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the SMALLEST digit `*` that makes `62*45` divisible by `3`?',
      opts: ['1', '0', '2', '4'],
      exp: 'Known sum = `6 + 2 + 4 + 5 = 17`. Next multiple of `3` above `17` is `18`, requiring `* = 1`.',
    },
    mr: {
      q: '`62*45` या संख्येला `3` ने पूर्ण भाग जाण्यासाठी `*` च्या जागी सर्वात लहान कोणता अंक ठेवावा?',
      opts: ['1', '0', '2', '4'],
      exp: 'अंकांची बेरीज `6+2+4+5 = 17`. `17` नंतरची `3` च्या पटीतील जवळची संख्या `18` असल्याने `* = 1`.',
    },
    hi: {
      q: 'संख्या `62*45` को `3` से विभाज्य बनाने के लिए `*` का सबसे छोटा अंक क्या होगा?',
      opts: ['1', '0', '2', '4'],
      exp: '`17 + 1 = 18` (`3` से विभाज्य) ⇒ `* = 1`।',
    },
  },
  {
    topic: '24-Hour Time Difference Bus Schedule Delay',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A bus scheduled to reach Satara at `16:45` arrived `38` minutes late because of monsoon road work. At what 12-hour p.m. time did the bus arrive?',
      opts: ['5:23 p.m.', '5:13 p.m.', '5:33 p.m.', '4:53 p.m.'],
      exp: '`16:45 = 4:45 p.m.`. Adding `38 min`: `4:45 + 15 m = 5:00`, plus `23 m` = `5:23 p.m.`.',
    },
    mr: {
      q: 'साताऱ्यास `16:45` वाजता पोहोचणारी बस रस्त्याच्या कामामुळे `38 मिनिटे` उशिरा आली, तर ती प्रत्यक्षात किती वाजता पोहोचली?',
      opts: ['सायंकाळी 5:23 वाजता', 'सायंकाळी 5:13 वाजता', 'सायंकाळी 5:33 वाजता', 'सायंकाळी 4:53 वाजता'],
      exp: '`4:45 + 38 मिनिटे = 5:23` सायंकाळी.',
    },
    hi: {
      q: 'सतारा `16:45` बजे पहुँचने वाली बस `38 मिनट` देरी से पहुँची। वह किस समय पहुँची?',
      opts: ['शाम 5:23 बजे', 'शाम 5:13 बजे', 'शाम 5:33 बजे', 'शाम 4:53 बजे'],
      exp: '`4:45 + 38 मिनट = 5:23` बजे।',
    },
  },
  {
    topic: 'Factors Sum Perfect Number Concept 6 vs 28',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Excluding the number itself, find the sum of all proper divisors of `28`: `1 + 2 + 4 + 7 + 14`:',
      opts: ['28', '24', '30', '21'],
      exp: '`1 + 2 + 4 + 7 + 14 = 28` — which is why `28` (along with `6`) is called a Perfect Number!',
    },
    mr: {
      q: '`28` ही संख्या सोडून तिचे सर्व इतर विभाजक (`1 + 2 + 4 + 7 + 14`) यांची बेरीज किती येते?',
      opts: ['28', '24', '30', '21'],
      exp: '`1 + 2 + 4 + 7 + 14 = 28` — म्हणूनच `28` ला परिपूर्ण संख्या (Perfect Number) म्हणतात.',
    },
    hi: {
      q: '`28` को छोड़कर इसके सभी उचित भाजकों (`1 + 2 + 4 + 7 + 14`) का योग कितना है?',
      opts: ['28', '24', '30', '21'],
      exp: 'योग `28` आता है—इसी कारण `28` एक पूर्ण संख्या (Perfect Number) है।',
    },
  },
  {
    topic: 'Fractions Multiplication Word Problem Garden Yield',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'One vegetable crate weighs `14 whole 2/5 kg`. What is the total weight of `5` identical crates?',
      opts: ['72 kg', '70 kg', '74 kg', '71.5 kg'],
      exp: '`14 whole 2/5 = 72/5 kg`. Multiply by `5`: `(72/5) × 5 = 72 kg`.',
    },
    mr: {
      q: 'एका भाजीच्या क्रेटचे वजन `14⅖ किग्रॅ` आहे, तर अशा `5` क्रेटचे एकूण वजन किती किलोग्रॅम होईल?',
      opts: ['72 किग्रॅ', '70 किग्रॅ', '74 किग्रॅ', '71.5 किग्रॅ'],
      exp: '`(14 × 5) + (2/5 × 5) = 70 + 2 = 72 किग्रॅ`.',
    },
    hi: {
      q: 'एक सब्जी क्रेट का वजन `14⅖ किग्रा` है। ऐसी `5` क्रेटों का कुल वजन कितना होगा?',
      opts: ['72 किग्रा', '70 किग्रा', '74 किग्रा', '71.5 किग्रा'],
      exp: '`70 + 2 = 72 किग्रा`।',
    },
  },
  {
    topic: '2D Geometry Rhombus Diagonals Angle Property',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'At what angle do the two diagonals of ANY rhombus always intersect each other?',
      opts: ['90° (right angles)', '45°', '60°', '120°'],
      exp: 'The diagonals of every rhombus bisect each other perpendicularly at exact right angles (`90°`).',
    },
    mr: {
      q: 'कोणत्याही समभुज चौकोनाचे (Rhombus) कर्ण परस्परांना किती अंश कोनात दुभागतात?',
      opts: ['90° (काटकोनात)', '45°', '60°', '120°'],
      exp: 'समभुज चौकोनाचे कर्ण नेहमी परस्परांचे लंबदुभाजक (`90°`) असतात.',
    },
    hi: {
      q: 'किसी भी समचतुर्भुज (Rhombus) के विकर्ण परस्पर किस कोण पर प्रतिच्छेद करते हैं?',
      opts: ['90° (समकोण पर)', '45°', '60°', '120°'],
      exp: 'समचतुर्भुज के विकर्ण सदैव `90°` पर समद्विभाजित करते हैं।',
    },
  },
  {
    topic: 'Ratio Map Measurement Conversion Scale Simplify',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Express the ratio of `750 ml` to `2.5 litres` in simplest whole-number form:',
      opts: ['3 : 10', '3 : 5', '15 : 50', '75 : 25'],
      exp: 'Convert both to ml: `750 : 2,500`. Divide both by `250`: `3 : 10`.',
    },
    mr: {
      q: '`750 मिली` चे `2.5 लिटर` शी संक्षिप्त गुणोत्तर कोणते?',
      opts: ['3 : 10', '3 : 5', '15 : 50', '75 : 25'],
      exp: '`2.5 लिटर = 2,500 मिली`. `750 : 2,500 = 3 : 10`.',
    },
    hi: {
      q: '`750 मिली` और `2.5 लीटर` का सरलतम अनुपात क्या होगा?',
      opts: ['3 : 10', '3 : 5', '15 : 50', '75 : 25'],
      exp: '`750 : 2,500 = 3 : 10`।',
    },
  },
  {
    topic: 'Mental Math Round-and-Compensate Subtraction',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A quick mental shortcut for computing `843 − 298` is:',
      opts: ['(843 − 300) + 2 = 545', '(843 − 300) − 2 = 541', '843 + 300 − 2 = 1,141', '843 − 200 + 98 = 741'],
      exp: 'Subtracting `300` instead of `298` takes `2` too many away, so add `2` back: `543 + 2 = 545`.',
    },
    mr: {
      q: '`843 − 298` ही वजाबाकी तोंडी झटपट करण्यासाठी कोणती योग्य रीत आहे?',
      opts: ['(843 − 300) + 2 = 545', '(843 − 300) − 2 = 541', '843 + 300 − 2 = 1,141', '843 − 200 + 98 = 741'],
      exp: '`298` ऐवजी `300` वजा केले तर `2` जास्त वजा होतात, म्हणून `+ 2` परत मिळवतात: `543 + 2 = 545`.',
    },
    hi: {
      q: '`843 − 298` को मानसिक रूप से तेजी से घटाने का सही तरीका क्या है?',
      opts: ['(843 − 300) + 2 = 545', '(843 − 300) − 2 = 541', '843 + 300 − 2 = 1,141', '843 − 200 + 98 = 741'],
      exp: '`300` घटाकर `2` वापस जोड़ने से `545` तुरंत मिल जाता है।',
    },
  },
  {
    topic: 'Decimal Pattern Repeating Half Division',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'What comes next in the halving sequence: `12.8, 6.4, 3.2, 1.6, ___`?',
      opts: ['0.8', '0.4', '1.2', '0.08'],
      exp: 'Each term is divided by `2`: `1.6 ÷ 2 = 0.8`.',
    },
    mr: {
      q: '`12.8, 6.4, 3.2, 1.6, ___` या निम्मे होत जाणाऱ्या मालिकेतील पुढची संख्या कोणती?',
      opts: ['0.8', '0.4', '1.2', '0.08'],
      exp: 'प्रत्येक पदाला `2` ने भागून `1.6 ÷ 2 = 0.8` मिळते.',
    },
    hi: {
      q: '`12.8, 6.4, 3.2, 1.6, ___` अनुक्रम की अगली संख्या क्या होगी?',
      opts: ['0.8', '0.4', '1.2', '0.08'],
      exp: 'प्रत्येक पद का आधा करने पर `1.6 ÷ 2 = 0.8`।',
    },
  },
  {
    topic: 'Fraction of an Hour Comparison 45 Min vs 3/5 Hr',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Which is LONGER, and by how many minutes: `3/4` of an hour OR `2/3` of an hour?',
      opts: ['3/4 hour is longer by 5 minutes', '2/3 hour is longer by 5 minutes', '3/4 hour is longer by 10 minutes', 'Both equal 40 minutes'],
      exp: '`3/4 hr = 45 min`; `2/3 hr = 40 min`. Difference = `5 minutes`.',
    },
    mr: {
      q: '`3/4 तास` आणि `2/3 तास` यांपैकी कोणता वेळ जास्त आहे आणि किती मिनिटांनी?',
      opts: ['3/4 तास 5 मिनिटांनी जास्त आहे', '2/3 तास 5 मिनिटांनी जास्त आहे', '3/4 तास 10 मिनिटांनी जास्त आहे', 'दोन्ही 40 मिनिटेच आहेत'],
      exp: '`3/4 तास = 45 मि.` व `2/3 तास = 40 मि.`, म्हणून `5 मिनिटे` जास्त.',
    },
    hi: {
      q: '`3/4 घंटे` और `2/3 घंटे` में से कौन-सा अधिक है और कितने मिनट?',
      opts: ['3/4 घंटा 5 मिनट अधिक है', '2/3 घंटा 5 मिनट अधिक है', '3/4 घंटा 10 मिनट अधिक है', 'दोनों 40 मिनट हैं'],
      exp: '`45 मि − 40 मि = 5 मिनट`।',
    },
  },
  {
    topic: '2D Shape Cuboid Painted Face Cutting',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A solid `3 × 3 × 3` cube has all outer faces painted red and is sliced into `27` unit `1 × 1 × 1` cubes. How many small cubes have EXACTLY THREE faces painted red?',
      opts: ['8 corner cubes', '12 edge cubes', '6 center cubes', '1 interior cube'],
      exp: 'Only the `8` corner cubes expose three outer faces (`12` edge-middles have 2 faces, `6` face-centers have 1 face, `1` core has 0).',
    },
    mr: {
      q: '`3 × 3 × 3` मापाच्या मोठ्या घनाला बाहेरून सर्व बाजूंनी लाल रंग देऊन `27` लहान घनांत कापले, तर नेमक्या `3` पृष्ठांना रंग असलेले लहान घन किती असतील?',
      opts: ['8 कोपऱ्यांचे घन', '12 कडांचे घन', '6 मध्य घन', '1 आतील घन'],
      exp: 'केवळ `8` कोपऱ्यांवरच्या घनांना तीन बाह्य पृष्ठे असतात.',
    },
    hi: {
      q: '`3 × 3 × 3` घन को बाहर से लाल रंगकर `27` छोटे घनों में काटा गया। ठीक `3` रंगे फलकों वाले कितने घन होंगे?',
      opts: ['8 कोने के घन', '12 किनारे के घन', '6 मध्य घन', '1 आंतरिक घन'],
      exp: 'केवल `8` कोनों के घनों की तीन सतहें रँगी होती हैं।',
    },
  },
  {
    topic: 'Digit Appearance Zeroes Counting 1 to 100',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many times does the digit `0` appear when writing ALL counting numbers from `1` through `100` inclusive?',
      opts: ['11 times', '10 times', '9 times', '12 times'],
      exp: 'Multiples of ten (`10, 20, ..., 90`) contribute `9` zeroes, and `100` contributes `2` zeroes: `9 + 2 = 11` zeroes.',
    },
    mr: {
      q: '`1` ते `100` पर्यंतच्या सर्व नैसर्गिक संख्या लिहिल्यास त्यांमध्ये `0` हा अंक एकूण किती वेळा येतो?',
      opts: ['11 वेळा', '10 वेळा', '9 वेळा', '12 वेळा'],
      exp: '`10 ते 90` मध्ये `9` वेळा आणि `100` मध्ये `2` शून्ये: `9 + 2 = 11` वेळा.',
    },
    hi: {
      q: '`1` से `100` तक गिनती लिखने पर अंक `0` कुल कितनी बार आता है?',
      opts: ['11 बार', '10 बार', '9 बार', '12 बार'],
      exp: '`10..90` में `9` तथा `100` में `2` शून्य = `11` बार।',
    },
  },
];
