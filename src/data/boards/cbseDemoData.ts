import { ClassLevel } from '../../types';
import type { ClassDemoQuestion } from '../demoQuestionsData';
import type { DemoWorksheetSpec } from '../classDemoWorksheetsData';

/**
 * Strictly 2 unique, NCERT/NCF-SE aligned CBSE demo questions per class (Class 1 to Class 10).
 * Zero overlap with Maharashtra or ICSE demo questions.
 */
export const CBSE_DEMO_QUESTIONS_BY_CLASS: Record<
  ClassLevel,
  readonly [ClassDemoQuestion, ClassDemoQuestion]
> = {
  'Class 1': [
    {
      id: 'demo-cbse-c1-q1',
      classLevel: 'Class 1',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'Joyful Math • Counting in Tens & Ones',
      question:
        'Under NCERT Joyful Mathematics, Kabir collects 2 bundles of ten sticks and 6 loose sticks. Which number does he have?',
      options: ['24', '26', '62', '16'],
      correctIndex: 1,
      explanation: '2 tens (20) plus 6 ones equals 26 sticks.'
    },
    {
      id: 'demo-cbse-c1-q2',
      classLevel: 'Class 1',
      board: 'CBSE',
      subject: 'English',
      topic: 'Mridang • Pronouns & Naming Words',
      question:
        'Select the word that correctly replaces the boy’s name in: "Rohan is reading a storybook. ___ likes pictures."',
      options: ['She', 'He', 'It', 'They'],
      correctIndex: 1,
      explanation: '"He" is the pronoun used for one boy ("Rohan").'
    }
  ],
  'Class 2': [
    {
      id: 'demo-cbse-c2-q1',
      classLevel: 'Class 2',
      board: 'CBSE',
      subject: 'Science',
      topic: 'World Around Us • Healthy Food',
      question:
        'Which food group gives our body immediate energy to run, jump, and play outdoor games?',
      options: [
        'Chapati and rice (energy-giving foods)',
        'Chalk powder',
        'Dry pebbles',
        'Plastic toys'
      ],
      correctIndex: 0,
      explanation:
        'Cereals such as wheat chapati and rice are carbohydrate-rich energy-giving foods.'
    },
    {
      id: 'demo-cbse-c2-q2',
      classLevel: 'Class 2',
      board: 'CBSE',
      subject: 'General Knowledge',
      topic: 'National Festivals of India',
      question:
        'Which national festival of India is celebrated every year on 26th January to mark the adoption of our Constitution?',
      options: ['Gandhi Jayanti', 'Republic Day', 'Independence Day', 'Children’s Day'],
      correctIndex: 1,
      explanation:
        'Republic Day is celebrated on 26th January because the Constitution of India came into effect on 26 January 1950.'
    }
  ],
  'Class 3': [
    {
      id: 'demo-cbse-c3-q1',
      classLevel: 'Class 3',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'Maths Mela • 3-Digit Expanded Form',
      question:
        'In CBSE Maths Mela Class 3, what is the expanded form of the number 735?',
      options: [
        '700 + 30 + 5',
        '70 + 300 + 5',
        '7 + 3 + 5',
        '700 + 50 + 3'
      ],
      correctIndex: 0,
      explanation: '7 hundreds (700) + 3 tens (30) + 5 ones (5) = 735.'
    },
    {
      id: 'demo-cbse-c3-q2',
      classLevel: 'Class 3',
      board: 'CBSE',
      subject: 'Science',
      topic: 'Our Wondrous World • Photosynthesis Intro',
      question:
        'Which green substance inside plant leaves traps sunlight energy so the plant can prepare its own food?',
      options: ['Haemoglobin', 'Chlorophyll', 'Calcium', 'Starch'],
      correctIndex: 1,
      explanation:
        'Chlorophyll is the green pigment in leaves that absorbs sunlight for photosynthesis.'
    }
  ],
  'Class 4': [
    {
      id: 'demo-cbse-c4-q1',
      classLevel: 'Class 4',
      board: 'CBSE',
      subject: 'English',
      topic: 'Santoor • Degrees of Comparison',
      question:
        'Complete the CBSE Class 4 grammar sentence: "Mount Everest is the ___ mountain peak in the world."',
      options: ['high', 'higher', 'highest', 'most high'],
      correctIndex: 2,
      explanation:
        'When comparing more than two peaks ("in the world"), we use the superlative degree "highest".'
    },
    {
      id: 'demo-cbse-c4-q2',
      classLevel: 'Class 4',
      board: 'CBSE',
      subject: 'General Knowledge',
      topic: 'Indian Heritage & Rivers',
      question:
        'Which Himalayan river flows through Rishikesh and Varanasi before draining into the Bay of Bengal?',
      options: ['River Narmada', 'River Ganga', 'River Tapi', 'River Kaveri'],
      correctIndex: 1,
      explanation:
        'The Ganga rises from Gangotri in the Himalayas and flows past Rishikesh, Haridwar, Prayagraj, and Varanasi to the Bay of Bengal.'
    }
  ],
  'Class 5': [
    {
      id: 'demo-cbse-c5-q1',
      classLevel: 'Class 5',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'Angles & Polygons',
      question:
        'If a wall clock shows 3:00, what type of angle is formed between the hour hand and minute hand?',
      options: [
        'Acute angle (less than 90°)',
        'Right angle (exactly 90°)',
        'Obtuse angle (more than 90°)',
        'Straight angle (180°)'
      ],
      correctIndex: 1,
      explanation:
        'At 3:00, the hands point to 12 and 3, forming one-quarter of a full turn, which is a 90° right angle.'
    },
    {
      id: 'demo-cbse-c5-q2',
      classLevel: 'Class 5',
      board: 'CBSE',
      subject: 'Science',
      topic: 'NCERT • Seed Dispersal & Germination',
      question:
        'Why do coconut fruits have a thick fibrous outer husk that helps them travel to distant coastal islands?',
      options: [
        'To explode loudly in dry heat',
        'To stick onto animal fur using hooks',
        'To float easily on ocean water for dispersal',
        'To attract bees with bright nectar'
      ],
      correctIndex: 2,
      explanation:
        'Coconut seeds disperse by water because their spongy fibrous husk traps air and keeps them buoyant.'
    }
  ],
  'Class 6': [
    {
      id: 'demo-cbse-c6-q1',
      classLevel: 'Class 6',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'Ganita Prakash • Prime Time (HCF)',
      question:
        'Using CBSE Ganita Prakash Class 6 Prime Time, what is the Highest Common Factor (HCF) of 24 and 36?',
      options: ['6', '8', '12', '18'],
      correctIndex: 2,
      explanation:
        'Factors of 24 are 1,2,3,4,6,8,12,24 and factors of 36 include 1,2,3,4,6,9,12,18,36. The highest common factor is 12.'
    },
    {
      id: 'demo-cbse-c6-q2',
      classLevel: 'Class 6',
      board: 'CBSE',
      subject: 'Science',
      topic: 'NCERT Curiosity • Magnets & Poles',
      question:
        'When a bar magnet is suspended freely in mid-air away from iron objects, in which geographical direction does it align itself?',
      options: ['East–West', 'North–South', 'North-East only', 'Upward–Downward'],
      correctIndex: 1,
      explanation:
        'A freely suspended bar magnet always aligns along the Earth’s geographical North–South direction.'
    }
  ],
  'Class 7': [
    {
      id: 'demo-cbse-c7-q1',
      classLevel: 'Class 7',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'NCERT • Simple Linear Equations',
      question:
        'Solve the NCERT Class 7 linear equation: 4p − 7 = 21. What is the value of p?',
      options: ['5', '6', '7', '8'],
      correctIndex: 2,
      explanation: 'Adding 7 to both sides gives 4p = 28, so p = 28 ÷ 4 = 7.'
    },
    {
      id: 'demo-cbse-c7-q2',
      classLevel: 'Class 7',
      board: 'CBSE',
      subject: 'Science',
      topic: 'NCERT • Heat & Sea Breeze',
      question:
        'By which mode of heat transfer does warm air rise above daytime coastal land to create a cool sea breeze?',
      options: ['Conduction', 'Convection', 'Evaporation', 'Sublimation'],
      correctIndex: 1,
      explanation:
        'Sea breeze is caused by convection currents as warm air over heated land rises and cooler air from the sea rushes in.'
    }
  ],
  'Class 8': [
    {
      id: 'demo-cbse-c8-q1',
      classLevel: 'Class 8',
      board: 'CBSE',
      subject: 'English',
      topic: 'NCERT Honeydew • Active-Passive & Modals',
      question:
        'Choose the correct modal verb showing polite permission: "___ I borrow your NCERT science atlas for tonight?"',
      options: ['Must', 'May', 'Ought', 'Shall'],
      correctIndex: 1,
      explanation: '"May I..." is the standard polite modal used to ask permission.'
    },
    {
      id: 'demo-cbse-c8-q2',
      classLevel: 'Class 8',
      board: 'CBSE',
      subject: 'General Knowledge',
      topic: 'Constitutional Bodies & ISRO',
      question:
        'Which body in India recommends the sharing of taxes between the Union Government and the States under Article 280?',
      options: [
        'Election Commission',
        'Finance Commission of India',
        'Reserve Bank Board',
        'National Green Tribunal'
      ],
      correctIndex: 1,
      explanation:
        'Under Article 280 of the Constitution, the President constitutes the Finance Commission every five years.'
    }
  ],
  'Class 9': [
    {
      id: 'demo-cbse-c9-q1',
      classLevel: 'Class 9',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'NCERT • Remainder Theorem & Polynomials',
      question:
        'According to NCERT Class 9 Polynomials, what is the remainder when p(x) = x² − 3x + 5 is divided by (x − 2)?',
      options: ['1', '3', '5', '7'],
      correctIndex: 1,
      explanation:
        'By the Remainder Theorem, remainder = p(2) = (2)² − 3(2) + 5 = 4 − 6 + 5 = 3.'
    },
    {
      id: 'demo-cbse-c9-q2',
      classLevel: 'Class 9',
      board: 'CBSE',
      subject: 'Science',
      topic: 'NCERT Physics • Newton’s Second Law',
      question:
        'A horizontal net force of 30 N accelerates a trolley of mass 6 kg across a smooth track. What is its acceleration?',
      options: ['3 m/s²', '5 m/s²', '24 m/s²', '180 m/s²'],
      correctIndex: 1,
      explanation:
        'Using F = m × a, acceleration a = F / m = 30 N / 6 kg = 5 m/s².'
    }
  ],
  'Class 10': [
    {
      id: 'demo-cbse-c10-q1',
      classLevel: 'Class 10',
      board: 'CBSE',
      subject: 'Mathematics',
      topic: 'CBSE Board • Trigonometric Identities',
      question:
        'In CBSE Class 10 Trigonometry, evaluate the expression: 9 sec²A − 9 tan²A.',
      options: ['0', '1', '9', '8'],
      correctIndex: 2,
      explanation:
        'Factoring 9 gives 9(sec²A − tan²A). Since 1 + tan²A = sec²A, sec²A − tan²A = 1, so 9 × 1 = 9.'
    },
    {
      id: 'demo-cbse-c10-q2',
      classLevel: 'Class 10',
      board: 'CBSE',
      subject: 'Science',
      topic: 'CBSE Board • Equivalent Resistance',
      question:
        'Two resistors of 6 Ω and 3 Ω are connected in parallel in a CBSE Physics lab circuit. What is their equivalent resistance?',
      options: ['9 Ω', '4.5 Ω', '2 Ω', '1.5 Ω'],
      correctIndex: 2,
      explanation:
        'For parallel resistors, 1/Rp = 1/6 + 1/3 = 3/6 = 1/2, hence Rp = 2 Ω.'
    }
  ]
};

/**
 * Strictly 4 unique CBSE Demo Worksheets per class (Class 1 to Class 10 = 40 total worksheets).
 * Every question prompt is unique across all classes and boards.
 */
export const CBSE_DEMO_WORKSHEETS_BANK: Record<
  ClassLevel,
  readonly [DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec]
> = {
  'Class 1': [
    {
      subject: 'Mathematics',
      chapterName: 'Joyful Mathematics • Numbers 1–99 & Shapes',
      marathiSubtitle: 'CBSE Class 1 • NCERT Mathematics Practice Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Counting Tens & Ones',
          prompt: 'If 3 tens and 4 ones are placed on an abacus, which number is shown?',
          options: ['43', '34', '30', '13'],
          correctIndex: 1,
          explanation: '3 tens = 30 and 4 ones = 4, together making 34.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Skip Counting by 2s',
          prompt: 'Complete the CBSE Joyful Math skip sequence: 4, 6, 8, ___, 12.',
          options: ['9', '10', '11', '7'],
          correctIndex: 1,
          explanation: 'Adding 2 to 8 gives 10.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Solid Shapes Around Us',
          prompt: 'Which object rolls smoothly like a sphere on the classroom floor?',
          options: ['Chalk box', 'Cricket ball', 'Eraser block', 'Wooden ruler'],
          correctIndex: 1,
          explanation: 'A round cricket ball is shaped like a sphere and rolls easily.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Indian Coin Addition',
          prompt: 'Diya puts one ₹5 coin and two ₹2 coins into her piggy bank. How much money did she save?',
          options: ['₹7', '₹8', '₹9', '₹10'],
          correctIndex: 2,
          explanation: '₹5 + ₹2 + ₹2 = ₹9.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Ordinal Numbers',
          prompt: 'In a queue of 5 children standing front to back, which child stands right between 2nd and 4th?',
          options: ['1st child', '3rd child', '5th child', '6th child'],
          correctIndex: 1,
          explanation: 'Between 2nd and 4th position is the 3rd position.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Mridang Class 1 • Rhymes, Opposites & Vowels',
      marathiSubtitle: 'CBSE Class 1 • NCERT English Practice Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Opposite Words',
          prompt: 'Choose the opposite word of "HOT" as used when drinking milk:',
          options: ['Warm', 'Cold', 'Sweet', 'Soft'],
          correctIndex: 1,
          explanation: 'Cold is the opposite of hot.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Naming Words',
          prompt: 'Which word in the list names a PLACE you visit with parents?',
          options: ['Run', 'Park', 'Laugh', 'Yellow'],
          correctIndex: 1,
          explanation: 'Park is the name of a place (a noun).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'This / These Grammar',
          prompt: 'Fill in the blank for many flowers in your hand: "___ are red roses."',
          options: ['This', 'That', 'These', 'Is'],
          correctIndex: 2,
          explanation: '"These" is used with plural objects near the speaker.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Ending Sounds',
          prompt: 'Pick the word that shares the same ending sound as "BELL":',
          options: ['BOAT', 'WELL', 'BALL', 'BIKE'],
          correctIndex: 1,
          explanation: 'BELL and WELL both end with "-ell".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Sentence Capitalisation',
          prompt: 'Every complete English sentence should begin with a Capital Letter and end with a full stop or question mark.',
          options: ['True', 'False', 'Only numbers need capitals', 'Sentences end with commas'],
          correctIndex: 0,
          explanation: 'Sentences always begin with a capital letter.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'World Around Us • Body, Water & Nature',
      marathiSubtitle: 'CBSE Class 1 • Environmental Readiness Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Healthy Habits',
          prompt: 'What must we do with soap and clean water right before eating lunch?',
          options: ['Wash our hands thoroughly', 'Paint our nails', 'Wear sunglasses', 'Brush our shoes'],
          correctIndex: 0,
          explanation: 'Washing hands with soap removes germs before eating.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Parts of a Plant',
          prompt: 'Which colourful part of a rose plant attracts butterflies in a garden?',
          options: ['Root', 'Flower', 'Bark', 'Thorn'],
          correctIndex: 1,
          explanation: 'Brightly coloured flowers attract insects such as butterflies and bees.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Sources of Water',
          prompt: 'All rivers, lakes, and wells get replenished naturally when ___ falls from clouds.',
          options: ['dust', 'rainwater', 'smoke', 'sand'],
          correctIndex: 1,
          explanation: 'Rain is the primary natural source of fresh water on Earth.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Day & Night Sky',
          prompt: 'We can safely see constellations of stars shining in the clear sky during midnight.',
          options: ['True', 'False', 'Stars glow only inside caves', 'Moon disappears forever'],
          correctIndex: 0,
          explanation: 'Stars twinkle in the night sky when sunlight does not outshine them.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Animal Shelters',
          prompt: 'Which farm animal is kept safely inside a stable?',
          options: ['Duck', 'Horse', 'Spider', 'Frog'],
          correctIndex: 1,
          explanation: 'A stable is the shelter built for horses.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE General Awareness • Seasons & Symbols',
      marathiSubtitle: 'CBSE Class 1 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Days of the Week',
          prompt: 'If today is Thursday, which day of the week will tomorrow be?',
          options: ['Wednesday', 'Friday', 'Saturday', 'Monday'],
          correctIndex: 1,
          explanation: 'Friday immediately follows Thursday.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Colours of Indian Flag',
          prompt: 'The topmost horizontal band of the Indian National Tricolour Flag is Deep ___.',
          options: ['Green', 'Saffron (Kesari)', 'Blue', 'Yellow'],
          correctIndex: 1,
          explanation: 'The Indian Tricolour has Saffron at the top, White in the middle, and Green at the bottom.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Road Traffic Light',
          prompt: 'What does a glowing GREEN traffic light signal tell vehicles to do?',
          options: ['Stop immediately', 'Go safely', 'Honk loudly', 'Park permanently'],
          correctIndex: 1,
          explanation: 'Green means Go, Red means Stop, and Amber/Yellow means Wait.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Our Helpers',
          prompt: 'Who repairs leaking taps and water pipes inside our homes?',
          options: ['Carpenter', 'Plumber', 'Tailor', 'Cobbler'],
          correctIndex: 1,
          explanation: 'A plumber fits and repairs water pipes and taps.'
        },
        {
          format: 'true_false',
          chapterTitle: 'National Flower',
          prompt: 'Lotus is recognised as the National Flower of India.',
          options: ['True', 'False', 'Sunflower is the national flower', 'Marigold only'],
          correctIndex: 0,
          explanation: 'The Lotus (Nelumbo nucifera) is India’s national flower.'
        }
      ]
    }
  ],
  'Class 2': [
    {
      subject: 'Mathematics',
      chapterName: 'Joyful Math 2 • Counting Groups & Subtraction',
      marathiSubtitle: 'CBSE Class 2 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Repeated Addition',
          prompt: 'There are 4 trays with 5 laddoos in each tray. How many laddoos are there altogether?',
          options: ['9', '16', '20', '25'],
          correctIndex: 2,
          explanation: '4 groups of 5 = 5 + 5 + 5 + 5 = 20 laddoos.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Two-Digit Subtraction',
          prompt: 'Solve: 64 − 29 = ___.',
          options: ['35', '45', '33', '43'],
          correctIndex: 0,
          explanation: 'Regrouping 1 ten from 6 tens leaves 14 − 9 = 5 ones and 5 − 2 = 3 tens → 35.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Calendar Months',
          prompt: 'How many days are there in the month of July according to the Gregorian calendar?',
          options: ['28', '29', '30', '31'],
          correctIndex: 3,
          explanation: 'July has 31 days.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Measurement Comparison',
          prompt: 'A ribbon measures 45 cm and another ribbon measures 35 cm. What is their combined length?',
          options: ['70 cm', '80 cm', '90 cm', '10 cm'],
          correctIndex: 1,
          explanation: '45 cm + 35 cm = 80 cm.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Pattern Rule',
          prompt: 'Find the missing number in the backward count: 90, 80, 70, ___, 50.',
          options: ['65', '60', '55', '40'],
          correctIndex: 1,
          explanation: 'The numbers decrease by 10 at each step, so 70 − 10 = 60.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Mridang 2 • Describing Words & Plurals',
      marathiSubtitle: 'CBSE Class 2 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Describing Words',
          prompt: 'Identify the adjective (describing word) in: "Neema ate a sweet mango."',
          options: ['Neema', 'ate', 'sweet', 'mango'],
          correctIndex: 2,
          explanation: '"Sweet" describes the noun "mango", so it is an adjective.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Plurals with -es',
          prompt: 'What is the correct plural of the word "mango"?',
          options: ['mangos', 'mangoes', 'mangies', 'mangoed'],
          correctIndex: 1,
          explanation: 'Singular nouns like "mango" take "-es" to become "mangoes".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Prepositions of Place',
          prompt: 'Choose the right preposition: "The sleeping cat is ___ the wooden table."',
          options: ['under', 'between', 'among', 'into'],
          correctIndex: 0,
          explanation: '"Under" describes a position directly below the table.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Has / Have Usage',
          prompt: 'Complete the sentence: "Two playful squirrels ___ bushy tails."',
          options: ['has', 'have', 'was', 'is'],
          correctIndex: 1,
          explanation: 'With plural subjects ("Two playful squirrels"), we use "have".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Gender Pairs',
          prompt: 'The feminine gender pair for "King" is "Queen".',
          options: ['True', 'False', 'It is Prince', 'It is Princess'],
          correctIndex: 0,
          explanation: 'King (masculine) pairs with Queen (feminine).'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'World Around Us 2 • Air, Weather & Seasons',
      marathiSubtitle: 'CBSE Class 2 • Environmental Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Types of Houses',
          prompt: 'In regions with heavy snowfall such as Arctic tundra, dome-shaped snow houses are called:',
          options: ['Houseboats', 'Igloos', 'Tents', 'Bungalows'],
          correctIndex: 1,
          explanation: 'Igloos are snow-block dome shelters built in frozen polar regions.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Seasonal Clothing',
          prompt: 'Why do we wear light-coloured cotton clothes during hot Indian summer afternoons?',
          options: [
            'Cotton absorbs sweat and lets air circulate',
            'Cotton traps body heat tightly',
            'Cotton is waterproof like plastic',
            'Cotton weighs more than wool'
          ],
          correctIndex: 0,
          explanation: 'Light cotton fabric absorbs perspiration and keeps the body cool.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Properties of Air',
          prompt: 'Moving air that turns windmill blades and dries wet clothes is called ___.',
          options: ['steam', 'wind', 'fog', 'frost'],
          correctIndex: 1,
          explanation: 'Air in motion is termed wind.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Plant Care',
          prompt: 'Trees purify air by taking in carbon dioxide and releasing oxygen during daytime.',
          options: ['True', 'False', 'Trees release smoke', 'Plants never need air'],
          correctIndex: 0,
          explanation: 'During photosynthesis, green plants release oxygen.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Natural Fibres',
          prompt: 'From which insect cocoon do we obtain smooth natural silk thread?',
          options: ['Honeybee', 'Silkworm', 'Grasshopper', 'Mosquito'],
          correctIndex: 1,
          explanation: 'Silkworms spin cocoons from which silk fibre is spun.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 2 • States, Monuments & Nature GK',
      marathiSubtitle: 'CBSE Class 2 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Monuments of India',
          prompt: 'In which Indian city is the white marble Taj Mahal located?',
          options: ['Jaipur', 'Agra', 'Bhopal', 'Patna'],
          correctIndex: 1,
          explanation: 'The Taj Mahal stands on the banks of the Yamuna River in Agra, Uttar Pradesh.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Solar System',
          prompt: 'The ___ rises in the East every morning and gives Earth light and warmth.',
          options: ['Moon', 'Sun', 'Comet', 'Saturn'],
          correctIndex: 1,
          explanation: 'The Sun is the star at the centre of our Solar System.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Currency',
          prompt: 'Whose portrait appears on all Indian Rupee currency notes?',
          options: [
            'Mahatma Gandhi',
            'Bhagat Singh',
            'Dr. C. V. Raman',
            'Rani Lakshmibai'
          ],
          correctIndex: 0,
          explanation: 'Mahatma Gandhi’s portrait is printed on the Mahatma Gandhi series Indian banknotes.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Young Ones of Animals',
          prompt: 'What is a baby kangaroo called?',
          options: ['Cub', 'Joey', 'Calf', 'Foal'],
          correctIndex: 1,
          explanation: 'A young kangaroo is called a joey.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Oceans on Earth',
          prompt: 'Earth is often called the "Blue Planet" because nearly 71% of its surface is covered with water.',
          options: ['True', 'False', 'Earth has no oceans', 'Earth is covered only in ice'],
          correctIndex: 0,
          explanation: 'About three-fourths of Earth’s surface is covered by oceans and water bodies.'
        }
      ]
    }
  ],
  'Class 3': [
    {
      subject: 'Mathematics',
      chapterName: 'Maths Mela 3 • Multiplication, Fractions & Time',
      marathiSubtitle: 'CBSE Class 3 • NCERT Maths Mela Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Double Century Numbers',
          prompt: 'How much must be added to 165 to make a double century (200)?',
          options: ['25', '35', '45', '55'],
          correctIndex: 1,
          explanation: '200 − 165 = 35.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Fair Share Fractions',
          prompt: 'When 1 whole chapati is cut into 4 equal quarters, each piece is written as ___.',
          options: ['1/2', '1/3', '1/4', '3/4'],
          correctIndex: 2,
          explanation: 'One part out of 4 equal parts represents the fraction 1/4.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Multiplication Facts',
          prompt: 'A school van carries 14 students per trip. How many students can it carry in 5 trips?',
          options: ['60', '65', '70', '75'],
          correctIndex: 2,
          explanation: '14 × 5 = 70 students.'
        },
        {
          format: 'math_exercise',
          chapterTitle: '3-Digit Addition',
          prompt: 'A library has 248 storybooks and buys 137 new science books. Total books now =',
          options: ['375', '385', '395', '365'],
          correctIndex: 1,
          explanation: '248 + 137 = 385.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Time Elapsed',
          prompt: 'A cartoon movie starts at 4:15 PM and lasts 45 minutes. At what time does it finish?',
          options: ['4:50 PM', '5:00 PM', '5:15 PM', '4:45 PM'],
          correctIndex: 1,
          explanation: '15 minutes + 45 minutes = 60 minutes = 1 hour after 4:00 PM → 5:00 PM.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Santoor Class 3 • Pronouns, Articles & Tenses',
      marathiSubtitle: 'CBSE Class 3 • NCERT Santoor English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Articles',
          prompt: 'Insert the correct article: "We saw ___ one-horned rhinoceros at Kaziranga."',
          options: ['a', 'an', 'were', 'those'],
          correctIndex: 0,
          explanation: '"One" begins with the consonant sound /w/ ("wun"), so we use "a".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Simple Past Tense',
          prompt: 'Choose the past tense form of the verb "WRITE":',
          options: ['writed', 'wrote', 'writing', 'writes'],
          correctIndex: 1,
          explanation: 'The simple past tense of write is "wrote".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Conjunctions',
          prompt: 'Join neatly: "I carried an umbrella ___ it looked cloudy outside."',
          options: ['but', 'because', 'or', 'unless'],
          correctIndex: 1,
          explanation: '"Because" introduces the reason for carrying an umbrella.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Homophones',
          prompt: 'Choose the right homophone: "The cool sea ___ blew across the boat."',
          options: ['here', 'breeze', 'peace', 'piece'],
          correctIndex: 1,
          explanation: 'A gentle wind is spelled "breeze".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Proper Nouns',
          prompt: 'Names of cities such as Bengaluru, Jaipur, and Kochi must always begin with a capital letter.',
          options: ['True', 'False', 'Only at sentence end', 'Cities are verbs'],
          correctIndex: 0,
          explanation: 'Proper nouns—like city, river, and person names—always start with a capital letter.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Our Wondrous World 3 • Matter, Plants & Digestive System',
      marathiSubtitle: 'CBSE Class 3 • NCERT Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'States of Matter',
          prompt: 'Which state of matter takes the exact shape of whatever cup or bottle you pour it into, while keeping its volume fixed?',
          options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
          correctIndex: 1,
          explanation: 'Liquids flow to take the container’s shape while keeping a definite volume.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Bird Adaptations',
          prompt: 'Why do ducks and swans have webbed feet?',
          options: [
            'To dig deep tunnels underground',
            'To paddle and swim smoothly in water',
            'To crack hard walnuts',
            'To grip tall branches while sleeping'
          ],
          correctIndex: 1,
          explanation: 'Webbed feet act like oars to push water while swimming.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Seed Germination',
          prompt: 'A baby plant hidden inside a dry bean seed needs warmth, air, and ___ to sprout.',
          options: ['kerosene', 'water', 'vinegar', 'smoke'],
          correctIndex: 1,
          explanation: 'Moisture (water), oxygen, and suitable warmth trigger seed germination.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Human Respiratory System',
          prompt: 'The diaphragm and pair of lungs inside our chest help us breathe oxygen in and carbon dioxide out.',
          options: ['True', 'False', 'Stomach performs breathing', 'Bones absorb oxygen gas'],
          correctIndex: 0,
          explanation: 'The lungs are the primary organs of gas exchange in human respiration.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Soil Formation',
          prompt: 'Which dead plant and animal matter enriches topsoil and keeps it fertile?',
          options: ['Humus', 'Gravel', 'Plastic flakes', 'Broken glass'],
          correctIndex: 0,
          explanation: 'Humus is dark organic matter formed by decayed leaves and organisms.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 3 • India States, Sports & Space',
      marathiSubtitle: 'CBSE Class 3 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Classical Dances of India',
          prompt: 'Bharatanatyam is a famous classical dance form that originated in which state of India?',
          options: ['Punjab', 'Tamil Nadu', 'Assam', 'Odisha'],
          correctIndex: 1,
          explanation: 'Bharatanatyam originated in the temples of Tamil Nadu.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Indian Space Agency',
          prompt: 'The full form of ISRO is the Indian Space ___ Organisation.',
          options: ['Rocket', 'Research', 'Radio', 'Radar'],
          correctIndex: 1,
          explanation: 'ISRO stands for Indian Space Research Organisation.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Famous Authors',
          prompt: 'Who wrote the national anthem of India, "Jana Gana Mana"?',
          options: [
            'Bankim Chandra Chattopadhyay',
            'Rabindranath Tagore',
            'Sarojini Naidu',
            'Subramania Bharati'
          ],
          correctIndex: 1,
          explanation: 'Nobel laureate Rabindranath Tagore composed "Jana Gana Mana".'
        },
        {
          format: 'match_following',
          chapterTitle: 'Inventions',
          prompt: 'Who invented the practical incandescent electric light bulb?',
          options: [
            'Thomas Alva Edison',
            'Wright Brothers',
            'Graham Bell',
            'Guglielmo Marconi'
          ],
          correctIndex: 0,
          explanation: 'Thomas Alva Edison developed the commercially practical electric light bulb.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Continents',
          prompt: 'Asia is the largest continent in the world by both land area and population.',
          options: ['True', 'False', 'Australia is largest', 'Europe is largest'],
          correctIndex: 0,
          explanation: 'Asia covers nearly 30% of Earth’s land surface, making it the largest continent.'
        }
      ]
    }
  ],
  'Class 4': [
    {
      subject: 'Mathematics',
      chapterName: 'Maths Mela 4 • Factors, Fractions & Perimeter',
      marathiSubtitle: 'CBSE Class 4 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Perimeter of Square',
          prompt: 'A square carrom board has each side equal to 75 cm. What is its perimeter?',
          options: ['150 cm', '225 cm', '300 cm', '375 cm'],
          correctIndex: 2,
          explanation: 'Perimeter of a square = 4 × side = 4 × 75 cm = 300 cm.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Roman Numerals',
          prompt: 'Write the Hindu-Arabic value of the Roman numeral XCV:',
          options: ['85', '95', '105', '45'],
          correctIndex: 1,
          explanation: 'XC = 100 − 10 = 90, and V = 5, so XCV = 95.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Factors & Multiples',
          prompt: 'Which number is a common factor of BOTH 18 and 30?',
          options: ['4', '6', '9', '12'],
          correctIndex: 1,
          explanation: '18 ÷ 6 = 3 and 30 ÷ 6 = 5, so 6 divides both without remainder.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Metric Conversion',
          prompt: 'How many millilitres are present in 4 litres and 250 millilitres of juice?',
          options: ['425 mL', '4,025 mL', '4,250 mL', '42,500 mL'],
          correctIndex: 2,
          explanation: '1 L = 1,000 mL, so 4 L 250 mL = 4,000 + 250 = 4,250 mL.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Division Check',
          prompt: 'When 96 pencils are packed equally into boxes of 8 pencils each, how many boxes are filled?',
          options: ['10', '11', '12', '13'],
          correctIndex: 2,
          explanation: '96 ÷ 8 = 12 boxes.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Santoor 4 • Adverbs, Tenses & Prefix-Suffix',
      marathiSubtitle: 'CBSE Class 4 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Prefixes',
          prompt: 'Add the correct prefix to make the opposite of "POSSIBLE":',
          options: ['un-', 'im-', 'dis-', 'mis-'],
          correctIndex: 1,
          explanation: 'The correct negative form is "impossible".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Subject-Verb Agreement',
          prompt: 'Select the grammatically correct sentence:',
          options: [
            'The flock of migratory birds are flying south.',
            'The flock of migratory birds is flying south.',
            'The flock of migratory birds were fly south.',
            'The flock of migratory birds am flying south.'
          ],
          correctIndex: 1,
          explanation: 'A singular collective noun ("The flock") takes a singular verb ("is").'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Possessive Pronouns',
          prompt: 'Complete: "This science notebook belongs to Meera; it is ___."',
          options: ['her', 'hers', 'she', 'herself'],
          correctIndex: 1,
          explanation: '"Hers" stands alone as a possessive pronoun at the end of a clause.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Types of Sentences',
          prompt: '"Please close the laboratory window quietly." What kind of sentence is this?',
          options: ['Interrogative', 'Imperative', 'Exclamatory', 'Negative'],
          correctIndex: 1,
          explanation: 'A sentence giving a polite request or command is imperative.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Synonyms',
          prompt: 'The words "enormous" and "gigantic" are synonyms meaning very large.',
          options: ['True', 'False', 'They are antonyms', 'They are verbs'],
          correctIndex: 0,
          explanation: 'Enormous and gigantic both mean huge in size.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'CBSE Class 4 • Teeth, Adaptations & Forces',
      marathiSubtitle: 'CBSE Class 4 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Human Teeth Types',
          prompt: 'Which broad, flat back teeth are specially shaped for chewing and grinding solid food?',
          options: ['Incisors', 'Canines', 'Molars', 'Milk buds'],
          correctIndex: 2,
          explanation: 'Molars have broad flat crowns designed for grinding food before swallowing.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Desert Plant Adaptations',
          prompt: 'Why are the leaves of desert cactus plants modified into sharp spines?',
          options: [
            'To absorb extra rainwater quickly',
            'To reduce water loss by transpiration and deter grazing animals',
            'To help the cactus float on ponds',
            'To attract snow clouds'
          ],
          correctIndex: 1,
          explanation: 'Spines minimise surface area so desert plants conserve scarce water.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Water Purification',
          prompt: 'The heavy solid mud particles settle slowly at the bottom of a beaker during ___.',
          options: ['evaporation', 'sedimentation', 'boiling', 'condensation'],
          correctIndex: 1,
          explanation: 'Sedimentation is the settling of heavier insoluble particles under gravity.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Solar Energy',
          prompt: 'Solar panels convert sunlight directly into electrical energy.',
          options: ['True', 'False', 'Solar panels burn coal', 'Solar panels need darkness'],
          correctIndex: 0,
          explanation: 'Photovoltaic solar cells generate electricity directly from sunlight.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Simple Machines',
          prompt: 'A bottle opener and a seesaw both work on the scientific principle of a:',
          options: ['Screw', 'Lever', 'Wedge', 'Pulley'],
          correctIndex: 1,
          explanation: 'Both consist of a rigid bar turning around a fixed fulcrum point—a lever.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 4 • Capitals, Wildlife & Olympics',
      marathiSubtitle: 'CBSE Class 4 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'State Capitals of India',
          prompt: 'Which city is the capital of the northeastern state of Assam?',
          options: ['Guwahati', 'Dispur', 'Shillong', 'Imphal'],
          correctIndex: 1,
          explanation: 'Dispur is the official capital of Assam.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Indian Wildlife Parks',
          prompt: 'Gir National Park in Gujarat is the only natural wild habitat of the ___ Lion.',
          options: ['Bengal', 'Asiatic', 'African', 'Snow'],
          correctIndex: 1,
          explanation: 'Sasan Gir protects the endangered Asiatic Lion.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Olympic Rings',
          prompt: 'How many interlocking coloured rings appear on the official Olympic flag?',
          options: ['4', '5', '6', '7'],
          correctIndex: 1,
          explanation: 'Five rings (blue, yellow, black, green, red) represent the unity of the five inhabited continents.'
        },
        {
          format: 'match_following',
          chapterTitle: 'World Continents',
          prompt: 'Which continent has no permanent human population and holds Earth’s largest ice sheet?',
          options: ['South America', 'Europe', 'Antarctica', 'Africa'],
          correctIndex: 2,
          explanation: 'Antarctica is the frozen southernmost continent with scientific research stations.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Constitution Day',
          prompt: 'India observes Samvidhan Divas (Constitution Day) every year on 26th November.',
          options: ['True', 'False', 'On 15th August only', 'On 1st May'],
          correctIndex: 0,
          explanation: 'The Constituent Assembly adopted the Indian Constitution on 26 November 1949.'
        }
      ]
    }
  ],
  'Class 5': [
    {
      subject: 'Mathematics',
      chapterName: 'CBSE Class 5 • Decimals, Volume & Unitary Method',
      marathiSubtitle: 'CBSE Class 5 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Area & Perimeter',
          prompt: 'A rectangular postcard has length 15 cm and width 10 cm. What is its area?',
          options: ['50 cm²', '100 cm²', '150 cm²', '250 cm²'],
          correctIndex: 2,
          explanation: 'Area = length × width = 15 × 10 = 150 sq. cm.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Decimals Addition',
          prompt: 'Calculate the sum: 4.75 + 2.50 = ___.',
          options: ['6.25', '7.15', '7.25', '7.75'],
          correctIndex: 2,
          explanation: '4.75 + 2.50 = 7.25.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Average (Mean)',
          prompt: 'What is the average of the marks 18, 22, 24, and 16?',
          options: ['19', '20', '21', '22'],
          correctIndex: 1,
          explanation: 'Sum = 18 + 22 + 24 + 16 = 80. Average = 80 ÷ 4 = 20.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Unitary Method',
          prompt: 'If 6 storybooks cost ₹420, what is the cost of 4 such storybooks?',
          options: ['₹240', '₹260', '₹280', '₹300'],
          correctIndex: 2,
          explanation: 'Cost of 1 book = 420 ÷ 6 = ₹70. Cost of 4 books = 70 × 4 = ₹280.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Volume of Cube',
          prompt: 'A cubical chalk box has edge 5 cm. How many 1-cm unit cubes fit inside it completely?',
          options: ['25', '75', '125', '150'],
          correctIndex: 2,
          explanation: 'Volume of cube = side³ = 5 × 5 × 5 = 125 cubic cm.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'CBSE Class 5 • Clauses, Speech & Vocabulary',
      marathiSubtitle: 'CBSE Class 5 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Phrasal Verbs',
          prompt: 'Pick the correct meaning of "give up" in: "Never give up when solving hard puzzles."',
          options: ['Stop trying / quit', 'Wrap a gift box', 'Climb stairs rapidly', 'Borrow money'],
          correctIndex: 0,
          explanation: '"Give up" means to stop trying or surrender effort.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Future Continuous Tense',
          prompt: 'Select the sentence written in the Future Continuous Tense:',
          options: [
            'She plants saplings in the park.',
            'They will be travelling to Shimla tomorrow morning.',
            'We planted mangoes last Sunday.',
            'He has finished his homework.'
          ],
          correctIndex: 1,
          explanation: '"will be + verb-ing" ("will be travelling") marks future continuous tense.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Relative Pronouns',
          prompt: 'Fill in: "That is the astronomer ___ discovered a bright comet."',
          options: ['which', 'who', 'whom', 'whose'],
          correctIndex: 1,
          explanation: '"Who" acts as the subject relative pronoun for a person.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'One-Word Substitution',
          prompt: 'A person who travels in a spacecraft beyond Earth’s atmosphere is called an:',
          options: ['Botanist', 'Astronaut', 'Architect', 'Cartographer'],
          correctIndex: 1,
          explanation: 'An astronaut is trained to travel and work in space.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Abstract Nouns',
          prompt: 'Words like "courage", "wisdom", and "honesty" are Abstract Nouns.',
          options: ['True', 'False', 'They are material nouns', 'They are pronouns'],
          correctIndex: 0,
          explanation: 'Abstract nouns name feelings, qualities, or ideas that cannot be touched physically.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'CBSE Class 5 • Nervous System, Buoyancy & Space',
      marathiSubtitle: 'CBSE Class 5 • Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Human Brain Parts',
          prompt: 'Which largest part of the human brain controls thinking, memory, reasoning, and intelligence?',
          options: ['Cerebrum', 'Spinal cord', 'Ribcage', 'Alveoli'],
          correctIndex: 0,
          explanation: 'The cerebrum governs conscious thought, learning, and memory.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Deficiency Diseases',
          prompt: 'Lack of iodine in everyday diet can lead to swelling of the neck gland called:',
          options: ['Scurvy', 'Rickets', 'Goitre', 'Night blindness'],
          correctIndex: 2,
          explanation: 'Iodine deficiency causes thyroid enlargement known as goitre.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Layers of Atmosphere',
          prompt: 'The protective ___ layer in the stratosphere shields Earth from harmful ultraviolet rays.',
          options: ['nitrogen', 'ozone', 'methane', 'argon'],
          correctIndex: 1,
          explanation: 'The ozone layer absorbs solar UV radiation.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Solubility',
          prompt: 'Common salt dissolves completely in water to form a clear homogeneous solution.',
          options: ['True', 'False', 'Salt settles like sand', 'Salt melts only in oil'],
          correctIndex: 0,
          explanation: 'Salt is water-soluble and forms a clear solution.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Lever Classes',
          prompt: 'When using a pair of scissors, where is the fulcrum located?',
          options: [
            'At the sharp tips of blades',
            'At the central screw pivot between effort and load',
            'At the finger loops',
            'Scissors have no fulcrum'
          ],
          correctIndex: 1,
          explanation: 'Scissors are Class-1 levers with the fulcrum in the middle.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 5 • Indian Freedom Leaders & Science Prizes',
      marathiSubtitle: 'CBSE Class 5 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian Nobel Laureates',
          prompt: 'Which Indian physicist won the 1930 Nobel Prize in Physics for the scattering of light?',
          options: [
            'Dr. Homi Bhabha',
            'Sir C. V. Raman',
            'Dr. Vikram Sarabhai',
            'S. Chandrasekhar'
          ],
          correctIndex: 1,
          explanation: 'Sir Chandrasekhara Venkata Raman discovered the Raman Effect.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'World Water Day',
          prompt: 'The United Nations marks 22nd March every year as World ___ Day to promote freshwater conservation.',
          options: ['Forest', 'Water', 'Energy', 'Ocean'],
          correctIndex: 1,
          explanation: 'World Water Day is observed globally on 22 March.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Longest Mountain Range',
          prompt: 'Which continent hosts the Andes, the longest continental mountain range on Earth?',
          options: ['North America', 'South America', 'Africa', 'Europe'],
          correctIndex: 1,
          explanation: 'The Andes stretch over 7,000 km along the western coast of South America.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Currency Names',
          prompt: 'What is the official currency of Japan?',
          options: ['Won', 'Yen', 'Yuan', 'Baht'],
          correctIndex: 1,
          explanation: 'The Japanese Yen (¥) is Japan’s currency.'
        },
        {
          format: 'true_false',
          chapterTitle: 'National Sports Day',
          prompt: 'India celebrates National Sports Day on 29th August to honour hockey legend Major Dhyan Chand.',
          options: ['True', 'False', 'It honours chess only', 'Celebrated in December'],
          correctIndex: 0,
          explanation: 'Major Dhyan Chand’s birth anniversary (29 August) is National Sports Day.'
        }
      ]
    }
  ],
  'Class 6': [
    {
      subject: 'Mathematics',
      chapterName: 'Ganita Prakash 6 • Integers, Patterns & Ratio',
      marathiSubtitle: 'CBSE Class 6 • NCERT Ganita Prakash Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Triangular Numbers',
          prompt: 'In Ganita Prakash Class 6 Patterns, what is the 5th triangular number in the sequence: 1, 3, 6, 10, ___?',
          options: ['12', '14', '15', '18'],
          correctIndex: 2,
          explanation: '1 + 2 + 3 + 4 + 5 = 15.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Integers Comparison',
          prompt: 'Evaluate: (−15) + (+9) = ___.',
          options: ['−24', '−6', '+6', '+24'],
          correctIndex: 1,
          explanation: 'Starting at −15 and moving 9 units right yields −6.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Divisibility Rules',
          prompt: 'Which of these numbers is exactly divisible by 11?',
          options: ['1,342', '1,234', '2,456', '3,125'],
          correctIndex: 0,
          explanation: 'For 1,342: (1 + 4) − (3 + 2) = 5 − 5 = 0, which is divisible by 11.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Ratio Simplification',
          prompt: 'Express the ratio of 45 minutes to 2 hours in its simplest form:',
          options: ['3 : 8', '9 : 4', '3 : 4', '45 : 2'],
          correctIndex: 0,
          explanation: '2 hours = 120 minutes. Ratio 45 : 120 divided by 15 equals 3 : 8.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Line Segments & Rays',
          prompt: 'How many end-points does a geometric line segment PQ have?',
          options: ['0', '1', '2', 'Infinitely many'],
          correctIndex: 2,
          explanation: 'A line segment has a fixed length bounded by 2 endpoints.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Poorvi Class 6 • Reported Speech, Clauses & Prose',
      marathiSubtitle: 'CBSE Class 6 • NCERT Poorvi English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Direct to Indirect Speech',
          prompt: 'Convert into indirect speech: Rhea said, "I am watering the saplings."',
          options: [
            'Rhea said that she is watering the saplings.',
            'Rhea said that she was watering the saplings.',
            'Rhea said that I was watering the saplings.',
            'Rhea asked if she watered the saplings.'
          ],
          correctIndex: 1,
          explanation: 'When reporting in past tense ("said"), present continuous ("am watering") shifts to past continuous ("was watering").'
        },
        {
          format: 'mcq',
          chapterTitle: 'Transitive Verbs',
          prompt: 'Identify the sentence containing a TRANSITIVE verb (taking a direct object):',
          options: [
            'The infant slept peacefully.',
            'Kabir kicked the football across the field.',
            'Birds flew high in the sky.',
            'She laughed loudly.'
          ],
          correctIndex: 1,
          explanation: '"Kicked" transfers action onto the direct object "the football".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Correlative Conjunctions',
          prompt: 'Complete: "___ my brother nor my cousin forgot to bring the geometry box."',
          options: ['Either', 'Neither', 'Both', 'Not only'],
          correctIndex: 1,
          explanation: '"Neither ... nor" pairs two negative alternatives.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Word Idioms',
          prompt: 'What does the idiom "once in a blue moon" convey?',
          options: ['Every single evening', 'Very rarely', 'Twice a week', 'During a lunar eclipse only'],
          correctIndex: 1,
          explanation: 'It means an event that happens extremely rarely.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Prepositional Usage',
          prompt: '"Between" is normally used for two entities, whereas "among" refers to more than two.',
          options: ['True', 'False', 'Both mean inside', 'Neither is a preposition'],
          correctIndex: 0,
          explanation: 'Example: divided between two friends; shared among four classmates.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Curiosity Class 6 • Separation, Circuits & Living World',
      marathiSubtitle: 'CBSE Class 6 • NCERT Curiosity Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Mindful Eating Nutrients',
          prompt: 'Which chemical reagent turns food rich in starch into a deep blue-black colour in NCERT lab tests?',
          options: ['Lime water', 'Dilute iodine solution', 'Copper sulphate', 'Litmus extract'],
          correctIndex: 1,
          explanation: 'Starch reacts with iodine solution to produce a characteristic blue-black colour.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Electrical Conductors',
          prompt: 'Why are copper wires always wrapped in coloured PVC plastic insulation?',
          options: [
            'Plastic glows brightly in darkness',
            'Plastic is an insulator that prevents electric shock',
            'Plastic makes copper heavier',
            'Plastic increases resistance of copper'
          ],
          correctIndex: 1,
          explanation: 'PVC plastic acts as an electrical insulator around conducting copper.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Leaf Venation & Roots',
          prompt: 'Plants whose leaves show parallel venation (like grass or maize) generally possess ___ roots.',
          options: ['tap', 'fibrous', 'prop', 'aerial'],
          correctIndex: 1,
          explanation: 'Monocot plants with parallel leaf venation have fibrous root systems.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Rectilinear Propagation',
          prompt: 'Light always travels in straight lines through a uniform transparent medium like air.',
          options: ['True', 'False', 'Light bends around corners easily', 'Only red light goes straight'],
          correctIndex: 0,
          explanation: 'Straight-line travel of light produces sharp shadows behind opaque objects.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Measuring Units (SI)',
          prompt: 'What is the standard SI unit of length used internationally in science?',
          options: ['Inch', 'Foot', 'Metre', 'Yard'],
          correctIndex: 2,
          explanation: 'The metre (m) is the SI base unit of length.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 6 • Ancient Harappa, Rivers & Constitution',
      marathiSubtitle: 'CBSE Class 6 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indus-Sarasvati Civilisation',
          prompt: 'Which Harappan port city in Gujarat featured the famous ancient brick dockyard?',
          options: ['Kalibangan', 'Lothal', 'Rakhigarhi', 'Alamgirpur'],
          correctIndex: 1,
          explanation: 'Lothal near the Gulf of Khambhat had a well-engineered tidal dockyard.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Tropic of Cancer',
          prompt: 'The Tropic of Cancer (23½° N) passes across ___ Indian states from Gujarat to Mizoram.',
          options: ['5', '6', '8', '11'],
          correctIndex: 2,
          explanation: 'It passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Biosphere & Environment',
          prompt: 'Which gas forms nearly 21% of Earth’s dry atmosphere and supports aerobic respiration?',
          options: ['Nitrogen', 'Oxygen', 'Argon', 'Neon'],
          correctIndex: 1,
          explanation: 'Air contains roughly 78% nitrogen and 21% oxygen.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Space Observatories',
          prompt: 'What is the name of India’s first dedicated solar space mission launched by ISRO in 2023?',
          options: ['Gaganyaan', 'Aditya-L1', 'AstroSat', 'Nisar'],
          correctIndex: 1,
          explanation: 'Aditya-L1 studies the Sun from the Sun–Earth Lagrange Point L1.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Panchayati Raj',
          prompt: 'The Gram Sabha consists of all registered adult voters living in a village panchayat area.',
          options: ['True', 'False', 'Only school principals', 'Only district judges'],
          correctIndex: 0,
          explanation: 'Every voter aged 18+ in the panchayat village list is a member of the Gram Sabha.'
        }
      ]
    }
  ],
  'Class 7': [
    {
      subject: 'Mathematics',
      chapterName: 'CBSE Class 7 • Exponents, Triangles & Interest',
      marathiSubtitle: 'CBSE Class 7 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Laws of Exponents',
          prompt: 'Simplify using laws of exponents: (2³ × 2⁴) ÷ 2⁵ =',
          options: ['2', '4', '8', '16'],
          correctIndex: 1,
          explanation: '2^(3+4−5) = 2² = 4.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Exterior Angle Property',
          prompt: 'If two interior opposite angles of a triangle measure 52° and 68°, the exterior angle measures ___ degrees.',
          options: ['110', '120', '130', '60'],
          correctIndex: 1,
          explanation: 'Exterior angle = sum of interior opposite angles = 52° + 68° = 120°.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Simple Interest',
          prompt: 'Find the Simple Interest on ₹2,000 deposited for 3 years at 5% per annum.',
          options: ['₹250', '₹300', '₹350', '₹400'],
          correctIndex: 1,
          explanation: 'SI = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = ₹300.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Area of Circle',
          prompt: 'Taking π = 22/7, what is the circumference of a bicycle wheel of radius 14 cm?',
          options: ['44 cm', '88 cm', '154 cm', '616 cm'],
          correctIndex: 1,
          explanation: 'Circumference = 2πr = 2 × (22/7) × 14 = 88 cm.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Median of Data',
          prompt: 'Find the median of the sorted scores: 11, 14, 17, 21, 25, 29, 32.',
          options: ['17', '21', '25', '20'],
          correctIndex: 1,
          explanation: 'For 7 sorted values, the middle (4th) value is 21.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Honeycomb Class 7 • Voice, Conditionals & Syntax',
      marathiSubtitle: 'CBSE Class 7 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Zero & First Conditional',
          prompt: 'Complete the conditional sentence: "If you heat pure ice above 0°C, it ___ into water."',
          options: ['melted', 'melts', 'will melting', 'had melt'],
          correctIndex: 1,
          explanation: 'Scientific truths in zero-conditional take simple present in both clauses.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Passive Voice (Present Continuous)',
          prompt: 'Choose the passive voice of: "The gardeners are planting jasmine shrubs."',
          options: [
            'Jasmine shrubs were planted by the gardeners.',
            'Jasmine shrubs are being planted by the gardeners.',
            'Jasmine shrubs have been planted by the gardeners.',
            'Jasmine shrubs are plant by the gardeners.'
          ],
          correctIndex: 1,
          explanation: '"are planting" becomes "are being planted" in passive voice.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Prepositions of Time',
          prompt: 'Fill in: "The annual CBSE science exhibition has been running ___ Monday morning."',
          options: ['for', 'since', 'from between', 'during at'],
          correctIndex: 1,
          explanation: '"Since" refers to a specific starting point in time ("Monday morning").'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Simile vs Metaphor',
          prompt: '"Her voice was a gentle melody." Which figure of speech is illustrated here?',
          options: ['Simile', 'Metaphor', 'Alliteration', 'Oxymoron'],
          correctIndex: 1,
          explanation: 'A direct comparison without "like" or "as" is a metaphor.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Question Tags',
          prompt: 'The correct question tag for "You attended the morning assembly, ___?" is "didn’t you?".',
          options: ['True', 'False', 'Should be did you?', 'Should be aren’t you?'],
          correctIndex: 0,
          explanation: 'Positive simple past statement takes negative past tag "didn’t you?".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'NCERT Class 7 • Symbiosis, Acids & Electromagnets',
      marathiSubtitle: 'CBSE Class 7 • NCERT Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Plant Nutrition',
          prompt: 'Which bacterium lives in the root nodules of leguminous plants like peas and converts atmospheric nitrogen into soluble nitrates?',
          options: ['Lactobacillus', 'Rhizobium', 'Amoeba', 'Yeast'],
          correctIndex: 1,
          explanation: 'Rhizobium forms a symbiotic partnership with legumes to fix nitrogen.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Natural Indicators',
          prompt: 'When turmeric paste stain on a white shirt is rubbed with soap solution, what colour does it turn?',
          options: ['Deep blue', 'Reddish-brown', 'Bright violet', 'Colourless'],
          correctIndex: 1,
          explanation: 'Soap is basic (alkaline), turning yellow turmeric indicator reddish-brown.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Physical vs Chemical Change',
          prompt: 'Coating iron sheets with a thin protective layer of zinc to prevent rusting is called ___.',
          options: ['crystallisation', 'galvanisation', 'distillation', 'sublimation'],
          correctIndex: 1,
          explanation: 'Galvanisation prevents moist air from rusting iron.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Concave vs Convex Mirror',
          prompt: 'Convex mirrors are fitted as rear-view mirrors on vehicles because they provide a wider field of view.',
          options: ['True', 'False', 'Plane mirrors give narrow inverted view', 'Concave mirrors shrink far objects only'],
          correctIndex: 0,
          explanation: 'Convex mirrors always form upright, diminished images covering a broad area.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Safety Fuse',
          prompt: 'Upon which effect of electric current does a household MCB / cartridge electric fuse operate?',
          options: [
            'Heating effect of electric current',
            'Gravitational effect',
            'Magnetic attraction of aluminium',
            'Sound resonance'
          ],
          correctIndex: 0,
          explanation: 'Excessive current heats and melts a traditional fuse wire quickly.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 7 • Medieval India, Weather & Democracy',
      marathiSubtitle: 'CBSE Class 7 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Chola Architecture',
          prompt: 'The magnificent Brihadisvara Temple at Thanjavur was built by which Chola ruler?',
          options: ['Rajaraja Chola I', 'Harshavardhana', 'Samudragupta', 'Krishnadevaraya'],
          correctIndex: 0,
          explanation: 'Rajaraja Chola I built the UNESCO-listed Brihadisvara Temple around 1010 CE.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Earth’s Interior',
          prompt: 'The outermost thin solid layer of the Earth made of continental and oceanic plates is the ___.',
          options: ['Core', 'Crust', 'Mantle', 'Magma chamber'],
          correctIndex: 1,
          explanation: 'The crust is the thinnest outer shell of Earth.'
        },
        {
          format: 'mcq',
          chapterTitle: 'World’s Deepest Trench',
          prompt: 'In which ocean is the Mariana Trench—the deepest oceanic trench on Earth—located?',
          options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
          correctIndex: 2,
          explanation: 'The Mariana Trench lies in the western Pacific Ocean.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Weather Instruments',
          prompt: 'Which scientific instrument measures atmospheric air pressure?',
          options: ['Anemometer', 'Barometer', 'Hygrometer', 'Rain gauge'],
          correctIndex: 1,
          explanation: 'A barometer measures atmospheric pressure.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Universal Adult Franchise',
          prompt: 'In India, every citizen aged 18 years and above has one equal vote regardless of wealth, gender, or caste.',
          options: ['True', 'False', 'Voting age is 25', 'Only landowners vote'],
          correctIndex: 0,
          explanation: 'Article 326 guarantees Universal Adult Suffrage at age 18.'
        }
      ]
    }
  ],
  'Class 8': [
    {
      subject: 'Mathematics',
      chapterName: 'CBSE Class 8 • Algebraic Identities, Factorisation & Mensuration',
      marathiSubtitle: 'CBSE Class 8 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Algebraic Identities',
          prompt: 'Use the identity a² − b² = (a + b)(a − b) to compute 53² − 47²:',
          options: ['400', '500', '600', '700'],
          correctIndex: 2,
          explanation: '(53 + 47)(53 − 47) = 100 × 6 = 600.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Cube Roots',
          prompt: 'The cube root of 1,728 is ___.',
          options: ['11', '12', '13', '14'],
          correctIndex: 1,
          explanation: '12 × 12 × 12 = 1,728.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Polygon Exterior Angles',
          prompt: 'What is the sum of all exterior angles of ANY convex polygon taken in order?',
          options: ['180°', '360°', '540°', '720°'],
          correctIndex: 1,
          explanation: 'The exterior angles of every convex polygon always add up to 360°.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Compound Interest',
          prompt: 'Find the Compound Interest on ₹10,000 for 2 years at 10% p.a. compounded annually.',
          options: ['₹2,000', '₹2,100', '₹2,200', '₹2,400'],
          correctIndex: 1,
          explanation: 'Amount = 10000 × (1.1)² = ₹12,100. CI = 12,100 − 10,000 = ₹2,100.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Inverse Variation',
          prompt: 'If 12 workers take 15 hours to build a brick wall, how long will 18 workers take at the same pace?',
          options: ['8 hours', '10 hours', '12 hours', '22.5 hours'],
          correctIndex: 1,
          explanation: '12 × 15 = 18 × t → t = 180 ÷ 18 = 10 hours.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Honeydew Class 8 • Participles, Clauses & Comprehension',
      marathiSubtitle: 'CBSE Class 8 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Past Perfect Tense',
          prompt: 'Fill in: "The train ___ the station before we arrived at the platform."',
          options: ['leaves', 'had left', 'will leaving', 'has leave'],
          correctIndex: 1,
          explanation: 'The earlier of two past actions uses past perfect ("had left").'
        },
        {
          format: 'mcq',
          chapterTitle: 'Gerund Identification',
          prompt: 'In "Swimming builds stamina and lung capacity", how does "Swimming" function grammatically?',
          options: ['Adverb', 'Gerund (verbal noun acting as subject)', 'Finite past verb', 'Conjunction'],
          correctIndex: 1,
          explanation: 'A verb ending in "-ing" functioning as a noun is a gerund.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Prepositional Verbs',
          prompt: 'Choose the right preposition: "All citizens must abide ___ traffic safety regulations."',
          options: ['with', 'by', 'on', 'over'],
          correctIndex: 1,
          explanation: 'The standard idiom is "abide by" rules.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Error Spotting',
          prompt: 'Spot the correct revision for: "Each of the finalists were awarded a certificate."',
          options: [
            'Each of the finalists was awarded a certificate.',
            'Each of the finalists are awarded a certificate.',
            'Each of the finalist were awarded a certificate.',
            'Each finalists were awarded.'
          ],
          correctIndex: 0,
          explanation: 'Indefinite pronoun "Each" requires the singular verb "was".'
        },
        {
          format: 'true_false',
          chapterTitle: 'Oxymoron Device',
          prompt: 'Phrases like "open secret" and "deafening silence" are examples of an Oxymoron.',
          options: ['True', 'False', 'They are onomatopoeia', 'They are hyperbole'],
          correctIndex: 0,
          explanation: 'An oxymoron pairs two contradictory terms side by side.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'NCERT Class 8 • Microbes, Friction & Electroplating',
      marathiSubtitle: 'CBSE Class 8 • NCERT Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Vaccination Pioneer',
          prompt: 'Who discovered the world’s first vaccine (against smallpox) in 1798?',
          options: ['Alexander Fleming', 'Edward Jenner', 'Louis Pasteur', 'Robert Koch'],
          correctIndex: 1,
          explanation: 'Edward Jenner developed the smallpox vaccine in 1798.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Sound Frequency',
          prompt: 'What is the audible frequency range of sound waves for a healthy young human ear?',
          options: ['1 Hz to 100 Hz', '20 Hz to 20,000 Hz', '50,000 Hz to 100,000 Hz', '0 Hz to 10 Hz'],
          correctIndex: 1,
          explanation: 'Humans normally hear frequencies between 20 Hz and 20 kHz.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Combustion Types',
          prompt: 'The lowest temperature at which a fuel substance catches fire in air is called its ___ temperature.',
          options: ['boiling', 'ignition', 'freezing', 'critical'],
          correctIndex: 1,
          explanation: 'A fuel cannot burn until heated to its ignition temperature.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Chemical Effects of Current',
          prompt: 'Chromium electroplating on bicycle handlebars prevents corrosion and gives a shiny scratch-resistant finish.',
          options: ['True', 'False', 'Chromium dissolves in rainwater', 'Plastic is electroplated without conductivity'],
          correctIndex: 0,
          explanation: 'Electroplating deposits a thin corrosion-resistant chromium coat.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Refining Petroleum',
          prompt: 'Which dark viscous constituent of petroleum is used for surfacing paved roads?',
          options: ['Kerosene', 'Bitumen', 'Paraffin wax', 'LPG'],
          correctIndex: 1,
          explanation: 'Bitumen has largely replaced coal tar in road metalling.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 8 • Modern History, Reforms & World Bodies',
      marathiSubtitle: 'CBSE Class 8 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Social Reform Movements',
          prompt: 'Who founded the Satyashodhak Samaj in Pune in 1873 to champion social equality and girls’ education?',
          options: [
            'Mahatma Jyotirao Phule',
            'Swami Vivekananda',
            'Raja Rammohan Roy',
            'Dadabhai Naoroji'
          ],
          correctIndex: 0,
          explanation: 'Mahatma Jyotirao Phule established the Satyashodhak Samaj in 1873.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Fundamental Rights',
          prompt: 'Article 21A of the Indian Constitution guarantees the Fundamental Right to free and compulsory ___.',
          options: ['housing', 'education (ages 6–14)', 'foreign travel', 'property'],
          correctIndex: 1,
          explanation: 'The 86th Amendment inserted Article 21A (Right to Education).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Global Organisations',
          prompt: 'Where is the headquarters of the International Court of Justice (ICJ) situated?',
          options: ['Geneva, Switzerland', 'The Hague, Netherlands', 'New York, USA', 'Vienna, Austria'],
          correctIndex: 1,
          explanation: 'The ICJ sits at the Peace Palace in The Hague, Netherlands.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Agricultural Revolutions',
          prompt: 'Who is celebrated as the "Father of the White Revolution" (Operation Flood) in India?',
          options: ['Dr. M. S. Swaminathan', 'Dr. Verghese Kurien', 'Dr. Norman Borlaug', 'Dr. Homi Sethna'],
          correctIndex: 1,
          explanation: 'Dr. Verghese Kurien led India’s dairy cooperative White Revolution.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Parliament Structure',
          prompt: 'The Lok Sabha is the directly elected Lower House of the Indian Parliament.',
          options: ['True', 'False', 'Lok Sabha members are appointed for life', 'India has only one House'],
          correctIndex: 0,
          explanation: 'Members of the Lok Sabha are directly elected by voters across constituencies.'
        }
      ]
    }
  ],
  'Class 9': [
    {
      subject: 'Mathematics',
      chapterName: 'NCERT Class 9 • Real Numbers, Heron’s Formula & Circles',
      marathiSubtitle: 'CBSE Class 9 • NCERT Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Heron’s Formula',
          prompt: 'Find the area of a triangle whose sides are 13 cm, 14 cm, and 15 cm using Heron’s formula.',
          options: ['78 cm²', '84 cm²', '91 cm²', '105 cm²'],
          correctIndex: 1,
          explanation: 'Semi-perimeter s = (13+14+15)/2 = 21. Area = √[21×8×7×6] = √7056 = 84 cm².'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Number Systems',
          prompt: 'Which irrational number value is obtained when simplifying √50 ÷ √2?',
          options: ['√5', '5 (a rational number)', '25', '2√5'],
          correctIndex: 1,
          explanation: '√(50/2) = √25 = 5, which is rational.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Coordinate Geometry',
          prompt: 'In which quadrant of the Cartesian plane does the point (−6, 4) lie?',
          options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
          correctIndex: 1,
          explanation: 'Negative x-coordinate and positive y-coordinate lie in Quadrant II.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Cyclic Quadrilaterals',
          prompt: 'In a cyclic quadrilateral PQRS inscribed in a circle, if ∠P = 78°, what is the opposite angle ∠R?',
          options: ['78°', '92°', '102°', '112°'],
          correctIndex: 2,
          explanation: 'Opposite angles of a cyclic quadrilateral are supplementary: 180° − 78° = 102°.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Volume of Cone',
          prompt: 'A right circular cone has base radius 7 cm and vertical height 6 cm. Find its volume (π = 22/7).',
          options: ['154 cm³', '308 cm³', '616 cm³', '924 cm³'],
          correctIndex: 1,
          explanation: 'V = (1/3)πr²h = (1/3) × (22/7) × 49 × 6 = 308 cm³.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Beehive Class 9 • Determiners, Modals & Transformation',
      marathiSubtitle: 'CBSE Class 9 • NCERT English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Determiners (Little / A Little)',
          prompt: 'Choose the right determiner: "There is still ___ hope of catching the evening express if we hurry."',
          options: ['a little', 'few', 'many', 'several'],
          correctIndex: 0,
          explanation: '"A little" with uncountable noun "hope" expresses a positive remaining amount.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Reported Imperative',
          prompt: 'Transform into reported speech: The coach said to us, "Practise warm-up stretches daily."',
          options: [
            'The coach told that practise warm-up stretches daily.',
            'The coach advised us to practise warm-up stretches daily.',
            'The coach asked us if practise warm-up daily.',
            'The coach exclaimed to warm-up daily.'
          ],
          correctIndex: 1,
          explanation: 'Reported advice uses "advised/told + object + to-infinitive".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Subjunctive / Conditionals',
          prompt: 'Complete: "Had they checked the barometer earlier, they ___ cancelled the boat trip."',
          options: ['will have', 'would have', 'could be', 'shall'],
          correctIndex: 1,
          explanation: 'Third conditional takes "would have + past participle" for unreal past outcomes.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Poetic Device',
          prompt: '"The ancient wind whispered secrets through pine needles." Name the literary device:',
          options: ['Personification', 'Irony', 'Pun', 'Hyperbole'],
          correctIndex: 0,
          explanation: 'Giving the human action "whispered secrets" to wind is personification.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Concord Rule',
          prompt: '"Either Ananya or her teammates have packed the laboratory kit." is grammatically correct.',
          options: ['True', 'False', 'Must use has', 'Must use was'],
          correctIndex: 0,
          explanation: 'With "either...or", the verb agrees with the nearer subject ("teammates" → plural "have").'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'NCERT Class 9 • Mole Concept, Cell Organelles & Kinematics',
      marathiSubtitle: 'CBSE Class 9 • NCERT Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Molecular Mass',
          prompt: 'Calculate the molecular mass of nitric acid (HNO₃). (H = 1 u, N = 14 u, O = 16 u)',
          options: ['47 u', '53 u', '63 u', '79 u'],
          correctIndex: 2,
          explanation: '1 + 14 + (3 × 16) = 15 + 48 = 63 u.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Cell Organelles',
          prompt: 'Which cell organelle contains powerful digestive enzymes and is called the "suicide bag" of a damaged cell?',
          options: ['Ribosome', 'Lysosome', 'Centriole', 'Leucoplast'],
          correctIndex: 1,
          explanation: 'Lysosomes burst to digest worn-out cell debris or autolyse damaged cells.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Equations of Motion',
          prompt: 'A cyclist starts from rest and accelerates uniformly at 2 m/s² for 5 seconds. Final velocity v = ___ m/s.',
          options: ['7', '10', '12', '25'],
          correctIndex: 1,
          explanation: 'v = u + at = 0 + (2 × 5) = 10 m/s.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Plant Permanent Tissues',
          prompt: 'Sclerenchyma tissue gives rigid mechanical hardness to coconut husks and walnut shells.',
          options: ['True', 'False', 'Parenchyma only stores water', 'Epidermis is woody'],
          correctIndex: 0,
          explanation: 'Lignified dead cells of sclerenchyma provide rigid strength.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Kinetic Energy Formula',
          prompt: 'What is the kinetic energy of a 4 kg stone moving at 5 m/s?',
          options: ['20 J', '25 J', '50 J', '100 J'],
          correctIndex: 2,
          explanation: 'KE = ½mv² = ½ × 4 × 5² = 2 × 25 = 50 Joules.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 9 • Democratic Politics, Rivers & World History',
      marathiSubtitle: 'CBSE Class 9 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'French Revolution',
          prompt: 'In which year did the storming of the Bastille fortress spark the French Revolution?',
          options: ['1776', '1789', '1815', '1848'],
          correctIndex: 1,
          explanation: 'The Bastille fell on 14 July 1789.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Drainage of India',
          prompt: 'The ___ is the largest peninsular river basin in India, famously known as the "Dakshin Ganga".',
          options: ['Krishna', 'Godavari', 'Kaveri', 'Mahanadi'],
          correctIndex: 1,
          explanation: 'Originating near Trimbakeshwar in Maharashtra, the Godavari is called Dakshin Ganga.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Judiciary',
          prompt: 'Which constitutional court has original jurisdiction over disputes between the Centre and State governments in India?',
          options: ['District Sessions Court', 'Supreme Court of India', 'Consumer Forum', 'Lok Adalat'],
          correctIndex: 1,
          explanation: 'Under Article 131, the Supreme Court holds original jurisdiction in federal disputes.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Human Development',
          prompt: 'Which UN index combines life expectancy, education years, and per capita income?',
          options: ['CPI', 'HDI (Human Development Index)', 'GDP deflator', 'WPI'],
          correctIndex: 1,
          explanation: 'UNDP publishes the Human Development Index (HDI) annually.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Standard Meridian of India',
          prompt: 'India Standard Time (IST) is calculated along the 82°30′ East longitude passing through Mirzapur.',
          options: ['True', 'False', 'Along 0° Greenwich', 'Along 90° West'],
          correctIndex: 0,
          explanation: '82°30′ E serves as India’s Standard Meridian (UTC +5:30).'
        }
      ]
    }
  ],
  'Class 10': [
    {
      subject: 'Mathematics',
      chapterName: 'CBSE Board Class 10 • Quadratic, AP, BPT & Trigonometry',
      marathiSubtitle: 'CBSE Class 10 • Board Exam Mathematics Worksheet',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Arithmetic Progressions',
          prompt: 'Find the 12th term of the Arithmetic Progression: 7, 11, 15, 19, ...',
          options: ['47', '51', '55', '43'],
          correctIndex: 1,
          explanation: 'a = 7, d = 4. a₁₂ = a + 11d = 7 + 11(4) = 51.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Zeroes of Polynomials',
          prompt: 'If α and β are zeroes of 2x² − 8x + 6, then the product of zeroes αβ = ___.',
          options: ['−4', '3', '4', '−3'],
          correctIndex: 1,
          explanation: 'Product of zeroes = c / a = 6 / 2 = 3.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Coordinate Distance',
          prompt: 'What is the perpendicular distance of point P(5, 12) from the origin (0, 0)?',
          options: ['7 units', '13 units', '17 units', '60 units'],
          correctIndex: 1,
          explanation: 'Distance = √(5² + 12²) = √(25 + 144) = √169 = 13 units.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Circle Tangents',
          prompt: 'From an external point Q, a tangent of length 24 cm touches a circle whose radius is 7 cm. Distance of Q from the centre O is:',
          options: ['17 cm', '25 cm', '26 cm', '31 cm'],
          correctIndex: 1,
          explanation: 'Since radius ⊥ tangent, OQ = √(24² + 7²) = √625 = 25 cm.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Probability Board Q',
          prompt: 'A fair six-sided die is rolled once. What is the probability of getting a prime number?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correctIndex: 2,
          explanation: 'Primes on a die are {2, 3, 5} → 3 favourable outcomes out of 6 = 3/6 = 1/2.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'First Flight Class 10 • Editing, Modals & Analytical Grammar',
      marathiSubtitle: 'CBSE Class 10 • Board Exam English Worksheet',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Subject-Verb Concord',
          prompt: 'Select the right verb for CBSE editing: "Neither the teacher nor the students ___ aware of the rescheduled bell."',
          options: ['is', 'was', 'were', 'has been'],
          correctIndex: 2,
          explanation: 'Nearer subject "students" is plural, so plural verb "were" agrees.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Reported Question',
          prompt: 'Report accurately: Mother asked Aarav, "Where did you keep your passport?"',
          options: [
            'Mother asked Aarav where had he kept his passport.',
            'Mother asked Aarav where he had kept his passport.',
            'Mother asked Aarav that where he kept his passport.',
            'Mother asked Aarav where did he keep his passport.'
          ],
          correctIndex: 1,
          explanation: 'In reported wh-questions, word order becomes subject + verb ("he had kept") without "that".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Modals of Necessity',
          prompt: 'Fill in: "Passengers ___ fasten seatbelts whenever the aircraft turbulence sign illuminates."',
          options: ['might', 'must', 'would', 'dare'],
          correctIndex: 1,
          explanation: '"Must" expresses mandatory safety obligation.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Clause Synthesis',
          prompt: 'Combine cleanly: "Work diligently. You will achieve distinction in Board exams."',
          options: [
            'Unless you work diligently, you will achieve distinction.',
            'If you work diligently, you will achieve distinction in Board exams.',
            'Although you work diligently, you achieve distinction.',
            'Wait until distinction before working.'
          ],
          correctIndex: 1,
          explanation: 'Conditional clause with "if" expresses direct cause and reward.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Irony Identification',
          prompt: 'Situational irony occurs when the outcome of events turns out strikingly opposite to what characters expected.',
          options: ['True', 'False', 'It is rhyme scheme', 'It is a syllable count'],
          correctIndex: 0,
          explanation: 'Situational irony contrasts expectation with actual outcome.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'CBSE Class 10 • Chemical Reactions, Nephron & Ohm’s Law',
      marathiSubtitle: 'CBSE Class 10 • Board Exam Science Worksheet',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Carbon Compounds',
          prompt: 'Which homologous series organic compound is represented by the general formula CₙH₂ₙ (for n ≥ 2)?',
          options: ['Alkanes', 'Alkenes', 'Alkynes', 'Alcohols'],
          correctIndex: 1,
          explanation: 'Alkenes contain a C=C double bond and follow CₙH₂ₙ.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Excretion in Humans',
          prompt: 'What is the basic microscopic filtration unit inside a human kidney?',
          options: ['Neuron', 'Nephron', 'Villus', 'Alveolus'],
          correctIndex: 1,
          explanation: 'Each kidney contains roughly a million blood-filtering nephrons.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'pH Scale',
          prompt: 'Tooth enamel begins to corrode when the pH inside the mouth falls below ___.',
          options: ['9.0', '7.5', '5.5', '12.0'],
          correctIndex: 2,
          explanation: 'Acidic conditions below pH 5.5 attack calcium hydroxyapatite enamel.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Snell’s Law of Refraction',
          prompt: 'The ratio sin(i) / sin(r) remains constant for a given pair of transparent media and wavelength of light.',
          options: ['True', 'False', 'Always equals zero', 'Applies only to sound'],
          correctIndex: 0,
          explanation: 'Snell’s law defines refractive index n = sin(i) / sin(r).'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Electrical Power',
          prompt: 'An electric kettle rated 220 V draws a steady current of 5 A. What is its power consumption?',
          options: ['44 W', '225 W', '1,100 W', '2,200 W'],
          correctIndex: 2,
          explanation: 'Power P = V × I = 220 V × 5 A = 1,100 Watts.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'CBSE Class 10 • Nationalism, Federalism & Economy',
      marathiSubtitle: 'CBSE Class 10 • General Knowledge Worksheet',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Nationalism in India',
          prompt: 'In which Congress Session (December 1929) was the demand for "Purna Swaraj" (Complete Independence) formalised?',
          options: ['Calcutta Session', 'Lahore Session', 'Surat Session', 'Nagpur Session'],
          correctIndex: 1,
          explanation: 'Presided over by Jawaharlal Nehru, the 1929 Lahore Session declared Purna Swaraj.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Federalism Schedules',
          prompt: 'The ___ Schedule of the Constitution of India contains the list of 22 officially recognised Scheduled Languages.',
          options: ['Fifth', 'Seventh', 'Eighth', 'Eleventh'],
          correctIndex: 2,
          explanation: 'The Eighth Schedule lists India’s 22 Scheduled Languages.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Central Banking',
          prompt: 'Which institution issues currency notes in India and supervises formal sector bank credit?',
          options: ['SEBI', 'Reserve Bank of India (RBI)', 'NABARD', 'NITI Aayog'],
          correctIndex: 1,
          explanation: 'The Reserve Bank of India (RBI) is India’s central monetary authority.'
        },
        {
          format: 'match_following',
          chapterTitle: 'Cropping Seasons',
          prompt: 'Paddy (rice), maize, and cotton grown with the arrival of southwest monsoon rains belong to which crop season?',
          options: ['Rabi', 'Kharif', 'Zaid', 'Perennial'],
          correctIndex: 1,
          explanation: 'Kharif crops are sown with monsoon onset (June–July) and harvested in autumn.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Tertiary Sector',
          prompt: 'Banking, healthcare, software engineering, and transport services belong to the Tertiary sector of the economy.',
          options: ['True', 'False', 'They belong to Primary farming', 'Only factories are tertiary'],
          correctIndex: 0,
          explanation: 'Service activities comprise the Tertiary sector.'
        }
      ]
    }
  ]
};
