import { ClassLevel, EducationBoard, SubjectName } from './index';

export type SaturdayRule = 'off' | 'half_day' | 'full_day' | 'second_fourth_off';

export type InstructionMedium = 'English' | 'Marathi' | 'Semi-English' | 'Hindi';

export type MainPlanningTab = 'annual' | 'monthly' | 'daily';

export type CurriculumSourceType =
  | 'verified_board_chapters'
  | 'curriculum_based_planning_units';

export type SubjectGroupBucket = 'core_board' | 'combined_enrichment';

export type OutcomeAttainmentStatus =
  | 'planned'
  | 'in_progress'
  | 'achieved'
  | 'needs_remedial';

export type LessonDayType =
  | 'teaching'
  | 'half_day_teaching'
  | 'revision'
  | 'exam'
  | 'holiday'
  | 'vacation'
  | 'sunday'
  | 'saturday_off'
  | 'non_timetable_day';

export type LessonPlanPdfScope = 'annual' | 'monthly' | 'daily' | 'complete_pack';

export interface CalendarHolidayItem {
  id: string;
  date: string; // YYYY-MM-DD
  name: string;
  category?: 'national' | 'state' | 'festival' | 'school';
}

export interface CalendarDateRangeItem {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  term?: 'Term 1' | 'Term 2' | 'Annual';
  notes?: string;
}

export interface BoardCalendarConfig {
  id: string; // e.g., 'mh_active', 'cbse_active', 'icse_active'
  board: EducationBoard;
  academicYear: string; // e.g., '2026-2027'
  startDate: string; // YYYY-MM-DD
  reopeningDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  syllabusCompletionDeadline: string; // YYYY-MM-DD
  workingDaysOfWeek: number[]; // 1=Mon ... 6=Sat (0=Sun excluded)
  saturdayRule: SaturdayRule;
  holidays: CalendarHolidayItem[];
  vacations: CalendarDateRangeItem[];
  examWindows: CalendarDateRangeItem[];
  revisionWindows: CalendarDateRangeItem[];
  textbookEdition: string;
  defaultPeriodMinutes: number;
  syllabusRevisionTag: string;
  version: number;
  updatedAt: string;
  updatedByUid?: string;
}

export interface LessonPlannerGlobalSettings {
  id: 'global_settings';
  defaultPeriodMinutes: number;
  allowTeacherWeightCustomization: boolean;
  allowTeacherCalendarCustomization: boolean;
  showCurriculumReviewNoticeToTeachers: boolean;
  defaultMediumByBoard: Record<EducationBoard, InstructionMedium>;
  updatedAt: string;
  updatedByUid?: string;
}

export interface AcademicYearArchiveRecord {
  id: string; // e.g., 'Maharashtra_2025_2026'
  board: EducationBoard;
  academicYear: string;
  calendarSnapshot: BoardCalendarConfig;
  summaryStats: {
    totalCalendarDays: number;
    totalWorkingDays: number;
    totalHolidayDays: number;
    totalVacationDays: number;
    totalExamDays: number;
    totalRevisionDays: number;
    netTeachingDays: number;
  };
  archivedAt: string;
  archivedByUid: string;
  archiveNote?: string;
}

export interface SchoolCalendarOverride {
  id: string; // {academicYear}__{board}
  board: EducationBoard;
  academicYear: string;
  schoolName: string;
  medium: InstructionMedium;
  startDate: string;
  reopeningDate: string;
  endDate: string;
  syllabusCompletionDeadline: string;
  workingDaysOfWeek: number[];
  saturdayRule: SaturdayRule;
  holidays: CalendarHolidayItem[];
  vacations: CalendarDateRangeItem[];
  examWindows: CalendarDateRangeItem[];
  revisionWindows: CalendarDateRangeItem[];
  updatedAt: string;
}

export interface PermittedLessonEdit {
  subTopicFocus?: string;
  teachingAidNote?: string;
  activityNote?: string;
  homeworkNote?: string;
}

export interface PinnedTeachingLoadItem {
  id: string; // {board}__{classLevel}__{subject}__{division}
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  division: string;
  medium: InstructionMedium;
  periodsPerWeek: number;
}

export interface TeacherLessonPlanState {
  id: string; // {academicYear}__{board}__{classLevel}__{subject}__{division}
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  academicYear: string;
  division: string;
  medium: InstructionMedium;
  periodsPerWeek: number;
  teachingDays: number[]; // subset of [1..6] matching periodsPerWeek
  completedLessonDates: string[]; // scheduled dates marked completed
  completedDateLocks: Record<string, string>; // lessonKey -> actualCompletionDate YYYY-MM-DD
  completedChapterIds: string[];
  chapterWeightOverrides: Record<string, number>; // unitId -> weight (1..20)
  outcomeStatuses: Record<string, OutcomeAttainmentStatus>; // outcomeId -> status
  outcomeNotes: Record<string, string>; // outcomeId -> private note
  permittedEdits: Record<string, PermittedLessonEdit>; // lessonKey -> permitted teacher notes
  privateRemarks: Record<string, string>; // lessonKey -> private remark
  shiftAnchorDate?: string; // optional YYYY-MM-DD when teacher shifts uncompleted lessons forward
  updatedAt: string;
}

export interface ResolvedPlanningUnit {
  unitId: string;
  unitNumber: number;
  title: string;
  cleanTitle: string;
  sourceKind: 'board_mapped' | 'curriculum_planning_unit';
  defaultWeight: number;
  recommendedTerm: 'Term 1' | 'Term 2';
  subTopics: string[];
}

export interface ResolvedCurriculumSubject {
  board: EducationBoard;
  classLevel: ClassLevel;
  classNumber: number;
  subject: SubjectName;
  shortCode: string;
  icon: string;
  category: 'core' | 'language' | 'science' | 'social' | 'skill';
  subjectGroup: SubjectGroupBucket;
  localizedTitle: string;
  marathiName: string;
  hindiName: string;
  stageLabel: string;
  stageBand: 'early' | 'upper_primary' | 'middle' | 'secondary';
  bookTitle: string;
  publisher: string;
  editionYear: string;
  syllabusCode: string;
  curriculumSourceType: CurriculumSourceType;
  curriculumSourceLabel: string;
  needsAdminReview: boolean;
  defaultPeriodsPerWeek: number;
  defaultTeachingDays: number[];
  units: ResolvedPlanningUnit[];
}

export interface CurriculumReviewAuditRow {
  board: EducationBoard;
  classLevel: ClassLevel;
  classNumber: number;
  subject: SubjectName;
  subjectGroup: SubjectGroupBucket;
  bookTitle: string;
  unitCount: number;
  curriculumSourceType: CurriculumSourceType;
  curriculumSourceLabel: string;
  needsAdminReview: boolean;
}

export interface CalendarSummaryMetrics {
  academicYear: string;
  board: EducationBoard;
  startDate: string;
  reopeningDate: string;
  endDate: string;
  syllabusCompletionDeadline: string;
  totalCalendarDays: number;
  sundayCount: number;
  saturdayOffCount: number;
  holidayCount: number;
  vacationDayCount: number;
  examDayCount: number;
  revisionDayCount: number;
  totalSchoolWorkingDays: number;
  subjectTeachingDaysBeforeDeadline: number;
  subjectTeachingDaysFullYear: number;
  halfDayCount: number;
  syllabusHealth: 'on_track' | 'tight' | 'compressed';
  warnings: string[];
}

export interface AnnualChapterPlanItem {
  unitId: string;
  unitNumber: number;
  title: string;
  cleanTitle: string;
  sourceKind: 'board_mapped' | 'curriculum_planning_unit';
  term: 'Term 1' | 'Term 2';
  allocatedPeriods: number;
  defaultWeight: number;
  plannedStartDate: string | null;
  plannedEndDate: string | null;
  prerequisites: string;
  keyConcepts: string[];
  commonMisconceptions: string;
  remedialStrategy: string;
  enrichmentStrategy: string;
  suggestedActivity: string;
  practicalMaterials: string[];
  learningOutcomes: {
    outcomeId: string;
    bloomLevel: 'Remember & Understand' | 'Apply & Demonstrate' | 'Analyze & Evaluate';
    statement: string;
    assessmentMethod: string;
    status: OutcomeAttainmentStatus;
    privateNote: string;
  }[];
  completedLessonsCount: number;
  totalLessonsCount: number;
  completionPercent: number;
  isCompleted: boolean;
}

export interface AnnualExamPortionItem {
  id: string;
  name: string;
  term: 'Term 1' | 'Term 2' | 'Annual';
  startDate: string;
  endDate: string;
  examDaysCount: number;
  coveredUnitNumbers: number[];
  coveredUnitTitles: string[];
  oralPracticalCheckpoint: string;
  notes?: string;
}

export interface AnnualRevisionBlockItem {
  id: string;
  name: string;
  term: 'Term 1' | 'Term 2' | 'Annual';
  startDate: string;
  endDate: string;
  revisionDaysCount: number;
  focusUnits: string[];
  strategySummary: string;
}

export interface AnnualPlanOutput {
  term1Chapters: AnnualChapterPlanItem[];
  term2Chapters: AnnualChapterPlanItem[];
  allChapters: AnnualChapterPlanItem[];
  examRoadmap: AnnualExamPortionItem[];
  revisionRoadmap: AnnualRevisionBlockItem[];
  totalAllocatedPeriods: number;
  totalOutcomes: number;
  achievedOutcomes: number;
}

export interface MonthlyWeeklyPacingItem {
  weekNumberInYear: number;
  weekLabel: string;
  startDate: string;
  endDate: string;
  schoolWorkingDays: number;
  subjectTeachingPeriods: number;
  revisionDays: number;
  examDays: number;
  targetChapters: string[];
  keyMilestone: string;
  completedLessons: number;
  totalLessons: number;
}

export interface MonthlyPlanItem {
  monthKey: string; // YYYY-MM
  monthLabel: string; // e.g., 'June 2026'
  shortLabel: string; // e.g., 'Jun 26'
  schoolWorkingDays: number;
  subjectTeachingPeriods: number;
  holidayCallouts: { date: string; name: string }[];
  vacationCallouts: string[];
  examCallouts: string[];
  revisionCallouts: string[];
  targetChapters: {
    unitId: string;
    unitNumber: number;
    title: string;
    periodsInMonth: number;
  }[];
  monthlyActivitiesHighlight: string[];
  weeklyBreakdown: MonthlyWeeklyPacingItem[];
  completedLessons: number;
  totalLessons: number;
  completionPercent: number;
}

export interface DailyTeachingPhase {
  phase: 'Warm-Up' | 'Concept Demo' | 'Guided Practice' | 'Activity / Practical' | 'Recap & Check';
  minutes: number;
  instruction: string;
}

export interface DailyLessonPlanItem {
  lessonKey: string; // stable key: `${unitId}__p${periodIndexInUnit}`
  sequenceNumber: number;
  date: string; // YYYY-MM-DD
  weekdayLabel: string;
  monthKey: string; // YYYY-MM
  weekNumberInYear: number;
  dayType: 'teaching' | 'half_day_teaching' | 'revision';
  durationMinutes: number;
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  unitSourceLabel: string;
  periodIndexInUnit: number;
  totalPeriodsInUnit: number;
  subTopicFocus: string;
  learningObjectives: string[];
  methodology5Phase: DailyTeachingPhase[];
  teachingAids: string[];
  boardSummaryPoints: string[];
  activityAndPractical: {
    title: string;
    instructions: string;
    materials: string[];
  };
  homeworkPlan: {
    coreTask: string;
    applicationTask: string;
    estimatedMinutes: number;
    dueDate: string;
  };
  formativeCheck: string;
  isCompleted: boolean;
  lockedCompletedDate?: string;
  permittedEdits?: PermittedLessonEdit;
  privateRemark: string;
}

export interface TeacherProgressOverviewMetrics {
  totalScheduledLessons: number;
  completedLessons: number;
  pendingLessons: number;
  syllabusCompletionPercent: number;
  completedChaptersCount: number;
  totalChaptersCount: number;
  nextScheduledLesson: DailyLessonPlanItem | null;
  achievedOutcomesCount: number;
  totalOutcomesCount: number;
}

export interface GeneratedThreeTabLessonPlan {
  curriculum: ResolvedCurriculumSubject;
  effectiveCalendar: BoardCalendarConfig;
  schoolName: string;
  medium: InstructionMedium;
  division: string;
  periodsPerWeek: number;
  teachingDays: number[];
  isArchivedReadOnly: boolean;
  calendarSummary: CalendarSummaryMetrics;
  progressOverview: TeacherProgressOverviewMetrics;
  annualPlan: AnnualPlanOutput;
  monthlyPlans: MonthlyPlanItem[];
  dailyPlans: DailyLessonPlanItem[];
}
