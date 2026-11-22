import { ClassLevel, EducationBoard, SubjectName } from '../types';

/**
 * Zero-Firestore-Write Local Store for the Free Study Material Library
 * Stores student Bookmarks, Recently Viewed Study Materials, and Revision Checklists
 * 100% locally in `localStorage` so daily student interactions generate 0 Firestore reads or writes.
 */

export interface StudyLibraryBookmarkItem {
  id: string;
  title: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName | string;
  category: string;
  chapterNumber?: number;
  savedAt: string;
}

export interface StudyLibraryRecentItem {
  id: string;
  title: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName | string;
  category: string;
  chapterNumber?: number;
  viewedAt: string;
}

const BOOKMARKS_KEY = 'msz_study_library_bookmarks_v1';
const RECENT_KEY = 'msz_study_library_recent_v1';
const CHECKLIST_KEY = 'msz_study_library_checklist_v1';
const MAX_RECENT_ITEMS = 25;

function readStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export function getStudyLibraryBookmarks(): StudyLibraryBookmarkItem[] {
  const list = readStorage<StudyLibraryBookmarkItem[]>(BOOKMARKS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function isStudyLibraryItemBookmarked(id: string): boolean {
  return getStudyLibraryBookmarks().some((item) => item.id === id);
}

export function toggleStudyLibraryBookmark(
  item: Omit<StudyLibraryBookmarkItem, 'savedAt'>
): { bookmarked: boolean; bookmarks: StudyLibraryBookmarkItem[] } {
  const current = getStudyLibraryBookmarks();
  const exists = current.some((b) => b.id === item.id);
  const updated = exists
    ? current.filter((b) => b.id !== item.id)
    : [{ ...item, savedAt: new Date().toISOString() }, ...current].slice(0, 150);
  writeStorage(BOOKMARKS_KEY, updated);
  return { bookmarked: !exists, bookmarks: updated };
}

export function getStudyLibraryRecentItems(): StudyLibraryRecentItem[] {
  const list = readStorage<StudyLibraryRecentItem[]>(RECENT_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function recordStudyLibraryRecentView(
  item: Omit<StudyLibraryRecentItem, 'viewedAt'>
): StudyLibraryRecentItem[] {
  const current = getStudyLibraryRecentItems().filter((r) => r.id !== item.id);
  const updated = [
    { ...item, viewedAt: new Date().toISOString() },
    ...current,
  ].slice(0, MAX_RECENT_ITEMS);
  writeStorage(RECENT_KEY, updated);
  return updated;
}

export function getStudyLibraryChecklistState(): Record<string, boolean> {
  const map = readStorage<Record<string, boolean>>(CHECKLIST_KEY, {});
  return map && typeof map === 'object' ? map : {};
}

export function toggleStudyLibraryChecklistItem(
  itemKey: string
): Record<string, boolean> {
  const current = getStudyLibraryChecklistState();
  const updated = {
    ...current,
    [itemKey]: !current[itemKey],
  };
  writeStorage(CHECKLIST_KEY, updated);
  return updated;
}

export interface ChapterTestLocalResult {
  testId: string;
  bestScore: number;
  totalQuestions: number;
  attempts: number;
  lastAttemptAt: string;
}

const CHAPTER_TESTS_KEY = 'msz_study_library_chapter_tests_v1';

export function getChapterTestLocalResults(): Record<string, ChapterTestLocalResult> {
  const map = readStorage<Record<string, ChapterTestLocalResult>>(CHAPTER_TESTS_KEY, {});
  return map && typeof map === 'object' ? map : {};
}

export function saveChapterTestLocalResult(
  testId: string,
  score: number,
  totalQuestions: number
): Record<string, ChapterTestLocalResult> {
  const current = getChapterTestLocalResults();
  const prev = current[testId];
  const updated: Record<string, ChapterTestLocalResult> = {
    ...current,
    [testId]: {
      testId,
      bestScore: prev ? Math.max(prev.bestScore, score) : score,
      totalQuestions,
      attempts: (prev?.attempts || 0) + 1,
      lastAttemptAt: new Date().toISOString(),
    },
  };
  writeStorage(CHAPTER_TESTS_KEY, updated);
  return updated;
}
