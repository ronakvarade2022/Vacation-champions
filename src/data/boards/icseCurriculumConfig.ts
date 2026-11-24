import { ClassLevel, SubjectName } from '../../types';

export interface IcseBoardClassStageInfo {
  classLevel: ClassLevel;
  classNumber: number;
  boardStage: string;
  syllabusDescription: string;
  subjects: SubjectName[];
  chaptersBySubject: Partial<Record<SubjectName, string[]>>;
}

export const ICSE_CURRICULUM_BY_CLASS: Record<ClassLevel, IcseBoardClassStageInfo> = {
  'Class 1': {
    classLevel: 'Class 1',
    classNumber: 1,
    boardStage: 'ICSE (CISCE) • Primary Foundation (Class 1)',
    syllabusDescription: 'CISCE English Language & Literature, Number Work, EVS, Hindi, Computer Studies & Art',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Environmental Studies',
      'Computer Studies',
      'General Knowledge',
      'Drawing and Creative Activities',
      'Moral Education',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Logical Reasoning',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      English: [
        'Phonic Blends, Vowels & Sight Words',
        'Naming Words (Common & Proper Nouns)',
        'One & Many, Pronouns (He/She/It)',
        'Picture Composition & Short Story Comprehension'
      ],
      Mathematics: [
        'Numbers 1 to 100 & Place Value (Tens/Ones)',
        'Single & Two-Digit Addition and Subtraction',
        'Plane Shapes (Circle, Triangle, Rectangle, Square)',
        'Clock Reading (O’Clock) & Indian Currency Notes'
      ],
      'Environmental Studies': [
        'About Myself, Body Parts & Hygiene',
        'My Family, Neighbourhood & Good Habits',
        'Air, Water & Plant Life Around Us',
        'Domestic vs Wild Animals & Safety Rules'
      ],
      'Computer Studies': [
        'Computer: A Smart Electronic Machine',
        'Main Parts: Monitor, CPU, Keyboard & Mouse',
        'Using the Mouse & Identifying Alphabet Keys',
        'Computer Lab Etiquette & Gentle Handling'
      ]
    }
  },
  'Class 2': {
    classLevel: 'Class 2',
    classNumber: 2,
    boardStage: 'ICSE (CISCE) • Primary Stage (Class 2)',
    syllabusDescription: 'ICSE English Grammar & Literature, Mathematics up to 999, EVS, Hindi & Computer Studies',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Environmental Studies',
      'Computer Studies',
      'General Knowledge',
      'Vocabulary and Grammar',
      'Moral Education',
      'Logical Reasoning',
      'Computer Knowledge',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        '3-Digit Numbers up to 999 & Expanded Form',
        'Addition & Subtraction with Regrouping (Carry/Borrow)',
        'Multiplication Tables (2 to 10) & Equal Grouping',
        'Measuring Length (cm/m), Mass (g/kg) & Time'
      ],
      English: [
        'Adjectives (Describing Words) & Articles',
        'Verbs (Simple Present & Past) & Prepositions',
        'Punctuation (Capital Letters, Full Stop, Question Mark)',
        'Short Reading Passage & Guided Paragraph Writing'
      ],
      'Computer Studies': [
        'Types of Computers (Desktop, Laptop, Tablet)',
        'Input vs Output Devices (Scanner, Printer, Speakers)',
        'Keyboard Special Keys (Enter, Spacebar, Shift, Backspace)',
        'Introduction to MS Paint Drawing Tools'
      ]
    }
  },
  'Class 3': {
    classLevel: 'Class 3',
    classNumber: 3,
    boardStage: 'ICSE (CISCE) • Upper Primary (Class 3)',
    syllabusDescription: 'ICSE Separate Science & Social Studies Introduction, English, Mathematics, Hindi & Computer Studies',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Science',
      'Social Studies',
      'Computer Studies',
      'General Knowledge',
      'Vocabulary and Grammar',
      'Logical Reasoning',
      'Moral Education',
      'Computer Knowledge',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        '4-Digit Numbers, Place Value & Roman Numerals (I–L)',
        '4-Digit Addition, Subtraction & Multiplication by 2-Digit Numbers',
        'Basic Division with Quotient and Remainder & Fractions Intro',
        'Money Bills, Time (Quarter Past/To) & Pictographs'
      ],
      Science: [
        'Living and Non-Living Things & Parts of a Plant',
        'Human Body: Organ Systems & Respiratory Care',
        'Birds: Beaks, Claws & Nesting Habits',
        'Solids, Liquids, Gases & Properties of Air/Water'
      ],
      'Social Studies': [
        'Understanding Changes in Family & Neighbourhood',
        'Our Helpers, National Festivals & Symbols',
        'The Solar System & Globe / Continents Introduction',
        'Early Humans: Fire, Wheel & Farming'
      ],
      'Computer Studies': [
        'Hardware & Software Basics (IPO Cycle)',
        'Working with Windows Desktop, Files & Folders',
        'WordPad Text Formatting & Saving Documents',
        'Introduction to Stepwise Thinking & Scratch Intro'
      ]
    }
  },
  'Class 4': {
    classLevel: 'Class 4',
    classNumber: 4,
    boardStage: 'ICSE (CISCE) • Upper Primary (Class 4)',
    syllabusDescription: 'Factors/Multiples & Perimeter, ICSE Science, Social Studies, English Literature, Hindi & Computer Studies',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Science',
      'Social Studies',
      'Computer Studies',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education',
      'Computer Knowledge',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        '5- & 6-Digit Numbers (Indian & International Systems)',
        'Factors, Multiples, Prime Numbers & Prime Factorisation',
        'Proper, Improper & Mixed Fractions; Basic Decimals',
        'Perimeter of Squares/Rectangles & Symmetry'
      ],
      Science: [
        'Food We Eat, Nutrients & Digestive System',
        'Adaptations in Plants (Desert, Aquatic, Mountain)',
        'Force, Work & Energy Sources',
        'Solids, Liquids, Gases & Separation of Mixtures'
      ],
      'Social Studies': [
        'The Story of the Past & Calendars (BCE/CE)',
        'Physical Divisions of India (Himalayas, Plains, Deccan)',
        'Our Constitution, Fundamental Rights & Civic Duties',
        'Motions of the Earth (Rotation & Revolution)'
      ],
      'Computer Studies': [
        'Computer Memory (RAM/ROM, Bits, Bytes, KB, MB, GB)',
        'Managing Files/Folders & MS Word Editing Tools',
        'MS PowerPoint Slide Design & Formatting',
        'Safe Internet Browsing & Digital Citizenship'
      ]
    }
  },
  'Class 5': {
    classLevel: 'Class 5',
    classNumber: 5,
    boardStage: 'ICSE (CISCE) • Primary Capstone (Class 5)',
    syllabusDescription: 'Decimals, Percentages, Unitary Method, CISCE Science, Social Studies, English & Computer Studies',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Science',
      'Social Studies',
      'Computer Studies',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education',
      'Computer Knowledge',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Large Numbers, HCF/LCM & Order of Operations (BODMAS)',
        'Operations with Fractions, Decimals & Percentages',
        'Unitary Method, Profit/Loss & Average',
        'Angles (Protractor), Area, Volume of Cubes/Cuboids'
      ],
      Science: [
        'Human Circulatory & Skeletal Systems',
        'Pollination, Seed Dispersal & Vegetative Propagation',
        'Simple Machines (Levers Classes 1–3, Pulley, Inclined Plane)',
        'Light, Shadows, Solar & Lunar Eclipses'
      ],
      'Computer Studies': [
        'Evolution of Computers (Generations 1–5)',
        'Types of Software (System vs Application Software)',
        'MS Excel Spreadsheets, Tables & Basic Formulas',
        'Flowcharts, Algorithms & Scratch Event Coding'
      ]
    }
  },
  'Class 6': {
    classLevel: 'Class 6',
    classNumber: 6,
    boardStage: 'ICSE (CISCE) • Middle School (Class 6)',
    syllabusDescription: 'CISCE Bifurcated Physics, Chemistry, Biology + History & Civics + Geography + Math + Computer Studies',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Civics',
      'Geography',
      'Computer Studies',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Moral Education',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Number System, Sets (Roaster/Set-Builder) & Integers',
        'Ratio, Proportion, Unitary Method & Percentage',
        'Introduction to Algebra & Linear Equations',
        'Fundamental Geometrical Concepts, Angles & Triangles'
      ],
      Physics: [
        'Matter & Physical Quantities (SI Units of Length/Mass/Time)',
        'Force, Friction & Types of Motion',
        'Simple Machines (Efficiency & Mechanical Advantage)',
        'Light Shadows & Magnetism Properties'
      ],
      Chemistry: [
        'Introduction to Chemistry & Laboratory Apparatus',
        'Elements, Compounds, Symbols & Mixtures',
        'Pure Substances & Separation Techniques (Filtration, Distillation)',
        'Air, Oxygen, Nitrogen & Water as Universal Solvent'
      ],
      Biology: [
        'The Leaf & The Flower Structure',
        'The Cell (Plant vs Animal Cell Organelles)',
        'Human Digestive, Respiratory & Circulatory Systems',
        'Health, Hygiene & Adaptation in Habitats'
      ],
      'History & Civics': [
        'Mesopotamian, Egyptian & Indus Valley Civilisations',
        'Vedic Civilisation, Jainism & Buddhism',
        'The Mauryan & Gupta Golden Ages',
        'Rural & Urban Local Self-Government (Panchayat & Municipality)'
      ],
      Geography: [
        'Representation of Geographical Features (Maps & Scales)',
        'Landforms (Mountains, Plateaus, Plains) & Water Bodies',
        'Agriculture Types & Minerals of the World',
        'North America & South America Physical Studies'
      ],
      'Computer Studies': [
        'Computer Languages (Machine, Assembly, High-Level, 4GL)',
        'File Management, Mail Merge & MS PowerPoint Animation',
        'HTML5 Tags & Basic Web Page Structure',
        'Introduction to QBasic / Python Programming & Flowcharts'
      ]
    }
  },
  'Class 7': {
    classLevel: 'Class 7',
    classNumber: 7,
    boardStage: 'ICSE (CISCE) • Middle School (Class 7)',
    syllabusDescription: 'CISCE Class 7 Physics, Chemistry, Biology, Math (Algebra/Mensuration), History & Civics, Geography & Computers',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Civics',
      'Geography',
      'Computer Studies',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Moral Education',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Integers, Rational Numbers, Exponents & Powers',
        'Set Operations (Union, Intersection) & Algebraic Linear Equations',
        'Profit, Loss, Simple Interest & Unitary Ratio',
        'Parallel Lines, Congruence of Triangles & Perimeter/Area'
      ],
      Physics: [
        'Physical Quantities (Density & Speed)',
        'Motion, Force & Heat Transfer (Expansion & Thermometry)',
        'Reflection of Light (Plane Mirrors) & Sound Propagation',
        'Electricity Circuits (Series vs Parallel) & Electromagnetism'
      ],
      Chemistry: [
        'Physical and Chemical Changes',
        'Elements, Compounds, Atomicity & Radicals',
        'Atomic Structure, Valency & Balancing Simple Equations',
        'Metals, Non-Metals & Air/Water Chemistry'
      ],
      Biology: [
        'Plant & Animal Tissues (Meristematic, Epithelial, Nervous)',
        'Five Kingdom Classification (Monera to Animalia)',
        'Photosynthesis & Cellular Respiration',
        'Human Excretory System, Nervous System & Allergy'
      ],
      'History & Civics': [
        'Rise of Christianity & Spread of Islam',
        'The Delhi Sultanate (Slave, Khilji, Tughlaq)',
        'The Mughal Empire & Bhakti-Sufi Movements',
        'The Constitution of India & Directive Principles of State Policy'
      ],
      Geography: [
        'Topographical Maps (Contour Lines & Symbols)',
        'Atmosphere Layers & Weather Instruments',
        'Industries, Renewable Energy & Transport',
        'Europe, Africa & Antarctica Case Studies'
      ],
      'Computer Studies': [
        'Number Systems (Binary, Octal, Decimal, Hexadecimal)',
        'Computer Ethics, Malware & Cyber Security',
        'Advanced Excel Formulas, Charts & Sorting',
        'Database Concepts & Conditional Loops in Programming'
      ]
    }
  },
  'Class 8': {
    classLevel: 'Class 8',
    classNumber: 8,
    boardStage: 'ICSE (CISCE) • Pre-Board Middle Capstone (Class 8)',
    syllabusDescription: 'CISCE Class 8 Physics, Chemistry, Biology, Factorisation/Quadrilaterals, History & Civics, Geography & Java Intro',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Civics',
      'Geography',
      'Computer Studies',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Moral Education',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Rational Numbers, Exponents, Squares & Cube Roots',
        'Sets, Venn Diagrams & Algebraic Identities / Factorisation',
        'Compound Interest, Direct & Inverse Variation',
        'Quadrilaterals, Circle Theorems Intro & Surface Area/Volume'
      ],
      Physics: [
        'Matter Kinetic Theory & Archimedes Principle (Buoyancy/Density)',
        'Force, Pressure in Liquids/Gases & Turning Moment',
        'Work, Power, Energy Conservation & Heat Calorimetry',
        'Refraction of Light, Prisms & Static Electricity (Electroscope)'
      ],
      Chemistry: [
        'Matter Kinetic Model & Physical/Chemical Reactions',
        'Dalton’s Atomic Theory, Subatomic Particles & Valency',
        'Hydrogen Preparation & Properties; Water of Crystallisation',
        'Carbon Allotropes (Diamond, Graphite, Fullerene) & Oxides'
      ],
      Biology: [
        'Transport of Water & Minerals in Plants (Xylem/Phloem)',
        'Reproduction in Plants & Animals',
        'Ecosystems, Food Pyramids & Endocrine Glands',
        'Circulatory System (Heart Chambers) & First Aid'
      ],
      'History & Civics': [
        'A Period of Transition (Renaissance & Industrial Revolution)',
        'British Expansion in India & Revolt of 1857',
        'Indian National Movement (Gandhian Era & Independence)',
        'The Union Legislature (Lok Sabha/Rajya Sabha) & United Nations'
      ],
      'Computer Studies': [
        'Operating Systems & User Interfaces (GUI vs CLI)',
        'MS Excel Functions & Data Validation',
        'Algorithms, Flowcharts & Introduction to Java (BlueJ)',
        'App Development Basics & Cloud Computing Networks'
      ]
    }
  },
  'Class 9': {
    classLevel: 'Class 9',
    classNumber: 9,
    boardStage: 'ICSE (CISCE) • Secondary Board Prep (Class 9)',
    syllabusDescription: 'CISCE Group I (English, Hindi, History & Civics, Geography), Group II (Math, Physics, Chem, Bio, Economics), Group III (Java OOP, Commercial Studies)',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Civics',
      'Geography',
      'Computer Applications',
      'Economics',
      'Commercial Studies',
      'Environmental Education',
      'Physical Education',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Moral Education',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Rational & Irrational Numbers; Compound Interest Formulas',
        'Expansions, Factorisation & Simultaneous Linear Equations',
        'Triangles Congruence, Pythagoras Theorem & Rectilinear Figures',
        'Trigonometrical Ratios, Coordinate Geometry & Mensuration'
      ],
      Physics: [
        'Measurements, Vernier Callipers & Motion in One Dimension',
        'Newton’s Laws of Motion & Universal Gravitation',
        'Fluids Pressure (Pascal’s Law) & Archimedes Upthrust',
        'Heat Expansion, Light Laws, Sound Speed & Current Electricity'
      ],
      Chemistry: [
        'The Language of Chemistry (Formulas & Equation Balancing)',
        'Chemical Changes, Types of Reactions & Water Solubility',
        'Atomic Structure, Octet Rule & Chemical Bonding (Ionic/Covalent)',
        'The Periodic Table & Study of Hydrogen / Gas Laws (Boyle/Charles)'
      ],
      Biology: [
        'Cell: Unit of Life & Plant/Animal Tissues',
        'The Flower, Pollination, Fertilisation & Seed Structure',
        'Respiration in Plants & Five Kingdom Classification',
        'Nutrition, Digestive System, Skeleton & Skin Structure'
      ],
      'History & Civics': [
        'The Harappan Civilisation & Vedic Period',
        'The Mauryan Empire, Sangam Age & The Age of the Guptas',
        'Renaissance, Reformation & Industrial Revolution',
        'Salient Features of the Indian Constitution, Elections & Local Governance'
      ],
      Geography: [
        'Earth as a Planet, Latitudes, Longitudes & Earth’s Motions',
        'Structure of the Earth, Rocks, Volcanoes & Earthquakes',
        'Weathering, Atmospheric Pressure, Humidity & Winds',
        'Natural Regions of the World & Pollution'
      ],
      'Computer Applications': [
        'Introduction to Object-Oriented Programming (OOP) & Java',
        'Values, Data Types, Operators & Expressions in Java',
        'Conditional Statements (if-else, switch) & Iterative Loops (for, while)',
        'Mathematical Library Methods (Math.pow, Math.sqrt) & Computing Ethics'
      ],
      Economics: [
        'Meaning & Definition of Economics (Adam Smith, Marshall, Robbins)',
        'Basic Economic Entities & Factors of Production',
        'Primary, Secondary & Tertiary Sectors of Indian Economy',
        'Poverty, Unemployment & Food Security Reforms'
      ]
    }
  },
  'Class 10': {
    classLevel: 'Class 10',
    classNumber: 10,
    boardStage: 'ICSE Board Examination • CISCE Class 10',
    syllabusDescription: 'Official CISCE Class 10: Commercial Math (GST/Banking), Physics, Chemistry (Mole/Organic), Biology, History & Civics, Geography & Java OOP',
    subjects: [
      'English',
      'Hindi',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'History & Civics',
      'Geography',
      'Computer Applications',
      'Economics',
      'Commercial Studies',
      'Environmental Education',
      'Physical Education',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Computer Knowledge',
      'Moral Education',
      'Drawing and Creative Activities',
      'Environmental Awareness',
      'Life Skills',
      'General Science Activities',
      'Financial Literacy & Digital Citizenship'
    ],
    chaptersBySubject: {
      Mathematics: [
        'Commercial Mathematics: GST, Recurring Deposit Banking & Shares/Dividends',
        'Linear Inequations, Quadratic Equations, Ratio & Proportion, Matrices',
        'Coordinate Geometry (Section/Slope), Similarity & Circles Tangents',
        'Mensuration (Cylinder/Cone/Sphere), Trigonometry Identities & Ogive Statistics'
      ],
      Physics: [
        'Force (Torque/Moments), Work, Energy, Power & Pulley Systems',
        'Refraction of Light at Plane Surfaces, Lenses & Spectrum',
        'Sound Waves (Echo & Resonance) & Current Electricity (Ohm’s Law, House Wiring)',
        'Electromagnetism (Fleming’s Rules), Calorimetry & Radioactivity'
      ],
      Chemistry: [
        'Periodic Properties & Chemical Bonding (Electrovalent, Covalent, Coordinate)',
        'Acids, Bases, Salts & Analytical Chemistry (NaOH/NH4OH Tests)',
        'Mole Concept, Stoichiometry & Electrolysis',
        'Metallurgy (Hall-Héroult), Study of Compounds (HCl, NH3, HNO3, H2SO4) & Organic Chemistry'
      ],
      Biology: [
        'Cell Cycle, Mitosis & Genetics (Mendel’s Laws)',
        'Absorption by Roots, Transpiration & Photosynthesis',
        'Human Circulatory, Excretory, Nervous & Endocrine Systems',
        'Human Evolution, Reproductive System & Population Control'
      ],
      'History & Civics': [
        'The First War of Independence (1857) & Growth of Nationalism',
        'Gandhian Mass Movements (1919–1947) & Independence Partition',
        'First & Second World Wars, United Nations & Non-Aligned Movement',
        'The Union Parliament, President, Prime Minister & Supreme Court'
      ],
      Geography: [
        'Interpretation of Topographical Maps & Map of India',
        'Climate of India (Monsoon), Soil Resources & Natural Vegetation',
        'Water Resources (Rainwater Harvesting), Minerals & Energy',
        'Agriculture (Kharif/Rabi), Agro/Mineral Industries & Waste Management'
      ],
      'Computer Applications': [
        'Class as the Basis of All Computation & User-Defined Methods',
        'Constructors, Function Overloading & Encapsulation',
        'String Handling Methods & Wrapper Classes in Java',
        'Single & Double Dimensional Arrays (Searching & Sorting)'
      ],
      'Commercial Studies': [
        'Stakeholders in Commercial Organisations & Marketing/Advertising',
        'Capital & Revenue Expenditure, Final Accounts (Trading, P&L, Balance Sheet)',
        'Budgeting, E-Commerce, Banking & Insurance',
        'Logistics, Warehousing & Consumer Protection Act'
      ]
    }
  }
};
