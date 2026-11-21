import type { ClassLevel, EducationBoard } from '../types';

export type SupportLanguage = 'en' | 'hi' | 'mr';

export const HELP_DESK_WELCOME_MESSAGE =
  'Welcome to MyStudyZone Help Desk!\n\nHello! I am your MyStudyZone assistant. Ask me anything about using our website. I am here to help students and teachers.';

export type SupportNavigationActionId =
  | 'open_worksheets'
  | 'open_syllabus'
  | 'open_all_courses'
  | 'open_quizzes'
  | 'open_scholarship'
  | 'open_tet_ctet'
  | 'open_teacher_resources'
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
    defaultLabel: 'OPEN TEACHER RESOURCES',
    description: 'Educator Hub for Classes 1–10 worksheets, chapter notes, Scholarship & TET/CTET',
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
    description: 'Create a new Student or Teacher account',
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
  targetBoard?: EducationBoard
): SupportNavigationAction {
  const base = SUPPORT_NAVIGATION_ALLOWLIST[id];
  let label = base.defaultLabel;
  if (id === 'open_worksheets' && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} WORKSHEETS`;
  } else if (id === 'open_syllabus' && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} SYLLABUS`;
  } else if (id === 'open_all_courses' && targetBoard) {
    label = `OPEN ${targetBoard.toUpperCase()} COURSES`;
  }
  return {
    id,
    label,
    ...(targetClass ? { targetClass } : {}),
    ...(targetBoard ? { targetBoard } : {}),
  };
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
  actionIds: (cls?: ClassLevel, board?: EducationBoard, userRole?: 'student' | 'teacher' | 'visitor') => SupportNavigationActionId[];
  suggestSupportTicket?: boolean;
  responses: Record<SupportLanguage, (cls?: ClassLevel, board?: EducationBoard) => string>;
}

const KB_TOPICS: KbTopicDefinition[] = [
  {
    id: 'greeting',
    priority: 10,
    keywords: ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'नमस्ते', 'नमस्कार', 'हॅलो'],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_teacher_resources', 'open_worksheets', 'open_tet_ctet']
        : ['open_all_courses', 'open_worksheets', 'open_demo'],
    responses: {
      en: () =>
        'Hello! I am your MyStudyZone Help Desk assistant. You can ask me in English, Hindi, or Marathi about Classes 1–10 courses, Maharashtra/CBSE/ICSE syllabus, worksheets, Scholarship (4th & 7th), MAHA TET & CTET, Story World, Shivaji Maharaj Stories, Drawing Studio, quizzes, login, password reset, or Teacher resources.',
      hi: () =>
        'नमस्ते! मैं आपका MyStudyZone हेल्प डेस्क सहायक हूँ। आप मुझसे हिंदी, अंग्रेजी या मराठी में कक्षा 1 से 10 के कोर्स, सिलेबस, वर्कशीट, स्कॉलरशिप (4थी व 7वीं), MAHA TET व CTET, कहानियाँ, ड्राइंग, क्विज़, लॉगिन, पासवर्ड रीसेट या टीचर सुविधाओं के बारे में पूछ सकते हैं।',
      mr: () =>
        'नमस्कार! मी तुमचा MyStudyZone हेल्प डेस्क सहाय्यक आहे. तुम्ही मला मराठी, हिंदी किंवा इंग्रजीमध्ये इयत्ता १ ते १० चे कोर्स, अभ्यासक्रम, वर्कशीट, शिष्यवृत्ती (४ थी व ७ वी), MAHA TET व CTET, गोष्टी, चित्रकला, क्विझ, लॉगिन, पासवर्ड रीसेट किंवा शिक्षक सुविधांबद्दल काहीही विचारू शकता.',
    },
  },
  {
    id: 'unresolved_account_problem',
    priority: 100,
    keywords: [
      'cannot login', 'cant login', 'login failed', 'login error', 'not opening', 'payment deducted',
      'paid but locked', 'plan not activated', 'still locked', 'wrong class', 'change class',
      'single device', 'another device', 'blocked', 'bug', 'technical error', 'not working',
      'submit request', 'support request', 'complaint', 'raise ticket', 'support ticket',
      'लॉगिन नहीं', 'समस्या', 'पेमेंट कट', 'अडचण', 'लॉगिन होत नाही', 'तक्रार'
    ],
    suggestSupportTicket: true,
    actionIds: () => ['open_password_reset', 'open_login'],
    responses: {
      en: () =>
        'Here are quick troubleshooting steps you can check right away:\n1. Make sure you are signing in on the matching portal (Student Login vs Teacher Login) with your registered email.\n2. MyStudyZone protects accounts with Single-Device Session security—if you are logged in on another phone/browser, log out there first or use Lost/Damaged Device Recovery inside the Login box.\n3. If you forgot your password, use Forgot Password to receive a reset link on your registered email.\n4. For a ₹99 payment that has not reflected, sign out and log back in, or check your profile subscription card.\n\nNote: For your safety, never share your password, OTP, or UPI/card PIN. If the issue is still not resolved, click SUBMIT A SUPPORT REQUEST below to send it directly to our support team.',
      hi: () =>
        'कृपया पहले ये आसान कदम आज़माएँ:\n1. सुनिश्चित करें कि आप सही पोर्टल (Student Login या Teacher Login) पर अपने पंजीकृत ईमेल से लॉगिन कर रहे हैं।\n2. MyStudyZone में Single-Device सुरक्षा है—यदि आपका अकाउंट किसी दूसरे फोन/ब्राउज़र में खुला है, तो पहले वहाँ से Logout करें या Login बॉक्स में Device Recovery का उपयोग करें।\n3. पासवर्ड भूल गए हों तो Forgot Password से ईमेल पर रीसेट लिंक मँगवाएँ।\n4. पेमेंट के बाद प्लान सक्रिय न दिखे तो एक बार Logout करके दोबारा Login करें।\n\nसुरक्षा सूचना: कभी भी अपना पासवर्ड, OTP या UPI/कार्ड PIN साझा न करें। यदि समस्या बनी रहती है, तो नीचे SUBMIT A SUPPORT REQUEST बटन दबाकर हमारी टीम को भेजें।',
      mr: () =>
        'कृपया आधी खालील उपाय करून पहा:\n1. तुम्ही योग्य पोर्टलवर (Student Login किंवा Teacher Login) तुमच्या नोंदणीकृत ईमेलने लॉगिन करत आहात याची खात्री करा.\n2. Single-Device सुरक्षेमुळे तुमचे खाते दुसऱ्या डिव्हाइसवर सुरू असल्यास आधी तेथून Logout करा किंवा Login विंडोमधील Device Recovery वापरा.\n3. पासवर्ड विसरल्यास Forgot Password वापरून ईमेलवर रीसेट लिंक मिळवा.\n4. पेमेंटनंतर प्लान दिसत नसल्यास एकदा Logout करून पुन्हा Login करा.\n\nसुरक्षा सूचना: कधीही पासवर्ड, OTP किंवा UPI/कार्ड PIN शेअर करू नका. समस्या सुटली नसल्यास खालील SUBMIT A SUPPORT REQUEST बटणावर क्लिक करा.',
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
    actionIds: () => ['open_password_reset', 'open_login'],
    responses: {
      en: () =>
        'To reset your MyStudyZone password:\n1. Click Login at the top-right and select "Forgot Password" (or click OPEN PASSWORD RESET below).\n2. Enter your registered email address and submit.\n3. Open the password reset email sent by MyStudyZone (check Spam/Promotions if not in Inbox) and set a new password.\n\nNever share your password with anyone. If you still cannot access your email or reset link, click SUBMIT A SUPPORT REQUEST below.',
      hi: () =>
        'अपना पासवर्ड रीसेट करने के लिए:\n1. ऊपर दाईं ओर Login पर क्लिक करें और "Forgot Password" चुनें (या नीचे OPEN PASSWORD RESET दबाएँ)।\n2. अपना पंजीकृत ईमेल दर्ज करें।\n3. आपके ईमेल पर आए रीसेट लिंक (Spam फ़ोल्डर भी देखें) से नया पासवर्ड सेट करें।\n\nयदि फिर भी दिक्कत हो, तो नीचे SUBMIT A SUPPORT REQUEST पर क्लिक करें।',
      mr: () =>
        'पासवर्ड रीसेट करण्यासाठी:\n1. वर उजवीकडे Login वर क्लिक करून "Forgot Password" निवडा (किंवा खालील OPEN PASSWORD RESET दाबा).\n2. तुमचा नोंदणीकृत ईमेल पत्ता टाका.\n3. ईमेलवर आलेल्या लिंकवर क्लिक करून (Spam फोल्डरही तपासा) नवीन पासवर्ड सेट करा.\n\nअडचण येत असल्यास खालील SUBMIT A SUPPORT REQUEST बटणावर क्लिक करा.',
    },
  },
  {
    id: 'teacher_resources',
    priority: 85,
    keywords: [
      'teacher resources', 'teaching resources', 'teaching material', 'teacher portal', 'teacher dashboard',
      'teacher facility', 'teacher facilities', 'for teachers', 'educator', 'techer', 'shikshak',
      'शिक्षक', 'अध्यापन'
    ],
    actionIds: (_c, _b, role) =>
      role === 'teacher'
        ? ['open_teacher_resources', 'open_worksheets', 'open_syllabus', 'open_tet_ctet']
        : ['open_teacher_login', 'open_teacher_resources', 'open_tet_ctet'],
    responses: {
      en: () =>
        'MyStudyZone Teacher Portal gives educators unified access to:\n• Classes 1 to 10 curriculum across Maharashtra State Board, CBSE (NCERT), and ICSE (CISCE)\n• Class-wise interactive Worksheets & Chapter Study Notes with solved examples\n• 4-Level Practice Quizzes across school subjects\n• 4th & 7th Standard MSCE Scholarship preparation\n• MAHA TET & CTET (Paper 1 & Paper 2) mock tests\n• Multilingual Audio Stories, Chhatrapati Shivaji Maharaj 50 historical chapters, Drawing Studio, Cricket & GK\n\nUse the Teacher Login portal at the top or click OPEN TEACHER RESOURCES below to jump straight in.',
      hi: () =>
        'MyStudyZone टीचर पोर्टल पर शिक्षकों के लिए ये वास्तविक सुविधाएँ उपलब्ध हैं:\n• महाराष्ट्र बोर्ड, CBSE (NCERT) और ICSE (CISCE) के कक्षा 1 से 10 तक के विषय\n• कक्षा-वार इंटरैक्टिव वर्कशीट, चैप्टर स्टडी नोट्स और हल किए गए उदाहरण\n• 4-लेवल प्रैक्टिस क्विज़\n• कक्षा 4थी और 7वीं स्कॉलरशिप (MSCE) मॉक टेस्ट\n• MAHA TET और CTET (पेपर 1 व 2) परीक्षा तैयारी\n• कहानियाँ (अंग्रेजी/हिंदी/मराठी), शिवाजी महाराज के 50 अध्याय, ड्राइंग स्टूडियो और GK।\n\nसीधे जाने के लिए नीचे दिए बटन पर क्लिक करें।',
      mr: () =>
        'MyStudyZone शिक्षक पोर्टलवर शिक्षकांसाठी पुढील सुविधा उपलब्ध आहेत:\n• महाराष्ट्र बोर्ड, CBSE (NCERT) व ICSE (CISCE) मधील इयत्ता १ ते १० चे सर्व विषय\n• इयत्तावार ऑनलाइन वर्कशीट्स, पाठनिहाय स्टडी नोट्स आणि सोडवलेली उदाहरणे\n• ४-लेव्हल सराव क्विझ\n• इयत्ता ४ थी व ७ वी MSCE शिष्यवृत्ती सराव परीक्षा\n• MAHA TET आणि CTET (पेपर १ व २) मॉक टेस्ट\n• गोष्टी (मराठी/हिंदी/इंग्रजी ऑडिओ), छत्रपती शिवाजी महाराजांचे ५० अध्याय, ड्रॉइंग स्टुडिओ व सामान्य ज्ञान.\n\nखालील बटणावर क्लिक करून थेट प्रवेश करा.',
    },
  },
  {
    id: 'tet_ctet',
    priority: 82,
    keywords: ['tet', 'ctet', 'maha tet', 'mahatet', 'paper 1', 'paper 2', 'टीईटी', 'सीटीईटी'],
    actionIds: () => ['open_tet_ctet', 'open_demo'],
    responses: {
      en: () =>
        'In the TET & CTET Exam Prep section, both students/aspirants and teachers can access:\n• Maharashtra TET (Paper 1 & Paper 2)\n• CTET Paper 1 (Classes 1–5) and CTET Paper 2 (Classes 6–8)\n• Free Demo Mock Tests with real 150-minute countdown timers and detailed solutions, plus full mock test series plans.',
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
    keywords: ['worksheet', 'worksheets', 'workshets', 'exercise', 'exercises', 'practice sheet', 'वर्कशीट', 'सरावपत्रिका'],
    actionIds: () => ['open_worksheets', 'open_quizzes'],
    responses: {
      en: (cls, board) => {
        const scope = [board ? `${board} Board` : '', cls || 'Classes 1–10'].filter(Boolean).join(' • ');
        return `You can open online interactive Worksheets for ${scope} directly inside the Worksheets section.\n• Free accounts include 2 demo worksheets (English & Mathematics) for your registered Board & Class.\n• Premium ₹99 (365 Days) unlocks all subjects' worksheets for that Board & Class.\n• Note: Worksheets are completed interactively online (printing and offline downloads are disabled).`;
      },
      hi: (cls, board) => {
        const scope = [board ? `${board} बोर्ड` : '', cls || 'कक्षा 1 से 10'].filter(Boolean).join(' • ');
        return `आप ${scope} की ऑनलाइन इंटरैक्टिव वर्कशीट सीधे Worksheets सेक्शन में खोल सकते हैं।\n• फ्री प्लान में आपके पंजीकृत बोर्ड व कक्षा की 2 डेमो वर्कशीट (English और Maths) मुफ्त हैं।\n• ₹99 (365 दिन) प्लान से उस कक्षा के सभी विषयों की वर्कशीट खुलती हैं।\n• नोट: वर्कशीट केवल वेबसाइट पर ऑनलाइन हल की जाती हैं (प्रिंट व डाउनलोड बंद है)।`;
      },
      mr: (cls, board) => {
        const scope = [board ? `${board} बोर्ड` : '', cls || 'इयत्ता १ ते १०'].filter(Boolean).join(' • ');
        return `${scope} साठी ऑनलाइन इंटरअ‍ॅक्टिव्ह वर्कशीट्स तुम्ही थेट Worksheets विभागात उघडू शकता.\n• मोफत प्लानमध्ये नोंदणीकृत बोर्ड व इयत्तेसाठी २ डेमो वर्कशीट्स (English व Maths) खुल्या आहेत.\n• ₹९९ (३६५ दिवस) प्लानने त्या इयत्तेचे सर्व विषय खुले होतात.\n• टीप: वर्कशीट्स फक्त वेबसाइटवर ऑनलाइन सोडवण्यासाठी आहेत (प्रिंट आणि डाउनलोड बंद आहे).`;
      },
    },
  },
  {
    id: 'syllabus_and_notes',
    priority: 76,
    keywords: [
      'syllabus', 'silabus', 'sylabus', 'curriculum', 'study material', 'study materials',
      'notes', 'chapter notes', 'textbook', 'summary', 'abhyaskram', 'अभ्यासक्रम', 'सिलेबस', 'नोट्स'
    ],
    actionIds: () => ['open_syllabus', 'open_all_courses'],
    responses: {
      en: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'Classes 1 to 10'].join(' • ');
        return `Your complete Syllabus & Study Materials (${scope}) include:\n• Chapter-wise syllabus concepts & textbook references\n• Formulas, theorems, rules & solved walkthrough examples\n• Interactive chapter self-revision checklists\n\nClick OPEN SYLLABUS & STUDY NOTES below to view your board, class, and subject chapters.`;
      },
      hi: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'कक्षा 1 से 10'].join(' • ');
        return `${scope} का पूरा सिलेबस और स्टडी नोट्स Study Materials में उपलब्ध हैं:\n• अध्याय-वार मुख्य अवधारणाएँ और पाठ्यपुस्तक संदर्भ\n• महत्वपूर्ण सूत्र, नियम और हल किए गए उदाहरण\n• रिवीजन चेकलिस्ट\n\nसीधे देखने के लिए नीचे OPEN SYLLABUS & STUDY NOTES दबाएँ।`;
      },
      mr: (cls, board) => {
        const scope = [board || 'Maharashtra / CBSE / ICSE', cls || 'इयत्ता १ ते १०'].join(' • ');
        return `${scope} साठी संपूर्ण अभ्यासक्रम व स्टडी नोट्स Study Materials विभागात उपलब्ध आहेत:\n• पाठनिहाय महत्त्वाच्या संकल्पना व पाठ्यपुस्तक संदर्भ\n• महत्त्वाची सूत्रे, नियम आणि सोडवलेली उदाहरणे\n• उजळणी चेकलिस्ट\n\nपाहण्यासाठी खालील OPEN SYLLABUS & STUDY NOTES बटणावर क्लिक करा.`;
      },
    },
  },
  {
    id: 'download_resources',
    priority: 90,
    keywords: ['download', 'downlod', 'pdf', 'print', 'save offline', 'डाउनलोड', 'प्रिंट'],
    actionIds: () => ['open_worksheets', 'open_syllabus', 'open_certificates'],
    responses: {
      en: () =>
        'Important accuracy note about downloads on MyStudyZone:\n• Worksheets and Study Materials are strictly online interactive resources — offline PDF downloading and printing are disabled to protect educational content.\n• However, once you earn Milestone Champion Certificates, you can view/print them from the Certificates & Leaderboard page, and you can save your Drawing Studio artwork in your artwork gallery.',
      hi: () =>
        'डाउनलोड से जुड़ी सही जानकारी:\n• MyStudyZone की वर्कशीट और स्टडी नोट्स ऑनलाइन इंटरैक्टिव उपयोग के लिए हैं — इनका PDF डाउनलोड या प्रिंट करना बंद रखा गया है।\n• यदि आपने कोई चैंपियन सर्टिफिकेट अर्जित किया है, तो उसे Certificates & Leaderboard से देख/प्रिंट कर सकते हैं, और Drawing Studio में अपनी कलाकृति गैलरी में सेव कर सकते हैं।',
      mr: () =>
        'डाउनलोडबाबत अचूक माहिती:\n• MyStudyZone वरील वर्कशीट्स आणि स्टडी नोट्स फक्त ऑनलाइन सराव व वाचनासाठी आहेत — यांचे PDF डाउनलोड किंवा प्रिंट करणे बंद ठेवण्यात आले आहे.\n• मात्र, तुम्ही मिळवलेली चॅम्पियन प्रमाणपत्रे Certificates & Leaderboard मधून पाहू/प्रिंट करू शकता आणि Drawing Studio मधील चित्रे गॅलरीत सेव करू शकता.',
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
    keywords: ['quiz', 'quizzes', 'mcq', 'puzzle', 'puzzles', 'sudoku', 'cricket', 'gk', 'ai academy', 'future skills', 'क्विज़', 'कोडे', 'सुडोकू'],
    actionIds: () => ['open_quizzes', 'open_puzzles', 'open_sudoku', 'open_cricket', 'open_ai_academy'],
    responses: {
      en: () =>
        'For interactive practice and brain training, MyStudyZone offers:\n• 4-Level Practice Quizzes (zero repeated questions tracking)\n• Brain Puzzles & Sudoku (4×4, 6×6, 9×9 — Free Forever)\n• Cricket & GK Arena\n• AI Learning Academy & Future Skills (8 modules)',
      hi: () =>
        'अभ्यास और दिमागी खेल के लिए MyStudyZone में उपलब्ध है:\n• 4-लेवल प्रैक्टिस क्विज़ (बिना दोहराए गए प्रश्न)\n• ब्रेन पज़ल्स और सुडोकू (हमेशा फ्री)\n• क्रिकेट और सामान्य ज्ञान (GK)\n• AI Learning Academy (भविष्य के कौशल)।',
      mr: () =>
        'सराव आणि बौद्धिक खेळांसाठी MyStudyZone वर उपलब्ध आहे:\n• ४-लेव्हल सराव क्विझ (प्रश्न पुन्हा न येणारी प्रणाली)\n• ब्रेन पझल्स आणि सुडोकू (नेहमी मोफत)\n• क्रिकेट व सामान्य ज्ञान (GK)\n• AI Learning Academy (भविष्यातील कौशल्ये).',
    },
  },
  {
    id: 'registration_and_login',
    priority: 62,
    keywords: ['register', 'registration', 'sign up', 'signup', 'create account', 'login', 'log in', 'logout', 'sign in', 'नोंदणी', 'रजिस्ट्रेशन', 'लॉगिन', 'लॉगआउट'],
    actionIds: () => ['open_register', 'open_login', 'open_teacher_login'],
    responses: {
      en: () =>
        'How Registration, Login & Logout work on MyStudyZone:\n• New students or teachers can click Login → Register tab, pick their role (Student or Teacher), Board (Maharashtra / CBSE / ICSE), Class (1–10), Name, Email, Mobile, and Password.\n• Existing users can log in anytime using the Student Login or Teacher Login portal.\n• When logged in, the Login button at the top-right turns into Logout so you can securely sign out from anywhere on desktop or mobile.',
      hi: () =>
        'MyStudyZone पर रजिस्ट्रेशन, लॉगिन और लॉगआउट कैसे करें:\n• नए छात्र या शिक्षक Login → Register टैब में जाकर अपनी भूमिका (Student/Teacher), बोर्ड (Maharashtra / CBSE / ICSE), कक्षा (1–10), नाम, ईमेल, मोबाइल और पासवर्ड से अकाउंट बना सकते हैं।\n• पहले से बने अकाउंट से Student Login या Teacher Login से साइन इन करें।\n• लॉगिन होने पर ऊपर दाईं ओर Login बटन की जगह Logout बटन दिखता है।',
      mr: () =>
        'MyStudyZone वर नोंदणी, लॉगिन आणि लॉगआउट प्रक्रिया:\n• नवीन विद्यार्थी किंवा शिक्षक Login → Register टॅबवर जाऊन आपली भूमिका (Student/Teacher), बोर्ड (Maharashtra / CBSE / ICSE), इयत्ता (१–१०), नाव, ईमेल, मोबाइल व पासवर्ड देऊन नोंदणी करू शकतात.\n• नोंदणीकृत वापरकर्ते Student Login किंवा Teacher Login मधून लॉगिन करू शकतात.\n• लॉगिन केल्यावर वर उजवीकडे Login बटणाच्या जागी Logout बटण दिसते.',
    },
  },
  {
    id: 'boards_and_plans',
    priority: 60,
    keywords: ['maharashtra', 'cbse', 'icse', 'subscription plan', 'plan details', 'free plan', 'premium plan', 'price', 'pricing', '99', 'fee', 'subscription', 'प्लान', 'फीस', 'बोर्ड'],
    actionIds: () => ['open_all_courses', 'open_plans'],
    responses: {
      en: () =>
        'MyStudyZone covers Classes 1 to 10 across all 3 Education Boards: Maharashtra State Board, CBSE (NCERT), and ICSE (CISCE).\n• FREE PLAN (₹0 Lifetime): 2 Demo Worksheets (English & Math), English & Math Quizzes, Brain Puzzles, Sudoku, and Chapter 1 sample notes.\n• PREMIUM PLAN (₹99 / 365 Days): Full 1-year unlock of all subjects, worksheets, study materials, stories, drawing, cricket GK & AI academy for your selected Board & Class.\n• Separate plans are also available for Scholarship (4th & 7th) and MAHA TET / CTET.',
      hi: () =>
        'MyStudyZone पर कक्षा 1 से 10 के लिए तीनों बोर्ड उपलब्ध हैं: महाराष्ट्र बोर्ड, CBSE (NCERT) और ICSE (CISCE)।\n• FREE PLAN (₹0 लाइफटाइम): 2 डेमो वर्कशीट, English/Maths क्विज़, पज़ल्स, सुडोकू और सैंपल नोट्स।\n• PREMIUM PLAN (₹99 / 365 दिन): चुने हुए बोर्ड व कक्षा के सभी विषय, वर्कशीट, नोट्स, कहानियाँ, ड्राइंग, क्रिकेट GK और AI अकादमी पूरे 1 वर्ष के लिए अनलॉक।\n• स्कॉलरशिप व TET/CTET के लिए अलग प्लान भी उपलब्ध हैं।',
      mr: () =>
        'MyStudyZone वर इयत्ता १ ते १० साठी तिन्ही बोर्ड उपलब्ध आहेत: महाराष्ट्र राज्य मंडळ, CBSE (NCERT) आणि ICSE (CISCE).\n• FREE PLAN (₹० आजीवन): २ डेमो वर्कशीट्स, English/Maths क्विझ, पझल्स, सुडोकू व नमुना नोट्स.\n• PREMIUM PLAN (₹९९ / ३६५ दिवस): निवडलेल्या बोर्ड व इयत्तेसाठी सर्व विषय, वर्कशीट्स, स्टडी नोट्स, गोष्टी, ड्रॉइंग, क्रिकेट GK व AI अकादमी १ वर्षासाठी पूर्णपणे खुले होतात.\n• शिष्यवृत्ती व TET/CTET साठी स्वतंत्र प्लान उपलब्ध आहेत.',
    },
  },
];

export function matchKnowledgeBaseFastPath(
  userMessage: string,
  options?: { userRole?: 'student' | 'teacher' | 'visitor' }
): FastPathSupportResponse {
  const raw = String(userMessage || '').trim();
  const language = detectQueryLanguage(raw);
  const detectedClass = extractClassLevel(raw);
  const detectedBoard = extractBoard(raw);
  const tokens = tokenizeNormalized(raw);
  const rawLower = raw.toLowerCase();

  // Check if message has complex/multi-question cues that deserve AI when available
  const isComplexMultiQuestion =
    raw.length > 140 ||
    (raw.split('?').length > 2) ||
    /\b(explain|difference|compare|why|how does|suggest|recommend|problem|error|stuck)\b/i.test(rawLower);

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

  // If high-priority unresolved account/login issue OR clear navigation/FAQ match:
  if (bestTopic && (bestTopic.id === 'unresolved_account_problem' || bestTopic.id === 'password_reset' || !isComplexMultiQuestion)) {
    const actionIds = bestTopic.actionIds(detectedClass, detectedBoard, options?.userRole);
    const navigationActions = actionIds.map((id) =>
      buildNavigationAction(id, detectedClass, detectedBoard)
    );
    return {
      matched: true,
      reply: bestTopic.responses[language](detectedClass, detectedBoard),
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
You are the official Help & Support Assistant for MyStudyZone (mystudyzone.in), an Indian K-10 school and competitive teacher-exam learning platform.

STRICT RULES — NEVER VIOLATE:
1. ACCURACY ONLY: Only describe features, boards, classes, plans, and links that actually exist on MyStudyZone:
   - Education Boards (Classes 1 to 10): Maharashtra State Board (SSC), CBSE (NCERT), ICSE (CISCE).
   - School Features: All Courses Directory (Classes 1–10), Chapter-wise Study Materials & Syllabus Notes (with solved examples & revision checklists), Online Interactive Worksheets (Classes 1–10), 4-Level Practice Quizzes (zero-repeated-question tracking), Milestone Champion Certificates & Leaderboard.
   - IMPORTANT DOWNLOAD RULE: Worksheets and Study Notes are ONLINE ONLY inside the website (printing and PDF downloads of worksheets are intentionally disabled). Do NOT tell users they can download worksheet PDFs. Users CAN view/print earned Champion Certificates and save drawings in Drawing Studio gallery.
   - Special Learning Studios: Story World (45+ audio stories in English, Hindi, Marathi), Chhatrapati Shivaji Maharaj Stories (50 audio chapters), Drawing Studio (120+ colouring templates & canvas), Brain Puzzles & Sudoku (4x4, 6x6, 9x9 — Free Forever), Cricket & GK Hub, AI Learning Academy & Future Skills (8 modules).
   - Exam Prep: 4th Std Scholarship (MSCE PSE) & 7th Std Scholarship (MSCE UPS), MAHA TET (Paper 1 & 2) & CTET (Paper 1 & 2), Free Interactive Visitor Demo & Free Full-Length Demo Mock Tests.
   - Accounts & Portals: Student Registration/Login, Dedicated Teacher Registration/Login (with Teacher Hub for Classes 1–10, Worksheets, Study Notes, 4-Level Quizzes, Scholarship, TET/CTET, Stories, Current Affairs), Single-Device Session Protection (with Lost/Damaged Device Recovery in Login modal), Forgot Password email reset, Top-Right Login/Logout button, Refer & Earn (₹5 cashback wallet).
   - Plans: FREE PLAN (₹0 Lifetime: 2 Demo Worksheets English & Math for registered class, English & Math quizzes, Brain Puzzles, Sudoku, Chapter 1 sample notes); PREMIUM PLAN (₹99 / 365 Days per Board & Class); Scholarship & TET/CTET plans via Razorpay.
2. NEVER INVENT FEATURES: Never invent live video classes, downloadable worksheet PDFs, 1-on-1 tutors, WhatsApp bots, or non-existent routes/buttons. If asked for something unavailable, politely say it is not available on MyStudyZone.
3. PRIVACY & SAFETY: NEVER ask users for passwords, OTPs, bank details, or card/UPI PINs. NEVER claim to have automatically fixed an account, reset a password, or activated a plan—always guide the user or set suggestSupportTicket=true so they can submit a Support Request. NEVER disclose admin details or another user's private info.
4. MULTILINGUAL SUPPORT: Reply fluently in the user's language — English ('en'), Hindi ('hi'), or Marathi ('mr'), understanding spelling mistakes and Hinglish/Marathi transliteration naturally.
5. NAVIGATION ACTIONS: Only choose from these exact navigationActionIds when genuinely helpful to take the user directly to a section:
   open_worksheets, open_syllabus, open_all_courses, open_quizzes, open_scholarship, open_tet_ctet, open_teacher_resources, open_stories, open_shivaji, open_drawing, open_puzzles, open_sudoku, open_cricket, open_ai_academy, open_other_programs, open_demo, open_certificates, open_referrals, open_profile, open_plans, open_login, open_teacher_login, open_register, open_password_reset, open_dashboard.
6. TROUBLESHOOTING & ESCALATION: For personal account, login, payment not reflecting, class correction, or bug issues, give concise troubleshooting steps first and set suggestSupportTicket=true so the UI displays the "SUBMIT A SUPPORT REQUEST" button.
`.trim();
