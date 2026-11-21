// ============================================================================
// CURATED SCHOLARSHIP EXAMINATION QUESTION BANKS (ENGLISH MEDIUM)
// Authority: Maharashtra State Council of Examinations (MSCE Pune)
// Classes:
// - Class 4 (Pre-Upper Primary / PUP Scholarship Examination): 75 Qs × 2 Marks = 150 Marks
// - Class 7 (Upper Primary / UPS Scholarship Examination): 75 Qs × 2 Marks = 150 Marks
//
// Each exam covers all three official Scholarship domains in balanced proportion:
// 1. Section 1: English Language & Comprehension (25 Qs per test, drawn from 30+ pool)
// 2. Section 2: Mathematics & Quantitative Reasoning (25 Qs per test, drawn from 30+ pool)
// 3. Section 3: Intelligence & Logical Reasoning (25 Qs per test, drawn from 30+ pool)
// ============================================================================

export interface CuratedScholarshipMcq {
  id: string;
  grade: 'CLASS_4' | 'CLASS_7';
  domain: 'LANGUAGE' | 'MATHEMATICS' | 'INTELLIGENCE';
  topic: string;
  questionType:
    | 'Conceptual'
    | 'Application-Based'
    | 'Passage-Based'
    | 'Numerical'
    | 'Logical-Reasoning'
    | 'Statement-Based'
    | 'Match-the-Following'
    | 'Assertion-Reasoning'
    | 'Diagram-Based';
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0..3
  explanation: string;
}

// ============================================================================
// CLASS 4 SCHOLARSHIP — SECTION 1: ENGLISH LANGUAGE (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C4_LANGUAGE_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch4_lang_01',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Passage-Based Question (Nature & Bees)',
    questionType: 'Passage-Based',
    difficulty: 'Easy',
    question:
      'Read the passage carefully and answer the question:\n"Honeybees live together in a well-organized colony inside a beehive. Worker bees fly from flower to flower collecting sweet liquid called nectar. At the same time, yellow pollen grains stick to their fuzzy legs and get transferred to other blossoms, helping plants produce fruits and seeds."\n\nHow do honeybees help plants while collecting nectar?',
    options: [
      'They transfer pollen grains from one flower to another, helping plants form fruits and seeds',
      'They dig the soil around tree roots during the monsoon',
      'They eat dry autumn leaves to keep the garden clean',
      'They paint flower petals bright yellow using honey'
    ],
    correctAnswer: 0,
    explanation: 'The passage states that pollen grains stick to the bees’ legs and get transferred to other blossoms, helping plants produce fruits and seeds (pollination).'
  },
  {
    id: 'sch4_lang_02',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Vocabulary in Context',
    questionType: 'Passage-Based',
    difficulty: 'Easy',
    question:
      'Read the passage carefully and answer the question:\n"At dawn, the lighthouse keeper climbed the spiral staircase to clean the giant glass lantern. For fifty years, its bright beam had guided fishing boats safely away from jagged coastal rocks during stormy nights."\n\nWhich word in the passage means "sharp, rough, and pointed"?',
    options: ['jagged', 'spiral', 'giant', 'guided'],
    correctAnswer: 0,
    explanation: '"Jagged" describes rocks with sharp, rough, uneven edges that are dangerous to boats.'
  },
  {
    id: 'sch4_lang_03',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Moral & Inference',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'Read the short passage and answer:\n"Meera noticed a leaking tap near the school playground. Instead of walking past it, she closed the valve tightly and placed a small bucket underneath to catch the remaining drops, which she later poured into a tulsi pot. Seeing her action, three classmates checked all the taps on the ground floor."\n\nWhat main quality of Meera inspired her classmates?',
    options: [
      'Responsible action and care for conserving water through personal example',
      'Complaining loudly without taking any action',
      'Wasting water while playing in the garden',
      'Waiting for someone else to close the tap next week'
    ],
    correctAnswer: 0,
    explanation: 'Meera took immediate personal responsibility to stop water wastage and reuse every drop, setting a positive example for her peers.'
  },
  {
    id: 'sch4_lang_04',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Poetry Extract',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'Read the four lines of verse and answer:\n"Little drops of water, little grains of sand,\nMake the mighty ocean and the pleasant land;\nLittle deeds of kindness, little words of love,\nHelp to make Earth happy like the heavens above."\n\nWhat central idea does the poet convey through these lines?',
    options: [
      'Small everyday acts of kindness and small efforts combine to create great and wonderful results',
      'Only huge oceans and vast deserts are important in nature',
      'Kind words are useless unless spoken by kings',
      'Sand and water should never be mixed together'
    ],
    correctAnswer: 0,
    explanation: 'Just as tiny drops form an ocean and grains form land, small acts of kindness and love make the world happy.'
  },
  {
    id: 'sch4_lang_05',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Synonyms – Word Meaning',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the word that is closest in meaning (Synonym) to the capitalised word:\nThe mountaineers were COURAGEOUS as they climbed the icy peak.',
    options: ['Brave', 'Timid', 'Careless', 'exhausted'],
    correctAnswer: 0,
    explanation: '"Courageous" means brave or fearless in facing danger or difficulty.'
  },
  {
    id: 'sch4_lang_06',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Synonyms – Academic Vocabulary',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Select the correct Synonym for the word "ABUNDANT":',
    options: ['Plentiful', 'Scarce', 'Tiny', 'Hidden'],
    correctAnswer: 0,
    explanation: '"Abundant" means existing in large quantities or plentiful (its antonym is scarce).'
  },
  {
    id: 'sch4_lang_07',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Antonyms – Opposite Meaning',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the word that is opposite in meaning (Antonym) to the underlined word:\nThe ancient fort had a NARROW entrance carved through solid rock.',
    options: ['Wide', 'Short', 'Deep', 'Heavy'],
    correctAnswer: 0,
    explanation: 'The opposite (antonym) of "narrow" is "wide" (or broad).'
  },
  {
    id: 'sch4_lang_08',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Antonyms – Context Sentence',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Select the correct Antonym of the word "GENEROUS":',
    options: ['Stingy (Selfish)', 'Kind', 'Charitable', 'Polite'],
    correctAnswer: 0,
    explanation: '"Generous" means willing to give and share freely; its antonym is "stingy" or "miserly/selfish".'
  },
  {
    id: 'sch4_lang_09',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Articles (a, an, the)',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Fill in the blanks with the correct articles:\n"My elder sister is _____ honest officer who works at _____ university in Pune."',
    options: [
      'an, a',
      'a, an',
      'an, an',
      'a, a'
    ],
    correctAnswer: 0,
    explanation: '"Honest" begins with a silent "h" and a vowel sound (/ɒ/), so it takes "an". "University" begins with a consonant sound (/juː/), so it takes "a".'
  },
  {
    id: 'sch4_lang_10',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Collective Nouns',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the correct collective noun to complete the sentence:\n"A ________ of ships was anchored safely inside the Mumbai harbour."',
    options: ['fleet', 'swarm', 'bouquet', 'herd'],
    correctAnswer: 0,
    explanation: 'A group of ships or vessels is called a "fleet" (a swarm is of bees, a bouquet is of flowers, a herd is of cattle/elephants).'
  },
  {
    id: 'sch4_lang_11',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Singular and Plural Nouns',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which of the following pairs of Singular and Plural nouns is INCORRECTLY matched?',
    options: [
      'Mouse — Mouses',
      'Child — Children',
      'Leaf — Leaves',
      'Tooth — Teeth'
    ],
    correctAnswer: 0,
    explanation: 'The irregular plural of "Mouse" is "Mice", not "Mouses".'
  },
  {
    id: 'sch4_lang_12',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Prepositions of Time and Place',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Fill in the blanks with the appropriate prepositions:\n"The cat jumped _____ the table and hid _____ the curtain when the dog barked."',
    options: [
      'onto, behind',
      'in, between',
      'since, among',
      'during, above'
    ],
    correctAnswer: 0,
    explanation: '"Jumped onto" expresses movement to the top surface of the table, and "hid behind" indicates position at the back of the curtain.'
  },
  {
    id: 'sch4_lang_13',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Tenses & Verb Agreement',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct verb form to complete the sentence:\n"Every morning, the sun ________ in the east and birds ________ cheerfully in the trees."',
    options: [
      'rises, chirp',
      'rise, chirps',
      'is rising, chirped',
      'rose, will chirp'
    ],
    correctAnswer: 0,
    explanation: 'Habitual actions and universal truths take the Simple Present Tense: singular subject "the sun" takes "rises", while plural subject "birds" takes "chirp".'
  },
  {
    id: 'sch4_lang_14',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Degrees of Comparison of Adjectives',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Fill in the blank with the correct degree of comparison:\n"Mount Everest is the ________ mountain peak in the world."',
    options: ['highest', 'higher', 'more high', 'most highest'],
    correctAnswer: 0,
    explanation: 'When comparing one item with all others in a group (preceded by "the"), the superlative degree "highest" is used.'
  },
  {
    id: 'sch4_lang_15',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Pronouns (Reflexive & Possessive)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct pronoun to fill in the blank:\n"Nobody helped little Rohan; he packed his school bag all by ________."',
    options: ['himself', 'themselves', 'herself', 'ourselves'],
    correctAnswer: 0,
    explanation: 'Since the subject "he" (Rohan) is third-person singular masculine, the reflexive pronoun is "himself".'
  },
  {
    id: 'sch4_lang_16',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Conjunctions',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Choose the most suitable conjunction to join the two clauses:\n"Riya practised the piano daily, ________ she won the first prize in the school music concert."',
    options: ['so', 'although', 'unless', 'or'],
    correctAnswer: 0,
    explanation: 'The second clause states the result of her daily practice, so the coordinating conjunction of result "so" (or "therefore") is correct.'
  },
  {
    id: 'sch4_lang_17',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Sentence Formation – Rearranging Jumbled Words',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Rearrange the following jumbled words to form a meaningful and grammatically correct sentence:\n(P) books / (Q) our / (R) best / (S) are / (T) friends',
    options: [
      'P - S - Q - R - T ("Books are our best friends.")',
      'Q - R - P - S - T ("Our best books are friends.")',
      'T - S - P - Q - R ("Friends are books our best.")',
      'S - P - Q - T - R ("Are books our friends best.")'
    ],
    correctAnswer: 0,
    explanation: 'The natural Subject–Verb–Complement order is: "Books (P) are (S) our (Q) best (R) friends (T)."'
  },
  {
    id: 'sch4_lang_18',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Sentence Formation – Question Tag & Interrogative Structure',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Which of the following is the correct interrogative (question) form of the statement:\n"They visited the science planetarium yesterday."',
    options: [
      'Did they visit the science planetarium yesterday?',
      'Did they visited the science planetarium yesterday?',
      'Do they visited the science planetarium yesterday?',
      'Were they visit the science planetarium yesterday?'
    ],
    correctAnswer: 0,
    explanation: 'In Simple Past questions formed with the auxiliary "Did", the main verb returns to its base form ("visit", never "did visited").'
  },
  {
    id: 'sch4_lang_19',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Error Identification – Grammatical Spot the Error',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Identify the part of the sentence that contains a grammatical error:\n(A) Each of the students / (B) in our class / (C) have brought / (D) a sapling for Tree Plantation Day.',
    options: [
      'Part (C) — should be "has brought" because "Each" takes a singular verb',
      'Part (A) — should be "Each of the student"',
      'Part (B) — should be "on our class"',
      'Part (D) — no article needed before sapling'
    ],
    correctAnswer: 0,
    explanation: 'The distributive pronoun "Each" is singular and requires the singular auxiliary verb "has brought" rather than "have brought".'
  },
  {
    id: 'sch4_lang_20',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Error Identification – Punctuation & Capitalisation',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the sentence that is punctuated and capitalised completely correctly:',
    options: [
      '"Where is my geometry box?" asked Aarav on Monday morning.',
      '"where is my geometry box" asked aarav on monday morning.',
      '"Where is my geometry box," Asked Aarav on monday morning?',
      'Where is my geometry box? asked Aarav on Monday morning'
    ],
    correctAnswer: 0,
    explanation: 'Direct speech questions require quotation marks, a capital first letter, a question mark inside the closing quote, and capital letters for proper nouns (Aarav, Monday).'
  },
  {
    id: 'sch4_lang_21',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Fill in the Blanks – Homophones & Correct Word Usage',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Choose the correct pair of homophones to fill in the blanks:\n"The wind blew ________ the open window and scattered the ________ pages of my drawing book."',
    options: [
      'through, blue',
      'threw, blew',
      'through, blew',
      'threw, blue'
    ],
    correctAnswer: 0,
    explanation: '"Through" is a preposition meaning from one side to the other (threw is the past tense of throw); "blue" is the colour (blew is the past tense of blow).'
  },
  {
    id: 'sch4_lang_22',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – One-Word Substitution (Professions & Places)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the correct one-word substitution for:\n"A person who studies stars, planets, and outer space using telescopes"',
    options: ['Astronomer', 'Astrologer', 'Architect', 'Botanist'],
    correctAnswer: 0,
    explanation: 'An astronomer scientifically studies celestial bodies (stars, planets, galaxies); a botanist studies plants; an architect designs buildings.'
  },
  {
    id: 'sch4_lang_23',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Animals, Young Ones & Homes',
    questionType: 'Match-the-Following',
    difficulty: 'Easy',
    question: 'Match each animal with its young one and its shelter:\n1. Horse — (P) Cub / Den\n2. Lion — (Q) Foal (Colt) / Stable\n3. Sheep — (R) Lamb / Pen (Fold)\nSelect the correct code:',
    options: [
      '1-Q, 2-P, 3-R',
      '1-P, 2-Q, 3-R',
      '1-Q, 2-R, 3-P',
      '1-R, 2-P, 3-Q'
    ],
    correctAnswer: 0,
    explanation: 'A young horse is a foal kept in a stable; a young lion is a cub living in a den; a young sheep is a lamb kept in a pen/fold.'
  },
  {
    id: 'sch4_lang_24',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Correct Spelling Identification',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Choose the word that is spelled CORRECTLY from the four options below:',
    options: ['Environment', 'Enviroment', 'Enviornment', 'Enveronment'],
    correctAnswer: 0,
    explanation: 'The correct spelling is E-n-v-i-r-o-n-m-e-n-t (containing the silent "n" before "m").'
  },
  {
    id: 'sch4_lang_25',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Correct Word Usage – Proverbs & Idiomatic Expressions',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Complete the well-known English proverb:\n"A stitch in time saves ________."',
    options: ['nine', 'ten', 'Cloth', 'thread'],
    correctAnswer: 0,
    explanation: '"A stitch in time saves nine" means fixing a small problem promptly prevents it from becoming a much larger problem later.'
  },
  {
    id: 'sch4_lang_26',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Gender of Nouns (Masculine / Feminine)',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which pair of Masculine and Feminine gender nouns is CORRECTLY matched?',
    options: [
      'Nephew — Niece',
      'Gander — Duck',
      'Fox — Filly',
      'Wizard — Empress'
    ],
    correctAnswer: 0,
    explanation: 'Nephew – Niece is correct (Gander – Goose; Drake – Duck; Fox – Vixen; Colt – Filly; Wizard – Witch; Emperor – Empress).'
  },
  {
    id: 'sch4_lang_27',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Prefixes and Suffixes',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Which prefix should be added to the word "POSSIBLE" to form its antonym (opposite)?',
    options: ['im-', 'un-', 'dis-', 'in-'],
    correctAnswer: 0,
    explanation: 'Before root words beginning with "p" or "m", the negative prefix "im-" is used: Possible → Impossible.'
  },
  {
    id: 'sch4_lang_28',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Fill in the Blanks – Modal Auxiliaries',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Fill in the blank with the most appropriate modal verb showing polite permission:\n"________ I borrow your dictionary for five minutes, please?"',
    options: ['May', 'Must', 'Should', 'Need'],
    correctAnswer: 0,
    explanation: '"May I..." is the standard polite modal auxiliary used to ask for permission.'
  },
  {
    id: 'sch4_lang_29',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Correct Word Usage – Similes',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Complete the traditional English simile:\n"As wise as an ________ and as busy as a ________."',
    options: [
      'owl, bee',
      'ox, snail',
      'eagle, tortoise',
      'ant, peacock'
    ],
    correctAnswer: 0,
    explanation: 'Standard English similes are "as wise as an owl" and "as busy as a bee".'
  },
  {
    id: 'sch4_lang_30',
    grade: 'CLASS_4',
    domain: 'LANGUAGE',
    topic: 'Grammar – Identifying Adverbs of Manner',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Identify the Adverb in the following sentence:\n"The little girl solved the mathematics puzzle quickly and accurately."',
    options: [
      'quickly (and accurately)',
      'little',
      'mathematics',
      'puzzle'
    ],
    correctAnswer: 0,
    explanation: '"Quickly" and "accurately" modify the verb "solved" by telling *how* the action was performed (Adverbs of Manner).'
  }
];

// ============================================================================
// CLASS 4 SCHOLARSHIP — SECTION 2: MATHEMATICS (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C4_MATH_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch4_math_01',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Place Value and Face Value',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'In the five-digit number 78,482, what is the difference between the place values of the two 8s?',
    options: ['7,920', '7,992', '8,080', '7,200'],
    correctAnswer: 0,
    explanation: 'The first 8 is in the thousands place (place value = 8,000) and the second 8 is in the tens place (place value = 80). Difference = 8,000 - 80 = 7,920.'
  },
  {
    id: 'sch4_math_02',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Greatest & Smallest Numbers from Given Digits',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Using each of the digits 5, 0, 8, 2, and 7 exactly once, what is the difference between the greatest 5-digit number and the smallest 5-digit number that can be formed?',
    options: ['66,942', '64,962', '85,149', '66,851'],
    correctAnswer: 0,
    explanation: 'Greatest 5-digit number = 87,520. Smallest 5-digit number (0 cannot be in the ten-thousands place) = 20,578. Difference = 87,520 - 20,578 = 66,942.'
  },
  {
    id: 'sch4_math_03',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Roman Numerals',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'Evaluate the Roman numeral expression and express the result in international numerals:\n(XLIV + XXIX) - XVIII',
    options: ['55', '65', '45', '53'],
    correctAnswer: 0,
    explanation: 'XLIV = 44, XXIX = 29, and XVIII = 18. Therefore, (44 + 29) - 18 = 73 - 18 = 55 (LV).'
  },
  {
    id: 'sch4_math_04',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Prime, Composite & Twin Prime Numbers',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'How many prime numbers are there between 1 and 50, and which of the following pairs is a pair of Twin Primes?',
    options: [
      '15 prime numbers; (29, 31) is a pair of twin primes',
      '16 prime numbers; (21, 23) is a pair of twin primes',
      '14 prime numbers; (15, 17) is a pair of twin primes',
      '15 prime numbers; (37, 39) is a pair of twin primes'
    ],
    correctAnswer: 0,
    explanation: 'There are exactly 15 prime numbers from 1 to 50 (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47). Twin primes differ by 2, and both 29 and 31 are prime.'
  },
  {
    id: 'sch4_math_05',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Arithmetic – Four Fundamental Operations & Division Algorithm',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'In a division sum, the divisor is 24, the quotient is 35, and the remainder is 17. What is the dividend?',
    options: ['857', '840', '867', '823'],
    correctAnswer: 0,
    explanation: 'Dividend = (Divisor × Quotient) + Remainder = (24 × 35) + 17 = 840 + 17 = 857.'
  },
  {
    id: 'sch4_math_06',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Arithmetic – Order of Operations (BODMAS)',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Simplify the arithmetic expression:\n48 ÷ 6 × 3 + 15 - (4 × 5)',
    options: ['19', '11', '29', '7'],
    correctAnswer: 0,
    explanation: 'Following BODMAS: Brackets first (4 × 5 = 20); then Division (48 ÷ 6 = 8); then Multiplication (8 × 3 = 24); then Addition and Subtraction: 24 + 15 - 20 = 19.'
  },
  {
    id: 'sch4_math_07',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Fractions – Equivalent Fractions & Simplest Form',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'If 3/7 = x/35 = 27/y, then what is the sum of x and y (x + y)?',
    options: ['78', '63', '50', '84'],
    correctAnswer: 0,
    explanation: 'From 3/7 = x/35, multiplying numerator and denominator by 5 gives x = 15. From 3/7 = 27/y, multiplying by 9 gives y = 63. Thus x + y = 15 + 63 = 78.'
  },
  {
    id: 'sch4_math_08',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Fractions – Addition and Subtraction of Fractions',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Out of a water tank, 2/9 of the water was used for gardening in the morning and 4/9 was used for cleaning in the afternoon. What fraction of the tank still remains full?',
    options: ['1/3', '2/3', '3/9', '5/9'],
    correctAnswer: 0,
    explanation: 'Total fraction used = 2/9 + 4/9 = 6/9. Remaining fraction = 1 - 6/9 = 3/9, which simplifies to 1/3.'
  },
  {
    id: 'sch4_math_09',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Fractions – Fractional Part of a Collection',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A basket contains 72 mangoes. If 3/8 of the mangoes are ripe and the rest are raw, how many raw mangoes are there in the basket?',
    options: ['45', '27', '36', '48'],
    correctAnswer: 0,
    explanation: 'Ripe mangoes = (3/8) × 72 = 3 × 9 = 27. Raw mangoes = 72 - 27 = 45 (or 5/8 × 72 = 45).'
  },
  {
    id: 'sch4_math_10',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Decimals – Place Value & Conversion to Fractions',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'What is the decimal value of the expression: 40 + 7 + (3/10) + (8/100)?',
    options: ['47.38', '47.83', '407.38', '47.038'],
    correctAnswer: 0,
    explanation: '40 + 7 = 47; 3/10 = 0.3 (tenths); 8/100 = 0.08 (hundredths). Total = 47.38.'
  },
  {
    id: 'sch4_math_11',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Decimals – Addition and Subtraction of Decimals',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Ananya bought a storybook for ₹124.75 and a box of crayons for ₹65.50. If she gave a ₹500 note to the shopkeeper, how much money did she get back?',
    options: ['₹309.75', '₹310.25', '₹190.25', '₹309.25'],
    correctAnswer: 0,
    explanation: 'Total cost = ₹124.75 + ₹65.50 = ₹190.25. Change returned = ₹500.00 - ₹190.25 = ₹309.75.'
  },
  {
    id: 'sch4_math_12',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Percentage – Basic Percentage Calculation',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'In a primary school of 400 students, 55% are girls. How many boys study in that school?',
    options: ['180', '220', '160', '200'],
    correctAnswer: 0,
    explanation: 'If 55% are girls, then (100% - 55%) = 45% are boys. Number of boys = (45/100) × 400 = 45 × 4 = 180.'
  },
  {
    id: 'sch4_math_13',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Ratio and Proportion – Unitary Method',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'If the cost of 6 identical geometry boxes is ₹390, what will be the cost of 11 such geometry boxes?',
    options: ['₹715', '₹650', '₹725', '₹685'],
    correctAnswer: 0,
    explanation: 'Cost of 1 geometry box = ₹390 ÷ 6 = ₹65. Cost of 11 geometry boxes = 11 × ₹65 = ₹715.'
  },
  {
    id: 'sch4_math_14',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Ratio and Proportion – Dividing a Quantity in a Given Ratio',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'A ribbon of length 84 cm is cut into two pieces in the ratio 3 : 4. What is the length of the longer piece?',
    options: ['48 cm', '36 cm', '52 cm', '42 cm'],
    correctAnswer: 0,
    explanation: 'Total parts = 3 + 4 = 7 parts. 1 part = 84 ÷ 7 = 12 cm. Longer piece = 4 × 12 = 48 cm.'
  },
  {
    id: 'sch4_math_15',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Profit and Loss – Cost Price & Selling Price',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'A fruit seller bought 5 dozen bananas at ₹40 per dozen and spent ₹30 on transport. He sold all the bananas for ₹280. What was his net profit or loss?',
    options: [
      'Profit of ₹50',
      'Profit of ₹80',
      'Loss of ₹50',
      'Profit of ₹30'
    ],
    correctAnswer: 0,
    explanation: 'Purchase cost = 5 × ₹40 = ₹200. Total Cost Price including transport = ₹200 + ₹30 = ₹230. Selling Price = ₹280. Net Profit = ₹280 - ₹230 = ₹50.'
  },
  {
    id: 'sch4_math_16',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Time and Work – Work Rate & Days',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A carpenter can make 4 wooden chairs in 3 days. At the same rate, how many days will he take to make 20 such wooden chairs?',
    options: ['15 days', '12 days', '16 days', '18 days'],
    correctAnswer: 0,
    explanation: '20 chairs is 5 times 4 chairs (20 ÷ 4 = 5). Therefore, time required = 5 × 3 days = 15 days.'
  },
  {
    id: 'sch4_math_17',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Time, Calendar & Clock Duration',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A school library opens at 8:45 AM and closes at 3:30 PM. For how many hours and minutes does the library remain open?',
    options: [
      '6 hours 45 minutes',
      '6 hours 15 minutes',
      '7 hours 15 minutes',
      '5 hours 45 minutes'
    ],
    correctAnswer: 0,
    explanation: 'From 8:45 AM to 12:00 Noon is 3 hours 15 minutes. From 12:00 Noon to 3:30 PM is 3 hours 30 minutes. Total duration = 6 hours 45 minutes.'
  },
  {
    id: 'sch4_math_18',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Time, Speed and Distance',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'A school bus travels at a uniform speed of 45 km per hour. How much distance will it cover in 3 hours 20 minutes?',
    options: ['150 km', '135 km', '145 km', '160 km'],
    correctAnswer: 0,
    explanation: 'In 3 hours, the bus covers 3 × 45 = 135 km. Since 20 minutes is 1/3 of an hour, in 20 minutes it covers 45 ÷ 3 = 15 km. Total distance = 135 + 15 = 150 km.'
  },
  {
    id: 'sch4_math_19',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Angles, Vertices, Edges & Faces of 3D Shapes',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What is the total sum of the number of faces, edges, and vertices of a cuboid?',
    options: ['26', '24', '20', '28'],
    correctAnswer: 0,
    explanation: 'A cuboid (and a cube) has 6 faces, 12 edges, and 8 vertices. Their sum = 6 + 12 + 8 = 26.'
  },
  {
    id: 'sch4_math_20',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Circle: Radius, Diameter & Chord',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'If the length of the longest chord of a circle is 18 cm, what is the radius of that circle?',
    options: ['9 cm', '36 cm', '18 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'The longest chord of a circle is its diameter. Since Diameter = 18 cm, Radius = Diameter ÷ 2 = 18 ÷ 2 = 9 cm.'
  },
  {
    id: 'sch4_math_21',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Perimeter of a Rectangle',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A rectangular playground is 45 m long and 25 m wide. How much wire is needed to put a 3-round fence around the playground?',
    options: ['420 m', '140 m', '210 m', '360 m'],
    correctAnswer: 0,
    explanation: 'Perimeter of 1 round = 2 × (Length + Breadth) = 2 × (45 + 25) = 140 m. For 3 rounds, wire needed = 3 × 140 = 420 m.'
  },
  {
    id: 'sch4_math_22',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Area of a Square and Rectangle',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'The perimeter of a square hall is 64 metres. What is the area of the square hall?',
    options: ['256 sq. m', '128 sq. m', '196 sq. m', '225 sq. m'],
    correctAnswer: 0,
    explanation: 'Side of the square = Perimeter ÷ 4 = 64 ÷ 4 = 16 m. Area of the square = Side × Side = 16 × 16 = 256 sq. m.'
  },
  {
    id: 'sch4_math_23',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Metric Units of Length, Mass & Capacity',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'A milk dairy collected 45 litres 500 millilitres of milk in the morning and 38 litres 750 millilitres in the evening. How many small pouches of 250 mL each can be packed from 10 litres of this milk?',
    options: ['40 pouches', '25 pouches', '50 pouches', '20 pouches'],
    correctAnswer: 0,
    explanation: '10 litres = 10 × 1,000 mL = 10,000 mL. Number of 250 mL pouches = 10,000 ÷ 250 = 40 pouches.'
  },
  {
    id: 'sch4_math_24',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Mathematical Reasoning – Currency Notes & Coins',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'A piggy bank contains an equal number of ₹20 notes, ₹10 notes, and ₹5 coins. If the total amount in the piggy bank is ₹525, how many notes/coins of each denomination are there?',
    options: ['15', '12', '18', '20'],
    correctAnswer: 0,
    explanation: 'Value of one set containing 1 note of ₹20, 1 note of ₹10, and 1 coin of ₹5 = ₹20 + ₹10 + ₹5 = ₹35. Number of sets = 525 ÷ 35 = 15.'
  },
  {
    id: 'sch4_math_25',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Word Problems – Multi-Step Arithmetic Reasoning',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'In a school auditorium, there are 18 rows of chairs with 24 chairs in each row. On Annual Day, 389 seats were occupied. How many chairs remained vacant?',
    options: ['43', '53', '37', '47'],
    correctAnswer: 0,
    explanation: 'Total chairs = 18 × 24 = 432. Vacant chairs = 432 - 389 = 43.'
  },
  {
    id: 'sch4_math_26',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Factors and Multiples (LCM)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'What is the smallest number which when divided by 6, 8, and 12 leaves zero remainder in each case?',
    options: ['24', '48', '12', '36'],
    correctAnswer: 0,
    explanation: 'The smallest common multiple (LCM) of 6, 8, and 12 is 24 (since 24 ÷ 6 = 4, 24 ÷ 8 = 3, and 24 ÷ 12 = 2).'
  },
  {
    id: 'sch4_math_27',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Time & Calendar Reasoning – Leap Year & Days of the Week',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'If Republic Day (26th January) in a leap year falls on a Friday, on which day of the week will Maharashtra Day (1st May) fall in that same leap year?',
    options: ['Wednesday', 'Tuesday', 'Thursday', 'Monday'],
    correctAnswer: 0,
    explanation: 'In a leap year, February has 29 days. Remaining days in Jan = 5; Feb = 29; March = 31; April = 30; May = 1. Total days = 5 + 29 + 31 + 30 + 1 = 96 days. 96 ÷ 7 leaves remainder 5. Counting 5 days ahead of Friday gives Wednesday.'
  },
  {
    id: 'sch4_math_28',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Lines of Symmetry',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'How many lines of symmetry does a regular square have, and how many lines of symmetry does an equilateral triangle have?',
    options: [
      'Square has 4 and Equilateral triangle has 3',
      'Square has 2 and Equilateral triangle has 3',
      'Square has 4 and Equilateral triangle has 1',
      'Both have 4 lines of symmetry'
    ],
    correctAnswer: 0,
    explanation: 'A regular n-sided polygon has n lines of symmetry: a square has 4 (2 diagonals + 2 mid-segment bisectors) and an equilateral triangle has 3.'
  },
  {
    id: 'sch4_math_29',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Mathematical Reasoning – Pictograph Data Interpretation',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'In a school pictograph showing trees planted by classes, 1 tree symbol (🌳) represents 15 saplings. If Class 4 has 6 tree symbols and Class 3 has 4 tree symbols, how many MORE saplings did Class 4 plant than Class 3?',
    options: ['30 saplings', '90 saplings', '15 saplings', '45 saplings'],
    correctAnswer: 0,
    explanation: 'Difference in symbols = 6 - 4 = 2 symbols. Since 1 symbol = 15 saplings, 2 symbols = 2 × 15 = 30 saplings.'
  },
  {
    id: 'sch4_math_30',
    grade: 'CLASS_4',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Even, Odd & Consecutive Numbers',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'The sum of three consecutive even numbers is 78. What is the greatest of these three numbers?',
    options: ['28', '26', '24', '30'],
    correctAnswer: 0,
    explanation: 'Middle even number = Sum ÷ 3 = 78 ÷ 3 = 26. The three consecutive even numbers are 24, 26, and 28, so the greatest is 28.'
  }
];

// ============================================================================
// CLASS 4 SCHOLARSHIP — SECTION 3: INTELLIGENCE & REASONING (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C4_INTELLIGENCE_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch4_int_01',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Number Series – Additive Difference Pattern',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Find the next number in the number series:\n4, 9, 16, 25, 36, 49, ?',
    options: ['64', '56', '60', '81'],
    correctAnswer: 0,
    explanation: 'The series consists of consecutive perfect squares: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49, so the next term is 8² = 64.'
  },
  {
    id: 'sch4_int_02',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Number Series – Progressive Step Difference',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Identify the missing number in the series:\n3, 7, 13, 21, 31, ?, 57',
    options: ['43', '41', '45', '39'],
    correctAnswer: 0,
    explanation: 'The differences between consecutive terms increase by 2 each time: +4, +6, +8, +10, +12, +14. Thus 31 + 12 = 43 (and 43 + 14 = 57).'
  },
  {
    id: 'sch4_int_03',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Alphabet Series – Letter Skip Pattern',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Find the next letter-pair in the alphabet series:\nAZ, BY, CX, DW, EV, ?',
    options: ['FU', 'FT', 'GT', 'GV'],
    correctAnswer: 0,
    explanation: 'The first letter moves forward (A, B, C, D, E → F) while the second letter moves backward from the end of the alphabet (Z, Y, X, W, V → U), giving FU.'
  },
  {
    id: 'sch4_int_04',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Alphabet Series – Progressive Gap',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Complete the letter series:\nB, D, G, K, P, ?',
    options: ['V', 'U', 'W', 'T'],
    correctAnswer: 0,
    explanation: 'Alphabet positions: B(2), D(4), G(7), K(11), P(16). The steps are +2, +3, +4, +5, so the next step is +6: 16 + 6 = 22nd letter, which is V.'
  },
  {
    id: 'sch4_int_05',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Analogy – Word Relationship',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Complete the analogy based on the relationship between the first pair:\nThermometer : Temperature :: Barometer : ?',
    options: [
      'Atmospheric Pressure',
      'Earthquake Intensity',
      'Humidity',
      'Wind Direction'
    ],
    correctAnswer: 0,
    explanation: 'A thermometer measures temperature; a barometer measures atmospheric pressure.'
  },
  {
    id: 'sch4_int_06',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Analogy – Numerical Relationship',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Find the number that replaces the question mark in the numerical analogy:\n7 : 50 :: 9 : ?',
    options: ['82', '81', '73', '90'],
    correctAnswer: 0,
    explanation: 'Rule: n : (n² + 1). Since 7² + 1 = 49 + 1 = 50, for 9 we have 9² + 1 = 81 + 1 = 82.'
  },
  {
    id: 'sch4_int_07',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Classification – Odd One Out (Verbal)',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Three of the following four words are alike in a certain way and one is different. Choose the ODD one out:',
    options: ['Potato', 'Mango', 'Apple', 'Orange'],
    correctAnswer: 0,
    explanation: 'Mango, Apple, and Orange are fruits that grow above ground on trees, whereas Potato is an underground modified stem (tuber) vegetable.'
  },
  {
    id: 'sch4_int_08',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Classification – Odd One Out (Numerical)',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Find the ODD number out from the given four numbers:\n27, 64, 100, 125',
    options: ['100', '27', '64', '125'],
    correctAnswer: 0,
    explanation: '27 (3³), 64 (4³), and 125 (5³) are perfect cubes, whereas 100 (10²) is a perfect square but not a perfect cube.'
  },
  {
    id: 'sch4_int_09',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Coding and Decoding – Letter Shift Cipher',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a certain code language, if "BOOK" is written as "CPPL", how will "MIND" be written in that same code language?',
    options: ['NJOE', 'LHM C', 'NJOD', 'NKPE'],
    correctAnswer: 0,
    explanation: 'Each letter is shifted one step forward (+1) in the English alphabet: M→N, I→J, N→O, D→E, giving NJOE.'
  },
  {
    id: 'sch4_int_10',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Coding and Decoding – Number Substitution Code',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'If in a secret code, P = 5, A = 2, R = 8, K = 3, and S = 9, then what is the sum of the digits representing the word "SPARK"?',
    options: ['27', '25', '24', '29'],
    correctAnswer: 0,
    explanation: 'SPARK → S(9) + P(5) + A(2) + R(8) + K(3) = 9 + 5 + 2 + 8 + 3 = 27.'
  },
  {
    id: 'sch4_int_11',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Direction Sense Test – Turns & Final Facing Direction',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Pranav is facing North. He turns 90° clockwise, then turns 180°, and finally turns 90° anticlockwise. Which direction is Pranav facing now?',
    options: ['South', 'North', 'East', 'West'],
    correctAnswer: 0,
    explanation: 'Facing North → 90° clockwise faces East → 180° turn faces West → 90° anticlockwise from West faces South.'
  },
  {
    id: 'sch4_int_12',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Direction Sense Test – Distance from Starting Point',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Sneha walks 10 metres North from her house, turns right and walks 6 metres, then turns right again and walks 10 metres. How far and in which direction is she now from her house?',
    options: [
      '6 metres East of her house',
      '10 metres North of her house',
      '6 metres West of her house',
      '26 metres South of her house'
    ],
    correctAnswer: 0,
    explanation: 'Walking 10 m North, then 6 m East (right), and 10 m South (right) brings her parallel to her starting latitude, exactly 6 metres due East of her house.'
  },
  {
    id: 'sch4_int_13',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Blood Relations – Family Tree Reasoning',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Pointing to a photograph of a boy, Kavita said, "He is the son of the only brother of my mother." How is the boy in the photograph related to Kavita?',
    options: ['Cousin (Maternal Uncle’s Son)', 'Nephew', 'Brother', 'Uncle'],
    correctAnswer: 0,
    explanation: '"The only brother of my mother" is Kavita’s maternal uncle (Mama). The son of her maternal uncle is her cousin.'
  },
  {
    id: 'sch4_int_14',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Blood Relations – Generational Relationship',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'A and B are sisters. C is the father of A. D is the mother of C. How is B related to D?',
    options: ['Granddaughter', 'Daughter', 'Niece', 'Sister'],
    correctAnswer: 0,
    explanation: 'Since C is the father of sisters A and B, and D is the mother of C, D is the paternal grandmother of B, making B the granddaughter of D.'
  },
  {
    id: 'sch4_int_15',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Ranking and Queue Ordering – Total Students in a Row',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a queue of students waiting at the school book counter, Aditya ranks 14th from the front and 19th from the back. How many students are standing in the queue in total?',
    options: ['32', '33', '31', '34'],
    correctAnswer: 0,
    explanation: 'Total students = (Rank from front + Rank from back) - 1 = (14 + 19) - 1 = 33 - 1 = 32.'
  },
  {
    id: 'sch4_int_16',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Ranking and Ordering – Height / Score Comparison',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Among five friends, Rahul is taller than Mohan but shorter than Yash. Kabir is taller than Yash. Sameer is shorter than Mohan. Who is the tallest among all five friends?',
    options: ['Kabir', 'Yash', 'Rahul', 'Mohan'],
    correctAnswer: 0,
    explanation: 'Ordering from tallest to shortest: Kabir > Yash > Rahul > Mohan > Sameer. Therefore, Kabir is the tallest.'
  },
  {
    id: 'sch4_int_17',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Missing Numbers – Matrix / Triangle Pattern',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Study the pattern in the first two sets and find the missing number (?) in the third set:\nSet 1: (4, 5) → 23\nSet 2: (6, 7) → 45\nSet 3: (8, 9) → ?',
    options: ['75', '72', '69', '78'],
    correctAnswer: 0,
    explanation: 'Rule: (First number × Second number) + 3. In Set 1: (4 × 5) + 3 = 23. In Set 2: (6 × 7) + 3 = 45. In Set 3: (8 × 9) + 3 = 72 + 3 = 75.'
  },
  {
    id: 'sch4_int_18',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Pattern Recognition – Repeating Symbol Sequence',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Observe the repeating rhythm of letters and fill in the three blanks (_) in order:\nA B C _ A _ C D _ B C D',
    options: [
      'D, B, A',
      'D, C, A',
      'B, D, A',
      'A, B, D'
    ],
    correctAnswer: 0,
    explanation: 'The block of 4 letters "A B C D" repeats three times: (A B C [D]) (A [B] C D) ([A] B C D). So the missing letters are D, B, A.'
  },
  {
    id: 'sch4_int_19',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Counting Geometric Shapes',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'A square is divided into 4 smaller equal squares by joining the midpoints of its opposite sides (like a 2 × 2 window grid). How many squares of ALL sizes are there in the figure altogether?',
    options: ['5 squares', '4 squares', '6 squares', '8 squares'],
    correctAnswer: 0,
    explanation: 'A 2 × 2 grid contains 4 small (1×1) squares plus 1 large outer (2×2) square = 4 + 1 = 5 squares in total.'
  },
  {
    id: 'sch4_int_20',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Mirror Image (Lateral Inversion)',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'When the capital English word "MATH" is viewed in a plane mirror held vertically on its right side, which letters look identical to their original appearance (due to vertical symmetry)?',
    options: [
      'All four letters M, A, T, and H look individually identical, though their left-to-right order reverses to HTAM',
      'None of the letters look symmetrical',
      'Only the letter M has vertical symmetry',
      'The word turns upside down into WVLH'
    ],
    correctAnswer: 0,
    explanation: 'The capital letters A, H, I, M, O, T, U, V, W, X, Y have vertical axis symmetry, so in a vertical mirror "MATH" appears laterally reversed as "HTAM".'
  },
  {
    id: 'sch4_int_21',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Water Image (Horizontal Reflection)',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'Which of the following words remains UNCHANGED in appearance when seen in its Water Image (horizontal reflection across a water surface below)?',
    options: ['HIKED', 'MOM', 'TOT', 'WOW'],
    correctAnswer: 0,
    explanation: 'The capital letters B, C, D, E, H, I, K, O, X have a horizontal line of symmetry, so Every letter in "HIKED" remains upright and unchanged in a water reflection!'
  },
  {
    id: 'sch4_int_22',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Age Puzzle',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Today, Tanvi is 9 years old and her mother is 37 years old. After how many years will Tanvi’s mother be three times as old as Tanvi?',
    options: ['5 years', '4 years', '6 years', '3 years'],
    correctAnswer: 0,
    explanation: 'After 5 years, Tanvi will be 9 + 5 = 14 years old and her mother will be 37 + 5 = 42 years old. Since 42 = 3 × 14, the correct answer is 5 years.'
  },
  {
    id: 'sch4_int_23',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Mathematical Symbol Substitution',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'If "+" means "×", "×" means "-", "-" means "÷", and "÷" means "+", then find the value of:\n12 + 3 × 16 - 4 ÷ 7',
    options: ['39', '35', '43', '29'],
    correctAnswer: 0,
    explanation: 'Replacing the symbols according to the code: 12 × 3 - 16 ÷ 4 + 7. Applying BODMAS: 16 ÷ 4 = 4, and 12 × 3 = 36. Then 36 - 4 + 7 = 39.'
  },
  {
    id: 'sch4_int_24',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Clock Hands Angle',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'What kind of angle is formed between the hour hand and the minute hand of a wall clock at exactly 3:00 o’clock, and in which directions do the hands point if 12 points North?',
    options: [
      'A Right Angle (90°); the minute hand points North and the hour hand points East',
      'A Straight Angle (180°); both hands point South',
      'An Acute Angle (45°); the hour hand points West',
      'An Obtuse Angle (120°); the minute hand points East'
    ],
    correctAnswer: 0,
    explanation: 'At 3:00, the minute hand is at 12 (North) and the hour hand is at 3 (East), forming a 90° right angle.'
  },
  {
    id: 'sch4_int_25',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Venn Diagram Classification',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'Which of the following three groups is best represented by two smaller non-overlapping circles completely inside one large circle?',
    options: [
      'Birds (large circle), Parrots (small circle 1), and Pigeons (small circle 2)',
      'Fruits, Mangoes, and Furniture',
      'Teachers, Doctors, and Apples',
      'Days, Weeks, and Rivers'
    ],
    correctAnswer: 0,
    explanation: 'Both Parrots and Pigeons are completely distinct types of Birds, so their two separate circles lie wholly inside the larger circle of Birds.'
  },
  {
    id: 'sch4_int_26',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Alphabetical Dictionary Order',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'If the following four words are arranged in alphabetical order as in an English dictionary, which word will come THIRD?',
    options: ['Planet', 'Palace', 'Paper', 'Plant'],
    correctAnswer: 0,
    explanation: 'Alphabetical dictionary order: 1. Palace, 2. Paper, 3. Planet, 4. Plant. Thus, "Planet" comes third.'
  },
  {
    id: 'sch4_int_27',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Counting Triangles',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'In ΔABC, a single straight line segment AD is drawn from the top vertex A to the base BC (dividing the base into two parts BD and DC). How many triangles in total are formed in this figure?',
    options: ['3 triangles', '2 triangles', '4 triangles', '5 triangles'],
    correctAnswer: 0,
    explanation: 'There are 2 smaller component triangles (ΔABD and ΔADC) plus 1 large outer combined triangle (ΔABC) = 1 + 2 = 3 triangles.'
  },
  {
    id: 'sch4_int_28',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Counting Digits in a Number Sequence',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In the following sequence of numbers, how many times is the digit "4" immediately preceded by an odd digit and immediately followed by an even digit?\n3 4 8 2 4 6 7 4 2 9 4 5 1 4 6',
    options: ['3 times', '2 times', '4 times', '1 time'],
    correctAnswer: 0,
    explanation: 'We look for the pattern (Odd)(4)(Even): "3 4 8" (yes, #1), "2 4 6" (no, 2 is even), "7 4 2" (yes, #2), "9 4 5" (no, 5 is odd), "1 4 6" (yes, #3). Total = 3 times.'
  },
  {
    id: 'sch4_int_29',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Pattern Recognition – Calendar Date Logic',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'If the 3rd day of a month is a Monday, what day of the week will the 24th day of the same month be?',
    options: ['Monday', 'Sunday', 'Tuesday', 'Wednesday'],
    correctAnswer: 0,
    explanation: '24 - 3 = 21 days = exactly 3 full weeks (3 × 7 = 21). Adding 21 days to a Monday lands on a Monday again.'
  },
  {
    id: 'sch4_int_30',
    grade: 'CLASS_4',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Handshake / Match Combinations',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Five chess players participate in a school round-robin tournament where every player plays exactly one match with every other player. How many chess matches are played in total?',
    options: ['10 matches', '15 matches', '20 matches', '8 matches'],
    correctAnswer: 0,
    explanation: 'Number of matches among n players = n(n - 1) / 2 = (5 × 4) / 2 = 10 matches.'
  }
];

// ============================================================================
// CLASS 7 SCHOLARSHIP — SECTION 1: ENGLISH LANGUAGE (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C7_LANGUAGE_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch7_lang_01',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Scientific & Ecological Passage',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'Read the passage carefully and answer the question:\n"Mangrove forests along coastal estuaries possess specialized aerial breathing roots called pneumatophores that project upward above waterlogged mud. Besides absorbing oxygen during low tide, these dense root networks dissipate the destructive energy of cyclonic storm surges and provide safe nurseries for juvenile marine life."\n\nAccording to the passage, what dual ecological role do mangrove root systems perform?',
    options: [
      'They enable root respiration in oxygen-poor mud and shield coastlines from storm surges while sheltering young marine organisms',
      'They convert seawater into freshwater and prevent all rainfall along the coast',
      'They grow exclusively on dry mountain summits above 3,000 metres',
      'They replace coral reefs by dissolving calcium carbonate'
    ],
    correctAnswer: 0,
    explanation: 'The passage highlights that pneumatophores absorb oxygen above waterlogged mud while the root networks buffer cyclonic storm waves and serve as marine nurseries.'
  },
  {
    id: 'sch7_lang_02',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Contextual Vocabulary ("Dissipate")',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'In the sentence "These dense root networks dissipate the destructive energy of cyclonic storm surges", what does the word "dissipate" mean?',
    options: [
      'Scatter, weaken, and reduce in force',
      'Multiply and intensify tenfold',
      'Freeze into solid ice blocks',
      'Store permanently underground'
    ],
    correctAnswer: 0,
    explanation: 'In physical and ecological contexts, to "dissipate" energy means to disperse, scatter, or weaken its force.'
  },
  {
    id: 'sch7_lang_03',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Biographical Passage (Dr. APJ Abdul Kalam)',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'Read the extract and answer:\n"Growing up in Rameswaram, young Abdul Kalam distributed newspapers early each morning before walking to school so he could support his family’s modest income. Later, as an aerospace scientist leading India’s SLV-3 rocket programme, he credited those early mornings with teaching him time discipline, resilience after failure, and humility."\n\nWhich inference is best supported by this biographical extract?',
    options: [
      'Early life responsibilities and perseverance shaped the work ethic that sustained his scientific leadership',
      'He abandoned his school studies permanently to run a printing press',
      'Scientific success requires avoiding all hard work during childhood',
      'He never experienced any technical setbacks during rocket development'
    ],
    correctAnswer: 0,
    explanation: 'The passage directly links his childhood discipline in distributing newspapers with the resilience, time management, and humility that guided his aerospace career.'
  },
  {
    id: 'sch7_lang_04',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Reading Comprehension – Poetic Devices & Figurative Language',
    questionType: 'Passage-Based',
    difficulty: 'Moderate',
    question:
      'Identify the figure of speech in the following poetic line:\n"The silver moon walked silently across the velvet sky in her starry shoes."',
    options: [
      'Personification (attributing human actions and attire to the moon)',
      'Onomatopoeia (sound-imitating words)',
      'Oxymoron (contradictory terms placed together)',
      'Pun (play on two meanings of a homophone)'
    ],
    correctAnswer: 0,
    explanation: 'Describing the inanimate moon as "walking silently in her starry shoes" invests it with human actions and qualities (Personification).'
  },
  {
    id: 'sch7_lang_05',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Synonyms – Advanced Vocabulary',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Choose the word that is closest in meaning (Synonym) to the word "METICULOUS":',
    options: [
      'Thorough and extremely careful about small details',
      'Reckless and hasty',
      'Vague and forgetful',
      'Noisy and boastful'
    ],
    correctAnswer: 0,
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise.'
  },
  {
    id: 'sch7_lang_06',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Synonyms – Contextual Replacement',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Select the best Synonym for the capitalised word in the sentence:\nThe archaeologist discovered an AUTHENTIC copper inscription from the Satavahana period.',
    options: ['Genuine', 'Counterfeit', 'Fragile', 'Temporary'],
    correctAnswer: 0,
    explanation: '"Authentic" means genuine, real, or of undisputed origin (its antonym is counterfeit or fake).'
  },
  {
    id: 'sch7_lang_07',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Antonyms – Advanced Vocabulary',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Choose the word that is opposite in meaning (Antonym) to "OPTIMISTIC":',
    options: ['Pessimistic', 'Hopeful', 'Confident', 'Enthusiastic'],
    correctAnswer: 0,
    explanation: '"Optimistic" means hopeful and confident about the future; its direct antonym is "Pessimistic".'
  },
  {
    id: 'sch7_lang_08',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Antonyms – Prefix & Context',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Select the correct Antonym of the underlined word:\nThe witness gave a VAGUE description of the event.',
    options: ['Precise (Clear and definite)', 'Obscure', 'Faint', 'Doubtful'],
    correctAnswer: 0,
    explanation: '"Vague" means uncertain, indistinct, or imprecise; its antonym is "Precise", "Clear", or "Explicit".'
  },
  {
    id: 'sch7_lang_09',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Active and Passive Voice',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Change the following sentence from Active Voice to Passive Voice:\n"The students of Class 7 have designed a solar water heater."',
    options: [
      'A solar water heater has been designed by the students of Class 7.',
      'A solar water heater was designed by the students of Class 7.',
      'A solar water heater is being designed by the students of Class 7.',
      'A solar water heater had been designed by the students of Class 7.'
    ],
    correctAnswer: 0,
    explanation: 'Present Perfect Active ("have designed") transforms into Present Perfect Passive ("has been designed" to agree with the singular new subject "A solar water heater").'
  },
  {
    id: 'sch7_lang_10',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Direct and Indirect (Reported) Speech',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Convert the following sentence into Indirect (Reported) Speech:\nThe science teacher said to us, "Water boils at 100 degrees Celsius at standard atmospheric pressure."',
    options: [
      'The science teacher told us that water boils at 100 degrees Celsius at standard atmospheric pressure.',
      'The science teacher told us that water had boiled at 100 degrees Celsius.',
      'The science teacher asked us whether water boiled at 100 degrees Celsius.',
      'The science teacher said that water was boiling at 100 degrees Celsius.'
    ],
    correctAnswer: 0,
    explanation: 'When the reported statement expresses a universal scientific truth, the tense of the verb inside the reported clause ("boils") remains unchanged in the Simple Present.'
  },
  {
    id: 'sch7_lang_11',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Identifying Clauses (Noun, Adjective, Adverb Clauses)',
    questionType: 'Conceptual',
    difficulty: 'Difficult',
    question: 'Identify the type of subordinate clause underlined in the sentence below:\n"The girl WHO WON THE STATE MATHEMATICS OLYMPIAD studies in our school."',
    options: [
      'Adjective (Relative) Clause modifying the noun "girl"',
      'Adverb Clause of Time',
      'Noun Clause acting as the object of a preposition',
      'Coordinate Principal Clause'
    ],
    correctAnswer: 0,
    explanation: '"Who won the state mathematics olympiad" begins with the relative pronoun "who" and qualifies the antecedent noun "girl", functioning as an Adjective (Relative) Clause.'
  },
  {
    id: 'sch7_lang_12',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Question Tags',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct Question Tag to complete the sentence:\n"Let us organize a book-donation drive for the village library, ________?"',
    options: [
      'shall we',
      'don’t we',
      'aren’t we',
      'will you'
    ],
    correctAnswer: 0,
    explanation: 'Imperative sentences beginning with "Let us (Let’s)" expressing a collective proposal always take the question tag "shall we?".'
  },
  {
    id: 'sch7_lang_13',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Correlative Conjunctions (No sooner...than / Hardly...when)',
    questionType: 'Application-Based',
    difficulty: 'Difficult',
    question: 'Rewrite the sentence using "No sooner... than":\n"As soon as the referee blew the whistle, the sprinters dashed forward."',
    options: [
      'No sooner did the referee blow the whistle than the sprinters dashed forward.',
      'No sooner the referee blew the whistle when the sprinters dashed forward.',
      'No sooner did the referee blew the whistle than the sprinters dashed forward.',
      'No sooner had the referee blown the whistle then the sprinters dashed forward.'
    ],
    correctAnswer: 0,
    explanation: '"No sooner" triggers subject-auxiliary inversion ("did the referee blow") and is always paired with the conjunction "than" (never "when" or "then").'
  },
  {
    id: 'sch7_lang_14',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Non-Finite Verbs (Infinitives, Gerunds, Participles)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What grammatical function does the word "SWIMMING" perform in the sentence:\n"Swimming is an excellent aerobic exercise for cardiovascular health."',
    options: [
      'Gerund (Verbal Noun) acting as the subject of the verb "is"',
      'Present Participle modifying a noun',
      'Finite Main Verb in the Past Continuous tense',
      'Adverb of Frequency'
    ],
    correctAnswer: 0,
    explanation: 'A verb ending in "-ing" that functions as a noun (here, the subject of the sentence) is called a Gerund (Verbal Noun).'
  },
  {
    id: 'sch7_lang_15',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Subject-Verb Agreement (Neither...nor / Either...or)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Fill in the blank with the correct verb agreeing with the subject:\n"Neither the captain nor the players ________ aware of the sudden change in match timings."',
    options: ['were', 'was', 'is', 'has been'],
    correctAnswer: 0,
    explanation: 'By the Rule of Proximity for "Neither... nor", the verb agrees with the nearer subject ("the players", plural), so the plural verb "were" is required.'
  },
  {
    id: 'sch7_lang_16',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Sentence Formation – Synthesis of Sentences (Too...to / So...that)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct transformation of the sentence removing "too... to":\n"The box was too heavy for the little boy to lift."',
    options: [
      'The box was so heavy that the little boy could not lift it.',
      'The box was so heavy that the little boy can lift it.',
      'The box was very heavy so the little boy lifted it.',
      'The box is so heavy that the little boy will not lift it.'
    ],
    correctAnswer: 0,
    explanation: 'In past tense ("was"), "too + adjective + for X + to-infinitive" transforms into "so + adjective + that + X + could not + base verb".'
  },
  {
    id: 'sch7_lang_17',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Sentence Formation – Paragraph Sentence Reordering (PQRS)',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Rearrange the four jumbled parts (P, Q, R, S) to form a coherent sentence:\n(P) to reduce plastic pollution\n(Q) cloth bags while visiting the market\n(R) citizens must carry reusable\n(S) and protect local ecosystems',
    options: [
      'R - Q - P - S',
      'P - Q - R - S',
      'Q - R - S - P',
      'S - P - R - Q'
    ],
    correctAnswer: 0,
    explanation: 'R-Q-P-S forms: "Citizens must carry reusable (R) cloth bags while visiting the market (Q) to reduce plastic pollution (P) and protect local ecosystems (S)."'
  },
  {
    id: 'sch7_lang_18',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Error Identification – Prepositional Usage ("Prefer...to", "Senior...to")',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Identify the segment containing a grammatical error:\n(A) My grandfather / (B) always prefers / (C) reading historical biographies / (D) than watching television.',
    options: [
      'Part (D) — "prefer" takes the preposition "to" ("to watching television"), not "than"',
      'Part (A) — should be "Mine grandfather"',
      'Part (B) — should be "always prefer"',
      'Part (C) — should be "to read historical biography"'
    ],
    correctAnswer: 0,
    explanation: 'The verb "prefer" (as well as Latin comparatives like senior, junior, superior) takes the preposition "to", never "than".'
  },
  {
    id: 'sch7_lang_19',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Error Identification – Tenses with "Since" and "For"',
    questionType: 'Statement-Based',
    difficulty: 'Moderate',
    question: 'Spot the grammatical error in the sentence:\n(A) Our school astronomer club / (B) is observing / (C) the phases of Venus / (D) since last November.',
    options: [
      'Part (B) — should be Present Perfect Continuous "has been observing" because "since last November" denotes duration from past to present',
      'Part (D) — should be "from last November"',
      'Part (A) — should be "are observing"',
      'Part (C) — no article before phases'
    ],
    correctAnswer: 0,
    explanation: 'An action that began at a point in the past ("since last November") and continues in the present requires the Present Perfect Continuous tense ("has been observing").'
  },
  {
    id: 'sch7_lang_20',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Fill in the Blanks – Phrasal Verbs',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct phrasal verb to complete the sentence:\n"Despite heavy rain, the inter-school football tournament was not ________; it continued as scheduled."',
    options: [
      'called off (cancelled)',
      'given away (distributed)',
      'looked after (taken care of)',
      'put on (worn)'
    ],
    correctAnswer: 0,
    explanation: 'The phrasal verb "call off" means to cancel a planned event.'
  },
  {
    id: 'sch7_lang_21',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Idioms and Phrases',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'What is the meaning of the underlined idiom in the sentence?\n"Instead of beating about the bush, the monitor stated the problem clearly to the principal."',
    options: [
      'Talking indirectly around a topic while avoiding the main point',
      'Clearing bushes in the school garden with a stick',
      'Speaking very loudly in an assembly hall',
      'Finishing a task ahead of the deadline'
    ],
    correctAnswer: 0,
    explanation: '"To beat about the bush" means to approach a matter indirectly or evasively without coming to the main point.'
  },
  {
    id: 'sch7_lang_22',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – One-Word Substitution',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Give one word for the following expression:\n"A person who can speak two languages fluently"',
    options: ['Bilingual', 'Monolingual', 'Philanthropist', 'Cartographer'],
    correctAnswer: 0,
    explanation: '"Bi-" means two and "-lingual" refers to language; a person fluent in two languages is bilingual (many languages = polyglot/multilingual).'
  },
  {
    id: 'sch7_lang_23',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Correct Word Usage – Confusable Words (Accept/Except, Principle/Principal)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Fill in the blanks with the correct pair of words:\n"Our school ________ explained Archimedes’ ________ during the morning science assembly."',
    options: [
      'Principal, principle',
      'Principle, principal',
      'Principal, principal',
      'Principle, principle'
    ],
    correctAnswer: 0,
    explanation: '"Principal" denotes the head of a school/institution (or main sum of money), whereas "principle" denotes a fundamental scientific law or moral rule.'
  },
  {
    id: 'sch7_lang_24',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Orthography / Correct Spelling',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Identify the correctly spelled word from the options given below:',
    options: [
      'Accommodation',
      'Accomodation',
      'Acommodation',
      'Acomodation'
    ],
    correctAnswer: 0,
    explanation: '"Accommodation" has double "c" and double "m" (A-c-c-o-m-m-o-d-a-t-i-o-n).'
  },
  {
    id: 'sch7_lang_25',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Conditional Sentences (Type 2 & Type 3)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Complete the conditional sentence correctly:\n"If you had arrived at the station ten minutes earlier, you ________ the Deccan Queen express."',
    options: [
      'would have caught',
      'will catch',
      'would catch',
      'had caught'
    ],
    correctAnswer: 0,
    explanation: 'In a Type 3 (unfulfilled past) conditional, an "If + Past Perfect (had arrived)" clause takes "would have + Past Participle (would have caught)" in the main clause.'
  },
  {
    id: 'sch7_lang_26',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Word Formation (Noun to Adjective & Verb)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Which option gives the correct Verb form of the noun "COURAGE"?',
    options: ['Encourage', 'Courageous', 'Courageously', 'Couragify'],
    correctAnswer: 0,
    explanation: 'Adding the prefix "en-" to the noun "courage" forms the verb "encourage" ("courageous" is the adjective; "courageously" is the adverb).'
  },
  {
    id: 'sch7_lang_27',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Degrees of Comparison Transformation',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Choose the correct Comparative Degree form of the sentence without changing its meaning:\n"Very few cities in Maharashtra are as cool as Mahabaleshwar."',
    options: [
      'Mahabaleshwar is cooler than most other cities in Maharashtra.',
      'Mahabaleshwar is cooler than any other city in Maharashtra.',
      'No other city in Maharashtra is cooler than Mahabaleshwar.',
      'Mahabaleshwar is the coolest of all cities.'
    ],
    correctAnswer: 0,
    explanation: '"Very few... as [adj] as" (one of the coolest) transforms in the comparative degree to "[Subject] is [comparative] than most other [plural noun]".'
  },
  {
    id: 'sch7_lang_28',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Fill in the Blanks – Prepositions with Fixed Adjectives/Verbs',
    questionType: 'Application-Based',
    difficulty: 'Easy',
    question: 'Fill in the blanks with the correct prepositions:\n"She is exceedingly fond ________ classical music and proficient ________ playing the violin."',
    options: [
      'of, in',
      'for, on',
      'with, at',
      'by, to'
    ],
    correctAnswer: 0,
    explanation: 'The adjective "fond" takes the fixed preposition "of" ("fond of"), and "proficient" takes "in" ("proficient in").'
  },
  {
    id: 'sch7_lang_29',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Vocabulary – Scientific & Literary Branches of Study',
    questionType: 'Match-the-Following',
    difficulty: 'Moderate',
    question: 'Match each branch of study with its subject matter:\n1. Ornithology — (P) Study of coins and medals\n2. Numismatics — (Q) Scientific study of birds\n3. Seismology — (R) Art and science of map-making\n4. Cartography — (S) Scientific study of earthquakes and seismic waves\nSelect the correct code:',
    options: [
      '1-Q, 2-P, 3-S, 4-R',
      '1-P, 2-Q, 3-S, 4-R',
      '1-Q, 2-S, 3-P, 4-R',
      '1-R, 2-P, 3-S, 4-Q'
    ],
    correctAnswer: 0,
    explanation: 'Ornithology studies birds (Dr. Salim Ali); Numismatics studies coins; Seismology studies earthquakes; Cartography is map-making.'
  },
  {
    id: 'sch7_lang_30',
    grade: 'CLASS_7',
    domain: 'LANGUAGE',
    topic: 'Grammar – Identifying Sentence Types (Simple, Compound, Complex)',
    questionType: 'Conceptual',
    difficulty: 'Moderate',
    question: 'Classify the structural type of the following sentence:\n"Although the mountain trail was steep and rocky, the trekkers reached the summit before sunset."',
    options: [
      'Complex Sentence (one main clause and one subordinate adverb clause of concession)',
      'Simple Sentence (only one finite verb)',
      'Compound Sentence joined by a coordinating conjunction',
      'Exclamatory Phrase without a verb'
    ],
    correctAnswer: 0,
    explanation: 'The sentence consists of a subordinate clause ("Although the mountain trail was steep and rocky") and a principal clause ("the trekkers reached the summit before sunset"), making it a Complex Sentence.'
  }
];

// ============================================================================
// CLASS 7 SCHOLARSHIP — SECTION 2: MATHEMATICS (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C7_MATH_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch7_math_01',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Rational Numbers & Density Property',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Which of the following rational numbers lies exactly halfway between 2/5 and 3/4?',
    options: ['23/40', '5/9', '11/20', '19/40'],
    correctAnswer: 0,
    explanation: 'The rational number halfway between a and b is ½(a + b) = ½ × (2/5 + 3/4) = ½ × (8/20 + 15/20) = ½ × (23/20) = 23/40.'
  },
  {
    id: 'sch7_math_02',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – HCF and LCM Word Problem (Bells / Traffic Lights)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Four automatic bells in a school tower toll at intervals of 12, 15, 20, and 30 minutes respectively. If they toll together at 8:00 AM, at what time will they next toll together?',
    options: ['9:00 AM', '9:30 AM', '10:00 AM', '8:45 AM'],
    correctAnswer: 0,
    explanation: 'LCM of 12, 15, 20, and 30 = 60 minutes = 1 hour. Therefore, after 8:00 AM they will toll together again at 9:00 AM.'
  },
  {
    id: 'sch7_math_03',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Laws of Exponents',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Find the numerical value of:\n[(2/3)⁻² × (3/4)⁻¹] ÷ (3/2)',
    options: ['2', '3', '9/4', '4/3'],
    correctAnswer: 0,
    explanation: '(2/3)⁻² = (3/2)² = 9/4. And (3/4)⁻¹ = 4/3. Product in brackets = (9/4) × (4/3) = 3. Dividing by (3/2) gives 3 × (2/3) = 2.'
  },
  {
    id: 'sch7_math_04',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Arithmetic – Simplification of Fractions (BODMAS)',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'Simplify:\n(3½ + 2¼) ÷ (4¾ - 2⅞)',
    options: ['46/15 (or 3 and 1/15)', '23/15', '3', '15/46'],
    correctAnswer: 0,
    explanation: 'First bracket: 7/2 + 9/4 = 23/4. Second bracket: 19/4 - 23/8 = (38 - 23)/8 = 15/8. Quotient = (23/4) ÷ (15/8) = (23/4) × (8/15) = 46/15 = 3 1/15.'
  },
  {
    id: 'sch7_math_05',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Decimals – Multiplication and Division of Decimals',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'If 36 × 48 = 1,728, then what is the value of (17.28 ÷ 0.36) + (1.728 ÷ 0.48)?',
    options: ['51.6', '48.36', '5.16', '84'],
    correctAnswer: 0,
    explanation: '17.28 ÷ 0.36 = 1728 ÷ 36 = 48. And 1.728 ÷ 0.48 = 172.8 ÷ 48 = 3.6. Sum = 48 + 3.6 = 51.6.'
  },
  {
    id: 'sch7_math_06',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Percentage – Successive Percentage & Examination Passing Marks',
    questionType: 'Application-Based',
    difficulty: 'Difficult',
    question: 'In a scholarship mock test, a candidate needs 40% of the maximum marks to qualify. Roshan scores 178 marks and falls short by 22 marks. What are the maximum marks of the examination?',
    options: ['500', '450', '600', '400'],
    correctAnswer: 0,
    explanation: 'Passing marks = 178 + 22 = 200 marks. Since 40% of Maximum Marks (M) = 200 ⇒ (40/100) × M = 200 ⇒ M = 200 × 100 / 40 = 500.'
  },
  {
    id: 'sch7_math_07',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Ratio and Proportion – Mean Proportional & Continued Proportion',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'What is the mean proportional (geometric mean) between 16 and 36?',
    options: ['24', '26', '22', '28'],
    correctAnswer: 0,
    explanation: 'Mean proportional b between a and c satisfies b² = a × c = 16 × 36 ⇒ b = √(16 × 36) = 4 × 6 = 24.'
  },
  {
    id: 'sch7_math_08',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Ratio and Proportion – Mixture Problem',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'An alloy of brass weighing 63 kg contains copper and zinc in the ratio 5 : 2. How much more zinc must be added to this alloy so that the new ratio of copper to zinc becomes 3 : 2?',
    options: ['12 kg', '15 kg', '9 kg', '10 kg'],
    correctAnswer: 0,
    explanation: 'In 63 kg (7 parts): Copper = (5/7)×63 = 45 kg; Zinc = (2/7)×63 = 18 kg. Let x kg zinc be added: 45 / (18 + x) = 3 / 2 ⇒ 18 + x = 30 ⇒ x = 12 kg.'
  },
  {
    id: 'sch7_math_09',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Profit and Loss – Finding Cost Price from Profit/Loss Percentage',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'By selling a bicycle for ₹2,760, a dealer gains 15%. For how much should he sell the bicycle in order to gain 25%?',
    options: ['₹3,000', '₹2,950', '₹3,120', '₹2,880'],
    correctAnswer: 0,
    explanation: 'Cost Price (CP) = 2760 × (100 / 115) = ₹2,400. To gain 25%, required Selling Price = 2400 × (125 / 100) = ₹3,000.'
  },
  {
    id: 'sch7_math_10',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Simple Interest – Principal, Rate & Time',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A sum of ₹8,500 amounts to ₹11,050 in 3 years at simple interest. What is the annual rate of interest?',
    options: ['10% p.a.', '9% p.a.', '12% p.a.', '8.5% p.a.'],
    correctAnswer: 0,
    explanation: 'Simple Interest (SI) = Amount - Principal = 11,050 - 8,500 = ₹2,550. Rate R = (SI × 100) / (P × T) = (2550 × 100) / (8500 × 3) = 2550 / 255 = 10% p.a.'
  },
  {
    id: 'sch7_math_11',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Time and Work – Combined Work Efficiency',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: '15 workers can build a boundary wall in 28 days. How many workers are required to complete the same wall in 21 days?',
    options: ['20 workers', '18 workers', '24 workers', '21 workers'],
    correctAnswer: 0,
    explanation: 'By inverse proportion (M₁ × D₁ = M₂ × D₂): 15 × 28 = M₂ × 21 ⇒ M₂ = (15 × 28) / 21 = 420 / 21 = 20 workers.'
  },
  {
    id: 'sch7_math_12',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Time, Speed and Distance – Average Speed for Round Trip',
    questionType: 'Numerical',
    difficulty: 'Difficult',
    question: 'A cyclist travels from Village A to Town B at a speed of 20 km/h and returns from Town B to Village A along the same road at 30 km/h. What is her average speed for the entire round trip?',
    options: ['24 km/h', '25 km/h', '26 km/h', '22.5 km/h'],
    correctAnswer: 0,
    explanation: 'For equal distances covered at speeds u and v, Average Speed = 2uv / (u + v) = (2 × 20 × 30) / (20 + 30) = 1200 / 50 = 24 km/h.'
  },
  {
    id: 'sch7_math_13',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Complementary and Supplementary Angles',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'An angle is 24° more than its complementary angle. What is the measure of its supplementary angle?',
    options: ['123°', '57°', '147°', '114°'],
    correctAnswer: 0,
    explanation: 'Let the angle be x. Its complement is (90° - x). Given x - (90° - x) = 24° ⇒ 2x = 114° ⇒ x = 57°. Its supplementary angle = 180° - 57° = 123°.'
  },
  {
    id: 'sch7_math_14',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Angles of a Triangle & Isosceles Property',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'In an isosceles triangle ΔABC, AB = AC and the vertical angle ∠A = 44°. What is the measure of each base angle (∠B and ∠C)?',
    options: ['68°', '66°', '72°', '44°'],
    correctAnswer: 0,
    explanation: 'Since AB = AC, ∠B = ∠C. By the angle sum property: 44° + 2∠B = 180° ⇒ 2∠B = 136° ⇒ ∠B = ∠C = 68°.'
  },
  {
    id: 'sch7_math_15',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Pythagoras Theorem Application (Ladder against Wall)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A 17-metre-long ladder reaches a window 15 metres high above the ground on one side of a street. Keeping its foot at the same point, find the horizontal distance of the foot of the ladder from the base of the wall.',
    options: ['8 metres', '10 metres', '12 metres', '6 metres'],
    correctAnswer: 0,
    explanation: 'By Pythagoras’ theorem: Base² + Height² = Hypotenuse² ⇒ Base = √(17² - 15²) = √(289 - 225) = √64 = 8 metres.'
  },
  {
    id: 'sch7_math_16',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Area of a Right Triangle & Parallelogram',
    questionType: 'Numerical',
    difficulty: 'Moderate',
    question: 'A triangle and a parallelogram have the same base of 18 cm and equal areas. If the altitude of the triangle is 14 cm, what is the corresponding altitude of the parallelogram?',
    options: ['7 cm', '14 cm', '28 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'Area of triangle = ½ × 18 × 14 = 126 cm². Since Area of parallelogram = Base × Altitude = 126 ⇒ 18 × h = 126 ⇒ h = 7 cm.'
  },
  {
    id: 'sch7_math_17',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Circumference and Area of a Circle (Wheel Revolutions)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The diameter of a bullock-cart wheel is 1.4 metres. How many complete revolutions will the wheel make in travelling a distance of 2.2 kilometres? (Take π = 22/7)',
    options: ['500 revolutions', '400 revolutions', '550 revolutions', '1,000 revolutions'],
    correctAnswer: 0,
    explanation: 'Circumference = π × d = (22/7) × 1.4 = 4.4 metres. Total distance = 2.2 km = 2,200 metres. Number of revolutions = 2,200 ÷ 4.4 = 500.'
  },
  {
    id: 'sch7_math_18',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Surface Area of a Cuboid Room (Painting Walls)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The internal length, breadth, and height of a classroom are 10 m, 8 m, and 4 m respectively. What is the cost of whitewashing its four walls at the rate of ₹25 per square metre?',
    options: ['₹3,600', '₹4,000', '₹3,200', '₹5,600'],
    correctAnswer: 0,
    explanation: 'Area of four walls (lateral surface area) = 2(l + b) × h = 2(10 + 8) × 4 = 36 × 4 = 144 m². Cost = 144 × ₹25 = ₹3,600.'
  },
  {
    id: 'sch7_math_19',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Algebra – Linear Equations Word Problem',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The length of a rectangular field is 8 metres more than twice its breadth. If the perimeter of the field is 136 metres, what is the length of the field?',
    options: ['48 metres', '40 metres', '20 metres', '52 metres'],
    correctAnswer: 0,
    explanation: 'Let breadth = b, so length l = 2b + 8. Half-perimeter (l + b) = 136 ÷ 2 = 68 ⇒ (2b + 8) + b = 68 ⇒ 3b = 60 ⇒ b = 20 m. Length l = 2(20) + 8 = 48 metres.'
  },
  {
    id: 'sch7_math_20',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mathematical Reasoning – Arithmetic Mean (Average)',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'The average weight of 14 players in a kabaddi team is 45 kg. When the coach’s weight is included, the average weight increases by 2 kg. What is the weight of the coach?',
    options: ['75 kg', '73 kg', '70 kg', '68 kg'],
    correctAnswer: 0,
    explanation: 'Total weight of 14 players = 14 × 45 = 630 kg. New average of 15 persons = 47 kg. Total weight of 15 persons = 15 × 47 = 705 kg. Coach’s weight = 705 - 630 = 75 kg.'
  },
  {
    id: 'sch7_math_21',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Divisibility by 9 and 3',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'What is the smallest digit that should replace * in the number 75*48 so that the resulting five-digit number is divisible by 9?',
    options: ['3', '6', '2', '0'],
    correctAnswer: 0,
    explanation: 'Sum of given digits = 7 + 5 + 4 + 8 = 24. The next multiple of 9 after 24 is 27, so * = 27 - 24 = 3.'
  },
  {
    id: 'sch7_math_22',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Algebra – Multiplication of Binomials & Identities',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'Evaluate 103 × 97 rapidly using an algebraic identity.',
    options: ['9,991', '9,981', '10,009', '9,909'],
    correctAnswer: 0,
    explanation: '103 × 97 = (100 + 3)(100 - 3) = 100² - 3² = 10,000 - 9 = 9,991.'
  },
  {
    id: 'sch7_math_23',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Exterior and Interior Angles of a Quadrilateral',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'The four interior angles of a quadrilateral are in the ratio 2 : 3 : 5 : 8. What is the difference between the largest and the smallest interior angles of this quadrilateral?',
    options: ['120°', '100°', '140°', '80°'],
    correctAnswer: 0,
    explanation: 'Sum of parts = 2 + 3 + 5 + 8 = 18 parts = 360° ⇒ 1 part = 20°. Difference between largest (8 parts) and smallest (2 parts) = 6 parts = 6 × 20° = 120°.'
  },
  {
    id: 'sch7_math_24',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mensuration – Volume of a Cube & Litre Capacity',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'A cubical water tank has an internal edge length of 1.5 metres. How many litres of water can it hold when completely full? (1 m³ = 1,000 litres)',
    options: ['3,375 litres', '2,250 litres', '1,500 litres', '3,750 litres'],
    correctAnswer: 0,
    explanation: 'Volume of cube = (1.5 m)³ = 3.375 m³. Capacity in litres = 3.375 × 1,000 = 3,375 litres.'
  },
  {
    id: 'sch7_math_25',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Word Problems – Fraction of Remaining Journey',
    questionType: 'Application-Based',
    difficulty: 'Difficult',
    question: 'A traveller covers 1/2 of his total journey by train, 1/3 of the total journey by bus, and the remaining 18 km by auto-rickshaw. What is the total length of his journey?',
    options: ['108 km', '90 km', '72 km', '120 km'],
    correctAnswer: 0,
    explanation: 'Fraction covered by train and bus = 1/2 + 1/3 = 5/6. Remaining fraction = 1 - 5/6 = 1/6. Since (1/6) of total journey = 18 km, Total journey = 18 × 6 = 108 km.'
  },
  {
    id: 'sch7_math_26',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Square Roots of Fractions',
    questionType: 'Numerical',
    difficulty: 'Easy',
    question: 'Find the simplified value of: √(1 + 25/144)',
    options: ['13/12', '17/12', '5/12', '15/12'],
    correctAnswer: 0,
    explanation: '√(1 + 25/144) = √((144 + 25)/144) = √(169/144) = 13/12.'
  },
  {
    id: 'sch7_math_27',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Commercial Mathematics – Trade Discount & Cash Rebate',
    questionType: 'Application-Based',
    difficulty: 'Moderate',
    question: 'Under a Khadi Gramodyog festive rebate scheme, a customer receives a 15% rebate on a handloom jacket marked at ₹1,600. How much does the customer pay?',
    options: ['₹1,360', '₹1,440', '₹1,280', '₹1,320'],
    correctAnswer: 0,
    explanation: 'Rebate = 15% of ₹1,600 = (15/100) × 1600 = ₹240. Amount paid = ₹1,600 - ₹240 = ₹1,360.'
  },
  {
    id: 'sch7_math_28',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Geometry – Circle Arc & Semicircle Angle',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'What is the measure of any angle inscribed in a semicircle?',
    options: ['90° (Right angle)', '180° (Straight angle)', '60° (Acute angle)', '120° (Obtuse angle)'],
    correctAnswer: 0,
    explanation: 'By Thales’ Theorem, the angle subtended by a diameter at any point on the circumference (angle in a semicircle) is always 90°.'
  },
  {
    id: 'sch7_math_29',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Mathematical Reasoning – Joint Bar Graph Interpretation',
    questionType: 'Diagram-Based',
    difficulty: 'Easy',
    question: 'In a joint bar graph comparing wheat and jowar production (in quintals) on a vertical scale of 1 cm = 15 quintals, the wheat bar for a farm is 6.2 cm tall and the jowar bar is 4.4 cm tall. What is the difference in production between wheat and jowar?',
    options: ['27 quintals', '25 quintals', '30 quintals', '18 quintals'],
    correctAnswer: 0,
    explanation: 'Difference in bar height = 6.2 - 4.4 = 1.8 cm. Difference in production = 1.8 × 15 = 27 quintals.'
  },
  {
    id: 'sch7_math_30',
    grade: 'CLASS_7',
    domain: 'MATHEMATICS',
    topic: 'Number Systems – Co-Prime (Relatively Prime) Numbers',
    questionType: 'Conceptual',
    difficulty: 'Easy',
    question: 'Which of the following pairs of numbers is a pair of Co-Prime (mutually prime) numbers?',
    options: [
      '(16, 25)',
      '(14, 21)',
      '(15, 27)',
      '(18, 24)'
    ],
    correctAnswer: 0,
    explanation: 'Two numbers are co-prime if their Highest Common Factor (HCF) is 1. Factors of 16 are 1, 2, 4, 8, 16 and factors of 25 are 1, 5, 25; their only common factor is 1.'
  }
];

// ============================================================================
// CLASS 7 SCHOLARSHIP — SECTION 3: INTELLIGENCE & REASONING (30 DISTINCT QUESTIONS)
// ============================================================================
export const SCHOLARSHIP_C7_INTELLIGENCE_POOL: CuratedScholarshipMcq[] = [
  {
    id: 'sch7_int_01',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Number Series – n³ - 1 / n³ + 1 Pattern',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Find the missing term in the number series:\n0, 7, 26, 63, 124, ?, 342',
    options: ['215', '216', '195', '224'],
    correctAnswer: 0,
    explanation: 'Each term follows the pattern (n³ - 1): 1³-1=0, 2³-1=7, 3³-1=26, 4³-1=63, 5³-1=124, 6³-1 = 216 - 1 = 215, 7³-1=342.'
  },
  {
    id: 'sch7_int_02',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Number Series – Alternating Multiplication and Addition',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Identify the next number in the series:\n5, 11, 23, 47, 95, ?',
    options: ['191', '190', '189', '193'],
    correctAnswer: 0,
    explanation: 'Pattern: (Previous term × 2) + 1. Thus 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95, and 95×2+1 = 191.'
  },
  {
    id: 'sch7_int_03',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Alphabet & Alphanumeric Series',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Find the missing term in the alphanumeric series:\nC4X, F9U, I16R, L25O, ?',
    options: ['O36L', 'N36M', 'O49L', 'P36K'],
    correctAnswer: 0,
    explanation: 'First letter advances by +3 (C, F, I, L → O). Middle number is consecutive squares (2²=4, 3²=9, 4²=16, 5²=25 → 6²=36). Last letter steps back by -3 (X, U, R, O → L), giving O36L.'
  },
  {
    id: 'sch7_int_04',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Alphabet Series – Triplet Shift Pattern',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Complete the letter-cluster series:\nBDF, CFI, DHL, ?',
    options: ['EJO', 'EJN', 'FKO', 'EIP'],
    correctAnswer: 0,
    explanation: '1st letters increase by +1 (B, C, D → E); 2nd letters increase by +2 (D, F, H → J); 3rd letters increase by +3 (F, I, L → O). Result: EJO.'
  },
  {
    id: 'sch7_int_05',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Analogy – Scientific & Conceptual Relationship',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Complete the analogy:\nCytology : Cells :: Mycology : ?',
    options: ['Fungi', 'Algae', 'Insects', 'Soils'],
    correctAnswer: 0,
    explanation: 'Cytology is the biological study of cells; Mycology is the study of fungi (Phycology studies algae; Entomology studies insects; Pedology studies soils).'
  },
  {
    id: 'sch7_int_06',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Analogy – Numerical Cube-Plus-Number Relationship',
    questionType: 'Logical-Reasoning',
    difficulty: 'Difficult',
    question: 'Select the number that relates to 6 in the same way as 68 relates to 4:\n4 : 68 :: 6 : ?',
    options: ['222', '216', '210', '228'],
    correctAnswer: 0,
    explanation: 'Rule: n : (n³ + n). For n = 4: 4³ + 4 = 64 + 4 = 68. For n = 6: 6³ + 6 = 216 + 6 = 222.'
  },
  {
    id: 'sch7_int_07',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Classification – Odd Group Out (Science & Geography)',
    questionType: 'Logical-Reasoning',
    difficulty: 'Easy',
    question: 'Three of the following four river systems share a common drainage destination and one is different. Pick the ODD one out:',
    options: ['Narmada', 'Godavari', 'Krishna', 'Mahanadi'],
    correctAnswer: 0,
    explanation: 'Godavari, Krishna, and Mahanadi are east-flowing rivers draining into the Bay of Bengal, whereas Narmada is a west-flowing rift-valley river draining into the Arabian Sea.'
  },
  {
    id: 'sch7_int_08',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Classification – Odd Number Pair Out',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Three of the following four number pairs follow the same mathematical rule and one does not. Identify the ODD pair:',
    options: [
      '(11, 143)',
      '(7, 56)',
      '(9, 90)',
      '(12, 156)'
    ],
    correctAnswer: 0,
    explanation: 'In (7, 56), (9, 90), and (12, 156), the second number is n(n + 1): 7×8=56, 9×10=90, 12×13=156. For 11, 11×12 = 132, whereas 143 = 11×13.'
  },
  {
    id: 'sch7_int_09',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Coding and Decoding – Uniform +2 Cipher',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a certain code language, "GARDEN" is coded as "ICTFGP". How is "SCHOOL" coded in that same language?',
    options: ['UEJQQN', 'TDIPPM', 'UFKQQO', 'UEJQPM'],
    correctAnswer: 0,
    explanation: 'Each letter shifts +2 positions forward in the alphabet: S(+2)=U, C(+2)=E, H(+2)=J, O(+2)=Q, O(+2)=Q, L(+2)=N → UEJQQN.'
  },
  {
    id: 'sch7_int_10',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Coding and Decoding – Alphabet Position Value Formula',
    questionType: 'Logical-Reasoning',
    difficulty: 'Difficult',
    question: 'In a code language, if A = 1, CAT = 48, and DOG = 52, then what is the code number for "SUN"?',
    options: ['108', '54', '96', '112'],
    correctAnswer: 0,
    explanation: 'Sum of alphabet positions for CAT = 3 + 1 + 20 = 24, doubled (×2) = 48. For DOG = 4 + 15 + 7 = 26, doubled (×2) = 52. For SUN = 19 + 21 + 14 = 54, doubled (×2) = 108.'
  },
  {
    id: 'sch7_int_11',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Direction Sense Test – Pythagorean Shortest Distance',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Atharva cycles 9 km due South from his school, then turns left and cycles 12 km due East to reach the district library. What is the shortest straight-line distance from his school to the library, and in which direction is the library from his school?',
    options: [
      '15 km, South-East',
      '21 km, South-East',
      '15 km, North-West',
      '13 km, South-West'
    ],
    correctAnswer: 0,
    explanation: 'By Pythagoras’ theorem, shortest distance = √(9² + 12²) = √(81 + 144) = √225 = 15 km. Moving South and then East places the library to the South-East of the school.'
  },
  {
    id: 'sch7_int_12',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Direction Sense Test – Morning Sun Shadow Reasoning',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'One morning just after sunrise, Vedant and Omkar were standing face-to-face talking at a crossroads. If Omkar’s shadow fell exactly to the right of Vedant, in which direction was Vedant facing?',
    options: ['South', 'North', 'East', 'West'],
    correctAnswer: 0,
    explanation: 'In the morning, the Sun is in the East, so all shadows fall toward the West. Since the shadow (West) is to Vedant’s right, Vedant must be facing South (when facing South, West is on the right).'
  },
  {
    id: 'sch7_int_13',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Blood Relations – Coded / Multi-Step Family Puzzle',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Introducing a lady on stage, Devendra said, "Her mother is the only daughter of my mother-in-law." How is Devendra related to that lady?',
    options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
    correctAnswer: 0,
    explanation: '"The only daughter of my mother-in-law" is Devendra’s wife. Since the lady’s mother is Devendra’s wife, Devendra is the lady’s father.'
  },
  {
    id: 'sch7_int_14',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Blood Relations – Symbol Code',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'If "P + Q" means P is the brother of Q, "P × Q" means P is the mother of Q, and "P - Q" means P is the sister of Q, then in the expression "A + B × C - D", how is A related to C?',
    options: [
      'Maternal Uncle (Mama)',
      'Paternal Grandfather',
      'Brother',
      'Father'
    ],
    correctAnswer: 0,
    explanation: 'A + B means A is the brother of B; B × C means B is the mother of C. Therefore, A is the brother of C’s mother—that is, C’s Maternal Uncle.'
  },
  {
    id: 'sch7_int_15',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Ranking & Position Interchange in a Row',
    questionType: 'Logical-Reasoning',
    difficulty: 'Difficult',
    question: 'In a row of girls facing North, Sai is 12th from the left end and Gargi is 17th from the right end. When they interchange their positions, Sai becomes 21st from the left end. How many girls are there in the row in total?',
    options: ['37', '36', '38', '35'],
    correctAnswer: 0,
    explanation: 'After interchanging, Sai occupies Gargi’s original seat, which is 21st from the left and 17th from the right. Total girls = (21 + 17) - 1 = 37.'
  },
  {
    id: 'sch7_int_16',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Missing Numbers – 3×3 Matrix / Circle Puzzle',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Find the missing number (?) in the third row of the number matrix:\nRow 1:  6  |  8  |  52\nRow 2:  9  |  5  |  49\nRow 3:  7  | 11  |   ?',
    options: ['81', '77', '85', '79'],
    correctAnswer: 0,
    explanation: 'Rule in each row: (First number × Second number) + 4 = Third number. Row 1: 6×8+4 = 52. Row 2: 9×5+4 = 49. Row 3: 7×11+4 = 77 + 4 = 81.'
  },
  {
    id: 'sch7_int_17',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Pattern Recognition – Cyclic Letter Group Series',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Fill in the four blanks (_) sequentially to complete the cyclic letter pattern:\np q _ r p _ r r _ q r _',
    options: [
      'r, q, p, r',
      'q, r, p, q',
      'r, p, q, r',
      'p, q, r, r'
    ],
    correctAnswer: 0,
    explanation: 'The 4-letter block "p q r r" repeats three times: (p q [r] r) (p [q] r r) ([p] q r [r]). Thus the missing letters are r, q, p, r.'
  },
  {
    id: 'sch7_int_18',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Counting Squares in a 3×3 Grid',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'How many squares of ALL possible sizes are present in a standard 3 × 3 square grid (like a tic-tac-toe board enclosed in a square border)?',
    options: ['14 squares', '9 squares', '13 squares', '15 squares'],
    correctAnswer: 0,
    explanation: 'In an n × n square grid, total squares = 1² + 2² + ... + n². For n = 3: 1² + 2² + 3² = 1 + 4 + 9 = 14 squares.'
  },
  {
    id: 'sch7_int_19',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Counting Triangles in a Divided Triangle',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'In ΔABC, three straight line segments are drawn from the top vertex A to the base BC, dividing the base BC into 4 adjacent small segments. How many triangles in total are formed in the entire figure?',
    options: ['10 triangles', '8 triangles', '12 triangles', '6 triangles'],
    correctAnswer: 0,
    explanation: 'When a triangle’s base is divided into k parts by lines from the opposite vertex, total triangles = 1 + 2 + ... + k = k(k + 1)/2. For k = 4: 1 + 2 + 3 + 4 = 10 triangles.'
  },
  {
    id: 'sch7_int_20',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Painted Cube Cutting Puzzle',
    questionType: 'Diagram-Based',
    difficulty: 'Difficult',
    question: 'A solid wooden cube of edge 4 cm is painted red on all six outer faces and then cut into 64 small unit cubes of edge 1 cm each. How many of the small 1 cm cubes have EXACTLY TWO faces painted red?',
    options: ['24 cubes', '16 cubes', '8 cubes', '32 cubes'],
    correctAnswer: 0,
    explanation: 'For an n × n × n cube (here n = 4), cubes with exactly 2 faces painted lie along the 12 edges (excluding corners): 12 × (n - 2) = 12 × (4 - 2) = 24 cubes.'
  },
  {
    id: 'sch7_int_21',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Clock Mirror Time',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'A wall clock having only hour and minute marks (without numbers) shows the time as 8:20 when seen in a plane mirror. What is the actual real time on the clock?',
    options: ['3:40', '4:40', '3:20', '4:20'],
    correctAnswer: 0,
    explanation: 'To find the real time from a mirror image of a 12-hour clock, subtract the given time from 11:60: 11:60 - 8:20 = 3:40.'
  },
  {
    id: 'sch7_int_22',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Angle Between Clock Hands',
    questionType: 'Numerical',
    difficulty: 'Difficult',
    question: 'What is the acute angle formed between the hour hand and the minute hand of an analogue clock at 4:20 PM?',
    options: ['10°', '0°', '15°', '20°'],
    correctAnswer: 0,
    explanation: 'Using the formula |30H - 5.5M|: at H = 4, M = 20, Angle = |30(4) - 5.5(20)| = |120 - 110| = 10° (at 4:20, the minute hand is at 4, while the hour hand has advanced 1/3 of 30° = 10° past 4).'
  },
  {
    id: 'sch7_int_23',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Syllogism & Deductive Conclusion',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Read the two statements and decide which conclusions logically follow:\nStatements:\n1. All planets are celestial bodies.\n2. Mars is a planet.\nConclusions:\n(I) Mars is a celestial body.\n(II) All celestial bodies are planets.',
    options: [
      'Only Conclusion (I) logically follows',
      'Only Conclusion (II) logically follows',
      'Both Conclusions (I) and (II) follow',
      'Neither Conclusion (I) nor (II) follows'
    ],
    correctAnswer: 0,
    explanation: 'Since Mars ∈ Planets and Planets ⊂ Celestial Bodies, Mars is necessarily a celestial body (I). However, stars and moons are also celestial bodies, so (II) does not follow.'
  },
  {
    id: 'sch7_int_24',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Venn Diagram Set Intersection',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a class of 50 students, 32 play Cricket, 25 play Football, and every student plays at least one of the two games. How many students play BOTH Cricket and Football?',
    options: ['7 students', '12 students', '18 students', '10 students'],
    correctAnswer: 0,
    explanation: 'By the inclusion-exclusion principle: n(C ∩ F) = n(C) + n(F) - n(C ∪ F) = 32 + 25 - 50 = 57 - 50 = 7 students.'
  },
  {
    id: 'sch7_int_25',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Artificial Language Word Decoding',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a certain code language:\n• "mitra sona rupa" means "bright golden morning"\n• "rupa kiran tara" means "morning sun rays"\n• "sona hira moti" means "golden diamond pearl"\nWhich code word stands for "bright" in that language?',
    options: ['mitra', 'sona', 'rupa', 'kiran'],
    correctAnswer: 0,
    explanation: 'Comparing statements 1 and 2, "morning" = "rupa". Comparing statements 1 and 3, "golden" = "sona". Therefore, the remaining word in statement 1, "bright", corresponds to "mitra".'
  },
  {
    id: 'sch7_int_26',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Figure-Based Reasoning – Paper Folding & Punching Symmetry',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'A square sheet of paper is folded in half vertically from right to left, and then folded in half horizontally from top to bottom (forming a 4-layered quarter-square). If 1 circular hole is punched right in the middle of this folded quarter-square, how many circular holes will be seen when the sheet is completely unfolded?',
    options: ['4 holes arranged symmetrically in the four quadrants', '2 holes', '1 hole in the centre', '8 holes'],
    correctAnswer: 0,
    explanation: 'Two perpendicular half-folds create 2 × 2 = 4 layers of paper. A single punch through all 4 layers produces 4 symmetrical holes, one in each quadrant.'
  },
  {
    id: 'sch7_int_27',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Seating Arrangement Around a Circle',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'Six friends (A, B, C, D, E, and F) are sitting in a circle facing the centre. A is sitting directly opposite D. B is to the immediate right of D and immediate left of C. E is to the immediate right of A. Who is sitting directly opposite B?',
    options: ['E', 'C', 'F', 'A'],
    correctAnswer: 0,
    explanation: 'Placing D at 6 o’clock and A opposite at 12 o’clock (facing centre): immediate right of D is 7 o’clock? Wait: facing centre from 6 o’clock, right hand is toward 3 o’clock (B at 4 o’clock, C at 2 o’clock). From A at 12 o’clock facing centre, immediate right is toward 9 o’clock (E at 10 o’clock, F at 8 o’clock). Thus E (10 o’clock) is directly opposite B (4 o’clock)!'
  },
  {
    id: 'sch7_int_28',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Standard Dice Opposite Faces',
    questionType: 'Diagram-Based',
    difficulty: 'Moderate',
    question: 'Two positions of the same six-faced die (numbered 1 to 6) are shown:\nPosition 1 shows faces: 3, 2, 5.\nPosition 2 shows faces: 3, 4, 1.\nWhich number lies on the face directly OPPOSITE to the face showing 3?',
    options: ['6', '2', '4', '5'],
    correctAnswer: 0,
    explanation: 'From the two views, face 3 is adjacent to 2 and 5 (Position 1) and also adjacent to 4 and 1 (Position 2). Since 3 is adjacent to 1, 2, 4, and 5, the only remaining face, 6, must be opposite 3.'
  },
  {
    id: 'sch7_int_29',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning –Heads and Legs Equation Puzzle',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'In a farm enclosure containing only peacocks (2 legs each) and deer (4 legs each), the total number of heads is 30 and the total number of legs is 84. How many deer are there in the enclosure?',
    options: ['12 deer', '18 deer', '15 deer', '14 deer'],
    correctAnswer: 0,
    explanation: 'If all 30 animals were peacocks (2 legs), there would be 60 legs. The extra 84 - 60 = 24 legs belong to the deer (2 extra legs per deer). Thus number of deer = 24 ÷ 2 = 12 deer (and 18 peacocks).'
  },
  {
    id: 'sch7_int_30',
    grade: 'CLASS_7',
    domain: 'INTELLIGENCE',
    topic: 'Logical Reasoning – Calendar Leap Year Repetition',
    questionType: 'Logical-Reasoning',
    difficulty: 'Moderate',
    question: 'If 15th August 2023 fell on a Tuesday, on which day of the week did 15th August 2024 fall?',
    options: ['Thursday', 'Wednesday', 'Friday', 'Monday'],
    correctAnswer: 0,
    explanation: 'Since 2024 is a leap year and the period from 15th August 2023 to 15th August 2024 includes 29th February 2024 (366 days = 52 weeks + 2 odd days), the day of the week advances by 2 days: Tuesday + 2 = Thursday.'
  }
];
