import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 2 (28 unique Classes 1-5 fractions, decimals, geometry & mensuration Qs)
export const MAHA_TET_P1_B2_MATH_C2: CuratedTrilingualMcq[] = [
  {
    topic: 'Fraction Word Problem School Library Books',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'In a primary library, `3/8` of the books are Marathi stories, `1/4` are science picture books, and the remaining `45` are mathematics puzzle books. How many books are in the library altogether?',
      opts: ['120 books', '96 books', '144 books', '108 books'],
      exp: 'Marathi + Science = `3/8 + 2/8 = 5/8`. Remaining `3/8 = 45`, so total = `45 × 8 ÷ 3 = 120` books.',
    },
    mr: {
      q: 'एका प्राथमिक ग्रंथालयातील एकूण पुस्तकांपैकी `3/8` मराठी गोष्टींची, `1/4` विज्ञान चित्रांची आणि उरलेली `45` गणिताच्या कोड्यांची पुस्तके आहेत, तर ग्रंथालयात एकूण किती पुस्तके आहेत?',
      opts: ['120 पुस्तके', '96 पुस्तके', '144 पुस्तके', '108 पुस्तके'],
      exp: 'मराठी + विज्ञान = `3/8 + 2/8 = 5/8`. उरलेले `3/8 = 45` ⇒ एकूण = `45 × 8 ÷ 3 = 120` पुस्तके.',
    },
    hi: {
      q: 'एक विद्यालय पुस्तकालय में `3/8` पुस्तकें कहानियों की, `1/4` विज्ञान की और शेष `45` गणित पहेलियों की हैं। कुल कितनी पुस्तकें हैं?',
      opts: ['120 पुस्तकें', '96 पुस्तकें', '144 पुस्तकें', '108 पुस्तकें'],
      exp: 'शेष भाग `1 − (3/8 + 2/8) = 3/8 = 45` ⇒ कुल = `120` पुस्तकें।',
    },
  },
  {
    topic: 'Decimal Division Ribbon Cutting',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A satin craft ribbon is `14.4 m` long. If each bookmark requires `0.45 m`, how many bookmarks can be cut completely?',
      opts: ['32 bookmarks', '30 bookmarks', '36 bookmarks', '28 bookmarks'],
      exp: '`14.4 ÷ 0.45 = 1,440 ÷ 45 = 32` bookmarks.',
    },
    mr: {
      q: '`14.4 मी` लांब रिबिनमधून प्रत्येकी `0.45 मी` लांबीचे किती बुकमार्क्स कापता येतील?',
      opts: ['32 बुकमार्क्स', '30 बुकमार्क्स', '36 बुकमार्क्स', '28 बुकमार्क्स'],
      exp: '`14.4 ÷ 0.45 = 1,440 ÷ 45 = 32`.',
    },
    hi: {
      q: '`14.4 मी` लंबे रिबन से `0.45 मी` लंबाई के कितने बुकमार्क काटे जा सकते हैं?',
      opts: ['32 बुकमार्क', '30 बुकमार्क', '36 बुकमार्क', '28 बुकमार्क'],
      exp: '`14.4 ÷ 0.45 = 1,440 ÷ 45 = 32`।',
    },
  },
  {
    topic: 'LCM Remainder + Same Excess Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Difficult',
    en: {
      q: 'Find the smallest positive number greater than `5` which, when divided by `8`, `12`, or `15`, leaves a remainder of `5` in every case:',
      opts: ['125', '115', '245', '65'],
      exp: '`LCM(8, 12, 15) = 120`. Adding remainder `5` gives `120 + 5 = 125`.',
    },
    mr: {
      q: '`5` पेक्षा मोठी अशी सर्वात लहान संख्या कोणती की जिला `8, 12` किंवा `15` ने भागल्यास प्रत्येक वेळी बाकी `5` उरते?',
      opts: ['125', '115', '245', '65'],
      exp: '`लसावि(8, 12, 15) = 120`. त्यामध्ये `5` मिळवून `120 + 5 = 125` मिळते.',
    },
    hi: {
      q: '`5` से बड़ी वह सबसे छोटी संख्या कौन-सी है जिसे `8, 12` या `15` से भाग देने पर प्रत्येक स्थिति में `5` शेष बचे?',
      opts: ['125', '115', '245', '65'],
      exp: '`ल.स.(8, 12, 15) = 120` ⇒ `120 + 5 = 125`।',
    },
  },
  {
    topic: '2D Cube Net Opposite Faces Logic',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'On a standard numbered die where opposite faces ALWAYS sum to `7`, if `2` sits on top and `4` faces you directly in front, what number sits on the face to the RIGHT (opposite left)? Let us simplify: Which sum equals the top-bottom sum plus front-back sum of opposite faces?',
      opts: ['14', '7', '12', '21'],
      exp: 'Every opposite pair on a standard die sums to `7`. Two opposite pairs sum to `7 + 7 = 14`.',
    },
    mr: {
      q: 'एका मानक फाशाच्या समोरासमोरील पृष्ठांची बेरीज नेहमी `7` असते. तर तळाचा पृष्ठ व वरचा पृष्ठ यांची बेरीज अधिक समोरचा व मागचा पृष्ठ यांची बेरीज एकूण किती होते?',
      opts: ['14', '7', '12', '21'],
      exp: 'प्रत्येक विरुद्ध जोडीची बेरीज `7` असल्याने दोन जोड्यांची बेरीज `7 + 7 = 14` होते.',
    },
    hi: {
      q: 'एक मानक पासे के विपरीत फलकों का योग हमेशा `7` होता है। ऊपरी-निचले फलकों के योग तथा सामने-पीछे वाले फलकों के योग का कुल जोड़ कितना होगा?',
      opts: ['14', '7', '12', '21'],
      exp: 'दो विपरीत जोड़ियों का योग `7 + 7 = 14` होता है।',
    },
  },
  {
    topic: 'Rectangle Sides Doubled Area Effect',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If the length of a rectangle is doubled and its breadth is halved simultaneously, what happens to its area?',
      opts: [
        'It remains exactly unchanged',
        'It doubles',
        'It becomes half',
        'It becomes four times larger',
      ],
      exp: 'New area = `(2l) × (b/2) = l × b`, identical to the original area.',
    },
    mr: {
      q: 'एका आयताची लांबी दुप्पट केली आणि रुंदी निम्मी केली, तर त्याच्या क्षेत्रफळात कोणता बदल होईल?',
      opts: [
        'क्षेत्रफळ पूर्वीइतकेच (कायम) राहील',
        'क्षेत्रफळ दुप्पट होईल',
        'क्षेत्रफळ निम्मे होईल',
        'क्षेत्रफळ चौपट होईल',
      ],
      exp: 'नवीन क्षेत्रफळ = `(2l) × (b/2) = l × b`, म्हणजेच कोणताही बदल होत नाही.',
    },
    hi: {
      q: 'यदि किसी आयत की लंबाई दोगुनी तथा चौड़ाई आधी कर दी जाए, तो उसके क्षेत्रफल पर क्या प्रभाव पड़ेगा?',
      opts: [
        'क्षेत्रफल अपरिवर्तित (समान) रहेगा',
        'दोगुना हो जाएगा',
        'आधा हो जाएगा',
        'चार गुना हो जाएगा',
      ],
      exp: 'नया क्षेत्रफल = `(2l) × (b/2) = l × b`, अर्थात समान रहेगा।',
    },
  },
  {
    topic: 'Ratio & Proportion Sharing ₹1,260',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A prize of `₹1,260` is shared between Meera and Kabir in the ratio `4 : 5`. How many rupees more does Kabir receive than Meera?',
      opts: ['₹140', '₹560', '₹700', '₹280'],
      exp: 'Total parts = `4 + 5 = 9`; each part = `1,260 ÷ 9 = ₹140`. Difference = `5 − 4 = 1 part = ₹140`.',
    },
    mr: {
      q: '`₹1,260` चे बक्षीस मीरा आणि कबीर यांच्यात `4 : 5` या प्रमाणात वाटल्यास कबीरला मीरापेक्षा किती रुपये जास्त मिळतील?',
      opts: ['₹140', '₹560', '₹700', '₹280'],
      exp: 'एकूण भाग = `4 + 5 = 9`; `1 भाग = 1,260 ÷ 9 = ₹140`. फरक = `(5 − 4) × 140 = ₹140`.',
    },
    hi: {
      q: '`₹1,260` की पुरस्कार राशि मीरा और कबीर में `4 : 5` के अनुपात में बाँटी गई। कबीर को मीरा से कितने रुपये अधिक मिले?',
      opts: ['₹140', '₹560', '₹700', '₹280'],
      exp: '`1 भाग = 1,260 ÷ 9 = ₹140`। अंतर = `(5 − 4) × 140 = ₹140`।',
    },
  },
  {
    topic: 'Pictograph Data Reading Scale Multiplication',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In a school tree-plantation pictograph, `1` tree symbol represents `15` saplings. Village A shows `6` full symbols and Village B shows `4.5` symbols (half symbol allowed for half of 15? Better use `1` symbol = `20` saplings: Village A `5` symbols, Village B `3.5` symbols!). Let us ask cleanly: If `1` tree symbol represents `20` saplings, how many MORE saplings did Class 5 (`6` symbols) plant than Class 3 (`3` full symbols and `1` half symbol)?',
      opts: ['50 saplings', '70 saplings', '60 saplings', '40 saplings'],
      exp: 'Class 5 = `6 × 20 = 120`; Class 3 = `3.5 × 20 = 70`. Difference = `120 − 70 = 50` saplings.',
    },
    mr: {
      q: 'एका चित्रालेखात `1` झाडाचे चिन्ह `20` रोपे दर्शवते. इयत्ता पाचवीपुढे `6` पूर्ण चिन्हे व इयत्ता तिसरीपुढे `3` पूर्ण व `1` अर्धे चिन्ह असेल, तर पाचवीने तिसरीपेक्षा किती रोपे जास्त लावली?',
      opts: ['50 रोपे', '70 रोपे', '60 रोपे', '40 रोपे'],
      exp: 'पाचवी = `6 × 20 = 120`; तिसरी = `3.5 × 20 = 70`. फरक = `120 − 70 = 50` रोपे.',
    },
    hi: {
      q: 'एक चित्रालेख में `1` वृक्ष प्रतीक `20` पौधे दर्शाता है। कक्षा 5 के सामने `6` पूर्ण प्रतीक और कक्षा 3 के सामने `3` पूर्ण व `1` आधा प्रतीक है। कक्षा 5 ने कक्षा 3 से कितने अधिक पौधे लगाए?',
      opts: ['50 पौधे', '70 पौधे', '60 पौधे', '40 पौधे'],
      exp: 'कक्षा 5 = `120`, कक्षा 3 = `70`। अंतर = `120 − 70 = 50` पौधे।',
    },
  },
  {
    topic: 'Coin Combinations ₹1, ₹2, ₹5 Equal Count',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A piggy bank holds EQUAL numbers of `₹1`, `₹2`, and `₹5` coins totaling `₹240` altogether. How many `₹5` coins are in the piggy bank?',
      opts: ['30 coins', '24 coins', '40 coins', '15 coins'],
      exp: 'One set of three coins (`1 + 2 + 5`) = `₹8`. Number of sets = `240 ÷ 8 = 30`, so there are `30` coins of `₹5`.',
    },
    mr: {
      q: 'एका गल्ल्यात `₹1`, `₹2` व `₹5` ची *समान* संख्येने नाणी असून त्यांची एकूण रक्कम `₹240` आहे, तर त्यात `₹5` ची किती नाणी आहेत?',
      opts: ['30 नाणी', '24 नाणी', '40 नाणी', '15 नाणी'],
      exp: 'प्रत्येकी १ नाण्याचा संच = `1 + 2 + 5 = ₹8`. संच संख्या = `240 ÷ 8 = 30`, म्हणून `₹5` ची `30` नाणी आहेत.',
    },
    hi: {
      q: 'एक गुल्लक में `₹1`, `₹2` और `₹5` के *समान* संख्या में सिक्के हैं जिनका कुल मूल्य `₹240` है। उसमें `₹5` के कितने सिक्के हैं?',
      opts: ['30 सिक्के', '24 सिक्के', '40 सिक्के', '15 सिक्के'],
      exp: 'एक सेट (`1+2+5 = ₹8`)। कुल सेट = `240 ÷ 8 = 30` सिक्के।',
    },
  },
  {
    topic: 'Speed Distance Time School Bus Trip',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A picnic bus travels smoothly at `48 km/hour`. How far does it travel in `2 hours 15 minutes`?',
      opts: ['108 km', '96 km', '112 km', '104 km'],
      exp: '`2 h 15 m = 2.25 h`. Distance = `48 × 2.25 = 96 + 12 = 108 km`.',
    },
    mr: {
      q: 'सहलीची बस ताशी `48 किमी` वेगाने धावते, तर `2 तास 15 मिनिटांत` ती किती अंतर पार करेल?',
      opts: ['108 किमी', '96 किमी', '112 किमी', '104 किमी'],
      exp: '`2 तासांत 96 किमी` आणि `15 मिनिटांत (1/4 तासात) 12 किमी`. एकूण = `96 + 12 = 108 किमी`.',
    },
    hi: {
      q: 'एक बस `48 किमी/घंटा` की चाल से `2 घंटे 15 मिनट` में कितनी दूरी तय करेगी?',
      opts: ['108 किमी', '96 किमी', '112 किमी', '104 किमी'],
      exp: '`48 × 2.25 = 108 किमी`।',
    },
  },
  {
    topic: 'Factors Count of Composite Number 72',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'How many total positive factors (divisors, including `1` and `72`) does the number `72` have?',
      opts: ['12 factors', '10 factors', '8 factors', '14 factors'],
      exp: 'Factors of 72: `1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72` — a total of `12` (`72 = 2³ × 3²`, so `(3+1)(2+1) = 12`).',
    },
    mr: {
      q: '`72` या संख्येचे (`1` आणि `72` धरून) एकूण विभाजक / अवयव किती आहेत?',
      opts: ['12 विभाजक', '10 विभाजक', '8 विभाजक', '14 विभाजक'],
      exp: '`72` चे विभाजक: `1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72` असे एकूण `12` आहेत.',
    },
    hi: {
      q: 'संख्या `72` के (`1` और `72` सहित) कुल कितने धनात्मक गुणनखंड (भाजक) हैं?',
      opts: ['12 गुणनखंड', '10 गुणनखंड', '8 गुणनखंड', '14 गुणनखंड'],
      exp: '`72 = 2³ × 3²` ⇒ कुल गुणनखंड = `(3+1)(2+1) = 12`।',
    },
  },
  {
    topic: 'Symmetry Letters of English Alphabet',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which uppercase English alphabet letter below shows BOTH a vertical AND a horizontal line of symmetry (`2` lines)?',
      opts: ['H', 'M', 'E', 'F'],
      exp: '`H` folds symmetrically left-right AND top-bottom; `M` has vertical only; `E` has horizontal only; `F` has none.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या इंग्रजी मोठ्या अक्षरामध्ये उभी आणि आडवी अशी दोन्ही सममिती रेषा (`2` रेषा) असतात?',
      opts: ['H', 'M', 'E', 'F'],
      exp: '`H` अक्षरात उभी व आडवी दोन्ही सममिती रेषा आहेत (`M`: फक्त उभी, `E`: फक्त आडवी, `F`: शून्य).',
    },
    hi: {
      q: 'निम्नलिखित में से किस बड़े अंग्रेजी अक्षर में ऊर्ध्वाधर और क्षैतिज दोनों सममिति रेखाएँ (`2` रेखाएँ) होती हैं?',
      opts: ['H', 'M', 'E', 'F'],
      exp: '`H` में ऊर्ध्वाधर व क्षैतिज दोनों सममिति अक्ष मौजूद हैं।',
    },
  },
  {
    topic: 'Indian Place Value Crores & Lakhs Equivalence',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many thousands make `1` lakh, and how many lakhs make `1` crore?',
      opts: ['100 thousands and 100 lakhs', '10 thousands and 100 lakhs', '1,000 thousands and 10 lakhs', '100 thousands and 10 lakhs'],
      exp: '`1,00,000 = 100 × 1,000` (100 thousands), and `1,00,00,000 = 100 × 1,00,000` (100 lakhs).',
    },
    mr: {
      q: '`1` लाख म्हणजे किती हजार, आणि `1` कोटी म्हणजे किती लाख?',
      opts: ['100 हजार आणि 100 लाख', '10 हजार आणि 100 लाख', '1,000 हजार आणि 10 लाख', '100 हजार आणि 10 लाख'],
      exp: '`1,00,000 = 100 हजार` आणि `1,00,00,000 = 100 लाख`.',
    },
    hi: {
      q: '`1` लाख में कितने हजार होते हैं तथा `1` करोड़ में कितने लाख होते हैं?',
      opts: ['100 हजार और 100 लाख', '10 हजार और 100 लाख', '1,000 हजार और 10 लाख', '100 हजार और 10 लाख'],
      exp: '`1 लाख = 100 हजार` तथा `1 करोड़ = 100 लाख`।',
    },
  },
  {
    topic: 'Square Number Pattern Difference of Consecutive Squares',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'What is the value of `26² − 25²` using quick number-sense symmetry?',
      opts: ['51', '25', '1', '50'],
      exp: 'Difference of two consecutive squares `(n+1)² − n² = (n+1) + n = 26 + 25 = 51`.',
    },
    mr: {
      q: 'झटपट युक्तीने `26² − 25²` ची किंमत काढा:',
      opts: ['51', '25', '1', '50'],
      exp: 'दोन क्रमवार वर्ग संख्यांतील फरक हा त्यांच्या बेरजेइतका असतो: `26 + 25 = 51`.',
    },
    hi: {
      q: 'त्वरित संख्या-समझ से `26² − 25²` का मान निकालिए:',
      opts: ['51', '25', '1', '50'],
      exp: 'दो क्रमागत वर्गों का अंतर `(26 + 25)(26 − 25) = 51`।',
    },
  },
  {
    topic: 'Perimeter & Area Given Square Garden Perimeter',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'The wire fence around a square vegetable plot measures `76 m` in total. What is the area of the plot?',
      opts: ['361 sq m', '324 sq m', '400 sq m', '190 sq m'],
      exp: 'Side = `76 ÷ 4 = 19 m`. Area = `19 × 19 = 361 sq m`.',
    },
    mr: {
      q: 'एका चौरसाकृती परसबागेभोवतीच्या तारेच्या कुंपणाची एकूण लांबी `76 मी` आहे, तर बागेचे क्षेत्रफळ किती?',
      opts: ['361 चौ.मी', '324 चौ.मी', '400 चौ.मी', '190 चौ.मी'],
      exp: 'बाजू = `76 ÷ 4 = 19 मी`. क्षेत्रफळ = `19 × 19 = 361 चौ.मी`.',
    },
    hi: {
      q: 'एक वर्गाकार क्यारी के चारों ओर बाड़ की कुल लंबाई `76 मी` है। इस क्यारी का क्षेत्रफल कितना होगा?',
      opts: ['361 वर्ग मी', '324 वर्ग मी', '400 वर्ग मी', '190 वर्ग मी'],
      exp: 'भुजा = `76 ÷ 4 = 19 मी`। क्षेत्रफल = `19² = 361 वर्ग मी`।',
    },
  },
  {
    topic: 'Fractions Product Multiplication Mixed Numbers',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A cow yields `3 whole 1/2 litres` (`3½ L`) of milk every morning and `2 whole 1/4 litres` (`2¼ L`) every evening. How many litres does she yield in `4` days?',
      opts: ['23 litres', '22 litres', '24 litres', '21 litres'],
      exp: 'Daily milk = `3.5 + 2.25 = 5.75 L`. Over 4 days = `4 × 5.75 = 23 litres`.',
    },
    mr: {
      q: 'एक गाय दररोज सकाळी `3½ लिटर` व संध्याकाळी `2¼ लिटर` दूध देते, तर `4` दिवसांत ती एकूण किती लिटर दूध देईल?',
      opts: ['23 लिटर', '22 लिटर', '24 लिटर', '21 लिटर'],
      exp: 'दररोज = `3.5 + 2.25 = 5.75 लिटर`. `4 × 5.75 = 23 लिटर`.',
    },
    hi: {
      q: 'एक गाय प्रतिदिन सुबह `3½ लीटर` और शाम को `2¼ लीटर` दूध देती है। `4` दिनों में कुल कितने लीटर दूध मिलेगा?',
      opts: ['23 लीटर', '22 लीटर', '24 लीटर', '21 लीटर'],
      exp: 'दैनिक = `5.75 लीटर`। `4 × 5.75 = 23 लीटर`।',
    },
  },
  {
    topic: 'Clock Angle Hand Movement 3:30 Sharp',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'At exactly `3:30`, what is the acute angle between the hour hand and the minute hand on an analog clock?',
      opts: ['75°', '90°', '60°', '85°'],
      exp: 'At `3:30`, minute hand is at `6` (`180°`). Hour hand is halfway between `3` and `4` (`3.5 × 30° = 105°`). Angle = `180° − 105° = 75°`.',
    },
    mr: {
      q: 'घड्याळात बरोबर `3:30` वाजता तासकाटा आणि मिनिटकाटा यांच्यातील लघुकोनाचे माप किती अंश असते?',
      opts: ['75°', '90°', '60°', '85°'],
      exp: 'मिनिटकाटा `6` वर (`180°`) आणि तासकाटा `3` व `4` च्या मध्यभागी (`105°`) असतो. फरक = `180° − 105° = 75°`.',
    },
    hi: {
      q: 'ठीक `3:30` बजे घड़ी की घंटे और मिनट की सुई के बीच कितने डिग्री का न्यूनकोण बनता है?',
      opts: ['75°', '90°', '60°', '85°'],
      exp: '`180° − (3.5 × 30°) = 180° − 105° = 75°`।',
    },
  },
  {
    topic: '3D Geometry Triangular Prism Edges Faces Vertices',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many edges (`E`) and vertices (`V`) does a solid triangular prism (with two triangular ends and three rectangular sides) have?',
      opts: ['9 edges and 6 vertices', '6 edges and 4 vertices', '12 edges and 8 vertices', '8 edges and 5 vertices'],
      exp: 'A triangular prism has `5` faces, `9` edges (`3 + 3 + 3`), and `6` vertices (`V − E + F = 6 − 9 + 5 = 2`).',
    },
    mr: {
      q: 'एका त्रिकोणी चितीला (Triangular prism — दोन त्रिकोणी बाजू व तीन आयताकृती पृष्ठे) एकूण किती कडा (`E`) आणि किती शिरोबिंदू (`V`) असतात?',
      opts: ['9 कडा व 6 शिरोबिंदू', '6 कडा व 4 शिरोबिंदू', '12 कडा व 8 शिरोबिंदू', '8 कडा व 5 शिरोबिंदू'],
      exp: 'त्रिकोणी चितीला `5` पृष्ठे, `9` कडा आणि `6` शिरोबिंदू असतात.',
    },
    hi: {
      q: 'एक त्रिभुजाकार प्रिज्म में कुल कितने किनारे (`E`) और कितने शीर्ष (`V`) होते हैं?',
      opts: ['9 किनारे और 6 शीर्ष', '6 किनारे और 4 शीर्ष', '12 किनारे और 8 शीर्ष', '8 किनारे और 5 शीर्ष'],
      exp: 'त्रिभुजाकार प्रिज्म में `5` फलक, `9` किनारे और `6` शीर्ष होते हैं।',
    },
  },
  {
    topic: 'Handshakes / Pairwise Matches Formula',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'During a village kabaddi tournament, `7` school teams play exactly one match against every other team. How many total matches are played?',
      opts: ['21 matches', '42 matches', '14 matches', '28 matches'],
      exp: 'Total unique pairs = `7 × 6 ÷ 2 = 21` matches.',
    },
    mr: {
      q: 'गावातील कबड्डी स्पर्धेत `7` शाळांच्या संघांनी प्रत्येक इतर संघाशी बरोबर एक-एक सामना खेळला, तर एकूण किती सामने झाले?',
      opts: ['21 सामने', '42 सामने', '14 सामने', '28 सामने'],
      exp: 'एकूण सामने = `7 × 6 ÷ 2 = 21`.',
    },
    hi: {
      q: 'एक कबड्डी प्रतियोगिता में `7` टीमें प्रत्येक अन्य टीम से ठीक एक बार खेलती हैं। कुल कितने मैच खेले जाएँगे?',
      opts: ['21 मैच', '42 मैच', '14 मैच', '28 मैच'],
      exp: '`7 × 6 ÷ 2 = 21` मैच।',
    },
  },
  {
    topic: 'Decimal Nearest Hundredth Rounding',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is `47.386` rounded correctly to the nearest hundredth (two decimal places)?',
      opts: ['47.39', '47.38', '47.40', '47.30'],
      exp: 'The thousandths digit is `6` (`>= 5`), so the hundredths digit `8` rounds up to `9`: `47.39`.',
    },
    mr: {
      q: '`47.386` ही संख्या दशांश चिन्हानंतरच्या दोन घरांपर्यंत (शतांश स्थानी) अंदाजित केल्यास काय येईल?',
      opts: ['47.39', '47.38', '47.40', '47.30'],
      exp: 'सहस्रांश स्थानी `6` (`>= 5`) असल्याने शतांश `8` चा `9` होऊन `47.39` मिळते.',
    },
    hi: {
      q: '`47.386` को निकटतम शतांश (दशमलव के दो स्थानों) तक सन्निकटित करने पर मान क्या होगा?',
      opts: ['47.39', '47.38', '47.40', '47.30'],
      exp: 'तीसरे स्थान पर `6` (`>= 5`) होने से `47.39` प्राप्त होता है।',
    },
  },
  {
    topic: 'Odd vs Even Sum & Product Parity',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'If `p` is an odd counting number and `q` is an even counting number, which expression MUST always yield an ODD number?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p'],
      exp: 'Since `q` is even, `q + 1` is odd. Product of two odd numbers (`p × (q + 1)`) is always odd!',
    },
    mr: {
      q: 'जर `p` ही विषम संख्या आणि `q` ही सम संख्या असेल, तर खालीलपैकी कोणती राशी नेहमीच "विषम" संख्या देईल?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p'],
      exp: '`q` सम असल्याने `q + 1` विषम होते. दोन विषम संख्यांचा गुणाकार `p × (q + 1)` नेहमी विषम असतो.',
    },
    hi: {
      q: 'यदि `p` एक विषम संख्या और `q` एक सम संख्या है, तो इनमें से कौन-सा व्यंजक सदैव विषम होगा?',
      opts: ['p × (q + 1)', 'p × q', '2p + q', 'p + p'],
      exp: '`q + 1` विषम है, और दो विषम संख्याओं का गुणनफल सदैव विषम होता है।',
    },
  },
  {
    topic: 'Age Puzzle Present vs Five Years Hence',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Currently a father is `36` years old and his daughter is `8` years old. In how many years will the father be exact `3` times as old as his daughter?',
      opts: ['6 years', '4 years', '8 years', '5 years'],
      exp: 'Let `x` years pass: `36 + x = 3(8 + x)` → `36 + x = 24 + 3x` → `2x = 12` → `x = 6` years (ages `42` and `14`).',
    },
    mr: {
      q: 'सध्या वडिलांचे वय `36` वर्षे आणि मुलीचे वय `8` वर्षे आहे. आणखी किती वर्षांनी वडिलांचे वय मुलीच्या वयाच्या बरोबर `3` पट होईल?',
      opts: ['6 वर्षांनी', '4 वर्षांनी', '8 वर्षांनी', '5 वर्षांनी'],
      exp: '`6` वर्षांनी वडील `42` व मुलगी `14` वर्षांची होईल (`14 × 3 = 42`).',
    },
    hi: {
      q: 'वर्तमान में पिता की आयु `36` वर्ष और पुत्री की `8` वर्ष है। कितने वर्षों बाद पिता की आयु पुत्री की ठीक `3` गुनी हो जाएगी?',
      opts: ['6 वर्ष', '4 वर्ष', '8 वर्ष', '5 वर्ष'],
      exp: '`6` वर्ष बाद `42` व `14` वर्ष (`14 × 3 = 42`) होंगे।',
    },
  },
  {
    topic: 'Simple Interest Annual Savings Account',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A women’s self-help group deposits `₹4,500` in a cooperative bank paying `8%` simple interest per annum. What total amount (Principal + Interest) will they receive after `2` years?',
      opts: ['₹5,220', '₹720', '₹4,860', '₹5,400'],
      exp: 'SI = `(4,500 × 8 × 2) ÷ 100 = ₹720`. Total amount = `4,500 + 720 = ₹5,220`.',
    },
    mr: {
      q: 'एका महिला बचतगटाने सहकारी बँकेत द.सा.द.शे. `8%` सरळव्याजाने `₹4,500` ठेवले, तर `2` वर्षांनंतर त्यांना व्याजासह एकूण किती रास मिळेल?',
      opts: ['₹5,220', '₹720', '₹4,860', '₹5,400'],
      exp: 'सरळव्याज = `(4,500 × 8 × 2) ÷ 100 = ₹720`. रास = `4,500 + 720 = ₹5,220`.',
    },
    hi: {
      q: 'एक बचत समूह ने `₹4,500` सहकारी बैंक में `8%` वार्षिक साधारण ब्याज पर जमा किए। `2` वर्ष बाद कुल मिश्रधन कितना मिलेगा?',
      opts: ['₹5,220', '₹720', '₹4,860', '₹5,400'],
      exp: 'ब्याज = `₹720`; मिश्रधन = `4,500 + 720 = ₹5,220`।',
    },
  },
  {
    topic: 'Temperature Range Morning to Noon Rise',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In January, Mahabaleshwar recorded `6.5°C` at dawn and `22.3°C` at afternoon peak. How many degrees Celsius did the temperature rise?',
      opts: ['15.8°C', '16.2°C', '15.2°C', '14.8°C'],
      exp: '`22.3 − 6.5 = 15.8°C`.',
    },
    mr: {
      q: 'जानेवारीत महाबळेश्वरचे पहाटेचे तापमान `6.5°C` आणि दुपारचे कमाल तापमान `22.3°C` नोंदवले गेले, तर तापमानात किती अंश सेल्सिअसची वाढ झाली?',
      opts: ['15.8°C', '16.2°C', '15.2°C', '14.8°C'],
      exp: '`22.3 − 6.5 = 15.8°C`.',
    },
    hi: {
      q: 'महाबलेश्वर में भोर का तापमान `6.5°C` तथा दोपहर का `22.3°C` दर्ज हुआ। तापमान में कितने डिग्री की वृद्धि हुई?',
      opts: ['15.8°C', '16.2°C', '15.2°C', '14.8°C'],
      exp: '`22.3 − 6.5 = 15.8°C`।',
    },
  },
  {
    topic: 'Square Floor Tile Fitting Count Exact Fit',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A classroom floor measuring `9 m × 6 m` is to be paved completely without cutting tiles using square tiles of side `30 cm`. How many tiles are required?',
      opts: ['600 tiles', '300 tiles', '900 tiles', '450 tiles'],
      exp: 'Floor = `900 cm × 600 cm = 540,000 sq cm`. Each tile = `30 × 30 = 900 sq cm`. Count = `540,000 ÷ 900 = 600` (`30 × 20 = 600`).',
    },
    mr: {
      q: '`9 मी × 6 मी` मापाच्या वर्गखोलीत `30 सेमी` बाजूच्या चौरसाकृती फरशा न कापता पूर्ण बसवायच्या आहेत, तर एकूण किती फरशा लागतील?',
      opts: ['600 फरशा', '300 फरशा', '900 फरशा', '450 फरशा'],
      exp: '`900 ÷ 30 = 30` रांगा व `600 ÷ 30 = 20` फरशा. एकूण = `30 × 20 = 600` फरशा.',
    },
    hi: {
      q: '`9 मी × 6 मी` फर्श पर `30 सेमी` भुजा वाली वर्गाकार टाइलें बिना काटे लगानी हैं। कुल कितनी टाइलें लगेंगी?',
      opts: ['600 टाइलें', '300 टाइलें', '900 टाइलें', '450 टाइलें'],
      exp: '`(900÷30) × (600÷30) = 30 × 20 = 600` टाइलें।',
    },
  },
  {
    topic: 'Number Divisible by 2, 3, 5 Simultaneously',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which is the smallest 3-digit number exactly divisible by `2`, `3`, and `5` simultaneously?',
      opts: ['120', '105', '150', '100'],
      exp: '`LCM(2, 3, 5) = 30`. Smallest 3-digit multiple of `30` is `120`.',
    },
    mr: {
      q: '`2, 3` आणि `5` या तिन्ही संख्यांनी एकाच वेळी नि:शेष भाग जाणारी सर्वात लहान ३-अंकी संख्या कोणती?',
      opts: ['120', '105', '150', '100'],
      exp: '`लसावि(2, 3, 5) = 30`. `30` च्या पटीतील सर्वात लहान ३-अंकी संख्या `120` आहे.',
    },
    hi: {
      q: '`2, 3` और `5` तीनों से एक साथ विभाजित होने वाली सबसे छोटी ३-अंकीय संख्या कौन-सी है?',
      opts: ['120', '105', '150', '100'],
      exp: '`ल.स.(2,3,5) = 30`; सबसे छोटा ३-अंकीय गुणज `120` है।',
    },
  },
  {
    topic: 'Mean of Five Consecutive Even Numbers',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'The sum of `5` consecutive even numbers is `130`. What is the largest of these five numbers?',
      opts: ['30', '28', '32', '26'],
      exp: 'Middle number (mean) = `130 ÷ 5 = 26`. Five numbers are `22, 24, 26, 28, 30`. Largest = `30`.',
    },
    mr: {
      q: '`5` क्रमवार सम संख्यांची बेरीज `130` आहे, तर त्यांतील सर्वात मोठी संख्या कोणती?',
      opts: ['30', '28', '32', '26'],
      exp: 'मधली संख्या (सरासरी) = `130 ÷ 5 = 26`. संख्या = `22, 24, 26, 28, 30`. सर्वात मोठी = `30`.',
    },
    hi: {
      q: '`5` क्रमागत सम संख्याओं का योग `130` है। इनमें सबसे बड़ी संख्या कौन-सी है?',
      opts: ['30', '28', '32', '26'],
      exp: 'मध्य संख्या = `130 ÷ 5 = 26` ⇒ संख्याएँ `22, 24, 26, 28, 30`; सबसे बड़ी `30`।',
    },
  },
  {
    topic: 'Fractions Reciprocal Division Bakery Sugar',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'How many small jars holding `3/8 kg` of honey each can be filled from a container holding `6 kg` of honey?',
      opts: ['16 jars', '12 jars', '18 jars', '24 jars'],
      exp: '`6 ÷ (3/8) = 6 × (8/3) = 16` jars.',
    },
    mr: {
      q: '`6 किग्रॅ` मधाच्या बरणीतून प्रत्येकी `3/8 किग्रॅ` मध मावणाऱ्या किती लहान बाटल्या भरता येतील?',
      opts: ['16 बाटल्या', '12 बाटल्या', '18 बाटल्या', '24 बाटल्या'],
      exp: '`6 ÷ (3/8) = 6 × (8/3) = 16` बाटल्या.',
    },
    hi: {
      q: '`6 किग्रा` शहद से प्रत्येक `3/8 किग्रा` धारिता वाली कितनी छोटी शीशियाँ भरी जा सकती हैं?',
      opts: ['16 शीशियाँ', '12 शीशियाँ', '18 शीशियाँ', '24 शीशियाँ'],
      exp: '`6 ÷ (3/8) = 6 × 8 ÷ 3 = 16`।',
    },
  },
  {
    topic: 'Right Triangle Fence Cost Perimeter Check',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A triangular herb corner has side lengths `5.4 m`, `7.2 m`, and `9.0 m`. If decorative bamboo edging costs `₹45` per meter, how much does edging its entire boundary cost?',
      opts: ['₹972', '₹962', '₹882', '₹1,080'],
      exp: 'Perimeter = `5.4 + 7.2 + 9.0 = 21.6 m`. Cost = `21.6 × 45 = ₹972`.',
    },
    mr: {
      q: 'एका त्रिकोणी औषधी बागेच्या बाजू `5.4 मी`, `7.2 मी` व `9.0 मी` आहेत. बांबूच्या कुंपणाचा दर प्रति मीटर `₹45` असल्यास एकूण खर्च किती येईल?',
      opts: ['₹972', '₹962', '₹882', '₹1,080'],
      exp: 'परिमिती = `5.4 + 7.2 + 9.0 = 21.6 मी`. खर्च = `21.6 × 45 = ₹972`.',
    },
    hi: {
      q: 'एक त्रिभुजाकार क्यारी की भुजाएँ `5.4 मी, 7.2 मी, 9.0 मी` हैं। `₹45 प्रति मी` की दर से चारों ओर बांस बाड़ का खर्च कितना होगा?',
      opts: ['₹972', '₹962', '₹882', '₹1,080'],
      exp: 'परिमाप = `21.6 मी`; खर्च = `21.6 × 45 = ₹972`।',
    },
  },
];
