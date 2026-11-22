import { TetCtetNoteTopicBlueprint } from './types';

export const MATH_PAPER_1_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  // =========================================================================
  // MATH PAPER I — UNIT 1: NUMBERS, PLACE VALUE, FRACTIONS & DECIMALS
  // =========================================================================
  {
    slug: 'math-p1-u1-numbers-place-value-fractions',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper I Syllabus (ctet.nic.in) — Mathematics Content: Numbers, Place Value, Addition/Subtraction/Multiplication/Division, Fractions & Decimals',
      mahaTet: 'MSCE Pune MAHA TET Paper I Syllabus (mscepune.in / mahatet.in) — Primary Mathematics: Number System, Roman Numerals, Fractions & Decimals',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper I) · Unit 1: Number System, Place Value, Fractions & Decimals',
        unitTitle: 'Unit 1: Numbers, Place Value, Fractions & Decimals',
        topicTitle: 'Number Sense, Place Value vs. Face Value, Indian/International Systems, Roman Numerals, Fractions & Decimals',
        subtopics: [
          'Natural, Whole, Even, Odd, Prime, Composite, and Co-prime numbers',
          'Place Value vs. Face Value in Indian & International Numeration Systems',
          'Roman Numerals (I, V, X, L, C, D, M) and additive/subtractive rules',
          'Types of Fractions (Proper, Improper, Mixed, Equivalent, Unit) & comparing fractions',
          'Decimals: Place value (tenths, hundredths, thousandths), conversion & operations',
        ],
        introduction:
          'Primary Mathematics (Paper I — Classes I to V) tests deep conceptual mastery over foundational numbers. Both CTET and MAHA TET consistently feature Place Value vs. Face Value sums, prime/composite number tricks, unit-fraction partitioning ("How many 1/6 are in 2/3?"), and decimal comparisons.',
        meaningAndDefinition:
          'Place Value is the value of a digit determined by its position in the base-10 positional system (digit × place weight), whereas Face Value is the intrinsic value of the digit itself regardless of position.',
        detailedExplanation: [
          '1. Number Classifications: Natural Numbers (1, 2, 3...), Whole Numbers (0, 1, 2, 3...). Remember: 2 is the ONLY even prime number and the smallest prime number; 1 is NEITHER prime NOR composite; 4 is the smallest composite number. There are 25 prime numbers between 1 and 100.',
          '2. Place Value & Numeration Systems: In Indian System, commas follow 3-2-2 (1,00,000 = 1 Lakh; 1,00,00,000 = 1 Crore). In International System, commas follow 3-3-3 (1,000,000 = 1 Million = 10 Lakhs; 1 Billion = 100 Crores).',
          '3. Roman Numerals: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Only I, X, C, M can repeat (at most 3 times). V, L, D are NEVER repeated or subtracted. Smaller symbol on the left subtracts (IV=4, XL=40, XC=90, CD=400, CM=900).',
          '4. Fractions: Proper (numerator < denominator), Improper (numerator ≥ denominator), Mixed (whole + proper). To find "How many 1/8 are in 3/4?", divide: (3/4) ÷ (1/8) = (3/4) × 8 = 6.',
          '5. Decimals: 0.5 = 0.50 > 0.05. Always compare decimals by aligning the decimal point and comparing place by place from tenths → hundredths → thousandths.',
        ],
        importantConcepts: [
          'Prime Numbers (1–50): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (15 primes; total 25 primes up to 100).',
          '1 Million = 10 Lakhs; 10 Million = 1 Crore; 1 Billion = 100 Crores.',
          'Reciprocal (Multiplicative Inverse) of a/b is b/a; Zero has no reciprocal.',
          'Additive Identity = 0; Multiplicative Identity = 1.',
        ],
        comparisonTable: {
          caption: 'Indian vs. International Place Value Equivalence',
          headers: ['Power of 10', 'Indian System', 'International System'],
          rows: [
            ['10⁵', '1 Lakh (1,00,000)', '100 Thousand (100,000)'],
            ['10⁶', '10 Lakhs (10,00,000)', '1 Million (1,000,000)'],
            ['10⁷', '1 Crore (1,00,00,000)', '10 Million (10,000,000)'],
            ['10⁹', '1 Arab / 100 Crores', '1 Billion (1,000,000,000)'],
          ],
        },
        practicalExamples: [
          'In 56,432, the difference between the Place Value and Face Value of 6 is 6,000 − 6 = 5,994.',
          'Number of one-sixths (1/6) in 3⅓ (10/3) = (10/3) ÷ (1/6) = (10/3) × 6 = 20.',
        ],
        classroomApplications: [
          'Use Dienes Base-10 Blocks (units, rods, flats, cubes) and Abacus so children physically see why 10 tens equal 1 hundred before writing expanded form.',
          'Use paper-folding strips and fraction walls to show visually that 1/2 = 2/4 = 4/8 and why 1/3 > 1/4.',
        ],
        teachingMethods: [
          'Concrete → Pictorial → Abstract (CPA) progression using Bundled Sticks, Dienes Blocks, and Fraction Kits.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper I almost EVERY year asks: (a) Sum/difference of Place Value & Face Value, (b) "How many 1/n are in mixed fraction?", (c) Expanded form trick like "11 tens + 11 ones + 11 hundreds", and (d) ordering decimals/fractions.',
          mahaTet: 'MAHA TET Paper I emphasizes Indian-International conversions, Roman numerals (up to 1000), Prime/Composite/Twin-Prime properties, and Balbharati Std 1–5 fraction arithmetic.',
        },
        importantExamPoints: [
          '1 is NEITHER prime NOR composite; 2 is the only even prime.',
          'Carefully add place-value sums like "12 thousands + 13 hundreds + 2 tens" = 12,000 + 1,300 + 20 = 13,320 (NOT 121320!).',
          'Never compare decimals by counting digits after the point (0.4 > 0.399).',
        ],
        commonMistakes: [
          'Thinking 1 is a prime number.',
          'Assuming 0.25 > 0.5 because 25 > 5 (ignoring tenths place value).',
          'Writing 49 in Roman numerals as IL (WRONG! Correct is XLIX = 40 + 9).',
        ],
        topicSummary:
          'Primary number mastery combines positional place value, prime/composite rules, Roman numeration, fraction partitioning, and decimal alignment.',
        revisionPoints: [
          '2 = smallest & only even prime; 1 = neither prime nor composite; 25 primes from 1 to 100.',
          '1 Million = 10 Lakhs; 1 Crore = 10 Million.',
          'Roman rules: V, L, D never repeat or subtract; XL=40, XC=90, CD=400, CM=900.',
          'To find how many (1/b) are in X, compute X × b.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u1-en-q1',
            question: 'What is the value of: 14 thousands + 14 hundreds + 14 tens + 14 ones?',
            options: ['14,1414', '15,554', '15,454', '14,554'],
            correctAnswer: 1,
            explanation: '14,000 + 1,400 + 140 + 14 = 15,554.',
            topicReference: 'Unit 1 · Place Value Expansion',
          },
          {
            id: 'math-p1-u1-en-q2',
            question: 'How many one-eighths (1/8) are there in 3¾?',
            options: ['24', '28', '30', '32'],
            correctAnswer: 2,
            explanation: '3¾ = 15/4. Number of 1/8 parts = (15/4) ÷ (1/8) = (15/4) × 8 = 30.',
            topicReference: 'Unit 1 · Fraction Partitioning',
          },
          {
            id: 'math-p1-u1-en-q3',
            question: 'What is the sum of the Place Value and Face Value of 7 in the number 47,285?',
            options: ['7,007', '6,993', '7,070', '707'],
            correctAnswer: 0,
            explanation: 'Place value of 7 = 7,000; Face value of 7 = 7. Sum = 7,000 + 7 = 7,007.',
            topicReference: 'Unit 1 · Place Value vs. Face Value',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर १) · घटक १: संख्याज्ञान, स्थानिक किंमत, अपूर्णांक व दशांश अपूर्णांक',
        unitTitle: 'घटक १: संख्याप्रणाली, स्थानिक किंमत, रोमन संख्या व अपूर्णांक',
        topicTitle: 'संख्याप्रकार, स्थानिक व दर्शनी किंमत, भारतीय-आंतरराष्ट्रीय पद्धती, रोमन संख्या, अपूर्णांक व दशांश',
        subtopics: [
          'नैसर्गिक, पूर्ण, सम, विषम, मूळ (Prime), संयुक्त (Composite) व सहमूळ संख्या',
          'स्थानिक किंमत (Place Value) विरुद्ध दर्शनी किंमत (Face Value)',
          'भारतीय व आंतरराष्ट्रीय संख्यालेखन पद्धती (लाख-दशलक्ष-कोटी रूपांतरण)',
          'रोमन संख्याचिन्हे (I, V, X, L, C, D, M) व त्यांचे नियम',
          'अपूर्णांक (अंशाधिक, छेदाधिक, पूर्णांकयुक्त, सममूल्य) आणि दशांश अपूर्णांक तुलना',
        ],
        introduction:
          'प्राथमिक स्तरावरील गणित (पेपर १ — इयत्ता १ ली ते ५ वी) मध्ये संख्याज्ञान हा पायाभूत घटक आहे. CTET आणि MAHA TET मध्ये स्थानिक-दर्शनी किंमत, मूळ संख्या, अपूर्णांक विभागणी व दशांश तुलना यांवर दरवर्षी ३ ते ५ प्रश्न येतात.',
        meaningAndDefinition:
          'अंकाची त्याच्या संख्येतील स्थानानुसार मिळणारी किंमत म्हणजे स्थानिक किंमत (Place Value), तर त्या अंकाची स्वतःची मूळ किंमत म्हणजे दर्शनी किंमत (Face Value) होय.',
        detailedExplanation: [
          '१. मूळ व संयुक्त संख्या: १ ही मूळ संख्या नाही आणि संयुक्त संख्याही नाही. २ ही एकमेव सम मूळ संख्या व सर्वात लहान मूळ संख्या आहे. १ ते १०० मध्ये एकूण २५ मूळ संख्या आहेत (१ ते ५० मध्ये १५). सर्वात लहान संयुक्त संख्या ४ आहे.',
          '२. भारतीय व आंतरराष्ट्रीय पद्धती: १ लाख = १०० हजार; १० लाख = १ दशलक्ष (Million); १ कोटी = १० दशलक्ष; १०० कोटी = १ अब्ज (Billion).',
          '३. रोमन संख्या नियम: I(1), V(5), X(10), L(50), C(100), D(500), M(1000). फक्त I, X, C, M जास्तीत जास्त ३ वेळा सलग लिहिता येतात. V, L, D कधीही पुन्हा येत नाहीत व वजा केले जात नाहीत.',
          '४. अपूर्णांक विभागणी: "3¾ मध्ये किती 1/8 आहेत?" = (15/4) ÷ (1/8) = (15/4) × 8 = 30.',
          '५. दशांश तुलना: दशांश चिन्हाखाली दशांश चिन्ह मांडून दशांश → शतांश → सहस्रांश या क्रमाने तुलना करावी (उदा. 0.5 > 0.499).',
        ],
        importantConcepts: [
          'बेरीज अविकारक घटक = 0; गुणाकार अविकारक घटक = 1.',
          'जोडमूळ संख्या (Twin Primes — फरक २ असलेल्या मूळ संख्या): १ ते १०० मध्ये ८ जोड्या आहेत (उदा. 3-5, 5-7, 11-13, 17-19, 29-31, 41-43, 59-61, 71-73).',
        ],
        comparisonTable: {
          caption: 'भारतीय व आंतरराष्ट्रीय संख्यामान तुलना',
          headers: ['दशमान घात', 'भारतीय पद्धती', 'आंतरराष्ट्रीय पद्धती'],
          rows: [
            ['10⁵', '१ लाख', '१०० हजार'],
            ['10⁶', '१० लाख', '१ दशलक्ष (1 Million)'],
            ['10⁷', '१ कोटी', '१० दशलक्ष (10 Million)'],
            ['10⁹', '१०० कोटी / १ अब्ज', '१ अब्ज (1 Billion)'],
          ],
        },
        practicalExamples: [
          '47,285 मध्ये 7 ची स्थानिक किंमत (7,000) आणि दर्शनी किंमत (7) यांची बेरीज = 7,007 व फरक = 6,993.',
          '49 ही संख्या रोमनमध्ये XLIX (40 + 9) लिहितात, IL नव्हे.',
        ],
        classroomApplications: [
          'स्थानिक किंमत शिकवताना मण्यांची माळ, काड्यांचे गठ्ठे आणि डायनेस ब्लॉक्स (Dienes Blocks) वापरून दशक-शतक संकल्पना मूर्त स्वरूपात दाखवावी.',
          'कागदाच्या घड्या घालून 1/2 = 2/4 = 4/8 हे सममूल्य अपूर्णांक प्रत्यक्ष कृतीतून समजावून सांगावेत.',
        ],
        teachingMethods: [
          'मूर्त → चित्रात्मक → अमूर्त (CPA) अध्यापन क्रम.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ मध्ये "14 हजार + 14 शतक + 14 दशक + 14 एकक", स्थानिक-दर्शनी किंमत फरक आणि अपूर्णांक विभागणीचे प्रश्न हमखास येतात.',
          mahaTet: 'MAHA TET पेपर १ मध्ये रोमन संख्या, १ ते १०० मूळ/जोडमूळ संख्या, भारतीय-आंतरराष्ट्रीय रूपांतरण व बालभारती अपूर्णांक गणिते विचारली जातात.',
        },
        importantExamPoints: [
          '१ ही मूळ व संयुक्त दोन्ही नाही; २ ही एकमेव सम मूळ संख्या आहे.',
          'दशांश चिन्हानंतर जास्त अंक असले म्हणजे संख्या मोठी नसते (0.6 > 0.598).',
        ],
        commonMistakes: [
          '१ ला मूळ संख्या मानणे किंवा 0.25 ला 0.5 पेक्षा मोठे समजणे.',
        ],
        topicSummary:
          'स्थानिक किंमत, मूळ-संयुक्त संख्या नियम, रोमन चिन्हे, अपूर्णांक विभागणी व दशांश तुलना हा प्राथमिक गणिताचा भक्कम पाया आहे.',
        revisionPoints: [
          '१ ते १०० मूळ संख्या = २५; जोडमूळ जोड्या = ८; एकमेव सम मूळ = २.',
          '१ दशलक्ष = १० लाख; १ कोटी = १० दशलक्ष.',
          'रोमन: V, L, D कधीही पुनरावृत्त किंवा वजा होत नाहीत.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u1-mr-q1',
            question: '14 हजार + 14 शतक + 14 दशक + 14 एकक याची अचूक किंमत किती?',
            options: ['14,1414', '15,554', '15,454', '14,554'],
            correctAnswer: 1,
            explanation: '14,000 + 1,400 + 140 + 14 = 15,554.',
            topicReference: 'घटक १ · स्थानिक किंमत विस्तार',
          },
          {
            id: 'math-p1-u1-mr-q2',
            question: '3¾ मध्ये एकूण किती अष्टमांश (1/8) असतात?',
            options: ['24', '28', '30', '32'],
            correctAnswer: 2,
            explanation: '3¾ = 15/4. एकूण 1/8 भाग = (15/4) ÷ (1/8) = (15/4) × 8 = 30.',
            topicReference: 'घटक १ · अपूर्णांक विभागणी',
          },
          {
            id: 'math-p1-u1-mr-q3',
            question: '47,285 या संख्येतील 7 च्या स्थानिक किंमत व दर्शनी किंमत यांची बेरीज किती?',
            options: ['7,007', '6,993', '7,070', '707'],
            correctAnswer: 0,
            explanation: '7 ची स्थानिक किंमत = 7,000 आणि दर्शनी किंमत = 7; बेरीज = 7,007.',
            topicReference: 'घटक १ · स्थानिक व दर्शनी किंमत',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर १) · इकाई १: संख्या पद्धति, स्थानीय मान, भिन्न एवं दशमलव',
        unitTitle: 'इकाई १: संख्याएँ, स्थानीय मान, रोमन अंक एवं भिन्न',
        topicTitle: 'संख्या प्रकार, स्थानीय व जातीय मान, भारतीय-अंतर्राष्ट्रीय पद्धति, रोमन अंक, भिन्न एवं दशमलव',
        subtopics: [
          'प्राकृत, पूर्ण, सम, विषम, अभाज्य (Prime), भाज्य (Composite) व सह-अभाज्य संख्याएँ',
          'स्थानीय मान (Place Value) बनाम जातीय/अंकित मान (Face Value)',
          'भारतीय एवं अंतर्राष्ट्रीय संख्यांकन प्रणाली (लाख, मिलियन, करोड़)',
          'रोमन अंक (I, V, X, L, C, D, M) के नियम',
          'भिन्न के प्रकार, भिन्नों की तुलना एवं दशमलव संक्रियाएँ',
        ],
        introduction:
          'प्राथमिक गणित (पेपर १ — कक्षा १ से ५) में संख्या बोध सर्वाधिक अंकदायी खंड है। CTET और MAHA TET दोनों में स्थानीय-जातीय मान, अभाज्य संख्या, इकाई भिन्न विभाजन तथा दशमलव तुलना से प्रतिवर्ष प्रश्न पूछे जाते हैं।',
        meaningAndDefinition:
          'किसी अंक का संख्या में उसके स्थान के आधार पर निर्धारित मान "स्थानीय मान" कहलाता है, जबकि अंक का अपना अपरिवर्तित मान "जातीय या अंकित मान" कहलाता है।',
        detailedExplanation: [
          '१. अभाज्य व भाज्य संख्याएँ: १ न तो अभाज्य है न ही भाज्य। २ सबसे छोटी और एकमात्र सम अभाज्य संख्या है। १ से १०० के बीच कुल २५ अभाज्य संख्याएँ हैं (१ से ५० तक १५)। सबसे छोटी भाज्य संख्या ४ है।',
          '२. भारतीय व अंतर्राष्ट्रीय पद्धति: १ मिलियन = १० लाख; १० मिलियन = १ करोड़; १ बिलियन = १०० करोड़।',
          '३. रोमन अंक नियम: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)। केवल I, X, C, M अधिकतम ३ बार दोहराए जा सकते हैं। V, L, D कभी दोहराए या घटाए नहीं जाते।',
          '४. भिन्न विभाजन: "3¾ में कितने 1/8 हैं?" = (15/4) ÷ (1/8) = (15/4) × 8 = 30।',
          '५. दशमलव तुलना: दशमलव बिंदु सीध में रखकर दशांश → शतांश → सहस्रांश के क्रम से तुलना करें (0.5 > 0.499)।',
        ],
        importantConcepts: [
          'योज्य तत्समक = 0; गुणात्मक तत्समक = 1।',
          'जुड़वाँ अभाज्य संख्याएँ (Twin Primes): १ से १०० के बीच ८ जोड़े (3-5, 5-7, 11-13, 17-19, 29-31, 41-43, 59-61, 71-73)।',
        ],
        comparisonTable: {
          caption: 'भारतीय एवं अंतर्राष्ट्रीय स्थानीय मान तुलना',
          headers: ['दस की घात', 'भारतीय प्रणाली', 'अंतर्राष्ट्रीय प्रणाली'],
          rows: [
            ['10⁵', '१ लाख', '१०० हज़ार'],
            ['10⁶', '१० लाख', '१ मिलियन (1 Million)'],
            ['10⁷', '१ करोड़', '१० मिलियन (10 Million)'],
            ['10⁹', '१०० करोड़ / १ अरब', '१ बिलियन (1 Billion)'],
          ],
        },
        practicalExamples: [
          '47,285 में 7 के स्थानीय मान (7,000) और जातीय मान (7) का योग = 7,007।',
          '49 को रोमन में XLIX (40 + 9) लिखा जाता है, IL नहीं।',
        ],
        classroomApplications: [
          'डायनेस ब्लॉक्स (Dienes Blocks) व गिनतारा (Abacus) से बच्चों को इकाई-दहाई-सैकड़ा की मूर्त समझ दें।',
          'कागज़ मोड़ने की गतिविधि से तुल्य भिन्न (1/2 = 2/4 = 4/8) सिखाएँ।',
        ],
        teachingMethods: [
          'मूर्त → चित्रात्मक → अमूर्त (CPA) शिक्षण क्रम।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ में "14 हज़ार + 14 सैकड़ा + 14 दहाई + 14 इकाई", स्थानीय-जातीय मान अंतर और भिन्न विभाजन के प्रश्न लगभग हर बार आते हैं।',
          mahaTet: 'MAHA TET पेपर १ में रोमन अंक, अभाज्य-भाज्य गुणधर्म व भारतीय-अंतर्राष्ट्रीय रूपांतरण प्रमुख हैं।',
        },
        importantExamPoints: [
          '१ न अभाज्य है न भाज्य; २ एकमात्र सम अभाज्य है।',
          'दशमलव के बाद अधिक अंक होने से संख्या बड़ी नहीं होती (0.6 > 0.598)।',
        ],
        commonMistakes: [
          '१ को अभाज्य संख्या मान लेना या 0.25 को 0.5 से बड़ा समझना।',
        ],
        topicSummary:
          'स्थानीय मान, अभाज्य-भाज्य नियम, रोमन अंक, भिन्न विभाजन और दशमलव तुलना प्राथमिक गणित की मजबूत नींव बनाते हैं।',
        revisionPoints: [
          '१ से १०० अभाज्य = २५; सबसे छोटी व एकमात्र सम अभाज्य = २।',
          '१ मिलियन = १० लाख; १ करोड़ = १० मिलियन।',
          'रोमन: V, L, D कभी दोहराए या घटाए नहीं जाते।',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u1-hi-q1',
            question: '14 हज़ार + 14 सैकड़ा + 14 दहाई + 14 इकाई का मान क्या होगा?',
            options: ['14,1414', '15,554', '15,454', '14,554'],
            correctAnswer: 1,
            explanation: '14,000 + 1,400 + 140 + 14 = 15,554।',
            topicReference: 'इकाई १ · स्थानीय मान विस्तार',
          },
          {
            id: 'math-p1-u1-hi-q2',
            question: '3¾ में कुल कितने 1/8 हैं?',
            options: ['24', '28', '30', '32'],
            correctAnswer: 2,
            explanation: '3¾ = 15/4। कुल 1/8 भाग = (15/4) ÷ (1/8) = (15/4) × 8 = 30।',
            topicReference: 'इकाई १ · भिन्न विभाजन',
          },
          {
            id: 'math-p1-u1-hi-q3',
            question: 'संख्या 47,285 में 7 के स्थानीय मान तथा जातीय मान का योग कितना होगा?',
            options: ['7,007', '6,993', '7,070', '707'],
            correctAnswer: 0,
            explanation: 'स्थानीय मान = 7,000, जातीय मान = 7; योग = 7,007।',
            topicReference: 'इकाई १ · स्थानीय व जातीय मान',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER I — UNIT 2: OPERATIONS, LCM-HCF, MEASUREMENT, TIME & MONEY
  // =========================================================================
  {
    slug: 'math-p1-u2-operations-lcm-measurement-time',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper I Syllabus (ctet.nic.in) — Four Operations, Divisibility, Measurement, Weight, Time, Volume, Money & Unitary Method',
      mahaTet: 'MSCE Pune MAHA TET Paper I Syllabus (mscepune.in / mahatet.in) — BODMAS, Factors, LCM-HCF, Metric Units, Calendar, Clock & Profit-Loss',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper I) · Unit 2: Operations, LCM-HCF, Measurement, Time & Money',
        unitTitle: 'Unit 2: Arithmetic Operations, Factors, Measurement & Time',
        topicTitle: 'BODMAS, Divisibility, LCM & HCF, Metric Conversions, Train/Clock Time & Money Bills',
        subtopics: [
          'BODMAS/VBODMAS order of operations & Division Algorithm (Dividend = Divisor × Quotient + Remainder)',
          'Divisibility rules (2, 3, 4, 5, 6, 8, 9, 10, 11) and Factor counting',
          'LCM & HCF properties (LCM × HCF = First Number × Second Number)',
          'Metric Measurement ladder (km-hm-dam-m-dm-cm-mm; kg-g; L-mL)',
          'Time (24-hour railway clock, elapsed journey time), Calendar (leap year) & Money rate-list problems',
        ],
        introduction:
          'Everyday applied arithmetic—especially metric conversions, 24-hour train journey durations, rate-list money bills, and LCM/HCF word problems—forms nearly half of Paper I Mathematics content questions.',
        meaningAndDefinition:
          'LCM (Least Common Multiple) is the smallest positive multiple divisible by all given numbers, while HCF (Highest Common Factor / GCD) is the largest positive integer that divides all given numbers without remainder.',
        detailedExplanation: [
          '1. Division Algorithm & Divisibility: Dividend = Divisor × Quotient + Remainder (0 ≤ Remainder < Divisor). Divisibility by 3 & 9 = sum of digits divisible by 3 or 9; by 4 = last 2 digits divisible by 4; by 8 = last 3 digits; by 11 = difference between sums of alternating digits is 0 or a multiple of 11.',
          '2. LCM & HCF Rules: For any two numbers a and b, LCM(a, b) × HCF(a, b) = a × b. Remember: "minimum / together again / bells ringing simultaneously" cues LCM; "maximum size / largest equal container" cues HCF.',
          '3. Metric Conversion Ladder: King Henry Died Mother Didn’t Cry Much → km → hm → dam → m → dm → cm → mm (each step down multiplies by 10; each step up divides by 10). 1 km = 1000 m; 1 m = 100 cm; 1 kg = 1000 g; 1 Litre = 1000 mL; 1 Dozen = 12; 1 Score = 20; 1 Gross = 144.',
          '4. Time & Calendar: Convert AM/PM to 24-hour clock for overnight journeys (e.g., 21:40 Day 1 to 06:15 Day 2 = [24:00 − 21:40] + 06:15 = 2h 20m + 6h 15m = 8h 35m). Leap Year: divisible by 4 (and century years must be divisible by 400—so 2000 was a leap year, 1900 was NOT).',
          '5. Money & Unitary Method: Compute unit cost first, then multiply by required quantity; watch fractional weights like 2½ kg or 750 g (¾ kg) in CTET grocery bill tables.',
        ],
        importantConcepts: [
          'Number of Factors: If N = pᵃ × qᵇ, Total Factors = (a+1)(b+1).',
          'LCM × HCF = Product of the two numbers (valid for 2 numbers).',
          '1 Litre = 1,000 mL = 1,000 cm³.',
        ],
        comparisonTable: {
          caption: 'Metric Unit Conversion Quick Reference',
          headers: ['Quantity', 'Standard Conversions', 'Common Exam Trap'],
          rows: [
            ['Length', '1 km = 1000 m; 1 m = 100 cm = 1000 mm', 'Mixing cm² (10,000 cm² = 1 m²) with linear 100 cm'],
            ['Mass', '1 Quintal = 100 kg; 1 kg = 1000 g', '750 g = ¾ kg; 250 g = ¼ kg'],
            ['Capacity', '1 kL = 1000 L; 1 L = 1000 mL', 'Adding L and mL without 3-digit mL padding (2 L 50 mL = 2.050 L)'],
            ['Time', '1 day = 24 h = 1440 min = 86,400 s', 'Borrowing 60 minutes (NOT 100!) when subtracting time'],
          ],
        },
        practicalExamples: [
          'A train departs at 19:45 on Tuesday and arrives at 07:15 on Wednesday. Journey time = (24:00 − 19:45) + 7:15 = 4h 15m + 7h 15m = 11 hours 30 minutes.',
          'Bells ring every 12, 15, and 20 minutes. They ring together again after LCM(12, 15, 20) = 60 minutes (1 hour).',
        ],
        classroomApplications: [
          'Bring real grocery bills, railway timetables, and measuring cylinders into class so students compute authentic elapsed time and change.',
        ],
        teachingMethods: [
          'Real-life Contextual Problem Solving (Mock Market, Train Timetable Lab).',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper I almost always includes: (1) A train departure-arrival elapsed time problem, (2) A rate-list grocery/parking/postal bill problem, (3) Metric conversion (m/cm/mm or L/mL), and (4) Factor sum / LCM-HCF problem.',
          mahaTet: 'MAHA TET Paper I emphasizes BODMAS expressions, Divisibility tests, Calendar day-of-week calculations, Unitary method, and Simple Interest / Profit-Loss basics.',
        },
        importantExamPoints: [
          'When borrowing 1 hour during time subtraction, add 60 minutes (NEVER 100!).',
          'Century years (1700, 1800, 1900) are NOT leap years unless divisible by 400 (1600, 2000, 2400).',
        ],
        commonMistakes: [
          'Writing 3 L 45 mL as 3.45 L instead of 3.045 L.',
          'Forgetting that 1000 mL = 1 L and 100 cm = 1 m.',
        ],
        topicSummary:
          'Unit 2 equips primary teachers to solve divisibility, LCM-HCF, metric ladder conversions, 24-hour clock elapsed time, and rate-list money problems with speed and precision.',
        revisionPoints: [
          'Dividend = Divisor × Quotient + Remainder; LCM × HCF = a × b.',
          'km → hm → dam → m → dm → cm → mm (×10 each step down).',
          'Time borrowing = 60 min (not 100); Century leap year divisible by 400.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u2-en-q1',
            question: 'A train leaves Mumbai at 20:50 on Friday and reaches Nagpur at 08:25 on Saturday. What is the total journey duration?',
            options: ['11 hours 25 minutes', '11 hours 35 minutes', '12 hours 35 minutes', '10 hours 35 minutes'],
            correctAnswer: 1,
            explanation: 'From 20:50 to 24:00 = 3h 10m. Adding 8h 25m gives 11 hours 35 minutes.',
            topicReference: 'Unit 2 · Train Time Calculation',
          },
          {
            id: 'math-p1-u2-en-q2',
            question: 'The product of two numbers is 432 and their HCF is 6. What is their LCM?',
            options: ['36', '64', '72', '84'],
            correctAnswer: 2,
            explanation: 'LCM = (Product of numbers) ÷ HCF = 432 ÷ 6 = 72.',
            topicReference: 'Unit 2 · LCM & HCF',
          },
          {
            id: 'math-p1-u2-en-q3',
            question: 'How many millilitres are contained in 4 litres and 65 millilitres?',
            options: ['465 mL', '4,650 mL', '4,065 mL', '40,065 mL'],
            correctAnswer: 2,
            explanation: '4 L = 4 × 1000 mL = 4,000 mL. Adding 65 mL yields 4,065 mL.',
            topicReference: 'Unit 2 · Metric Measurement',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर १) · घटक २: मूलभूत क्रिया, लसावि-मसावि, मापन, काळ व नाणी-नोटा',
        unitTitle: 'घटक २: विभाज्यता, लसावि-मसावि, दशमान मापन, घड्याळ व व्यवहार गणित',
        topicTitle: 'कंचेभागुबेव (BODMAS), विभाज्यतेच्या कसोट्या, लसावि-मसावि, मापन एकके, रेल्वे वेळ, दिनदर्शिका व खरेदी-विक्री',
        subtopics: [
          'कंचेभागुबेव (BODMAS) नियम आणि भागाकार सूत्र (भाज्य = भाजक × भागाकार + बाकी)',
          'विभाज्यतेच्या कसोट्या (2, 3, 4, 5, 6, 8, 9, 10, 11) व विभाजक संख्या',
          'लसावि (LCM) व मसावि (HCF) गुणधर्म (लसावि × मसावि = दोन संख्यांचा गुणाकार)',
          'दशमान परिमाणे: लांबी (किमी-मी-सेमी-मिमी), वजन (किग्रॅ-ग्रॅ), धारकता (लिटर-मिलि)',
          '२४ तासी घड्याळ (प्रवास वेळ), लीप वर्ष दिनदर्शिका, नाणी-नोटा व एकमान पद्धती',
        ],
        introduction:
          'दैनिक जीवनातील व्यावहारिक गणित — जसे दशमान परिमाणे रूपांतरण, २४ तासी रेल्वे वेळापत्रक, दरपत्रकावरील बिल आणि लसावि-मसावि शाब्दिक उदाहरणे — हे पेपर १ मधील अत्यंत महत्त्वाचे व हमखास गुण देणारे घटक आहेत.',
        meaningAndDefinition:
          'लसावि (लघुत्तम साधारण विभाज्य) म्हणजे दिलेल्या सर्व संख्यांनी निःशेष भाग जाणारी सर्वात लहान धन संख्या; तर मसावि (महत्तम साधारण विभाजक) म्हणजे दिलेल्या सर्व संख्यांना निःशेष भागणारी सर्वात मोठी संख्या होय.',
        detailedExplanation: [
          '१. विभाज्यतेच्या कसोट्या: ३ व ९ साठी अंकांची बेरीज; ४ साठी शेवटचे २ अंक; ८ साठी शेवटचे ३ अंक; ११ साठी एकाआड एक अंकांच्या बेरजेतील फरक ० किंवा ११ च्या पटीत असावा.',
          '२. लसावि-मसावि सूत्र: दोन संख्यांचा गुणाकार = लसावि × मसावि. "पुन्हा एकत्र कधी / किमान" म्हणजे लसावि; "जास्तीत जास्त समान माप" म्हणजे मसावि.',
          '३. दशमान परिमाणे: 1 किमी = 1000 मी; 1 मी = 100 सेमी = 1000 मिमी; 1 किग्रॅ = 1000 ग्रॅम; 1 क्विंटल = 100 किग्रॅ; 1 लिटर = 1000 मिलि; 1 डझन = 12; 1 ग्रॉस = 144.',
          '४. वेळ व दिनदर्शिका: २४ तासी घड्याळात रात्रीचा प्रवास काढताना २४:०० मधून निघण्याची वेळ वजा करून दुसऱ्या दिवसाची पोहोच वेळ मिळवावी. शतक वर्षाला ४०० ने भाग गेल्यासच ते लीप वर्ष असते (२००० लीप आहे; १९०० नाही).',
          '५. एकमान पद्धती व बिल गणिते: प्रथम १ नग/१ किग्रॅ ची किंमत काढून आवश्यक प्रमाणाने गुणावे (250 ग्रॅम = ¼ किग्रॅ; 750 ग्रॅम = ¾ किग्रॅ).',
        ],
        importantConcepts: [
          'लसावि × मसावि = पहिली संख्या × दुसरी संख्या.',
          'वेळेची वजाबाकी करताना १ तास उसना घेतल्यास ६० मिनिटे मिळवावीत (१०० नव्हे!).',
        ],
        comparisonTable: {
          caption: 'दशमान मापन एकके त्वरित तक्ता',
          headers: ['राशी', 'प्रमाणित रूपांतरण', 'परीक्षेतील सावधगिरी'],
          rows: [
            ['लांबी', '1 किमी = 1000 मी; 1 मी = 100 सेमी', '1 चौ.मी. = 10,000 चौ.सेमी.'],
            ['वजन', '1 क्विंटल = 100 किग्रॅ; 1 किग्रॅ = 1000 ग्रॅम', '750 ग्रॅम = ¾ किग्रॅ'],
            ['धारकता', '1 लिटर = 1000 मिलि', '4 लि 65 मिलि = 4,065 मिलि (4.065 लि)'],
            ['वेळ', '1 दिवस = 24 तास = 1440 मिनिटे', '1 तास = 60 मिनिटे = 3600 सेकंद'],
          ],
        },
        practicalExamples: [
          'मंगळवारी रात्री २०:५० ला सुटलेली गाडी बुधवारी सकाळी ०८:२५ ला पोहोचली. प्रवास वेळ = (२४:०० − २०:५०) + ०८:२५ = ३ तास १० मि + ८ तास २५ मि = ११ तास ३५ मिनिटे.',
        ],
        classroomApplications: [
          'वर्गात खरेदीचे दरपत्रक, बस/रेल्वे वेळापत्रक आणि मापनपात्रे वापरून प्रत्यक्ष व्यवहार गणित शिकवावे.',
        ],
        teachingMethods: [
          'अनुभवाधिष्ठित कृती पद्धती (वर्गातील बाजारपेठ व वेळापत्रक उपक्रम).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ मध्ये रेल्वे प्रवास वेळ, दरपत्रक बिल, दशमान रूपांतरण आणि विभाजक/लसावि प्रश्न नियमित येतात.',
          mahaTet: 'MAHA TET पेपर १ मध्ये कंचेभागुबेव, विभाज्यता, दिनदर्शिका वार काढणे, एकमान पद्धती व नफा-तोटा प्राथमिक गणिते येतात.',
        },
        importantExamPoints: [
          'वेळेच्या वजाबाकीत १ तास = ६० मिनिटे उसना घ्या.',
          '4 लिटर 65 मिलि म्हणजे 4,065 मिलि (465 किंवा 4,650 नव्हे).',
        ],
        commonMistakes: [
          '१९०० ला लीप वर्ष मानणे (शतक वर्ष ४०० ने विभाज्य हवे).',
        ],
        topicSummary:
          'विभाज्यता, लसावि-मसावि, दशमान मापन, २४ तासी वेळ व दरपत्रक व्यवहार गणित पेपर १ मध्ये खात्रीशीर गुण मिळवून देतात.',
        revisionPoints: [
          'लसावि × मसावि = संख्यांचा गुणाकार.',
          '1 किमी = 1000 मी; 1 किग्रॅ = 1000 ग्रॅ; 1 लि = 1000 मिलि.',
          'लीप शतक वर्ष = ४०० ने विभाज्य (1600, 2000, 2400).',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u2-mr-q1',
            question: 'एक रेल्वे शुक्रवारी रात्री २०:५० वाजता सुटली आणि शनिवारी सकाळी ०८:२५ वाजता पोहोचली. एकूण प्रवास वेळ किती?',
            options: ['११ तास २५ मिनिटे', '११ तास ३५ मिनिटे', '१२ तास ३५ मिनिटे', '१० तास ३५ मिनिटे'],
            correctAnswer: 1,
            explanation: '(२४:०० − २०:५०) = ३ तास १० मि; ३ तास १० मि + ८ तास २५ मि = ११ तास ३५ मिनिटे.',
            topicReference: 'घटक २ · प्रवास वेळ',
          },
          {
            id: 'math-p1-u2-mr-q2',
            question: 'दोन संख्यांचा गुणाकार ४३२ असून त्यांचा मसावि ६ आहे, तर त्यांचा लसावि किती?',
            options: ['३६', '६४', '७२', '८४'],
            correctAnswer: 2,
            explanation: 'लसावि = गुणाकार ÷ मसावि = ४३२ ÷ ६ = ७२.',
            topicReference: 'घटक २ · लसावि-मसावि',
          },
          {
            id: 'math-p1-u2-mr-q3',
            question: '४ लिटर ६५ मिलिलिटर म्हणजे एकूण किती मिलिलिटर?',
            options: ['४६५ मिलि', '४,६५० मिलि', '४,०६५ मिलि', '४०,०६५ मिलि'],
            correctAnswer: 2,
            explanation: '४ लि = ४,००० मिलि; ४,००० + ६५ = ४,०६५ मिलि.',
            topicReference: 'घटक २ · दशमान मापन',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर १) · इकाई २: संक्रियाएँ, ल.स.-म.स., मापन, समय एवं मुद्रा',
        unitTitle: 'इकाई २: विभाज्यता, ल.स.-म.स., मीट्रिक मापन, समय व व्यवहार गणित',
        topicTitle: 'BODMAS, विभाज्यता नियम, ल.स. व म.स., मीट्रिक रूपांतरण, रेल समय, कैलेंडर एवं मुद्रा बिल',
        subtopics: [
          'BODMAS नियम एवं भाग एल्गोरिथ्म (भाज्य = भाजक × भागफल + शेषफल)',
          'विभाज्यता के नियम (2, 3, 4, 5, 6, 8, 9, 10, 11) व गुणनखंड संख्या',
          'ल.स. (LCM) एवं म.स. (HCF) संबंध (ल.स. × म.स. = दोनों संख्याओं का गुणनफल)',
          'मीट्रिक मापन सीढ़ी (किमी-मी-सेमी-मिमी; किग्रा-ग्रा; लीटर-मिली)',
          '२४ घंटे की रेल घड़ी, लीप वर्ष कैलेंडर, मुद्रा दर-सूची एवं ऐकिक नियम',
        ],
        introduction:
          'व्यावहारिक अंकगणित—विशेषतः मीट्रिक इकाइयों का रूपांतरण, २४ घंटे की ट्रेन यात्रा अवधि, दर-सूची बिल और ल.स.-म.स. के प्रश्न—पेपर १ गणित के सर्वाधिक महत्वपूर्ण भाग हैं।',
        meaningAndDefinition:
          'लघुत्तम समापवर्त्य (LCM) वह सबसे छोटी धनात्मक संख्या है जो दी गई सभी संख्याओं से पूर्णतः विभाजित हो, जबकि महत्तम समापवर्तक (HCF) वह सबसे बड़ी संख्या है जो दी गई सभी संख्याओं को पूर्णतः विभाजित करे।',
        detailedExplanation: [
          '१. विभाज्यता नियम: ३ व ९ हेतु अंकों का योग; ४ हेतु अंतिम २ अंक; ८ हेतु अंतिम ३ अंक; ११ हेतु एकांतर अंकों के योग का अंतर ० या ११ का गुणज।',
          '२. ल.स. व म.स. सूत्र: ल.स. × म.स. = पहली संख्या × दूसरी संख्या। "न्यूनतम / पुनः एक साथ" = ल.स.; "अधिकतम समान माप" = म.स.।',
          '३. मीट्रिक रूपांतरण: 1 किमी = 1000 मी; 1 मी = 100 सेमी = 1000 मिमी; 1 किग्रा = 1000 ग्रा; 1 लीटर = 1000 मिली; 1 दर्जन = 12; 1 ग्रॉस = 144।',
          '४. समय एवं कैलेंडर: रात्रि पार यात्रा में (२४:०० − प्रस्थान समय) + अगले दिन का आगमन समय जोड़ें। शताब्दी वर्ष ४०० से विभाज्य होने पर ही लीप वर्ष होता है (2000 लीप है; 1900 नहीं)।',
        ],
        importantConcepts: [
          'ल.स. × म.स. = a × b।',
          'समय घटाते समय १ घंटा उधार लेने पर ६० मिनट जोड़ें (१०० नहीं!)।',
        ],
        comparisonTable: {
          caption: 'मीट्रिक मापन इकाइयों का त्वरित संदर्भ',
          headers: ['राशि', 'मानक रूपांतरण', 'परीक्षा सावधानी'],
          rows: [
            ['लंबाई', '1 किमी = 1000 मी; 1 मी = 100 सेमी', '1 वर्ग मी = 10,000 वर्ग सेमी'],
            ['भार', '1 क्विंटल = 100 किग्रा; 1 किग्रा = 1000 ग्रा', '750 ग्रा = ¾ किग्रा'],
            ['धारिता', '1 लीटर = 1000 मिली', '4 ली 65 मिली = 4,065 मिली'],
            ['समय', '1 दिन = 24 घंटे = 1440 मिनट', '1 घंटा = 60 मिनट = 3600 सेकंड'],
          ],
        },
        practicalExamples: [
          'शुक्रवार रात २०:५० पर चली रेल शनिवार सुबह ०८:२५ पर पहुँची। यात्रा समय = ३ घंटे १० मि + ८ घंटे २५ मि = ११ घंटे ३५ मिनट।',
        ],
        classroomApplications: [
          'कक्षा में वास्तविक रेलवे समय-सारणी और किराना दर-सूची से बिल बनवाने की गतिविधि कराएँ।',
        ],
        teachingMethods: [
          'वास्तविक जीवन संदर्भित समस्या-समाधान विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ में ट्रेन यात्रा समय, दर-सूची बिल, मीट्रिक रूपांतरण और गुणनखंड/ल.स. प्रश्न लगभग हर सत्र में आते हैं।',
          mahaTet: 'MAHA TET पेपर १ में BODMAS, विभाज्यता, कैलेंडर दिन गणना और ऐकिक नियम प्रमुख हैं।',
        },
        importantExamPoints: [
          '4 लीटर 65 मिली = 4,065 मिली (4,650 नहीं)।',
          'शताब्दी लीप वर्ष ४०० से विभाज्य होना चाहिए।',
        ],
        commonMistakes: [
          'समय घटाव में १०० मिनट उधार ले लेना या १९०० को लीप वर्ष मान लेना।',
        ],
        topicSummary:
          'विभाज्यता, ल.स.-म.स., मीट्रिक रूपांतरण, २४ घंटे की घड़ी और दर-सूची बिल पेपर १ गणित में उच्च अंक दिलाते हैं।',
        revisionPoints: [
          'ल.स. × म.स. = दोनों संख्याओं का गुणनफल।',
          '1 किमी = 1000 मी; 1 किग्रा = 1000 ग्रा; 1 ली = 1000 मिली।',
          'समय उधार = ६० मिनट; शताब्दी लीप वर्ष ४०० से विभाज्य।',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u2-hi-q1',
            question: 'एक ट्रेन शुक्रवार रात २०:५० पर रवाना होकर शनिवार सुबह ०८:२५ पर पहुँचती है। कुल यात्रा अवधि क्या है?',
            options: ['११ घंटे २५ मिनट', '११ घंटे ३५ मिनट', '१२ घंटे ३५ मिनट', '१० घंटे ३५ मिनट'],
            correctAnswer: 1,
            explanation: '(२४:०० − २०:५०) = ३ घंटे १० मि; इसमें ८ घंटे २५ मि जोड़ने पर ११ घंटे ३५ मिनट।',
            topicReference: 'इकाई २ · रेल समय गणना',
          },
          {
            id: 'math-p1-u2-hi-q2',
            question: 'दो संख्याओं का गुणनफल ४३२ और उनका म.स. ६ है। उनका ल.स. क्या होगा?',
            options: ['३६', '६४', '७२', '८४'],
            correctAnswer: 2,
            explanation: 'ल.स. = ४३२ ÷ ६ = ७२।',
            topicReference: 'इकाई २ · ल.स.-म.स.',
          },
          {
            id: 'math-p1-u2-hi-q3',
            question: '४ लीटर और ६५ मिलीलीटर में कुल कितने मिलीलीटर होते हैं?',
            options: ['४६५ मिली', '४,६५० मिली', '४,०६५ मिली', '४०,०६५ मिली'],
            correctAnswer: 2,
            explanation: '४ लीटर = ४,००० मिली; ४,००० + ६५ = ४,०६५ मिली।',
            topicReference: 'इकाई २ · मीट्रिक मापन',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER I — UNIT 3: GEOMETRY, SHAPES, PERIMETER, AREA, PATTERNS & DATA
  // =========================================================================
  {
    slug: 'math-p1-u3-geometry-mensuration-patterns-data',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper I Syllabus (ctet.nic.in) — Geometry, Shapes & Spatial Understanding, Solids Around Us, Data Handling & Patterns',
      mahaTet: 'MSCE Pune MAHA TET Paper I Syllabus (mscepune.in / mahatet.in) — 2D/3D Shapes, Perimeter, Area, Symmetry, Patterns & Pictographs',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper I) · Unit 3: Geometry, Shapes, Mensuration, Patterns & Data Handling',
        unitTitle: 'Unit 3: Geometry, Spatial Understanding, Patterns & Data',
        topicTitle: '2D/3D Shapes, Angles, Symmetry, Perimeter & Area, Number Patterns & Pictographs',
        subtopics: [
          'Basic Geometry: Point, Line, Ray, Line Segment, Angles (Acute, Right, Obtuse, Straight, Reflex)',
          '2D Shapes (Triangle, Square, Rectangle, Circle, Rhombus, Parallelogram) & Line Symmetry',
          '3D Solids Around Us (Cube, Cuboid, Cylinder, Cone, Sphere, Prism, Pyramid) — Faces, Edges, Vertices & Nets',
          'Perimeter & Area of Squares and Rectangles (including constant-perimeter maximum-area property)',
          'Patterns (Arithmetic, Square, Triangular, Fibonacci) & Data Handling (Tally Marks, Pictographs, Bar Graphs, Mean/Mode/Median basics)',
        ],
        introduction:
          'Spatial understanding, 2D/3D shape properties, lines of symmetry (in shapes and English capital letters), perimeter-area relations, and visual patterns are flagship NCERT primary mathematics topics tested every session.',
        meaningAndDefinition:
          'Perimeter is the total length of the outer boundary of a closed 2D figure (measured in linear units like cm, m), whereas Area is the amount of flat surface enclosed inside it (measured in square units like cm², m²).',
        detailedExplanation: [
          '1. Angles: Acute (<90°), Right (=90°), Obtuse (90°–180°), Straight (=180°), Reflex (180°–360°), Complete (=360°). Sum of angles in a triangle = 180°; in a quadrilateral = 360°.',
          '2. 3D Solids & Euler’s Formula: For convex polyhedra, Faces (F) + Vertices (V) − Edges (E) = 2. Cube & Cuboid: F=6, V=8, E=12. Square Pyramid: F=5, V=5, E=8. Triangular Prism: F=5, V=6, E=9. Sphere: 1 curved face, 0 edges, 0 vertices. Cylinder: 3 faces (2 flat, 1 curved), 2 curved edges, 0 vertices. Cone: 2 faces, 1 curved edge, 1 vertex.',
          '3. Symmetry: Square has 4 lines of symmetry; Rectangle has 2; Equilateral Triangle has 3; Circle has infinite; Parallelogram (non-rectangle/rhombus) has 0 lines of symmetry! Letters with BOTH horizontal & vertical symmetry: H, I, O, X.',
          '4. Perimeter & Area: Rectangle Perimeter = 2(l + b), Area = l × b; Square Perimeter = 4a, Area = a². Key CTET insight: Two rectangles can have the SAME perimeter yet DIFFERENT areas (among all rectangles of equal perimeter, the SQUARE has the maximum area!).',
          '5. Patterns & Data Handling: Tally marks bundle in groups of 5 (|||| crossed). Pictographs use a key symbol (e.g., 1 tree icon = 10 trees). Arithmetic Mean = Sum of observations ÷ Number of observations.',
        ],
        importantConcepts: [
          'Euler’s Formula: F + V − E = 2 (Cube: 6 + 8 − 12 = 2).',
          'Same Perimeter ≠ Same Area (e.g., 6×2 rectangle has P=16, A=12; 4×4 square has P=16, A=16).',
          'Lines of Symmetry: Parallelogram = 0; Rectangle = 2; Rhombus = 2; Square = 4; Circle = Infinite.',
        ],
        comparisonTable: {
          caption: '3D Solids Properties (Faces, Edges, Vertices)',
          headers: ['3D Solid', 'Faces (F)', 'Edges (E)', 'Vertices (V)'],
          rows: [
            ['Cube / Cuboid', '6 flat', '12 straight', '8'],
            ['Triangular Prism', '5 flat', '9 straight', '6'],
            ['Square Pyramid', '5 flat', '8 straight', '5'],
            ['Cylinder', '3 (2 flat, 1 curved)', '2 curved', '0'],
            ['Cone', '2 (1 flat, 1 curved)', '1 curved', '1'],
            ['Sphere', '1 curved', '0', '0'],
          ],
        },
        practicalExamples: [
          'A wire bent into a square of side 10 cm (Perimeter = 40 cm, Area = 100 cm²) is rebent into a rectangle of length 12 cm. Its breadth = (40/2) − 12 = 8 cm, and new Area = 12 × 8 = 96 cm².',
        ],
        classroomApplications: [
          'Use Geoboards, Tangrams, Dot Paper, and Paper Folding to let children discover area, symmetry, and 3D nets hands-on.',
        ],
        teachingMethods: [
          'Activity-Based Geometry using Tangrams, Geoboards, and Paper Folding.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper I consistently tests: wire-rebent Square-to-Rectangle perimeter/area problems, lines of symmetry (especially letters H, I, O, X and shapes like Parallelogram=0), 3D nets/faces-edges-vertices, and number/shape patterns.',
          mahaTet: 'MAHA TET Paper I emphasizes angle types, perimeter/area of triangles-squares-rectangles, cube/cuboid volume basics, and reading pictographs/bar charts.',
        },
        importantExamPoints: [
          'A general Parallelogram has ZERO lines of symmetry (frequent CTET trap!).',
          'Among rectangles of fixed perimeter, a Square encloses the largest area.',
          'Geoboard is ideal for teaching 2D shapes, perimeter, and area; Tangram builds spatial reasoning.',
        ],
        commonMistakes: [
          'Thinking a rectangle has 4 lines of symmetry (diagonals of a non-square rectangle are NOT lines of symmetry — it has only 2!).',
        ],
        topicSummary:
          'Geometry and data handling in Paper I combine angle classification, 3D solids (Euler’s rule), symmetry lines, perimeter-area invariance, patterns, and pictographs.',
        revisionPoints: [
          'Euler: F + V − E = 2 (Cube: 6, 8, 12).',
          'Symmetry lines: Parallelogram=0, Rectangle=2, Equilateral △=3, Square=4, Circle=∞.',
          'Wire rebent = Perimeter remains constant, Area changes.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u3-en-q1',
            question: 'How many lines of symmetry does a general Parallelogram (that is neither a rectangle nor a rhombus) have?',
            options: ['0', '1', '2', '4'],
            correctAnswer: 0,
            explanation: 'Folding a general parallelogram along any line fails to overlap both halves symmetrically; it has 0 lines of symmetry (though it has rotational symmetry of order 2).',
            topicReference: 'Unit 3 · Symmetry',
          },
          {
            id: 'math-p1-u3-en-q2',
            question: 'A wire bent into a square encloses an area of 144 cm². If the same wire is rebent into a rectangle of length 16 cm, what is the breadth of the rectangle?',
            options: ['6 cm', '8 cm', '9 cm', '12 cm'],
            correctAnswer: 1,
            explanation: 'Square side = √144 = 12 cm → Perimeter = 48 cm. For rectangle: 2(16 + b) = 48 → 16 + b = 24 → b = 8 cm.',
            topicReference: 'Unit 3 · Perimeter & Area',
          },
          {
            id: 'math-p1-u3-en-q3',
            question: 'Which pair of English capital letters has BOTH horizontal and vertical lines of symmetry?',
            options: ['A and M', 'H and X', 'B and E', 'N and Z'],
            correctAnswer: 1,
            explanation: 'Letters H, I, O, and X each possess both horizontal and vertical lines of symmetry.',
            topicReference: 'Unit 3 · Letter Symmetry',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर १) · घटक ३: भूमिती, आकार, परिमिती-क्षेत्रफळ, आकृतिबंध व माहितीचे व्यवस्थापन',
        unitTitle: 'घटक ३: द्विमिती-त्रिमिती आकार, सममिती, क्षेत्रफळ व आलेख',
        topicTitle: 'कोनांचे प्रकार, २D-३D आकार, सममिती रेषा, परिमिती-क्षेत्रफळ, आकृतिबंध व चित्रालेख',
        subtopics: [
          'मूलभूत भूमिती: बिंदू, रेषा, किरण, रेषाखंड व कोनांचे प्रकार (लघु, काटकोन, विशाल, सरळ, प्रविशाल)',
          'द्विमिती (2D) आकार व सममिती रेषा (Symmetry)',
          'त्रिमिती (3D) घनाकृती (घन, इष्टिकाचिती, वृत्तचिती, शंकू, गोल) — पृष्ठे, कडा, शिरोबिंदू',
          'चौरस व आयताची परिमिती आणि क्षेत्रफळ (तार वाकवण्याची उदाहरणे)',
          'संख्या आकृतिबंध (Patterns) व माहितीचे व्यवस्थापन (ताळा खुणा, चित्रालेख, स्तंभालेख)',
        ],
        introduction:
          'प्राथमिक गणितात अवकाशीय समज (Spatial Understanding), 2D व 3D आकारांचे गुणधर्म, सममिती रेषा आणि परिमिती-क्षेत्रफळ संबंध हे CTET व MAHA TET पेपर १ मधील अत्यंत आवडते घटक आहेत.',
        meaningAndDefinition:
          'बंदिस्त द्विमिती आकृतीच्या सर्व बाजूंच्या लांबीची बेरीज म्हणजे परिमिती (लांबीच्या एककात — सेमी, मी), तर त्या आकृतीने व्यापलेल्या सपाट पृष्ठभागाचे माप म्हणजे क्षेत्रफळ (चौरस एककात — चौ.सेमी.) होय.',
        detailedExplanation: [
          '१. कोन व कोनमापन: लघुकोन (<90°), काटकोन (=90°), विशालकोन (90°–180°), सरळकोन (=180°), प्रविशालकोन (180°–360°). त्रिकोणाच्या कोनांची बेरीज = 180°; चौकोनाची = 360°.',
          '२. त्रिमिती आकार व यूलरचे सूत्र (F + V − E = 2): घन व इष्टिकाचिती (पृष्ठे=6, शिरोबिंदू=8, कडा=12); चौरस पिरॅमिड (5, 5, 8); वृत्तचिती (3 पृष्ठे, 2 वक्र कडा, 0 शिरोबिंदू); शंकू (2 पृष्ठे, 1 कडा, 1 शिरोबिंदू); गोल (1 वक्र पृष्ठ, 0 कडा, 0 शिरोबिंदू).',
          '३. सममिती रेषा: चौरस = 4; आयत = 2; समभुज त्रिकोण = 3; वर्तुळ = अनंत; समांतरभुज चौकोन (सामान्य) = 0 सममिती रेषा! इंग्रजी अक्षरे H, I, O, X यांना आडवी व उभी दोन्ही सममिती असते.',
          '४. परिमिती व क्षेत्रफळ: आयत परिमिती = 2(लांबी + रुंदी), क्षेत्रफळ = लांबी × रुंदी; चौरस परिमिती = 4 × बाजू, क्षेत्रफळ = बाजू². समान परिमिती असलेल्या आयतांपैकी चौरसाचे क्षेत्रफळ सर्वाधिक असते.',
        ],
        importantConcepts: [
          'यूलरचे सूत्र: F + V − E = 2.',
          'तार वाकवून आकार बदलल्यास परिमिती समान राहते, क्षेत्रफळ बदलते.',
          'जिओबोर्ड (Geoboard) 2D आकार व क्षेत्रफळ शिकवण्यासाठी व टॅनग्रॅम (Tangram) अवकाशीय समजेसाठी उत्तम साधने आहेत.',
        ],
        comparisonTable: {
          caption: 'त्रिमिती (3D) घनाकृतींचे गुणधर्म',
          headers: ['घनाकृती', 'पृष्ठे (F)', 'कडा (E)', 'शिरोबिंदू (V)'],
          rows: [
            ['घन / इष्टिकाचिती', '6 सपाट', '12 सरळ', '8'],
            ['चौरस सूची (Pyramid)', '5 सपाट', '8 सरळ', '5'],
            ['वृत्तचिती (Cylinder)', '3 (2 सपाट, 1 वक्र)', '2 वक्र', '0'],
            ['शंकू (Cone)', '2 (1 सपाट, 1 वक्र)', '1 वक्र', '1'],
            ['गोल (Sphere)', '1 वक्र', '0', '0'],
          ],
        },
        practicalExamples: [
          '१४४ चौ.सेमी. क्षेत्रफळाच्या चौरसाची बाजू = १२ सेमी → परिमिती = ४८ सेमी. हीच तार १६ सेमी लांबीच्या आयतात वाकवल्यास रुंदी = २४ − १६ = ८ सेमी.',
        ],
        classroomApplications: [
          'कागद घडी (Paper Folding), जिओबोर्ड आणि टॅनग्रॅमद्वारे सममिती व क्षेत्रफळ प्रत्यक्ष कृतीतून शिकवावे.',
        ],
        teachingMethods: [
          'कृतिआधारित भूमिती अध्यापन (जिओबोर्ड, टॅनग्रॅम व ठोकळे).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ मध्ये तार वाकवून चौरस-आयत गणिते, सममिती रेषा (समांतरभुज=0, अक्षरे H, I, O, X), 3D पृष्ठे-कडा-शिरोबिंदू व आकृतिबंध प्रश्न निश्चित येतात.',
          mahaTet: 'MAHA TET पेपर १ मध्ये कोन प्रकार, त्रिकोण-चौरस-आयत परिमिती व क्षेत्रफळ आणि चित्रालेख/स्तंभालेख वाचन विचारले जाते.',
        },
        importantExamPoints: [
          'सामान्य समांतरभुज चौकोनाला ० (शून्य) सममिती रेषा असतात.',
          'आयताला फक्त २ सममिती रेषा असतात (कर्ण ही सममिती रेषा नसते!).',
        ],
        commonMistakes: [
          'आयताला ४ सममिती रेषा आहेत असे समजणे.',
        ],
        topicSummary:
          'कोन, त्रिमिती घनाकृती, सममिती रेषा, परिमिती-क्षेत्रफळ व माहिती व्यवस्थापन हे प्राथमिक भूमितीचे प्रमुख स्तंभ आहेत.',
        revisionPoints: [
          'यूलर सूत्र: F + V − E = 2.',
          'सममिती: समांतरभुज=0, आयत=2, समभुज △=3, चौरस=4, वर्तुळ=अनंत.',
          'तार वाकवल्यास परिमिती स्थिर राहते.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u3-mr-q1',
            question: 'सामान्य समांतरभुज चौकोनाला (जो आयत किंवा समभुज नाही) किती सममिती रेषा असतात?',
            options: ['०', '१', '२', '४'],
            correctAnswer: 0,
            explanation: 'सामान्य समांतरभुज चौकोनाला एकही सममिती रेषा (०) नसते.',
            topicReference: 'घटक ३ · सममिती',
          },
          {
            id: 'math-p1-u3-mr-q2',
            question: 'एका तारेपासून बनवलेल्या चौरसाचे क्षेत्रफळ १४४ चौ.सेमी. आहे. तीच तार १६ सेमी लांबीच्या आयतात वाकवल्यास आयताची रुंदी किती?',
            options: ['६ सेमी', '८ सेमी', '९ सेमी', '१२ सेमी'],
            correctAnswer: 1,
            explanation: 'चौरस बाजू = √144 = 12 सेमी → परिमिती = 48 सेमी. 2(16 + रुंदी) = 48 → रुंदी = 8 सेमी.',
            topicReference: 'घटक ३ · परिमिती व क्षेत्रफळ',
          },
          {
            id: 'math-p1-u3-mr-q3',
            question: 'कोणत्या इंग्रजी अक्षरांच्या जोडीला आडवी आणि उभी दोन्ही सममिती रेषा असतात?',
            options: ['A व M', 'H व X', 'B व E', 'N व Z'],
            correctAnswer: 1,
            explanation: 'H, I, O आणि X या अक्षरांना आडवी व उभी दोन्ही सममिती असते.',
            topicReference: 'घटक ३ · अक्षर सममिती',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर १) · इकाई ३: ज्यामिति, आकृतियाँ, परिमाप-क्षेत्रफल, पैटर्न एवं आँकड़ा प्रबंधन',
        unitTitle: 'इकाई ३: 2D/3D आकृतियाँ, सममिति, क्षेत्रफल व आँकड़ा प्रबंधन',
        topicTitle: 'कोणों के प्रकार, 2D-3D ठोस, सममिति रेखाएँ, परिमाप-क्षेत्रफल, पैटर्न तथा चित्रालेख',
        subtopics: [
          'मूल ज्यामिति: बिंदु, रेखा, किरण, कोण (न्यून, समकोण, अधिक, ऋजु, प्रतिवर्ती)',
          '2D आकृतियाँ एवं सममिति रेखाएँ (Line Symmetry)',
          '3D ठोस (घन, घनाभ, बेलन, शंकु, गोला, प्रिज्म, पिरामिड) — फलक, किनारे, शीर्ष एवं यूलर सूत्र',
          'वर्ग व आयत का परिमाप और क्षेत्रफल (तार मोड़ने के प्रश्न)',
          'पैटर्न एवं आँकड़ा प्रबंधन (मिलान चिह्न, चित्रालेख, दंड आलेख)',
        ],
        introduction:
          'स्थानिक समझ (Spatial Understanding), 2D/3D आकृतियाँ, सममिति रेखाएँ तथा परिमाप-क्षेत्रफल संबंध CTET और MAHA TET पेपर १ के सर्वाधिक पूछे जाने वाले विषय हैं।',
        meaningAndDefinition:
          'किसी बंद 2D आकृति की बाहरी सीमा की कुल लंबाई "परिमाप" (सेमी, मी) कहलाती है, जबकि उसके भीतर घिरे समतल क्षेत्र की माप "क्षेत्रफल" (वर्ग सेमी, वर्ग मी) कहलाती है।',
        detailedExplanation: [
          '१. कोण: न्यूनकोण (<90°), समकोण (=90°), अधिककोण (90°–180°), ऋजुकोण (=180°), प्रतिवर्ती कोण (180°–360°)। त्रिभुज के कोणों का योग = 180°; चतुर्भुज का = 360°।',
          '२. 3D ठोस व यूलर सूत्र (F + V − E = 2): घन/घनाभ (F=6, V=8, E=12); वर्गाकार पिरामिड (5, 5, 8); बेलन (3 फलक, 2 वक्र किनारे, 0 शीर्ष); शंकु (2 फलक, 1 किनारा, 1 शीर्ष); गोला (1 वक्र फलक, 0 किनारे, 0 शीर्ष)।',
          '३. सममिति रेखाएँ: वर्ग = 4; आयत = 2; समबाहु त्रिभुज = 3; वृत्त = अनंत; सामान्य समांतर चतुर्भुज = 0! अक्षर H, I, O, X में क्षैतिज व ऊर्ध्वाधर दोनों सममिति होती है।',
          '४. परिमाप व क्षेत्रफल: समान परिमाप वाले आयतों में वर्ग का क्षेत्रफल सर्वाधिक होता है।',
        ],
        importantConcepts: [
          'यूलर सूत्र: F + V − E = 2।',
          'तार मोड़कर आकृति बदलने पर परिमाप अपरिवर्तित रहता है।',
          'जियोबोर्ड (2D आकृतियाँ व क्षेत्रफल) और टैनग्राम (स्थानिक तर्क) श्रेष्ठ शिक्षण सामग्री हैं।',
        ],
        comparisonTable: {
          caption: '3D ठोस आकृतियों के फलक, किनारे और शीर्ष',
          headers: ['ठोस आकृति', 'फलक (F)', 'किनारे (E)', 'शीर्ष (V)'],
          rows: [
            ['घन / घनाभ', '6 समतल', '12 सीधे', '8'],
            ['वर्गाकार पिरामिड', '5 समतल', '8 सीधे', '5'],
            ['बेलन (Cylinder)', '3 (2 समतल, 1 वक्र)', '2 वक्र', '0'],
            ['शंकु (Cone)', '2 (1 समतल, 1 वक्र)', '1 वक्र', '1'],
            ['गोला (Sphere)', '1 वक्र', '0', '0'],
          ],
        },
        practicalExamples: [
          '144 वर्ग सेमी क्षेत्रफल वाले वर्ग की भुजा = 12 सेमी → परिमाप = 48 सेमी। इसी तार से 16 सेमी लंबाई का आयत बनाने पर चौड़ाई = 24 − 16 = 8 सेमी।',
        ],
        classroomApplications: [
          'कागज़ मोड़कर सममिति, जियोबोर्ड पर क्षेत्रफल और टैनग्राम से स्थानिक समझ विकसित कराएँ।',
        ],
        teachingMethods: [
          'गतिविधि-आधारित ज्यामिति शिक्षण (जियोबोर्ड, टैनग्राम, नेट मॉडल)।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ में तार मोड़ने वाले परिमाप-क्षेत्रफल प्रश्न, सममिति रेखाएँ (समांतर चतुर्भुज=0; H, I, O, X), 3D फलक-किनारे-शीर्ष और पैटर्न नियमित आते हैं।',
          mahaTet: 'MAHA TET पेपर १ में कोण, वर्ग-आयत-त्रिभुज परिमाप व क्षेत्रफल तथा चित्रालेख/दंड आलेख प्रमुख हैं।',
        },
        importantExamPoints: [
          'सामान्य समांतर चतुर्भुज में ० सममिति रेखाएँ होती हैं।',
          'आयत में केवल २ सममिति रेखाएँ होती हैं (विकर्ण सममिति रेखा नहीं हैं)।',
        ],
        commonMistakes: [
          'आयत की सममिति रेखाएँ ४ मान लेना।',
        ],
        topicSummary:
          'कोण, 3D ठोस, सममिति रेखाएँ, परिमाप-क्षेत्रफल संबंध और पैटर्न पेपर १ ज्यामिति के अनिवार्य विषय हैं।',
        revisionPoints: [
          'यूलर सूत्र: F + V − E = 2।',
          'सममिति: समांतर चतुर्भुज=0, आयत=2, समबाहु △=3, वर्ग=4, वृत्त=अनंत।',
          'तार मोड़ने पर परिमाप समान रहता है।',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u3-hi-q1',
            question: 'एक सामान्य समांतर चतुर्भुज (जो आयत या समचतुर्भुज नहीं है) में कितनी सममिति रेखाएँ होती हैं?',
            options: ['०', '१', '२', '४'],
            correctAnswer: 0,
            explanation: 'सामान्य समांतर चतुर्भुज में ० सममिति रेखाएँ होती हैं।',
            topicReference: 'इकाई ३ · सममिति',
          },
          {
            id: 'math-p1-u3-hi-q2',
            question: 'एक तार से बने वर्ग का क्षेत्रफल १४४ वर्ग सेमी है। उसी तार को १६ सेमी लंबाई के आयत में मोड़ने पर चौड़ाई कितनी होगी?',
            options: ['६ सेमी', '८ सेमी', '९ सेमी', '१२ सेमी'],
            correctAnswer: 1,
            explanation: 'वर्ग की भुजा = १२ सेमी → परिमाप = ४८ सेमी। 2(16 + b) = 48 → b = 8 सेमी।',
            topicReference: 'इकाई ३ · परिमाप व क्षेत्रफल',
          },
          {
            id: 'math-p1-u3-hi-q3',
            question: 'अंग्रेजी के किन बड़े अक्षरों के जोड़े में क्षैतिज और ऊर्ध्वाधर दोनों सममिति रेखाएँ होती हैं?',
            options: ['A और M', 'H और X', 'B और E', 'N और Z'],
            correctAnswer: 1,
            explanation: 'H, I, O तथा X में क्षैतिज और ऊर्ध्वाधर दोनों सममिति होती है।',
            topicReference: 'इकाई ३ · अक्षर सममिति',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER I — UNIT 4: PRIMARY MATHEMATICS PEDAGOGY (VAN HIELE, NCF, TLM)
  // =========================================================================
  {
    slug: 'math-p1-u4-primary-math-pedagogy',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper I Syllabus (ctet.nic.in) — Pedagogical Issues in Mathematics (15 Marks): Nature of Math, NCF 2005, Van Hiele, Language & Community Math, Error Analysis & Remediation',
      mahaTet: 'MSCE Pune MAHA TET Paper I Syllabus (mscepune.in / mahatet.in) — Primary Math Pedagogy: Aims, CPA, TLM (Abacus, Geoboard, Tangram, Dienes Blocks) & Diagnostic-Remedial Teaching',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper I) · Unit 4: Primary Mathematics Pedagogy',
        unitTitle: 'Unit 4: Pedagogical Issues in Primary Mathematics',
        topicTitle: 'Nature of Math, NCF 2005 Mathematisation, Van Hiele Levels, CPA, Math TLM & Error Analysis',
        subtopics: [
          'Nature of Mathematics: Logical, abstract, hierarchical, pattern-based, exact',
          'NCF 2005 Vision: "Mathematisation of the child’s thought processes" (Narrow vs. Higher Aims)',
          'Van Hiele Theory of Geometric Thought (Levels 0 to 4)',
          'Math TLM: Abacus, Dienes Blocks, Geoboard, Tangram, Dot Paper, Number Grid, Cuisenaire Rods',
          'Open-Ended vs. Closed-Ended Questions, Math Errors (Conceptual vs. Procedural) & Remedial Teaching',
        ],
        introduction:
          'Mathematics Pedagogy carries 15 out of 30 marks in CTET Paper I and is decisive in MAHA TET. Knowing Van Hiele’s geometry levels, NCF 2005’s "Mathematisation" aim, specific Math TLMs, and diagnostic error analysis guarantees high scores.',
        meaningAndDefinition:
          'Mathematisation (David Wheeler / NCF 2005) means developing the child’s inner resources to think logically, handle abstractions, formulate and solve problems—far beyond mechanical calculation.',
        detailedExplanation: [
          '1. NCF 2005 Narrow vs. Higher Aims of Math: Narrow Aim = developing useful numeracy skills (numbers, operations, measurement, percentages). Higher Aim = developing the child’s resources to think and reason mathematically, pursue assumptions to logical conclusions, and handle abstractions.',
          '2. Van Hiele Levels of Geometric Thought (0 to 4): Level 0 Visualization (identifies shapes by whole appearance—"a door looks like a rectangle"); Level 1 Analysis (identifies properties—"opposite sides equal, 4 right angles"); Level 2 Informal Deduction / Abstraction (sees relationships between properties—"every square is a rectangle"); Level 3 Formal Deduction (writes axiomatic proofs in high school); Level 4 Rigor (non-Euclidean geometry). Levels are sequential and experience-dependent, NOT strictly age-dependent.',
          '3. Essential Primary Math TLMs: Abacus (counting & place value), Dienes Blocks (base-10 place value, addition/regrouping), Geoboard (2D shapes, perimeter, area), Tangram (7-piece Chinese puzzle for spatial visualization & shape composition), Graph/Grid Paper (multiplying decimals like 0.3 × 0.4), Dot Paper (symmetry & reflection), GeoGebra (interactive dynamic geometry software).',
          '4. Open-Ended vs. Closed-Ended Questions: Closed-ended has ONE fixed answer ("What is 5 + 3?"). Open-ended allows MULTIPLE valid answers and fosters divergent thinking ("Write any two numbers whose sum is 8").',
          '5. Error Analysis: If a student writes 1/3 + 1/4 = 2/7 or 25 + 17 = 312, it is a CONCEPTUAL error (treating numerator/denominator as independent whole numbers; lacking place-value regrouping)—NOT carelessness! Treat errors as rich diagnostic feedback.',
        ],
        importantConcepts: [
          'ELPS Sequence (Pamela Liebeck): Experience (concrete) → Language → Pictures → Symbols.',
          'Dyscalculia: Specific learning disability affecting number sense, calculation, and arithmetic fluency.',
          'Math Anxiety: Emotional fear triggered by rote speed-drills and public shaming; overcome via play, estimation, and multiple solution strategies.',
        ],
        comparisonTable: {
          caption: 'Van Hiele’s 5 Levels of Geometric Thinking',
          headers: ['Level', 'Name', 'How the Child Thinks'],
          rows: [
            ['Level 0', 'Visualization', 'Recognizes shapes by overall look ("looks like a samosa/door")'],
            ['Level 1', 'Analysis', 'Lists properties of shapes (4 equal sides, 4 right angles)'],
            ['Level 2', 'Informal Deduction', 'Connects classes of shapes ("All squares are rectangles")'],
            ['Level 3', 'Formal Deduction', 'Constructs formal theorems and axiomatic proofs'],
            ['Level 4', 'Rigor', 'Compares different axiomatic/non-Euclidean systems'],
          ],
        },
        keyThinkers: [
          { name: 'Pierre & Dina Van Hiele', contribution: 'Five sequential levels of Geometric Thought (Visualization → Rigor).' },
          { name: 'George Pólya', contribution: 'Four steps of problem solving (Understand, Plan, Execute, Look Back) & Narrow vs. Higher aims.' },
          { name: 'Zoltán Dienes', contribution: 'Dienes Multi-base Arithmetic Blocks for concrete place-value mastery.' },
        ],
        practicalExamples: [
          'A Grade 3 student says "A tilted square is a diamond, not a square." She is at Van Hiele Level 0 (Visualization), judging solely by visual orientation rather than properties.',
          'To teach 0.3 × 0.2 = 0.06 visually, a teacher uses a 10×10 Grid Paper (Graph Paper).',
        ],
        classroomApplications: [
          'Include Open-Ended questions ("Draw two different rectangles with area 24 cm²") alongside standard sums.',
          'Use Grid Paper for decimal multiplication and Dienes Blocks whenever students make carrying/borrowing errors.',
        ],
        teachingMethods: [
          'Inductive-Deductive, Play-Way, Activity-Based (ELPS/CPA), and Problem-Solving (Pólya) methods.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper I Pedagogy asks AT LEAST 1–2 questions EVERY exam on Van Hiele levels, NCF 2005 Mathematisation, Math TLM matching (Geoboard/Tangram/Grid Paper/Dienes Blocks), Open-Ended questions, and Error Analysis (e.g., 1/2 + 1/3 = 2/5).',
          mahaTet: 'MAHA TET tests Nature & Aims of Math, Inductive vs. Deductive methods, Math Club/Lab activities, Dyscalculia, and Diagnostic-Remedial cycles.',
        },
        importantExamPoints: [
          'Grid Paper / Graph Paper is the best TLM for teaching multiplication of two decimals (0.2 × 0.3).',
          'Geoboard teaches 2D shapes, area & perimeter (NOT 3D volume!).',
          'Van Hiele levels depend on INSTRUCTIONAL EXPERIENCE, not automatically on biological age.',
        ],
        commonMistakes: [
          'Matching Geoboard with 3D volume (Geoboard is strictly for 2D plane figures).',
          'Calling a child’s conceptual error (like 1/2 + 1/3 = 2/5) "carelessness" instead of recognizing whole-number overgeneralization.',
        ],
        topicSummary:
          'Primary Math Pedagogy aims to mathematise thinking through NCF 2005 principles, Van Hiele geometric progression, concrete TLMs (Dienes Blocks, Geoboard, Grid Paper, Tangram), open-ended tasks, and compassionate error diagnosis.',
        revisionPoints: [
          'NCF 2005 main aim = Mathematisation of child’s thought.',
          'Van Hiele: 0 Visualization → 1 Analysis → 2 Informal Deduction → 3 Formal Deduction → 4 Rigor.',
          'TLM Match: Place Value = Dienes/Abacus; 2D = Geoboard; Spatial = Tangram; Decimals = Grid Paper.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u4-en-q1',
            question: 'A Grade 4 learner classifies shapes purely by how they look ("a triangle looks like a mountain; a tilted square is a kite"). According to Van Hiele, the learner is at:',
            options: ['Level 0: Visualization', 'Level 1: Analysis', 'Level 2: Informal Deduction', 'Level 3: Formal Deduction'],
            correctAnswer: 0,
            explanation: 'Judging shapes solely by whole visual appearance and orientation without using formal properties is Van Hiele Level 0 (Visualization).',
            topicReference: 'Unit 4 · Van Hiele Levels',
          },
          {
            id: 'math-p1-u4-en-q2',
            question: 'Which Teaching-Learning Material (TLM) is MOST effective for visually demonstrating the multiplication of two decimals such as 0.4 × 0.3 = 0.12?',
            options: ['Abacus', '10 × 10 Grid Paper / Graph Paper', 'Dienes Cube only', 'Tangram'],
            correctAnswer: 1,
            explanation: 'A 10×10 Grid Paper contains 100 unit squares (hundredths), allowing learners to shade 4 rows × 3 columns = 12/100 = 0.12 directly.',
            topicReference: 'Unit 4 · Math TLM',
          },
          {
            id: 'math-p1-u4-en-q3',
            question: 'According to NCF 2005, what is the MAIN goal of Mathematics education in schools?',
            options: [
              'Memorizing multiplication tables up to 50',
              'Mathematisation of the child’s thought processes',
              'Preparing every student for engineering entrance exams',
              'Solving textbook exercises at maximum speed',
            ],
            correctAnswer: 1,
            explanation: 'NCF 2005 explicitly declares "Mathematisation of the child’s thought processes" (logical reasoning and abstraction) as the overarching goal.',
            topicReference: 'Unit 4 · NCF 2005 Aims',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर १) · घटक ४: प्राथमिक गणित अध्यापनशास्त्र (व्हॅन हिले, NCF व TLM)',
        unitTitle: 'घटक ४: प्राथमिक गणित अध्यापनशास्त्रीय मुद्दे',
        topicTitle: 'गणिताचे स्वरूप, NCF 2005 गणितीकरण, व्हॅन हिले भूमिती स्तर, गणित साहित्य (TLM) व त्रुटी विश्लेषण',
        subtopics: [
          'गणिताचे स्वरूप: तार्किक, अमूर्त, श्रेणीबद्ध, आकृतिबंधात्मक व अचूक',
          'NCF 2005 चे उद्दिष्ट: बालकाच्या विचारप्रक्रियेचे "गणितीकरण" (संकुचित विरुद्ध उच्च उद्दिष्ट)',
          'व्हॅन हिले (Van Hiele) यांचा भूमितीय विचारांचा सिद्धांत (स्तर ० ते ४)',
          'गणित शैक्षणिक साहित्य: गिनतारा (Abacus), डायनेस ब्लॉक्स, जिओबोर्ड, टॅनग्रॅम, ग्रिड पेपर',
          'मुक्तोत्तरी विरुद्ध बंदिस्त प्रश्न, गणितीय चुकांचे विश्लेषण व उपचारात्मक अध्यापन',
        ],
        introduction:
          'CTET पेपर १ मध्ये गणित अध्यापनशास्त्राला १५ गुण असतात आणि MAHA TET मध्येही यावर महत्त्वाचे प्रश्न येतात. व्हॅन हिले स्तर, NCF 2005 चे गणितीकरण आणि योग्य गणित साहित्याची निवड हे हमखास गुण देणारे विषय आहेत.',
        meaningAndDefinition:
          'गणितीकरण (Mathematisation — NCF 2005) म्हणजे विद्यार्थ्यामध्ये तार्किक विचार करण्याची, अमूर्त संकल्पना हाताळण्याची आणि नवीन समस्या स्वतः सोडवण्याची आंतरिक क्षमता विकसित करणे होय.',
        detailedExplanation: [
          '१. NCF 2005 संकुचित विरुद्ध उच्च उद्दिष्ट: संकुचित उद्दिष्ट = उपयुक्त संख्याज्ञान व व्यवहार कौशल्ये (बेरीज-वजाबाकी, टक्केवारी, मापन); उच्च उद्दिष्ट = तार्किक विचार, अमूर्तता हाताळणे व विचारप्रक्रियेचे गणितीकरण.',
          '२. व्हॅन हिले भूमिती स्तर: स्तर ० दृश्यात्मकता (Visualization — केवळ दिसण्यावरून ओळख, उदा. समोसा = त्रिकोण); स्तर १ विश्लेषण (Analysis — गुणधर्म ओळखणे); स्तर २ अनौपचारिक निगमन (Informal Deduction — "सर्व चौरस आयत असतात" हा संबंध); स्तर ३ औपचारिक निगमन (Formal Deduction — प्रमेय सिद्धता); स्तर ४ कठोरता/दृढता (Rigor).',
          '३. प्रमुख गणित TLM: गिनतारा व डायनेस ब्लॉक्स (स्थानिक किंमत व हातच्याची बेरीज); जिओबोर्ड (2D आकार, परिमिती व क्षेत्रफळ); टॅनग्रॅम (७ तुकड्यांचे कोडे — अवकाशीय समज); ग्रिड/आलेख कागद (दशांश गुणाकार 0.4 × 0.3); ठिपक्यांचा कागद (सममिती).',
          '४. मुक्तोत्तरी (Open-Ended) प्रश्न: एकापेक्षा अधिक अचूक उत्तरे असलेले प्रश्न ("कोणत्या दोन संख्यांची बेरीज १२ येते?") अपसारी चिंतन (Divergent Thinking) वाढवतात.',
          '५. त्रुटी विश्लेषण: मुलाने 1/2 + 1/3 = 2/5 लिहिले तर तो निष्काळजीपणा नसून पूर्ण संख्यांच्या बेरजेचा चुकीचा विस्तार (संकल्पनात्मक त्रुटी) आहे.',
        ],
        importantConcepts: [
          'ELPS क्रम (पॅमेला लायबेक): Experience (प्रत्यक्ष अनुभव) → Language (भाषा) → Pictures (चित्रे) → Symbols (चिन्हे).',
          'डिस्कॅल्क्युलिया (Dyscalculia): संख्याज्ञान व आकडेमोडीशी संबंधित विशिष्ट अध्ययन अक्षमता.',
        ],
        comparisonTable: {
          caption: 'व्हॅन हिले यांचे ५ भूमितीय विचार स्तर',
          headers: ['स्तर', 'नाव', 'बालकाची विचारपद्धती'],
          rows: [
            ['स्तर ०', 'दृश्यात्मकता (Visualization)', 'फक्त दिसण्यावरून आकार ओळखणे ("दार आयतासारखे दिसते")'],
            ['स्तर १', 'विश्लेषण (Analysis)', 'बाजू व कोनांच्या गुणधर्मांवरून आकार ओळखणे'],
            ['स्तर २', 'अनौपचारिक निगमन', 'आकारांतील परस्परसंबंध समजणे ("प्रत्येक चौरस आयत असतो")'],
            ['स्तर ३', 'औपचारिक निगमन', 'प्रमेये व तार्किक सिद्धता लिहिणे'],
            ['स्तर ४', 'कठोरता (Rigor)', 'विविध भूमितीय प्रणालींची तुलना'],
          ],
        },
        keyThinkers: [
          { name: 'पियरे व दीना व्हॅन हिले', contribution: 'भूमितीय विचारांचे ५ क्रमबद्ध स्तर (स्तर ० ते ४).' },
          { name: 'जॉर्ज पोल्या (George Pólya)', contribution: 'समस्या निराकरणाचे ४ टप्पे व गणिताची संकुचित-उच्च उद्दिष्टे.' },
          { name: 'झोल्टान डायनेस', contribution: 'स्थानिक किमतीसाठी डायनेस ब्लॉक्स.' },
        ],
        practicalExamples: [
          'दशांश गुणाकार (0.4 × 0.3 = 0.12) समजावून सांगण्यासाठी 10×10 ग्रिड पेपर (आलेख कागद) सर्वोत्तम साहित्य आहे.',
        ],
        classroomApplications: [
          'प्रत्येक पाठात किमान २ मुक्तोत्तरी प्रश्न द्या आणि हातच्याच्या चुकांसाठी डायनेस ब्लॉक्सचा वापर करा.',
        ],
        teachingMethods: [
          'उद्गामी-अवगामी, खेळ पद्धती, ELPS/CPA आणि पोल्या समस्या निराकरण पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ मध्ये व्हॅन हिले स्तर, NCF 2005 गणितीकरण, TLM जोड्या (जिओबोर्ड/टॅनग्रॅम/ग्रिड पेपर) आणि मुक्तोत्तरी प्रश्नांवर दरवर्षी ३–५ प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये गणिताचे स्वरूप, उद्गामी-अवगामी पद्धती, डिस्कॅल्क्युलिया आणि नैदानिक-उपचारात्मक अध्यापन विचारले जाते.',
        },
        importantExamPoints: [
          'दशांश गुणाकारासाठी ग्रिड/आलेख कागद सर्वोत्तम.',
          'जिओबोर्ड केवळ 2D आकारांसाठी आहे (3D घनफळासाठी नाही!).',
        ],
        commonMistakes: [
          'जिओबोर्डला 3D आकार शिकवण्याचे साधन मानणे.',
        ],
        topicSummary:
          'NCF 2005 चे गणितीकरण, व्हॅन हिले स्तर, ELPS क्रम, अचूक गणित साहित्य व सकारात्मक त्रुटी विश्लेषण हे प्राथमिक गणित अध्यापनशास्त्राचे सार आहे.',
        revisionPoints: [
          'NCF 2005 मुख्य उद्दिष्ट = बालकाच्या विचारप्रक्रियेचे गणितीकरण.',
          'व्हॅन हिले: ० दृश्यात्मकता → १ विश्लेषण → २ अनौपचारिक निगमन → ३ औपचारिक निगमन → ४ कठोरता.',
          'TLM: स्थानिक किंमत = डायनेस/गिनतारा; 2D = जिओबोर्ड; दशांश = ग्रिड पेपर; अवकाशीय = टॅनग्रॅम.',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u4-mr-q1',
            question: 'इयत्ता चौथीचा विद्यार्थी केवळ दिसण्यावरून त्रिकोणाला "डोंगरासारखा" व तिरप्या चौरसाला "पतंग" म्हणतो. व्हॅन हिलेनुसार तो कोणत्या स्तरावर आहे?',
            options: ['स्तर ०: दृश्यात्मकता (Visualization)', 'स्तर १: विश्लेषण', 'स्तर २: अनौपचारिक निगमन', 'स्तर ३: औपचारिक निगमन'],
            correctAnswer: 0,
            explanation: 'गुणधर्मांऐवजी केवळ बाह्य दिसण्यावरून आकार ओळखणे म्हणजे स्तर ० (दृश्यात्मकता).',
            topicReference: 'घटक ४ · व्हॅन हिले स्तर',
          },
          {
            id: 'math-p1-u4-mr-q2',
            question: '0.4 × 0.3 = 0.12 हा दशांश गुणाकार विद्यार्थ्यांना दृश्यात्मक पद्धतीने समजावून सांगण्यासाठी सर्वोत्तम साहित्य कोणते?',
            options: ['गिनतारा', '10 × 10 ग्रिड पेपर / आलेख कागद', 'केवळ फळा', 'टॅनग्रॅम'],
            correctAnswer: 1,
            explanation: '10×10 ग्रिड पेपरवर १०० चौकोन असल्याने ४ ओळी × ३ स्तंभ = १२/१०० = ०.१२ सहज दाखवता येते.',
            topicReference: 'घटक ४ · गणित TLM',
          },
          {
            id: 'math-p1-u4-mr-q3',
            question: 'NCF 2005 नुसार शालेय गणित शिक्षणाचे मुख्य उद्दिष्ट कोणते?',
            options: ['५० पर्यंत पाढे पाठ करणे', 'बालकाच्या विचारप्रक्रियेचे गणितीकरण करणे', 'केवळ वेगाने आकडेमोड करणे', 'अभ्यासक्रम लवकर संपवणे'],
            correctAnswer: 1,
            explanation: 'NCF 2005 नुसार बालकाच्या विचारप्रक्रियेचे गणितीकरण हे मुख्य उद्दिष्ट आहे.',
            topicReference: 'घटक ४ · NCF 2005',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर १) · इकाई ४: प्राथमिक गणित शिक्षाशास्त्र (वैन हीले, NCF व TLM)',
        unitTitle: 'इकाई ४: प्राथमिक गणित के शिक्षाशास्त्रीय मुद्दे',
        topicTitle: 'गणित की प्रकृति, NCF 2005 गणितीकरण, वैन हीले ज्यामितीय स्तर, TLM एवं त्रुटि विश्लेषण',
        subtopics: [
          'गणित की प्रकृति: तार्किक, अमूर्त, पदानुक्रमित, पैटर्न-आधारित एवं सटीक',
          'NCF 2005 का दृष्टिकोण: बालक की चिंतन प्रक्रिया का "गणितीकरण" (संकीर्ण बनाम उच्च उद्देश्य)',
          'वैन हीले का ज्यामितीय चिंतन सिद्धांत (स्तर ० से ४)',
          'गणित TLM: गिनतारा (Abacus), डायनेस ब्लॉक्स, जियोबोर्ड, टैनग्राम, ग्रिड पेपर',
          'मुक्त-अंत बनाम बंद-अंत प्रश्न, गणितीय त्रुटि विश्लेषण एवं उपचारात्मक शिक्षण',
        ],
        introduction:
          'CTET पेपर १ में गणित शिक्षाशास्त्र १५ अंकों का होता है और MAHA TET में भी निर्णायक है। वैन हीले के स्तर, NCF 2005 का गणितीकरण और गणित TLM की सटीक पहचान अत्यंत अंकदायी है।',
        meaningAndDefinition:
          'गणितीकरण (Mathematisation — NCF 2005) का अर्थ है बालक में तार्किक चिंतन, अमूर्तता को समझने और स्वयं समस्या का समाधान करने के आंतरिक संसाधन विकसित करना।',
        detailedExplanation: [
          '१. NCF 2005 के संकीर्ण बनाम उच्च उद्देश्य: संकीर्ण उद्देश्य = संख्या-संक्रिया, मापन व दैनिक गणना कौशल; उच्च उद्देश्य = तार्किक चिंतन व विचार प्रक्रिया का गणितीकरण।',
          '२. वैन हीले ज्यामितीय चिंतन के ५ स्तर: स्तर ० चाक्षुषीकरण/दृश्यीकरण (केवल दिखावट से पहचान — "समोसा त्रिभुज जैसा है"); स्तर १ विश्लेषण (भुजा-कोण गुणों से पहचान); स्तर २ अनौपचारिक निगमन (आकृतियों के बीच संबंध — "सभी वर्ग आयत होते हैं"); स्तर ३ औपचारिक निगमन (प्रमेय सिद्ध करना); स्तर ४ दृढ़ता (Rigor)।',
          '३. प्रमुख गणित TLM: गिनतारा व डायनेस ब्लॉक्स (स्थानीय मान, जोड़-घटाव); जियोबोर्ड (2D आकृतियाँ, परिमाप, क्षेत्रफल); टैनग्राम (७ टुकड़ों की पहेली — स्थानिक समझ); ग्रिड/ग्राफ पेपर (दशमलव गुणन 0.4 × 0.3); बिंदु-पत्र (सममिति)।',
          '४. मुक्त-अंत (Open-Ended) प्रश्न: अनेक संभावित उत्तर ("ऐसी दो संख्याएँ लिखें जिनका योग ८ हो") अपसारी चिंतन बढ़ाते हैं।',
          '५. त्रुटि विश्लेषण: छात्र द्वारा 1/2 + 1/3 = 2/5 लिखना लापरवाही नहीं बल्कि पूर्ण संख्या के जोड़ नियम का अति-सामान्यीकरण (अवधारणात्मक त्रुटि) है।',
        ],
        importantConcepts: [
          'ELPS क्रम (पामेला लाइबेक): Experience (अनुभव) → Language (भाषा) → Pictures (चित्र) → Symbols (प्रतीक)।',
          'डिस्कैल्कुलिया (Dyscalculia): गणितीय गणना व संख्या-बोध से जुड़ी अधिगम अक्षमता।',
        ],
        comparisonTable: {
          caption: 'वैन हीले के ५ ज्यामितीय चिंतन स्तर',
          headers: ['स्तर', 'नाम', 'बालक की समझ'],
          rows: [
            ['स्तर ०', 'चाक्षुषीकरण (Visualization)', 'दिखावट के आधार पर पहचान ("दरवाज़ा आयत जैसा")'],
            ['स्तर १', 'विश्लेषण (Analysis)', 'गुणों के आधार पर पहचान (४ समान भुजाएँ, ४ समकोण)'],
            ['स्तर २', 'अनौपचारिक निगमन', 'वर्गों के संबंध समझना ("सभी वर्ग आयत हैं")'],
            ['स्तर ३', 'औपचारिक निगमन', 'प्रमेय व तार्किक उत्पत्ति सिद्ध करना'],
            ['स्तर ४', 'दृढ़ता (Rigor)', 'विभिन्न स्वयंसिद्ध प्रणालियों की तुलना'],
          ],
        },
        keyThinkers: [
          { name: 'पियरे व दीना वैन हीले', contribution: 'ज्यामितीय चिंतन के ५ क्रमिक स्तर (० से ४)।' },
          { name: 'जॉर्ज पोल्या (George Pólya)', contribution: 'समस्या समाधान के ४ चरण तथा गणित के संकीर्ण-उच्च उद्देश्य।' },
          { name: 'ज़ोल्टान डायनेस', contribution: 'स्थानीय मान हेतु डायनेस ब्लॉक्स।' },
        ],
        practicalExamples: [
          'दशमलव गुणन (0.4 × 0.3 = 0.12) दर्शाने हेतु 10×10 ग्रिड पेपर (ग्राफ पेपर) सर्वाधिक उपयुक्त है।',
        ],
        classroomApplications: [
          'मुक्त-अंत प्रश्नों को नियमित अभ्यास में जोड़ें और हासिल की त्रुटि सुधारने हेतु डायनेस ब्लॉक्स का उपयोग करें।',
        ],
        teachingMethods: [
          'आगमन-निगमन, खेल विधि, ELPS/CPA तथा पोल्या समस्या समाधान विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर १ में वैन हीले स्तर, NCF 2005 गणितीकरण, TLM मिलान (जियोबोर्ड/टैनग्राम/ग्रिड पेपर) व त्रुटि विश्लेषण से हर परीक्षा में प्रश्न आते हैं।',
          mahaTet: 'MAHA TET में गणित की प्रकृति, आगमन-निगमन विधि, डिस्कैल्कुलिया व निदानात्मक-उपचारात्मक शिक्षण प्रमुख हैं।',
        },
        importantExamPoints: [
          'दशमलव गुणा हेतु ग्रिड/ग्राफ पेपर श्रेष्ठ है।',
          'जियोबोर्ड केवल 2D आकृतियों के लिए है (3D आयतन के लिए नहीं)।',
        ],
        commonMistakes: [
          'जियोबोर्ड को 3D ठोस का उपकरण मान लेना।',
        ],
        topicSummary:
          'NCF 2005 का गणितीकरण, वैन हीले ज्यामितीय स्तर, उपयुक्त TLM और सकारात्मक त्रुटि विश्लेषण प्राथमिक गणित शिक्षाशास्त्र की आधारशिला हैं।',
        revisionPoints: [
          'NCF 2005 मुख्य लक्ष्य = बालक के चिंतन का गणितीकरण।',
          'वैन हीले: ० चाक्षुषीकरण → १ विश्लेषण → २ अनौपचारिक निगमन → ३ औपचारिक निगमन → ४ दृढ़ता।',
          'TLM: स्थानीय मान = डायनेस/गिनतारा; 2D = जियोबोर्ड; दशमलव = ग्रिड पेपर; स्थानिक = टैनग्राम।',
        ],
        practiceQuestions: [
          {
            id: 'math-p1-u4-hi-q1',
            question: 'कक्षा ४ का विद्यार्थी दिखावट के आधार पर त्रिभुज को "पहाड़ जैसा" और तिरछे वर्ग को "पतंग" कहता है। वैन हीले के अनुसार वह किस स्तर पर है?',
            options: ['स्तर ०: चाक्षुषीकरण (Visualization)', 'स्तर १: विश्लेषण', 'स्तर २: अनौपचारिक निगमन', 'स्तर ३: औपचारिक निगमन'],
            correctAnswer: 0,
            explanation: 'केवल समग्र दिखावट से आकृति पहचानना वैन हीले स्तर ० (चाक्षुषीकरण) है।',
            topicReference: 'इकाई ४ · वैन हीले स्तर',
          },
          {
            id: 'math-p1-u4-hi-q2',
            question: '0.4 × 0.3 = 0.12 जैसे दशमलव गुणन को दृश्यात्मक रूप से समझाने के लिए सर्वाधिक उपयुक्त सामग्री कौन-सी है?',
            options: ['गिनतारा', '10 × 10 ग्रिड पेपर / ग्राफ पेपर', 'केवल श्यामपट्ट', 'टैनग्राम'],
            correctAnswer: 1,
            explanation: '10×10 ग्रिड पेपर में १०० वर्ग (शतांश) होते हैं जिनसे 0.4 × 0.3 = 12/100 = 0.12 स्पष्ट दिखता है।',
            topicReference: 'इकाई ४ · गणित TLM',
          },
          {
            id: 'math-p1-u4-hi-q3',
            question: 'NCF 2005 के अनुसार विद्यालयी गणित शिक्षा का मुख्य लक्ष्य क्या है?',
            options: ['५० तक पहाड़े रटवाना', 'बालक की विचार प्रक्रिया का गणितीकरण करना', 'केवल गति से गणना कराना', 'पाठ्यपुस्तक शीघ्र पूर्ण करना'],
            correctAnswer: 1,
            explanation: 'NCF 2005 बालक की चिंतन प्रक्रिया के गणितीकरण को मुख्य उद्देश्य घोषित करता है।',
            topicReference: 'इकाई ४ · NCF 2005',
          },
        ],
      },
    },
  },
];
