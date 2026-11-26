export interface ParentingGuideItem {
  id: string;
  stage: 'All Ages (Classes 1–10)' | 'Early Primary (Classes 1–4)' | 'Middle Years (Classes 5–7)' | 'Board Prep (Classes 8–10)';
  category: 'Study Routines' | 'Emotional & Exam Wellness' | 'Home Learning Activities' | 'Digital Safety';
  title: string;
  summary: string;
  keyPrinciples: string[];
  actionableChecklist: string[];
  weeklyHomeActivity: {
    activityName: string;
    durationMinutes: number;
    materials: string;
    steps: string[];
  };
}

export const PARENT_LEARNING_MATERIALS: ParentingGuideItem[] = [
  {
    id: 'pg-study-routine',
    stage: 'All Ages (Classes 1–10)',
    category: 'Study Routines',
    title: 'Building a Calm, Zero-Nagging Daily Study Routine',
    summary:
      'Replace repetitive evening arguments over homework with predictable visual study blocks, short hydration breaks, and clear wind-down transitions.',
    keyPrinciples: [
      'Consistency beats marathon cramming: fixed start times reduce daily decision fatigue and resistance.',
      'Start with a 15-minute warm-up task your child can finish independently before tackling harder subjects.',
      'Use timer-bounded focus blocks (20 mins for Classes 1–4; 35 mins for Classes 5–10) with 5-minute stretch breaks.',
    ],
    actionableChecklist: [
      'Keep a quiet, clutter-free study surface with pens, water bottle, and timetable already ready.',
      'Review tomorrow\'s school bag at 8:30 PM rather than rushing at 7:00 AM.',
      'Praise effort and consistency ("You stayed focused 25 minutes") rather than only marks.',
    ],
    weeklyHomeActivity: {
      activityName: 'Sunday 10-Minute Family Weekly Preview',
      durationMinutes: 10,
      materials: 'One notebook page & two coloured pens',
      steps: [
        'Sit together Sunday at 6 PM and mark upcoming unit tests, school events, and homework deadlines.',
        'Let your child pick which two days are best for revision vs fun skill activities (Drawing / Chess / Stories).',
      ],
    },
  },
  {
    id: 'pg-early-reading-maths',
    stage: 'Early Primary (Classes 1–4)',
    category: 'Home Learning Activities',
    title: 'Playful Reading Fluency & Everyday Number Sense at Home',
    summary:
      'Strengthen early phonics, vocabulary, and mental arithmetic effortlessly through kitchen measurements, grocery totals, and shared bedtime reading.',
    keyPrinciples: [
      'Read aloud together for 12–15 minutes daily; let your child read alternating lines or act out dialogue voices.',
      'Connect numbers to real coins, clock faces, fruits, and steps rather than rote memorization alone.',
      'Wait 5 full seconds before supplying a hard word so your child practices phonics decoding.',
    ],
    actionableChecklist: [
      'Ask open prompts after stories: "Why do you think the character made that choice?"',
      'Practice skip-counting by 2s, 5s, and 10s while climbing stairs or folding laundry.',
      'Keep a small jar for 3 "New Words of the Week" learned from stories.',
    ],
    weeklyHomeActivity: {
      activityName: 'Kitchen Coin & Measurement Market',
      durationMinutes: 20,
      materials: '5 pantry packets (with price/weight labels) and spare coins/notes',
      steps: [
        'Set prices ₹12, ₹25, ₹38, ₹45 on kitchen items.',
        'Give your child a ₹100 budget to buy 2 items and calculate exact change aloud.',
      ],
    },
  },
  {
    id: 'pg-middle-bridge',
    stage: 'Middle Years (Classes 5–7)',
    category: 'Study Routines',
    title: 'Transitioning from Guided Help to Independent Note-Taking',
    summary:
      'Classes 5–7 bridge simple recall into multi-chapter Science, Algebra foundations, and History timelines. Help children organize notes instead of doing homework for them.',
    keyPrinciples: [
      'Shift your role from "Homework Checker" to "Study Coach": ask "Show me what you tried first" when stuck.',
      'Encourage 2-column Cornell or Keyword-Summary notebooks rather than verbatim textbook copying.',
      'Use MyStudyZone\'s "Complete Your Class Notes" module together to review answers step by step.',
    ],
    actionableChecklist: [
      'Encourage your child to teach a new Science diagram back to you in 2 minutes.',
      'Check notebook neatness and completeness once weekly on Saturdays rather than micromanaging hourly.',
      'Introduce 1 skill program (Abacus / Vedic Maths / Logical Reasoning) for confidence beyond textbooks.',
    ],
    weeklyHomeActivity: {
      activityName: 'The 3-Minute Parent-Student Reverse Classroom',
      durationMinutes: 15,
      materials: 'Science or History textbook diagram',
      steps: [
        'Your child becomes the teacher for 3 minutes and explains one textbook topic using rough paper sketches.',
        'Ask two curious questions ("What happens if...?") to cement genuine understanding.',
      ],
    },
  },
  {
    id: 'pg-board-exam-calm',
    stage: 'Board Prep (Classes 8–10)',
    category: 'Emotional & Exam Wellness',
    title: 'Managing Board Exam Stress, Sleep & Error-Log Mastery',
    summary:
      'High-stakes Classes 8–10 require calm emotional buffering at home, structured Mistake Logs, full sleep cycles, and balanced comparison-free encouragement.',
    keyPrinciples: [
      'Protect 8 hours of sleep even before exams—sleep consolidates formulas and prevents silly sign errors.',
      'Replace score-comparison with Mistake Analysis ("Which 2 chapter types cost most marks?").',
      'Maintain regular meals, light evening walks, and calm Bhramari breathing before mock papers.',
    ],
    actionableChecklist: [
      'Avoid comparing marks with cousins or classmates; track only personal growth across practice papers.',
      'Ensure your teen solves at least 1 timed Board Model Paper weekly without notes.',
      'Remind your child aloud: marks guide subject feedback, never personal worth.',
    ],
    weeklyHomeActivity: {
      activityName: 'Calm Error-Log Coffee/Tea Review',
      durationMinutes: 15,
      materials: 'Latest scored test paper & 1 Error-Log notebook page',
      steps: [
        'Sort missed questions into 3 buckets: (1) Silly sign/reading slip (2) Forgot formula (3) Unclear concept.',
        'Pick ONLY the top 2 concepts for light review over the next 4 days.',
      ],
    },
  },
  {
    id: 'pg-digital-safety',
    stage: 'All Ages (Classes 1–10)',
    category: 'Digital Safety',
    title: 'Healthy Screen Boundaries & Safe Educational Technology Use',
    summary:
      'Ensure tablets, phones, and Smart TVs stay productive learning tools without late-night fatigue, unsafe links, or distraction spirals.',
    keyPrinciples: [
      'Keep shared learning devices in common living rooms rather than closed bedrooms at night.',
      'Separate purposeful study screen time (worksheets, quizzes, Smart TV lessons) from passive scrolling.',
      'Teach children never to share school IDs, OTPs, phone numbers, or addresses online.',
    ],
    actionableChecklist: [
      'Enforce a 45-minute digital sunset before bedtime for deep restorative sleep.',
      'Practice the 20-20-20 eye relaxation rule during online quizzes.',
      'Review browser bookmarks and keep MyStudyZone pinned on Home Screen for direct safe launch.',
    ],
    weeklyHomeActivity: {
      activityName: 'Device-Free Family Board Game or Puzzle Hour',
      durationMinutes: 30,
      materials: 'Chess board, Rubik\'s Cube, or paper logic riddles',
      steps: [
        'Keep all phones parked in another room for 30 minutes.',
        'Play one round of chess, word-chain, or mental maths relay together.',
      ],
    },
  },
];
