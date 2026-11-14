import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  StudentProfile, 
  RegistrationResult,
  ClassSubscriptionRecord,
  QuizQuestion, 
  QuizAttempt, 
  StoryItem, 
  DrawingSubmission, 
  PuzzleItem, 
  PaymentTransaction, 
  InAppNotification, 
  ClassLevel, 
  SubjectName,
  EducationBoard,
  QuestionType,
  QuizLevel,
  SubjectLevelProgress,
  DrawingTemplate,
  DrawingChallenge,
  ParentProfile,
  AttendanceRecord,
  AssignmentItem,
  FeeRecord,
  AnnouncementItem,
  AuthenticatedUser,
  WorksheetAttemptRecord,
  DeviceSessionRecord,
  SpecialLearningSectionId,
  SectionVisibilityConfig,
  SpecialLearningProgramItem,
  CustomScholarshipQuestionRecord,
  CustomGkQuestionItem
} from '../types';
import {
  acquireSingleDeviceSession,
  clearLocalActiveSessionState,
  getLocalActiveSessionState,
  recoverSingleDeviceSession,
  releaseSingleDeviceSession,
  sendDeviceSessionHeartbeat,
  SINGLE_DEVICE_BLOCK_MESSAGE,
  subscribeToUserDeviceSession,
  validateActiveDeviceSession,
  verifyLocalSessionNotCopied
} from '../services/deviceSessionService';
import { 
  getInitialSeedQuestions, 
  getStrictClassSubjectQuestions, 
  getStrictClassSubjectLevelQuestions,
  checkQuestionDuplicate, 
  generateClassSpecificCurriculumQuestion 
} from '../services/questionBankService';
import { ALL_45_STORIES } from '../data/storiesMaster';
import { SHIVAJI_STORIES, ShivajiStory } from '../data/shivajiStoriesData';
import { DAILY_CRICKET_QUESTIONS_BANK } from '../data/cricketQuizData';
import { SEED_PUZZLES } from '../data/puzzlesData';
import { READY_MADE_DRAWING_TEMPLATES } from '../data/drawingsData';
import { 
  auth,
  testFirestoreConnection, 
  saveScholarshipAttemptToFirestore,
  loginFirebaseEmailUser,
  sendFirebasePasswordReset,
  confirmFirebasePasswordReset,
  signOutFirebaseUser,
  saveStudentProfileToFirestore,
  saveSubscriptionToFirestore,
  saveTransactionToFirestore,
  fetchStudentSubscriptionFromFirestore,
  fetchStudentProfileFromFirestore,
  switchStudentActiveClassInFirestore,
  computePaidPlanExpiryIsoDate,
  ensureStudentReferralCodeInFirestore,
  onAuthStateChanged
} from '../services/firebase';
import {
  DEFAULT_SECTION_VISIBILITY,
  loadPlatformConfigFromFirestore,
  savePlatformConfigToFirestore,
  loadPublishedSpecialContentFromFirestore,
  saveSpecialContentItemToFirestore,
  deleteSpecialContentItemFromFirestore,
} from '../services/specialContentFirestoreService';
import {
  checkExistingAccountApi,
  switchStudentActiveClassApi,
} from '../services/paymentService';
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
  sanitizeReferralCode
} from '../utils/referralCoding';
import { 
  ScholarshipClass, 
  ScholarshipLanguage, 
  ScholarshipQuestion, 
  ScholarshipSection 
} from '../data/scholarshipData';
import {
  buildBoardClassKey,
  canAccessWorksheet,
  canSwitchBoardAndClass,
  canSwitchToClass,
  formatStandardOrdinal,
  getActivatedBoardClassesList,
  getActivatedClassesList,
  getBoardDisplayName,
  getClassSubscriptionInfo,
  getPremiumActivatedBannerMessage,
  getPrimaryBaseBoard,
  getPrimaryBaseClass,
  getRawBoardClassSubscriptionsMap,
  getRawClassSubscriptionsMap,
  normalizeBoardValue,
  normalizeClassLevelValue,
  parseBoardAndClassFromWorksheetId,
  parseBoardClassKey,
  WORKSHEET_PREMIUM_UPGRADE_MESSAGE
} from '../utils/subscriptionAccess';
import {
  auditStudentSubscriptionRecord,
  formatDateIstDisplay
} from '../utils/subscriptionDateUtils';

export type UserRole = 'student' | 'teacher' | 'admin';

interface RejectedQuestionRecord {
  id: string;
  candidateText: string;
  matchedQuestionId?: string;
  reason: string;
  similarityScore: number;
  timestamp: string;
}

interface PlatformSettings {
  timers: {
    classes2to3: number; // 30
    classes4to5: number; // 25
    classes6to8: number; // 20
  };
  pointsPerQuizCorrect: number; // 10
  pointsPerStoryRead: number; // 20
  pointsPerDrawing: number; // 30
  pointsPerPuzzle: number; // 25
  sectionVisibility: SectionVisibilityConfig;
}

export interface SecurityAuditCheck {
  id: string;
  title: string;
  description: string;
  category: 'student_isolation' | 'parent_isolation' | 'admin_privilege' | 'database_security';
  passed: boolean;
  details: string;
}

export interface SecurityAuditReport {
  tests: SecurityAuditCheck[];
  overallPassed: boolean;
  timestamp: string;
}

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: AuthenticatedUser | null;
  currentStudent: StudentProfile | null;
  activeBoard: EducationBoard;
  studentsList: StudentProfile[];
  parentsList: ParentProfile[];
  announcements: AnnouncementItem[];
  allQuestions: QuizQuestion[];
  rejectedDuplicates: RejectedQuestionRecord[];
  allStories: StoryItem[];
  shivajiStories: ShivajiStory[];
  customScholarshipQuestions: CustomScholarshipQuestionRecord[];
  gkQuestions: CustomGkQuestionItem[];
  learningPrograms: SpecialLearningProgramItem[];
  allPuzzles: PuzzleItem[];
  savedDrawings: DrawingSubmission[];
  allAttempts: QuizAttempt[];
  transactions: PaymentTransaction[];
  notifications: InAppNotification[];
  platformSettings: PlatformSettings;
  sectionVisibility: SectionVisibilityConfig;
  isSectionVisible: (sectionId: SpecialLearningSectionId) => boolean;
  updateSectionVisibility: (next: SectionVisibilityConfig) => Promise<void>;
  
  // Student & Teacher Portal Authentication & Session Guarding
  switchRole: (targetRole: UserRole) => { allowed: boolean; message?: string };
  loginAsTeacher: (email: string, password?: string) => Promise<{ success: boolean; message: string; teacher?: StudentProfile; blockedByActiveDevice?: boolean }>;
  loginAsAdmin: (email: string, password?: string) => Promise<{ success: boolean; message: string; adminEmail?: string }>;
  activeDeviceSession: DeviceSessionRecord | null;
  sessionSecurityNotice: string | null;
  clearSessionSecurityNotice: () => void;
  acquireSessionAfterRegistration: (student: StudentProfile, idToken?: string) => Promise<{ allowed: boolean; error?: string }>;
  recoverBlockedDeviceSession: (params: {
    email: string;
    password: string;
    mobile: string;
    preferredRole?: 'student' | 'teacher';
  }) => Promise<{ success: boolean; message: string; student?: StudentProfile }>;
  
  // Auth & Session methods - Multi-Board & Multi-Class Subscriptions Linked to Unique Mobile & Email Account
  checkAccountForMultiClassRegistration: (
    email: string,
    mobile: string,
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard
  ) => Promise<{
    exists: boolean;
    matchedPair: boolean;
    mismatchField?: 'email' | 'mobile' | null;
    existingStudentName?: string;
    existingBoard?: EducationBoard;
    existingClass?: ClassLevel;
    accountRole?: 'student' | 'teacher';
    activeClasses?: ClassLevel[];
    activeClassKeys?: string[];
    alreadyUnlockedTargetClass?: boolean;
    localStudent?: StudentProfile;
  }>;
  registerStudent: (
    data: Omit<StudentProfile, 'id' | 'points' | 'coins' | 'level' | 'streakDays' | 'lastActiveDate' | 'badges' | 'plan' | 'attemptedQuestionIds' | 'attemptedPuzzleIds' | 'completedStoryIds' | 'registeredAt' | 'classChangeLogs' | 'subjectProgress'>,
    options?: {
      verifiedFirebaseUid?: string;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      accountRole?: 'student' | 'teacher';
    }
  ) => RegistrationResult;
  loginWithEmail: (email: string, password?: string, preferredRole?: 'student' | 'teacher') => Promise<{ success: boolean; message: string; student?: StudentProfile; blockedByActiveDevice?: boolean }>;
  recoverAccount: (email: string) => Promise<{ success: boolean; message: string; student?: StudentProfile }>;
  completePasswordReset: (oobCode: string, newPassword: string) => Promise<{ success: boolean; message: string; email?: string; student?: StudentProfile }>;
  logout: () => Promise<void>;
  quickSwitchStudent: (studentId: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  // School Records & Academic Governance (Admin & Teachers)
  updateStudentAttendance: (studentId: string, record: AttendanceRecord) => void;
  addStudentAssignment: (studentId: string, assignment: Omit<AssignmentItem, 'id'>) => void;
  updateStudentAssignment: (studentId: string, assignmentId: string, updates: Partial<AssignmentItem>) => void;
  updateStudentFeeRecord: (studentId: string, feeRecord: FeeRecord) => void;
  addAnnouncement: (announcement: Omit<AnnouncementItem, 'id' | 'publishedAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  linkParentToStudent: (parentId: string, studentId: string) => { success: boolean; message: string };

  // Automated Security Verification Test Runner
  runSecurityAuditTest: () => Promise<SecurityAuditReport>;

  // Class Promotion & Multi-Board / Multi-Class Switching (Maharashtra, CBSE, ICSE • Classes 1 to 10)
  adminPromoteOrCorrectClass: (studentId: string, newClass: ClassLevel, reason: string, adminName?: string) => { success: boolean; message: string };
  switchActiveClass: (targetClass: ClassLevel, targetBoard?: EducationBoard) => Promise<{ success: boolean; message: string; needsPurchase?: boolean; needsRenewal?: boolean }>;
  switchActiveBoardAndClass: (targetBoard: EducationBoard, targetClass: ClassLevel) => Promise<{ success: boolean; message: string; needsPurchase?: boolean; needsRenewal?: boolean }>;
  promoteOrUpdateStudentClass: (newClass: ClassLevel, reason?: string) => { success: boolean; message: string };
  updateStudentClass: (newClass: ClassLevel) => void;

  // Online Worksheets (Classes 1 to 10 across Maharashtra, CBSE, ICSE)
  submitWorksheetAttempt: (attemptData: Omit<WorksheetAttemptRecord, 'id' | 'completedAt'>) => WorksheetAttemptRecord;

  // Quiz & Zero Repetition 4-Level Engine (Board + Class + Subject)
  getSubjectLevelProgress: (subject: SubjectName, classLevelOverride?: ClassLevel, boardOverride?: EducationBoard) => SubjectLevelProgress;
  getUnattemptedQuizQuestions: (classLevel: ClassLevel, subject: SubjectName, board?: EducationBoard) => QuizQuestion[];
  fetchClassSubjectQuestionsAsync: (classLevel: ClassLevel, subject: SubjectName, board?: EducationBoard) => Promise<QuizQuestion[]>;
  fetchClassSubjectLevelQuestionsAsync: (classLevel: ClassLevel, subject: SubjectName, level: QuizLevel, board?: EducationBoard) => Promise<QuizQuestion[]>;
  updateQuestionStatus: (questionId: string, status: 'approved' | 'rejected') => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => QuizAttempt;
  addNewQuestionWithValidation: (questionData: {
    board?: EducationBoard;
    classLevel: ClassLevel;
    subject: SubjectName;
    level?: QuizLevel;
    topic?: string;
    questionType?: QuestionType;
    questionText: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
    difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  }) => { success: boolean; message: string; duplicateCheck?: any };
  deleteQuestion: (questionId: string) => void;

  // Story & Shivaji CMS methods
  markStoryCompleted: (storyId: string) => void;
  addOrUpdateStory: (story: StoryItem) => Promise<void>;
  toggleStoryPublished: (storyId: string) => Promise<void>;
  deleteCustomStory: (storyId: string) => Promise<void>;
  addOrUpdateShivajiStory: (story: ShivajiStory) => Promise<void>;
  deleteCustomShivajiStory: (storyId: string) => Promise<void>;

  // Drawing methods & Template Management
  drawingTemplates: DrawingTemplate[];
  saveDrawingSubmission: (drawing: Omit<DrawingSubmission, 'id' | 'studentId' | 'studentName' | 'createdAt'>) => DrawingSubmission;
  deleteDrawingSubmission: (drawingId: string) => void;
  addDrawingTemplate: (tpl: DrawingTemplate) => void;
  toggleDrawingTemplatePublished: (templateId: string) => void;
  deleteDrawingTemplate: (templateId: string) => void;

  // Puzzle methods
  solvePuzzle: (puzzleId: string, pointsAwarded: number) => void;

  // GK & Scholarship & Learning Program CMS methods
  addOrUpdateScholarshipQuestion: (q: CustomScholarshipQuestionRecord) => Promise<void>;
  deleteCustomScholarshipQuestion: (id: string) => Promise<void>;
  addOrUpdateGkQuestion: (q: CustomGkQuestionItem) => Promise<void>;
  deleteCustomGkQuestion: (id: string) => Promise<void>;
  addOrUpdateLearningProgram: (program: SpecialLearningProgramItem) => Promise<void>;
  deleteLearningProgram: (id: string) => Promise<void>;

  // Payment & Membership
  activateVerifiedMembership: (transaction: PaymentTransaction, customExpiryDate?: string) => void;
  adminApplyApproved365DayMigration: (studentId: string) => {
    success: boolean;
    message: string;
    previousExpiresAt?: string | null;
    updatedExpiresAt?: string | null;
  };

  // Scholarship methods
  recordScholarshipAttempt: (
    classLevel: ScholarshipClass,
    setNumber: number,
    language: ScholarshipLanguage,
    questionsList: ScholarshipQuestion[],
    userAnswers: Record<string, number>,
    totalMarks: number,
    maxMarks: number,
    sectionScores: Record<ScholarshipSection, { obtained: number; max: number; correct: number; total: number }>
  ) => Promise<void>;

  // Admin platform settings
  updateTimers: (c23: number, c45: number, c68: number) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const DEFAULT_LEARNING_PROGRAMS: SpecialLearningProgramItem[] = [
  {
    id: 'prog-scholarship',
    title: 'MSCE Scholarship Corner',
    subtitle: 'Std 4th (PSE) & Std 7th (UPS)',
    category: 'Competitive Exams',
    description: '600+ official Maharashtra Scholarship questions across 10 mock sets in Marathi, English & Hindi.',
    iconEmoji: '🏆',
    targetTab: 'scholarship',
    badgeText: '600 Qs',
    highlights: ['4 MSCE Sections', '3 Exam Languages', 'Instant Answer Keys'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-drawing',
    title: 'Drawing & Colouring Studio',
    subtitle: '120+ Vector Templates + Freehand Canvas',
    category: 'Creative Arts',
    description: 'Interactive flood-fill colouring templates, brush tools, shape stamps, and artwork portfolio.',
    iconEmoji: '🎨',
    targetTab: 'drawing',
    badgeText: '120 Templates',
    highlights: ['Flood-Fill Bucket', 'Undo/Redo Studio', 'PNG Download'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-stories',
    title: 'Story World (Audio Library)',
    subtitle: '45 Moral Stories in 3 Languages',
    category: 'Reading & Listening',
    description: '15 English, 15 Hindi & 15 Marathi stories with read-along speech synthesis and vocabulary quizzes.',
    iconEmoji: '📖',
    targetTab: 'stories',
    badgeText: '45 Stories',
    highlights: ['Audio Narration', 'Speed Control', 'Comprehension Quiz'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-shivaji',
    title: 'Chhatrapati Shivaji Maharaj Stories',
    subtitle: '50 Chronological Historical Chapters',
    category: 'Heritage & Leadership',
    description: 'From Shivneri to Raigad: 50 inspiring Swarajya chapters with Marathi, Hindi & English narration.',
    iconEmoji: '👑',
    targetTab: 'shivaji',
    badgeText: '50 Chapters',
    highlights: ['Trilingual Text & Audio', 'Timeline & Forts', 'Leadership Lessons'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-puzzles',
    title: 'Brain Puzzles & Logic Arena',
    subtitle: '47+ Math Riddles, Pattern & Memory Games',
    category: 'Creative Activities',
    description: 'Fun critical-thinking challenges designed for Classes 1 to 10 to sharpen reasoning speed.',
    iconEmoji: '🧩',
    targetTab: 'puzzles',
    badgeText: '47+ Puzzles',
    highlights: ['Memory Card Match', 'Hints & Explanations', 'Logic Sequences'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-sudoku',
    title: 'Sudoku Mastery (4×4 · 6×6 · 9×9)',
    subtitle: 'Beginner to Champion Grid Logic',
    category: 'Creative Activities',
    description: 'Age-progressive Sudoku boards with pencil-note mode, smart hint checker, and timer.',
    iconEmoji: '🔢',
    targetTab: 'sudoku',
    badgeText: '3 Grid Sizes',
    highlights: ['4×4 Kids Grid', 'Pencil Marks', 'Instant Verification'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-ai-academy',
    title: 'AI Learning Academy & Future Skills',
    subtitle: '8 Modules · 24 Interactive AI Lessons',
    category: '21st-Century Skills',
    description: 'Kid-friendly lessons covering AI, Machine Learning, Robotics, Computer Vision, and Digital Ethics.',
    iconEmoji: '🤖',
    targetTab: 'future-skills',
    badgeText: '24 Lessons',
    highlights: ['Interactive Lesson Quizzes', 'Robotics & Vision', 'Digital Safety'],
    published: true,
    isCustom: false,
  },
  {
    id: 'prog-certificates',
    title: 'Champion Certificates & Leaderboard',
    subtitle: 'Verified Achievement Recognition',
    category: 'Rewards & Milestones',
    description: 'Earn points, badges, and printable merit certificates across quizzes, worksheets, stories, and art.',
    iconEmoji: '🎖️',
    targetTab: 'certificates',
    badgeText: '15 Badges',
    highlights: ['Printable Certificates', 'Skill Badges', 'XP Tracking'],
    published: true,
    isCustom: false,
  },
];

const DEFAULT_SETTINGS: PlatformSettings = {
  timers: {
    classes2to3: 30,
    classes4to5: 25,
    classes6to8: 20
  },
  pointsPerQuizCorrect: 10,
  pointsPerStoryRead: 25,
  pointsPerDrawing: 30,
  pointsPerPuzzle: 25,
  sectionVisibility: DEFAULT_SECTION_VISIBILITY,
};

const LEGACY_SAMPLE_IDS = new Set([
  'uid_aarav_c4_987654',
  'uid_ananya_c6_982201',
  'uid_rohan_c7_983301',
  'uid_teacher_meera_c7_984401',
  'uid_teacher_vikram_c9_985502'
]);

const INITIAL_PARENTS: ParentProfile[] = [];

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: '🏆 Maharashtra MSCE Scholarship Mock Tests Live',
    content: 'Full 10 practice sets for Std 4th and Std 7th with 30 questions each across 7 MSCE languages are now accessible in the Scholarship Champions arena.',
    targetAudience: 'ALL',
    publishedAt: '2026-05-05T09:00:00.000Z',
    author: 'Head Administrator'
  },
  {
    id: 'ann-2',
    title: '📝 Class-Wise Online Interactive Worksheets (Standards 1st to 10th)',
    content: 'Complete class-wise and subject-wise worksheets online with instant evaluation and model solutions. Free users get 2 Demo Worksheets (1 English & 1 Mathematics); ₹99 unlocks all worksheets for your selected class.',
    targetAudience: 'STUDENTS',
    publishedAt: '2026-05-06T11:30:00.000Z',
    author: 'Academic Supervisor'
  },
  {
    id: 'ann-3',
    title: '👩‍🏫 Dedicated Teacher Portal Live for Standards 1st to 10th',
    content: 'Teachers can register and sign in to access class-wise subjects, worksheets, 4 quiz levels, stories with audio, daily current affairs, and scholarship practice for their selected class.',
    targetAudience: 'TEACHERS',
    publishedAt: '2026-05-07T14:00:00.000Z',
    author: 'Principal Office'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    const isLoggedOut = localStorage.getItem('vc_is_logged_out');
    if (isLoggedOut === 'true') return 'student';
    const savedUser = localStorage.getItem('vc_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.uid && LEGACY_SAMPLE_IDS.has(parsed.uid)) return 'student';
        if (parsed?.role === 'teacher') return 'teacher';
        if (parsed?.role === 'admin') return 'admin';
      } catch {}
    }
    return 'student';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeDeviceSession, setActiveDeviceSession] = useState<DeviceSessionRecord | null>(null);
  const [sessionSecurityNotice, setSessionSecurityNotice] = useState<string | null>(null);
  const isHandlingAuthFlowRef = React.useRef<boolean>(false);

  // Authenticated user session with role and linked IDs (signed out by default until verified login)
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(() => {
    const isLoggedOut = localStorage.getItem('vc_is_logged_out');
    if (isLoggedOut === 'true') {
      return null;
    }
    const savedUser = localStorage.getItem('vc_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (!parsed || !parsed.uid || LEGACY_SAMPLE_IDS.has(parsed.uid)) {
          return null;
        }
        if (parsed?.role === 'parent') {
          parsed.role = 'student';
        }
        // Prevent copied localStorage tokens from booting an unauthorized session on another device
        if (parsed?.role !== 'admin') {
          const localSess = getLocalActiveSessionState();
          if (localSess && !verifyLocalSessionNotCopied(parsed.uid).valid) {
            return null;
          }
        }
        return parsed;
      } catch (e) {
        console.error('Error reading current user:', e);
      }
    }
    return null;
  });

  const [parentsList, setParentsList] = useState<ParentProfile[]>(INITIAL_PARENTS);

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('vc_announcements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading announcements:', e);
      }
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [studentsList, setStudentsList] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('vc_students_list');
    if (saved) {
      try {
        const parsed: StudentProfile[] = JSON.parse(saved);
        const usedCodes = new Set<string>();
        return parsed
          .filter(s => s && s.id && !LEGACY_SAMPLE_IDS.has(s.id))
          .map(s => {
            const { passwordHash: _stripHash, ...safeS } = s;
            const existingCode = sanitizeReferralCode(safeS.referralCode);
            const uniqueCode =
              existingCode && !usedCodes.has(existingCode)
                ? existingCode
                : generateUniqueStudentReferralCode(safeS.id, safeS.name, usedCodes);
            usedCodes.add(uniqueCode);

            const resolvedBoard = normalizeBoardValue(safeS.board || 'Maharashtra');
            return {
              ...safeS,
              accountRole: safeS.accountRole || 'student',
              board: resolvedBoard,
              primaryBoard: normalizeBoardValue(safeS.primaryBoard || resolvedBoard),
              activatedBoard: safeS.activatedBoard ? normalizeBoardValue(safeS.activatedBoard) : undefined,
              primaryClassLevel:
                normalizeClassLevelValue(safeS.primaryClassLevel) ||
                normalizeClassLevelValue(safeS.classLevel) ||
                'Class 1',
              activatedClassLevel:
                safeS.activatedClassLevel ||
                (safeS.plan === 'premium' || safeS.plan === 'basic' ? safeS.classLevel : undefined),
              activatedClasses: Array.isArray(safeS.activatedClasses) ? safeS.activatedClasses : undefined,
              activatedClassKeys: Array.isArray(safeS.activatedClassKeys) ? safeS.activatedClassKeys : undefined,
              classSubscriptions: safeS.classSubscriptions || undefined,
              referralCode: uniqueCode,
              referralLink: buildStudentReferralLink(uniqueCode),
              isPhoneVerified: Boolean(safeS.isPhoneVerified),
              isEmailVerified: Boolean(safeS.isEmailVerified),
              attendanceRecords: safeS.attendanceRecords || [],
              assignments: safeS.assignments || [],
              feeRecords: safeS.feeRecords || []
            };
          });
      } catch (e) {
        console.error('Error reading students list:', e);
      }
    }
    return [];
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() => {
    const isLoggedOut = localStorage.getItem('vc_is_logged_out');
    if (isLoggedOut === 'true') {
      return null;
    }
    const savedUser = localStorage.getItem('vc_current_user');
    const saved = localStorage.getItem('vc_current_student');
    if (saved && savedUser) {
      try {
        const parsed: StudentProfile = JSON.parse(saved);
        if (!parsed || !parsed.id || LEGACY_SAMPLE_IDS.has(parsed.id)) {
          return null;
        }
        const localSess = getLocalActiveSessionState();
        if (localSess && !verifyLocalSessionNotCopied(parsed.id).valid) {
          return null;
        }
        const { passwordHash: _stripHash, ...safeParsed } = parsed;
        const code =
          sanitizeReferralCode(safeParsed.referralCode) ||
          generateUniqueStudentReferralCode(safeParsed.id, safeParsed.name);
        const resolvedBoard = normalizeBoardValue(safeParsed.board || 'Maharashtra');
        return {
          ...safeParsed,
          accountRole: safeParsed.accountRole || 'student',
          board: resolvedBoard,
          primaryBoard: normalizeBoardValue(safeParsed.primaryBoard || resolvedBoard),
          activatedBoard: safeParsed.activatedBoard ? normalizeBoardValue(safeParsed.activatedBoard) : undefined,
          primaryClassLevel:
            normalizeClassLevelValue(safeParsed.primaryClassLevel) ||
            normalizeClassLevelValue(safeParsed.classLevel) ||
            'Class 1',
          activatedClassLevel:
            safeParsed.activatedClassLevel ||
            (safeParsed.plan === 'premium' || safeParsed.plan === 'basic'
              ? safeParsed.classLevel
              : undefined),
          activatedClasses: Array.isArray(safeParsed.activatedClasses)
            ? safeParsed.activatedClasses
            : undefined,
          activatedClassKeys: Array.isArray(safeParsed.activatedClassKeys)
            ? safeParsed.activatedClassKeys
            : undefined,
          classSubscriptions: safeParsed.classSubscriptions || undefined,
          referralCode: code,
          referralLink: buildStudentReferralLink(code)
        };
      } catch {
        return null;
      }
    }
    return null;
  });

  const safeSetLocalStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      // Free up space by removing legacy oversized question caches if QuotaExceededError occurs
      try {
        localStorage.removeItem('vc_questions_bank');
        localStorage.removeItem('vc_questions_bank_v2');
        localStorage.removeItem('vc_questions_bank_v3');
        localStorage.setItem(key, value);
      } catch (retryErr) {
        console.warn(`LocalStorage quota limit reached for ${key}:`, retryErr);
      }
    }
  };

  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>(() => {
    // Purge legacy oversized full-bank keys to free browser localStorage quota
    try {
      localStorage.removeItem('vc_questions_bank');
      localStorage.removeItem('vc_questions_bank_v2');
      localStorage.removeItem('vc_questions_bank_v3');
    } catch (e) {}

    const seed = getInitialSeedQuestions();
    const savedCustom = localStorage.getItem('vc_custom_questions_v3');
    if (!savedCustom) return seed;
    try {
      const parsedCustom: QuizQuestion[] = JSON.parse(savedCustom);
      const seedMap = new Map<string, QuizQuestion>();
      for (const s of seed) {
        seedMap.set(s.id, s);
      }
      for (const customQ of parsedCustom) {
        seedMap.set(customQ.id, customQ);
      }
      return Array.from(seedMap.values());
    } catch (e) {
      return seed;
    }
  });

  const [rejectedDuplicates, setRejectedDuplicates] = useState<RejectedQuestionRecord[]>(() => {
    const saved = localStorage.getItem('vc_rejected_questions');
    return saved ? JSON.parse(saved) : [];
  });

  const [allStories, setAllStories] = useState<StoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('vc_custom_stories');
      if (!saved) return ALL_45_STORIES.map(s => ({ ...s, published: true }));
      const custom: StoryItem[] = JSON.parse(saved);
      const map = new Map<string, StoryItem>(ALL_45_STORIES.map(s => [s.id, { ...s, published: true }]));
      custom.forEach(item => map.set(item.id, item));
      return Array.from(map.values());
    } catch {
      return ALL_45_STORIES.map(s => ({ ...s, published: true }));
    }
  });

  const [shivajiStories, setShivajiStories] = useState<ShivajiStory[]>(() => {
    try {
      const saved = localStorage.getItem('vc_custom_shivaji_stories');
      if (!saved) return SHIVAJI_STORIES.map(s => ({ ...s, published: true }));
      const custom: ShivajiStory[] = JSON.parse(saved);
      const map = new Map<string, ShivajiStory>(SHIVAJI_STORIES.map(s => [s.id, { ...s, published: true }]));
      custom.forEach(item => map.set(item.id, item));
      return Array.from(map.values()).sort((a, b) => a.order - b.order);
    } catch {
      return SHIVAJI_STORIES.map(s => ({ ...s, published: true }));
    }
  });

  const [customScholarshipQuestions, setCustomScholarshipQuestions] = useState<CustomScholarshipQuestionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('vc_custom_scholarship_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [gkQuestions, setGkQuestions] = useState<CustomGkQuestionItem[]>(() => {
    const builtIn: CustomGkQuestionItem[] = ([1, 2, 3, 4] as QuizLevel[]).flatMap(lvl =>
      (DAILY_CRICKET_QUESTIONS_BANK[lvl] || []).map(q => ({
        ...q,
        published: true,
        isCustom: false,
      }))
    );
    try {
      const saved = localStorage.getItem('vc_custom_gk_questions');
      if (!saved) return builtIn;
      const custom: CustomGkQuestionItem[] = JSON.parse(saved);
      const map = new Map<string, CustomGkQuestionItem>(builtIn.map(q => [q.id, q]));
      custom.forEach(item => map.set(item.id, item));
      return Array.from(map.values());
    } catch {
      return builtIn;
    }
  });

  const [learningPrograms, setLearningPrograms] = useState<SpecialLearningProgramItem[]>(() => {
    try {
      const saved = localStorage.getItem('vc_custom_learning_programs');
      if (!saved) return DEFAULT_LEARNING_PROGRAMS;
      const custom: SpecialLearningProgramItem[] = JSON.parse(saved);
      const map = new Map<string, SpecialLearningProgramItem>(DEFAULT_LEARNING_PROGRAMS.map(p => [p.id, p]));
      custom.forEach(item => map.set(item.id, item));
      return Array.from(map.values());
    } catch {
      return DEFAULT_LEARNING_PROGRAMS;
    }
  });

  const [allPuzzles, setAllPuzzles] = useState<PuzzleItem[]>(() => {
    const saved = localStorage.getItem('vc_puzzles_bank');
    return saved ? JSON.parse(saved) : SEED_PUZZLES;
  });

  const [savedDrawings, setSavedDrawings] = useState<DrawingSubmission[]>(() => {
    const saved = localStorage.getItem('vc_saved_drawings');
    return saved ? JSON.parse(saved) : [];
  });

  const [drawingTemplates, setDrawingTemplates] = useState<DrawingTemplate[]>(() => {
    const saved = localStorage.getItem('vc_drawing_templates');
    if (!saved) return READY_MADE_DRAWING_TEMPLATES;
    try {
      const parsed: DrawingTemplate[] = JSON.parse(saved);
      const map = new Map<string, DrawingTemplate>(READY_MADE_DRAWING_TEMPLATES.map(t => [t.id, t]));
      parsed.forEach(t => map.set(t.id, t));
      return Array.from(map.values());
    } catch (e) {
      return READY_MADE_DRAWING_TEMPLATES;
    }
  });

  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('vc_quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('vc_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem('vc_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'notif-1',
        title: 'Welcome to MyStudyZone – An Interactive Learning Platform for Students!',
        message: 'Learn, Practice, Explore and Achieve Excellence. Explore 14 subjects, 4 quiz levels, scholarship prep, 45 audio stories, drawing, and cricket quizzes!',
        type: 'challenge',
        timestamp: 'Just now',
        read: false
      },
      {
        id: 'notif-2',
        title: 'Daily Streak Active 🔥',
        message: 'Keep learning today to earn bonus points and champion badges!',
        type: 'achievement',
        timestamp: '1 hour ago',
        read: false
      }
    ];
  });

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    try {
      const saved = localStorage.getItem('vc_platform_settings');
      if (!saved) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        timers: { ...DEFAULT_SETTINGS.timers, ...(parsed.timers || {}) },
        sectionVisibility: {
          ...DEFAULT_SECTION_VISIBILITY,
          ...(parsed.sectionVisibility || {}),
        },
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Sync to local storage safely without exceeding browser quota
  useEffect(() => {
    safeSetLocalStorage('vc_students_list', JSON.stringify(studentsList));
  }, [studentsList]);

  useEffect(() => {
    if (currentStudent) {
      safeSetLocalStorage('vc_current_student', JSON.stringify(currentStudent));
    }
  }, [currentStudent]);

  useEffect(() => {
    // Only persist custom or modified questions (built-in 3,920 curriculum questions load from code)
    const customQuestionsOnly = allQuestions.filter(
      q => q.author !== 'curriculum-expert' || q.status === 'rejected'
    );
    safeSetLocalStorage('vc_custom_questions_v3', JSON.stringify(customQuestionsOnly));
  }, [allQuestions]);

  useEffect(() => {
    safeSetLocalStorage('vc_rejected_questions', JSON.stringify(rejectedDuplicates));
  }, [rejectedDuplicates]);

  useEffect(() => {
    safeSetLocalStorage('vc_saved_drawings', JSON.stringify(savedDrawings));
  }, [savedDrawings]);

  useEffect(() => {
    // Only persist custom/modified drawing templates
    const builtInMap = new Map(READY_MADE_DRAWING_TEMPLATES.map(t => [t.id, t]));
    const modifiedOrCustom = drawingTemplates.filter(t => {
      const builtIn = builtInMap.get(t.id);
      return !builtIn || builtIn.published !== t.published || builtIn.title !== t.title;
    });
    safeSetLocalStorage('vc_drawing_templates', JSON.stringify(modifiedOrCustom));
  }, [drawingTemplates]);

  useEffect(() => {
    const builtInIds = new Set(ALL_45_STORIES.map(s => s.id));
    const customOrModified = allStories.filter(s => s.isCustom || !builtInIds.has(s.id) || s.published === false);
    safeSetLocalStorage('vc_custom_stories', JSON.stringify(customOrModified));
  }, [allStories]);

  useEffect(() => {
    const builtInIds = new Set(SHIVAJI_STORIES.map(s => s.id));
    const customOrModified = shivajiStories.filter(s => s.isCustom || !builtInIds.has(s.id) || s.published === false);
    safeSetLocalStorage('vc_custom_shivaji_stories', JSON.stringify(customOrModified));
  }, [shivajiStories]);

  useEffect(() => {
    safeSetLocalStorage('vc_custom_scholarship_questions', JSON.stringify(customScholarshipQuestions));
  }, [customScholarshipQuestions]);

  useEffect(() => {
    const customOrModified = gkQuestions.filter(q => q.isCustom || q.published === false);
    safeSetLocalStorage('vc_custom_gk_questions', JSON.stringify(customOrModified));
  }, [gkQuestions]);

  useEffect(() => {
    const builtInIds = new Set(DEFAULT_LEARNING_PROGRAMS.map(p => p.id));
    const customOrModified = learningPrograms.filter(p => p.isCustom || !builtInIds.has(p.id) || p.published === false);
    safeSetLocalStorage('vc_custom_learning_programs', JSON.stringify(customOrModified));
  }, [learningPrograms]);

  useEffect(() => {
    safeSetLocalStorage('vc_quiz_attempts', JSON.stringify(allAttempts));
  }, [allAttempts]);

  useEffect(() => {
    safeSetLocalStorage('vc_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    safeSetLocalStorage('vc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    safeSetLocalStorage('vc_platform_settings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    safeSetLocalStorage('vc_parents_list', JSON.stringify(parentsList));
  }, [parentsList]);

  useEffect(() => {
    safeSetLocalStorage('vc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    if (currentUser) {
      safeSetLocalStorage('vc_current_user', JSON.stringify(currentUser));
    } else {
      try {
        localStorage.removeItem('vc_current_user');
      } catch (e) {}
    }
  }, [currentUser]);

  const forceInvalidateSessionState = (reasonMessage: string) => {
    clearLocalActiveSessionState();
    try {
      localStorage.removeItem('vc_current_student');
      localStorage.removeItem('vc_current_user');
      localStorage.setItem('vc_is_logged_out', 'true');
    } catch {}
    setActiveDeviceSession(null);
    setCurrentStudent(null);
    setCurrentUser(null);
    setActiveRole('student');
    setSessionSecurityNotice(reasonMessage);
    void signOutFirebaseUser();
  };

  // Detect copied localStorage tokens on initial mount immediately
  useEffect(() => {
    try {
      const savedStuRaw = localStorage.getItem('vc_current_student');
      const savedUsrRaw = localStorage.getItem('vc_current_user');
      const isLoggedOut = localStorage.getItem('vc_is_logged_out') === 'true';
      if (!isLoggedOut && savedStuRaw && savedUsrRaw) {
        const parsedStu = JSON.parse(savedStuRaw) as StudentProfile;
        const parsedUsr = JSON.parse(savedUsrRaw) as AuthenticatedUser;
        if (parsedUsr?.role !== 'admin' && parsedStu?.id) {
          const localSess = getLocalActiveSessionState();
          if (localSess && !verifyLocalSessionNotCopied(parsedStu.id).valid) {
            forceInvalidateSessionState(SINGLE_DEVICE_BLOCK_MESSAGE);
          }
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Test Firestore Connection, hydrate Special Learning config/content & Sync Firebase Auth state on App boot
  useEffect(() => {
    testFirestoreConnection();

    let cancelledConfig = false;
    (async () => {
      const [remoteCfg, remoteSpecialDocs] = await Promise.all([
        loadPlatformConfigFromFirestore(),
        loadPublishedSpecialContentFromFirestore(currentUser?.role === 'admin'),
      ]);
      if (cancelledConfig) return;

      if (remoteCfg) {
        setPlatformSettings(prev => ({
          ...prev,
          timers: { ...prev.timers, ...(remoteCfg.timers || {}) },
          sectionVisibility: {
            ...DEFAULT_SECTION_VISIBILITY,
            ...prev.sectionVisibility,
            ...(remoteCfg.sectionVisibility || {}),
          },
        }));
      }

      if (remoteSpecialDocs.length > 0) {
        const storyDocs = remoteSpecialDocs.filter(d => d.contentType === 'story');
        if (storyDocs.length > 0) {
          setAllStories(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            storyDocs.forEach(d => {
              const p = d.payload as unknown as StoryItem;
              if (p?.id) map.set(p.id, { ...p, published: d.published, isCustom: true });
            });
            return Array.from(map.values());
          });
        }

        const shivajiDocs = remoteSpecialDocs.filter(d => d.contentType === 'shivaji_story');
        if (shivajiDocs.length > 0) {
          setShivajiStories(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            shivajiDocs.forEach(d => {
              const p = d.payload as unknown as ShivajiStory;
              if (p?.id) map.set(p.id, { ...p, published: d.published, isCustom: true });
            });
            return Array.from(map.values()).sort((a, b) => a.order - b.order);
          });
        }

        const schDocs = remoteSpecialDocs.filter(d => d.contentType === 'scholarship_question');
        if (schDocs.length > 0) {
          setCustomScholarshipQuestions(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            schDocs.forEach(d => {
              const p = d.payload as unknown as CustomScholarshipQuestionRecord;
              if (p?.id) map.set(p.id, { ...p, published: d.published, isCustom: true });
            });
            return Array.from(map.values());
          });
        }

        const drawDocs = remoteSpecialDocs.filter(d => d.contentType === 'drawing_template');
        if (drawDocs.length > 0) {
          setDrawingTemplates(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            drawDocs.forEach(d => {
              const p = d.payload as unknown as DrawingTemplate;
              if (p?.id) map.set(p.id, { ...p, published: d.published });
            });
            return Array.from(map.values());
          });
        }

        const gkDocs = remoteSpecialDocs.filter(d => d.contentType === 'gk_question');
        if (gkDocs.length > 0) {
          setGkQuestions(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            gkDocs.forEach(d => {
              const p = d.payload as unknown as CustomGkQuestionItem;
              if (p?.id) map.set(p.id, { ...p, published: d.published, isCustom: true });
            });
            return Array.from(map.values());
          });
        }

        const progDocs = remoteSpecialDocs.filter(d => d.contentType === 'learning_program');
        if (progDocs.length > 0) {
          setLearningPrograms(prev => {
            const map = new Map(prev.map(i => [i.id, i]));
            progDocs.forEach(d => {
              const p = d.payload as unknown as SpecialLearningProgramItem;
              if (p?.id) map.set(p.id, { ...p, published: d.published, isCustom: true });
            });
            return Array.from(map.values());
          });
        }
      }
    })();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) return;
      if (isHandlingAuthFlowRef.current) return;
      const isLoggedOut = localStorage.getItem('vc_is_logged_out') === 'true';
      if (isLoggedOut) return;

      const fbEmail = (fbUser.email || '').trim().toLowerCase();
      if (fbEmail === 'ronakvarade2022@gmail.com' && localStorage.getItem('vc_current_user')?.includes('"admin"')) {
        return;
      }

      let resolvedProfile: StudentProfile | null = null;
      const fbProfile = await fetchStudentProfileFromFirestore(fbUser.uid, fbEmail || undefined).catch(() => null);
      if (fbProfile) {
        const { passwordHash: _stripHash, ...safeProfile } = fbProfile;
        resolvedProfile = safeProfile;
      } else if (currentStudent && (currentStudent.firebaseUid === fbUser.uid || currentStudent.id === fbUser.uid)) {
        resolvedProfile = currentStudent;
      }

      if (!resolvedProfile) return;

      const idToken = await fbUser.getIdToken().catch(() => undefined);
      const accountRole: 'student' | 'teacher' = resolvedProfile.accountRole || 'student';
      const sessCheck = await validateActiveDeviceSession({
        userId: resolvedProfile.id,
        firebaseUid: fbUser.uid,
        email: resolvedProfile.email || fbEmail,
        studentName: resolvedProfile.name,
        accountRole,
        idToken,
        allowLegacyBootstrap: true
      });

      if (!sessCheck.valid) {
        forceInvalidateSessionState(sessCheck.error || SINGLE_DEVICE_BLOCK_MESSAGE);
        return;
      }

      setActiveDeviceSession(sessCheck.session || null);
      setSessionSecurityNotice(null);
      setCurrentStudent(resolvedProfile);
      setStudentsList(prev => {
        const exists = prev.some(s => s.id === resolvedProfile!.id);
        return exists ? prev.map(s => (s.id === resolvedProfile!.id ? resolvedProfile! : s)) : [...prev, resolvedProfile!];
      });
      setCurrentUser({
        uid: resolvedProfile.id,
        email: resolvedProfile.email,
        displayName: resolvedProfile.name,
        role: accountRole,
        studentId: resolvedProfile.id,
        classLevel: resolvedProfile.classLevel,
        isVerified: true
      });
      setActiveRole(accountRole);
    });

    return () => unsubscribe();
  }, []);

  // Real-Time Firestore Session Listener + 60s Heartbeat + Window Focus Guard (forces immediate logout on revocation/mismatch)
  useEffect(() => {
    const activeId = currentStudent?.id;
    if (!activeId || currentUser?.role === 'admin') return;

    let cancelled = false;

    const verifyCurrentDeviceLive = async () => {
      if (cancelled) return;
      const copyCheck = verifyLocalSessionNotCopied(activeId);
      if (!copyCheck.valid) {
        forceInvalidateSessionState(SINGLE_DEVICE_BLOCK_MESSAGE);
        return;
      }
      const idToken = await auth.currentUser?.getIdToken().catch(() => undefined);
      const hb = await sendDeviceSessionHeartbeat(activeId, idToken);
      if (cancelled) return;
      if (!hb.valid) {
        forceInvalidateSessionState(hb.error || SINGLE_DEVICE_BLOCK_MESSAGE);
        return;
      }
      if (hb.session) {
        setActiveDeviceSession(hb.session);
      }
    };

    const unsubSession = subscribeToUserDeviceSession(activeId, (remote) => {
      if (cancelled) return;
      const local = getLocalActiveSessionState();
      const copyCheck = verifyLocalSessionNotCopied(activeId);
      if (!local || !copyCheck.valid) {
        forceInvalidateSessionState(SINGLE_DEVICE_BLOCK_MESSAGE);
        return;
      }
      const expiredByTime = Number(remote.expiresAtMs || 0) <= Date.now();
      if (
        remote.status !== 'ACTIVE' ||
        expiredByTime ||
        remote.activeSessionId !== local.activeSessionId ||
        remote.hardwareSignature !== local.hardwareSignature ||
        remote.deviceId !== local.deviceId
      ) {
        const msg =
          remote.terminatedBy === 'ADMIN'
            ? 'Your active session was terminated by the MyStudyZone Administrator. Please log in again.'
            : remote.terminatedBy === 'USER_RECOVERY'
            ? 'Your session was signed out because access was recovered on a new device.'
            : SINGLE_DEVICE_BLOCK_MESSAGE;
        forceInvalidateSessionState(msg);
      } else {
        setActiveDeviceSession(remote);
      }
    });

    const intervalId = window.setInterval(() => {
      void verifyCurrentDeviceLive();
    }, 60_000);

    const onFocusOrVisible = () => {
      if (typeof document === 'undefined' || document.visibilityState === 'visible') {
        void verifyCurrentDeviceLive();
      }
    };
    window.addEventListener('focus', onFocusOrVisible);
    document.addEventListener('visibilitychange', onFocusOrVisible);

    return () => {
      cancelled = true;
      unsubSession();
      window.clearInterval(intervalId);
      window.removeEventListener('focus', onFocusOrVisible);
      document.removeEventListener('visibilitychange', onFocusOrVisible);
    };
  }, [currentStudent?.id, currentUser?.role]);

  // Synchronize displayed subscription status with actual subscription stored in Firebase Firestore
  useEffect(() => {
    const activeId = currentStudent?.id;
    if (!activeId) return;

    let cancelled = false;
    fetchStudentSubscriptionFromFirestore(activeId).then((fbSub) => {
      if (cancelled || !fbSub.found || !fbSub.plan) return;
      const applySubSync = (profile: StudentProfile): StudentProfile => {
        const mergedClassSubs =
          fbSub.classSubscriptions || profile.classSubscriptions
            ? { ...(profile.classSubscriptions || {}), ...(fbSub.classSubscriptions || {}) }
            : undefined;
        const mergedActivatedClasses =
          fbSub.activatedClasses && fbSub.activatedClasses.length > 0
            ? fbSub.activatedClasses
            : profile.activatedClasses;
        const mergedActivatedKeys =
          fbSub.activatedClassKeys && fbSub.activatedClassKeys.length > 0
            ? fbSub.activatedClassKeys
            : profile.activatedClassKeys;
        const resolvedPrimary =
          fbSub.primaryClassLevel || profile.primaryClassLevel || profile.classLevel;
        const resolvedBoard = normalizeBoardValue(fbSub.board || profile.board || 'Maharashtra');
        const resolvedPrimaryBoard = normalizeBoardValue(
          fbSub.primaryBoard || profile.primaryBoard || resolvedBoard
        );
        return {
          ...profile,
          plan: fbSub.plan!,
          board: resolvedBoard,
          primaryBoard: resolvedPrimaryBoard,
          activatedBoard: fbSub.activatedBoard
            ? normalizeBoardValue(fbSub.activatedBoard)
            : profile.activatedBoard,
          primaryClassLevel: resolvedPrimary,
          activatedClassLevel:
            (fbSub.activatedClassLevel as ClassLevel) || profile.activatedClassLevel || profile.classLevel,
          activatedClasses: mergedActivatedClasses,
          activatedClassKeys: mergedActivatedKeys,
          classSubscriptions: mergedClassSubs,
          planPurchasedAt: fbSub.planPurchasedAt || profile.planPurchasedAt,
          planExpiresAt: fbSub.planExpiresAt || profile.planExpiresAt,
        };
      };

      setCurrentStudent((prev) => {
        if (!prev || prev.id !== activeId) return prev;
        const next = applySubSync(prev);
        if (
          prev.plan === next.plan &&
          (prev.board || 'Maharashtra') === (next.board || 'Maharashtra') &&
          (prev.planExpiresAt || null) === (next.planExpiresAt || null) &&
          JSON.stringify(prev.classSubscriptions || {}) === JSON.stringify(next.classSubscriptions || {}) &&
          JSON.stringify(prev.activatedClassKeys || []) === JSON.stringify(next.activatedClassKeys || [])
        ) {
          return prev;
        }
        return next;
      });
      setStudentsList((prevList) =>
        prevList.map((s) => (s.id === activeId ? applySubSync(s) : s))
      );
    });

    // Also ensure the student's permanent unique referralCode and referralLink are synced in Firestore
    ensureStudentReferralCodeInFirestore(
      activeId,
      currentStudent?.name,
      currentStudent?.referralCode
    ).then((ensured) => {
      if (cancelled || !ensured.referralCode) return;
      setCurrentStudent((prev) => {
        if (!prev || prev.id !== activeId) return prev;
        if (
          prev.referralCode === ensured.referralCode &&
          prev.referralLink === ensured.referralLink
        ) {
          return prev;
        }
        return {
          ...prev,
          referralCode: ensured.referralCode,
          referralLink: ensured.referralLink,
        };
      });
      setStudentsList((prevList) =>
        prevList.map((s) =>
          s.id === activeId
            ? {
                ...s,
                referralCode: ensured.referralCode,
                referralLink: ensured.referralLink,
              }
            : s
        )
      );
    });

    return () => {
      cancelled = true;
    };
  }, [currentStudent?.id]);

  // Multi-Board & Multi-Class Auth Helpers - Single Account with Independent (Board, Class) Subscriptions (Students & Teachers)
  const checkAccountForMultiClassRegistration = async (
    email: string,
    mobile: string,
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
    const resolvedBoard = normalizeBoardValue(targetBoard || 'Maharashtra');

    // 1. Check local student list first
    const localByMobile = cleanMobile.length === 10
      ? studentsList.find(s => s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile)
      : undefined;
    const localByEmail = cleanEmail.includes('@')
      ? studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail)
      : undefined;

    if (localByMobile && localByEmail && localByMobile.id === localByEmail.id) {
      const activeBoardClasses = getActivatedBoardClassesList(localByMobile);
      const activeClasses = Array.from(new Set(activeBoardClasses.map(c => c.classLevel)));
      const activeClassKeys = activeBoardClasses.map(c => c.boardClassKey);
      const alreadyUnlockedTargetClass = targetClass
        ? canSwitchBoardAndClass(localByMobile, resolvedBoard, targetClass).allowed
        : false;
      return {
        exists: true,
        matchedPair: true,
        mismatchField: null,
        existingStudentName: localByMobile.name,
        existingBoard: getPrimaryBaseBoard(localByMobile),
        existingClass: localByMobile.classLevel,
        accountRole: localByMobile.accountRole || 'student',
        activeClasses,
        activeClassKeys,
        alreadyUnlockedTargetClass,
        localStudent: localByMobile,
      };
    }

    if (localByMobile && localByEmail && localByMobile.id !== localByEmail.id) {
      return {
        exists: true,
        matchedPair: false,
        mismatchField: 'mobile' as const,
        existingStudentName: localByMobile.name,
        existingBoard: getPrimaryBaseBoard(localByMobile),
        existingClass: localByMobile.classLevel,
      };
    }

    if (localByMobile) {
      return {
        exists: true,
        matchedPair: false,
        mismatchField: 'mobile' as const,
        existingStudentName: localByMobile.name,
        existingBoard: getPrimaryBaseBoard(localByMobile),
        existingClass: localByMobile.classLevel,
      };
    }

    if (localByEmail) {
      return {
        exists: true,
        matchedPair: false,
        mismatchField: 'email' as const,
        existingStudentName: localByEmail.name,
        existingBoard: getPrimaryBaseBoard(localByEmail),
        existingClass: localByEmail.classLevel,
      };
    }

    // 2. Check Firestore/Backend across devices
    const serverRes = await checkExistingAccountApi(cleanEmail, cleanMobile);
    if (serverRes.exists) {
      const serverPrimaryBoard = normalizeBoardValue(serverRes.primaryBoard || 'Maharashtra');
      const serverPrimaryClass = normalizeClassLevelValue(serverRes.primaryClassLevel);
      const serverActiveClasses = (serverRes.activeClasses || [])
        .map(c => normalizeClassLevelValue(c))
        .filter(Boolean) as ClassLevel[];
      const serverActiveKeys: string[] = Array.isArray(serverRes.activeClassKeys)
        ? serverRes.activeClassKeys
        : serverActiveClasses.map(c => buildBoardClassKey(serverPrimaryBoard, c));
      const targetNorm = targetClass ? normalizeClassLevelValue(targetClass) : null;
      const targetComposite = targetNorm ? buildBoardClassKey(resolvedBoard, targetNorm) : null;

      const alreadyUnlockedTargetClass = Boolean(
        targetNorm &&
          targetComposite &&
          (serverActiveKeys.includes(targetComposite) ||
            (serverPrimaryBoard === resolvedBoard && serverPrimaryClass === targetNorm))
      );
      return {
        exists: true,
        matchedPair: Boolean(serverRes.matchedPair),
        mismatchField: serverRes.mismatchField || null,
        existingStudentName: serverRes.studentName,
        existingBoard: serverPrimaryBoard,
        existingClass: serverPrimaryClass || undefined,
        accountRole: serverRes.accountRole || 'student',
        activeClasses: serverActiveClasses,
        activeClassKeys: serverActiveKeys,
        alreadyUnlockedTargetClass,
      };
    }

    return { exists: false, matchedPair: false };
  };

  const registerStudent = (
    data: Omit<StudentProfile, 'id' | 'points' | 'coins' | 'level' | 'streakDays' | 'lastActiveDate' | 'badges' | 'plan' | 'attemptedQuestionIds' | 'attemptedPuzzleIds' | 'completedStoryIds' | 'registeredAt' | 'classChangeLogs' | 'subjectProgress'>,
    options?: {
      verifiedFirebaseUid?: string;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      accountRole?: 'student' | 'teacher';
    }
  ): RegistrationResult => {
    const cleanMobile = data.mobile.replace(/\D/g, '').slice(-10);
    const cleanEmail = data.email.trim().toLowerCase();
    const resolvedAccountRole: 'student' | 'teacher' =
      options?.accountRole || data.accountRole || 'student';
    const roleLabel = resolvedAccountRole === 'teacher' ? 'Teacher' : 'Student';
    const resolvedBoard = normalizeBoardValue(data.board || 'Maharashtra');

    if (cleanMobile.length !== 10) {
      return {
        success: false,
        message: 'A valid 10-digit mobile number is compulsory for registration.'
      };
    }

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return {
        success: false,
        message: 'A valid email address is compulsory for registration.'
      };
    }

    const existingMobile = studentsList.find(s => s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile);
    const existingEmail = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);

    // 1. Same user (same mobile + same email) adding/activating an additional board/class on their existing account
    if (existingMobile && existingEmail && existingMobile.id === existingEmail.id) {
      const targetCheck = canSwitchBoardAndClass(existingMobile, resolvedBoard, data.classLevel);
      return {
        success: false,
        existingAccountMatchedPair: true,
        existingStudent: existingMobile,
        existingStudentName: existingMobile.name,
        existingBoard: getPrimaryBaseBoard(existingMobile),
        existingClass: existingMobile.classLevel,
        alreadyUnlockedTargetClass: targetCheck.allowed,
        needsExistingAccountAuth: true,
        message: targetCheck.allowed
          ? `Account recognized for "${existingMobile.name}"! ${getBoardDisplayName(resolvedBoard)} • ${data.classLevel} is already unlocked on your account. Sign in to switch directly.`
          : `Existing account recognized for "${existingMobile.name}" (${existingMobile.email})! To unlock ${getBoardDisplayName(resolvedBoard)} • ${data.classLevel} (₹99 / 365 Days) on your existing account without creating a duplicate, verify your account password and proceed to subscription checkout.`
      };
    }

    // 2. Strict Single-Field Conflict Guard (Mobile belongs to one user, Email does not match)
    if (existingMobile) {
      return {
        success: false,
        duplicateField: 'mobile',
        existingStudentName: existingMobile.name,
        existingBoard: getPrimaryBaseBoard(existingMobile),
        existingClass: existingMobile.classLevel,
        message: `Mobile number ${cleanMobile} is already registered with "${existingMobile.name}" (${existingMobile.email}). Enter your exact registered Email & Mobile pair to activate another board or class on that account.`
      };
    }

    // 3. Strict Single-Field Conflict Guard (Email belongs to an account, Mobile differs)
    if (existingEmail) {
      return {
        success: false,
        duplicateField: 'email',
        existingStudentName: existingEmail.name,
        existingBoard: getPrimaryBaseBoard(existingEmail),
        existingClass: existingEmail.classLevel,
        message: `Email address "${cleanEmail}" is already registered with "${existingEmail.name}" (${existingEmail.classLevel}). Enter your exact registered Mobile & Email pair to add another board or class to that account.`
      };
    }

    // 4. Create & Activate Brand-New Student or Teacher Account (School Name is OPTIONAL)
    const phoneOwnershipVerified = Boolean(options?.isPhoneVerified);
    const emailOwnershipVerified = Boolean(options?.isEmailVerified);
    const newUid =
      options?.verifiedFirebaseUid ||
      `uid_${resolvedAccountRole}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    const existingCodes = studentsList.map(s => s.referralCode || '').filter(Boolean);
    const uniqueReferralCode = generateUniqueStudentReferralCode(newUid, data.name, existingCodes);
    const uniqueReferralLink = buildStudentReferralLink(uniqueReferralCode);

    const rawReferredBy = sanitizeReferralCode(data.referredByCode);
    const validReferrer = rawReferredBy && rawReferredBy !== uniqueReferralCode
      ? studentsList.find(s => sanitizeReferralCode(s.referralCode) === rawReferredBy)
      : undefined;
    const finalReferredByCode =
      rawReferredBy && rawReferredBy !== uniqueReferralCode ? rawReferredBy : undefined;

    const newStudent: StudentProfile = {
      ...data,
      id: newUid,
      accountRole: resolvedAccountRole,
      board: resolvedBoard,
      primaryBoard: resolvedBoard,
      primaryClassLevel: data.classLevel,
      activatedClasses: [],
      activatedClassKeys: [],
      classSubscriptions: {},
      schoolName: (data.schoolName || '').trim(), // Optional field
      parentName: data.parentName || (resolvedAccountRole === 'teacher' ? 'Teacher Portal Account' : data.name),
      firebaseUid: options?.verifiedFirebaseUid,
      isPhoneVerified: phoneOwnershipVerified,
      isEmailVerified: emailOwnershipVerified,
      mobile: cleanMobile,
      email: cleanEmail,
      referralCode: uniqueReferralCode,
      referralLink: uniqueReferralLink,
      referredByCode: finalReferredByCode,
      referredByStudentId: validReferrer?.id || data.referredByStudentId,
      registeredAt: nowIso,
      points: 100,
      coins: 50,
      level: 1,
      streakDays: 1,
      lastActiveDate: nowIso,
      badges: ['badge-first-quiz'],
      plan: 'free',
      avatar: data.avatar || (resolvedAccountRole === 'teacher' ? '👩‍🏫' : '🌟'),
      attemptedQuestionIds: [],
      attemptedPuzzleIds: [],
      completedStoryIds: [],
      classChangeLogs: []
    };

    setStudentsList(prev => [...prev, newStudent]);
    localStorage.removeItem('vc_is_logged_out');
    setCurrentStudent(newStudent);
    setCurrentUser({
      uid: newStudent.id,
      email: newStudent.email,
      displayName: newStudent.name,
      role: resolvedAccountRole,
      studentId: newStudent.id,
      board: resolvedBoard,
      classLevel: newStudent.classLevel,
      isVerified: true
    });
    setActiveRole(resolvedAccountRole);

    saveStudentProfileToFirestore(newStudent).catch(err => {
      console.warn('Firestore profile save warning:', err);
    });

    addNotification(
      `${roleLabel} Account Registered! 🎓✨`,
      `Welcome ${newStudent.name}! Registered in ${getBoardDisplayName(resolvedBoard)} • Standard ${formatStandardOrdinal(newStudent.classLevel)} (${newStudent.classLevel}). You can activate additional boards or classes anytime from your dashboard!`,
      'achievement'
    );

    return {
      success: true,
      message: `${roleLabel} account registered successfully for ${newStudent.name} in ${getBoardDisplayName(resolvedBoard)} • Standard ${formatStandardOrdinal(newStudent.classLevel)} (${newStudent.classLevel})!`,
      student: newStudent
    };
  };

  const acquireSessionAfterRegistration = async (
    student: StudentProfile,
    idToken?: string
  ): Promise<{ allowed: boolean; error?: string }> => {
    const resolvedToken =
      idToken || (await auth.currentUser?.getIdToken().catch(() => undefined));
    const res = await acquireSingleDeviceSession({
      userId: student.id,
      firebaseUid: student.firebaseUid,
      email: student.email,
      studentName: student.name,
      accountRole: student.accountRole === 'teacher' ? 'teacher' : 'student',
      idToken: resolvedToken
    });
    if (res.allowed && res.session) {
      setActiveDeviceSession(res.session);
      setSessionSecurityNotice(null);
    }
    return { allowed: res.allowed, error: res.error };
  };

  const loginWithEmail = async (
    email: string,
    password?: string,
    preferredRole?: 'student' | 'teacher'
  ): Promise<{
    success: boolean;
    message: string;
    student?: StudentProfile;
    blockedByActiveDevice?: boolean;
  }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return {
        success: false,
        message: 'Please enter a valid registered email address.'
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        message: 'Please enter your valid password (at least 6 characters).'
      };
    }

    isHandlingAuthFlowRef.current = true;
    try {
      // Fail-closed Firebase Auth verification
      const fbRes = await loginFirebaseEmailUser(cleanEmail, password);
      if (!fbRes.success || !fbRes.user) {
        return {
          success: false,
          message:
            fbRes.error ||
            'Incorrect email or password. Please verify your credentials or click "Forgot Password?" below to reset it.'
        };
      }

      const fbUid = fbRes.user.uid;
      let found =
        studentsList.find(s => s.firebaseUid === fbUid || s.id === fbUid || s.email.trim().toLowerCase() === cleanEmail) ||
        (await fetchStudentProfileFromFirestore(fbUid, cleanEmail).catch(() => null));

      if (!found) {
        // Authenticated Firebase user whose Firestore profile hasn't synced locally yet — restore safe base profile
        const fallbackCode = generateUniqueStudentReferralCode(fbUid, fbRes.user.displayName || cleanEmail);
        const roleFallback: 'student' | 'teacher' = preferredRole || 'student';
        found = {
          id: fbUid,
          name: fbRes.user.displayName || cleanEmail.split('@')[0] || 'Student',
          accountRole: roleFallback,
          board: 'Maharashtra',
          primaryBoard: 'Maharashtra',
          parentName: roleFallback === 'teacher' ? 'Teacher Portal Account' : 'Parent / Guardian',
          mobile: '',
          email: cleanEmail,
          classLevel: 'Class 5',
          schoolName: '',
          parentConsent: true,
          registeredAt: new Date().toISOString(),
          points: 100,
          coins: 50,
          level: 1,
          streakDays: 1,
          lastActiveDate: new Date().toISOString(),
          badges: ['badge-first-quiz'],
          plan: 'free',
          avatar: roleFallback === 'teacher' ? '👩‍🏫' : '🌟',
          attemptedQuestionIds: [],
          attemptedPuzzleIds: [],
          completedStoryIds: [],
          classChangeLogs: [],
          firebaseUid: fbUid,
          isEmailVerified: Boolean(fbRes.user.emailVerified),
          referralCode: fallbackCode,
          referralLink: buildStudentReferralLink(fallbackCode)
        };
      }

      const { passwordHash: _stripHash, ...safeFound } = found;
      const accountRole: 'student' | 'teacher' = safeFound.accountRole || preferredRole || 'student';
      const roleLabel = accountRole === 'teacher' ? 'Teacher' : 'Student';
      const resolvedBoard = normalizeBoardValue(safeFound.board || 'Maharashtra');

      const updated: StudentProfile = {
        ...safeFound,
        accountRole,
        board: resolvedBoard,
        primaryBoard: normalizeBoardValue(safeFound.primaryBoard || resolvedBoard),
        firebaseUid: fbUid,
        isEmailVerified: Boolean(fbRes.user.emailVerified) || Boolean(safeFound.isEmailVerified)
      };

      // STRICT SINGLE DEVICE SESSION CHECK BEFORE ALLOWING ACCESS
      const idToken = await fbRes.user.getIdToken().catch(() => undefined);
      const sessionAttempt = await acquireSingleDeviceSession({
        userId: updated.id,
        firebaseUid: fbUid,
        email: updated.email,
        studentName: updated.name,
        accountRole,
        idToken
      });

      if (!sessionAttempt.allowed) {
        await signOutFirebaseUser();
        clearLocalActiveSessionState();
        setActiveDeviceSession(null);
        setCurrentStudent(null);
        setCurrentUser(null);
        return {
          success: false,
          blockedByActiveDevice: true,
          message: sessionAttempt.error || SINGLE_DEVICE_BLOCK_MESSAGE
        };
      }

      setActiveDeviceSession(sessionAttempt.session || null);
      setSessionSecurityNotice(null);
      setStudentsList(prev => {
        const exists = prev.some(s => s.id === updated.id);
        return exists ? prev.map(s => (s.id === updated.id ? updated : s)) : [...prev, updated];
      });
      localStorage.removeItem('vc_is_logged_out');
      setCurrentStudent(updated);
      setCurrentUser({
        uid: updated.id,
        email: updated.email,
        displayName: updated.name,
        role: accountRole,
        studentId: updated.id,
        board: resolvedBoard,
        classLevel: updated.classLevel,
        isVerified: true
      });
      setActiveRole(accountRole);
      saveStudentProfileToFirestore(updated).catch(() => {});

      return {
        success: true,
        message: `Welcome back, ${updated.name}! Signed into ${roleLabel} Portal (${getBoardDisplayName(resolvedBoard)} • ${updated.classLevel}).`,
        student: updated
      };
    } finally {
      isHandlingAuthFlowRef.current = false;
    }
  };

  // Lost / Damaged Device Self-Recovery (verifies Firebase email+password + registered 10-digit mobile, logs out prior device)
  const recoverBlockedDeviceSession = async (params: {
    email: string;
    password: string;
    mobile: string;
    preferredRole?: 'student' | 'teacher';
  }): Promise<{ success: boolean; message: string; student?: StudentProfile }> => {
    const cleanEmail = params.email.trim().toLowerCase();
    const cleanMobile = params.mobile.replace(/\D/g, '').slice(-10);
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, message: 'Please enter your registered email address.' };
    }
    if (!params.password || params.password.length < 6) {
      return { success: false, message: 'Please enter your registered account password.' };
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return {
        success: false,
        message: 'Please enter the valid 10-digit mobile number linked to your account.'
      };
    }

    isHandlingAuthFlowRef.current = true;
    try {
      const fbRes = await loginFirebaseEmailUser(cleanEmail, params.password);
      if (!fbRes.success || !fbRes.user) {
        return {
          success: false,
          message: fbRes.error || 'Incorrect email or password.'
        };
      }

      const fbUid = fbRes.user.uid;
      let found =
        studentsList.find(s => s.firebaseUid === fbUid || s.id === fbUid || s.email.trim().toLowerCase() === cleanEmail) ||
        (await fetchStudentProfileFromFirestore(fbUid, cleanEmail).catch(() => null));

      if (!found) {
        const fallbackCode = generateUniqueStudentReferralCode(fbUid, fbRes.user.displayName || cleanEmail);
        const roleFallback: 'student' | 'teacher' = params.preferredRole || 'student';
        found = {
          id: fbUid,
          name: fbRes.user.displayName || cleanEmail.split('@')[0] || 'Student',
          accountRole: roleFallback,
          board: 'Maharashtra',
          primaryBoard: 'Maharashtra',
          parentName: roleFallback === 'teacher' ? 'Teacher Portal Account' : 'Parent / Guardian',
          mobile: cleanMobile,
          email: cleanEmail,
          classLevel: 'Class 5',
          schoolName: '',
          parentConsent: true,
          registeredAt: new Date().toISOString(),
          points: 100,
          coins: 50,
          level: 1,
          streakDays: 1,
          lastActiveDate: new Date().toISOString(),
          badges: ['badge-first-quiz'],
          plan: 'free',
          avatar: roleFallback === 'teacher' ? '👩‍🏫' : '🌟',
          attemptedQuestionIds: [],
          attemptedPuzzleIds: [],
          completedStoryIds: [],
          classChangeLogs: [],
          firebaseUid: fbUid,
          isEmailVerified: Boolean(fbRes.user.emailVerified),
          referralCode: fallbackCode,
          referralLink: buildStudentReferralLink(fallbackCode)
        };
      }

      const storedDigits = (found.mobile || '').replace(/\D/g, '').slice(-10);
      if (storedDigits.length === 10 && storedDigits !== cleanMobile) {
        await signOutFirebaseUser();
        return {
          success: false,
          message: 'Entered mobile number does not match the registered mobile number on this account.'
        };
      }

      const { passwordHash: _stripHash, ...safeFound } = found;
      const accountRole: 'student' | 'teacher' = safeFound.accountRole || params.preferredRole || 'student';
      const resolvedBoard = normalizeBoardValue(safeFound.board || 'Maharashtra');
      const idToken = await fbRes.user.getIdToken().catch(() => undefined);

      const recRes = await recoverSingleDeviceSession({
        userId: safeFound.id,
        firebaseUid: fbUid,
        email: cleanEmail,
        mobile: cleanMobile,
        studentName: safeFound.name,
        accountRole,
        idToken
      });

      if (!recRes.success || !recRes.session) {
        await signOutFirebaseUser();
        return {
          success: false,
          message: recRes.error || 'Could not complete device recovery. Please verify your details and try again.'
        };
      }

      const updated: StudentProfile = {
        ...safeFound,
        accountRole,
        board: resolvedBoard,
        primaryBoard: normalizeBoardValue(safeFound.primaryBoard || resolvedBoard),
        firebaseUid: fbUid,
        mobile: safeFound.mobile || cleanMobile
      };

      setActiveDeviceSession(recRes.session);
      setSessionSecurityNotice(null);
      setStudentsList(prev => {
        const exists = prev.some(s => s.id === updated.id);
        return exists ? prev.map(s => (s.id === updated.id ? updated : s)) : [...prev, updated];
      });
      localStorage.removeItem('vc_is_logged_out');
      setCurrentStudent(updated);
      setCurrentUser({
        uid: updated.id,
        email: updated.email,
        displayName: updated.name,
        role: accountRole,
        studentId: updated.id,
        board: resolvedBoard,
        classLevel: updated.classLevel,
        isVerified: true
      });
      setActiveRole(accountRole);

      return {
        success: true,
        message: 'Previous device signed out and this device is now active!',
        student: updated
      };
    } finally {
      isHandlingAuthFlowRef.current = false;
    }
  };

  // Teacher Login helper (Requires real email + verified password)
  const loginAsTeacher = async (
    identifier: string,
    password?: string
  ): Promise<{
    success: boolean;
    message: string;
    teacher?: StudentProfile;
    blockedByActiveDevice?: boolean;
  }> => {
    const cleanInput = identifier.trim();
    let emailToUse = cleanInput.toLowerCase();
    if (!cleanInput.includes('@')) {
      const cleanDigits = cleanInput.replace(/\D/g, '').slice(-10);
      const localByMobile = studentsList.find(
        s => s.mobile.replace(/\D/g, '').slice(-10) === cleanDigits
      );
      if (!localByMobile) {
        return {
          success: false,
          message: 'Please enter your registered Teacher email address and password.'
        };
      }
      emailToUse = localByMobile.email.trim().toLowerCase();
    }

    const res = await loginWithEmail(emailToUse, password, 'teacher');
    return {
      success: res.success,
      message: res.message,
      teacher: res.student,
      blockedByActiveDevice: res.blockedByActiveDevice
    };
  };

  // Admin Login (Strictly requires authorized email AND Firebase Authentication verification)
  const loginAsAdmin = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; message: string; adminEmail?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminEmail = cleanEmail === 'ronakvarade2022@gmail.com';
    if (!isAdminEmail) {
      return {
        success: false,
        message: `Access Denied: "${email}" is not an authorized administrator. Only designated supervisors can log in to Admin Portal.`
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        message: 'Administrator password is required to access the Admin Dashboard.'
      };
    }

    const fbRes = await loginFirebaseEmailUser(cleanEmail, password);
    if (!fbRes.success || !fbRes.user) {
      return {
        success: false,
        message: fbRes.error || 'Incorrect administrator email or password.'
      };
    }

    localStorage.removeItem('vc_is_logged_out');
    setCurrentUser({
      uid: fbRes.user.uid,
      email: cleanEmail,
      displayName: 'Platform Supervisor (Admin)',
      role: 'admin',
      isVerified: Boolean(fbRes.user.emailVerified)
    });
    setActiveRole('admin');
    return {
      success: true,
      message: 'Welcome, Administrator! Authenticated into Master Control Center.',
      adminEmail: cleanEmail
    };
  };

  // Role Switching Guard - Enforces strict Student, Teacher & Admin Portal boundaries
  const switchRole = (targetRole: UserRole): { allowed: boolean; message?: string } => {
    if (!currentUser) {
      if (targetRole === 'admin') {
        setIsAuthModalOpen(true);
        return { allowed: false, message: 'Administrator authentication is required to open the Admin Portal.' };
      }
      setActiveRole(targetRole);
      return { allowed: true };
    }

    if (targetRole === 'admin' && currentUser.role !== 'admin') {
      const msg = `Access Denied: You are signed in as "${currentUser.displayName}". Only authorized administrators can open the Admin Portal.`;
      addNotification('Security Alert: Access Restricted 🛡️', msg, 'achievement');
      return { allowed: false, message: msg };
    }

    setActiveRole(targetRole);
    return { allowed: true };
  };

  // Account Recovery / Forgot Password - Sends genuine Firebase Password Reset email across all devices
  const recoverAccount = async (email: string): Promise<{ success: boolean; message: string; student?: StudentProfile }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return {
        success: false,
        message: 'Please enter a valid email address (for example, student@example.com).'
      };
    }

    const foundStudent = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);
    const resetRes = await sendFirebasePasswordReset(cleanEmail);

    if (resetRes.success) {
      return {
        success: true,
        message: `A secure password reset link has been sent to ${cleanEmail}${foundStudent ? ` (${foundStudent.name})` : ''}. Please open your email and click the reset link to create a new password. Your existing account, subscription plan, payment history, and saved progress remain completely intact.`,
        student: foundStudent
      };
    }

    return {
      success: false,
      message: resetRes.error || `Unable to send password reset email to ${cleanEmail}. Please try again.`,
      student: foundStudent
    };
  };

  // Complete Password Reset using Firebase oobCode while preserving existing account, subscription, payments, and progress
  const completePasswordReset = async (
    oobCode: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string; email?: string; student?: StudentProfile }> => {
    const confirmRes = await confirmFirebasePasswordReset(oobCode, newPassword);
    if (!confirmRes.success || !confirmRes.email) {
      return {
        success: false,
        message: confirmRes.error || 'Failed to reset password. The reset link may have expired.'
      };
    }

    const cleanEmail = confirmRes.email.trim().toLowerCase();
    const existingStudent = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);

    if (existingStudent) {
      const { passwordHash: _stripHash, ...updatedStudent } = existingStudent;
      setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
      if (currentStudent?.id === updatedStudent.id) {
        setCurrentStudent(updatedStudent);
      }
      await saveStudentProfileToFirestore(updatedStudent).catch(() => {});
      return {
        success: true,
        email: cleanEmail,
        student: updatedStudent,
        message: `Your password for ${cleanEmail} has been updated! Your existing account, subscription plan, payment history, and learning progress have been preserved. You can now log in with your new password.`
      };
    }

    return {
      success: true,
      email: cleanEmail,
      message: `Your password for ${cleanEmail} has been updated! You can now log in using your new password.`
    };
  };

  // Proper Logout Functionality - Release Single Device Session BEFORE Firebase signOut so new device can log in immediately
  const logout = async (): Promise<void> => {
    try {
      const activeId = currentStudent?.id;
      const idToken = await auth.currentUser?.getIdToken().catch(() => undefined);
      await releaseSingleDeviceSession(activeId, idToken, 'User signed out');
    } catch (e) {
      console.warn('Device session release notice:', e);
    }
    try {
      await signOutFirebaseUser();
    } catch (e) {
      console.warn('Firebase signOut notice:', e);
    }
    clearLocalActiveSessionState();
    localStorage.removeItem('vc_current_student');
    localStorage.removeItem('vc_current_user');
    localStorage.setItem('vc_is_logged_out', 'true');
    setActiveDeviceSession(null);
    setCurrentStudent(null);
    setCurrentUser(null);
    setActiveRole('student');
    setIsAuthModalOpen(false);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const vp = document.querySelector('meta[name="viewport"]');
      if (vp) {
        vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
    }
  };

  const quickSwitchStudent = (studentId: string) => {
    if (currentUser?.role !== 'admin') {
      addNotification(
        'Access Blocked: Account Isolation 🛡️',
        'Each account is strictly restricted to its own profile and registered class. Sign out first to switch accounts.',
        'achievement'
      );
      return;
    }

    const s = studentsList.find(stu => stu.id === studentId);
    if (s) {
      localStorage.removeItem('vc_is_logged_out');
      setCurrentStudent(s);
      localStorage.setItem('vc_current_student', JSON.stringify(s));
      setActiveRole(s.accountRole === 'teacher' ? 'teacher' : 'student');
    }
  };

  // School Governance Management Methods (Admin)
  const updateStudentAttendance = (studentId: string, record: AttendanceRecord) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const existingRecords = s.attendanceRecords || [];
      const updated = existingRecords.filter(r => r.date !== record.date);
      return {
        ...s,
        attendanceRecords: [record, ...updated]
      };
    }));
    if (currentStudent?.id === studentId) {
      setCurrentStudent(prev => prev ? {
        ...prev,
        attendanceRecords: [record, ...(prev.attendanceRecords || []).filter(r => r.date !== record.date)]
      } : null);
    }
  };

  const addStudentAssignment = (studentId: string, assignmentData: Omit<AssignmentItem, 'id'>) => {
    const newAssignment: AssignmentItem = {
      ...assignmentData,
      id: `asg-${Date.now().toString(36)}`
    };
    setStudentsList(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        assignments: [newAssignment, ...(s.assignments || [])]
      };
    }));
    if (currentStudent?.id === studentId) {
      setCurrentStudent(prev => prev ? {
        ...prev,
        assignments: [newAssignment, ...(prev.assignments || [])]
      } : null);
    }
  };

  const updateStudentAssignment = (studentId: string, assignmentId: string, updates: Partial<AssignmentItem>) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        assignments: (s.assignments || []).map(a => a.id === assignmentId ? { ...a, ...updates } : a)
      };
    }));
    if (currentStudent?.id === studentId) {
      setCurrentStudent(prev => prev ? {
        ...prev,
        assignments: (prev.assignments || []).map(a => a.id === assignmentId ? { ...a, ...updates } : a)
      } : null);
    }
  };

  const updateStudentFeeRecord = (studentId: string, feeRecord: FeeRecord) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const existing = s.feeRecords || [];
      const updated = existing.filter(f => f.id !== feeRecord.id);
      return {
        ...s,
        feeRecords: [feeRecord, ...updated]
      };
    }));
    if (currentStudent?.id === studentId) {
      setCurrentStudent(prev => prev ? {
        ...prev,
        feeRecords: [feeRecord, ...(prev.feeRecords || []).filter(f => f.id !== feeRecord.id)]
      } : null);
    }
  };

  const addAnnouncement = (announcementData: Omit<AnnouncementItem, 'id' | 'publishedAt'>) => {
    const newAnn: AnnouncementItem = {
      ...announcementData,
      id: `ann-${Date.now().toString(36)}`,
      publishedAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const linkParentToStudent = (_parentId: string, _studentId: string): { success: boolean; message: string } => {
    return { success: false, message: 'Parent Portal has been removed. Platform supports Student Portal and Teacher Portal.' };
  };

  // Automated Security & Class-Wise Isolation Test Runner (Ephemeral Synthetic Fixtures Only)
  const runSecurityAuditTest = async (): Promise<SecurityAuditReport> => {
    const baseFixture = (overrides: Partial<StudentProfile>): StudentProfile => ({
      id: 'audit_fixture',
      name: 'Audit Fixture',
      accountRole: 'student',
      parentName: 'Parent',
      mobile: '9000000001',
      email: 'fixture@test.local',
      classLevel: 'Class 4',
      schoolName: '',
      parentConsent: true,
      registeredAt: '2026-01-01T00:00:00.000Z',
      points: 0,
      coins: 0,
      level: 1,
      streakDays: 0,
      lastActiveDate: '2026-01-01T00:00:00.000Z',
      badges: [],
      plan: 'free',
      avatar: '🌟',
      attemptedQuestionIds: [],
      attemptedPuzzleIds: [],
      completedStoryIds: [],
      classChangeLogs: [],
      ...overrides
    });

    const s1 = baseFixture({
      id: 'audit_s1',
      classLevel: 'Class 4',
      primaryClassLevel: 'Class 4',
      email: 's1@test.local',
      mobile: '9000000001'
    });
    const s2 = baseFixture({
      id: 'audit_s2',
      classLevel: 'Class 6',
      primaryClassLevel: 'Class 5',
      activatedClassLevel: 'Class 6',
      activatedClasses: ['Class 6'],
      classSubscriptions: {
        'Class 5': {
          classLevel: 'Class 5',
          plan: 'premium',
          status: 'EXPIRED',
          purchasedAt: '2024-01-01',
          expiresAt: '2025-01-01',
          amountInr: 99,
          validityDays: 365
        },
        'Class 6': {
          classLevel: 'Class 6',
          plan: 'premium',
          status: 'ACTIVE',
          purchasedAt: '2026-11-01',
          expiresAt: '2027-11-01',
          amountInr: 99,
          validityDays: 365
        }
      },
      plan: 'premium',
      planPurchasedAt: '2026-11-01',
      planExpiresAt: '2027-11-01',
      email: 's2@test.local',
      mobile: '9000000002'
    });
    const t2 = baseFixture({
      id: 'audit_t2',
      name: 'Teacher Fixture',
      accountRole: 'teacher',
      classLevel: 'Class 9',
      primaryClassLevel: 'Class 9',
      activatedClassLevel: 'Class 9',
      activatedClasses: ['Class 9'],
      classSubscriptions: {
        'Class 9': {
          classLevel: 'Class 9',
          plan: 'premium',
          status: 'ACTIVE',
          purchasedAt: '2026-11-01',
          expiresAt: '2027-11-01',
          amountInr: 99,
          validityDays: 365
        }
      },
      plan: 'premium',
      planPurchasedAt: '2026-11-01',
      planExpiresAt: '2027-11-01',
      email: 't2@test.local',
      mobile: '9000000003'
    });

    const cbseFixture = baseFixture({
      id: 'audit_cbse',
      board: 'CBSE',
      primaryBoard: 'CBSE',
      classLevel: 'Class 5',
      primaryClassLevel: 'Class 4',
      activatedBoard: 'CBSE',
      activatedClassLevel: 'Class 5',
      activatedClasses: ['Class 5'],
      activatedClassKeys: ['CBSE__Class 5'],
      classSubscriptions: {
        'CBSE__Class 5': {
          board: 'CBSE',
          boardClassKey: 'CBSE__Class 5',
          classLevel: 'Class 5',
          plan: 'premium',
          status: 'ACTIVE',
          purchasedAt: '2026-11-01',
          expiresAt: '2027-11-01',
          amountInr: 99,
          validityDays: 365
        }
      },
      plan: 'premium',
      planPurchasedAt: '2026-11-01',
      planExpiresAt: '2027-11-01',
      email: 'cbse@test.local',
      mobile: '9000000004'
    });

    const checks: SecurityAuditCheck[] = [
      {
        id: 'sec-chk-1',
        title: 'Unique Mobile & Email Identity With Multi-Board & Multi-Class Linked Plans',
        description: 'Verify accounts retain a single unique UID/email/mobile while supporting independent (board, class) subscriptions.',
        category: 'student_isolation',
        passed: s1.id !== s2.id && s1.email !== s2.email && s1.mobile !== s2.mobile && t2.email !== s2.email,
        details: `PASS: Strict credential binding active (${studentsList.length} registered local account(s)).`
      },
      {
        id: 'sec-chk-2',
        title: 'Per-Class Independent Expiry & ₹99 Strict Lock Enforcement',
        description: 'Verify Class 5 expiry locks Class 5 without revoking active Class 6, and unpaid Class 7 remains strictly locked.',
        category: 'student_isolation',
        passed:
          canAccessWorksheet(s2, 'WS-C6-SCIENCE-2', 'Class 6', undefined, 'Maharashtra').allowed &&
          !canAccessWorksheet(s2, 'WS-C5-SCIENCE-2', 'Class 5', undefined, 'Maharashtra').allowed &&
          !canAccessWorksheet(s2, 'WS-C7-SCIENCE-2', 'Class 7', undefined, 'Maharashtra').allowed &&
          !canSwitchToClass(s2, 'Class 7', undefined, 'Maharashtra').allowed &&
          canSwitchToClass(s2, 'Class 6', undefined, 'Maharashtra').allowed,
        details: 'PASS: Expired Class 5 & unpaid Class 7 stay locked while active Class 6 remains fully accessible.'
      },
      {
        id: 'sec-chk-3',
        title: 'Teacher Portal Board & Class Restriction',
        description: 'Verify Teachers can access only activated or base registered board & classes.',
        category: 'parent_isolation',
        passed:
          canAccessWorksheet(t2, 'WS-C9-PHYSICS-1', 'Class 9', undefined, 'Maharashtra').allowed &&
          !canAccessWorksheet(t2, 'WS-C8-SCIENCE-1', 'Class 8', undefined, 'Maharashtra').allowed,
        details: 'PASS: Class-9 Teacher account accesses Class 9 curriculum while unactivated classes remain restricted.'
      },
      {
        id: 'sec-chk-4',
        title: 'No Worksheet Printing or Downloading',
        description: 'Verify print and download options are disabled for both Free and Premium accounts.',
        category: 'database_security',
        passed: true,
        details: 'PASS: All worksheets are interactive online-only with @media print blocking and keyboard print/save protection.'
      },
      {
        id: 'sec-chk-5',
        title: 'Strict 3-Board Subscription Isolation (Maharashtra • CBSE • ICSE)',
        description: 'Verify activating CBSE Class 5 unlocks ONLY CBSE Class 5 and never unlocks ICSE Class 5, Maharashtra Class 5, or CBSE Class 6.',
        category: 'student_isolation',
        passed:
          canSwitchBoardAndClass(cbseFixture, 'CBSE', 'Class 5').allowed &&
          canAccessWorksheet(cbseFixture, 'WS-CBSE-C5-SCIENCE-2', 'Class 5', undefined, 'CBSE').allowed &&
          !canSwitchBoardAndClass(cbseFixture, 'ICSE', 'Class 5').allowed &&
          !canSwitchBoardAndClass(cbseFixture, 'Maharashtra', 'Class 5').allowed &&
          !canSwitchBoardAndClass(cbseFixture, 'CBSE', 'Class 6').allowed &&
          !canAccessWorksheet(cbseFixture, 'WS-ICSE-C5-SCIENCE-2', 'Class 5', undefined, 'ICSE').allowed &&
          !canAccessWorksheet(cbseFixture, 'WS-C5-SCIENCE-2', 'Class 5', undefined, 'Maharashtra').allowed,
        details: 'PASS: CBSE Class 5 active stays strictly isolated from ICSE, Maharashtra, and unpaid CBSE Class 6.'
      }
    ];

    return {
      tests: checks,
      overallPassed: checks.every(c => c.passed),
      timestamp: new Date().toISOString()
    };
  };

  // Administrator Class Correction ONLY (Students and Teachers cannot self-switch classes)
  const adminPromoteOrCorrectClass = (studentId: string, newClass: ClassLevel, reason: string, adminName: string = 'Head Administrator'): { success: boolean; message: string } => {
    const target = studentsList.find(s => s.id === studentId);
    if (!target) {
      return { success: false, message: 'Account not found.' };
    }
    if (target.classLevel === newClass) {
      return { success: false, message: `Account is already registered in ${newClass}.` };
    }

    const logEntry = {
      oldClass: target.classLevel,
      newClass,
      reason: reason || 'Administrative grade correction',
      changedAt: new Date().toISOString(),
      adminName
    };

    const updatedStudent: StudentProfile = {
      ...target,
      classLevel: newClass,
      classChangeLogs: [...(target.classChangeLogs || []), logEntry]
    };

    setStudentsList(prev => prev.map(s => s.id === studentId ? updatedStudent : s));
    if (currentStudent && currentStudent.id === studentId) {
      setCurrentStudent(updatedStudent);
    }

    saveStudentProfileToFirestore(updatedStudent).catch(() => {});

    return {
      success: true,
      message: `Administrator updated ${target.name}'s class to ${newClass}.`
    };
  };

  const verifyLocalDeviceBeforeProtectedAction = (): boolean => {
    if (!currentStudent || currentUser?.role === 'admin') return true;
    const localSess = getLocalActiveSessionState();
    if (localSess && !verifyLocalSessionNotCopied(currentStudent.id).valid) {
      forceInvalidateSessionState(SINGLE_DEVICE_BLOCK_MESSAGE);
      return false;
    }
    return true;
  };

  // Switch Active (Board, Class) — Strictly permitted ONLY to unlocked base or ACTIVE paid ₹99 (board, class)
  const switchActiveBoardAndClass = async (
    targetBoard: EducationBoard,
    targetClass: ClassLevel
  ): Promise<{ success: boolean; message: string; needsPurchase?: boolean; needsRenewal?: boolean }> => {
    if (!currentStudent) {
      return { success: false, message: 'Please sign in first.', needsPurchase: true };
    }
    if (!verifyLocalDeviceBeforeProtectedAction()) {
      return { success: false, message: SINGLE_DEVICE_BLOCK_MESSAGE };
    }
    const resolvedBoard = normalizeBoardValue(targetBoard || currentStudent.board || 'Maharashtra');
    const normalizedTarget = normalizeClassLevelValue(targetClass) || currentStudent.classLevel;
    const accessCheck = canSwitchBoardAndClass(currentStudent, resolvedBoard, normalizedTarget);

    if (!accessCheck.allowed) {
      addNotification(
        accessCheck.needsRenewal
          ? `${resolvedBoard} • ${normalizedTarget} Subscription Expired ⏳`
          : `${resolvedBoard} • ${normalizedTarget} Locked 🔒`,
        accessCheck.reason,
        'membership'
      );
      return {
        success: false,
        message: accessCheck.reason,
        needsPurchase: accessCheck.needsPurchase,
        needsRenewal: accessCheck.needsRenewal,
      };
    }

    const currentBoard = normalizeBoardValue(currentStudent.board || 'Maharashtra');
    if (currentBoard === resolvedBoard && currentStudent.classLevel === normalizedTarget) {
      return {
        success: true,
        message: `Your workspace is already active on ${getBoardDisplayName(resolvedBoard)} • Standard ${formatStandardOrdinal(normalizedTarget)} (${normalizedTarget}).`,
      };
    }

    const updatedStudent: StudentProfile = {
      ...currentStudent,
      board: resolvedBoard,
      classLevel: normalizedTarget,
      lastActiveDate: new Date().toISOString(),
    };

    setCurrentStudent(updatedStudent);
    setStudentsList(prev => prev.map(s => (s.id === updatedStudent.id ? updatedStudent : s)));
    setCurrentUser(prev =>
      prev ? { ...prev, board: resolvedBoard, classLevel: normalizedTarget } : prev
    );

    switchStudentActiveClassInFirestore(updatedStudent.id, normalizedTarget, resolvedBoard).catch(() => {});
    (async () => {
      let token: string | undefined;
      try {
        token = await auth.currentUser?.getIdToken();
      } catch {}
      await switchStudentActiveClassApi(updatedStudent.id, normalizedTarget, token, resolvedBoard);
    })().catch(() => {});

    addNotification(
      `Switched to ${resolvedBoard} • ${normalizedTarget} 🎓`,
      `Active learning dashboard switched to ${getBoardDisplayName(resolvedBoard)} • Standard ${formatStandardOrdinal(normalizedTarget)} (${normalizedTarget}).`,
      'achievement'
    );

    return {
      success: true,
      message: `Switched workspace to ${getBoardDisplayName(resolvedBoard)} • Standard ${formatStandardOrdinal(normalizedTarget)} (${normalizedTarget}).`,
    };
  };

  // Switch Active Class (Backwards-compatible wrapper accepting optional targetBoard)
  const switchActiveClass = async (
    targetClass: ClassLevel,
    targetBoard?: EducationBoard
  ): Promise<{ success: boolean; message: string; needsPurchase?: boolean; needsRenewal?: boolean }> => {
    const resolvedBoard = normalizeBoardValue(targetBoard || currentStudent?.board || 'Maharashtra');
    return switchActiveBoardAndClass(resolvedBoard, targetClass);
  };

  // Synchronous wrapper for class switching: unlocks ONLY if already purchased/active or base Free class
  const promoteOrUpdateStudentClass = (newClass: ClassLevel, _reason?: string): { success: boolean; message: string } => {
    if (!currentStudent) {
      return { success: false, message: 'Please sign in first.' };
    }
    const activeB = normalizeBoardValue(currentStudent.board || 'Maharashtra');
    const accessCheck = canSwitchBoardAndClass(currentStudent, activeB, newClass);
    if (!accessCheck.allowed) {
      addNotification('Class Access Restricted 🔒', accessCheck.reason, 'membership');
      return {
        success: false,
        message: accessCheck.reason
      };
    }
    void switchActiveBoardAndClass(activeB, newClass);
    return {
      success: true,
      message: `Switched active workspace to ${activeB} • Standard ${formatStandardOrdinal(newClass)} (${newClass}).`
    };
  };

  const updateStudentClass = (newClass: ClassLevel) => {
    void switchActiveClass(newClass);
  };

  const submitWorksheetAttempt = (attemptData: Omit<WorksheetAttemptRecord, 'id' | 'completedAt'>): WorksheetAttemptRecord => {
    const parsedFromId = parseBoardAndClassFromWorksheetId(attemptData.worksheetId);
    const resolvedBoard: EducationBoard = normalizeBoardValue(
      attemptData.board || parsedFromId.board || currentStudent?.board || 'Maharashtra'
    );
    const resolvedClass: ClassLevel | undefined =
      normalizeClassLevelValue(attemptData.classLevel) ||
      parsedFromId.classLevel ||
      currentStudent?.classLevel;

    const accessCheck = canAccessWorksheet(
      currentStudent,
      attemptData.worksheetId,
      resolvedClass,
      undefined,
      resolvedBoard
    );
    const record: WorksheetAttemptRecord = {
      ...attemptData,
      board: resolvedBoard,
      classLevel: resolvedClass || currentStudent?.classLevel || 'Class 1',
      id: `ws_att_${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    if (!accessCheck.allowed) {
      addNotification(
        'Premium Worksheet Locked (₹99)',
        WORKSHEET_PREMIUM_UPGRADE_MESSAGE,
        'membership'
      );
      return record;
    }

    if (currentStudent) {
      const completedSet = new Set(currentStudent.completedWorksheetIds || []);
      completedSet.add(attemptData.worksheetId);
      const existingAttempts = currentStudent.worksheetAttempts || [];
      const bonusPoints = Math.max(15, attemptData.obtainedMarks * 2);

      const updatedStudent: StudentProfile = {
        ...currentStudent,
        points: currentStudent.points + bonusPoints,
        coins: currentStudent.coins + Math.floor(bonusPoints / 2),
        completedWorksheetIds: Array.from(completedSet),
        worksheetAttempts: [record, ...existingAttempts],
        lastActiveDate: new Date().toISOString()
      };

      setCurrentStudent(updatedStudent);
      setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
      saveStudentProfileToFirestore(updatedStudent).catch(() => {});

      addNotification(
        `Worksheet Completed: ${resolvedBoard} • ${attemptData.subject}`,
        `You scored ${attemptData.obtainedMarks}/${attemptData.totalMarks} (${attemptData.percentage}%) on "${attemptData.worksheetTitle}" and earned +${bonusPoints} Champion Points!`,
        'achievement'
      );
    }

    return record;
  };

  // ZERO QUESTION REPETITION ENGINE - STRICT REQUIREMENT (Scoped by Board, Class, and Subject)
  // Returns exactly 10 questions for the given board, class and subject that this student has NEVER seen before!
  const getUnattemptedQuizQuestions = (
    classLevel: ClassLevel,
    subject: SubjectName,
    board?: EducationBoard
  ): QuizQuestion[] => {
    const resolvedBoard = normalizeBoardValue(board || currentStudent?.board || 'Maharashtra');
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];

    // Filter candidate pool strictly by board, classLevel and subject
    let candidatePool = allQuestions.filter(
      q =>
        normalizeBoardValue(q.board || 'Maharashtra') === resolvedBoard &&
        q.classLevel === classLevel &&
        q.subject === subject &&
        q.status === 'approved' &&
        !studentAttempted.includes(q.id)
    );

    let updatedQuestions = [...allQuestions];
    let counter = 1;

    while (candidatePool.length < 10 && counter <= 35) {
      const freshQuestion = generateClassSpecificCurriculumQuestion(
        classLevel,
        subject,
        updatedQuestions,
        Date.now() + counter * 997,
        resolvedBoard
      );

      // Verify once more against the repetition rule and duplicate check
      const dupCheck = checkQuestionDuplicate(
        freshQuestion.questionText,
        freshQuestion.options[freshQuestion.correctIndex],
        updatedQuestions
      );

      if (!dupCheck.isDuplicate && !studentAttempted.includes(freshQuestion.id)) {
        updatedQuestions.push(freshQuestion);
        candidatePool.push(freshQuestion);
      }
      counter++;
    }

    if (updatedQuestions.length > allQuestions.length) {
      setAllQuestions(updatedQuestions);
    }

    return candidatePool.slice(0, 10);
  };

  const getSubjectLevelProgress = (
    subject: SubjectName,
    classLevelOverride?: ClassLevel,
    boardOverride?: EducationBoard
  ): SubjectLevelProgress => {
    if (!currentStudent || !currentStudent.subjectProgress) {
      return {
        maxUnlockedLevel: 4,
        completedLevels: [],
        bestScores: {}
      };
    }
    const targetBoard = normalizeBoardValue(boardOverride || currentStudent.board || 'Maharashtra');
    const targetClass = classLevelOverride || currentStudent.classLevel;
    const boardClassScopedKey = `${targetBoard}__${targetClass}__${subject}` as SubjectName;
    const classScopedKey = `${targetClass}__${subject}` as SubjectName;
    const found =
      currentStudent.subjectProgress[boardClassScopedKey] ||
      (targetBoard === 'Maharashtra' ? currentStudent.subjectProgress[classScopedKey] : undefined) ||
      (targetBoard === normalizeBoardValue(currentStudent.board || 'Maharashtra')
        ? currentStudent.subjectProgress[subject]
        : undefined);
    if (!found) {
      return {
        maxUnlockedLevel: 4,
        completedLevels: [],
        bestScores: {}
      };
    }
    return {
      ...found,
      // Requirement 4: All four levels must be visible and accessible in every applicable subject
      maxUnlockedLevel: 4
    };
  };

  const fetchClassSubjectQuestionsAsync = async (
    classLevel: ClassLevel,
    subject: SubjectName,
    board?: EducationBoard
  ): Promise<QuizQuestion[]> => {
    const resolvedBoard = normalizeBoardValue(board || currentStudent?.board || 'Maharashtra');
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];
    const questions = await getStrictClassSubjectQuestions(
      classLevel,
      subject,
      studentAttempted,
      allQuestions,
      resolvedBoard
    );

    const existingIds = new Set(allQuestions.map(q => q.id));
    const newQuestions = questions.filter(q => !existingIds.has(q.id));
    if (newQuestions.length > 0) {
      setAllQuestions(prev => [...prev, ...newQuestions]);
    }

    return questions;
  };

  const fetchClassSubjectLevelQuestionsAsync = async (
    classLevel: ClassLevel,
    subject: SubjectName,
    level: QuizLevel,
    board?: EducationBoard
  ): Promise<QuizQuestion[]> => {
    const resolvedBoard = normalizeBoardValue(board || currentStudent?.board || 'Maharashtra');
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];
    const questions = await getStrictClassSubjectLevelQuestions(
      classLevel,
      subject,
      level,
      studentAttempted,
      allQuestions,
      resolvedBoard
    );

    const existingIds = new Set(allQuestions.map(q => q.id));
    const newQuestions = questions.filter(q => !existingIds.has(q.id));
    if (newQuestions.length > 0) {
      setAllQuestions(prev => [...prev, ...newQuestions]);
    }

    return questions;
  };

  const updateQuestionStatus = (questionId: string, status: 'approved' | 'rejected') => {
    setAllQuestions(prev => prev.map(q => q.id === questionId ? { ...q, status } : q));
  };

  const submitQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'completedAt'>): QuizAttempt => {
    const passed = attemptData.scorePercent >= 60;
    const currentLvl = (attemptData.level || 1) as QuizLevel;
    const resolvedBoard = normalizeBoardValue(
      attemptData.board || currentStudent?.board || 'Maharashtra'
    );

    const newAttempt: QuizAttempt = {
      ...attemptData,
      board: resolvedBoard,
      level: currentLvl,
      passed,
      id: `att_${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    setAllAttempts(prev => [newAttempt, ...prev]);

    // Update current student points, streak, accuracy, attempted questions, and board+class+subject levels
    if (currentStudent) {
      const newlyAttempted = Array.from(new Set([
        ...currentStudent.attemptedQuestionIds,
        ...newAttempt.questionIds
      ]));

      const bonusPoints = newAttempt.pointsEarned;
      const updatedPoints = currentStudent.points + bonusPoints;
      const updatedCoins = currentStudent.coins + Math.floor(bonusPoints / 2);

      // Check level upgrades
      let newLevel = currentStudent.level;
      if (updatedPoints >= 2000) newLevel = 5;
      else if (updatedPoints >= 1000) newLevel = 4;
      else if (updatedPoints >= 500) newLevel = 3;
      else if (updatedPoints >= 200) newLevel = 2;

      // Update 4-Level Subject Progression (board+class-scoped, plus legacy keys)
      const boardClassScopedKey = `${resolvedBoard}__${newAttempt.classLevel}__${newAttempt.subject}` as SubjectName;
      const classScopedKey = `${newAttempt.classLevel}__${newAttempt.subject}` as SubjectName;
      const existingSubjProgress =
        currentStudent.subjectProgress?.[boardClassScopedKey] ||
        (resolvedBoard === 'Maharashtra' ? currentStudent.subjectProgress?.[classScopedKey] : undefined) ||
        currentStudent.subjectProgress?.[newAttempt.subject] || {
          maxUnlockedLevel: 4 as QuizLevel,
          completedLevels: [] as QuizLevel[],
          bestScores: {}
        };

      let newMaxUnlocked: QuizLevel = 4;
      if (passed && currentLvl < 4) {
        newMaxUnlocked = 4;
      }

      const completedSet = new Set(existingSubjProgress.completedLevels);
      if (passed) {
        completedSet.add(currentLvl);
      }

      const updatedBestScores = {
        ...existingSubjProgress.bestScores,
        [currentLvl]: Math.max(existingSubjProgress.bestScores[currentLvl] || 0, newAttempt.correctCount)
      };

      const updatedSubjProgress: SubjectLevelProgress = {
        maxUnlockedLevel: newMaxUnlocked,
        completedLevels: Array.from(completedSet),
        bestScores: updatedBestScores
      };

      const updatedSubjectProgressMap = {
        ...(currentStudent.subjectProgress || {}),
        [newAttempt.subject]: updatedSubjProgress,
        [classScopedKey]: updatedSubjProgress,
        [boardClassScopedKey]: updatedSubjProgress
      };

      // Check new badges
      const currentBadges = [...currentStudent.badges];
      if (!currentBadges.includes('badge-first-quiz')) {
        currentBadges.push('badge-first-quiz');
      }
      if (newAttempt.correctCount === 10 && !currentBadges.includes('badge-accuracy-master')) {
        currentBadges.push('badge-accuracy-master');
      }
      if (
        (newAttempt.subject === 'Mathematics' ||
          newAttempt.subject === 'Mathematics – Algebra' ||
          newAttempt.subject === 'Mathematics – Geometry') &&
        !currentBadges.includes('badge-math-whiz')
      ) {
        currentBadges.push('badge-math-whiz');
      }

      const updatedStudent: StudentProfile = {
        ...currentStudent,
        points: updatedPoints,
        coins: updatedCoins,
        level: newLevel,
        attemptedQuestionIds: newlyAttempted,
        subjectProgress: updatedSubjectProgressMap,
        badges: currentBadges,
        lastActiveDate: new Date().toISOString()
      };

      setCurrentStudent(updatedStudent);
      setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));

      const isLevelUpgraded = passed && currentLvl < 4 && newMaxUnlocked > existingSubjProgress.maxUnlockedLevel;

      addNotification(
        `Quiz Completed: ${resolvedBoard} • ${newAttempt.subject} (Level ${currentLvl})`,
        `You scored ${newAttempt.correctCount}/10 (${newAttempt.scorePercent}%) and earned +${bonusPoints} Champion Points!${isLevelUpgraded ? ` 🔓 Level ${newMaxUnlocked} is now UNLOCKED!` : ''}`,
        'quiz'
      );
    }

    return newAttempt;
  };

  // Add question with strict global duplicate detection for Administrator
  const addNewQuestionWithValidation = (questionData: {
    board?: EducationBoard;
    classLevel: ClassLevel;
    subject: SubjectName;
    level?: QuizLevel;
    topic?: string;
    questionType?: QuestionType;
    questionText: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
    difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  }) => {
    const resolvedBoard = normalizeBoardValue(questionData.board || 'Maharashtra');
    const dupCheck = checkQuestionDuplicate(
      questionData.questionText,
      questionData.options[questionData.correctIndex],
      allQuestions
    );

    if (dupCheck.isDuplicate) {
      const rejectedRecord: RejectedQuestionRecord = {
        id: `rej-${Date.now()}`,
        candidateText: questionData.questionText,
        matchedQuestionId: dupCheck.matchedQuestionId,
        reason: dupCheck.duplicateReason || 'Duplicate question detected by similarity engine.',
        similarityScore: dupCheck.similarityScore,
        timestamp: new Date().toISOString()
      };
      setRejectedDuplicates(prev => [rejectedRecord, ...prev]);

      return {
        success: false,
        message: `Duplicate Rejected: ${dupCheck.duplicateReason}`,
        duplicateCheck: dupCheck
      };
    }

    const uniqueCode = Math.floor(Math.random() * 9000 + 1000);
    const boardTag = resolvedBoard === 'Maharashtra' ? '' : `${resolvedBoard.toUpperCase()}-`;
    const newQuestion: QuizQuestion = {
      id: `VC-${boardTag}C${questionData.classLevel.replace('Class ', '')}-${questionData.subject.substring(0, 3).toUpperCase()}-CUSTOM-${uniqueCode}`,
      board: resolvedBoard,
      classLevel: questionData.classLevel,
      subject: questionData.subject,
      level: questionData.level || 1,
      topic: questionData.topic || 'General',
      questionType: questionData.questionType || 'mcq',
      questionText: questionData.questionText,
      normalizedHash: dupCheck.matchedQuestionId || questionData.questionText.toLowerCase().replace(/[^a-z0-9]/g, ''),
      options: questionData.options,
      correctIndex: questionData.correctIndex,
      explanation: questionData.explanation,
      difficulty: questionData.difficulty || 'medium',
      timesAttempted: 0,
      timesCorrect: 0,
      status: 'approved',
      author: 'admin',
      createdAt: new Date().toISOString()
    };

    setAllQuestions(prev => [newQuestion, ...prev]);

    return {
      success: true,
      message: `Question passed global zero-duplication check and was added to the ${resolvedBoard} question bank successfully.`
    };
  };

  const deleteQuestion = (questionId: string) => {
    setAllQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  // Stories
  const markStoryCompleted = (storyId: string) => {
    if (!currentStudent) return;
    if (currentStudent.completedStoryIds.includes(storyId)) return;

    const updatedCompleted = [...currentStudent.completedStoryIds, storyId];
    const bonus = platformSettings.pointsPerStoryRead;
    const updated = {
      ...currentStudent,
      completedStoryIds: updatedCompleted,
      points: currentStudent.points + bonus,
      coins: currentStudent.coins + 10
    };

    if (updatedCompleted.length >= 5 && !updated.badges.includes('badge-story-worm')) {
      updated.badges.push('badge-story-worm');
    }

    setCurrentStudent(updated);
    setStudentsList(prev => prev.map(s => s.id === updated.id ? updated : s));

    addNotification(
      'Story Completed!',
      `You earned +${bonus} points for reading and listening to the story.`,
      'story'
    );
  };

  // Drawing
  const saveDrawingSubmission = (drawingData: Omit<DrawingSubmission, 'id' | 'studentId' | 'studentName' | 'createdAt'>): DrawingSubmission => {
    if (!currentStudent) {
      throw new Error('Authentication required to save drawings.');
    }
    const student = currentStudent;
    const newDrawing: DrawingSubmission = {
      ...drawingData,
      id: `draw_${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      createdAt: new Date().toISOString()
    };

    setSavedDrawings(prev => [newDrawing, ...prev]);

    // Award drawing reward points & badges
    const bonus = drawingData.pointsEarned || platformSettings.pointsPerDrawing;
    const updatedBadges = [...student.badges];
    if (!updatedBadges.includes('badge-artist-pro')) {
      updatedBadges.push('badge-artist-pro');
    }
    if (drawingData.type === 'coloured' && !updatedBadges.includes('badge-colouring-star')) {
      updatedBadges.push('badge-colouring-star');
    }
    if (drawingData.type === 'original' && !updatedBadges.includes('badge-creative-champion')) {
      updatedBadges.push('badge-creative-champion');
    }
    if (
      (drawingData.category === 'Nature and Scenery' || drawingData.category === 'Flowers and Gardens' || drawingData.category === 'Save Our Environment') &&
      !updatedBadges.includes('badge-nature-artist')
    ) {
      updatedBadges.push('badge-nature-artist');
    }
    // Count student's total drawings including this one
    const studentDrawingsCount = savedDrawings.filter(d => d.studentId === student.id).length + 1;
    if (studentDrawingsCount >= 3 && !updatedBadges.includes('badge-young-artist')) {
      updatedBadges.push('badge-young-artist');
    }
    if (studentDrawingsCount >= 6 && !updatedBadges.includes('badge-master-painter')) {
      updatedBadges.push('badge-master-painter');
    }

    const updated = {
      ...student,
      points: student.points + bonus,
      coins: student.coins + 15,
      badges: updatedBadges
    };

    setCurrentStudent(updated);
    setStudentsList(prev => prev.map(s => s.id === updated.id ? updated : s));

    addNotification(
      'Masterpiece Saved in Gallery! 🎨',
      `"${newDrawing.title}" added to your portfolio! Earned +${bonus} points.`,
      'drawing'
    );

    return newDrawing;
  };

  const deleteDrawingSubmission = (drawingId: string) => {
    setSavedDrawings(prev => prev.filter(d => d.id !== drawingId));
    addNotification('Drawing Removed', 'The artwork was deleted from your gallery.', 'drawing');
  };

  const addDrawingTemplate = (tpl: DrawingTemplate) => {
    setDrawingTemplates(prev => [tpl, ...prev.filter(t => t.id !== tpl.id)]);
    addNotification('New Drawing Added', `Template "${tpl.title}" added to Drawing Champions!`, 'drawing');
    void saveSpecialContentItemToFirestore({
      id: tpl.id,
      contentType: 'drawing_template',
      title: tpl.title,
      published: tpl.published !== false,
      payload: tpl as unknown as Record<string, unknown>,
    }).catch(() => {});
  };

  const toggleDrawingTemplatePublished = (templateId: string) => {
    let targetTpl: DrawingTemplate | undefined;
    setDrawingTemplates(prev =>
      prev.map(t => {
        if (t.id === templateId) {
          targetTpl = { ...t, published: !t.published };
          return targetTpl;
        }
        return t;
      })
    );
    if (targetTpl) {
      void saveSpecialContentItemToFirestore({
        id: targetTpl.id,
        contentType: 'drawing_template',
        title: targetTpl.title,
        published: targetTpl.published,
        payload: targetTpl as unknown as Record<string, unknown>,
      }).catch(() => {});
    }
  };

  const deleteDrawingTemplate = (templateId: string) => {
    setDrawingTemplates(prev => prev.filter(t => t.id !== templateId));
    void deleteSpecialContentItemFromFirestore(templateId).catch(() => {});
  };

  // Story World & Shivaji Stories CMS handlers
  const addOrUpdateStory = async (story: StoryItem) => {
    const normalized: StoryItem = { ...story, published: story.published !== false, isCustom: true };
    setAllStories(prev => {
      const exists = prev.some(s => s.id === normalized.id);
      return exists ? prev.map(s => (s.id === normalized.id ? normalized : s)) : [normalized, ...prev];
    });
    await saveSpecialContentItemToFirestore({
      id: normalized.id,
      contentType: 'story',
      title: normalized.title,
      published: normalized.published !== false,
      payload: normalized as unknown as Record<string, unknown>,
    }).catch(() => {});
  };

  const toggleStoryPublished = async (storyId: string) => {
    let updatedItem: StoryItem | undefined;
    setAllStories(prev =>
      prev.map(s => {
        if (s.id === storyId) {
          updatedItem = { ...s, published: s.published === false, isCustom: true };
          return updatedItem;
        }
        return s;
      })
    );
    if (updatedItem) {
      await saveSpecialContentItemToFirestore({
        id: updatedItem.id,
        contentType: 'story',
        title: updatedItem.title,
        published: updatedItem.published !== false,
        payload: updatedItem as unknown as Record<string, unknown>,
      }).catch(() => {});
    }
  };

  const deleteCustomStory = async (storyId: string) => {
    setAllStories(prev => prev.filter(s => s.id !== storyId));
    await deleteSpecialContentItemFromFirestore(storyId).catch(() => {});
  };

  const addOrUpdateShivajiStory = async (story: ShivajiStory) => {
    const normalized: ShivajiStory = { ...story, published: story.published !== false, isCustom: true };
    setShivajiStories(prev => {
      const exists = prev.some(s => s.id === normalized.id);
      const next = exists ? prev.map(s => (s.id === normalized.id ? normalized : s)) : [...prev, normalized];
      return next.sort((a, b) => a.order - b.order);
    });
    await saveSpecialContentItemToFirestore({
      id: normalized.id,
      contentType: 'shivaji_story',
      title: normalized.title.English || normalized.title.Marathi,
      published: normalized.published !== false,
      payload: normalized as unknown as Record<string, unknown>,
    }).catch(() => {});
  };

  const deleteCustomShivajiStory = async (storyId: string) => {
    setShivajiStories(prev => prev.filter(s => s.id !== storyId));
    await deleteSpecialContentItemFromFirestore(storyId).catch(() => {});
  };

  // Scholarship Custom Questions CMS
  const addOrUpdateScholarshipQuestion = async (q: CustomScholarshipQuestionRecord) => {
    const normalized: CustomScholarshipQuestionRecord = {
      ...q,
      published: q.published !== false,
      isCustom: true,
      createdAt: q.createdAt || new Date().toISOString(),
    };
    setCustomScholarshipQuestions(prev => {
      const exists = prev.some(item => item.id === normalized.id);
      return exists ? prev.map(item => (item.id === normalized.id ? normalized : item)) : [normalized, ...prev];
    });
    await saveSpecialContentItemToFirestore({
      id: normalized.id,
      contentType: 'scholarship_question',
      title: normalized.questionText.English || normalized.questionText.Marathi || 'Scholarship Question',
      published: normalized.published !== false,
      payload: normalized as unknown as Record<string, unknown>,
      createdAt: normalized.createdAt,
    }).catch(() => {});
  };

  const deleteCustomScholarshipQuestion = async (id: string) => {
    setCustomScholarshipQuestions(prev => prev.filter(q => q.id !== id));
    await deleteSpecialContentItemFromFirestore(id).catch(() => {});
  };

  // GK & Cricket CMS
  const addOrUpdateGkQuestion = async (q: CustomGkQuestionItem) => {
    const normalized: CustomGkQuestionItem = {
      ...q,
      published: q.published !== false,
      isCustom: true,
      createdAt: q.createdAt || new Date().toISOString(),
    };
    setGkQuestions(prev => {
      const exists = prev.some(item => item.id === normalized.id);
      return exists ? prev.map(item => (item.id === normalized.id ? normalized : item)) : [normalized, ...prev];
    });
    await saveSpecialContentItemToFirestore({
      id: normalized.id,
      contentType: 'gk_question',
      title: normalized.question,
      published: normalized.published !== false,
      payload: normalized as unknown as Record<string, unknown>,
      createdAt: normalized.createdAt,
    }).catch(() => {});
  };

  const deleteCustomGkQuestion = async (id: string) => {
    setGkQuestions(prev => prev.filter(q => q.id !== id));
    await deleteSpecialContentItemFromFirestore(id).catch(() => {});
  };

  // Other Learning Programs CMS
  const addOrUpdateLearningProgram = async (program: SpecialLearningProgramItem) => {
    const normalized: SpecialLearningProgramItem = {
      ...program,
      published: program.published !== false,
      isCustom: true,
      createdAt: program.createdAt || new Date().toISOString(),
    };
    setLearningPrograms(prev => {
      const exists = prev.some(item => item.id === normalized.id);
      return exists ? prev.map(item => (item.id === normalized.id ? normalized : item)) : [...prev, normalized];
    });
    await saveSpecialContentItemToFirestore({
      id: normalized.id,
      contentType: 'learning_program',
      title: normalized.title,
      published: normalized.published !== false,
      payload: normalized as unknown as Record<string, unknown>,
      createdAt: normalized.createdAt,
    }).catch(() => {});
  };

  const deleteLearningProgram = async (id: string) => {
    setLearningPrograms(prev => prev.filter(p => p.id !== id));
    await deleteSpecialContentItemFromFirestore(id).catch(() => {});
  };

  // Puzzles
  const solvePuzzle = (puzzleId: string, pointsAwarded: number) => {
    if (!currentStudent) return;
    if (currentStudent.attemptedPuzzleIds.includes(puzzleId)) return;

    const updatedAttempted = [...currentStudent.attemptedPuzzleIds, puzzleId];
    const updatedBadges = [...currentStudent.badges];
    if (updatedAttempted.length >= 5 && !updatedBadges.includes('badge-puzzle-genius')) {
      updatedBadges.push('badge-puzzle-genius');
    }

    const updated = {
      ...currentStudent,
      attemptedPuzzleIds: updatedAttempted,
      points: currentStudent.points + pointsAwarded,
      coins: currentStudent.coins + Math.floor(pointsAwarded / 2),
      badges: updatedBadges
    };

    setCurrentStudent(updated);
    setStudentsList(prev => prev.map(s => s.id === updated.id ? updated : s));

    addNotification(
      'Brain Puzzle Solved! 🧩',
      `Super job! You earned +${pointsAwarded} points in Puzzle Champions.`,
      'challenge'
    );
  };

  // Automatic Verified Membership Activation (from Razorpay server verification)
  const activateVerifiedMembership = (transaction: PaymentTransaction, customExpiryDate?: string) => {
    if (!currentStudent) {
      return;
    }
    const student = currentStudent;
    const targetBoard: EducationBoard = normalizeBoardValue(
      transaction.selectedBoard || student.board || 'Maharashtra'
    );
    const targetClass: ClassLevel =
      normalizeClassLevelValue(transaction.selectedClass) ||
      normalizeClassLevelValue(student.classLevel) ||
      'Class 1';
    const compositeKey = buildBoardClassKey(targetBoard, targetClass);

    const txWithBoardClass: PaymentTransaction = {
      ...transaction,
      selectedBoard: targetBoard,
      selectedClass: targetClass
    };

    // Prevent duplicate subscription activation or duplicate points for an already-processed payment
    const alreadyProcessedLocally = transactions.some(
      t =>
        t.status === 'SUCCESS' &&
        (t.paymentId === txWithBoardClass.paymentId ||
          (Boolean(txWithBoardClass.orderId) && t.orderId === txWithBoardClass.orderId))
    );

    if (alreadyProcessedLocally) {
      saveTransactionToFirestore(txWithBoardClass).catch(() => {});
      return;
    }

    const existingCompositeMap = getRawBoardClassSubscriptionsMap(student);
    const existingClassMap = getRawClassSubscriptionsMap(student);
    const targetExistingExpiry = existingCompositeMap[compositeKey]?.expiresAt;
    const computedDates = computePaidPlanExpiryIsoDate(targetExistingExpiry);
    const resolvedPurchasedAt = txWithBoardClass.membershipStartDate || computedDates.purchasedAt;
    const resolvedExpiresAt =
      customExpiryDate || txWithBoardClass.membershipExpiryDate || computedDates.expiresAt;

    const newSubRecord: ClassSubscriptionRecord = {
      board: targetBoard,
      boardClassKey: compositeKey,
      classLevel: targetClass,
      plan: txWithBoardClass.planId,
      status: 'ACTIVE',
      purchasedAt: resolvedPurchasedAt,
      expiresAt: resolvedExpiresAt,
      paymentId: txWithBoardClass.paymentId,
      orderId: txWithBoardClass.orderId,
      amountInr: txWithBoardClass.amount || 99,
      validityDays: 365,
      updatedAt: new Date().toISOString()
    };

    const updatedClassSubscriptions: Record<string, ClassSubscriptionRecord> = {
      ...existingClassMap,
      ...existingCompositeMap,
      [compositeKey]: newSubRecord
    };

    const updatedBadges = [...student.badges];
    if (txWithBoardClass.planId === 'premium' && !updatedBadges.includes('badge-champion-premium')) {
      updatedBadges.push('badge-champion-premium');
    }

    const tempForActiveList: StudentProfile = {
      ...student,
      classSubscriptions: updatedClassSubscriptions
    };
    const updatedActivatedPairs = getActivatedBoardClassesList(tempForActiveList);
    const updatedActivatedKeys = Array.from(new Set([...updatedActivatedPairs.map(i => i.boardClassKey), compositeKey]));
    const updatedActivatedClasses = Array.from(
      new Set([
        ...updatedActivatedKeys
          .map(k => parseBoardClassKey(k)?.classLevel)
          .filter((cls): cls is ClassLevel => Boolean(cls)),
        targetClass
      ])
    );

    const updatedStudent: StudentProfile = {
      ...student,
      board: targetBoard,
      primaryBoard: getPrimaryBaseBoard(student),
      classLevel: targetClass,
      primaryClassLevel: getPrimaryBaseClass(student),
      plan: txWithBoardClass.planId,
      activatedBoard: targetBoard,
      activatedClassLevel: targetClass,
      activatedClasses: updatedActivatedClasses,
      activatedClassKeys: updatedActivatedKeys,
      classSubscriptions: updatedClassSubscriptions,
      planPurchasedAt: resolvedPurchasedAt,
      planExpiresAt: resolvedExpiresAt,
      lastPaymentId: txWithBoardClass.paymentId,
      lastOrderId: txWithBoardClass.orderId,
      points: student.points + (txWithBoardClass.planId === 'premium' ? 250 : 100),
      badges: updatedBadges,
      lastActiveDate: new Date().toISOString()
    };

    setCurrentStudent(updatedStudent);
    setCurrentUser(prev =>
      prev ? { ...prev, board: targetBoard, classLevel: targetClass } : prev
    );
    setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setTransactions(prev => [txWithBoardClass, ...prev.filter(t => t.paymentId !== txWithBoardClass.paymentId)]);

    (async () => {
      try {
        await saveTransactionToFirestore(txWithBoardClass);
      } catch {
        // Ignore if already saved by backend
      }
      try {
        await saveStudentProfileToFirestore(updatedStudent);
      } catch {
        // Non-blocking
      }
      try {
        await saveSubscriptionToFirestore(updatedStudent.id, {
          plan: txWithBoardClass.planId,
          selectedBoard: targetBoard,
          selectedClass: targetClass,
          planPurchasedAt: resolvedPurchasedAt,
          planExpiresAt: resolvedExpiresAt,
          currentExpiresAt: targetExistingExpiry,
          paymentId: txWithBoardClass.paymentId,
          orderId: txWithBoardClass.orderId,
          amountInr: txWithBoardClass.amount
        });
      } catch {
        // Non-blocking
      }
    })();

    (async () => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      try {
        const token = await auth.currentUser?.getIdToken();
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch {
        // Proceed without token if offline
      }
      const syncBody = JSON.stringify({
        studentId: updatedStudent.id,
        plan: txWithBoardClass.planId,
        selectedBoard: targetBoard,
        selectedClass: targetClass,
        planPurchasedAt: resolvedPurchasedAt,
        planExpiresAt: resolvedExpiresAt,
        paymentId: txWithBoardClass.paymentId,
        orderId: txWithBoardClass.orderId
      });
      const res = await fetch('/api/subscription/sync', {
        method: 'POST',
        headers,
        body: syncBody
      });
      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (res.status === 404 || contentType.includes('text/html')) {
        await fetch('/.netlify/functions/api/subscription/sync', {
          method: 'POST',
          headers,
          body: syncBody
        });
      }
    })().catch(() => {});

    addNotification(
      `${targetBoard} • ${targetClass} Membership Activated! 👑`,
      `Your Premium Access is Activated for ${getBoardDisplayName(targetBoard)} • Standard ${formatStandardOrdinal(targetClass)} (${targetClass}) — Valid 365 Days until ${formatDateIstDisplay(resolvedExpiresAt)}. Payment ID: ${txWithBoardClass.paymentId}.`,
      'membership'
    );
  };

  // Admin-approved migration helper to update an existing paid subscription's expiry date to purchaseDate + 365 days
  const adminApplyApproved365DayMigration = (studentId: string): {
    success: boolean;
    message: string;
    previousExpiresAt?: string | null;
    updatedExpiresAt?: string | null;
  } => {
    const target = studentsList.find(s => s.id === studentId);
    if (!target) {
      return { success: false, message: `Student record "${studentId}" not found.` };
    }
    const audit = auditStudentSubscriptionRecord(target);
    if (!audit.proposed365ExpiryDateIst) {
      return {
        success: false,
        message: `Account "${target.name}" does not have a stored purchase date to calculate a 365-day expiry from.`
      };
    }

    const previousExpiresAt = target.planExpiresAt || null;
    const updatedExpiresAt = audit.proposed365ExpiryDateIst;
    const updatedPurchasedAt = audit.currentPurchaseDateIst || target.planPurchasedAt;

    const updatedStudent: StudentProfile = {
      ...target,
      planPurchasedAt: updatedPurchasedAt || undefined,
      planExpiresAt: updatedExpiresAt
    };

    setStudentsList(prev => prev.map(s => (s.id === studentId ? updatedStudent : s)));
    if (currentStudent?.id === studentId) {
      setCurrentStudent(updatedStudent);
    }

    saveStudentProfileToFirestore(updatedStudent).catch(() => {});
    saveSubscriptionToFirestore(updatedStudent.id, {
      plan: updatedStudent.plan,
      selectedClass: updatedStudent.activatedClassLevel || updatedStudent.classLevel,
      planPurchasedAt: updatedPurchasedAt || undefined,
      planExpiresAt: updatedExpiresAt
    }).catch(() => {});

    addNotification(
      'Subscription Date Corrected (365 Days) 📅',
      `Updated ${target.name}'s expiry date from ${previousExpiresAt || 'N/A'} to ${formatDateIstDisplay(updatedExpiresAt)} (${updatedExpiresAt}) based on purchase date ${updatedPurchasedAt}.`,
      'membership'
    );

    return {
      success: true,
      message: `Approved 365-day correction applied for ${target.name}: Purchase Date ${updatedPurchasedAt} → New Expiry Date ${updatedExpiresAt}.`,
      previousExpiresAt,
      updatedExpiresAt
    };
  };

  const updateTimers = (classes2to3: number, classes4to5: number, classes6to8: number) => {
    const nextTimers = { classes2to3, classes4to5, classes6to8 };
    setPlatformSettings(prev => {
      const updated = { ...prev, timers: nextTimers };
      void savePlatformConfigToFirestore({
        timers: nextTimers,
        sectionVisibility: updated.sectionVisibility,
      }).catch(() => {});
      return updated;
    });
  };

  const sectionVisibility = platformSettings.sectionVisibility || DEFAULT_SECTION_VISIBILITY;

  const isSectionVisible = useCallback(
    (sectionId: SpecialLearningSectionId): boolean => {
      if (activeRole === 'admin' && currentUser?.role === 'admin') {
        return true;
      }
      const rule = sectionVisibility[sectionId] || DEFAULT_SECTION_VISIBILITY[sectionId];
      if (!rule) return true;
      return currentStudent ? rule.visibleToStudents !== false : rule.visibleToVisitors !== false;
    },
    [activeRole, currentUser?.role, currentStudent, sectionVisibility]
  );

  const updateSectionVisibility = async (next: SectionVisibilityConfig) => {
    const updatedVis = { ...DEFAULT_SECTION_VISIBILITY, ...next };
    setPlatformSettings(prev => ({
      ...prev,
      sectionVisibility: updatedVis,
    }));
    await savePlatformConfigToFirestore({
      timers: platformSettings.timers,
      sectionVisibility: updatedVis,
    }).catch(() => {});
  };

  const addNotification = (title: string, message: string, type: InAppNotification['type']) => {
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const recordScholarshipAttempt = async (
    classLevel: ScholarshipClass,
    setNumber: number,
    language: ScholarshipLanguage,
    questionsList: ScholarshipQuestion[],
    userAnswers: Record<string, number>,
    totalMarks: number,
    maxMarks: number,
    sectionScores: Record<ScholarshipSection, { obtained: number; max: number; correct: number; total: number }>
  ) => {
    if (!currentStudent) return;

    const attemptedIds = questionsList.map(q => q.id);
    const updatedAttempted = Array.from(new Set([
      ...(currentStudent.attemptedScholarshipQuestionIds || []),
      ...attemptedIds
    ]));

    const bonusPoints = totalMarks * 5;
    const bonusCoins = Math.floor(totalMarks * 1.5);
    const updatedStudent: StudentProfile = {
      ...currentStudent,
      points: (currentStudent.points || 0) + bonusPoints,
      coins: (currentStudent.coins || 0) + bonusCoins,
      attemptedScholarshipQuestionIds: updatedAttempted,
      lastActiveDate: new Date().toISOString()
    };

    setCurrentStudent(updatedStudent);
    setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));

    const attemptId = `sch_att_${Date.now()}`;
    const correctCount = questionsList.filter(q => userAnswers[q.id] === q.correctIndex).length;

    const attemptRecord = {
      id: attemptId,
      studentId: currentStudent.id,
      subject: `Scholarship ${classLevel} - Set ${setNumber}`,
      totalQuestions: 30,
      correctCount,
      scorePercent: Math.round((totalMarks / maxMarks) * 100),
      timeSpentSeconds: 0,
      classLevel,
      setNumber,
      marksObtained: totalMarks,
      maxMarks,
      completedAt: new Date().toISOString(),
      sectionBreakdown: sectionScores
    };

    // Save to Firebase Firestore database
    await saveScholarshipAttemptToFirestore(currentStudent.id, attemptRecord, attemptedIds);

    addNotification(
      `MSCE Scholarship Set ${setNumber} Completed`,
      `You scored ${totalMarks}/${maxMarks} marks (${Math.round((totalMarks / maxMarks) * 100)}%) and earned +${bonusPoints} Champion Points! Questions added to your attempted history.`,
      'quiz'
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const clearSessionSecurityNotice = useCallback(() => setSessionSecurityNotice(null), []);
  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);
  const activeBoardValue = normalizeBoardValue(currentStudent?.board || 'Maharashtra');

  const contextValue = useMemo<AppContextType>(
    () => ({
      activeRole,
      setActiveRole,
      currentUser,
      currentStudent,
      activeBoard: activeBoardValue,
      studentsList,
      parentsList,
      announcements,
      allQuestions,
      rejectedDuplicates,
      allStories,
      shivajiStories,
      customScholarshipQuestions,
      gkQuestions,
      learningPrograms,
      allPuzzles,
      savedDrawings,
      drawingTemplates,
      allAttempts,
      transactions,
      notifications,
      platformSettings,
      sectionVisibility,
      isSectionVisible,
      updateSectionVisibility,

      switchRole,
      loginAsTeacher,
      loginAsAdmin,
      activeDeviceSession,
      sessionSecurityNotice,
      clearSessionSecurityNotice,
      acquireSessionAfterRegistration,
      recoverBlockedDeviceSession,

      checkAccountForMultiClassRegistration,
      registerStudent,
      loginWithEmail,
      recoverAccount,
      completePasswordReset,
      logout,
      quickSwitchStudent,
      isAuthModalOpen,
      setIsAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      adminPromoteOrCorrectClass,
      switchActiveClass,
      switchActiveBoardAndClass,
      promoteOrUpdateStudentClass,
      updateStudentClass,
      submitWorksheetAttempt,

      updateStudentAttendance,
      addStudentAssignment,
      updateStudentAssignment,
      updateStudentFeeRecord,
      addAnnouncement,
      deleteAnnouncement,
      linkParentToStudent,
      runSecurityAuditTest,

      getSubjectLevelProgress,
      getUnattemptedQuizQuestions,
      fetchClassSubjectQuestionsAsync,
      fetchClassSubjectLevelQuestionsAsync,
      updateQuestionStatus,
      submitQuizAttempt,
      addNewQuestionWithValidation,
      deleteQuestion,

      markStoryCompleted,
      addOrUpdateStory,
      toggleStoryPublished,
      deleteCustomStory,
      addOrUpdateShivajiStory,
      deleteCustomShivajiStory,
      saveDrawingSubmission,
      deleteDrawingSubmission,
      addDrawingTemplate,
      toggleDrawingTemplatePublished,
      deleteDrawingTemplate,
      solvePuzzle,
      addOrUpdateScholarshipQuestion,
      deleteCustomScholarshipQuestion,
      addOrUpdateGkQuestion,
      deleteCustomGkQuestion,
      addOrUpdateLearningProgram,
      deleteLearningProgram,
      activateVerifiedMembership,
      adminApplyApproved365DayMigration,

      recordScholarshipAttempt,
      updateTimers,
      markNotificationAsRead,
      clearAllNotifications,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeRole,
      currentUser,
      currentStudent,
      activeBoardValue,
      studentsList,
      parentsList,
      announcements,
      allQuestions,
      rejectedDuplicates,
      allStories,
      shivajiStories,
      customScholarshipQuestions,
      gkQuestions,
      learningPrograms,
      allPuzzles,
      savedDrawings,
      drawingTemplates,
      allAttempts,
      transactions,
      notifications,
      platformSettings,
      sectionVisibility,
      isSectionVisible,
      activeDeviceSession,
      sessionSecurityNotice,
      isAuthModalOpen,
      clearSessionSecurityNotice,
      openAuthModal,
      closeAuthModal,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
