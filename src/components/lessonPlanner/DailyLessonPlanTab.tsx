import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Search,
  Printer,
  CalendarClock,
  Lock,
  Save,
  RotateCcw,
} from 'lucide-react';
import {
  DailyLessonPlanItem,
  GeneratedThreeTabLessonPlan,
  PermittedLessonEdit,
} from '../../types/lessonPlanner';

interface DailyLessonPlanTabProps {
  plan: GeneratedThreeTabLessonPlan;
  monthFilter: string;
  unitFilter: string;
  onMonthFilterChange: (monthKey: string) => void;
  onUnitFilterChange: (unitId: string) => void;
  shiftAnchorDate?: string;
  onApplyShiftAnchor: (dateIso?: string) => void;
  onToggleLessonComplete: (lesson: DailyLessonPlanItem) => void;
  onSaveLessonEditsAndRemark: (
    lessonKey: string,
    edits: PermittedLessonEdit,
    privateRemark: string
  ) => void;
  onPrintDailyPdf: (monthKey?: string) => void;
}

function formatDateDisplay(iso?: string | null): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export const DailyLessonPlanTab: React.FC<DailyLessonPlanTabProps> = ({
  plan,
  monthFilter,
  unitFilter,
  onMonthFilterChange,
  onUnitFilterChange,
  shiftAnchorDate,
  onApplyShiftAnchor,
  onToggleLessonComplete,
  onSaveLessonEditsAndRemark,
  onPrintDailyPdf,
}) => {
  const { dailyPlans, monthlyPlans, annualPlan, isArchivedReadOnly } = plan;
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(25);
  const [shiftInputDate, setShiftInputDate] = useState(
    shiftAnchorDate || new Date().toISOString().slice(0, 10)
  );
  const [showShiftPanel, setShowShiftPanel] = useState(false);

  const defaultOpenKey =
    plan.progressOverview.nextScheduledLesson?.lessonKey || dailyPlans[0]?.lessonKey || null;
  const [expandedKey, setExpandedKey] = useState<string | null>(defaultOpenKey);

  // Local draft editor state keyed by lessonKey
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftEdits, setDraftEdits] = useState<PermittedLessonEdit>({});
  const [draftRemark, setDraftRemark] = useState('');

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return dailyPlans.filter((lp) => {
      if (monthFilter !== 'all' && lp.monthKey !== monthFilter) return false;
      if (unitFilter !== 'all' && lp.unitId !== unitFilter) return false;
      if (statusFilter === 'pending' && lp.isCompleted) return false;
      if (statusFilter === 'completed' && !lp.isCompleted) return false;
      if (q) {
        const hay = `${lp.unitTitle} ${lp.subTopicFocus} ${lp.activityAndPractical.title} ${lp.homeworkPlan.coreTask} ${lp.privateRemark} ${lp.date}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [dailyPlans, monthFilter, unitFilter, statusFilter, searchQuery]);

  const visibleLessons = filteredLessons.slice(0, visibleLimit);

  const openEditor = (lp: DailyLessonPlanItem) => {
    setEditingKey(lp.lessonKey);
    setDraftEdits({
      subTopicFocus: lp.permittedEdits?.subTopicFocus ?? '',
      teachingAidNote: lp.permittedEdits?.teachingAidNote ?? '',
      activityNote: lp.permittedEdits?.activityNote ?? '',
      homeworkNote: lp.permittedEdits?.homeworkNote ?? '',
    });
    setDraftRemark(lp.privateRemark || '');
  };

  const commitEditor = (lessonKey: string) => {
    onSaveLessonEditsAndRemark(lessonKey, draftEdits, draftRemark.trim());
    setEditingKey(null);
  };

  return (
    <div className="space-y-5">
      {/* Filter, Search & Schedule Shift Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Month</label>
            <select
              value={monthFilter}
              onChange={(e) => {
                onMonthFilterChange(e.target.value);
                setVisibleLimit(25);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800"
            >
              <option value="all">All Months ({dailyPlans.length} lessons)</option>
              {monthlyPlans.map((m) => (
                <option key={m.monthKey} value={m.monthKey}>
                  {m.monthLabel} ({m.totalLessons})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Chapter / Unit
            </label>
            <select
              value={unitFilter}
              onChange={(e) => {
                onUnitFilterChange(e.target.value);
                setVisibleLimit(25);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800"
            >
              <option value="all">All Units ({annualPlan.allChapters.length})</option>
              {annualPlan.allChapters.map((ch) => (
                <option key={ch.unitId} value={ch.unitId}>
                  {ch.unitNumber}. {ch.cleanTitle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <div className="grid grid-cols-3 p-0.5 bg-slate-100 rounded-lg">
              {(['all', 'pending', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer capitalize ${
                    statusFilter === st
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Search Topics / Remarks
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search daily diary..."
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Utility Actions Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-500 tabular-nums">
            Showing {visibleLessons.length} of {filteredLessons.length} scheduled sessions
            {shiftAnchorDate ? (
              <span className="text-teal-800 font-medium">
                {' '}
                · Uncompleted lessons shifted from {formatDateDisplay(shiftAnchorDate)}
              </span>
            ) : null}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {!isArchivedReadOnly && (
              <button
                type="button"
                onClick={() => setShowShiftPanel((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shrink-0"
              >
                <CalendarClock className="w-3.5 h-3.5" />
                <span>Mid-Year Schedule Shift</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onPrintDailyPdf(monthFilter !== 'all' ? monthFilter : undefined)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Daily Diary A4</span>
            </button>
          </div>
        </div>

        {/* Mid-Year Forward Shift Controls */}
        {showShiftPanel && !isArchivedReadOnly && (
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-900">
                Shift Remaining Uncompleted Lessons Forward
              </p>
              <p className="text-xs text-slate-600">
                Completed lessons stay locked on their original dates. Pending lessons automatically
                re-schedule starting on or after your chosen anchor date.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <input
                type="date"
                value={shiftInputDate}
                onChange={(e) => setShiftInputDate(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800"
              />
              <button
                type="button"
                onClick={() => {
                  onApplyShiftAnchor(shiftInputDate);
                  setShowShiftPanel(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                Apply Shift
              </button>
              {shiftAnchorDate && (
                <button
                  type="button"
                  onClick={() => {
                    onApplyShiftAnchor(undefined);
                    setShowShiftPanel(false);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Shift</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Daily Lesson Diary List */}
      {plan.curriculum.curriculumSourceType !== 'verified_board_chapters' ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-amber-950">
            PENDING VERIFICATION — No Daily Lesson Plans Generated
          </p>
          <p className="text-xs text-amber-900 max-w-xl mx-auto">
            Official textbook chapter index verification is currently{' '}
            <span className="font-semibold">PENDING VERIFICATION</span> for{' '}
            <span className="font-semibold">
              {plan.curriculum.board} · {plan.curriculum.classLevel} · {plan.curriculum.subject}
            </span>
            . Invented chapters are never generated for pending subjects.
          </p>
        </div>
      ) : visibleLessons.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            No daily lessons match your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              onMonthFilterChange('all');
              onUnitFilterChange('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200 overflow-hidden">
          {visibleLessons.map((lp) => {
            const isExpanded = expandedKey === lp.lessonKey;
            const isEditing = editingKey === lp.lessonKey;
            const dayTypeText =
              lp.dayType === 'revision'
                ? 'Revision Session'
                : lp.dayType === 'half_day_teaching'
                ? 'Half-Day Teaching'
                : 'Regular Teaching';

            return (
              <div key={lp.lessonKey} className="bg-white">
                {/* Summary Row */}
                <div className="px-4 py-3.5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      disabled={isArchivedReadOnly}
                      aria-label={
                        lp.isCompleted ? 'Mark lesson pending' : 'Mark lesson completed'
                      }
                      onClick={() => onToggleLessonComplete(lp)}
                      className={`mt-0.5 shrink-0 cursor-pointer disabled:cursor-not-allowed transition-colors ${
                        lp.isCompleted
                          ? 'text-emerald-600 hover:text-emerald-700'
                          : 'text-slate-300 hover:text-teal-600'
                      }`}
                    >
                      {lp.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedKey(isExpanded ? null : lp.lessonKey)}
                      className="text-left flex-1 min-w-0 cursor-pointer space-y-1"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 tabular-nums">
                        <span className="font-semibold text-slate-900">
                          #{lp.sequenceNumber} · {formatDateDisplay(lp.date)} ({lp.weekdayLabel})
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{dayTypeText}</span>
                        <span aria-hidden="true">·</span>
                        <span>{lp.durationMinutes} min</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Period {lp.periodIndexInUnit} of {lp.totalPeriodsInUnit}
                        </span>
                        {lp.isCompleted && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-emerald-700">Completed</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 leading-snug">
                        Unit {lp.unitNumber}: {lp.unitTitle}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {lp.subTopicFocus}
                        {lp.privateRemark ? ` · Private note saved` : ''}
                      </p>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pl-8 sm:pl-0 shrink-0">
                    {!isArchivedReadOnly && (
                      <button
                        type="button"
                        onClick={() => onToggleLessonComplete(lp)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                          lp.isCompleted
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {lp.isCompleted ? 'Completed' : 'Mark Done'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setExpandedKey(isExpanded ? null : lp.lessonKey)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                      aria-label={isExpanded ? 'Collapse lesson details' : 'Expand lesson details'}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Original MyStudyZone Daily Lesson Plan */}
                {isExpanded && (
                  <div className="px-4 sm:px-11 pb-5 pt-3 bg-slate-50/70 border-t border-slate-200/80 space-y-4 text-xs">
                    {/* Sub-Topic & Objectives */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900">Sub-Topic Focus</p>
                        <p className="text-slate-700 leading-relaxed">{lp.subTopicFocus}</p>
                        <p className="text-slate-500 pt-1">Source: {lp.unitSourceLabel}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900">Learning Objectives</p>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                          {lp.learningObjectives.map((obj, idx) => (
                            <li key={idx}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 5-Phase Classroom Methodology */}
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-900">
                        5-Phase Classroom Methodology ({lp.durationMinutes} Minutes)
                      </p>
                      <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                        {lp.methodology5Phase.map((ph, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-2 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                          >
                            <span className="font-semibold text-slate-900 sm:w-44 shrink-0 tabular-nums">
                              {ph.phase} ({ph.minutes}m)
                            </span>
                            <span className="text-slate-700 leading-relaxed">
                              {ph.instruction}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Teaching Aids, Board Summary, Activity & Homework */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-slate-900">Teaching Aids</p>
                          <p className="text-slate-700 mt-0.5">{lp.teachingAids.join(' · ')}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Blackboard Summary Points</p>
                          <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-slate-700">
                            {lp.boardSummaryPoints.map((pt, idx) => (
                              <li key={idx}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-slate-900">
                            Activity / Practical Work: {lp.activityAndPractical.title}
                          </p>
                          <p className="text-slate-700 mt-0.5 leading-relaxed">
                            {lp.activityAndPractical.instructions}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            Materials: {lp.activityAndPractical.materials.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 tabular-nums">
                            Homework Plan ({lp.homeworkPlan.estimatedMinutes} min · Due{' '}
                            {formatDateDisplay(lp.homeworkPlan.dueDate)})
                          </p>
                          <p className="text-slate-700 mt-0.5">
                            <span className="font-medium text-slate-900">Core:</span>{' '}
                            {lp.homeworkPlan.coreTask}
                          </p>
                          <p className="text-slate-700 mt-0.5">
                            <span className="font-medium text-slate-900">Application:</span>{' '}
                            {lp.homeworkPlan.applicationTask}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Formative Check */}
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-900">
                          Formative Assessment Check:
                        </span>{' '}
                        {lp.formativeCheck}
                      </p>
                    </div>

                    {/* Private Teacher Remarks & Permitted Lesson Notes */}
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Private Teacher Notes &amp; Permitted Customizations</span>
                        </div>
                        {!isArchivedReadOnly && !isEditing && (
                          <button
                            type="button"
                            onClick={() => openEditor(lp)}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-800 cursor-pointer"
                          >
                            {lp.privateRemark || lp.permittedEdits ? 'Edit Private Notes' : 'Add Private Remark / Note'}
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Custom Sub-Topic Focus (optional)
                              </label>
                              <input
                                type="text"
                                maxLength={180}
                                value={draftEdits.subTopicFocus || ''}
                                onChange={(e) =>
                                  setDraftEdits((p) => ({ ...p, subTopicFocus: e.target.value }))
                                }
                                placeholder="Leave blank to keep auto-generated focus"
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Extra Teaching Aid Note (optional)
                              </label>
                              <input
                                type="text"
                                maxLength={200}
                                value={draftEdits.teachingAidNote || ''}
                                onChange={(e) =>
                                  setDraftEdits((p) => ({ ...p, teachingAidNote: e.target.value }))
                                }
                                placeholder="e.g., Chart #4, Science Kit Box B"
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Custom Activity Note (optional)
                              </label>
                              <input
                                type="text"
                                maxLength={300}
                                value={draftEdits.activityNote || ''}
                                onChange={(e) =>
                                  setDraftEdits((p) => ({ ...p, activityNote: e.target.value }))
                                }
                                placeholder="Optional classroom adaptation"
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-slate-700 mb-1">
                                Custom Homework Note (optional)
                              </label>
                              <input
                                type="text"
                                maxLength={300}
                                value={draftEdits.homeworkNote || ''}
                                onChange={(e) =>
                                  setDraftEdits((p) => ({ ...p, homeworkNote: e.target.value }))
                                }
                                placeholder="Optional class-specific homework override"
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Private Classroom Remark (visible only to you)
                            </label>
                            <textarea
                              rows={2}
                              maxLength={400}
                              value={draftRemark}
                              onChange={(e) => setDraftRemark(e.target.value)}
                              placeholder="Record student doubts, pacing observations, or follow-up notes..."
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingKey(null)}
                              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => commitEditor(lp.lessonKey)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Private Note</span>
                            </button>
                          </div>
                        </div>
                      ) : lp.privateRemark ? (
                        <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-950">
                          <span className="font-semibold">Your Private Remark:</span>{' '}
                          {lp.privateRemark}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500">
                          No private remarks recorded for this lesson yet.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {filteredLessons.length > visibleLimit && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setVisibleLimit((prev) => prev + 30)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer tabular-nums"
          >
            Load More Sessions ({filteredLessons.length - visibleLimit} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
