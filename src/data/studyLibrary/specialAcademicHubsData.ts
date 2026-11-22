import { ClassLevel, EducationBoard } from '../../types';

/**
 * Phase 4 — Special Academic Hubs Data (100% Free, Zero Firestore Reads/Writes, 0 MB Storage)
 * Covers Classes 1 to 10 across Maharashtra State Board, CBSE, and ICSE:
 *  I. Mathematics Formulas & Practice Hub
 *  J. Science Diagrams & Explanations Hub (12 Vector SVG Diagrams)
 *  K. English Grammar & Vocabulary Hub
 *  L. Scholarship & Olympiad Preparation Hub
 */

export type StageTier = 'Primary (Classes 1–4)' | 'Middle (Classes 5–8)' | 'Secondary (Classes 9–10)';

export interface MathFormulaEntry {
  name: string;
  formula: string;
  variables: string;
  example: string;
}

export interface MathPracticeProblem {
  id: string;
  question: string;
  answer: string;
  steps: string;
}

export interface MathFormulaTopic {
  id: string;
  title: string;
  stage: StageTier;
  boards: EducationBoard[];
  formulas: MathFormulaEntry[];
  practiceProblems: MathPracticeProblem[];
}

export const MATH_FORMULA_TOPICS: MathFormulaTopic[] = [
  {
    id: 'math_number_bodmas',
    title: 'Number System, Place Value & BODMAS',
    stage: 'Primary (Classes 1–4)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    formulas: [
      {
        name: 'Indian Place Value System',
        formula: '10 Ones = 1 Ten | 10 Tens = 1 Hundred | 10 Hundreds = 1 Thousand | 100 Thousands = 1 Lakh',
        variables: 'Grouped from right as 3-2-2 (e.g., 1,25,400)',
        example: 'Place value of 5 in 4,520 is 5 × 100 = 500.',
      },
      {
        name: 'Division Verification Algorithm',
        formula: 'Dividend = (Divisor × Quotient) + Remainder',
        variables: '0 ≤ Remainder < Divisor',
        example: '47 ÷ 5 → Quotient = 9, Remainder = 2 → (5 × 9) + 2 = 47.',
      },
      {
        name: 'BODMAS Order of Operations',
        formula: 'Brackets → Of (Orders) → Division → Multiplication → Addition → Subtraction',
        variables: 'Evaluate inner brackets ( ) before { } and [ ]',
        example: '12 + 4 × (9 − 3) = 12 + 4 × 6 = 12 + 24 = 36.',
      },
      {
        name: 'HCF × LCM Relationship',
        formula: 'HCF(a, b) × LCM(a, b) = a × b',
        variables: 'Valid for any two positive integers a and b',
        example: 'For 12 and 18: HCF = 6, LCM = 36 → 6 × 36 = 216 = 12 × 18.',
      },
    ],
    practiceProblems: [
      {
        id: 'mp_nb_1',
        question: 'Evaluate: 48 ÷ (4 + 2) + 7 × 3',
        answer: '29',
        steps: 'Bracket first: 4 + 2 = 6. Division: 48 ÷ 6 = 8. Multiplication: 7 × 3 = 21. Addition: 8 + 21 = 29.',
      },
      {
        id: 'mp_nb_2',
        question: 'Two numbers have HCF = 8 and LCM = 96. If one number is 24, find the other number.',
        answer: '32',
        steps: 'Other number = (HCF × LCM) ÷ First number = (8 × 96) ÷ 24 = 768 ÷ 24 = 32.',
      },
    ],
  },
  {
    id: 'math_fractions_commercial',
    title: 'Fractions, Percentages, Profit-Loss & Interest',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    formulas: [
      {
        name: 'Percentage Formula',
        formula: 'Percentage (%) = (Part / Whole) × 100',
        variables: 'Convert % to fraction by dividing by 100',
        example: '45 out of 60 marks = (45/60) × 100 = 75%.',
      },
      {
        name: 'Profit & Loss Percent',
        formula: 'Profit% = [(SP − CP) / CP] × 100  |  Loss% = [(CP − SP) / CP] × 100',
        variables: 'CP = Cost Price, SP = Selling Price',
        example: 'CP = ₹400, SP = ₹460 → Profit = ₹60 → Profit% = (60/400)×100 = 15%.',
      },
      {
        name: 'Simple Interest (SI)',
        formula: 'SI = (P × R × T) / 100  |  Amount A = P + SI',
        variables: 'P = Principal, R = Rate % p.a., T = Time in years',
        example: 'P = ₹2,000, R = 6%, T = 3 yrs → SI = (2000×6×3)/100 = ₹360.',
      },
      {
        name: 'Compound Interest (CI)',
        formula: 'A = P(1 + R/100)ⁿ  |  CI = A − P',
        variables: 'n = number of compounding years',
        example: 'P = ₹1,000, R = 10%, n = 2 → A = 1000 × (1.1)² = ₹1,210; CI = ₹210.',
      },
    ],
    practiceProblems: [
      {
        id: 'mp_fc_1',
        question: 'A bicycle bought for ₹5,000 is sold at a 12% profit. Find its Selling Price.',
        answer: '₹5,600',
        steps: 'Profit = 12% of 5000 = (12/100) × 5000 = ₹600. SP = CP + Profit = 5000 + 600 = ₹5,600.',
      },
      {
        id: 'mp_fc_2',
        question: 'Find the Simple Interest on ₹4,500 at 8% per annum for 2 years.',
        answer: '₹720',
        steps: 'SI = (P × R × T) / 100 = (4500 × 8 × 2) / 100 = 45 × 16 = ₹720.',
      },
    ],
  },
  {
    id: 'math_algebra_identities',
    title: 'Algebraic Identities, Linear & Quadratic Equations',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    formulas: [
      {
        name: 'Square of Sum & Difference',
        formula: '(a + b)² = a² + 2ab + b²  |  (a − b)² = a² − 2ab + b²',
        variables: 'Also: (a + b)² − (a − b)² = 4ab',
        example: '103² = (100 + 3)² = 10000 + 600 + 9 = 10,609.',
      },
      {
        name: 'Difference of Squares',
        formula: 'a² − b² = (a + b)(a − b)',
        variables: 'Essential for rapid factorisation',
        example: '98² − 2² = (98 + 2)(98 − 2) = 100 × 96 = 9,600.',
      },
      {
        name: 'Cube Identities',
        formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³  |  a³ − b³ = (a − b)(a² + ab + b²)',
        variables: 'Used in Class 8–10 polynomial factorisation',
        example: '(x + 2)³ = x³ + 6x² + 12x + 8.',
      },
      {
        name: 'Laws of Exponents',
        formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ ÷ aⁿ = aᵐ⁻ⁿ  |  (aᵐ)ⁿ = aᵐⁿ  |  a⁰ = 1 (a ≠ 0)',
        variables: 'Base a ≠ 0, integers m and n',
        example: '2⁵ × 2³ ÷ 2⁶ = 2^(5+3−6) = 2² = 4.',
      },
    ],
    practiceProblems: [
      {
        id: 'mp_alg_1',
        question: 'Evaluate 75² − 25² quickly using an algebraic identity.',
        answer: '5,000',
        steps: 'Using a² − b² = (a + b)(a − b): (75 + 25)(75 − 25) = 100 × 50 = 5,000.',
      },
      {
        id: 'mp_alg_2',
        question: 'Simplify: (3⁴ × 3⁵) ÷ 3⁷',
        answer: '9',
        steps: '3^(4+5−7) = 3² = 9.',
      },
    ],
  },
  {
    id: 'math_mensuration_geometry',
    title: 'Geometry & Mensuration (2D & 3D Shapes)',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    formulas: [
      {
        name: 'Rectangle & Square',
        formula: 'Rect: P = 2(l+b), A = l×b  |  Square: P = 4s, A = s², Diagonal = s√2',
        variables: 'l = length, b = breadth, s = side',
        example: 'Square of side 9 cm: P = 36 cm, A = 81 cm².',
      },
      {
        name: 'Triangle & Pythagoras Theorem',
        formula: 'Area = ½ × base × height  |  Heron: √[s(s−a)(s−b)(s−c)]  |  c² = a² + b²',
        variables: 'Semi-perimeter s = (a+b+c)/2',
        example: 'Right triangle legs 9 cm, 12 cm → Hypotenuse = √(81+144) = 15 cm.',
      },
      {
        name: 'Circle & Sector',
        formula: 'Circumference = 2πr  |  Area = πr²  |  Arc Length = (θ/360°)×2πr',
        variables: 'r = radius, π ≈ 22/7 or 3.14',
        example: 'Radius r = 7 cm → Area = (22/7) × 7 × 7 = 154 cm².',
      },
      {
        name: '3D Solids (Cylinder, Cone, Sphere)',
        formula: 'Cylinder V = πr²h | Cone V = ⅓πr²h | Sphere V = ⁴⁄₃πr³, SA = 4πr²',
        variables: 'Slant height of cone l = √(r² + h²)',
        example: 'Cylinder r = 7 cm, h = 10 cm → V = (22/7)×49×10 = 1,540 cm³.',
      },
    ],
    practiceProblems: [
      {
        id: 'mp_geo_1',
        question: 'Find the curved surface area (2πrh) of a cylinder with radius 7 cm and height 15 cm.',
        answer: '660 cm²',
        steps: 'CSA = 2 × (22/7) × 7 × 15 = 44 × 15 = 660 cm².',
      },
      {
        id: 'mp_geo_2',
        question: 'Find the volume of a cone with radius 3 cm and height 7 cm (π = 22/7).',
        answer: '66 cm³',
        steps: 'V = (1/3) × (22/7) × 3 × 3 × 7 = 22 × 3 = 66 cm³.',
      },
    ],
  },
  {
    id: 'math_secondary_board',
    title: 'Board Mathematics: Quadratics, AP, Trigonometry & GST',
    stage: 'Secondary (Classes 9–10)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    formulas: [
      {
        name: 'Quadratic Formula & Discriminant',
        formula: 'x = [−b ± √(b² − 4ac)] / (2a)  |  Δ = b² − 4ac',
        variables: 'Δ > 0 real & distinct; Δ = 0 real & equal; Δ < 0 no real roots',
        example: 'x² − 5x + 6 = 0 → Δ = 25 − 24 = 1 → x = (5 ± 1)/2 = 3 or 2.',
      },
      {
        name: 'Arithmetic Progression (A.P.)',
        formula: 'tₙ = a + (n − 1)d  |  Sₙ = (n/2)[2a + (n − 1)d] = (n/2)(a + l)',
        variables: 'a = first term, d = common difference, n = number of terms',
        example: 'For 4, 7, 10, ... (d=3): t₁₂ = 4 + 11(3) = 37.',
      },
      {
        name: 'Trigonometric Identities',
        formula: 'sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ  |  1 + cot²θ = cosec²θ',
        variables: 'sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj',
        example: 'If sin θ = 3/5, then cos θ = √(1 − 9/25) = 4/5 and tan θ = 3/4.',
      },
      {
        name: 'Coordinate Geometry & Commercial GST / RD',
        formula: 'd = √[(x₂−x₁)²+(y₂−y₁)²] | Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) | RD I = P·n(n+1)/(24) · (r/100)',
        variables: 'Intrastate GST = CGST + SGST (half each); Interstate = IGST',
        example: 'Distance between (0, 0) and (3, 4) is √(9 + 16) = 5 units.',
      },
    ],
    practiceProblems: [
      {
        id: 'mp_sec_1',
        question: 'Find the discriminant Δ and nature of roots for 2x² − 7x + 3 = 0.',
        answer: 'Δ = 25 (Real and unequal roots)',
        steps: 'a = 2, b = −7, c = 3. Δ = (−7)² − 4(2)(3) = 49 − 24 = 25 > 0 → Real and distinct roots.',
      },
      {
        id: 'mp_sec_2',
        question: 'Find the sum of the first 20 natural numbers using the A.P. sum formula.',
        answer: '210',
        steps: 'a = 1, l = 20, n = 20. S₂₀ = (20/2)(1 + 20) = 10 × 21 = 210.',
      },
    ],
  },
];

export const MATH_QUICK_CONVERSIONS: { category: string; items: string[] }[] = [
  {
    category: 'Length Conversions',
    items: ['10 mm = 1 cm', '100 cm = 1 m', '1,000 m = 1 km', '1 inch ≈ 2.54 cm'],
  },
  {
    category: 'Mass & Capacity',
    items: ['1,000 mg = 1 g', '1,000 g = 1 kg', '100 kg = 1 Quintal', '1,000 mL = 1 Litre (1 dm³)'],
  },
  {
    category: 'Speed & Time',
    items: ['km/h × (5/18) = m/s', 'm/s × (18/5) = km/h', '1 Hour = 3,600 Seconds', '1 Leap Year = 366 Days'],
  },
  {
    category: 'Key Squares & Cubes',
    items: [
      '11²=121, 12²=144, 13²=169, 14²=196, 15²=225',
      '16²=256, 17²=289, 18²=324, 19²=361, 25²=625',
      '2³=8, 3³=27, 4³=64, 5³=125, 6³=216',
      '7³=343, 8³=512, 9³=729, 10³=1000',
    ],
  },
];

// ==========================================
// J. SCIENCE DIAGRAMS & EXPLANATIONS HUB (12 SVG DIAGRAMS)
// ==========================================

export type ScienceDiagramKey =
  | 'plant_cell'
  | 'digestive_system'
  | 'respiratory_system'
  | 'human_heart'
  | 'photosynthesis'
  | 'water_cycle'
  | 'electric_circuit'
  | 'convex_lens_ray'
  | 'atom_structure'
  | 'flowering_plant'
  | 'solar_system'
  | 'food_pyramid';

export interface ScienceDiagramItem {
  id: ScienceDiagramKey;
  title: string;
  discipline: 'Biology' | 'Physics' | 'Chemistry' | 'EVS & Earth Science';
  stage: StageTier;
  boards: EducationBoard[];
  summary: string;
  keyParts: { label: string; functionText: string }[];
  examDrawingTips: string[];
  vivaQuestions: { q: string; a: string }[];
}

export const SCIENCE_DIAGRAMS_LIST: ScienceDiagramItem[] = [
  {
    id: 'plant_cell',
    title: 'Structure of a Plant Cell',
    discipline: 'Biology',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'A eukaryotic plant cell features a rigid cellulose cell wall, a large central vacuole for turgidity, and green chloroplasts containing chlorophyll for photosynthesis.',
    keyParts: [
      { label: 'Cell Wall', functionText: 'Rigid cellulose outer layer providing fixed shape and protection.' },
      { label: 'Cell Membrane', functionText: 'Semi-permeable inner boundary regulating movement of substances.' },
      { label: 'Nucleus', functionText: 'Control centre containing chromosomes/DNA regulating cell activities.' },
      { label: 'Chloroplast', functionText: 'Contains green pigment chlorophyll to synthesise glucose in sunlight.' },
      { label: 'Large Central Vacuole', functionText: 'Stores cell sap, water, and nutrients; maintains cell turgor.' },
      { label: 'Mitochondria', functionText: 'Powerhouse of the cell generating ATP energy through respiration.' },
    ],
    examDrawingTips: [
      'Draw a double-walled hexagonal outline first to show the rigid Cell Wall clearly.',
      'Place the Large Vacuole centrally and push the Nucleus slightly toward one side.',
    ],
    vivaQuestions: [
      { q: 'Which two organelles are present in plant cells but absent in animal cells?', a: 'Cell wall and Chloroplasts (plastids).' },
      { q: 'Why are mitochondria called the powerhouse of the cell?', a: 'They perform cellular respiration to release energy stored as ATP.' },
    ],
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis & Leaf Gas Exchange',
    discipline: 'Biology',
    stage: 'Primary (Classes 1–4)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Green leaves trap solar energy using chlorophyll, absorb CO₂ through stomata and water via roots/xylem to produce glucose and release life-supporting Oxygen.',
    keyParts: [
      { label: 'Sunlight Energy', functionText: 'Provides photonic energy required to split water molecules.' },
      { label: 'Carbon Dioxide (CO₂)', functionText: 'Enters leaf blade through microscopic stomatal pores.' },
      { label: 'Water & Minerals (H₂O)', functionText: 'Absorbed by root hairs and conducted upward through Xylem.' },
      { label: 'Chlorophyll (Leaf)', functionText: 'Green pigment inside chloroplasts that captures sunlight.' },
      { label: 'Oxygen Released (O₂)', functionText: 'By-product released into atmosphere essential for aerobic respiration.' },
      { label: 'Glucose / Starch', functionText: 'Prepared carbohydrate food translocated by Phloem.' },
    ],
    examDrawingTips: [
      'Always write the balanced equation below the diagram: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.',
      'Use clear inward arrows for Sunlight/CO₂/Water and outward arrows for Oxygen.',
    ],
    vivaQuestions: [
      { q: 'Which reagent tests the presence of starch in a green leaf?', a: 'Dilute Iodine solution (turns blue-black in presence of starch).' },
      { q: 'Which cells control opening and closing of stomata?', a: 'Bean-shaped Guard Cells.' },
    ],
  },
  {
    id: 'digestive_system',
    title: 'Human Digestive System',
    discipline: 'Biology',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Breaks down complex insoluble food nutrients into simple absorbable molecules along the alimentary canal with enzymes from salivary glands, liver, and pancreas.',
    keyParts: [
      { label: 'Mouth & Salivary Glands', functionText: 'Mechanical chewing and salivary amylase converts starch to maltose.' },
      { label: 'Oesophagus (Food Pipe)', functionText: 'Pushes bolus smoothly down to stomach via peristaltic waves.' },
      { label: 'Stomach', functionText: 'Secretes HCl (kills germs), mucus, and pepsin for protein digestion.' },
      { label: 'Liver & Pancreas', functionText: 'Liver secretes bile (emulsifies fats); pancreas releases trypsin & lipase.' },
      { label: 'Small Intestine', functionText: 'Site of complete digestion and nutrient absorption via finger-like villi.' },
      { label: 'Large Intestine', functionText: 'Absorbs excess water and compacts undigested residue for egestion.' },
    ],
    examDrawingTips: [
      'Show the J-shaped stomach on the left side and triangular liver slightly above right.',
      'Draw coiled loops for the Small Intestine framed neatly by the wider Large Intestine.',
    ],
    vivaQuestions: [
      { q: 'Where does complete digestion and absorption of food occur?', a: 'In the Small Intestine (through villi).' },
      { q: 'What is the role of Hydrochloric Acid (HCl) in the stomach?', a: 'It creates an acidic medium for pepsin enzyme action and destroys ingested bacteria.' },
    ],
  },
  {
    id: 'respiratory_system',
    title: 'Human Respiratory System',
    discipline: 'Biology',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Facilitates inhalation of oxygen-rich air and exhalation of carbon dioxide via alveoli clusters inside spongy lungs driven by diaphragm contraction.',
    keyParts: [
      { label: 'Nasal Cavity & Pharynx', functionText: 'Filters dust, warms, and moistens incoming air.' },
      { label: 'Trachea (Windpipe)', functionText: 'Supported by C-shaped cartilaginous rings preventing collapse.' },
      { label: 'Bronchi & Bronchioles', functionText: 'Branching airways directing air into left and right lungs.' },
      { label: 'Alveoli (Air Sacs)', functionText: 'Thin-walled capillaries where O₂ diffuses into blood and CO₂ diffuses out.' },
      { label: 'Diaphragm', functionText: 'Dome-shaped muscular sheet that flattens during inhalation to expand chest volume.' },
    ],
    examDrawingTips: [
      'Draw distinct C-shaped cartilage rings along the Trachea.',
      'Keep the dome-shaped muscular Diaphragm curved neatly underneath both lungs.',
    ],
    vivaQuestions: [
      { q: 'Why does the trachea have rings of cartilage?', a: 'To keep the air passage open and prevent it from collapsing when air pressure drops.' },
      { q: 'Which pigment in red blood cells carries oxygen?', a: 'Haemoglobin.' },
    ],
  },
  {
    id: 'human_heart',
    title: 'Human Heart & Double Circulation',
    discipline: 'Biology',
    stage: 'Secondary (Classes 9–10)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'The four-chambered muscular human heart pumps deoxygenated blood to lungs (pulmonary circuit) and oxygenated blood to body tissues (systemic circuit) without mixing.',
    keyParts: [
      { label: 'Right Atrium & Right Ventricle', functionText: 'Receives deoxygenated blood from Vena Cava and pumps it to lungs via Pulmonary Artery.' },
      { label: 'Left Atrium & Left Ventricle', functionText: 'Receives oxygenated blood from lungs via Pulmonary Vein and pumps to entire body via Aorta.' },
      { label: 'Septum', functionText: 'Thick muscular dividing wall preventing mixing of oxygenated and deoxygenated blood.' },
      { label: 'Valves (Tricuspid & Bicuspid)', functionText: 'Ensure strictly unidirectional blood flow without backflow.' },
    ],
    examDrawingTips: [
      'Draw the Left Ventricle muscular wall noticeably thicker than the Right Ventricle.',
      'Use blue arrows for deoxygenated blood (right side) and red arrows for oxygenated blood (left side).',
    ],
    vivaQuestions: [
      { q: 'Why is the left ventricular wall thicker than the right?', a: 'Because it must pump oxygenated blood at high pressure to the entire body via the Aorta.' },
      { q: 'Which artery carries deoxygenated blood?', a: 'The Pulmonary Artery.' },
    ],
  },
  {
    id: 'water_cycle',
    title: 'The Natural Water Cycle (Hydrological Cycle)',
    discipline: 'EVS & Earth Science',
    stage: 'Primary (Classes 1–4)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Continuous solar-driven circulation of Earth’s water across oceans, atmosphere, clouds, rainfall, rivers, and underground aquifers.',
    keyParts: [
      { label: 'Evaporation', functionText: 'Solar heat turns surface water from oceans/rivers into rising water vapour.' },
      { label: 'Transpiration', functionText: 'Green plants release water vapour from leaf stomata into the air.' },
      { label: 'Condensation', functionText: 'Water vapour cools high in the sky forming tiny droplets that create clouds.' },
      { label: 'Precipitation', functionText: 'Heavy condensed droplets fall back to Earth as rain, hail, or snow.' },
      { label: 'Collection & Percolation', functionText: 'Rainwater flows into rivers/seas and seeps underground to recharge groundwater.' },
    ],
    examDrawingTips: [
      'Show four clear directional arrows forming a continuous closed loop between sea, clouds, mountains, and river.',
    ],
    vivaQuestions: [
      { q: 'Which process changes water vapour back into liquid cloud droplets?', a: 'Condensation.' },
      { q: 'What is the primary energy source driving the Water Cycle?', a: 'The Sun (Solar heat energy).' },
    ],
  },
  {
    id: 'electric_circuit',
    title: 'Electric Circuit & Ohm’s Law Setup',
    discipline: 'Physics',
    stage: 'Secondary (Classes 9–10)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Standard laboratory circuit demonstrating V = I × R using a DC cell battery, switch key, resistor, Ammeter connected in series, and Voltmeter in parallel.',
    keyParts: [
      { label: 'Battery / Cell (+ / −)', functionText: 'Maintains electrical potential difference (Voltage V) across the circuit.' },
      { label: 'Plug Key / Switch', functionText: 'Opens or closes the conducting path safely.' },
      { label: 'Resistor (R)', functionText: 'Opposes electric current flow; measured in Ohms (Ω).' },
      { label: 'Ammeter (A) — Series', functionText: 'Low-resistance instrument connected in series to measure current I (Amperes).' },
      { label: 'Voltmeter (V) — Parallel', functionText: 'High-resistance instrument connected in parallel across R to measure potential difference V.' },
    ],
    examDrawingTips: [
      'Always mark + and − polarity terminals on the battery, Ammeter, and Voltmeter.',
      'Draw the Ammeter inline (series) and Voltmeter branching across the resistor (parallel).',
    ],
    vivaQuestions: [
      { q: 'State Ohm’s Law.', a: 'At constant temperature, electric current I through a conductor is directly proportional to potential difference V across its ends (V = I × R).' },
      { q: 'Why is a Voltmeter always connected in parallel?', a: 'It has very high resistance so it measures potential difference across two points without drawing significant current.' },
    ],
  },
  {
    id: 'convex_lens_ray',
    title: 'Ray Diagram — Convex Lens Image Formation',
    discipline: 'Physics',
    stage: 'Secondary (Classes 9–10)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Shows how a converging convex lens bends parallel light rays through the principal focus F₂ to form a real, inverted image when the object is placed beyond 2F₁.',
    keyParts: [
      { label: 'Optical Centre (O)', functionText: 'Central point of lens; any ray passing through O travels undeviated.' },
      { label: 'Principal Axis', functionText: 'Straight horizontal line passing through O, F₁, 2F₁, F₂, and 2F₂.' },
      { label: 'Focus (F₁ & F₂)', functionText: 'Point where rays parallel to the principal axis converge after refraction.' },
      { label: 'Object (AB beyond 2F₁)', functionText: 'Produces a Real, Inverted, and Diminished image A′B′ between F₂ and 2F₂.' },
    ],
    examDrawingTips: [
      'Use a ruler to mark equal distances O→F and F→2F on both sides of the lens.',
      'Never forget directional arrowheads on every incident and refracted light ray!',
    ],
    vivaQuestions: [
      { q: 'What is the SI unit of Power of a Lens?', a: 'Dioptre (D), where P = 1 / f (in metres).' },
      { q: 'Which lens is used to correct Hypermetropia (farsightedness)?', a: 'Convex (converging) lens.' },
    ],
  },
  {
    id: 'atom_structure',
    title: 'Bohr’s Atomic Model & Electron Shells',
    discipline: 'Chemistry',
    stage: 'Secondary (Classes 9–10)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Illustrates the central positively charged nucleus (Protons + Neutrons) surrounded by concentric discrete energy shells K, L, M holding electrons per the 2n² rule.',
    keyParts: [
      { label: 'Nucleus (Protons + Neutrons)', functionText: 'Dense positive core accounting for almost all atomic mass.' },
      { label: 'K-Shell (n = 1)', functionText: 'Innermost orbit holding maximum 2(1)² = 2 electrons.' },
      { label: 'L-Shell (n = 2)', functionText: 'Second orbit holding maximum 2(2)² = 8 electrons.' },
      { label: 'M-Shell (n = 3) / Valence Shell', functionText: 'Outermost shell electrons determine chemical valency and bonding (e.g., Sodium: 2, 8, 1).' },
    ],
    examDrawingTips: [
      'Draw concentric circles neatly using a compass; show the electronic configuration (e.g., Na = 2, 8, 1) below.',
    ],
    vivaQuestions: [
      { q: 'What is the maximum number of electrons the L-shell (n=2) can hold?', a: '2n² = 2(2)² = 8 electrons.' },
      { q: 'Why is an atom electrically neutral overall?', a: 'Because the number of positively charged protons equals the number of negatively charged electrons.' },
    ],
  },
  {
    id: 'flowering_plant',
    title: 'Parts of a Flowering Plant & Bisexual Flower',
    discipline: 'Biology',
    stage: 'Primary (Classes 1–4)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Distinguishes the underground Root System (anchorage & absorption) from the aerial Shoot System (Stem, Leaves, Flower, and Fruit).',
    keyParts: [
      { label: 'Root System', functionText: 'Anchors plant in soil and absorbs water and mineral salts.' },
      { label: 'Stem', functionText: 'Supports leaves/flowers and houses Xylem & Phloem vascular bundles.' },
      { label: 'Leaf', functionText: 'Food factory performing photosynthesis and transpiration.' },
      { label: 'Flower (Stamen & Pistil)', functionText: 'Reproductive organ producing pollen and ovules that develop into seeds/fruits.' },
    ],
    examDrawingTips: [
      'Draw a clear soil line separating Root System below from Shoot System above.',
    ],
    vivaQuestions: [
      { q: 'Which part of the flower develops into a fruit after fertilisation?', a: 'The Ovary (and ovules develop into seeds).' },
      { q: 'Name the two main types of root systems.', a: 'Taproot system (dicots) and Fibrous root system (monocots).' },
    ],
  },
  {
    id: 'solar_system',
    title: 'The Solar System & Planetary Orbits',
    discipline: 'EVS & Earth Science',
    stage: 'Primary (Classes 1–4)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Our gravitational planetary family centred on the Sun, comprising 4 inner rocky planets (Mercury, Venus, Earth, Mars) and 4 outer gas/ice giants (Jupiter, Saturn, Uranus, Neptune).',
    keyParts: [
      { label: 'The Sun', functionText: 'Star at the centre providing heat, light, and gravitational pull.' },
      { label: 'Inner Terrestrial Planets', functionText: 'Mercury, Venus, Earth (Blue Planet), and Mars (Red Planet).' },
      { label: 'Asteroid Belt', functionText: 'Rocky fragments orbiting between Mars and Jupiter.' },
      { label: 'Outer Giant Planets', functionText: 'Jupiter (largest), Saturn (prominent rings), Uranus, and Neptune.' },
    ],
    examDrawingTips: [
      'Remember planet order using mnemonic: "My Very Educated Mother Just Served Us Noodles".',
    ],
    vivaQuestions: [
      { q: 'Which planet is known as the Morning and Evening Star (hottest planet)?', a: 'Venus.' },
      { q: 'Between which two planets does the main Asteroid Belt lie?', a: 'Between Mars and Jupiter.' },
    ],
  },
  {
    id: 'food_pyramid',
    title: 'Ecological Food Chain & 10% Energy Pyramid',
    discipline: 'EVS & Earth Science',
    stage: 'Middle (Classes 5–8)',
    boards: ['Maharashtra', 'CBSE', 'ICSE'],
    summary:
      'Illustrates unidirectional energy flow across trophic levels where producers capture solar energy and only ~10% transfers upward at each consecutive level.',
    keyParts: [
      { label: 'Trophic Level 1 — Producers (10,000 J)', functionText: 'Autotrophic green plants converting sunlight into chemical energy.' },
      { label: 'Trophic Level 2 — Primary Consumers (1,000 J)', functionText: 'Herbivores (deer, grasshoppers) feeding directly on plants.' },
      { label: 'Trophic Level 3 — Secondary Consumers (100 J)', functionText: 'Small carnivores (frogs, foxes) feeding on herbivores.' },
      { label: 'Trophic Level 4 — Apex Predators (10 J)', functionText: 'Top carnivores (eagles, tigers); decomposers recycle nutrients back to soil.' },
    ],
    examDrawingTips: [
      'Always draw the pyramid widest at the base (Producers) tapering steadily toward Apex Predators.',
    ],
    vivaQuestions: [
      { q: 'Why do food chains rarely have more than 4–5 trophic levels?', a: 'Because 90% energy is lost at each step, leaving too little usable energy beyond the 4th–5th level.' },
      { q: 'Why is energy flow in an ecosystem always unidirectional?', a: 'Energy lost as metabolic heat cannot return to green plants or the Sun.' },
    ],
  },
];

// ==========================================
// K. ENGLISH GRAMMAR & VOCABULARY HUB
// ==========================================

export interface GrammarRuleModule {
  id: string;
  title: string;
  stage: StageTier;
  summary: string;
  rules: { heading: string; formulaOrRule: string; example: string }[];
  quickDrill: { prompt: string; answer: string }[];
}

export const ENGLISH_GRAMMAR_MODULES: GrammarRuleModule[] = [
  {
    id: 'eng_parts_of_speech',
    title: '8 Parts of Speech Master Guide',
    stage: 'Primary (Classes 1–4)',
    summary: 'Every word in an English sentence performs one of 8 distinct grammatical roles.',
    rules: [
      { heading: 'Noun & Pronoun', formulaOrRule: 'Noun names a person/place/thing/idea; Pronoun replaces a noun.', example: 'Riya (Noun) loves books; she (Pronoun) reads daily.' },
      { heading: 'Verb & Adverb', formulaOrRule: 'Verb expresses action/state; Adverb modifies verb, adjective, or adverb.', example: 'The train moved (Verb) swiftly (Adverb).' },
      { heading: 'Adjective', formulaOrRule: 'Describes quality, quantity, or number of a noun/pronoun.', example: 'The diligent (Adjective) student solved five (Adjective) sums.' },
      { heading: 'Preposition, Conjunction & Interjection', formulaOrRule: 'Preposition shows relation; Conjunction joins clauses; Interjection shows sudden feeling.', example: 'Bravo! (Interj.) He stood on (Prep.) stage and (Conj.) spoke clearly.' },
    ],
    quickDrill: [
      { prompt: 'Identify the underlined word’s part of speech: "She answered the question *confidently*."', answer: 'Adverb (modifies the verb "answered").' },
      { prompt: 'Identify the collective noun: "A _____ of ships sailed into Mumbai harbour."', answer: 'fleet (a fleet of ships).' },
    ],
  },
  {
    id: 'eng_12_tenses',
    title: 'All 12 Tenses Complete Chart',
    stage: 'Middle (Classes 5–8)',
    summary: 'Master every Present, Past, and Future tense structure for error-free writing and exams.',
    rules: [
      { heading: 'Simple Present / Past / Future', formulaOrRule: 'V1(+s/es)  |  V2  |  will/shall + V1', example: 'He writes daily. / He wrote yesterday. / He will write tomorrow.' },
      { heading: 'Continuous (Progressive) Tenses', formulaOrRule: 'is/am/are + V-ing  |  was/were + V-ing  |  will be + V-ing', example: 'She is studying. / She was studying. / She will be studying.' },
      { heading: 'Perfect Tenses', formulaOrRule: 'has/have + V3  |  had + V3  |  will have + V3', example: 'They have finished. / They had finished before 6 PM. / They will have finished.' },
      { heading: 'Perfect Continuous Tenses', formulaOrRule: 'has/have been + V-ing  |  had been + V-ing  |  will have been + V-ing', example: 'I have been revising Science since morning (for two hours).' },
    ],
    quickDrill: [
      { prompt: 'Fill in the correct tense: "By next month, Ananya _____ (complete) all 10 chapters."', answer: 'will have completed (Future Perfect Tense).' },
      { prompt: 'Correct the error: "He is living in Pune since 2021."', answer: 'He has been living in Pune since 2021. (Present Perfect Continuous with "since").' },
    ],
  },
  {
    id: 'eng_voice_speech',
    title: 'Active–Passive Voice & Direct–Indirect Speech',
    stage: 'Secondary (Classes 9–10)',
    summary: 'High-scoring board transformation rules tested every year in Maharashtra SSC, CBSE, and ICSE.',
    rules: [
      { heading: 'Active → Passive Golden Rule', formulaOrRule: 'Object → Subject + tense-appropriate "be" form + V3 + by + Agent', example: 'Active: The jury praised her essay. → Passive: Her essay was praised by the jury.' },
      { heading: 'Continuous & Perfect Passive', formulaOrRule: 'Continuous adds "being + V3"  |  Perfect adds "been + V3"', example: 'They are painting the wall → The wall is being painted by them.' },
      { heading: 'Reported Speech Tense Shift', formulaOrRule: 'Past reporting verb shifts: Simple Present → Simple Past; Present Perfect → Past Perfect; will → would', example: 'He said, "I have won." → He said that he had won.' },
      { heading: 'Universal Truth & Questions in Speech', formulaOrRule: 'Universal facts stay Simple Present; Yes/No questions use "if/whether" without "that"', example: 'She asked, "Are you ready?" → She asked whether I was ready.' },
    ],
    quickDrill: [
      { prompt: 'Change the Voice: "Someone has stolen the library register."', answer: 'The library register has been stolen.' },
      { prompt: 'Convert to Indirect Speech: Rohan said to me, "Do you like Mathematics?"', answer: 'Rohan asked me whether/if I liked Mathematics.' },
    ],
  },
  {
    id: 'eng_clauses_writing',
    title: 'Prepositions, Figures of Speech & Writing Formats',
    stage: 'Secondary (Classes 9–10)',
    summary: 'Board-ready precision for prepositions, poetic devices, formal letters, notices, and essays.',
    rules: [
      { heading: 'Fixed Preposition Pairs', formulaOrRule: 'abide by, fond of, prefer X to Y, senior to, congratulated on, acquainted with', example: 'She prefers classical music to pop music.' },
      { heading: 'Figures of Speech (Poetry)', formulaOrRule: 'Simile (as/like), Metaphor (direct), Personification (human traits), Alliteration (initial sound), Antithesis (opposites)', example: '"The wind whispered secrets through the banyan leaves." → Personification.' },
      { heading: 'Formal Letter Format (Board Rubric)', formulaOrRule: 'Sender Address → Date → Receiver Designation & Address → Subject Line → Salutation → 3-Para Body → Yours faithfully/sincerely', example: 'Keep Subject crisp (5–8 words) and underline it neatly.' },
      { heading: 'Notice & Essay Structure', formulaOrRule: 'Notice inside a neat box: School Name → NOTICE → Date → Heading → Event (Date/Time/Venue) → Signature', example: 'Essays follow Introduction (Hook) → 2–3 Body Paragraphs → Strong Conclusion.' },
    ],
    quickDrill: [
      { prompt: 'Fill in the right preposition: "He is senior ___ me by three years."', answer: 'to ("senior to", never "than").' },
      { prompt: 'Name the Figure of Speech: "Speech is silver, but silence is golden."', answer: 'Antithesis (contrasting ideas placed side by side) & Metaphor.' },
    ],
  },
];

export interface VocabPairItem {
  word: string;
  meaning: string;
  synonym: string;
  antonym: string;
  usage: string;
}

export const ENGLISH_VOCABULARY_BANK: VocabPairItem[] = [
  { word: 'Diligent', meaning: 'Showing steady, careful effort', synonym: 'Industrious', antonym: 'Negligent', usage: 'Diligent daily revision leads to top board scores.' },
  { word: 'Benevolent', meaning: 'Kind-hearted and helpful', synonym: 'Generous', antonym: 'Cruel', usage: 'The benevolent donor funded textbooks for rural schools.' },
  { word: 'Eloquent', meaning: 'Fluent and persuasive in speaking', synonym: 'Articulate', antonym: 'Inarticulate', usage: 'She delivered an eloquent speech on water conservation.' },
  { word: 'Resilient', meaning: 'Able to recover quickly from setbacks', synonym: 'Adaptable', antonym: 'Fragile', usage: 'Resilient learners treat every mistake as feedback.' },
  { word: 'Prudent', meaning: 'Acting with care and foresight', synonym: 'Wise', antonym: 'Reckless', usage: 'Creating a balanced study timetable is a prudent habit.' },
  { word: 'Abundant', meaning: 'Existing in large quantities', synonym: 'Plentiful', antonym: 'Scarce', usage: 'Solar energy is an abundant renewable resource in India.' },
  { word: 'Candid', meaning: 'Truthful and straightforward', synonym: 'Frank', antonym: 'Deceptive', usage: 'His candid explanation helped the entire team understand.' },
  { word: 'Meticulous', meaning: 'Showing great attention to detail', synonym: 'Thorough', antonym: 'Careless', usage: 'Meticulous diagram labelling earns full Science marks.' },
];

export const ENGLISH_IDIOMS_AND_ONE_WORD: { type: 'Idiom' | 'One-Word' | 'Homophone'; term: string; meaning: string }[] = [
  { type: 'Idiom', term: 'Burn the midnight oil', meaning: 'To study or work diligently late into the night.' },
  { type: 'Idiom', term: 'A blessing in disguise', meaning: 'A difficulty that eventually results in something good.' },
  { type: 'Idiom', term: 'Once in a blue moon', meaning: 'Something that happens very rarely.' },
  { type: 'One-Word', term: 'Autobiography', meaning: 'The life story of a person written by themselves.' },
  { type: 'One-Word', term: 'Omnipresent', meaning: 'Present everywhere at the same time.' },
  { type: 'One-Word', term: 'Philanthropist', meaning: 'A person who promotes human welfare through generous donations.' },
  { type: 'Homophone', term: 'Principle vs Principal', meaning: 'Principle = fundamental law/rule; Principal = head of a school or main amount.' },
  { type: 'Homophone', term: 'Stationary vs Stationery', meaning: 'Stationary = not moving; Stationery = pens, paper, and writing supplies.' },
];

// ==========================================
// L. SCHOLARSHIP & OLYMPIAD PREPARATION HUB
// ==========================================

export interface ScholarshipExamTrack {
  id: string;
  examTitle: string;
  targetClasses: string;
  applicableBoards: string;
  patternSummary: string;
  officialUrl: string;
  officialAuthority: string;
  keyTopics: string[];
  shortcutStrategies: string[];
  sampleQuestions: {
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  }[];
  hasInternalPortal?: boolean;
}

export const SCHOLARSHIP_OLYMPIAD_TRACKS: ScholarshipExamTrack[] = [
  {
    id: 'msce_scholarship',
    examTitle: 'Maharashtra MSCE Pune Scholarship (Std 4th/5th & Std 7th/8th)',
    targetClasses: 'Classes 4, 5, 7 & 8',
    applicableBoards: 'Maharashtra State Board, CBSE & ICSE students in Maharashtra',
    patternSummary:
      'Paper I: First Language (25 Qs / 50 Marks) + Mathematics (50 Qs / 100 Marks) | Paper II: Third Language English (25 Qs / 50 Marks) + Intelligence Test (50 Qs / 100 Marks). Total 300 Marks, Zero Negative Marking.',
    officialUrl: 'https://www.mscepune.in/',
    officialAuthority: 'MSCE Pune Official Website',
    keyTopics: [
      'Mathematics: Number operations, Fractions, Profit-Loss, Mensuration, Divisibility & Word Problems',
      'Intelligence Test (Buddhi-Mapan): Number Series, Coding-Decoding, Mirror/Water Images, Odd One Out, Calendar & Blood Relations',
      'Languages: Vocabulary, Synonyms/Antonyms, Proverbs, Idioms, Grammar & Unseen Passages',
    ],
    shortcutStrategies: [
      'Never leave any OMR bubble blank — MSCE Scholarship has NO negative marking.',
      'Master squares (1–30) and cubes (1–15) to crack 70% of Intelligence Test number series in under 15 seconds.',
      'Eliminate two wrong options immediately on Mirror/Water image and Figure Folding questions.',
    ],
    sampleQuestions: [
      {
        question: 'Find the next number in the Intelligence Test series: 3, 8, 15, 24, 35, ?',
        options: ['48', '45', '49', '46'],
        correctIndex: 0,
        explanation: 'Pattern is n² − 1: 2²−1=3, 3²−1=8, 4²−1=15, 5²−1=24, 6²−1=35 → 7²−1 = 48 (differences +5, +7, +9, +11, +13).',
      },
      {
        question: 'If BOOK is coded as 2-15-15-11, how is ZONE coded in the same alphabet position code?',
        options: ['26-15-14-5', '25-15-14-5', '26-14-15-5', '26-15-13-4'],
        correctIndex: 0,
        explanation: 'A=1 ... Z=26, O=15, N=14, E=5 → 26-15-14-5.',
      },
    ],
    hasInternalPortal: true,
  },
  {
    id: 'sof_imo_nso',
    examTitle: 'SOF National Olympiads (IMO Maths & NSO Science)',
    targetClasses: 'Classes 1 to 10',
    applicableBoards: 'CBSE, ICSE & State Boards (All India)',
    patternSummary:
      'Section 1: Logical Reasoning | Section 2: Mathematical / Scientific Reasoning | Section 3: Everyday Mathematics / Science | Section 4: Achievers Section (High-weightage HOTS questions).',
    officialUrl: 'https://sofworld.org/',
    officialAuthority: 'Science Olympiad Foundation (SOF)',
    keyTopics: [
      'Logical Reasoning: Patterns, Analogy, Direction Sense, Embedded Figures & Ranking Test',
      'Achievers Section HOTS: Multi-concept numerical puzzles & experimental assertion-reasoning',
      'NCERT & CISCE aligned conceptual depth beyond rote memorisation',
    ],
    shortcutStrategies: [
      'Allocate extra time to the Achievers Section — each question carries 2–3× weightage.',
      'Draw rough direction/Venn diagrams immediately for Ranking and Direction Sense problems.',
    ],
    sampleQuestions: [
      {
        question: 'Aarav walks 4 km North, then turns right and walks 3 km East. How far is he from his starting point?',
        options: ['5 km', '7 km', '6 km', '1 km'],
        correctIndex: 0,
        explanation: 'By Pythagoras Theorem: Distance = √(4² + 3²) = √(16 + 9) = √25 = 5 km.',
      },
      {
        question: 'If the perimeter of a square equals the perimeter of a rectangle of sides 10 cm and 6 cm, find the area of the square.',
        options: ['64 cm²', '60 cm²', '32 cm²', '100 cm²'],
        correctIndex: 0,
        explanation: 'Rectangle perimeter = 2(10+6) = 32 cm. Square side = 32/4 = 8 cm. Square Area = 8² = 64 cm².',
      },
    ],
  },
  {
    id: 'nmms_homi_bhabha',
    examTitle: 'NMMS (Class 8), Homi Bhabha Balvaidnyanik (Classes 6 & 9) & JNVST',
    targetClasses: 'Classes 5, 6, 8 & 9',
    applicableBoards: 'Maharashtra State Board, CBSE & ICSE',
    patternSummary:
      'NMMS: MAT (90 Qs Mental Ability) + SAT (90 Qs Science, Maths, Social Science) | Homi Bhabha: Written Objective Science Test → Practical Lab Round → Action Research Project & Interview.',
    officialUrl: 'https://scholarships.gov.in/',
    officialAuthority: 'National Scholarship Portal (NSP) & MSTA',
    keyTopics: [
      'NMMS MAT: Analogy, Classification, Number/Alphabet Series, Hidden Figures & Cube-Dice',
      'Homi Bhabha Science: Practical observation, experimental design, environment & scientific temper',
      'JNVST (Class 5→6): Mental Ability (40 Qs), Arithmetic (20 Qs), Language Comprehension (20 Qs)',
    ],
    shortcutStrategies: [
      'For NMMS, aim for 70%+ in MAT first — Mental Ability is the fastest scoring paper.',
      'For Homi Bhabha, read NCERT & Balbharati Science textbooks thoroughly and practise daily-life experiment reasoning.',
    ],
    sampleQuestions: [
      {
        question: 'Find the odd one out in Scientific Classification: Iron, Copper, Aluminium, Sulphur.',
        options: ['Sulphur (Non-metal)', 'Iron', 'Copper', 'Aluminium'],
        correctIndex: 0,
        explanation: 'Iron, Copper, and Aluminium are malleable conducting metals; Sulphur is a brittle non-metal.',
      },
      {
        question: 'In a row of 25 students, Sneha is 9th from the left. What is her position from the right end?',
        options: ['17th', '16th', '15th', '18th'],
        correctIndex: 0,
        explanation: 'Position from right = (Total − Position from left) + 1 = (25 − 9) + 1 = 17th.',
      },
    ],
  },
];

export function getStageForClassLevel(classLevel: ClassLevel): StageTier {
  const num = parseInt(String(classLevel).replace('Class ', ''), 10) || 5;
  if (num <= 4) return 'Primary (Classes 1–4)';
  if (num <= 8) return 'Middle (Classes 5–8)';
  return 'Secondary (Classes 9–10)';
}
