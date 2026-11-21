import React, { useState } from 'react';
import {
  DemoExamTypeId,
  DemoPaper2Stream,
} from '../../data/demoExamEngine';
import { demoExamService } from '../../services/demoExamService';
import { DemoExamSimulator } from './DemoExamSimulator';
import { PlanSkuId } from '../../types';
import {
  Clock,
  Layers,
  Play,
  ShieldCheck,
} from 'lucide-react';

interface DemoMockTestsHubProps {
  initialTestId?: DemoExamTypeId | null;
  studentId?: string;
  studentName?: string;
  studentRole?: string;
  onOpenMembership: (planSku: PlanSkuId) => void;
  onClose?: () => void;
  filterAudience?: 'all' | 'teachers' | 'scholarship';
}

export const DemoMockTestsHub: React.FC<DemoMockTestsHubProps> = ({
  initialTestId = null,
  studentId,
  studentName,
  studentRole,
  onOpenMembership,
  filterAudience = 'all',
}) => {
  const [activeTestId, setActiveTestId] = useState<DemoExamTypeId | null>(initialTestId);
  const [activeStream, setActiveStream] = useState<DemoPaper2Stream>('MATH_SCIENCE');
  const [cardStreams, setCardStreams] = useState<Record<string, DemoPaper2Stream>>({
    demo_ctet_p2: 'MATH_SCIENCE',
    demo_tet_p2: 'MATH_SCIENCE',
  });
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'teachers' | 'scholarship'>(
    filterAudience
  );

  const testList: DemoExamTypeId[] = [
    'demo_ctet',
    'demo_ctet_p2',
    'demo_tet',
    'demo_tet_p2',
    'demo_scholarship_4',
    'demo_scholarship_7',
  ];

  const filteredTests = testList.filter((tid) => {
    if (activeTabFilter === 'teachers') {
      return (
        tid === 'demo_tet' ||
        tid === 'demo_tet_p2' ||
        tid === 'demo_ctet' ||
        tid === 'demo_ctet_p2'
      );
    }
    if (activeTabFilter === 'scholarship') {
      return tid === 'demo_scholarship_4' || tid === 'demo_scholarship_7';
    }
    return true;
  });

  if (activeTestId) {
    return (
      <DemoExamSimulator
        testId={activeTestId}
        initialStream={activeStream}
        studentId={studentId}
        studentName={studentName}
        studentRole={studentRole}
        onExit={() => setActiveTestId(null)}
        onOpenMembership={onOpenMembership}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Strip */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-black uppercase tracking-wider">
                100% Free · English-Medium Mock Tests
              </span>
              <span className="text-xs text-indigo-200 font-semibold">
                Official Syllabus · Zero Duplicate Questions
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Free Full-Length Demo Mock Examinations
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Practise realistic, syllabus-balanced English-medium mock tests for CTET (Paper I &amp; Paper II),
              MAHA TET (Paper I &amp; Paper II), and Class 4 &amp; Class 7 Scholarship with real countdown timers,
              question palettes, and step-by-step explanations.
            </p>
          </div>

          {/* Quick tab filter */}
          <div className="flex sm:flex-col gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl backdrop-blur-xs">
            <button
              type="button"
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                activeTabFilter === 'all'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              All 6 Demo Exams
            </button>
            <button
              type="button"
              onClick={() => setActiveTabFilter('teachers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                activeTabFilter === 'teachers'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              CTET &amp; TET (Papers I &amp; II)
            </button>
            <button
              type="button"
              onClick={() => setActiveTabFilter('scholarship')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                activeTabFilter === 'scholarship'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Scholarship (Class 4 &amp; 7)
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 6 Demo Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTests.map((tid) => {
          const currentCardStream = cardStreams[tid] || 'MATH_SCIENCE';
          const cfg = demoExamService.getConfig(tid, currentCardStream);
          const qs = demoExamService.getQuestions(tid, currentCardStream);
          const stats = demoExamService.getStats(tid);
          const activeSession = demoExamService.loadActiveSession(tid);
          const hasInProgress = Boolean(activeSession && !activeSession.isExpired);

          const isCtet = tid === 'demo_ctet' || tid === 'demo_ctet_p2';
          const isTet = tid === 'demo_tet' || tid === 'demo_tet_p2';

          return (
            <div
              key={tid}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isCtet
                            ? 'bg-purple-100 text-purple-900'
                            : isTet
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {isCtet
                          ? `CBSE CTET · Paper ${cfg.paperNumber === 2 ? 'II' : 'I'}`
                          : isTet
                          ? `MAHA TET (English) · Paper ${cfg.paperNumber === 2 ? 'II' : 'I'}`
                          : 'MSCE Scholarship (English)'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
                        English Medium
                      </span>
                      {hasInProgress && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 leading-snug">
                      {cfg.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{cfg.patternName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{cfg.description}</p>

                {/* Paper II Stream Switcher right on the card */}
                {cfg.supportsStreamSelection && (
                  <div className="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-indigo-700" />
                      Select Paper II Elective Stream (60 Qs):
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setCardStreams((prev) => ({ ...prev, [tid]: 'MATH_SCIENCE' }))
                        }
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors ${
                          currentCardStream === 'MATH_SCIENCE'
                            ? 'bg-indigo-700 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Mathematics &amp; Science
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCardStreams((prev) => ({ ...prev, [tid]: 'SOCIAL_STUDIES' }))
                        }
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors ${
                          currentCardStream === 'SOCIAL_STUDIES'
                            ? 'bg-indigo-700 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Social Studies / Science
                      </button>
                    </div>
                  </div>
                )}

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Questions
                    </span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                      {qs.length} Qs
                    </span>
                  </div>
                  <div className="border-x border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Total Marks
                    </span>
                    <span className="text-sm sm:text-base font-black text-indigo-900 font-mono">
                      {cfg.totalMarks} Marks
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Duration
                    </span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                      {cfg.durationMinutes} Mins
                    </span>
                  </div>
                </div>

                {/* Sections list snippet */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Examination Sections Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cfg.sections.map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {s.name} ({s.questionCount} Qs · {s.maxMarks}M)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reload Safe callout */}
                <div className="text-[11px] text-slate-500 flex items-center gap-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Real timer &amp; reload protection</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Balanced syllabus · 0% duplicates</span>
                  </span>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 font-medium">
                  {stats.totalAttempts > 0 ? (
                    <span>
                      {stats.totalAttempts} Attempts · Avg: {stats.averageScore}/{cfg.totalMarks} (
                      {stats.averagePercentage}%)
                    </span>
                  ) : (
                    <span>100% Verified Question Bank</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStream(currentCardStream);
                    setActiveTestId(tid);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-black text-xs sm:text-sm cursor-pointer shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{hasInProgress ? 'Resume Demo Exam' : 'Start Free Demo Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
