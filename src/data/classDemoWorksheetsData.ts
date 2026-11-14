import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { OnlineWorksheet, WorksheetItemFormat, WorksheetQuestionItem } from './worksheetsData';
import { CBSE_DEMO_WORKSHEETS_BANK } from './boards/cbseDemoData';
import { ICSE_DEMO_WORKSHEETS_BANK } from './boards/icseDemoData';

export type DemoWorksheetSubject =
  | 'Mathematics'
  | 'English'
  | 'Science'
  | 'General Knowledge';

export interface DemoWorksheetSpec {
  subject: DemoWorksheetSubject;
  displaySubject?: SubjectName;
  chapterName: string;
  marathiSubtitle: string;
  questions: {
    format: WorksheetItemFormat;
    chapterTitle: string;
    prompt: string;
    options: [string, string, string, string];
    correctIndex: 0 | 1 | 2 | 3;
    explanation: string;
  }[];
}

export const CLASS_DEMO_WORKSHEETS_BANK: Record<
  ClassLevel,
  readonly [DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec, DemoWorksheetSpec]
> = {
  'Class 1': [
    {
      subject: 'Mathematics',
      chapterName: 'Numbers up to 50, Addition & Basic Shapes',
      marathiSubtitle: 'इयत्ता १ ली • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Counting & Addition',
          prompt: 'Aarav has 7 yellow balloons and 6 green balloons. How many balloons does he have altogether?',
          options: ['12', '13', '14', '11'],
          correctIndex: 1,
          explanation: 'Counting 6 steps forward from 7 gives 7 + 6 = 13 balloons.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Number Order (Before & After)',
          prompt: 'Which number comes right before 29 when counting forward?',
          options: ['27', '28', '30', '31'],
          correctIndex: 1,
          explanation: 'The number just before 29 is 29 − 1 = 28.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Basic 2D Shapes',
          prompt: 'Which shape has 4 equal sides and 4 straight corners like a chessboard?',
          options: ['Circle', 'Triangle', 'Square', 'Oval'],
          correctIndex: 2,
          explanation: 'A square has 4 equal straight sides and 4 corners.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Simple Subtraction',
          prompt: 'There were 15 apples in a basket. Meena ate 4 apples. How many apples are left?',
          options: ['9', '10', '11', '12'],
          correctIndex: 2,
          explanation: 'Subtracting 4 from 15 leaves 15 − 4 = 11 apples.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Comparing Numbers',
          prompt: 'Which number is the BIGGEST among: 19, 42, 27, 35?',
          options: ['19', '27', '35', '42'],
          correctIndex: 3,
          explanation: '42 has 4 tens, which is greater than 19, 27, and 35.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Phonics, Vowels, Articles & Naming Words',
      marathiSubtitle: 'इयत्ता १ ली • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Vowels & Articles',
          prompt: 'Fill in the blank with "a" or "an": "Sana is eating ___ orange."',
          options: ['a', 'an', 'is', 'on'],
          correctIndex: 1,
          explanation: '"Orange" begins with the vowel sound "o", so we use "an".'
        },
        {
          format: 'mcq',
          chapterTitle: 'One and Many (Plurals)',
          prompt: 'What is the plural (many) form of the word "book"?',
          options: ['bookes', 'books', 'bookies', 'booked'],
          correctIndex: 1,
          explanation: 'Adding "-s" to "book" forms the plural word "books".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Rhyming Words',
          prompt: 'Which word rhymes with "SUN"?',
          options: ['RUN', 'SIT', 'CAT', 'PEN'],
          correctIndex: 0,
          explanation: '"SUN" and "RUN" end with the same "-un" sound.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Action Words',
          prompt: 'Pick the action word (doing word) from the list below:',
          options: ['Chair', 'Jump', 'Mango', 'Blue'],
          correctIndex: 1,
          explanation: '"Jump" shows an action, whereas chair, mango, and blue are not action words.'
        },
        {
          format: 'true_false',
          chapterTitle: 'English Alphabet',
          prompt: 'Which of these letters is a VOWEL in the English alphabet?',
          options: ['B', 'M', 'U', 'T'],
          correctIndex: 2,
          explanation: 'The 5 vowels in English are A, E, I, O, and U.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Living Things, Our Body & Surroundings',
      marathiSubtitle: 'इयत्ता १ ली • विज्ञान व परिसर सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Living vs Non-Living',
          prompt: 'Which of the following is a LIVING thing that grows and needs food?',
          options: ['A toy car', 'A puppy', 'A plastic spoon', 'A stone'],
          correctIndex: 1,
          explanation: 'A puppy breathes, drinks water, eats food, and grows, so it is a living thing.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Sense Organs',
          prompt: 'Which sense organ helps us listen to sweet music and our teacher’s voice?',
          options: ['Nose', 'Eyes', 'Ears', 'Skin'],
          correctIndex: 2,
          explanation: 'Our ears are the sense organs used for hearing sounds.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Domestic & Wild Animals',
          prompt: 'Which animal lives in a jungle and is a wild animal?',
          options: ['Cow', 'Goat', 'Lion', 'Sheep'],
          correctIndex: 2,
          explanation: 'A lion lives in the forest/jungle, while cows, goats, and sheep are domestic farm animals.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Needs of Life',
          prompt: 'True or False: Plants need sunlight and water to grow healthy.',
          options: ['True', 'False', 'Only stones need water', 'Plants grow only in darkness'],
          correctIndex: 0,
          explanation: 'True! Plants need sunlight, air, and water to stay green and grow.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Day and Night Sky',
          prompt: 'What gives us bright warmth and light during the daytime?',
          options: ['The Moon', 'The Sun', 'Fireflies', 'Clouds'],
          correctIndex: 1,
          explanation: 'The Sun shines brightly in the sky during the day and gives us light and heat.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'India Basics, Colours & Days of the Week',
      marathiSubtitle: 'इयत्ता १ ली • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'National Symbols Intro',
          prompt: 'Which sweet yellow fruit is known as the "King of Fruits" and is India’s National Fruit?',
          options: ['Banana', 'Mango', 'Grapes', 'Apple'],
          correctIndex: 1,
          explanation: 'Mango is India’s National Fruit and is lovingly called the King of Fruits.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Calendar Basics',
          prompt: 'How many days are there in one week?',
          options: ['5 days', '6 days', '7 days', '10 days'],
          correctIndex: 2,
          explanation: 'There are 7 days in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Our Helpers',
          prompt: 'Who treats us with medicine when we have a fever or feel unwell?',
          options: ['Doctor', 'Postman', 'Baker', 'Painter'],
          correctIndex: 0,
          explanation: 'A doctor checks patients and gives medicine to help us get well.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Traffic Safety',
          prompt: 'What does the RED traffic light tell vehicles to do?',
          options: ['Go fast', 'Stop', 'Turn right only', 'Honk loudly'],
          correctIndex: 1,
          explanation: 'Red means STOP, Yellow means WAIT/SLOW DOWN, and Green means GO.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Our Flag',
          prompt: 'How many main horizontal colour bands are on India’s Tricolour (Tiranga) flag?',
          options: ['2', '3', '4', '5'],
          correctIndex: 1,
          explanation: 'India’s flag has 3 bands: Saffron at the top, White in the middle, and Green at the bottom.'
        }
      ]
    }
  ],

  'Class 2': [
    {
      subject: 'Mathematics',
      chapterName: '2-Digit Carry Addition, Tables & Money Coins',
      marathiSubtitle: 'इयत्ता २ री • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: '2-Digit Addition with Carry',
          prompt: 'What is the sum of 38 + 27?',
          options: ['55', '64', '65', '75'],
          correctIndex: 2,
          explanation: 'Ones: 8 + 7 = 15 (write 5, carry 1). Tens: 3 + 2 + 1 = 6. Total = 65.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Multiplication Tables',
          prompt: 'A bicycle has 2 wheels. How many wheels do 6 bicycles have in all?',
          options: ['8', '10', '12', '14'],
          correctIndex: 2,
          explanation: '6 bicycles × 2 wheels each = 12 wheels.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Skip Counting',
          prompt: 'Fill in the missing number in the skip-counting pattern: 15, 20, 25, ___, 35',
          options: ['28', '30', '32', '29'],
          correctIndex: 1,
          explanation: 'Adding 5 each time gives 25 + 5 = 30.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Currency',
          prompt: 'Kabir has two ₹10 notes and one ₹5 coin. How much money does he have in total?',
          options: ['₹15', '₹20', '₹25', '₹30'],
          correctIndex: 2,
          explanation: '₹10 + ₹10 + ₹5 = ₹25.'
        },
        {
          format: 'math_exercise',
          chapterTitle: '2-Digit Subtraction',
          prompt: 'Subtract 24 from 60. What number do you get?',
          options: ['34', '36', '44', '46'],
          correctIndex: 1,
          explanation: '60 − 24 = 36 (check: 36 + 24 = 60).'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Pronouns, Opposites, Punctuation & Simple Verbs',
      marathiSubtitle: 'इयत्ता २ री • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Pronouns',
          prompt: 'Choose the correct pronoun to replace "Maya" in: "Maya likes painting. ___ uses bright colours."',
          options: ['He', 'She', 'It', 'They'],
          correctIndex: 1,
          explanation: '"She" is used for a girl or woman in place of repeating her name.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Opposite Words (Antonyms)',
          prompt: 'What is the opposite of the word "HEAVY"?',
          options: ['Dark', 'Light', 'Tall', 'Empty'],
          correctIndex: 1,
          explanation: 'The opposite of "heavy" is "light".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Punctuation Marks',
          prompt: 'Which punctuation mark should end the asking sentence: "Where is my blue pencil"',
          options: ['Full stop (.)', 'Comma (,)', 'Question mark (?)', 'Exclamation mark (!)'],
          correctIndex: 2,
          explanation: 'An asking sentence (question) always ends with a question mark (?).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Simple Past Tense',
          prompt: 'Choose the correct past action word: "Yesterday, Rohan ___ a funny cartoon."',
          options: ['watch', 'watched', 'watching', 'watches'],
          correctIndex: 1,
          explanation: 'Since the sentence says "Yesterday", we use the past tense form "watched".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Alphabetical Order',
          prompt: 'Which word comes FIRST in alphabetical (A to Z) order?',
          options: ['Zebra', 'Banana', 'Apple', 'Grapes'],
          correctIndex: 2,
          explanation: '"Apple" starts with "A", so it comes first in A–Z order.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Plant Types, Animal Food Habits & Water States',
      marathiSubtitle: 'इयत्ता २ री • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Plant Kingdom Basics',
          prompt: 'Big and tall plants with thick woody trunks like banyan and neem are called:',
          options: ['Herbs', 'Climbers', 'Trees', 'Creepers'],
          correctIndex: 2,
          explanation: 'Trees are tall plants with a strong, thick woody stem called a trunk.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Animal Eating Habits',
          prompt: 'Animals like cows and deer that eat only grass and plants are called:',
          options: ['Carnivores', 'Herbivores', 'Omnivores', 'Scavengers'],
          correctIndex: 1,
          explanation: 'Plant-eating animals are called herbivores.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Forms of Water',
          prompt: 'When an ice cube is kept in warm sunlight, it melts into:',
          options: ['Solid rock', 'Liquid water', 'Wood', 'Sand'],
          correctIndex: 1,
          explanation: 'Heating solid ice melts it into liquid water.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Healthy Food',
          prompt: 'Which food helps build strong bones and teeth because it is rich in calcium?',
          options: ['Milk and curd', 'Fizzy soda', 'Potato chips', 'Candy'],
          correctIndex: 0,
          explanation: 'Milk and dairy foods like curd are rich in calcium for strong bones and teeth.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Air Around Us',
          prompt: 'Moving air that blows gently or fast is called:',
          options: ['Shadow', 'Wind', 'Soil', 'Steam'],
          correctIndex: 1,
          explanation: 'Air in motion is known as wind.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Months, Directions, Seasons & Indian Pride',
      marathiSubtitle: 'इयत्ता २ री • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Calendar & Months',
          prompt: 'Which month of the year has only 28 days (or 29 days in a leap year)?',
          options: ['January', 'February', 'April', 'December'],
          correctIndex: 1,
          explanation: 'February is the shortest month with 28 days in ordinary years and 29 days in a leap year.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Compass Directions',
          prompt: 'In which direction does the Sun appear to rise every morning?',
          options: ['West', 'North', 'East', 'South'],
          correctIndex: 2,
          explanation: 'The Sun rises in the East and sets in the West.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'National Symbols',
          prompt: 'Which flower is the National Flower of India?',
          options: ['Rose', 'Marigold', 'Lotus', 'Sunflower'],
          correctIndex: 2,
          explanation: 'The sacred Lotus is the National Flower of India.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Festivals of India',
          prompt: 'Which festival is celebrated with diyas (earthen lamps) and known as the "Festival of Lights"?',
          options: ['Holi', 'Diwali', 'Pongal', 'Baisakhi'],
          correctIndex: 1,
          explanation: 'Diwali is called the Festival of Lights because families light diyas and lanterns.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Our Planet Earth',
          prompt: 'Which shape best describes our planet Earth?',
          options: ['Flat square', 'Round sphere like a ball', 'Triangle', 'Cube'],
          correctIndex: 1,
          explanation: 'The Earth is round like a giant ball (a slightly flattened sphere).'
        }
      ]
    }
  ],

  'Class 3': [
    {
      subject: 'Mathematics',
      chapterName: '3-Digit Place Value, Multiplication, Division & Basic Fractions',
      marathiSubtitle: 'इयत्ता ३ री • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Place Value & Expanded Form',
          prompt: 'What is the correct expanded form of the 3-digit number 745?',
          options: ['7 + 4 + 5', '700 + 40 + 5', '70 + 400 + 5', '700 + 450'],
          correctIndex: 1,
          explanation: '7 is in the hundreds place (700), 4 in the tens place (40), and 5 in the ones place (5).'
        },
        {
          format: 'math_exercise',
          chapterTitle: '2-Digit by 1-Digit Multiplication',
          prompt: 'A storybook has 24 pages in one chapter. How many pages are in 4 such chapters?',
          options: ['86', '92', '96', '104'],
          correctIndex: 2,
          explanation: '24 × 4 = (20 × 4) + (4 × 4) = 80 + 16 = 96 pages.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Equal Sharing (Division)',
          prompt: 'If 48 laddoos are packed equally into 6 boxes, how many laddoos go into each box?',
          options: ['6', '7', '8', '9'],
          correctIndex: 2,
          explanation: '48 ÷ 6 = 8 laddoos per box.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Length Conversion',
          prompt: 'How many centimetres are there in 3 metres? (1 metre = 100 cm)',
          options: ['30 cm', '300 cm', '3,000 cm', '103 cm'],
          correctIndex: 1,
          explanation: 'Since 1 m = 100 cm, 3 m = 3 × 100 = 300 cm.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Fractions Intro',
          prompt: 'A roti is cut into 4 equal slices. If Neha eats 1 slice, what fraction of the roti did she eat?',
          options: ['1/2', '1/3', '1/4', '3/4'],
          correctIndex: 2,
          explanation: 'Eating 1 part out of 4 equal parts represents the fraction 1/4 (one-quarter).'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Proper Nouns, Prepositions, Conjunctions & Homophones',
      marathiSubtitle: 'इयत्ता ३ री • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Proper vs Common Nouns',
          prompt: 'Which word in this sentence is a PROPER noun and always starts with a capital letter: "We visited Pune in May."',
          options: ['visited', 'in', 'Pune', 'We'],
          correctIndex: 2,
          explanation: '"Pune" is the specific name of a city, making it a proper noun.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Prepositions of Place',
          prompt: 'Choose the right preposition: "The cat is sleeping ___ the wooden table."',
          options: ['under', 'fast', 'happy', 'sing'],
          correctIndex: 0,
          explanation: '"Under" tells us the position of the cat relative to the table.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Joining Words (Conjunctions)',
          prompt: 'Join the ideas cleanly: "I wanted to play outside ___ it started raining heavily."',
          options: ['but', 'because', 'or', 'if'],
          correctIndex: 0,
          explanation: '"But" connects two contrasting ideas: wanting to play outside versus the rain.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Adjectives (Describing Words)',
          prompt: 'Identify the adjective in: "The clever fox found sweet grapes." (Choose the word describing "fox")',
          options: ['found', 'clever', 'grapes', 'the'],
          correctIndex: 1,
          explanation: '"Clever" describes the quality of the noun "fox", so it is an adjective.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Homophones',
          prompt: 'Select the correct word: "The bright ___ shines in the blue sky."',
          options: ['son', 'sun', 'sum', 'soon'],
          correctIndex: 1,
          explanation: '"Sun" refers to the star in the sky, whereas "son" means a male child.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Water Cycle, Photosynthesis Basics, Digestive Organ & Soil',
      marathiSubtitle: 'इयत्ता ३ री • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'The Water Cycle',
          prompt: 'What do we call the process when sun’s heat turns liquid river water into invisible water vapour?',
          options: ['Freezing', 'Evaporation', 'Melting', 'Condensation'],
          correctIndex: 1,
          explanation: 'Evaporation occurs when liquid water warms up and turns into water vapour rising into the air.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Food Factory of Plants',
          prompt: 'Which green part of the plant makes food using sunlight, water, and air?',
          options: ['Root', 'Leaf', 'Bark', 'Seed'],
          correctIndex: 1,
          explanation: 'Leaves contain green chlorophyll and act as the kitchen (food factory) of a plant.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Human Body Basics',
          prompt: 'Which internal organ pumps blood to every part of the human body?',
          options: ['Stomach', 'Lungs', 'Heart', 'Kidney'],
          correctIndex: 2,
          explanation: 'The heart beats continuously to pump blood throughout the body.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Bird Beaks & Adaptations',
          prompt: 'Why does a woodpecker have a strong, sharp chisel-like beak?',
          options: ['To swim in ponds', 'To peck holes in tree bark for insects', 'To crack nuts in water', 'To scoop mud'],
          correctIndex: 1,
          explanation: 'A woodpecker’s sharp, chisel-shaped beak drills into tree bark to find insects.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Soil & Rocks',
          prompt: 'Which type of soil holds very little water and is commonly seen on beaches and deserts?',
          options: ['Clayey soil', 'Sandy soil', 'Loamy soil', 'Muddy silt'],
          correctIndex: 1,
          explanation: 'Sandy soil has large particles with big spaces, so water drains quickly through it.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Indian Geography, Capitals, Continents & Famous Landmarks',
      marathiSubtitle: 'इयत्ता ३ री • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'India & Capitals',
          prompt: 'What is the capital city of Maharashtra state?',
          options: ['Nagpur', 'Pune', 'Mumbai', 'Nashik'],
          correctIndex: 2,
          explanation: 'Mumbai is the capital city of Maharashtra (with Nagpur serving as the winter session capital).'
        },
        {
          format: 'mcq',
          chapterTitle: 'World Continents',
          prompt: 'How many continents are there on Earth, and which is the largest one where India is located?',
          options: ['5 continents; Europe', '7 continents; Asia', '6 continents; Africa', '8 continents; Australia'],
          correctIndex: 1,
          explanation: 'There are 7 continents on Earth, and Asia is the largest continent, home to India.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Rivers of India',
          prompt: 'Which long river is often called the "Dakshin Ganga" (Ganga of the South) and flows through Maharashtra?',
          options: ['Godavari', 'Yamuna', 'Brahmaputra', 'Sutlej'],
          correctIndex: 0,
          explanation: 'The Godavari originates at Trimbakeshwar in Maharashtra and is called Dakshin Ganga.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Monuments',
          prompt: 'In which city is the iconic "Gateway of India" located?',
          options: ['Delhi', 'Mumbai', 'Agra', 'Jaipur'],
          correctIndex: 1,
          explanation: 'The Gateway of India overlooks the Arabian Sea in Mumbai, Maharashtra.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Earth Rotation',
          prompt: 'How long does the Earth take to complete one full spin (rotation) on its axis to cause day and night?',
          options: ['12 hours', '24 hours', '7 days', '365 days'],
          correctIndex: 1,
          explanation: 'Earth completes one rotation on its axis in 24 hours (1 day), causing day and night.'
        }
      ]
    }
  ],

  'Class 4': [
    {
      subject: 'Mathematics',
      chapterName: '5-Digit Numbers, Perimeter, Like Fractions & Division with Remainder',
      marathiSubtitle: 'इयत्ता ४ थी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Perimeter of Figures',
          prompt: 'A square garden has a side length of 12 metres. What is its total perimeter?',
          options: ['24 m', '36 m', '48 m', '144 m'],
          correctIndex: 2,
          explanation: 'Perimeter of a square = 4 × side = 4 × 12 = 48 metres.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Adding Like Fractions',
          prompt: 'Solve: 2/7 + 3/7 = ?',
          options: ['5/14', '5/7', '6/7', '1/7'],
          correctIndex: 1,
          explanation: 'When denominators are equal, add the numerators: (2 + 3)/7 = 5/7.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Division with Remainder',
          prompt: 'When 53 marbles are divided equally among 8 friends, how many marbles remain left over?',
          options: ['3', '4', '5', '6'],
          correctIndex: 2,
          explanation: '8 × 6 = 48. Leftover remainder = 53 − 48 = 5 marbles.'
        },
        {
          format: 'mcq',
          chapterTitle: '5-Digit Number Sense',
          prompt: 'What is the smallest 4-digit number that can be formed using the digits 5, 0, 8, 2 (each once)?',
          options: ['0258', '2058', '2508', '2085'],
          correctIndex: 1,
          explanation: 'Zero cannot be placed first in a 4-digit number, so 2 goes first followed by 0, 5, 8 → 2,058.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Time Calculation',
          prompt: 'A school bus leaves at 7:45 AM and reaches school at 8:20 AM. How many minutes did the journey take?',
          options: ['25 minutes', '30 minutes', '35 minutes', '45 minutes'],
          correctIndex: 2,
          explanation: 'From 7:45 to 8:00 is 15 minutes; from 8:00 to 8:20 is 20 minutes. Total = 15 + 20 = 35 minutes.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Collective Nouns, Adverbs, Possessives & Verb Tenses',
      marathiSubtitle: 'इयत्ता ४ थी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Collective Nouns',
          prompt: 'Select the correct collective noun: "A ___ of stars twinkled in the clear night sky."',
          options: ['bunch', 'galaxy', 'flock', 'pride'],
          correctIndex: 1,
          explanation: 'A vast group of stars is called a "galaxy" (or constellation for patterns).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Adverbs of Manner',
          prompt: 'Choose the correct adverb to complete: "The tortoise walked ___ toward the finish line."',
          options: ['slow', 'slowly', 'slower', 'slowness'],
          correctIndex: 1,
          explanation: '"Slowly" modifies the verb "walked", telling us how the tortoise walked.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Possessive Apostrophe',
          prompt: 'Which option shows the correct possessive form for one boy owning a bicycle?',
          options: ['The boys bicycle', 'The boy’s bicycle', 'The boys’s bicycle', 'The boy bicycle’s'],
          correctIndex: 1,
          explanation: 'For a singular noun ("boy"), add apostrophe + s ("boy’s") to show ownership.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Present Continuous Tense',
          prompt: 'Fill in the blank: "Look! The children ___ in the playground right now."',
          options: ['is playing', 'are playing', 'was playing', 'plays'],
          correctIndex: 1,
          explanation: 'Plural subject "children" takes "are playing" in the present continuous tense.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Prefixes',
          prompt: 'Add the correct prefix to "honest" to form its opposite meaning:',
          options: ['unhonest', 'inhonest', 'dishonest', 'rehonest'],
          correctIndex: 2,
          explanation: 'The prefix "dis-" turns "honest" into "dishonest".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Nutrition, Adaptations, Force, Friction & Simple Machines',
      marathiSubtitle: 'इयत्ता ४ थी • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Vitamins & Nutrition',
          prompt: 'Which vitamin do we get abundantly from citrus fruits like oranges and lemons to keep gums healthy?',
          options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
          correctIndex: 1,
          explanation: 'Citrus fruits are rich in Vitamin C (ascorbic acid), which keeps gums strong and boosts immunity.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Plant Adaptations',
          prompt: 'Why are the leaves of a desert cactus reduced to sharp spines?',
          options: ['To attract bees', 'To prevent loss of water by transpiration', 'To absorb moonlight', 'To float on water'],
          correctIndex: 1,
          explanation: 'Needle-like spines minimize water loss in hot dry deserts and protect the plant from animals.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Force & Friction',
          prompt: 'Why does a rolling football eventually slow down and stop on grass even if nobody touches it?',
          options: ['Magnetic pull', 'Force of friction', 'Electric spark', 'Buoyancy'],
          correctIndex: 1,
          explanation: 'Friction between the grass surface and the ball opposes its motion and makes it stop.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Simple Machines',
          prompt: 'A flagpole uses a grooved wheel and rope to pull the flag up easily. What simple machine is that?',
          options: ['Wedge', 'Screw', 'Pulley', 'Inclined plane'],
          correctIndex: 2,
          explanation: 'A pulley has a grooved wheel with a rope that helps lift loads by changing the direction of force.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Separating Mixtures',
          prompt: 'Which method separates insoluble tea leaves from brewed liquid tea?',
          options: ['Filtration (straining)', 'Evaporation', 'Freezing', 'Magnetism'],
          correctIndex: 0,
          explanation: 'Straining tea through a sieve/filter retains the solid leaves and lets liquid pass (filtration).'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Shivaji Maharaj Heritage, Indian States & Science Pioneers',
      marathiSubtitle: 'इयत्ता ४ थी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'History of Swarajya',
          prompt: 'At which fort in Pune district was Chhatrapati Shivaji Maharaj born in 1630?',
          options: ['Raigad Fort', 'Torna Fort', 'Shivneri Fort', 'Panhala Fort'],
          correctIndex: 2,
          explanation: 'Chhatrapati Shivaji Maharaj was born on 19 February 1630 at Shivneri Fort near Junnar.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian States & Capitals',
          prompt: 'Jaipur, famously nicknamed the "Pink City", is the capital of which Indian state?',
          options: ['Gujarat', 'Rajasthan', 'Punjab', 'Madhya Pradesh'],
          correctIndex: 1,
          explanation: 'Jaipur is the capital of Rajasthan and is known as the Pink City.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Indian Space Pioneers',
          prompt: 'Who is remembered as the "Father of the Indian Space Program" who founded ISRO’s early vision?',
          options: ['Dr. Vikram Sarabhai', 'Sir C. V. Raman', 'Srinivasa Ramanujan', 'Homi Bhabha'],
          correctIndex: 0,
          explanation: 'Dr. Vikram Sarabhai established INCOSPAR (which became ISRO) and pioneered India’s space program.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Olympic Symbols',
          prompt: 'How many interlocking coloured rings appear on the Olympic Games flag representing 5 inhabited continents?',
          options: ['4 rings', '5 rings', '6 rings', '7 rings'],
          correctIndex: 1,
          explanation: 'The 5 Olympic rings (blue, yellow, black, green, red) represent the union of five continents.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Classical Dances of India',
          prompt: 'Bharatanatyam is a famous classical dance form originating from which southern Indian state?',
          options: ['Tamil Nadu', 'Assam', 'Odisha', 'Maharashtra'],
          correctIndex: 0,
          explanation: 'Bharatanatyam originated in the temples of Tamil Nadu.'
        }
      ]
    }
  ],

  'Class 5': [
    {
      subject: 'Mathematics',
      chapterName: 'HCF & LCM, Decimals, Area & Angle Classification',
      marathiSubtitle: 'इयत्ता ५ वी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'LCM & HCF',
          prompt: 'Two school bells ring every 12 minutes and 18 minutes. If they ring together at 9:00 AM, after how many minutes will they ring together next?',
          options: ['24 minutes', '30 minutes', '36 minutes', '54 minutes'],
          correctIndex: 2,
          explanation: 'The Least Common Multiple (LCM) of 12 and 18 is 36 minutes (9:36 AM).'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Decimals & Fractions',
          prompt: 'Convert the fraction 3/5 into its decimal form:',
          options: ['0.35', '0.53', '0.6', '0.75'],
          correctIndex: 2,
          explanation: 'Multiplying numerator and denominator by 2 gives 6/10 = 0.6.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Area of a Rectangle',
          prompt: 'A rectangular classroom floor is 9 m long and 6 m wide. What is its area?',
          options: ['15 sq m', '30 sq m', '54 sq m', '60 sq m'],
          correctIndex: 2,
          explanation: 'Area of a rectangle = length × breadth = 9 × 6 = 54 square metres.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Angles Classification',
          prompt: 'An angle measuring 135° (greater than 90° and less than 180°) is classified as an ___ angle.',
          options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
          correctIndex: 2,
          explanation: 'Angles between 90° and 180° are obtuse angles.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Decimal Addition',
          prompt: 'Calculate: 14.75 + 5.6 = ?',
          options: ['19.35', '20.25', '20.35', '21.35'],
          correctIndex: 2,
          explanation: 'Aligning decimal points: 14.75 + 5.60 = 20.35.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Synonyms, Modals, Idioms & Subject-Verb Precision',
      marathiSubtitle: 'इयत्ता ५ वी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Vocabulary & Synonyms',
          prompt: 'Choose the closest synonym (similar meaning word) for "COURAGEOUS":',
          options: ['Timid', 'Valiant', 'Careless', 'Weary'],
          correctIndex: 1,
          explanation: '"Valiant" means brave and determined, just like "courageous".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Modal Verbs',
          prompt: 'Select the best modal verb for duty/rule: "Students ___ wear their school ID card inside the campus."',
          options: ['might', 'must', 'could', 'would'],
          correctIndex: 1,
          explanation: '"Must" expresses a mandatory rule or strong obligation.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Idioms & Meanings',
          prompt: 'What does the idiom "a piece of cake" mean in English?',
          options: ['Something very tasty', 'Something very easy to do', 'A birthday party', 'A difficult puzzle'],
          correctIndex: 1,
          explanation: '"A piece of cake" means a task that is effortless or very easy to finish.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Conjunctions (Pair)',
          prompt: 'Complete the sentence: "___ she was tired, she completed her science project on time."',
          options: ['Although', 'Because', 'Unless', 'So'],
          correctIndex: 0,
          explanation: '"Although" introduces a contrast between feeling tired and finishing on time.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Direct & Indirect Objects',
          prompt: 'Identify the subject of the sentence: "Across the quiet valley flew a flock of white cranes."',
          options: ['the quiet valley', 'flew', 'a flock of white cranes', 'across'],
          correctIndex: 2,
          explanation: 'The doer performing the verb "flew" is "a flock of white cranes" (inverted subject).'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Human Systems, Seed Dispersal, Light & Shadows',
      marathiSubtitle: 'इयत्ता ५ वी • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Seed Dispersal',
          prompt: 'How are lightweight coconut fruits usually dispersed over long distances in coastal regions?',
          options: ['By wind', 'By bursting', 'By floating on water', 'By clinging to fur'],
          correctIndex: 2,
          explanation: 'Coconuts have a fibrous outer husk containing trapped air, letting them float on ocean water.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Light & Materials',
          prompt: 'Materials like clear glass and clean air that allow almost all light to pass through are called:',
          options: ['Opaque', 'Translucent', 'Transparent', 'Reflective'],
          correctIndex: 2,
          explanation: 'Transparent materials let light pass straight through so objects behind them appear clear.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Respiratory System',
          prompt: 'When we inhale fresh air, which gas is absorbed by our lungs into the bloodstream?',
          options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Argon'],
          correctIndex: 2,
          explanation: 'The lungs take in Oxygen from inhaled air and release Carbon dioxide when we exhale.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Deficiency Diseases',
          prompt: 'Night blindness (difficulty seeing in dim light) is caused by the deficiency of which vitamin?',
          options: ['Vitamin A', 'Vitamin B1', 'Vitamin C', 'Vitamin D'],
          correctIndex: 0,
          explanation: 'Deficiency of Vitamin A (found in carrots and spinach) causes night blindness.'
        },
        {
          format: 'true_false',
          chapterTitle: 'Rocks & Minerals',
          prompt: 'Which sedimentary/metamorphic rock was used to build the Taj Mahal because of its smooth white finish?',
          options: ['Granite', 'Marble', 'Basalt', 'Pumice'],
          correctIndex: 1,
          explanation: 'White Makrana marble (a metamorphic rock formed from limestone) was used to build the Taj Mahal.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Nobel Laureates of India, Constitution & Renewable Energy',
      marathiSubtitle: 'इयत्ता ५ वी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian Nobel Laureates',
          prompt: 'Who became the first Indian (and first Asian) to win the Nobel Prize in Literature in 1913 for "Gitanjali"?',
          options: ['Sir C. V. Raman', 'Rabindranath Tagore', 'Mother Teresa', 'Amartya Sen'],
          correctIndex: 1,
          explanation: 'Rabindranath Tagore won the 1913 Nobel Prize in Literature for his poetry collection Gitanjali.'
        },
        {
          format: 'mcq',
          chapterTitle: 'National Days',
          prompt: 'Why is 28th February celebrated every year as National Science Day in India?',
          options: ['Chandrayaan launch', 'Discovery of the Raman Effect by C. V. Raman', 'First Indian railway', 'Birthday of Aryabhata'],
          correctIndex: 1,
          explanation: 'Sir C. V. Raman announced the discovery of the Raman Effect on 28 February 1928.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Renewable Energy',
          prompt: 'Which of the following is a NON-RENEWABLE fossil fuel energy source?',
          options: ['Solar energy', 'Wind energy', 'Coal', 'Hydroelectric power'],
          correctIndex: 2,
          explanation: 'Coal takes millions of years to form underground and gets depleted on burning, unlike solar/wind.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Geography of India',
          prompt: 'Which is the largest desert in India, spreading across western Rajasthan?',
          options: ['Gobi Desert', 'Thar Desert', 'Sahara Desert', 'Atacama Desert'],
          correctIndex: 1,
          explanation: 'The Thar Desert (Great Indian Desert) lies in northwestern India, mainly in Rajasthan.'
        },
        {
          format: 'mcq',
          chapterTitle: 'World Capitals',
          prompt: 'Tokyo is the capital city of which island nation known as the "Land of the Rising Sun"?',
          options: ['South Korea', 'Japan', 'Thailand', 'Indonesia'],
          correctIndex: 1,
          explanation: 'Tokyo is the capital of Japan.'
        }
      ]
    }
  ],

  'Class 6': [
    {
      subject: 'Mathematics',
      chapterName: 'Integers, Ratio & Proportion, Basic Algebra & Prime Factors',
      marathiSubtitle: 'इयत्ता ६ वी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Operations on Integers',
          prompt: 'Evaluate the integer expression: (−12) + (+7) − (−4) = ?',
          options: ['−15', '−9', '−1', '+1'],
          correctIndex: 2,
          explanation: '(−12) + 7 = −5; then subtracting −4 means adding +4: −5 + 4 = −1.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Ratio & Proportion',
          prompt: 'If 6 notebooks cost ₹150, what will be the cost of 10 such notebooks?',
          options: ['₹225', '₹240', '₹250', '₹300'],
          correctIndex: 2,
          explanation: 'Cost of 1 notebook = 150 ÷ 6 = ₹25. Cost of 10 notebooks = 10 × 25 = ₹250.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Introduction to Algebra',
          prompt: 'If x = 4, what is the value of the algebraic expression 3x + 7?',
          options: ['14', '19', '21', '34'],
          correctIndex: 1,
          explanation: 'Substitute x = 4: 3(4) + 7 = 12 + 7 = 19.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Prime Factorization',
          prompt: 'Which option shows the complete prime factorization of 36?',
          options: ['4 × 9', '2 × 3 × 6', '2 × 2 × 3 × 3', '2 × 18'],
          correctIndex: 2,
          explanation: 'Prime factors of 36 are 2 × 2 × 3 × 3 (since 4, 6, 9, 18 are composite numbers).'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Triangle Types',
          prompt: 'A triangle has sides measuring 5 cm, 5 cm, and 8 cm. What type of triangle is it based on sides?',
          options: ['Equilateral triangle', 'Isosceles triangle', 'Scalene triangle', 'Right triangle'],
          correctIndex: 1,
          explanation: 'A triangle with exactly two sides equal in length (5 cm and 5 cm) is an isosceles triangle.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Transitive Verbs, Figures of Speech, Reported Speech & Clauses',
      marathiSubtitle: 'इयत्ता ६ वी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Figures of Speech',
          prompt: 'Identify the figure of speech in: "The classroom was a buzzing beehive before the science fair."',
          options: ['Simile', 'Metaphor', 'Alliteration', 'Onomatopoeia'],
          correctIndex: 1,
          explanation: 'Directly calling the classroom a "buzzing beehive" without "like" or "as" is a Metaphor.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Transitive vs Intransitive Verbs',
          prompt: 'In which sentence is the verb used TRANSITIVELY (with a direct object)?',
          options: ['The baby slept peacefully.', 'The birds fly high.', 'Kiran kicked the football.', 'She laughed loudly.'],
          correctIndex: 2,
          explanation: 'The verb "kicked" acts directly on the object "the football", making it transitive.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Direct to Indirect Speech',
          prompt: 'Choose the correct indirect speech for: "Ritu said, ‘I am reading a novel.’"',
          options: ['Ritu said that she is reading a novel.', 'Ritu said that she was reading a novel.', 'Ritu asked she was reading a novel.', 'Ritu said she reads a novel.'],
          correctIndex: 1,
          explanation: 'When the reporting verb is past ("said"), present continuous ("am reading") shifts to past continuous ("was reading").'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Clauses & Prepositions',
          prompt: 'Complete with the right preposition: "He has been living in Nashik ___ 2019."',
          options: ['for', 'from', 'since', 'by'],
          correctIndex: 2,
          explanation: 'We use "since" before a specific starting point in time (2019), and "for" before a duration.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Antonyms in Context',
          prompt: 'Which word is the exact antonym of "ABUNDANT"?',
          options: ['Plentiful', 'Scarce', 'Generous', 'Vast'],
          correctIndex: 1,
          explanation: '"Abundant" means plenty; its opposite is "scarce" (very limited/rare).'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Electric Circuits, Magnets, Skeletal Joints & Food Tests',
      marathiSubtitle: 'इयत्ता ६ वी • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Electricity & Conductors',
          prompt: 'Which material should be placed across a gap in a circuit to make the bulb glow?',
          options: ['Dry wooden stick', 'Rubber eraser', 'Copper wire', 'Plastic ruler'],
          correctIndex: 2,
          explanation: 'Copper is a good conductor of electricity, whereas wood, rubber, and plastic are insulators.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Magnets & Poles',
          prompt: 'What happens when the North pole of one bar magnet is brought close to the North pole of another bar magnet?',
          options: ['They strongly attract each other', 'They repel (push away) each other', 'Both lose magnetism immediately', 'They turn into copper'],
          correctIndex: 1,
          explanation: 'Like magnetic poles (North–North or South–South) repel each other, while unlike poles attract.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Human Skeleton & Joints',
          prompt: 'Which type of joint in our shoulder and hip allows movement in all circular directions?',
          options: ['Hinge joint', 'Ball and socket joint', 'Pivot joint', 'Fixed joint'],
          correctIndex: 1,
          explanation: 'A ball-and-socket joint lets the arm and leg swing freely in multiple directions.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Testing Food Nutrients',
          prompt: 'When dilute iodine solution is dropped onto a slice of boiled potato, it turns blue-black. This proves the presence of:',
          options: ['Proteins', 'Fats', 'Starch (carbohydrates)', 'Vitamin C'],
          correctIndex: 2,
          explanation: 'Starch reacts with iodine solution to produce a characteristic blue-black colour.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Separation Methods',
          prompt: 'Farmers separate lighter chaff/husk from heavier grain seeds using wind. This process is called:',
          options: ['Sieving', 'Winnowing', 'Decantation', 'Sublimation'],
          correctIndex: 1,
          explanation: 'Winnowing uses wind or blowing air to separate lighter husk from heavier grain.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Ancient Civilizations, Indian Parliament, UNESCO Heritage & World Bodies',
      marathiSubtitle: 'इयत्ता ६ वी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Ancient Civilizations',
          prompt: 'The ancient "Great Bath" and planned drainage grid belong to which Bronze Age civilization?',
          options: ['Indus Valley (Harappan) Civilization', 'Roman Empire', 'Mayan Civilization', 'Inca Empire'],
          correctIndex: 0,
          explanation: 'The Great Bath was discovered at Mohenjo-daro, a major city of the Indus Valley Civilization.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Maharashtra World Heritage',
          prompt: 'The famous rock-cut Ajanta and Ellora Caves (UNESCO World Heritage Sites) are located in which district of Maharashtra?',
          options: ['Chhatrapati Sambhajinagar (Aurangabad)', 'Satara', 'Kolhapur', 'Ratnagiri'],
          correctIndex: 0,
          explanation: 'Both Ajanta and Ellora Caves are located near Chhatrapati Sambhajinagar in Maharashtra.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Indian Parliament',
          prompt: 'Which two Houses together with the President form the Parliament of India?',
          options: ['Lok Sabha and Vidhan Sabha', 'Lok Sabha and Rajya Sabha', 'Rajya Sabha and High Court', 'Vidhan Parishad and Gram Sabha'],
          correctIndex: 1,
          explanation: 'The Indian Parliament consists of the President, the Lok Sabha (Lower House), and the Rajya Sabha (Upper House).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Atmosphere Protection',
          prompt: 'Which layer in the Earth’s stratosphere protects us from harmful Ultraviolet (UV) rays of the Sun?',
          options: ['Carbon monoxide layer', 'Ozone layer (O₃)', 'Nitrogen crust', 'Mesosphere fog'],
          correctIndex: 1,
          explanation: 'The Ozone layer absorbs most of the Sun’s harmful UV radiation.'
        },
        {
          format: 'mcq',
          chapterTitle: 'International Organizations',
          prompt: 'In which city is the headquarters of the World Health Organization (WHO) situated?',
          options: ['Geneva, Switzerland', 'New York, USA', 'Paris, France', 'London, UK'],
          correctIndex: 0,
          explanation: 'The World Health Organization (WHO) is headquartered in Geneva, Switzerland.'
        }
      ]
    }
  ],

  'Class 7': [
    {
      subject: 'Mathematics',
      chapterName: 'Profit & Loss, Simple Interest, Exponents & Angle Pairs',
      marathiSubtitle: 'इयत्ता ७ वी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Simple Interest',
          prompt: 'Find the Simple Interest (SI) on a principal of ₹2,000 at 5% per annum for 3 years.',
          options: ['₹250', '₹300', '₹350', '₹600'],
          correctIndex: 1,
          explanation: 'SI = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = ₹300.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Profit & Loss Percentage',
          prompt: 'A shopkeeper buys a cricket bat for ₹400 and sells it for ₹460. What is the profit percentage?',
          options: ['12%', '15%', '16%', '20%'],
          correctIndex: 1,
          explanation: 'Profit = ₹60. Profit % = (60 / 400) × 100 = 15%.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Laws of Exponents',
          prompt: 'Simplify using laws of indices: (2³ × 2⁴) ÷ 2⁵ = ?',
          options: ['2', '4', '8', '16'],
          correctIndex: 1,
          explanation: '2^(3 + 4 − 5) = 2² = 4.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Supplementary Angles',
          prompt: 'Two angles are supplementary. If one angle measures 65°, what is the measure of the other angle?',
          options: ['25°', '35°', '115°', '125°'],
          correctIndex: 2,
          explanation: 'Supplementary angles add up to 180°. Therefore, 180° − 65° = 115°.'
        },
        {
          format: 'logical_reasoning',
          chapterTitle: 'Pythagoras Theorem Intro',
          prompt: 'In a right-angled triangle, the two perpendicular sides are 6 cm and 8 cm. What is the length of the hypotenuse?',
          options: ['10 cm', '12 cm', '14 cm', '48 cm'],
          correctIndex: 0,
          explanation: 'By Pythagoras theorem: Hypotenuse² = 6² + 8² = 36 + 64 = 100, so Hypotenuse = √100 = 10 cm.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Conditionals, Phrasal Verbs, Gerunds & Subject-Verb Agreement',
      marathiSubtitle: 'इयत्ता ७ वी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Subject-Verb Agreement',
          prompt: 'Choose the grammatically correct sentence:',
          options: [
            'Neither the captain nor the players was ready.',
            'Each of the participants have received a certificate.',
            'Either Riya or her sisters are bringing the charts.',
            'The bunch of keys were lying on the desk.'
          ],
          correctIndex: 2,
          explanation: 'With "Either...or", the verb agrees with the nearer subject ("her sisters" → plural → "are").'
        },
        {
          format: 'mcq',
          chapterTitle: 'Phrasal Verbs',
          prompt: 'What does the phrasal verb "call off" mean in: "The umpires decided to call off the match due to rain"?',
          options: ['Postpone to next month', 'Cancel', 'Celebrate', 'Restart immediately'],
          correctIndex: 1,
          explanation: '"Call off" means to cancel a scheduled event.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Conditional Sentences',
          prompt: 'Complete the conditional sentence: "If you heat ice to 10°C, it ___."',
          options: ['melted', 'melts', 'would melted', 'had melt'],
          correctIndex: 1,
          explanation: 'Zero conditional (scientific truth/fact) uses simple present in both clauses: "heat ... melts".'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Gerunds vs Verbs',
          prompt: 'How does the word "Swimming" function in: "Swimming is an excellent full-body exercise"?',
          options: ['Adjective', 'Gerund (verbal noun as subject)', 'Adverb', 'Preposition'],
          correctIndex: 1,
          explanation: '"Swimming" ends in -ing and acts as the noun subject of the sentence, so it is a gerund.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Passive Voice (Past)',
          prompt: 'Convert into passive voice: "Someone stole my bicycle yesterday."',
          options: [
            'My bicycle is stolen yesterday.',
            'My bicycle was stolen yesterday.',
            'My bicycle had been steal yesterday.',
            'Yesterday someone was stolen my bicycle.'
          ],
          correctIndex: 1,
          explanation: 'Simple past active ("stole") transforms to "was/were + past participle" ("was stolen").'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Acids & Bases, Heat Transfer, Mirrors & Plant Vascular Tissue',
      marathiSubtitle: 'इयत्ता ७ वी • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Heat Transfer Modes',
          prompt: 'By which mode of heat transfer does heat reach the Earth from the Sun through the vacuum of space?',
          options: ['Conduction', 'Convection', 'Radiation', 'Evaporation'],
          correctIndex: 2,
          explanation: 'Radiation requires no material medium and can travel through vacuum, unlike conduction and convection.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Acids, Bases & Neutralization',
          prompt: 'When an acid reacts with a base in equal strength, they neutralize each other to produce:',
          options: ['Only hydrogen gas', 'Salt and water', 'Oxygen and nitrogen', 'A stronger acid'],
          correctIndex: 1,
          explanation: 'Neutralization reaction: Acid + Base → Salt + Water (with release of heat).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Plant Transport Tissues',
          prompt: 'Which vascular tissue in plants transports water and dissolved minerals upward from the roots to leaves?',
          options: ['Phloem', 'Xylem', 'Stomata', 'Cortex'],
          correctIndex: 1,
          explanation: 'Xylem transports water/minerals upward, whereas Phloem transports prepared food.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Physical vs Chemical Change',
          prompt: 'Which of the following is an irreversible CHEMICAL change?',
          options: ['Melting wax', 'Dissolving sugar in water', 'Rusting of an iron gate', 'Folding a sheet of paper'],
          correctIndex: 2,
          explanation: 'Rusting forms a new substance (hydrated iron oxide), making it a chemical change.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Spherical Mirrors',
          prompt: 'Why is a CONVEX mirror preferred as a rear-view mirror on cars and scooters?',
          options: [
            'It shows an inverted image',
            'It gives an erect, diminished image with a wider field of view',
            'It magnifies tiny objects',
            'It blocks all headlights'
          ],
          correctIndex: 1,
          explanation: 'Convex mirrors always form erect images and cover a much wider traffic area behind the vehicle.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Fundamental Rights, RBI, Mountain Ranges & Green Revolution',
      marathiSubtitle: 'इयत्ता ७ वी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian Constitution',
          prompt: 'Under which Fundamental Right does the Constitution abolish untouchability and ensure equality before law (Articles 14–18)?',
          options: ['Right to Equality', 'Right to Property', 'Cultural Right', 'Right to Strike'],
          correctIndex: 0,
          explanation: 'Articles 14 to 18 of the Indian Constitution guarantee the Right to Equality.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Economy Basics',
          prompt: 'Which institution serves as India’s Central Bank and issues currency notes (except ₹1 notes)?',
          options: ['State Bank of India', 'Reserve Bank of India (RBI)', 'SEBI', 'NITI Aayog'],
          correctIndex: 1,
          explanation: 'The Reserve Bank of India (RBI) is India’s central bank established in 1935.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Agricultural History',
          prompt: 'Who is celebrated as the "Father of the Green Revolution in India" for boosting wheat and rice yields?',
          options: ['Dr. Verghese Kurien', 'Dr. M. S. Swaminathan', 'Dr. A. P. J. Abdul Kalam', 'Satyendra Nath Bose'],
          correctIndex: 1,
          explanation: 'Dr. M. S. Swaminathan pioneered high-yielding crop varieties during India’s Green Revolution.'
        },
        {
          format: 'mcq',
          chapterTitle: 'World Geography',
          prompt: 'Which is the longest continental mountain range in the world, stretching along South America?',
          options: ['The Rockies', 'The Alps', 'The Andes', 'The Urals'],
          correctIndex: 2,
          explanation: 'The Andes Mountains stretch over 7,000 km along the western coast of South America.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Maharashtra Cultural Heritage',
          prompt: 'The devotional compositions known as "Abhangas" in Maharashtra are closely associated with which Bhakti saint?',
          options: ['Sant Tukaram Maharaj', 'Kalidasa', 'Tansen', 'Kabir Das'],
          correctIndex: 0,
          explanation: 'Sant Tukaram Maharaj (and Sant Namdev/Dnyaneshwar) enriched Marathi literature with Abhangas.'
        }
      ]
    }
  ],

  'Class 8': [
    {
      subject: 'Mathematics',
      chapterName: 'Algebraic Identities, Compound Interest, Cube Roots & Mensuration',
      marathiSubtitle: 'इयत्ता ८ वी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Algebraic Identities',
          prompt: 'Evaluate 98² quickly using the algebraic identity (a − b)² = a² − 2ab + b²:',
          options: ['9,404', '9,604', '9,804', '9,964'],
          correctIndex: 1,
          explanation: '(100 − 2)² = 100² − 2(100)(2) + 2² = 10,000 − 400 + 4 = 9,604.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Compound Interest',
          prompt: 'Find the total amount after 2 years if ₹10,000 is invested at 10% per annum compounded annually:',
          options: ['₹12,000', '₹12,100', '₹12,200', '₹11,500'],
          correctIndex: 1,
          explanation: 'A = P(1 + R/100)^n = 10000 × (1.1)² = 10000 × 1.21 = ₹12,100.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Volume of Solids',
          prompt: 'A closed cuboidal tank measures 5 m × 4 m × 3 m. How many litres of water can it hold? (1 m³ = 1,000 L)',
          options: ['60 L', '6,000 L', '60,000 L', '600 L'],
          correctIndex: 2,
          explanation: 'Volume = 5 × 4 × 3 = 60 m³. Capacity = 60 × 1,000 = 60,000 litres.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Cubes & Cube Roots',
          prompt: 'What is the cube root of 729 (∛729)?',
          options: ['7', '8', '9', '11'],
          correctIndex: 2,
          explanation: '9 × 9 × 9 = 81 × 9 = 729, so ∛729 = 9.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Parallel Lines & Transversals',
          prompt: 'When two parallel lines are cut by a transversal, what is the sum of a pair of interior angles on the same side of the transversal?',
          options: ['90°', '120°', '180°', '360°'],
          correctIndex: 2,
          explanation: 'Co-interior angles between parallel lines are supplementary, so their sum is always 180°.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Sentence Structure, Relative Clauses, Poetic Devices & Direct-Indirect Questions',
      marathiSubtitle: 'इयत्ता ८ वी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Types of Sentences',
          prompt: 'Classify the sentence: "Although the trail was steep, the trekkers reached the summit before sunset."',
          options: ['Simple sentence', 'Compound sentence', 'Complex sentence', 'Imperative sentence'],
          correctIndex: 2,
          explanation: 'It contains one dependent subordinate clause ("Although the trail was steep") and one main independent clause, making it a Complex sentence.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Figures of Speech',
          prompt: 'Which poetic device is used in: "The ancient banyan tree whispered secrets to the evening breeze"?',
          options: ['Personification', 'Hyperbole', 'Oxymoron', 'Simile'],
          correctIndex: 0,
          explanation: 'Giving the human ability of "whispering secrets" to a tree is Personification.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Relative Pronouns',
          prompt: 'Fill in the blank cleanly: "The scientist ___ invented the vaccine was honoured globally."',
          options: ['whom', 'whose', 'who', 'which'],
          correctIndex: 2,
          explanation: '"Who" acts as the subject pronoun referring to a person ("The scientist").'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Indirect Interrogatives',
          prompt: 'Change into indirect speech: "The teacher asked Meera, ‘Have you finished your essay?’"',
          options: [
            'The teacher asked Meera if she had finished her essay.',
            'The teacher asked Meera that had she finished her essay.',
            'The teacher told Meera if she finished her essay.',
            'The teacher asked Meera whether she finishes her essay.'
          ],
          correctIndex: 0,
          explanation: 'Yes/No questions use "if/whether", convert question order to statement order, and shift present perfect ("have finished") to past perfect ("had finished").'
        },
        {
          format: 'mcq',
          chapterTitle: 'One-Word Substitution',
          prompt: 'What is the one-word term for "a person who looks at the bright side of things and expects good outcomes"?',
          options: ['Pessimist', 'Optimist', 'Altruist', 'Sceptic'],
          correctIndex: 1,
          explanation: 'An optimist always hopes for positive outcomes, while a pessimist expects the worst.'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Microbes, Metals-Nonmetals, Pressure & Endocrine Hormones',
      marathiSubtitle: 'इयत्ता ८ वी • विज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Nitrogen Fixation',
          prompt: 'Which bacterium lives in the root nodules of leguminous plants like peas and converts atmospheric nitrogen into usable nitrates?',
          options: ['Lactobacillus', 'Rhizobium', 'Amoeba', 'Yeast'],
          correctIndex: 1,
          explanation: 'Rhizobium bacteria live symbiotically in legume root nodules and fix atmospheric nitrogen.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Metals & Acid Reactions',
          prompt: 'When zinc granules react with dilute hydrochloric acid, which gas burns with a characteristic "pop" sound?',
          options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Chlorine'],
          correctIndex: 2,
          explanation: 'Active metals react with dilute acids to produce salt and Hydrogen gas (H₂), which burns with a pop.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Force & Pressure',
          prompt: 'A force of 200 N acts uniformly on a surface area of 4 m². Calculate the pressure exerted.',
          options: ['40 Pa', '50 Pa', '196 Pa', '800 Pa'],
          correctIndex: 1,
          explanation: 'Pressure P = Force / Area = 200 N / 4 m² = 50 N/m² (50 Pascals).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Endocrine System',
          prompt: 'Which hormone secreted by the pancreas regulates blood sugar (glucose) levels in the human body?',
          options: ['Thyroxine', 'Insulin', 'Adrenaline', 'Estrogen'],
          correctIndex: 1,
          explanation: 'Insulin lowers excess blood sugar; insufficient insulin causes diabetes.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Combustion & Fuels',
          prompt: 'Why is water NEVER used to extinguish an electrical short-circuit fire?',
          options: [
            'Water evaporates slowly',
            'Impure tap water conducts electricity and risks electrocution',
            'Water freezes electric wires',
            'Water increases oxygen gas directly'
          ],
          correctIndex: 1,
          explanation: 'Ordinary water conducts electricity, which can shock anyone nearby; CO₂ or dry powder extinguishers are used instead.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Indian Freedom Struggle, Election Commission & Biodiversity Hotspots',
      marathiSubtitle: 'इयत्ता ८ वी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian National Movement',
          prompt: 'On 12 March 1930, Mahatma Gandhi began the historic 24-day Dandi March from Sabarmati Ashram to break which British law?',
          options: ['Rowlatt Act', 'Salt Tax Law', 'Vernacular Press Act', 'Arms Act'],
          correctIndex: 1,
          explanation: 'The Salt Satyagraha (Dandi March) defied the British monopoly and tax on salt on 6 April 1930.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Constitutional Bodies',
          prompt: 'Under Article 324 of the Constitution, which independent body conducts Lok Sabha, Rajya Sabha, and State Assembly elections?',
          options: ['Supreme Court', 'NITI Aayog', 'Election Commission of India', 'Finance Commission'],
          correctIndex: 2,
          explanation: 'The Election Commission of India supervises free and fair parliamentary and assembly elections.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Ecology & India',
          prompt: 'Which mountain chain running along Maharashtra, Goa, and Kerala is one of the world’s top UNESCO biodiversity hotspots?',
          options: ['Aravalli Range', 'Western Ghats (Sahyadri)', 'Vindhya Range', 'Satpura Range'],
          correctIndex: 1,
          explanation: 'The Western Ghats (Sahyadris) host thousands of endemic plant, amphibian, and mammal species.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Modern Science Milestones',
          prompt: 'What is the name of India’s first dedicated space-based solar observatory mission positioned at Lagrange Point 1?',
          options: ['Gaganyaan', 'Aditya-L1', 'Astrosat', 'Cartosat-3'],
          correctIndex: 1,
          explanation: 'ISRO’s Aditya-L1 studies solar corona and solar winds from the Sun-Earth L1 halo orbit.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Economic Terms',
          prompt: 'What does the acronym "GDP" stand for when measuring the size of a country’s economy?',
          options: [
            'General Development Plan',
            'Gross Domestic Product',
            'Global Distribution Price',
            'Government Debt Portfolio'
          ],
          correctIndex: 1,
          explanation: 'Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country in a period.'
        }
      ]
    }
  ],

  'Class 9': [
    {
      subject: 'Mathematics',
      chapterName: 'Polynomials, Coordinate Geometry, Linear Equations & Triangle Congruence',
      marathiSubtitle: 'इयत्ता ९ वी • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Remainder Theorem (Polynomials)',
          prompt: 'Using the Remainder Theorem, find the remainder when P(x) = x³ − 3x² + 4x + 5 is divided by (x − 2).',
          options: ['5', '9', '13', '17'],
          correctIndex: 1,
          explanation: 'Put x = 2 in P(x): P(2) = 2³ − 3(2²) + 4(2) + 5 = 8 − 12 + 8 + 5 = 9.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Coordinate Geometry',
          prompt: 'In which quadrant of the Cartesian plane does the point P(−5, 7) lie?',
          options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
          correctIndex: 1,
          explanation: 'Points with negative x-coordinate and positive y-coordinate (−, +) lie in Quadrant II.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Rational & Irrational Surds',
          prompt: 'Simplify into purest mixed surd form: √48 + √12 = ?',
          options: ['√60', '6√3', '4√3', '8√3'],
          correctIndex: 1,
          explanation: '√48 = 4√3 and √12 = 2√3. Adding them gives 4√3 + 2√3 = 6√3.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Linear Systems',
          prompt: 'For what value of k will the linear equation 3x + ky = 22 pass through the point (4, 2)?',
          options: ['3', '4', '5', '6'],
          correctIndex: 2,
          explanation: 'Substitute x = 4, y = 2: 3(4) + 2k = 22 → 12 + 2k = 22 → 2k = 10 → k = 5.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Triangles & Angles',
          prompt: 'If the three angles of a triangle are in the ratio 2 : 3 : 4, what is the measure of the LARGEST angle?',
          options: ['40°', '60°', '80°', '90°'],
          correctIndex: 2,
          explanation: '2x + 3x + 4x = 180° → 9x = 180° → x = 20°. Largest angle = 4 × 20° = 80°.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'Transformation of Sentences, Question Tags, Modals & Poetic Analysis',
      marathiSubtitle: 'इयत्ता ९ वी • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Sentence Transformation',
          prompt: 'Rewrite using "No sooner ... than": "As soon as the referee blew the whistle, the match began."',
          options: [
            'No sooner did the referee blow the whistle than the match began.',
            'No sooner the referee blew the whistle then the match began.',
            'No sooner had the referee blow the whistle when the match began.',
            'No sooner does the referee blew the whistle than the match began.'
          ],
          correctIndex: 0,
          explanation: '"No sooner" triggers subject-auxiliary inversion ("did ... blow") followed by "than".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Question Tags',
          prompt: 'Add the accurate question tag: "Nobody called while I was away, ___?"',
          options: ['didn’t they', 'did they', 'did he', 'wasn’t it'],
          correctIndex: 1,
          explanation: '"Nobody" is negative in meaning (taking positive tag) and uses plural pronoun "they" → "did they?".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Conditionals (Unless → If)',
          prompt: 'Choose the exact equivalent using "If": "Unless you revise regularly, you will forget formulas."',
          options: [
            'If you revise regularly, you will forget formulas.',
            'If you do not revise regularly, you will forget formulas.',
            'If you did not revise regularly, you forget formulas.',
            'If you will not revise regularly, you forget formulas.'
          ],
          correctIndex: 1,
          explanation: '"Unless" means "If ... not", keeping the first-conditional present tense ("do not revise").'
        },
        {
          format: 'mcq',
          chapterTitle: 'Poetic Figures of Speech',
          prompt: 'Identify the figure of speech in the contradictory phrase: "an open secret" or "deafening silence".',
          options: ['Metonymy', 'Oxymoron', 'Euphemism', 'Apostrophe'],
          correctIndex: 1,
          explanation: 'Placing two opposite words side by side in one phrase is an Oxymoron.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Synthesis & Participles',
          prompt: 'Select the error-free sentence:',
          options: [
            'Scarcely had he reached the station when the train departed.',
            'Scarcely he reached the station than the train departed.',
            'Scarcely had he reached the station than the train departed.',
            'Scarcely did he reached the station when the train departed.'
          ],
          correctIndex: 0,
          explanation: '"Scarcely / Hardly" pairs strictly with "when" (never "than") and uses inversion "had he reached".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'Laws of Motion, Mole Concept, Plant Tissues & Spherical Mirrors',
      marathiSubtitle: 'इयत्ता ९ वी • विज्ञान व तंत्रज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'science_activity',
          chapterTitle: 'Newton’s Second Law',
          prompt: 'A constant net force acts on a 4 kg trolley, accelerating it at 3.5 m/s². What is the magnitude of the applied force?',
          options: ['7.5 N', '12 N', '14 N', '28 N'],
          correctIndex: 2,
          explanation: 'By Newton’s Second Law: F = m × a = 4 kg × 3.5 m/s² = 14 Newtons.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Mole Concept & Molecular Mass',
          prompt: 'Given atomic masses C = 12 u and O = 16 u, how many moles are present in 88 grams of Carbon Dioxide (CO₂)?',
          options: ['1 mole', '2 moles', '3 moles', '4 moles'],
          correctIndex: 1,
          explanation: 'Molar mass of CO₂ = 12 + 2(16) = 44 g/mol. Number of moles = 88 / 44 = 2 moles.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Plant Tissues',
          prompt: 'Which dead permanent plant tissue with thick lignified cell walls provides mechanical hardness to coconut husks and walnut shells?',
          options: ['Parenchyma', 'Collenchyma', 'Sclerenchyma', 'Aerenchyma'],
          correctIndex: 2,
          explanation: 'Sclerenchyma cells are dead at maturity with heavy lignin thickening, giving structural stiffness.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Atomic Structure',
          prompt: 'Atoms of the same element having identical atomic number (protons) but different mass numbers (neutrons), like ¹²C and ¹⁴C, are called:',
          options: ['Isobars', 'Isotopes', 'Isomers', 'Allotropes'],
          correctIndex: 1,
          explanation: 'Isotopes share the same atomic number (Z) and chemical properties but differ in mass number (A).'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Mirror Formula',
          prompt: 'For a concave mirror with focal length f = −15 cm, what is its radius of curvature (R)?',
          options: ['−7.5 cm', '−30 cm', '+15 cm', '−45 cm'],
          correctIndex: 1,
          explanation: 'Since R = 2f, R = 2 × (−15 cm) = −30 cm.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'UN Security Council, Judiciary Art. 32, Climate Accords & Amendments',
      marathiSubtitle: 'इयत्ता ९ वी • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Constitutional Remedies',
          prompt: 'Dr. B. R. Ambedkar called which Article of the Indian Constitution its "Heart and Soul" because citizens can directly approach the Supreme Court for Fundamental Rights?',
          options: ['Article 19', 'Article 21', 'Article 32', 'Article 44'],
          correctIndex: 2,
          explanation: 'Article 32 guarantees the Right to Constitutional Remedies via writs (Habeas Corpus, Mandamus, etc.).'
        },
        {
          format: 'mcq',
          chapterTitle: 'United Nations Structure',
          prompt: 'Which set lists ALL FIVE permanent veto-holding members (P5) of the UN Security Council?',
          options: [
            'USA, UK, France, Russia, China',
            'USA, Germany, Japan, India, France',
            'USA, UK, Germany, Russia, Brazil',
            'UK, France, Italy, China, Canada'
          ],
          correctIndex: 0,
          explanation: 'The 5 permanent members of the UNSC are China, France, Russia, the United Kingdom, and the United States.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Local Self-Government',
          prompt: 'Which Constitutional Amendment Act of 1992 granted constitutional status to rural Panchayati Raj institutions across India?',
          options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
          correctIndex: 2,
          explanation: 'The 73rd Constitutional Amendment Act (1992) established the three-tier Panchayati Raj system under Part IX.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Global Climate Accords',
          prompt: 'The 2015 Paris Climate Agreement primarily aims to limit long-term global warming well below:',
          options: ['5°C above pre-industrial levels', '2°C (preferably 1.5°C) above pre-industrial levels', '0°C freeze point', '10°C above 1990 levels'],
          correctIndex: 1,
          explanation: 'The Paris Agreement commits nations to keep warming well below 2°C and pursue efforts for 1.5°C.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Monsoon Meteorology',
          prompt: 'Periodic abnormal warming of surface waters in the eastern/central Equatorial Pacific Ocean that often weakens Indian monsoons is called:',
          options: ['Coriolis effect', 'El Niño', 'Jet stream inversion', 'La Niña cooling'],
          correctIndex: 1,
          explanation: 'El Niño weakens trade winds and alters Walker circulation, frequently suppressing rainfall over India.'
        }
      ]
    }
  ],

  'Class 10': [
    {
      subject: 'Mathematics',
      displaySubject: 'Mathematics – Algebra',
      chapterName: 'SSC Quadratic Equations, Arithmetic Progression, Trigonometry & Probability',
      marathiSubtitle: 'इयत्ता १० वी (SSC) • गणित सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Arithmetic Progression (SSC Algebra)',
          prompt: 'For the Arithmetic Progression 7, 11, 15, 19, ..., find the 15th term (t₁₅).',
          options: ['59', '63', '67', '71'],
          correctIndex: 1,
          explanation: 'Here a = 7, d = 11 − 7 = 4. tₙ = a + (n − 1)d → t₁₅ = 7 + (14 × 4) = 7 + 56 = 63.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Quadratic Equations (Discriminant)',
          prompt: 'For the quadratic equation 2x² − 4x + k = 0 to have real and EQUAL roots, what must be the value of k?',
          options: ['1', '2', '4', '8'],
          correctIndex: 1,
          explanation: 'For equal roots, Δ = b² − 4ac = 0 → (−4)² − 4(2)(k) = 0 → 16 − 8k = 0 → k = 2.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Trigonometry (SSC Geometry)',
          prompt: 'Evaluate: 2 tan²45° + cos²30° − sin²60° = ?',
          options: ['0', '1', '2', '3/2'],
          correctIndex: 2,
          explanation: 'tan 45° = 1, and cos 30° = sin 60° = √3/2. Thus cos²30° − sin²60° = 0, leaving 2(1)² = 2.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Probability (Two Coins / Dice)',
          prompt: 'Two fair six-sided dice are rolled simultaneously. What is the probability that the sum of numbers on the upper faces is 10?',
          options: ['1/12', '1/9', '1/6', '5/36'],
          correctIndex: 0,
          explanation: 'Total outcomes n(S) = 36. Sum 10 outcomes = {(4,6), (5,5), (6,4)} → n(A) = 3. P(A) = 3/36 = 1/12.'
        },
        {
          format: 'math_exercise',
          chapterTitle: 'Coordinate Geometry (Distance Formula)',
          prompt: 'Find the distance between points A(−3, 4) and the origin O(0, 0):',
          options: ['1 unit', '5 units', '7 units', '25 units'],
          correctIndex: 1,
          explanation: 'd(O, A) = √((−3 − 0)² + (4 − 0)²) = √(9 + 16) = √25 = 5 units.'
        }
      ]
    },
    {
      subject: 'English',
      chapterName: 'SSC Grammar: Degrees, Inversion, Verbals & Complex Clauses',
      marathiSubtitle: 'इयत्ता १० वी (SSC) • इंग्रजी सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'grammar_practice',
          chapterTitle: 'Degrees of Comparison (SSC Board)',
          prompt: 'Convert to Positive Degree without changing meaning: "Mount Everest is the highest peak in the world."',
          options: [
            'Very few peaks in the world are as high as Mount Everest.',
            'No other peak in the world is as high as Mount Everest.',
            'Mount Everest is higher than most other peaks.',
            'No other peak in the world is higher as Mount Everest.'
          ],
          correctIndex: 1,
          explanation: '"The + superlative" (without "one of the") transforms cleanly to "No other ... is as + positive + as ...".'
        },
        {
          format: 'mcq',
          chapterTitle: 'Negative Inversion',
          prompt: 'Choose the correct inversion form starting with "Hardly": "As soon as the results were declared, the auditorium erupted in cheers."',
          options: [
            'Hardly had the results been declared when the auditorium erupted in cheers.',
            'Hardly the results were declared than the auditorium erupted in cheers.',
            'Hardly had the results been declared than the auditorium erupted in cheers.',
            'Hardly did the results declared when the auditorium erupted in cheers.'
          ],
          correctIndex: 0,
          explanation: '"Hardly + had + subject + past participle ... when" is the standard SSC inversion structure.'
        },
        {
          format: 'grammar_practice',
          chapterTitle: 'Subordinate Clauses Analysis',
          prompt: 'Identify the kind of subordinate clause underlined in: "What the committee proposed | deserves serious reflection."',
          options: ['Adverb clause of time', 'Adjective (relative) clause', 'Noun clause acting as Subject', 'Coordinate clause'],
          correctIndex: 2,
          explanation: '"What the committee proposed" functions as the subject noun of the main verb "deserves".'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Infinitives & Participles',
          prompt: 'Pick the sentence containing a BARE INFINITIVE (infinitive without "to"):',
          options: [
            'She promised to submit the report early.',
            'They made him apologize for the delay.',
            'Walking briskly helps cardiovascular health.',
            'The broken vase was carefully repaired.'
          ],
          correctIndex: 1,
          explanation: 'After causative verbs like "make / let", the verb "apologize" is used without "to" (bare infinitive).'
        },
        {
          format: 'mcq',
          chapterTitle: 'Rhetorical Questions',
          prompt: 'Convert the assertive statement to an accurate rhetorical question: "Everyone admires genuine humility."',
          options: [
            'Does everyone admire genuine humility?',
            'Who does not admire genuine humility?',
            'Why does nobody admire genuine humility?',
            'Whom does genuine humility admire?'
          ],
          correctIndex: 1,
          explanation: 'An affirmative "Everyone..." converts into a negative rhetorical question "Who does not...?" implying "everyone does".'
        }
      ]
    },
    {
      subject: 'Science',
      chapterName: 'SSC Refraction, Ohm’s Law, Carbon IUPAC, Periodic Trends & Genetics',
      marathiSubtitle: 'इयत्ता १० वी (SSC) • विज्ञान व तंत्रज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'math_exercise',
          chapterTitle: 'Electricity & Heating (SSC Science 1)',
          prompt: 'An electric iron of resistance 20 Ω draws a steady current of 5 A for 30 seconds. How much heat energy (H = I²Rt) is generated?',
          options: ['3,000 J', '10,000 J', '15,000 J', '30,000 J'],
          correctIndex: 2,
          explanation: 'By Joule’s Law of Heating: H = I²Rt = 5² × 20 × 30 = 25 × 600 = 15,000 Joules.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Refraction of Light',
          prompt: 'If the speed of light in vacuum is 3 × 10⁸ m/s and the absolute refractive index of diamond is 2.4, what happens as light enters diamond from air?',
          options: [
            'It speeds up and bends away from the normal',
            'It slows down to 1.25 × 10⁸ m/s and bends towards the normal',
            'Its frequency doubles inside diamond',
            'It stops propagating completely'
          ],
          correctIndex: 1,
          explanation: 'v = c / n = (3 × 10⁸) / 2.4 = 1.25 × 10⁸ m/s; entering an optically denser medium bends light towards the normal.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Carbon Compounds (IUPAC)',
          prompt: 'Which IUPAC suffix corresponds to the carboxylic acid functional group (−COOH) as in CH₃−COOH (Ethanoic acid)?',
          options: ['-ol', '-al', '-one', '-oic acid'],
          correctIndex: 3,
          explanation: 'Carboxylic acids take the IUPAC suffix "-oic acid" (e.g., CH₃COOH → Ethanoic acid).'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'Modern Periodic Table',
          prompt: 'Moving from LEFT to RIGHT across Period 2 (Li → F) in the Modern Periodic Table, atomic radius:',
          options: [
            'Increases steadily due to added shells',
            'Decreases due to increasing effective nuclear charge on the same valence shell',
            'Remains strictly constant',
            'Doubles at every step'
          ],
          correctIndex: 1,
          explanation: 'Across a period, electrons enter the same shell while nuclear proton pull increases, shrinking the atomic radius.'
        },
        {
          format: 'science_activity',
          chapterTitle: 'Heredity & Genetics (SSC Science 2)',
          prompt: 'In Gregor Mendel’s monohybrid cross between pure tall (TT) and pure dwarf (tt) pea plants, what is the phenotypic ratio observed in the F₂ generation?',
          options: ['1 : 1', '2 : 1', '3 : 1 (3 Tall : 1 Dwarf)', '9 : 3 : 3 : 1'],
          correctIndex: 2,
          explanation: 'Mendel’s F₂ monohybrid phenotypic ratio is 3 Dominant (Tall) : 1 Recessive (Dwarf), while genotypic ratio is 1:2:1.'
        }
      ]
    },
    {
      subject: 'General Knowledge',
      chapterName: 'Indian Federalism, GST Council, Bretton Woods & Space/Net-Zero Missions',
      marathiSubtitle: 'इयत्ता १० वी (SSC) • सामान्य ज्ञान सराव कार्यपत्रिका (Demo)',
      questions: [
        {
          format: 'mcq',
          chapterTitle: 'Indian Federalism & Taxation',
          prompt: 'Under which Constitutional Article was the Goods and Services Tax (GST) Council established in India via the 101st Amendment?',
          options: ['Article 263', 'Article 279A', 'Article 280', 'Article 356'],
          correctIndex: 1,
          explanation: 'Article 279A of the Constitution provides for the GST Council chaired by the Union Finance Minister.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Global Financial Institutions',
          prompt: 'Which pair of institutions, created at the 1944 Bretton Woods Conference, are commonly called the "Bretton Woods Twins"?',
          options: [
            'WHO and UNESCO',
            'IMF and World Bank (IBRD)',
            'WTO and UNICEF',
            'ASEAN and BRICS'
          ],
          correctIndex: 1,
          explanation: 'The International Monetary Fund (IMF) and the International Bank for Reconstruction and Development (World Bank) were founded at Bretton Woods.'
        },
        {
          format: 'fill_blank',
          chapterTitle: 'India’s Climate Strategy',
          prompt: 'At the COP26 Glasgow Summit (Panchamrit pledge), India targeted achieving Net-Zero carbon emissions by which year?',
          options: ['2035', '2050', '2060', '2070'],
          correctIndex: 3,
          explanation: 'Under its Panchamrit climate commitments, India pledged to reach Net-Zero emissions by 2070.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Global Solar Initiative',
          prompt: 'Which international treaty-based solar alliance, co-launched by India and France in 2015, has its headquarters in Gurugram, Haryana?',
          options: ['International Renewable Grid', 'International Solar Alliance (ISA)', 'Clean Earth Coalition', 'Global Solar Council'],
          correctIndex: 1,
          explanation: 'The International Solar Alliance (ISA) is headquartered in Gurugram, India.'
        },
        {
          format: 'mcq',
          chapterTitle: 'Indian Historiography & Heritage',
          prompt: 'Who authored the landmark 12th-century Sanskrit chronicle "Rajatarangini", detailing the kings of Kashmir with critical historical chronology?',
          options: ['Banabhatta', 'Kalhana', 'Megasthenes', 'Al-Biruni'],
          correctIndex: 1,
          explanation: 'Kalhana’s "Rajatarangini" (River of Kings) is regarded in Maharashtra SSC History as a foundational model of scientific historiography.'
        }
      ]
    }
  ]
};

/**
 * Builds the 4 unique, class-specific, syllabus-calibrated Demo Worksheets
 * (Mathematics, English, Science, General Knowledge) for the selected (Class, Board).
 */
export function getClassDemoWorksheets(
  classLevel: ClassLevel = 'Class 1',
  board: EducationBoard = 'Maharashtra'
): OnlineWorksheet[] {
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const bank =
    board === 'CBSE'
      ? CBSE_DEMO_WORKSHEETS_BANK
      : board === 'ICSE'
        ? ICSE_DEMO_WORKSHEETS_BANK
        : CLASS_DEMO_WORKSHEETS_BANK;
  const specs = bank[classLevel] || bank['Class 1'];
  const boardCode = board === 'CBSE' ? 'CBSE-' : board === 'ICSE' ? 'ICSE-' : '';
  const titlePrefix = board === 'Maharashtra' ? '' : `${board} `;

  return specs.map((spec) => {
    const effectiveSubject: SubjectName = spec.displaySubject || spec.subject;
    const subjKey = effectiveSubject.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const wsId = `WS-${boardCode}C${cNum}-${subjKey}-1`;

    const questions: WorksheetQuestionItem[] = spec.questions.map((q, idx) => ({
      id: `${wsId}-Q${idx + 1}`,
      number: idx + 1,
      format: q.format,
      chapterTitle: q.chapterTitle,
      prompt: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex,
      modelWrittenAnswer: `${q.options[q.correctIndex]} — ${q.explanation}`,
      explanation: q.explanation,
      marks: 2
    }));

    return {
      id: wsId,
      board,
      classLevel,
      subject: effectiveSubject,
      worksheetNumber: 1,
      title: `${titlePrefix}${classLevel} • ${spec.subject} – Worksheet #1`,
      marathiSubtitle: spec.marathiSubtitle,
      chapterName: spec.chapterName,
      durationMinutes: 15,
      totalMarks: questions.length * 2,
      isDemo: true,
      formatsIncluded: Array.from(new Set(spec.questions.map(q => q.format))),
      questions
    };
  });
}

/**
 * Returns the custom class-specific Q1..Q5 items for (classLevel, subject, board) Worksheet #1
 * so WorksheetsView and DemoSectionView share genuinely progressive questions per class & board.
 */
export function getClassSpecificWorksheetQuestions(
  classLevel: ClassLevel,
  subject: SubjectName,
  board: EducationBoard = 'Maharashtra'
): WorksheetQuestionItem[] | null {
  const worksheets = getClassDemoWorksheets(classLevel, board);
  const match = worksheets.find(
    ws =>
      ws.subject === subject ||
      (board === 'Maharashtra' &&
        classLevel === 'Class 10' &&
        subject === 'Mathematics' &&
        ws.subject === 'Mathematics – Algebra')
  );
  return match ? match.questions : null;
}
