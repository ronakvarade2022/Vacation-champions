import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 7 (28 verified trilingual MCQs: 4-Wall Area, Divisibility, Patterns, Mirror Clock, Mensuration)
export const MAHA_TET_P1_B3_MATH_C7: CuratedTrilingualMcq[] = [
  {
    topic: 'Lateral Surface Area of Four Classroom Walls',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A classroom is 9 m long, 7 m wide, and 4 m high. What is the combined area of its FOUR vertical walls (excluding floor and ceiling)?',
      opts: ['128 sq m', '63 sq m', '252 sq m', '112 sq m'],
      exp: 'Area of 4 walls = 2 × height × (length + breadth) = 2 × 4 × (9 + 7) = 8 × 16 = 128 sq m.',
    },
    mr: {
      q: 'एका वर्गखोलीची लांबी ९ मी, रुंदी ७ मी आणि उंची ४ मी आहे, तर फक्त तिच्या चार उभ्या भिंतींचे एकूण क्षेत्रफळ किती?',
      opts: ['१२८ चौ.मी.', '६३ चौ.मी.', '२५२ चौ.मी.', '११२ चौ.मी.'],
      exp: 'चार भिंतींचे क्षेत्रफळ = २ × उंची × (लांबी + रुंदी) = २ × ४ × (९ + ७) = १२८ चौ.मी.',
    },
    hi: {
      q: 'एक कक्षा 9 मी लंबी, 7 मी चौड़ी और 4 मी ऊँची है। उसकी चारों खड़ी दीवारों (फर्श व छत छोड़कर) का कुल क्षेत्रफल क्या है?',
      opts: ['128 वर्ग मी', '63 वर्ग मी', '252 वर्ग मी', '112 वर्ग मी'],
      exp: 'चारों दीवारों का क्षेत्रफल = 2 × ऊँचाई × (लंबाई + चौड़ाई) = 2 × 4 × 16 = 128 वर्ग मी।',
    },
  },
  {
    topic: 'Combined Divisibility by 8 and 5',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following 5-digit numbers is completely divisible by BOTH 8 and 5?',
      opts: ['43,520', '43,540', '43,510', '43,525'],
      exp: 'Must end in 0 (for 5 and even) and have last three digits divisible by 8: 520 ÷ 8 = 65 exact.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या ५-अंकी संख्येला ८ आणि ५ या दोन्ही संख्यांनी निःशेष भाग जातो?',
      opts: ['४३,५२०', '४३,५४०', '४३,५१०', '४३,५२५'],
      exp: 'शेवटी ० असणे आवश्यक आणि शेवटच्या तीन अंकांना ८ ने भाग जायला हवा: ५२० ÷ ८ = ६५.',
    },
    hi: {
      q: 'निम्न में से कौन-सी 5-अंकीय संख्या 8 और 5 दोनों से पूर्णतः विभाज्य है?',
      opts: ['43,520', '43,540', '43,510', '43,525'],
      exp: 'अंत में 0 तथा अंतिम तीन अंक 520, 8 से विभाज्य हैं (520 ÷ 8 = 65)।',
    },
  },
  {
    topic: 'Least Equal Length Using Two Measuring Rods',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Two wooden measuring sticks are 0.75 m and 1.20 m long. What is the SHORTEST rope length that can be measured an exact whole number of times by EACH stick?',
      opts: ['6 m', '3 m', '9 m', '4.8 m'],
      exp: 'Convert to cm: 75 cm and 120 cm. LCM(75, 120) = 600 cm = 6 m.',
    },
    mr: {
      q: '०.७५ मी आणि १.२० मी लांबीच्या दोन मोजपट्ट्यांनी जिचे पूर्णांक मोजमाप अचूक करता येईल अशी सर्वांत लहान दोरी किती मीटरची असेल?',
      opts: ['६ मी', '३ मी', '९ मी', '४.८ मी'],
      exp: '७५ सेमी व १२० सेमी यांचा लसावि = ६०० सेमी = ६ मी.',
    },
    hi: {
      q: '0.75 मी और 1.20 मी लंबी दो छड़ियों से बिना किसी शेष के ठीक-ठीक नापी जा सकने वाली सबसे छोटी रस्सी की लंबाई क्या होगी?',
      opts: ['6 मी', '3 मी', '9 मी', '4.8 मी'],
      exp: '75 सेमी व 120 सेमी का ल.स. = 600 सेमी = 6 मी।',
    },
  },
  {
    topic: 'Greatest 6-Digit Multiple of 125',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'What is the GREATEST 6-digit number divisible by 125?',
      opts: ['9,99,875', '9,99,925', '9,99,750', '9,99,975'],
      exp: '10,00,000 is divisible by 125 (last 3 digits 000). Subtract 125: 10,00,000 − 125 = 9,99,875.',
    },
    mr: {
      q: '१२५ ने निःशेष भाग जाणारी सर्वांत मोठी ६-अंकी संख्या कोणती?',
      opts: ['९,९९,८७५', '९,९९,९२५', '९,९९,७५०', '९,९९,९७५'],
      exp: '१०,००,००० − १२५ = ९,९९,८७५.',
    },
    hi: {
      q: '125 से पूर्णतः विभाज्य सबसे बड़ी 6-अंकीय संख्या कौन-सी है?',
      opts: ['9,99,875', '9,99,925', '9,99,750', '9,99,975'],
      exp: '10,00,000 − 125 = 9,99,875.',
    },
  },
  {
    topic: 'Sum of All Factors of Thirty',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum of ALL positive factors of 30 (including 1 and 30).',
      opts: ['72', '42', '60', '71'],
      exp: 'Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30. Sum = 1+2+3+5+6+10+15+30 = 72.',
    },
    mr: {
      q: '३० या संख्येच्या सर्व विभाजकांची (१ आणि ३० सह) बेरीज किती?',
      opts: ['७२', '४२', '६०', '७१'],
      exp: 'विभाजक: १, २, ३, ५, ६, १०, १५, ३० -> बेरीज = ७२.',
    },
    hi: {
      q: '30 के सभी धनात्मक गुणनखंडों (1 और 30 सहित) का योगफल कितना होगा?',
      opts: ['72', '42', '60', '71'],
      exp: 'गुणनखंड: 1+2+3+5+6+10+15+30 = 72.',
    },
  },
  {
    topic: 'Decimal Difference Scaled Multiplication',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate: (14.25 − 9.85) × 1,000 ÷ 20 =',
      opts: ['220', '22', '240', '210'],
      exp: '14.25 − 9.85 = 4.40; 4.40 × 1,000 = 4,400; 4,400 ÷ 20 = 220.',
    },
    mr: {
      q: 'पदावली सोडवा: (१४.२५ − ९.८५) × १,००० ÷ २० =',
      opts: ['२२०', '२२', '२४०', '२१०'],
      exp: '४.४० × ५० = २२०.',
    },
    hi: {
      q: 'मान निकालिए: (14.25 − 9.85) × 1,000 ÷ 20 =',
      opts: ['220', '22', '240', '210'],
      exp: '4.40 × 1,000 ÷ 20 = 4,400 ÷ 20 = 220.',
    },
  },
  {
    topic: 'Pocket Money Fractions Spending Balance',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Asha spends 1/3 of her pocket money on crayons, 1/4 on notebooks, and saves the remaining ₹35. How much pocket money did she start with?',
      opts: ['₹84', '₹72', '₹96', '₹60'],
      exp: 'Spent = 1/3 + 1/4 = 7/12; saved fraction = 5/12 = ₹35. Total = (35 ÷ 5) × 12 = ₹84.',
    },
    mr: {
      q: 'आशाने तिच्या खाऊच्या पैशांतील १/३ खडूवर व १/४ वह्यांवर खर्च करून उरलेले ₹३५ वाचवले, तर तिच्याकडे सुरुवातीला एकूण किती रुपये होते?',
      opts: ['₹८४', '₹७२', '₹९६', '₹६०'],
      exp: 'खर्च = १/३ + १/४ = ७/१२; शिल्लक ५/१२ = ₹३५ -> एकूण = (३५ ÷ ५) × १२ = ₹८४.',
    },
    hi: {
      q: 'आशा अपनी जेब-खर्च का 1/3 रंगों पर, 1/4 कॉपियों पर खर्च करके शेष ₹35 बचा लेती है। उसके पास शुरुआत में कितने रुपये थे?',
      opts: ['₹84', '₹72', '₹96', '₹60'],
      exp: 'खर्च = 7/12; बचत = 5/12 = ₹35; कुल राशि = (35÷5)×12 = ₹84.',
    },
  },
  {
    topic: 'Total Squares on 3x3 Grid',
    pattern: 'Visual Reasoning',
    difficulty: 'Moderate',
    en: {
      q: 'How many squares of ALL sizes (1×1, 2×2, and 3×3) exist in a 3 × 3 square grid?',
      opts: ['14', '9', '13', '10'],
      exp: '1×1 squares = 9; 2×2 squares = 4; 3×3 square = 1. Total = 9 + 4 + 1 = 14.',
    },
    mr: {
      q: '३ × ३ च्या चौरसाकृती जाळीत सर्व आकारांचे (१×१, २×२ व ३×३) एकूण किती चौरस असतात?',
      opts: ['१४', '९', '१३', '१०'],
      exp: '९ + ४ + १ = १४ चौरस.',
    },
    hi: {
      q: '3 × 3 की वर्गाकार जाली में सभी आकारों (1×1, 2×2 और 3×3) के कुल कितने वर्ग बनते हैं?',
      opts: ['14', '9', '13', '10'],
      exp: '3² + 2² + 1² = 9 + 4 + 1 = 14 वर्ग।',
    },
  },
  {
    topic: 'Multiplier Swap Deficit Deduction',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil accidentally multiplied a number by 35 instead of 53 and obtained a product that was 324 LESS than the correct answer. Find the number.',
      opts: ['18', '16', '24', '14'],
      exp: '(53 − 35) × N = 324 -> 18N = 324 -> N = 324 ÷ 18 = 18.',
    },
    mr: {
      q: 'एका विद्यार्थ्याने एका संख्येला ५३ ऐवजी चुकून ३५ ने गुणल्यामुळे बरोबर उत्तरापेक्षा ३२४ कमी उत्तर आले, तर ती संख्या कोणती?',
      opts: ['१८', '१६', '२४', '१४'],
      exp: '(५३ − ३५) × संख्या = ३२४ -> १८ × संख्या = ३२४ -> संख्या = १८.',
    },
    hi: {
      q: 'एक छात्र ने किसी संख्या को 53 के बजाय गलती से 35 से गुणा कर दिया, जिससे सही उत्तर से 324 कम आया। वह संख्या क्या है?',
      opts: ['18', '16', '24', '14'],
      exp: '(53 − 35) × N = 324 -> 18N = 324 -> N = 18.',
    },
  },
  {
    topic: 'Vertical Mirror Clock Reflection Time',
    pattern: 'Visual Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'An analog wall clock without digits shows 03:25. What time does it appear to show when viewed in a vertical plane mirror?',
      opts: ['08:35', '09:35', '08:25', '09:25'],
      exp: 'Subtract from 11:60: 11:60 − 03:25 = 08:35.',
    },
    mr: {
      q: 'अंक नसलेल्या घड्याळात ०३:२५ वाजले असता समोरच्या आरशात त्याची प्रतिमा किती वाजल्याचे दाखवेल?',
      opts: ['०८:३५', '०९:३५', '०८:२५', '०९:२५'],
      exp: '११:६० − ०३:२५ = ०८:३५.',
    },
    hi: {
      q: 'बिना अंकों वाली दीवार घड़ी में 03:25 बजा है। ऊर्ध्वाधर समतल दर्पण में देखने पर उसमें क्या समय दिखाई देगा?',
      opts: ['08:35', '09:35', '08:25', '09:25'],
      exp: '11:60 − 03:25 = 08:35.',
    },
  },
  {
    topic: 'Joining Two Squares Edge-to-Edge Perimeter',
    pattern: 'Visual Reasoning',
    difficulty: 'Moderate',
    en: {
      q: 'Two identical square tiles, each having an area of 49 sq cm, are placed side-by-side touching along a full edge to make a rectangle. What is the perimeter of this combined rectangle?',
      opts: ['42 cm', '56 cm', '49 cm', '35 cm'],
      exp: 'Each square side = 7 cm. Joined rectangle is 14 cm × 7 cm. Perimeter = 2(14 + 7) = 42 cm.',
    },
    mr: {
      q: 'प्रत्येकी ४९ चौ.सेमी. क्षेत्रफळाच्या दोन समान चौरसाकृती फरश्या कडेला कड जोडून शेजारी ठेवल्यास तयार होणाऱ्या आयताची परिमिती किती?',
      opts: ['४२ सेमी', '५६ सेमी', '४९ सेमी', '३५ सेमी'],
      exp: 'बाजू = ७ सेमी -> आयत १४ सेमी × ७ सेमी -> परिमिती = २(१४ + ७) = ४२ सेमी.',
    },
    hi: {
      q: '49 वर्ग सेमी क्षेत्रफल वाली दो समान वर्गाकार टाइलों को किनारा सटाकर रखने पर एक आयत बनता है। इस आयत का परिमाप कितना होगा?',
      opts: ['42 सेमी', '56 सेमी', '49 सेमी', '35 सेमी'],
      exp: 'भुजा = 7 सेमी; आयत = 14 × 7 सेमी; परिमाप = 2(14+7) = 42 सेमी।',
    },
  },
  {
    topic: 'Mango Pulp Jug Serving Remainder',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A pitcher holds 3.25 litres of mango pulp. After filling 15 glasses of 180 ml each, how many millilitres remain in the pitcher?',
      opts: ['550 ml', '450 ml', '650 ml', '500 ml'],
      exp: '3.25 L = 3,250 ml. Served = 15 × 180 = 2,700 ml. Remaining = 3,250 − 2,700 = 550 ml.',
    },
    mr: {
      q: 'एका जगमध्ये ३.२५ लिटर आमरस आहे. त्यातून प्रत्येकी १८० मिली क्षमतेचे १५ ग्लास भरल्यास जगमध्ये किती मिली आमरस शिल्लक राहील?',
      opts: ['५५० मिली', '४५० मिली', '६५० मिली', '५०० मिली'],
      exp: '३,२५० − (१५ × १८०) = ३,२५० − २,७०० = ५५० मिली.',
    },
    hi: {
      q: 'एक जग में 3.25 लीटर आम का रस है। 180 मिली वाले 15 गिलास भरने के बाद जग में कितना रस शेष बचेगा?',
      opts: ['550 मिली', '450 मिली', '650 मिली', '500 मिली'],
      exp: '3,250 − (15 × 180) = 3,250 − 2,700 = 550 मिली।',
    },
  },
  {
    topic: 'Area Ratio of Two Squares',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Square A has perimeter 36 cm and Square B has side 3 cm. Find the ratio of the Area of Square A to the Area of Square B.',
      opts: ['9 : 1', '3 : 1', '12 : 1', '6 : 1'],
      exp: 'Side A = 36÷4 = 9 cm (Area 81 sq cm); Area B = 3² = 9 sq cm. Ratio = 81 : 9 = 9 : 1.',
    },
    mr: {
      q: 'चौरस अ ची परिमिती ३६ सेमी असून चौरस ब ची बाजू ३ सेमी आहे, तर चौरस अ व चौरस ब यांच्या क्षेत्रफळांचे गुणोत्तर किती?',
      opts: ['९ : १', '३ : १', '१२ : १', '६ : १'],
      exp: 'अ चे क्षेत्रफळ = ९² = ८१; ब चे क्षेत्रफळ = ३² = ९. गुणोत्तर = ८१ : ९ = ९ : १.',
    },
    hi: {
      q: 'वर्ग A का परिमाप 36 सेमी है और वर्ग B की भुजा 3 सेमी है। वर्ग A और वर्ग B के क्षेत्रफलों का अनुपात क्या है?',
      opts: ['9 : 1', '3 : 1', '12 : 1', '6 : 1'],
      exp: 'A क्षेत्रफल = 9² = 81, B = 3² = 9; अनुपात = 81 : 9 = 9 : 1.',
    },
  },
  {
    topic: 'Quarter-Rupee Coins Equivalent to Total Rupees',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'How many 25-paise coins together make ₹17.50?',
      opts: ['70', '68', '75', '64'],
      exp: 'Four 25-paise coins = ₹1. Thus 17.50 × 4 = 70 coins.',
    },
    mr: {
      q: '२५ पैशांची एकूण किती नाणी एकत्र केल्यास ₹१७.५० होतील?',
      opts: ['७०', '६८', '७५', '६४'],
      exp: '१ रुपयात ४ नाणी, म्हणून १७.५० × ४ = ७० नाणी.',
    },
    hi: {
      q: '25 पैसे के कितने सिक्के मिलकर ₹17.50 बनाएँगे?',
      opts: ['70', '68', '75', '64'],
      exp: '₹1 में 4 सिक्के, अतः 17.50 × 4 = 70 सिक्के।',
    },
  },
  {
    topic: 'Selling Price for Targeted Profit Percent',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A shopkeeper buys a table fan for ₹1,650. At what price must he sell it to earn a 20% profit?',
      opts: ['₹1,980', '₹1,950', '₹1,850', '₹2,020'],
      exp: '20% of 1,650 = ₹330. Selling Price = 1,650 + 330 = ₹1,980.',
    },
    mr: {
      q: 'एका दुकानदाराने ₹१,६५० ला एक पंखा खरेदी केला. २०% नफा मिळवण्यासाठी त्याने तो किती रुपयांना विकावा?',
      opts: ['₹१,९८०', '₹१,९५०', '₹१,८५०', '₹२,०२०'],
      exp: '१,६५० चे २०% = ₹३३०; विक्री किंमत = १,६५० + ३३० = ₹१,९८०.',
    },
    hi: {
      q: 'एक दुकानदार ने ₹1,650 में एक पंखा खरीदा। 20% लाभ कमाने के लिए उसे पंखा किस मूल्य पर बेचना चाहिए?',
      opts: ['₹1,980', '₹1,950', '₹1,850', '₹2,020'],
      exp: '1,650 का 20% = ₹330; विक्रय मूल्य = 1,650 + 330 = ₹1,980.',
    },
  },
  {
    topic: 'Roman Numeral Subtraction Large Values',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the result in Roman numerals: MCD − CML =',
      opts: ['CDL', 'DL', 'CDXL', 'D'],
      exp: 'MCD = 1,400 and CML = 950. 1,400 − 950 = 450 = CDL.',
    },
    mr: {
      q: 'रोमन संख्यांत उत्तर शोधा: MCD − CML =',
      opts: ['CDL', 'DL', 'CDXL', 'D'],
      exp: 'MCD = १,४०० व CML = ९५०; वजाबाकी = ४५० = CDL.',
    },
    hi: {
      q: 'रोमन अंकों में मान ज्ञात कीजिए: MCD − CML =',
      opts: ['CDL', 'DL', 'CDXL', 'D'],
      exp: 'MCD = 1,400 और CML = 950; 1,400 − 950 = 450 = CDL.',
    },
  },
  {
    topic: 'Sum of Three Distinct Prime Factors',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'The product of three distinct prime numbers is 165. What is their SUM?',
      opts: ['19', '21', '17', '23'],
      exp: '165 = 3 × 5 × 11. Sum = 3 + 5 + 11 = 19.',
    },
    mr: {
      q: 'तीन भिन्न मूळ संख्यांचा गुणाकार १६५ आहे, तर त्या तीनही मूळ संख्यांची बेरीज किती?',
      opts: ['१९', '२१', '१७', '२३'],
      exp: '१६५ = ३ × ५ × ११; बेरीज = ३ + ५ + ११ = १९.',
    },
    hi: {
      q: 'तीन अलग-अलग अभाज्य संख्याओं का गुणनफल 165 है। उनका योगफल कितना है?',
      opts: ['19', '21', '17', '23'],
      exp: '165 = 3 × 5 × 11; योग = 3 + 5 + 11 = 19.',
    },
  },
  {
    topic: 'Fractional Hours to Hours & Minutes',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Express 2 3/5 hours in hours and minutes.',
      opts: ['2 hours 36 minutes', '2 hours 40 minutes', '2 hours 24 minutes', '2 hours 35 minutes'],
      exp: '(3/5) × 60 minutes = 36 minutes -> 2 hours 36 minutes.',
    },
    mr: {
      q: '२ ३/५ तास म्हणजे किती तास व किती मिनिटे?',
      opts: ['२ तास ३६ मिनिटे', '२ तास ४० मिनिटे', '२ तास २४ मिनिटे', '२ तास ३५ मिनिटे'],
      exp: '(३/५) × ६० = ३६ मिनिटे -> २ तास ३६ मिनिटे.',
    },
    hi: {
      q: '2 3/5 घंटे को घंटे और मिनट में बदलिए।',
      opts: ['2 घंटे 36 मिनट', '2 घंटे 40 मिनट', '2 घंटे 24 मिनट', '2 घंटे 35 मिनट'],
      exp: '(3/5) × 60 = 36 मिनट, अतः 2 घंटे 36 मिनट।',
    },
  },
  {
    topic: 'Second Heaviest Mass Comparison',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Four sacks weigh 2.08 kg, 2,800 g, 2 kg 85 g, and 2.18 kg. Which sack is the SECOND HEAVIEST?',
      opts: ['2.18 kg', '2,800 g', '2 kg 85 g', '2.08 kg'],
      exp: 'Convert to grams: 2,080 g < 2,085 g < 2,180 g < 2,800 g. Second heaviest = 2.18 kg.',
    },
    mr: {
      q: 'चार पिशव्यांची वजने २.०८ किग्रॅ, २,८०० ग्रॅ, २ किग्रॅ ८५ ग्रॅ व २.१८ किग्रॅ आहेत, तर वजनाने दुसऱ्या क्रमांकाची जड पिशवी कोणती?',
      opts: ['२.१८ किग्रॅ', '२,८०० ग्रॅ', '२ किग्रॅ ८५ ग्रॅ', '२.०८ किग्रॅ'],
      exp: 'ग्रॅममध्ये: २,०८० < २,०८५ < २,१८० < २,८००. दुसरी जड = २.१८ किग्रॅ.',
    },
    hi: {
      q: 'चार बोरियों के भार 2.08 किग्रा, 2,800 ग्रा, 2 किग्रा 85 ग्रा और 2.18 किग्रा हैं। इनमें दूसरी सबसे भारी बोरी कौन-सी है?',
      opts: ['2.18 किग्रा', '2,800 ग्रा', '2 किग्रा 85 ग्रा', '2.08 किग्रा'],
      exp: '2,080 ग्रा < 2,085 ग्रा < 2,180 ग्रा < 2,800 ग्रा; दूसरी सबसे भारी = 2.18 किग्रा।',
    },
  },
  {
    topic: 'Exterior Angle of Regular Octagon',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What is the measure of EACH exterior angle of a regular 8-sided octagon?',
      opts: ['45°', '60°', '40°', '36°'],
      exp: 'Sum of exterior angles of any convex polygon = 360°. Each exterior angle = 360° ÷ 8 = 45°.',
    },
    mr: {
      q: 'एका सुसम अष्टकोनाच्या (Regular Octagon) प्रत्येक बाह्य कोनाचे माप किती अंश असते?',
      opts: ['४५°', '६०°', '४०°', '३६°'],
      exp: 'कोणत्याही बहुभुजाकृतीच्या बाह्य कोनांची बेरीज ३६०° असते; ३६०° ÷ ८ = ४५°.',
    },
    hi: {
      q: 'एक सम अष्टभुज (Regular Octagon) के प्रत्येक बाह्य कोण की माप कितनी होती है?',
      opts: ['45°', '60°', '40°', '36°'],
      exp: 'सभी बाह्य कोणों का योग 360° होता है; 360° ÷ 8 = 45°.',
    },
  },
  {
    topic: 'Lines of Symmetry of Regular Hexagon',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many total lines of reflection symmetry does a regular hexagon have?',
      opts: ['6', '3', '4', '12'],
      exp: 'A regular polygon with n sides has n lines of symmetry; a regular hexagon has 6 (3 through opposite vertices, 3 through opposite midpoints).',
    },
    mr: {
      q: 'सुसम षटकोनाला एकूण किती सममिती अक्ष (Lines of symmetry) असतात?',
      opts: ['६', '३', '४', '१२'],
      exp: 'सुसम षटकोनाला ६ सममिती अक्ष असतात.',
    },
    hi: {
      q: 'एक समषट्भुज में कुल कितनी सममिति रेखाएँ (Lines of symmetry) होती हैं?',
      opts: ['6', '3', '4', '12'],
      exp: 'समषट्भुज में कुल 6 सममिति रेखाएँ होती हैं।',
    },
  },
  {
    topic: 'Cutting Rectangular Cards From Chart Sheet',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'How many rectangular index cards of size 6 cm × 4 cm can be cleanly cut from a 30 cm × 20 cm chart sheet?',
      opts: ['25', '20', '30', '24'],
      exp: '(30 ÷ 6) × (20 ÷ 4) = 5 × 5 = 25 cards.',
    },
    mr: {
      q: '३० सेमी × २० सेमी तक्त्याच्या कागदातून ६ सेमी × ४ सेमी मापाची किती आयताकृती कार्ड्स कापता येतील?',
      opts: ['२५', '२०', '३०', '२४'],
      exp: '(३० ÷ ६) × (२० ÷ ४) = ५ × ५ = २५ कार्ड्स.',
    },
    hi: {
      q: '30 सेमी × 20 सेमी की चार्ट शीट से 6 सेमी × 4 सेमी माप के कितने आयताकार कार्ड काटे जा सकते हैं?',
      opts: ['25', '20', '30', '24'],
      exp: '(30 ÷ 6) × (20 ÷ 4) = 5 × 5 = 25 कार्ड।',
    },
  },
  {
    topic: 'Common Multiple of 9 and 10 in Range',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the ONLY whole number strictly between 500 and 600 that is divisible by BOTH 9 and 10.',
      opts: ['540', '550', '549', '580'],
      exp: 'LCM(9, 10) = 90. Multiples of 90: 450, 540, 630. Only 540 lies between 500 and 600.',
    },
    mr: {
      q: '५०० ते ६०० च्या दरम्यान असलेली ९ आणि १० या दोन्ही संख्यांनी भाग जाणारी एकमेव संख्या कोणती?',
      opts: ['५४०', '५५०', '५४९', '५८०'],
      exp: 'लसावि(९, १०) = ९०; ९० × ६ = ५४०.',
    },
    hi: {
      q: '500 और 600 के ठीक बीच स्थित वह एकमात्र पूर्ण संख्या कौन-सी है जो 9 और 10 दोनों से विभाज्य है?',
      opts: ['540', '550', '549', '580'],
      exp: 'ल.स.(9, 10) = 90; 90 × 6 = 540.',
    },
  },
  {
    topic: 'Direct Proportion Auto-Rickshaw Fare',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'An auto-rickshaw charges ₹135 for a 9 km ride. At this constant rate, what will a 16 km ride cost?',
      opts: ['₹240', '₹225', '₹255', '₹210'],
      exp: 'Rate = 135 ÷ 9 = ₹15/km. For 16 km: 16 × ₹15 = ₹240.',
    },
    mr: {
      q: 'एका रिक्षाचे ९ किमी प्रवासाचे भाडे ₹१३५ आहे, तर त्याच दराने १६ किमी प्रवासाचे भाडे किती होईल?',
      opts: ['₹२४०', '₹२२५', '₹२५५', '₹२१०'],
      exp: 'दर = १३५ ÷ ९ = ₹१५/किमी; १६ × १५ = ₹२४०.',
    },
    hi: {
      q: 'एक ऑटो-रिक्शा 9 किमी का किराया ₹135 लेता है। इसी दर से 16 किमी की सवारी का किराया कितना होगा?',
      opts: ['₹240', '₹225', '₹255', '₹210'],
      exp: 'प्रति किमी दर = 135 ÷ 9 = ₹15; 16 × 15 = ₹240.',
    },
  },
  {
    topic: 'Subtracting Sum From Product',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Subtract the sum of 38 and 47 from the product of 24 and 15.',
      opts: ['275', '285', '265', '295'],
      exp: '(24 × 15) − (38 + 47) = 360 − 85 = 275.',
    },
    mr: {
      q: '२४ व १५ यांच्या गुणाकारातून ३८ व ४७ यांची बेरीज वजा केल्यास उत्तर किती येईल?',
      opts: ['२७५', '२८५', '२६५', '२९५'],
      exp: '३६० − ८५ = २७५.',
    },
    hi: {
      q: '24 और 15 के गुणनफल में से 38 और 47 का योग घटाइए।',
      opts: ['275', '285', '265', '295'],
      exp: '360 − 85 = 275.',
    },
  },
  {
    topic: 'Mean of First Five Multiples of Nine',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'What is the average (mean) of the first five positive multiples of 9?',
      opts: ['27', '18', '36', '22.5'],
      exp: 'Multiples: 9, 18, 27, 36, 45. Middle/mean = 135 ÷ 5 = 27.',
    },
    mr: {
      q: '९ च्या पहिल्या पाच धनात्मक पटींची सरासरी किती?',
      opts: ['२७', '१८', '३६', '२२.५'],
      exp: '९, १८, २७, ३६, ४५ यांची सरासरी = मधली संख्या = २७.',
    },
    hi: {
      q: '9 के प्रथम पाँच धनात्मक गुणजों का औसत क्या है?',
      opts: ['27', '18', '36', '22.5'],
      exp: '9, 18, 27, 36, 45 का औसत = 135 ÷ 5 = 27.',
    },
  },
  {
    topic: 'Volume Ratio When Cube Edge Doubles',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Cube A has edge 6 cm and Cube B has edge 3 cm. The volume of Cube A is how many times the volume of Cube B?',
      opts: ['8 times', '2 times', '4 times', '6 times'],
      exp: '6³ ÷ 3³ = 216 ÷ 27 = 8 times.',
    },
    mr: {
      q: 'घन अ ची बाजू ६ सेमी आणि घन ब ची बाजू ३ सेमी आहे, तर घन अ चे घनफळ घन ब च्या घनफळाच्या किती पट आहे?',
      opts: ['८ पट', '२ पट', '४ पट', '६ पट'],
      exp: '२१६ ÷ २७ = ८ पट.',
    },
    hi: {
      q: 'घन A की भुजा 6 सेमी तथा घन B की भुजा 3 सेमी है। घन A का आयतन घन B के आयतन का कितना गुना है?',
      opts: ['8 गुना', '2 गुना', '4 गुना', '6 गुना'],
      exp: '216 ÷ 27 = 8 गुना।',
    },
  },
  {
    topic: 'Past-to-Future Sum of Two Sisters Ages',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Three years ago, the sum of the ages of two sisters was 19 years. What will be the sum of their ages 4 years from NOW?',
      opts: ['33 years', '29 years', '26 years', '31 years'],
      exp: 'Each sister grew +3 years to reach now (present sum = 19 + 6 = 25), and each will grow +4 years in 4 years (25 + 8 = 33 years).',
    },
    mr: {
      q: 'तीन वर्षांपूर्वी दोन बहिणींच्या वयाची बेरीज १९ वर्षे होती, तर आजपासून ४ वर्षांनंतर त्यांच्या वयाची बेरीज किती असेल?',
      opts: ['३३ वर्षे', '२९ वर्षे', '२६ वर्षे', '३१ वर्षे'],
      exp: 'आजची बेरीज = १९ + (३×२) = २५; ४ वर्षांनंतर = २५ + (४×२) = ३३ वर्षे.',
    },
    hi: {
      q: 'तीन वर्ष पहले दो बहनों की आयु का योग 19 वर्ष था। अब से 4 वर्ष बाद उनकी आयु का योग कितना होगा?',
      opts: ['33 वर्ष', '29 वर्ष', '26 वर्ष', '31 वर्ष'],
      exp: 'वर्तमान योग = 19 + 6 = 25; 4 वर्ष बाद = 25 + 8 = 33 वर्ष।',
    },
  },
];
