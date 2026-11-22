import React from 'react';
import { Printer, ArrowRight, Calendar } from 'lucide-react';
import { GeneratedThreeTabLessonPlan, MonthlyPlanItem } from '../../types/lessonPlanner';

interface MonthlyPlanTabProps {
  plan: GeneratedThreeTabLessonPlan;
  selectedMonthKey: string;
  onSelectMonthKey: (monthKey: string) => void;
  onJumpToMonthDailyLessons: (monthKey: string) => void;
  onPrintMonthPdf: (monthKey: string) => void;
}

function formatDateDisplay(iso?: string | null): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export const MonthlyPlanTab: React.FC<MonthlyPlanTabProps> = ({
  plan,
  selectedMonthKey,
  onSelectMonthKey,
  onJumpToMonthDailyLessons,
  onPrintMonthPdf,
}) => {
  const { monthlyPlans, curriculum } = plan;
  const activeMonth: MonthlyPlanItem | undefined =
    monthlyPlans.find((m) => m.monthKey === selectedMonthKey) || monthlyPlans[0];

  if (!activeMonth) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No calendar months found for the active academic year dates.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month Selector Strip */}
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
          <p className="text-xs font-semibold text-slate-700">
            Select Academic Month ({monthlyPlans.length} Months)
          </p>
          <p className="text-xs text-slate-500">
            Recalculates automatically when board or school calendar changes
          </p>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {monthlyPlans.map((m) => {
            const isActive = m.monthKey === activeMonth.monthKey;
            return (
              <button
                key={m.monthKey}
                type="button"
                onClick={() => onSelectMonthKey(m.monthKey)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums border ${
                  isActive
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{m.shortLabel}</span>
                <span
                  className={`ml-1.5 ${
                    isActive ? 'text-teal-100' : 'text-slate-500'
                  }`}
                >
                  {m.completedLessons}/{m.totalLessons}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Month Overview */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {activeMonth.monthLabel} · {curriculum.subject} ({curriculum.classLevel})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {activeMonth.schoolWorkingDays} school working days ·{' '}
              {activeMonth.subjectTeachingPeriods} subject teaching periods ·{' '}
              {activeMonth.completedLessons} of {activeMonth.totalLessons} scheduled lessons
              completed ({activeMonth.completionPercent}%)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onJumpToMonthDailyLessons(activeMonth.monthKey)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open Daily Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onPrintMonthPdf(activeMonth.monthKey)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Month A4</span>
            </button>
          </div>
        </div>

        {/* Monthly Calendar Events & Target Units */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 text-xs">
          <div className="p-4 space-y-2">
            <p className="font-semibold text-slate-900">
              Target {curriculum.curriculumSourceType === 'verified_board_chapters' ? 'Chapters' : 'Planning Units'} in {activeMonth.shortLabel}
            </p>
            {activeMonth.targetChapters.length === 0 ? (
              <p className="text-slate-500">
                No new teaching units scheduled this month (vacation, exam, or revision period).
              </p>
            ) : (
              <ul className="space-y-1.5">
                {activeMonth.targetChapters.map((tc) => (
                  <li
                    key={tc.unitId}
                    className="flex items-start justify-between gap-2 text-slate-700"
                  >
                    <span>
                      <span className="font-medium text-slate-500 tabular-nums mr-1">
                        U{tc.unitNumber}.
                      </span>
                      {tc.title}
                    </span>
                    <span className="font-semibold text-slate-900 tabular-nums whitespace-nowrap shrink-0">
                      {tc.periodsInMonth}p
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 space-y-2">
            <p className="font-semibold text-slate-900">
              Holidays, Vacations &amp; Exam Windows
            </p>
            <div className="space-y-1.5 text-slate-700">
              <p>
                <span className="font-medium text-slate-900">Holidays:</span>{' '}
                {activeMonth.holidayCallouts.length > 0
                  ? activeMonth.holidayCallouts
                      .map((h) => `${formatDateDisplay(h.date)} (${h.name})`)
                      .join(', ')
                  : 'None'}
              </p>
              {activeMonth.vacationCallouts.length > 0 && (
                <p>
                  <span className="font-medium text-slate-900">Vacations:</span>{' '}
                  {activeMonth.vacationCallouts.join(', ')}
                </p>
              )}
              {activeMonth.examCallouts.length > 0 && (
                <p className="text-amber-800">
                  <span className="font-semibold">Examinations:</span>{' '}
                  {activeMonth.examCallouts.join(', ')}
                </p>
              )}
              {activeMonth.revisionCallouts.length > 0 && (
                <p className="text-teal-800">
                  <span className="font-semibold">Revision:</span>{' '}
                  {activeMonth.revisionCallouts.join(', ')}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <p className="font-semibold text-slate-900">Monthly Classroom Activities</p>
            {activeMonth.monthlyActivitiesHighlight.length === 0 ? (
              <p className="text-slate-500">Assessment or holiday break month.</p>
            ) : (
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {activeMonth.monthlyActivitiesHighlight.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Integrated Weekly Pacing Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            <h4 className="text-sm font-semibold text-slate-900">
              Weekly Pacing Breakdown · {activeMonth.monthLabel}
            </h4>
          </div>
          <span className="text-xs text-slate-500 tabular-nums">
            {activeMonth.weeklyBreakdown.length} weeks
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap">Week &amp; Dates</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">
                  Work / Subj
                </th>
                <th className="py-2.5 px-4 font-semibold">Target Units</th>
                <th className="py-2.5 px-4 font-semibold">Key Milestone &amp; Checkpoint</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">
                  Progress
                </th>
                <th className="py-2.5 px-4 font-semibold whitespace-nowrap text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activeMonth.weeklyBreakdown.map((wk) => (
                <tr key={wk.weekNumberInYear} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 align-top whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{wk.weekLabel}</p>
                    <p className="text-slate-500 tabular-nums mt-0.5">
                      {formatDateDisplay(wk.startDate)} – {formatDateDisplay(wk.endDate)}
                    </p>
                  </td>
                  <td className="py-3 px-3 align-top text-right whitespace-nowrap tabular-nums">
                    <p className="font-semibold text-slate-900">
                      {wk.schoolWorkingDays}d / {wk.subjectTeachingPeriods}p
                    </p>
                    {(wk.examDays > 0 || wk.revisionDays > 0) && (
                      <p className="text-slate-500 mt-0.5">
                        {wk.examDays > 0 ? `${wk.examDays} exam` : ''}
                        {wk.examDays > 0 && wk.revisionDays > 0 ? ' · ' : ''}
                        {wk.revisionDays > 0 ? `${wk.revisionDays} rev` : ''}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 align-top text-slate-700 min-w-[200px]">
                    {wk.targetChapters.length > 0
                      ? wk.targetChapters.join('; ')
                      : 'Non-teaching / Assessment Week'}
                  </td>
                  <td className="py-3 px-4 align-top text-slate-600 min-w-[200px]">
                    {wk.keyMilestone}
                  </td>
                  <td className="py-3 px-3 align-top text-right whitespace-nowrap tabular-nums font-semibold text-slate-900">
                    {wk.completedLessons}/{wk.totalLessons}
                  </td>
                  <td className="py-3 px-4 align-top text-right whitespace-nowrap">
                    <button
                      type="button"
                      disabled={wk.totalLessons === 0}
                      onClick={() => onJumpToMonthDailyLessons(activeMonth.monthKey)}
                      className="text-teal-700 hover:text-teal-900 font-semibold disabled:text-slate-300 cursor-pointer disabled:cursor-not-allowed"
                    >
                      View Daily
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
