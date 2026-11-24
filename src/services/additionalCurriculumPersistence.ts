/**
 * Safe, Strictly Isolated Persistence Coordinator for MY STUDYZONE ADDITIONAL CURRICULUM.
 *
 * Guarantees:
 * - Zero writes to official syllabus collections or core student profile/subscription records.
 * - Immediate, schema-validated local persistence + real-time cross-tab sync via BroadcastChannel & storage events.
 * - Full Admin JSON snapshot backup & validated restore.
 * - Caller-authenticated Cloud Firestore adapter (Firebase Web SDK + Firestore REST v1 fallback) targeting
 *   strictly additive collections:
 *   - `additional_curriculum_subjects`
 *   - `additional_curriculum_chapters`
 *   - `additional_curriculum_assignments`
 *   - `/students/{studentId}/additional_progress/{chapterId}`
 */

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db, firebaseConfig, isFirestoreOfflineError } from '../firebase';
import type { EducationBoard } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalContentWorkflowStatus,
  type AdditionalCurriculumProgressRecord,
  type AdditionalSubjectDefinition,
  type AdditionalTeacherAssignment,
} from '../types/additionalCurriculum';

export const ADDITIONAL_ADMIN_STORAGE_KEY = 'msz_additional_curriculum_admin_v1';
export const ADDITIONAL_ASSIGNMENTS_STORAGE_KEY = 'msz_additional_teacher_assignments_v1';
export const ADDITIONAL_PROGRESS_STORAGE_KEY = 'msz_additional_student_progress_v1';
const SYNC_CHANNEL_NAME = 'msz_additional_curriculum_sync_v1';

/**
 * Enables caller-authenticated Cloud Firestore synchronization for the 4 additive
 * Additional Curriculum paths (`additional_curriculum_subjects`,
 * `additional_curriculum_chapters`, `additional_curriculum_assignments`,
 * `/students/{studentId}/additional_progress/{chapterId}`).
 */
export const ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED = true;

export const ADDITIONAL_FIRESTORE_COLLECTIONS = {
  subjects: 'additional_curriculum_subjects',
  chapters: 'additional_curriculum_chapters',
  assignments: 'additional_curriculum_assignments',
  studentProgressSubcollection: 'additional_progress',
} as const;

const VALID_ID_REGEX = /^[a-zA-Z0-9_\-]+$/;
const VALID_BOARDS: readonly EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
const VALID_MEDIUMS: readonly InstructionMedium[] = ['English', 'Marathi', 'Hindi', 'Semi-English'];
const VALID_WORKFLOW_STATUSES: readonly AdditionalContentWorkflowStatus[] = [
  'DRAFT',
  'UNDER_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'UNPUBLISHED',
];

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

export interface AdditionalCloudHydrationResult {
  hydrated: boolean;
  subjectsSynced: number;
  chaptersSynced: number;
  assignmentsSynced: number;
  progressSynced: number;
  skippedReason?: string;
  errorCode?: string;
}

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

// ---------- Defensive Payload Sanitization & Blueprint Synchronicity ----------

export function sanitizeFirestoreDocId(rawId: string, fallback = 'doc'): string {
  const cleaned = String(rawId || '')
    .trim()
    .replace(/[^a-zA-Z0-9_\-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  const candidate = (cleaned || fallback).slice(0, 128);
  return VALID_ID_REGEX.test(candidate) ? candidate : fallback;
}

function clampString(value: unknown, maxLen: number, fallback = ''): string {
  const str = String(value ?? fallback).trim();
  return (str || fallback).slice(0, maxLen);
}

function stripUndefinedDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function sanitizeBoardsList(boards: unknown): EducationBoard[] {
  if (!Array.isArray(boards)) return ['Maharashtra', 'CBSE', 'ICSE'];
  const clean = boards
    .filter((b): b is EducationBoard => VALID_BOARDS.includes(b as EducationBoard))
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .slice(0, 3);
  return clean.length > 0 ? clean : ['Maharashtra', 'CBSE', 'ICSE'];
}

function sanitizeMediumsList(mediums: unknown): InstructionMedium[] {
  if (!Array.isArray(mediums)) return ['English'];
  const clean = mediums
    .filter((m): m is InstructionMedium => VALID_MEDIUMS.includes(m as InstructionMedium))
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .slice(0, 4);
  return clean.length > 0 ? clean : ['English'];
}

function sanitizeClassesList(classes: unknown): AdditionalSubjectDefinition['classesCovered'] {
  if (!Array.isArray(classes)) return ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const clean = classes
    .map((c) => clampString(c, 20))
    .filter((c) => /^Class ([1-9]|10)$/.test(c))
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .slice(0, 10) as AdditionalSubjectDefinition['classesCovered'];
  return clean.length > 0 ? clean : ['Class 5'];
}

export function sanitizeSubjectPayloadForFirestore(
  subject: AdditionalSubjectDefinition,
  updatedByUid: string
): Record<string, unknown> {
  const id = sanitizeFirestoreDocId(subject.id, 'ADD_SUBJECT');
  const name = clampString(subject.name, 120, 'Supplementary Subject');
  const payload: Record<string, unknown> = {
    id,
    code: clampString(subject.code, 16, 'ADD'),
    name,
    localizedNames: {
      English: clampString(subject.localizedNames?.English || name, 140, name),
      Marathi: clampString(subject.localizedNames?.Marathi || name, 140, name),
      Hindi: clampString(subject.localizedNames?.Hindi || name, 140, name),
    },
    tagline: clampString(subject.tagline, 200),
    description: clampString(subject.description, 600),
    applicableBoards: sanitizeBoardsList(subject.applicableBoards),
    applicableMediums: sanitizeMediumsList(subject.applicableMediums),
    classesCovered: sanitizeClassesList(subject.classesCovered),
    accentColor: clampString(subject.accentColor, 30, 'indigo'),
    isPublished: Boolean(subject.isPublished),
    updatedByUid: sanitizeFirestoreDocId(updatedByUid, 'admin'),
    updatedAt: clampString(subject.updatedAt || new Date().toISOString(), 50, new Date().toISOString()),
  };
  if (typeof subject.isCustom === 'boolean') {
    payload.isCustom = subject.isCustom;
  }
  if (typeof subject.mapsFromNonStandaloneSubject === 'string' && subject.mapsFromNonStandaloneSubject.trim()) {
    payload.mapsFromNonStandaloneSubject = clampString(subject.mapsFromNonStandaloneSubject, 120);
  }
  return stripUndefinedDeep(payload);
}

export function sanitizeChapterPayloadForFirestore(
  chapter: AdditionalChapterRecord,
  updatedByUid: string
): Record<string, unknown> {
  const chapterId = sanitizeFirestoreDocId(chapter.chapterId, 'MSZ_ADD_CHAPTER');
  const subjectId = sanitizeFirestoreDocId(chapter.subjectId, 'ADD_GK');
  const title = clampString(chapter.title, 200, 'Supplementary Chapter');
  const classNumber = Math.min(10, Math.max(1, Math.round(Number(chapter.classNumber) || 5)));
  const chapterNumber = Math.min(100, Math.max(1, Math.round(Number(chapter.chapterNumber) || 1)));
  const workflowStatus: AdditionalContentWorkflowStatus = VALID_WORKFLOW_STATUSES.includes(
    chapter.workflowStatus
  )
    ? chapter.workflowStatus
    : 'DRAFT';

  const objectives = Array.isArray(chapter.learningObjectives)
    ? chapter.learningObjectives.map((o) => clampString(o, 250)).filter(Boolean).slice(0, 20)
    : [];

  const payload: Record<string, unknown> = {
    chapterId,
    subjectId,
    classLevel: clampString(chapter.classLevel, 20, `Class ${classNumber}`),
    classNumber,
    chapterNumber,
    title,
    localizedTitles: {
      English: clampString(chapter.localizedTitles?.English || title, 220, title),
      Marathi: clampString(chapter.localizedTitles?.Marathi || title, 220, title),
      Hindi: clampString(chapter.localizedTitles?.Hindi || title, 220, title),
    },
    applicableBoards: sanitizeBoardsList(chapter.applicableBoards),
    applicableMediums: sanitizeMediumsList(chapter.applicableMediums),
    curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
    workflowStatus,
    updatedAt: clampString(chapter.updatedAt || new Date().toISOString().slice(0, 10), 50, new Date().toISOString().slice(0, 10)),
    learningObjectives: objectives.length > 0 ? objectives : [`Understand ${title}`],
    materials: stripUndefinedDeep(chapter.materials || {}),
    updatedByUid: sanitizeFirestoreDocId(updatedByUid, 'admin'),
  };

  if (typeof chapter.reviewedBy === 'string' && chapter.reviewedBy.trim()) {
    payload.reviewedBy = clampString(chapter.reviewedBy, 120);
  }
  if (typeof chapter.isCustom === 'boolean') {
    payload.isCustom = chapter.isCustom;
  }
  return stripUndefinedDeep(payload);
}

export function sanitizeAssignmentPayloadForFirestore(
  assignment: AdditionalTeacherAssignment,
  callerUid: string
): Record<string, unknown> {
  const assignmentId = sanitizeFirestoreDocId(assignment.assignmentId, `ADD-ASN-${Date.now()}`);
  const board: EducationBoard = VALID_BOARDS.includes(assignment.board) ? assignment.board : 'Maharashtra';
  const medium: InstructionMedium = VALID_MEDIUMS.includes(assignment.medium)
    ? assignment.medium
    : 'English';

  const payload: Record<string, unknown> = {
    assignmentId,
    teacherId: sanitizeFirestoreDocId(assignment.teacherId || callerUid, callerUid),
    teacherUid: sanitizeFirestoreDocId(assignment.teacherUid || callerUid, callerUid),
    teacherName: clampString(assignment.teacherName, 100, 'Class Teacher'),
    board,
    classLevel: clampString(assignment.classLevel, 20, 'Class 5'),
    medium,
    division: clampString(assignment.division, 30, 'A'),
    subjectId: sanitizeFirestoreDocId(assignment.subjectId, 'ADD_GK'),
    chapterId: sanitizeFirestoreDocId(assignment.chapterId, 'MSZ_ADD_CH'),
    chapterTitle: clampString(assignment.chapterTitle, 200, 'Supplementary Chapter'),
    dueDate: clampString(assignment.dueDate, 20, new Date().toISOString().slice(0, 10)),
    teacherNote: String(assignment.teacherNote ?? '').trim().slice(0, 500),
    assignedAt: clampString(assignment.assignedAt || new Date().toISOString(), 50, new Date().toISOString()),
    status: assignment.status === 'COMPLETED' ? 'COMPLETED' : 'ACTIVE',
  };
  if (typeof assignment.updatedAt === 'string' && assignment.updatedAt.trim()) {
    payload.updatedAt = clampString(assignment.updatedAt, 50);
  }
  return stripUndefinedDeep(payload);
}

export function sanitizeProgressPayloadForFirestore(
  record: AdditionalCurriculumProgressRecord
): Record<string, unknown> {
  const quizTotal = Math.min(100, Math.max(0, Math.round(Number(record.quizTotal) || 0)));
  const bestQuizScore = Math.min(quizTotal, Math.max(0, Math.round(Number(record.bestQuizScore) || 0)));
  const board: EducationBoard = VALID_BOARDS.includes(record.board) ? record.board : 'Maharashtra';
  const medium: InstructionMedium = VALID_MEDIUMS.includes(record.medium) ? record.medium : 'English';

  return stripUndefinedDeep({
    studentId: sanitizeFirestoreDocId(record.studentId, 'student'),
    chapterId: sanitizeFirestoreDocId(record.chapterId, 'chapter'),
    subjectId: sanitizeFirestoreDocId(record.subjectId, 'ADD_GK'),
    classLevel: clampString(record.classLevel, 20, 'Class 5'),
    board,
    medium,
    notesCompleted: Boolean(record.notesCompleted),
    worksheetCompleted: Boolean(record.worksheetCompleted),
    quizCompleted: Boolean(record.quizCompleted),
    bestQuizScore,
    quizTotal,
    lastUpdatedAt: clampString(record.lastUpdatedAt || new Date().toISOString(), 50, new Date().toISOString()),
  });
}

// ---------- Caller-Authenticated Firestore REST v1 Read Fallback Helpers ----------

function decodeRestValue(val: Record<string, any> | undefined): any {
  if (!val || typeof val !== 'object') return null;
  if ('nullValue' in val) return null;
  if ('booleanValue' in val) return Boolean(val.booleanValue);
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('timestampValue' in val) return String(val.timestampValue);
  if ('stringValue' in val) return String(val.stringValue);
  if ('arrayValue' in val) {
    const arr = val.arrayValue?.values;
    return Array.isArray(arr) ? arr.map((item: any) => decodeRestValue(item)) : [];
  }
  if ('mapValue' in val) {
    const fields = val.mapValue?.fields;
    if (!fields || typeof fields !== 'object') return {};
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(fields)) {
      out[k] = decodeRestValue(v as Record<string, any>);
    }
    return out;
  }
  return null;
}

function decodeRestDoc(docObj: { fields?: Record<string, any> }): Record<string, any> {
  const out: Record<string, any> = {};
  if (docObj?.fields) {
    for (const [k, v] of Object.entries(docObj.fields)) {
      out[k] = decodeRestValue(v as Record<string, any>);
    }
  }
  return out;
}

async function fetchCollectionViaRestV1<T>(
  collectionPath: string,
  bearerToken: string,
  structuredFilter?: { field: string; value: string | boolean }
): Promise<T[]> {
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
    firebaseConfig.projectId
  )}/databases/${encodeURIComponent(firebaseConfig.firestoreDatabaseId)}/documents`;
  const apiKeyQs = firebaseConfig.apiKey
    ? `?key=${encodeURIComponent(String(firebaseConfig.apiKey))}`
    : '';
  const headers: Record<string, string> = {
    Accept: 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  if (structuredFilter) {
    const segments = collectionPath.split('/').filter(Boolean);
    const parent =
      segments.length > 1 ? `${baseUrl}/${segments.slice(0, -1).join('/')}` : baseUrl;
    const collectionId = segments[segments.length - 1];
    const encodedVal =
      typeof structuredFilter.value === 'boolean'
        ? { booleanValue: structuredFilter.value }
        : { stringValue: structuredFilter.value };
    const res = await fetch(`${parent}:runQuery${apiKeyQs}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId }],
          where: {
            fieldFilter: {
              field: { fieldPath: structuredFilter.field },
              op: 'EQUAL',
              value: encodedVal,
            },
          },
          limit: 500,
        },
      }),
    });
    if (!res.ok) {
      throw new Error(`REST runQuery failed (${res.status})`);
    }
    const rows = (await res.json()) as Array<{ document?: { fields?: Record<string, any> } }>;
    return (Array.isArray(rows) ? rows : [])
      .filter((r) => Boolean(r?.document?.fields))
      .map((r) => decodeRestDoc(r.document!) as T);
  }

  const res = await fetch(
    `${baseUrl}/${collectionPath}?pageSize=500${
      firebaseConfig.apiKey ? `&key=${encodeURIComponent(String(firebaseConfig.apiKey))}` : ''
    }`,
    { method: 'GET', headers }
  );
  if (!res.ok) {
    throw new Error(`REST list failed (${res.status})`);
  }
  const json = (await res.json()) as { documents?: Array<{ fields?: Record<string, any> }> };
  return (Array.isArray(json?.documents) ? json.documents : []).map(
    (d) => decodeRestDoc(d) as T
  );
}

// ---------- Caller-Authenticated Cloud Firestore Sync & Hydration Adapter ----------

export async function syncAdditionalSubjectToCloud(
  subject: AdditionalSubjectDefinition
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const payload = sanitizeSubjectPayloadForFirestore(subject, auth.currentUser.uid);
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.subjects}/${String(payload.id)}`;
  try {
    await setDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.subjects, String(payload.id)), payload);
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function syncAdditionalChapterToCloud(
  chapter: AdditionalChapterRecord
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const payload = sanitizeChapterPayloadForFirestore(chapter, auth.currentUser.uid);
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.chapters}/${String(payload.chapterId)}`;
  try {
    await setDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.chapters, String(payload.chapterId)), payload);
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function syncTeacherAssignmentToCloud(
  assignment: AdditionalTeacherAssignment
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const payload = sanitizeAssignmentPayloadForFirestore(assignment, auth.currentUser.uid);
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.assignments}/${String(payload.assignmentId)}`;
  try {
    await setDoc(
      doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.assignments, String(payload.assignmentId)),
      payload
    );
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function updateTeacherAssignmentStatusInCloud(
  assignmentId: string,
  status: 'ACTIVE' | 'COMPLETED'
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const cleanId = sanitizeFirestoreDocId(assignmentId, '');
  if (!cleanId || !VALID_ID_REGEX.test(cleanId)) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.assignments}/${cleanId}`;
  try {
    await updateDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.assignments, cleanId), {
      status,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.UPDATE, path);
  }
}

export async function deleteTeacherAssignmentFromCloud(assignmentId: string): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  const cleanId = sanitizeFirestoreDocId(assignmentId, '');
  if (!cleanId || !VALID_ID_REGEX.test(cleanId)) return false;
  const path = `${ADDITIONAL_FIRESTORE_COLLECTIONS.assignments}/${cleanId}`;
  try {
    await deleteDoc(doc(db, ADDITIONAL_FIRESTORE_COLLECTIONS.assignments, cleanId));
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.DELETE, path);
  }
}

export async function syncStudentAdditionalProgressToCloud(
  record: AdditionalCurriculumProgressRecord
): Promise<boolean> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return false;
  if (!record.studentId || record.studentId === 'guest-student') return false;
  const payload = sanitizeProgressPayloadForFirestore(record);
  const studentId = String(payload.studentId);
  const chapterId = String(payload.chapterId);
  const path = `students/${studentId}/${ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection}/${chapterId}`;
  try {
    await setDoc(
      doc(
        db,
        'students',
        studentId,
        ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection,
        chapterId
      ),
      payload
    );
    return true;
  } catch (error) {
    if (isFirestoreOfflineError(error)) return false;
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.WRITE, path);
  }
}

export async function fetchCloudAdditionalSubjects(options?: {
  includeUnpublished?: boolean;
}): Promise<AdditionalSubjectDefinition[]> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return [];
  const path = ADDITIONAL_FIRESTORE_COLLECTIONS.subjects;
  const includeUnpublished = Boolean(options?.includeUnpublished);
  try {
    const q = includeUnpublished
      ? collection(db, path)
      : query(collection(db, path), where('isPublished', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdditionalSubjectDefinition);
  } catch (error) {
    if (isFirestoreOfflineError(error)) {
      try {
        const token = await auth.currentUser.getIdToken();
        return await fetchCollectionViaRestV1<AdditionalSubjectDefinition>(
          path,
          token,
          includeUnpublished ? undefined : { field: 'isPublished', value: true }
        );
      } catch {
        return [];
      }
    }
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.LIST, path);
  }
}

export async function fetchCloudAdditionalChapters(options?: {
  includeUnpublished?: boolean;
}): Promise<AdditionalChapterRecord[]> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return [];
  const path = ADDITIONAL_FIRESTORE_COLLECTIONS.chapters;
  const includeUnpublished = Boolean(options?.includeUnpublished);
  try {
    const q = includeUnpublished
      ? collection(db, path)
      : query(collection(db, path), where('workflowStatus', '==', 'PUBLISHED'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdditionalChapterRecord);
  } catch (error) {
    if (isFirestoreOfflineError(error)) {
      try {
        const token = await auth.currentUser.getIdToken();
        return await fetchCollectionViaRestV1<AdditionalChapterRecord>(
          path,
          token,
          includeUnpublished ? undefined : { field: 'workflowStatus', value: 'PUBLISHED' }
        );
      } catch {
        return [];
      }
    }
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.LIST, path);
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
      where('classLevel', '==', classLevel),
      where('status', 'in', ['ACTIVE', 'COMPLETED'])
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdditionalTeacherAssignment);
  } catch (error) {
    if (isFirestoreOfflineError(error)) return [];
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.LIST, path);
  }
}

export async function fetchCloudStudentAdditionalProgress(
  studentId: string
): Promise<AdditionalCurriculumProgressRecord[]> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED || !auth.currentUser) return [];
  const cleanId = sanitizeFirestoreDocId(studentId, '');
  if (!cleanId || cleanId === 'guest-student' || !VALID_ID_REGEX.test(cleanId)) return [];
  const path = `students/${cleanId}/${ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection}`;
  try {
    const snap = await getDocs(
      collection(db, 'students', cleanId, ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection)
    );
    return snap.docs.map((d) => d.data() as AdditionalCurriculumProgressRecord);
  } catch (error) {
    if (isFirestoreOfflineError(error)) {
      try {
        const token = await auth.currentUser.getIdToken();
        return await fetchCollectionViaRestV1<AdditionalCurriculumProgressRecord>(path, token);
      } catch {
        return [];
      }
    }
    handleAdditionalFirestoreError(error, AdditionalFirestoreOperationType.LIST, path);
  }
}

/**
 * Merges cloud Additional Curriculum CMS overrides, class assignments, and isolated student
 * progress into localStorage cleanly without mutating official board syllabi or core student docs.
 */
export async function hydrateAdditionalCurriculumFromCloud(options?: {
  studentId?: string;
  board?: string;
  classLevel?: string;
  isAdminUser?: boolean;
}): Promise<AdditionalCloudHydrationResult> {
  if (!ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED) {
    return {
      hydrated: false,
      subjectsSynced: 0,
      chaptersSynced: 0,
      assignmentsSynced: 0,
      progressSynced: 0,
      skippedReason: 'cloud_sync_disabled',
    };
  }
  if (!auth.currentUser) {
    return {
      hydrated: false,
      subjectsSynced: 0,
      chaptersSynced: 0,
      assignmentsSynced: 0,
      progressSynced: 0,
      skippedReason: 'unauthenticated',
    };
  }

  let subjectsSynced = 0;
  let chaptersSynced = 0;
  let assignmentsSynced = 0;
  let progressSynced = 0;
  let lastErrorCode: string | undefined;

  const isAdminUser = Boolean(options?.isAdminUser);

  // 1. Hydrate CMS Subject & Chapter Overrides
  try {
    const [cloudSubjects, cloudChapters] = await Promise.all([
      fetchCloudAdditionalSubjects({ includeUnpublished: isAdminUser }).catch((err) => {
        lastErrorCode = err instanceof Error ? err.message : String(err);
        return null;
      }),
      fetchCloudAdditionalChapters({ includeUnpublished: isAdminUser }).catch((err) => {
        lastErrorCode = err instanceof Error ? err.message : String(err);
        return null;
      }),
    ]);

    if (hasLocalStorage() && (cloudSubjects || cloudChapters)) {
      let overlay: AdditionalCurriculumAdminOverlay = {
        subjectOverrides: {},
        chapterOverrides: {},
      };
      try {
        const raw = window.localStorage.getItem(ADDITIONAL_ADMIN_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<AdditionalCurriculumAdminOverlay>;
          overlay = {
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
      } catch {
        // fallback empty overlay
      }

      if (Array.isArray(cloudSubjects) && cloudSubjects.length > 0) {
        for (const subj of cloudSubjects) {
          if (subj && typeof subj.id === 'string') {
            overlay.subjectOverrides[subj.id] = subj;
            subjectsSynced += 1;
          }
        }
      }
      if (Array.isArray(cloudChapters) && cloudChapters.length > 0) {
        for (const ch of cloudChapters) {
          if (ch && typeof ch.chapterId === 'string') {
            overlay.chapterOverrides[ch.chapterId] = {
              ...ch,
              curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
            };
            chaptersSynced += 1;
          }
        }
      }
      if (subjectsSynced > 0 || chaptersSynced > 0) {
        window.localStorage.setItem(ADDITIONAL_ADMIN_STORAGE_KEY, JSON.stringify(overlay));
        broadcastAdditionalCurriculumChange('admin_cms');
      }
    }
  } catch (err) {
    lastErrorCode = err instanceof Error ? err.message : String(err);
  }

  // 2. Hydrate Board/Class Supplementary Assignments
  if (options?.board && options?.classLevel && hasLocalStorage()) {
    try {
      const cloudAssignments = await fetchPublishedCloudAssignments(
        options.board,
        options.classLevel
      );
      if (cloudAssignments.length > 0) {
        let localList: AdditionalTeacherAssignment[] = [];
        try {
          const raw = window.localStorage.getItem(ADDITIONAL_ASSIGNMENTS_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) localList = parsed;
          }
        } catch {
          localList = [];
        }
        const mergedMap = new Map<string, AdditionalTeacherAssignment>();
        for (const item of localList) {
          if (item?.assignmentId) mergedMap.set(item.assignmentId, item);
        }
        for (const item of cloudAssignments) {
          if (item?.assignmentId) {
            mergedMap.set(item.assignmentId, item);
            assignmentsSynced += 1;
          }
        }
        window.localStorage.setItem(
          ADDITIONAL_ASSIGNMENTS_STORAGE_KEY,
          JSON.stringify(Array.from(mergedMap.values()))
        );
        broadcastAdditionalCurriculumChange('assignments');
      }
    } catch (err) {
      lastErrorCode = err instanceof Error ? err.message : String(err);
    }
  }

  // 3. Hydrate Monotonic Student Supplementary Progress
  if (options?.studentId && options.studentId !== 'guest-student' && hasLocalStorage()) {
    try {
      const cloudProgress = await fetchCloudStudentAdditionalProgress(options.studentId);
      if (cloudProgress.length > 0) {
        let store: Record<string, Record<string, AdditionalCurriculumProgressRecord>> = {};
        try {
          const raw = window.localStorage.getItem(ADDITIONAL_PROGRESS_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') store = parsed;
          }
        } catch {
          store = {};
        }
        const bucket = { ...(store[options.studentId] || {}) };
        for (const rec of cloudProgress) {
          if (!rec?.chapterId) continue;
          const prev = bucket[rec.chapterId];
          if (!prev) {
            bucket[rec.chapterId] = rec;
          } else {
            bucket[rec.chapterId] = {
              ...prev,
              ...rec,
              notesCompleted: Boolean(prev.notesCompleted || rec.notesCompleted),
              worksheetCompleted: Boolean(prev.worksheetCompleted || rec.worksheetCompleted),
              quizCompleted: Boolean(prev.quizCompleted || rec.quizCompleted),
              bestQuizScore: Math.max(prev.bestQuizScore || 0, rec.bestQuizScore || 0),
              quizTotal: Math.max(prev.quizTotal || 0, rec.quizTotal || 0),
              lastUpdatedAt:
                rec.lastUpdatedAt >= prev.lastUpdatedAt ? rec.lastUpdatedAt : prev.lastUpdatedAt,
            };
          }
          progressSynced += 1;
        }
        store[options.studentId] = bucket;
        window.localStorage.setItem(ADDITIONAL_PROGRESS_STORAGE_KEY, JSON.stringify(store));
        broadcastAdditionalCurriculumChange('progress');
      }
    } catch (err) {
      lastErrorCode = err instanceof Error ? err.message : String(err);
    }
  }

  return {
    hydrated: Boolean(!lastErrorCode || subjectsSynced + chaptersSynced + assignmentsSynced + progressSynced > 0),
    subjectsSynced,
    chaptersSynced,
    assignmentsSynced,
    progressSynced,
    ...(lastErrorCode ? { errorCode: lastErrorCode } : {}),
  };
}
