import type { ClassLevel, EducationBoard } from '../../types';

export type AdminCategoryId =
  | 'registration_users'
  | 'academic_management'
  | 'student_learning'
  | 'teacher_management'
  | 'finance_subscriptions'
  | 'reports_analytics'
  | 'communication'
  | 'website_system';

export type AdminSubsectionId =
  // 1. Registration & Users
  | 'students'
  | 'student-registration'
  | 'teachers-directory'
  | 'schools-directory'
  | 'parents-management'
  | 'admin-security'
  // 2. Academic Management
  | 'boards-management'
  | 'classes-divisions'
  | 'subjects-management'
  | 'syllabus-registry'
  | 'additional-curriculum'
  | 'textbooks-directory'
  | 'chapters-notes-solutions'
  // 3. Student Learning Content
  | 'study-library-cms'
  | 'papers-videos-inspector'
  | 'questions'
  | 'worksheets'
  | 'duplicates'
  | 'stories'
  | 'drawings'
  | 'cricket'
  | 'scholarship'
  | 'demo-exams'
  | 'five-zones-cms'
  // 4. Teacher Management
  | 'teacher-tools-directory'
  | 'lesson-planner'
  | 'teacher-attendance'
  | 'teacher-assignments'
  | 'tet-ctet'
  // 5. Finance & Subscriptions
  | 'subscriptions-plans'
  | 'payments'
  | 'referrals'
  // 6. Reports & Analytics
  | 'data-status'
  | 'progression'
  | 'question-error-reports'
  // 7. Communication
  | 'announcements'
  | 'support'
  | 'system-notifications'
  // 8. Website & System Management
  | 'settings'
  | 'profile'
  | 'system-health';

export type CompletenessBadge = 'GREEN' | 'YELLOW' | 'RED' | 'BLUE';

export interface AdminSubsectionMeta {
  id: AdminSubsectionId;
  categoryId: AdminCategoryId;
  title: string;
  description: string;
  iconName: string;
  usesBoardScope?: boolean;
  defaultStatus: CompletenessBadge;
}

export interface AdminCategoryMeta {
  id: AdminCategoryId;
  numberLabel: string;
  title: string;
  shortSubtitle: string;
  description: string;
  accentGradient: string;
  badgeStyle: string;
}

export interface AdminJumpTarget {
  categoryId: AdminCategoryId;
  subsectionId: AdminSubsectionId;
  board?: 'all' | EducationBoard;
  classLevel?: 'all' | ClassLevel;
  searchHint?: string;
}

export const ADMIN_MAIN_CATEGORIES: AdminCategoryMeta[] = [
  {
    id: 'registration_users',
    numberLabel: '01',
    title: 'Registration & Users',
    shortSubtitle: 'Students, Teachers, Schools, Parents & Security',
    description:
      'Manage registered Student & Teacher accounts, School/College portals, Parent child-linking, single-device sessions, and security audits.',
    accentGradient: 'from-slate-900 via-indigo-950 to-slate-900',
    badgeStyle: 'bg-indigo-100 text-indigo-900 border-indigo-200',
  },
  {
    id: 'academic_management',
    numberLabel: '02',
    title: 'Academic Management',
    shortSubtitle: 'Boards, Classes, Subjects, Syllabus, Textbooks & Chapters',
    description:
      'Drill down through Education Boards (Maharashtra, CBSE, ICSE), Classes 1–10, Divisions, Subjects, Syllabus verification, Textbooks, and Chapter Notes.',
    accentGradient: 'from-amber-900 via-orange-900 to-slate-900',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  {
    id: 'student_learning',
    numberLabel: '03',
    title: 'Student Learning Content',
    shortSubtitle: 'Study Library CMS, Quizzes, Worksheets, Papers, Videos & Zones',
    description:
      'Manage Study Notes, Textbook Exercise Solutions, Question Papers (Model & PYQ), Video Lessons, Question Bank, Worksheets, Stories, Drawings, GK & 18 Skill Programs.',
    accentGradient: 'from-emerald-900 via-teal-900 to-slate-900',
    badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  {
    id: 'teacher_management',
    numberLabel: '04',
    title: 'Teacher Management',
    shortSubtitle: 'Educators, 130 Tools, Lesson Planner, Attendance & TET/CTET',
    description:
      'Oversee Teacher accounts, 130 Classroom Tools, 3-Tab Lesson Planners, Attendance tracking, Homework/Assignments/Grading, and 200 TET/CTET Mocks.',
    accentGradient: 'from-teal-900 via-cyan-950 to-slate-900',
    badgeStyle: 'bg-teal-100 text-teal-900 border-teal-200',
  },
  {
    id: 'finance_subscriptions',
    numberLabel: '05',
    title: 'Finance & Subscriptions',
    shortSubtitle: '₹99 Plans, 365-Day Audit, Razorpay Transactions & Referrals',
    description:
      'Inspect Board+Class subscriptions, verify Razorpay orders & receipts, audit 365-day expiries, and process student/educator referral payouts.',
    accentGradient: 'from-purple-900 via-indigo-950 to-slate-900',
    badgeStyle: 'bg-purple-100 text-purple-900 border-purple-200',
  },
  {
    id: 'reports_analytics',
    numberLabel: '06',
    title: 'Reports & Analytics',
    shortSubtitle: 'Data Completeness Status, Level Mastery & Error Reports',
    description:
      'Check Complete Website Content & Data Status across every module, monitor Level 1–4 progression, and resolve Question Error Reports.',
    accentGradient: 'from-sky-900 via-blue-950 to-slate-900',
    badgeStyle: 'bg-sky-100 text-sky-900 border-sky-200',
  },
  {
    id: 'communication',
    numberLabel: '07',
    title: 'Communication',
    shortSubtitle: 'Live Announcements, Support Tickets, Grievances & Notifications',
    description:
      'Publish live announcement ticker updates, handle Help/Grievance tickets & parent messages, and inspect platform notifications.',
    accentGradient: 'from-rose-950 via-slate-900 to-slate-900',
    badgeStyle: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  {
    id: 'website_system',
    numberLabel: '08',
    title: 'Website & System Management',
    shortSubtitle: 'Visibility Controls, Timers, Supervisor Profile & DB Health',
    description:
      'Configure special section visibility, grade-wise quiz timers, supervisor credentials, and live Firestore + local storage health.',
    accentGradient: 'from-slate-800 via-slate-900 to-zinc-950',
    badgeStyle: 'bg-slate-200 text-slate-900 border-slate-300',
  },
];

export const ADMIN_SUBSECTIONS: AdminSubsectionMeta[] = [
  // 1. Registration & Users
  {
    id: 'students',
    categoryId: 'registration_users',
    title: 'Student & User Directory',
    description: 'Search registered accounts, manage class promotions, 365-day audits & single-device sessions.',
    iconName: 'Users',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'student-registration',
    categoryId: 'registration_users',
    title: 'Student Registration Overview',
    description: 'Inspect recent student enrollments, verification badges, dual-verification rules & quick onboarding.',
    iconName: 'UserPlus',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'teachers-directory',
    categoryId: 'registration_users',
    title: 'Teacher Registration & Accounts',
    description: 'Dedicated view of registered Teacher accounts, category subscriptions & workspace assignments.',
    iconName: 'GraduationCap',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'schools-directory',
    categoryId: 'registration_users',
    title: 'School & College Registration & Records',
    description: 'Manage registered School/College tenants, student school affiliations & onboard new institutions.',
    iconName: 'Building2',
    defaultStatus: 'YELLOW',
  },
  {
    id: 'parents-management',
    categoryId: 'registration_users',
    title: 'Parent Accounts & Child Linking',
    description: 'View registered Parent profiles, inspect verified child links & connect guardians securely.',
    iconName: 'HeartHandshake',
    defaultStatus: 'YELLOW',
  },
  {
    id: 'admin-security',
    categoryId: 'registration_users',
    title: 'Admin & Security Audit Management',
    description: 'Run automated Student, Parent & Admin privilege isolation verification tests and audit logs.',
    iconName: 'ShieldCheck',
    defaultStatus: 'GREEN',
  },

  // 2. Academic Management
  {
    id: 'boards-management',
    categoryId: 'academic_management',
    title: 'Education Boards (MH, CBSE, ICSE)',
    description: 'Inspect curriculum coverage, subjects, textbooks & verified status per Education Board.',
    iconName: 'Layers',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'classes-divisions',
    categoryId: 'academic_management',
    title: 'Classes (1–10) & Divisions (A–D)',
    description: 'Browse Class 1 to Class 10 enrollment counts, division breakdown & subject mappings.',
    iconName: 'Grid',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'subjects-management',
    categoryId: 'academic_management',
    title: 'Subjects & Core Mapping',
    description: 'Inspect core board subjects per class across Maharashtra, CBSE & ICSE plus medium options.',
    iconName: 'BookOpen',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'syllabus-registry',
    categoryId: 'academic_management',
    title: 'Syllabus Registry & Verification',
    description: 'Review Central Syllabus Registry entries (Verified, Integrated, School-Dependent, External JSON).',
    iconName: 'CheckCircle2',
    usesBoardScope: true,
    defaultStatus: 'YELLOW',
  },
  {
    id: 'additional-curriculum',
    categoryId: 'academic_management',
    title: 'Additional Curriculum CMS',
    description: 'Manage supplementary curriculum subjects, multilingual chapters & enrichment assignments.',
    iconName: 'Sparkles',
    defaultStatus: 'GREEN',
  },
  {
    id: 'textbooks-directory',
    categoryId: 'academic_management',
    title: 'Official Textbooks Library',
    description: 'Inspect official board textbooks (Balbharati, NCERT, CISCE), editions & portal links.',
    iconName: 'Library',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'chapters-notes-solutions',
    categoryId: 'academic_management',
    title: 'Chapters, Notes & Exercise Solutions Explorer',
    description: 'Drill down Board -> Class -> Subject -> Chapters -> Chapter Notes -> Textbook Exercise Solutions.',
    iconName: 'FileText',
    usesBoardScope: true,
    defaultStatus: 'YELLOW',
  },

  // 3. Student Learning Content
  {
    id: 'study-library-cms',
    categoryId: 'student_learning',
    title: 'Free Study Library CMS & Health',
    description: 'Add, edit, or audit Study Notes, Q&A, Solutions & external syllabus health across boards.',
    iconName: 'BookOpen',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'papers-videos-inspector',
    categoryId: 'student_learning',
    title: 'Question Papers (Model/PYQ) & Video Lessons',
    description: 'Inspect Model Papers, Previous Year Papers & DIKSHA/NCERT Video Lessons by board & class.',
    iconName: 'PlayCircle',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'questions',
    categoryId: 'student_learning',
    title: 'Question Bank (Zero-Repetition Quiz)',
    description: 'Search, approve, moderate & add vetted Level 1–4 MCQ and reasoning questions.',
    iconName: 'HelpCircle',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'worksheets',
    categoryId: 'student_learning',
    title: 'Online Worksheets Bank',
    description: 'Audit and manage chapter-aligned existing & new online worksheets across Classes 1–10.',
    iconName: 'FileSpreadsheet',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'duplicates',
    categoryId: 'student_learning',
    title: 'Rejected Duplicate Questions Log',
    description: 'Review candidate questions automatically blocked by the Zero-Repetition hash & similarity engine.',
    iconName: 'AlertTriangle',
    defaultStatus: 'GREEN',
  },
  {
    id: 'stories',
    categoryId: 'student_learning',
    title: 'Stories & Shivaji Maharaj CMS',
    description: 'Manage multilingual stories (English/Hindi/Marathi) and Chhatrapati Shivaji Maharaj chronicles.',
    iconName: 'BookMarked',
    defaultStatus: 'GREEN',
  },
  {
    id: 'drawings',
    categoryId: 'student_learning',
    title: 'Drawing Studio & Submissions',
    description: 'Publish/unpublish SVG colouring templates and inspect student artwork submissions.',
    iconName: 'Palette',
    defaultStatus: 'GREEN',
  },
  {
    id: 'cricket',
    categoryId: 'student_learning',
    title: 'GK & Cricket Quiz CMS',
    description: 'Manage custom General Knowledge & Cricket quiz questions across levels & categories.',
    iconName: 'Trophy',
    defaultStatus: 'GREEN',
  },
  {
    id: 'scholarship',
    categoryId: 'student_learning',
    title: 'MSCE Pune Scholarship Exam CMS',
    description: 'Manage Std 4th (PSE) & Std 7th (UPS) custom scholarship test sets and mock banks.',
    iconName: 'Award',
    defaultStatus: 'GREEN',
  },
  {
    id: 'demo-exams',
    categoryId: 'student_learning',
    title: 'Free Demo Mock Tests (4 Tests)',
    description: 'Audit and manage the 4 public visitor demo scholarship & subject mock examinations.',
    iconName: 'Target',
    defaultStatus: 'GREEN',
  },
  {
    id: 'five-zones-cms',
    categoryId: 'student_learning',
    title: '5-Zone, 18 Skill Programs & Zone Hubs',
    description: 'Manage Coaching & 18 Skill Programs, Parent Guides, School Manuals & 130 Teacher Tools visibility.',
    iconName: 'Compass',
    defaultStatus: 'GREEN',
  },

  // 4. Teacher Management
  {
    id: 'teacher-tools-directory',
    categoryId: 'teacher_management',
    title: '130 Teacher Tools & Pedagogy Guides',
    description: 'Inspect all 130 modular classroom tools across 8 categories & teaching guides.',
    iconName: 'Wrench',
    defaultStatus: 'GREEN',
  },
  {
    id: 'lesson-planner',
    categoryId: 'teacher_management',
    title: 'Lesson Planner & Academic Calendars',
    description: 'Configure Maharashtra, CBSE & ICSE academic calendars, holidays & 3-Tab Lesson Planner defaults.',
    iconName: 'CalendarDays',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'teacher-attendance',
    categoryId: 'teacher_management',
    title: 'Student Attendance Register',
    description: 'Inspect & record student daily attendance across Classes 1–10 and divisions.',
    iconName: 'ClipboardCheck',
    usesBoardScope: true,
    defaultStatus: 'YELLOW',
  },
  {
    id: 'teacher-assignments',
    categoryId: 'teacher_management',
    title: 'Homework, Assignments & Evaluation',
    description: 'Monitor class assignments, pending student submissions & teacher grading across rosters.',
    iconName: 'CheckSquare',
    usesBoardScope: true,
    defaultStatus: 'YELLOW',
  },
  {
    id: 'tet-ctet',
    categoryId: 'teacher_management',
    title: 'TET & CTET Career Prep (200 Mocks)',
    description: 'Inspect MAHA TET & CTET Papers I–II 200 Mock batches, notes & teacher preparation telemetry.',
    iconName: 'GraduationCap',
    defaultStatus: 'GREEN',
  },

  // 5. Finance & Subscriptions
  {
    id: 'subscriptions-plans',
    categoryId: 'finance_subscriptions',
    title: 'Active Plans & Subscription Overview',
    description: 'Breakdown of Free vs Basic/Premium ₹99 board+class plans, category passes & renewals.',
    iconName: 'Crown',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'payments',
    categoryId: 'finance_subscriptions',
    title: 'Payment Transactions & Razorpay Receipts',
    description: 'Verify Razorpay Payment IDs, order receipts, revenue totals & plan expiries.',
    iconName: 'CreditCard',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'referrals',
    categoryId: 'finance_subscriptions',
    title: 'Referral Rewards & Payouts',
    description: 'Inspect referral codes, invitee conversions & approve payout requests.',
    iconName: 'Gift',
    defaultStatus: 'GREEN',
  },

  // 6. Reports & Analytics
  {
    id: 'data-status',
    categoryId: 'reports_analytics',
    title: 'COMPLETE WEBSITE CONTENT & DATA STATUS',
    description: 'Full live audit of Expected vs Database vs Missing content with GREEN / YELLOW / RED / BLUE status.',
    iconName: 'Activity',
    defaultStatus: 'GREEN',
  },
  {
    id: 'progression',
    categoryId: 'reports_analytics',
    title: 'Student Level Progress & Mastery Reports',
    description: 'Analyze Level 1–4 quiz completions, worksheet scores & board/class performance.',
    iconName: 'BarChart3',
    usesBoardScope: true,
    defaultStatus: 'GREEN',
  },
  {
    id: 'question-error-reports',
    categoryId: 'reports_analytics',
    title: 'Question Error Reports & Moderation',
    description: 'Review and resolve student/teacher reported typos, answer key corrections & explanations.',
    iconName: 'Flag',
    defaultStatus: 'GREEN',
  },

  // 7. Communication
  {
    id: 'announcements',
    categoryId: 'communication',
    title: 'Live Announcements & Ticker',
    description: 'Create, broadcast & archive live announcements for Students, Teachers, Parents, or All.',
    iconName: 'Megaphone',
    defaultStatus: 'GREEN',
  },
  {
    id: 'support',
    categoryId: 'communication',
    title: 'Helpdesk, Grievances & Support Tickets',
    description: 'Respond to helpdesk queries, parent-teacher notes & student grievances cleanly.',
    iconName: 'LifeBuoy',
    defaultStatus: 'GREEN',
  },
  {
    id: 'system-notifications',
    categoryId: 'communication',
    title: 'In-App Notifications Feed',
    description: 'Inspect platform-wide challenge, achievement, quiz & membership notification logs.',
    iconName: 'Bell',
    defaultStatus: 'GREEN',
  },

  // 8. Website & System Management
  {
    id: 'settings',
    categoryId: 'website_system',
    title: 'Visibility, Quiz Timers & Learning Programs',
    description: 'Control visitor/student section visibility, class-wise timers & featured homepage cards.',
    iconName: 'Settings',
    defaultStatus: 'GREEN',
  },
  {
    id: 'profile',
    categoryId: 'website_system',
    title: 'Supervisor Profile & Admin Credentials',
    description: 'Inspect Master Supervisor account info, platform totals & role verification status.',
    iconName: 'User',
    defaultStatus: 'GREEN',
  },
  {
    id: 'system-health',
    categoryId: 'website_system',
    title: 'Database, Firestore & Manifest Health',
    description: 'Inspect live Firestore connectivity, external syllabus JSON manifest & browser store footprint.',
    iconName: 'Database',
    defaultStatus: 'GREEN',
  },
];

export function getAdminCategoryMeta(categoryId: AdminCategoryId): AdminCategoryMeta {
  return ADMIN_MAIN_CATEGORIES.find((c) => c.id === categoryId) || ADMIN_MAIN_CATEGORIES[0];
}

export function getAdminSubsectionMeta(subsectionId: AdminSubsectionId): AdminSubsectionMeta {
  return ADMIN_SUBSECTIONS.find((s) => s.id === subsectionId) || ADMIN_SUBSECTIONS[0];
}

export function getSubsectionsForCategory(categoryId: AdminCategoryId): AdminSubsectionMeta[] {
  return ADMIN_SUBSECTIONS.filter((s) => s.categoryId === categoryId);
}
