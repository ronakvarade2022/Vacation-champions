import React from 'react';
import {
  CheckCircle2,
  GraduationCap,
  Lock,
  LogIn,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';
import { PWAInstallButton } from './PWAInstallButton';

export type HomeScrollTarget =
  | 'home-overview'
  | 'courses-section'
  | 'special-learning-section'
  | 'home-how-it-works'
  | 'home-why-choose-us'
  | 'plans-pricing'
  | 'home-faqs'
  | null;

interface PublicHomeDashboardProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  scrollTarget?: HomeScrollTarget;
  onClearScrollTarget?: () => void;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onNavigateZone: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onOpenAuth: (defaultTab: 'login' | 'register' | 'teacher' | 'admin') => void;
  onOpenPanel: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  isAuthenticated?: boolean;
  currentRole?: 'student' | 'teacher' | 'admin';
  currentUserName?: string;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
}

export const PublicHomeDashboard: React.FC<PublicHomeDashboardProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenDemo,
  onNavigateZone,
  onOpenAuth,
  onOpenPanel,
  onOpenMembership,
  isAuthenticated = false,
  currentRole = 'student',
  currentUserName,
  isDesktopMode = false,
  onToggleViewMode,
  onMenuAction,
  activeMainSection,
  onSelectMainSection,
}) => {
  return (
    <div className={`${isDesktopMode ? 'space-y-8' : 'space-y-10'} pb-12`}>
      {/* SECTION 1: FOCUSED HOME DASHBOARD */}
      <div id="home-overview">
        <ReferenceShowcaseSections
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          onSelectBoard={onSelectBoard}
          onSelectClass={onSelectClass}
          onOpenDemo={(tab) => onOpenDemo(tab || 'live-quiz')}
          onNavigateTab={(tab, subSection, subject) =>
            onNavigateZone(tab, subSection || 'overview', subject)
          }
          onMenuAction={onMenuAction}
          onOpenAuth={onOpenAuth}
          onOpenMembership={(targetClass, targetBoard) =>
            onOpenMembership(targetClass || selectedClass, targetBoard || selectedBoard)
          }
          onStartLearningClick={() => onNavigateZone('all-courses')}
          viewMode={isDesktopMode ? 'desktop' : 'auto'}
          onToggleViewMode={onToggleViewMode}
          activeMainSection={activeMainSection}
          onSelectMainSection={onSelectMainSection}
          progressMetrics={{
            isLoggedIn: false,
            coursesCompleted: 0,
            practiceTests: 0,
            achievements: 0,
            progressPercent: 0,
          }}
        />
      </div>

      {/* DIRECT PWA MOBILE APP INSTALL BANNER */}
      <PWAInstallButton variant="banner" />

      {/* 100% FREE STUDY MATERIAL LIBRARY PUBLIC ENTRY (Classes 1–10 · MH / CBSE / ICSE) */}
      <section
        aria-label="Free Study Material Library"
        className="rounded-3xl bg-slate-900 text-white p-5 sm:p-7 border border-slate-800 shadow-sm space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-300">
              <span>100% Free Forever</span>
              <span aria-hidden="true">·</span>
              <span>No Login Required</span>
              <span aria-hidden="true">·</span>
              <span>Maharashtra · CBSE · ICSE (Classes 1–10)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
              MyStudyZone Free Study Material Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read official textbooks, chapter-wise notes, 1-page revision sheets, 9-format Q&amp;A
              banks, 10-MCQ chapter tests, board model papers, previous year papers, video lessons,
              and 12 Science SVG diagrams free across Classes 1 to 10.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateZone('study-materials', 'chapter_notes')}
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Free Study Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800">
          {[
            { label: 'Official Textbooks (382)', tab: 'textbooks' },
            { label: 'Chapter Notes & Revision', tab: 'chapter_notes' },
            { label: 'Model Papers & PYQs', tab: 'pyq_papers' },
            { label: 'Math, Science & Grammar Hubs', tab: 'science_diagrams' },
          ].map((quick) => (
            <button
              key={quick.tab}
              type="button"
              onClick={() => onNavigateZone('study-materials', quick.tab)}
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left text-xs font-bold text-slate-100 flex items-center justify-between gap-2 cursor-pointer transition-colors"
            >
              <span className="truncate">{quick.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* ROLE-BASED PORTAL ACCESS STRIP (Student · Teacher · Admin) */}
      <section aria-label="Role Access Portals" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Dedicated Portal Sign-In
            </p>
            <h2 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 tracking-tight">
              Student, Teacher &amp; Admin Portals
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Protected by Firebase Authentication &amp; Single-Device Session Security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Student Portal */}
          <div className="bg-white rounded-3xl p-5 border border-indigo-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                  Classes 1–10 Learners
                </span>
              </div>
              <h3 className="text-base font-display font-extrabold text-slate-900">
                Student Portal
              </h3>
              <p className="text-xs text-slate-600">
                Sign in or register to save quiz scores, track progress, and access your unlocked board &amp; class courses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenPanel('student', 'login')}
                className="min-h-[40px] px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isAuthenticated && currentRole === 'student' ? 'Open Portal' : 'Student Login'}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenPanel('student', 'register')}
                className="min-h-[40px] px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* Teacher Portal */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Educator Hub
                </span>
              </div>
              <h3 className="text-base font-display font-extrabold text-slate-900">
                Teacher Portal
              </h3>
              <p className="text-xs text-slate-600">
                Dedicated educator portal for classroom worksheets, chapter study notes, and solved question banks.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenPanel('teacher', 'login')}
                className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>
                  {isAuthenticated && currentRole === 'teacher'
                    ? `Open Teacher Hub (${currentUserName?.split(' ')[0] || 'Active'})`
                    : 'Teacher Login'}
                </span>
              </button>
            </div>
          </div>

          {/* Admin Portal */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Authorized Only</span>
                </span>
              </div>
              <h3 className="text-base font-display font-extrabold text-white">
                Admin Portal
              </h3>
              <p className="text-xs text-slate-300">
                Protected control console for managing students, boards, subscriptions, and platform content.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenPanel('admin', 'login')}
                className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isAuthenticated && currentRole === 'admin'
                    ? 'Open Admin Console'
                    : 'Secure Admin Login'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
