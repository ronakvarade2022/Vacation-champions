import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectMeta,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { getDemoQuestionsForBoardAndClass } from '../data/demoQuestionsData';
import { EDUCATION_ILLUSTRATIONS } from '../data/educationIllustrations';
import {
  formatStandardOrdinal,
  FREE_ALLOWED_SUBJECTS,
  getBoardDisplayName,
  getBoardShortLabel,
} from '../utils/subscriptionAccess';

export type ExplorerZoneType =
  | 'study-material'
  | 'practice-zone'
  | 'exam-zone'
  | 'performance'
  | 'plans';

export interface PublicZoneExplorerViewProps {
  zone: ExplorerZoneType;
  subFocus: string;
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onOpenAuth: (defaultTab: 'login' | 'register') => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onBackHome: () => void;
}

const ZONE_META: Record<
  ExplorerZoneType,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
  }
> = {
  'study-material': {
    eyebrow: 'Study Material Center',
    title: 'Chapter-Wise Notes, Important Questions & Textbook Syllabus',
    subtitle:
      'Preview board-aligned study notes, important questions, and textbook syllabus exclusively for your selected Board & Class.',
  },
  'practice-zone': {
    eyebrow: 'Interactive Practice Zone',
    title: 'MCQs, Chapter-Wise Practice, Worksheets & Daily Brain Drills',
    subtitle:
      'Build mastery through 4-level zero-repetition MCQs, interactive worksheets with explanations, and daily aptitude puzzles.',
  },
  'exam-zone': {
    eyebrow: 'Examination & Scholarship Arena',
    title: 'Mock Tests, Model Papers, Chapter Tests & Exam Practice',
    subtitle:
      'Prepare confidently with timed model sets, assertion-reasoning drills, and board-aligned exam papers.',
  },
  performance: {
    eyebrow: 'Performance & Progress Tracking',
    title: 'Progress Tracking, Test Results & Mastery Analytics',
    subtitle:
      'Track subject-by-subject progression across Levels 1 to 4, quiz accuracy history, daily streaks, and Champion Certificates.',
  },
  plans: {
    eyebrow: 'Transparent Annual Pricing',
    title: 'Free & ₹99/Year Subscription Plans by Board',
    subtitle:
      'Each ₹99 subscription activates full 365-day access for one selected Board and Class independently.',
  },
};

export const PublicZoneExplorerView: React.FC<PublicZoneExplorerViewProps> = ({
  zone,
  subFocus,
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenDemo,
  onOpenAuth,
  onOpenMembership,
  onBackHome,
}) => {
  const boardMeta = useMemo(() => getEducationBoardMeta(selectedBoard), [selectedBoard]);
  const subjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const [previewSubject, setPreviewSubject] = useState<SubjectName>(
    subjects[0] || 'English'
  );
  const [visualError, setVisualError] = useState(false);

  const effectiveSubject = subjects.includes(previewSubject)
    ? previewSubject
    : subjects[0] || 'English';

  const chapters = useMemo(
    () => getStudyMaterialsForSubject(selectedBoard, selectedClass, effectiveSubject),
    [selectedBoard, selectedClass, effectiveSubject]
  );

  const demoQuestions = useMemo(
    () => getDemoQuestionsForBoardAndClass(selectedBoard, selectedClass),
    [selectedBoard, selectedClass]
  );

  const zoneInfo = ZONE_META[zone];
  const subFocusLabel = subFocus.replace(/-/g, ' ');
  const zoneVisual =
    zone === 'study-material'
      ? EDUCATION_ILLUSTRATIONS.studyMaterialStem
      : zone === 'practice-zone'
      ? EDUCATION_ILLUSTRATIONS.practiceZoneWorksheets
      : zone === 'exam-zone'
      ? EDUCATION_ILLUSTRATIONS.examZoneMockTest
      : EDUCATION_ILLUSTRATIONS.boardsCurriculum;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Card with Board & Class Switcher + Educational Visual */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                <span>{zoneInfo.eyebrow}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize text-indigo-200">{subFocusLabel}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold">
                {zoneInfo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {zoneInfo.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onOpenDemo(zone === 'practice-zone' ? 'live-curriculum' : 'live-quiz')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try Free Demo</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs cursor-pointer transition-colors"
              >
                Register Free
              </button>
              <button
                type="button"
                onClick={onBackHome}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs cursor-pointer transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
              {visualError ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-950 to-slate-900 text-slate-200 gap-2">
                  <GraduationCap className="w-8 h-8 text-amber-300" />
                  <p className="text-xs font-extrabold">{zoneInfo.eyebrow}</p>
                </div>
              ) : (
                <img
                  src={zoneVisual.src}
                  alt={zoneVisual.alt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setVisualError(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Strict Board & Class Filter Bar (No cross-board mixing) */}
        <div className="pt-5 border-t border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Active Board &amp; Class Scope:</span>
            </span>
            <span className="text-slate-300">
              Showing exclusively{' '}
              <strong className="text-white">{getBoardDisplayName(selectedBoard)}</strong> ·{' '}
              <strong className="text-amber-300">
                Standard {formatStandardOrdinal(selectedClass)}
              </strong>{' '}
              ({subjects.length} Subjects)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BOARD_META_LIST.map((b) => {
              const active = selectedBoard === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectBoard(b.id)}
                  className={`px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-white text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <span className="text-xs font-extrabold flex items-center gap-2">
                    <span>{b.icon}</span>
                    <span>{b.shortLabel}</span>
                  </span>
                  {active && (
                    <span className="text-[10px] font-black text-emerald-700">Selected</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_10_CLASSES_META.map((c) => {
              const active = selectedClass === c.classLevel;
              return (
                <button
                  key={c.classLevel}
                  type="button"
                  onClick={() => onSelectClass(c.classLevel)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {c.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ZONE 1: STUDY MATERIAL PREVIEW */}
      {zone === 'study-material' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-display font-extrabold text-slate-900">
                  {boardMeta.shortLabel} · {selectedClass} Subjects &amp; Sample Chapter Notes
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Select any subject below to inspect Chapter 1 free preview notes, important questions, and textbook chapter coverage.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700">
                Chapter 1 Free Preview Unlocked
              </span>
            </div>

            {/* Subject Selector */}
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => {
                const isSel = effectiveSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setPreviewSubject(sub)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSel
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {getSubjectMeta(sub, selectedBoard).icon} {sub}
                  </button>
                );
              })}
            </div>

            {/* Chapter Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map((ch, idx) => {
                const isFreePreview =
                  idx === 0 || FREE_ALLOWED_SUBJECTS.includes(effectiveSubject);
                return (
                  <div
                    key={ch.id}
                    className="rounded-2xl p-5 border border-slate-200 bg-slate-50/70 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-amber-800 uppercase">
                          Chapter {ch.chapterNumber} · {ch.subject}
                        </span>
                        <span
                          className={
                            isFreePreview ? 'text-emerald-700' : 'text-slate-500 flex items-center gap-1'
                          }
                        >
                          {!isFreePreview && <Lock className="w-3 h-3" />}
                          {isFreePreview ? 'Preview Included' : 'Full Notes in ₹99 Plan'}
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-base text-slate-900">
                        {ch.chapterTitle}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ch.overview}
                      </p>

                      {isFreePreview && ch.keyPoints.length > 0 && (
                        <ul className="space-y-1 pt-2 border-t border-slate-200 text-xs text-slate-700">
                          {ch.keyPoints.slice(0, 3).map((kp) => (
                            <li key={kp} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/70">
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {ch.solvedExamples.length} Solved Examples · {ch.formulasAndRules.length} Key Rules
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          isFreePreview
                            ? onOpenAuth('login')
                            : onOpenMembership(selectedClass, selectedBoard)
                        }
                        className="text-xs font-extrabold text-amber-800 hover:underline cursor-pointer"
                      >
                        {isFreePreview ? 'Sign In to Read Full Chapter →' : 'Unlock Class (₹99) →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ZONE 2: PRACTICE ZONE PREVIEW */}
      {zone === 'practice-zone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              <Target className="w-4 h-4" />
              <span>MCQ &amp; Chapter-Wise Practice</span>
            </div>
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              {boardMeta.shortLabel} · {selectedClass} 4-Level Practice
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every subject in {selectedClass} progresses through Level 1 Basic, Level 2 Intermediate, Level 3 Advanced, and Level 4 Expert Challenge with zero repeated questions across attempts.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-800">
                Ready to test right now? ({demoQuestions.length} Free Demo Questions for {selectedClass})
              </p>
              <button
                type="button"
                onClick={() => onOpenDemo('live-quiz')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer transition-colors inline-flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch {selectedClass} Demo Quiz</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              <FileText className="w-4 h-4" />
              <span>Online Worksheets &amp; Daily Practice</span>
            </div>
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              {boardMeta.shortLabel} · {selectedClass} Interactive Worksheets
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              2 Demo Worksheets (English &amp; Mathematics) are unlocked free for {selectedClass}. All remaining subjects unlock automatically for 365 days with ₹99 Premium.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenDemo('live-curriculum')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer transition-colors"
              >
                Try 2 Free Demo Worksheets
              </button>
              <button
                type="button"
                onClick={() => onOpenDemo('live-puzzles')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs cursor-pointer transition-colors"
              >
                Daily Sudoku &amp; Brain Riddles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ZONE 3: EXAM ZONE PREVIEW */}
      {zone === 'exam-zone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Award,
              title: 'Mock Tests',
              desc:
                selectedBoard === 'Maharashtra'
                  ? 'Full timed assessments including MSCE Std 4th & 7th Scholarship Mock Tests across 7 languages.'
                  : `${boardMeta.shortLabel} timed subject mock assessments calibrated to ${selectedClass} syllabus depth.`,
            },
            {
              icon: FileText,
              title: 'Model Papers',
              desc: `Board-pattern model sets with step-by-step answer keys for ${selectedClass} ${boardMeta.shortLabel}.`,
            },
            {
              icon: ClipboardCheck,
              title: 'Chapter Tests',
              desc: '10-question diagnostic chapter checks with instant score breakdowns and weak-topic identification.',
            },
            {
              icon: Layers,
              title: 'Examination Practice',
              desc: 'Level 3 & Level 4 analytical drills covering Assertion-Reasoning, Match-the-Following & HOTS.',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenMembership(selectedClass, selectedBoard)}
                  className="text-xs font-extrabold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer self-start"
                >
                  <span>Unlock Exam Access (₹99)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ZONE 4: PERFORMANCE PREVIEW */}
      {zone === 'performance' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
              <TrendingUp className="w-4 h-4" />
              <span>Student Performance &amp; Analytics Dashboard</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Sign In to Track Real-Time Progress, Results &amp; Mastery Charts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every quiz attempt, worksheet score, daily study streak, and Level 1–4 unlock is persisted securely in your Firebase student profile—tracked separately for Maharashtra, CBSE, and ICSE.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer"
              >
                Sign In to View My Analytics
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
              >
                Create Free Account
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[
              { label: 'Level Mastery', val: 'L1 – L4', sub: 'Per Subject & Board' },
              { label: 'Quiz Accuracy', val: 'Live %', sub: 'Attempted Pool Tracker' },
              { label: 'Worksheets Done', val: 'Scored', sub: 'Instant Model Solutions' },
              { label: 'Certificates', val: 'Earned', sub: 'Leaderboard Milestones' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1"
              >
                <p className="text-[11px] font-bold text-slate-500 uppercase">{stat.label}</p>
                <p className="text-xl font-display font-extrabold text-slate-900">{stat.val}</p>
                <p className="text-[11px] text-slate-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ZONE 5: PLANS & PRICING VIEW */}
      {zone === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                {boardMeta.shortLabel} · Free Plan (₹0 Forever)
              </p>
              <p className="text-3xl font-display font-extrabold text-slate-900">
                ₹0 <span className="text-sm font-bold text-emerald-700">/ Lifetime</span>
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes 2 Free Demo Worksheets (English &amp; Mathematics) and 4-level English &amp; Math practice for your selected base class, plus Brain Puzzles and Sudoku.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer"
            >
              Register Free Account
            </button>
          </div>

          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                {boardMeta.shortLabel} · {selectedClass} Annual Premium
              </p>
              <p className="text-3xl font-display font-extrabold text-amber-700">
                ₹99 <span className="text-sm font-bold text-slate-600">/ 365 Days (1 Year)</span>
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                Activates all {subjects.length} subjects, chapter notes, worksheets, mock exams, audio stories, Drawing Studio, Cricket quizzes, AI Skills, and Certificates strictly for{' '}
                <strong>{boardMeta.shortLabel} ({selectedClass})</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenMembership(selectedClass, selectedBoard)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Crown className="w-4 h-4" />
              <span>Activate {boardMeta.shortLabel} {selectedClass} (₹99)</span>
            </button>
          </div>
        </div>
      )}

      {/* Trust Strip */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <span className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Board-isolated content · Razorpay verified payments · Single-device account security</span>
        </span>
        <span className="flex items-center gap-2 font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>2-Question Free Demo available for all 10 classes across all 3 boards</span>
        </span>
      </div>
    </div>
  );
};
