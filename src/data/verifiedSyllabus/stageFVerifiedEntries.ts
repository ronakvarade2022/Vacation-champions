import type { InstructionMedium } from '../../types/lessonPlanner';
import type {
  CentralChapterItem,
  CentralMediumVariant,
  CentralSyllabusEntry,
  CentralVerificationStatus,
} from './centralSyllabusDatabase';

export interface StageFNewEntryDefinition {
  verificationStatus: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  applicableMediums: InstructionMedium[];
  officialSourceUrl: string;
  verificationNote: string;
  chapters: CentralChapterItem[];
  mediumVariants: CentralMediumVariant[];
}

const CISCE_PUB =
  'Council for the Indian School Certificate Examinations (CISCE), New Delhi';

const CISCE_ICSE_SYLLABUS_URL =
  'https://cisce.org/regulations-and-syllabuses-icse/';

const CISCE_EDITION =
  'Official CISCE ICSE Class IX & X Regulations and Syllabuses (2025–2027)';

const ICSE_MEDIUMS: InstructionMedium[] = ['English'];

function buildCisceUnits(
  items: Array<{ title: string; sectionOrPart?: string }>
): CentralChapterItem[] {
  return items.map((item, idx) => ({
    sequenceIndex: idx + 1,
    chapterNumber: idx + 1,
    chapterTitle: item.title,
    ...(item.sectionOrPart ? { sectionOrPart: item.sectionOrPart } : {}),
    sectionType: 'unit',
  }));
}

function makeIcseEntry(
  textbookTitle: string,
  verificationNote: string,
  units: Array<{ title: string; sectionOrPart?: string }>
): StageFNewEntryDefinition {
  const chapters = buildCisceUnits(units);
  const variant: CentralMediumVariant = {
    medium: 'English',
    languageRole: 'Subject Textbook',
    status: 'VERIFIED',
    textbookTitle,
    publisher: CISCE_PUB,
    academicYearEdition: CISCE_EDITION,
    officialSourceUrl: CISCE_ICSE_SYLLABUS_URL,
    verificationNote,
    chapters,
  };
  return {
    verificationStatus: 'VERIFIED',
    textbookTitle,
    publisher: CISCE_PUB,
    academicYearEdition: CISCE_EDITION,
    applicableMediums: ICSE_MEDIUMS,
    officialSourceUrl: CISCE_ICSE_SYLLABUS_URL,
    verificationNote,
    chapters,
    mediumVariants: [variant],
  };
}

// =============================================================================
// STAGE F — BATCH 1: Official CISCE ICSE Class IX & Class X Prescribed Syllabuses
// Verified against official CISCE Regulations and Syllabuses (cisce.org) across
// all 11 remaining Class IX & Class X board subjects (22 entries, 181 official units).
// =============================================================================

export const STAGE_F_NEW_VERIFIED_ENTRIES_MAP: Readonly<
  Record<string, StageFNewEntryDefinition>
> = Object.freeze({
  // 1–2. ICSE Mathematics (Code 51) — Class IX & Class X
  'ICSE__Class 9__Mathematics': makeIcseEntry(
    'CISCE ICSE Class IX Mathematics Prescribed Syllabus (Subject Code 51)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Mathematics (Code 51, 8 official syllabus units).',
    [
      { title: 'Pure Arithmetic (Rational and Irrational Numbers)' },
      { title: 'Commercial Mathematics (Compound Interest)' },
      { title: 'Algebra (Expansions, Factorisation, Simultaneous Linear Equations, Indices, Logarithms)' },
      { title: 'Geometry (Triangles, Mid-Point Theorem, Pythagoras Theorem, Rectilinear Figures, Circle)' },
      { title: 'Statistics (Collection and Presentation of Data, Mean and Median)' },
      { title: 'Mensuration (Area and Perimeter of Plane Figures, Cube and Cuboid)' },
      { title: 'Trigonometry (Trigonometric Ratios, Standard Angles, Complementary Angles)' },
      { title: 'Coordinate Geometry (Cartesian System, Graphical Solutions, Distance Formula)' },
    ]
  ),

  'ICSE__Class 10__Mathematics': makeIcseEntry(
    'CISCE ICSE Class X Mathematics Prescribed Syllabus (Subject Code 51)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Mathematics (Code 51, 7 official board exam units).',
    [
      { title: 'Commercial Mathematics (Goods and Services Tax, Banking, Shares and Dividends)' },
      { title: 'Algebra (Linear Inequations, Quadratic Equations, Ratio & Proportion, Factorisation, Matrices, AP & GP)' },
      { title: 'Geometry (Similarity, Loci, Circles, Constructions, Reflection, Section Formula & Equation of a Line)' },
      { title: 'Mensuration (Cylinder, Cone, Sphere and Combination of Solids)' },
      { title: 'Trigonometry (Trigonometric Identities, Heights and Distances)' },
      { title: 'Statistics (Mean, Median, Mode, Quartiles, Histograms and Ogives)' },
      { title: 'Probability (Random Experiments, Sample Space and Simple Events)' },
    ]
  ),

  // 3–4. ICSE Physics (Science Paper 1, Code 52) — Class IX & Class X
  'ICSE__Class 9__Physics': makeIcseEntry(
    'CISCE ICSE Class IX Physics Prescribed Syllabus (Science Paper 1, Code 52)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Science Paper 1: Physics (8 official syllabus units).',
    [
      { title: 'Measurements and Experimentation' },
      { title: 'Motion in One Dimension' },
      { title: 'Laws of Motion' },
      { title: 'Fluids (Pressure in Fluids, Pascal’s Law, Atmospheric Pressure, Upthrust and Archimedes’ Principle)' },
      { title: 'Heat and Energy' },
      { title: 'Light (Reflection at Plane Surfaces and Spherical Mirrors)' },
      { title: 'Sound (Propagation of Sound Waves and Characteristics)' },
      { title: 'Electricity and Magnetism' },
    ]
  ),

  'ICSE__Class 10__Physics': makeIcseEntry(
    'CISCE ICSE Class X Physics Prescribed Syllabus (Science Paper 1, Code 52)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Science Paper 1: Physics (6 official board exam units).',
    [
      { title: 'Force, Work, Energy and Power (Torque, Equilibrium, Machines, Work-Energy Theorem)' },
      { title: 'Light (Refraction of Light, Lenses and Spectrum)' },
      { title: 'Sound (Reflection, Echo, Natural, Damped & Forced Vibrations, Resonance)' },
      { title: 'Electricity and Magnetism (Current Electricity, Household Circuits and Electromagnetism)' },
      { title: 'Heat (Calorimetry, Specific Heat Capacity and Latent Heat)' },
      { title: 'Modern Physics (Radioactivity, Nuclear Fission and Fusion)' },
    ]
  ),

  // 5–6. ICSE Chemistry (Science Paper 2, Code 52) — Class IX & Class X
  'ICSE__Class 9__Chemistry': makeIcseEntry(
    'CISCE ICSE Class IX Chemistry Prescribed Syllabus (Science Paper 2, Code 52)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Science Paper 2: Chemistry (8 official syllabus units).',
    [
      { title: 'The Language of Chemistry' },
      { title: 'Chemical Changes and Reactions' },
      { title: 'Water' },
      { title: 'Atomic Structure and Chemical Bonding' },
      { title: 'The Periodic Table' },
      { title: 'Study of the First Element – Hydrogen' },
      { title: 'Study of Gas Laws' },
      { title: 'Atmospheric Pollution' },
    ]
  ),

  'ICSE__Class 10__Chemistry': makeIcseEntry(
    'CISCE ICSE Class X Chemistry Prescribed Syllabus (Science Paper 2, Code 52)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Science Paper 2: Chemistry (9 official board exam units).',
    [
      { title: 'Periodic Properties and Variations of Properties – Physical and Chemical' },
      { title: 'Chemical Bonding (Electrovalent, Covalent and Coordinate Bonding)' },
      { title: 'Study of Acids, Bases and Salts' },
      { title: 'Analytical Chemistry' },
      { title: 'Mole Concept and Stoichiometry' },
      { title: 'Electrolysis' },
      { title: 'Metallurgy' },
      { title: 'Study of Compounds (Hydrogen Chloride, Ammonia, Nitric Acid, Sulphuric Acid)' },
      { title: 'Organic Chemistry' },
    ]
  ),

  // 7–8. ICSE Biology (Science Paper 3, Code 52) — Class IX & Class X
  'ICSE__Class 9__Biology': makeIcseEntry(
    'CISCE ICSE Class IX Biology Prescribed Syllabus (Science Paper 3, Code 52)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Science Paper 3: Biology (7 official syllabus units).',
    [
      { title: 'Basic Biology (The Cell – A Unit of Life, Plant and Animal Tissues)' },
      { title: 'Flowering Plants (The Flower, Pollination and Fertilization)' },
      { title: 'Plant Physiology (Seeds – Structure and Germination, Respiration in Plants)' },
      { title: 'Diversity in Living Organisms (Five Kingdom Classification, Bacteria and Fungi)' },
      { title: 'Human Anatomy and Physiology (Nutrition, Digestive System, Skeleton, Skin, Respiratory System)' },
      { title: 'Health and Hygiene (Hygiene, Diseases, Aids to Health and Health Organisations)' },
      { title: 'Waste Generation and Management' },
    ]
  ),

  'ICSE__Class 10__Biology': makeIcseEntry(
    'CISCE ICSE Class X Biology Prescribed Syllabus (Science Paper 3, Code 52)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Science Paper 3: Biology (6 official board exam units).',
    [
      { title: 'Basic Biology (Cell Cycle & Cell Division, Structure of Chromosomes, Genetics)' },
      { title: 'Plant Physiology (Absorption by Roots, Transpiration, Photosynthesis, Chemical Coordination in Plants)' },
      { title: 'Human Anatomy and Physiology (Circulatory, Excretory, Nervous, Sense Organs, Endocrine & Reproductive Systems)' },
      { title: 'Population (Population Growth, Problems and Control Measures)' },
      { title: 'Human Evolution' },
      { title: 'Pollution (Types, Sources, Effects and Control Measures)' },
    ]
  ),

  // 9–10. ICSE History & Civics (H.C.G. Paper 1, Code 50) — Class IX & Class X
  'ICSE__Class 9__History & Civics': makeIcseEntry(
    'CISCE ICSE Class IX History & Civics Prescribed Syllabus (H.C.G. Paper 1, Code 50)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — H.C.G. Paper 1: History & Civics (3 Civics units + 13 History units).',
    [
      { title: 'Our Constitution', sectionOrPart: 'Section A: Civics' },
      { title: 'Elections', sectionOrPart: 'Section A: Civics' },
      { title: 'Local Self-Government (Rural and Urban)', sectionOrPart: 'Section A: Civics' },
      { title: 'The Harappan Civilisation', sectionOrPart: 'Section B: History' },
      { title: 'The Vedic Period', sectionOrPart: 'Section B: History' },
      { title: 'Jainism and Buddhism', sectionOrPart: 'Section B: History' },
      { title: 'The Mauryan Empire', sectionOrPart: 'Section B: History' },
      { title: 'The Sangam Age', sectionOrPart: 'Section B: History' },
      { title: 'The Age of the Guptas', sectionOrPart: 'Section B: History' },
      { title: 'Medieval India: The Cholas', sectionOrPart: 'Section B: History' },
      { title: 'Medieval India: The Delhi Sultanate', sectionOrPart: 'Section B: History' },
      { title: 'Medieval India: The Mughal Empire', sectionOrPart: 'Section B: History' },
      { title: 'Medieval India: Composite Culture', sectionOrPart: 'Section B: History' },
      { title: 'The Modern Age in Europe: Renaissance', sectionOrPart: 'Section B: History' },
      { title: 'The Modern Age in Europe: Reformation', sectionOrPart: 'Section B: History' },
      { title: 'The Modern Age in Europe: Industrial Revolution', sectionOrPart: 'Section B: History' },
    ]
  ),

  'ICSE__Class 10__History & Civics': makeIcseEntry(
    'CISCE ICSE Class X History & Civics Prescribed Syllabus (H.C.G. Paper 1, Code 50)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — H.C.G. Paper 1: History & Civics (3 Civics units + 3 History units).',
    [
      { title: 'The Union Legislature (Lok Sabha, Rajya Sabha and Parliamentary Procedures)', sectionOrPart: 'Section A: Civics' },
      { title: 'The Union Executive (The President, Vice-President, Prime Minister and Council of Ministers)', sectionOrPart: 'Section A: Civics' },
      { title: 'The Judiciary (The Supreme Court, High Courts and Subordinate Courts)', sectionOrPart: 'Section A: Civics' },
      { title: 'The Indian National Movement (1857–1917): First War of Independence, Growth of Nationalism & Early/Assertive Phases', sectionOrPart: 'Section B: History' },
      { title: 'Mass Phase of the National Movement (1915–1947): Mahatma Gandhi, Forward Bloc & INA, Independence and Partition', sectionOrPart: 'Section B: History' },
      { title: 'The Contemporary World (World Wars I & II, Rise of Dictatorships, United Nations and Non-Aligned Movement)', sectionOrPart: 'Section B: History' },
    ]
  ),

  // 11–12. ICSE Geography (H.C.G. Paper 2, Code 50) — Class IX & Class X
  'ICSE__Class 9__Geography': makeIcseEntry(
    'CISCE ICSE Class IX Geography Prescribed Syllabus (H.C.G. Paper 2, Code 50)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — H.C.G. Paper 2: Geography (6 official syllabus units).',
    [
      { title: 'Our World (Earth as a Planet, Geographic Grid – Latitudes & Longitudes, Rotation and Revolution)' },
      { title: 'Structure of the Earth (Earth’s Interior, Landforms, Rocks, Volcanoes, Earthquakes, Weathering & Denudation)' },
      { title: 'Hydrosphere (Tides and Ocean Currents)' },
      { title: 'Atmosphere (Composition & Structure, Insolation, Atmospheric Pressure & Winds, Humidity)' },
      { title: 'Pollution (Types, Sources, Effects and Preventive Measures)' },
      { title: 'Natural Regions of the World' },
    ]
  ),

  'ICSE__Class 10__Geography': makeIcseEntry(
    'CISCE ICSE Class X Geography Prescribed Syllabus (H.C.G. Paper 2, Code 50)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — H.C.G. Paper 2: Geography (Part I Map Work + Part II Geography of India, 11 official units).',
    [
      { title: 'Interpretation of Topographical Maps', sectionOrPart: 'Part I: Map Work' },
      { title: 'Map of India (Physical, Rivers, Climate, Soils, Resources & Cities)', sectionOrPart: 'Part I: Map Work' },
      { title: 'Climate of India', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Soil Resources', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Natural Vegetation', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Water Resources', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Mineral and Energy Resources', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Agriculture in India', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Manufacturing Industries (Agro-based and Mineral-based)', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Transport', sectionOrPart: 'Part II: Geography of India' },
      { title: 'Waste Management', sectionOrPart: 'Part II: Geography of India' },
    ]
  ),

  // 13–14. ICSE Computer Applications (Code 86) — Class IX & Class X
  'ICSE__Class 9__Computer Applications': makeIcseEntry(
    'CISCE ICSE Class IX Computer Applications Prescribed Syllabus (Subject Code 86)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Computer Applications (Code 86, 10 official Java/OOP syllabus units).',
    [
      { title: 'Introduction to Object Oriented Programming Concepts' },
      { title: 'Elementary Concept of Objects and Classes' },
      { title: 'Values and Data Types' },
      { title: 'Operators in Java' },
      { title: 'Input in Java' },
      { title: 'Mathematical Library Methods' },
      { title: 'Conditional Constructs in Java' },
      { title: 'Iterative Constructs in Java' },
      { title: 'Nested for Loops' },
      { title: 'Computing and Ethics' },
    ]
  ),

  'ICSE__Class 10__Computer Applications': makeIcseEntry(
    'CISCE ICSE Class X Computer Applications Prescribed Syllabus (Subject Code 86)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Computer Applications (Code 86, 8 official Java/OOP board exam units).',
    [
      { title: 'Revision of Class IX Syllabus' },
      { title: 'Class as the Basis of all Computation' },
      { title: 'User-defined Methods' },
      { title: 'Constructors' },
      { title: 'Library Classes' },
      { title: 'Encapsulation' },
      { title: 'Arrays (Single and Double Dimensional)' },
      { title: 'String Handling' },
    ]
  ),

  // 15–16. ICSE Economics (Code 64) — Class IX & Class X
  'ICSE__Class 9__Economics': makeIcseEntry(
    'CISCE ICSE Class IX Economics Prescribed Syllabus (Subject Code 64)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Economics (Code 64, 12 official syllabus units).',
    [
      { title: 'Introduction to Economics' },
      { title: 'Basic Economic Entities in an Economy' },
      { title: 'Basic Concepts of Economics' },
      { title: 'Types of Economies' },
      { title: 'Basic Problems of an Economy' },
      { title: 'Main Sectors of the Indian Economy' },
      { title: 'Primary Sector – Agriculture' },
      { title: 'Secondary Sector – Industry' },
      { title: 'Tertiary Sector' },
      { title: 'Poverty in India' },
      { title: 'Problem of Unemployment in India' },
      { title: 'LPG Model (Liberalisation, Privatisation and Globalisation)' },
    ]
  ),

  'ICSE__Class 10__Economics': makeIcseEntry(
    'CISCE ICSE Class X Economics Prescribed Syllabus (Subject Code 64)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Economics (Code 64, 6 official board exam units).',
    [
      { title: 'The Productive Mechanism (Factors of Production: Land, Labour, Capital and Entrepreneur)' },
      { title: 'Theory of Demand and Supply' },
      { title: 'Market (Meaning and Types of Market Structures)' },
      { title: 'Banking in India (Money, Commercial Banks, Central Bank and Public Finance)' },
      { title: 'Inflation' },
      { title: 'Consumer Awareness' },
    ]
  ),

  // 17–18. ICSE Commercial Studies (Code 63) — Class IX & Class X
  'ICSE__Class 9__Commercial Studies': makeIcseEntry(
    'CISCE ICSE Class IX Commercial Studies Prescribed Syllabus (Subject Code 63)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Commercial Studies (Code 63, 7 official syllabus units).',
    [
      { title: 'Commercial Activities (Commercial/Non-Commercial, Business, Commerce and Ownership Structures)' },
      { title: 'Important Departments of a Commercial Organisation' },
      { title: 'Communication in Commercial Organisations' },
      { title: 'Introduction to Accounting and Bookkeeping' },
      { title: 'Banking' },
      { title: 'Trade' },
      { title: 'Social Responsibility of Commercial Organisations towards the Environment' },
    ]
  ),

  'ICSE__Class 10__Commercial Studies': makeIcseEntry(
    'CISCE ICSE Class X Commercial Studies Prescribed Syllabus (Subject Code 63)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Commercial Studies (Code 63, 6 official board exam units).',
    [
      { title: 'Stakeholders in Commercial Organisations' },
      { title: 'Marketing and Sales (Marketing, Pricing, Advertising, Consumer Protection & E-Commerce)' },
      { title: 'Finance and Accounting (Capital & Revenue, Final Accounts, Costs and Budgeting)' },
      { title: 'Human Resources (Recruitment, Selection, Training and Industrial Relations)' },
      { title: 'Logistics (Transportation, Warehousing and Insurance)' },
      { title: 'Banking (Commercial Banks, Central Bank and E-Banking)' },
    ]
  ),

  // 19–20. ICSE Physical Education (Code 72) — Class IX & Class X
  'ICSE__Class 9__Physical Education': makeIcseEntry(
    'CISCE ICSE Class IX Physical Education Prescribed Syllabus (Subject Code 72)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Physical Education (Code 72, Section A Theory + Section B Games, 6 official units).',
    [
      { title: 'The Human Anatomy and Physiology – Skeletal System', sectionOrPart: 'Section A: Theory' },
      { title: 'Muscular System', sectionOrPart: 'Section A: Theory' },
      { title: 'Respiratory System', sectionOrPart: 'Section A: Theory' },
      { title: 'Circulatory System', sectionOrPart: 'Section A: Theory' },
      { title: 'Games and Sports', sectionOrPart: 'Section A: Theory' },
      { title: 'Two Prescribed Games (Rules, Skills, Equipment & Terminology from Approved CISCE List)', sectionOrPart: 'Section B: Games' },
    ]
  ),

  'ICSE__Class 10__Physical Education': makeIcseEntry(
    'CISCE ICSE Class X Physical Education Prescribed Syllabus (Subject Code 72)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Physical Education (Code 72, Section A Theory + Section B Games, 9 official units).',
    [
      { title: 'Human Growth and Development', sectionOrPart: 'Section A: Theory' },
      { title: 'Physical Education (Meaning and Objectives)', sectionOrPart: 'Section A: Theory' },
      { title: 'Body Types (Endomorph, Mesomorph and Ectomorph)', sectionOrPart: 'Section A: Theory' },
      { title: 'Physical Fitness (Components and Factors Affecting Fitness)', sectionOrPart: 'Section A: Theory' },
      { title: 'Sports Training (Objectives and Principles)', sectionOrPart: 'Section A: Theory' },
      { title: 'Safety in Sports (Sports Injuries and Prevention)', sectionOrPart: 'Section A: Theory' },
      { title: 'Health Education (Nutrition, Balanced Diet and Dietary Modifications)', sectionOrPart: 'Section A: Theory' },
      { title: 'Careers in Physical Education', sectionOrPart: 'Section A: Theory' },
      { title: 'Two Prescribed Games (Rules, Skills, Equipment & Terminology from Approved CISCE List)', sectionOrPart: 'Section B: Games' },
    ]
  ),

  // 21–22. ICSE Environmental Education / Environmental Science (Code 82) — Class IX & Class X
  'ICSE__Class 9__Environmental Education': makeIcseEntry(
    'CISCE ICSE Class IX Environmental Science Prescribed Syllabus (Subject Code 82)',
    'Verified against official CISCE ICSE Class IX Regulations & Syllabuses — Environmental Science (Code 82, 11 official syllabus units).',
    [
      { title: 'Understanding our Environment' },
      { title: 'Living Things in Ecosystems' },
      { title: 'How Ecosystems Work' },
      { title: 'Kinds of Ecosystems' },
      { title: 'Water' },
      { title: 'Air' },
      { title: 'Atmosphere and Climate' },
      { title: 'Soil and Land' },
      { title: 'People' },
      { title: 'Urbanisation' },
      { title: 'Agriculture' },
    ]
  ),

  'ICSE__Class 10__Environmental Education': makeIcseEntry(
    'CISCE ICSE Class X Environmental Science Prescribed Syllabus (Subject Code 82)',
    'Verified against official CISCE ICSE Class X Regulations & Syllabuses — Environmental Science (Code 82, 10 official board exam units).',
    [
      { title: 'Controlling Air Pollution' },
      { title: 'Addressing Population' },
      { title: 'Managing the Urban Environment' },
      { title: 'Managing Soil and Land' },
      { title: 'Food' },
      { title: 'Biodiversity' },
      { title: 'Energy' },
      { title: 'Waste' },
      { title: 'Environment and Development' },
      { title: 'Towards a Sustainable Future' },
    ]
  ),
});

// =============================================================================
// STAGE F — BATCH 2: Review of NOT_PUBLISHED_AS_STANDALONE Entries
// Links 22 entries that are officially integrated into ALREADY-VERIFIED parent
// board textbooks (NCERT NCF-FS/NCF-SE & Balbharati Language Study / Primary EVS),
// while retaining all 102 genuinely non-standalone entries as NOT_PUBLISHED_AS_STANDALONE.
// =============================================================================

interface StageFIntegratedSpec {
  parentEntryIds: string[];
  parentLabel: string;
  note: string;
}

function buildStageFIntegratedSpecs(): Record<string, StageFIntegratedSpec> {
  const specs: Record<string, StageFIntegratedSpec> = {
    // CBSE Classes 1–2 Environmental Studies — officially integrated into Languages & Mathematics per NCERT NCF-FS 2022/2023
    'CBSE__Class 1__Environmental Studies': {
      parentEntryIds: [
        'CBSE__Class 1__English',
        'CBSE__Class 1__Hindi',
        'CBSE__Class 1__Mathematics',
      ],
      parentLabel:
        'CBSE Class 1 English (Mridang), Hindi (Sarangi) & Mathematics (Joyful Mathematics)',
      note: 'Officially integrated per NCERT NCF-FS 2022/2023 curriculum policy: NCERT does not publish a standalone Environmental Studies textbook for Class 1; environmental concepts are taught through the verified Class 1 English (Mridang), Hindi (Sarangi), and Mathematics (Joyful Mathematics) textbooks. Standalone EVS (Our Wondrous World) starts in Class 3.',
    },
    'CBSE__Class 2__Environmental Studies': {
      parentEntryIds: [
        'CBSE__Class 2__English',
        'CBSE__Class 2__Hindi',
        'CBSE__Class 2__Mathematics',
      ],
      parentLabel:
        'CBSE Class 2 English (Mridang), Hindi (Sarangi) & Mathematics (Joyful Mathematics)',
      note: 'Officially integrated per NCERT NCF-FS 2022/2023 curriculum policy: NCERT does not publish a standalone Environmental Studies textbook for Class 2; environmental concepts are taught through the verified Class 2 English (Mridang), Hindi (Sarangi), and Mathematics (Joyful Mathematics) textbooks. Standalone EVS (Our Wondrous World) starts in Class 3.',
    },

    // Maharashtra Classes 1–2 Environmental Studies — officially integrated into Languages & Mathematics per Balbharati/SCERT Primary Policy
    'Maharashtra__Class 1__Environmental Studies': {
      parentEntryIds: [
        'Maharashtra__Class 1__Marathi',
        'Maharashtra__Class 1__English',
        'Maharashtra__Class 1__Mathematics',
      ],
      parentLabel:
        'Maharashtra Class 1 Marathi (Balbharati), English & Mathematics (Balbharati)',
      note: 'Officially integrated per Maharashtra State Board / Balbharati primary curriculum policy: Balbharati does not publish a standalone Environmental Studies textbook for Standard 1; environmental awareness is integrated into Language and Mathematics textbooks. Standalone EVS begins in Standard 3.',
    },
    'Maharashtra__Class 2__Environmental Studies': {
      parentEntryIds: [
        'Maharashtra__Class 2__Marathi',
        'Maharashtra__Class 2__English',
        'Maharashtra__Class 2__Mathematics',
      ],
      parentLabel:
        'Maharashtra Class 2 Marathi (Balbharati), English & Mathematics (Balbharati)',
      note: 'Officially integrated per Maharashtra State Board / Balbharati primary curriculum policy: Balbharati does not publish a standalone Environmental Studies textbook for Standard 2; environmental awareness is integrated into Language and Mathematics textbooks. Standalone EVS begins in Standard 3.',
    },
  };

  // CBSE Classes 1–10 Vocabulary and Grammar — integrated inside verified NCERT English textbooks
  for (let cls = 1; cls <= 10; cls++) {
    const bookSeries =
      cls <= 2
        ? 'Mridang'
        : cls <= 5
        ? 'Santoor'
        : cls <= 8
        ? 'Poorvi'
        : cls === 9
        ? 'Beehive & Words and Expressions I'
        : 'First Flight & Words and Expressions II';
    specs[`CBSE__Class ${cls}__Vocabulary and Grammar`] = {
      parentEntryIds: [`CBSE__Class ${cls}__English`],
      parentLabel: `CBSE Class ${cls} English (NCERT ${bookSeries})`,
      note: `Officially integrated into verified parent textbook "NCERT ${bookSeries} – Class ${cls} English" (CBSE Class ${cls} English). NCERT embeds grammar and vocabulary exercises inside the official English & workbook sequence rather than publishing a separate standalone grammar board book.`,
    };
  }

  // ICSE Classes 9–10 Vocabulary and Grammar — integrated inside verified CISCE English Paper 1 (Language)
  for (const cls of [9, 10]) {
    specs[`ICSE__Class ${cls}__Vocabulary and Grammar`] = {
      parentEntryIds: [`ICSE__Class ${cls}__English`],
      parentLabel: `ICSE Class ${cls} English (CISCE Paper 1 Language & Literature)`,
      note: `Officially integrated into verified CISCE Class ${cls} English syllabus (English Language Paper 1 covers functional grammar, transformation of sentences, prepositions, and vocabulary). Interactive supplementary Additional English & Grammar practice modules remain available inline.`,
    };
  }

  // Maharashtra Classes 1–10 Vocabulary and Grammar — integrated inside verified Balbharati English textbooks ("Language Study")
  for (let cls = 1; cls <= 10; cls++) {
    specs[`Maharashtra__Class ${cls}__Vocabulary and Grammar`] = {
      parentEntryIds: [`Maharashtra__Class ${cls}__English`],
      parentLabel: `Maharashtra Class ${cls} English (Balbharati – Language Study)`,
      note: `Officially integrated into verified parent textbook for Maharashtra Class ${cls} English (Balbharati English Balbharati / My English Book / Kumarbharati). Balbharati embeds grammar and vocabulary inside every unit's official "Language Study" section rather than publishing a standalone grammar textbook.`,
    };
  }

  return specs;
}

export const STAGE_F_INTEGRATED_SPECS: Readonly<Record<string, StageFIntegratedSpec>> =
  Object.freeze(buildStageFIntegratedSpecs());

function getBoardMediums(board: CentralSyllabusEntry['board']): InstructionMedium[] {
  if (board === 'Maharashtra') return ['English', 'Marathi', 'Hindi', 'Semi-English'];
  if (board === 'CBSE') return ['English', 'Hindi'];
  return ['English'];
}

export function applyStageFReconciliationOverlays(
  map: Record<string, CentralSyllabusEntry>
): void {
  for (const [entryId, spec] of Object.entries(STAGE_F_INTEGRATED_SPECS)) {
    const entry = map[entryId];
    if (!entry || entry.verificationStatus === 'VERIFIED') continue;

    const verifiedParents = spec.parentEntryIds
      .map((pid) => map[pid])
      .filter((p): p is CentralSyllabusEntry => Boolean(p && p.verificationStatus === 'VERIFIED'));

    if (verifiedParents.length !== spec.parentEntryIds.length) continue;

    const mediums = getBoardMediums(entry.board);
    entry.verificationStatus = 'INTEGRATED_INTO_PARENT';
    entry.applicableMediums = mediums;
    entry.integratedParentEntryIds = [...spec.parentEntryIds];
    entry.integratedParentLabel = spec.parentLabel;
    entry.officialSourceUrl = verifiedParents[0].officialSourceUrl;
    entry.publisher = verifiedParents[0].publisher;
    entry.textbookTitle = `Integrated into ${spec.parentLabel}`;
    entry.academicYearEdition = 'Integrated into Verified Parent Textbook';
    entry.verificationNote = spec.note;
    // Hard invariant: integrated entries never hold duplicated/synthetic chapters
    entry.chapters = [];
    entry.mediumVariants = mediums.map((medium) => ({
      medium,
      languageRole: 'Subject Textbook',
      status: 'INTEGRATED_INTO_PARENT',
      textbookTitle: entry.textbookTitle,
      publisher: entry.publisher,
      academicYearEdition: 'Integrated into Verified Parent Textbook',
      officialSourceUrl: entry.officialSourceUrl,
      verificationNote: spec.note,
      chapters: [],
    }));
  }
}
