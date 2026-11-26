import type { ChapterStudyMaterial, ClassLevel, EducationBoard, SubjectName } from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';

/**
 * Lightweight on-demand CDN JSON delivery cache for verified chapter notes & textbook solutions.
 * Checks `/content/syllabus/manifest.json` once per session so un-migrated subjects never trigger
 * unnecessary 404 requests, and caches fetched chapter bundles in a bounded in-memory LRU map.
 */

export interface ExternalChapterBundlePayload {
  schemaVersion: string;
  board: EducationBoard;
  classLevel: ClassLevel;
  medium: InstructionMedium | 'All';
  subject: SubjectName;
  verifiedSource: string;
  chapters: ChapterStudyMaterial[];
}

export interface ExternalSyllabusManifest {
  version: string;
  bundles: Record<string, string>; // key -> relative URL under /content/syllabus/
}

const MAX_MEMORY_CACHE_ENTRIES = 24;
const memoryBundleCache = new Map<string, ExternalChapterBundlePayload>();
const inflightRequests = new Map<string, Promise<ExternalChapterBundlePayload | null>>();
let manifestPromise: Promise<ExternalSyllabusManifest | null> | null = null;

function normalizeKeyPart(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildChapterBundleKey(params: {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  medium?: InstructionMedium | string;
}): string {
  return [
    normalizeKeyPart(params.board),
    normalizeKeyPart(params.classLevel),
    normalizeKeyPart(params.medium || 'english'),
    normalizeKeyPart(params.subject),
  ].join('__');
}

export function getCachedChapterBundle(key: string): ExternalChapterBundlePayload | null {
  return memoryBundleCache.get(key) ?? null;
}

function setBoundedCache(key: string, payload: ExternalChapterBundlePayload): void {
  if (memoryBundleCache.has(key)) {
    memoryBundleCache.delete(key);
  } else if (memoryBundleCache.size >= MAX_MEMORY_CACHE_ENTRIES) {
    const oldestKey = memoryBundleCache.keys().next().value;
    if (oldestKey) memoryBundleCache.delete(oldestKey);
  }
  memoryBundleCache.set(key, payload);
}

export async function loadExternalSyllabusManifest(): Promise<ExternalSyllabusManifest | null> {
  if (manifestPromise) return manifestPromise;
  manifestPromise = (async () => {
    try {
      const res = await fetch('/content/syllabus/manifest.json', {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;
      const data = (await res.json()) as ExternalSyllabusManifest;
      if (!data || typeof data.bundles !== 'object') return null;
      return data;
    } catch {
      return null;
    }
  })();
  return manifestPromise;
}

export async function fetchExternalChapterBundle(params: {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  medium?: InstructionMedium | string;
}): Promise<ExternalChapterBundlePayload | null> {
  const key = buildChapterBundleKey(params);
  const cached = memoryBundleCache.get(key);
  if (cached) return cached;

  const existingInflight = inflightRequests.get(key);
  if (existingInflight) return existingInflight;

  const req = (async () => {
    try {
      const manifest = await loadExternalSyllabusManifest();
      const fallbackEnglishKey = buildChapterBundleKey({
        ...params,
        medium: 'English',
      });
      const relativePath =
        manifest?.bundles?.[key] ||
        (params.medium !== 'English' ? manifest?.bundles?.[fallbackEnglishKey] : undefined);

      // Skip HTTP fetch completely for un-migrated subjects to avoid 404 console noise
      if (manifest && !relativePath) {
        return null;
      }

      const boardSlug = normalizeKeyPart(params.board);
      const classSlug = normalizeKeyPart(params.classLevel);
      const mediumSlug = normalizeKeyPart(params.medium || 'english');
      const subjectSlug = normalizeKeyPart(params.subject);
      const url = relativePath
        ? `/content/syllabus/${relativePath.replace(/^\/+/, '')}`
        : `/content/syllabus/${boardSlug}/${classSlug}/${mediumSlug}/${subjectSlug}.json`;

      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 5000) : null;
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller?.signal,
      });
      if (timer) clearTimeout(timer);
      if (!res.ok) return null;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json') && !contentType.includes('text/plain')) {
        return null;
      }
      const data = (await res.json()) as ExternalChapterBundlePayload;
      if (!data || !Array.isArray(data.chapters) || data.chapters.length === 0) {
        return null;
      }
      setBoundedCache(key, data);
      return data;
    } catch {
      return null;
    } finally {
      inflightRequests.delete(key);
    }
  })();

  inflightRequests.set(key, req);
  return req;
}

export function applyExternalChapterSummaries<
  T extends { chapterNumber: number; chapterTitle: string; overview: string }
>(baseSummaries: T[], externalBundle: ExternalChapterBundlePayload | null): T[] {
  if (!externalBundle || !Array.isArray(externalBundle.chapters) || externalBundle.chapters.length === 0) {
    return baseSummaries;
  }
  const byNumber = new Map<number, ChapterStudyMaterial>();
  for (const ch of externalBundle.chapters) {
    byNumber.set(ch.chapterNumber, ch);
  }
  return baseSummaries.map((base) => {
    const verifiedOverride = byNumber.get(base.chapterNumber);
    if (!verifiedOverride) return base;
    return {
      ...base,
      chapterTitle: verifiedOverride.chapterTitle || base.chapterTitle,
      overview: verifiedOverride.overview || base.overview,
    };
  });
}

export function mergeSingleExternalVerifiedChapter(
  baseChapter: ChapterStudyMaterial | null,
  chapterNumber: number,
  externalBundle: ExternalChapterBundlePayload | null
): ChapterStudyMaterial | null {
  if (!externalBundle || !Array.isArray(externalBundle.chapters) || externalBundle.chapters.length === 0) {
    return baseChapter;
  }
  const verifiedOverride = externalBundle.chapters.find((c) => c.chapterNumber === chapterNumber);
  if (!verifiedOverride) return baseChapter;
  if (!baseChapter) return verifiedOverride;
  return {
    ...baseChapter,
    ...verifiedOverride,
    officialTextbook: verifiedOverride.officialTextbook || baseChapter.officialTextbook,
    completenessStatus: verifiedOverride.completenessStatus || 'COMPLETE',
  };
}

export function mergeExternalVerifiedChapters(
  baseChapters: ChapterStudyMaterial[],
  externalBundle: ExternalChapterBundlePayload | null
): ChapterStudyMaterial[] {
  if (!externalBundle || !Array.isArray(externalBundle.chapters) || externalBundle.chapters.length === 0) {
    return baseChapters;
  }
  const byNumber = new Map<number, ChapterStudyMaterial>();
  for (const ch of externalBundle.chapters) {
    byNumber.set(ch.chapterNumber, ch);
  }
  if (baseChapters.length === 0) {
    return [...externalBundle.chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
  }
  return baseChapters.map((base) => {
    const verifiedOverride = byNumber.get(base.chapterNumber);
    if (!verifiedOverride) return base;
    return {
      ...base,
      ...verifiedOverride,
      officialTextbook: verifiedOverride.officialTextbook || base.officialTextbook,
      completenessStatus: verifiedOverride.completenessStatus || 'COMPLETE',
    };
  });
}
