import type {
  CategoryId,
  PlanSkuId,
  CategorySubscriptionRecord,
} from '../data/planCatalog';
export type { CategoryId, PlanSkuId, CategorySubscriptionRecord };

export type EducationBoard = 'Maharashtra' | 'CBSE' | 'ICSE';

export type BoardClassKey = `${EducationBoard}__${ClassLevel}`;

export type ClassLevel = 
  | 'Class 1'
  | 'Class 2' 
  | 'Class 3' 
  | 'Class 4' 
  | 'Class 5' 
  | 'Class 6' 
  | 'Class 7' 
  | 'Class 8'
  | 'Class 9'
  | 'Class 10';

export type SubjectName =
  // 14 Existing Core Subjects (Preserved Exactly)
  | 'Mathematics'
  | 'English'
  | 'Hindi'
  | 'Marathi'
  | 'Science'
  | 'General Knowledge'
  | 'Social Studies'
  | 'History'
  | 'Geography'
  | 'Computer Knowledge'
  | 'Logical Reasoning'
  | 'Environmental Studies'
  | 'Moral Education'
  | 'Vocabulary and Grammar'
  // Class 1 Subject Addition
  | 'Drawing and Creative Activities'
  // Class 9 & Class 10 Separate Science & Board Subjects
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Political Science'
  | 'Information Technology'
  | 'Environmental Education'
  | 'Physical Education'
  // Class 10 Maharashtra SSC Separate Mathematics Subjects
  | 'Mathematics – Algebra'
  | 'Mathematics – Geometry'
  // CBSE & ICSE Curriculum Subjects
  | 'Social Science'
  | 'History & Civics'
  | 'Computer Studies'
  | 'Computer Applications'
  | 'Economics'
  | 'Commercial Studies'
  | 'Sanskrit';

export type QuizLevel = 1 | 2 | 3 | 4;

export interface SubjectLevelProgress {
  maxUnlockedLevel: QuizLevel;
  completedLevels: QuizLevel[];
  bestScores: Record<number, number>; // level -> score out of 10
}

export interface WorksheetAttemptRecord {
  id: string;
  worksheetId: string;
  worksheetTitle: string;
  title?: string;
  board?: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapter?: string;
  obtainedMarks: number;
  score?: number;
  totalMarks: number;
  percentage: number;
  completedAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  parentName: string;
  parentEmail?: string;
  mobile: string;
  email: string;
  board?: EducationBoard;
  classLevel: ClassLevel;
  medium?: 'English' | 'Marathi' | 'Hindi' | 'Semi-English';
  schoolName?: string;
  parentConsent: boolean;
  points: number;
  coins: number;
  level: number; // 1 to 5
  streakDays: number;
  lastActiveDate: string;
  badges: string[]; // Badge IDs
  plan: 'free' | 'basic' | 'premium';
  registeredAt: string;
  planPurchasedAt?: string;
  planExpiresAt?: string;
  avatar: string;
  attemptedQuestionIds: string[]; // Crucial for zero question repetition per student
  attemptedScholarshipQuestionIds?: string[]; // Tracks attempted scholarship question IDs to ensure 0 duplicates
  attemptedPuzzleIds: string[];
  completedStoryIds: string[];
  completedWorksheetIds?: string[];
  worksheetAttempts?: WorksheetAttemptRecord[];
  subjectProgress?: Record<string, SubjectLevelProgress>; // SubjectName or Class__SubjectName or Board__Class__SubjectName -> Level progress
  classChangeLogs?: {
    oldBoard?: EducationBoard;
    newBoard?: EducationBoard;
    oldClass: ClassLevel;
    newClass: ClassLevel;
    reason: string;
    changedAt: string;
    adminName: string;
  }[];
  // Authentic verification status
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  firebaseUid?: string;
  passwordHash?: string;
  // Student & Teacher Portal role & Board+Class-Wise Multi-Class Subscription activation
  accountRole?: 'student' | 'teacher';
  primaryBoard?: EducationBoard;
  primaryClassLevel?: ClassLevel;
  activatedBoard?: EducationBoard;
  activatedClassLevel?: ClassLevel;
  activatedClasses?: ClassLevel[];
  activatedClassKeys?: BoardClassKey[];
  classSubscriptions?: Partial<Record<string, ClassSubscriptionRecord>>;
  activatedCategoryKeys?: CategoryId[];
  categorySubscriptions?: Partial<Record<CategoryId, CategorySubscriptionRecord>>;
  selectedTeacherCategories?: CategoryId[];
  lastPaymentId?: string;
  lastOrderId?: string;
  // Referral & School Governance extensions
  referralCode?: string;
  referralLink?: string;
  referredByCode?: string;
  referredByStudentId?: string;
  linkedParentId?: string;
  attendanceRecords?: AttendanceRecord[];
  assignments?: AssignmentItem[];
  feeRecords?: FeeRecord[];
  // MSCE Pune Scholarship Examination Medium & Full Mock Attempt History
  scholarshipMedium?: 'English' | 'Marathi' | 'Hindi';
  msceMockAttempts?: import('../data/msceMockExamEngine').MsceMockAttemptRecord[];
  // MAHA TET & CTET Exam Preparation History & Preferences
  tetCtetAttempts?: import('./tetCtet').TetCtetAttemptRecord[];
  tetCtetPreferences?: import('./tetCtet').TetCtetUserPreferences;
}

export interface ClassSubscriptionRecord {
  board?: EducationBoard;
  boardClassKey?: BoardClassKey;
  classLevel: ClassLevel;
  plan: 'free' | 'basic' | 'premium';
  status: 'ACTIVE' | 'EXPIRED' | 'LOCKED';
  purchasedAt?: string;
  expiresAt?: string;
  paymentId?: string;
  orderId?: string;
  amountInr?: number;
  validityDays?: number;
  updatedAt?: string;
}

export interface ChapterNoteExample {
  prompt: string;
  solution: string;
}

export interface OfficialTextbookResource {
  id: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  bookTitle: string;
  publisher: string;
  editionYear: string;
  mediums: ('English' | 'Marathi' | 'Hindi')[];
  officialReadUrl: string;
  officialPortalName: string;
  secondaryPortalUrl: string;
  secondaryPortalName: string;
  syllabusCode: string;
  totalChapters: number;
  chapters: string[];
}

export interface ChapterDefinitionItem {
  term: string;
  meaning: string;
}

export interface ChapterShortRevisionNotes {
  onePageSummary: string;
  quickRevisionPoints: string[];
  memoryTricks: string[];
  importantFacts: string[];
}

export type ChapterQAFormat =
  | 'very_short'
  | 'short_answer'
  | 'long_answer'
  | 'textbook_exercise'
  | 'give_reason'
  | 'distinguish_between'
  | 'explain_concept'
  | 'fill_in_blanks'
  | 'match_and_true_false';

export interface ChapterQAItem {
  id: string;
  format: ChapterQAFormat;
  formatLabel: string;
  marks: number;
  question: string;
  answer: string;
  examTip?: string;
}

export interface ChapterStudyMaterial {
  id: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
  textbookRef?: string;
  overview: string;
  keyPoints: string[];
  formulasAndRules: string[];
  solvedExamples: ChapterNoteExample[];
  revisionChecklist: string[];
  isFreePreview?: boolean;
  // Phase 2 Free Study Material Library Enrichments
  officialTextbook?: OfficialTextbookResource;
  detailedExplanation?: string[];
  keyDefinitions?: ChapterDefinitionItem[];
  chapterSummary?: string;
  shortRevisionNotes?: ChapterShortRevisionNotes;
  qaBank?: ChapterQAItem[];
}

export interface ChapterPracticeTestQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Exam-Ready';
}

export interface ChapterPracticeTest {
  id: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
  durationMinutes: number;
  totalMarks: number;
  questions: ChapterPracticeTestQuestion[];
}

export interface ExamPaperQuestionItem {
  qNo: string;
  question: string;
  marks: number;
  modelAnswer: string;
}

export interface ExamPaperSection {
  sectionTitle: string;
  sectionInstructions: string;
  totalSectionMarks: number;
  questions: ExamPaperQuestionItem[];
}

export interface StudyLibraryExamPaper {
  id: string;
  paperType: 'model_paper' | 'pyq';
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  title: string;
  yearOrTerm: string;
  boardPatternLabel: string;
  durationLabel: string;
  totalMarks: number;
  officialPortalUrl: string;
  officialPortalName: string;
  generalInstructions: string[];
  sections: ExamPaperSection[];
}

export interface EducationalVideoLesson {
  id: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapterNumber: number;
  chapterTitle: string;
  lessonTitle: string;
  durationLabel: string;
  mediums: string[];
  providerName: string;
  officialVideoPortalUrl: string;
  dikshaSearchUrl: string;
  ncertVideoUrl?: string;
  learningObjectives: string[];
  lessonOutline: string[];
  keyTakeaway: string;
}

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  linkedStudentIds: string[];
  isVerified: boolean;
  registeredAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'HOLIDAY' | 'late' | 'present' | string;
  minutesLogged?: number;
  remarks?: string;
}

export interface AssignmentItem {
  id: string;
  studentId: string;
  title: string;
  subject: SubjectName;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'EVALUATED' | 'graded' | 'submitted' | string;
  maxScore: number;
  obtainedScore?: number;
  score?: number;
  teacherRemarks?: string;
  teacherFeedback?: string;
  description?: string;
  submittedAt?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  receiptNumber?: string;
  receiptNo?: string;
  feeType?: string;
  title?: string;
  totalAmount?: number;
  amount?: number;
  paidAmount?: number;
  dueAmount?: number;
  status: 'PAID' | 'PARTIAL' | 'DUE' | 'paid' | 'due' | 'overdue' | string;
  dueDate: string;
  paidAt?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  targetAudience: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'PARENTS';
  publishedAt: string;
  author: string;
}

export interface AuthenticatedUser {
  uid: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  displayName: string;
  studentId?: string; // If student or teacher
  board?: EducationBoard;
  classLevel?: ClassLevel;
  linkedStudentIds?: string[];
  isVerified: boolean;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  duplicateField?: 'email' | 'mobile';
  existingStudentName?: string;
  existingBoard?: EducationBoard;
  existingClass?: ClassLevel;
  existingStudent?: StudentProfile;
  existingAccountMatchedPair?: boolean;
  alreadyUnlockedTargetClass?: boolean;
  needsExistingAccountAuth?: boolean;
  student?: StudentProfile;
  requiresDualVerification?: boolean;
}

export type QuestionType =
  | 'mcq'
  | 'fill_blank'
  | 'true_false'
  | 'match_following'
  | 'find_incorrect'
  | 'choose_correct_statement'
  | 'complete_sentence'
  | 'problem_solving'
  | 'picture_based'
  | 'logical_reasoning'
  | 'assertion_reasoning'
  | 'number_based'
  | 'sequence_pattern'
  | 'comprehension'
  | 'real_life_application'
  | 'diagram_identification';

export interface QuizQuestion {
  id: string;
  board?: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  level?: QuizLevel; // 1: Easy, 2: Medium, 3: Hard, 4: Expert (defaults to 1)
  topic?: string;
  questionType?: QuestionType;
  questionText: string;
  normalizedHash: string; // for duplicate detection
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  diagramEmoji?: string;
  timesAttempted: number;
  timesCorrect: number;
  status: 'approved' | 'rejected' | 'pending';
  author: 'system' | 'admin' | 'curriculum-expert' | 'ai-validator';
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  studentName: string;
  board?: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  level?: QuizLevel; // 1, 2, 3, or 4
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scorePercent: number;
  timeTakenSeconds: number;
  pointsEarned: number;
  passed?: boolean;
  questionIds: string[];
  answers: {
    questionId: string;
    questionText: string;
    options: string[];
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
    explanation: string;
  }[];
  completedAt: string;
}

export interface StoryComprehensionQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface StoryItem {
  id: string;
  title: string;
  language: 'English' | 'Hindi' | 'Marathi';
  themeColor: string;
  category: string;
  classRecommendation: string;
  summary: string;
  content: string[];
  moral: string;
  vocabulary: { word: string; meaning: string }[];
  questions: StoryComprehensionQuestion[];
  estimatedReadMinutes: number;
  audioSampleScript: string;
  published?: boolean;
  isCustom?: boolean;
}

export type SpecialLearningSectionId =
  | 'scholarship'
  | 'drawing'
  | 'stories'
  | 'shivaji'
  | 'gk_cricket'
  | 'creative_activities'
  | 'future_skills'
  | 'all_courses';

export interface SectionVisibilityRule {
  visibleToVisitors: boolean;
  visibleToStudents: boolean;
}

export type SectionVisibilityConfig = Record<SpecialLearningSectionId, SectionVisibilityRule>;

export interface SpecialLearningProgramItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  iconEmoji: string;
  targetTab: string;
  badgeText?: string;
  highlights: string[];
  published: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface CustomScholarshipQuestionRecord {
  id: string;
  stdLevel: 'Std 4th (PSE)' | 'Std 7th (UPS)';
  testNumber: number;
  section: 'First Language' | 'Mathematics' | 'Second Language' | 'Intelligence Test';
  subject: 'First Language' | 'Mathematics' | 'Second Language' | 'Intelligence Test';
  questionNumberInSet: number;
  difficulty: 'easy' | 'moderate' | 'difficult';
  type: string;
  questionText: Record<string, string>;
  options: Record<string, [string, string, string, string]>;
  correctIndex: number;
  explanation: Record<string, string>;
  marks: number;
  published?: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface CustomGkQuestionItem {
  id: string;
  level: QuizLevel;
  category:
    | 'Current Affairs'
    | 'Records & Stats'
    | 'IPL & Leagues'
    | 'Rules & Terminology'
    | 'World Cup & History'
    | 'Women Cricket'
    | 'General Knowledge';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  published?: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export type DrawingCategory = 
  | 'Nature'
  | 'Animals'
  | 'Festivals'
  | 'Cartoon and Fun'
  | 'Transport'
  | 'Education and Science'
  | 'Nature and Scenery'
  | 'Animals and Birds'
  | 'Flowers and Gardens'
  | 'Festivals and Celebrations'
  | 'Cartoons and Fun Characters'
  | 'Vehicles and Transport'
  | 'Fruits and Vegetables'
  | 'My School and Family'
  | 'Indian Culture'
  | 'Space and Planets'
  | 'Save Our Environment'
  | 'Creative Imagination';

export interface DrawingTemplate {
  id: string;
  title: string;
  category: DrawingCategory;
  classTier: 'Classes 2–3' | 'Classes 4–5' | 'Classes 6–8';
  description: string;
  svgOutline: string; // Clean SVG outline with enclosed paths for flood-fill
  published: boolean;
  featured?: boolean;
}

export interface DrawingChallenge {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'festival' | 'nature' | 'creative';
  theme: string;
  description: string;
  rewardPoints: number;
  badgeId: string;
  badgeName: string;
  endsIn: string;
}

export interface DrawingSubmission {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  topic: string;
  category: string;
  type: 'coloured' | 'original'; // Coloured ready-made vs My Own Drawing
  templateId?: string;
  dataUrl: string;
  createdAt: string;
  pointsEarned: number;
  badgeAwarded?: string;
}

export interface PuzzleItem {
  id: string;
  title: string;
  category: 
    | 'number' 
    | 'math' 
    | 'logic' 
    | 'word' 
    | 'memory' 
    | 'odd_one_out' 
    | 'sequence' 
    | 'sudoku';
  minClass: number; // 2
  maxClass: number; // 8
  prompt: string;
  instructions: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
  points: number;
  metadata?: any;
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  parentEmail: string;
  parentMobile: string;
  selectedBoard?: EducationBoard;
  selectedClass?: ClassLevel;
  planId: 'basic' | 'premium';
  planSku?: PlanSkuId;
  activatedCategories?: CategoryId[];
  planTitle: string;
  amount: number; // 99, 199, 299, 349, or 499
  currency: 'INR';
  orderId: string;
  paymentId: string;
  signature: string;
  method: 'UPI' | 'Card' | 'NetBanking' | string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  createdAt: string;
  verifiedAt?: string;
  membershipStartDate?: string;
  membershipExpiryDate?: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'quiz' | 'streak' | 'story' | 'drawing' | 'puzzle' | 'membership';
  pointsRequirement: number;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'challenge' | 'achievement' | 'quiz' | 'membership' | 'story' | 'drawing';
  timestamp: string;
  read: boolean;
}

export type DeviceSessionStatus = 'ACTIVE' | 'TERMINATED' | 'EXPIRED';

export type DeviceType = 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop';

export interface DeviceSessionRecord {
  userId: string;
  firebaseUid?: string;
  email: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  activeSessionId: string;
  deviceId: string;
  hardwareSignature: string;
  deviceSignature: string;
  deviceName: string;
  deviceType: DeviceType;
  browser: string;
  os: string;
  userAgentSummary: string;
  status: DeviceSessionStatus;
  loginAt: string;
  lastActivityAt: string;
  expiresAt: string;
  expiresAtMs: number;
  terminatedBy?: 'USER_LOGOUT' | 'ADMIN' | 'USER_RECOVERY' | 'EXPIRED' | 'SECURITY_MISMATCH' | 'NEW_DEVICE_LOGIN';
  terminatedAt?: string;
  terminationReason?: string;
  previousSessionId?: string;
  previousDeviceId?: string;
  recoveryCount24h?: number;
  lastRecoveryAt?: string;
}

export * from './referral';
export * from './support';
export * from './tetCtet';



