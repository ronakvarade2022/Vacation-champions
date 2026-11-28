import React, { Suspense, useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { SectionLoadingFallback } from './SectionLoadingFallback';
import {
  ClassLevel,
  EducationBoard,
  SubjectName,
  QuestionType,
  QuizLevel,
} from '../types';
import {
  ShieldCheck,
  Users,
  HelpCircle,
  BookOpen,
  CreditCard,
  Settings,
  Plus,
  AlertTriangle,
  BarChart3,
  Palette,
  User,
  Gift,
  LifeBuoy,
  FileSpreadsheet,
  Layers,
  X,
  CalendarDays,
  Megaphone,
  ArrowLeft,
  ChevronRight,
  Home,
  Activity,
  GraduationCap,
  Building2,
  HeartHandshake,
  UserPlus,
  Grid,
  CheckCircle2,
  Sparkles,
  Library,
  FileText,
  PlayCircle,
  BookMarked,
  Trophy,
  Award,
  Target,
  Compass,
  Wrench,
  ClipboardCheck,
  CheckSquare,
  Crown,
  Flag,
  Bell,
  Database,
} from 'lucide-react';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import { ALL_10_CLASSES, getSubjectsForClass } from '../data/classCurriculumConfig';
import { getAllBoardTextbookSummary, getOfficialTextbooksForBoardClass } from '../data/studyLibrary/textbookLibraryData';
import { getAllWorksheetsForClass } from '../data/worksheetsData';
import { ALL_130_TEACHER_TOOLS } from '../data/teacherTools/teacherToolsCatalog';
import { ALL_ADMIN_CLASSES, ALL_ADMIN_SUBJECTS } from '../utils/adminAnalytics';
import { ALL_BOARDS, getBoardShortLabel } from '../utils/subscriptionAccess';
import {
  ADMIN_MAIN_CATEGORIES,
  getAdminCategoryMeta,
  getAdminSubsectionMeta,
  getSubsectionsForCategory,
  type AdminCategoryId,
  type AdminJumpTarget,
  type AdminSubsectionId,
  type CompletenessBadge,
} from './admin/adminCatalogConfig';
import { AdminGlobalSearchBar } from './admin/AdminGlobalSearchBar';

const AdminQuestionsSection = lazyWithRetry(() =>
  import('./admin/AdminQuestionsSection').then((m) => ({ default: m.AdminQuestionsSection }))
);
const AdminWorksheetsSection = lazyWithRetry(() =>
  import('./admin/AdminWorksheetsSection').then((m) => ({ default: m.AdminWorksheetsSection }))
);
const AdminDuplicatesSection = lazyWithRetry(() =>
  import('./admin/AdminDuplicatesSection').then((m) => ({ default: m.AdminDuplicatesSection }))
);
const AdminStudentsSection = lazyWithRetry(() =>
  import('./admin/AdminStudentsSection').then((m) => ({ default: m.AdminStudentsSection }))
);
const AdminProgressionSection = lazyWithRetry(() =>
  import('./admin/AdminProgressionSection').then((m) => ({ default: m.AdminProgressionSection }))
);
const AdminStoriesSection = lazyWithRetry(() =>
  import('./admin/AdminStoriesSection').then((m) => ({ default: m.AdminStoriesSection }))
);
const AdminDrawingsSection = lazyWithRetry(() =>
  import('./admin/AdminDrawingsSection').then((m) => ({ default: m.AdminDrawingsSection }))
);
const AdminPaymentsSection = lazyWithRetry(() =>
  import('./admin/AdminPaymentsSection').then((m) => ({ default: m.AdminPaymentsSection }))
);
const AdminCricketSection = lazyWithRetry(() =>
  import('./admin/AdminCricketSection').then((m) => ({ default: m.AdminCricketSection }))
);
const AdminScholarshipSection = lazyWithRetry(() =>
  import('./admin/AdminScholarshipSection').then((m) => ({ default: m.AdminScholarshipSection }))
);
const AdminTetCtetSection = lazyWithRetry(() =>
  import('./admin/AdminTetCtetSection').then((m) => ({ default: m.AdminTetCtetSection }))
);
const AdminSettingsSection = lazyWithRetry(() =>
  import('./admin/AdminSettingsSection').then((m) => ({ default: m.AdminSettingsSection }))
);
const AdminProfileSection = lazyWithRetry(() =>
  import('./admin/AdminProfileSection').then((m) => ({ default: m.AdminProfileSection }))
);
const AdminReferralPanel = lazyWithRetry(() =>
  import('./AdminReferralPanel').then((m) => ({ default: m.AdminReferralPanel }))
);
const AdminSupportPanel = lazyWithRetry(() =>
  import('./AdminSupportPanel').then((m) => ({ default: m.AdminSupportPanel }))
);
const AdminQuestionErrorReportsSection = lazyWithRetry(() =>
  import('./admin/AdminQuestionErrorReportsSection').then((m) => ({
    default: m.AdminQuestionErrorReportsSection,
  }))
);
const AdminDemoExamsSection = lazyWithRetry(() =>
  import('./admin/AdminDemoExamsSection').then((m) => ({ default: m.AdminDemoExamsSection }))
);
const AdminStudyLibraryCmsSection = lazyWithRetry(() =>
  import('./admin/AdminStudyLibraryCmsSection').then((m) => ({
    default: m.AdminStudyLibraryCmsSection,
  }))
);
const AdminLessonPlannerSection = lazyWithRetry(() =>
  import('./admin/AdminLessonPlannerSection').then((m) => ({
    default: m.AdminLessonPlannerSection,
  }))
);
const AdminAnnouncementsSection = lazyWithRetry(() =>
  import('./admin/AdminAnnouncementsSection').then((m) => ({
    default: m.AdminAnnouncementsSection,
  }))
);
const AdminAdditionalCurriculumSection = lazyWithRetry(() =>
  import('./admin/AdminAdditionalCurriculumSection').then((m) => ({
    default: m.AdminAdditionalCurriculumSection,
  }))
);
const AdminFiveZonesCmsSection = lazyWithRetry(() =>
  import('./admin/AdminFiveZonesCmsSection').then((m) => ({
    default: m.AdminFiveZonesCmsSection,
  }))
);
const AdminDataCompletenessDashboard = lazyWithRetry(() =>
  import('./admin/AdminDataCompletenessDashboard').then((m) => ({
    default: m.AdminDataCompletenessDashboard,
  }))
);
const AdminExtendedSubsections = lazyWithRetry(() =>
  import('./admin/AdminExtendedSubsections').then((m) => ({
    default: m.AdminExtendedSubsections,
  }))
);
const AdminAiBillingControlSection = lazyWithRetry(() =>
  import('./admin/AdminAiBillingControlSection').then((m) => ({
    default: m.AdminAiBillingControlSection,
  }))
);

type AdminViewLevel = 'home' | 'category' | 'subsection';

const AdminTabSkeleton: React.FC = () => (
  <SectionLoadingFallback label="Loading Administrator module..." />
);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  UserPlus,
  GraduationCap,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Layers,
  Grid,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Library,
  FileText,
  PlayCircle,
  HelpCircle,
  FileSpreadsheet,
  AlertTriangle,
  BookMarked,
  Palette,
  Trophy,
  Award,
  Target,
  Compass,
  Wrench,
  CalendarDays,
  ClipboardCheck,
  CheckSquare,
  Crown,
  CreditCard,
  Gift,
  Activity,
  BarChart3,
  Flag,
  Megaphone,
  LifeBuoy,
  Bell,
  Settings,
  User,
  Database,
};

function renderStatusChip(status: CompletenessBadge) {
  switch (status) {
    case 'GREEN':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
          Complete
        </span>
      );
    case 'YELLOW':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-950 border border-amber-200">
          Partial
        </span>
      );
    case 'BLUE':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-100 text-sky-900 border border-sky-200">
          Audit Needed
        </span>
      );
    default:
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-900 border border-rose-200">
          Missing
        </span>
      );
  }
}

export const AdminDashboard: React.FC = () => {
  const {
    studentsList,
    parentsList,
    allQuestions,
    rejectedDuplicates,
    allStories,
    shivajiStories,
    customScholarshipQuestions,
    gkQuestions,
    learningPrograms,
    sectionVisibility,
    updateSectionVisibility,
    addOrUpdateStory,
    toggleStoryPublished,
    deleteCustomStory,
    addOrUpdateShivajiStory,
    deleteCustomShivajiStory,
    addOrUpdateScholarshipQuestion,
    deleteCustomScholarshipQuestion,
    addOrUpdateGkQuestion,
    deleteCustomGkQuestion,
    addOrUpdateLearningProgram,
    deleteLearningProgram,
    transactions,
    announcements,
    notifications,
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
    ensureContentBankHydrated,
  } = useApp();

  useEffect(() => {
    void ensureContentBankHydrated('all');
  }, [ensureContentBankHydrated]);

  // 3-Level Organized Drilldown Navigation State
  const [viewLevel, setViewLevel] = useState<AdminViewLevel>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<AdminCategoryId>('registration_users');
  const [activeSubsection, setActiveSubsection] = useState<AdminSubsectionId>('students');

  // Independent Education Board & Class Dashboard Switcher
  const [selectedBoardWorkspace, setSelectedBoardWorkspace] = useState<'all' | EducationBoard>('all');
  const [selectedClassWorkspace, setSelectedClassWorkspace] = useState<string>('all');

  // Add Verified Question modal state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [newBoard, setNewBoard] = useState<EducationBoard>('Maharashtra');
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

  const handleOpenAddQuestionModal = useCallback(() => {
    if (selectedBoardWorkspace !== 'all') {
      setNewBoard(selectedBoardWorkspace);
    }
    if (selectedClassWorkspace !== 'all') {
      setNewClass(selectedClassWorkspace as ClassLevel);
    }
    setAddFeedback(null);
    setShowAddQuestionModal(true);
  }, [selectedBoardWorkspace, selectedClassWorkspace]);

  const handleCreateQuestion = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newQuestionText || !newOpt0 || !newOpt1 || !newOpt2 || !newOpt3) {
        setAddFeedback({
          success: false,
          message: 'Please fill in question text and all 4 options.',
        });
        return;
      }

      const diffMap: Record<QuizLevel, 'easy' | 'medium' | 'hard' | 'expert'> = {
        1: 'easy',
        2: 'medium',
        3: 'hard',
        4: 'expert',
      };

      const res = addNewQuestionWithValidation({
        board: newBoard,
        classLevel: newClass,
        subject: newSubject,
        level: newLevel,
        topic: newTopic || 'Core Concept',
        questionType: newQuestionType,
        questionText: newQuestionText,
        options: [newOpt0, newOpt1, newOpt2, newOpt3],
        correctIndex: newCorrectIdx,
        explanation: newExplanation || `Standard learning concept for ${newSubject}.`,
        difficulty: diffMap[newLevel],
      });

      setAddFeedback(res);

      if (res.success) {
        setNewQuestionText('');
        setNewOpt0('');
        setNewOpt1('');
        setNewOpt2('');
        setNewOpt3('');
        setNewExplanation('');
      }
    },
    [
      newQuestionText,
      newOpt0,
      newOpt1,
      newOpt2,
      newOpt3,
      newBoard,
      newClass,
      newSubject,
      newLevel,
      newTopic,
      newQuestionType,
      newCorrectIdx,
      newExplanation,
      addNewQuestionWithValidation,
    ]
  );

  // Navigation handlers
  const handleSelectCategory = useCallback((categoryId: AdminCategoryId) => {
    setActiveCategoryId(categoryId);
    setViewLevel('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenSubsection = useCallback((subsectionId: AdminSubsectionId) => {
    const meta = getAdminSubsectionMeta(subsectionId);
    setActiveCategoryId(meta.categoryId);
    setActiveSubsection(subsectionId);
    setViewLevel('subsection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleJumpToSection = useCallback((target: AdminJumpTarget) => {
    setActiveCategoryId(target.categoryId);
    setActiveSubsection(target.subsectionId);
    if (target.board) setSelectedBoardWorkspace(target.board);
    if (target.classLevel) setSelectedClassWorkspace(target.classLevel);
    setViewLevel('subsection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute live structural counts across all categories & subsections
  const liveMetrics = useMemo(() => {
    const tbSummary = getAllBoardTextbookSummary();
    const totalTextbooks = tbSummary.reduce((s, b) => s + b.totalTextbooks, 0);
    let totalChapters = 0;
    let totalWorksheets = 0;
    let totalSubjects = 0;
    for (const brd of ALL_BOARDS) {
      for (const cls of ALL_10_CLASSES) {
        totalWorksheets += getAllWorksheetsForClass(cls, brd).length;
        totalSubjects += getSubjectsForClass(cls, brd).length;
        totalChapters += getOfficialTextbooksForBoardClass(brd, cls).reduce(
          (acc, tb) => acc + tb.totalChapters,
          0
        );
      }
    }

    const studentsOnly = studentsList.filter((s) => s.accountRole !== 'teacher');
    const teachersOnly = studentsList.filter((s) => s.accountRole === 'teacher');
    const attendanceTotal = studentsList.reduce(
      (s, stu) => s + (stu.attendanceRecords?.length || 0),
      0
    );
    const assignmentsTotal = studentsList.reduce(
      (s, stu) => s + (stu.assignments?.length || 0),
      0
    );
    let schoolsCount = 0;
    try {
      const raw = localStorage.getItem('msz_institutions_v1');
      if (raw) schoolsCount = (JSON.parse(raw) as unknown[]).length;
    } catch {
      schoolsCount = 0;
    }

    const subsectionCounts: Partial<Record<AdminSubsectionId, number>> = {
      students: studentsList.length,
      'student-registration': studentsOnly.length,
      'teachers-directory': teachersOnly.length,
      'schools-directory': schoolsCount,
      'parents-management': parentsList.length,
      'admin-security': 4,
      'boards-management': 3,
      'classes-divisions': 10,
      'subjects-management': totalSubjects,
      'syllabus-registry': 30,
      'additional-curriculum': 13,
      'textbooks-directory': totalTextbooks,
      'chapters-notes-solutions': totalChapters,
      'study-library-cms': totalChapters,
      'papers-videos-inspector': totalSubjects,
      questions: allQuestions.length,
      worksheets: totalWorksheets,
      duplicates: rejectedDuplicates.length,
      stories: allStories.length + shivajiStories.length,
      drawings: drawingTemplates.length,
      cricket: gkQuestions.length,
      scholarship: 600 + customScholarshipQuestions.length,
      'demo-exams': 4,
      'five-zones-cms': 18,
      'teacher-tools-directory': ALL_130_TEACHER_TOOLS.length,
      'lesson-planner': 3,
      'teacher-attendance': attendanceTotal,
      'teacher-assignments': assignmentsTotal,
      'tet-ctet': 200,
      'subscriptions-plans': studentsList.filter((s) => s.plan !== 'free').length,
      payments: transactions.length,
      referrals: studentsList.filter((s) => Boolean(s.referralCode)).length,
      'data-status': 14,
      progression: studentsList.length,
      'question-error-reports': 0,
      announcements: announcements.length,
      support: 1,
      'system-notifications': notifications.length,
      'ai-usage-billing': 83,
      settings: learningPrograms.length,
      profile: 1,
      'system-health': 3,
    };

    const categoryTotals: Record<AdminCategoryId, { label: string; count: number; status: CompletenessBadge }> = {
      registration_users: {
        label: `${studentsList.length} Accounts`,
        count: studentsList.length + parentsList.length + schoolsCount,
        status: schoolsCount > 0 || parentsList.length > 0 ? 'GREEN' : 'YELLOW',
      },
      academic_management: {
        label: `${totalTextbooks} Books · ${totalChapters} Chapters`,
        count: totalTextbooks + totalChapters,
        status: 'GREEN',
      },
      student_learning: {
        label: `${allQuestions.length} Qs · ${totalWorksheets} Worksheets`,
        count: allQuestions.length + totalWorksheets,
        status: 'GREEN',
      },
      teacher_management: {
        label: `${ALL_130_TEACHER_TOOLS.length} Tools · 200 Mocks`,
        count: ALL_130_TEACHER_TOOLS.length + teachersOnly.length,
        status: 'GREEN',
      },
      finance_subscriptions: {
        label: `${transactions.length} Transactions`,
        count: transactions.length,
        status: transactions.length > 0 ? 'GREEN' : 'BLUE',
      },
      reports_analytics: {
        label: '14 Audits Tracked',
        count: 14,
        status: 'GREEN',
      },
      communication: {
        label: `${announcements.length} Notices · ${notifications.length} Alerts`,
        count: announcements.length + notifications.length,
        status: announcements.length > 0 ? 'GREEN' : 'YELLOW',
      },
      website_system: {
        label: `${learningPrograms.length} Featured Programs`,
        count: learningPrograms.length,
        status: 'GREEN',
      },
    };

    return { subsectionCounts, categoryTotals };
  }, [
    studentsList,
    parentsList.length,
    allQuestions.length,
    rejectedDuplicates.length,
    allStories.length,
    shivajiStories.length,
    drawingTemplates.length,
    gkQuestions.length,
    customScholarshipQuestions.length,
    transactions.length,
    announcements.length,
    notifications.length,
    learningPrograms.length,
  ]);

  const activeCategoryMeta = getAdminCategoryMeta(activeCategoryId);
  const activeSubsectionMeta = getAdminSubsectionMeta(activeSubsection);
  const categorySubsections = useMemo(
    () => getSubsectionsForCategory(activeCategoryId),
    [activeCategoryId]
  );

  return (
    <div className="space-y-6 msz-container pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold w-fit mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Administrator Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Platform Management, Curriculum &amp; Data Completeness
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
            Structured 8-Category Administrator Architecture across Registrations, Academic Syllabus,
            Student Content, Teachers, Razorpay Finance, Reports, Communication &amp; System Health.
          </p>
        </div>

        {/* Top Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() =>
              handleJumpToSection({
                categoryId: 'website_system',
                subsectionId: 'ai-usage-billing',
              })
            }
            className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>AI USAGE &amp; BILLING (FREE ONLY)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleJumpToSection({
                categoryId: 'reports_analytics',
                subsectionId: 'data-status',
              })
            }
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>COMPLETE CONTENT &amp; DATA STATUS</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddQuestionModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vetted Question</span>
          </button>
        </div>
      </div>

      {/* Global Role-Scoped Admin Search */}
      <AdminGlobalSearchBar
        studentsList={studentsList}
        parentsList={parentsList}
        allQuestions={allQuestions}
        transactions={transactions}
        onNavigateJump={handleJumpToSection}
      />

      {/* Breadcrumb & Back Navigation Bar (Shown on Level 2 Category & Level 3 Subsection) */}
      {viewLevel !== 'home' && (
        <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Admin Dashboard Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold"
          >
            <button
              type="button"
              onClick={() => setViewLevel('home')}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-amber-700 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Main Dashboard</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

            <button
              type="button"
              onClick={() => setViewLevel('category')}
              className={`cursor-pointer ${
                viewLevel === 'category'
                  ? 'text-slate-900 font-black'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {activeCategoryMeta.title}
            </button>

            {viewLevel === 'subsection' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-amber-800 font-black">{activeSubsectionMeta.title}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {viewLevel === 'subsection' && (
              <button
                type="button"
                onClick={() => setViewLevel('category')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to {activeCategoryMeta.title}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setViewLevel('home')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>All 8 Categories</span>
            </button>
          </div>
        </div>
      )}

      {/* LEVEL 1: LANDING SCREEN WITH ONLY THE 8 MAIN CATEGORY CARDS */}
      {viewLevel === 'home' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2 className="text-base sm:text-lg font-display font-black text-slate-900">
                8 Core Management Categories
              </h2>
              <p className="text-xs text-slate-500">
                Select any category below to inspect its dedicated subsections and live records.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {ADMIN_MAIN_CATEGORIES.length} Categories · 41 Organized Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMIN_MAIN_CATEGORIES.map((cat) => {
              const metrics = liveMetrics.categoryTotals[cat.id];
              const subCount = getSubsectionsForCategory(cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border ${cat.badgeStyle}`}
                      >
                        Category {cat.numberLabel}
                      </span>
                      {renderStatusChip(metrics.status)}
                    </div>

                    <div>
                      <h3 className="text-base font-display font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                        {cat.shortSubtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-black text-slate-900">{metrics.label}</div>
                      <div className="text-[11px] text-slate-500">{subCount} Subsections</div>
                    </div>
                    <span className="inline-flex items-center gap-1 font-black text-amber-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Open</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* LEVEL 2: CATEGORY SCREEN SHOWING INDIVIDUAL SUBSECTION CARDS */}
      {viewLevel === 'category' && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                Category {activeCategoryMeta.numberLabel}
              </span>
              <h2 className="text-xl font-display font-black text-slate-900 mt-0.5">
                {activeCategoryMeta.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">{activeCategoryMeta.description}</p>
            </div>
            <div className="text-xs font-black text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl self-start">
              {categorySubsections.length} Subsections
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySubsections.map((sub) => {
              const IconComp = ICON_MAP[sub.iconName] || FolderIconFallback;
              const liveCount = liveMetrics.subsectionCounts[sub.id];
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleOpenSubsection(sub.id)}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      {renderStatusChip(sub.defaultStatus)}
                    </div>

                    <h3 className="text-sm font-display font-black text-slate-900 group-hover:text-amber-700">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{sub.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 tabular-nums">
                      {typeof liveCount === 'number' ? `${liveCount} Records / Items` : 'Live View'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-black text-slate-900 group-hover:text-amber-700">
                      <span>Open Subsection</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* LEVEL 3: ACTIVE SUBSECTION VIEW */}
      {viewLevel === 'subsection' && (
        <div className="space-y-5">
          {/* Board & Class Scope Filter Bar (rendered when active subsection supports board/class filtering) */}
          {activeSubsectionMeta.usesBoardScope && (
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-amber-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mr-1">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Board Scope:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedBoardWorkspace('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedBoardWorkspace === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  All 3 Boards
                </button>
                {BOARD_META_LIST.map((bm) => {
                  const isActive = selectedBoardWorkspace === bm.id;
                  return (
                    <button
                      type="button"
                      key={bm.id}
                      onClick={() => setSelectedBoardWorkspace(isActive ? 'all' : bm.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      <span>{bm.icon}</span>
                      <span>{bm.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="admin-class-workspace-select"
                  className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600"
                >
                  Class Scope:
                </label>
                <select
                  id="admin-class-workspace-select"
                  value={selectedClassWorkspace}
                  onChange={(e) => setSelectedClassWorkspace(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-hidden focus:border-amber-500 cursor-pointer"
                >
                  <option value="all">All Classes (1st – 10th)</option>
                  {ALL_ADMIN_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {(selectedBoardWorkspace !== 'all' || selectedClassWorkspace !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBoardWorkspace('all');
                      setSelectedClassWorkspace('all');
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Lazily Mounted Active Subsection Only */}
          <Suspense fallback={<AdminTabSkeleton />}>
            {activeSubsection === 'data-status' && (
              <AdminDataCompletenessDashboard onJumpToSection={handleJumpToSection} />
            )}

            {activeSubsection === 'questions' && (
              <AdminQuestionsSection
                allQuestions={allQuestions}
                rejectedDuplicatesCount={rejectedDuplicates.length}
                selectedBoardWorkspace={selectedBoardWorkspace}
                onSelectBoardWorkspace={setSelectedBoardWorkspace}
                selectedClassWorkspace={selectedClassWorkspace}
                onSelectClassWorkspace={setSelectedClassWorkspace}
                onOpenAddQuestionModal={handleOpenAddQuestionModal}
                onUpdateQuestionStatus={updateQuestionStatus}
                onDeleteQuestion={deleteQuestion}
              />
            )}

            {activeSubsection === 'worksheets' && (
              <AdminWorksheetsSection
                selectedBoardWorkspace={selectedBoardWorkspace}
                selectedClassWorkspace={selectedClassWorkspace}
              />
            )}

            {activeSubsection === 'study-library-cms' && (
              <AdminStudyLibraryCmsSection
                selectedBoardWorkspace={selectedBoardWorkspace}
                selectedClassWorkspace={selectedClassWorkspace}
              />
            )}

            {activeSubsection === 'additional-curriculum' && <AdminAdditionalCurriculumSection />}

            {activeSubsection === 'lesson-planner' && (
              <AdminLessonPlannerSection selectedBoardWorkspace={selectedBoardWorkspace} />
            )}

            {activeSubsection === 'duplicates' && (
              <AdminDuplicatesSection
                allQuestions={allQuestions}
                rejectedDuplicates={rejectedDuplicates}
              />
            )}

            {activeSubsection === 'students' && (
              <AdminStudentsSection
                studentsList={studentsList}
                selectedBoardWorkspace={selectedBoardWorkspace}
                onSelectBoardWorkspace={setSelectedBoardWorkspace}
                adminPromoteOrCorrectClass={adminPromoteOrCorrectClass}
                adminApplyApproved365DayMigration={adminApplyApproved365DayMigration}
              />
            )}

            {activeSubsection === 'progression' && (
              <AdminProgressionSection
                studentsList={studentsList}
                selectedBoardWorkspace={selectedBoardWorkspace}
                onSelectBoardWorkspace={setSelectedBoardWorkspace}
                selectedClassWorkspace={selectedClassWorkspace}
                onSelectClassWorkspace={setSelectedClassWorkspace}
              />
            )}

            {activeSubsection === 'stories' && (
              <AdminStoriesSection
                allStories={allStories}
                shivajiStories={shivajiStories}
                onSaveStory={addOrUpdateStory}
                onToggleStoryPublished={toggleStoryPublished}
                onDeleteCustomStory={deleteCustomStory}
                onSaveShivajiStory={addOrUpdateShivajiStory}
                onDeleteCustomShivajiStory={deleteCustomShivajiStory}
              />
            )}

            {activeSubsection === 'drawings' && (
              <AdminDrawingsSection
                drawingTemplates={drawingTemplates}
                savedDrawings={savedDrawings}
                toggleDrawingTemplatePublished={toggleDrawingTemplatePublished}
                deleteDrawingTemplate={deleteDrawingTemplate}
                addDrawingTemplate={addDrawingTemplate}
              />
            )}

            {activeSubsection === 'payments' && (
              <AdminPaymentsSection
                transactions={transactions}
                selectedBoardWorkspace={selectedBoardWorkspace}
                onSelectBoardWorkspace={setSelectedBoardWorkspace}
              />
            )}

            {activeSubsection === 'cricket' && (
              <AdminCricketSection
                gkQuestions={gkQuestions}
                onSaveGkQuestion={addOrUpdateGkQuestion}
                onDeleteGkQuestion={deleteCustomGkQuestion}
              />
            )}

            {activeSubsection === 'scholarship' && (
              <AdminScholarshipSection
                customQuestions={customScholarshipQuestions}
                onSaveCustomQuestion={addOrUpdateScholarshipQuestion}
                onDeleteCustomQuestion={deleteCustomScholarshipQuestion}
              />
            )}

            {activeSubsection === 'tet-ctet' && <AdminTetCtetSection />}

            {activeSubsection === 'demo-exams' && <AdminDemoExamsSection />}

            {activeSubsection === 'question-error-reports' && (
              <AdminQuestionErrorReportsSection />
            )}

            {activeSubsection === 'announcements' && <AdminAnnouncementsSection />}

            {activeSubsection === 'five-zones-cms' && <AdminFiveZonesCmsSection />}

            {activeSubsection === 'ai-usage-billing' && <AdminAiBillingControlSection />}

            {activeSubsection === 'settings' && (
              <AdminSettingsSection
                initialTimers={platformSettings.timers}
                onSaveTimers={updateTimers}
                sectionVisibility={sectionVisibility}
                onSaveSectionVisibility={updateSectionVisibility}
                learningPrograms={learningPrograms}
                onSaveLearningProgram={addOrUpdateLearningProgram}
                onDeleteLearningProgram={deleteLearningProgram}
              />
            )}

            {activeSubsection === 'referrals' && <AdminReferralPanel />}

            {activeSubsection === 'support' && <AdminSupportPanel />}

            {activeSubsection === 'profile' && (
              <AdminProfileSection
                studentsCount={studentsList.length}
                questionsCount={allQuestions.length}
              />
            )}

            {(activeSubsection === 'student-registration' ||
              activeSubsection === 'teachers-directory' ||
              activeSubsection === 'schools-directory' ||
              activeSubsection === 'parents-management' ||
              activeSubsection === 'admin-security' ||
              activeSubsection === 'boards-management' ||
              activeSubsection === 'classes-divisions' ||
              activeSubsection === 'subjects-management' ||
              activeSubsection === 'syllabus-registry' ||
              activeSubsection === 'textbooks-directory' ||
              activeSubsection === 'chapters-notes-solutions' ||
              activeSubsection === 'papers-videos-inspector' ||
              activeSubsection === 'teacher-tools-directory' ||
              activeSubsection === 'teacher-attendance' ||
              activeSubsection === 'teacher-assignments' ||
              activeSubsection === 'subscriptions-plans' ||
              activeSubsection === 'system-notifications' ||
              activeSubsection === 'system-health') && (
              <AdminExtendedSubsections
                subsectionId={activeSubsection}
                selectedBoardWorkspace={selectedBoardWorkspace}
                selectedClassWorkspace={selectedClassWorkspace}
                onJumpToSection={handleJumpToSection}
              />
            )}
          </Suspense>
        </div>
      )}

      {/* ADD NEW QUESTION MODAL WITH DUPLICATE CHECK */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              type="button"
              onClick={() => setShowAddQuestionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-display font-extrabold text-slate-900">
                Add New Curriculum Question
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Verified automatically for uniqueness within the selected Education Board &amp; Class
                pool.
              </p>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Education Board</label>
                  <select
                    value={newBoard}
                    onChange={(e) => setNewBoard(e.target.value as EducationBoard)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ALL_BOARDS.map((b) => (
                      <option key={b} value={b}>
                        {getBoardShortLabel(b)} ({b})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class / Standard</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value as ClassLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ALL_ADMIN_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject Name</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ALL_ADMIN_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Difficulty Level</label>
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
                  <label className="font-bold text-slate-700 block mb-1">
                    Question Format / Type
                  </label>
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
                    <option value="assertion_reasoning">Assertion &amp; Reasoning</option>
                    <option value="picture_based">Picture / Visual Based</option>
                    <option value="number_based">Number Calculation</option>
                    <option value="sequence_pattern">Sequence &amp; Pattern</option>
                    <option value="comprehension">Short Comprehension</option>
                    <option value="real_life_application">Real-Life Application</option>
                    <option value="logical_reasoning">Logical Reasoning</option>
                    <option value="problem_solving">Problem Solving</option>
                    <option value="diagram_identification">Diagram Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Topic / Curriculum Chapter
                  </label>
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
                <label className="font-bold text-slate-700 block">
                  4 Answer Options (Select Correct One):
                </label>
                {[
                  { val: newOpt0, setVal: setNewOpt0, idx: 0 },
                  { val: newOpt1, setVal: setNewOpt1, idx: 1 },
                  { val: newOpt2, setVal: setNewOpt2, idx: 2 },
                  { val: newOpt3, setVal: setNewOpt3, idx: 3 },
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
                <label className="font-bold text-slate-700 block mb-1">
                  Pedagogical Explanation
                </label>
                <input
                  type="text"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Brief child-friendly explanation for the correct answer..."
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                />
              </div>

              {addFeedback && (
                <div
                  className={`p-3 rounded-xl border font-bold text-xs ${
                    addFeedback.success
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border-rose-300'
                  }`}
                >
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
                  Run Validation &amp; Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const FolderIconFallback: React.FC<{ className?: string }> = ({ className }) => (
  <Layers className={className} />
);
