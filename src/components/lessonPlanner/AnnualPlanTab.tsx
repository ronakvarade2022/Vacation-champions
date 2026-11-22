import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Printer,
  Minus,
  Plus,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import {
  AnnualChapterPlanItem,
  GeneratedThreeTabLessonPlan,
  OutcomeAttainmentStatus,
} from '../../types/lessonPlanner';

interface AnnualPlanTabProps {
  plan: GeneratedThreeTabLessonPlan;
  allowWeightCustomization: boolean;
  showCurriculumReviewNotice: boolean;
  onAdjustChapterWeight: (unitId: string, nextWeight: number) => void;
  onResetChapterWeights: () => void;
  hasWeightOverrides: boolean;
  onUpdateOutcome: (
    outcomeId: string,
    status: OutcomeAttainmentStatus,
    privateNote: string
  ) => void;
  onJumpToChapterDailyLessons: (unitId: string) => void;
  onPrintAnnualPdf: () => void;
}

function formatDateDisplay(iso?: string | null): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const OUTCOME_STATUS_OPTIONS: { value: OutcomeAttainmentStatus; label: string }[] = [
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'achieved', label: 'Achieved' },
  { value: 'needs_remedial', label: 'Needs Remedial' },
];

export const AnnualPlanTab: React.FC<AnnualPlanTabProps> = ({
  plan,
  allowWeightCustomization,
  showCurriculumReviewNotice,
  onAdjustChapterWeight,
  onResetChapterWeights,
  hasWeightOverrides,
  onUpdateOutcome,
  onJumpToChapterDailyLessons,
  onPrintAnnualPdf,
}) => {
  const { curriculum, calendarSummary, annualPlan, isArchivedReadOnly } = plan;
  const [termFilter, setTermFilter] = useState<'all' | 'Term 1' | 'Term 2'>('all');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(
    annualPlan.allChapters[0]?.unitId || null
  );

  const isPlanningUnits =
    curriculum.curriculumSourceType === 'curriculum_based_planning_units';
  const canEditWeights = allowWeightCustomization && !isArchivedReadOnly;

  const visibleChapters: AnnualChapterPlanItem[] =
    termFilter === 'Term 1'
      ? annualPlan.term1Chapters
      : termFilter === 'Term 2'
      ? annualPlan.term2Chapters
      : annualPlan.allChapters;

  const healthLabel =
    calendarSummary.syllabusHealth === 'on_track'
      ? 'On Track'
      : calendarSummary.syllabusHealth === 'tight'
      ? 'Tight Schedule'
      : 'Compressed Schedule';

  const healthTextClass =
    calendarSummary.syllabusHealth === 'on_track'
      ? 'text-emerald-700'
      : calendarSummary.syllabusHealth === 'tight'
      ? 'text-amber-700'
      : 'text-rose-700';

  return (
    <div className="space-y-6">
      {/* Curriculum Source Transparency & Admin Review Notice */}
      {isPlanningUnits ? (
        showCurriculumReviewNotice && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/70 px-4 py-3.5 text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-amber-950">
                    Curriculum-Based Planning Units — Pending Admin Verification
                  </p>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Official chapter-by-chapter textbook lists are not yet independently verified for{' '}
                    <span className="font-semibold">
                      {curriculum.board} · {curriculum.classLevel} · {curriculum.subject}
                    </span>
                    . Units below are clearly labeled as MyStudyZone Curriculum-Based Planning Units
                    (not official textbook chapters) and are flagged for Administrator review. All
                    teaching methodologies, activities, and outcomes are original MyStudyZone content.
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium text-amber-900 whitespace-nowrap shrink-0 tabular-nums">
                {curriculum.units.length} Planning Units
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <span className="font-semibold">Verified Board Curriculum Chapters:</span>{' '}
                {curriculum.bookTitle} ({curriculum.publisher} · {curriculum.editionYear}). All
                teaching steps, activities, and assessment checks are original MyStudyZone content.
              </div>
            </div>
            <div className="text-xs font-medium text-emerald-900 whitespace-nowrap shrink-0 tabular-nums">
              {curriculum.units.length} Verified Chapters
            </div>
          </div>
        </div>
      )}

      {/* Calendar Warnings (if any) */}
      {calendarSummary.warnings.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-900 space-y-1">
          <p className="font-semibold">Calendar Notices</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {calendarSummary.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Annual Calendar & Pacing Summary Bar */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Annual Calendar Summary · {calendarSummary.academicYear}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              Reopening {formatDateDisplay(calendarSummary.reopeningDate)} · Syllabus Deadline{' '}
              {formatDateDisplay(calendarSummary.syllabusCompletionDeadline)} · Year End{' '}
              {formatDateDisplay(calendarSummary.endDate)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold ${healthTextClass}`}>
              Pacing Status: {healthLabel}
            </span>
            <button
              type="button"
              onClick={onPrintAnnualPdf}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Annual A4</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="p-4">
            <p className="text-xs text-slate-500">School Working Days</p>
            <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {calendarSummary.totalSchoolWorkingDays}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {calendarSummary.halfDayCount} half-day Saturdays
            </p>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Subject Periods Allocated</p>
            <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {annualPlan.totalAllocatedPeriods}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {calendarSummary.subjectTeachingDaysBeforeDeadline} before deadline
            </p>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Holidays &amp; Vacations</p>
            <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {calendarSummary.holidayCount}H · {calendarSummary.vacationDayCount}V
            </p>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {calendarSummary.examDayCount} exam · {calendarSummary.revisionDayCount} revision days
            </p>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Learning Outcomes Achieved</p>
            <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {annualPlan.achievedOutcomes} / {annualPlan.totalOutcomes}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Tracked privately per teacher
            </p>
          </div>
        </div>
      </div>

      {/* Term-Wise Chapter / Unit Distribution */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {isPlanningUnits
                ? 'Annual Curriculum-Based Planning Units Distribution'
                : 'Annual Verified Textbook Chapters Distribution'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Expand any row to review prerequisites, remedial guidance, and track learning outcomes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
              {(['all', 'Term 1', 'Term 2'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTermFilter(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    termFilter === t
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'all'
                    ? `All (${annualPlan.allChapters.length})`
                    : t === 'Term 1'
                    ? `Term 1 (${annualPlan.term1Chapters.length})`
                    : `Term 2 (${annualPlan.term2Chapters.length})`}
                </button>
              ))}
            </div>

            {canEditWeights && hasWeightOverrides && (
              <button
                type="button"
                onClick={onResetChapterWeights}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shrink-0"
              >
                Reset Period Weights
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table & Mobile Responsive Rows */}
        <div className="divide-y divide-slate-200">
          {visibleChapters.map((ch) => {
            const isExpanded = expandedUnitId === ch.unitId;
            return (
              <div key={ch.unitId} className="bg-white">
                <div className="px-4 py-3.5 hover:bg-slate-50/70 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedUnitId(isExpanded ? null : ch.unitId)}
                      className="flex items-start gap-2.5 text-left flex-1 min-w-0 cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                      )}
                      <div className="min-w-0 space-y-1">
                        <div className="text-sm font-semibold text-slate-900 leading-snug">
                          <span className="tabular-nums text-slate-500 mr-1.5">
                            {String(ch.unitNumber).padStart(2, '0')}.
                          </span>
                          {ch.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
                          <span>{ch.term}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {ch.sourceKind === 'board_mapped'
                              ? 'Verified Chapter'
                              : 'Curriculum-Based Unit'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {formatDateDisplay(ch.plannedStartDate)} to{' '}
                            {formatDateDisplay(ch.plannedEndDate)}
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="flex flex-wrap items-center gap-4 pl-6 lg:pl-0 shrink-0">
                      {/* Period Weight Adjustment */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500">Periods:</span>
                        {canEditWeights ? (
                          <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                            <button
                              type="button"
                              aria-label={`Decrease weight for ${ch.cleanTitle}`}
                              onClick={() =>
                                onAdjustChapterWeight(
                                  ch.unitId,
                                  Math.max(1, ch.defaultWeight - 1)
                                )
                              }
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-l-lg cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-slate-900 tabular-nums">
                              {ch.allocatedPeriods}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase weight for ${ch.cleanTitle}`}
                              onClick={() =>
                                onAdjustChapterWeight(
                                  ch.unitId,
                                  Math.min(20, ch.defaultWeight + 1)
                                )
                              }
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-slate-900 tabular-nums">
                            {ch.allocatedPeriods}
                          </span>
                        )}
                      </div>

                      {/* Completion Fraction */}
                      <div className="w-28">
                        <div className="flex items-center justify-between text-xs tabular-nums">
                          <span
                            className={
                              ch.isCompleted
                                ? 'font-semibold text-emerald-700'
                                : 'font-medium text-slate-700'
                            }
                          >
                            {ch.completionPercent}%
                          </span>
                          <span className="text-slate-500">
                            {ch.completedLessonsCount}/{ch.totalLessonsCount}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              ch.isCompleted ? 'bg-emerald-600' : 'bg-teal-600'
                            }`}
                            style={{ width: `${ch.completionPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onJumpToChapterDailyLessons(ch.unitId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-xs font-medium text-teal-800 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Daily Lessons</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Pedagogical Blueprint & Outcomes Attainment */}
                {isExpanded && (
                  <div className="px-4 sm:px-8 pb-5 pt-2 bg-slate-50/70 border-t border-slate-200/80 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">Prerequisites</p>
                        <p className="text-slate-600 leading-relaxed">{ch.prerequisites}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">Key Concepts Covered</p>
                        <p className="text-slate-600 leading-relaxed">
                          {ch.keyConcepts.join(' · ')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">
                          Common Misconceptions &amp; Remedial Strategy
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          {ch.commonMisconceptions} — <span className="text-slate-800">{ch.remedialStrategy}</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">
                          Suggested Activity, Materials &amp; Enrichment
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          {ch.suggestedActivity} ({ch.practicalMaterials.join(', ')}).{' '}
                          <span className="text-slate-800">{ch.enrichmentStrategy}</span>
                        </p>
                      </div>
                    </div>

                    {/* Learning Outcomes Attainment Tracker */}
                    <div className="pt-3 border-t border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-900">
                          Learning Outcomes &amp; Private Assessment Tracking
                        </p>
                        <span className="text-xs text-slate-500">
                          Saved privately to your teacher workspace
                        </span>
                      </div>
                      <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                        {ch.learningOutcomes.map((lo) => (
                          <div
                            key={lo.outcomeId}
                            className="p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <p className="text-xs font-medium text-slate-900">
                                {lo.statement}
                              </p>
                              <p className="text-xs text-slate-500">
                                {lo.bloomLevel} · Assessment: {lo.assessmentMethod}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                              <select
                                aria-label={`Outcome status for ${lo.bloomLevel}`}
                                value={lo.status}
                                disabled={isArchivedReadOnly}
                                onChange={(e) =>
                                  onUpdateOutcome(
                                    lo.outcomeId,
                                    e.target.value as OutcomeAttainmentStatus,
                                    lo.privateNote
                                  )
                                }
                                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800 disabled:bg-slate-100"
                              >
                                {OUTCOME_STATUS_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                disabled={isArchivedReadOnly}
                                defaultValue={lo.privateNote}
                                placeholder="Private assessment note..."
                                maxLength={240}
                                onBlur={(e) => {
                                  const nextVal = e.target.value.trim();
                                  if (nextVal !== lo.privateNote) {
                                    onUpdateOutcome(lo.outcomeId, lo.status, nextVal);
                                  }
                                }}
                                className="w-full sm:w-52 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400 disabled:bg-slate-100"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Examination Portion Roadmap & Spaced Revision Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Examination Roadmap */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Examination &amp; Auto-Computed Portion Roadmap
            </h3>
          </div>
          <div className="divide-y divide-slate-200">
            {annualPlan.examRoadmap.length === 0 ? (
              <p className="p-4 text-xs text-slate-500">
                No examination windows configured in the active calendar.
              </p>
            ) : (
              annualPlan.examRoadmap.map((ex) => (
                <div key={ex.id} className="p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{ex.name}</p>
                    <span className="text-xs font-medium text-slate-600 whitespace-nowrap tabular-nums">
                      {ex.term} · {ex.examDaysCount} days
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 tabular-nums">
                    Window: {formatDateDisplay(ex.startDate)} – {formatDateDisplay(ex.endDate)}
                  </p>
                  <p className="text-xs text-slate-700">
                    <span className="font-medium text-slate-900">Covered Units:</span>{' '}
                    {ex.coveredUnitTitles.length > 0
                      ? ex.coveredUnitTitles.join(', ')
                      : 'Scheduled units up to exam window'}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-medium text-slate-800">Oral / Practical:</span>{' '}
                    {ex.oralPracticalCheckpoint}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Revision Roadmap */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Spaced Revision Roadmap
            </h3>
          </div>
          <div className="divide-y divide-slate-200">
            {annualPlan.revisionRoadmap.length === 0 ? (
              <p className="p-4 text-xs text-slate-500">
                No revision windows configured in the active calendar.
              </p>
            ) : (
              annualPlan.revisionRoadmap.map((rv) => (
                <div key={rv.id} className="p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{rv.name}</p>
                    <span className="text-xs font-medium text-slate-600 whitespace-nowrap tabular-nums">
                      {rv.term} · {rv.revisionDaysCount} days
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 tabular-nums">
                    Window: {formatDateDisplay(rv.startDate)} – {formatDateDisplay(rv.endDate)}
                  </p>
                  <p className="text-xs text-slate-700">{rv.strategySummary}</p>
                  <p className="text-xs text-slate-500">
                    Focus: {rv.focusUnits.slice(0, 6).join(' · ')}
                    {rv.focusUnits.length > 6 ? ` · +${rv.focusUnits.length - 6} more` : ''}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
