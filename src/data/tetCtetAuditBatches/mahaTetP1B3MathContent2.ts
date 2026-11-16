import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 2 (28 verified trilingual MCQs: Fractions, Decimals, Percentages, Ratios)
export const MAHA_TET_P1_B3_MATH_C2: CuratedTrilingualMcq[] = [
  {
    topic: 'Fraction of Remaining Quantity Water Drum',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A 24-litre water drum is 3/4 full. If 2/3 of the water currently in the drum is used for watering saplings, how many litres of water remain?',
      opts: ['6 L', '8 L', '12 L', '4 L'],
      exp: 'Water present = (3/4) × 24 = 18 L. Used = (2/3) × 18 = 12 L. Remaining = 18 − 12 = 6 L.',
    },
    mr: {
      q: '२४ लिटर क्षमतेचे पाण्याचे पिंप ३/४ भरलेले आहे. त्यातील उपलब्ध पाण्यापैकी २/३ पाणी रोपांना घातल्यास पिंपात किती लिटर पाणी शिल्लक राहील?',
      opts: ['६ लि', '८ लि', '१२ लि', '४ लि'],
      exp: 'सध्याचे पाणी = (३/४) × २४ = १८ लि. वापरले = (२/३) × १८ = १२ लि. शिल्लक = ६ लि.',
    },
    hi: {
      q: '24 लीटर क्षमता का एक ड्रम 3/4 भरा है। यदि उसमें मौजूद पानी का 2/3 भाग पौधों को सींचने में उपयोग किया जाए, तो कितना पानी शेष बचेगा?',
      opts: ['6 ली', '8 ली', '12 ली', '4 ली'],
      exp: 'मौजूद पानी = (3/4) × 24 = 18 ली. खर्च = (2/3) × 18 = 12 ली. शेष = 6 ली.',
    },
  },
  {
    topic: 'Sum of Mixed Fraction and Its Reciprocal',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the sum of 3 1/2 and its multiplicative inverse (reciprocal).',
      opts: ['3 11/14', '3 5/7', '4 1/14', '3 9/14'],
      exp: '3 1/2 = 7/2; reciprocal = 2/7. Sum = 7/2 + 2/7 = (49 + 4)/14 = 53/14 = 3 11/14.',
    },
    mr: {
      q: '३ १/२ आणि तिचा गुणाकार व्यस्त (Reciprocal) यांची बेरीज किती?',
      opts: ['३ ११/१४', '३ ५/७', '४ १/१४', '३ ९/१४'],
      exp: '३ १/२ = ७/२; व्यस्त = २/७. बेरीज = ७/२ + २/७ = ५३/१४ = ३ ११/१४.',
    },
    hi: {
      q: '3 1/2 और इसके गुणनात्मक प्रतिलोम (व्युत्क्रम) का योगफल कितना होगा?',
      opts: ['3 11/14', '3 5/7', '4 1/14', '3 9/14'],
      exp: '3 1/2 = 7/2; व्युत्क्रम = 2/7. योग = 7/2 + 2/7 = 53/14 = 3 11/14.',
    },
  },
  {
    topic: 'Decimal Grocery Bill & Balance Change',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Ramesh bought 3.5 kg of wheat at ₹36 per kg and 1.25 litres of cooking oil at ₹140 per litre. If he paid with a ₹500 note, how much change did he get back?',
      opts: ['₹199', '₹201', '₹189', '₹209'],
      exp: 'Wheat = 3.5 × 36 = ₹126; Oil = 1.25 × 140 = ₹175. Total = ₹301. Change = 500 − 301 = ₹199.',
    },
    mr: {
      q: 'रमेशने ₹३६ प्रति किलो दराने ३.५ किलो गहू आणि ₹१४० प्रति लिटर दराने १.२५ लिटर तेल खरेदी केले. ५०० रुपयांची नोट दिल्यास दुकानदार किती रुपये परत देईल?',
      opts: ['₹१९९', '₹२०१', '₹१८९', '₹२०९'],
      exp: 'गहू = ३.५ × ३६ = ₹१२६; तेल = १.२५ × १४० = ₹१७५. एकूण = ₹३०१. परत रक्कम = ५०० − ३०१ = ₹१९९.',
    },
    hi: {
      q: 'रमेश ने ₹36 प्रति किग्रा की दर से 3.5 किग्रा गेहूँ और ₹140 प्रति लीटर की दर से 1.25 लीटर तेल खरीदा। ₹500 का नोट देने पर उसे कितने रुपये वापस मिलेंगे?',
      opts: ['₹199', '₹201', '₹189', '₹209'],
      exp: 'गेहूँ = ₹126, तेल = ₹175; कुल = ₹301. शेष = 500 − 301 = ₹199.',
    },
  },
  {
    topic: 'Ordering Distinct Fractions Descending',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Arrange the fractions 4/5, 7/10, 11/15, and 5/6 in DESCENDING order (greatest to smallest).',
      opts: [
        '5/6 > 4/5 > 11/15 > 7/10',
        '4/5 > 5/6 > 11/15 > 7/10',
        '5/6 > 11/15 > 4/5 > 7/10',
        '7/10 > 11/15 > 4/5 > 5/6',
      ],
      exp: 'Convert to denominator 30: 5/6 = 25/30, 4/5 = 24/30, 11/15 = 22/30, 7/10 = 21/30.',
    },
    mr: {
      q: '४/५, ७/१०, ११/१५ आणि ५/६ या अपूर्णांकांचा अचूक उतरता क्रम कोणता?',
      opts: [
        '५/६ > ४/५ > ११/१५ > ७/१०',
        '४/५ > ५/६ > ११/१५ > ७/१०',
        '५/६ > ११/१५ > ४/५ > ७/१०',
        '७/१० > ११/१५ > ४/५ > ५/६',
      ],
      exp: 'छेद ३० केल्यास: ५/६=२५/३०, ४/५=२४/३०, ११/१५=२२/३०, ७/१०=२१/३०.',
    },
    hi: {
      q: 'भिन्न 4/5, 7/10, 11/15 और 5/6 को अवरोही (घटते) क्रम में व्यवस्थित कीजिए।',
      opts: [
        '5/6 > 4/5 > 11/15 > 7/10',
        '4/5 > 5/6 > 11/15 > 7/10',
        '5/6 > 11/15 > 4/5 > 7/10',
        '7/10 > 11/15 > 4/5 > 5/6',
      ],
      exp: 'समान हर 30 करने पर: 5/6=25/30, 4/5=24/30, 11/15=22/30, 7/10=21/30.',
    },
  },
  {
    topic: 'Decimal Cloth Subtraction After Equal Cuts',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'From a 10.5 m cloth roll, a tailor cuts 6 equal pieces measuring 1.35 m each. How much cloth remains on the roll?',
      opts: ['2.4 m', '2.6 m', '1.9 m', '3.4 m'],
      exp: 'Cut length = 6 × 1.35 = 8.10 m. Remaining = 10.50 − 8.10 = 2.40 m.',
    },
    mr: {
      q: '१०.५ मीटर कापडाच्या ताग्यातून शिंप्याने १.३५ मीटर लांबीचे ६ समान तुकडे कापले, तर किती मीटर कापड शिल्लक राहील?',
      opts: ['२.४ मी', '२.६ मी', '१.९ मी', '३.४ मी'],
      exp: 'कापलेले कापड = ६ × १.३५ = ८.१० मी. शिल्लक = १०.५ − ८.१ = २.४ मी.',
    },
    hi: {
      q: '10.5 मीटर कपड़े के थान में से दर्ज़ी ने 1.35 मीटर लंबाई के 6 बराबर टुकड़े काटे। थान में कितना कपड़ा बचा?',
      opts: ['2.4 मी', '2.6 मी', '1.9 मी', '3.4 मी'],
      exp: 'काटा गया कपड़ा = 6 × 1.35 = 8.10 मी. शेष = 10.50 − 8.10 = 2.40 मी.',
    },
  },
  {
    topic: 'Fraction Strictly Between Two Fractions',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following fractions lies strictly between 3/7 and 5/9?',
      opts: ['1/2', '1/3', '2/5', '4/7'],
      exp: '3/7 ≈ 0.429 and 5/9 ≈ 0.556. Only 1/2 = 0.500 lies between them (since 3/7 = 6/14 < 7/14 and 9/18 < 10/18).',
    },
    mr: {
      q: 'खालीलपैकी कोणता अपूर्णांक ३/७ आणि ५/९ यांच्या नेमका मधोमध-दरम्यान येतो?',
      opts: ['१/२', '१/३', '२/५', '४/७'],
      exp: '३/७ (≈०.४२९) आणि ५/९ (≈०.५५६) यांच्या दरम्यान १/२ (०.५०) येतो.',
    },
    hi: {
      q: 'निम्न में से कौन-सी भिन्न 3/7 और 5/9 के ठीक बीच स्थित है?',
      opts: ['1/2', '1/3', '2/5', '4/7'],
      exp: '3/7 ≈ 0.429 और 5/9 ≈ 0.556; इनके बीच 1/2 = 0.500 आता है।',
    },
  },
  {
    topic: 'Classroom Percentage Absenteeism',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Out of 40 students enrolled in Class 5, 34 students attended school on a rainy day. What percentage of the class was ABSENT?',
      opts: ['15%', '12%', '20%', '85%'],
      exp: 'Absent students = 40 − 34 = 6. Absent % = (6 ÷ 40) × 100 = 15%.',
    },
    mr: {
      q: 'इ. ५ वीच्या ४० पटापैकी पावसाळ्याच्या दिवशी ३४ विद्यार्थी हजर होते, तर त्या दिवशी किती टक्के विद्यार्थी गैरहजर होते?',
      opts: ['१५%', '१२%', '२०%', '८५%'],
      exp: 'गैरहजर = ४० − ३४ = ६. टक्केवारी = (६ ÷ ४०) × १०० = १५%.',
    },
    hi: {
      q: 'कक्षा 5 के कुल 40 विद्यार्थियों में से बरसात के दिन 34 उपस्थित थे। उस दिन कितने प्रतिशत विद्यार्थी अनुपस्थित थे?',
      opts: ['15%', '12%', '20%', '85%'],
      exp: 'अनुपस्थित = 40 − 34 = 6. प्रतिशत = (6 ÷ 40) × 100 = 15%.',
    },
  },
  {
    topic: 'Comparing Percentages From Different Totals',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Meena scored 144 marks out of 180 in Marathi, while Raju scored 108 marks out of 150 in Mathematics. By how many percentage points is Meena’s score higher than Raju’s?',
      opts: ['8%', '6%', '12%', '10%'],
      exp: 'Meena = (144/180)×100 = 80%. Raju = (108/150)×100 = 72%. Difference = 80% − 72% = 8 percentage points.',
    },
    mr: {
      q: 'मीनाला मराठीत १८० पैकी १४४ गुण मिळाले आणि राजूला गणितात १५० पैकी १०८ गुण मिळाले, तर मीनाची टक्केवारी राजूपेक्षा किती टक्क्यांनी जास्त आहे?',
      opts: ['८%', '६%', '१२%', '१०%'],
      exp: 'मीना = ८०% आणि राजू = ७२%. फरक = ८०% − ७२% = ८ टक्के.',
    },
    hi: {
      q: 'मीना को मराठी में 180 में से 144 अंक मिले और राजू को गणित में 150 में से 108 अंक। मीना का प्रतिशत राजू से कितना अधिक है?',
      opts: ['8%', '6%', '12%', '10%'],
      exp: 'मीना = 80%, राजू = 72%. अंतर = 80% − 72% = 8%.',
    },
  },
  {
    topic: 'Ratio Division Difference',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A prize of ₹720 is divided between Anita and Bharat in the ratio 5 : 4. How much MORE money does Anita receive than Bharat?',
      opts: ['₹80', '₹400', '₹320', '₹90'],
      exp: 'Sum of parts = 5 + 4 = 9. One part = 720 ÷ 9 = ₹80. Difference = 5 − 4 = 1 part = ₹80.',
    },
    mr: {
      q: '₹७२० हे अनिता व भरत यांच्यात ५ : ४ या प्रमाणात वाटले, तर अनिताला भरतपेक्षा किती रुपये जास्त मिळतील?',
      opts: ['₹८०', '₹४००', '₹३२०', '₹९०'],
      exp: 'एकूण भाग = ५ + ४ = ९. १ भाग = ७२० ÷ ९ = ₹८०. फरक = (५ − ४) भाग = ₹८०.',
    },
    hi: {
      q: '₹720 को अनिता और भरत में 5 : 4 के अनुपात में बाँटा गया। अनिता को भरत से कितने रुपये अधिक मिले?',
      opts: ['₹80', '₹400', '₹320', '₹90'],
      exp: 'कुल भाग = 5 + 4 = 9; 1 भाग = 720 ÷ 9 = ₹80. अंतर = (5 − 4) भाग = ₹80.',
    },
  },
  {
    topic: 'Decimal Multiplication & Division Evaluation',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Evaluate: (0.72 × 1.5) ÷ 0.09 =',
      opts: ['12', '1.2', '120', '1.8'],
      exp: '0.72 ÷ 0.09 = 72 ÷ 9 = 8. Then 8 × 1.5 = 12.',
    },
    mr: {
      q: 'किंमत काढा: (०.७२ × १.५) ÷ ०.०९ =',
      opts: ['१२', '१.२', '१२०', '१.८'],
      exp: '०.७२ ÷ ०.०९ = ८ आणि ८ × १.५ = १२.',
    },
    hi: {
      q: 'मान ज्ञात कीजिए: (0.72 × 1.5) ÷ 0.09 =',
      opts: ['12', '1.2', '120', '1.8'],
      exp: '0.72 ÷ 0.09 = 8, और 8 × 1.5 = 12.',
    },
  },
  {
    topic: 'Equivalent Fractions Missing Numerator',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'If x / 36 = 35 / 60, what is the value of x?',
      opts: ['21', '18', '24', '28'],
      exp: 'Simplify 35/60 = 7/12. Multiply numerator and denominator by 3: 7/12 = 21/36, so x = 21.',
    },
    mr: {
      q: 'जर x / ३६ = ३५ / ६०, तर x ची किंमत किती?',
      opts: ['२१', '१८', '२४', '२८'],
      exp: '३५/६० = ७/१२ = २१/३६, म्हणून x = २१.',
    },
    hi: {
      q: 'यदि x / 36 = 35 / 60 है, तो x का मान क्या है?',
      opts: ['21', '18', '24', '28'],
      exp: '35/60 = 7/12 = 21/36, अतः x = 21.',
    },
  },
  {
    topic: 'Addition of Three Mixed Fractions',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Three joined garden hoses have lengths 2 1/4 m, 3 2/3 m, and 1 5/12 m. Find their combined total length.',
      opts: ['7 1/3 m', '7 1/4 m', '6 5/6 m', '7 5/12 m'],
      exp: 'Sum whole parts: 2+3+1 = 6. Sum fractions (denominator 12): 3/12 + 8/12 + 5/12 = 16/12 = 1 1/3. Total = 7 1/3 m.',
    },
    mr: {
      q: '२ १/४ मी, ३ २/३ मी आणि १ ५/१२ मी लांबीच्या तीन नळ्या जोडल्यास त्यांची एकूण लांबी किती होईल?',
      opts: ['७ १/३ मी', '७ १/४ मी', '६ ५/६ मी', '७ ५/१२ मी'],
      exp: 'पूर्णांक २+३+१ = ६; अपूर्णांक ३/१२ + ८/१२ + ५/१२ = १६/१२ = १ १/३. एकूण = ७ १/३ मी.',
    },
    hi: {
      q: '2 1/4 मी, 3 2/3 मी और 1 5/12 मी लंबाई के तीन पाइप जोड़े गए हैं। उनकी कुल लंबाई ज्ञात कीजिए।',
      opts: ['7 1/3 मी', '7 1/4 मी', '6 5/6 मी', '7 5/12 मी'],
      exp: 'पूर्ण भाग = 2+3+1=6; भिन्न = (3+8+5)/12 = 16/12 = 1 1/3. कुल = 7 1/3 मी.',
    },
  },
  {
    topic: 'Discount Selling Price Calculation',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A school backpack has a marked price of ₹850 and is sold during a monsoon sale at a 12% discount. What is its selling price?',
      opts: ['₹748', '₹765', '₹738', '₹750'],
      exp: 'Discount = 12% of 850 = (12/100) × 850 = ₹102. Selling price = 850 − 102 = ₹748.',
    },
    mr: {
      q: '₹८५० छापील किंमत असलेल्या दप्तरावर १२% सूट मिळाल्यास ते दप्तर किती रुपयांना मिळेल?',
      opts: ['₹७४८', '₹७६५', '₹७३८', '₹७५०'],
      exp: 'सूट = ८५० चे १२% = ₹१०२. विक्री किंमत = ८५० − १०२ = ₹७४८.',
    },
    hi: {
      q: '₹850 अंकित मूल्य वाले स्कूल बैग पर 12% की छूट दी जाती है। उसका विक्रय मूल्य क्या होगा?',
      opts: ['₹748', '₹765', '₹738', '₹750'],
      exp: 'छूट = 850 का 12% = ₹102. विक्रय मूल्य = 850 − 102 = ₹748.',
    },
  },
  {
    topic: 'Profit Percentage Word Problem',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A shopkeeper buys 20 notebooks for ₹400 and sells each notebook at ₹25. What is his overall profit percentage?',
      opts: ['25%', '20%', '15%', '30%'],
      exp: 'Cost = ₹400; Total Selling Price = 20 × 25 = ₹500. Profit = ₹100. Profit % = (100 ÷ 400) × 100 = 25%.',
    },
    mr: {
      q: 'एका दुकानदाराने २० वह्या ₹४०० ना खरेदी केल्या व प्रत्येक वही ₹२५ ला विकली, तर त्याला शेकडा नफा किती झाला?',
      opts: ['२५%', '२०%', '१५%', '३०%'],
      exp: 'खरेदी = ₹४००; विक्री = २० × २५ = ₹५००. नफा = ₹१००. शेकडा नफा = (१०० ÷ ४००) × १०० = २५%.',
    },
    hi: {
      q: 'एक दुकानदार 20 कॉपियाँ ₹400 में खरीदता है और प्रत्येक को ₹25 में बेचता है। उसका लाभ प्रतिशत क्या है?',
      opts: ['25%', '20%', '15%', '30%'],
      exp: 'क्रय मूल्य = ₹400; विक्रय मूल्य = 20 × 25 = ₹500. लाभ = ₹100; लाभ% = (100/400)×100 = 25%.',
    },
  },
  {
    topic: 'Shaded Grid With Half-Squares Fraction',
    pattern: 'Visual Reasoning',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangle is partitioned into 24 equal unit squares. Inside it, 6 full squares and 4 triangular half-squares are shaded blue. What fraction of the entire rectangle is shaded blue?',
      opts: ['1/3', '5/12', '1/4', '3/8'],
      exp: 'Total shaded area = 6 + (4 × 0.5) = 8 unit squares out of 24. Fraction = 8/24 = 1/3.',
    },
    mr: {
      q: 'एका आयताचे २४ समान चौरस भाग केले आहेत. त्यापैकी ६ पूर्ण चौरस व ४ अर्धे त्रिकोणी भाग निळ्या रंगाने रंगवले आहेत, तर एकूण आयताचा किती भाग रंगवला आहे?',
      opts: ['१/३', '५/१२', '१/४', '३/८'],
      exp: 'एकूण रंगवलेले चौरस = ६ + (४ × १/२) = ८. अपूर्णांक = ८/२४ = १/३.',
    },
    hi: {
      q: 'एक आयत को 24 बराबर वर्गों में बाँटा गया है। इनमें 6 पूर्ण वर्ग और 4 आधे-वर्ग त्रिभुज नीले रंगे हैं। पूरे आयत का कितना भाग रंगा है?',
      opts: ['1/3', '5/12', '1/4', '3/8'],
      exp: 'कुल रंगा क्षेत्र = 6 + (4 × 0.5) = 8 वर्ग; भिन्न = 8/24 = 1/3.',
    },
  },
  {
    topic: 'Direct Proportion Ratio Scaling',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'To prepare lemon squash, 3 spoons of lemon syrup are mixed with 5 glasses of water. How many spoons of syrup are needed for 35 glasses of water to keep the exact same taste?',
      opts: ['21 spoons', '18 spoons', '25 spoons', '15 spoons'],
      exp: 'Water is scaled up 35 ÷ 5 = 7 times, so syrup = 3 × 7 = 21 spoons.',
    },
    mr: {
      q: 'लिंबू सरबतासाठी ५ ग्लास पाण्यात ३ चमचे सरबत रस मिसळतात, तर तीच चव ठेवण्यासाठी ३५ ग्लास पाण्यात किती चमचे रस मिसळावा?',
      opts: ['२१ चमचे', '१८ चमचे', '२५ चमचे', '१५ चमचे'],
      exp: 'पाणी ७ पट (३५ ÷ ५) घेतल्याने रसही ७ पट = ३ × ७ = २१ चमचे लागेल.',
    },
    hi: {
      q: 'नींबू शरबत बनाने में 5 गिलास पानी में 3 चम्मच रस मिलाया जाता है। वही स्वाद रखने के लिए 35 गिलास पानी में कितने चम्मच रस लगेगा?',
      opts: ['21 चम्मच', '18 चम्मच', '25 चम्मच', '15 चम्मच'],
      exp: 'पानी 35 ÷ 5 = 7 गुना है, अतः रस = 3 × 7 = 21 चम्मच।',
    },
  },
  {
    topic: 'Ordering Decimals Ascending',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Which list correctly orders these decimals from SMALLEST to GREATEST?',
      opts: [
        '0.045 < 0.405 < 0.45 < 0.504',
        '0.45 < 0.045 < 0.405 < 0.504',
        '0.045 < 0.45 < 0.405 < 0.504',
        '0.405 < 0.045 < 0.45 < 0.504',
      ],
      exp: 'Align to 3 decimal places: 0.045 < 0.405 < 0.450 < 0.504.',
    },
    mr: {
      q: 'खालीलपैकी दशांश अपूर्णांकांचा अचूक चढता क्रम कोणता?',
      opts: [
        '०.०४५ < ०.४०५ < ०.४५ < ०.५०४',
        '०.४५ < ०.०४५ < ०.४०५ < ०.५०४',
        '०.०४५ < ०.४५ < ०.४०५ < ०.५०४',
        '०.४०५ < ०.०४५ < ०.४५ < ०.५०४',
      ],
      exp: 'समान दशांश स्थळे घेतल्यास: ०.०४५ < ०.४०५ < ०.४५० < ०.५०४.',
    },
    hi: {
      q: 'निम्न दशमलव संख्याओं का सही बढ़ता (आरोही) क्रम कौन-सा है?',
      opts: [
        '0.045 < 0.405 < 0.45 < 0.504',
        '0.45 < 0.045 < 0.405 < 0.504',
        '0.045 < 0.45 < 0.405 < 0.504',
        '0.405 < 0.045 < 0.45 < 0.504',
      ],
      exp: 'तीन दशमलव स्थानों तक तुलना करने पर: 0.045 < 0.405 < 0.450 < 0.504.',
    },
  },
  {
    topic: 'Difference of Fractional Amounts',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'By how much does 1/3 of ₹900 exceed 2/5 of ₹600?',
      opts: ['₹60', '₹40', '₹80', '₹120'],
      exp: '(1/3) × 900 = ₹300; (2/5) × 600 = ₹240. Difference = 300 − 240 = ₹60.',
    },
    mr: {
      q: '₹९०० चा १/३ भाग हा ₹६०० च्या २/५ भागापेक्षा कितीने मोठा आहे?',
      opts: ['₹६०', '₹४०', '₹८०', '₹१२०'],
      exp: '९०० चा १/३ = ₹३०० आणि ६०० चा २/५ = ₹२४०. फरक = ३०० − २४० = ₹६०.',
    },
    hi: {
      q: '₹900 का 1/3 भाग, ₹600 के 2/5 भाग से कितना अधिक है?',
      opts: ['₹60', '₹40', '₹80', '₹120'],
      exp: '900 × (1/3) = ₹300 तथा 600 × (2/5) = ₹240. अंतर = ₹60.',
    },
  },
  {
    topic: 'Village Demographic Percentage Split',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'In a village of 2,500 residents, 42% are men, 38% are women, and the remaining residents are children. How many children live in the village?',
      opts: ['500', '450', '550', '600'],
      exp: 'Children % = 100% − (42% + 38%) = 20%. Number of children = (20/100) × 2,500 = 500.',
    },
    mr: {
      q: '२,५०० लोकसंख्येच्या गावात ४२% पुरुष, ३८% स्त्रिया आणि उरलेली मुले आहेत, तर गावात किती मुले आहेत?',
      opts: ['५००', '४५०', '५५०', '६००'],
      exp: 'मुलांचे प्रमाण = १००% − (४२+३८)% = २०%. संख्या = २,५०० चे २०% = ५००.',
    },
    hi: {
      q: '2,500 जनसंख्या वाले गाँव में 42% पुरुष, 38% महिलाएँ और शेष बच्चे हैं। गाँव में कुल कितने बच्चे हैं?',
      opts: ['500', '450', '550', '600'],
      exp: 'बच्चों का % = 100% − 80% = 20%. संख्या = 2,500 का 20% = 500.',
    },
  },
  {
    topic: 'Fraction to Percentage Conversion',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Express the fraction 7/8 as a percentage.',
      opts: ['87.5%', '78.5%', '82.5%', '85%'],
      exp: '(7/8) × 100% = 700 ÷ 8 = 87.5%.',
    },
    mr: {
      q: '७/८ हा अपूर्णांक टक्केवारीत (शेकडेवारीत) कसा लिहितात?',
      opts: ['८७.५%', '७८.५%', '८२.५%', '८५%'],
      exp: '(७/८) × १०० = ७०० ÷ ८ = ८७.५%.',
    },
    hi: {
      q: 'भिन्न 7/8 को प्रतिशत के रूप में व्यक्त कीजिए।',
      opts: ['87.5%', '78.5%', '82.5%', '85%'],
      exp: '(7/8) × 100 = 700 ÷ 8 = 87.5%.',
    },
  },
  {
    topic: 'Sequential Fractional Consumption',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A bottle contains 1.2 litres of drinking water. Sunita drinks 350 ml in the morning, and then drinks 2/5 of the REMAINING water at noon. How much water is left in the bottle?',
      opts: ['510 ml', '490 ml', '370 ml', '540 ml'],
      exp: 'Initial = 1,200 ml. After morning = 1,200 − 350 = 850 ml. Afternoon = (2/5) × 850 = 340 ml. Left = 850 − 340 = 510 ml.',
    },
    mr: {
      q: 'एका बाटलीत १.२ लिटर पाणी आहे. सुनीताने सकाळी ३५० मिली पाणी प्यायले व दुपारी उरलेल्या पाण्यापैकी २/५ भाग पाणी प्यायले, तर बाटलीत किती पाणी शिल्लक राहिले?',
      opts: ['५१० मिली', '४९० मिली', '३७० मिली', '५४० मिली'],
      exp: 'एकूण १,२०० मिली − ३५० = ८५० मिली शिल्लक. दुपारी = (२/५)×८५० = ३४० मिली. उरले = ५१० मिली.',
    },
    hi: {
      q: 'एक बोतल में 1.2 लीटर पानी है। सुनीता ने सुबह 350 मिली पानी पिया और दोपहर में शेष पानी का 2/5 भाग पिया। बोतल में कितना पानी बचा?',
      opts: ['510 मिली', '490 मिली', '370 मिली', '540 मिली'],
      exp: 'सुबह के बाद शेष = 1,200 − 350 = 850 मिली। दोपहर में पिया = (2/5)×850 = 340 मिली। बचा = 510 मिली.',
    },
  },
  {
    topic: 'Decimal Place Value Difference',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'In the decimal number 64.385, find the difference between the place value of 3 and the place value of 5.',
      opts: ['0.295', '0.305', '0.25', '0.2995'],
      exp: 'Place value of 3 = 0.3; Place value of 5 = 0.005. Difference = 0.300 − 0.005 = 0.295.',
    },
    mr: {
      q: '६४.३८५ या दशांश संख्येतील ३ या अंकाची स्थानिक किंमत व ५ या अंकाची स्थानिक किंमत यांतील फरक किती?',
      opts: ['०.२९५', '०.३०५', '०.२५', '०.२९९५'],
      exp: '३ ची स्थानिक किंमत = ०.३०० व ५ ची = ०.००५. फरक = ०.२९५.',
    },
    hi: {
      q: 'दशमलव संख्या 64.385 में अंक 3 के स्थानीय मान और अंक 5 के स्थानीय मान का अंतर क्या है?',
      opts: ['0.295', '0.305', '0.25', '0.2995'],
      exp: '3 का स्थानीय मान = 0.300 और 5 का = 0.005. अंतर = 0.295.',
    },
  },
  {
    topic: 'Mixed Fraction Subtraction Borrowing',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Subtract: 4 1/6 − 2 3/4 =',
      opts: ['1 5/12', '2 5/12', '1 7/12', '1 1/3'],
      exp: '25/6 − 11/4 = (50 − 33)/12 = 17/12 = 1 5/12.',
    },
    mr: {
      q: 'वजाबाकी करा: ४ १/६ − २ ३/४ =',
      opts: ['१ ५/१२', '२ ५/१२', '१ ७/१२', '१ १/३'],
      exp: '२५/६ − ११/४ = (५० − ३३)/१२ = १७/१२ = १ ५/१२.',
    },
    hi: {
      q: 'घटाइए: 4 1/6 − 2 3/4 =',
      opts: ['1 5/12', '2 5/12', '1 7/12', '1 1/3'],
      exp: '25/6 − 11/4 = (50 − 33)/12 = 17/12 = 1 5/12.',
    },
  },
  {
    topic: 'Part-to-Part Ratio From Whole Fraction',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'In a 48 kg grain sack containing only jowar and bajra, 3/8 of the weight is jowar. Find the ratio of the weight of jowar to the weight of bajra.',
      opts: ['3 : 5', '5 : 3', '3 : 8', '5 : 8'],
      exp: 'Jowar = (3/8) × 48 = 18 kg; Bajra = 48 − 18 = 30 kg. Ratio = 18 : 30 = 3 : 5.',
    },
    mr: {
      q: '४८ किलोच्या पोत्यात केवळ ज्वारी व बाजरी आहे. एकूण वजनाच्या ३/८ भाग ज्वारी असल्यास, ज्वारी व बाजरी यांच्या वजनाचे गुणोत्तर किती?',
      opts: ['३ : ५', '५ : ३', '३ : ८', '५ : ८'],
      exp: 'ज्वारी ३ भाग तर बाजरी ५ भाग (१ − ३/८ = ५/८), म्हणून गुणोत्तर ३ : ५ (१८ किलो : ३० किलो).',
    },
    hi: {
      q: '48 किग्रा की बोरी में केवल ज्वार और बाजरा है। यदि कुल वजन का 3/8 भाग ज्वार है, तो ज्वार और बाजरे के वजन का अनुपात क्या होगा?',
      opts: ['3 : 5', '5 : 3', '3 : 8', '5 : 8'],
      exp: 'ज्वार = 18 किग्रा, बाजरा = 30 किग्रा। अनुपात = 18 : 30 = 3 : 5.',
    },
  },
  {
    topic: 'Percentage Fare Increase',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A local bus ticket rose from ₹40 to ₹46. What is the percentage increase in the fare?',
      opts: ['15%', '12%', '6%', '16%'],
      exp: 'Increase = ₹6. % increase = (6 ÷ 40) × 100 = 15%.',
    },
    mr: {
      q: 'बसचे तिकीट ₹४० वरून ₹४६ झाले, तर तिकीट दरात किती टक्के वाढ झाली?',
      opts: ['१५%', '१२%', '६%', '१६%'],
      exp: 'वाढ = ₹६. शेकडा वाढ = (६ ÷ ४०) × १०० = १५%.',
    },
    hi: {
      q: 'बस का किराया ₹40 से बढ़कर ₹46 हो गया। किराये में कितने प्रतिशत की वृद्धि हुई?',
      opts: ['15%', '12%', '6%', '16%'],
      exp: 'वृद्धि = ₹6; प्रतिशत वृद्धि = (6 ÷ 40) × 100 = 15%.',
    },
  },
  {
    topic: 'Decimal Point Placement Multiplication',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Which multiplication expression equals 0.036?',
      opts: ['0.12 × 0.3', '1.2 × 0.3', '0.12 × 0.03', '12 × 0.03'],
      exp: '12 × 3 = 36 with 2 + 1 = 3 decimal places -> 0.12 × 0.3 = 0.036.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या गुणाकाराचे उत्तर ०.०३६ येते?',
      opts: ['०.१२ × ०.३', '१.२ × ०.३', '०.१२ × ०.०३', '१२ × ०.०३'],
      exp: '१२ × ३ = ३६; एकूण ३ दशांश स्थळे म्हणून ०.१२ × ०.३ = ०.०३६.',
    },
    hi: {
      q: 'निम्न में से किस गुणनफल का मान 0.036 है?',
      opts: ['0.12 × 0.3', '1.2 × 0.3', '0.12 × 0.03', '12 × 0.03'],
      exp: '12 × 3 = 36 तथा कुल 3 दशमलव स्थान देने पर 0.12 × 0.3 = 0.036.',
    },
  },
  {
    topic: 'Combining Fraction and Percentage of Book Pages',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A storybook has 180 pages. Kunal read 4/9 of the book on Saturday and 25% of the total book on Sunday. How many pages are still unread?',
      opts: ['55', '65', '45', '50'],
      exp: 'Saturday = (4/9) × 180 = 80 pages; Sunday = 25% of 180 = 45 pages. Read = 125. Unread = 180 − 125 = 55.',
    },
    mr: {
      q: '१८० पानांच्या गोष्टीच्या पुस्तकातील ४/९ भाग कुणालने शनिवारी व संपूर्ण पुस्तकाच्या २५% पाने रविवारी वाचली, तर किती पाने वाचायची राहिली?',
      opts: ['५५', '६५', '४५', '५०'],
      exp: 'शनिवार = ८० पाने, रविवार = ४५ पाने; एकूण १२५ पाने वाचली. शिल्लक = १८० − १२५ = ५५.',
    },
    hi: {
      q: 'एक पुस्तक में 180 पृष्ठ हैं। कुणाल ने शनिवार को 4/9 भाग और रविवार को पूरी पुस्तक का 25% पढ़ा। कितने पृष्ठ पढ़ने शेष हैं?',
      opts: ['55', '65', '45', '50'],
      exp: 'शनिवार = 80, रविवार = 45; कुल पढ़े = 125. शेष = 180 − 125 = 55.',
    },
  },
  {
    topic: 'Proportional Recipe Scaling With Fractions',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Making 8 festive laddoos requires 3/4 cup of ghee. How many cups of ghee are needed to make 24 laddoos?',
      opts: ['2 1/4 cups', '1 3/4 cups', '2 1/2 cups', '3 cups'],
      exp: '24 laddoos = 3 × 8 laddoos, so ghee = 3 × (3/4) = 9/4 = 2 1/4 cups.',
    },
    mr: {
      q: '८ लाडू करण्यासाठी ३/४ कप तूप लागते, तर तसेच २४ लाडू करण्यासाठी किती कप तूप लागेल?',
      opts: ['२ १/४ कप', '१ ३/४ कप', '२ १/२ कप', '३ कप'],
      exp: '२४ लाडू म्हणजे ३ पट; तूप = ३ × (३/४) = ९/४ = २ १/४ कप.',
    },
    hi: {
      q: '8 लड्डू बनाने में 3/4 कप घी लगता है। वैसे ही 24 लड्डू बनाने के लिए कितने कप घी चाहिए?',
      opts: ['2 1/4 कप', '1 3/4 कप', '2 1/2 कप', '3 कप'],
      exp: '24 लड्डू 3 गुना हैं, अतः घी = 3 × (3/4) = 9/4 = 2 1/4 कप।',
    },
  },
];
