import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Content Part 3 (28 unique Classes 1-5 measurement, money, fractions & geometry Qs)
export const MAHA_TET_P1_B2_MATH_C3: CuratedTrilingualMcq[] = [
  {
    topic: '2D Area Shaded Triangular Corner Inside Rectangle',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'From a rectangular sheet measuring `16 cm × 10 cm`, a right-angled triangle of base `6 cm` and height `8 cm` is snipped off cleanly from one corner. What is the area of the remaining sheet?',
      opts: ['136 sq cm', '112 sq cm', '148 sq cm', '128 sq cm'],
      exp: 'Rectangle area = `16 × 10 = 160 sq cm`. Cut triangle area = `(1/2) × 6 × 8 = 24 sq cm`. Remaining = `160 − 24 = 136 sq cm`.',
    },
    mr: {
      q: '`16 सेमी × 10 सेमी` मापाच्या आयताकृती कागदाच्या एका कोपऱ्यातून `6 सेमी` पाया व `8 सेमी` उंचीचा काटकोन त्रिकोण कापून काढला, तर शिल्लक कागदाचे क्षेत्रफळ किती?',
      opts: ['136 चौ.सेमी', '112 चौ.सेमी', '148 चौ.सेमी', '128 चौ.सेमी'],
      exp: 'आयत = `16 × 10 = 160 चौ.सेमी`. त्रिकोण = `(1/2) × 6 × 8 = 24 चौ.सेमी`. शिल्लक = `160 − 24 = 136 चौ.सेमी`.',
    },
    hi: {
      q: '`16 सेमी × 10 सेमी` आयताकार कागज के एक कोने से `6 सेमी` आधार और `8 सेमी` ऊँचाई का समकोण त्रिभुज काटा गया। शेष भाग का क्षेत्रफल कितना होगा?',
      opts: ['136 वर्ग सेमी', '112 वर्ग सेमी', '148 वर्ग सेमी', '128 वर्ग सेमी'],
      exp: '`160 − (1/2 × 6 × 8) = 160 − 24 = 136 वर्ग सेमी`।',
    },
  },
  {
    topic: 'Fraction Word Problem Tank Filling & Emptying',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A water tank was `3/4` full. After `35 litres` of water were drawn out for gardening, it remained `2/5` full. What is the full capacity of the tank?',
      opts: ['100 litres', '120 litres', '80 litres', '140 litres'],
      exp: 'Drawn fraction = `3/4 − 2/5 = (15 − 8)/20 = 7/20` of capacity = `35 L`. Full tank = `35 × 20 ÷ 7 = 100 litres`.',
    },
    mr: {
      q: 'एक पाण्याची टाकी `3/4` भरलेली होती. बागेसाठी `35 लिटर` पाणी वापरल्यावर टाकी `2/5` भरलेली राहिली, तर टाकीची एकूण क्षमता किती लिटर आहे?',
      opts: ['100 लिटर', '120 लिटर', '80 लिटर', '140 लिटर'],
      exp: 'वापरलेला भाग = `3/4 − 2/5 = 7/20 = 35 लिटर`. पूर्ण टाकी = `35 × 20 ÷ 7 = 100 लिटर`.',
    },
    hi: {
      q: 'एक टंकी `3/4` भरी थी। सिंचाई हेतु `35 लीटर` पानी निकालने पर वह `2/5` भरी बची। टंकी की कुल धारिता कितनी है?',
      opts: ['100 लीटर', '120 लीटर', '80 लीटर', '140 लीटर'],
      exp: '`3/4 − 2/5 = 7/20` भाग = `35 लीटर` ⇒ कुल धारिता = `100 लीटर`।',
    },
  },
  {
    topic: 'Time Watch Gain-Loss Arithmetic',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'An old wall clock runs fast by `4 minutes` every hour. If it is set accurately at `8:00 a.m.`, what time will its dial display at `2:30 p.m.` actual time on the same day?',
      opts: ['2:56 p.m.', '2:54 p.m.', '2:46 p.m.', '3:00 p.m.'],
      exp: 'Elapsed actual hours from `8:00 a.m.` to `2:30 p.m.` = `6.5 hours`. Gain = `6.5 × 4 = 26 minutes`. Dial shows `2:56 p.m.`.',
    },
    mr: {
      q: 'एक जुने भिंतीवरचे घड्याळ दर तासाला `4 मिनिटे` पुढे जाते. सकाळी `8:00` वाजता ते अचूक लावले असल्यास दुपारी खऱ्या `2:30` वाजता ते घड्याळ किती वेळ दाखवेल?',
      opts: ['दुपारी 2:56', 'दुपारी 2:54', 'दुपारी 2:46', 'दुपारी 3:00'],
      exp: '`8:00` ते `2:30` दरम्यान `6.5 तास`. वाढ = `6.5 × 4 = 26 मिनिटे`. म्हणून घड्याळ `2:56` दाखवेल.',
    },
    hi: {
      q: 'एक पुरानी घड़ी हर घंटे `4 मिनट` तेज चलती है। सुबह `8:00` बजे ठीक मिलाने पर उसी दिन वास्तविक `2:30` बजे वह क्या समय दिखाएगी?',
      opts: ['दोपहर 2:56', 'दोपहर 2:54', 'दोपहर 2:46', 'दोपहर 3:00'],
      exp: '`6.5 घंटे × 4 मिनट = 26 मिनट` आगे ⇒ `2:56` दिखाएगी।',
    },
  },
  {
    topic: 'Dozen and Gross Stationery Packing Problem',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'One gross equals `12 dozen` (`144` items). If a school receives `3 gross` and `5 dozen` chalk pieces and uses `214` pieces during the term, how many chalk pieces remain?',
      opts: ['278 pieces', '288 pieces', '268 pieces', '312 pieces'],
      exp: 'Received = `(3 × 144) + (5 × 12) = 432 + 60 = 492`. Remaining = `492 − 214 = 278` pieces.',
    },
    mr: {
      q: '१ ग्रॉस म्हणजे `12 डझन` (`144` नग). शाळेत `3 ग्रॉस` व `5 डझन` खडू आले आणि सत्रात `214` खडू वापरले, तर किती खडू शिल्लक राहिले?',
      opts: ['278 खडू', '288 खडू', '268 खडू', '312 खडू'],
      exp: 'एकूण खडू = `(3 × 144) + (5 × 12) = 432 + 60 = 492`. शिल्लक = `492 − 214 = 278`.',
    },
    hi: {
      q: '`1` ग्रॉस = `12 दर्जन` (`144` नग)। विद्यालय में `3 ग्रॉस` और `5 दर्जन` चॉक आए, जिनमें से `214` उपयोग हो गए। कितने चॉक शेष बचे?',
      opts: ['278 चॉक', '288 चॉक', '268 चॉक', '312 चॉक'],
      exp: 'कुल = `432 + 60 = 492`। शेष = `492 − 214 = 278`।',
    },
  },
  {
    topic: 'Decimal Sum & Missing Addend Verification',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'What decimal number must be subtracted from `100` to obtain the exact sum of `24.675 + 38.45`?',
      opts: ['36.875', '37.875', '36.975', '35.875'],
      exp: '`24.675 + 38.45 = 63.125`. Subtracting from `100`: `100 − 63.125 = 36.875`.',
    },
    mr: {
      q: '`100` मधून कोणती दशांश संख्या वजा केल्यास उत्तर `24.675 + 38.45` या बेरजेइतके येईल?',
      opts: ['36.875', '37.875', '36.975', '35.875'],
      exp: '`24.675 + 38.45 = 63.125`. `100 − 63.125 = 36.875`.',
    },
    hi: {
      q: '`100` में से कौन-सी दशमलव संख्या घटाने पर प्राप्त मान `24.675 + 38.45` के योग के बराबर होगा?',
      opts: ['36.875', '37.875', '36.975', '35.875'],
      exp: '`24.675 + 38.45 = 63.125`; `100 − 63.125 = 36.875`।',
    },
  },
  {
    topic: 'Divisibility by 8 Three-Digit Ending Check',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following 5-digit numbers is completely divisible by `8`?',
      opts: ['53,416', '53,412', '53,428', '53,404'],
      exp: 'A number is divisible by `8` iff its last `3` digits are divisible by `8`: `416 ÷ 8 = 52` exact (`412, 428, 404` leave remainders).',
    },
    mr: {
      q: 'खालीलपैकी कोणती ५-अंकी संख्या `8` ने नि:शेष भाग जाते?',
      opts: ['53,416', '53,412', '53,428', '53,404'],
      exp: 'शेवटच्या तीन अंकांना `8` ने भाग गेला पाहिजे: `416 ÷ 8 = 52` नि:शेष भाग जातो.',
    },
    hi: {
      q: 'निम्न में से कौन-सी संख्या `8` से पूर्णतः विभाज्य है?',
      opts: ['53,416', '53,412', '53,428', '53,404'],
      exp: 'अंतिम ३ अंक `416 ÷ 8 = 52` पूर्णतः विभाज्य हैं।',
    },
  },
  {
    topic: '2D Perimeter Composite T-Shape Boundary',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A carpenter glues three identical squares, each of side `5 cm`, edge-to-edge in a straight `1 × 3` row strip. What is the perimeter of the resulting `5 cm × 15 cm` rectangle?',
      opts: ['40 cm', '60 cm', '45 cm', '50 cm'],
      exp: 'Rectangle dimensions = `15 cm × 5 cm`. Perimeter = `2 × (15 + 5) = 40 cm`.',
    },
    mr: {
      q: 'प्रत्येकी `5 सेमी` बाजू असलेले तीन एकसारखे चौरस एका सरळ रांगेत कडेने जोडून एक लांब आयत तयार केला, तर त्या तयार झालेल्या आयताची परिमिती किती?',
      opts: ['40 सेमी', '60 सेमी', '45 सेमी', '50 सेमी'],
      exp: 'लांबी `15 सेमी` व रुंदी `5 सेमी` होते. परिमिती = `2 × (15 + 5) = 40 सेमी`.',
    },
    hi: {
      q: '`5 सेमी` भुजा वाले तीन समान वर्गों को एक सीधी पंक्ति में सटाकर जोड़ा गया। बने हुए आयत का परिमाप कितना होगा?',
      opts: ['40 सेमी', '60 सेमी', '45 सेमी', '50 सेमी'],
      exp: 'नए आयत की भुजाएँ `15 सेमी × 5 सेमी` होंगी ⇒ परिमाप = `2 × (15 + 5) = 40 सेमी`।',
    },
  },
  {
    topic: 'Percentage Exam Total Marks Back-Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A scholarship candidate needs `40%` marks to qualify. Kunal scored `178` marks and fell short by `22` marks. What were the maximum marks for the paper?',
      opts: ['500 marks', '450 marks', '400 marks', '550 marks'],
      exp: 'Qualifying mark = `178 + 22 = 200`, which equals `40%`. Total marks = `(200 × 100) ÷ 40 = 500`.',
    },
    mr: {
      q: 'एका शिष्यवृत्ती परीक्षेत उत्तीर्ण होण्यासाठी `40%` गुण लागतात. कुणालला `178` गुण मिळाले व तो `22` गुणांनी अनुत्तीर्ण झाला, तर ती परीक्षा एकूण किती गुणांची होती?',
      opts: ['500 गुणांची', '450 गुणांची', '400 गुणांची', '550 गुणांची'],
      exp: 'उत्तीर्णांक `= 178 + 22 = 200` म्हणजे `40%`. एकूण गुण `= (200 × 100) ÷ 40 = 500`.',
    },
    hi: {
      q: 'उत्तीर्ण होने के लिए `40%` अंक चाहिए। कुणाल को `178` अंक मिले और वह `22` अंकों से अनुत्तीर्ण रहा। परीक्षा का पूर्णांक कितना था?',
      opts: ['500 अंक', '450 अंक', '400 अंक', '550 अंक'],
      exp: '`40% = 178 + 22 = 200` ⇒ `100% = 500` अंक।',
    },
  },
  {
    topic: 'Cube Cutting Smaller Cubes Count',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A solid wooden cube of edge `12 cm` is sliced cleanly into smaller identical cubes of edge `3 cm` each. How many total small `3 cm` cubes are obtained?',
      opts: ['64 small cubes', '16 small cubes', '27 small cubes', '36 small cubes'],
      exp: 'Along each edge fit `12 ÷ 3 = 4` smaller cubes. Total small cubes = `4 × 4 × 4 = 64`.',
    },
    mr: {
      q: '`12 सेमी` कडा असलेला एक लाकडी घन कापून त्यातून `3 सेमी` बाजूचे समान लहान घन तयार केले, तर एकूण किती लहान घन मिळतील?',
      opts: ['64 लहान घन', '16 लहान घन', '27 लहान घन', '36 लहान घन'],
      exp: 'एका बाजूत `12 ÷ 3 = 4` तुकडे बसतात. एकूण लहान घन = `4 × 4 × 4 = 64`.',
    },
    hi: {
      q: '`12 सेमी` किनारे वाले एक ठोस घन को काटकर `3 सेमी` भुजा वाले कितने छोटे समान घन बनाए जा सकते हैं?',
      opts: ['64 छोटे घन', '16 छोटे घन', '27 छोटे घन', '36 छोटे घन'],
      exp: '`(12 ÷ 3)³ = 4³ = 64` छोटे घन।',
    },
  },
  {
    topic: 'Number Logic Product & Sum Puzzle',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Two positive whole numbers have a sum of `17` and a product of `72`. What is the positive difference between these two numbers?',
      opts: ['1', '3', '5', '7'],
      exp: 'Numbers summing to `17` with product `72` are `8` and `9` (`8 + 9 = 17`, `8 × 9 = 72`). Difference = `9 − 8 = 1`.',
    },
    mr: {
      q: 'दोन नैसर्गिक संख्यांची बेरीज `17` आणि गुणाकार `72` आहे, तर त्या दोन संख्यांतील फरक किती?',
      opts: ['1', '3', '5', '7'],
      exp: 'त्या दोन संख्या `8` आणि `9` आहेत (`8 + 9 = 17`, `8 × 9 = 72`). फरक = `9 − 8 = 1`.',
    },
    hi: {
      q: 'दो पूर्ण संख्याओं का योग `17` और गुणनफल `72` है। उनके बीच अंतर कितना है?',
      opts: ['1', '3', '5', '7'],
      exp: 'संख्याएँ `8` और `9` हैं; अंतर = `9 − 8 = 1`।',
    },
  },
  {
    topic: 'Millilitres to Litres Fraction Sharing Punch Bowl',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Mother prepares `3.6 litres` of kokum sharbat and serves equal glasses of `180 ml` to festival guests. How many guests receive a glass?',
      opts: ['20 guests', '18 guests', '24 guests', '15 guests'],
      exp: '`3.6 L = 3,600 ml`. Guests = `3,600 ÷ 180 = 20`.',
    },
    mr: {
      q: 'आईने `3.6 लिटर` कोकम सरबत तयार केले आणि पाहुण्यांना प्रत्येकी `180 मिली` चा एक पेला दिला, तर किती पाहुण्यांना सरबत मिळेल?',
      opts: ['20 पाहुणे', '18 पाहुणे', '24 पाहुणे', '15 पाहुणे'],
      exp: '`3.6 लिटर = 3,600 मिली`. पेले = `3,600 ÷ 180 = 20`.',
    },
    hi: {
      q: '`3.6 लीटर` कोकम शरबत को `180 मिली` प्रति गिलास के हिसाब से कितने मेहमानों को परोसा जा सकता है?',
      opts: ['20 मेहमान', '18 मेहमान', '24 मेहमान', '15 मेहमान'],
      exp: '`3,600 ÷ 180 = 20` गिलास।',
    },
  },
  {
    topic: 'Polygons Interior Angle Sum Quadrilateral',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Three interior angles of a quadrilateral measure `85°`, `95°`, and `105°`. What is the measure of the fourth angle?',
      opts: ['75°', '85°', '65°', '90°'],
      exp: 'Quadrilateral interior angles sum to `360°`. Fourth angle = `360° − (85° + 95° + 105°) = 360° − 285° = 75°`.',
    },
    mr: {
      q: 'एका चौकोनाच्या तीन कोनांची मापे `85°, 95°` व `105°` आहेत, तर चौथ्या कोनाचे माप किती अंश असेल?',
      opts: ['75°', '85°', '65°', '90°'],
      exp: 'चौकोनाच्या चारही कोनांची बेरीज `360°`. चौथा कोन = `360° − 285° = 75°`.',
    },
    hi: {
      q: 'एक चतुर्भुज के तीन कोण `85°, 95°` और `105°` हैं। चौथे कोण की माप क्या होगी?',
      opts: ['75°', '85°', '65°', '90°'],
      exp: '`360° − (85° + 95° + 105°) = 360° − 285° = 75°`।',
    },
  },
  {
    topic: 'Train Crossing Platform / Bridge Distance Total',
    pattern: 'Problem Solving',
    difficulty: 'Difficult',
    en: {
      q: 'A cyclist rides across a straight `1.2 km` bridge at a steady speed of `12 km/hr`. How many minutes does the cyclist take to cross the bridge completely?',
      opts: ['6 minutes', '5 minutes', '10 minutes', '8 minutes'],
      exp: 'Time = `1.2 ÷ 12 = 0.1 hour = 0.1 × 60 = 6 minutes`.',
    },
    mr: {
      q: 'एक सायकलस्वार `12 किमी/तास` वेगाने `1.2 किमी` लांबीचा पूल ओलांडतो, तर त्याला पूल पार करण्यास किती मिनिटे लागतील?',
      opts: ['6 मिनिटे', '5 मिनिटे', '10 मिनिटे', '8 मिनिटे'],
      exp: 'वेळ = `1.2 ÷ 12 = 0.1 तास = 0.1 × 60 = 6 मिनिटे`.',
    },
    hi: {
      q: 'एक साइकिल चालक `12 किमी/घंटा` की गति से `1.2 किमी` लंबा पुल पार करता है। उसे कितने मिनट लगेंगे?',
      opts: ['6 मिनट', '5 मिनट', '10 मिनट', '8 मिनट'],
      exp: 'समय = `(1.2 ÷ 12) × 60 = 6 मिनट`।',
    },
  },
  {
    topic: 'Fractions Decimal Equivalence 7/8 & 3/20',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the decimal sum of `7/8 + 3/20`?',
      opts: ['1.025', '0.975', '1.125', '0.89'],
      exp: '`7/8 = 0.875` and `3/20 = 0.15`. Sum = `0.875 + 0.15 = 1.025`.',
    },
    mr: {
      q: '`7/8 + 3/20` ची दशांश रूपातील बेरीज किती येते?',
      opts: ['1.025', '0.975', '1.125', '0.89'],
      exp: '`7/8 = 0.875` आणि `3/20 = 0.15`. बेरीज = `0.875 + 0.15 = 1.025`.',
    },
    hi: {
      q: '`7/8 + 3/20` का दशमलव रूप में योग कितना होगा?',
      opts: ['1.025', '0.975', '1.125', '0.89'],
      exp: '`0.875 + 0.15 = 1.025`।',
    },
  },
  {
    topic: 'Expanded Form Indian Large Number Assembly',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Write the standard numeral for: `(6 × 1,00,000) + (4 × 10,000) + (7 × 100) + (9 × 1)`',
      opts: ['6,40,709', '6,47,009', '6,04,709', '6,40,079'],
      exp: 'Notice thousands (`1,000`) and tens (`10`) places are `0`: `6,40,709`.',
    },
    mr: {
      q: 'विस्तारित रूपावरून संख्या लिहा: `(6 × 1,00,000) + (4 × 10,000) + (7 × 100) + (9 × 1)`',
      opts: ['6,40,709', '6,47,009', '6,04,709', '6,40,079'],
      exp: 'हजार आणि दशक स्थानी शून्य असल्याने अचूक संख्या `6,40,709` मिळते.',
    },
    hi: {
      q: 'विस्तारित रूप से मानक संख्या लिखिए: `(6 × 1,00,000) + (4 × 10,000) + (7 × 100) + (9 × 1)`',
      opts: ['6,40,709', '6,47,009', '6,04,709', '6,40,079'],
      exp: 'हजार व दहाई के स्थान पर `0` होने से `6,40,709` प्राप्त होता है।',
    },
  },
  {
    topic: 'Remainder Cycle Calendar Birthday Shift',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If Independence Day (`15th August`) in a certain year falls on a Thursday, what day of the week will `2nd October` (Gandhi Jayanti) fall on in that exact same year?',
      opts: ['Wednesday', 'Thursday', 'Tuesday', 'Friday'],
      exp: 'Days after Aug 15 to Oct 2 = `16` (remaining Aug) `+ 30` (Sept) `+ 2` (Oct) = `48 days`. `48 ÷ 7 = 6` weeks + `6` days. Thursday + `6` days = Wednesday!',
    },
    mr: {
      q: 'एका वर्षी स्वातंत्र्य दिन (`15 ऑगस्ट`) गुरुवारी आला असेल, तर त्याच वर्षी महात्मा गांधी जयंती (`2 ऑक्टोबर`) कोणत्या वारी येईल?',
      opts: ['बुधवार', 'गुरुवार', 'मंगळवार', 'शुक्रवार'],
      exp: '`15 ऑगस्ट` ते `2 ऑक्टोबर` दरम्यान दिवस = `16 + 30 + 2 = 48` दिवस. `48 ÷ 7` बाकी `6`. गुरुवार + `6 दिवस` = बुधवार.',
    },
    hi: {
      q: 'यदि किसी वर्ष `15 अगस्त` गुरुवार को पड़ता है, तो उसी वर्ष `2 अक्टूबर` किस दिन पड़ेगा?',
      opts: ['बुधवार', 'गुरुवार', 'मंगलवार', 'शुक्रवार'],
      exp: 'कुल दिन = `16 + 30 + 2 = 48` दिन (`6` सप्ताह + `6` दिन शेष)। गुरुवार + `6` = बुधवार।',
    },
  },
  {
    topic: 'Missing Side in L-Shaped Perimeter Polygon',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'An L-shaped courtyard is formed by cutting a `4 m × 3 m` corner out of a full `10 m × 8 m` rectangle. What is the perimeter of the resulting L-shaped courtyard?',
      opts: ['36 m', '29 m', '32 m', '40 m'],
      exp: 'Cutting an inward corner pushes edges inward without changing total outer horizontal or vertical projections: perimeter stays `2 × (10 + 8) = 36 m`!',
    },
    mr: {
      q: '`10 मी × 8 मी` आयतातून एका कोपऱ्यावर `4 मी × 3 मी` भाग कापून काढून L-आकाराचे अंगण बनवले, तर तयार झालेल्या L-आकृतीची परिमिती किती?',
      opts: ['36 मी', '29 मी', '32 मी', '40 मी'],
      exp: 'कोपऱ्यातून कापल्यास आत जाणारे काठ बाहेरील रेषांएवढेच राहतात, म्हणून परिमिती मूळ आयताएवढीच `2 × (10 + 8) = 36 मी` राहते.',
    },
    hi: {
      q: '`10 मी × 8 मी` आयत के एक कोने से `4 मी × 3 मी` आयत काटकर L-आकार का आँगन बनाया गया। इस L-आकार का परिमाप कितना होगा?',
      opts: ['36 मी', '29 मी', '32 मी', '40 मी'],
      exp: 'कोने के अंदर कटने से भुजाओं का योग पूर्व आयत जितना ही `2 × (10 + 8) = 36 मी` रहता है।',
    },
  },
  {
    topic: 'Square Root Estimation Exact Floor Area',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A square assembly hall needs `784` equal square chairs placed in an equal number of rows and columns. How many chairs sit in each row?',
      opts: ['28 chairs', '26 chairs', '32 chairs', '24 chairs'],
      exp: 'Since `28 × 28 = 784`, each row has `28` chairs.',
    },
    mr: {
      q: 'एका चौरसाकृती सभागृहात समान रांगा व समान स्तंभांत मिळून `784` खुर्च्या मांडायच्या आहेत, तर प्रत्येक रांगेत किती खुर्च्या येतील?',
      opts: ['28 खुर्च्या', '26 खुर्च्या', '32 खुर्च्या', '24 खुर्च्या'],
      exp: '`√784 = 28` (`28 × 28 = 784`), म्हणून प्रत्येक रांगेत `28` खुर्च्या येतील.',
    },
    hi: {
      q: 'एक वर्गाकार सभागार में समान पंक्तियों और स्तंभों में `784` कुर्सियाँ लगानी हैं। प्रत्येक पंक्ति में कितनी कुर्सियाँ होंगी?',
      opts: ['28 कुर्सियाँ', '26 कुर्सियाँ', '32 कुर्सियाँ', '24 कुर्सियाँ'],
      exp: '`√784 = 28` कुर्सियाँ।',
    },
  },
  {
    topic: 'Multiples Common in Both 12 and 18 Range',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many positive numbers less than `150` are common multiples of BOTH `12` and `18`?',
      opts: ['4 numbers', '3 numbers', '5 numbers', '2 numbers'],
      exp: '`LCM(12, 18) = 36`. Multiples under `150` are `36, 72, 108, 144` — `4` numbers.',
    },
    mr: {
      q: '`150` पेक्षा लहान अशा किती संख्या आहेत ज्या `12` व `18` दोन्हीच्या सामायिक विभाज्य (पटीत) आहेत?',
      opts: ['4 संख्या', '3 संख्या', '5 संख्या', '2 संख्या'],
      exp: '`लसावि(12, 18) = 36`. `150` पेक्षा लहान पटीतील संख्या: `36, 72, 108, 144` अशा `4` संख्या आहेत.',
    },
    hi: {
      q: '`150` से छोटी ऐसी कितनी धनात्मक संख्याएँ हैं जो `12` तथा `18` दोनों की साझा गुणज हैं?',
      opts: ['4 संख्याएँ', '3 संख्याएँ', '5 संख्याएँ', '2 संख्याएँ'],
      exp: '`ल.स.(12,18) = 36` के गुणज: `36, 72, 108, 144` = `4` संख्याएँ।',
    },
  },
  {
    topic: 'Line Chart / Bar Graph Reading Total Difference',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school library attendance table records visitors across five days: Mon `42`, Tue `55`, Wed `38`, Thu `61`, Fri `49`. What is the difference between the daily average and Wednesday’s lowest count?',
      opts: ['11 visitors', '9 visitors', '13 visitors', '10 visitors'],
      exp: 'Total = `42 + 55 + 38 + 61 + 49 = 245`; Average = `245 ÷ 5 = 49`. Difference = `49 − 38 = 11`.',
    },
    mr: {
      q: 'ग्रंथालयात पाच दिवसांत आलेले विद्यार्थी: सोम `42`, मंगळ `55`, बुध `38`, गुरु `61`, शुक्र `49`. तर दैनंदिन सरासरी आणि बुधवारची सर्वात कमी उपस्थिती यांतील फरक किती?',
      opts: ['11 विद्यार्थी', '9 विद्यार्थी', '13 विद्यार्थी', '10 विद्यार्थी'],
      exp: 'एकूण `= 245`; सरासरी `= 245 ÷ 5 = 49`. फरक `= 49 − 38 = 11`.',
    },
    hi: {
      q: 'पुस्तकालय में सोम से शुक्र तक आगंतुक: `42, 55, 38, 61, 49`। दैनिक औसत और बुधवार की न्यूनतम संख्या में कितना अंतर है?',
      opts: ['11 आगंतुक', '9 आगंतुक', '13 आगंतुक', '10 आगंतुक'],
      exp: 'औसत = `245 ÷ 5 = 49`; अंतर = `49 − 38 = 11`।',
    },
  },
  {
    topic: 'Fractions Halfway Point Between Two Fractions',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'Which fraction lies exactly halfway between `1/3` and `1/2` on a number line?',
      opts: ['5/12', '2/5', '7/12', '1/4'],
      exp: 'Average = `(1/3 + 1/2) ÷ 2 = (5/6) ÷ 2 = 5/12`.',
    },
    mr: {
      q: 'संख्यारेषेवर `1/3` आणि `1/2` यांच्या बरोबर मध्यभागी कोणता अपूर्णांक येतो?',
      opts: ['5/12', '2/5', '7/12', '1/4'],
      exp: 'मध्यगा = `(1/3 + 1/2) ÷ 2 = (5/6) ÷ 2 = 5/12`.',
    },
    hi: {
      q: 'संख्या रेखा पर `1/3` और `1/2` के ठीक बीचोबीच कौन-सी भिन्न स्थित है?',
      opts: ['5/12', '2/5', '7/12', '1/4'],
      exp: '`(1/3 + 1/2) ÷ 2 = (5/6) ÷ 2 = 5/12`।',
    },
  },
  {
    topic: 'Discount Markdown Primary Sale Purchase',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A pair of rainboots marked at `₹450` is sold at a `20%` monsoon discount. What does a buyer pay for `2` pairs?',
      opts: ['₹720', '₹360', '₹810', '₹760'],
      exp: 'Each discounted pair = `450 − 20% of 450 = 450 − 90 = ₹360`. For 2 pairs = `2 × 360 = ₹720`.',
    },
    mr: {
      q: '`₹450` छापील किंमत असलेल्या पावसाळी बुटांच्या जोडीवर `20%` सूट दिल्यास अशा `2` जोड्या विकत घेण्यासाठी किती रुपये द्यावे लागतील?',
      opts: ['₹720', '₹360', '₹810', '₹760'],
      exp: 'एका जोडीची सूट = `450 × 20% = ₹90`, म्हणून विक्री किंमत = `₹360`. `2` जोड्या = `₹720`.',
    },
    hi: {
      q: '`₹450` अंकित मूल्य वाले जूतों पर `20%` छूट के बाद `2` जोड़ी खरीदने पर कुल कितने रुपये देने होंगे?',
      opts: ['₹720', '₹360', '₹810', '₹760'],
      exp: 'छूट के बाद 1 जोड़ी = `₹360`; `2` जोड़ी = `₹720`।',
    },
  },
  {
    topic: 'Co-Prime Numbers Definition & Pair Recognition',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which pair of numbers below is CO-PRIME (having `1` as their only common factor)?',
      opts: ['15 and 28', '18 and 27', '14 and 35', '21 and 33'],
      exp: '`HCF(15, 28) = 1` (`15 = 3×5`, `28 = 2²×7`), so they are co-prime (`18,27` share `9`; `14,35` share `7`; `21,33` share `3`).',
    },
    mr: {
      q: 'खालीलपैकी कोणती संख्याजोडी "सहमूळ संख्या" (Co-prime — सामायिक विभाजक फक्त `1`) आहे?',
      opts: ['15 आणि 28', '18 आणि 27', '14 आणि 35', '21 आणि 33'],
      exp: '`15` व `28` चा मसावि `1` आहे म्हणून ती सहमूळ जोडी आहे.',
    },
    hi: {
      q: 'निम्न में से कौन-सा युग्म "सह-अभाज्य" (Co-prime — म.स. `1`) है?',
      opts: ['15 और 28', '18 और 27', '14 और 35', '21 और 33'],
      exp: '`म.स.(15, 28) = 1` अतः यह सह-अभाज्य युग्म है।',
    },
  },
  {
    topic: 'Scale Map Drawing Distance Conversion',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'On a Maharashtra district map, the scale reads `1 cm = 15 km`. If two taluka towns sit `7.4 cm` apart on the map, what is the actual straight distance between them?',
      opts: ['111 km', '105 km', '114 km', '108 km'],
      exp: 'Actual distance = `7.4 × 15 = 111 km`.',
    },
    mr: {
      q: 'एका नकाशाचे प्रमाण `1 सेमी = 15 किमी` आहे. नकाशावर दोन गावांतील अंतर `7.4 सेमी` असल्यास त्यांच्यातील प्रत्यक्ष अंतर किती किमी आहे?',
      opts: ['111 किमी', '105 किमी', '114 किमी', '108 किमी'],
      exp: 'प्रत्यक्ष अंतर = `7.4 × 15 = 111 किमी`.',
    },
    hi: {
      q: 'एक मानचित्र पैमाना `1 सेमी = 15 किमी` दर्शाता है। मानचित्र पर `7.4 सेमी` दूर स्थित दो कस्बों के बीच वास्तविक दूरी क्या है?',
      opts: ['111 किमी', '105 किमी', '114 किमी', '108 किमी'],
      exp: '`7.4 × 15 = 111 किमी`।',
    },
  },
  {
    topic: 'Right Angle Rotations Compass Directions Turn',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Facing South-East, Aarav rotates `135°` clockwise. Which compass direction is he facing now?',
      opts: ['West', 'North-West', 'North', 'South-West'],
      exp: 'Clockwise from South-East: `45°` → South, `90°` → South-West, `135°` → West.',
    },
    mr: {
      q: 'आरव आग्नेय (South-East) दिशेकडे तोंड करून उभा आहे. तो घड्याळाच्या काट्याच्या दिशेने `135°` वळला, तर आता त्याचे तोंड कोणत्या दिशेकडे असेल?',
      opts: ['पश्चिम (West)', 'वायव्य', 'उत्तर', 'नैऋत्य'],
      exp: 'आग्नेय पासून घड्याळाच्या दिशेने `45°` दक्षिण, `90°` नैऋत्य, `135°` पश्चिम दिशा येते.',
    },
    hi: {
      q: 'आरव दक्षिण-पूर्व (आग्नेय) दिशा की ओर मुँह करके खड़ा है। घड़ी की दिशा में `135°` घूमने पर उसका मुँह किस दिशा में होगा?',
      opts: ['पश्चिम', 'उत्तर-पश्चिम', 'उत्तर', 'दक्षिण-पश्चिम'],
      exp: 'दक्षिण-पूर्व से `135°` दक्षिणावर्त घूमने पर पश्चिम दिशा आती है।',
    },
  },
  {
    topic: 'Multi-Digit Multiplication Distributive Shortcut',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Compute mentally using the distributive law: `(347 × 96) + (347 × 4)`',
      opts: ['34,700', '33,400', '34,070', '35,700'],
      exp: '`347 × (96 + 4) = 347 × 100 = 34,700`.',
    },
    mr: {
      q: 'वितरण नियमाचा वापर करून किंमत काढा: `(347 × 96) + (347 × 4)`',
      opts: ['34,700', '33,400', '34,070', '35,700'],
      exp: '`347 × (96 + 4) = 347 × 100 = 34,700`.',
    },
    hi: {
      q: 'वितरण नियम द्वारा मान ज्ञात कीजिए: `(347 × 96) + (347 × 4)`',
      opts: ['34,700', '33,400', '34,070', '35,700'],
      exp: '`347 × (96 + 4) = 347 × 100 = 34,700`।',
    },
  },
  {
    topic: 'Fractions Ordering Word Problem Pizza/Roti Share',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Four friends eat portions of identical bhakris: Sahil eats `5/8`, Tara eats `3/4`, Kabir eats `7/12`, and Diya eats `1/2`. Who ate the largest share?',
      opts: ['Tara (3/4)', 'Sahil (5/8)', 'Kabir (7/12)', 'Diya (1/2)'],
      exp: 'Using denominator `24`: Tara = `18/24`, Sahil = `15/24`, Kabir = `14/24`, Diya = `12/24`. Tara ate the most.',
    },
    mr: {
      q: 'चार मित्रांनी समान आकाराच्या भाकरीचे अनुक्रमे `5/8` (साहिल), `3/4` (तारा), `7/12` (कबीर) आणि `1/2` (दिया) भाग खाल्ले, तर कोणी सर्वाधिक भाग खाल्ला?',
      opts: ['तारा (3/4)', 'साहिल (5/8)', 'कबीर (7/12)', 'दिया (1/2)'],
      exp: 'समछेद 24 केल्यास तारा `18/24` हा सर्वाधिक भाग आहे.',
    },
    hi: {
      q: 'चार मित्रों ने समान भाकरी के क्रमशः `5/8` (साहिल), `3/4` (तारा), `7/12` (कबीर) व `1/2` (दीया) भाग खाए। सबसे अधिक हिस्सा किसने खाया?',
      opts: ['तारा (3/4)', 'साहिल (5/8)', 'कबीर (7/12)', 'दीया (1/2)'],
      exp: 'हर 24 बनाने पर तारा `18/24` सर्वाधिक है।',
    },
  },
  {
    topic: 'Roman Numerals Validation Invalid Form Identification',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following Roman numeral expressions is WRITEN INCORRECTLY according to standard subtractive rules?',
      opts: ['VC (intended for 95)', 'XCV (95)', 'XLIX (49)', 'CDL (450)'],
      exp: '`V`, `L`, and `D` are NEVER subtracted; `95` must be written `XCV` (`XC + V`), never `VC`.',
    },
    mr: {
      q: 'रोमन संख्यालेखनाच्या नियमानुसार खालीलपैकी कोणते लेखन *चुकीचे* आहे?',
      opts: ['VC (95 साठी चुकीचा प्रयोग)', 'XCV (95)', 'XLIX (49)', 'CDL (450)'],
      exp: '`V, L, D` ही चिन्हे कधीही वजाबाकीसाठी डावीकडे लिहीत नाहीत; `95` हे `XCV` असेच लिहावे.',
    },
    hi: {
      q: 'रोमन संख्यांक नियम के अनुसार इनमें से कौन-सा रूप *गलत* लिखा गया है?',
      opts: ['VC (95 हेतु अमान्य)', 'XCV (95)', 'XLIX (49)', 'CDL (450)'],
      exp: '`V, L, D` को कभी घटाने हेतु बाईं ओर नहीं लिखा जाता; `95 = XCV` होता है।',
    },
  },
];
