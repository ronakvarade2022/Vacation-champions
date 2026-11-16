import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 6 (28 verified trilingual MCQs: BODMAS, Proportions, Bills, 3D Painting, Reasoning)
export const MAHA_TET_P1_B3_MATH_C6: CuratedTrilingualMcq[] = [
  {
    topic: 'BODMAS Order of Operations',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Simplify using the correct order of operations: 48 ÷ 6 × 2 + 18 − (7 + 5) =',
      opts: ['22', '10', '34', '26'],
      exp: '(7 + 5) = 12; 48 ÷ 6 = 8; 8 × 2 = 16; 16 + 18 − 12 = 22.',
    },
    mr: {
      q: 'पदावली सोडवा: ४८ ÷ ६ × २ + १८ − (७ + ५) =',
      opts: ['२२', '१०', '३४', '२६'],
      exp: 'कंस = १२; ४८ ÷ ६ = ८; ८ × २ = १६; १६ + १८ − १२ = २२.',
    },
    hi: {
      q: 'सही संक्रिया क्रम से सरल कीजिए: 48 ÷ 6 × 2 + 18 − (7 + 5) =',
      opts: ['22', '10', '34', '26'],
      exp: '16 + 18 − 12 = 22.',
    },
  },
  {
    topic: 'Nested Grouping Brackets Evaluation',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Evaluate: 120 − [24 + {18 − (12 − 7)}] =',
      opts: ['83', '87', '79', '93'],
      exp: '12−7 = 5; 18−5 = 13; 24+13 = 37; 120−37 = 83.',
    },
    mr: {
      q: 'किंमत काढा: १२० − [२४ + {१८ − (१२ − ७)}] =',
      opts: ['८३', '८७', '७९', '९३'],
      exp: '१२−७=५ -> १८−५=१३ -> २४+१३=३७ -> १२०−३७ = ८३.',
    },
    hi: {
      q: 'मान ज्ञात कीजिए: 120 − [24 + {18 − (12 − 7)}] =',
      opts: ['83', '87', '79', '93'],
      exp: '12−7=5, 18−5=13, 24+13=37, 120−37=83.',
    },
  },
  {
    topic: 'Decimal BODMAS Mixed Expression',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the value of: 3.6 ÷ 0.9 + 2.5 × 4 − 1.8 =',
      opts: ['12.2', '14.2', '10.2', '12.8'],
      exp: '3.6 ÷ 0.9 = 4; 2.5 × 4 = 10; 4 + 10 − 1.8 = 12.2.',
    },
    mr: {
      q: 'पदावली सोडवा: ३.६ ÷ ०.९ + २.५ × ४ − १.८ =',
      opts: ['१२.२', '१४.२', '१०.२', '१२.८'],
      exp: '४ + १० − १.८ = १२.२.',
    },
    hi: {
      q: 'मान ज्ञात कीजिए: 3.6 ÷ 0.9 + 2.5 × 4 − 1.8 =',
      opts: ['12.2', '14.2', '10.2', '12.8'],
      exp: '4 + 10 − 1.8 = 12.2.',
    },
  },
  {
    topic: 'Fractional Difference Unknown Number',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'If 3/5 of a number exceeds 1/4 of that same number by 28, what is the number?',
      opts: ['80', '60', '100', '70'],
      exp: '(3/5 − 1/4)N = 28 -> (12−5)/20 × N = 28 -> 7/20 × N = 28 -> N = 28 × 20 ÷ 7 = 80.',
    },
    mr: {
      q: 'एका संख्येचा ३/५ भाग हा त्याच संख्येच्या १/४ भागापेक्षा २८ ने मोठा आहे, तर ती संख्या कोणती?',
      opts: ['८०', '६०', '१००', '७०'],
      exp: '(३/५ − १/४) = ७/२० भाग = २८; म्हणून पूर्ण संख्या = (२८ × २०) ÷ ७ = ८०.',
    },
    hi: {
      q: 'यदि किसी संख्या का 3/5 भाग उसी संख्या के 1/4 भाग से 28 अधिक है, तो वह संख्या क्या है?',
      opts: ['80', '60', '100', '70'],
      exp: '(3/5 − 1/4) = 7/20 भाग = 28; संख्या = 28 × 20 ÷ 7 = 80.',
    },
  },
  {
    topic: 'Fuel Cost For Total Trip Kilometres',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A car travels 18 km per litre of petrol. If petrol costs ₹102 per litre, what is the petrol bill for a 270 km journey?',
      opts: ['₹1,530', '₹1,480', '₹1,620', '₹1,560'],
      exp: 'Petrol needed = 270 ÷ 18 = 15 L. Cost = 15 × ₹102 = ₹1,530.',
    },
    mr: {
      q: 'एक गाडी १ लिटर पेट्रोलमध्ये १८ किमी जाते. पेट्रोलचा दर ₹१०२ प्रति लिटर असल्यास २७० किमी प्रवासासाठी पेट्रोलचा खर्च किती येईल?',
      opts: ['₹१,५३०', '₹१,४८०', '₹१,६२०', '₹१,५६०'],
      exp: 'लागणारे पेट्रोल = २७० ÷ १८ = १५ लिटर; खर्च = १५ × १०२ = ₹१,५३०.',
    },
    hi: {
      q: 'एक कार 1 लीटर पेट्रोल में 18 किमी चलती है। यदि पेट्रोल ₹102 प्रति लीटर है, तो 270 किमी की यात्रा का पेट्रोल खर्च कितना होगा?',
      opts: ['₹1,530', '₹1,480', '₹1,620', '₹1,560'],
      exp: 'पेट्रोल = 270 ÷ 18 = 15 लीटर; खर्च = 15 × 102 = ₹1,530.',
    },
  },
  {
    topic: 'Equal Area Square and Rectangle Perimeter',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'A square has perimeter 48 cm. A rectangle of length 16 cm has the EXACT SAME area as this square. Find the perimeter of the rectangle.',
      opts: ['50 cm', '48 cm', '52 cm', '44 cm'],
      exp: 'Square side = 48 ÷ 4 = 12 cm -> area = 144 sq cm. Rectangle breadth = 144 ÷ 16 = 9 cm -> perimeter = 2(16 + 9) = 50 cm.',
    },
    mr: {
      q: 'एका चौरसाची परिमिती ४८ सेमी आहे. १६ सेमी लांबीच्या एका आयताचे क्षेत्रफळ या चौरसाच्या क्षेत्रफळाएवढेच असल्यास आयताची परिमिती किती?',
      opts: ['५० सेमी', '४८ सेमी', '५२ सेमी', '४४ सेमी'],
      exp: 'चौरसाची बाजू = १२ सेमी -> क्षेत्रफळ = १४४ चौ.सेमी. आयताची रुंदी = १४४÷१६ = ९ सेमी -> परिमिती = २(१६+९) = ५० सेमी.',
    },
    hi: {
      q: 'एक वर्ग का परिमाप 48 सेमी है। 16 सेमी लंबे एक आयत का क्षेत्रफल इस वर्ग के क्षेत्रफल के बराबर है। आयत का परिमाप क्या होगा?',
      opts: ['50 सेमी', '48 सेमी', '52 सेमी', '44 सेमी'],
      exp: 'वर्ग भुजा = 12 सेमी -> क्षेत्रफल = 144 वर्ग सेमी; आयत चौड़ाई = 9 सेमी; परिमाप = 2(16+9) = 50 सेमी।',
    },
  },
  {
    topic: 'Three-Way Ratio Share Extremes Difference',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: '₹1,800 is shared among A, B, and C in the ratio 2 : 3 : 4. How much MORE does C receive than A?',
      opts: ['₹400', '₹600', '₹200', '₹800'],
      exp: 'Total parts = 2 + 3 + 4 = 9 -> 1 part = ₹200. C − A = (4 − 2) × 200 = ₹400.',
    },
    mr: {
      q: '₹१,८०० हे अ, ब व क यांच्यात २ : ३ : ४ या प्रमाणात वाटल्यास क ला अ पेक्षा किती रुपये अधिक मिळतील?',
      opts: ['₹४००', '₹६००', '₹२००', '₹८००'],
      exp: 'एकूण ९ भाग = ₹१,८०० -> १ भाग = ₹२००. फरक = (४ − २) भाग = ₹४००.',
    },
    hi: {
      q: '₹1,800 को A, B और C में 2 : 3 : 4 के अनुपात में बाँटा गया। C को A से कितने रुपये अधिक मिले?',
      opts: ['₹400', '₹600', '₹200', '₹800'],
      exp: 'कुल 9 भाग = ₹1,800; 1 भाग = ₹200; C − A = 2 भाग = ₹400.',
    },
  },
  {
    topic: 'Weighted Average Price of Rice Blend',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A grocer mixes 10 kg of rice costing ₹45/kg with 15 kg of rice costing ₹60/kg. What is the average cost per kg of the mixture?',
      opts: ['₹54/kg', '₹52.50/kg', '₹55/kg', '₹53/kg'],
      exp: 'Total cost = (10 × 45) + (15 × 60) = 450 + 900 = ₹1,350. Total mass = 25 kg. Price/kg = 1,350 ÷ 25 = ₹54/kg.',
    },
    mr: {
      q: 'एका दुकानदाराने ₹४५ प्रति किलो दराचा १० किलो तांदूळ व ₹६० प्रति किलो दराचा १५ किलो तांदूळ एकत्र मिसळला, तर मिश्रणाची सरासरी किंमत प्रति किलो किती?',
      opts: ['₹५४/किलो', '₹५२.५०/किलो', '₹५५/किलो', '₹५३/किलो'],
      exp: 'एकूण किंमत = ४५० + ९०० = ₹१,३५०; एकूण वजन = २५ किलो; दर = ₹५४/किलो.',
    },
    hi: {
      q: 'एक किराना व्यापारी ₹45/किग्रा वाले 10 किग्रा चावल में ₹60/किग्रा वाला 15 किग्रा चावल मिलाता है। मिश्रण का औसत मूल्य प्रति किग्रा क्या होगा?',
      opts: ['₹54/किग्रा', '₹52.50/किग्रा', '₹55/किग्रा', '₹53/किग्रा'],
      exp: 'कुल मूल्य = 450 + 900 = ₹1,350; कुल भार = 25 किग्रा; औसत = 1350 ÷ 25 = ₹54/किग्रा।',
    },
  },
  {
    topic: 'Unequal Rope Split Word Problem',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A 60 m rope is cut into two pieces such that one piece is 14 m longer than the other. Find the length of the SHORTER piece.',
      opts: ['23 m', '37 m', '22 m', '26 m'],
      exp: 'Shorter piece = (60 − 14) ÷ 2 = 46 ÷ 2 = 23 m.',
    },
    mr: {
      q: '६० मीटर लांबीच्या दोरीचे दोन तुकडे असे केले की एक तुकडा दुसऱ्यापेक्षा १४ मीटरने मोठा आहे, तर लहान तुकड्याची लांबी किती?',
      opts: ['२३ मी', '३७ मी', '२२ मी', '२६ मी'],
      exp: 'लहान तुकडा = (६० − १४) ÷ २ = २३ मी.',
    },
    hi: {
      q: '60 मी लंबी रस्सी को दो टुकड़ों में इस तरह काटा गया कि एक टुकड़ा दूसरे से 14 मी लंबा है। छोटे टुकड़े की लंबाई क्या है?',
      opts: ['23 मी', '37 मी', '22 मी', '26 मी'],
      exp: 'छोटा टुकड़ा = (60 − 14) ÷ 2 = 23 मी।',
    },
  },
  {
    topic: 'Five Thursdays in Leap February',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In the leap year 2024, 1 February was a Thursday. How many Thursdays fell in February 2024?',
      opts: ['5', '4', '3', '6'],
      exp: 'Leap February has 29 days. Thursdays fell on 1, 8, 15, 22, and 29 February -> 5 Thursdays.',
    },
    mr: {
      q: '२०२४ या लीप वर्षात १ फेब्रुवारी रोजी गुरुवार होता, तर फेब्रुवारी २०२४ मध्ये एकूण किती गुरुवार आले?',
      opts: ['५', '४', '३', '६'],
      exp: 'लीप फेब्रुवारीत २९ दिवस असतात; गुरुवार १, ८, १५, २२ व २९ तारखेला आले = ५ गुरुवार.',
    },
    hi: {
      q: 'लीप वर्ष 2024 में 1 फरवरी को गुरुवार था। फरवरी 2024 में कुल कितने गुरुवार आए?',
      opts: ['5', '4', '3', '6'],
      exp: '29 दिन की फरवरी में 1, 8, 15, 22 और 29 को कुल 5 गुरुवार थे।',
    },
  },
  {
    topic: 'Painted 4x4x4 Cube Unpainted Core Cubes',
    pattern: 'Visual Reasoning',
    difficulty: 'Difficult',
    en: {
      q: 'A solid wooden cube of edge 4 cm is painted green on all 6 outer faces and then sliced into 64 identical 1 cm cubes. How many small cubes have ZERO painted faces?',
      opts: ['8', '16', '24', '12'],
      exp: 'Unpainted interior core has side (4 − 2) = 2 cubes -> 2 × 2 × 2 = 8 small cubes.',
    },
    mr: {
      q: '४ सेमी बाजू असलेल्या लाकडी घनाला सर्व बाजूंनी हिरवा रंग देऊन त्याचे १ सेमी बाजू असलेले ६४ लहान घन कापले, तर एकही पृष्ठ न रंगवलेले किती लहान घन असतील?',
      opts: ['८', '१६', '२४', '१२'],
      exp: 'आतील न रंगवलेला गाभा = (४ − २)³ = २³ = ८ घन.',
    },
    hi: {
      q: '4 सेमी भुजा वाले ठोस घन की सभी बाहरी सतहों को हरा रंगकर उसे 1 सेमी के 64 छोटे घनों में काटा गया। कितने छोटे घनों पर कोई भी सतह रंगी नहीं होगी?',
      opts: ['8', '16', '24', '12'],
      exp: 'भीतरी बिना रंगे घन = (4 − 2)³ = 2³ = 8.',
    },
  },
  {
    topic: 'Twin Water Pumps Combined Filling Time',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Pump A pours 18 litres per minute and Pump B pours 12 litres per minute into an empty 900-litre overhead tank. Working together, how many minutes will they take to fill the tank?',
      opts: ['30 minutes', '25 minutes', '36 minutes', '45 minutes'],
      exp: 'Combined rate = 18 + 12 = 30 L/min. Time = 900 ÷ 30 = 30 minutes.',
    },
    mr: {
      q: 'पंप अ मिनिटाला १८ लिटर व पंप ब मिनिटाला १२ लिटर पाणी भरतो. दोन्ही मिळून ९०० लिटरची रिकामी टाकी किती मिनिटांत भरतील?',
      opts: ['३० मिनिटे', '२५ मिनिटे', '३६ मिनिटे', '४५ मिनिटे'],
      exp: 'एकत्रित वेग = १८ + १२ = ३० लि/मि. वेळ = ९०० ÷ ३० = ३० मिनिटे.',
    },
    hi: {
      q: 'पंप A प्रति मिनट 18 लीटर तथा पंप B प्रति मिनट 12 लीटर पानी भरता है। दोनों मिलकर 900 लीटर की खाली टंकी को कितने मिनट में भरेंगे?',
      opts: ['30 मिनट', '25 मिनट', '36 मिनट', '45 मिनट'],
      exp: 'संयुक्त दर = 30 ली/मिनट; समय = 900 ÷ 30 = 30 मिनट।',
    },
  },
  {
    topic: 'Count of Two-Digit Multiples of Seven',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'How many 2-digit whole numbers are completely divisible by 7?',
      opts: ['13', '14', '12', '15'],
      exp: 'From 14 (7×2) up to 98 (7×14): count = 14 − 2 + 1 = 13 numbers.',
    },
    mr: {
      q: '७ ने निःशेष भाग जाणाऱ्या एकूण किती २-अंकी संख्या आहेत?',
      opts: ['१३', '१४', '१२', '१५'],
      exp: '१४ (७×२) पासून ९८ (७×१४) पर्यंत: १४ − २ + १ = १३ संख्या.',
    },
    hi: {
      q: '7 से पूर्णतः विभाज्य कुल कितनी 2-अंकीय संख्याएँ हैं?',
      opts: ['13', '14', '12', '15'],
      exp: '14 (7×2) से 98 (7×14) तक कुल 14 − 2 + 1 = 13 संख्याएँ हैं।',
    },
  },
  {
    topic: 'Fourth Proportional Unknown Value',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the value of x in the proportion: 15 : 25 :: 27 : x.',
      opts: ['45', '40', '54', '35'],
      exp: '15x = 25 × 27 -> x = (25 × 27) ÷ 15 = 5 × 9 = 45.',
    },
    mr: {
      q: '१५ : २५ :: २७ : x या प्रमाणात x ची किंमत किती?',
      opts: ['४५', '४०', '५४', '३५'],
      exp: '१५x = २५ × २७ -> x = ४५.',
    },
    hi: {
      q: 'समानुपात 15 : 25 :: 27 : x में x का मान ज्ञात कीजिए।',
      opts: ['45', '40', '54', '35'],
      exp: 'x = (25 × 27) ÷ 15 = 45.',
    },
  },
  {
    topic: 'Breakage Loss & Net Profit Percentage',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A trader buys 100 mud lamps (diyas) for ₹500. During transport, 10 break. He sells each unbroken lamp for ₹6. What is his net percentage profit?',
      opts: ['8%', '10%', '6%', '12%'],
      exp: 'Remaining = 90 lamps; Revenue = 90 × 6 = ₹540. Profit = ₹40 on ₹500 = (40/500)×100 = 8%.',
    },
    mr: {
      q: 'व्यापाऱ्याने १०० मातीच्या पणत्या ₹५०० ना घेतल्या. त्यांतील १० फुटल्या. उरलेल्या सर्व पणत्या ₹६ प्रमाणे विकल्यास त्याला शेकडा नफा किती झाला?',
      opts: ['८%', '१०%', '६%', '१२%'],
      exp: 'विक्री = ९० × ६ = ₹५४०; नफा = ₹४०. शेकडा नफा = (४० ÷ ५००) × १०० = ८%.',
    },
    hi: {
      q: 'एक व्यापारी ₹500 में 100 मिट्टी के दीये खरीदता है। रास्ते में 10 टूट गए। शेष दीयों को ₹6 प्रति दीये की दर से बेचने पर शुद्ध लाभ प्रतिशत क्या होगा?',
      opts: ['8%', '10%', '6%', '12%'],
      exp: 'विक्रय = 90 × 6 = ₹540; लाभ = ₹40; लाभ% = (40/500)×100 = 8%.',
    },
  },
  {
    topic: 'Electricity Meter Units & Fixed Charge Bill',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'An electric meter showed 4,386 units last month and shows 4,626 units this month. At ₹6.50 per unit plus a ₹90 fixed meter charge, what is the total monthly bill?',
      opts: ['₹1,650', '₹1,560', '₹1,620', '₹1,740'],
      exp: 'Units used = 4,626 − 4,386 = 240 units. Energy cost = 240 × 6.50 = ₹1,560. Total bill = 1,560 + 90 = ₹1,650.',
    },
    mr: {
      q: 'वीज मीटरचे मागील वाचन ४,३८६ युनिट व या महिन्याचे वाचन ४,६२६ युनिट आहे. प्रति युनिट ₹६.५० दर आणि ₹९० स्थिर आकार धरल्यास एकूण वीजबिल किती येईल?',
      opts: ['₹१,६५०', '₹१,५६०', '₹१,६२०', '₹१,७४०'],
      exp: 'वापरलेले युनिट = २४०; २४० × ६.५० = ₹१,५६०; अधिक ₹९० = ₹१,६५०.',
    },
    hi: {
      q: 'बिजली मीटर की पिछली रीडिंग 4,386 यूनिट और वर्तमान रीडिंग 4,626 यूनिट है। ₹6.50 प्रति यूनिट तथा ₹90 निश्चित शुल्क मिलाकर कुल बिल कितना होगा?',
      opts: ['₹1,650', '₹1,560', '₹1,620', '₹1,740'],
      exp: 'खपत = 240 यूनिट; 240 × 6.50 + 90 = 1,560 + 90 = ₹1,650.',
    },
  },
  {
    topic: 'Least Subtraction to Form Perfect Square',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'What LEAST whole number should be subtracted from 795 so that the resulting number becomes a perfect square?',
      opts: ['11', '14', '9', '16'],
      exp: '28² = 784 and 29² = 841. Subtract 795 − 784 = 11.',
    },
    mr: {
      q: '७९५ मधून कोणती लहानात लहान पूर्ण संख्या वजा केल्यास मिळणारी संख्या पूर्ण वर्ग असेल?',
      opts: ['११', '१४', '९', '१६'],
      exp: '२८² = ७८४; ७९५ − ७८४ = ११.',
    },
    hi: {
      q: '795 में से कौन-सी सबसे छोटी पूर्ण संख्या घटाई जाए कि प्राप्त संख्या एक पूर्ण वर्ग बन जाए?',
      opts: ['11', '14', '9', '16'],
      exp: '28² = 784; 795 − 784 = 11.',
    },
  },
  {
    topic: 'Dyadic Unit Fractions Series Sum',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum: 1/2 + 1/4 + 1/8 + 1/16 =',
      opts: ['15/16', '7/8', '13/16', '1 1/16'],
      exp: '(8 + 4 + 2 + 1) ÷ 16 = 15/16.',
    },
    mr: {
      q: 'बेरीज काढा: १/२ + १/४ + १/८ + १/१६ =',
      opts: ['१५/१६', '७/८', '१३/१६', '१ १/१६'],
      exp: '(८ + ४ + २ + १)/१६ = १५/१६.',
    },
    hi: {
      q: 'योगफल ज्ञात कीजिए: 1/2 + 1/4 + 1/8 + 1/16 =',
      opts: ['15/16', '7/8', '13/16', '1 1/16'],
      exp: '(8 + 4 + 2 + 1)/16 = 15/16.',
    },
  },
  {
    topic: 'Ratio of Minutes to Hours Simplification',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Express the ratio "36 minutes : 2 hours" in its simplest whole-number form.',
      opts: ['3 : 10', '18 : 1', '3 : 20', '9 : 25'],
      exp: '2 hours = 120 minutes. Ratio = 36 : 120 = (36 ÷ 12) : (120 ÷ 12) = 3 : 10.',
    },
    mr: {
      q: '"३६ मिनिटे : २ तास" या गुणोत्तराचे संक्षिप्त रूप कोणते?',
      opts: ['३ : १०', '१८ : १', '३ : २०', '९ : २५'],
      exp: '२ तास = १२० मिनिटे. ३६ : १२० = ३ : १०.',
    },
    hi: {
      q: '"36 मिनट : 2 घंटे" का सरलतम अनुपात क्या होगा?',
      opts: ['3 : 10', '18 : 1', '3 : 20', '9 : 25'],
      exp: '36 : 120 = 3 : 10.',
    },
  },
  {
    topic: 'Currency Note Denomination System Puzzle',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'A cashier pays ₹2,500 using ONLY ₹50 and ₹100 notes, handing over 35 notes in total. How many ₹100 notes are in the bundle?',
      opts: ['15', '20', '10', '18'],
      exp: 'If all 35 were ₹50 notes, total = ₹1,750. Extra ₹750 comes from swapping ₹50 -> ₹100 (+₹50 each): 750 ÷ 50 = 15 notes of ₹100.',
    },
    mr: {
      q: 'रोखपालाने केवळ ₹५० व ₹१०० च्या एकूण ३५ नोटांतून ₹२,५०० दिले, तर त्यांत ₹१०० च्या किती नोटा असतील?',
      opts: ['१५', '२०', '१०', '१८'],
      exp: 'सर्व ३५ नोटा ₹५० च्या असत्या तर ₹१,७५० होतात; वाढीव ₹७५० साठी ७५०÷५० = १५ नोटा ₹१०० च्या.',
    },
    hi: {
      q: 'एक कैशियर केवल ₹50 और ₹100 के कुल 35 नोटों में ₹2,500 का भुगतान करता है। बंडल में ₹100 के कितने नोट हैं?',
      opts: ['15', '20', '10', '18'],
      exp: 'यदि सभी ₹50 के होते तो ₹1,750 बनते; अतिरिक्त ₹750 ÷ 50 = 15 नोट ₹100 के होंगे।',
    },
  },
  {
    topic: 'Three-Sided Fencing Along Riverbank',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A rectangular orchard 30 m long and 18 m wide borders a straight stone river wall along one 30 m edge. What length of wire is needed for a single round of fencing along ONLY the remaining 3 open sides?',
      opts: ['66 m', '96 m', '78 m', '48 m'],
      exp: 'Open sides = 18 + 30 + 18 = 66 m.',
    },
    mr: {
      q: '३० मी लांब व १८ मी रुंद आयताकृती बागेच्या एका ३० मी बाजूला नदीची दगडी भिंत आहे. उरलेल्या फक्त ३ मोकळ्या बाजूंना एक पदरी तारेचे कुंपण घालायला किती तार लागेल?',
      opts: ['६६ मी', '९६ मी', '७८ मी', '४८ मी'],
      exp: 'तीन बाजू = १८ + ३० + १८ = ६६ मी.',
    },
    hi: {
      q: '30 मी लंबी और 18 मी चौड़ी बगिया की एक 30 मी भुजा सीधी नदी की दीवार से सटी है। शेष केवल 3 खुली भुजाओं पर एक चक्कर बाड़ लगाने हेतु कितना तार चाहिए?',
      opts: ['66 मी', '96 मी', '78 मी', '48 मी'],
      exp: '18 + 30 + 18 = 66 मी।',
    },
  },
  {
    topic: 'Cubical Rainwater Cistern Depth From Litres',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A cubical underground rainwater tank holds exactly 64,000 litres when completely full (1 cu m = 1,000 litres). What is its inner depth?',
      opts: ['4 m', '8 m', '16 m', '6 m'],
      exp: 'Volume = 64,000 ÷ 1,000 = 64 cu m. Cube edge = ∛64 = 4 m.',
    },
    mr: {
      q: 'घनाकृती भूमिगत पावसाळी टाकीत पूर्ण भरल्यावर ६४,००० लिटर पाणी मावते (१ घ.मी. = १,००० लि), तर त्या टाकीची आतील खोली किती?',
      opts: ['४ मी', '८ मी', '१६ मी', '६ मी'],
      exp: 'घनफळ = ६४ घ.मी.; बाजू = ∛६४ = ४ मी.',
    },
    hi: {
      q: 'एक घनाकार भूमिगत टंकी पूरी भरने पर 64,000 लीटर पानी रखती है (1 घन मी = 1,000 लीटर)। इसकी भीतरी गहराई कितनी है?',
      opts: ['4 मी', '8 मी', '16 मी', '6 मी'],
      exp: 'आयतन = 64 घन मी; भुजा = ∛64 = 4 मी।',
    },
  },
  {
    topic: 'Harmonic Average Speed Uphill & Downhill',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'A cyclist climbs a 12 km hill road at 4 km/h and descends the same 12 km road at 6 km/h. What is his AVERAGE speed for the entire 24 km round trip?',
      opts: ['4.8 km/h', '5.0 km/h', '4.5 km/h', '5.2 km/h'],
      exp: 'Up time = 12÷4 = 3 h; Down time = 12÷6 = 2 h. Total time = 5 h. Average speed = 24 ÷ 5 = 4.8 km/h.',
    },
    mr: {
      q: 'एक सायकलस्वार १२ किमी घाट रस्ता ४ किमी/तास वेगाने चढतो आणि तोच १२ किमी रस्ता ६ किमी/तास वेगाने उतरतो, तर संपूर्ण २४ किमी प्रवासाचा सरासरी वेग किती?',
      opts: ['४.८ किमी/तास', '५.० किमी/तास', '४.५ किमी/तास', '५.२ किमी/तास'],
      exp: 'एकूण वेळ = ३ + २ = ५ तास; एकूण अंतर = २४ किमी; सरासरी वेग = २४ ÷ ५ = ४.८ किमी/तास.',
    },
    hi: {
      q: 'एक साइकिल चालक 12 किमी चढ़ाई 4 किमी/घं से तय करता है और वही 12 किमी ढलान 6 किमी/घं से उतरता है। पूरी 24 किमी यात्रा की औसत चाल क्या है?',
      opts: ['4.8 किमी/घं', '5.0 किमी/घं', '4.5 किमी/घं', '5.2 किमी/घं'],
      exp: 'कुल समय = 3 + 2 = 5 घंटे; औसत चाल = 24 ÷ 5 = 4.8 किमी/घं।',
    },
  },
  {
    topic: 'Two-Digit Reversal Difference Property',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'When the digits of a two-digit number AB (with A > B) are reversed to form BA, the difference AB − BA equals 45. Find the value of (A − B).',
      opts: ['5', '4', '6', '9'],
      exp: '(10A + B) − (10B + A) = 9(A − B) = 45 -> A − B = 5 (for example, 72 − 27 = 45).',
    },
    mr: {
      q: 'AB या दोन-अंकी संख्येतील अंकांची अदलाबदल करून BA संख्या मिळवली असता AB − BA = ४५ येते (येथे A > B), तर (A − B) ची किंमत किती?',
      opts: ['५', '४', '६', '९'],
      exp: '९(A − B) = ४५ म्हणून A − B = ५.',
    },
    hi: {
      q: 'दो-अंकीय संख्या AB (जहाँ A > B) के अंक पलटने पर बनी संख्या BA से अंतर AB − BA = 45 आता है। (A − B) का मान ज्ञात कीजिए।',
      opts: ['5', '4', '6', '9'],
      exp: '9(A − B) = 45, अतः A − B = 5.',
    },
  },
  {
    topic: 'Comparing Four Mixed Expressions Magnitude',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following four expressions yields the GREATEST value?',
      opts: ['25% of 2,800', '(480 × 15) ÷ 12', '3/4 of 840', '0.65 × 1,000'],
      exp: 'Values: 25% of 2,800 = 700; 0.65×1,000 = 650; 3/4 of 840 = 630; (480×15)÷12 = 600.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या पदावलीची किंमत सर्वांत मोठी आहे?',
      opts: ['२,८०० चे २५%', '(४८० × १५) ÷ १२', '८४० चा ३/४', '०.६५ × १,०००'],
      exp: '२,८०० चे २५% = ७०० (इतर अनुक्रमे ६००, ६३०, ६५० आहेत).',
    },
    hi: {
      q: 'निम्न चार व्यंजकों में से किसका मान सबसे अधिक है?',
      opts: ['2,800 का 25%', '(480 × 15) ÷ 12', '840 का 3/4', '0.65 × 1,000'],
      exp: '2,800 का 25% = 700 सर्वाधिक है (बाकी 600, 630, 650 हैं)।',
    },
  },
  {
    topic: 'Daily Page Reading Completion Weekday',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Rohan starts reading a 336-page novel on a Monday, reading 24 pages every single day including weekends. On which day of the week will he finish the 336th page?',
      opts: ['Sunday', 'Monday', 'Saturday', 'Friday'],
      exp: '336 ÷ 24 = 14 exact days. Day 1 = Monday, Day 7 = Sunday, Day 14 = Sunday.',
    },
    mr: {
      q: 'रोहनने ३३६ पानांचे पुस्तक सोमवारी वाचायला सुरुवात केली व तो दररोज न चुकता २४ पाने वाचतो, तर ३३६ वे पान कोणत्या वारी वाचून पूर्ण होईल?',
      opts: ['रविवार', 'सोमवार', 'शनिवार', 'शुक्रवार'],
      exp: '३३६ ÷ २४ = १४ दिवस. दिवस १ = सोमवार -> दिवस ७ = रविवार -> दिवस १४ = रविवार.',
    },
    hi: {
      q: 'रोहन सोमवार से 336 पृष्ठों का उपन्यास पढ़ना शुरू करता है और बिना नागा प्रतिदिन 24 पृष्ठ पढ़ता है। वह 336वाँ पृष्ठ सप्ताह के किस दिन पूरा करेगा?',
      opts: ['रविवार', 'सोमवार', 'शनिवार', 'शुक्रवार'],
      exp: '336 ÷ 24 = 14 दिन। दिन 1 सोमवार है तो दिन 14 रविवार होगा।',
    },
  },
  {
    topic: 'Milk-Water Ratio After Dilution',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A 40-litre milk-and-water mixture has milk and water in the ratio 7 : 1. If 5 litres of extra water is poured in, what becomes the new ratio of milk to water?',
      opts: ['7 : 2', '5 : 2', '6 : 1', '8 : 3'],
      exp: 'Initially Milk = (7/8)×40 = 35 L, Water = 5 L. After adding 5 L water -> Water = 10 L. New ratio = 35 : 10 = 7 : 2.',
    },
    mr: {
      q: '४० लिटर दूध व पाण्याच्या मिश्रणात त्यांचे गुणोत्तर ७ : १ आहे. त्यात ५ लिटर अधिक पाणी मिसळल्यास दूध व पाण्याचे नवीन गुणोत्तर काय होईल?',
      opts: ['७ : २', '५ : २', '६ : १', '८ : ३'],
      exp: 'सुरुवातीला दूध ३५ लि व पाणी ५ लि; अधिक ५ लि पाण्यानंतर पाणी १० लि. नवीन गुणोत्तर = ३५ : १० = ७ : २.',
    },
    hi: {
      q: '40 लीटर दूध-पानी के मिश्रण में दूध और पानी का अनुपात 7 : 1 है। इसमें 5 लीटर अतिरिक्त पानी मिलाने पर नया अनुपात क्या होगा?',
      opts: ['7 : 2', '5 : 2', '6 : 1', '8 : 3'],
      exp: 'प्रारंभ में दूध = 35 ली, पानी = 5 ली; अब पानी = 10 ली; नया अनुपात = 35 : 10 = 7 : 2.',
    },
  },
  {
    topic: 'Equal Perimeter Hexagon to Square Side',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'A regular hexagon has sides of length 9 cm each. A square is drawn having the EXACT SAME perimeter as this hexagon. What is the side length of the square?',
      opts: ['13.5 cm', '12.5 cm', '14 cm', '13 cm'],
      exp: 'Hexagon perimeter = 6 × 9 = 54 cm. Square side = 54 ÷ 4 = 13.5 cm.',
    },
    mr: {
      q: 'एका नियमित षटकोनाची प्रत्येक बाजू ९ सेमी आहे. याच षटकोनाच्या परिमितीइतकीच परिमिती असलेल्या चौरसाची बाजू किती सेमी असेल?',
      opts: ['१३.५ सेमी', '१२.५ सेमी', '१४ सेमी', '१३ सेमी'],
      exp: 'षटकोनाची परिमिती = ६ × ९ = ५४ सेमी. चौरसाची बाजू = ५४ ÷ ४ = १३.५ सेमी.',
    },
    hi: {
      q: 'एक समषट्भुज की प्रत्येक भुजा 9 सेमी है। इसी षट्भुज के बराबर परिमाप वाले वर्ग की भुजा की लंबाई क्या होगी?',
      opts: ['13.5 सेमी', '12.5 सेमी', '14 सेमी', '13 सेमी'],
      exp: 'षट्भुज परिमाप = 6 × 9 = 54 सेमी; वर्ग भुजा = 54 ÷ 4 = 13.5 सेमी।',
    },
  },
];
