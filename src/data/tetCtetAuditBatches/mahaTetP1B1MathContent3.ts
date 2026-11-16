import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 3 (35 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C3: CuratedTrilingualMcq[] = [
  {
    topic: 'Fractional Part Addition in Liquid Tanks',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A water tank is 3/5 full. After 16 litres are drawn out for watering saplings, it becomes 1/5 full. What is the TOTAL full capacity of the tank?',
      opts: ['40 litres', '80 litres', '20 litres', '48 litres'],
      exp: 'Drop = 3/5 − 1/5 = 2/5 of tank = 16 L ⇒ 1/5 = 8 L ⇒ full tank (5/5) = 5 × 8 = 40 litres.',
    },
    mr: {
      q: 'पाण्याची एक टाकी ३/५ भरलेली आहे. त्यातून १६ लिटर पाणी रोपांना दिल्यास ती १/५ भरलेली राहते, तर टाकीची एकूण क्षमता किती लिटर आहे?',
      opts: ['40 litres', '80 litres', '20 litres', '48 litres'],
      exp: '३/५ − १/५ = २/५ टाकी = १६ लिटर ⇒ १/५ = ८ लिटर ⇒ पूर्ण टाकी = ५ × ८ = ४० लिटर.',
    },
    hi: {
      q: 'पानी की एक टंकी ३/५ भरी है। १६ लीटर पानी निकालने पर यह १/५ भरी रह जाती है। टंकी की कुल क्षमता कितनी है?',
      opts: ['40 litres', '80 litres', '20 litres', '48 litres'],
      exp: '२/५ भाग = १६ लीटर ⇒ १/५ = ८ लीटर ⇒ पूरी टंकी = ४० लीटर।',
    },
  },
  {
    topic: 'Expanded Decimal Multiplication by Whole Number',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Find the product: 0.045 × 80.',
      opts: ['3.6', '0.36', '36', '0.036'],
      exp: '45 × 80 = 3,600. Moving decimal left 3 places gives 3.600 = 3.6.',
    },
    mr: {
      q: 'गुणाकार काढा: ०.०४५ × ८० = ?',
      opts: ['3.6', '0.36', '36', '0.036'],
      exp: '४५ × ८० = ३,६००; तीन दशांश स्थळे डावीकडे सरकवल्यास ३.६.',
    },
    hi: {
      q: 'गुणनफल ज्ञात कीजिए: ०.०४५ × ८० = ?',
      opts: ['3.6', '0.36', '36', '0.036'],
      exp: '४५ × ८० = ३६००; तीन अंक बाद दशमलव लगाने पर ३.६।',
    },
  },
  {
    topic: '2D Shape Count Inside Overlapping Triangles Puzzle',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A triangle has two line segments drawn from its top vertex straight down to the opposite base, dividing the base into 3 small parts. What is the TOTAL count of triangles visible in the figure?',
      opts: ['6 triangles', '3 triangles', '4 triangles', '5 triangles'],
      exp: '3 single triangles + 2 paired adjacent triangles + 1 whole large triangle = 1 + 2 + 3 = 6 triangles.',
    },
    mr: {
      q: 'एका त्रिकोणाच्या शीर्षबिंदूतून समोरच्या पायावर २ रेषा काढून पायाचे ३ भाग केले आहेत. या आकृतीत एकूण किती त्रिकोण तयार होतील?',
      opts: ['6 triangles', '3 triangles', '4 triangles', '5 triangles'],
      exp: '१ + २ + ३ = ६ त्रिकोण (३ लहान + २ जोड + १ मोठा).',
    },
    hi: {
      q: 'एक त्रिभुज के शीर्ष से आधार पर २ रेखाएँ खींचकर आधार को ३ भागों में बाँटा गया है। आकृति में कुल कितने त्रिभुज हैं?',
      opts: ['6 triangles', '3 triangles', '4 triangles', '5 triangles'],
      exp: '१ + २ + ३ = ६ त्रिभुज।',
    },
  },
  {
    topic: 'Odd & Even Product Parity Rule',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which mathematical statement about Odd and Even whole numbers is ALWAYS TRUE?',
      opts: [
        'The sum of ANY two odd numbers is ALWAYS even',
        'The product of two odd numbers is always even',
        'The sum of an even number and an odd number is always even',
        'Every prime number greater than 1 is odd',
      ],
      exp: 'Odd + Odd = Even (e.g., 3 + 5 = 8). Note: 2 is an even prime, eliminating the fourth choice.',
    },
    mr: {
      q: 'सम आणि विषम पूर्ण संख्यांबाबत खालीलपैकी कोणते विधान नेहमी सत्य असते?',
      opts: [
        'कोणत्याही दोन विषम संख्यांची बेरीज नेहमी सम असते',
        'दोन विषम संख्यांचा गुणाकार नेहमी सम असतो',
        'एक सम व एक विषम संख्येची बेरीज नेहमी सम असते',
        'सर्वच मूळ संख्या विषम असतात',
      ],
      exp: 'विषम + विषम = सम (उदा. ५ + ७ = १२). २ ही एकमेव सम मूळ संख्या आहे.',
    },
    hi: {
      q: 'सम और विषम संख्याओं के बारे में कौन-सा कथन सदैव सत्य है?',
      opts: [
        'किन्हीं दो विषम संख्याओं का योग सदैव सम होता है',
        'दो विषम संख्याओं का गुणनफल सम होता है',
        'एक सम तथा एक विषम का योग सम होता है',
        'सभी अभाज्य संख्याएँ विषम होती हैं',
      ],
      exp: 'विषम + विषम = सम; २ सम अभाज्य संख्या है।',
    },
  },
  {
    topic: 'Fraction of a Rupee Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Express 75 paise as a simplified fraction of ₹3.',
      opts: ['1/4', '3/4', '1/3', '3/10'],
      exp: '₹3 = 300 paise. Ratio = 75 / 300 = 1/4.',
    },
    mr: {
      q: '७५ पैसे म्हणजे ३ रुपयांचा कितवा संक्षिप्त भाग (अपूर्णांक) होय?',
      opts: ['1/4', '3/4', '1/3', '3/10'],
      exp: '₹३ = ३०० पैसे. ७५ / ३०० = १/४.',
    },
    hi: {
      q: '७५ पैसे, ₹३ का कौन-सा सरलतम भिन्न भाग है?',
      opts: ['1/4', '3/4', '1/3', '3/10'],
      exp: '₹३ = ३०० पैसे; ७५ / ३०० = १/४।',
    },
  },
  {
    topic: 'Dozen & Score Counting Units',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'If 1 Gross = 12 Dozen and 1 Score = 20 items, find the difference between (1 Gross) and (5 Score).',
      opts: ['44 items', '24 items', '64 items', '36 items'],
      exp: '1 Gross = 12 × 12 = 144. 5 Score = 5 × 20 = 100. Difference = 144 − 100 = 44.',
    },
    mr: {
      q: '१ ग्रॉस (१२ डझन) मधून ५ कोडी (१ कोडी = २० वस्तू) वजा केल्यास किती वस्तू उरतील?',
      opts: ['44 items', '24 items', '64 items', '36 items'],
      exp: '१ ग्रॉस = १२ × १२ = १४४. ५ कोडी = ५ × २० = १००. फरक = १४४ − १०० = ४४.',
    },
    hi: {
      q: '१ ग्रॉस (१२ दर्जन) में से ५ कोड़ी (१ कोड़ी = २०) घटाने पर कितनी वस्तुएँ शेष रहेंगी?',
      opts: ['44 items', '24 items', '64 items', '36 items'],
      exp: '१४४ − १०० = ४४।',
    },
  },
  {
    topic: 'Square Number Boundary Between 100 and 300',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many perfect square whole numbers lie strictly BETWEEN 100 and 250?',
      opts: ['5', '6', '4', '7'],
      exp: '11²=121, 12²=144, 13²=169, 14²=196, 15²=225 (10²=100 is excluded, 16²=256 > 250) -> 5 perfect squares.',
    },
    mr: {
      q: '१०० ते २५० यांच्या दरम्यान (१०० सोडून) एकूण किती पूर्ण वर्गसंख्या येतात?',
      opts: ['5', '6', '4', '7'],
      exp: '१२१ (११²), १४४ (१२²), १६९ (१३²), १९६ (१४²) आणि २२५ (१५²) अशा एकूण ५ वर्गसंख्या आहेत.',
    },
    hi: {
      q: '१०० और २५० के बीच कुल कितनी पूर्ण वर्ग संख्याएँ आती हैं?',
      opts: ['5', '6', '4', '7'],
      exp: '१२१, १४४, १६९, १९६, २२५ — कुल ५ पूर्ण वर्ग संख्याएँ।',
    },
  },
  {
    topic: 'Area of Square From Same Wire as Rectangle',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular frame has length 25 cm and breadth 15 cm. If the same perimeter forms a square, which encloses MORE area and by how much?',
      opts: ['Square by 25 cm²', 'Rectangle by 25 cm²', 'Square by 50 cm²', 'Both enclose equal area'],
      exp: 'Perimeter = 2(25+15) = 80 cm. Rect area = 25×15 = 375 cm². Square side = 80÷4 = 20 cm ⇒ Square area = 400 cm². Square exceeds by 400 − 375 = 25 cm².',
    },
    mr: {
      q: '२५ सेमी लांबी व १५ सेमी रुंदीच्या आयताएवढ्याच परिमितीचा एक चौरस बनवला, तर कोणाचे क्षेत्रफळ जास्त असेल आणि कितीने?',
      opts: ['Square by 25 cm²', 'Rectangle by 25 cm²', 'Square by 50 cm²', 'Both enclose equal area'],
      exp: 'आयत क्षेत्रफळ = ३७५ चौ.सेमी. परिमिती = ८० सेमी ⇒ चौरस बाजू = २० सेमी ⇒ क्षेत्रफळ = ४०० चौ.सेमी. चौरस २५ चौ.सेमी ने मोठा.',
    },
    hi: {
      q: '२५ सेमी × १५ सेमी आयत के बराबर परिमाप का एक वर्ग बनाया गया। किसका क्षेत्रफल अधिक है और कितना?',
      opts: ['Square by 25 cm²', 'Rectangle by 25 cm²', 'Square by 50 cm²', 'Both enclose equal area'],
      exp: 'आयत = ३७५ वर्ग सेमी; वर्ग (भुजा २० सेमी) = ४०० वर्ग सेमी। वर्ग २५ वर्ग सेमी अधिक है।',
    },
  },
  {
    topic: 'Railway Timetable Minutes Delay',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A passenger train scheduled to arrive at 13:50 arrived 45 minutes late today. At what time (12-hour clock) did it reach?',
      opts: ['2:35 PM', '2:25 PM', '1:95 PM', '3:05 PM'],
      exp: '13:50 = 1:50 PM. Adding 45 minutes -> 1:50 + 10 min = 2:00 PM + 35 min = 2:35 PM.',
    },
    mr: {
      q: '१३:५० वाजता पोहोचणारी गाडी आज ४५ मिनिटे उशिरा आली, तर ती १२-ताशी घड्याळानुसार किती वाजता पोहोचली?',
      opts: ['2:35 PM', '2:25 PM', '1:95 PM', '3:05 PM'],
      exp: 'दुपारी १:५० + ४५ मिनिटे = दुपारी २:३५.',
    },
    hi: {
      q: '१३:५० बजे आने वाली गाड़ी ४५ मिनट देरी से पहुँची। १२-घंटे की घड़ी में वह किस समय पहुँची?',
      opts: ['2:35 PM', '2:25 PM', '1:95 PM', '3:05 PM'],
      exp: '१:५० PM + ४५ मिनट = २:३५ PM।',
    },
  },
  {
    topic: 'Missing Digit Subtraction Reconstruction',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'In the subtraction: 8,A42 − 3,57B = 4,669, find the values of digits A and B.',
      opts: ['A = 2, B = 3', 'A = 1, B = 3', 'A = 3, B = 7', 'A = 2, B = 7'],
      exp: 'Check units (borrow 1): 12 − B = 9 ⇒ B = 3. Tens: 3 (from 4) needs borrow -> 13 − 7 = 6. Hundreds: (A−1 from 12 or A borrowed 1) -> (A−1) + 10 − 5 = 6 ⇒ A − 1 = 1 ⇒ A = 2. Check: 8,242 − 3,573 = 4,669!',
    },
    mr: {
      q: '८,A४२ − ३,५७B = ४,६६९ या वजाबाकीत A आणि B या अंकांच्या अचूक किमती शोधा.',
      opts: ['A = 2, B = 3', 'A = 1, B = 3', 'A = 3, B = 7', 'A = 2, B = 7'],
      exp: 'पडताळा: ८,२४२ − ३,५७३ = ४,६६९; म्हणून A = २ व B = ३.',
    },
    hi: {
      q: 'घटाव ८,A४२ − ३,५७B = ४,६६९ में अंक A तथा B का मान ज्ञात कीजिए।',
      opts: ['A = 2, B = 3', 'A = 1, B = 3', 'A = 3, B = 7', 'A = 2, B = 7'],
      exp: 'सत्यापन: ८,२४२ − ३,५७३ = ४,६६९, अतः A = २ और B = ३।',
    },
  },
  {
    topic: 'Fractional Equivalence on Number Line',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'On a number line divided into 12 equal parts between 0 and 1, at which tick mark from 0 does the fraction 3/4 sit?',
      opts: ['9th mark', '8th mark', '6th mark', '10th mark'],
      exp: '3/4 = (3 × 3)/(4 × 3) = 9/12, which sits at the 9th division.',
    },
    mr: {
      q: 'संख्यारेषेवर ० ते १ दरम्यानचे १२ समान भाग केल्यास ३/४ हा अपूर्णांक शून्यापासून कितव्या खुणेवर असेल?',
      opts: ['9th mark', '8th mark', '6th mark', '10th mark'],
      exp: '३/४ = ९/१२, म्हणून ९ व्या खुणेवर.',
    },
    hi: {
      q: 'संख्या रेखा पर ० से १ के बीच १२ बराबर भाग किए गए हैं। भिन्न ३/४ शून्य से किस चिह्न पर स्थित होगा?',
      opts: ['9th mark', '8th mark', '6th mark', '10th mark'],
      exp: '३/४ = ९/१२, अतः ९वें निशान पर।',
    },
  },
  {
    topic: 'Co-Prime Numbers Identification',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which pair of numbers is Co-Prime (Mutually Prime, having HCF = 1)?',
      opts: ['15 and 28', '14 and 21', '18 and 27', '25 and 35'],
      exp: '15 = 3×5 and 28 = 2²×7 share no common prime factor other than 1; the other three pairs share 7, 9, and 5.',
    },
    mr: {
      q: 'खालीलपैकी कोणती संख्यांची जोडी "सहमूळ संख्या" (Co-Prime, मसावि = १) आहे?',
      opts: ['15 and 28', '14 and 21', '18 and 27', '25 and 35'],
      exp: '१५ आणि २८ यांचा सामाईक विभाजक फक्त १ आहे, म्हणून ती सहमूळ जोडी आहे.',
    },
    hi: {
      q: 'निम्न में से कौन-सा युग्म सह-अभाज्य (Co-Prime, म.स. = १) है?',
      opts: ['15 and 28', '14 and 21', '18 and 27', '25 and 35'],
      exp: '१५ और २८ का उभयनिष्ठ गुणनखंड केवल १ है।',
    },
  },
  {
    topic: 'Percentage Fraction Equivalence Table',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A shop advertises a "3/5th price clearance" where customers pay 3/5 of the original ₹250 price. What percentage discount did customers save?',
      opts: ['40% discount', '60% discount', '25% discount', '35% discount'],
      exp: 'Paying 3/5 means saving 2/5. As a percentage: (2/5) × 100 = 40% saved.',
    },
    mr: {
      q: 'एका दुकानात वस्तू मूळ ₹२५० च्या ३/५ किमतीत मिळतात, म्हणजे ग्राहकाची किती टक्के बचत (सूट) होते?',
      opts: ['40% discount', '60% discount', '25% discount', '35% discount'],
      exp: '३/५ किंमत दिल्यास २/५ भाग सूट मिळते; (२/५) × १०० = ४०% सूट.',
    },
    hi: {
      q: 'एक दुकान वस्तु को मूल मूल्य के ३/५ भाग पर बेचती है। ग्राहक को कितने प्रतिशत की छूट मिली?',
      opts: ['40% discount', '60% discount', '25% discount', '35% discount'],
      exp: 'छूट = १ − ३/५ = २/५ = ४०%।',
    },
  },
  {
    topic: 'Triangular Prism Faces, Edges & Vertices',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many rectangular faces and triangular faces combine to form a solid Triangular Prism (like a glass tent prism)?',
      opts: ['3 rectangular + 2 triangular faces', '4 rectangular + 1 triangular face', '2 rectangular + 3 triangular faces', '6 triangular faces only'],
      exp: 'A triangular prism has 2 parallel triangular bases joined by 3 rectangular side faces (5 faces total).',
    },
    mr: {
      q: 'एका त्रिकोणी चित्तीस (Triangular Prism) किती आयताकृती व किती त्रिकोणाकृती पृष्ठे असतात?',
      opts: ['3 rectangular + 2 triangular faces', '4 rectangular + 1 triangular face', '2 rectangular + 3 triangular faces', '6 triangular faces only'],
      exp: 'त्रिकोणी चित्तीला २ तळ/छत त्रिकोण आणि ३ बाजूंचे आयत अशी ५ पृष्ठे असतात.',
    },
    hi: {
      q: 'एक त्रिभुजाकार प्रिज्म में कितने आयताकार तथा कितने त्रिभुजाकार फलक होते हैं?',
      opts: ['3 rectangular + 2 triangular faces', '4 rectangular + 1 triangular face', '2 rectangular + 3 triangular faces', '6 triangular faces only'],
      exp: 'त्रिभुजाकार प्रिज्म में २ त्रिभुजाकार आधार तथा ३ आयताकार पार्श्व फलक होते हैं।',
    },
  },
  {
    topic: 'Distance Run Around Rectangular Track Multi-Lap',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Rohan jogs 5 complete rounds along the boundary of a rectangular park 65 m long and 35 m wide. What total distance does he jog in kilometres?',
      opts: ['1 km', '0.5 km', '2 km', '1.5 km'],
      exp: '1 round = 2 × (65 + 35) = 200 m. 5 rounds = 5 × 200 = 1,000 m = 1 km.',
    },
    mr: {
      q: 'रोहन ६५ मी लांब आणि ३५ मी रुंद आयताकृती बागेभोवती ५ फेऱ्या मारतो, तर तो एकूण किती किलोमीटर धावला?',
      opts: ['1 km', '0.5 km', '2 km', '1.5 km'],
      exp: '१ फेरी = २ × (६५ + ३५) = २०० मी. ५ फेऱ्या = १,००० मी = १ किमी.',
    },
    hi: {
      q: 'रोहन ६५ मी × ३५ मी आयताकार पार्क के चारों ओर ५ चक्कर लगाता है। वह कुल कितने किलोमीटर दौड़ता है?',
      opts: ['1 km', '0.5 km', '2 km', '1.5 km'],
      exp: '१ चक्कर = २०० मी; ५ चक्कर = १,००० मी = १ किमी।',
    },
  },
  {
    topic: 'Compass Directions – 90° and 180° Turns',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'A hiker faces North. First she turns 90° clockwise, then turns 180° anti-clockwise. Which compass direction is she facing now?',
      opts: ['West', 'East', 'South', 'North'],
      exp: 'North + 90° clockwise = East. Turning 180° anti-clockwise from East reverses cleanly to West.',
    },
    mr: {
      q: 'एक गिर्यारोहक उत्तरेकडे तोंड करून उभा आहे. प्रथम तो घड्याळाच्या काट्याच्या दिशेने ९०° वळतो आणि नंतर घड्याळाच्या विरुद्ध दिशेने १८०° वळतो. आता त्याचे तोंड कोणत्या दिशेला असेल?',
      opts: ['West', 'East', 'South', 'North'],
      exp: 'उत्तर + ९०° उजवीकडे = पूर्व; तेथून १८०° वळल्यास विरुद्ध दिशा = पश्चिम.',
    },
    hi: {
      q: 'एक यात्री उत्तर की ओर मुख करके खड़ा है। वह ९०° दक्षिणावर्त घूमता है, फिर १८०° वामावर्त घूमता है। अब उसका मुख किस दिशा में है?',
      opts: ['West', 'East', 'South', 'North'],
      exp: 'उत्तर → ९०° दक्षिणावर्त (पूर्व) → १८०° विपरीत = पश्चिम।',
    },
  },
  {
    topic: 'Fibonacci-Style Additive Sequence',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Discover the rule and pick the next two terms: 2, 3, 5, 8, 13, 21, ___, ___.',
      opts: ['34, 55', '29, 38', '32, 45', '34, 53'],
      exp: 'Each term equals the sum of the two previous terms: 13 + 21 = 34; 21 + 34 = 55.',
    },
    mr: {
      q: '२, ३, ५, ८, १३, २१, ___, ___ या संख्या मालिकेचा नियम ओळखून पुढील दोन संख्या शोधा.',
      opts: ['34, 55', '29, 38', '32, 45', '34, 53'],
      exp: 'प्रत्येक पद आधीच्या दोन पदांची बेरीज आहे: १३ + २१ = ३४; २१ + ३४ = ५५.',
    },
    hi: {
      q: 'नियम पहचानकर अगले दो पद बताइए: २, ३, ५, ८, १३, २१, ___, ___।',
      opts: ['34, 55', '29, 38', '32, 45', '34, 53'],
      exp: 'पिछले दो पदों का योग: १३ + २१ = ३४ और २१ + ३४ = ५५।',
    },
  },
  {
    topic: 'Divisibility by Both 4 and 8 Check',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'If a whole number is divisible by 16, it MUST ALSO be divisible by which complete set of numbers?',
      opts: ['1, 2, 4, and 8', '1, 2, 4, 8, and 12', '2, 3, 4, and 8', '4, 6, 8, and 16'],
      exp: 'Every factor of 16 ({1, 2, 4, 8, 16}) automatically divides any multiple of 16; 3, 6, and 12 do not.',
    },
    mr: {
      q: 'जर एखाद्या पूर्ण संख्येला १६ ने नि:शेष भाग जात असेल, तर तिला खालीलपैकी कोणत्या सर्व संख्यांनी नक्की भाग जातोच?',
      opts: ['1, 2, 4, and 8', '1, 2, 4, 8, and 12', '2, 3, 4, and 8', '4, 6, 8, and 16'],
      exp: '१६ चे सर्व विभाजक (१, २, ४, ८) त्या संख्येस नि:शेष भागतात.',
    },
    hi: {
      q: 'यदि कोई पूर्ण संख्या १६ से पूर्णतः विभाज्य है, तो वह इनमें से किन सभी संख्याओं से अवश्य विभाज्य होगी?',
      opts: ['1, 2, 4, and 8', '1, 2, 4, 8, and 12', '2, 3, 4, and 8', '4, 6, 8, and 16'],
      exp: '१६ के सभी गुणनखंड (१, २, ४, ८) सदैव उस संख्या को विभाजित करेंगे।',
    },
  },
  {
    topic: 'Measurement Conversion Km, Hm, Dam & Metres',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Arrange in descending (greatest to smallest) order: 1.5 km, 1,450 m, 15,200 cm, 1,60,000 cm.',
      opts: ['1,60,000 cm > 1.5 km > 1,450 m > 15,200 cm', '1.5 km > 1,60,000 cm > 1,450 m > 15,200 cm', '1,450 m > 1.5 km > 1,60,000 cm > 15,200 cm', '1,60,000 cm > 1,450 m > 1.5 km > 15,200 cm'],
      exp: 'Convert all to metres: 1,60,000 cm = 1,600 m; 1.5 km = 1,500 m; 1,450 m; 15,200 cm = 152 m.',
    },
    mr: {
      q: 'उतरत्या क्रमाने लावा: १.५ किमी, १,४५० मी, १५,२०० सेमी, १,६०,००० सेमी.',
      opts: ['1,60,000 cm > 1.5 km > 1,450 m > 15,200 cm', '1.5 km > 1,60,000 cm > 1,450 m > 15,200 cm', '1,450 m > 1.5 km > 1,60,000 cm > 15,200 cm', '1,60,000 cm > 1,450 m > 1.5 km > 15,200 cm'],
      exp: 'मीटरमध्ये रूपांतर: १,६०० मी > १,५०० मी > १,४५० मी > १५२ मी.',
    },
    hi: {
      q: 'अवरोही क्रम में व्यवस्थित कीजिए: १.५ किमी, १,४५० मी, १५,२०० सेमी, १,६०,००० सेमी।',
      opts: ['1,60,000 cm > 1.5 km > 1,450 m > 15,200 cm', '1.5 km > 1,60,000 cm > 1,450 m > 15,200 cm', '1,450 m > 1.5 km > 1,60,000 cm > 15,200 cm', '1,60,000 cm > 1,450 m > 1.5 km > 15,200 cm'],
      exp: 'मीटर में मान: १,६०० मी > १,५०० मी > १,४५० मी > १५२ मी।',
    },
  },
  {
    topic: 'Average Weight Reverse Sum Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'The average mass of 4 cricket balls is 160 g. When a heavier leather ball is added to the bag, the average mass of all 5 balls rises to 168 g. What is the mass of the 5th ball?',
      opts: ['200 g', '168 g', '180 g', '192 g'],
      exp: 'Sum of 4 balls = 4 × 160 = 640 g. Sum of 5 balls = 5 × 168 = 840 g. 5th ball = 840 − 640 = 200 g.',
    },
    mr: {
      q: '४ क्रिकेट चेंडूंचे सरासरी वजन १६० ग्रॅम आहे. त्यात ५ वा चेंडू टाकल्यास सरासरी १६८ ग्रॅम होते, तर ५ व्या चेंडूचे वजन किती?',
      opts: ['200 g', '168 g', '180 g', '192 g'],
      exp: '४ चेंडूंची बेरीज = ६४० ग्रॅम; ५ चेंडूंची बेरीज = ५ × १६८ = ८४० ग्रॅम. ५ वा चेंडू = ८४० − ६४० = २०० ग्रॅम.',
    },
    hi: {
      q: '४ गेंदों का औसत भार १६० ग्राम है। ५वीं गेंद मिलाने पर औसत १६८ ग्राम हो जाता है। ५वीं गेंद का भार क्या है?',
      opts: ['200 g', '168 g', '180 g', '192 g'],
      exp: '८४० − ६४० = २०० ग्राम।',
    },
  },
  {
    topic: 'Fractional Pie Sharing (Part of Remaining)',
    pattern: 'Problem Solving',
    difficulty: 'Difficult',
    en: {
      q: 'A farmer harvests 120 kg of onions. He sells 1/3 on Day 1, and sells 1/4 of the REMAINING onions on Day 2. How many kg remain unsold?',
      opts: ['60 kg', '50 kg', '70 kg', '40 kg'],
      exp: 'Day 1 sold = 1/3 × 120 = 40 kg ⇒ Remainder = 80 kg. Day 2 sold = 1/4 × 80 = 20 kg ⇒ Left = 80 − 20 = 60 kg.',
    },
    mr: {
      q: 'एका शेतकऱ्याकडे १२० किग्रॅ कांदे आहेत. पहिल्या दिवशी त्याने १/३ विकले व दुसऱ्या दिवशी उरलेल्या कांद्यांपैकी १/४ विकले. तर किती किग्रॅ कांदे शिल्लक राहिले?',
      opts: ['60 kg', '50 kg', '70 kg', '40 kg'],
      exp: 'पहिल्या दिवशी ४० किग्रॅ विकले ⇒ ८० किग्रॅ उरले. ८० पैकी १/४ = २० किग्रॅ विकल्यास ६० किग्रॅ उरले.',
    },
    hi: {
      q: 'किसान के पास १२० किग्रा प्याज थे। पहले दिन १/३ बेचे तथा दूसरे दिन शेष के १/४ बेचे। कितने किग्रा बचे?',
      opts: ['60 kg', '50 kg', '70 kg', '40 kg'],
      exp: 'पहले दिन ४० किग्रा गए (शेष ८० किग्रा)। दूसरे दिन २० किग्रा गए ⇒ ६० किग्रा शेष।',
    },
  },
  {
    topic: 'Multi-Digit Zeroes in Product',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'How many trailing zeroes appear at the right end of the product: 25 × 16 × 125 × 7?',
      opts: ['4 zeroes', '3 zeroes', '2 zeroes', '5 zeroes'],
      exp: '25 = 5²; 125 = 5³ (five 5s); 16 = 2⁴ (four 2s). Pairing min(4, 5) = 4 pairs of (2 × 5) yields 10⁴ = 4 trailing zeroes (product = 3,50,000).',
    },
    mr: {
      q: '२५ × १६ × १२५ × ७ या गुणाकाराच्या शेवटी (उजवीकडे) एकूण किती शून्ये येतील?',
      opts: ['4 zeroes', '3 zeroes', '2 zeroes', '5 zeroes'],
      exp: '२५ × १६ = ४००; ४०० × १२५ = ५०,०००; ५०,००० × ७ = ३,५०,००० ⇒ शेवटी ४ शून्ये.',
    },
    hi: {
      q: 'गुणनफल २५ × १६ × १२५ × ७ के अंत में कुल कितने शून्य होंगे?',
      opts: ['4 zeroes', '3 zeroes', '2 zeroes', '5 zeroes'],
      exp: '२५ × १६ × १२५ × ७ = ३,५०,०००, अतः अंत में ४ शून्य।',
    },
  },
  {
    topic: 'Decimal Ordering Precision',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which decimal is closest in value to 1: 0.9, 0.99, 1.02, or 1.009?',
      opts: ['1.009', '0.99', '1.02', '0.9'],
      exp: 'Distances to 1.000: |0.9 − 1| = 0.1; |0.99 − 1| = 0.01; |1.02 − 1| = 0.02; |1.009 − 1| = 0.009 (smallest!).',
    },
    mr: {
      q: '०.९, ०.९९, १.०२ आणि १.००९ यांपैकी कोणती दशांश संख्या १ च्या सर्वात जवळ आहे?',
      opts: ['1.009', '0.99', '1.02', '0.9'],
      exp: 'अंतर मोजता: |१.००९ − १| = ०.००९ हे सर्वात लहान अंतर आहे.',
    },
    hi: {
      q: '०.९, ०.९९, १.०२ तथा १.००९ में से कौन-सी संख्या १ के सबसे निकट है?',
      opts: ['1.009', '0.99', '1.02', '0.9'],
      exp: 'दूरी: |१.००९ − १| = ०.००९ सबसे कम है।',
    },
  },
  {
    topic: 'Quadrilateral Angles & Right Angle Check',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Three interior angles of a quadrilateral measure 85°, 95°, and 110°. Find the measure of its fourth angle.',
      opts: ['70°', '80°', '90°', '60°'],
      exp: 'Sum of interior angles of a quadrilateral = 360°. Fourth angle = 360° − (85° + 95° + 110°) = 360° − 290° = 70°.',
    },
    mr: {
      q: 'एका चौकोनाचे तीन कोन अनुक्रमे ८५°, ९५° आणि ११०° आहेत, तर चौथ्या कोनाचे माप किती अंश असेल?',
      opts: ['70°', '80°', '90°', '60°'],
      exp: 'चौकोनाच्या चार कोनांची बेरीज = ३६०°. चौथा कोन = ३६०° − २९०° = ७०°.',
    },
    hi: {
      q: 'एक चतुर्भुज के तीन कोण क्रमशः ८५°, ९५° व ११०° हैं। चौथे कोण की माप क्या है?',
      opts: ['70°', '80°', '90°', '60°'],
      exp: '३६०° − (८५° + ९५° + ११०°) = ३६०° − २९०° = ७०°।',
    },
  },
  {
    topic: 'Age Comparison Gap Constant',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Today, a mother is 36 years old and her daughter is 8 years old. In how many years from now will the mother be EXACTLY 3 times as old as her daughter?',
      opts: ['6 years', '4 years', '8 years', '5 years'],
      exp: 'Age difference stays constant = 36 − 8 = 28 years. When mother = 3 × daughter, difference = 2 × daughter = 28 ⇒ daughter = 14 years (which is 14 − 8 = 6 years from now; mother = 42).',
    },
    mr: {
      q: 'आज आईचे वय ३६ वर्षे व मुलीचे वय ८ वर्षे आहे. आणखी किती वर्षांनी आईचे वय मुलीच्या वयाच्या बरोबर ३ पट होईल?',
      opts: ['6 years', '4 years', '8 years', '5 years'],
      exp: 'वयांतील फरक नेहमी २८ वर्षे राहील. ६ वर्षांनी मुलगी १४ व आई ४२ वर्षांची (१४ × ३ = ४२) होईल.',
    },
    hi: {
      q: 'वर्तमान में माँ की आयु ३६ वर्ष और बेटी की ८ वर्ष है। कितने वर्ष बाद माँ की आयु बेटी की आयु की ठीक तीन गुनी होगी?',
      opts: ['6 years', '4 years', '8 years', '5 years'],
      exp: '६ वर्ष बाद बेटी १४ की और माँ ४२ (१४ × ३) वर्ष की होगी।',
    },
  },
  {
    topic: 'Digit Appearance Count (Zeroes/Fives in 1 to 100)',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'When writing every whole number from 1 to 100, how many TIMES does the digit "7" appear?',
      opts: ['20 times', '19 times', '11 times', '18 times'],
      exp: 'Units place (7,17,...,97) = 10 times; Tens place (70,71,...,79) = 10 times. Total = 10 + 10 = 20 times.',
    },
    mr: {
      q: '१ ते १०० पर्यंतचे सर्व अंक लिहिताना "७" हा अंक एकूण किती वेळा लिहिला जातो?',
      opts: ['20 times', '19 times', '11 times', '18 times'],
      exp: 'एकक स्थानी १० वेळा व दशक स्थानी (७०–७९) १० वेळा ⇒ एकूण २० वेळा.',
    },
    hi: {
      q: '१ से १०० तक गिनती लिखने पर अंक "७" कुल कितनी बार आता है?',
      opts: ['20 times', '19 times', '11 times', '18 times'],
      exp: 'इकाई स्थान पर १० बार तथा दहाई स्थान पर १० बार = कुल २० बार।',
    },
  },
  {
    topic: 'Simple Interest Basics (Class 5 Commercial Intro)',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'At a rural cooperative bank paying 10% simple interest per annum, how much total amount will ₹2,000 grow to after 2 years?',
      opts: ['₹2,400', '₹2,200', '₹2,420', '₹2,500'],
      exp: 'Simple Interest = (2,000 × 10 × 2) / 100 = ₹400. Total Amount = 2,000 + 400 = ₹2,400.',
    },
    mr: {
      q: 'दर साल दर शेकडा १० दराने ₹२,००० चे २ वर्षांचे सरळव्याज मिळून एकूण रास किती होईल?',
      opts: ['₹2,400', '₹2,200', '₹2,420', '₹2,500'],
      exp: 'सरळव्याज = (२,००० × १० × २)/१०० = ₹४००. रास = २,००० + ४०० = ₹२,४००.',
    },
    hi: {
      q: '१०% वार्षिक साधारण ब्याज की दर से ₹२,००० का २ वर्ष का कुल मिश्रधन कितना होगा?',
      opts: ['₹2,400', '₹2,200', '₹2,420', '₹2,500'],
      exp: 'ब्याज = ₹४००; मिश्रधन = ₹२,४००।',
    },
  },
  {
    topic: 'Shaded Fraction Grid Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A 5 × 6 rectangular grid has 30 identical squares. Ten squares are shaded blue and another 2/5 of the remaining squares are shaded yellow. How many squares stay unshaded?',
      opts: ['12 squares', '10 squares', '8 squares', '15 squares'],
      exp: 'Remaining after 10 blue = 30 − 10 = 20 squares. Yellow shaded = (2/5) × 20 = 8 squares. Unshaded = 20 − 8 = 12 squares.',
    },
    mr: {
      q: '५ × ६ च्या एका चौरस जाळीत ३० समान चौरस आहेत. त्यांपैकी १० चौरस निळ्या रंगाने आणि उरलेल्या चौरसांपैकी २/५ चौरस पिवळ्या रंगाने रंगवले, तर किती चौरस रंगवायचे शिल्लक राहतील?',
      opts: ['12 squares', '10 squares', '8 squares', '15 squares'],
      exp: 'निळ्यानंतर उरलेले = ३० − १० = २०; पिवळे = २० चे २/५ = ८; शिल्लक = २० − ८ = १२ चौरस.',
    },
    hi: {
      q: '५ × ६ के ग्रिड में ३० समान वर्ग हैं। १० वर्ग नीले तथा शेष के २/५ वर्ग पीले रंगे गए हैं। कितने वर्ग बिना रंगे शेष बचेंगे?',
      opts: ['12 squares', '10 squares', '8 squares', '15 squares'],
      exp: 'नीले के बाद शेष = ३० − १० = २०; पीले = २० का २/५ = ८; बिना रंगे = २० − ८ = १२ वर्ग।',
    },
  },
  {
    topic: 'Factor vs Multiple Property Distinction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which statement accurately describes factors and multiples of 12?',
      opts: [
        '12 is BOTH a factor of itself and a multiple of itself',
        'Factors of 12 can be larger than 12',
        'Multiples of 12 are finite in number',
        '0 is the smallest factor of 12',
      ],
      exp: 'Every positive integer divides itself (greatest factor = N) and equals 1 × N (smallest positive multiple = N).',
    },
    mr: {
      q: '१२ चे विभाजक व विभाज्य यांबाबत खालीलपैकी कोणते विधान अचूक आहे?',
      opts: [
        '१२ ही स्वतःची विभाजक व विभाज्य दोन्ही असते',
        '१२ चे विभाजक १२ पेक्षा मोठे असू शकतात',
        '१२ च्या पटीतील संख्या मर्यादित असतात',
        '० हा १२ चा सर्वात लहान विभाजक आहे',
      ],
      exp: 'प्रत्येक संख्या स्वतःचा सर्वात मोठा विभाजक व सर्वात लहान धन विभाज्य असते.',
    },
    hi: {
      q: '१२ के गुणनखंड और गुणज के संबंध में कौन-सा कथन सही है?',
      opts: [
        '१२ स्वयं अपना गुणनखंड तथा अपना गुणज दोनों है',
        '१२ के गुणनखंड १२ से बड़े हो सकते हैं',
        '१२ के गुणजों की संख्या सीमित होती है',
        '०, १२ का सबसे छोटा गुणनखंड है',
      ],
      exp: 'प्रत्येक संख्या स्वयं अपनी सबसे बड़ी विभाजक और सबसे छोटी धनात्मक गुणज होती है।',
    },
  },
  {
    topic: 'Water Bottle Refill LCM Cycle',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Small cups hold 240 mL and medium bottles hold 360 mL. What is the SMALLEST whole-millilitre jug volume that can pour out into full cups OR full medium bottles with zero drop left?',
      opts: ['720 mL', '1,440 mL', '480 mL', '120 mL'],
      exp: 'Smallest common multiple = LCM(240, 360) = 720 mL (3 cups = 2 medium bottles).',
    },
    mr: {
      q: 'लहान पेला २४० मिलि आणि मध्यम बाटली ३६० मिलि मापाची आहे. ज्यातून दोन्ही मापे थेंबही न उरता पूर्ण भरता येतील असे किमान भांड्याचे माप कोणते?',
      opts: ['720 mL', '1,440 mL', '480 mL', '120 mL'],
      exp: 'लसावि(२४०, ३६०) = ७२० मिलि.',
    },
    hi: {
      q: 'छोटा कप २४० मिली व बोतल ३६० मिली की है। वह न्यूनतम आयतन क्या होगा जिससे बिना शेष रहे दोनों को पूरा भरा जा सके?',
      opts: ['720 mL', '1,440 mL', '480 mL', '120 mL'],
      exp: 'ल.स.(२४०, ३६०) = ७२० मिली।',
    },
  },
  {
    topic: 'Palindromic / Mirror Time on Digital Watch',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'On a 24-hour digital watch reading HH:MM, how many minutes pass from 04:40 until the NEXT symmetric palindromic time reading identically backwards?',
      opts: ['70 minutes', '71 minutes', '60 minutes', '50 minutes'],
      exp: 'The next symmetric palindrome HH:MM after 04:40 is 05:50. Elapsed duration = 05:50 − 04:40 = 1 hour 10 minutes = 70 minutes.',
    },
    mr: {
      q: '२४-ताशी डिजिटल घड्याळावर ०४:४० नंतर पुढची सुलट व उलट दोन्हीकडून सारखी वाचली जाणारी (उदा. ०५:५०) वेळ येण्यासाठी किती मिनिटे जावी लागतील?',
      opts: ['70 minutes', '71 minutes', '60 minutes', '50 minutes'],
      exp: '०४:४० नंतरची पुढची पॅलिंड्रोम वेळ ०५:५० आहे. या दरम्यानचा कालावधी = १ तास १० मिनिटे = ७० मिनिटे.',
    },
    hi: {
      q: '२४-घंटे की डिजिटल घड़ी पर ०४:४० के बाद अगली दोनों ओर से समान पढ़ी जाने वाली (पैलिंड्रोम) समय स्थिति आने में कितने मिनट लगेंगे?',
      opts: ['70 minutes', '71 minutes', '60 minutes', '50 minutes'],
      exp: '०४:४० के बाद अगला पैलिंड्रोम समय ०५:५० है। अंतराल = १ घंटा १० मिनट = ७० मिनट।',
    },
  },
  {
    topic: 'Cube Stacking Surface Count',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Four 1-cm cubes are glued tightly side-by-side in a single straight 1 × 4 × 1 row. How many 1-cm² outer square faces are exposed on the outside (including bottom)?',
      opts: ['18 faces', '24 faces', '20 faces', '16 faces'],
      exp: 'Total faces on 4 separate cubes = 24. Joining in a row touches 3 pairs -> 3 × 2 = 6 hidden faces. Exposed = 24 − 6 = 18 faces.',
    },
    mr: {
      q: '१ सेमी बाजूचे ४ ठोकळे सरळ रांगेत एकमेकांना चिकटवून ठेवले. तर या जोडलेल्या आकारात एकूण किती १×१ सेमी चे बाह्य चौरस पृष्ठभाग (तळ धरून) मोकळे असतील?',
      opts: ['18 faces', '24 faces', '20 faces', '16 faces'],
      exp: 'एकूण पृष्ठे = २४; ३ जोड्यांत लपलेली पृष्ठे = ६. मोकळी पृष्ठे = २४ − ६ = १८.',
    },
    hi: {
      q: '१ सेमी के ४ घनों को सीधी पंक्ति में सटाकर चिपकाया गया। कुल कितने १×१ सेमी के बाहरी फलक (नीचे सहित) खुले रहेंगे?',
      opts: ['18 faces', '24 faces', '20 faces', '16 faces'],
      exp: '२४ − (३ × २) = १८ बाहरी फलक।',
    },
  },
  {
    topic: 'Unit Weight Parcel Postage Cost Step Function',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A courier charges ₹25 for the first 50 g and ₹8 for every additional 50 g or fraction thereof. What is the postage for a parcel weighing 170 g?',
      opts: ['₹49', '₹41', '₹57', '₹33'],
      exp: '170 g = 50 g (₹25) + 50 g (₹8) + 50 g (₹8) + 20 g extra slab (₹8) = 25 + 3 × 8 = ₹49.',
    },
    mr: {
      q: 'पोस्ट खात्याचे दर पहिल्या ५० ग्रॅमसाठी ₹२५ आणि पुढील प्रत्येक ५० ग्रॅम वा त्याच्या भागासाठी ₹८ आहेत. १७० ग्रॅम वजनाच्या पार्सलचा खर्च किती येईल?',
      opts: ['₹49', '₹41', '₹57', '₹33'],
      exp: 'प्रथम ५० ग्रॅम = ₹२५; उरलेले १२० ग्रॅम म्हणजे ३ टप्पे (३ × ८ = ₹२४). एकूण = ₹४९.',
    },
    hi: {
      q: 'डाक शुल्क पहले ५० ग्राम के लिए ₹२५ तथा प्रत्येक अतिरिक्त ५० ग्राम या उसके भाग के लिए ₹८ है। १७० ग्राम के पार्सल का शुल्क क्या होगा?',
      opts: ['₹49', '₹41', '₹57', '₹33'],
      exp: '₹२५ + (३ × ₹८) = ₹४९।',
    },
  },
  {
    topic: 'Roman Numeral Descending Match Check',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which standard Roman numeral symbol pair is INVALID because subtractive rules forbid it?',
      opts: ['VL (for 45)', 'XL (for 40)', 'XC (for 90)', 'CD (for 400)'],
      exp: 'V, L, and D are NEVER subtracted in standard Roman notation; 45 is written XLV (40 + 5), not VL.',
    },
    mr: {
      q: 'रोमन संख्यालेखन नियमानुसार खालीलपैकी कोणती वजाबाकी पद्धतीची जोडी चुकीची (अवैध) आहे?',
      opts: ['VL (for 45)', 'XL (for 40)', 'XC (for 90)', 'CD (for 400)'],
      exp: 'V, L आणि D ही अक्षरे कधीही डावीकडे वजा करण्यासाठी लिहीत नाहीत; ४५ हे XLV असे लिहितात.',
    },
    hi: {
      q: 'रोमन संख्या लेखन नियम के अनुसार इनमें से कौन-सा घटाव युग्म अमान्य है?',
      opts: ['VL (for 45)', 'XL (for 40)', 'XC (for 90)', 'CD (for 400)'],
      exp: 'V, L, D को कभी बायीं ओर घटाव के रूप में नहीं लिखा जाता; ४५ को XLV लिखते हैं।',
    },
  },
];
