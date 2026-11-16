import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 5 (32 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C5: CuratedTrilingualMcq[] = [
  {
    topic: 'Greatest Even & Smallest Odd Digit Addition',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'What is the sum of the greatest 4-digit EVEN number and the smallest 3-digit ODD number?',
      opts: ['10,099', '10,100', '10,098', '9,999'],
      exp: 'Greatest 4-digit even = 9,998; smallest 3-digit odd = 101. Sum = 9,998 + 101 = 10,099.',
    },
    mr: {
      q: 'सर्वात मोठी ४-अंकी सम संख्या आणि सर्वात लहान ३-अंकी विषम संख्या यांची बेरीज किती?',
      opts: ['10,099', '10,100', '10,098', '9,999'],
      exp: '९,९९८ + १०१ = १०,०९९.',
    },
    hi: {
      q: 'सबसे बड़ी ४-अंकीय सम संख्या तथा सबसे छोटी ३-अंकीय विषम संख्या का योगफल क्या है?',
      opts: ['10,099', '10,100', '10,098', '9,999'],
      exp: '९,९९८ + १०१ = १०,०९९।',
    },
  },
  {
    topic: 'Fraction Pizza Remainder Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Ravi ate 1/3 of a bhakri and Sita ate 1/6 of the same bhakri. What simplified fraction of the bhakri is left?',
      opts: ['1/2', '2/3', '1/6', '1/3'],
      exp: 'Eaten = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Left = 1 − 1/2 = 1/2.',
    },
    mr: {
      q: 'रवीने एका भाकरीचा १/३ भाग आणि सीताने १/६ भाग खाल्ला, तर त्या भाकरीचा किती भाग शिल्लक राहिला?',
      opts: ['1/2', '2/3', '1/6', '1/3'],
      exp: 'खाल्लेला भाग = १/३ + १/६ = ३/६ = १/२. शिल्लक = १/२.',
    },
    hi: {
      q: 'रवि ने एक रोटी का १/३ भाग और सीता ने १/६ भाग खाया। अब रोटी का कितना भाग बचा है?',
      opts: ['1/2', '2/3', '1/6', '1/3'],
      exp: 'कुल खाया = १/३ + १/६ = १/२। शेष = १/२।',
    },
  },
  {
    topic: 'Decimal Subtraction with Zero Padding',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Calculate accurately: 15 − 6.847.',
      opts: ['8.153', '9.153', '8.253', '8.847'],
      exp: '15.000 − 6.847 = 8.153 (check: 8.153 + 6.847 = 15.000).',
    },
    mr: {
      q: 'अचूक वजाबाकी करा: १५ − ६.८४७ = ?',
      opts: ['8.153', '9.153', '8.253', '8.847'],
      exp: '१५.००० − ६.८४७ = ८.१५३.',
    },
    hi: {
      q: 'सटीक मान ज्ञात कीजिए: १५ − ६.८४७ = ?',
      opts: ['8.153', '9.153', '8.253', '8.847'],
      exp: '१५.००० − ६.८४७ = ८.१५३।',
    },
  },
  {
    topic: 'Kilometre and Metre Mixed Unit Conversion',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Convert 2 km 75 m completely into metres.',
      opts: ['2,075 m', '2,750 m', '20,075 m', '275 m'],
      exp: '2 km = 2 × 1,000 = 2,000 m. Adding 75 m gives 2,075 m.',
    },
    mr: {
      q: '२ किलोमीटर ७५ मीटर म्हणजे एकूण किती मीटर?',
      opts: ['2,075 m', '2,750 m', '20,075 m', '275 m'],
      exp: '२,००० मी + ७५ मी = २,०७५ मी.',
    },
    hi: {
      q: '२ किलोमीटर ७५ मीटर को मीटर में बदलिए।',
      opts: ['2,075 m', '2,750 m', '20,075 m', '275 m'],
      exp: '२,००० मी + ७५ मी = २,०७५ मीटर।',
    },
  },
  {
    topic: 'Square Area to Equilateral Triangle Side Transfer',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A square tile has an area of 36 cm². An equilateral triangle has the EXACT SAME perimeter as this square. What is the side length of the triangle?',
      opts: ['8 cm', '6 cm', '12 cm', '9 cm'],
      exp: 'Square area = 36 ⇒ side = 6 cm ⇒ perimeter = 4 × 6 = 24 cm. Equilateral triangle side = 24 ÷ 3 = 8 cm.',
    },
    mr: {
      q: 'एका चौरस फरशीचे क्षेत्रफळ ३६ चौ.सेमी आहे. तितकीच परिमिती असणाऱ्या समभुज त्रिकोणाच्या एका बाजूची लांबी किती सेमी असेल?',
      opts: ['8 cm', '6 cm', '12 cm', '9 cm'],
      exp: 'चौरस बाजू = ६ सेमी ⇒ परिमिती = २४ सेमी. त्रिकोण बाजू = २४ ÷ ३ = ८ सेमी.',
    },
    hi: {
      q: 'एक वर्ग का क्षेत्रफल ३६ वर्ग सेमी है। इसके बराबर परिमाप वाले समबाहु त्रिभुज की प्रत्येक भुजा कितनी होगी?',
      opts: ['8 cm', '6 cm', '12 cm', '9 cm'],
      exp: 'वर्ग भुजा = ६ सेमी ⇒ परिमाप = २४ सेमी। त्रिभुज भुजा = २४ ÷ ३ = ८ सेमी।',
    },
  },
  {
    topic: 'Clock Reflex Angle Measure',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'At exactly 8:00 o’clock, the smaller angle between clock hands is 120°. What is the REFLEX angle formed on the opposite side?',
      opts: ['240°', '180°', '210°', '260°'],
      exp: 'Angles around the centre sum to 360°. Reflex angle = 360° − 120° = 240°.',
    },
    mr: {
      q: 'ठीक ८:०० वाजता घड्याळाच्या काट्यांमध्ये एक लहान कोन १२०° चा असतो, तर दुसऱ्या बाजूने तयार होणारा प्रविशाल कोन (Reflex Angle) किती अंशांचा असतो?',
      opts: ['240°', '180°', '210°', '260°'],
      exp: '३६०° − १२०° = २४०°.',
    },
    hi: {
      q: 'ठीक ८:०० बजे घड़ी की सुइयों के बीच छोटा कोण १२०° है, तो दूसरी ओर का वृहत् कोण (Reflex Angle) कितने अंश का होगा?',
      opts: ['240°', '180°', '210°', '260°'],
      exp: '३६०° − १२०° = २४०°।',
    },
  },
  {
    topic: 'Triangle Classification by Side Lengths',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A folded paper triangle has side lengths 5 cm, 5 cm, and 8 cm. How is this triangle classified based on its sides?',
      opts: ['Isosceles Triangle', 'Equilateral Triangle', 'Scalene Triangle', 'Right-Equilateral Triangle'],
      exp: 'Exactly two sides are equal in length (5 cm = 5 cm ≠ 8 cm), making it an Isosceles Triangle.',
    },
    mr: {
      q: 'एका कागदी त्रिकोणाच्या बाजू ५ सेमी, ५ सेमी आणि ८ सेमी आहेत. बाजूंच्या लांबीनुसार हा कोणत्या प्रकारचा त्रिकोण आहे?',
      opts: ['समद्विभुज त्रिकोण (Isosceles)', 'समभुज त्रिकोण (Equilateral)', 'विषमभुज त्रिकोण (Scalene)', 'काटकोन समभुज त्रिकोण'],
      exp: 'दोन बाजू समान असल्याने हा समद्विभुज त्रिकोण आहे.',
    },
    hi: {
      q: 'एक त्रिभुज की भुजाएँ ५ सेमी, ५ सेमी तथा ८ सेमी हैं। भुजाओं के आधार पर यह किस प्रकार का त्रिभुज है?',
      opts: ['समद्विबाहु त्रिभुज (Isosceles)', 'समबाहु त्रिभुज (Equilateral)', 'विषमबाहु त्रिभुज (Scalene)', 'समकोण समबाहु'],
      exp: 'दो भुजाएँ बराबर होने के कारण यह समद्विबाहु त्रिभुज है।',
    },
  },
  {
    topic: 'Parallel Lines Real-World Example Recognition',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'The two steel rails of a straight railway track best illustrate which geometric pair of lines?',
      opts: ['Parallel Lines', 'Perpendicular Lines', 'Intersecting Lines', 'Concurrent Rays'],
      exp: 'Straight rails run on the same plane at a constant perpendicular distance apart without ever meeting—defining Parallel Lines.',
    },
    mr: {
      q: 'सरळ रेल्वे रुळांच्या दोन पट्ट्या हे कोणत्या भौमितिक रेषांचे उत्तम उदाहरण आहे?',
      opts: ['समांतर रेषा (Parallel Lines)', 'लंब रेषा (Perpendicular)', 'छेदणाऱ्या रेषा', 'एकसंपाती किरण'],
      exp: 'दोन रुळांमधील अंतर सर्वत्र समान असते व ते कधीही छेदत नाहीत म्हणून त्या समांतर रेषा आहेत.',
    },
    hi: {
      q: 'सीधी रेल की दो पटरियाँ किस ज्यामितीय अवधारणा का श्रेष्ठ उदाहरण हैं?',
      opts: ['समांतर रेखाएँ (Parallel Lines)', 'लंबवत रेखाएँ', 'प्रतिच्छेदी रेखाएँ', 'संगामी किरणें'],
      exp: 'दोनों पटरियों के बीच दूरी समान रहती है और वे कभी मिलती नहीं—अतः समांतर रेखाएँ हैं।',
    },
  },
  {
    topic: 'Units Digit Multiplication Pattern',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Without multiplying out completely, find the UNITS (ones) digit of the product: 37 × 48 × 59.',
      opts: ['4', '6', '2', '8'],
      exp: 'Multiply only the unit digits step-by-step: 7 × 8 = 56 (unit digit 6); then 6 × 9 = 54 (unit digit 4).',
    },
    mr: {
      q: 'पूर्ण गुणाकार न करता ३७ × ४८ × ५९ या गुणाकाराच्या एकक स्थानी कोणता अंक येईल ते सांगा.',
      opts: ['4', '6', '2', '8'],
      exp: 'एकक अंक गुणाकार: ७ × ८ = ५६ (एकक ६); पुढे ६ × ९ = ५४ ⇒ एकक स्थानी ४.',
    },
    hi: {
      q: 'बिना पूरा गुणा किए गुणनफल ३७ × ४८ × ५९ का इकाई अंक ज्ञात कीजिए।',
      opts: ['4', '6', '2', '8'],
      exp: 'इकाई अंक: ७ × ८ = ५६ (६), ६ × ९ = ५४ ⇒ इकाई अंक = ४।',
    },
  },
  {
    topic: 'Long Division Remainder of 1,000 by 13',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'When 1,000 is divided by 13, what whole-number remainder is left over?',
      opts: ['12', '1', '9', '11'],
      exp: '13 × 76 = 988. Remainder = 1,000 − 988 = 12.',
    },
    mr: {
      q: '१,००० ला १३ ने भागल्यास बाकी किती उरते?',
      opts: ['12', '1', '9', '11'],
      exp: '१३ × ७६ = ९८८; बाकी = १,००० − ९८८ = १२.',
    },
    hi: {
      q: '१,००० को १३ से भाग देने पर शेषफल क्या बचेगा?',
      opts: ['12', '1', '9', '11'],
      exp: '१३ × ७६ = ९८८; शेष = १,००० − ९८८ = १२।',
    },
  },
  {
    topic: 'Divisibility Rule for 6 Combined Check',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following numbers is completely divisible by 6: 4,515, 4,516, 4,518, or 4,514?',
      opts: ['4,518', '4,515', '4,516', '4,514'],
      exp: 'A number divisible by 6 must be EVEN and have digit sum divisible by 3. 4,518 is even and 4+5+1+8 = 18 (multiple of 3).',
    },
    mr: {
      q: '४,५१५, ४,५१६, ४,५१८ आणि ४,५१४ यांपैकी कोणत्या संख्येला ६ ने नि:शेष भाग जातो?',
      opts: ['4,518', '4,515', '4,516', '4,514'],
      exp: '४,५१८ सम संख्या आहे व अंकांची बेरीज १८ (३ च्या पटीत) असल्याने ६ ने भाग जातो.',
    },
    hi: {
      q: '४,५१५, ४,५१६, ४,५१८ और ४,५१४ में से कौन-सी संख्या ६ से पूर्णतः विभाज्य है?',
      opts: ['4,518', '4,515', '4,516', '4,514'],
      exp: '४,५१८ सम है और अंकों का योग १८ (३ से विभाज्य) है।',
    },
  },
  {
    topic: 'HCF and LCM Product Identity',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'The HCF of two numbers is 6 and their LCM is 72. If one of the numbers is 18, find the OTHER number.',
      opts: ['24', '36', '12', '48'],
      exp: 'HCF × LCM = Product of numbers ⇒ Other number = (6 × 72) ÷ 18 = 6 × 4 = 24.',
    },
    mr: {
      q: 'दोन संख्यांचा मसावि ६ आणि लसावि ७२ आहे. त्यांपैकी एक संख्या १८ असल्यास दुसरी संख्या कोणती?',
      opts: ['24', '36', '12', '48'],
      exp: 'दुसरी संख्या = (मसावि × लसावि) ÷ पहिली संख्या = (६ × ७२) ÷ १८ = २४.',
    },
    hi: {
      q: 'दो संख्याओं का म.स. ६ तथा ल.स. ७२ है। यदि एक संख्या १८ हो, तो दूसरी संख्या क्या होगी?',
      opts: ['24', '36', '12', '48'],
      exp: 'दूसरी संख्या = (६ × ७२) ÷ १८ = २४।',
    },
  },
  {
    topic: 'Elapsed Time AM to PM Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school sports meet began at 9:35 AM and concluded at 2:15 PM on the same day. How long did the event last?',
      opts: ['4 hours 40 minutes', '5 hours 20 minutes', '4 hours 20 minutes', '3 hours 40 minutes'],
      exp: '9:35 AM to 12:00 Noon = 2 h 25 min. Add 2 h 15 min ⇒ 4 hours 40 minutes.',
    },
    mr: {
      q: 'शाळेची क्रीडा स्पर्धा सकाळी ९:३५ वाजता सुरू होऊन दुपारी २:१५ वाजता संपली. स्पर्धा एकूण किती वेळ चालली?',
      opts: ['4 hours 40 minutes', '5 hours 20 minutes', '4 hours 20 minutes', '3 hours 40 minutes'],
      exp: '९:३५ ते १२:०० = २ तास २५ मिनिटे; पुढे २ तास १५ मिनिटे ⇒ ४ तास ४० मिनिटे.',
    },
    hi: {
      q: 'विद्यालय खेलकूद प्रतियोगिता प्रातः ९:३५ बजे आरंभ होकर दोपहर २:१५ बजे समाप्त हुई। कुल अवधि कितनी थी?',
      opts: ['4 hours 40 minutes', '5 hours 20 minutes', '4 hours 20 minutes', '3 hours 40 minutes'],
      exp: '२ घं २५ मि + २ घं १५ मि = ४ घंटे ४० मिनट।',
    },
  },
  {
    topic: 'Quarterly Month Day Sum in Leap Year',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many TOTAL days are there in January, February, and March of the leap year 2024 combined?',
      opts: ['91 days', '90 days', '92 days', '89 days'],
      exp: 'Jan (31) + Feb 2024 leap (29) + Mar (31) = 91 days (exactly 13 weeks).',
    },
    mr: {
      q: '२०२४ या लीप वर्षातील जानेवारी, फेब्रुवारी आणि मार्च या तीन महिन्यांचे मिळून एकूण किती दिवस होतात?',
      opts: ['91 days', '90 days', '92 days', '89 days'],
      exp: '३१ + २९ + ३१ = ९१ दिवस.',
    },
    hi: {
      q: 'अधिवर्ष २०२४ के जनवरी, फरवरी तथा मार्च महीनों में मिलाकर कुल कितने दिन होते हैं?',
      opts: ['91 days', '90 days', '92 days', '89 days'],
      exp: '३१ + २९ + ३१ = ९१ दिन।',
    },
  },
  {
    topic: 'Mean Height Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'The heights of four classmates are 132 cm, 138 cm, 144 cm, and 146 cm. What is their average height?',
      opts: ['140 cm', '139 cm', '141 cm', '138 cm'],
      exp: 'Sum = 132 + 138 + 144 + 146 = 560 cm. Average = 560 ÷ 4 = 140 cm.',
    },
    mr: {
      q: 'चार मित्रांची उंची अनुक्रमे १३२ सेमी, १३८ सेमी, १४४ सेमी आणि १४६ सेमी आहे. त्यांची सरासरी उंची किती?',
      opts: ['140 cm', '139 cm', '141 cm', '138 cm'],
      exp: 'एकूण बेरीज = ५६० सेमी; सरासरी = ५६० ÷ ४ = १४० सेमी.',
    },
    hi: {
      q: 'चार मित्रों की लंबाइयाँ १३२ सेमी, १३८ सेमी, १४४ सेमी तथा १४६ सेमी हैं। इनकी औसत लंबाई क्या है?',
      opts: ['140 cm', '139 cm', '141 cm', '138 cm'],
      exp: 'योग = ५६० सेमी; औसत = ५६० ÷ ४ = १४० सेमी।',
    },
  },
  {
    topic: 'Pictograph Half-Symbol Interpretation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In a school pictograph, 1 smiley face represents 8 students. To display 60 students using full and half smiley icons, how many should be drawn?',
      opts: ['7 full smileys and 1 half smiley', '7 full smileys', '8 full smileys', '6 full smileys and 1 half smiley'],
      exp: '60 ÷ 8 = 7.5 ⇒ 7 × 8 = 56 students + half smiley (4 students) = 60 students.',
    },
    mr: {
      q: 'चित्रालेखात १ स्मायली चिन्ह = ८ विद्यार्थी दर्शवते. ६० विद्यार्थी दाखवण्यासाठी किती पूर्ण व किती अर्धी स्मायली चिन्हे काढावी लागतील?',
      opts: ['7 full smileys and 1 half smiley', '7 full smileys', '8 full smileys', '6 full smileys and 1 half smiley'],
      exp: '७ × ८ = ५६ आणि अर्धे चिन्ह = ४; ५६ + ४ = ६० विद्यार्थी.',
    },
    hi: {
      q: 'चित्रालेख में १ स्माइली प्रतीक = ८ विद्यार्थी दर्शाता है। ६० विद्यार्थियों को दर्शाने हेतु कितने प्रतीक बनाने होंगे?',
      opts: ['7 full smileys and 1 half smiley', '7 full smileys', '8 full smileys', '6 full smileys and 1 half smiley'],
      exp: '७ पूर्ण (५६) + १ आधा (४) = ६० विद्यार्थी।',
    },
  },
  {
    topic: 'Rectangular Area Painting Cost',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A classroom blackboard measures 2.5 m by 1.2 m. What will it cost to repaint it at ₹45 per square metre?',
      opts: ['₹135', '₹112.50', '₹166.50', '₹180'],
      exp: 'Area = 2.5 × 1.2 = 3.0 m². Painting cost = 3 × 45 = ₹135.',
    },
    mr: {
      q: '२.५ मी लांब व १.२ मी रुंद फळ्यास प्रति चौ.मी. ₹४५ दराने रंग देण्याचा एकूण खर्च किती येईल?',
      opts: ['₹135', '₹112.50', '₹166.50', '₹180'],
      exp: 'क्षेत्रफळ = २.५ × १.२ = ३ चौ.मी. खर्च = ३ × ४५ = ₹१३५.',
    },
    hi: {
      q: '२.५ मी × १.२ मी श्यामपट्ट को ₹४५ प्रति वर्ग मीटर की दर से रंगने का खर्च कितना होगा?',
      opts: ['₹135', '₹112.50', '₹166.50', '₹180'],
      exp: 'क्षेत्रफल = ३ वर्ग मी; लागत = ३ × ४५ = ₹१३५।',
    },
  },
  {
    topic: 'Brick Count in One Cubic Metre',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Each clay brick measures 20 cm × 10 cm × 5 cm. How many such bricks pack together to equal a total volume of 1 cubic metre?',
      opts: ['1,000 bricks', '100 bricks', '500 bricks', '2,000 bricks'],
      exp: '1 m³ = 100 × 100 × 100 = 10,00,000 cm³. One brick = 20 × 10 × 5 = 1,000 cm³. Count = 10,00,000 ÷ 1,000 = 1,000 bricks.',
    },
    mr: {
      q: '२० सेमी × १० सेमी × ५ सेमी मापाच्या किती विटा रचल्यास त्यांचे एकूण घनफळ १ घनमीटर भरेल?',
      opts: ['1,000 bricks', '100 bricks', '500 bricks', '2,000 bricks'],
      exp: '१ घ.मी. = १०,००,००० घ.सेमी; १ वीट = १,००० घ.सेमी. विटा = १०,००,००० ÷ १,००० = १,०००.',
    },
    hi: {
      q: '२० सेमी × १० सेमी × ५ सेमी माप की कितनी ईंटें मिलकर १ घन मीटर आयतन बनाएँगी?',
      opts: ['1,000 bricks', '100 bricks', '500 bricks', '2,000 bricks'],
      exp: '१०,००,००० घ.सेमी ÷ १,००० घ.सेमी = १,००० ईंटें।',
    },
  },
  {
    topic: 'Loss Percentage Word Problem',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A wrist watch bought for ₹600 was later sold for ₹510. Calculate the percentage loss incurred.',
      opts: ['15% loss', '12% loss', '18% loss', '10% loss'],
      exp: 'Loss = 600 − 510 = ₹90. Loss % = (90 / 600) × 100 = 15%.',
    },
    mr: {
      q: '₹६०० ला घेतलेले मनगटी घड्याळ ₹५१० ला विकले, तर या व्यवहारात शेकडा किती तोटा झाला?',
      opts: ['15% loss', '12% loss', '18% loss', '10% loss'],
      exp: 'तोटा = ₹९०; शेकडा तोटा = (९० / ६००) × १०० = १५%.',
    },
    hi: {
      q: '₹६०० में खरीदी गई घड़ी ₹५१० में बेचने पर कितने प्रतिशत की हानि हुई?',
      opts: ['15% loss', '12% loss', '18% loss', '10% loss'],
      exp: 'हानि = ₹९०; प्रतिशत हानि = (९० / ६००) × १०० = १५%।',
    },
  },
  {
    topic: 'Milkman Fraction Sequential Sales',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A dairy vendor started with 18 litres of milk. She sold 2/3 in the morning and 1/2 of the REMAINING milk in the evening. How much milk was left unsold?',
      opts: ['3 litres', '6 litres', '4.5 litres', '1.5 litres'],
      exp: 'Morning sold = 2/3 × 18 = 12 L ⇒ Left = 6 L. Evening sold = 1/2 × 6 = 3 L ⇒ Remaining = 3 litres.',
    },
    mr: {
      q: 'एका दूधवाल्याकडे १८ लिटर दूध होते. सकाळी २/३ दूध व संध्याकाळी उरलेल्या दुधातील १/२ दूध विकले, तर किती लिटर दूध शिल्लक राहिले?',
      opts: ['3 litres', '6 litres', '4.5 litres', '1.5 litres'],
      exp: 'सकाळी १२ लिटर विकले (६ लिटर उरले); संध्याकाळी ६ चा १/२ = ३ लिटर विकल्यावर ३ लिटर शिल्लक.',
    },
    hi: {
      q: 'एक ग्वाले के पास १८ लीटर दूध था। सुबह २/३ और शाम को शेष का १/२ दूध बेचने के बाद कितना दूध बचा?',
      opts: ['3 litres', '6 litres', '4.5 litres', '1.5 litres'],
      exp: 'सुबह १२ ली बिका (शेष ६ ली)। शाम को ३ ली बिका ⇒ ३ लीटर शेष।',
    },
  },
  {
    topic: 'Comparing Fractions With Identical Numerator',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Without converting to decimals, identify the GREATEST fraction among 5/7, 5/9, 5/6, and 5/11.',
      opts: ['5/6', '5/11', '5/7', '5/9'],
      exp: 'When numerators are equal and positive, the fraction with the SMALLEST denominator represents the largest share ⇒ 5/6.',
    },
    mr: {
      q: '५/७, ५/९, ५/६ आणि ५/११ या अपूर्णांकांतील सर्वात मोठा अपूर्णांक कोणता?',
      opts: ['5/6', '5/11', '5/7', '5/9'],
      exp: 'अंश समान असल्यास ज्याचा छेद सर्वात लहान तो अपूर्णांक सर्वात मोठा असतो ⇒ ५/६.',
    },
    hi: {
      q: '५/७, ५/९, ५/६ तथा ५/११ में से सबसे बड़ा भिन्न कौन-सा है?',
      opts: ['5/6', '5/11', '5/7', '5/9'],
      exp: 'अंश समान होने पर सबसे छोटे हर वाला भिन्न सबसे बड़ा होता है ⇒ ५/६।',
    },
  },
  {
    topic: 'Rectangle Symmetry Lines Count',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many exact lines of reflection symmetry does a non-square rectangle have?',
      opts: ['2 lines of symmetry', '4 lines of symmetry', '1 line of symmetry', '0 lines of symmetry'],
      exp: 'A non-square rectangle folds symmetrically only along the horizontal and vertical midlines joining opposite midpoints (not along diagonals).',
    },
    mr: {
      q: 'चौरस नसलेल्या आयताला एकूण किती सममिती अक्ष (Lines of Symmetry) असतात?',
      opts: ['2 lines of symmetry', '4 lines of symmetry', '1 line of symmetry', '0 lines of symmetry'],
      exp: 'आयताच्या समोरासमोरील बाजूंच्या मध्यबिंदूंना जोडणाऱ्या २ रेषा सममिती अक्ष असतात (कर्ण सममिती अक्ष नसतात).',
    },
    hi: {
      q: 'एक आयत (जो वर्ग न हो) में कितनी सममिति रेखाएँ होती हैं?',
      opts: ['2 lines of symmetry', '4 lines of symmetry', '1 line of symmetry', '0 lines of symmetry'],
      exp: 'केवल विपरीत भुजाओं के मध्य-बिंदुओं को मिलाने वाली २ रेखाएँ सममिति अक्ष होती हैं।',
    },
  },
  {
    topic: 'Percentage to Decimal & Lowest Fraction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Express 35% correctly as BOTH a decimal and a simplified fraction.',
      opts: ['0.35 and 7/20', '3.5 and 7/20', '0.35 and 7/25', '0.035 and 35/100'],
      exp: '35% = 35/100 = 0.35 = (35÷5)/(100÷5) = 7/20.',
    },
    mr: {
      q: '३५% चे अचूक दशांश रूप व अतिसंक्षिप्त अपूर्णांक रूप कोणते?',
      opts: ['0.35 and 7/20', '3.5 and 7/20', '0.35 and 7/25', '0.035 and 35/100'],
      exp: '३५/१०० = ०.३५ आणि ७/२०.',
    },
    hi: {
      q: '३५% का सही दशमलव तथा सरलतम भिन्न रूप क्या है?',
      opts: ['0.35 and 7/20', '3.5 and 7/20', '0.35 and 7/25', '0.035 and 35/100'],
      exp: '३५/१०० = ०.३५ = ७/२०।',
    },
  },
  {
    topic: 'Stationery Combo Cost Unitary Problem',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Three ball pens cost ₹45 and five wooden pencils cost ₹30. What is the combined price of 4 ball pens and 4 pencils?',
      opts: ['₹84', '₹75', '₹96', '₹69'],
      exp: '1 pen = 45 ÷ 3 = ₹15; 1 pencil = 30 ÷ 5 = ₹6. Combined = 4(15) + 4(6) = 60 + 24 = ₹84.',
    },
    mr: {
      q: '३ पेनची किंमत ₹४५ आणि ५ पेन्सिलची किंमत ₹३० आहे. तर ४ पेन आणि ४ पेन्सिलची एकूण किंमत किती?',
      opts: ['₹84', '₹75', '₹96', '₹69'],
      exp: '१ पेन = ₹१५; १ पेन्सिल = ₹६. एकूण = ४(१५ + ६) = ₹८४.',
    },
    hi: {
      q: '३ पेन का मूल्य ₹४५ तथा ५ पेंसिलों का मूल्य ₹३० है। ४ पेन और ४ पेंसिलों का कुल मूल्य क्या होगा?',
      opts: ['₹84', '₹75', '₹96', '₹69'],
      exp: '१ पेन = ₹१५, १ पेंसिल = ₹६। कुल = ४ × (१५ + ६) = ₹८४।',
    },
  },
  {
    topic: 'Number Line Integer Hop',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Starting at −3 on an integer number line, you move 7 units to the RIGHT and then 2 units to the LEFT. On which integer do you land?',
      opts: ['+2', '+6', '−4', '0'],
      exp: '−3 + 7 = +4; +4 − 2 = +2.',
    },
    mr: {
      q: 'संख्यारेषेवर −३ पासून सुरुवात करून ७ एकक उजवीकडे व नंतर २ एकक डावीकडे गेल्यास आपण कोणत्या संख्येवर पोहोचतो?',
      opts: ['+2', '+6', '−4', '0'],
      exp: '−३ + ७ − २ = +२.',
    },
    hi: {
      q: 'संख्या रेखा पर −३ से ७ कदम दाएँ और फिर २ कदम बाएँ चलने पर किस पूर्णांक पर पहुँचेंगे?',
      opts: ['+2', '+6', '−4', '0'],
      exp: '−३ + ७ − २ = +२।',
    },
  },
  {
    topic: 'Nested Brackets BODMAS Evaluation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Simplify carefully using bracket hierarchy: 60 − [24 ÷ (6 − 2) × 5].',
      opts: ['30', '57', '36', '15'],
      exp: 'Innermost: 6 − 2 = 4 ⇒ 24 ÷ 4 = 6 ⇒ 6 × 5 = 30 ⇒ 60 − 30 = 30.',
    },
    mr: {
      q: 'कंसांच्या नियमानुसार किंमत काढा: ६० − [२४ ÷ (६ − २) × ५] = ?',
      opts: ['30', '57', '36', '15'],
      exp: '६० − [२४ ÷ ४ × ५] = ६० − [६ × ५] = ६० − ३० = ३०.',
    },
    hi: {
      q: 'कोष्ठक नियम से सरल कीजिए: ६० − [२४ ÷ (६ − २) × ५] = ?',
      opts: ['30', '57', '36', '15'],
      exp: '६० − [२४ ÷ ४ × ५] = ६० − ३० = ३०।',
    },
  },
  {
    topic: 'Standard Die Opposite Face Sum Rule',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'On a standard numbered die (1 to 6), every pair of opposite faces ALWAYS sums to 7. If 2 sits on the top face, which number rests on the bottom face?',
      opts: ['5', '6', '4', '3'],
      exp: 'Opposite face = 7 − 2 = 5.',
    },
    mr: {
      q: 'नेहमीच्या फाशावर समोरासमोरील पृष्ठांची बेरीज नेहमी ७ असते. जर वरच्या पृष्ठावर २ असतील, तर तळाशी कोणता अंक असेल?',
      opts: ['5', '6', '4', '3'],
      exp: '७ − २ = ५.',
    },
    hi: {
      q: 'मानक पासे के विपरीत फलकों का योग सदैव ७ होता है। यदि ऊपरी फलक पर २ हो, तो निचले फलक पर कौन-सा अंक होगा?',
      opts: ['5', '6', '4', '3'],
      exp: '७ − २ = ५।',
    },
  },
  {
    topic: 'Roman Numeral Subtraction Result',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate in Roman numerals: C − XLIV.',
      opts: ['LVI', 'LXVI', 'XLVI', 'LIV'],
      exp: 'C = 100 and XLIV = 44. 100 − 44 = 56, written LVI.',
    },
    mr: {
      q: 'रोमन संख्यांत उत्तर लिहा: C − XLIV = ?',
      opts: ['LVI', 'LXVI', 'XLVI', 'LIV'],
      exp: '१०० − ४४ = ५६ = LVI.',
    },
    hi: {
      q: 'रोमन अंक में मान बताइए: C − XLIV = ?',
      opts: ['LVI', 'LXVI', 'XLVI', 'LIV'],
      exp: '१०० − ४४ = ५६ = LVI।',
    },
  },
  {
    topic: 'Alphanumeric Square Pattern Sequence',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Determine the next term in the code pattern: A1, C4, E9, G16, ___.',
      opts: ['I25', 'H25', 'I20', 'J25'],
      exp: 'Letters advance by +2 (A, C, E, G → I) and numbers follow perfect squares (1², 2², 3², 4² → 5² = 25) ⇒ I25.',
    },
    mr: {
      q: 'A1, C4, E9, G16, ___ या अक्षर-अंक मालिकेतील पुढील पद ओळखा.',
      opts: ['I25', 'H25', 'I20', 'J25'],
      exp: 'अक्षरे +२ ने (I) आणि अंक वर्गसंख्या (५² = २५) म्हणून I25.',
    },
    hi: {
      q: 'अक्षर-अंक श्रृंखला A1, C4, E9, G16, ___ में अगला पद ज्ञात कीजिए।',
      opts: ['I25', 'H25', 'I20', 'J25'],
      exp: 'अक्षर +२ (I) और वर्ग संख्या (५² = २५) ⇒ I25।',
    },
  },
  {
    topic: 'Diagonals Inside a Pentagon',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many total diagonals can be drawn inside a regular pentagon (5-sided polygon)?',
      opts: ['5 diagonals', '2 diagonals', '10 diagonals', '4 diagonals'],
      exp: 'Number of diagonals in n-gon = n(n − 3)/2 = 5(5 − 3)/2 = 5 diagonals (forming a 5-pointed star inside).',
    },
    mr: {
      q: 'एका पंचकोनामध्ये (5-sided polygon) जास्तीत जास्त एकूण किती कर्ण काढता येतात?',
      opts: ['5 diagonals', '2 diagonals', '10 diagonals', '4 diagonals'],
      exp: 'कर्ण संख्या = ५(५ − ३)/२ = ५ कर्ण.',
    },
    hi: {
      q: 'एक पंचभुज (5-भुजा बहुभुज) में कुल कितने विकर्ण खींचे जा सकते हैं?',
      opts: ['5 diagonals', '2 diagonals', '10 diagonals', '4 diagonals'],
      exp: 'विकर्ण = ५ × (५ − ३) / २ = ५।',
    },
  },
  {
    topic: 'Father-Son Age Sum Ratio',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'The sum of a father’s age and his son’s age is 56 years. If the father is 3 times as old as the son, how old is the FATHER?',
      opts: ['42 years', '14 years', '39 years', '45 years'],
      exp: 'Son = 1 part, Father = 3 parts ⇒ 4 parts = 56 ⇒ 1 part = 14 years ⇒ Father = 3 × 14 = 42 years.',
    },
    mr: {
      q: 'वडील व मुलगा यांच्या वयांची बेरीज ५६ वर्षे आहे. वडिलांचे वय मुलाच्या वयाच्या तिप्पट असल्यास वडिलांचे वय किती?',
      opts: ['42 years', '14 years', '39 years', '45 years'],
      exp: '४ भाग = ५६ ⇒ मुलगा = १४ वर्षे; वडील = १४ × ३ = ४२ वर्षे.',
    },
    hi: {
      q: 'पिता और पुत्र की आयु का योग ५६ वर्ष है। यदि पिता की आयु पुत्र से तिगुनी हो, तो पिता की आयु क्या है?',
      opts: ['42 years', '14 years', '39 years', '45 years'],
      exp: 'पुत्र = १४ वर्ष; पिता = १४ × ३ = ४२ वर्ष।',
    },
  },
  {
    topic: 'Division Placeholder Zero Quotient Check',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Divide cleanly without slipping place-value zeroes: 8,40,840 ÷ 84.',
      opts: ['10,010', '1,010', '10,100', '1,00,010'],
      exp: '8,40,840 = 8,40,000 + 840. Dividing both by 84 gives 10,000 + 10 = 10,010.',
    },
    mr: {
      q: 'शून्य न वगळता अचूक भागाकार करा: ८,४०,८४० ÷ ८४ = ?',
      opts: ['10,010', '1,010', '10,100', '1,00,010'],
      exp: '८,४०,००० ÷ ८४ = १०,००० आणि ८४० ÷ ८४ = १० ⇒ १०,०१०.',
    },
    hi: {
      q: 'शून्य की सावधानी रखते हुए भागफल ज्ञात कीजिए: ८,४०,८४० ÷ ८४ = ?',
      opts: ['10,010', '1,010', '10,100', '1,00,010'],
      exp: '१०,००० + १० = १०,०१०।',
    },
  },
];
