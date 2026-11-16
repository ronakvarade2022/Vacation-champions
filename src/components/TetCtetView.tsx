import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  Layers,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TetCtetModuleId } from '../types/tetCtet';
import {
  TET_CTET_MODULE_LIST,
  TET_CTET_MODULES,
  TET_CTET_TOTAL_MOCKS,
  TET_CTET_TOTAL_QUESTIONS_BANK,
} from '../data/tetCtetSyllabi';
import { TetCtetModuleSubTab, TetCtetModuleView } from './TetCtetModuleView';

const TetCtetEmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="tetHubBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#312E81" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#tetHubBg)" />
    <path
      d="M16 44C16 40 27 38 40 43C53 38 64 40 64 44V61C64 61 53 57 40 62C27 57 16 61 16 61V44Z"
      fill="#FFFFFF"
      stroke="#93C5FD"
      strokeWidth="2"
    />
    <path d="M40 43V62" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="40,14 12,26 40,38 68,26" fill="#FACC15" />
    <path d="M25 31.5V39C25 41.5 31.5 44 40 44C48.5 44 55 41.5 55 39V31.5" fill="#FDE047" />
    <path d="M63 28V40" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="63" cy="41.5" r="2.8" fill="#FDE047" />
  </svg>
);

export const TetCtetView: React.FC = () => {
  const { tetCtetAttempts, tetCtetBatches } = useApp();
  const [selectedModule, setSelectedModule] = useState<TetCtetModuleId | null>(null);
  const [initialSubTab, setInitialSubTab] = useState<TetCtetModuleSubTab>('mock-tests');

  const openModule = (moduleId: TetCtetModuleId, subTab: TetCtetModuleSubTab = 'mock-tests') => {
    setInitialSubTab(subTab);
    setSelectedModule(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const liveStats = useMemo(() => {
    const publishedTests = Object.values(tetCtetBatches).reduce(
      (sum, b) => sum + (b.published ? b.totalTests : 0),
      0
    );
    const totalAttempts = tetCtetAttempts.length;
    const bestPct = totalAttempts > 0 ? Math.max(...tetCtetAttempts.map((a) => a.percentage)) : 0;
    const qualifiedCount = tetCtetAttempts.filter((a) => a.qualified).length;
    return { publishedTests, totalAttempts, bestPct, qualifiedCount };
  }, [tetCtetAttempts, tetCtetBatches]);

  if (selectedModule) {
    return (
      <TetCtetModuleView
        moduleId={selectedModule}
        initialSubTab={initialSubTab}
        onSelectModule={(nextId) => setSelectedModule(nextId)}
        onBackToLanding={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* =====================================================================
          HERO BANNER: TET & CTET EXAM PREPARATION HUB
          ===================================================================== */}
      <section
        aria-label="TET and CTET Exam Preparation Overview"
        className="rounded-3xl bg-gradient-to-br from-[#0F2952] via-[#1E3A8A] to-[#312E81] text-white p-6 sm:p-8 shadow-lg border border-indigo-400/30"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
            <TetCtetEmblemSvg className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 drop-shadow-md" />
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Teacher Eligibility Test Studio · MSCE Pune &amp; CBSE New Delhi
              </p>
              <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white leading-tight [text-wrap:balance]">
                TET &amp; CTET Exam Preparation
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
                Complete CBT practice ecosystem for MAHA TET (Paper 1 &amp; Paper 2) and CTET (Paper 1 &amp; Paper 2) featuring 200 full-length mock tests, 30,000 original bilingual/multilingual questions, subject drills, official syllabi, and instant progress charts.
              </p>
            </div>
          </div>

          {/* Quantified Overview Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
              <span className="text-[11px] font-semibold text-blue-200 block">Mock Test Series</span>
              <span className="text-lg sm:text-xl font-mono tabular-nums font-black text-white">
                {liveStats.publishedTests || TET_CTET_TOTAL_MOCKS} Tests
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
              <span className="text-[11px] font-semibold text-blue-200 block">Question Bank</span>
              <span className="text-lg sm:text-xl font-mono tabular-nums font-black text-amber-300">
                {TET_CTET_TOTAL_QUESTIONS_BANK.toLocaleString('en-IN')} Qs
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
              <span className="text-[11px] font-semibold text-blue-200 block">Official Timing</span>
              <span className="text-lg sm:text-xl font-mono tabular-nums font-black text-emerald-300">
                02:30:00
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
              <span className="text-[11px] font-semibold text-blue-200 block">My Attempts</span>
              <span className="text-lg sm:text-xl font-mono tabular-nums font-black text-white">
                {liveStats.totalAttempts} {liveStats.totalAttempts > 0 ? `(Best ${liveStats.bestPct}%)` : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TWO LARGE PROMINENT EXAMINATION CARDS: MAHA TET & CTET
          ===================================================================== */}
      <section aria-label="MAHA TET and CTET Examination Cards" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* CARD 1: MAHA TET */}
        <article className="bg-white rounded-3xl border border-blue-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-blue-700">
                  MSCE Pune Official Pattern · mahatet.in
                </p>
                <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                  MAHA TET — Maharashtra Teacher Eligibility Test
                </h2>
              </div>
              <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Structured strictly on MSCE Pune Primary (Classes 1–5) &amp; Upper Primary (Classes 6–8) curriculum with Marathi, English, Hindi &amp; Urdu Language 1/Language 2 selection and Maharashtra context.
            </p>

            {/* Quick Key Facts */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Full Mocks</span>
                <span className="text-sm font-mono tabular-nums font-black text-blue-900">100 Tests</span>
              </div>
              <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Questions</span>
                <span className="text-sm font-mono tabular-nums font-black text-blue-900">15,000 Qs</span>
              </div>
              <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Qualifying</span>
                <span className="text-sm font-mono tabular-nums font-black text-emerald-700">90/150</span>
              </div>
            </div>
          </div>

          {/* 5 Required Interactive Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => openModule('MAHA_TET_P1', 'mock-tests')}
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-display font-black text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <span>Paper 1 (Classes 1 to 5)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => openModule('MAHA_TET_P2', 'mock-tests')}
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <span>Paper 2 (Classes 6 to 8)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => openModule('MAHA_TET_P1', 'mock-tests')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <ClipboardList className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Mock Test Series</span>
              </button>
              <button
                type="button"
                onClick={() => openModule('MAHA_TET_P1', 'subject-practice')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Subject Practice</span>
              </button>
              <button
                type="button"
                onClick={() => openModule('MAHA_TET_P1', 'syllabus')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <BookMarked className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Complete Syllabus</span>
              </button>
            </div>
          </div>
        </article>

        {/* CARD 2: CTET */}
        <article className="bg-white rounded-3xl border border-purple-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-purple-700">
                  CBSE Official Pattern · ctet.nic.in
                </p>
                <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                  CTET — Central Teacher Eligibility Test
                </h2>
              </div>
              <span className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Aligned with CBSE / NCERT Class 1–8 competencies, NEP 2020 pedagogical frameworks, assertion-reasoning items, and English, Hindi &amp; Marathi Language 1/Language 2 selection.
            </p>

            {/* Quick Key Facts */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl bg-purple-50/70 border border-purple-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Full Mocks</span>
                <span className="text-sm font-mono tabular-nums font-black text-purple-900">100 Tests</span>
              </div>
              <div className="rounded-xl bg-purple-50/70 border border-purple-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Questions</span>
                <span className="text-sm font-mono tabular-nums font-black text-purple-900">15,000 Qs</span>
              </div>
              <div className="rounded-xl bg-purple-50/70 border border-purple-100 p-2.5">
                <span className="text-[11px] font-semibold text-slate-600 block">Qualifying</span>
                <span className="text-sm font-mono tabular-nums font-black text-emerald-700">90/150</span>
              </div>
            </div>
          </div>

          {/* 5 Required Interactive Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => openModule('CTET_P1', 'mock-tests')}
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-display font-black text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <span>Paper 1 (Classes 1 to 5)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => openModule('CTET_P2', 'mock-tests')}
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-display font-black text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <span>Paper 2 (Classes 6 to 8)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => openModule('CTET_P1', 'mock-tests')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <ClipboardList className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span>Mock Test Series</span>
              </button>
              <button
                type="button"
                onClick={() => openModule('CTET_P1', 'subject-practice')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span>Subject Practice</span>
              </button>
              <button
                type="button"
                onClick={() => openModule('CTET_P1', 'syllabus')}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
              >
                <BookMarked className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span>Complete Syllabus</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* =====================================================================
          4 INDEPENDENT MODULES QUICK DIRECTORY (50 MOCK TESTS EACH)
          ===================================================================== */}
      <section aria-label="All 4 Preparation Modules" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
              Complete 4-Module Preparation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each module includes 50 Full-Length Mock Tests (10 Batches × 5 Tests), Subject &amp; Topic Practice, Revision Drills, Previous-Year Pattern Sets, Official Syllabus &amp; Performance Analytics.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums font-bold text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>0% Duplicate Content Guaranteed</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TET_CTET_MODULE_LIST.map((mod) => {
            const modAttemptsCount = tetCtetAttempts.filter((a) => a.moduleId === mod.moduleId).length;
            return (
              <div
                key={mod.moduleId}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between gap-4 hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-800">
                    <span>{mod.code}</span>
                    <span className="font-mono tabular-nums">{mod.classesRange}</span>
                  </div>
                  <h3 className="text-base font-display font-black text-slate-900">
                    {mod.examTitle} · {mod.paperTitle}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{mod.tagline}</p>
                  <div className="pt-1 text-[11px] font-mono tabular-nums font-bold text-slate-700">
                    50 Mock Tests · 7,500 Qs · {modAttemptsCount} Completed
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openModule(mod.moduleId, 'mock-tests')}
                    className="flex-1 min-h-[40px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs cursor-pointer transition-colors"
                  >
                    Open Module
                  </button>
                  <button
                    type="button"
                    onClick={() => openModule(mod.moduleId, 'performance')}
                    aria-label={`View ${mod.examTitle} Paper ${mod.paper} Analytics`}
                    className="min-h-[40px] px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-800 border border-slate-300 text-xs font-bold cursor-pointer flex items-center justify-center"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          OFFICIAL EXAMINATION RULES & COMPLIANCE STRIP
          ===================================================================== */}
      <section aria-label="Official Exam Rules" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-800 font-display font-black text-sm">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Exact 150-Minute CBT Timer</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Starts only on clicking START EXAMINATION. Features persistent anti-refresh recovery, instant option auto-save, 30m/10m/5m alerts, and auto-submit at 00:00:00.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-display font-black text-sm">
            <Layers className="w-4 h-4 shrink-0" />
            <span>Flexible Bilingual / Multilingual Papers</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Configure distinct Language 1 &amp; Language 2 (Marathi, English, Hindi, Urdu for MAHA TET; English, Hindi, Marathi for CTET) and Paper 2 subject streams anytime.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
          <div className="flex items-center gap-2 text-purple-800 font-display font-black text-sm">
            <Target className="w-4 h-4 shrink-0" />
            <span>+1 Mark · Zero Negative Marking</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Matches official mahatet.in and ctet.nic.in scoring (+1 per correct answer, 0 negative marking) with section-wise accuracy reports and detailed question explanations.
          </p>
        </div>
      </section>
    </div>
  );
};
