import { EducationBoard, SubjectName } from '../../types';
import {
  BoardCalendarConfig,
  CalendarDateRangeItem,
  CalendarHolidayItem,
  InstructionMedium,
  LessonPlannerGlobalSettings,
  SchoolCalendarOverride,
} from '../../types/lessonPlanner';

export const DEFAULT_ACTIVE_ACADEMIC_YEAR = '2026-2027';

export const BOARD_CALENDAR_DOC_IDS: Record<EducationBoard, string> = {
  Maharashtra: 'mh_active',
  CBSE: 'cbse_active',
  ICSE: 'icse_active',
};

export const BOARD_DISPLAY_NAMES: Record<EducationBoard, string> = {
  Maharashtra: 'Maharashtra State Board (SSC)',
  CBSE: 'CBSE (NCERT / NCF-SE)',
  ICSE: 'ICSE (CISCE)',
};

export const DEFAULT_GLOBAL_SETTINGS: LessonPlannerGlobalSettings = {
  id: 'global_settings',
  defaultPeriodMinutes: 40,
  allowTeacherWeightCustomization: true,
  allowTeacherCalendarCustomization: true,
  showCurriculumReviewNoticeToTeachers: true,
  defaultMediumByBoard: {
    Maharashtra: 'Semi-English',
    CBSE: 'English',
    ICSE: 'English',
  },
  updatedAt: '2026-04-01T00:00:00.000Z',
};

/**
 * Three strictly independent board academic calendars.
 * - Maharashtra State Board (SSC): June–April default
 * - CBSE: April–March default
 * - ICSE: April–March default
 * Modifying one board NEVER mutates any other board.
 */
export const DEFAULT_BOARD_CALENDARS: Record<EducationBoard, BoardCalendarConfig> = {
  Maharashtra: {
    id: 'mh_active',
    board: 'Maharashtra',
    academicYear: '2026-2027',
    startDate: '2026-06-15',
    reopeningDate: '2026-06-15',
    endDate: '2027-04-30',
    syllabusCompletionDeadline: '2027-02-25',
    workingDaysOfWeek: [1, 2, 3, 4, 5, 6],
    saturdayRule: 'half_day',
    textbookEdition: '2026–2027 Balbharati / MSBSHSE Revised Edition',
    defaultPeriodMinutes: 40,
    syllabusRevisionTag: 'MSBSHSE-2026-27',
    version: 1,
    updatedAt: '2026-04-01T00:00:00.000Z',
    holidays: [
      { id: 'mh-h1', date: '2026-06-26', name: 'Muharram', category: 'state' },
      { id: 'mh-h2', date: '2026-07-25', name: 'Ashadhi Ekadashi', category: 'festival' },
      { id: 'mh-h3', date: '2026-08-15', name: 'Independence Day', category: 'national' },
      { id: 'mh-h4', date: '2026-08-28', name: 'Raksha Bandhan', category: 'festival' },
      { id: 'mh-h5', date: '2026-09-04', name: 'Gopal Kala / Janmashtami', category: 'festival' },
      { id: 'mh-h6', date: '2026-10-02', name: 'Mahatma Gandhi Jayanti', category: 'national' },
      { id: 'mh-h7', date: '2026-10-20', name: 'Dussehra (Vijayadashami)', category: 'festival' },
      { id: 'mh-h8', date: '2026-11-24', name: 'Guru Nanak Jayanti', category: 'festival' },
      { id: 'mh-h9', date: '2026-12-25', name: 'Christmas', category: 'festival' },
      { id: 'mh-h10', date: '2027-01-14', name: 'Makar Sankranti', category: 'festival' },
      { id: 'mh-h11', date: '2027-01-26', name: 'Republic Day', category: 'national' },
      { id: 'mh-h12', date: '2027-02-19', name: 'Chhatrapati Shivaji Maharaj Jayanti', category: 'state' },
      { id: 'mh-h13', date: '2027-03-06', name: 'Mahashivratri', category: 'festival' },
      { id: 'mh-h14', date: '2027-03-22', name: 'Dhulivandan (Holi)', category: 'festival' },
      { id: 'mh-h15', date: '2027-04-08', name: 'Gudi Padwa', category: 'state' },
      { id: 'mh-h16', date: '2027-04-14', name: 'Dr. Babasaheb Ambedkar Jayanti', category: 'state' },
    ],
    vacations: [
      {
        id: 'mh-v1',
        name: 'Ganesh Chaturthi Mid-Term Break',
        startDate: '2026-09-14',
        endDate: '2026-09-19',
        term: 'Term 1',
      },
      {
        id: 'mh-v2',
        name: 'Diwali Vacation (Term Break)',
        startDate: '2026-11-04',
        endDate: '2026-11-18',
        term: 'Term 1',
      },
    ],
    examWindows: [
      {
        id: 'mh-e1',
        name: 'First Unit Test (Unit Test 1)',
        startDate: '2026-08-10',
        endDate: '2026-08-14',
        term: 'Term 1',
        notes: 'Formative written + oral evaluation on Term 1 initial units.',
      },
      {
        id: 'mh-e2',
        name: 'First Semester / Term 1 Examination',
        startDate: '2026-10-22',
        endDate: '2026-10-31',
        term: 'Term 1',
        notes: 'Summative Term 1 assessment including oral/practical work.',
      },
      {
        id: 'mh-e3',
        name: 'Second Unit Test (Unit Test 2)',
        startDate: '2027-01-18',
        endDate: '2027-01-22',
        term: 'Term 2',
        notes: 'Mid-Term 2 evaluation before pre-annual consolidation.',
      },
      {
        id: 'mh-e4',
        name: 'Prelims / Second Semester Annual Examination',
        startDate: '2027-03-15',
        endDate: '2027-03-31',
        term: 'Annual',
        notes: 'Comprehensive annual/SSC board-pattern written & practical assessment.',
      },
    ],
    revisionWindows: [
      {
        id: 'mh-r1',
        name: 'Pre-First Term Revision Week',
        startDate: '2026-10-12',
        endDate: '2026-10-19',
        term: 'Term 1',
      },
      {
        id: 'mh-r2',
        name: 'Pre-Annual / SSC Full Syllabus Revision Sprint',
        startDate: '2027-02-26',
        endDate: '2027-03-12',
        term: 'Annual',
      },
    ],
  },

  CBSE: {
    id: 'cbse_active',
    board: 'CBSE',
    academicYear: '2026-2027',
    startDate: '2026-04-06',
    reopeningDate: '2026-04-06',
    endDate: '2027-03-31',
    syllabusCompletionDeadline: '2027-01-31',
    workingDaysOfWeek: [1, 2, 3, 4, 5, 6],
    saturdayRule: 'second_fourth_off',
    textbookEdition: '2026–2027 NCERT / NCF-SE Aligned Edition',
    defaultPeriodMinutes: 40,
    syllabusRevisionTag: 'CBSE-NCFSE-2026-27',
    version: 1,
    updatedAt: '2026-04-01T00:00:00.000Z',
    holidays: [
      { id: 'cb-h1', date: '2026-04-14', name: 'Dr. B. R. Ambedkar Jayanti', category: 'national' },
      { id: 'cb-h2', date: '2026-06-26', name: 'Muharram', category: 'festival' },
      { id: 'cb-h3', date: '2026-08-15', name: 'Independence Day', category: 'national' },
      { id: 'cb-h4', date: '2026-08-28', name: 'Raksha Bandhan', category: 'festival' },
      { id: 'cb-h5', date: '2026-09-04', name: 'Janmashtami', category: 'festival' },
      { id: 'cb-h6', date: '2026-10-02', name: 'Mahatma Gandhi Jayanti', category: 'national' },
      { id: 'cb-h7', date: '2026-11-24', name: 'Guru Nanak Jayanti', category: 'festival' },
      { id: 'cb-h8', date: '2027-01-14', name: 'Makar Sankranti / Pongal', category: 'festival' },
      { id: 'cb-h9', date: '2027-01-26', name: 'Republic Day', category: 'national' },
      { id: 'cb-h10', date: '2027-03-06', name: 'Mahashivratri', category: 'festival' },
      { id: 'cb-h11', date: '2027-03-22', name: 'Holi', category: 'festival' },
    ],
    vacations: [
      {
        id: 'cb-v1',
        name: 'Summer Vacation',
        startDate: '2026-05-11',
        endDate: '2026-06-14',
        term: 'Term 1',
      },
      {
        id: 'cb-v2',
        name: 'Autumn / Dussehra Break',
        startDate: '2026-10-17',
        endDate: '2026-10-22',
        term: 'Term 1',
      },
      {
        id: 'cb-v3',
        name: 'Diwali Break',
        startDate: '2026-11-06',
        endDate: '2026-11-11',
        term: 'Term 2',
      },
      {
        id: 'cb-v4',
        name: 'Winter Vacation',
        startDate: '2026-12-25',
        endDate: '2027-01-03',
        term: 'Term 2',
      },
    ],
    examWindows: [
      {
        id: 'cb-e1',
        name: 'Periodic Test 1 (PT-1)',
        startDate: '2026-07-20',
        endDate: '2026-07-25',
        term: 'Term 1',
        notes: 'CBSE competency-based periodic written assessment.',
      },
      {
        id: 'cb-e2',
        name: 'Half-Yearly / Mid-Term Examination',
        startDate: '2026-09-18',
        endDate: '2026-09-30',
        term: 'Term 1',
        notes: 'Term 1 summative evaluation with subject enrichment & notebook review.',
      },
      {
        id: 'cb-e3',
        name: 'Periodic Test 2 (PT-2)',
        startDate: '2026-12-07',
        endDate: '2026-12-12',
        term: 'Term 2',
        notes: 'Term 2 competency check & case-study practice.',
      },
      {
        id: 'cb-e4',
        name: 'Annual / Pre-Board Examination',
        startDate: '2027-02-22',
        endDate: '2027-03-12',
        term: 'Annual',
        notes: 'Full-syllabus CBSE examination including internal practicals & viva.',
      },
    ],
    revisionWindows: [
      {
        id: 'cb-r1',
        name: 'Half-Yearly Consolidation & Doubt Clearing',
        startDate: '2026-09-10',
        endDate: '2026-09-17',
        term: 'Term 1',
      },
      {
        id: 'cb-r2',
        name: 'Pre-Annual Sample Paper & Revision Sprint',
        startDate: '2027-02-01',
        endDate: '2027-02-20',
        term: 'Annual',
      },
    ],
  },

  ICSE: {
    id: 'icse_active',
    board: 'ICSE',
    academicYear: '2026-2027',
    startDate: '2026-04-06',
    reopeningDate: '2026-04-06',
    endDate: '2027-03-31',
    syllabusCompletionDeadline: '2027-01-31',
    workingDaysOfWeek: [1, 2, 3, 4, 5],
    saturdayRule: 'off',
    textbookEdition: '2026–2027 CISCE Regulations & Prescribed Syllabus',
    defaultPeriodMinutes: 40,
    syllabusRevisionTag: 'CISCE-2026-27',
    version: 1,
    updatedAt: '2026-04-01T00:00:00.000Z',
    holidays: [
      { id: 'ic-h1', date: '2026-04-14', name: 'Dr. B. R. Ambedkar Jayanti', category: 'national' },
      { id: 'ic-h2', date: '2026-06-26', name: 'Muharram', category: 'festival' },
      { id: 'ic-h3', date: '2026-08-15', name: 'Independence Day', category: 'national' },
      { id: 'ic-h4', date: '2026-08-28', name: 'Raksha Bandhan', category: 'festival' },
      { id: 'ic-h5', date: '2026-09-04', name: 'Janmashtami', category: 'festival' },
      { id: 'ic-h6', date: '2026-10-02', name: 'Mahatma Gandhi Jayanti', category: 'national' },
      { id: 'ic-h7', date: '2026-11-24', name: 'Guru Nanak Jayanti', category: 'festival' },
      { id: 'ic-h8', date: '2027-01-26', name: 'Republic Day', category: 'national' },
      { id: 'ic-h9', date: '2027-03-06', name: 'Mahashivratri', category: 'festival' },
      { id: 'ic-h10', date: '2027-03-22', name: 'Holi', category: 'festival' },
    ],
    vacations: [
      {
        id: 'ic-v1',
        name: 'Summer Vacation',
        startDate: '2026-05-08',
        endDate: '2026-06-14',
        term: 'Term 1',
      },
      {
        id: 'ic-v2',
        name: 'Puja / Dussehra & Diwali Recess',
        startDate: '2026-10-19',
        endDate: '2026-10-23',
        term: 'Term 1',
      },
      {
        id: 'ic-v3',
        name: 'Diwali Festival Break',
        startDate: '2026-11-06',
        endDate: '2026-11-11',
        term: 'Term 2',
      },
      {
        id: 'ic-v4',
        name: 'Christmas & Winter Recess',
        startDate: '2026-12-23',
        endDate: '2027-01-03',
        term: 'Term 2',
      },
    ],
    examWindows: [
      {
        id: 'ic-e1',
        name: 'First Cycle / Unit Assessment',
        startDate: '2026-07-20',
        endDate: '2026-07-24',
        term: 'Term 1',
        notes: 'CISCE structured written & analytical skills check.',
      },
      {
        id: 'ic-e2',
        name: 'First Term Examination',
        startDate: '2026-09-21',
        endDate: '2026-10-01',
        term: 'Term 1',
        notes: 'Term 1 written papers + internal lab/project rubric grading.',
      },
      {
        id: 'ic-e3',
        name: 'Internal Assessment & Practical Submission Window',
        startDate: '2026-12-14',
        endDate: '2026-12-18',
        term: 'Term 2',
        notes: 'CISCE 20% internal project, viva-voce, and practical file assessment.',
      },
      {
        id: 'ic-e4',
        name: 'Final / Pre-Council Examination',
        startDate: '2027-02-18',
        endDate: '2027-03-08',
        term: 'Annual',
        notes: 'Full-syllabus CISCE pattern written & practical examination.',
      },
    ],
    revisionWindows: [
      {
        id: 'ic-r1',
        name: 'Term 1 Structured Revision & Viva Prep',
        startDate: '2026-09-14',
        endDate: '2026-09-18',
        term: 'Term 1',
      },
      {
        id: 'ic-r2',
        name: 'Pre-Council Full Syllabus & Specimen Paper Revision',
        startDate: '2027-02-01',
        endDate: '2027-02-17',
        term: 'Annual',
      },
    ],
  },
};

export function getDefaultBoardCalendar(board: EducationBoard): BoardCalendarConfig {
  const base = DEFAULT_BOARD_CALENDARS[board];
  return {
    ...base,
    workingDaysOfWeek: [...base.workingDaysOfWeek],
    holidays: base.holidays.map((h) => ({ ...h })),
    vacations: base.vacations.map((v) => ({ ...v })),
    examWindows: base.examWindows.map((e) => ({ ...e })),
    revisionWindows: base.revisionWindows.map((r) => ({ ...r })),
  };
}

/**
 * Realistic Indian school weekly period allocation defaults per subject
 * so 2-period/week subjects (Drawing, GK, PE, Moral Ed) are never scheduled 6 days/week.
 */
export function getDefaultPeriodsPerWeekForSubject(
  subject: SubjectName,
  classNumber: number
): { periodsPerWeek: number; teachingDays: number[] } {
  if (
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry'
  ) {
    return classNumber >= 9
      ? { periodsPerWeek: 5, teachingDays: [1, 2, 3, 4, 5] }
      : { periodsPerWeek: 6, teachingDays: [1, 2, 3, 4, 5, 6] };
  }
  if (
    subject === 'English' ||
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology'
  ) {
    return { periodsPerWeek: 5, teachingDays: [1, 2, 3, 4, 5] };
  }
  if (
    subject === 'Marathi' ||
    subject === 'Hindi' ||
    subject === 'Social Science' ||
    subject === 'Social Studies' ||
    subject === 'History & Civics' ||
    subject === 'History' ||
    subject === 'Geography'
  ) {
    return { periodsPerWeek: 4, teachingDays: [1, 2, 4, 5] };
  }
  if (
    subject === 'Environmental Studies' ||
    subject === 'Sanskrit' ||
    subject === 'Political Science' ||
    subject === 'Economics' ||
    subject === 'Commercial Studies' ||
    subject === 'Computer Applications' ||
    subject === 'Information Technology' ||
    subject === 'Computer Studies' ||
    subject === 'Computer Knowledge'
  ) {
    return { periodsPerWeek: 3, teachingDays: [1, 3, 5] };
  }
  // GK, Moral Education, Drawing, PE, Environmental Education, Logical Reasoning, Vocabulary & Grammar
  return { periodsPerWeek: 2, teachingDays: [2, 5] };
}

export function getAllowedMediumsForBoard(board: EducationBoard): InstructionMedium[] {
  if (board === 'Maharashtra') return ['English', 'Semi-English', 'Marathi', 'Hindi'];
  if (board === 'CBSE') return ['English', 'Hindi'];
  return ['English'];
}

export function shiftIsoDateByYears(isoDate: string, yearsDelta: number): string {
  const parts = isoDate.split('-').map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDate;
  const [y, m, d] = parts;
  const targetYear = y + yearsDelta;
  const maxDay = new Date(Date.UTC(targetYear, m, 0)).getUTCDate();
  const safeDay = Math.min(d, maxDay);
  return `${targetYear}-${String(m).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`;
}

export function computeNextAcademicYearLabel(currentYear: string): string {
  const match = /^(\d{4})-(\d{4})$/.exec(currentYear.trim());
  if (!match) return '2027-2028';
  const y1 = parseInt(match[1], 10);
  const y2 = parseInt(match[2], 10);
  return `${y1 + 1}-${y2 + 1}`;
}

/**
 * Generates a clean preview/next-year calendar config when Admin runs UPDATE ACADEMIC YEAR.
 */
export function buildRolledOverBoardCalendar(
  current: BoardCalendarConfig,
  nextAcademicYear?: string,
  nextTextbookEdition?: string
): BoardCalendarConfig {
  const targetYear = nextAcademicYear || computeNextAcademicYearLabel(current.academicYear);
  const shiftHolidays = (list: CalendarHolidayItem[]): CalendarHolidayItem[] =>
    list.map((h) => ({ ...h, date: shiftIsoDateByYears(h.date, 1) }));
  const shiftRanges = (list: CalendarDateRangeItem[]): CalendarDateRangeItem[] =>
    list.map((r) => ({
      ...r,
      startDate: shiftIsoDateByYears(r.startDate, 1),
      endDate: shiftIsoDateByYears(r.endDate, 1),
    }));

  const defaultEdition =
    nextTextbookEdition ||
    current.textbookEdition.replace(
      /\d{4}[–-]\d{4}/,
      targetYear.replace('-', '–')
    );

  return {
    ...current,
    academicYear: targetYear,
    startDate: shiftIsoDateByYears(current.startDate, 1),
    reopeningDate: shiftIsoDateByYears(current.reopeningDate, 1),
    endDate: shiftIsoDateByYears(current.endDate, 1),
    syllabusCompletionDeadline: shiftIsoDateByYears(current.syllabusCompletionDeadline, 1),
    holidays: shiftHolidays(current.holidays),
    vacations: shiftRanges(current.vacations),
    examWindows: shiftRanges(current.examWindows),
    revisionWindows: shiftRanges(current.revisionWindows),
    textbookEdition: defaultEdition,
    syllabusRevisionTag: `${current.board.toUpperCase().slice(0, 4)}-${targetYear}`,
    version: (current.version || 1) + 1,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Merges a teacher's private school override onto the board calendar without mutating the global board config.
 */
export function mergeBoardAndSchoolCalendar(
  boardCalendar: BoardCalendarConfig,
  schoolOverride?: SchoolCalendarOverride | null
): BoardCalendarConfig {
  if (!schoolOverride) return boardCalendar;
  return {
    ...boardCalendar,
    startDate: schoolOverride.startDate || boardCalendar.startDate,
    reopeningDate: schoolOverride.reopeningDate || boardCalendar.reopeningDate,
    endDate: schoolOverride.endDate || boardCalendar.endDate,
    syllabusCompletionDeadline:
      schoolOverride.syllabusCompletionDeadline || boardCalendar.syllabusCompletionDeadline,
    workingDaysOfWeek:
      schoolOverride.workingDaysOfWeek && schoolOverride.workingDaysOfWeek.length > 0
        ? [...schoolOverride.workingDaysOfWeek]
        : [...boardCalendar.workingDaysOfWeek],
    saturdayRule: schoolOverride.saturdayRule || boardCalendar.saturdayRule,
    holidays: Array.isArray(schoolOverride.holidays)
      ? schoolOverride.holidays.map((h) => ({ ...h }))
      : boardCalendar.holidays,
    vacations: Array.isArray(schoolOverride.vacations)
      ? schoolOverride.vacations.map((v) => ({ ...v }))
      : boardCalendar.vacations,
    examWindows: Array.isArray(schoolOverride.examWindows)
      ? schoolOverride.examWindows.map((e) => ({ ...e }))
      : boardCalendar.examWindows,
    revisionWindows: Array.isArray(schoolOverride.revisionWindows)
      ? schoolOverride.revisionWindows.map((r) => ({ ...r }))
      : boardCalendar.revisionWindows,
  };
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validateCalendarConfig(config: {
  startDate: string;
  reopeningDate: string;
  syllabusCompletionDeadline: string;
  endDate: string;
  workingDaysOfWeek: number[];
  holidays: CalendarHolidayItem[];
  vacations: CalendarDateRangeItem[];
  examWindows: CalendarDateRangeItem[];
  revisionWindows: CalendarDateRangeItem[];
}): string[] {
  const errors: string[] = [];
  if (!ISO_DATE_RE.test(config.startDate)) errors.push('Start date must be YYYY-MM-DD.');
  if (!ISO_DATE_RE.test(config.reopeningDate)) errors.push('Reopening date must be YYYY-MM-DD.');
  if (!ISO_DATE_RE.test(config.syllabusCompletionDeadline)) {
    errors.push('Syllabus completion deadline must be YYYY-MM-DD.');
  }
  if (!ISO_DATE_RE.test(config.endDate)) errors.push('End date must be YYYY-MM-DD.');

  if (errors.length === 0) {
    if (config.startDate > config.reopeningDate) {
      errors.push('Start date cannot be after reopening date.');
    }
    if (config.reopeningDate >= config.syllabusCompletionDeadline) {
      errors.push('Syllabus completion deadline must be after reopening date.');
    }
    if (config.syllabusCompletionDeadline > config.endDate) {
      errors.push('Syllabus completion deadline cannot be after academic year end date.');
    }
  }

  if (!Array.isArray(config.workingDaysOfWeek) || config.workingDaysOfWeek.length === 0) {
    errors.push('Select at least one working weekday (Monday to Saturday).');
  }
  if (config.holidays.length > 80) errors.push('Holidays list cannot exceed 80 items.');
  if (config.vacations.length > 15) errors.push('Vacations list cannot exceed 15 items.');
  if (config.examWindows.length > 15) errors.push('Exam windows cannot exceed 15 items.');
  if (config.revisionWindows.length > 15) errors.push('Revision windows cannot exceed 15 items.');

  for (const r of [...config.vacations, ...config.examWindows, ...config.revisionWindows]) {
    if (!ISO_DATE_RE.test(r.startDate) || !ISO_DATE_RE.test(r.endDate)) {
      errors.push(`"${r.name || 'Range'}" has an invalid date format.`);
    } else if (r.startDate > r.endDate) {
      errors.push(`"${r.name || 'Range'}" start date cannot be after end date.`);
    }
  }

  return errors;
}
