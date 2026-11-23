/**
 * Safe, Strictly Isolated Persistence Coordinator for MY STUDYZONE ADDITIONAL CURRICULUM.
 *
 * Guarantees:
 * - Zero writes to official syllabus collections or existing student progress records.
 * - Immediate, schema-validated local persistence + real-time cross-tab sync via BroadcastChannel & storage events.
 * - Full Admin JSON snapshot backup & validated restore.
 * - Pre-wired, feature-flagged Cloud Firestore adapter targeting strictly additive collections
 *   (`additional_curriculum_subjects`, `additional_curriculum_chapters`, `additional_curriculum_assignments`,
 *   `/students/{studentId}/additional_progress/{chapterId}`), disabled until approved additive rules are deployed.
 */

import { doc, getDocs, collection, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalCurriculumProgressRecord,
  type AdditionalSubjectDefinition,
  type AdditionalTeacherAssignment,
} from '../types/additionalCurriculum';

export const ADDITIONAL_ADMIN_STORAGE_KEY = 'msz_additional_curriculum_admin_v1';
export const ADDITIONAL_ASSIGNMENTS_STORAGE_KEY = 'msz_additional_teacher_assignments_v1';
export const ADDITIONAL_PROGRESS_STORAGE_KEY = 'msz_additional_student_progress_v1';
const SYNC_CHANNEL_NAME = 'msz_additional_curriculum_sync_v1';

/**
 * Safety Feature Flag:
 * Keep `false` until the additive Firestore rules in
 * `scripts/staging/additional_curriculum_firestore_rules_proposal.rules`
 * are reviewed and approved for deployment.
 */
export const ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED = false;

export const ADDITIONAL_FIRESTORE_COLLECTIONS = {
  subjects: 'additional_curriculum_subjects',
  chapters: 'additional_curriculum_chapters',
  assignments: 'additional_curriculum_assignments',
  studentProgressSubcollection: 'additional_progress',
} as const;

export enum AdditionalFirestoreOperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface AdditionalFirestoreErrorInfo {
  error: string;
  operationType: AdditionalFirestoreOperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleAdditionalFirestoreError(
  error: unknown,
  operationType: AdditionalFirestoreOperationType,
  path: string | null
): never {
  const errInfo: AdditionalFirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Additional Curriculum Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface AdditionalCurriculumAdminOverlay {
  subjectOverrides: Record<string, AdditionalSubjectDefinition>;
  chapterOverrides: Record<string, AdditionalChapterRecord>;
}

export interface AdditionalCurriculumPersistenceSnapshot {
  schemaVersion: 1;
  curriculumLabel: typeof ADDITIONAL_CURRICULUM_LABEL;
  exportedAt: string;
  adminOverlay: AdditionalCurriculumAdminOverlay;
  teacherAssignments: AdditionalTeacherAssignment[];
}

export type AdditionalSyncScope = 'admin_cms' | 'assignments' | 'progress' | 'all';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function hasLocalStorage(): boolean {
  try {
    return hasWindow() && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

let sharedChannel: BroadcastChannel | null = null;
function getSyncChannel(): BroadcastChannel | null {
  if (!hasWindow() || typeof window.BroadcastChannel === 'undefined') return null;
  if (!sharedChannel) {
    try {
      sharedChannel = new window.BroadcastChannel(SYNC_CHANNEL_NAME);
    } catch {
      return null;
    }
  }
  return sharedChannel;
}

export function broadcastAdditionalCurriculumChange(scope: AdditionalSyncScope): void {
  if (!hasWindow()) return;
  try {
    window.dispatchEvent(new CustomEvent('msz-additional-curriculum-change', { detail: { scope } }));
  } catch {
    // Ignore custom event errors
  }
  const channel = getSyncChannel();
  if (channel) {
    try {
      channel.postMessage({ scope, timestamp: Date.now() });
    } catch {
      // Ignore postMessage errors
    }
  }
}

export function subscribeAdditionalCurriculumChanges(
  onChange: (scope: AdditionalSyncScope) => void
): () => void {
  if (!hasWindow()) return () => {};

  const handleLocalEvent = (event: Event) => {
    const custom = event as CustomEvent<{ scope?: AdditionalSyncScope }>;
    onChange(custom.detail?.scope || 'all');
  };

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === ADDITIONAL_ADMIN_STORAGE_KEY) {
      onChange('admin_cms');
    } else if (event.key === ADDITIONAL_ASSIGNMENTS_STORAGE_KEY) {
      onChange('assignments');
    } else if (event.key === ADDITIONAL_PROGRESS_STORAGE_KEY) {
      onChange('progress');
    }
  };

  window.addEventListener('msz-additional-curriculum-change', handleLocalEvent);
  window.addEventListener('storage', handleStorageEvent);

  const channel = getSyncChannel();
  const handleChannelMessage = (event: MessageEvent<{ scope?: AdditionalSyncScope }>) => {
    onChange(event.data?.scope || 'all');
  };
  if (channel) {
    channel.addEventListener('message', handleChannelMessage);
  }

  return () => {
    window.removeEventListener('msz-additional-curriculum-change', handleLocalEvent);
    window.removeEventListener('storage', handleStorageEvent);
    if (channel) {
      channel.removeEventListener('message', handleChannelMessage);
    }
  };
}

export function getAdditionalCurriculumStorageStatus(): {
  mode: 'isolated_local_plus_cross_tab' | 'cloud_firestore_sync';
  cloudSyncEnabled: boolean;
  customSubjectsCount: number;
  customChaptersCount: number;
  teacherAssignmentsCount: number;
  studentsTrackedCount: number;
} {
  if (!hasLocalStorage()) {
    return {
      mode: ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED
        ? 'cloud_firestore_sync'
        : 'isolated_local_plus_cross_tab',
      cloudSyncEnabled: ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED,
      customSubjectsCount: 0,
      customChaptersCount: 0,
      teacherAssignmentsCount: 0,
      studentsTrackedCount: 0,
    };
  }

  let customSubjectsCount = 0;
  let customChaptersCount = 0;
  let teacherAssignmentsCount = 0;
  let studentsTrackedCount = 0;

  try {
    const adminRaw = window.localStorage.getItem(ADDITIONAL_ADMIN_STORAGE_KEY);
    if (adminRaw) {
      const parsed = JSON.parse(adminRaw) as Partial<AdditionalCurriculumAdminOverlay>;
      customSubjectsCount = Object.keys(parsed.subjectOverrides || {}).length;
      customChaptersCount = Object.keys(parsed.chapterOverrides || {}).length;
    }
    const asnRaw = window.localStorage.getItem(ADDITIONAL_ASSIGNMENTS_STORAGE_KEY);
    if (asnRaw) {
      const parsed = JSON.parse(asnRaw);
      teacherAssignmentsCount = Array.isArray(parsed) ? parsed.length : 0;
    }
    const progRaw = window.localStorage.getItem(ADDITIONAL_PROGRESS_STORAGE_KEY);
    if (progRaw) {
      const parsed = JSON.parse(progRaw);
      studentsTrackedCount = parsed && typeof parsed === 'object' ? Object.keys(parsed).length : 0;
    }
  } catch {
    // Ignore malformed local state
  }

  return {
    mode: ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED
      ? 'cloud_firestore_sync'
      : 'isolated_local_plus_cross_tab',
    cloudSyncEnabled: ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED,
    customSubjectsCount,
    customChaptersCount,
    teacherAssignmentsCount,
    studentsTrackedCount,
  };
}

export function exportAdditionalCurriculumSnapshot(): AdditionalCurriculumPersistenceSnapshot {
  let adminOverlay: AdditionalCurriculumAdminOverlay = {
    subjectOverrides: {},
    chapterOverrides: {},
  };
  let teacherAssignments: AdditionalTeacherAssignment[] = [];

  if (hasLocalStorage()) {
    try {
      const adminRaw = window.localStorage.getItem(ADDITIONAL_ADMIN_STORAGE_KEY);
      if (adminRaw) {
        const parsed = JSON.parse(adminRaw) as Partial<AdditionalCurriculumAdminOverlay>;
        adminOverlay = {
          subjectOverrides:
            parsed.subjectOverrides && typeof parsed.subjectOverrides === 'object'
              ? parsed.subjectOverrides
              : {},
          chapterOverrides:
            parsed.chapterOverrides && typeof parsed.chapterOverrides === 'object'
              ? parsed.chapterOverrides
              : {},
        };
      }
      const asnRaw = window.localStorage.getItem(ADDITIONAL_ASSIGNMENTS_STORAGE_KEY);
      if (asnRaw) {
        const parsed = JSON.parse(asnRaw);
        if (Array.isArray(parsed)) {
          teacherAssignments = parsed as AdditionalTeacherAssignment[];
        }
      }
    } catch {
      // Fallback to empty defaults
    }
  }

  return {
    schemaVersion: 1,
    curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
    exportedAt: new Date().toISOString(),
    adminOverlay,
    teacherAssignments,
  };
}

export function importAdditionalCurriculumSnapshot(rawJson: string): {
  success: boolean;
  message: string;
} {
  if (!hasLocalStorage()) {
    return { success: false, message: 'Browser storage is unavailable.' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { success: false, message: 'Invalid JSON file. Please select a valid backup export.' };
  }

  if (!parsed || typeof parsed !== 'object') {
    return { success: false, message: 'Backup payload must be a JSON object.' };
  }

  const candidate = parsed as Partial<AdditionalCurriculumPersistenceSnapshot>;
  if (candidate.schemaVersion !== 1 || candidate.curriculumLabel !== ADDITIONAL_CURRICULUM_LABEL) {
    return {
      success: false,
      message: `Unrecognized backup schema. Expected schemaVersion 1 for ${ADDITIONAL_CURRICULUM_LABEL}.`,
    };
  }

  const safeSubjectOverrides: Record<string, AdditionalSubjectDefinition> = {};
  if (candidate.adminOverlay?.subjectOverrides && typeof candidate.adminOverlay.subjectOverrides === 'object') {
    for (const [id, subj] of Object.entries(candidate.adminOverlay.subjectOverrides)) {
      if (subj && typeof subj === 'object' && typeof subj.id === 'string' && typeof subj.name === 'string') {
        safeSubjectOverrides[id] = subj;
      }
    }
  }

  const safeChapterOverrides: Record<string, AdditionalChapterRecord> = {};
  if (candidate.adminOverlay?.chapterOverrides && typeof candidate.adminOverlay.chapterOverrides === 'object') {
    for (const [id, ch] of Object.entries(candidate.adminOverlay.chapterOverrides)) {
      if (ch && typeof ch === 'object' && typeof ch.chapterId === 'string' && typeof ch.title === 'string') {
        safeChapterOverrides[id] = {
          ...ch,
          curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
        };
      }
    }
  }

  const safeAssignments: AdditionalTeacherAssignment[] = Array.isArray(candidate.teacherAssignments)
    ? candidate.teacherAssignments.filter(
        (a): a is AdditionalTeacherAssignment =>
          Boolean(a) &&
          typeof a.assignmentId === 'string' &&
          typeof a.chapterId === 'string' &&
          typeof a.board === 'string'
      )
    : [];

  try {
    window.localStorage.setItem(
      ADDITIONAL_ADMIN_STORAGE_KEY,
      JSON.stringify({
        subjectOverrides: safeSubjectOverrides,
        chapterOverrides: safeChapterOverrides,
      })
    );
    window.localStorage.setItem(ADDITIONAL_ASSIGNMENTS_STORAGE_KEY, JSON.stringify(safeAssignments));
    broadcastAdditionalCurriculumChange('all');
  } catch {
    return { success: false, message: 'Failed to write backup to browser storage.' };
  }

  return {
    success: true,
    message: `Imported ${Object.keys(safeSubjectOverrides).length} subject override(s), ${Object.keys(safeChapterOverrides).length} chapter draft/override(s), and ${safeAssignments.length} teacher assignment(s).`,
  };
}

// ---------- Pre-Wired Additive Cloud Firestore Adapter (Inactive until rules are approved & deployed) ----------

export async function syncAdditionalSubjectToCloud(
  subject: AdditionalSubjectDefinition
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.subjects}/${subject.id}`;
  try {
    await setDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.subjects, subject.id), {
      ...subject,
      updatedByUid: auth.currentUser.uid,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function syncAdditionalChapterToCloud(
  chapter: AdditionalChapterRecord
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.chapters}/${chapter.chapterId}`;
  try {
    await setDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.chapters, chapter.chapterId), {
      ...chapter,
      curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
      updatedByUid: auth.currentUser.uid,
    });
    return true;
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function syncTeacherAssignmentToCloud(
  assignment: AdditionalTeacherAssignment
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.assignments}/${assignment.assignmentId}`;
  try {
    await setDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.assignments, assignment.assignmentId), {
      ...assignment,
      teacherUid: auth.currentUser.uid,
    });
    return true;
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function deleteTeacherAssignmentFromCloud(assignmentId: string): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.assignments}/${assignmentId}`;
  try {
    await deleteDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.assignments, assignmentId));
    return true;
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.DELETE, path);
  }
}

export async function syncStudentAdditionalProgressToCloud(
  record: AdditionalCurriculumProgressRecord
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const path = `students/${record.studentId}/${ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection}/${record.chapterId}`;
  try {
    await setDoc(
      doc(
        db,
        'students',
        record.studentId,
        ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection,
        record.chapterId
      ),
      record
    );
    return true;
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function fetchPublishedCloudAssignments(
  board: string,
  classLevel: string
): Promise<AdditionalTeacherAssignment[]> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return [];
  const path = ADDITIONAL_FIRESTORE_COLLECTIONS.assignments;
  try {
    const q = query(
      collection(db, path),
      where('board', '==', board),
      where('classLevel', '==', classLevel)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdditionalTeacherAssignment);
  } catch (error) {
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.LIST, path);
  }
}
