import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 6 (30 unique Classes 1-5 Qs)
export const MAHA_TET_P1_B2_MATH_C6: CuratedTrilingualMcq[] = [
  {
    topic: 'Ratio Pocket Money Distribution Difference',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Rohan and Meera divide `₹ 420` between them in the ratio `3 : 4`. How much more money does Meera get than Rohan?',
      opts: ['₹ 60', '₹ 180', '₹ 240', '₹ 120'],
      exp: 'Total parts = `3 + 4 = 7`. Value of `1` part = `420 ÷ 7 = ₹ 60`. Difference = `(4 − 3) × 60 = ₹ 60`.',
    },
    mr: {
      q: 'रोहन आणि मीरा `₹ 420` ही रक्कम `3 : 4` या प्रमाणात वाटून घेतात. मीराला रोहनपेक्षा किती रुपये जास्त मिळतात?',
      opts: ['₹ 60', '₹ 180', '₹ 240', '₹ 120'],
      exp: 'एकूण भाग = `3 + 4 = 7`, प्रत्येक भाग = `420 ÷ 7 = ₹ 60`. फरक = `(4 − 3) × 60 = ₹ 60`.',
    },
    hi: {
      q: 'रोहन और मीरा `₹ 420` को `3 : 4` के अनुपात में बाँटते हैं। मीरा को रोहन से कितने रुपये अधिक मिलते हैं?',
      opts: ['₹ 60', '₹ 180', '₹ 240', '₹ 120'],
      exp: 'कुल भाग = `7`, `1` भाग = `₹ 60`। अंतर = `(4 − 3) × 60 = ₹ 60`।',
    },
  },
  {
    topic: 'Profit and Loss Notebook Carton Sale',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A shopkeeper buys a pack of `25` notebooks for `₹ 550` and sells every notebook at `₹ 26` each. What is his total profit?',
      opts: ['₹ 100', '₹ 85', '₹ 125', '₹ 90'],
      exp: 'Total Selling Price = `25 × 26 = ₹ 650`. Profit = `SP − CP = 650 − 550 = ₹ 100`.',
    },
    mr: {
      q: 'एका दुकानदाराने `25` वह्यांचा गठ्ठा `₹ 550` ला खरेदी केला आणि प्रत्येक वही `₹ 26` ला विकली. तर त्याला एकूण किती नफा झाला?',
      opts: ['₹ 100', '₹ 85', '₹ 125', '₹ 90'],
      exp: 'एकूण विक्री किंमत = `25 × 26 = ₹ 650`. नफा = `650 − 550 = ₹ 100`.',
    },
    hi: {
      q: 'एक दुकानदार ने `25` कॉपियों का बंडल `₹ 550` में खरीदा और प्रत्येक कॉपी `₹ 26` में बेची। उसका कुल लाभ कितना है?',
      opts: ['₹ 100', '₹ 85', '₹ 125', '₹ 90'],
      exp: 'कुल विक्रय मूल्य = `25 × 26 = ₹ 650`, लाभ = `650 − 550 = ₹ 100`।',
    },
  },
  {
    topic: 'Hallway Border Tile Count Calculation',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A rectangular garden path is `12 m` long and `3 m` wide. How many square cement tiles of side `50 cm` are needed to pave it completely?',
      opts: ['144', '72', '180', '288'],
      exp: 'Path dimensions in cm = `1200 cm × 300 cm`. Number of tiles = `(1200 ÷ 50) × (300 ÷ 50) = 24 × 6 = 144`.',
    },
    mr: {
      q: 'एका आयताकृती बागेच्या पायवाटेची लांबी `12 मी` व रुंदी `3 मी` आहे. ही पायवाट पूर्ण बसवण्यासाठी `50 सेमी` बाजूच्या किती चौरसाकृती फरश्या लागतील?',
      opts: ['144', '72', '180', '288'],
      exp: 'सेमीमध्ये आकार `1200 × 300 सेमी`. फरश्या = `(1200 ÷ 50) × (300 ÷ 50) = 24 × 6 = 144`.',
    },
    hi: {
      q: 'एक आयताकार बगीचे का रास्ता `12 मी` लंबा और `3 मी` चौड़ा है। इसे ढकने के लिए `50 सेमी` भुजा वाली कितनी वर्गाकार टाइलें लगेंगी?',
      opts: ['144', '72', '180', '288'],
      exp: 'टाइल की संख्या = `(1200 ÷ 50) × (300 ÷ 50) = 24 × 6 = 144`।',
    },
  },
  {
    topic: 'Capacity Litres and Millilitres Mango Juice Distribution',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A vessel holds `4 L 500 mL` of kokum sharbat. If poured equally into `18` identical glasses, how much sharbat is in each glass?',
      opts: ['250 mL', '225 mL', '275 mL', '300 mL'],
      exp: '`4 L 500 mL = 4,500 mL`. Divided by `18` gives `4,500 ÷ 18 = 250 mL`.',
    },
    mr: {
      q: 'एका भांड्यात `4 लि 500 मिली` कोकम सरबत आहे. ते `18` समान ग्लासांत सारखे ओतल्यास प्रत्येक ग्लासात किती सरबत येईल?',
      opts: ['250 मिली', '225 मिली', '275 मिली', '300 मिली'],
      exp: '`4,500 मिली ÷ 18 = 250 मिली`.',
    },
    hi: {
      q: 'एक बर्तन में `4 ली 500 मिली` शर्बत है। यदि इसे `18` समान गिलासों में बराबर भरा जाए, तो प्रत्येक गिलास में कितना शर्बत आएगा?',
      opts: ['250 मिली', '225 मिली', '275 मिली', '300 मिली'],
      exp: '`4,500 मिली ÷ 18 = 250 मिली`।',
    },
  },
  {
    topic: 'Regular Polygon Lines of Symmetry Octagon',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many lines of symmetry does a regular octagon have?',
      opts: ['8', '4', '16', '6'],
      exp: 'A regular polygon with `n` equal sides and equal angles has exactly `n` lines of symmetry; an octagon has `8`.',
    },
    mr: {
      q: 'एका सम अष्टकोनाला (Regular Octagon) एकूण किती सममितीचे अक्ष (lines of symmetry) असतात?',
      opts: ['8', '4', '16', '6'],
      exp: '`n` समान बाजू व समान कोन असलेल्या नियमित बहुभुजाला `n` सममिती अक्ष असतात; अष्टकोनाला `8` असतात.',
    },
    hi: {
      q: 'एक सम अष्टभुज (Regular Octagon) में कितनी सममिति रेखाएँ (lines of symmetry) होती हैं?',
      opts: ['8', '4', '16', '6'],
      exp: '`n` भुजाओं वाले सम बहुभुज में `n` सममिति रेखाएँ होती हैं; अष्टभुज में `8` होती हैं।',
    },
  },
  {
    topic: 'Rounding Sum Nearest Hundred Estimation',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Estimate the sum `3,468 + 2,835` by rounding each number first to the nearest hundred:',
      opts: ['6,300', '6,200', '6,400', '6,310'],
      exp: '`3,468` rounds to `3,500` and `2,835` rounds to `2,800`. Their estimated sum is `3,500 + 2,800 = 6,300`.',
    },
    mr: {
      q: '`3,468` आणि `2,835` या दोन्ही संख्यांचे जवळच्या शतकापर्यंत अंदाजीकरण (rounding off) करून त्यांची अंदाजे बेरीज किती येईल?',
      opts: ['6,300', '6,200', '6,400', '6,310'],
      exp: '`3,468 → 3,500` व `2,835 → 2,800`. एकूण अंदाजे बेरीज = `3,500 + 2,800 = 6,300`.',
    },
    hi: {
      q: '`3,468` और `2,835` प्रत्येक को निकटतम सैकड़े तक सन्निकटित (round off) करने पर अनुमानित योग क्या होगा?',
      opts: ['6,300', '6,200', '6,400', '6,310'],
      exp: '`3,468 → 3,500` और `2,835 → 2,800`। योग = `3,500 + 2,800 = 6,300`।',
    },
  },
  {
    topic: 'LCM Synchronization School Warning Bells',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Three school signal chimes ring at intervals of `12`, `15`, and `20` minutes respectively. If all three ring together at `8:30 a.m.`, when will they next chime together?',
      opts: ['9:30 a.m.', '9:15 a.m.', '9:00 a.m.', '9:45 a.m.'],
      exp: '`LCM(12, 15, 20) = 60 minutes = 1 hour`. Adding `1 hour` to `8:30 a.m.` gives `9:30 a.m.`.',
    },
    mr: {
      q: 'तीन शाळेच्या घंटा अनुक्रमे `12`, `15` आणि `20` मिनिटांच्या अंतराने वाजतात. तिन्ही एकत्र सकाळी `8:30` वाजता वाजल्यास त्या पुन्हा एकत्र कधी वाजतील?',
      opts: ['सकाळी 9:30', 'सकाळी 9:15', 'सकाळी 9:00', 'सकाळी 9:45'],
      exp: '`12, 15, 20` चा लसावि = `60 मिनिटे = 1 तास`. म्हणून `8:30 + 1 तास = सकाळी 9:30`.',
    },
    hi: {
      q: 'तीन घंटियाँ क्रमशः `12`, `15` और `20` मिनट के अंतराल पर बजती हैं। यदि वे सुबह `8:30` बजे एक साथ बजती हैं, तो पुनः एक साथ कब बजेंगी?',
      opts: ['सुबह 9:30 बजे', 'सुबह 9:15 बजे', 'सुबह 9:00 बजे', 'सुबह 9:45 बजे'],
      exp: '`LCM(12, 15, 20) = 60 मिनट = 1 घंटा`। अतः `8:30 + 1 घंटा = सुबह 9:30 बजे`।',
    },
  },
  {
    topic: 'Average Temperature Five Consecutive Days',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'The noon temperatures from Monday to Thursday averaged `34°C`. On Friday it was `39°C`. What is the five-day average temperature?',
      opts: ['35°C', '36°C', '34.5°C', '35.5°C'],
      exp: 'Sum of 4 days = `34 × 4 = 136°C`. Five-day total = `136 + 39 = 175°C`. Mean = `175 ÷ 5 = 35°C`.',
    },
    mr: {
      q: 'सोमवार ते गुरुवार या चार दिवसांचे सरासरी तापमान `34°C` होते आणि शुक्रवारी तापमान `39°C` नोंदवले गेले. तर पाचही दिवसांची सरासरी किती?',
      opts: ['35°C', '36°C', '34.5°C', '35.5°C'],
      exp: '४ दिवसांची बेरीज = `34 × 4 = 136`, ५ दिवसांची एकूण बेरीज = `136 + 39 = 175`. सरासरी = `175 ÷ 5 = 35°C`.',
    },
    hi: {
      q: 'सोमवार से गुरुवार का औसत तापमान `34°C` था तथा शुक्रवार को `39°C` रहा। पाँचों दिनों का औसत तापमान कितना होगा?',
      opts: ['35°C', '36°C', '34.5°C', '35.5°C'],
      exp: 'चार दिनों का योग = `136`, पाँच दिनों का योग = `136 + 39 = 175`। औसत = `175 ÷ 5 = 35°C`।',
    },
  },
  {
    topic: 'Fraction to Exact Decimal 5/16',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Express the fraction `5/16` in exact decimal form:',
      opts: ['0.3125', '0.325', '0.315', '0.3025'],
      exp: '`5 ÷ 16`: `5 × 625 = 3125` and `16 × 625 = 10,000`, so `3125/10000 = 0.3125`.',
    },
    mr: {
      q: '`5/16` या व्यवहारी अपूर्णांकाचे अचूक दशांश रूप कोणते?',
      opts: ['0.3125', '0.325', '0.315', '0.3025'],
      exp: '`5 ÷ 16 = (5 × 625)/(16 × 625) = 3125/10000 = 0.3125`.',
    },
    hi: {
      q: 'भिन्न `5/16` का सटीक दशमलव रूप लिखिए:',
      opts: ['0.3125', '0.325', '0.315', '0.3025'],
      exp: '`5 × 625 / (16 × 625) = 3125 / 10000 = 0.3125`।',
    },
  },
  {
    topic: 'Number Sequence Alternate Operations Pattern',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the missing next term in the growing number pattern: `3, 7, 15, 31, 63, ___`',
      opts: ['127', '125', '126', '129'],
      exp: 'Each term follows `2 × previous + 1` (differences double: `+4, +8, +16, +32, +64`). Thus `63 + 64 = 127`.',
    },
    mr: {
      q: 'पुढील संख्यामालिकेतील रिकामी जागा भरा: `3, 7, 15, 31, 63, ___`',
      opts: ['127', '125', '126', '129'],
      exp: 'प्रत्येक पद `मागील संख्या × 2 + 1` या नियमाप्रमाणे येते (`63 × 2 + 1 = 127`).',
    },
    hi: {
      q: 'दी गई संख्या श्रृंखला में अगला पद ज्ञात कीजिए: `3, 7, 15, 31, 63, ___`',
      opts: ['127', '125', '126', '129'],
      exp: 'प्रत्येक पद `पिछला पद × 2 + 1` के नियम से बनता है: `63 × 2 + 1 = 127`।',
    },
  },
  {
    topic: 'HCF Maximum Uniform Packet Size Ribbon',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Two rolls of satin ribbon measure `56 m` and `84 m`. What is the longest possible equal length into which both rolls can be cut without any leftover scrap?',
      opts: ['28 m', '14 m', '7 m', '21 m'],
      exp: 'Maximum equal cut length = `HCF(56, 84)`. Since `56 = 28 × 2` and `84 = 28 × 3`, the HCF is `28 m`.',
    },
    mr: {
      q: '`56 मी` आणि `84 मी` लांबीच्या दोन रिबीनचे कोणताही तुकडा शिल्लक न ठेवता समान लांबीचे जास्तीत जास्त किती लांबीचे तुकडे पाडता येतील?',
      opts: ['28 मी', '14 मी', '7 मी', '21 मी'],
      exp: '`56` व `84` चा मसावि = `28 मी` (`56 = 28 × 2`, `84 = 28 × 3`).',
    },
    hi: {
      q: '`56 मी` और `84 मी` लंबे दो रिबनों को बिना कोई टुकड़ा बचे समान लंबाई के अधिकतम कितने लंबे टुकड़ों में काटा जा सकता है?',
      opts: ['28 मी', '14 मी', '7 मी', '21 मी'],
      exp: 'अधिकतम समान लंबाई = `HCF(56, 84) = 28 मी`।',
    },
  },
  {
    topic: 'Balance Scale Symbolic Weight Puzzle',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'On a pan balance, `2 mangoes + 1 papaya` weigh `1,150 g`, whereas `1 mango + 1 papaya` weigh `850 g`. What is the weight of `1 papaya`?',
      opts: ['550 g', '300 g', '600 g', '450 g'],
      exp: 'Subtracting the second from the first gives `1 mango = 1,150 − 850 = 300 g`. Hence `1 papaya = 850 − 300 = 550 g`.',
    },
    mr: {
      q: 'एका तराजूमध्ये `2 आंबे + 1 पपई` यांचे वजन `1,150 ग्रॅम` आहे आणि `1 आंबा + 1 पपई` यांचे वजन `850 ग्रॅम` आहे. तर एका पपईचे वजन किती?',
      opts: ['550 ग्रॅम', '300 ग्रॅम', '600 ग्रॅम', '450 ग्रॅम'],
      exp: '`1 आंबा = 1,150 − 850 = 300 ग्रॅम`. म्हणून `1 पपई = 850 − 300 = 550 ग्रॅम`.',
    },
    hi: {
      q: 'एक तराजू पर `2 आम + 1 पपीते` का भार `1,150 ग्रा` है तथा `1 आम + 1 पपीते` का भार `850 ग्रा` है। एक पपीते का भार कितना है?',
      opts: ['550 ग्रा', '300 ग्रा', '600 ग्रा', '450 ग्रा'],
      exp: '`1 आम = 1,150 − 850 = 300 ग्रा`, इसलिए `1 पपीता = 850 − 300 = 550 ग्रा`।',
    },
  },
  {
    topic: 'Percentage Discount On Marked Price Bag',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A school backpack has a marked price of `₹ 640`. A festive store offers a `15%` discount. What price does a parent pay?',
      opts: ['₹ 544', '₹ 560', '₹ 524', '₹ 554'],
      exp: 'Discount = `15% of 640 = (15 × 640)/100 = ₹ 96`. Net price = `640 − 96 = ₹ 544`.',
    },
    mr: {
      q: 'एका शालेय दप्तराची छापील किंमत `₹ 640` आहे. त्यावर दुकानदार `15%` सूट देतो, तर पालकांना ते दप्तर किती रुपयांत मिळेल?',
      opts: ['₹ 544', '₹ 560', '₹ 524', '₹ 554'],
      exp: 'सूट = `640 × 15 / 100 = ₹ 96`. देय किंमत = `640 − 96 = ₹ 544`.',
    },
    hi: {
      q: 'एक स्कूल बैग का अंकित मूल्य `₹ 640` है। दुकानदार इस पर `15%` की छूट देता है, तो बैग कितने रुपये में मिलेगा?',
      opts: ['₹ 544', '₹ 560', '₹ 524', '₹ 554'],
      exp: 'छूट = `640` का `15% = ₹ 96`, विक्रय मूल्य = `640 − 96 = ₹ 544`।',
    },
  },
  {
    topic: 'Median Value Unordered Attendance Data',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Five sections of Class 5 recorded student counts as `38, 44, 36, 41, 39`. What is the median class size?',
      opts: ['39', '41', '38', '40'],
      exp: 'Arranged in ascending order: `36, 38, 39, 41, 44`. The middle (3rd) value is `39`.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या पाच तुकड्यांतील विद्यार्थी संख्या `38, 44, 36, 41, 39` अशी आहे. या माहितीचा मध्यक (Median) किती?',
      opts: ['39', '41', '38', '40'],
      exp: 'चढता क्रम: `36, 38, 39, 41, 44`. मधोमध असणारी संख्या `39` हा मध्यक होय.',
    },
    hi: {
      q: 'कक्षा 5 के पाँच वर्गों में छात्रों की संख्या `38, 44, 36, 41, 39` है। इन आँकड़ों की माध्यिका (Median) क्या है?',
      opts: ['39', '41', '38', '40'],
      exp: 'आरोही क्रम में `36, 38, 39, 41, 44` लिखने पर बीच की संख्या `39` माध्यिका है।',
    },
  },
  {
    topic: 'Mixed Mass Weight Conversion Subtraction',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'From a sack containing `15 kg 200 g` of wheat, `6 kg 750 g` was ground into flour. How much wheat remains in the sack?',
      opts: ['8 kg 450 g', '9 kg 450 g', '8 kg 550 g', '8 kg 350 g'],
      exp: '`15,200 g − 6,750 g = 8,450 g = 8 kg 450 g`.',
    },
    mr: {
      q: '`15 किग्रॅ 200 ग्रॅम` गव्हाच्या पोत्यातून `6 किग्रॅ 750 ग्रॅम` गहू दळण्यासाठी काढला. तर पोत्यात किती गहू शिल्लक राहिला?',
      opts: ['8 किग्रॅ 450 ग्रॅम', '9 किग्रॅ 450 ग्रॅम', '8 किग्रॅ 550 ग्रॅम', '8 किग्रॅ 350 ग्रॅम'],
      exp: '`15,200 ग्रॅम − 6,750 ग्रॅम = 8,450 ग्रॅम = 8 किग्रॅ 450 ग्रॅम`.',
    },
    hi: {
      q: '`15 किग्रा 200 ग्रा` गेहूँ की बोरी में से `6 किग्रा 750 ग्रा` गेहूँ पीसने के लिए निकाला गया। बोरी में कितना गेहूँ बचा?',
      opts: ['8 किग्रा 450 ग्रा', '9 किग्रा 450 ग्रा', '8 किग्रा 550 ग्रा', '8 किग्रा 350 ग्रा'],
      exp: '`15,200 ग्रा − 6,750 ग्रा = 8,450 ग्रा = 8 किग्रा 450 ग्रा`।',
    },
  },
  {
    topic: 'Square Number Between 100 and 200 Palindrome Or Cube Overlap',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which two-digit number is simultaneously a perfect square as well as a perfect cube?',
      opts: ['64', '36', '81', '27'],
      exp: '`64 = 8²` (square of 8) and `64 = 4³` (cube of 4), making it the only two-digit number that is both.',
    },
    mr: {
      q: 'खालीलपैकी कोणती दोन-अंकी संख्या पूर्ण वर्ग तसेच पूर्ण घन देखील आहे?',
      opts: ['64', '36', '81', '27'],
      exp: '`64 = 8²` व `64 = 4³` असल्याने `64` ही एकमेव दोन-अंकी संख्या पूर्ण वर्ग व पूर्ण घन आहे.',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सी दो-अंकीय संख्या पूर्ण वर्ग और पूर्ण घन दोनों है?',
      opts: ['64', '36', '81', '27'],
      exp: '`64 = 8²` और `64 = 4³` दोनों है।',
    },
  },
  {
    topic: 'Fraction Unitary Method Bus Distance Time',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A state transport bus travels `135 km` in `3` hours at uniform speed. How far will it travel in `4 hours 20 minutes` at the same speed?',
      opts: ['195 km', '180 km', '210 km', '190 km'],
      exp: 'Speed = `135 ÷ 3 = 45 km/h`. Time = `4 + 20/60 = 4⅓ = 13/3 h`. Distance = `45 × (13/3) = 15 × 13 = 195 km`.',
    },
    mr: {
      q: 'एक बस समान वेगाने `3 तासांत 135 किमी` अंतर जाते. त्याच वेगाने ती `4 तास 20 मिनिटांत` किती अंतर पार करेल?',
      opts: ['195 किमी', '180 किमी', '210 किमी', '190 किमी'],
      exp: 'वेग = `135 ÷ 3 = 45 किमी/तास`. वेळ = `4 तास 20 मि = 4⅓ तास = 13/3 तास`. अंतर = `45 × 13/3 = 195 किमी`.',
    },
    hi: {
      q: 'एक बस समान चाल से `3 घंटे में 135 किमी` चलती है। इसी चाल से वह `4 घंटे 20 मिनट` में कितनी दूरी तय करेगी?',
      opts: ['195 किमी', '180 किमी', '210 किमी', '190 किमी'],
      exp: 'चाल = `45 किमी/घंटा`, समय = `13/3 घंटे`। दूरी = `45 × 13/3 = 195 किमी`।',
    },
  },
  {
    topic: 'BODMAS Brackets Order Arithmetic Expression',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Evaluate the numerical expression: `48 ÷ (10 − 2) + 5 × 3`',
      opts: ['21', '33', '19', '27'],
      exp: 'Parentheses first: `10 − 2 = 8`. Division & multiplication left-to-right: `48 ÷ 8 = 6`, `5 × 3 = 15`. Sum: `6 + 15 = 21`.',
    },
    mr: {
      q: 'पुढील पदावली सोडवा: `48 ÷ (10 − 2) + 5 × 3`',
      opts: ['21', '33', '19', '27'],
      exp: 'कंस: `10 − 2 = 8`; भागाकार व गुणाकार: `48 ÷ 8 = 6`, `5 × 3 = 15`; बेरीज: `6 + 15 = 21`.',
    },
    hi: {
      q: 'निम्नलिखित व्यंजक का मान ज्ञात कीजिए: `48 ÷ (10 − 2) + 5 × 3`',
      opts: ['21', '33', '19', '27'],
      exp: 'कोष्ठक से `8`, फिर `48 ÷ 8 = 6` तथा `5 × 3 = 15`। अतः `6 + 15 = 21`।',
    },
  },
  {
    topic: 'Rectangle Diagonal & Side Perimeter Reverse',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'The length of a rectangular playground is twice its breadth. If its perimeter is `72 m`, what is the area of the playground?',
      opts: ['288 sq m', '216 sq m', '324 sq m', '144 sq m'],
      exp: '`2 × (2b + b) = 6b = 72`, so breadth `b = 12 m` and length `24 m`. Area = `24 × 12 = 288 sq m`.',
    },
    mr: {
      q: 'एका आयताकृती क्रीडांगणाची लांबी रुंदीच्या दुप्पट आहे. त्याची परिमिती `72 मी` असल्यास क्षेत्रफळ किती चौ.मी. असेल?',
      opts: ['288 चौ.मी.', '216 चौ.मी.', '324 चौ.मी.', '144 चौ.मी.'],
      exp: '`2 × (2b + b) = 6b = 72` ⇒ `b = 12 मी`, लांबी = `24 मी`. क्षेत्रफळ = `24 × 12 = 288 चौ.मी.`.',
    },
    hi: {
      q: 'एक आयताकार खेल के मैदान की लंबाई उसकी चौड़ाई की दोगुनी है। यदि परिमाप `72 मी` है, तो क्षेत्रफल कितना होगा?',
      opts: ['288 वर्ग मी', '216 वर्ग मी', '324 वर्ग मी', '144 वर्ग मी'],
      exp: '`6b = 72` ⇒ चौड़ाई `12 मी`, लंबाई `24 मी`। क्षेत्रफल = `24 × 12 = 288 वर्ग मी`।',
    },
  },
  {
    topic: 'Simple Interest Annual Bank Deposit Return',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A teacher deposits `₹ 2,500` in a post office savings scheme paying `8%` simple interest per year. How much total amount will she receive after `3` years?',
      opts: ['₹ 3,100', '₹ 3,000', '₹ 2,900', '₹ 3,200'],
      exp: 'Simple Interest = `(2,500 × 8 × 3) / 100 = ₹ 600`. Total amount = `2,500 + 600 = ₹ 3,100`.',
    },
    mr: {
      q: 'एका शिक्षिकेने पोस्टात `₹ 2,500` रक्कम द.सा.द.शे. `8` दराने `3` वर्षांसाठी सरळव्याजाने ठेवली. मुदतीअंती त्यांना एकूण किती रुपये परत मिळतील?',
      opts: ['₹ 3,100', '₹ 3,000', '₹ 2,900', '₹ 3,200'],
      exp: 'सरळव्याज = `(2,500 × 8 × 3)/100 = ₹ 600`. रास = `2,500 + 600 = ₹ 3,100`.',
    },
    hi: {
      q: 'एक शिक्षिका ने `₹ 2,500` की राशि `8%` वार्षिक साधारण ब्याज की दर से `3` वर्षों के लिए जमा की। अंत में उसे कुल कितनी धनराशि मिलेगी?',
      opts: ['₹ 3,100', '₹ 3,000', '₹ 2,900', '₹ 3,200'],
      exp: 'ब्याज = `(2500 × 8 × 3)/100 = ₹ 600`, कुल मिश्रधन = `2500 + 600 = ₹ 3,100`।',
    },
  },
  {
    topic: 'Number Sense Sum of First Ten Odd Numbers',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the sum of the first ten odd natural numbers (`1 + 3 + 5 + ... + 19`)?',
      opts: ['100', '90', '110', '81'],
      exp: 'The sum of the first `n` odd natural numbers equals `n²`. For `n = 10`, `10² = 100`.',
    },
    mr: {
      q: 'पहिल्या दहा विषम नैसर्गिक संख्यांची (`1 + 3 + 5 + ... + 19`) बेरीज किती येते?',
      opts: ['100', '90', '110', '81'],
      exp: 'पहिल्या `n` विषम संख्यांची बेरीज `n²` असते; म्हणून `10² = 100`.',
    },
    hi: {
      q: 'प्रथम दस विषम प्राकृत संख्याओं (`1 + 3 + 5 + ... + 19`) का योग कितना है?',
      opts: ['100', '90', '110', '81'],
      exp: 'प्रथम `n` विषम संख्याओं का योग `n²` होता है; अतः `10² = 100`।',
    },
  },
  {
    topic: 'Fractions Comparing Unlike Fractions Ascending',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following fractions is the LARGEST: `3/4`, `5/6`, `7/12`, or `2/3`?',
      opts: ['5/6', '3/4', '2/3', '7/12'],
      exp: 'Converting to denominator `12`: `3/4 = 9/12`, `5/6 = 10/12`, `7/12 = 7/12`, `2/3 = 8/12`. Largest is `10/12 = 5/6`.',
    },
    mr: {
      q: '`3/4`, `5/6`, `7/12`, आणि `2/3` यांपैकी सर्वात मोठा अपूर्णांक कोणता?',
      opts: ['5/6', '3/4', '2/3', '7/12'],
      exp: 'छेद `12` समान केल्यास: `9/12, 10/12, 7/12, 8/12` यांत `10/12` म्हणजेच `5/6` सर्वात मोठा आहे.',
    },
    hi: {
      q: '`3/4`, `5/6`, `7/12` और `2/3` में से सबसे बड़ी भिन्न कौन-सी है?',
      opts: ['5/6', '3/4', '2/3', '7/12'],
      exp: 'हर `12` करने पर क्रमशः `9/12, 10/12, 7/12, 8/12` मिलते हैं; अतः `5/6` सबसे बड़ी है।',
    },
  },
  {
    topic: '24-Hour Railway Time Journey Duration Overnight',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'An express train departs Pune at `21:45 hours` on Tuesday and reaches Nagpur at `09:15 hours` on Wednesday. How long did the journey take?',
      opts: ['11 hours 30 minutes', '12 hours 30 minutes', '11 hours 15 minutes', '10 hours 30 minutes'],
      exp: 'From `21:45` to `24:00` is `2 h 15 m`. Adding `9 h 15 m` from midnight gives `11 h 30 m`.',
    },
    mr: {
      q: 'एक एक्स्प्रेस गाडी मंगळवारी रात्री `21:45` वाजता पुण्याहून सुटते आणि बुधवारी सकाळी `09:15` वाजता नागपूरला पोहोचते. प्रवासाला एकूण किती वेळ लागला?',
      opts: ['11 तास 30 मिनिटे', '12 तास 30 मिनिटे', '11 तास 15 मिनिटे', '10 तास 30 मिनिटे'],
      exp: '`21:45` ते मध्यरात्र `24:00` = `2 तास 15 मि`; अधिक `9 तास 15 मि` = `11 तास 30 मिनिटे`.',
    },
    hi: {
      q: 'एक एक्सप्रेस ट्रेन मंगलवार `21:45` बजे पुणे से चलकर बुधवार `09:15` बजे नागपुर पहुँचती है। यात्रा में कुल कितना समय लगा?',
      opts: ['11 घंटे 30 मिनट', '12 घंटे 30 मिनट', '11 घंटे 15 मिनट', '10 घंटे 30 मिनट'],
      exp: 'मध्यरात्रि तक `2 घंटे 15 मिनट` और आगे `9 घंटे 15 मिनट` = `11 घंटे 30 मिनट`।',
    },
  },
  {
    topic: 'Composite vs Prime Total Count 1 to 30',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many prime numbers lie strictly between `10` and `30`?',
      opts: ['6', '5', '7', '8'],
      exp: 'The prime numbers between `10` and `30` are `11, 13, 17, 19, 23, 29` — a total of `6` primes.',
    },
    mr: {
      q: '`10` ते `30` या संख्यांच्या दरम्यान एकूण किती मूळ संख्या (Prime numbers) आहेत?',
      opts: ['6', '5', '7', '8'],
      exp: '`11, 13, 17, 19, 23, 29` या एकूण `6` मूळ संख्या आहेत.',
    },
    hi: {
      q: '`10` और `30` के बीच कुल कितनी अभाज्य संख्याएँ (Prime numbers) आती हैं?',
      opts: ['6', '5', '7', '8'],
      exp: 'अभाज्य संख्याएँ `11, 13, 17, 19, 23, 29` अर्थात् कुल `6` हैं।',
    },
  },
  {
    topic: 'Decimal Division by 100 Place Shift',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the quotient when `4.8` is divided by `0.04`?',
      opts: ['120', '12', '1.2', '1,200'],
      exp: 'Multiply both numerator and denominator by `100`: `4.8 / 0.04 = 480 / 4 = 120`.',
    },
    mr: {
      q: '`4.8` ला `0.04` ने भागल्यास भागाकार किती येईल?',
      opts: ['120', '12', '1.2', '1,200'],
      exp: 'अंश व छेद यांना `100` ने गुणल्यास `480 ÷ 4 = 120`.',
    },
    hi: {
      q: '`4.8` को `0.04` से भाग देने पर भागफल कितना आएगा?',
      opts: ['120', '12', '1.2', '1,200'],
      exp: '`4.8 ÷ 0.04 = 480 ÷ 4 = 120`।',
    },
  },
  {
    topic: 'Angles Sum of Exterior/Triangle Third Angle Ratio',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'In an isosceles triangle, each of the two equal base angles measures `52°`. What is the measure of the third vertex angle?',
      opts: ['76°', '64°', '104°', '68°'],
      exp: 'Sum of triangle angles = `180°`. Third angle = `180° − (52° + 52°) = 180° − 104° = 76°`.',
    },
    mr: {
      q: 'एका समद्विभुज त्रिकोणातील दोन समान पायाचे कोन प्रत्येकी `52°` मापाचे आहेत. तर तिसऱ्या शिरोकोनाचे माप किती अंश असेल?',
      opts: ['76°', '64°', '104°', '68°'],
      exp: 'त्रिकोणाच्या कोनांची बेरीज `180°`. म्हणून तिसरा कोन = `180° − 104° = 76°`.',
    },
    hi: {
      q: 'एक समद्विबाहु त्रिभुज के दोनों समान आधार कोण `52°` के हैं। तीसरे शीर्ष कोण का माप कितना होगा?',
      opts: ['76°', '64°', '104°', '68°'],
      exp: 'त्रिभुज के तीनों कोणों का योग `180°` होता है; अतः तीसरा कोण = `180° − (52° + 52°) = 76°`।',
    },
  },
  {
    topic: 'Dozen and Gross Pencil Unit Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A stationery store ordered `1.5` gross of pencils and sold `8` dozen pencils during opening week. How many pencils remain unsold?',
      opts: ['120', '96', '108', '144'],
      exp: '`1 gross = 144` pencils, so `1.5 gross = 216` pencils. `8 dozen = 8 × 12 = 96` sold. Remaining = `216 − 96 = 120`.',
    },
    mr: {
      q: 'एका स्टेशनरी दुकानाने `1.5 ग्रॉस` पेन्सिली आणल्या व पहिल्या आठवड्यात `8 डझन` विकल्या. तर दुकानात किती पेन्सिली शिल्लक राहिल्या?',
      opts: ['120', '96', '108', '144'],
      exp: '`1.5 ग्रॉस = 1.5 × 144 = 216` पेन्सिली; `8 डझन = 96` विकल्या; शिल्लक = `216 − 96 = 120`.',
    },
    hi: {
      q: 'एक स्टेशनरी दुकान में `1.5 ग्रॉस` पेंसिलें आईं, जिनमें से `8 दर्जन` बिक गईं। अब कितनी पेंसिलें शेष बची हैं?',
      opts: ['120', '96', '108', '144'],
      exp: '`1.5 × 144 = 216` पेंसिलों में से `8 × 12 = 96` बिकने पर `216 − 96 = 120` बचीं।',
    },
  },
  {
    topic: 'Factors Total Count of Number 36',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many positive factors (divisors) in total does the number `36` have?',
      opts: ['9', '8', '7', '10'],
      exp: 'All factors of `36` are `1, 2, 3, 4, 6, 9, 12, 18, 36` — making `9` factors in total.',
    },
    mr: {
      q: '`36` या संख्येचे एकूण विभाजक (factors) किती आहेत?',
      opts: ['9', '8', '7', '10'],
      exp: '`36` चे विभाजक: `1, 2, 3, 4, 6, 9, 12, 18, 36` असे एकूण `9` आहेत.',
    },
    hi: {
      q: 'संख्या `36` के कुल कितने धनात्मक गुणनखंड (divisors) होते हैं?',
      opts: ['9', '8', '7', '10'],
      exp: '`36` के गुणनखंड `1, 2, 3, 4, 6, 9, 12, 18, 36` अर्थात् कुल `9` हैं।',
    },
  },
  {
    topic: 'Missing Digit Two-Digit Multiplication Reconstruction',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'If a whole number leaves remainder `4` when divided by `7`, what remainder does twice that number leave when divided by `7`?',
      opts: ['1', '2', '4', '6'],
      exp: 'Let the number be `7k + 4`. Twice the number = `14k + 8 = 7(2k + 1) + 1`, leaving remainder `1`.',
    },
    mr: {
      q: 'एका संख्येस `7` ने भागल्यास बाकी `4` उरते. त्याच संख्येच्या दुप्पटीला `7` ने भागल्यास बाकी किती उरेल?',
      opts: ['1', '2', '4', '6'],
      exp: 'दिलेल्या संख्येचा नमुना `7k + 4`. दुप्पट = `14k + 8 = 7(2k + 1) + 1`, म्हणजेच बाकी `1` उरते.',
    },
    hi: {
      q: 'यदि किसी संख्या को `7` से भाग देने पर शेषफल `4` बचता है, तो उस संख्या के दोगुने को `7` से भाग देने पर शेषफल कितना बचेगा?',
      opts: ['1', '2', '4', '6'],
      exp: '`4 × 2 = 8`; `8` को `7` से भाग देने पर शेषफल `1` आता है।',
    },
  },
  {
    topic: 'Cube Volume Unit Centimetre Container',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many small cubical blocks of side `2 cm` can fit completely inside a cuboidal box of internal dimensions `10 cm × 8 cm × 6 cm`?',
      opts: ['60', '48', '120', '30'],
      exp: 'Along each dimension: `(10 ÷ 2) × (8 ÷ 2) × (6 ÷ 2) = 5 × 4 × 3 = 60` cubes.',
    },
    mr: {
      q: '`10 सेमी × 8 सेमी × 6 सेमी` मापाच्या इष्टिकाचिती आकाराच्या खोक्यात `2 सेमी` बाजू असलेले किती लहान घन पूर्णपणे मावतील?',
      opts: ['60', '48', '120', '30'],
      exp: 'प्रत्येक बाजूने मावणारे घन = `(10 ÷ 2) × (8 ÷ 2) × (6 ÷ 2) = 5 × 4 × 3 = 60`.',
    },
    hi: {
      q: '`10 सेमी × 8 सेमी × 6 सेमी` आंतरिक माप वाले घनाभ डिब्बे में `2 सेमी` भुजा वाले कितने छोटे घन पूरी तरह समा सकते हैं?',
      opts: ['60', '48', '120', '30'],
      exp: '`(10 ÷ 2) × (8 ÷ 2) × (6 ÷ 2) = 5 × 4 × 3 = 60` घन।',
    },
  },
];
