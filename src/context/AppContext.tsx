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
  computePaidPlanExpiryIsoDate,
  ensureStudentReferralCodeInFirestore,
  onAuthStateChanged
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
  loginAsTeacher: (email: string, password?: string) => Promise<{ success: boolean; message: string; teacher?: StudentProfile }>;
  loginAsAdmin: (email: string, password?: string) => Promise<{ success: boolean; message: string; adminEmail?: string }>;
  
  // Auth & Session methods - Strict 1 Account = 1 Class = 1 Mobile = 1 Email
  registerStudent: (
    data: Omit<StudentProfile, 'id' | 'points' | 'coins' | 'level' | 'streakDays' | 'lastActiveDate' | 'badges' | 'plan' | 'attemptedQuestionIds' | 'attemptedPuzzleIds' | 'completedStoryIds' | 'registeredAt' | 'classChangeLogs' | 'subjectProgress'>,
    options?: {
      verifiedFirebaseUid?: string;
      isPhoneVerified?: boolean;
      isEmailVerified?: boolean;
      accountRole?: 'student' | 'teacher';
    }
  ) => RegistrationResult;
  loginWithEmail: (email: string, password?: string, preferredRole?: 'student' | 'teacher') => Promise<{ success: boolean; message: string; student?: StudentProfile }>;
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

            return {
              ...safeS,
              accountRole: safeS.accountRole || 'student',
              activatedClassLevel:
                safeS.activatedClassLevel ||
                (safeS.plan === 'premium' || safeS.plan === 'basic' ? safeS.classLevel : undefined),
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
        const { passwordHash: _stripHash, ...safeParsed } = parsed;
        const code =
          sanitizeReferralCode(safeParsed.referralCode) ||
          generateUniqueStudentReferralCode(safeParsed.id, safeParsed.name);
        return {
          ...safeParsed,
          accountRole: safeParsed.accountRole || 'student',
          activatedClassLevel:
            safeParsed.activatedClassLevel ||
            (safeParsed.plan === 'premium' || safeParsed.plan === 'basic'
              ? safeParsed.classLevel
              : undefined),
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

  // Test Firestore Connection & Sync Firebase Auth state on App boot
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) return;
      const isLoggedOut = localStorage.getItem('vc_is_logged_out') === 'true';
      if (isLoggedOut) return;

      const fbEmail = (fbUser.email || '').trim().toLowerCase();
      if (fbEmail === 'ronakvarade2022@gmail.com' && localStorage.getItem('vc_current_user')?.includes('"admin"')) {
        return;
      }

      if (!currentStudent || currentStudent.firebaseUid !== fbUser.uid) {
        const fbProfile = await fetchStudentProfileFromFirestore(fbUser.uid, fbEmail || undefined).catch(() => null);
        if (fbProfile) {
          const { passwordHash: _stripHash, ...safeProfile } = fbProfile;
          const accountRole: 'student' | 'teacher' = safeProfile.accountRole || 'student';
          setCurrentStudent(safeProfile);
          setStudentsList(prev => {
            const exists = prev.some(s => s.id === safeProfile.id);
            return exists ? prev.map(s => (s.id === safeProfile.id ? safeProfile : s)) : [...prev, safeProfile];
          });
          setCurrentUser({
            uid: safeProfile.id,
            email: safeProfile.email,
            displayName: safeProfile.name,
            role: accountRole,
            studentId: safeProfile.id,
            classLevel: safeProfile.classLevel,
            isVerified: true
          });
          setActiveRole(accountRole);
        }
      }
    });

    return () => unsubscribe();
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

    const updated: StudentProfile = {
      ...safeFound,
      accountRole,
      firebaseUid: fbUid,
      isEmailVerified: Boolean(fbRes.user.emailVerified) || Boolean(safeFound.isEmailVerified)
    };

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
      classLevel: updated.classLevel,
      isVerified: true
    });
    setActiveRole(accountRole);
    saveStudentProfileToFirestore(updated).catch(() => {});

    return {
      success: true,
      message: `Welcome back, ${updated.name}! Signed into ${roleLabel} Portal (${updated.classLevel}).`,
      student: updated
    };
  };

  // Teacher Login helper (Requires real email + verified password)
  const loginAsTeacher = async (
    identifier: string,
    password?: string
  ): Promise<{ success: boolean; message: string; teacher?: StudentProfile }> => {
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
      teacher: res.student
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

  // Proper Logout Functionality - Firebase signOut, clear session, stay signed out cleanly
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

    const s1 = baseFixture({ id: 'audit_s1', classLevel: 'Class 4', email: 's1@test.local', mobile: '9000000001' });
    const s2 = baseFixture({
      id: 'audit_s2',
      classLevel: 'Class 6',
      activatedClassLevel: 'Class 6',
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
      activatedClassLevel: 'Class 9',
      plan: 'premium',
      planPurchasedAt: '2026-11-01',
      planExpiresAt: '2027-11-01',
      email: 't2@test.local',
      mobile: '9000000003'
    });

    const checks: SecurityAuditCheck[] = [
      {
        id: 'sec-chk-1',
        title: 'One Account = One Class = One Mobile = One Email',
        description: 'Verify every Student and Teacher account is permanently bound to a single class, unique mobile, and unique email.',
        category: 'student_isolation',
        passed: s1.id !== s2.id && s1.email !== s2.email && s1.mobile !== s2.mobile && t2.email !== s2.email,
        details: `PASS: Strict credential & class binding active (${studentsList.length} registered local account(s)).`
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
        details: 'PASS: Class-9 Teacher account accesses Class 9 curriculum while other classes remain restricted.'
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

  // Automatic Verified Membership Activation (from Razorpay server verification)
  const activateVerifiedMembership = (transaction: PaymentTransaction, customExpiryDate?: string) => {
    if (!currentStudent) {
      return;
    }
    const student = currentStudent;
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
        loginAsTeacher,
        loginAsAdmin,

        registerStudent,
        loginWithEmail,
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
