import { ClassLevel, EducationBoard } from '../types';
import { CBSE_DEMO_QUESTIONS_BY_CLASS } from './boards/cbseDemoData';
import { ICSE_DEMO_QUESTIONS_BY_CLASS } from './boards/icseDemoData';

export type DemoQuestionSubject =
  | 'Mathematics'
  | 'Science'
  | 'English'
  | 'General Knowledge';

export interface ClassDemoQuestion {
  id: string;
  classLevel: ClassLevel;
  board?: EducationBoard;
  subject: DemoQuestionSubject;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

/**
 * Strictly 2 unique, class-appropriate, syllabus-aligned demo questions per class (Class 1 to Class 10).
 * No question, topic prompt, or ID is repeated across classes.
 */
export const DEMO_QUESTIONS_BY_CLASS: Record<
  ClassLevel,
  readonly [ClassDemoQuestion, ClassDemoQuestion]
> = {
  'Class 1': [
    {
      id: 'demo-c1-q1',
      classLevel: 'Class 1',
      subject: 'Mathematics',
      topic: 'Addition Within 20',
      question:
        'Riya has 14 red marbles and 5 blue marbles. How many marbles does she have in all?',
      options: ['18', '19', '20', '17'],
      correctIndex: 1,
      explanation: 'Counting 5 more after 14 gives 14 + 5 = 19 marbles.'
    },
    {
      id: 'demo-c1-q2',
      classLevel: 'Class 1',
      subject: 'English',
      topic: 'Vowels & Articles (a / an)',
      question:
        'Choose the correct word to fill in the blank: "I saw ___ elephant in the zoo."',
      options: ['a', 'an', 'two', 'are'],
      correctIndex: 1,
      explanation:
        'We use "an" before naming words that begin with a vowel sound (a, e, i, o, u), such as "elephant".'
    }
  ],
  'Class 2': [
    {
      id: 'demo-c2-q1',
      classLevel: 'Class 2',
      subject: 'Science',
      topic: 'Parts of a Plant',
      question:
        'Which part of a plant grows underground and absorbs water and minerals from the soil?',
      options: ['Leaf', 'Flower', 'Root', 'Fruit'],
      correctIndex: 2,
      explanation:
        'Roots grow under the soil, hold the plant firmly, and absorb water and minerals for growth.'
    },
    {
      id: 'demo-c2-q2',
      classLevel: 'Class 2',
      subject: 'General Knowledge',
      topic: 'National Symbols of India',
      question: 'Which bird is the National Bird of India?',
      options: ['Parrot', 'Pigeon', 'Indian Peacock', 'Eagle'],
      correctIndex: 2,
      explanation:
        'The Indian Peacock is the National Bird of India, famous for its bright blue and green feathers.'
    }
  ],
  'Class 3': [
    {
      id: 'demo-c3-q1',
      classLevel: 'Class 3',
      subject: 'Mathematics',
      topic: 'Place Value (3-Digit Numbers)',
      question: 'What is the place value of the digit 6 in the number 468?',
      options: ['6', '60', '600', '46'],
      correctIndex: 1,
      explanation:
        'In 468, the digit 6 stands in the tens place, so its place value is 6 × 10 = 60.'
    },
    {
      id: 'demo-c3-q2',
      classLevel: 'Class 3',
      subject: 'Science',
      topic: 'States of Water',
      question:
        'What happens when liquid water is cooled to 0°C inside a freezer?',
      options: [
        'It turns into steam',
        'It freezes into solid ice',
        'It evaporates into air',
        'It turns salty'
      ],
      correctIndex: 1,
      explanation:
        'Cooling liquid water to 0°C causes freezing, changing it into solid ice.'
    }
  ],
  'Class 4': [
    {
      id: 'demo-c4-q1',
      classLevel: 'Class 4',
      subject: 'English',
      topic: 'Collective Nouns',
      question:
        'Fill in the blank with the right collective noun: "A ___ of bees flew near the mango tree."',
      options: ['herd', 'swarm', 'flock', 'pack'],
      correctIndex: 1,
      explanation:
        'A group of bees is called a "swarm" ("herd" is used for cattle, "flock" for birds/sheep, and "pack" for wolves).'
    },
    {
      id: 'demo-c4-q2',
      classLevel: 'Class 4',
      subject: 'General Knowledge',
      topic: 'Maharashtra Heritage',
      question:
        'Which historic hill fort served as the capital of Chhatrapati Shivaji Maharaj’s Hindavi Swarajya?',
      options: [
        'Shivneri Fort',
        'Sinhagad Fort',
        'Raigad Fort',
        'Pratapgad Fort'
      ],
      correctIndex: 2,
      explanation:
        'Raigad Fort was the capital of Hindavi Swarajya, where Chhatrapati Shivaji Maharaj was crowned in 1674.'
    }
  ],
  'Class 5': [
    {
      id: 'demo-c5-q1',
      classLevel: 'Class 5',
      subject: 'Mathematics',
      topic: 'Fractions & Simplification',
      question:
        'A chocolate bar has 12 equal pieces. Arjun eats 3 pieces. What fraction of the bar is left?',
      options: ['1/4', '3/4', '1/3', '2/3'],
      correctIndex: 1,
      explanation:
        'Remaining pieces = 12 − 3 = 9 out of 12. Simplifying 9/12 by dividing numerator and denominator by 3 gives 3/4.'
    },
    {
      id: 'demo-c5-q2',
      classLevel: 'Class 5',
      subject: 'Science',
      topic: 'The Solar System',
      question:
        'Which planet in our Solar System is called the "Red Planet" due to iron oxide on its surface?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctIndex: 1,
      explanation:
        'Mars is known as the Red Planet because iron oxide (rust-like dust) covers much of its rocky surface.'
    }
  ],
  'Class 6': [
    {
      id: 'demo-c6-q1',
      classLevel: 'Class 6',
      subject: 'English',
      topic: 'Adverbs & Parts of Speech',
      question:
        'Identify the adverb in the sentence: "The students solved the puzzle carefully."',
      options: ['students', 'solved', 'puzzle', 'carefully'],
      correctIndex: 3,
      explanation:
        '"Carefully" describes how the verb "solved" was carried out, making it an adverb of manner.'
    },
    {
      id: 'demo-c6-q2',
      classLevel: 'Class 6',
      subject: 'General Knowledge',
      topic: 'Indian Space Exploration (ISRO)',
      question:
        'Which ISRO spacecraft made India the first country to soft-land near the Moon’s South Pole in August 2023?',
      options: ['Mangalyaan', 'Chandrayaan-1', 'Chandrayaan-3', 'Aditya-L1'],
      correctIndex: 2,
      explanation:
        'ISRO’s Chandrayaan-3 mission successfully soft-landed the Vikram lander near the lunar South Pole on 23 August 2023.'
    }
  ],
  'Class 7': [
    {
      id: 'demo-c7-q1',
      classLevel: 'Class 7',
      subject: 'Mathematics',
      topic: 'Percentage & Discount',
      question:
        'A school bag marked at ₹500 is sold at a 20% discount. What is its selling price?',
      options: ['₹380', '₹400', '₹420', '₹480'],
      correctIndex: 1,
      explanation:
        'Discount = 20% of ₹500 = (20/100) × 500 = ₹100. Selling Price = ₹500 − ₹100 = ₹400.'
    },
    {
      id: 'demo-c7-q2',
      classLevel: 'Class 7',
      subject: 'Science',
      topic: 'Acids, Bases & Indicators',
      question:
        'What colour change occurs when a strip of blue litmus paper is dipped into fresh lemon juice?',
      options: [
        'It turns green',
        'It turns red',
        'It turns yellow',
        'It stays blue'
      ],
      correctIndex: 1,
      explanation:
        'Lemon juice contains citric acid, and acidic solutions turn blue litmus paper red.'
    }
  ],
  'Class 8': [
    {
      id: 'demo-c8-q1',
      classLevel: 'Class 8',
      subject: 'Science',
      topic: 'Cell Structure & Organelles',
      question:
        'Which cell organelle is known as the "powerhouse of the cell" because it produces ATP energy?',
      options: ['Ribosome', 'Golgi body', 'Mitochondrion', 'Lysosome'],
      correctIndex: 2,
      explanation:
        'Mitochondria carry out cellular respiration to release energy in the form of ATP molecules.'
    },
    {
      id: 'demo-c8-q2',
      classLevel: 'Class 8',
      subject: 'General Knowledge',
      topic: 'Indian Constitution & Civics',
      question:
        'Who served as the Chairman of the Drafting Committee of the Constitution of India?',
      options: [
        'Dr. Rajendra Prasad',
        'Dr. B. R. Ambedkar',
        'Sardar Vallabhbhai Patel',
        'Maulana Abul Kalam Azad'
      ],
      correctIndex: 1,
      explanation:
        'Dr. Bhimrao Ramji Ambedkar chaired the Drafting Committee of the Indian Constitution, while Dr. Rajendra Prasad was President of the Constituent Assembly.'
    }
  ],
  'Class 9': [
    {
      id: 'demo-c9-q1',
      classLevel: 'Class 9',
      subject: 'Mathematics',
      topic: 'Linear Equations in Two Variables',
      question: 'If x + y = 14 and x − y = 4, what is the value of x?',
      options: ['5', '7', '9', '10'],
      correctIndex: 2,
      explanation:
        'Adding (x + y = 14) and (x − y = 4) eliminates y, yielding 2x = 18, so x = 9.'
    },
    {
      id: 'demo-c9-q2',
      classLevel: 'Class 9',
      subject: 'English',
      topic: 'Active and Passive Voice',
      question:
        'Choose the correct passive voice form of: "The scientist discovered a new comet."',
      options: [
        'A new comet is discovered by the scientist.',
        'A new comet was discovered by the scientist.',
        'A new comet had discovered the scientist.',
        'The scientist was discovered by a new comet.'
      ],
      correctIndex: 1,
      explanation:
        'Simple past tense active ("discovered") converts to "was/were + past participle" ("was discovered") in the passive voice.'
    }
  ],
  'Class 10': [
    {
      id: 'demo-c10-q1',
      classLevel: 'Class 10',
      subject: 'Mathematics',
      topic: 'Quadratic Equations (SSC Algebra)',
      question:
        'Find the value of the discriminant (Δ = b² − 4ac) for the quadratic equation x² − 5x + 6 = 0.',
      options: ['0', '1', '25', '49'],
      correctIndex: 1,
      explanation:
        'Comparing with ax² + bx + c = 0 gives a = 1, b = −5, c = 6. Thus Δ = (−5)² − 4(1)(6) = 25 − 24 = 1.'
    },
    {
      id: 'demo-c10-q2',
      classLevel: 'Class 10',
      subject: 'Science',
      topic: 'Refraction & Lenses (SSC Science)',
      question:
        'What is the power of a convex lens having a focal length of 0.5 metres?',
      options: ['+0.5 D', '+1.0 D', '+2.0 D', '−2.0 D'],
      correctIndex: 2,
      explanation:
        'Power P = 1 / f (in metres). Because a convex lens has a positive focal length (+0.5 m), P = 1 / 0.5 = +2.0 D (Dioptre).'
    }
  ]
};

/**
 * Returns strictly the 2 unique demo questions assigned to the selected class (Maharashtra default).
 */
export function getDemoQuestionsForClass(
  classLevel: ClassLevel
): readonly [ClassDemoQuestion, ClassDemoQuestion] {
  return DEMO_QUESTIONS_BY_CLASS[classLevel];
}

/**
 * Returns strictly the 2 unique demo questions assigned to the selected (board, classLevel).
 * Preserves Maharashtra State Board questions unchanged.
 */
export function getDemoQuestionsForBoardAndClass(
  board: EducationBoard = 'Maharashtra',
  classLevel: ClassLevel = 'Class 1'
): readonly [ClassDemoQuestion, ClassDemoQuestion] {
  if (board === 'CBSE') {
    return CBSE_DEMO_QUESTIONS_BY_CLASS[classLevel] || DEMO_QUESTIONS_BY_CLASS[classLevel];
  }
  if (board === 'ICSE') {
    return ICSE_DEMO_QUESTIONS_BY_CLASS[classLevel] || DEMO_QUESTIONS_BY_CLASS[classLevel];
  }
  return DEMO_QUESTIONS_BY_CLASS[classLevel];
}
