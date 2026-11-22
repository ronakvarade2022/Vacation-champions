import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import {
  AcademicYearArchiveRecord,
  BoardCalendarConfig,
  CalendarDateRangeItem,
  CalendarHolidayItem,
  InstructionMedium,
  LessonPlannerGlobalSettings,
  OutcomeAttainmentStatus,
  PermittedLessonEdit,
  SaturdayRule,
  SchoolCalendarOverride,
  TeacherLessonPlanState,
} from '../types/lessonPlanner';
import {
  BOARD_CALENDAR_DOC_IDS,
  DEFAULT_GLOBAL_SETTINGS,
  buildRolledOverBoardCalendar,
  getAllowedMediumsForBoard,
  getDefaultBoardCalendar,
  validateCalendarConfig,
} from '../data/lessonPlanner/defaultBoardCalendars';
import { computeCalendarArchiveSummary } from '../utils/lessonPlanner/lessonPlanEngine';
import {
  OperationType,
  auth,
  db,
  handleFirestoreError,
  isFirestoreOfflineError,
} from './firebase';

/**
 * Isolated, additive-only Firestore persistence service for the MyStudyZone
 * Automatic Teacher Lesson Planning System.
 *
 * Collections used (4 new additive paths; zero modifications to existing 14 collections):
 * 1. /academic_calendars/{calendarId}
 * 2. /academic_year_archives/{archiveId}
 * 3. /students/{studentId}/school_calendars/{calendarId}
 * 4. /students/{studentId}/lesson_plans_state/{stateId}
 */

const ADMIN_EMAIL = 'ronakvarade2022@gmail.com';
const VALID_BOARDS: readonly EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
const VALID_SATURDAY_RULES: readonly SaturdayRule[] = [
  'off',
  'half_day',
  'full_day',
  'second_fourth_off',
];
const VALID_MEDIUMS: readonly InstructionMedium[] = [
  'English',
  'Marathi',
  'Semi-English',
  'Hindi',
];

const CACHE_TTL_MS = 60_000;
const LOCAL_STORAGE_PREFIX = 'msz_lp_cache_v1__';

const memoryCache = new Map<string, { ts: number; data: unknown }>();

function readLocalCache<T>(key: string): T | null {
  const mem = memoryCache.get(key);
  if (mem && Date.now() - mem.ts < CACHE_TTL_MS) {
    return mem.data as T;
  }
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: T };
    if (parsed && parsed.data !== undefined) {
      memoryCache.set(key, { ts: Date.now(), data: parsed.data });
      return parsed.data;
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

function writeLocalCache<T>(key: string, data: T): void {
  memoryCache.set(key, { ts: Date.now(), data });
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}${key}`,
      JSON.stringify({ ts: Date.now(), data })
    );
  } catch {
    // ignore quota errors
  }
}

function clearLocalCache(key: string): void {
  memoryCache.delete(key);
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${key}`);
  } catch {
    // ignore storage errors
  }
}

/**
 * Strictly sanitizes any composite document ID to match firestore.rules:
 * `id.size() > 0 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`
 */
export function sanitizeLessonPlannerDocId(raw: string): string {
  const normalized = String(raw || '')
    .trim()
    .replace(/[^a-zA-Z0-9_\-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return (normalized || 'doc').slice(0, 128);
}

export function buildSchoolCalendarDocId(
  academicYear: string,
  board: EducationBoard
): string {
  return sanitizeLessonPlannerDocId(`${academicYear}__${board}`);
}

export function buildLessonPlanStateDocId(params: {
  academicYear: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  division: string;
}): string {
  return sanitizeLessonPlannerDocId(
    `${params.academicYear}__${params.board}__${params.classLevel}__${params.subject}__${params.division}`
  );
}

export function buildAcademicYearArchiveDocId(
  board: EducationBoard,
  academicYear: string
): string {
  return sanitizeLessonPlannerDocId(`${board}_${academicYear}`);
}

/**
 * Verified Admin pre-write guard matching firestore.rules `isAdmin()`.
 * Prevents unverified or non-admin sessions from attempting cloud calendar/rollover writes.
 */
export async function isVerifiedAdminFirebaseAuth(): Promise<{
  verified: boolean;
  uid?: string;
  reason?: string;
}> {
  const user = auth.currentUser;
  if (!user) {
    return {
      verified: false,
      reason: 'Sign in with a verified Firebase Admin account before publishing calendar changes.',
    };
  }
  const email = (user.email || '').trim().toLowerCase();
  if (email === ADMIN_EMAIL && user.emailVerified === true) {
    return { verified: true, uid: user.uid };
  }
  // Check /admins/{uid} collection fallback (matches firestore.rules isAdmin())
  try {
    const adminSnap = await getDoc(doc(db, 'admins', user.uid));
    if (adminSnap.exists()) {
      return { verified: true, uid: user.uid };
    }
  } catch {
    // fall through to unverified reason
  }
  if (email === ADMIN_EMAIL && !user.emailVerified) {
    return {
      verified: false,
      reason:
        'Your Admin email is not yet email-verified in Firebase Auth. Please verify your email and sign in again before publishing.',
    };
  }
  return {
    verified: false,
    reason: 'Admin privileges required. Only verified MyStudyZone Administrators can publish global board calendars.',
  };
}

function clampString(value: unknown, maxLen: number, fallback = ''): string {
  const str = String(value ?? fallback).trim();
  return str.slice(0, maxLen);
}

function sanitizeWorkingDays(days: unknown): number[] {
  if (!Array.isArray(days)) return [1, 2, 3, 4, 5];
  const clean = days
    .map((d) => Number(d))
    .filter((d) => Number.isInteger(d) && d >= 1 && d <= 6)
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .sort((a, b) => a - b)
    .slice(0, 6);
  return clean.length > 0 ? clean : [1, 2, 3, 4, 5];
}

function sanitizeHolidays(list: unknown): CalendarHolidayItem[] {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, 80)
    .map((item, idx) => ({
      id: sanitizeLessonPlannerDocId(String((item as CalendarHolidayItem)?.id || `h_${idx + 1}`)),
      date: clampString((item as CalendarHolidayItem)?.date, 10),
      name: clampString((item as CalendarHolidayItem)?.name, 100, 'Holiday'),
      category: ((item as CalendarHolidayItem)?.category || 'school') as CalendarHolidayItem['category'],
    }))
    .filter((h) => /^\d{4}-\d{2}-\d{2}$/.test(h.date));
}

function sanitizeDateRanges(list: unknown): CalendarDateRangeItem[] {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, 15)
    .map((item, idx) => ({
      id: sanitizeLessonPlannerDocId(String((item as CalendarDateRangeItem)?.id || `r_${idx + 1}`)),
      name: clampString((item as CalendarDateRangeItem)?.name, 120, 'Scheduled Window'),
      startDate: clampString((item as CalendarDateRangeItem)?.startDate, 10),
      endDate: clampString((item as CalendarDateRangeItem)?.endDate, 10),
      term: ((item as CalendarDateRangeItem)?.term || 'Term 1') as CalendarDateRangeItem['term'],
      ...(item && (item as CalendarDateRangeItem).notes
        ? { notes: clampString((item as CalendarDateRangeItem).notes, 200) }
        : {}),
    }))
    .filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.startDate) && /^\d{4}-\d{2}-\d{2}$/.test(r.endDate));
}

function sanitizeBoundedStringRecord(
  obj: unknown,
  maxEntries: number,
  maxValLen: number
): Record<string, string> {
  if (!obj || typeof obj !== 'object') return {};
  const out: Record<string, string> = {};
  let count = 0;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (count >= maxEntries) break;
    const cleanKey = clampString(k, 80);
    const cleanVal = clampString(v, maxValLen);
    if (cleanKey && cleanVal) {
      out[cleanKey] = cleanVal;
      count += 1;
    }
  }
  return out;
}

function sanitizePermittedEditsMap(
  obj: unknown
): Record<string, PermittedLessonEdit> {
  if (!obj || typeof obj !== 'object') return {};
  const out: Record<string, PermittedLessonEdit> = {};
  let count = 0;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (count >= 300) break;
    if (!v || typeof v !== 'object') continue;
    const cleanKey = clampString(k, 80);
    const raw = v as PermittedLessonEdit;
    const entry: PermittedLessonEdit = {};
    if (raw.subTopicFocus) entry.subTopicFocus = clampString(raw.subTopicFocus, 180);
    if (raw.teachingAidNote) entry.teachingAidNote = clampString(raw.teachingAidNote, 200);
    if (raw.activityNote) entry.activityNote = clampString(raw.activityNote, 300);
    if (raw.homeworkNote) entry.homeworkNote = clampString(raw.homeworkNote, 300);
    if (cleanKey && Object.keys(entry).length > 0) {
      out[cleanKey] = entry;
      count += 1;
    }
  }
  return out;
}

function sanitizeBoardCalendarPayload(
  config: BoardCalendarConfig,
  updatedByUid: string
): Record<string, unknown> {
  const board: EducationBoard = VALID_BOARDS.includes(config.board)
    ? config.board
    : 'Maharashtra';
  const docId = BOARD_CALENDAR_DOC_IDS[board];
  const saturdayRule: SaturdayRule = VALID_SATURDAY_RULES.includes(config.saturdayRule)
    ? config.saturdayRule
    : 'half_day';

  return {
    id: docId,
    isPublicCalendar: true,
    board,
    academicYear: clampString(config.academicYear, 20, '2026-2027'),
    startDate: clampString(config.startDate, 10),
    reopeningDate: clampString(config.reopeningDate, 10),
    endDate: clampString(config.endDate, 10),
    syllabusCompletionDeadline: clampString(config.syllabusCompletionDeadline, 10),
    workingDaysOfWeek: sanitizeWorkingDays(config.workingDaysOfWeek),
    saturdayRule,
    holidays: sanitizeHolidays(config.holidays),
    vacations: sanitizeDateRanges(config.vacations),
    examWindows: sanitizeDateRanges(config.examWindows),
    revisionWindows: sanitizeDateRanges(config.revisionWindows),
    textbookEdition: clampString(config.textbookEdition, 160),
    defaultPeriodMinutes: Math.max(20, Math.min(90, Math.round(Number(config.defaultPeriodMinutes) || 40))),
    syllabusRevisionTag: clampString(config.syllabusRevisionTag, 60),
    version: Math.max(1, Math.round(Number(config.version) || 1)),
    updatedAt: new Date().toISOString(),
    updatedByUid: clampString(updatedByUid, 128),
  };
}

// ============================================================================
// 1. GLOBAL ACADEMIC CALENDARS & SETTINGS (/academic_calendars/{calendarId})
// ============================================================================

export async function fetchActiveBoardCalendar(
  board: EducationBoard
): Promise<BoardCalendarConfig> {
  const docId = BOARD_CALENDAR_DOC_IDS[board];
  const cacheKey = `board_cal_${docId}`;
  const path = `academic_calendars/${docId}`;

  try {
    const snap = await getDoc(doc(db, 'academic_calendars', docId));
    if (snap.exists()) {
      const data = snap.data() as BoardCalendarConfig;
      const merged: BoardCalendarConfig = {
        ...getDefaultBoardCalendar(board),
        ...data,
        id: docId,
        board,
      };
      writeLocalCache(cacheKey, merged);
      return merged;
    }
    const fallback = getDefaultBoardCalendar(board);
    writeLocalCache(cacheKey, fallback);
    return fallback;
  } catch (error) {
    const cached = readLocalCache<BoardCalendarConfig>(cacheKey);
    if (cached) return cached;
    if (isFirestoreOfflineError(error)) {
      return getDefaultBoardCalendar(board);
    }
    console.warn(`LessonPlanner: fallback default calendar used for ${path}`, error);
    return getDefaultBoardCalendar(board);
  }
}

export async function fetchAllActiveBoardCalendars(): Promise<
  Record<EducationBoard, BoardCalendarConfig>
> {
  const [mh, cbse, icse] = await Promise.all([
    fetchActiveBoardCalendar('Maharashtra'),
    fetchActiveBoardCalendar('CBSE'),
    fetchActiveBoardCalendar('ICSE'),
  ]);
  return { Maharashtra: mh, CBSE: cbse, ICSE: icse };
}

export async function saveBoardCalendarConfig(
  config: BoardCalendarConfig
): Promise<{ success: boolean; calendar?: BoardCalendarConfig; error?: string }> {
  const adminCheck = await isVerifiedAdminFirebaseAuth();
  if (!adminCheck.verified || !adminCheck.uid) {
    return { success: false, error: adminCheck.reason };
  }

  const validationErrors = validateCalendarConfig(config);
  if (validationErrors.length > 0) {
    return { success: false, error: validationErrors[0] };
  }

  const docId = BOARD_CALENDAR_DOC_IDS[config.board];
  const path = `academic_calendars/${docId}`;
  const payload = sanitizeBoardCalendarPayload(
    { ...config, version: (config.version || 1) + 1 },
    adminCheck.uid
  );

  try {
    await setDoc(doc(db, 'academic_calendars', docId), payload);
    const saved = payload as unknown as BoardCalendarConfig;
    writeLocalCache(`board_cal_${docId}`, saved);
    return { success: true, calendar: saved };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error: 'Failed to publish board calendar.' };
  }
}

export async function fetchGlobalLessonPlannerSettings(): Promise<LessonPlannerGlobalSettings> {
  const cacheKey = 'lp_global_settings';
  try {
    const snap = await getDoc(doc(db, 'academic_calendars', 'global_settings'));
    if (snap.exists()) {
      const data = snap.data() as Partial<LessonPlannerGlobalSettings>;
      const merged: LessonPlannerGlobalSettings = {
        ...DEFAULT_GLOBAL_SETTINGS,
        ...data,
        id: 'global_settings',
      };
      writeLocalCache(cacheKey, merged);
      return merged;
    }
    return { ...DEFAULT_GLOBAL_SETTINGS };
  } catch {
    return readLocalCache<LessonPlannerGlobalSettings>(cacheKey) || { ...DEFAULT_GLOBAL_SETTINGS };
  }
}

export async function saveGlobalLessonPlannerSettings(
  settings: LessonPlannerGlobalSettings
): Promise<{ success: boolean; settings?: LessonPlannerGlobalSettings; error?: string }> {
  const adminCheck = await isVerifiedAdminFirebaseAuth();
  if (!adminCheck.verified || !adminCheck.uid) {
    return { success: false, error: adminCheck.reason };
  }

  const path = 'academic_calendars/global_settings';
  const payload = {
    id: 'global_settings' as const,
    isPublicCalendar: true,
    defaultPeriodMinutes: Math.max(
      20,
      Math.min(90, Math.round(Number(settings.defaultPeriodMinutes) || 40))
    ),
    allowTeacherWeightCustomization: Boolean(settings.allowTeacherWeightCustomization),
    allowTeacherCalendarCustomization: Boolean(settings.allowTeacherCalendarCustomization),
    showCurriculumReviewNoticeToTeachers: Boolean(
      settings.showCurriculumReviewNoticeToTeachers
    ),
    defaultMediumByBoard: {
      Maharashtra: getAllowedMediumsForBoard('Maharashtra').includes(
        settings.defaultMediumByBoard?.Maharashtra
      )
        ? settings.defaultMediumByBoard.Maharashtra
        : 'Semi-English',
      CBSE: getAllowedMediumsForBoard('CBSE').includes(settings.defaultMediumByBoard?.CBSE)
        ? settings.defaultMediumByBoard.CBSE
        : 'English',
      ICSE: 'English' as InstructionMedium,
    },
    updatedAt: new Date().toISOString(),
    updatedByUid: clampString(adminCheck.uid, 128),
  };

  try {
    await setDoc(doc(db, 'academic_calendars', 'global_settings'), payload);
    const saved: LessonPlannerGlobalSettings = {
      id: 'global_settings',
      defaultPeriodMinutes: payload.defaultPeriodMinutes,
      allowTeacherWeightCustomization: payload.allowTeacherWeightCustomization,
      allowTeacherCalendarCustomization: payload.allowTeacherCalendarCustomization,
      showCurriculumReviewNoticeToTeachers: payload.showCurriculumReviewNoticeToTeachers,
      defaultMediumByBoard: payload.defaultMediumByBoard,
      updatedAt: payload.updatedAt,
      updatedByUid: payload.updatedByUid,
    };
    writeLocalCache('lp_global_settings', saved);
    return { success: true, settings: saved };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error: 'Failed to save global settings.' };
  }
}

// ============================================================================
// 2. IMMUTABLE ACADEMIC YEAR ARCHIVES & ATOMIC ROLLOVER (/academic_year_archives)
// ============================================================================

export async function fetchAcademicYearArchives(
  boardFilter?: EducationBoard
): Promise<AcademicYearArchiveRecord[]> {
  const cacheKey = `lp_archives_${boardFilter || 'ALL'}`;
  const path = 'academic_year_archives';
  try {
    const q = boardFilter
      ? query(
          collection(db, 'academic_year_archives'),
          where('isArchivedSnapshot', '==', true),
          where('board', '==', boardFilter)
        )
      : query(
          collection(db, 'academic_year_archives'),
          where('isArchivedSnapshot', '==', true)
        );
    const snap = await getDocs(q);
    const records = snap.docs
      .map((d) => d.data() as AcademicYearArchiveRecord)
      .sort((a, b) => (b.archivedAt || '').localeCompare(a.archivedAt || ''));
    writeLocalCache(cacheKey, records);
    return records;
  } catch (error) {
    const cached = readLocalCache<AcademicYearArchiveRecord[]>(cacheKey);
    if (cached) return cached;
    if (isFirestoreOfflineError(error)) return [];
    console.warn(`LessonPlanner: archive fetch warning on ${path}`, error);
    return [];
  }
}

/**
 * Atomic single-board UPDATE ACADEMIC YEAR rollover using Firestore `writeBatch(db)`:
 * 1. Creates immutable snapshot in `/academic_year_archives/{Board_OldYear}`
 * 2. Publishes recalculated new academic year in `/academic_calendars/{boardDocId}`
 * Never mutates the other two education boards.
 */
export async function rolloverBoardAcademicYear(params: {
  currentCalendar: BoardCalendarConfig;
  nextAcademicYear?: string;
  nextTextbookEdition?: string;
  archiveNote?: string;
}): Promise<{
  success: boolean;
  archiveRecord?: AcademicYearArchiveRecord;
  newCalendar?: BoardCalendarConfig;
  error?: string;
}> {
  const adminCheck = await isVerifiedAdminFirebaseAuth();
  if (!adminCheck.verified || !adminCheck.uid) {
    return { success: false, error: adminCheck.reason };
  }

  const { currentCalendar, nextAcademicYear, nextTextbookEdition, archiveNote } = params;
  const rolledCalendar = buildRolledOverBoardCalendar(
    currentCalendar,
    nextAcademicYear,
    nextTextbookEdition
  );
  const validationErrors = validateCalendarConfig(rolledCalendar);
  if (validationErrors.length > 0) {
    return { success: false, error: validationErrors[0] };
  }

  const archiveId = buildAcademicYearArchiveDocId(
    currentCalendar.board,
    currentCalendar.academicYear
  );
  const boardDocId = BOARD_CALENDAR_DOC_IDS[currentCalendar.board];
  const nowIso = new Date().toISOString();

  // Prevent overwriting an already-archived year (archives are permanently immutable)
  try {
    const existingArchive = await getDoc(doc(db, 'academic_year_archives', archiveId));
    if (existingArchive.exists()) {
      return {
        success: false,
        error: `Academic year ${currentCalendar.academicYear} for ${currentCalendar.board} is already archived (${archiveId}). Choose a distinct academic year label.`,
      };
    }
  } catch {
    // proceed to batch where security rules enforce create-only immutability
  }

  const summaryStats = computeCalendarArchiveSummary(currentCalendar);
  const cleanSnapshot = sanitizeBoardCalendarPayload(currentCalendar, adminCheck.uid);
  const nextCalendarPayload = sanitizeBoardCalendarPayload(rolledCalendar, adminCheck.uid);

  const archivePayload: Record<string, unknown> = {
    id: archiveId,
    isArchivedSnapshot: true,
    board: currentCalendar.board,
    academicYear: clampString(currentCalendar.academicYear, 20),
    calendarSnapshot: cleanSnapshot,
    summaryStats,
    archivedAt: nowIso,
    archivedByUid: clampString(adminCheck.uid, 128),
    ...(archiveNote ? { archiveNote: clampString(archiveNote, 300) } : {}),
  };

  const batchPath = `writeBatch(academic_year_archives/${archiveId}, academic_calendars/${boardDocId})`;
  try {
    const batch = writeBatch(db);
    batch.set(doc(db, 'academic_year_archives', archiveId), archivePayload);
    batch.set(doc(db, 'academic_calendars', boardDocId), nextCalendarPayload);
    await batch.commit();

    const savedCal = nextCalendarPayload as unknown as BoardCalendarConfig;
    const savedArchive = archivePayload as unknown as AcademicYearArchiveRecord;
    writeLocalCache(`board_cal_${boardDocId}`, savedCal);
    clearLocalCache(`lp_archives_${currentCalendar.board}`);
    clearLocalCache('lp_archives_ALL');

    return {
      success: true,
      archiveRecord: savedArchive,
      newCalendar: savedCal,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, batchPath);
    return { success: false, error: 'Atomic academic year rollover failed.' };
  }
}

// ============================================================================
// 3. PRIVATE PER-TEACHER SCHOOL CALENDARS (/students/{uid}/school_calendars)
// ============================================================================

/**
 * Carries forward non-date recurring school preferences (schoolName, medium, workingDaysOfWeek,
 * saturdayRule) into a newly rolled-over academic year while adopting the new board calendar's dates.
 */
export function carryForwardTeacherSchoolCalendar(
  priorOverride: SchoolCalendarOverride,
  newBoardCalendar: BoardCalendarConfig
): SchoolCalendarOverride {
  const allowedMediums = getAllowedMediumsForBoard(newBoardCalendar.board);
  const safeMedium: InstructionMedium = allowedMediums.includes(priorOverride.medium)
    ? priorOverride.medium
    : allowedMediums[0];

  return {
    id: buildSchoolCalendarDocId(newBoardCalendar.academicYear, newBoardCalendar.board),
    board: newBoardCalendar.board,
    academicYear: newBoardCalendar.academicYear,
    schoolName: priorOverride.schoolName,
    medium: safeMedium,
    startDate: newBoardCalendar.startDate,
    reopeningDate: newBoardCalendar.reopeningDate,
    endDate: newBoardCalendar.endDate,
    syllabusCompletionDeadline: newBoardCalendar.syllabusCompletionDeadline,
    workingDaysOfWeek: [...priorOverride.workingDaysOfWeek],
    saturdayRule: priorOverride.saturdayRule,
    holidays: newBoardCalendar.holidays.map((h) => ({ ...h })),
    vacations: newBoardCalendar.vacations.map((v) => ({ ...v })),
    examWindows: newBoardCalendar.examWindows.map((e) => ({ ...e })),
    revisionWindows: newBoardCalendar.revisionWindows.map((r) => ({ ...r })),
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchTeacherSchoolCalendar(
  studentProfileDocId: string,
  academicYear: string,
  board: EducationBoard
): Promise<SchoolCalendarOverride | null> {
  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const docId = buildSchoolCalendarDocId(academicYear, board);
  const cacheKey = `school_cal_${cleanStudentId}_${docId}`;
  const path = `students/${cleanStudentId}/school_calendars/${docId}`;

  try {
    const snap = await getDoc(doc(db, 'students', cleanStudentId, 'school_calendars', docId));
    if (snap.exists()) {
      const data = snap.data() as SchoolCalendarOverride;
      writeLocalCache(cacheKey, data);
      return data;
    }
    return null;
  } catch (error) {
    const cached = readLocalCache<SchoolCalendarOverride>(cacheKey);
    if (cached) return cached;
    if (isFirestoreOfflineError(error)) return null;
    console.warn(`LessonPlanner: school calendar read warning on ${path}`, error);
    return null;
  }
}

export async function saveTeacherSchoolCalendar(
  studentProfileDocId: string,
  override: SchoolCalendarOverride
): Promise<{ success: boolean; override?: SchoolCalendarOverride; error?: string }> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: 'Please sign in as a Teacher to save school calendar settings.' };
  }

  const validationErrors = validateCalendarConfig(override);
  if (validationErrors.length > 0) {
    return { success: false, error: validationErrors[0] };
  }

  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const docId = buildSchoolCalendarDocId(override.academicYear, override.board);
  const path = `students/${cleanStudentId}/school_calendars/${docId}`;
  const allowedMediums = getAllowedMediumsForBoard(override.board);
  const safeMedium: InstructionMedium = allowedMediums.includes(override.medium)
    ? override.medium
    : allowedMediums[0];
  const safeSaturday: SaturdayRule = VALID_SATURDAY_RULES.includes(override.saturdayRule)
    ? override.saturdayRule
    : 'half_day';

  const payload = {
    id: docId,
    teacherUid: clampString(currentUser.uid, 128),
    board: override.board,
    academicYear: clampString(override.academicYear, 20),
    schoolName: clampString(override.schoolName, 150),
    medium: safeMedium,
    startDate: clampString(override.startDate || override.reopeningDate, 10),
    reopeningDate: clampString(override.reopeningDate, 10),
    endDate: clampString(override.endDate, 10),
    syllabusCompletionDeadline: clampString(override.syllabusCompletionDeadline, 10),
    workingDaysOfWeek: sanitizeWorkingDays(override.workingDaysOfWeek),
    saturdayRule: safeSaturday,
    holidays: sanitizeHolidays(override.holidays),
    vacations: sanitizeDateRanges(override.vacations),
    examWindows: sanitizeDateRanges(override.examWindows),
    revisionWindows: sanitizeDateRanges(override.revisionWindows),
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'students', cleanStudentId, 'school_calendars', docId), payload);
    const saved = payload as unknown as SchoolCalendarOverride;
    writeLocalCache(`school_cal_${cleanStudentId}_${docId}`, saved);
    return { success: true, override: saved };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error: 'Failed to save private school calendar.' };
  }
}

export async function deleteTeacherSchoolCalendar(
  studentProfileDocId: string,
  academicYear: string,
  board: EducationBoard
): Promise<{ success: boolean; error?: string }> {
  if (!auth.currentUser) {
    return { success: false, error: 'Sign in required.' };
  }
  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const docId = buildSchoolCalendarDocId(academicYear, board);
  const path = `students/${cleanStudentId}/school_calendars/${docId}`;
  try {
    await deleteDoc(doc(db, 'students', cleanStudentId, 'school_calendars', docId));
    clearLocalCache(`school_cal_${cleanStudentId}_${docId}`);
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return { success: false, error: 'Failed to reset school calendar.' };
  }
}

// ============================================================================
// 4. PRIVATE PER-TEACHER LESSON PLAN STATE (/students/{uid}/lesson_plans_state)
// ============================================================================

export async function fetchTeacherLessonPlanState(
  studentProfileDocId: string,
  params: {
    academicYear: string;
    board: EducationBoard;
    classLevel: ClassLevel;
    subject: SubjectName;
    division: string;
  }
): Promise<TeacherLessonPlanState | null> {
  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const docId = buildLessonPlanStateDocId(params);
  const cacheKey = `lp_state_${cleanStudentId}_${docId}`;
  const path = `students/${cleanStudentId}/lesson_plans_state/${docId}`;

  try {
    const snap = await getDoc(doc(db, 'students', cleanStudentId, 'lesson_plans_state', docId));
    if (snap.exists()) {
      const data = snap.data() as TeacherLessonPlanState;
      writeLocalCache(cacheKey, data);
      return data;
    }
    return null;
  } catch (error) {
    const cached = readLocalCache<TeacherLessonPlanState>(cacheKey);
    if (cached) return cached;
    if (isFirestoreOfflineError(error)) return null;
    console.warn(`LessonPlanner: state read warning on ${path}`, error);
    return null;
  }
}

export async function listTeacherLessonPlanStates(
  studentProfileDocId: string,
  academicYear?: string
): Promise<TeacherLessonPlanState[]> {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const cacheKey = `lp_states_list_${cleanStudentId}_${academicYear || 'ALL'}`;
  const path = `students/${cleanStudentId}/lesson_plans_state`;

  try {
    // Explicitly scope by teacherUid == currentUser.uid to satisfy rule-side list query enforcement
    const constraints = [where('teacherUid', '==', currentUser.uid)];
    if (academicYear) {
      constraints.push(where('academicYear', '==', academicYear));
    }
    const q = query(
      collection(db, 'students', cleanStudentId, 'lesson_plans_state'),
      ...constraints
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => d.data() as TeacherLessonPlanState);
    writeLocalCache(cacheKey, list);
    return list;
  } catch (error) {
    const cached = readLocalCache<TeacherLessonPlanState[]>(cacheKey);
    if (cached) return cached;
    if (isFirestoreOfflineError(error)) return [];
    console.warn(`LessonPlanner: state list warning on ${path}`, error);
    return [];
  }
}

export async function saveTeacherLessonPlanState(
  studentProfileDocId: string,
  state: TeacherLessonPlanState
): Promise<{ success: boolean; state?: TeacherLessonPlanState; error?: string }> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: 'Please sign in as a Teacher to save lesson plan progress.' };
  }

  const cleanStudentId = sanitizeLessonPlannerDocId(studentProfileDocId);
  const docId = buildLessonPlanStateDocId({
    academicYear: state.academicYear,
    board: state.board,
    classLevel: state.classLevel,
    subject: state.subject,
    division: state.division || 'Div A',
  });
  const path = `students/${cleanStudentId}/lesson_plans_state/${docId}`;

  const safeMedium: InstructionMedium = VALID_MEDIUMS.includes(state.medium)
    ? state.medium
    : 'English';

  const cleanCompletedDates = Array.isArray(state.completedLessonDates)
    ? Array.from(
        new Set(
          state.completedLessonDates
            .map((d) => clampString(d, 10))
            .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
        )
      ).slice(0, 300)
    : [];

  const cleanCompletedChapters = Array.isArray(state.completedChapterIds)
    ? Array.from(
        new Set(state.completedChapterIds.map((c) => clampString(c, 80)).filter(Boolean))
      ).slice(0, 60)
    : [];

  const cleanWeights: Record<string, number> = {};
  if (state.chapterWeightOverrides && typeof state.chapterWeightOverrides === 'object') {
    let cnt = 0;
    for (const [k, v] of Object.entries(state.chapterWeightOverrides)) {
      if (cnt >= 60) break;
      const ck = clampString(k, 80);
      const num = Math.max(1, Math.min(20, Math.round(Number(v) || 1)));
      if (ck) {
        cleanWeights[ck] = num;
        cnt += 1;
      }
    }
  }

  const validOutcomeVals = new Set<OutcomeAttainmentStatus>([
    'planned',
    'in_progress',
    'achieved',
    'needs_remedial',
  ]);
  const cleanOutcomeStatuses: Record<string, OutcomeAttainmentStatus> = {};
  if (state.outcomeStatuses && typeof state.outcomeStatuses === 'object') {
    let cnt = 0;
    for (const [k, v] of Object.entries(state.outcomeStatuses)) {
      if (cnt >= 180) break;
      const ck = clampString(k, 90);
      if (ck && validOutcomeVals.has(v)) {
        cleanOutcomeStatuses[ck] = v;
        cnt += 1;
      }
    }
  }

  const payload: Record<string, unknown> = {
    id: docId,
    teacherUid: clampString(currentUser.uid, 128),
    board: VALID_BOARDS.includes(state.board) ? state.board : 'Maharashtra',
    classLevel: clampString(state.classLevel, 20),
    subject: clampString(state.subject, 100),
    academicYear: clampString(state.academicYear, 20),
    division: clampString(state.division || 'Div A', 30, 'Div A'),
    medium: safeMedium,
    periodsPerWeek: Math.max(1, Math.min(6, Math.round(Number(state.periodsPerWeek) || 4))),
    teachingDays: sanitizeWorkingDays(state.teachingDays),
    completedLessonDates: cleanCompletedDates,
    completedDateLocks: sanitizeBoundedStringRecord(state.completedDateLocks, 300, 10),
    completedChapterIds: cleanCompletedChapters,
    chapterWeightOverrides: cleanWeights,
    outcomeStatuses: cleanOutcomeStatuses,
    outcomeNotes: sanitizeBoundedStringRecord(state.outcomeNotes, 180, 240),
    permittedEdits: sanitizePermittedEditsMap(state.permittedEdits),
    privateRemarks: sanitizeBoundedStringRecord(state.privateRemarks, 300, 400),
    updatedAt: new Date().toISOString(),
  };

  if (state.shiftAnchorDate && /^\d{4}-\d{2}-\d{2}$/.test(state.shiftAnchorDate)) {
    payload.shiftAnchorDate = state.shiftAnchorDate;
  }

  try {
    await setDoc(doc(db, 'students', cleanStudentId, 'lesson_plans_state', docId), payload);
    const saved = payload as unknown as TeacherLessonPlanState;
    writeLocalCache(`lp_state_${cleanStudentId}_${docId}`, saved);
    clearLocalCache(`lp_states_list_${cleanStudentId}_${state.academicYear}`);
    clearLocalCache(`lp_states_list_${cleanStudentId}_ALL`);
    return { success: true, state: saved };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error: 'Failed to save lesson plan progress.' };
  }
}
