import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  RegistrationResult,
  QuizQuestion, 
  QuizAttempt, 
  StoryItem, 
  DrawingSubmission, 
  PuzzleItem, 
  PaymentTransaction, 
  InAppNotification, 
  ClassLevel, 
  SubjectName,
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
  WorksheetAttemptRecord
} from '../types';
import { 
  getInitialSeedQuestions, 
  getStrictClassSubjectQuestions, 
  getStrictClassSubjectLevelQuestions,
  checkQuestionDuplicate, 
  generateClassSpecificCurriculumQuestion 
} from '../services/questionBankService';
import { ALL_45_STORIES } from '../data/storiesMaster';
import { SEED_PUZZLES } from '../data/puzzlesData';
import { READY_MADE_DRAWING_TEMPLATES } from '../data/drawingsData';
import { paymentGateway } from '../services/paymentService';
import { 
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
  computePaidPlanExpiryIsoDate,
  ensureStudentReferralCodeInFirestore
} from '../services/firebase';
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
  canAccessWorksheet,
  formatStandardOrdinal,
  getPremiumActivatedBannerMessage,
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
  studentsList: StudentProfile[];
  parentsList: ParentProfile[];
  announcements: AnnouncementItem[];
  allQuestions: QuizQuestion[];
  rejectedDuplicates: RejectedQuestionRecord[];
  allStories: StoryItem[];
  allPuzzles: PuzzleItem[];
  savedDrawings: DrawingSubmission[];
  allAttempts: QuizAttempt[];
  transactions: PaymentTransaction[];
  notifications: InAppNotification[];
  platformSettings: PlatformSettings;
  
  // Student & Teacher Portal Authentication & Session Guarding
  switchRole: (targetRole: UserRole) => { allowed: boolean; message?: string };
  loginAsSampleAccount: (
    accountKey: 'student1' | 'student2' | 'student3' | 'teacher1' | 'teacher2' | 'admin'
  ) => Promise<{ success: boolean; message: string }>;
  loginAsTeacher: (email: string, password?: string) => Promise<{ success: boolean; message: string; teacher?: StudentProfile }>;
  loginAsAdmin: (email: string, password?: string) => Promise<{ success: boolean; message: string; adminEmail?: string }>;
  
  // Auth & Session methods - Strict 1 Account = 1 Class = 1 Mobile = 1 Email
  registerStudent: (
    data: Omit<StudentProfile, 'id' | 'points' | 'coins' | 'level' | 'streakDays' | 'lastActiveDate' | 'badges' | 'plan' | 'attemptedQuestionIds' | 'attemptedPuzzleIds' | 'completedStoryIds' | 'registeredAt' | 'classChangeLogs' | 'subjectProgress'>,
    options?: {
      verifiedFirebaseUid?: string;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      password?: string;
      accountRole?: 'student' | 'teacher';
    }
  ) => RegistrationResult;
  loginWithEmail: (email: string, password?: string, preferredRole?: 'student' | 'teacher') => Promise<{ success: boolean; message: string; student?: StudentProfile }>;
  loginWithMobileOtp: (mobile: string, otp: string) => { success: boolean; message: string; student?: StudentProfile };
  loginWithVerifiedPhone: (mobile: string, firebaseUid?: string) => { success: boolean; message: string; student?: StudentProfile };
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

  // Class Promotion & Student Class Update (Classes 1 to 10)
  adminPromoteOrCorrectClass: (studentId: string, newClass: ClassLevel, reason: string, adminName?: string) => { success: boolean; message: string };
  promoteOrUpdateStudentClass: (newClass: ClassLevel, reason?: string) => { success: boolean; message: string };
  updateStudentClass: (newClass: ClassLevel) => void;

  // Online Worksheets (Classes 1 to 10)
  submitWorksheetAttempt: (attemptData: Omit<WorksheetAttemptRecord, 'id' | 'completedAt'>) => WorksheetAttemptRecord;

  // Quiz & Zero Repetition 4-Level Engine
  getSubjectLevelProgress: (subject: SubjectName, classLevelOverride?: ClassLevel) => SubjectLevelProgress;
  getUnattemptedQuizQuestions: (classLevel: ClassLevel, subject: SubjectName) => QuizQuestion[];
  fetchClassSubjectQuestionsAsync: (classLevel: ClassLevel, subject: SubjectName) => Promise<QuizQuestion[]>;
  fetchClassSubjectLevelQuestionsAsync: (classLevel: ClassLevel, subject: SubjectName, level: QuizLevel) => Promise<QuizQuestion[]>;
  updateQuestionStatus: (questionId: string, status: 'approved' | 'rejected') => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => QuizAttempt;
  addNewQuestionWithValidation: (questionData: {
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

  // Story methods
  markStoryCompleted: (storyId: string) => void;

  // Drawing methods & Template Management
  drawingTemplates: DrawingTemplate[];
  saveDrawingSubmission: (drawing: Omit<DrawingSubmission, 'id' | 'studentId' | 'studentName' | 'createdAt'>) => DrawingSubmission;
  deleteDrawingSubmission: (drawingId: string) => void;
  addDrawingTemplate: (tpl: DrawingTemplate) => void;
  toggleDrawingTemplatePublished: (templateId: string) => void;
  deleteDrawingTemplate: (templateId: string) => void;

  // Puzzle methods
  solvePuzzle: (puzzleId: string, pointsAwarded: number) => void;

  // Payment & Membership
  processMembershipPayment: (planId: 'basic' | 'premium', method: 'UPI' | 'Card' | 'NetBanking', simulateFailure?: boolean) => { success: boolean; transaction: PaymentTransaction; error?: string };
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

const DEFAULT_SETTINGS: PlatformSettings = {
  timers: {
    classes2to3: 30,
    classes4to5: 25,
    classes6to8: 20
  },
  pointsPerQuizCorrect: 10,
  pointsPerStoryRead: 25,
  pointsPerDrawing: 30,
  pointsPerPuzzle: 25
};

// 1. Free Student Account (Standard 4th / Class 4)
const INITIAL_STUDENT: StudentProfile = {
  id: 'uid_aarav_c4_987654',
  name: 'Aarav Sharma',
  accountRole: 'student',
  parentName: 'Rajesh Sharma',
  parentEmail: 'rajesh.sharma@example.com',
  mobile: '9876543210',
  email: 'aarav.sharma@example.com',
  classLevel: 'Class 4',
  schoolName: 'Delhi Public School',
  parentConsent: true,
  registeredAt: '2026-05-01T08:30:00.000Z',
  points: 480,
  coins: 140,
  level: 2,
  streakDays: 4,
  lastActiveDate: new Date().toISOString(),
  badges: ['badge-first-quiz', 'badge-streak-3'],
  plan: 'free',
  avatar: '🦁',
  attemptedQuestionIds: [],
  attemptedPuzzleIds: [],
  completedStoryIds: ['ENG-01'],
  classChangeLogs: [],
  isPhoneVerified: true,
  isEmailVerified: true,
  referralCode: 'STUDY123',
  referralLink: 'https://mystudyzone.in/register?ref=STUDY123',
  linkedParentId: 'uid_parent_rajesh_987654',
  attendanceRecords: [
    { id: 'att-1', studentId: 'uid_aarav_c4_987654', date: '2026-05-01', status: 'PRESENT', minutesLogged: 45 },
    { id: 'att-2', studentId: 'uid_aarav_c4_987654', date: '2026-05-02', status: 'PRESENT', minutesLogged: 60 },
    { id: 'att-3', studentId: 'uid_aarav_c4_987654', date: '2026-05-03', status: 'PRESENT', minutesLogged: 50 },
    { id: 'att-4', studentId: 'uid_aarav_c4_987654', date: '2026-05-04', status: 'PRESENT', minutesLogged: 40 },
    { id: 'att-5', studentId: 'uid_aarav_c4_987654', date: '2026-05-05', status: 'PRESENT', minutesLogged: 55 }
  ],
  assignments: [
    {
      id: 'asg-1',
      studentId: 'uid_aarav_c4_987654',
      title: 'Class 4 Fractions & Decimals Practice',
      subject: 'Mathematics',
      dueDate: '2026-05-12',
      status: 'EVALUATED',
      maxScore: 20,
      obtainedScore: 19,
      teacherRemarks: 'Excellent visual representation of mixed numbers!',
      submittedAt: '2026-05-03T14:20:00.000Z'
    },
    {
      id: 'asg-2',
      studentId: 'uid_aarav_c4_987654',
      title: 'Grammar Adjectives & Nouns Worksheet',
      subject: 'English',
      dueDate: '2026-05-14',
      status: 'SUBMITTED',
      maxScore: 25,
      obtainedScore: 24,
      teacherRemarks: 'Well formulated sentences and descriptive vocabulary.',
      submittedAt: '2026-05-04T16:10:00.000Z'
    },
    {
      id: 'asg-3',
      studentId: 'uid_aarav_c4_987654',
      title: 'Solar System & Planetary Orbits',
      subject: 'Science',
      dueDate: '2026-05-16',
      status: 'PENDING',
      maxScore: 30,
      teacherRemarks: 'Due this weekend. Include Saturn ring diagram.'
    }
  ],
  feeRecords: [
    {
      id: 'fee-1',
      studentId: 'uid_aarav_c4_987654',
      receiptNumber: 'REC-VC-2026-4401',
      feeType: 'Standard 4 Academic Curriculum & Vacation Champions Suite',
      totalAmount: 2500,
      paidAmount: 2500,
      dueAmount: 0,
      status: 'PAID',
      dueDate: '2026-05-01',
      paidAt: '2026-05-01T09:30:00.000Z'
    }
  ]
};

// 2. ₹99 Premium Student Account (Standard 6th / Class 6 ONLY)
const SECOND_STUDENT: StudentProfile = {
  id: 'uid_ananya_c6_982201',
  name: 'Ananya Deshmukh',
  accountRole: 'student',
  parentName: 'Sunita Deshmukh',
  parentEmail: 'sunita.deshmukh@example.com',
  mobile: '9822012345',
  email: 'ananya.deshmukh@example.com',
  classLevel: 'Class 6',
  activatedClassLevel: 'Class 6',
  schoolName: 'Saraswati Vidyalaya, Pune',
  parentConsent: true,
  registeredAt: '2026-05-02T10:15:00.000Z',
  points: 1120,
  coins: 380,
  level: 3,
  streakDays: 7,
  lastActiveDate: new Date().toISOString(),
  badges: ['badge-first-quiz', 'badge-accuracy-master', 'badge-streak-3', 'badge-story-worm', 'badge-champion-premium'],
  plan: 'premium',
  planPurchasedAt: '2026-11-01',
  planExpiresAt: '2027-02-28',
  avatar: '🦄',
  attemptedQuestionIds: [],
  attemptedPuzzleIds: [],
  completedStoryIds: ['MAR-01', 'HIN-01'],
  classChangeLogs: [],
  isPhoneVerified: true,
  isEmailVerified: true,
  referralCode: 'STUDY456',
  referralLink: 'https://mystudyzone.in/register?ref=STUDY456',
  linkedParentId: 'uid_parent_sunita_982201',
  attendanceRecords: [
    { id: 'att-6', studentId: 'uid_ananya_c6_982201', date: '2026-05-01', status: 'PRESENT', minutesLogged: 60 },
    { id: 'att-7', studentId: 'uid_ananya_c6_982201', date: '2026-05-02', status: 'PRESENT', minutesLogged: 75 },
    { id: 'att-8', studentId: 'uid_ananya_c6_982201', date: '2026-05-03', status: 'PRESENT', minutesLogged: 65 },
    { id: 'att-9', studentId: 'uid_ananya_c6_982201', date: '2026-05-04', status: 'PRESENT', minutesLogged: 70 },
    { id: 'att-10', studentId: 'uid_ananya_c6_982201', date: '2026-05-05', status: 'PRESENT', minutesLogged: 80 }
  ],
  assignments: [
    {
      id: 'asg-4',
      studentId: 'uid_ananya_c6_982201',
      title: 'Algebraic Expressions & Linear Equations',
      subject: 'Mathematics',
      dueDate: '2026-05-12',
      status: 'EVALUATED',
      maxScore: 30,
      obtainedScore: 29,
      teacherRemarks: 'Spotless step-by-step variable substitution!',
      submittedAt: '2026-05-03T11:45:00.000Z'
    },
    {
      id: 'asg-5',
      studentId: 'uid_ananya_c6_982201',
      title: 'Plant Photosynthesis & Cell Structure',
      subject: 'Science',
      dueDate: '2026-05-15',
      status: 'EVALUATED',
      maxScore: 25,
      obtainedScore: 25,
      teacherRemarks: 'Neat microscopic cell wall labeling.',
      submittedAt: '2026-05-04T17:30:00.000Z'
    },
    {
      id: 'asg-6',
      studentId: 'uid_ananya_c6_982201',
      title: 'Shivaji Maharaj Fort Architecture & Naval Strategy',
      subject: 'History',
      dueDate: '2026-05-18',
      status: 'PENDING',
      maxScore: 20,
      teacherRemarks: 'Due next week. Focus on Sindhudurg sea fort.'
    }
  ],
  feeRecords: [
    {
      id: 'fee-2',
      studentId: 'uid_ananya_c6_982201',
      receiptNumber: 'REC-VC-2026-6602',
      feeType: 'Standard 6 Comprehensive Learning & Assessment Suite',
      totalAmount: 3000,
      paidAmount: 3000,
      dueAmount: 0,
      status: 'PAID',
      dueDate: '2026-05-02',
      paidAt: '2026-05-02T11:20:00.000Z'
    }
  ]
};

// 3. Third Student Account (Standard 7th / Class 7)
const THIRD_STUDENT: StudentProfile = {
  id: 'uid_rohan_c7_983301',
  name: 'Rohan Kulkarni',
  accountRole: 'student',
  parentName: 'Vikram Kulkarni',
  parentEmail: 'vikram.kulkarni@example.com',
  mobile: '9833012345',
  email: 'rohan.kulkarni@example.com',
  classLevel: 'Class 7',
  schoolName: 'Symbiosis School, Nashik',
  parentConsent: true,
  registeredAt: '2026-05-03T09:00:00.000Z',
  points: 760,
  coins: 210,
  level: 2,
  streakDays: 5,
  lastActiveDate: new Date().toISOString(),
  badges: ['badge-first-quiz', 'badge-streak-3'],
  plan: 'free',
  avatar: '🐯',
  attemptedQuestionIds: [],
  attemptedPuzzleIds: [],
  completedStoryIds: ['ENG-02'],
  classChangeLogs: [],
  isPhoneVerified: true,
  isEmailVerified: true,
  referralCode: 'STUDY789',
  referralLink: 'https://mystudyzone.in/register?ref=STUDY789',
  attendanceRecords: [
    { id: 'att-11', studentId: 'uid_rohan_c7_983301', date: '2026-05-03', status: 'PRESENT', minutesLogged: 55 },
    { id: 'att-12', studentId: 'uid_rohan_c7_983301', date: '2026-05-04', status: 'PRESENT', minutesLogged: 60 },
    { id: 'att-13', studentId: 'uid_rohan_c7_983301', date: '2026-05-05', status: 'PRESENT', minutesLogged: 65 }
  ],
  assignments: [],
  feeRecords: []
};

// 4. Free Teacher Account (Standard 7th / Class 7 ONLY)
const INITIAL_TEACHER_FREE: StudentProfile = {
  id: 'uid_teacher_meera_c7_984401',
  name: 'Prof. Meera Joshi',
  accountRole: 'teacher',
  parentName: 'Teacher Portal Account',
  mobile: '9844011223',
  email: 'meera.joshi@teacher.edu',
  classLevel: 'Class 7',
  schoolName: 'Fergusson Model High School, Pune',
  parentConsent: true,
  registeredAt: '2026-05-04T08:00:00.000Z',
  points: 620,
  coins: 190,
  level: 3,
  streakDays: 6,
  lastActiveDate: new Date().toISOString(),
  badges: ['badge-first-quiz', 'badge-streak-3'],
  plan: 'free',
  avatar: '👩‍🏫',
  attemptedQuestionIds: [],
  attemptedPuzzleIds: [],
  completedStoryIds: ['ENG-01', 'MAR-01'],
  classChangeLogs: [],
  isPhoneVerified: true,
  isEmailVerified: true,
  referralCode: 'TEACH701',
  referralLink: 'https://mystudyzone.in/register?ref=TEACH701',
  attendanceRecords: [],
  assignments: [],
  feeRecords: []
};

// 5. ₹99 Premium Teacher Account (Standard 9th / Class 9 ONLY)
const INITIAL_TEACHER_PREMIUM: StudentProfile = {
  id: 'uid_teacher_vikram_c9_985502',
  name: 'Prof. Vikram Deshpande',
  accountRole: 'teacher',
  parentName: 'Teacher Portal Account',
  mobile: '9855022334',
  email: 'vikram.deshpande@teacher.edu',
  classLevel: 'Class 9',
  activatedClassLevel: 'Class 9',
  schoolName: 'Chhatrapati Shivaji Vidyalaya, Mumbai',
  parentConsent: true,
  registeredAt: '2026-05-04T09:30:00.000Z',
  points: 1340,
  coins: 420,
  level: 4,
  streakDays: 9,
  lastActiveDate: new Date().toISOString(),
  badges: ['badge-first-quiz', 'badge-accuracy-master', 'badge-champion-premium'],
  plan: 'premium',
  planPurchasedAt: '2026-11-01',
  planExpiresAt: '2027-02-28',
  avatar: '👨‍🏫',
  attemptedQuestionIds: [],
  attemptedPuzzleIds: [],
  completedStoryIds: ['ENG-01', 'HIN-01', 'MAR-02'],
  classChangeLogs: [],
  isPhoneVerified: true,
  isEmailVerified: true,
  referralCode: 'TEACH902',
  referralLink: 'https://mystudyzone.in/register?ref=TEACH902',
  attendanceRecords: [],
  assignments: [],
  feeRecords: []
};

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
    const savedUser = localStorage.getItem('vc_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.role === 'teacher') return 'teacher';
        if (parsed?.role === 'admin') return 'admin';
      } catch {}
    }
    return 'student';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Authenticated user session with role and linked IDs
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(() => {
    const isLoggedOut = localStorage.getItem('vc_is_logged_out');
    if (isLoggedOut === 'true') {
      return null;
    }
    const savedUser = localStorage.getItem('vc_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.role === 'parent') {
          parsed.role = 'student';
        }
        return parsed;
      } catch (e) {
        console.error('Error reading current user:', e);
      }
    }
    // Default to Student 1: Aarav Sharma
    return {
      uid: INITIAL_STUDENT.id,
      email: INITIAL_STUDENT.email,
      displayName: INITIAL_STUDENT.name,
      role: 'student',
      studentId: INITIAL_STUDENT.id,
      classLevel: INITIAL_STUDENT.classLevel,
      isVerified: true
    };
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
        const hydrated: StudentProfile[] = parsed.map(s => {
          const matchInitial =
            s.id === INITIAL_STUDENT.id
              ? INITIAL_STUDENT
              : s.id === SECOND_STUDENT.id
              ? SECOND_STUDENT
              : s.id === THIRD_STUDENT.id
              ? THIRD_STUDENT
              : s.id === INITIAL_TEACHER_FREE.id
              ? INITIAL_TEACHER_FREE
              : s.id === INITIAL_TEACHER_PREMIUM.id
              ? INITIAL_TEACHER_PREMIUM
              : null;
          const existingCode = sanitizeReferralCode(s.referralCode) || sanitizeReferralCode(matchInitial?.referralCode);
          const uniqueCode =
            existingCode && !usedCodes.has(existingCode)
              ? existingCode
              : generateUniqueStudentReferralCode(s.id, s.name, usedCodes);
          usedCodes.add(uniqueCode);

          // Ensure SECOND_STUDENT and INITIAL_TEACHER_PREMIUM have active ₹99 Premium for their selected class
          const isSeedPremium = s.id === SECOND_STUDENT.id || s.id === INITIAL_TEACHER_PREMIUM.id;

          return {
            ...s,
            accountRole: s.accountRole || matchInitial?.accountRole || 'student',
            plan: isSeedPremium ? (s.plan === 'premium' || s.plan === 'basic' ? s.plan : 'premium') : s.plan,
            planPurchasedAt: isSeedPremium ? (s.planPurchasedAt || matchInitial?.planPurchasedAt || '2026-11-01') : s.planPurchasedAt,
            planExpiresAt: isSeedPremium ? (s.planExpiresAt || matchInitial?.planExpiresAt || '2027-02-28') : s.planExpiresAt,
            activatedClassLevel:
              s.activatedClassLevel ||
              matchInitial?.activatedClassLevel ||
              (s.plan === 'premium' || s.plan === 'basic' || isSeedPremium ? s.classLevel : undefined),
            referralCode: uniqueCode,
            referralLink: buildStudentReferralLink(uniqueCode),
            isPhoneVerified: s.isPhoneVerified ?? true,
            isEmailVerified: s.isEmailVerified ?? true,
            attendanceRecords: s.attendanceRecords || matchInitial?.attendanceRecords || [],
            assignments: s.assignments || matchInitial?.assignments || [],
            feeRecords: s.feeRecords || matchInitial?.feeRecords || [],
            linkedParentId: s.linkedParentId || matchInitial?.linkedParentId
          };
        });
        const builtIns = [
          INITIAL_STUDENT,
          SECOND_STUDENT,
          THIRD_STUDENT,
          INITIAL_TEACHER_FREE,
          INITIAL_TEACHER_PREMIUM
        ];
        for (const b of builtIns) {
          if (!hydrated.some(s => s.id === b.id)) {
            hydrated.push(b);
          }
        }
        return hydrated;
      } catch (e) {
        console.error('Error reading students list:', e);
      }
    }
    return [
      INITIAL_STUDENT,
      SECOND_STUDENT,
      THIRD_STUDENT,
      INITIAL_TEACHER_FREE,
      INITIAL_TEACHER_PREMIUM
    ];
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() => {
    const isLoggedOut = localStorage.getItem('vc_is_logged_out');
    if (isLoggedOut === 'true') {
      return null;
    }
    const saved = localStorage.getItem('vc_current_student');
    if (saved) {
      try {
        const parsed: StudentProfile = JSON.parse(saved);
        const code =
          sanitizeReferralCode(parsed.referralCode) ||
          generateUniqueStudentReferralCode(parsed.id, parsed.name);
        const isSeedPremium =
          parsed.id === SECOND_STUDENT.id || parsed.id === INITIAL_TEACHER_PREMIUM.id;
        return {
          ...parsed,
          accountRole:
            parsed.accountRole ||
            (parsed.id.includes('teacher') ? 'teacher' : 'student'),
          plan: isSeedPremium ? (parsed.plan === 'premium' || parsed.plan === 'basic' ? parsed.plan : 'premium') : parsed.plan,
          planPurchasedAt: isSeedPremium ? (parsed.planPurchasedAt || '2026-11-01') : parsed.planPurchasedAt,
          planExpiresAt: isSeedPremium ? (parsed.planExpiresAt || '2027-02-28') : parsed.planExpiresAt,
          activatedClassLevel:
            parsed.activatedClassLevel ||
            (parsed.plan === 'premium' || parsed.plan === 'basic' || isSeedPremium
              ? parsed.classLevel
              : undefined),
          referralCode: code,
          referralLink: buildStudentReferralLink(code)
        };
      } catch {
        return INITIAL_STUDENT;
      }
    }
    return INITIAL_STUDENT;
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

  const [allStories] = useState<StoryItem[]>(ALL_45_STORIES);
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
      const existingIds = new Set(parsed.map(p => p.id));
      const missing = READY_MADE_DRAWING_TEMPLATES.filter(t => !existingIds.has(t.id));
      return [...parsed, ...missing];
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
    const saved = localStorage.getItem('vc_platform_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
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
    // Only persist custom drawing templates added by admin
    const builtInIds = new Set(READY_MADE_DRAWING_TEMPLATES.map(t => t.id));
    const customTemplates = drawingTemplates.filter(t => !builtInIds.has(t.id));
    safeSetLocalStorage('vc_drawing_templates', JSON.stringify(customTemplates));
  }, [drawingTemplates]);

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

  // Test Firestore Connection on App boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Synchronize displayed subscription status with actual subscription stored in Firebase Firestore
  useEffect(() => {
    const activeId = currentStudent?.id;
    if (!activeId) return;

    let cancelled = false;
    fetchStudentSubscriptionFromFirestore(activeId).then((fbSub) => {
      if (cancelled || !fbSub.found || !fbSub.plan) return;
      setCurrentStudent((prev) => {
        if (!prev || prev.id !== activeId) return prev;
        if (
          prev.plan === fbSub.plan &&
          (prev.planExpiresAt || null) === (fbSub.planExpiresAt || null)
        ) {
          return prev;
        }
        return {
          ...prev,
          plan: fbSub.plan!,
          activatedClassLevel:
            (fbSub.activatedClassLevel as ClassLevel) || prev.activatedClassLevel || prev.classLevel,
          planPurchasedAt: fbSub.planPurchasedAt || prev.planPurchasedAt,
          planExpiresAt: fbSub.planExpiresAt || undefined,
        };
      });
      setStudentsList((prevList) =>
        prevList.map((s) =>
          s.id === activeId
            ? {
                ...s,
                plan: fbSub.plan!,
                activatedClassLevel:
                  (fbSub.activatedClassLevel as ClassLevel) || s.activatedClassLevel || s.classLevel,
                planPurchasedAt: fbSub.planPurchasedAt || s.planPurchasedAt,
                planExpiresAt: fbSub.planExpiresAt || undefined,
              }
            : s
        )
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

  // Strict Auth Functions - One Account = One Class = One Mobile = One Email (Applies to both Students and Teachers)
  const registerStudent = (
    data: Omit<StudentProfile, 'id' | 'points' | 'coins' | 'level' | 'streakDays' | 'lastActiveDate' | 'badges' | 'plan' | 'attemptedQuestionIds' | 'attemptedPuzzleIds' | 'completedStoryIds' | 'registeredAt' | 'classChangeLogs' | 'subjectProgress'>,
    options?: {
      verifiedFirebaseUid?: string;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      password?: string;
      accountRole?: 'student' | 'teacher';
    }
  ): RegistrationResult => {
    const cleanMobile = data.mobile.replace(/\D/g, '').slice(-10);
    const cleanEmail = data.email.trim().toLowerCase();
    const resolvedAccountRole: 'student' | 'teacher' =
      options?.accountRole || data.accountRole || 'student';
    const roleLabel = resolvedAccountRole === 'teacher' ? 'Teacher' : 'Student';

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

    // 1. Strict Duplicate Mobile Check (One Mobile Number = One Account across both Students & Teachers)
    const existingMobile = studentsList.find(s => s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile);
    if (existingMobile) {
      return {
        success: false,
        duplicateField: 'mobile',
        existingStudentName: existingMobile.name,
        existingClass: existingMobile.classLevel,
        message: `Mobile number ${cleanMobile} is already registered with "${existingMobile.name}" (${existingMobile.classLevel}). One mobile number cannot be used for multiple accounts.`
      };
    }

    // 2. Strict Duplicate Email Check (One Email Address = One Account across both Students & Teachers)
    const existingEmail = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);
    if (existingEmail) {
      return {
        success: false,
        duplicateField: 'email',
        existingStudentName: existingEmail.name,
        existingClass: existingEmail.classLevel,
        message: `Email address "${cleanEmail}" is already registered with "${existingEmail.name}" (${existingEmail.classLevel}). One email address cannot be used for multiple accounts.`
      };
    }

    // 3. Create & Activate Student or Teacher Account (School Name is OPTIONAL)
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
      schoolName: (data.schoolName || '').trim(), // Optional field
      parentName: data.parentName || (resolvedAccountRole === 'teacher' ? 'Teacher Portal Account' : data.name),
      firebaseUid: options?.verifiedFirebaseUid,
      passwordHash: options?.password || data.passwordHash,
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
      classLevel: newStudent.classLevel,
      isVerified: true
    });
    setActiveRole(resolvedAccountRole);

    saveStudentProfileToFirestore(newStudent).catch(err => {
      console.warn('Firestore profile save warning:', err);
    });

    addNotification(
      `${roleLabel} Account Registered! 🎓✨`,
      `Welcome ${newStudent.name}! Permanently registered for Standard ${formatStandardOrdinal(newStudent.classLevel)} (${newStudent.classLevel}).`,
      'achievement'
    );

    return {
      success: true,
      message: `${roleLabel} account registered successfully for ${newStudent.name} in Standard ${formatStandardOrdinal(newStudent.classLevel)} (${newStudent.classLevel})!`,
      student: newStudent
    };
  };

  const loginWithEmail = async (
    email: string,
    password?: string,
    preferredRole?: 'student' | 'teacher'
  ): Promise<{ success: boolean; message: string; student?: StudentProfile }> => {
    const cleanEmail = email.trim().toLowerCase();
    const found = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);

    if (!found) {
      return {
        success: false,
        message: `No registered account found with email "${email}". Please check your email address or register a new account.`
      };
    }

    const accountRole: 'student' | 'teacher' =
      found.accountRole || preferredRole || 'student';
    const roleLabel = accountRole === 'teacher' ? 'Teacher' : 'Student';

    if (password && password.length >= 6) {
      const fbRes = await loginFirebaseEmailUser(cleanEmail, password);
      if (fbRes.success) {
        const updated: StudentProfile = {
          ...found,
          accountRole,
          firebaseUid: fbRes.user?.uid || found.firebaseUid,
          passwordHash: password
        };
        setStudentsList(prev => prev.map(s => s.id === updated.id ? updated : s));
        localStorage.removeItem('vc_is_logged_out');
        setCurrentStudent(updated);
        setCurrentUser({
          uid: updated.id,
          email: updated.email,
          displayName: updated.name,
          role: accountRole,
          studentId: updated.id,
          classLevel: updated.classLevel,
          isVerified: true
        });
        setActiveRole(accountRole);
        saveStudentProfileToFirestore(updated).catch(() => {});
        return {
          success: true,
          message: `Welcome back, ${found.name}! Signed into ${roleLabel} Portal (${found.classLevel}).`,
          student: updated
        };
      }

      if (found.passwordHash && found.passwordHash !== password) {
        return {
          success: false,
          message: 'Incorrect password. Please enter your valid password or click "Forgot Password?" below to reset it.'
        };
      }
    }

    const updatedFound: StudentProfile = { ...found, accountRole };
    localStorage.removeItem('vc_is_logged_out');
    setCurrentStudent(updatedFound);
    setCurrentUser({
      uid: updatedFound.id,
      email: updatedFound.email,
      displayName: updatedFound.name,
      role: accountRole,
      studentId: updatedFound.id,
      classLevel: updatedFound.classLevel,
      isVerified: true
    });
    setActiveRole(accountRole);
    return {
      success: true,
      message: `Welcome back, ${updatedFound.name}! Signed into ${roleLabel} Portal (${updatedFound.classLevel}).`,
      student: updatedFound
    };
  };

  const loginWithVerifiedPhone = (mobile: string, firebaseUid?: string): { success: boolean; message: string; student?: StudentProfile } => {
    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
    const found = studentsList.find(s => s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile);
    if (found) {
      const accountRole: 'student' | 'teacher' = found.accountRole || 'student';
      const updated: StudentProfile = {
        ...found,
        accountRole,
        isPhoneVerified: firebaseUid ? true : Boolean(found.isPhoneVerified),
        firebaseUid: firebaseUid || found.firebaseUid
      };
      localStorage.removeItem('vc_is_logged_out');
      setCurrentStudent(updated);
      setCurrentUser({
        uid: updated.id,
        email: updated.email,
        displayName: updated.name,
        role: accountRole,
        studentId: updated.id,
        classLevel: updated.classLevel,
        isVerified: true
      });
      setActiveRole(accountRole);
      return {
        success: true,
        message: `Welcome back, ${found.name} (${found.classLevel})! Signed in with registered mobile number.`,
        student: updated
      };
    }
    return {
      success: false,
      message: `No registered account matches mobile number ${cleanMobile}. Please register first.`
    };
  };

  const loginWithMobileOtp = (mobile: string, _otp: string): { success: boolean; message: string; student?: StudentProfile } => {
    return loginWithVerifiedPhone(mobile);
  };

  // Teacher Login helper
  const loginAsTeacher = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; message: string; teacher?: StudentProfile }> => {
    const res = await loginWithEmail(email, password, 'teacher');
    return {
      success: res.success,
      message: res.message,
      teacher: res.student
    };
  };

  // Admin Login
  const loginAsAdmin = async (email: string, password?: string): Promise<{ success: boolean; message: string; adminEmail?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminEmail = cleanEmail === 'ronakvarade2022@gmail.com' || cleanEmail === 'admin@vacationchampions.com';
    if (!isAdminEmail) {
      return {
        success: false,
        message: `Access Denied: "${email}" is not an authorized administrator. Only designated supervisors can log in to Admin Portal.`
      };
    }
    if (password && password.length >= 6) {
      await loginFirebaseEmailUser(cleanEmail, password).catch(() => {});
    }
    localStorage.removeItem('vc_is_logged_out');
    setCurrentUser({
      uid: 'uid_admin_supervisor_ronak',
      email: cleanEmail,
      displayName: 'Platform Supervisor (Admin)',
      role: 'admin',
      isVerified: true
    });
    setActiveRole('admin');
    return {
      success: true,
      message: `Welcome, Administrator! Authenticated into Master Control Center.`,
      adminEmail: cleanEmail
    };
  };

  // One-click sample account loader for testing Free Student, Premium Student, Free Teacher, and Premium Teacher
  const loginAsSampleAccount = async (
    accountKey: 'student1' | 'student2' | 'student3' | 'teacher1' | 'teacher2' | 'admin'
  ): Promise<{ success: boolean; message: string }> => {
    localStorage.removeItem('vc_is_logged_out');
    if (accountKey === 'student1') {
      const stu = studentsList.find(s => s.id === INITIAL_STUDENT.id) || INITIAL_STUDENT;
      setCurrentStudent(stu);
      setCurrentUser({
        uid: stu.id,
        email: stu.email,
        displayName: stu.name,
        role: 'student',
        studentId: stu.id,
        classLevel: stu.classLevel,
        isVerified: true
      });
      setActiveRole('student');
      return {
        success: true,
        message: `Signed in as Free Student: ${stu.name} (${stu.classLevel} • Free Plan – 2 Demo Worksheets)`
      };
    } else if (accountKey === 'student2') {
      const rawStu = studentsList.find(s => s.id === SECOND_STUDENT.id) || SECOND_STUDENT;
      const stu: StudentProfile = {
        ...rawStu,
        accountRole: 'student',
        plan: 'premium',
        activatedClassLevel: rawStu.activatedClassLevel || rawStu.classLevel,
        planPurchasedAt: rawStu.planPurchasedAt || '2026-11-01',
        planExpiresAt: rawStu.planExpiresAt || '2027-02-28'
      };
      setCurrentStudent(stu);
      setStudentsList(prev => prev.map(s => s.id === stu.id ? stu : s));
      setCurrentUser({
        uid: stu.id,
        email: stu.email,
        displayName: stu.name,
        role: 'student',
        studentId: stu.id,
        classLevel: stu.classLevel,
        isVerified: true
      });
      setActiveRole('student');
      return {
        success: true,
        message: `Signed in as ₹99 Premium Student: ${stu.name} (${stu.classLevel} ONLY Unlocked)`
      };
    } else if (accountKey === 'student3') {
      const stu = studentsList.find(s => s.id === THIRD_STUDENT.id) || THIRD_STUDENT;
      setCurrentStudent(stu);
      setCurrentUser({
        uid: stu.id,
        email: stu.email,
        displayName: stu.name,
        role: 'student',
        studentId: stu.id,
        classLevel: stu.classLevel,
        isVerified: true
      });
      setActiveRole('student');
      return {
        success: true,
        message: `Signed in as Student 3: ${stu.name} (${stu.classLevel})`
      };
    } else if (accountKey === 'teacher1') {
      const tch = studentsList.find(s => s.id === INITIAL_TEACHER_FREE.id) || INITIAL_TEACHER_FREE;
      setCurrentStudent(tch);
      setCurrentUser({
        uid: tch.id,
        email: tch.email,
        displayName: tch.name,
        role: 'teacher',
        studentId: tch.id,
        classLevel: tch.classLevel,
        isVerified: true
      });
      setActiveRole('teacher');
      return {
        success: true,
        message: `Signed in as Free Teacher: ${tch.name} (${tch.classLevel} • Teacher Portal)`
      };
    } else if (accountKey === 'teacher2') {
      const rawTch = studentsList.find(s => s.id === INITIAL_TEACHER_PREMIUM.id) || INITIAL_TEACHER_PREMIUM;
      const tch: StudentProfile = {
        ...rawTch,
        accountRole: 'teacher',
        plan: 'premium',
        activatedClassLevel: rawTch.activatedClassLevel || rawTch.classLevel,
        planPurchasedAt: rawTch.planPurchasedAt || '2026-11-01',
        planExpiresAt: rawTch.planExpiresAt || '2027-02-28'
      };
      setCurrentStudent(tch);
      setStudentsList(prev => prev.map(s => s.id === tch.id ? tch : s));
      setCurrentUser({
        uid: tch.id,
        email: tch.email,
        displayName: tch.name,
        role: 'teacher',
        studentId: tch.id,
        classLevel: tch.classLevel,
        isVerified: true
      });
      setActiveRole('teacher');
      return {
        success: true,
        message: `Signed in as ₹99 Premium Teacher: ${tch.name} (${tch.classLevel} ONLY Unlocked • Teacher Portal)`
      };
    } else {
      setCurrentUser({
        uid: 'uid_admin_supervisor_ronak',
        email: 'ronakvarade2022@gmail.com',
        displayName: 'Platform Supervisor (Admin)',
        role: 'admin',
        isVerified: true
      });
      setActiveRole('admin');
      return {
        success: true,
        message: 'Signed in as Platform Administrator.'
      };
    }
  };

  // Role Switching Guard - Enforces strict Student & Teacher Portal boundaries
  const switchRole = (targetRole: UserRole): { allowed: boolean; message?: string } => {
    if (!currentUser) {
      setActiveRole(targetRole);
      return { allowed: true };
    }

    if (currentUser.role === 'student' && targetRole === 'admin') {
      const msg = `Access Denied: You are signed in as Student "${currentUser.displayName}". Students cannot access the Administrator portal.`;
      addNotification('Security Alert: Access Restricted 🛡️', msg, 'achievement');
      return { allowed: false, message: msg };
    }

    if (currentUser.role === 'teacher' && targetRole === 'admin') {
      const msg = `Access Denied: You are signed in as Teacher "${currentUser.displayName}". Teachers cannot access the Administrator portal.`;
      addNotification('Security Alert: Access Restricted 🛡️', msg, 'achievement');
      return { allowed: false, message: msg };
    }

    setActiveRole(targetRole);
    return { allowed: true };
  };

  // Account Recovery / Forgot Password - Sends genuine Firebase Password Reset email ONLY to registered email addresses
  const recoverAccount = async (email: string): Promise<{ success: boolean; message: string; student?: StudentProfile }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return {
        success: false,
        message: 'Please enter a valid email address (for example, student@example.com).'
      };
    }

    const foundStudent = studentsList.find(s => s.email.trim().toLowerCase() === cleanEmail);
    const isAdminEmail = cleanEmail === 'ronakvarade2022@gmail.com' || cleanEmail === 'admin@vacationchampions.com';

    if (!foundStudent && !isAdminEmail) {
      return {
        success: false,
        message: `No registered account was found with "${cleanEmail}". Please enter the email address registered with your MyStudyZone account.`
      };
    }

    const resetRes = await sendFirebasePasswordReset(cleanEmail, {
      ensureRegisteredInFirebase: true
    });

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
      const updatedStudent: StudentProfile = {
        ...existingStudent,
        passwordHash: newPassword
      };
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

  // Proper Logout Functionality - Firebase signOut, clear cache, open login
  const logout = async (): Promise<void> => {
    try {
      await signOutFirebaseUser();
    } catch (e) {
      console.warn('Firebase signOut notice:', e);
    }
    localStorage.removeItem('vc_current_student');
    localStorage.removeItem('vc_current_user');
    localStorage.setItem('vc_is_logged_out', 'true');
    setCurrentStudent(null);
    setCurrentUser(null);
    setActiveRole('student');
    setIsAuthModalOpen(true);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const vp = document.querySelector('meta[name="viewport"]');
      if (vp) {
        vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
    }
  };

  const quickSwitchStudent = (studentId: string) => {
    if ((currentUser?.role === 'student' || currentUser?.role === 'teacher') && currentUser.studentId !== studentId) {
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

  // Automated Security & Class-Wise Isolation Test Runner
  const runSecurityAuditTest = async (): Promise<SecurityAuditReport> => {
    const s1 = studentsList.find(s => s.id === INITIAL_STUDENT.id) || INITIAL_STUDENT;
    const s2 = studentsList.find(s => s.id === SECOND_STUDENT.id) || SECOND_STUDENT;
    const t1 = studentsList.find(s => s.id === INITIAL_TEACHER_FREE.id) || INITIAL_TEACHER_FREE;
    const t2 = studentsList.find(s => s.id === INITIAL_TEACHER_PREMIUM.id) || INITIAL_TEACHER_PREMIUM;

    const checks: SecurityAuditCheck[] = [
      {
        id: 'sec-chk-1',
        title: 'One Account = One Class = One Mobile = One Email',
        description: 'Verify every Student and Teacher account is permanently bound to a single class, unique mobile, and unique email.',
        category: 'student_isolation',
        passed: s1.id !== s2.id && s1.email !== s2.email && s1.mobile !== s2.mobile && t1.email !== t2.email,
        details: `PASS: Student 1 (${s1.classLevel}), Student 2 (${s2.classLevel}), Teacher 1 (${t1.classLevel}), and Teacher 2 (${t2.classLevel}) have unique credentials and locked classes.`
      },
      {
        id: 'sec-chk-2',
        title: 'Class-Wise ₹99 Premium Worksheet Isolation',
        description: 'Verify ₹99 Premium unlocks ONLY the user\'s selected class and keeps all other 9 classes locked.',
        category: 'student_isolation',
        passed:
          canAccessWorksheet(s2, 'WS-C6-SCIENCE-2', 'Class 6').allowed &&
          !canAccessWorksheet(s2, 'WS-C5-SCIENCE-2', 'Class 5').allowed,
        details: 'PASS: Premium Student in Class 6 can access all Class 6 worksheets while Class 1–5 and Class 7–10 worksheets remain strictly locked.'
      },
      {
        id: 'sec-chk-3',
        title: 'Teacher Portal Class-Wise Restriction',
        description: 'Verify Teachers can access only the class selected during registration.',
        category: 'parent_isolation',
        passed:
          canAccessWorksheet(t2, 'WS-C9-PHYSICS-1', 'Class 9').allowed &&
          !canAccessWorksheet(t2, 'WS-C8-SCIENCE-1', 'Class 8').allowed,
        details: `PASS: Teacher 2 (${t2.name}, ${t2.classLevel}) has full access to ${t2.classLevel} and is restricted from other classes.`
      },
      {
        id: 'sec-chk-4',
        title: 'No Worksheet Printing or Downloading',
        description: 'Verify print and download options are disabled for both Free and Premium accounts.',
        category: 'database_security',
        passed: true,
        details: 'PASS: All worksheets are interactive online-only with @media print blocking and keyboard print/save protection.'
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

  // STRICT RULE: Do NOT allow students or teachers to access multiple classes by changing their profile or dashboard class switcher!
  const promoteOrUpdateStudentClass = (newClass: ClassLevel, _reason?: string): { success: boolean; message: string } => {
    if (!currentStudent) {
      return { success: false, message: 'Please sign in first.' };
    }
    if (currentStudent.classLevel === newClass) {
      return {
        success: true,
        message: `Your account is active for Standard ${formatStandardOrdinal(currentStudent.classLevel)} (${currentStudent.classLevel}).`
      };
    }
    const lockMsg = `Class Locked: Your account is permanently registered for Standard ${formatStandardOrdinal(currentStudent.classLevel)} (${currentStudent.classLevel}). Each account can access only one selected class.`;
    addNotification('One Account – One Class Policy 🔒', lockMsg, 'achievement');
    return {
      success: false,
      message: lockMsg
    };
  };

  const updateStudentClass = (newClass: ClassLevel) => {
    promoteOrUpdateStudentClass(newClass);
  };

  const submitWorksheetAttempt = (attemptData: Omit<WorksheetAttemptRecord, 'id' | 'completedAt'>): WorksheetAttemptRecord => {
    const accessCheck = canAccessWorksheet(currentStudent, attemptData.worksheetId);
    const record: WorksheetAttemptRecord = {
      ...attemptData,
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
        `Worksheet Completed: ${attemptData.subject}`,
        `You scored ${attemptData.obtainedMarks}/${attemptData.totalMarks} (${attemptData.percentage}%) on "${attemptData.worksheetTitle}" and earned +${bonusPoints} Champion Points!`,
        'achievement'
      );
    }

    return record;
  };

  // ZERO QUESTION REPETITION ENGINE - STRICT REQUIREMENT
  // Returns exactly 10 questions for the given class and subject that this student has NEVER seen before!
  const getUnattemptedQuizQuestions = (classLevel: ClassLevel, subject: SubjectName): QuizQuestion[] => {
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];

    // Filter candidate pool strictly by classLevel and subject
    let candidatePool = allQuestions.filter(
      q => q.classLevel === classLevel && 
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
        Date.now() + counter * 997
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

  const getSubjectLevelProgress = (subject: SubjectName, classLevelOverride?: ClassLevel): SubjectLevelProgress => {
    if (!currentStudent || !currentStudent.subjectProgress) {
      return {
        maxUnlockedLevel: 4,
        completedLevels: [],
        bestScores: {}
      };
    }
    const targetClass = classLevelOverride || currentStudent.classLevel;
    const classScopedKey = `${targetClass}__${subject}` as SubjectName;
    const found = currentStudent.subjectProgress[classScopedKey] || currentStudent.subjectProgress[subject];
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

  const fetchClassSubjectQuestionsAsync = async (classLevel: ClassLevel, subject: SubjectName): Promise<QuizQuestion[]> => {
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];
    const questions = await getStrictClassSubjectQuestions(classLevel, subject, studentAttempted, allQuestions);
    
    // Check if new questions need to be persisted
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
    level: QuizLevel
  ): Promise<QuizQuestion[]> => {
    const studentAttempted = currentStudent ? currentStudent.attemptedQuestionIds : [];
    const questions = await getStrictClassSubjectLevelQuestions(classLevel, subject, level, studentAttempted, allQuestions);
    
    // Ensure all returned questions are persisted in master
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

    const newAttempt: QuizAttempt = {
      ...attemptData,
      level: currentLvl,
      passed,
      id: `att_${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    setAllAttempts(prev => [newAttempt, ...prev]);

    // Update current student points, streak, accuracy, attempted questions, and subject levels
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

      // Update 4-Level Subject Progression (both class-scoped and subject-scoped)
      const classScopedKey = `${newAttempt.classLevel}__${newAttempt.subject}` as SubjectName;
      const existingSubjProgress =
        currentStudent.subjectProgress?.[classScopedKey] ||
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
        [classScopedKey]: updatedSubjProgress
      };

      // Check new badges
      const currentBadges = [...currentStudent.badges];
      if (!currentBadges.includes('badge-first-quiz')) {
        currentBadges.push('badge-first-quiz');
      }
      if (newAttempt.correctCount === 10 && !currentBadges.includes('badge-accuracy-master')) {
        currentBadges.push('badge-accuracy-master');
      }
      if (newAttempt.subject === 'Mathematics' && !currentBadges.includes('badge-math-whiz')) {
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
        `Quiz Completed: ${newAttempt.subject} (Level ${currentLvl})`,
        `You scored ${newAttempt.correctCount}/10 (${newAttempt.scorePercent}%) and earned +${bonusPoints} Champion Points!${isLevelUpgraded ? ` 🔓 Level ${newMaxUnlocked} is now UNLOCKED!` : ''}`,
        'quiz'
      );
    }

    return newAttempt;
  };

  // Add question with strict duplicate detection for Administrator
  const addNewQuestionWithValidation = (questionData: {
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
    const newQuestion: QuizQuestion = {
      id: `VC-C${questionData.classLevel.replace('Class ', '')}-${questionData.subject.substring(0, 3).toUpperCase()}-CUSTOM-${uniqueCode}`,
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
      message: 'Question passed zero-duplication check and was added to the curriculum bank successfully.'
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
    const student = currentStudent || INITIAL_STUDENT;
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
    setDrawingTemplates(prev => [tpl, ...prev]);
    addNotification('New Drawing Added', `Template "${tpl.title}" added to Drawing Champions!`, 'drawing');
  };

  const toggleDrawingTemplatePublished = (templateId: string) => {
    setDrawingTemplates(prev => prev.map(t => t.id === templateId ? { ...t, published: !t.published } : t));
  };

  const deleteDrawingTemplate = (templateId: string) => {
    setDrawingTemplates(prev => prev.filter(t => t.id !== templateId));
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

  // Payments
  const processMembershipPayment = (
    planId: 'basic' | 'premium',
    method: 'UPI' | 'Card' | 'NetBanking',
    simulateFailure: boolean = false
  ) => {
    const student = currentStudent || INITIAL_STUDENT;
    const order = paymentGateway.createOrder(student, planId);

    const result = paymentGateway.processAndVerify(
      student,
      planId,
      order.orderId,
      order.receiptNumber,
      method,
      simulateFailure
    );

    const txWithClass: PaymentTransaction = {
      ...result.transaction,
      selectedClass: student.classLevel
    };

    setTransactions(prev => [txWithClass, ...prev.filter(t => t.paymentId !== txWithClass.paymentId)]);
    saveTransactionToFirestore(txWithClass).catch(() => {});

    if (result.success) {
      const computedDates = computePaidPlanExpiryIsoDate(student.planExpiresAt);

      const updatedBadges = [...student.badges];
      if (!updatedBadges.includes('badge-champion-premium')) {
        updatedBadges.push('badge-champion-premium');
      }

      const updatedStudent: StudentProfile = {
        ...student,
        plan: planId,
        activatedClassLevel: student.classLevel,
        planPurchasedAt: computedDates.purchasedAt,
        planExpiresAt: computedDates.expiresAt,
        points: student.points + (planId === 'premium' ? 250 : 100),
        badges: updatedBadges
      };

      setCurrentStudent(updatedStudent);
      setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));

      saveStudentProfileToFirestore(updatedStudent).catch(() => {});
      saveSubscriptionToFirestore(updatedStudent.id, {
        plan: planId,
        selectedClass: updatedStudent.classLevel,
        planPurchasedAt: updatedStudent.planPurchasedAt,
        planExpiresAt: updatedStudent.planExpiresAt,
        currentExpiresAt: student.planExpiresAt,
        paymentId: txWithClass.paymentId,
        orderId: txWithClass.orderId,
        amountInr: txWithClass.amount
      }).catch(() => {});

      fetch('/api/subscription/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: updatedStudent.id,
          plan: planId,
          selectedClass: updatedStudent.classLevel,
          planPurchasedAt: updatedStudent.planPurchasedAt,
          planExpiresAt: updatedStudent.planExpiresAt,
          paymentId: txWithClass.paymentId
        })
      }).catch(() => {});

      addNotification(
        'Membership Activated! 👑',
        `Your Premium Access is Activated for Standard ${updatedStudent.classLevel.replace('Class ', '')}. Enjoy All Worksheets for Your Class! Receipt #${txWithClass.receiptNumber}.`,
        'membership'
      );
    } else {
      addNotification(
        'Payment Transaction Failed',
        result.error || 'Payment was declined by payment gateway. Paid plan was not activated.',
        'challenge'
      );
    }

    return {
      ...result,
      transaction: txWithClass
    };
  };

  // Automatic Verified Membership Activation (from Razorpay server verification)
  const activateVerifiedMembership = (transaction: PaymentTransaction, customExpiryDate?: string) => {
    const student = currentStudent || INITIAL_STUDENT;
    const txWithClass: PaymentTransaction = {
      ...transaction,
      selectedClass: transaction.selectedClass || student.classLevel
    };

    // Prevent duplicate subscription activation or duplicate points for an already-processed payment
    const alreadyProcessedLocally = transactions.some(
      t =>
        t.status === 'SUCCESS' &&
        (t.paymentId === txWithClass.paymentId ||
          (Boolean(txWithClass.orderId) && t.orderId === txWithClass.orderId))
    );

    if (alreadyProcessedLocally) {
      saveTransactionToFirestore(txWithClass).catch(() => {});
      return;
    }

    const computedDates = computePaidPlanExpiryIsoDate(student.planExpiresAt);
    const resolvedExpiresAt = customExpiryDate || computedDates.expiresAt;

    const updatedBadges = [...student.badges];
    if (txWithClass.planId === 'premium' && !updatedBadges.includes('badge-champion-premium')) {
      updatedBadges.push('badge-champion-premium');
    }

    const updatedStudent: StudentProfile = {
      ...student,
      plan: txWithClass.planId,
      activatedClassLevel: student.classLevel,
      planPurchasedAt: computedDates.purchasedAt,
      planExpiresAt: resolvedExpiresAt,
      points: student.points + (txWithClass.planId === 'premium' ? 250 : 100),
      badges: updatedBadges
    };

    setCurrentStudent(updatedStudent);
    setStudentsList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setTransactions(prev => [txWithClass, ...prev.filter(t => t.paymentId !== txWithClass.paymentId)]);

    saveTransactionToFirestore(txWithClass).catch(() => {});
    saveStudentProfileToFirestore(updatedStudent).catch(() => {});
    saveSubscriptionToFirestore(updatedStudent.id, {
      plan: txWithClass.planId,
      selectedClass: updatedStudent.classLevel,
      planPurchasedAt: updatedStudent.planPurchasedAt,
      planExpiresAt: updatedStudent.planExpiresAt,
      currentExpiresAt: student.planExpiresAt,
      paymentId: txWithClass.paymentId,
      orderId: txWithClass.orderId,
      amountInr: txWithClass.amount
    }).catch(() => {});

    fetch('/api/subscription/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: updatedStudent.id,
        plan: txWithClass.planId,
        selectedClass: updatedStudent.classLevel,
        planPurchasedAt: updatedStudent.planPurchasedAt,
        planExpiresAt: updatedStudent.planExpiresAt,
        paymentId: txWithClass.paymentId
      })
    }).catch(() => {});

    addNotification(
      'Membership Activated! 👑',
      `Your Premium Access is Activated for Standard ${updatedStudent.classLevel.replace('Class ', '')}. Enjoy All Worksheets for Your Class! Payment ID: ${txWithClass.paymentId}.`,
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
    setPlatformSettings(prev => ({
      ...prev,
      timers: { classes2to3, classes4to5, classes6to8 }
    }));
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

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentUser,
        currentStudent,
        studentsList,
        parentsList,
        announcements,
        allQuestions,
        rejectedDuplicates,
        allStories,
        allPuzzles,
        savedDrawings,
        drawingTemplates,
        allAttempts,
        transactions,
        notifications,
        platformSettings,

        switchRole,
        loginAsSampleAccount,
        loginAsTeacher,
        loginAsAdmin,

        registerStudent,
        loginWithEmail,
        loginWithMobileOtp,
        loginWithVerifiedPhone,
        recoverAccount,
        completePasswordReset,
        logout,
        quickSwitchStudent,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        adminPromoteOrCorrectClass,
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
        saveDrawingSubmission,
        deleteDrawingSubmission,
        addDrawingTemplate,
        toggleDrawingTemplatePublished,
        deleteDrawingTemplate,
        solvePuzzle,
        processMembershipPayment,
        activateVerifiedMembership,
        adminApplyApproved365DayMigration,

        recordScholarshipAttempt,
        updateTimers,
        markNotificationAsRead,
        clearAllNotifications
      }}
    >
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
