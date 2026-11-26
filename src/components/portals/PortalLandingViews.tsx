import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';
import type { PortalRole } from '../../types';

export interface PortalLandingViewsProps {
  portalRole: Exclude<PortalRole, 'admin'>;
  onSelectPortalRole: (role: Exclude<PortalRole, 'admin'>) => void;
  onLoginPortal: (role: Exclude<PortalRole, 'admin'>) => void;
  onRegisterPortal: (role: Exclude<PortalRole, 'admin'>) => void;
  onExploreResources: (tab: string) => void;
  onBackHome: () => void;
  isSignedInAsThisPortal?: boolean;
  onOpenActiveDashboard?: () => void;
}

interface PortalMetaConfig {
  role: Exclude<PortalRole, 'admin'>;
  title: string;
  subtitle: string;
  badgeText: string;
  accentGradient: string;
  accentBorder: string;
  buttonAccent: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  publicPreviewLabel: string;
  publicPreviewTab: string;
  verificationNote?: string;
}

const PORTAL_CONFIGS: Record<Exclude<PortalRole, 'admin'>, PortalMetaConfig> = {
  student: {
    role: 'student',
    title: 'Student Zone Portal',
    subtitle:
      'Complete school syllabus for Maharashtra, CBSE & ICSE (Classes 1–10), verified chapter notes, textbook exercise solutions, worksheets, 4-level quizzes, AI Tools, and Skill Labs.',
    badgeText: 'Classes 1–10 · Free Library & Mock Prep',
    accentGradient: 'from-slate-900 via-indigo-950 to-slate-900',
    accentBorder: 'border-indigo-500/40',
    buttonAccent: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    icon: GraduationCap,
    highlights: [
      'Board, Medium & Class-isolated Textbooks, Notes (A–L), and Solved Exercises',
      '23+ Interactive Worksheets per subject, Brain Puzzles, Sudoku & Daily GK',
      'Std 4th & 7th MSCE Scholarship Mock Exams & 365-Day ₹99 Class Plans',
      'Access AI Study Studio & Interactive Vedic Maths / Abacus / Phonics Labs',
    ],
    publicPreviewLabel: 'Explore Free Study Library',
    publicPreviewTab: 'study-materials',
  },
  teacher: {
    role: 'teacher',
    title: 'Teacher & Educator Zone Portal',
    subtitle:
      'Dedicated educator command center featuring 130 Teacher Tools, Annual/Monthly/Daily Lesson Planner, MAHA TET & CTET (200 Mocks), Question Paper Builder, and Student Roster.',
    badgeText: '130 Teacher Tools · Planner · TET & CTET',
    accentGradient: 'from-slate-900 via-emerald-950 to-teal-950',
    accentBorder: 'border-emerald-500/40',
    buttonAccent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    icon: Wrench,
    highlights: [
      'All 130 Interactive Classroom Tools with PDF & Print exports',
      'Board-aligned 3-Tab Lesson Planner (Maharashtra, CBSE & ICSE)',
      'MAHA TET & CTET Paper 1 & 2 Exam Prep (200 Full Mock Exams)',
      'Real AI Worksheet, Question Paper, Notes & Presentation Makers',
    ],
    publicPreviewLabel: 'Preview TET & CTET Mocks',
    publicPreviewTab: 'tet-ctet',
  },
  parent: {
    role: 'parent',
    title: 'Parent & Family Zone Portal',
    subtitle:
      'Monitor your linked child’s attendance, homework feedback, worksheet mastery, and read research-backed parenting guides tailored from Classes 1 to 10.',
    badgeText: 'Verified Child Progress · Parenting Guides',
    accentGradient: 'from-slate-900 via-rose-950 to-indigo-950',
    accentBorder: 'border-rose-500/40',
    buttonAccent: 'bg-rose-600 hover:bg-rose-700 text-white',
    icon: HeartHandshake,
    highlights: [
      'Secure email + mobile child verification (zero duplicate student accounts)',
      'Live attendance, homework grades, and subject quiz mastery overview',
      'Direct Parent–Teacher communication & observation notes log',
      'Structured parenting & home-study habit guides (always free to read)',
    ],
    publicPreviewLabel: 'Read Parenting Guides',
    publicPreviewTab: 'parent-zone',
  },
  school_admin: {
    role: 'school_admin',
    title: 'School & College Zone Portal',
    subtitle:
      'Isolated multi-tenant campus ERP for Schools (Std 1–10), Junior Colleges (Std 11–12), and Degree Colleges with rosters, academic years, GPA report cards, and notices.',
    badgeText: 'Multi-Tenant Campus ERP & Practical Manuals',
    accentGradient: 'from-slate-900 via-sky-950 to-indigo-950',
    accentBorder: 'border-sky-500/40',
    buttonAccent: 'bg-sky-700 hover:bg-sky-800 text-white',
    icon: Building2,
    highlights: [
      'Classes, Divisions & Departments setup with Academic Year management',
      'Tenant-partitioned Student & Faculty Rosters + Session Attendance',
      'Marks Entry, GPA Computation & Real PDF Report Card Generation',
      'Campus Circulars + Verified Practical Lab & Viva Manuals',
    ],
    publicPreviewLabel: 'Browse Practical & Viva Manuals',
    publicPreviewTab: 'school-college-zone',
    verificationNote: 'New institutions start as PENDING_VERIFICATION until reviewed by platform administration.',
  },
  institute_admin: {
    role: 'institute_admin',
    title: 'Coaching & Skill Institute Zone Portal',
    subtitle:
      'Run Abacus Centres, Vedic Maths Academies & Coaching Classes with batch schedules, trainers, fee ledgers, and real PDF certificates — alongside 18 self-paced skill tracks.',
    badgeText: '18 Skill Programs + Academy ERP',
    accentGradient: 'from-slate-900 via-indigo-950 to-amber-950',
    accentBorder: 'border-amber-500/40',
    buttonAccent: 'bg-amber-500 hover:bg-amber-600 text-slate-950',
    icon: Sparkles,
    highlights: [
      'Isolated Batches, Trainer Assignments & Custom Course Management',
      'Daily Batch Attendance, Fee Collection Ledger & Pending Balance tracking',
      'Course Learning Materials, Quizzes & Printable PDF Completion Certificates',
      'Direct Independent Learner track for Vedic Maths, Abacus & Phonics',
    ],
    publicPreviewLabel: 'Explore 18 Skill Programs',
    publicPreviewTab: 'coaching-zone',
    verificationNote: 'Academy accounts launch with PENDING_VERIFICATION status for transparent listing.',
  },
};

const PORTAL_TABS: Array<{ role: Exclude<PortalRole, 'admin'>; label: string }> = [
  { role: 'student', label: '1. Student' },
  { role: 'teacher', label: '2. Teacher' },
  { role: 'parent', label: '3. Parent' },
  { role: 'school_admin', label: '4. School & College' },
  { role: 'institute_admin', label: '5. Coaching Institute' },
];

export const PortalLandingViews: React.FC<PortalLandingViewsProps> = ({
  portalRole,
  onSelectPortalRole,
  onLoginPortal,
  onRegisterPortal,
  onExploreResources,
  onBackHome,
  isSignedInAsThisPortal = false,
  onOpenActiveDashboard,
}) => {
  const config = PORTAL_CONFIGS[portalRole] || PORTAL_CONFIGS.student;
  const Icon = config.icon;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Portal Switcher & Back Home */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Home</span>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {PORTAL_TABS.map((t) => {
            const active = t.role === portalRole;
            return (
              <button
                key={t.role}
                type="button"
                onClick={() => onSelectPortalRole(t.role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer border transition-colors ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dedicated Hero Card */}
      <section
        className={`rounded-3xl bg-gradient-to-br ${config.accentGradient} text-white p-6 sm:p-10 shadow-xl border ${config.accentBorder} space-y-6`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
            <Icon className="w-4 h-4" />
            <span>{config.badgeText}</span>
          </div>
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Isolated Role Portal · Zero Feature Clutter</span>
          </span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight leading-tight">
            {config.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{config.subtitle}</p>
        </div>

        {config.verificationNote && (
          <div className="px-4 py-2.5 rounded-2xl bg-amber-400/15 border border-amber-300/30 text-amber-100 text-xs font-semibold max-w-2xl">
            Verification Policy: {config.verificationNote}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {isSignedInAsThisPortal && onOpenActiveDashboard ? (
            <button
              type="button"
              onClick={onOpenActiveDashboard}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>Open My {config.title.replace(' Portal', '')} Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onLoginPortal(portalRole)}
                className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm cursor-pointer flex items-center gap-2 shadow-md transition-all ${config.buttonAccent}`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login to {config.title.replace(' Portal', '')}</span>
              </button>

              <button
                type="button"
                onClick={() => onRegisterPortal(portalRole)}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm cursor-pointer flex items-center gap-2 shadow-sm transition-all"
              >
                <UserPlus className="w-4 h-4 text-indigo-700" />
                <span>Register New Account</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => onExploreResources(config.publicPreviewTab)}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm cursor-pointer flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>{config.publicPreviewLabel}</span>
          </button>
        </div>
      </section>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>What This Dedicated Portal Includes</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {config.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Interactive Tools &amp; Skill Studios</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Access our AI Study &amp; Educator Tools Studio (powered by Gemini when configured) and our hands-on Vedic Maths, Japanese Soroban Abacus &amp; 4-Level Phonics Audio Lab.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => onExploreResources('ai-tools')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black cursor-pointer"
            >
              Open 10 AI Tools Studio
            </button>
            <button
              type="button"
              onClick={() => onExploreResources('core-skills-lab')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
            >
              Open Vedic / Abacus / Phonics Lab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
