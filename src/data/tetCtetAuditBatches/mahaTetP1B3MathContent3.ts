import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 3 (28 verified trilingual MCQs: Measurement, Time, Calendar, Speed, Averages)
export const MAHA_TET_P1_B3_MATH_C3: CuratedTrilingualMcq[] = [
  {
    topic: 'Overnight Express Train Travel Duration',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'An express train departs Nagpur Junction at 19:45 hours on Wednesday and arrives in Pune at 09:20 hours on Thursday. What is the total journey time?',
      opts: ['13 hours 35 minutes', '14 hours 25 minutes', '12 hours 35 minutes', '13 hours 25 minutes'],
      exp: 'From 19:45 to 24:00 is 4 h 15 min; adding 9 h 20 min gives 13 hours 35 minutes.',
    },
    mr: {
      q: 'एक एक्सप्रेस गाडी बुधवारी १९:४५ वाजता नागपूरहून निघून गुरुवारी सकाळी ०९:२० वाजता पुण्याला पोहोचते, तर एकूण प्रवासाचा कालावधी किती?',
      opts: ['१३ तास ३५ मिनिटे', '१४ तास २५ मिनिटे', '१२ तास ३५ मिनिटे', '१३ तास २५ मिनिटे'],
      exp: '१९:४५ ते २४:०० = ४ तास १५ मिनिटे; अधिक ९ तास २० मिनिटे = १३ तास ३५ मिनिटे.',
    },
    hi: {
      q: 'एक एक्सप्रेस ट्रेन बुधवार को 19:45 बजे नागपुर से चलकर गुरुवार को 09:20 बजे पुणे पहुँचती है। कुल यात्रा समय कितना है?',
      opts: ['13 घंटे 35 मिनट', '14 घंटे 25 मिनट', '12 घंटे 35 मिनट', '13 घंटे 25 मिनट'],
      exp: '19:45 से 24:00 तक 4 घंटे 15 मिनट + 9 घंटे 20 मिनट = 13 घंटे 35 मिनट।',
    },
  },
  {
    topic: 'Leap Year Exact Days Span',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'How many days are there from 14 February 2024 to 10 April 2024, including BOTH dates?',
      opts: ['57 days', '56 days', '55 days', '58 days'],
      exp: '2024 is a leap year (Feb has 29 days). Feb: 29 − 14 + 1 = 16 days; March: 31 days; April: 10 days. Total = 16 + 31 + 10 = 57 days.',
    },
    mr: {
      q: '१४ फेब्रुवारी २०२४ पासून १० एप्रिल २०२४ पर्यंत दोन्ही दिवस धरून एकूण किती दिवस होतात?',
      opts: ['५७ दिवस', '५६ दिवस', '५५ दिवस', '५८ दिवस'],
      exp: '२०२४ हे लीप वर्ष असल्याने फेब्रुवारी २९ दिवसांचा: १६ (फेब्रु) + ३१ (मार्च) + १० (एप्रिल) = ५७ दिवस.',
    },
    hi: {
      q: '14 फरवरी 2024 से 10 अप्रैल 2024 तक दोनों तिथियाँ सम्मिलित करते हुए कुल कितने दिन होंगे?',
      opts: ['57 दिन', '56 दिन', '55 दिन', '58 दिन'],
      exp: '2024 लीप वर्ष है (फरवरी 29 दिन): 16 (फरवरी) + 31 (मार्च) + 10 (अप्रैल) = 57 दिन।',
    },
  },
  {
    topic: 'Capacity Division Litres to Bottles',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A dairy tanker holds 22 litres 400 ml of milk. How many 350 ml bottles can be completely filled from it?',
      opts: ['64', '62', '56', '72'],
      exp: '22 L 400 ml = 22,400 ml. Bottles = 22,400 ÷ 350 = 64.',
    },
    mr: {
      q: 'दुधाच्या टँकरमध्ये २२ लिटर ४०० मिली दूध आहे. त्यातून प्रत्येकी ३५० मिली क्षमतेच्या किती बाटल्या पूर्ण भरता येतील?',
      opts: ['६४', '६२', '५६', '७२'],
      exp: '२२,४०० मिली ÷ ३५० मिली = ६४ बाटल्या.',
    },
    hi: {
      q: 'दूध के एक टैंकर में 22 लीटर 400 मिली दूध है। इससे 350 मिली वाली कितनी बोतलें पूरी भरी जा सकती हैं?',
      opts: ['64', '62', '56', '72'],
      exp: '22,400 मिली ÷ 350 मिली = 64 बोतलें।',
    },
  },
  {
    topic: 'Quintals & Kilograms Grain Stock Balance',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A grain trader had 8 quintals 25 kg of rice. He sold 3 quintals 78 kg on Monday and 195 kg on Tuesday. How much rice remains unsold?',
      opts: ['2 quintals 52 kg', '2 quintals 62 kg', '3 quintals 52 kg', '2 quintals 42 kg'],
      exp: 'Total = 825 kg. Sold = 378 + 195 = 573 kg. Remaining = 825 − 573 = 252 kg = 2 quintals 52 kg.',
    },
    mr: {
      q: 'एका व्यापाऱ्याकडे ८ क्विंटल २५ किलो तांदूळ होता. त्याने सोमवारी ३ क्विंटल ७८ किलो व मंगळवारी १९५ किलो विकला, तर किती तांदूळ शिल्लक राहिला?',
      opts: ['२ क्विंटल ५२ किलो', '२ क्विंटल ६२ किलो', '३ क्विंटल ५२ किलो', '२ क्विंटल ४२ किलो'],
      exp: '८२५ − (३७८ + १९५) = ८२५ − ५७३ = २५२ किलो = २ क्विंटल ५२ किलो.',
    },
    hi: {
      q: 'एक अनाज व्यापारी के पास 8 क्विंटल 25 किग्रा चावल था। उसने सोमवार को 3 क्विंटल 78 किग्रा और मंगलवार को 195 किग्रा बेचा। कितना चावल शेष बचा?',
      opts: ['2 क्विंटल 52 किग्रा', '2 क्विंटल 62 किग्रा', '3 क्विंटल 52 किग्रा', '2 क्विंटल 42 किग्रा'],
      exp: '825 − (378 + 195) = 252 किग्रा = 2 क्विंटल 52 किग्रा।',
    },
  },
  {
    topic: 'Wire Cut Into Equilateral Triangles',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'From a 9 m 60 cm copper wire, how many identical equilateral triangles of side 16 cm can be formed without any leftover wire?',
      opts: ['20', '15', '30', '24'],
      exp: 'Total wire = 960 cm. Perimeter of 1 triangle = 3 × 16 = 48 cm. Triangles = 960 ÷ 48 = 20.',
    },
    mr: {
      q: '९ मी ६० सेमी लांबीच्या तांब्याच्या तारेपासून प्रत्येकी १६ सेमी बाजू असलेले किती समभुज त्रिकोण कोणताही तुकडा शिल्लक न राहता तयार होतील?',
      opts: ['२०', '१५', '३०', '२४'],
      exp: 'एकूण तार = ९६० सेमी. एका त्रिकोणाची परिमिती = ३ × १६ = ४८ सेमी. त्रिकोण = ९६० ÷ ४८ = २०.',
    },
    hi: {
      q: '9 मी 60 सेमी लंबे ताँबे के तार से 16 सेमी भुजा वाले कितने समबाहु त्रिभुज बिना कोई तार बचाए बनाए जा सकते हैं?',
      opts: ['20', '15', '30', '24'],
      exp: 'कुल तार = 960 सेमी; एक त्रिभुज का परिमाप = 48 सेमी। संख्या = 960 ÷ 48 = 20.',
    },
  },
  {
    topic: 'Relay Race Cumulative Seconds',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Four runners in a school 4×100 m relay clocked 14.8 s, 15.4 s, 14.6 s, and 15.2 s. What was their team’s total time?',
      opts: ['1 minute exact', '59 seconds', '1 minute 2 seconds', '58.8 seconds'],
      exp: '(14.8 + 15.2) + (15.4 + 14.6) = 30.0 + 30.0 = 60.0 seconds = 1 minute.',
    },
    mr: {
      q: 'शालेय ४×१०० मी रिले शर्यतीतील चार धावपटूंनी अनुक्रमे १४.८ से, १५.४ से, १४.६ से आणि १५.२ सेकंद वेळ घेतला, तर संघाची एकूण वेळ किती?',
      opts: ['नेमके १ मिनिट', '५९ सेकंद', '१ मिनिट २ सेकंद', '५८.८ सेकंद'],
      exp: '(१४.८ + १५.२) + (१५.४ + १४.६) = ३० + ३० = ६० सेकंद = १ मिनिट.',
    },
    hi: {
      q: 'स्कूल की 4×100 मी रिले दौड़ में चार धावकों ने क्रमशः 14.8 से, 15.4 से, 14.6 से और 15.2 सेकंड लिए। टीम का कुल समय क्या था?',
      opts: ['ठीक 1 मिनट', '59 सेकंड', '1 मिनट 2 सेकंड', '58.8 सेकंड'],
      exp: '(14.8 + 15.2) + (15.4 + 14.6) = 60.0 सेकंड = 1 मिनट।',
    },
  },
  {
    topic: 'Project Cycle End Date Counting',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 seed-germination observation lasts 45 days. Counting 20 July as Day 1, on which calendar date will Day 45 fall?',
      opts: ['2 September', '3 September', '1 September', '4 September'],
      exp: 'July (20 to 31) = 12 days; August = 31 days (12 + 31 = 43 days); remaining 2 days fall in September -> 2 September.',
    },
    mr: {
      q: 'इ. ५ वीचा बी-अंकुरण निरीक्षण प्रकल्प ४५ दिवसांचा आहे. २० जुलै हा पहिला दिवस धरल्यास ४५ वा दिवस कोणत्या तारखेला येईल?',
      opts: ['२ सप्टेंबर', '३ सप्टेंबर', '१ सप्टेंबर', '४ सप्टेंबर'],
      exp: 'जुलै (२० ते ३१) = १२ दिवस; ऑगस्ट = ३१ दिवस (एकूण ४३); उरलेले २ दिवस म्हणजे २ सप्टेंबर.',
    },
    hi: {
      q: 'कक्षा 5 का बीज-अंकुरण अवलोकन कार्य 45 दिनों का है। 20 जुलाई को पहला दिन मानने पर 45वाँ दिन किस तिथि को पड़ेगा?',
      opts: ['2 सितंबर', '3 सितंबर', '1 सितंबर', '4 सितंबर'],
      exp: 'जुलाई (20 से 31) = 12 दिन; अगस्त = 31 दिन (कुल 43); शेष 2 दिन सितंबर के -> 2 सितंबर।',
    },
  },
  {
    topic: 'Distance Addition Kilometres and Metres',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Sita completes 6 rounds of a 450 m park track and then walks 1 km 350 m home. What total distance did she cover in kilometres?',
      opts: ['4.05 km', '4.50 km', '3.95 km', '4.15 km'],
      exp: 'Track = 6 × 450 = 2,700 m. Walk = 1,350 m. Total = 4,050 m = 4.05 km.',
    },
    mr: {
      q: 'सीताने ४५० मी मैदानाच्या ६ फेऱ्या मारल्या व नंतर १ किमी ३५० मी चालत घर गाठले, तर तिने एकूण किती किमी अंतर कापले?',
      opts: ['४.०५ किमी', '४.५० किमी', '३.९५ किमी', '४.१५ किमी'],
      exp: '६ × ४५० = २,७०० मी + १,३५० मी = ४,०५० मी = ४.०५ किमी.',
    },
    hi: {
      q: 'सीता ने 450 मी ट्रैक के 6 चक्कर लगाए और फिर 1 किमी 350 मी पैदल घर गईं। उन्होंने कुल कितने किलोमीटर दूरी तय की?',
      opts: ['4.05 किमी', '4.50 किमी', '3.95 किमी', '4.15 किमी'],
      exp: '6 × 450 = 2,700 मी + 1,350 मी = 4,050 मी = 4.05 किमी।',
    },
  },
  {
    topic: 'Milligrams to Grams Conversion',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Each vitamin tablet has a mass of 450 mg. What is the total mass of 40 such tablets in grams?',
      opts: ['18 g', '180 g', '1.8 g', '16 g'],
      exp: '40 × 450 mg = 18,000 mg = 18,000 ÷ 1,000 g = 18 g.',
    },
    mr: {
      q: 'एका जीवनसत्त्व गोळीचे वजन ४५० मिग्रॅ आहे, तर अशा ४० गोळ्यांचे एकूण वजन किती ग्रॅम होईल?',
      opts: ['१८ ग्रॅम', '१८० ग्रॅम', '१.८ ग्रॅम', '१६ ग्रॅम'],
      exp: '४० × ४५० मिग्रॅ = १८,००० मिग्रॅ = १८ ग्रॅम.',
    },
    hi: {
      q: 'एक विटामिन गोली का द्रव्यमान 450 मिलीग्राम है। ऐसी 40 गोलियों का कुल द्रव्यमान ग्राम में कितना होगा?',
      opts: ['18 ग्राम', '180 ग्राम', '1.8 ग्राम', '16 ग्राम'],
      exp: '40 × 450 मिग्रा = 18,000 मिग्रा = 18 ग्राम।',
    },
  },
  {
    topic: 'Metric Tonnes, Quintals & Kilograms',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Subtract 1,875 kg from 3 metric tonnes 4 quintals 50 kg.',
      opts: ['1,575 kg', '1,625 kg', '2,575 kg', '1,475 kg'],
      exp: '3 tonnes 4 quintals 50 kg = 3,000 + 400 + 50 = 3,450 kg. 3,450 − 1,875 = 1,575 kg.',
    },
    mr: {
      q: '३ मेट्रिक टन ४ क्विंटल ५० किलो मधून १,८७५ किलो वजा केल्यास किती किलो उरतात?',
      opts: ['१,५७५ किलो', '१,६२५ किलो', '२,५७५ किलो', '१,४७५ किलो'],
      exp: '३,४५० किलो − १,८७५ किलो = १,५७५ किलो.',
    },
    hi: {
      q: '3 मीट्रिक टन 4 क्विंटल 50 किग्रा में से 1,875 किग्रा घटाने पर कितना बचेगा?',
      opts: ['1,575 किग्रा', '1,625 किग्रा', '2,575 किग्रा', '1,475 किग्रा'],
      exp: '3,450 किग्रा − 1,875 किग्रा = 1,575 किग्रा।',
    },
  },
  {
    topic: 'Calendar Day Shift Independence to Gandhi Jayanti',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'If 15 August in a certain year falls on a Thursday, what day of the week is 2 October in that same year?',
      opts: ['Wednesday', 'Thursday', 'Tuesday', 'Friday'],
      exp: 'Days from 15 Aug to 2 Oct = (31 − 15) + 30 + 2 = 48 days. 48 ÷ 7 gives remainder 6. Thursday + 6 days = Wednesday.',
    },
    mr: {
      q: 'जर एका वर्षी १५ ऑगस्ट गुरुवारी आला, तर त्याच वर्षी २ ऑक्टोबर रोजी कोणता वार येईल?',
      opts: ['बुधवार', 'गुरुवार', 'मंगळवार', 'शुक्रवार'],
      exp: '१५ ऑगस्ट ते २ ऑक्टोबर = १६ + ३० + २ = ४८ दिवस. ४८ ÷ ७ ची बाकी ६. गुरुवार + ६ दिवस = बुधवार.',
    },
    hi: {
      q: 'यदि किसी वर्ष 15 अगस्त को गुरुवार है, तो उसी वर्ष 2 अक्टूबर को कौन-सा दिन होगा?',
      opts: ['बुधवार', 'गुरुवार', 'मंगलवार', 'शुक्रवार'],
      exp: '15 अगस्त से 2 अक्टूबर तक 16 + 30 + 2 = 48 दिन। 48 mod 7 = 6. गुरुवार + 6 दिन = बुधवार।',
    },
  },
  {
    topic: 'Leaky Tap Water Wastage Rate',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A dripping school tap wastes 25 ml of water every 15 minutes. How many litres of water are wasted in 12 hours?',
      opts: ['1.2 litres', '12 litres', '0.9 litres', '1.8 litres'],
      exp: 'In 1 hour (four 15-min intervals) = 4 × 25 = 100 ml. In 12 hours = 1,200 ml = 1.2 L.',
    },
    mr: {
      q: 'गळणाऱ्या नळातून दर १५ मिनिटांनी २५ मिली पाणी वाया जाते, तर १२ तासांत किती लिटर पाणी वाया जाईल?',
      opts: ['१.२ लिटर', '१२ लिटर', '०.९ लिटर', '१.८ लिटर'],
      exp: '१ तासात १०० मिली, म्हणून १२ तासांत १,२०० मिली = १.२ लिटर.',
    },
    hi: {
      q: 'टपकते नल से हर 15 मिनट में 25 मिली पानी बर्बाद होता है। 12 घंटे में कितने लीटर पानी बर्बाद होगा?',
      opts: ['1.2 लीटर', '12 लीटर', '0.9 लीटर', '1.8 लीटर'],
      exp: '1 घंटे में 100 मिली; 12 घंटे में 1,200 मिली = 1.2 लीटर।',
    },
  },
  {
    topic: 'Fast Clock Time Gain Calculation',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A wall clock gains 4 minutes every hour. It is set to the exact time at 06:00 a.m. What time will this fast clock show when the true time is 01:30 p.m.?',
      opts: ['02:00 p.m.', '01:58 p.m.', '02:04 p.m.', '01:54 p.m.'],
      exp: 'Elapsed true time from 06:00 a.m. to 01:30 p.m. = 7.5 hours. Gain = 7.5 × 4 = 30 min. Shown time = 1:30 + 0:30 = 02:00 p.m.',
    },
    mr: {
      q: 'एक घड्याळ दर तासाला ४ मिनिटे पुढे जाते. सकाळी ०६:०० वाजता ते बरोबर लावले असल्यास, खऱ्या ०१:३० वाजता (दुपारी) हे घड्याळ कोणती वेळ दाखवेल?',
      opts: ['०२:०० दु.', '०१:५८ दु.', '०२:०४ दु.', '०१:५४ दु.'],
      exp: '०६:०० ते ०१:३० = ७.५ तास. एकूण पुढे गेलेली वेळ = ७.५ × ४ = ३० मिनिटे. घड्याळाची वेळ = ०२:००.',
    },
    hi: {
      q: 'एक घड़ी प्रति घंटे 4 मिनट तेज़ चलती है। इसे सुबह 06:00 बजे सही मिलाया गया। जब वास्तविक समय दोपहर 01:30 बजे होगा, तब यह घड़ी क्या समय दिखाएगी?',
      opts: ['02:00 अप.', '01:58 अप.', '02:04 अप.', '01:54 अप.'],
      exp: 'कुल वास्तविक समय = 7.5 घंटे; बढ़त = 7.5 × 4 = 30 मिनट। घड़ी दिखाएगी 02:00 अप.।',
    },
  },
  {
    topic: 'Adding Millilitre Units With Zero Placeholder',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Add 3 litres 60 ml and 4 litres 950 ml, and express the total in litres.',
      opts: ['8.01 L', '8.10 L', '7.91 L', '8.55 L'],
      exp: '3.060 L + 4.950 L = 8.010 L = 8.01 L.',
    },
    mr: {
      q: '३ लिटर ६० मिली व ४ लिटर ९५० मिली यांची बेरीज लिटरमध्ये किती?',
      opts: ['८.०१ लि', '८.१० लि', '७.९१ लि', '८.५५ लि'],
      exp: '३.०६० + ४.९५० = ८.०१० लि = ८.०१ लि.',
    },
    hi: {
      q: '3 लीटर 60 मिली तथा 4 लीटर 950 मिली को जोड़कर उत्तर लीटर में लिखिए।',
      opts: ['8.01 ली', '8.10 ली', '7.91 ली', '8.55 ली'],
      exp: '3.060 + 4.950 = 8.010 ली = 8.01 ली।',
    },
  },
  {
    topic: 'Metres to Millimetres Conversion',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Convert 2.45 metres into millimetres.',
      opts: ['2,450 mm', '245 mm', '24,500 mm', '24.5 mm'],
      exp: '1 m = 1,000 mm. Thus 2.45 × 1,000 = 2,450 mm.',
    },
    mr: {
      q: '२.४५ मीटरचे मिलिमीटरमध्ये रूपांतर किती?',
      opts: ['२,४५० मिमी', '२४५ मिमी', '२४,५०० मिमी', '२४.५ मिमी'],
      exp: '१ मीटर = १,००० मिमी; २.४५ × १,००० = २,४५० मिमी.',
    },
    hi: {
      q: '2.45 मीटर को मिलीमीटर में बदलिए।',
      opts: ['2,450 मिमी', '245 मिमी', '24,500 मिमी', '24.5 मिमी'],
      exp: '1 मी = 1,000 मिमी; 2.45 × 1,000 = 2,450 मिमी।',
    },
  },
  {
    topic: 'Balance Scale Mass Deduction',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'On a pan balance, 5 identical apples together with a 250 g weight exactly balance a 1 kg standard weight. What is the mass of ONE apple?',
      opts: ['150 g', '175 g', '200 g', '125 g'],
      exp: '5 apples + 250 g = 1,000 g -> 5 apples = 750 g -> 1 apple = 750 ÷ 5 = 150 g.',
    },
    mr: {
      q: 'तराजूच्या एका पारड्यात ५ सारखे सफरचंद व २५० ग्रॅम वजन ठेवले असता ते दुसऱ्या पारड्यातील १ किलो वजनाशी तंतोतंत जुळते, तर एका सफरचंदाचे वजन किती?',
      opts: ['१५० ग्रॅम', '१७५ ग्रॅम', '२०० ग्रॅम', '१२५ ग्रॅम'],
      exp: '१,००० − २५० = ७५० ग्रॅम; एका सफरचंदाचे वजन = ७५० ÷ ५ = १५० ग्रॅम.',
    },
    hi: {
      q: 'एक तराजू पर 5 एक समान सेबों के साथ 250 ग्राम बाट रखने से वह 1 किग्रा बाट से ठीक संतुलित हो जाता है। एक सेब का वजन कितना है?',
      opts: ['150 ग्राम', '175 ग्राम', '200 ग्राम', '125 ग्राम'],
      exp: '5 सेब = 1,000 − 250 = 750 ग्राम; 1 सेब = 750 ÷ 5 = 150 ग्राम।',
    },
  },
  {
    topic: 'Bus Schedule Interval Wait Time',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Buses for Kolhapur depart every 45 minutes. At the bus stand, a commuter learns the 10:25 a.m. bus left 12 minutes ago. How long must he wait for the next bus?',
      opts: ['33 minutes', '37 minutes', '23 minutes', '43 minutes'],
      exp: 'Next bus leaves at 10:25 + 45 min = 11:10 a.m. Current time is 10:25 + 12 = 10:37 a.m. Wait = 45 − 12 = 33 minutes.',
    },
    mr: {
      q: 'कोल्हापूरसाठी दर ४५ मिनिटांनी बस सुटते. स्थानकावर प्रवाशाला कळते की १०:२५ ची बस १२ मिनिटांपूर्वीच सुटली, तर त्याला पुढच्या बससाठी किती वेळ थांबावे लागेल?',
      opts: ['३३ मिनिटे', '३७ मिनिटे', '२३ मिनिटे', '४३ मिनिटे'],
      exp: 'प्रतीक्षा वेळ = ४५ − १२ = ३३ मिनिटे (पुढची बस ११:१० ला व सध्या १०:३७ झाले आहेत).',
    },
    hi: {
      q: 'कोल्हापुर के लिए बसें हर 45 मिनट में छूटती हैं। यात्री को पता चला कि 10:25 प्रातः की बस 12 मिनट पहले ही गई है। अगली बस के लिए उसे कितना इंतजार करना होगा?',
      opts: ['33 मिनट', '37 मिनट', '23 मिनट', '43 मिनट'],
      exp: 'इंतजार समय = 45 − 12 = 33 मिनट।',
    },
  },
  {
    topic: 'Net Shift Duration Excluding Break',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A craft workshop runs from 08:45 a.m. to 04:20 p.m., including a lunch break from 12:30 p.m. to 01:15 p.m. What is the NET working duration?',
      opts: ['6 hours 50 minutes', '7 hours 35 minutes', '6 hours 45 minutes', '7 hours 5 minutes'],
      exp: '08:45 to 16:20 = 7 h 35 min. Subtract 45 min lunch break -> 6 hours 50 minutes.',
    },
    mr: {
      q: 'एक हस्तकला कार्यशाळा सकाळी ०८:४५ ते दुपारी ०४:२० पर्यंत चालते व त्यात १२:३० ते ०१:१५ अशी जेवणाची सुट्टी असते, तर निव्वळ कामाचा कालावधी किती?',
      opts: ['६ तास ५० मिनिटे', '७ तास ३५ मिनिटे', '६ तास ४५ मिनिटे', '७ तास ५ मिनिटे'],
      exp: 'एकूण वेळ ७ तास ३५ मिनिटे − ४५ मिनिटे सुट्टी = ६ तास ५० मिनिटे.',
    },
    hi: {
      q: 'एक शिल्प कार्यशाला सुबह 08:45 से शाम 04:20 तक चलती है, जिसमें 12:30 से 01:15 तक भोजनावकाश रहता है। शुद्ध कार्य अवधि कितनी है?',
      opts: ['6 घंटे 50 मिनट', '7 घंटे 35 मिनट', '6 घंटे 45 मिनट', '7 घंटे 5 मिनट'],
      exp: 'कुल अवधि = 7 घंटे 35 मिनट; 45 मिनट घटाने पर 6 घंटे 50 मिनट।',
    },
  },
  {
    topic: 'Hectare to Square Metres Conversion',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'From a 2.5-hectare farm plot, 8,500 sq m is set aside for an orchard. How many square metres remain for vegetable crops?',
      opts: ['16,500 sq m', '1,500 sq m', '17,500 sq m', '24,150 sq m'],
      exp: '1 hectare = 10,000 sq m, so 2.5 ha = 25,000 sq m. Remaining = 25,000 − 8,500 = 16,500 sq m.',
    },
    mr: {
      q: '२.५ हेक्टर शेतापैकी ८,५०० चौ.मी. क्षेत्र फळबागेसाठी राखून ठेवले, तर भाजीपाल्यासाठी किती चौ.मी. जागा शिल्लक राहील?',
      opts: ['१६,५०० चौ.मी.', '१,५०० चौ.मी.', '१७,५०० चौ.मी.', '२४,१५० चौ.मी.'],
      exp: '१ हेक्टर = १०,००० चौ.मी. -> २.५ हेक्टर = २५,००० चौ.मी. वजाबाकी = २५,००० − ८,५०० = १६,५०० चौ.मी.',
    },
    hi: {
      q: '2.5 हेक्टेयर खेत में से 8,500 वर्ग मी बागवानी के लिए रखा गया। सब्जियों के लिए कितने वर्ग मी भूमि शेष बची?',
      opts: ['16,500 वर्ग मी', '1,500 वर्ग मी', '17,500 वर्ग मी', '24,150 वर्ग मी'],
      exp: '2.5 हेक्टेयर = 25,000 वर्ग मी। शेष = 25,000 − 8,500 = 16,500 वर्ग मी।',
    },
  },
  {
    topic: 'Tank Capacity Bucket Division With Remainder',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A 150-litre water tank completely fills 12 identical buckets, leaving 6 litres in the tank. What is the capacity of ONE bucket?',
      opts: ['12 L', '12.5 L', '11 L', '13 L'],
      exp: 'Water used = 150 − 6 = 144 L. Each bucket = 144 ÷ 12 = 12 L.',
    },
    mr: {
      q: '१५० लिटरच्या टाकीतून १२ समान बादल्या पूर्ण भरल्यावर टाकीत ६ लिटर पाणी उरले, तर एका बादलीची क्षमता किती?',
      opts: ['१२ लि', '१२.५ लि', '११ लि', '१३ लि'],
      exp: 'वापरलेले पाणी = १५० − ६ = १४४ लि. एक बादली = १४४ ÷ १२ = १२ लि.',
    },
    hi: {
      q: '150 लीटर की टंकी से 12 एक जैसी बाल्टियाँ पूरी भरने के बाद टंकी में 6 लीटर पानी बचता है। एक बाल्टी की क्षमता क्या है?',
      opts: ['12 ली', '12.5 ली', '11 ली', '13 ली'],
      exp: 'उपयोग किया गया पानी = 150 − 6 = 144 ली; 1 बाल्टी = 144 ÷ 12 = 12 ली।',
    },
  },
  {
    topic: 'Century Leap Year Identification Rule',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following century years is a LEAP year?',
      opts: ['2000', '1800', '1900', '2100'],
      exp: 'Century years are leap years ONLY when divisible by 400. Only 2000 ÷ 400 = 5 is an exact whole number.',
    },
    mr: {
      q: 'खालीलपैकी कोणते शतक वर्ष हे "लीप वर्ष" आहे?',
      opts: ['२०००', '१८००', '१९००', '२१००'],
      exp: 'शतक वर्षाला ४०० ने निःशेष भाग गेल्यासच ते लीप वर्ष असते; केवळ २००० ला ४०० ने भाग जातो.',
    },
    hi: {
      q: 'निम्न में से कौन-सा शताब्दी वर्ष एक "लीप वर्ष" है?',
      opts: ['2000', '1800', '1900', '2100'],
      exp: 'शताब्दी वर्ष केवल तभी लीप होता है जब वह 400 से विभाज्य हो। इनमें केवल 2000 है।',
    },
  },
  {
    topic: 'Speed Distance Time Unit Conversion',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A cyclist rides 450 metres every minute at a steady pace. How many kilometres will she travel in 40 minutes?',
      opts: ['18 km', '1.8 km', '16 km', '20 km'],
      exp: 'Distance = 450 m/min × 40 min = 18,000 m = 18 km.',
    },
    mr: {
      q: 'एक सायकलस्वार दर मिनिटाला ४५० मीटर अंतर कापतो, तर ४० मिनिटांत तो किती किलोमीटर अंतर पार करेल?',
      opts: ['१८ किमी', '१.८ किमी', '१६ किमी', '२० किमी'],
      exp: 'अंतर = ४५० × ४० = १८,००० मीटर = १८ किमी.',
    },
    hi: {
      q: 'एक साइकिल चालक प्रति मिनट 450 मीटर दूरी तय करती है। 40 मिनट में वह कितने किलोमीटर दूरी तय करेगी?',
      opts: ['18 किमी', '1.8 किमी', '16 किमी', '20 किमी'],
      exp: 'दूरी = 450 × 40 = 18,000 मी = 18 किमी।',
    },
  },
  {
    topic: 'Bamboo Pole Submerged Fraction Length',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: '3/4 of a bamboo pole stands above water in a pond, while the remaining 1 m 25 cm is submerged. Find the TOTAL length of the pole.',
      opts: ['5 m', '4.5 m', '6 m', '3.75 m'],
      exp: 'Submerged fraction = 1 − 3/4 = 1/4, which equals 1.25 m. Total length = 4 × 1.25 m = 5 m.',
    },
    mr: {
      q: 'एका बांबूच्या काठीचा ३/४ भाग पाण्याबाहेर आहे व उरलेला १ मी २५ सेमी भाग पाण्यात बुडालेला आहे, तर बांबूची एकूण लांबी किती?',
      opts: ['५ मी', '४.५ मी', '६ मी', '३.७५ मी'],
      exp: 'पाण्यात असलेला १/४ भाग = १.२५ मी, म्हणून पूर्ण काठी = ४ × १.२५ = ५ मी.',
    },
    hi: {
      q: 'एक बाँस के खंभे का 3/4 भाग पानी के बाहर है और शेष 1 मी 25 सेमी पानी के भीतर है। खंभे की कुल लंबाई कितनी है?',
      opts: ['5 मी', '4.5 मी', '6 मी', '3.75 मी'],
      exp: 'डूबा भाग = 1/4 = 1.25 मी; कुल लंबाई = 4 × 1.25 = 5 मी।',
    },
  },
  {
    topic: '24-Hour Clock Arrival Addition',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A parcel van leaves Nashik at 16:40 hours and takes 6 hours 45 minutes to reach Mumbai. At what time in the 24-hour clock does it arrive?',
      opts: ['23:25 hours', '22:25 hours', '23:15 hours', '23:35 hours'],
      exp: '16:40 + 6 h = 22:40; 22:40 + 45 min = 23:25 hours.',
    },
    mr: {
      q: 'एक मालवाहू गाडी नाशिकहून १६:४० वाजता निघते व मुंबईला पोहोचायला ६ तास ४५ मिनिटे घेते, तर २४-ताशी घड्याळानुसार ती किती वाजता पोहोचेल?',
      opts: ['२३:२५ वाजता', '२२:२५ वाजता', '२३:१५ वाजता', '२३:३५ वाजता'],
      exp: '१६:४० + ६ तास = २२:४०; अधिक ४५ मिनिटे = २३:२५.',
    },
    hi: {
      q: 'एक वाहन नासिक से 16:40 बजे चलकर 6 घंटे 45 मिनट में मुंबई पहुँचता है। 24-घंटे की घड़ी के अनुसार यह कितने बजे पहुँचेगा?',
      opts: ['23:25 बजे', '22:25 बजे', '23:15 बजे', '23:35 बजे'],
      exp: '16:40 + 6 घंटे = 22:40; + 45 मिनट = 23:25 बजे।',
    },
  },
  {
    topic: 'Average Mass of Five Parcels',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Five fruit crates weigh 12 kg 400 g, 10 kg 600 g, 11 kg, 13 kg 200 g, and 12 kg 800 g. Find their average mass.',
      opts: ['12 kg', '11.8 kg', '12.4 kg', '12.5 kg'],
      exp: 'Sum = (12.4 + 10.6) + 11.0 + (13.2 + 12.8) = 23 + 11 + 26 = 60 kg. Average = 60 ÷ 5 = 12 kg.',
    },
    mr: {
      q: 'पाच फळांच्या पेट्यांची वजने अनुक्रमे १२ कि. ४०० ग्रॅ, १० कि. ६०० ग्रॅ, ११ कि., १३ कि. २०० ग्रॅ आणि १२ कि. ८०० ग्रॅ आहेत, तर त्यांचे सरासरी वजन किती?',
      opts: ['१२ किलो', '११.८ किलो', '१२.४ किलो', '१२.५ किलो'],
      exp: 'एकूण बेरीज = ६० किलो. सरासरी = ६० ÷ ५ = १२ किलो.',
    },
    hi: {
      q: 'पाँच फलों के बक्सों का वजन क्रमशः 12 किग्रा 400 ग्रा, 10 किग्रा 600 ग्रा, 11 किग्रा, 13 किग्रा 200 ग्रा और 12 किग्रा 800 ग्रा है। औसत वजन ज्ञात कीजिए।',
      opts: ['12 किग्रा', '11.8 किग्रा', '12.4 किग्रा', '12.5 किग्रा'],
      exp: 'कुल योग = 60 किग्रा; औसत = 60 ÷ 5 = 12 किग्रा।',
    },
  },
  {
    topic: 'Hours, Minutes, Seconds to Seconds',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Convert 2 hours 15 minutes 30 seconds completely into seconds.',
      opts: ['8,130 s', '7,830 s', '8,430 s', '7,530 s'],
      exp: '(2 × 3,600) + (15 × 60) + 30 = 7,200 + 900 + 30 = 8,130 seconds.',
    },
    mr: {
      q: '२ तास १५ मिनिटे ३० सेकंद यांचे एकूण सेकंद किती होतील?',
      opts: ['८,१३० सेकंद', '७,८३० सेकंद', '८,४३० सेकंद', '७,५३० सेकंद'],
      exp: '(२ × ३,६००) + (१५ × ६०) + ३० = ७,२०० + ९०० + ३० = ८,१३० सेकंद.',
    },
    hi: {
      q: '2 घंटे 15 मिनट 30 सेकंड को पूर्णतः सेकंड में बदलिए।',
      opts: ['8,130 सेकंड', '7,830 सेकंड', '8,430 सेकंड', '7,530 सेकंड'],
      exp: '(2 × 3,600) + (15 × 60) + 30 = 8,130 सेकंड।',
    },
  },
  {
    topic: 'Mass Division and Subset Multiplication',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: '4.8 kg of jaggery is packed equally into 16 small pouches. What is the combined mass of 5 such pouches?',
      opts: ['1.5 kg', '1.2 kg', '1.6 kg', '1.8 kg'],
      exp: 'One pouch = 4,800 g ÷ 16 = 300 g. Five pouches = 5 × 300 g = 1,500 g = 1.5 kg.',
    },
    mr: {
      q: '४.८ किलो गूळ १६ पिशव्यांत समान वाटला, तर अशा ५ पिशव्यांचे एकत्रित वजन किती?',
      opts: ['१.५ किलो', '१.२ किलो', '१.६ किलो', '१.८ किलो'],
      exp: 'एक पिशवी = ४,८०० ÷ १६ = ३०० ग्रॅम; ५ पिशव्या = १,५०० ग्रॅम = १.५ किलो.',
    },
    hi: {
      q: '4.8 किग्रा गुड़ को 16 थैलियों में बराबर भरा गया। ऐसी 5 थैलियों का कुल द्रव्यमान कितना होगा?',
      opts: ['1.5 किग्रा', '1.2 किग्रा', '1.6 किग्रा', '1.8 किग्रा'],
      exp: 'एक थैली = 4,800 ÷ 16 = 300 ग्रा; 5 थैलियाँ = 1,500 ग्रा = 1.5 किग्रा।',
    },
  },
  {
    topic: 'Leap-Day Birthday True Age Counting',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Aarav was born on 29 February 2016. How many years old is he in 2024 when his birth date appears on the calendar for the 2nd time since birth?',
      opts: ['8 years', '2 years', '4 years', '7 years'],
      exp: 'From 29 Feb 2016 to 29 Feb 2024 spans 2024 − 2016 = 8 full calendar years.',
    },
    mr: {
      q: 'आरवचा जन्म २९ फेब्रुवारी २०१६ रोजी झाला. २०२४ मध्ये कॅलेंडरवर त्याची जन्मतारीख दुसऱ्यांदा येते तेव्हा त्याचे खरे वय किती वर्षे पूर्ण झालेले असेल?',
      opts: ['८ वर्षे', '२ वर्षे', '४ वर्षे', '७ वर्षे'],
      exp: '२०१६ ते २०२४ हा कालावधी २०२४ − २०१६ = ८ पूर्ण वर्षे आहे.',
    },
    hi: {
      q: 'आरव का जन्म 29 फरवरी 2016 को हुआ। वर्ष 2024 में जब कैलेंडर पर उसकी जन्मतिथि जन्म के बाद दूसरी बार आती है, तब उसकी वास्तविक आयु कितने वर्ष होगी?',
      opts: ['8 वर्ष', '2 वर्ष', '4 वर्ष', '7 वर्ष'],
      exp: '29 फरवरी 2016 से 29 फरवरी 2024 तक 2024 − 2016 = 8 पूरे वर्ष होते हैं।',
    },
  },
];
