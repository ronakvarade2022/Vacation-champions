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
} from 'lucide-react';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import { ALL_ADMIN_CLASSES, ALL_ADMIN_SUBJECTS } from '../utils/adminAnalytics';
import { ALL_BOARDS, getBoardShortLabel } from '../utils/subscriptionAccess';

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

type AdminSectionId =
  | 'students'
  | 'questions'
  | 'worksheets'
  | 'study-library-cms'
  | 'additional-curriculum'
  | 'lesson-planner'
  | 'announcements'
  | 'progression'
  | 'duplicates'
  | 'stories'
  | 'drawings'
  | 'payments'
  | 'referrals'
  | 'settings'
  | 'cricket'
  | 'scholarship'
  | 'tet-ctet'
  | 'demo-exams'
  | 'question-error-reports'
  | 'support'
  | 'profile';

const AdminTabSkeleton: React.FC = () => (
  <SectionLoadingFallback label="Loading Administrator panel..." />
);

export const AdminDashboard: React.FC = () => {
  const {
    studentsList,
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

  const [activeSection, setActiveSection] = useState<AdminSectionId>('questions');

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

  // Memoized counts for tabs so switching sections is O(1)
  const tabCounts = useMemo(
    () => ({
      questions: allQuestions.length,
      duplicates: rejectedDuplicates.length,
      students: studentsList.length,
      stories: allStories.length,
      drawings: drawingTemplates.length,
      transactions: transactions.length,
    }),
    [
      allQuestions.length,
      rejectedDuplicates.length,
      studentsList.length,
      allStories.length,
      drawingTemplates.length,
      transactions.length,
    ]
  );

  return (
    <div className="space-y-6 msz-container pb-16">
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
            Maintain curriculum standards across Maharashtra, CBSE & ICSE boards, inspect central question IDs, manage worksheets & stories, and verify payments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleOpenAddQuestionModal}
            className="px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vetted Question</span>
          </button>
        </div>
      </div>

      {/* Independent Board & Class Dashboard Workspace Switcher */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-amber-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mr-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Board Dashboard:</span>
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

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white p-2 rounded-2xl border border-amber-200">
        <button
          type="button"
          onClick={() => setActiveSection('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'questions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Question Bank ({tabCounts.questions})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('worksheets')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'worksheets'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Worksheets Bank</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('study-library-cms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'study-library-cms'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Free Study Library CMS &amp; Health</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('additional-curriculum')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'additional-curriculum'
              ? 'bg-indigo-700 text-white shadow-xs'
              : 'text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Additional Curriculum CMS</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('lesson-planner')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'lesson-planner'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-teal-900 bg-teal-50/70 hover:bg-teal-100'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Lesson Planner &amp; Calendars</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('duplicates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'duplicates'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Rejected Duplicates ({tabCounts.duplicates})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('students')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'students'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Students ({tabCounts.students})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('progression')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'progression'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Level Progress Tracking</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('stories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'stories'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Stories &amp; Shivaji ({tabCounts.stories + shivajiStories.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('drawings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'drawings'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Drawing Studio ({tabCounts.drawings})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'payments'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Transactions ({tabCounts.transactions})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('referrals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'referrals'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Referrals & Rewards</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('cricket')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'cricket'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <span>🏏</span>
          <span>GK &amp; Cricket ({gkQuestions.length} Qs)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('scholarship')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'scholarship'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <span>🏆</span>
          <span>MSCE Scholarship</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('tet-ctet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'tet-ctet'
              ? 'bg-indigo-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-indigo-50'
          }`}
        >
          <span>🎓</span>
          <span>TET &amp; CTET (200 Mocks)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('demo-exams')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'demo-exams'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <span>🎯</span>
          <span>Free Demo Mock Tests (4 Tests)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('question-error-reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'question-error-reports'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-rose-50'
          }`}
        >
          <span>🚩</span>
          <span>QUESTION ERROR REPORTS</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('announcements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'announcements'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Live Announcement Ticker</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'settings'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Visibility, Timers &amp; Programs</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('support')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'support'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Help, Grievance & Reports</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'profile'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Supervisor Profile</span>
        </button>
      </div>

      {/* Lazily Mounted Active Section Only (Zero background rendering/heavy data loading for closed tabs) */}
      <Suspense fallback={<AdminTabSkeleton />}>
        {activeSection === 'questions' && (
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

        {activeSection === 'worksheets' && (
          <AdminWorksheetsSection
            selectedBoardWorkspace={selectedBoardWorkspace}
            selectedClassWorkspace={selectedClassWorkspace}
          />
        )}

        {activeSection === 'study-library-cms' && (
          <AdminStudyLibraryCmsSection
            selectedBoardWorkspace={selectedBoardWorkspace}
            selectedClassWorkspace={selectedClassWorkspace}
          />
        )}

        {activeSection === 'additional-curriculum' && <AdminAdditionalCurriculumSection />}

        {activeSection === 'lesson-planner' && (
          <AdminLessonPlannerSection selectedBoardWorkspace={selectedBoardWorkspace} />
        )}

        {activeSection === 'duplicates' && (
          <AdminDuplicatesSection
            allQuestions={allQuestions}
            rejectedDuplicates={rejectedDuplicates}
          />
        )}

        {activeSection === 'students' && (
          <AdminStudentsSection
            studentsList={studentsList}
            selectedBoardWorkspace={selectedBoardWorkspace}
            onSelectBoardWorkspace={setSelectedBoardWorkspace}
            adminPromoteOrCorrectClass={adminPromoteOrCorrectClass}
            adminApplyApproved365DayMigration={adminApplyApproved365DayMigration}
          />
        )}

        {activeSection === 'progression' && (
          <AdminProgressionSection
            studentsList={studentsList}
            selectedBoardWorkspace={selectedBoardWorkspace}
            onSelectBoardWorkspace={setSelectedBoardWorkspace}
            selectedClassWorkspace={selectedClassWorkspace}
            onSelectClassWorkspace={setSelectedClassWorkspace}
          />
        )}

        {activeSection === 'stories' && (
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

        {activeSection === 'drawings' && (
          <AdminDrawingsSection
            drawingTemplates={drawingTemplates}
            savedDrawings={savedDrawings}
            toggleDrawingTemplatePublished={toggleDrawingTemplatePublished}
            deleteDrawingTemplate={deleteDrawingTemplate}
            addDrawingTemplate={addDrawingTemplate}
          />
        )}

        {activeSection === 'payments' && (
          <AdminPaymentsSection
            transactions={transactions}
            selectedBoardWorkspace={selectedBoardWorkspace}
            onSelectBoardWorkspace={setSelectedBoardWorkspace}
          />
        )}

        {activeSection === 'cricket' && (
          <AdminCricketSection
            gkQuestions={gkQuestions}
            onSaveGkQuestion={addOrUpdateGkQuestion}
            onDeleteGkQuestion={deleteCustomGkQuestion}
          />
        )}

        {activeSection === 'scholarship' && (
          <AdminScholarshipSection
            customQuestions={customScholarshipQuestions}
            onSaveCustomQuestion={addOrUpdateScholarshipQuestion}
            onDeleteCustomQuestion={deleteCustomScholarshipQuestion}
          />
        )}

        {activeSection === 'tet-ctet' && <AdminTetCtetSection />}

        {activeSection === 'demo-exams' && <AdminDemoExamsSection />}

        {activeSection === 'question-error-reports' && <AdminQuestionErrorReportsSection />}

        {activeSection === 'announcements' && <AdminAnnouncementsSection />}

        {activeSection === 'settings' && (
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

        {activeSection === 'referrals' && <AdminReferralPanel />}

        {activeSection === 'support' && <AdminSupportPanel />}

        {activeSection === 'profile' && (
          <AdminProfileSection
            studentsCount={studentsList.length}
            questionsCount={allQuestions.length}
          />
        )}
      </Suspense>

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
                Verified automatically for uniqueness within the selected Education Board &amp; Class pool.
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
