import { ClassLevel, SubjectName } from '../../types';

export interface BoardClassStageInfo {
  classLevel: ClassLevel;
  classNumber: number;
  boardStage: string;
  syllabusDescription: string;
  subjects: SubjectName[];
  textbooks: Partial<Record<SubjectName, string>>;
  chaptersBySubject: Partial<Record<SubjectName, string[]>>;
}

export const CBSE_CURRICULUM_BY_CLASS: Record<ClassLevel, BoardClassStageInfo> = {
  'Class 1': {
    classLevel: 'Class 1',
    classNumber: 1,
    boardStage: 'CBSE (NCERT NCF-SE) • Foundational Stage (Class 1)',
    syllabusDescription: 'Joyful Mathematics, Mridang English, Sarangi Hindi, Environmental Readiness & General Knowledge',
    subjects: [
      'Mathematics',
      'English',
      'Hindi',
      'Environmental Studies',
      'General Knowledge',
      'Drawing and Creative Activities',
      'Moral Education',
      'Vocabulary and Grammar',
      'Computer Knowledge'
    ],
    textbooks: {
      Mathematics: 'NCERT Joyful Mathematics Class 1',
      English: 'NCERT Mridang English Class 1',
      Hindi: 'NCERT Sarangi Hindi Class 1',
      'Environmental Studies': 'NCERT World Around Us (Readiness)',
      'General Knowledge': 'CBSE Primary General Awareness'
    },
    chaptersBySubject: {
      Mathematics: [
        'Finding the Furry Cat! (Pre-number Concepts)',
        'Shapes Around Us & Counting 1 to 20',
        'Addition & Subtraction with Single-Digit Numbers',
        'Numbers 21 to 99, Money & Patterns'
      ],
      English: [
        'Two Little Hands & Greetings (Unit 1)',
        'Picture Time & Naming Words (Unit 2)',
        'The Cap-seller and the Monkeys (Story & Rhymes)',
        'Seasons, Action Words & Simple Sentences'
      ],
      Hindi: [
        'मीना का परिवार और दादा-दादी (परिवार)',
        'वर्णमाला स्वर-व्यंजन व मात्रा ज्ञान',
        'भालू ने खेली फुटबॉल व पशु-पक्षी',
        'गिनती, रंग और सरल वाक्य अभ्यास'
      ],
      'Environmental Studies': [
        'My Body, Sense Organs & Cleanliness',
        'My Family, Home & Helpers Around Us',
        'Plants, Fruits & Domestic Animals',
        'Weather, Clean Water & Road Safety'
      ],
      'General Knowledge': [
        'National Symbols of India',
        'Fruits, Flowers & Animal Homes',
        'Days of Week, Months & Seasons',
        'Good Manners & Community Helpers'
      ]
    }
  },
  'Class 2': {
    classLevel: 'Class 2',
    classNumber: 2,
    boardStage: 'CBSE (NCERT NCF-SE) • Foundational Stage (Class 2)',
    syllabusDescription: 'Joyful Mathematics, Mridang English, Sarangi Hindi, Environmental Studies & Basic Computing',
    subjects: [
      'Mathematics',
      'English',
      'Hindi',
      'Environmental Studies',
      'General Knowledge',
      'Computer Knowledge',
      'Vocabulary and Grammar',
      'Moral Education',
      'Logical Reasoning'
    ],
    textbooks: {
      Mathematics: 'NCERT Joyful Mathematics Class 2',
      English: 'NCERT Mridang English Class 2',
      Hindi: 'NCERT Sarangi Hindi Class 2',
      'Environmental Studies': 'NCERT World Around Us Level 2'
    },
    chaptersBySubject: {
      Mathematics: [
        'A Day at the Beach (Counting in Tens)',
        'Shapes Around Us & Fun with Numbers up to 100',
        'Shadow Story (2D Shapes) & Multiplication as Equal Groups',
        'Measurement of Length, Capacity & Calendar Time'
      ],
      English: [
        'My Bicycle & Picture Reading',
        'It is Fun & Seeing Without Seeing (Adjectives)',
        'The Crow, The Smart Monkey & Pronouns',
        'Little Drops of Water & Prepositions'
      ],
      Hindi: [
        'नीमा की दादी और घर का परिचय',
        'संज्ञा, लिंग, वचन व विलोम शब्द',
        'मीठा पहाड़ और तितली की कहानी',
        'ऋतुएँ, त्योहार व वाक्य निर्माण'
      ],
      'Environmental Studies': [
        'Food We Eat & Healthy Habits',
        'Types of Houses & Clothes Across Seasons',
        'Means of Transport & Traffic Signals',
        'Sun, Moon, Stars & Caring for Plants'
      ]
    }
  },
  'Class 3': {
    classLevel: 'Class 3',
    classNumber: 3,
    boardStage: 'CBSE (NCERT NCF-SE) • Preparatory Stage (Class 3)',
    syllabusDescription: 'Maths Mela, Santoor English, Veena Hindi, Our Wondrous World, Computer Knowledge & GK',
    subjects: [
      'Mathematics',
      'English',
      'Hindi',
      'Science',
      'Environmental Studies',
      'Social Studies',
      'Computer Knowledge',
      'General Knowledge',
      'Vocabulary and Grammar',
      'Logical Reasoning',
      'Moral Education'
    ],
    textbooks: {
      Mathematics: 'NCERT Maths Mela Class 3',
      English: 'NCERT Santoor English Class 3',
      Hindi: 'NCERT Veena Hindi Class 3',
      'Environmental Studies': 'NCERT Our Wondrous World Class 3'
    },
    chaptersBySubject: {
      Mathematics: [
        'What’s in a Name? & Toy Joy (3D/2D Shapes)',
        'Double Century & Vacation with My Nani Maa (Addition/Subtraction)',
        'Fun with Shapes, Fair Share (Fractions) & Grouping',
        'The Hundredth Bead, Time Goes On & Smart Charts'
      ],
      English: [
        'Colours & Badal and Moti (Tenses & Articles)',
        'Best Friends & Out in the Garden (Adverbs)',
        'The Big Laddoo & Thank God (Comprehension)',
        'Night & Chanda Mama Counts the Stars'
      ],
      Science: [
        'Living and Non-Living Things',
        'Parts of a Plant & Seed Germination',
        'States of Matter & Water Cycle',
        'Human Digestive & Breathing Organs'
      ],
      'Environmental Studies': [
        'Family and Friends — Helping Each Other',
        'Going to the Mela & Celebrating Festivals',
        'Water — A Precious Gift & Saving Every Drop',
        'Things We Make and Do — Pottery & Textiles'
      ]
    }
  },
  'Class 4': {
    classLevel: 'Class 4',
    classNumber: 4,
    boardStage: 'CBSE (NCERT NCF-SE) • Preparatory Stage (Class 4)',
    syllabusDescription: 'Maths Mela, Santoor English, Veena Hindi, Our Wondrous World, Science, SST & Reasoning',
    subjects: [
      'Mathematics',
      'English',
      'Hindi',
      'Science',
      'Environmental Studies',
      'Social Studies',
      'Computer Knowledge',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education'
    ],
    textbooks: {
      Mathematics: 'NCERT Maths Mela Class 4',
      English: 'NCERT Santoor English Class 4',
      Hindi: 'NCERT Veena Hindi Class 4'
    },
    chaptersBySubject: {
      Mathematics: [
        'Numbers up to 10,000, Place Value & Roman Numerals',
        'Multiplication & Division Algorithms',
        'Factors, Multiples & Equivalent Fractions',
        'Perimeter, Area & Symmetry in Art'
      ],
      English: [
        'Wake Up & Collective Nouns',
        'Neha’s Alarm Clock & Conjunctions',
        'Nasruddin’s Aim & Degrees of Comparison',
        'Alice in Wonderland & Story Sequencing'
      ],
      Science: [
        'Green Plants: Photosynthesis & Stomata',
        'Adaptations in Terrestrial & Aquatic Animals',
        'Force, Work & Simple Machines',
        'Teeth Types, Microbes & Balanced Diet'
      ]
    }
  },
  'Class 5': {
    classLevel: 'Class 5',
    classNumber: 5,
    boardStage: 'CBSE (NCERT NCF-SE) • Preparatory Stage Bridge (Class 5)',
    syllabusDescription: 'Fractions, Decimals, Angles, NCERT EVS/Science, Social Studies, English, Hindi & Coding Basics',
    subjects: [
      'Mathematics',
      'English',
      'Hindi',
      'Science',
      'Environmental Studies',
      'Social Studies',
      'Computer Knowledge',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar',
      'Moral Education'
    ],
    textbooks: {
      Mathematics: 'NCERT Maths Mela / Math-Magic Class 5',
      English: 'NCERT Santoor / Marigold Class 5',
      Science: 'NCERT Super Senses & Experiments'
    },
    chaptersBySubject: {
      Mathematics: [
        'The Fish Tale (Large Numbers — Lakhs & Crores)',
        'Shapes and Angles (Acute, Right, Obtuse)',
        'Parts and Wholes (Fractions & Decimals)',
        'Area, Perimeter, Volume & Data Handling'
      ],
      English: [
        'Wonderful Waste! & Phrasal Verbs',
        'Teamwork & Active-Passive Intro',
        'Robinson Crusoe & Reported Speech',
        'The Little Bully & Paragraph Cohesion'
      ],
      Science: [
        'Super Senses in Animals & Seed Dispersal',
        'Simple Machines, Levers & Pulleys',
        'States of Matter, Solubility & Floating/Sinking',
        'Space Exploration, Sunita in Space & Atmosphere'
      ]
    }
  },
  'Class 6': {
    classLevel: 'Class 6',
    classNumber: 6,
    boardStage: 'CBSE (NCERT NCF-SE) • Middle Stage (Class 6)',
    syllabusDescription: 'Ganita Prakash, Curiosity Science, Exploring Society (Social Science), Poorvi English, Malhar Hindi & Sanskrit',
    subjects: [
      'Mathematics',
      'Science',
      'Social Science',
      'English',
      'Hindi',
      'Sanskrit',
      'History',
      'Geography',
      'Computer Knowledge',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar'
    ],
    textbooks: {
      Mathematics: 'NCERT Ganita Prakash Class 6',
      Science: 'NCERT Curiosity Class 6',
      'Social Science': 'NCERT Exploring Society: India and Beyond Class 6',
      English: 'NCERT Poorvi Class 6',
      Hindi: 'NCERT Malhar Class 6',
      Sanskrit: 'NCERT Deepakam Class 6'
    },
    chaptersBySubject: {
      Mathematics: [
        'Patterns in Mathematics & Lines and Angles',
        'Number Play, Data Handling & Prime Time (HCF/LCM)',
        'Perimeter, Area & Fractions',
        'Playing with Constructions & Symmetry'
      ],
      Science: [
        'The Wonderful World of Science & Diversity in Living World',
        'Mindful Eating: A Path to a Healthy Body',
        'Exploring Magnets & Measurement of Length and Motion',
        'Temperature, States of Water & Beyond Earth'
      ],
      'Social Science': [
        'Locating Places on the Earth & Oceans and Continents',
        'Timeline, Sources of History & Beginnings of Indian Civilisation (Harappa)',
        'India’s Cultural Roots & Unity in Diversity',
        'Governance, Grassroots Democracy & Value of Work'
      ],
      English: [
        'A Bottle of Dew & The Raven and the Fox',
        'Fables, Folk Tales & Direct-Indirect Narration',
        'Nurturing Nature & Spices that Heal Us',
        'Sports, Wellness & Formal Letter Writing'
      ],
      Sanskrit: [
        'संस्कृत वर्णमाला व माहेश्वर सूत्र परिचयः',
        'लट् लकारः (वर्तमान काल) व शब्द रूपाणि (बालक/लता)',
        'सुभाषितानि व संख्या ज्ञानम् (१–५०)',
        'संधि परिचयः व सरल अनुवाद अभ्यासः'
      ]
    }
  },
  'Class 7': {
    classLevel: 'Class 7',
    classNumber: 7,
    boardStage: 'CBSE (NCERT NCF-SE) • Middle Stage (Class 7)',
    syllabusDescription: 'Integers, Algebraic Expressions, NCERT Science, Social Science (History/Geography/Civics), English & Hindi',
    subjects: [
      'Mathematics',
      'Science',
      'Social Science',
      'English',
      'Hindi',
      'Sanskrit',
      'History',
      'Geography',
      'Computer Knowledge',
      'General Knowledge',
      'Logical Reasoning',
      'Vocabulary and Grammar'
    ],
    textbooks: {
      Mathematics: 'NCERT Mathematics Class 7',
      Science: 'NCERT Science Class 7',
      'Social Science': 'NCERT Our Pasts II, Our Environment & Social Life II',
      English: 'NCERT Honeycomb Class 7',
      Hindi: 'NCERT Vasant Bhag 2'
    },
    chaptersBySubject: {
      Mathematics: [
        'Integers, Fractions & Decimals',
        'Simple Equations, Lines & Angles',
        'The Triangle and Its Properties & Congruence',
        'Comparing Quantities (Percentage, Profit/Loss, Simple Interest) & Exponents'
      ],
      Science: [
        'Nutrition in Plants & Animals',
        'Heat Transfer (Conduction, Convection, Radiation)',
        'Acids, Bases and Salts & Physical/Chemical Changes',
        'Electric Current and Its Effects & Light Lenses'
      ],
      'Social Science': [
        'Medieval Indian Kingdoms: Cholas & Delhi Sultanate',
        'Mughal Empire & Administrative Reforms',
        'Inside Our Earth, Atmosphere & Ocean Currents',
        'State Government, Media & Gender Equality'
      ]
    }
  },
  'Class 8': {
    classLevel: 'Class 8',
    classNumber: 8,
    boardStage: 'CBSE (NCERT) • Middle Stage Capstone (Class 8)',
    syllabusDescription: 'Rational Numbers, Factorisation, Mensuration, NCERT Science, Modern Indian History, Resources & Civics',
    subjects: [
      'Mathematics',
      'Science',
      'Social Science',
      'English',
      'Hindi',
      'Sanskrit',
      'History',
      'Geography',
      'Computer Knowledge',
      'Logical Reasoning',
      'General Knowledge',
      'Vocabulary and Grammar'
    ],
    textbooks: {
      Mathematics: 'NCERT Mathematics Class 8',
      Science: 'NCERT Science Class 8',
      'Social Science': 'NCERT Our Pasts III, Resources & Development, Social and Political Life III',
      English: 'NCERT Honeydew Class 8'
    },
    chaptersBySubject: {
      Mathematics: [
        'Rational Numbers & Linear Equations in One Variable',
        'Understanding Quadrilaterals, Squares & Cube Roots',
        'Algebraic Expressions, Identities & Factorisation',
        'Mensuration (Cylinder/Cuboid), Direct & Inverse Proportions'
      ],
      Science: [
        'Crop Production, Microorganisms: Friend and Foe',
        'Combustion & Flame, Coal and Petroleum',
        'Force, Pressure, Friction & Sound Waves',
        'Chemical Effects of Electric Current, Light & Human Eye'
      ],
      'Social Science': [
        'From Trade to Territory & The Revolt of 1857',
        'Making of the National Movement (1870s–1947)',
        'Land, Soil, Water, Minerals & Agriculture Resources',
        'The Indian Constitution, Secularism & Parliament'
      ]
    }
  },
  'Class 9': {
    classLevel: 'Class 9',
    classNumber: 9,
    boardStage: 'CBSE (NCERT) • Secondary Stage (Class 9)',
    syllabusDescription: 'NCERT Mathematics, Integrated Science + Physics/Chemistry/Biology, Social Science, English Beehive, Hindi & IT',
    subjects: [
      'Mathematics',
      'Science',
      'Physics',
      'Chemistry',
      'Biology',
      'Social Science',
      'History',
      'Geography',
      'Political Science',
      'Economics',
      'English',
      'Hindi',
      'Sanskrit',
      'Information Technology'
    ],
    textbooks: {
      Mathematics: 'NCERT Mathematics Class 9',
      Science: 'NCERT Science Class 9',
      'Social Science': 'NCERT India & Contemporary World I, Contemporary India I, Democratic Politics I, Economics',
      English: 'NCERT Beehive & Moments Class 9',
      Hindi: 'NCERT Kshitij Bhag 1 / Sparsh Bhag 1'
    },
    chaptersBySubject: {
      Mathematics: [
        'Number Systems (Irrationals & Real Numbers) & Polynomials',
        'Coordinate Geometry & Linear Equations in Two Variables',
        'Triangles, Quadrilaterals & Circles Theorems',
        'Heron’s Formula, Surface Areas & Volumes (Cone/Sphere)'
      ],
      Science: [
        'Matter in Our Surroundings & Atoms and Molecules',
        'The Fundamental Unit of Life & Tissues',
        'Motion, Force & Laws of Motion, Gravitation',
        'Work, Energy & Sound Waves'
      ],
      'Social Science': [
        'The French Revolution & Socialism in Europe',
        'India: Size, Location, Physical Features & Drainage',
        'What is Democracy?, Constitutional Design & Electoral Politics',
        'People as Resource & Poverty as a Challenge'
      ]
    }
  },
  'Class 10': {
    classLevel: 'Class 10',
    classNumber: 10,
    boardStage: 'CBSE Board Examination • Class 10 (AISSE)',
    syllabusDescription: 'CBSE Board Class 10: NCERT Math, Science (Physics/Chem/Bio), Social Science, English First Flight, Hindi & IT',
    subjects: [
      'Mathematics',
      'Science',
      'Physics',
      'Chemistry',
      'Biology',
      'Social Science',
      'History',
      'Geography',
      'Political Science',
      'Economics',
      'English',
      'Hindi',
      'Sanskrit',
      'Information Technology'
    ],
    textbooks: {
      Mathematics: 'NCERT Mathematics Class 10',
      Science: 'NCERT Science Class 10 (CBSE Board)',
      'Social Science': 'NCERT Class 10 History, Geography, Civics & Economics',
      English: 'NCERT First Flight & Footprints Without Feet',
      Hindi: 'NCERT Kshitij Bhag 2 / Sparsh Bhag 2'
    },
    chaptersBySubject: {
      Mathematics: [
        'Real Numbers (Fundamental Theorem), Polynomials & Pair of Linear Equations',
        'Quadratic Equations & Arithmetic Progressions',
        'Triangles (BPT / Thales), Coordinate Geometry & Trigonometry Identities',
        'Circles, Surface Areas & Volumes, Statistics & Probability'
      ],
      Science: [
        'Chemical Reactions, Acids-Bases-Salts, Metals & Carbon Compounds',
        'Life Processes, Control-Coordination & Heredity',
        'Light: Reflection & Refraction, The Human Eye & Dispersion',
        'Electricity (Ohm’s Law), Magnetic Effects & Our Environment'
      ],
      'Social Science': [
        'Nationalism in Europe & Nationalism in India',
        'Resources & Development, Agriculture & Manufacturing Industries',
        'Power Sharing, Federalism & Political Parties',
        'Sectors of Indian Economy, Money & Credit, Globalisation'
      ]
    }
  }
};
