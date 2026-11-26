export interface InstitutionAcademicMaterial {
  id: string;
  tier: 'School (Classes 1–10)' | 'Higher Secondary (Std 11–12)' | 'College & UG Foundations';
  streamOrSubject: string;
  materialType: 'Practical Lab Guide' | 'Academic Reference' | 'Project & Research Guide' | 'Exam Preparation Framework';
  title: string;
  overview: string;
  sections: Array<{
    heading: string;
    points: string[];
  }>;
  vivaQuestions: Array<{
    q: string;
    a: string;
  }>;
}

export const INSTITUTION_ACADEMIC_MATERIALS: InstitutionAcademicMaterial[] = [
  {
    id: 'iam-school-lab',
    tier: 'School (Classes 1–10)',
    streamOrSubject: 'Science Practicals & Lab Safety',
    materialType: 'Practical Lab Guide',
    title: 'Classes 6–10 Verified Science Practical & Observation Manual',
    overview:
      'Step-by-step experimental procedures, observation table formats, precaution checklists, and Viva-Voce prep for school board lab assessments.',
    sections: [
      {
        heading: 'Experiment A: Litmus & Phenolphthalein Acid-Base Identification',
        points: [
          'Observation Rule: Acids turn BLUE litmus RED (remember "B-to-R -> Acid"); Bases turn RED litmus BLUE.',
          'Neutral solutions (distilled water, NaCl solution) produce zero colour shift on either strip.',
          'Safety Precaution: Never taste unknown laboratory liquids; use clean glass rods for single-drop transfer.',
        ],
      },
      {
        heading: 'Experiment B: Verification of Ohm\'s Law (V = I × R) for Class 9–10',
        points: [
          'Connect Ammeter strictly in SERIES (+ to +) and Voltmeter strictly in PARALLEL across the unknown resistor.',
          'Plot Voltmeter (V) on Y-axis vs Current (I) on X-axis; the slope gives Resistance R = V / I in Ohms (Ω).',
          'Open the plug key between readings so the resistor wire does not heat up and change resistance.',
        ],
      },
    ],
    vivaQuestions: [
      { q: 'Why must an Ammeter be connected in series?', a: 'An ideal ammeter has very low resistance and measures full current flowing through that branch.' },
      { q: 'What does a straight line passing through origin in a V-I graph prove?', a: 'Current I is directly proportional to potential difference V at constant temperature (Ohm\'s Law).' },
    ],
  },
  {
    id: 'iam-hs-science',
    tier: 'Higher Secondary (Std 11–12)',
    streamOrSubject: 'Std 11–12 Science (Physics & Chemistry)',
    materialType: 'Practical Lab Guide',
    title: 'Junior College Volumetric Titration & Vernier Precision Guide',
    overview:
      'Essential Std 11–12 practical foundations: reading lower meniscus vs upper meniscus, molarity equation M1V1/n1 = M2V2/n2, and Vernier zero-error correction.',
    sections: [
      {
        heading: 'Volumetric Redox Titration (KMnO4 vs Oxalic Acid)',
        points: [
          'Colourless solutions (Oxalic acid, HCl, NaOH): read LOWER meniscus at eye level.',
          'Dark solutions (KMnO4): read UPPER meniscus at eye level; KMnO4 acts as a SELF-INDICATOR (end point = permanent pale pink for 30 sec).',
          'Heat oxalic acid to ~60–70 °C before titrating because the initial reaction with permanganate is slow at room temperature.',
        ],
      },
      {
        heading: 'Vernier Callipers Least Count & Zero Error',
        points: [
          'Least Count (LC) = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD) — commonly 0.1 mm = 0.01 cm.',
          'Total Reading = MSR + (VSR × LC) - (Signed Zero Error). Never forget to subtract positive zero error!',
        ],
      },
    ],
    vivaQuestions: [
      { q: 'Why is no external indicator added in KMnO4 vs Oxalic Acid titration?', a: 'Potassium permanganate is intensely purple and turns colourless on reduction, acting as its own self-indicator.' },
      { q: 'What is the common Least Count of a 10-division Vernier Calliper?', a: '0.01 cm (0.1 mm).' },
    ],
  },
  {
    id: 'iam-hs-commerce',
    tier: 'Higher Secondary (Std 11–12)',
    streamOrSubject: 'Std 11–12 Commerce (Accountancy & Economics)',
    materialType: 'Academic Reference',
    title: 'Golden Rules of Double-Entry Bookkeeping & Final Accounts Checklist',
    overview:
      'Master Personal, Real, and Nominal golden rules, Trial Balance error detection, and Trading vs Profit & Loss separation.',
    sections: [
      {
        heading: 'Three Golden Rules of Accounting',
        points: [
          'Personal Account (Persons/Firms): Debit the Receiver, Credit the Giver.',
          'Real Account (Assets/Cash/Machinery): Debit What Comes In, Credit What Goes Out.',
          'Nominal Account (Expenses/Losses/Incomes): Debit All Expenses & Losses, Credit All Incomes & Gains.',
        ],
      },
      {
        heading: 'Trial Balance & Common Adjustments',
        points: [
          'Closing Stock outside Trial Balance appears twice: Credit side of Trading A/c AND Asset side of Balance Sheet.',
          'Outstanding Expenses: Add to concerned expense on Debit side + show as Current Liability in Balance Sheet.',
        ],
      },
    ],
    vivaQuestions: [
      { q: 'Which rule classifies Machinery Purchase A/c?', a: 'Real Account — Tangible asset coming into the business (Debit).' },
      { q: 'Why does Prepaid Expense appear as an Asset in the Balance Sheet?', a: 'Its economic benefit has already been paid for and extends into the next accounting period.' },
    ],
  },
  {
    id: 'iam-college-ug',
    tier: 'College & UG Foundations',
    streamOrSubject: 'Academic Research, IMRAD Reports & GPA',
    materialType: 'Project & Research Guide',
    title: 'Undergraduate Lab Report (IMRAD), Citation & Credit-GPA Framework',
    overview:
      'Structured blueprint for writing semester practical/project reports, avoiding plagiarism with proper citations, and computing 10-point SGPA/CGPA.',
    sections: [
      {
        heading: 'Standard IMRAD Scientific & Project Report Format',
        points: [
          'Introduction: Problem context, research gap, and clear objective statement.',
          'Methods: Apparatus, sample size, variables, and reproducible steps in passive/objective past tense.',
          'Results & Discussion: Clean labelled tables/charts first, followed by comparison against expected theory and error limits.',
        ],
      },
      {
        heading: 'Semester Grade Point Average (SGPA) Computation',
        points: [
          'Multiply each course Credit Points (Ci) by Grade Point Earned (Gi): SGPA = Σ(Ci × Gi) / Σ(Ci).',
          'Never average percentages directly without weighting by course credits!',
        ],
      },
    ],
    vivaQuestions: [
      { q: 'What does IMRAD stand for in academic writing?', a: 'Introduction, Methods, Results, and Discussion.' },
      { q: 'Why are course credits used as weights in SGPA?', a: 'A 4-credit core lab/theory course contributes twice as much weight as a 2-credit elective.' },
    ],
  },
];
