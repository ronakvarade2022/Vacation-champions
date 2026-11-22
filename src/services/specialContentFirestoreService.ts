import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  ensureFirestoreOnline,
  firebaseConfig,
  handleFirestoreError,
  isFirestoreOfflineError,
  OperationType,
  reportFirestoreConnectionStatus,
} from './firebase';
import { ClassLevel, EducationBoard, SectionVisibilityConfig, SubjectName } from '../types';

export type SpecialContentType =
  | 'story'
  | 'shivaji_story'
  | 'scholarship_question'
  | 'drawing_template'
  | 'gk_question'
  | 'learning_program'
  | 'study_material_item';

export interface SpecialContentDocument<T = Record<string, unknown>> {
  id: string;
  contentType: SpecialContentType;
  title: string;
  published: boolean;
  board?: EducationBoard;
  classLevel?: ClassLevel;
  subject?: SubjectName | string;
  materialCategory?: string;
  payload: T;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlatformConfigData {
  timers?: {
    classes2to3?: number;
    classes4to5?: number;
    classes6to8?: number;
  };
  sectionVisibility?: Partial<SectionVisibilityConfig>;
  studyLibraryVersion?: number;
}

export interface PlatformConfigLoadResult {
  config: PlatformConfigData | null;
  status: 'loaded' | 'missing_doc_using_defaults' | 'cached_offline' | 'error';
  fromCache: boolean;
  docExists: boolean | null;
  errorMessage?: string;
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
const PLATFORM_CFG_PERSISTENT_KEY = 'vc_cache_platform_cfg_persistent_v1';
const SPECIAL_CONTENT_CACHE_KEY = 'vc_cache_special_content_v1';
const SPECIAL_CONTENT_PERSISTENT_KEY = 'vc_cache_special_content_persistent_v1';
const CACHE_TTL_MS = 120_000; // 2 minutes safe cache TTL

let memPlatformConfigCache: {
  ts: number;
  data: PlatformConfigData | null;
  docExists?: boolean | null;
} | null = null;
let inFlightPlatformConfig: Promise<PlatformConfigLoadResult> | null = null;

let memSpecialContentCache: {
  ts: number;
  includeDrafts: boolean;
  data: SpecialContentDocument[];
} | null = null;
let inFlightSpecialContent: Promise<SpecialContentDocument[]> | null = null;

function readCachedJson<T>(storage: Storage | undefined, key: string): T | null {
  try {
    if (!storage) return null;
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeCachedJson(storage: Storage | undefined, key: string, value: unknown): void {
  try {
    if (!storage) return;
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / restricted storage errors
  }
}

function extractPlatformConfigFields(rawData: Record<string, any> | undefined): PlatformConfigData {
  return {
    timers:
      rawData?.timers && typeof rawData.timers === 'object'
        ? rawData.timers
        : undefined,
    sectionVisibility:
      rawData?.sectionVisibility && typeof rawData.sectionVisibility === 'object'
        ? (rawData.sectionVisibility as Partial<SectionVisibilityConfig>)
        : undefined,
    studyLibraryVersion:
      typeof rawData?.studyLibraryVersion === 'number' && Number.isFinite(rawData.studyLibraryVersion)
        ? rawData.studyLibraryVersion
        : undefined,
  };
}

function decodeFirestoreRestValue(val: any): any {
  if (!val || typeof val !== 'object') return undefined;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('booleanValue' in val) return Boolean(val.booleanValue);
  if ('nullValue' in val) return null;
  if ('timestampValue' in val) return val.timestampValue;
  if ('arrayValue' in val) {
    const arr = Array.isArray(val.arrayValue?.values) ? val.arrayValue.values : [];
    return arr.map((item: any) => decodeFirestoreRestValue(item));
  }
  if ('mapValue' in val) {
    const out: Record<string, any> = {};
    const fields = val.mapValue?.fields || {};
    for (const [k, v] of Object.entries(fields)) {
      out[k] = decodeFirestoreRestValue(v);
    }
    return out;
  }
  return undefined;
}

async function fetchPlatformConfigViaRest(): Promise<{
  ok: boolean;
  docExists: boolean | null;
  data: PlatformConfigData | null;
  error?: string;
}> {
  if (typeof fetch === 'undefined') {
    return { ok: false, docExists: null, data: null };
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      firebaseConfig.projectId
    )}/databases/${encodeURIComponent(
      firebaseConfig.firestoreDatabaseId
    )}/documents/platform_config/main?key=${encodeURIComponent(firebaseConfig.apiKey)}`;
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller?.signal,
    });
    if (res.status === 404) {
      return { ok: true, docExists: false, data: null };
    }
    if (!res.ok) {
      return { ok: false, docExists: null, data: null, error: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as { fields?: Record<string, any> };
    const decoded: Record<string, any> = {};
    for (const [k, v] of Object.entries(json.fields || {})) {
      decoded[k] = decodeFirestoreRestValue(v);
    }
    return {
      ok: true,
      docExists: true,
      data: extractPlatformConfigFields(decoded),
    };
  } catch (err) {
    return {
      ok: false,
      docExists: null,
      data: null,
      error: err instanceof Error ? err.message : 'REST fetch error',
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function getFallbackPlatformConfig(): PlatformConfigData | null {
  if (memPlatformConfigCache?.data) return memPlatformConfigCache.data;
  const sess = readCachedJson<{ data?: PlatformConfigData | null }>(
    typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
    PLATFORM_CFG_CACHE_KEY
  );
  if (sess?.data) return sess.data;
  const persistent = readCachedJson<{ data?: PlatformConfigData | null }>(
    typeof localStorage !== 'undefined' ? localStorage : undefined,
    PLATFORM_CFG_PERSISTENT_KEY
  );
  return persistent?.data || null;
}

function persistPlatformConfigCache(
  data: PlatformConfigData | null,
  docExists: boolean | null
): void {
  const entry = { ts: Date.now(), data, docExists };
  memPlatformConfigCache = entry;
  writeCachedJson(
    typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
    PLATFORM_CFG_CACHE_KEY,
    entry
  );
  if (data) {
    writeCachedJson(
      typeof localStorage !== 'undefined' ? localStorage : undefined,
      PLATFORM_CFG_PERSISTENT_KEY,
      entry
    );
  }
}

function invalidateSpecialContentCache(): void {
  memSpecialContentCache = null;
  inFlightSpecialContent = null;
  try {
    sessionStorage.removeItem(SPECIAL_CONTENT_CACHE_KEY);
  } catch {
    // ignore storage errors
  }
}

export async function loadPlatformConfigDetailed(options?: {
  forceRefresh?: boolean;
}): Promise<PlatformConfigLoadResult> {
  const now = Date.now();
  const forceRefresh = Boolean(options?.forceRefresh);

  if (!forceRefresh && memPlatformConfigCache && now - memPlatformConfigCache.ts < CACHE_TTL_MS) {
    return {
      config: memPlatformConfigCache.data,
      status:
        memPlatformConfigCache.docExists === false
          ? 'missing_doc_using_defaults'
          : 'loaded',
      fromCache: true,
      docExists: memPlatformConfigCache.docExists ?? null,
    };
  }

  if (!forceRefresh) {
    const sess = readCachedJson<{
      ts: number;
      data: PlatformConfigData | null;
      docExists?: boolean | null;
    }>(
      typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
      PLATFORM_CFG_CACHE_KEY
    );
    if (sess && typeof sess.ts === 'number' && now - sess.ts < CACHE_TTL_MS) {
      memPlatformConfigCache = sess;
      return {
        config: sess.data,
        status: sess.docExists === false ? 'missing_doc_using_defaults' : 'loaded',
        fromCache: true,
        docExists: sess.docExists ?? null,
      };
    }
  }

  if (inFlightPlatformConfig && !forceRefresh) {
    return inFlightPlatformConfig;
  }

  inFlightPlatformConfig = (async (): Promise<PlatformConfigLoadResult> => {
    const ref = doc(db, 'platform_config', 'main');
    const browserOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;

    if (browserOnline) {
      let lastErr: unknown = null;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await ensureFirestoreOnline();
          const snap = await (attempt === 0 && !forceRefresh ? getDoc(ref) : getDocFromServer(ref));
          const exists = snap.exists();
          const result = exists ? extractPlatformConfigFields(snap.data()) : null;
          persistPlatformConfigCache(result, exists);
          reportFirestoreConnectionStatus({
            status: 'connected',
            isOnline: true,
            lastCheckedAt: Date.now(),
            lastConnectedAt: Date.now(),
            lastError: null,
            configDocExists: exists,
            retryCount: 0,
          });
          return {
            config: result,
            status: exists ? 'loaded' : 'missing_doc_using_defaults',
            fromCache: false,
            docExists: exists,
          };
        } catch (err) {
          lastErr = err;
          if (attempt === 0 && isFirestoreOfflineError(err)) {
            await new Promise((r) => setTimeout(r, 450));
          } else if (!isFirestoreOfflineError(err)) {
            break;
          }
        }
      }

      // If WebChannel/long-polling hit an offline error while browser has internet, use REST API fallback cleanly
      const restResult = await fetchPlatformConfigViaRest();
      if (restResult.ok) {
        persistPlatformConfigCache(restResult.data, restResult.docExists);
        reportFirestoreConnectionStatus({
          status: 'connected',
          isOnline: true,
          lastCheckedAt: Date.now(),
          lastConnectedAt: Date.now(),
          lastError: null,
          configDocExists: restResult.docExists,
          retryCount: 0,
        });
        return {
          config: restResult.data,
          status: restResult.docExists ? 'loaded' : 'missing_doc_using_defaults',
          fromCache: false,
          docExists: restResult.docExists,
        };
      }

      // Genuine connectivity loss — recover gracefully from Firestore IndexedDB or localStorage cache
      let idbData: PlatformConfigData | null = null;
      try {
        const cachedSnap = await getDocFromCache(ref);
        if (cachedSnap.exists()) {
          idbData = extractPlatformConfigFields(cachedSnap.data());
        }
      } catch {
        idbData = null;
      }

      const fallbackData = idbData || getFallbackPlatformConfig();
      const friendlyMessage =
        'Unable to reach cloud platform settings right now. Using saved configuration and retrying automatically when online.';
      reportFirestoreConnectionStatus({
        status: isFirestoreOfflineError(lastErr) ? 'offline' : 'error',
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
        lastCheckedAt: Date.now(),
        lastError: friendlyMessage,
      });

      return {
        config: fallbackData,
        status: fallbackData ? 'cached_offline' : 'error',
        fromCache: true,
        docExists: fallbackData ? true : null,
        errorMessage: friendlyMessage,
      };
    }

    // Browser is offline: read from IndexedDB or persistent cache cleanly without throwing
    let offlineData: PlatformConfigData | null = null;
    try {
      const cachedSnap = await getDocFromCache(ref);
      if (cachedSnap.exists()) {
        offlineData = extractPlatformConfigFields(cachedSnap.data());
      }
    } catch {
      offlineData = null;
    }
    const backup = offlineData || getFallbackPlatformConfig();
    reportFirestoreConnectionStatus({
      status: 'offline',
      isOnline: false,
      lastCheckedAt: Date.now(),
      lastError:
        'You are offline. Saved configuration & offline study tools remain active and will sync upon reconnection.',
    });

    return {
      config: backup,
      status: 'cached_offline',
      fromCache: true,
      docExists: backup ? true : null,
      errorMessage: 'Offline mode active — will automatically load latest platform_config when reconnected.',
    };
  })().finally(() => {
    inFlightPlatformConfig = null;
  });

  return inFlightPlatformConfig;
}

export async function loadPlatformConfigFromFirestore(options?: {
  forceRefresh?: boolean;
}): Promise<PlatformConfigData | null> {
  const result = await loadPlatformConfigDetailed(options);
  return result.config;
}

export async function ensureDefaultPlatformConfigIfAdmin(defaultConfig: {
  timers: {
    classes2to3: number;
    classes4to5: number;
    classes6to8: number;
  };
  sectionVisibility: SectionVisibilityConfig;
}): Promise<{ seeded: boolean; alreadyExists: boolean }> {
  const fbUser = auth.currentUser;
  const email = (fbUser?.email || '').trim().toLowerCase();
  if (!fbUser || email !== 'ronakvarade2022@gmail.com' || !fbUser.emailVerified) {
    return { seeded: false, alreadyExists: false };
  }

  try {
    await ensureFirestoreOnline();
    const ref = doc(db, 'platform_config', 'main');
    const existing = await getDocFromServer(ref);
    if (existing.exists()) {
      reportFirestoreConnectionStatus({
        status: 'connected',
        isOnline: true,
        lastCheckedAt: Date.now(),
        lastConnectedAt: Date.now(),
        lastError: null,
        configDocExists: true,
      });
      return { seeded: false, alreadyExists: true };
    }
    const payload = stripUndefinedDeep({
      id: 'main',
      timers: defaultConfig.timers,
      sectionVisibility: defaultConfig.sectionVisibility,
      updatedAt: new Date().toISOString(),
    });
    await setDoc(ref, payload, { merge: true });
    persistPlatformConfigCache(
      { timers: defaultConfig.timers, sectionVisibility: defaultConfig.sectionVisibility },
      true
    );
    reportFirestoreConnectionStatus({
      status: 'connected',
      isOnline: true,
      lastCheckedAt: Date.now(),
      lastConnectedAt: Date.now(),
      lastError: null,
      configDocExists: true,
    });
    return { seeded: true, alreadyExists: false };
  } catch {
    return { seeded: false, alreadyExists: false };
  }
}

export async function savePlatformConfigToFirestore(config: {
  timers: {
    classes2to3: number;
    classes4to5: number;
    classes6to8: number;
  };
  sectionVisibility: SectionVisibilityConfig;
  studyLibraryVersion?: number;
}): Promise<{ success: boolean }> {
  const path = 'platform_config/main';
  try {
    await ensureFirestoreOnline();
    const ref = doc(db, 'platform_config', 'main');
    const existingVersion = memPlatformConfigCache?.data?.studyLibraryVersion;
    const resolvedVersion =
      typeof config.studyLibraryVersion === 'number'
        ? config.studyLibraryVersion
        : typeof existingVersion === 'number'
        ? existingVersion
        : undefined;
    const payload = stripUndefinedDeep({
      id: 'main',
      timers: config.timers,
      sectionVisibility: config.sectionVisibility,
      studyLibraryVersion: resolvedVersion,
      updatedAt: new Date().toISOString(),
    });
    await setDoc(ref, payload, { merge: true });
    persistPlatformConfigCache(
      {
        timers: config.timers,
        sectionVisibility: config.sectionVisibility,
        studyLibraryVersion: resolvedVersion,
      },
      true
    );
    reportFirestoreConnectionStatus({
      status: 'connected',
      isOnline: true,
      lastCheckedAt: Date.now(),
      lastConnectedAt: Date.now(),
      lastError: null,
      configDocExists: true,
    });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
}

export async function loadPublishedSpecialContentFromFirestore(
  includeDraftsForAdmin = false,
  options?: { forceRefresh?: boolean }
): Promise<SpecialContentDocument[]> {
  const now = Date.now();
  const forceRefresh = Boolean(options?.forceRefresh);

  if (
    !forceRefresh &&
    memSpecialContentCache &&
    memSpecialContentCache.includeDrafts === includeDraftsForAdmin &&
    now - memSpecialContentCache.ts < CACHE_TTL_MS
  ) {
    return memSpecialContentCache.data;
  }

  if (!forceRefresh && !includeDraftsForAdmin) {
    const parsed = readCachedJson<{ ts: number; data: SpecialContentDocument[] }>(
      typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
      SPECIAL_CONTENT_CACHE_KEY
    );
    if (parsed && typeof parsed.ts === 'number' && now - parsed.ts < CACHE_TTL_MS && Array.isArray(parsed.data)) {
      memSpecialContentCache = { ts: parsed.ts, includeDrafts: false, data: parsed.data };
      return parsed.data;
    }
  }

  if (inFlightSpecialContent && !forceRefresh) {
    return inFlightSpecialContent;
  }

  inFlightSpecialContent = (async () => {
    const persistentBackup =
      memSpecialContentCache?.data ||
      readCachedJson<{ data?: SpecialContentDocument[] }>(
        typeof localStorage !== 'undefined' ? localStorage : undefined,
        SPECIAL_CONTENT_PERSISTENT_KEY
      )?.data ||
      [];

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return persistentBackup;
    }

    const colRef = collection(db, 'special_content');
    const q = includeDraftsForAdmin
      ? query(colRef, limit(500))
      : query(colRef, where('published', '==', true), limit(500));

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await ensureFirestoreOnline();
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
          const entry = { ts: Date.now(), data: docs };
          writeCachedJson(
            typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
            SPECIAL_CONTENT_CACHE_KEY,
            entry
          );
          if (docs.length > 0) {
            writeCachedJson(
              typeof localStorage !== 'undefined' ? localStorage : undefined,
              SPECIAL_CONTENT_PERSISTENT_KEY,
              entry
            );
          }
        }
        return docs;
      } catch (err) {
        if (attempt === 0 && isFirestoreOfflineError(err)) {
          await new Promise((r) => setTimeout(r, 450));
        } else {
          break;
        }
      }
    }

    return persistentBackup;
  })().finally(() => {
    inFlightSpecialContent = null;
  });

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
    await ensureFirestoreOnline();
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
    await ensureFirestoreOnline();
    const ref = doc(db, 'special_content', safeId);
    await deleteDoc(ref);
    invalidateSpecialContentCache();
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return { success: false };
  }
}

/**
 * Spark-Free-Plan Optimized Study Material Library Firestore Helpers
 * - Zero new collections (uses `special_content` with `contentType: 'study_material_item'`)
 * - Version-gated localStorage cache (`studyLibraryVersion` on `platform_config/main`)
 *   so repeat student visits incur 0 extra Firestore reads unless Admin publishes an update.
 * - Paginated queries (`limit(pageSize)`) so the full collection is never downloaded at once.
 */
const STUDY_LIB_CACHE_PREFIX = 'msz_study_lib_page_v1_';

export interface StudyLibraryDynamicItemPayload {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName | string;
  materialCategory:
    | 'textbook'
    | 'notes'
    | 'revision'
    | 'qa'
    | 'test'
    | 'model_paper'
    | 'pyq'
    | 'video'
    | 'math_formula'
    | 'science_diagram'
    | 'english_grammar'
    | 'scholarship_olympiad';
  chapterNumber?: number;
  chapterTitle?: string;
  description?: string;
  externalUrl?: string;
  videoUrl?: string;
  contentMarkdown?: string;
  keyPoints?: string[];
  tags?: string[];
  [key: string]: unknown;
}

export async function bumpStudyLibraryVersionInFirestore(): Promise<number> {
  const path = 'platform_config/main';
  try {
    await ensureFirestoreOnline();
    const currentCfg = await loadPlatformConfigFromFirestore();
    const nextVersion = Date.now();
    const ref = doc(db, 'platform_config', 'main');
    await setDoc(
      ref,
      stripUndefinedDeep({
        id: 'main',
        timers: currentCfg?.timers,
        sectionVisibility: currentCfg?.sectionVisibility,
        studyLibraryVersion: nextVersion,
        updatedAt: new Date().toISOString(),
      }),
      { merge: true }
    );
    persistPlatformConfigCache(
      {
        ...(currentCfg || {}),
        studyLibraryVersion: nextVersion,
      },
      true
    );
    return nextVersion;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return 0;
  }
}

export async function loadPaginatedStudyLibraryItemsFromFirestore(params?: {
  board?: EducationBoard;
  classLevel?: ClassLevel;
  materialCategory?: string;
  pageSize?: number;
  includeDraftsForAdmin?: boolean;
  forceRefresh?: boolean;
}): Promise<SpecialContentDocument<StudyLibraryDynamicItemPayload>[]> {
  const board = params?.board;
  const classLevel = params?.classLevel;
  const materialCategory = params?.materialCategory;
  const pageSize = Math.min(Math.max(params?.pageSize || 25, 1), 100);
  const includeDrafts = Boolean(params?.includeDraftsForAdmin);
  const forceRefresh = Boolean(params?.forceRefresh);

  const cacheKey = `${STUDY_LIB_CACHE_PREFIX}${board || 'ALL'}_${classLevel || 'ALL'}_${
    materialCategory || 'ALL'
  }_${pageSize}_${includeDrafts ? 'admin' : 'pub'}`;

  // Check version from platform_config/main (already loaded once at boot)
  const platformCfg = getFallbackPlatformConfig();
  const currentVersion = platformCfg?.studyLibraryVersion ?? 0;

  if (!forceRefresh && !includeDrafts) {
    const cached = readCachedJson<{
      version: number;
      ts: number;
      items: SpecialContentDocument<StudyLibraryDynamicItemPayload>[];
    }>(typeof localStorage !== 'undefined' ? localStorage : undefined, cacheKey);

    if (cached && Array.isArray(cached.items)) {
      // If studyLibraryVersion is 0 (no dynamic admin items ever published), or matches currentVersion, return 0-read cached result!
      if (currentVersion === 0 || cached.version === currentVersion) {
        return cached.items;
      }
    } else if (currentVersion === 0) {
      // Zero dynamic items have been published by Admin yet -> 0 Firestore reads!
      return [];
    }
  }

  try {
    await ensureFirestoreOnline();
    const colRef = collection(db, 'special_content');
    const q = includeDrafts
      ? query(colRef, where('contentType', '==', 'study_material_item'), limit(pageSize))
      : query(
          colRef,
          where('published', '==', true),
          where('contentType', '==', 'study_material_item'),
          limit(pageSize)
        );
    const snap = await getDocs(q);
    const items = snap.docs
      .map((d) => {
        const raw = d.data() as SpecialContentDocument<StudyLibraryDynamicItemPayload>;
        return {
          ...raw,
          id: raw.id || d.id,
        };
      })
      .filter((docItem) => {
        const itemBoard = docItem.board || docItem.payload?.board;
        const itemClass = docItem.classLevel || docItem.payload?.classLevel;
        const itemCat = docItem.materialCategory || docItem.payload?.materialCategory;
        if (board && itemBoard && itemBoard !== board) return false;
        if (classLevel && itemClass && itemClass !== classLevel) return false;
        if (materialCategory && itemCat && itemCat !== materialCategory) return false;
        return true;
      });

    if (!includeDrafts) {
      writeCachedJson(typeof localStorage !== 'undefined' ? localStorage : undefined, cacheKey, {
        version: currentVersion,
        ts: Date.now(),
        items,
      });
    }
    return items;
  } catch {
    const fallback = readCachedJson<{
      items?: SpecialContentDocument<StudyLibraryDynamicItemPayload>[];
    }>(typeof localStorage !== 'undefined' ? localStorage : undefined, cacheKey);
    return fallback?.items || [];
  }
}

export async function saveStudyLibraryItemToFirestore(params: {
  id: string;
  title: string;
  published: boolean;
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName | string;
  materialCategory: StudyLibraryDynamicItemPayload['materialCategory'];
  payload: StudyLibraryDynamicItemPayload;
  createdAt?: string;
}): Promise<{ success: boolean; version?: number }> {
  const safeId = sanitizeFirestoreId(params.id);
  const path = `special_content/${safeId}`;
  try {
    await ensureFirestoreOnline();
    const ref = doc(db, 'special_content', safeId);
    const nowIso = new Date().toISOString();
    const cleanDoc = stripUndefinedDeep({
      id: safeId,
      contentType: 'study_material_item' as const,
      title: String(params.title || 'Study Material Item').slice(0, 195),
      published: Boolean(params.published),
      board: params.board,
      classLevel: params.classLevel,
      subject: String(params.subject || 'English').slice(0, 100),
      materialCategory: String(params.materialCategory || 'notes').slice(0, 60),
      payload: params.payload,
      createdAt: params.createdAt || nowIso,
      updatedAt: nowIso,
    });
    await setDoc(ref, cleanDoc, { merge: true });
    invalidateSpecialContentCache();
    const newVersion = await bumpStudyLibraryVersionInFirestore();
    return { success: true, version: newVersion };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
}

export async function deleteStudyLibraryItemFromFirestore(
  id: string
): Promise<{ success: boolean; version?: number }> {
  const res = await deleteSpecialContentItemFromFirestore(id);
  if (!res.success) return { success: false };
  const newVersion = await bumpStudyLibraryVersionInFirestore();
  return { success: true, version: newVersion };
}
