import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Volume2,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  Share2,
  PlusCircle,
  ArrowLeft,
  X,
  GraduationCap,
  Languages,
  ChevronLeft,
  ChevronRight,
  Star,
  History,
  ArrowRightLeft,
  Layers,
  HelpCircle,
  Database,
} from 'lucide-react';
import {
  DictionaryPartOfSpeech,
  DictionaryClassGroup,
  DictionaryTopicCategory,
  TrilingualWordEntry,
  getDailyVocabularyWords,
} from '../../data/trilingualDictionaryData';
import {
  ComprehensiveDictionaryEntry,
  DictionaryLanguage,
  TranslationDirection,
  TRANSLATION_DIRECTIONS,
  searchDictionarySuggestions,
} from '../../data/comprehensiveTrilingualLexicon';
import {
  loadLocalComprehensiveDictionary,
  syncFirebaseDictionaryEntries,
  saveNewOriginalDictionaryEntry,
  loadRecentSearchedWords,
  recordRecentSearchedWord,
  clearRecentSearchedWords,
  loadFavouriteWords,
  toggleFavouriteWord,
} from '../../services/dictionaryFirestoreService';

interface TrilingualDictionaryViewProps {
  onBack?: () => void;
  initialSearchQuery?: string;
}

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PARTS_OF_SPEECH: DictionaryPartOfSpeech[] = [
  'Noun',
  'Verb',
  'Adjective',
  'Adverb',
  'Preposition',
  'Conjunction',
];

const TOPIC_CATEGORIES: DictionaryTopicCategory[] = [
  'Academic & School',
  'Science & Nature',
  'Mathematics & Logic',
  'History, Civics & Geography',
  'Values, Character & Emotions',
  'Daily Life & Communication',
  'Action Verbs & Grammar',
];

export const TrilingualDictionaryView: React.FC<TrilingualDictionaryViewProps> = ({
  onBack,
  initialSearchQuery = '',
}) => {
  const [dictionaryEntries, setDictionaryEntries] = useState<ComprehensiveDictionaryEntry[]>(() =>
    loadLocalComprehensiveDictionary()
  );
  const [firebaseSynced, setFirebaseSynced] = useState<boolean>(false);

  // Language Selector ('all' | 'en' | 'mr' | 'hi') & 6 Translation Directions
  const [activeLanguageTab, setActiveLanguageTab] = useState<'all' | DictionaryLanguage>('all');
  const [activeDirection, setActiveDirection] = useState<TranslationDirection>('en-mr');

  // Single-Word Search State
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeLetterChip, setActiveLetterChip] = useState<string | null>(null);

  // Selected Single Word (NEVER display the entire dictionary as a long list or multiple cards simultaneously)
  const [selectedWordId, setSelectedWordId] = useState<string>(() => {
    const initialList = loadLocalComprehensiveDictionary();
    const recents = loadRecentSearchedWords();
    const queryToUse = initialSearchQuery.trim() || recents[0] || '';
    if (queryToUse) {
      const { directMatches, spellingSuggestions } = searchDictionarySuggestions(
        initialList,
        queryToUse,
        'all',
        5
      );
      if (directMatches.length > 0) return directMatches[0].entry.id;
      if (spellingSuggestions.length > 0) return spellingSuggestions[0].entry.id;
    }
    const daily = getDailyVocabularyWords(initialList, new Date(), 5);
    return daily[0]?.id || initialList[0]?.id || '';
  });

  // Recently Searched & Favourite Words
  const [recentWords, setRecentWords] = useState<string[]>(() => loadRecentSearchedWords());
  const [favouriteWords, setFavouriteWords] = useState<string[]>(() => loadFavouriteWords());

  // UI Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [noDirectMatchQuery, setNoDirectMatchQuery] = useState<string | null>(null);

  // Progressive Original Word Addition Modal (Firebase-backed)
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newEnglish, setNewEnglish] = useState('');
  const [newPronunciation, setNewPronunciation] = useState('');
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<DictionaryPartOfSpeech>('Noun');
  const [newClassGroup, setNewClassGroup] = useState<DictionaryClassGroup>('Classes 4–6');
  const [newCategory, setNewCategory] = useState<DictionaryTopicCategory>('Academic & School');
  const [newSimpleEn, setNewSimpleEn] = useState('');
  const [newDetailedEn, setNewDetailedEn] = useState('');
  const [newMarathiWord, setNewMarathiWord] = useState('');
  const [newSimpleMr, setNewSimpleMr] = useState('');
  const [newDetailedMr, setNewDetailedMr] = useState('');
  const [newHindiWord, setNewHindiWord] = useState('');
  const [newSimpleHi, setNewSimpleHi] = useState('');
  const [newDetailedHi, setNewDetailedHi] = useState('');
  const [newEnSyn, setNewEnSyn] = useState('');
  const [newMrSyn, setNewMrSyn] = useState('');
  const [newHiSyn, setNewHiSyn] = useState('');
  const [newEnAnt, setNewEnAnt] = useState('');
  const [newMrAnt, setNewMrAnt] = useState('');
  const [newHiAnt, setNewHiAnt] = useState('');
  const [newEnEx, setNewEnEx] = useState('');
  const [newMrEx, setNewMrEx] = useState('');
  const [newHiEx, setNewHiEx] = useState('');
  const [newWordFormsText, setNewWordFormsText] = useState('');
  const [addFormError, setAddFormError] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync Firebase custom dictionary entries on mount
  useEffect(() => {
    let mounted = true;
    syncFirebaseDictionaryEntries().then((merged) => {
      if (!mounted) return;
      setDictionaryEntries(merged);
      setFirebaseSynced(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Close suggestion dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Daily 5 Vocabulary words (compact single-word chips)
  const dailyVocabulary = useMemo(
    () => getDailyVocabularyWords(dictionaryEntries, new Date(), 5) as ComprehensiveDictionaryEntry[],
    [dictionaryEntries]
  );

  // Live Search Suggestions & Spelling Suggestions
  const { directMatches, spellingSuggestions } = useMemo(
    () =>
      searchDictionarySuggestions(
        dictionaryEntries,
        searchQuery,
        activeLanguageTab,
        10
      ),
    [dictionaryEntries, searchQuery, activeLanguageTab]
  );

  // Currently active single word entry
  const activeWordIndex = useMemo(() => {
    const idx = dictionaryEntries.findIndex((item) => item.id === selectedWordId);
    return idx >= 0 ? idx : 0;
  }, [dictionaryEntries, selectedWordId]);

  const activeWord: ComprehensiveDictionaryEntry =
    dictionaryEntries[activeWordIndex] || dictionaryEntries[0];

  const prevWord: ComprehensiveDictionaryEntry | null =
    dictionaryEntries.length > 1
      ? dictionaryEntries[
          (activeWordIndex - 1 + dictionaryEntries.length) % dictionaryEntries.length
        ]
      : null;

  const nextWord: ComprehensiveDictionaryEntry | null =
    dictionaryEntries.length > 1
      ? dictionaryEntries[(activeWordIndex + 1) % dictionaryEntries.length]
      : null;

  // Compact chips for an A–Z letter when user clicks a letter (opens only one word at a time)
  const wordsForActiveLetter = useMemo(() => {
    if (!activeLetterChip) return [];
    return dictionaryEntries.filter((w) => w.letter === activeLetterChip);
  }, [dictionaryEntries, activeLetterChip]);

  // Select and open ONLY the chosen word
  const handleOpenSingleWord = (
    entry: ComprehensiveDictionaryEntry,
    recordInRecents: boolean = true
  ) => {
    setSelectedWordId(entry.id);
    setNoDirectMatchQuery(null);
    setShowSuggestions(false);
    if (recordInRecents) {
      const updatedRecents = recordRecentSearchedWord(entry.english);
      setRecentWords(updatedRecents);
    }
  };

  // Handle Enter key or Search button submission (opens ONLY the best matched word)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    if (directMatches.length > 0) {
      handleOpenSingleWord(directMatches[0].entry, true);
      return;
    }
    if (spellingSuggestions.length > 0) {
      setNoDirectMatchQuery(q);
      handleOpenSingleWord(spellingSuggestions[0].entry, true);
      return;
    }
    setNoDirectMatchQuery(q);
    setShowSuggestions(false);
  };

  // Jump to a word by English, Marathi, or Hindi text (e.g. clicking a Synonym, Antonym, Recent, or Favourite chip)
  const handleJumpByWordText = (wordText: string) => {
    const clean = wordText.trim().toLowerCase();
    const exact = dictionaryEntries.find(
      (w) =>
        w.english.toLowerCase() === clean ||
        w.marathiWord.toLowerCase() === clean ||
        w.hindiWord.toLowerCase() === clean
    );
    if (exact) {
      setSearchQuery(exact.english);
      handleOpenSingleWord(exact, true);
      return;
    }
    const { directMatches: matches } = searchDictionarySuggestions(
      dictionaryEntries,
      wordText,
      'all',
      1
    );
    if (matches.length > 0) {
      setSearchQuery(matches[0].entry.english);
      handleOpenSingleWord(matches[0].entry, true);
    }
  };

  // Audio Pronunciation via Web Speech API
  const handleSpeak = (text: string, lang: 'en-IN' | 'mr-IN' | 'hi-IN') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors on unsupported browsers
    }
  };

  // Copy full trilingual entry to clipboard
  const handleCopyEntry = async (entry: ComprehensiveDictionaryEntry) => {
    const formatted = [
      `📘 MyStudyZone Trilingual Dictionary (100% Original Lexicon)`,
      `Word: ${entry.english} (${entry.partOfSpeech}) — [${entry.pronunciation}]`,
      `• मराठी शब्द: ${entry.marathiWord} | हिन्दी शब्द: ${entry.hindiWord}`,
      `• Simple Meaning (EN): ${entry.simpleMeaning.english}`,
      `• Detailed Meaning (EN): ${entry.detailedMeaning.english}`,
      `• मराठी अर्थ: ${entry.simpleMeaning.marathi}`,
      `• हिन्दी अर्थ: ${entry.simpleMeaning.hindi}`,
      `• Word Forms: ${entry.wordForms.derivedForms.join(', ')}`,
      `• Synonyms: EN: ${entry.synonyms.english.join(', ')} | MR: ${entry.synonyms.marathi.join(', ')} | HI: ${entry.synonyms.hindi.join(', ')}`,
      `• Antonyms: EN: ${entry.antonyms.english.join(', ')} | MR: ${entry.antonyms.marathi.join(', ')} | HI: ${entry.antonyms.hindi.join(', ')}`,
      `• Example (EN): ${entry.examples.english}`,
      `• उदाहरण (मराठी): ${entry.examples.marathi}`,
      `• उदाहरण (हिन्दी): ${entry.examples.hindi}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
    } catch {
      // Fallback
    }
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Share trilingual word entry
  const handleShareEntry = async (entry: ComprehensiveDictionaryEntry) => {
    const shareText = `📘 *${entry.english}* (${entry.pronunciation})\n🇬🇧 English: ${entry.simpleMeaning.english}\n🇮🇳 मराठी (${entry.marathiWord}): ${entry.simpleMeaning.marathi}\n🇮🇳 हिन्दी (${entry.hindiWord}): ${entry.simpleMeaning.hindi}\n— MyStudyZone Original Trilingual Dictionary`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${entry.english} — MyStudyZone Trilingual Dictionary`,
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setToastMessage(`Copied "${entry.english}" to clipboard for sharing!`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage(`Ready to share "${entry.english}"`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const isActiveWordFavourite = useMemo(
    () =>
      Boolean(
        activeWord &&
          favouriteWords.some((w) => w.toLowerCase() === activeWord.english.toLowerCase())
      ),
    [activeWord, favouriteWords]
  );

  const handleToggleFavourite = (englishWord: string) => {
    const updated = toggleFavouriteWord(englishWord);
    setFavouriteWords(updated);
  };

  // Handle Language Selector change
  const handleSelectLanguageMode = (mode: 'all' | DictionaryLanguage) => {
    setActiveLanguageTab(mode);
    if (mode === 'en') setActiveDirection('en-mr');
    else if (mode === 'mr') setActiveDirection('mr-en');
    else if (mode === 'hi') setActiveDirection('hi-en');
  };

  // Handle 6 Translation Direction selection
  const handleSelectDirection = (dir: TranslationDirection) => {
    setActiveDirection(dir);
    const meta = TRANSLATION_DIRECTIONS.find((d) => d.id === dir);
    if (meta) {
      setActiveLanguageTab(meta.sourceLang);
    }
  };

  // Save new original MyStudyZone word to Firebase-backed dictionary
  const handleSaveNewWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEnglish.trim() ||
      !newSimpleEn.trim() ||
      !newMarathiWord.trim() ||
      !newSimpleMr.trim() ||
      !newHindiWord.trim() ||
      !newSimpleHi.trim()
    ) {
      setAddFormError(
        'Please complete the English word, Marathi word, Hindi word, and meanings in all 3 languages.'
      );
      return;
    }

    const cleanWord = newEnglish.trim();
    const formattedEnglish = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);
    const baseEntry: TrilingualWordEntry = {
      id: `msz-orig-${Date.now()}-${formattedEnglish.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      english: formattedEnglish,
      pronunciation: newPronunciation.trim() || formattedEnglish.toLowerCase(),
      partOfSpeech: newPartOfSpeech,
      classGroup: newClassGroup,
      category: newCategory,
      englishMeaning: newSimpleEn.trim(),
      marathiWord: newMarathiWord.trim(),
      marathiMeaning: newSimpleMr.trim(),
      hindiWord: newHindiWord.trim(),
      hindiMeaning: newSimpleHi.trim(),
      synonyms: {
        english: newEnSyn
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        marathi: newMrSyn
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        hindi: newHiSyn
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      },
      antonyms: {
        english: newEnAnt
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        marathi: newMrAnt
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        hindi: newHiAnt
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      },
      examples: {
        english: newEnEx.trim() || `We studied the word "${formattedEnglish}" in class today.`,
        marathi: newMrEx.trim() || `आम्ही आज वर्गात "${newMarathiWord.trim()}" हा शब्द शिकलो.`,
        hindi: newHiEx.trim() || `हमने आज कक्षा में "${newHindiWord.trim()}" शब्द सीखा।`,
      },
      letter: formattedEnglish.charAt(0).toUpperCase(),
    };

    const derivedList = newWordFormsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = await saveNewOriginalDictionaryEntry(
      baseEntry,
      {
        english: newSimpleEn.trim(),
        marathi: newSimpleMr.trim(),
        hindi: newSimpleHi.trim(),
      },
      {
        english: newDetailedEn.trim() || newSimpleEn.trim(),
        marathi: newDetailedMr.trim() || newSimpleMr.trim(),
        hindi: newDetailedHi.trim() || newSimpleHi.trim(),
      },
      derivedList
    );

    setDictionaryEntries(updated);
    const created = updated.find(
      (w) => w.english.toLowerCase() === formattedEnglish.toLowerCase()
    );
    if (created) {
      setSearchQuery(created.english);
      handleOpenSingleWord(created, true);
    }

    setShowAddModal(false);
    setAddFormError(null);
    setNewEnglish('');
    setNewPronunciation('');
    setNewSimpleEn('');
    setNewDetailedEn('');
    setNewMarathiWord('');
    setNewSimpleMr('');
    setNewDetailedMr('');
    setNewHindiWord('');
    setNewSimpleHi('');
    setNewDetailedHi('');
    setNewEnSyn('');
    setNewMrSyn('');
    setNewHiSyn('');
    setNewEnAnt('');
    setNewMrAnt('');
    setNewHiAnt('');
    setNewEnEx('');
    setNewMrEx('');
    setNewHiEx('');
    setNewWordFormsText('');
    setToastMessage(
      `Original entry "${formattedEnglish}" added to MyStudyZone Firebase Dictionary!`
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeDirectionMeta =
    TRANSLATION_DIRECTIONS.find((d) => d.id === activeDirection) || TRANSLATION_DIRECTIONS[0];

  return (
    <div className="space-y-5 pb-10">
      {/* =====================================================================
          1. HERO HEADER BANNER (Preserving MyStudyZone Design)
          ===================================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white p-5 sm:p-6 shadow-xl border-2 border-amber-400/80">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-display font-bold transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Dashboard</span>
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-xs uppercase tracking-wider">
                <Languages className="w-3.5 h-3.5" />
                100% Original MyStudyZone Lexicon
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 font-display font-bold text-xs">
                <Database className="w-3.5 h-3.5" />
                {firebaseSynced ? 'Firebase Connected & Synced' : 'Firebase Lexicon Ready'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-white">
              English – Marathi – Hindi Dictionary{' '}
              <span className="text-amber-300">(त्रिभाषिक शब्दकोश)</span>
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed">
              Search any single word in <strong>English</strong>, <strong>मराठी (Marathi)</strong>, or{' '}
              <strong>हिन्दी (Hindi)</strong> across all 6 translation directions. View simple &amp;
              detailed student meanings, pronunciation with audio voice playback, word forms,
              synonyms, antonyms, and original example sentences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-center">
              <div className="text-xl sm:text-2xl font-display font-black text-amber-300">
                {dictionaryEntries.length.toLocaleString()}
              </div>
              <div className="text-[10px] font-bold text-sky-200 uppercase tracking-wider">
                Original Verified Words
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-[#0f2952] font-display font-black text-xs sm:text-sm shadow-md cursor-pointer transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Original Word</span>
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="rounded-2xl bg-emerald-600 text-white px-4 py-3 text-xs sm:text-sm font-display font-bold shadow-md flex items-center justify-between">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          2. THREE LANGUAGE SELECTORS + SIX TRANSLATION DIRECTIONS + ONE PROMINENT SEARCH BOX
          ===================================================================== */}
      <section
        aria-label="Single-Word Trilingual Search System"
        className="rounded-3xl bg-white border-2 border-sky-300 p-4 sm:p-6 shadow-md space-y-4"
      >
        {/* Three Language Selectors + Common All-Language Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-display font-black text-[#0f2952] uppercase tracking-wider mr-1">
              1. Select Dictionary:
            </span>
            {[
              { id: 'all' as const, label: 'All 3 Languages (Common Search)' },
              { id: 'en' as const, label: '🇬🇧 English Dictionary' },
              { id: 'mr' as const, label: '🇮🇳 मराठी शब्दकोश (Marathi)' },
              { id: 'hi' as const, label: '🇮🇳 हिन्दी शब्दकोश (Hindi)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectLanguageMode(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-display font-black transition cursor-pointer ${
                  activeLanguageTab === tab.id
                    ? 'bg-[#0f2952] text-amber-300 shadow-xs ring-2 ring-amber-400/60'
                    : 'bg-slate-100 hover:bg-sky-100 text-[#0f2952]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* All 6 Translation Directions */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-display font-black text-[#0f2952] uppercase tracking-wider flex items-center gap-1 mr-1">
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
            <span>2. Translation Direction:</span>
          </span>
          {TRANSLATION_DIRECTIONS.map((dir) => (
            <button
              key={dir.id}
              type="button"
              onClick={() => handleSelectDirection(dir.id)}
              title={dir.description}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                activeDirection === dir.id
                  ? 'bg-amber-400 text-[#0f2952] font-black shadow-2xs border border-[#0f2952]'
                  : 'bg-sky-50 hover:bg-sky-100 text-[#0f2952] border border-sky-200'
              }`}
            >
              {dir.shortLabel}
            </button>
          ))}
        </div>

        {/* Prominent Single-Word Search Box */}
        <div ref={searchContainerRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-[#0f2952] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setNoDirectMatchQuery(null);
                setShowSuggestions(true);
              }}
              placeholder={
                activeLanguageTab === 'mr'
                  ? 'कोणताही एक मराठी शब्द शोधा (उदा. ज्ञान, क्षमता, त्वरण, संविधान, करुणा किंवा dnyan, kshamata)...'
                  : activeLanguageTab === 'hi'
                  ? 'कोई भी एक हिन्दी शब्द खोजें (उदा. ज्ञान, योग्यता, त्वरण, संविधान, करुणा या gyan, sahas)...'
                  : 'Search any single word in English, मराठी or हिन्दी (e.g. Ability, Acceleration, ज्ञान, क्षमता, साहस)...'
              }
              className="w-full pl-12 pr-44 py-4 rounded-2xl bg-slate-50 focus:bg-white border-2 border-[#0f2952] text-sm sm:text-base font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-300/50 shadow-inner"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setNoDirectMatchQuery(null);
                    setShowSuggestions(false);
                  }}
                  aria-label="Clear search"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-display font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs sm:text-sm shadow-xs cursor-pointer transition"
              >
                Search Word
              </button>
            </div>
          </form>

          {/* Live Matching Suggestions & Spelling Suggestions Dropdown while typing */}
          {showSuggestions &&
            searchQuery.trim().length > 0 &&
            (directMatches.length > 0 || spellingSuggestions.length > 0) && (
              <div className="absolute z-30 left-0 right-0 mt-1.5 rounded-2xl bg-white border-2 border-[#0f2952] shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
                {directMatches.length > 0 && (
                  <div>
                    <div className="px-4 py-2 bg-[#0f2952] text-white flex items-center justify-between text-[11px] font-display font-black uppercase tracking-wider">
                      <span>Matching Word Suggestions ({directMatches.length})</span>
                      <span className="text-amber-300">Click or Press Enter to Open Word</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {directMatches.map(({ entry, matchType }) => (
                        <button
                          key={`sug-${entry.id}`}
                          type="button"
                          onClick={() => {
                            setSearchQuery(entry.english);
                            handleOpenSingleWord(entry, true);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-sky-50 flex flex-wrap items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-display font-black text-sm sm:text-base text-[#0f2952]">
                              {entry.english}
                            </span>
                            <span className="text-xs text-slate-500">({entry.pronunciation})</span>
                            <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold text-[10px]">
                              {entry.partOfSpeech}
                            </span>
                            {matchType === 'exact' && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-black text-[10px]">
                                Exact Match
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 text-xs">
                            <span className="font-bold text-amber-950 bg-amber-100 px-2.5 py-1 rounded-lg">
                              मराठी: {entry.marathiWord}
                            </span>
                            <span className="font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-lg">
                              हिन्दी: {entry.hindiWord}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spelling Suggestions when user types an incorrect spelling */}
                {spellingSuggestions.length > 0 && (
                  <div className="border-t border-amber-200 bg-amber-50/70">
                    <div className="px-4 py-2 bg-amber-100 text-amber-950 flex items-center justify-between text-[11px] font-display font-black uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Did you mean (Spelling Suggestions):
                      </span>
                      <span>Click to Open Corrected Word</span>
                    </div>
                    <div className="divide-y divide-amber-100">
                      {spellingSuggestions.map(({ entry }) => (
                        <button
                          key={`spell-${entry.id}`}
                          type="button"
                          onClick={() => {
                            setSearchQuery(entry.english);
                            handleOpenSingleWord(entry, true);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-amber-100/70 flex flex-wrap items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-sm text-[#0f2952] underline">
                              {entry.english}
                            </span>
                            <span className="text-xs text-slate-600">({entry.pronunciation})</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-amber-900">मराठी: {entry.marathiWord}</span>
                            <span>•</span>
                            <span className="text-emerald-900">हिन्दी: {entry.hindiWord}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Spelling Correction / Not Found Notice */}
        {noDirectMatchQuery && (
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-display font-black text-[#0f2952]">
                No exact match for “{noDirectMatchQuery}”.
                {spellingSuggestions.length > 0
                  ? ' Showing the closest spelling suggestion below, or choose one of these close matches:'
                  : ' You can add this word to the expandable MyStudyZone Firebase Dictionary:'}
              </p>
              {spellingSuggestions.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {spellingSuggestions.map(({ entry }) => (
                    <button
                      key={`inline-spell-${entry.id}`}
                      type="button"
                      onClick={() => {
                        setSearchQuery(entry.english);
                        handleOpenSingleWord(entry, true);
                      }}
                      className="px-3 py-1 rounded-xl bg-white hover:bg-amber-200 text-[#0f2952] border border-amber-400 font-display font-black text-xs cursor-pointer"
                    >
                      {entry.english} ({entry.marathiWord} / {entry.hindiWord})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setNewEnglish(noDirectMatchQuery);
                setShowAddModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#0f2952] text-amber-300 font-display font-black text-xs cursor-pointer"
            >
              + Add “{noDirectMatchQuery}”
            </button>
          </div>
        )}

        {/* Recently Searched Words, Favourite Words & Today's 5 Daily Words (Single-Word Quick Open Chips) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 pt-1">
          {/* Today's 5 Daily Vocabulary Words */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-display font-black text-amber-950 uppercase">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Today’s Daily Vocabulary:
              </span>
              <span>Click 1 Word</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {dailyVocabulary.map((dw) => (
                <button
                  key={`chip-daily-${dw.id}`}
                  type="button"
                  onClick={() => {
                    setSearchQuery(dw.english);
                    handleOpenSingleWord(dw, true);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                    activeWord?.id === dw.id
                      ? 'bg-[#0f2952] text-amber-300 shadow-2xs'
                      : 'bg-white hover:bg-amber-100 text-[#0f2952] border border-amber-300'
                  }`}
                >
                  {dw.english} ({dw.marathiWord})
                </button>
              ))}
            </div>
          </div>

          {/* Recently Searched Words */}
          <div className="rounded-2xl bg-sky-50/70 border border-sky-200 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-display font-black text-sky-950 uppercase">
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-sky-700" />
                Recently Searched ({recentWords.length}):
              </span>
              {recentWords.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRecentWords(clearRecentSearchedWords())}
                  className="text-[10px] text-rose-700 hover:underline font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            {recentWords.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                Words you search will appear here for quick one-click review.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                {recentWords.slice(0, 7).map((rw) => (
                  <button
                    key={`recent-${rw}`}
                    type="button"
                    onClick={() => handleJumpByWordText(rw)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                      activeWord?.english.toLowerCase() === rw.toLowerCase()
                        ? 'bg-[#0f2952] text-amber-300'
                        : 'bg-white hover:bg-sky-100 text-[#0f2952] border border-sky-200'
                    }`}
                  >
                    {rw}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favourite Words */}
          <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-display font-black text-emerald-950 uppercase">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                Favourite Words ({favouriteWords.length}):
              </span>
              <span>Saved</span>
            </div>
            {favouriteWords.length === 0 ? (
              <p className="text-[11px] text-slate-500">
                Click “Favourite” on any word below to bookmark important vocabulary.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                {favouriteWords.slice(0, 8).map((fw) => (
                  <button
                    key={`fav-${fw}`}
                    type="button"
                    onClick={() => handleJumpByWordText(fw)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                      activeWord?.english.toLowerCase() === fw.toLowerCase()
                        ? 'bg-[#0f2952] text-amber-300'
                        : 'bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300'
                    }`}
                  >
                    ★ {fw}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Compact A–Z Single-Word Quick Selector */}
        <div className="pt-2 border-t border-slate-200/80 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-display font-black text-[#0f2952] uppercase tracking-wider">
              Alphabetical Single-Word Quick Jump (A–Z):
            </span>
            {activeLetterChip && (
              <button
                type="button"
                onClick={() => setActiveLetterChip(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Hide Letter {activeLetterChip} Word Chips
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto sm:flex-wrap pb-1 no-scrollbar">
            {ALPHABET_LETTERS.map((letter) => {
              const isSelected = activeLetterChip === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => {
                    setActiveLetterChip((prev) => (prev === letter ? null : letter));
                    const firstForLetter = dictionaryEntries.find((w) => w.letter === letter);
                    if (firstForLetter) {
                      handleOpenSingleWord(firstForLetter, false);
                    }
                  }}
                  className={`min-w-[34px] h-8 px-2 rounded-xl font-display font-black text-xs shrink-0 flex items-center justify-center transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f2952] text-amber-300 shadow-xs ring-2 ring-amber-400'
                      : 'bg-slate-100 hover:bg-sky-100 text-[#0f2952]'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {activeLetterChip && wordsForActiveLetter.length > 0 && (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
              <div className="text-[11px] font-display font-black text-[#0f2952] uppercase">
                Select One Word Starting With “{activeLetterChip}” ({wordsForActiveLetter.length}{' '}
                words):
              </div>
              <div className="flex flex-wrap items-center gap-1.5 max-h-28 overflow-y-auto">
                {wordsForActiveLetter.map((w) => (
                  <button
                    key={`letter-chip-${w.id}`}
                    type="button"
                    onClick={() => {
                      setSearchQuery(w.english);
                      handleOpenSingleWord(w, true);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                      activeWord?.id === w.id
                        ? 'bg-[#0f2952] text-amber-300 shadow-2xs'
                        : 'bg-white hover:bg-sky-100 text-[#0f2952] border border-slate-300'
                    }`}
                  >
                    {w.english} ({w.marathiWord})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. SINGLE-WORD DETAIL PAGE (Displays ONLY the One Selected Word)
          ===================================================================== */}
      {activeWord && (
        <article
          aria-label={`Word Detail Page for ${activeWord.english}`}
          className="rounded-3xl bg-white border-2 border-[#0f2952] shadow-xl overflow-hidden"
        >
          {/* Top Navigation Bar: Previous Word • Active Direction Badge • Next Word */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
            {prevWord ? (
              <button
                type="button"
                onClick={() => handleOpenSingleWord(prevWord, false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-[#0f2952] border border-slate-300 font-display font-black text-xs cursor-pointer transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevWord.english}</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2 text-xs font-display font-black text-[#0f2952]">
              <span className="px-3 py-1 rounded-full bg-amber-300/80 text-[#0f2952]">
                Active Mode: {activeDirectionMeta.label}
              </span>
              <span className="hidden sm:inline text-slate-500">
                Word {activeWordIndex + 1} of {dictionaryEntries.length.toLocaleString()}
              </span>
            </div>

            {nextWord ? (
              <button
                type="button"
                onClick={() => handleOpenSingleWord(nextWord, false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs cursor-pointer transition"
              >
                <span>Next: {nextWord.english}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span />
            )}
          </div>

          {/* Primary Word Header Banner */}
          <div className="bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-2xl sm:text-4xl font-display font-black text-amber-300 tracking-tight">
                    {activeDirectionMeta.sourceLang === 'mr'
                      ? `${activeWord.marathiWord} (${activeWord.english})`
                      : activeDirectionMeta.sourceLang === 'hi'
                      ? `${activeWord.hindiWord} (${activeWord.english})`
                      : activeWord.english}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-white/15 text-white font-display font-black text-xs uppercase">
                    {activeWord.partOfSpeech}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-xs">
                    {activeWord.classGroup}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-400/20 border border-sky-300/40 text-sky-200 font-display font-bold text-xs">
                    {activeWord.category}
                  </span>
                </div>

                {/* Pronunciation & Direct Trilingual Headword Equivalents */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-sky-100">
                  <div>
                    <span className="text-sky-300 font-semibold">Pronunciation:</span>{' '}
                    <strong className="text-white font-bold">{activeWord.pronunciation}</strong>
                  </div>
                  <div>
                    <span className="text-amber-300 font-semibold">मराठी शब्द:</span>{' '}
                    <strong className="text-white text-base">{activeWord.marathiWord}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-300 font-semibold">हिन्दी शब्द:</span>{' '}
                    <strong className="text-white text-base">{activeWord.hindiWord}</strong>
                  </div>
                </div>
              </div>

              {/* Audio Voice Playback, Favourite, Copy & Share Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeak(activeWord.english, 'en-IN')}
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-display font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>Listen EN</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(
                      `${activeWord.marathiWord}. ${activeWord.simpleMeaning.marathi}`,
                      'mr-IN'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-display font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>मराठी उच्चार</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(
                      `${activeWord.hindiWord}. ${activeWord.simpleMeaning.hindi}`,
                      'hi-IN'
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-display font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>हिन्दी उच्चारण</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFavourite(activeWord.english)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-display font-black inline-flex items-center gap-1.5 cursor-pointer transition ${
                    isActiveWordFavourite
                      ? 'bg-amber-400 text-[#0f2952]'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      isActiveWordFavourite ? 'fill-[#0f2952] text-[#0f2952]' : 'text-amber-300'
                    }`}
                  />
                  <span>{isActiveWordFavourite ? 'Saved Favourite' : 'Favourite'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyEntry(activeWord)}
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-display font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === activeWord.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleShareEntry(activeWord)}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-display font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Word Detail Content Body */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* A. THREE-LANGUAGE TRANSLATIONS, SIMPLE MEANINGS & DETAILED MEANINGS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 1. English Simple & Detailed Meaning */}
              <div
                className={`rounded-2xl p-4 space-y-3 border-2 ${
                  activeDirectionMeta.targetLang === 'en' || activeDirectionMeta.sourceLang === 'en'
                    ? 'bg-sky-50/90 border-sky-400 shadow-xs'
                    : 'bg-sky-50/50 border-sky-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                  <span className="text-xs font-display font-black text-sky-950 uppercase tracking-wider">
                    🇬🇧 English Meaning
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-sky-200 text-sky-950 font-black text-xs">
                    {activeWord.english}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-display font-black text-sky-800 uppercase">
                    Simple Meaning (सोपा अर्थ):
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {activeWord.simpleMeaning.english}
                  </p>
                </div>
                <div className="pt-2 border-t border-sky-200/60">
                  <div className="text-[11px] font-display font-black text-sky-800 uppercase">
                    Detailed Meaning (सविस्तर स्पष्टीकरण):
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                    {activeWord.detailedMeaning.english}
                  </p>
                </div>
              </div>

              {/* 2. Marathi Translation, Simple & Detailed Meaning */}
              <div
                className={`rounded-2xl p-4 space-y-3 border-2 ${
                  activeDirectionMeta.targetLang === 'mr' || activeDirectionMeta.sourceLang === 'mr'
                    ? 'bg-amber-50/90 border-amber-400 shadow-xs'
                    : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="text-xs font-display font-black text-amber-950 uppercase tracking-wider">
                    🇮🇳 Marathi Translation (मराठी अर्थ)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-300 text-amber-950 font-black text-sm">
                    {activeWord.marathiWord}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-display font-black text-amber-900 uppercase">
                    सोपा मराठी अर्थ (Simple Meaning):
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {activeWord.simpleMeaning.marathi}
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-200/60">
                  <div className="text-[11px] font-display font-black text-amber-900 uppercase">
                    सविस्तर मराठी अर्थ (Detailed Meaning):
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-0.5">
                    {activeWord.detailedMeaning.marathi}
                  </p>
                </div>
              </div>

              {/* 3. Hindi Translation, Simple & Detailed Meaning */}
              <div
                className={`rounded-2xl p-4 space-y-3 border-2 ${
                  activeDirectionMeta.targetLang === 'hi' || activeDirectionMeta.sourceLang === 'hi'
                    ? 'bg-emerald-50/90 border-emerald-400 shadow-xs'
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-xs font-display font-black text-emerald-950 uppercase tracking-wider">
                    🇮🇳 Hindi Translation (हिन्दी अर्थ)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-300 text-emerald-950 font-black text-sm">
                    {activeWord.hindiWord}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-display font-black text-emerald-900 uppercase">
                    सरल हिन्दी अर्थ (Simple Meaning):
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {activeWord.simpleMeaning.hindi}
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-200/60">
                  <div className="text-[11px] font-display font-black text-emerald-900 uppercase">
                    विस्तृत हिन्दी अर्थ (Detailed Meaning):
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-0.5">
                    {activeWord.detailedMeaning.hindi}
                  </p>
                </div>
              </div>
            </div>

            {/* B. WORD FORMS (Inflections, Tenses, Plurals & Grammatical Variations) */}
            <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-display font-black text-[#0f2952] uppercase tracking-wider">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Word Forms &amp; Grammatical Variations (शब्दाची विविध रूपे)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-white border border-slate-200 p-3 space-y-1">
                  <div className="font-display font-black text-sky-900 uppercase text-[11px]">
                    English Word Forms:
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-950 font-bold">
                      Base: {activeWord.wordForms.baseForm}
                    </span>
                    {activeWord.wordForms.derivedForms.map((df) => (
                      <span
                        key={df}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold"
                      >
                        {df}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3 space-y-1">
                  <div className="font-display font-black text-amber-900 uppercase text-[11px]">
                    मराठी शब्दरूपे (Marathi Forms):
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeWord.wordForms.marathiForms.map((mf) => (
                      <span
                        key={mf}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold"
                      >
                        {mf}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3 space-y-1">
                  <div className="font-display font-black text-emerald-900 uppercase text-[11px]">
                    हिन्दी शब्द-रूप (Hindi Forms):
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeWord.wordForms.hindiForms.map((hf) => (
                      <span
                        key={hf}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 font-bold"
                      >
                        {hf}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* C. SYNONYMS & ANTONYMS IN ALL 3 LANGUAGES (Clickable to jump to related words) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Synonyms */}
              <div className="rounded-2xl bg-indigo-50/50 border-2 border-indigo-200 p-4 space-y-2.5">
                <div className="text-xs font-display font-black text-indigo-950 uppercase tracking-wider">
                  Synonyms (समानार्थी शब्द • पर्यायवाची शब्द)
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-sky-900 min-w-[60px]">English:</strong>
                    {activeWord.synonyms.english.map((syn) => (
                      <button
                        key={`syn-en-${syn}`}
                        type="button"
                        onClick={() => handleJumpByWordText(syn)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-100 text-[#0f2952] border border-indigo-200 font-bold text-xs cursor-pointer transition"
                      >
                        {syn}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-amber-900 min-w-[60px]">मराठी:</strong>
                    {activeWord.synonyms.marathi.map((syn) => (
                      <button
                        key={`syn-mr-${syn}`}
                        type="button"
                        onClick={() => handleJumpByWordText(syn)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs cursor-pointer transition"
                      >
                        {syn}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-emerald-900 min-w-[60px]">हिन्दी:</strong>
                    {activeWord.synonyms.hindi.map((syn) => (
                      <button
                        key={`syn-hi-${syn}`}
                        type="button"
                        onClick={() => handleJumpByWordText(syn)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold text-xs cursor-pointer transition"
                      >
                        {syn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Antonyms */}
              <div className="rounded-2xl bg-rose-50/50 border-2 border-rose-200 p-4 space-y-2.5">
                <div className="text-xs font-display font-black text-rose-950 uppercase tracking-wider">
                  Antonyms (विरुद्धार्थी शब्द • विलोम शब्द)
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-sky-900 min-w-[60px]">English:</strong>
                    {activeWord.antonyms.english.map((ant) => (
                      <button
                        key={`ant-en-${ant}`}
                        type="button"
                        onClick={() => handleJumpByWordText(ant)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-100 text-rose-950 border border-rose-200 font-bold text-xs cursor-pointer transition"
                      >
                        {ant}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-amber-900 min-w-[60px]">मराठी:</strong>
                    {activeWord.antonyms.marathi.map((ant) => (
                      <button
                        key={`ant-mr-${ant}`}
                        type="button"
                        onClick={() => handleJumpByWordText(ant)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs cursor-pointer transition"
                      >
                        {ant}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-emerald-900 min-w-[60px]">हिन्दी:</strong>
                    {activeWord.antonyms.hindi.map((ant) => (
                      <button
                        key={`ant-hi-${ant}`}
                        type="button"
                        onClick={() => handleJumpByWordText(ant)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold text-xs cursor-pointer transition"
                      >
                        {ant}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* D. TRILINGUAL EXAMPLE SENTENCES */}
            <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-amber-50 border-2 border-sky-200 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-black text-[#0f2952] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Example Sentences in All 3 Languages (उदाहरण वाक्य)</span>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="rounded-xl bg-white border border-sky-200 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-sky-900 text-xs uppercase">🇬🇧 English Sentence</strong>
                    <button
                      type="button"
                      onClick={() => handleSpeak(activeWord.examples.english, 'en-IN')}
                      className="p-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0f2952] cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900">“{activeWord.examples.english}”</p>
                </div>

                <div className="rounded-xl bg-white border border-amber-200 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-amber-900 text-xs uppercase">🇮🇳 मराठी वाक्य</strong>
                    <button
                      type="button"
                      onClick={() => handleSpeak(activeWord.examples.marathi, 'mr-IN')}
                      className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#0f2952] cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900">“{activeWord.examples.marathi}”</p>
                </div>

                <div className="rounded-xl bg-white border border-emerald-200 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-emerald-900 text-xs uppercase">🇮🇳 हिन्दी वाक्य</strong>
                    <button
                      type="button"
                      onClick={() => handleSpeak(activeWord.examples.hindi, 'hi-IN')}
                      className="p-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0f2952] cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900">“{activeWord.examples.hindi}”</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Previous / Next Navigation & Source Attribution Footer */}
          <div className="bg-slate-100 border-t border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            {prevWord ? (
              <button
                type="button"
                onClick={() => handleOpenSingleWord(prevWord, false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sky-50 text-[#0f2952] border border-slate-300 font-display font-black text-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Word ({prevWord.english})</span>
              </button>
            ) : (
              <span />
            )}

            <span className="text-[11px] font-bold text-slate-600 text-center">
              Source: {activeWord.sourceAttribution}
            </span>

            {nextWord ? (
              <button
                type="button"
                onClick={() => handleOpenSingleWord(nextWord, false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs cursor-pointer"
              >
                <span>Next Word ({nextWord.english})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span />
            )}
          </div>
        </article>
      )}

      {/* =====================================================================
          4. ADD NEW ORIGINAL WORD MODAL (FIREBASE-BACKED EXPANDABLE DATABASE)
          ===================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-2 border-[#0f2952] max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-display font-black text-[#0f2952]">
                  Add Original Word to MyStudyZone Firebase Dictionary
                </h2>
                <p className="text-xs text-slate-600">
                  Write original English, Marathi, and Hindi meanings, pronunciations, and example
                  sentences.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addFormError && (
              <div className="rounded-xl bg-rose-50 border border-rose-300 text-rose-800 px-3.5 py-2.5 text-xs font-bold">
                {addFormError}
              </div>
            )}

            <form onSubmit={handleSaveNewWord} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Word *</label>
                  <input
                    type="text"
                    required
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    placeholder="e.g. Resilience"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Pronunciation (Phonetic / Devanagari)
                  </label>
                  <input
                    type="text"
                    value={newPronunciation}
                    onChange={(e) => setNewPronunciation(e.target.value)}
                    placeholder="e.g. ri-ZIL-yuhns (रिझिलियन्स)"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Part of Speech</label>
                  <select
                    value={newPartOfSpeech}
                    onChange={(e) => setNewPartOfSpeech(e.target.value as DictionaryPartOfSpeech)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 font-semibold"
                  >
                    {PARTS_OF_SPEECH.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class Level</label>
                  <select
                    value={newClassGroup}
                    onChange={(e) => setNewClassGroup(e.target.value as DictionaryClassGroup)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 font-semibold"
                  >
                    <option value="Classes 1–3">Classes 1–3</option>
                    <option value="Classes 4–6">Classes 4–6</option>
                    <option value="Classes 7–10">Classes 7–10</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Academic Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as DictionaryTopicCategory)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 font-semibold"
                  >
                    {TOPIC_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sky-900 block mb-1">
                    Simple English Meaning *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSimpleEn}
                    onChange={(e) => setNewSimpleEn(e.target.value)}
                    placeholder="Simple 1-sentence student meaning..."
                    className="w-full rounded-xl border border-sky-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-sky-900 block mb-1">
                    Detailed English Explanation
                  </label>
                  <input
                    type="text"
                    value={newDetailedEn}
                    onChange={(e) => setNewDetailedEn(e.target.value)}
                    placeholder="Detailed academic explanation..."
                    className="w-full rounded-xl border border-sky-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-amber-900 block mb-1">
                    मराठी शब्द (Marathi Word) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMarathiWord}
                    onChange={(e) => setNewMarathiWord(e.target.value)}
                    placeholder="उदा. लवचिकता / चिकाटी"
                    className="w-full rounded-xl border border-amber-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-900 block mb-1">
                    सोपा मराठी अर्थ (Simple) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSimpleMr}
                    onChange={(e) => setNewSimpleMr(e.target.value)}
                    placeholder="मराठीत सोपा अर्थ..."
                    className="w-full rounded-xl border border-amber-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-900 block mb-1">
                    सविस्तर मराठी अर्थ (Detailed)
                  </label>
                  <input
                    type="text"
                    value={newDetailedMr}
                    onChange={(e) => setNewDetailedMr(e.target.value)}
                    placeholder="मराठीत सविस्तर स्पष्टीकरण..."
                    className="w-full rounded-xl border border-amber-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-emerald-900 block mb-1">
                    हिन्दी शब्द (Hindi Word) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newHindiWord}
                    onChange={(e) => setNewHindiWord(e.target.value)}
                    placeholder="उदा. लचीलापन / जूझारूपन"
                    className="w-full rounded-xl border border-emerald-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900 block mb-1">
                    सरल हिन्दी अर्थ (Simple) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSimpleHi}
                    onChange={(e) => setNewSimpleHi(e.target.value)}
                    placeholder="हिन्दी में सरल अर्थ..."
                    className="w-full rounded-xl border border-emerald-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900 block mb-1">
                    विस्तृत हिन्दी अर्थ (Detailed)
                  </label>
                  <input
                    type="text"
                    value={newDetailedHi}
                    onChange={(e) => setNewDetailedHi(e.target.value)}
                    placeholder="हिन्दी में विस्तृत व्याख्या..."
                    className="w-full rounded-xl border border-emerald-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Word Forms (comma-separated, optional)
                </label>
                <input
                  type="text"
                  value={newWordFormsText}
                  onChange={(e) => setNewWordFormsText(e.target.value)}
                  placeholder="e.g. Resilient (Adjective), Resiliently (Adverb)"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    English Synonyms (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newEnSyn}
                    onChange={(e) => setNewEnSyn(e.target.value)}
                    placeholder="Toughness, Grit"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">मराठी समानार्थी</label>
                  <input
                    type="text"
                    value={newMrSyn}
                    onChange={(e) => setNewMrSyn(e.target.value)}
                    placeholder="मनोधैर्य, चिकाटी"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिन्दी पर्यायवाची</label>
                  <input
                    type="text"
                    value={newHiSyn}
                    onChange={(e) => setNewHiSyn(e.target.value)}
                    placeholder="दृढ़ता, सहनशक्ति"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Antonyms</label>
                  <input
                    type="text"
                    value={newEnAnt}
                    onChange={(e) => setNewEnAnt(e.target.value)}
                    placeholder="Fragility, Weakness"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">मराठी विरुद्धार्थी</label>
                  <input
                    type="text"
                    value={newMrAnt}
                    onChange={(e) => setNewMrAnt(e.target.value)}
                    placeholder="दुर्बलता, कमकुवतपणा"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिन्दी विलोम</label>
                  <input
                    type="text"
                    value={newHiAnt}
                    onChange={(e) => setNewHiAnt(e.target.value)}
                    placeholder="कमज़ोरी, भंगुरता"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    English Example Sentence
                  </label>
                  <input
                    type="text"
                    value={newEnEx}
                    onChange={(e) => setNewEnEx(e.target.value)}
                    placeholder="Original English sentence..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">मराठी उदाहरण वाक्य</label>
                  <input
                    type="text"
                    value={newMrEx}
                    onChange={(e) => setNewMrEx(e.target.value)}
                    placeholder="मराठी वाक्य..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिन्दी उदाहरण वाक्य</label>
                  <input
                    type="text"
                    value={newHiEx}
                    onChange={(e) => setNewHiEx(e.target.value)}
                    placeholder="हिन्दी वाक्य..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black cursor-pointer"
                >
                  Save Original Word to Firebase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
