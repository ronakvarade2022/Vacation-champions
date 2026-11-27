import {
  ComprehensiveDictionaryEntry,
  getComprehensiveTrilingualLexicon,
  upgradeToComprehensiveEntry,
} from '../data/comprehensiveTrilingualLexicon';
import {
  TrilingualWordEntry,
  loadTrilingualDictionaryEntries,
  saveCustomDictionaryEntry,
} from '../data/trilingualDictionaryData';
import { auth } from './firebase';

const RECENT_WORDS_STORAGE_KEY = 'msz_trilingual_dict_recent_v2';
const FAVOURITE_WORDS_STORAGE_KEY = 'msz_trilingual_dict_favourites_v2';
const CUSTOM_COMPREHENSIVE_STORAGE_KEY = 'msz_trilingual_dict_custom_comprehensive_v2';

/**
 * Loads the complete 100% Original MyStudyZone Trilingual Dictionary combining:
 * 1. Base & Extended Verified Curriculum Lexicon
 * 2. Local custom additions
 * 3. Server/Firebase-synced custom additions
 */
export function loadLocalComprehensiveDictionary(): ComprehensiveDictionaryEntry[] {
  const baseLexicon = getComprehensiveTrilingualLexicon();
  const map = new Map<string, ComprehensiveDictionaryEntry>();

  for (const entry of baseLexicon) {
    map.set(entry.english.toLowerCase(), entry);
  }

  // Merge any legacy custom entries saved via trilingualDictionaryData
  const legacyAll = loadTrilingualDictionaryEntries();
  for (const item of legacyAll) {
    if (!map.has(item.english.toLowerCase())) {
      map.set(item.english.toLowerCase(), upgradeToComprehensiveEntry(item));
    }
  }

  // Merge comprehensive custom entries from localStorage
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CUSTOM_COMPREHENSIVE_STORAGE_KEY);
      if (raw) {
        const list = JSON.parse(raw) as ComprehensiveDictionaryEntry[];
        if (Array.isArray(list)) {
          for (const custom of list) {
            if (custom && custom.english) {
              map.set(custom.english.toLowerCase(), custom);
            }
          }
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  return Array.from(map.values()).sort((a, b) => a.english.localeCompare(b.english));
}

/**
 * Fetches Firebase-backed custom dictionary entries from `/api/dictionary/entries`
 * and merges them into the comprehensive lexicon.
 */
export async function syncFirebaseDictionaryEntries(): Promise<ComprehensiveDictionaryEntry[]> {
  const current = loadLocalComprehensiveDictionary();
  const map = new Map<string, ComprehensiveDictionaryEntry>();
  for (const item of current) {
    map.set(item.english.toLowerCase(), item);
  }

  try {
    const headers: Record<string, string> = {};
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch('/api/dictionary/entries', { headers });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.entries)) {
        for (const remote of data.entries as TrilingualWordEntry[]) {
          if (remote && remote.english) {
            const upgraded = upgradeToComprehensiveEntry(
              remote,
              (remote as any).simpleMeaning,
              (remote as any).detailedMeaning,
              (remote as any).wordForms?.derivedForms,
              '100% Original MyStudyZone Firebase Dictionary'
            );
            map.set(upgraded.english.toLowerCase(), upgraded);
          }
        }
      }
    }
  } catch {
    // Offline fallback uses local comprehensive dictionary
  }

  return Array.from(map.values()).sort((a, b) => a.english.localeCompare(b.english));
}

/**
 * Saves a newly created original trilingual entry to both local storage and the Firebase-backed server endpoint.
 */
export async function saveNewOriginalDictionaryEntry(
  newBaseEntry: TrilingualWordEntry,
  simpleMeaning: { english: string; marathi: string; hindi: string },
  detailedMeaning: { english: string; marathi: string; hindi: string },
  derivedForms: string[]
): Promise<ComprehensiveDictionaryEntry[]> {
  // 1. Save to base local store so existing data structures stay in sync
  saveCustomDictionaryEntry(newBaseEntry);

  const comprehensive = upgradeToComprehensiveEntry(
    newBaseEntry,
    simpleMeaning,
    detailedMeaning,
    derivedForms,
    '100% Original MyStudyZone Firebase Dictionary'
  );

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CUSTOM_COMPREHENSIVE_STORAGE_KEY);
      const list: ComprehensiveDictionaryEntry[] = raw ? JSON.parse(raw) : [];
      const filtered = list.filter(
        (item) => item.english.toLowerCase() !== comprehensive.english.toLowerCase()
      );
      filtered.push(comprehensive);
      localStorage.setItem(CUSTOM_COMPREHENSIVE_STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // Ignore quota errors
    }
  }

  // 2. Sync to Firebase-backed server endpoint
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }
    await fetch('/api/dictionary/entries', {
      method: 'POST',
      headers,
      body: JSON.stringify(comprehensive),
    });
  } catch {
    // Local cache already updated
  }

  return loadLocalComprehensiveDictionary();
}

export function loadRecentSearchedWords(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_WORDS_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter((w) => typeof w === 'string') : [];
  } catch {
    return [];
  }
}

export function recordRecentSearchedWord(englishWord: string): string[] {
  if (typeof window === 'undefined' || !englishWord.trim()) return [];
  const clean = englishWord.trim();
  const existing = loadRecentSearchedWords().filter(
    (w) => w.toLowerCase() !== clean.toLowerCase()
  );
  const updated = [clean, ...existing].slice(0, 15);
  try {
    localStorage.setItem(RECENT_WORDS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}

export function clearRecentSearchedWords(): string[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(RECENT_WORDS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return [];
}

export function loadFavouriteWords(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVOURITE_WORDS_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter((w) => typeof w === 'string') : [];
  } catch {
    return [];
  }
}

export function toggleFavouriteWord(englishWord: string): string[] {
  if (typeof window === 'undefined' || !englishWord.trim()) return [];
  const clean = englishWord.trim();
  const existing = loadFavouriteWords();
  const exists = existing.some((w) => w.toLowerCase() === clean.toLowerCase());
  const updated = exists
    ? existing.filter((w) => w.toLowerCase() !== clean.toLowerCase())
    : [clean, ...existing];
  try {
    localStorage.setItem(FAVOURITE_WORDS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}
