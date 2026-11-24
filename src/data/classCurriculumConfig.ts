import { ClassLevel, EducationBoard, SubjectName, QuizLevel } from '../types';
import { CBSE_CURRICULUM_BY_CLASS } from './boards/cbseCurriculumConfig';
import { ICSE_CURRICULUM_BY_CLASS } from './boards/icseCurriculumConfig';

export interface SubjectMetaItem {
  name: SubjectName;
  icon: string;
  bgGradient: string;
  gradient?: string;
  shortCode: string;
  category: 'core' | 'language' | 'science' | 'social' | 'skill';
  marathiName: string;
  marathiTitle?: string;
  hindiName: string;
  description: string;
  chaptersSummary?: string;
  chapters: string[];
}

export interface ClassMetaItem {
  classLevel: ClassLevel;
  classNumber: number;
  shortLabel: string;
  ordinalLabel: string;
  marathiLabel: string;
  hindiLabel: string;
  boardStage: string;
  syllabusDescription: string;
}

export const ALL_10_CLASSES: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10'
];

export const ALL_10_CLASSES_META: ClassMetaItem[] = [
  {
    classLevel: 'Class 1',
    classNumber: 1,
    shortLabel: 'Std 1st',
    ordinalLabel: 'Class 1st',
    marathiLabel: 'इयत्ता १ ली',
    hindiLabel: 'कक्षा १',
    boardStage: 'Maharashtra State Board • Early Primary Foundation',
    syllabusDescription: 'Foundational Numeracy, Phonics, Marathi & Hindi Varnamala, EVS, GK & Creative Drawing'
  },
  {
    classLevel: 'Class 2',
    classNumber: 2,
    shortLabel: 'Std 2nd',
    ordinalLabel: 'Class 2nd',
    marathiLabel: 'इयत्ता २ री',
    hindiLabel: 'कक्षा २',
    boardStage: 'Maharashtra State Board • Primary Stage',
    syllabusDescription: '14 Core Subjects with 4 Progressive Quiz Levels & Interactive Worksheets'
  },
  {
    classLevel: 'Class 3',
    classNumber: 3,
    shortLabel: 'Std 3rd',
    ordinalLabel: 'Class 3rd',
    marathiLabel: 'इयत्ता ३ री',
    hindiLabel: 'कक्षा ३',
    boardStage: 'Maharashtra State Board • Primary Stage',
    syllabusDescription: '14 Core Subjects with 4 Progressive Quiz Levels & Interactive Worksheets'
  },
  {
    classLevel: 'Class 4',
    classNumber: 4,
    shortLabel: 'Std 4th',
    ordinalLabel: 'Class 4th',
    marathiLabel: 'इयत्ता ४ थी',
    hindiLabel: 'कक्षा ४',
    boardStage: 'Maharashtra State Board & MSCE Scholarship Stage',
    syllabusDescription: '14 Core Subjects + Maharashtra 4th Standard Scholarship Preparation'
  },
  {
    classLevel: 'Class 5',
    classNumber: 5,
    shortLabel: 'Std 5th',
    ordinalLabel: 'Class 5th',
    marathiLabel: 'इयत्ता ५ वी',
    hindiLabel: 'कक्षा ५',
    boardStage: 'Maharashtra State Board • Upper Primary Transition',
    syllabusDescription: '14 Core Subjects with Conceptual Application & Chapter Worksheets'
  },
  {
    classLevel: 'Class 6',
    classNumber: 6,
    shortLabel: 'Std 6th',
    ordinalLabel: 'Class 6th',
    marathiLabel: 'इयत्ता ६ वी',
    hindiLabel: 'कक्षा ६',
    boardStage: 'Maharashtra State Board • Middle School Stage',
    syllabusDescription: '14 Core Subjects with Analytical Thinking & Chapter Worksheets'
  },
  {
    classLevel: 'Class 7',
    classNumber: 7,
    shortLabel: 'Std 7th',
    ordinalLabel: 'Class 7th',
    marathiLabel: 'इयत्ता ७ वी',
    hindiLabel: 'कक्षा ७',
    boardStage: 'Maharashtra State Board & MSCE Scholarship Stage',
    syllabusDescription: '14 Core Subjects + Maharashtra 7th Standard Scholarship Preparation'
  },
  {
    classLevel: 'Class 8',
    classNumber: 8,
    shortLabel: 'Std 8th',
    ordinalLabel: 'Class 8th',
    marathiLabel: 'इयत्ता ८ वी',
    hindiLabel: 'कक्षा ८',
    boardStage: 'Maharashtra State Board • High School Foundation',
    syllabusDescription: '14 Core Subjects with Higher-Order Mastery & Interactive Worksheets'
  },
  {
    classLevel: 'Class 9',
    classNumber: 9,
    shortLabel: 'Std 9th',
    ordinalLabel: 'Class 9th',
    marathiLabel: 'इयत्ता ९ वी',
    hindiLabel: 'कक्षा ९',
    boardStage: 'Maharashtra State Board • Secondary School (Std IX)',
    syllabusDescription: 'Separate Physics, Chemistry, Biology, Mathematics, Languages, History, Political Science, Geography & IT'
  },
  {
    classLevel: 'Class 10',
    classNumber: 10,
    shortLabel: 'Std 10th (SSC)',
    ordinalLabel: 'Class 10th',
    marathiLabel: 'इयत्ता १० वी (SSC)',
    hindiLabel: 'कक्षा १० (SSC)',
    boardStage: 'Maharashtra State Board SSC (Std X Board Curriculum)',
    syllabusDescription: 'Mathematics (Algebra & Geometry), Separate Physics, Chemistry, Biology, Languages, Social Sciences & IT'
  }
];

// The 14 Existing Subjects (Preserved 100% intact)
export const CORE_14_SUBJECTS: SubjectMetaItem[] = [
  {
    name: 'Mathematics',
    icon: '📐',
    bgGradient: 'from-blue-500 to-indigo-600',
    shortCode: 'MATH',
    category: 'core',
    marathiName: 'गणित',
    hindiName: 'गणित',
    description: 'Numbers, Arithmetic, Fractions, Mensuration, Equations & Problem Solving',
    chapters: ['Number System & Operations', 'Fractions, Decimals & Ratios', 'Geometry & Measurement', 'Applied Word Problems & Algebra']
  },
  {
    name: 'English',
    icon: '📖',
    bgGradient: 'from-amber-500 to-orange-600',
    shortCode: 'ENG',
    category: 'language',
    marathiName: 'इंग्रजी',
    hindiName: 'अंग्रेजी',
    description: 'Reading Comprehension, Grammar, Tenses, Sentence Structure & Literature',
    chapters: ['Parts of Speech & Nouns', 'Tenses & Active-Passive Voice', 'Comprehension & Figures of Speech', 'Writing Skills & Syntax']
  },
  {
    name: 'Hindi',
    icon: '🇮🇳',
    bgGradient: 'from-red-500 to-rose-600',
    shortCode: 'HIN',
    category: 'language',
    marathiName: 'हिंदी',
    hindiName: 'हिंदी सुलभभारती / लोकभारती',
    description: 'वर्णमाला, संज्ञा, सर्वनाम, विशेषण, मुहावरे, विलोम व पर्यायवाची शब्द, व्याकरण',
    chapters: ['वर्णमाला और शब्द संपदा', 'संज्ञा, सर्वनाम और विशेषण', 'समानार्थी, विलोम और मुहावरे', 'काल, संधि, समास और वाक्य रचना']
  },
  {
    name: 'Marathi',
    icon: '🚩',
    bgGradient: 'from-orange-500 to-amber-600',
    shortCode: 'MAR',
    category: 'language',
    marathiName: 'मराठी बालभारती / कुमारभारती',
    hindiName: 'मराठी',
    description: 'मुळाक्षरे, शब्दांच्या जाती, समानार्थी-विरुद्धार्थी शब्द, म्हणी, वाक्यप्रचार व व्याकरण',
    chapters: ['वर्णमाला आणि शब्दसंपत्ती', 'शब्दांच्या जाती व काळ', 'समानार्थी, विरुद्धार्थी शब्द व म्हणी', 'वाक्यप्रचार, समास आणि अलंकार']
  },
  {
    name: 'Science',
    icon: '🔬',
    bgGradient: 'from-emerald-500 to-teal-600',
    shortCode: 'SCI',
    category: 'science',
    marathiName: 'सामान्य विज्ञान',
    hindiName: 'सामान्य विज्ञान',
    description: 'Living World, Human Body, Matter, Force, Energy, Light & Scientific Inquiry',
    chapters: ['The Living World & Adaptations', 'Human Organ Systems & Nutrition', 'Matter, Elements & Changes', 'Force, Work, Light & Energy']
  },
  {
    name: 'General Knowledge',
    icon: '🌍',
    bgGradient: 'from-sky-500 to-blue-600',
    shortCode: 'GK',
    category: 'social',
    marathiName: 'सामान्य ज्ञान',
    hindiName: 'सामान्य ज्ञान',
    description: 'India & Maharashtra Heritage, ISRO Space Missions, Science Facts & Current Affairs',
    chapters: ['National Symbols & Indian States', 'Maharashtra Heritage & Monuments', 'Science, Space (ISRO) & Inventions', 'World Capitals, Awards & Sports']
  },
  {
    name: 'Social Studies',
    icon: '🏛️',
    bgGradient: 'from-purple-500 to-indigo-600',
    shortCode: 'SST',
    category: 'social',
    marathiName: 'सामाजिक शास्त्र व नागरिकशास्त्र',
    hindiName: 'सामाजिक अध्ययन व नागरिक शास्त्र',
    description: 'Indian Constitution, Fundamental Rights, Local Self-Government & Civic Duties',
    chapters: ['Community & Local Administration', 'The Constitution of India', 'Fundamental Rights & Duties', 'Parliament, Judiciary & Democracy']
  },
  {
    name: 'History',
    icon: '⚔️',
    bgGradient: 'from-amber-700 to-stone-800',
    shortCode: 'HIS',
    category: 'social',
    marathiName: 'इतिहास',
    hindiName: 'इतिहास',
    description: 'Ancient India, Hindavi Swarajya of Shivaji Maharaj, Freedom Struggle & Modern History',
    chapters: ['Ancient Civilizations & Heritage', 'Chhatrapati Shivaji Maharaj & Swarajya', 'Indian Freedom Struggle (1857–1947)', 'Modern India & Historiography']
  },
  {
    name: 'Geography',
    icon: '🗺️',
    bgGradient: 'from-teal-500 to-emerald-700',
    shortCode: 'GEO',
    category: 'social',
    marathiName: 'भूगोल',
    hindiName: 'भूगोल',
    description: 'Earth, Landforms, Rivers, Climate, Agriculture, Resources & Map Reading',
    chapters: ['Earth, Latitudes & Longitudes', 'Physiography, Rivers & Drainage', 'Climate, Monsoon & Natural Vegetation', 'Agriculture, Minerals & Population']
  },
  {
    name: 'Computer Knowledge',
    icon: '💻',
    bgGradient: 'from-cyan-500 to-blue-700',
    shortCode: 'COMP',
    category: 'skill',
    marathiName: 'संगणक ज्ञान',
    hindiName: 'कंप्यूटर ज्ञान',
    description: 'Hardware, Software, Operating Systems, Internet Safety, Networking & Coding Logic',
    chapters: ['Computer Hardware & Peripherals', 'Memory, Storage & Operating Systems', 'Internet, Networks & Cyber Safety', 'Algorithms, Binary & Coding Basics']
  },
  {
    name: 'Logical Reasoning',
    icon: '💡',
    bgGradient: 'from-violet-500 to-purple-700',
    shortCode: 'LOG',
    category: 'skill',
    marathiName: 'बुद्धिमत्ता चाचणी व तर्कशक्ती',
    hindiName: 'तार्किक क्षमता व बुद्धिमत्ता',
    description: 'Number Series, Coding-Decoding, Analogies, Direction Sense, Blood Relations & Syllogisms',
    chapters: ['Number & Alphabet Series', 'Coding-Decoding & Analogies', 'Direction Sense & Blood Relations', 'Logical Puzzles & Deductive Reasoning']
  },
  {
    name: 'Environmental Studies',
    icon: '🌱',
    bgGradient: 'from-green-500 to-emerald-700',
    shortCode: 'EVS',
    category: 'science',
    marathiName: 'परिसर अभ्यास',
    hindiName: 'पर्यावरण अध्ययन',
    description: 'Our Environment, Water Cycle, Plants & Animals, Food, Shelter & Conservation',
    chapters: ['Our Surroundings & Living Things', 'Water, Air & Weather Cycle', 'Food, Health & Shelter', 'Biodiversity & Eco-Conservation']
  },
  {
    name: 'Moral Education',
    icon: '🕊️',
    bgGradient: 'from-rose-500 to-pink-600',
    shortCode: 'MOR',
    category: 'skill',
    marathiName: 'मूल्यशिक्षण व नीतिशास्त्र',
    hindiName: 'नैतिक शिक्षा',
    description: 'Honesty, Empathy, Respect, Civic Responsibility, Self-Discipline & Ethical Values',
    chapters: ['Truthfulness, Honesty & Integrity', 'Compassion, Empathy & Respect', 'Civic Sense & Environmental Ethics', 'Leadership, Courage & Gratitude']
  },
  {
    name: 'Vocabulary and Grammar',
    icon: '✍️',
    bgGradient: 'from-fuchsia-500 to-purple-600',
    shortCode: 'VOC',
    category: 'language',
    marathiName: 'शब्दसंग्रह आणि व्याकरण',
    hindiName: 'शब्दावली और व्याकरण',
    description: 'Synonyms, Antonyms, Idioms, Phrasal Verbs, Clauses, Punctuation & Error Spotting',
    chapters: ['Synonyms, Antonyms & One-Word Substitutes', 'Prefixes, Suffixes & Root Words', 'Idioms, Phrases & Proverbs', 'Clauses, Synthesis & Error Correction']
  }
];

// Additional Specialized Subjects for Class 1, Class 9, and Class 10 (Maharashtra State Board / SSC)
export const ADDITIONAL_CLASS_SUBJECTS: SubjectMetaItem[] = [
  {
    name: 'Drawing and Creative Activities',
    icon: '🎨',
    bgGradient: 'from-pink-500 to-rose-600',
    shortCode: 'DRAW',
    category: 'skill',
    marathiName: 'चित्रकला आणि सृजनशील उपक्रम',
    hindiName: 'चित्रकला और रचनात्मक गतिविधियाँ',
    description: 'Primary & Secondary Colours, Geometric Shapes, Warli Art, Rangoli Patterns & Craft',
    chapters: ['Primary & Secondary Colours', '2D Shapes, Lines & Symmetry', 'Indian Folk Art (Warli & Rangoli)', 'Shading, Origami & Creative Craft']
  },
  {
    name: 'Physics',
    icon: '⚡',
    bgGradient: 'from-indigo-600 to-blue-700',
    shortCode: 'PHY',
    category: 'science',
    marathiName: 'भौतिकशास्त्र (Physics)',
    hindiName: 'भौतिक विज्ञान (Physics)',
    description: 'Laws of Motion, Gravitation, Work & Energy, Sound, Light Reflection/Refraction & Electricity',
    chapters: ['Laws of Motion & Gravitation', 'Work, Energy & Heat', 'Light: Reflection, Refraction & Lenses', 'Current Electricity & Magnetic Effects']
  },
  {
    name: 'Chemistry',
    icon: '⚗️',
    bgGradient: 'from-teal-600 to-cyan-700',
    shortCode: 'CHEM',
    category: 'science',
    marathiName: 'रसायनशास्त्र (Chemistry)',
    hindiName: 'रसायन विज्ञान (Chemistry)',
    description: 'Matter, Atomic Structure, Periodic Table, Chemical Reactions, Acids/Bases, Metallurgy & Carbon',
    chapters: ['Measurement of Matter & Periodic Table', 'Chemical Reactions & Equations', 'Acids, Bases, Salts & Metallurgy', 'Carbon Compounds & Industrial Chemistry']
  },
  {
    name: 'Biology',
    icon: '🧬',
    bgGradient: 'from-emerald-600 to-green-700',
    shortCode: 'BIO',
    category: 'science',
    marathiName: 'जीवशास्त्र (Biology)',
    hindiName: 'जीव विज्ञान (Biology)',
    description: 'Classification of Plants & Animals, Life Processes, Heredity, Microbes, Cell Biology & Biotechnology',
    chapters: ['Classification of Plants & Animals', 'Life Processes in Living Organisms', 'Heredity, Evolution & Reproduction', 'Cell Biology, Microbes & Biotechnology']
  },
  {
    name: 'Political Science',
    icon: '⚖️',
    bgGradient: 'from-slate-700 to-indigo-800',
    shortCode: 'POL',
    category: 'social',
    marathiName: 'राज्यशास्त्र (Political Science)',
    hindiName: 'राजनीति विज्ञान (Political Science)',
    description: 'Working of the Indian Constitution, Electoral Process, Political Parties, UN & Foreign Policy',
    chapters: ['Working of the Indian Constitution', 'The Electoral Process & Election Commission', 'Political Parties & Social Movements', 'India’s Foreign Policy, Defence & United Nations']
  },
  {
    name: 'Information Technology',
    icon: '🖥️',
    bgGradient: 'from-blue-600 to-cyan-600',
    shortCode: 'IT',
    category: 'skill',
    marathiName: 'माहिती तंत्रज्ञान (Information Technology)',
    hindiName: 'सूचना प्रौद्योगिकी (Information Technology)',
    description: 'HTML5 Web Development, Cyber Security & IT Act, DBMS/SQL, Networking, Cloud & AI Fundamentals',
    chapters: ['Computer Networks & Internet Protocols', 'HTML5 & CSS Web Designing', 'Database Management (DBMS & SQL)', 'Cyber Law, IT Act 2000 & Cloud Computing']
  },
  {
    name: 'Environmental Education',
    icon: '🌏',
    bgGradient: 'from-lime-600 to-emerald-700',
    shortCode: 'ENVED',
    category: 'science',
    marathiName: 'पर्यावरण शिक्षण व जलसुरक्षा',
    hindiName: 'पर्यावरण शिक्षा एवं जल सुरक्षा',
    description: 'Ecosystem Balance, Biodiversity Conservation, Water Security (Jalsuraksha), Climate & Waste Management',
    chapters: ['Ecosystems & Biodiversity Hotspots', 'Water Security (जलसुरक्षा) & Watershed Management', 'Climate Change, Pollution & Green Energy', 'Sustainable Development & Environmental Laws']
  },
  {
    name: 'Physical Education',
    icon: '🏅',
    bgGradient: 'from-orange-600 to-red-600',
    shortCode: 'PE',
    category: 'skill',
    marathiName: 'आरोग्य व शारीरिक शिक्षण',
    hindiName: 'स्वास्थ्य और शारीरिक शिक्षा',
    description: 'Physical Fitness, Yoga & Pranayama, Athletics, Indian Traditional Sports, Nutrition & First Aid',
    chapters: ['Health-Related Physical Fitness & BMI', 'Ashtanga Yoga, Asanas & Pranayama', 'Track & Field Athletics & Team Sports', 'Sports Nutrition, First Aid & Olympic Values']
  },
  {
    name: 'Mathematics – Algebra',
    icon: '➗',
    bgGradient: 'from-indigo-600 to-violet-700',
    shortCode: 'ALG',
    category: 'core',
    marathiName: 'गणित भाग १ – बीजगणित (Algebra)',
    hindiName: 'गणित भाग १ – बीजगणित (Algebra)',
    description: 'Maharashtra SSC Math Part 1: Linear Equations, Quadratic Equations, AP, GST Financial Planning & Probability',
    chapters: ['Linear Equations in Two Variables', 'Quadratic Equations & Roots', 'Arithmetic Progression (A.P.)', 'Financial Planning (GST), Probability & Statistics']
  },
  {
    name: 'Mathematics – Geometry',
    icon: '📐',
    bgGradient: 'from-blue-600 to-sky-700',
    shortCode: 'GEOM',
    category: 'core',
    marathiName: 'गणित भाग २ – भूमिती (Geometry)',
    hindiName: 'गणित भाग २ – ज्यामिति (Geometry)',
    description: 'Maharashtra SSC Math Part 2: Similarity, Pythagoras Theorem, Circles, Coordinate Geometry, Trigonometry & Mensuration',
    chapters: ['Similarity & Pythagoras Theorem', 'Circle, Tangents & Arcs', 'Coordinate Geometry & Slope', 'Trigonometry & 3D Mensuration']
  },
  // Additional Subjects for CBSE (NCERT) & ICSE (CISCE) Boards
  {
    name: 'Social Science',
    icon: '🌐',
    bgGradient: 'from-indigo-500 to-purple-700',
    shortCode: 'SOC',
    category: 'social',
    marathiName: 'सामाजिक विज्ञान (CBSE NCERT)',
    hindiName: 'सामाजिक विज्ञान (History, Geography, Civics & Economics)',
    description: 'CBSE Integrated Social Science: History, Geography, Democratic Politics (Civics) & Economics',
    chapters: ['Exploring Society & Civilisations', 'Geography: Earth, Resources & Monsoon', 'Democratic Politics & Constitutional Design', 'Sectors of Economy, Money & Credit']
  },
  {
    name: 'History & Civics',
    icon: '🏛️',
    bgGradient: 'from-amber-700 to-red-800',
    shortCode: 'HISCV',
    category: 'social',
    marathiName: 'इतिहास व नागरिकशास्त्र (ICSE)',
    hindiName: 'इतिहास एवं नागरिक शास्त्र (ICSE)',
    description: 'CISCE ICSE History & Civics: Ancient/Medieval/Modern Indian History, World Wars, UN & Union Parliament',
    chapters: ['Harappan Civilisation, Revolt of 1857 & Nationalism', 'Gandhian Era & Independence (1919–1947)', 'World Wars & The United Nations', 'Union Parliament, Executive & Supreme Court']
  },
  {
    name: 'Computer Studies',
    icon: '🖱️',
    bgGradient: 'from-cyan-600 to-teal-700',
    shortCode: 'CMPST',
    category: 'skill',
    marathiName: 'संगणक अभ्यास (ICSE Primary/Middle)',
    hindiName: 'कंप्यूटर अध्ययन (ICSE)',
    description: 'ICSE Computer Studies (Std 1–8): Hardware, Memory, Number Systems, HTML5, Spreadsheets & Coding',
    chapters: ['Hardware, Memory & Operating Systems', 'Number Systems (Binary/Hex) & Cyber Safety', 'HTML5, Spreadsheets & Databases', 'Algorithms, Flowcharts & BlueJ Java Intro']
  },
  {
    name: 'Computer Applications',
    icon: '☕',
    bgGradient: 'from-sky-600 to-indigo-800',
    shortCode: 'CMPAP',
    category: 'skill',
    marathiName: 'संगणक उपयोजन (ICSE Java OOP)',
    hindiName: 'कंप्यूटर एप्लीकेशन (Java OOP)',
    description: 'ICSE Class 9 & 10 Group III Computer Applications: Java Object-Oriented Programming, Loops, Strings & Arrays',
    chapters: ['OOP Concepts, Data Types & Operators in Java', 'Conditionals, Loops & Mathematical Library Methods', 'Classes, Constructors & Function Overloading', 'Strings, Wrapper Classes & 1D/2D Arrays']
  },
  {
    name: 'Economics',
    icon: '📊',
    bgGradient: 'from-emerald-600 to-teal-800',
    shortCode: 'ECON',
    category: 'social',
    marathiName: 'अर्थशास्त्र (Economics)',
    hindiName: 'अर्थशास्त्र (Economics)',
    description: 'Microeconomics, Factors of Production, Sectors of Indian Economy, Banking, Poverty & Consumer Awareness',
    chapters: ['Basic Concepts & Factors of Production', 'Demand, Supply & Market Structures', 'Money, Banking, Inflation & RBI Policy', 'Indian Economy, Food Security & Sustainable Growth']
  },
  {
    name: 'Commercial Studies',
    icon: '💼',
    bgGradient: 'from-amber-600 to-orange-700',
    shortCode: 'COMM',
    category: 'social',
    marathiName: 'वाणिज्य अभ्यास (ICSE Commercial Studies)',
    hindiName: 'वाणिज्यिक अध्ययन (ICSE)',
    description: 'ICSE Group II/III Commercial Studies: Stakeholders, Marketing, Final Accounts (Trading/P&L), Budgeting & Logistics',
    chapters: ['Stakeholders, E-Commerce & Marketing', 'Capital/Revenue Expenditure & Final Accounts', 'Budgeting, Banking & Insurance Instruments', 'Logistics, Industrial Relations & Consumer Protection']
  },
  {
    name: 'Sanskrit',
    icon: '📜',
    bgGradient: 'from-yellow-600 to-amber-700',
    shortCode: 'SKT',
    category: 'language',
    marathiName: 'संस्कृत (CBSE Deepakam / Ruchira)',
    hindiName: 'संस्कृत (रुचिरा / शेमुषी / दीपकम्)',
    description: 'CBSE Sanskrit Grammar & Literature: वर्णमाला, शब्द-रूप, धातु-रूप (लकार), संधि, समास एवं सुभाषितानि',
    chapters: ['संस्कृत वर्णमाला व माहेश्वर सूत्र परिचयः', 'लकार व शब्द रूपाणि (अकारांत/आकारांत)', 'संधि, उपसर्ग एवं प्रत्यय अभ्यासः', 'सुभाषितानि, समास व अनुवाद कौशलम्']
  },
  // Supplementary Curricular Enrichment Subjects (Classes 1–10 across Boards)
  {
    name: 'Environmental Awareness',
    icon: '🌿',
    bgGradient: 'from-teal-500 to-emerald-600',
    shortCode: 'ENVA',
    category: 'science',
    marathiName: 'पर्यावरण जाणीव व संवर्धन',
    hindiName: 'पर्यावरण जागरूकता',
    description: 'Ecology, Water Conservation, Waste Segregation, Clean Energy & Climate Stewardship',
    chapters: ['Our Green Friends & Clean Water', 'Waste Segregation, Biodiversity & Climate Action']
  },
  {
    name: 'Life Skills',
    icon: '🧭',
    bgGradient: 'from-violet-500 to-indigo-600',
    shortCode: 'LIFE',
    category: 'skill',
    marathiName: 'जीवन कौशल्ये',
    hindiName: 'जीवन कौशल',
    description: 'Communication, Time Management, Empathy, Personal Safety & Emotional Resilience',
    chapters: ['Self-Discipline, Time & Study Habits', 'Teamwork, Safety & Emotional Resilience']
  },
  {
    name: 'General Science Activities',
    icon: '🔭',
    bgGradient: 'from-blue-500 to-cyan-600',
    shortCode: 'GSCI',
    category: 'science',
    marathiName: 'सामान्य विज्ञान प्रयोग व उपक्रम',
    hindiName: 'सामान्य विज्ञान गतिविधियाँ',
    description: 'Hands-On Observation Labs, Everyday Physics, Kitchen Chemistry & Scientific Inquiry',
    chapters: ['Guided Home Observation Labs', 'Hands-On Inquiry & Simple Experiments']
  },
  {
    name: 'Financial Literacy & Digital Citizenship',
    icon: '💳',
    bgGradient: 'from-slate-600 to-indigo-700',
    shortCode: 'FINLIT',
    category: 'skill',
    marathiName: 'आर्थिक साक्षरता व डिजिटल नागरिकत्व',
    hindiName: 'वित्तीय साक्षरता एवं डिजिटल नागरिकता',
    description: 'Smart Saving, Budgeting, Banking Basics, Digital Privacy & Fact-Checking',
    chapters: ['Needs vs Wants, Saving & Budgeting', 'UPI Safety, Cyber Privacy & Fact-Checking']
  }
];

export const ALL_SUBJECTS_CATALOG: SubjectMetaItem[] = [
  ...CORE_14_SUBJECTS,
  ...ADDITIONAL_CLASS_SUBJECTS
];

export function getSubjectMeta(
  subject: SubjectName,
  board: EducationBoard = 'Maharashtra'
): SubjectMetaItem & {
  gradient: string;
  marathiTitle: string;
  chaptersSummary: string;
} {
  const found =
    ALL_SUBJECTS_CATALOG.find(s => s.name === subject) || {
      name: subject,
      icon: '📘',
      bgGradient: 'from-amber-500 to-orange-600',
      shortCode: subject.substring(0, 4).toUpperCase(),
      category: 'core' as const,
      marathiName: subject,
      hindiName: subject,
      description: 'Comprehensive syllabus practice across 4 difficulty levels.',
      chapters: ['Chapter 1: Foundation', 'Chapter 2: Application', 'Chapter 3: Analysis', 'Chapter 4: Mastery']
    };

  let localizedTitle = found.marathiName;
  if (board === 'CBSE') {
    localizedTitle = `${found.hindiName} • CBSE NCERT`;
  } else if (board === 'ICSE') {
    localizedTitle = `${found.name} • CISCE ICSE`;
  }

  return {
    ...found,
    gradient: found.bgGradient,
    marathiTitle: localizedTitle,
    chaptersSummary: found.description
  };
}

export function getClassCurriculumMeta(
  classLevel: ClassLevel,
  board: EducationBoard = 'Maharashtra'
): ClassMetaItem {
  const base = ALL_10_CLASSES_META.find(c => c.classLevel === classLevel) || ALL_10_CLASSES_META[0];
  if (board === 'CBSE') {
    const info = CBSE_CURRICULUM_BY_CLASS[classLevel];
    return {
      ...base,
      boardStage: info?.boardStage || `CBSE (NCERT) • ${classLevel}`,
      syllabusDescription: info?.syllabusDescription || base.syllabusDescription
    };
  }
  if (board === 'ICSE') {
    const info = ICSE_CURRICULUM_BY_CLASS[classLevel];
    return {
      ...base,
      boardStage: info?.boardStage || `ICSE (CISCE) • ${classLevel}`,
      syllabusDescription: info?.syllabusDescription || base.syllabusDescription
    };
  }
  return base;
}

export function getChaptersForBoardClassSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): string[] {
  if (board === 'CBSE') {
    const boardChapters = CBSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject];
    if (boardChapters && boardChapters.length > 0) return boardChapters;
  } else if (board === 'ICSE') {
    const boardChapters = ICSE_CURRICULUM_BY_CLASS[classLevel]?.chaptersBySubject?.[subject];
    if (boardChapters && boardChapters.length > 0) return boardChapters;
  }
  return getSubjectMeta(subject, board).chapters;
}

/**
 * Returns the exact ordered SubjectName[] list for any Board & Class (Class 1 to Class 10).
 * Preserves Maharashtra State Board lists 100% intact.
 */
export function getSubjectsForClass(
  classLevel: ClassLevel,
  board: EducationBoard = 'Maharashtra'
): SubjectName[] {
  if (board === 'CBSE') {
    return CBSE_CURRICULUM_BY_CLASS[classLevel]?.subjects || CORE_14_SUBJECTS.map(s => s.name);
  }
  if (board === 'ICSE') {
    return ICSE_CURRICULUM_BY_CLASS[classLevel]?.subjects || CORE_14_SUBJECTS.map(s => s.name);
  }

  if (classLevel === 'Class 1') {
    return [
      'Mathematics',
      'English',
      'Marathi',
      'Hindi',
      'Environmental Studies',
      'General Knowledge',
      'Drawing and Creative Activities',
      'Moral Education',
      'Vocabulary and Grammar',
      'Logical Reasoning',
      'Computer Knowledge',
      'Science',
      'Social Studies',
      'History',
      'Geography',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ];
  }

  if (classLevel === 'Class 9') {
    return [
      'Mathematics',
      'English',
      'Marathi',
      'Hindi',
      'Physics',
      'Chemistry',
      'Biology',
      'History',
      'Political Science',
      'Geography',
      'Information Technology',
      'Environmental Education',
      'Physical Education',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education',
      'Science',
      'Social Studies',
      'Computer Knowledge',
      'Environmental Studies',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ];
  }

  if (classLevel === 'Class 10') {
    return [
      'Mathematics – Algebra',
      'Mathematics – Geometry',
      'English',
      'Marathi',
      'Hindi',
      'Physics',
      'Chemistry',
      'Biology',
      'History',
      'Political Science',
      'Geography',
      'Information Technology',
      'Environmental Education',
      'Physical Education',
      'Mathematics',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education',
      'Science',
      'Social Studies',
      'Computer Knowledge',
      'Environmental Studies',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ];
  }

  // Classes 2 to 8: Preserve the exact 14 existing subjects + integrated supplementary subjects
  return [
    ...CORE_14_SUBJECTS.map(s => s.name),
    'Drawing and Creative Activities',
    'Environmental Awareness',
    'Life Skills',
    'General Science Activities',
    'Financial Literacy & Digital Citizenship'
  ];
}

export interface StandardFourLevelMeta {
  level: QuizLevel;
  title: string;
  subtitle: string;
  difficulty: string;
  diffBadge: string;
  cardGradient: string;
  description: string;
}

export const STANDARD_FOUR_LEVELS_META: StandardFourLevelMeta[] = [
  {
    level: 1,
    title: 'Level 1 – Basic',
    subtitle: 'Basic Foundation',
    difficulty: 'Basic',
    diffBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cardGradient: 'from-emerald-500 to-teal-600',
    description: '10 unique foundational questions covering core concepts, definitions, vocabulary, and visual recognition.'
  },
  {
    level: 2,
    title: 'Level 2 – Intermediate',
    subtitle: 'Concept Application',
    difficulty: 'Intermediate',
    diffBadge: 'bg-blue-100 text-blue-800 border-blue-300',
    cardGradient: 'from-blue-500 to-indigo-600',
    description: '10 completely different questions applying concepts to multi-step problems, fill-in-the-blanks, and matching.'
  },
  {
    level: 3,
    title: 'Level 3 – Advanced',
    subtitle: 'Analytical Thinking',
    difficulty: 'Advanced',
    diffBadge: 'bg-amber-100 text-amber-800 border-amber-300',
    cardGradient: 'from-amber-500 to-orange-600',
    description: '10 completely different analytical questions, word problems, statement verification, and logical deductions.'
  },
  {
    level: 4,
    title: 'Level 4 – Expert Challenge',
    subtitle: 'Higher-Order Mastery',
    difficulty: 'Expert Challenge',
    diffBadge: 'bg-purple-100 text-purple-800 border-purple-300',
    cardGradient: 'from-purple-600 to-rose-600',
    description: '10 completely different higher-order & challenging mastery questions with randomized option positions.'
  }
];
