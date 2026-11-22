import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Archive,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Lock,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { ClassLevel, EducationBoard } from '../../types';
import {
  AcademicYearArchiveRecord,
  BoardCalendarConfig,
  CalendarDateRangeItem,
  CalendarHolidayItem,
  InstructionMedium,
  LessonPlannerGlobalSettings,
  SaturdayRule,
} from '../../types/lessonPlanner';
import { ALL_10_CLASSES } from '../../data/classCurriculumConfig';
import {
  BOARD_DISPLAY_NAMES,
  DEFAULT_GLOBAL_SETTINGS,
  buildRolledOverBoardCalendar,
  computeNextAcademicYearLabel,
  getAllowedMediumsForBoard,
  getDefaultBoardCalendar,
  validateCalendarConfig,
} from '../../data/lessonPlanner/defaultBoardCalendars';
import {
  getCurriculumReviewAudit,
  resolveBoardClassSubjectCurriculum,
} from '../../utils/lessonPlanner/curriculumAdapter';
import { computeCalendarArchiveSummary } from '../../utils/lessonPlanner/lessonPlanEngine';
import {
  fetchAcademicYearArchives,
  fetchAllActiveBoardCalendars,
  fetchGlobalLessonPlannerSettings,
  isVerifiedAdminFirebaseAuth,
  rolloverBoardAcademicYear,
  saveBoardCalendarConfig,
  saveGlobalLessonPlannerSettings,
} from '../../services/lessonPlannerFirestoreService';

interface AdminLessonPlannerSectionProps {
  selectedBoardWorkspace?: 'all' | EducationBoard;
}

type AdminPlannerSubView = 'calendars' | 'rollover' | 'curriculum_audit' | 'policies';

const BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];

const WEEKDAY_OPTIONS = [
  { num: 1, label: 'Mon' },
  { num: 2, label: 'Tue' },
  { num: 3, label: 'Wed' },
  { num: 4, label: 'Thu' },
  { num: 5, label: 'Fri' },
  { num: 6, label: 'Sat' },
];

const SATURDAY_RULES: { value: SaturdayRule; label: string }[] = [
  { value: 'off', label: 'All Saturdays Off' },
  { value: 'half_day', label: 'Half-Day Saturdays' },
  { value: 'full_day', label: 'Full-Day Saturdays' },
  { value: 'second_fourth_off', label: '2nd & 4th Saturdays Off' },
];

function formatIsoDate(iso?: string): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function escapeCsvCell(value: string | number | boolean): string {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export const AdminLessonPlannerSection: React.FC<AdminLessonPlannerSectionProps> = ({
  selectedBoardWorkspace = 'all',
}) => {
  const [subView, setSubView] = useState<AdminPlannerSubView>('calendars');
  const [activeBoard, setActiveBoard] = useState<EducationBoard>(
    selectedBoardWorkspace !== 'all' ? selectedBoardWorkspace : 'Maharashtra'
  );

  // Sync activeBoard when Admin changes the top board workspace switcher
  useEffect(() => {
    if (selectedBoardWorkspace !== 'all') {
      setActiveBoard(selectedBoardWorkspace);
      setAuditBoardFilter(selectedBoardWorkspace);
    }
  }, [selectedBoardWorkspace]);

  // Verified Admin auth check (mirrors firestore.rules isAdmin())
  const [adminAuthState, setAdminAuthState] = useState<{
    checked: boolean;
    verified: boolean;
    reason?: string;
  }>({ checked: false, verified: false });

  // Remote state for all 3 independent board calendars, archives, and global settings
  const [calendarsByBoard, setCalendarsByBoard] = useState<
    Record<EducationBoard, BoardCalendarConfig>
  >(() => ({
    Maharashtra: getDefaultBoardCalendar('Maharashtra'),
    CBSE: getDefaultBoardCalendar('CBSE'),
    ICSE: getDefaultBoardCalendar('ICSE'),
  }));
  const [draftCalendar, setDraftCalendar] = useState<BoardCalendarConfig>(() =>
    getDefaultBoardCalendar(
      selectedBoardWorkspace !== 'all' ? selectedBoardWorkspace : 'Maharashtra'
    )
  );
  const [globalSettings, setGlobalSettings] = useState<LessonPlannerGlobalSettings>({
    ...DEFAULT_GLOBAL_SETTINGS,
  });
  const [archives, setArchives] = useState<AcademicYearArchiveRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'error';
    message: string;
  } | null>(null);

  // Inline confirmation states (no window.confirm)
  const [confirmResetDefault, setConfirmResetDefault] = useState<boolean>(false);
  const [confirmRolloverOpen, setConfirmRolloverOpen] = useState<boolean>(false);

  // Add-item inputs for calendar arrays
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayName, setNewHolidayName] = useState('');
  const [newHolidayCategory, setNewHolidayCategory] =
    useState<CalendarHolidayItem['category']>('festival');

  const [newVacationName, setNewVacationName] = useState('');
  const [newVacationStart, setNewVacationStart] = useState('');
  const [newVacationEnd, setNewVacationEnd] = useState('');
  const [newVacationTerm, setNewVacationTerm] =
    useState<CalendarDateRangeItem['term']>('Term 1');

  const [newExamName, setNewExamName] = useState('');
  const [newExamStart, setNewExamStart] = useState('');
  const [newExamEnd, setNewExamEnd] = useState('');
  const [newExamTerm, setNewExamTerm] =
    useState<CalendarDateRangeItem['term']>('Term 1');

  const [newRevisionName, setNewRevisionName] = useState('');
  const [newRevisionStart, setNewRevisionStart] = useState('');
  const [newRevisionEnd, setNewRevisionEnd] = useState('');
  const [newRevisionTerm, setNewRevisionTerm] =
    useState<CalendarDateRangeItem['term']>('Term 1');

  // Rollover form inputs
  const [rolloverNextYear, setRolloverNextYear] = useState('');
  const [rolloverEdition, setRolloverEdition] = useState('');
  const [rolloverNote, setRolloverNote] = useState('');
  const [archiveBoardFilter, setArchiveBoardFilter] = useState<'all' | EducationBoard>('all');

  // Curriculum Audit filters
  const [auditBoardFilter, setAuditBoardFilter] = useState<'all' | EducationBoard>(
    selectedBoardWorkspace
  );
  const [auditClassFilter, setAuditClassFilter] = useState<'all' | ClassLevel>('all');
  const [auditStatusFilter, setAuditStatusFilter] = useState<
    'all' | 'needs_review' | 'verified'
  >('all');
  const [auditGroupFilter, setAuditGroupFilter] = useState<
    'all' | 'core_board' | 'combined_enrichment'
  >('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [expandedAuditKey, setExpandedAuditKey] = useState<string | null>(null);

  const loadAllData = useCallback(async () => {
    setIsLoading(true);
    const [authCheck, allCals, settings, archiveList] = await Promise.all([
      isVerifiedAdminFirebaseAuth(),
      fetchAllActiveBoardCalendars(),
      fetchGlobalLessonPlannerSettings(),
      fetchAcademicYearArchives(),
    ]);
    setAdminAuthState({
      checked: true,
      verified: authCheck.verified,
      reason: authCheck.reason,
    });
    setCalendarsByBoard(allCals);
    setGlobalSettings(settings);
    setArchives(archiveList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadAllData();
  }, [loadAllData]);

  // Update draft calendar & rollover suggestions whenever activeBoard or stored board calendar changes
  useEffect(() => {
    const activeCal = calendarsByBoard[activeBoard];
    if (!activeCal) return;
    setDraftCalendar({
      ...activeCal,
      workingDaysOfWeek: [...activeCal.workingDaysOfWeek],
      holidays: activeCal.holidays.map((h) => ({ ...h })),
      vacations: activeCal.vacations.map((v) => ({ ...v })),
      examWindows: activeCal.examWindows.map((e) => ({ ...e })),
      revisionWindows: activeCal.revisionWindows.map((r) => ({ ...r })),
    });
    const nextYear = computeNextAcademicYearLabel(activeCal.academicYear);
    const previewNext = buildRolledOverBoardCalendar(activeCal, nextYear);
    setRolloverNextYear(previewNext.academicYear);
    setRolloverEdition(previewNext.textbookEdition);
    setRolloverNote('');
    setConfirmResetDefault(false);
    setConfirmRolloverOpen(false);
  }, [activeBoard, calendarsByBoard]);

  // Validation & live impact summary for current draft
  const calendarValidationErrors = useMemo(
    () => validateCalendarConfig(draftCalendar),
    [draftCalendar]
  );

  const draftImpactSummary = useMemo(() => {
    if (calendarValidationErrors.length > 0) return null;
    return computeCalendarArchiveSummary(draftCalendar);
  }, [draftCalendar, calendarValidationErrors.length]);

  const rolloverPreview = useMemo(() => {
    const current = calendarsByBoard[activeBoard];
    if (!current) return null;
    const nextCal = buildRolledOverBoardCalendar(
      current,
      rolloverNextYear.trim() || undefined,
      rolloverEdition.trim() || undefined
    );
    return {
      current,
      nextCal,
      currentSummary: computeCalendarArchiveSummary(current),
      nextSummary: computeCalendarArchiveSummary(nextCal),
      validationErrors: validateCalendarConfig(nextCal),
    };
  }, [activeBoard, calendarsByBoard, rolloverNextYear, rolloverEdition]);

  // Curriculum Audit Data (strictly read-only against existing 382 registry entries)
  const fullCurriculumAudit = useMemo(() => getCurriculumReviewAudit(), []);

  const boardBreakdown = useMemo(() => {
    return BOARDS.map((b) => {
      const boardRows = fullCurriculumAudit.rows.filter((r) => r.board === b);
      const verified = boardRows.filter(
        (r) => r.curriculumSourceType === 'verified_board_chapters'
      ).length;
      const review = boardRows.length - verified;
      return { board: b, total: boardRows.length, verified, review };
    });
  }, [fullCurriculumAudit.rows]);

  const filteredAuditRows = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    return fullCurriculumAudit.rows.filter((row) => {
      if (auditBoardFilter !== 'all' && row.board !== auditBoardFilter) return false;
      if (auditClassFilter !== 'all' && row.classLevel !== auditClassFilter) return false;
      if (auditStatusFilter === 'needs_review' && !row.needsAdminReview) return false;
      if (auditStatusFilter === 'verified' && row.needsAdminReview) return false;
      if (auditGroupFilter !== 'all' && row.subjectGroup !== auditGroupFilter) return false;
      if (q) {
        const hay = `${row.board} ${row.classLevel} ${row.subject} ${row.bookTitle}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    fullCurriculumAudit.rows,
    auditBoardFilter,
    auditClassFilter,
    auditStatusFilter,
    auditGroupFilter,
    auditSearch,
  ]);

  const filteredArchives = useMemo(() => {
    if (archiveBoardFilter === 'all') return archives;
    return archives.filter((a) => a.board === archiveBoardFilter);
  }, [archives, archiveBoardFilter]);

  // Draft Calendar Mutators
  const toggleWorkingDay = (dayNum: number) => {
    setDraftCalendar((prev) => {
      const exists = prev.workingDaysOfWeek.includes(dayNum);
      if (exists && prev.workingDaysOfWeek.length <= 1) return prev;
      const nextDays = exists
        ? prev.workingDaysOfWeek.filter((d) => d !== dayNum)
        : [...prev.workingDaysOfWeek, dayNum].sort((a, b) => a - b);
      return { ...prev, workingDaysOfWeek: nextDays };
    });
  };

  const handleAddHoliday = () => {
    if (!newHolidayDate || !newHolidayName.trim()) return;
    if (draftCalendar.holidays.length >= 80) return;
    const item: CalendarHolidayItem = {
      id: `${activeBoard.toLowerCase().slice(0, 2)}_h_${Date.now()}`,
      date: newHolidayDate,
      name: newHolidayName.trim().slice(0, 100),
      category: newHolidayCategory,
    };
    setDraftCalendar((prev) => ({
      ...prev,
      holidays: [...prev.holidays, item].sort((a, b) => a.date.localeCompare(b.date)),
    }));
    setNewHolidayDate('');
    setNewHolidayName('');
  };

  const handleAddRange = (
    field: 'vacations' | 'examWindows' | 'revisionWindows',
    name: string,
    startDate: string,
    endDate: string,
    term: CalendarDateRangeItem['term'],
    clearInputs: () => void
  ) => {
    if (!name.trim() || !startDate || !endDate || startDate > endDate) return;
    if (draftCalendar[field].length >= 15) return;
    const item: CalendarDateRangeItem = {
      id: `${activeBoard.toLowerCase().slice(0, 2)}_${field.slice(0, 2)}_${Date.now()}`,
      name: name.trim().slice(0, 120),
      startDate,
      endDate,
      term,
    };
    setDraftCalendar((prev) => ({
      ...prev,
      [field]: [...prev[field], item].sort((a, b) => a.startDate.localeCompare(b.startDate)),
    }));
    clearInputs();
  };

  const handlePublishBoardCalendar = async () => {
    setFeedback(null);
    if (calendarValidationErrors.length > 0) {
      setFeedback({ kind: 'error', message: calendarValidationErrors[0] });
      return;
    }
    setIsSaving(true);
    const result = await saveBoardCalendarConfig(draftCalendar);
    setIsSaving(false);
    if (result.success && result.calendar) {
      setCalendarsByBoard((prev) => ({
        ...prev,
        [activeBoard]: result.calendar!,
      }));
      setFeedback({
        kind: 'success',
        message: `${BOARD_DISPLAY_NAMES[activeBoard]} calendar (${result.calendar.academicYear}) published (v${result.calendar.version}). All teachers on this board will recalculate automatically.`,
      });
    } else {
      setFeedback({
        kind: 'error',
        message: result.error || 'Could not publish board calendar.',
      });
    }
  };

  const handleResetDraftToOfficialDefault = () => {
    const def = getDefaultBoardCalendar(activeBoard);
    setDraftCalendar({
      ...def,
      version: calendarsByBoard[activeBoard]?.version || 1,
    });
    setConfirmResetDefault(false);
    setFeedback({
      kind: 'success',
      message: `Loaded official default ${BOARD_DISPLAY_NAMES[activeBoard]} calendar into draft. Click "Publish Board Calendar" to save to Firestore.`,
    });
  };

  const handleExecuteRollover = async () => {
    setFeedback(null);
    const currentCal = calendarsByBoard[activeBoard];
    if (!currentCal) return;
    setIsSaving(true);
    const result = await rolloverBoardAcademicYear({
      currentCalendar: currentCal,
      nextAcademicYear: rolloverNextYear.trim() || undefined,
      nextTextbookEdition: rolloverEdition.trim() || undefined,
      archiveNote: rolloverNote.trim() || undefined,
    });
    setIsSaving(false);
    setConfirmRolloverOpen(false);
    if (result.success && result.newCalendar && result.archiveRecord) {
      setCalendarsByBoard((prev) => ({
        ...prev,
        [activeBoard]: result.newCalendar!,
      }));
      setArchives((prev) => [result.archiveRecord!, ...prev]);
      setFeedback({
        kind: 'success',
        message: `Atomic rollover complete for ${BOARD_DISPLAY_NAMES[activeBoard]}: archived ${result.archiveRecord.academicYear} (immutable) and activated ${result.newCalendar.academicYear}. Other boards were not modified.`,
      });
    } else {
      setFeedback({
        kind: 'error',
        message: result.error || 'Academic year rollover failed.',
      });
    }
  };

  const handleSaveGlobalPolicies = async () => {
    setFeedback(null);
    setIsSaving(true);
    const result = await saveGlobalLessonPlannerSettings(globalSettings);
    setIsSaving(false);
    if (result.success && result.settings) {
      setGlobalSettings(result.settings);
      setFeedback({
        kind: 'success',
        message: 'Global Lesson Planner policies saved to Firestore.',
      });
    } else {
      setFeedback({
        kind: 'error',
        message: result.error || 'Could not save global settings.',
      });
    }
  };

  const handleExportAuditCsv = () => {
    const headers = [
      'Board',
      'Class',
      'Subject',
      'Subject Group',
      'Textbook Title',
      'Unit Count',
      'Classification',
      'Needs Admin Review',
    ];
    const lines = [
      headers.map(escapeCsvCell).join(','),
      ...filteredAuditRows.map((r) =>
        [
          r.board,
          r.classLevel,
          r.subject,
          r.subjectGroup === 'core_board' ? 'Core Board' : 'Combined / Enrichment',
          r.bookTitle,
          r.unitCount,
          r.curriculumSourceLabel,
          r.needsAdminReview ? 'YES' : 'NO',
        ]
          .map(escapeCsvCell)
          .join(',')
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mystudyzone-curriculum-review-audit-${auditBoardFilter.toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Header & Verified Admin Status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              Teacher Lesson Planner — Academic Calendars &amp; Curriculum Review
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage independent board calendars for Maharashtra SSC, CBSE, and ICSE, execute atomic
              academic-year rollovers into immutable archives, and review curriculum unit verification.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadAllData()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Verified Firebase Admin Auth Notice */}
        {adminAuthState.checked && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-xs flex items-start gap-2.5 ${
              adminAuthState.verified
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            {adminAuthState.verified ? (
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {adminAuthState.verified
                  ? 'Verified Administrator Firebase session active — cloud calendar publishing & rollover enabled.'
                  : 'Read-only preview mode — Verified Firebase Admin sign-in required to publish changes.'}
              </p>
              {!adminAuthState.verified && adminAuthState.reason && (
                <p className="mt-0.5 text-amber-800">{adminAuthState.reason}</p>
              )}
            </div>
          </div>
        )}

        {/* Sub-view Navigation */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          {[
            { id: 'calendars' as const, label: 'Board Academic Calendars', icon: Calendar },
            {
              id: 'rollover' as const,
              label: `Academic Year Rollover & Archives (${archives.length})`,
              icon: Archive,
            },
            {
              id: 'curriculum_audit' as const,
              label: `Curriculum Review Audit (${fullCurriculumAudit.summary.planningUnitsReviewCount} Pending)`,
              icon: BookOpen,
            },
            { id: 'policies' as const, label: 'Global Planner Policies', icon: Settings2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = subView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSubView(tab.id);
                  setFeedback(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs font-medium flex items-center justify-between gap-3 ${
            feedback.kind === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-semibold underline cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =====================================================================
          SUB-VIEW 1: INDEPENDENT BOARD ACADEMIC CALENDARS
          ===================================================================== */}
      {subView === 'calendars' && (
        <div className="space-y-5">
          {/* Independent Board Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {BOARDS.map((b) => {
                const cal = calendarsByBoard[b];
                const isSelected = activeBoard === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setActiveBoard(b);
                      setFeedback(null);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {BOARD_DISPLAY_NAMES[b]} · AY {cal.academicYear}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">
              Independent board config — editing {activeBoard} never modifies the other two boards.
            </p>
          </div>

          {/* Live Calendar Impact Summary */}
          {draftImpactSummary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { label: 'Calendar Days', val: draftImpactSummary.totalCalendarDays },
                { label: 'Working Days', val: draftImpactSummary.totalWorkingDays },
                { label: 'Net Teaching Days', val: draftImpactSummary.netTeachingDays },
                { label: 'Holidays', val: draftImpactSummary.totalHolidayDays },
                { label: 'Vacation Days', val: draftImpactSummary.totalVacationDays },
                { label: 'Exam Days', val: draftImpactSummary.totalExamDays },
                { label: 'Revision Days', val: draftImpactSummary.totalRevisionDays },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3"
                >
                  <p className="text-[11px] font-medium text-slate-500">{m.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-slate-900 tabular-nums">{m.val}</p>
                </div>
              ))}
            </div>
          )}

          {/* Validation Errors */}
          {calendarValidationErrors.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 space-y-1">
              <p className="font-semibold">Fix these calendar date errors before publishing:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                {calendarValidationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Board Calendar Dates & Metadata */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {BOARD_DISPLAY_NAMES[activeBoard]} — Core Academic Dates &amp; Schedule Rules
                </h3>
                <p className="text-xs text-slate-500 tabular-nums">
                  Document ID: {draftCalendar.id} · Version {draftCalendar.version} · Last Updated{' '}
                  {formatIsoDate(draftCalendar.updatedAt?.slice(0, 10))}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!confirmResetDefault ? (
                  <button
                    type="button"
                    onClick={() => setConfirmResetDefault(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Load Official Default</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 text-xs">
                    <span className="font-semibold text-amber-900">Replace draft?</span>
                    <button
                      type="button"
                      onClick={handleResetDraftToOfficialDefault}
                      className="px-2 py-1 rounded bg-amber-600 text-white font-semibold cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmResetDefault(false)}
                      className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  disabled={isSaving || calendarValidationErrors.length > 0 || !adminAuthState.verified}
                  onClick={() => void handlePublishBoardCalendar()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Publishing...' : 'Publish Board Calendar'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={draftCalendar.academicYear}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({ ...p, academicYear: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium tabular-nums"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Period Duration (min)
                </label>
                <input
                  type="number"
                  min={20}
                  max={90}
                  value={draftCalendar.defaultPeriodMinutes}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({
                      ...p,
                      defaultPeriodMinutes: Number(e.target.value) || 40,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium tabular-nums"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Textbook Edition Label
                </label>
                <input
                  type="text"
                  value={draftCalendar.textbookEdition}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({ ...p, textbookEdition: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year Start Date</label>
                <input
                  type="date"
                  value={draftCalendar.startDate}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({ ...p, startDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white tabular-nums"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  School Reopening Date
                </label>
                <input
                  type="date"
                  value={draftCalendar.reopeningDate}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({ ...p, reopeningDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white tabular-nums"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Syllabus Completion Deadline
                </label>
                <input
                  type="date"
                  value={draftCalendar.syllabusCompletionDeadline}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({
                      ...p,
                      syllabusCompletionDeadline: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white tabular-nums"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year End Date</label>
                <input
                  type="date"
                  value={draftCalendar.endDate}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({ ...p, endDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white tabular-nums"
                />
              </div>
            </div>

            {/* Working Weekdays & Saturday Rule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Working Weekdays (Sunday excluded automatically)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {WEEKDAY_OPTIONS.map((wd) => {
                    const active = draftCalendar.workingDaysOfWeek.includes(wd.num);
                    return (
                      <button
                        key={wd.num}
                        type="button"
                        onClick={() => toggleWorkingDay(wd.num)}
                        className={`px-3 py-1.5 rounded-lg font-semibold border cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {wd.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Saturday Schedule Rule
                </label>
                <select
                  value={draftCalendar.saturdayRule}
                  onChange={(e) =>
                    setDraftCalendar((p) => ({
                      ...p,
                      saturdayRule: e.target.value as SaturdayRule,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {SATURDAY_RULES.map((sr) => (
                    <option key={sr.value} value={sr.value}>
                      {sr.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Holidays + Vacations + Exam Windows + Revision Windows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Holidays */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Official Board Holidays ({draftCalendar.holidays.length}/80)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                <input
                  type="date"
                  value={newHolidayDate}
                  onChange={(e) => setNewHolidayDate(e.target.value)}
                  className="sm:col-span-4 px-2.5 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <input
                  type="text"
                  value={newHolidayName}
                  onChange={(e) => setNewHolidayName(e.target.value)}
                  placeholder="Holiday name"
                  className="sm:col-span-5 px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
                <select
                  value={newHolidayCategory}
                  onChange={(e) =>
                    setNewHolidayCategory(e.target.value as CalendarHolidayItem['category'])
                  }
                  className="sm:col-span-2 px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="national">Nat.</option>
                  <option value="state">State</option>
                  <option value="festival">Fest.</option>
                  <option value="school">Other</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddHoliday}
                  className="sm:col-span-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  aria-label="Add holiday"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-lg">
                {draftCalendar.holidays.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-slate-500 mr-2 tabular-nums">
                        {formatIsoDate(h.date)}
                      </span>
                      <span className="font-medium text-slate-800">{h.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftCalendar((p) => ({
                          ...p,
                          holidays: p.holidays.filter((x) => x.id !== h.id),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      aria-label={`Remove ${h.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Vacations */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Vacations &amp; Term Breaks ({draftCalendar.vacations.length}/15)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                <input
                  type="text"
                  value={newVacationName}
                  onChange={(e) => setNewVacationName(e.target.value)}
                  placeholder="Vacation name"
                  className="sm:col-span-5 px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="date"
                  value={newVacationStart}
                  onChange={(e) => setNewVacationStart(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <input
                  type="date"
                  value={newVacationEnd}
                  onChange={(e) => setNewVacationEnd(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleAddRange(
                      'vacations',
                      newVacationName,
                      newVacationStart,
                      newVacationEnd,
                      newVacationTerm,
                      () => {
                        setNewVacationName('');
                        setNewVacationStart('');
                        setNewVacationEnd('');
                      }
                    )
                  }
                  className="sm:col-span-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  aria-label="Add vacation"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg">
                {draftCalendar.vacations.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{v.name}</p>
                      <p className="text-slate-500 tabular-nums">
                        {formatIsoDate(v.startDate)} – {formatIsoDate(v.endDate)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftCalendar((p) => ({
                          ...p,
                          vacations: p.vacations.filter((x) => x.id !== v.id),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      aria-label={`Remove ${v.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Windows */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Examination Windows ({draftCalendar.examWindows.length}/15)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                <input
                  type="text"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="Exam name"
                  className="sm:col-span-4 px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="date"
                  value={newExamStart}
                  onChange={(e) => setNewExamStart(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <input
                  type="date"
                  value={newExamEnd}
                  onChange={(e) => setNewExamEnd(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <select
                  value={newExamTerm}
                  onChange={(e) =>
                    setNewExamTerm(e.target.value as CalendarDateRangeItem['term'])
                  }
                  className="sm:col-span-1 px-1 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Term 1">T1</option>
                  <option value="Term 2">T2</option>
                  <option value="Annual">Ann</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    handleAddRange(
                      'examWindows',
                      newExamName,
                      newExamStart,
                      newExamEnd,
                      newExamTerm,
                      () => {
                        setNewExamName('');
                        setNewExamStart('');
                        setNewExamEnd('');
                      }
                    )
                  }
                  className="sm:col-span-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  aria-label="Add exam window"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg">
                {draftCalendar.examWindows.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {ex.name} · <span className="text-slate-500">{ex.term || 'Term 1'}</span>
                      </p>
                      <p className="text-slate-500 tabular-nums">
                        {formatIsoDate(ex.startDate)} – {formatIsoDate(ex.endDate)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftCalendar((p) => ({
                          ...p,
                          examWindows: p.examWindows.filter((x) => x.id !== ex.id),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      aria-label={`Remove ${ex.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Revision Windows */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Revision Sprints ({draftCalendar.revisionWindows.length}/15)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                <input
                  type="text"
                  value={newRevisionName}
                  onChange={(e) => setNewRevisionName(e.target.value)}
                  placeholder="Revision sprint name"
                  className="sm:col-span-4 px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="date"
                  value={newRevisionStart}
                  onChange={(e) => setNewRevisionStart(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <input
                  type="date"
                  value={newRevisionEnd}
                  onChange={(e) => setNewRevisionEnd(e.target.value)}
                  className="sm:col-span-3 px-2 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                />
                <select
                  value={newRevisionTerm}
                  onChange={(e) =>
                    setNewRevisionTerm(e.target.value as CalendarDateRangeItem['term'])
                  }
                  className="sm:col-span-1 px-1 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Term 1">T1</option>
                  <option value="Term 2">T2</option>
                  <option value="Annual">Ann</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    handleAddRange(
                      'revisionWindows',
                      newRevisionName,
                      newRevisionStart,
                      newRevisionEnd,
                      newRevisionTerm,
                      () => {
                        setNewRevisionName('');
                        setNewRevisionStart('');
                        setNewRevisionEnd('');
                      }
                    )
                  }
                  className="sm:col-span-1 inline-flex items-center justify-center px-2 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  aria-label="Add revision sprint"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg">
                {draftCalendar.revisionWindows.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {rev.name} · <span className="text-slate-500">{rev.term || 'Annual'}</span>
                      </p>
                      <p className="text-slate-500 tabular-nums">
                        {formatIsoDate(rev.startDate)} – {formatIsoDate(rev.endDate)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftCalendar((p) => ({
                          ...p,
                          revisionWindows: p.revisionWindows.filter((x) => x.id !== rev.id),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      aria-label={`Remove ${rev.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-VIEW 2: ATOMIC ACADEMIC YEAR ROLLOVER & IMMUTABLE ARCHIVES
          ===================================================================== */}
      {subView === 'rollover' && rolloverPreview && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Single-Board Atomic Academic Year Rollover
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Atomically archives the active year into a permanent, read-only snapshot in{' '}
                  <code>/academic_year_archives</code> and activates the next year in{' '}
                  <code>/academic_calendars</code> for the chosen board only.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {BOARDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setActiveBoard(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                      activeBoard === b
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Next Academic Year Label
                </label>
                <input
                  type="text"
                  value={rolloverNextYear}
                  onChange={(e) => setRolloverNextYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium tabular-nums"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Next Textbook Edition
                </label>
                <input
                  type="text"
                  value={rolloverEdition}
                  onChange={(e) => setRolloverEdition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Archive Audit Note (Optional)
                </label>
                <input
                  type="text"
                  value={rolloverNote}
                  onChange={(e) => setRolloverNote(e.target.value)}
                  placeholder="e.g., End-of-year board schedule rollover"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
                <p className="font-bold text-slate-800">
                  Will Be Permanently Archived (Immutable Snapshot)
                </p>
                <p className="text-slate-600">
                  {BOARD_DISPLAY_NAMES[activeBoard]} · AY {rolloverPreview.current.academicYear}
                </p>
                <p className="text-slate-600 tabular-nums">
                  {formatIsoDate(rolloverPreview.current.startDate)} to{' '}
                  {formatIsoDate(rolloverPreview.current.endDate)} · Net Teaching Days:{' '}
                  <strong>{rolloverPreview.currentSummary.netTeachingDays}</strong>
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-1.5">
                <p className="font-bold text-emerald-950">
                  Will Become Active Calendar ({activeBoard} Only)
                </p>
                <p className="text-emerald-900">
                  {BOARD_DISPLAY_NAMES[activeBoard]} · AY {rolloverPreview.nextCal.academicYear}
                </p>
                <p className="text-emerald-800 tabular-nums">
                  {formatIsoDate(rolloverPreview.nextCal.startDate)} to{' '}
                  {formatIsoDate(rolloverPreview.nextCal.endDate)} · Net Teaching Days:{' '}
                  <strong>{rolloverPreview.nextSummary.netTeachingDays}</strong>
                </p>
              </div>
            </div>

            {!confirmRolloverOpen ? (
              <button
                type="button"
                disabled={
                  !adminAuthState.verified ||
                  isSaving ||
                  rolloverPreview.validationErrors.length > 0
                }
                onClick={() => setConfirmRolloverOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Archive className="w-4 h-4" />
                <span>
                  Update Academic Year for {activeBoard} ({rolloverPreview.current.academicYear} →{' '}
                  {rolloverPreview.nextCal.academicYear})
                </span>
              </button>
            ) : (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3 text-xs">
                <p className="font-bold text-amber-950">
                  Confirm Atomic Academic Year Rollover for {BOARD_DISPLAY_NAMES[activeBoard]}
                </p>
                <p className="text-amber-900">
                  Archived snapshots in <code>/academic_year_archives</code> are enforced as
                  permanently immutable by Firestore security rules and cannot be edited or deleted
                  later. Teachers&apos; private records remain untouched.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleExecuteRollover()}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? 'Executing Atomic Rollover...' : 'Confirm & Commit Batch'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRolloverOpen(false)}
                    className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Immutable Archive Ledger */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Immutable Academic Year Archives ({filteredArchives.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Protected against update and deletion by Firestore rules (`allow update, delete: if false`).
                </p>
              </div>
              <select
                value={archiveBoardFilter}
                onChange={(e) => setArchiveBoardFilter(e.target.value as 'all' | EducationBoard)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700"
              >
                <option value="all">All Boards</option>
                {BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {filteredArchives.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center text-xs text-slate-500">
                No academic year archives created yet. Run an Academic Year Rollover above to create
                the first immutable snapshot.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                      <th className="py-2.5 pr-3">Board</th>
                      <th className="py-2.5 px-3">Academic Year</th>
                      <th className="py-2.5 px-3">Date Range</th>
                      <th className="py-2.5 px-3 text-right">Working Days</th>
                      <th className="py-2.5 px-3 text-right">Net Teaching</th>
                      <th className="py-2.5 px-3">Archived On</th>
                      <th className="py-2.5 pl-3">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredArchives.map((arch) => (
                      <tr key={arch.id} className="hover:bg-slate-50">
                        <td className="py-2.5 pr-3 font-semibold text-slate-900">{arch.board}</td>
                        <td className="py-2.5 px-3 font-medium tabular-nums">
                          {arch.academicYear}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 tabular-nums">
                          {formatIsoDate(arch.calendarSnapshot?.startDate)} –{' '}
                          {formatIsoDate(arch.calendarSnapshot?.endDate)}
                        </td>
                        <td className="py-2.5 px-3 text-right tabular-nums">
                          {arch.summaryStats?.totalWorkingDays ?? '—'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold tabular-nums">
                          {arch.summaryStats?.netTeachingDays ?? '—'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 tabular-nums">
                          {formatIsoDate(arch.archivedAt?.slice(0, 10))}
                        </td>
                        <td className="py-2.5 pl-3">
                          <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                            <Lock className="w-3 h-3 text-slate-500" />
                            Immutable
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-VIEW 3: CURRICULUM VERIFICATION & ADMIN REVIEW AUDIT (382 SUBJECTS)
          ===================================================================== */}
      {subView === 'curriculum_audit' && (
        <div className="space-y-5">
          {/* Board-Wise Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500">All 3 Boards Combined</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
                {fullCurriculumAudit.summary.totalSubjects} Subjects
              </p>
              <p className="mt-1 text-xs text-slate-600 tabular-nums">
                {fullCurriculumAudit.summary.verifiedBoardCount} Verified ·{' '}
                {fullCurriculumAudit.summary.planningUnitsReviewCount} Pending Review
              </p>
            </div>
            {boardBreakdown.map((item) => (
              <div
                key={item.board}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="text-xs font-medium text-slate-500">
                  {BOARD_DISPLAY_NAMES[item.board]}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
                  {item.total} Subjects
                </p>
                <p className="mt-1 text-xs tabular-nums">
                  <span className="text-emerald-700 font-semibold">{item.verified} Verified</span>
                  <span className="text-slate-400"> · </span>
                  <span className="text-amber-700 font-semibold">{item.review} Planning Units</span>
                </p>
              </div>
            ))}
          </div>

          {/* Transparent Classification Policy Note */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-950">
            <strong>Curriculum Integrity Policy:</strong> All 382 original subject mappings in the
            curriculum registries remain untouched. Unverified entries — including all{' '}
            <strong className="tabular-nums">157 Maharashtra entries</strong> — remain explicitly
            labeled as <strong>Curriculum-Based Planning Units</strong> and are never presented as
            official textbook chapters until independently verified.
          </div>

          {/* Filters + Export */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={auditBoardFilter}
                  onChange={(e) => setAuditBoardFilter(e.target.value as 'all' | EducationBoard)}
                  className="px-2.5 py-2 rounded-lg border border-slate-200 bg-white font-semibold"
                >
                  <option value="all">All Boards (382)</option>
                  {BOARDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={auditClassFilter}
                  onChange={(e) => setAuditClassFilter(e.target.value as 'all' | ClassLevel)}
                  className="px-2.5 py-2 rounded-lg border border-slate-200 bg-white font-semibold"
                >
                  <option value="all">All Classes (1–10)</option>
                  {ALL_10_CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={auditStatusFilter}
                  onChange={(e) =>
                    setAuditStatusFilter(
                      e.target.value as 'all' | 'needs_review' | 'verified'
                    )
                  }
                  className="px-2.5 py-2 rounded-lg border border-slate-200 bg-white font-semibold"
                >
                  <option value="all">All Verification States</option>
                  <option value="needs_review">Needs Admin Review (Planning Units)</option>
                  <option value="verified">Verified Board Chapters</option>
                </select>

                <select
                  value={auditGroupFilter}
                  onChange={(e) =>
                    setAuditGroupFilter(
                      e.target.value as 'all' | 'core_board' | 'combined_enrichment'
                    )
                  }
                  className="px-2.5 py-2 rounded-lg border border-slate-200 bg-white font-semibold"
                >
                  <option value="all">All Subject Groups</option>
                  <option value="core_board">Core Board Subjects</option>
                  <option value="combined_enrichment">Combined / Enrichment</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="Filter subject or textbook..."
                    className="pl-8 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-xs w-52"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportAuditCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV ({filteredAuditRows.length})</span>
              </button>
            </div>

            {/* Audit Table */}
            <div className="overflow-x-auto max-h-[540px] overflow-y-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Board / Class</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Group</th>
                    <th className="py-2.5 px-3 text-right">Units</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditRows.map((row) => {
                    const rowKey = `${row.board}__${row.classLevel}__${row.subject}`;
                    const isExpanded = expandedAuditKey === rowKey;
                    const resolvedDetail = isExpanded
                      ? resolveBoardClassSubjectCurriculum(row.board, row.classLevel, row.subject)
                      : null;

                    return (
                      <React.Fragment key={rowKey}>
                        <tr className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                            {row.board} · {row.classLevel}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {row.subject}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {row.subjectGroup === 'core_board' ? 'Core Board' : 'Enrichment'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold tabular-nums">
                            {row.unitCount}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`font-semibold ${
                                row.needsAdminReview ? 'text-amber-800' : 'text-emerald-800'
                              }`}
                            >
                              {row.curriculumSourceLabel}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedAuditKey(isExpanded ? null : rowKey)
                              }
                              className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-950 font-semibold cursor-pointer"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                              <span>{isExpanded ? 'Hide' : 'Units'}</span>
                            </button>
                          </td>
                        </tr>

                        {isExpanded && resolvedDetail && (
                          <tr className="bg-slate-50/80">
                            <td colSpan={6} className="px-4 py-3 space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                                <span>
                                  <strong>Reference:</strong> {resolvedDetail.bookTitle} (
                                  {resolvedDetail.publisher}) · Code: {resolvedDetail.syllabusCode}
                                </span>
                                <span>
                                  {resolvedDetail.needsAdminReview
                                    ? 'Status: Pending Admin Textbook Chapter Verification'
                                    : 'Status: Verified Explicit Board Chapter Map'}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
                                {resolvedDetail.units.map((u) => (
                                  <div
                                    key={u.unitId}
                                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800"
                                  >
                                    <span className="font-mono text-slate-500 mr-1.5">
                                      {u.unitNumber}.
                                    </span>
                                    <span className="font-medium">{u.title}</span>
                                    <span className="text-slate-400 ml-1.5">
                                      ({u.recommendedTerm})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-VIEW 4: GLOBAL LESSON PLANNER POLICIES
          ===================================================================== */}
      {subView === 'policies' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Global Teacher Lesson Planner Policies
              </h3>
              <p className="text-xs text-slate-500">
                Stored in <code>/academic_calendars/global_settings</code> and applied across all
                Teacher Portal lesson planning sessions.
              </p>
            </div>
            <button
              type="button"
              disabled={isSaving || !adminAuthState.verified}
              onClick={() => void handleSaveGlobalPolicies()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Global Policies'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Fallback Period Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={20}
                  max={90}
                  value={globalSettings.defaultPeriodMinutes}
                  onChange={(e) =>
                    setGlobalSettings((p) => ({
                      ...p,
                      defaultPeriodMinutes: Number(e.target.value) || 40,
                    }))
                  }
                  className="w-36 px-3 py-2 rounded-lg border border-slate-300 font-medium tabular-nums"
                />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={globalSettings.allowTeacherCalendarCustomization}
                  onChange={(e) =>
                    setGlobalSettings((p) => ({
                      ...p,
                      allowTeacherCalendarCustomization: e.target.checked,
                    }))
                  }
                  className="mt-0.5 rounded border-slate-300"
                />
                <span>
                  <strong className="block text-slate-900">
                    Allow Teachers to Customize Private School Calendar
                  </strong>
                  <span className="text-slate-500">
                    Lets each teacher maintain their own school holidays, vacations, and exam dates
                    privately without affecting other teachers or board defaults.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={globalSettings.allowTeacherWeightCustomization}
                  onChange={(e) =>
                    setGlobalSettings((p) => ({
                      ...p,
                      allowTeacherWeightCustomization: e.target.checked,
                    }))
                  }
                  className="mt-0.5 rounded border-slate-300"
                />
                <span>
                  <strong className="block text-slate-900">
                    Allow Teachers to Adjust Chapter Period Weights
                  </strong>
                  <span className="text-slate-500">
                    Enables +/- period pacing controls in the Annual Plan tab.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={globalSettings.showCurriculumReviewNoticeToTeachers}
                  onChange={(e) =>
                    setGlobalSettings((p) => ({
                      ...p,
                      showCurriculumReviewNoticeToTeachers: e.target.checked,
                    }))
                  }
                  className="mt-0.5 rounded border-slate-300"
                />
                <span>
                  <strong className="block text-slate-900">
                    Display Curriculum-Based Planning Unit Transparency Notice
                  </strong>
                  <span className="text-slate-500">
                    Clearly informs teachers whenever a subject uses curriculum-based planning units
                    pending textbook chapter verification.
                  </span>
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-slate-900">Default Medium of Instruction by Board</p>
              {BOARDS.map((b) => {
                const allowed = getAllowedMediumsForBoard(b);
                return (
                  <div key={b}>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {BOARD_DISPLAY_NAMES[b]}
                    </label>
                    <select
                      value={globalSettings.defaultMediumByBoard[b]}
                      onChange={(e) =>
                        setGlobalSettings((p) => ({
                          ...p,
                          defaultMediumByBoard: {
                            ...p.defaultMediumByBoard,
                            [b]: e.target.value as InstructionMedium,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                    >
                      {allowed.map((m) => (
                        <option key={m} value={m}>
                          {m} Medium
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
