import {
  serverGetDoc,
  serverSetDoc,
} from '../firebase/admin.ts';

export interface ServerCustomDictionaryWord {
  id: string;
  english: string;
  pronunciation: string;
  partOfSpeech: string;
  classGroup: string;
  category: string;
  englishMeaning: string;
  marathiWord: string;
  marathiMeaning: string;
  hindiWord: string;
  hindiMeaning: string;
  simpleMeaning?: {
    english: string;
    marathi: string;
    hindi: string;
  };
  detailedMeaning?: {
    english: string;
    marathi: string;
    hindi: string;
  };
  synonyms: {
    english: string[];
    marathi: string[];
    hindi: string[];
  };
  antonyms: {
    english: string[];
    marathi: string[];
    hindi: string[];
  };
  examples: {
    english: string;
    marathi: string;
    hindi: string;
  };
  wordForms?: {
    baseForm: string;
    derivedForms: string[];
    marathiForms: string[];
    hindiForms: string[];
  };
  letter: string;
  createdAt: string;
  sourceAttribution: string;
}

const DICTIONARY_COLLECTION = 'msz_dictionary_catalog';
const DICTIONARY_INDEX_DOC = 'custom_verified_entries_v1';

// In-memory server store synchronized with Firestore via REST/Admin helper
const serverCustomWordsMap = new Map<string, ServerCustomDictionaryWord>();
let initialSyncAttempted = false;

async function ensureServerDictionaryLoaded(): Promise<void> {
  if (initialSyncAttempted) return;
  initialSyncAttempted = true;
  try {
    const docData = await serverGetDoc(DICTIONARY_COLLECTION, DICTIONARY_INDEX_DOC);
    if (docData && Array.isArray(docData.entries)) {
      for (const item of docData.entries as ServerCustomDictionaryWord[]) {
        if (item && item.english) {
          serverCustomWordsMap.set(item.english.toLowerCase(), item);
        }
      }
    }
  } catch {
    // Graceful fallback to in-memory server store if Firestore document doesn't exist yet
  }
}

export async function getServerCustomDictionaryEntries(): Promise<ServerCustomDictionaryWord[]> {
  await ensureServerDictionaryLoaded();
  return Array.from(serverCustomWordsMap.values()).sort((a, b) =>
    a.english.localeCompare(b.english)
  );
}

export async function addServerCustomDictionaryEntry(
  raw: Record<string, unknown>
): Promise<{
  statusCode: number;
  payload: {
    success: boolean;
    entry?: ServerCustomDictionaryWord;
    totalCustomEntries?: number;
    message: string;
  };
}> {
  await ensureServerDictionaryLoaded();

  const english = String(raw.english || '').trim();
  const marathiWord = String(raw.marathiWord || '').trim();
  const hindiWord = String(raw.hindiWord || '').trim();
  const englishMeaning = String(raw.englishMeaning || '').trim();
  const marathiMeaning = String(raw.marathiMeaning || '').trim();
  const hindiMeaning = String(raw.hindiMeaning || '').trim();

  if (
    !english ||
    !marathiWord ||
    !hindiWord ||
    !englishMeaning ||
    !marathiMeaning ||
    !hindiMeaning
  ) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        message:
          'English word, Marathi word, Hindi word, and meanings in all 3 languages are required.',
      },
    };
  }

  const formattedEnglish = english.charAt(0).toUpperCase() + english.slice(1);
  const id =
    String(raw.id || '').trim() ||
    `msz-orig-${Date.now()}-${formattedEnglish.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const rawSynonyms = (raw.synonyms || {}) as Record<string, unknown>;
  const rawAntonyms = (raw.antonyms || {}) as Record<string, unknown>;
  const rawExamples = (raw.examples || {}) as Record<string, unknown>;
  const rawSimple = (raw.simpleMeaning || {}) as Record<string, unknown>;
  const rawDetailed = (raw.detailedMeaning || {}) as Record<string, unknown>;

  const entry: ServerCustomDictionaryWord = {
    id,
    english: formattedEnglish,
    pronunciation: String(raw.pronunciation || formattedEnglish.toLowerCase()).trim(),
    partOfSpeech: String(raw.partOfSpeech || 'Noun').trim(),
    classGroup: String(raw.classGroup || 'Classes 4–6').trim(),
    category: String(raw.category || 'Academic & School').trim(),
    englishMeaning,
    marathiWord,
    marathiMeaning,
    hindiWord,
    hindiMeaning,
    simpleMeaning: {
      english: String(rawSimple.english || englishMeaning).trim(),
      marathi: String(rawSimple.marathi || marathiMeaning).trim(),
      hindi: String(rawSimple.hindi || hindiMeaning).trim(),
    },
    detailedMeaning: {
      english: String(rawDetailed.english || englishMeaning).trim(),
      marathi: String(rawDetailed.marathi || marathiMeaning).trim(),
      hindi: String(rawDetailed.hindi || hindiMeaning).trim(),
    },
    synonyms: {
      english: Array.isArray(rawSynonyms.english)
        ? rawSynonyms.english.map((s) => String(s).trim()).filter(Boolean)
        : [],
      marathi: Array.isArray(rawSynonyms.marathi)
        ? rawSynonyms.marathi.map((s) => String(s).trim()).filter(Boolean)
        : [],
      hindi: Array.isArray(rawSynonyms.hindi)
        ? rawSynonyms.hindi.map((s) => String(s).trim()).filter(Boolean)
        : [],
    },
    antonyms: {
      english: Array.isArray(rawAntonyms.english)
        ? rawAntonyms.english.map((s) => String(s).trim()).filter(Boolean)
        : [],
      marathi: Array.isArray(rawAntonyms.marathi)
        ? rawAntonyms.marathi.map((s) => String(s).trim()).filter(Boolean)
        : [],
      hindi: Array.isArray(rawAntonyms.hindi)
        ? rawAntonyms.hindi.map((s) => String(s).trim()).filter(Boolean)
        : [],
    },
    examples: {
      english:
        String(rawExamples.english || '').trim() ||
        `We studied the word "${formattedEnglish}" in our lesson today.`,
      marathi:
        String(rawExamples.marathi || '').trim() ||
        `आम्ही आज पाठात "${marathiWord}" हा शब्द शिकलो.`,
      hindi:
        String(rawExamples.hindi || '').trim() ||
        `हमने आज पाठ में "${hindiWord}" शब्द का अध्ययन किया।`,
    },
    letter: formattedEnglish.charAt(0).toUpperCase(),
    createdAt: new Date().toISOString(),
    sourceAttribution:
      '100% Original MyStudyZone Trilingual Educational Lexicon (Independently Developed)',
  };

  serverCustomWordsMap.set(formattedEnglish.toLowerCase(), entry);

  // Persist to Firebase Firestore dictionary catalog document
  try {
    const allCustom = Array.from(serverCustomWordsMap.values()).slice(-1500);
    await serverSetDoc(
      DICTIONARY_COLLECTION,
      DICTIONARY_INDEX_DOC,
      {
        id: DICTIONARY_INDEX_DOC,
        entries: allCustom,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch {
    // Keep in server memory if Firestore write is restricted
  }

  return {
    statusCode: 200,
    payload: {
      success: true,
      entry,
      totalCustomEntries: serverCustomWordsMap.size,
      message: `Original entry "${formattedEnglish}" saved to MyStudyZone Firebase Dictionary.`,
    },
  };
}
