import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 6 (32 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C6: CuratedTrilingualMcq[] = [
  {
    topic: 'Word to Standard Indian Numeral Form',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Write in standard numeral notation: Five lakh thirty thousand four hundred and nine.',
      opts: ['5,30,409', '5,03,409', '5,30,490', '53,409'],
      exp: 'Five lakh = 5,00,000; thirty thousand = 30,000; four hundred nine = 409 ⇒ 5,30,409.',
    },
    mr: {
      q: '"पाच लाख तीस हजार चारशे नऊ" ही संख्या अंकांत अचूक कशी लिहाल?',
      opts: ['5,30,409', '5,03,409', '5,30,490', '53,409'],
      exp: '५,००,००० + ३०,००० + ४०९ = ५,३०,४०९.',
    },
    hi: {
      q: '"पाँच लाख तीस हजार चार सौ नौ" को अंकों में कैसे लिखा जाता है?',
      opts: ['5,30,409', '5,03,409', '5,30,490', '53,409'],
      exp: '५,३०,४०९।',
    },
  },
  {
    topic: 'Smallest Prime & Smallest Composite Product',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the product of the SMALLEST prime number and the SMALLEST composite number?',
      opts: ['8', '6', '4', '12'],
      exp: 'Smallest prime = 2 (note: 1 is neither prime nor composite). Smallest composite = 4. Product = 2 × 4 = 8.',
    },
    mr: {
      q: 'सर्वात लहान मूळ संख्या व सर्वात लहान संयुक्त संख्या यांचा गुणाकार किती?',
      opts: ['8', '6', '4', '12'],
      exp: 'सर्वात लहान मूळ = २; सर्वात लहान संयुक्त = ४ (१ ही दोन्ही नाही). गुणाकार = २ × ४ = ८.',
    },
    hi: {
      q: 'सबसे छोटी अभाज्य संख्या तथा सबसे छोटी भाज्य संख्या का गुणनफल क्या है?',
      opts: ['8', '6', '4', '12'],
      exp: 'सबसे छोटी अभाज्य = २; सबसे छोटी भाज्य = ४। गुणनफल = २ × ४ = ८।',
    },
  },
  {
    topic: 'Multiplicative Inverse of Mixed Fraction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the multiplicative inverse (reciprocal) of the mixed fraction 2 and 3/5?',
      opts: ['5/13', '13/5', '5/6', '2 and 5/3'],
      exp: 'Convert to improper fraction first: (2 × 5 + 3)/5 = 13/5. Its reciprocal is 5/13 (since 13/5 × 5/13 = 1).',
    },
    mr: {
      q: '२ पूर्णांक ३/५ या पूर्णांकयुक्त अपूर्णांकाचा गुणाकार व्यस्त (Reciprocal) कोणता?',
      opts: ['5/13', '13/5', '5/6', '2 and 5/3'],
      exp: '२ पूर्णांक ३/५ = १३/५; त्याचा गुणाकार व्यस्त = ५/१३.',
    },
    hi: {
      q: 'मिश्र भिन्न २ सही ३/५ का गुणनात्मक प्रतिलोम (व्युत्क्रम) क्या है?',
      opts: ['5/13', '13/5', '5/6', '2 and 5/3'],
      exp: '२ सही ३/५ = १३/५; व्युत्क्रम = ५/१३।',
    },
  },
  {
    topic: 'Decimal Divided by Decimal',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Compute cleanly: 0.72 ÷ 0.09.',
      opts: ['8', '0.8', '80', '0.08'],
      exp: 'Multiply numerator and denominator by 100: (0.72 × 100) ÷ (0.09 × 100) = 72 ÷ 9 = 8.',
    },
    mr: {
      q: 'अचूक भागाकार करा: ०.७२ ÷ ०.०९ = ?',
      opts: ['8', '0.8', '80', '0.08'],
      exp: 'दोन्हीस १०० ने गुणून ७२ ÷ ९ = ८.',
    },
    hi: {
      q: 'मान ज्ञात कीजिए: ०.७२ ÷ ०.०९ = ?',
      opts: ['8', '0.8', '80', '0.08'],
      exp: '७२ ÷ ९ = ८।',
    },
  },
  {
    topic: 'Joined Two Squares Combined Perimeter',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Two identical square paper tiles each having a perimeter of 28 cm are placed edge-to-edge to form ONE rectangle. What is the perimeter of the resulting rectangle?',
      opts: ['42 cm', '56 cm', '49 cm', '35 cm'],
      exp: 'Each square side = 28 ÷ 4 = 7 cm. Joined rectangle is 14 cm × 7 cm ⇒ Perimeter = 2 × (14 + 7) = 42 cm.',
    },
    mr: {
      q: 'प्रत्येकी २८ सेमी परिमितीचे दोन सारखे चौरस कडेने चिकटवून एक आयत तयार केला, तर त्या नवीन आयताची परिमिती किती सेमी होईल?',
      opts: ['42 cm', '56 cm', '49 cm', '35 cm'],
      exp: 'प्रत्येक चौरस बाजू = ७ सेमी. नवीन आयत = १४ × ७ ⇒ परिमिती = २(१४ + ७) = ४२ सेमी.',
    },
    hi: {
      q: '२८ सेमी परिमाप वाले दो समान वर्गों को सटाकर एक आयत बनाया गया। नए आयत का परिमाप कितना होगा?',
      opts: ['42 cm', '56 cm', '49 cm', '35 cm'],
      exp: 'वर्ग भुजा = ७ सेमी। आयत = १४ × ७ सेमी ⇒ परिमाप = ४२ सेमी।',
    },
  },
  {
    topic: 'Square Area Side Metres to Centimetres',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A square prayer carpet covers an area of 81 square metres. Express the length of ONE side in centimetres.',
      opts: ['900 cm', '90 cm', '8,100 cm', '9 cm'],
      exp: 'Area = 81 m² ⇒ side = 9 m. Since 1 m = 100 cm, side = 9 × 100 = 900 cm.',
    },
    mr: {
      q: 'एका चौरसाकृती सतरंजीचे क्षेत्रफळ ८१ चौ.मीटर आहे. तिच्या एका बाजूची लांबी सेंटीमीटरमध्ये किती?',
      opts: ['900 cm', '90 cm', '8,100 cm', '9 cm'],
      exp: 'बाजू = ९ मीटर = ९ × १०० = ९०० सेंमी.',
    },
    hi: {
      q: 'एक वर्गाकार दरी का क्षेत्रफल ८१ वर्ग मीटर है। इसकी एक भुजा की लंबाई सेंटीमीटर में क्या होगी?',
      opts: ['900 cm', '90 cm', '8,100 cm', '9 cm'],
      exp: 'भुजा = ९ मी = ९०० सेमी।',
    },
  },
  {
    topic: 'Seconds to Minutes & Remaining Seconds',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Convert 500 seconds into exact minutes and seconds.',
      opts: ['8 minutes 20 seconds', '8 minutes 30 seconds', '7 minutes 80 seconds', '9 minutes 20 seconds'],
      exp: '500 ÷ 60 = 8 minutes (480 s) with 20 seconds remaining.',
    },
    mr: {
      q: '५०० सेकंद म्हणजे किती मिनिटे आणि किती सेकंद?',
      opts: ['8 minutes 20 seconds', '8 minutes 30 seconds', '7 minutes 80 seconds', '9 minutes 20 seconds'],
      exp: '८ × ६० = ४८० सेकंद + २० सेकंद = ५०० सेकंद.',
    },
    hi: {
      q: '५०० सेकंड को मिनट और सेकंड में बदलिए।',
      opts: ['8 minutes 20 seconds', '8 minutes 30 seconds', '7 minutes 80 seconds', '9 minutes 20 seconds'],
      exp: '५०० ÷ ६० = ८ मिनट २० सेकंड।',
    },
  },
  {
    topic: 'Ratio Across Mixed Capacity Units',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Find the simplified ratio of 300 mL to 1.5 litres.',
      opts: ['1 : 5', '200 : 1', '1 : 50', '3 : 15'],
      exp: 'Convert to same unit first: 1.5 L = 1,500 mL. Ratio = 300 : 1,500 = 1 : 5.',
    },
    mr: {
      q: '३०० मिलि चे १.५ लिटरशी संक्षिप्त गुणोत्तर किती?',
      opts: ['1 : 5', '200 : 1', '1 : 50', '3 : 15'],
      exp: '१.५ लिटर = १,५०० मिलि. गुणोत्तर = ३०० : १,५०० = १ : ५.',
    },
    hi: {
      q: '३०० मिली का १.५ लीटर से सरलतम अनुपात ज्ञात कीजिए।',
      opts: ['1 : 5', '200 : 1', '1 : 50', '3 : 15'],
      exp: '३०० : १,५०० = १ : ५।',
    },
  },
  {
    topic: 'Direct Proportion Water Tap Flow',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A steady tap fills a 120-litre drum in 8 minutes. At this constant rate, how many litres will it fill in 14 minutes?',
      opts: ['210 litres', '180 litres', '240 litres', '195 litres'],
      exp: 'Flow rate = 120 ÷ 8 = 15 L/min. In 14 minutes = 15 × 14 = 210 litres.',
    },
    mr: {
      q: 'एक नळ समान वेगाने ८ मिनिटांत १२० लिटरचे पिंप भरतो, तर १४ मिनिटांत किती लिटर पाणी भरेल?',
      opts: ['210 litres', '180 litres', '240 litres', '195 litres'],
      exp: '१ मिनिट = १५ लिटर; १४ × १५ = २१० लिटर.',
    },
    hi: {
      q: 'एक नल समान गति से ८ मिनट में १२० लीटर पानी भरता है। १४ मिनट में वह कितना पानी भरेगा?',
      opts: ['210 litres', '180 litres', '240 litres', '195 litres'],
      exp: '१५ ली/मिनट × १४ = २१० लीटर।',
    },
  },
  {
    topic: 'Percentage Increase in Library Stock',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'A village school library held 500 books last year and increased its collection by 12% this year. How many books are in the library now?',
      opts: ['560 books', '512 books', '550 books', '572 books'],
      exp: 'Increase = 12% of 500 = 60 books. New total = 500 + 60 = 560 books.',
    },
    mr: {
      q: 'एका शालेय ग्रंथालयात गेल्या वर्षी ५०० पुस्तके होती व यंदा १२% वाढ झाली. आता ग्रंथालयात एकूण किती पुस्तके आहेत?',
      opts: ['560 books', '512 books', '550 books', '572 books'],
      exp: 'वाढ = ५०० चे १२% = ६०. नवीन एकूण = ५०० + ६० = ५६० पुस्तके.',
    },
    hi: {
      q: 'एक पुस्तकालय में पिछले वर्ष ५०० पुस्तकें थीं और इस वर्ष १२% वृद्धि हुई। अब कुल कितनी पुस्तकें हैं?',
      opts: ['560 books', '512 books', '550 books', '572 books'],
      exp: 'वृद्धि = ६०; नई संख्या = ५०० + ६० = ५६० पुस्तकें।',
    },
  },
  {
    topic: 'Supplement vs Complement Angle Difference',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Find the difference between the SUPPLEMENT of 110° and the COMPLEMENT of 65°.',
      opts: ['45°', '25°', '70°', '35°'],
      exp: 'Supplement of 110° = 180° − 110° = 70°. Complement of 65° = 90° − 65° = 25°. Difference = 70° − 25° = 45°.',
    },
    mr: {
      q: '११०° च्या पूरक कोनाचे माप आणि ६५° च्या कोटीकोनाचे माप यांतील फरक किती अंश?',
      opts: ['45°', '25°', '70°', '35°'],
      exp: 'पूरक कोन = १८०° − ११०° = ७०°; कोटीकोन = ९०° − ६५° = २५°. फरक = ७०° − २५° = ४५°.',
    },
    hi: {
      q: '११०° के संपूरक कोण तथा ६५° के पूरक कोण में कितने अंश का अंतर है?',
      opts: ['45°', '25°', '70°', '35°'],
      exp: '७०° − २५° = ४५°।',
    },
  },
  {
    topic: 'Acute Angles of a Right-Angled Triangle',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In a right-angled triangle, one acute angle measures 37°. What is the measure of the other acute angle?',
      opts: ['53°', '63°', '43°', '143°'],
      exp: 'Sum of triangle angles = 180° ⇒ Remaining two acute angles sum to 90°. Other acute = 90° − 37° = 53°.',
    },
    mr: {
      q: 'एका काटकोन त्रिकोणातील एका लघुकोनाचे माप ३७° असल्यास दुसऱ्या लघुकोनाचे माप किती?',
      opts: ['53°', '63°', '43°', '143°'],
      exp: 'दोन लघुकोनांची बेरीज = ९०°. दुसरा कोन = ९०° − ३७° = ५३°.',
    },
    hi: {
      q: 'एक समकोण त्रिभुज का एक न्यूनकोण ३७° है, तो दूसरे न्यूनकोण की माप क्या होगी?',
      opts: ['53°', '63°', '43°', '143°'],
      exp: '९०° − ३७° = ५३°।',
    },
  },
  {
    topic: 'Circle Chord vs Diameter Conceptual Truth',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which statement about chords and diameters of a circle is ALWAYS TRUE?',
      opts: [
        'Every diameter is a chord, and the diameter is the longest chord of the circle',
        'Every chord of a circle passes through its centre',
        'A circle can have only two equal diameters',
        'A radius connects two points on the boundary without touching the centre',
      ],
      exp: 'A chord joins any two points on the circle. A diameter passes through the centre and is the longest possible chord.',
    },
    mr: {
      q: 'वर्तुळाची जीवा (Chord) आणि व्यास (Diameter) यांबाबत कोणते विधान नेहमी सत्य आहे?',
      opts: [
        'प्रत्येक व्यास ही जीवा असते व व्यास ही वर्तुळाची सर्वात मोठी जीवा असते',
        'प्रत्येक जीवा ही वर्तुळाच्या केंद्रातून जाते',
        'एका वर्तुळाला फक्त दोनच व्यास असतात',
        'त्रिज्या केंद्राला स्पर्श न करता परिघावरील दोन बिंदू जोडते',
      ],
      exp: 'केंद्रातून जाणारी जीवा म्हणजे व्यास व तो वर्तुळाची सर्वात लांब जीवा असते.',
    },
    hi: {
      q: 'वृत्त की जीवा तथा व्यास के विषय में कौन-सा कथन सदैव सत्य है?',
      opts: [
        'प्रत्येक व्यास एक जीवा है तथा यह वृत्त की सबसे लंबी जीवा होती है',
        'प्रत्येक जीवा केंद्र से होकर गुजरती है',
        'वृत्त में केवल दो व्यास होते हैं',
        'त्रिज्या केंद्र को छुए बिना दो बिंदुओं को जोड़ती है',
      ],
      exp: 'केंद्र से गुजरने वाला व्यास वृत्त की सबसे बड़ी जीवा है।',
    },
  },
  {
    topic: 'Mixed Litre-Millilitre Addition & Subtraction',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Compute in litres: 3 L 450 mL + 2 L 850 mL − 1 L 700 mL.',
      opts: ['4.6 litres', '4.4 litres', '5.6 litres', '4.5 litres'],
      exp: '3.450 + 2.850 = 6.300 L; 6.300 − 1.700 = 4.600 litres = 4.6 litres.',
    },
    mr: {
      q: 'लिटरमध्ये उत्तर काढा: ३ लि. ४५० मिलि + २ लि. ८५० मिलि − १ लि. ७०० मिलि = ?',
      opts: ['4.6 litres', '4.4 litres', '5.6 litres', '4.5 litres'],
      exp: '६.३०० − १.७०० = ४.६ लिटर.',
    },
    hi: {
      q: 'लीटर में मान ज्ञात कीजिए: ३ ली ४५० मिली + २ ली ८५० मिली − १ ली ७०० मिली = ?',
      opts: ['4.6 litres', '4.4 litres', '5.6 litres', '4.5 litres'],
      exp: '६.३०० − १.७०० = ४.६ लीटर।',
    },
  },
  {
    topic: 'Calendar Weekday Shift Across Leap Feb 29',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'If 1st March 2023 fell on a Wednesday, on which day of the week did 1st March 2024 fall (crossing 29th February 2024)?',
      opts: ['Friday', 'Thursday', 'Saturday', 'Wednesday'],
      exp: 'From 1 Mar 2023 to 1 Mar 2024 spans 366 days because Feb 2024 had 29 days. 366 ÷ 7 leaves 2 odd days ⇒ Wednesday + 2 = Friday.',
    },
    mr: {
      q: '१ मार्च २०२३ रोजी बुधवार होता, तर १ मार्च २०२४ रोजी (फेब्रुवारी २०२४ मधील २९ तारीख ओलांडल्यामुळे) कोणता वार असेल?',
      opts: ['Friday', 'Thursday', 'Saturday', 'Wednesday'],
      exp: 'लीप २९ फेब्रुवारीमुळे ३६६ दिवस (२ जादा दिवस). बुधवार + २ = शुक्रवार.',
    },
    hi: {
      q: 'यदि १ मार्च २०२३ को बुधवार था, तो १ मार्च २०२४ को (२९ फरवरी २०२४ पार करने पर) कौन-सा दिन होगा?',
      opts: ['Friday', 'Thursday', 'Saturday', 'Wednesday'],
      exp: 'अधिवर्ष के कारण २ विषम दिन बढ़ेंगे। बुधवार + २ = शुक्रवार।',
    },
  },
  {
    topic: 'Simple Interest Time Duration Finding',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'In how many years will a principal of ₹1,500 earn ₹360 as simple interest at a rate of 8% per annum?',
      opts: ['3 years', '2.5 years', '4 years', '2 years'],
      exp: 'Annual interest = 8% of 1,500 = ₹120 per year. Time = 360 ÷ 120 = 3 years.',
    },
    mr: {
      q: '₹१,५०० मुद्दलावर द.सा.द.शे. ८ दराने ₹३६० सरळव्याज मिळण्यास किती वर्षे लागतील?',
      opts: ['3 years', '2.5 years', '4 years', '2 years'],
      exp: 'वार्षिक व्याज = ₹१२०; मुदत = ३६० ÷ १२० = ३ वर्षे.',
    },
    hi: {
      q: '₹१,५०० मूलधन पर ८% वार्षिक दर से कितने वर्षों में ₹३६० साधारण ब्याज प्राप्त होगा?',
      opts: ['3 years', '2.5 years', '4 years', '2 years'],
      exp: 'वार्षिक ब्याज = ₹१२०; समय = ३६० ÷ १२० = ३ वर्ष।',
    },
  },
  {
    topic: 'Average Temperature Weekdays Mean',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Afternoon temperatures from Monday to Friday were recorded as 30°C, 32°C, 34°C, 31°C, and 33°C. What was the mean temperature?',
      opts: ['32°C', '31°C', '33°C', '32.5°C'],
      exp: 'Sum = 30 + 32 + 34 + 31 + 33 = 160°C. Mean = 160 ÷ 5 = 32°C.',
    },
    mr: {
      q: 'सोमवार ते शुक्रवार अनुक्रमे ३०°C, ३२°C, ३४°C, ३१°C आणि ३३°C तापमान नोंदवले गेले. सरासरी तापमान किती?',
      opts: ['32°C', '31°C', '33°C', '32.5°C'],
      exp: 'एकूण बेरीज = १६०; सरासरी = १६० ÷ ५ = ३२°C.',
    },
    hi: {
      q: 'सोमवार से शुक्रवार का तापमान ३०°C, ३२°C, ३४°C, ३१°C व ३३°C रहा। औसत तापमान क्या था?',
      opts: ['32°C', '31°C', '33°C', '32.5°C'],
      exp: '१६० ÷ ५ = ३२°C।',
    },
  },
  {
    topic: 'Square Root Reverse Addition Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'If the positive square root of a number N is 17 (that is √N = 17), find the value of (N + 11).',
      opts: ['300', '289', '278', '311'],
      exp: 'N = 17² = 289. Therefore N + 11 = 289 + 11 = 300.',
    },
    mr: {
      q: 'जर √N = १७ असेल, तर (N + ११) ची किंमत किती?',
      opts: ['300', '289', '278', '311'],
      exp: 'N = १७² = २८९; २८९ + ११ = ३००.',
    },
    hi: {
      q: 'यदि √N = १७ हो, तो (N + ११) का मान ज्ञात कीजिए।',
      opts: ['300', '289', '278', '311'],
      exp: 'N = १७² = २८९; २८९ + ११ = ३००।',
    },
  },
  {
    topic: 'Sum Estimation to Nearest Thousand',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Estimate (3,892 + 5,148) by rounding EACH addend first to the nearest thousand.',
      opts: ['9,000', '10,000', '8,000', '9,100'],
      exp: '3,892 rounds up to 4,000; 5,148 rounds down to 5,000. Estimated sum = 4,000 + 5,000 = 9,000.',
    },
    mr: {
      q: 'दोन्ही संख्या जवळच्या हजारापर्यंत अंदाजित करून (३,८९२ + ५,१४८) ची अंदाजे बेरीज काढा.',
      opts: ['9,000', '10,000', '8,000', '9,100'],
      exp: '४,००० + ५,००० = ९,०००.',
    },
    hi: {
      q: 'दोनों संख्याओं को निकटतम हजार तक सन्निकट करके (३,८९२ + ५,१४८) का आकलित योग बताइए।',
      opts: ['9,000', '10,000', '8,000', '9,100'],
      exp: '४,००० + ५,००० = ९,०००।',
    },
  },
  {
    topic: 'Doubling Plus One Sequence Progression',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the next number in this pattern: 3, 7, 15, 31, 63, ___.',
      opts: ['127', '95', '126', '129'],
      exp: 'Rule is (previous × 2) + 1: 63 × 2 + 1 = 126 + 1 = 127.',
    },
    mr: {
      q: '३, ७, १५, ३१, ६३, ___ या मालिकेतील पुढील संख्या ओळखा.',
      opts: ['127', '95', '126', '129'],
      exp: 'नियम = (दुप्पट + १) ⇒ ६३ × २ + १ = १२७.',
    },
    hi: {
      q: 'श्रृंखला ३, ७, १५, ३१, ६३, ___ में अगला पद ज्ञात कीजिए।',
      opts: ['127', '95', '126', '129'],
      exp: '(पिछली संख्या × २) + १ ⇒ ६३ × २ + १ = १२७।',
    },
  },
  {
    topic: 'Multi-Item Grocery Bill Balance Change',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Kiran purchased 2 kg rice at ₹54/kg, 1.5 kg sugar at ₹42/kg, and 500 g tea leaves at ₹320/kg. How much change should she get from a ₹500 note?',
      opts: ['₹169', '₹179', '₹159', '₹331'],
      exp: 'Rice = 108; Sugar = 63; Tea = 0.5 × 320 = 160. Total = 108 + 63 + 160 = ₹331. Change = 500 − 331 = ₹169.',
    },
    mr: {
      q: 'किरणने ₹५४/किग्रॅ दराने २ किग्रॅ तांदूळ, ₹४२/किग्रॅ दराने १.५ किग्रॅ साखर व ₹३२०/किग्रॅ दराने ५०० ग्रॅम चहा घेतला. ₹५०० दिल्यास तिला किती रुपये परत मिळतील?',
      opts: ['₹169', '₹179', '₹159', '₹331'],
      exp: '१०८ + ६३ + १६० = ₹३३१ खर्च; ५०० − ३३१ = ₹१६९ परत.',
    },
    hi: {
      q: 'किरण ने ₹५४/किग्रा से २ किग्रा चावल, ₹४२/किग्रा से १.५ किग्रा चीनी तथा ₹३२०/किग्रा से ५०० ग्राम चाय खरीदी। ₹५०० के नोट से उसे कितने रुपये वापस मिलेंगे?',
      opts: ['₹169', '₹179', '₹159', '₹331'],
      exp: 'कुल बिल = १०८ + ६३ + १६० = ₹३३१; वापसी = ₹१६९।',
    },
  },
  {
    topic: '3D Solid Real-World Shape Matching',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A pointed conical birthday hat and a round chalk stick best resemble which pair of 3D solids respectively?',
      opts: ['Cone and Cylinder', 'Pyramid and Cube', 'Sphere and Cylinder', 'Cone and Cuboid'],
      exp: 'Birthday cap tapers to one apex from a circular base (Cone); chalk stick has two circular ends and a curved surface (Cylinder).',
    },
    mr: {
      q: 'वाढदिवसाची टोपी आणि फळ्यावर लिहिण्याची दंडगोलाकार खडूची कांडी अनुक्रमे कोणत्या त्रिमितीय आकारासारखे असतात?',
      opts: ['शंकू आणि दंडगोल (Cone and Cylinder)', 'पिरॅमिड आणि घन', 'गोल आणि दंडगोल', 'शंकू आणि इष्टिकाचिती'],
      exp: 'टोपी = शंकू; खडू = दंडगोल.',
    },
    hi: {
      q: 'जन्मदिन की टोपी और लिखने वाली चॉक की छड़ क्रमशः किन त्रि-आयामी ठोसों के उदाहरण हैं?',
      opts: ['शंकु तथा बेलन (Cone and Cylinder)', 'पिरामिड तथा घन', 'गोला तथा बेलन', 'शंकु तथा घनाभ'],
      exp: 'टोपी शंकु तथा चॉक बेलन का उदाहरण है।',
    },
  },
  {
    topic: 'Counting Common Factors of Two Numbers',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many positive whole numbers divide BOTH 24 and 36 completely with zero remainder?',
      opts: ['6 common factors', '4 common factors', '8 common factors', '5 common factors'],
      exp: 'Common factors = divisors of HCF(24, 36) = divisors of 12: {1, 2, 3, 4, 6, 12} ⇒ 6 numbers.',
    },
    mr: {
      q: '२४ आणि ३६ या दोन्ही संख्यांना पूर्ण भाग देणारे एकूण किती सामाईक विभाजक आहेत?',
      opts: ['6 common factors', '4 common factors', '8 common factors', '5 common factors'],
      exp: 'सामाईक विभाजक: १, २, ३, ४, ६, १२ असे एकूण ६ आहेत.',
    },
    hi: {
      q: '२४ तथा ३६ दोनों को पूर्णतः विभाजित करने वाले कुल कितने उभयनिष्ठ गुणनखंड हैं?',
      opts: ['6 common factors', '4 common factors', '8 common factors', '5 common factors'],
      exp: '{१, २, ३, ४, ६, १२} — कुल ६ उभयनिष्ठ गुणनखंड।',
    },
  },
  {
    topic: 'Egyptian Unit Fractions Sum to Unity',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum of the three unit fractions: 1/2 + 1/3 + 1/6.',
      opts: ['1', '3/11', '5/6', '1 and 1/6'],
      exp: 'LCM(2, 3, 6) = 6 ⇒ (3 + 2 + 1)/6 = 6/6 = 1.',
    },
    mr: {
      q: 'बेरीज काढा: १/२ + १/३ + १/६ = ?',
      opts: ['1', '3/11', '5/6', '1 and 1/6'],
      exp: '(३ + २ + १)/६ = ६/६ = १.',
    },
    hi: {
      q: 'योगफल ज्ञात कीजिए: १/२ + १/३ + १/६ = ?',
      opts: ['1', '3/11', '5/6', '1 and 1/6'],
      exp: '(३ + २ + १)/६ = ६/६ = १।',
    },
  },
  {
    topic: 'Square Fencing Wire Leaving Entrance Gate',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A square kitchen garden of side 35 m is to be fenced with ONE strand of barbed wire leaving a 4 m wide gap for the gate. How many metres of wire are needed?',
      opts: ['136 m', '140 m', '132 m', '126 m'],
      exp: 'Full perimeter = 4 × 35 = 140 m. Subtract 4 m gate ⇒ 140 − 4 = 136 m.',
    },
    mr: {
      q: '३५ मी बाजूच्या चौरसाकृती बागेभोवती दरवाजासाठी ४ मी मोकळी जागा सोडून एकपदरी कुंपण घालण्यास किती मीटर तार लागेल?',
      opts: ['136 m', '140 m', '132 m', '126 m'],
      exp: 'परिमिती १४० मी − ४ मी दरवाजा = १३६ मीटर.',
    },
    hi: {
      q: '३५ मी भुजा वाले वर्गाकार बगीचे में ४ मी का द्वार छोड़कर चारों ओर १-तार बाड़ लगाने में कितनी लंबी तार लगेगी?',
      opts: ['136 m', '140 m', '132 m', '126 m'],
      exp: '(४ × ३५) − ४ = १३६ मीटर।',
    },
  },
  {
    topic: 'Fractional Weight Calculation in Grams',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many grams equal 7/8 of 2 kilograms?',
      opts: ['1,750 g', '1,500 g', '1,625 g', '1,875 g'],
      exp: '2 kg = 2,000 g. (7/8) × 2,000 = 7 × 250 = 1,750 g.',
    },
    mr: {
      q: '२ किलोग्रॅमचा ७/८ भाग म्हणजे किती ग्रॅम?',
      opts: ['1,750 g', '1,500 g', '1,625 g', '1,875 g'],
      exp: '२,००० × (७/८) = १,७५० ग्रॅम.',
    },
    hi: {
      q: '२ किलोग्राम का ७/८ भाग कितने ग्राम होता है?',
      opts: ['1,750 g', '1,500 g', '1,625 g', '1,875 g'],
      exp: '२,००० × (७/८) = १,७५० ग्राम।',
    },
  },
  {
    topic: 'Cube Packing 3D Volume Division',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many solid wooden cubes of edge 5 cm fit inside a hollow cubical crate of inner edge 15 cm?',
      opts: ['27 cubes', '9 cubes', '15 cubes', '36 cubes'],
      exp: 'Along each dimension: 15 ÷ 5 = 3 cubes. Total = 3 × 3 × 3 = 27 cubes.',
    },
    mr: {
      q: '१५ सेमी बाजू असलेल्या मोठ्या घनाकृती खोक्यात ५ सेमी बाजूचे एकूण किती लहान घन मावतील?',
      opts: ['27 cubes', '9 cubes', '15 cubes', '36 cubes'],
      exp: '३ × ३ × ३ = २७ घन.',
    },
    hi: {
      q: '१५ सेमी आंतरिक भुजा वाले बड़े घनाकार बक्से में ५ सेमी भुजा के कितने छोटे घन समाएँगे?',
      opts: ['27 cubes', '9 cubes', '15 cubes', '36 cubes'],
      exp: '३ × ३ × ३ = २७ घन।',
    },
  },
  {
    topic: 'Roman Numeral Strictly Descending Sequence',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Which option shows Roman numerals arranged in STRICTLY DESCENDING (largest to smallest) order?',
      opts: [
        'LXX > LXIV > XLVIII > XXXIX',
        'LXX > XLVIII > LXIV > XXXIX',
        'LXIV > LXX > XLVIII > XXXIX',
        'XXXIX > XLVIII > LXIV > LXX',
      ],
      exp: 'Values: LXX = 70, LXIV = 64, XLVIII = 48, XXXIX = 39 ⇒ 70 > 64 > 48 > 39.',
    },
    mr: {
      q: 'खालीलपैकी कोणता पर्याय रोमन संख्यांचा अचूक उतरता क्रम दर्शवतो?',
      opts: [
        'LXX > LXIV > XLVIII > XXXIX',
        'LXX > XLVIII > LXIV > XXXIX',
        'LXIV > LXX > XLVIII > XXXIX',
        'XXXIX > XLVIII > LXIV > LXX',
      ],
      exp: '७० > ६४ > ४८ > ३९.',
    },
    hi: {
      q: 'कौन-सा विकल्प रोमन संख्याओं का सही अवरोही क्रम दर्शाता है?',
      opts: [
        'LXX > LXIV > XLVIII > XXXIX',
        'LXX > XLVIII > LXIV > XXXIX',
        'LXIV > LXX > XLVIII > XXXIX',
        'XXXIX > XLVIII > LXIV > LXX',
      ],
      exp: '७० > ६४ > ४८ > ३९।',
    },
  },
  {
    topic: 'Word Letters Reflection Symmetry Count',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In the capital block word "MATH", how many of the four letters possess at least ONE line of reflection symmetry?',
      opts: ['All 4 letters (M, A, T, H)', 'Only 3 letters', 'Only 2 letters', 'Only 1 letter'],
      exp: 'M, A, and T each have 1 vertical axis of symmetry, and H has both vertical and horizontal axes—all 4 letters are symmetric!',
    },
    mr: {
      q: '"MATH" या इंग्रजी शब्दातील किती मोठ्या अक्षरांना किमान एक सममिती अक्ष (Line of Symmetry) आहे?',
      opts: ['सर्व ४ अक्षरे (M, A, T, H)', 'फक्त ३ अक्षरे', 'फक्त २ अक्षरे', 'फक्त १ अक्षर'],
      exp: 'M, A, T यांना उभा व H ला दोन्ही सममिती अक्ष आहेत—सर्व ४ अक्षरे सममित आहेत.',
    },
    hi: {
      q: 'अंग्रेजी शब्द "MATH" के कितने बड़े अक्षरों में कम-से-कम एक सममिति रेखा होती है?',
      opts: ['सभी ४ अक्षर (M, A, T, H)', 'केवल ३ अक्षर', 'केवल २ अक्षर', 'केवल १ अक्षर'],
      exp: 'M, A, T में ऊर्ध्वाधर तथा H में दोनों अक्ष हैं—अतः चारों अक्षर सममित हैं।',
    },
  },
  {
    topic: 'Fractional Compass Rotation Reasoning',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Facing South-East (SE), a scout turns 3/4 of a full circle (270°) CLOCKWISE. Which direction does she face now?',
      opts: ['North-East (NE)', 'South-West (SW)', 'North-West (NW)', 'North (N)'],
      exp: 'Three 90° clockwise steps from SE: 1st → SW, 2nd → NW, 3rd → North-East (NE).',
    },
    mr: {
      q: 'आग्नेय (South-East) दिशेकडे तोंड करून उभी असलेली स्काऊट घड्याळाच्या काट्याच्या दिशेने पूर्ण वर्तुळाच्या ३/४ (२७०°) वळते. आता तिचे तोंड कोणत्या दिशेला आहे?',
      opts: ['ईशान्य (North-East)', 'नैऋत्य (South-West)', 'वायव्य (North-West)', 'उत्तर (North)'],
      exp: 'आग्नेय → (९०°) नैऋत्य → (१८०°) वायव्य → (२७०°) ईशान्य.',
    },
    hi: {
      q: 'दक्षिण-पूर्व (आग्नेय) दिशा में मुख किए एक स्काउट दक्षिणावर्त ३/४ घूर्णन (२७०°) करती है। अब उसका मुख किस दिशा में होगा?',
      opts: ['उत्तर-पूर्व (North-East)', 'दक्षिण-पश्चिम (SW)', 'उत्तर-पश्चिम (NW)', 'उत्तर (N)'],
      exp: 'आग्नेय से तीन ९०° दक्षिणावर्त कदम: नैऋत्य → वायव्य → उत्तर-पूर्व।',
    },
  },
  {
    topic: 'Reverse Arithmetic Number Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'When 14 is added to a certain secret number, the sum equals 50. What is HALF of that secret number?',
      opts: ['18', '36', '25', '32'],
      exp: 'Secret number = 50 − 14 = 36. Half of 36 = 36 ÷ 2 = 18.',
    },
    mr: {
      q: 'एका मनात धरलेल्या संख्येत १४ मिळवले असता बेरीज ५० येते, तर त्या मूळ संख्येची निम्मी संख्या कोणती?',
      opts: ['18', '36', '25', '32'],
      exp: 'मूळ संख्या = ५० − १४ = ३६; निम्मी = ३६ ÷ २ = १८.',
    },
    hi: {
      q: 'किसी संख्या में १४ जोड़ने पर योगफल ५० आता है। उस मूल संख्या का आधा क्या होगा?',
      opts: ['18', '36', '25', '32'],
      exp: 'मूल संख्या = ५० − १४ = ३६; आधा = १८।',
    },
  },
  {
    topic: 'Multiplicative Identity Property Identification',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which mathematical equation demonstrates the Multiplicative Identity property of whole numbers?',
      opts: ['47 × 1 = 47', '47 + 0 = 47', '47 × 0 = 0', '47 × 2 = 2 × 47'],
      exp: 'Multiplying any whole number by 1 preserves its identity (a × 1 = a); 1 is the Multiplicative Identity.',
    },
    mr: {
      q: 'खालीलपैकी कोणते समीकरण पूर्ण संख्यांचा "गुणाकारातील अखंडता नियम" (Multiplicative Identity) दर्शवते?',
      opts: ['47 × 1 = 47', '47 + 0 = 47', '47 × 0 = 0', '47 × 2 = 2 × 47'],
      exp: 'कोणत्याही संख्येस १ ने गुणल्यास तीच संख्या राहते; १ हा गुणाकार एकक (Multiplicative Identity) आहे.',
    },
    hi: {
      q: 'कौन-सा समीकरण पूर्ण संख्याओं के "गुणन तत्समक" (Multiplicative Identity) गुण को दर्शाता है?',
      opts: ['47 × 1 = 47', '47 + 0 = 47', '47 × 0 = 0', '47 × 2 = 2 × 47'],
      exp: 'किसी संख्या को १ से गुणा करने पर वही संख्या प्राप्त होती है।',
    },
  },
];
