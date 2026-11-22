import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Layers,
  Lock,
  Printer,
  Settings2,
} from 'lucide-react';
import {
  ClassLevel,
  EducationBoard,
  StudentProfile,
  SubjectName,
} from '../../types';
import {
  AcademicYearArchiveRecord,
  BoardCalendarConfig,
  DailyLessonPlanItem,
  InstructionMedium,
  LessonPlanPdfScope,
  LessonPlannerGlobalSettings,
  MainPlanningTab,
  OutcomeAttainmentStatus,
  PermittedLessonEdit,
  SchoolCalendarOverride,
  TeacherLessonPlanState,
} from '../../types/lessonPlanner';
import { ALL_10_CLASSES } from '../../data/classCurriculumConfig';
import {
  BOARD_DISPLAY_NAMES,
  DEFAULT_GLOBAL_SETTINGS,
  getAllowedMediumsForBoard,
  getDefaultBoardCalendar,
} from '../../data/lessonPlanner/defaultBoardCalendars';
import {
  getSubjectsForBoardAndClassGrouped,
  resolveBoardClassSubjectCurriculum,
} from '../../utils/lessonPlanner/curriculumAdapter';
import { generateThreeTabLessonPlan } from '../../utils/lessonPlanner/lessonPlanEngine';
import { printLessonPlanA4 } from '../../utils/lessonPlanPdfExporter';
import {
  buildLessonPlanStateDocId,
  deleteTeacherSchoolCalendar,
  fetchAcademicYearArchives,
  fetchActiveBoardCalendar,
  fetchGlobalLessonPlannerSettings,
  fetchTeacherLessonPlanState,
  fetchTeacherSchoolCalendar,
  listTeacherLessonPlanStates,
  saveTeacherLessonPlanState,
  saveTeacherSchoolCalendar,
} from '../../services/lessonPlannerFirestoreService';
import { AnnualPlanTab } from './AnnualPlanTab';
import { MonthlyPlanTab } from './MonthlyPlanTab';
import { DailyLessonPlanTab } from './DailyLessonPlanTab';
import { SchoolCalendarDrawer } from './SchoolCalendarDrawer';

interface TeacherLessonPlannerViewProps {
  currentTeacher: StudentProfile;
  initialBoard: EducationBoard;
  initialClass: ClassLevel;
  onReturnOverview: () => void;
}

const BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
const DIVISIONS = ['Div A', 'Div B', 'Div C', 'Div D', 'Div E', 'Div F'];
const WEEKDAYS = [
  { num: 1, label: 'Mon' },
  { num: 2, label: 'Tue' },
  { num: 3, label: 'Wed' },
  { num: 4, label: 'Thu' },
  { num: 5, label: 'Fri' },
  { num: 6, label: 'Sat' },
];

function buildDefaultTeachingDays(periodsPerWeek: number, allowedDays: number[]): number[] {
  const safeAllowed = allowedDays.length > 0 ? allowedDays : [1, 2, 3, 4, 5];
  const count = Math.max(1, Math.min(periodsPerWeek, safeAllowed.length));
  if (count === safeAllowed.length) return [...safeAllowed];
  if (count === 1) return [safeAllowed[0]];
  const step = (safeAllowed.length - 1) / (count - 1);
  const picked = new Set<number>();
  for (let i = 0; i < count; i += 1) {
    picked.add(safeAllowed[Math.round(i * step)]);
  }
  const result = Array.from(picked).sort((a, b) => a - b);
  for (const d of safeAllowed) {
    if (result.length >= count) break;
    if (!result.includes(d)) result.push(d);
  }
  return result.sort((a, b) => a - b);
}

function createEmptyTeacherState(params: {
  academicYear: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  division: string;
  medium: InstructionMedium;
  periodsPerWeek: number;
  teachingDays: number[];
}): TeacherLessonPlanState {
  return {
    id: buildLessonPlanStateDocId(params),
    board: params.board,
    classLevel: params.classLevel,
    subject: params.subject,
    academicYear: params.academicYear,
    division: params.division,
    medium: params.medium,
    periodsPerWeek: params.periodsPerWeek,
    teachingDays: params.teachingDays,
    completedLessonDates: [],
    completedDateLocks: {},
    completedChapterIds: [],
    chapterWeightOverrides: {},
    outcomeStatuses: {},
    outcomeNotes: {},
    permittedEdits: {},
    privateRemarks: {},
    updatedAt: new Date().toISOString(),
  };
}

export const TeacherLessonPlannerView: React.FC<TeacherLessonPlannerViewProps> = ({
  currentTeacher,
  initialBoard,
  initialClass,
  onReturnOverview,
}) => {
  // 1. Primary Classroom Context
  const [board, setBoard] = useState<EducationBoard>(initialBoard || 'Maharashtra');
  const [classLevel, setClassLevel] = useState<ClassLevel>(initialClass || 'Class 5');
  const groupedSubjects = useMemo(
    () => getSubjectsForBoardAndClassGrouped(board, classLevel),
    [board, classLevel]
  );
  const [subject, setSubject] = useState<SubjectName>(
    () =>
      groupedSubjects.verifiedSubjects[0] ||
      groupedSubjects.allSubjects[0] ||
      'Mathematics'
  );
  const [division, setDivision] = useState<string>('Div A');

  // Keep subject valid whenever board or class changes
  useEffect(() => {
    if (!groupedSubjects.allSubjects.includes(subject)) {
      setSubject(
        groupedSubjects.verifiedSubjects[0] ||
          groupedSubjects.allSubjects[0] ||
          'Mathematics'
      );
    }
  }, [groupedSubjects, subject]);

  // 2. Exactly Three Main Planning Tabs
  const [activeTab, setActiveTab] = useState<MainPlanningTab>('annual');

  // 3. Cross-Tab Navigation & Filtering
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>('');
  const [dailyMonthFilter, setDailyMonthFilter] = useState<string>('all');
  const [dailyUnitFilter, setDailyUnitFilter] = useState<string>('all');

  // 4. Remote Data States (Calendars, Archives, Settings, Private Teacher State)
  const [globalSettings, setGlobalSettings] = useState<LessonPlannerGlobalSettings>({
    ...DEFAULT_GLOBAL_SETTINGS,
  });
  const [activeBoardCalendar, setActiveBoardCalendar] = useState<BoardCalendarConfig>(() =>
    getDefaultBoardCalendar(initialBoard || 'Maharashtra')
  );
  const [archives, setArchives] = useState<AcademicYearArchiveRecord[]>([]);
  const [selectedArchiveId, setSelectedArchiveId] = useState<string>('active');
  const [schoolOverride, setSchoolOverride] = useState<SchoolCalendarOverride | null>(null);
  const [teacherState, setTeacherState] = useState<TeacherLessonPlanState | null>(null);
  const selectedMediumRef = useRef<InstructionMedium | null>(null);
  const [savedTeachingLoad, setSavedTeachingLoad] = useState<TeacherLessonPlanState[]>([]);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(false);

  // 5. UI Controls (Calendar Drawer, Save Feedback, PDF Export Menu)
  const [isCalendarDrawerOpen, setIsCalendarDrawerOpen] = useState<boolean>(false);
  const [isSavingCalendar, setIsSavingCalendar] = useState<boolean>(false);
  const [saveFeedback, setSaveFeedback] = useState<{
    kind: 'idle' | 'saving' | 'saved' | 'error';
    text?: string;
  }>({ kind: 'idle' });
  const [isPdfMenuOpen, setIsPdfMenuOpen] = useState<boolean>(false);
  const [includePrivateRemarksInPdf, setIncludePrivateRemarksInPdf] = useState<boolean>(false);
  const pdfMenuRef = useRef<HTMLDivElement | null>(null);

  // Close PDF dropdown on outside click
  useEffect(() => {
    if (!isPdfMenuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (pdfMenuRef.current && !pdfMenuRef.current.contains(event.target as Node)) {
        setIsPdfMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isPdfMenuOpen]);

  // Fetch global settings once
  useEffect(() => {
    let cancelled = false;
    fetchGlobalLessonPlannerSettings().then((settings) => {
      if (!cancelled) setGlobalSettings(settings);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch active board calendar, archives, and teacher's saved load when board changes
  useEffect(() => {
    let cancelled = false;
    setSelectedArchiveId('active');

    Promise.all([
      fetchActiveBoardCalendar(board),
      fetchAcademicYearArchives(board),
    ]).then(([cal, archiveList]) => {
      if (cancelled) return;
      setActiveBoardCalendar(cal);
      setArchives(archiveList);
    });

    return () => {
      cancelled = true;
    };
  }, [board]);

  const selectedArchive = useMemo(
    () =>
      selectedArchiveId === 'active'
        ? null
        : archives.find((a) => a.id === selectedArchiveId) || null,
    [archives, selectedArchiveId]
  );

  const effectiveBoardCalendar = selectedArchive
    ? selectedArchive.calendarSnapshot
    : activeBoardCalendar;
  const isArchivedReadOnly = selectedArchive !== null;
  const effectiveAcademicYear = effectiveBoardCalendar.academicYear;

  // Fetch teacher's private school calendar & saved teaching load for active academic year + board
  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchTeacherSchoolCalendar(currentTeacher.id, effectiveAcademicYear, board),
      listTeacherLessonPlanStates(currentTeacher.id, effectiveAcademicYear),
    ]).then(([override, savedStates]) => {
      if (cancelled) return;
      setSchoolOverride(override);
      setSavedTeachingLoad(
        savedStates.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
      );
    });

    return () => {
      cancelled = true;
    };
  }, [currentTeacher.id, effectiveAcademicYear, board]);

  // Fetch teacher's private lesson plan state for current (academicYear, board, classLevel, subject, division)
  useEffect(() => {
    let cancelled = false;
    setIsLoadingPlan(true);

    fetchTeacherLessonPlanState(currentTeacher.id, {
      academicYear: effectiveAcademicYear,
      board,
      classLevel,
      subject,
      division,
    }).then((existingState) => {
      if (cancelled) return;
      if (existingState) {
        const allowedMediums = getAllowedMediumsForBoard(board);
        const activeMedium =
          selectedMediumRef.current && allowedMediums.includes(selectedMediumRef.current)
            ? selectedMediumRef.current
            : existingState.medium;
        setTeacherState({
          ...existingState,
          medium: activeMedium,
        });
      } else {
        const allowedMediums = getAllowedMediumsForBoard(board);
        const preferredMedium =
          selectedMediumRef.current && allowedMediums.includes(selectedMediumRef.current)
            ? selectedMediumRef.current
            : schoolOverride?.medium && allowedMediums.includes(schoolOverride.medium)
            ? schoolOverride.medium
            : globalSettings.defaultMediumByBoard[board] &&
                allowedMediums.includes(globalSettings.defaultMediumByBoard[board])
              ? globalSettings.defaultMediumByBoard[board]
              : allowedMediums[0];
        const curriculumMeta = resolveBoardClassSubjectCurriculum(
          board,
          classLevel,
          subject,
          effectiveBoardCalendar.textbookEdition,
          preferredMedium
        );
        const allowedWeekdays =
          schoolOverride?.workingDaysOfWeek || effectiveBoardCalendar.workingDaysOfWeek;
        const defaultDays = buildDefaultTeachingDays(
          curriculumMeta.defaultPeriodsPerWeek,
          allowedWeekdays
        );
        setTeacherState(
          createEmptyTeacherState({
            academicYear: effectiveAcademicYear,
            board,
            classLevel,
            subject,
            division,
            medium: preferredMedium,
            periodsPerWeek: curriculumMeta.defaultPeriodsPerWeek,
            teachingDays: defaultDays,
          })
        );
      }
      setIsLoadingPlan(false);
    });

    return () => {
      cancelled = true;
    };
  }, [
    currentTeacher.id,
    effectiveAcademicYear,
    board,
    classLevel,
    subject,
    division,
    effectiveBoardCalendar.textbookEdition,
    effectiveBoardCalendar.workingDaysOfWeek,
    schoolOverride?.medium,
    schoolOverride?.workingDaysOfWeek,
    globalSettings.defaultMediumByBoard,
  ]);

  // Reset daily filters cleanly when switching subject/class/board
  useEffect(() => {
    setDailyMonthFilter('all');
    setDailyUnitFilter('all');
  }, [board, classLevel, subject, division, selectedArchiveId]);

  // 6. Real-Time Interconnected 3-Tab Plan Calculation (Annual + Monthly + Daily)
  const generatedPlan = useMemo(() => {
    return generateThreeTabLessonPlan({
      board,
      classLevel,
      subject,
      boardCalendar: effectiveBoardCalendar,
      schoolOverride,
      teacherState,
      isArchivedReadOnly,
      defaultPeriodMinutes:
        effectiveBoardCalendar.defaultPeriodMinutes || globalSettings.defaultPeriodMinutes,
    });
  }, [
    board,
    classLevel,
    subject,
    effectiveBoardCalendar,
    schoolOverride,
    teacherState,
    isArchivedReadOnly,
    globalSettings.defaultPeriodMinutes,
  ]);

  // Keep Monthly Plan selected month valid
  useEffect(() => {
    if (generatedPlan.monthlyPlans.length === 0) return;
    const stillExists = generatedPlan.monthlyPlans.some(
      (m) => m.monthKey === selectedMonthKey
    );
    if (!stillExists) {
      const nextLessonMonth = generatedPlan.progressOverview.nextScheduledLesson?.monthKey;
      const defaultMonth =
        (nextLessonMonth &&
          generatedPlan.monthlyPlans.find((m) => m.monthKey === nextLessonMonth)?.monthKey) ||
        generatedPlan.monthlyPlans[0].monthKey;
      setSelectedMonthKey(defaultMonth);
    }
  }, [generatedPlan.monthlyPlans, generatedPlan.progressOverview.nextScheduledLesson, selectedMonthKey]);

  // 7. Persist Private Teacher State Mutations
  const persistTeacherState = useCallback(
    async (
      mutator: (current: TeacherLessonPlanState) => TeacherLessonPlanState,
      allowInReadOnlyArchive = false
    ) => {
      if (isArchivedReadOnly && !allowInReadOnlyArchive) return;

      const base: TeacherLessonPlanState =
        teacherState ||
        createEmptyTeacherState({
          academicYear: effectiveAcademicYear,
          board,
          classLevel,
          subject,
          division,
          medium: generatedPlan.medium,
          periodsPerWeek: generatedPlan.periodsPerWeek,
          teachingDays: generatedPlan.teachingDays,
        });

      const nextState: TeacherLessonPlanState = {
        ...mutator(base),
        id: buildLessonPlanStateDocId({
          academicYear: effectiveAcademicYear,
          board,
          classLevel,
          subject,
          division,
        }),
        board,
        classLevel,
        subject,
        academicYear: effectiveAcademicYear,
        division,
        updatedAt: new Date().toISOString(),
      };

      setTeacherState(nextState);
      if (isArchivedReadOnly) return;

      setSaveFeedback({ kind: 'saving', text: 'Saving privately...' });

      const result = await saveTeacherLessonPlanState(currentTeacher.id, nextState);
      if (result.success && result.state) {
        setTeacherState(result.state);
        setSavedTeachingLoad((prev) => {
          const filtered = prev.filter((item) => item.id !== result.state!.id);
          return [result.state!, ...filtered];
        });
        setSaveFeedback({ kind: 'saved', text: 'Saved privately' });
      } else {
        setSaveFeedback({
          kind: 'error',
          text: result.error || 'Could not save changes',
        });
      }
    },
    [
      isArchivedReadOnly,
      teacherState,
      effectiveAcademicYear,
      board,
      classLevel,
      subject,
      division,
      generatedPlan.medium,
      generatedPlan.periodsPerWeek,
      generatedPlan.teachingDays,
      currentTeacher.id,
    ]
  );

  // Handlers for Classroom Controls
  const allowedMediums = getAllowedMediumsForBoard(board);
  const effectiveWorkingDays = generatedPlan.effectiveCalendar.workingDaysOfWeek;

  const handleMediumChange = (nextMedium: InstructionMedium) => {
    selectedMediumRef.current = nextMedium;
    void persistTeacherState(
      (prev) => ({
        ...prev,
        medium: nextMedium,
      }),
      true
    );
  };

  const handlePeriodsPerWeekChange = (nextPeriods: number) => {
    const clamped = Math.max(1, Math.min(6, nextPeriods));
    void persistTeacherState((prev) => ({
      ...prev,
      periodsPerWeek: clamped,
      teachingDays: buildDefaultTeachingDays(clamped, effectiveWorkingDays),
    }));
  };

  const handleToggleTeachingDay = (dayNum: number) => {
    if (!effectiveWorkingDays.includes(dayNum) || isArchivedReadOnly) return;
    void persistTeacherState((prev) => {
      const exists = prev.teachingDays.includes(dayNum);
      let nextDays: number[];
      if (exists) {
        if (prev.teachingDays.length <= 1) return prev;
        nextDays = prev.teachingDays.filter((d) => d !== dayNum);
      } else {
        nextDays = [...prev.teachingDays, dayNum].sort((a, b) => a - b);
      }
      return {
        ...prev,
        teachingDays: nextDays,
        periodsPerWeek: nextDays.length,
      };
    });
  };

  // Annual Plan Handlers
  const handleAdjustChapterWeight = (unitId: string, nextWeight: number) => {
    void persistTeacherState((prev) => ({
      ...prev,
      chapterWeightOverrides: {
        ...prev.chapterWeightOverrides,
        [unitId]: Math.max(1, Math.min(20, nextWeight)),
      },
    }));
  };

  const handleResetChapterWeights = () => {
    void persistTeacherState((prev) => ({
      ...prev,
      chapterWeightOverrides: {},
    }));
  };

  const handleUpdateOutcome = (
    outcomeId: string,
    status: OutcomeAttainmentStatus,
    privateNote: string
  ) => {
    void persistTeacherState((prev) => {
      const nextNotes = { ...prev.outcomeNotes };
      if (privateNote.trim()) {
        nextNotes[outcomeId] = privateNote.trim();
      } else {
        delete nextNotes[outcomeId];
      }
      return {
        ...prev,
        outcomeStatuses: {
          ...prev.outcomeStatuses,
          [outcomeId]: status,
        },
        outcomeNotes: nextNotes,
      };
    });
  };

  // Daily Plan Handlers
  const handleToggleLessonComplete = (lesson: DailyLessonPlanItem) => {
    void persistTeacherState((prev) => {
      const nextLocks = { ...prev.completedDateLocks };
      const nextDates = new Set(prev.completedLessonDates);

      if (lesson.isCompleted) {
        delete nextLocks[lesson.lessonKey];
        nextDates.delete(lesson.date);
      } else {
        nextLocks[lesson.lessonKey] = lesson.date;
        nextDates.add(lesson.date);
      }

      // Recalculate completed chapter IDs cleanly
      const unitLessons = generatedPlan.dailyPlans.filter((d) => d.unitId === lesson.unitId);
      const allDoneForUnit =
        unitLessons.length > 0 &&
        unitLessons.every((d) =>
          d.lessonKey === lesson.lessonKey ? !lesson.isCompleted : d.isCompleted
        );
      const nextChapters = new Set(prev.completedChapterIds);
      if (allDoneForUnit) {
        nextChapters.add(lesson.unitId);
      } else {
        nextChapters.delete(lesson.unitId);
      }

      return {
        ...prev,
        completedLessonDates: Array.from(nextDates).sort(),
        completedDateLocks: nextLocks,
        completedChapterIds: Array.from(nextChapters),
      };
    });
  };

  const handleSaveLessonEditsAndRemark = (
    lessonKey: string,
    edits: PermittedLessonEdit,
    privateRemark: string
  ) => {
    void persistTeacherState((prev) => {
      const nextEdits = { ...prev.permittedEdits };
      const cleanEdit: PermittedLessonEdit = {};
      if (edits.subTopicFocus?.trim()) cleanEdit.subTopicFocus = edits.subTopicFocus.trim();
      if (edits.teachingAidNote?.trim()) cleanEdit.teachingAidNote = edits.teachingAidNote.trim();
      if (edits.activityNote?.trim()) cleanEdit.activityNote = edits.activityNote.trim();
      if (edits.homeworkNote?.trim()) cleanEdit.homeworkNote = edits.homeworkNote.trim();

      if (Object.keys(cleanEdit).length > 0) {
        nextEdits[lessonKey] = cleanEdit;
      } else {
        delete nextEdits[lessonKey];
      }

      const nextRemarks = { ...prev.privateRemarks };
      if (privateRemark.trim()) {
        nextRemarks[lessonKey] = privateRemark.trim();
      } else {
        delete nextRemarks[lessonKey];
      }

      return {
        ...prev,
        permittedEdits: nextEdits,
        privateRemarks: nextRemarks,
      };
    });
  };

  const handleApplyShiftAnchor = (dateIso?: string) => {
    void persistTeacherState((prev) => {
      const updated = { ...prev };
      if (dateIso) {
        updated.shiftAnchorDate = dateIso;
      } else {
        delete updated.shiftAnchorDate;
      }
      return updated;
    });
  };

  // School Calendar Drawer Handlers
  const handleSaveSchoolOverride = async (override: SchoolCalendarOverride) => {
    setIsSavingCalendar(true);
    const result = await saveTeacherSchoolCalendar(currentTeacher.id, override);
    setIsSavingCalendar(false);
    if (result.success && result.override) {
      setSchoolOverride(result.override);
      setIsCalendarDrawerOpen(false);
      setSaveFeedback({ kind: 'saved', text: 'School calendar updated & all 3 plans recalculated' });
    } else {
      setSaveFeedback({
        kind: 'error',
        text: result.error || 'Could not save school calendar',
      });
    }
  };

  const handleResetSchoolOverride = async () => {
    setIsSavingCalendar(true);
    const result = await deleteTeacherSchoolCalendar(
      currentTeacher.id,
      effectiveAcademicYear,
      board
    );
    setIsSavingCalendar(false);
    if (result.success) {
      setSchoolOverride(null);
      setIsCalendarDrawerOpen(false);
      setSaveFeedback({ kind: 'saved', text: 'Restored official board calendar' });
    } else {
      setSaveFeedback({
        kind: 'error',
        text: result.error || 'Could not reset school calendar',
      });
    }
  };

  // Cross-tab navigation shortcuts
  const handleJumpToChapterDailyLessons = (unitId: string) => {
    setDailyMonthFilter('all');
    setDailyUnitFilter(unitId);
    setActiveTab('daily');
  };

  const handleJumpToMonthDailyLessons = (monthKey: string) => {
    setDailyUnitFilter('all');
    setDailyMonthFilter(monthKey);
    setActiveTab('daily');
  };

  const handleJumpToNextLesson = () => {
    const next = generatedPlan.progressOverview.nextScheduledLesson;
    if (!next) return;
    setDailyMonthFilter(next.monthKey);
    setDailyUnitFilter(next.unitId);
    setActiveTab('daily');
  };

  // A4 PDF Exporter
  const triggerPdfPrint = (scope: LessonPlanPdfScope, monthKeyOverride?: string) => {
    setIsPdfMenuOpen(false);
    printLessonPlanA4({
      plan: generatedPlan,
      scope,
      selectedMonthKey:
        monthKeyOverride ||
        (scope === 'monthly'
          ? selectedMonthKey
          : scope === 'daily' && dailyMonthFilter !== 'all'
            ? dailyMonthFilter
            : undefined),
      teacherName: currentTeacher.name,
      includePrivateRemarks: includePrivateRemarksInPdf,
    });
  };

  const handleSelectSavedLoadItem = (item: TeacherLessonPlanState) => {
    setBoard(item.board);
    setClassLevel(item.classLevel);
    setSubject(item.subject);
    setDivision(item.division || 'Div A');
  };

  const { progressOverview, curriculum } = generatedPlan;
  const isPlanningUnits =
    curriculum.curriculumSourceType === 'curriculum_based_planning_units';
  const hasWeightOverrides =
    Object.keys(teacherState?.chapterWeightOverrides || {}).length > 0;
  const canCustomizeSchoolCalendar =
    globalSettings.allowTeacherCalendarCustomization && !isArchivedReadOnly;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 space-y-5">
      {/* Top Workspace Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onReturnOverview}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Teacher Overview</span>
              </button>
              <span className="text-xs font-medium text-slate-400">•</span>
              <span className="text-xs font-semibold text-teal-800">
                {BOARD_DISPLAY_NAMES[board]}
              </span>
              <span className="text-xs font-medium text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-600 tabular-nums">
                AY {effectiveAcademicYear}
              </span>
              {schoolOverride && !isArchivedReadOnly && (
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  Custom School Calendar Active
                </span>
              )}
              {isArchivedReadOnly && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  <Lock className="w-3 h-3" />
                  Read-Only Archive
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
              Teacher Lesson Planner
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Interconnected Annual, Monthly, and Daily Lesson Plans for{' '}
              <span className="font-semibold text-slate-800">
                {classLevel} — {subject} ({division})
              </span>
              . Your calendar, progress, and remarks stay private to your teacher account.
            </p>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Academic Year / Archive Selector */}
            <select
              aria-label="Academic Year Selector"
              value={selectedArchiveId}
              onChange={(e) => setSelectedArchiveId(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700"
            >
              <option value="active">Active Year: {activeBoardCalendar.academicYear}</option>
              {archives.map((arch) => (
                <option key={arch.id} value={arch.id}>
                  Archive: {arch.academicYear} (Read-Only)
                </option>
              ))}
            </select>

            {/* School Calendar Customiser */}
            {canCustomizeSchoolCalendar && (
              <button
                type="button"
                onClick={() => setIsCalendarDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5 text-teal-700" />
                <span>School Calendar</span>
              </button>
            )}

            {/* A4 PDF Export Dropdown */}
            <div className="relative" ref={pdfMenuRef}>
              <button
                type="button"
                onClick={() => setIsPdfMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-xs font-semibold text-white cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / A4 PDF</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isPdfMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-64 rounded-xl border border-slate-200 bg-white shadow-lg p-2 z-30 space-y-1">
                  <button
                    type="button"
                    onClick={() => triggerPdfPrint('annual')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <span>Annual Plan (A4)</span>
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPdfPrint('monthly', selectedMonthKey)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <span>Active Month Plan (A4)</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPdfPrint('daily')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <span>Daily Lesson Diary (A4)</span>
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPdfPrint('complete_pack')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-xs font-semibold text-teal-900 cursor-pointer flex items-center justify-between"
                  >
                    <span>Complete 3-Plan Pack (A4)</span>
                    <Layers className="w-3.5 h-3.5 text-teal-700" />
                  </button>
                  <div className="border-t border-slate-100 pt-2 mt-1 px-2 pb-1">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includePrivateRemarksInPdf}
                        onChange={(e) => setIncludePrivateRemarksInPdf(e.target.checked)}
                        className="rounded border-slate-300 text-teal-700"
                      />
                      <span>Include private teacher remarks</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Classroom Configuration Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Education Board
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value as EducationBoard)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
            >
              {BOARDS.map((b) => (
                <option key={b} value={b}>
                  {BOARD_DISPLAY_NAMES[b]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Class (1–10)
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
            >
              {ALL_10_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectName)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
            >
              {groupedSubjects.coreBoardSubjects.length > 0 && (
                <optgroup label="Core Board Subjects">
                  {groupedSubjects.coreBoardSubjects.map((s) => {
                    const meta = groupedSubjects.subjectStatusMap[s];
                    const suffix =
                      meta?.status === 'PASS'
                        ? ` (${meta.chapterCount} Verified Chapters)`
                        : ' [PENDING VERIFICATION]';
                    return (
                      <option key={s} value={s}>
                        {s}
                        {suffix}
                      </option>
                    );
                  })}
                </optgroup>
              )}
              {groupedSubjects.combinedEnrichmentSubjects.length > 0 && (
                <optgroup label="Combined / Enrichment Subjects">
                  {groupedSubjects.combinedEnrichmentSubjects.map((s) => {
                    const meta = groupedSubjects.subjectStatusMap[s];
                    const suffix =
                      meta?.status === 'PASS'
                        ? ` (${meta.chapterCount} Verified Chapters)`
                        : ' [PENDING VERIFICATION]';
                    return (
                      <option key={s} value={s}>
                        {s}
                        {suffix}
                      </option>
                    );
                  })}
                </optgroup>
              )}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Division
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
            >
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Medium
            </label>
            <select
              value={generatedPlan.medium}
              disabled={isArchivedReadOnly}
              onChange={(e) => handleMediumChange(e.target.value as InstructionMedium)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 disabled:bg-slate-50 disabled:text-slate-500"
            >
              {allowedMediums.map((m) => (
                <option key={m} value={m}>
                  {m} Medium
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timetable Schedule Row (Periods/Week + Teaching Days + Save State) */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Periods / Week:</span>
              <select
                aria-label="Periods per week"
                disabled={isArchivedReadOnly}
                value={generatedPlan.periodsPerWeek}
                onChange={(e) => handlePeriodsPerWeekChange(Number(e.target.value))}
                className="px-2 py-1 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-800 tabular-nums disabled:bg-slate-50"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} / wk
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs font-semibold text-slate-600 mr-1">Teaching Days:</span>
              {WEEKDAYS.map((wd) => {
                const isAllowed = effectiveWorkingDays.includes(wd.num);
                const isSelected = generatedPlan.teachingDays.includes(wd.num);
                return (
                  <button
                    key={wd.num}
                    type="button"
                    disabled={!isAllowed || isArchivedReadOnly}
                    onClick={() => handleToggleTeachingDay(wd.num)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold border transition-colors ${
                      !isAllowed
                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                        : isSelected
                          ? 'bg-teal-700 text-white border-teal-700 cursor-pointer'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer'
                    }`}
                  >
                    {wd.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curriculum Classification & Private Save Status */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span
              className={`font-semibold px-2 py-0.5 rounded-md border ${
                isPlanningUnits
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              {curriculum.curriculumSourceLabel}
            </span>

            {isLoadingPlan ? (
              <span className="text-slate-500">Loading plan...</span>
            ) : saveFeedback.kind === 'saving' ? (
              <span className="text-slate-500">{saveFeedback.text}</span>
            ) : saveFeedback.kind === 'saved' ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {saveFeedback.text}
              </span>
            ) : saveFeedback.kind === 'error' ? (
              <span className="text-rose-700 font-medium">{saveFeedback.text}</span>
            ) : null}
          </div>
        </div>

        {/* My Saved Teaching Load (Quick Switcher for Teacher's Private Classes) */}
        {savedTeachingLoad.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide shrink-0">
              My Saved Classes:
            </span>
            {savedTeachingLoad.slice(0, 8).map((item) => {
              const isCurrent =
                item.board === board &&
                item.classLevel === classLevel &&
                item.subject === subject &&
                (item.division || 'Div A') === division;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSavedLoadItem(item)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {item.board === 'Maharashtra' ? 'MH' : item.board} • {item.classLevel} •{' '}
                  {item.subject} ({item.division || 'Div A'})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Teacher Progress Overview Strip (4-Column Tabular Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Completed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
            {progressOverview.completedLessons}
            <span className="text-sm font-normal text-slate-400">
              {' '}
              / {progressOverview.totalScheduledLessons}
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {progressOverview.pendingLessons} lessons pending
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              {isPlanningUnits ? 'Completed Units' : 'Completed Chapters'}
            </span>
            <BookOpen className="w-4 h-4 text-teal-700" />
          </div>
          <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
            {progressOverview.completedChaptersCount}
            <span className="text-sm font-normal text-slate-400">
              {' '}
              / {progressOverview.totalChaptersCount}
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Outcomes achieved: {progressOverview.achievedOutcomesCount}/
            {progressOverview.totalOutcomesCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Syllabus Completion</span>
            <Layers className="w-4 h-4 text-teal-700" />
          </div>
          <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
            {progressOverview.syllabusCompletionPercent}%
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-teal-700 transition-all"
              style={{ width: `${progressOverview.syllabusCompletionPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Next Scheduled Lesson</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          {progressOverview.nextScheduledLesson ? (
            <>
              <p className="mt-1 text-xs font-semibold text-slate-900 line-clamp-2">
                {progressOverview.nextScheduledLesson.date.split('-').reverse().join('/')} —{' '}
                {progressOverview.nextScheduledLesson.unitTitle}
              </p>
              <button
                type="button"
                onClick={handleJumpToNextLesson}
                className="mt-1.5 self-start text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
              >
                Open in Daily Lesson Plan →
              </button>
            </>
          ) : isPlanningUnits ? (
            <p className="mt-1.5 text-xs font-semibold text-amber-800">
              PENDING VERIFICATION — No invented chapters scheduled.
            </p>
          ) : (
            <p className="mt-1.5 text-xs font-semibold text-emerald-700">
              All scheduled lessons completed for this year.
            </p>
          )}
        </div>
      </div>

      {/* EXACTLY THREE MAIN PLANNING TABS */}
      <div
        role="tablist"
        aria-label="Lesson Planner Main Tabs"
        className="rounded-xl border border-slate-200 bg-white p-1.5 grid grid-cols-3 gap-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'annual'}
          onClick={() => setActiveTab('annual')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'annual'
              ? 'bg-teal-700 text-white'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Annual Plan</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'monthly'}
          onClick={() => setActiveTab('monthly')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'monthly'
              ? 'bg-teal-700 text-white'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Monthly Plan</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'daily'}
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'daily'
              ? 'bg-teal-700 text-white'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CalendarDays className="w-4 h-4 shrink-0" />
          <span>Daily Lesson Plan</span>
        </button>
      </div>

      {/* Active Main Tab Content */}
      {activeTab === 'annual' && (
        <AnnualPlanTab
          plan={generatedPlan}
          allowWeightCustomization={globalSettings.allowTeacherWeightCustomization}
          showCurriculumReviewNotice={globalSettings.showCurriculumReviewNoticeToTeachers}
          onAdjustChapterWeight={handleAdjustChapterWeight}
          onResetChapterWeights={handleResetChapterWeights}
          hasWeightOverrides={hasWeightOverrides}
          onUpdateOutcome={handleUpdateOutcome}
          onJumpToChapterDailyLessons={handleJumpToChapterDailyLessons}
          onPrintAnnualPdf={() => triggerPdfPrint('annual')}
        />
      )}

      {activeTab === 'monthly' && (
        <MonthlyPlanTab
          plan={generatedPlan}
          selectedMonthKey={selectedMonthKey}
          onSelectMonthKey={setSelectedMonthKey}
          onJumpToMonthDailyLessons={handleJumpToMonthDailyLessons}
          onPrintMonthPdf={(mk) => triggerPdfPrint('monthly', mk)}
        />
      )}

      {activeTab === 'daily' && (
        <DailyLessonPlanTab
          plan={generatedPlan}
          monthFilter={dailyMonthFilter}
          unitFilter={dailyUnitFilter}
          onMonthFilterChange={setDailyMonthFilter}
          onUnitFilterChange={setDailyUnitFilter}
          shiftAnchorDate={teacherState?.shiftAnchorDate}
          onApplyShiftAnchor={handleApplyShiftAnchor}
          onToggleLessonComplete={handleToggleLessonComplete}
          onSaveLessonEditsAndRemark={handleSaveLessonEditsAndRemark}
          onPrintDailyPdf={(mk) => triggerPdfPrint('daily', mk)}
        />
      )}

      {/* Private Per-Teacher School Calendar Customiser Drawer */}
      <SchoolCalendarDrawer
        isOpen={isCalendarDrawerOpen}
        onClose={() => setIsCalendarDrawerOpen(false)}
        boardCalendar={effectiveBoardCalendar}
        existingOverride={schoolOverride}
        defaultSchoolName={currentTeacher.schoolName || `${currentTeacher.name}'s School`}
        isSaving={isSavingCalendar}
        onSaveOverride={handleSaveSchoolOverride}
        onResetToBoardDefault={handleResetSchoolOverride}
      />
    </div>
  );
};
