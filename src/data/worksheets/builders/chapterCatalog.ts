import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import type { InstructionMedium } from '../../../types/lessonPlanner';
import { getChaptersForBoardClassSubject } from '../../classCurriculumConfig';
import { isVerifiedSyllabusPipelineEnabled } from '../../verifiedSyllabus/syllabusFeatureFlags';
import { getEffectiveSyllabusForConsumer } from '../../../services/centralSyllabusService';
import { WorksheetItemFormat, WorksheetDifficultyLevel } from '../types';

/**
 * 23 distinct 6-question pattern mixes so every worksheet (#1..#23)
 * in every subject presents a fresh combination of educational formats.
 */
export const PATTERN_MIXES_23: readonly (readonly [
  WorksheetItemFormat,
  WorksheetItemFormat,
  WorksheetItemFormat,
  WorksheetItemFormat,
  WorksheetItemFormat,
  WorksheetItemFormat,
])[] = [
  ['mcq', 'fill_blank', 'true_false', 'match_following', 'one_word', 'short_answer'],
  ['picture_based', 'mcq', 'complete_sentence', 'odd_one_out', 'word_problem', 'short_answer'],
  ['fill_blank', 'identify_correct', 'arrange_order', 'application_based', 'true_false', 'long_answer'],
  ['mcq', 'diagram_based', 'fill_blank', 'problem_solving', 'one_word', 'real_life'],
  ['comprehension', 'mcq', 'match_following', 'complete_sentence', 'short_answer', 'critical_thinking'],
  ['true_false', 'odd_one_out', 'fill_blank', 'word_problem', 'identify_correct', 'application_based'],
  ['mcq', 'arrange_order', 'match_following', 'problem_solving', 'one_word', 'long_answer'],
  ['diagram_based', 'mcq', 'true_false', 'fill_blank', 'real_life', 'competency_based'],
  ['case_based', 'mcq', 'short_answer', 'complete_sentence', 'assertion_reason', 'hots'],
  ['fill_blank', 'match_following', 'identify_correct', 'word_problem', 'critical_thinking', 'short_answer'],
  ['mcq', 'odd_one_out', 'picture_based', 'application_based', 'true_false', 'one_word'],
  ['comprehension', 'fill_blank', 'arrange_order', 'short_answer', 'real_life', 'competency_based'],
  ['mcq', 'assertion_reason', 'problem_solving', 'match_following', 'true_false', 'long_answer'],
  ['diagram_based', 'one_word', 'fill_blank', 'word_problem', 'critical_thinking', 'hots'],
  ['mcq', 'complete_sentence', 'odd_one_out', 'case_based', 'application_based', 'short_answer'],
  ['identify_correct', 'match_following', 'true_false', 'problem_solving', 'real_life', 'long_answer'],
  ['picture_based', 'fill_blank', 'mcq', 'arrange_order', 'competency_based', 'short_answer'],
  ['assertion_reason', 'mcq', 'one_word', 'word_problem', 'application_based', 'hots'],
  ['comprehension', 'true_false', 'match_following', 'diagram_based', 'critical_thinking', 'long_answer'],
  ['case_based', 'fill_blank', 'identify_correct', 'problem_solving', 'real_life', 'hots'],
  ['mcq', 'arrange_order', 'odd_one_out', 'competency_based', 'short_answer', 'assertion_reason'],
  ['diagram_based', 'case_based', 'word_problem', 'critical_thinking', 'application_based', 'hots'],
  ['comprehension', 'assertion_reason', 'competency_based', 'problem_solving', 'real_life', 'hots'],
];

export function getDifficultyForWorksheetNumber(num: number): WorksheetDifficultyLevel {
  if (num <= 6) return 'Foundation';
  if (num <= 13) return 'Intermediate';
  if (num <= 19) return 'Advanced';
  return 'HOTS';
}

export function getClassNumber(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
}

export function getStageBand(cNum: number): 'early' | 'upper_primary' | 'middle' | 'secondary' {
  if (cNum <= 2) return 'early';
  if (cNum <= 5) return 'upper_primary';
  if (cNum <= 8) return 'middle';
  return 'secondary';
}

export function getBoardSyllabusLabel(board: EducationBoard, cNum: number): string {
  if (board === 'CBSE') return cNum >= 9 ? 'CBSE NCERT Secondary' : 'CBSE (NCERT NCF-SE)';
  if (board === 'ICSE') return cNum >= 9 ? 'CISCE ICSE Board' : 'ICSE (CISCE)';
  return cNum >= 9 ? 'Maharashtra SSC (MSBSHSE)' : 'Maharashtra State Board (Balbharati)';
}

/**
 * Rich, expanded chapter progression per subject & stage so the 23 worksheets
 * cover all syllabus chapters rather than concentrating on only 1–2 topics.
 */
const EXPANDED_SUBJECT_CHAPTERS: Record<
  SubjectName,
  Record<'early' | 'upper_primary' | 'middle' | 'secondary', string[]>
> = {
  Mathematics: {
    early: [
      'Chapter 1: Pre-Number Spatial Concepts & Shapes',
      'Chapter 2: Counting, Number Names & Place Value',
      'Chapter 3: Addition & Subtraction Stories',
      'Chapter 4: Skip Counting, Multiplication Readiness & Sharing',
      'Chapter 5: Indian Coins, Notes & Shopping Sums',
      'Chapter 6: Time, Days of Week & Daily Routine',
      'Chapter 7: Measurement of Length, Mass & Capacity',
      'Chapter 8: Repeating Patterns & Picture Data Handling',
    ],
    upper_primary: [
      'Chapter 1: Large Numbers, Place Value & Roman Numerals',
      'Chapter 2: Multi-Digit Addition & Subtraction Word Problems',
      'Chapter 3: Multiplication, Division & Unitary Method',
      'Chapter 4: Factors, Multiples, Divisibility & LCM-HCF',
      'Chapter 5: Fractions, Equivalent Forms & Decimals',
      'Chapter 6: Measurement Conversions (Length, Mass & Capacity)',
      'Chapter 7: Time Elapsed, Calendar & Indian Currency Bills',
      'Chapter 8: Angles, Perimeter, Area & Data Pictographs',
    ],
    middle: [
      'Chapter 1: Integers, Rational Numbers & Number Properties',
      'Chapter 2: Fractions, Decimals, Ratios & Unitary Proportion',
      'Chapter 3: Percentage, Profit-Loss & Simple/Compound Interest',
      'Chapter 4: Algebraic Expressions & Linear Equations',
      'Chapter 5: Exponents, Powers, Squares & Square Roots',
      'Chapter 6: Lines, Angles, Triangles & Congruence',
      'Chapter 7: Perimeter, Area & 3D Surface Area-Volume',
      'Chapter 8: Data Handling, Mean-Median & Probability',
    ],
    secondary: [
      'Chapter 1: Real Numbers, Surds & Polynomials',
      'Chapter 2: Linear Equations in Two Variables',
      'Chapter 3: Quadratic Equations & Nature of Roots',
      'Chapter 4: Arithmetic Progression (AP) & Financial GST',
      'Chapter 5: Coordinate Geometry & Slope of Lines',
      'Chapter 6: Triangles, Similarity & Pythagoras Theorem',
      'Chapter 7: Circles, Tangents, Mensuration & Volumes',
      'Chapter 8: Trigonometry, Statistics & Probability',
    ],
  },
  'Mathematics – Algebra': {
    early: ['Algebraic Number Patterns', 'Balanced Number Equations', 'Missing Number Puzzles', 'Step-by-Step Sums'],
    upper_primary: ['Expressions with Symbols', 'Number Properties', 'Balanced Equations', 'Pattern Generalisations'],
    middle: ['Algebraic Identities', 'Linear Equations', 'Factorisation', 'Ratio & Variation'],
    secondary: [
      'Chapter 1: Sets, Real Numbers & Polynomials',
      'Chapter 2: Linear Equations in Two Variables (Cramer’s Rule)',
      'Chapter 3: Quadratic Equations & Discriminant Applications',
      'Chapter 4: Arithmetic Progression (nth Term & Sum Sₙ)',
      'Chapter 5: Financial Planning (GST, Shares & Mutual Funds)',
      'Chapter 6: Ratio, Proportion & Direct/Inverse Variation',
      'Chapter 7: Probability & Sample Space Analysis',
      'Chapter 8: Statistics (Mean, Median, Mode & Pie Diagrams)',
    ],
  },
  'Mathematics – Geometry': {
    early: ['2D Flat Shapes', '3D Solid Shapes', 'Straight & Curved Lines', 'Symmetry Basics'],
    upper_primary: ['Lines, Rays & Angles', 'Triangles & Circles', 'Perimeter & Area', 'Symmetry & Nets'],
    middle: ['Parallel Lines & Transversals', 'Congruence of Triangles', 'Circle Chords & Arcs', 'Mensuration of Solids'],
    secondary: [
      'Chapter 1: Basic Concepts in Geometry & Parallel Lines',
      'Chapter 2: Similarity of Triangles & Basic Proportionality Theorem',
      'Chapter 3: Pythagoras Theorem & Geometric Mean',
      'Chapter 4: Circles, Chords, Inscribed Angles & Cyclic Quadrilaterals',
      'Chapter 5: Coordinate Geometry (Distance, Midpoint & Section Formula)',
      'Chapter 6: Trigonometry Identities & Heights-Distances',
      'Chapter 7: Mensuration (Cylinder, Cone, Sphere & Frustum)',
      'Chapter 8: Geometric Constructions & Proof Synthesis',
    ],
  },
  English: {
    early: [
      'Unit 1: Phonics, Picture Reading & Naming Words (Nouns)',
      'Unit 2: One and Many (Singular-Plural) & Pronouns',
      'Unit 3: Action Words (Verbs) & Describing Words (Adjectives)',
      'Unit 4: Articles (a/an/the) & Simple Prepositions',
      'Unit 5: Opposites, Rhyming Words & Everyday Vocabulary',
      'Unit 6: Short Stories, Comprehension & Punctuation',
    ],
    upper_primary: [
      'Unit 1: Reading Comprehension & Inference Skills',
      'Unit 2: Types of Nouns, Gender & Collective Nouns',
      'Unit 3: Pronouns, Adjectives & Degrees of Comparison',
      'Unit 4: Verbs, Present/Past/Future Tenses & Agreement',
      'Unit 5: Adverbs, Prepositions & Conjunctions',
      'Unit 6: Synonyms, Antonyms, Prefixes & Homophones',
      'Unit 7: Sentence Types, Punctuation & Guided Writing',
    ],
    middle: [
      'Unit 1: Unseen Prose & Poetry Comprehension',
      'Unit 2: Tenses Mastery & Modals / Auxiliaries',
      'Unit 3: Active and Passive Voice Transformations',
      'Unit 4: Direct and Indirect (Reported) Speech',
      'Unit 5: Clauses, Phrases & Sentence Synthesis',
      'Unit 6: Figures of Speech, Idioms & Phrasal Verbs',
      'Unit 7: Error Correction, Determiners & Formal Writing',
    ],
    secondary: [
      'Unit 1: Critical Reading Comprehension & Summary Analysis',
      'Unit 2: Advanced Tenses, Sequence & Subject-Verb Concord',
      'Unit 3: Voice Transformation & Complex Reported Speech',
      'Unit 4: Transformation of Sentences (Simple/Compound/Complex)',
      'Unit 5: Clauses (Noun, Adjective, Adverb) & Conditionals',
      'Unit 6: Poetic Devices, Idioms, Collocations & Word Formation',
      'Unit 7: Editing, Omission & Board Essay/Letter Conventions',
    ],
  },
  'Vocabulary and Grammar': {
    early: [
      'Module 1: Naming & Action Word Vocabulary',
      'Module 2: Opposite Words & Gender Pairs',
      'Module 3: Rhyming Words & Spelling Patterns',
      'Module 4: Capital Letters, Full Stops & Plurals',
      'Module 5: Describing Words & Sight Sentences',
    ],
    upper_primary: [
      'Module 1: Synonyms, Antonyms & Contextual Meaning',
      'Module 2: Homophones, Homonyms & One-Word Substitutes',
      'Module 3: Prefixes, Suffixes & Root Word Building',
      'Module 4: Parts of Speech & Tenses Precision',
      'Module 5: Proverbs, Idioms & Punctuation Mechanics',
    ],
    middle: [
      'Module 1: Advanced Synonyms, Antonyms & Nuance',
      'Module 2: Phrasal Verbs, Idioms & Figurative Expressions',
      'Module 3: Prefixes, Suffixes & Word Families',
      'Module 4: Active-Passive Voice & Reported Speech Accuracy',
      'Module 5: Clauses, Prepositions & Error Spotting',
    ],
    secondary: [
      'Module 1: Academic Lexicon, Etymology & One-Word Substitutes',
      'Module 2: Idiomatic Expressions, Collocations & Proverbs',
      'Module 3: Complex Sentence Synthesis & Clause Analysis',
      'Module 4: Board-Level Editing, Omission & Transformation',
      'Module 5: Rhetoric, Figures of Speech & Tone Precision',
    ],
  },
  Hindi: {
    early: [
      'पाठ १: वर्णमाला – स्वर, व्यंजन व मात्रा ज्ञान',
      'पाठ २: शब्द निर्माण, गिनती व रंग-रूप पहचान',
      'पाठ ३: संज्ञा (नाम वाले शब्द) व लिंग-वचन',
      'पाठ ४: सर्वनाम, विशेषण व सरल विलोम शब्द',
      'पाठ ५: चित्र वर्णन, बाल-कथा व वाक्य निर्माण',
    ],
    upper_primary: [
      'पाठ १: वर्ण-विचार, अनुस्वार व शुद्ध वर्तनी',
      'पाठ २: संज्ञा के भेद, लिंग, वचन व कारक',
      'पाठ ३: सर्वनाम, विशेषण व क्रिया परिचय',
      'पाठ ४: पर्यायवाची, विलोम व अनेक शब्दों के लिए एक शब्द',
      'पाठ ५: मुहावरे, लोकोक्तियाँ व विराम-चिह्न',
      'पाठ ६: काल, उपसर्ग-प्रत्यय व अपठित गद्यांश',
    ],
    middle: [
      'पाठ १: संज्ञा, सर्वनाम, विशेषण व क्रिया-विशेषण',
      'पाठ २: काल, वाच्य (कर्तृ/कर्म/भाव) व कारक विश्लेषण',
      'पाठ ३: संधि, समास व उपसर्ग-प्रत्यय रचना',
      'पाठ ४: पर्यायवाची, विलोम, श्रुतिसमभिन्नार्थक शब्द',
      'पाठ ५: मुहावरे, लोकोक्तियाँ व वाक्य शुद्धिकरण',
      'पाठ ६: अपठित गद्यांश-पद्यांश व पत्र-लेखन कौशल',
    ],
    secondary: [
      'पाठ १: शब्द-भेद, विकारी व अविकारी (अव्यय) प्रयोग',
      'पाठ २: संधि (स्वर, व्यंजन, विसर्ग) व समास भेद',
      'पाठ ३: वाच्य परिवर्तन, काल व रचना के आधार पर वाक्य भेद',
      'पाठ ४: रस, छंद व अलंकार (उपमा, रूपक, उत्प्रेक्षा, अनुप्रास)',
      'पाठ ५: मुहावरे, कहावतें, निबंध व औपचारिक पत्र-लेखन',
      'पाठ ६: पठित-अपठित गद्यांश बोध व भावार्थ विश्लेषण',
    ],
  },
  Marathi: {
    early: [
      'घटक १: मुळाक्षरे – स्वर, व्यंजन व जोडाक्षरे',
      'घटक २: शब्दसंपत्ती, अंकांची ओळख व रंग-फळे',
      'घटक ३: नाम (ओळख), लिंग व वचन बदल',
      'घटक ४: समानार्थी, विरुद्धार्थी शब्द व यमक जुळणारे शब्द',
      'घटक ५: सोपे वाक्यलेखन व चित्र वाचन',
    ],
    upper_primary: [
      'घटक १: शब्दांच्या जाती – नाम, सर्वनाम व विशेषण',
      'घटक २: क्रियापद, काळ (वर्तमान, भूत, भविष्य) व लिंग-वचन',
      'घटक ३: समानार्थी, विरुद्धार्थी व शब्दसमूहाबद्दल एक शब्द',
      'घटक ४: म्हणी, वाक्प्रचार व शुद्धलेखन नियम',
      'घटक ५: विरामचिन्हे, जोडाक्षरे व उतारा आकलन',
    ],
    middle: [
      'घटक १: सव्यय व अव्यय (शब्दयोगी, उभयान्वयी, केवळप्रयोगी)',
      'घटक २: विभक्ती, प्रयोग (कर्तरी, कर्मणी, भावे) व काळ',
      'घटक ३: समास, संधी व उपसर्ग-प्रत्यय साधित शब्द',
      'घटक ४: वाक्प्रचार, म्हणी व अचूक शुद्धलेखन',
      'घटक ५: उतारा-कविता आकलन व निबंध-पत्रलेखन',
    ],
    secondary: [
      'घटक १: शब्दांच्या आठही जाती व वाक्यप्रकार (विधानार्थी, प्रश्नार्थी, आज्ञार्थी)',
      'घटक २: समास (अव्ययीभाव, तत्पुरुष, द्वंद्व, बहुव्रीही) व संधी',
      'घटक ३: अलंकार (उपमा, उत्प्रेक्षा, रूपक, यमक) व वृत्ते',
      'घटक ४: प्रयोग ओळख, वाक्यरूपांतरण व शुद्धलेखन',
      'घटक ५: म्हणी, वाक्प्रचार व एस.एस.सी. उपयोजित लेखन',
    ],
  },
  Sanskrit: {
    early: ['अध्याय १: संस्कृत वर्णमाला परिचयः', 'अध्याय २: सरल-शब्दाः व संख्याः', 'अध्याय ३: लट्-लकार व वचनानि', 'अध्याय ४: सुभाषितानि'],
    upper_primary: ['अध्याय १: स्वर-व्यंजन व अकारान्त पुल्लिंगः', 'अध्याय २: लकार त्रयः व सर्वनाम', 'अध्याय ३: विभक्ति परिचयः', 'अध्याय ४: सरल अनुवाद व श्लोकाः'],
    middle: [
      'अध्याय १: माहेश्वर सूत्राणि, संधि व वर्ण-विच्छेदः',
      'अध्याय २: शब्द-रूपाणि (देव, लता, फल, अस्मद्, युष्मद्)',
      'अध्याय ३: धातु-रूपाणि (लट्, लृट्, लङ्, लोट्, विधिलिङ्)',
      'अध्याय ४: उपसर्ग, अव्यय, प्रत्यय (क्त्वा, तुमुन्, ल्यप्)',
      'अध्याय ५: समास परिचयः, संख्या व सुभाषितानि',
    ],
    secondary: [
      'अध्याय १: स्वर-व्यंजन-विसर्ग संधि विश्लेषणम्',
      'अध्याय २: समास (तत्पुरुष, कर्मधारय, द्वन्द्व, बहुव्रीहि, अव्ययीभाव)',
      'अध्याय ३: प्रत्यय (तव्यत्, अनीयर्, शतृ, शानच्, क्त, क्तवतु)',
      'अध्याय ४: वाच्य-परिवर्तनम्, कारक-उपपद विभक्तयः',
      'अध्याय ५: पठित-अपठित गद्यांश, समय-लेखनं व सुभाषितानि',
    ],
  },
  Science: {
    early: [
      'Chapter 1: Living and Non-Living Things Around Us',
      'Chapter 2: Parts of Plants, Leaves & Seeds',
      'Chapter 3: Animals, Homes, Food & Young Ones',
      'Chapter 4: Our Body, Sense Organs & Healthy Food',
      'Chapter 5: Air, Water, Weather & Day-Night Sky',
    ],
    upper_primary: [
      'Chapter 1: Plant Structure, Photosynthesis & Adaptations',
      'Chapter 2: Animal Habitats, Food Chains & Micro-life',
      'Chapter 3: Human Digestion, Respiration & Balanced Diet',
      'Chapter 4: States of Matter, Mixtures & Separation',
      'Chapter 5: Force, Work, Simple Machines & Friction',
      'Chapter 6: Light, Shadows, Sound & Natural Resources',
    ],
    middle: [
      'Chapter 1: Nutrition in Plants & Animals, Cell Biology',
      'Chapter 2: Physical & Chemical Changes, Acids, Bases & Metals',
      'Chapter 3: Motion, Force, Pressure & Sound Waves',
      'Chapter 4: Heat, Light Reflection, Lenses & Electricity',
      'Chapter 5: Reproduction, Adolescence, Microorganisms & Health',
      'Chapter 6: Coal, Petroleum, Ecosystems & Conservation',
    ],
    secondary: [
      'Chapter 1: Chemical Reactions, Periodic Classification & Carbon',
      'Chapter 2: Laws of Motion, Gravitation, Optics & Circuits',
      'Chapter 3: Life Processes, Control-Coordination & Heredity',
      'Chapter 4: Energy Sources, Space Missions & Environment',
    ],
  },
  Physics: {
    early: ['Push, Pull & Motion', 'Light & Shadows', 'Magnets & Sound', 'Floating & Sinking'],
    upper_primary: ['Force & Friction', 'Simple Machines', 'Light & Shadows', 'Energy Basics'],
    middle: [
      'Chapter 1: Physical Quantities, Measurement & Motion Graphs',
      'Chapter 2: Force, Pressure, Friction & Fluid Buoyancy',
      'Chapter 3: Heat Transfer, Temperature & Thermal Expansion',
      'Chapter 4: Light Reflection, Plane/Spherical Mirrors & Dispersion',
      'Chapter 5: Sound Propagation, Pitch, Loudness & Echo',
      'Chapter 6: Static Electricity, Electric Circuits & Electromagnetism',
    ],
    secondary: [
      'Chapter 1: Laws of Motion, Momentum & Newton’s Equations',
      'Chapter 2: Gravitation, Free Fall, Weight & Kepler’s Laws',
      'Chapter 3: Work, Power, Kinetic-Potential Energy & Conservation',
      'Chapter 4: Heat, Specific Heat Capacity & Anomalous Expansion',
      'Chapter 5: Refraction of Light, Lenses, Eye Defects & Dispersion',
      'Chapter 6: Current Electricity, Ohm’s Law, Heating & Magnetism',
    ],
  },
  Chemistry: {
    early: ['Matter & Materials', 'Solids, Liquids & Gases', 'Dissolving in Water', 'Everyday Materials'],
    upper_primary: ['States of Matter', 'Separating Mixtures', 'Physical vs Chemical Changes', 'Air & Water'],
    middle: [
      'Chapter 1: Matter, Elements, Compounds & Mixtures',
      'Chapter 2: Atomic Structure, Symbols, Valency & Formulas',
      'Chapter 3: Physical & Chemical Changes, Combustion & Flame',
      'Chapter 4: Acids, Bases, Salts & pH Indicators',
      'Chapter 5: Metals, Non-Metals, Reactivity & Corrosion',
      'Chapter 6: Coal, Petroleum, Water Chemistry & Fibres',
    ],
    secondary: [
      'Chapter 1: Chemical Reactions, Balancing Equations & Redox',
      'Chapter 2: Periodic Classification & Trends Across Periods/Groups',
      'Chapter 3: Acids, Bases, Salts, pH & Chlor-Alkali Process',
      'Chapter 4: Metallurgy, Ionic Bonding & Corrosion Prevention',
      'Chapter 5: Carbon Compounds, Homologous Series & IUPAC Naming',
      'Chapter 6: Mole Concept, Stoichiometry & Industrial Chemistry',
    ],
  },
  Biology: {
    early: ['Plants Around Us', 'Animals & Birds', 'Human Sense Organs', 'Healthy Habits'],
    upper_primary: ['Plant Parts & Reproduction', 'Human Organ Systems', 'Balanced Diet & Hygiene', 'Ecosystems'],
    middle: [
      'Chapter 1: Cell Structure, Tissues & Classification of Life',
      'Chapter 2: Plant Nutrition, Photosynthesis & Transportation',
      'Chapter 3: Human Digestion, Respiration, Circulation & Excretion',
      'Chapter 4: Microorganisms, Vaccines & Crop Production',
      'Chapter 5: Reproduction in Plants & Animals, Endocrine System',
      'Chapter 6: Biodiversity, Forests & Ecological Conservation',
    ],
    secondary: [
      'Chapter 1: Life Processes – Nutrition, Respiration, Transport & Excretion',
      'Chapter 2: Control and Coordination (Nervous & Hormonal Systems)',
      'Chapter 3: Cell Division (Mitosis/Meiosis), Reproduction & Embryology',
      'Chapter 4: Heredity, Mendelian Genetics, DNA & Evolution',
      'Chapter 5: Useful Microbes, Biotechnology & Stem Cell Research',
      'Chapter 6: Our Environment, Food Webs, Biomagnification & Conservation',
    ],
  },
  'Environmental Studies': {
    early: [
      'Chapter 1: My Body, Sense Organs & Personal Cleanliness',
      'Chapter 2: My Family, Neighbourhood & Community Helpers',
      'Chapter 3: Food We Eat, Healthy Water & Good Habits',
      'Chapter 4: Plants, Trees, Fruits & Animals Around Us',
      'Chapter 5: Houses, Clothes, Transport & Traffic Rules',
    ],
    upper_primary: [
      'Chapter 1: Food Production, Preservation & Deficiency Diseases',
      'Chapter 2: Water Cycle, Rainwater Harvesting & Safe Drinking Water',
      'Chapter 3: Forests, Wildlife Conservation & Plant Life Cycles',
      'Chapter 4: Houses Across Climates, Fuels & Transport Heritage',
      'Chapter 5: Clean Surroundings, Waste Segregation & Community Care',
    ],
    middle: [
      'Chapter 1: Natural Resources & Ecosystem Interdependence',
      'Chapter 2: Air, Water, Soil Conservation & Pollution Control',
      'Chapter 3: Biodiversity, Protected Sanctuaries & Disaster Readiness',
      'Chapter 4: Renewable Energy & Sustainable Living Habits',
    ],
    secondary: [
      'Chapter 1: Biodiversity Hotspots & Environmental Protection Acts',
      'Chapter 2: Water Security, Watershed & Climate Resilience',
      'Chapter 3: Waste Management & Green Technology',
      'Chapter 4: Sustainable Development & Environmental Audits',
    ],
  },
  'Environmental Education': {
    early: ['Clean Surroundings', 'Saving Water & Trees', 'Animals & Habitats', 'Eco Habits'],
    upper_primary: ['Water Conservation', 'Biodiversity & Forests', 'Waste Reduction', 'Solar & Wind Energy'],
    middle: ['Ecosystems & Food Webs', 'Pollution Mitigation', 'Watershed Care', 'Renewable Resources'],
    secondary: [
      'Chapter 1: Ecosystem Dynamics, Biomes & Ecological Pyramids',
      'Chapter 2: Biodiversity Hotspots, Western Ghats & IUCN Categories',
      'Chapter 3: Water Security (जलसुरक्षा), Rainwater Harvesting & Watersheds',
      'Chapter 4: Climate Change, Carbon Footprint & Paris/Montreal Protocols',
      'Chapter 5: Solid/E-Waste 5R Framework & Environmental Legislation',
    ],
  },
  History: {
    early: ['Our Stories & Heritage', 'Great Indian Leaders', 'Olden Days vs Today', 'Forts & Festivals'],
    upper_primary: [
      'Chapter 1: Chhatrapati Shivaji Maharaj – Childhood & Swarajya Pledge',
      'Chapter 2: Maratha Forts, Naval Heritage & Ashtapradhan Mandal',
      'Chapter 3: Ancient Rivers, Early Farming & Tools of History',
      'Chapter 4: Folk Culture, Monuments & Historical Sources',
    ],
    middle: [
      'Chapter 1: Indus Valley Civilisation, Vedic Age & Magadha',
      'Chapter 2: Mauryan, Gupta & Deccan Kingdoms (Satavahana/Rashtrakuta)',
      'Chapter 3: Shivaji Maharaj’s Swarajya, Maratha Expansion & Peshwas',
      'Chapter 4: Revolt of 1857, Social Reformers & Birth of INC',
      'Chapter 5: Gandhian Mass Movements & India’s Independence (1947)',
    ],
    secondary: [
      'Chapter 1: Historiography, Indian Heritage & Applied History',
      'Chapter 2: Nationalism in Europe & India’s Freedom Struggle',
      'Chapter 3: World Wars, Cold War & Decolonisation',
      'Chapter 4: Social Movements, Press, Cinema & Heritage Tourism',
      'Chapter 5: Post-Independence India, Constitution & Integration',
    ],
  },
  'History & Civics': {
    early: ['Our Heritage & Civics Rules', 'National Leaders', 'Community Helpers', 'Local Festivals'],
    upper_primary: ['Ancient Civilisations', 'Civic Rights & Duties', 'Local Administration', 'National Symbols'],
    middle: [
      'Chapter 1: Harappan & Mesopotamian Civilisations, Vedic Culture',
      'Chapter 2: Mauryas, Guptas, Bhakti-Sufi Saints & Mughal Empire',
      'Chapter 3: The Revolt of 1857 & Rise of Indian Nationalism',
      'Chapter 4: The Constitution of India, Fundamental Rights & Directive Principles',
      'Chapter 5: Union Parliament, President, Judiciary & Local Government',
    ],
    secondary: [
      'Chapter 1: First War of Independence (1857) & Growth of Nationalism',
      'Chapter 2: Partition of Bengal, Gandhian Era (NCM, CDM, Quit India)',
      'Chapter 3: Independence Act (1947), Subhas Bose & INA',
      'Chapter 4: First & Second World Wars, Rise of Dictatorships & UN',
      'Chapter 5: Union Legislature (Lok/Rajya Sabha), Executive & Supreme Court',
    ],
  },
  Geography: {
    early: ['Our Earth, Land & Sky', 'Maps, Directions & Weather', 'Hills, Rivers & Plains', 'Seasons Around Us'],
    upper_primary: [
      'Chapter 1: Globe, Latitudes, Longitudes & Continents-Oceans',
      'Chapter 2: Weather, Monsoon Winds & Seasons of India',
      'Chapter 3: Maharashtra’s Sahyadri, Rivers (Godavari/Krishna) & Districts',
      'Chapter 4: Soils, Crops, Forests & Transport Maps',
    ],
    middle: [
      'Chapter 1: Earth’s Rotation-Revolution, Time Zones & GMT/IST',
      'Chapter 2: Interior of Earth, Rocks, Earthquakes & Volcanoes',
      'Chapter 3: Atmospheric Pressure, Winds, Humidity & Precipitation',
      'Chapter 4: Hydrosphere, Ocean Currents, Tides & Marine Resources',
      'Chapter 5: Landforms, Soils, Agriculture, Minerals & Human Settlements',
    ],
    secondary: [
      'Chapter 1: Field Visit, Location-Extent & Physiography (India & Brazil)',
      'Chapter 2: Drainage Systems, Monsoon Mechanism & Natural Vegetation',
      'Chapter 3: Population Density, Urbanisation & Demographic Pyramids',
      'Chapter 4: Resources, Agriculture, Manufacturing Industries & Energy',
      'Chapter 5: Transport, Tourism, Trade Maps & Economic Corridors',
    ],
  },
  'Social Studies': {
    early: [
      'Chapter 1: Family, School Rules & Neighbourhood Places',
      'Chapter 2: Community Helpers & Public Services',
      'Chapter 3: National Symbols, Festivals & Unity',
      'Chapter 4: Safety Rules & Means of Transport',
    ],
    upper_primary: [
      'Chapter 1: Gram Panchayat, Municipal Council & Civic Life',
      'Chapter 2: Rights & Duties of Citizens and Traffic Discipline',
      'Chapter 3: India’s Physical Features, States & Capitals',
      'Chapter 4: Agriculture, Occupations & Heritage of India',
    ],
    middle: [
      'Chapter 1: Diversity, Equality & Democratic Institutions',
      'Chapter 2: Indian Constitution, Rights & State Government',
      'Chapter 3: Media, Gender Roles & Markets Around Us',
      'Chapter 4: Rural & Urban Livelihoods and Public Facilities',
    ],
    secondary: [
      'Chapter 1: Democratic Governance & Constitutional Design',
      'Chapter 2: Electoral Politics, Institutions & Federalism',
      'Chapter 3: Economic Sectors & Globalisation',
      'Chapter 4: Consumer Rights & Sustainable Development',
    ],
  },
  'Social Science': {
    early: ['Home & Community', 'Our Country Symbols', 'Helpers Around Us', 'Earth Basics'],
    upper_primary: ['Civic Life & Diversity', 'India States & Landforms', 'Early Civilisations', 'Markets & Work'],
    middle: [
      'Chapter 1: Locating Places on Earth, Oceans & Landforms',
      'Chapter 2: Timeline of History, Harappa & Ancient Indian Empires',
      'Chapter 3: Democracy, Panchayati Raj, State Government & Equality',
      'Chapter 4: Economic Activities, Markets, Environment & Settlements',
      'Chapter 5: Colonial Rule, 1857, Reformers & Freedom Struggle',
    ],
    secondary: [
      'Chapter 1: Rise of Nationalism in Europe & India',
      'Chapter 2: Resources, Forest-Wildlife, Water, Agriculture & Minerals',
      'Chapter 3: Power Sharing, Federalism, Gender-Caste & Political Parties',
      'Chapter 4: Sectors of Economy, Money-Credit, Globalisation & Consumer Rights',
      'Chapter 5: Print Culture, Outcomes of Democracy & Lifelines of Economy',
    ],
  },
  'Political Science': {
    early: ['Rules at Home & School', 'Helping Each Other', 'Our Flag & Leaders', 'Fair Play'],
    upper_primary: ['Local Self-Government', 'Traffic & Civic Rules', 'Our Fundamental Duties', 'National Parliament'],
    middle: ['The Constitution', 'Parliament & Lawmaking', 'Judiciary & Rights', 'Social Justice'],
    secondary: [
      'Chapter 1: Working of the Indian Constitution & Basic Structure',
      'Chapter 2: Electoral Process, ECI & Electoral Reforms',
      'Chapter 3: Political Parties (National & Regional) & Coalition Politics',
      'Chapter 4: Social and Political Movements & Challenges to Democracy',
      'Chapter 5: India’s Foreign Policy, NAM, Defence & United Nations',
    ],
  },
  Economics: {
    early: ['Needs vs Wants', 'Saving Pocket Money', 'Goods & Services', 'Helpers in Market'],
    upper_primary: ['Coins, Notes & Banking', 'Agriculture vs Factories', 'Trade & Transport', 'Smart Spending'],
    middle: ['Sectors of Economy', 'Markets & Consumers', 'Money & Barter', 'Public Services'],
    secondary: [
      'Chapter 1: Basic Concepts, Micro vs Macro & Factors of Production',
      'Chapter 2: Law of Demand, Supply & Elasticity of Demand',
      'Chapter 3: Money, Barter Drawbacks & Reserve Bank of India (RBI)',
      'Chapter 4: Sectors of Economy, GDP, Unemployment & Poverty',
      'Chapter 5: Inflation, Public Finance, Globalisation & Consumer Rights',
    ],
  },
  'Commercial Studies': {
    early: ['Shops & Coins', 'Needs vs Wants', 'Honest Trading', 'Saving Habits'],
    upper_primary: ['Markets & Trade', 'Banking Basics', 'Transport of Goods', 'Consumer Care'],
    middle: ['Business Ownership', 'E-Commerce Intro', 'Accounting Terms', 'Advertising'],
    secondary: [
      'Chapter 1: Stakeholders in Commercial Organisations & Ethics',
      'Chapter 2: Marketing, Advertising & E-Commerce (B2B/B2C)',
      'Chapter 3: Capital vs Revenue Expenditure & Final Accounts (Trading/P&L)',
      'Chapter 4: Budgeting, Commercial Banking, NEFT/RTGS & Insurance',
      'Chapter 5: Logistics, Warehousing, Industrial Relations & Consumer Protection',
    ],
  },
  'General Knowledge': {
    early: [
      'Topic 1: National Symbols of India (Flag, Animal, Bird, Flower)',
      'Topic 2: Fruits, Vegetables, Animals & Their Homes',
      'Topic 3: Seasons, Days, Months & Indian Festivals',
      'Topic 4: Community Helpers, Vehicles & Musical Instruments',
    ],
    upper_primary: [
      'Topic 1: States, Capitals & Famous Monuments of India',
      'Topic 2: Maharashtra Heritage, Forts, Rivers & Festivals',
      'Topic 3: Scientists, Inventions & Solar System Facts',
      'Topic 4: Sports, Olympic Games & World Wonders',
    ],
    middle: [
      'Topic 1: Indian Constitution, Presidents & National Institutions',
      'Topic 2: ISRO Space Missions (Chandrayaan/Mangalyaan/Aditya-L1)',
      'Topic 3: World Capitals, Currencies, Rivers & Mountain Ranges',
      'Topic 4: Nobel Laureates, Bharat Ratna & Classical Arts',
    ],
    secondary: [
      'Topic 1: Indian Polity, Constitutional Amendments & Commissions',
      'Topic 2: Breakthrough Science, AI, Defence & ISRO Milestones',
      'Topic 3: Global Summits (G20, BRICS, UN, WHO) & Treaties',
      'Topic 4: Economics, Awards (Padma/Booker/Abel) & World Geography',
    ],
  },
  'Moral Education': {
    early: [
      'Value 1: Speaking the Truth & Saying Please/Thank You',
      'Value 2: Sharing Toys, Caring for Pets & Helping Parents',
      'Value 3: Punctuality, Cleanliness & Respecting Elders',
      'Value 4: Kindness, Patience & Saving Water/Food',
    ],
    upper_primary: [
      'Value 1: Honesty, Courage & Keeping Promises',
      'Value 2: Empathy, Helping Classmates & Anti-Bullying',
      'Value 3: Civic Sense, Queue Discipline & Public Property Care',
      'Value 4: Gratitude, Hard Work & Caring for Nature',
    ],
    middle: [
      'Value 1: Integrity, Digital Ethics & Responsibility',
      'Value 2: Teamwork, Inclusiveness & Conflict Resolution',
      'Value 3: Environmental Stewardship & Disaster Compassion',
      'Value 4: Self-Discipline, Perseverance & Constitutional Values',
    ],
    secondary: [
      'Value 1: Ethical Decision-Making & Academic Integrity',
      'Value 2: Civic Leadership, Social Justice & Empathy',
      'Value 3: Cyber Responsibility, Fact-Checking & Digital Wellbeing',
      'Value 4: Global Citizenship & Sustainable Compassion',
    ],
  },
  'Computer Knowledge': {
    early: [
      'Chapter 1: What is a Computer? Natural vs Man-Made Machines',
      'Chapter 2: Basic Parts – Monitor, CPU, Keyboard, Mouse & Printer',
      'Chapter 3: Keyboard Keys, Mouse Clicks & Tux Paint Basics',
      'Chapter 4: Safe & Healthy Computer Habits',
    ],
    upper_primary: [
      'Chapter 1: Input, Processing (CPU) & Output Devices',
      'Chapter 2: Computer Memory (RAM/ROM, Pen Drive, Hard Disk)',
      'Chapter 3: Operating Systems, Files, Folders & MS Word/Paint',
      'Chapter 4: Internet Safety, Browsers & Algorithms/Scratch',
    ],
    middle: [
      'Chapter 1: Generations of Computers & Binary Data Representation',
      'Chapter 2: System vs Application Software & Operating Systems',
      'Chapter 3: Spreadsheets, Formulas & Presentation Tools',
      'Chapter 4: Computer Networks, HTML5 Basics & Cyber Security',
    ],
    secondary: [
      'Chapter 1: Number Systems (Binary/Octal/Hex) & Logic Gates',
      'Chapter 2: Networking Topologies, TCP/IP, DNS & Protocols',
      'Chapter 3: Relational Databases (SQL), HTML5/CSS & Programming Logic',
      'Chapter 4: Cloud Computing, AI Fundamentals & Cyber Law',
    ],
  },
  'Computer Studies': {
    early: [
      'Chapter 1: Computer Parts & Uses at School/Home',
      'Chapter 2: Mouse Actions & Keyboard Special Keys',
      'Chapter 3: Paint Tools & Drawing Shapes Digitally',
      'Chapter 4: Good Posture & Machine Care',
    ],
    upper_primary: [
      'Chapter 1: Hardware Components (IPO Cycle) & Storage Units',
      'Chapter 2: Operating System Desktop, Files & Folder Management',
      'Chapter 3: Word Processing Formatting & Multimedia Slides',
      'Chapter 4: Stepwise Algorithms, Flowcharts & Safe Internet',
    ],
    middle: [
      'Chapter 1: Operating Systems, Memory Hierarchy & File Systems',
      'Chapter 2: Number Systems (Binary–Decimal Conversions)',
      'Chapter 3: Spreadsheets Formulas, Charts & Database Tables',
      'Chapter 4: HTML5 Web Design, Algorithms & BlueJ Java Intro',
    ],
    secondary: [
      'Chapter 1: OOP Concepts & Java Basics',
      'Chapter 2: Decision Making, Loops & Modular Methods',
      'Chapter 3: Strings, Arrays & Searching/Sorting Logic',
      'Chapter 4: Networks, Cyber Safety & Computing Ethics',
    ],
  },
  'Computer Applications': {
    early: ['Digital Machines', 'Keyboard & Mouse', 'Paint Shapes', 'Safe Computing'],
    upper_primary: ['IPO Cycle', 'Files & Folders', 'Word & Slides', 'Flowcharts'],
    middle: ['Number Systems', 'HTML5 Tags', 'Spreadsheets', 'Java Fundamentals'],
    secondary: [
      'Chapter 1: Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism)',
      'Chapter 2: Java Data Types, Operators, Math Methods & Scanner Input',
      'Chapter 3: Conditional Statements, Loops (for/while/do-while) & Patterns',
      'Chapter 4: User-Defined Methods, Overloading & Constructors',
      'Chapter 5: Library Classes, Wrapper Types & String Manipulation',
      'Chapter 6: 1D/2D Arrays, Bubble/Selection Sort & Binary Search',
    ],
  },
  'Information Technology': {
    early: ['Digital Tools', 'Smart Devices', 'Safe Screens', 'Keyboard Fun'],
    upper_primary: ['Hardware & OS', 'Documents & Charts', 'Internet Basics', 'Coding Blocks'],
    middle: ['Networks & Cyber Hygiene', 'HTML5 & CSS', 'Spreadsheets', 'Python Intro'],
    secondary: [
      'Chapter 1: Advanced Web Designing (HTML5 Semantics, Forms & CSS3)',
      'Chapter 2: Computer Networking, Topologies, OSI Layers & Cloud IT',
      'Chapter 3: Database Concepts (RDBMS, Keys & SQL Queries)',
      'Chapter 4: Cyber Security, Phishing Defence & IT Act 2000',
      'Chapter 5: E-Commerce Models, Digital Signatures & Emerging Tech (AI/IoT)',
    ],
  },
  'Logical Reasoning': {
    early: [
      'Unit 1: Visual Pattern Completion & Next Shape',
      'Unit 2: Simple Number Counting Series & Missing Digits',
      'Unit 3: Odd One Out (Shapes, Fruits & Animals)',
      'Unit 4: Matching Pairs, Shadows & Left-Right Directions',
    ],
    upper_primary: [
      'Unit 1: Arithmetic & Skip Number Series Puzzles',
      'Unit 2: Alphabet Series & Letter-Shift Codes',
      'Unit 3: Analogies, Classification & Odd One Out',
      'Unit 4: Mirror Images, Water Reflections & Cube Counting',
      'Unit 5: Direction Sense, Calendar Days & Ranking Order',
    ],
    middle: [
      'Unit 1: Multi-Difference, Square & Prime Number Series',
      'Unit 2: Coding-Decoding (Letter, Symbol & Number Codes)',
      'Unit 3: Blood Relations, Direction Turns & Seating Order',
      'Unit 4: Venn Diagrams, Syllogisms & Paper Folding',
      'Unit 5: Mathematical Operations, Age Puzzles & Missing Matrix',
    ],
    secondary: [
      'Unit 1: Complex Number Series & Algebraic Grid Puzzles',
      'Unit 2: Conditional Coding, Cryptarithmetic & Data Sufficiency',
      'Unit 3: Multi-Variable Seating, Blood Relations & Clocks-Calendars',
      'Unit 4: Formal Syllogisms, Assertion-Reasoning & Venn Logic',
      'Unit 5: Spatial 3D Dice Nets, Non-Verbal Matrices & Critical Logic',
    ],
  },
  'Drawing and Creative Activities': {
    early: [
      'Art 1: Primary Colours (Red, Yellow, Blue) & Mixing Fun',
      'Art 2: Drawing Basic 2D Shapes (Circle, Sun, House, Boat)',
      'Art 3: Nature Sketching – Trees, Flowers, Fruits & Butterflies',
      'Art 4: Paper Folding (Origami), Thumb Painting & Craft',
    ],
    upper_primary: [
      'Art 1: Colour Wheel – Warm vs Cool & Complementary Shades',
      'Art 2: Warli Folk Art, Mandala & Geometric Rangoli Symmetry',
      'Art 3: Pencil Shading, Light-Shadow & Object Drawing',
      'Art 4: Collage, Eco-Craft & Festival Poster Design',
    ],
    middle: [
      'Art 1: One-Point Perspective, Proportions & Landscape Composition',
      'Art 2: Indian Heritage Art (Warli, Madhubani & Kalamkari)',
      'Art 3: Typography, Poster Layout & Calligraphy Strokes',
      'Art 4: Still Life Hatching & Three-Dimensional Illusion',
    ],
    secondary: [
      'Art 1: Two-Point Perspective & Architectural Sketching',
      'Art 2: Fine Tone Shading, Chiaroscuro & Portrait Proportions',
      'Art 3: Commercial Design, Logos & Folk Art Modernisation',
      'Art 4: Mixed-Media Sculpture & Eco-Design Projects',
    ],
  },
  'Physical Education': {
    early: ['Morning Stretching', 'Balanced Tiffin & Water', 'Cleanliness & Posture', 'Fun Tag Games'],
    upper_primary: ['Warm-Up & Cool-Down', 'Posture & Yoga Basics', 'Nutrients & Hydration', 'Playground Safety'],
    middle: ['Fitness Components', 'Surya Namaskar & Pranayama', 'Track & Team Rules', 'First Aid Basics'],
    secondary: [
      'Chapter 1: Health-Related Fitness Components & BMI Analysis',
      'Chapter 2: Ashtanga Yoga, Asanas & Pranayama Physiology',
      'Chapter 3: Track & Field Athletics & Major Team Sports Rules',
      'Chapter 4: Balanced Sports Nutrition, Hydration & Doping Ethics',
      'Chapter 5: Sports Injuries, R.I.C.E. Protocol & First Aid',
    ],
  },
  'Environmental Awareness': {
    early: ['Our Green Friends: Plants & Trees', 'Clean Water & Tidy Surroundings'],
    upper_primary: ['Segregating Waste & Composting', 'Protecting Rivers, Soil & Wildlife'],
    middle: ['Local Biodiversity & Ecosystems', 'Renewable Energy & Zero-Waste Living'],
    secondary: ['Climate Resilience & Carbon Footprint', 'Sustainable Watershed & Eco-Stewardship'],
  },
  'Life Skills': {
    early: ['Polite Words, Sharing & Kindness', 'Personal Safety & Daily Routines'],
    upper_primary: ['Time Management & Study Habits', 'Teamwork & Handling Disagreements'],
    middle: ['Active Listening & Goal Planning', 'Emotional Regulation & Peer Confidence'],
    secondary: ['Decision Making & Stress Management', 'Leadership, First Aid & Career Readiness'],
  },
  'General Science Activities': {
    early: ['Sink or Float Observation Lab', 'Seed Sprouting & Sunlight Journal'],
    upper_primary: ['Kitchen Acid-Base Indicators', 'Magnets, Shadows & Water Filtration'],
    middle: ['Simple Periscope & Capillary Action', 'Electricity Circuits & Microscope Discovery'],
    secondary: ['DIY Spectroscope & Electromagnet Lab', 'Soil pH Testing & Solar Oven Inquiry'],
  },
  'Financial Literacy & Digital Citizenship': {
    early: ['Needs vs Wants & Coin Counting', 'Kind Words & Safe Screen Habits'],
    upper_primary: ['Piggy Bank Saving & Pocket Budgeting', 'Strong Passwords & Trusted Adults Online'],
    middle: ['Bank Accounts, UPI Safety & Fraud Alerts', 'Digital Footprint & Fact-Checking Sources'],
    secondary: ['Compound Interest, Taxes & Smart Planning', 'Cyber Privacy, Phishing Defence & Media Ethics'],
  },
};

export function getRichChaptersForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): string[] {
  if (isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride)) {
    const resolved = getEffectiveSyllabusForConsumer({
      board,
      classLevel,
      subject,
      medium,
      useVerifiedPipelineOverride: true,
    });
    return resolved.mode === 'central_verified' ? [...resolved.chapterTitles] : [];
  }

  const cNum = getClassNumber(classLevel);
  const band = getStageBand(cNum);
  const baseBoardChaps = getChaptersForBoardClassSubject(board, classLevel, subject) || [];
  const stageChaps = EXPANDED_SUBJECT_CHAPTERS[subject]?.[band] || [];

  const merged: string[] = [];
  const seen = new Set<string>();
  for (const ch of [...baseBoardChaps, ...stageChaps]) {
    const key = ch.trim().toLowerCase();
    if (ch && !seen.has(key)) {
      seen.add(key);
      merged.push(ch.trim());
    }
  }
  if (merged.length === 0) {
    merged.push(`Chapter 1: Core ${subject} Concepts`, `Chapter 2: Applied ${subject} Skills`);
  }
  return merged;
}
