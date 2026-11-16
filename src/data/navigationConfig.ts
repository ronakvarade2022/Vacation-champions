import { EducationBoard, SpecialLearningSectionId } from '../types';

export type MainMenuId =
  | 'home'
  | 'courses'
  | 'special-learning'
  | 'study-material'
  | 'practice-zone'
  | 'exam-zone'
  | 'performance'
  | 'plans'
  | 'account';

export type NavSubActionId =
  // SECTION 1: HOME
  | 'home-overview'
  | 'home-how-it-works'
  | 'home-why-choose-us'
  // SECTION 2: COURSES
  | 'course-all'
  | 'course-maharashtra'
  | 'course-cbse'
  | 'course-icse'
  // SECTION 3: SPECIAL LEARNING
  | 'sl-drawing'
  | 'sl-stories'
  | 'sl-shivaji'
  | 'sl-moral'
  | 'sl-scholarship'
  | 'sl-gk'
  | 'sl-ai-academy'
  | 'sl-creative'
  | 'sl-programs'
  // SECTION 4: STUDY MATERIAL
  | 'sm-notes'
  | 'sm-worksheets'
  | 'sm-summaries'
  | 'sm-pdfs'
  | 'sm-question-banks'
  | 'sm-guides'
  | 'sm-important-questions'
  | 'sm-textbook-learning'
  // SECTION 5: PRACTICE ZONE
  | 'pz-maths'
  | 'pz-english'
  | 'pz-science'
  | 'pz-reasoning'
  | 'pz-puzzles'
  | 'pz-sudoku'
  | 'pz-vocabulary'
  | 'pz-memory'
  | 'pz-mcq'
  | 'pz-chapter'
  | 'pz-worksheets'
  | 'pz-daily'
  // SECTION 6: EXAM ZONE
  | 'ez-chapter-tests'
  | 'ez-subject-tests'
  | 'ez-full-syllabus'
  | 'ez-mock-tests'
  | 'ez-competitive'
  | 'ez-timed'
  | 'ez-model-papers'
  | 'ez-exam-practice'
  // SECTION 7: PERFORMANCE
  | 'perf-results'
  | 'perf-marks'
  | 'perf-tracking'
  | 'perf-certificates'
  | 'perf-analysis'
  // SECTION 8: PLANS & PRICING
  | 'plan-free'
  | 'plan-maharashtra'
  | 'plan-cbse'
  | 'plan-icse'
  | 'plan-special'
  | 'plan-purchased'
  // SECTION 9: MY ACCOUNT
  | 'acc-profile'
  | 'acc-purchases'
  | 'acc-classes'
  | 'acc-referrals'
  | 'acc-settings'
  | 'acc-support'
  | 'acc-login'
  | 'acc-register'
  | 'acc-subscription';

export interface NavSubItemConfig {
  id: NavSubActionId;
  label: string;
  description: string;
  boardFilter?: EducationBoard;
  badgeText?: string;
  sectionVisibilityKey?: SpecialLearningSectionId;
}

export interface NavMenuGroupConfig {
  id: MainMenuId;
  label: string;
  defaultActionId: NavSubActionId;
  highlight?: boolean;
  whatIsThis: string;
  whatCanILearn: string;
  whatShouldIClick: string;
  items: NavSubItemConfig[];
}

export const MAIN_NAV_MENUS: NavMenuGroupConfig[] = [
  {
    id: 'home',
    label: 'Home',
    defaultActionId: 'home-overview',
    whatIsThis: 'Your main MyStudyZone learning dashboard and starting point.',
    whatCanILearn: 'See all 8 learning sections, today’s quiz challenge, your progress, and announcements.',
    whatShouldIClick: 'Click any Main Category Card below to jump straight to that section.',
    items: [
      {
        id: 'home-overview',
        label: 'Home Dashboard',
        description: 'Welcome banner, main learning categories, daily challenge & progress summary',
        badgeText: 'Start Here',
      },
      {
        id: 'home-how-it-works',
        label: 'Popular Programmes',
        description: 'Direct shortcuts to Scholarship, Shivaji Stories, Drawing & AI Academy',
      },
      {
        id: 'home-why-choose-us',
        label: 'Announcements & Quick Access',
        description: 'Important student updates, certificates, leaderboard & help desk',
      },
    ],
  },
  {
    id: 'courses',
    label: 'Courses',
    defaultActionId: 'course-all',
    whatIsThis: 'Structured class-wise and subject-wise school programmes for Classes 1 to 10.',
    whatCanILearn: 'Maharashtra State Board, CBSE (NCERT), and ICSE (CISCE) subjects and chapter lessons.',
    whatShouldIClick: 'Select your Education Board first, choose your Class (1–10), then click a Subject.',
    items: [
      {
        id: 'course-all',
        label: 'All Courses Directory (Classes 1–10)',
        description: 'Structured subject-wise courses & chapter lessons across all 3 boards',
        badgeText: 'Classes 1–10',
        sectionVisibilityKey: 'all_courses',
      },
      {
        id: 'course-maharashtra',
        label: 'Maharashtra State Board',
        description: 'Classes 1 to 10 SSC & Balbharati subject-wise courses & lessons',
        boardFilter: 'Maharashtra',
        badgeText: 'State Board',
      },
      {
        id: 'course-cbse',
        label: 'CBSE Board (NCERT)',
        description: 'Classes 1 to 10 NCERT & NCF-SE subject-wise courses & lessons',
        boardFilter: 'CBSE',
        badgeText: 'NCERT',
      },
      {
        id: 'course-icse',
        label: 'ICSE Board (CISCE)',
        description: 'Classes 1 to 10 CISCE curriculum with dedicated science & humanities courses',
        boardFilter: 'ICSE',
        badgeText: 'CISCE',
      },
    ],
  },
  {
    id: 'special-learning',
    label: '🎓 Special Learning',
    defaultActionId: 'sl-programs',
    highlight: true,
    whatIsThis: 'Enrichment, historical stories, art, scholarship, and future-skills studios.',
    whatCanILearn: 'Drawing, Audio Stories, Chhatrapati Shivaji Maharaj History, Scholarship, Cricket GK & AI.',
    whatShouldIClick: 'Click any of the 8 Special Learning cards to open its dedicated studio page.',
    items: [
      {
        id: 'sl-drawing',
        label: 'Drawing Studio',
        description: '120+ colouring templates, digital paint canvas & saved artwork gallery',
        badgeText: 'Art Studio',
        sectionVisibilityKey: 'drawing',
      },
      {
        id: 'sl-stories',
        label: 'Story World',
        description: '45+ English, Hindi & Marathi audio stories with vocabulary & morals',
        badgeText: '45 Stories',
        sectionVisibilityKey: 'stories',
      },
      {
        id: 'sl-shivaji',
        label: 'Shivaji Maharaj Stories',
        description: '50 chronological Swarajya historical chapters with voice narration',
        badgeText: '50 Chapters',
        sectionVisibilityKey: 'shivaji',
      },
      {
        id: 'sl-moral',
        label: 'Moral Stories',
        description: 'Value education, Panchatantra fables & character-building audio tales',
        badgeText: 'Values',
        sectionVisibilityKey: 'stories',
      },
      {
        id: 'sl-scholarship',
        label: 'Scholarship Corner',
        description: 'MSCE Std 4th (PSE) & Std 7th (UPS) Scholarship preparation studio',
        badgeText: 'Std 4 & 7',
        sectionVisibilityKey: 'scholarship',
      },
      {
        id: 'sl-gk',
        label: 'Cricket & GK',
        description: 'Daily Cricket Current Affairs, Records & General Knowledge arena',
        badgeText: 'Daily GK',
        sectionVisibilityKey: 'gk_cricket',
      },
      {
        id: 'sl-ai-academy',
        label: 'AI Learning Academy',
        description: '8 modules & 24 interactive lessons on Artificial Intelligence & Coding',
        badgeText: 'Future Tech',
        sectionVisibilityKey: 'future_skills',
      },
      {
        id: 'sl-creative',
        label: 'Creative Activities',
        description: 'Creative writing prompts, art projects & enrichment workshops',
        badgeText: 'Creative',
        sectionVisibilityKey: 'creative_activities',
      },
    ],
  },
  {
    id: 'study-material',
    label: 'Study Material',
    defaultActionId: 'sm-notes',
    whatIsThis: 'Your educational reference library for reading, revision, and worksheets.',
    whatCanILearn: 'Chapter Notes, Worksheets, Chapter Summaries, Practice PDFs, Question Banks & Study Guides.',
    whatShouldIClick: 'Choose a material type below, then pick your Subject and Chapter to read or solve.',
    items: [
      {
        id: 'sm-notes',
        label: 'Notes',
        description: 'Detailed chapter-wise concept explanations, definitions & key points',
        badgeText: 'Chapter Notes',
      },
      {
        id: 'sm-worksheets',
        label: 'Worksheets',
        description: 'Subject-wise & class-wise reference worksheets with model answers',
        badgeText: 'All Classes',
      },
      {
        id: 'sm-summaries',
        label: 'Chapter Summaries',
        description: 'Quick-revision chapter overviews, formulas & key takeaways',
        badgeText: 'Fast Revision',
      },
      {
        id: 'sm-pdfs',
        label: 'Practice PDFs',
        description: 'Printable chapter revision sheets & structured study handouts',
        badgeText: 'Printable',
      },
      {
        id: 'sm-question-banks',
        label: 'Question Banks',
        description: 'Solved textbook & important board questions with step-by-step answers',
        badgeText: 'Solved Q&A',
      },
      {
        id: 'sm-guides',
        label: 'Study Guides',
        description: 'Subject-wise preparation strategies, marking schemes & study checklists',
        badgeText: 'Exam Tips',
      },
    ],
  },
  {
    id: 'practice-zone',
    label: 'Practice Zone',
    defaultActionId: 'pz-maths',
    whatIsThis: 'Interactive skill-building practice and brain-training games.',
    whatCanILearn: 'Maths, English, Science, Reasoning, Brain Puzzles, Sudoku, Vocabulary & Memory Games.',
    whatShouldIClick: 'Pick any practice activity or logic game below to read instructions and start practising.',
    items: [
      {
        id: 'pz-maths',
        label: 'Maths Practice',
        description: 'Interactive calculation drills, geometry, algebra & word problems',
        badgeText: 'Numbers',
      },
      {
        id: 'pz-english',
        label: 'English Practice',
        description: 'Grammar rules, sentence formation, comprehension & language drills',
        badgeText: 'Grammar',
      },
      {
        id: 'pz-science',
        label: 'Science Practice',
        description: 'Concept checks across Physics, Chemistry, Biology & EVS',
        badgeText: 'STEM',
      },
      {
        id: 'pz-reasoning',
        label: 'Reasoning',
        description: 'Logical thinking, number patterns, coding-decoding & aptitude drills',
        badgeText: 'Logic',
      },
      {
        id: 'pz-puzzles',
        label: 'Brain Puzzles',
        description: '52+ interactive logic riddles, lateral thinking & sequence puzzles',
        badgeText: 'Free Forever',
      },
      {
        id: 'pz-sudoku',
        label: 'Sudoku',
        description: 'Interactive 4×4, 6×6 & 9×9 number grids across Easy, Medium & Hard',
        badgeText: 'Free Forever',
      },
      {
        id: 'pz-vocabulary',
        label: 'Vocabulary',
        description: 'Synonyms, antonyms, idioms, spellings & multilingual word power',
        badgeText: 'Word Power',
      },
      {
        id: 'pz-memory',
        label: 'Memory Games',
        description: 'Visual concentration, pattern recall & memory match challenges',
        badgeText: 'Brain Boost',
      },
    ],
  },
  {
    id: 'exam-zone',
    label: 'Exam Zone',
    defaultActionId: 'ez-chapter-tests',
    whatIsThis: 'Formal timed tests, mock examinations, and competitive assessments.',
    whatCanILearn: 'Check question count, time limit, and difficulty level before taking formal exams.',
    whatShouldIClick: 'Select an examination type below, review the test rules, and click Start Exam.',
    items: [
      {
        id: 'ez-chapter-tests',
        label: 'Chapter Tests',
        description: '10 Questions · 10 Mins · Basic to Advanced chapter evaluation',
        badgeText: '10 Qs · 10m',
      },
      {
        id: 'ez-subject-tests',
        label: 'Subject Tests',
        description: '20 Questions · 20 Mins · Complete subject-level mastery assessment',
        badgeText: '20 Qs · 20m',
      },
      {
        id: 'ez-full-syllabus',
        label: 'Full Syllabus Tests',
        description: '40 Questions · 45 Mins · All-level board pattern full syllabus exam',
        badgeText: '40 Qs · 45m',
      },
      {
        id: 'ez-mock-tests',
        label: 'Scholarship Mock Tests',
        description: '50 Questions · 90 Mins · Official MSCE Std 4th & 7th mock papers',
        badgeText: '50 Qs · 90m',
      },
      {
        id: 'ez-competitive',
        label: 'Competitive Exams',
        description: '25 Questions · 25 Mins · Olympiad, HOTS & assertion-reasoning',
        badgeText: '25 Qs · 25m',
      },
      {
        id: 'ez-timed',
        label: 'Timed Assessments',
        description: '15 Questions · 15 Mins · Rapid speed & accuracy challenge',
        badgeText: '15 Qs · 15m',
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    defaultActionId: 'perf-results',
    whatIsThis: 'Your private personal report card, accuracy tracker, and certificate vault.',
    whatCanILearn: 'View your test results, marks, accuracy %, completed courses, certificates & badges.',
    whatShouldIClick: 'Review your subject mastery chart or download your unlocked Champion Certificates.',
    items: [
      {
        id: 'perf-results',
        label: 'Test Results & Marks',
        description: 'Personal scorecard, marks obtained & question-by-question accuracy',
        badgeText: 'My Marks',
      },
      {
        id: 'perf-tracking',
        label: 'Learning Progress & Courses',
        description: 'Subject mastery across Levels 1–4, completed worksheets & streaks',
        badgeText: 'Progress',
      },
      {
        id: 'perf-certificates',
        label: 'Certificates & Achievements',
        description: 'Official downloadable Champion Certificates, badges & hall of fame',
        badgeText: 'Certificates',
      },
      {
        id: 'perf-analysis',
        label: '30-Day Mastery Analysis',
        description: 'Visual subject improvement graphs & strong/weak topic insights',
        badgeText: 'Analytics',
      },
    ],
  },
  {
    id: 'plans',
    label: 'Plans & Pricing',
    defaultActionId: 'plan-maharashtra',
    whatIsThis: 'Transparent subscription plans and active course purchase status.',
    whatCanILearn: 'Compare Free Forever programmes vs. ₹99 / 365-Day full board & class activation.',
    whatShouldIClick: 'Choose your Board & Class below to unlock 365 days of full access for ₹99.',
    items: [
      {
        id: 'plan-free',
        label: 'Free Learning Programmes',
        description: '₹0 Forever · Demo Quizzes, Sample Worksheets, Sudoku & Brain Puzzles',
        badgeText: '₹0 Free',
      },
      {
        id: 'plan-maharashtra',
        label: 'Maharashtra Board Plans',
        description: '₹99 One-Time · 365 Days Full Class Access (Classes 1 to 10)',
        boardFilter: 'Maharashtra',
        badgeText: '₹99 / 365d',
      },
      {
        id: 'plan-cbse',
        label: 'CBSE Board Plans',
        description: '₹99 One-Time · 365 Days Full NCERT Class Access (Classes 1 to 10)',
        boardFilter: 'CBSE',
        badgeText: '₹99 / 365d',
      },
      {
        id: 'plan-icse',
        label: 'ICSE Board Plans',
        description: '₹99 One-Time · 365 Days Full CISCE Class Access (Classes 1 to 10)',
        boardFilter: 'ICSE',
        badgeText: '₹99 / 365d',
      },
      {
        id: 'plan-special',
        label: 'Special Programmes Access',
        description: 'Included automatically with any ₹99 Class Activation',
        badgeText: 'Included',
      },
      {
        id: 'plan-purchased',
        label: 'Purchased Content',
        description: 'View your active 365-day board/class unlocks & validity dates',
        badgeText: 'My Active Plans',
      },
    ],
  },
  {
    id: 'account',
    label: 'My Account',
    defaultActionId: 'acc-profile',
    whatIsThis: 'Your personal student profile, purchased courses, settings, and help desk.',
    whatCanILearn: 'Manage your personal info, active boards/classes, password, and support tickets.',
    whatShouldIClick: 'Sign in, update your profile details, switch unlocked classes, or contact support.',
    items: [
      {
        id: 'acc-profile',
        label: 'Student Profile & Personal Info',
        description: 'View or edit your name, avatar, mobile number, email & UID',
        badgeText: 'Profile',
      },
      {
        id: 'acc-purchases',
        label: 'My Purchases & Subscriptions',
        description: 'Verified ₹99 payment receipts, activation dates & 365-day expiry',
        badgeText: 'Receipts',
      },
      {
        id: 'acc-classes',
        label: 'My Courses & Classes',
        description: 'Switch between your unlocked Boards & Classes (1 to 10)',
        badgeText: 'Switch Class',
      },
      {
        id: 'acc-settings',
        label: 'Account Settings & Password',
        description: 'Password management & single-device security',
        badgeText: 'Security',
      },
      {
        id: 'acc-support',
        label: 'Help & Support',
        description: 'Student help desk, FAQs, grievance redressal & contact support',
        badgeText: '24×7 Help',
      },
    ],
  },
];
