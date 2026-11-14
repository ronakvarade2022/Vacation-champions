/**
 * Shared in-memory TTL cache + in-flight request deduplication for Admin Portal.
 * Prevents duplicate Firestore & backend API reads when switching tabs or re-rendering.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const inflightRequests = new Map<string, Promise<unknown>>();

export const ADMIN_CACHE_DEFAULT_TTL_MS = 60_000; // 60 seconds

export function getCachedAdminValue<T>(key: string): T | null {
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttlMs) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCachedAdminValue<T>(
  key: string,
  data: T,
  ttlMs: number = ADMIN_CACHE_DEFAULT_TTL_MS
): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
    ttlMs,
  });
}

export function updateCachedAdminValue<T>(
  key: string,
  updater: (prev: T) => T,
  ttlMs: number = ADMIN_CACHE_DEFAULT_TTL_MS
): void {
  const current = getCachedAdminValue<T>(key);
  if (current !== null) {
    setCachedAdminValue(key, updater(current), ttlMs);
  }
}

export function invalidateAdminCache(keyOrPrefix?: string): void {
  if (!keyOrPrefix) {
    memoryCache.clear();
    return;
  }
  for (const key of Array.from(memoryCache.keys())) {
    if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Fetches via `fetcher()` with:
 * 1. Fresh TTL cache hit short-circuit
 * 2. In-flight promise deduplication (concurrent callers share 1 network/DB read)
 */
export async function cachedAdminFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    ttlMs?: number;
    forceRefresh?: boolean;
  }
): Promise<T> {
  const ttlMs = options?.ttlMs ?? ADMIN_CACHE_DEFAULT_TTL_MS;
  const forceRefresh = Boolean(options?.forceRefresh);

  if (!forceRefresh) {
    const cached = getCachedAdminValue<T>(key);
    if (cached !== null) {
      return cached;
    }
  } else {
    memoryCache.delete(key);
  }

  const existingInflight = inflightRequests.get(key) as Promise<T> | undefined;
  if (existingInflight) {
    return existingInflight;
  }

  const promise = fetcher()
    .then((result) => {
      setCachedAdminValue(key, result, ttlMs);
      inflightRequests.delete(key);
      return result;
    })
    .catch((err) => {
      inflightRequests.delete(key);
      throw err;
    });

  inflightRequests.set(key, promise);
  return promise;
}
