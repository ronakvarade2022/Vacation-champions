// ============================================================================
// CURATED PAPER II (UPPER PRIMARY: CLASSES VI TO VIII) ENGLISH QUESTION BANKS
// For CTET Paper II & MAHA TET Paper II (English Medium)
// Covers:
// 1. Upper Primary Mathematics & Pedagogy (60 distinct questions)
// 2. Upper Primary Science & Pedagogy (60 distinct questions)
// 3. Upper Primary Social Studies / Social Science & Pedagogy (120 distinct questions)
// ============================================================================

export interface CuratedPaper2Mcq {
  id: string;
  subject: 'MATHEMATICS' | 'SCIENCE' | 'SOCIAL_STUDIES';
  topic: string;
  questionType:
    | 'Conceptual'
    | 'Application-Based'
    | 'Classroom-Situation'
    | 'Case-Based'
    | 'Numerical'
    | 'Logical-Reasoning'
    | 'Statement-Based'
    | 'Match-the-Following'
    | 'Assertion-Reasoning'
    | 'Diagram-Based';
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0..3
  explanation: string;
}

// ============================================================================
// 1. UPPER PRIMARY MATHEMATICS & PEDAGOGY (60 QUESTIONS)
// ============================================================================
export const PAPER2_CURATED_MATH_60: CuratedPaper2Mcq[] = [
  {
    id: 'p2_math_01',
    subject: 'MATHEMATICS',
    topic: 'Number System – Rational Numbers & Additive/Multiplicative Identities',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which of the following statements is always true for any non-zero rational number p/q?',
    options: [
      'Its additive inverse is -p/q and the product of p/q with its multiplicative inverse is 1',
      'Its additive identity is 1 and its multiplicative identity is 0',
      'Its reciprocal is -q/p and the sum of p/q with its reciprocal is 0',
      'Rational numbers are closed under division by zero'
    ],
    correctAnswer: 0,
    explanation: 'For any non-zero rational number p/q, 0 is the additive identity (additive inverse is -p/q) and 1 is the multiplicative identity (multiplicative inverse is q/p, so (p/q)×(q/p) = 1).'
  },
  {
    id: 'p2_math_02',
    subject: 'MATHEMATICS',
    topic: 'Number System – Divisibility Rules',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If the seven-digit number 54x3271 is completely divisible by 11, what is the value of the digit x?',
    options: ['6', '4', '8', '2'],
    correctAnswer: 0,
    explanation: 'Sum of digits at odd positions (1st, 3rd, 5th, 7th) = 5 + x + 2 + 1 = 8 + x. Sum of digits at even positions (2nd, 4th, 6th) = 4 + 3 + 7 = 14. For divisibility by 11, (8 + x) - 14 = 0 ⇒ x = 6.'
  },
  {
    id: 'p2_math_03',
    subject: 'MATHEMATICS',
    topic: 'Exponents and Powers',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If (3^(2x - 1) × 9^(x + 1)) / 27^(x) = 81, then what is the value of x?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'Express all powers with base 3: numerator = 3^(2x - 1) × 3^(2x + 2) = 3^(4x + 1). Denominator = 3^(3x). Quotient = 3^(4x + 1 - 3x) = 3^(x + 1). Since 81 = 3^4, x + 1 = 4 ⇒ x = 3.'
  },
  {
    id: 'p2_math_04',
    subject: 'MATHEMATICS',
    topic: 'Algebra – Linear Equations in One Variable',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The present ages of a father and his son are in the ratio 7 : 2. After 10 years, their ages will be in the ratio 9 : 4. What is the present age of the father?',
    options: ['35 years', '42 years', '28 years', '49 years'],
    correctAnswer: 0,
    explanation: 'Let present ages be 7x and 2x. After 10 years: (7x + 10)/(2x + 10) = 9/4 ⇒ 28x + 40 = 18x + 90 ⇒ 10x = 50 ⇒ x = 5. Present age of the father = 7 × 5 = 35 years.'
  },
  {
    id: 'p2_math_05',
    subject: 'MATHEMATICS',
    topic: 'Algebra – Algebraic Identities',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If x + (1/x) = 5, what is the value of x³ + (1/x³)?',
    options: ['110', '125', '115', '140'],
    correctAnswer: 0,
    explanation: 'Using the identity x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x), we get 5³ - 3(5) = 125 - 15 = 110.'
  },
  {
    id: 'p2_math_06',
    subject: 'MATHEMATICS',
    topic: 'Algebra – Factorisation of Polynomials',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which of the following is the complete factorisation of the expression 4a² - 9b² + 12bc - 4c²?',
    options: [
      '(2a + 3b - 2c)(2a - 3b + 2c)',
      '(2a + 3b + 2c)(2a - 3b - 2c)',
      '(4a - 3b + 2c)(a + 3b - 2c)',
      '(2a - 3b - 2c)²'
    ],
    correctAnswer: 0,
    explanation: 'Group the last three terms: 4a² - (9b² - 12bc + 4c²) = (2a)² - (3b - 2c)² = (2a + 3b - 2c)(2a - 3b + 2c).'
  },
  {
    id: 'p2_math_07',
    subject: 'MATHEMATICS',
    topic: 'Ratio, Proportion & Unitary Method',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'In a science library, the ratio of Physics books to Chemistry books is 4 : 5, and the ratio of Chemistry books to Biology books is 3 : 4. If there are 144 Physics books, how many Biology books are there?',
    options: ['240', '180', '216', '192'],
    correctAnswer: 0,
    explanation: 'Combined ratio P : C : B = (4×3) : (5×3) : (5×4) = 12 : 15 : 20. Since 12 parts = 144, 1 part = 12. Biology books = 20 × 12 = 240.'
  },
  {
    id: 'p2_math_08',
    subject: 'MATHEMATICS',
    topic: 'Commercial Mathematics – Percentage & Discount',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A bookshop marks a dictionary 25% above its cost price and allows a 12% discount on the marked price. What is the net profit percentage earned?',
    options: ['10%', '13%', '12.5%', '15%'],
    correctAnswer: 0,
    explanation: 'Let CP = ₹100. Marked Price = ₹125. Selling Price after 12% discount = 125 × (1 - 0.12) = 125 × 0.88 = ₹110. Net profit = 10%.'
  },
  {
    id: 'p2_math_09',
    subject: 'MATHEMATICS',
    topic: 'Commercial Mathematics – Compound Interest',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'What is the compound interest on ₹12,000 for 2 years at 10% per annum compounded annually?',
    options: ['₹2,520', '₹2,400', '₹2,640', '₹2,480'],
    correctAnswer: 0,
    explanation: 'Amount A = 12000 × (1 + 10/100)² = 12000 × 1.21 = ₹14,520. Compound Interest = 14,520 - 12,000 = ₹2,520.'
  },
  {
    id: 'p2_math_10',
    subject: 'MATHEMATICS',
    topic: 'Time and Work – Inverse Proportion',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A can paint a classroom in 12 days and B can paint the same classroom in 15 days. They work together for 4 days, after which A leaves. How many more days will B take to finish the remaining work?',
    options: ['6 days', '5 days', '7.5 days', '8 days'],
    correctAnswer: 0,
    explanation: 'Combined 1-day work = 1/12 + 1/15 = 9/60 = 3/20. Work done in 4 days = 4 × (3/20) = 12/20 = 3/5. Remaining work = 2/5. Time taken by B = (2/5) × 15 = 6 days.'
  },
  {
    id: 'p2_math_11',
    subject: 'MATHEMATICS',
    topic: 'Time, Speed and Distance – Relative Speed',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'A train 180 metres long is running at a speed of 72 km/h. How long will it take to cross a platform 220 metres long?',
    options: ['20 seconds', '18 seconds', '25 seconds', '15 seconds'],
    correctAnswer: 0,
    explanation: 'Speed in m/s = 72 × (5/18) = 20 m/s. Total distance to cover = 180 + 220 = 400 m. Time = 400 / 20 = 20 seconds.'
  },
  {
    id: 'p2_math_12',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Lines, Angles & Transversals',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'Two parallel lines l and m are intersected by a transversal t. If two interior angles on the same side of the transversal are (3x + 3)° and (2x + 27)°, find the smaller of the two angles.',
    options: ['87°', '93°', '78°', '72°'],
    correctAnswer: 0,
    explanation: 'Co-interior angles on the same side of a transversal are supplementary: (3x + 3) + (2x + 27) = 180 ⇒ 5x + 30 = 180 ⇒ 5x = 150 ⇒ x = 30. The two angles are 3(30)+3 = 93° and 2(30)+27 = 87°, so the smaller angle is 87°.'
  },
  {
    id: 'p2_math_13',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Triangle Inequality & Exterior Angle Theorem',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'In ΔABC, side BC is extended to D such that exterior ∠ACD = 128°. If ∠B = (3/5)∠A, what is the measure of ∠A?',
    options: ['80°', '48°', '75°', '64°'],
    correctAnswer: 0,
    explanation: 'By the Exterior Angle Theorem, ∠A + ∠B = 128°. Substituting ∠B = (3/5)∠A gives (8/5)∠A = 128° ⇒ ∠A = 128 × 5 / 8 = 80°.'
  },
  {
    id: 'p2_math_14',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Pythagoras Theorem & Rhombus Diagonals',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'The lengths of the diagonals of a rhombus are 16 cm and 12 cm. What is the perimeter of the rhombus?',
    options: ['40 cm', '48 cm', '56 cm', '28 cm'],
    correctAnswer: 0,
    explanation: 'Diagonals of a rhombus bisect each other at right angles. Half-diagonals are 8 cm and 6 cm. Each side = √(8² + 6²) = √100 = 10 cm. Perimeter = 4 × 10 = 40 cm.'
  },
  {
    id: 'p2_math_15',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Interior and Exterior Angles of Regular Polygons',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If each interior angle of a regular polygon is 144°, how many diagonals does this polygon have?',
    options: ['35', '27', '20', '44'],
    correctAnswer: 0,
    explanation: 'Each exterior angle = 180° - 144° = 36°. Number of sides n = 360° / 36° = 10 (decagon). Number of diagonals = n(n - 3)/2 = 10 × 7 / 2 = 35.'
  },
  {
    id: 'p2_math_16',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Circle Chord Properties',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'In a circle of radius 13 cm, a chord AB is drawn at a perpendicular distance of 5 cm from the centre O. What is the length of chord AB?',
    options: ['24 cm', '12 cm', '20 cm', '26 cm'],
    correctAnswer: 0,
    explanation: 'A perpendicular from the centre bisects the chord. Half-chord = √(13² - 5²) = √(169 - 25) = 12 cm. Therefore, chord AB = 2 × 12 = 24 cm.'
  },
  {
    id: 'p2_math_17',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Area of a Trapezium',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'The parallel sides of a trapezium-shaped school garden are 28 m and 16 m, and the perpendicular distance between them is 15 m. What is the area of the garden?',
    options: ['330 m²', '660 m²', '280 m²', '360 m²'],
    correctAnswer: 0,
    explanation: 'Area of trapezium = ½ × (sum of parallel sides) × height = ½ × (28 + 16) × 15 = ½ × 44 × 15 = 330 m².'
  },
  {
    id: 'p2_math_18',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Circular Ring & Path Area',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A circular park of radius 21 m is surrounded on the outside by a uniform walking track 7 m wide. What is the area of the walking track? (Use π = 22/7)',
    options: ['1,078 m²', '1,386 m²', '924 m²', '1,232 m²'],
    correctAnswer: 0,
    explanation: 'Inner radius r = 21 m, Outer radius R = 21 + 7 = 28 m. Area of track = π(R² - r²) = (22/7) × (28 - 21)(28 + 21) = (22/7) × 7 × 49 = 22 × 49 = 1,078 m².'
  },
  {
    id: 'p2_math_19',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Volume and Surface Area of a Cylinder',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'A right circular cylinder has a base radius of 7 cm and a curved surface height of 10 cm. What are its curved surface area (CSA) and volume respectively? (Take π = 22/7)',
    options: [
      '440 cm² and 1,540 cm³',
      '748 cm² and 1,540 cm³',
      '440 cm² and 770 cm³',
      '308 cm² and 1,540 cm³'
    ],
    correctAnswer: 0,
    explanation: 'CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm². Volume = πr²h = (22/7) × 7 × 7 × 10 = 1,540 cm³.'
  },
  {
    id: 'p2_math_20',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Conservation of Volume in 3D Solids',
    questionType: 'Application-Based',
    difficulty: 'Difficult',
    question: 'A solid metallic cuboid of dimensions 22 cm × 14 cm × 9 cm is melted and recast into small solid cylinders each of radius 3.5 cm and height 6 cm. How many such cylinders are formed? (Take π = 22/7)',
    options: ['12', '14', '9', '16'],
    correctAnswer: 0,
    explanation: 'Volume of cuboid = 22 × 14 × 9 = 2,772 cm³. Volume of 1 cylinder = (22/7) × 3.5 × 3.5 × 6 = 231 cm³. Number of cylinders = 2772 / 231 = 12.'
  },
  {
    id: 'p2_math_21',
    subject: 'MATHEMATICS',
    topic: 'Data Handling – Mean, Median, and Mode',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Consider the dataset of quiz scores of 9 students: 14, 18, 12, 22, 16, 17, 25, 18, 11. What is the difference between the mode and the median of this dataset?',
    options: ['1', '0', '2', '3'],
    correctAnswer: 0,
    explanation: 'Arranging the 9 scores in ascending order: 11, 12, 14, 16, 17, 18, 18, 22, 25. The middle (5th) score is the median = 17. The most frequent score is the mode = 18. Difference = 18 - 17 = 1.'
  },
  {
    id: 'p2_math_22',
    subject: 'MATHEMATICS',
    topic: 'Data Handling – Elementary Probability',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Two fair coins are tossed simultaneously. What is the probability of obtaining at least one head?',
    options: ['3/4', '1/2', '1/4', '2/3'],
    correctAnswer: 0,
    explanation: 'Sample space S = {HH, HT, TH, TT} has 4 equally likely outcomes. Outcomes with at least one head = {HH, HT, TH} = 3. Probability = 3/4.'
  },
  {
    id: 'p2_math_23',
    subject: 'MATHEMATICS',
    topic: 'Number System – HCF and LCM Relationship',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'The HCF and LCM of two positive integers are 18 and 378 respectively. If one of the numbers is 54, what is the other number?',
    options: ['126', '108', '144', '90'],
    correctAnswer: 0,
    explanation: 'Using the property First Number × Second Number = HCF × LCM: Second Number = (18 × 378) / 54 = 378 / 3 = 126.'
  },
  {
    id: 'p2_math_24',
    subject: 'MATHEMATICS',
    topic: 'Number System – Square Roots & Pythagorean Triplets',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'What is the smallest positive integer by which 1,008 must be multiplied so that the product becomes a perfect square?',
    options: ['7', '3', '2', '14'],
    correctAnswer: 0,
    explanation: 'Prime factorisation of 1,008 = 2⁴ × 3² × 7¹. Since 7 appears with an odd exponent (1), multiplying by 7 makes all prime exponents even.'
  },
  {
    id: 'p2_math_25',
    subject: 'MATHEMATICS',
    topic: 'Algebra – Simultaneous Linear Equations',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The sum of the digits of a two-digit number is 11. When the digits are interchanged, the resulting number exceeds the original number by 27. What is the original two-digit number?',
    options: ['47', '38', '56', '29'],
    correctAnswer: 0,
    explanation: 'Let tens digit be x and units digit be y. Then x + y = 11 and (10y + x) - (10x + y) = 27 ⇒ 9(y - x) = 27 ⇒ y - x = 3. Solving gives y = 7, x = 4, so the original number is 47.'
  },
  {
    id: 'p2_math_26',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Congruence of Triangles',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Which of the following is NOT a valid criterion for proving the congruence of two triangles in Euclidean geometry?',
    options: [
      'AAA (Angle-Angle-Angle)',
      'ASA (Angle-Side-Angle)',
      'SAS (Side-Angle-Side)',
      'RHS (Right angle-Hypotenuse-Side)'
    ],
    correctAnswer: 0,
    explanation: 'AAA guarantees similarity of triangles (proportional sides), not congruence, because two triangles can have identical angles while differing in scale.'
  },
  {
    id: 'p2_math_27',
    subject: 'MATHEMATICS',
    topic: 'Coordinate Geometry – Cartesian Plane Quadrants',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'In which quadrant or on which axis of the Cartesian coordinate plane does the point P(-5, 0) lie?',
    options: [
      'On the negative X-axis',
      'In Quadrant II',
      'On the negative Y-axis',
      'In Quadrant III'
    ],
    correctAnswer: 0,
    explanation: 'A point whose y-coordinate (ordinate) is 0 lies on the X-axis; since its x-coordinate (abscissa) is -5, it lies on the negative X-axis.'
  },
  {
    id: 'p2_math_28',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Euler’s Formula for Polyhedra',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'A convex polyhedron has 12 faces and 30 edges. Using Euler’s formula (F + V - E = 2), find the number of vertices (V) of the polyhedron.',
    options: ['20', '18', '22', '16'],
    correctAnswer: 0,
    explanation: 'By Euler’s formula: F + V - E = 2 ⇒ 12 + V - 30 = 2 ⇒ V = 2 + 18 = 20.'
  },
  {
    id: 'p2_math_29',
    subject: 'MATHEMATICS',
    topic: 'Data Handling – Pie Chart Central Angle',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'In a household monthly budget of ₹36,000, ₹9,000 is spent on children’s education. What central angle represents education in a pie chart?',
    options: ['90°', '75°', '100°', '60°'],
    correctAnswer: 0,
    explanation: 'Central angle = (9,000 / 36,000) × 360° = (1/4) × 360° = 90°.'
  },
  {
    id: 'p2_math_30',
    subject: 'MATHEMATICS',
    topic: 'Number System – Cube Roots & Estimation',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'What is the value of ∛(0.027) + ∛(0.008) - ∛(0.125)?',
    options: ['0', '0.1', '0.2', '0.05'],
    correctAnswer: 0,
    explanation: '∛(0.027) = 0.3, ∛(0.008) = 0.2, and ∛(0.125) = 0.5. Therefore, 0.3 + 0.2 - 0.5 = 0.'
  },
  {
    id: 'p2_math_31',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Nature of Mathematics & Deductive Reasoning',
    questionType: 'Assertion-Reasoning',
    difficulty: 'Moderate',
    question: 'Assertion (A): In upper primary classes, students transition from empirical verification of geometric properties by measuring to logical deductive proofs.\nReason (R): Deductive reasoning establishes why a mathematical theorem holds universally for all cases rather than only for drawn examples.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      'Both (A) and (R) are false'
    ],
    correctAnswer: 0,
    explanation: 'Measuring a few triangles is inductive observation; deductive proof shows logically that the property must hold for every triangle.'
  },
  {
    id: 'p2_math_32',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – NCF 2005 Tall Shape vs Broad-Based Curriculum',
    questionType: 'Conceptual',
    difficulty: 'Difficult',
    question: 'What does the National Curriculum Framework (NCF 2005) Position Paper on Teaching Mathematics mean by the "tall shape" of school mathematics?',
    options: [
      'An overly sequential hierarchy where mastery of each topic strictly depends on mechanical mastery of the previous algorithmic step, causing many students to drop out of mathematical understanding',
      'Designing tall 3D geometric models in middle school classrooms',
      'Teaching only university-level calculus in Class 6',
      'Giving taller students leadership roles in math labs'
    ],
    correctAnswer: 0,
    explanation: 'NCF 2005 recommends shifting from a narrow "tall shape" (rigid sequential procedures) to a "broad-based" curriculum emphasizing reasoning, visualization, data handling, and problem-solving.'
  },
  {
    id: 'p2_math_33',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Diagnostic Error Analysis in Algebra',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'While expanding (a + b)², a Class 7 student consistently writes a² + b². Which pedagogical intervention addresses the root conceptual misconception most effectively?',
    options: [
      'Have the student construct a square of side (a + b) on grid paper and partition its area into four regions (a², ab, ba, b²) to visualize the missing 2ab rectangles',
      'Ask the student to write the formula (a + b)² = a² + 2ab + b² fifty times in a notebook',
      'Deduct five marks for carelessness without explanation',
      'Tell the class that squaring always distributes over addition'
    ],
    correctAnswer: 0,
    explanation: 'A geometric area model visually demonstrates why a square of side (a + b) contains two rectangular strips of area ab in addition to squares a² and b².'
  },
  {
    id: 'p2_math_34',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Van Hiele Levels of Geometric Thought',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'A Class 7 learner explains: "Every square is a rectangle because a square possesses all four properties required of a rectangle—opposite sides equal and all four angles 90°." According to Van Hiele’s theory, which level of geometric reasoning has the learner attained?',
    options: [
      'Level 2: Informal Deduction (Ordering / Relational level)',
      'Level 0: Visualization (Recognition)',
      'Level 1: Analysis (Listing isolated properties without class inclusion)',
      'Level 4: Axiomatic Rigor'
    ],
    correctAnswer: 0,
    explanation: 'Understanding logical class inclusion among shapes (e.g., all squares are rectangles and rhombuses) characterizes Van Hiele Level 2 (Informal Deduction).'
  },
  {
    id: 'p2_math_35',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Open-Ended vs Closed-Ended Problems',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Which of the following questions asked by a Class 8 mathematics teacher is an open-ended task that assesses divergent mathematical thinking?',
    options: [
      '"Construct three different pairs of linear algebraic expressions whose product has a degree of 2 and a constant term of -12."',
      '"Factorise x² + 5x + 6."',
      '"What is the degree of the polynomial 4x³ - 2x + 7?"',
      '"Evaluate 3x - 5 when x = 4."'
    ],
    correctAnswer: 0,
    explanation: 'An open-ended mathematical task admits multiple valid solutions and invites students to explore structural relationships rather than apply one routine algorithm.'
  },
  {
    id: 'p2_math_36',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Inductive vs Deductive Method',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Students measure the interior angles of a triangle, a quadrilateral, a pentagon, and a hexagon, tabulate the sums (180°, 360°, 540°, 720°), and discover the general rule (n - 2) × 180°. Which pedagogical method is being used?',
    options: [
      'Inductive Method (moving from specific examples to a general rule)',
      'Deductive Method (moving from a stated formula to routine drills)',
      'Dogmatic Lecture Method',
      'Rote Memorization Method'
    ],
    correctAnswer: 0,
    explanation: 'Inductive instruction guides learners to observe patterns across concrete cases and formulate the general mathematical law themselves.'
  },
  {
    id: 'p2_math_37',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Dynamic Geometry & ICT Integration',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'How does using dynamic geometry software (such as GeoGebra) most effectively enhance conceptual learning of triangle concurrency (circumcentre, orthocentre, centroid) in Class 7?',
    options: [
      'Students can drag a vertex continuously from acute to right to obtuse triangles and observe invariant concurrency relationships in real time',
      'It eliminates the need for students to understand angles or lines',
      'It replaces conceptual reasoning with typing speed tests',
      'It prevents students from asking questions in class'
    ],
    correctAnswer: 0,
    explanation: 'Dynamic manipulation lets learners explore invariants across continuous transformations, turning static figures into interactive conjectures.'
  },
  {
    id: 'p2_math_38',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Overcoming Mathematics Anxiety',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'According to NEP 2020 and NCF guidelines, which classroom culture helps reduce mathematics anxiety among middle-school learners?',
    options: [
      'Valuing multiple problem-solving strategies, treating errors as diagnostic learning steps, and connecting concepts to real-life puzzles and games',
      'Conducting daily speed-elimination timed tests with public rank lists',
      'Insisting that only the textbook’s exact step-by-step method earns credit',
      'Discouraging peer discussion during problem-solving'
    ],
    correctAnswer: 0,
    explanation: 'Collaborative inquiry, acceptance of diverse solution paths, and low-threat formative feedback replace math fear with agency and curiosity.'
  },
  {
    id: 'p2_math_39',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Language of Mathematics & Symbolic Notation',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'A Class 6 student struggles to translate "7 less than twice a number y" into an algebraic expression and writes 7 - 2y instead of 2y - 7. What should the teacher emphasize?',
    options: [
      'Bridge everyday relational language with concrete numerical substitutions (e.g., "7 less than twice 10") before writing symbolic expressions',
      'Skip word problems altogether and assign only symbol manipulation',
      'Tell the student that subtraction is commutative like addition',
      'Ask the student to memorize 100 word-problem translations by rote'
    ],
    correctAnswer: 0,
    explanation: 'Testing with familiar numbers (twice 10 is 20; 7 less than 20 is 20 - 7) makes the order of subtraction intuitive before generalizing to 2y - 7.'
  },
  {
    id: 'p2_math_40',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Formative Rubrics in Problem Solving',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'In a rubric designed to assess mathematical problem-solving according to George Polya’s four-stage heuristic, which four stages should be evaluated?',
    options: [
      'Understanding the problem, devising a plan, carrying out the plan, and looking back (verifying and extending)',
      'Copying the question, memorizing the answer key, writing neatly, and underlining in red ink',
      'Guessing an option, skipping steps, checking with a neighbour, and submitting early',
      'Stating the theorem, drawing margins, writing page numbers, and stapling sheets'
    ],
    correctAnswer: 0,
    explanation: 'George Polya’s classic problem-solving framework consists of: (1) Understand the problem, (2) Devise a plan, (3) Carry out the plan, and (4) Look back/reflect.'
  },
  {
    id: 'p2_math_41',
    subject: 'MATHEMATICS',
    topic: 'Number System – Operations on Integers & Number Line',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'Evaluate the integer expression: (-15) × (-8) + (-15) × 18 using the distributive property.',
    options: ['-150', '150', '-390', '390'],
    correctAnswer: 0,
    explanation: 'By distributive law: (-15) × [(-8) + 18] = (-15) × 10 = -150.'
  },
  {
    id: 'p2_math_42',
    subject: 'MATHEMATICS',
    topic: 'Fractions and Decimals – Reciprocal Division',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'A ribbon of length 15¾ metres is cut into equal pieces each of length 1¾ metres. How many pieces are obtained?',
    options: ['9', '8', '7', '11'],
    correctAnswer: 0,
    explanation: '15¾ ÷ 1¾ = (63/4) ÷ (7/4) = (63/4) × (4/7) = 63 / 7 = 9 pieces.'
  },
  {
    id: 'p2_math_43',
    subject: 'MATHEMATICS',
    topic: 'Direct and Inverse Proportions – Pipes and Cisterns',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: '6 identical water pumps working together can fill an overhead school tank in 1 hour 20 minutes. How long will 5 such pumps take to fill the same tank?',
    options: ['1 hour 36 minutes', '1 hour 12 minutes', '1 hour 40 minutes', '1 hour 30 minutes'],
    correctAnswer: 0,
    explanation: '1 hour 20 minutes = 80 minutes. Since number of pumps and time are in inverse proportion: 6 × 80 = 5 × t ⇒ t = 480 / 5 = 96 minutes = 1 hour 36 minutes.'
  },
  {
    id: 'p2_math_44',
    subject: 'MATHEMATICS',
    topic: 'Commercial Mathematics – Simple Interest vs Principal',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'At what annual rate of simple interest will a sum of money double itself in 8 years?',
    options: ['12.5%', '10%', '15%', '8.5%'],
    correctAnswer: 0,
    explanation: 'For a sum P to double, Simple Interest SI = P. Using SI = P × R × T / 100: P = P × R × 8 / 100 ⇒ R = 100 / 8 = 12.5% per annum.'
  },
  {
    id: 'p2_math_45',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Medians and Centroid of a Triangle',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In ΔPQR, PD is a median to side QR and G is the centroid of the triangle. If the total length of median PD is 18 cm, what are the lengths of PG and GD respectively?',
    options: [
      '12 cm and 6 cm',
      '9 cm and 9 cm',
      '14 cm and 4 cm',
      '10 cm and 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'The centroid G divides each median in the ratio 2 : 1 from the vertex to the midpoint of the opposite side. Thus PG = (2/3)×18 = 12 cm and GD = (1/3)×18 = 6 cm.'
  },
  {
    id: 'p2_math_46',
    subject: 'MATHEMATICS',
    topic: 'Geometry – Angle Subtended by an Arc of a Circle',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'In a circle with centre O, points A, B, and C lie on the circumference such that minor arc AB subtends ∠AOB = 116° at the centre. What is the measure of the inscribed angle ∠ACB on the major arc?',
    options: ['58°', '116°', '64°', '122°'],
    correctAnswer: 0,
    explanation: 'The angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining part of the circle: ∠ACB = ½ × 116° = 58°.'
  },
  {
    id: 'p2_math_47',
    subject: 'MATHEMATICS',
    topic: 'Mensuration – Diagonal and Surface Area of a Cube',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If the length of the space diagonal of a cube is 9√3 cm, what is the total surface area of the cube?',
    options: ['486 cm²', '729 cm³', '324 cm²', '243 cm²'],
    correctAnswer: 0,
    explanation: 'Space diagonal of a cube of edge a is a√3. Given a√3 = 9√3 ⇒ a = 9 cm. Total Surface Area = 6a² = 6 × 81 = 486 cm².'
  },
  {
    id: 'p2_math_48',
    subject: 'MATHEMATICS',
    topic: 'Data Handling – Weighted Arithmetic Mean',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'In a Class 8 mathematics examination, Section A of 20 students has a mean score of 75, and Section B of 30 students has a mean score of 80. What is the combined mean score of all 50 students?',
    options: ['78', '77.5', '79', '76.5'],
    correctAnswer: 0,
    explanation: 'Combined mean = (20 × 75 + 30 × 80) / (20 + 30) = (1500 + 2400) / 50 = 3900 / 50 = 78.'
  },
  {
    id: 'p2_math_49',
    subject: 'MATHEMATICS',
    topic: 'Algebra – Remainder & Factor Evaluation',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'For what value of k does the polynomial P(x) = 2x³ - kx² + 3x + 10 leave a remainder of 0 when divided by (x - 2)?',
    options: ['8', '6', '10', '4'],
    correctAnswer: 0,
    explanation: 'By the Factor Theorem, P(2) = 0 ⇒ 2(8) - k(4) + 3(2) + 10 = 0 ⇒ 16 - 4k + 6 + 10 = 0 ⇒ 4k = 32 ⇒ k = 8.'
  },
  {
    id: 'p2_math_50',
    subject: 'MATHEMATICS',
    topic: 'Number System – Standard Form / Scientific Notation',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How is the thickness of a biological membrane measuring 0.0000075 metres expressed in standard scientific notation?',
    options: [
      '7.5 × 10⁻⁶ m',
      '75 × 10⁻⁷ m',
      '0.75 × 10⁻⁵ m',
      '7.5 × 10⁻⁵ m'
    ],
    correctAnswer: 0,
    explanation: 'Moving the decimal point 6 places to the right gives 7.5 × 10⁻⁶ m (where 1 ≤ a < 10).'
  },
  {
    id: 'p2_math_51',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Ethnomathematics & Cultural Contexts',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A teacher begins a unit on symmetry, tessellations, and transformational geometry by having students analyze Warli art motifs and traditional Rangoli dot grids. What pedagogical principle does this illustrate?',
    options: [
      'Situating abstract mathematical structures within learners’ cultural heritage and lived visual experiences',
      'Replacing mathematics instruction with fine-arts grading',
      'Diluting geometric rigour by avoiding coordinate axes',
      'Promoting rote memorization of textbook definitions'
    ],
    correctAnswer: 0,
    explanation: 'Connecting mathematical symmetry and grid transformations to local art forms bridges home knowledge with formal geometry (NCF 2005 / NEP 2020).'
  },
  {
    id: 'p2_math_52',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Zoltan Dienes & Multiple Embodiment Principle',
    questionType: 'Conceptual',
    difficulty: 'Difficult',
    question: 'According to Zoltan Dienes’ Perceptual Variability (Multiple Embodiment) Principle in mathematics pedagogy, why should a concept like rational equivalence be taught through number lines, fraction circles, paper folding, and ratio tables?',
    options: [
      'So learners abstract the invariant mathematical structure rather than tying the concept to one superficial physical model',
      'Because different students must only learn one model each',
      'To fill classroom time without introducing symbolic notation',
      'Because paper folding works only for odd denominators'
    ],
    correctAnswer: 0,
    explanation: 'Varying the physical representation while keeping the conceptual structure constant enables learners to abstract the underlying mathematical invariant.'
  },
  {
    id: 'p2_math_53',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Misconception in Decimal Comparison',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A Class 6 student claims that 0.375 is greater than 0.8 because "375 is bigger than 8". Which diagnostic explanation and activity best resolves this error?',
    options: [
      'Whole-number bias applied to decimal digits; use a 10×10×10 base-ten grid or metre scale to compare 8 tenths (0.800) with 3 tenths 7 hundredths 5 thousandths (0.375)',
      'Ask the student to erase the decimal points and multiply both numbers',
      'Tell the student that shorter decimals are always larger without exception',
      'Assign 50 multi-digit multiplication problems'
    ],
    correctAnswer: 0,
    explanation: 'The "longer-is-larger" misconception stems from treating decimals as whole numbers; place-value grids and equalizing decimal places (0.800 vs 0.375) build place-value intuition.'
  },
  {
    id: 'p2_math_54',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Counter-Examples in Mathematical Reasoning',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'A student conjectures: "For every prime number p, the number 2p + 1 is also a prime number." Which single value of p serves as a sufficient counter-example to disprove this conjecture?',
    options: ['p = 7', 'p = 2', 'p = 3', 'p = 5'],
    correctAnswer: 0,
    explanation: 'When p = 7 (which is prime), 2p + 1 = 15 = 3 × 5, which is composite. In mathematics, a single counter-example suffices to refute a universal claim.'
  },
  {
    id: 'p2_math_55',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Analytic vs Synthetic Method of Proof',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Compare the Analytic and Synthetic methods of teaching geometric proofs in Class 8:\n1. Analytic Method — (P) Starts from what is to be proved and reasons backward to known given facts.\n2. Synthetic Method — (Q) Starts from known given hypotheses and proceeds step-by-step to the required conclusion.\nWhich pairing and pedagogical evaluation is correct?',
    options: [
      '1-P, 2-Q; Analytic fosters discovery of the proof path, whereas Synthetic presents the final proof concisely',
      '1-Q, 2-P; Synthetic is heuristic discovery while Analytic is rote copying',
      'Both Analytic and Synthetic start from unknown conclusions only',
      'Neither method is suitable for upper primary geometry'
    ],
    correctAnswer: 0,
    explanation: 'Analysis ("breaking up") reasons from unknown to known to discover *how* a proof works; Synthesis ("putting together") presents the deduction from known premises to conclusion.'
  },
  {
    id: 'p2_math_56',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Proportional Reasoning vs Additive Thinking',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A recipe for 4 persons requires 6 cups of flour. Asked how many cups are needed for 6 persons, a student answers "8 cups, because 6 is 2 more than 4, so add 2 to 6." How should the teacher diagnose this?',
    options: [
      'The learner is applying additive reasoning instead of multiplicative proportional reasoning (where the scale factor is 6/4 = 1.5, giving 9 cups)',
      'The learner does not know single-digit addition facts',
      'The learner has dyscalculia and cannot learn ratios',
      'The answer 8 cups is mathematically equivalent'
    ],
    correctAnswer: 0,
    explanation: 'Transitioning from additive comparisons (b - a) to multiplicative scaling (b / a) is the central milestone of upper-primary proportional reasoning.'
  },
  {
    id: 'p2_math_57',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Mathematical Modeling in Upper Primary',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'Class 8 students measure the drip rate of a leaking school tap (in mL per minute), formulate a linear function V(t) = rt, estimate water wasted in 30 days, and calculate the cost of replacing the washer. This activity best exemplifies:',
    options: [
      'Mathematical modeling that integrates measurement, algebraic functions, estimation, and civic problem-solving',
      'Purely theoretical axiomatic set theory',
      'Summative rote memorization of mensuration tables',
      'Distraction from syllabus completion'
    ],
    correctAnswer: 0,
    explanation: 'Mathematical modeling translates a real-world phenomenon into mathematical variables, analyzes it quantitatively, and interprets results back in context.'
  },
  {
    id: 'p2_math_58',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Concept Map & Diagnostic Portfolio',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why are student-constructed concept maps on "Quadrilaterals and Their Hierarchy" effective tools for formative assessment in Class 8?',
    options: [
      'They externalize how learners connect properties and sub-classes (parallelogram, rectangle, rhombus, square, trapezium), revealing missing links immediately',
      'They test only cursive handwriting speed',
      'They replace all numerical problem-solving permanently',
      'They allow teachers to grade papers without reading student explanations'
    ],
    correctAnswer: 0,
    explanation: 'Concept maps make students’ relational schemas visible, allowing teachers to spot hierarchical misconceptions in geometry.'
  },
  {
    id: 'p2_math_59',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – Inclusive Mathematics for Visually Impaired Learners',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Which instructional resource kit enables a student with visual impairment to participate fully in an upper-primary lesson on coordinate graphs and 3D mensuration?',
    options: [
      'Tactile pegboard geoboards with rubber bands, embossed Braille coordinate grids, and Take-Apart 3D geometric solids with tactile nets',
      'Colour-coded chalkboard diagrams projected silently on a screen',
      'Exempting the student from all geometry and algebra lessons',
      'Printed PDF worksheets in 8-point font'
    ],
    correctAnswer: 0,
    explanation: 'Tactile geoboards, raised-line coordinate grids, and physical 3D nets provide full spatial access to geometry and graphing for learners with visual impairment.'
  },
  {
    id: 'p2_math_60',
    subject: 'MATHEMATICS',
    topic: 'Math Pedagogy – NEP 2020 Computational Thinking',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Under NEP 2020 guidelines for the Middle Stage (Classes 6 to 8), why is computational thinking integrated with mathematics instruction?',
    options: [
      'To develop algorithmic decomposition, pattern recognition, abstraction, and logical debugging alongside mathematical problem-solving',
      'To replace arithmetic and geometry completely with hardware repair',
      'To restrict coding only to students scoring 100% in annual exams',
      'To eliminate reasoning proofs from school textbooks'
    ],
    correctAnswer: 0,
    explanation: 'NEP 2020 highlights computational thinking—decomposition, pattern recognition, abstraction, and step-by-step algorithmic reasoning—as a core mathematical competency from Class 6 onward.'
  }
];

// ============================================================================
// 2. UPPER PRIMARY SCIENCE & PEDAGOGY (60 QUESTIONS)
// ============================================================================
export const PAPER2_CURATED_SCIENCE_60: CuratedPaper2Mcq[] = [
  {
    id: 'p2_sci_01',
    subject: 'SCIENCE',
    topic: 'Physics – Force, Pressure & Area Relationship',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Why are school backpacks designed with broad, padded shoulder straps rather than thin cord straps?',
    options: [
      'Increasing the surface area of contact reduces the pressure (P = F/A) exerted by the weight of the bag on the shoulders',
      'Broad straps decrease the gravitational mass of the books inside the bag',
      'Broad straps increase the pressure on the shoulders to keep the bag steady',
      'Thin straps eliminate frictional force completely'
    ],
    correctAnswer: 0,
    explanation: 'Since Pressure = Force / Area, a larger contact area distributes the same downward weight over a wider region, reducing pressure on the shoulders.'
  },
  {
    id: 'p2_sci_02',
    subject: 'SCIENCE',
    topic: 'Physics – Sliding, Static, and Rolling Friction',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'When the same heavy wooden box is moved across a horizontal floor, what is the correct decreasing order of the magnitudes of frictional forces?',
    options: [
      'Static friction > Sliding friction > Rolling friction',
      'Rolling friction > Sliding friction > Static friction',
      'Sliding friction > Static friction > Rolling friction',
      'Static friction = Rolling friction > Sliding friction'
    ],
    correctAnswer: 0,
    explanation: 'Interlocking of surface irregularities is maximum at rest (static), slightly less once in motion (sliding), and least when wheels/ball bearings roll (rolling).'
  },
  {
    id: 'p2_sci_03',
    subject: 'SCIENCE',
    topic: 'Physics – Sound: Frequency, Amplitude, Pitch & Loudness',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Consider the following two statements regarding sound waves:\nStatement I: The pitch (shrillness) of a sound is determined by its frequency of vibration.\nStatement II: The loudness of a sound is proportional to the square of the amplitude of vibration.\nWhich of the above statements is/are correct?',
    options: [
      'Both Statement I and Statement II are correct',
      'Only Statement I is correct',
      'Only Statement II is correct',
      'Neither Statement I nor Statement II is correct'
    ],
    correctAnswer: 0,
    explanation: 'Higher frequency produces higher pitch (shrill sound), while loudness depends on energy, which is proportional to the square of amplitude (A²).'
  },
  {
    id: 'p2_sci_04',
    subject: 'SCIENCE',
    topic: 'Physics – Light: Image Formation by Concave and Convex Mirrors',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Why is a convex mirror preferred over a plane mirror as a rear-view wing mirror in automobiles?',
    options: [
      'It always forms an erect, diminished virtual image and provides a much wider field of view of traffic behind',
      'It forms a magnified real image of distant vehicles on the windshield',
      'It converges parallel sunbeams to a single focal point behind the driver',
      'It eliminates lateral inversion in all reflected text'
    ],
    correctAnswer: 0,
    explanation: 'A convex mirror diverges light rays to produce a virtual, erect, and diminished image regardless of object distance, offering a wide panoramic field of view.'
  },
  {
    id: 'p2_sci_05',
    subject: 'SCIENCE',
    topic: 'Physics – Refraction & Dispersion of White Light',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'When a narrow beam of white sunlight passes through a glass prism and splits into the seven-colour spectrum (VIBGYOR), which colour bends the least and which bends the most?',
    options: [
      'Red bends the least; Violet bends the most',
      'Violet bends the least; Red bends the most',
      'Green bends the least; Yellow bends the most',
      'Blue bends the least; Orange bends the most'
    ],
    correctAnswer: 0,
    explanation: 'Red light has the longest wavelength (highest speed in glass, lowest refractive index) so it deviates least; Violet has the shortest wavelength and deviates most.'
  },
  {
    id: 'p2_sci_06',
    subject: 'SCIENCE',
    topic: 'Physics – Human Eye & Myopia/Hypermetropia Correction',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'A Class 8 student sitting on the back bench reads her notebook effortlessly but cannot see the blackboard letters clearly because the image of distant objects forms in front of her retina. Which defect of vision is this and how is it corrected?',
    options: [
      'Myopia (short-sightedness); corrected using a concave (diverging) lens of appropriate focal length',
      'Hypermetropia (long-sightedness); corrected using a convex (converging) lens',
      'Presbyopia; corrected using a plane glass plate',
      'Astigmatism; corrected by increasing room brightness'
    ],
    correctAnswer: 0,
    explanation: 'In myopia, excessive curvature of the eye lens or elongated eyeball focuses distant rays in front of the retina; a concave lens diverges rays back onto the retina.'
  },
  {
    id: 'p2_sci_07',
    subject: 'SCIENCE',
    topic: 'Physics – Electric Current: Heating & Magnetic Effects',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why is Nichrome alloy used for the heating coil of an electric iron while Tin-Lead alloy is used for an electric safety fuse?',
    options: [
      'Nichrome has high resistivity and a high melting point so it glows hot without oxidizing; fuse alloy has high resistivity but a low melting point so it melts safely on overload',
      'Nichrome has a very low melting point while fuse wire has a very high melting point',
      'Both Nichrome and fuse wire are electrical insulators',
      'Nichrome operates by magnetic induction without electrical resistance'
    ],
    correctAnswer: 0,
    explanation: 'A heating element must withstand high temperatures without melting (high melting point), whereas a safety fuse must melt and break the circuit during excess current (low melting point).'
  },
  {
    id: 'p2_sci_08',
    subject: 'SCIENCE',
    topic: 'Physics – Heat Transfer: Conduction, Convection & Radiation',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Why do coastal regions like Mumbai experience a cool sea breeze blowing from the Arabian Sea toward the land during a sunny afternoon?',
    options: [
      'Land heats up faster than seawater by day; warm air over land rises and cooler air from over the sea rushes in via convection',
      'Seawater heats up much faster than sand during the afternoon',
      'Heat travels from the sea to the shore by solid conduction through rocks',
      'Earth’s magnetic field pulls ocean waves inland only at noon'
    ],
    correctAnswer: 0,
    explanation: 'Soil/rock has a lower specific heat capacity than water, warming rapidly by day and creating a low-pressure zone that draws cool sea air inland (convection current).'
  },
  {
    id: 'p2_sci_09',
    subject: 'SCIENCE',
    topic: 'Physics – Motion and Time: Distance-Time Graphs',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'On a distance-time graph, what does a straight line parallel to the horizontal time axis represent?',
    options: [
      'The object is stationary (at rest) at a fixed distance from the origin',
      'The object is moving with uniform non-zero speed',
      'The object is accelerating rapidly',
      'The object is moving in a circular orbit'
    ],
    correctAnswer: 0,
    explanation: 'When distance does not change as time advances, the slope (speed) is zero, meaning the object is at rest.'
  },
  {
    id: 'p2_sci_10',
    subject: 'SCIENCE',
    topic: 'Physics – Simple Pendulum Time Period',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'In a school physics lab, a simple pendulum completes 40 full oscillations in 64 seconds. What are its time period (T) and frequency (f)?',
    options: [
      'T = 1.6 s and f = 0.625 Hz',
      'T = 0.625 s and f = 1.6 Hz',
      'T = 2.4 s and f = 0.4 Hz',
      'T = 1.2 s and f = 0.8 Hz'
    ],
    correctAnswer: 0,
    explanation: 'Time period T = Total time / Number of oscillations = 64 / 40 = 1.6 seconds. Frequency f = 1 / T = 40 / 64 = 0.625 Hz.'
  },
  {
    id: 'p2_sci_11',
    subject: 'SCIENCE',
    topic: 'Chemistry – Acids, Bases and Natural Indicators',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'A drop of curry stain (containing turmeric) on a white shirt turns reddish-brown when scrubbed with soap, and turns yellow again when rinsed with plenty of water or lemon juice. Why?',
    options: [
      'Turmeric is a natural acid-base indicator that turns reddish-brown in basic (alkaline) medium like soap and remains yellow in neutral or acidic medium',
      'Soap is a strong mineral acid that bleaches cotton fibers red',
      'Lemon juice is a strong alkali that neutralizes acidic soap',
      'Turmeric reacts only with pure distilled water to form rust'
    ],
    correctAnswer: 0,
    explanation: 'Curcumin in turmeric remains yellow in acidic/neutral media and turns reddish-brown in the presence of bases such as sodium hydroxide/soap.'
  },
  {
    id: 'p2_sci_12',
    subject: 'SCIENCE',
    topic: 'Chemistry – Neutralization Reactions in Everyday Life',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each everyday problem with its correct chemical neutralization remedy:\n1. Ant bite (Formic acid) — (P) Organic compost releasing acidic humates\n2. Indigestion (Excess stomach HCl) — (Q) Calamine lotion (Zinc carbonate) or moist baking soda\n3. Too basic (alkaline) agricultural soil — (R) Milk of Magnesia (Magnesium hydroxide)\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P',
      '1-R, 2-P, 3-Q',
      '1-P, 2-Q, 3-R',
      '1-Q, 2-P, 3-R'
    ],
    correctAnswer: 0,
    explanation: 'Formic acid from an ant sting is neutralized by mild bases like baking soda (NaHCO₃) or calamine (ZnCO₃); stomach acid by Milk of Magnesia (Mg(OH)₂); alkaline soil by organic matter.'
  },
  {
    id: 'p2_sci_13',
    subject: 'SCIENCE',
    topic: 'Chemistry – Metals and Non-Metals: Oxides & Displacement',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'When a clean iron nail is immersed in a blue aqueous solution of copper sulphate (CuSO₄) for 30 minutes, the solution turns pale green and a brown deposit forms on the nail. Why?',
    options: [
      'Iron is more reactive than copper and displaces copper from CuSO₄ to form green iron(II) sulphate (FeSO₄) and metallic copper (Cu)',
      'Copper is more reactive than iron and dissolves the iron nail completely without residue',
      'Water evaporates leaving behind green copper carbonate crystals',
      'Iron acts as a catalyst to convert copper into sulphur gas'
    ],
    correctAnswer: 0,
    explanation: 'In the reactivity series, Fe > Cu, so single displacement occurs: Fe(s) + CuSO₄(aq, blue) → FeSO₄(aq, pale green) + Cu(s, reddish-brown).'
  },
  {
    id: 'p2_sci_14',
    subject: 'SCIENCE',
    topic: 'Chemistry – Physical vs Chemical Changes & Rusting',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is galvanization (coating iron sheets with a thin layer of zinc) highly effective in preventing the rusting of iron?',
    options: [
      'Zinc blocks contact with moist air and, being more reactive than iron, acts as a sacrificial anode even if the coating is scratched',
      'Zinc is less reactive than gold and lowers the melting point of iron',
      'Zinc converts iron into a non-metallic plastic polymer',
      'Zinc absorbs oxygen and transfers it directly into the iron core'
    ],
    correctAnswer: 0,
    explanation: 'Rusting requires both oxygen and water (moisture). Zinc forms a protective oxide barrier and provides sacrificial protection because Zn is more electropositive than Fe.'
  },
  {
    id: 'p2_sci_15',
    subject: 'SCIENCE',
    topic: 'Chemistry – Combustion, Flame Zones & Calorific Value',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why do goldsmiths blow the outermost non-luminous (blue) zone of a flame with a metallic blowpipe to melt gold and silver?',
    options: [
      'The outermost non-luminous zone undergoes complete combustion due to ample oxygen supply and is the hottest part of the flame',
      'The innermost dark zone around the wick is the hottest zone of the flame',
      'The middle luminous yellow zone produces zero soot and maximum heat',
      'Blue light chemically dissolves gold at room temperature'
    ],
    correctAnswer: 0,
    explanation: 'In the outermost non-luminous zone, wax vapours burn completely in abundant atmospheric oxygen, making it the hottest region of a candle/lamp flame.'
  },
  {
    id: 'p2_sci_16',
    subject: 'SCIENCE',
    topic: 'Chemistry – Fire Extinguishers & Electrical Fires',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Why must water NEVER be used to extinguish a fire caused by an electrical short-circuit or burning petrol, and why is carbon dioxide (CO₂) ideal instead?',
    options: [
      'Tap water conducts electricity (risking electrocution) and sinks below lighter petrol; CO₂ is heavier than oxygen, non-conductive, and blankets the fuel to cut off oxygen',
      'Water has a higher calorific value than petrol and burns explosively',
      'CO₂ is lighter than hydrogen and heats the fuel above its ignition point',
      'Water increases the ignition temperature of petrol permanently'
    ],
    correctAnswer: 0,
    explanation: 'Tap water contains dissolved salts that conduct current, and petrol floats on water and continues burning. CO₂ smothers the fire by displacing oxygen and cooling the fuel.'
  },
  {
    id: 'p2_sci_17',
    subject: 'SCIENCE',
    topic: 'Chemistry – Thermoplastics vs Thermosetting Plastics',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which pair correctly represents Thermosetting Polymers that have cross-linked chains and do NOT soften upon reheating?',
    options: [
      'Bakelite (used for electrical switches/handles) and Melamine (used for fire-resistant floor tiles/kitchenware)',
      'Polythene and PVC (Polyvinyl Chloride)',
      'Nylon and Terylene',
      'Cellulose and Natural Rubber'
    ],
    correctAnswer: 0,
    explanation: 'Bakelite and Melamine are cross-linked thermosetting plastics that retain their shape and resist heat once molded, unlike thermoplastics (Polythene, PVC).'
  },
  {
    id: 'p2_sci_18',
    subject: 'SCIENCE',
    topic: 'Chemistry – Separation of Mixtures',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Which sequence of separation methods should a student use to obtain pure salt, pure sand, and pure iron filings from a dry mixture of all three?',
    options: [
      'Magnetic separation (removes iron filings) → Dissolution in water & filtration (separates insoluble sand) → Evaporation/Crystallization (recovers pure salt)',
      'Sublimation → Decantation → Winnowing',
      'Winnowing → Centrifugation → Chromatography',
      'Filtration of dry powder → Distillation → Sieving'
    ],
    correctAnswer: 0,
    explanation: 'A magnet attracts iron filings; water dissolves sodium chloride leaving sand on the filter paper; evaporation/crystallization recovers the dissolved salt.'
  },
  {
    id: 'p2_sci_19',
    subject: 'SCIENCE',
    topic: 'Biology – Cell Structure: Plant Cell vs Animal Cell',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'When observing an onion peel mount and a human cheek cell mount under a compound microscope, which three structures are present in the plant cell but absent in the animal cheek cell?',
    options: [
      'Rigid cellulose cell wall, plastids, and a large central vacuole',
      'Cell membrane, nucleus, and mitochondria',
      'Cytoplasm, ribosomes, and chromosomes',
      'Nuclear membrane, Golgi apparatus, and centrosome'
    ],
    correctAnswer: 0,
    explanation: 'Plant cells possess an outer cellulose cell wall, plastids (chloroplasts/leucoplasts), and a large permanent central vacuole, which animal cells lack.'
  },
  {
    id: 'p2_sci_20',
    subject: 'SCIENCE',
    topic: 'Biology – Photosynthesis, Symbiosis & Nitrogen Fixation',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why do farmers rotate cereal crops like wheat with leguminous crops like gram or pea without adding heavy nitrogenous chemical fertilizers?',
    options: [
      'Rhizobium bacteria living symbiotically in the root nodules of leguminous plants fix atmospheric nitrogen into soluble soil nitrates',
      'Leguminous leaves absorb urea directly from rainwater through stomata',
      'Wheat roots excrete excess ammonia during harvest',
      'Legumes destroy all soil microorganisms permanently'
    ],
    correctAnswer: 0,
    explanation: 'Symbiotic Rhizobium bacteria in legume root nodules convert inert atmospheric N₂ into bio-available nitrogen compounds, replenishing soil fertility.'
  },
  {
    id: 'p2_sci_21',
    subject: 'SCIENCE',
    topic: 'Biology – Human Digestive System & Enzymes',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each digestive secretion in the human alimentary canal with its specific physiological role:\n1. Salivary Amylase (Ptyalin) — (P) Emulsifies large fat globules into fine droplets\n2. Bile juice (from Liver) — (Q) Converts starch into maltose sugar in the mouth\n3. Pepsin (in Stomach gastric juice) — (R) Digests proteins into peptides in an acidic medium\nSelect the correct option:',
    options: [
      '1-Q, 2-P, 3-R',
      '1-P, 2-Q, 3-R',
      '1-R, 2-P, 3-Q',
      '1-Q, 2-R, 3-P'
    ],
    correctAnswer: 0,
    explanation: 'Salivary amylase hydrolyzes starch into sugar; bile juice (which lacks enzymes) emulsifies fats; pepsin breaks down proteins in the acidic gastric medium.'
  },
  {
    id: 'p2_sci_22',
    subject: 'SCIENCE',
    topic: 'Biology – Aerobic vs Anaerobic Respiration',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Why do human skeletal muscles experience cramps after sudden, intense sprinting, and why does a warm water bath or massage relieve the pain?',
    options: [
      'Temporary oxygen shortage causes anaerobic respiration in muscle cells, accumulating lactic acid; massage improves blood circulation and oxygen supply to break down lactic acid completely into CO₂ and water',
      'Muscles produce ethyl alcohol and carbon dioxide gas bubbles during sprinting',
      'Aerobic respiration stops permanently after a 100-metre sprint',
      'Warm water converts muscle glucose directly into bone calcium'
    ],
    correctAnswer: 0,
    explanation: 'During vigorous exercise, oxygen demand exceeds supply, so muscle cells respire anaerobically to form lactic acid; improved blood flow oxidizes the lactic acid.'
  },
  {
    id: 'p2_sci_23',
    subject: 'SCIENCE',
    topic: 'Biology – Human Circulatory System: Blood Vessels & Heart',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which exception is true regarding human blood vessels?',
    options: [
      'All arteries carry oxygenated blood EXCEPT the pulmonary artery, which carries deoxygenated blood from the right ventricle to the lungs',
      'All veins have thick elastic walls without valves and carry blood under high pressure',
      'The pulmonary vein carries deoxygenated blood from the lungs to the right atrium',
      'Capillaries have three-layered muscular walls thicker than the aorta'
    ],
    correctAnswer: 0,
    explanation: 'Arteries carry blood away from the heart (oxygenated except the pulmonary artery to the lungs), while veins carry blood toward the heart (deoxygenated except the pulmonary veins).'
  },
  {
    id: 'p2_sci_24',
    subject: 'SCIENCE',
    topic: 'Biology – Microorganisms: Vaccines, Antibiotics & Pathogens',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Which statement accurately explains why antibiotics like Penicillin cure bacterial infections (such as typhoid) but are ineffective against viral infections (such as the common cold or influenza)?',
    options: [
      'Antibiotics block biochemical pathways such as bacterial cell-wall synthesis, whereas viruses lack cell walls and replicate using the host cell’s own machinery',
      'Viruses are much larger than bacteria and digest antibiotic tablets',
      'Antibiotics only destroy red blood cells in the human body',
      'Common cold is caused by a protozoan transmitted by Anopheles mosquitoes'
    ],
    correctAnswer: 0,
    explanation: 'Antibiotics target bacterial structures (like peptidoglycan cell walls); viruses have no cell wall or independent metabolic machinery.'
  },
  {
    id: 'p2_sci_25',
    subject: 'SCIENCE',
    topic: 'Biology – Endocrine System & Metamorphosis',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Tadpoles growing in pond water that is severely deficient in iodine fail to undergo metamorphosis into adult frogs. Which hormone and endocrine gland are responsible for this process?',
    options: [
      'Thyroxine hormone secreted by the thyroid gland, which requires iodine for its synthesis',
      'Insulin hormone secreted by the pancreas',
      'Adrenaline hormone secreted by the adrenal gland',
      'Growth hormone secreted by the pituitary gland'
    ],
    correctAnswer: 0,
    explanation: 'Metamorphosis in amphibians is controlled by thyroxine from the thyroid gland, and iodine is an essential constituent of thyroxine.'
  },
  {
    id: 'p2_sci_26',
    subject: 'SCIENCE',
    topic: 'Biology – Deficiency Diseases (Vitamins & Minerals)',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each nutrient deficiency with its characteristic clinical disorder:\n1. Vitamin A — (P) Rickets (soft, bent bones)\n2. Vitamin C — (Q) Night blindness (Loss of vision in dim light)\n3. Vitamin D — (R) Scurvy (bleeding gums and delayed wound healing)\n4. Iron — (S) Anaemia (low haemoglobin and fatigue)\nSelect the correct match:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-R, 2-Q, 3-S, 4-P',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Vitamin A deficiency causes Night Blindness; Vitamin C causes Scurvy; Vitamin D causes Rickets; Iron deficiency causes Anaemia.'
  },
  {
    id: 'p2_sci_27',
    subject: 'SCIENCE',
    topic: 'Biology – Reproduction in Plants: Pollination & Seed Dispersal',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'After pollination and fertilization in a flowering plant (angiosperm), what do the ovary and the ovules develop into respectively?',
    options: [
      'The ovary develops into the fruit and the ovules develop into seeds',
      'The ovary develops into the seed and the ovules develop into petals',
      'The anthers develop into the fruit and the stigma develops into the root',
      'The sepals develop into seeds and the style develops into the fruit'
    ],
    correctAnswer: 0,
    explanation: 'Post-fertilization, the ripened ovary forms the fruit while fertilized ovules mature into seeds containing the embryo.'
  },
  {
    id: 'p2_sci_28',
    subject: 'SCIENCE',
    topic: 'Ecology – Eutrophication, Biomagnification & Biodiversity',
    questionType: 'Assertion-Reasoning',
    difficulty: 'Moderate',
    question: 'Assertion (A): Excessive runoff of chemical nitrogen and phosphorus fertilizers from farms into a freshwater lake causes fish mortality.\nReason (R): Nutrient enrichment triggers dense algal blooms (eutrophication); when algae die, decomposing bacteria consume dissolved oxygen in the water.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      'Both (A) and (R) are false'
    ],
    correctAnswer: 0,
    explanation: 'Eutrophication depletes dissolved oxygen (raises BOD) as aerobic decomposers break down massive algal blooms, suffocating aquatic fauna.'
  },
  {
    id: 'p2_sci_29',
    subject: 'SCIENCE',
    topic: 'Physics – Archimedes Principle & Buoyancy',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why does a solid iron nail sink in water whereas a huge ship made of the same iron floats on the sea?',
    options: [
      'The hollow shape of the ship enables it to displace a volume of water whose weight equals the total weight of the ship, keeping its average density less than water',
      'Seawater has zero gravitational attraction on large steel hulls',
      'The iron nail has a lower density than pure water',
      'Surface tension alone holds a 10,000-tonne ship afloat'
    ],
    correctAnswer: 0,
    explanation: 'By Archimedes’ principle, a body floats when the upward buoyant force (weight of displaced fluid) equals its weight; the hollow hull lowers average density below that of water.'
  },
  {
    id: 'p2_sci_30',
    subject: 'SCIENCE',
    topic: 'Chemistry – Petroleum Fractional Distillation & Conservation',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'On which physical property is the separation of crude petroleum into LPG, petrol, kerosene, diesel, lubricating oil, and bitumen in a fractionating tower based?',
    options: [
      'Differences in the boiling points of the various hydrocarbon fractions',
      'Differences in magnetic susceptibility of hydrocarbons',
      'Differences in solubility in cold distilled water',
      'Differences in electrical conductivity'
    ],
    correctAnswer: 0,
    explanation: 'Fractional distillation separates miscible hydrocarbon liquids according to their distinct boiling-point ranges.'
  },
  {
    id: 'p2_sci_31',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Scientific Inquiry & Variables (Fair Test)',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Class 7 students design an experiment to test how water temperature affects the time taken for 5 g of sugar to dissolve. They use 100 mL of water at 20°C, 40°C, and 60°C, stirring each at the same rate. In this investigation, what are the independent, dependent, and controlled variables?',
    options: [
      'Independent: Water temperature; Dependent: Dissolution time; Controlled: Volume of water (100 mL), mass of sugar (5 g), and stirring rate',
      'Independent: Dissolution time; Dependent: Mass of sugar; Controlled: Water temperature',
      'Independent: Volume of water; Dependent: Water temperature; Controlled: Dissolution time',
      'All variables are dependent variables in a fair test'
    ],
    correctAnswer: 0,
    explanation: 'The experimenter deliberately varies the independent variable (temperature), measures the outcome (dependent variable: time), and holds all other factors constant (controlled variables).'
  },
  {
    id: 'p2_sci_32',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – 5E Constructivist Instructional Model',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In Roger Bybee’s 5E Constructivist Model for teaching upper-primary science, what is the correct pedagogical sequence of the five phases?',
    options: [
      'Engage → Explore → Explain → Elaborate → Evaluate',
      'Explain → Memorize → Examine → Evaluate → Exit',
      'Explore → Evaluate → Engage → Dictate → Drill',
      'Evaluate → Explain → Engage → Explore → Elaborate'
    ],
    correctAnswer: 0,
    explanation: 'The 5E inquiry cycle begins by eliciting curiosity and prior knowledge (Engage), followed by hands-on investigation (Explore), concept formulation (Explain), transfer to new contexts (Elaborate), and assessment (Evaluate).'
  },
  {
    id: 'p2_sci_33',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Addressing Alternative Conceptions (Cognitive Conflict)',
    questionType: 'Classroom-Situation',
    difficulty: 'Difficult',
    question: 'Several Class 6 students believe that "plants get all their food/mass from soil rather than from carbon dioxide and water via photosynthesis." Which constructivist strategy uses cognitive conflict most effectively to restructure this misconception?',
    options: [
      'Present Van Helmont’s willow-tree weight data and have students germinate seeds on moist cotton/hydroponics without soil to observe biomass gain firsthand',
      'Scold the students for not reading the textbook definition of photosynthesis',
      'Ask students to copy the chemical equation of photosynthesis ten times',
      'Skip the topic and move directly to animal nutrition'
    ],
    correctAnswer: 0,
    explanation: 'Observing seedlings gain mass without soil (hydroponic/moist cotton growth) and analyzing historical mass-balance data creates discrepancy with the naive belief, prompting conceptual change.'
  },
  {
    id: 'p2_sci_34',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Observation vs Inference (Process Skills)',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'When an inverted glass jar is placed over a burning candle, a student writes two notes:\nNote 1: "The candle flame flickered and went out after 8 seconds, and water droplets appeared on the inner glass wall."\nNote 2: "The flame went out because the oxygen inside the jar was used up."\nIn scientific process skills, how are Note 1 and Note 2 classified?',
    options: [
      'Note 1 is a direct sensory Observation; Note 2 is a logical Inference explaining the observation',
      'Note 1 is a speculative Hypothesis; Note 2 is a direct sensory Observation',
      'Both Note 1 and Note 2 are unscientific guesses',
      'Note 1 is a deductive law; Note 2 is a measurement error'
    ],
    correctAnswer: 0,
    explanation: 'Observations record what is directly perceived or measured via senses/instruments; inferences interpret or explain *why* those observations occurred.'
  },
  {
    id: 'p2_sci_35',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Nature of Science (Tentativeness & Falsifiability)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What does it mean to say that "scientific knowledge is tentative yet durable" according to NCF 2005?',
    options: [
      'Scientific theories are well-supported by empirical evidence, yet remain open to revision or refinement whenever new, reproducible evidence emerges',
      'Scientific laws are mere personal opinions that change randomly every morning',
      'Once printed in a textbook, scientific theories can never be questioned or tested',
      'Science relies on authority rather than experimental verification'
    ],
    correctAnswer: 0,
    explanation: 'Science is self-correcting: established theories rest on rigorous evidence (durable) but evolve when higher-precision observations reveal new phenomena (tentative).'
  },
  {
    id: 'p2_sci_36',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Cognitive Validity vs Environmental Validity (NCF 2005)',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'In NCF 2005’s six criteria for a good school science curriculum, match each validity type with its meaning:\n1. Cognitive Validity — (P) Links science with local environment, sustainability, and ethical responsibility\n2. Process Validity — (Q) Content and pedagogy are age-appropriate and within learners’ cognitive reach\n3. Historical Validity — (R) Engages learners in methods of generating and validating scientific knowledge\n4. Environmental Validity — (S) Shows how scientific concepts evolved over time in social context\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-S, 4-P',
      '1-P, 2-Q, 3-R, 4-S',
      '1-Q, 2-S, 3-R, 4-P',
      '1-R, 2-Q, 3-P, 4-S'
    ],
    correctAnswer: 0,
    explanation: 'NCF 2005 defines six validities for science education: Cognitive (1-Q), Content, Process (2-R), Historical (3-S), Environmental (4-P), and Ethical.'
  },
  {
    id: 'p2_sci_37',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Predict-Observe-Explain (POE) Strategy',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Before dropping a peeled orange and an unpeeled orange into a tank of water, a teacher asks students to write down which one will float and why, then performs the demonstration, and finally asks students to reconcile their prediction with what happened. This strategy is known as:',
    options: [
      'Predict–Observe–Explain (POE) constructivist demonstration strategy',
      'Rote Dictation–Memorization–Testing strategy',
      'Summative Annual Ranking strategy',
      'Passive Chalk-and-Talk Lecture strategy'
    ],
    correctAnswer: 0,
    explanation: 'POE (Predict-Observe-Explain) activates students’ prior mental models before a demonstration so anomalous observations spark genuine conceptual inquiry.'
  },
  {
    id: 'p2_sci_38',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Improvised Low-Cost Apparatus',
    questionType: 'Classroom-Situation',
    difficulty: 'Easy',
    question: 'What is the primary pedagogical advantage of having Class 7 students build a working pinhole camera from cardboard boxes and a lung-diaphragm model from a plastic bottle and balloons?',
    options: [
      'Demystifies science by showing that scientific principles operate in everyday materials, fostering hands-on design and deep functional understanding',
      'Eliminates the need for teachers to explain optical or biological concepts',
      'Replaces scientific inquiry with commercial toy manufacturing',
      'Proves that precision instruments are useless in research laboratories'
    ],
    correctAnswer: 0,
    explanation: 'Low-cost improvised apparatus fosters experiential "learning by doing", creativity, and accessibility across all schools.'
  },
  {
    id: 'p2_sci_39',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Diagnostic Assessment of Circuit Diagrams',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'A Class 6 student connects a dry cell, a torch bulb, and a switch using two copper wires, but connects both wires to the positive terminal of the cell and none to the negative terminal. The bulb does not glow. How should the teacher guide the student?',
    options: [
      'Prompt the student to trace the complete path of current from positive to negative terminal and discover why a closed potential difference loop is required',
      'Take the wires away and assemble the circuit silently for the student',
      'Tell the student that the copper wires are insulators',
      'Mark the student zero in the practical exam immediately'
    ],
    correctAnswer: 0,
    explanation: 'Guided questioning helps the learner discover that electric current requires a continuous closed loop across the two terminals of the power source.'
  },
  {
    id: 'p2_sci_40',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Scientific Attitude & Skepticism',
    questionType: 'Classroom-Situation',
    difficulty: 'Easy',
    question: 'When a viral social-media message claims that "keeping a cut onion in the corner of a room absorbs all flu viruses from the air," which student response demonstrates a genuine scientific attitude?',
    options: [
      '"We should examine controlled empirical evidence on how respiratory viruses transmit and check whether peer-reviewed studies support this claim."',
      '"It must be true because it was forwarded by many people."',
      '"We should never question traditional or internet claims."',
      '"Science cannot study how diseases spread."'
    ],
    correctAnswer: 0,
    explanation: 'A scientific attitude (scientific temper, Article 51A(h)) demands empirical evidence, rational skepticism toward unverified claims, and open-minded inquiry.'
  },
  {
    id: 'p2_sci_41',
    subject: 'SCIENCE',
    topic: 'Physics – Atmospheric Pressure & Drinking Straw',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What physical mechanism causes liquid juice to rise up a drinking straw when a student sucks air out of the top of the straw?',
    options: [
      'Sucking reduces air pressure inside the straw, and the higher atmospheric pressure acting on the open surface of the juice pushes the liquid up',
      'Sucking creates an upward gravitational pull on the liquid molecules',
      'Juice rises purely by capillary action without atmospheric pressure',
      'The density of juice drops to zero when air is removed'
    ],
    correctAnswer: 0,
    explanation: 'Fluids flow from higher pressure to lower pressure: atmospheric pressure on the liquid surface pushes the liquid up into the low-pressure straw.'
  },
  {
    id: 'p2_sci_42',
    subject: 'SCIENCE',
    topic: 'Physics – Electromagnets & Solenoids',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which combination of actions will increase the magnetic field strength of an electromagnet constructed in a school science laboratory?',
    options: [
      'Increasing the number of turns of insulated copper wire, increasing the electric current, and inserting a soft-iron core inside the coil',
      'Replacing the soft-iron core with a dry wooden stick and decreasing the current',
      'Using a plastic thread instead of copper wire',
      'Disconnecting the battery from the circuit'
    ],
    correctAnswer: 0,
    explanation: 'Magnetic field strength of a solenoid is directly proportional to the number of coil turns (N), the current (I), and the magnetic permeability of a soft-iron core.'
  },
  {
    id: 'p2_sci_43',
    subject: 'SCIENCE',
    topic: 'Physics – Lightning, Electrostatics & Earthing',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'How does a metallic lightning conductor installed at the highest point of a tall school building protect the structure during a thunderstorm?',
    options: [
      'It provides a low-resistance conductive copper path to discharge atmospheric electric charge safely deep into the earth',
      'It repels rain clouds away from the district',
      'It stores lightning electricity inside the roof bricks for lighting bulbs',
      'It converts thunder sound waves into magnetic energy'
    ],
    correctAnswer: 0,
    explanation: 'A lightning rod conducts massive electrostatic discharge safely to the ground (earthing) without passing through the building masonry.'
  },
  {
    id: 'p2_sci_44',
    subject: 'SCIENCE',
    topic: 'Chemistry – Reactivity of Sodium & Storage in Kerosene',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why are alkali metals like Sodium (Na) and Potassium (K) stored immersed under kerosene in the chemistry laboratory?',
    options: [
      'They are extremely reactive metals that react vigorously with oxygen and moisture in the air (and water), catching fire spontaneously',
      'They dissolve in kerosene to form a blue indicator solution',
      'They evaporate into odourless gases if kept in glass bottles without kerosene',
      'Kerosene increases their atomic number'
    ],
    correctAnswer: 0,
    explanation: 'Sodium and potassium react exothermically with moisture/water to liberate hydrogen gas which ignites; kerosene isolates them from air and moisture.'
  },
  {
    id: 'p2_sci_45',
    subject: 'SCIENCE',
    topic: 'Chemistry – Non-Metals: Allotropes & Uses',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each non-metal with its characteristic property or application:\n1. Graphite (allotrope of Carbon) — (P) Liquid non-metal at room temperature\n2. Iodine — (Q) Good conductor of electricity used in dry-cell electrodes\n3. Bromine — (R) Antiseptic tincture applied on wounds\n4. White Phosphorus — (S) Stored under water as it catches fire in air at ~30°C\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-P, 2-Q, 3-R, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Graphite conducts electricity due to delocalized electrons; Iodine is used in antiseptic tincture; Bromine is the only liquid non-metal; White phosphorus is stored under water.'
  },
  {
    id: 'p2_sci_46',
    subject: 'SCIENCE',
    topic: 'Chemistry – Acid Rain & Taj Mahal Marble Cancer',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which two atmospheric pollutant gases dissolve in rainwater to form sulphuric acid and nitric acid, causing "marble cancer" (corrosion of calcium carbonate monuments)?',
    options: [
      'Sulphur dioxide (SO₂) and Nitrogen dioxide (NO₂)',
      'Nitrogen (N₂) and Argon (Ar)',
      'Oxygen (O₂) and Hydrogen (H₂)',
      'Methane (CH₄) and Helium (He)'
    ],
    correctAnswer: 0,
    explanation: 'Emissions of SO₂ and NO₂ oxidize and react with atmospheric water vapour to form H₂SO₄ and HNO₃, which corrode marble (CaCO₃).'
  },
  {
    id: 'p2_sci_47',
    subject: 'SCIENCE',
    topic: 'Biology – Cell Organelles & Their Functions',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each eukaryotic cell organelle with its primary cellular function:\n1. Mitochondria — (P) Site of protein synthesis\n2. Chloroplast — (Q) ATP energy generation via cellular respiration\n3. Ribosome — (R) Intracellular digestion and waste clearance ("suicidal bag")\n4. Lysosome — (S) Trapping solar energy for photosynthesis\nSelect the correct option:',
    options: [
      '1-Q, 2-S, 3-P, 4-R',
      '1-S, 2-Q, 3-P, 4-R',
      '1-Q, 2-S, 3-R, 4-P',
      '1-P, 2-S, 3-Q, 4-R'
    ],
    correctAnswer: 0,
    explanation: 'Mitochondria generate ATP (powerhouse); Chloroplasts carry out photosynthesis; Ribosomes synthesize proteins; Lysosomes contain hydrolytic enzymes.'
  },
  {
    id: 'p2_sci_48',
    subject: 'SCIENCE',
    topic: 'Biology – Plant Vascular Tissues: Xylem & Phloem',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How does transport in Xylem differ fundamentally from translocation in Phloem in vascular plants?',
    options: [
      'Xylem transports water and dissolved minerals unidirectionally upward from roots to leaves, whereas Phloem translocates synthesized food bidirectionally from leaves to storage and growing organs',
      'Xylem transports sucrose downward only, while Phloem transports soil minerals upward only',
      'Both Xylem and Phloem transport only oxygen gas from flowers to roots',
      'Xylem operates only at night while Phloem operates only during winter'
    ],
    correctAnswer: 0,
    explanation: 'Xylem conducts water/minerals upward driven by root pressure and transpirational pull; Phloem translocates sucrose bidirectionally from source to sink.'
  },
  {
    id: 'p2_sci_49',
    subject: 'SCIENCE',
    topic: 'Biology – Excretory System & Nephron Filtration',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In the human excretory system, what is the primary nitrogenous waste filtered out of the blood by the nephrons in the kidneys, and what happens to useful substances like glucose and amino acids in the filtrate?',
    options: [
      'Urea is filtered out for excretion in urine, while glucose, amino acids, and essential water are selectively reabsorbed back into the blood capillaries',
      'Haemoglobin is excreted in urine while urea is reabsorbed into the liver',
      'Starch is filtered out by the lungs and stored in the urinary bladder',
      'Kidneys convert carbon dioxide directly into digestive enzymes'
    ],
    correctAnswer: 0,
    explanation: 'Glomerular filtration followed by selective tubular reabsorption in nephrons retains glucose, amino acids, and needed water while excreting urea.'
  },
  {
    id: 'p2_sci_50',
    subject: 'SCIENCE',
    topic: 'Biology – joints and Locomotion in Humans',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each human skeletal joint with the anatomical location where it is found:\n1. Ball and Socket Joint — (P) Knee and Elbow joints\n2. Hinge Joint — (Q) Shoulder and Hip joints\n3. Pivot Joint — (R) Immovable bones of the cranium (skull)\n4. Fixed (Fibrous) Joint — (S) Joint between the skull/atlas and axis neck vertebrae\nSelect the correct code:',
    options: [
      '1-Q, 2-P, 3-S, 4-R',
      '1-P, 2-Q, 3-S, 4-R',
      '1-Q, 2-S, 3-P, 4-R',
      '1-R, 2-P, 3-S, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Ball-and-socket (shoulder/hip) allows multi-axial rotation; Hinge (elbow/knee) bends in one plane; Pivot connects neck atlas-axis; skull sutures are fixed.'
  },
  {
    id: 'p2_sci_51',
    subject: 'SCIENCE',
    topic: 'Biology – Conservation: Biosphere Reserves, National Parks & Red Data Book',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What is the primary purpose of the "Red Data Book" maintained internationally by IUCN and national biodiversity authorities?',
    options: [
      'To keep a comprehensive scientific record of all endangered and threatened species of plants, animals, and fungi',
      'To list only extinct dinosaurs from the Mesozoic era',
      'To record daily rainfall and temperature across meteorological stations',
      'To catalogue high-yielding hybrid chemical fertilizers'
    ],
    correctAnswer: 0,
    explanation: 'The Red Data Book documents rare, vulnerable, and endangered flora and fauna to prioritize conservation programs.'
  },
  {
    id: 'p2_sci_52',
    subject: 'SCIENCE',
    topic: 'Physics – Ultrasound, Audible Range & Infrasound',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What is the normal audible frequency range of sound for a healthy young human ear, and how are sounds above this range classified?',
    options: [
      '20 Hz to 20,000 Hz (20 kHz); sounds above 20,000 Hz are ultrasonic waves',
      '0.1 Hz to 10 Hz; sounds above 10 Hz are infrasonic waves',
      '20,000 Hz to 100,000 Hz; sounds below 20,000 Hz are ultrasonic',
      '1 Hz to 100 Hz only'
    ],
    correctAnswer: 0,
    explanation: 'Human hearing spans roughly 20 Hz to 20 kHz; frequencies < 20 Hz are infrasound and frequencies > 20 kHz are ultrasound (used in SONAR and medical imaging).'
  },
  {
    id: 'p2_sci_53',
    subject: 'SCIENCE',
    topic: 'Chemistry – Water Purification & Potable Water',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'In municipal water treatment plants, what specific roles do Alum (potash alum) and Chlorine play respectively?',
    options: [
      'Alum acts as a coagulant that makes fine suspended clay particles settle rapidly (loading), while Chlorine disinfects the water by killing pathogenic microbes',
      'Alum kills bacteria and viruses, while Chlorine adds suspended mud to water',
      'Alum desalinate seawater, while Chlorine turns hard water into distilled water',
      'Both Alum and Chlorine are used solely to colour the water blue'
    ],
    correctAnswer: 0,
    explanation: 'Alum neutralizes charges on colloidal clay particles so they coagulate and sediment faster; chlorination destroys waterborne pathogens.'
  },
  {
    id: 'p2_sci_54',
    subject: 'SCIENCE',
    topic: 'Biology – Agricultural Practices: Drip Irrigation & Weedicides',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Why is the "Drip Irrigation" system considered the most sustainable method of watering fruit orchards and vegetable crops in water-scarce regions of Maharashtra?',
    options: [
      'It delivers water drop-by-drop directly near the plant roots, minimizing loss through evaporation and surface runoff',
      'It floods the entire field to a depth of 30 cm every afternoon',
      'It uses saltwater from the ocean without filtration',
      'It sprays water high into strong afternoon winds'
    ],
    correctAnswer: 0,
    explanation: 'Drip irrigation targets the root zone drop by drop, conserving up to 50–70% of water by preventing evaporation and weed growth between rows.'
  },
  {
    id: 'p2_sci_55',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Formative Portfolio & Practical Rubrics',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'While assessing Class 8 students during a practical investigation on "Testing Electrical Conductivity of Liquids using an LED tester", which assessment method captures authentic science process skills best?',
    options: [
      'An observation rubric assessing safe circuit setup, systematic data recording across samples, control of electrode cleanliness, and evidence-based conclusion',
      'Grading students solely on the neatness of the cover page of their practical file',
      'Asking students to recite the definition of an electrolyte from memory without touching the apparatus',
      'Awarding full marks to whichever group finishes packing up first'
    ],
    correctAnswer: 0,
    explanation: 'Performance rubrics during live laboratory work evaluate authentic manipulative, observational, and analytical process skills.'
  },
  {
    id: 'p2_sci_56',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Concept Mapping & Diagnostic Evaluation',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'In a concept map drawn by a Class 7 student on "Heat and Temperature", the student links "Clinical Thermometer" to "Measures Heat Content in Joules". What specific conceptual distinction does the teacher need to clarify?',
    options: [
      'Temperature (measured in °C/°F/K by a thermometer) measures the degree of hotness/average kinetic energy, whereas Heat (measured in Joules) is total thermal energy transferred due to a temperature difference',
      'Clinical thermometers are used only to measure boiling points of metals',
      'Heat and temperature are identical quantities with the same SI unit',
      'Thermometers measure atmospheric pressure in Pascals'
    ],
    correctAnswer: 0,
    explanation: 'Distinguishing intensive temperature (degree of hotness) from extensive heat energy transfer (Joules) is a core upper-primary physics objective.'
  },
  {
    id: 'p2_sci_57',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Inclusive Science Lab for CWSN',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'During a Class 7 chemistry activity on acid-base indicators, how can a teacher make the observation accessible to a student with profound visual impairment?',
    options: [
      'Use olfactory indicators (such as finely chopped onion, vanilla extract, or clove oil) whose characteristic odour changes distinctly in basic versus acidic solutions, paired with peer collaborative narration',
      'Exclude the student from the chemistry laboratory for safety reasons',
      'Ask the student to memorize colour changes without participating',
      'Use only silent visual flashcards from across the room'
    ],
    correctAnswer: 0,
    explanation: 'Olfactory indicators (onion, vanilla, clove oil) allow learners with visual impairment to detect acid-base endpoints directly through their sense of smell.'
  },
  {
    id: 'p2_sci_58',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Integrated / Interdisciplinary Approach',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'When teaching "Sound and Musical Instruments" in Class 8, a teacher invites a local sitar/tabla artist, connects string length ratios to mathematics, and explores ear anatomy in biology. Under NEP 2020, this represents:',
    options: [
      'Multidisciplinary and art-integrated experiential learning that breaks down rigid subject silos',
      'Deviation from the science syllabus that wastes instructional time',
      'Replacing physics with music examinations',
      'Rote textbook recitation'
    ],
    correctAnswer: 0,
    explanation: 'NEP 2020 champions art-integrated, multidisciplinary learning that reveals how physics, mathematics, biology, and culture intersect.'
  },
  {
    id: 'p2_sci_59',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – Open-Ended Inquiry vs Cookbook Labs',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How does an "Inquiry-Based Science Investigation" differ from a traditional "Cookbook Laboratory Verification" in middle school?',
    options: [
      'In inquiry labs, students formulate testable questions, design fair controls, and interpret data before knowing the outcome; in cookbook labs, students mechanically follow pre-printed steps to confirm an already announced result',
      'In inquiry labs, students are forbidden from recording quantitative data',
      'In cookbook labs, no apparatus or chemicals are used',
      'Inquiry labs have no safety rules'
    ],
    correctAnswer: 0,
    explanation: 'True scientific inquiry engages students in hypothesis generation, experimental design, and data interpretation rather than passive recipe following.'
  },
  {
    id: 'p2_sci_60',
    subject: 'SCIENCE',
    topic: 'Science Pedagogy – STS (Science-Technology-Society) Approach',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'After studying electricity generation and fossil fuels, Class 8 students audit their school’s monthly electricity bill, compare LED vs filament bulbs, and propose a rooftop solar plan. This pedagogical approach is known as:',
    options: [
      'Science–Technology–Society (STS) and Education for Sustainable Development (ESD)',
      'Purely historical biographical narration',
      'Rote drill of Ohm’s law formulas',
      'Norm-referenced competitive testing'
    ],
    correctAnswer: 0,
    explanation: 'The STS approach links classroom science concepts with technological applications and real civic/environmental decision-making.'
  }
];

// ============================================================================
// 3. UPPER PRIMARY SOCIAL STUDIES / SOCIAL SCIENCE & PEDAGOGY (60 QUESTIONS)
// Covers History, Geography, Social & Political Life (Civics), Economics & Pedagogy
// ============================================================================
export const PAPER2_CURATED_SST_60: CuratedPaper2Mcq[] = [
  {
    id: 'p2_sst_01',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Indus Valley (Harappan) Civilization',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each archaeological site of the Harappan Civilization with its distinctive archaeological finding:\n1. Lothal (Gujarat) — (P) Great Bath and bronze dancing girl figure\n2. Kalibangan (Rajasthan) — (Q) Brick dockyard and bead-making factory\n3. Mohenjo-daro (Sindh) — (R) Ploughed agricultural field and fire altars\n4. Dholavira (Rann of Kutch) — (S) Three-part city division and giant rock-cut water reservoirs\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-P, 2-Q, 3-R, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-Q, 4-P'
    ],
    correctAnswer: 0,
    explanation: 'Lothal featured a tidal dockyard; Kalibangan revealed early ploughed furrows; Mohenjo-daro had the Great Bath; Dholavira was famous for water harvesting reservoirs.'
  },
  {
    id: 'p2_sst_02',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Vedic Period & Mahajanapadas',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why did Magadha emerge as the most powerful Mahajanapada in the 6th–4th centuries BCE?',
    options: [
      'Fertile alluvial plains of the Ganga-Son rivers, rich iron-ore mines for tools and weapons, forested elephants, and strategic riverine capitals (Rajagriha and Pataliputra)',
      'Proximity to the Arabian Sea ports of Konkan',
      'Complete absence of agriculture or taxation systems',
      'Alliance with the Roman Empire in the 6th century BCE'
    ],
    correctAnswer: 0,
    explanation: 'Magadha combined agricultural surplus, Chotanagpur iron deposits, timber/elephants, and naturally fortified capitals (Rajagriha surrounded by hills; Pataliputra by rivers).'
  },
  {
    id: 'p2_sst_03',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Emperor Ashoka & Dhamma Inscriptions',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'In which script and language were the majority of Emperor Ashoka’s rock and pillar edicts across the Indian subcontinent inscribed so common people could understand them?',
    options: [
      'Prakrit language written in the Brahmi script (with Kharosthi, Greek, and Aramaic in the northwest)',
      'Classical Sanskrit written in the Devanagari script exclusively',
      'Persian language written in the Roman alphabet',
      'Tamil language written in Cuneiform script'
    ],
    correctAnswer: 0,
    explanation: 'Ashoka communicated his message of Dhamma in the vernacular Prakrit using Brahmi script across most of India (deciphered by James Prinsep in 1837).'
  },
  {
    id: 'p2_sst_04',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Buddhism & Jainism Teachings',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Where did Gautama Buddha deliver his first sermon (Dharmachakra Pravartana) after attaining enlightenment at Bodh Gaya, and what core path did he teach?',
    options: [
      'At Sarnath (near Varanasi); he taught the Four Noble Truths and the Eightfold Path (Ashtangika Marga) of moderation',
      'At Kushinagar; he taught severe ritual animal sacrifices',
      'At Lumbini; he composed the Atharvaveda',
      'At Taxila; he established military conscription'
    ],
    correctAnswer: 0,
    explanation: 'Buddha delivered his first sermon at the Deer Park in Sarnath, outlining the Middle Path (Madhyama Pratipada) and the Eightfold Path.'
  },
  {
    id: 'p2_sst_05',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Gupta Period Science, Literature & Epigraphy',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each ancient Indian scholar with their celebrated contribution:\n1. Aryabhata — (P) Composed the Harshacharita in Sanskrit prose\n2. Harishena — (Q) Explained that Earth rotates on its own axis and scientifically explained eclipses\n3. Banabhatta — (R) Composed the Prayagraj (Allahabad) Pillar Prashasti of Samudragupta\n4. Charaka — (S) Compiled the foundational Ayurvedic medical treatise Charaka Samhita\nSelect the correct match:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-R, 2-Q, 3-P, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Aryabhata wrote the Aryabhatiya (Earth’s rotation, eclipses, pi); Harishena composed Samudragupta’s Prashasti; Banabhatta wrote Harshacharita; Charaka authored Charaka Samhita.'
  },
  {
    id: 'p2_sst_06',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Chola Administration & Uttaramerur Inscription',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What historical insight do the 10th-century Uttaramerur temple inscriptions from the Chola kingdom in Tamil Nadu provide?',
    options: [
      'Detailed rules for the "Kudavolai" palm-leaf draw system used to elect village Sabha committee members dealing with irrigation tanks, gardens, and justice',
      'Treaties signed with the Portuguese East India Company',
      'Construction blueprints of the Taj Mahal in Agra',
      'Introduction of paper currency by Muhammad bin Tughlaq'
    ],
    correctAnswer: 0,
    explanation: 'The Uttaramerur inscriptions under Parantaka Chola I document local self-government (Sabha and Ur), qualifications of members, and the Kudavolai selection process.'
  },
  {
    id: 'p2_sst_07',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Bhakti and Sufi Movements (Warkari Tradition)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How did the Bhakti saints of Maharashtra—such as Sant Dnyaneshwar, Sant Namdev, Sant Eknath, Sant Tukaram, and Sant Janabai—transform social and cultural life?',
    options: [
      'They composed devotional Abhangas and commentaries in the people’s spoken Marathi language, rejected caste hierarchy and ritualism, and championed spiritual equality',
      'They insisted that spiritual texts must never be translated from Sanskrit into vernacular languages',
      'They advocated strict social segregation in temples',
      'They served as tax collectors for the British Presidency'
    ],
    correctAnswer: 0,
    explanation: 'The Warkari Bhakti movement democratized spirituality through Marathi literature (Dnyaneshwari, Tukaram Gatha) and embraced men and women across all social strata.'
  },
  {
    id: 'p2_sst_08',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Chhatrapati Shivaji Maharaj & Swarajya Administration',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'In Chhatrapati Shivaji Maharaj’s Ashta Pradhan Mandal (Council of Eight Ministers), match each minister with their official portfolio:\n1. Peshwa (Mukhya Pradhan) — (P) Foreign affairs and diplomatic correspondence\n2. Amatya (Mazumdar) — (Q) General administration and prime ministerial coordination\n3. Sumant (Dabir) — (R) State revenue accounts and treasury audit\n4. Sar-i-Naubat (Senapati) — (S) Organization and command of the armed forces\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-R, 2-Q, 3-P, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Peshwa headed general administration; Amatya oversaw finance and accounts; Sumant handled foreign relations; Senapati commanded the army.'
  },
  {
    id: 'p2_sst_09',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Mughal Revenue System (Zabt / Todar Mal Bandobast)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What was the "Zabt" revenue system introduced by Raja Todar Mal during Emperor Akbar’s reign?',
    options: [
      'A ten-year survey (Ain-i-Dahsala) of crop yields, cultivated area, and prices used to fix land revenue in cash for each revenue circle',
      'A tax levied exclusively on sea merchants travelling to Europe',
      'An auction of village lands to the highest British bidder every year',
      'Complete abolition of agricultural land taxation'
    ],
    correctAnswer: 0,
    explanation: 'Raja Todar Mal’s Zabt/Dahsala system measured land carefully and averaged 10 years of crop yields and prices (1570–1580) to fix fair assessment schedules.'
  },
  {
    id: 'p2_sst_10',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – British Agrarian Policies (Permanent, Ryotwari & Mahalwari)',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match the three colonial land-revenue settlements with their key architect and region:\n1. Permanent Settlement (1793) — (P) Thomas Munro & Alexander Read in Madras and Bombay Presidencies (direct settlement with peasant cultivator)\n2. Ryotwari System — (Q) Holt Mackenzie in North-Western Provinces (settlement with village community/mahal)\n3. Mahalwari System — (R) Lord Cornwallis in Bengal and Bihar (zamindars recognized as hereditary landowners paying fixed revenue)\nSelect the correct option:',
    options: [
      '1-R, 2-P, 3-Q',
      '1-P, 2-R, 3-Q',
      '1-R, 2-Q, 3-P',
      '1-Q, 2-P, 3-R'
    ],
    correctAnswer: 0,
    explanation: 'Cornwallis introduced the Permanent Settlement (1793) with Zamindars; Munro and Read implemented Ryotwari directly with ryots (cultivators); Holt Mackenzie devised Mahalwari.'
  },
  {
    id: 'p2_sst_11',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – The Uprising of 1857 & Administrative Changes',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Which of the following constitutional and administrative changes was enacted by the British Parliament immediately after the Uprising of 1857 (via the Government of India Act 1858)?',
    options: [
      'Rule of the East India Company was ended and power was transferred directly to the British Crown through a Secretary of State for India and a Viceroy',
      'Universal adult franchise was granted to all Indian citizens in 1858',
      'The Doctrine of Lapse was made compulsory across all princely states forever',
      'The capital of British India was shifted from Calcutta to London'
    ],
    correctAnswer: 0,
    explanation: 'The Act of 1858 abolished East India Company rule, transferred sovereignty to Queen Victoria (British Crown), created the office of Secretary of State for India, and titled the Governor-General as Viceroy.'
  },
  {
    id: 'p2_sst_12',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – 19th-Century Social & Educational Reformers',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each pioneering 19th-century social reformer with their landmark work or institution:\n1. Mahatma Jyotirao Phule & Savitribai Phule — (P) Founded Brahmo Samaj (1828) and campaigned for the abolition of Sati\n2. Raja Rammohun Roy — (Q) Opened India’s first girls’ school at Bhide Wada, Pune (1848) and authored Gulamgiri (1873)\n3. Ishwar Chandra Vidyasagar — (R) Founded Arya Samaj (1875)\n4. Swami Dayanand Saraswati — (S) Championed the Hindu Widows’ Remarriage Act (1856) and women’s education in Bengal\nSelect the correct code:',
    options: [
      '1-Q, 2-P, 3-S, 4-R',
      '1-P, 2-Q, 3-S, 4-R',
      '1-Q, 2-S, 3-P, 4-R',
      '1-R, 2-P, 3-S, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Jyotirao and Savitribai Phule opened the first girls’ school in Pune (1848) and founded Satyashodhak Samaj; Rammohun Roy founded Brahmo Samaj; Vidyasagar championed widow remarriage; Dayanand Saraswati founded Arya Samaj.'
  },
  {
    id: 'p2_sst_13',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Rajarshi Shahu Maharaj, Maharshi Karve & Dr. B.R. Ambedkar',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why was the 1902 edict issued by Rajarshi Chhatrapati Shahu Maharaj in Kolhapur State a historic milestone in social justice in India?',
    options: [
      'It introduced 50% reservation in state government administration for backward classes and coupled it with free hostels and compulsory primary education',
      'It abolished Marathi language from state schools',
      'It transferred Kolhapur administration to the French East India Company',
      'It closed all technical and agricultural schools'
    ],
    correctAnswer: 0,
    explanation: 'Rajarshi Shahu Maharaj’s 1902 notification in Kolhapur pioneered affirmative action (50% reservation for non-Brahmin/backward communities) and established boarding hostels for students of all communities.'
  },
  {
    id: 'p2_sst_14',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Indian National Movement Chronology',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Arrange the following landmark events of the Indian Freedom Struggle in correct chronological order from earliest to latest:\n(I) Dandi Salt Satyagraha (Civil Disobedience Movement)\n(II) Partition of Bengal and Swadeshi Movement\n(III) Non-Cooperation Movement\n(IV) Quit India Movement',
    options: [
      '(II) → (III) → (I) → (IV)',
      '(III) → (II) → (I) → (IV)',
      '(II) → (I) → (III) → (IV)',
      '(I) → (II) → (III) → (IV)'
    ],
    correctAnswer: 0,
    explanation: 'Partition of Bengal / Swadeshi (1905) → Non-Cooperation Movement (1920–22) → Dandi Salt March / Civil Disobedience (1930) → Quit India Movement (August 1942).'
  },
  {
    id: 'p2_sst_15',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Revolutionary Freedom Fighters & Azad Hind Fauj',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Who reorganized the Indian National Army (Azad Hind Fauj) in Southeast Asia during World War II, established the Rani of Jhansi Regiment led by Captain Lakshmi Sahgal, and gave the call "Give me blood, and I shall give you freedom"?',
    options: [
      'Netaji Subhas Chandra Bose',
      'Lala Lajpat Rai',
      'Gopal Krishna Gokhale',
      'Dadabhai Naoroji'
    ],
    correctAnswer: 0,
    explanation: 'Netaji Subhas Chandra Bose led the Provisional Government of Free India (Azad Hind) and the Indian National Army in 1943.'
  },
  {
    id: 'p2_sst_16',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Earth’s Motions: Rotation, Revolution, Solstices & Equinoxes',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'On 21st June (Summer Solstice in the Northern Hemisphere), the vertical rays of the Sun fall directly on which latitude, and what is the duration of daylight across India?',
    options: [
      'Tropic of Cancer (23°30′ N); India experiences its longest day and shortest night of the year',
      'Tropic of Capricorn (23°30′ S); India experiences equal 12-hour day and night',
      'Equator (0°); the North Pole experiences 24 hours of darkness',
      'Antarctic Circle (66°30′ S); India experiences winter solstice'
    ],
    correctAnswer: 0,
    explanation: 'On 21 June, the Northern Hemisphere is tilted toward the Sun, placing overhead solar rays on the Tropic of Cancer (23.5° N) and giving the longest daylight duration.'
  },
  {
    id: 'p2_sst_17',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Longitude and Time Calculation',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Since the Earth rotates through 360° in 24 hours (15° per hour or 1° every 4 minutes), what will be the local time at a city located at 45° East longitude when it is 12:00 Noon at Greenwich (0° Prime Meridian)?',
    options: [
      '3:00 PM',
      '9:00 AM',
      '2:30 PM',
      '4:00 PM'
    ],
    correctAnswer: 0,
    explanation: '45° East is ahead of Greenwich by 45 × 4 = 180 minutes = 3 hours. Adding 3 hours to 12:00 Noon gives 3:00 PM.'
  },
  {
    id: 'p2_sst_18',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Interior of the Earth & Rock Cycle',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each rock type with its mode of formation and example:\n1. Extrusive Igneous Rock — (P) Limestone transformed under intense heat and pressure into Marble\n2. Intrusive Igneous Rock — (Q) Rapid cooling of lava on the Earth’s crust forming fine-grained Basalt (Deccan Trap)\n3. Sedimentary Rock — (R) Slow cooling of magma deep inside the crust forming large-grained Granite\n4. Metamorphic Rock — (S) Compaction and cementation of layered sediments forming Sandstone\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-S, 4-P',
      '1-R, 2-Q, 3-S, 4-P',
      '1-Q, 2-S, 3-R, 4-P',
      '1-P, 2-R, 3-S, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Basalt is extrusive igneous; Granite is intrusive igneous; Sandstone is sedimentary; Marble (from limestone) and Slate (from shale) are metamorphic.'
  },
  {
    id: 'p2_sst_19',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Layers of the Atmosphere',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why do commercial jet aircraft prefer to cruise in the lower Stratosphere rather than the Troposphere, and what crucial protective gas layer lies within the Stratosphere?',
    options: [
      'The lower Stratosphere is free from clouds and weather turbulence, and contains the Ozone (O₃) layer that absorbs harmful solar ultraviolet radiation',
      'The Stratosphere has the highest density of cumulonimbus storm clouds',
      'The Stratosphere reflects shortwave radio waves back to Earth like the Ionosphere',
      'Meteors burn up exclusively in the lower Stratosphere at 2 km altitude'
    ],
    correctAnswer: 0,
    explanation: 'All weather phenomena occur in the Troposphere; the Stratosphere (above the tropopause) offers stable horizontal flying conditions and houses the stratospheric ozone shield.'
  },
  {
    id: 'p2_sst_20',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Ocean Currents, Tides & Fishing Grounds',
    questionType: 'Assertion-Reasoning',
    difficulty: 'Moderate',
    question: 'Assertion (A): The Grand Banks off Newfoundland and the coast of northeastern Japan are among the richest marine fishing grounds in the world.\nReason (R): The meeting of warm and cold ocean currents (such as the Gulf Stream with the Labrador Current, and the Kuroshio with the Oyashio) replenishes oxygen and nutrients, promoting abundant plankton growth.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      'Both (A) and (R) are false'
    ],
    correctAnswer: 0,
    explanation: 'Mixing of warm and cold ocean currents stirs up mineral nutrients, fostering dense phytoplankton blooms that sustain large fish populations.'
  },
  {
    id: 'p2_sst_21',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Physiographic Divisions & Rivers of India and Maharashtra',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Most major rivers of the Peninsular Plateau—such as the Godavari, Krishna, and Kaveri—flow eastward into the Bay of Bengal, whereas which two major peninsular rivers flow westward through rift valleys into the Arabian Sea forming estuaries?',
    options: [
      'Narmada and Tapi (Tapti)',
      'Mahanadi and Subarnarekha',
      'Ganga and Brahmaputra',
      'Vaigai and Pennar'
    ],
    correctAnswer: 0,
    explanation: 'Unlike east-flowing delta-forming rivers, the Narmada (between Vindhya and Satpura ranges) and Tapi (south of Satpura) flow westward through structural rift valleys into the Arabian Sea.'
  },
  {
    id: 'p2_sst_22',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Soils & Cropping Seasons of India (Kharif, Rabi, Zaid)',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each major Indian soil or cropping season with its characteristic feature:\n1. Regur (Black Cotton Soil) — (P) Sown in October–November and harvested in March–April (Wheat, Gram, Mustard)\n2. Kharif Season — (Q) Formed from weathering of Deccan basalt; high clay moisture-retention capacity\n3. Rabi Season — (R) Sown with the onset of Southwest Monsoon in June–July (Paddy, Jowar, Bajra, Cotton)\n4. Laterite Soil — (S) Formed by intense leaching in high-rainfall tropical regions; suited for Cashew and Tea\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-R, 2-Q, 3-P, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Black regur soil forms from Deccan basalt; Kharif is the monsoon season; Rabi is the winter cropping season; Laterite soil forms via intense tropical leaching.'
  },
  {
    id: 'p2_sst_23',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Contour Lines & Topographical Map Reading',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'On a topographical contour map, what does it indicate when contour lines are drawn very close together versus widely spaced apart?',
    options: [
      'Closely spaced contour lines indicate a steep slope (or cliff), whereas widely spaced contour lines indicate a gentle slope',
      'Closely spaced contour lines indicate a flat plain, whereas widely spaced lines indicate a vertical waterfall',
      'Contour lines measure annual rainfall rather than elevation above mean sea level',
      'Contour lines frequently cross one another on a gentle valley floor'
    ],
    correctAnswer: 0,
    explanation: 'Contour lines connect points of equal elevation above mean sea level; when elevation changes rapidly over a short horizontal distance (steep slope), contours crowd closely together.'
  },
  {
    id: 'p2_sst_24',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Population Pyramid & Demographic Dividend',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In human geography, what does a Population Pyramid that has a broad base tapering rapidly toward a narrow top signify?',
    options: [
      'Both high birth rates and high death rates, resulting in a large proportion of young dependents and low life expectancy',
      'Zero birth rate and an ageing population with high life expectancy',
      'A shrinking youth population and excess immigration of retirees',
      'Equal numbers of people in every 5-year age bracket up to age 90'
    ],
    correctAnswer: 0,
    explanation: 'A broad base reflects a high birth rate (many children), while rapid narrowing upward reflects high mortality across older age cohorts.'
  },
  {
    id: 'p2_sst_25',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Conventional vs Non-Conventional Energy Resources',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which of the following groups consists exclusively of renewable, non-conventional energy sources that produce minimal greenhouse gas emissions?',
    options: [
      'Solar photovoltaic energy, Wind energy, Tidal energy, and Geothermal energy',
      'Bituminous coal, Petroleum, Natural gas, and Firewood',
      'Anthracite coal, Diesel, Lignite, and Kerosene',
      'Peat, Petrol, Charcoal, and Coal tar'
    ],
    correctAnswer: 0,
    explanation: 'Solar, wind, tidal, and geothermal power are renewable non-conventional energy resources, whereas coal, petroleum, and natural gas are exhaustible fossil fuels.'
  },
  {
    id: 'p2_sst_26',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Preamble to the Constitution of India',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What does the term "Secular" in the Preamble to the Constitution of India signify?',
    options: [
      'The State does not have any official state religion and treats all religions with equal respect and freedom of conscience',
      'Citizens are prohibited from practicing any religion in private life',
      'Only one majority religion is recognized for public offices',
      'Religious institutions control parliamentary taxation'
    ],
    correctAnswer: 0,
    explanation: 'Indian constitutional secularism maintains principled distance and equal respect (Sarva Dharma Sambhava) while guaranteeing Fundamental Freedom of Religion (Articles 25–28).'
  },
  {
    id: 'p2_sst_27',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Fundamental Rights vs Directive Principles of State Policy',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which constitutional statement accurately distinguishes Fundamental Rights (Part III) from Directive Principles of State Policy (Part IV)?',
    options: [
      'Fundamental Rights are justiciable and enforceable by courts via writs (Articles 32 and 226), whereas Directive Principles are non-justiciable socio-economic guidelines fundamental to governance',
      'Directive Principles can be enforced by immediate arrest, whereas Fundamental Rights are optional advice',
      'Fundamental Rights apply only to Members of Parliament',
      'Directive Principles were removed from the Constitution in 1950'
    ],
    correctAnswer: 0,
    explanation: 'Fundamental Rights protect individual liberty and equality and are enforceable in courts; DPSPs (Article 37) guide the State in establishing social and economic democracy.'
  },
  {
    id: 'p2_sst_28',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Dr. B.R. Ambedkar & Right to Constitutional Remedies (Article 32)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which Fundamental Right was described by Dr. B.R. Ambedkar, Chairman of the Drafting Committee, as the very "heart and soul of the Indian Constitution"?',
    options: [
      'Right to Constitutional Remedies (Article 32)',
      'Right to Property (Article 300A)',
      'Right to hold hereditary titles (Article 18)',
      'preventive detention clauses'
    ],
    correctAnswer: 0,
    explanation: 'Article 32 empowers citizens to move the Supreme Court directly by writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto) when Fundamental Rights are violated.'
  },
  {
    id: 'p2_sst_29',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Parliamentary System: Lok Sabha & Rajya Sabha',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Consider the following two statements regarding the Parliament of India:\nStatement I: A Money Bill (under Article 110) can be introduced only in the Lok Sabha on the recommendation of the President, and the Rajya Sabha must return it within 14 days.\nStatement II: The Rajya Sabha is a permanent House not subject to dissolution, with one-third of its members retiring every two years.\nWhich of the statements is/are correct?',
    options: [
      'Both Statement I and Statement II are correct',
      'Only Statement I is correct',
      'Only Statement II is correct',
      'Neither Statement I nor Statement II is correct'
    ],
    correctAnswer: 0,
    explanation: 'Under Article 109/110, Money Bills originate exclusively in the Lok Sabha; under Article 83, the Rajya Sabha is a continuing chamber where 1/3rd members retire every 2 years.'
  },
  {
    id: 'p2_sst_30',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Independent Judiciary, Judicial Review & PIL',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How did the introduction of Public Interest Litigation (PIL) by the Supreme Court of India in the early 1980s expand access to constitutional justice?',
    options: [
      'It allowed any public-spirited citizen or social organization to file a petition on behalf of disadvantaged groups whose Fundamental Rights were violated but who could not approach the court themselves',
      'It restricted Supreme Court hearings exclusively to corporate tax disputes',
      'It abolished High Courts across Indian states',
      'It required every petitioner to pay a fee of ₹10 lakh before filing a writ'
    ],
    correctAnswer: 0,
    explanation: 'PIL relaxed rigid locus standi rules so bonded labourers, prisoners, and marginalized citizens could obtain judicial relief even via a letter or public-interest petition.'
  },
  {
    id: 'p2_sst_31',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – 73rd and 74th Constitutional Amendments (Local Self-Government)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What historic democratic mandate was established by the 73rd and 74th Constitutional Amendment Acts (1992) regarding women’s representation in Panchayati Raj Institutions and Municipalities?',
    options: [
      'Not less than one-third (33%, extended to 50% in states like Maharashtra) of all seats and chairperson posts are reserved for women',
      'Elections to Gram Panchayats are held only once every 25 years',
      'Municipalities are managed entirely by nominated military governors',
      'Gram Sabhas were abolished in rural districts'
    ],
    correctAnswer: 0,
    explanation: 'The 73rd (Part IX) and 74th (Part IXA) Amendments constitutionally mandated regular 5-year elections, State Election Commissions, and at least 1/3rd reservation for women (50% in Maharashtra).'
  },
  {
    id: 'p2_sst_32',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Federalism: Union, State & Concurrent Lists (Seventh Schedule)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In the Seventh Schedule of the Indian Constitution, under which legislative list is the subject of "Education" placed (since the 42nd Amendment, 1976), and what does this mean?',
    options: [
      'Concurrent List; both the Union Parliament and State Legislatures can enact laws on education, with central law prevailing in case of a direct conflict',
      'Union List exclusively; states have zero authority to run schools or boards',
      'Residuary Powers exclusively; only municipal corporations can frame education policy',
      'Foreign Affairs List'
    ],
    correctAnswer: 0,
    explanation: 'Education was transferred from the State List to the Concurrent List by the 42nd Amendment (1976), enabling cooperative national standards (like RTE 2009) alongside state governance.'
  },
  {
    id: 'p2_sst_33',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics & Livelihoods – Primary, Secondary & Tertiary Sectors',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each economic activity with its respective sector of the economy:\n1. Primary Sector — (P) Banking, software IT services, transport, and school teaching\n2. Secondary Sector — (Q) Dairy farming, marine fishing, forestry, and cotton cultivation\n3. Tertiary (Service) Sector — (R) Spinning cotton yarn in a textile mill and manufacturing steel from iron ore\nSelect the correct match:',
    options: [
      '1-Q, 2-R, 3-P',
      '1-R, 2-Q, 3-P',
      '1-Q, 2-P, 3-R',
      '1-P, 2-R, 3-Q'
    ],
    correctAnswer: 0,
    explanation: 'Primary sector harvests natural resources; Secondary sector processes raw materials via manufacturing; Tertiary sector provides support services.'
  },
  {
    id: 'p2_sst_34',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics – Markets, Weaver Cooperatives & Fair Trade',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'In the Putting-Out system, handloom weavers depend on wholesale merchants who supply yarn and pay very low piece wages. How does forming a "Weavers’ Cooperative Society" improve the weavers’ economic position?',
    options: [
      'Weavers procure yarn collectively at lower cost and market their cloth directly through cooperative stores, reducing dependence on middlemen and earning a fair share of the market price',
      'Cooperatives force weavers to stop weaving and become money-lenders',
      'Cooperatives double the commission paid to wholesale brokers',
      'Cooperatives prohibit the sale of handloom cloth to the public'
    ],
    correctAnswer: 0,
    explanation: 'Producer cooperatives pool purchasing and marketing power, eliminating exploitative intermediary chains in rural and artisan markets.'
  },
  {
    id: 'p2_sst_35',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Gender & Invisible Unpaid Care Work',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why do NCERT Social and Political Life textbooks analyze the daily time-use of domestic work and caregiving performed primarily by women in households?',
    options: [
      'To help students recognize that household and care work involves heavy physical labour and time, deserves social respect and shared family responsibility, and is often undervalued only because it is unpaid',
      'To argue that only women should perform domestic chores forever',
      'To suggest that school education is unnecessary for homemakers',
      'To calculate income tax on cooking meals at home'
    ],
    correctAnswer: 0,
    explanation: 'Examining unpaid care work challenges gender stereotyping and highlights the "double burden" faced by working women.'
  },
  {
    id: 'p2_sst_36',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – NCF 2005 Nomenclature: "Social and Political Life"',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why did the National Curriculum Framework (NCF 2005) replace the colonial textbook subject title "Civics" with "Social and Political Life" (SPL) at the upper-primary stage?',
    options: [
      'Traditional "Civics" originated in colonial times to train obedient subjects, whereas "Social and Political Life" uses real case studies to foster critical, active democratic citizenship, constitutional values, and social justice',
      'To remove all discussion of the Indian Constitution and Parliament from schools',
      'Because the word Civics was too short to print on book covers',
      'To replace political science with laboratory chemistry'
    ],
    correctAnswer: 0,
    explanation: 'NCF 2005 noted that colonial "Civics" emphasized passive compliance, whereas "Social and Political Life" engages students critically with lived democracy, diversity, and equality.'
  },
  {
    id: 'p2_sst_37',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Primary vs Secondary Historical Sources',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'While teaching a Class 8 lesson on the 1930 Dandi Salt March, a teacher brings four materials to class. Which of these is a "Secondary Source" rather than a "Primary Source"?',
    options: [
      'A historian’s analytical chapter published in 2018 evaluating the nationwide impact of the Salt Satyagraha',
      'A facsimile of a March 1930 letter written by Mahatma Gandhi to Viceroy Lord Irwin',
      'An original April 1930 newspaper photograph and report from Dandi beach',
      'A 1930 police diary entry recorded by a district magistrate in Surat'
    ],
    correctAnswer: 0,
    explanation: 'Letters, photographs, and administrative records created at the time of the event (1930) are primary sources; a historian’s later synthesis (2018) is a secondary source.'
  },
  {
    id: 'p2_sst_38',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Developing Historical Empathy vs Anachronism',
    questionType: 'Classroom-Situation',
    difficulty: 'Difficult',
    question: 'During a Class 7 discussion on medieval fort siege warfare, a student asks: "Why didn’t the commander just call reinforcements on a mobile phone or use satellite radar?" How should the history teacher respond constructively?',
    options: [
      'Use the question to cultivate historical empathy and chronological context—helping students examine the communication technologies (messengers, drum signals, torch beacons) actually available in that era',
      'Mock the student in front of the class for asking a silly question',
      'Tell the class that mobile phones existed in the 14th century but had no network',
      'Forbid students from asking questions during history periods'
    ],
    correctAnswer: 0,
    explanation: 'Helping learners guard against anachronism (projecting present-day technology/norms onto the past) builds historical imagination and contextual reasoning.'
  },
  {
    id: 'p2_sst_39',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Handling Controversial Social Issues in Class',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'When facilitating a Class 8 debate on "Displacement of Tribal Communities due to Large Multi-Purpose River Dam Projects", what is the most appropriate pedagogical stance for a Social Science teacher?',
    options: [
      'Present multiple perspectives (irrigation/power benefits vs ecological loss, rehabilitation rights, and constitutional safeguards) using verified data and guide respectful, evidence-based critical inquiry',
      'Skip the chapter entirely to avoid classroom discussion',
      'Dictate one personal opinion and penalize any student who cites alternative evidence',
      'Allow loud personal insults without moderation'
    ],
    correctAnswer: 0,
    explanation: 'Critical pedagogy in Social Science requires examining complex socio-economic issues through multi-perspective evidence anchored in constitutional justice and human dignity.'
  },
  {
    id: 'p2_sst_40',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Map Skills: Scale, Cardinal Directions & Symbols',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'On a school wall map of Maharashtra drawn to a linear scale of 1 cm = 25 km, the straight-line distance between two district headquarters measures 6.4 cm. What is the actual ground distance between the two cities?',
    options: [
      '160 km',
      '150 km',
      '175 km',
      '140 km'
    ],
    correctAnswer: 0,
    explanation: 'Actual ground distance = Map distance × Scale factor = 6.4 × 25 = 160 km.'
  },
  {
    id: 'p2_sst_41',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Sangam Literature & South Indian Kingdoms',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In the context of ancient South Indian history (Sangam Age), who were the "Muvendar" frequently mentioned in Sangam Tamil poetry?',
    options: [
      'The three crowned ruling dynasties of the Cholas, Cheras, and Pandyas who controlled fertile river valleys and coastal trade ports',
      'Three Greek ambassadors sent by Alexander to Pataliputra',
      'Three Vedic sacrificial priests in Aryavarta',
      'Three Portuguese viceroys of Goa'
    ],
    correctAnswer: 0,
    explanation: 'Muvendar ("three chiefs") in Sangam literature refers to the heads of the Chola (Kaveri delta/Puhar), Chera (Karur/Muziris), and Pandya (Madurai/Korkai) kingdoms.'
  },
  {
    id: 'p2_sst_42',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Delhi Sultanate & Vijayanagara Empire',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which foreign traveller visited the capital city of Vijayanagara (Hampi) during the 15th/16th century and left vivid accounts of its massive fortifications, Mahanavami Dibba, and flourishing markets?',
    options: [
      'Domingo Paes (Portuguese) and Abdur Razzaq (Persian envoy)',
      'Megasthenes (Greek envoy of Seleucus Nicator)',
      'Fa-Hien (Faxian) and Xuanzang (Hiuen Tsang)',
      'Christopher Columbus'
    ],
    correctAnswer: 0,
    explanation: 'Abdur Razzaq (15th century) and Portuguese chroniclers Domingo Paes and Fernao Nuniz (during Krishnadevaraya’s reign) wrote detailed eyewitness accounts of Vijayanagara.'
  },
  {
    id: 'p2_sst_43',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Drain of Wealth Theory',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which early nationalist leader authored the landmark book "Poverty and Un-British Rule in India" (1901), statistically proving the colonial "Drain of Wealth" from India to Britain?',
    options: [
      'Dadabhai Naoroji ("Grand Old Man of India")',
      'Lord Macaulay',
      'Warren Hastings',
      'Lord Dalhousie'
    ],
    correctAnswer: 0,
    explanation: 'Dadabhai Naoroji formulated the Economic Drain Theory, demonstrating how Indian revenues paid for British Home Charges, salaries, and imperial wars without economic return.'
  },
  {
    id: 'p2_sst_44',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Constituent Assembly of India',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'On which date did the Constituent Assembly formally adopt and enact the Constitution of India, and on which date did it come into full effect?',
    options: [
      'Adopted on 26th November 1949; came into full effect on 26th January 1950',
      'Adopted on 15th August 1947; came into effect on 2nd October 1948',
      'Adopted on 26th January 1930; came into effect on 15th August 1947',
      'Adopted on 1st May 1960; came into effect on 15th August 1960'
    ],
    correctAnswer: 0,
    explanation: 'The Preamble records that the Constitution was adopted on 26 November 1949 (Samvidhan Divas) and enforced on 26 January 1950 (Republic Day, commemorating the 1930 Purna Swaraj date).'
  },
  {
    id: 'p2_sst_45',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Weathering, Erosion & Landforms (River, Wind, Glacier)',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each geomorphic landform with the natural agent of erosion/deposition that creates it:\n1. Ox-bow Lake and Floodplain Meanders — (P) Wind action in arid deserts\n2. Mushroom Rocks and Barchan Sand Dunes — (Q) Sea waves along rocky coasts\n3. Cirque (Corrie) and Moraines — (R) River (Fluvial) action in plains\n4. Sea Caves, Sea Arches, and Stacks — (S) Moving ice (Glacial) action in high mountains\nSelect the correct code:',
    options: [
      '1-R, 2-P, 3-S, 4-Q',
      '1-P, 2-R, 3-S, 4-Q',
      '1-R, 2-S, 3-P, 4-Q',
      '1-Q, 2-P, 3-S, 4-R'
    ],
    correctAnswer: 0,
    explanation: 'Rivers form meanders and ox-bow lakes; wind abrasion/deposition creates mushroom rocks and barchans; glaciers carve cirques and deposit moraines; sea waves erode arches and stacks.'
  },
  {
    id: 'p2_sst_46',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Types of Rainfall (Convectional, Orographic & Cyclonic)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Mahabaleshwar on the crest of the Sahyadri (Western Ghats) receives over 500 cm of annual rainfall, whereas Wai and Phaltan situated just a short distance to the east receive less than 70 cm. What causes this sharp contrast?',
    options: [
      'Orographic (relief) rainfall occurs on the windward western slope while the descending winds warm up and form a rain-shadow zone on the leeward eastern slope',
      'Wai and Phaltan lie north of the Arctic Circle',
      'Mahabaleshwar experiences only equatorial 4-o’clock convectional showers daily in winter',
      'Ocean currents pass directly through Mahabaleshwar'
    ],
    correctAnswer: 0,
    explanation: 'Moisture-laden Southwest Monsoon winds rise over the Western Ghats (windward heavy rain) and descend adiabatically warm and dry on the eastern leeward rain-shadow side.'
  },
  {
    id: 'p2_sst_47',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Natural Vegetation Biomes of India',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which forest type covers the largest geographical area in India (including the Satpura and eastern Sahyadri slopes) and features trees like Teak (Sagwan), Sal, Shisham, and Bamboo that shed their leaves for 6 to 8 weeks in dry summer?',
    options: [
      'Tropical Deciduous Forests (Monsoon Forests)',
      'Tropical Evergreen Rainforests',
      'Littoral Mangrove (Sundarbans) Forests',
      'Alpine Tundra Moss Vegetation'
    ],
    correctAnswer: 0,
    explanation: 'Tropical Deciduous (Monsoon) Forests thrive in regions receiving 70–200 cm rainfall and shed leaves in spring/early summer to conserve water.'
  },
  {
    id: 'p2_sst_48',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Locational Factors of Iron and Steel Industry',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'Why was Jamshedpur (Sakchi, founded in 1907 as TISCO) geographically ideal for establishing India’s first major modern integrated Iron and Steel plant?',
    options: [
      'Close proximity to Chotanagpur iron ore (Noamundi), Jharia coking coal, manganese/dolomite, abundant water from the Subarnarekha and Kharkai rivers, and the Bengal-Nagpur railway line to Kolkata port',
      'Availability of alpine glacial ice and marine coral reefs',
      'Location inside a high-altitude desert with zero transport links',
      'Exclusive reliance on imported iron ore from South America'
    ],
    correctAnswer: 0,
    explanation: 'Iron and steel is a weight-losing heavy industry; Sakchi offered iron ore, coal, flux, river water, and rail connectivity within a compact radius.'
  },
  {
    id: 'p2_sst_49',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Right to Information (RTI Act 2005) & Accountability',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How does the Right to Information (RTI) Act, 2005 strengthen participatory democracy in India?',
    options: [
      'It empowers citizens to inspect public records and obtain certified information from government authorities within 30 days (48 hours if life or liberty is involved), promoting transparency and curbing corruption',
      'It allows private corporations to censor newspaper editorials',
      'It exempts all government departments from auditing public expenditure',
      'It restricts voting rights to government employees only'
    ],
    correctAnswer: 0,
    explanation: 'Flowing from Article 19(1)(a) freedom of speech and expression, the RTI Act 2005 mandates time-bound disclosure of public spending and administrative decisions.'
  },
  {
    id: 'p2_sst_50',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Criminal Justice System & First Information Report (FIR)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Under the Indian criminal justice system and Article 22 of the Constitution, which safeguard is guaranteed to every arrested person?',
    options: [
      'Right to be informed of the grounds of arrest, right to consult a legal practitioner, and right to be produced before the nearest Magistrate within 24 hours of arrest (excluding travel time)',
      'Police officers act as final judges and pronounce prison sentences inside the police station',
      'A confession recorded forcibly inside police custody is treated as sole proof of guilt',
      'Family members must never be informed of an arrest'
    ],
    correctAnswer: 0,
    explanation: 'Article 22 and Supreme Court D.K. Basu guidelines guarantee notice of grounds of arrest, legal counsel, and production before a Magistrate within 24 hours.'
  },
  {
    id: 'p2_sst_51',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics & Economics – Public Facilities (Water, Sanitation, Healthcare, Education)',
    questionType: 'Assertion-Reasoning',
    difficulty: 'Moderate',
    question: 'Assertion (A): Basic public facilities such as safe drinking water, sanitation, primary healthcare, and elementary education must be provided or regulated equitably by the Government rather than left purely to profit-driven private companies.\nReason (R): The Right to Water and Health is an integral part of the Fundamental Right to Life under Article 21, calling for universal, affordable access for rich and poor alike.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      'Both (A) and (R) are false'
    ],
    correctAnswer: 0,
    explanation: 'Supreme Court rulings (e.g., Subhash Kumar vs State of Bihar) hold that the Right to Life (Article 21) includes universal access to clean water and basic public facilities.'
  },
  {
    id: 'p2_sst_52',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Project Method (Kilpatrick) in Social Studies',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Class 7 students undertake a guided field project to interview local weekly-market (Bazaar) vegetable vendors, map supply routes from surrounding villages, and analyze price differences between weekly markets and shopping malls. Which sequence follows William Kilpatrick’s Project Method steps?',
    options: [
      'Providing a situation → Choosing and purposing → Planning → Executing the field survey → Evaluating and recording findings',
      'Memorizing textbook answers → Writing a silent test → Copying grades',
      'Reading a single newspaper article → Skipping field questions → Assigning punishment',
      'Drawing a margin → Dictating notes → Closing notebooks'
    ],
    correctAnswer: 0,
    explanation: 'Kilpatrick’s purposeful social project progresses through Purposing, Planning, Executing, Judging/Evaluating, and Recording.'
  },
  {
    id: 'p2_sst_53',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Timeline Construction & Chronological Thinking',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'When teaching students how to place historical dates on a timeline spanning BCE (Before Common Era) and CE (Common Era), which mathematical analogy helps students grasp BCE chronology most clearly?',
    options: [
      'Comparing BCE years to negative numbers to the left of zero on a horizontal number line (so 500 BCE occurred 200 years BEFORE 300 BCE)',
      'Telling students that 300 BCE occurred before 500 BCE just like 300 CE occurred before 500 CE',
      'Asking students to ignore BCE dates completely',
      'Using a circular pie chart without numbers'
    ],
    correctAnswer: 0,
    explanation: 'On a timeline, BCE counts backward toward the reference point (analogous to negative integers approaching 0), whereas CE counts forward.'
  },
  {
    id: 'p2_sst_54',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Oral History & Community Archives',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A teacher asks Class 8 students to interview grandparents and elderly community members about how grain was milled, how water was drawn, and how festivals were celebrated fifty years ago, and then cross-check those memories with old district gazetteers. What is the pedagogical value of this activity?',
    options: [
      'It introduces learners to Oral History, connects family memory with broader social change, and teaches source corroboration',
      'It proves that written archives and gazetteers are completely useless',
      'It replaces history with fictional drama',
      'It assesses only English spelling accuracy'
    ],
    correctAnswer: 0,
    explanation: 'Oral history humanizes the past by capturing everyday lived experiences often missing from official records, while cross-checking builds historical method.'
  },
  {
    id: 'p2_sst_55',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Globe vs Flat Map Projection (Mercator Distortion)',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'While looking at a flat rectangular Mercator world map, a Class 6 student asks: "Why does Greenland look almost as big as the entire continent of Africa on this wall map, when Africa is actually 14 times larger on our classroom globe?" How should the geography teacher explain this?',
    options: [
      'Projecting the curved 3D spherical Earth onto a flat 2D cylindrical sheet inevitably stretches and distorts area near the high polar latitudes; only a 3D globe preserves true area, shape, and distance simultaneously',
      'Greenland actually expands in size every winter due to snowfall',
      'The classroom globe was manufactured with the wrong continent sizes',
      'Africa is smaller than Greenland in square kilometres'
    ],
    correctAnswer: 0,
    explanation: 'Every 2D map projection of a 3D sphere introduces distortion in area, shape, or distance; cylindrical Mercator projectionspreserve angles/bearings but greatly exaggerate polar areas.'
  },
  {
    id: 'p2_sst_56',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Open-Book Examination & Higher-Order Thinking',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'If a Social Science teacher conducts an Open-Book Assessment in Class 8, which type of question is most valid and meaningful?',
    options: [
      '"Compare the fundamental rights guaranteed in the Indian Constitution with the workplace conditions described in the case study below, and identify which articles are being violated and why."',
      '"In which year was the Battle of Plassey fought?"',
      '"Copy the first paragraph of page 42 from your textbook."',
      '"List the names of the eight planets in order from the textbook diagram."'
    ],
    correctAnswer: 0,
    explanation: 'Open-book assessments shift focus from rote factual recall (which can be copied verbatim) to interpretation, synthesis, and application of concepts to novel cases.'
  },
  {
    id: 'p2_sst_57',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Interdisciplinary Teaching of a Theme ("Water")',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A teacher plans an integrated middle-school unit around the theme "Water". Which combination demonstrates genuine interdisciplinary integration across History, Geography, and Social & Political Life?',
    options: [
      'History: Harappan reservoirs & medieval stepwells (Baravs/Baolis); Geography: hydrological cycle, watershed drainage & monsoon rainfall; Civics/Economics: Article 21 right to safe drinking water & Gram Panchayat water governance',
      'History: memorizing atomic weights of hydrogen; Geography: conjugating verbs; Civics: drawing triangles',
      'Reading only one paragraph on rainfall and cancelling history and civics periods',
      'Testing students solely on spelling the names of ten rivers'
    ],
    correctAnswer: 0,
    explanation: 'Thematic interdisciplinary teaching weaves historical heritage, physical/spatial geography, and civic-economic rights around a shared real-world theme.'
  },
  {
    id: 'p2_sst_58',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Youth Parliament / Mock Gram Sabha Simulation',
    questionType: 'Classroom-Situation',
    difficulty: 'Easy',
    question: 'What is the primary learning outcome of organizing a "Youth Parliament" or "Mock Gram Sabha" role-play simulation in an upper-primary classroom?',
    options: [
      'Experiential understanding of parliamentary questioning, collective deliberation, budget prioritization, and respect for diverse viewpoints in a democracy',
      'Selecting students for professional theatre acting careers only',
      'Avoiding teaching the chapters on legislature and executive',
      'Memorizing the names of all 543 constituencies by rote'
    ],
    correctAnswer: 0,
    explanation: 'Simulations of democratic institutions transform abstract constitutional procedures into lived participatory citizenship skills.'
  },
  {
    id: 'p2_sst_59',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Diagnostic Rubric for Portfolio Assessment',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which criteria should be included in a formative assessment rubric for a Class 7 Geography field report on "Local Land Use and Waste Management"?',
    options: [
      'Accuracy of observational data collection, spatial sketch-map clarity, cause-and-effect analysis of waste disposal, and feasibility of suggested community solutions',
      'Cost of the plastic folder and decorative glitter used on the cover page',
      'Verbatim copying of Wikipedia articles without local observation',
      'Length of the report measured solely by weight of paper'
    ],
    correctAnswer: 0,
    explanation: 'Authentic assessment rubrics evaluate inquiry skills—data collection, spatial representation, causal analysis, and civic problem-solving—not superficial decoration.'
  },
  {
    id: 'p2_sst_60',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Critical Media Literacy & Advertising',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'In a Class 7 Social and Political Life lesson on "Understanding Media and Advertising", the teacher asks students to compare a commercial soft-drink advertisement with a public-health nutrition label. What critical thinking skill does this develop?',
    options: [
      'Analyzing how commercial advertising uses emotional appeal and celebrity endorsement to shape consumer desires, and evaluating claims critically against factual evidence',
      'Training students to design deceptive advertisements',
      'Memorizing television channel frequencies',
      'Banning students from reading newspapers'
    ],
    correctAnswer: 0,
    explanation: 'Critical media literacy equips learners to deconstruct persuasive commercial messaging, spot bias or omission, and make informed civic and consumer choices.'
  }
];

export const PAPER2_CURATED_SST_SET2_60: CuratedPaper2Mcq[] = [
  {
    id: 'p2_sst_61',
    subject: 'SOCIAL_STUDIES',
    topic: 'Prehistory – Palaeolithic, Mesolithic & Neolithic Sites',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each prehistoric site in the Indian subcontinent with its key archaeological characteristic:\n1. Bhimbetka (Madhya Pradesh) — (P) Neolithic pit-dwellings with steps dug into the ground\n2. Mehrgarh (near Bolan Pass) — (Q) Natural rock shelters with Palaeolithic and Mesolithic cave paintings\n3. Burzahom (Kashmir) — (R) Earliest evidence of wheat-barley cultivation, sheep-goat domestication, and rectangular mud-brick houses\n4. Inamgaon (Ghod River, Maharashtra) — (S) Chalcolithic settlement with circular/rectangular mud houses and adult burials inside house floors\nSelect the correct code:',
    options: [
      '1-Q, 2-R, 3-P, 4-S',
      '1-R, 2-Q, 3-P, 4-S',
      '1-Q, 2-P, 3-R, 4-S',
      '1-S, 2-R, 3-P, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Bhimbetka is renowned for prehistoric rock shelters/paintings; Mehrgarh for earliest Neolithic farming; Burzahom for subterranean pit-houses; Inamgaon (Pune district) for Jorwe-culture Chalcolithic burials.'
  },
  {
    id: 'p2_sst_62',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Upanishads & Six Schools of Philosophy (Shad-Darshana)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In the Upanishadic dialogue between Gargi, Maitreyi, Satyakama Jabala, and sages like Yajnavalkya and Gautama, what does the story of Satyakama Jabala signify?',
    options: [
      'Truthfulness and sincere quest for knowledge (Brahmavidya) transcended rigid birth status in early Upanishadic thought',
      'Only royal military commanders were allowed to ask philosophical questions',
      'Upanishads dealt exclusively with maritime customs tariffs',
      'Women thinkers were completely absent from Upanishadic debates'
    ],
    correctAnswer: 0,
    explanation: 'Satyakama Jabala, son of an unmarried slave woman Jabali, was accepted as a disciple by sage Gautama because of his unflinching truthfulness.'
  },
  {
    id: 'p2_sst_63',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Mauryan Administration & Arthashastra',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'According to Megasthenes’ "Indica" and Kautilya’s "Arthashastra", how was the Mauryan imperial capital of Pataliputra administered?',
    options: [
      'By a municipal council of 30 members divided into six committees of five members each overseeing industries, foreigners, vital statistics, trade/weights, manufactured goods, and sales tax',
      'By a single hereditary feudal baron without any committees',
      'By Roman senators appointed from Alexandria',
      'Without any taxation or census records'
    ],
    correctAnswer: 0,
    explanation: 'Megasthenes described Pataliputra’s civic administration run by six 5-member boards managing crafts, foreign visitors, birth-death registration, weights/measures, quality control, and tithe collection.'
  },
  {
    id: 'p2_sst_64',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Satavahana Dynasty of Maharashtra (Pratishthana / Paithan)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which ancient dynasty ruled over Maharashtra with its capital at Pratishthana (modern Paithan on the Godavari), patronized Prakrit literature ("Gatha Saptashati") and rock-cut Chaityas at Karla and Nashik, and used matronymics like "Gautamiputra" (Son of Gautami)?',
    options: [
      'The Satavahana Dynasty',
      'The Kushana Dynasty',
      'The Pala Dynasty',
      'The Ahom Dynasty'
    ],
    correctAnswer: 0,
    explanation: 'The Satavahanas (including Gautamiputra Satakarni and Hala) ruled the Deccan from Paithan, fostered Indo-Roman trade via Kalyan/Sopara, and excavated Buddhist rock-cut caves.'
  },
  {
    id: 'p2_sst_65',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Silk Route, Kushanas & Mahayana Buddhism',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which Kushana ruler patronized the Fourth Buddhist Council in Kashmir, started the Shaka Era (78 CE) still used in India’s National Calendar, and controlled key branches of the Silk Route?',
    options: [
      'Kanishka',
      'Bindusara',
      'Pushyamitra Shunga',
      'Pulakeshin II'
    ],
    correctAnswer: 0,
    explanation: 'Emperor Kanishka convened the Fourth Buddhist Council, patronized Ashvaghosha (Buddhacharita), and protected Silk Route trade across Central Asia.'
  },
  {
    id: 'p2_sst_66',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient & Early Medieval Art – Ajanta, Ellora & Elephanta Caves',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is the Kailasa Temple (Cave 16) at Ellora (Verul, Chhatrapati Sambhajinagar), commissioned by Rashtrakuta King Krishna I, celebrated as an architectural marvel?',
    options: [
      'It is the world’s largest monolithic rock-cut temple, carved vertically top-down out of a single basalt cliff without adding external masonry blocks',
      'It was built entirely out of white Makrana marble transported from Rajasthan',
      'It was constructed using modern steel girders in the 19th century',
      'It is an underground stepwell used solely for irrigation'
    ],
    correctAnswer: 0,
    explanation: 'The monolithic Kailasa Temple at Ellora was excavated top-down from a single basalt escarpment by Rashtrakuta artisans in the 8th century CE.'
  },
  {
    id: 'p2_sst_67',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Tripartite Struggle for Kannauj',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Between the 8th and 10th centuries CE, which three major Indian dynasties engaged in the "Tripartite Struggle" for control over the fertile Ganga-valley imperial city of Kannauj?',
    options: [
      'The Gurjara-Pratiharas, the Palas of Bengal, and the Rashtrakutas of the Deccan',
      'The Mauryas, the Guptas, and the Satavahanas',
      'The Mughals, the Marathas, and the British',
      'The Cholas, the Pandyas, and the Hoysalas'
    ],
    correctAnswer: 0,
    explanation: 'Control over Kannauj in the Ganga doab was contested for over two centuries by the Gurjara-Pratiharas (west/north), Palas (east), and Rashtrakutas (Deccan).'
  },
  {
    id: 'p2_sst_68',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Al-Biruni’s Kitab-ul-Hind',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'In his 11th-century Arabic treatise "Kitab-ul-Hind", which accomplishment of Indian society did the scholar Al-Biruni praise with particular admiration?',
    options: [
      'The high degree of engineering skill shown in constructing sacred stone water tanks (pushkarinis/stepwells) with separate flights of entry and exit stairs',
      'The invention of steam locomotives in medieval Punjab',
      'The use of printing presses in every village',
      'The absence of any astronomical calculations'
    ],
    correctAnswer: 0,
    explanation: 'Al-Biruni learned Sanskrit, studied Indian mathematics/astronomy, and marvelled at Indian hydraulic architecture—especially monumental stepped stone reservoirs.'
  },
  {
    id: 'p2_sst_69',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Chhatrapati Shivaji Maharaj’s Naval Vision & Sea Forts',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is Chhatrapati Shivaji Maharaj regarded as the "Father of the Indian Navy", and which iconic island sea forts did he construct to safeguard the Konkan coastline?',
    options: [
      'He recognized that "he who has a navy controls the sea", built an indigenous fleet of Gurabs and Galbats, and fortified coastal strongholds like Sindhudurg and Padmadurg',
      'He leased all Konkan ports to the British Navy in 1660',
      'He prohibited shipbuilding along the Arabian Sea coast',
      'He built only desert forts in Rajasthan'
    ],
    correctAnswer: 0,
    explanation: 'To protect Konkan ryots and maritime trade from the Siddis, Portuguese, and English, Shivaji Maharaj built an indigenous navy and sea forts like Sindhudurg (Malvan) and Vijaydurg.'
  },
  {
    id: 'p2_sst_70',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Punyashlok Ahilyabai Holkar’s Governance',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which 18th-century ruler of the Malwa kingdom (with capital at Maheshwar on the Narmada) is revered across India for her just administration, promotion of the Maheshwari handloom industry, and construction of ghats, dharmashalas, and wells from Varanasi to Rameshwaram?',
    options: [
      'Punyashlok Ahilyabai Holkar',
      'Razia Sultana',
      'Chand Bibi',
      'Begum Hazrat Mahal'
    ],
    correctAnswer: 0,
    explanation: 'Ahilyabai Holkar (1725–1795) governed Malwa for three decades of peace, nurtured Maheshwar weavers, and built public civic infrastructure across India.'
  },
  {
    id: 'p2_sst_71',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Blue Rebellion (Indigo Revolt 1859) & Champaran (1917)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why did peasant cultivators (ryots) in Bengal (1859) and Champaran, Bihar (1917) strongly resist the forced cultivation of Indigo under European planters?',
    options: [
      'Indigo planters paid advances that trapped ryots in perpetual debt, while deep-rooted indigo exhausted soil fertility on the best land needed for growing food-grain paddy',
      'Indigo plants required zero water and grew only on snow-covered mountains',
      'British planters paid ten times the market price of gold for indigo leaves',
      'Indigo cultivation increased rice yield fivefold on the same plot'
    ],
    correctAnswer: 0,
    explanation: 'Under the Nij and Ryoti (Tinkathia) systems, coercive loans forced peasants to grow indigo on their most fertile plots, depleting soil nitrogen and preventing paddy cultivation.'
  },
  {
    id: 'p2_sst_72',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Wood’s Despatch (1854) & Colonial Education Debates',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What was the historic significance of Charles Wood’s Despatch of 1854 in the history of modern formal education in India?',
    options: [
      'Known as the "Magna Carta of English Education in India", it recommended a structured hierarchy from vernacular primary schools to Anglo-vernacular high schools and established universities at Bombay, Calcutta, and Madras (1857)',
      'It banned all primary schools and universities across India',
      'It made Sanskrit and Persian the sole mediums of engineering colleges',
      'It introduced the NEP 5+3+3+4 structure in 1854'
    ],
    correctAnswer: 0,
    explanation: 'Wood’s Despatch (1854) created Departments of Public Instruction, grants-in-aid, teacher-training institutions, vernacular primary schooling, and the 1857 Presidency Universities.'
  },
  {
    id: 'p2_sst_73',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Tribal Uprisings (Birsa Munda, Santhal, Ramoshi, Bhil)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What were the core grievances behind the "Ulgulan" (Great Tumult, 1899–1900) led by Birsa Munda in the Chotanagpur plateau?',
    options: [
      'Destruction of traditional collective "Khuntkatti" land rights by British forest laws, exploitation by moneylenders and jagirdars (Dikus), and forced begar labour',
      'Demand to invite British timber companies to clear all sal forests',
      'Opposition to growing food crops in villages',
      'Support for increasing colonial land revenue threefold'
    ],
    correctAnswer: 0,
    explanation: 'Birsa Munda mobilized Mundas against colonial forest restrictions and alienation of ancestral Khuntkatti (joint-tenancy) lands, prompting the Chotanagpur Tenancy Act (1908).'
  },
  {
    id: 'p2_sst_74',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Dr. B.R. Ambedkar: Mahad Satyagraha (1927) & Social Equality',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why did Dr. Babasaheb Ambedkar lead the historic Mahad Chavdar Tale (Tank) Satyagraha on 20th March 1927 in Raigad district of Maharashtra?',
    options: [
      'To assert the fundamental human and civic right of the oppressed classes to draw water from a public municipal reservoir on terms of complete equality and dignity',
      'To demand privatization of municipal drinking water tanks',
      'To oppose the Bole Resolution passed by the Bombay Legislative Council',
      'To construct a private hydroelectric dam at Mahad'
    ],
    correctAnswer: 0,
    explanation: 'Implementing the 1923 S.K. Bole Resolution opening public water sources to all citizens, Dr. Ambedkar led the non-violent Mahad Satyagraha as a landmark struggle for human dignity.'
  },
  {
    id: 'p2_sst_75',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Prati Sarkar (Parallel Government) in Satara during Quit India',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'During the Quit India Movement (1942–1946), who led the famous underground "Prati Sarkar" (Parallel Government) in Satara, Maharashtra, which organized "Toofan Sena", Nyayadan Mandals (people’s courts), and grain banks?',
    options: [
      'Krantisinh Nana Patil (along with Yashwantrao Chavan, G.D. Lad, and Nagnath Naikwadi)',
      'Chittu Pandey of Ballia',
      'Matangini Hazra of Tamluk',
      'Alluri Sitarama Raju of Rampa'
    ],
    correctAnswer: 0,
    explanation: 'Krantisinh Nana Patil spearheaded the Satara Prati Sarkar (1943–1946), the longest-lasting parallel people’s government during the Quit India movement.'
  },
  {
    id: 'p2_sst_76',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Solar System: Inner Terrestrial vs Outer Jovian Planets',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is Venus called "Earth’s Twin" in size and mass, yet remains the hottest planet in our Solar System (even hotter than Mercury)?',
    options: [
      'Venus has an extremely dense atmosphere (~96% carbon dioxide) that traps solar infrared radiation through a runaway greenhouse effect',
      'Venus is closer to the Sun than Mercury',
      'Venus has three burning moons orbiting its equator',
      'Venus is composed entirely of molten nuclear uranium'
    ],
    correctAnswer: 0,
    explanation: 'Venus’s thick CO₂ atmosphere creates an intense runaway greenhouse effect, raising its surface temperature above 460°C.'
  },
  {
    id: 'p2_sst_77',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – International Date Line (180° Meridian)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why is the International Date Line (IDL) along the 180° meridian drawn with several zig-zag deviations across the Pacific Ocean rather than as a strict straight line from pole to pole?',
    options: [
      'To avoid splitting island nations and archipelagos (like Kiribati, Fiji, and the Aleutian Islands) into two different calendar dates on the same day',
      'Because ships cannot sail across a straight line',
      'To follow the crest of the Mid-Atlantic Ridge',
      'Because the Earth’s axis bends by 45 degrees in the Pacific'
    ],
    correctAnswer: 0,
    explanation: 'The IDL deviates exclusively over ocean waters around island groups so neighbouring islands within the same country share the same calendar day.'
  },
  {
    id: 'p2_sst_78',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Earthquake Waves (P, S, and L Waves) & Seismograph',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How do Primary (P) seismic waves and Secondary (S) seismic waves help geophysicists deduce that the Earth’s outer core is in a liquid state?',
    options: [
      'Compressional P-waves travel through solids, liquids, and gases, whereas transverse shear S-waves can travel ONLY through solids and disappear completely upon entering the liquid outer core',
      'S-waves travel only through liquids and gases, whereas P-waves stop at the crust',
      'Drilling rigs have pumped liquid water directly out of the Earth’s centre at 6,371 km depth',
      'Surface L-waves pass unchanged through the inner core'
    ],
    correctAnswer: 0,
    explanation: 'Shear (S) waves cannot propagate through fluids; the S-wave shadow zone beyond 103° epicentral distance proves the outer core is liquid.'
  },
  {
    id: 'p2_sst_79',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Planetary Winds, Coriolis Force & Pressure Belts',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'According to Ferrel’s Law of Coriolis deflection caused by Earth’s rotation, in which direction are moving winds and ocean currents deflected in the Northern and Southern Hemispheres respectively?',
    options: [
      'To their right in the Northern Hemisphere and to their left in the Southern Hemisphere',
      'To their left in the Northern Hemisphere and to their right in the Southern Hemisphere',
      'Straight downward toward the equator without any deflection',
      'Vertically upward into the Exosphere'
    ],
    correctAnswer: 0,
    explanation: 'Earth’s west-to-east rotation produces the apparent Coriolis force, deflecting free-moving winds/currents to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.'
  },
  {
    id: 'p2_sst_80',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Spring Tides (Syzygy) vs Neap Tides',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'On which lunar days do extra-high "Spring Tides" (Udhanachi Bharati) occur in the oceans, and what astronomical alignment causes them?',
    options: [
      'On Full Moon (Pournima) and New Moon (Amavasya) days, when the Sun, Moon, and Earth align in a straight line (syzygy) so their gravitational pulls reinforce each other',
      'Only on the seventh/eighth day (Ashtami) of each lunar fortnight when Sun and Moon are at 90° right angles',
      'Only once every 12 years during a solar eclipse',
      'Only during the spring season in March and April'
    ],
    correctAnswer: 0,
    explanation: 'During syzygy (New Moon and Full Moon), the combined gravitational tide-producing forces of the Moon and Sun produce maximum tidal range (Spring Tides); quadrature at 90° on Ashtami produces Neap Tides.'
  },
  {
    id: 'p2_sst_81',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Administrative Divisions & Physical Geography of Maharashtra',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each geographic feature of Maharashtra with its correct location or identity:\n1. Kalsubai (1,646 m) — (P) Meteorite impact crater lake in Buldhana district\n2. Lonar Lake — (Q) Highest mountain peak of the Sahyadri range in Maharashtra (Ahilyanagar/Nashik border)\n3. Chikhaldara (Melghat) — (R) Major tiger reserve in Chandrapur district\n4. Tadoba-Andhari — (S) Hill station in the Satpura (Gavilgad) range in Amravati district\nSelect the correct code:',
    options: [
      '1-Q, 2-P, 3-S, 4-R',
      '1-P, 2-Q, 3-S, 4-R',
      '1-Q, 2-S, 3-P, 4-R',
      '1-R, 2-P, 3-S, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Kalsubai (1,646 m) is Maharashtra’s highest peak; Lonar in Buldhana is a basaltic impact crater lake; Chikhaldara lies in the Gavilgad/Satpura hills of Amravati; Tadoba is in Chandrapur.'
  },
  {
    id: 'p2_sst_82',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Types of Farming: Intensive Subsistence, Plantation & Shifting',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which of the following accurately describes "Plantation Agriculture" (such as Tea in Assam/Darjeeling, Coffee in Karnataka, and Rubber in Kerala)?',
    options: [
      'A commercial farming system where a single cash crop is grown over large estates using scientific methods, capital investment, processing units, and transport networks',
      'Slash-and-burn shifting cultivation practiced on small forest patches without tools',
      'Nomadic herding of camels and sheep across arid steppes',
      'Growing mixed kitchen vegetables on a residential balcony for home consumption'
    ],
    correctAnswer: 0,
    explanation: 'Plantation agriculture is large-scale commercial monoculture situated at the agriculture–industry interface.'
  },
  {
    id: 'p2_sst_83',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Transport Networks: Golden Quadrilateral & Konkan Railway',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is the 760-km Konkan Railway line connecting Roha (Maharashtra) to Thokur (near Mangaluru, Karnataka) considered one of the greatest civil engineering achievements in Indian railway history?',
    options: [
      'It traverses rugged Western Ghats terrain across more than 2,000 bridges and 90+ tunnels through steep Sahyadri spurs and deep river estuaries',
      'It was built across a flat desert plain without a single bridge or tunnel',
      'It operates exclusively under the sea from Mumbai to Chennai',
      'It connects Delhi, Srinagar, and Leh across the Karakoram Pass'
    ],
    correctAnswer: 0,
    explanation: 'Opened in 1998, the Konkan Railway overcame formidable Sahyadri escarpments, deep gorges (like the Panvalnadi viaduct), and soft-soil tunnels.'
  },
  {
    id: 'p2_sst_84',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Disaster Management: Cyclones, Floods & Earthquakes',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'During a sudden earthquake tremor while students are inside a second-floor classroom, what is the internationally recommended immediate safety protocol?',
    options: [
      '"Drop, Cover, and Hold On" under a sturdy wooden desk away from glass windows, and evacuate calmly via stairs (never elevators) once the shaking stops',
      'Crowd into the narrow elevator shaft immediately while the building is shaking',
      'Stand directly beneath heavy glass chandeliers and tall bookshelves',
      'Jump out of second-floor windows onto the street'
    ],
    correctAnswer: 0,
    explanation: 'Drop, Cover, and Hold On protects the head and torso from falling ceiling debris during tremors, followed by orderly stair evacuation to an open assembly ground.'
  },
  {
    id: 'p2_sst_85',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Sustainable Development Goals (Brundtland Definition)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How is "Sustainable Development" defined in environmental geography and the UN Brundtland Commission report?',
    options: [
      'Development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs',
      'Extracting all mineral and groundwater reserves within ten years to maximize immediate GDP',
      'Halting all primary education and healthcare programs to save money',
      'Replacing all forests with concrete industrial zones'
    ],
    correctAnswer: 0,
    explanation: 'Sustainable development balances economic wellbeing, social equity, and ecological regeneration for intergenerational justice.'
  },
  {
    id: 'p2_sst_86',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Fundamental Duties (Article 51A)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'By which Constitutional Amendment were the Fundamental Duties of citizens incorporated into Part IVA (Article 51A) of the Indian Constitution, and which 11th Fundamental Duty was added in 2002?',
    options: [
      '42nd Amendment Act (1976, Swaran Singh Committee); the 86th Amendment (2002) added the duty of parents/guardians to provide educational opportunities to children aged 6–14 years',
      '1st Amendment Act (1951); added the duty to pay municipal toll taxes',
      '73rd Amendment Act (1992); abolished all Fundamental Rights',
      '44th Amendment Act (1978); removed all Fundamental Duties'
    ],
    correctAnswer: 0,
    explanation: 'Ten Fundamental Duties were inserted by the 42nd Amendment (1976) in Article 51A, and the 11th duty (Article 51A(k) on child education 6–14 yrs) was added by the 86th Amendment (2002).'
  },
  {
    id: 'p2_sst_87',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – President & Governor: Constitutional Heads in Parliamentary Democracy',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How is the President of India elected under Article 54 of the Constitution?',
    options: [
      'Indirectly by an Electoral College consisting of the elected members of both Houses of Parliament (Lok Sabha and Rajya Sabha) and the elected members of the Legislative Assemblies of the States and Union Territories of Delhi and Puducherry',
      'Directly by universal adult franchise during general elections',
      'By nominated members of the Rajya Sabha and State Legislative Councils exclusively',
      'By the Chief Justice of India and the Election Commissioner alone'
    ],
    correctAnswer: 0,
    explanation: 'The President is elected via proportional representation by single transferable vote by an Electoral College of elected MPs and elected MLAs (nominated members and MLCs do not vote).'
  },
  {
    id: 'p2_sst_88',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Question Hour, Zero Hour & Parliamentary Accountability',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why is the daily "Question Hour" at the start of a Parliamentary sitting a vital mechanism of democratic governance?',
    options: [
      'Members of Parliament ask Ministers starred and unstarred questions about government policies, expenditure, and administrative shortcomings, holding the Executive directly accountable to the Legislature',
      'The Speaker conducts a general-knowledge quiz for school visitors',
      'Judges of the Supreme Court cross-examine private witnesses in Parliament',
      'Ministers are exempted from answering any questions from opposition MPs'
    ],
    correctAnswer: 0,
    explanation: 'In a parliamentary system (Article 75(3)), the Council of Ministers is collectively responsible to the Lok Sabha; Question Hour operationalizes daily legislative oversight.'
  },
  {
    id: 'p2_sst_89',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Constitutional Safeguards against Untouchability & Atrocities (Article 17)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which Article of the Indian Constitution abolishes "Untouchability" and forbids its practice in any form, making the enforcement of any disability arising out of untouchability a punishable offence?',
    options: [
      'Article 17 (under the Right to Equality)',
      'Article 368 (Amendment of the Constitution)',
      'Article 280 (Finance Commission)',
      'Article 112 (Annual Financial Statement)'
    ],
    correctAnswer: 0,
    explanation: 'Article 17 categorically abolishes untouchability and criminalizes its practice, reinforced by the Protection of Civil Rights Act (1955) and the SC/ST (Prevention of Atrocities) Act (1989).'
  },
  {
    id: 'p2_sst_90',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Forest Rights Act (2006) & PESA Act (1996)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What historical injustice did the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 seek to undo?',
    options: [
      'It legally recognized forest-dwelling tribal communities’ right to homestead, cultivable land, minor forest produce, and community forest conservation that had been denied under colonial forest laws',
      'It transferred all reserve forests to private mining corporations',
      'It evicted all Adivasi villages from Scheduled Areas',
      'It banned Gram Sabhas from protecting local biodiversity'
    ],
    correctAnswer: 0,
    explanation: 'The Forest Rights Act (2006) recognized the customary tenure, livelihood rights over minor forest produce, and conservation stewardship of forest-dwelling communities.'
  },
  {
    id: 'p2_sst_91',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics – Minimum Support Price (MSP), Buffer Stock & Public Distribution System (PDS)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How do the Minimum Support Price (MSP) announced by the Government, the Food Corporation of India (FCI) buffer stock, and the Public Distribution System (PDS / Ration Shops) work together to ensure food security?',
    options: [
      'FCI procures foodgrains from farmers at an assured remunerative MSP, maintains strategic buffer stocks for emergencies, and distributes subsidized grain to eligible households through fair-price ration shops',
      'FCI exports 100% of India’s wheat and rice to foreign countries',
      'MSP forces farmers to sell grain below their cost of production',
      'PDS ration shops sell luxury automobiles to corporate buyers'
    ],
    correctAnswer: 0,
    explanation: 'India’s food security architecture links producer price insurance (MSP procurement) with consumer nutritional access (National Food Security Act / PDS).'
  },
  {
    id: 'p2_sst_92',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics – Bhopal Gas Tragedy (1984) & Environmental/Worker Safety Laws',
    questionType: 'Case-Based',
    difficulty: 'Moderate',
    question: 'Why does the Class 8 Social and Political Life chapter "Law and Social Justice" examine the 1984 Bhopal Gas Tragedy and subsequently enacted environmental protection laws?',
    options: [
      'To show why strict government regulation and enforcement of occupational safety, minimum wage, and anti-pollution laws are essential to protect workers and citizens from cost-cutting by hazardous industries',
      'To argue that chemical factories should have zero safety inspections',
      'To promote dumping toxic industrial effluents into drinking-water rivers',
      'To prove that Article 21 does not apply to industrial workers'
    ],
    correctAnswer: 0,
    explanation: 'Following the 1984 methyl isocyanate disaster, India enacted the Environment (Protection) Act 1986 and judicial doctrines holding polluters strictly liable under Article 21.'
  },
  {
    id: 'p2_sst_93',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics – Rural Livelihoods: Seasonal Unemployment & MGNREGA',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Small and marginal rain-fed farmers in villages often face several months without farm work between the Kharif harvest and the next monsoon. How is this type of unemployment classified, and which statutory act provides 100 days of guaranteed rural wage employment?',
    options: [
      'Seasonal unemployment; addressed through the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA, 2005)',
      'Frictional IT unemployment; addressed by closing village Gram Panchayats',
      'Voluntary retirement; addressed by abolishing rural public works',
      'Cyclical stock-market unemployment'
    ],
    correctAnswer: 0,
    explanation: 'Agricultural dependence on monsoon cycles creates seasonal unemployment; MGNREGA (2005) guarantees at least 100 days of unskilled manual wage work per rural household while building water-conservation assets.'
  },
  {
    id: 'p2_sst_94',
    subject: 'SOCIAL_STUDIES',
    topic: 'Economics – Self-Help Groups (SHGs / Bachat Gat) & Financial Inclusion',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'How do Women’s Self-Help Groups (SHGs / Mahila Bachat Gats) transform rural credit and livelihood autonomy?',
    options: [
      'Members pool regular small savings, extend low-interest internal loans without physical collateral, obtain bank-linked micro-credit, and run collective micro-enterprises free from exploitative informal moneylenders',
      'SHGs charge 120% annual interest like informal moneylenders',
      'SHGs prohibit women from opening bank accounts',
      'SHGs operate only inside metropolitan stock exchanges'
    ],
    correctAnswer: 0,
    explanation: 'SHGs overcome lack of formal collateral through collective social guarantee, enabling financial inclusion, livelihood entrepreneurship, and grass-roots leadership.'
  },
  {
    id: 'p2_sst_95',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Election Commission of India, Model Code of Conduct & EVMs/VVPAT',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Under Article 324 of the Indian Constitution, which autonomous constitutional body is vested with the superintendence, direction, and control of electoral rolls and elections to Parliament and State Legislatures?',
    options: [
      'The Election Commission of India',
      'The Union Ministry of Home Affairs',
      'The NITI Aayog',
      'The Comptroller and Auditor General (CAG)'
    ],
    correctAnswer: 0,
    explanation: 'Article 324 establishes an independent Election Commission of India to ensure free and fair elections, enforce the Model Code of Conduct, and deploy EVM-VVPAT verification.'
  },
  {
    id: 'p2_sst_96',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Epistemological Shift in NCF 2005',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'According to the NCF 2005 Position Paper on Teaching Social Sciences, what is the primary epistemological shift required in upper-primary Social Science classrooms?',
    options: [
      'Moving from transmitting a heavy load of utilitarian factual information toward developing conceptual understanding, critical perspectives on equity/justice, and evidence-based inquiry',
      'Replacing analytical discussion with memorizing 500 dates and district populations by rote',
      'Treating Social Science as a non-academic subject inferior to natural sciences',
      'Eliminating maps and primary sources from textbooks'
    ],
    correctAnswer: 0,
    explanation: 'NCF 2005 emphasizes that Social Science carries a normative responsibility to cultivate critical moral and mental energy around equality, liberty, justice, and fraternity.'
  },
  {
    id: 'p2_sst_97',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Distinguishing Fact from Opinion in Historical Texts',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'A teacher presents two sentences to Class 7 students:\nSentence A: "Chhatrapati Shivaji Maharaj was coronated at Raigad Fort on 6th June 1674 (Jyeshtha Shuddha Trayodashi)."\nSentence B: "Mountain forts were the only reason any kingdom in medieval world history ever succeeded."\nWhich skill is the teacher cultivating by asking students to contrast Sentence A and Sentence B?',
    options: [
      'Distinguishing a verifiable historical fact (Sentence A) from an over-generalized sweeping opinion/claim requiring critical scrutiny (Sentence B)',
      'Teaching students that dates have no place in history',
      'Proving that Raigad Fort is located in Rajasthan',
      'Testing cursive handwriting speed'
    ],
    correctAnswer: 0,
    explanation: 'Critical reading in Social Science trains learners to separate verifiable empirical facts from sweeping generalizations or value judgements.'
  },
  {
    id: 'p2_sst_98',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Using Cartoons & Visual Narratives in SPL Textbooks',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Why do NCERT and SCERT upper-primary Social and Political Life textbooks frequently include editorial cartoons (such as R.K. Laxman’s "Common Man") and storyboard narratives?',
    options: [
      'Visual satire and storyboards make abstract political concepts (like coalition government, bureaucratic delay, or electoral promises) concrete, accessible, and open to critical classroom discussion',
      'Merely to fill blank pages so fewer words need to be printed',
      'To turn Social Science into a comic-drawing art examination',
      'Because middle-school students cannot read printed text'
    ],
    correctAnswer: 0,
    explanation: 'Cartoons and storyboards serve as pedagogical catalysts that distil complex socio-political paradoxes and invite learners to interpret multiple viewpoints.'
  },
  {
    id: 'p2_sst_99',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Field Visits to Museums, Forts & Gram Panchayats',
    questionType: 'Classroom-Situation',
    difficulty: 'Easy',
    question: 'Before taking Class 7 students on an educational field visit to a historical fort and local museum, what is the most essential preparatory step for the Social Science teacher?',
    options: [
      'Co-designing an observation sheet with guiding inquiry questions (on architecture, water cisterns, inscriptions, and conservation) so students observe actively rather than wander passively',
      'Asking students to leave their notebooks and pens at home',
      'Telling students that the trip is purely a picnic with no connection to history',
      'Cancelling post-visit reflection and discussion'
    ],
    correctAnswer: 0,
    explanation: 'Structured pre-visit inquiry prompts, active on-site observation logs, and post-visit synthesis turn an excursion into an authentic experiential learning investigation.'
  },
  {
    id: 'p2_sst_100',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Integrating Local/Regional History with National History',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'How should a teacher in Maharashtra connect a lesson on the national Non-Cooperation and Civil Disobedience Movements with the local environment of the learners?',
    options: [
      'By having students investigate local freedom struggle landmarks—such as the Mulshi Satyagraha, Jungle Satyagrahas (Bilashi, Chirner, Pusad), or Solapur Martial Law martyrs—alongside the national timeline',
      'By forbidding any mention of local or regional historical events',
      'By teaching only European diplomatic treaties',
      'By skipping the freedom struggle chapters'
    ],
    correctAnswer: 0,
    explanation: 'Connecting national historical processes to regional and local heritage sites makes history tangible and fosters civic pride and inquiry.'
  },
  {
    id: 'p2_sst_101',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Thematic vs Chronological Organization',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Why does the Class 6 history curriculum ("Our Pasts – I") organize chapters around themes like "From Hunting-Gathering to Growing Food", "In the Earliest Cities", and "Vital Villages, Thriving Towns" rather than a purely dynastic king-by-king list?',
    options: [
      'To shift focus from mere dynastic battles to how ordinary people lived, farmed, crafted tools, traded, built cities, and shaped cultural ideas across eras',
      'Because historians do not know the names of any ancient rulers',
      'To eliminate chronology altogether from history education',
      'To teach agricultural chemistry instead of history'
    ],
    correctAnswer: 0,
    explanation: 'Social history themes highlight material culture, livelihoods, technology, and everyday society alongside political developments.'
  },
  {
    id: 'p2_sst_102',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Inclusive Geography for Visually Impaired Students',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Which teaching-learning materials (TLMs) enable a student with visual impairment to learn physical relief features and river basins of India effectively in Class 7 Geography?',
    options: [
      '3D embossed tactile relief maps, raised-thread river drainage boards, Braille-labelled atlases, and clay/plaster landform models',
      'Flat laminated wall maps mounted behind glass at the front of the room',
      'Silent projection of satellite photographs without audio description',
      'Exempting the student from all map-work activities'
    ],
    correctAnswer: 0,
    explanation: 'Tactile 3D relief models and Braille/embossed maps translate spatial geography into touch-accessible representations.'
  },
  {
    id: 'p2_sst_103',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Diagnostic Remediation of Latitude/Longitude Confusion',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'Many Class 6 students confuse parallels of Latitude with meridians of Longitude. Which hands-on classroom demonstration clarifies the geometric difference most effectively?',
    options: [
      'Having students peel and mark a spherical orange (or ball): drawing horizontal parallel circles shrinking toward the poles (Latitudes) versus vertical semicircular segments converging at both poles like orange segments (Longitudes)',
      'Asking students to write the definitions of latitude and longitude twenty times',
      'Telling students that latitudes and longitudes are identical lines',
      'Skipping the globe chapter and moving to civics'
    ],
    correctAnswer: 0,
    explanation: 'An orange/sphere model vividly shows why parallels of latitude are full circles of unequal circumference that never meet, while meridians of longitude are semicircles of equal length meeting at the poles.'
  },
  {
    id: 'p2_sst_104',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Cooperative Learning (Jigsaw Method)',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'In a Class 8 Geography unit on "Natural Disasters", the teacher forms home groups of 4 students. Each member joins an expert group on one disaster (Earthquakes, Cyclones, Floods, or Droughts), researches its causes and mitigation, and returns to teach their home group. What is this cooperative strategy called?',
    options: [
      'Elliot Aronson’s Jigsaw Cooperative Learning Strategy',
      'Authoritarian Lecture-Cum-Dictation Method',
      'Competitive Individual Elimination Quiz',
      'Passive Rote Recitation'
    ],
    correctAnswer: 0,
    explanation: 'The Jigsaw strategy builds positive interdependence, individual accountability, and peer-teaching communication across sub-topics.'
  },
  {
    id: 'p2_sst_105',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Bloom’s Taxonomy in Question Paper Design',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which of the following Social Science test items assesses the cognitive level of "Analyzing / Evaluating" rather than simple "Remembering"?',
    options: [
      '"Examine the climatic data table of City X and City Y below, determine which city experiences a maritime versus continental climate, and justify your conclusion with two geographical reasons."',
      '"Name the capital of Maharashtra."',
      '"In which year was the Right to Education Act passed?"',
      '"State the total number of members in the Rajya Sabha."'
    ],
    correctAnswer: 0,
    explanation: 'Interpreting raw climatic data tables, contrasting patterns, and justifying conclusions with geographical principles engages higher-order analysis and evaluation.'
  },
  {
    id: 'p2_sst_106',
    subject: 'SOCIAL_STUDIES',
    topic: 'Ancient History – Ashoka’s Kalinga War (261 BCE) & Rock Edict XIII',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which Major Rock Edict of Emperor Ashoka expresses his deep remorse over the bloodshed of the Kalinga War and proclaims his shift from military conquest (Bherighosha) to conquest through righteousness (Dhammaghosha)?',
    options: [
      'Major Rock Edict XIII (13th Rock Edict)',
      'Pillar Edict I at Topra',
      'Bhabru Minor Rock Edict',
      'Junagadh Rock Inscription of Rudradaman'
    ],
    correctAnswer: 0,
    explanation: 'Major Rock Edict XIII vividly records the human suffering in Kalinga (261 BCE) and Ashoka’s pledge to pursue Dhamma-vijaya.'
  },
  {
    id: 'p2_sst_107',
    subject: 'SOCIAL_STUDIES',
    topic: 'Medieval History – Guru Nanak Dev & Sikh Tradition',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What was the social and spiritual significance of the "Langar" (common community kitchen) instituted by Guru Nanak Dev Ji?',
    options: [
      'People of all castes, creeds, genders, and economic ranks sat together on the floor (Pangat) to share a common meal, breaking caste barriers and affirming universal human equality',
      'It was a royal banquet reserved exclusively for nobility and tax officials',
      'It was a commercial grain market for wholesale traders',
      'It restricted entry to people of one region only'
    ],
    correctAnswer: 0,
    explanation: 'Guru Nanak Dev’s twin institutions of Sangat (worshipping together) and Pangat/Langar (eating together without caste distinction) embodied "Nam Japna, Kirat Karna, Vand Chhakna".'
  },
  {
    id: 'p2_sst_108',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Partition of Bengal (1905) & Vande Mataram / Boycott Movement',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which British Viceroy ordered the Partition of Bengal in 1905 on the pretext of administrative convenience, triggering the nationwide Swadeshi and Boycott Movement?',
    options: [
      'Lord Curzon',
      'Lord Ripon',
      'Lord William Bentinck',
      'Lord Mountbatten'
    ],
    correctAnswer: 0,
    explanation: 'Viceroy Lord Curzon partitioned Bengal in 1905 to divide the nerve-centre of Indian nationalism; Indians responded with the Swadeshi, Boycott, and National Education movements.'
  },
  {
    id: 'p2_sst_109',
    subject: 'SOCIAL_STUDIES',
    topic: 'Modern History – Samyukta Maharashtra Movement (1st May 1960)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Following the linguistic reorganization of states and the historic Samyukta Maharashtra movement (led by Keshavrao Jedhe, S.M. Joshi, Acharya Atre, Prabodhankar Thackeray, Senapati Bapat, and Annabhau Sathe), on which date was the state of Maharashtra with Mumbai as its capital formally inaugurated?',
    options: [
      '1st May 1960',
      '1st November 1956',
      '15th August 1947',
      '26th January 1950'
    ],
    correctAnswer: 0,
    explanation: 'The bilingual Bombay State (1956) was bifurcated under the Bombay Reorganisation Act, and Maharashtra was inaugurated on 1st May 1960 (Maharashtra Day).'
  },
  {
    id: 'p2_sst_110',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Composition of the Atmosphere & Greenhouse Gases',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which two gases together constitute approximately 99% of the volume of clean, dry air in Earth’s lower atmosphere?',
    options: [
      'Nitrogen (~78.08%) and Oxygen (~20.95%)',
      'Carbon dioxide (~78%) and Hydrogen (~21%)',
      'Argon (~50%) and Ozone (~49%)',
      'Helium (~60%) and Methane (~39%)'
    ],
    correctAnswer: 0,
    explanation: 'Nitrogen (~78%) and Oxygen (~21%) make up ~99% of dry atmospheric air, with Argon (~0.93%), Carbon dioxide (~0.04%), and trace gases comprising the remaining 1%.'
  },
  {
    id: 'p2_sst_111',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Salinity of Ocean Water & Dead Sea',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Why can a person float effortlessly on the surface of the Dead Sea (bordering Jordan and Israel) without sinking?',
    options: [
      'Its extremely high salinity (~340 grams of salt per kg of water, nearly 10 times normal ocean salinity) makes the water very dense, producing a strong upward buoyant force',
      'The Dead Sea has zero depth and is made of solid ice',
      'Gravity does not act at the Dead Sea',
      'Its water contains zero dissolved mineral salts'
    ],
    correctAnswer: 0,
    explanation: 'High concentration of dissolved mineral salts (~34% salinity) raises the density of Dead Sea water above that of the human body, ensuring effortless flotation.'
  },
  {
    id: 'p2_sst_112',
    subject: 'SOCIAL_STUDIES',
    topic: 'Geography – Census of India: Population Density & Sex Ratio',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'How are "Population Density" and "Sex Ratio" defined in the official Census of India?',
    options: [
      'Population Density is the number of persons living per square kilometre of land area; Sex Ratio is the number of females per 1,000 males in the population',
      'Population Density is total births per year; Sex Ratio is the number of males per 100 females',
      'Population Density is urban population percentage; Sex Ratio is literacy percentage',
      'Both measure annual per-capita income'
    ],
    correctAnswer: 0,
    explanation: 'In the Indian Census, Population Density = Total Population / Total Land Area (in km²), and Sex Ratio = Number of females per 1,000 males.'
  },
  {
    id: 'p2_sst_113',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Constitutional Amendment Procedure (Article 368)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Under the Supreme Court’s landmark Kesavananda Bharati judgment (1973), what is the constitutional limit on Parliament’s power to amend the Constitution under Article 368?',
    options: [
      'Parliament can amend any part of the Constitution, provided it does NOT alter or destroy the "Basic Structure" (such as supremacy of the Constitution, democracy, secularism, federalism, and judicial review)',
      'Parliament cannot amend any single word of the Constitution under any circumstances',
      'A simple majority of 10 MPs can abolish the Supreme Court and Fundamental Rights',
      'Only State Governors can amend the Union Constitution'
    ],
    correctAnswer: 0,
    explanation: 'The Basic Structure Doctrine (1973) holds that Parliament’s constituent power under Article 368 cannot abrogate the foundational pillars of the Constitution.'
  },
  {
    id: 'p2_sst_114',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Child Labour (Prohibition and Regulation) & Article 24',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What does Article 24 of the Indian Constitution (under the Right against Exploitation) explicitly prohibit?',
    options: [
      'Employment of children below the age of 14 years in any factory, mine, or other hazardous employment',
      'Free primary education for children in government schools',
      'Mid-Day Meal nutrition programs in primary schools',
      'Sports and cultural competitions for adolescents'
    ],
    correctAnswer: 0,
    explanation: 'Article 24 strictly prohibits employing children under 14 years in factories, mines, or hazardous occupations, reinforced by the Child and Adolescent Labour (Prohibition and Regulation) Act.'
  },
  {
    id: 'p2_sst_115',
    subject: 'SOCIAL_STUDIES',
    topic: 'Civics – Consumer Protection & Consumer Rights (Jago Grahak Jago)',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each official quality certification mark in India with the category of products on which it is issued:\n1. ISI Mark (BIS) — (P) Agricultural and livestock food products (edible oil, honey, spices, pulses)\n2. AGMARK — (Q) Purity of gold and silver jewellery\n3. BIS Hallmark — (R) Electrical appliances, LPG cylinders, pressure cookers, and industrial goods\n4. FSSAI Logo — (S) Food safety and hygiene license on packaged food items\nSelect the correct match:',
    options: [
      '1-R, 2-P, 3-Q, 4-S',
      '1-P, 2-R, 3-Q, 4-S',
      '1-R, 2-Q, 3-P, 4-S',
      '1-S, 2-P, 3-Q, 4-R'
    ],
    correctAnswer: 0,
    explanation: 'ISI certifies industrial/electrical safety; AGMARK certifies agricultural produce; BIS Hallmark certifies precious metal purity; FSSAI certifies food safety compliance.'
  },
  {
    id: 'p2_sst_116',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Constructivist Lesson Planning (5E in Social Studies)',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'In a constructivist Class 7 lesson on "Markets Around Us", which activity best serves the "Explore" phase before the teacher introduces formal economic terminology?',
    options: [
      'Students compare data they collected from a neighbourhood kirana shop, a weekly open-air haat/bazaar, and an online shopping portal regarding credit, bargaining, packaging, and price',
      'The teacher dictates five pages of definitions from a university economics textbook',
      'Students copy the chapter summary silently for 40 minutes',
      'The teacher announces a surprise summative test on day one'
    ],
    correctAnswer: 0,
    explanation: 'In the Explore phase, learners investigate real comparative data from their immediate environment to construct patterns before formal terminology is introduced.'
  },
  {
    id: 'p2_sst_117',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Avoiding Regional, Caste & Gender Bias in Teaching',
    questionType: 'Classroom-Situation',
    difficulty: 'Moderate',
    question: 'While teaching about diverse livelihoods and regional cultures of India, what must a Social Science teacher consciously avoid?',
    options: [
      'Presenting any single region’s diet, dress, or occupation as the "normal standard" and portraying tribal, rural, or minority communities as "exotic" or "backward" stereotypes',
      'Highlighting the constitutional principle of Unity in Diversity',
      'Inviting students from diverse backgrounds to share their cultural festivals respectfully',
      'Using maps and primary photographs from different states of India'
    ],
    correctAnswer: 0,
    explanation: 'Equitable pedagogy treats linguistic, regional, and cultural diversity with dignity rather than hierarchy or stereotyping.'
  },
  {
    id: 'p2_sst_118',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Diagnostic Assessment vs Summative Grading',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What is the primary purpose of conducting a brief diagnostic pre-assessment before starting a Class 8 unit on "The Indian Judiciary"?',
    options: [
      'To uncover students’ existing understandings and misconceptions about courts, police, and laws so instruction can be tailored to bridge conceptual gaps',
      'To fail weak students before the chapter even begins',
      'To assign final annual promotion ranks in June',
      'To replace teaching with test-taking'
    ],
    correctAnswer: 0,
    explanation: 'Diagnostic assessment maps learners’ prior schemas and alternative conceptions to inform instructional scaffolding.'
  },
  {
    id: 'p2_sst_119',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – Reading Climographs (Bar & Line Graphs)',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'In a standard geographical Climograph plotted for a station like Mumbai or Nagpur, how are monthly rainfall and monthly mean temperature conventionally represented?',
    options: [
      'Monthly rainfall (in mm or cm) is shown by vertical bars, while monthly mean temperature (in °C) is shown by a continuous line graph above the twelve months',
      'Both rainfall and temperature are shown only by pie charts without axes',
      'Temperature is measured in millimetres and rainfall is measured in degrees Celsius',
      'Climographs show only population density over centuries'
    ],
    correctAnswer: 0,
    explanation: 'A climograph combines a bar chart for monthly precipitation with a line graph for monthly mean temperature across the 12 months of the year.'
  },
  {
    id: 'p2_sst_120',
    subject: 'SOCIAL_STUDIES',
    topic: 'Social Science Pedagogy – NEP 2020 Constitutional Values & Global Citizenship',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'According to NEP 2020, how should Constitutional Values (Justice, Liberty, Equality, Fraternity, Fundamental Duties) and Global Citizenship Education (GCED) be integrated into upper-primary Social Science?',
    options: [
      'Through experiential case studies, democratic classroom practices, environmental stewardship projects, and ethical reasoning rather than rote memorization of isolated clauses',
      'By restricting constitutional study only to law-college postgraduates',
      'By replacing Indian history and geography entirely with foreign military history',
      'By testing only the exact page numbers of the Constitution'
    ],
    correctAnswer: 0,
    explanation: 'NEP 2020 emphasizes experiential internalization of Constitutional Values, human rights, sustainable development, and global citizenship.'
  }
];

export const ALL_PAPER2_CURATED_SST_120: CuratedPaper2Mcq[] = [
  ...PAPER2_CURATED_SST_60,
  ...PAPER2_CURATED_SST_SET2_60
];

