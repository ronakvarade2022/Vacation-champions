import {
  ChapterDefinitionItem,
  ChapterNoteExample,
  ChapterQAItem,
  ChapterShortRevisionNotes,
  ChapterStudyMaterial,
  ClassLevel,
  EducationBoard,
  SubjectName,
} from '../../types';
import type { InstructionMedium } from '../../types/lessonPlanner';
import {
  getClassCurriculumMeta,
  getSubjectMeta,
} from '../classCurriculumConfig';
import { getRichChaptersForSubject } from '../worksheets/builders/chapterCatalog';
import { getOfficialTextbookForSubject } from '../studyLibrary/textbookLibraryData';

function cleanChapterDisplayTitle(rawTitle: string): string {
  return rawTitle
    .replace(/^(Chapter|Unit|Module|Art|पाठ|घटक)\s*[0-9१२३४५६७८९०]+\s*:\s*/i, '')
    .trim();
}

function buildDomainNotesAndQA(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  chapterTitle: string,
  chapterIdx: number,
  chapterIdPrefix: string
): {
  detailedExplanation: string[];
  keyPoints: string[];
  keyDefinitions: ChapterDefinitionItem[];
  formulasAndRules: string[];
  solvedExamples: ChapterNoteExample[];
  chapterSummary: string;
  shortRevisionNotes: ChapterShortRevisionNotes;
  qaBank: ChapterQAItem[];
  revisionChecklist: string[];
} {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const topicName = cleanChapterDisplayTitle(chapterTitle);
  const subParts = topicName.split(/,|&|\band\b/i).map((s) => s.trim()).filter(Boolean);
  const primaryConcept = subParts[0] || topicName;
  const secondaryConcept = subParts[1] || `Applied ${primaryConcept}`;
  const tertiaryConcept = subParts[2] || `${subject} Problem Solving`;
  const boardAuthority =
    board === 'CBSE'
      ? 'NCERT / CBSE NCF-SE'
      : board === 'ICSE'
      ? 'CISCE / ICSE'
      : 'Maharashtra State Board (Balbharati / MSBSHSE)';

  // 1. MATHEMATICS (Mathematics, Algebra, Geometry)
  if (
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry'
  ) {
    const formulas =
      cNum <= 2
        ? [
            `Place Value Rule (${primaryConcept}): 10 Ones = 1 Ten; 10 Tens = 1 Hundred.`,
            'Addition & Zero Property: Adding 0 to any number keeps the number unchanged (n + 0 = n).',
            'Subtraction Verification: Difference + Smaller Number (Subtrahend) = Greater Number (Minuend).',
            `Pattern & Grouping Rule (${secondaryConcept}): Equal groups of objects build skip-counting sequences.`,
          ]
        : cNum <= 5
        ? [
            'Perimeter of Rectangle = 2 × (Length + Breadth); Perimeter of Square = 4 × Side.',
            'Area of Rectangle = Length × Breadth (measured in sq. cm or sq. m).',
            'Division Verification Algorithm: Dividend = (Divisor × Quotient) + Remainder.',
            'BODMAS Order of Operations: Brackets → Of → Division → Multiplication → Addition → Subtraction.',
          ]
        : cNum <= 8
        ? [
            'Standard Algebraic Identities: (a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b²; a² − b² = (a + b)(a − b).',
            'Simple Interest: SI = (P × R × T) / 100; Compound Amount: A = P(1 + R/100)ⁿ.',
            'Pythagoras & Triangle Rule: In a right-angled triangle, Hypotenuse² = Base² + Perpendicular²; sum of angles = 180°.',
            'Mensuration Rules: Circle Area = πr², Circumference = 2πr; Cylinder Volume = πr²h.',
          ]
        : board === 'ICSE'
        ? [
            'Commercial Mathematics (GST): Intrastate GST splits equally into CGST + SGST; Interstate uses IGST.',
            'Recurring Deposit Maturity: Interest I = P × [n(n + 1) / (2 × 12)] × (r / 100); MV = P×n + I.',
            'Quadratic Discriminant: Δ = b² − 4ac (Δ > 0 distinct real roots, Δ = 0 equal roots, Δ < 0 imaginary).',
            'Trigonometric & Section Formulas: sin²θ + cos²θ = 1; P(x,y) = ((m₁x₂+m₂x₁)/(m₁+m₂), (m₁y₂+m₂y₁)/(m₁+m₂)).',
          ]
        : [
            'Quadratic Formula: x = [−b ± √(b² − 4ac)] / (2a), where Discriminant Δ = b² − 4ac.',
            'Arithmetic Progression (A.P.): nth term tₙ = a + (n − 1)d; Sum Sₙ = (n/2)[2a + (n − 1)d].',
            'Coordinate Distance & BPT: d = √[(x₂ − x₁)² + (y₂ − y₁)²]; Basic Proportionality Theorem: AD/DB = AE/EC.',
            'Classical Probability: P(A) = n(A) / n(S), where 0 ≤ P(A) ≤ 1.',
          ];

    const n1 = (cNum + 3) * (chapterIdx + 2);
    const n2 = cNum + chapterIdx + 4;
    const solvedExamples: ChapterNoteExample[] =
      cNum <= 5
        ? [
            {
              prompt: `[${primaryConcept}] Find the perimeter and area of a rectangular study chart of length ${cNum + 6} cm and breadth ${cNum + 2} cm.`,
              solution: `Step 1: Write given dimensions: Length (l) = ${cNum + 6} cm, Breadth (b) = ${cNum + 2} cm.\nStep 2: Perimeter = 2 × (l + b) = 2 × (${cNum + 6} + ${cNum + 2}) = ${2 * (2 * cNum + 8)} cm.\nStep 3: Area = l × b = ${cNum + 6} × ${cNum + 2} = ${(cNum + 6) * (cNum + 2)} sq. cm.`,
            },
            {
              prompt: `[${secondaryConcept}] A school library has ${n1 * 4} books arranged equally across ${4} shelves. How many books are on each shelf?`,
              solution: `Step 1: Total books = ${n1 * 4}, Number of shelves = 4.\nStep 2: Books per shelf = ${n1 * 4} ÷ 4 = ${n1} books.\nStep 3: Check by multiplication: ${n1} × 4 = ${n1 * 4} (Verified).`,
            },
            {
              prompt: `[${tertiaryConcept}] Evaluate (${n1} + ${n2}) − ${chapterIdx + 3} step by step.`,
              solution: `Step 1: Solve bracket first: ${n1} + ${n2} = ${n1 + n2}.\nStep 2: Subtract ${chapterIdx + 3}: ${n1 + n2} − ${chapterIdx + 3} = ${n1 + n2 - (chapterIdx + 3)}.`,
            },
          ]
        : [
            {
              prompt: `[${primaryConcept}] Solve the linear equation: ${chapterIdx + 2}x + ${cNum} = ${(chapterIdx + 2) * 6 + cNum}.`,
              solution: `Step 1: Transpose +${cNum} to RHS: ${chapterIdx + 2}x = ${(chapterIdx + 2) * 6 + cNum} − ${cNum} = ${(chapterIdx + 2) * 6}.\nStep 2: Divide both sides by ${chapterIdx + 2}: x = ${(chapterIdx + 2) * 6} / ${chapterIdx + 2} = 6.\nStep 3: Verification: LHS = ${chapterIdx + 2}(6) + ${cNum} = ${(chapterIdx + 2) * 6 + cNum} = RHS.`,
            },
            {
              prompt:
                board === 'ICSE' && cNum >= 9
                  ? `[${secondaryConcept}] A scientific calculator marked at ₹${1500 + chapterIdx * 100} is sold intrastate at 18% GST. Calculate CGST, SGST and total invoice amount.`
                  : `[${secondaryConcept}] Find the 10th term and sum of the first 10 terms of the sequence: ${chapterIdx + 3}, ${chapterIdx + 7}, ${chapterIdx + 11}, ...`,
              solution:
                board === 'ICSE' && cNum >= 9
                  ? `Step 1: Marked Price = ₹${1500 + chapterIdx * 100}. Intrastate GST splits into 9% CGST + 9% SGST.\nStep 2: CGST = 9% of ₹${1500 + chapterIdx * 100} = ₹${((1500 + chapterIdx * 100) * 9) / 100}; SGST = ₹${((1500 + chapterIdx * 100) * 9) / 100}.\nStep 3: Total Invoice = ₹${(1500 + chapterIdx * 100) * 1.18}.`
                  : `Step 1: First term a = ${chapterIdx + 3}, common difference d = 4, n = 10.\nStep 2: t₁₀ = a + 9d = ${chapterIdx + 3} + 9(4) = ${chapterIdx + 39}.\nStep 3: S₁₀ = (10/2)[a + t₁₀] = 5 × (${chapterIdx + 3} + ${chapterIdx + 39}) = ${5 * (2 * chapterIdx + 42)}.`,
            },
            {
              prompt: `[${tertiaryConcept}] In a right triangle, the perpendicular sides measure 6 cm and 8 cm. Find the hypotenuse and area.`,
              solution: `Step 1: By Pythagoras Theorem, Hypotenuse² = 6² + 8² = 36 + 64 = 100.\nStep 2: Taking square root, Hypotenuse = 10 cm.\nStep 3: Area = (1/2) × Base × Height = (1/2) × 6 × 8 = 24 cm².`,
            },
          ];

    return {
      detailedExplanation: [
        `In ${boardAuthority} ${classLevel} ${subject}, "${chapterTitle}" develops systematic mathematical reasoning around ${primaryConcept} and ${secondaryConcept}. Students learn how symbolic representation simplifies real-world numerical relationships.`,
        `When solving problems in ${primaryConcept}, always begin by identifying the given quantities, standardising their units (such as cm, m, ₹, or degrees), and selecting the governing formula before substituting values.`,
        `Mastery of ${secondaryConcept} and ${tertiaryConcept} prevents common calculation errors and builds a strong bridge toward higher-order board examination questions and competitive scholarship tests.`,
      ],
      keyPoints: [
        `Builds complete conceptual clarity in ${primaryConcept} as prescribed by ${boardAuthority} for ${classLevel}.`,
        `Connects ${secondaryConcept} with step-by-step logical deduction and unit verification.`,
        `Demonstrates how ${tertiaryConcept} applies to practical measurement, finance, and geometry problems.`,
        'Emphasises neat step-wise presentation (Given → Formula → Substitution → Answer with Unit) to secure full marks.',
        'Includes reverse-verification checks so students can validate their own numerical answers during exams.',
      ],
      keyDefinitions: [
        {
          term: primaryConcept,
          meaning: `The foundational mathematical principle in ${chapterTitle} that defines how quantities are measured, compared, or operated upon under ${board} ${classLevel} rules.`,
        },
        {
          term: secondaryConcept,
          meaning: `The operational rule or property used alongside ${primaryConcept} to solve multi-step equations and structured word problems.`,
        },
        {
          term: 'Standard Unit & Verification',
          meaning: 'Expressing every final numerical result with its proper unit (cm, cm², ₹, °) and substituting back into the original condition to confirm accuracy.',
        },
        {
          term: 'Algorithm / Theorem Statement',
          meaning: `A proven step-by-step mathematical rule in ${subject} that guarantees a valid deduction whenever its preconditions are satisfied.`,
        },
      ],
      formulasAndRules: formulas,
      solvedExamples,
      chapterSummary: `"${chapterTitle}" equips ${board} ${classLevel} students with essential formulas, properties, and step-by-step problem-solving techniques across ${primaryConcept}, ${secondaryConcept}, and ${tertiaryConcept}.`,
      shortRevisionNotes: {
        onePageSummary: `One-Page Exam Revision Sheet for ${chapterTitle}: Focus on (1) Core definitions of ${primaryConcept}, (2) Direct formula application for ${secondaryConcept}, and (3) Step-wise verification in ${tertiaryConcept}. Always write formulas in a box and include proper units in the final line.`,
        quickRevisionPoints: [
          `Core Topic: ${primaryConcept} — always check sign rules and place values before computing.`,
          `Secondary Focus: ${secondaryConcept} — write the formula explicitly; board marking schemes award 1/2 mark for the correct formula.`,
          `Application Area: ${tertiaryConcept} — convert all mixed units into a single standard unit first.`,
          `Exam Alert: Never skip intermediate steps in 3-mark or 4-mark word problems.`,
          `Verification Habit: Substitute your answer back into the LHS to confirm LHS = RHS.`,
        ],
        memoryTricks: [
          `Mnemonic "G-F-S-U": Given data → Formula → Substitution → Unit in final answer.`,
          `BODMAS / Sign Check: Same signs add and keep sign; opposite signs subtract and take the greater number's sign.`,
        ],
        importantFacts: formulas.slice(0, 3),
      },
      qaBank: buildChapterQABank(chapterIdPrefix, board, classLevel, subject, chapterTitle, primaryConcept, secondaryConcept, tertiaryConcept, formulas[0]),
      revisionChecklist: [
        `Write down all 4 formulas/rules of "${chapterTitle}" from memory with units.`,
        'Re-solve all 3 worked examples independently in your notebook without looking at the solution.',
        'Review the 9-format Q&A Bank below and practice the Chapter Test & Worksheets.',
      ],
    };
  }

  // 2. SCIENCES & EVS (Science, Physics, Chemistry, Biology, EVS, Environmental Education)
  if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    const sciRules =
      subject === 'Physics' || (cNum >= 7 && chapterIdx % 3 === 1)
        ? [
            'Laws of Motion & Force: F = m × a (SI Unit of Force is Newton, 1 N = 1 kg·m/s²).',
            'Work, Energy & Power: Work W = F × s cosθ (Joule); Power P = W / t (Watt).',
            'Ohm’s Law & Electricity: V = I × R; Electrical Heat H = I²Rt; Power P = V × I.',
            'Mirror & Lens Formula: 1/v − 1/u = 1/f (Lens); Power of Lens P = 1/f(m) in Dioptre (D).',
          ]
        : subject === 'Chemistry'
        ? [
            'Law of Conservation of Mass: Total mass of reactants equals total mass of products in a balanced chemical reaction.',
            'pH & Acid-Base Neutralisation: Acid + Base → Salt + Water (Neutral pH = 7; Acids < 7; Alkalis > 7).',
            'Periodic Trends & Valency: Atomic number Z = number of protons; valency is determined by valence shell electrons.',
            'Mole & Carbon Bonding: Carbon is tetravalent and exhibits catenation forming alkanes (CₙH₂ₙ₊₂), alkenes (CₙH₂ₙ), and alkynes (CₙH₂ₙ₋₂).',
          ]
        : [
            'Photosynthesis Equation: 6CO₂ + 6H₂O + Sunlight (Chlorophyll) → C₆H₁₂O₆ (Glucose) + 6O₂↑.',
            'Cellular Organization: Cell → Tissue → Organ → Organ System → Organism (Mitochondria synthesise ATP).',
            'Vascular Transport in Plants: Xylem conducts water and minerals upward; Phloem translocates prepared food.',
            'Ecological Balance & Conservation: Producers → Primary Consumers → Secondary Consumers → Decomposers (10% Energy Law).',
          ];

    return {
      detailedExplanation: [
        `In ${boardAuthority} ${classLevel} ${subject}, "${chapterTitle}" investigates the scientific principles behind ${primaryConcept} and ${secondaryConcept}. Students learn to connect textbook laws with real-life observations and laboratory activities.`,
        `Every scientific phenomenon in ${primaryConcept} follows a clear cause-and-effect mechanism. Understanding the structure, function, and governing conditions helps students explain "Why" and "How" questions accurately.`,
        `In ${secondaryConcept} and ${tertiaryConcept}, pay special attention to neat labelled diagrams, balanced equations/SI units, and environmental or practical applications tested in ${board} examinations.`,
      ],
      keyPoints: [
        `Explains the core scientific mechanism of ${primaryConcept} aligned with ${boardAuthority} ${classLevel}.`,
        `Analyses ${secondaryConcept} using observation, experimental evidence, and labelled structural components.`,
        `Connects ${tertiaryConcept} with daily life applications, health, technology, and environmental sustainability.`,
        'Highlights essential SI units, chemical/biological pathways, and scientific precautions.',
        'Prepares students for Give-Reason, Distinguish-Between, and Diagram-Based examination questions.',
      ],
      keyDefinitions: [
        {
          term: primaryConcept,
          meaning: `The primary scientific phenomenon or system studied in ${chapterTitle}, defined by measurable physical, chemical, or biological properties.`,
        },
        {
          term: secondaryConcept,
          meaning: `A closely linked process, structural component, or law that interacts with ${primaryConcept} under controlled conditions.`,
        },
        {
          term: tertiaryConcept,
          meaning: `The real-world application, experimental verification, or conservation practice associated with ${chapterTitle}.`,
        },
        {
          term: 'Scientific Law & Observation',
          meaning: 'A verifiable statement based on repeated empirical experiments that explains how nature behaves under specific conditions.',
        },
      ],
      formulasAndRules: sciRules,
      solvedExamples: [
        {
          prompt: `[${primaryConcept}] Explain the scientific principle of ${primaryConcept} with a real-life example from "${chapterTitle}".`,
          solution: `${primaryConcept} operates on measurable cause-and-effect laws in ${subject}. For example, observing how energy, matter, or living tissues respond to changes in ${secondaryConcept} confirms the textbook principle and allows accurate prediction.`,
        },
        {
          prompt:
            subject === 'Chemistry'
              ? `[${secondaryConcept}] Why must a chemical equation be balanced? Write the neutralisation reaction between HCl and NaOH.`
              : `[${secondaryConcept}] A body of mass ${cNum + 2} kg accelerates at 3 m/s² (or converts solar energy in plants). State the quantitative law involved.`,
          solution:
            subject === 'Chemistry'
              ? `By the Law of Conservation of Mass, atoms are neither created nor destroyed. Reaction: HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l).`
              : `Using Newton's Second Law F = m × a = ${cNum + 2} kg × 3 m/s² = ${(cNum + 2) * 3} N (or in Biology/EVS, chlorophyll traps solar energy to synthesise glucose and release oxygen).`,
        },
        {
          prompt: `[${tertiaryConcept}] State two key precautions or conservation measures related to ${tertiaryConcept}.`,
          solution: `1. Maintain accurate observation records and clean apparatus/environment.\n2. Minimise wastage of natural resources and follow standard safety protocols during practical work.`,
        },
      ],
      chapterSummary: `"${chapterTitle}" provides a comprehensive scientific study of ${primaryConcept}, ${secondaryConcept}, and ${tertiaryConcept} for ${board} ${classLevel} ${subject}, combining laws, diagrams, and real-world reasoning.`,
      shortRevisionNotes: {
        onePageSummary: `One-Page Science Revision Sheet for ${chapterTitle}: Master the definition and mechanism of ${primaryConcept}, compare it with ${secondaryConcept}, and revise the labelled diagram and equations for ${tertiaryConcept}.`,
        quickRevisionPoints: [
          `Definition Focus: State ${primaryConcept} using exact textbook scientific keywords.`,
          `Mechanism / Law: Revise how ${secondaryConcept} functions step by step.`,
          `Practical Application: Remember 2 daily-life examples of ${tertiaryConcept}.`,
          `Units & Equations: Always include SI units or physical states (s, l, g, aq) in equations.`,
          `Diagram Tip: Draw neat pencil outlines with parallel horizontal pointer lines on the right side.`,
        ],
        memoryTricks: [
          `Mnemonic "D-E-D": Definition → Example/Equation → Diagram for full marks in 3–5 mark Science answers.`,
          `Give-Reason Formula: State the scientific law first → apply it to the given situation → conclude with "Therefore...".`,
        ],
        importantFacts: sciRules.slice(0, 3),
      },
      qaBank: buildChapterQABank(chapterIdPrefix, board, classLevel, subject, chapterTitle, primaryConcept, secondaryConcept, tertiaryConcept, sciRules[0]),
      revisionChecklist: [
        `Learn the scientific definitions of ${primaryConcept} and ${secondaryConcept}.`,
        'Practice drawing and labelling the key diagram/flowchart from this chapter.',
        'Solve all 9 Q&A formats including Give Reasons and Distinguish Between.',
      ],
    };
  }

  // 3. LANGUAGES (English, Marathi, Hindi, Sanskrit, Vocabulary and Grammar)
  if (
    subject === 'English' ||
    subject === 'Vocabulary and Grammar' ||
    subject === 'Hindi' ||
    subject === 'Marathi' ||
    subject === 'Sanskrit'
  ) {
    const langRules =
      subject === 'Hindi'
        ? [
            'वर्ण व शब्द विचार: स्वरों तथा व्यंजनों के सार्थक मेल से शब्द और शब्दों के व्यवस्थित क्रम से वाक्य बनता है।',
            'संज्ञा, सर्वनाम व विशेषण: नाम वाले शब्द संज्ञा, संज्ञा के स्थान पर सर्वनाम तथा विशेषता बताने वाले शब्द विशेषण कहलाते हैं।',
            'काल, संधि व समास: क्रिया के समय को काल कहते हैं; वर्णों के मेल को संधि और पदों के संक्षेपीकरण को समास कहते हैं।',
            'मुहावरे व वाक्य शुद्धि: मुहावरे भाषा को सशक्त बनाते हैं तथा लिंग-वचन-कारक के अनुसार क्रिया का रूप निर्धारित होता है।',
          ]
        : subject === 'Marathi'
        ? [
            'शब्दांच्या ८ जाती: नाम, सर्वनाम, विशेषण, क्रियापद (विकारी) आणि क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी (अविकारी).',
            'काळ व प्रयोग: क्रियापदावरून क्रियेचा काळ (वर्तमान, भूत, भविष्य) आणि कर्तरी/कर्मणी/भावे प्रयोग ओळखता येतो.',
            'संधी, समास व अलंकार: दोन वर्ण किंवा शब्द एकत्र येऊन नवीन अर्थपूर्ण शब्द तयार होतो; उपमा, रूपक, उत्प्रेक्षा हे प्रमुख अर्थालंकार आहेत.',
            'वाक्प्रचार, म्हणी व लेखननियम: शुद्धलेखन नियमांनुसार ऱ्हस्व-दीर्घ व विरामचिन्हांचा अचूक वापर करावा.',
          ]
        : subject === 'Sanskrit'
        ? [
            'पुरुष एवं वचन व्यवस्था: प्रथम, मध्यम, उत्तम पुरुष तथा एकवचन, द्विवचन, बहुवचन के अनुसार धातु रूप चलते हैं।',
            'कारक एवं सप्त विभक्तियाँ: कर्ता (प्रथमा), कर्म (द्वितीया), करण (तृतीया), सम्प्रदान (चतुर्थी), अपादान (पञ्चमी), सम्बन्ध (षष्ठी), अधिकरण (सप्तमी)।',
            'पञ्च प्रमुख लकाराः: लट् (वर्तमान), लृट् (भविष्यत्), लङ् (भूत), लोट् (आज्ञा), विधिलिङ् (चाहिए अर्थ में)।',
            'सन्धि एवं प्रत्यय: दीर्घ, गुण, वृद्धि, यण् स्वर सन्धि तथा क्त्वा, तुमुन्, ल्यप् प्रत्ययानां प्रयोगः।',
          ]
        : [
            'Subject-Verb Concord: A singular subject takes a singular verb; collective nouns and "each/every" take singular verbs.',
            'Active & Passive Voice Rule: Object of active verb becomes Subject + appropriate form of "to be" + Past Participle (V3) + by Agent.',
            'Direct to Indirect (Reported) Speech: When the reporting verb is in past tense, present tenses in quotes shift to corresponding past tenses.',
            'Clause & Synthesis Structure: Simple sentences have one finite verb; Compound sentences join independent clauses (FANBOYS); Complex sentences use subordinating conjunctions.',
          ];

    return {
      detailedExplanation: [
        `In ${boardAuthority} ${classLevel} ${subject}, "${chapterTitle}" builds linguistic fluency, grammatical precision, and expressive comprehension across ${primaryConcept} and ${secondaryConcept}.`,
        `Students learn how ${primaryConcept} structures meaning within sentences and passages, while ${secondaryConcept} enriches vocabulary, syntax accuracy, and stylistic clarity.`,
        `Regular practice of ${tertiaryConcept} ensures high scoring in unseen comprehension, grammar transformation ("Do as Directed"), and formal writing tasks in ${board} exams.`,
      ],
      keyPoints: [
        `Develops complete mastery of ${primaryConcept} as prescribed in ${boardAuthority} ${classLevel} ${subject}.`,
        `Illustrates ${secondaryConcept} with contextual sentences, vocabulary pairs, and punctuation rules.`,
        `Strengthens ${tertiaryConcept} for reading comprehension, sentence transformation, and structured writing.`,
        'Eliminates common grammatical errors in tense agreement, prepositions, articles, and spelling.',
        'Provides model exam transformations for Active/Passive, Reported Speech, and Clause Analysis.',
      ],
      keyDefinitions: [
        {
          term: primaryConcept,
          meaning: `The primary linguistic or grammatical concept in ${chapterTitle} that governs word function and sentence construction.`,
        },
        {
          term: secondaryConcept,
          meaning: `The structural rule or lexical pattern that complements ${primaryConcept} in reading and composition.`,
        },
        {
          term: 'Syntax & Concord',
          meaning: 'The grammatical agreement between subject, verb, tense, gender, and number within a well-formed sentence.',
        },
        {
          term: 'Contextual Vocabulary',
          meaning: 'Selecting precise synonyms, antonyms, idioms, or figures of speech that match the tone and meaning of a passage.',
        },
      ],
      formulasAndRules: langRules,
      solvedExamples: [
        {
          prompt: `[${primaryConcept}] Identify and apply the core rule of ${primaryConcept} in a model sentence.`,
          solution: `Model Application: "The diligent student completed the ${subject} assignment accurately." — Here the subject, verb tense, and modifiers follow the exact grammatical rule of ${primaryConcept}.`,
        },
        {
          prompt: `[${secondaryConcept}] Transform the sentence as directed: "Meera wrote an inspiring essay." (Change the Voice / Apply ${secondaryConcept})`,
          solution: `Transformed Sentence: "An inspiring essay was written by Meera." (Simple Past Active V2 → was/were + Past Participle V3).`,
        },
        {
          prompt: `[${tertiaryConcept}] Change into Indirect Speech: The teacher said, "Regular revision builds confidence."`,
          solution: `Indirect Speech: The teacher said that regular revision builds confidence. (Universal truths and habitual facts remain in Simple Present tense.)`,
        },
      ],
      chapterSummary: `"${chapterTitle}" strengthens ${board} ${classLevel} ${subject} proficiency by combining ${primaryConcept}, ${secondaryConcept}, and ${tertiaryConcept} with practical grammar transformations and vocabulary enrichment.`,
      shortRevisionNotes: {
        onePageSummary: `One-Page Language & Grammar Sheet for ${chapterTitle}: Review the core structural rule of ${primaryConcept}, practice 5 sentence transformations in ${secondaryConcept}, and memorise key idioms/synonyms under ${tertiaryConcept}.`,
        quickRevisionPoints: [
          `Rule 1 (${primaryConcept}): Verify subject-verb agreement and tense consistency first.`,
          `Rule 2 (${secondaryConcept}): Preserve original meaning and tense when transforming sentences.`,
          `Rule 3 (${tertiaryConcept}): Use accurate punctuation marks (capital letters, commas, quotation marks).`,
          `Comprehension Tip: Read questions first, locate keywords in the passage, and answer in your own complete sentences.`,
          `Writing Skill Tip: Follow the official ${board} format (Sender's address, Date, Salutation, Body paragraphs, Sign-off).`,
        ],
        memoryTricks: [
          `FANBOYS for Coordinating Conjunctions: For, And, Nor, But, Or, Yet, So.`,
          `Voice Check: Never change the tense when converting Active ↔ Passive (only the form of "be" + V3 changes).`,
        ],
        importantFacts: langRules.slice(0, 3),
      },
      qaBank: buildChapterQABank(chapterIdPrefix, board, classLevel, subject, chapterTitle, primaryConcept, secondaryConcept, tertiaryConcept, langRules[0]),
      revisionChecklist: [
        `Revise all grammatical rules and definitions of "${chapterTitle}".`,
        'Practice 5 "Do as Directed" sentence transformations from this unit.',
        'Complete the 9-format Q&A Bank and attempt the chapter worksheet.',
      ],
    };
  }

  // 4. SOCIAL STUDIES, HISTORY, CIVICS, GEOGRAPHY, ECONOMICS, COMPUTER, GK, REASONING, OTHERS
  const isComputing =
    subject === 'Computer Knowledge' ||
    subject === 'Computer Studies' ||
    subject === 'Computer Applications' ||
    subject === 'Information Technology';

  const socialOrTechRules = isComputing
    ? [
        'Digital Storage Hierarchy: 1 Bit (0 or 1); 4 Bits = 1 Nibble; 8 Bits = 1 Byte; 1024 Bytes = 1 KB; 1024 KB = 1 MB; 1024 MB = 1 GB; 1024 GB = 1 TB.',
        board === 'ICSE'
          ? 'Four Pillars of Java OOP: Encapsulation (data hiding), Abstraction, Inheritance (code reuse via extends), and Polymorphism (method overloading/overriding).'
          : 'Algorithmic & Web Logic: Input → Process (CPU: ALU + CU) → Output; HTML5 uses semantic tags and CSS controls layout styling.',
        'Number System & Boolean Logic: Binary Base-2 (0,1), Decimal Base-10 (0–9), Hexadecimal Base-16 (0–9, A–F).',
        'Cyber Safety & Ethics: Enable Two-Factor Authentication (2FA), verify HTTPS encryption, never share OTPs, and respect intellectual property.',
      ]
    : [
        `Historical & Civic Framework (${primaryConcept}): Analyse events through Causes → Chronological Course → Immediate & Long-Term Consequences.`,
        'Constitutional Pillars: Sovereign, Socialist, Secular, Democratic Republic; Fundamental Rights (Articles 14–32) & Fundamental Duties (Article 51A).',
        'Geographical Interdependence: Latitude, Altitude, Relief, and Monsoon Winds govern climate, soil fertility, natural vegetation, and agriculture.',
        'Economic & Sustainable Development: Balanced utilisation of natural, human, and capital resources ensures inclusive growth and ecological conservation.',
      ];

  return {
    detailedExplanation: [
      `In ${boardAuthority} ${classLevel} ${subject}, "${chapterTitle}" explores the foundational concepts of ${primaryConcept} and ${secondaryConcept} with structured examples and analytical depth.`,
      `Understanding ${primaryConcept} allows students to trace how institutions, geographical systems, logical patterns, or digital technologies operate in real life.`,
      `By connecting ${secondaryConcept} with ${tertiaryConcept}, learners develop critical thinking skills required for map work, case studies, coding logic, and board examination answers.`,
    ],
    keyPoints: [
      `Presents a clear, syllabus-aligned breakdown of ${primaryConcept} for ${boardAuthority} ${classLevel}.`,
      `Examines the relationship between ${secondaryConcept} and its practical or historical impact.`,
      `Synthesises ${tertiaryConcept} into structured bullet points ideal for 3-mark and 5-mark answers.`,
      'Includes key timelines, constitutional articles, geographical factors, or technical syntax rules.',
      'Equips students for competency-based, assertion-reason, and structured short/long answer questions.',
    ],
    keyDefinitions: [
      {
        term: primaryConcept,
        meaning: `The central theme or concept of ${chapterTitle} studied in ${board} ${classLevel} ${subject}.`,
      },
      {
        term: secondaryConcept,
        meaning: `The supporting principle, institution, or technical mechanism that operates alongside ${primaryConcept}.`,
      },
      {
        term: tertiaryConcept,
        meaning: `The applied outcome, civic responsibility, geographical distribution, or analytical method covered in this chapter.`,
      },
      {
        term: isComputing ? 'Algorithm & Syntax' : 'Primary Source & Evidence',
        meaning: isComputing
          ? 'A finite step-by-step logical procedure and the exact grammatical rules of a programming language.'
          : 'Verified historical, constitutional, or geographical records used to establish factual accuracy.',
      },
    ],
    formulasAndRules: socialOrTechRules,
    solvedExamples: [
      {
        prompt: `[${primaryConcept}] Explain the significance of ${primaryConcept} in "${chapterTitle}".`,
        solution: `1. ${primaryConcept} forms the backbone of ${chapterTitle} in ${classLevel} ${subject}.\n2. It explains the systematic relationship between causes, processes, and real-world outcomes.\n3. Writing 3 distinct, well-labelled points secures full marks in board assessments.`,
      },
      {
        prompt: `[${secondaryConcept}] How does ${secondaryConcept} influence ${tertiaryConcept}?`,
        solution: `${secondaryConcept} directly shapes ${tertiaryConcept} by establishing clear rules, resource distribution, or logical workflows that determine overall efficiency and stability.`,
      },
      {
        prompt: isComputing
          ? `[${tertiaryConcept}] Convert binary (1101)₂ to decimal and state one cyber-safety rule.`
          : `[${tertiaryConcept}] State two citizen/student responsibilities connected to ${tertiaryConcept}.`,
        solution: isComputing
          ? `(1×8) + (1×4) + (0×2) + (1×1) = 8 + 4 + 0 + 1 = 13₁₀. Cyber-safety rule: Always use strong alphanumeric passwords and never disclose OTPs.`
          : `1. Promote sustainable resource use and civic awareness.\n2. Uphold constitutional values, scientific temper, and community harmony.`,
      },
    ],
    chapterSummary: `"${chapterTitle}" integrates ${primaryConcept}, ${secondaryConcept}, and ${tertiaryConcept} into a complete, exam-ready learning module for ${board} ${classLevel} ${subject}.`,
    shortRevisionNotes: {
      onePageSummary: `One-Page Revision Sheet for ${chapterTitle}: Focus on the core definition and features of ${primaryConcept}, key differences in ${secondaryConcept}, and the 3-point impact of ${tertiaryConcept}.`,
      quickRevisionPoints: [
        `Core Concept: Define ${primaryConcept} in 2 crisp sentences with a key fact or example.`,
        `Key Mechanism: Remember the 3 main features of ${secondaryConcept}.`,
        `Applied Impact: Link ${tertiaryConcept} to real-world governance, environment, or technology.`,
        `Presentation Rule: Always write social/humanities/tech answers in numbered bullet points with underlined keywords.`,
        `Quick Recall: Revise all dates, articles, or technical abbreviations before attempting the test.`,
      ],
      memoryTricks: [
        `Mnemonic "C-F-I": Concept Definition → Features (3 bullets) → Impact / Example.`,
        `Distinguish-Between Rule: Always draw a 2-column T-table with matching parameters in each row.`,
      ],
      importantFacts: socialOrTechRules.slice(0, 3),
    },
    qaBank: buildChapterQABank(chapterIdPrefix, board, classLevel, subject, chapterTitle, primaryConcept, secondaryConcept, tertiaryConcept, socialOrTechRules[0]),
    revisionChecklist: [
      `Summarise ${primaryConcept} and ${secondaryConcept} in 5 bullet points.`,
      'Memorise key terms, dates, articles, or technical rules from the glossary.',
      'Practice all 9 Q&A formats below and take the Chapter Online Test.',
    ],
  };
}

function buildChapterQABank(
  chapterIdPrefix: string,
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  chapterTitle: string,
  primaryConcept: string,
  secondaryConcept: string,
  tertiaryConcept: string,
  coreRule: string
): ChapterQAItem[] {
  return [
    {
      id: `${chapterIdPrefix}-QA-1`,
      format: 'very_short',
      formatLabel: 'Very Short Answer (1 Mark)',
      marks: 1,
      question: `Define "${primaryConcept}" in one clear sentence as studied in ${chapterTitle}.`,
      answer: `${primaryConcept} is the foundational concept in ${classLevel} ${subject} (${chapterTitle}) that establishes how core properties, quantities, or principles operate systematically under ${board} syllabus guidelines.`,
      examTip: 'Write a single, direct sentence containing the main textbook keyword for 1 full mark.',
    },
    {
      id: `${chapterIdPrefix}-QA-2`,
      format: 'short_answer',
      formatLabel: 'Short Answer Question (2 Marks)',
      marks: 2,
      question: `State any two important characteristics or rules of ${secondaryConcept}.`,
      answer: `1. Core Principle: ${secondaryConcept} follows a structured relationship directly connected to ${primaryConcept}.\n2. Governing Rule: ${coreRule}`,
      examTip: 'Always write 2 distinct numbered bullet points for a 2-mark short answer question.',
    },
    {
      id: `${chapterIdPrefix}-QA-3`,
      format: 'long_answer',
      formatLabel: 'Long Answer Question (4 Marks)',
      marks: 4,
      question: `Explain the concept of "${chapterTitle}" in detail, covering ${primaryConcept}, ${secondaryConcept}, and its practical applications in ${tertiaryConcept}.`,
      answer: `1. Introduction to ${primaryConcept}: It forms the theoretical foundation of ${chapterTitle} in ${board} ${classLevel} ${subject}.\n2. Role of ${secondaryConcept}: It provides the operational rules, formulas, or mechanisms required to analyse real scenarios.\n3. Governing Principle: ${coreRule}\n4. Application in ${tertiaryConcept}: Applying these principles ensures accurate problem-solving, scientific reasoning, and real-world utility.`,
      examTip: 'Structure 4-mark answers into 4 sub-headings: Introduction, Core Mechanism/Rule, Example/Diagram reference, and Conclusion.',
    },
    {
      id: `${chapterIdPrefix}-QA-4`,
      format: 'textbook_exercise',
      formatLabel: 'Textbook Exercise Question (3 Marks)',
      marks: 3,
      question: `[Textbook Exercise] How are ${primaryConcept} and ${secondaryConcept} interrelated in "${chapterTitle}"? Support your answer with an example.`,
      answer: `1. Interrelation: ${primaryConcept} defines the fundamental property, whereas ${secondaryConcept} demonstrates how that property behaves when applied to problems or observations.\n2. Rule Applied: ${coreRule}\n3. Example: When solving textbook exercises on ${tertiaryConcept}, we first identify ${primaryConcept} and then apply ${secondaryConcept} to reach the verified result.`,
      examTip: 'Include both the conceptual connection and one concrete example from the textbook chapter.',
    },
    {
      id: `${chapterIdPrefix}-QA-5`,
      format: 'give_reason',
      formatLabel: 'Give Reasons / Justification (2 Marks)',
      marks: 2,
      question: `Give Reason: Why is systematic verification essential while applying ${primaryConcept} and ${secondaryConcept} in ${subject}?`,
      answer: `1. Every principle in ${chapterTitle} depends on accurate initial conditions and standard units/rules (${coreRule}).\n2. Therefore, systematic verification eliminates operational errors and confirms that the final outcome satisfies all conditions of ${primaryConcept}.`,
      examTip: 'Start with the underlying law/rule and conclude with "Therefore, ...".',
    },
    {
      id: `${chapterIdPrefix}-QA-6`,
      format: 'distinguish_between',
      formatLabel: 'Distinguish Between (2 Marks)',
      marks: 2,
      question: `Distinguish between ${primaryConcept} and ${secondaryConcept} (any two points).`,
      answer: `Point 1 (Definition): ${primaryConcept} focuses on the foundational definition and core structure of ${chapterTitle}, whereas ${secondaryConcept} focuses on its operational rule or secondary process.\nPoint 2 (Application): ${primaryConcept} identifies the base parameters, whereas ${secondaryConcept} is used to compute, transform, or evaluate outcomes in ${tertiaryConcept}.`,
      examTip: 'Present your comparison in two aligned points covering Definition and Application.',
    },
    {
      id: `${chapterIdPrefix}-QA-7`,
      format: 'explain_concept',
      formatLabel: 'Explain the Concept / Short Note (3 Marks)',
      marks: 3,
      question: `Write a short note on "${tertiaryConcept}" with reference to ${chapterTitle}.`,
      answer: `1. Meaning: ${tertiaryConcept} represents the applied dimension of ${chapterTitle} in ${board} ${classLevel} ${subject}.\n2. Key Rule: ${coreRule}\n3. Significance: Mastering ${tertiaryConcept} enables students to solve real-life application problems and competency-based board questions accurately.`,
      examTip: 'Cover Meaning, Key Rule/Formula, and Practical Significance in 3 crisp bullets.',
    },
    {
      id: `${chapterIdPrefix}-QA-8`,
      format: 'fill_in_blanks',
      formatLabel: 'Fill in the Blanks (1 Mark)',
      marks: 1,
      question: `Fill in the blank: In ${chapterTitle}, the principle of __________ works together with ${secondaryConcept} to explain ${tertiaryConcept}.`,
      answer: `Answer: ${primaryConcept}`,
      examTip: 'Underline the filled-in keyword clearly in your answer sheet.',
    },
    {
      id: `${chapterIdPrefix}-QA-9`,
      format: 'match_and_true_false',
      formatLabel: 'Match the Pairs & True/False (2 Marks)',
      marks: 2,
      question: `(A) State True or False with reason: "${primaryConcept} is completely unrelated to ${secondaryConcept} in ${chapterTitle}."\n(B) Match the pair: Column A: [1. ${primaryConcept}, 2. ${secondaryConcept}] ↔ Column B: [(a) Core Foundation of ${chapterTitle}, (b) Applied Rule & Verification].`,
      answer: `(A) False — ${primaryConcept} directly underpins ${secondaryConcept} in ${chapterTitle}.\n(B) Correct Matching: 1 → (a) Core Foundation of ${chapterTitle}; 2 → (b) Applied Rule & Verification.`,
      examTip: 'Always write the complete matched pair and state the reason for True/False.',
    },
  ];
}

/**
 * Generates complete, 100% Free Chapter-Wise Study Materials
 * (Official Textbook Link, Detailed Chapter Notes, Short Revision Notes, Solved Examples,
 * Definitions Glossary, Revision Checklist, and 9-Format Question & Answer Bank)
 * for ANY (board, classLevel, subject) across Maharashtra, CBSE, and ICSE (Classes 1 to 10).
 */
export function getStudyMaterialsForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): ChapterStudyMaterial[] {
  const chapters = getRichChaptersForSubject(
    board,
    classLevel,
    subject,
    medium,
    useVerifiedPipelineOverride
  );
  if (chapters.length === 0) {
    return [];
  }
  const officialTextbook = getOfficialTextbookForSubject(
    board,
    classLevel,
    subject,
    medium,
    useVerifiedPipelineOverride
  );
  const classMeta = getClassCurriculumMeta(classLevel, board);
  const subjMeta = getSubjectMeta(subject, board);

  return chapters.map((chapterTitle, index) => {
    const chapterNumber = index + 1;
    const chapterId = `NOTES-${board.toUpperCase()}-C${classMeta.classNumber}-${subjMeta.shortCode}-CH${chapterNumber}`;
    const domain = buildDomainNotesAndQA(
      board,
      classLevel,
      subject,
      chapterTitle,
      index,
      chapterId
    );

    return {
      id: chapterId,
      board,
      classLevel,
      subject,
      chapterNumber,
      chapterTitle,
      textbookRef: `${officialTextbook.bookTitle} (${officialTextbook.syllabusCode})`,
      overview: `${board} Board • ${classLevel} (${subject}) • Chapter ${chapterNumber}: ${chapterTitle}. Prepared per ${classMeta.boardStage} guidelines (${subjMeta.description}). 100% Free Study Material Library access.`,
      keyPoints: domain.keyPoints,
      formulasAndRules: domain.formulasAndRules,
      solvedExamples: domain.solvedExamples,
      revisionChecklist: domain.revisionChecklist,
      isFreePreview: true,
      officialTextbook,
      detailedExplanation: domain.detailedExplanation,
      keyDefinitions: domain.keyDefinitions,
      chapterSummary: domain.chapterSummary,
      shortRevisionNotes: domain.shortRevisionNotes,
      qaBank: domain.qaBank,
    };
  });
}
