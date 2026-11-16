import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 4 (33 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C4: CuratedTrilingualMcq[] = [
  {
    topic: 'Distinct-Digit 6-Digit Greatest vs Smallest Difference',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'What is the difference between the greatest 6-digit number and the smallest 6-digit number formed using distinct digits WITHOUT repeating any digit?',
      opts: ['8,85,309', '8,99,999', '8,85,319', '8,84,309'],
      exp: 'Greatest 6-digit with distinct digits = 9,87,654. Smallest 6-digit with distinct digits = 1,02,345. Difference = 9,87,654 − 1,02,345 = 8,85,309.',
    },
    mr: {
      q: 'कोणत्याही अंकाची पुनरावृत्ती न करता वेगवेगळ्या अंकांपासून बनणारी सर्वात मोठी ६-अंकी आणि सर्वात लहान ६-अंकी संख्या यांतील फरक किती?',
      opts: ['8,85,309', '8,99,999', '8,85,319', '8,84,309'],
      exp: 'सर्वात मोठी = ९,८७,६५४; सर्वात लहान = १,०२,३४५. फरक = ९,८७,६५४ − १,०२,३४५ = ८,८५,३०९.',
    },
    hi: {
      q: 'बिना किसी अंक को दोहराए भिन्न अंकों से बनने वाली सबसे बड़ी ६-अंकीय तथा सबसे छोटी ६-अंकीय संख्या का अंतर क्या है?',
      opts: ['8,85,309', '8,99,999', '8,85,319', '8,84,309'],
      exp: '९,८७,६५४ − १,०२,३४५ = ८,८५,३०९।',
    },
  },
  {
    topic: 'Divisibility by 11 Alternating Digit Sum',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Which digit should replace # in the 6-digit number 9#8071 so that it becomes completely divisible by 11?',
      opts: ['1', '3', '5', '7'],
      exp: 'Alternating sums from right: (1 + 0 + #) = 1 + #, and (7 + 8 + 9) = 24. Difference 24 − (1 + #) = 23 − #. For divisibility by 11, 23 − # = 22 ⇒ # = 1 (check: 918071 ÷ 11 = 83,461).',
    },
    mr: {
      q: '९#८०७१ या ६-अंकी संख्येस ११ ने नि:शेष भाग जाण्यासाठी # च्या जागी कोणता अंक असावा?',
      opts: ['1', '3', '5', '7'],
      exp: 'विषम स्थानी (१+०+#) व सम स्थानी (७+८+९=२४) यांचा फरक २४ − (१+#) = २३ − # = २२ (११ च्या पटीत) ⇒ # = १.',
    },
    hi: {
      q: '६-अंकीय संख्या ९#८०७१ को ११ से पूर्णतः विभाजित करने के लिए # के स्थान पर कौन-सा अंक आएगा?',
      opts: ['1', '3', '5', '7'],
      exp: 'एकांतर योगों का अंतर २४ − (१ + #) = २२ ⇒ # = १ (९१८०७१ ÷ ११ = ८३,४६१)।',
    },
  },
  {
    topic: 'Regular Polygons Equal Perimeter Wire Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A wire bent into a regular hexagon of side 8 cm is straightened and re-bent into a regular octagon. What is the length of each side of the octagon?',
      opts: ['6 cm', '8 cm', '4 cm', '12 cm'],
      exp: 'Hexagon perimeter = 6 × 8 = 48 cm. Regular octagon has 8 equal sides, so each side = 48 ÷ 8 = 6 cm.',
    },
    mr: {
      q: '८ सेमी बाजू असलेला समषट्कोण (Hexagon) तयार करणारी तार सरळ करून तिचा समअष्टकोन (Octagon) बनवल्यास अष्टकोनाची प्रत्येक बाजू किती सेमी असेल?',
      opts: ['6 cm', '8 cm', '4 cm', '12 cm'],
      exp: 'षट्कोनाची परिमिती = ६ × ८ = ४८ सेमी. अष्टकोनाची बाजू = ४८ ÷ ८ = ६ सेमी.',
    },
    hi: {
      q: '८ सेमी भुजा वाले समषट्भुज को खोलकर उसी तार से समअष्टभुज बनाया गया। अष्टभुज की प्रत्येक भुजा कितनी होगी?',
      opts: ['6 cm', '8 cm', '4 cm', '12 cm'],
      exp: 'कुल तार = ६ × ८ = ४८ सेमी। अष्टभुज भुजा = ४८ ÷ ८ = ६ सेमी।',
    },
  },
  {
    topic: 'Clock Minute Hand Sweep Degrees',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Through how many degrees does the MINUTE hand of a wall clock rotate in exactly 25 minutes?',
      opts: ['150°', '125°', '180°', '135°'],
      exp: 'A minute hand completes 360° in 60 minutes, sweeping 6° per minute. In 25 minutes: 25 × 6° = 150°.',
    },
    mr: {
      q: 'घड्याळाचा मिनिट काटा बरोबर २५ मिनिटांत किती अंशांतून फिरतो?',
      opts: ['150°', '125°', '180°', '135°'],
      exp: 'मिनिट काटा १ मिनिटात ६° फिरतो; २५ × ६° = १५०°.',
    },
    hi: {
      q: 'दीवार घड़ी की मिनट की सुई ठीक २५ मिनट में कितने अंश का कोण घूमती है?',
      opts: ['150°', '125°', '180°', '135°'],
      exp: '१ मिनट में ६°, अतः २५ मिनट में २५ × ६° = १५०°।',
    },
  },
  {
    topic: 'Negative & Positive Temperature Difference',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'At 6:00 AM, the thermometer in Leh recorded −4°C. By 2:00 PM, the temperature rose to +9°C. By how many degrees Celsius did the temperature rise?',
      opts: ['13°C', '5°C', '14°C', '11°C'],
      exp: 'Rise = Final − Initial = 9 − (−4) = 9 + 4 = 13°C.',
    },
    mr: {
      q: 'सकाळी ६ वाजता लेहचे तापमान −४°C होते आणि दुपारी २ वाजता ते +९°C झाले. तापमानात किती अंश सेल्सिअसची वाढ झाली?',
      opts: ['13°C', '5°C', '14°C', '11°C'],
      exp: 'वाढ = ९ − (−४) = ९ + ४ = १३°C.',
    },
    hi: {
      q: 'सुबह ६ बजे लेह का तापमान −४°C था और दोपहर २ बजे +९°C हो गया। तापमान में कितने डिग्री सेल्सियस की वृद्धि हुई?',
      opts: ['13°C', '5°C', '14°C', '11°C'],
      exp: 'वृद्धि = ९ − (−४) = १३°C।',
    },
  },
  {
    topic: 'Fractional Days into Total Hours',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many total hours equal (5/6 of a day) + (1/4 of a day)?',
      opts: ['26 hours', '24 hours', '22 hours', '28 hours'],
      exp: '5/6 of 24 h = 20 h; 1/4 of 24 h = 6 h. Total = 20 + 6 = 26 hours.',
    },
    mr: {
      q: '(एका दिवसाचा ५/६ भाग) + (एका दिवसाचा १/४ भाग) म्हणजे एकूण किती तास होतात?',
      opts: ['26 hours', '24 hours', '22 hours', '28 hours'],
      exp: '२४ चा ५/६ = २० तास; २४ चा १/४ = ६ तास. एकूण = २६ तास.',
    },
    hi: {
      q: '(एक दिन का ५/६ भाग) + (एक दिन का १/४ भाग) कुल कितने घंटे होते हैं?',
      opts: ['26 hours', '24 hours', '22 hours', '28 hours'],
      exp: '२० घंटे + ६ घंटे = २६ घंटे।',
    },
  },
  {
    topic: 'Triangle Decimal Perimeter Addition',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Find the perimeter of a triangular craft cutout whose three sides measure 4.75 cm, 6.25 cm, and 5.8 cm.',
      opts: ['16.8 cm', '15.8 cm', '16.08 cm', '17.2 cm'],
      exp: '4.75 + 6.25 = 11.00; 11.00 + 5.80 = 16.80 = 16.8 cm.',
    },
    mr: {
      q: 'ज्या त्रिकोणाच्या तीन बाजू अनुक्रमे ४.७५ सेमी, ६.२५ सेमी आणि ५.८ सेमी आहेत, त्याची परिमिती किती?',
      opts: ['16.8 cm', '15.8 cm', '16.08 cm', '17.2 cm'],
      exp: '४.७५ + ६.२५ + ५.८० = १६.८ सेमी.',
    },
    hi: {
      q: 'एक त्रिभुज की तीनों भुजाएँ ४.७५ सेमी, ६.२५ सेमी तथा ५.८ सेमी हैं। इसका परिमाप क्या है?',
      opts: ['16.8 cm', '15.8 cm', '16.08 cm', '17.2 cm'],
      exp: '४.७५ + ६.२५ + ५.८ = १६.८ सेमी।',
    },
  },
  {
    topic: 'Unitary Method Weight Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Fifteen identical clay bricks together weigh 37.5 kg. What will be the total weight of 8 such bricks?',
      opts: ['20 kg', '18 kg', '22.5 kg', '24 kg'],
      exp: 'Weight of 1 brick = 37.5 ÷ 15 = 2.5 kg. Weight of 8 bricks = 8 × 2.5 = 20 kg.',
    },
    mr: {
      q: '१५ एकसारख्या विटांचे एकूण वजन ३७.५ किग्रॅ भरते, तर तशाच ८ विटांचे वजन किती किग्रॅ होईल?',
      opts: ['20 kg', '18 kg', '22.5 kg', '24 kg'],
      exp: '१ वीट = ३७.५ ÷ १५ = २.५ किग्रॅ. ८ विटा = ८ × २.५ = २० किग्रॅ.',
    },
    hi: {
      q: '१५ समान ईंटों का कुल भार ३७.५ किग्रा है। ऐसी ही ८ ईंटों का भार क्या होगा?',
      opts: ['20 kg', '18 kg', '22.5 kg', '24 kg'],
      exp: '१ ईंट = २.५ किग्रा; ८ ईंटें = ८ × २.५ = २० किग्रा।',
    },
  },
  {
    topic: 'HCF Square Floor Tiling Without Cutting',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A veranda measures 6 m 40 cm long and 4 m 80 cm wide. What is the LARGEST possible side of a square stone tile that can pave it completely without cutting any tile?',
      opts: ['1 m 60 cm', '80 cm', '1 m 20 cm', '40 cm'],
      exp: 'Convert to cm: 640 cm and 480 cm. HCF(640, 480) = 160 cm = 1 m 60 cm.',
    },
    mr: {
      q: '६ मी ४० सेमी लांब आणि ४ मी ८० सेमी रुंद व्हरांड्यात तुकडा न पाडता बसणारी सर्वात मोठी चौरसाकृती फरशी किती बाजूची असावी?',
      opts: ['1 m 60 cm', '80 cm', '1 m 20 cm', '40 cm'],
      exp: 'मसावि(६४० सेमी, ४८० सेमी) = १६० सेमी = १ मी ६० सेमी.',
    },
    hi: {
      q: '६ मी ४० सेमी लंबे तथा ४ मी ८० सेमी चौड़े बरामदे में बिना काटे बिछने वाली सबसे बड़ी वर्गाकार टाइल की भुजा क्या होगी?',
      opts: ['1 m 60 cm', '80 cm', '1 m 20 cm', '40 cm'],
      exp: 'म.स.(६४०, ४८०) = १६० सेमी = १ मी ६० सेमी।',
    },
  },
  {
    topic: 'LCM School Bells Toll Synchronization',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Three automatic bells chime at intervals of 12 minutes, 15 minutes, and 18 minutes respectively. After chiming together at 8:00 AM, when will they next chime together?',
      opts: ['11:00 AM', '10:30 AM', '9:30 AM', '12:00 Noon'],
      exp: 'LCM(12, 15, 18) = 180 minutes = 3 hours. 8:00 AM + 3 hours = 11:00 AM.',
    },
    mr: {
      q: 'तीन घंटा अनुक्रमे १२, १५ आणि १८ मिनिटांच्या अंतराने वाजतात. सकाळी ८:०० वाजता त्या एकत्र वाजल्यानंतर पुन्हा एकत्र कधी वाजतील?',
      opts: ['11:00 AM', '10:30 AM', '9:30 AM', '12:00 Noon'],
      exp: 'लसावि(१२, १५, १८) = १८० मिनिटे = ३ तास. ८:०० + ३ तास = सकाळी ११:०० वाजता.',
    },
    hi: {
      q: 'तीन घंटियाँ क्रमशः १२, १५ व १८ मिनट के अंतराल पर बजती हैं। प्रातः ८:०० बजे एक साथ बजने के बाद वे पुनः एक साथ कब बजेंगी?',
      opts: ['11:00 AM', '10:30 AM', '9:30 AM', '12:00 Noon'],
      exp: 'ल.स.(१२, १५, १८) = १८० मिनट = ३ घंटे। ८:०० + ३ = ११:०० AM।',
    },
  },
  {
    topic: 'Classroom Ratio Change After New Admissions',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'In a class of 48 pupils, boys and girls are in the ratio 5 : 3. If 6 new girls join the class, what becomes the new simplified ratio of boys to girls?',
      opts: ['5 : 4', '4 : 3', '3 : 2', '5 : 6'],
      exp: 'Boys = 48 × 5/8 = 30; Girls = 18. After 6 girls join: Girls = 18 + 6 = 24. New ratio = 30 : 24 = 5 : 4.',
    },
    mr: {
      q: '४८ विद्यार्थ्यांच्या वर्गात मुले आणि मुली यांचे गुणोत्तर ५ : ३ आहे. त्यात आणखी ६ नवीन मुलींनी प्रवेश घेतल्यास मुलांचे व मुलींचे नवीन गुणोत्तर किती होईल?',
      opts: ['5 : 4', '4 : 3', '3 : 2', '5 : 6'],
      exp: 'मुले = ३०, मुली = १८. +६ मुली ⇒ मुली = २४. नवे गुणोत्तर = ३० : २४ = ५ : ४.',
    },
    hi: {
      q: '४८ छात्रों की कक्षा में लड़के व लड़कियों का अनुपात ५ : ३ है। ६ नई लड़कियाँ आने पर नया अनुपात क्या होगा?',
      opts: ['5 : 4', '4 : 3', '3 : 2', '5 : 6'],
      exp: 'लड़के = ३०, लड़कियाँ = १८ + ६ = २४। नया अनुपात = ३० : २४ = ५ : ४।',
    },
  },
  {
    topic: 'Profit Percentage Including Repair Cost',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Suresh bought a used bicycle for ₹3,200, spent ₹400 on new tyres, and sold it for ₹4,140. What was his percentage profit?',
      opts: ['15%', '12.5%', '18%', '20%'],
      exp: 'Total Cost Price = 3,200 + 400 = ₹3,600. Profit = 4,140 − 3,600 = ₹540. Profit % = (540 / 3,600) × 100 = 15%.',
    },
    mr: {
      q: 'सुरेशने ₹३,२०० ला जुनी सायकल घेतली, तिच्या दुरुस्तीवर ₹४०० खर्च केले आणि ती ₹४,१४० ला विकली. त्याला शेकडा किती नफा झाला?',
      opts: ['15%', '12.5%', '18%', '20%'],
      exp: 'एकूण खरेदी = ₹३,६००; नफा = ₹५४०. नफा % = (५४० / ३६००) × १०० = १५%.',
    },
    hi: {
      q: 'सुरेश ने ₹३,२०० में पुरानी साइकिल खरीदकर ₹४०० मरम्मत पर खर्च किए और ₹४,१४० में बेच दी। उसका लाभ प्रतिशत क्या है?',
      opts: ['15%', '12.5%', '18%', '20%'],
      exp: 'कुल लागत = ₹३,६००; लाभ = ₹५४०। प्रतिशत = (५४० / ३६००) × १०० = १५%।',
    },
  },
  {
    topic: 'Discount Calculation on Marked Price',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school backpack has a marked price of ₹800 and is sold during a monsoon sale at a 15% discount. What does a customer pay?',
      opts: ['₹680', '₹720', '₹660', '₹695'],
      exp: 'Discount = 15% of 800 = ₹120. Selling price = 800 − 120 = ₹680.',
    },
    mr: {
      q: '₹८०० छापील किंमत असलेल्या दप्तरावर १५% सूट मिळाल्यास ग्राहकाला ते किती रुपयांत मिळेल?',
      opts: ['₹680', '₹720', '₹660', '₹695'],
      exp: 'सूट = ८०० चे १५% = ₹१२०. विक्री किंमत = ८०० − १२० = ₹६८०.',
    },
    hi: {
      q: '₹८०० अंकित मूल्य वाले स्कूल बैग पर १५% छूट मिलने पर ग्राहक को कितने रुपये देने होंगे?',
      opts: ['₹680', '₹720', '₹660', '₹695'],
      exp: 'छूट = ₹१२०; देय मूल्य = ८०० − १२० = ₹६८०।',
    },
  },
  {
    topic: 'Mental Multiplication by 999 Trick',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Find the exact product using the compensation method: 24 × 999.',
      opts: ['23,976', '23,986', '24,976', '23,760'],
      exp: '24 × (1,000 − 1) = 24,000 − 24 = 23,976.',
    },
    mr: {
      q: '२४ × ९९९ चा अचूक गुणाकार कोणता?',
      opts: ['23,976', '23,986', '24,976', '23,760'],
      exp: '२४ × (१,००० − १) = २४,००० − २४ = २३,९७६.',
    },
    hi: {
      q: 'सही गुणनफल ज्ञात कीजिए: २४ × ९९९ = ?',
      opts: ['23,976', '23,986', '24,976', '23,760'],
      exp: '२४ × (१,००० − १) = २४,००० − २४ = २३,९७६।',
    },
  },
  {
    topic: 'Circle Radius vs Diameter Size Comparison',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Circle P has a diameter of 18 cm and Circle Q has a radius of 11 cm. Which circle is larger, and by how many centimetres is its radius greater?',
      opts: ['Circle Q, radius 2 cm greater', 'Circle P, radius 7 cm greater', 'Circle Q, radius 7 cm greater', 'Circle P, radius 2 cm greater'],
      exp: 'Circle P radius = 18 ÷ 2 = 9 cm. Circle Q radius = 11 cm. So Circle Q is larger with radius 11 − 9 = 2 cm greater.',
    },
    mr: {
      q: 'वर्तुळ P चा व्यास १८ सेमी व वर्तुळ Q ची त्रिज्या ११ सेमी आहे. कोणते वर्तुळ मोठे आहे आणि त्याची त्रिज्या कितीने जास्त आहे?',
      opts: ['Circle Q, radius 2 cm greater', 'Circle P, radius 7 cm greater', 'Circle Q, radius 7 cm greater', 'Circle P, radius 2 cm greater'],
      exp: 'वर्तुळ P ची त्रिज्या = १८ ÷ २ = ९ सेमी. वर्तुळ Q ची त्रिज्या ११ सेमी म्हणजे २ सेमी जास्त.',
    },
    hi: {
      q: 'वृत्त P का व्यास १८ सेमी और वृत्त Q की त्रिज्या ११ सेमी है। कौन-सा वृत्त बड़ा है और उसकी त्रिज्या कितनी अधिक है?',
      opts: ['Circle Q, radius 2 cm greater', 'Circle P, radius 7 cm greater', 'Circle Q, radius 7 cm greater', 'Circle P, radius 2 cm greater'],
      exp: 'P की त्रिज्या = ९ सेमी, Q की ११ सेमी। अतः Q की त्रिज्या २ सेमी अधिक है।',
    },
  },
  {
    topic: 'Framed Painting Uniform Margin Area',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular photograph 30 cm × 20 cm is pasted on cardboard leaving a uniform 2 cm border around ALL four sides. What is the total area of the outer cardboard?',
      opts: ['816 cm²', '600 cm²', '704 cm²', '680 cm²'],
      exp: 'Outer length = 30 + 2 + 2 = 34 cm; outer breadth = 20 + 2 + 2 = 24 cm. Area = 34 × 24 = 816 cm².',
    },
    mr: {
      q: '३० सेमी × २० सेमी च्या छायाचित्राभोवती चारी बाजूंनी २ सेमी एकसारखी पट्टी सोडून पुठ्ठा कापला, तर त्या बाह्य पुठ्ठ्याचे क्षेत्रफळ किती?',
      opts: ['816 cm²', '600 cm²', '704 cm²', '680 cm²'],
      exp: 'बाह्य लांबी = ३४ सेमी, रुंदी = २४ सेमी. क्षेत्रफळ = ३४ × २४ = ८१६ चौ.सेमी.',
    },
    hi: {
      q: '३० सेमी × २० सेमी फोटो के चारों ओर २ सेमी की समान पट्टी छोड़कर गत्ता लगाया गया। बाहरी गत्ते का क्षेत्रफल क्या होगा?',
      opts: ['816 cm²', '600 cm²', '704 cm²', '680 cm²'],
      exp: 'बाहरी लंबाई = ३४ सेमी, चौड़ाई = २४ सेमी। क्षेत्रफल = ३४ × २४ = ८१६ वर्ग सेमी।',
    },
  },
  {
    topic: 'Volume of Cubical Tank in Litres',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A cubical water tank has an inner side length of 1 metre. If the tank is filled EXACTLY half full, how many litres of water are inside it? (1,000 cm³ = 1 litre)',
      opts: ['500 litres', '1,000 litres', '50 litres', '250 litres'],
      exp: 'Side = 100 cm. Full volume = 100 × 100 × 100 = 10,00,000 cm³ = 1,000 litres. Half full = 500 litres.',
    },
    mr: {
      q: '१ मीटर आतील बाजू असलेल्या घनाकृती टाकीत बरोबर निम्मे पाणी भरलेले असल्यास तिच्यात किती लिटर पाणी असेल? (१,००० घ.सेमी = १ लिटर)',
      opts: ['500 litres', '1,000 litres', '50 litres', '250 litres'],
      exp: 'पूर्ण घनफळ = १००³ = १०,००,००० घ.सेमी = १,००० लिटर. निम्मे = ५०० लिटर.',
    },
    hi: {
      q: '१ मीटर आंतरिक भुजा वाली घनाकार टंकी ठीक आधी भरी है। उसमें कितने लीटर पानी है? (१,००० घन सेमी = १ लीटर)',
      opts: ['500 litres', '1,000 litres', '50 litres', '250 litres'],
      exp: 'कुल क्षमता = १,००० लीटर; आधी टंकी = ५०० लीटर।',
    },
  },
  {
    topic: 'Roman Notation Large Year Construction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which standard Roman numeral correctly represents the number 494?',
      opts: ['CDXCIV', 'CCCCXCIV', 'CDLXXXXIV', 'XDIC'],
      exp: '400 = CD, 90 = XC, 4 = IV ⇒ 494 = CDXCIV.',
    },
    mr: {
      q: '४९४ ही संख्या अचूक रोमन लिपीत कशी लिहितात?',
      opts: ['CDXCIV', 'CCCCXCIV', 'CDLXXXXIV', 'XDIC'],
      exp: '४०० (CD) + ९० (XC) + ४ (IV) = CDXCIV.',
    },
    hi: {
      q: 'संख्या ४९४ को मानक रोमन अंक में किस प्रकार लिखा जाता है?',
      opts: ['CDXCIV', 'CCCCXCIV', 'CDLXXXXIV', 'XDIC'],
      exp: '४०० (CD) + ९० (XC) + ४ (IV) = CDXCIV।',
    },
  },
  {
    topic: 'Rounding Pair to Nearest Thousand',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which pair of numbers BOTH round to 45,000 when rounded to the nearest thousand?',
      opts: ['44,680 and 45,420', '44,390 and 45,210', '44,810 and 45,510', '44,499 and 45,500'],
      exp: 'Numbers rounding to 45,000 to nearest thousand lie in 44,500 to 45,499. Only (44,680 and 45,420) fall inside this range.',
    },
    mr: {
      q: 'जवळच्या हजारापर्यंत अंदाजित केल्यास खालीलपैकी कोणत्या जोडीतील दोन्ही संख्या ४५,००० होतात?',
      opts: ['44,680 and 45,420', '44,390 and 45,210', '44,810 and 45,510', '44,499 and 45,500'],
      exp: '४४,५०० ते ४५,४९९ मधील संख्या ४५,००० होतात.',
    },
    hi: {
      q: 'निकटतम हजार तक सन्निकटन करने पर किस युग्म की दोनों संख्याएँ ४५,००० बनती हैं?',
      opts: ['44,680 and 45,420', '44,390 and 45,210', '44,810 and 45,510', '44,499 and 45,500'],
      exp: '४४,५०० से ४५,४९९ तक की संख्याएँ सन्निकट होकर ४५,००० बनती हैं।',
    },
  },
  {
    topic: 'Fraction Pocket Money Balance',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Out of ₹640, Ramesh spent 3/8 on a dictionary and 1/5 of the original ₹640 on notebooks. How much money remains with him?',
      opts: ['₹272', '₹288', '₹368', '₹256'],
      exp: 'Dictionary = 3/8 × 640 = ₹240; Notebooks = 1/5 × 640 = ₹128. Remaining = 640 − (240 + 128) = ₹272.',
    },
    mr: {
      q: 'रमेशने ₹६४० पैकी ३/८ रक्कम शब्दकोशावर व मूळ रकमेच्या १/५ वह्यांवर खर्च केली. त्याच्याकडे किती रुपये शिल्लक राहिले?',
      opts: ['₹272', '₹288', '₹368', '₹256'],
      exp: '२४० + १२८ = ₹३६८ खर्च; ६४० − ३६८ = ₹२७२ शिल्लक.',
    },
    hi: {
      q: 'रमेश ने ₹६४० का ३/८ भाग शब्दकोश पर और १/५ भाग कॉपियों पर खर्च किया। उसके पास कितने रुपये शेष बचे?',
      opts: ['₹272', '₹288', '₹368', '₹256'],
      exp: 'कुल खर्च = २४० + १२८ = ₹३६८; शेष = ६४० − ३६८ = ₹२७२।',
    },
  },
  {
    topic: 'Decimal to Lowest Fraction Equivalence',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Convert 0.375 into a fraction in its simplest (lowest) form.',
      opts: ['3/8', '3/4', '15/40', '5/16'],
      exp: '0.375 = 375/1000. Dividing numerator and denominator by 125 yields 3/8.',
    },
    mr: {
      q: '०.३७५ या दशांश अपूर्णांकाचे अतिसंक्षिप्त व्यवहारी अपूर्णांक रूप कोणते?',
      opts: ['3/8', '3/4', '15/40', '5/16'],
      exp: '३७५ / १००० = ३/८ (१२५ ने संक्षिप्त करून).',
    },
    hi: {
      q: '०.३७५ का सरलतम भिन्न रूप क्या है?',
      opts: ['3/8', '3/4', '15/40', '5/16'],
      exp: '३७५/१००० को १२५ से सरल करने पर ३/८ प्राप्त होता है।',
    },
  },
  {
    topic: 'Prime Factorization Canonical Form',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Express 360 cleanly as a product of its prime factors.',
      opts: ['2³ × 3² × 5', '2² × 3³ × 5', '2³ × 3 × 5²', '2⁴ × 3 × 5'],
      exp: '360 = 8 × 9 × 5 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5.',
    },
    mr: {
      q: '३६० या संख्येचे मूळ अवयवांच्या गुणाकाराच्या घातांक रूपातील मांडणी कोणती?',
      opts: ['2³ × 3² × 5', '2² × 3³ × 5', '2³ × 3 × 5²', '2⁴ × 3 × 5'],
      exp: '३६० = ८ × ९ × ५ = २³ × ३² × ५.',
    },
    hi: {
      q: '३६० को अभाज्य गुणनखंडों के घात रूप में व्यक्त कीजिए।',
      opts: ['2³ × 3² × 5', '2² × 3³ × 5', '2³ × 3 × 5²', '2⁴ × 3 × 5'],
      exp: '३६० = ८ × ९ × ५ = २³ × ३² × ५।',
    },
  },
  {
    topic: 'Odd Number of Factors Property',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which number below has an ODD total count of factors: 48, 56, 64, or 72?',
      opts: ['64', '48', '56', '72'],
      exp: 'Only perfect squares have an odd number of factors (all factors pair up except the repeated square root: 8 × 8 for 64, giving 7 factors).',
    },
    mr: {
      q: '४८, ५६, ६४ आणि ७२ यांपैकी कोणत्या संख्येच्या एकूण विभाजकांची संख्या "विषम" आहे?',
      opts: ['64', '48', '56', '72'],
      exp: 'केवळ पूर्ण वर्गसंख्येचे (येथे ६४ = ८²) एकूण विभाजक विषम (७) असतात.',
    },
    hi: {
      q: '४८, ५६, ६४ तथा ७२ में से किस संख्या के कुल गुणनखंडों की संख्या विषम है?',
      opts: ['64', '48', '56', '72'],
      exp: 'केवल पूर्ण वर्ग संख्याओं (जैसे ६४ = ८²) के गुणनखंडों की संख्या विषम होती है।',
    },
  },
  {
    topic: 'Target Average Next Test Score',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'After 4 mathematics tests, Priya’s average score is 78. What marks must she score on the 5th test to raise her overall average to 80?',
      opts: ['88', '82', '86', '90'],
      exp: '4-test total = 4 × 78 = 312. Target 5-test total = 5 × 80 = 400. Needed on 5th test = 400 − 312 = 88.',
    },
    mr: {
      q: '४ चाचण्यांत प्रियाचे सरासरी गुण ७८ आहेत. एकूण सरासरी ८० होण्यासाठी तिला ५ व्या चाचणीत किती गुण मिळवावे लागतील?',
      opts: ['88', '82', '86', '90'],
      exp: '४ चाचण्यांची बेरीज = ३१२; ५ साठी लक्ष्य बेरीज = ४००. गरजेचे गुण = ४०० − ३१२ = ८८.',
    },
    hi: {
      q: '४ परीक्षाओं में प्रिया का औसत ७८ है। औसत ८० करने हेतु उसे ५वीं परीक्षा में कितने अंक लाने होंगे?',
      opts: ['88', '82', '86', '90'],
      exp: '(५ × ८०) − (४ × ७८) = ४०० − ३१२ = ८८।',
    },
  },
  {
    topic: 'Fractional Hour Distance Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'At a constant speed of 45 km/h, how far does a delivery van travel in 2 hours 20 minutes?',
      opts: ['105 km', '99 km', '110 km', '95 km'],
      exp: '2 hours 20 minutes = 2 + 1/3 = 7/3 hours. Distance = 45 × (7/3) = 15 × 7 = 105 km.',
    },
    mr: {
      q: 'ताशी ४५ किमी वेगाने जाणारी गाडी २ तास २० मिनिटांत किती किमी अंतर पार करेल?',
      opts: ['105 km', '99 km', '110 km', '95 km'],
      exp: '२ तास २० मिनिटे = ७/३ तास. अंतर = ४५ × (७/३) = १०५ किमी.',
    },
    hi: {
      q: '४५ किमी/घंटा की समान चाल से एक वैन २ घंटे २० मिनट में कितनी दूरी तय करेगी?',
      opts: ['105 km', '99 km', '110 km', '95 km'],
      exp: '२ घं २० मि = ७/३ घंटे। दूरी = ४५ × (७/३) = १०५ किमी।',
    },
  },
  {
    topic: 'Leap Year Complete Weeks & Odd Days',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A complete leap year (366 days) consists of:',
      opts: ['52 complete weeks and 2 odd days', '52 complete weeks and 1 odd day', '51 complete weeks and 9 odd days', '53 complete weeks exactly'],
      exp: '366 ÷ 7 = 52 weeks (364 days) with remainder 2 odd days.',
    },
    mr: {
      q: 'एका पूर्ण लीप वर्षात (३६६ दिवस) किती पूर्ण आठवडे आणि किती जादा दिवस असतात?',
      opts: ['52 complete weeks and 2 odd days', '52 complete weeks and 1 odd day', '51 complete weeks and 9 odd days', '53 complete weeks exactly'],
      exp: '३६६ ÷ ७ = ५२ आठवडे आणि २ दिवस बाकी.',
    },
    hi: {
      q: 'एक पूरे अधिवर्ष (३६६ दिन) में कितने पूर्ण सप्ताह और कितने अतिरिक्त दिन होते हैं?',
      opts: ['52 complete weeks and 2 odd days', '52 complete weeks and 1 odd day', '51 complete weeks and 9 odd days', '53 complete weeks exactly'],
      exp: '३६६ = (५२ × ७) + २ दिन।',
    },
  },
  {
    topic: 'Vertical Mirror Reflection Symmetry Number',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which 3-digit number looks IDENTICAL when viewed in a vertical mirror placed to its right?',
      opts: ['808', '609', '303', '502'],
      exp: 'A vertical mirror reverses digit order and reflects horizontally. Only 8 and 0 are vertically symmetric, so 808 remains 808.',
    },
    mr: {
      q: 'उजवीकडे उभा आरसा धरल्यास खालीलपैकी कोणती ३-अंकी संख्या आरशातही तशीच (८०८ सारखी) अचूक दिसेल?',
      opts: ['808', '609', '303', '502'],
      exp: '८ आणि ० हे अंक उभ्या आरशात सममित असल्याने ८०८ जशीच्या तशी दिसते.',
    },
    hi: {
      q: 'दाईं ओर रखे ऊर्ध्वाधर दर्पण में इनमें से कौन-सी ३-अंकीय संख्या बिल्कुल वैसी ही दिखेगी?',
      opts: ['808', '609', '303', '502'],
      exp: '८ और ० दोनों ऊर्ध्वाधर दर्पण में सममित हैं, अतः ८०८ अपरिवर्तित रहती है।',
    },
  },
  {
    topic: 'Set Squares Combined Angle Measurement',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Using a standard geometry box’s two set squares (45°-45°-90° and 30°-60°-90°), if the 45° corner and 60° corner are placed edge-to-edge sharing a vertex, what combined angle do they form?',
      opts: ['105° (Obtuse Angle)', '90° (Right Angle)', '75° (Acute Angle)', '135° (Obtuse Angle)'],
      exp: '45° + 60° = 105°, which lies between 90° and 180° (Obtuse angle).',
    },
    mr: {
      q: 'कंपास पेटीतील दोन गुण्यांचे ४५° व ६०° चे कोन एकाच शिरोबिंदूवर शेजारी ठेवल्यास एकूण किती अंशांचा आणि कोणत्या प्रकारचा कोन तयार होईल?',
      opts: ['105° (Obtuse Angle)', '90° (Right Angle)', '75° (Acute Angle)', '135° (Obtuse Angle)'],
      exp: '४५° + ६०° = १०५° (विशालकोन).',
    },
    hi: {
      q: 'ज्यामिति बॉक्स के दो सेट-स्क्वायरों के ४५° और ६०° कोनों को सटाकर रखने पर कौन-सा संयुक्त कोण बनेगा?',
      opts: ['105° (Obtuse Angle)', '90° (Right Angle)', '75° (Acute Angle)', '135° (Obtuse Angle)'],
      exp: '४५° + ६०° = १०५° (अधिककोण)।',
    },
  },
  {
    topic: 'Statistical Mode in Classroom Marks',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Seven students scored: 12, 18, 15, 18, 20, 14, 18 out of 20. Which score is the MODE (most frequently occurring value)?',
      opts: ['18', '15', '16', '20'],
      exp: '18 appears 3 times (more than any other mark), making 18 the Mode.',
    },
    mr: {
      q: 'सात विद्यार्थ्यांचे गुण १२, १८, १५, १८, २०, १४, १८ आहेत. या माहितीचे बहुलक (Mode) कोणते?',
      opts: ['18', '15', '16', '20'],
      exp: '१८ ही संख्या सर्वाधिक (३ वेळा) आली असल्याने बहुलक = १८.',
    },
    hi: {
      q: 'सात विद्यार्थियों के अंक १२, १८, १५, १८, २०, १४, १८ हैं। इन आँकड़ों का बहुलक (Mode) क्या है?',
      opts: ['18', '15', '16', '20'],
      exp: '१८ सर्वाधिक ३ बार आया है, अतः बहुलक = १८।',
    },
  },
  {
    topic: 'Metric Weight Quintal to Kilogram Addition',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A grain sack lot weighs 3.5 quintals plus 45 kg. What is its total weight in kilograms? (1 quintal = 100 kg)',
      opts: ['395 kg', '354.5 kg', '795 kg', '3,545 kg'],
      exp: '3.5 quintals = 3.5 × 100 = 350 kg. Total = 350 + 45 = 395 kg.',
    },
    mr: {
      q: '३.५ क्विंटल आणि ४५ किग्रॅ म्हणजे एकूण किती किलोग्रॅम? (१ क्विंटल = १०० किग्रॅ)',
      opts: ['395 kg', '354.5 kg', '795 kg', '3,545 kg'],
      exp: '३.५ × १०० = ३५० किग्रॅ; ३५० + ४५ = ३९५ किग्रॅ.',
    },
    hi: {
      q: '३.५ क्विंटल और ४५ किग्रा कुल कितने किलोग्राम के बराबर हैं?',
      opts: ['395 kg', '354.5 kg', '795 kg', '3,545 kg'],
      exp: '३५० किग्रा + ४५ किग्रा = ३९५ किग्रा।',
    },
  },
  {
    topic: 'Even Number Row Pyramid Sum Pattern',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Observe the even-number rows: Row 1: [2]; Row 2: [4, 6]; Row 3: [8, 10, 12]; Row 4: [14, 16, 18, 20]. Find the SUM of all numbers in Row 4.',
      opts: ['68', '64', '72', '56'],
      exp: '14 + 16 + 18 + 20 = 68.',
    },
    mr: {
      q: 'ओळ १: [२]; ओळ २: [४, ६]; ओळ ३: [८, १०, १२]; ओळ ४: [१४, १६, १८, २०]. ओळ ४ मधील सर्व संख्यांची बेरीज किती?',
      opts: ['68', '64', '72', '56'],
      exp: '१४ + १६ + १८ + २० = ६८.',
    },
    hi: {
      q: 'पंक्ति १: [२]; पंक्ति २: [४, ६]; पंक्ति ३: [८, १०, १२]; पंक्ति ४: [१४, १६, १८, २०]। पंक्ति ४ की सभी संख्याओं का योग क्या है?',
      opts: ['68', '64', '72', '56'],
      exp: '१४ + १६ + १८ + २० = ६८।',
    },
  },
  {
    topic: 'Odometer Distance Subtraction Check',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school bus odometer read 48,795 km at the start of an excursion and 51,240 km upon return. How far did the bus travel?',
      opts: ['2,445 km', '2,545 km', '3,445 km', '2,355 km'],
      exp: '51,240 − 48,795 = 2,445 km.',
    },
    mr: {
      q: 'सहलीला जाताना बसचे ओडोमीटर वाचन ४८,७९५ किमी होते आणि परत आल्यावर ५१,२४० किमी झाले. बसने एकूण किती किमी प्रवास केला?',
      opts: ['2,445 km', '2,545 km', '3,445 km', '2,355 km'],
      exp: '५१,२४० − ४८,७९५ = २,४४५ किमी.',
    },
    hi: {
      q: 'यात्रा के आरंभ में बस का ओडोमीटर ४८,७९५ किमी और वापसी पर ५१,२४० किमी दर्शाता है। बस ने कितनी दूरी तय की?',
      opts: ['2,445 km', '2,545 km', '3,445 km', '2,355 km'],
      exp: '५१,२४० − ४८,७९५ = २,४४५ किमी।',
    },
  },
  {
    topic: 'Equal Coin Pair Value Word Problem',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A piggy bank contains an EQUAL number of ₹5 coins and ₹2 coins totalling ₹112 altogether. How many TOTAL coins are inside the piggy bank?',
      opts: ['32 coins', '16 coins', '28 coins', '24 coins'],
      exp: 'One pair (one ₹5 + one ₹2) = ₹7. Number of pairs = 112 ÷ 7 = 16 pairs ⇒ 16 × 2 = 32 coins total.',
    },
    mr: {
      q: 'एका गल्ल्यात ₹५ ची आणि ₹२ ची समान संख्येने नाणी असून त्यांची एकूण रक्कम ₹११२ भरते. तर गल्ल्यात एकूण किती नाणी आहेत?',
      opts: ['32 coins', '16 coins', '28 coins', '24 coins'],
      exp: '१ जोडी (₹५ + ₹२) = ₹७. एकूण जोड्या = ११२ ÷ ७ = १६ ⇒ एकूण नाणी = १६ × २ = ३२.',
    },
    hi: {
      q: 'एक गुल्लक में ₹५ तथा ₹२ के बराबर संख्या में सिक्के हैं, जिनका कुल मूल्य ₹११२ है। गुल्लक में कुल कितने सिक्के हैं?',
      opts: ['32 coins', '16 coins', '28 coins', '24 coins'],
      exp: '१ जोड़ा = ₹७। जोड़ों की संख्या = ११२ ÷ ७ = १६ ⇒ कुल सिक्के = १६ × २ = ३२।',
    },
  },
];
