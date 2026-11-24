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

export function buildSecondaryAlgebraCommercialMathBlueprint(params: {
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
    case 'sets_venn': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Roster & Set-Builder Form, Venn Diagrams & Set Operations`,
        detailedExplanation: [
          `In "${chapterTitle}", a Set is defined as a well-defined collection of distinct objects. Sets are represented in two ways: Listing (Roster) Method and Rule (Set-Builder) Method.`,
          `Students study Types of Sets (Singleton, Empty/Null Set φ, Finite, Infinite, Equal Sets), Subsets (A ⊆ B), Universal Set (U), Complement of a Set (A′), Union (A ∪ B), and Intersection (A ∩ B).`,
          `For any two finite sets A and B, the Cardinality Inclusion–Exclusion Theorem states: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Roster Form, Set-Builder Form & Types of Sets`,
            explanation: `In Roster form, elements are listed inside curly braces { } without repetition. In Set-Builder form, we write {x | x satisfies property P}. An Empty Set φ = { } has 0 elements.`,
            keyTakeaway: `Order of elements does not matter in a set, and no element is repeated (e.g., letters of 'SCHOOL' = {S, C, H, O, L}).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Venn Diagrams, Subsets, Complement & Cardinality Formula`,
            explanation: `If every element of A is in B, A ⊆ B. Complement A′ = {x ∈ U | x ∉ A}, so n(A) + n(A′) = n(U). For union and intersection, n(A ∪ B) = n(A) + n(B) − n(A ∩ B).`,
            keyTakeaway: `Always subtract n(A ∩ B) once so common elements are not double-counted.`,
          },
        ],
        keyPoints: [
          'Standard Number Sets: N = {1, 2, 3, ...}, W = {0, 1, 2, ...}, I/Z = {..., −2, −1, 0, 1, 2, ...}, Q = Rational Numbers, R = Real Numbers.',
          'Empty Set (Null Set): φ or { } has n(φ) = 0; Singleton Set has exactly 1 element.',
          'Subset Property: Every set is a subset of itself (A ⊆ A), and the empty set is a subset of every set (φ ⊆ A).',
          'Inclusion–Exclusion Formula: n(A ∪ B) = n(A) + n(B) − n(A ∩ B); n(A) + n(A′) = n(U).',
        ],
        keyDefinitions: [
          { term: 'Set', meaning: 'A well-defined collection of distinct objects or elements.' },
          { term: 'Union (A ∪ B) & Intersection (A ∩ B)', meaning: 'A ∪ B contains elements in A or B or both; A ∩ B contains only elements common to both A and B.' },
          { term: 'Complement of a Set (A′)', meaning: 'The set of all elements of the Universal Set U which are not in Set A.' },
        ],
        formulasAndRules: [
          'n(A ∪ B) = n(A) + n(B) − n(A ∩ B).',
          'If A and B are disjoint sets (A ∩ B = φ), then n(A ∪ B) = n(A) + n(B).',
          'n(A′) = n(U) − n(A); Number of subsets of a set with m elements = 2ᵐ.',
        ],
        solvedExamples: [
          {
            prompt: 'Write Set A = {x | x is a prime number less than 15} in Roster form and find n(A).',
            solution: `Step 1: Prime numbers less than 15 are 2, 3, 5, 7, 11, 13.\nStep 2: Roster Form: A = {2, 3, 5, 7, 11, 13}.\nStep 3: Number of elements n(A) = 6.`,
          },
          {
            prompt: 'If n(A) = 15, n(A ∪ B) = 29, and n(A ∩ B) = 7, find n(B).',
            solution: `Step 1: Formula: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).\nStep 2: Substitute given values: 29 = 15 + n(B) − 7 ⇒ 29 = 8 + n(B).\nStep 3: n(B) = 29 − 8 = 21. Verification: 15 + 21 − 7 = 29 = n(A ∪ B).`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Write Sets in Roster Form and Set-Builder Form',
            marks: 3,
            subQuestionsCount: 4,
            conceptUsed: 'Roster (Listing) Method and Set-Builder (Rule) Method',
            formulaExplained: 'Distinct elements are listed once inside { }; Set-builder describes the defining rule.',
            question: `Write the following sets as directed:\n(i) Set of even prime numbers in Roster form.\n(ii) Set of letters in the word 'COMPLEMENT' in Roster form.\n(iii) B = {1, 4, 9, 16, 25, 36} in Set-Builder form.\n(iv) State whether C = {x | x ∈ N, 1 < x < 2} is an Empty Set or Singleton Set.`,
            answer: `(i) {2}\n(ii) {C, O, M, P, L, E, N, T}\n(iii) B = {x | x = n², n ∈ N, 1 ≤ n ≤ 6}\n(iv) Empty Set (φ), because there is no natural number strictly between 1 and 2`,
            stepByStepExplanation: `(i) 2 is the only even prime number, so {2} is a singleton set.\n(ii) Remove duplicate letters M and E → 8 distinct letters.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Universal Set, Complement, Union & Intersection',
            marks: 3,
            subQuestionsCount: 3,
            conceptUsed: 'Set Operations on Universal Set U',
            formulaExplained: 'A ∪ B = all elements in A or B; A ∩ B = common elements; A′ = U − A.',
            question: `Let Universal Set U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {2, 4, 6, 8, 10}, and B = {2, 3, 5, 7}. Find:\n(i) A ∪ B and A ∩ B\n(ii) A′ and B′\n(iii) Verify that n(A ∪ B) = n(A) + n(B) − n(A ∩ B).`,
            answer: `(i) A ∪ B = {2, 3, 4, 5, 6, 7, 8, 10}; A ∩ B = {2}\n(ii) A′ = {1, 3, 5, 7, 9}; B′ = {1, 4, 6, 8, 9, 10}\n(iii) LHS = n(A ∪ B) = 8; RHS = 5 + 4 − 1 = 8 (LHS = RHS Verified)`,
            stepByStepExplanation: `Count elements: n(A) = 5, n(B) = 4, n(A ∩ B) = 1, n(A ∪ B) = 8. Since 5 + 4 − 1 = 8, the theorem is verified.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Venn Diagram Word Problems',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Inclusion–Exclusion Principle in Two-Set Surveys',
            formulaExplained: 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B); None = n(U) − n(A ∪ B).',
            question: `Solve the word problems using Venn diagram formulas:\n(i) In a class of 70 students, 45 play Cricket, 52 play Kho-Kho, and every student plays at least one of the two games. Find how many students play both games and how many play only Cricket.\n(ii) In a hostel of 125 students, 80 drink tea, 60 drink coffee, and 20 drink both tea and coffee. How many students drink neither tea nor coffee?`,
            answer: `(i) Both games = 27 students; Only Cricket = 18 students\n(ii) Neither tea nor coffee = 5 students`,
            stepByStepExplanation: `(i) Let C = Cricket, K = Kho-Kho. n(C ∪ K) = 70, n(C) = 45, n(K) = 52.\n    n(C ∩ K) = n(C) + n(K) − n(C ∪ K) = 45 + 52 − 70 = 97 − 70 = 27 students.\n    Students playing only Cricket = n(C) − n(C ∩ K) = 45 − 27 = 18 students.\n(ii) n(T ∪ C) = 80 + 60 − 20 = 120. Students drinking neither = n(U) − n(T ∪ C) = 125 − 120 = 5 students.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'real_numbers_surds': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Fundamental Theorem of Arithmetic, Irrationality Proofs & Surds`,
        detailedExplanation: [
          `In "${chapterTitle}", the Real Number system (R) comprises Rational Numbers (Q) and Irrational Numbers (Q′). Every rational number p/q has either a terminating decimal expansion (when prime factors of q are only 2ᵐ × 5ⁿ) or a non-terminating recurring decimal expansion.`,
          `By the Fundamental Theorem of Arithmetic, every composite integer can be uniquely factorised into primes, yielding HCF(a, b) × LCM(a, b) = a × b.`,
          `Students also master Irrationality Proofs (proving √2, √3, √5, 3 + 2√5 are irrational by contradiction) and Operations on Surds including Rationalisation of the Denominator using conjugate pairs (√a + √b)(√a − √b) = a − b.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Fundamental Theorem of Arithmetic & Decimal Termination Test`,
            explanation: `A rational number p/q (in lowest terms) terminates iff the prime factorisation of denominator q is of the form 2ᵐ × 5ⁿ. Also, for any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.`,
            keyTakeaway: `If denominator q contains any prime factor other than 2 or 5 (such as 3, 7, 11), the decimal is non-terminating recurring.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Irrational Numbers, Surds & Rationalising the Denominator`,
            explanation: `If p is prime and p divides a², then p divides a. This theorem proves √p is irrational. For binomial quadratic surds, the conjugate of (a + b√c) is (a − b√c), and their product is a² − b²c (a rational number).`,
            keyTakeaway: `To rationalise 1/(√a + √b), multiply numerator and denominator by (√a − √b).`,
          },
        ],
        keyPoints: [
          'Fundamental Theorem of Arithmetic: Every composite number is uniquely expressible as a product of primes.',
          'Product Identity: HCF(a, b) × LCM(a, b) = a × b (valid for two positive integers).',
          'Terminating Decimal Condition: Prime factorisation of q in p/q (co-prime) is purely 2ᵐ × 5ⁿ.',
          'Conjugate Surd Identity: (a + √b)(a − √b) = a² − b;  (√a + √b)(√a − √b) = a − b.',
        ],
        keyDefinitions: [
          { term: 'Irrational Number', meaning: 'A real number whose decimal expansion is non-terminating and non-recurring (cannot be written as p/q).' },
          { term: 'Surd (Radical)', meaning: 'An irrational root of a positive rational number, written as ⁿ√a where a is rational and ⁿ√a is irrational.' },
          { term: 'Rationalising Factor (Conjugate)', meaning: 'A surd expression which when multiplied with a given surd produces a rational number.' },
        ],
        formulasAndRules: [
          'HCF(a, b) × LCM(a, b) = a × b.',
          'ⁿ√a × ⁿ√b = ⁿ√(ab);  ⁿ√a ÷ ⁿ√b = ⁿ√(a/b).',
          '1 / (√a + √b) = (√a − √b) / (a − b).',
        ],
        solvedExamples: [
          {
            prompt: 'Find the HCF and LCM of 96 and 404 by prime factorisation and verify HCF × LCM = 96 × 404.',
            solution: `Step 1: 96 = 2⁵ × 3¹;  404 = 2² × 101¹.\nStep 2: HCF(96, 404) = 2² = 4.\nStep 3: LCM(96, 404) = (96 × 404) / 4 = 24 × 404 = 9,696.\nStep 4: Verification: HCF × LCM = 4 × 9,696 = 38,784 = 96 × 404 (Verified).`,
          },
          {
            prompt: 'Rationalise the denominator of: 1 / (√7 − √5).',
            solution: `Step 1: Conjugate of (√7 − √5) is (√7 + √5).\nStep 2: Multiply numerator and denominator by (√7 + √5):\n    [1 × (√7 + √5)] / [(√7 − √5)(√7 + √5)] = (√7 + √5) / (7 − 5) = (√7 + √5) / 2.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Prime Factorisation, HCF–LCM & Recurring Decimal Conversion',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Fundamental Theorem of Arithmetic and p/q Conversion',
            formulaExplained: 'HCF × LCM = a × b; For 0.dddd... (1 repeating digit), p/q = d/9.',
            question: `Solve the following:\n(i) Find the HCF and LCM of 26 and 91 and verify that HCF × LCM = 26 × 91.\n(ii) Given that HCF(306, 657) = 9, find LCM(306, 657).\n(iii) Express the recurring decimal 0.666... (0.6̄) in p/q form in lowest terms.\n(iv) State without actual division whether 17/8 has a terminating or non-terminating decimal expansion.`,
            answer: `(i) HCF = 13, LCM = 182 (Check: 13 × 182 = 2,366 = 26 × 91)\n(ii) LCM(306, 657) = 22,338\n(iii) 2/3\n(iv) Terminating decimal (17/8 = 2.125) because 8 = 2³ × 5⁰`,
            stepByStepExplanation: `(i) 26 = 2 × 13; 91 = 7 × 13 ⇒ HCF = 13, LCM = 2 × 7 × 13 = 182.\n(ii) LCM = (306 × 657) / 9 = 34 × 657 = 22,338.\n(iii) Let x = 0.666... ⇒ 10x = 6.666... ⇒ 9x = 6 ⇒ x = 6/9 = 2/3.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(ii)',
            typeLabel: 'Proving Irrationality of Numbers',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Proof by Contradiction and Euclid’s Prime Divisibility Lemma',
            formulaExplained: 'If prime p divides a², then p divides a.',
            question: `Prove the following rigorously:\n(i) Prove that √5 is an irrational number.\n(ii) Prove that 3 + 2√5 is an irrational number.`,
            answer: `(i) By contradiction: Assuming √5 = a/b (co-prime) leads to 5 dividing both a and b, contradicting HCF(a, b) = 1. Hence √5 is irrational.\n(ii) Assuming 3 + 2√5 = p/q gives √5 = (p − 3q)/(2q), making an irrational number equal to a rational number (Contradiction). Hence 3 + 2√5 is irrational.`,
            stepByStepExplanation: `(i) Step 1: Assume √5 = a/b where a, b are co-prime integers (b ≠ 0).\n    Step 2: Squaring both sides: 5b² = a² ⇒ 5 divides a² ⇒ 5 divides a. Let a = 5c.\n    Step 3: 5b² = 25c² ⇒ b² = 5c² ⇒ 5 divides b² ⇒ 5 divides b.\n    Step 4: Thus 5 is a common factor of a and b, contradicting that a, b are co-prime. Therefore √5 is irrational.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iv)',
            typeLabel: 'Operations on Surds & Rationalisation of Denominator',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Simplifying Like Surds and Conjugate Multiplication',
            formulaExplained: '(√a + √b)(√a − √b) = a − b.',
            question: `Simplify the following surd expressions:\n(i) 5√3 + 8√3 − 2√3\n(ii) √50 + √18 − √8\n(iii) Rationalise the denominator: 6 / √3\n(iv) Rationalise the denominator: 4 / (√7 + √3)`,
            answer: `(i) 11√3\n(ii) 6√2\n(iii) 2√3\n(iv) √7 − √3`,
            stepByStepExplanation: `(i) (5 + 8 − 2)√3 = 11√3.\n(ii) √50 = 5√2, √18 = 3√2, √8 = 2√2 ⇒ (5 + 3 − 2)√2 = 6√2.\n(iii) (6 × √3) / (√3 × √3) = 6√3 / 3 = 2√3.\n(iv) [4(√7 − √3)] / [(√7 + √3)(√7 − √3)] = 4(√7 − √3) / (7 − 3) = √7 − √3.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'algebra_expressions_factorisation':
    case 'polynomials_zeroes': {
      const isPoly = blueprintId === 'polynomials_zeroes';
      return {
        blueprintId,
        topicDisplayName: isPoly
          ? `${chapterTitle} — Degree, Zeroes, Remainder-Factor Theorems & Coefficient Relations`
          : `${chapterTitle} — Algebraic Identities, Expansions & Factorisation`,
        detailedExplanation: [
          `In "${chapterTitle}", students master algebraic expressions, standard expansion identities, factorisation techniques, and the theory of polynomials p(x).`,
          `For a quadratic polynomial p(x) = ax² + bx + c (a ≠ 0) with zeroes α and β: Sum of zeroes (α + β) = −b/a, and Product of zeroes (αβ) = c/a.`,
          `By the Remainder Theorem, when a polynomial p(x) is divided by (x − a), the remainder is p(a). By the Factor Theorem, (x − a) is a factor of p(x) if and only if p(a) = 0.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Standard Algebraic Expansion Identities & Factorisation`,
            explanation: `(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; a² − b² = (a + b)(a − b); (x + a)(x + b) = x² + (a + b)x + ab; (a + b)³ = a³ + 3a²b + 3ab² + b³; a³ ± b³ = (a ± b)(a² ∓ ab + b²).`,
            keyTakeaway: `To factorise ax² + bx + c, split the middle term b into two numbers p and q such that p + q = b and p × q = a × c.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Zeroes of a Polynomial, Remainder Theorem & Factor Theorem`,
            explanation: `Geometrically, the zeroes of y = p(x) are the x-coordinates of the points where the graph intersects the X-axis. For p(x) = x² − (α + β)x + αβ, sum of zeroes = −b/a and product of zeroes = c/a.`,
            keyTakeaway: `(x − a) divides p(x) completely iff p(a) = 0.`,
          },
        ],
        keyPoints: [
          'Square & Difference Identities: (a ± b)² = a² ± 2ab + b²;  a² − b² = (a + b)(a − b).',
          'Cubic Identities: a³ + b³ = (a + b)(a² − ab + b²);  a³ − b³ = (a − b)(a² + ab + b²).',
          'Remainder Theorem: Remainder when p(x) is divided by (x − a) is r = p(a).',
          'Quadratic Zeroes Relation: α + β = −b/a  and  α · β = c/a; Polynomial is k[x² − (α + β)x + αβ].',
        ],
        keyDefinitions: [
          { term: 'Degree of a Polynomial', meaning: 'The highest power (exponent) of the variable with a non-zero coefficient in the polynomial.' },
          { term: 'Zero of a Polynomial', meaning: 'A real number k is a zero of polynomial p(x) if p(k) = 0.' },
          { term: 'Factor Theorem', meaning: 'For polynomial p(x) of degree ≥ 1, (x − a) is a factor of p(x) iff p(a) = 0.' },
        ],
        formulasAndRules: [
          '(a + b)² = a² + 2ab + b²;  (a − b)² = a² − 2ab + b²;  (a + b)(a − b) = a² − b².',
          '(x + a)(x + b) = x² + (a + b)x + ab.',
          'For p(x) = ax² + bx + c: Sum of Zeroes (α + β) = −b/a; Product of Zeroes (αβ) = c/a.',
        ],
        solvedExamples: [
          {
            prompt: 'Find the zeroes of the quadratic polynomial p(x) = x² + 7x + 10, and verify the relationship between the zeroes and the coefficients.',
            solution: `Step 1: Factorise x² + 7x + 10 by splitting 7x into 5x + 2x (since 5 + 2 = 7 and 5 × 2 = 10):\n    x² + 5x + 2x + 10 = x(x + 5) + 2(x + 5) = (x + 5)(x + 2).\nStep 2: Setting p(x) = 0 gives zeroes α = −5 and β = −2.\nStep 3: Here a = 1, b = 7, c = 10.\n    • Sum of zeroes: α + β = (−5) + (−2) = −7 = −7/1 = −b/a (Verified).\n    • Product of zeroes: αβ = (−5)(−2) = 10 = 10/1 = c/a (Verified).`,
          },
          {
            prompt: 'Using the Remainder Theorem, find the remainder when p(x) = 2x³ − 3x² + 4x − 5 is divided by (x − 2).',
            solution: `Step 1: Divisor is (x − 2), so put x = 2.\nStep 2: Remainder R = p(2) = 2(2)³ − 3(2)² + 4(2) − 5 = 2(8) − 3(4) + 8 − 5.\nStep 3: R = 16 − 12 + 8 − 5 = 7.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Algebraic Expansions & Factorisation Using Standard Identities',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Standard Expansion Formulas and Middle-Term Splitting',
            formulaExplained: '(a + b)² = a² + 2ab + b²; a² − b² = (a + b)(a − b); a³ − b³ = (a − b)(a² + ab + b²).',
            question: `Expand or factorise the following expressions:\n(i) Expand: (2x + 3y)²\n(ii) Factorise: 9x² − 16y²\n(iii) Factorise by splitting the middle term: x² − 5x + 6\n(iv) Factorise: x³ − 27`,
            answer: `(i) 4x² + 12xy + 9y²\n(ii) (3x + 4y)(3x − 4y)\n(iii) (x − 2)(x − 3)\n(iv) (x − 3)(x² + 3x + 9)`,
            stepByStepExplanation: `(i) (2x)² + 2(2x)(3y) + (3y)² = 4x² + 12xy + 9y².\n(ii) (3x)² − (4y)² = (3x + 4y)(3x − 4y).\n(iii) x² − 2x − 3x + 6 = x(x − 2) − 3(x − 2) = (x − 2)(x − 3).\n(iv) x³ − 3³ = (x − 3)(x² + 3x + 9).`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Zeroes of Quadratic Polynomials & Coefficient Verification',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Zeroes α, β and Vieta’s Relations (α + β = −b/a, αβ = c/a)',
            formulaExplained: 'Quadratic Polynomial with sum S and product P is k(x² − Sx + P).',
            question: `Solve the following polynomial exercises:\n(i) Find the zeroes of p(x) = x² − 2x − 8 and verify the relationship between zeroes and coefficients.\n(ii) Find a quadratic polynomial whose sum and product of zeroes are −3 and 2 respectively.\n(iii) Find the value of p(x) = 5x − 4x² + 3 at x = 2.`,
            answer: `(i) Zeroes are α = 4 and β = −2 (Sum = 2 = −(−2)/1; Product = −8 = −8/1)\n(ii) x² + 3x + 2\n(iii) p(2) = −3`,
            stepByStepExplanation: `(i) x² − 4x + 2x − 8 = (x − 4)(x + 2) = 0 ⇒ x = 4, −2. Sum = 4 + (−2) = 2 = −b/a; Product = 4(−2) = −8 = c/a.\n(ii) x² − (α + β)x + αβ = x² − (−3)x + 2 = x² + 3x + 2.\n(iii) p(2) = 5(2) − 4(2²) + 3 = 10 − 16 + 3 = −3.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: 'Remainder Theorem & Factor Theorem Problems',
            marks: 3,
            subQuestionsCount: 2,
            conceptUsed: 'Remainder R = p(a) and Factor Condition p(a) = 0',
            formulaExplained: 'If (x − a) is a factor of p(x), then p(a) = 0.',
            question: `Apply the Remainder and Factor Theorems:\n(i) Find the remainder when p(x) = x³ + 3x² + 3x + 1 is divided by (x + 1).\n(ii) Find the value of k if (x − 1) is a factor of p(x) = 2x² + kx + 3.`,
            answer: `(i) Remainder = 0\n(ii) k = −5`,
            stepByStepExplanation: `(i) Put x = −1: p(−1) = (−1)³ + 3(−1)² + 3(−1) + 1 = −1 + 3 − 3 + 1 = 0.\n(ii) Since (x − 1) is a factor, p(1) = 0 ⇒ 2(1)² + k(1) + 3 = 0 ⇒ 5 + k = 0 ⇒ k = −5.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'linear_equations_one_var':
    case 'linear_equations_two_vars': {
      const isTwoVar = blueprintId === 'linear_equations_two_vars';
      return {
        blueprintId,
        topicDisplayName: isTwoVar
          ? `${chapterTitle} — Simultaneous Equations, Elimination, Substitution & Cramer’s Rule`
          : `${chapterTitle} — Linear Equations in One Variable & Word Problems`,
        detailedExplanation: isTwoVar
          ? [
              `In "${chapterTitle}", the general form of a linear equation in two variables is ax + by + c = 0, where a, b, c are real numbers and a, b are not both zero.`,
              `A pair of simultaneous linear equations a₁x + b₁y = c₁ and a₂x + b₂y = c₂ can be solved by four standard textbook methods: (1) Elimination by Equating Coefficients, (2) Substitution Method, (3) Graphical Method, and (4) Cramer's Rule (Determinant Method: x = Dx/D, y = Dy/D).`,
              `Consistency Conditions: Unique solution (Intersecting lines) iff a₁/a₂ ≠ b₁/b₂; Infinitely many solutions (Coincident lines) iff a₁/a₂ = b₁/b₂ = c₁/c₂; No solution (Parallel lines) iff a₁/a₂ = b₁/b₂ ≠ c₁/c₂.`,
            ]
          : [
              `In "${chapterTitle}", an equation of the form ax + b = c (where a ≠ 0) is a linear equation in one variable x. It has a unique solution x = (c − b)/a.`,
              `By the Transposition Method, moving a term across the '=' sign reverses its operation: (+ becomes −, − becomes +, × becomes ÷, and ÷ becomes ×).`,
              `Always verify your final value of x by substituting it into the Left Hand Side (LHS) and Right Hand Side (RHS) to confirm LHS = RHS.`,
            ],
        topicWiseExplanations: isTwoVar
          ? [
              {
                topicTitle: `${chapterNumber}.1 Elimination, Substitution & Symmetric Equations (a₁ = b₂, b₁ = a₂)`,
                explanation: `When coefficients of x and y are interchanged (e.g., 99x + 101y = 499 and 101x + 99y = 501), use the Add–Subtract–Add method: first add the two equations to get (x + y), then subtract them to get (x − y), and solve the resulting simple pair.`,
                keyTakeaway: `Never multiply large interchanged coefficients directly; always add once and subtract once!`,
              },
              {
                topicTitle: `${chapterNumber}.2 Determinant of Order 2 & Cramer’s Rule`,
                explanation: `A determinant |[a, b], [c, d]| has value ad − bc. For a₁x + b₁y = c₁ and a₂x + b₂y = c₂: D = a₁b₂ − a₂b₁, Dx = c₁b₂ − c₂b₁, Dy = a₁c₂ − a₂c₁, giving x = Dx/D and y = Dy/D (for D ≠ 0).`,
                keyTakeaway: `Write equations in the exact form ax + by = c (constant on RHS) before forming determinants D, Dx, Dy.`,
              },
            ]
          : [
              {
                topicTitle: `${chapterNumber}.1 Solving Linear Equations by Balancing & Transposition`,
                explanation: `Collect all variable terms (x) on the LHS and all constant terms on the RHS. For fractional equations, multiply both sides by the LCM of denominators or cross-multiply.`,
                keyTakeaway: `Always substitute x back into the original equation to verify LHS = RHS.`,
              },
              {
                topicTitle: `${chapterNumber}.2 Formulating Linear Equations from Word Problems`,
                explanation: `Assign the unknown quantity as x, translate the given conditions into an algebraic equation, solve for x, and state the answer with proper units.`,
                keyTakeaway: `Consecutive integers: x, x+1, x+2; Consecutive even/odd integers: x, x+2, x+4.`,
              },
            ],
        keyPoints: isTwoVar
          ? [
              'Determinant of Order 2: |[a, b], [c, d]| = (a × d) − (b × c).',
              'Cramer’s Rule: x = Dx / D and y = Dy / D, where D = a₁b₂ − a₂b₁ ≠ 0.',
              'Unique Solution Condition: a₁/a₂ ≠ b₁/b₂; No Solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂; Infinite Solutions: a₁/a₂ = b₁/b₂ = c₁/c₂.',
              'Equations Reducible to Linear Form: Substitute 1/x = m and 1/y = n, solve for (m, n), then invert back to find (x, y).',
            ]
          : [
              'Standard Form: ax + b = 0 (a ≠ 0) has unique root x = −b/a.',
              'Transposition Rule: +a transposes to −a; ×a transposes to ÷a.',
              'Cross-Multiplication: If (ax + b)/(cx + d) = p/q, then q(ax + b) = p(cx + d).',
            ],
        keyDefinitions: isTwoVar
          ? [
              { term: 'Simultaneous Linear Equations', meaning: 'Two linear equations in two variables x and y considered together to find their common solution (x, y).' },
              { term: 'Determinant (D)', meaning: 'A square array of 4 numbers a, b, c, d arranged in 2 rows and 2 columns whose value is ad − bc.' },
              { term: 'Cramer’s Rule', meaning: 'Gabriel Cramer’s determinant method giving x = Dx/D and y = Dy/D for simultaneous linear equations.' },
            ]
          : [
              { term: 'Linear Equation in One Variable', meaning: 'An algebraic equation involving only one variable with highest power (degree) equal to 1.' },
              { term: 'Root / Solution of Equation', meaning: 'The value of the variable that makes LHS = RHS upon substitution.' },
            ],
        formulasAndRules: isTwoVar
          ? [
              'Determinant Value: D = |[a₁, b₁], [a₂, b₂]| = a₁b₂ − a₂b₁.',
              'Cramer’s Rule: Dx = c₁b₂ − c₂b₁;  Dy = a₁c₂ − a₂c₁;  x = Dx/D,  y = Dy/D.',
              'Two-Digit Number with tens digit y and units digit x = 10y + x; Number with digits reversed = 10x + y.',
            ]
          : [
              'ax + b = cx + d ⇒ (a − c)x = d − b ⇒ x = (d − b) / (a − c).',
              'Age k years ago = (Present Age − k); Age k years hence = (Present Age + k).',
            ],
        solvedExamples: isTwoVar
          ? [
              {
                prompt: 'Solve the simultaneous equations by Elimination AND by Cramer’s Rule: 3x − 4y = 10  and  4x + 3y = 5.',
                solution: `Method 1 (Cramer’s Rule):\n• Given: a₁ = 3, b₁ = −4, c₁ = 10;  a₂ = 4, b₂ = 3, c₂ = 5.\n• D = (3)(3) − (−4)(4) = 9 + 16 = 25.\n• Dx = (10)(3) − (−4)(5) = 30 + 20 = 50.\n• Dy = (3)(5) − (10)(4) = 15 − 40 = −25.\n• x = Dx / D = 50 / 25 = 2;   y = Dy / D = −25 / 25 = −1.\n• Verification: In Eq 1, 3(2) − 4(−1) = 6 + 4 = 10 = RHS. Solution: (x, y) = (2, −1).`,
              },
              {
                prompt: 'Solve the symmetric equations: 99x + 101y = 499  and  101x + 99y = 501.',
                solution: `Step 1: Add Eq (1) and Eq (2): 200x + 200y = 1000 ⇒ Divide by 200: x + y = 5 ... (3)\nStep 2: Subtract Eq (1) from Eq (2): 2x − 2y = 2 ⇒ Divide by 2: x − y = 1 ... (4)\nStep 3: Add Eq (3) and Eq (4): 2x = 6 ⇒ x = 3.\nStep 4: Substitute x = 3 in Eq (3): 3 + y = 5 ⇒ y = 2. Solution: (x, y) = (3, 2).`,
              },
            ]
          : [
              {
                prompt: 'Solve for x and verify: 5x − 7 = 2x + 8.',
                solution: `Step 1: Transpose 2x to LHS and −7 to RHS: 5x − 2x = 8 + 7.\nStep 2: 3x = 15 ⇒ x = 15 ÷ 3 = 5.\nStep 3: Verification: LHS = 5(5) − 7 = 18; RHS = 2(5) + 8 = 18 (LHS = RHS Verified).`,
              },
              {
                prompt: 'The sum of three consecutive natural numbers is 48. Find the numbers.',
                solution: `Step 1: Let the three consecutive numbers be x, x + 1, and x + 2.\nStep 2: x + (x + 1) + (x + 2) = 48 ⇒ 3x + 3 = 48 ⇒ 3x = 45 ⇒ x = 15.\nStep 3: The three consecutive numbers are 15, 16, and 17 (Check: 15 + 16 + 17 = 48).`,
              },
            ],
        exerciseQuestions: isTwoVar
          ? [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iii)',
                typeLabel: 'Solve Simultaneous Equations by Elimination & Substitution',
                marks: 4,
                subQuestionsCount: 3,
                conceptUsed: 'Elimination of Variables and Add–Subtract Symmetric Method',
                formulaExplained: 'Equate coefficients of one variable, add/subtract to eliminate it, then back-substitute.',
                question: `Solve the following pairs of simultaneous linear equations:\n(i) 5x + 3y = 9  and  2x − 3y = 12\n(ii) 3a + 5b = 26  and  a + 5b = 22\n(iii) 49x − 57y = 172  and  57x − 49y = 252`,
                answer: `(i) (x, y) = (3, −2)\n(ii) (a, b) = (2, 4)\n(iii) (x, y) = (7, 3)`,
                stepByStepExplanation: `(i) Add equations directly: 7x = 21 ⇒ x = 3. Put x = 3 in 5(3) + 3y = 9 ⇒ 3y = −6 ⇒ y = −2.\n(ii) Subtract second from first: 2a = 4 ⇒ a = 2. Put a = 2 in 2 + 5b = 22 ⇒ 5b = 20 ⇒ b = 4.\n(iii) Add both: 106x − 106y = 424 ⇒ x − y = 4. Subtract first from second: 8x + 8y = 80 ⇒ x + y = 10. Adding gives 2x = 14 ⇒ x = 7, y = 3.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(iii)',
                typeLabel: 'Determinants & Cramer’s Rule Solutions',
                marks: 4,
                subQuestionsCount: 3,
                conceptUsed: '2×2 Determinant Evaluation and Cramer’s Rule',
                formulaExplained: 'D = a₁b₂ − a₂b₁; Dx = c₁b₂ − c₂b₁; Dy = a₁c₂ − a₂c₁; x = Dx/D, y = Dy/D.',
                question: `Solve using Determinants and Cramer’s Rule:\n(i) Find the value of the determinant: |[5, 3], [−7, 0]|\n(ii) Solve by Cramer’s Rule: 3x − 2y = 3  and  2x + y = 16\n(iii) Solve by Cramer’s Rule: 4x + 3y = 4  and  6x + 5y = 8`,
                answer: `(i) Determinant value = 21\n(ii) D = 7, Dx = 35, Dy = 42 ⇒ (x, y) = (5, 6)\n(iii) D = 2, Dx = −4, Dy = 8 ⇒ (x, y) = (−2, 4)`,
                stepByStepExplanation: `(i) (5 × 0) − (3 × −7) = 0 + 21 = 21.\n(ii) D = 3(1) − (−2)(2) = 7; Dx = 3(1) − (−2)(16) = 35; Dy = 3(16) − 3(2) = 42 ⇒ x = 35/7 = 5, y = 42/7 = 6.\n(iii) D = 4(5) − 3(6) = 2; Dx = 4(5) − 3(8) = −4; Dy = 4(8) − 4(6) = 8 ⇒ x = −4/2 = −2, y = 8/2 = 4.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex3,
                qNo: 'Q.3 (i)–(ii)',
                typeLabel: 'Equations Reducible to Linear Form & Consistency Conditions',
                marks: 4,
                subQuestionsCount: 2,
                conceptUsed: 'Reciprocal Substitution (1/x = m, 1/y = n) & Parallel/Infinite Solution Ratio Test',
                formulaExplained: 'For infinite solutions: a₁/a₂ = b₁/b₂ = c₁/c₂.',
                question: `Solve the following:\n(i) Solve: 2/x − 3/y = 15  and  8/x + 5/y = 77\n(ii) For what value of k will the pair of equations kx + 3y = k − 3 and 12x + ky = k have infinitely many solutions?`,
                answer: `(i) (x, y) = (1/6, 1/3)\n(ii) k = 6`,
                stepByStepExplanation: `(i) Put 1/x = m and 1/y = n: 2m − 3n = 15 and 8m + 5n = 77. Solving gives m = 6, n = 3 ⇒ x = 1/6, y = 1/3.\n(ii) k/12 = 3/k = (k−3)/k ⇒ k² = 36 ⇒ k = ±6. Also 3/k = (k−3)/k satisfies for k = 6 (since 3/6 = 3/6).`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex4,
                qNo: 'Q.4 (i)–(ii)',
                typeLabel: 'Board Textbook Word Problems on Simultaneous Equations',
                marks: 4,
                subQuestionsCount: 2,
                conceptUsed: 'Two-Digit Number Modeling (10y + x) and Age/Fraction Systems',
                formulaExplained: 'Original 2-digit number = 10y + x; Reversed number = 10x + y.',
                question: `Solve the following word problems step-by-step:\n(i) The sum of a two-digit number and the number obtained by interchanging its digits is 99. If the digits differ by 3 (tens digit > units digit), find the two-digit number.\n(ii) Two numbers differ by 3. The sum of twice the smaller number and thrice the greater number is 19. Find the numbers.`,
                answer: `(i) The two-digit number is 63\n(ii) Greater number = 5, Smaller number = 2`,
                stepByStepExplanation: `(i) Let tens digit = y and units digit = x. Then (10y + x) + (10x + y) = 99 ⇒ 11(x + y) = 99 ⇒ x + y = 9. Given y − x = 3. Adding gives 2y = 12 ⇒ y = 6, x = 3. Number = 63 (Check: 63 + 36 = 99).\n(ii) Let greater = x, smaller = y. Then x − y = 3 and 3x + 2y = 19. Multiply first by 2: 2x − 2y = 6. Add: 5x = 25 ⇒ x = 5, y = 2.`,
                calculationVerified: true,
              },
            ]
          : [
              {
                exerciseSetLabel: ex1,
                qNo: 'Q.1 (i)–(iv)',
                typeLabel: 'Solve Linear Equations in One Variable',
                marks: 4,
                subQuestionsCount: 4,
                conceptUsed: 'Transposition and Cross-Multiplication',
                formulaExplained: 'ax + b = cx + d ⇒ x = (d − b)/(a − c).',
                question: `Solve the following equations and verify each root:\n(i) 3x + 12 = 27\n(ii) 5(x − 3) = 3(x + 2) − 1\n(iii) x/3 + 5/2 = −3/2\n(iv) (2x − 3) / (3x + 2) = 1 / 4`,
                answer: `(i) x = 5\n(ii) x = 10\n(iii) x = −12\n(iv) x = 14/5`,
                stepByStepExplanation: `(i) 3x = 27 − 12 = 15 ⇒ x = 5.\n(ii) 5x − 15 = 3x + 5 ⇒ 2x = 20 ⇒ x = 10.\n(iii) x/3 = −3/2 − 5/2 = −4 ⇒ x = −12.\n(iv) Cross-multiply: 4(2x − 3) = 1(3x + 2) ⇒ 8x − 12 = 3x + 2 ⇒ 5x = 14 ⇒ x = 14/5.`,
                calculationVerified: true,
              },
              {
                exerciseSetLabel: ex2,
                qNo: 'Q.2 (i)–(ii)',
                typeLabel: 'Word Problems on Ages, Numbers & Perimeter',
                marks: 4,
                subQuestionsCount: 2,
                conceptUsed: 'Algebraic Equation Formulation from Verbal Conditions',
                formulaExplained: 'Perimeter of Rectangle = 2(Length + Breadth).',
                question: `Solve the word problems step-by-step:\n(i) Mother is 25 years older than her son. After 8 years, the ratio of the son’s age to the mother’s age will be 4/9. Find the son’s present age.\n(ii) The length of a rectangle is 5 cm more than its breadth. If the perimeter of the rectangle is 50 cm, find its length and breadth.`,
                answer: `(i) Son’s present age = 12 years (Mother’s present age = 37 years)\n(ii) Breadth = 10 cm, Length = 15 cm`,
                stepByStepExplanation: `(i) Let son's age = x, mother's age = x + 25. After 8 years: (x + 8)/(x + 33) = 4/9 ⇒ 9x + 72 = 4x + 132 ⇒ 5x = 60 ⇒ x = 12 years.\n(ii) Let breadth = x, length = x + 5. 2(x + x + 5) = 50 ⇒ 2x + 5 = 25 ⇒ 2x = 20 ⇒ x = 10 cm, length = 15 cm.`,
                calculationVerified: true,
              },
            ],
      };
    }

    case 'quadratic_equations': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Factorisation, Quadratic Formula, Discriminant & Nature of Roots`,
        detailedExplanation: [
          `In "${chapterTitle}", the standard form of a quadratic equation in variable x is ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.`,
          `A quadratic equation is solved by three standard methods: (1) Factorisation (splitting the middle term), (2) Completing the Square, and (3) The Quadratic Formula (Sridharacharya’s Formula): x = [−b ± √(b² − 4ac)] / (2a).`,
          `The expression Δ = b² − 4ac is called the Discriminant. If Δ > 0, roots are real and unequal; if Δ = 0, roots are real and equal; if Δ < 0, roots are not real. For roots α and β: α + β = −b/a and αβ = c/a.`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Solving Quadratic Equations by Factorisation & Formula Method`,
            explanation: `In ax² + bx + c = 0, find two numbers p, q such that p + q = b and p × q = ac, or directly substitute a, b, c into x = [−b ± √(b² − 4ac)] / (2a).`,
            keyTakeaway: `Always write the equation in standard form ax² + bx + c = 0 before identifying a, b, and c.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Discriminant (Δ = b² − 4ac), Nature of Roots & Forming Equations`,
            explanation: `The quadratic equation whose roots are α and β is x² − (α + β)x + αβ = 0. Useful symmetric identities: α² + β² = (α + β)² − 2αβ; α³ + β³ = (α + β)³ − 3αβ(α + β).`,
            keyTakeaway: `For real and equal roots, set Δ = b² − 4ac = 0.`,
          },
        ],
        keyPoints: [
          'Standard Form: ax² + bx + c = 0 (a ≠ 0; degree = 2; at most 2 roots).',
          'Quadratic Formula: x = [−b ± √(b² − 4ac)] / (2a).',
          'Discriminant Δ = b² − 4ac: Δ > 0 (Real & Distinct), Δ = 0 (Real & Equal), Δ < 0 (No Real Roots).',
          'Relation Between Roots & Coefficients: α + β = −b/a;  αβ = c/a;  Equation: x² − (α + β)x + αβ = 0.',
        ],
        keyDefinitions: [
          { term: 'Quadratic Equation', meaning: 'A polynomial equation of degree 2 in one variable of the form ax² + bx + c = 0 (a ≠ 0).' },
          { term: 'Discriminant (Δ)', meaning: 'The quantity Δ = b² − 4ac which determines the nature of the roots without solving the equation.' },
        ],
        formulasAndRules: [
          'Quadratic Formula: x = [−b ± √(b² − 4ac)] / (2a).',
          'Discriminant: Δ = b² − 4ac.',
          'Root Relations: α + β = −b/a,  αβ = c/a;  x² − (α + β)x + αβ = 0.',
        ],
        solvedExamples: [
          {
            prompt: 'Solve by Factorisation: x² − 15x + 54 = 0.',
            solution: `Step 1: Find two factors of +54 whose sum is −15: (−9) and (−6) [since (−9)+(−6) = −15 and (−9)(−6) = 54].\nStep 2: x² − 9x − 6x + 54 = 0 ⇒ x(x − 9) − 6(x − 9) = 0 ⇒ (x − 9)(x − 6) = 0.\nStep 3: Either x − 9 = 0 or x − 6 = 0 ⇒ x = 9 or x = 6.`,
          },
          {
            prompt: 'Solve using the Quadratic Formula: x² + 6x + 5 = 0.',
            solution: `Step 1: Compare with ax² + bx + c = 0: a = 1, b = 6, c = 5.\nStep 2: Discriminant Δ = b² − 4ac = 6² − 4(1)(5) = 36 − 20 = 16.\nStep 3: x = [−b ± √Δ] / (2a) = [−6 ± √16] / 2 = (−6 ± 4) / 2.\nStep 4: x = (−6 + 4)/2 = −1  or  x = (−6 − 4)/2 = −5. Roots are −1 and −5.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iv)',
            typeLabel: 'Solve Quadratic Equations by Factorisation',
            marks: 4,
            subQuestionsCount: 4,
            conceptUsed: 'Zero-Product Property (A × B = 0 ⇒ A = 0 or B = 0)',
            formulaExplained: 'Split b into p + q such that p · q = a · c.',
            question: `Solve the following quadratic equations by factorisation:\n(i) x² − 5x − 24 = 0\n(ii) 2y² + 27y + 13 = 0\n(iii) 5m² = 22m + 15\n(iv) 25m² = 9`,
            answer: `(i) x = 8 or x = −3\n(ii) y = −13 or y = −1/2\n(iii) m = 5 or m = −3/5\n(iv) m = 3/5 or m = −3/5`,
            stepByStepExplanation: `(i) (x − 8)(x + 3) = 0 ⇒ x = 8, −3.\n(ii) 2y² + 26y + y + 13 = 2y(y + 13) + 1(y + 13) = (y + 13)(2y + 1) = 0 ⇒ y = −13, −1/2.\n(iii) 5m² − 25m + 3m − 15 = 5m(m − 5) + 3(m − 5) = (m − 5)(5m + 3) = 0 ⇒ m = 5, −3/5.\n(iv) (5m)² − 3² = 0 ⇒ (5m − 3)(5m + 3) = 0 ⇒ m = ±3/5.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'Solve by Quadratic Formula & Completing the Square',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Quadratic Formula x = [−b ± √(b² − 4ac)] / (2a)',
            formulaExplained: 'Calculate b² − 4ac first, then substitute into the formula.',
            question: `Solve using the Quadratic Formula:\n(i) x² + 10x + 2 = 0\n(ii) 3m² + 2m − 7 = 0\n(iii) y² + (1/3)y = 2`,
            answer: `(i) x = −5 ± √23\n(ii) m = (−1 ± √22) / 3\n(iii) y = 4/3 or y = −5/3 (after clearing fractions: 3y² + y − 6 = 0 → y = [−1 ± √73]/6)`,
            stepByStepExplanation: `(i) a = 1, b = 10, c = 2 ⇒ Δ = 100 − 8 = 92 ⇒ x = (−10 ± √92)/2 = (−10 ± 2√23)/2 = −5 ± √23.\n(ii) a = 3, b = 2, c = −7 ⇒ Δ = 4 − 4(3)(−7) = 88 ⇒ m = (−2 ± 2√22)/6 = (−1 ± √22)/3.\n(iii) Multiply by 3: 3y² + y − 6 = 0 ⇒ Δ = 1 − 4(3)(−6) = 73 ⇒ y = (−1 ± √73)/6.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Discriminant, Nature of Roots & Forming Quadratic Equations',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Discriminant Analysis and Root–Coefficient Relations',
            formulaExplained: 'Δ = b² − 4ac; For equal roots, Δ = 0; Equation is x² − (α + β)x + αβ = 0.',
            question: `Solve the following:\n(i) Determine the nature of roots of 2x² − 5x + 7 = 0.\n(ii) Find the value of k if the roots of kx(x − 2) + 6 = 0 are real and equal.\n(iii) Form the quadratic equation whose roots are 3 and −10.`,
            answer: `(i) Δ = −31 < 0 ⇒ The roots are not real\n(ii) k = 6\n(iii) x² + 7x − 30 = 0`,
            stepByStepExplanation: `(i) a = 2, b = −5, c = 7 ⇒ Δ = (−5)² − 4(2)(7) = 25 − 56 = −31 < 0 (Not real).\n(ii) kx² − 2kx + 6 = 0. For equal roots, Δ = (−2k)² − 4(k)(6) = 0 ⇒ 4k² − 24k = 0 ⇒ 4k(k − 6) = 0. Since k ≠ 0, k = 6.\n(iii) α + β = 3 + (−10) = −7; αβ = 3(−10) = −30 ⇒ x² − (−7)x + (−30) = 0 ⇒ x² + 7x − 30 = 0.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex4,
            qNo: 'Q.4 (i)–(ii)',
            typeLabel: 'Board Textbook Word Problems on Quadratic Equations',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Quadratic Modeling of Consecutive Numbers, Ages and Areas',
            formulaExplained: 'Discard negative roots when the variable represents physical dimensions, age, or natural numbers.',
            question: `Solve the word problems step-by-step:\n(i) The sum of the squares of two consecutive even natural numbers is 244. Find the numbers.\n(ii) In an orchard, the number of trees in each column is 5 more than that in each row. If the total number of trees is 150, find the number of trees in each row.`,
            answer: `(i) The two consecutive even natural numbers are 10 and 12\n(ii) Number of trees in each row = 10 (and in each column = 15)`,
            stepByStepExplanation: `(i) Let the consecutive even natural numbers be x and (x + 2). Then x² + (x + 2)² = 244 ⇒ 2x² + 4x − 240 = 0 ⇒ x² + 2x − 120 = 0 ⇒ (x + 12)(x − 10) = 0. Since x ∈ N, x = 10 and x + 2 = 12 (Check: 10² + 12² = 100 + 144 = 244).\n(ii) Let trees per row = x, trees per column = x + 5. Then x(x + 5) = 150 ⇒ x² + 5x − 150 = 0 ⇒ (x + 15)(x − 10) = 0 ⇒ x = 10.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'arithmetic_progression': {
      return {
        blueprintId,
        topicDisplayName: `${chapterTitle} — Common Difference d, nth Term (tₙ) & Sum of First n Terms (Sₙ)`,
        detailedExplanation: [
          `In "${chapterTitle}", an Arithmetic Progression (A.P.) is a sequence of numbers in which the difference between any two consecutive terms is constant: tₙ₊₁ − tₙ = d (called the Common Difference).`,
          `If the first term is 'a' and the common difference is 'd', the general terms of the A.P. are a, a + d, a + 2d, a + 3d, ..., and the nth term is given by tₙ = a + (n − 1)d.`,
          `The sum of the first n terms of an A.P. is given by Sₙ = (n / 2)[2a + (n − 1)d] or Sₙ = (n / 2)[t₁ + tₙ].`,
        ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Identifying an A.P. & Finding the nth Term (tₙ)`,
            explanation: `To verify whether a sequence t₁, t₂, t₃, t₄, ... is an A.P., check that t₂ − t₁ = t₃ − t₂ = t₄ − t₃ = d. Then use tₙ = a + (n − 1)d to find any specific term or check whether a given value belongs to the A.P.`,
            keyTakeaway: `The number of terms n must always be a positive integer (n ∈ N).`,
          },
          {
            topicTitle: `${chapterNumber}.2 Sum of First n Terms (Sₙ) & Real-World A.P. Applications`,
            explanation: `Use Sₙ = (n/2)[2a + (n − 1)d] when a, d, and n are known, or Sₙ = (n/2)[t₁ + tₙ] when the first and last terms are known. Three consecutive terms in an A.P. are taken as (a − d), a, (a + d).`,
            keyTakeaway: `Sum of first n natural numbers = n(n + 1)/2; Sum of first n odd natural numbers = n²; Sum of first n even natural numbers = n(n + 1).`,
          },
        ],
        keyPoints: [
          'Common Difference: d = t₂ − t₁ = t₃ − t₂ (can be positive, negative, or zero).',
          'nth Term Formula: tₙ = a + (n − 1)d.',
          'Sum of First n Terms: Sₙ = (n / 2)[2a + (n − 1)d] = (n / 2)[t₁ + tₙ].',
          'Convenient Selection of Consecutive Terms: 3 terms → a − d, a, a + d; 4 terms → a − 3d, a − d, a + d, a + 3d.',
        ],
        keyDefinitions: [
          { term: 'Arithmetic Progression (A.P.)', meaning: 'A sequence in which the difference between any term and its preceding term is constant throughout.' },
          { term: 'Common Difference (d)', meaning: 'The constant difference d = tₖ₊₁ − tₖ between consecutive terms of an A.P.' },
        ],
        formulasAndRules: [
          'tₙ = a + (n − 1)d.',
          'Sₙ = (n / 2) × [2a + (n − 1)d] = (n / 2) × [First Term + Last Term].',
          'tₙ = Sₙ − Sₙ₋₁ (for n > 1).',
        ],
        solvedExamples: [
          {
            prompt: 'Find the 24th term of the Arithmetic Progression: 12, 16, 20, 24, ...',
            solution: `Step 1: Here first term a = 12, common difference d = 16 − 12 = 4, and n = 24.\nStep 2: Formula: tₙ = a + (n − 1)d.\nStep 3: t₂₄ = 12 + (24 − 1) × 4 = 12 + 23 × 4 = 12 + 92 = 104.`,
          },
          {
            prompt: 'Find the sum of the first 123 even natural numbers.',
            solution: `Step 1: Even natural numbers form the A.P.: 2, 4, 6, 8, ... with a = 2, d = 2, n = 123.\nStep 2: Sₙ = (n/2)[2a + (n − 1)d] = (123/2)[2(2) + (122)(2)] = (123/2)[4 + 244] = (123/2) × 248.\nStep 3: S₁₂₃ = 123 × 124 = 15,252.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iii)',
            typeLabel: 'Verify A.P., Find First Term (a), Common Difference (d) & Write Terms',
            marks: 3,
            subQuestionsCount: 3,
            conceptUsed: 'Constant Consecutive Difference Test (t₂ − t₁ = t₃ − t₂)',
            formulaExplained: 't₁ = a, t₂ = a + d, t₃ = a + 2d, t₄ = a + 3d.',
            question: `Solve the following:\n(i) Check whether 2, 4, 6, 8, ... is an A.P. and find its common difference d.\n(ii) Write the first four terms of the A.P. whose first term a = 10 and common difference d = −3.\n(iii) Find a and d for the A.P.: 1, −1, −3, −5, ...`,
            answer: `(i) Yes, it is an A.P. with common difference d = 2\n(ii) 10, 7, 4, 1\n(iii) First term a = 1, Common difference d = −2`,
            stepByStepExplanation: `(i) t₂ − t₁ = 4 − 2 = 2; t₃ − t₂ = 6 − 4 = 2; t₄ − t₃ = 8 − 6 = 2 (Constant ⇒ A.P.).\n(ii) t₁ = 10, t₂ = 10 − 3 = 7, t₃ = 7 − 3 = 4, t₄ = 4 − 3 = 1.\n(iii) a = t₁ = 1; d = t₂ − t₁ = −1 − 1 = −2.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(iii)',
            typeLabel: 'nth Term of an A.P. (tₙ = a + (n − 1)d)',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'General Term Formula of an Arithmetic Progression',
            formulaExplained: 'tₙ = a + (n − 1)d.',
            question: `Solve using the nth term formula:\n(i) Find the 19th term of the A.P.: 7, 13, 19, 25, ...\n(ii) Which term of the A.P. 11, 8, 5, 2, ... is −151?\n(iii) How many three-digit natural numbers are divisible by 5?`,
            answer: `(i) t₁₉ = 115\n(ii) 55th term (n = 55)\n(iii) 180 three-digit numbers`,
            stepByStepExplanation: `(i) a = 7, d = 6 ⇒ t₁₉ = 7 + (19 − 1) × 6 = 7 + 108 = 115.\n(ii) a = 11, d = −3, tₙ = −151 ⇒ −151 = 11 + (n − 1)(−3) ⇒ −162 = −3(n − 1) ⇒ n − 1 = 54 ⇒ n = 55.\n(iii) 3-digit numbers divisible by 5: 100, 105, 110, ..., 995. Here a = 100, d = 5, tₙ = 995 ⇒ 995 = 100 + (n − 1)5 ⇒ 895/5 = n − 1 ⇒ 179 = n − 1 ⇒ n = 180.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(iii)',
            typeLabel: 'Sum of First n Terms (Sₙ)',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: 'Summation Formula Sₙ = (n/2)[2a + (n − 1)d]',
            formulaExplained: 'Sₙ = (n/2)[2a + (n − 1)d] or Sₙ = (n/2)[t₁ + tₙ].',
            question: `Find the following sums:\n(i) Find the sum of the first 20 terms of the A.P.: 6, 10, 14, 18, ...\n(ii) Find the sum of all even natural numbers from 1 to 350.\n(iii) If the first term of an A.P. is 10 and the 20th term is 86, find S₂₀.`,
            answer: `(i) S₂₀ = 880\n(ii) Sum = 30,800 (175 even terms from 2 to 350)\n(iii) S₂₀ = 960`,
            stepByStepExplanation: `(i) a = 6, d = 4, n = 20 ⇒ S₂₀ = (20/2)[2(6) + 19(4)] = 10 × (12 + 76) = 880.\n(ii) Even numbers: 2, 4, ..., 350 ⇒ n = 175. S₁₇₅ = (175/2)(2 + 350) = 175 × 176 = 30,800.\n(iii) S₂₀ = (20/2)[t₁ + t₂₀] = 10 × (10 + 86) = 960.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex4,
            qNo: 'Q.4 (i)–(ii)',
            typeLabel: 'Board Word Problems on Arithmetic Progression',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: 'Real-World Savings and Auditorium Seating Progression',
            formulaExplained: 'Total across n rows/months = Sₙ = (n/2)[2a + (n − 1)d].',
            question: `Solve the word problems step-by-step:\n(i) Sachin invested ₹5,000 in the 1st year, ₹7,000 in the 2nd year, ₹9,000 in the 3rd year in National Savings Certificates. Find the total amount he invested in 12 years.\n(ii) There is an auditorium with 27 rows of seats. There are 20 seats in the first row, 22 seats in the second row, 24 seats in the third row, and so on. Find the number of seats in the 15th row and the total number of seats in the auditorium.`,
            answer: `(i) Total investment in 12 years = ₹1,92,000\n(ii) Seats in 15th row = 48 seats; Total seats in 27 rows = 1,242 seats`,
            stepByStepExplanation: `(i) a = 5000, d = 2000, n = 12 ⇒ S₁₂ = (12/2)[2(5000) + 11(2000)] = 6 × [10000 + 22000] = 6 × 32000 = ₹1,92,000.\n(ii) a = 20, d = 2, n = 27. t₁₅ = 20 + 14(2) = 48 seats. S₂₇ = (27/2)[2(20) + 26(2)] = (27/2)(40 + 52) = 27 × 46 = 1,242 seats.`,
            calculationVerified: true,
          },
        ],
      };
    }

    case 'ratio_proportion_variation':
    case 'percentage_profit_loss_discount':
    case 'simple_compound_interest':
    case 'financial_planning_gst_commercial': {
      const isGst = blueprintId === 'financial_planning_gst_commercial';
      const isInterest = blueprintId === 'simple_compound_interest';
      const isRatio = blueprintId === 'ratio_proportion_variation';
      return {
        blueprintId,
        topicDisplayName: isGst
          ? `${chapterTitle} — GST (CGST & SGST), Input Tax Credit, Shares & Recurring Deposits`
          : isInterest
          ? `${chapterTitle} — Simple Interest & Compound Interest Formulae`
          : isRatio
          ? `${chapterTitle} — Properties of Equal Ratios, Componendo–Dividendo & Direct/Inverse Variation`
          : `${chapterTitle} — Percentage, Profit & Loss, Discount and Commission`,
        detailedExplanation: isGst
          ? [
              `In "${chapterTitle}", Goods and Services Tax (GST) is a unified indirect tax system. For intra-state transactions, GST is divided equally into Central GST (CGST) and State GST (SGST), so CGST = SGST = (1/2) × Rate of GST.`,
              `In the trading chain (Manufacturer → Wholesaler → Retailer → Consumer), GST Payable by a registered trader = Output Tax − Input Tax Credit (ITC).`,
              `For Shares and Mutual Funds: Market Value (MV) can be at par (MV = FV), at premium (MV > FV), or at discount (MV < FV). Dividend is always calculated as a percentage of Face Value (FV), and Rate of Return (RoR) = (Dividend Income / Sum Invested) × 100%.`,
            ]
          : isInterest
          ? [
              `In "${chapterTitle}", students compare Simple Interest (where principal remains constant throughout the tenure) with Compound Interest (where interest at the end of each year is added to the principal for the next year).`,
              `Simple Interest: I = (P × R × N) / 100 and Amount A = P + I. Compound Amount: A = P(1 + R / 100)ᴺ and Compound Interest CI = A − P.`,
            ]
          : isRatio
          ? [
              `In "${chapterTitle}", if a/b = c/d, the four quantities are in proportion (ad = bc). Properties of equal ratios include Invertendo (b/a = d/c), Alternendo (a/c = b/d), Componendo [(a+b)/b = (c+d)/d], Dividendo [(a−b)/b = (c−d)/d], and Componendo–Dividendo [(a+b)/(a−b) = (c+d)/(c−d)].`,
              `By the Theorem on Equal Ratios, if a/b = c/d = k, then each ratio equals (a + c)/(b + d). Direct variation satisfies x/y = k, whereas Inverse variation satisfies x × y = k.`,
            ]
          : [
              `In "${chapterTitle}", students solve commercial arithmetic problems on Percentage, Profit (SP − CP), Loss (CP − SP), Discount on Marked Price (MP − SP), and Commission/Rebate.`,
              `Profit% and Loss% are always calculated on Cost Price (CP), whereas Discount% is always calculated on Marked Price (Catalog/Printed Price).`,
            ],
        topicWiseExplanations: [
          {
            topicTitle: `${chapterNumber}.1 Core Principles & Governing Formulas`,
            explanation: isGst
              ? `Rate of CGST = Rate of SGST = (Rate of GST) / 2. Taxable Value is the value on which GST is charged. Total Invoice Value = Taxable Value + CGST + SGST. GST Payable = Output Tax − ITC.`
              : isInterest
              ? `Simple Interest SI = (P × R × T)/100. For Compound Interest compounded annually, A = P(1 + R/100)ⁿ and CI = A − P.`
              : isRatio
              ? `Componendo–Dividendo: If a/b = c/d, then (a + b)/(a − b) = (c + d)/(c − d). Continued proportion: b is the geometric mean of a and c iff b² = ac.`
              : `Profit = SP − CP; Profit% = (Profit / CP) × 100. Discount = Marked Price × (Discount% / 100); Selling Price = Marked Price − Discount.`,
            keyTakeaway: isGst
              ? `CGST and SGST amounts on any intra-state tax invoice are always equal.`
              : `Always identify the base value (Principal, Cost Price, Marked Price, or Constant of Variation k) before applying the percentage or ratio formula.`,
          },
          {
            topicTitle: `${chapterNumber}.2 Multi-Step Commercial & Algebraic Problem Solving`,
            explanation: isGst
              ? `For Shares: Sum Invested (for 1 share) = MV; Dividend per share = (Dividend% / 100) × FV; Number of shares = Total Investment / MV.`
              : `Substitute the given parameters step-by-step and verify units (₹, %, years) at the end of every calculation.`,
            keyTakeaway: `Dividend is always calculated on Face Value (FV), never on Market Value (MV).`,
          },
        ],
        keyPoints: isGst
          ? [
              'Intra-state GST Split: Rate of CGST = Rate of SGST = (1/2) × Rate of GST.',
              'ITC Formula: GST Payable = Output Tax − Input Tax Credit (ITC).',
              'Shares Formula: Dividend per share = (Rate of Dividend / 100) × Face Value (FV).',
              'Rate of Return (RoR) = (Total Dividend / Total Investment) × 100%.',
            ]
          : [
              'Simple Interest: SI = (P × R × T) / 100;  Amount A = P + SI.',
              'Compound Interest: A = P(1 + R / 100)ⁿ;  CI = A − P.',
              'Profit% = (Profit / CP) × 100%;  Discount = MP − SP.',
              'Theorem on Equal Ratios: If a/b = c/d, then each ratio = (la + mc) / (lb + md).',
            ],
        keyDefinitions: [
          {
            term: isGst ? 'Input Tax Credit (ITC)' : 'Principal / Base Quantity',
            meaning: isGst
              ? 'The GST paid by a registered trader at the time of purchase which is deducted from Output Tax to compute net GST payable.'
              : 'The initial value or base amount upon which percentage, interest, or ratio changes are calculated.',
          },
          {
            term: isGst ? 'Face Value (FV) & Market Value (MV)' : 'Compound Interest & Componendo–Dividendo',
            meaning: isGst
              ? 'FV is the value printed on the share certificate; MV is the price at which the share is bought or sold in the stock market.'
              : 'Interest calculated on accumulated amount A = P(1+R/100)ⁿ; ratio transformation (a+b)/(a−b) = (c+d)/(c−d).',
          },
        ],
        formulasAndRules: isGst
          ? [
              'CGST = SGST = (1/2) × GST;  Total Invoice Value = Taxable Value + GST.',
              'GST Payable = Output Tax − Input Tax Credit (ITC).',
              'Rate of Return = (Dividend Income / Sum Invested) × 100%;  ICSE RD Interest I = P × [n(n+1)/(2×12)] × (r/100).',
            ]
          : [
              'SI = (P × R × T) / 100;  Compound Amount A = P(1 + R/100)ⁿ;  CI = A − P.',
              'Profit% = [(SP − CP)/CP] × 100;  SP = MP × (100 − Discount%)/100.',
              'Componendo–Dividendo: a/b = c/d ⇒ (a + b)/(a − b) = (c + d)/(c − d);  Geometric Mean: b² = ac.',
            ],
        solvedExamples: [
          {
            prompt: isGst
              ? 'A wristwatch belt has a taxable value of ₹586. Rate of GST is 18%. Find the CGST, SGST, and the total price paid by the customer.'
              : 'Find the Compound Amount and Compound Interest on ₹8,000 at 10% p.a. for 2 years compounded annually.',
            solution: isGst
              ? `Step 1: Taxable Value = ₹586; Rate of GST = 18% ⇒ Rate of CGST = 9%, Rate of SGST = 9%.\nStep 2: Total GST = 18% of ₹586 = (18 / 100) × 586 = ₹105.48.\nStep 3: CGST = SGST = ₹105.48 ÷ 2 = ₹52.74 each.\nStep 4: Total price paid by customer = ₹586 + ₹105.48 = ₹691.48.`
              : `Step 1: Given P = ₹8,000, R = 10% p.a., N = 2 years.\nStep 2: A = P(1 + R/100)ᴺ = 8000 × (1 + 10/100)² = 8000 × (11/10) × (11/10) = 80 × 121 = ₹9,680.\nStep 3: Compound Interest CI = A − P = ₹9,680 − ₹8,000 = ₹1,680.`,
          },
          {
            prompt: isGst
              ? 'Chetana Store paid total GST of ₹1,00,500 at the time of purchase and collected GST of ₹1,22,500 at the time of sale. Find the GST payable by Chetana Store.'
              : 'If a/b = 7/3, find the value of (5a + 3b) / (5a − 3b) using Componendo–Dividendo.',
            solution: isGst
              ? `Step 1: Input Tax Credit (ITC) = ₹1,00,500; Output Tax = ₹1,22,500.\nStep 2: GST Payable = Output Tax − ITC = ₹1,22,500 − ₹1,00,500 = ₹22,000.\nStep 3: CGST Payable = SGST Payable = ₹22,000 ÷ 2 = ₹11,000 each.`
              : `Step 1: Given a/b = 7/3. Multiply both sides by 5/3: (5a)/(3b) = (5 × 7)/(3 × 3) = 35/9.\nStep 2: By Componendo–Dividendo: (5a + 3b)/(5a − 3b) = (35 + 9)/(35 − 9) = 44/26 = 22/13.`,
          },
        ],
        exerciseQuestions: [
          {
            exerciseSetLabel: ex1,
            qNo: 'Q.1 (i)–(iii)',
            typeLabel: isGst
              ? 'GST, CGST, SGST & Tax Invoice Calculations'
              : 'Ratio, Proportion, Percentage & Interest Drills',
            marks: 4,
            subQuestionsCount: 3,
            conceptUsed: isGst
              ? 'Intra-state GST Split (CGST = SGST = GST/2) and Discounted Taxable Value'
              : 'Ratio Simplification, Componendo-Dividendo & Percentage Formula',
            formulaExplained: isGst
              ? 'GST = Taxable Value × (Rate / 100); Total Bill = Taxable Value + GST.'
              : 'SI = (P×R×T)/100; (a+b)/(a−b) = (c+d)/(c−d).',
            question: isGst
              ? `Solve the following GST problems:\n(i) If the rate of CGST on an article is 14%, find the rate of SGST and the rate of GST.\n(ii) Find the total bill amount for a washing machine of taxable value ₹20,000 if GST is charged at 28%.\n(iii) A shopkeeper gives a 10% discount on a printed price of ₹2,000 and charges 12% GST on the remaining amount. Find the taxable value, CGST, and SGST.`
              : `Solve the following:\n(i) Find the geometric mean of 4 and 25.\n(ii) If a/b = 5/3, find the ratio (a + b) / (a − b).\n(iii) Find the Simple Interest on ₹12,000 at 8% p.a. for 3 years.`,
            answer: isGst
              ? `(i) Rate of SGST = 14%; Rate of GST = 28%\n(ii) GST = ₹5,600; Total Bill = ₹25,600 (CGST = ₹2,800, SGST = ₹2,800)\n(iii) Taxable Value = ₹1,800; CGST = ₹108; SGST = ₹108 (Total Bill = ₹2,016)`
              : `(i) Geometric Mean = √(4 × 25) = 10\n(ii) (5 + 3)/(5 − 3) = 8/2 = 4/1 (4 : 1)\n(iii) SI = ₹2,880 (Total Amount = ₹14,880)`,
            stepByStepExplanation: isGst
              ? `(i) SGST = CGST = 14%; GST = 14% + 14% = 28%.\n(ii) 28% of 20,000 = ₹5,600 ⇒ Total = 20,000 + 5,600 = ₹25,600.\n(iii) Discount = 10% of 2000 = ₹200 ⇒ Taxable Value = ₹1,800. CGST = SGST = 6% of 1800 = ₹108.`
              : `(i) b² = ac = 4 × 25 = 100 ⇒ b = 10.\n(ii) By Componendo–Dividendo, (5+3)/(5−3) = 8/2 = 4.\n(iii) SI = (12000 × 8 × 3)/100 = ₹2,880.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex2,
            qNo: 'Q.2 (i)–(ii)',
            typeLabel: isGst
              ? 'Input Tax Credit (ITC) & Trading Chain Problems'
              : 'Compound Interest, Profit–Loss & Discount Problems',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: isGst
              ? 'Value-Added Tax Chain: GST Payable = Output Tax − ITC'
              : 'Compound Growth A = P(1 + R/100)ⁿ and Marked Price Discount',
            formulaExplained: isGst
              ? 'GST Payable = Output Tax − ITC; CGST Payable = SGST Payable = (GST Payable)/2.'
              : 'A = P(1 + R/100)ⁿ; SP = MP × (100 − d%)/100.',
            question: isGst
              ? `Solve the following ITC problems:\n(i) Nazama is a proprietor of a firm registered under GST. She has paid GST of ₹12,500 on purchase and collected ₹14,750 on sale. What is the amount of ITC to be claimed and the amount of GST payable?\n(ii) Amir Enterprise purchased chocolate sauce bottles and paid GST of ₹3,800. He sold those bottles to Akbari Bros. and collected GST of ₹4,100. Mayank Food Corner purchased these bottles from Akbari Bros. and paid GST of ₹4,500. Find the GST, CGST, and SGST payable at every stage of trading.`
              : `Solve step-by-step:\n(i) Find the Compound Amount and Compound Interest on ₹5,000 at 8% p.a. for 2 years.\n(ii) The marked price of a fan is ₹3,000. A shopkeeper gives 12% discount on it. Find the discount and the selling price of the fan.`,
            answer: isGst
              ? `(i) ITC = ₹12,500; GST Payable = ₹2,250\n(ii) Amir Enterprise: GST Payable = ₹300 (CGST = ₹150, SGST = ₹150); Akbari Bros.: GST Payable = ₹400 (CGST = ₹200, SGST = ₹200)`
              : `(i) Compound Amount = ₹5,832; Compound Interest = ₹832\n(ii) Discount = ₹360; Selling Price = ₹2,640`,
            stepByStepExplanation: isGst
              ? `(i) ITC = GST paid on purchase = ₹12,500. GST Payable = 14,750 − 12,500 = ₹2,250.\n(ii) For Amir Enterprise: Output Tax − ITC = 4100 − 3800 = ₹300 (CGST = SGST = ₹150). For Akbari Bros.: 4500 − 4100 = ₹400 (CGST = SGST = ₹200).`
              : `(i) A = 5000 × (108/100)² = 5000 × (27/25) × (27/25) = 8 × 729 = ₹5,832 ⇒ CI = 5832 − 5000 = ₹832.\n(ii) Discount = 12% of 3000 = ₹360; SP = 3000 − 360 = ₹2,640.`,
            calculationVerified: true,
          },
          {
            exerciseSetLabel: ex3,
            qNo: 'Q.3 (i)–(ii)',
            typeLabel: isGst
              ? 'Shares, Dividend, Rate of Return & Recurring Deposit Banking'
              : 'Applied Word Problems on Variation & Commercial Maths',
            marks: 4,
            subQuestionsCount: 2,
            conceptUsed: isGst
              ? 'Share Valuation (FV vs. MV), Dividend & ICSE Recurring Deposit Formula'
              : 'Direct and Inverse Variation Word Problems',
            formulaExplained: isGst
              ? 'Sum Invested = Number of Shares × MV; Dividend = Number of Shares × FV × (Dividend%/100); RD Interest I = P × [n(n+1)/24] × (r/100).'
              : 'Direct: x₁/y₁ = x₂/y₂; Inverse: x₁ × y₁ = x₂ × y₂.',
            question: isGst
              ? `Solve the following investment problems:\n(i) Smt. Deshpande purchased shares of FV ₹5 at a premium of ₹20. How many shares will she get for ₹20,000? If the company declares 15% dividend, find her total dividend income.\n(ii) A recurring deposit account of ₹1,000 per month is maintained for 24 months at 9% p.a. simple interest. Find the total interest earned and the maturity value.`
              : `Solve the word problems step-by-step:\n(i) 15 workers can build a wall in 48 hours. How many workers will be required to do the same work in 30 hours?\n(ii) If the cost of 12 quintals of soyabean is ₹36,000, find the cost of 8 quintals of soyabean.`,
            answer: isGst
              ? `(i) MV = ₹25; Number of shares = 800 shares; Total Dividend = ₹600\n(ii) Interest I = ₹2,250; Maturity Value = ₹26,250`
              : `(i) 24 workers\n(ii) ₹24,000`,
            stepByStepExplanation: isGst
              ? `(i) MV = FV + Premium = 5 + 20 = ₹25. Number of shares = 20,000 ÷ 25 = 800 shares. Dividend per share = 15% of FV(₹5) = ₹0.75. Total Dividend = 800 × 0.75 = ₹600.\n(ii) I = 1000 × [24 × 25 / 24] × (9 / 100) = 1000 × 25 × 0.09 = ₹2,250. Maturity Value = (1000 × 24) + 2250 = ₹26,250.`
              : `(i) Inverse variation: w₁ × t₁ = w₂ × t₂ ⇒ 15 × 48 = w₂ × 30 ⇒ w₂ = 720 / 30 = 24 workers.\n(ii) Direct variation: Cost of 1 quintal = 36,000 ÷ 12 = ₹3,000 ⇒ Cost of 8 quintals = 8 × 3,000 = ₹24,000.`,
            calculationVerified: true,
          },
        ],
      };
    }

    default:
      return null;
  }
}
