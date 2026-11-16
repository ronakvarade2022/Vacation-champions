import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 1 (28 unique Classes 1-5 number sense, arithmetic & problem-solving Qs)
export const MAHA_TET_P1_B2_MATH_C1: CuratedTrilingualMcq[] = [
  {
    topic: 'Six-Digit Difference Greatest & Smallest Formation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Using the digits `6, 0, 9, 2, 5` each exactly once, what is the difference between the greatest 5-digit number and the smallest 5-digit number formed?',
      opts: ['75,951', '76,200', '74,565', '93,933'],
      exp: 'Greatest 5-digit = `96,520`; smallest valid 5-digit = `20,569`. Difference = `96,520 − 20,569 = 75,951`.',
    },
    mr: {
      q: '`6, 0, 9, 2, 5` हे प्रत्येक अंक फक्त एकदाच वापरून तयार होणारी सर्वात मोठी ५-अंकी संख्या आणि सर्वात लहान ५-अंकी संख्या यांतील फरक किती?',
      opts: ['75,951', '76,200', '74,565', '93,933'],
      exp: 'सर्वात मोठी = `96,520`; सर्वात लहान ५-अंकी = `20,569`. फरक = `96,520 − 20,569 = 75,951`.',
    },
    hi: {
      q: '`6, 0, 9, 2, 5` अंकों का ठीक एक बार प्रयोग करके बनने वाली सबसे बड़ी ५-अंकीय और सबसे छोटी ५-अंकीय संख्या का अंतर कितना होगा?',
      opts: ['75,951', '76,200', '74,565', '93,933'],
      exp: 'सबसे बड़ी = `96,520`; सबसे छोटी ५-अंकीय = `20,569`. अंतर = `96,520 − 20,569 = 75,951`।',
    },
  },
  {
    topic: 'Place Value vs Face Value Ratio & Difference',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In the number `4,78,352`, how many times larger is the place value of `7` than the place value of `5`?',
      opts: ['1,400 times', '700 times', '140 times', '14,000 times'],
      exp: 'Place value of `7` = `70,000`; place value of `5` = `50`. Ratio = `70,000 ÷ 50 = 1,400`.',
    },
    mr: {
      q: '`4,78,352` या संख्येतील `7` ची स्थानिक किंमत ही `5` च्या स्थानिक किमतीच्या किती पट आहे?',
      opts: ['1,400 पट', '700 पट', '140 पट', '14,000 पट'],
      exp: '`7` ची स्थानिक किंमत = `70,000` आणि `5` ची = `50`. म्हणून `70,000 ÷ 50 = 1,400` पट.',
    },
    hi: {
      q: 'संख्या `4,78,352` में `7` का स्थानीय मान `5` के स्थानीय मान से कितने गुना है?',
      opts: ['1,400 गुना', '700 गुना', '140 गुना', '14,000 गुना'],
      exp: '`7` का स्थानीय मान `70,000` और `5` का `50` है। `70,000 ÷ 50 = 1,400` गुना।',
    },
  },
  {
    topic: 'Roman Numerals Arithmetic Division & Addition',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Evaluate in Hindu–Arabic numerals: `(CDXL ÷ XI) + LXIX`',
      opts: ['109', '99', '119', '89'],
      exp: '`CDXL = 440`, `XI = 11`, `LXIX = 69`. So `(440 ÷ 11) + 69 = 40 + 69 = 109`.',
    },
    mr: {
      q: 'आंतरराष्ट्रीय संख्याचिन्हांत किंमत काढा: `(CDXL ÷ XI) + LXIX`',
      opts: ['109', '99', '119', '89'],
      exp: '`CDXL = 440`, `XI = 11`, `LXIX = 69`. म्हणून `(440 ÷ 11) + 69 = 40 + 69 = 109`.',
    },
    hi: {
      q: 'हिंदू-अरबी अंकों में मान ज्ञात कीजिए: `(CDXL ÷ XI) + LXIX`',
      opts: ['109', '99', '119', '89'],
      exp: '`CDXL = 440`, `XI = 11`, `LXIX = 69`। अतः `(440 ÷ 11) + 69 = 40 + 69 = 109`।',
    },
  },
  {
    topic: 'Division Algorithm Finding Divisor',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'When `1,485` is divided by a whole number `d`, the quotient is `53` and the remainder is `1`. What is the value of `d`?',
      opts: ['28', '27', '29', '31'],
      exp: '`Dividend = Divisor × Quotient + Remainder` → `1,485 − 1 = 1,484`. `1,484 ÷ 53 = 28`.',
    },
    mr: {
      q: '`1,485` ला एका संख्येने (`d`) भागल्यास भागाकार `53` आणि बाकी `1` उरते, तर भाजक `d` किती?',
      opts: ['28', '27', '29', '31'],
      exp: '`भाज्य = भाजक × भागाकार + बाकी` → `1,485 − 1 = 1,484`. `1,484 ÷ 53 = 28`.',
    },
    hi: {
      q: 'जब `1,485` को एक पूर्ण संख्या `d` से विभाजित किया जाता है, तो भागफल `53` और शेषफल `1` आता है। `d` का मान क्या है?',
      opts: ['28', '27', '29', '31'],
      exp: '`1,485 − 1 = 1,484`, और `1,484 ÷ 53 = 28`।',
    },
  },
  {
    topic: 'LCM Practical Word Problem – Ringing Bells',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Three village temple chimes ring at intervals of `12`, `18`, and `24` minutes respectively. If they all chime together at `7:00 a.m.`, at what time will they next chime together?',
      opts: ['8:12 a.m.', '8:00 a.m.', '8:24 a.m.', '7:48 a.m.'],
      exp: '`LCM(12, 18, 24) = 72 minutes = 1 hr 12 min`. Adding to `7:00 a.m.` gives `8:12 a.m.`.',
    },
    mr: {
      q: 'तीन घंटा अनुक्रमे `12`, `18` आणि `24` मिनिटांच्या अंतराने वाजतात. तिन्ही सकाळी `7:00` वाजता एकत्र वाजल्या असतील, तर पुढे त्या पुन्हा एकत्र किती वाजता वाजतील?',
      opts: ['सकाळी 8:12 वाजता', 'सकाळी 8:00 वाजता', 'सकाळी 8:24 वाजता', 'सकाळी 7:48 वाजता'],
      exp: '`12, 18, 24` चा लसावि `72` मिनिटे = `1 तास 12 मिनिटे`. म्हणून `7:00 + 1:12 = 8:12` वाजता.',
    },
    hi: {
      q: 'तीन घंटियाँ क्रमशः `12`, `18` और `24` मिनट के अंतराल पर बजती हैं। यदि वे सुबह `7:00` बजे एक साथ बजीं, तो पुनः एक साथ कब बजेंगी?',
      opts: ['सुबह 8:12 बजे', 'सुबह 8:00 बजे', 'सुबह 8:24 बजे', 'सुबह 7:48 बजे'],
      exp: '`12, 18, 24` का ल.स. `72 मिनट = 1 घंटा 12 मिनट`। `7:00 + 1:12 = 8:12` बजे।',
    },
  },
  {
    topic: 'HCF Equal Partition of Two Rope Lengths',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A scout master has two ropes measuring `84 cm` and `126 cm`. If both ropes are cut into equal pieces of maximum possible length without waste, how many total pieces are obtained?',
      opts: ['5 pieces', '42 pieces', '6 pieces', '7 pieces'],
      exp: '`HCF(84, 126) = 42 cm` per piece. Pieces = `84÷42 + 126÷42 = 2 + 3 = 5` pieces.',
    },
    mr: {
      q: 'एका मार्गदर्शकाकडे `84 सेमी` व `126 सेमी` लांबीच्या दोन दोऱ्या आहेत. त्यांतून वाया न जाता शक्य तितक्या जास्त समान लांबीचे तुकडे केल्यास एकूण किती तुकडे मिळतील?',
      opts: ['5 तुकडे', '42 तुकडे', '6 तुकडे', '7 तुकडे'],
      exp: '`मसावि(84, 126) = 42 सेमी`. तुकडे = `(84÷42) + (126÷42) = 2 + 3 = 5` तुकडे.',
    },
    hi: {
      q: 'दो रस्सियाँ `84 सेमी` और `126 सेमी` लंबी हैं। बिना बर्बादी अधिकतम समान लंबाई के टुकड़ों में काटने पर कुल कितने टुकड़े मिलेंगे?',
      opts: ['5 टुकड़े', '42 टुकड़े', '6 टुकड़े', '7 टुकड़े'],
      exp: '`म.स.(84, 126) = 42 सेमी`। टुकड़ों की संख्या = `84÷42 + 126÷42 = 2 + 3 = 5`।',
    },
  },
  {
    topic: 'Fractions Remaining Journey Problem',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Rohan covered `2/5` of his village trip by bicycle, `1/3` by tractor cart, and walked the remaining `12 km`. What was the total distance of his trip?',
      opts: ['45 km', '36 km', '60 km', '30 km'],
      exp: 'Fraction covered by cycle + tractor = `2/5 + 1/3 = 11/15`. Remaining walked = `4/15` = `12 km`, so total = `12 × 15 ÷ 4 = 45 km`.',
    },
    mr: {
      q: 'रोहनने एकूण प्रवासापैकी `2/5` भाग सायकलने, `1/3` भाग ट्रॅक्टरने आणि उरलेला `12 किमी` पायी पार केला, तर एकूण प्रवास किती किमी होता?',
      opts: ['45 किमी', '36 किमी', '60 किमी', '30 किमी'],
      exp: 'सायकल व ट्रॅक्टर भाग = `2/5 + 1/3 = 11/15`. शिल्लक `4/15 = 12 किमी`, म्हणून एकूण = `12 × 15 ÷ 4 = 45 किमी`.',
    },
    hi: {
      q: 'रोहन ने यात्रा का `2/5` भाग साइकिल से, `1/3` ट्रैक्टर से और शेष `12 किमी` पैदल तय किया। कुल दूरी कितनी थी?',
      opts: ['45 किमी', '36 किमी', '60 किमी', '30 किमी'],
      exp: 'तय भाग = `2/5 + 1/3 = 11/15`। शेष `4/15 = 12 किमी` ⇒ कुल = `12 × 15 ÷ 4 = 45 किमी`।',
    },
  },
  {
    topic: 'Ordering Mixed Fractions Ascending',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Arrange the fractions `3/4`, `5/8`, `7/12`, `2/3` in ascending (smallest to largest) order:',
      opts: [
        '7/12 < 5/8 < 2/3 < 3/4',
        '5/8 < 7/12 < 2/3 < 3/4',
        '7/12 < 2/3 < 5/8 < 3/4',
        '2/3 < 5/8 < 7/12 < 3/4',
      ],
      exp: 'Convert to common denominator 24: `7/12 = 14/24`, `5/8 = 15/24`, `2/3 = 16/24`, `3/4 = 18/24`. Ascending: `7/12 < 5/8 < 2/3 < 3/4`.',
    },
    mr: {
      q: '`3/4, 5/8, 7/12, 2/3` हे अपूर्णांक चढत्या क्रमाने (लहानाकडून मोठ्याकडे) लावा:',
      opts: [
        '7/12 < 5/8 < 2/3 < 3/4',
        '5/8 < 7/12 < 2/3 < 3/4',
        '7/12 < 2/3 < 5/8 < 3/4',
        '2/3 < 5/8 < 7/12 < 3/4',
      ],
      exp: 'समछेद 24 केल्यास: `7/12 = 14/24`, `5/8 = 15/24`, `2/3 = 16/24`, `3/4 = 18/24`. चढता क्रम: `7/12 < 5/8 < 2/3 < 3/4`.',
    },
    hi: {
      q: 'भिन्नों `3/4, 5/8, 7/12, 2/3` को आरोही (छोटे से बड़े) क्रम में सजाएँ:',
      opts: [
        '7/12 < 5/8 < 2/3 < 3/4',
        '5/8 < 7/12 < 2/3 < 3/4',
        '7/12 < 2/3 < 5/8 < 3/4',
        '2/3 < 5/8 < 7/12 < 3/4',
      ],
      exp: 'समान हर 24 बनाने पर `14/24, 15/24, 16/24, 18/24` ⇒ `7/12 < 5/8 < 2/3 < 3/4`।',
    },
  },
  {
    topic: 'Decimal Multiplication & Grocery Bill Change',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Asha bought `2.5 kg` of jaggery at `₹64` per kg and `1.5 kg` of peanuts at `₹110` per kg. If she pays with a `₹500` note, how much change should she receive?',
      opts: ['₹175', '₹185', '₹165', '₹325'],
      exp: 'Jaggery = `2.5 × 64 = ₹160`; peanuts = `1.5 × 110 = ₹165`; total = `₹325`. Change = `500 − 325 = ₹175`.',
    },
    mr: {
      q: 'आशाने `₹64` प्रति किलो दराने `2.5 किलो` गूळ आणि `₹110` प्रति किलो दराने `1.5 किलो` शेंगदाणे घेतले. `₹500` ची नोट दिल्यास तिला किती रुपये परत मिळतील?',
      opts: ['₹175', '₹185', '₹165', '₹325'],
      exp: 'गूळ = `2.5 × 64 = ₹160`; शेंगदाणे = `1.5 × 110 = ₹165`; एकूण = `₹325`. परत मिळणारी रक्कम = `500 − 325 = ₹175`.',
    },
    hi: {
      q: 'आशा ने `₹64/किग्रा` की दर से `2.5 किग्रा` गुड़ और `₹110/किग्रा` की दर से `1.5 किग्रा` मूँगफली खरीदी। `₹500` का नोट देने पर उसे कितने रुपये वापस मिलेंगे?',
      opts: ['₹175', '₹185', '₹165', '₹325'],
      exp: 'कुल खर्च = `160 + 165 = ₹325`। शेष = `500 − 325 = ₹175`।',
    },
  },
  {
    topic: 'Perimeter – Rectangular Park Running Laps',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A rectangular school playground is `65 m` long and `35 m` wide. How many meters does Meena run if she completes `4` full rounds along its boundary?',
      opts: ['800 m', '400 m', '200 m', '600 m'],
      exp: 'Perimeter = `2 × (65 + 35) = 200 m`. Distance in 4 rounds = `4 × 200 = 800 m`.',
    },
    mr: {
      q: 'एका आयताकृती शाळेच्या मैदानाची लांबी `65 मी` व रुंदी `35 मी` आहे. मीनाने त्या मैदानाभोवती कडेने `4` पूर्ण फेऱ्या मारल्यास ती एकूण किती मीटर धावली?',
      opts: ['800 मी', '400 मी', '200 मी', '600 मी'],
      exp: 'परिमिती = `2 × (65 + 35) = 200 मी`. `4` फेऱ्या = `4 × 200 = 800 मी`.',
    },
    hi: {
      q: 'एक आयताकार मैदान `65 मी` लंबा और `35 मी` चौड़ा है। सीमा के चारों ओर `4` चक्कर लगाने पर मीना कुल कितने मीटर दौड़ेगी?',
      opts: ['800 मी', '400 मी', '200 मी', '600 मी'],
      exp: 'परिमाप = `2 × (65 + 35) = 200 मी`। `4` चक्कर = `800 मी`।',
    },
  },
  {
    topic: 'Area of Path Border Around Garden',
    pattern: 'Problem Solving',
    difficulty: 'Difficult',
    en: {
      q: 'A square lawn has side `18 m`. Inside it, along all four edges, a uniform stone path `1.5 m` wide is paved. What is the area of the remaining inner grass patch?',
      opts: ['225 sq m', '256 sq m', '196 sq m', '324 sq m'],
      exp: 'Path runs `1.5 m` on both opposite sides, so inner square side = `18 − 3 = 15 m`. Inner grass area = `15 × 15 = 225 sq m`.',
    },
    mr: {
      q: 'एका चौरसाकृती हिरवळीची बाजू `18 मी` आहे. तिच्या आत चारही कडांलगत `1.5 मी` रुंदीचा फरशीचा मार्ग बनवला, तर आतील शिल्लक हिरवळीचे क्षेत्रफळ किती?',
      opts: ['225 चौ.मी', '256 चौ.मी', '196 चौ.मी', '324 चौ.मी'],
      exp: 'दोन्ही बाजूंनी `1.5 + 1.5 = 3 मी` वजा केल्यास आतील बाजू = `18 − 3 = 15 मी`. क्षेत्रफळ = `15 × 15 = 225 चौ.मी`.',
    },
    hi: {
      q: '`18 मी` भुजा वाले वर्गाकार बगीचे के अंदर चारों किनारों से सटा `1.5 मी` चौड़ा पत्थर का रास्ता बनाया गया। शेष भीतरी घास का क्षेत्रफल कितना है?',
      opts: ['225 वर्ग मी', '256 वर्ग मी', '196 वर्ग मी', '324 वर्ग मी'],
      exp: 'भीतरी भुजा = `18 − 2×1.5 = 15 मी`। क्षेत्रफल = `15 × 15 = 225 वर्ग मी`।',
    },
  },
  {
    topic: 'Time Calculation Overnight Train Arrival',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A train departs Pune Junction at `21:40 hours` on Monday and arrives at Nagpur at `11:25 hours` on Tuesday. How long was the journey?',
      opts: ['13 hours 45 minutes', '13 hours 15 minutes', '12 hours 45 minutes', '14 hours 15 minutes'],
      exp: 'From `21:40` to `24:00` = `2 h 20 m`. Plus `11 h 25 m` = `13 hours 45 minutes`.',
    },
    mr: {
      q: 'एक रेल्वे सोमवारी रात्री `21:40` वाजता पुण्याहून सुटते आणि मंगळवारी सकाळी `11:25` वाजता नागपूरला पोहोचते, तर प्रवासाला एकूण किती वेळ लागला?',
      opts: ['13 तास 45 मिनिटे', '13 तास 15 मिनिटे', '12 तास 45 मिनिटे', '14 तास 15 मिनिटे'],
      exp: '`21:40` ते `24:00` = `2 तास 20 मि.` + `11 तास 25 मि.` = `13 तास 45 मिनिटे`.',
    },
    hi: {
      q: 'एक रेलगाड़ी सोमवार रात `21:40` बजे पुणे से चलकर मंगलवार सुबह `11:25` बजे नागपुर पहुँचती है। कुल यात्रा अवधि कितनी रही?',
      opts: ['13 घंटे 45 मिनट', '13 घंटे 15 मिनट', '12 घंटे 45 मिनट', '14 घंटे 15 मिनट'],
      exp: '`21:40` से मध्यरात्रि `24:00` = `2 घं 20 मि` + `11 घं 25 मि` = `13 घंटे 45 मिनट`।',
    },
  },
  {
    topic: 'Capacity Unit Conversion Litres to Bottles',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A dairy can holds `18 litres 750 ml` of fresh milk. If it is poured completely into identical `750 ml` glass bottles, how many full bottles are filled?',
      opts: ['25 bottles', '24 bottles', '26 bottles', '18 bottles'],
      exp: '`18 L 750 ml = 18,750 ml`. Dividing `18,750 ÷ 750 = 25` bottles.',
    },
    mr: {
      q: 'एका दुधाच्या किटलीत `18 लिटर 750 मिली` दूध आहे. ते सर्व दूध `750 मिली` क्षमतेच्या बाटल्यांत भरल्यास किती बाटल्या पूर्ण भरतील?',
      opts: ['25 बाटल्या', '24 बाटल्या', '26 बाटल्या', '18 बाटल्या'],
      exp: '`18,750 मिली ÷ 750 मिली = 25` बाटल्या.',
    },
    hi: {
      q: 'एक केन में `18 लीटर 750 मिली` दूध है। यदि इसे `750 मिली` की समान बोतलों में भरा जाए, तो कुल कितनी बोतलें भरेंगी?',
      opts: ['25 बोतलें', '24 बोतलें', '26 बोतलें', '18 बोतलें'],
      exp: '`18,750 ÷ 750 = 25` बोतलें।',
    },
  },
  {
    topic: 'Mass Unit Subtraction Quintals to Kilograms',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A farmer harvested `6 quintals 40 kg` of soybeans. He sold `485 kg` at the mandi and stored the rest for seeds. How many kilograms did he store?',
      opts: ['155 kg', '255 kg', '165 kg', '145 kg'],
      exp: '`6 quintals 40 kg = 640 kg` (`1 quintal = 100 kg`). Stored = `640 − 485 = 155 kg`.',
    },
    mr: {
      q: 'एका शेतकऱ्याला `6 क्विंटल 40 किग्रॅ` सोयाबीन झाले. त्यातील `485 किग्रॅ` विकल्यास बियाण्यासाठी किती किलो सोयाबीन शिल्लक राहिले?',
      opts: ['155 किग्रॅ', '255 किग्रॅ', '165 किग्रॅ', '145 किग्रॅ'],
      exp: '`6 क्विंटल 40 किग्रॅ = 640 किग्रॅ`. शिल्लक = `640 − 485 = 155 किग्रॅ`.',
    },
    hi: {
      q: 'एक किसान की फसल `6 क्विंटल 40 किग्रा` हुई। उसने `485 किग्रा` बेच दी, तो बीज के लिए कितना अनाज बचा?',
      opts: ['155 किग्रा', '255 किग्रा', '165 किग्रा', '145 किग्रा'],
      exp: '`640 − 485 = 155 किग्रा`।',
    },
  },
  {
    topic: 'Triangles Classification – Angles Sum & Type',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In triangle `PQR`, angle `P = 42°` and angle `Q = 48°`. What kind of triangle is `PQR` based on its angles?',
      opts: ['Right-angled triangle (90°)', 'Acute-angled triangle', 'Obtuse-angled triangle', 'Equilateral triangle'],
      exp: 'Angle `R = 180° − (42° + 48°) = 90°`, making `PQR` a right-angled triangle.',
    },
    mr: {
      q: '`△PQR` मध्ये कोन `P = 42°` आणि कोन `Q = 48°` असल्यास हा कोनांवरून कोणत्या प्रकारचा त्रिकोण आहे?',
      opts: ['काटकोन त्रिकोण (90°)', 'लघुकोन त्रिकोण', 'विशालकोन त्रिकोण', 'समभुज त्रिकोण'],
      exp: 'तिसरा कोन `R = 180° − (42° + 48°) = 90°` येतो, म्हणून हा काटकोन त्रिकोण आहे.',
    },
    hi: {
      q: 'त्रिभुज `PQR` में कोण `P = 42°` तथा कोण `Q = 48°` है। कोणों के आधार पर यह कैसा त्रिभुज है?',
      opts: ['समकोण त्रिभुज (90°)', 'न्यूनकोण त्रिभुज', 'अधिककोण त्रिभुज', 'समबाहु त्रिभुज'],
      exp: 'तीसरा कोण `R = 180° − 90° = 90°` होने से यह समकोण त्रिभुज है।',
    },
  },
  {
    topic: 'Circle Diameter & Radius Relationship',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If the sum of the diameter and radius of a circular rangoli border is `36 cm`, what is the diameter of the rangoli?',
      opts: ['24 cm', '12 cm', '18 cm', '27 cm'],
      exp: '`Diameter = 2r`, so `2r + r = 3r = 36` → `r = 12 cm`. Therefore diameter = `2 × 12 = 24 cm`.',
    },
    mr: {
      q: 'एका गोलाकार रांगोळीचा व्यास आणि त्रिज्या यांची बेरीज `36 सेमी` असल्यास त्या रांगोळीचा व्यास किती?',
      opts: ['24 सेमी', '12 सेमी', '18 सेमी', '27 सेमी'],
      exp: '`व्यास (2r) + त्रिज्या (r) = 3r = 36` → `r = 12 सेमी`. म्हणून व्यास = `24 सेमी`.',
    },
    hi: {
      q: 'एक वृत्ताकार रंगोली के व्यास और त्रिज्या का योग `36 सेमी` है। रंगोली का व्यास कितना है?',
      opts: ['24 सेमी', '12 सेमी', '18 सेमी', '27 सेमी'],
      exp: '`2r + r = 3r = 36` ⇒ `r = 12 सेमी`, अतः व्यास = `24 सेमी`।',
    },
  },
  {
    topic: 'Divisibility Rule Missing Digit for 11',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'What single digit `*` makes the 5-digit number `74*82` divisible by `11`?',
      opts: ['3', '5', '8', '1'],
      exp: 'By the divisibility rule of `11`, `(7 + * + 2) − (4 + 8) = 0`, so `(9 + *) − 12 = 0` giving `* = 3` (`74,382 ÷ 11 = 6,762`).',
    },
    mr: {
      q: '`74*82` ही ५-अंकी संख्या `11` ने पूर्ण भाग जाण्यासाठी `*` च्या जागी कोणता एकअंकी अंक असावा?',
      opts: ['3', '5', '8', '1'],
      exp: '`11` च्या कसोटीनुसार `(7 + * + 2) − (4 + 8) = 0` → `(9 + *) − 12 = 0` → `* = 3` (`74,382 ÷ 11 = 6,762`).',
    },
    hi: {
      q: 'संख्या `74*82` को `11` से पूर्णतः विभाज्य बनाने के लिए `*` के स्थान पर कौन-सा अंक आएगा?',
      opts: ['3', '5', '8', '1'],
      exp: '`11` की विभाज्यता अनुसार `(7 + * + 2) − (4 + 8) = 0` ⇒ `* = 3` (`74,382 ÷ 11 = 6,762`)।',
    },
  },
  {
    topic: 'Percentage Basic Fruit Basket Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Out of `80` mangoes in a crate, `15%` turned out unripe and `10%` were bruised. How many good ripe mangoes remained?',
      opts: ['60 mangoes', '20 mangoes', '64 mangoes', '55 mangoes'],
      exp: 'Good mangoes = `100% − (15% + 10%) = 75%` of `80` = `(75/100) × 80 = 60` mangoes.',
    },
    mr: {
      q: 'एका पेटीतील `80` आंब्यांपैकी `15%` कच्चे निघाले आणि `10%` खराब झाले, तर चांगले पिकलेले किती आंबे उरले?',
      opts: ['60 आंबे', '20 आंबे', '64 आंबे', '55 आंबे'],
      exp: 'चांगले आंबे = `100% − 25% = 75%` म्हणजेच `(75/100) × 80 = 60` आंबे.',
    },
    hi: {
      q: 'एक टोकरी के `80` आमों में से `15%` कच्चे तथा `10%` खराब निकले। कितने अच्छे पके आम बचे?',
      opts: ['60 आम', '20 आम', '64 आम', '55 आम'],
      exp: 'अच्छे आम = `80` का `75%` = `60` आम।',
    },
  },
  {
    topic: 'Number Sequence Alternating Pattern',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the missing number in the sequence: `3, 7, 13, 21, 31, ___ , 57`',
      opts: ['43', '41', '45', '39'],
      exp: 'Successive differences increase by `2`: `+4, +6, +8, +10, +12, +14`. Thus `31 + 12 = 43` (and `43 + 14 = 57`).',
    },
    mr: {
      q: 'पुढील संख्यामालिकेतील गाळलेली संख्या शोधा: `3, 7, 13, 21, 31, ___ , 57`',
      opts: ['43', '41', '45', '39'],
      exp: 'फरक क्रमाने `+4, +6, +8, +10, +12, +14` असा वाढत जातो. म्हणून `31 + 12 = 43`.',
    },
    hi: {
      q: 'श्रेणी में लुप्त संख्या ज्ञात कीजिए: `3, 7, 13, 21, 31, ___ , 57`',
      opts: ['43', '41', '45', '39'],
      exp: 'अंतर क्रमशः `+4, +6, +8, +10, +12, +14` बढ़ रहा है, अतः `31 + 12 = 43`।',
    },
  },
  {
    topic: 'Profit & Loss Simple Notebook Sale',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A shopkeeper buys `15` geometry boxes for `₹900` total and sells each box at `₹72`. What is his total profit?',
      opts: ['₹180', '₹120', '₹200', '₹150'],
      exp: 'Total selling price = `15 × 72 = ₹1,080`. Profit = `1,080 − 900 = ₹180`.',
    },
    mr: {
      q: 'एका दुकानदाराने `15` कंपास पेट्या एकूण `₹900` ला आणल्या आणि प्रत्येक पेटी `₹72` प्रमाणे विकली, तर त्याला एकूण किती रुपये नफा झाला?',
      opts: ['₹180', '₹120', '₹200', '₹150'],
      exp: 'एकूण विक्री किंमत = `15 × 72 = ₹1,080`. नफा = `1,080 − 900 = ₹180`.',
    },
    hi: {
      q: 'एक दुकानदार `₹900` में `15` ज्योमेट्री बॉक्स खरीदकर प्रत्येक को `₹72` में बेचता है। उसका कुल लाभ कितना है?',
      opts: ['₹180', '₹120', '₹200', '₹150'],
      exp: 'कुल विक्रय मूल्य = `15 × 72 = ₹1,080`। लाभ = `1,080 − 900 = ₹180`।',
    },
  },
  {
    topic: 'Unitary Method Worker Days Inverse Proportion',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'If `12` volunteers clean a village school garden in `6 hours`, how many hours would `9` volunteers working at the same pace take?',
      opts: ['8 hours', '4.5 hours', '9 hours', '7 hours'],
      exp: 'Total work = `12 × 6 = 72 volunteer-hours`. Time for `9` volunteers = `72 ÷ 9 = 8 hours`.',
    },
    mr: {
      q: 'जर `12` स्वयंसेवक शाळेची बाग `6 तासांत` स्वच्छ करतात, तर त्याच वेगाने काम करणारे `9` स्वयंसेवक तेच काम किती तासांत पूर्ण करतील?',
      opts: ['8 तास', '4.5 तास', '9 तास', '7 तास'],
      exp: 'एकूण काम = `12 × 6 = 72` मनुष्य-तास. `9` स्वयंसेवकांचा वेळ = `72 ÷ 9 = 8 तास`.',
    },
    hi: {
      q: 'यदि `12` स्वयंसेवक विद्यालय बाग `6 घंटे` में साफ करते हैं, तो समान गति से `9` स्वयंसेवक वही कार्य कितने घंटे में पूरा करेंगे?',
      opts: ['8 घंटे', '4.5 घंटे', '9 घंटे', '7 घंटे'],
      exp: 'कुल कार्य = `12 × 6 = 72`। समय = `72 ÷ 9 = 8 घंटे`।',
    },
  },
  {
    topic: 'Calendar Leap Year February Counting',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'How many total days are there in the three consecutive months January, February, and March of the leap year `2024`?',
      opts: ['91 days', '90 days', '92 days', '89 days'],
      exp: '`2024` is divisible by `4`, so Feb has `29` days. Total = `31 + 29 + 31 = 91 days`.',
    },
    mr: {
      q: '`2024` या लीप वर्षातील जानेवारी, फेब्रुवारी आणि मार्च या तीन सलग महिन्यांचे एकूण दिवस किती होतात?',
      opts: ['91 दिवस', '90 दिवस', '92 दिवस', '89 दिवस'],
      exp: '`2024` हे लीप वर्ष असल्याने फेब्रुवारीचे `29` दिवस असतात. एकूण = `31 + 29 + 31 = 91 दिवस`.',
    },
    hi: {
      q: 'लीप वर्ष `2024` में जनवरी, फरवरी और मार्च—इन तीन लगातार महीनों में कुल कितने दिन थे?',
      opts: ['91 दिन', '90 दिन', '92 दिन', '89 दिन'],
      exp: 'लीप वर्ष में फरवरी `29` दिन की होती है, अतः `31 + 29 + 31 = 91 दिन`।',
    },
  },
  {
    topic: 'Cuboid Volume Water Tank Fill',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A cuboidal fish aquarium is `50 cm` long, `30 cm` wide, and filled with water to a height of `20 cm`. How many litres of water does it contain (`1,000 cm³ = 1 litre`)?',
      opts: ['30 litres', '3 litres', '300 litres', '15 litres'],
      exp: 'Volume = `50 × 30 × 20 = 30,000 cm³ = 30,000 ÷ 1,000 = 30 litres`.',
    },
    mr: {
      q: 'एका इष्टिकाचिती आकाराच्या मत्स्यालयाची लांबी `50 सेमी`, रुंदी `30 सेमी` आणि त्यात `20 सेमी` उंचीपर्यंत पाणी भरलेले आहे, तर त्यात किती लिटर पाणी आहे (`1,000 घ.सेमी = 1 लिटर`)?',
      opts: ['30 लिटर', '3 लिटर', '300 लिटर', '15 लिटर'],
      exp: 'घनफळ = `50 × 30 × 20 = 30,000 घ.सेमी = 30 लिटर`.',
    },
    hi: {
      q: 'एक घनाभाकार मछलीघर `50 सेमी` लंबा, `30 सेमी` चौड़ा और `20 सेमी` ऊँचाई तक पानी से भरा है। इसमें कितने लीटर पानी है (`1,000 घन सेमी = 1 लीटर`)?',
      opts: ['30 लीटर', '3 लीटर', '300 लीटर', '15 लीटर'],
      exp: 'आयतन = `50 × 30 × 20 = 30,000 घन सेमी = 30 लीटर`।',
    },
  },
  {
    topic: 'Angle Type Complementary & Supplementary Pair',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'If the measure of an angle is `38°`, what is the difference between its supplementary angle and its complementary angle?',
      opts: ['90°', '52°', '142°', '38°'],
      exp: 'Supplement = `180° − 38° = 142°`; Complement = `90° − 38° = 52°`. Difference = `142° − 52° = 90°` (always `90°`).',
    },
    mr: {
      q: 'जर एका कोनाचे माप `38°` असेल, तर त्याच्या पूरक कोनाचे माप आणि कोटिकोनाचे माप यांतील फरक किती अंश असतो?',
      opts: ['90°', '52°', '142°', '38°'],
      exp: 'पूरक कोन = `180° − 38° = 142°`; कोटिकोन = `90° − 38° = 52°`. फरक = `142° − 52° = 90°`.',
    },
    hi: {
      q: 'यदि एक कोण `38°` का है, तो उसके संपूरक कोण तथा पूरक/कोटिकोन के बीच कितने डिग्री का अंतर है?',
      opts: ['90°', '52°', '142°', '38°'],
      exp: '`142° − 52° = 90°`।',
    },
  },
  {
    topic: 'Average Adjustment When One Item Leaves',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'The average score of `5` pupils in a spelling test is `18`. When one pupil’s paper is removed, the average of the remaining `4` rises to `19`. What score was on the removed paper?',
      opts: ['14', '15', '17', '16'],
      exp: 'Total of 5 = `5 × 18 = 90`; total of remaining 4 = `4 × 19 = 76`. Removed score = `90 − 76 = 14`.',
    },
    mr: {
      q: '`5` विद्यार्थ्यांच्या चाचणीतील गुणांची सरासरी `18` आहे. एकाचा पेपर बाजूला काढल्यास उरलेल्या `4` जणांची सरासरी `19` होते, तर बाजूला काढलेल्या पेपरचे गुण किती?',
      opts: ['14', '15', '17', '16'],
      exp: '5 जणांची बेरीज = `90`; 4 जणांची बेरीज = `76`. काढलेले गुण = `90 − 76 = 14`.',
    },
    hi: {
      q: '`5` छात्रों के औसत अंक `18` हैं। एक छात्र की कॉपी हटाने पर शेष `4` का औसत `19` हो जाता है। हटाई गई कॉपी में कितने अंक थे?',
      opts: ['14', '15', '17', '16'],
      exp: '`5×18 − 4×19 = 90 − 76 = 14`।',
    },
  },
  {
    topic: 'BODMAS Fraction & Whole Number Brackets',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Simplify carefully: `48 − [18 + {12 − (9 − 5)}]`',
      opts: ['22', '26', '18', '20'],
      exp: '`9 − 5 = 4`; `12 − 4 = 8`; `18 + 8 = 26`; `48 − 26 = 22`.',
    },
    mr: {
      q: 'सोपे रूप द्या: `48 − [18 + {12 − (9 − 5)}]`',
      opts: ['22', '26', '18', '20'],
      exp: '`9 − 5 = 4`; `12 − 4 = 8`; `18 + 8 = 26`; `48 − 26 = 22`.',
    },
    hi: {
      q: 'सरल कीजिए: `48 − [18 + {12 − (9 − 5)}]`',
      opts: ['22', '26', '18', '20'],
      exp: '`48 − [18 + {12 − 4}] = 48 − [18 + 8] = 48 − 26 = 22`।',
    },
  },
  {
    topic: 'Prime Numbers Sum Range Between 30 and 50',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What is the sum of ALL prime numbers strictly between `30` and `45`?',
      opts: ['152', '109', '115', '195'],
      exp: 'Primes between 30 and 45 are `31, 37, 41, 43`. Their sum = `31 + 37 + 41 + 43 = 152`.',
    },
    mr: {
      q: '`30` ते `45` दरम्यानच्या सर्व मूळ संख्यांची बेरीज किती येते?',
      opts: ['152', '109', '115', '195'],
      exp: '`30` ते `45` मधील मूळ संख्या = `31, 37, 41, 43`. बेरीज = `31 + 37 + 41 + 43 = 152`.',
    },
    hi: {
      q: '`30` से `45` के बीच सभी अभाज्य संख्याओं का योग कितना है?',
      opts: ['152', '109', '115', '195'],
      exp: 'अभाज्य संख्याएँ `31, 37, 41, 43` हैं। योग = `31 + 37 + 41 + 43 = 152`।',
    },
  },
  {
    topic: '2D Shape Diagonals Count Quadrilateral vs Pentagon',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many total diagonals can be drawn inside a regular convex pentagon (`5` sides)?',
      opts: ['5 diagonals', '2 diagonals', '4 diagonals', '10 diagonals'],
      exp: 'Formula `n(n − 3) / 2` gives `5 × 2 / 2 = 5` diagonals forming a star inside a pentagon.',
    },
    mr: {
      q: 'एका नियमित पंचकोनामध्ये (`5` बाजू) एकूण किती कर्ण काढता येतात?',
      opts: ['5 कर्ण', '2 कर्ण', '4 कर्ण', '10 कर्ण'],
      exp: '`n(n − 3)/2` या सूत्रानुसार `5 × 2 / 2 = 5` कर्ण काढता येतात.',
    },
    hi: {
      q: 'एक पंचभुज (`5` भुजाओं वाले बहुभुज) के भीतर कुल कितने विकर्ण खींचे जा सकते हैं?',
      opts: ['5 विकर्ण', '2 विकर्ण', '4 विकर्ण', '10 विकर्ण'],
      exp: '`5(5 − 3)/2 = 5` विकर्ण।',
    },
  },
];
