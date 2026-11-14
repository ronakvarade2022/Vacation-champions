import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel, SubjectName, QuizQuestion, QuestionType, QuizLevel, DrawingCategory, DrawingTemplate, DeviceSessionRecord } from '../types';
import { checkQuestionDuplicate, computeQuestionBankAnalytics } from '../services/questionBankService';
import { DRAWING_CATEGORIES, ACTIVE_DRAWING_CHALLENGES } from '../data/drawingsData';
import { DAILY_CRICKET_QUESTIONS_BANK } from '../data/cricketQuizData';
import { STD_4_SCHOLARSHIP_BANK, STD_7_SCHOLARSHIP_BANK, MSCE_LANGUAGES } from '../data/scholarshipData';
import { auth } from '../services/firebase';
import { fetchAllDeviceSessionsForAdmin, adminTerminateUserSession } from '../services/deviceSessionService';
import { 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Search, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Timer,
  RefreshCw,
  Sliders,
  GraduationCap,
  Lock,
  FileEdit,
  History,
  Check,
  X,
  Layers,
  BarChart3,
  Filter,
  Palette,
  User,
  LogOut,
  Gift,
  LifeBuoy,
  Monitor,
  Smartphone,
  Power,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { AdminReferralPanel } from './AdminReferralPanel';
import { AdminSupportPanel } from './AdminSupportPanel';
import {
  getStudentPlanInfo,
  getActivatedClassesList,
  getClassSubscriptionInfo,
  getPrimaryBaseClass,
  ALL_CLASS_LEVELS
} from '../utils/subscriptionAccess';
import {
  auditStudentSubscriptionRecord,
  evaluateSubscriptionValidity,
  formatDateIstDisplay,
} from '../utils/subscriptionDateUtils';

const ALL_CLASSES: ClassLevel[] = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
];

const ALL_14_SUBJECTS: SubjectName[] = [
  'Mathematics',
  'English',
  'Hindi',
  'Marathi',
  'Science',
  'General Knowledge',
  'Social Studies',
  'History',
  'Geography',
  'Computer Knowledge',
  'Logical Reasoning',
  'Environmental Studies',
  'Moral Education',
  'Vocabulary and Grammar'
];

export const AdminDashboard: React.FC = () => {
  const { 
    studentsList, 
    allQuestions, 
    rejectedDuplicates, 
    allStories, 
    transactions, 
    platformSettings,
    drawingTemplates,
    toggleDrawingTemplatePublished,
    deleteDrawingTemplate,
    addDrawingTemplate,
    savedDrawings,
    updateTimers,
    addNewQuestionWithValidation,
    deleteQuestion,
    updateQuestionStatus,
    adminPromoteOrCorrectClass,
    adminApplyApproved365DayMigration,
    logout
  } = useApp();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [subscriptionMigrationFeedback, setSubscriptionMigrationFeedback] = useState<{
    studentId: string;
    message: string;
    success: boolean;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<'students' | 'questions' | 'progression' | 'duplicates' | 'stories' | 'drawings' | 'payments' | 'referrals' | 'settings' | 'cricket' | 'scholarship' | 'support' | 'profile'>('questions');
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [questionSearch, setQuestionSearch] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [progressionClassFilter, setProgressionClassFilter] = useState<string>('all');
  const [progressionSubjectFilter, setProgressionSubjectFilter] = useState<string>('all');

  // Payment management state
  const [paymentSearch, setPaymentSearch] = useState<string>('');
  const [paymentFilterPlan, setPaymentFilterPlan] = useState<string>('all');
  const [paymentFilterStatus, setPaymentFilterStatus] = useState<string>('all');
  const [inspectedTx, setInspectedTx] = useState<any | null>(null);

  // Drawing admin state
  const [showAddTemplateModal, setShowAddTemplateModal] = useState<boolean>(false);
  const [newTplTitle, setNewTplTitle] = useState<string>('');
  const [newTplCategory, setNewTplCategory] = useState<DrawingCategory>('Nature and Scenery');
  const [newTplTier, setNewTplTier] = useState<'Classes 2–3' | 'Classes 4–5' | 'Classes 6–8'>('Classes 2–3');
  const [newTplDesc, setNewTplDesc] = useState<string>('');
  const [newTplSvg, setNewTplSvg] = useState<string>('');
  const [tplFilterCategory, setTplFilterCategory] = useState<string>('all');

  // New question form state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [newClass, setNewClass] = useState<ClassLevel>('Class 4');
  const [newSubject, setNewSubject] = useState<SubjectName>('Science');
  const [newLevel, setNewLevel] = useState<QuizLevel>(1);
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>('mcq');
  const [newTopic, setNewTopic] = useState<string>('Core Concepts');
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOpt0, setNewOpt0] = useState<string>('');
  const [newOpt1, setNewOpt1] = useState<string>('');
  const [newOpt2, setNewOpt2] = useState<string>('');
  const [newOpt3, setNewOpt3] = useState<string>('');
  const [newCorrectIdx, setNewCorrectIdx] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [addFeedback, setAddFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Timer settings form
  const [c23Timer, setC23Timer] = useState<number>(platformSettings.timers.classes2to3);
  const [c45Timer, setC45Timer] = useState<number>(platformSettings.timers.classes4to5);
  const [c68Timer, setC68Timer] = useState<number>(platformSettings.timers.classes6to8);
  const [timerSaved, setTimerSaved] = useState<boolean>(false);

  // Interactive Duplicate Detector Tool
  const [testQuestionInput, setTestQuestionInput] = useState<string>('');
  const [testAnswerInput, setTestAnswerInput] = useState<string>('');
  const [duplicateScanResult, setDuplicateScanResult] = useState<any | null>(null);

  // Secure Class Correction & Promotion Modal (Rule 1 & Rule 6)
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [targetNewClass, setTargetNewClass] = useState<ClassLevel>('Class 4');
  const [classChangeReason, setClassChangeReason] = useState<string>('Annual academic promotion');
  const [adminAuthName, setAdminAuthName] = useState<string>('Head Administrator');
  const [classChangeFeedback, setClassChangeFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Single-Device Session Monitoring & Termination State
  const [deviceSessionsMap, setDeviceSessionsMap] = useState<Record<string, DeviceSessionRecord>>({});
  const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(false);
  const [confirmTerminateUserId, setConfirmTerminateUserId] = useState<string | null>(null);
  const [terminatingUserId, setTerminatingUserId] = useState<string | null>(null);
  const [sessionAdminFeedback, setSessionAdminFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const loadDeviceSessions = useCallback(async () => {
    setIsLoadingSessions(true);
    try {
      const token = await auth.currentUser?.getIdToken().catch(() => undefined);
      const sessions = await fetchAllDeviceSessionsForAdmin(token);
      const mapped: Record<string, DeviceSessionRecord> = {};
      sessions.forEach((sess) => {
        if (sess.userId) mapped[sess.userId] = sess;
        if (sess.email) mapped[sess.email.trim().toLowerCase()] = sess;
      });
      setDeviceSessionsMap(mapped);
    } catch {
      // Keep existing state cleanly
    } finally {
      setIsLoadingSessions(false);
    }
  }, []);

  useEffect(() => {
    if (activeSection === 'students') {
      loadDeviceSessions();
    }
  }, [activeSection, loadDeviceSessions]);

  const formatIstDateTime = (iso?: string | null): string => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    try {
      return (
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(d) + ' IST'
      );
    } catch {
      return d.toISOString();
    }
  };

  const handleTerminateStudentSession = async (userId: string, studentName: string) => {
    setTerminatingUserId(userId);
    setSessionAdminFeedback(null);
    try {
      const token = await auth.currentUser?.getIdToken().catch(() => undefined);
      const res = await adminTerminateUserSession(userId, token, 'Terminated by administrator');
      if (res.success) {
        setDeviceSessionsMap((prev) => {
          const next = { ...prev };
          const existing = next[userId];
          if (existing) {
            const updated: DeviceSessionRecord = {
              ...existing,
              status: 'TERMINATED',
              terminatedBy: 'ADMIN',
              terminatedAt: new Date().toISOString(),
              terminationReason: 'Terminated by administrator',
            };
            next[userId] = updated;
            if (existing.email) next[existing.email.trim().toLowerCase()] = updated;
          }
          return next;
        });
        setSessionAdminFeedback({
          success: true,
          message: `Active session terminated for ${studentName}. They can now log in cleanly on a new device.`,
        });
      } else {
        setSessionAdminFeedback({
          success: false,
          message: res.error || 'Could not terminate device session. Please try again.',
        });
      }
    } finally {
      setTerminatingUserId(null);
      setConfirmTerminateUserId(null);
    }
  };

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.mobile.includes(studentSearch)
  );

  const analytics = computeQuestionBankAnalytics(allQuestions);

  const filteredQuestions = allQuestions.filter(q => {
    const matchClass = filterClass === 'all' || q.classLevel === filterClass;
    const matchSubj = filterSubject === 'all' || q.subject === filterSubject;
    const matchLevel = filterLevel === 'all' || (q.level || 1).toString() === filterLevel;
    const matchStatus = filterStatus === 'all' || (q.status || 'approved') === filterStatus;
    const matchText = q.questionText.toLowerCase().includes(questionSearch.toLowerCase()) || 
                      q.id.toLowerCase().includes(questionSearch.toLowerCase()) ||
                      (q.topic && q.topic.toLowerCase().includes(questionSearch.toLowerCase()));
    return matchClass && matchSubj && matchLevel && matchStatus && matchText;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !newOpt0 || !newOpt1 || !newOpt2 || !newOpt3) {
      setAddFeedback({ success: false, message: 'Please fill in question text and all 4 options.' });
      return;
    }

    const diffMap: Record<QuizLevel, 'easy' | 'medium' | 'hard' | 'expert'> = {
      1: 'easy',
      2: 'medium',
      3: 'hard',
      4: 'expert'
    };

    const res = addNewQuestionWithValidation({
      classLevel: newClass,
      subject: newSubject,
      level: newLevel,
      topic: newTopic || 'Core Concept',
      questionType: newQuestionType,
      questionText: newQuestionText,
      options: [newOpt0, newOpt1, newOpt2, newOpt3],
      correctIndex: newCorrectIdx,
      explanation: newExplanation || `Standard learning concept for ${newSubject}.`,
      difficulty: diffMap[newLevel]
    });

    setAddFeedback(res);

    if (res.success) {
      // Clear inputs
      setNewQuestionText('');
      setNewOpt0('');
      setNewOpt1('');
      setNewOpt2('');
      setNewOpt3('');
      setNewExplanation('');
    }
  };

  const handleSaveTimers = () => {
    updateTimers(c23Timer, c45Timer, c68Timer);
    setTimerSaved(true);
    setTimeout(() => setTimerSaved(false), 3000);
  };

  const handleRunDuplicateCheck = () => {
    if (!testQuestionInput) return;
    const dupCheck = checkQuestionDuplicate(testQuestionInput, testAnswerInput, allQuestions);
    if (dupCheck.isDuplicate) {
      setDuplicateScanResult({
        success: false,
        message: `DUPLICATE DETECTED: ${dupCheck.duplicateReason} (Matched: ${dupCheck.matchedQuestionId})`
      });
    } else {
      setDuplicateScanResult({
        success: true,
        message: 'PASS: Genuinely unique question! Zero collision detected against entire database.'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold w-fit mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Platform Management & Zero-Repetition Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
            Maintain curriculum standards, inspect central question IDs, manage 45 stories, and verify payments.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowAddQuestionModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vetted Question</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white p-2 rounded-2xl border border-amber-200">
        <button
          onClick={() => setActiveSection('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'questions' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Question Bank ({allQuestions.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('duplicates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'duplicates' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Rejected Duplicates ({rejectedDuplicates.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('students')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'students' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Students ({studentsList.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('progression')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'progression' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Level Progress Tracking</span>
        </button>
        <button
          onClick={() => setActiveSection('stories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'stories' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Story Library ({allStories.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('drawings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'drawings' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <Palette className="w-4 h-4" />
          <span>Drawing Studio ({drawingTemplates.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'payments' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Transactions ({transactions.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('referrals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'referrals' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <Gift className="w-4 h-4" />
          <span>Referrals & Rewards</span>
        </button>
        <button
          onClick={() => setActiveSection('cricket')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'cricket' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <span>🏏</span>
          <span>Cricket Bank (40 Qs)</span>
        </button>
        <button
          onClick={() => setActiveSection('scholarship')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'scholarship' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <span>🏆</span>
          <span>MSCE Scholarship</span>
        </button>
        <button
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'settings' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Timer & Platform Settings</span>
        </button>
        <button
          onClick={() => setActiveSection('support')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'support' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Help, Grievance & Reports</span>
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'profile' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-amber-50'}`}
        >
          <User className="w-4 h-4" />
          <span>Supervisor Profile</span>
        </button>
      </div>

      {/* SECTION 1: QUESTION BANK MANAGEMENT & ZERO-REPETITION (Section 11 & 5) */}
      {activeSection === 'questions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-8">
          {/* Header & New Question Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Class-Wise Question Bank & Curriculum Governance
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Completely isolated question banks for Standards 1st to 10th across all subjects with zero cross-class leakage.
              </p>
            </div>

            <button
              onClick={() => setShowAddQuestionModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Question</span>
            </button>
          </div>

          {/* 4 High-Level Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Total Questions in Bank</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{analytics.totalCount}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Across Standards 1st to 10th</p>
            </div>

            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
              <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Class-Isolated Pools</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">{ALL_CLASSES.length} Classes</p>
              <p className="text-[10px] text-emerald-600 mt-0.5">Strict non-overlapping banks</p>
            </div>

            <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-200">
              <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">Question Formats</p>
              <p className="text-2xl font-extrabold text-indigo-700 mt-1">15 Types</p>
              <p className="text-[10px] text-indigo-600 mt-0.5">MCQ, Fill-blank, Match, Assertion, etc.</p>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200">
              <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">Blocked Duplicates</p>
              <p className="text-2xl font-extrabold text-rose-700 mt-1">{rejectedDuplicates.length}</p>
              <p className="text-[10px] text-rose-600 mt-0.5">Semantic repetition prevented</p>
            </div>
          </div>

          {/* Missing Question Bank Warnings (if any) */}
          {analytics.warnings.length > 0 && (
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Question Bank Distribution Notice</span>
              </div>
              <ul className="list-disc pl-5 text-amber-950 text-[11px] space-y-0.5">
                {analytics.warnings.map((w, idx) => (
                  <li key={idx}>{w} Dynamic generator auto-populates on demand to maintain 10 questions per quiz.</li>
                ))}
              </ul>
            </div>
          )}

          {/* CLASS-WISE QUESTION COUNTS */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Class-Wise Question Counts (Click to Filter Table)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {ALL_CLASSES.map(cls => {
                const count = analytics.classCounts[cls] || 0;
                const isSelected = filterClass === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => setFilterClass(isSelected ? 'all' : cls)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                        : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="text-[11px] font-bold">{cls}</p>
                    <p className="text-base font-extrabold mt-0.5">{count}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUBJECT-WISE QUESTION COUNTS (14 Subjects) */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
              <span>Subject-Wise Question Breakdown</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ALL_14_SUBJECTS.map(sub => {
                const count = analytics.subjectCounts[sub] || 0;
                const isSelected = filterSubject === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setFilterSubject(isSelected ? 'all' : sub)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TWO BREAKDOWN PANELS: Question Types & Difficulties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question Format Distribution */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Question Format Distribution
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {Object.entries(analytics.typeCounts).map(([typeKey, count]) => (
                  <div key={typeKey} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-medium text-slate-700 capitalize">{typeKey.replace(/_/g, ' ')}</span>
                    <span className="font-extrabold text-amber-700">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Breakdown & Governance */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Difficulty & Governance Distribution
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase">Easy</p>
                  <p className="text-xl font-extrabold text-emerald-700">{analytics.difficultyCounts.easy || 0}</p>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <p className="text-[10px] font-bold text-amber-800 uppercase">Medium</p>
                  <p className="text-xl font-extrabold text-amber-700">{analytics.difficultyCounts.medium || 0}</p>
                </div>
                <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                  <p className="text-[10px] font-bold text-purple-800 uppercase">Hard</p>
                  <p className="text-xl font-extrabold text-purple-700">{analytics.difficultyCounts.hard || 0}</p>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Administrators can review newly generated questions, approve for active quiz rotations, or reject invalid questions.
              </div>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Classes</option>
                  {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Subjects</option>
                  {ALL_14_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Levels (1–4)</option>
                  <option value="1">Level 1 (Easy)</option>
                  <option value="2">Level 2 (Medium)</option>
                  <option value="3">Level 3 (Hard)</option>
                  <option value="4">Level 4 (Expert)</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved / Active</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  placeholder="Search by text, ID, or topic..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Questions Table with Approve/Reject Controls */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">ID & Class</th>
                    <th className="p-3">Subject & Topic</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Format</th>
                    <th className="p-3">Question Text & Answer</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.map((q) => (
                    <tr key={q.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-3 font-mono">
                        <span className="font-bold text-amber-800 block">{q.id}</span>
                        <span className="text-[10px] text-slate-500 font-sans">{q.classLevel}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-800 block">{q.subject}</span>
                        <span className="text-[10px] text-slate-500">{q.topic || 'Core Concept'}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                          (q.level || 1) === 1 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          (q.level || 1) === 2 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          (q.level || 1) === 3 ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-purple-100 text-purple-800 border-purple-300'
                        }`}>
                          Level {q.level || 1}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {q.questionType ? q.questionType.replace(/_/g, ' ') : 'MCQ'}
                        </span>
                      </td>
                      <td className="p-3 max-w-md font-medium text-slate-800 leading-relaxed">
                        <p>{q.questionText}</p>
                        <p className="text-[11px] text-emerald-700 font-bold mt-1">
                          ✓ Correct: {q.options[q.correctIndex]}
                        </p>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          q.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : q.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {q.status || 'approved'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {q.status !== 'approved' && (
                            <button
                              onClick={() => updateQuestionStatus(q.id, 'approved')}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                              title="Approve Question for Quizzes"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}
                          {q.status === 'approved' && (
                            <button
                              onClick={() => updateQuestionStatus(q.id, 'rejected')}
                              className="px-2 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                              title="Revoke / Reject Question"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          )}
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Permanently Delete Question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: REJECTED DUPLICATES LOG & TESTER (Section 5) */}
      {activeSection === 'duplicates' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Zero-Repetition & Duplicate Detection Engine
            </h2>
            <p className="text-xs text-slate-500">
              Evaluates exact text, token overlap, and semantic similarity to permanently prevent duplicate questions.
            </p>
          </div>

          {/* Interactive Duplicate Check Tool */}
          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3">
            <h4 className="font-bold text-xs uppercase text-amber-900">
              Interactive Semantic Similarity Checker
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={testQuestionInput}
                onChange={(e) => setTestQuestionInput(e.target.value)}
                placeholder="Enter candidate question to test against database..."
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden"
              />
              <input
                type="text"
                value={testAnswerInput}
                onChange={(e) => setTestAnswerInput(e.target.value)}
                placeholder="Target correct answer..."
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden"
              />
            </div>
            <button
              onClick={handleRunDuplicateCheck}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Run Duplicate Check
            </button>

            {duplicateScanResult && (
              <div className={`p-3 rounded-xl border text-xs font-medium ${duplicateScanResult.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300'}`}>
                {duplicateScanResult.message}
              </div>
            )}
          </div>

          {/* Rejected Duplicates Log */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800">
              Rejected Duplicate Records History ({rejectedDuplicates.length})
            </h3>

            {rejectedDuplicates.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                No duplicate attempts recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {rejectedDuplicates.map((rej) => (
                  <div key={rej.id} className="p-4 bg-rose-50/30 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-700 uppercase text-[10px]">
                        Blocked: {rej.reason}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rej.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">
                      <strong>Attempted:</strong> "{rej.candidateText}"
                    </p>
                    {rej.matchedQuestionId && (
                      <p className="text-[11px] text-slate-500">
                        Matched existing: <strong>{rej.matchedQuestionId}</strong> (Similarity score: {(rej.similarityScore * 100).toFixed(0)}%)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION: STUDENT LEVEL PROGRESSION TRACKING */}
      {activeSection === 'progression' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📈</span>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Student Level Progression & Mastery Tracking
                </h2>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                  4 Levels (Easy to Expert)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Real-time tracking of sequential level unlocks (L1 → L2 → L3 → L4) and quiz scores across all 14 subjects.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <select
                value={progressionClassFilter}
                onChange={(e) => setProgressionClassFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Classes</option>
                {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <select
                value={progressionSubjectFilter}
                onChange={(e) => setProgressionSubjectFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All 14 Subjects</option>
                {ALL_14_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <p className="text-[11px] font-bold text-amber-900 uppercase">Tracked Students</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{studentsList.length}</p>
              <p className="text-[10px] text-slate-500">Individual isolated accounts</p>
            </div>
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <p className="text-[11px] font-bold text-emerald-900 uppercase">Passing Threshold</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">60%+</p>
              <p className="text-[10px] text-emerald-600">Unlocks next sequential level</p>
            </div>
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
              <p className="text-[11px] font-bold text-blue-900 uppercase">Total Levels</p>
              <p className="text-2xl font-extrabold text-blue-700 mt-1">4 Levels</p>
              <p className="text-[10px] text-blue-600">Easy, Medium, Hard, Expert</p>
            </div>
            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <p className="text-[11px] font-bold text-purple-900 uppercase">Question Bank Isolation</p>
              <p className="text-2xl font-extrabold text-purple-700 mt-1">10 Qs / Level</p>
              <p className="text-[10px] text-purple-600">40 Qs per subject per class</p>
            </div>
          </div>

          {/* Student-by-Student Level Progression List */}
          <div className="space-y-4">
            {studentsList
              .filter(s => progressionClassFilter === 'all' || s.classLevel === progressionClassFilter)
              .map(student => {
                const displayedSubjects = progressionSubjectFilter === 'all' 
                  ? ALL_14_SUBJECTS 
                  : ALL_14_SUBJECTS.filter(sub => sub === progressionSubjectFilter);

                return (
                  <div key={student.id} className="border border-slate-200 rounded-3xl p-5 space-y-4 bg-slate-50/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{student.avatar}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900">{student.name}</h4>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                              {student.classLevel}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">UID: {student.id}</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Mobile: <strong>{student.mobile}</strong> • Points: <strong>{student.points} XP</strong>
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 font-medium">
                        Last Active: {new Date(student.lastActiveDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Subject Level Matrix for this student */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {displayedSubjects.map(subName => {
                        const progress = student.subjectProgress?.[subName] || {
                          maxUnlockedLevel: 1 as QuizLevel,
                          completedLevels: [] as QuizLevel[],
                          bestScores: {}
                        };

                        return (
                          <div key={subName} className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-800 truncate" title={subName}>
                                {subName}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                                L{progress.maxUnlockedLevel} of 4
                              </span>
                            </div>

                            {/* 4 Levels State Pills */}
                            <div className="grid grid-cols-4 gap-1">
                              {([1, 2, 3, 4] as QuizLevel[]).map(lvl => {
                                const isCompleted = progress.completedLevels.includes(lvl);
                                const isUnlocked = lvl <= progress.maxUnlockedLevel;
                                const score = progress.bestScores[lvl];

                                return (
                                  <div
                                    key={lvl}
                                    className={`p-1.5 rounded-lg text-center text-[10px] font-bold border ${
                                      isCompleted
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : isUnlocked
                                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                                          : 'bg-slate-100 text-slate-400 border-slate-200'
                                    }`}
                                    title={`Level ${lvl}: ${isCompleted ? `Passed (${score || 10}/10)` : isUnlocked ? 'Unlocked' : 'Locked'}`}
                                  >
                                    <div>L{lvl}</div>
                                    <div className="text-[9px] font-mono">
                                      {isCompleted ? `${score || 10}/10` : isUnlocked ? 'Open' : '🔒'}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SECTION 3: STUDENT MANAGEMENT (Section 15.1 & Rule 6) */}
      {activeSection === 'students' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <span>Student &amp; Teacher Accounts</span>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">
                  Multi-Class + Single Device Security
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Each account keeps a single verified identity (mobile + email), supports independent ₹99 / 365-day subscriptions across multiple classes, and enforces one active device at a time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={loadDeviceSessions}
                disabled={isLoadingSessions}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSessions ? 'animate-spin' : ''}`} />
                <span>{isLoadingSessions ? 'Syncing Devices...' : 'Refresh Active Devices'}</span>
              </button>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search by student, email, mobile, or UID..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {sessionAdminFeedback && (
            <div
              className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${
                sessionAdminFeedback.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {sessionAdminFeedback.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{sessionAdminFeedback.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setSessionAdminFeedback(null)}
                className="text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student Name &amp; UID</th>
                  <th className="p-3">Registered Email</th>
                  <th className="p-3">Verified Mobile</th>
                  <th className="p-3">Permanent Class</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Subscription Status</th>
                  <th className="p-3">Active Device</th>
                  <th className="p-3">Last Login Time (IST)</th>
                  <th className="p-3">Purchase Date (IST)</th>
                  <th className="p-3">Expiry Date (IST)</th>
                  <th className="p-3">Remaining Days</th>
                  <th className="p-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => {
                  const sPlanInfo = getStudentPlanInfo(s);
                  const sAudit = auditStudentSubscriptionRecord(s);
                  const deviceSess =
                    deviceSessionsMap[s.id] ||
                    deviceSessionsMap[s.email.trim().toLowerCase()] ||
                    null;
                  const isSessionActive =
                    deviceSess?.status === 'ACTIVE' &&
                    (!deviceSess.expiresAt || new Date(deviceSess.expiresAt).getTime() > Date.now());
                  return (
                    <tr key={s.id} className="hover:bg-amber-50/20">
                      <td className="p-3">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <span className="text-lg">{s.avatar}</span>
                          <div>
                            <p>{s.name}</p>
                            <p className="text-[10px] font-mono font-medium text-slate-400">
                              UID: {s.id} ({s.accountRole === 'teacher' ? 'Teacher' : 'Student'})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">{s.email}</td>
                      <td className="p-3 text-slate-700 font-mono text-[11px] font-bold">{s.mobile}</td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-950 border border-amber-300 px-2 py-0.5 rounded-lg text-xs font-extrabold">
                            <GraduationCap className="w-3 h-3 text-amber-700" />
                            <span>Active: {s.classLevel}</span>
                          </span>
                          {getPrimaryBaseClass(s) !== s.classLevel && (
                            <div className="text-[10px] font-bold text-slate-500">
                              Base Free: {getPrimaryBaseClass(s)}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {getActivatedClassesList(s).map((c) => (
                              <span
                                key={c.classLevel}
                                className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black"
                              >
                                {c.classLevel} ({c.daysRemaining}d)
                              </span>
                            ))}
                            {ALL_CLASS_LEVELS.map((cls) => getClassSubscriptionInfo(s, cls))
                              .filter((c) => c.isExpired)
                              .map((c) => (
                                <span
                                  key={c.classLevel}
                                  className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 text-[9px] font-black"
                                >
                                  {c.classLevel} (Exp)
                                </span>
                              ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${s.plan === 'premium' || s.plan === 'basic' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}>
                          {s.plan === 'premium' || s.plan === 'basic' ? 'Premium (₹99 • 365d)' : 'Free Plan'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          sPlanInfo.isPaidPlanExpired
                            ? 'bg-rose-100 text-rose-800'
                            : sPlanInfo.isExpiringToday
                            ? 'bg-amber-100 text-amber-900'
                            : s.plan !== 'free'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {sPlanInfo.isPaidPlanExpired
                            ? 'EXPIRED (Free Active)'
                            : sPlanInfo.isExpiringToday
                            ? 'EXPIRING TODAY'
                            : s.plan !== 'free'
                            ? 'ACTIVE (Paid)'
                            : 'ACTIVE (Lifetime Free)'}
                        </span>
                      </td>
                      <td className="p-3">
                        {deviceSess ? (
                          <div className="space-y-1 min-w-[155px]">
                            <div className="flex items-center gap-1.5">
                              {deviceSess.deviceType === 'Mobile' || deviceSess.deviceType === 'Tablet' ? (
                                <Smartphone className={`w-3.5 h-3.5 shrink-0 ${isSessionActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                              ) : (
                                <Monitor className={`w-3.5 h-3.5 shrink-0 ${isSessionActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                              )}
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                                  isSessionActive
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : deviceSess.status === 'TERMINATED'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                              >
                                {isSessionActive ? 'ACTIVE' : deviceSess.status}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-800 leading-tight">
                              {deviceSess.deviceName}
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {deviceSess.browser} • {deviceSess.os}
                            </p>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                            Offline
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px] min-w-[140px]">
                        {deviceSess?.loginAt ? (
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-800 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{formatIstDateTime(deviceSess.loginAt)}</span>
                            </span>
                            {deviceSess.lastActivityAt && (
                              <span className="block text-[10px] text-slate-400">
                                Ping: {formatIstDateTime(deviceSess.lastActivityAt)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">
                        {sAudit.currentPurchaseDateIst ? (
                          <div>
                            <span className="font-bold text-slate-900 block">{formatDateIstDisplay(sAudit.currentPurchaseDateIst)}</span>
                            <span className="text-[10px] text-slate-400">{sAudit.currentPurchaseDateIst}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">— (Free)</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">
                        {sAudit.currentExpiryDateIst ? (
                          <div>
                            <span className="font-bold text-emerald-800 block">{formatDateIstDisplay(sAudit.currentExpiryDateIst)}</span>
                            <span className="text-[10px] text-slate-400">{sAudit.currentExpiryDateIst}</span>
                          </div>
                        ) : (
                          <span className="text-emerald-700 font-bold">Lifetime</span>
                        )}
                      </td>
                      <td className="p-3 font-extrabold text-[11px]">
                        <span className={
                          sPlanInfo.isPaidPlanExpired
                            ? 'text-rose-700'
                            : sPlanInfo.isExpiringToday
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }>
                          {sPlanInfo.daysRemainingDisplay}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingStudent(s);
                              setTargetNewClass(s.classLevel);
                              setClassChangeReason('Annual academic grade promotion');
                              setClassChangeFeedback(null);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                            title="Promote or correct student's grade"
                          >
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Promote / Correct</span>
                          </button>

                          {isSessionActive && (
                            confirmTerminateUserId === s.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={terminatingUserId === s.id}
                                  onClick={() => handleTerminateStudentSession(s.id, s.name)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-black text-[10px] cursor-pointer whitespace-nowrap"
                                >
                                  {terminatingUserId === s.id ? 'Terminating...' : 'Confirm Force Logout'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmTerminateUserId(null)}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmTerminateUserId(s.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                                title="Force logout active device so student can sign in on another device"
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>Terminate Session</span>
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* EXISTING STUDENT SUBSCRIPTION DATE AUDIT & 365-DAY MIGRATION REVIEW PANEL */}
          <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-900 flex items-center gap-2">
                  <span>📅 Existing Student Subscription Date Audit &amp; 365-Day Review</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-300">
                    IST (Asia/Kolkata) Verified
                  </span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Non-destructive audit of all existing student and teacher subscription records. Existing expiry dates are preserved as stored and are only updated to 365 days (`purchaseDate + 365 days`) when explicitly approved below.
                </p>
              </div>
            </div>

            {subscriptionMigrationFeedback && (
              <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${
                subscriptionMigrationFeedback.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}>
                <span>{subscriptionMigrationFeedback.message}</span>
                <button
                  type="button"
                  onClick={() => setSubscriptionMigrationFeedback(null)}
                  className="text-slate-500 hover:text-slate-800 ml-3 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Account &amp; Class</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Current Purchase Date</th>
                    <th className="p-3">Current Expiry Date</th>
                    <th className="p-3">Configured Span</th>
                    <th className="p-3">Calculated Remaining Days</th>
                    <th className="p-3">Audit Status</th>
                    <th className="p-3">Proposed 365-Day Expiry</th>
                    <th className="p-3 text-right">Approval Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentsList.map((stu) => {
                    const audit = auditStudentSubscriptionRecord(stu);
                    return (
                      <tr key={`audit_${stu.id}`} className="hover:bg-slate-50/80">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{stu.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {stu.id} • {stu.classLevel}
                          </span>
                        </td>
                        <td className="p-3 font-bold">
                          {stu.plan === 'premium' || stu.plan === 'basic' ? 'Premium (₹99)' : 'Free Plan (₹0)'}
                        </td>
                        <td className="p-3 font-mono text-[11px]">
                          {audit.currentPurchaseDateIst
                            ? `${audit.currentPurchaseDateDisplay} (${audit.currentPurchaseDateIst})`
                            : '—'}
                        </td>
                        <td className="p-3 font-mono text-[11px]">
                          {audit.currentExpiryDateIst
                            ? `${audit.currentExpiryDateDisplay} (${audit.currentExpiryDateIst})`
                            : 'Lifetime'}
                        </td>
                        <td className="p-3 font-mono text-[11px]">
                          {audit.configuredValiditySpanDays !== null
                            ? `${audit.configuredValiditySpanDays} Days`
                            : 'Lifetime'}
                        </td>
                        <td className="p-3 font-extrabold text-amber-900">
                          {audit.calculatedDaysRemainingDisplay}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            audit.anomalyType === 'NONE'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {audit.anomalyType === 'NONE' ? '✓ 365d / Lifetime Valid' : audit.anomalyType}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1 max-w-xs">{audit.anomalyDescription}</p>
                        </td>
                        <td className="p-3 font-mono text-[11px]">
                          {audit.proposed365ExpiryDateIst ? (
                            <div>
                              <span className="font-bold text-indigo-800 block">
                                {audit.proposed365ExpiryDateDisplay} ({audit.proposed365ExpiryDateIst})
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold">
                                ({audit.proposed365DaysRemaining} Days Remaining)
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400">No change needed</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {audit.requiresAdminApprovalToMigrate && audit.proposed365ExpiryDateIst ? (
                            <button
                              type="button"
                              onClick={() => {
                                const res = adminApplyApproved365DayMigration(stu.id);
                                setSubscriptionMigrationFeedback({
                                  studentId: stu.id,
                                  message: res.message,
                                  success: res.success,
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs cursor-pointer"
                            >
                              Approve 365d ({audit.proposed365ExpiryDateIst})
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700">✓ Verified</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECURE CLASS CORRECTION & PROMOTION MODAL (Rule 1 & Rule 6) */}
          {editingStudent && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-300 p-6 space-y-4 animate-in zoom-in-95">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-700" />
                    <div>
                      <h3 className="text-base font-display font-bold text-slate-900">
                        Admin Grade Promotion & Correction
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Authorized change for {editingStudent.name} (UID: {editingStudent.id})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingStudent(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Current Enrolled Grade:</span>
                    <span className="font-extrabold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded">
                      {editingStudent.classLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Student Contact:</span>
                    <span className="font-mono text-slate-800">{editingStudent.mobile} • {editingStudent.email}</span>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const res = adminPromoteOrCorrectClass(
                      editingStudent.id,
                      targetNewClass,
                      classChangeReason,
                      adminAuthName
                    );
                    setClassChangeFeedback(res);
                    if (res.success) {
                      setTimeout(() => {
                        setEditingStudent(null);
                      }, 1200);
                    }
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select New Class Level *</label>
                    <select
                      value={targetNewClass}
                      onChange={(e) => setTargetNewClass(e.target.value as ClassLevel)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                    >
                      {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Reason for Change (Audit Log Trail) *
                    </label>
                    <input
                      type="text"
                      required
                      value={classChangeReason}
                      onChange={(e) => setClassChangeReason(e.target.value)}
                      placeholder="e.g. Annual school grade promotion / Registration mistake correction"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Authorized Administrator Name *</label>
                    <input
                      type="text"
                      required
                      value={adminAuthName}
                      onChange={(e) => setAdminAuthName(e.target.value)}
                      placeholder="Administrator Name or Employee ID"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                    />
                  </div>

                  {classChangeFeedback && (
                    <div className={`p-3 rounded-xl border font-bold text-xs ${classChangeFeedback.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300'}`}>
                      {classChangeFeedback.message}
                    </div>
                  )}

                  {/* Audit Trail for this student */}
                  {editingStudent.classChangeLogs && editingStudent.classChangeLogs.length > 0 && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Previous Change Audit History:
                      </span>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {editingStudent.classChangeLogs.map((log: any, idx: number) => (
                          <div key={idx} className="p-2 bg-slate-50 rounded-lg text-[10px] text-slate-600">
                            <strong>{log.oldClass} → {log.newClass}</strong> on {new Date(log.changedAt).toLocaleDateString()} by {log.adminName} ({log.reason})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingStudent(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-xs"
                    >
                      Confirm Official Grade Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: STORY MANAGEMENT (Section 15.3) */}
      {activeSection === 'stories' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Original Story Library (45 Stories)
              </h2>
              <p className="text-xs text-slate-500">
                15 English • 15 Hindi • 15 Marathi stories with comprehension questions and audio scripts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allStories.map((story) => (
              <div key={story.id} className="p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    {story.language}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">{story.id}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{story.title}</h4>
                <p className="text-slate-500 line-clamp-2">{story.summary}</p>
                <p className="text-[11px] text-amber-900 font-medium italic">
                  Moral: {story.moral}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: ADMIN PAYMENT MANAGEMENT (Requirement 11) */}
      {activeSection === 'payments' && (() => {
        const successfulTxs = transactions.filter(t => t.status === 'SUCCESS');
        const basicPurchases = transactions.filter(t => t.planId === 'basic' && t.status === 'SUCCESS');
        const premiumPurchases = transactions.filter(t => t.planId === 'premium' && t.status === 'SUCCESS');
        const pendingTxs = transactions.filter(t => t.status === 'PENDING');
        const failedTxs = transactions.filter(t => t.status === 'FAILED');
        const refundedTxs = transactions.filter(t => t.status === 'REFUNDED');
        const totalCollectedAmount = successfulTxs.reduce((acc, t) => acc + (t.amount || 0), 0);

        const filteredTxList = transactions.filter(t => {
          const matchQuery = 
            t.studentName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
            t.studentId.toLowerCase().includes(paymentSearch.toLowerCase()) ||
            t.paymentId.toLowerCase().includes(paymentSearch.toLowerCase()) ||
            t.orderId.toLowerCase().includes(paymentSearch.toLowerCase()) ||
            t.receiptNumber.toLowerCase().includes(paymentSearch.toLowerCase());

          const matchPlan = paymentFilterPlan === 'all' || t.planId === paymentFilterPlan;
          const matchStatus = paymentFilterStatus === 'all' || t.status === paymentFilterStatus;

          return matchQuery && matchPlan && matchStatus;
        });

        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💳</span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900">
                    Razorpay Live Payment Gateway Management
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Server-side cryptographic payment auditing, 365-day (1-year) membership activations, and reconciliation ledger.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>HMAC SHA256 Verified</span>
                </span>
              </div>
            </div>

            {/* 7 Required Metrics Cards (Requirement 11) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-center">
                <p className="text-[10px] font-bold text-emerald-900 uppercase">Successful</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{successfulTxs.length}</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">Paid Orders</p>
              </div>

              <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-center">
                <p className="text-[10px] font-bold text-orange-950 uppercase">Premium (₹99)</p>
                <p className="text-xl font-extrabold text-orange-700 mt-0.5">{premiumPurchases.length + basicPurchases.length}</p>
                <p className="text-[10px] text-orange-600 mt-0.5">Purchases</p>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 text-center">
                <p className="text-[10px] font-bold text-blue-900 uppercase">Pending</p>
                <p className="text-xl font-extrabold text-blue-700 mt-0.5">{pendingTxs.length}</p>
                <p className="text-[10px] text-blue-600 mt-0.5">In Checkout</p>
              </div>

              <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200 text-center">
                <p className="text-[10px] font-bold text-rose-900 uppercase">Failed</p>
                <p className="text-xl font-extrabold text-rose-700 mt-0.5">{failedTxs.length}</p>
                <p className="text-[10px] text-rose-600 mt-0.5">Declined</p>
              </div>

              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 text-center">
                <p className="text-[10px] font-bold text-purple-900 uppercase">Refunded</p>
                <p className="text-xl font-extrabold text-purple-700 mt-0.5">{refundedTxs.length}</p>
                <p className="text-[10px] text-purple-600 mt-0.5">Reversed</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3.5 rounded-2xl text-white text-center shadow-xs">
                <p className="text-[10px] font-bold text-amber-100 uppercase">Total Collected</p>
                <p className="text-xl font-extrabold mt-0.5">₹{totalCollectedAmount.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-amber-100 mt-0.5">INR (Net)</p>
              </div>
            </div>

            {/* Search & Filter Bar (Requirement 11) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={paymentFilterPlan}
                  onChange={(e) => setPaymentFilterPlan(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Plans (₹99 Premium)</option>
                  <option value="premium">Champion Premium (₹99)</option>
                </select>

                <select
                  value={paymentFilterStatus}
                  onChange={(e) => setPaymentFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="SUCCESS">Success / Captured</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed / Declined</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  placeholder="Search student, UID, Payment ID, Order ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Transactions Table with Inspect Control */}
            {filteredTxList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border text-xs text-slate-500">
                No payment transactions match your search filter criteria.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Receipt &amp; Date (IST)</th>
                      <th className="p-3">Student Name &amp; UID</th>
                      <th className="p-3">Plan</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Validity Dates (Purchase → Expiry IST)</th>
                      <th className="p-3">Razorpay Payment ID</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTxList.map((t) => {
                      const txValidity =
                        t.status === 'SUCCESS' && t.membershipExpiryDate
                          ? evaluateSubscriptionValidity(
                              'premium',
                              t.membershipStartDate || t.createdAt,
                              t.membershipExpiryDate
                            )
                          : null;
                      return (
                        <tr key={t.id} className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-3 font-mono">
                            <span className="font-bold text-amber-900 block">{t.receiptNumber}</span>
                            <span className="text-[10px] text-slate-400 font-sans">
                              {formatDateIstDisplay(t.createdAt)}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{t.studentName}</span>
                            <span className="text-[10px] font-mono text-slate-400">UID: {t.studentId}</span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${t.planId === 'premium' ? 'bg-orange-100 text-orange-900 border border-orange-200' : 'bg-amber-100 text-amber-900 border border-amber-200'}`}>
                              {t.planTitle}
                            </span>
                          </td>
                          <td className="p-3 font-extrabold text-slate-900 text-sm">
                            ₹{t.amount}
                          </td>
                          <td className="p-3 font-mono text-[11px]">
                            {txValidity ? (
                              <div>
                                <span className="text-slate-800 font-bold block">
                                  {txValidity.purchaseDateIst} → {txValidity.expiryDateIst}
                                </span>
                                <span className="text-[10px] text-emerald-700 font-bold">
                                  {txValidity.daysRemainingDisplay}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-500">
                            {t.paymentId} ({t.method})
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              t.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              t.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                              'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectedTx(t)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                              title="Inspect complete verified transaction data"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Inspect</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Audit Notice: Manual modification of amounts is strictly prohibited */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>🔒 <strong>Zero-Tamper Guarantee:</strong> All Razorpay transactions are cryptographically sealed. Transaction amounts and student IDs cannot be modified manually by administrators.</span>
              <span className="font-mono text-slate-400">Total records: {transactions.length}</span>
            </div>

            {/* Inspect Modal */}
            {inspectedTx && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-300 space-y-4 text-xs animate-in zoom-in-95">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-display font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>Razorpay Verified Payment Record</span>
                    </h3>
                    <button
                      onClick={() => setInspectedTx(null)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[11px]">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">RECEIPT #</span>
                        <span className="font-bold text-slate-900">{inspectedTx.receiptNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">STATUS</span>
                        <span className="font-bold text-emerald-700">{inspectedTx.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">STUDENT NAME</span>
                        <span className="font-bold text-slate-900">{inspectedTx.studentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">STUDENT UID</span>
                        <span className="font-bold text-amber-900">{inspectedTx.studentId}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">PLAN</span>
                        <span className="font-bold text-slate-900">{inspectedTx.planTitle}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">AMOUNT PAID</span>
                        <span className="font-bold text-slate-900">₹{inspectedTx.amount}.00 INR</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">PURCHASE DATE (IST)</span>
                        <span className="font-bold text-slate-900">
                          {inspectedTx.membershipStartDate || formatDateIstDisplay(inspectedTx.createdAt)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">EXPIRY DATE (365 DAYS IST)</span>
                        <span className="font-bold text-emerald-700">
                          {inspectedTx.membershipExpiryDate || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">RAZORPAY PAYMENT ID</span>
                      <span className="font-bold text-slate-900 select-all">{inspectedTx.paymentId}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">RAZORPAY ORDER ID</span>
                      <span className="font-bold text-slate-900 select-all">{inspectedTx.orderId}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">HMAC SHA256 SIGNATURE</span>
                      <span className="text-slate-600 break-all">{inspectedTx.signature || 'verified_server_signature'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px]">TIMESTAMP</span>
                        <span className="text-slate-700">{new Date(inspectedTx.createdAt).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">PAYMENT METHOD</span>
                        <span className="text-slate-700">{inspectedTx.method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setInspectedTx(null)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* SECTION 6: PLATFORM & TIMER SETTINGS (Section 15.5) */}
      {activeSection === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Quiz Timers & Platform Configurations
            </h2>
            <p className="text-xs text-slate-500">
              Adjust class-wise countdown timers and point allocation rules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 2–3 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c23Timer}
                onChange={(e) => setC23Timer(parseInt(e.target.value, 10) || 30)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 30 seconds</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 4–5 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c45Timer}
                onChange={(e) => setC45Timer(parseInt(e.target.value, 10) || 25)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 25 seconds</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <label className="block text-xs font-bold text-amber-950">
                Classes 6–8 Timer (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={c68Timer}
                onChange={(e) => setC68Timer(parseInt(e.target.value, 10) || 20)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              />
              <span className="text-[11px] text-slate-500 block">Suggested: 20 seconds</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveTimers}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
            >
              Save Timer Changes
            </button>
            {timerSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Timers updated across platform!
              </span>
            )}
          </div>
        </div>
      )}

      {/* SECTION: CRICKET MANAGEMENT */}
      {activeSection === 'cricket' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏏</span>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Daily Cricket Champions Question Bank (40 Questions)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified daily cricket current affairs, IPL 2024, World Cup records, terminology, and women's cricket.
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold">
              Status: Verified Live Daily Bank
            </div>
          </div>

          {/* 4 Levels display */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map(lvl => {
              const qList = DAILY_CRICKET_QUESTIONS_BANK[lvl as QuizLevel] || [];
              const lvlTitle = lvl === 1 ? 'Beginner' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advanced' : 'Champion';

              return (
                <div key={lvl} className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                      <span>Level {lvl} – {lvlTitle}</span>
                      <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                        10 Questions
                      </span>
                    </h3>
                    <span className="text-xs text-slate-500">Anti-Pattern Randomizer Active</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {qList.map((q, qIdx) => (
                      <div key={q.id} className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            Q{qIdx + 1}. {q.question}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong>Answer: </strong>
                          <span className="text-emerald-800 font-bold">{q.options[q.correctIndex]}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                          {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: MAHARASHTRA MSCE SCHOLARSHIP MANAGEMENT */}
      {activeSection === 'scholarship' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Maharashtra MSCE Scholarship Practice Banks & Multilingual Engine
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Official syllabus for Std 4th (Primary) & Std 7th (Upper Primary) across 7 approved MSCE mediums.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-xl">
              <span>7 Official Languages Supported</span>
            </div>
          </div>

          {/* Languages overview */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
            <span className="font-bold text-amber-950 block">Approved Examination Languages:</span>
            <div className="flex flex-wrap gap-2">
              {MSCE_LANGUAGES.map(lang => (
                <span key={lang.id} className="bg-white border border-amber-300 text-amber-900 px-3 py-1 rounded-xl font-bold">
                  {lang.label}
                </span>
              ))}
            </div>
          </div>

          {/* Std 4th & Std 7th Practice Tests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Std 4th */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900">
                  Std 4th – Primary Scholarship (PSE)
                </h3>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  10 Tests Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Paper 1 (Language & Maths) + Paper 2 (Third Lang & Intelligence). Total 150 marks per paper.
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {STD_4_SCHOLARSHIP_BANK.map((q, idx) => (
                  <div key={q.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] space-y-1">
                    <span className="font-bold text-slate-800">Test {q.testNumber} • {q.subject}:</span>
                    <p className="text-slate-600 line-clamp-2">{q.questionText.English}</p>
                    <p className="text-emerald-800 font-semibold">Answer: {q.options.English[q.correctIndex]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Std 7th */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900">
                  Std 7th – Upper Primary Scholarship (UPS)
                </h3>
                <span className="text-xs bg-orange-100 text-orange-900 px-2 py-0.5 rounded font-bold">
                  10 Tests Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Advanced Algebra, Geometry, Reasoning, Clock Angles, Coding & Comprehension.
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {STD_7_SCHOLARSHIP_BANK.map((q, idx) => (
                  <div key={q.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] space-y-1">
                    <span className="font-bold text-slate-800">Test {q.testNumber} • {q.subject}:</span>
                    <p className="text-slate-600 line-clamp-2">{q.questionText.English}</p>
                    <p className="text-emerald-800 font-semibold">Answer: {q.options.English[q.correctIndex]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: DRAWING STUDIO & READY-MADE OUTLINES MANAGEMENT */}
      {activeSection === 'drawings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  Drawing Champions & Outline Management
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Oversee ready-made colouring templates across 12 categories (A to L), class tiers, challenges, and student submissions.
              </p>
            </div>

            <button
              onClick={() => setShowAddTemplateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Outline Drawing</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Total Templates</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{drawingTemplates.length}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Across 12 core categories</p>
            </div>

            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
              <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Published & Live</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                {drawingTemplates.filter(t => t.published).length}
              </p>
              <p className="text-[10px] text-emerald-600 mt-0.5">Available in student studio</p>
            </div>

            <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-200">
              <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">Student Artworks Saved</p>
              <p className="text-2xl font-extrabold text-indigo-700 mt-1">{savedDrawings.length}</p>
              <p className="text-[10px] text-indigo-600 mt-0.5">In student portfolios</p>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200">
              <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">Active Challenges</p>
              <p className="text-2xl font-extrabold text-rose-700 mt-1">{ACTIVE_DRAWING_CHALLENGES.length}</p>
              <p className="text-[10px] text-rose-600 mt-0.5">Daily, nature & festival</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Filter Templates by Category:</span>
              <span className="text-amber-600">{tplFilterCategory === 'all' ? 'All Categories' : tplFilterCategory}</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setTplFilterCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${tplFilterCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                All ({drawingTemplates.length})
              </button>
              {DRAWING_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setTplFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${tplFilterCategory === cat.id ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Preview</th>
                    <th className="py-3 px-4">Title & Description</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Class Tier</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {drawingTemplates
                    .filter(t => tplFilterCategory === 'all' || t.category === tplFilterCategory)
                    .map(tpl => (
                      <tr key={tpl.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div 
                            className="w-16 h-12 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                            dangerouslySetInnerHTML={{ __html: tpl.svgOutline }}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-extrabold text-slate-900">{tpl.title}</p>
                          <p className="text-[11px] text-slate-500 max-w-sm truncate">{tpl.description}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md font-bold text-rose-600 bg-rose-50">
                            {tpl.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md font-bold text-indigo-600 bg-indigo-50">
                            {tpl.classTier}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleDrawingTemplatePublished(tpl.id)}
                            className={`px-2.5 py-1 rounded-full font-bold text-[10px] cursor-pointer transition-all ${tpl.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}
                          >
                            {tpl.published ? '● Live (Published)' : '○ Hidden (Draft)'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteDrawingTemplate(tpl.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete template"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Drawing Challenges Showcase */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <span>🏆</span> Active Live Drawing Challenges & Competitions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIVE_DRAWING_CHALLENGES.map(ch => (
                <div key={ch.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        {ch.type}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">{ch.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ch.description}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">Theme: {ch.theme}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-rose-600 block">+{ch.rewardPoints} Pts</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md block mt-1">
                      {ch.badgeName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD DRAWING TEMPLATE MODAL */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-amber-300 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">
                  Add New Ready-Made Outline Drawing
                </h3>
                <p className="text-xs text-slate-500">
                  Create a new template for the Colouring World
                </p>
              </div>
              <button
                onClick={() => setShowAddTemplateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTplTitle.trim()) return;
                const newTpl: DrawingTemplate = {
                  id: `tpl-${Date.now().toString(36)}`,
                  title: newTplTitle.trim(),
                  category: newTplCategory,
                  classTier: newTplTier,
                  description: newTplDesc.trim() || 'A delightful outline drawing for young artists to colour.',
                  published: true,
                  svgOutline: newTplSvg.trim() || `<svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="500" height="400" fill="#ffffff" stroke="#000000" stroke-width="4"/><circle cx="250" cy="200" r="100" fill="#ffffff" stroke="#000000" stroke-width="4"/><circle cx="210" cy="180" r="12" fill="#000000"/><circle cx="290" cy="180" r="12" fill="#000000"/><path d="M 210 230 Q 250 270 290 230" fill="none" stroke="#000000" stroke-width="4"/></svg>`
                };
                addDrawingTemplate(newTpl);
                setShowAddTemplateModal(false);
                setNewTplTitle('');
                setNewTplDesc('');
                setNewTplSvg('');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Drawing Title</label>
                <input
                  type="text"
                  required
                  value={newTplTitle}
                  onChange={(e) => setNewTplTitle(e.target.value)}
                  placeholder="e.g. Royal Bengal Tiger, Sacred Lotus..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category (12 Categories A-L)</label>
                  <select
                    value={newTplCategory}
                    onChange={(e) => setNewTplCategory(e.target.value as DrawingCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {DRAWING_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class Tier</label>
                  <select
                    value={newTplTier}
                    onChange={(e) => setNewTplTier(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    <option value="Classes 2–3">Classes 2–3 (Beginner)</option>
                    <option value="Classes 4–5">Classes 4–5 (Intermediate)</option>
                    <option value="Classes 6–8">Classes 6–8 (Advanced)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  value={newTplDesc}
                  onChange={(e) => setNewTplDesc(e.target.value)}
                  placeholder="Short description for students..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">SVG Vector Outline Code</label>
                <textarea
                  rows={4}
                  value={newTplSvg}
                  onChange={(e) => setNewTplSvg(e.target.value)}
                  placeholder='<svg viewBox="0 0 500 400" width="100%" height="100%" ...><rect ... stroke="#000000"/></svg>'
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">Leave blank to use default child-friendly smiling avatar outline template.</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Save & Publish Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD QUESTION MODAL WITH DUPLICATE VALIDATION */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-amber-300 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">
                  Add New Curriculum Question
                </h3>
                <p className="text-xs text-slate-500">
                  Validated in real-time through the Zero-Repetition Engine
                </p>
              </div>
              <button
                onClick={() => { setShowAddQuestionModal(false); setAddFeedback(null); }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Class</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value as ClassLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ALL_14_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mastery Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(Number(e.target.value) as QuizLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    <option value={1}>Level 1 – Easy (Foundations)</option>
                    <option value={2}>Level 2 – Medium (Application)</option>
                    <option value={3}>Level 3 – Hard (Analytical)</option>
                    <option value={4}>Level 4 – Expert (Mastery)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question Format / Type</label>
                  <select
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value as QuestionType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="fill_blank">Fill in the Blanks</option>
                    <option value="true_false">True or False</option>
                    <option value="match_following">Match the Following</option>
                    <option value="find_incorrect">Find Incorrect Option</option>
                    <option value="choose_correct_statement">Choose Correct Statement</option>
                    <option value="assertion_reasoning">Assertion & Reasoning</option>
                    <option value="picture_based">Picture / Visual Based</option>
                    <option value="number_based">Number Calculation</option>
                    <option value="sequence_pattern">Sequence & Pattern</option>
                    <option value="comprehension">Short Comprehension</option>
                    <option value="real_life_application">Real-Life Application</option>
                    <option value="logical_reasoning">Logical Reasoning</option>
                    <option value="problem_solving">Problem Solving</option>
                    <option value="diagram_identification">Diagram Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic / Curriculum Chapter</label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. Fractions, Photosynthesis, Integers"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Text</label>
                <textarea
                  rows={2}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Enter the complete question text..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">4 Answer Options (Select Correct One):</label>
                {[
                  { val: newOpt0, setVal: setNewOpt0, idx: 0 },
                  { val: newOpt1, setVal: setNewOpt1, idx: 1 },
                  { val: newOpt2, setVal: setNewOpt2, idx: 2 },
                  { val: newOpt3, setVal: setNewOpt3, idx: 3 }
                ].map((opt) => (
                  <div key={opt.idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctIdx"
                      checked={newCorrectIdx === opt.idx}
                      onChange={() => setNewCorrectIdx(opt.idx)}
                      className="accent-amber-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={opt.val}
                      onChange={(e) => opt.setVal(e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + opt.idx)}...`}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pedagogical Explanation</label>
                <input
                  type="text"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Brief child-friendly explanation for the correct answer..."
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                />
              </div>

              {addFeedback && (
                <div className={`p-3 rounded-xl border font-bold text-xs ${addFeedback.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300'}`}>
                  {addFeedback.message}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Run Validation & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION: REFERRALS & REWARDS MANAGEMENT */}
      {activeSection === 'referrals' && <AdminReferralPanel />}

      {/* SECTION: USER SUPPORT, GRIEVANCES & QUESTION REPORTS */}
      {activeSection === 'support' && <AdminSupportPanel />}

      {/* SECTION: SUPERVISOR PROFILE SECTION (EXCLUSIVE LOGOUT BUTTON LOCATION) */}
      {activeSection === 'profile' && (
        <div className="space-y-6">
          {/* Supervisor Credentials Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-purple-600/30 border border-purple-400/40 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
                  🛡️
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-display font-extrabold tracking-tight">
                      Supervisor Profile & Control
                    </h2>
                    <span className="px-3 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-bold">
                      Master Role
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                    Primary System Administrator: <strong className="text-purple-300">Master Admin Portal</strong>
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Firebase Session</span>
              </span>
            </div>
          </div>

          {/* Supervisor Account Details Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Administrative Access & System Governance</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Identity and RBAC permission audit for this session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Supervisor Role</p>
                <p className="font-bold text-sm text-slate-800">Platform SuperAdmin</p>
                <p className="text-[11px] text-emerald-700 font-medium">✓ Firebase Whitelisted SuperAdmin</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Security Guard</p>
                <p className="font-bold text-sm text-slate-800">Firebase Role ABAC</p>
                <p className="text-[11px] text-slate-500 font-medium">Enforced at Firestore Security Rules</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Database Project</p>
                <p className="font-mono font-bold text-xs text-slate-800 truncate" title="ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d">
                  ai-studio-vacationchampion
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Region: asia-south1 (Mumbai)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Enrolled Students Managed</p>
                <p className="font-bold text-sm text-slate-800">{studentsList.length} Active Records</p>
                <p className="text-[11px] text-slate-500 font-medium">Class 2 to Class 8 Accounts</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Curriculum Bank</p>
                <p className="font-bold text-sm text-slate-800">{allQuestions.length} Vetted Questions</p>
                <p className="text-[11px] text-slate-500 font-medium">14 Subjects • 4 Difficulty Levels</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">MSCE Scholarship</p>
                <p className="font-bold text-sm text-slate-800">20 Practice Tests (600 Qs)</p>
                <p className="text-[11px] text-slate-500 font-medium">Std 4th & Std 7th in 7 Languages</p>
              </div>
            </div>
          </div>

          {/* VERY BOTTOM OF SUPERVISOR PROFILE PAGE: EXCLUSIVE RED SIGN OUT BUTTON */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 space-y-1">
                <h3 className="text-base font-display font-bold text-slate-900">
                  Supervisor Session & Sign Out
                </h3>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Signing out will terminate your administrative session on this device. You will be redirected to the Student & Guardian Login screen.
                </p>
              </div>

              {/* PROMINENT RED "SIGN OUT" BUTTON */}
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
              >
                <LogOut className="w-5 h-5 text-white" />
                <span>SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={logout}
        accountName="Platform Supervisor"
        roleTitle="Administrator"
      />
    </div>
  );
};
