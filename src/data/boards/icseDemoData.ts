import { ClassLevel } from '../../types';
import type { ClassDemoQuestion } from '../demoQuestionsData';
import type { DemoWorksheetSpec } from '../classDemoWorksheetsData';

/**
 * Strictly 2 unique, CISCE-aligned ICSE demo questions per class (Class 1 to Class 10).
 * Zero overlap with Maharashtra or CBSE demo questions.
 */
export const ICSE_DEMO_QUESTIONS_BY_CLASS: Record<
  ClassLevel,
  readonly [ClassDemoQuestion, ClassDemoQuestion]
> = {
  'Class 1': [
    {
      id: 'demo-icse-c1-q1',
      classLevel: 'Class 1',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'ICSE Number Work • Descending Order',
      question:
        'In ICSE Class 1 Number Work, arrange these toy scores from biggest to smallest: 19, 32, 25.',
      options: [
        '19, 25, 32',
        '32, 25, 19',
        '25, 32, 19',
        '32, 19, 25'
      ],
      correctIndex: 1,
      explanation: '32 is largest, followed by 25, then 19 (32 > 25 > 19).'
    },
    {
      id: 'demo-icse-c1-q2',
      classLevel: 'Class 1',
      board: 'ICSE',
      subject: 'English',
      topic: 'CISCE English • Describing Words',
      question:
        'Pick the describing word (adjective) in this sentence: "Mira drew a bright rainbow."',
      options: ['Mira', 'drew', 'bright', 'rainbow'],
      correctIndex: 2,
      explanation: '"Bright" describes the noun "rainbow", making it an adjective.'
    }
  ],
  'Class 2': [
    {
      id: 'demo-icse-c2-q1',
      classLevel: 'Class 2',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: '3-Digit Subtraction & Regrouping',
      question:
        'A baker baked 245 cupcakes and sold 120 in the morning. How many cupcakes are still on the tray?',
      options: ['115', '125', '135', '365'],
      correctIndex: 1,
      explanation: '245 − 120 = 125 cupcakes remaining.'
    },
    {
      id: 'demo-icse-c2-q2',
      classLevel: 'Class 2',
      board: 'ICSE',
      subject: 'General Knowledge',
      topic: 'Computer Studies & Festivals',
      question:
        'Which glowing device attached to a desktop computer displays your painted pictures and text on a screen?',
      options: ['Keyboard', 'Monitor', 'Printer ink bottle', 'Mouse pad'],
      correctIndex: 1,
      explanation: 'A monitor is a visual output device resembling a television screen.'
    }
  ],
  'Class 3': [
    {
      id: 'demo-icse-c3-q1',
      classLevel: 'Class 3',
      board: 'ICSE',
      subject: 'Science',
      topic: 'ICSE Science • Nesting Birds',
      question:
        'Which bird uses its sharp chisel-like beak to peck hollows directly into solid tree trunks for nesting?',
      options: ['Pelican', 'Woodpecker', 'Flamingo', 'Sparrow'],
      correctIndex: 1,
      explanation: 'A woodpecker has a strong chisel beak designed for drilling into tree bark and wood.'
    },
    {
      id: 'demo-icse-c3-q2',
      classLevel: 'Class 3',
      board: 'ICSE',
      subject: 'English',
      topic: 'CISCE Grammar • Apostrophe of Possession',
      question:
        'Which phrase correctly uses an apostrophe to show that the bat belongs to Kabir?',
      options: [
        'Kabirs bat',
        'Kabir’s bat',
        'Kabirs’s bat',
        'Kabir bat’s'
      ],
      correctIndex: 1,
      explanation: 'Singular possession adds ’s to the owner’s name: Kabir’s bat.'
    }
  ],
  'Class 4': [
    {
      id: 'demo-icse-c4-q1',
      classLevel: 'Class 4',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'CISCE Math • International Number System',
      question:
        'In the International System of Numeration, how many thousands make one million (1,000,000)?',
      options: ['100', '1,000', '10,000', '10'],
      correctIndex: 1,
      explanation: '1,000 × 1,000 = 1,000,000 (one thousand thousands).'
    },
    {
      id: 'demo-icse-c4-q2',
      classLevel: 'Class 4',
      board: 'ICSE',
      subject: 'Science',
      topic: 'Digestive Organs',
      question:
        'In which muscular bag-like organ does chewed food churn with acidic digestive juices after travelling down the food pipe?',
      options: ['Large intestine', 'Stomach', 'Windpipe', 'Gall bladder'],
      correctIndex: 1,
      explanation: 'The stomach mixes food with gastric juices and hydrochloric acid to begin protein digestion.'
    }
  ],
  'Class 5': [
    {
      id: 'demo-icse-c5-q1',
      classLevel: 'Class 5',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'Order of Operations (BODMAS)',
      question:
        'Evaluate using CISCE BODMAS rules: 24 − 12 ÷ 3 + 5',
      options: ['9', '25', '21', '15'],
      correctIndex: 1,
      explanation: 'Divide first: 12 ÷ 3 = 4. Then 24 − 4 + 5 = 25.'
    },
    {
      id: 'demo-icse-c5-q2',
      classLevel: 'Class 5',
      board: 'ICSE',
      subject: 'General Knowledge',
      topic: 'Human Skeletal System & Heritage',
      question:
        'Which bony protective cage inside our upper chest safeguards the heart and both lungs?',
      options: ['Pelvic girdle', 'Ribcage', 'Femur bone', 'Kneecap'],
      correctIndex: 1,
      explanation: 'Twelve pairs of curved ribs form the ribcage around heart and lungs.'
    }
  ],
  'Class 6': [
    {
      id: 'demo-icse-c6-q1',
      classLevel: 'Class 6',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'CISCE Sets • Cardinal Number',
      question:
        'If Set A = {2, 4, 6, 8, 10, 12}, what is the cardinal number n(A) of Set A?',
      options: ['5', '6', '10', '12'],
      correctIndex: 1,
      explanation: 'The cardinal number n(A) counts distinct elements in the set: 6 elements.'
    },
    {
      id: 'demo-icse-c6-q2',
      classLevel: 'Class 6',
      board: 'ICSE',
      subject: 'Science',
      topic: 'ICSE Chemistry • Separating Mixtures',
      question:
        'Which laboratory method separates pure water from dissolved sea salt by boiling and re-cooling the vapour?',
      options: ['Winnowing', 'Distillation', 'Sieving', 'Magnetic separation'],
      correctIndex: 1,
      explanation: 'Distillation vaporises pure water and condenses it back into a clean receiver flask.'
    }
  ],
  'Class 7': [
    {
      id: 'demo-icse-c7-q1',
      classLevel: 'Class 7',
      board: 'ICSE',
      subject: 'Science',
      topic: 'ICSE Physics • Density Calculation',
      question:
        'An iron block has a mass of 390 g and occupies a volume of 50 cm³. Calculate its density.',
      options: ['5.2 g/cm³', '7.8 g/cm³', '19.5 g/cm³', '4.0 g/cm³'],
      correctIndex: 1,
      explanation: 'Density = Mass / Volume = 390 g / 50 cm³ = 7.8 g/cm³.'
    },
    {
      id: 'demo-icse-c7-q2',
      classLevel: 'Class 7',
      board: 'ICSE',
      subject: 'English',
      topic: 'CISCE Grammar • Phrasal Prepositions',
      question:
        'Fill in the blank: "The captain refused to give ___ to harsh winter storms."',
      options: ['in', 'up off', 'away on', 'out at'],
      correctIndex: 0,
      explanation: '"Give in to" means surrender or yield to pressure.'
    }
  ],
  'Class 8': [
    {
      id: 'demo-icse-c8-q1',
      classLevel: 'Class 8',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'ICSE Math • Venn Diagrams & Identities',
      question:
        'Expand the algebraic product using CISCE identities: (3x − 4)² =',
      options: [
        '9x² − 16',
        '9x² − 24x + 16',
        '9x² + 24x + 16',
        '3x² − 12x + 16'
      ],
      correctIndex: 1,
      explanation: '(a − b)² = a² − 2ab + b² = 9x² − 2(3x)(4) + 16 = 9x² − 24x + 16.'
    },
    {
      id: 'demo-icse-c8-q2',
      classLevel: 'Class 8',
      board: 'ICSE',
      subject: 'General Knowledge',
      topic: 'ICSE Computer Studies • Number Systems',
      question:
        'What is the decimal equivalent of the binary number (10110)₂ in ICSE Computer Studies?',
      options: ['18', '20', '22', '26'],
      correctIndex: 2,
      explanation: '(1×16) + (0×8) + (1×4) + (1×2) + (0×1) = 16 + 4 + 2 = 22.'
    }
  ],
  'Class 9': [
    {
      id: 'demo-icse-c9-q1',
      classLevel: 'Class 9',
      board: 'ICSE',
      subject: 'Science',
      topic: 'ICSE Physics • Vernier Callipers & Sound',
      question:
        'Using Pascal’s Law in an ICSE Class 9 hydraulic press, if pressure applied at a small piston is 400 Pa, what pressure is transmitted throughout the enclosed incompressible fluid?',
      options: ['200 Pa', '400 Pa', '800 Pa', '0 Pa'],
      correctIndex: 1,
      explanation: 'Pascal’s Law states external pressure applied to an enclosed fluid is transmitted equally undiminished in all directions (400 Pa).'
    },
    {
      id: 'demo-icse-c9-q2',
      classLevel: 'Class 9',
      board: 'ICSE',
      subject: 'English',
      topic: 'ICSE Synthesis • No Sooner...Than',
      question:
        'Rewrite properly using "No sooner... than": "As soon as the referee blew the whistle, the match began."',
      options: [
        'No sooner did the referee blew the whistle than the match began.',
        'No sooner did the referee blow the whistle than the match began.',
        'No sooner had the referee blow the whistle when the match began.',
        'No sooner the referee blew the whistle then the match began.'
      ],
      correctIndex: 1,
      explanation: '"No sooner did + subject + base verb (blow)... than" is the required CISCE synthesis pattern.'
    }
  ],
  'Class 10': [
    {
      id: 'demo-icse-c10-q1',
      classLevel: 'Class 10',
      board: 'ICSE',
      subject: 'Mathematics',
      topic: 'ICSE Board • Commercial Math (GST)',
      question:
        'An educational tablet listed at ₹12,000 is sold intrastate with 18% GST. How much CGST (9%) does the buyer pay?',
      options: ['₹540', '₹1,080', '₹2,160', '₹1,200'],
      correctIndex: 1,
      explanation: 'For intrastate supply, 18% GST splits equally into 9% CGST + 9% SGST. 9% of ₹12,000 = ₹1,080.'
    },
    {
      id: 'demo-icse-c10-q2',
      classLevel: 'Class 10',
      board: 'ICSE',
      subject: 'Science',
      topic: 'ICSE Chemistry • Analytical Tests',
      question:
        'In ICSE Class 10 Analytical Chemistry, which coloured precipitate forms when NaOH solution is added to copper(II) sulphate (CuSO₄)?',
      options: [
        'Reddish-brown gelatinous precipitate',
        'Pale blue insoluble precipitate of Cu(OH)₂',
        'Dirty green precipitate',
        'Chalky white precipitate soluble in excess water'
      ],
      correctIndex: 1,
      explanation: 'Cu²⁺ ions react with NaOH to give a pale blue precipitate of copper(II) hydroxide, insoluble in excess NaOH.'
    }
  ]
};

/**
 * Strictly 4 unique ICSE Demo Worksheets per class (Class 1 to Class 10 = 40 total worksheets).
 * Every question prompt is unique across all classes and boards.
 */
export const ICSE_DEMO_WORKSHEETS_BANK: Record<
  ClassLevel,
  readonly [DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec]
> = {
  'Class 1': [
    {
      subject: 'Mathematics',
      chapterName: 'CISCE Class 1 • Number Work up to 100 & Shapes',
      marathiSubtitle: 'ICSE Class 1 • Mathematics Practice Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Counting Tens',
          prompt: 'How many tens make the number 70?',
          options: ['5 tens', '6 tens', '7 tens', '8 tens'],
          correctIndex: 2,
          explanation: '7 × 10 = 70, so there are 7 tens.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Addition on Number Line',
          prompt: 'Start at 9 on a number line and jump 5 steps right. Where do you land?',
          options: ['12', '13', '14', '15'],
          correctIndex: 2,
          explanation: '9 + 5 = 14.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Geometry',
          prompt: 'How many corners (vertices) does a standard triangle have?',
          options: ['2', '3', '4', '5'],
          correctIndex: 1,
          explanation: 'A triangle has 3 straight sides and 3 corners.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Word Subtraction',
          prompt: 'Ananya picked 16 daisies and gave 5 to her teacher. How many daisies remained?',
          options: ['9', '10', '11', '12'],
          correctIndex: 2,
          explanation: '16 − 5 = 11 daisies.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Clock Time',
          prompt: 'When the long minute hand points at 12 and short hour hand points at 4, the clock reads 4 o’clock.',
          options: ['True', 'False', 'Reads 12 o’clock', 'Reads half past 4'],
          correctIndex: 0,
          explanation: 'Minute hand at 12 means the start of the hour shown by the hour hand.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'CISCE Class 1 • Nouns, Plurals & Vowel Sounds',
      marathiSubtitle: 'ICSE Class 1 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Proper vs Common Nouns',
          prompt: 'Which word in "Toby chased a red ball" is a proper noun?',
          options: ['Toby', 'chased', 'red', 'ball'],
          correctIndex: 0,
          explanation: 'Toby is the specific name of a pet, so it starts with a capital letter.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Use of Is / Are',
          prompt: 'Select the right helping verb: "Three kittens ___ sleeping inside the basket."',
          options: ['is', 'am', 'are', 'was'],
          correctIndex: 2,
          explanation: 'Plural noun "Three kittens" takes "are".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Opposite Pairs',
          prompt: 'Pick the antonym (opposite) of "EARLY":',
          options: ['Fast', 'Late', 'Soon', 'High'],
          correctIndex: 1,
          explanation: 'Late is the opposite of early.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Consonant Blends',
          prompt: 'Which word starts with the "ch-" sound like in "chair"?',
          options: ['Ship', 'Cherry', 'Thumb', 'Phone'],
          correctIndex: 1,
          explanation: 'Cherry starts with the digraph "ch-".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Pronouns',
          prompt: 'We use "It" when talking about non-living things like a pencil or a toy train.',
          options: ['True', 'False', 'We use She for pencils', 'We use We for one pencil'],
          correctIndex: 0,
          explanation: '"It" is used for animals (non-pet) and non-living things.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'CISCE Class 1 • Food, Hygiene & Safety Rules',
      marathiSubtitle: 'ICSE Class 1 • EVS & Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Sense Organs',
          prompt: 'Which sense organ inside our mouth helps us taste whether soup is salty or sweet?',
          options: ['Teeth', 'Tongue', 'Lips', 'Nose'],
          correctIndex: 1,
          explanation: 'Taste buds on the tongue detect sweet, salty, sour, and bitter flavours.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Road Safety',
          prompt: 'Where should pedestrians walk safely while crossing a busy city road?',
          options: [
            'Across zebra crossing stripes',
            'In the middle lane of buses',
            'Over road dividers while running',
            'Blindfolded'
          ],
          correctIndex: 0,
          explanation: 'Zebra crossings are black-and-white stripes marked safely for pedestrians.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Uses of Water',
          prompt: 'Green garden plants stay fresh when watered at their ___.',
          options: ['petals', 'roots', 'seeds', 'thorns'],
          correctIndex: 1,
          explanation: 'Water poured onto soil is absorbed by plant roots.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Personal Hygiene',
          prompt: 'Brushing teeth twice daily—morning and before bed—prevents tooth cavities.',
          options: ['True', 'False', 'Brushing weekly is enough', 'Candies clean teeth'],
          correctIndex: 0,
          explanation: 'Brushing twice a day removes plaque and sugar residue.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Parts of a Tree',
          prompt: 'Which thick woody part supports branches and leaves high above the ground?',
          options: ['Trunk', 'Bud', 'Fruit', 'Root hair'],
          correctIndex: 0,
          explanation: 'A tree’s main stem is called its trunk.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CISCE Class 1 • Computer Parts & World Around Us',
      marathiSubtitle: 'ICSE Class 1 • GK & Computer Studies Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Computer Brain',
          prompt: 'Which main unit of a computer is called its "Brain" because it does all thinking and calculating?',
          options: ['CPU (Central Processing Unit)', 'Speaker', 'Scanner', 'Joystick'],
          correctIndex: 0,
          explanation: 'The CPU processes instructions and is known as the brain of the computer.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Months of Year',
          prompt: 'The twelfth and final month of the English calendar year is ___.',
          options: ['October', 'November', 'December', 'January'],
          correctIndex: 2,
          explanation: 'December is the 12th month.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Heritage',
          prompt: 'Which animal is celebrated as the National Heritage Animal of India?',
          options: ['Zebra', 'Indian Elephant', 'Giraffe', 'Kangaroo'],
          correctIndex: 1,
          explanation: 'The Indian Elephant is India’s National Heritage Animal.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Community Helpers',
          prompt: 'Who bakes fresh loaves of bread, buns, and birthday cakes?',
          options: ['Barber', 'Baker', 'Postman', 'Gardener'],
          correctIndex: 1,
          explanation: 'A baker prepares bread and pastries.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Compass Directions',
          prompt: 'If you stand facing the rising Sun in the morning, East is directly in front of you.',
          options: ['True', 'False', 'West is in front', 'North is in front'],
          correctIndex: 0,
          explanation: 'The Sun rises in the East.'
        }
      ]
    }
  ],
  'Class 2': [
    {
      subject: 'Mathematics',
      chapterName: 'CISCE Class 2 • Place Value to 999 & Multiplication Tables',
      marathiSubtitle: 'ICSE Class 2 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: '3-Digit Comparison',
          prompt: 'Choose the smallest 3-digit odd number formed using digits 5, 2, 8 once:',
          options: ['258', '285', '528', '582'],
          correctIndex: 1,
          explanation: 'An odd number must end in 5; putting the smallest remaining digit 2 in hundreds place gives 285.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Multiplication Table',
          prompt: 'Fill in: 8 boxes with 6 chalk pieces each contain ___ chalk pieces.',
          options: ['42', '48', '54', '56'],
          correctIndex: 1,
          explanation: '8 × 6 = 48.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Mass Measurement',
          prompt: 'Which standard metric unit is best for weighing a heavy sack of wheat grain?',
          options: ['Litres', 'Kilograms (kg)', 'Centimetres', 'Minutes'],
          correctIndex: 1,
          explanation: 'Heavy weights are measured in kilograms (kg).'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Equal Division',
          prompt: 'Share 36 cherries equally among 4 bowls. How many cherries go into each bowl?',
          options: ['7', '8', '9', '10'],
          correctIndex: 2,
          explanation: '36 ÷ 4 = 9 cherries per bowl.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Odd vs Even Sum',
          prompt: 'What kind of number do you always get when you add two EVEN numbers like 14 + 22?',
          options: ['Always Odd', 'Always Even', 'Always Prime', 'Zero'],
          correctIndex: 1,
          explanation: 'Even + Even = Even (14 + 22 = 36).'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'CISCE Class 2 • Verbs, Punctuation & Compound Words',
      marathiSubtitle: 'ICSE Class 2 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Compound Words',
          prompt: 'Combine two small words to form a single compound word meaning a flower that faces sunlight:',
          options: ['Sunmoon', 'Sunflower', 'Starflower', 'Rainflower'],
          correctIndex: 1,
          explanation: 'Sun + flower = sunflower.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Punctuation Marks',
          prompt: 'Which punctuation mark belongs at the end of: "Where did I keep my water bottle___"',
          options: ['Full stop (.)', 'Question mark (?)', 'Comma (,)', 'Apostrophe (’)'],
          correctIndex: 1,
          explanation: 'Interrogative questions end with a question mark (?).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Irregular Plurals',
          prompt: 'One mouse ran past the cupboard; three ___ ran behind it.',
          options: ['mouses', 'mice', 'mices', 'mouse'],
          correctIndex: 1,
          explanation: 'The irregular plural of mouse is "mice".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Prepositions',
          prompt: 'Pick the right preposition: "Birds build cosy nests ___ high tree branches."',
          options: ['on', 'between', 'into', 'below'],
          correctIndex: 0,
          explanation: 'Nests rest "on" tree branches.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Alphabetical Order',
          prompt: 'In dictionary alphabetical order, the word "Apple" appears before "Apricot".',
          options: ['True', 'False', 'Apricot comes first', 'Only capitals count'],
          correctIndex: 0,
          explanation: 'Comparing the third letters: A-p-p precedes A-p-r.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'CISCE Class 2 • Minerals, Skeleton & Plant Uses',
      marathiSubtitle: 'ICSE Class 2 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Rocks & Minerals',
          prompt: 'Which soft dark mineral is mixed with clay inside wooden pencil leads?',
          options: ['Diamond', 'Graphite', 'Quartz', 'Marble'],
          correctIndex: 1,
          explanation: 'Pencil "lead" is actually smooth dark graphite.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Bones & Muscles',
          prompt: 'How many bones make up the full adult human skeleton?',
          options: ['106', '206', '306', '406'],
          correctIndex: 1,
          explanation: 'An adult human skeleton has 206 bones.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Medicinal Plants',
          prompt: 'Leaves of the sacred ___ (Holy Basil) plant are brewed in warm tea for soothing colds.',
          options: ['Cactus', 'Tulsi', 'Pine', 'Bamboo'],
          correctIndex: 1,
          explanation: 'Tulsi has antimicrobial soothing properties.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Shadow Formation',
          prompt: 'Shadows always fall on the opposite side of the light source illuminating an opaque object.',
          options: ['True', 'False', 'Shadows glow green', 'Transparent glass casts dark shadow'],
          correctIndex: 0,
          explanation: 'An opaque object blocks light rays behind it, away from the source.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Water Cycle Intro',
          prompt: 'Wet laundry dries faster on a sunny windy afternoon because water changes into vapour by:',
          options: ['Freezing', 'Evaporation', 'Melting', 'Condensation'],
          correctIndex: 1,
          explanation: 'Heat and moving wind accelerate liquid water evaporating into gas.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CISCE Class 2 • Computers, Wonders & Sports',
      marathiSubtitle: 'ICSE Class 2 • GK & Computers Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Keyboard Special Keys',
          prompt: 'Which longest horizontal bar key at the bottom of a computer keyboard inserts a blank gap between words?',
          options: ['Caps Lock', 'Spacebar', 'Esc key', 'Tab key'],
          correctIndex: 1,
          explanation: 'The Spacebar inserts spaces between typed words.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Waterfalls & Landforms',
          prompt: 'A tall flat-topped highland rising steeply above surrounding plains is called a ___.',
          options: ['Valley', 'Plateau', 'Island', 'Peninsula'],
          correctIndex: 1,
          explanation: 'A plateau is an elevated flat-topped tableland.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Musicians',
          prompt: 'Pandit Ravi Shankar was a world-renowned maestro of which classical Indian string instrument?',
          options: ['Tabla', 'Sitar', 'Flute (Bansuri)', 'Shehnai'],
          correctIndex: 1,
          explanation: 'Pandit Ravi Shankar popularised the Sitar worldwide.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Sports Equipment',
          prompt: 'In which racket sport do players strike a feathered shuttlecock over a high net?',
          options: ['Table Tennis', 'Badminton', 'Squash', 'Hockey'],
          correctIndex: 1,
          explanation: 'Badminton uses lightweight rackets and a shuttlecock.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Storage Devices',
          prompt: 'A USB pen drive is a portable flash storage device that carries saved school projects.',
          options: ['True', 'False', 'It cools the CPU fan', 'It prints colour pages'],
          correctIndex: 0,
          explanation: 'Pen drives store digital documents portably.'
        }
      ]
    }
  ],
  'Class 3': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 3 • 4-Digit Numbers, Division & Fractions',
      marathiSubtitle: 'ICSE Class 3 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Greatest 4-Digit Number',
          prompt: 'What is the successor of the largest 3-digit number (999)?',
          options: ['998', '1,000', '9,999', '1,001'],
          correctIndex: 1,
          explanation: '999 + 1 = 1,000 (the smallest 4-digit number).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Division Remainder Rule',
          prompt: 'When 47 marbles are shared equally among 5 boys, how many marbles remain left over?',
          options: ['1', '2', '3', '4'],
          correctIndex: 1,
          explanation: '5 × 9 = 45, leaving a remainder of 47 − 45 = 2 marbles.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Money Word Problem',
          prompt: 'Kabir bought a compass box for ₹85.50 and gave a ₹100 note. How much balance did he receive?',
          options: ['₹14.50', '₹15.50', '₹24.50', '₹18.50'],
          correctIndex: 0,
          explanation: '₹100.00 − ₹85.50 = ₹14.50.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Fraction Comparison',
          prompt: 'Which fraction is larger than 1/2: 1/4, 3/8, 5/6, or 2/5?',
          options: ['1/4', '3/8', '5/6', '2/5'],
          correctIndex: 2,
          explanation: 'Half of 6 is 3/6; since 5/6 > 3/6, 5/6 is greater than 1/2.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Roman Numerals (CISCE)',
          prompt: 'What number does the Roman numeral XLIV stand for?',
          options: ['44', '46', '64', '66'],
          correctIndex: 0,
          explanation: 'XL = 40 and IV = 4 → 40 + 4 = 44.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 3 • Conjunctions, Tenses & Synonyms',
      marathiSubtitle: 'ICSE Class 3 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Past Continuous Tense',
          prompt: 'Fill in: "The choir ___ a patriotic song when the principal walked in."',
          options: ['is singing', 'was singing', 'will sang', 'sings'],
          correctIndex: 1,
          explanation: 'Singular collective subject "The choir" in past continuous takes "was singing".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Adverbs of Frequency',
          prompt: 'Pick the adverb in: "Grandfather always walks along the lakeside park at dawn."',
          options: ['Grandfather', 'always', 'lakeside', 'dawn'],
          correctIndex: 1,
          explanation: '"Always" tells us how often the verb "walks" happens.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Conjunction Contrast',
          prompt: 'Join sensibly: "The tortoise walked slowly, ___ it reached the finish line steadily."',
          options: ['because', 'yet', 'or', 'unless'],
          correctIndex: 1,
          explanation: '"Yet" contrasts slow speed with steady success.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Feminine Nouns',
          prompt: 'Choose the feminine gender of "HERO":',
          options: ['Heroess', 'Heroine', 'Heroette', 'Princess'],
          correctIndex: 1,
          explanation: 'The feminine counterpart of hero is "heroine".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Exclamatory Sentences',
          prompt: 'A sentence expressing sudden joy or surprise ends with an exclamation mark (!).',
          options: ['True', 'False', 'Ends with semicolon', 'Never has a verb'],
          correctIndex: 0,
          explanation: 'Exclamations end with (!), e.g., "What a lovely painting!".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 3 • Solids-Liquids-Gases, Soil & Stomata',
      marathiSubtitle: 'ICSE Class 3 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Leaf Gas Exchange',
          prompt: 'What are the tiny pores on the underside of leaves through which plants breathe air in and out?',
          options: ['Veins', 'Stomata', 'Petals', 'Thorns'],
          correctIndex: 1,
          explanation: 'Microscopic stomata open and close to exchange carbon dioxide, oxygen, and water vapour.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Earthworm Farmers',
          prompt: 'Why are earthworms celebrated by organic farmers as friends?',
          options: [
            'They eat ripe tomatoes',
            'They loosen soil and convert waste into nutrient-rich vermicompost',
            'They sting harmful weeds',
            'They pump underground oil'
          ],
          correctIndex: 1,
          explanation: 'Earthworms aerate soil and enrich it with organic castings.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Food Chains',
          prompt: 'Every green land food chain begins with ___ because they make food directly from sunlight.',
          options: ['carnivores', 'green plants (producers)', 'eagles', 'fungi'],
          correctIndex: 1,
          explanation: 'Producers (plants) capture solar energy to start food chains.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Gas Properties',
          prompt: 'Gases like cooking aroma spread out rapidly to fill every corner of an entire room.',
          options: ['True', 'False', 'Gases keep a rigid cube shape', 'Gases sink like lead bricks'],
          correctIndex: 0,
          explanation: 'Gas molecules move freely in all directions, filling available space.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Human Kidneys',
          prompt: 'Which pair of bean-shaped internal organs filters liquid waste from human blood to form urine?',
          options: ['Kidneys', 'Lungs', 'Eardrums', 'Tonsils'],
          correctIndex: 0,
          explanation: 'The two kidneys clean metabolic wastes out of blood continuously.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 3 • Early Humans, Globe & IPO Cycle',
      marathiSubtitle: 'ICSE Class 3 • Social Studies & GK Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Computer IPO Cycle',
          prompt: 'What does the standard computing cycle "I-P-O" stand for in ICSE Computer Studies?',
          options: [
            'Internet – Printer – Office',
            'Input – Process – Output',
            'Internal – Power – Order',
            'Icon – Page – Object'
          ],
          correctIndex: 1,
          explanation: 'Every computer accepts Input, Processes it in CPU, and produces Output.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Imaginary Line',
          prompt: 'The imaginary horizontal line dividing Earth into Northern and Southern Hemispheres is the ___.',
          options: ['Prime Meridian', 'Equator (0°)', 'Tropic of Capricorn', 'Arctic Circle'],
          correctIndex: 1,
          explanation: 'The Equator at 0° latitude bisects Earth into Northern and Southern hemispheres.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Early Human Discoveries',
          prompt: 'Which circular wooden invention revolutionised land transport and pottery making for early humans?',
          options: ['Compass', 'The Wheel', 'Steam engine', 'Compass needle'],
          correctIndex: 1,
          explanation: 'Inventing the wheel allowed potter’s wheels and carts.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Largest Desert',
          prompt: 'Where is the Sahara—Earth’s largest hot desert—located?',
          options: ['Central Australia', 'Northern Africa', 'Western China', 'Southern Chile'],
          correctIndex: 1,
          explanation: 'The Sahara spans most of Northern Africa.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Globe Definition',
          prompt: 'A globe is a true spherical 3D model representing Earth’s continents and oceans.',
          options: ['True', 'False', 'Globe is always flat paper', 'Globe shows only moons'],
          correctIndex: 0,
          explanation: 'Unlike flat maps, globes preserve Earth’s spherical accuracy.'
        }
      ]
    }
  ],
  'Class 4': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 4 • Prime Numbers, Symmetry & Mixed Fractions',
      marathiSubtitle: 'ICSE Class 4 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Prime Numbers',
          prompt: 'Which number is the ONLY even prime number in mathematics?',
          options: ['0', '2', '4', '6'],
          correctIndex: 1,
          explanation: '2 has only two factors (1 and 2); every larger even number is divisible by 2.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Mixed to Improper Fraction',
          prompt: 'Convert the mixed fraction 3 2/5 into an improper fraction:',
          options: ['11/5', '15/5', '17/5', '13/5'],
          correctIndex: 2,
          explanation: '(3 × 5 + 2) / 5 = 17/5.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Place Value Difference',
          prompt: 'In the 6-digit number 4,82,519, what is the difference between the place value and face value of digit 5?',
          options: ['495', '500', '5', '4,995'],
          correctIndex: 0,
          explanation: 'Place value of 5 is 500; face value is 5. Difference = 500 − 5 = 495.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Rectangle Perimeter',
          prompt: 'A rectangular photograph frame is 28 cm long and 18 cm wide. What length of wooden beading surrounds its perimeter?',
          options: ['46 cm', '82 cm', '92 cm', '504 cm'],
          correctIndex: 2,
          explanation: 'Perimeter = 2 × (28 + 18) = 2 × 46 = 92 cm.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Symmetry Lines',
          prompt: 'How many lines of reflection symmetry does an equilateral triangle have?',
          options: ['1', '2', '3', '4'],
          correctIndex: 2,
          explanation: 'Each of the 3 medians/altitudes from a vertex to opposite midpoint is a line of symmetry.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 4 • Degrees of Adjectives, Articles & Idioms',
      marathiSubtitle: 'ICSE Class 4 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Irregular Comparatives',
          prompt: 'Complete properly: "Kavya’s handwriting this term is much ___ than last month."',
          options: ['good', 'better', 'best', 'more good'],
          correctIndex: 1,
          explanation: 'The comparative form of "good" is irregular: "better".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Homonyms Context',
          prompt: 'Choose the sentence where "bark" refers to a TREE part rather than a dog sound:',
          options: [
            'The watchdog gave a sharp bark at midnight.',
            'Cinnamon spice comes from the dried inner bark of tropical trees.',
            'Why does the puppy bark at strangers?',
            'Do not bark loudly.'
          ],
          correctIndex: 1,
          explanation: 'Tree bark is the tough outer protective covering of woody stems.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Preposition Choice',
          prompt: 'Fill in: "The passenger train passed smoothly ___ the mountain tunnel."',
          options: ['above', 'through', 'between', 'upon'],
          correctIndex: 1,
          explanation: '"Through" expresses motion entering one end of a tunnel and exiting the other.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Collective Nouns',
          prompt: 'What collective noun fits: "A ___ of musicians played Beethoven’s symphony."?',
          options: ['bouquet', 'band / orchestra', 'fleet', 'herd'],
          correctIndex: 1,
          explanation: 'A group of musicians performing together is a band or orchestra.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Direct Speech Quotes',
          prompt: 'Exact spoken words of a speaker in Direct Speech are enclosed inside quotation marks ("...").',
          options: ['True', 'False', 'Uses parentheses only', 'Uses slashes'],
          correctIndex: 0,
          explanation: 'Direct speech quotes exact words inside inverted commas.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 4 • Matter Separation, Nutrients & Work',
      marathiSubtitle: 'ICSE Class 4 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Separating Tea Leaves',
          prompt: 'Which simple physical separation process strains boiled tea leaves using a mesh wire strainer?',
          options: ['Magnetic separation', 'Filtration', 'Sublimation', 'Churning'],
          correctIndex: 1,
          explanation: 'Filtration traps insoluble solid tea leaves on the sieve/filter while liquid passes through.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Carbohydrates & Proteins',
          prompt: 'Why do growing school children need protein-rich pulses, eggs, or paneer in daily meals?',
          options: [
            'Proteins build and repair body cells and muscles',
            'Proteins colour the eyes blue',
            'Proteins evaporate water from skin',
            'Proteins block bone absorption'
          ],
          correctIndex: 0,
          explanation: 'Proteins are essential body-building nutrients.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Aquatic Plant Adaptation',
          prompt: 'Water lily leaves float atop pond surfaces because of spongy air-filled cavities and ___ coatings.',
          options: ['sticky glue', 'waxy waterproof', 'metallic', 'salt crystal'],
          correctIndex: 1,
          explanation: 'Waxy leaf surfaces prevent rotting from constant water contact.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Scientific Work Definition',
          prompt: 'In physics, pushing firmly against an immovable stone wall without moving it does zero mechanical work.',
          options: ['True', 'False', 'Burns wall into energy', 'Creates positive displacement'],
          correctIndex: 0,
          explanation: 'Work = Force × Displacement; if displacement is zero, mechanical work is zero.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Friction Force',
          prompt: 'Which invisible contact force slows down a rolling football across grass until it stops?',
          options: ['Magnetism', 'Friction', 'Electrostatic attraction', 'Upthrust'],
          correctIndex: 1,
          explanation: 'Friction opposes relative motion between the ball and grass surface.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 4 • Computer Memory, Rivers & Indian Rights',
      marathiSubtitle: 'ICSE Class 4 • GK & Computer Studies Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Computer Memory Units',
          prompt: 'In ICSE Class 4 Computer Studies, how many bits equal exactly 1 Byte?',
          options: ['4 bits', '8 bits', '16 bits', '1024 bits'],
          correctIndex: 1,
          explanation: '1 Byte = 8 binary bits (and 4 bits = 1 Nibble).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Earth’s Motions',
          prompt: 'Earth’s spinning on its tilted axis once every 24 hours is called ___ and causes day and night.',
          options: ['Revolution', 'Rotation', 'Orbital eclipse', 'Tectonic drift'],
          correctIndex: 1,
          explanation: 'Rotation produces the cycle of day and night.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Physiography of India',
          prompt: 'Which fertile alluvial northern plain lies directly south of the Himalayan mountain ranges?',
          options: ['Deccan Plateau', 'Indo-Gangetic Northern Plains', 'Thar Salt Marsh', 'Andaman Ridge'],
          correctIndex: 1,
          explanation: 'Rivers Indus, Ganga, and Brahmaputra formed the fertile Indo-Gangetic Plains.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Calendars (BCE / CE)',
          prompt: 'What does the historical abbreviation "BCE" represent on modern history timelines?',
          options: [
            'Before Central Empire',
            'Before Common Era',
            'British Colonial Era',
            'By Century End'
          ],
          correctIndex: 1,
          explanation: 'BCE stands for Before Common Era (and CE for Common Era).'
        },
        {
          format: 'true_false',
          chapterTitle: 'RAM vs ROM',
          prompt: 'RAM (Random Access Memory) is temporary volatile memory whose unsaved contents vanish when power shuts off.',
          options: ['True', 'False', 'RAM is permanent read-only', 'ROM wipes every second'],
          correctIndex: 0,
          explanation: 'RAM holds active running data temporarily while powered on.'
        }
      ]
    }
  ],
  'Class 5': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 5 • HCF/LCM, Percentages & Profit-Loss',
      marathiSubtitle: 'ICSE Class 5 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'LCM Application',
          prompt: 'Find the Least Common Multiple (LCM) of 12, 18, and 24.',
          options: ['36', '48', '72', '144'],
          correctIndex: 2,
          explanation: 'Multiples of 24: 24, 48, 72; 72 is divisible by both 12 and 18.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Fraction to Percentage',
          prompt: 'Express 3/4 as a percentage:',
          options: ['25%', '50%', '75%', '80%'],
          correctIndex: 2,
          explanation: '(3/4) × 100% = 75%.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Profit Calculation',
          prompt: 'A shopkeeper buys a cricket bat for ₹450 and sells it for ₹540. What is his profit?',
          options: ['₹80', '₹90', '₹110', '₹990'],
          correctIndex: 1,
          explanation: 'Profit = SP − CP = ₹540 − ₹450 = ₹90.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Protractor Angles',
          prompt: 'An angle measuring 135° falls into which category of angles?',
          options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Reflex angle'],
          correctIndex: 2,
          explanation: 'Angles strictly between 90° and 180° are obtuse angles.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Volume of Cuboid',
          prompt: 'Calculate the volume of a brick measuring length 20 cm, breadth 10 cm, and height 6 cm.',
          options: ['120 cm³', '600 cm³', '1,200 cm³', '36 cm³'],
          correctIndex: 2,
          explanation: 'Volume = l × b × h = 20 × 10 × 6 = 1,200 cm³.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 5 • Modals, Adjectives & Idiomatic Usage',
      marathiSubtitle: 'ICSE Class 5 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Present Perfect Tense',
          prompt: 'Choose the correct verb form: "The science club ___ just built a working rain-gauge."',
          options: ['have', 'has', 'are', 'were'],
          correctIndex: 1,
          explanation: 'Collective club acting as a single unit uses singular "has built".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Adverb vs Adjective',
          prompt: 'In "The cheetah sprinted swiftly across the savannah", what part of speech is "swiftly"?',
          options: ['Adjective', 'Adverb of manner', 'Pronoun', 'Interjection'],
          correctIndex: 1,
          explanation: '"Swiftly" modifies the action verb "sprinted".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Antonym Prefix',
          prompt: 'Add the right prefix to form the opposite of "HONEST":',
          options: ['un-', 'in-', 'dis-', 'non-'],
          correctIndex: 2,
          explanation: 'dis + honest = dishonest.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Suffix Formation',
          prompt: 'Add a suffix to the noun "CARE" to turn it into an adjective meaning "full of caution":',
          options: ['-ness', '-ful', '-ment', '-ship'],
          correctIndex: 1,
          explanation: 'care + -ful = careful (adjective).'
        },
        {
          format: 'true_false',
          chapterTitle: 'Apostrophe Contraction',
          prompt: '"They’re" is the contraction for "They are", whereas "Their" shows ownership.',
          options: ['True', 'False', 'Both show ownership', 'There means they are'],
          correctIndex: 0,
          explanation: 'Apostrophe replaces the missing letter "a" in "they’re".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 5 • Circulatory System, Pollination & Eclipses',
      marathiSubtitle: 'ICSE Class 5 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Blood Vessels',
          prompt: 'Which blood vessels carry oxygen-rich blood away from the heart under high pumping pressure?',
          options: ['Veins', 'Arteries', 'Bronchioles', 'Tendons'],
          correctIndex: 1,
          explanation: 'Arteries have thick elastic walls to carry blood away from the heart.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Solar Eclipse Astronomy',
          prompt: 'When does a Solar Eclipse take place in space?',
          options: [
            'When Earth passes between Sun and Moon',
            'When the Moon passes directly between the Sun and Earth, casting a shadow on Earth',
            'When Mars crosses behind Jupiter',
            'Only at midnight on New Year'
          ],
          correctIndex: 1,
          explanation: 'Moon blocks sunlight reaching part of Earth during a solar eclipse.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Pollination Biology',
          prompt: 'Transfer of powdery pollen grains from the anther to the sticky stigma of a flower is called ___.',
          options: ['germination', 'pollination', 'transpiration', 'photosynthesis'],
          correctIndex: 1,
          explanation: 'Pollination precedes fertilisation inside flowering plants.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Pulleys & Inclined Planes',
          prompt: 'A fixed single pulley helps raise a heavy water bucket comfortably by changing the direction of effort downward.',
          options: ['True', 'False', 'Reduces mass of bucket to zero', 'Needs electricity'],
          correctIndex: 0,
          explanation: 'Pulling downward uses body weight instead of lifting directly upward.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Communicable Diseases',
          prompt: 'Through which insect vector is malaria transmitted from an infected person to a healthy individual?',
          options: [
            'Female Anopheles mosquito',
            'Housefly',
            'Honeybee',
            'Dragonfly'
          ],
          correctIndex: 0,
          explanation: 'Female Anopheles mosquitoes transmit Plasmodium parasites causing malaria.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 5 • Computer Generations & Spreadsheets',
      marathiSubtitle: 'ICSE Class 5 • GK & Computer Studies Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Generations of Computers',
          prompt: 'Which electronic component replaced bulky vacuum tubes to power Second Generation computers?',
          options: ['Transistors', 'Microprocessors', 'Mechanical gears', 'Optical fibres'],
          correctIndex: 0,
          explanation: 'Second-generation computers (1950s–60s) used compact transistors.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Spreadsheet Formulas',
          prompt: 'Every calculation formula typed into a Microsoft Excel worksheet cell must begin with the ___ symbol.',
          options: ['#', '@', '=', '&'],
          correctIndex: 2,
          explanation: 'Excel formulas begin with an equals sign (=), e.g., =SUM(A1:A5).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Climate Zones',
          prompt: 'Which hot climate zone wraps closely around the Equator between the Tropics of Cancer and Capricorn?',
          options: ['Frigid Zone', 'Torrid Zone', 'Temperate Zone', 'Tundra Belt'],
          correctIndex: 1,
          explanation: 'The Torrid (Tropical) Zone receives near-vertical sun rays year-round.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Indian Classics',
          prompt: 'Who compiled the ancient Sanskrit fables of the Panchatantra?',
          options: ['Vishnu Sharma', 'Kalidasa', 'Aryabhata', 'Patanjali'],
          correctIndex: 0,
          explanation: 'Pandit Vishnu Sharma is credited with writing the Panchatantra.'
        },
        {
          format: 'true_false',
          chapterTitle: 'System Software',
          prompt: 'Operating systems like Windows, macOS, and Linux act as system software managing hardware resources.',
          options: ['True', 'False', 'They are application games only', 'They are physical cables'],
          correctIndex: 0,
          explanation: 'An OS is core system software coordinating hardware and user apps.'
        }
      ]
    }
  ],
  'Class 6': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 6 • Sets, Linear Equations & Triangle Sums',
      marathiSubtitle: 'ICSE Class 6 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Angle Sum of Triangle',
          prompt: 'Two angles of a triangle measure 48° and 67°. What is the measure of the third angle?',
          options: ['55°', '65°', '75°', '115°'],
          correctIndex: 1,
          explanation: 'Sum of triangle angles = 180°. Third angle = 180° − (48° + 67°) = 65°.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Linear Equation Solve',
          prompt: 'Solve for x: 5x + 8 = 43. Value of x = ___.',
          options: ['6', '7', '8', '9'],
          correctIndex: 1,
          explanation: '5x = 43 − 8 = 35 → x = 7.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Set Roster Form',
          prompt: 'Write the Set of even natural numbers less than 10 in CISCE Roster notation:',
          options: ['{0, 2, 4, 6, 8}', '{2, 4, 6, 8}', '{2, 4, 6, 8, 10}', '{1, 3, 5, 7, 9}'],
          correctIndex: 1,
          explanation: 'Natural numbers start at 1; even natural numbers < 10 are {2, 4, 6, 8}.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Percentage of Quantity',
          prompt: 'Find 15% of ₹800.',
          options: ['₹80', '₹100', '₹120', '₹150'],
          correctIndex: 2,
          explanation: '(15 / 100) × 800 = 15 × 8 = ₹120.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Unitary Proportion',
          prompt: 'A train covers 210 km at uniform speed in 3 hours. How far does it travel in 5 hours?',
          options: ['280 km', '315 km', '350 km', '420 km'],
          correctIndex: 2,
          explanation: 'Speed = 210 ÷ 3 = 70 km/h. In 5 hours: 70 × 5 = 350 km.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 6 • Participles, Prepositions & Precis Foundations',
      marathiSubtitle: 'ICSE Class 6 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Prepositional Combinations',
          prompt: 'Select the precise preposition: "The new student is very fond ___ classical violin music."',
          options: ['for', 'of', 'at', 'by'],
          correctIndex: 1,
          explanation: 'Standard collocation: "fond of".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Adverbial Clause of Time',
          prompt: 'Identify the subordinating conjunction showing time: "Wait patiently ___ the traffic lights switch to green."',
          options: ['unless', 'until', 'though', 'whereas'],
          correctIndex: 1,
          explanation: '"Until" marks the point in time up to which waiting continues.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Irregular Past Participle',
          prompt: 'Complete using past participle: "Someone has ___ the classroom flower vase by mistake."',
          options: ['broke', 'broken', 'breaked', 'breaking'],
          correctIndex: 1,
          explanation: 'Present perfect ("has + V3") uses "broken".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Interchange of Voice',
          prompt: 'Identify active equivalent of: "A medal was presented to the winner by the Mayor."',
          options: [
            'The Mayor presents a medal to the winner.',
            'The Mayor presented a medal to the winner.',
            'The winner presented the Mayor a medal.',
            'The Mayor has presented a medal.'
          ],
          correctIndex: 1,
          explanation: 'Past simple passive ("was presented") converts to active past simple ("presented").'
        },
        {
          format: 'true_false',
          chapterTitle: 'Alliteration Poetic Device',
          prompt: 'Repetition of initial consonant sounds as in "Peter Piper picked a peck" is called Alliteration.',
          options: ['True', 'False', 'It is personification', 'It is simile'],
          correctIndex: 0,
          explanation: 'Repeated initial /p/ sounds exemplify alliteration.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 6 • SI Units, Chemical Symbols & Plant/Animal Cells',
      marathiSubtitle: 'ICSE Class 6 • Physics, Chemistry & Biology Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Chemistry Symbols',
          prompt: 'What is the modern chemical symbol for Sodium (derived from its Latin name Natrium)?',
          options: ['So', 'Sd', 'Na', 'Nt'],
          correctIndex: 2,
          explanation: 'Sodium’s symbol is Na, from Latin "Natrium".'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Biology • Plant vs Animal Cell',
          prompt: 'Which outer rigid protective layer made of cellulose surrounds a plant cell but is absent in animal cells?',
          options: ['Cell membrane', 'Cell wall', 'Nucleolus', 'Cytoplasm'],
          correctIndex: 1,
          explanation: 'Plant cells have a rigid cellulose cell wall outside their plasma membrane.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Physics • Mechanical Advantage',
          prompt: 'The ratio of Load lifted to Effort applied on a simple machine is called its Mechanical ___.',
          options: ['Friction', 'Advantage', 'Inertia', 'Power'],
          correctIndex: 1,
          explanation: 'Mechanical Advantage (MA) = Load / Effort.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Chemistry • Compound Formula',
          prompt: 'Water (H₂O) is a compound because hydrogen and oxygen are chemically combined in a fixed 2:1 ratio by atom count.',
          options: ['True', 'False', 'Water is an element', 'Water is a mechanical mixture'],
          correctIndex: 0,
          explanation: 'Every molecule of pure water consists strictly of 2 H atoms bonded to 1 O atom.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Biology • Enzyme Digestion',
          prompt: 'Which enzyme present in human saliva begins breaking down cooked starch into simple sugar in the mouth?',
          options: ['Pepsin', 'Salivary amylase (ptyalin)', 'Bile salt', 'Insulin'],
          correctIndex: 1,
          explanation: 'Salivary amylase digests starch into maltose inside the buccal cavity.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 6 • Mesopotamian History, HTML5 & Local Civics',
      marathiSubtitle: 'ICSE Class 6 • History, Civics & Computer GK Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'World River Civilisations',
          prompt: 'Along the fertile banks of which two rivers did ancient Mesopotamian Civilisation flourish?',
          options: [
            'Indus & Sutlej',
            'Tigris & Euphrates',
            'Yellow River & Yangtze',
            'Thames & Seine'
          ],
          correctIndex: 1,
          explanation: 'Mesopotamia ("land between two rivers") developed between the Tigris and Euphrates.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'HTML5 Basics (ICSE)',
          prompt: 'Every standard HTML web page begins and ends with the root tag pair <___> ... </html>.',
          options: ['head', 'html', 'body', 'title'],
          correctIndex: 1,
          explanation: '<html> wraps the entire HTML document structure.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Mauryan Administration',
          prompt: 'Which advisor of Chandragupta Maurya authored the famous treatise on statecraft called the "Arthashastra"?',
          options: ['Megasthenes', 'Kautilya (Chanakya)', 'Banabhatta', 'Kalhana'],
          correctIndex: 1,
          explanation: 'Acharya Kautilya (Chanakya) authored the Arthashastra.'
        },
        {
          format: 'match_following',
          chapterTitle: 'North America Geography',
          prompt: 'Which major mountain system runs down the western side of North America from Alaska to New Mexico?',
          options: ['Alps', 'Rocky Mountains', 'Urals', 'Drakensberg'],
          correctIndex: 1,
          explanation: 'The Rockies form the western Cordillera spine of North America.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Urban Local Bodies',
          prompt: 'A Municipal Corporation (Nagar Nigam) governs civic services in large metropolitan cities of India.',
          options: ['True', 'False', 'It governs villages of 500 people', 'It runs railways only'],
          correctIndex: 0,
          explanation: 'Large cities are governed by Municipal Corporations.'
        }
      ]
    }
  ],
  'Class 7': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 7 • Set Operations, Congruency & Profit-Loss',
      marathiSubtitle: 'ICSE Class 7 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Set Union & Intersection',
          prompt: 'If P = {1, 3, 5, 7} and Q = {3, 6, 7, 9}, find their intersection P ∩ Q:',
          options: ['{1, 3, 5, 6, 7, 9}', '{3, 7}', '{1, 5}', '{6, 9}'],
          correctIndex: 1,
          explanation: 'Elements present in BOTH P and Q are 3 and 7.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Gain Percentage',
          prompt: 'A cycle bought for ₹2,500 is sold for ₹2,800. Gain percentage = ___%.',
          options: ['10', '12', '15', '18'],
          correctIndex: 1,
          explanation: 'Profit = 300. Gain % = (300 / 2500) × 100 = 12%.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Pythagorean Triplets',
          prompt: 'In a right-angled triangle with legs 9 cm and 12 cm, calculate the hypotenuse:',
          options: ['13 cm', '14 cm', '15 cm', '21 cm'],
          correctIndex: 2,
          explanation: '√(9² + 12²) = √(81 + 144) = √225 = 15 cm.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Parallel Lines Transversal',
          prompt: 'Two parallel lines are cut by a transversal. If one co-interior angle is 115°, what is the other co-interior angle on the same side?',
          options: ['65°', '75°', '115°', '25°'],
          correctIndex: 0,
          explanation: 'Co-interior angles between parallel lines are supplementary: 180° − 115° = 65°.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Rational Operations',
          prompt: 'What is the multiplicative inverse (reciprocal) of −7/11?',
          options: ['7/11', '−11/7', '11/7', '0'],
          correctIndex: 1,
          explanation: 'Product of a number and its reciprocal equals +1: (−7/11) × (−11/7) = +1.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 7 • Clauses, Modals & Transformation Exercises',
      marathiSubtitle: 'ICSE Class 7 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Too...To Removal',
          prompt: 'Rewrite without "too": "The brass trunk is too heavy to carry upstairs alone."',
          options: [
            'The brass trunk is so heavy that nobody cannot carry upstairs.',
            'The brass trunk is so heavy that one cannot carry it upstairs alone.',
            'The brass trunk is very heavy to carry.',
            'The brass trunk is heavy enough to carry.'
          ],
          correctIndex: 1,
          explanation: '"too + adj + to + verb" transforms to "so + adj + that + pronoun + cannot + verb".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Relative Clause Distinction',
          prompt: 'Identify the adjective (relative) clause in: "Students who revise daily master ICSE grammar effortlessly."',
          options: [
            'Students master effortlessly',
            'who revise daily',
            'master ICSE grammar',
            'ICSE grammar effortlessly'
          ],
          correctIndex: 1,
          explanation: '"who revise daily" modifies the noun "Students", functioning as an adjective clause.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Preposition Accuracy',
          prompt: 'Complete cleanly: "Our school cricket team succeeded ___ winning the inter-ICSE zonal cup."',
          options: ['at', 'in', 'for', 'with'],
          correctIndex: 1,
          explanation: 'Standard verb-preposition structure: "succeed in + gerund".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Subjunctive Wish',
          prompt: 'Choose formal standard English: "If I ___ fluent in three classical languages, I would translate ancient manuscripts."',
          options: ['am', 'was', 'were', 'will be'],
          correctIndex: 2,
          explanation: 'Hypothetical subjunctive conditions take "were" after "I".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Compound-Complex Contrast',
          prompt: 'Conjunctions "Although" and "Even though" introduce adverbial clauses of concession.',
          options: ['True', 'False', 'They show purpose', 'They end sentences only'],
          correctIndex: 0,
          explanation: 'Subordinators of concession express contrast despite something else.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 7 • Density, Atomicity & Plant Tissues',
      marathiSubtitle: 'ICSE Class 7 • Physics, Chemistry & Biology Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Chemistry • Valency & Formulas',
          prompt: 'Aluminium has valency 3 (Al³⁺) and Oxide has valency 2 (O²⁻). Using criss-cross rule, write the formula of Aluminium Oxide:',
          options: ['AlO', 'Al₂O₃', 'Al₃O₂', 'AlO₃'],
          correctIndex: 1,
          explanation: 'Criss-crossing valencies 3 and 2 yields Al₂O₃.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Biology • Five Kingdoms',
          prompt: 'In Whittaker’s Five Kingdom classification, mushrooms and baker’s yeast belong to which kingdom?',
          options: ['Monera', 'Protista', 'Fungi', 'Plantae'],
          correctIndex: 2,
          explanation: 'Fungi are non-green heterotrophic organisms like yeast and mushrooms.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Physics • Speed Conversion',
          prompt: 'Convert a car’s speed of 72 km/h into metres per second (m/s):',
          options: ['15 m/s', '20 m/s', '25 m/s', '36 m/s'],
          correctIndex: 1,
          explanation: '72 × (5/18) = 4 × 5 = 20 m/s.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Physics • Parallel Circuit',
          prompt: 'In household parallel wiring, if one electric bulb fuses, other appliances on parallel branches continue working normally.',
          options: ['True', 'False', 'Entire house goes dark permanently', 'Voltage doubles instantly'],
          correctIndex: 0,
          explanation: 'Each parallel branch forms an independent closed loop across the supply voltage.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Biology • Nervous Neuron',
          prompt: 'Which specialised cell in the human nervous system carries rapid electrochemical impulses?',
          options: ['Osteocyte', 'Neuron', 'Erythrocyte', 'Platelet'],
          correctIndex: 1,
          explanation: 'Neurons (nerve cells) transmit impulses between receptors, spinal cord, and brain.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 7 • Constitution Principles, Number Systems & Maps',
      marathiSubtitle: 'ICSE Class 7 • History, Civics & Computer GK Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian Constitution Preamble',
          prompt: 'Which term in the Preamble of the Indian Constitution means the head of state is elected rather than a hereditary monarch?',
          options: ['Secular', 'Republic', 'Socialist', 'Sovereign'],
          correctIndex: 1,
          explanation: 'A Republic has an elected President rather than a hereditary king or queen.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Cyber Security',
          prompt: 'Malicious software disguised inside an apparently harmless game download that steals passwords is called a ___ Horse.',
          options: ['White', 'Trojan', 'Copper', 'Roman'],
          correctIndex: 1,
          explanation: 'A Trojan Horse masquerades as legitimate software while hiding malicious code.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Contour Lines on Topo Maps',
          prompt: 'On a CISCE topographical map, closely spaced brown contour lines indicate:',
          options: ['A flat sandy beach', 'A steep hill slope', 'A calm lake surface', 'Underground caves'],
          correctIndex: 1,
          explanation: 'Closely packed contours represent rapid elevation change (steep slope).'
        },
        {
          format: 'match_following',
          chapterTitle: 'Bhakti Saints',
          prompt: 'Saint Kabir’s couplets ("Dohas") taught universal harmony between communities in medieval India. In which city did he spend most of his life?',
          options: ['Ujjain', 'Varanasi (Kashi)', 'Madurai', 'Hampi'],
          correctIndex: 1,
          explanation: 'Sant Kabir lived and taught in Varanasi.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Binary Base-2',
          prompt: 'Computers store all instructions internally using Base-2 binary digits: 0 and 1.',
          options: ['True', 'False', 'Uses base-7 internally', 'Uses Roman numerals'],
          correctIndex: 0,
          explanation: 'Digital transistors operate on two states: OFF (0) and ON (1).'
        }
      ]
    }
  ],
  'Class 8': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 8 • Factorisation, Compound Interest & Variation',
      marathiSubtitle: 'ICSE Class 8 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Quadratic Factorisation',
          prompt: 'Factorise the trinomial completely: x² + 9x + 20',
          options: [
            '(x + 2)(x + 10)',
            '(x + 4)(x + 5)',
            '(x − 4)(x − 5)',
            '(x + 1)(x + 20)'
          ],
          correctIndex: 1,
          explanation: '4 + 5 = 9 and 4 × 5 = 20, giving (x + 4)(x + 5).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Rhombus Area',
          prompt: 'The diagonals of a rhombus measure 16 cm and 12 cm. Its area is ___ cm².',
          options: ['48', '96', '192', '28'],
          correctIndex: 1,
          explanation: 'Area of rhombus = ½ × d₁ × d₂ = ½ × 16 × 12 = 96 cm².'
        },
        {
          format: 'mcq',
          chapterTitle: 'Negative Exponents',
          prompt: 'Evaluate: (3⁻¹ + 6⁻¹) ÷ 2⁻¹',
          options: ['1', '3/2', '2/3', '1/2'],
          correctIndex: 0,
          explanation: '(1/3 + 1/6) = 3/6 = 1/2. Dividing 1/2 by 2⁻¹ (= 1/2) gives 1.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Venn Diagram Union',
          prompt: 'In a class of 40 students, 25 play chess and 20 play carrom, while every student plays at least one game. How many play BOTH games?',
          options: ['3', '5', '10', '15'],
          correctIndex: 1,
          explanation: 'n(A ∩ B) = n(A) + n(B) − n(A ∪ B) = 25 + 20 − 40 = 5.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Cube Surface Area',
          prompt: 'The total surface area of a wooden cube is 294 cm². What is the length of one edge?',
          options: ['6 cm', '7 cm', '8 cm', '9 cm'],
          correctIndex: 1,
          explanation: '6a² = 294 → a² = 49 → a = 7 cm.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 8 • Infinitives, Participles & Composition Synthesis',
      marathiSubtitle: 'ICSE Class 8 • English Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Bare Infinitive',
          prompt: 'Pick the right verb form: "The strict librarian made the noisy visitors ___ outside."',
          options: ['to wait', 'wait', 'waiting', 'waited'],
          correctIndex: 1,
          explanation: 'Causative verb "made + object" takes a bare infinitive ("wait" without "to").'
        },
        {
          format: 'mcq',
          chapterTitle: 'Hardly...When Inversion',
          prompt: 'Select the correctly inverted CISCE sentence:',
          options: [
            'Hardly had the rain stopped than children rushed onto the pitch.',
            'Hardly had the rain stopped when children rushed onto the pitch.',
            'Hardly the rain had stopped when children rushed.',
            'Hardly did the rain stopped when children rushed.'
          ],
          correctIndex: 1,
          explanation: '"Hardly had ... when" is the mandatory correlative pair.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Phrasal Preposition',
          prompt: 'Complete: "A committee was set up to look ___ the causes of urban waterlogging."',
          options: ['for', 'into', 'after', 'over'],
          correctIndex: 1,
          explanation: '"Look into" means investigate systematically.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Lest + Should Grammar',
          prompt: 'Choose the right modal after "lest": "Carry an emergency torch lest you ___ lose your way at dusk."',
          options: ['may not', 'should', 'will', 'can'],
          correctIndex: 1,
          explanation: 'Conjunction "lest" is always followed by "should" (never "not").'
        },
        {
          format: 'true_false',
          chapterTitle: 'Active-Passive Infinitive',
          prompt: 'The passive form of "You must complete this worksheet today" is "This worksheet must be completed today."',
          options: ['True', 'False', 'Must to be completed', 'Was be completed'],
          correctIndex: 0,
          explanation: 'Modal passives follow "modal + be + past participle".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 8 • Archimedes, Carbon Allotropes & Endocrine',
      marathiSubtitle: 'ICSE Class 8 • Physics, Chemistry & Biology Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Chemistry • Allotropes of Carbon',
          prompt: 'Which crystalline allotrope of carbon conducts electricity well because each carbon atom bonds to three others leaving one free electron?',
          options: ['Diamond', 'Graphite', 'Quartz silica', 'Sugar charcoal'],
          correctIndex: 1,
          explanation: 'Layered hexagonal sheets in graphite have mobile delocalised electrons.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Physics • Liquid Pressure',
          prompt: 'Why are the concrete base walls of a huge river hydroelectric dam built much thicker at the bottom than at the top?',
          options: [
            'To look more decorative',
            'Because hydrostatic liquid pressure increases directly with depth',
            'Because water temperature drops near surfaces',
            'To reduce wind drag on ships'
          ],
          correctIndex: 1,
          explanation: 'Liquid pressure P = hρg increases with water depth h.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Biology • Blood Hormone',
          prompt: 'The hormone ___ secreted by the pancreas regulates human blood glucose levels.',
          options: ['Thyroxine', 'Insulin', 'Adrenaline', 'Oestrogen'],
          correctIndex: 1,
          explanation: 'Pancreatic islets secrete insulin to lower elevated blood glucose.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Chemistry • Hydrogen Gas',
          prompt: 'Pure hydrogen gas burns cleanly in oxygen with a characteristic "pop" sound and forms pure water.',
          options: ['True', 'False', 'Turns limewater milky', 'Supports heavy soot smoke'],
          correctIndex: 0,
          explanation: '2H₂ + O₂ → 2H₂O; test tube ignition yields a gentle pop.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Physics • Turning Moment',
          prompt: 'What is the moment of a force of 25 N applied perpendicularly on a wrench handle 0.4 m long?',
          options: ['6.25 N·m', '10 N·m', '25.4 N·m', '62.5 N·m'],
          correctIndex: 1,
          explanation: 'Torque (Moment) = Force × perpendicular distance = 25 × 0.4 = 10 N·m.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 8 • Indian Parliament, United Nations & BlueJ Java',
      marathiSubtitle: 'ICSE Class 8 • History, Civics & Computer Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'BlueJ Java Basics (ICSE)',
          prompt: 'In ICSE Computer Studies (Java), which single-character terminator ends almost every executable Java statement?',
          options: ['Colon (:)', 'Semicolon (;)', 'Comma (,)', 'Hash (#)'],
          correctIndex: 1,
          explanation: 'Java statements terminate with a semicolon (;).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'United Nations Headquarters',
          prompt: 'The principal headquarters of the United Nations (UN) is located in ___ City.',
          options: ['Paris', 'New York', 'London', 'Tokyo'],
          correctIndex: 1,
          explanation: 'The UN headquarters complex sits in Manhattan, New York City.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE History • Independence',
          prompt: 'Which freedom leader founded the Indian National Army (Azad Hind Fauj) abroad and gave the slogan "Delhi Chalo"?',
          options: [
            'Lala Lajpat Rai',
            'Netaji Subhas Chandra Bose',
            'Gopal Krishna Gokhale',
            'C. Rajagopalachari'
          ],
          correctIndex: 1,
          explanation: 'Netaji Subhas Chandra Bose led the Azad Hind Fauj in 1943.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Industrial Revolution',
          prompt: 'In which European country did the 18th-century Industrial Revolution first begin?',
          options: ['Spain', 'Great Britain (England)', 'Portugal', 'Greece'],
          correctIndex: 1,
          explanation: 'Mechanised textile spinning and steam power sparked the Industrial Revolution in Britain.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Rajya Sabha Tenure',
          prompt: 'Each elected member of the Rajya Sabha (Council of States) serves a 6-year term, with one-third retiring every 2 years.',
          options: ['True', 'False', 'Dissolves fully every 2 years', 'Members serve 1-year terms'],
          correctIndex: 0,
          explanation: 'The Rajya Sabha is a permanent house with 6-year member terms.'
        }
      ]
    }
  ],
  'Class 9': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Class 9 • Expansions, Simultaneous Linear Equations & Trig',
      marathiSubtitle: 'ICSE Class 9 • Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Trigonometric Ratios',
          prompt: 'In a right triangle ABC with ∠B = 90°, if sin A = 3/5, calculate cos A:',
          options: ['3/4', '4/5', '5/4', '5/3'],
          correctIndex: 1,
          explanation: 'Using sin²A + cos²A = 1 → cos²A = 1 − 9/25 = 16/25 → cos A = 4/5.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Compound Interest (Half-Yearly)',
          prompt: 'When interest at 10% per annum is compounded half-yearly for 1 year, the effective rate per half-year is ___%.',
          options: ['2.5', '5', '10', '20'],
          correctIndex: 1,
          explanation: 'Half-yearly rate = Annual rate / 2 = 10% / 2 = 5%.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Algebraic Expansions',
          prompt: 'If a + 1/a = 6, find the value of a² + 1/a²:',
          options: ['32', '34', '36', '38'],
          correctIndex: 1,
          explanation: '(a + 1/a)² = a² + 1/a² + 2 → 36 − 2 = 34.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Midpoint Formula',
          prompt: 'Find the midpoint of the segment joining A(−2, 6) and B(8, −4):',
          options: ['(3, 1)', '(5, 1)', '(6, 2)', '(3, 5)'],
          correctIndex: 0,
          explanation: 'M = ((−2+8)/2, (6−4)/2) = (6/2, 2/2) = (3, 1).'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Polygon Interior Angle',
          prompt: 'Each interior angle of a regular octagon (8 sides) measures:',
          options: ['108°', '120°', '135°', '144°'],
          correctIndex: 2,
          explanation: 'Interior angle = [(8−2) × 180°] / 8 = 1080° / 8 = 135°.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Class 9 • Formal Synthesis, Prepositions & Comprehension',
      marathiSubtitle: 'ICSE Class 9 • English Paper 1 Language Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'CISCE Transformation (Despite)',
          prompt: 'Transform using "In spite of": "Although the pitch was damp, the match resumed."',
          options: [
            'In spite of damp pitch, the match resumed.',
            'In spite of the damp pitch, the match resumed.',
            'In spite of that pitch was damp, match resumed.',
            'In spite the damp pitch, the match resumed.'
          ],
          correctIndex: 1,
          explanation: '"In spite of" is followed by a noun phrase ("the damp pitch"), never "despite of".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Conditional Inversion',
          prompt: 'Select the error-free CISCE sentence using "Should":',
          options: [
            'Should it rains tomorrow, the picnic will shift indoors.',
            'Should it rain tomorrow, the picnic will shift indoors.',
            'Should it rained tomorrow, the picnic shifts indoors.',
            'Should it raining tomorrow, picnic will shift.'
          ],
          correctIndex: 1,
          explanation: 'Inverted conditional uses "Should + subject + bare base verb (rain)".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Preposition Drill',
          prompt: 'Insert the correct preposition: "The new lab assistant is fully acquainted ___ titration glassware."',
          options: ['to', 'with', 'about', 'for'],
          correctIndex: 1,
          explanation: 'Correct idiomatic collocation: "acquainted with".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Participle Synthesis',
          prompt: 'Combine cleanly with a participle: "He noticed the approaching cyclone. He secured all shutters."',
          options: [
            'Noticing the approaching cyclone, he secured all shutters.',
            'Having notice cyclone, he secured shutters.',
            'To noticing cyclone, he secured.',
            'He secured shutters noticed cyclone.'
          ],
          correctIndex: 0,
          explanation: 'Present participle "Noticing..." seamlessly combines consecutive actions by the same subject.'
        },
        {
          format: 'true_false',
          chapterTitle: 'CISCE Punctuation',
          prompt: 'In formal ICSE letters, "Yours faithfully," is used when the salutation is "Dear Sir/Madam,".',
          options: ['True', 'False', 'Uses Yours lovely', 'Uses Faithfully your'],
          correctIndex: 0,
          explanation: 'CISCE formal correspondence pairs "Dear Sir/Madam" with "Yours faithfully".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Class 9 • Gas Laws, Atomic Bonding & Plant Tissues',
      marathiSubtitle: 'ICSE Class 9 • Physics, Chemistry & Biology Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Chemistry • Octet & Bonding',
          prompt: 'What type of chemical bond forms between Sodium (Z=11) and Chlorine (Z=17) via complete electron transfer?',
          options: [
            'Covalent bond',
            'Electrovalent (ionic) bond',
            'Hydrogen bond',
            'Metallic bond'
          ],
          correctIndex: 1,
          explanation: 'Na loses 1 valence electron to Cl, forming electrostatic Na⁺Cl⁻ ions.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Chemistry • Boyle’s Law',
          prompt: 'At constant temperature, Boyle’s Law states that the volume of a fixed mass of dry gas is:',
          options: [
            'Directly proportional to pressure',
            'Inversely proportional to pressure (PV = constant)',
            'Independent of pressure',
            'Proportional to square of pressure'
          ],
          correctIndex: 1,
          explanation: 'At constant T, P₁V₁ = P₂V₂ (pressure increases → volume decreases).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Physics • Free Fall Gravity',
          prompt: 'A stone dropped from rest falls freely under g = 10 m/s² for 3 seconds. Distance fallen s = ___ metres.',
          options: ['30', '45', '60', '90'],
          correctIndex: 1,
          explanation: 's = ut + ½gt² = 0 + ½ × 10 × 3² = 45 m.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Biology • Double Fertilisation',
          prompt: 'In angiosperm flowering plants, one pollen tube nucleus fuses with the egg cell while another forms endosperm.',
          options: ['True', 'False', 'Occurs only in ferns', 'Roots perform pollination'],
          correctIndex: 0,
          explanation: 'Double fertilisation is unique to flowering angiosperms.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Physics • Simple Pendulum',
          prompt: 'Which physical factor alone governs the time period T of a small-amplitude simple pendulum at a given place?',
          options: [
            'Mass of the brass bob',
            'Effective length L of the pendulum (T = 2π√(L/g))',
            'Colour of string',
            'Shape of ceiling hook'
          ],
          correctIndex: 1,
          explanation: 'Period depends only on effective length L and local g, not bob mass.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Class 9 • Java OOP Basics, Earth Crust & Renaissance',
      marathiSubtitle: 'ICSE Class 9 • Computer Applications, History & GK Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Java OOP Pillars (ICSE)',
          prompt: 'In ICSE Class 9 Java Computer Applications, wrapping data variables and methods together into a single Class unit is called:',
          options: ['Compilation', 'Encapsulation', 'Recursion', 'Debugging'],
          correctIndex: 1,
          explanation: 'Encapsulation bundles state (fields) and behaviour (methods) safely inside a class.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Java Math Library',
          prompt: 'What double value does Java expression Math.pow(3, 4) return?',
          options: ['12.0', '64.0', '81.0', '7.0'],
          correctIndex: 2,
          explanation: 'Math.pow(3, 4) computes 3⁴ = 81.0.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Economics • Factors of Production',
          prompt: 'Which active factor of production organises land, labour, and capital while bearing business risk?',
          options: ['Machinery', 'Entrepreneur (Organisation)', 'Mineral ore', 'Savings interest'],
          correctIndex: 1,
          explanation: 'An entrepreneur coordinates all factors of production and assumes risk.'
        },
        {
          format: 'match_following',
          chapterTitle: 'ICSE Geography • Rocks',
          prompt: 'Which type of rock—such as granite and basalt—solidifies directly from molten magma or lava?',
          options: ['Sedimentary rock', 'Igneous rock', 'Metamorphic slate', 'Fossiliferous limestone'],
          correctIndex: 1,
          explanation: 'Igneous ("fire-born") rocks form by cooling magma or lava.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Java char Size',
          prompt: 'In Java, the primitive char data type uses 2 bytes (16-bit Unicode) in memory.',
          options: ['True', 'False', 'Uses 1 bit only', 'Stores decimals like float'],
          correctIndex: 0,
          explanation: 'Java’s char stores 16-bit UTF-16 characters (2 bytes).'
        }
      ]
    }
  ],
  'Class 10': [
    {
      subject: 'Mathematics',
      chapterName: 'ICSE Board Class 10 • Matrices, Banking RD & Circles',
      marathiSubtitle: 'ICSE Class 10 • CISCE Board Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'CISCE Banking (RD Account)',
          prompt: 'In an ICSE Recurring Deposit (P = ₹1,000/month, n = 12 months, r = 8% p.a.), compute qualifying total principal factor n(n+1)/2:',
          options: ['66', '78', '144', '156'],
          correctIndex: 1,
          explanation: 'n(n+1)/2 = (12 × 13) / 2 = 78.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Matrices Multiplication Order',
          prompt: 'If Matrix A has order (2 × 3) and Matrix B has order (3 × 2), the product matrix AB has order ___:',
          options: ['3 × 3', '2 × 2', '2 × 3', '3 × 2'],
          correctIndex: 1,
          explanation: 'Product of (m × n) and (n × p) yields order (m × p) = 2 × 2.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Remainder & Factor Theorem',
          prompt: 'If (x − 2) is a factor of f(x) = x³ − kx + 2, find the value of k:',
          options: ['3', '4', '5', '6'],
          correctIndex: 2,
          explanation: 'f(2) = 0 → 8 − 2k + 2 = 0 → 2k = 10 → k = 5.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Circles Tangent-Secant',
          prompt: 'A tangent PT of length 6 cm touches a circle from external point P, while secant PAB passes with PA = 4 cm. Find total length PB:',
          options: ['8 cm', '9 cm', '10 cm', '12 cm'],
          correctIndex: 1,
          explanation: 'Tangent-secant theorem: PT² = PA × PB → 36 = 4 × PB → PB = 9 cm.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Ratio Componendo-Dividendo',
          prompt: 'If (3x + 4y) : (3x − 4y) = 5 : 1, find the ratio x : y using Componendo and Dividendo:',
          options: ['2 : 1', '1 : 2', '3 : 2', '4 : 3'],
          correctIndex: 0,
          explanation: '(3x)/(4y) = (5+1)/(5−1) = 6/4 = 3/2 → x/y = (3/2)×(4/3) = 2/1.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'ICSE Board Class 10 • Prepositions, Tense Sequence & Synthesis',
      marathiSubtitle: 'ICSE Class 10 • CISCE English Paper 1 Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'CISCE Preposition Mastery',
          prompt: 'Choose the exact phrasal verb: "Due to dense fog, the morning flight had to be called ___."',
          options: ['off', 'on', 'up', 'into'],
          correctIndex: 0,
          explanation: '"Call off" means cancel an event or flight.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Not Only...But Also',
          prompt: 'Rewrite properly starting with "Not only": "She plays the sitar and composes orchestral symphonies."',
          options: [
            'Not only she plays the sitar but also composes orchestral symphonies.',
            'Not only does she play the sitar, but she also composes orchestral symphonies.',
            'Not only does she played sitar, but also composes symphonies.',
            'Not only did she plays sitar, but also compose.'
          ],
          correctIndex: 1,
          explanation: 'Opening a sentence with "Not only" requires subject-auxiliary inversion ("does she play").'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Phrasal Verb Nuance',
          prompt: 'Complete: "A true friend always stands ___ you during difficult examinations."',
          options: ['by', 'upon', 'across', 'from'],
          correctIndex: 0,
          explanation: '"Stand by" means support loyally in hard times.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Question Tag Exceptions',
          prompt: 'Select the accurate tag: "Let us revise CISCE Physics numericals tonight, ___?"',
          options: ['will we?', 'shall we?', 'aren’t we?', 'do we?'],
          correctIndex: 1,
          explanation: 'Proposals starting with "Let us / Let’s" take "shall we?" as tag.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Prefer ... To Rule',
          prompt: 'Standard ICSE grammar pairs "prefer" with preposition "to" ("I prefer tea to coffee"), never "than".',
          options: ['True', 'False', 'Uses prefer than', 'Uses prefer over than'],
          correctIndex: 0,
          explanation: 'Correct English usage is "prefer X to Y".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'ICSE Board Class 10 • Calorimetry, Electrolysis & Genetics',
      marathiSubtitle: 'ICSE Class 10 • Physics, Chemistry & Biology Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Physics • Calorimetry',
          prompt: 'What is the SI unit of Specific Heat Capacity (c) of a substance?',
          options: ['J / kg', 'J / (kg·K)', 'W / m²', 'J · K'],
          correctIndex: 1,
          explanation: 'Q = m c ΔT → c = Q / (m ΔT) has SI unit J kg⁻¹ K⁻¹.'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Chemistry • Hall-Héroult Metallurgy',
          prompt: 'In the Hall-Héroult extraction of aluminium from alumina (Al₂O₃), why is cryolite (Na₃AlF₆) added?',
          options: [
            'To oxidise carbon anodes instantly',
            'To lower the fusion temperature from 2050°C to ~950°C and boost electrical conductivity',
            'To precipitate silver metal',
            'To solidify molten aluminium prematurely'
          ],
          correctIndex: 1,
          explanation: 'Cryolite and fluorspar drastically reduce the melting temperature and improve conductivity.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'ICSE Biology • Transpiration',
          prompt: 'Exudation of tiny liquid water droplets along leaf margins of garden nasturtium early morning is called ___.',
          options: ['osmosis', 'guttation', 'plasmolysis', 'active uptake'],
          correctIndex: 1,
          explanation: 'Guttation occurs through hydathodes under high root pressure.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Chemistry • IUPAC Organic',
          prompt: 'The functional group −CHO represents an Aldehyde, taking the IUPAC suffix "-al" (e.g., Ethanal).',
          options: ['True', 'False', 'It is a ketone (-one)', 'It is an alcohol (-ol)'],
          correctIndex: 0,
          explanation: 'Aldehydes carry terminal −CHO and suffix "-al".'
        },
        {
          format: 'science_activity',
          chapterTitle: 'ICSE Physics • Alpha Decay',
          prompt: 'When an atomic nucleus emits one alpha (α) particle (⁴₂He), its atomic number Z decreases by ___ and mass number A decreases by 4.',
          options: ['1', '2', '3', '4'],
          correctIndex: 1,
          explanation: 'An alpha particle consists of 2 protons and 2 neutrons (Z − 2, A − 4).'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'ICSE Board Class 10 • Java Arrays/Strings, Cabinet & Monsoon',
      marathiSubtitle: 'ICSE Class 10 • Computer Apps, History-Civics & GK Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Java Constructors (ICSE 10)',
          prompt: 'In ICSE Java Computer Applications, which statement is TRUE about a Constructor?',
          options: [
            'It returns int by default',
            'It bears the exact same name as its class and has NO return type',
            'It can only be called inside loops',
            'It deletes memory variables'
          ],
          correctIndex: 1,
          explanation: 'A constructor has the class name, no return type (not even void), and initialises objects.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Java String Output',
          prompt: 'Evaluate in Java: "COMPUTER".substring(3, 6) returns ___.',
          options: ['COM', 'PUT', 'MPUT', 'TER'],
          correctIndex: 1,
          explanation: 'Indices 3, 4, 5 (6 exclusive) of C(0)O(1)M(2)P(3)U(4)T(5)E(6)R(7) yield "PUT".'
        },
        {
          format: 'mcq',
          chapterTitle: 'ICSE Civics • Money Bill',
          prompt: 'Which Presiding Officer holds final authority to certify whether a parliamentary bill is a Money Bill in India?',
          options: [
            'Chief Justice of India',
            'Speaker of the Lok Sabha',
            'Election Commissioner',
            'Governor of RBI'
          ],
          correctIndex: 1,
          explanation: 'Under Article 110, the Speaker of the Lok Sabha certifies Money Bills.'
        },
        {
          format: 'match_following',
          chapterTitle: 'ICSE History • Quit India',
          prompt: 'On which historic date did the All-India Congress Committee pass the Quit India Resolution in Bombay?',
          options: ['15 August 1942', '8 August 1942', '26 January 1930', '13 April 1919'],
          correctIndex: 1,
          explanation: 'The Quit India Resolution was passed at Gowalia Tank Maidan on 8 August 1942.'
        },
        {
          format: 'true_false',
          chapterTitle: 'ICSE Geography • Laterite Soil',
          prompt: 'Laterite soil formed under intense tropical rainfall leaching is ideal for tea, coffee, and cashew crops after manuring.',
          options: ['True', 'False', 'Found only in snowy peaks', 'Formed in arid sand dunes'],
          correctIndex: 0,
          explanation: 'Leached acidic laterite soils in Western Ghats hills support plantation crops.'
        }
      ]
    }
  ]
};
