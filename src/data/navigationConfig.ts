import { EducationBoard } from '../types';

export type MainMenuId =
  | 'home'
  | 'courses'
  | 'study-material'
  | 'practice-zone'
  | 'exam-zone'
  | 'performance'
  | 'plans'
  | 'account';

export type NavSubActionId =
  // HOME
  | 'home-overview'
  | 'home-how-it-works'
  | 'home-why-choose-us'
  // COURSES
  | 'course-maharashtra'
  | 'course-cbse'
  | 'course-icse'
  // STUDY MATERIAL
  | 'sm-notes'
  | 'sm-important-questions'
  | 'sm-textbook-learning'
  | 'sm-question-banks'
  // PRACTICE ZONE
  | 'pz-mcq'
  | 'pz-chapter'
  | 'pz-worksheets'
  | 'pz-daily'
  // EXAM ZONE
  | 'ez-mock-tests'
  | 'ez-model-papers'
  | 'ez-chapter-tests'
  | 'ez-exam-practice'
  // PERFORMANCE
  | 'perf-tracking'
  | 'perf-results'
  | 'perf-analysis'
  // PLANS & PRICING
  | 'plan-maharashtra'
  | 'plan-cbse'
  | 'plan-icse'
  // MY ACCOUNT
  | 'acc-login'
  | 'acc-register'
  | 'acc-classes'
  | 'acc-subscription';

export interface NavSubItemConfig {
  id: NavSubActionId;
  label: string;
  description: string;
  boardFilter?: EducationBoard;
  badgeText?: string;
}

export interface NavMenuGroupConfig {
  id: MainMenuId;
  label: string;
  defaultActionId: NavSubActionId;
  items: NavSubItemConfig[];
}

export const MAIN_NAV_MENUS: NavMenuGroupConfig[] = [
  {
    id: 'home',
    label: 'Home',
    defaultActionId: 'home-overview',
    items: [
      {
        id: 'home-overview',
        label: 'Overview',
        description: 'Platform overview, boards, classes 1st–10th & learning tools',
      },
      {
        id: 'home-how-it-works',
        label: 'How It Works',
        description: 'Step-by-step guide from free demo to 365-day activation',
      },
      {
        id: 'home-why-choose-us',
        label: 'Why Choose Us',
        description: 'Zero-repetition engine, isolated boards & single-device safety',
      },
    ],
  },
  {
    id: 'courses',
    label: 'Courses',
    defaultActionId: 'course-maharashtra',
    items: [
      {
        id: 'course-maharashtra',
        label: 'Maharashtra State Board',
        description: 'Classes 1–10 SSC & Balbharati subjects + MSCE Scholarship',
        boardFilter: 'Maharashtra',
        badgeText: 'Classes 1–10',
      },
      {
        id: 'course-cbse',
        label: 'CBSE',
        description: 'Classes 1–10 NCERT & NCF-SE syllabus with competency focus',
        boardFilter: 'CBSE',
        badgeText: 'NCERT',
      },
      {
        id: 'course-icse',
        label: 'ICSE',
        description: 'Classes 1–10 CISCE curriculum with split Physics/Chem/Bio',
        boardFilter: 'ICSE',
        badgeText: 'CISCE',
      },
    ],
  },
  {
    id: 'study-material',
    label: 'Study Material',
    defaultActionId: 'sm-notes',
    items: [
      {
        id: 'sm-notes',
        label: 'Chapter-wise Notes',
        description: 'Structured key concepts, definitions & formulas per chapter',
      },
      {
        id: 'sm-important-questions',
        label: 'Important Questions',
        description: 'Solved exam-focused short & analytical practice questions',
      },
      {
        id: 'sm-textbook-learning',
        label: 'Textbook-based Learning',
        description: 'Board-aligned subject & chapter directory for Classes 1–10',
      },
      {
        id: 'sm-question-banks',
        label: 'Question Banks',
        description: 'Isolated MH, CBSE & ICSE question pools with zero overlap',
      },
    ],
  },
  {
    id: 'practice-zone',
    label: 'Practice Zone',
    defaultActionId: 'pz-mcq',
    items: [
      {
        id: 'pz-mcq',
        label: 'MCQ Practice',
        description: '4-level timed quizzes from Basic to Expert Challenge',
      },
      {
        id: 'pz-chapter',
        label: 'Chapter-wise Practice',
        description: 'Topic-targeted practice without repeated questions',
      },
      {
        id: 'pz-worksheets',
        label: 'Worksheets',
        description: 'Class-wise interactive worksheets with instant model answers',
      },
      {
        id: 'pz-daily',
        label: 'Daily Practice',
        description: 'Daily Cricket Current Affairs, Sudoku & Brain Riddles',
      },
    ],
  },
  {
    id: 'exam-zone',
    label: 'Exam Zone',
    defaultActionId: 'ez-mock-tests',
    items: [
      {
        id: 'ez-mock-tests',
        label: 'Mock Tests',
        description: 'Timed assessments & MSCE Std 4th/7th Scholarship sets',
      },
      {
        id: 'ez-model-papers',
        label: 'Model Papers',
        description: 'Board-pattern practice sets with detailed explanations',
      },
      {
        id: 'ez-chapter-tests',
        label: 'Chapter Tests',
        description: 'Subject-level 10-question tests with instant evaluation',
      },
      {
        id: 'ez-exam-practice',
        label: 'Examination Practice',
        description: 'Assertion-reasoning, diagram analysis & HOTS drills',
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    defaultActionId: 'perf-tracking',
    items: [
      {
        id: 'perf-tracking',
        label: 'Progress Tracking',
        description: 'Subject mastery levels, streaks & completed worksheets',
      },
      {
        id: 'perf-results',
        label: 'Test Results',
        description: 'Quiz history, accuracy percentages & champion certificates',
      },
      {
        id: 'perf-analysis',
        label: 'Performance Analysis',
        description: 'Level-by-level subject scorecards & improvement insights',
      },
    ],
  },
  {
    id: 'plans',
    label: 'Plans & Pricing',
    defaultActionId: 'plan-maharashtra',
    items: [
      {
        id: 'plan-maharashtra',
        label: 'Maharashtra Board Plans',
        description: 'Free (₹0 Lifetime) & ₹99 / 365 Days per class',
        boardFilter: 'Maharashtra',
        badgeText: '₹99 / Year',
      },
      {
        id: 'plan-cbse',
        label: 'CBSE Plans',
        description: 'Independent CBSE Class 1–10 access at ₹99 / 1 Year',
        boardFilter: 'CBSE',
        badgeText: '₹99 / Year',
      },
      {
        id: 'plan-icse',
        label: 'ICSE Plans',
        description: 'Independent ICSE Class 1–10 access at ₹99 / 1 Year',
        boardFilter: 'ICSE',
        badgeText: '₹99 / Year',
      },
    ],
  },
  {
    id: 'account',
    label: 'My Account',
    defaultActionId: 'acc-login',
    items: [
      {
        id: 'acc-login',
        label: 'Login',
        description: 'Sign in with Email/Mobile (Student, Teacher or Admin)',
      },
      {
        id: 'acc-register',
        label: 'Register',
        description: 'Create free Class 1–10 account or add another board/class',
      },
      {
        id: 'acc-classes',
        label: 'My Classes',
        description: 'View or switch unlocked Boards & Classes on your account',
      },
      {
        id: 'acc-subscription',
        label: 'My Subscription',
        description: 'Check active 365-day plans or activate a class for ₹99',
      },
    ],
  },
];
