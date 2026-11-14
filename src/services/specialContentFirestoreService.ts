import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { SectionVisibilityConfig } from '../types';

export type SpecialContentType =
  | 'story'
  | 'shivaji_story'
  | 'scholarship_question'
  | 'drawing_template'
  | 'gk_question'
  | 'learning_program';

export interface SpecialContentDocument<T = Record<string, unknown>> {
  id: string;
  contentType: SpecialContentType;
  title: string;
  published: boolean;
  payload: T;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_SECTION_VISIBILITY: SectionVisibilityConfig = {
  scholarship: { visibleToVisitors: true, visibleToStudents: true },
  drawing: { visibleToVisitors: true, visibleToStudents: true },
  stories: { visibleToVisitors: true, visibleToStudents: true },
  shivaji: { visibleToVisitors: true, visibleToStudents: true },
  gk_cricket: { visibleToVisitors: true, visibleToStudents: true },
  creative_activities: { visibleToVisitors: true, visibleToStudents: true },
  future_skills: { visibleToVisitors: true, visibleToStudents: true },
  all_courses: { visibleToVisitors: true, visibleToStudents: true },
};

function sanitizeFirestoreId(rawId: string): string {
  return String(rawId || `item_${Date.now()}`)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120);
}

function stripUndefinedDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export async function loadPlatformConfigFromFirestore(): Promise<{
  timers?: {
    classes2to3?: number;
    classes4to5?: number;
    classes6to8?: number;
  };
  sectionVisibility?: Partial<SectionVisibilityConfig>;
} | null> {
  const path = 'platform_config/main';
  try {
    const ref = doc(db, 'platform_config', 'main');
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data();
    return {
      timers: data?.timers && typeof data.timers === 'object' ? data.timers : undefined,
      sectionVisibility:
        data?.sectionVisibility && typeof data.sectionVisibility === 'object'
          ? (data.sectionVisibility as Partial<SectionVisibilityConfig>)
          : undefined,
    };
  } catch (error) {
    console.warn('Notice loading platform_config:', error);
    return null;
  }
}

export async function savePlatformConfigToFirestore(config: {
  timers: {
    classes2to3: number;
    classes4to5: number;
    classes6to8: number;
  };
  sectionVisibility: SectionVisibilityConfig;
}): Promise<{ success: boolean }> {
  const path = 'platform_config/main';
  try {
    const ref = doc(db, 'platform_config', 'main');
    const payload = stripUndefinedDeep({
      id: 'main',
      timers: config.timers,
      sectionVisibility: config.sectionVisibility,
      updatedAt: new Date().toISOString(),
    });
    await setDoc(ref, payload, { merge: true });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
}

export async function loadPublishedSpecialContentFromFirestore(
  includeDraftsForAdmin = false
): Promise<SpecialContentDocument[]> {
  const path = 'special_content';
  try {
    const colRef = collection(db, 'special_content');
    const q = includeDraftsForAdmin
      ? query(colRef, limit(500))
      : query(colRef, where('published', '==', true), limit(500));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data() as SpecialContentDocument;
      return {
        ...data,
        id: data.id || d.id,
      };
    });
  } catch (error) {
    console.warn('Notice loading special_content:', error);
    return [];
  }
}

export async function saveSpecialContentItemToFirestore<T extends Record<string, unknown>>(params: {
  id: string;
  contentType: SpecialContentType;
  title: string;
  published: boolean;
  payload: T;
  createdAt?: string;
}): Promise<{ success: boolean }> {
  const safeId = sanitizeFirestoreId(params.id);
  const path = `special_content/${safeId}`;
  try {
    const ref = doc(db, 'special_content', safeId);
    const nowIso = new Date().toISOString();
    const cleanDoc = stripUndefinedDeep({
      id: safeId,
      contentType: params.contentType,
      title: String(params.title || 'Learning Item').slice(0, 195),
      published: Boolean(params.published),
      payload: params.payload,
      createdAt: params.createdAt || nowIso,
      updatedAt: nowIso,
    });
    await setDoc(ref, cleanDoc, { merge: true });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
}

export async function deleteSpecialContentItemFromFirestore(id: string): Promise<{ success: boolean }> {
  const safeId = sanitizeFirestoreId(id);
  const path = `special_content/${safeId}`;
  try {
    const ref = doc(db, 'special_content', safeId);
    await deleteDoc(ref);
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return { success: false };
  }
}
