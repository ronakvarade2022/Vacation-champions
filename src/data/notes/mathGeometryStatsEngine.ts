import {
  ClassLevel,
  EducationBoard,
  SubjectName,
} from '../../types';
import {
  getExerciseSetPrefix,
  MathBlueprintBuildResult,
  MathTopicBlueprintId,
} from './mathClassifierAndPrimaryEngine';

export function buildGeometryTrigonometryStatsMathBlueprint(params: {
  blueprintId: MathTopicBlueprintId;
  board: EducationBoard;
  classLevel: ClassLevel;
  classNum: number;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
}): MathBlueprintBuildResult | null {
  const { blueprintId, board, classNum, chapterNumber, chapterTitle } = params;
  const ex1 = getExerciseSetPrefix(board, classNum, chapterNumber, 1);
  const ex2 = getExerciseSetPrefix(board, classNum, chapterNumber, 2);
  const ex3 = getExerciseSetPrefix(board, classNum, chapterNumber, 3);
  const ex4 = getExerciseSetPrefix(board, classNum, chapterNumber, 4);

  switch (blueprintId) {
    case 'lines_angles_parallel':
    case 'triangles_congruence':
    case 'quadrilaterals_theorems': {
      const isQuad = blueprintId === 'quadrilaterals_theorems';
      const isTri = blueprintId === 'triangles_congruence';
      return {
        blueprintId,
        topicDisplayName: isQuad
          ? `${chapterTitle} — Angle Sum 360°, Parallelogram, Rhombus, Trapezium & Midpoint Theorem`
          : isTri
          ? `${chapterTitle} — Angle Sum 180°, Remote Interior Angles, SAS/ASA/SSS/RHS Congruence & Midpoint Properties`
          : `${chapterTitle} — Complementary/Supplementary Pairs, Parallel Lines & Transversal Theorems`,
        detailedExplanation: isQuad
          ? [
              `In "${chapterTitle}", the sum of the four interior angles of any quadrilateral is 360°. In a Parallelogram, opposite sides are equal and parallel, opposite angles are equal, adjacent angles are supplementary (180°), and diagonals bisect each other.`,
              `In a Rectangle, diagonals are congruent. In a Rhombus, diagonals are perpendicular bisectors of each other. By the Triangle Midpoint Theorem, the segment joining the midpoints of any two sides of a triangle is parallel to the third side and equals half of its length.`,
            ]
          : isTri
          ? [
              `In "${chapterTitle}", the sum of the three interior angles of a triangle is 180°, and the measure of an exterior angle of a triangle equals the sum of its two remote interior angles.`,
              `Two triangles are congruent (≅) if they satisfy SAS, ASA, AAS, SSS, or RHS (Hypotenuse–Side) congruence criteria. By the Isosceles Triangle Theorem, angles opposite to equal sides are equal.`,
            ]
          : [
              `In "${chapterTitle}", two angles are Complementary if their sum is 90° and Supplementary if their sum is 180°. Vertically opposite angles formed by two intersecting lines are always equal.`,
              `When a transversal intersects two parallel lines: (1) Corresponding angles are equal, (2) Alternate interior and alternate exterior angles are equal, and (3) Interior angles on the same side of the transversal are supplementary (sum = 180°).`,
            ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Fundamental Angle & Side Theorems`,
            explanation: isQuad
              ? `In parallelogram ABCD, AB = DC, AD = BC, ∠A = ∠C, ∠B = ∠D, and ∠A + ∠B = 180°. For a Trapezium with parallel sides AB || DC, median joining midpoints of non-parallel sides = (1/2)(AB + DC).`
              : isTri
              ? `In ΔABC, ∠A + ∠B + ∠C = 180°. If side BC is extended to D, Exterior ∠ACD = ∠A + ∠B. In a 30°–60°–90° triangle, side opposite to 30° = (1/2) × Hypotenuse, and side opposite to 60° = (√3/2) × Hypotenuse.`
              : `For point B between A and C (A–B–C), d(A, C) = d(A, B) + d(B, C). For parallel lines l || m cut by transversal n, Co-interior angles sum to 180°.`,
            keyTakeaway: isQuad
              ? `Adjacent angles of a parallelogram always add up to 180°.`
              : isTri
              ? `Sum of any two sides of a triangle is always strictly greater than the third side (Triangle Inequality).`
              : `Complementary sum = 90°; Supplementary sum = 180°; Linear pair sum = 180°.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Step-by-Step Geometric Proofs & Numerical Applications`,
            explanation: `Write every geometric proof in the standard textbook format: Given → To Prove / To Find → Construction (if any) → Proof with numbered statements and reasons in brackets.`,
            keyTakeaway: `Corresponding parts of congruent triangles are congruent (c.p.c.t. / c.s.c.t. / c.a.c.t.).`,
          },
        ],
        keyPoints: [
          'Complementary Angles: α + β = 90°;  Supplementary / Linear Pair Angles: α + β = 180°.',
          'Parallel Lines & Transversal: Corresponding angles equal; Alternate interior angles equal; Co-interior angles sum to 180°.',
          'Triangle Properties: ∠A + ∠B + ∠C = 180°; Exterior Angle = Sum of two remote interior angles; Centroid divides median in ratio 2 : 1.',
          'Quadrilateral & Midpoint Theorem: Sum of angles = 360°; Midpoint segment EF || BC and EF = (1/2) BC.',
        ],
        keyDefinitions: [
          { term: 'Complementary & Supplementary Angles', meaning: 'Two angles whose sum is 90° are complementary; two angles whose sum is 180° are supplementary.' },
          { term: 'Congruence of Triangles (≅)', meaning: 'Two triangles having identical shape and size, proven by SAS, ASA, AAS, SSS, or RHS tests.' },
          { term: 'Midpoint Theorem', meaning: 'The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.' },
        ],
        formulasAndRules: [
          'Complement of x° = (90 − x)°;  Supplement of x° = (180 − x)°.',
          'Triangle Angle Sum: ∠A + ∠B + ∠C = 180°;  Exterior ∠ACD = ∠A + ∠B.',
          'Quadrilateral Angle Sum: ∠A + ∠B + ∠C + ∠D = 360°;  Diagonals of Rhombus: Side² = (d₁/2)² + (d₂/2)².',
        ],
        solvedExamples: [
          {
            prompt: 'The measures of angles of a triangle are in the ratio 5 : 6 : 7. Find the measure of each angle.',
            solution: `Step 1: Let the measures of the angles be 5x°, 6x°, and 7x°.\nStep 2: By Angle Sum Property of a triangle: 5x + 6x + 7x = 180° ⇒ 18x = 180° ⇒ x = 10°.\nStep 3: The three angles are 5(10°) = 50°, 6(10°) = 60°, and 7(10°) = 70° (Check: 50° + 60° + 70° = 180°).`,
          },
          {
            prompt: 'Adjacent angles of a parallelogram are (3x − 4)° and (3x + 16)°. Find the measures of all four angles of the parallelogram.',
            solution: `Step 1: Adjacent angles of a parallelogram are supplementary: (3x − 4) + (3x + 16) = 180°.\nStep 2: 6x + 12 = 180° ⇒ 6x = 168° ⇒ x = 28°.\nStep 3: First angle = 3(28) − 4 = 80°; Second angle = 3(28) + 16 = 100°.\nStep 4: Since opposite angles are equal, the four angles are 80°, 100°, 80°, and 100°.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Lines, Angles, Complements, Supplements & Parallel Transversals',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Complementary (90°), Supplementary (180°) & Co-interior Transversal Theorems',
            formulaExplained: 'Co-interior angles between parallel lines satisfy ∠1 + ∠2 = 180°.',
            question: `Solve the following angle problems:\n(i) Find the complement and supplement of an angle of 55°.\n(ii) Two supplementary angles differ by 34°. Find the angles.\n(iii) If two parallel lines are intersected by a transversal and one interior angle is 72°, find its co-interior angle and alternate interior angle.\n(iv) On a number line, coord(A) = −5 and coord(B) = 7. Find d(A, B).`,
            answer: `(i) Complement = 35°; Supplement = 125°\n(ii) 107° and 73°\n(iii) Co-interior angle = 108°; Alternate interior angle = 72°\n(iv) d(A, B) = 12 units`,
            stepByStepExplanation: `(i) 90° − 55° = 35°; 180° − 55° = 125°.\n(ii) x + y = 180° and x − y = 34° ⇒ 2x = 214° ⇒ x = 107°, y = 73°.\n(iii) Co-interior angle = 180° − 72° = 108°; Alternate interior angle = 72°.\n(iv) d(A, B) = 7 − (−5) = 12.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Triangles: Exterior Angle, 30°–60°–90° Theorem & Median/Centroid',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Remote Interior Angle Theorem, 30°–60°–90° Property & Centroid 2:1 Ratio',
            formulaExplained: 'Exterior ∠ACD = ∠A + ∠B; Side opposite 30° = Hypotenuse / 2; AG : GD = 2 : 1.',
            question: `Solve for ΔABC:\n(i) In ΔABC, ∠A = 65° and ∠B = 45°. Find the measure of exterior ∠ACD.\n(ii) In right-angled ΔPQR, ∠Q = 90°, ∠R = 30°, and hypotenuse PR = 14 cm. Find PQ and QR.\n(iii) Point G is the centroid of ΔABC and median AD = 12 cm. Find the lengths of AG and GD.`,
            answer: `(i) Exterior ∠ACD = 110°\n(ii) PQ = 7 cm; QR = 7√3 cm\n(iii) AG = 8 cm; GD = 4 cm`,
            stepByStepExplanation: `(i) By Remote Interior Angle Theorem, ∠ACD = ∠A + ∠B = 65° + 45° = 110°.\n(ii) Side opposite 30° is PQ = (1/2) × 14 = 7 cm; Side opposite 60° is QR = (√3/2) × 14 = 7√3 cm.\n(iii) Centroid divides median in 2:1 ratio ⇒ AG = (2/3) × 12 = 8 cm and GD = (1/3) × 12 = 4 cm.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Quadrilaterals, Rhombus Diagonals & Triangle Midpoint Theorem',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Quadrilateral Angle Sum (360°), Rhombus Right-Triangle Property & Midpoint Theorem',
            formulaExplained: 'In a Rhombus, Side² = (d₁/2)² + (d₂/2)²; Midpoint segment EF = (1/2)BC.',
            question: `Solve the following:\n(i) The angles of a quadrilateral are in the ratio 1 : 2 : 3 : 4. Find all four angles.\n(ii) The lengths of the diagonals of a rhombus are 16 cm and 12 cm. Find the length of each side and the perimeter of the rhombus.\n(iii) In ΔABC, points E and F are the midpoints of sides AB and AC respectively. If BC = 11.6 cm, find EF.`,
            answer: `(i) 36°, 72°, 108°, and 144°\n(ii) Side = 10 cm; Perimeter = 40 cm\n(iii) EF = 5.8 cm`,
            stepByStepExplanation: `(i) x + 2x + 3x + 4x = 360° ⇒ 10x = 360° ⇒ x = 36° ⇒ Angles are 36°, 72°, 108°, 144°.\n(ii) Half-diagonals are 8 cm and 6 cm. Since diagonals bisect at 90°, Side = √(8² + 6²) = √100 = 10 cm; Perimeter = 4 × 10 = 40 cm.\n(iii) By Midpoint Theorem, EF = (1/2) × BC = (1/2) × 11.6 = 5.8 cm.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'similarity_bpt':
    case 'pythagoras_theorem': {
      const isPyth = blueprintId === 'pythagoras_theorem';
      return {
        blueprintId,
        topicDisplayName: isPyth
          ? `${chapterTitle} — Pythagorean Triplets, Geometric Mean & Apollonius Theorem`
          : `${chapterTitle} — Ratio of Areas, Basic Proportionality Theorem (BPT) & Similar Triangles`,
        detailedExplanation: isPyth
          ? [
              `In "${chapterTitle}", Pythagoras Theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the remaining two perpendicular sides: AC² = AB² + BC².`,
              `If altitude BD is drawn to the hypotenuse AC of right-angled ΔABC, then by the Theorem of Geometric Mean: BD² = AD × DC.`,
              `By Apollonius Theorem, if M is the midpoint of side BC in ΔABC, then AB² + AC² = 2AM² + 2BM².`,
            ]
          : [
              `In "${chapterTitle}", the ratio of the areas of two triangles equals the ratio of the products of their bases and corresponding heights: A(Δ₁)/A(Δ₂) = (b₁ × h₁)/(b₂ × h₂).`,
              `By the Basic Proportionality Theorem (Thales’ Theorem), if a line parallel to one side of a triangle intersects the other two sides in distinct points D and E, then AD/DB = AE/EC.`,
              `By the Theorem of Areas of Similar Triangles, if ΔABC ~ ΔPQR, then A(ΔABC)/A(ΔPQR) = AB²/PQ² = BC²/QR² = AC²/PR².`,
            ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Core Theorem Statement & Formula Derivation`,
            explanation: isPyth
              ? `In right ΔABC (∠B = 90°), AC² = AB² + BC². A triplet of natural numbers (a, b, c) is a Pythagorean Triplet if the square of the largest number equals the sum of squares of the other two (e.g., 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25).`
              : `If h₁ = h₂ (equal heights), A(Δ₁)/A(Δ₂) = b₁/b₂. If b₁ = b₂ (equal bases), A(Δ₁)/A(Δ₂) = h₁/h₂. By Angle Bisector Theorem, if ray BD bisects ∠ABC, then AB/BC = AD/DC.`,
            keyTakeaway: isPyth
              ? `Always identify the side opposite to the 90° angle as the Hypotenuse before writing Pythagoras Theorem.`
              : `For similar triangles, Ratio of Perimeters = Ratio of Sides (AB/PQ), whereas Ratio of Areas = Ratio of Squares of Sides (AB²/PQ²).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Geometric Mean, Apollonius & Similarity Tests (AA, SAS, SSS)`,
            explanation: isPyth
              ? `Geometric Mean Theorem: BD² = AD × DC. Apollonius Theorem connects the three sides of any triangle to the length of its median AM: AB² + AC² = 2AM² + 2BM².`
              : `Two triangles are similar by AA (Angle-Angle), SAS (Side-Angle-Side proportional), or SSS (three sides proportional) tests.`,
            keyTakeaway: `Write similar triangle vertices in exact one-to-one correspondence (e.g., ΔABC ~ ΔPQR).`,
          },
        ],
        keyPoints: isPyth
          ? [
              'Pythagoras Theorem: Hypotenuse² = Side₁² + Side₂² (AC² = AB² + BC²).',
              'Geometric Mean Theorem (Altitude on Hypotenuse): BD² = AD × DC.',
              'Diagonal of Square of side a = a√2; Height of Equilateral Triangle of side a = (√3/2)a.',
              'Apollonius Theorem (Median AM to side BC): AB² + AC² = 2AM² + 2BM².',
            ]
          : [
              'Area Ratio of Two Triangles: A(Δ₁)/A(Δ₂) = (b₁ × h₁) / (b₂ × h₂).',
              'Basic Proportionality Theorem (BPT): If DE || BC in ΔABC, then AD / DB = AE / EC.',
              'Angle Bisector Theorem: If BD bisects ∠B of ΔABC, then AB / BC = AD / DC.',
              'Areas of Similar Triangles: If ΔABC ~ ΔPQR, then A(ΔABC) / A(ΔPQR) = AB² / PQ².',
            ],
        keyDefinitions: [
          {
            term: isPyth ? 'Pythagorean Triplet' : 'Basic Proportionality Theorem (BPT)',
            meaning: isPyth
              ? 'A set of three positive integers (a, b, c) satisfying c² = a² + b².'
              : 'A line parallel to a side of a triangle divides the remaining two sides in the same ratio (AD/DB = AE/EC).',
          },
          {
            term: isPyth ? 'Geometric Mean Theorem' : 'Similar Triangles (~)',
            meaning: isPyth
              ? 'In a right triangle, the altitude to the hypotenuse is the geometric mean of the two segments of the hypotenuse (BD² = AD × DC).'
              : 'Triangles whose corresponding angles are congruent and corresponding sides are in proportion.',
          },
        ],
        formulasAndRules: isPyth
          ? [
              'AC² = AB² + BC².',
              'Geometric Mean: BD² = AD × DC.',
              'Apollonius Theorem: AB² + AC² = 2AM² + 2BM².',
            ]
          : [
              'A(Δ₁) / A(Δ₂) = (b₁ × h₁) / (b₂ × h₂).',
              'BPT: AD / DB = AE / EC;  Angle Bisector: AB / BC = AD / DC.',
              'Similar Triangle Areas: A(ΔABC) / A(ΔPQR) = AB² / PQ² = BC² / QR².',
            ],
        solvedExamples: [
          {
            prompt: isPyth
              ? 'In ΔPQR, ∠PQR = 90°, seg QS ⊥ hypotenuse PR, PS = 9 cm, and SR = 16 cm. Find QS.'
              : 'In ΔABC, line DE || side BC. If AD = 5 cm, DB = 3 cm, and AE = 7.5 cm, find EC.',
            solution: isPyth
              ? `Step 1: In right-angled ΔPQR, seg QS ⊥ hypotenuse PR.\nStep 2: By the Theorem of Geometric Mean: QS² = PS × SR.\nStep 3: QS² = 9 × 16 = 144 ⇒ QS = √144 = 12 cm.`
              : `Step 1: In ΔABC, line DE || side BC.\nStep 2: By Basic Proportionality Theorem (BPT): AD / DB = AE / EC.\nStep 3: 5 / 3 = 7.5 / EC ⇒ EC = (7.5 × 3) / 5 = 1.5 × 3 = 4.5 cm.`,
          },
          {
            prompt: isPyth
              ? 'In ΔABC, point M is the midpoint of side BC. If AB² + AC² = 290 cm² and AM = 8 cm, find BC.'
              : 'If ΔABC ~ ΔPQR, A(ΔABC) = 16 cm², A(ΔPQR) = 25 cm², and AB = 8 cm, find PQ.',
            solution: isPyth
              ? `Step 1: By Apollonius Theorem: AB² + AC² = 2AM² + 2BM².\nStep 2: 290 = 2(8²) + 2BM² ⇒ 290 = 128 + 2BM² ⇒ 2BM² = 162 ⇒ BM² = 81 ⇒ BM = 9 cm.\nStep 3: Since M is the midpoint of BC, BC = 2 × BM = 2 × 9 = 18 cm.`
              : `Step 1: By Theorem of Areas of Similar Triangles: A(ΔABC) / A(ΔPQR) = AB² / PQ².\nStep 2: 16 / 25 = 8² / PQ² ⇒ Taking square roots on both sides: 4 / 5 = 8 / PQ.\nStep 3: PQ = (8 × 5) / 4 = 10 cm.`,
          },
        ],
        exerciseQuestions: isPyth
          ? [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Pythagorean Triplets, Right Triangle Sides & Square Diagonal',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Pythagoras Theorem (c² = a² + b²) and Diagonal of a Square/Rectangle',
                formulaExplained: 'Diagonal of rectangle = √(l² + b²); Diagonal of square = side × √2.',
                question: `Solve the following:\n(i) Check whether (11, 60, 61) is a Pythagorean triplet.\n(ii) Find the diagonal of a rectangle whose length is 35 cm and breadth is 12 cm.\n(iii) Find the side and perimeter of a square whose diagonal is 10√2 cm.\n(iv) Find the height of an equilateral triangle having side 12 cm.`,
                answer: `(i) Yes, 61² = 3,721 = 11² + 60² (121 + 3,600)\n(ii) Diagonal = 37 cm\n(iii) Side = 10 cm; Perimeter = 40 cm\n(iv) Height = 6√3 cm`,
                stepByStepExplanation: `(i) 61² = 3721; 11² + 60² = 121 + 3600 = 3721 (Verified).\n(ii) d = √(35² + 12²) = √(1225 + 144) = √1369 = 37 cm.\n(iii) Diagonal = a√2 = 10√2 ⇒ a = 10 cm, Perimeter = 40 cm.\n(iv) h = (√3/2) × 12 = 6√3 cm.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iii)',
                typeLabel: 'Theorem of Geometric Mean & Apollonius Theorem',
                marks: 4,
                subQuestionsCount: 3,
                conceptUsed: 'Altitude to Hypotenuse (BD² = AD × DC) & Median Relation',
                formulaExplained: 'BD² = AD × DC;  AB² + AC² = 2AM² + 2BM².',
                question: `Solve the following:\n(i) In right ΔMNP, ∠MNP = 90°, seg NQ ⊥ seg MP, MQ = 9, QP = 4. Find NQ.\n(ii) In ΔPQR, point S is the midpoint of side QR. If PQ = 11, PR = 17, PS = 13, find QR.\n(iii) A ladder 10 m long reaches a window 8 m above the ground. Find the distance of the foot of the ladder from the base of the wall.`,
                answer: `(i) NQ = 6 units\n(ii) QS = 6 ⇒ QR = 12 units\n(iii) Distance from base of wall = 6 m`,
                stepByStepExplanation: `(i) By Geometric Mean Theorem: NQ² = MQ × QP = 9 × 4 = 36 ⇒ NQ = 6.\n(ii) By Apollonius Theorem: 11² + 17² = 2(13²) + 2(QS²) ⇒ 121 + 289 = 338 + 2QS² ⇒ 410 − 338 = 2QS² ⇒ QS² = 36 ⇒ QS = 6 ⇒ QR = 2 × 6 = 12.\n(iii) d = √(10² − 8²) = √(100 − 64) = √36 = 6 m.`,
                calculationVerified: true,
              },
            ]
          : [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iii)',
                typeLabel: 'Ratio of Areas of Two Triangles',
                marks: 3,
                subQuestionsCount: 3,
                conceptUsed: 'Area Ratio Property: A(Δ₁)/A(Δ₂) = (b₁ × h₁)/(b₂ × h₂)',
                formulaExplained: 'For equal heights, A₁/A₂ = b₁/b₂; for equal bases, A₁/A₂ = h₁/h₂.',
                question: `Solve the following:\n(i) Base of a triangle is 9 and height is 5. Base of another triangle is 10 and height is 6. Find the ratio of areas of these triangles.\n(ii) Two triangles have equal bases. If their heights are 4 cm and 7 cm, find the ratio of their areas.\n(iii) Two triangles have equal heights and their areas are in the ratio 3 : 5. If the base of the smaller triangle is 6 cm, find the base of the larger triangle.`,
                answer: `(i) 3 : 4 (45 / 60 = 3 / 4)\n(ii) 4 : 7\n(iii) 10 cm`,
                stepByStepExplanation: `(i) A₁/A₂ = (9 × 5)/(10 × 6) = 45/60 = 3/4.\n(ii) Equal bases ⇒ A₁/A₂ = h₁/h₂ = 4/7.\n(iii) 3/5 = 6/b₂ ⇒ b₂ = 30/3 = 10 cm.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iii)',
                typeLabel: 'Basic Proportionality Theorem (BPT), Angle Bisector & Similar Triangle Areas',
                marks: 4,
                subQuestionsCount: 3,
                conceptUsed: 'Thales Theorem (AD/DB = AE/EC) and Area of Similar Triangles (AB²/PQ²)',
                formulaExplained: 'If ΔABC ~ ΔPQR, then A(ΔABC)/A(ΔPQR) = AB²/PQ².',
                question: `Solve the following:\n(i) In ΔPQR, line ST || side QR. If PS = 3, SQ = 6, and PT = 4.5, find TR.\n(ii) In ΔABC, ray BD bisects ∠ABC. If AB = 6, BC = 8, and AD = 3, find DC.\n(iii) Ratio of corresponding sides of two similar triangles is 3 : 5. Find the ratio of their areas.`,
                answer: `(i) TR = 9\n(ii) DC = 4\n(iii) Ratio of areas = 9 : 25`,
                stepByStepExplanation: `(i) By BPT, 3/6 = 4.5/TR ⇒ TR = 9.\n(ii) By Angle Bisector Property, AB/BC = AD/DC ⇒ 6/8 = 3/DC ⇒ DC = 24/6 = 4.\n(iii) A₁/A₂ = 3²/5² = 9/25.`,
                calculationVerified: true,
              },
            ],
      };
    }

    case 'circles_chords_tangents':
    case 'geometric_constructions': {
      const isConst = blueprintId === 'geometric_constructions';
      return {
        blueprintId,
        topicDisplayName: isConst
          ? `${chapterTitle} — Triangle Constructions, Similar Triangles & Tangents to a Circle`
          : `${chapterTitle} — Chord Properties, Tangent Theorem, Inscribed Angle & Cyclic Quadrilaterals`,
        detailedExplanation: [
          `In "${chapterTitle}", a perpendicular drawn from the centre of a circle to a chord bisects the chord (so r² = d² + (L/2)²). A tangent at any point of a circle is perpendicular to the radius through the point of contact (∠OPT = 90°).`,
          `Tangent Segment Theorem: Tangent segments drawn from an external point to a circle are congruent (PA = PB). Inscribed Angle Theorem: The measure of an inscribed angle is half the measure of its intercepted arc.`,
          `Cyclic Quadrilateral Theorem: Opposite angles of a cyclic quadrilateral are supplementary (∠A + ∠C = 180° and ∠B + ∠D = 180°). Tangent–Secant Segment Theorem: PT² = PA × PB.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Chord Bisector, Tangent–Radius & Touching Circles`,
            explanation: `If two circles with radii r₁ and r₂ touch externally, the distance between their centres is r₁ + r₂. If they touch internally, the distance between their centres is |r₁ − r₂|.`,
            keyTakeaway: `Distance between centres: External contact = r₁ + r₂; Internal contact = |r₁ − r₂|.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Inscribed Angle, Cyclic Quadrilateral & Tangent–Secant Theorems`,
            explanation: `An angle inscribed in a semicircle is a right angle (90°). For any cyclic quadrilateral, opposite angles sum to 180°, and an exterior angle equals the interior opposite angle. For tangent PT and secant PAB, PT² = PA × PB.`,
            keyTakeaway: `Always draw the radius to the point of contact to form a 90° angle with the tangent.`,
          },
        ],
        keyPoints: [
          'Chord Property: Perpendicular from centre to chord bisects the chord; Radius² = Distance² + (Half-Chord)².',
          'Tangent Theorems: Tangent ⊥ Radius at point of contact; Tangent segments from an external point are equal (PA = PB).',
          'Touching Circles: Distance between centres = r₁ + r₂ (externally) or |r₁ − r₂| (internally).',
          'Cyclic Quadrilateral & Tangent–Secant: Opposite angles sum to 180°;  PT² = PA × PB.',
        ],
        keyDefinitions: [
          { term: 'Secant & Tangent', meaning: 'A line intersecting a circle in two distinct points is a Secant; a line touching a circle at exactly one point is a Tangent.' },
          { term: 'Cyclic Quadrilateral', meaning: 'A quadrilateral all four of whose vertices lie on the circumference of the same circle.' },
        ],
        formulasAndRules: [
          'Chord Right Triangle: r² = d² + (c / 2)².',
          'Touching Circles Distance: d = r₁ + r₂ (External);  d = |r₁ − r₂| (Internal).',
          'Inscribed Angle = (1/2) × m(Intercepted Arc);  Tangent–Secant: PT² = PA × PB.',
        ],
        solvedExamples: [
          {
            prompt: 'The radius of a circle is 10 cm and the distance of a chord from the centre is 6 cm. Find the length of the chord.',
            solution: `Step 1: Let O be the centre, AB be the chord, and OM ⊥ AB (so OM = 6 cm, OA = 10 cm).\nStep 2: In right ΔOMA: AM² = OA² − OM² = 10² − 6² = 100 − 36 = 64 ⇒ AM = 8 cm.\nStep 3: Since perpendicular from centre bisects the chord, Length of chord AB = 2 × AM = 2 × 8 = 16 cm.`,
          },
          {
            prompt: 'A tangent segment PT from external point P to a circle of radius 5 cm has length 12 cm. Find the distance of point P from the centre O of the circle.',
            solution: `Step 1: By Tangent Theorem, ∠OTP = 90° (Radius OT = 5 cm, Tangent PT = 12 cm).\nStep 2: By Pythagoras Theorem in ΔOTP: OP² = OT² + PT² = 5² + 12² = 25 + 144 = 169.\nStep 3: OP = √169 = 13 cm.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Chord Length, Tangent Segment & Touching Circles',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Perpendicular Chord Bisector, Tangent ⊥ Radius & Theorem of Touching Circles',
            formulaExplained: 'r² = d² + (AB/2)²;  OP² = r² + PT²;  d = r₁ ± r₂.',
            question: `Solve the following circle problems:\n(i) Radius of a circle is 13 cm and length of a chord is 24 cm. Find the distance of the chord from the centre.\n(ii) Two circles of radii 5.5 cm and 4.2 cm touch each other externally. Find the distance between their centres.\n(iii) If the same two circles touch internally, find the distance between their centres.\n(iv) From an external point P at distance 25 cm from centre O of a circle of radius 7 cm, find the length of the tangent segment PT.`,
            answer: `(i) Distance from centre = 5 cm\n(ii) External touch distance = 9.7 cm\n(iii) Internal touch distance = 1.3 cm\n(iv) Length of tangent PT = 24 cm`,
            stepByStepExplanation: `(i) Half-chord = 12 cm ⇒ d = √(13² − 12²) = √(169 − 144) = 5 cm.\n(ii) 5.5 + 4.2 = 9.7 cm.\n(iii) 5.5 − 4.2 = 1.3 cm.\n(iv) PT = √(25² − 7²) = √(625 − 49) = √576 = 24 cm.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Inscribed Angle, Cyclic Quadrilateral & Tangent–Secant Theorem',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Inscribed Angle = (1/2) Arc, Cyclic Opposite Angles = 180°, PT² = PA × PB',
            formulaExplained: '∠A + ∠C = 180° in cyclic □ABCD;  PT² = PA × PB.',
            question: `Solve the following:\n(i) In cyclic quadrilateral ABCD, ∠A = (2x + 4)° and ∠C = (3x + 6)°. Find x and the measures of ∠A and ∠C.\n(ii) An inscribed angle ∠ABC intercepts arc AXC of measure 110°. Find m∠ABC.\n(iii) A secant through P intersects a circle at A and B, and PT is a tangent segment. If PA = 4 cm and AB = 5 cm, find PT.`,
            answer: `(i) x = 34° ⇒ ∠A = 72° and ∠C = 108°\n(ii) m∠ABC = 55°\n(iii) PT = 6 cm`,
            stepByStepExplanation: `(i) Opposite angles of cyclic quadrilateral are supplementary: (2x + 4) + (3x + 6) = 180° ⇒ 5x + 10 = 180° ⇒ x = 34° ⇒ ∠A = 72°, ∠C = 108°.\n(ii) m∠ABC = (1/2) × 110° = 55°.\n(iii) Here PA = 4 cm and PB = PA + AB = 4 + 5 = 9 cm. By Tangent–Secant Theorem, PT² = PA × PB = 4 × 9 = 36 ⇒ PT = 6 cm.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Geometric Construction Steps & Analytical Verification',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Similar Triangle Scale Factor Construction and Exterior-Point Tangent Construction',
            formulaExplained: 'If ΔABC ~ ΔLMN with scale ratio m/n, each side of ΔLMN = (n/m) × corresponding side of ΔABC.',
            question: `Solve and write the complete construction calculation & steps:\n(i) ΔABC ~ ΔLMN such that AB = 5.5 cm, BC = 6 cm, CA = 4.5 cm, and BC / MN = 5 / 4. Calculate the exact lengths of LM, MN, and NL required to construct ΔLMN.\n(ii) Write the step-by-step geometric construction to draw tangents to a circle of radius 3.5 cm from a point P at a distance of 7.5 cm from its centre O, and compute the theoretical length of each tangent segment.`,
            answer: `(i) LM = 4.4 cm, MN = 4.8 cm, NL = 3.6 cm\n(ii) Construct perpendicular bisector of OP (midpoint M), draw circle with radius OM intersecting given circle at A and B, join PA and PB. Theoretical length = √(7.5² − 3.5²) = √44 ≈ 6.63 cm`,
            stepByStepExplanation: `(i) Since ΔABC ~ ΔLMN, AB/LM = BC/MN = CA/NL = 5/4.\n    • LM = 5.5 × (4/5) = 4.4 cm\n    • MN = 6 × (4/5) = 4.8 cm\n    • NL = 4.5 × (4/5) = 3.6 cm.\n(ii) Angle in semicircle ∠OAP = 90°, so PA ⊥ radius OA, confirming PA and PB are the required tangents.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'perimeter_area_heron':
    case 'surface_area_volume_mensuration': {
      const is3D = blueprintId === 'surface_area_volume_mensuration';
      return {
        blueprintId,
        topicDisplayName: is3D
          ? `${chapterTitle} — Cuboid, Cube, Cylinder, Cone, Sphere, Hemisphere & Frustum`
          : `${chapterTitle} — Plane Figures, Heron’s Formula, Circle Sector & Segment Area`,
        detailedExplanation: is3D
          ? [
              `In "${chapterTitle}", students compute Curved/Lateral Surface Area (CSA/LSA), Total Surface Area (TSA), and Volume (V) of 3D solids: Cuboid, Cube, Right Circular Cylinder, Right Circular Cone, Sphere, Hemisphere, and Frustum of a Cone.`,
              `For a Cylinder: CSA = 2πrh, TSA = 2πr(r + h), V = πr²h. For a Cone: Slant height l = √(r² + h²), CSA = πrl, TSA = πr(r + l), V = (1/3)πr²h.`,
              `For a Sphere: Surface Area = 4πr², Volume = (4/3)πr³. When a solid is melted and recast into another solid, the total Volume remains conserved (V₁ = V₂).`,
            ]
          : [
              `In "${chapterTitle}", students compute the Perimeter and Area of plane figures (Rectangle, Square, Triangle, Parallelogram, Rhombus, Trapezium, and Circle).`,
              `Heron’s Formula gives the area of any triangle with sides a, b, c: Semi-perimeter s = (a + b + c)/2, and Area = √[s(s − a)(s − b)(s − c)].`,
              `For a circle of radius r and central angle θ: Length of Arc l = (θ / 360°) × 2πr, and Area of Sector A = (θ / 360°) × πr² = (1/2) × l × r.`,
            ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Standard Mensuration Formulas & Slant Height Relation`,
            explanation: is3D
              ? `Cuboid: LSA = 2h(l + b), TSA = 2(lb + bh + hl), V = lbh. Cube: LSA = 4a², TSA = 6a², V = a³. Cone slant height: l² = r² + h².`
              : `Rectangle: P = 2(l + b), A = l × b. Rhombus: A = (1/2) × d₁ × d₂. Trapezium: A = (1/2) × (sum of parallel sides) × height. Circle: C = 2πr, A = πr².`,
            keyTakeaway: `Use π = 22/7 when radius or height is a multiple of 7; otherwise use π = 3.14 as specified.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Conservation of Volume, Sectors & Frustum Applications`,
            explanation: is3D
              ? `When a large sphere or cylinder of volume V₁ is melted into N identical smaller cones/spheres of volume V₂ each, N = V₁ / V₂.`
              : `Using Heron’s Formula: first compute s = (a+b+c)/2, then compute (s−a), (s−b), (s−c), and take the square root of s(s−a)(s−b)(s−c).`,
            keyTakeaway: `Express every Area in square units (cm², m²) and every Volume in cubic units (cm³, m³; 1 m³ = 1,000 Litres).`,
          },
        ],
        keyPoints: [
          '2D Plane Areas: Triangle = (1/2)bh; Equilateral Triangle = (√3/4)a²; Rhombus = (1/2)d₁d₂; Trapezium = (1/2)(a+b)h.',
          'Heron’s Formula: s = (a + b + c)/2;  Area = √[s(s − a)(s − b)(s − c)].',
          'Circle & Sector: Area = πr²; Arc Length l = (θ/360°)×2πr; Sector Area = (θ/360°)×πr² = (1/2)×l×r.',
          '3D Solids: Cylinder V = πr²h; Cone V = (1/3)πr²h, CSA = πrl; Sphere SA = 4πr², V = (4/3)πr³.',
        ],
        keyDefinitions: [
          { term: 'Lateral / Curved Surface Area (CSA)', meaning: 'The area of all side/curved surfaces of a 3D solid excluding its top and bottom bases.' },
          { term: 'Total Surface Area (TSA)', meaning: 'The sum of the curved/lateral surface area and the areas of the top and bottom bases.' },
          { term: 'Volume (Capacity)', meaning: 'The measure of 3D space occupied by a solid, measured in cubic units (1000 cm³ = 1 Litre).' },
        ],
        formulasAndRules: [
          'Cuboid: TSA = 2(lb + bh + hl), V = lbh;  Cube: TSA = 6a², V = a³.',
          'Cylinder: CSA = 2πrh, TSA = 2πr(r + h), V = πr²h;  Cone: l = √(r² + h²), CSA = πrl, V = (1/3)πr²h.',
          'Sphere: SA = 4πr², V = (4/3)πr³;  Heron’s Formula: A = √[s(s−a)(s−b)(s−c)];  Sector Area = (θ/360°)πr².',
        ],
        solvedExamples: [
          {
            prompt: 'Find the Curved Surface Area, Total Surface Area, and Volume of a right circular cylinder of radius r = 7 cm and height h = 10 cm (Take π = 22/7).',
            solution: `Step 1: CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm².\nStep 2: TSA = 2πr(r + h) = 2 × (22/7) × 7 × (7 + 10) = 44 × 17 = 748 cm².\nStep 3: Volume V = πr²h = (22/7) × 7 × 7 × 10 = 1,540 cm³.`,
          },
          {
            prompt: 'Find the area of a triangle whose sides are 13 cm, 14 cm, and 15 cm using Heron’s Formula.',
            solution: `Step 1: Semi-perimeter s = (13 + 14 + 15) / 2 = 42 / 2 = 21 cm.\nStep 2: s − a = 21 − 13 = 8;  s − b = 21 − 14 = 7;  s − c = 21 − 15 = 6.\nStep 3: Area = √[21 × 8 × 7 × 6] = √[(7 × 3) × (4 × 2) × 7 × (3 × 2)] = 7 × 3 × 2 × 2 = 84 cm².`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Perimeter, Plane Area, Heron’s Formula & Circle Sectors',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: '2D Mensuration, Heron’s Formula & Sector Arc/Area Relations',
            formulaExplained: 'Rhombus A = (1/2)d₁d₂; Trapezium A = (1/2)(a+b)h; Sector A = (θ/360°)πr².',
            question: `Solve the following (Take π = 22/7):\n(i) Find the area of a rhombus whose diagonals are 18 cm and 12 cm.\n(ii) Parallel sides of a trapezium are 15 cm and 25 cm, and the distance between them is 9 cm. Find its area.\n(iii) Find the area of a triangle with sides 5 cm, 12 cm, and 13 cm using Heron’s formula.\n(iv) Radius of a circle is 21 cm and central angle of a sector is 60°. Find the length of the arc and area of the sector.`,
            answer: `(i) 108 cm²\n(ii) 180 cm²\n(iii) s = 15 cm ⇒ Area = 30 cm²\n(iv) Length of arc = 22 cm; Area of sector = 231 cm²`,
            stepByStepExplanation: `(i) A = (1/2) × 18 × 12 = 108 cm².\n(ii) A = (1/2) × (15 + 25) × 9 = 20 × 9 = 180 cm².\n(iii) s = 30/2 = 15 ⇒ A = √[15 × 10 × 3 × 2] = √900 = 30 cm².\n(iv) l = (60/360) × 2 × (22/7) × 21 = 22 cm; Sector Area = (1/2) × l × r = (1/2) × 22 × 21 = 231 cm².`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Cuboid, Cube, Cylinder, Cone & Sphere Surface Area and Volume',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: '3D Solid Surface Area and Volume Formulas',
            formulaExplained: 'Cone: l = √(r² + h²), CSA = πrl, V = (1/3)πr²h; Sphere: SA = 4πr², V = (4/3)πr³.',
            question: `Solve step-by-step (Take π = 22/7):\n(i) Find the Total Surface Area and Volume of a cuboid of length 12 cm, breadth 10 cm, and height 8 cm.\n(ii) The radius of the base of a right circular cone is 7 cm and its perpendicular height is 24 cm. Find its slant height, curved surface area, and volume.\n(iii) Find the surface area and volume of a sphere of radius 7 cm.`,
            answer: `(i) TSA = 592 cm²; Volume = 960 cm³\n(ii) Slant height l = 25 cm; CSA = 550 cm²; Volume = 1,232 cm³\n(iii) Surface Area = 616 cm²; Volume = 4312/3 ≈ 1,437.33 cm³`,
            stepByStepExplanation: `(i) TSA = 2(120 + 80 + 96) = 592 cm²; V = 12 × 10 × 8 = 960 cm³.\n(ii) l = √(7² + 24²) = √625 = 25 cm; CSA = (22/7) × 7 × 25 = 550 cm²; V = (1/3) × (22/7) × 49 × 24 = 22 × 7 × 8 = 1,232 cm³.\n(iii) SA = 4 × (22/7) × 49 = 616 cm²; V = (4/3) × (22/7) × 343 = 4312/3 ≈ 1,437.33 cm³.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Melting & Recasting Solids and Frustum Word Problems',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Conservation of Volume (N = V_large / V_small)',
            formulaExplained: 'Volume of Frustum = (1/3)πh(r₁² + r₂² + r₁r₂).',
            question: `Solve the word problems step-by-step:\n(i) How many solid lead spherical shots each of radius 2 cm can be made by melting a solid metallic sphere of radius 8 cm?\n(ii) The radii of the circular ends of a frustum-shaped bucket are 14 cm and 7 cm, and its height is 30 cm. Find the capacity of the bucket in litres (1,000 cm³ = 1 Litre).`,
            answer: `(i) 64 spherical shots\n(ii) Volume = 10,780 cm³ = 10.78 Litres`,
            stepByStepExplanation: `(i) N = V_large / V_small = [(4/3)π(8³)] / [(4/3)π(2³)] = (8/2)³ = 4³ = 64 shots.\n(ii) V = (1/3) × (22/7) × 30 × (14² + 7² + 14×7) = (220/7) × (196 + 49 + 98) = (220/7) × 343 = 220 × 49 = 10,780 cm³ = 10.78 Litres.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'coordinate_geometry': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Distance Formula, Section Formula, Midpoint, Centroid & Slope of a Line`,
        detailedExplanation: [
          `In "${chapterTitle}", every point P in the Cartesian plane is represented by an ordered pair (x, y), where x is the abscissa and y is the ordinate. The distance between two points A(x₁, y₁) and B(x₂, y₂) is given by the Distance Formula: d(A, B) = √[(x₂ − x₁)² + (y₂ − y₁)²].`,
          `By the Section Formula, the coordinates of point P(x, y) dividing segment AB internally in the ratio m : n are: x = (mx₂ + nx₁)/(m + n) and y = (my₂ + ny₁)/(m + n).`,
          `The Midpoint of AB is ((x₁ + x₂)/2, (y₁ + y₂)/2), the Centroid G of ΔABC is ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3), and the Slope of line AB is m = (y₂ − y₁)/(x₂ − x₁) = tan θ.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Distance Formula, Collinearity & Polygon Classification`,
            explanation: `Distance of point P(x, y) from Origin O(0, 0) is √(x² + y²). Three points A, B, C are collinear if the sum of two smaller distances equals the third distance (e.g., d(A,B) + d(B,C) = d(A,C)).`,
            keyTakeaway: `Always square the differences (x₂ − x₁)² and (y₂ − y₁)² carefully; squares of negative numbers are always positive.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Section Formula, Midpoint, Centroid & Slope of a Line`,
            explanation: `Parallel lines have equal slopes (m₁ = m₂). For perpendicular lines, m₁ × m₂ = −1. The slope-intercept equation of a straight line is y = mx + c.`,
            keyTakeaway: `Slope of X-axis (or any horizontal line) is 0; slope of Y-axis (or any vertical line) is undefined.`,
          },
        ],
        keyPoints: [
          'Distance Formula: d(A, B) = √[(x₂ − x₁)² + (y₂ − y₁)²]; Distance from Origin = √(x² + y²).',
          'Section Formula (Internal Division m : n): P(x, y) = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n)).',
          'Midpoint Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2);  Centroid Formula: G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3).',
          'Slope Formula: m = (y₂ − y₁)/(x₂ − x₁) = tan θ; Parallel lines: m₁ = m₂; Perpendicular lines: m₁m₂ = −1.',
        ],
        keyDefinitions: [
          { term: 'Abscissa & Ordinate', meaning: 'The x-coordinate of a point is its Abscissa; the y-coordinate is its Ordinate.' },
          { term: 'Slope (Gradient) of a Line', meaning: 'The tangent of the angle of inclination θ made by the line with the positive X-axis: m = tan θ = (y₂ − y₁)/(x₂ − x₁).' },
        ],
        formulasAndRules: [
          'd(A, B) = √[(x₂ − x₁)² + (y₂ − y₁)²].',
          'Section Formula: x = (mx₂ + nx₁)/(m + n),  y = (my₂ + ny₁)/(m + n).',
          'Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2);  Centroid: ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3);  Slope: m = (y₂ − y₁)/(x₂ − x₁).',
        ],
        solvedExamples: [
          {
            prompt: 'Find the distance between points A(2, 3) and B(6, 6).',
            solution: `Step 1: Let A(x₁, y₁) = (2, 3) and B(x₂, y₂) = (6, 6).\nStep 2: By Distance Formula, d(A, B) = √[(x₂ − x₁)² + (y₂ − y₁)²] = √[(6 − 2)² + (6 − 3)²].\nStep 3: d(A, B) = √[4² + 3²] = √[16 + 9] = √25 = 5 units.`,
          },
          {
            prompt: 'Find the coordinates of point P which divides the line segment joining A(−1, 7) and B(4, −3) in the ratio 2 : 3.',
            solution: `Step 1: Here (x₁, y₁) = (−1, 7), (x₂, y₂) = (4, −3), and m : n = 2 : 3.\nStep 2: x = (mx₂ + nx₁)/(m + n) = [2(4) + 3(−1)] / (2 + 3) = (8 − 3)/5 = 5/5 = 1.\nStep 3: y = (my₂ + ny₁)/(m + n) = [2(−3) + 3(7)] / (2 + 3) = (−6 + 21)/5 = 15/5 = 3.\nStep 4: Coordinates of point P are (1, 3).`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iii)',
            typeLabel: 'Distance Formula & Equidistant Points',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Euclidean Distance Formula in the Cartesian Plane',
            formulaExplained: 'd(A, B) = √[(x₂ − x₁)² + (y₂ − y₁)²].',
            question: `Solve using the Distance Formula:\n(i) Find the distance between P(−5, 7) and Q(−1, 3).\n(ii) Find the distance of point A(−8, 15) from the origin O(0, 0).\n(iii) Find the point on the X-axis which is equidistant from A(2, −5) and B(−2, 9).`,
            answer: `(i) 4√2 units\n(ii) 17 units\n(iii) (−7, 0)`,
            stepByStepExplanation: `(i) d(P, Q) = √[(−1 − (−5))² + (3 − 7)²] = √[4² + (−4)²] = √32 = 4√2 units.\n(ii) d(O, A) = √[(-8)² + 15²] = √[64 + 225] = √289 = 17 units.\n(iii) Let point on X-axis be P(x, 0). PA² = PB² ⇒ (x − 2)² + 25 = (x + 2)² + 81 ⇒ −4x + 29 = 4x + 85 ⇒ −8x = 56 ⇒ x = −7 ⇒ P(−7, 0).`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Section Formula, Midpoint Formula & Centroid of a Triangle',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Internal Section Ratio, Midpoint & Centroid Coordinates',
            formulaExplained: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2); Centroid = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3).',
            question: `Find the required coordinates:\n(i) Find the midpoint of the segment joining P(6, −4) and Q(10, 12).\n(ii) Find the coordinates of the centroid G of ΔABC with vertices A(−7, 6), B(2, −2), and C(8, 5).\n(iii) In what ratio does point T(−1, 6) divide the segment joining P(−3, 10) and Q(6, −8)?`,
            answer: `(i) Midpoint M = (8, 4)\n(ii) Centroid G = (1, 3)\n(iii) Ratio m : n = 2 : 7`,
            stepByStepExplanation: `(i) M = ((6+10)/2, (−4+12)/2) = (8, 4).\n(ii) G = ((−7+2+8)/3, (6−2+5)/3) = (3/3, 9/3) = (1, 3).\n(iii) −1 = (6m − 3n)/(m + n) ⇒ −m − n = 6m − 3n ⇒ 2n = 7m ⇒ m / n = 2 / 7 (Ratio 2 : 7).`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Slope of a Line, Collinearity & Equation of a Straight Line',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Slope m = (y₂ − y₁)/(x₂ − x₁) = tan θ and Slope-Intercept Form y = mx + c',
            formulaExplained: 'Points A, B, C are collinear iff Slope(AB) = Slope(BC).',
            question: `Solve the following:\n(i) Find the slope of a line making an angle of inclination θ = 45° with the positive X-axis.\n(ii) Find the slope of the line passing through A(2, 3) and B(4, 7).\n(iii) Determine whether points P(1, −1), Q(2, 1), and R(4, 5) are collinear using slopes.`,
            answer: `(i) Slope m = tan 45° = 1\n(ii) Slope m = 2\n(iii) Slope(PQ) = 2 and Slope(QR) = 2 ⇒ Since slopes are equal and Q is common, P, Q, R are collinear`,
            stepByStepExplanation: `(i) m = tan 45° = 1.\n(ii) m = (7 − 3)/(4 − 2) = 4/2 = 2.\n(iii) Slope(PQ) = (1 − (−1))/(2 − 1) = 2/1 = 2; Slope(QR) = (5 − 1)/(4 − 2) = 4/2 = 2.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'trigonometry_heights': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Trigonometric Ratios, Standard Angles, Identities & Heights-Distances`,
        detailedExplanation: [
          `In "${chapterTitle}", for an acute angle θ in a right-angled triangle: sin θ = Opposite / Hypotenuse, cos θ = Adjacent / Hypotenuse, tan θ = Opposite / Adjacent = sin θ / cos θ, and their reciprocals are cosec θ = 1/sin θ, sec θ = 1/cos θ, and cot θ = 1/tan θ.`,
          `Standard Angle Values: sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1 (and cos θ reverses this order; tan 30° = 1/√3, tan 45° = 1, tan 60° = √3).`,
          `Three Fundamental Trigonometric Identities: (1) sin²θ + cos²θ = 1, (2) 1 + tan²θ = sec²θ, and (3) 1 + cot²θ = cosec²θ. These ratios and standard angles solve real-world Heights and Distances problems using Angle of Elevation and Angle of Depression.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Six Trigonometric Ratios, Complementary Relations & Standard Angles`,
            explanation: `For complementary angles in a right triangle: sin(90° − θ) = cos θ, cos(90° − θ) = sin θ, tan(90° − θ) = cot θ. Also tan θ × cot θ = 1, sin θ × cosec θ = 1, cos θ × sec θ = 1.`,
            keyTakeaway: `Memorise sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, and tan 30° = 1/√3, tan 45° = 1, tan 60° = √3.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Proving Trigonometric Identities & Heights and Distances`,
            explanation: `From sin²θ + cos²θ = 1, we get sin²θ = 1 − cos²θ = (1 − cos θ)(1 + cos θ). From 1 + tan²θ = sec²θ, we get sec²θ − tan²θ = (sec θ − tan θ)(sec θ + tan θ) = 1. For Heights & Distances, Angle of Elevation = Angle of Depression (alternate interior angles).`,
            keyTakeaway: `Always draw a neat right-angled triangle diagram before solving any Heights & Distances word problem.`,
          },
        ],
        keyPoints: [
          'Six Ratios: sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj, cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.',
          'Complementary Relations: sin(90° − θ) = cos θ;  tan(90° − θ) = cot θ;  sec(90° − θ) = cosec θ.',
          'Fundamental Identities: sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ;  1 + cot²θ = cosec²θ.',
          'Heights & Distances: tan θ = Height of Tower / Horizontal Distance from Base.',
        ],
        keyDefinitions: [
          { term: 'Angle of Elevation', meaning: 'The angle between the horizontal line of sight and the upward line of sight when looking at an object above eye level.' },
          { term: 'Angle of Depression', meaning: 'The angle between the horizontal line of sight and the downward line of sight when looking at an object below eye level.' },
        ],
        formulasAndRules: [
          'sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ;  1 + cot²θ = cosec²θ.',
          'tan θ = sin θ / cos θ;  cot θ = cos θ / sin θ.',
          'Standard Angles: tan 30° = 1/√3,  tan 45° = 1,  tan 60° = √3.',
        ],
        solvedExamples: [
          {
            prompt: 'If sin θ = 7/25, find the values of cos θ and tan θ using the fundamental trigonometric identity.',
            solution: `Step 1: We know that sin²θ + cos²θ = 1.\nStep 2: (7/25)² + cos²θ = 1 ⇒ 49/625 + cos²θ = 1 ⇒ cos²θ = 1 − 49/625 = 576/625.\nStep 3: Taking square root: cos θ = 24/25.\nStep 4: tan θ = sin θ / cos θ = (7/25) ÷ (24/25) = 7/24.`,
          },
          {
            prompt: 'From a point on the ground 30 m away from the foot of a vertical tower, the angle of elevation of the top of the tower is 60°. Find the height of the tower (Take √3 = 1.732).',
            solution: `Step 1: Let AB = h be the tower and BC = 30 m be the horizontal distance, with ∠ACB = 60°.\nStep 2: In right ΔABC, tan 60° = AB / BC ⇒ √3 = h / 30.\nStep 3: h = 30√3 = 30 × 1.732 = 51.96 m.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iii)',
            typeLabel: 'Trigonometric Ratios & Standard Angle Evaluations',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Pythagorean Identity and Exact Trigonometric Table Values (30°, 45°, 60°)',
            formulaExplained: 'sin 30° = cos 60° = 1/2; sin 60° = cos 30° = √3/2; tan 45° = 1.',
            question: `Evaluate the following:\n(i) If tan θ = 3/4, find sec θ and cos θ.\n(ii) Evaluate: 2 tan²45° + cos²30° − sin²60°\n(iii) Evaluate: (sin 30° + cos 60°) / (tan 45°)`,
            answer: `(i) sec θ = 5/4; cos θ = 4/5\n(ii) 2\n(iii) 1`,
            stepByStepExplanation: `(i) sec²θ = 1 + tan²θ = 1 + 9/16 = 25/16 ⇒ sec θ = 5/4 and cos θ = 1/sec θ = 4/5.\n(ii) 2(1)² + (√3/2)² − (√3/2)² = 2 + 3/4 − 3/4 = 2.\n(iii) (1/2 + 1/2) / 1 = 1.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(ii)',
            typeLabel: 'Prove the Following Trigonometric Identities',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Algebraic Manipulation with sin²θ + cos²θ = 1 and Conjugate Multiplication',
            formulaExplained: '1 − sin²θ = cos²θ;  sec²θ − tan²θ = 1.',
            question: `Prove the following trigonometric identities step-by-step:\n(i) Prove that: sin²θ / cos θ + cos θ = sec θ\n(ii) Prove that: √[(1 − sin θ) / (1 + sin θ)] = sec θ − tan θ`,
            answer: `(i) LHS = (sin²θ + cos²θ)/cos θ = 1/cos θ = sec θ = RHS (Hence Proved)\n(ii) Rationalising inside the root by (1 − sin θ) gives √[(1 − sin θ)² / cos²θ] = (1 − sin θ)/cos θ = sec θ − tan θ = RHS (Hence Proved)`,
            stepByStepExplanation: `(i) Take common denominator cos θ: (sin²θ + cos²θ)/cos θ = 1/cos θ = sec θ.\n(ii) Multiply numerator and denominator inside √ by (1 − sin θ): √[(1 − sin θ)² / (1 − sin²θ)] = (1 − sin θ)/cos θ = 1/cos θ − sin θ/cos θ = sec θ − tan θ.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Board Word Problems on Heights & Distances',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Right-Triangle Modelling of Elevation and Depression Angles',
            formulaExplained: 'tan θ = Opposite (Height) / Adjacent (Horizontal Distance).',
            question: `Solve the word problems step-by-step:\n(i) A observer at a distance of 20 m from a tree looks at the top of the tree at an angle of elevation of 45°. Find the height of the tree.\n(ii) From the top of a lighthouse 90 m high, the angle of depression of a ship is 30°. Find how far the ship is from the base of the lighthouse (Take √3 = 1.73).`,
            answer: `(i) Height of the tree = 20 m\n(ii) Distance of the ship = 90√3 m ≈ 155.7 m`,
            stepByStepExplanation: `(i) tan 45° = h / 20 ⇒ 1 = h / 20 ⇒ h = 20 m.\n(ii) Angle of elevation from ship = Angle of depression = 30°. tan 30° = 90 / d ⇒ 1/√3 = 90 / d ⇒ d = 90√3 = 90 × 1.73 = 155.7 m.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'data_handling_statistics': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Mean (Direct, Assumed, Step-Deviation), Median, Mode, Pie Charts & Histograms`,
        detailedExplanation: [
          `In "${chapterTitle}", Statistics deals with the collection, tabular representation, graphical display (Pictographs, Bar Graphs, Joint Bar Graphs, Histograms, Frequency Polygons, Pie Diagrams, Ogives), and measures of central tendency (Mean, Median, Mode) of data.`,
          `For grouped frequency distributions: Direct Mean X̄ = (∑fᵢxᵢ) / (∑fᵢ); Assumed Mean X̄ = A + (∑fᵢdᵢ)/(∑fᵢ); Step-Deviation Mean X̄ = A + [(∑fᵢuᵢ)/(∑fᵢ)] × g.`,
          `Median of grouped data = L + [(N/2 − cf) / f] × h, and Mode of grouped data = L + [(f₁ − f₀) / (2f₁ − f₀ − f₂)] × h. In a Pie Diagram, the Central Angle θ of a component = (Value of Component / Total Value) × 360°.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Measures of Central Tendency: Mean, Median & Mode`,
            explanation: `Class Mark (Mid-value) xᵢ = (Upper Class Limit + Lower Class Limit) / 2. For Median, first construct the Cumulative Frequency (less than type) column and locate the Median Class containing (N/2). For Mode, the Modal Class is the class with the maximum frequency f₁.`,
            keyTakeaway: `Empirical Relationship: 3 × Median = Mode + 2 × Mean.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Pie Diagrams, Bar Graphs, Histograms & Frequency Polygons`,
            explanation: `For Histograms and Median/Mode formulas, classes must be continuous (exclusive). If classes are inclusive (e.g., 10–19, 20–29), subtract 0.5 from lower limits and add 0.5 to upper limits (9.5–19.5, 19.5–29.5).`,
            keyTakeaway: `Sum of all central angles in a Pie Diagram is always 360°.`,
          },
        ],
        keyPoints: [
          'Class Mark (xᵢ) = (Lower Class Limit + Upper Class Limit) / 2.',
          'Mean by Direct Method: X̄ = (∑fᵢxᵢ) / N;  Assumed Mean Method: X̄ = A + (∑fᵢdᵢ) / N.',
          'Median = L + [(N/2 − cf) / f] × h;  Mode = L + [(f₁ − f₀) / (2f₁ − f₀ − f₂)] × h.',
          'Pie Diagram Central Angle θ = (Component Value / Total Value) × 360°.',
        ],
        keyDefinitions: [
          { term: 'Mean, Median & Mode', meaning: 'Mean is the arithmetic average; Median is the middlemost observation; Mode is the most frequently occurring observation.' },
          { term: 'Modal Class & Median Class', meaning: 'The class interval with maximum frequency is the Modal Class; the class whose cumulative frequency first ≥ N/2 is the Median Class.' },
        ],
        formulasAndRules: [
          'Direct Mean: X̄ = (∑fᵢxᵢ) / (∑fᵢ);  Empirical Relation: Mode = 3(Median) − 2(Mean).',
          'Median = L + [(N/2 − cf) / f] × h;  Mode = L + [(f₁ − f₀) / (2f₁ − f₀ − f₂)] × h.',
          'Pie Central Angle θ = (Component / Total) × 360°.',
        ],
        solvedExamples: [
          {
            prompt: 'For a grouped frequency distribution, if ∑fᵢ = 50 and ∑fᵢxᵢ = 1,450, find the Mean X̄. Also, if the Median of this data is 28, find the Mode using the empirical formula.',
            solution: `Step 1: Mean X̄ = (∑fᵢxᵢ) / (∑fᵢ) = 1,450 / 50 = 29.\nStep 2: By Empirical Relation: Mode = 3(Median) − 2(Mean) = 3(28) − 2(29) = 84 − 58 = 26.`,
          },
          {
            prompt: 'For a modal class 30–40 (L = 30, h = 10), if the frequency of the modal class is f₁ = 16, preceding frequency f₀ = 10, and succeeding frequency f₂ = 12, calculate the Mode.',
            solution: `Step 1: Formula: Mode = L + [(f₁ − f₀) / (2f₁ − f₀ − f₂)] × h.\nStep 2: Substitute values: Mode = 30 + [(16 − 10) / (32 − 10 − 12)] × 10 = 30 + (6 / 10) × 10.\nStep 3: Mode = 30 + 6 = 36.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Ungrouped & Grouped Mean, Median, Mode & Class Marks',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Class Mark Formula and Central Tendency Measures',
            formulaExplained: 'xᵢ = (Lower + Upper)/2;  X̄ = (∑fᵢxᵢ) / (∑fᵢ).',
            question: `Solve the following statistics problems:\n(i) Find the Mean, Median, and Mode of the scores: 8, 10, 10, 12, 14, 15, 15, 15, 18.\n(ii) Find the class mark of the class interval 20–30 and 35–45.\n(iii) In a frequency table, if N = ∑fᵢ = 40, Assumed Mean A = 50, and ∑fᵢdᵢ = −80, find the Mean X̄.\n(iv) For a Median Class 40–60 (L = 40, h = 20), if N = 100, cf = 35, and f = 25, calculate the Median.`,
            answer: `(i) Mean = 13; Median = 14 (5th observation); Mode = 15\n(ii) Class marks are 25 and 40\n(iii) Mean X̄ = 48\n(iv) Median = 52`,
            stepByStepExplanation: `(i) Sum = 117 ⇒ Mean = 117/9 = 13; Middle (5th) score = 14; Most frequent score = 15 (3 times).\n(ii) (20+30)/2 = 25; (35+45)/2 = 40.\n(iii) X̄ = A + (∑fᵢdᵢ)/N = 50 + (−80/40) = 50 − 2 = 48.\n(iv) Median = 40 + [(50 − 35)/25] × 20 = 40 + (15/25) × 20 = 40 + 12 = 52.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(ii)',
            typeLabel: 'Complete Frequency Table Mean & Pie Diagram Central Angles',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Direct Mean Tabulation and Pie Chart 360° Proportional Angles',
            formulaExplained: 'Central Angle θ = (Component / Total) × 360°.',
            question: `Solve step-by-step:\n(i) Calculate the Mean from the grouped distribution: Classes: [0–10 (f=4), 10–20 (f=6), 20–30 (f=10), 30–40 (f=5)].\n(ii) A student’s daily 24-hour schedule is: School = 6 hrs, Sleep = 8 hrs, Study = 4 hrs, Play & Others = 6 hrs. Find the central angle for each sector in a Pie Diagram.`,
            answer: `(i) ∑fᵢ = 25, ∑fᵢxᵢ = 535 ⇒ Mean X̄ = 21.4\n(ii) School = 90°, Sleep = 120°, Study = 60°, Play & Others = 90° (Total = 360°)`,
            stepByStepExplanation: `(i) Class marks xᵢ are 5, 15, 25, 35. fᵢxᵢ are 4(5)=20, 6(15)=90, 10(25)=250, 5(35)=175. Sum ∑fᵢxᵢ = 20 + 90 + 250 + 175 = 535. Mean = 535 / 25 = 21.4.\n(ii) Multiplier = 360° / 24 = 15° per hour ⇒ School: 6×15°=90°; Sleep: 8×15°=120°; Study: 4×15°=60°; Play: 6×15°=90°.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'probability': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Random Experiments, Sample Space S, Events & Classical Probability P(A)`,
        detailedExplanation: [
          `In "${chapterTitle}", a Random Experiment is an experiment in which all possible outcomes are known in advance, but the exact outcome of any single trial cannot be predicted with certainty. The set of all possible outcomes is called the Sample Space (S), and the number of sample points is n(S).`,
          `Standard Sample Spaces: Tossing 1 coin → n(S) = 2; 2 coins → n(S) = 4; 3 coins → n(S) = 8; Throwing 1 die → n(S) = 6; Throwing 2 dice → n(S) = 36; Drawing 1 card from a well-shuffled pack of 52 playing cards → n(S) = 52.`,
          `Any subset A of the sample space S is called an Event. The classical probability of event A is P(A) = n(A) / n(S), where 0 ≤ P(A) ≤ 1, and P(A) + P(A′) = 1.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Sample Space S and Number of Sample Points n(S)`,
            explanation: `In a pack of 52 cards, there are 26 Red cards (13 Hearts + 13 Diamonds) and 26 Black cards (13 Spades + 13 Clubs). There are 12 Face Cards (4 Kings + 4 Queens + 4 Jacks) and 4 Aces.`,
            keyTakeaway: `Note that Aces are NOT face cards; there are 12 face cards (3 in each suit) and 16 honour cards (12 face cards + 4 aces).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Probability of an Event P(A) = n(A) / n(S)`,
            explanation: `Probability of a sure (certain) event is 1; probability of an impossible event is 0. For any event A, the probability of the complementary event 'not A' is P(A′) = 1 − P(A).`,
            keyTakeaway: `A probability value can never be negative and can never exceed 1 (100%).`,
          },
        ],
        keyPoints: [
          'Sample Space Sizes: 1 Coin → 2;  2 Coins → 4;  3 Coins → 8;  1 Die → 6;  2 Dice → 36;  Playing Cards → 52.',
          'Pack of 52 Cards: 4 Suits (13 each); 26 Red, 26 Black; 12 Face Cards (4 K, 4 Q, 4 J); 4 Aces.',
          'Classical Probability Formula: P(A) = n(A) / n(S), where 0 ≤ P(A) ≤ 1.',
          'Complementary Probability Rule: P(A) + P(not A) = 1 ⇒ P(A′) = 1 − P(A).',
        ],
        keyDefinitions: [
          { term: 'Sample Space (S)', meaning: 'The set of all possible outcomes of a random experiment.' },
          { term: 'Event (A)', meaning: 'A subset of the sample space S satisfying a specified condition.' },
        ],
        formulasAndRules: [
          'P(A) = n(A) / n(S).',
          '0 ≤ P(A) ≤ 1;  P(S) = 1;  P(φ) = 0.',
          'P(A′) = 1 − P(A).',
        ],
        solvedExamples: [
          {
            prompt: 'Two coins are tossed simultaneously. Write the sample space S, n(S), and find the probability of getting: (i) at least one head, (ii) no head.',
            solution: `Step 1: Sample Space S = {HH, HT, TH, TT}, so n(S) = 4.\nStep 2: (i) Let A be the event of getting at least one head: A = {HH, HT, TH} ⇒ n(A) = 3.\n    P(A) = n(A) / n(S) = 3/4.\nStep 3: (ii) Let B be the event of getting no head: B = {TT} ⇒ n(B) = 1.\n    P(B) = n(B) / n(S) = 1/4.`,
          },
          {
            prompt: 'A card is drawn at random from a well-shuffled pack of 52 playing cards. Find the probability that the card drawn is: (i) a Red card, (ii) a Face card, (iii) an Ace of Spades.',
            solution: `Step 1: Here n(S) = 52.\nStep 2: (i) Number of Red cards n(A) = 26 ⇒ P(A) = 26/52 = 1/2.\nStep 3: (ii) Number of Face cards (4 Kings + 4 Queens + 4 Jacks) n(B) = 12 ⇒ P(B) = 12/52 = 3/13.\nStep 4: (iii) Number of Aces of Spades n(C) = 1 ⇒ P(C) = 1/52.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Write Sample Space S and Number of Sample Points n(S)',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Enumerating All Outcomes of Coin, Die and Card Experiments',
            formulaExplained: 'List all distinct outcomes inside curly braces S = { ... } and count n(S).',
            question: `Write the Sample Space S and n(S) for each random experiment:\n(i) One coin and one die are thrown simultaneously.\n(ii) Two-digit numbers are formed using digits 2, 3, 5 without repetition.\n(iii) Three coins are tossed simultaneously.\n(iv) Which of the following cannot be the probability of an event: 2/3, −1.5, 15%, 0.7?`,
            answer: `(i) S = {H1, H2, H3, H4, H5, H6, T1, T2, T3, T4, T5, T6}, n(S) = 12\n(ii) S = {23, 25, 32, 35, 52, 53}, n(S) = 6\n(iii) S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}, n(S) = 8\n(iv) −1.5 cannot be a probability because probability cannot be negative (0 ≤ P(A) ≤ 1)`,
            stepByStepExplanation: `(i) 2 × 6 = 12 outcomes.\n(ii) 3 × 2 = 6 two-digit numbers without repeating digits.\n(iii) 2³ = 8 outcomes.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Single Die & Two Dice Probability Problems',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Classical Probability P(A) = n(A) / n(S)',
            formulaExplained: 'For 1 die, n(S) = 6; for 2 dice, n(S) = 36.',
            question: `Solve the following probability problems:\n(i) A die is rolled. Find the probability of getting: (a) a prime number, (b) an odd number.\n(ii) Two dice are rolled simultaneously. Find the probability that the sum of the digits on the upper faces is 8.\n(iii) Two dice are rolled simultaneously. Find the probability of getting a doublet (same digit on both dice).`,
            answer: `(i) (a) P(prime) = 3/6 = 1/2; (b) P(odd) = 3/6 = 1/2\n(ii) P(sum = 8) = 5/36\n(iii) P(doublet) = 6/36 = 1/6`,
            stepByStepExplanation: `(i) S = {1, 2, 3, 4, 5, 6}. Primes = {2, 3, 5} (3/6 = 1/2); Odds = {1, 3, 5} (3/6 = 1/2).\n(ii) n(S) = 36. Sum = 8 outcomes: {(2,6), (3,5), (4,4), (5,3), (6,2)} ⇒ n(A) = 5 ⇒ P(A) = 5/36.\n(iii) Doublets: {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)} ⇒ n(B) = 6 ⇒ P(B) = 6/36 = 1/6.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Playing Cards & Bag of Balls Probability Problems',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Deck Composition (52 Cards) and Complementary Events',
            formulaExplained: 'P(A) = n(A)/n(S);  P(not A) = 1 − P(A).',
            question: `Solve step-by-step:\n(i) A box contains 5 red pens, 8 blue pens, and 3 green pens. One pen is drawn at random. Find the probability that the pen drawn is: (a) blue, (b) not green.\n(ii) One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting: (a) a King of Red colour, (b) a Spade card.`,
            answer: `(i) n(S) = 16; (a) P(blue) = 8/16 = 1/2; (b) P(not green) = 13/16\n(ii) n(S) = 52; (a) P(Red King) = 2/52 = 1/26; (b) P(Spade) = 13/52 = 1/4`,
            stepByStepExplanation: `(i) Total pens n(S) = 5 + 8 + 3 = 16. Blue = 8 ⇒ 8/16 = 1/2. Not green = 5 + 8 = 13 ⇒ 13/16.\n(ii) There are 2 Red Kings (King of Hearts, King of Diamonds) ⇒ 2/52 = 1/26. There are 13 Spade cards ⇒ 13/52 = 1/4.`,
            calculationVerified: true,
          },
        ],
      };
    }

    default:
      return null;
  }
}
