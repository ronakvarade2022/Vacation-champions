import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 8 (28 verified trilingual MCQs: GST Bills, Brick Walls, Clocks, Remainders, L-Area, Proportions)
export const MAHA_TET_P1_B3_MATH_C8: CuratedTrilingualMcq[] = [
  {
    topic: 'Stationery Bill Including 12% GST',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A geometry instrument box has a base price of ₹250. If 12% GST is added to it at billing, what is the final amount payable?',
      opts: ['₹280', '₹262', '₹275', '₹290'],
      exp: 'GST = 12% of 250 = ₹30. Final payable = 250 + 30 = ₹280.',
    },
    mr: {
      q: 'एका कंपास पेटीची मूळ किंमत ₹२५० असून त्यावर १२% जीएसटी (GST) आकारल्यास ग्राहकाला एकूण किती रुपये द्यावे लागतील?',
      opts: ['₹२८०', '₹२६२', '₹२७५', '₹२९०'],
      exp: 'जीएसटी = २५० चे १२% = ₹३०; एकूण रक्कम = २५० + ३० = ₹२८०.',
    },
    hi: {
      q: 'एक ज्यामिति बॉक्स का मूल्य ₹250 है। बिल में 12% जीएसटी जुड़ने पर कुल देय राशि कितनी होगी?',
      opts: ['₹280', '₹262', '₹275', '₹290'],
      exp: 'GST = 250 का 12% = ₹30; कुल देय = 250 + 30 = ₹280.',
    },
  },
  {
    topic: 'Divisibility by 12 Check',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Which of the following 4-digit numbers is completely divisible by 12?',
      opts: ['3,456', '3,454', '3,458', '3,452'],
      exp: 'A multiple of 12 divides by both 4 and 3. For 3,456: last two digits 56 ÷ 4 = 14, and digit sum 3+4+5+6 = 18 ÷ 3 = 6.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या ४-अंकी संख्येला १२ ने निःशेष भाग जातो?',
      opts: ['३,४५६', '३,४५४', '३,४५८', '३,४५२'],
      exp: '१२ साठी ३ व ४ दोन्हीची कसोटी लागते: ५६ ÷ ४ = १४ व अंकांची बेरीज १८ ÷ ३ = ६ (३,४५६).',
    },
    hi: {
      q: 'निम्न में से कौन-सी 4-अंकीय संख्या 12 से पूर्णतः विभाज्य है?',
      opts: ['3,456', '3,454', '3,458', '3,452'],
      exp: '12 से कटने हेतु 3 व 4 दोनों से विभाज्यता चाहिए; 3,456 में 56÷4=14 व अंक-योग 18÷3=6 है।',
    },
  },
  {
    topic: 'Division of Two Mixed Fractions',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Divide: 3 3/4 ÷ 1 1/4 =',
      opts: ['3', '2 1/2', '3 1/4', '4'],
      exp: '(15/4) ÷ (5/4) = (15/4) × (4/5) = 3.',
    },
    mr: {
      q: 'भागाकार करा: ३ ३/४ ÷ १ १/४ =',
      opts: ['३', '२ १/२', '३ १/४', '४'],
      exp: '(१५/४) ÷ (५/४) = ३.',
    },
    hi: {
      q: 'भाग दीजिए: 3 3/4 ÷ 1 1/4 =',
      opts: ['3', '2 1/2', '3 1/4', '4'],
      exp: '(15/4) ÷ (5/4) = 3.',
    },
  },
  {
    topic: 'Volume of Wall Bricks Required',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'How many bricks measuring 25 cm × 10 cm × 10 cm are needed to construct a wall 6 m long, 2.5 m high, and 20 cm thick (neglecting mortar)?',
      opts: ['1,200', '1,000', '1,500', '2,400'],
      exp: 'Wall = 600 × 250 × 20 = 30,00,000 cu cm; 1 brick = 25×10×10 = 2,500 cu cm. Bricks = 30,00,000 ÷ 2,500 = 1,200.',
    },
    mr: {
      q: '६ मी लांब, २.५ मी उंच व २० सेमी जाड भिंत बांधण्यासाठी २५ सेमी × १० सेमी × १० सेमी मापाच्या किती विटा लागतील?',
      opts: ['१,२००', '१,०००', '१,५००', '२,४००'],
      exp: '(६०० × २५० × २०) ÷ (२५ × १० × १०) = २४ × २५ × २ = १,२०० विटा.',
    },
    hi: {
      q: '6 मी लंबी, 2.5 मी ऊँची और 20 सेमी मोटी दीवार बनाने के लिए 25 सेमी × 10 सेमी × 10 सेमी माप की कितनी ईंटें लगेंगी?',
      opts: ['1,200', '1,000', '1,500', '2,400'],
      exp: '(600 × 250 × 20) ÷ (25 × 10 × 10) = 1,200 ईंटें।',
    },
  },
  {
    topic: 'Decimal Subtraction From Hundred',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate: 100 − 36.475 =',
      opts: ['63.525', '64.525', '63.625', '64.475'],
      exp: '100.000 − 36.475 = 63.525.',
    },
    mr: {
      q: 'वजाबाकी करा: १०० − ३६.४७५ =',
      opts: ['६३.५२५', '६४.५२५', '६३.६२५', '६४.४७५'],
      exp: '१००.००० − ३६.४७५ = ६३.५२५.',
    },
    hi: {
      q: 'घटाइए: 100 − 36.475 =',
      opts: ['63.525', '64.525', '63.625', '64.475'],
      exp: '100.000 − 36.475 = 63.525.',
    },
  },
  {
    topic: 'Ratio of Savings to Expenditure',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Kaveri earns ₹18,000 per month and spends ₹13,500, saving the rest. What is the simplest ratio of her SAVINGS to her EXPENDITURE?',
      opts: ['1 : 3', '3 : 1', '1 : 4', '3 : 4'],
      exp: 'Savings = 18,000 − 13,500 = ₹4,500. Ratio = 4,500 : 13,500 = 1 : 3.',
    },
    mr: {
      q: 'कावेरी दरमहा ₹१८,००० कमावते आणि त्यांतील ₹१३,५०० खर्च करून उरलेले पैसे वाचवते, तर तिच्या बचतीचे तिच्या खर्चाशी गुणोत्तर किती?',
      opts: ['१ : ३', '३ : १', '१ : ४', '३ : ४'],
      exp: 'बचत = ₹४,५००; खर्च = ₹१३,५००. गुणोत्तर = १ : ३.',
    },
    hi: {
      q: 'कावेरी प्रति माह ₹18,000 कमाती हैं और ₹13,500 खर्च कर शेष बचाती हैं। उनकी बचत और खर्च का सरलतम अनुपात क्या है?',
      opts: ['1 : 3', '3 : 1', '1 : 4', '3 : 4'],
      exp: 'बचत = ₹4,500; खर्च = ₹13,500; अनुपात = 1 : 3.',
    },
  },
  {
    topic: 'Shortcut Diagonal Walk Distance Saved',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular playground is 80 m long and 60 m wide. How many metres does a runner save by sprinting straight across the diagonal corner-to-corner instead of walking along two edges?',
      opts: ['40 m', '20 m', '100 m', '30 m'],
      exp: 'Two edges = 80 + 60 = 140 m. Diagonal = √(80² + 60²) = 100 m. Distance saved = 140 − 100 = 40 m.',
    },
    mr: {
      q: '८० मी × ६० मी आयताकृती मैदानाच्या दोन बाजूंवरून चालत जाण्याऐवजी एका कोपऱ्यातून समोरील कोपऱ्यापर्यंत कर्णावरून सरळ गेल्यास किती मीटर अंतर वाचेल?',
      opts: ['४० मी', '२० मी', '१०० मी', '३० मी'],
      exp: 'बाजूंनी अंतर = ८० + ६० = १४० मी; कर्ण = √(८०²+६०²) = १०० मी; वाचलेले अंतर = ४० मी.',
    },
    hi: {
      q: '80 मी लंबे और 60 मी चौड़े आयताकार मैदान के दो किनारों पर चलने की बजाय कोने से विकर्ण पर सीधे दौड़ने से कितने मीटर दूरी बचेगी?',
      opts: ['40 मी', '20 मी', '100 मी', '30 मी'],
      exp: 'दो किनारे = 140 मी; विकर्ण = √(80²+60²) = 100 मी; बची दूरी = 40 मी।',
    },
  },
  {
    topic: 'Minute Hand Sweep Angle in 25 Minutes',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Through how many degrees does the MINUTE hand of a clock rotate from 07:10 a.m. to 07:35 a.m.?',
      opts: ['150°', '120°', '135°', '165°'],
      exp: 'Elapsed time = 25 minutes. At 6° per minute, angle = 25 × 6° = 150°.',
    },
    mr: {
      q: 'सकाळी ०७:१० पासून ०७:३५ पर्यंत घड्याळाचा मिनिटकाटा किती अंश फिरतो?',
      opts: ['१५०°', '१२०°', '१३५°', '१६५°'],
      exp: '२५ मिनिटे × ६° प्रति मिनिट = १५०°.',
    },
    hi: {
      q: 'प्रातः 07:10 से 07:35 तक घड़ी की मिनट सुई कितने अंश घूमेगी?',
      opts: ['150°', '120°', '135°', '165°'],
      exp: '25 मिनट × 6°/मिनट = 150°.',
    },
  },
  {
    topic: 'Fractional Partition of Mango Crate Weight',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A 32 kg basket of mangoes contains 3/8 ripe mangoes, 1/4 semi-ripe mangoes, and the remainder raw green mangoes. How many kilograms of raw green mangoes are in the basket?',
      opts: ['12 kg', '10 kg', '14 kg', '8 kg'],
      exp: 'Ripe = 12 kg; Semi-ripe = 8 kg. Raw green = 32 − (12 + 8) = 12 kg.',
    },
    mr: {
      q: '३२ किलो आंब्यांच्या टोपलीत ३/८ भाग पिकलेले आंबे, १/४ भाग अर्धवट पिकलेले व उरलेले कच्चे हिरवे आंबे आहेत, तर टोपलीत किती किलो कच्चे आंबे आहेत?',
      opts: ['१२ किलो', '१० किलो', '१४ किलो', '८ किलो'],
      exp: 'पिकलेले १२ कि + अर्धवट ८ कि = २० कि; कच्चे = ३२ − २० = १२ किलो.',
    },
    hi: {
      q: '32 किग्रा आम की टोकरी में 3/8 पके आम, 1/4 अधपके आम तथा शेष कच्चे हरे आम हैं। टोकरी में कितने किग्रा कच्चे आम हैं?',
      opts: ['12 किग्रा', '10 किग्रा', '14 किग्रा', '8 किग्रा'],
      exp: 'पके = 12 किग्रा, अधपके = 8 किग्रा; कच्चे = 32 − 20 = 12 किग्रा।',
    },
  },
  {
    topic: 'Square-Minus-One Sequence Completion',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the next number in the pattern: 0, 3, 8, 15, 24, 35, ___',
      opts: ['48', '46', '49', '45'],
      exp: 'n² − 1 pattern (1²−1, 2²−1, ..., 6²−1). Next term = 7² − 1 = 49 − 1 = 48.',
    },
    mr: {
      q: 'संख्यामालिका पूर्ण करा: ०, ३, ८, १५, २४, ३५, ___',
      opts: ['४८', '४६', '४९', '४५'],
      exp: 'प्रत्येक पद = n² − १; ७² − १ = ४८.',
    },
    hi: {
      q: 'श्रृंखला में अगला पद बताइए: 0, 3, 8, 15, 24, 35, ___',
      opts: ['48', '46', '49', '45'],
      exp: 'n² − 1 पैटर्न अनुसार अगला पद 7² − 1 = 48 होगा।',
    },
  },
  {
    topic: 'Complementary Angles in Given Ratio',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Two complementary angles are in the ratio 2 : 7. What is the measure of the LARGER angle?',
      opts: ['70°', '20°', '60°', '140°'],
      exp: 'Sum of complementary angles = 90°. Larger = (7/9) × 90° = 70°.',
    },
    mr: {
      q: 'दोन कोटिकोनांचे (Complementary angles) गुणोत्तर २ : ७ आहे, तर त्यांपैकी मोठ्या कोनाचे माप किती?',
      opts: ['७०°', '२०°', '६०°', '१४०°'],
      exp: 'कोटिकोनांची बेरीज = ९०°. मोठा कोन = (७/९) × ९०° = ७०°.',
    },
    hi: {
      q: 'दो पूरक कोण 2 : 7 के अनुपात में हैं। बड़े कोण की माप कितनी होगी?',
      opts: ['70°', '20°', '60°', '140°'],
      exp: 'दोनों का योग 90° है; बड़ा कोण = (7/9) × 90° = 70°.',
    },
  },
  {
    topic: 'Sum of Odd Multiples of Five Below Fifty',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum of all ODD multiples of 5 less than 50.',
      opts: ['125', '150', '100', '135'],
      exp: 'Odd multiples of 5 below 50: 5 + 15 + 25 + 35 + 45 = 125.',
    },
    mr: {
      q: '५० पेक्षा लहान असलेल्या ५ च्या सर्व विषम पटींची बेरीज किती?',
      opts: ['१२५', '१५०', '१००', '१३५'],
      exp: '५ + १५ + २५ + ३५ + ४५ = १२५.',
    },
    hi: {
      q: '50 से कम 5 के सभी विषम गुणजों का योग ज्ञात कीजिए।',
      opts: ['125', '150', '100', '135'],
      exp: '5 + 15 + 25 + 35 + 45 = 125.',
    },
  },
  {
    topic: 'Compound Proportion Workers Wages',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'If 6 workers earn ₹5,400 together in 3 days, how much will 4 workers earn in 5 days at the exact same daily wage rate?',
      opts: ['₹6,000', '₹4,800', '₹5,400', '₹7,200'],
      exp: 'Daily wage per worker = 5,400 ÷ (6 × 3) = ₹300. For 4 workers × 5 days = 20 × ₹300 = ₹6,000.',
    },
    mr: {
      q: '६ कामगार ३ दिवसांत एकत्रित ₹५,४०० मजुरी मिळवतात, तर त्याच दराने ४ कामगार ५ दिवसांत किती रुपये कमावतील?',
      opts: ['₹६,०००', '₹४,८००', '₹५,४००', '₹७,२००'],
      exp: 'प्रति कामगार प्रति दिन मजुरी = ५,४०० ÷ १८ = ₹३००. म्हणून ४ × ५ × ३०० = ₹६,०००.',
    },
    hi: {
      q: 'यदि 6 मज़दूर 3 दिनों में ₹5,400 कमाते हैं, तो उसी दैनिक दर से 4 मज़दूर 5 दिनों में कितने रुपये कमाएँगे?',
      opts: ['₹6,000', '₹4,800', '₹5,400', '₹7,200'],
      exp: 'एक मज़दूर की प्रतिदिन मजदूरी = ₹300; अतः 4 × 5 × 300 = ₹6,000.',
    },
  },
  {
    topic: 'Leap Years Across Century Boundary 1895–1915',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How many LEAP years occurred strictly between 1895 and 1915?',
      opts: ['4', '5', '3', '6'],
      exp: '1896, 1904, 1908, and 1912 are leap years (1900 is NOT a leap year because it is a century year not divisible by 400).',
    },
    mr: {
      q: '१८९५ ते १९१५ या कालावधीत एकूण किती लीप वर्षे आली?',
      opts: ['४', '५', '३', '६'],
      exp: '१८९६, १९०४, १९०८ व १९१२ अशी ४ लीप वर्षे (१९०० हे शतक वर्ष ४०० ने भाग जात नसल्याने लीप नव्हते).',
    },
    hi: {
      q: 'वर्ष 1895 से 1915 के बीच कुल कितने लीप वर्ष पड़े?',
      opts: ['4', '5', '3', '6'],
      exp: '1896, 1904, 1908 और 1912 कुल 4 लीप वर्ष थे (1900, 400 से विभाज्य न होने के कारण लीप नहीं था)।',
    },
  },
  {
    topic: 'Fraction Division Plus Half Simplification',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Simplify: (2/3 ÷ 4/9) + 1/2 =',
      opts: ['2', '1 1/2', '2 1/4', '1 3/4'],
      exp: '(2/3) × (9/4) = 3/2; 3/2 + 1/2 = 4/2 = 2.',
    },
    mr: {
      q: 'सोडवा: (२/३ ÷ ४/९) + १/२ =',
      opts: ['२', '१ १/२', '२ १/४', '१ ३/४'],
      exp: '(२/३ × ९/४) + १/२ = ३/२ + १/२ = २.',
    },
    hi: {
      q: 'सरल कीजिए: (2/3 ÷ 4/9) + 1/2 =',
      opts: ['2', '1 1/2', '2 1/4', '1 3/4'],
      exp: '(2/3 × 9/4) + 1/2 = 3/2 + 1/2 = 2.',
    },
  },
  {
    topic: 'Equilateral Triangle to Regular Octagon Side',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'An equilateral triangle has side 16 cm. A regular 8-sided octagon has the SAME perimeter as this triangle. What is the length of one side of the octagon?',
      opts: ['6 cm', '8 cm', '4 cm', '12 cm'],
      exp: 'Perimeter = 3 × 16 = 48 cm. Octagon side = 48 ÷ 8 = 6 cm.',
    },
    mr: {
      q: '१६ सेमी बाजू असलेल्या समभुज त्रिकोणाएवढीच परिमिती एका सुसम अष्टकोनाची असल्यास अष्टकोनाच्या प्रत्येक बाजूची लांबी किती?',
      opts: ['६ सेमी', '८ सेमी', '४ सेमी', '१२ सेमी'],
      exp: 'परिमिती = ३ × १६ = ४८ सेमी; अष्टकोन बाजू = ४८ ÷ ८ = ६ सेमी.',
    },
    hi: {
      q: '16 सेमी भुजा वाले समबाहु त्रिभुज के बराबर परिमाप वाले एक सम अष्टभुज की प्रत्येक भुजा की लंबाई क्या होगी?',
      opts: ['6 सेमी', '8 सेमी', '4 सेमी', '12 सेमी'],
      exp: 'परिमाप = 48 सेमी; अष्टभुज भुजा = 48 ÷ 8 = 6 सेमी।',
    },
  },
  {
    topic: 'Finding Marked Price Before Discount',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'After a 20% price reduction, an illustrated atlas sells for ₹160. What was its original marked price?',
      opts: ['₹200', '₹192', '₹180', '₹210'],
      exp: '80% of Marked Price = ₹160 -> Original Price = (160 ÷ 80) × 100 = ₹200.',
    },
    mr: {
      q: '२०% किमतीत कपात केल्यानंतर एक नकाशासंग्रह ₹१६० ना विकला गेला, तर त्याची मूळ छापील किंमत किती होती?',
      opts: ['₹२००', '₹१९२', '₹१८०', '₹२१०'],
      exp: '८०% = ₹१६० म्हणून १००% = (१६० ÷ ८०) × १०० = ₹२००.',
    },
    hi: {
      q: '20% मूल्य घटने के बाद एक एटलस ₹160 में बिकती है। इसका मूल अंकित मूल्य क्या था?',
      opts: ['₹200', '₹192', '₹180', '₹210'],
      exp: '80% = ₹160 -> 100% = (160 ÷ 80) × 100 = ₹200.',
    },
  },
  {
    topic: 'Nearest-Hundred Product Estimation',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Estimate the product 487 × 312 by rounding BOTH factors to the nearest hundred first.',
      opts: ['1,50,000', '1,20,000', '1,60,000', '1,40,000'],
      exp: '487 rounds to 500; 312 rounds to 300. Estimated product = 500 × 300 = 1,50,000.',
    },
    mr: {
      q: 'दोन्ही संख्या नजीकच्या शतकात पूर्णांकित करून ४८७ × ३१२ चा अंदाजे गुणाकार काढा.',
      opts: ['१,५०,०००', '१,२०,०००', '१,६०,०००', '१,४०,०००'],
      exp: '५०० × ३०० = १,५०,०००.',
    },
    hi: {
      q: 'दोनों संख्याओं को निकटतम सैकड़े तक सन्निकटित करके 487 × 312 का अनुमानित गुणनफल बताइए।',
      opts: ['1,50,000', '1,20,000', '1,60,000', '1,40,000'],
      exp: '500 × 300 = 1,50,000.',
    },
  },
  {
    topic: 'Total Hours in March Month',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'How many total hours are there in the entire month of March?',
      opts: ['744 hours', '720 hours', '696 hours', '730 hours'],
      exp: 'March has 31 days: 31 × 24 = 744 hours.',
    },
    mr: {
      q: 'संपूर्ण मार्च महिन्यात एकूण किती तास असतात?',
      opts: ['७४४ तास', '७२० तास', '६९६ तास', '७३० तास'],
      exp: 'मार्चचे ३१ दिवस × २४ तास = ७४४ तास.',
    },
    hi: {
      q: 'पूरे मार्च महीने में कुल कितने घंटे होते हैं?',
      opts: ['744 घंटे', '720 घंटे', '696 घंटे', '730 घंटे'],
      exp: '31 दिन × 24 घंटे = 744 घंटे।',
    },
  },
  {
    topic: 'Sum Remainder Modular Equivalence',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'When whole number p is divided by 7, the remainder is 4; when q is divided by 7, the remainder is 5. What remainder is left when (p + q) is divided by 7?',
      opts: ['2', '1', '3', '5'],
      exp: 'Add remainders: 4 + 5 = 9. Dividing 9 by 7 gives remainder 2.',
    },
    mr: {
      q: 'p ला ७ ने भागल्यास बाकी ४ व q ला ७ ने भागल्यास बाकी ५ उरते, तर (p + q) ला ७ ने भागल्यास बाकी किती उरेल?',
      opts: ['२', '१', '३', '५'],
      exp: 'बाकीची बेरीज = ४ + ५ = ९; ९ ÷ ७ केल्यास बाकी २ उरते.',
    },
    hi: {
      q: 'जब p को 7 से भाग दें तो शेष 4 और q को 7 से भाग दें तो शेष 5 बचता है। (p + q) को 7 से भाग देने पर क्या शेष बचेगा?',
      opts: ['2', '1', '3', '5'],
      exp: '(4 + 5) = 9; 9 को 7 से भाग देने पर शेष 2 बचेगा।',
    },
  },
  {
    topic: 'Empty Capacity Remaining in Cuboid Tank',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular tank measuring 40 cm × 25 cm × 30 cm is only 2/3 full of water. How many MORE litres of water are required to fill it right up to the brim?',
      opts: ['10 litres', '20 litres', '15 litres', '12 litres'],
      exp: 'Total capacity = 40×25×30 = 30,000 cu cm = 30 L. Empty fraction = 1/3 -> (1/3) × 30 L = 10 litres.',
    },
    mr: {
      q: '४० सेमी × २५ सेमी × ३० सेमी मापाची टाकी २/३ भरलेली आहे, तर ती काठोकाठ भरण्यासाठी आणखी किती लिटर पाणी लागेल?',
      opts: ['१० लिटर', '२० लिटर', '१५ लिटर', '१२ लिटर'],
      exp: 'एकूण क्षमता = ३०,००० घ.सेमी = ३० लिटर; रिकामा १/३ भाग = १० लिटर.',
    },
    hi: {
      q: '40 सेमी × 25 सेमी × 30 सेमी माप की टंकी 2/3 भरी है। इसे ऊपर तक पूरा भरने के लिए कितने लीटर और पानी चाहिए?',
      opts: ['10 लीटर', '20 लीटर', '15 लीटर', '12 लीटर'],
      exp: 'कुल क्षमता = 30,000 घन सेमी = 30 लीटर; खाली 1/3 भाग = 10 लीटर।',
    },
  },
  {
    topic: 'Room Floor Tiling Cost Per Square Metre',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A study room floor is 6.5 m long and 4 m wide. At ₹220 per sq m, what is the total cost of tiling the floor?',
      opts: ['₹5,720', '₹5,460', '₹4,620', '₹5,840'],
      exp: 'Area = 6.5 × 4 = 26 sq m. Cost = 26 × 220 = ₹5,720.',
    },
    mr: {
      q: '६.५ मी लांब व ४ मी रुंद खोलीच्या जमिनीवर प्रति चौ.मी. ₹२२० दराने फरशी बसवायला किती खर्च येईल?',
      opts: ['₹५,७२०', '₹५,४६०', '₹४,६२०', '₹५,८४०'],
      exp: 'क्षेत्रफळ = ६.५ × ४ = २६ चौ.मी.; खर्च = २६ × २२० = ₹५,७२०.',
    },
    hi: {
      q: '6.5 मी लंबे और 4 मी चौड़े कमरे के फर्श पर ₹220 प्रति वर्ग मी की दर से टाइल्स लगवाने का कुल खर्च कितना होगा?',
      opts: ['₹5,720', '₹5,460', '₹4,620', '₹5,840'],
      exp: 'क्षेत्रफल = 26 वर्ग मी; खर्च = 26 × 220 = ₹5,720.',
    },
  },
  {
    topic: 'Distinct Digits Four-Digit Even Minus Odd',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the difference between the GREATEST 4-digit EVEN number with all distinct digits and the SMALLEST 4-digit ODD number with all distinct digits.',
      opts: ['8,853', '8,851', '8,753', '8,953'],
      exp: 'Greatest 4-digit distinct even = 9,876. Smallest 4-digit distinct odd = 1,023. Difference = 9,876 − 1,023 = 8,853.',
    },
    mr: {
      q: 'सर्व भिन्न अंक असलेली सर्वांत मोठी ४-अंकी सम संख्या आणि सर्व भिन्न अंक असलेली सर्वांत लहान ४-अंकी विषम संख्या यांतील फरक किती?',
      opts: ['८,८५३', '८,८५१', '८,७५३', '८,९५३'],
      exp: '९,८७६ − १,०२३ = ८,८५३.',
    },
    hi: {
      q: 'सभी भिन्न अंकों वाली सबसे बड़ी 4-अंकीय सम संख्या और सभी भिन्न अंकों वाली सबसे छोटी 4-अंकीय विषम संख्या का अंतर कितना होगा?',
      opts: ['8,853', '8,851', '8,753', '8,953'],
      exp: '9,876 − 1,023 = 8,853.',
    },
  },
  {
    topic: 'New Mean After Removing One Observation',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'The average of 8 numbers is 25. If one number equal to 39 is removed, what is the average of the remaining 7 numbers?',
      opts: ['23', '24', '22', '21'],
      exp: 'Sum of 8 = 8 × 25 = 200. New sum = 200 − 39 = 161. New mean = 161 ÷ 7 = 23.',
    },
    mr: {
      q: '८ संख्यांची सरासरी २५ आहे. त्यांपैकी ३९ ही एक संख्या काढून टाकल्यास उरलेल्या ७ संख्यांची सरासरी किती?',
      opts: ['२३', '२४', '२२', '२१'],
      exp: 'एकूण बेरीज = २००; २०० − ३९ = १६१; नवीन सरासरी = १६१ ÷ ७ = २३.',
    },
    hi: {
      q: '8 संख्याओं का औसत 25 है। यदि एक संख्या 39 हटा दी जाए, तो शेष 7 संख्याओं का औसत क्या होगा?',
      opts: ['23', '24', '22', '21'],
      exp: 'कुल योग = 200; नया योग = 200 − 39 = 161; नया औसत = 161 ÷ 7 = 23.',
    },
  },
  {
    topic: 'Distance Covered in Minutes at Km/h Speed',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A local train maintains a steady speed of 72 km/h. How many kilometres does it travel in 35 minutes?',
      opts: ['42 km', '36 km', '45 km', '40 km'],
      exp: 'In 60 min -> 72 km, so 1.2 km/min. Distance in 35 min = 35 × 1.2 = 42 km.',
    },
    mr: {
      q: 'एक लोकल गाडी ७२ किमी/तास वेगाने धावत असल्यास ती ३५ मिनिटांत किती किमी अंतर पार करेल?',
      opts: ['४२ किमी', '३६ किमी', '४५ किमी', '४० किमी'],
      exp: '७२ × (३५ ÷ ६०) = ७२ × (७ ÷ १२) = ४२ किमी.',
    },
    hi: {
      q: 'एक लोकल ट्रेन 72 किमी/घं की एकसमान चाल से चल रही है। यह 35 मिनट में कितनी दूरी तय करेगी?',
      opts: ['42 किमी', '36 किमी', '45 किमी', '40 किमी'],
      exp: '72 × (35/60) = 42 किमी।',
    },
  },
  {
    topic: 'Composite L-Shaped Corridor Floor Area',
    pattern: 'Visual Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'An L-shaped hallway is formed cleanly by joining two non-overlapping rectangles: one measuring 10 m × 3 m and the other measuring 5 m × 4 m. Find the total area of the hallway.',
      opts: ['50 sq m', '48 sq m', '54 sq m', '45 sq m'],
      exp: '(10 × 3) + (5 × 4) = 30 + 20 = 50 sq m.',
    },
    mr: {
      q: '१० मी × ३ मी आणि ५ मी × ४ मी असे दोन न-ओलांडणारे आयत जोडून बनवलेल्या L-आकाराच्या मार्गिकेचे एकूण क्षेत्रफळ किती?',
      opts: ['५० चौ.मी.', '४८ चौ.मी.', '५४ चौ.मी.', '४५ चौ.मी.'],
      exp: '(१० × ३) + (५ × ४) = ३० + २० = ५० चौ.मी.',
    },
    hi: {
      q: '10 मी × 3 मी और 5 मी × 4 मी के दो गैर-अतिव्यापी आयतों को जोड़कर बने L-आकार के गलियारे का कुल क्षेत्रफल क्या है?',
      opts: ['50 वर्ग मी', '48 वर्ग मी', '54 वर्ग मी', '45 वर्ग मी'],
      exp: '30 + 20 = 50 वर्ग मी।',
    },
  },
  {
    topic: 'Distinct Prime Factors Count of 2,310',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'How many DISTINCT prime numbers divide 2,310 completely?',
      opts: ['5', '4', '6', '3'],
      exp: '2,310 = 2 × 3 × 5 × 7 × 11, which consists of 5 distinct prime factors.',
    },
    mr: {
      q: '२,३१० या संख्येला किती भिन्न मूळ संख्यांनी निःशेष भाग जातो?',
      opts: ['५', '४', '६', '३'],
      exp: '२,३१० = २ × ३ × ५ × ७ × ११, म्हणजे ५ भिन्न मूळ विभाजक.',
    },
    hi: {
      q: '2,310 को कुल कितनी भिन्न अभाज्य संख्याएँ पूर्णतः विभाजित करती हैं?',
      opts: ['5', '4', '6', '3'],
      exp: '2,310 = 2 × 3 × 5 × 7 × 11, अतः 5 भिन्न अभाज्य गुणनखंड हैं।',
    },
  },
  {
    topic: 'Sequential Fraction & Cash Balance',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Maya had ₹640 in her wallet. She gave 3/8 of it to her younger brother and then bought a fountain pen for ₹125. How much money is left with her?',
      opts: ['₹275', '₹265', '₹285', '₹295'],
      exp: 'Brother got (3/8) × 640 = ₹240. Remaining = 640 − 240 − 125 = ₹275.',
    },
    mr: {
      q: 'मायाकडे ₹६४० होते. तिने त्यांपैकी ३/८ रक्कम भावांना दिली आणि ₹१२५ चे पेन घेतले, तर तिच्याकडे किती रुपये शिल्लक राहिले?',
      opts: ['₹२७५', '₹२६५', '₹२८५', '₹२९५'],
      exp: 'भावाचा वाटा = २४०; शिल्लक = ६४० − २४० − १२५ = ₹२७५.',
    },
    hi: {
      q: 'माया के पास ₹640 थे। उसने इसका 3/8 भाग भाई को दिया और ₹125 की कलम खरीदी। अब उसके पास कितने रुपये शेष बचे?',
      opts: ['₹275', '₹265', '₹285', '₹295'],
      exp: 'भाई को = ₹240; शेष = 640 − 240 − 125 = ₹275.',
    },
  },
];
