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

const PLATFORM_CFG_CACHE_KEY = 'vc_cache_platform_cfg_v1';
const SPECIAL_CONTENT_CACHE_KEY = 'vc_cache_special_content_v1';
const CACHE_TTL_MS = 120_000; // 2 minutes safe cache TTL

let memPlatformConfigCache: {
  ts: number;
  data: {
    timers?: { classes2to3?: number; classes4to5?: number; classes6to8?: number };
    sectionVisibility?: Partial<SectionVisibilityConfig>;
  } | null;
} | null = null;
let inFlightPlatformConfig: Promise<{
  timers?: { classes2to3?: number; classes4to5?: number; classes6to8?: number };
  sectionVisibility?: Partial<SectionVisibilityConfig>;
} | null> | null = null;

let memSpecialContentCache: {
  ts: number;
  includeDrafts: boolean;
  data: SpecialContentDocument[];
} | null = null;
let inFlightSpecialContent: Promise<SpecialContentDocument[]> | null = null;

function invalidateSpecialContentCache(): void {
  memSpecialContentCache = null;
  inFlightSpecialContent = null;
  try {
    sessionStorage.removeItem(SPECIAL_CONTENT_CACHE_KEY);
  } catch {
    // ignore storage errors
  }
}

export async function loadPlatformConfigFromFirestore(): Promise<{
  timers?: {
    classes2to3?: number;
    classes4to5?: number;
    classes6to8?: number;
  };
  sectionVisibility?: Partial<SectionVisibilityConfig>;
} | null> {
  const now = Date.now();
  if (memPlatformConfigCache && now - memPlatformConfigCache.ts < CACHE_TTL_MS) {
    return memPlatformConfigCache.data;
  }

  try {
    const raw = sessionStorage.getItem(PLATFORM_CFG_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.ts === 'number' && now - parsed.ts < CACHE_TTL_MS) {
        memPlatformConfigCache = parsed;
        return parsed.data;
      }
    }
  } catch {
    // ignore storage errors
  }

  if (inFlightPlatformConfig) {
    return inFlightPlatformConfig;
  }

  inFlightPlatformConfig = (async () => {
    try {
      const ref = doc(db, 'platform_config', 'main');
      const snap = await getDoc(ref);
      const result = !snap.exists()
        ? null
        : {
            timers:
              snap.data()?.timers && typeof snap.data()?.timers === 'object'
                ? snap.data()?.timers
                : undefined,
            sectionVisibility:
              snap.data()?.sectionVisibility && typeof snap.data()?.sectionVisibility === 'object'
                ? (snap.data()?.sectionVisibility as Partial<SectionVisibilityConfig>)
                : undefined,
          };
      const entry = { ts: Date.now(), data: result };
      memPlatformConfigCache = entry;
      try {
        sessionStorage.setItem(PLATFORM_CFG_CACHE_KEY, JSON.stringify(entry));
      } catch {
        // ignore storage errors
      }
      return result;
    } catch (error) {
      console.warn('Notice loading platform_config:', error);
      return null;
    } finally {
      inFlightPlatformConfig = null;
    }
  })();

  return inFlightPlatformConfig;
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
    const entry = {
      ts: Date.now(),
      data: { timers: config.timers, sectionVisibility: config.sectionVisibility },
    };
    memPlatformConfigCache = entry;
    try {
      sessionStorage.setItem(PLATFORM_CFG_CACHE_KEY, JSON.stringify(entry));
    } catch {
      // ignore
    }
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
}

export async function loadPublishedSpecialContentFromFirestore(
  includeDraftsForAdmin = false
): Promise<SpecialContentDocument[]> {
  const now = Date.now();
  if (
    memSpecialContentCache &&
    memSpecialContentCache.includeDrafts === includeDraftsForAdmin &&
    now - memSpecialContentCache.ts < CACHE_TTL_MS
  ) {
    return memSpecialContentCache.data;
  }

  if (!includeDraftsForAdmin) {
    try {
      const raw = sessionStorage.getItem(SPECIAL_CONTENT_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.ts === 'number' &&
          now - parsed.ts < CACHE_TTL_MS &&
          Array.isArray(parsed.data)
        ) {
          memSpecialContentCache = { ts: parsed.ts, includeDrafts: false, data: parsed.data };
          return parsed.data;
        }
      }
    } catch {
      // ignore
    }
  }

  if (inFlightSpecialContent) {
    return inFlightSpecialContent;
  }

  inFlightSpecialContent = (async () => {
    try {
      const colRef = collection(db, 'special_content');
      const q = includeDraftsForAdmin
        ? query(colRef, limit(500))
        : query(colRef, where('published', '==', true), limit(500));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => {
        const data = d.data() as SpecialContentDocument;
        return {
          ...data,
          id: data.id || d.id,
        };
      });
      memSpecialContentCache = {
        ts: Date.now(),
        includeDrafts: includeDraftsForAdmin,
        data: docs,
      };
      if (!includeDraftsForAdmin) {
        try {
          sessionStorage.setItem(
            SPECIAL_CONTENT_CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data: docs })
          );
        } catch {
          // ignore
        }
      }
      return docs;
    } catch (error) {
      console.warn('Notice loading special_content:', error);
      return [];
    } finally {
      inFlightSpecialContent = null;
    }
  })();

  return inFlightSpecialContent;
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
    invalidateSpecialContentCache();
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
    invalidateSpecialContentCache();
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return { success: false };
  }
}
