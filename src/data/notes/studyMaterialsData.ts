import { ClassLevel, EducationBoard, SubjectName, ChapterStudyMaterial, ChapterNoteExample } from '../../types';
import {
  getChaptersForBoardClassSubject,
  getSubjectMeta,
  getClassCurriculumMeta
} from '../classCurriculumConfig';
import { CBSE_CURRICULUM_BY_CLASS } from '../boards/cbseCurriculumConfig';
import { FREE_ALLOWED_SUBJECTS } from '../../utils/subscriptionAccess';

function getTextbookRef(board: EducationBoard, classLevel: ClassLevel, subject: SubjectName): string {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  if (board === 'CBSE') {
    const mapped = CBSE_CURRICULUM_BY_CLASS[classLevel]?.textbooks?.[subject];
    return mapped || `NCERT Class ${cNum} ${subject} (NCF-SE Aligned)`;
  }
  if (board === 'ICSE') {
    if (cNum >= 9) {
      return `CISCE ICSE Class ${cNum} Official Syllabus • ${subject}`;
    }
    return `CISCE Primary/Middle Class ${cNum} • ${subject}`;
  }
  return `Maharashtra State Board (Balbharati / MSBSHSE) • ${classLevel} ${subject}`;
}

function buildDomainNotes(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  chapterTitle: string,
  chapterIdx: number
): {
  keyPoints: string[];
  formulasAndRules: string[];
  solvedExamples: ChapterNoteExample[];
  revisionChecklist: string[];
} {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;

  if (
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry'
  ) {
    const formulas =
      cNum <= 2
        ? [
            'Place Value Rule: 10 Ones = 1 Ten; 10 Tens = 1 Hundred.',
            'Addition Identity: Any number + 0 stays the exact same number.',
            'Subtraction Check: Difference + Subtrahend = Minuend.'
          ]
        : cNum <= 5
          ? [
              'Perimeter of Rectangle = 2 × (Length + Breadth); Square = 4 × Side.',
              'Area of Rectangle = Length × Breadth (in square units).',
              'Fraction Parts: Fraction = Shaded Equal Parts / Total Equal Parts.',
              'BODMAS Precedence: Brackets → Of → Division → Multiplication → Addition → Subtraction.'
            ]
          : cNum <= 8
            ? [
                'Algebraic Identities: (a + b)² = a² + 2ab + b²;  (a − b)² = a² − 2ab + b²;  a² − b² = (a + b)(a − b).',
                'Simple Interest = (P × R × T) / 100;  Compound Amount A = P(1 + R/100)ⁿ.',
                'Angle Sum Property: Sum of interior angles in any triangle = 180°.',
                'Circle Formulas: Circumference = 2πr; Area = πr² (π ≈ 22/7).'
              ]
            : board === 'ICSE'
              ? [
                  'Commercial Math (GST): Intrastate GST splits equally into CGST + SGST; Interstate uses IGST.',
                  'ICSE Recurring Deposit Interest: I = P × [n(n+1) / (2×12)] × (r / 100).',
                  'Matrices: Product AB is defined when columns of A equal rows of B.',
                  'Trigonometric Identity: sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ.'
                ]
              : [
                  'Quadratic Formula: x = [−b ± √(b² − 4ac)] / (2a), where Δ = b² − 4ac.',
                  'Arithmetic Progression: aₙ = a + (n − 1)d;  Sₙ = (n/2)[2a + (n − 1)d].',
                  'Pythagoras Theorem & Distance Formula: d = √[(x₂ − x₁)² + (y₂ − y₁)²].',
                  'Probability: P(E) = Favourable Outcomes / Total Equally Likely Outcomes (0 ≤ P(E) ≤ 1).'
                ];

    const solvedExamples: ChapterNoteExample[] =
      cNum <= 5
        ? [
            {
              prompt: `Find the perimeter and area of a ${cNum + 4} cm × ${cNum + 1} cm rectangular notebook studied in ${chapterTitle}.`,
              solution: `Step 1: Perimeter = 2 × (${cNum + 4} + ${cNum + 1}) = ${2 * (2 * cNum + 5)} cm. Step 2: Area = ${cNum + 4} × ${cNum + 1} = ${(cNum + 4) * (cNum + 1)} cm².`
            },
            {
              prompt: `Evaluate ${10 * cNum + 24} + ${5 * (chapterIdx + 2)} step by step.`,
              solution: `Add ones place first, carry tens if needed, then add tens/hundreds place → ${(10 * cNum + 24) + 5 * (chapterIdx + 2)}.`
            }
          ]
        : [
            {
              prompt: `Solve linear equation ${chapterIdx + 2}x + ${cNum} = ${(chapterIdx + 2) * 5 + cNum}.`,
              solution: `Subtract ${cNum} from both sides: ${chapterIdx + 2}x = ${(chapterIdx + 2) * 5}. Divide by ${chapterIdx + 2} to get x = 5.`
            },
            {
              prompt:
                board === 'ICSE' && cNum >= 9
                  ? `An item marked ₹2,000 attracts 18% GST intrastate. Find CGST & total bill.`
                  : `Find the 8th term of A.P. 5, 9, 13, 17, ...`,
              solution:
                board === 'ICSE' && cNum >= 9
                  ? `CGST = 9% of ₹2,000 = ₹180; SGST = ₹180. Total Invoice = ₹2,000 + ₹360 = ₹2,360.`
                  : `Here a = 5 and common difference d = 4. Using a₈ = a + 7d = 5 + 7(4) = 33.`
            }
          ];

    return {
      keyPoints: [
        `Builds strong conceptual fluency in "${chapterTitle}" as prescribed by ${board} for ${classLevel}.`,
        'Focuses on step-by-step problem representation with clear units and verification.',
        'Connects mental arithmetic shortcuts with formal textbook theorem proofs.'
      ],
      formulasAndRules: formulas,
      solvedExamples,
      revisionChecklist: [
        `Memorise every key formula in "${chapterTitle}" with SI/metric units.`,
        'Re-solve 2 worked examples independently without checking hints.',
        'Attempt the linked Level 1–4 Quiz and Worksheet to reach 90%+ mastery.'
      ]
    };
  }

  if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    const sciRules =
      subject === 'Physics' || (cNum >= 7 && chapterIdx % 2 === 1)
        ? [
            'Speed = Distance / Time (SI unit: m/s; multiply km/h by 5/18 to convert to m/s).',
            'Newton’s Second Law: F = m × a (1 Newton = 1 kg·m/s²).',
            'Ohm’s Law: V = I × R;  Electrical Power P = V × I = I²R.',
            'Lens Power: P = 1 / f (f in metres, unit Dioptre D).'
          ]
        : subject === 'Chemistry'
          ? [
              'Law of Conservation of Mass: Total mass of reactants equals total mass of products.',
              'Neutral pH = 7; Acids have pH < 7 (turn blue litmus red); Bases have pH > 7.',
              'Mole Concept: Number of moles n = Given Mass (g) / Molar Mass (g/mol).',
              'Homologous Series: Alkanes CₙH₂ₙ₊₂, Alkenes CₙH₂ₙ, Alkynes CₙH₂ₙ₋₂.'
            ]
          : [
              'Photosynthesis: 6CO₂ + 6H₂O + Sunlight (Chlorophyll) → C₆H₁₂O₆ + 6O₂.',
              'Cell Organelles: Nucleus controls cell activity; Mitochondria synthesise ATP energy.',
              'Plant Vascular Tissues: Xylem transports water upward; Phloem translocates food.',
              'Balanced Nutrition: Carbohydrates (energy), Proteins (repair), Vitamins & Minerals (immunity).'
            ];

    return {
      keyPoints: [
        `Explains core scientific phenomena in "${chapterTitle}" aligned with ${board} Class ${cNum}.`,
        'Emphasises labelled scientific diagrams, cause-effect reasoning, and real-world experiments.',
        board === 'ICSE'
          ? 'Covers CISCE structured definitions, observations, and numerical deductions in full depth.'
          : 'Supports competency-based and assertion-reasoning questions expected in exams.'
      ],
      formulasAndRules: sciRules,
      solvedExamples: [
        {
          prompt: `Why is the core scientific concept of "${chapterTitle}" essential in daily life or laboratory observation?`,
          solution: `Observation of controlled variables proves the underlying scientific law in ${chapterTitle}, enabling accurate predictions and clean experimental results.`
        },
        {
          prompt:
            subject === 'Chemistry'
              ? `Identify the litmus test result when a dilute acid reacts with sodium hydroxide.`
              : `A 5 kg object accelerates at 4 m/s². Calculate net applied force.`,
          solution:
            subject === 'Chemistry'
              ? `Acid + Base neutralisation yields Salt + Water (NaCl + H₂O), neutralising litmus around pH 7.`
              : `Using F = m × a = 5 kg × 4 m/s² = 20 Newtons.`
        }
      ],
      revisionChecklist: [
        'Write down key definitions, SI units, and balanced equations neatly in your notebook.',
        'Practise labelling important organ / apparatus diagrams from memory.',
        'Complete both Worksheet #1 and Worksheet #2 for this subject.'
      ]
    };
  }

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
            'संज्ञा के मुख्य भेद: व्यक्तिवाचक, जातिवाचक और भाववाचक संज्ञा।',
            'संधि व समास में दो निकटवर्ती वर्णों अथवा पदों के मेल से नया सार्थक रूप बनता है।',
            'काल के तीन प्रमुख रूप: वर्तमान काल, भूतकाल तथा भविष्यत् काल।'
          ]
        : subject === 'Marathi'
          ? [
              'शब्दांच्या ८ जाती: नाम, सर्वनाम, विशेषण, क्रियापद, क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी.',
              'समानार्थी व विरुद्धार्थी शब्दांचा संदर्भानुसार अचूक वापर करावा.',
              'वाक्प्रचार व म्हणी वाक्यात अर्थपूर्ण पद्धतीने उपयोगात आणाव्यात.'
            ]
          : subject === 'Sanskrit'
            ? [
                'संस्कृत लकाराः: लट् (वर्तमान), लृट् (भविष्यत्), लङ् (भूत), लोट् (आज्ञा) एवं विधिलिङ्।',
                'विभक्तिः सप्तमी पर्यन्तं (प्रथमा – सप्तमी) व सम्बोधनम्।',
                'स्वर संधि (दीर्घ, गुण, वृद्धि, यण्) नियमानां प्रयोगः।'
              ]
            : [
                'Subject-Verb Concord: Singular subjects take singular verbs ("Each of the students has...").',
                'Active to Passive Voice: Object becomes subject + appropriate "be" form + Past Participle (V3).',
                'Reported Speech: Present tense in direct speech shifts one tense back under past reporting verbs.',
                'Preposition Precision: Use "fond of", "acquainted with", "prefer X to Y", "abide by".'
              ];

    return {
      keyPoints: [
        `Strengthens reading comprehension, grammatical accuracy, and vocabulary for "${chapterTitle}" (${board} ${classLevel}).`,
        'Highlights common exam pitfalls in tense shifts, prepositions, and punctuation.',
        'Encourages concise written expression with accurate idiomatic usage.'
      ],
      formulasAndRules: langRules,
      solvedExamples: [
        {
          prompt: `Transform into indirect speech: The teacher said, "Honesty builds lasting character."`,
          solution: `The teacher said that honesty builds lasting character. (Universal truths retain simple present tense.)`
        },
        {
          prompt: `Convert voice: "Aarav solved every worksheet problem neatly."`,
          solution: `"Every worksheet problem was solved neatly by Aarav." (Past simple active → was/were + V3.)`
        }
      ],
      revisionChecklist: [
        'Revise 10 new synonyms, antonyms, and phrasal idioms from this chapter.',
        'Practise converting 5 sentences between Active/Passive and Direct/Indirect speech.',
        'Solve the English/Language level quiz for instant accuracy feedback.'
      ]
    };
  }

  // History / Civics / Geography / Social Science / Economics / Computer Studies / CS Apps / GK / Reasoning / Others
  const isComputing =
    subject === 'Computer Knowledge' ||
    subject === 'Computer Studies' ||
    subject === 'Computer Applications' ||
    subject === 'Information Technology';

  const rules = isComputing
    ? [
        'Digital Memory Units: 8 Bits = 1 Byte; 1024 Bytes = 1 KB; 1024 KB = 1 MB; 1024 MB = 1 GB.',
        board === 'ICSE'
          ? 'Java OOP Pillars: Encapsulation, Abstraction, Inheritance & Polymorphism (BlueJ Environment).'
          : 'Structured Web & Algorithms: HTML5 semantic tags, Binary Base-2 logic & clean Flowcharts.',
        'Cyber Hygiene: Never share OTPs, verify HTTPS locks, and guard passwords securely.'
      ]
    : [
        `Chronology & Causation: Trace key milestones and primary sources across "${chapterTitle}".`,
        'Constitutional Framework: Fundamental Rights (Articles 14–32), Duties & Union–State Federalism.',
        'Geographical Analysis: Correlate relief features, monsoon winds, soils, and sustainable resources.'
      ];

  return {
    keyPoints: [
      `Covers essential syllabus concepts in "${chapterTitle}" structured specifically for ${board} ${classLevel}.`,
      'Organises dates, articles, definitions, or syntax rules into quick-recall bullet points.',
      'Links theoretical knowledge to map/application questions and short-answer board patterns.'
    ],
    formulasAndRules: rules,
    solvedExamples: [
      {
        prompt: isComputing
          ? `Convert binary (10101)₂ to decimal or trace what Java class encapsulation achieves.`
          : `Explain the historical or civic significance studied inside "${chapterTitle}".`,
        solution: isComputing
          ? `(1×16)+(0×8)+(1×4)+(0×2)+(1×1) = 21. In OOP, private fields wrapped inside public getter/setter methods protect state integrity.`
          : `Understanding "${chapterTitle}" connects foundational constitutional/geographical facts to contemporary citizenship and exam analysis.`
      }
    ],
    revisionChecklist: [
      `Summarise the 3 main takeaways of "${chapterTitle}" in your own words.`,
      'Highlight key dates, technical keywords, and constitutional articles.',
      'Test your recall using the Subject Quiz and Worksheets immediately after reading.'
    ]
  };
}

/**
 * Generates structured Chapter-Wise Study Materials (Notes, Formulas, Solved Examples, Revision Checklists)
 * for ANY (board, classLevel, subject) across Maharashtra, CBSE, and ICSE (Classes 1 to 10).
 */
export function getStudyMaterialsForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): ChapterStudyMaterial[] {
  const chapters = getChaptersForBoardClassSubject(board, classLevel, subject);
  const textbookRef = getTextbookRef(board, classLevel, subject);
  const classMeta = getClassCurriculumMeta(classLevel, board);
  const subjMeta = getSubjectMeta(subject, board);
  const isFreeSubject = FREE_ALLOWED_SUBJECTS.includes(subject);

  return chapters.map((chapterTitle, index) => {
    const chapterNumber = index + 1;
    const domainNotes = buildDomainNotes(board, classLevel, subject, chapterTitle, index);

    return {
      id: `NOTES-${board.toUpperCase()}-C${classMeta.classNumber}-${subjMeta.shortCode}-CH${chapterNumber}`,
      board,
      classLevel,
      subject,
      chapterNumber,
      chapterTitle,
      textbookRef,
      overview: `${board} ${classLevel} (${subject}) • Chapter ${chapterNumber}: ${chapterTitle}. Prepared per ${classMeta.boardStage} guidelines (${subjMeta.description}).`,
      keyPoints: domainNotes.keyPoints,
      formulasAndRules: domainNotes.formulasAndRules,
      solvedExamples: domainNotes.solvedExamples,
      revisionChecklist: domainNotes.revisionChecklist,
      isFreePreview: chapterNumber === 1 && isFreeSubject
    };
  });
}
