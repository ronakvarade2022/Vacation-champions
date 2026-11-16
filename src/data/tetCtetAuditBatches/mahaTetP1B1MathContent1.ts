import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 1 (35 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C1: CuratedTrilingualMcq[] = [
  {
    topic: 'Number System – Largest & Smallest 5-Digit Formation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Using the digits 4, 0, 7, 1, and 9 each exactly once, find the difference between the greatest and the smallest valid 5-digit numbers formed.',
      opts: ['86,931', '86,941', '96,471', '87,319'],
      exp: 'Greatest = 97,410; Smallest valid 5-digit = 10,479 (0 cannot lead). Difference = 97,410 − 10,479 = 86,931.',
    },
    mr: {
      q: '४, ०, ७, १ आणि ९ हे अंक प्रत्येक एकदाच वापरून तयार होणारी सर्वात मोठी आणि सर्वात लहान ५-अंकी संख्या यांतील फरक किती?',
      opts: ['86,931', '86,941', '96,471', '87,319'],
      exp: 'सर्वात मोठी = ९७,४१०; सर्वात लहान ५-अंकी = १०,४७९. फरक = ९७,४१० − १०,४७९ = ८६,९३१.',
    },
    hi: {
      q: 'अंक ४, ०, ७, १ और ९ में से प्रत्येक का केवल एक बार उपयोग करके बनने वाली सबसे बड़ी तथा सबसे छोटी ५-अंकीय संख्या का अंतर क्या है?',
      opts: ['86,931', '86,941', '96,471', '87,319'],
      exp: 'सबसे बड़ी = ९७,४१०; सबसे छोटी = १०,४७९। अंतर = ९७,४१० − १०,४७९ = ८६,९३१।',
    },
  },
  {
    topic: 'Roman Numerals Arithmetic',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'What is the Hindu-Arabic value of the Roman expression: XCIV + XLIX − XXXVIII?',
      opts: ['105', '115', '95', '123'],
      exp: 'XCIV = 94, XLIX = 49, XXXVIII = 38. Thus 94 + 49 − 38 = 143 − 38 = 105.',
    },
    mr: {
      q: 'XCIV + XLIX − XXXVIII या रोमन संख्यात्मक मांडणीची दशमान किंमत किती?',
      opts: ['105', '115', '95', '123'],
      exp: 'XCIV = ९४, XLIX = ४९, XXXVIII = ३८. म्हणून ९४ + ४९ − ३८ = १०५.',
    },
    hi: {
      q: 'रोमन संख्यात्मक व्यंजक XCIV + XLIX − XXXVIII का मान ज्ञात कीजिए।',
      opts: ['105', '115', '95', '123'],
      exp: 'XCIV = ९४, XLIX = ४९, XXXVIII = ३८। अतः ९४ + ४९ − ३८ = १०५।',
    },
  },
  {
    topic: 'Division Algorithm Remainder Bound',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'When a certain number N is divided by 18, the quotient is 24 and the remainder is the largest possible whole number allowed. Find N.',
      opts: ['449', '432', '450', '448'],
      exp: 'Largest possible remainder when dividing by 18 is 18 − 1 = 17. Hence N = (18 × 24) + 17 = 432 + 17 = 449.',
    },
    mr: {
      q: 'एका संख्येस १८ ने भागल्यास भागाकार २४ येतो व बाकी शक्य तितकी सर्वात मोठी उरते, तर ती संख्या कोणती?',
      opts: ['449', '432', '450', '448'],
      exp: '१८ ने भागताना सर्वात मोठी शक्य बाकी १७ असते. म्हणून भाज्य = (१८ × २४) + १७ = ४३२ + १७ = ४४९.',
    },
    hi: {
      q: 'एक संख्या को १८ से भाग देने पर भागफल २४ तथा शेषफल अधिकतम संभव पूर्ण संख्या प्राप्त होता है। वह संख्या क्या है?',
      opts: ['449', '432', '450', '448'],
      exp: '१८ से विभाजन में अधिकतम संभव शेष १७ है। संख्या = (१८ × २४) + १७ = ४४९।',
    },
  },
  {
    topic: 'Clock Angle Problem',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'What is the smaller angle formed between the hour hand and the minute hand of a clock when the time is exactly 4:00 PM?',
      opts: ['120°', '90°', '150°', '105°'],
      exp: 'Each hour mark represents 360° ÷ 12 = 30°. At 4:00, the hands span 4 hour intervals = 4 × 30° = 120°.',
    },
    mr: {
      q: 'दुपारी ठीक ४:०० वाजता घड्याळाचा तास काटा व मिनिट काटा यांमध्ये तयार होणारा लहान कोन किती अंशांचा असतो?',
      opts: ['120°', '90°', '150°', '105°'],
      exp: 'प्रत्येक तासाचे अंतर ३०° असते. ४ वाजता ४ × ३०° = १२०° कोन तयार होतो.',
    },
    hi: {
      q: 'शाम ठीक ४:०० बजे घड़ी की घंटे और मिनट की सुइयों के बीच बनने वाला छोटा कोण कितने अंश का होता है?',
      opts: ['120°', '90°', '150°', '105°'],
      exp: 'प्रत्येक घंटे के बीच ३०° होता है। ४ बजे = ४ × ३०° = १२०°।',
    },
  },
  {
    topic: 'Fractions – Sum of Unit Fractions / Remaining Part',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Meena reads 2/5 of a storybook on Monday and 1/4 of the SAME book on Tuesday. What fraction of the book remains unread?',
      opts: ['7/20', '3/9', '13/20', '9/20'],
      exp: 'Read = 2/5 + 1/4 = (8 + 5)/20 = 13/20. Unread = 1 − 13/20 = 7/20.',
    },
    mr: {
      q: 'मीनाने सोमवारी एका पुस्तकाचा २/५ भाग आणि मंगळवारी १/४ भाग वाचला. तर त्या पुस्तकाचा किती भाग वाचायचा बाकी राहिला?',
      opts: ['7/20', '3/9', '13/20', '9/20'],
      exp: 'वाचलेला भाग = २/५ + १/४ = १३/२०. बाकी भाग = १ − १३/२० = ७/२०.',
    },
    hi: {
      q: 'मीना ने सोमवार को एक पुस्तक का २/५ भाग तथा मंगलवार को १/४ भाग पढ़ा। पुस्तक का कितना भाग शेष है?',
      opts: ['7/20', '3/9', '13/20', '9/20'],
      exp: 'पढ़ा गया भाग = २/५ + १/४ = १३/२०। शेष = १ − १३/२० = ७/२०।',
    },
  },
  {
    topic: 'Indian vs International Place Value Equivalence',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many lakhs make 10 Million in the International System of Numeration?',
      opts: ['100 lakhs', '10 lakhs', '1,000 lakhs', '1 lakh'],
      exp: '1 Million = 10 lakhs, so 10 Million = 10 × 10 lakhs = 100 lakhs (1 Crore).',
    },
    mr: {
      q: 'आंतरराष्ट्रीय संख्यालेखन पद्धतीतील "१० दशलक्ष" (10 Million) म्हणजे भारतीय पद्धतीनुसार किती लक्ष होतात?',
      opts: ['100 lakhs', '10 lakhs', '1,000 lakhs', '1 lakh'],
      exp: '१ मिलियन = १० लाख, म्हणून १० मिलियन = १०० लाख (१ कोटी).',
    },
    hi: {
      q: 'अंतर्राष्ट्रीय संख्या प्रणाली के "१० मिलियन" भारतीय प्रणाली के कितने लाख के बराबर होते हैं?',
      opts: ['100 lakhs', '10 lakhs', '1,000 lakhs', '1 lakh'],
      exp: '१ मिलियन = १० लाख, अतः १० मिलियन = १०० लाख।',
    },
  },
  {
    topic: '2D Geometry – Cube Faces, Edges & Vertices',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If F, E, and V represent the number of faces, edges, and vertices of a solid cube respectively, find the value of (F + V − E).',
      opts: ['2', '4', '0', '6'],
      exp: 'A cube has F = 6 faces, V = 8 vertices, E = 12 edges. By Euler’s formula: 6 + 8 − 12 = 2.',
    },
    mr: {
      q: 'एका भरीव घनाचे पृष्ठभाग (F), कडा (E) आणि शिरोबिंदू (V) अनुक्रमे मोजून (F + V − E) ची किंमत काढा.',
      opts: ['2', '4', '0', '6'],
      exp: 'घनाला ६ पृष्ठे, ८ शिरोबिंदू व १२ कडा असतात. ६ + ८ − १२ = २.',
    },
    hi: {
      q: 'एक ठोस घन के फलक (F), किनारे (E) और शीर्ष (V) क्रमशः गिनकर (F + V − E) का मान निकालिए।',
      opts: ['2', '4', '0', '6'],
      exp: 'घन में F = ६, V = ८, E = १२ होते हैं। ६ + ८ − १२ = २।',
    },
  },
  {
    topic: 'Decimal Operations in Shopping Context',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Ritu buys a geometry box for ₹68.75 and two sketch pens costing ₹14.50 each. How much change should she get back from a ₹200 note?',
      opts: ['₹102.25', '₹116.75', '₹97.75', '₹103.25'],
      exp: 'Total spent = 68.75 + 2(14.50) = 68.75 + 29.00 = ₹97.75. Change = 200.00 − 97.75 = ₹102.25.',
    },
    mr: {
      q: 'रितूने ₹६८.७५ चे कंपास बॉक्स आणि प्रत्येकी ₹१४.५० किमतीचे दोन स्केचपेन घेतले. ₹२०० ची नोट दिल्यास तिला किती रुपये परत मिळतील?',
      opts: ['₹102.25', '₹116.75', '₹97.75', '₹103.25'],
      exp: 'एकूण खर्च = ६८.७५ + २९.०० = ₹९७.७५. परत = २०० − ९७.७५ = ₹१०२.२५.',
    },
    hi: {
      q: 'रितु ने ₹६८.७५ का ज्योमेट्री बॉक्स और ₹१४.५० प्रति नग वाले दो स्केच पेन खरीदे। ₹२०० देने पर उसे कितने रुपये वापस मिलेंगे?',
      opts: ['₹102.25', '₹116.75', '₹97.75', '₹103.25'],
      exp: 'कुल खर्च = ६८.७५ + २९.०० = ₹९७.७५। शेष राशि = २०० − ९७.७५ = ₹१०२.२५।',
    },
  },
  {
    topic: 'Prime Factorization & Number of Factors',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following numbers has the GREATEST number of distinct factors: 24, 30, 35, or 36?',
      opts: ['36', '24', '30', '35'],
      exp: 'Factors of 36: {1,2,3,4,6,9,12,18,36} = 9 factors. (24 has 8; 30 has 8; 35 has 4).',
    },
    mr: {
      q: '२४, ३०, ३५ आणि ३६ यांपैकी कोणत्या संख्येचे एकूण विभाजक (Factors) सर्वात जास्त आहेत?',
      opts: ['36', '24', '30', '35'],
      exp: '३६ चे विभाजक: १, २, ३, ४, ६, ९, १२, १८, ३६ असे एकूण ९ आहेत (२४ व ३० चे ८; ३५ चे ४).',
    },
    hi: {
      q: '२४, ३०, ३५ तथा ३६ में से किस संख्या के गुणनखंडों (विभाजकों) की संख्या सर्वाधिक है?',
      opts: ['36', '24', '30', '35'],
      exp: '३६ के कुल ९ गुणनखंड हैं (१,२,३,४,६,९,१२,१८,३६), जबकि २४ और ३० के ८ तथा ३५ के ४ हैं।',
    },
  },
  {
    topic: 'Calendar Day-of-Week Arithmetic',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'If Republic Day (26th January) in a non-leap year falls on a Wednesday, what day of the week will 15th August fall on in the SAME year?',
      opts: ['Monday', 'Sunday', 'Tuesday', 'Saturday'],
      exp: 'Days after Jan 26 to Aug 15 (non-leap): Jan(5)+Feb(28)+Mar(31)+Apr(30)+May(31)+Jun(30)+Jul(31)+Aug(15) = 201 days. 201 mod 7 = 5 odd days. Wed + 5 days = Monday.',
    },
    mr: {
      q: 'एका सामान्य (लीप नसलेल्या) वर्षी २६ जानेवारी बुधवारी आल्यास त्याच वर्षी १५ ऑगस्ट कोणत्या वारी येईल?',
      opts: ['Monday', 'Sunday', 'Tuesday', 'Saturday'],
      exp: '२६ जानेवारी ते १५ ऑगस्ट = २०१ दिवस (२८ आठवडे + ५ बाकी दिवस). बुधवार + ५ = सोमवार.',
    },
    hi: {
      q: 'एक साधारण वर्ष में यदि २६ जनवरी बुधवार को है, तो उसी वर्ष १५ अगस्त किस दिन पड़ेगा?',
      opts: ['Monday', 'Sunday', 'Tuesday', 'Saturday'],
      exp: '२६ जनवरी से १५ अगस्त तक २०१ दिन = ५ विषम दिन। बुधवार + ५ = सोमवार।',
    },
  },
  {
    topic: 'Area Remaining After Square Corner Cutout',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'From a rectangular sheet 18 cm long and 12 cm wide, a square of side 5 cm is cut out from the middle. What is the area of the remaining sheet?',
      opts: ['191 cm²', '216 cm²', '166 cm²', '144 cm²'],
      exp: 'Rectangle area = 18 × 12 = 216 cm². Square area = 5 × 5 = 25 cm². Remaining = 216 − 25 = 191 cm².',
    },
    mr: {
      q: '१८ सेमी लांब व १२ सेमी रुंद आयताकृती कागदाच्या मध्यातून ५ सेमी बाजूचा चौरस कापून काढल्यास उरलेल्या भागाचे क्षेत्रफळ किती?',
      opts: ['191 cm²', '216 cm²', '166 cm²', '144 cm²'],
      exp: 'आयत क्षेत्रफळ = १८ × १२ = २१६ चौ.सेमी; चौरस = २५ चौ.सेमी. बाकी = २१६ − २५ = १९१ चौ.सेमी.',
    },
    hi: {
      q: '१८ सेमी लंबे व १२ सेमी चौड़े आयताकार कागज के बीच से ५ सेमी भुजा का वर्ग काटने पर शेष क्षेत्रफल क्या होगा?',
      opts: ['191 cm²', '216 cm²', '166 cm²', '144 cm²'],
      exp: 'आयत का क्षेत्रफल = २१६ वर्ग सेमी; वर्ग = २५। शेष = २१६ − २५ = १९१ वर्ग सेमी।',
    },
  },
  {
    topic: 'Fence Posts Interval Puzzle',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'School saplings are planted in a straight row along a 45-metre path at equal gaps of 5 metres, including one at BOTH ends. How many saplings are needed in total?',
      opts: ['10', '9', '8', '11'],
      exp: 'Number of gaps = 45 ÷ 5 = 9 gaps. Because saplings sit at both ends, count = 9 + 1 = 10 saplings.',
    },
    mr: {
      q: '४५ मीटर लांब सरळ रस्त्याच्या कडेने दोन्ही टोकांना धरून दर ५ मीटर अंतरावर एक रोप लावायचे असल्यास एकूण किती रोपे लागतील?',
      opts: ['10', '9', '8', '11'],
      exp: 'अंतरे = ४५ ÷ ५ = ९. दोन्ही टोकांसह रोपांची संख्या = ९ + १ = १०.',
    },
    hi: {
      q: '४५ मीटर सीधी सड़क के किनारे दोनों सिरों सहित हर ५ मीटर पर एक पौधा लगाना हो, तो कुल कितने पौधे चाहिए?',
      opts: ['10', '9', '8', '11'],
      exp: 'अंतराल = ४५ ÷ ५ = ९। दोनों सिरों सहित संख्या = ९ + १ = १०।',
    },
  },
  {
    topic: 'Symmetry Lines in Regular Polygons',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which letter among the English capitals H, N, S, and Z possesses BOTH horizontal and vertical lines of mirror symmetry?',
      opts: ['H', 'N', 'S', 'Z'],
      exp: 'Capital H folds symmetrically both horizontally and vertically; N, S, and Z have rotational symmetry (order 2) but zero mirror lines.',
    },
    mr: {
      q: 'H, N, S आणि Z या मोठ्या इंग्रजी अक्षरांपैकी कोणत्या अक्षराला आडवी व उभी असे दोन्ही सममिती अक्ष (Lines of Symmetry) असतात?',
      opts: ['H', 'N', 'S', 'Z'],
      exp: 'फक्त H या अक्षरास आडवी व उभी दोन्ही सममिती रेषा असतात.',
    },
    hi: {
      q: 'अंग्रेजी अक्षर H, N, S और Z में से किसमें क्षैतिज तथा ऊर्ध्वाधर दोनों सममिति रेखाएँ (Lines of Symmetry) होती हैं?',
      opts: ['H', 'N', 'S', 'Z'],
      exp: 'केवल अक्षर H में क्षैतिज व ऊर्ध्वाधर दोनों दर्पण सममिति रेखाएँ पाई जाती हैं।',
    },
  },
  {
    topic: 'Capacity – Sharing Litres into Millilitre Cups',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A canteen vessel holds 4 litres 500 mL of buttermilk. How many 150 mL glasses can be filled completely from it?',
      opts: ['30 glasses', '25 glasses', '45 glasses', '35 glasses'],
      exp: '4 L 500 mL = 4,500 mL. Number of glasses = 4,500 ÷ 150 = 30.',
    },
    mr: {
      q: 'एका भांड्यात ४ लिटर ५०० मिलि ताक आहे. त्यापासून प्रत्येकी १५० मिलि मापाचे किती पेले पूर्ण भरतील?',
      opts: ['30 glasses', '25 glasses', '45 glasses', '35 glasses'],
      exp: '४,५०० मिलि ÷ १५० मिलि = ३० पेले.',
    },
    hi: {
      q: 'एक बर्तन में ४ लीटर ५०० मिली छाछ है। इसमें से १५० मिली के कितने गिलास पूरे भरे जा सकते हैं?',
      opts: ['30 glasses', '25 glasses', '45 glasses', '35 glasses'],
      exp: '४,५०० मिली ÷ १५० मिली = ३० गिलास।',
    },
  },
  {
    topic: 'Divisibility Test for 9 & 3 Combined',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Find the smallest digit * that makes the 5-digit number 47*83 completely divisible by 9.',
      opts: ['5', '2', '8', '4'],
      exp: 'Sum of digits = 4 + 7 + * + 8 + 3 = 22 + *. Next multiple of 9 above 22 is 27, so * = 27 − 22 = 5.',
    },
    mr: {
      q: '४७*८३ ही ५-अंकी संख्या ९ ने नि:शेष भाग जाण्यासाठी * च्या जागी कोणता अंक असावा?',
      opts: ['5', '2', '8', '4'],
      exp: 'अंकांची बेरीज = ४ + ७ + ८ + ३ + * = २२ + *. ९ च्या पटीत २७ येण्यासाठी * = ५.',
    },
    hi: {
      q: '५-अंकीय संख्या ४७*८३ को ९ से पूर्णतः विभाजित करने के लिए * के स्थान पर कौन-सा अंक आएगा?',
      opts: ['5', '2', '8', '4'],
      exp: 'अंकों का योग = २२ + *। ९ का अगला गुणज २७ है, अतः * = ५।',
    },
  },
  {
    topic: 'Unitary Method – Speed, Distance & Time',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A school bus travels 180 km at a uniform speed in 3 hours. At this same speed, how long will it take to cover 300 km?',
      opts: ['5 hours', '4 hours', '6 hours', '4 hours 30 minutes'],
      exp: 'Speed = 180 ÷ 3 = 60 km/h. Time for 300 km = 300 ÷ 60 = 5 hours.',
    },
    mr: {
      q: 'एक शालेय बस ३ तासांत समान वेगाने १८० किमी अंतर जाते. त्याच वेगाने ३०० किमी अंतर पार करण्यास किती तास लागतील?',
      opts: ['5 hours', '4 hours', '6 hours', '4 hours 30 minutes'],
      exp: 'वेग = १८० ÷ ३ = ६० किमी/तास. वेळ = ३०० ÷ ६० = ५ तास.',
    },
    hi: {
      q: 'एक बस समान चाल से ३ घंटे में १८० किमी चलती है। इसी चाल से ३०० किमी तय करने में कितना समय लगेगा?',
      opts: ['5 hours', '4 hours', '6 hours', '4 hours 30 minutes'],
      exp: 'चाल = १८० ÷ ३ = ६० किमी/घंटा। समय = ३०० ÷ ६० = ५ घंटे।',
    },
  },
  {
    topic: 'Fractional Value of Units (Hours & Dozen)',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Calculate the sum in minutes: (2/3 of an hour) + (3/4 of an hour).',
      opts: ['85 minutes', '75 minutes', '95 minutes', '65 minutes'],
      exp: '2/3 × 60 = 40 min; 3/4 × 60 = 45 min. Sum = 40 + 45 = 85 minutes.',
    },
    mr: {
      q: 'मिनिटांत बेरीज काढा: (एका तासाचा २/३ भाग) + (एका तासाचा ३/४ भाग) = ?',
      opts: ['85 minutes', '75 minutes', '95 minutes', '65 minutes'],
      exp: '२/३ × ६० = ४० मिनिटे; ३/४ × ६० = ४५ मिनिटे. एकूण = ८५ मिनिटे.',
    },
    hi: {
      q: 'मिनटों में मान निकालिए: (१ घंटे का २/३) + (१ घंटे का ३/४) = ?',
      opts: ['85 minutes', '75 minutes', '95 minutes', '65 minutes'],
      exp: '४० मिनट + ४५ मिनट = ८५ मिनट।',
    },
  },
  {
    topic: 'HCF (GCD) Greatest Packet Sizing',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Two ropes of lengths 42 m and 63 m must be cut into equal pieces of maximum possible whole-metre length with nothing left over. What should each piece measure?',
      opts: ['21 m', '7 m', '14 m', '9 m'],
      exp: 'HCF(42, 63): 42 = 21 × 2 and 63 = 21 × 3, so maximum equal length = 21 m.',
    },
    mr: {
      q: '४२ मी व ६३ मी लांबीचे दोन दोरखंड उरले न राहता समान व जास्तीत जास्त लांबीच्या तुकड्यांत कापायचे असल्यास प्रत्येक तुकड्याची लांबी किती असावी?',
      opts: ['21 m', '7 m', '14 m', '9 m'],
      exp: 'मसावि(४२, ६३) = २१ मीटर.',
    },
    hi: {
      q: '४२ मी और ६३ मी लंबी दो रस्सियों को बिना शेष बचे अधिकतम समान लंबाई के टुकड़ों में काटना है। प्रत्येक टुकड़े की लंबाई कितनी होगी?',
      opts: ['21 m', '7 m', '14 m', '9 m'],
      exp: 'म.स.(४२, ६३) = २१ मीटर।',
    },
  },
  {
    topic: 'Pattern Sequence – Triangular Numbers',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Find the missing 6th term in the triangular dot pattern: 1, 3, 6, 10, 15, ___, 28.',
      opts: ['21', '20', '22', '24'],
      exp: 'Differences grow by +1 each step (+2, +3, +4, +5, +6). So 15 + 6 = 21 (check: 21 + 7 = 28).',
    },
    mr: {
      q: '१, ३, ६, १०, १५, ___, २८ या त्रिकोणी संख्या मालिकेतील गाळलेली सहावी संख्या ओळखा.',
      opts: ['21', '20', '22', '24'],
      exp: 'फरक अनुक्रमे +२, +३, +४, +५ असा वाढत जातो. म्हणून १५ + ६ = २१.',
    },
    hi: {
      q: 'त्रिभुजाकार संख्या श्रृंखला १, ३, ६, १०, १५, ___, २८ में लुप्त पद ज्ञात कीजिए।',
      opts: ['21', '20', '22', '24'],
      exp: 'अंतर +२, +३, +४, +५, +६ बढ़ता है; अतः १५ + ६ = २१।',
    },
  },
  {
    topic: 'Perimeter Comparison – Wire Re-bending',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A copper wire bent into a square encloses an area of 144 cm². If the same wire is straightened and bent into an equilateral triangle, what is each side of the triangle?',
      opts: ['16 cm', '12 cm', '18 cm', '24 cm'],
      exp: 'Square area = 144 ⇒ side = 12 cm ⇒ wire length (perimeter) = 4 × 12 = 48 cm. Triangle side = 48 ÷ 3 = 16 cm.',
    },
    mr: {
      q: 'तांब्याच्या तारेपासून बनवलेल्या एका चौरसाचे क्षेत्रफळ १४४ चौ.सेमी आहे. तीच तार सरळ करून समभुज त्रिकोण बनवल्यास त्रिकोणाची प्रत्येक बाजू किती सेमी असेल?',
      opts: ['16 cm', '12 cm', '18 cm', '24 cm'],
      exp: 'चौरस बाजू = १२ सेमी ⇒ एकूण तार = ४८ सेमी. समभुज त्रिकोण बाजू = ४८ ÷ ३ = १६ सेमी.',
    },
    hi: {
      q: 'एक तार से बने वर्ग का क्षेत्रफल १४४ वर्ग सेमी है। उसी तार को समबाहु त्रिभुज में मोड़ने पर उसकी प्रत्येक भुजा क्या होगी?',
      opts: ['16 cm', '12 cm', '18 cm', '24 cm'],
      exp: 'वर्ग भुजा = १२ सेमी ⇒ परिमाप = ४८ सेमी। त्रिभुज भुजा = ४८ ÷ ३ = १६ सेमी।',
    },
  },
  {
    topic: 'BODMAS / Order of Operations',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate accurately: 48 ÷ 6 × 2 + 10 − 3.',
      opts: ['23', '11', '19', '39'],
      exp: 'Left-to-right ×/÷ first: 48 ÷ 6 = 8; 8 × 2 = 16. Then 16 + 10 − 3 = 23.',
    },
    mr: {
      q: 'अचूक किंमत काढा: ४८ ÷ ६ × २ + १० − ३ = ?',
      opts: ['23', '11', '19', '39'],
      exp: 'डावीकडून उजवीकडे भागाकार-गुणाकार आधी: (४८ ÷ ६) × २ = १६; १६ + १० − ३ = २३.',
    },
    hi: {
      q: 'सही मान ज्ञात कीजिए: ४८ ÷ ६ × २ + १० − ३ = ?',
      opts: ['23', '11', '19', '39'],
      exp: '(४८ ÷ ६) × २ = १६; १६ + १० − ३ = २३।',
    },
  },
  {
    topic: 'Number Properties – Twin Primes Below 50',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many pairs of Twin Primes (prime numbers differing by 2, such as 3 and 5) exist between 1 and 50?',
      opts: ['6 pairs', '4 pairs', '8 pairs', '5 pairs'],
      exp: 'Twin prime pairs ≤ 50: (3,5), (5,7), (11,13), (17,19), (29,31), (41,43) -> exactly 6 pairs.',
    },
    mr: {
      q: '१ ते ५० दरम्यान एकूण किती जोडमूळ संख्यांच्या (Twin Primes) जोड्या आहेत?',
      opts: ['6 pairs', '4 pairs', '8 pairs', '5 pairs'],
      exp: '(३,५), (५,७), (११,१३), (१७,१९), (२९,३१), (४१,४३) अशा एकूण ६ जोडमूळ जोड्या आहेत.',
    },
    hi: {
      q: '१ से ५० के बीच जुड़वा अभाज्य संख्याओं (Twin Primes) के कितने युग्म होते हैं?',
      opts: ['6 pairs', '4 pairs', '8 pairs', '5 pairs'],
      exp: '(३,५), (५,७), (११,१३), (१७,१९), (२९,३१), (४१,४३) — कुल ६ युग्म।',
    },
  },
  {
    topic: 'Percentage Introduction – Passing Marks Calculation',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Out of 40 saplings planted in a school courtyard, 85% survived through summer. How many saplings dried up?',
      opts: ['6', '34', '8', '15'],
      exp: 'Survived = 85% of 40 = (85 × 40)/100 = 34. Dried up = 40 − 34 = 6 saplings.',
    },
    mr: {
      q: 'शाळेच्या आवारात लावलेल्या ४० रोपांपैकी ८५% रोपे उन्हाळ्यात जगली. तर किती रोपे सुकून गेली?',
      opts: ['6', '34', '8', '15'],
      exp: 'जगलेली रोपे = ४० चे ८५% = ३४. सुकलेली = ४० − ३४ = ६.',
    },
    hi: {
      q: 'विद्यालय में लगाए ४० पौधों में से ८५% जीवित रहे। कितने पौधे सूख गए?',
      opts: ['6', '34', '8', '15'],
      exp: 'जीवित = ३४; सूखे पौधे = ४० − ३४ = ६।',
    },
  },
  {
    topic: '24-Hour to 12-Hour Duration Midnight Crossover',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'An overnight Konkan express leaves Mumbai at 21:45 hours and reaches Ratnagiri at 04:20 hours next morning. What is the journey duration?',
      opts: ['6 hours 35 minutes', '7 hours 25 minutes', '5 hours 35 minutes', '6 hours 25 minutes'],
      exp: 'From 21:45 to 24:00 = 2 h 15 min. Add 04:20 -> 2 h 15 m + 4 h 20 m = 6 h 35 min.',
    },
    mr: {
      q: 'एक रेल्वे मुंबईहून रात्री २१:४५ वाजता सुटून दुसऱ्या दिवशी पहाटे ०४:२० वाजता रत्नागिरीला पोहोचते. प्रवासाचा एकूण कालावधी किती?',
      opts: ['6 hours 35 minutes', '7 hours 25 minutes', '5 hours 35 minutes', '6 hours 25 minutes'],
      exp: '२१:४५ ते २४:०० = २ तास १५ मिनिटे; पुढे ४ तास २० मिनिटे. एकूण = ६ तास ३५ मिनिटे.',
    },
    hi: {
      q: 'एक रात्रि ट्रेन २१:४५ बजे मुंबई से चलकर अगली सुबह ०४:२० बजे रत्नागिरी पहुँचती है। यात्रा अवधि कितनी है?',
      opts: ['6 hours 35 minutes', '7 hours 25 minutes', '5 hours 35 minutes', '6 hours 25 minutes'],
      exp: '२ घं १५ मि + ४ घं २० मि = ६ घंटे ३५ मिनट।',
    },
  },
  {
    topic: 'Comparing Fractions Without Cross-Multiplying Error',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Arrange these four fractions in STRICTLY ascending order: 5/6, 7/12, 2/3, 3/4.',
      opts: ['7/12 < 2/3 < 3/4 < 5/6', '2/3 < 7/12 < 3/4 < 5/6', '7/12 < 3/4 < 2/3 < 5/6', '5/6 < 3/4 < 2/3 < 7/12'],
      exp: 'Convert to common denominator 12: 7/12, 2/3 = 8/12, 3/4 = 9/12, 5/6 = 10/12. Ascending: 7/12 < 2/3 < 3/4 < 5/6.',
    },
    mr: {
      q: '५/६, ७/१२, २/३ आणि ३/४ हे अपूर्णांक चढत्या क्रमाने (लहान कडून मोठ्याकडे) लावा.',
      opts: ['7/12 < 2/3 < 3/4 < 5/6', '2/3 < 7/12 < 3/4 < 5/6', '7/12 < 3/4 < 2/3 < 5/6', '5/6 < 3/4 < 2/3 < 7/12'],
      exp: 'छेद १२ समछेद करून: ७/१२, ८/१२, ९/१२, १०/१२ ⇒ ७/१२ < २/३ < ३/४ < ५/६.',
    },
    hi: {
      q: '५/६, ७/१२, २/३ और ३/४ को आरोही (बढ़ते) क्रम में सजाएँ।',
      opts: ['7/12 < 2/3 < 3/4 < 5/6', '2/3 < 7/12 < 3/4 < 5/6', '7/12 < 3/4 < 2/3 < 5/6', '5/6 < 3/4 < 2/3 < 7/12'],
      exp: 'हर १२ करने पर: ७/१२ < ८/१२ < ९/१२ < १०/१२।',
    },
  },
  {
    topic: 'Currency Note Splitting Problem',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Asha has 6 notes of ₹500, 14 notes of ₹100, and 15 coins of ₹2. How much total money does she possess?',
      opts: ['₹4,430', '₹4,415', '₹4,330', '₹4,530'],
      exp: '(6 × 500) + (14 × 100) + (15 × 2) = 3,000 + 1,400 + 30 = ₹4,430.',
    },
    mr: {
      q: 'आशाजवळ ₹५०० च्या ६ नोटा, ₹१०० च्या १४ नोटा व ₹२ ची १५ नाणी आहेत. तिच्याकडे एकूण किती रुपये आहेत?',
      opts: ['₹4,430', '₹4,415', '₹4,330', '₹4,530'],
      exp: '३,००० + १,४०० + ३० = ₹४,४३०.',
    },
    hi: {
      q: 'आशा के पास ₹५०० के ६ नोट, ₹१०० के १४ नोट और ₹२ के १५ सिक्के हैं। उसके पास कुल कितने रुपये हैं?',
      opts: ['₹4,430', '₹4,415', '₹4,330', '₹4,530'],
      exp: '३,००० + १,४०० + ३० = ₹४,४३०।',
    },
  },
  {
    topic: 'Data Handling – Pictograph Key Value',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In a class library pictograph, 1 book icon represents 12 books. If "Science Corner" displays 5 full icons and half an icon, how many Science books are there?',
      opts: ['66 books', '60 books', '55 books', '72 books'],
      exp: '(5 × 12) + (0.5 × 12) = 60 + 6 = 66 books.',
    },
    mr: {
      q: 'चित्रालेखात १ पुस्तकाचे चित्र = १२ पुस्तके असे प्रमाण आहे. "विज्ञान कोपरा" समोर ५ पूर्ण व १ अर्धे चित्र असल्यास एकूण विज्ञान पुस्तके किती?',
      opts: ['66 books', '60 books', '55 books', '72 books'],
      exp: '(५ × १२) + ६ = ६६ पुस्तके.',
    },
    hi: {
      q: 'चित्रालेख में १ पुस्तक चित्र = १२ पुस्तकें हैं। यदि विज्ञान खंड के सामने ५ पूरे व १ आधा चित्र हो, तो कुल कितनी पुस्तकें हैं?',
      opts: ['66 books', '60 books', '55 books', '72 books'],
      exp: '६० + ६ = ६६ पुस्तकें।',
    },
  },
  {
    topic: 'Square Floor Tiling Count',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'How many square marble tiles of side 40 cm are required to pave a square hall floor of side 4 metres?',
      opts: ['100 tiles', '10 tiles', '40 tiles', '160 tiles'],
      exp: 'Floor side = 4 m = 400 cm; area = 400 × 400 cm². Tile area = 40 × 40 cm². Count = (400/40) × (400/40) = 10 × 10 = 100 tiles.',
    },
    mr: {
      q: '४ मीटर बाजूच्या चौरसाकृती सभागृहाच्या फरशीवर ४० सेमी बाजूच्या किती चौरसाकृती लाद्या बसतील?',
      opts: ['100 tiles', '10 tiles', '40 tiles', '160 tiles'],
      exp: '४ मी = ४०० सेमी. एका बाजूला ४०० ÷ ४० = १० लाद्या; एकूण = १० × १० = १०० लाद्या.',
    },
    hi: {
      q: '४ मीटर भुजा वाले वर्गाकार कक्ष के फर्श पर ४० सेमी भुजा वाली कितनी वर्गाकार टाइलें लगेंगी?',
      opts: ['100 tiles', '10 tiles', '40 tiles', '160 tiles'],
      exp: '(४०० × ४००) ÷ (४० × ४०) = १० × १० = १०० टाइलें।',
    },
  },
  {
    topic: 'Multiplication Shortcut via Distributive Law',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Which expression uses the Distributive Property accurately to compute 99 × 47 mentally?',
      opts: ['(100 × 47) − (1 × 47) = 4,653', '(100 × 47) + (1 × 47) = 4,747', '(90 × 40) + (9 × 7) = 3,663', '(100 × 50) − 3 = 4,997'],
      exp: '99 × 47 = (100 − 1) × 47 = 4,700 − 47 = 4,653.',
    },
    mr: {
      q: 'वितरण नियमाचा अचूक वापर करून ९९ × ४७ चा तोंडी गुणाकार कोणता?',
      opts: ['(100 × 47) − (1 × 47) = 4,653', '(100 × 47) + (1 × 47) = 4,747', '(90 × 40) + (9 × 7) = 3,663', '(100 × 50) − 3 = 4,997'],
      exp: '(१०० − १) × ४७ = ४,७०० − ४७ = ४,६५३.',
    },
    hi: {
      q: 'वितरण नियम द्वारा ९९ × ४७ की सटीक गणना कौन-सी है?',
      opts: ['(100 × 47) − (1 × 47) = 4,653', '(100 × 47) + (1 × 47) = 4,747', '(90 × 40) + (9 × 7) = 3,663', '(100 × 50) − 3 = 4,997'],
      exp: '४,७०० − ४७ = ४,६५३।',
    },
  },
  {
    topic: 'Mean / Arithmetic Average of Scores',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'On five weekdays, a school library issued 28, 34, 22, 41, and 25 books. Find the daily average number of books issued.',
      opts: ['30 books', '28 books', '32 books', '25 books'],
      exp: 'Total = 28 + 34 + 22 + 41 + 25 = 150 books. Average = 150 ÷ 5 = 30 books/day.',
    },
    mr: {
      q: 'पाच दिवसांत ग्रंथालयातून अनुक्रमे २८, ३४, २२, ४१ आणि २५ पुस्तके दिली गेली. दररोजची सरासरी किती?',
      opts: ['30 books', '28 books', '32 books', '25 books'],
      exp: 'एकूण बेरीज = १५०; सरासरी = १५० ÷ ५ = ३० पुस्तके.',
    },
    hi: {
      q: 'पाँच दिनों में पुस्तकालय से २८, ३४, २२, ४१ और २५ पुस्तकें जारी हुईं। दैनिक औसत क्या है?',
      opts: ['30 books', '28 books', '32 books', '25 books'],
      exp: 'योग = १५०; औसत = १५० ÷ ५ = ३० पुस्तकें।',
    },
  },
  {
    topic: 'Angle Classification at Right Angles',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many right angles combine to form a Straight Angle, and how many form one Complete Angle?',
      opts: ['2 right angles; 4 right angles', '3 right angles; 6 right angles', '1 right angle; 2 right angles', '4 right angles; 2 right angles'],
      exp: 'Straight angle = 180° = 2 × 90°; Complete angle = 360° = 4 × 90°.',
    },
    mr: {
      q: 'एक सरळ कोन तयार होण्यास किती काटकोन लागतात आणि एक पूर्ण कोन होण्यास किती काटकोन लागतात?',
      opts: ['2 right angles; 4 right angles', '3 right angles; 6 right angles', '1 right angle; 2 right angles', '4 right angles; 2 right angles'],
      exp: 'सरळ कोन (१८०°) = २ काटकोन; पूर्ण कोन (३६०°) = ४ काटकोन.',
    },
    hi: {
      q: 'एक ऋजु कोण (Straight Angle) तथा एक संपूर्ण कोण बनने में क्रमशः कितने समकोण लगते हैं?',
      opts: ['2 right angles; 4 right angles', '3 right angles; 6 right angles', '1 right angle; 2 right angles', '4 right angles; 2 right angles'],
      exp: '१८०° = २ समकोण; ३६०° = ४ समकोण।',
    },
  },
  {
    topic: 'Mass Balance Equivalence',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'On a pan balance, 4 identical mangoes plus a 200 g brass weight exactly balance one 1 kg weight. What is the mass of ONE mango?',
      opts: ['200 g', '250 g', '300 g', '150 g'],
      exp: '1 kg = 1,000 g. Mass of 4 mangoes = 1,000 − 200 = 800 g. One mango = 800 ÷ 4 = 200 g.',
    },
    mr: {
      q: 'तराजूच्या एका पारड्यात ४ सारखे आंबे आणि २०० ग्रॅमचे वजन ठेवले असता ते दुसऱ्या पारड्यातील १ किग्रॅ वजनाशी संतुलित होते. एका आंब्याचे वजन किती?',
      opts: ['200 g', '250 g', '300 g', '150 g'],
      exp: '१,००० ग्रॅम − २०० ग्रॅम = ८०० ग्रॅम. एका आंब्याचे वजन = ८०० ÷ ४ = २०० ग्रॅम.',
    },
    hi: {
      q: 'तराजू के एक पलड़े में ४ समान आम और २०० ग्राम का बाट १ किग्रा बाट के बराबर संतुलित होता है। एक आम का भार क्या है?',
      opts: ['200 g', '250 g', '300 g', '150 g'],
      exp: '१,००० − २०० = ८०० ग्राम; एक आम = ८०० ÷ ४ = २०० ग्राम।',
    },
  },
  {
    topic: 'Cube Net Visualization',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'An open-top cardboard cube box (with 5 square faces and no lid) is unfolded flat. How many squares appear in its net?',
      opts: ['5 squares', '6 squares', '4 squares', '8 squares'],
      exp: 'A closed cube has 6 square faces; without a top lid, it unfolds into 5 connected squares.',
    },
    mr: {
      q: 'झाकण नसलेला एक रिकामा घन आकाराचा पुठ्ठा उघडून सपाट केल्यास त्याच्या जाळीत (Net) किती चौरस दिसतील?',
      opts: ['5 squares', '6 squares', '4 squares', '8 squares'],
      exp: 'झाकणाशिवाय ५ पृष्ठे असल्याने ५ चौरस दिसतील.',
    },
    hi: {
      q: 'बिना ढक्कन वाले खुले घन के डिब्बे को खोलकर सपाट करने पर उसके नेट में कितने वर्ग दिखेंगे?',
      opts: ['5 squares', '6 squares', '4 squares', '8 squares'],
      exp: 'बिना ऊपरी फलक के कुल ५ वर्गाकार फलक होंगे।',
    },
  },
  {
    topic: 'Decimal Length Subtraction & Ribbon Remaining',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'From a 10 m ribbon roll, three pieces measuring 2.45 m, 1.80 m, and 3.25 m are cut off. How much ribbon remains?',
      opts: ['2.50 m', '7.50 m', '3.50 m', '2.25 m'],
      exp: 'Used = 2.45 + 1.80 + 3.25 = 7.50 m. Remaining = 10.00 − 7.50 = 2.50 m.',
    },
    mr: {
      q: '१० मीटर रिबनीतून २.४५ मी, १.८० मी आणि ३.२५ मी चे तीन तुकडे कापल्यास किती मीटर रिबीन उरते?',
      opts: ['2.50 m', '7.50 m', '3.50 m', '2.25 m'],
      exp: 'एकूण कापलेली = ७.५० मी; उरलेली = १०.०० − ७.५० = २.५० मी.',
    },
    hi: {
      q: '१० मीटर रिबन से २.४५ मी, १.८० मी तथा ३.२५ मी के टुकड़े काटने पर कितना रिबन शेष बचेगा?',
      opts: ['2.50 m', '7.50 m', '3.50 m', '2.25 m'],
      exp: 'काटा गया = ७.५० मी; शेष = १०.०० − ७.५० = २.५० मी।',
    },
  },
  {
    topic: 'Profit or Loss Everyday Word Problem',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A fruit vendor buys 12 dozen bananas at ₹40 per dozen and sells all of them at ₹4.50 per banana. Find his total profit.',
      opts: ['₹168', '₹144', '₹120', '₹180'],
      exp: 'Cost price = 12 × 40 = ₹480. Total bananas = 12 × 12 = 144. Selling price = 144 × 4.50 = ₹648. Profit = 648 − 480 = ₹168.',
    },
    mr: {
      q: 'एका फळविक्रेत्याने ₹४० प्रति डझन दराने १२ डझन केळी खरेदी करून सर्व केळी ₹४.५० प्रति नग या दराने विकली. त्याला किती नफा झाला?',
      opts: ['₹168', '₹144', '₹120', '₹180'],
      exp: 'खरेदी = १२ × ४० = ₹४८०. एकूण केळी = १४४; विक्री = १४४ × ४.५० = ₹६४८. नफा = ६४८ − ४८० = ₹१६८.',
    },
    hi: {
      q: 'एक विक्रेता ₹४० प्रति दर्जन से १२ दर्जन केले खरीदकर ₹४.५० प्रति केला बेचता है। कुल लाभ कितना होगा?',
      opts: ['₹168', '₹144', '₹120', '₹180'],
      exp: 'क्रय = ₹४८०; १४४ केलों का विक्रय = १४४ × ४.५० = ₹६४८। लाभ = ६४८ − ४८० = ₹१६८।',
    },
  },
];
