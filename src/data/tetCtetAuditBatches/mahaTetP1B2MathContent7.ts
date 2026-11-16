import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 7 (30 unique Classes 1-5 Qs)
export const MAHA_TET_P1_B2_MATH_C7: CuratedTrilingualMcq[] = [
  {
    topic: 'Bar Graph Scale Reading Classroom Book Collection',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'In a pictograph of library books read, `1 picture of a book` stands for `15` books. If Class 5A has `4` full pictures and `1/3` picture, how many books did Class 5A read?',
      opts: ['65 books', '60 books', '70 books', '55 books'],
      exp: '`4` full symbols = `4 × 15 = 60` books; `1/3` symbol = `15 ÷ 3 = 5` books. Total = `60 + 5 = 65` books.',
    },
    mr: {
      q: 'एका चित्रालेखात `1 पुस्तकाचे चित्र = 15 पुस्तके` असे प्रमाण आहे. इयत्ता पाचवी अ साठी `4` पूर्ण चित्रे आणि `1/3` चित्र असल्यास एकूण किती पुस्तके वाचली गेली?',
      opts: ['65 पुस्तके', '60 पुस्तके', '70 पुस्तके', '55 पुस्तके'],
      exp: '`4 × 15 = 60` अधिक `15 ÷ 3 = 5` मिळून `65 पुस्तके`.',
    },
    hi: {
      q: 'एक चित्रालेख में `1 पुस्तक चित्र = 15 पुस्तकें` दर्शाता है। यदि कक्षा 5A के सामने `4` पूरे और `1/3` चित्र बने हैं, तो कुल कितनी पुस्तकें पढ़ी गईं?',
      opts: ['65 पुस्तकें', '60 पुस्तकें', '70 पुस्तकें', '55 पुस्तकें'],
      exp: '`4 × 15 = 60` तथा `15 ÷ 3 = 5`, कुल `65 पुस्तकें`।',
    },
  },
  {
    topic: 'Roman Numerals Difference Between DCL and CXCV',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'What is the value of `DCL − CXCV` expressed in Hindu-Arabic numerals?',
      opts: ['455', '465', '445', '545'],
      exp: '`DCL = 500 + 100 + 50 = 650`. `CXCV = 100 + (100 − 10) + 5 = 195`. Difference = `650 − 195 = 455`.',
    },
    mr: {
      q: 'आंतरराष्ट्रीय संख्याचिन्हांत `DCL − CXCV` ची किंमत किती?',
      opts: ['455', '465', '445', '545'],
      exp: '`DCL = 650` आणि `CXCV = 195`. वजाबाकी `650 − 195 = 455`.',
    },
    hi: {
      q: 'रोमन संख्या `DCL − CXCV` का मान भारतीय-अरबी अंकों में क्या होगा?',
      opts: ['455', '465', '445', '545'],
      exp: '`DCL = 650` तथा `CXCV = 195`। अंतर = `650 − 195 = 455`।',
    },
  },
  {
    topic: 'Fraction Remainder Water Tank Consumption',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'An overhead water tank holds `900 litres`. In the morning `2/5` of the water is used, and in the afternoon `1/3` of the ORIGINAL capacity is used. How many litres remain?',
      opts: ['240 L', '360 L', '300 L', '180 L'],
      exp: 'Morning = `2/5 × 900 = 360 L`; afternoon = `1/3 × 900 = 300 L`. Total used = `660 L`. Remaining = `900 − 660 = 240 L`.',
    },
    mr: {
      q: 'एका टाकीत `900 लिटर` पाणी आहे. सकाळी `2/5` भाग व दुपारी मूळ क्षमतेचा `1/3` भाग पाणी वापरले. तर टाकीत किती लिटर पाणी शिल्लक राहिले?',
      opts: ['240 लि', '360 लि', '300 लि', '180 लि'],
      exp: 'सकाळी `360 लि`, दुपारी `300 लि` असे एकूण `660 लि` वापरले; शिल्लक `900 − 660 = 240 लि`.',
    },
    hi: {
      q: 'एक टंकी में `900 लीटर` पानी है। सुबह `2/5` भाग और दोपहर में मूल पानी का `1/3` भाग उपयोग हुआ। टंकी में कितना पानी शेष बचा?',
      opts: ['240 ली', '360 ली', '300 ली', '180 ली'],
      exp: 'कुल खर्च = `360 + 300 = 660 ली`; शेष = `900 − 660 = 240 ली`।',
    },
  },
  {
    topic: 'Perimeter of Regular Hexagon Wire Rebend to Square',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A piece of copper wire is bent into a regular hexagon of side `12 cm`. If the same wire is straightened and rebent into a square, what is the area of the square?',
      opts: ['324 sq cm', '144 sq cm', '256 sq cm', '289 sq cm'],
      exp: 'Wire length = `6 × 12 = 72 cm`. Square side = `72 ÷ 4 = 18 cm`. Area = `18 × 18 = 324 sq cm`.',
    },
    mr: {
      q: 'तांब्याच्या तारेपासून `12 सेमी` बाजूचा नियमित षटकोन तयार केला. तीच तार सरळ करून तिचा चौरस बनवल्यास त्या चौरसाचे क्षेत्रफळ किती चौ.सेमी. होईल?',
      opts: ['324 चौ.सेमी.', '144 चौ.सेमी.', '256 चौ.सेमी.', '289 चौ.सेमी.'],
      exp: 'तारेची लांबी = `6 × 12 = 72 सेमी`. चौरसाची बाजू = `72 ÷ 4 = 18 सेमी`. क्षेत्रफळ = `18² = 324 चौ.सेमी.`.',
    },
    hi: {
      q: 'एक ताँबे के तार को मोड़कर `12 सेमी` भुजा वाला सम षट्भुज बनाया गया। उसी तार को सीधा करके वर्ग बनाया जाए, तो वर्ग का क्षेत्रफल क्या होगा?',
      opts: ['324 वर्ग सेमी', '144 वर्ग सेमी', '256 वर्ग सेमी', '289 वर्ग सेमी'],
      exp: 'तार की लंबाई = `72 सेमी`, वर्ग की भुजा = `72 ÷ 4 = 18 सेमी`। क्षेत्रफल = `18 × 18 = 324 वर्ग सेमी`।',
    },
  },
  {
    topic: 'Calendar Day Shift Across Non-Leap Year',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If Republic Day (`26 January 2023`) fell on a Thursday, on which day of the week did `26 January 2024` fall?',
      opts: ['Friday', 'Saturday', 'Thursday', 'Sunday'],
      exp: 'Between `26 Jan 2023` and `26 Jan 2024`, February 2023 had `28` days (non-leap year = `365` days = `52 weeks + 1 odd day`). Thursday + `1` = Friday.',
    },
    mr: {
      q: '`26 जानेवारी 2023` रोजी गुरुवार असल्यास `26 जानेवारी 2024` रोजी कोणता वार असेल?',
      opts: ['शुक्रवार', 'शनिवार', 'गुरुवार', 'रविवार'],
      exp: '`2023` हे सामान्य वर्ष (`365 दिवस`) असल्याने `1` दिवस पुढे सरकतो (फेब्रुवारी २०२४ नंतर लीप परिणाम येतो). गुरुवार + `1` = शुक्रवार.',
    },
    hi: {
      q: 'यदि `26 जनवरी 2023` को गुरुवार था, तो `26 जनवरी 2024` को कौन-सा दिन था?',
      opts: ['शुक्रवार', 'शनिवार', 'गुरुवार', 'रविवार'],
      exp: '2023 सामान्य वर्ष (`365 दिन = 52 सप्ताह + 1 विषम दिन`) है, अतः गुरुवार + `1` = शुक्रवार।',
    },
  },
  {
    topic: 'Decimal Multiplication Cost of Cloth',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'If `1 metre` of cotton cloth costs `₹ 84.50`, what is the cost of `3.6 metres` of the same cloth?',
      opts: ['₹ 304.20', '₹ 302.40', '₹ 294.20', '₹ 314.20'],
      exp: '`84.5 × 3.6 = 845 × 36 ÷ 100 = 30,420 ÷ 100 = ₹ 304.20`.',
    },
    mr: {
      q: '`1 मीटर` सुती कापडाची किंमत `₹ 84.50` असल्यास `3.6 मीटर` कापडाची किंमत किती?',
      opts: ['₹ 304.20', '₹ 302.40', '₹ 294.20', '₹ 314.20'],
      exp: '`84.5 × 3.6 = ₹ 304.20`.',
    },
    hi: {
      q: 'यदि `1 मीटर` सूती कपड़े का मूल्य `₹ 84.50` है, तो `3.6 मीटर` कपड़े का मूल्य क्या होगा?',
      opts: ['₹ 304.20', '₹ 302.40', '₹ 294.20', '₹ 314.20'],
      exp: '`84.50 × 3.6 = ₹ 304.20`।',
    },
  },
  {
    topic: '3D Net Geometry Cube Opposite Faces',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A standard six-sided die has the property that opposite faces always sum to `7`. If the top face shows `2` and the front face shows `4`, what number is on the bottom face?',
      opts: ['5', '3', '1', '6'],
      exp: 'Since top and bottom are opposite faces summing to `7`, bottom = `7 − 2 = 5`.',
    },
    mr: {
      q: 'एका प्रमाणित फाश्याच्या समोरासमोरील पृष्ठांची बेरीज नेहमी `7` असते. वरच्या पृष्ठावर `2` आणि समोरील पृष्ठावर `4` असल्यास तळाच्या पृष्ठावर कोणता अंक असेल?',
      opts: ['5', '3', '1', '6'],
      exp: 'वर व तळ हे विरुद्ध पृष्ठे असल्याने बेरीज `7`: `7 − 2 = 5`.',
    },
    hi: {
      q: 'एक मानक पासे के विपरीत फलकों के अंकों का योग हमेशा `7` होता है। यदि ऊपरी फलक पर `2` और सामने `4` है, तो निचले फलक पर कौन-सा अंक होगा?',
      opts: ['5', '3', '1', '6'],
      exp: 'ऊपर और नीचे विपरीत फलक हैं, अतः `7 − 2 = 5`।',
    },
  },
  {
    topic: 'Percentage Exam Marks Pass Threshold',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'In a class assessment out of `250` marks, Kavita scored `72%`. How many marks did she score?',
      opts: ['180', '175', '185', '170'],
      exp: '`72% of 250 = (72 × 250) / 100 = 72 × 2.5 = 180` marks.',
    },
    mr: {
      q: 'कविताला `250` गुणांपैकी एका परीक्षेत `72%` गुण मिळाले. तिला एकूण किती गुण मिळाले?',
      opts: ['180', '175', '185', '170'],
      exp: '`250` चे `72% = (72 × 250)/100 = 180` गुण.',
    },
    hi: {
      q: 'कविता ने `250` अंकों की परीक्षा में `72%` अंक प्राप्त किए। उसने कुल कितने अंक प्राप्त किए?',
      opts: ['180', '175', '185', '170'],
      exp: '`250` का `72% = (72 × 250)/100 = 180` अंक।',
    },
  },
  {
    topic: 'Rounding Nearest Ten Product Estimation',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following is closest to the exact product `49 × 61`?',
      opts: ['3,000', '2,400', '3,500', '2,500'],
      exp: '`49` rounds to `50` and `61` rounds to `60`, giving `50 × 60 = 3,000` (exact product is `2,989`, only `11` away).',
    },
    mr: {
      q: '`49 × 61` या गुणाकाराचे जवळचे अंदाजे उत्तर खालीलपैकी कोणते?',
      opts: ['3,000', '2,400', '3,500', '2,500'],
      exp: '`49 ≈ 50` व `61 ≈ 60`, म्हणून `50 × 60 = 3,000` (अचूक गुणाकार `2,989`).',
    },
    hi: {
      q: '`49 × 61` के गुणनफल का निकटतम अनुमानित मान कौन-सा है?',
      opts: ['3,000', '2,400', '3,500', '2,500'],
      exp: '`50 × 60 = 3,000` (सटीक गुणनफल `2,989` के सबसे निकट)।',
    },
  },
  {
    topic: 'Division Algorithm Dividend Finder',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When a number is divided by `14`, the quotient is `23` and the remainder is `9`. What is the dividend?',
      opts: ['331', '322', '313', '341'],
      exp: 'Dividend = `Divisor × Quotient + Remainder = 14 × 23 + 9 = 322 + 9 = 331`.',
    },
    mr: {
      q: 'एका संख्येला `14` ने भागल्यास भागाकार `23` आणि बाकी `9` येते, तर ती संख्या (भाज्य) कोणती?',
      opts: ['331', '322', '313', '341'],
      exp: 'भाज्य = `भाजक × भागाकार + बाकी = 14 × 23 + 9 = 322 + 9 = 331`.',
    },
    hi: {
      q: 'किसी संख्या को `14` से भाग देने पर भागफल `23` तथा शेषफल `9` प्राप्त होता है। वह संख्या (भाज्य) क्या है?',
      opts: ['331', '322', '313', '341'],
      exp: 'भाज्य = `14 × 23 + 9 = 322 + 9 = 331`।',
    },
  },
  {
    topic: 'Time Watch Gain Loss Sync Correction',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A wall clock gains `3` minutes every hour. If it is set accurately at `7:00 a.m.`, what time will this fast clock display at `2:00 p.m.` on the same day?',
      opts: ['2:21 p.m.', '1:39 p.m.', '2:18 p.m.', '2:24 p.m.'],
      exp: 'Elapsed true time from `7:00 a.m.` to `2:00 p.m.` = `7 hours`. Total gain = `7 × 3 = 21 minutes`. Clock displays `2:21 p.m.`.',
    },
    mr: {
      q: 'एक भिंतीवरील घड्याळ दर तासाला `3 मिनिटे` पुढे जाते. सकाळी `7:00` वाजता बरोबर लावल्यास त्याच दिवशी दुपारी `2:00` वाजता ते घड्याळ कोणती वेळ दाखवेल?',
      opts: ['दुपारी 2:21', 'दुपारी 1:39', 'दुपारी 2:18', 'दुपारी 2:24'],
      exp: 'सकाळी `7` ते दुपारी `2` = `7 तास`. पुढे गेलेला वेळ = `7 × 3 = 21 मिनिटे`. म्हणून वेळ `2:21`.',
    },
    hi: {
      q: 'एक दीवार घड़ी हर घंटे `3 मिनट` आगे बढ़ जाती है। सुबह `7:00` बजे सही मिलाने पर उसी दिन दोपहर `2:00` बजे वह क्या समय दिखाएगी?',
      opts: ['दोपहर 2:21', 'दोपहर 1:39', 'दोपहर 2:18', 'दोपहर 2:24'],
      exp: '`7` घंटे में बढ़त = `7 × 3 = 21 मिनट`; अतः घड़ी `2:21` दिखाएगी।',
    },
  },
  {
    topic: 'Number System Largest Four-Digit Divisible by 15',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'What is the GREATEST 4-digit number exactly divisible by `15`?',
      opts: ['9,990', '9,995', '9,975', '9,960'],
      exp: 'Greatest 4-digit number is `9,999`. Dividing `9,999 ÷ 15` gives quotient `666` and remainder `9`. Subtracting `9` yields `9,990`.',
    },
    mr: {
      q: '`15` ने पूर्ण भाग जाणारी सर्वात मोठी चार-अंकी संख्या कोणती?',
      opts: ['9,990', '9,995', '9,975', '9,960'],
      exp: '`9,999 ÷ 15` केले असता बाकी `9` उरते. `9,999 − 9 = 9,990`.',
    },
    hi: {
      q: '`15` से पूर्णतः विभाजित होने वाली सबसे बड़ी चार-अंकीय संख्या कौन-सी है?',
      opts: ['9,990', '9,995', '9,975', '9,960'],
      exp: '`9,999` को `15` से भाग देने पर शेषफल `9` आता है; अतः `9,999 − 9 = 9,990`।',
    },
  },
  {
    topic: 'Area of Square Inside Larger Square Border Frame',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A square photograph of side `14 cm` is pasted centrally onto a square cardboard mount of side `18 cm`. What is the area of the visible cardboard border around the photo?',
      opts: ['128 sq cm', '64 sq cm', '144 sq cm', '196 sq cm'],
      exp: 'Border area = `Outer area − Inner area = 18² − 14² = 324 − 196 = 128 sq cm`.',
    },
    mr: {
      q: '`14 सेमी` बाजूचे चौरसाकृती छायाचित्र `18 सेमी` बाजूच्या चौरसाकृती पुठ्ठ्यावर मध्यभागी चिकटवले आहे. तर सभोवतालच्या रिकाम्या कडेचे क्षेत्रफळ किती?',
      opts: ['128 चौ.सेमी.', '64 चौ.सेमी.', '144 चौ.सेमी.', '196 चौ.सेमी.'],
      exp: 'कडेचे क्षेत्रफळ = `18² − 14² = 324 − 196 = 128 चौ.सेमी.`.',
    },
    hi: {
      q: '`14 सेमी` भुजा वाला वर्गाकार फोटो `18 सेमी` भुजा वाले वर्गाकार कार्डबोर्ड के बीच में चिपकाया गया है। चारों ओर बची किनारी (बॉर्डर) का क्षेत्रफल क्या होगा?',
      opts: ['128 वर्ग सेमी', '64 वर्ग सेमी', '144 वर्ग सेमी', '196 वर्ग सेमी'],
      exp: '`18² − 14² = 324 − 196 = 128 वर्ग सेमी`।',
    },
  },
  {
    topic: 'Fraction Word Problem Reciprocal Product Check',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the multiplicative inverse (reciprocal) of the mixed fraction `3 whole 2/5`?',
      opts: ['5/17', '17/5', '3 whole 5/2', '2/15'],
      exp: '`3 whole 2/5 = (3 × 5 + 2)/5 = 17/5`. Its reciprocal swaps numerator and denominator: `5/17`.',
    },
    mr: {
      q: '`3⅖` या पूर्णांकयुक्त अपूर्णांकाचा गुणाकार व्यस्त (reciprocal) कोणता?',
      opts: ['5/17', '17/5', '3⁵⁄₂', '2/15'],
      exp: '`3⅖ = 17/5`. याचा गुणाकार व्यस्त = `5/17`.',
    },
    hi: {
      q: 'मिश्र भिन्न `3⅖` का गुणात्मक प्रतिलोम (व्युत्क्रम) क्या होगा?',
      opts: ['5/17', '17/5', '3⁵⁄₂', '2/15'],
      exp: '`3⅖ = 17/5`, अतः इसका व्युत्क्रम `5/17` है।',
    },
  },
  {
    topic: 'Speed Distance Time Cycling Park',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A cyclist rides at a steady speed of `18 km/h`. How many minutes will he take to cover `6 km`?',
      opts: ['20 minutes', '15 minutes', '30 minutes', '25 minutes'],
      exp: 'Time = `Distance / Speed = 6 / 18 = 1/3 hour = 60 ÷ 3 = 20 minutes`.',
    },
    mr: {
      q: 'एक सायकलस्वार ताशी `18 किमी` वेगाने प्रवास करतो. तर `6 किमी` अंतर कापण्यास त्याला किती मिनिटे लागतील?',
      opts: ['20 मिनिटे', '15 मिनिटे', '30 मिनिटे', '25 मिनिटे'],
      exp: 'वेळ = `6 / 18 तास = 1/3 तास = 20 मिनिटे`.',
    },
    hi: {
      q: 'एक साइकिल चालक `18 किमी/घंटा` की चाल से चलता है। `6 किमी` की दूरी तय करने में उसे कितने मिनट लगेंगे?',
      opts: ['20 मिनट', '15 मिनट', '30 मिनट', '25 मिनट'],
      exp: 'समय = `6 / 18 घंटा = 1/3 × 60 = 20 मिनट`।',
    },
  },
  {
    topic: 'Polygons Interior Angle Sum Quadrilateral Properties',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Three interior angles of a quadrilateral measure `85°`, `95°`, and `110°`. What is the measure of the fourth angle?',
      opts: ['70°', '80°', '60°', '90°'],
      exp: 'Sum of interior angles of any quadrilateral = `360°`. Fourth angle = `360° − (85° + 95° + 110°) = 360° − 290° = 70°`.',
    },
    mr: {
      q: 'एका चौकोनाच्या तीन कोनांची मापे `85°`, `95°` व `110°` आहेत, तर चौथ्या कोनाचे माप किती?',
      opts: ['70°', '80°', '60°', '90°'],
      exp: 'चौकोनाच्या चारही कोनांची बेरीज `360°`. चौथा कोन = `360° − 290° = 70°`.',
    },
    hi: {
      q: 'एक चतुर्भुज के तीन कोण `85°`, `95°` और `110°` हैं। चौथे कोण का माप कितना होगा?',
      opts: ['70°', '80°', '60°', '90°'],
      exp: 'चतुर्भुज के चारों कोणों का योग `360°` होता है; चौथा कोण = `360° − 290° = 70°`।',
    },
  },
  {
    topic: 'Decimals Subtraction Money Change Shopping',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Sunita buys fruits worth `₹ 136.75` and vegetables worth `₹ 88.50`. How much change should she get back from a `₹ 500` note?',
      opts: ['₹ 274.75', '₹ 275.25', '₹ 284.75', '₹ 264.75'],
      exp: 'Total spent = `136.75 + 88.50 = ₹ 225.25`. Change = `500.00 − 225.25 = ₹ 274.75`.',
    },
    mr: {
      q: 'सुनीताने `₹ 136.75` ची फळे आणि `₹ 88.50` च्या भाज्या खरेदी केल्या. तिने दुकानदाराला `₹ 500` ची नोट दिल्यास तिला किती रुपये परत मिळतील?',
      opts: ['₹ 274.75', '₹ 275.25', '₹ 284.75', '₹ 264.75'],
      exp: 'एकूण खर्च = `136.75 + 88.50 = ₹ 225.25`. परत मिळालेली रक्कम = `500 − 225.25 = ₹ 274.75`.',
    },
    hi: {
      q: 'सुनीता ने `₹ 136.75` के फल और `₹ 88.50` की सब्ज़ियाँ खरीदीं। `₹ 500` का नोट देने पर उसे कितने रुपये वापस मिलेंगे?',
      opts: ['₹ 274.75', '₹ 275.25', '₹ 284.75', '₹ 264.75'],
      exp: 'कुल खर्च = `₹ 225.25`, वापस राशि = `500 − 225.25 = ₹ 274.75`।',
    },
  },
  {
    topic: 'Odd vs Even Product Rule Reasoning',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If `p` is an odd number and `q` is an even number, which of the following expressions ALWAYS gives an ODD result?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p + q'],
      exp: 'Since `q` is even, `q + 1` is odd. The product of two odd numbers (`p × (q + 1)`) is ALWAYS odd; all other options are even.',
    },
    mr: {
      q: 'जर `p` ही विषम संख्या आणि `q` ही सम संख्या असेल, तर खालीलपैकी कोणती पदावली नेहमी विषम संख्या देते?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p + q'],
      exp: '`q` सम असल्याने `q + 1` विषम असते. दोन विषम संख्यांचा गुणाकार `p × (q + 1)` नेहमी विषम येतो.',
    },
    hi: {
      q: 'यदि `p` एक विषम संख्या और `q` एक सम संख्या है, तो निम्न में से कौन-सा व्यंजक सदैव एक विषम संख्या देगा?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p + q'],
      exp: '`q` सम है इसलिए `q + 1` विषम होगा; दो विषम संख्याओं का गुणनफल `p × (q + 1)` सदैव विषम होता है।',
    },
  },
  {
    topic: 'Fractions Equivalent Missing Numerator',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Find the missing value `x` if the fractions `7/9` and `x/63` are equivalent:',
      opts: ['49', '42', '56', '63'],
      exp: 'Since `9 × 7 = 63`, multiply numerator by `7`: `x = 7 × 7 = 49`.',
    },
    mr: {
      q: '`7/9` आणि `x/63` हे सममूल्य अपूर्णांक असल्यास `x` ची किंमत किती?',
      opts: ['49', '42', '56', '63'],
      exp: 'छेद `9 × 7 = 63` झाला म्हणून अंश `7 × 7 = 49`.',
    },
    hi: {
      q: 'यदि `7/9` और `x/63` समतुल्य भिन्न हैं, तो `x` का मान क्या होगा?',
      opts: ['49', '42', '56', '63'],
      exp: 'हर `9 × 7 = 63` होने से अंश `x = 7 × 7 = 49`।',
    },
  },
  {
    topic: 'Place Value Expanded Form Lakhs Period',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Write the compact standard numeral for: `6 × 1,00,000 + 4 × 10,000 + 8 × 100 + 3 × 10 + 9`:',
      opts: ['6,40,839', '6,48,039', '6,04,839', '6,40,893'],
      exp: 'Thousands place has `0` (`40` thousand), hundreds `8`, tens `3`, ones `9` → `6,40,839`.',
    },
    mr: {
      q: '`6 × 1,00,000 + 4 × 10,000 + 8 × 100 + 3 × 10 + 9` चे संक्षिप्त रूप कोणते?',
      opts: ['6,40,839', '6,48,039', '6,04,839', '6,40,893'],
      exp: 'सहा लक्ष चाळीस हजार आठशे एकोणचाळीस = `6,40,839`.',
    },
    hi: {
      q: '`6 × 1,00,000 + 4 × 10,000 + 8 × 100 + 3 × 10 + 9` का मानक संक्षिप्त रूप लिखिए:',
      opts: ['6,40,839', '6,48,039', '6,04,839', '6,40,893'],
      exp: 'हज़ार स्थान पर `0` होने से `6,40,839` प्राप्त होता है।',
    },
  },
  {
    topic: 'Multiples Common Between 6 and 9 Under 100',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'How many positive numbers less than `100` are common multiples of both `6` and `9`?',
      opts: ['5', '6', '4', '7'],
      exp: '`LCM(6, 9) = 18`. Multiples of `18` under `100` are `18, 36, 54, 72, 90` — a total of `5` numbers.',
    },
    mr: {
      q: '`100` पेक्षा लहान अशा किती संख्या आहेत ज्या `6` आणि `9` या दोन्हीच्या सामाईक पटीत (common multiples) येतात?',
      opts: ['5', '6', '4', '7'],
      exp: '`6` व `9` चा लसावि `18`. `100` पेक्षा लहान `18` च्या पटीतील संख्या: `18, 36, 54, 72, 90` म्हणजे एकूण `5`.',
    },
    hi: {
      q: '`100` से छोटी ऐसी कितनी संख्याएँ हैं जो `6` और `9` दोनों की उभयनिष्ठ गुणज (common multiples) हैं?',
      opts: ['5', '6', '4', '7'],
      exp: '`LCM(6, 9) = 18`। `100` से कम गुणज `18, 36, 54, 72, 90` अर्थात् कुल `5` हैं।',
    },
  },
  {
    topic: 'Perimeter Compound L-Shape Garden Walk',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A square lawn has a perimeter of `64 m`. A gardener plants rose bushes along ALL FOUR sides at intervals of `2 m`, including all four corners. How many rose bushes are planted?',
      opts: ['32', '36', '33', '28'],
      exp: 'On a closed loop (square perimeter `64 m`), the number of equally spaced points at `2 m` intervals is simply `64 ÷ 2 = 32` bushes (corners are not double-counted).',
    },
    mr: {
      q: 'एका चौरसाकृती बागेची परिमिती `64 मी` आहे. चारही कोपऱ्यांसह चारही बाजूंनी `2 मी` अंतरावर गुलाबाची रोपे लावल्यास एकूण किती रोपे लागतील?',
      opts: ['32', '36', '33', '28'],
      exp: 'बंदिस्त परिमितीवर `2 मी` अंतराने रोपांची संख्या = `64 ÷ 2 = 32` रोपे.',
    },
    hi: {
      q: 'एक वर्गाकार बगीचे का परिमाप `64 मी` है। चारों कोनों सहित चारों ओर `2 मी` की दूरी पर गुलाब के पौधे लगाए जाएँ, तो कुल कितने पौधे लगेंगे?',
      opts: ['32', '36', '33', '28'],
      exp: 'बंद परिमाप पर बराबर दूरी पर पौधों की संख्या = `64 ÷ 2 = 32`।',
    },
  },
  {
    topic: 'Fraction of an Hour Seconds Conversion',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many seconds are there in `3/5` of a minute plus `1/12` of an hour?',
      opts: ['336 seconds', '300 seconds', '360 seconds', '324 seconds'],
      exp: '`3/5` of `60 s = 36 s`. `1/12` of an hour (`3,600 s`) = `300 s`. Total = `300 + 36 = 336 seconds`.',
    },
    mr: {
      q: 'एका मिनिटाचा `3/5` भाग आणि एका तासाचा `1/12` भाग मिळून एकूण किती सेकंद होतात?',
      opts: ['336 सेकंद', '300 सेकंद', '360 सेकंद', '324 सेकंद'],
      exp: '`3/5 × 60 = 36 से` आणि `1/12 × 3600 = 300 से`. एकूण `336 सेकंद`.',
    },
    hi: {
      q: 'एक मिनट का `3/5` भाग और एक घंटे का `1/12` भाग मिलकर कुल कितने सेकंड होंगे?',
      opts: ['336 सेकंड', '300 सेकंड', '360 सेकंड', '324 सेकंड'],
      exp: '`36 + 300 = 336 सेकंड`।',
    },
  },
  {
    topic: 'Percentage Fraction Reverse Whole Amount',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'If `35%` of a number is `140`, what is `50%` of that same number?',
      opts: ['200', '400', '175', '250'],
      exp: '`35% = 140` implies `1% = 4`, so `100% = 400`. Therefore `50%` of `400 = 200`.',
    },
    mr: {
      q: 'जर एका संख्येचे `35%` म्हणजे `140` असतील, तर त्याच संख्येचे `50%` किती?',
      opts: ['200', '400', '175', '250'],
      exp: '`35% = 140` ⇒ `1% = 4`, पूर्ण संख्या `400`. म्हणून `50% = 200`.',
    },
    hi: {
      q: 'यदि किसी संख्या का `35%`, `140` है, तो उसी संख्या का `50%` क्या होगा?',
      opts: ['200', '400', '175', '250'],
      exp: '`1% = 140 ÷ 35 = 4`, अतः `50% = 50 × 4 = 200`।',
    },
  },
  {
    topic: 'Angle Between Clock Hands at 9:00 vs 2:00',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What type of angle is formed between the hour hand and minute hand of a clock at `4:00`?',
      opts: ['Obtuse angle (120°)', 'Acute angle (60°)', 'Right angle (90°)', 'Reflex angle (240°)'],
      exp: 'Each hour mark represents `30°` (`360° ÷ 12`). At `4:00`, the smaller angle covers `4` spaces = `4 × 30° = 120°`, which is obtuse.',
    },
    mr: {
      q: 'घड्याळात बरोबर `4:00` वाजता तास काटा आणि मिनिट काटा यांच्यात कोणत्या प्रकारचा कोन तयार होतो?',
      opts: ['विशालकोन (120°)', 'लघुकोन (60°)', 'काटकोन (90°)', 'प्रविशाल कोन (240°)'],
      exp: 'प्रत्येक तासाचे अंतर `30°` असते; `4:00` वाजता `4 × 30° = 120°` (विशालकोन) होतो.',
    },
    hi: {
      q: 'घड़ी में ठीक `4:00` बजे घंटे की सुई और मिनट की सुई के बीच किस प्रकार का कोण बनता है?',
      opts: ['अधिक कोण (120°)', 'न्यून कोण (60°)', 'समकोण (90°)', 'प्रतिवर्ती कोण (240°)'],
      exp: 'प्रत्येक घंटे का अंतर `30°` होता है; `4` बजे `4 × 30° = 120°` (अधिक कोण) बनता है।',
    },
  },
  {
    topic: 'Ratio Boys to Girls Classroom Strength',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In a primary class of `45` students, `20` are boys and the rest are girls. What is the ratio of girls to total students in simplest form?',
      opts: ['5 : 9', '4 : 9', '5 : 4', '4 : 5'],
      exp: 'Number of girls = `45 − 20 = 25`. Ratio `25 : 45` simplifies (dividing by 5) to `5 : 9`.',
    },
    mr: {
      q: '`45` विद्यार्थ्यांच्या एका वर्गात `20` मुले व उर्वरित मुली आहेत. मुलींच्या संख्येचे एकूण विद्यार्थ्यांशी असलेले संक्षिप्त गुणोत्तर कोणते?',
      opts: ['5 : 9', '4 : 9', '5 : 4', '4 : 5'],
      exp: 'मुली = `45 − 20 = 25`. गुणोत्तर `25 : 45 = 5 : 9`.',
    },
    hi: {
      q: '`45` विद्यार्थियों की एक कक्षा में `20` लड़के और शेष लड़कियाँ हैं। लड़कियों और कुल विद्यार्थियों की संख्या का सरलतम अनुपात क्या है?',
      opts: ['5 : 9', '4 : 9', '5 : 4', '4 : 5'],
      exp: 'लड़कियाँ = `45 − 20 = 25`। अनुपात `25 : 45 = 5 : 9`।',
    },
  },
  {
    topic: 'Decimal Ordering Descending Compare',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which decimal number is the SMALLEST among `0.8`, `0.08`, `0.808`, and `0.088`?',
      opts: ['0.08', '0.088', '0.8', '0.808'],
      exp: 'Comparing thousandths: `0.080 < 0.088 < 0.800 < 0.808`. Therefore `0.08` is smallest.',
    },
    mr: {
      q: '`0.8`, `0.08`, `0.808` आणि `0.088` यांपैकी सर्वात लहान दशांश अपूर्णांक कोणता?',
      opts: ['0.08', '0.088', '0.8', '0.808'],
      exp: 'सहस्रांश तुलना: `0.080 < 0.088 < 0.800 < 0.808`. म्हणून `0.08` सर्वात लहान.',
    },
    hi: {
      q: '`0.8`, `0.08`, `0.808` और `0.088` में से सबसे छोटी दशमलव संख्या कौन-सी है?',
      opts: ['0.08', '0.088', '0.8', '0.808'],
      exp: '`0.080 < 0.088 < 0.800 < 0.808`, अतः `0.08` सबसे छोटी है।',
    },
  },
  {
    topic: 'Symmetry Alphabet Capital Letters Vertical & Horizontal',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following capital English letters has BOTH a horizontal line of symmetry AND a vertical line of symmetry?',
      opts: ['H', 'A', 'E', 'T'],
      exp: '`A` and `T` have only vertical symmetry; `E` has only horizontal symmetry; `H` has both vertical and horizontal symmetry.',
    },
    mr: {
      q: 'पुढीलपैकी कोणत्या इंग्रजी मोठ्या अक्षराला उभा आणि आडवा असे दोन्ही सममितीचे अक्ष असतात?',
      opts: ['H', 'A', 'E', 'T'],
      exp: '`A` व `T` ला फक्त उभा, `E` ला फक्त आडवा, तर `H` ला उभा व आडवा असे दोन्ही अक्ष असतात.',
    },
    hi: {
      q: 'निम्न में से किस बड़े अंग्रेजी अक्षर में ऊर्ध्वाधर और क्षैतिज दोनों सममिति रेखाएँ होती हैं?',
      opts: ['H', 'A', 'E', 'T'],
      exp: '`H` में ऊर्ध्वाधर तथा क्षैतिज दोनों सममिति अक्ष होते हैं।',
    },
  },
  {
    topic: 'Word Problem Age Sum After Five Years',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Today, a mother is `32` years old and her daughter is `8` years old. After how many years will the mother’s age be exactly THREE times her daughter’s age?',
      opts: ['4 years', '6 years', '5 years', '8 years'],
      exp: 'Let `x` years pass: `32 + x = 3(8 + x) = 24 + 3x` ⇒ `2x = 8` ⇒ `x = 4 years` (`36` and `12`).',
    },
    mr: {
      q: 'सध्या आईचे वय `32` वर्षे व मुलीचे वय `8` वर्षे आहे. किती वर्षांनंतर आईचे वय मुलीच्या वयाच्या बरोबर तिप्पट होईल?',
      opts: ['4 वर्षे', '6 वर्षे', '5 वर्षे', '8 वर्षे'],
      exp: '`4` वर्षांनी आई `36` वर्षांची व मुलगी `12` वर्षांची होईल (`12 × 3 = 36`).',
    },
    hi: {
      q: 'वर्तमान में माँ की आयु `32` वर्ष और बेटी की आयु `8` वर्ष है। कितने वर्षों बाद माँ की आयु बेटी की आयु की ठीक तीन गुनी हो जाएगी?',
      opts: ['4 वर्ष', '6 वर्ष', '5 वर्ष', '8 वर्ष'],
      exp: '`4` वर्ष बाद माँ `36` वर्ष और बेटी `12` वर्ष की होगी (`12 × 3 = 36`)।',
    },
  },
  {
    topic: 'Unit Conversion Square Metres to Square Centimetres',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many square centimetres (`sq cm`) are equal to `1.5 square metres`?',
      opts: ['15,000 sq cm', '1,500 sq cm', '150 sq cm', '1,50,000 sq cm'],
      exp: '`1 m = 100 cm`, so `1 sq m = 100 × 100 = 10,000 sq cm`. Thus `1.5 sq m = 1.5 × 10,000 = 15,000 sq cm`.',
    },
    mr: {
      q: '`1.5 चौरस मीटर` म्हणजे किती चौरस सेंटीमीटर (`चौ.सेमी.`)?',
      opts: ['15,000 चौ.सेमी.', '1,500 चौ.सेमी.', '150 चौ.सेमी.', '1,50,000 चौ.सेमी.'],
      exp: '`1 चौ.मी. = 100 × 100 = 10,000 चौ.सेमी.`, म्हणून `1.5 × 10,000 = 15,000 चौ.सेमी.`.',
    },
    hi: {
      q: '`1.5 वर्ग मीटर` कितने वर्ग सेंटीमीटर (`वर्ग सेमी`) के बराबर होता है?',
      opts: ['15,000 वर्ग सेमी', '1,500 वर्ग सेमी', '150 वर्ग सेमी', '1,50,000 वर्ग सेमी'],
      exp: '`1 वर्ग मी = 10,000 वर्ग सेमी`, अतः `1.5 × 10,000 = 15,000 वर्ग सेमी`।',
    },
  },
];
