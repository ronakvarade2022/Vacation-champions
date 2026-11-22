import React, { useEffect, useState } from 'react';
import { X, Plus, Trash2, Save, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  BoardCalendarConfig,
  CalendarDateRangeItem,
  CalendarHolidayItem,
  InstructionMedium,
  SaturdayRule,
  SchoolCalendarOverride,
} from '../../types/lessonPlanner';
import {
  BOARD_DISPLAY_NAMES,
  getAllowedMediumsForBoard,
  validateCalendarConfig,
} from '../../data/lessonPlanner/defaultBoardCalendars';
import { buildSchoolCalendarDocId } from '../../services/lessonPlannerFirestoreService';

interface SchoolCalendarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boardCalendar: BoardCalendarConfig;
  existingOverride: SchoolCalendarOverride | null;
  defaultSchoolName: string;
  isSaving: boolean;
  onSaveOverride: (override: SchoolCalendarOverride) => Promise<void>;
  onResetToBoardDefault: () => Promise<void>;
}

const WEEKDAY_OPTIONS = [
  { num: 1, label: 'Mon' },
  { num: 2, label: 'Tue' },
  { num: 3, label: 'Wed' },
  { num: 4, label: 'Thu' },
  { num: 5, label: 'Fri' },
  { num: 6, label: 'Sat' },
];

const SATURDAY_RULE_OPTIONS: { value: SaturdayRule; label: string }[] = [
  { value: 'off', label: 'All Saturdays Off' },
  { value: 'half_day', label: 'Half-Day Saturdays' },
  { value: 'full_day', label: 'Full-Day Saturdays' },
  { value: 'second_fourth_off', label: '2nd & 4th Saturdays Off' },
];

export const SchoolCalendarDrawer: React.FC<SchoolCalendarDrawerProps> = ({
  isOpen,
  onClose,
  boardCalendar,
  existingOverride,
  defaultSchoolName,
  isSaving,
  onSaveOverride,
  onResetToBoardDefault,
}) => {
  const allowedMediums = getAllowedMediumsForBoard(boardCalendar.board);

  const [schoolName, setSchoolName] = useState(
    existingOverride?.schoolName || defaultSchoolName
  );
  const [medium, setMedium] = useState<InstructionMedium>(
    existingOverride?.medium && allowedMediums.includes(existingOverride.medium)
      ? existingOverride.medium
      : allowedMediums[0]
  );
  const [startDate, setStartDate] = useState(
    existingOverride?.startDate || boardCalendar.startDate
  );
  const [reopeningDate, setReopeningDate] = useState(
    existingOverride?.reopeningDate || boardCalendar.reopeningDate
  );
  const [syllabusCompletionDeadline, setSyllabusCompletionDeadline] = useState(
    existingOverride?.syllabusCompletionDeadline || boardCalendar.syllabusCompletionDeadline
  );
  const [endDate, setEndDate] = useState(
    existingOverride?.endDate || boardCalendar.endDate
  );
  const [workingDaysOfWeek, setWorkingDaysOfWeek] = useState<number[]>(
    existingOverride?.workingDaysOfWeek?.length
      ? [...existingOverride.workingDaysOfWeek]
      : [...boardCalendar.workingDaysOfWeek]
  );
  const [saturdayRule, setSaturdayRule] = useState<SaturdayRule>(
    existingOverride?.saturdayRule || boardCalendar.saturdayRule
  );
  const [holidays, setHolidays] = useState<CalendarHolidayItem[]>(
    (existingOverride?.holidays || boardCalendar.holidays).map((h) => ({ ...h }))
  );
  const [vacations, setVacations] = useState<CalendarDateRangeItem[]>(
    (existingOverride?.vacations || boardCalendar.vacations).map((v) => ({ ...v }))
  );
  const [examWindows, setExamWindows] = useState<CalendarDateRangeItem[]>(
    (existingOverride?.examWindows || boardCalendar.examWindows).map((e) => ({ ...e }))
  );
  const [revisionWindows, setRevisionWindows] = useState<CalendarDateRangeItem[]>(
    (existingOverride?.revisionWindows || boardCalendar.revisionWindows).map((r) => ({ ...r }))
  );

  // Quick-add form states
  const [newHolDate, setNewHolDate] = useState('');
  const [newHolName, setNewHolName] = useState('');
  const [newVacName, setNewVacName] = useState('');
  const [newVacStart, setNewVacStart] = useState('');
  const [newVacEnd, setNewVacEnd] = useState('');
  const [newExamName, setNewExamName] = useState('');
  const [newExamStart, setNewExamStart] = useState('');
  const [newExamEnd, setNewExamEnd] = useState('');
  const [newExamTerm, setNewExamTerm] = useState<'Term 1' | 'Term 2' | 'Annual'>('Term 1');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSchoolName(existingOverride?.schoolName || defaultSchoolName);
    setMedium(
      existingOverride?.medium && allowedMediums.includes(existingOverride.medium)
        ? existingOverride.medium
        : allowedMediums[0]
    );
    setStartDate(existingOverride?.startDate || boardCalendar.startDate);
    setReopeningDate(existingOverride?.reopeningDate || boardCalendar.reopeningDate);
    setSyllabusCompletionDeadline(
      existingOverride?.syllabusCompletionDeadline || boardCalendar.syllabusCompletionDeadline
    );
    setEndDate(existingOverride?.endDate || boardCalendar.endDate);
    setWorkingDaysOfWeek(
      existingOverride?.workingDaysOfWeek?.length
        ? [...existingOverride.workingDaysOfWeek]
        : [...boardCalendar.workingDaysOfWeek]
    );
    setSaturdayRule(existingOverride?.saturdayRule || boardCalendar.saturdayRule);
    setHolidays((existingOverride?.holidays || boardCalendar.holidays).map((h) => ({ ...h })));
    setVacations((existingOverride?.vacations || boardCalendar.vacations).map((v) => ({ ...v })));
    setExamWindows(
      (existingOverride?.examWindows || boardCalendar.examWindows).map((e) => ({ ...e }))
    );
    setRevisionWindows(
      (existingOverride?.revisionWindows || boardCalendar.revisionWindows).map((r) => ({ ...r }))
    );
    setValidationErrors([]);
    setConfirmReset(false);
  }, [isOpen, boardCalendar, existingOverride, defaultSchoolName]);

  if (!isOpen) return null;

  const toggleWeekday = (dayNum: number) => {
    setWorkingDaysOfWeek((prev) => {
      if (prev.includes(dayNum)) {
        if (prev.length <= 1) return prev;
        return prev.filter((d) => d !== dayNum);
      }
      return [...prev, dayNum].sort((a, b) => a - b);
    });
  };

  const addHoliday = () => {
    if (!newHolDate || !newHolName.trim() || holidays.length >= 80) return;
    setHolidays((prev) =>
      [
        ...prev,
        {
          id: `sch_h_${Date.now()}`,
          date: newHolDate,
          name: newHolName.trim().slice(0, 100),
          category: 'school' as const,
        },
      ].sort((a, b) => a.date.localeCompare(b.date))
    );
    setNewHolDate('');
    setNewHolName('');
  };

  const addVacation = () => {
    if (!newVacName.trim() || !newVacStart || !newVacEnd || vacations.length >= 15) return;
    setVacations((prev) => [
      ...prev,
      {
        id: `sch_v_${Date.now()}`,
        name: newVacName.trim().slice(0, 120),
        startDate: newVacStart,
        endDate: newVacEnd,
        term: 'Term 1',
      },
    ]);
    setNewVacName('');
    setNewVacStart('');
    setNewVacEnd('');
  };

  const addExamWindow = () => {
    if (!newExamName.trim() || !newExamStart || !newExamEnd || examWindows.length >= 15) return;
    setExamWindows((prev) => [
      ...prev,
      {
        id: `sch_e_${Date.now()}`,
        name: newExamName.trim().slice(0, 120),
        startDate: newExamStart,
        endDate: newExamEnd,
        term: newExamTerm,
      },
    ]);
    setNewExamName('');
    setNewExamStart('');
    setNewExamEnd('');
  };

  const handleSave = async () => {
    const errors = validateCalendarConfig({
      startDate,
      reopeningDate,
      syllabusCompletionDeadline,
      endDate,
      workingDaysOfWeek,
      holidays,
      vacations,
      examWindows,
      revisionWindows,
    });
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);

    const override: SchoolCalendarOverride = {
      id: buildSchoolCalendarDocId(boardCalendar.academicYear, boardCalendar.board),
      board: boardCalendar.board,
      academicYear: boardCalendar.academicYear,
      schoolName: schoolName.trim() || defaultSchoolName,
      medium,
      startDate,
      reopeningDate,
      endDate,
      syllabusCompletionDeadline,
      workingDaysOfWeek,
      saturdayRule,
      holidays,
      vacations,
      examWindows,
      revisionWindows,
      updatedAt: new Date().toISOString(),
    };
    await onSaveOverride(override);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Private School Calendar Customiser"
    >
      <div className="w-full max-w-2xl bg-white h-full flex flex-col shadow-2xl border-l border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Private School Calendar Customiser
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {BOARD_DISPLAY_NAMES[boardCalendar.board]} · Academic Year {boardCalendar.academicYear} ·
              Saved privately to your teacher account only
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close school calendar customiser"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {validationErrors.length > 0 && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Please fix these calendar settings before saving:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* School Identity & Medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">School Name</label>
              <input
                type="text"
                maxLength={150}
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter your school name"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Default Instruction Medium
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value as InstructionMedium)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
              >
                {allowedMediums.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Key Academic Dates */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900">Academic Year Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-600 mb-1">Academic Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">School Reopening Date</label>
                <input
                  type="date"
                  value={reopeningDate}
                  onChange={(e) => setReopeningDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">
                  Syllabus Completion Deadline
                </label>
                <input
                  type="date"
                  value={syllabusCompletionDeadline}
                  onChange={(e) => setSyllabusCompletionDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">
                  Academic Year End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Working Days & Saturday Rule */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900">Working Weekdays &amp; Saturday Rule</h3>
            <div className="flex flex-wrap gap-2">
              {WEEKDAY_OPTIONS.map((d) => {
                const active = workingDaysOfWeek.includes(d.num);
                return (
                  <button
                    key={d.num}
                    type="button"
                    onClick={() => toggleWeekday(d.num)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                      active
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
            <div>
              <label className="block font-medium text-slate-600 mb-1">Saturday Schedule</label>
              <select
                value={saturdayRule}
                onChange={(e) => setSaturdayRule(e.target.value as SaturdayRule)}
                className="w-full sm:w-72 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
              >
                {SATURDAY_RULE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Holidays */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">
                School &amp; Public Holidays ({holidays.length}/80)
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={newHolDate}
                onChange={(e) => setNewHolDate(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <input
                type="text"
                value={newHolName}
                onChange={(e) => setNewHolName(e.target.value)}
                placeholder="Holiday name (e.g., Annual Sports Day)"
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <button
                type="button"
                onClick={addHoliday}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 rounded-lg border border-slate-200">
              {holidays.map((h) => (
                <div
                  key={h.id}
                  className="px-3 py-2 flex items-center justify-between gap-2 bg-white"
                >
                  <span className="text-slate-700 tabular-nums">
                    <span className="font-semibold text-slate-900">{h.date}</span> · {h.name}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove holiday ${h.name}`}
                    onClick={() => setHolidays((prev) => prev.filter((item) => item.id !== h.id))}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Vacations */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900">
              Vacations &amp; Term Breaks ({vacations.length}/15)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={newVacName}
                onChange={(e) => setNewVacName(e.target.value)}
                placeholder="Vacation name"
                className="sm:col-span-2 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <input
                type="date"
                value={newVacStart}
                onChange={(e) => setNewVacStart(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <div className="flex gap-1.5">
                <input
                  type="date"
                  value={newVacEnd}
                  onChange={(e) => setNewVacEnd(e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={addVacation}
                  aria-label="Add vacation"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {vacations.map((v) => (
                <div
                  key={v.id}
                  className="px-3 py-2 flex items-center justify-between gap-2 bg-white"
                >
                  <span className="text-slate-700 tabular-nums">
                    <span className="font-semibold text-slate-900">{v.name}</span> · {v.startDate}{' '}
                    to {v.endDate}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove vacation ${v.name}`}
                    onClick={() => setVacations((prev) => prev.filter((item) => item.id !== v.id))}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Examination Schedule */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900">
              Examination Schedule ({examWindows.length}/15)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              <input
                type="text"
                value={newExamName}
                onChange={(e) => setNewExamName(e.target.value)}
                placeholder="Exam name"
                className="sm:col-span-2 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <select
                value={newExamTerm}
                onChange={(e) => setNewExamTerm(e.target.value as 'Term 1' | 'Term 2' | 'Annual')}
                className="px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Annual">Annual</option>
              </select>
              <input
                type="date"
                value={newExamStart}
                onChange={(e) => setNewExamStart(e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <div className="flex gap-1.5">
                <input
                  type="date"
                  value={newExamEnd}
                  onChange={(e) => setNewExamEnd(e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={addExamWindow}
                  aria-label="Add exam window"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {examWindows.map((ex) => (
                <div
                  key={ex.id}
                  className="px-3 py-2 flex items-center justify-between gap-2 bg-white"
                >
                  <span className="text-slate-700 tabular-nums">
                    <span className="font-semibold text-slate-900">{ex.name}</span> ({ex.term || 'Annual'}) ·{' '}
                    {ex.startDate} to {ex.endDate}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove exam ${ex.name}`}
                    onClick={() =>
                      setExamWindows((prev) => prev.filter((item) => item.id !== ex.id))
                    }
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            {existingOverride && !confirmReset && (
              <button
                type="button"
                disabled={isSaving}
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Board Default</span>
              </button>
            )}
            {existingOverride && confirmReset && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-700 font-medium">Reset custom dates?</span>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={onResetToBoardDefault}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white text-xs font-semibold cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save & Recalculate All 3 Plans'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
