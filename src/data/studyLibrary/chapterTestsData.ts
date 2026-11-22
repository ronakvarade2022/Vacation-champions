import {
  ChapterPracticeTest,
  ChapterPracticeTestQuestion,
  ClassLevel,
  EducationBoard,
  SubjectName,
} from '../../types';
import { getSubjectMeta } from '../classCurriculumConfig';
import { getRichChaptersForSubject } from '../worksheets/builders/chapterCatalog';

function getClassNum(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
}

function cleanChapterTitle(raw: string): string {
  return raw
    .replace(/^(Chapter|Unit|Module|Art|पाठ|घटक)\s*[0-9१२३४५६७८९०]+\s*:\s*/i, '')
    .trim();
}

function rotateOptions(
  opts: [string, string, string, string],
  correctValIdx: number,
  seed: number
): { options: [string, string, string, string]; correctIndex: number } {
  const shift = ((seed % 4) + 4) % 4;
  const out: string[] = new Array(4);
  for (let i = 0; i < 4; i++) {
    out[(i + shift) % 4] = opts[i];
  }
  return {
    options: [out[0], out[1], out[2], out[3]],
    correctIndex: (correctValIdx + shift) % 4,
  };
}

function buildMathChapterQuestions(
  idPrefix: string,
  board: EducationBoard,
  cNum: number,
  subject: SubjectName,
  topic: string,
  chIdx: number
): ChapterPracticeTestQuestion[] {
  const seed = cNum * 13 + chIdx * 7;
  const a = cNum + chIdx + 4;
  const b = (cNum % 5) + 3;
  const perimeter = 2 * (a + b);
  const area = a * b;
  const prod = a * b;
  const apN = 5 + (chIdx % 4);
  const apFirst = cNum + 2;
  const apDiff = 4;
  const apTerm = apFirst + (apN - 1) * apDiff;

  const rawList: {
    q: string;
    opts: [string, string, string, string];
    cIdx: number;
    exp: string;
    diff: ChapterPracticeTestQuestion['difficulty'];
  }[] = [
    {
      q: `In "${topic}" (${board} Class ${cNum}), calculate the value of ${a} × ${b} + ${cNum * 2}.`,
      opts: [
        `${prod + cNum * 2}`,
        `${prod + cNum}`,
        `${prod + b}`,
        `${a + b + cNum * 2}`,
      ],
      cIdx: 0,
      exp: `By BODMAS multiplication precedes addition: (${a} × ${b}) + ${cNum * 2} = ${prod} + ${cNum * 2} = ${prod + cNum * 2}.`,
      diff: 'Easy',
    },
    {
      q: `A rectangular study board in "${topic}" has length ${a} cm and breadth ${b} cm. What is its perimeter?`,
      opts: [`${perimeter} cm`, `${area} cm`, `${a + b} cm`, `${perimeter + 4} cm`],
      cIdx: 0,
      exp: `Perimeter of rectangle = 2 × (l + b) = 2 × (${a} + ${b}) = ${perimeter} cm.`,
      diff: 'Easy',
    },
    {
      q: `For the same rectangle (${a} cm × ${b} cm), what is its area in square centimetres?`,
      opts: [`${area} cm²`, `${perimeter} cm²`, `${area + a} cm²`, `${area - b} cm²`],
      cIdx: 0,
      exp: `Area = Length × Breadth = ${a} × ${b} = ${area} cm².`,
      diff: 'Easy',
    },
    {
      q:
        cNum <= 4
          ? `Which place value is equivalent to 1 Hundred in Class ${cNum} Number System?`
          : `Solve for x in the linear relation ${b}x + ${cNum} = ${b * 5 + cNum}.`,
      opts:
        cNum <= 4
          ? ['10 Tens (100 Ones)', '10 Ones', '100 Tens', '5 Tens']
          : ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
      cIdx: 0,
      exp:
        cNum <= 4
          ? '10 Ones = 1 Ten and 10 Tens = 1 Hundred (100 Ones).'
          : `Subtract ${cNum} from both sides: ${b}x = ${b * 5}. Dividing by ${b} gives x = 5.`,
      diff: 'Medium',
    },
    {
      q:
        cNum <= 5
          ? `What fraction of a week are 3 days?`
          : `If a fair number cube (die) is rolled once, what is the probability of getting an even prime number?`,
      opts:
        cNum <= 5
          ? ['3/7', '7/3', '3/5', '1/3']
          : ['1/6', '1/2', '1/3', '2/3'],
      cIdx: 0,
      exp:
        cNum <= 5
          ? 'A week has 7 days, so 3 days represent the fraction 3/7.'
          : 'The only even prime number on a standard 1–6 die is 2 (1 favourable outcome out of 6). Thus P(E) = 1/6.',
      diff: 'Medium',
    },
    {
      q:
        cNum <= 5
          ? `What is the Least Common Multiple (LCM) or smallest common multiple of 4 and 6?`
          : `Evaluate using algebraic identity: (10 + 3)² − (10 − 3)² = ?`,
      opts:
        cNum <= 5
          ? ['12', '24', '10', '2']
          : ['120', '100', '169', '60'],
      cIdx: 0,
      exp:
        cNum <= 5
          ? 'Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... Smallest common multiple is 12.'
          : 'Since (a + b)² − (a − b)² = 4ab, we get 4 × 10 × 3 = 120 (or 169 − 49 = 120).',
      diff: 'Medium',
    },
    {
      q: `Which property correctly verifies subtraction or division problems in "${topic}"?`,
      opts: [
        'Difference + Subtrahend = Minuend (and Dividend = Divisor × Quotient + Remainder)',
        'Quotient × Remainder = Dividend',
        'Minuend + Difference = Subtrahend',
        'Divisor + Quotient = Remainder',
      ],
      cIdx: 0,
      exp: 'Standard arithmetic inverse checks guarantee accuracy in multi-step computations.',
      diff: 'Medium',
    },
    {
      q: `If 5 notebooks cost ₹${(cNum + 4) * 5}, what is the cost of 12 such notebooks at the same unit rate?`,
      opts: [
        `₹${(cNum + 4) * 12}`,
        `₹${(cNum + 4) * 10}`,
        `₹${(cNum + 4) * 7}`,
        `₹${(cNum + 4) * 15}`,
      ],
      cIdx: 0,
      exp: `By unitary method: Cost of 1 notebook = ₹${(cNum + 4) * 5} ÷ 5 = ₹${cNum + 4}. Cost of 12 notebooks = 12 × ₹${cNum + 4} = ₹${(cNum + 4) * 12}.`,
      diff: 'Exam-Ready',
    },
    {
      q:
        cNum <= 7
          ? `What is the sum of all three interior angles of any triangle?`
          : `Find the ${apN}th term of the Arithmetic Progression: ${apFirst}, ${apFirst + apDiff}, ${apFirst + 2 * apDiff}, ...`,
      opts:
        cNum <= 7
          ? ['180°', '90°', '360°', '270°']
          : [`${apTerm}`, `${apTerm + apDiff}`, `${apTerm - apDiff}`, `${apFirst * apN}`],
      cIdx: 0,
      exp:
        cNum <= 7
          ? 'By the Angle Sum Property of triangles, ∠A + ∠B + ∠C = 180°.'
          : `Using tₙ = a + (n − 1)d = ${apFirst} + (${apN} − 1)×${apDiff} = ${apTerm}.`,
      diff: 'Exam-Ready',
    },
    {
      q: `Which sequence of problem-solving steps earns full marks in ${board} ${subject} board assessments?`,
      opts: [
        'Given data → Exact Formula → Step-wise Substitution → Final Answer with Unit',
        'Only writing the final numerical digit',
        'Skipping formula statement and omitting units',
        'Estimating without showing working steps',
      ],
      cIdx: 0,
      exp: 'Board marking schemes award step marks for Given data, Formula, Substitution, and Answer with Unit.',
      diff: 'Exam-Ready',
    },
  ];

  return rawList.map((item, idx) => {
    const rotated = rotateOptions(item.opts, item.cIdx, seed + idx);
    return {
      id: `${idPrefix}-Q${idx + 1}`,
      question: item.q,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: item.exp,
      difficulty: item.diff,
    };
  });
}

function buildScienceChapterQuestions(
  idPrefix: string,
  board: EducationBoard,
  cNum: number,
  subject: SubjectName,
  topic: string,
  chIdx: number
): ChapterPracticeTestQuestion[] {
  const seed = cNum * 17 + chIdx * 5;
  const subParts = topic.split(/,|&|\band\b/i).map((s) => s.trim()).filter(Boolean);
  const coreConcept = subParts[0] || topic;

  const rawList: {
    q: string;
    opts: [string, string, string, string];
    cIdx: number;
    exp: string;
    diff: ChapterPracticeTestQuestion['difficulty'];
  }[] = [
    {
      q: `What is the SI unit of Force applied in scientific experiments related to ${board} Class ${cNum} Science?`,
      opts: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
      cIdx: 0,
      exp: 'Force = mass × acceleration (kg·m/s²), whose SI unit is Newton (N).',
      diff: 'Easy',
    },
    {
      q: `During photosynthesis in green plants, which gas is released into the atmosphere?`,
      opts: ['Oxygen (O₂)', 'Carbon dioxide (CO₂)', 'Nitrogen (N₂)', 'Sulphur dioxide (SO₂)'],
      cIdx: 0,
      exp: 'Green plants use CO₂ + H₂O in sunlight & chlorophyll to form glucose and release Oxygen (O₂).',
      diff: 'Easy',
    },
    {
      q: `Which cell organelle is known as the "powerhouse of the cell" because it generates ATP?`,
      opts: ['Mitochondria', 'Golgi body', 'Ribosome', 'Lysosome'],
      cIdx: 0,
      exp: 'Mitochondria carry out cellular respiration to produce energy currency ATP.',
      diff: 'Easy',
    },
    {
      q: `What does a pH value of 7 represent on the universal indicator scale?`,
      opts: ['A strictly neutral solution (like pure water)', 'A strong mineral acid', 'A concentrated alkali', 'A non-aqueous solvent'],
      cIdx: 0,
      exp: 'pH 7 is neutral; pH < 7 is acidic (turns blue litmus red), and pH > 7 is basic/alkaline.',
      diff: 'Medium',
    },
    {
      q: `Which vascular tissue in plants transports water and dissolved minerals upward from roots to leaves?`,
      opts: ['Xylem', 'Phloem', 'Epidermis', 'Stomata'],
      cIdx: 0,
      exp: 'Xylem conducts water & minerals upward; Phloem translocates prepared food from leaves.',
      diff: 'Medium',
    },
    {
      q: `An object of mass ${cNum + 2} kg moves with an acceleration of 4 m/s². Calculate the net force acting on it.`,
      opts: [
        `${(cNum + 2) * 4} N`,
        `${cNum + 6} N`,
        `${(cNum + 2) * 2} N`,
        `${cNum + 2} N`,
      ],
      cIdx: 0,
      exp: `By Newton's Second Law, F = m × a = ${cNum + 2} kg × 4 m/s² = ${(cNum + 2) * 4} N.`,
      diff: 'Medium',
    },
    {
      q: `Why must every chemical reaction equation be balanced before calculations?`,
      opts: [
        'To satisfy the Law of Conservation of Mass',
        'To increase reaction temperature artificially',
        'To change solids into liquids',
        'To avoid writing chemical symbols',
      ],
      cIdx: 0,
      exp: 'Matter is neither created nor destroyed in a chemical reaction; atoms of each element remain equal on both sides.',
      diff: 'Medium',
    },
    {
      q: `In studying "${coreConcept}" (${subject}), which method ensures reliable experimental conclusions?`,
      opts: [
        'Observing controlled variables and recording repeatable measurements with SI units',
        'Guessing results prior to observation',
        'Ignoring units and apparatus calibration',
        'Changing multiple variables simultaneously without recording',
      ],
      cIdx: 0,
      exp: 'Scientific inquiry requires controlled variables, accurate observation, and standard SI measurement.',
      diff: 'Exam-Ready',
    },
    {
      q: `Which energy transfer rule states that only about 10% of energy moves from one trophic level to the next in an ecosystem?`,
      opts: [
        'Lindeman’s 10% Energy Law',
        'Ohm’s Law',
        'Archimedes’ Principle',
        'Boyle’s Gas Law',
      ],
      cIdx: 0,
      exp: 'At each trophic level, roughly 90% energy is used for life processes/heat and ~10% transfers upward.',
      diff: 'Exam-Ready',
    },
    {
      q: `When answering a "Give Scientific Reason" question on "${coreConcept}" in ${board} exams, what is the best structure?`,
      opts: [
        'State the governing scientific law/fact first → apply to situation → conclude with "Therefore..."',
        'Write only one word without explanation',
        'Skip the scientific principle and draw random arrows',
        'Repeat the question statement twice',
      ],
      cIdx: 0,
      exp: 'Examiners look for the core scientific principle followed by cause-effect application.',
      diff: 'Exam-Ready',
    },
  ];

  return rawList.map((item, idx) => {
    const rotated = rotateOptions(item.opts, item.cIdx, seed + idx);
    return {
      id: `${idPrefix}-Q${idx + 1}`,
      question: item.q,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: item.exp,
      difficulty: item.diff,
    };
  });
}

function buildLanguageChapterQuestions(
  idPrefix: string,
  board: EducationBoard,
  cNum: number,
  subject: SubjectName,
  topic: string,
  chIdx: number
): ChapterPracticeTestQuestion[] {
  const seed = cNum * 11 + chIdx * 9;
  const rawList: {
    q: string;
    opts: [string, string, string, string];
    cIdx: number;
    exp: string;
    diff: ChapterPracticeTestQuestion['difficulty'];
  }[] = [
    {
      q: `Identify the correct passive voice form of: "Aarav solved the practice worksheet."`,
      opts: [
        'The practice worksheet was solved by Aarav.',
        'The practice worksheet is solve by Aarav.',
        'The practice worksheet has solved Aarav.',
        'Aarav was solved the practice worksheet.',
      ],
      cIdx: 0,
      exp: 'Simple Past Active ("solved") converts to "was/were + Past Participle (solved)" in Passive Voice.',
      diff: 'Easy',
    },
    {
      q: `Choose the grammatically correct sentence following Subject-Verb Concord:`,
      opts: [
        'Each of the students has completed the chapter notes.',
        'Each of the students have completed the chapter notes.',
        'Each of the student are completed the chapter notes.',
        'Each student have complete the notes.',
      ],
      cIdx: 0,
      exp: 'Distributive pronouns like "Each", "Everyone", and "Neither" take a singular verb ("has").',
      diff: 'Easy',
    },
    {
      q: `Which pair of words are closest Synonyms (similar in meaning) for Class ${cNum} vocabulary?`,
      opts: [
        'Diligent — Hardworking',
        'Ancient — Modern',
        'Generous — Selfish',
        'Transparent — Opaque',
      ],
      cIdx: 0,
      exp: '"Diligent" means showing steady, careful effort — synonymous with "Hardworking".',
      diff: 'Easy',
    },
    {
      q: `Convert into Indirect Speech: The teacher said, "The Earth revolves around the Sun."`,
      opts: [
        'The teacher said that the Earth revolves around the Sun.',
        'The teacher said that the Earth revolved around the Sun.',
        'The teacher asked if the Earth will revolve around the Sun.',
        'The teacher told the Earth was revolving around the Sun.',
      ],
      cIdx: 0,
      exp: 'Universal scientific truths retain Simple Present tense ("revolves") even under a past reporting verb.',
      diff: 'Medium',
    },
    {
      q: `Fill in the blank with the correct preposition: "Students should always abide ___ school discipline rules."`,
      opts: ['by', 'into', 'upon', 'across'],
      cIdx: 0,
      exp: 'The standard phrasal collocation is "abide by" (meaning follow or obey).',
      diff: 'Medium',
    },
    {
      q: `What do the coordinating conjunctions FANBOYS stand for in sentence synthesis?`,
      opts: [
        'For, And, Nor, But, Or, Yet, So',
        'From, After, Near, Before, Over, Yet, Since',
        'For, Also, Neither, Because, Or, Yet, Still',
        'First, Always, Now, But, Only, Yes, So',
      ],
      cIdx: 0,
      exp: 'FANBOYS (For, And, Nor, But, Or, Yet, So) join two independent clauses to form a Compound sentence.',
      diff: 'Medium',
    },
    {
      q: `Identify the Figure of Speech in: "The classroom was a beehive of cheerful activity."`,
      opts: ['Metaphor', 'Simile', 'Oxymoron', 'Onomatopoeia'],
      cIdx: 0,
      exp: 'An implied direct comparison without "like" or "as" is a Metaphor.',
      diff: 'Medium',
    },
    {
      q:
        subject === 'Hindi'
          ? 'हिंदी व्याकरण में "संधि" का सही अर्थ क्या है?'
          : subject === 'Marathi'
          ? 'मराठी व्याकरणात शब्दांच्या एकूण किती प्रमुख जाती आहेत?'
          : `Which sentence correctly uses an Adverb to modify a verb?`,
      opts:
        subject === 'Hindi'
          ? ['दो निकटवर्ती वर्णों के मेल से होने वाला परिवर्तन', 'शब्दों का विपरीत अर्थ', 'वाक्य के अंत में विराम चिह्न', 'संज्ञा के स्थान पर प्रयुक्त शब्द']
          : subject === 'Marathi'
          ? ['८ जाती (४ विकारी + ४ अविकारी)', '३ जाती', '१२ जाती', '२ जाती']
          : [
              'She explained the solution clearly to the class.',
              'She explained the clear to the class.',
              'She clear explained solution the.',
              'Her clearly explained was solution.',
            ],
      cIdx: 0,
      exp:
        subject === 'Hindi'
          ? 'दो समीपवर्ती वर्णों के परस्पर मेल से उत्पन्न विकार (परिवर्तन) को संधि कहते हैं।'
          : subject === 'Marathi'
          ? 'मराठीत नाम, सर्वनाम, विशेषण, क्रियापद (विकारी) आणि क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी (अविकारी) अशा ८ जाती आहेत.'
          : '"Clearly" is an adverb modifying the verb "explained".',
      diff: 'Exam-Ready',
    },
    {
      q: `While studying "${topic}" in ${board} ${subject}, what is the golden rule of Active ↔ Passive conversion?`,
      opts: [
        'Keep the tense unchanged and use the appropriate "be" verb + Past Participle (V3)',
        'Change future tense into past tense',
        'Remove all subjects from the sentence',
        'Replace verbs with adjectives',
      ],
      cIdx: 0,
      exp: 'Voice transformation preserves the original tense and meaning while shifting focus between doer and receiver.',
      diff: 'Exam-Ready',
    },
    {
      q: `When solving unseen comprehension in Class ${cNum} exams, how should you write answers?`,
      opts: [
        'Locate passage facts accurately and write concise, grammatically complete sentences in your own words',
        'Copy an entire random paragraph blindly',
        'Write incomplete phrases with spelling errors',
        'Skip verifying the question tense',
      ],
      cIdx: 0,
      exp: 'Clear, complete sentences aligned to the question tense earn full comprehension marks.',
      diff: 'Exam-Ready',
    },
  ];

  return rawList.map((item, idx) => {
    const rotated = rotateOptions(item.opts, item.cIdx, seed + idx);
    return {
      id: `${idPrefix}-Q${idx + 1}`,
      question: item.q,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: item.exp,
      difficulty: item.diff,
    };
  });
}

function buildSocialTechGeneralQuestions(
  idPrefix: string,
  board: EducationBoard,
  cNum: number,
  subject: SubjectName,
  topic: string,
  chIdx: number
): ChapterPracticeTestQuestion[] {
  const seed = cNum * 19 + chIdx * 3;
  const isComputing =
    subject === 'Computer Knowledge' ||
    subject === 'Computer Studies' ||
    subject === 'Computer Applications' ||
    subject === 'Information Technology';

  const rawList: {
    q: string;
    opts: [string, string, string, string];
    cIdx: number;
    exp: string;
    diff: ChapterPracticeTestQuestion['difficulty'];
  }[] = isComputing
    ? [
        {
          q: 'How many Bits make 1 Byte in computer memory representation?',
          opts: ['8 Bits', '4 Bits', '16 Bits', '1024 Bits'],
          cIdx: 0,
          exp: '4 Bits = 1 Nibble, and 8 Bits = 1 Byte.',
          diff: 'Easy',
        },
        {
          q: 'Convert the binary number (1010)₂ into its Decimal (Base-10) equivalent:',
          opts: ['10', '8', '12', '5'],
          cIdx: 0,
          exp: '(1×8) + (0×4) + (1×2) + (0×1) = 8 + 0 + 2 + 0 = 10.',
          diff: 'Medium',
        },
        {
          q: 'Which two units together form the Central Processing Unit (CPU)?',
          opts: [
            'Arithmetic Logic Unit (ALU) and Control Unit (CU)',
            'Monitor and Printer',
            'Keyboard and Mouse',
            'Scanner and Speaker',
          ],
          cIdx: 0,
          exp: 'The CPU consists of the ALU (calculations/logic) and CU (instruction coordination).',
          diff: 'Easy',
        },
        {
          q: 'In web development, which HTML5 tag defines the main top-level visible heading on a page?',
          opts: ['<h1>', '<p>', '<br>', '<img>'],
          cIdx: 0,
          exp: '<h1> defines the primary top-level semantic heading in HTML5.',
          diff: 'Easy',
        },
        {
          q: 'Which protocol indicates a secure, encrypted connection between browser and educational website?',
          opts: ['HTTPS', 'HTTP (unencrypted)', 'FTP (plain)', 'TELNET'],
          cIdx: 0,
          exp: 'HTTPS uses TLS/SSL encryption to protect data in transit.',
          diff: 'Easy',
        },
        {
          q: 'In Object-Oriented Programming (OOP), wrapping data fields and methods together inside a class while hiding internal state is called:',
          opts: ['Encapsulation', 'Compilation', 'Fragmentation', 'Defragmentation'],
          cIdx: 0,
          exp: 'Encapsulation binds data and behaviour inside a single unit (class) with controlled access modifiers.',
          diff: 'Medium',
        },
        {
          q: '1 Kilobyte (KB) in binary computer storage equals how many Bytes?',
          opts: ['1024 Bytes', '100 Bytes', '512 Bytes', '10000 Bytes'],
          cIdx: 0,
          exp: '1 KB = 2¹⁰ = 1024 Bytes.',
          diff: 'Medium',
        },
        {
          q: 'Which cyber safety practice protects student accounts from unauthorised login?',
          opts: [
            'Using strong unique passwords with Two-Factor Authentication and never sharing OTPs',
            'Writing passwords publicly in chat',
            'Clicking unknown suspicious prize links',
            'Reusing "123456" across all accounts',
          ],
          cIdx: 0,
          exp: 'Strong passwords, 2FA, and strict OTP privacy prevent account hijacking.',
          diff: 'Exam-Ready',
        },
        {
          q: `Why are flowcharts and algorithms important before writing code in "${topic}"?`,
          opts: [
            'They map step-by-step logic clearly and detect edge-case flaws early',
            'They replace the computer hardware entirely',
            'They turn off monitor brightness',
            'They delete program memory',
          ],
          cIdx: 0,
          exp: 'Clear algorithmic design ensures bug-free, readable, and efficient implementation.',
          diff: 'Exam-Ready',
        },
        {
          q: `Which storage type retains operating system files permanently even after power is switched off?`,
          opts: ['Secondary Storage (SSD / HDD / ROM)', 'CPU Cache', 'ALU Register', 'Volatile RAM'],
          cIdx: 0,
          exp: 'Non-volatile secondary storage retains data without continuous power, unlike volatile RAM.',
          diff: 'Exam-Ready',
        },
      ]
    : [
        {
          q: 'Which constitutional document is the supreme law of the Republic of India?',
          opts: [
            'The Constitution of India',
            'Municipal By-Laws',
            'Railway Timetable',
            'Private School Charter',
          ],
          cIdx: 0,
          exp: 'Adopted on 26 November 1949 and enforced on 26 January 1950, the Constitution is India’s supreme law.',
          diff: 'Easy',
        },
        {
          q: 'Which Articles of the Indian Constitution guarantee Fundamental Rights to citizens?',
          opts: ['Articles 12 to 35', 'Articles 300 to 310', 'Articles 400 to 420', 'Articles 1 to 2 only'],
          cIdx: 0,
          exp: 'Part III (Articles 12–35) of the Constitution enshrines Fundamental Rights.',
          diff: 'Medium',
        },
        {
          q: 'Which seasonal wind system brings the majority of annual rainfall across India and Maharashtra?',
          opts: [
            'South-West Monsoon Winds',
            'Polar Easterlies',
            'Arctic Blizzard Winds',
            'Dry Trade Winds of Sahara',
          ],
          cIdx: 0,
          exp: 'South-West Monsoon winds from June to September bring ~75–85% of India’s seasonal rain.',
          diff: 'Easy',
        },
        {
          q: 'In historical analysis, why are coins, inscriptions, and archival manuscripts classified as Primary Sources?',
          opts: [
            'They were created directly during the historical period being studied',
            'They are modern fictional novels',
            'They contain no dates or names',
            'They are speculative guesses',
          ],
          cIdx: 0,
          exp: 'Primary sources provide direct, first-hand historical evidence from the era itself.',
          diff: 'Medium',
        },
        {
          q: 'What does "Sustainable Development" mean in Geography and Economics?',
          opts: [
            'Meeting present needs without compromising resources for future generations',
            'Consuming all non-renewable minerals rapidly',
            'Cutting all forests for factories',
            'Ignoring freshwater conservation',
          ],
          cIdx: 0,
          exp: 'Sustainable development balances economic progress with environmental conservation.',
          diff: 'Easy',
        },
        {
          q: 'Which soil type found abundantly in Maharashtra’s Deccan Plateau is ideal for cotton cultivation?',
          opts: ['Black Cotton Soil (Regur Soil)', 'Desert Sandy Soil', 'Alpine Permafrost', 'Peat Marsh Soil'],
          cIdx: 0,
          exp: 'Black Regur soil formed from basaltic Deccan Trap retains moisture and supports cotton & sugarcane.',
          diff: 'Medium',
        },
        {
          q: `Who was the Chairman of the Drafting Committee of the Indian Constitution?`,
          opts: ['Dr. B. R. Ambedkar', 'Lord Mountbatten', 'Vasco da Gama', 'Marco Polo'],
          cIdx: 0,
          exp: 'Bharat Ratna Dr. Babasaheb Ambedkar chaired the Constitution Drafting Committee.',
          diff: 'Easy',
        },
        {
          q: `In "${topic}" (${board} Class ${cNum} ${subject}), how should "Distinguish Between" questions be presented?`,
          opts: [
            'In a neat 2-column comparison table comparing matching criteria point-by-point',
            'In a single unpunctuated run-on paragraph',
            'By writing definitions of only one column',
            'Without naming the parameters',
          ],
          cIdx: 0,
          exp: 'A 2-column table contrasting matching dimensions ensures full clarity and maximum marks.',
          diff: 'Exam-Ready',
        },
        {
          q: `Why is chronological sequencing valuable when studying History & Civics chapters like "${topic}"?`,
          opts: [
            'It clarifies cause-and-effect links between historical milestones',
            'It mixes events out of order',
            'It replaces geographical maps completely',
            'It removes primary sources',
          ],
          cIdx: 0,
          exp: 'Tracking exact chronology shows how earlier reforms or movements led to later transformations.',
          diff: 'Exam-Ready',
        },
        {
          q: `Which constitutional Fundamental Duty encourages citizens to protect rivers, forests, lakes, and wildlife?`,
          opts: [
            'Article 51A(g) – Protecting natural environment and developing scientific temper',
            'Right to Commercial Monopoly',
            'Industrial Tax Exemption',
            'Traffic Signal Removal',
          ],
          cIdx: 0,
          exp: 'Article 51A lists Fundamental Duties including protecting the natural environment and wildlife.',
          diff: 'Exam-Ready',
        },
      ];

  return rawList.map((item, idx) => {
    const rotated = rotateOptions(item.opts, item.cIdx, seed + idx);
    return {
      id: `${idPrefix}-Q${idx + 1}`,
      question: item.q,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: item.exp,
      difficulty: item.diff,
    };
  });
}

/**
 * Generates a dedicated 10-Question Interactive Chapter Practice Test for ANY chapter
 * across Maharashtra State Board, CBSE, and ICSE (Classes 1 to 10) at zero cost.
 */
export function getChapterPracticeTest(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  chapterNumber: number,
  chapterTitle?: string
): ChapterPracticeTest {
  const chapters = getRichChaptersForSubject(board, classLevel, subject);
  const resolvedTitle =
    chapterTitle ||
    chapters[Math.max(0, chapterNumber - 1)] ||
    `Chapter ${chapterNumber}: ${subject}`;
  const topic = cleanChapterTitle(resolvedTitle);
  const cNum = getClassNum(classLevel);
  const subjMeta = getSubjectMeta(subject, board);
  const idPrefix = `CHTEST-${board.toUpperCase()}-C${cNum}-${subjMeta.shortCode}-CH${chapterNumber}`;

  let questions: ChapterPracticeTestQuestion[];
  if (
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry'
  ) {
    questions = buildMathChapterQuestions(idPrefix, board, cNum, subject, topic, chapterNumber - 1);
  } else if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    questions = buildScienceChapterQuestions(
      idPrefix,
      board,
      cNum,
      subject,
      topic,
      chapterNumber - 1
    );
  } else if (
    subject === 'English' ||
    subject === 'Vocabulary and Grammar' ||
    subject === 'Hindi' ||
    subject === 'Marathi' ||
    subject === 'Sanskrit'
  ) {
    questions = buildLanguageChapterQuestions(
      idPrefix,
      board,
      cNum,
      subject,
      topic,
      chapterNumber - 1
    );
  } else {
    questions = buildSocialTechGeneralQuestions(
      idPrefix,
      board,
      cNum,
      subject,
      topic,
      chapterNumber - 1
    );
  }

  return {
    id: idPrefix,
    board,
    classLevel,
    subject,
    chapterNumber,
    chapterTitle: resolvedTitle,
    durationMinutes: cNum <= 4 ? 10 : 15,
    totalMarks: questions.length * 2,
    questions,
  };
}
