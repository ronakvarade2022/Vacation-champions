import type { ClassLevel, EducationBoard } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalContentWorkflowStatus,
  type AdditionalCurriculumCompletionStats,
  type AdditionalCurriculumProgressRecord,
  type AdditionalSubjectDefinition,
  type AdditionalTeacherAssignment,
} from '../types/additionalCurriculum';
import {
  ALL_ADDITIONAL_BOARDS,
  ALL_ADDITIONAL_CLASSES,
  BOARD_ALLOWED_MEDIUMS,
  DEFAULT_ADDITIONAL_SUBJECTS,
} from '../data/additionalCurriculum/subjectsCatalog';
import {
  DEFAULT_ADDITIONAL_CHAPTERS,
  findAdditionalSubjectForNonStandaloneName,
} from '../data/additionalCurriculum/additionalCurriculumRegistry';
import {
  ADDITIONAL_ADMIN_STORAGE_KEY,
  ADDITIONAL_ASSIGNMENTS_STORAGE_KEY,
  ADDITIONAL_PROGRESS_STORAGE_KEY,
  broadcastAdditionalCurriculumChange,
  deleteTeacherAssignmentFromCloud,
  syncAdditionalChapterToCloud,
  syncAdditionalSubjectToCloud,
  syncStudentAdditionalProgressToCloud,
  syncTeacherAssignmentToCloud,
} from './additionalCurriculumPersistence';

const ADMIN_OVERRIDES_STORAGE_KEY = ADDITIONAL_ADMIN_STORAGE_KEY;
const TEACHER_ASSIGNMENTS_STORAGE_KEY = ADDITIONAL_ASSIGNMENTS_STORAGE_KEY;
const STUDENT_PROGRESS_STORAGE_KEY = ADDITIONAL_PROGRESS_STORAGE_KEY;

interface AdditionalCurriculumAdminOverlay {
  subjectOverrides: Record<string, AdditionalSubjectDefinition>;
  chapterOverrides: Record<string, AdditionalChapterRecord>;
}

function hasLocalStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readAdminOverlay(): AdditionalCurriculumAdminOverlay {
  if (!hasLocalStorage()) {
    return { subjectOverrides: {}, chapterOverrides: {} };
  }
  try {
    const raw = window.localStorage.getItem(ADMIN_OVERRIDES_STORAGE_KEY);
    if (!raw) return { subjectOverrides: {}, chapterOverrides: {} };
    const parsed = JSON.parse(raw) as Partial<AdditionalCurriculumAdminOverlay>;
    return {
      subjectOverrides: parsed.subjectOverrides && typeof parsed.subjectOverrides === 'object' ? parsed.subjectOverrides : {},
      chapterOverrides: parsed.chapterOverrides && typeof parsed.chapterOverrides === 'object' ? parsed.chapterOverrides : {},
    };
  } catch {
    return { subjectOverrides: {}, chapterOverrides: {} };
  }
}

function writeAdminOverlay(overlay: AdditionalCurriculumAdminOverlay): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(ADMIN_OVERRIDES_STORAGE_KEY, JSON.stringify(overlay));
    broadcastAdditionalCurriculumChange('admin_cms');
  } catch {
    // Ignore quota errors gracefully
  }
}

export function getAllowedMediumsForBoard(board: EducationBoard): InstructionMedium[] {
  return [...(BOARD_ALLOWED_MEDIUMS[board] || ['English'])];
}

export function normalizeMediumForBoard(board: EducationBoard, medium: InstructionMedium): InstructionMedium {
  const allowed = getAllowedMediumsForBoard(board);
  return allowed.includes(medium) ? medium : allowed[0];
}

export function getLocalizedSubjectName(
  subject: AdditionalSubjectDefinition,
  medium: InstructionMedium
): string {
  if (medium === 'Marathi') {
    return `${subject.localizedNames.Marathi} (${subject.name})`;
  }
  if (medium === 'Hindi') {
    return `${subject.localizedNames.Hindi} (${subject.name})`;
  }
  if (medium === 'Semi-English') {
    return `${subject.name} · ${subject.localizedNames.Marathi}`;
  }
  return subject.name;
}

export function getLocalizedChapterTitle(
  chapter: AdditionalChapterRecord,
  medium: InstructionMedium
): string {
  if (medium === 'Marathi') {
    return `${chapter.localizedTitles.Marathi} (${chapter.title})`;
  }
  if (medium === 'Hindi') {
    return `${chapter.localizedTitles.Hindi} (${chapter.title})`;
  }
  if (medium === 'Semi-English') {
    return `${chapter.title} · ${chapter.localizedTitles.Marathi}`;
  }
  return chapter.title;
}

export function getAllAdditionalSubjects(options?: {
  board?: EducationBoard;
  medium?: InstructionMedium;
  includeUnpublished?: boolean;
}): AdditionalSubjectDefinition[] {
  const overlay = readAdminOverlay();
  const map = new Map<string, AdditionalSubjectDefinition>();

  for (const base of DEFAULT_ADDITIONAL_SUBJECTS) {
    map.set(base.id, { ...base });
  }
  for (const [id, custom] of Object.entries(overlay.subjectOverrides)) {
    map.set(id, { ...custom });
  }

  let list = Array.from(map.values());

  if (!options?.includeUnpublished) {
    list = list.filter((s) => s.isPublished);
  }
  if (options?.board) {
    list = list.filter((s) => s.applicableBoards.includes(options.board!));
  }
  if (options?.medium) {
    list = list.filter((s) => s.applicableMediums.includes(options.medium!));
  }

  return list;
}

export function getAllAdditionalChapters(options?: {
  board?: EducationBoard;
  classLevel?: ClassLevel;
  medium?: InstructionMedium;
  subjectId?: string;
  includeUnpublished?: boolean;
  workflowStatus?: AdditionalContentWorkflowStatus;
}): AdditionalChapterRecord[] {
  const overlay = readAdminOverlay();
  const map = new Map<string, AdditionalChapterRecord>();

  for (const base of DEFAULT_ADDITIONAL_CHAPTERS) {
    map.set(base.chapterId, base);
  }
  for (const [id, custom] of Object.entries(overlay.chapterOverrides)) {
    map.set(id, custom);
  }

  const subjectsById = new Map(
    getAllAdditionalSubjects({ includeUnpublished: true }).map((s) => [s.id, s])
  );

  let list = Array.from(map.values());

  if (!options?.includeUnpublished) {
    list = list.filter((ch) => {
      const parentSubject = subjectsById.get(ch.subjectId);
      return ch.workflowStatus === 'PUBLISHED' && (parentSubject ? parentSubject.isPublished : true);
    });
  }
  if (options?.workflowStatus) {
    list = list.filter((ch) => ch.workflowStatus === options.workflowStatus);
  }
  if (options?.subjectId) {
    list = list.filter((ch) => ch.subjectId === options.subjectId);
  }
  if (options?.classLevel) {
    list = list.filter((ch) => ch.classLevel === options.classLevel);
  }
  if (options?.board) {
    list = list.filter((ch) => ch.applicableBoards.includes(options.board!));
  }
  if (options?.medium) {
    list = list.filter((ch) => ch.applicableMediums.includes(options.medium!));
  }

  return list.sort((a, b) => {
    if (a.subjectId !== b.subjectId) return a.subjectId.localeCompare(b.subjectId);
    if (a.classNumber !== b.classNumber) return a.classNumber - b.classNumber;
    return a.chapterNumber - b.chapterNumber;
  });
}

export function getAdditionalChapterById(chapterId: string): AdditionalChapterRecord | null {
  const all = getAllAdditionalChapters({ includeUnpublished: true });
  return all.find((c) => c.chapterId === chapterId) || null;
}

export function resolveAdditionalSubjectForBlockedEntry(
  subjectName: string | null | undefined,
  board?: EducationBoard,
  medium?: InstructionMedium
): AdditionalSubjectDefinition | null {
  const published = getAllAdditionalSubjects({ board, medium, includeUnpublished: false });
  return findAdditionalSubjectForNonStandaloneName(subjectName, published);
}

// ---------- Admin CMS Controls (Safe Local Persistence — Zero Official Curriculum Mutation) ----------

export function upsertAdditionalSubject(subject: AdditionalSubjectDefinition): AdditionalSubjectDefinition {
  const overlay = readAdminOverlay();
  const normalized: AdditionalSubjectDefinition = {
    ...subject,
    applicableBoards: subject.applicableBoards.length ? [...subject.applicableBoards] : [...ALL_ADDITIONAL_BOARDS],
    applicableMediums: subject.applicableMediums.length ? [...subject.applicableMediums] : ['English'],
    classesCovered: subject.classesCovered.length ? [...subject.classesCovered] : [...ALL_ADDITIONAL_CLASSES],
  };
  overlay.subjectOverrides[normalized.id] = normalized;
  writeAdminOverlay(overlay);
  void syncAdditionalSubjectToCloud(normalized).catch(() => {});
  return normalized;
}

export function upsertAdditionalChapter(chapter: AdditionalChapterRecord): AdditionalChapterRecord {
  const overlay = readAdminOverlay();
  const normalized: AdditionalChapterRecord = {
    ...chapter,
    curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  overlay.chapterOverrides[normalized.chapterId] = normalized;
  writeAdminOverlay(overlay);
  void syncAdditionalChapterToCloud(normalized).catch(() => {});
  return normalized;
}

export function setAdditionalChapterWorkflowStatus(
  chapterId: string,
  status: AdditionalContentWorkflowStatus,
  reviewerName = 'MyStudyZone Curriculum Admin'
): AdditionalChapterRecord | null {
  const existing = getAdditionalChapterById(chapterId);
  if (!existing) return null;
  return upsertAdditionalChapter({
    ...existing,
    workflowStatus: status,
    reviewedBy: reviewerName,
    updatedAt: new Date().toISOString().slice(0, 10),
  });
}

export function resetAdditionalCurriculumAdminOverrides(): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.removeItem(ADMIN_OVERRIDES_STORAGE_KEY);
    broadcastAdditionalCurriculumChange('admin_cms');
  } catch {
    // Ignore
  }
}

export function getAdditionalCurriculumCompletionStats(): AdditionalCurriculumCompletionStats {
  const subjects = getAllAdditionalSubjects({ includeUnpublished: true });
  const chapters = getAllAdditionalChapters({ includeUnpublished: true });

  const classesCoveredSet = new Set<string>();
  const bySubject: AdditionalCurriculumCompletionStats['bySubject'] = {};

  for (const subj of subjects) {
    bySubject[subj.id] = {
      subjectId: subj.id,
      subjectName: subj.name,
      totalChapters: 0,
      publishedChapters: 0,
      mcqCount: 0,
      worksheetCount: 0,
      classesCompleted: 0,
    };
  }

  const subjectClassesMap = new Map<string, Set<number>>();
  let publishedChapters = 0;
  let approvedOrPublishedChapters = 0;
  let draftOrReviewChapters = 0;
  let totalWorksheets = 0;
  let totalMcqQuestions = 0;
  let totalShortAnswerQuestions = 0;

  for (const ch of chapters) {
    classesCoveredSet.add(ch.classLevel);
    if (ch.workflowStatus === 'PUBLISHED') publishedChapters += 1;
    if (ch.workflowStatus === 'PUBLISHED' || ch.workflowStatus === 'APPROVED') approvedOrPublishedChapters += 1;
    if (ch.workflowStatus === 'DRAFT' || ch.workflowStatus === 'UNDER_REVIEW') draftOrReviewChapters += 1;

    const mcqLen = ch.materials.mcqQuiz.length;
    const saLen = ch.materials.shortAnswerQuestions.length;
    const hasWs = ch.materials.practiceWorksheet.items.length > 0 ? 1 : 0;

    totalWorksheets += hasWs;
    totalMcqQuestions += mcqLen;
    totalShortAnswerQuestions += saLen;

    if (!bySubject[ch.subjectId]) {
      bySubject[ch.subjectId] = {
        subjectId: ch.subjectId,
        subjectName: ch.subjectId,
        totalChapters: 0,
        publishedChapters: 0,
        mcqCount: 0,
        worksheetCount: 0,
        classesCompleted: 0,
      };
    }
    bySubject[ch.subjectId].totalChapters += 1;
    if (ch.workflowStatus === 'PUBLISHED') bySubject[ch.subjectId].publishedChapters += 1;
    bySubject[ch.subjectId].mcqCount += mcqLen;
    bySubject[ch.subjectId].worksheetCount += hasWs;

    if (!subjectClassesMap.has(ch.subjectId)) {
      subjectClassesMap.set(ch.subjectId, new Set<number>());
    }
    subjectClassesMap.get(ch.subjectId)!.add(ch.classNumber);
  }

  for (const [subjId, classSet] of subjectClassesMap.entries()) {
    if (bySubject[subjId]) {
      bySubject[subjId].classesCompleted = classSet.size;
    }
  }

  return {
    totalSubjects: subjects.length,
    publishedSubjects: subjects.filter((s) => s.isPublished).length,
    totalChapters: chapters.length,
    publishedChapters,
    approvedOrPublishedChapters,
    draftOrReviewChapters,
    totalWorksheets,
    totalMcqQuestions,
    totalShortAnswerQuestions,
    classesCoveredCount: classesCoveredSet.size,
    bySubject,
  };
}

// ---------- Teacher Supplementary Assignment Store ----------

function readTeacherAssignments(): AdditionalTeacherAssignment[] {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(TEACHER_ASSIGNMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AdditionalTeacherAssignment[]) : [];
  } catch {
    return [];
  }
}

function writeTeacherAssignments(items: AdditionalTeacherAssignment[]): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(TEACHER_ASSIGNMENTS_STORAGE_KEY, JSON.stringify(items));
    broadcastAdditionalCurriculumChange('assignments');
  } catch {
    // Ignore
  }
}

export function listTeacherAdditionalAssignments(filters?: {
  board?: EducationBoard;
  classLevel?: ClassLevel;
  medium?: InstructionMedium;
  subjectId?: string;
}): AdditionalTeacherAssignment[] {
  let list = readTeacherAssignments();
  if (filters?.board) list = list.filter((a) => a.board === filters.board);
  if (filters?.classLevel) list = list.filter((a) => a.classLevel === filters.classLevel);
  if (filters?.medium) list = list.filter((a) => a.medium === filters.medium);
  if (filters?.subjectId) list = list.filter((a) => a.subjectId === filters.subjectId);
  return list.sort((a, b) => b.assignedAt.localeCompare(a.assignedAt));
}

export function createTeacherAdditionalAssignment(
  payload: Omit<AdditionalTeacherAssignment, 'assignmentId' | 'assignedAt' | 'status'>
): AdditionalTeacherAssignment {
  const all = readTeacherAssignments();
  const created: AdditionalTeacherAssignment = {
    ...payload,
    assignmentId: `ADD-ASN-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    assignedAt: new Date().toISOString(),
    status: 'ACTIVE',
  };
  writeTeacherAssignments([created, ...all]);
  void syncTeacherAssignmentToCloud(created).catch(() => {});
  return created;
}

export function toggleTeacherAssignmentStatus(assignmentId: string): AdditionalTeacherAssignment[] {
  const all = readTeacherAssignments();
  let updatedItem: AdditionalTeacherAssignment | null = null;
  const next = all.map((item) => {
    if (item.assignmentId !== assignmentId) return item;
    updatedItem = {
      ...item,
      status: (item.status === 'ACTIVE' ? 'COMPLETED' : 'ACTIVE') as 'ACTIVE' | 'COMPLETED',
    };
    return updatedItem;
  });
  writeTeacherAssignments(next);
  if (updatedItem) {
    void syncTeacherAssignmentToCloud(updatedItem).catch(() => {});
  }
  return next;
}

export function deleteTeacherAdditionalAssignment(assignmentId: string): AdditionalTeacherAssignment[] {
  const all = readTeacherAssignments();
  const next = all.filter((item) => item.assignmentId !== assignmentId);
  writeTeacherAssignments(next);
  void deleteTeacherAssignmentFromCloud(assignmentId).catch(() => {});
  return next;
}

// ---------- Separate Student Supplementary Progress Store (Zero Overlap with Official Board Progress) ----------

function readAllStudentProgress(): Record<string, Record<string, AdditionalCurriculumProgressRecord>> {
  if (!hasLocalStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STUDENT_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAllStudentProgress(
  store: Record<string, Record<string, AdditionalCurriculumProgressRecord>>
): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(STUDENT_PROGRESS_STORAGE_KEY, JSON.stringify(store));
    broadcastAdditionalCurriculumChange('progress');
  } catch {
    // Ignore
  }
}

export function getStudentAdditionalProgressMap(
  studentId: string
): Record<string, AdditionalCurriculumProgressRecord> {
  const key = studentId || 'guest-student';
  const store = readAllStudentProgress();
  return store[key] ? { ...store[key] } : {};
}

function updateStudentChapterProgress(
  studentId: string,
  chapter: AdditionalChapterRecord,
  board: EducationBoard,
  medium: InstructionMedium,
  patch: Partial<AdditionalCurriculumProgressRecord>
): AdditionalCurriculumProgressRecord {
  const key = studentId || 'guest-student';
  const store = readAllStudentProgress();
  const studentBucket = store[key] || {};
  const existing: AdditionalCurriculumProgressRecord = studentBucket[chapter.chapterId] || {
    studentId: key,
    chapterId: chapter.chapterId,
    subjectId: chapter.subjectId,
    classLevel: chapter.classLevel,
    board,
    medium,
    notesCompleted: false,
    worksheetCompleted: false,
    quizCompleted: false,
    bestQuizScore: 0,
    quizTotal: chapter.materials.mcqQuiz.length,
    lastUpdatedAt: new Date().toISOString(),
  };

  const merged: AdditionalCurriculumProgressRecord = {
    ...existing,
    ...patch,
    bestQuizScore:
      typeof patch.bestQuizScore === 'number'
        ? Math.max(existing.bestQuizScore, patch.bestQuizScore)
        : existing.bestQuizScore,
    lastUpdatedAt: new Date().toISOString(),
  };

  studentBucket[chapter.chapterId] = merged;
  store[key] = studentBucket;
  writeAllStudentProgress(store);
  void syncStudentAdditionalProgressToCloud(merged).catch(() => {});
  return merged;
}

export function markAdditionalNotesCompleted(
  studentId: string,
  chapter: AdditionalChapterRecord,
  board: EducationBoard,
  medium: InstructionMedium
): AdditionalCurriculumProgressRecord {
  return updateStudentChapterProgress(studentId, chapter, board, medium, { notesCompleted: true });
}

export function markAdditionalWorksheetCompleted(
  studentId: string,
  chapter: AdditionalChapterRecord,
  board: EducationBoard,
  medium: InstructionMedium
): AdditionalCurriculumProgressRecord {
  return updateStudentChapterProgress(studentId, chapter, board, medium, { worksheetCompleted: true });
}

export function recordAdditionalQuizAttempt(
  studentId: string,
  chapter: AdditionalChapterRecord,
  board: EducationBoard,
  medium: InstructionMedium,
  score: number,
  total: number
): AdditionalCurriculumProgressRecord {
  return updateStudentChapterProgress(studentId, chapter, board, medium, {
    quizCompleted: true,
    bestQuizScore: score,
    quizTotal: total,
  });
}

export function getStudentAdditionalProgressSummary(studentId: string): {
  notesCompletedCount: number;
  worksheetsCompletedCount: number;
  quizzesCompletedCount: number;
  averageQuizPercent: number;
  chaptersTouched: number;
} {
  const map = getStudentAdditionalProgressMap(studentId);
  const records = Object.values(map);
  const notesCompletedCount = records.filter((r) => r.notesCompleted).length;
  const worksheetsCompletedCount = records.filter((r) => r.worksheetCompleted).length;
  const completedQuizzes = records.filter((r) => r.quizCompleted && r.quizTotal > 0);
  const averageQuizPercent =
    completedQuizzes.length > 0
      ? Math.round(
          completedQuizzes.reduce((acc, r) => acc + (r.bestQuizScore / r.quizTotal) * 100, 0) /
            completedQuizzes.length
        )
      : 0;

  return {
    notesCompletedCount,
    worksheetsCompletedCount,
    quizzesCompletedCount: completedQuizzes.length,
    averageQuizPercent,
    chaptersTouched: records.length,
  };
}
