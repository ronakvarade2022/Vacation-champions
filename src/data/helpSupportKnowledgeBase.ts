import type { ClassLevel, EducationBoard } from '../types';
import type { SupportUserCategory } from '../types/support';

export type SupportLanguage = 'en' | 'hi' | 'mr';
export type SupportPortalContext = SupportUserCategory | 'visitor' | 'homepage';

export const HELP_DESK_WELCOME_MESSAGE =
  'Welcome to MyStudyZone AI Help & Support Assistant!\n\nHello! I am your intelligent MyStudyZone guide for Students, Teachers, Parents, Colleges, and Institutes. Ask me anything in English, Hindi, or Marathi about registration, study notes, worksheets, exams, teacher lesson planner, parent child-linking, college & institute management, or AI tools.';

export function getPortalWelcomeMessage(portal?: SupportPortalContext): string {
  switch (portal) {
    case 'teacher':
      return 'Welcome to Teacher Portal AI Help & Support!\n\nI can help you step by step with Teacher Lesson Planner (Annual, Monthly & Daily plans + A4 PDF), Question Paper & Worksheet AI Generators, Classes 1–10 teaching materials, Student tracking, and MAHA TET & CTET mock tests.';
    case 'student':
      return 'Welcome to Student Portal AI Help & Support!\n\nAsk me anything in English, Hindi, or Marathi about finding subjects & chapters, Study Notes, Interactive Worksheets, 4-Level Quizzes, Scholarship Prep, Trilingual Dictionary, or the ₹99 Class Plan.';
    case 'parent':
      return 'Welcome to Parent Portal AI Help & Support!\n\nI can guide you step by step on Parent Registration & Login, linking your child’s Student account, checking subject-wise progress reports, quiz scorecards, and attendance.';
    case 'college':
      return 'Welcome to College Portal AI Help & Support!\n\nI can help you navigate Classes & Divisions, Faculty Subject Allocation, Student Directory, Institutional Calendar, Result Analytics, and Campus Circulars.';
    case 'institute':
      return 'Welcome to Institute Portal AI Help & Support!\n\nI can guide you through Coaching Batches & Schedules, Mock Test Series, 18 Skill Academy Programs, Trainer Roster, Fee Ledger, and Course Completion Certificates.';
    default:
      return HELP_DESK_WELCOME_MESSAGE;
  }
}

export type SupportNavigationActionId =
  | 'open_worksheets'
  | 'open_syllabus'
  | 'open_all_courses'
  | 'open_quizzes'
  | 'open_scholarship'
  | 'open_tet_ctet'
  | 'open_teacher_resources'
  | 'open_lesson_planner'
  | 'open_student_portal'
  | 'open_parent_portal'
  | 'open_college_portal'
  | 'open_institute_portal'
  | 'open_ai_tools'
  | 'open_question_paper_generator'
  | 'open_dictionary'
  | 'open_thought_of_the_day'
  | 'open_stories'
  | 'open_shivaji'
  | 'open_drawing'
  | 'open_puzzles'
  | 'open_sudoku'
  | 'open_cricket'
  | 'open_ai_academy'
  | 'open_other_programs'
  | 'open_demo'
  | 'open_certificates'
  | 'open_referrals'
  | 'open_profile'
  | 'open_plans'
  | 'open_login'
  | 'open_teacher_login'
  | 'open_register'
  | 'open_password_reset'
  | 'open_dashboard';

export interface SupportNavigationAction {
  id: SupportNavigationActionId;
  label: string;
  targetClass?: ClassLevel;
  targetBoard?: EducationBoard;
  targetPortal?: SupportUserCategory;
}

export const SUPPORT_NAVIGATION_ALLOWLIST: Record<
  SupportNavigationActionId,
  { defaultLabel: string; description: string }
> = {
  open_worksheets: {
    defaultLabel: 'OPEN WORKSHEETS',
    description: 'Class-wise & board-wise online interactive worksheets (Classes 1 to 10)',
  },
  open_syllabus: {
    defaultLabel: 'OPEN SYLLABUS & STUDY NOTES',
    description: 'Chapter-wise study notes, syllabus concepts, formulas & solved examples',
  },
  open_all_courses: {
    defaultLabel: 'OPEN COURSES (CLASSES 1–10)',
    description: 'All Courses directory for Maharashtra, CBSE, and ICSE Boards',
  },
  open_quizzes: {
    defaultLabel: 'OPEN PRACTICE QUIZZES',
    description: '4-level subject practice quizzes with zero repeated questions',
  },
  open_scholarship: {
    defaultLabel: 'OPEN 4TH & 7TH SCHOLARSHIP',
    description: 'MSCE Pune Standard 4th (PSE) and Standard 7th (UPS) Scholarship prep & mocks',
  },
  open_tet_ctet: {
    defaultLabel: 'OPEN TET & CTET EXAM PREP',
    description: 'MAHA TET and CTET Paper 1 & Paper 2 full-length CBT mock tests',
  },
  open_teacher_resources: {
    defaultLabel: 'OPEN TEACHER PORTAL',
    description: 'Teacher Portal for Classes 1–10 worksheets, lesson planner, notes & TET/CTET',
  },
  open_lesson_planner: {
    defaultLabel: 'OPEN TEACHER LESSON PLANNER',
    description: 'Annual, Monthly & Daily Lesson Planner with A4 PDF export for teachers',
  },
  open_student_portal: {
    defaultLabel: 'OPEN STUDENT PORTAL',
    description: 'Student Portal dashboard for Classes 1–10 study notes, worksheets & exams',
  },
  open_parent_portal: {
    defaultLabel: 'OPEN PARENT PORTAL',
    description: 'Parent Portal for child account linking, progress reports & attendance tracking',
  },
  open_college_portal: {
    defaultLabel: 'OPEN COLLEGE PORTAL',
    description: 'College & School Portal for divisions, faculty allocation, student roster & analytics',
  },
  open_institute_portal: {
    defaultLabel: 'OPEN INSTITUTE PORTAL',
    description: 'Coaching & Skill Institute Portal for batches, mock test series, fees & certificates',
  },
  open_ai_tools: {
    defaultLabel: 'OPEN AI GENERATOR & TOOLS',
    description: 'AI Generator Studio for worksheets, notes, question papers, quizzes & slides',
  },
  open_question_paper_generator: {
    defaultLabel: 'OPEN QUESTION PAPER GENERATOR',
    description: 'AI Question Paper Generator for formal 20–100 mark exam papers with marking schemes',
  },
  open_dictionary: {
    defaultLabel: 'OPEN TRILINGUAL DICTIONARY',
    description: 'Original MyStudyZone English–Marathi–Hindi Trilingual Dictionary',
  },
  open_thought_of_the_day: {
    defaultLabel: 'OPEN THOUGHT OF THE DAY',
    description: '1,000+ trilingual motivational & educational Thoughts of the Day',
  },
  open_stories: {
    defaultLabel: 'OPEN STORY WORLD',
    description: '45+ English, Hindi & Marathi audio stories with voice narration & morals',
  },
  open_shivaji: {
    defaultLabel: 'OPEN SHIVAJI MAHARAJ STORIES',
    description: '50 chronological Chhatrapati Shivaji Maharaj historical chapters with audio',
  },
  open_drawing: {
    defaultLabel: 'OPEN DRAWING STUDIO',
    description: 'Digital colouring templates, drawing canvas & saved artwork gallery',
  },
  open_puzzles: {
    defaultLabel: 'OPEN BRAIN PUZZLES',
    description: 'Free interactive logic riddles and lateral thinking puzzles',
  },
  open_sudoku: {
    defaultLabel: 'OPEN SUDOKU',
    description: 'Free 4x4, 6x6 and 9x9 interactive Sudoku challenges',
  },
  open_cricket: {
    defaultLabel: 'OPEN CRICKET & GK',
    description: 'Cricket Champions Hub and General Knowledge quizzes',
  },
  open_ai_academy: {
    defaultLabel: 'OPEN AI LEARNING ACADEMY',
    description: 'AI Learning Academy & Future Skills modules',
  },
  open_other_programs: {
    defaultLabel: 'OPEN SPECIAL LEARNING',
    description: 'All Special Learning studios and enrichment programs',
  },
  open_demo: {
    defaultLabel: 'OPEN FREE DEMO TESTS',
    description: 'Free visitor demo quizzes, curriculum previews & full-length demo mock tests',
  },
  open_certificates: {
    defaultLabel: 'OPEN CERTIFICATES & LEADERBOARD',
    description: 'Milestone Champion Certificates and leaderboard rankings',
  },
  open_referrals: {
    defaultLabel: 'OPEN REFER & EARN',
    description: 'Referral link sharing and ₹5 cashback wallet',
  },
  open_profile: {
    defaultLabel: 'OPEN MY ACCOUNT',
    description: 'Personal profile, active plans, UID and account details',
  },
  open_plans: {
    defaultLabel: 'VIEW PLANS & PRICING',
    description: 'Free ₹0 Lifetime plan, ₹99 / 365 Days class plans & TET/CTET plans',
  },
  open_login: {
    defaultLabel: 'OPEN STUDENT LOGIN',
    description: 'Sign in with registered email and password',
  },
  open_teacher_login: {
    defaultLabel: 'OPEN TEACHER LOGIN',
    description: 'Dedicated Teacher Portal sign-in',
  },
  open_register: {
    defaultLabel: 'OPEN REGISTRATION',
    description: 'Create a new Student, Teacher, Parent, College or Institute account',
  },
  open_password_reset: {
    defaultLabel: 'OPEN PASSWORD RESET',
    description: 'Reset forgotten password via registered email link',
  },
  open_dashboard: {
    defaultLabel: 'OPEN MAIN DASHBOARD',
    description: 'Return to the main MyStudyZone home dashboard',
  },
};

export function buildNavigationAction(
  id: SupportNavigationActionId,
  targetClass?: ClassLevel,
  targetBoard?: EducationBoard,
  targetPortal?: SupportPortalContext
): SupportNavigationAction {
  const base = SUPPORT_NAVIGATION_ALLOWLIST[id];
  const resolvedPortal: SupportUserCategory | undefined =
    targetPortal && targetPortal !== 'visitor' && targetPortal !== 'homepage'
      ? targetPortal
      : undefined;

  let label = base.defaultLabel;
  if (id === 'open_worksheets' && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} WORKSHEETS`;
  } else if (id === 'open_syllabus' && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} SYLLABUS`;
  } else if (id === 'open_all_courses' && targetBoard) {
    label = `OPEN ${targetBoard.toUpperCase()} COURSES`;
  } else if (id === 'open_login' && resolvedPortal) {
    const loginLabels: Record<SupportUserCategory, string> = {
      student: 'OPEN STUDENT LOGIN',
      teacher: 'OPEN TEACHER LOGIN',
      parent: 'OPEN PARENT LOGIN',
      college: 'OPEN COLLEGE LOGIN',
      institute: 'OPEN INSTITUTE LOGIN',
    };
    label = loginLabels[resolvedPortal];
  } else if (id === 'open_register' && resolvedPortal) {
    const registerLabels: Record<SupportUserCategory, string> = {
      student: 'OPEN STUDENT REGISTRATION',
      teacher: 'OPEN TEACHER REGISTRATION',
      parent: 'OPEN PARENT REGISTRATION',
      college: 'OPEN COLLEGE REGISTRATION',
      institute: 'OPEN INSTITUTE REGISTRATION',
    };
    label = registerLabels[resolvedPortal];
  }

  return {
    id,
    label,
    ...(targetClass ? { targetClass } : {}),
    ...(targetBoard ? { targetBoard } : {}),
    ...(resolvedPortal ? { targetPortal: resolvedPortal } : {}),
  };
}

export function getPortalWelcomeActions(portal?: SupportPortalContext): SupportNavigationAction[] {
  switch (portal) {
    case 'teacher':
      return [
        buildNavigationAction('open_lesson_planner', undefined, undefined, 'teacher'),
        buildNavigationAction('open_question_paper_generator', undefined, undefined, 'teacher'),
        buildNavigationAction('open_tet_ctet', undefined, undefined, 'teacher'),
        buildNavigationAction('open_teacher_resources', undefined, undefined, 'teacher'),
      ];
    case 'parent':
      return [
        buildNavigationAction('open_parent_portal', undefined, undefined, 'parent'),
        buildNavigationAction('open_register', undefined, undefined, 'parent'),
        buildNavigationAction('open_login', undefined, undefined, 'parent'),
      ];
    case 'college':
      return [
        buildNavigationAction('open_college_portal', undefined, undefined, 'college'),
        buildNavigationAction('open_register', undefined, undefined, 'college'),
        buildNavigationAction('open_login', undefined, undefined, 'college'),
      ];
    case 'institute':
      return [
        buildNavigationAction('open_institute_portal', undefined, undefined, 'institute'),
        buildNavigationAction('open_register', undefined, undefined, 'institute'),
        buildNavigationAction('open_login', undefined, undefined, 'institute'),
      ];
    case 'student':
      return [
        buildNavigationAction('open_syllabus', undefined, undefined, 'student'),
        buildNavigationAction('open_worksheets', undefined, undefined, 'student'),
        buildNavigationAction('open_quizzes', undefined, undefined, 'student'),
        buildNavigationAction('open_dictionary', undefined, undefined, 'student'),
      ];
    default:
      return [
        buildNavigationAction('open_student_portal'),
        buildNavigationAction('open_teacher_resources'),
        buildNavigationAction('open_parent_portal'),
        buildNavigationAction('open_ai_tools'),
      ];
  }
}

export function detectQueryLanguage(text: string): SupportLanguage {
  const raw = String(text || '').trim();
  if (!raw) return 'en';

  // Devanagari Unicode block: \u0900-\u097F
  if (/[\u0900-\u097F]/.test(raw)) {
    const marathiHints = [
      'आहे', 'आहेत', 'नाही', 'कुठे', 'कसे', 'कसा', 'कशी', 'माझी', 'माझा', 'माझे',
      'इयत्ता', 'अभ्यासक्रम', 'शिक्षक', 'विद्यार्थी', 'पाहिजे', 'मदत', 'लॉगिन',
      'नोंदणी', 'कृपया', 'मिळेल', 'बघायचे', 'सांगा', 'करायचे', 'विसरलो', 'पासवर्ड'
    ];
    const hindiHints = [
      'है', 'हैं', 'नहीं', 'कहाँ', 'कहां', 'कैसे', 'मेरा', 'मेरी', 'मेरे', 'कक्षा',
      'चाहिए', 'मदद', 'बताइए', 'मिलेगा', 'मिलेगी', 'करें', 'खोलें', 'भूल', 'गया',
      'देखना', 'बताओ', 'छात्र'
    ];
    let mrScore = 0;
    let hiScore = 0;
    for (const w of marathiHints) if (raw.includes(w)) mrScore += 1;
    for (const w of hindiHints) if (raw.includes(w)) hiScore += 1;
    if (mrScore > hiScore) return 'mr';
    if (hiScore > 0) return 'hi';
    // Marathi specific characters/suffixes
    if (raw.includes('ळ') || /्या|चे|ची|चा|तील|मध्ये/.test(raw)) return 'mr';
    return 'hi';
  }

  const lower = raw.toLowerCase();
  const marathiRoman = [
    'kuthe', 'kase', 'kasa', 'kashi', 'iyatta', 'abhyaskram', 'shikshak',
    'pahije', 'visarlo', 'milel', 'aahe', 'ahe', 'majha', 'majhi', 'krpaya', 'sanga'
  ];
  const hindiRoman = [
    'kaha', 'kahan', 'kaise', 'kya', 'milega', 'milegi', 'chahiye', 'madad',
    'batao', 'bataiye', 'kaksha', 'bhul', 'gaya', 'karna', 'dekho', 'mera', 'meri', 'hai'
  ];
  let mrR = 0;
  let hiR = 0;
  for (const w of marathiRoman) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(lower)) mrR += 1;
  }
  for (const w of hindiRoman) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(lower)) hiR += 1;
  }
  if (mrR > hiR && mrR >= 1) return 'mr';
  if (hiR >= 1) return 'hi';
  return 'en';
}

export function extractClassLevel(text: string): ClassLevel | undefined {
  const normalized = String(text || '')
    .replace(/[०१२३४५६७८९]/g, (d) => String('०१२३४५६७८९'.indexOf(d)))
    .toLowerCase();

  const match =
    /(?:class|std|standard|grade|kaksha|iyatta|कक्षा|इयत्ता)\s*[-:]?\s*(10|9|8|7|6|5|4|3|2|1)(?:st|nd|rd|th|vi|wi|ve|ती|री|ली|थी|वी|व्या)?\b/i.exec(
      normalized
    ) ||
    /\b(10|9|8|7|6|5|4|3|2|1)(?:st|nd|rd|th)\s*(?:class|std|standard|worksheet|worksheets|syllabus|notes|quiz|quizzes)\b/i.exec(
      normalized
    );

  if (match) {
    const n = parseInt(match[1], 10);
    if (n >= 1 && n <= 10) return `Class ${n}` as ClassLevel;
  }

  const wordMap: Record<string, ClassLevel> = {
    first: 'Class 1',
    second: 'Class 2',
    third: 'Class 3',
    fourth: 'Class 4',
    fifth: 'Class 5',
    sixth: 'Class 6',
    seventh: 'Class 7',
    eighth: 'Class 8',
    ninth: 'Class 9',
    tenth: 'Class 10',
  };
  for (const [word, cls] of Object.entries(wordMap)) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(normalized)) return cls;
  }
  return undefined;
}

export function extractBoard(text: string): EducationBoard | undefined {
  const lower = String(text || '').toLowerCase();
  if (/\bcbse\b|\bncert\b|सीबीएसई/.test(lower)) return 'CBSE';
  if (/\bicse\b|\bcisce\b|आयसीएसई/.test(lower)) return 'ICSE';
  if (/maharashtra|maharastra|ssc|balbharati|msce|महाराष्ट्र/.test(lower)) return 'Maharashtra';
  return undefined;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[n];
}

function tokenizeNormalized(text: string): string[] {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function hasFuzzyKeyword(tokens: string[], rawLower: string, keywords: string[]): boolean {
  for (const kw of keywords) {
    if (kw.includes(' ')) {
      if (rawLower.includes(kw)) return true;
      continue;
    }
    if (tokens.includes(kw) || rawLower.includes(kw)) return true;
    if (kw.length >= 5) {
      for (const tok of tokens) {
        if (tok.length >= 4 && levenshtein(tok, kw) <= (kw.length >= 8 ? 2 : 1)) {
          return true;
        }
      }
    }
  }
  return false;
}

export interface FastPathSupportResponse {
  matched: boolean;
  reply: string;
  language: SupportLanguage;
  navigationActions: SupportNavigationAction[];
  suggestSupportTicket: boolean;
  topicId?: string;
}

interface KbTopicDefinition {
  id: string;
  priority: number;
  keywords: string[];
  actionIds: (cls?: ClassLevel, board?: EducationBoard, userRole?: SupportPortalContext) => SupportNavigationActionId[];
  suggestSupportTicket?: boolean;
  responses: Record<
    SupportLanguage,
    (cls?: ClassLevel, board?: EducationBoard, userRole?: SupportPortalContext) => string
  >;
}

const KB_TOPICS: KbTopicDefinition[] = [
  {
    id: 'greeting',
    priority: 10,
    keywords: ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'नमस्कार', 'हॅलो'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_lesson_planner', 'open_question_paper_generator', 'open_tet_ctet']
        : role === 'parent'
        ? ['open_parent_portal', 'open_register', 'open_login']
        : role === 'college'
        ? ['open_college_portal', 'open_register', 'open_login']
        : role === 'institute'
        ? ['open_institute_portal', 'open_register', 'open_login']
        : role === 'student'
        ? ['open_syllabus', 'open_worksheets', 'open_quizzes']
        : ['open_student_portal', 'open_teacher_resources', 'open_parent_portal'],
    responses: {
      en: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'Hello Teacher! I am your Teacher Portal Help & Support Assistant.\n\nI can help you step by step with:\n• Teacher Lesson Planner (Annual, Monthly & Daily plans with A4 PDF export)\n• AI Question Paper Generator & Worksheet / Assignment Builders\n• Classes 1–10 Teaching Materials (Maharashtra, CBSE & ICSE)\n• MAHA TET & CTET Paper 1 & 2 Mock Tests\n\nWhat would you like help with today?';
        }
        if (role === 'parent') {
          return 'Hello Parent! I am your Parent Portal Help & Support Assistant.\n\nI can help you with:\n• Parent Registration & Login\n• Linking your child’s Student account\n• Tracking subject progress, quiz scores, and attendance reports\n\nHow can I assist you today?';
        }
        if (role === 'college') {
          return 'Hello! I am your College Portal Help & Support Assistant.\n\nI can guide you through:\n• College / School Registration & Login\n• Classes, Streams & Divisions setup\n• Faculty Subject Allocation & Student Directory\n• Institutional Calendar, Result Analytics & Circulars\n\nWhat would you like help with today?';
        }
        if (role === 'institute') {
          return 'Hello! I am your Institute Portal Help & Support Assistant.\n\nI can guide you through:\n• Institute Registration & Login\n• Coaching Batches & Mock Test Series\n• 18 Skill Academy Programs (Abacus, Vedic Maths, Phonics, Coding)\n• Trainer Roster, Fee Ledger & Certificates\n\nHow can I assist you today?';
        }
        if (role === 'student') {
          return 'Hello! I am your Student Portal Help & Support Assistant.\n\nI can help you step by step with:\n• Registration & Login\n• Finding Subjects, Chapters & Study Notes (Classes 1–10)\n• Interactive Worksheets & 4-Level Practice Quizzes\n• 4th & 7th Scholarship, Trilingual Dictionary & ₹99 Class Plans\n\nWhat would you like help with today?';
        }
        return 'Hello! I am your MyStudyZone AI Help & Support Assistant.\n\nI can guide you step by step across all 5 portals:\n1. Student Portal: Registration, finding subjects & chapters, study notes, worksheets, online exams & ₹99 class plan.\n2. Teacher Portal: Registration, Lesson Planner (Annual/Monthly/Daily), Question Paper Generator & TET/CTET.\n3. Parent Portal: Registration, linking child student accounts, progress reports & attendance.\n4. College Portal: Divisions, faculty allocation, student roster, calendar & result analytics.\n5. Institute Portal: Coaching batches, mock test series, 18 skill programs, fee ledger & certificates.\n\nWhat would you like help with today?';
      },
      hi: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'नमस्ते शिक्षक महोदय! मैं आपका Teacher Portal हेल्प सहायक हूँ।\n\nमैं आपकी इन विषयों में मदद कर सकता हूँ:\n• Teacher Lesson Planner (वार्षिक, मासिक व दैनिक पाठ योजना + A4 PDF)\n• AI प्रश्न-पत्र (Question Paper) व वर्कशीट जनरेटर\n• कक्षा 1–10 शिक्षण सामग्री और MAHA TET / CTET मॉक टेस्ट\n\nबताइए, आज मैं आपकी क्या मदद करूँ?';
        }
        if (role === 'parent') {
          return 'नमस्ते! मैं आपका Parent Portal हेल्प सहायक हूँ। मैं अभिभावक पंजीकरण, बच्चे के छात्र खाते को लिंक करने और प्रोग्रेस रिपोर्ट देखने में आपकी मदद कर सकता हूँ। बताइए, क्या सहायता चाहिए?';
        }
        if (role === 'college') {
          return 'नमस्ते! मैं आपका College Portal हेल्प सहायक हूँ। मैं कॉलेज पंजीकरण, डिवीज़न, फैकल्टी आवंटन, छात्र सूची और परिणाम विश्लेषण में आपकी सहायता कर सकता हूँ।';
        }
        if (role === 'institute') {
          return 'नमस्ते! मैं आपका Institute Portal हेल्प सहायक हूँ। मैं कोचिंग बैच, मॉक टेस्ट सीरीज़, 18 स्किल प्रोग्राम और फीस लेजर में आपकी मदद कर सकता हूँ।';
        }
        if (role === 'student') {
          return 'नमस्ते! मैं आपका Student Portal हेल्प सहायक हूँ। मैं स्टडी नोट्स, वर्कशीट, ऑनलाइन क्विज़, स्कॉलरशिप, शब्दकोश और ₹99 प्लान के बारे में चरण-दर-चरण मदद कर सकता हूँ।';
        }
        return 'नमस्ते! मैं आपका MyStudyZone AI हेल्प एंड सपोर्ट सहायक हूँ।\n\nमैं सभी 5 पोर्टल्स (Student, Teacher, Parent, College, Institute) के लिए चरण-दर-चरण मार्गदर्शन देता हूँ। बताइए, आज मैं आपकी क्या मदद करूँ?';
      },
      mr: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'नमस्कार! मी तुमचा Teacher Portal हेल्प सहाय्यक आहे.\n\nमी तुम्हाला खालील सुविधांसाठी मदत करू शकतो:\n• Teacher Lesson Planner (वार्षिक, मासिक व दैनंदिन पाठ नियोजन + A4 PDF)\n• AI प्रश्नपत्रिका (Question Paper) व वर्कशीट जनरेटर\n• इयत्ता १–१० अध्ययन साहित्य आणि MAHA TET / CTET मॉक टेस्ट\n\nसांगा, आज तुम्हाला कशी मदत हवी आहे?';
        }
        if (role === 'parent') {
          return 'नमस्कार! मी तुमचा Parent Portal हेल्प सहाय्यक आहे. पालक नोंदणी, मुलाचे खाते जोडणे आणि प्रगती अहवाल पाहण्यासाठी मी मार्गदर्शन करू शकतो.';
        }
        if (role === 'college') {
          return 'नमस्कार! मी तुमचा College Portal हेल्प सहाय्यक आहे. कॉलेज नोंदणी, तुकड्या, शिक्षक नियोजन, विद्यार्थी यादी आणि निकाल विश्लेषण याबाबत मी मदत करू शकतो.';
        }
        if (role === 'institute') {
          return 'नमस्कार! मी तुमचा Institute Portal हेल्प सहाय्यक आहे. कोचिंग बॅचेस, मॉक टेस्ट सिरीज, १८ कौशल्य उपक्रम आणि फी लेजर याबाबत मी मदत करू शकतो.';
        }
        if (role === 'student') {
          return 'नमस्कार! मी तुमचा Student Portal हेल्प सहाय्यक आहे. विषय व धडे शोधणे, स्टडी नोट्स, वर्कशीट्स, ऑनलाइन क्विझ, शब्दकोश आणि ₹९९ प्लानसाठी मी पायरी-पायरीने मदत करतो.';
        }
        return 'नमस्कार! मी तुमचा MyStudyZone AI हेल्प अँड सपोर्ट सहाय्यक आहे.\n\nमी सर्व ५ पोर्टल्ससाठी (Student, Teacher, Parent, College, Institute) पायरी-पायरीने मार्गदर्शन करतो. सांगा, आज मी तुमची काय मदत करू?';
      },
    },
  },
  {
    id: 'question_paper_generator',
    priority: 96,
    keywords: [
      'question paper', 'question paper generator', 'generate question paper', 'generate a question paper',
      'create question paper', 'make question paper', 'exam paper', 'unit test paper', 'term paper',
      'marking scheme', 'प्रश्नपत्र', 'प्रश्नपत्रिका', 'पेपर बनवायचा', 'पेपर कैसे बनाएं'
    ],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_question_paper_generator', 'open_lesson_planner', 'open_teacher_resources']
        : ['open_question_paper_generator', 'open_ai_tools'],
    responses: {
      en: (cls, board, role) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'Classes 1–10'].join(' • ');
        const prefix =
          role === 'teacher'
            ? 'How Teachers Can Generate a Question Paper Step by Step'
            : 'How to Generate a Question Paper on MyStudyZone Step by Step';
        return `${prefix} (${scope}):\n1. Open the AI Question Paper Generator by clicking OPEN QUESTION PAPER GENERATOR below (or open Learning Tools / 40 AI Tools → "Core 10 AI Generators" → "AI Question Paper Generator").\n2. Select your Education Board (Maharashtra / CBSE / ICSE), Class (1–10), Subject, and Medium/Language (English / Marathi / Hindi).\n3. Choose a Syllabus Chapter from the dropdown or enter your custom Topic / Exam Syllabus.\n4. Set Total Marks (20 to 100 Marks), Exam Duration (e.g., 90 Minutes), and Difficulty Level.\n5. Click Generate to build a complete exam paper with Paper Header, Section A (Objective/MCQs), Section B (Short Answer), Section C (Long Answer), and a Complete Marking Scheme / Answer Key.\n6. Review or edit inline, then export as A4 PDF, Word (.docx), or Print directly.${role === 'teacher' ? '\n\nTip: Inside "Teacher 40 AI Productivity Tools", you also have specialized Question Paper Generator (#15), Class Test Creator (#20), and Unit Test Creator (#21).' : ''}`;
      },
      hi: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'कक्षा 1–10'].join(' • ');
        return `MyStudyZone पर प्रश्न-पत्र (Question Paper) कैसे बनाएं (${scope}) — चरण-दर-चरण:\n1. नीचे OPEN QUESTION PAPER GENERATOR बटन पर क्लिक करें (या AI Tools Studio → "Core 10 AI Generators" → "AI Question Paper Generator" खोलें)।\n2. अपना बोर्ड (Maharashtra / CBSE / ICSE), कक्षा (1–10), विषय और भाषा चुनें।\n3. पाठ्यक्रम का अध्याय चुनें या अपना टॉपिक दर्ज करें।\n4. कुल अंक (Marks: 20–100), समय (Duration) और कठिनाई स्तर (Difficulty) चुनें।\n5. Generate पर क्लिक करें — सिस्टम सेक्शन A, B, C और पूरी Answer Key / Marking Scheme के साथ प्रश्न-पत्र तैयार कर देगा, जिसे आप PDF या DOCX में डाउनलोड कर सकते हैं।`;
      },
      mr: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'इयत्ता १–१०'].join(' • ');
        return `MyStudyZone वर प्रश्नपत्रिका (Question Paper) कशी तयार करावी (${scope}) — पायरी-पायरीने:\n1. खालील OPEN QUESTION PAPER GENERATOR बटणावर क्लिक करा (किंवा AI Tools Studio → "Core 10 AI Generators" → "AI Question Paper Generator" उघडा).\n2. तुमचे बोर्ड (Maharashtra / CBSE / ICSE), इयत्ता (१–१०), विषय आणि भाषा निवडा.\n3. अभ्यासक्रमातील धडा निवडा किंवा तुमचा घटक (Topic) टाका.\n4. एकूण गुण (Marks: 20–100), वेळ (Duration) आणि काठिण्य पातळी (Difficulty) निवडा.\n5. Generate वर क्लिक करताच विभाग A, B, C आणि संपूर्ण उत्तरसूचीसह (Marking Scheme) प्रश्नपत्रिका तयार होईल; ती तुम्ही PDF किंवा Word (.docx) स्वरूपात डाउनलोड करू शकता.`;
      },
    },
  },
  {
    id: 'unresolved_account_problem',
    priority: 100,
    keywords: [
      'cannot login', 'cant login', 'login failed', 'login error', 'not opening', 'payment deducted',
      'paid but locked', 'plan not activated', 'still locked', 'wrong class', 'change class',
      'single device', 'another device', 'blocked', 'bug', 'technical error', 'not working',
      'submit request', 'support request', 'complaint', 'raise ticket', 'support ticket', 'contact support',
      'escalate', 'talk to admin', 'help desk ticket',
      'लॉगिन नहीं', 'समस्या', 'पेमेंट कट', 'अडचण', 'लॉगिन होत नाही', 'तक्रार'
    ],
    suggestSupportTicket: true,
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_password_reset', 'open_teacher_login']
        : ['open_password_reset', 'open_login'],
    responses: {
      en: () =>
        'Here are quick step-by-step checks before escalating to our Support Team:\n1. Verify Portal Role: Make sure you are logging into your matching portal (Student, Teacher, Parent, College, or Institute) with your registered email.\n2. Single-Device Protection: If your account is active on another phone/browser, sign out there first or click "Lost/Damaged Device Recovery" inside the Login window.\n3. Forgot Password: Click "Forgot Password" in the Login modal to get an instant reset link on your email.\n4. Payment Refresh: If a ₹99 plan payment was deducted but appears locked, log out and log back in once.\n\nHow to Contact Support:\nClick the "SUBMIT A SUPPORT REQUEST" button below, choose your User Category (Student, Teacher, Parent, College, or Institute), fill in your Name, Registered Email, Issue Category, and Problem Description, and receive an official Ticket Number for Admin review.',
      hi: () =>
        'सपोर्ट टीम को समस्या भेजने से पहले ये आसान कदम आज़माएँ:\n1. सही पोर्टल चुनें: सुनिश्चित करें कि आप सही पोर्टल (Student, Teacher, Parent, College या Institute) पर पंजीकृत ईमेल से लॉगिन कर रहे हैं।\n2. Single-Device सुरक्षा: यदि अकाउंट किसी दूसरे फोन/ब्राउज़र में खुला है, तो वहाँ से Logout करें या Login बॉक्स में Device Recovery चुनें।\n3. पासवर्ड रीसेट: पासवर्ड भूल गए हों तो Forgot Password से ईमेल पर रीसेट लिंक प्राप्त करें।\n4. पेमेंट रिफ्रेश: ₹99 पेमेंट के बाद प्लान लॉक दिखे तो एक बार Logout करके फिर Login करें।\n\nसपोर्ट टीम से संपर्क कैसे करें:\nनीचे "SUBMIT A SUPPORT REQUEST" बटन दबाएँ, अपनी श्रेणी (Student/Teacher/Parent/College/Institute), नाम, ईमेल, समस्या श्रेणी व विवरण भरें और तुरंत अपना टिकट नंबर प्राप्त करें।',
      mr: () =>
        'सपोर्ट टीमकडे तक्रार पाठवण्यापूर्वी खालील सोप्या पायऱ्या तपासा:\n1. योग्य पोर्टल निवडा: तुम्ही योग्य पोर्टलवर (Student, Teacher, Parent, College किंवा Institute) तुमच्या नोंदणीकृत ईमेलने लॉगिन करत आहात याची खात्री करा.\n2. Single-Device सुरक्षा: तुमचे खाते दुसऱ्या डिव्हाइसवर सुरू असल्यास तेथून Logout करा किंवा Login विंडोमधील Device Recovery वापरा.\n3. पासवर्ड रीसेट: पासवर्ड विसरल्यास Forgot Password वापरून ईमेलवर रीसेट लिंक मिळवा.\n4. पेमेंट रिफ्रेश: ₹९९ पेमेंटनंतर प्लान लॉक दिसत असल्यास एकदा Logout करून पुन्हा Login करा.\n\nसपोर्ट टीमशी संपर्क कसा साधावा:\nखालील "SUBMIT A SUPPORT REQUEST" बटणावर क्लिक करा, तुमचा प्रकार (Student/Teacher/Parent/College/Institute), नाव, ईमेल व समस्येचे वर्णन भरा आणि अधिकृत तिकीट क्रमांक मिळवा.',
    },
  },
  {
    id: 'password_reset',
    priority: 90,
    keywords: [
      'forgot password', 'reset password', 'password problem', 'password change', 'pasword',
      'bhul gaya', 'visarlo', 'पासवर्ड', 'रीसेट'
    ],
    suggestSupportTicket: true,
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_password_reset', 'open_teacher_login']
        : ['open_password_reset', 'open_login'],
    responses: {
      en: () =>
        'How to Reset Your Password Step by Step:\n1. Click Login at the top-right and select "Forgot Password" (or click OPEN PASSWORD RESET below).\n2. Enter your registered email address and submit.\n3. Open the password reset email sent by MyStudyZone (check Spam/Promotions if not in Inbox) and set a new password.\n\nSafety Rule: Never share your password or OTP with anyone. If you still need help, click SUBMIT A SUPPORT REQUEST below.',
      hi: () =>
        'अपना पासवर्ड रीसेट करने के चरण:\n1. ऊपर दाईं ओर Login पर क्लिक करें और "Forgot Password" चुनें (या नीचे OPEN PASSWORD RESET दबाएँ)।\n2. अपना पंजीकृत ईमेल दर्ज करें।\n3. आपके ईमेल पर आए रीसेट लिंक (Spam फ़ोल्डर भी देखें) से नया पासवर्ड सेट करें।\n\nयदि फिर भी दिक्कत हो, तो नीचे SUBMIT A SUPPORT REQUEST पर क्लिक करें।',
      mr: () =>
        'पासवर्ड रीसेट करण्याच्या पायऱ्या:\n1. वर उजवीकडे Login वर क्लिक करून "Forgot Password" निवडा (किंवा खालील OPEN PASSWORD RESET दाबा).\n2. तुमचा नोंदणीकृत ईमेल पत्ता टाका.\n3. ईमेलवर आलेल्या लिंकवर क्लिक करून (Spam फोल्डरही तपासा) नवीन पासवर्ड सेट करा.\n\nअडचण येत असल्यास खालील SUBMIT A SUPPORT REQUEST बटणावर क्लिक करा.',
    },
  },
  {
    id: 'parent_portal_support',
    priority: 89,
    keywords: [
      'parent', 'parents', 'parent portal', 'parent login', 'parent register', 'parent registration',
      'link child', 'connect student', 'child progress', 'student progress', 'parent report',
      'parent dashboard', 'palak', 'पालक', 'पैरेंट', 'बच्चे की प्रगति', 'मुलाची प्रगती'
    ],
    actionIds: () => ['open_parent_portal', 'open_register', 'open_login'],
    responses: {
      en: () =>
        'Parent Portal Guide — Step by Step:\n1. Parent Registration & Login: From the homepage, click the "Parent Portal" card (or click Register → select Parent), enter your Parent Name, Email, Mobile Number, and Password.\n2. Connecting with Your Child’s Student Account: Inside the Parent Portal, open "Link Child Account" and enter your child’s registered Student Email and Mobile Number to connect their profile.\n3. Understanding Student Progress & Reports:\n   • View subject-wise progress, completed chapters, and worksheet scores.\n   • Check online exam/quiz scorecards, accuracy percentage, and attendance.\n   • Download/view progress reports and communicate with teachers.\n\nClick OPEN PARENT PORTAL below to go directly to the Parent Portal.',
      hi: () =>
        'Parent Portal (अभिभावक पोर्टल) — चरण-दर-चरण मार्गदर्शिका:\n1. पैरेंट रजिस्ट्रेशन और लॉगिन: होमपेज पर "Parent Portal" कार्ड पर क्लिक करें (या Register → Parent चुनें) और अपना नाम, ईमेल, मोबाइल व पासवर्ड दर्ज करें।\n2. बच्चे के Student Account से कैसे जुड़ें: Parent Portal के अंदर "Link Child Account" में अपने बच्चे का पंजीकृत Student Email और Mobile Number डालकर प्रोफ़ाइल लिंक करें।\n3. प्रगति और रिपोर्ट कैसे देखें:\n   • विषय-वार प्रगति, पूरे किए गए अध्याय और वर्कशीट स्कोर देखें।\n   • ऑनलाइन परीक्षा/क्विज़ स्कोरकार्ड, सटीकता प्रतिशत और उपस्थिति (Attendance) ट्रैक करें।\n\nसीधे जाने के लिए नीचे OPEN PARENT PORTAL बटन दबाएँ।',
      mr: () =>
        'Parent Portal (पालक पोर्टल) — पायरी-पायरीने माहिती:\n1. पालक नोंदणी आणि लॉगिन: मुख्यपृष्ठावरील "Parent Portal" कार्डवर क्लिक करा (किंवा Register → Parent निवडा) आणि तुमचे नाव, ईमेल, मोबाइल व पासवर्ड टाका.\n2. मुलाच्या Student खात्याशी कसे जोडावे: Parent Portal मध्ये "Link Child Account" निवडून मुलाचा नोंदणीकृत Student Email आणि मोबाइल नंबर टाकून खाते जोडा.\n3. मुलाची प्रगती आणि अहवाल (Reports):\n   • विषयनिहाय प्रगती, पूर्ण झालेले धडे आणि वर्कशीट गुण पहा.\n   • ऑनलाइन परीक्षा निकाल, अचूकता टक्केवारी आणि उपस्थिती (Attendance) तपासा.\n\nथेट उघडण्यासाठी खालील OPEN PARENT PORTAL बटणावर क्लिक करा.',
    },
  },
  {
    id: 'college_portal_support',
    priority: 88,
    keywords: [
      'college', 'colleges', 'college portal', 'school portal', 'school admin', 'college login',
      'college register', 'college registration', 'college dashboard', 'divisions', 'faculty allocation',
      'institutional', 'महाविद्यालय', 'कॉलेज', 'शाळा पोर्टल'
    ],
    actionIds: () => ['open_college_portal', 'open_register', 'open_login'],
    responses: {
      en: () =>
        'College & School Portal Guide — Step by Step:\n1. Registration & Account Setup: Click the "College Portal" card on the homepage, select Register as College/School, and enter your Institution Name, UDISE / Registration Code, City, Official Email, Mobile, and Password.\n2. Available College Features & Dashboard Navigation:\n   • Overview & Academic KPIs: Monitor total enrolled students, active faculty, divisions, and average pass rate.\n   • Classes, Streams & Divisions: Manage standards/streams, divisions, class teachers, and room allocations.\n   • Faculty Allocation: Assign teachers to subjects and divisions and track workload.\n   • Student Directory: View student roster, attendance percentage, and fee status.\n   • Institutional Calendar, Result Analytics & Campus Circulars: Publish notices, schedule exams, and inspect class-wise result analytics.\n\nClick OPEN COLLEGE PORTAL below to access the College Portal.',
      hi: () =>
        'College Portal (कॉलेज व स्कूल पोर्टल) — चरण-दर-चरण मार्गदर्शिका:\n1. रजिस्ट्रेशन और लॉगिन: होमपेज पर "College Portal" कार्ड खोलें, Register में संस्था का नाम, UDISE/रजिस्ट्रेशन कोड, शहर, आधिकारिक ईमेल, मोबाइल और पासवर्ड भरें।\n2. कॉलेज डैशबोर्ड की मुख्य सुविधाएँ:\n   • Classes & Divisions: कक्षाएँ, स्ट्रीम, डिवीज़न और क्लास टीचर प्रबंधित करें।\n   • Faculty Allocation: शिक्षकों को विषय और डिवीज़न आवंटित करें।\n   • Student Directory: छात्रों की सूची, उपस्थिति और फीस स्थिति देखें।\n   • Calendar, Result Analytics & Circulars: परीक्षा कैलेंडर, परिणाम विश्लेषण और कैंपस नोटिस जारी करें।\n\nनीचे OPEN COLLEGE PORTAL बटन दबाकर सीधे खोलें।',
      mr: () =>
        'College Portal (महाविद्यालय व शाळा पोर्टल) — पायरी-पायरीने माहिती:\n1. नोंदणी आणि लॉगिन: मुख्यपृष्ठावरील "College Portal" कार्डवर क्लिक करा, Register मध्ये संस्थेचे नाव, UDISE/नोंदणी कोड, शहर, अधिकृत ईमेल, मोबाइल व पासवर्ड भरा.\n2. कॉलेज डॅशबोर्डवरील प्रमुख सुविधा:\n   • Classes & Divisions: वर्ग, शाखा (Streams), तुकड्या आणि वर्गशिक्षक व्यवस्थापित करा.\n   • Faculty Allocation: शिक्षकांना विषय व तुकड्या नेमून द्या.\n   • Student Directory: विद्यार्थी यादी, उपस्थिती व फी स्थिती पहा.\n   • Calendar, Result Analytics & Circulars: शैक्षणिक दिनदर्शिका, निकाल विश्लेषण आणि परिपत्रके प्रसिद्ध करा.\n\nथेट उघडण्यासाठी खालील OPEN COLLEGE PORTAL बटणावर क्लिक करा.',
    },
  },
  {
    id: 'institute_portal_support',
    priority: 88,
    keywords: [
      'institute', 'institutes', 'institute portal', 'coaching', 'coaching portal', 'coaching institute',
      'institute login', 'institute register', 'institute dashboard', 'batches', 'batch management',
      'fee ledger', 'mock test series', 'इन्स्टिट्यूट', 'कोचिंग', 'संस्था पोर्टल'
    ],
    actionIds: () => ['open_institute_portal', 'open_register', 'open_login'],
    responses: {
      en: () =>
        'Institute Portal Guide — Step by Step:\n1. Registration & Login: Click the "Institute Portal" card on the homepage, select Register as Institute, and fill in your Coaching/Academy Name, Registration Code, Focus Stream (Scholarship/Foundation/Olympiad/Skill Academy), Official Email, Mobile, and Password.\n2. Institute Dashboard & Management Features:\n   • Batches & Schedules: Create and manage morning/evening coaching batches, timings, mentors, and seat capacity.\n   • Mock Test Series: Conduct Scholarship, Olympiad, Foundation, and TET/CTET mock test series and view top scores.\n   • 18 Skill Academy Programs: Run Abacus, Vedic Maths, English Phonics, Coding, Handwriting, Robotics, and more.\n   • Trainer Roster & Fee Ledger: Manage faculty assignments, fee collection status, and issue Course Completion Certificates.\n\nClick OPEN INSTITUTE PORTAL below to open the Institute Portal.',
      hi: () =>
        'Institute Portal (कोचिंग व स्किल इंस्टीट्यूट पोर्टल) — चरण-दर-चरण मार्गदर्शिका:\n1. रजिस्ट्रेशन और लॉगिन: होमपेज पर "Institute Portal" कार्ड पर क्लिक करें, Register में अपने इंस्टीट्यूट का नाम, कोड, फोकस स्ट्रीम, ईमेल, मोबाइल और पासवर्ड दर्ज करें।\n2. इंस्टीट्यूट डैशबोर्ड की प्रबंधन सुविधाएँ:\n   • Batches & Schedules: कोचिंग बैच, समय, मेंटर और छात्र क्षमता प्रबंधित करें।\n   • Mock Test Series: स्कॉलरशिप, ओलंपियाड, फाउंडेशन और TET/CTET मॉक टेस्ट सीरीज़ चलाएँ।\n   • 18 Skill Academy Programs: अबेकस, वैदिक मैथ्स, फोनिक्स, कोडिंग आदि कोर्स संचालित करें।\n   • Trainer Roster, Fee Ledger & Certificates: ट्रेनर सूची, फीस लेजर और कोर्स सर्टिफिकेट जारी करें।\n\nनीचे OPEN INSTITUTE PORTAL बटन दबाकर सीधे खोलें।',
      mr: () =>
        'Institute Portal (कोचिंग व कौशल्य संस्था पोर्टल) — पायरी-पायरीने माहिती:\n1. नोंदणी आणि लॉगिन: मुख्यपृष्ठावरील "Institute Portal" कार्डवर क्लिक करा, Register मध्ये संस्थेचे नाव, नोंदणी कोड, मुख्य विभाग, ईमेल, मोबाइल व पासवर्ड भरा.\n2. इन्स्टिट्यूट डॅशबोर्डवरील व्यवस्थापन सुविधा:\n   • Batches & Schedules: कोचिंग बॅचेस, वेळ, मार्गदर्शक आणि विद्यार्थी क्षमता व्यवस्थापित करा.\n   • Mock Test Series: शिष्यवृत्ती, ऑलिम्पियाड, फाउंडेशन व TET/CTET सराव चाचण्या घ्या.\n   • 18 Skill Academy Programs: अबॅकस, वैदिक गणित, फोनिक्स, कोडिंग इत्यादी १८ उपक्रम चालवा.\n   • Trainer Roster, Fee Ledger & Certificates: प्रशिक्षक यादी, फी लेजर आणि कोर्स पूर्णत्वाची प्रमाणपत्रे द्या.\n\nथेट उघडण्यासाठी खालील OPEN INSTITUTE PORTAL बटणावर क्लिक करा.',
    },
  },
  {
    id: 'teacher_lesson_planner_and_assignments',
    priority: 87,
    keywords: [
      'lesson plan', 'lesson planner', 'annual plan', 'monthly plan', 'daily plan',
      'assignment', 'create assignment', 'homework', 'student management', 'manage students',
      'लेसन प्लानर', 'असाइनमेंट', 'पाठ्याचे नियोजन', 'टाचण'
    ],
    actionIds: () => ['open_lesson_planner', 'open_teacher_resources', 'open_ai_tools'],
    responses: {
      en: () =>
        'Teacher Support — Lesson Planner, Assignments & Student Management:\n1. How to Use the Lesson Planner:\n   • Open the Teacher Portal and click "Lesson Planner" (or click OPEN TEACHER LESSON PLANNER below).\n   • Select your Board (Maharashtra / CBSE / ICSE), Medium, Class (1–10), and Subject.\n   • Switch between Annual Plan, Monthly Plan, and Daily Lesson Plan tabs, customize school holidays in the School Calendar Drawer, and export clean A4 PDFs.\n2. Assignment & Worksheet Creation:\n   • Use the Teacher AI Generator / Worksheet & Question Paper Maker in the Teacher Portal to generate custom assignments, chapter tests, and answer keys.\n3. Student Management:\n   • Track student attendance, review submitted worksheets/quizzes, and monitor class performance from your Teacher Dashboard.',
      hi: () =>
        'टीचर सपोर्ट — लेसन प्लानर, असाइनमेंट और छात्र प्रबंधन:\n1. Lesson Planner कैसे उपयोग करें:\n   • Teacher Portal में "Lesson Planner" खोलें (या नीचे OPEN TEACHER LESSON PLANNER दबाएँ)।\n   • अपना बोर्ड (Maharashtra / CBSE / ICSE), माध्यम, कक्षा (1–10) और विषय चुनें।\n   • Annual Plan, Monthly Plan और Daily Lesson Plan तैयार करें और A4 PDF डाउनलोड/प्रिंट करें।\n2. Assignment और Worksheet निर्माण:\n   • Teacher AI Generator से कस्टम वर्कशीट, प्रश्न-पत्र और उत्तर-कुंजी तैयार करें।\n3. Student Management:\n   • टीचर डैशबोर्ड से छात्रों की उपस्थिति, क्विज़ स्कोर और प्रगति ट्रैक करें।',
      mr: () =>
        'शिक्षक मदत — लेसन प्लानर, असाइनमेंट आणि विद्यार्थी व्यवस्थापन:\n1. Lesson Planner कसा वापरावा:\n   • Teacher Portal मध्ये "Lesson Planner" उघडा (किंवा खालील OPEN TEACHER LESSON PLANNER दाबा).\n   • तुमचे बोर्ड (Maharashtra / CBSE / ICSE), माध्यम, इयत्ता (१–१०) आणि विषय निवडा.\n   • वार्षिक (Annual), मासिक (Monthly) आणि दैनंदिन (Daily) पाठ टाचण तयार करा व A4 PDF डाउनलोड करा.\n2. Assignment व Worksheet तयार करणे:\n   • Teacher AI Generator वापरून सरावपत्रिका, प्रश्नपत्रिका व उत्तरसूची तयार करा.\n3. विद्यार्थी व्यवस्थापन:\n   • शिक्षक डॅशबोर्डवरून विद्यार्थ्यांची उपस्थिती, गुण आणि प्रगती तपासा.',
    },
  },
  {
    id: 'ai_generator_and_tools',
    priority: 86,
    keywords: [
      'ai generator', 'ai tool', 'ai tools', 'how to use ai', 'learning tools', 'pdf maker',
      'notes generator', 'worksheet generator', 'presentation maker',
      'dictionary', 'trilingual dictionary', 'thought of the day', 'शब्दकोश', 'सुविचार', 'एआई जनरेटर'
    ],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_question_paper_generator', 'open_ai_tools', 'open_lesson_planner']
        : ['open_ai_tools', 'open_dictionary', 'open_thought_of_the_day'],
    responses: {
      en: (_c, _b, role) =>
        role === 'teacher'
          ? 'How Teachers Use MyStudyZone 40+ AI Tools Studio Step by Step:\n1. Open AI Tools Studio via "40 AI Tools" in your Teacher bar (or click OPEN AI GENERATOR & TOOLS / OPEN QUESTION PAPER GENERATOR below).\n2. Choose from 40 Teacher Productivity Tools (Lesson Plans, Question Papers, Worksheets, Rubrics, PTM Circulars) or Core 10 AI Generators.\n3. Select your Board (Maharashtra / CBSE / ICSE), Class (1–10), Subject, Medium, and Chapter/Topic.\n4. Click Generate and export clean PDF, Word (.docx), Excel (.xlsx), or PowerPoint (.pptx) files.'
          : 'How to Use the MyStudyZone AI Generator & Learning Tools Step by Step:\n1. AI Generator Studio (30+ Student Tools & Core Generators):\n   • Click "Learning Tools" on the homepage or "AI Tools Studio" inside your portal (or click OPEN AI GENERATOR & TOOLS below).\n   • Pick a tool (Notes Generator, Worksheet Generator, Question Paper Maker, Quiz Generator, Presentation Slides, Flashcards, or PDF Maker).\n   • Select your Board, Class (1–10), Subject, Language (English / Marathi / Hindi), and enter your Chapter or Topic.\n   • Click Generate to get structured educational content ready to view or export.\n2. Trilingual Dictionary (English–Marathi–Hindi):\n   • Type any single word in English, Marathi, or Hindi to view its pronunciation, simple & detailed meanings in all 3 languages, synonyms, antonyms, and example sentences.\n3. Thought of the Day:\n   • Explore 1,000+ verified motivational and educational thoughts in English, Marathi, and Hindi.',
      hi: () =>
        'MyStudyZone AI Generator और Learning Tools का उपयोग कैसे करें:\n1. AI Generator Studio:\n   • होमपेज पर "Learning Tools" या पोर्टल में "AI Tools Studio" खोलें (या नीचे OPEN AI GENERATOR & TOOLS दबाएँ)।\n   • अपना टूल चुनें (Worksheet Generator, Notes Generator, Question Paper, Quiz या Slides)।\n   • बोर्ड, कक्षा (1–10), विषय, भाषा (English/Marathi/Hindi) और टॉपिक भरकर Generate दबाएँ।\n2. Trilingual Dictionary (अंग्रेजी–मराठी–हिंदी शब्दकोश):\n   • किसी भी एक शब्द को खोजें और तीनों भाषाओं में अर्थ, उच्चारण, समानार्थी, विरुद्धार्थी और उदाहरण वाक्य देखें।\n3. Thought of the Day:\n   • तीनों भाषाओं में 1,000+ प्रेरणादायक सुविचार पढ़ें।',
      mr: () =>
        'MyStudyZone AI Generator आणि Learning Tools कसे वापरावे:\n1. AI Generator Studio:\n   • मुख्यपृष्ठावर "Learning Tools" किंवा पोर्टलमध्ये "AI Tools Studio" उघडा (किंवा खालील OPEN AI GENERATOR & TOOLS दाबा).\n   • आवश्यक टूल निवडा (Worksheet Generator, Notes Generator, Question Paper, Quiz किंवा Slides).\n   • बोर्ड, इयत्ता (१–१०), विषय, भाषा (English/Marathi/Hindi) आणि घटक टाकून Generate वर क्लिक करा.\n2. Trilingual Dictionary (इंग्रजी–मराठी–हिंदी शब्दकोश):\n   • कोणताही एक शब्द शोधा आणि तिन्ही भाषांमध्ये अर्थ, उच्चार, समानार्थी, विरुद्धार्थी शब्द व उदाहरणे पहा.\n3. Thought of the Day (आजचा सुविचार):\n   • इंग्रजी, मराठी आणि हिंदीतील १,०००+ प्रेरणादायी सुविचार वाचा.',
    },
  },
  {
    id: 'teacher_resources',
    priority: 85,
    keywords: [
      'teacher resources', 'teaching resources', 'teaching material', 'teacher portal', 'teacher dashboard',
      'teacher facility', 'teacher facilities', 'for teachers', 'educator', 'techer', 'shikshak',
      'how to access teacher portal', 'शिक्षक', 'अध्यापन'
    ],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_teacher_resources', 'open_lesson_planner', 'open_question_paper_generator', 'open_tet_ctet']
        : ['open_teacher_login', 'open_teacher_resources', 'open_lesson_planner', 'open_tet_ctet'],
    responses: {
      en: () =>
        'How to Access & Use the MyStudyZone Teacher Portal:\n1. From the homepage, click the "Teacher Portal" card (or click Login / Register → select Teacher).\n2. Inside the Teacher Portal, you get unified access to:\n   • Teacher Lesson Planner (Annual, Monthly & Daily plans with A4 PDF export)\n   • AI Worksheet, Question Paper & Assignment Generators\n   • Classes 1 to 10 curriculum across Maharashtra State Board, CBSE, and ICSE\n   • Class-wise interactive Worksheets, Chapter Study Notes & 4-Level Quizzes\n   • MAHA TET & CTET (Paper 1 & Paper 2) mock tests and 4th & 7th Scholarship prep\n\nClick OPEN TEACHER PORTAL or OPEN TEACHER LESSON PLANNER below to begin.',
      hi: () =>
        'MyStudyZone टीचर पोर्टल कैसे खोलें और उपयोग करें:\n1. होमपेज पर "Teacher Portal" कार्ड पर क्लिक करें (या Login / Register → Teacher चुनें)।\n2. टीचर पोर्टल में शिक्षकों के लिए उपलब्ध सुविधाएँ:\n   • Teacher Lesson Planner (वार्षिक, मासिक व दैनिक पाठ योजना + A4 PDF एक्सपोर्ट)\n   • AI वर्कशीट, प्रश्न-पत्र और असाइनमेंट जनरेटर\n   • महाराष्ट्र बोर्ड, CBSE और ICSE के कक्षा 1 से 10 तक के नोट्स व वर्कशीट\n   • MAHA TET और CTET (पेपर 1 व 2) तथा स्कॉलरशिप मॉक टेस्ट।\n\nसीधे जाने के लिए नीचे दिए बटन पर क्लिक करें।',
      mr: () =>
        'MyStudyZone शिक्षक पोर्टल कसे उघडावे आणि वापरावे:\n1. मुख्यपृष्ठावरील "Teacher Portal" कार्डवर क्लिक करा (किंवा Login / Register → Teacher निवडा).\n2. शिक्षक पोर्टलवरील प्रमुख सुविधा:\n   • Teacher Lesson Planner (वार्षिक, मासिक व दैनंदिन पाठ नियोजन + A4 PDF प्रिंट)\n   • AI वर्कशीट, प्रश्नपत्रिका व असाइनमेंट जनरेटर\n   • महाराष्ट्र बोर्ड, CBSE व ICSE मधील इयत्ता १ ते १० चे सर्व विषय, नोट्स व वर्कशीट्स\n   • MAHA TET आणि CTET (पेपर १ व २) मॉक टेस्ट.\n\nखालील बटणावर क्लिक करून थेट प्रवेश करा.',
    },
  },
  {
    id: 'tet_ctet',
    priority: 82,
    keywords: ['tet', 'ctet', 'maha tet', 'mahatet', 'paper 1', 'paper 2', 'टीईटी', 'सीटीईटी'],
    actionIds: () => ['open_tet_ctet', 'open_demo'],
    responses: {
      en: () =>
        'In the TET & CTET Exam Prep section, teachers and aspirants can access:\n• Maharashtra TET (Paper 1 & Paper 2)\n• CTET Paper 1 (Classes 1–5) and CTET Paper 2 (Classes 6–8)\n• Free Demo Mock Tests with real 150-minute countdown timers and detailed solutions, plus full mock test series plans.',
      hi: () =>
        'TET और CTET Exam Prep अनुभाग में आपको मिलता है:\n• महाराष्ट्र TET (पेपर 1 व पेपर 2)\n• CTET पेपर 1 (कक्षा 1–5) और CTET पेपर 2 (कक्षा 6–8)\n• रियल टाइमर और समाधान सहित फ्री डेमो मॉक टेस्ट तथा पूर्ण मॉक टेस्ट सीरीज।',
      mr: () =>
        'TET आणि CTET Exam Prep विभागात उपलब्ध सुविधा:\n• महाराष्ट्र TET (पेपर १ व पेपर २)\n• CTET पेपर १ (इयत्ता १–५) आणि CTET पेपर २ (इयत्ता ६–८)\n• अचूक टाइमर व स्पष्टीकरणासह मोफत डेमो मॉक टेस्ट तसेच संपूर्ण मॉक टेस्ट सिरीज.',
    },
  },
  {
    id: 'scholarship',
    priority: 80,
    keywords: ['scholarship', 'sholarship', 'msce', 'pse', 'ups', 'शिष्यवृत्ती', 'स्कॉलरशिप'],
    actionIds: () => ['open_scholarship', 'open_demo'],
    responses: {
      en: () =>
        'MyStudyZone Scholarship Corner follows the MSCE Pune pattern for Standard 4th (PSE) and Standard 7th (UPS):\n• Paper 1: First Language (English) & Mathematics\n• Paper 2: Third Language (Marathi) & Intelligence Test\n• Includes free interactive demo mock tests (90-minute timer, question palette & solutions) as well as full mock test sets.',
      hi: () =>
        'MyStudyZone स्कॉलरशिप कॉर्नर में MSCE पुणे पैटर्न के अनुसार कक्षा 4थी (PSE) और कक्षा 7वीं (UPS) की तैयारी उपलब्ध है:\n• पेपर 1: प्रथम भाषा (English) और गणित\n• पेपर 2: तृतीय भाषा (Marathi) और बुद्धिमत्ता चाचणी\n• 90-मिनट टाइमर वाला फ्री डेमो मॉक टेस्ट और पूर्ण मॉक सेट उपलब्ध हैं।',
      mr: () =>
        'MyStudyZone स्कॉलरशिप कॉर्नरमध्ये MSCE पुणे अभ्यासक्रमानुसार इयत्ता ४ थी (PSE) आणि इयत्ता ७ वी (UPS) साठी संपूर्ण सराव उपलब्ध आहे:\n• पेपर १: प्रथम भाषा (English) व गणित\n• पेपर २: तृतीय भाषा (मराठी) व बुद्धिमत्ता चाचणी\n• ९० मिनिटांच्या टाइमरसह मोफत डेमो मॉक टेस्ट आणि संपूर्ण प्रश्नसंच उपलब्ध आहेत.',
    },
  },
  {
    id: 'worksheets',
    priority: 78,
    keywords: ['worksheet', 'worksheets', 'workshets', 'exercise', 'exercises', 'practice sheet', 'how to access worksheets', 'वर्कशीट', 'सरावपत्रिका'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_worksheets', 'open_ai_tools', 'open_lesson_planner']
        : ['open_worksheets', 'open_quizzes'],
    responses: {
      en: (cls, board, role) => {
        const scope = [board ? `${board} Board` : '', cls || 'Classes 1–10'].filter(Boolean).join(' • ');
        if (role === 'teacher') {
          return `How Teachers Access & Create Worksheets (${scope}) Step by Step:\n1. Click "Worksheets" in your Teacher bar (or OPEN WORKSHEETS below) to inspect ready-made interactive board & class worksheets (Classes 1–10).\n2. Select Education Board (Maharashtra / CBSE / ICSE), Class (1–10), and Subject.\n3. To generate custom printable classroom worksheets with answer keys, open 40 AI Tools → "Worksheet Generator" (or click OPEN AI GENERATOR & TOOLS below).`;
        }
        return `How to Access Worksheets (${scope}) Step by Step:\n1. Click the "Worksheets" card on your dashboard or homepage (or click OPEN WORKSHEETS below).\n2. Select your Education Board (Maharashtra / CBSE / ICSE), Class (1–10), and Subject.\n3. Click any chapter worksheet to solve interactive questions online with instant scoring and explanations.\n• Free Plan: 2 Demo Worksheets (English & Mathematics) for your registered Board & Class.\n• Premium ₹99 (365 Days): Unlocks all subjects' worksheets for that Board & Class.\n• Note: Student worksheets are interactive online resources (printing/offline downloads are disabled).`;
      },
      hi: (cls, board, role) => {
        const scope = [board ? `${board} बोर्ड` : '', cls || 'कक्षा 1 से 10'].filter(Boolean).join(' • ');
        if (role === 'teacher') {
          return `शिक्षकों के लिए वर्कशीट (${scope}) उपयोग करने के चरण:\n1. टीचर बार में "Worksheets" खोलें (या नीचे OPEN WORKSHEETS दबाएँ) और बोर्ड, कक्षा व विषय चुनें।\n2. कस्टम प्रिंटेबल वर्कशीट व उत्तर-कुंजी बनाने के लिए 40 AI Tools → "Worksheet Generator" का उपयोग करें।`;
        }
        return `वर्कशीट (${scope}) कैसे खोलें — चरण-दर-चरण:\n1. होमपेज या डैशबोर्ड पर "Worksheets" कार्ड पर क्लिक करें (या नीचे OPEN WORKSHEETS दबाएँ)।\n2. अपना बोर्ड, कक्षा (1–10) और विषय चुनें।\n3. किसी भी अध्याय की वर्कशीट खोलकर ऑनलाइन प्रश्न हल करें और तुरंत स्कोर देखें।\n• फ्री प्लान: पंजीकृत बोर्ड व कक्षा की 2 डेमो वर्कशीट (English और Maths) मुफ्त हैं।\n• ₹99 (365 दिन) प्लान: उस कक्षा के सभी विषयों की वर्कशीट अनलॉक करता है।`;
      },
      mr: (cls, board, role) => {
        const scope = [board ? `${board} बोर्ड` : '', cls || 'इयत्ता १ ते १०'].filter(Boolean).join(' • ');
        if (role === 'teacher') {
          return `शिक्षकांसाठी वर्कशीट्स (${scope}) वापरण्याच्या पायऱ्या:\n1. टीचर बारमधून "Worksheets" उघडा (किंवा खालील OPEN WORKSHEETS दाबा) आणि बोर्ड, इयत्ता व विषय निवडा.\n2. नवीन प्रिंट करण्यायोग्य सरावपत्रिका तयार करण्यासाठी 40 AI Tools → "Worksheet Generator" वापरा.`;
        }
        return `वर्कशीट्स (${scope}) कशा उघडाव्यात — पायरी-पायरीने:\n1. मुख्यपृष्ठ किंवा डॅशबोर्डवरील "Worksheets" कार्डवर क्लिक करा (किंवा खालील OPEN WORKSHEETS दाबा).\n2. तुमचे बोर्ड, इयत्ता (१–१०) आणि विषय निवडा.\n3. कोणत्याही धड्याची वर्कशीट निवडून ऑनलाइन प्रश्न सोडवा व लगेच गुण पहा.\n• मोफत प्लान: नोंदणीकृत बोर्ड व इयत्तेसाठी २ डेमो वर्कशीट्स (English व Maths) मोफत आहेत.\n• ₹९९ (३६५ दिवस) प्लान: त्या इयत्तेचे सर्व विषय खुले करतो.`;
      },
    },
  },
  {
    id: 'syllabus_and_notes',
    priority: 76,
    keywords: [
      'syllabus', 'silabus', 'sylabus', 'curriculum', 'study material', 'study materials',
      'notes', 'chapter notes', 'textbook', 'summary', 'find subjects', 'find chapters',
      'where to find study notes', 'how to find notes', 'abhyaskram', 'अभ्यासक्रम', 'सिलेबस', 'नोट्स'
    ],
    actionIds: () => ['open_syllabus', 'open_all_courses'],
    responses: {
      en: (cls, board, role) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'Classes 1 to 10'].join(' • ');
        const portalHint = role === 'teacher' ? 'Teacher Study Library' : 'Student Portal → Study Materials';
        return `Where to Find Subjects, Chapters & Study Notes (${scope}) Step by Step:\n1. Open ${portalHint} or "Study Notes" (or click OPEN SYLLABUS & STUDY NOTES below).\n2. Step 1: Select your Board (Maharashtra State Board, CBSE, or ICSE), Medium (English / Marathi / Hindi / Semi-English), and Standard (Class 1 to 10).\n3. Step 2: Click on any Subject card (e.g., Mathematics, Science, English, History).\n4. Step 3: Select your Chapter from the clean chapter list to read detailed study notes, key definitions, formulas, solved examples, and revision checklists.`;
      },
      hi: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'कक्षा 1 से 10'].join(' • ');
        return `विषय, अध्याय और स्टडी नोट्स (${scope}) कहाँ और कैसे ढूँढें:\n1. Study Notes / Study Materials पर क्लिक करें (या नीचे OPEN SYLLABUS & STUDY NOTES दबाएँ)।\n2. चरण 1: अपना बोर्ड (Maharashtra / CBSE / ICSE), माध्यम और कक्षा (1–10) चुनें।\n3. चरण 2: अपने विषय (Subject) कार्ड पर क्लिक करें।\n4. चरण 3: अध्याय (Chapter) की सूची से कोई भी पाठ चुनें और विस्तृत नोट्स, सूत्र, हल किए गए उदाहरण व रिवीजन चेकलिस्ट पढ़ें।`;
      },
      mr: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'इयत्ता १ ते १०'].join(' • ');
        return `विषय, धडे आणि स्टडी नोट्स (${scope}) कुठे व कसे शोधावेत:\n1. Study Notes / Study Materials वर क्लिक करा (किंवा खालील OPEN SYLLABUS & STUDY NOTES दाबा).\n2. पायरी १: तुमचे बोर्ड (Maharashtra / CBSE / ICSE), माध्यम आणि इयत्ता (१–१०) निवडा.\n3. पायरी २: विषयाच्या (Subject) कार्डवर क्लिक करा.\n4. पायरी ३: धड्यांच्या यादीतून कोणताही धडा निवडा आणि सविस्तर स्टडी नोट्स, सूत्रे, सोडवलेली उदाहरणे व उजळणी चेकलिस्ट वाचा.`;
      },
    },
  },
  {
    id: 'download_resources',
    priority: 90,
    keywords: ['download', 'downlod', 'pdf', 'print', 'save offline', 'डाउनलोड', 'प्रिंट'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_lesson_planner', 'open_question_paper_generator', 'open_ai_tools']
        : ['open_worksheets', 'open_syllabus', 'open_certificates'],
    responses: {
      en: (_c, _b, role) =>
        role === 'teacher'
          ? 'Teacher Export & Print Rules on MyStudyZone:\n• Teachers CAN export Annual, Monthly, and Daily Lesson Plans as clean A4 PDFs directly from the Teacher Lesson Planner.\n• Teachers CAN export AI-generated Question Papers, Worksheets, Revision Notes, Timetables & Rubrics as PDF, DOCX, XLSX, or PPTX from 40 AI Tools Studio.\n• Built-in Student Chapter Worksheets and Study Materials remain online-only interactive modules.'
          : 'Important accuracy note about downloads on MyStudyZone:\n• Student Worksheets and Study Materials are strictly online interactive resources — offline PDF downloading and printing are disabled to protect educational content.\n• Teachers CAN export their Annual, Monthly, and Daily Lesson Plans as A4 PDFs from the Teacher Lesson Planner.\n• Students CAN view/print earned Milestone Champion Certificates from Certificates & Leaderboard, and save Drawing Studio artwork in their gallery.',
      hi: () =>
        'डाउनलोड से जुड़ी सही जानकारी:\n• छात्रों की वर्कशीट और स्टडी नोट्स ऑनलाइन इंटरैक्टिव उपयोग के लिए हैं — इनका PDF डाउनलोड या प्रिंट करना बंद रखा गया है।\n• शिक्षक Teacher Lesson Planner से अपनी वार्षिक, मासिक व दैनिक पाठ योजना का A4 PDF डाउनलोड/प्रिंट कर सकते हैं।\n• छात्र अपने चैंपियन सर्टिफिकेट को Certificates & Leaderboard से प्रिंट कर सकते हैं।',
      mr: () =>
        'डाउनलोडबाबत अचूक माहिती:\n• विद्यार्थ्यांच्या वर्कशीट्स आणि स्टडी नोट्स फक्त ऑनलाइन सराव व वाचनासाठी आहेत — त्यांचे PDF डाउनलोड किंवा प्रिंट बंद आहे.\n• शिक्षक Teacher Lesson Planner मधून वार्षिक, मासिक व दैनंदिन पाठ नियोजनाची A4 PDF डाउनलोड/प्रिंट करू शकतात.\n• विद्यार्थी मिळवलेली चॅम्पियन प्रमाणपत्रे Certificates & Leaderboard मधून पाहू/प्रिंट करू शकतात.',
    },
  },
  {
    id: 'stories_and_shivaji',
    priority: 70,
    keywords: ['story', 'stories', 'moral', 'shivaji', 'maharaj', 'audio story', 'गोष्टी', 'कहानी', 'कहानियाँ', 'शिवाजी'],
    actionIds: (_c, _b, _r) => ['open_stories', 'open_shivaji'],
    responses: {
      en: () =>
        'MyStudyZone has two dedicated story sections:\n1. Story World: 45+ English, Hindi, and Marathi stories with natural voice audio narration, morals, and vocabulary.\n2. Chhatrapati Shivaji Maharaj Stories: 50 chronological Swarajya history chapters with voice narration.\n\nClick either button below to explore them.',
      hi: () =>
        'MyStudyZone में दो विशेष कहानी अनुभाग हैं:\n1. Story World: अंग्रेजी, हिंदी और मराठी में 45+ ऑडियो कहानियाँ (वॉइस नरेशन और नैतिक सीख सहित)।\n2. छत्रपति शिवाजी महाराज की कहानियाँ: स्वराज्य इतिहास के 50 क्रमानुसार अध्याय।\n\nनीचे दिए बटन से सीधे खोलें।',
      mr: () =>
        'MyStudyZone वर दोन खास गोष्टींचे विभाग आहेत:\n1. Story World: मराठी, हिंदी व इंग्रजी भाषेतील ४५+ ऑडिओ गोष्टी (आवाजात कथन व तात्पर्यासह).\n2. छत्रपती शिवाजी महाराज गोष्टी: स्वराज्याच्या इतिहासातील ५० क्रमानुसार अध्याय.\n\nखालील बटणांवर क्लिक करून उघडा.',
    },
  },
  {
    id: 'drawing_studio',
    priority: 68,
    keywords: ['drawing', 'paint', 'colouring', 'coloring', 'art', 'चित्रकला', 'ड्रॉइंग'],
    actionIds: () => ['open_drawing'],
    responses: {
      en: () =>
        'Our Drawing Studio includes 120+ interactive colouring templates, freehand drawing brushes, flood-fill paint bucket, shapes, and a saved artwork gallery inside the browser.',
      hi: () =>
        'Drawing Studio में 120+ कलरिंग टेम्पलेट, फ्रीहैंड ब्रश, पेंट बकेट टूल, शेप्स और आपकी बनाई गई ड्राइंग सेव करने के लिए गैलरी उपलब्ध है।',
      mr: () =>
        'Drawing Studio मध्ये १२०+ कलरिंग टेम्प्लेट्स, फ्रीहँड ब्रश, पेंट बकेट, आकार आणि तुमची चित्रे सेव करण्यासाठी आर्ट गॅलरी उपलब्ध आहे.',
    },
  },
  {
    id: 'quizzes_and_puzzles',
    priority: 65,
    keywords: ['quiz', 'quizzes', 'mcq', 'exam', 'exams', 'online exam', 'examination', 'puzzle', 'puzzles', 'sudoku', 'cricket', 'gk', 'ai academy', 'future skills', 'क्विज़', 'परीक्षा', 'कोडे', 'सुडोकू'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_tet_ctet', 'open_question_paper_generator', 'open_quizzes']
        : ['open_quizzes', 'open_scholarship', 'open_puzzles', 'open_sudoku'],
    responses: {
      en: (_c, _b, role) =>
        role === 'teacher'
          ? 'MyStudyZone Examination & Assessment Tools for Teachers:\n• MAHA TET & CTET (Paper 1 & 2): 200+ full-length 150-minute CBT mock tests with detailed solutions.\n• AI Question Paper & MCQ Generator: Create custom 20–100 mark exam papers or interactive MCQ quizzes for your classes.\n• Student 4-Level Quizzes & 4th/7th Scholarship Preview: Inspect practice sets across Maharashtra, CBSE & ICSE.'
          : 'Understanding MyStudyZone Examination & Quiz Features:\n• 4-Level Subject Practice Quizzes: Level 1 (Beginner) to Level 4 (Master) with zero-repeated-question tracking and instant explanations.\n• Competitive Mock Exams: 4th & 7th Standard MSCE Scholarship CBT Mocks (90-min timer).\n• Milestone Champion Certificates: Earn printable Gold/Silver/Bronze certificates and leaderboard rank points as you pass quizzes.\n• Free Brain Training: Brain Puzzles, 4×4/6×6/9×9 Sudoku, Cricket & GK Arena, and AI Learning Academy.',
      hi: () =>
        'MyStudyZone की ऑनलाइन परीक्षा (Examination) और क्विज़ सुविधाएँ:\n• 4-लेवल विषयवार प्रैक्टिस क्विज़: बिना दोहराए गए प्रश्नों और तत्काल समाधान के साथ।\n• प्रतियोगी मॉक परीक्षाएँ: कक्षा 4थी व 7वीं स्कॉलरशिप (90-मिनट टाइमर) और MAHA TET / CTET पेपर 1 व 2 (150-मिनट टाइमर)।\n• चैंपियन सर्टिफिकेट और लीडरबोर्ड: क्विज़ पास करने पर सर्टिफिकेट और रैंक पॉइंट्स मिलते हैं।\n• ब्रेन पज़ल्स, सुडोकू, क्रिकेट GK और AI Learning Academy।',
      mr: () =>
        'MyStudyZone वरील ऑनलाइन परीक्षा (Examination) आणि क्विझ सुविधा:\n• ४-लेव्हल विषयनिहाय सराव क्विझ: प्रश्न पुन्हा न येणारी प्रणाली आणि लगेच स्पष्टीकरण.\n• स्पर्धा परीक्षा मॉक टेस्ट: इयत्ता ४ थी व ७ वी शिष्यवृत्ती (९०-मिनिटे टाइमर) आणि MAHA TET / CTET पेपर १ व २ (१५०-मिनिटे टाइमर).\n• चॅम्पियन प्रमाणपत्रे व लीडरबोर्ड: सराव पूर्ण केल्यावर प्रमाणपत्र व गुण मिळतात.\n• ब्रेन पझल्स, सुडोकू, क्रिकेट GK आणि AI Learning Academy.',
    },
  },
  {
    id: 'registration_and_login',
    priority: 62,
    keywords: ['register', 'registration', 'sign up', 'signup', 'create account', 'how to register', 'login', 'log in', 'logout', 'sign in', 'नोंदणी', 'रजिस्ट्रेशन', 'लॉगिन', 'लॉगआउट'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_teacher_login', 'open_register', 'open_password_reset']
        : ['open_register', 'open_login', 'open_password_reset'],
    responses: {
      en: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'How to Register & Login to the Teacher Portal Step by Step:\n1. Click OPEN TEACHER REGISTRATION (or click Teacher Portal → Register as Teacher).\n2. Enter your Full Name, Qualification (B.Ed./D.Ed./M.Sc.), Subjects Taught, Board (Maharashtra/CBSE/ICSE), Experience, School Name, Email, Mobile & Password.\n3. After registering, click OPEN TEACHER LOGIN to open your Teacher Command Center (Lesson Planner, 40 AI Tools, Worksheets, TET/CTET Mocks).';
        }
        if (role === 'parent') {
          return 'How to Register & Login to the Parent Portal Step by Step:\n1. Click OPEN PARENT REGISTRATION (or click Parent Portal → Register as Parent).\n2. Enter your Parent Name, your Child’s Registered Student Email & Mobile (for account linking), your Email, and Password.\n3. Sign in anytime using OPEN PARENT LOGIN to monitor student progress, quiz reports, and attendance.';
        }
        if (role === 'college') {
          return 'How to Register & Login to the College Portal Step by Step:\n1. Click OPEN COLLEGE REGISTRATION (or click College Portal → Register as College/School).\n2. Fill in your Institution Name, UDISE / Registration Code, Principal/Admin Name, City, Official Email, Phone & Password.\n3. Sign in via OPEN COLLEGE LOGIN to manage divisions, faculty allocation, student roster, and result analytics.';
        }
        if (role === 'institute') {
          return 'How to Register & Login to the Institute Portal Step by Step:\n1. Click OPEN INSTITUTE REGISTRATION (or click Institute Portal → Register as Institute).\n2. Fill in your Institute Name, Registration Code, Director Name, Focus Stream, Official Email, Phone & Password.\n3. Sign in via OPEN INSTITUTE LOGIN to manage coaching batches, mock test series, 18 skill programs, and fee ledger.';
        }
        if (role === 'student') {
          return 'How to Register & Login as a Student Step by Step:\n1. Click OPEN STUDENT REGISTRATION below (or click Register at top-right → Student).\n2. Enter your Full Name, Education Board (Maharashtra / CBSE / ICSE), Standard/Class (1–10), Medium, School Name, Email, Mobile & Password.\n3. Sign in anytime via OPEN STUDENT LOGIN to access Study Notes, Worksheets, Quizzes, Scholarship & Trilingual Dictionary.';
        }
        return 'How to Register & Login on MyStudyZone Step by Step:\n1. Click the "Register" button at the top-right of the homepage (or click OPEN REGISTRATION below), OR click any of the 5 portal cards (Student, Teacher, Parent, College, or Institute).\n2. Each portal has its own dedicated registration form:\n   • Student: Name, Board (Maharashtra/CBSE/ICSE), Class (1–10), Medium, School Name, Email, Mobile & Password.\n   • Teacher: Name, Qualification, Subjects Taught, Board, Experience, School Name, Email, Mobile & Password.\n   • Parent: Parent Name, Child’s Student Email & Mobile (for linking), Email & Password.\n   • College: College/School Name, UDISE/Registration Code, Principal/Admin Name, City, Official Email, Phone & Password.\n   • Institute: Institute Name, Registration Code, Director Name, Focus Stream, Official Email, Phone & Password.\n3. After registering, sign in anytime using Login and your role will open your dedicated portal dashboard automatically.';
      },
      hi: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'टीचर पोर्टल में रजिस्ट्रेशन और लॉगिन कैसे करें:\n1. नीचे OPEN TEACHER REGISTRATION दबाएँ।\n2. अपना नाम, योग्यता, पढ़ाए जाने वाले विषय, बोर्ड, स्कूल, ईमेल, मोबाइल और पासवर्ड भरें।\n3. रजिस्ट्रेशन के बाद OPEN TEACHER LOGIN से सीधे Teacher Command Center खोलें।';
        }
        return 'MyStudyZone पर रजिस्ट्रेशन और लॉगिन कैसे करें — चरण-दर-चरण:\n1. होमपेज के ऊपर दाईं ओर "Register" बटन पर क्लिक करें (या नीचे OPEN REGISTRATION दबाएँ), या किसी भी पोर्टल कार्ड (Student, Teacher, Parent, College, Institute) को चुनें।\n2. प्रत्येक पोर्टल का अपना अलग रजिस्ट्रेशन फॉर्म है — अपना नाम, ईमेल, मोबाइल व पासवर्ड भरकर अकाउंट बनाएँ।\n3. रजिस्ट्रेशन के बाद Login से कभी भी अपने पोर्टल डैशबोर्ड में प्रवेश करें।';
      },
      mr: (_c, _b, role) => {
        if (role === 'teacher') {
          return 'शिक्षक पोर्टलवर नोंदणी आणि लॉगिन कसे करावे:\n1. खालील OPEN TEACHER REGISTRATION वर क्लिक करा.\n2. तुमचे नाव, पात्रता, शिकवले जाणारे विषय, बोर्ड, शाळा, ईमेल, मोबाइल व पासवर्ड भरा.\n3. नोंदणीनंतर OPEN TEACHER LOGIN वापरून थेट Teacher Command Center उघडा.';
        }
        return 'MyStudyZone वर नोंदणी (Registration) आणि लॉगिन कसे करावे — पायरी-पायरीने:\n1. मुख्यपृष्ठावर उजवीकडे "Register" बटणावर क्लिक करा (किंवा खालील OPEN REGISTRATION दाबा), किंवा ५ पैकी कोणत्याही पोर्टल कार्डवर क्लिक करा.\n2. तुमच्या पोर्टलनुसार नाव, ईमेल, मोबाइल व पासवर्ड भरून खाते तयार करा.\n3. नोंदणीनंतर Login वापरून कधीही तुमच्या पोर्टल डॅशबोर्डवर प्रवेश करा.';
      },
    },
  },
  {
    id: 'boards_and_plans',
    priority: 60,
    keywords: ['maharashtra', 'cbse', 'icse', 'subscription plan', 'plan details', 'free plan', 'premium plan', 'price', 'pricing', '99', 'fee', 'subscription', 'payment', 'प्लान', 'फीस', 'बोर्ड'],
    actionIds: (_c, _b, role) =>
      role === 'teacher' ? ['open_tet_ctet', 'open_plans'] : ['open_all_courses', 'open_plans'],
    responses: {
      en: (_c, _b, role) =>
        role === 'teacher'
          ? 'Teacher Subscription Plans & Pricing on MyStudyZone:\n• TEACHER PLANS – MAHA TET & CTET (Paper 1 & 2):\n  – TET Only (Paper 1 & 2): 6 Months ₹199 | 1 Year ₹299\n  – CTET Only (Paper 1 & 2): 6 Months ₹199 | 1 Year ₹299\n  – Combo Offer (TET + CTET Paper 1 & 2): 6 Months ₹349 | 1 Year ₹499\n• SCHOOL CLASS ACCESS (Classes 1–10 across Maharashtra, CBSE & ICSE): Free ₹0 Demo Plan or ₹99 / 365 Days per Board & Class.'
          : 'MyStudyZone Subscription & Payment Guide (Classes 1 to 10 across Maharashtra, CBSE & ICSE Boards):\n• FREE PLAN (₹0 Lifetime): Includes 2 Demo Worksheets (English & Math), English & Math Quizzes, Brain Puzzles, Sudoku, Trilingual Dictionary, Thought of the Day, and Chapter 1 sample notes.\n• SCHOOL PREMIUM PLAN (₹99 / 365 Days): Full 1-year unlock of all subjects, chapter study notes, interactive worksheets, 4-level quizzes, stories, drawing studio, cricket GK & AI learning academy for your selected Board & Class.\n• SCHOLARSHIP COMBO (Std 4th & 7th): ₹99 / 365 Days.',
      hi: () =>
        'MyStudyZone सब्सक्रिप्शन और पेमेंट जानकारी (महाराष्ट्र बोर्ड, CBSE और ICSE — कक्षा 1 से 10):\n• FREE PLAN (₹0 लाइफटाइम): 2 डेमो वर्कशीट, English/Maths क्विज़, पज़ल्स, सुडोकू, शब्दकोश, सुविचार और सैंपल नोट्स।\n• SCHOOL PREMIUM PLAN (₹99 / 365 दिन): चुने हुए बोर्ड व कक्षा के सभी विषय, वर्कशीट, नोट्स, कहानियाँ, ड्राइंग, क्रिकेट GK और AI अकादमी पूरे 1 वर्ष के लिए अनलॉक।\n• TEACHER PLANS – TET & CTET (Paper 1 & 2):\n  – TET या CTET: 6 माह ₹199 | 1 वर्ष ₹299\n  – Combo Offer (TET + CTET): 6 माह ₹349 | 1 वर्ष ₹499।',
      mr: () =>
        'MyStudyZone सबस्क्रिप्शन व पेमेंट माहिती (महाराष्ट्र बोर्ड, CBSE आणि ICSE — इयत्ता १ ते १०):\n• FREE PLAN (₹० आजीवन): २ डेमो वर्कशीट्स, English/Maths क्विझ, पझल्स, सुडोकू, शब्दकोश, सुविचार व नमुना नोट्स.\n• SCHOOL PREMIUM PLAN (₹९९ / ३६५ दिवस): निवडलेल्या बोर्ड व इयत्तेसाठी सर्व विषय, वर्कशीट्स, स्टडी नोट्स, गोष्टी, ड्रॉइंग, क्रिकेट GK व AI अकादमी १ वर्षासाठी पूर्णपणे खुले होतात.\n• TEACHER PLANS – TET & CTET (Paper 1 & 2):\n  – TET किंवा CTET: ६ महिने ₹१९९ | १ वर्ष ₹२९९\n  – Combo Offer (TET + CTET): ६ महिने ₹३४९ | १ वर्ष ₹४९९.',
    },
  },
];

export function matchKnowledgeBaseFastPath(
  userMessage: string,
  options?: { userRole?: SupportPortalContext; includeComplexMatch?: boolean }
): FastPathSupportResponse {
  const raw = String(userMessage || '').trim();
  const language = detectQueryLanguage(raw);
  const detectedClass = extractClassLevel(raw);
  const detectedBoard = extractBoard(raw);
  const tokens = tokenizeNormalized(raw);
  const rawLower = raw.toLowerCase();

  // Check if message has complex/multi-question cues that deserve AI when available
  const isComplexMultiQuestion =
    raw.length > 160 ||
    raw.split('?').length > 2 ||
    /\b(difference|compare|why|suggest|recommend|error|stuck)\b/i.test(rawLower);

  let bestTopic: KbTopicDefinition | null = null;
  let bestScore = 0;

  for (const topic of KB_TOPICS) {
    let hits = 0;
    for (const kw of topic.keywords) {
      if (hasFuzzyKeyword(tokens, rawLower, [kw])) {
        hits += 1;
      }
    }
    if (hits > 0) {
      const score = topic.priority + hits * 5;
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }
  }

  // If high-priority unresolved account/login issue OR clear navigation/FAQ match (or fallback allowed):
  if (
    bestTopic &&
    (options?.includeComplexMatch ||
      bestTopic.id === 'unresolved_account_problem' ||
      bestTopic.id === 'password_reset' ||
      bestTopic.id === 'question_paper_generator' ||
      !isComplexMultiQuestion)
  ) {
    const actionIds = bestTopic.actionIds(detectedClass, detectedBoard, options?.userRole);
    const navigationActions = actionIds.map((id) =>
      buildNavigationAction(id, detectedClass, detectedBoard, options?.userRole)
    );
    return {
      matched: true,
      reply: bestTopic.responses[language](detectedClass, detectedBoard, options?.userRole),
      language,
      navigationActions,
      suggestSupportTicket: Boolean(bestTopic.suggestSupportTicket),
      topicId: bestTopic.id,
    };
  }

  return {
    matched: false,
    reply: '',
    language,
    navigationActions: [],
    suggestSupportTicket: false,
  };
}

export const HELP_DESK_SYSTEM_PROMPT = `
You are the official AI Help & Support Assistant for MyStudyZone (mystudyzone.in), a comprehensive Indian educational platform with FIVE dedicated portals:
1. Student Portal (Classes 1 to 10 across Maharashtra State Board, CBSE, and ICSE)
2. Teacher Portal (Lesson Planner, Question Paper & Worksheet Generators, Student Management, TET & CTET Prep)
3. Parent Portal (Child Account Linking, Student Progress Tracking, Exam Reports & Attendance)
4. College Portal (Classes/Streams/Divisions, Faculty Allocation, Student Directory, Institutional Calendar, Result Analytics & Circulars)
5. Institute Portal (Coaching Batches, Mock Test Series, 18 Skill Academy Programs like Abacus/Vedic Maths/Phonics, Trainer Roster, Fee Ledger & Certificates)

STRICT RESPONSE RULES — NEVER VIOLATE:
1. SIMPLE, FRIENDLY, PORTAL-SPECIFIC & STEP-BY-STEP:
   - Strictly respect "Current User Portal Context":
     • If Current User Portal Context is "teacher", give Teacher-specific answers and Teacher navigation buttons ONLY — never show Student-only topics unless the user explicitly asks about Students.
     • Apply the exact same strict portal isolation for "student", "parent", "college", and "institute".
   - Provide numbered step-by-step instructions whenever explaining how to register, login, generate a question paper, find study notes, access worksheets, use the Lesson Planner, link a child account, or use portal features.
2. ACCURACY ONLY — NEVER INVENT FEATURES:
   - Only describe features, boards, classes, plans, and sections that actually exist on MyStudyZone:
     • Student Support: Separate Student Registration & Login; Study Materials (Select Board -> Medium -> Standard Class 1–10 -> Subject -> Chapter -> View Notes); Online Interactive Worksheets; 4-Level Practice Quizzes; 4th & 7th MSCE Scholarship; Story World (45+ audio stories); Chhatrapati Shivaji Maharaj 50 chapters; Drawing Studio; Brain Puzzles & Sudoku; Trilingual Dictionary (English-Marathi-Hindi); Thought of the Day (1,000+ trilingual thoughts); Free ₹0 Plan vs ₹99 / 365 Days Class Plan.
     • Teacher Support: Separate Teacher Registration & Login; Teacher Lesson Planner (Annual, Monthly, and Daily Lesson Plans with School Calendar Drawer and A4 PDF export); AI Tools Studio -> AI Question Paper Generator (or 40 Teacher AI Tools -> #15 Question Paper Generator), Worksheet & Assignment Generators; Student Management & Performance tracking; MAHA TET & CTET (Paper 1 & 2) mock tests.
     • Parent Support: Separate Parent Registration & Login; connecting/linking with student accounts using the child's registered Student Email & Mobile; viewing subject-wise student progress, worksheet completion, quiz scorecards, and attendance reports.
     • College Support: Separate College/School Registration & Login (Institution Name, UDISE/Registration Code, Official Email); managing classes/streams/divisions, faculty subject allocation, student roster, institutional calendar, result analytics, and campus circulars.
     • Institute Support: Separate Coaching/Institute Registration & Login; managing coaching batches & timings, mock test series, 18 skill academy programs (Abacus, Vedic Maths, Phonics, Coding, etc.), trainer roster, fee ledger, and course completion certificates.
     • AI Question Paper Generator: Open "Learning Tools" / "AI Tools Studio" -> select "AI Question Paper Generator", pick Board, Class (1–10), Subject, Language, Chapter/Topic, Total Marks (20–100), Duration & Difficulty, and click Generate to produce a formal paper with Marking Scheme & PDF/DOCX export.
     • Download Rule: Student Worksheets and Study Notes are interactive online resources (PDF downloading/printing of student worksheets is disabled). Teachers CAN export Lesson Plans and AI Question Papers/Worksheets as PDFs, and students CAN print earned Champion Certificates.
3. PRIVACY & SECURITY:
   - Never expose other users' information.
   - Never request passwords, OTPs, API keys, bank details, or UPI/card PINs.
   - Never provide unauthorized account or payment information or claim to have automatically modified an account.
4. MULTILINGUAL SUPPORT:
   - Reply in the user's language: English ('en'), Hindi ('hi'), or Marathi ('mr').
5. NAVIGATION ACTIONS:
   - Choose 0 to 3 helpful navigationActionIds from this exact allowlist:
     open_question_paper_generator, open_worksheets, open_syllabus, open_all_courses, open_quizzes, open_scholarship, open_tet_ctet, open_teacher_resources, open_lesson_planner, open_student_portal, open_parent_portal, open_college_portal, open_institute_portal, open_ai_tools, open_dictionary, open_thought_of_the_day, open_stories, open_shivaji, open_drawing, open_puzzles, open_sudoku, open_cricket, open_ai_academy, open_other_programs, open_demo, open_certificates, open_referrals, open_profile, open_plans, open_login, open_teacher_login, open_register, open_password_reset, open_dashboard.
6. ADMIN SUPPORT ESCALATION:
   - If the AI cannot resolve a personal account, login, payment, class change, or technical problem, or if the user asks to contact support, set suggestSupportTicket=true and instruct them to click "SUBMIT A SUPPORT REQUEST" below to generate an official support ticket for the administrator.
`.trim();

