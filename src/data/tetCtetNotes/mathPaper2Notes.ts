import { TetCtetNoteTopicBlueprint } from './types';

export const MATH_PAPER_2_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  // =========================================================================
  // MATH PAPER II — UNIT 1: NUMBER SYSTEM, RATIONAL NUMBERS, EXPONENTS & ROOTS
  // =========================================================================
  {
    slug: 'math-p2-u1-rational-exponents-roots',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Mathematics (30 Marks): Number System, Integers, Rational Numbers, Exponents, Squares, Cubes & Roots',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Upper Primary Math: Number System, Laws of Indices, Squares/Cubes & Roots',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper II) · Unit 1: Number System, Rational Numbers, Exponents & Roots',
        unitTitle: 'Unit 1: Integers, Rational Numbers, Exponents, Squares & Cubes',
        topicTitle: 'Properties of Integers & Rational Numbers, Laws of Exponents, Squares/Square Roots & Cubes/Cube Roots',
        subtopics: [
          'Number hierarchy: Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real numbers',
          'Properties: Closure, Commutative, Associative, Distributive, Additive & Multiplicative Inverses',
          'Laws of Exponents / Indices and Scientific Standard Form (a × 10ⁿ)',
          'Perfect Squares, Pythagorean Triplets, Square Roots & Prime Factorization',
          'Perfect Cubes, Cube Roots (including negative cubes) & Divisibility Tests (7, 11, 72, 88, 99)',
        ],
        introduction:
          'Paper II Mathematics (Classes VI–VIII) elevates number sense to negative integers, dense rational numbers, algebraic laws of indices, and perfect square/cube factorization—all staples of both CBSE CTET and MSCE MAHA TET Paper II.',
        meaningAndDefinition:
          'A Rational Number is any number expressible in the form p/q where p and q are integers and q ≠ 0. Between any two distinct rational numbers exist INFINITELY many rational numbers (Density Property).',
        detailedExplanation: [
          '1. Number Properties: Addition & Multiplication of rational numbers are Closed, Commutative (a+b = b+a), and Associative. Subtraction & Division are NEITHER commutative NOR associative. Division by zero (p/0) is UNDEFINED.',
          '2. Laws of Exponents (a ≠ 0): (i) aᵐ × aⁿ = aᵐ⁺ⁿ; (ii) aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (iii) (aᵐ)ⁿ = aᵐⁿ; (iv) a⁰ = 1; (v) a⁻ⁿ = 1/aⁿ; (vi) (a/b)⁻ⁿ = (b/a)ⁿ; (vii) aᵐ × bᵐ = (ab)ᵐ.',
          '3. Scientific Standard Form: Express very large or small numbers as k × 10ⁿ where 1 ≤ k < 10 (e.g., 0.00045 = 4.5 × 10⁻⁴).',
          '4. Perfect Squares: No perfect square ever ends in 2, 3, 7, or 8, nor in an odd number of trailing zeros. Sum of first n odd natural numbers = n² (1+3+5+7 = 4² = 16). Between n² and (n+1)², there are 2n non-square natural numbers.',
          '5. Cubes & Cube Roots: The cube of a negative integer is ALWAYS negative (−4)³ = −64, so ∛(−64) = −4. Hardy-Ramanujan Taxicab Number = 1729 = 1³ + 12³ = 9³ + 10³ (smallest number expressible as sum of two cubes in two distinct ways).',
        ],
        importantConcepts: [
          'Density of Rationals: Infinitely many rational numbers lie between any two rational numbers.',
          'Additive Inverse of a/b is −a/b; Multiplicative Inverse (Reciprocal) is b/a (0 has none; 1 and −1 are their own reciprocals).',
          'Composite Divisibility: Divisible by 72 = divisible by both 8 and 9; Divisible by 88 = both 8 and 11; Divisible by 99 = both 9 and 11.',
        ],
        comparisonTable: {
          caption: 'Essential Laws of Exponents & Quick Checks',
          headers: ['Law', 'Formula', 'Worked Example'],
          rows: [
            ['Product Law', 'aᵐ × aⁿ = aᵐ⁺ⁿ', '2³ × 2⁴ = 2⁷ = 128'],
            ['Quotient Law', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'],
            ['Power of Power', '(aᵐ)ⁿ = aᵐⁿ', '(3²)³ = 3⁶ = 729'],
            ['Zero Exponent', 'a⁰ = 1 (a ≠ 0)', '(7/9)⁰ = 1'],
            ['Negative Exponent', 'a⁻ⁿ = 1/aⁿ', '(2/3)⁻² = (3/2)² = 9/4'],
          ],
        },
        practicalExamples: [
          'Find the smallest number to multiply 180 to make it a perfect square: 180 = 2² × 3² × 5¹ → multiply by 5 to get 900 = 30².',
          'Find x if (2/5)³ × (2/5)⁻⁶ = (2/5)²ˣ⁻¹ → 3 + (−6) = 2x − 1 → −3 = 2x − 1 → 2x = −2 → x = −1.',
        ],
        classroomApplications: [
          'Use number lines and magnifying-glass sketches to visually demonstrate the infinite density of rational numbers between 0 and 1.',
        ],
        teachingMethods: [
          'Pattern Discovery (letting students discover a⁰ = 1 by dividing 2³→2²→2¹→2⁰ successively by 2).',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II regularly asks: solving exponent equations for x, scientific notation, composite divisibility (divisible by 72/88/99 to find missing digits x, y), and prime-factor square/cube problems.',
          mahaTet: 'MAHA TET Paper II emphasizes rational number properties, Laws of Indices, square roots of decimals, cube roots of negative numbers, and LCM/HCF of fractions.',
        },
        importantExamPoints: [
          'Numbers ending in 2, 3, 7, 8 can NEVER be perfect squares.',
          'For composite divisibility (72 = 8×9, 88 = 8×11), ALWAYS test co-prime factors.',
          '1 and −1 are the only rational numbers equal to their own reciprocals.',
        ],
        commonMistakes: [
          'Writing aᵐ + aⁿ = aᵐ⁺ⁿ (WRONG! Product adds exponents, NOT sum).',
          'Forgetting that ∛(−27) = −3 is a real integer (unlike √(−27)).',
        ],
        topicSummary:
          'Upper primary number systems build mastery across rational properties, exponent laws, scientific notation, composite divisibility, and square/cube factorization.',
        revisionPoints: [
          'a⁰ = 1 (a ≠ 0); a⁻ⁿ = 1/aⁿ; aᵐ × aⁿ = aᵐ⁺ⁿ.',
          'No perfect square ends in 2, 3, 7, or 8.',
          'Divisible by 72 ⇔ divisible by 8 & 9; Divisible by 88 ⇔ 8 & 11.',
          '1729 = Hardy-Ramanujan number (1³+12³ = 9³+10³).',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u1-en-q1',
            question: 'If (3/7)⁴ × (3/7)⁻⁷ = (3/7)²ˣ⁺¹, what is the value of x?',
            options: ['−2', '−1', '1', '2'],
            correctAnswer: 0,
            explanation: 'Equating exponents: 4 + (−7) = 2x + 1 → −3 = 2x + 1 → 2x = −4 → x = −2.',
            topicReference: 'Unit 1 · Laws of Exponents',
          },
          {
            id: 'math-p2-u1-en-q2',
            question: 'What is the smallest natural number by which 392 must be multiplied so that the product is a perfect cube?',
            options: ['2', '4', '7', '14'],
            correctAnswer: 2,
            explanation: '392 = 2³ × 7². One more factor of 7 is needed to complete 7³, so multiplying by 7 gives 2³ × 7³ = 14³.',
            topicReference: 'Unit 1 · Perfect Cubes',
          },
          {
            id: 'math-p2-u1-en-q3',
            question: 'How many rational numbers exist between 1/4 and 1/3?',
            options: ['Zero', 'One', 'Ten', 'Infinitely many'],
            correctAnswer: 3,
            explanation: 'By the Density Property of Rational Numbers, infinitely many rational numbers lie between any two distinct rational numbers.',
            topicReference: 'Unit 1 · Rational Numbers',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर २) · घटक १: परिमेय संख्या, घातांकाचे नियम, वर्ग-वर्गमूळ व घन-घनमूळ',
        unitTitle: 'घटक १: पूर्णांक, परिमेय संख्या, घातांक, वर्ग व घन',
        topicTitle: 'परिमेय संख्यांचे गुणधर्म, घातांकाचे नियम, वैज्ञानिक रूप, वर्ग-वर्गमूळ, घन-घनमूळ व संमिश्र विभाज्यता',
        subtopics: [
          'संख्यांची श्रेणी: नैसर्गिक ⊂ पूर्ण ⊂ पूर्णांक ⊂ परिमेय ⊂ वास्तव संख्या',
          'गुणधर्म: संवृत्तता, क्रमनिरपेक्षता, साहचर्य, वितरण, बेरीज व गुणाकार व्यस्त',
          'घातांकाचे नियम (Laws of Indices) आणि प्रमाणित वैज्ञानिक रूप (k × 10ⁿ)',
          'पूर्ण वर्ग संख्यांचे गुणधर्म, पायथागोरस त्रिकुटे व मूळ अवयव पद्धतीने वर्गमूळ',
          'पूर्ण घन, ऋण संख्यांचे घनमूळ व संमिश्र विभाज्यता (72, 88, 99)',
        ],
        introduction:
          'उच्च प्राथमिक गणित (पेपर २ — इयत्ता ६ वी ते ८ वी) मध्ये परिमेय संख्या, घातांकाची समीकरणे, संमिश्र विभाज्यता (72/88/99) आणि वर्ग-घन अवयव यांवर CTET व MAHA TET मध्ये सर्वाधिक प्रश्न येतात.',
        meaningAndDefinition:
          'जी संख्या p/q स्वरूपात लिहिता येते (जेथे p, q पूर्णांक असून q ≠ 0) तिला परिमेय संख्या (Rational Number) म्हणतात. कोणत्याही दोन परिमेय संख्यांदरम्यान असंख्य (अनंत) परिमेय संख्या असतात.',
        detailedExplanation: [
          '१. परिमेय संख्यांचे गुणधर्म: बेरीज व गुणाकार क्रमनिरपेक्ष व साहचर्य असतात; वजाबाकी व भागाकार नसतात. शून्याने भागाकार (p/0) अव्याख्यायित आहे. १ व −१ या संख्या स्वतःच्या गुणाकार व्यस्त आहेत.',
          '२. घातांकाचे नियम (a ≠ 0): aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ; (a/b)⁻ⁿ = (b/a)ⁿ.',
          '३. पूर्ण वर्ग गुणधर्म: कोणत्याही पूर्ण वर्ग संख्येच्या एकक स्थानी 2, 3, 7 किंवा 8 हे अंक कधीही नसतात. पहिल्या n विषम संख्यांची बेरीज = n². n² आणि (n+1)² च्या दरम्यान 2n अवर्ग संख्या असतात.',
          '४. घन व घनमूळ: ऋण संख्येचा घन नेहमी ऋण असतो (−4)³ = −64, म्हणून ∛(−64) = −4. हार्डी-रामानुजन संख्या = 1729 = 1³+12³ = 9³+10³.',
          '५. संमिश्र विभाज्यता: 72 ने भाग म्हणजे 8 व 9 दोन्हीने; 88 ने भाग म्हणजे 8 व 11 दोन्हीने; 99 ने भाग म्हणजे 9 व 11 दोन्हीने भाग जाणे.',
        ],
        importantConcepts: [
          'कोणत्याही दोन परिमेय संख्यांदरम्यान अनंत परिमेय संख्या असतात.',
          'संमिश्र विभाज्यतेसाठी नेहमी सहमूळ अवयव (उदा. 72 = 8 × 9) वापरावेत.',
        ],
        comparisonTable: {
          caption: 'घातांकाचे मुख्य नियम',
          headers: ['नियम', 'सूत्र', 'उदाहरण'],
          rows: [
            ['गुणाकार नियम', 'aᵐ × aⁿ = aᵐ⁺ⁿ', '2³ × 2⁴ = 2⁷ = 128'],
            ['भागाकार नियम', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'],
            ['घाताचा घात', '(aᵐ)ⁿ = aᵐⁿ', '(3²)³ = 3⁶ = 729'],
            ['शून्य घात', 'a⁰ = 1 (a ≠ 0)', '(7/9)⁰ = 1'],
            ['ऋण घात', 'a⁻ⁿ = 1/aⁿ', '(2/3)⁻² = 9/4'],
          ],
        },
        practicalExamples: [
          '392 = 2³ × 7²; यास पूर्ण घन करण्यासाठी 7 ने गुणावे लागेल (2³ × 7³ = 14³).',
        ],
        classroomApplications: [
          'संख्यारेषेचे भिंगाने विभाजन दाखवून दोन परिमेय संख्यांमधील अनंतता विद्यार्थ्यांना प्रत्यक्ष अनुभवावी.',
        ],
        teachingMethods: [
          'आकृतिबंध शोध पद्धती (2³→2²→2¹→2⁰ या क्रमातून a⁰ = 1 शोधणे).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये घातांकाचे समीकरण (x काढा), वैज्ञानिक प्रमाणित रूप, 72/88/99 विभाज्यता व मूळ अवयव वर्ग-घन प्रश्न हमखास येतात.',
          mahaTet: 'MAHA TET पेपर २ मध्ये घातांक नियम, दशांशांचे वर्गमूळ, ऋण संख्येचे घनमूळ आणि अपूर्णांकांचे लसावि-मसावि विचारले जातात.',
        },
        importantExamPoints: [
          'एकक स्थानी 2, 3, 7, 8 असणारी संख्या कधीही पूर्ण वर्ग नसते.',
          'शून्याचा गुणाकार व्यस्त अस्तित्वात नसतो.',
        ],
        commonMistakes: [
          'aᵐ + aⁿ = aᵐ⁺ⁿ असे चुकीचे मानणे (हा नियम फक्त गुणाकारासाठी आहे).',
        ],
        topicSummary:
          'परिमेय संख्यांची घनता, घातांकाचे नियम, संमिश्र विभाज्यता व मूळ अवयव पद्धत हे उच्च प्राथमिक संख्याज्ञानाचे प्रमुख आधार आहेत.',
        revisionPoints: [
          'a⁰ = 1; a⁻ⁿ = 1/aⁿ; aᵐ × aⁿ = aᵐ⁺ⁿ.',
          'पूर्ण वर्गाच्या शेवटी 2, 3, 7, 8 कधीही येत नाहीत.',
          '72 साठी 8 व 9; 88 साठी 8 व 11 कसोटी.',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u1-mr-q1',
            question: 'जर (3/7)⁴ × (3/7)⁻⁷ = (3/7)²ˣ⁺¹, तर x ची किंमत किती?',
            options: ['−2', '−1', '1', '2'],
            correctAnswer: 0,
            explanation: 'घातांक समान करून: 4 − 7 = 2x + 1 → −3 = 2x + 1 → 2x = −4 → x = −2.',
            topicReference: 'घटक १ · घातांकाचे नियम',
          },
          {
            id: 'math-p2-u1-mr-q2',
            question: '392 या संख्येला कोणत्या लहानात लहान नैसर्गिक संख्येने गुणल्यास येणारा गुणाकार पूर्ण घन असेल?',
            options: ['2', '4', '7', '14'],
            correctAnswer: 2,
            explanation: '392 = 2³ × 7². पूर्ण घनासाठी एका 7 ची गरज आहे, म्हणून उत्तर 7.',
            topicReference: 'घटक १ · पूर्ण घन',
          },
          {
            id: 'math-p2-u1-mr-q3',
            question: '1/4 आणि 1/3 या दोन परिमेय संख्यांदरम्यान किती परिमेय संख्या असतात?',
            options: ['शून्य', 'एक', 'दहा', 'असंख्य (अनंत)'],
            correctAnswer: 3,
            explanation: 'कोणत्याही दोन भिन्न परिमेय संख्यांदरम्यान अनंत परिमेय संख्या असतात.',
            topicReference: 'घटक १ · परिमेय संख्या',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर २) · इकाई १: परिमेय संख्याएँ, घातांक के नियम, वर्ग-वर्गमूल एवं घन-घनमूल',
        unitTitle: 'इकाई १: पूर्णांक, परिमेय संख्याएँ, घातांक, वर्ग व घन',
        topicTitle: 'परिमेय संख्या गुणधर्म, घातांक नियम, मानक वैज्ञानिक रूप, वर्ग-वर्गमूल, घन-घनमूल एवं भाज्यता',
        subtopics: [
          'संख्या श्रेणी: प्राकृत ⊂ पूर्ण ⊂ पूर्णांक ⊂ परिमेय ⊂ वास्तविक संख्याएँ',
          'गुणधर्म: संवृत, क्रमविनिमेय, साहचर्य, वितरण, योज्य व गुणात्मक प्रतिलोम',
          'घातांक के नियम एवं वैज्ञानिक मानक रूप (k × 10ⁿ)',
          'पूर्ण वर्ग संख्याएँ, पाइथागोरस त्रिक व अभाज्य गुणनखंडन द्वारा वर्गमूल',
          'पूर्ण घन, ऋणात्मक घनमूल एवं संयुक्त भाज्यता नियम (72, 88, 99)',
        ],
        introduction:
          'उच्च प्राथमिक गणित (पेपर २ — कक्षा ६ से ८) में परिमेय संख्याएँ, घातांक समीकरण, 72/88/99 की भाज्यता और वर्ग-घन गुणनखंडन से CTET व MAHA TET में प्रतिवर्ष महत्वपूर्ण प्रश्न आते हैं।',
        meaningAndDefinition:
          'जिसे p/q के रूप में लिखा जा सके (जहाँ p, q पूर्णांक व q ≠ 0) वह परिमेय संख्या है। किन्हीं दो भिन्न परिमेय संख्याओं के बीच अनंत परिमेय संख्याएँ होती हैं।',
        detailedExplanation: [
          '१. गुणधर्म: परिमेय संख्याओं का योग व गुणन क्रमविनिमेय व साहचर्य है; व्यवकलन व भाग नहीं। शून्य से भाग अपरिभाषित है। १ और −१ स्वयं के व्युत्क्रम हैं।',
          '२. घातांक के नियम (a ≠ 0): aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ; (a/b)⁻ⁿ = (b/a)ⁿ।',
          '३. पूर्ण वर्ग नियम: किसी पूर्ण वर्ग के इकाई अंक में 2, 3, 7 या 8 कभी नहीं आते। प्रथम n विषम संख्याओं का योग = n²। n² तथा (n+1)² के बीच 2n अपूर्ण वर्ग संख्याएँ होती हैं।',
          '४. घन व घनमूल: ऋणात्मक संख्या का घन सदैव ऋणात्मक होता है; ∛(−64) = −4। हार्डी-रामानुजन संख्या = 1729 = 1³+12³ = 9³+10³।',
          '५. संयुक्त भाज्यता: 72 से विभाज्य ⇔ 8 व 9 से; 88 से विभाज्य ⇔ 8 व 11 से; 99 से विभाज्य ⇔ 9 व 11 से।',
        ],
        importantConcepts: [
          'परिमेय घनत्व: किन्हीं दो परिमेय संख्याओं के बीच अनंत परिमेय संख्याएँ स्थित होती हैं।',
          'संयुक्त भाज्यता हेतु सदैव सह-अभाज्य गुणनखंड चुनें (72 = 8 × 9)।',
        ],
        comparisonTable: {
          caption: 'घातांक के आवश्यक नियम',
          headers: ['नियम', 'सूत्र', 'उदाहरण'],
          rows: [
            ['गुणन नियम', 'aᵐ × aⁿ = aᵐ⁺ⁿ', '2³ × 2⁴ = 2⁷ = 128'],
            ['भाग नियम', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'],
            ['घात की घात', '(aᵐ)ⁿ = aᵐⁿ', '(3²)³ = 3⁶ = 729'],
            ['शून्य घात', 'a⁰ = 1 (a ≠ 0)', '(7/9)⁰ = 1'],
            ['ऋण घात', 'a⁻ⁿ = 1/aⁿ', '(2/3)⁻² = 9/4'],
          ],
        },
        practicalExamples: [
          '392 = 2³ × 7²; इसे पूर्ण घन बनाने हेतु 7 से गुणा करना होगा (2³ × 7³ = 14³)।',
        ],
        classroomApplications: [
          'पैटर्न विभाजन (2³→2²→2¹→2⁰) द्वारा विद्यार्थियों से स्वयं a⁰ = 1 का नियम खोजवाएँ।',
        ],
        teachingMethods: [
          'पैटर्न अन्वेषण एवं आगमन विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में घातांक समीकरण (x का मान), वैज्ञानिक मानक रूप, 72/88/99 भाज्यता व पूर्ण वर्ग/घन गुणनखंडन नियमित आते हैं।',
          mahaTet: 'MAHA TET पेपर २ में घातांक नियम, दशमलव वर्गमूल, ऋणात्मक घनमूल व भिन्नों के ल.स.-म.स. प्रमुख हैं।',
        },
        importantExamPoints: [
          'इकाई अंक 2, 3, 7, 8 वाली संख्या कभी पूर्ण वर्ग नहीं हो सकती।',
          'शून्य का कोई गुणात्मक प्रतिलोम नहीं होता।',
        ],
        commonMistakes: [
          'aᵐ + aⁿ = aᵐ⁺ⁿ मान लेना (घातांक केवल गुणा में जुड़ते हैं, जोड़ में नहीं)।',
        ],
        topicSummary:
          'परिमेय गुणधर्म, घातांक के नियम, संयुक्त भाज्यता और अभाज्य गुणनखंडन पेपर २ संख्या पद्धति का मुख्य आधार हैं।',
        revisionPoints: [
          'a⁰ = 1; a⁻ⁿ = 1/aⁿ; aᵐ × aⁿ = aᵐ⁺ⁿ।',
          'पूर्ण वर्ग कभी 2, 3, 7, 8 पर समाप्त नहीं होता।',
          '72 = 8×9; 88 = 8×11; 1729 = हार्डी-रामानुजन संख्या।',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u1-hi-q1',
            question: 'यदि (3/7)⁴ × (3/7)⁻⁷ = (3/7)²ˣ⁺¹, तो x का मान क्या है?',
            options: ['−2', '−1', '1', '2'],
            correctAnswer: 0,
            explanation: '4 + (−7) = 2x + 1 → −3 = 2x + 1 → 2x = −4 → x = −2।',
            topicReference: 'इकाई १ · घातांक नियम',
          },
          {
            id: 'math-p2-u1-hi-q2',
            question: '392 को किस सबसे छोटी प्राकृत संख्या से गुणा किया जाए कि गुणनफल पूर्ण घन बन जाए?',
            options: ['2', '4', '7', '14'],
            correctAnswer: 2,
            explanation: '392 = 2³ × 7²। 7³ पूर्ण करने के लिए 7 से गुणा आवश्यक है।',
            topicReference: 'इकाई १ · पूर्ण घन',
          },
          {
            id: 'math-p2-u1-hi-q3',
            question: '1/4 तथा 1/3 के बीच कितनी परिमेय संख्याएँ होती हैं?',
            options: ['शून्य', 'एक', 'दस', 'अनंत'],
            correctAnswer: 3,
            explanation: 'किन्हीं भी दो भिन्न परिमेय संख्याओं के बीच अनंत परिमेय संख्याएँ होती हैं।',
            topicReference: 'इकाई १ · परिमेय संख्याएँ',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER II — UNIT 2: ALGEBRA & COMMERCIAL ARITHMETIC
  // =========================================================================
  {
    slug: 'math-p2-u2-algebra-commercial-math',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Algebra (Expressions, Identities, Factorization, Linear Equations) & Ratio-Proportion, Percentage, Profit-Loss, SI/CI',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Polynomials, Algebraic Identities, Linear Equations, Percentage, Discount, SI & CI',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper II) · Unit 2: Algebra & Commercial Arithmetic',
        unitTitle: 'Unit 2: Algebraic Expressions, Linear Equations & Commercial Math',
        topicTitle: 'Algebraic Identities, Factorization, Linear Equations, Ratio-Proportion, Profit-Loss, Discount, SI & CI',
        subtopics: [
          'Algebraic expressions, terms, coefficients, degree of polynomials & operations',
          'Standard Algebraic Identities: (a±b)², a²−b², (x+a)(x+b), (a±b)³, a³±b³',
          'Factorization (common factor, grouping, splitting the middle term) & Linear Equations in One Variable',
          'Ratio & Proportion (Direct vs. Inverse Variation), Time & Work, Speed-Distance-Time',
          'Percentage, Profit & Loss, Marked Price & Discount, Simple Interest (SI) & Compound Interest (CI)',
        ],
        introduction:
          'Algebra and Commercial Arithmetic together contribute 8–10 high-scoring questions in Paper II Mathematics. Mastering the core identities, middle-term factorization, and clean profit-loss / CI formulas saves tremendous calculation time.',
        meaningAndDefinition:
          'An Algebraic Identity is an equality that holds TRUE for ALL values of its variables (e.g., (a+b)² = a² + 2ab + b²), whereas an Equation holds true only for specific solution values (e.g., 2x + 3 = 11 holds only for x = 4).',
        detailedExplanation: [
          '1. Core Algebraic Identities: (a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; a²−b² = (a+b)(a−b); (x+a)(x+b) = x²+(a+b)x+ab; a³+b³ = (a+b)(a²−ab+b²); a³−b³ = (a−b)(a²+ab+b²).',
          '2. Factorization & Linear Equations: To factor x² + bx + c, find two numbers p, q such that p + q = b and p × q = c. Solve linear equations using inverse balancing (transposition) and verify by substituting back.',
          '3. Direct vs. Inverse Proportion: Direct (x/y = k — more notebooks, higher cost). Inverse (x × y = k — more workers, fewer days; higher speed, less time).',
          '4. Profit, Loss & Discount: Profit% or Loss% is ALWAYS calculated on Cost Price (CP), whereas Discount% is ALWAYS calculated on Marked Price (MP)! SP = CP × (100 + P%)/100; SP = MP × (100 − D%)/100.',
          '5. Simple vs. Compound Interest: SI = (P × R × T)/100. CI Amount A = P(1 + R/100)ⁿ; CI = A − P. For half-yearly compounding, halve the rate (R/2) and double the time (2n). Difference between CI and SI for 2 years = P(R/100)².',
        ],
        importantConcepts: [
          'Identity vs. Equation: Identity is universally true; Equation is conditionally true.',
          'Successive percentage change of a% and b%: Net change = a + b + (ab)/100.',
          '2-Year CI − SI Shortcut: CI − SI = P × (R/100)².',
        ],
        comparisonTable: {
          caption: 'Commercial Arithmetic Essential Formulas',
          headers: ['Concept', 'Formula', 'Base Reference'],
          rows: [
            ['Profit / Loss %', '(Profit or Loss ÷ CP) × 100', 'Always on Cost Price (CP)'],
            ['Discount %', '(Discount ÷ MP) × 100', 'Always on Marked Price (MP)'],
            ['Simple Interest', 'SI = (P × R × T) / 100', 'Original Principal P'],
            ['Compound Amount', 'A = P(1 + R/100)ⁿ', 'Compounded every period'],
            ['CI − SI (2 Years)', 'P(R/100)²', 'Fast 2-year shortcut'],
          ],
        },
        practicalExamples: [
          'If CP of 12 pens equals SP of 10 pens: Profit = 2 pens on base 10 → Profit% = (2/10) × 100 = 20%.',
          'If x + 1/x = 5, then x² + 1/x² = (x + 1/x)² − 2 = 25 − 2 = 23.',
        ],
        classroomApplications: [
          'Use Algebra Tiles (x², x, 1 squares/strips) so students physically build (a+b)² = a² + 2ab + b² as an area model before memorizing symbols.',
        ],
        teachingMethods: [
          'Geometric Area Modelling (Algebra Tiles) and Balancing Scale Method for Linear Equations.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II regularly asks polynomial subtraction/coefficient comparison, factorization of quadratics/a²−b², solving linear equations with fractions, and Marked Price / Discount / CI problems.',
          mahaTet: 'MAHA TET Paper II places strong emphasis on Ratio-Proportion, Direct/Inverse Variation, Profit-Loss, Successive Discount, SI/CI (half-yearly), and Age/Work word problems.',
        },
        importantExamPoints: [
          'Profit/Loss % base = CP; Discount % base = MP (NEVER mix these two!).',
          'Watch the negative sign when subtracting an algebraic expression: −(3x − 5) = −3x + 5.',
        ],
        commonMistakes: [
          'Writing (a + b)² = a² + b² (forgetting the middle 2ab term!).',
          'Computing Profit% on Selling Price instead of Cost Price.',
        ],
        topicSummary:
          'Algebraic identities, factorization, linear equations, variation, profit-loss/discount, and SI/CI form the high-yield quantitative engine of Paper II Mathematics.',
        revisionPoints: [
          '(a±b)² = a² ± 2ab + b²; a² − b² = (a+b)(a−b).',
          'Profit/Loss % on CP; Discount % on MP.',
          'Half-yearly CI: Rate = R/2, Time = 2n; 2-year (CI − SI) = P(R/100)².',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u2-en-q1',
            question: 'If x + (1/x) = 6, what is the value of x² + (1/x²)?',
            options: ['32', '34', '36', '38'],
            correctAnswer: 1,
            explanation: 'Squaring both sides: x² + 2 + 1/x² = 36 → x² + 1/x² = 34.',
            topicReference: 'Unit 2 · Algebraic Identities',
          },
          {
            id: 'math-p2-u2-en-q2',
            question: 'A shopkeeper marks an item 25% above its Cost Price and gives a 10% discount on the Marked Price. What is his net profit percentage?',
            options: ['12.5%', '15%', '10%', '17.5%'],
            correctAnswer: 0,
            explanation: 'Let CP = 100 → MP = 125. Discount 10% of 125 = 12.5 → SP = 112.5. Net Profit = 12.5%.',
            topicReference: 'Unit 2 · Profit, Loss & Discount',
          },
          {
            id: 'math-p2-u2-en-q3',
            question: 'What is the difference between Compound Interest and Simple Interest on ₹5,000 at 10% per annum for 2 years?',
            options: ['₹25', '₹50', '₹75', '₹100'],
            correctAnswer: 1,
            explanation: 'CI − SI for 2 years = P(R/100)² = 5000 × (10/100)² = 5000 × 0.01 = ₹50.',
            topicReference: 'Unit 2 · SI & CI',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर २) · घटक २: बीजगणित आणि व्यावहारिक अंकगणित',
        unitTitle: 'घटक २: बैजिक राशी, नित्यसमीकरणे, एकचल समीकरणे व व्यवहार गणित',
        topicTitle: 'विस्तार सूत्रे, अवयव पाडणे, एकचल रेषीय समीकरणे, गुणोत्तर-प्रमाण, नफा-तोटा, सूट, सरळव्याज व चक्रवाढ व्याज',
        subtopics: [
          'बैजिक राशी, पदे, सहगुणक, बहुपदीची कोटी व क्रिया',
          'विस्तार सूत्रे (नित्यसमीकरणे): (a±b)², a²−b², (x+a)(x+b), a³±b³',
          'अवयव पाडणे (मध्यपद फोडून) आणि एकचल रेषीय समीकरणे सोडवणे',
          'गुणोत्तर व प्रमाण (समचलन विरुद्ध व्यस्तचलन), काम-काळ-वेग',
          'शेकडेवारी, नफा-तोटा, छापील किंमत व सूट, सरळव्याज (SI) व चक्रवाढ व्याज (CI)',
        ],
        introduction:
          'बीजगणित आणि व्यवहार गणित मिळून पेपर २ गणितात ८ ते १० प्रश्न विचारले जातात. विस्तार सूत्रे, अवयव पाडणे, छापील किमतीवरील सूट आणि चक्रवाढ व्याज यांवर अचूक प्रभुत्व मिळवल्यास वेळ वाचतो व गुण वाढतात.',
        meaningAndDefinition:
          'नित्यसमीकरण (Identity) म्हणजे चलाच्या सर्व किमतींसाठी सत्य असलेले समीकरण (उदा. (a+b)² = a²+2ab+b²), तर सामान्य समीकरण केवळ विशिष्ट उकलीसाठीच सत्य असते.',
        detailedExplanation: [
          '१. मुख्य विस्तार सूत्रे: (a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; a²−b² = (a+b)(a−b); (x+a)(x+b) = x²+(a+b)x+ab; a³±b³ विस्तार.',
          '२. समचलन विरुद्ध व्यस्तचलन: समचलनात गुणोत्तर स्थिर (x/y = k); व्यस्तचलनात गुणाकार स्थिर (x × y = k — कामगार वाढले की दिवस कमी होतात).',
          '३. नफा-तोटा व सूट: नफा% किंवा तोटा% नेहमी खरेदी किमतीवर (CP) काढतात, तर सूट% नेहमी छापील किमतीवर (MP) काढतात!',
          '४. सरळव्याज व चक्रवाढ व्याज: सरळव्याज = (मुद्दल × दर × मुदत)/100. चक्रवाढ रास A = P(1 + R/100)ⁿ. सहामाही आकारणीसाठी दर निम्मा (R/2) व मुदत दुप्पट (2n) करावी. २ वर्षांसाठी (चक्रवाढ − सरळव्याज) = P(R/100)².',
        ],
        importantConcepts: [
          'सलग शेकडा बदल (a% व b%): निव्वळ बदल = a + b + (ab)/100.',
          '२ वर्षांचा CI − SI फरक = P(R/100)².',
        ],
        comparisonTable: {
          caption: 'व्यवहार गणिताची प्रमुख सूत्रे',
          headers: ['घटक', 'सूत्र', 'आधार किंमत'],
          rows: [
            ['शेकडा नफा / तोटा', '(नफा किंवा तोटा ÷ खरेदी किंमत) × 100', 'नेहमी खरेदी किंमत (CP)'],
            ['शेकडा सूट', '(सूट ÷ छापील किंमत) × 100', 'नेहमी छापील किंमत (MP)'],
            ['सरळव्याज', '(P × R × T) / 100', 'मूळ मुद्दल P'],
            ['चक्रवाढ रास', 'A = P(1 + R/100)ⁿ', 'दर टप्प्याची रास'],
          ],
        },
        practicalExamples: [
          'जर x + 1/x = 6, तर x² + 1/x² = 6² − 2 = 34.',
        ],
        classroomApplications: [
          'बीजगणित टाइल्स (Algebra Tiles) वापरून (a+b)² = a²+2ab+b² चे क्षेत्रफळ प्रत्यक्ष दाखवावे.',
        ],
        teachingMethods: [
          'क्षेत्रफळ प्रतिमान व तराजू समतोल पद्धती (रेषीय समीकरणांसाठी).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये बहुपदी सहगुणक तुलना, अवयव पाडणे, एकचल समीकरणे आणि छापील किंमत-सूट-चक्रवाढ व्याज प्रश्न येतात.',
          mahaTet: 'MAHA TET पेपर २ मध्ये समचलन-व्यस्तचलन, शेकडेवारी, नफा-तोटा, सहामाही चक्रवाढ व्याज व काम-काळ उदाहरणे अधिक येतात.',
        },
        importantExamPoints: [
          'नफा-तोटा = खरेदी किमतीवर; सूट = छापील किमतीवर.',
          'कंसाबाहेर ऋण चिन्ह असल्यास आतली सर्व चिन्हे बदलतात.',
        ],
        commonMistakes: [
          '(a+b)² = a²+b² लिहिणे (2ab विसरणे) किंवा नफा विक्री किमतीवर काढणे.',
        ],
        topicSummary:
          'विस्तार सूत्रे, अवयव, एकचल समीकरणे, चलन, नफा-तोटा-सूट व व्याज ही पेपर २ गणिताची प्रमुख ताकद आहे.',
        revisionPoints: [
          '(a±b)² = a² ± 2ab + b²; a² − b² = (a+b)(a−b).',
          'नफा-तोटा CP वर; सूट MP वर.',
          '२ वर्षांचा CI − SI = P(R/100)².',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u2-mr-q1',
            question: 'जर x + (1/x) = 6, तर x² + (1/x²) ची किंमत किती?',
            options: ['32', '34', '36', '38'],
            correctAnswer: 1,
            explanation: 'दोन्ही बाजूंचा वर्ग करून: x² + 2 + 1/x² = 36 → x² + 1/x² = 34.',
            topicReference: 'घटक २ · विस्तार सूत्रे',
          },
          {
            id: 'math-p2-u2-mr-q2',
            question: 'एका दुकानदाराने वस्तूची छापील किंमत खरेदी किमतीपेक्षा २५% जास्त ठेवून त्यावर १०% सूट दिली. त्याला शेकडा नफा किती झाला?',
            options: ['१२.५%', '१५%', '१०%', '१७.५%'],
            correctAnswer: 0,
            explanation: 'खरेदी = 100 → छापील = 125 → 10% सूट (12.5) → विक्री = 112.5 → निव्वळ नफा = 12.5%.',
            topicReference: 'घटक २ · नफा-तोटा व सूट',
          },
          {
            id: 'math-p2-u2-mr-q3',
            question: '₹५,००० मुद्दलावर द.सा.द.शे. १० दराने २ वर्षांसाठी होणारे चक्रवाढ व्याज व सरळव्याज यांतील फरक किती?',
            options: ['₹२५', '₹५०', '₹७५', '₹१००'],
            correctAnswer: 1,
            explanation: 'CI − SI = P(R/100)² = 5000 × (10/100)² = ₹50.',
            topicReference: 'घटक २ · सरळव्याज व चक्रवाढ व्याज',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर २) · इकाई २: बीजगणित एवं वाणिज्यिक अंकगणित',
        unitTitle: 'इकाई २: बीजीय व्यंजक, रैखिक समीकरण व वाणिज्य गणित',
        topicTitle: 'सर्वसमिकाएँ, गुणनखंडन, एकचर रैखिक समीकरण, अनुपात-समानुपात, लाभ-हानि, बट्टा, साधारण व चक्रवृद्धि ब्याज',
        subtopics: [
          'बीजीय व्यंजक, पद, गुणांक, बहुपद की घात एवं संक्रियाएँ',
          'मानक सर्वसमिकाएँ: (a±b)², a²−b², (x+a)(x+b), a³±b³',
          'गुणनखंडन (मध्य पद विभाजन) एवं एकचर रैखिक समीकरण',
          'अनुपात-समानुपात (सीधा व व्युत्क्रमानुपात), कार्य-समय, चाल-दूरी',
          'प्रतिशत, लाभ-हानि, अंकित मूल्य व बट्टा, साधारण ब्याज (SI) एवं चक्रवृद्धि ब्याज (CI)',
        ],
        introduction:
          'बीजगणित और वाणिज्यिक अंकगणित मिलकर पेपर २ गणित में ८–१० उच्च-अंकदायी प्रश्न बनाते हैं। सर्वसमिकाओं, गुणनखंडन और ब्याज सूत्रों पर पकड़ समय बचाती है।',
        meaningAndDefinition:
          'सर्वसमिका (Identity) वह समता है जो चर के प्रत्येक मान के लिए सत्य होती है, जबकि समीकरण (Equation) केवल विशिष्ट हल के लिए सत्य होता है।',
        detailedExplanation: [
          '१. मानक सर्वसमिकाएँ: (a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; a²−b² = (a+b)(a−b); (x+a)(x+b) = x²+(a+b)x+ab।',
          '२. सीधा बनाम व्युत्क्रमानुपात: सीधा (x/y = k); व्युत्क्रमानुपात (x × y = k — मज़दूर बढ़ने पर दिन घटते हैं)।',
          '३. लाभ-हानि व बट्टा: लाभ%/हानि% सदैव क्रय मूल्य (CP) पर, जबकि बट्टा/छूट% सदैव अंकित मूल्य (MP) पर निकाला जाता है।',
          '४. साधारण व चक्रवृद्धि ब्याज: SI = (P×R×T)/100; मिश्रधन A = P(1 + R/100)ⁿ। अर्द्धवार्षिक संयोजन में दर आधी (R/2) व समय दुगुना (2n)। २ वर्षों के लिए CI − SI = P(R/100)²।',
        ],
        importantConcepts: [
          'क्रमिक प्रतिशत परिवर्तन: a + b + (ab)/100।',
          '२ वर्षों का CI − SI अंतर = P(R/100)²।',
        ],
        comparisonTable: {
          caption: 'वाणिज्य गणित के प्रमुख सूत्र',
          headers: ['अवधारणा', 'सूत्र', 'आधार मूल्य'],
          rows: [
            ['लाभ / हानि %', '(लाभ या हानि ÷ CP) × 100', 'सदैव क्रय मूल्य (CP)'],
            ['बट्टा (छूट) %', '(बट्टा ÷ MP) × 100', 'सदैव अंकित मूल्य (MP)'],
            ['साधारण ब्याज', '(P × R × T) / 100', 'मूलधन P'],
            ['चक्रवृद्धि मिश्रधन', 'A = P(1 + R/100)ⁿ', 'प्रत्येक अवधि का मिश्रधन'],
          ],
        },
        practicalExamples: [
          'यदि x + 1/x = 6, तो x² + 1/x² = 6² − 2 = 34।',
        ],
        classroomApplications: [
          'बीजगणित टाइल्स (Algebra Tiles) द्वारा क्षेत्रफल मॉडल से (a+b)² सिद्ध कराएँ।',
        ],
        teachingMethods: [
          'ज्यामितीय क्षेत्रफल मॉडल व तुला संतुलन विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में बहुपद गुणांक तुलना, द्विघात गुणनखंडन, रैखिक समीकरण व अंकित मूल्य-बट्टा-CI प्रश्न नियमित आते हैं।',
          mahaTet: 'MAHA TET में अनुपात-समानुपात, प्रतिशत, लाभ-हानि, अर्द्धवार्षिक CI व कार्य-समय प्रश्न प्रमुख हैं।',
        },
        importantExamPoints: [
          'लाभ/हानि का आधार CP; बट्टा का आधार MP।',
          'कोष्ठक के बाहर ऋण चिह्न होने पर भीतर के सभी चिह्न बदल जाते हैं।',
        ],
        commonMistakes: [
          '(a+b)² = a²+b² लिख देना या लाभ की गणना विक्रय मूल्य पर कर लेना।',
        ],
        topicSummary:
          'सर्वसमिकाएँ, गुणनखंडन, रैखिक समीकरण, अनुपात, लाभ-हानि-बट्टा तथा SI/CI पेपर २ के मुख्य अंकदायी स्तंभ हैं।',
        revisionPoints: [
          '(a±b)² = a² ± 2ab + b²; a² − b² = (a+b)(a−b)।',
          'लाभ/हानि CP पर; बट्टा MP पर।',
          '२ वर्ष (CI − SI) = P(R/100)²।',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u2-hi-q1',
            question: 'यदि x + (1/x) = 6 हो, तो x² + (1/x²) का मान क्या होगा?',
            options: ['32', '34', '36', '38'],
            correctAnswer: 1,
            explanation: 'दोनों पक्षों का वर्ग करने पर x² + 2 + 1/x² = 36 → x² + 1/x² = 34।',
            topicReference: 'इकाई २ · सर्वसमिकाएँ',
          },
          {
            id: 'math-p2-u2-hi-q2',
            question: 'एक दुकानदार वस्तु का मूल्य क्रय मूल्य से २५% अधिक अंकित करता है और १०% बट्टा देता है। उसका शुद्ध लाभ प्रतिशत क्या है?',
            options: ['१२.५%', '१५%', '१०%', '१७.५%'],
            correctAnswer: 0,
            explanation: 'CP = 100 → MP = 125 → 10% बट्टा (12.5) → SP = 112.5 → लाभ = 12.5%।',
            topicReference: 'इकाई २ · लाभ-हानि व बट्टा',
          },
          {
            id: 'math-p2-u2-hi-q3',
            question: '₹५,००० पर १०% वार्षिक दर से २ वर्षों के चक्रवृद्धि ब्याज और साधारण ब्याज का अंतर कितना होगा?',
            options: ['₹२५', '₹५०', '₹७५', '₹१००'],
            correctAnswer: 1,
            explanation: 'CI − SI = P(R/100)² = 5000 × (10/100)² = ₹50।',
            topicReference: 'इकाई २ · SI एवं CI',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER II — UNIT 3: GEOMETRY, MENSURATION & DATA HANDLING
  // =========================================================================
  {
    slug: 'math-p2-u3-geometry-mensuration-statistics',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Geometry (Lines, Triangles, Congruence, Quadrilaterals, Polygons), Mensuration (2D/3D) & Data Handling (Mean, Median, Mode, Probability)',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Parallel Lines, Triangles, Pythagoras, Circles, Area, Surface Area & Volume, Statistics & Probability',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper II) · Unit 3: Geometry, Mensuration & Statistics',
        unitTitle: 'Unit 3: Geometry, 2D/3D Mensuration, Statistics & Probability',
        topicTitle: 'Lines & Angles, Triangles/Congruence, Polygons, Area/Volume/Surface Area, Mean-Median-Mode & Probability',
        subtopics: [
          'Complementary (90°), Supplementary (180°), Vertically Opposite & Parallel-Line Angles',
          'Triangles: Angle Sum, Exterior Angle, Inequality, Pythagoras Theorem & Congruence (SSS, SAS, ASA, AAS, RHS)',
          'Quadrilaterals & Polygons: Interior Angle Sum = (n−2)×180°; Exterior Angle Sum = 360°',
          'Mensuration: Area of Triangle/Trapezium/Rhombus/Circle & Surface Area/Volume of Cube, Cuboid, Cylinder, Cone',
          'Statistics & Probability: Mean, Median, Mode, Range, Empirical Relation (Mode = 3 Median − 2 Mean) & P(E)',
        ],
        introduction:
          'Geometry, 2D/3D Mensuration, and Statistics-Probability represent the largest quantitative block in Paper II Mathematics (often 10–12 marks). Formula fluency coupled with angle-chasing and data-distribution skills ensures quick, accurate answers.',
        meaningAndDefinition:
          'Two triangles are Congruent (≅) if they have the exact same shape AND exact same size (all corresponding sides and angles equal). Mensuration quantifies linear perimeter, 2D area, curved/total surface area, and 3D volume.',
        detailedExplanation: [
          '1. Angles & Polygons: Complementary sum = 90°; Supplementary sum = 180°. Parallel lines cut by transversal give equal Corresponding and Alternate Interior angles, and supplementary Co-interior angles (180°). Polygon of n sides: Sum of interior angles = (n − 2) × 180°; Number of diagonals = n(n − 3)/2; Sum of ALL exterior angles of ANY convex polygon = 360°.',
          '2. Triangles & Congruence: Triangle Inequality: sum of any two sides > third side. Exterior angle = sum of two opposite interior angles. Congruence criteria: SSS, SAS, ASA, AAS, RHS (NOTE: AAA proves SIMILARITY, NOT Congruence; SSA is NOT valid!).',
          '3. Key 2D & 3D Mensuration Formulas: Area of Trapezium = ½(a + b)h; Area of Rhombus = ½ × d₁ × d₂; Circle Circumference = 2πr, Area = πr²; Cuboid Volume = lbh, TSA = 2(lb+bh+hl); Cylinder Volume = πr²h, CSA = 2πrh, TSA = 2πr(r+h). Remember: 1 m³ = 1,000 Litres; 1,000 cm³ = 1 Litre.',
          '4. Statistics (Central Tendency): Mean = Sum / n; Median = middle value after sorting in ascending order (for even n, average of n/2 and (n/2 + 1) terms); Mode = most frequent value; Range = Max − Min. Empirical Formula: Mode = 3 Median − 2 Mean.',
          '5. Probability: P(E) = (Favourable outcomes) / (Total equally likely outcomes); 0 ≤ P(E) ≤ 1; P(E) + P(not E) = 1.',
        ],
        importantConcepts: [
          'AAA & SSA are NOT congruence criteria for triangles.',
          'Empirical Relation: Mode = 3 Median − 2 Mean.',
          '1 m³ = 1,000 Litres; 1 cm³ = 1 mL.',
        ],
        comparisonTable: {
          caption: 'Paper II Mensuration Formula Sheet',
          headers: ['Figure / Solid', 'Area / Surface Area', 'Volume / Perimeter'],
          rows: [
            ['Trapezium', 'Area = ½(a + b) × h', 'Sum of 4 sides'],
            ['Rhombus', 'Area = ½ × d₁ × d₂', 'Perimeter = 4a (a² = (d₁/2)²+(d₂/2)²)'],
            ['Circle', 'Area = πr²', 'Circumference = 2πr'],
            ['Cube (side a)', 'LSA = 4a²; TSA = 6a²', 'Volume = a³'],
            ['Cuboid (l, b, h)', 'LSA = 2h(l+b); TSA = 2(lb+bh+hl)', 'Volume = l × b × h'],
            ['Cylinder (r, h)', 'CSA = 2πrh; TSA = 2πr(r+h)', 'Volume = πr²h'],
          ],
        },
        practicalExamples: [
          'For data {4, 7, 9, 7, 12, 7, 10}: Sorted = {4, 7, 7, 7, 9, 10, 12}. Median = 7, Mode = 7, Range = 12 − 4 = 8, Mean = 56/7 = 8.',
          'A regular octagon (n=8) has interior angle sum = (8 − 2) × 180° = 1,080°, each interior angle = 135°.',
        ],
        classroomApplications: [
          'Wrap a rectangular sheet around a cylinder to prove why Curved Surface Area = circumference × height = 2πrh.',
        ],
        teachingMethods: [
          'Activity-based derivation (cutting parallelograms into rectangles, unrolling cylinders) rather than blind formula memorization.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II asks 1–2 questions EVERY exam on: (a) Mean/Median/Mode/Range of an unsorted dataset, (b) Cylinder/Cuboid/Trapezium mensuration, (c) Triangle congruence matching (△ABC ≅ △PQR vertex order!), and (d) Complementary/Supplementary/Polygon angles.',
          mahaTet: 'MAHA TET Paper II emphasizes Circle chord/arc properties, Pythagoras triplets, Rhombus/Trapezium area, Cylinder/Cone/Sphere volume, and Dice/Coin/Card probability.',
        },
        importantExamPoints: [
          'ALWAYS sort data in ascending order BEFORE finding the Median!',
          'In congruence statements like △ABC ≅ △DEF, vertex correspondence matters strictly (AB = DE, ∠B = ∠E).',
          'Sum of exterior angles of ANY convex polygon is ALWAYS 360°.',
        ],
        commonMistakes: [
          'Finding Median without sorting the numbers first.',
          'Treating AAA as a congruence criterion (it proves Similarity only!).',
        ],
        topicSummary:
          'Unit 3 synthesizes angle geometry, triangle congruence, polygon formulas, 2D/3D mensuration, statistical central tendency, and classical probability.',
        revisionPoints: [
          'Polygon interior sum = (n−2)×180°; exterior sum = 360°.',
          'Congruence = SSS, SAS, ASA, AAS, RHS (NOT AAA/SSA).',
          'Cylinder: CSA = 2πrh, Vol = πr²h; Trapezium = ½(a+b)h; Rhombus = ½d₁d₂.',
          'Sort first for Median! Mode = 3 Median − 2 Mean; 0 ≤ P(E) ≤ 1.',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u3-en-q1',
            question: 'Find the sum of the Mean, Median, and Range of the data: 12, 8, 15, 10, 15, 6, 18.',
            options: ['34', '36', '38', '40'],
            correctAnswer: 1,
            explanation: 'Sorted: 6, 8, 10, 12, 15, 15, 18. Mean = 84/7 = 12; Median = 12; Range = 18 − 6 = 12. Sum = 12 + 12 + 12 = 36.',
            topicReference: 'Unit 3 · Statistics',
          },
          {
            id: 'math-p2-u3-en-q2',
            question: 'What is the area of a trapezium whose parallel sides measure 14 cm and 18 cm and the perpendicular distance between them is 9 cm?',
            options: ['126 cm²', '144 cm²', '162 cm²', '288 cm²'],
            correctAnswer: 1,
            explanation: 'Area = ½(a + b)h = ½(14 + 18) × 9 = 16 × 9 = 144 cm².',
            topicReference: 'Unit 3 · 2D Mensuration',
          },
          {
            id: 'math-p2-u3-en-q3',
            question: 'Which of the following is NOT a valid criterion for congruence of two triangles?',
            options: ['SAS', 'ASA', 'RHS', 'AAA'],
            correctAnswer: 3,
            explanation: 'AAA ensures triangles are Similar (same shape), NOT necessarily Congruent (same size).',
            topicReference: 'Unit 3 · Triangle Congruence',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर २) · घटक ३: भूमिती, महत्त्वमापन, सांख्यिकी व संभाव्यता',
        unitTitle: 'घटक ३: रेषा-कोन, त्रिकोण एकरूपता, क्षेत्रफळ-घनफळ व सांख्यिकी',
        topicTitle: 'समांतर रेषा, त्रिकोण एकरूपता, बहुभुजाकृती, समलंब-समभुज-वृत्तचिती महत्त्वमापन, मध्य-मध्यक-बहुलक व संभाव्यता',
        subtopics: [
          'कोटीकोन (90°), पूरककोन (180°), विरुद्ध कोन व समांतर रेषांचे कोन',
          'त्रिकोण: कोन बेरीज, बाह्यकोन, पायथागोरस प्रमेय व एकरूपता कसोट्या (बाबाबा, बाकोबा, कोबाको, कोकोबा, कर्णभुजा)',
          'बहुभुजाकृती: अंतरकोनांची बेरीज = (n−2)×180°; बाह्यकोनांची बेरीज = 360°',
          'महत्त्वमापन: समलंब चौकोन, समभुज चौकोन, वर्तुळ, घन, इष्टिकाचिती, वृत्तचिती व शंकू',
          'सांख्यिकी (मध्य, मध्यक, बहुलक, विस्तार) व संभाव्यता (Probability)',
        ],
        introduction:
          'पेपर २ गणितामध्ये भूमिती, महत्त्वमापन आणि सांख्यिकी-संभाव्यता या घटकांवर १० ते १२ गुण असतात. अचूक सूत्रे व चढत्या क्रमाने मध्यक काढण्याची सवय केल्यास हे प्रश्न अत्यंत वेगाने सुटतात.',
        meaningAndDefinition:
          'ज्या दोन त्रिकोणांचे आकार व माप तंतोतंत सारखे असतात त्यांना एकरूप त्रिकोण (Congruent Triangles) म्हणतात. मध्य, मध्यक व बहुलक ही केंद्रीय प्रवृत्तीची मापे आहेत.',
        detailedExplanation: [
          '१. कोन व बहुभुजाकृती: कोटीकोन बेरीज = 90°; पूरककोन बेरीज = 180°. n बाजूंच्या बहुभुजाकृतीच्या अंतरकोनांची बेरीज = (n−2)×180°; कर्ण संख्या = n(n−3)/2; कोणत्याही बहिर्वक्र बहुभुजाकृतीच्या सर्व बाह्यकोनांची बेरीज नेहमी 360° असते.',
          '२. त्रिकोण एकरूपता: SSS (बाबाबा), SAS (बाकोबा), ASA (कोबाको), AAS, RHS (कर्णभुजा). लक्षात ठेवा: AAA (कोकोको) ही समरूपतेची कसोटी आहे, एकरूपतेची नव्हे!',
          '३. महत्त्वमापन सूत्रे: समलंब चौकोन क्षेत्रफळ = ½(a+b)h; समभुज चौकोन = ½ × d₁ × d₂; वर्तुळ परिघ = 2πr, क्षेत्रफळ = πr²; वृत्तचिती वक्रपृष्ठफळ = 2πrh, एकूण पृष्ठफळ = 2πr(r+h), घनफळ = πr²h. 1 घ.मी. = 1000 लिटर.',
          '४. सांख्यिकी व संभाव्यता: मध्य = बेरीज/संख्या; मध्यक = चढत्या क्रमाने मांडल्यावर मधली संख्या; बहुलक = सर्वाधिक वेळा येणारी संख्या; विस्तार = कमाल − किमान. संबंध: बहुलक = 3(मध्यक) − 2(मध्य). संभाव्यता 0 ≤ P(E) ≤ 1.',
        ],
        importantConcepts: [
          'मध्यक काढण्यापूर्वी माहिती चढत्या क्रमाने मांडणे अनिवार्य आहे.',
          'बहुलक = 3 मध्यक − 2 मध्य.',
          '1 घ.मी. = 1,000 लिटर; 1,000 घ.सेमी. = 1 लिटर.',
        ],
        comparisonTable: {
          caption: 'पेपर २ महत्त्वमापन सूत्र तक्ता',
          headers: ['आकृती / घनाकृती', 'क्षेत्रफळ / पृष्ठफळ', 'घनफळ / परिमिती'],
          rows: [
            ['समलंब चौकोन', '½(समांतर बाजूंची बेरीज) × उंची', 'सर्व बाजूंची बेरीज'],
            ['समभुज चौकोन', '½ × d₁ × d₂', 'परिमिती = 4 × बाजू'],
            ['वर्तुळ', 'πr²', 'परिघ = 2πr'],
            ['घन (बाजू a)', 'उभे = 4a²; एकूण = 6a²', 'घनफळ = a³'],
            ['वृत्तचिती (r, h)', 'वक्र = 2πrh; एकूण = 2πr(r+h)', 'घनफळ = πr²h'],
          ],
        },
        practicalExamples: [
          '12, 8, 15, 10, 15, 6, 18 → चढता क्रम: 6, 8, 10, 12, 15, 15, 18 → मध्य = 12, मध्यक = 12, विस्तार = 18 − 6 = 12.',
        ],
        classroomApplications: [
          'आयताकृती कागद गुंडाळून वृत्तचिती बनवून वक्रपृष्ठफळ = 2πrh प्रत्यक्ष सिद्ध करून दाखवावे.',
        ],
        teachingMethods: [
          'प्रत्यक्ष कृतीतून सूत्रनिर्मिती पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये मध्य-मध्यक-बहुलक-विस्तार, वृत्तचिती/समलंब/इष्टिकाचिती, त्रिकोण एकरूपता व कोटीकोन-पूरककोन प्रश्न दरवर्षी येतात.',
          mahaTet: 'MAHA TET पेपर २ मध्ये वर्तुळ जीवा/कंस, पायथागोरस, समभुज-समलंब क्षेत्रफळ, शंकू-गोल घनफळ व फासे-नाणे संभाव्यता विचारली जाते.',
        },
        importantExamPoints: [
          'AAA (कोकोको) ही एकरूपतेची कसोटी नाही.',
          'मध्यक काढताना आधी चढता क्रम लावा.',
        ],
        commonMistakes: [
          'माहिती चढत्या क्रमाने न लावता मध्यक काढणे.',
        ],
        topicSummary:
          'कोन-बहुभुजाकृती, एकरूपता, महत्त्वमापन सूत्रे आणि मध्य-मध्यक-बहुलक-संभाव्यता हे पेपर २ गणिताचे निर्णायक घटक आहेत.',
        revisionPoints: [
          'बहुभुजाकृती अंतरकोन बेरीज = (n−2)×180°; बाह्यकोन बेरीज = 360°.',
          'एकरूपता: SSS, SAS, ASA, AAS, RHS (AAA नव्हे!).',
          'बहुलक = 3 मध्यक − 2 मध्य.',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u3-mr-q1',
            question: '12, 8, 15, 10, 15, 6, 18 या माहितीचा मध्य, मध्यक आणि विस्तार यांची बेरीज किती?',
            options: ['34', '36', '38', '40'],
            correctAnswer: 1,
            explanation: 'चढता क्रम: 6, 8, 10, 12, 15, 15, 18. मध्य = 12, मध्यक = 12, विस्तार = 12 → बेरीज = 36.',
            topicReference: 'घटक ३ · सांख्यिकी',
          },
          {
            id: 'math-p2-u3-mr-q2',
            question: 'एका समलंब चौकोनाच्या समांतर बाजू 14 सेमी व 18 सेमी असून त्यांमधील लंब अंतर 9 सेमी आहे, तर त्याचे क्षेत्रफळ किती?',
            options: ['126 चौ.सेमी.', '144 चौ.सेमी.', '162 चौ.सेमी.', '288 चौ.सेमी.'],
            correctAnswer: 1,
            explanation: 'क्षेत्रफळ = ½(14 + 18) × 9 = 16 × 9 = 144 चौ.सेमी.',
            topicReference: 'घटक ३ · महत्त्वमापन',
          },
          {
            id: 'math-p2-u3-mr-q3',
            question: 'पुढीलपैकी कोणती कसोटी दोन त्रिकोणांच्या एकरूपतेची (Congruence) कसोटी नाही?',
            options: ['SAS', 'ASA', 'RHS', 'AAA'],
            correctAnswer: 3,
            explanation: 'AAA ही केवळ समरूपतेची कसोटी आहे, एकरूपतेची नाही.',
            topicReference: 'घटक ३ · त्रिकोण एकरूपता',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर २) · इकाई ३: ज्यामिति, क्षेत्रमिति, सांख्यिकी एवं प्रायिकता',
        unitTitle: 'इकाई ३: रेखा-कोण, सर्वांगसमता, क्षेत्रफल-आयतन व सांख्यिकी',
        topicTitle: 'समांतर रेखाएँ, त्रिभुज सर्वांगसमता, बहुभुज, समलंब-समचतुर्भुज-बेलन क्षेत्रमिति, माध्य-माध्यक-बहुलक एवं प्रायिकता',
        subtopics: [
          'पूरक (90°), संपूरक (180°), शीर्षाभिमुख एवं समांतर रेखा कोण',
          'त्रिभुज: कोण योग, बहिष्कोण, पाइथागोरस व सर्वांगसमता कसौटियाँ (SSS, SAS, ASA, AAS, RHS)',
          'बहुभुज: अंतःकोण योग = (n−2)×180°; बाह्यकोण योग = 360°',
          'क्षेत्रमिति: समलंब, समचतुर्भुज, वृत्त, घन, घनाभ, बेलन एवं शंकु',
          'सांख्यिकी (माध्य, माध्यक, बहुलक, परिसर) तथा प्रायिकता',
        ],
        introduction:
          'ज्यामिति, क्षेत्रमिति और सांख्यिकी-प्रायिकता पेपर २ गणित का सबसे बड़ा खंड (१०–१२ अंक) हैं।',
        meaningAndDefinition:
          'समान आकार और समान माप वाले त्रिभुज सर्वांगसम (Congruent) कहलाते हैं। माध्य, माध्यक और बहुलक केंद्रीय प्रवृत्ति की प्रमुख मापें हैं।',
        detailedExplanation: [
          '१. कोण व बहुभुज: पूरक = 90°; संपूरक = 180°। n भुजाओं के बहुभुज में अंतःकोण योग = (n−2)×180°, विकर्ण = n(n−3)/2, बाह्यकोण योग सदैव 360°।',
          '२. सर्वांगसमता: SSS, SAS, ASA, AAS, RHS वैध हैं। AAA केवल समरूपता (Similarity) दर्शाती है, सर्वांगसमता नहीं।',
          '३. क्षेत्रमिति: समलंब क्षेत्रफल = ½(a+b)h; समचतुर्भुज = ½d₁d₂; वृत्त = πr²; बेलन CSA = 2πrh, TSA = 2πr(r+h), आयतन = πr²h। 1 मी³ = 1000 लीटर।',
          '४. सांख्यिकी व प्रायिकता: माध्य = योग/n; माध्यक = आरोही क्रम में मध्य पद; बहुलक = सर्वाधिक आवृत्ति; परिसर = अधिकतम − न्यूनतम। संबंध: बहुलक = 3 माध्यक − 2 माध्य। 0 ≤ P(E) ≤ 1।',
        ],
        importantConcepts: [
          'माध्यक निकालने से पूर्व आँकड़ों को आरोही क्रम में अवश्य लगाएँ।',
          'बहुलक = 3 माध्यक − 2 माध्य।',
        ],
        comparisonTable: {
          caption: 'पेपर २ क्षेत्रमिति सूत्र तालिका',
          headers: ['आकृति / ठोस', 'क्षेत्रफल / पृष्ठीय क्षेत्रफल', 'आयतन / परिमाप'],
          rows: [
            ['समलंब चतुर्भुज', '½(a + b) × h', 'चारों भुजाओं का योग'],
            ['समचतुर्भुज', '½ × d₁ × d₂', 'परिमाप = 4a'],
            ['वृत्त', 'πr²', 'परिधि = 2πr'],
            ['घन (भुजा a)', 'पार्श्व = 4a²; कुल = 6a²', 'आयतन = a³'],
            ['बेलन (r, h)', 'वक्र = 2πrh; कुल = 2πr(r+h)', 'आयतन = πr²h'],
          ],
        },
        practicalExamples: [
          '12, 8, 15, 10, 15, 6, 18 → आरोही क्रम: 6, 8, 10, 12, 15, 15, 18 → माध्य=12, माध्यक=12, परिसर=12।',
        ],
        classroomApplications: [
          'आयताकार कागज़ मोड़कर बेलन बनाकर CSA = 2πrh का व्यावहारिक प्रमाण दिखाएँ।',
        ],
        teachingMethods: [
          'गतिविधि-आधारित सूत्र व्युत्पत्ति विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में माध्य-माध्यक-बहुलक-परिसर, बेलन/समलंब/घनाभ, त्रिभुज सर्वांगसमता और पूरक-संपूरक कोण प्रश्न निश्चित आते हैं।',
          mahaTet: 'MAHA TET में वृत्त जीवा, पाइथागोरस, समचतुर्भुज-समलंब, शंकु-गोला व पासा-सिक्का प्रायिकता प्रमुख हैं।',
        },
        importantExamPoints: [
          'AAA सर्वांगसमता की कसौटी नहीं है।',
          'माध्यक से पहले आरोही क्रम अनिवार्य है।',
        ],
        commonMistakes: [
          'आरोही क्रम में रखे बिना मध्य पद को माध्यक मान लेना।',
        ],
        topicSummary:
          'कोण, बहुभुज, सर्वांगसमता, 2D/3D क्षेत्रमिति और सांख्यिकी-प्रायिकता पेपर २ गणित के सबसे अधिक अंकदायी विषय हैं।',
        revisionPoints: [
          'बहुभुज अंतःकोण योग = (n−2)×180°; बाह्यकोण योग = 360°।',
          'सर्वांगसमता = SSS, SAS, ASA, AAS, RHS (AAA नहीं)।',
          'बहुलक = 3 माध्यक − 2 माध्य; 0 ≤ P(E) ≤ 1।',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u3-hi-q1',
            question: 'आँकड़ों 12, 8, 15, 10, 15, 6, 18 के माध्य, माध्यक और परिसर का योग क्या है?',
            options: ['34', '36', '38', '40'],
            correctAnswer: 1,
            explanation: 'आरोही क्रम: 6, 8, 10, 12, 15, 15, 18। माध्य=12, माध्यक=12, परिसर=12 → योग = 36।',
            topicReference: 'इकाई ३ · सांख्यिकी',
          },
          {
            id: 'math-p2-u3-hi-q2',
            question: 'एक समलंब चतुर्भुज की समांतर भुजाएँ 14 सेमी व 18 सेमी तथा बीच की ऊँचाई 9 सेमी है। इसका क्षेत्रफल क्या होगा?',
            options: ['126 वर्ग सेमी', '144 वर्ग सेमी', '162 वर्ग सेमी', '288 वर्ग सेमी'],
            correctAnswer: 1,
            explanation: 'क्षेत्रफल = ½(14 + 18) × 9 = 16 × 9 = 144 वर्ग सेमी।',
            topicReference: 'इकाई ३ · क्षेत्रमिति',
          },
          {
            id: 'math-p2-u3-hi-q3',
            question: 'निम्नलिखित में से कौन-सी त्रिभुज सर्वांगसमता की वैध कसौटी नहीं है?',
            options: ['SAS', 'ASA', 'RHS', 'AAA'],
            correctAnswer: 3,
            explanation: 'AAA केवल समरूपता सिद्ध करती है, सर्वांगसमता नहीं।',
            topicReference: 'इकाई ३ · सर्वांगसमता',
          },
        ],
      },
    },
  },

  // =========================================================================
  // MATH PAPER II — UNIT 4: UPPER PRIMARY MATHEMATICS PEDAGOGY
  // =========================================================================
  {
    slug: 'math-p2-u4-upper-primary-math-pedagogy',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'MATHEMATICS',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Pedagogical Issues in Mathematics (10 Marks): Logical Thinking, Axioms/Proofs, Inductive-Deductive, Analytic-Synthetic, Heuristic, Evaluation & Remediation',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Upper Primary Math Teaching Methods, Proof vs. Verification, Math Lab & Remedial Teaching',
    },
    content: {
      English: {
        documentTitle: 'Mathematics (Paper II) · Unit 4: Upper Primary Mathematics Pedagogy',
        unitTitle: 'Unit 4: Pedagogical Issues in Upper Primary Mathematics',
        topicTitle: 'Axioms, Conjectures & Proof, Teaching Methods (Inductive-Deductive, Analytic-Synthetic, Heuristic) & Evaluation',
        subtopics: [
          'Logical structure of Mathematics: Axioms, Postulates, Conjectures, Theorems & Counterexamples',
          'Proof vs. Verification (why measuring 3 triangles is verification, NOT formal proof)',
          'Teaching Methods: Inductive vs. Deductive, Analytic vs. Synthetic, Heuristic (Armstrong), Laboratory & Project Methods',
          'Role of GeoGebra, Mathematics Laboratory, and Open-Ended Investigations in Grades VI–VIII',
          'Diagnostic Evaluation, Common Algebraic/Geometric Misconceptions & Remedial Teaching',
        ],
        introduction:
          'At the Upper Primary stage (Classes VI–VIII), mathematics transitions from concrete arithmetic to abstract algebra and deductive geometry. Paper II Pedagogy tests the logical structure of mathematics (axioms, conjectures, proofs) and classical teaching methods.',
        meaningAndDefinition:
          'An Axiom/Postulate is a self-evident foundational statement accepted WITHOUT proof; a Conjecture is an unproved pattern-based guess; a Theorem is a statement rigorously proved via deductive logic; a single Counterexample suffices to DISPROVE a general statement.',
        detailedExplanation: [
          '1. Proof vs. Verification: Measuring angles of 5 paper triangles and getting 180° each time is Empirical VERIFICATION (inductive), NOT a formal deductive PROOF! A formal proof establishes universal truth for ALL possible triangles using axioms and parallel-line theorems.',
          '2. Inductive vs. Deductive Method: Inductive moves from Specific Examples → General Rule (Known → Unknown; Concrete → Abstract; psychological & discovery-oriented). Deductive moves from General Rule/Formula → Specific Application (fast, efficient for practice & geometry proofs). Best practice: Induct first to discover, Deduct next to apply!',
          '3. Analytic vs. Synthetic Method: Analytic breaks the unknown conclusion down to known facts ("What do we need to prove this?" — promotes discovery & logical reasoning). Synthetic builds forward from given hypotheses to conclusion (compact, textbook-style presentation).',
          '4. Heuristic Method (H. E. Armstrong — Greek "Heurisco" = "I discover"): Places the student in the role of an active independent discoverer rather than a passive listener.',
          '5. Upper Primary Misconceptions & Remediation: Students often write 2x + 3y = 5xy (conjoining unlike terms) or −3 − 5 = +8 (confusing multiplication sign rule with subtraction). Address via Algebra Tiles, number-line walks, and non-judgmental diagnostic error analysis.',
        ],
        importantConcepts: [
          'Counterexample: One single exception disproves a universal conjecture (e.g., "All prime numbers are odd" is disproved by the single counterexample 2).',
          'Axiom (general across math) vs. Postulate (specifically Euclidean geometry).',
          'GeoGebra: Free dynamic software connecting algebra and geometry interactively.',
        ],
        comparisonTable: {
          caption: 'Comparison of Upper Primary Mathematics Teaching Methods',
          headers: ['Method', 'Direction of Thought', 'Key Strength', 'Limitation'],
          rows: [
            ['Inductive', 'Examples → General Rule', 'Active discovery, durable understanding', 'Time-consuming; cannot prove universally'],
            ['Deductive', 'General Rule → Examples', 'Fast, concise, establishes formal proof', 'Can encourage rote if used alone'],
            ['Analytic', 'Unknown (Goal) → Known (Given)', 'Develops problem-solving & "why"', 'Longer written steps'],
            ['Synthetic', 'Known (Given) → Unknown (Goal)', 'Elegant, crisp textbook proofs', 'Hides HOW the steps were discovered'],
            ['Heuristic (Armstrong)', 'Guided self-discovery', 'High scientific temper & autonomy', 'Requires skilled teacher scaffolding'],
          ],
        },
        keyThinkers: [
          { name: 'H. E. Armstrong', contribution: 'Pioneered the Heuristic Method ("I discover") emphasizing independent inquiry.' },
          { name: 'W. H. Kilpatrick', contribution: 'Developed the Project Method ("wholehearted purposeful activity in a social setting").' },
          { name: 'Euclid', contribution: 'Systematized axiomatic geometry (Definitions, Postulates, Common Notions/Axioms, Theorems).' },
        ],
        practicalExamples: [
          'To disprove "Every odd number greater than 1 is prime", giving the single counterexample 9 (9 = 3 × 3) suffices completely.',
        ],
        classroomApplications: [
          'Use Analytic questioning ("What intermediate angle would help us find ∠x?") during geometry problem solving before writing the clean Synthetic proof on the board.',
        ],
        teachingMethods: [
          'Inductive-Deductive blend, Analytic-Synthetic pairing, Heuristic Discovery, and Mathematics Lab.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II Math Pedagogy consistently tests: Axiom vs. Conjecture vs. Theorem, Proof vs. Verification, Counterexamples, Inductive-Deductive & Analytic-Synthetic methods, and GeoGebra/Math Lab.',
          mahaTet: 'MAHA TET Paper II tests Heuristic (Armstrong), Project (Kilpatrick), Analytic-Synthetic differences, and remediation of algebraic misconceptions.',
        },
        importantExamPoints: [
          'Measuring 10 triangles to check angle sum = 180° is VERIFICATION, never a mathematical PROOF.',
          'ONE counterexample is enough to disprove a conjecture, but even 1,000 examples cannot formally prove it.',
          'Analytic = Unknown → Known (discovery); Synthetic = Known → Unknown (presentation).',
        ],
        commonMistakes: [
          'Confusing Analytic (Unknown → Known) with Synthetic (Known → Unknown).',
          'Thinking empirical verification counts as formal deductive proof.',
        ],
        topicSummary:
          'Upper Primary Math Pedagogy anchors learners in logical deduction—distinguishing axioms, conjectures, counterexamples, and proofs—through Inductive-Deductive, Analytic-Synthetic, and Heuristic inquiry.',
        revisionPoints: [
          'Axiom = assumed without proof; Conjecture = unproved guess; Theorem = proved deductively.',
          '1 Counterexample disproves a universal statement.',
          'Analytic = Unknown → Known; Synthetic = Known → Unknown; Heuristic = Armstrong.',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u4-en-q1',
            question: 'A teacher has students cut out five different paper triangles, tear off their corners, and place them along a straight line to see they form 180°. Pedagogically, this activity represents:',
            options: [
              'A formal deductive proof',
              'Empirical verification / inductive exploration',
              'A counterexample',
              'An axiomatic postulate',
            ],
            correctAnswer: 1,
            explanation: 'Testing a finite number of physical cases is inductive empirical verification, which builds intuition before formal deductive proof.',
            topicReference: 'Unit 4 · Proof vs. Verification',
          },
          {
            id: 'math-p2-u4-en-q2',
            question: 'Which teaching method proceeds from the UNKNOWN (what is to be proved) backwards to the KNOWN (given facts) to build logical discovery?',
            options: ['Synthetic method', 'Analytic method', 'Lecture method', 'Drill method'],
            correctAnswer: 1,
            explanation: 'The Analytic method starts from the conclusion/goal and breaks it down logically until it reaches the given known facts.',
            topicReference: 'Unit 4 · Analytic vs. Synthetic',
          },
          {
            id: 'math-p2-u4-en-q3',
            question: 'To disprove the conjecture "All prime numbers are odd," which mathematical strategy is sufficient?',
            options: [
              'Testing 100 odd numbers',
              'Providing the single counterexample 2 (which is even and prime)',
              'Memorizing Euclid’s axioms',
              'Drawing a bar graph',
            ],
            correctAnswer: 1,
            explanation: 'A single valid counterexample (2) completely disproves a universal conjecture.',
            topicReference: 'Unit 4 · Conjectures & Counterexamples',
          },
        ],
      },
      Marathi: {
        documentTitle: 'गणित (पेपर २) · घटक ४: उच्च प्राथमिक गणित अध्यापनशास्त्र',
        unitTitle: 'घटक ४: उच्च प्राथमिक गणित अध्यापन पद्धती व तार्किक रचना',
        topicTitle: 'गृहीतके, अनुमान व सिद्धता, अध्यापन पद्धती (उद्गामी-अवगामी, विश्लेषण-संश्लेषण, स्वयंशोधन) व मूल्यमापन',
        subtopics: [
          'गणिताची तार्किक रचना: गृहीतके (Axioms), अनुमान (Conjecture), प्रमेय (Theorem) व प्रत्युदाहरण (Counterexample)',
          'सिद्धता (Proof) विरुद्ध पडताळणी (Verification) यांतील फरक',
          'अध्यापन पद्धती: उद्गामी-अवगामी, विश्लेषण-संश्लेषण, स्वयंशोधन (आर्मस्ट्राँग), प्रयोगशाळा व प्रकल्प पद्धती',
          'जिओजेब्रा (GeoGebra), गणित प्रयोगशाळा व मुक्तोत्तरी अन्वेषण',
          'बीजगणित-भूमितीतील सामान्य गैरसमज, नैदानिक व उपचारात्मक अध्यापन',
        ],
        introduction:
          'इयत्ता ६ वी ते ८ वी मध्ये गणित मूर्त अंकगणिताकडून अमूर्त बीजगणित व तार्किक भूमितीकडे वळते. म्हणूनच पेपर २ अध्यापनशास्त्रात गृहीतके-सिद्धता, प्रत्युदाहरण आणि विश्लेषण-संश्लेषण व स्वयंशोधन पद्धतींवर प्रश्न विचारले जातात.',
        meaningAndDefinition:
          'गृहीतक (Axiom) म्हणजे सिद्धतेशिवाय सत्य मानलेले मूलभूत विधान; अनुमान (Conjecture) म्हणजे नमुन्यांवरून बांधलेला असिद्ध अंदाज; प्रमेय म्हणजे तार्किक सिद्धता दिलेले सत्य; आणि प्रत्युदाहरण (Counterexample) म्हणजे एखादे सर्वसाधारण विधान खोटे सिद्ध करणारा एकच अपवाद होय.',
        detailedExplanation: [
          '१. सिद्धता विरुद्ध पडताळणी: ५ कागदी त्रिकोणांचे कोन मोजून बेरीज 180° दाखवणे ही प्रायोगिक पडताळणी (Verification) आहे, औपचारिक सिद्धता (Proof) नव्हे! औपचारिक सिद्धता ही सर्व संभाव्य त्रिकोणांसाठी तार्किकरीत्या सत्य असते.',
          '२. उद्गामी विरुद्ध अवगामी पद्धती: उद्गामी = उदाहरणाकडून नियमाकडे (ज्ञात → अज्ञात, शोधक); अवगामी = नियमाकडून उदाहरणाकडे (वेगवान, सरावासाठी उपयुक्त).',
          '३. विश्लेषण विरुद्ध संश्लेषण पद्धती: विश्लेषण (Analytic) = अज्ञाताकडून ज्ञाताकडे ("काय सिद्ध करायचे आहे, त्यासाठी काय हवे?" — विचारप्रवृत्त करणारी); संश्लेषण (Synthetic) = ज्ञाताकडून अज्ञाताकडे (संक्षिप्त, पाठ्यपुस्तकीय मांडणी).',
          '४. स्वयंशोधन पद्धती (Heuristic — एच. ई. आर्मस्ट्राँग): "मी स्वतः शोधतो" या तत्त्वावर आधारित; विद्यार्थी स्वतः अन्वेषक बनतो.',
          '५. सामान्य गैरसमज: 2x + 3y = 5xy लिहिणे किंवा −3 − 5 = +8 लिहिणे हे संकल्पनात्मक गैरसमज आहेत; ते बीजगणित टाइल्स व संख्यारेषेने दूर करावेत.',
        ],
        importantConcepts: [
          'प्रत्युदाहरण: "सर्व मूळ संख्या विषम असतात" हे खोटे ठरवण्यासाठी "2" हे एकच प्रत्युदाहरण पुरेसे आहे.',
          'जिओजेब्रा (GeoGebra): बीजगणित व भूमिती जोडणारे आधुनिक संगणकीय साधन.',
        ],
        comparisonTable: {
          caption: 'उच्च प्राथमिक गणित अध्यापन पद्धतींची तुलना',
          headers: ['पद्धती', 'विचाराची दिशा', 'मुख्य वैशिष्ट्य'],
          rows: [
            ['उद्गामी (Inductive)', 'उदाहरणे → सामान्य नियम', 'स्वयंशोधातून चिरस्थायी आकलन'],
            ['अवगामी (Deductive)', 'सामान्य नियम → उदाहरणे', 'वेगवान सराव व औपचारिक सिद्धता'],
            ['विश्लेषण (Analytic)', 'अज्ञात (साध्य) → ज्ञात (पक्ष)', 'तार्किक विचार व "का?" चे उत्तर'],
            ['संश्लेषण (Synthetic)', 'ज्ञात (पक्ष) → अज्ञात (साध्य)', 'सुटसुटीत व संक्षिप्त सिद्धता'],
            ['स्वयंशोधन (Heuristic)', 'विद्यार्थ्याचा स्वतंत्र शोध', 'वैज्ञानिक दृष्टिकोन विकास (आर्मस्ट्राँग)'],
          ],
        },
        keyThinkers: [
          { name: 'एच. ई. आर्मस्ट्राँग', contribution: 'स्वयंशोधन पद्धतीचे (Heuristic Method) जनक.' },
          { name: 'डब्ल्यू. एच. किलपॅट्रिक', contribution: 'प्रकल्प पद्धतीचे (Project Method) प्रवर्तक.' },
          { name: 'युक्लिड', contribution: 'गृहीतकाधिष्ठित भूमितीचे जनक.' },
        ],
        practicalExamples: [
          'प्रमेय शिकवताना आधी विश्लेषण पद्धतीने मार्ग शोधून नंतर संश्लेषण पद्धतीने स्वच्छ सिद्धता लिहिणे सर्वोत्तम असते.',
        ],
        classroomApplications: [
          'गणित प्रयोगशाळेत जिओजेब्रा व बीजगणित टाइल्सद्वारे अमूर्त समीकरणे दृश्य स्वरूपात शिकवावीत.',
        ],
        teachingMethods: [
          'उद्गामी-अवगामी समन्वय, विश्लेषण-संश्लेषण जोड व स्वयंशोधन पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये गृहीतक-अनुमान-प्रमेय, सिद्धता विरुद्ध पडताळणी, प्रत्युदाहरण, विश्लेषण-संश्लेषण व जिओजेब्रा यांवर नियमित प्रश्न येतात.',
          mahaTet: 'MAHA TET पेपर २ मध्ये स्वयंशोधन (आर्मस्ट्राँग), प्रकल्प (किलपॅट्रिक), विश्लेषण-संश्लेषण फरक व उपचारात्मक अध्यापन विचारले जाते.',
        },
        importantExamPoints: [
          'कागद कापून त्रिकोणाच्या कोनांची बेरीज 180° दाखवणे ही पडताळणी (Verification) आहे, सिद्धता नव्हे.',
          'विश्लेषण = अज्ञाताकडून ज्ञाताकडे; संश्लेषण = ज्ञाताकडून अज्ञाताकडे.',
        ],
        commonMistakes: [
          'विश्लेषण आणि संश्लेषण यांची दिशा उलटी लक्षात ठेवणे.',
        ],
        topicSummary:
          'गृहीतक-अनुमान-प्रत्युदाहरण-सिद्धता या तार्किक चौकटीसोबत विश्लेषण-संश्लेषण व स्वयंशोधन पद्धती उच्च प्राथमिक गणिताला अर्थपूर्ण बनवतात.',
        revisionPoints: [
          'प्रत्युदाहरण = एकाच अपवादाने विधान खोटे सिद्ध करणे.',
          'विश्लेषण = अज्ञात → ज्ञात; संश्लेषण = ज्ञात → अज्ञात.',
          'स्वयंशोधन = आर्मस्ट्राँग; प्रकल्प पद्धती = किलपॅट्रिक.',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u4-mr-q1',
            question: 'शिक्षकांनी विद्यार्थ्यांकडून पाच कागदी त्रिकोणांचे कोन फाडून सरळ रेषेत लावून 180° बेरीज दाखवली. अध्यापनशास्त्रानुसार ही कृती काय आहे?',
            options: ['औपचारिक निगमन सिद्धता', 'प्रायोगिक पडताळणी / उद्गामी अन्वेषण', 'प्रत्युदाहरण', 'गृहीतक'],
            correctAnswer: 1,
            explanation: 'मर्यादित उदाहरणे तपासून निष्कर्ष पाहणे म्हणजे प्रायोगिक पडताळणी (Verification), औपचारिक सिद्धता नव्हे.',
            topicReference: 'घटक ४ · सिद्धता विरुद्ध पडताळणी',
          },
          {
            id: 'math-p2-u4-mr-q2',
            question: 'कोणत्या अध्यापन पद्धतीत "अज्ञाताकडून ज्ञाताकडे" (साध्याकडून पक्षाकडे) प्रवास केला जातो?',
            options: ['संश्लेषण पद्धती', 'विश्लेषण पद्धती (Analytic Method)', 'व्याख्यान पद्धती', 'सराव पद्धती'],
            correctAnswer: 1,
            explanation: 'विश्लेषण पद्धती साध्यापासून (अज्ञात) सुरू होऊन तार्किकरीत्या पक्षापर्यंत (ज्ञात) पोहोचते.',
            topicReference: 'घटक ४ · विश्लेषण-संश्लेषण',
          },
          {
            id: 'math-p2-u4-mr-q3',
            question: '"सर्व मूळ संख्या विषम असतात" हे अनुमान चुकीचे ठरवण्यासाठी काय पुरेसे आहे?',
            options: ['१०० विषम संख्या तपासणे', '"२" हे एकमेव प्रत्युदाहरण देणे', 'युक्लिडची गृहीतके पाठ करणे', 'स्तंभालेख काढणे'],
            correctAnswer: 1,
            explanation: 'कोणतेही सर्वसाधारण अनुमान खोटे ठरवण्यासाठी एकच अचूक प्रत्युदाहरण (येथे सम मूळ संख्या २) पुरेसे असते.',
            topicReference: 'घटक ४ · प्रत्युदाहरण',
          },
        ],
      },
      Hindi: {
        documentTitle: 'गणित (पेपर २) · इकाई ४: उच्च प्राथमिक गणित शिक्षाशास्त्र',
        unitTitle: 'इकाई ४: उच्च प्राथमिक गणित की शिक्षण विधियाँ एवं तार्किक संरचना',
        topicTitle: 'अभिगृहीत, अनुमान व उपपत्ति (Proof), शिक्षण विधियाँ (आगमन-निगमन, विश्लेषण-संश्लेषण, ह्यूरिस्टिक) एवं मूल्यांकन',
        subtopics: [
          'गणित की तार्किक संरचना: अभिगृहीत (Axioms), अनुमान (Conjecture), प्रमेय एवं प्रतिउदाहरण (Counterexample)',
          'उपपत्ति (Proof) बनाम सत्यापन (Verification) में अंतर',
          'शिक्षण विधियाँ: आगमन-निगमन, विश्लेषण-संश्लेषण, अन्वेषण/ह्यूरिस्टिक (आर्मस्ट्रांग), प्रयोगशाला व प्रोजेक्ट विधि',
          'जियोजेब्रा (GeoGebra), गणित प्रयोगशाला व मुक्त-अंत अन्वेषण',
          'बीजगणित-ज्यामिति की सामान्य भ्रांतियाँ एवं उपचारात्मक शिक्षण',
        ],
        introduction:
          'उच्च प्राथमिक स्तर (कक्षा ६–८) पर गणित मूर्त अंकगणित से अमूर्त बीजगणित व निगमनात्मक ज्यामिति की ओर बढ़ता है। पेपर २ शिक्षाशास्त्र में उपपत्ति बनाम सत्यापन, प्रतिउदाहरण तथा विश्लेषण-संश्लेषण विधियों पर निरंतर प्रश्न आते हैं।',
        meaningAndDefinition:
          'अभिगृहीत (Axiom) बिना प्रमाण के स्वीकृत स्वयंसिद्ध कथन है; अनुमान (Conjecture) पैटर्न-आधारित अप्रामाणित धारणा है; प्रमेय निगमनात्मक उपपत्ति से सिद्ध कथन है; और प्रतिउदाहरण (Counterexample) किसी सार्वभौम कथन को असत्य सिद्ध करने वाला एकमात्र अपवाद है।',
        detailedExplanation: [
          '१. उपपत्ति (Proof) बनाम सत्यापन (Verification): ५ कागज़ के त्रिभुजों के कोण नापकर 180° दिखाना अनुभवजन्य सत्यापन है, औपचारिक उपपत्ति नहीं। औपचारिक उपपत्ति सभी त्रिभुजों के लिए निगमनात्मक तर्क से सत्य स्थापित करती है।',
          '२. आगमन बनाम निगमन विधि: आगमन = उदाहरण से नियम (ज्ञात → अज्ञात); निगमन = नियम से उदाहरण (तीव्र अभ्यास व उपपत्ति)।',
          '३. विश्लेषण बनाम संश्लेषण विधि: विश्लेषण (Analytic) = अज्ञात (साध्य) से ज्ञात (दिया गया) की ओर — खोज व तार्किक सोच बढ़ाती है। संश्लेषण (Synthetic) = ज्ञात से अज्ञात की ओर — संक्षिप्त पाठ्यपुस्तकीय प्रस्तुति।',
          '४. अन्वेषण / ह्यूरिस्टिक विधि (एच. ई. आर्मस्ट्रांग): "मैं स्वयं खोजता हूँ" के सिद्धांत पर आधारित।',
          '५. बीजगणितीय भ्रांतियाँ: 2x + 3y = 5xy लिखना असमान पदों को जोड़ने की अवधारणात्मक त्रुटि है, जिसे बीजगणित टाइल्स से सुधारें।',
        ],
        importantConcepts: [
          'प्रतिउदाहरण: "सभी अभाज्य संख्याएँ विषम होती हैं" को असत्य सिद्ध करने हेतु केवल "2" पर्याप्त है।',
          'जियोजेब्रा (GeoGebra): बीजगणित व ज्यामिति का संवादात्मक गतिशील सॉफ्टवेयर।',
        ],
        comparisonTable: {
          caption: 'उच्च प्राथमिक गणित शिक्षण विधियों की तुलना',
          headers: ['विधि', 'विचार की दिशा', 'प्रमुख विशेषता'],
          rows: [
            ['आगमन (Inductive)', 'उदाहरण → सामान्य नियम', 'सक्रिय खोज व स्थायी समझ'],
            ['निगमन (Deductive)', 'सामान्य नियम → उदाहरण', 'त्वरित अभ्यास एवं औपचारिक उपपत्ति'],
            ['विश्लेषण (Analytic)', 'अज्ञात (साध्य) → ज्ञात (दत्त)', 'तार्किक सोच व "क्यों?" का बोध'],
            ['संश्लेषण (Synthetic)', 'ज्ञात (दत्त) → अज्ञात (साध्य)', 'सुगठित एवं संक्षिप्त प्रमाण'],
            ['ह्यूरिस्टिक (आर्मस्ट्रांग)', 'स्वतंत्र अन्वेषण', 'वैज्ञानिक दृष्टिकोण का विकास'],
          ],
        },
        keyThinkers: [
          { name: 'एच. ई. आर्मस्ट्रांग', contribution: 'ह्यूरिस्टिक (अन्वेषण) विधि के प्रवर्तक।' },
          { name: 'डब्ल्यू. एच. किलपैट्रिक', contribution: 'प्रोजेक्ट (परियोजना) विधि के जनक।' },
          { name: 'यूक्लिड', contribution: 'अभिगृहीतात्मक ज्यामिति के जनक।' },
        ],
        practicalExamples: [
          'ज्यामिति प्रमेय पहले विश्लेषण विधि से खोजकर फिर संश्लेषण विधि से क्रमबद्ध लिखना सर्वश्रेष्ठ है।',
        ],
        classroomApplications: [
          'गणित प्रयोगशाला व जियोजेब्रा द्वारा अमूर्त संबंधों को गतिशील रूप में प्रदर्शित करें।',
        ],
        teachingMethods: [
          'आगमन-निगमन संयोजन, विश्लेषण-संश्लेषण युग्म एवं ह्यूरिस्टिक अन्वेषण।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में अभिगृहीत-अनुमान-प्रमेय, उपपत्ति बनाम सत्यापन, प्रतिउदाहरण, विश्लेषण-संश्लेषण व जियोजेब्रा नियमित पूछे जाते हैं।',
          mahaTet: 'MAHA TET में ह्यूरिस्टिक (आर्मस्ट्रांग), प्रोजेक्ट (किलपैट्रिक) तथा बीजगणितीय भ्रांति निवारण प्रमुख हैं।',
        },
        importantExamPoints: [
          'सीमित उदाहरणों की जाँच सत्यापन है, औपचारिक उपपत्ति नहीं।',
          'विश्लेषण = अज्ञात → ज्ञात; संश्लेषण = ज्ञात → अज्ञात।',
        ],
        commonMistakes: [
          'विश्लेषण और संश्लेषण की दिशा आपस में बदल देना।',
        ],
        topicSummary:
          'अभिगृहीत-अनुमान-प्रतिउदाहरण-उपपत्ति की स्पष्ट समझ तथा विश्लेषण-संश्लेषण व ह्यूरिस्टिक विधियाँ उच्च प्राथमिक गणित शिक्षण को वैज्ञानिक बनाती हैं।',
        revisionPoints: [
          '१ प्रतिउदाहरण किसी सार्वभौम अनुमान को असत्य सिद्ध करने हेतु पर्याप्त है।',
          'विश्लेषण = अज्ञात → ज्ञात; संश्लेषण = ज्ञात → अज्ञात।',
          'ह्यूरिस्टिक = आर्मस्ट्रांग; प्रोजेक्ट विधि = किलपैट्रिक।',
        ],
        practiceQuestions: [
          {
            id: 'math-p2-u4-hi-q1',
            question: 'शिक्षक छात्रों से पाँच कागज़ के त्रिभुजों के कोने फाड़कर सीधी रेखा में रखवाते हैं जिससे 180° बनता दिखता है। यह गतिविधि क्या दर्शाती है?',
            options: ['औपचारिक निगमनात्मक उपपत्ति', 'अनुभवजन्य सत्यापन / आगमनात्मक अन्वेषण', 'प्रतिउदाहरण', 'अभिगृहीत'],
            correctAnswer: 1,
            explanation: 'कुछ भौतिक उदाहरणों की जाँच करना सत्यापन (Verification) है, औपचारिक उपपत्ति नहीं।',
            topicReference: 'इकाई ४ · उपपत्ति बनाम सत्यापन',
          },
          {
            id: 'math-p2-u4-hi-q2',
            question: 'किस शिक्षण विधि में "अज्ञात (साध्य) से ज्ञात (दत्त)" की ओर बढ़ा जाता है?',
            options: ['संश्लेषण विधि', 'विश्लेषण विधि (Analytic Method)', 'व्याख्यान विधि', 'अभ्यास विधि'],
            correctAnswer: 1,
            explanation: 'विश्लेषण विधि साध्य (अज्ञात) से प्रारंभ कर ज्ञात तथ्यों तक पहुँचती है।',
            topicReference: 'इकाई ४ · विश्लेषण-संश्लेषण',
          },
          {
            id: 'math-p2-u4-hi-q3',
            question: '"सभी अभाज्य संख्याएँ विषम होती हैं" इस अनुमान को असत्य सिद्ध करने के लिए क्या पर्याप्त है?',
            options: ['१०० विषम संख्याओं की जाँच', '"२" का एकमात्र प्रतिउदाहरण देना', 'यूक्लिड के अभिगृहीत रटना', 'दंड आलेख बनाना'],
            correctAnswer: 1,
            explanation: 'एक सम अभाज्य संख्या "२" का प्रतिउदाहरण इस सार्वभौम अनुमान को पूर्णतः असत्य सिद्ध कर देता है।',
            topicReference: 'इकाई ४ · प्रतिउदाहरण',
          },
        ],
      },
    },
  },
];
