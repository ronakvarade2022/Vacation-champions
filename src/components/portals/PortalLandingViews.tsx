import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LogIn,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import type { PortalRegisterRole } from '../AuthModal';

export interface PortalLandingViewProps {
  portalRole: PortalRegisterRole;
  onSelectPortalRole?: (role: PortalRegisterRole) => void;
  onSelectPortal?: (role: PortalRegisterRole) => void;
  onLoginPortal: (role: PortalRegisterRole) => void;
  onRegisterPortal: (role: PortalRegisterRole) => void;
  onExploreResources: (targetTab: string) => void;
  isSignedInAsThisPortal?: boolean;
  onOpenActiveDashboard?: () => void;
  onBackHome?: () => void;
}

interface PortalCategoryCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
  details: string[];
  actionLabel: string;
  targetTab?: string;
  requiresAuth?: boolean;
}

interface PortalDefinition {
  role: PortalRegisterRole;
  portalName: string;
  tagline: string;
  description: string;
  icon: string;
  headerGradient: string;
  cardBorderHover: string;
  accentText: string;
  categories: PortalCategoryCard[];
}

const PORTAL_DEFINITIONS: Record<PortalRegisterRole, PortalDefinition> = {
  student: {
    role: 'student',
    portalName: 'Student Portal',
    tagline: 'Study • Practice • Grow',
    description: 'Classes 1–10 study materials, worksheets, quizzes, video lessons & trilingual dictionary.',
    icon: '🎓',
    headerGradient: 'from-sky-600 via-blue-600 to-indigo-800',
    cardBorderHover: 'hover:border-sky-500',
    accentText: 'text-sky-700',
    categories: [
      {
        id: 'study',
        icon: '📘',
        title: 'Study Materials',
        description: 'Textbooks, chapter notes & exercise solutions',
        badge: 'Classes 1–10',
        details: [
          'Board-wise and class-wise textbook chapters',
          'Topic-wise notes and solved textbook exercises',
          'Printable A4 revision sheets and question banks',
        ],
        actionLabel: 'Open Study Materials',
        targetTab: 'study-materials',
      },
      {
        id: 'worksheets',
        icon: '📝',
        title: 'Practice Worksheets',
        description: 'Subject-wise printable & interactive worksheets',
        badge: 'All Subjects',
        details: [
          'Chapter-wise practice sheets for daily revision',
          'Instant answer verification and score tracking',
          'Downloadable PDF format for home practice',
        ],
        actionLabel: 'Open Worksheets',
        targetTab: 'worksheets',
      },
      {
        id: 'quiz',
        icon: '🎯',
        title: 'Online Exams & Quizzes',
        description: '4-level chapter quizzes & timed mock exams',
        badge: 'Interactive',
        details: [
          'Easy, Medium, Hard, and Expert difficulty levels',
          'Instant performance report with explanations',
          'Earn points and certificates on completion',
        ],
        actionLabel: 'Open Online Exams',
        targetTab: 'demo-mock-tests',
      },
      {
        id: 'dictionary',
        icon: '📖',
        title: 'Trilingual Dictionary',
        description: 'English • Marathi • Hindi meanings & usage',
        badge: '3 Languages',
        details: [
          'Instant single-word search across 3 languages',
          'Pronunciation, grammar, synonyms, and antonyms',
          'Student-friendly example sentences',
        ],
        actionLabel: 'Open Dictionary',
        targetTab: 'trilingual-dictionary',
      },
    ],
  },
  teacher: {
    role: 'teacher',
    portalName: 'Teacher Portal',
    tagline: 'Plan • Teach • Assess',
    description: 'Dedicated workspace for school educators & TET/CTET aspirants with lesson planners and assessment tools.',
    icon: '👩‍🏫',
    headerGradient: 'from-emerald-600 via-green-600 to-teal-800',
    cardBorderHover: 'hover:border-emerald-500',
    accentText: 'text-emerald-700',
    categories: [
      {
        id: 'lesson-planner',
        icon: '📅',
        title: 'Academic Lesson Planner',
        description: 'Annual, monthly & daily structured lesson plans',
        badge: 'Auto-Scheduled',
        details: [
          'Board-aligned annual, monthly, and daily teaching plans',
          'Automatic holiday and working-day adjustment',
          'One-click A4 PDF export for school submission',
        ],
        actionLabel: 'Open Lesson Planner',
        targetTab: 'lesson-planner',
        requiresAuth: true,
      },
      {
        id: 'paper-generator',
        icon: '📝',
        title: 'Worksheet & Question Paper Creator',
        description: 'Generate unit tests, term papers & answer keys',
        badge: 'Print Ready',
        details: [
          'Create custom unit tests and term exam papers',
          'Balanced question formats (MCQ, short & long answer)',
          'Instant printable question paper and marking scheme',
        ],
        actionLabel: 'Open Paper Creator',
        targetTab: 'worksheets',
      },
      {
        id: 'teaching-notes',
        icon: '📚',
        title: 'Classroom Teaching Notes (Std 1–10)',
        description: 'Board-wise chapter notes, diagrams & solutions',
        badge: '3 Boards',
        details: [
          'Complete Maharashtra State Board, CBSE & ICSE syllabus',
          'Solved textbook exercises and classroom notebook tasks',
          'Science diagrams, math formulas, and grammar hubs',
        ],
        actionLabel: 'Browse Teaching Notes',
        targetTab: 'study-materials',
      },
      {
        id: 'tet-ctet-prep',
        icon: '🎓',
        title: 'MAHA TET & CTET Exam Hub',
        description: 'Paper 1 & Paper 2 pedagogy notes & mock exams',
        badge: 'Teacher Exams',
        details: [
          'Child Development & Pedagogy (CDP) structured notes',
          'MAHA TET & CTET Paper I and Paper II practice tests',
          'Subject-specific teaching methodology modules',
        ],
        actionLabel: 'Open TET & CTET Hub',
        targetTab: 'tet-ctet',
      },
      {
        id: 'quiz-assessments',
        icon: '🎯',
        title: 'Student Quiz & Test Bank',
        description: 'Chapter-wise objective quizzes for classroom practice',
        badge: 'Assessment',
        details: [
          'Ready-to-use 4-level chapter quizzes across subjects',
          'Track accuracy and question-level explanations',
          'Ideal for classroom revision and oral tests',
        ],
        actionLabel: 'Explore Quiz Bank',
        targetTab: 'demo-mock-tests',
      },
      {
        id: 'teacher-tools',
        icon: '✨',
        title: 'Educator Productivity Tools',
        description: 'Smart teaching utilities & document PDF studio',
        badge: 'Smart Tools',
        details: [
          'Create lesson summaries, rubrics, and study handouts',
          'Convert and format classroom documents into clean PDFs',
          'Trilingual dictionary and daily assembly thoughts',
        ],
        actionLabel: 'Open Educator Tools',
        targetTab: 'ai-tools',
      },
    ],
  },
  parent: {
    role: 'parent',
    portalName: 'Parent Portal',
    tagline: 'Monitor • Support • Encourage',
    description: 'Dedicated parent dashboard to monitor your child’s daily study progress, test scores, and learning milestones.',
    icon: '👨‍👩‍👧',
    headerGradient: 'from-fuchsia-600 via-purple-600 to-indigo-900',
    cardBorderHover: 'hover:border-fuchsia-500',
    accentText: 'text-fuchsia-700',
    categories: [
      {
        id: 'child-progress',
        icon: '📈',
        title: 'Child Academic Progress',
        description: 'Monitor subject-wise chapter completion & mastery',
        badge: 'Live Tracking',
        details: [
          'View completed chapters and active study subjects',
          'Track weekly consistency and learning milestones',
          'Support multiple children from a single parent account',
        ],
        actionLabel: 'Login to View Child Progress',
        requiresAuth: true,
      },
      {
        id: 'test-reports',
        icon: '🎯',
        title: 'Exam & Quiz Scorecards',
        description: 'Review test performance, accuracy & weak areas',
        badge: 'Score Reports',
        details: [
          'Detailed quiz scorecards with subject-wise accuracy',
          'Identify topics that need extra revision at home',
          'View earned certificates and leaderboard standing',
        ],
        actionLabel: 'Login to View Scorecards',
        requiresAuth: true,
      },
      {
        id: 'homework-status',
        icon: '📝',
        title: 'Worksheet & Homework Tracker',
        description: 'Check daily practice sheets & notebook exercises',
        badge: 'Daily Practice',
        details: [
          'Review completed practice worksheets and exercises',
          'Access printable revision sheets for home guidance',
          'Verify chapter-wise class notebook completion',
        ],
        actionLabel: 'Login to Check Homework',
        requiresAuth: true,
      },
      {
        id: 'attendance-activity',
        icon: '📅',
        title: 'Study Routine & Activity Log',
        description: 'Track daily learning time & active study days',
        badge: 'Daily Log',
        details: [
          'Monitor daily study streaks and recent learning sessions',
          'Encourage regular study habits with clear goal tracking',
          'Safe, distraction-free educational environment',
        ],
        actionLabel: 'Login to View Activity Log',
        requiresAuth: true,
      },
      {
        id: 'parent-notices',
        icon: '💬',
        title: 'Teacher Feedback & Notices',
        description: 'View educator remarks & important academic updates',
        badge: 'Communication',
        details: [
          'Receive direct academic remarks and progress notes',
          'Stay informed about exam schedules and scholarship dates',
          'Simple, transparent parent-educator communication',
        ],
        actionLabel: 'Login to View Notices',
        requiresAuth: true,
      },
      {
        id: 'link-child',
        icon: '🔗',
        title: 'Link Child Student Account',
        description: 'Connect your child’s registered email or mobile',
        badge: 'Easy Setup',
        details: [
          'Link your child’s existing Student Portal account in seconds',
          'No duplicate student registration required',
          'Secure verification using registered student email & mobile',
        ],
        actionLabel: 'Register / Link Child Account',
        requiresAuth: true,
      },
    ],
  },
  school_admin: {
    role: 'school_admin',
    portalName: 'College Portal',
    tagline: 'Manage • Track • Excel',
    description: 'Isolated institutional workspace for schools and junior/degree colleges to manage divisions, faculty, and academic reports.',
    icon: '🏛️',
    headerGradient: 'from-amber-500 via-orange-600 to-red-800',
    cardBorderHover: 'hover:border-orange-500',
    accentText: 'text-orange-700',
    categories: [
      {
        id: 'classes-divisions',
        icon: '🏛️',
        title: 'Classes, Streams & Divisions',
        description: 'Organize academic standards, divisions & batches',
        badge: 'Campus Setup',
        details: [
          'Configure classes, divisions, and academic streams',
          'Manage board affiliations (State Board, CBSE, ICSE)',
          'Structured academic year and term administration',
        ],
        actionLabel: 'Login to Manage Divisions',
        requiresAuth: true,
      },
      {
        id: 'faculty-allocation',
        icon: '👩‍🏫',
        title: 'Faculty & Subject Allocation',
        description: 'Assign subject teachers & monitor syllabus progress',
        badge: 'Faculty Hub',
        details: [
          'Maintain complete teaching faculty directory',
          'Allocate subjects and divisions to faculty members',
          'Track annual and monthly lesson plan completion',
        ],
        actionLabel: 'Login to Faculty Hub',
        requiresAuth: true,
      },
      {
        id: 'student-roster',
        icon: '🎓',
        title: 'Student Directory & Admissions',
        description: 'Manage enrolled students across classes & divisions',
        badge: 'Student Records',
        details: [
          'Centralized division-wise student enrollment roster',
          'Track active student accounts and academic participation',
          'Export clean division lists and academic reports',
        ],
        actionLabel: 'Login to Student Roster',
        requiresAuth: true,
      },
      {
        id: 'academic-calendar',
        icon: '📅',
        title: 'Institutional Calendar & Timetable',
        description: 'Manage working days, holidays & exam schedules',
        badge: 'Schedule',
        details: [
          'Set institutional working days, holidays, and exam windows',
          'Synchronize academic calendar with teacher lesson planners',
          'Plan unit tests, term exams, and practical schedules',
        ],
        actionLabel: 'Login to Calendar Setup',
        requiresAuth: true,
      },
      {
        id: 'exam-analytics',
        icon: '📊',
        title: 'Examination & Result Analytics',
        description: 'Division-wise performance & assessment reports',
        badge: 'Analytics',
        details: [
          'Monitor class-wise and subject-wise assessment averages',
          'Identify top performers and subjects needing attention',
          'Download institutional academic summary reports',
        ],
        actionLabel: 'Login to Result Analytics',
        requiresAuth: true,
      },
      {
        id: 'campus-circulars',
        icon: '📢',
        title: 'Campus Notices & Circulars',
        description: 'Publish official announcements for staff & students',
        badge: 'Circulars',
        details: [
          'Broadcast academic notices to teachers, students & parents',
          'Share exam timetables, holiday notices, and circulars',
          'Maintain organized digital notice board archives',
        ],
        actionLabel: 'Login to Publish Notices',
        requiresAuth: true,
      },
    ],
  },
  institute_admin: {
    role: 'institute_admin',
    portalName: 'Institute Portal',
    tagline: 'Organize • Guide • Excel',
    description: 'Dedicated portal for coaching institutes, tuition classes, and skill academies to manage batches, tests, and certificates.',
    icon: '🏫',
    headerGradient: 'from-teal-600 via-cyan-600 to-slate-900',
    cardBorderHover: 'hover:border-teal-500',
    accentText: 'text-teal-700',
    categories: [
      {
        id: 'coaching-batches',
        icon: '🏫',
        title: 'Coaching Batches & Timings',
        description: 'Create and manage weekday & weekend study batches',
        badge: 'Batch Manager',
        details: [
          'Organize foundation, board exam, and skill batches',
          'Assign batch timings, capacity, and active students',
          'Track batch-wise attendance and syllabus coverage',
        ],
        actionLabel: 'Login to Manage Batches',
        requiresAuth: true,
      },
      {
        id: 'mock-test-series',
        icon: '🎯',
        title: 'Mock Test Series & Rankings',
        description: 'Conduct chapter tests, scholarship mocks & rank lists',
        badge: 'Test Series',
        details: [
          'Schedule subject-wise and full-length mock exams',
          'Automated scoring, rank lists, and performance analysis',
          'Ideal for board exam, scholarship, and Olympiad coaching',
        ],
        actionLabel: 'Login to Test Series Hub',
        requiresAuth: true,
      },
      {
        id: 'skill-programs',
        icon: '🧮',
        title: 'Skill Academy Programs',
        description: 'Abacus, Vedic Maths, Phonics & Spoken English labs',
        badge: '18 Programs',
        details: [
          'Interactive Japanese Soroban Abacus & Vedic Maths drills',
          '4-Level English Phonics and vocabulary development',
          'Level-wise student progression and practice modules',
        ],
        actionLabel: 'Explore Skill Labs',
        targetTab: 'core-skills-lab',
      },
      {
        id: 'trainer-faculty',
        icon: '👨‍🏫',
        title: 'Trainer & Faculty Roster',
        description: 'Manage institute trainers & batch assignments',
        badge: 'Trainers',
        details: [
          'Maintain trainer profiles and subject specializations',
          'Allocate trainers to active coaching and skill batches',
          'Monitor session completion and batch feedback',
        ],
        actionLabel: 'Login to Trainer Roster',
        requiresAuth: true,
      },
      {
        id: 'fee-ledger',
        icon: '💳',
        title: 'Enrollment & Fee Ledger',
        description: 'Track student admissions, fee plans & installments',
        badge: 'Accounts',
        details: [
          'Record student enrollments and course fee structures',
          'Track paid installments, pending dues, and receipts',
          'Export clean batch-wise enrollment and fee summaries',
        ],
        actionLabel: 'Login to Fee Ledger',
        requiresAuth: true,
      },
      {
        id: 'institute-certificates',
        icon: '📜',
        title: 'Course Completion Certificates',
        description: 'Generate verifiable certificates for completed courses',
        badge: 'Certificates',
        details: [
          'Issue official course and level completion certificates',
          'Includes student name, program level, grade, and date',
          'Print-ready A4 certificate layout for award ceremonies',
        ],
        actionLabel: 'Login to Issue Certificates',
        requiresAuth: true,
      },
    ],
  },
};

export const PortalLandingViews: React.FC<PortalLandingViewProps> = ({
  portalRole,
  onLoginPortal,
  onRegisterPortal,
  onExploreResources,
  isSignedInAsThisPortal,
  onOpenActiveDashboard,
  onBackHome,
}) => {
  const portal = PORTAL_DEFINITIONS[portalRole] || PORTAL_DEFINITIONS.teacher;
  const [selectedCategory, setSelectedCategory] = useState<PortalCategoryCard | null>(null);

  // ==================== FULL-SCREEN CATEGORY DETAIL VIEW (ONE SECTION OPEN AT A TIME) ====================
  if (selectedCategory) {
    return (
      <div className="space-y-5 animate-in fade-in duration-200">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between gap-3 bg-white rounded-2xl p-3.5 sm:px-5 border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {portal.portalName}</span>
          </button>
          <div className="text-xs sm:text-sm font-black text-slate-700 truncate">
            {portal.portalName} • {selectedCategory.title}
          </div>
        </div>

        {/* Selected Category Full-Screen Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden">
          <div className={`bg-gradient-to-r ${portal.headerGradient} text-white p-6 sm:p-8`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-4xl shrink-0">
                {selectedCategory.icon}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                  {portal.portalName} • {selectedCategory.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                  {selectedCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 mt-1">
                  {selectedCategory.description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-3">
                Key Features in This Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {selectedCategory.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                {selectedCategory.targetTab && !selectedCategory.requiresAuth ? (
                  <button
                    type="button"
                    onClick={() => onExploreResources(selectedCategory.targetTab!)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    <span>{selectedCategory.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : isSignedInAsThisPortal && onOpenActiveDashboard ? (
                  <button
                    type="button"
                    onClick={onOpenActiveDashboard}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    <span>Open in {portal.portalName} Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => onLoginPortal(portal.role)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{portal.portalName} Login</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRegisterPortal(portal.role)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Register {portal.portalName}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN PORTAL DASHBOARD (MAIN CATEGORY CARDS ONLY) ====================
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {onBackHome && (
        <div className="flex items-center justify-between gap-3 bg-white rounded-2xl p-3 sm:px-5 border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </button>
          <span className="text-xs sm:text-sm font-black text-slate-700">
            {portal.portalName} Dashboard
          </span>
        </div>
      )}

      {/* 1. COMPACT PORTAL APP HEADER */}
      <section className={`rounded-3xl bg-gradient-to-r ${portal.headerGradient} text-white p-5 sm:p-7 shadow-lg`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border-2 border-white/30 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {portal.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                  {portal.portalName}
                </span>
                <span className="text-xs font-extrabold text-white/90">
                  {portal.tagline}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-1">
                Welcome to {portal.portalName}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5 max-w-2xl">
                {portal.description}
              </p>
            </div>
          </div>

          {/* Dedicated Portal Login & Register Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isSignedInAsThisPortal && onOpenActiveDashboard ? (
              <button
                type="button"
                onClick={onOpenActiveDashboard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md cursor-pointer"
              >
                <span>Open Active Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onLoginPortal(portal.role)}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{portal.portalName} Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRegisterPortal(portal.role)}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN CATEGORY CARDS ONLY */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>{portal.portalName} Main Categories</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Click any category card below to open that section
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portal.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`group rounded-3xl bg-white border-2 border-slate-200 ${portal.cardBorderHover} p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between gap-4 cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
                    {cat.badge}
                  </span>
                </div>
                <h3 className={`text-base sm:text-lg font-black text-slate-900 group-hover:${portal.accentText} leading-snug`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className={`pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold ${portal.accentText}`}>
                <span>Open Category</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
