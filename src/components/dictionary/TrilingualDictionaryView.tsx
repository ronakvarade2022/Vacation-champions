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
  Filter,
  GraduationCap,
  Languages,
  BookmarkCheck,
} from 'lucide-react';
import {
  TrilingualWordEntry,
  DictionaryClassGroup,
  DictionaryTopicCategory,
  DictionaryPartOfSpeech,
  loadTrilingualDictionaryEntries,
  saveCustomDictionaryEntry,
  getDailyVocabularyWords,
} from '../../data/trilingualDictionaryData';

interface TrilingualDictionaryViewProps {
  onBack?: () => void;
  initialSearchQuery?: string;
}

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CLASS_GROUPS: Array<'All' | DictionaryClassGroup> = [
  'All',
  'Classes 1–3',
  'Classes 4–6',
  'Classes 7–10',
];

const TOPIC_CATEGORIES: Array<'All' | DictionaryTopicCategory> = [
  'All',
  'Academic & School',
  'Science & Nature',
  'Mathematics & Logic',
  'History, Civics & Geography',
  'Values, Character & Emotions',
  'Daily Life & Communication',
  'Action Verbs & Grammar',
];

const PARTS_OF_SPEECH: DictionaryPartOfSpeech[] = [
  'Noun',
  'Verb',
  'Adjective',
  'Adverb',
  'Preposition',
  'Conjunction',
];

export const TrilingualDictionaryView: React.FC<TrilingualDictionaryViewProps> = ({
  onBack,
  initialSearchQuery = '',
}) => {
  const [dictionaryEntries, setDictionaryEntries] = useState<TrilingualWordEntry[]>(() =>
    loadTrilingualDictionaryEntries()
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedClassGroup, setSelectedClassGroup] = useState<'All' | DictionaryClassGroup>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DictionaryTopicCategory>('All');
  const [selectedLanguageMode, setSelectedLanguageMode] = useState<'all' | 'en' | 'mr' | 'hi'>('all');
  const [highlightedWordId, setHighlightedWordId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedToast, setSharedToast] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Add Word Modal State (Scalable Dictionary Database Expansion)
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newEnglish, setNewEnglish] = useState('');
  const [newPronunciation, setNewPronunciation] = useState('');
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<DictionaryPartOfSpeech>('Noun');
  const [newClassGroup, setNewClassGroup] = useState<DictionaryClassGroup>('Classes 4–6');
  const [newCategory, setNewCategory] = useState<DictionaryTopicCategory>('Academic & School');
  const [newEnglishMeaning, setNewEnglishMeaning] = useState('');
  const [newMarathiWord, setNewMarathiWord] = useState('');
  const [newMarathiMeaning, setNewMarathiMeaning] = useState('');
  const [newHindiWord, setNewHindiWord] = useState('');
  const [newHindiMeaning, setNewHindiMeaning] = useState('');
  const [newEnSyn, setNewEnSyn] = useState('');
  const [newMrSyn, setNewMrSyn] = useState('');
  const [newHiSyn, setNewHiSyn] = useState('');
  const [newEnAnt, setNewEnAnt] = useState('');
  const [newMrAnt, setNewMrAnt] = useState('');
  const [newHiAnt, setNewHiAnt] = useState('');
  const [newEnEx, setNewEnEx] = useState('');
  const [newMrEx, setNewMrEx] = useState('');
  const [newHiEx, setNewHiEx] = useState('');
  const [addFormError, setAddFormError] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // Daily 5 Vocabulary words rotated automatically every calendar day
  const dailyVocabulary = useMemo(
    () => getDailyVocabularyWords(dictionaryEntries, new Date(), 5),
    [dictionaryEntries]
  );

  // Count per alphabet letter
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const letter of ALPHABET_LETTERS) counts[letter] = 0;
    for (const item of dictionaryEntries) {
      const l = item.letter.toUpperCase();
      if (counts[l] !== undefined) counts[l]++;
    }
    return counts;
  }, [dictionaryEntries]);

  // Match helper across English, Marathi, and Hindi
  const matchesQuery = (entry: TrilingualWordEntry, rawQuery: string): boolean => {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return true;

    const matchEn =
      entry.english.toLowerCase().includes(q) ||
      entry.englishMeaning.toLowerCase().includes(q) ||
      entry.synonyms.english.some((s) => s.toLowerCase().includes(q)) ||
      entry.antonyms.english.some((a) => a.toLowerCase().includes(q));

    const matchMr =
      entry.marathiWord.toLowerCase().includes(q) ||
      entry.marathiMeaning.toLowerCase().includes(q) ||
      entry.synonyms.marathi.some((s) => s.toLowerCase().includes(q)) ||
      entry.antonyms.marathi.some((a) => a.toLowerCase().includes(q));

    const matchHi =
      entry.hindiWord.toLowerCase().includes(q) ||
      entry.hindiMeaning.toLowerCase().includes(q) ||
      entry.synonyms.hindi.some((s) => s.toLowerCase().includes(q)) ||
      entry.antonyms.hindi.some((a) => a.toLowerCase().includes(q));

    if (selectedLanguageMode === 'en') return matchEn;
    if (selectedLanguageMode === 'mr') return matchMr;
    if (selectedLanguageMode === 'hi') return matchHi;
    return matchEn || matchMr || matchHi;
  };

  // Instant search suggestions (top 8 best matches as user types)
  const instantSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const scored = dictionaryEntries
      .filter((entry) => matchesQuery(entry, q))
      .map((entry) => {
        let score = 0;
        if (entry.english.toLowerCase() === q) score += 100;
        else if (entry.english.toLowerCase().startsWith(q)) score += 60;
        if (entry.marathiWord.toLowerCase().includes(q)) score += 70;
        if (entry.hindiWord.toLowerCase().includes(q)) score += 70;
        if (entry.synonyms.english.some((s) => s.toLowerCase().startsWith(q))) score += 30;
        if (entry.synonyms.marathi.some((s) => s.includes(q))) score += 35;
        if (entry.synonyms.hindi.some((s) => s.includes(q))) score += 35;
        return { entry, score };
      })
      .sort((a, b) => b.score - a.score || a.entry.english.localeCompare(b.entry.english));

    return scored.slice(0, 8).map((s) => s.entry);
  }, [dictionaryEntries, searchQuery, selectedLanguageMode]);

  // Filtered dictionary entries
  const filteredEntries = useMemo(() => {
    return dictionaryEntries.filter((entry) => {
      if (highlightedWordId && entry.id === highlightedWordId) return true;
      if (selectedLetter !== 'ALL' && entry.letter !== selectedLetter) return false;
      if (selectedClassGroup !== 'All' && entry.classGroup !== selectedClassGroup) return false;
      if (selectedCategory !== 'All' && entry.category !== selectedCategory) return false;
      return matchesQuery(entry, searchQuery);
    });
  }, [
    dictionaryEntries,
    selectedLetter,
    selectedClassGroup,
    selectedCategory,
    searchQuery,
    selectedLanguageMode,
    highlightedWordId,
  ]);

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
  const handleCopyEntry = async (entry: TrilingualWordEntry) => {
    const formatted = [
      `📘 MyStudyZone Trilingual Dictionary`,
      `Word: ${entry.english} (${entry.partOfSpeech}) — [${entry.pronunciation}]`,
      `• English Meaning: ${entry.englishMeaning}`,
      `• मराठी अर्थ (${entry.marathiWord}): ${entry.marathiMeaning}`,
      `• हिन्दी अर्थ (${entry.hindiWord}): ${entry.hindiMeaning}`,
      `• Synonyms: EN: ${entry.synonyms.english.join(', ')} | MR: ${entry.synonyms.marathi.join(', ')} | HI: ${entry.synonyms.hindi.join(', ')}`,
      `• Antonyms: EN: ${entry.antonyms.english.join(', ')} | MR: ${entry.antonyms.marathi.join(', ')} | HI: ${entry.antonyms.hindi.join(', ')}`,
      `• Example (EN): ${entry.examples.english}`,
      `• उदाहरण (मराठी): ${entry.examples.marathi}`,
      `• उदाहरण (हिन्दी): ${entry.examples.hindi}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Share trilingual word entry
  const handleShareEntry = async (entry: TrilingualWordEntry) => {
    const shareText = `📘 *${entry.english}* (${entry.pronunciation})\n🇬🇧 English: ${entry.englishMeaning}\n🇮🇳 मराठी (${entry.marathiWord}): ${entry.marathiMeaning}\n🇮🇳 हिन्दी (${entry.hindiWord}): ${entry.hindiMeaning}\n— MyStudyZone Trilingual Dictionary`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${entry.english} — English-Marathi-Hindi Dictionary`,
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setSharedToast(`Copied "${entry.english}" for sharing!`);
      setTimeout(() => setSharedToast(null), 3000);
    } catch {
      setSharedToast(`Ready to share "${entry.english}"`);
      setTimeout(() => setSharedToast(null), 3000);
    }
  };

  const handleSelectSuggestion = (entry: TrilingualWordEntry) => {
    setSearchQuery(entry.english);
    setSelectedLetter('ALL');
    setSelectedClassGroup('All');
    setSelectedCategory('All');
    setHighlightedWordId(null);
    setShowSuggestions(false);
  };

  const handleSelectDailyWord = (entry: TrilingualWordEntry) => {
    setSearchQuery(entry.english);
    setSelectedLetter('ALL');
    setSelectedClassGroup('All');
    setSelectedCategory('All');
    setHighlightedWordId(entry.id);
    setShowSuggestions(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLetter('ALL');
    setSelectedClassGroup('All');
    setSelectedCategory('All');
    setSelectedLanguageMode('all');
    setHighlightedWordId(null);
    setVisibleCount(24);
  };

  const handleSaveNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEnglish.trim() ||
      !newEnglishMeaning.trim() ||
      !newMarathiWord.trim() ||
      !newMarathiMeaning.trim() ||
      !newHindiWord.trim() ||
      !newHindiMeaning.trim()
    ) {
      setAddFormError(
        'Please complete the English word, Marathi word, Hindi word, and meanings in all 3 languages.'
      );
      return;
    }

    const cleanWord = newEnglish.trim();
    const newEntry: TrilingualWordEntry = {
      id: `custom-word-${Date.now()}-${cleanWord.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      english: cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1),
      pronunciation: newPronunciation.trim() || `${cleanWord.toLowerCase()}`,
      partOfSpeech: newPartOfSpeech,
      classGroup: newClassGroup,
      category: newCategory,
      englishMeaning: newEnglishMeaning.trim(),
      marathiWord: newMarathiWord.trim(),
      marathiMeaning: newMarathiMeaning.trim(),
      hindiWord: newHindiWord.trim(),
      hindiMeaning: newHindiMeaning.trim(),
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
        english: newEnEx.trim() || `We learned the word "${cleanWord}" in class today.`,
        marathi: newMrEx.trim() || `आम्ही आज वर्गात "${newMarathiWord.trim()}" हा शब्द शिकलो.`,
        hindi: newHiEx.trim() || `हमने आज कक्षा में "${newHindiWord.trim()}" शब्द सीखा।`,
      },
      letter: cleanWord.charAt(0).toUpperCase(),
    };

    const updated = saveCustomDictionaryEntry(newEntry);
    setDictionaryEntries(updated);
    setSearchQuery(newEntry.english);
    setSelectedLetter('ALL');
    setShowAddModal(false);
    setAddFormError(null);
    setNewEnglish('');
    setNewPronunciation('');
    setNewEnglishMeaning('');
    setNewMarathiWord('');
    setNewMarathiMeaning('');
    setNewHindiWord('');
    setNewHindiMeaning('');
    setNewEnSyn('');
    setNewMrSyn('');
    setNewHiSyn('');
    setNewEnAnt('');
    setNewMrAnt('');
    setNewHiAnt('');
    setNewEnEx('');
    setNewMrEx('');
    setNewHiEx('');
  };

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================================
          HERO HEADER BANNER
          ===================================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white p-5 sm:p-7 shadow-xl border-2 border-amber-400/80 relative overflow-hidden">
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
                English • मराठी • हिन्दी
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-400/20 border border-sky-300/40 text-sky-200 font-display font-bold text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                Classes 1–10 Student Vocabulary
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-white">
              Trilingual Dictionary{' '}
              <span className="text-amber-300">(इंग्रजी – मराठी – हिन्दी शब्दकोश)</span>
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed">
              Search any word in <strong>English</strong>, <strong>मराठी (Marathi)</strong>, or{' '}
              <strong>हिन्दी (Hindi)</strong>. Get accurate meanings in all three languages,
              phonetic pronunciation with audio voice playback, synonyms (समानार्थी / पर्यायवाची),
              antonyms (विरुद्धार्थी / विलोम), and student-friendly example sentences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-center">
              <div className="text-xl sm:text-2xl font-display font-black text-amber-300">
                {dictionaryEntries.length}+
              </div>
              <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                Verified Words (A–Z)
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-[#0f2952] font-display font-black text-xs sm:text-sm shadow-md cursor-pointer transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Word to Dictionary</span>
            </button>
          </div>
        </div>
      </div>

      {sharedToast && (
        <div className="rounded-2xl bg-emerald-600 text-white px-4 py-3 text-xs sm:text-sm font-display font-bold shadow-md flex items-center justify-between">
          <span>{sharedToast}</span>
          <button
            type="button"
            onClick={() => setSharedToast(null)}
            className="text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          DAILY VOCABULARY SECTION (5 Words Rotated Automatically Every Day)
          ===================================================================== */}
      <section
        aria-label="Daily Vocabulary for Students"
        className="rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50/80 to-sky-50 border-2 border-amber-300 p-4 sm:p-5 shadow-sm space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-[#0f2952] flex items-center justify-center shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-display font-black text-[#0f2952]">
                Today’s Daily Vocabulary (आजचे ५ महत्त्वाचे शब्द • आज के ५ नए शब्द)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600">
                Learn 5 new trilingual words every day! Click any word card below to inspect its full
                meaning, synonyms, antonyms, and sentences.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#0f2952] text-amber-300 font-display font-black text-[11px]">
            Auto-Updated Daily
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {dailyVocabulary.map((word) => (
            <div
              key={`daily-${word.id}`}
              onClick={() => handleSelectDailyWord(word)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelectDailyWord(word);
              }}
              className="rounded-2xl bg-white hover:bg-sky-50/80 border-2 border-amber-200 hover:border-[#0f2952] p-3 transition-all cursor-pointer shadow-2xs flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm sm:text-base font-display font-black text-[#0f2952]">
                    {word.english}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(word.english, 'en-IN');
                    }}
                    title="Listen Pronunciation"
                    className="w-7 h-7 rounded-lg bg-sky-100 hover:bg-sky-200 text-[#0f2952] flex items-center justify-center cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {word.pronunciation}
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-amber-800">मराठी:</span>
                  <span className="font-black text-slate-900 truncate">{word.marathiWord}</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-emerald-800">हिन्दी:</span>
                  <span className="font-black text-slate-900 truncate">{word.hindiWord}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          INSTANT TRILINGUAL SEARCH BAR + FILTERS + ALPHABETICAL BROWSER
          ===================================================================== */}
      <section className="rounded-3xl bg-white border-2 border-sky-200 p-4 sm:p-6 shadow-md space-y-4">
        {/* Language Search Scope Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-display font-black text-[#0f2952] mr-1">
              Search Language:
            </span>
            {[
              { id: 'all', label: 'All 3 Languages (EN • मराठी • हिन्दी)' },
              { id: 'en', label: 'English' },
              { id: 'mr', label: 'मराठी (Marathi)' },
              { id: 'hi', label: 'हिन्दी (Hindi)' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() =>
                  setSelectedLanguageMode(lang.id as 'all' | 'en' | 'mr' | 'hi')
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                  selectedLanguageMode === lang.id
                    ? 'bg-[#0f2952] text-amber-300 shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {(searchQuery ||
            selectedLetter !== 'ALL' ||
            selectedClassGroup !== 'All' ||
            selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-display font-bold cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Search Input with Instant Autocomplete Suggestions */}
        <div ref={searchContainerRef} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedWordId(null);
                setShowSuggestions(true);
                setVisibleCount(24);
              }}
              placeholder="Type any word in English (e.g. Courage, Photosynthesis), मराठी (उदा. धैर्य, प्रामाणिकपणा) or हिन्दी (उदा. साहस, विज्ञान)..."
              className="w-full pl-12 pr-24 py-3.5 sm:py-4 rounded-2xl bg-slate-50 focus:bg-white border-2 border-sky-300 focus:border-[#0f2952] text-sm sm:text-base font-medium text-slate-900 focus:outline-none shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setHighlightedWordId(null);
                }}
                className="absolute right-3 px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Instant Search Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim().length > 0 && instantSuggestions.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1.5 rounded-2xl bg-white border-2 border-[#0f2952] shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
              <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-display font-black text-[#0f2952] uppercase tracking-wider">
                <span>Instant Trilingual Suggestions ({instantSuggestions.length})</span>
                <span>Click to View Full Word Card</span>
              </div>
              <div className="divide-y divide-slate-100">
                {instantSuggestions.map((sug) => (
                  <button
                    key={`sug-${sug.id}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className="w-full px-4 py-2.5 text-left hover:bg-sky-50 flex flex-wrap items-center justify-between gap-2 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-black text-sm sm:text-base text-[#0f2952]">
                        {sug.english}
                      </span>
                      <span className="text-xs text-slate-500">({sug.pronunciation})</span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold text-[10px]">
                        {sug.partOfSpeech}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg">
                        मराठी: {sug.marathiWord}
                      </span>
                      <span className="font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                        हिन्दी: {sug.hindiWord}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Class Level & Topic Category Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-display font-black text-slate-700 flex items-center gap-1 mr-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#0f2952]" />
              Class Level:
            </span>
            {CLASS_GROUPS.map((cg) => (
              <button
                key={cg}
                type="button"
                onClick={() => {
                  setSelectedClassGroup(cg);
                  setHighlightedWordId(null);
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                  selectedClassGroup === cg
                    ? 'bg-amber-400 text-[#0f2952] shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cg === 'All' ? 'All Classes (1–10)' : cg}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-display font-black text-slate-700 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#0f2952]" />
              Subject / Topic:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as 'All' | DictionaryTopicCategory);
                setHighlightedWordId(null);
                setVisibleCount(24);
              }}
              className="w-full rounded-xl bg-slate-100 border border-slate-300 px-3 py-1.5 text-xs font-display font-bold text-[#0f2952] focus:outline-none focus:border-[#0f2952]"
            >
              {TOPIC_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Academic & Daily Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Alphabetical Word Browser (A to Z) */}
        <div className="pt-2 border-t border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-display font-black text-[#0f2952] uppercase tracking-wider">
              Alphabetical Word Browser (A–Z)
            </span>
            <span className="text-xs font-bold text-slate-600">
              Showing {filteredEntries.length} matching words
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setSelectedLetter('ALL');
                setHighlightedWordId(null);
                setVisibleCount(24);
              }}
              className={`px-3 py-1.5 rounded-xl font-display font-black text-xs shrink-0 transition cursor-pointer ${
                selectedLetter === 'ALL'
                  ? 'bg-[#0f2952] text-amber-300 shadow-xs'
                  : 'bg-slate-100 hover:bg-sky-100 text-[#0f2952]'
              }`}
            >
              ALL ({dictionaryEntries.length})
            </button>
            {ALPHABET_LETTERS.map((letter) => {
              const count = letterCounts[letter] || 0;
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(letter);
                    setSearchQuery('');
                    setHighlightedWordId(null);
                    setVisibleCount(24);
                  }}
                  className={`min-w-[36px] h-9 px-2 rounded-xl font-display font-black text-xs shrink-0 flex flex-col items-center justify-center transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f2952] text-amber-300 shadow-xs ring-2 ring-amber-400'
                      : count > 0
                      ? 'bg-sky-50 hover:bg-sky-100 text-[#0f2952] border border-sky-200'
                      : 'bg-slate-50 text-slate-400 border border-slate-200'
                  }`}
                >
                  <span>{letter}</span>
                  <span className="text-[9px] font-bold opacity-80 leading-none">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          DICTIONARY RESULTS GRID
          ===================================================================== */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-3xl bg-white border-2 border-slate-200 p-8 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-display font-black text-[#0f2952]">
            No matching words found for "{searchQuery}"
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Try searching another English, Marathi, or Hindi word, or click "+ Add Word to
            Dictionary" to expand the database with this word.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#0f2952] text-white text-xs font-display font-bold cursor-pointer"
            >
              Show All Words
            </button>
            <button
              type="button"
              onClick={() => {
                setNewEnglish(searchQuery);
                setShowAddModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-[#0f2952] text-xs font-display font-black cursor-pointer"
            >
              + Add "{searchQuery}" to Dictionary
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEntries.slice(0, visibleCount).map((entry) => (
              <article
                key={entry.id}
                className="rounded-3xl bg-white border-2 border-sky-200 hover:border-[#0f2952] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Card Header: English Word, Pronunciation, Badges & Audio/Copy/Share */}
                <div>
                  <div className="bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white px-5 py-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-display font-black text-amber-300 tracking-tight">
                          {entry.english}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white font-display font-bold text-xs">
                          {entry.partOfSpeech}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-[11px]">
                          {entry.classGroup}
                        </span>
                      </div>
                      <div className="text-xs text-sky-200 font-medium flex items-center gap-2">
                        <span>Pronunciation:</span>
                        <strong className="text-white">{entry.pronunciation}</strong>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSpeak(entry.english, 'en-IN')}
                        title="Listen English Pronunciation"
                        className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>EN</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSpeak(`${entry.marathiWord}. ${entry.marathiMeaning}`, 'mr-IN')}
                        title="Listen Marathi Pronunciation"
                        className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>मराठी</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSpeak(`${entry.hindiWord}. ${entry.hindiMeaning}`, 'hi-IN')}
                        title="Listen Hindi Pronunciation"
                        className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>हिन्दी</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyEntry(entry)}
                        title="Copy Trilingual Meaning"
                        className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-4 h-4 text-emerald-300" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShareEntry(entry)}
                        title="Share Word"
                        className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Three-Language Meanings Grid */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* 1. English Meaning */}
                    <div className="rounded-2xl bg-sky-50/90 border border-sky-200 p-3">
                      <div className="text-[11px] font-display font-black text-sky-900 uppercase tracking-wider mb-0.5">
                        🇬🇧 English Meaning
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {entry.englishMeaning}
                      </p>
                    </div>

                    {/* 2. Marathi Meaning */}
                    <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-3">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[11px] font-display font-black text-amber-900 uppercase tracking-wider">
                          🇮🇳 मराठी अर्थ (Marathi)
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-200/80 text-amber-950 font-black text-xs sm:text-sm">
                          {entry.marathiWord}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {entry.marathiMeaning}
                      </p>
                    </div>

                    {/* 3. Hindi Meaning */}
                    <div className="rounded-2xl bg-emerald-50/90 border border-emerald-200 p-3">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[11px] font-display font-black text-emerald-900 uppercase tracking-wider">
                          🇮🇳 हिन्दी अर्थ (Hindi)
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-200/80 text-emerald-950 font-black text-xs sm:text-sm">
                          {entry.hindiWord}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {entry.hindiMeaning}
                      </p>
                    </div>

                    {/* Synonyms & Antonyms in All 3 Languages */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                        <div className="text-[11px] font-display font-black text-indigo-900 uppercase">
                          Synonyms (समानार्थी / पर्यायवाची)
                        </div>
                        <div className="text-xs text-slate-800 space-y-0.5">
                          <div>
                            <strong className="text-slate-600">EN:</strong>{' '}
                            {entry.synonyms.english.join(', ')}
                          </div>
                          <div>
                            <strong className="text-amber-800">मराठी:</strong>{' '}
                            {entry.synonyms.marathi.join(', ')}
                          </div>
                          <div>
                            <strong className="text-emerald-800">हिन्दी:</strong>{' '}
                            {entry.synonyms.hindi.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                        <div className="text-[11px] font-display font-black text-rose-900 uppercase">
                          Antonyms (विरुद्धार्थी / विलोम)
                        </div>
                        <div className="text-xs text-slate-800 space-y-0.5">
                          <div>
                            <strong className="text-slate-600">EN:</strong>{' '}
                            {entry.antonyms.english.join(', ')}
                          </div>
                          <div>
                            <strong className="text-amber-800">मराठी:</strong>{' '}
                            {entry.antonyms.marathi.join(', ')}
                          </div>
                          <div>
                            <strong className="text-emerald-800">हिन्दी:</strong>{' '}
                            {entry.antonyms.hindi.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trilingual Example Sentences */}
                    <div className="rounded-2xl bg-indigo-50/60 border border-indigo-200/80 p-3 space-y-1.5">
                      <div className="text-[11px] font-display font-black text-[#0f2952] uppercase tracking-wider">
                        Example Sentences (उदाहरण वाक्य)
                      </div>
                      <ul className="text-xs space-y-1 text-slate-800">
                        <li>
                          <strong className="text-sky-900">EN:</strong> “{entry.examples.english}”
                        </li>
                        <li>
                          <strong className="text-amber-900">मराठी:</strong> “{entry.examples.marathi}”
                        </li>
                        <li>
                          <strong className="text-emerald-900">हिन्दी:</strong> “{entry.examples.hindi}”
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Category: {entry.category}
                  </span>
                  <span>Letter: {entry.letter}</span>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < filteredEntries.length && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="px-6 py-3 rounded-2xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs sm:text-sm shadow-md cursor-pointer transition"
              >
                Load More Words ({filteredEntries.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ADD NEW VERIFIED WORD MODAL (SCALABLE DICTIONARY DATABASE EXPANSION)
          ===================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-2 border-[#0f2952] max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-display font-black text-[#0f2952]">
                  Expand Trilingual Dictionary Database
                </h2>
                <p className="text-xs text-slate-600">
                  Add a new verified English–Marathi–Hindi vocabulary word for Classes 1–10.
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
                    placeholder="e.g. Perseverance"
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
                    placeholder="e.g. pur-suh-VEER-uhns (पर्सिव्हिअरन्स)"
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
                    {TOPIC_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">English Meaning *</label>
                <input
                  type="text"
                  required
                  value={newEnglishMeaning}
                  onChange={(e) => setNewEnglishMeaning(e.target.value)}
                  placeholder="Clear student-friendly English definition..."
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-900 block mb-1">मराठी शब्द (Marathi Word) *</label>
                  <input
                    type="text"
                    required
                    value={newMarathiWord}
                    onChange={(e) => setNewMarathiWord(e.target.value)}
                    placeholder="उदा. सातत्य"
                    className="w-full rounded-xl border border-amber-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-900 block mb-1">मराठी अर्थ (Marathi Meaning) *</label>
                  <input
                    type="text"
                    required
                    value={newMarathiMeaning}
                    onChange={(e) => setNewMarathiMeaning(e.target.value)}
                    placeholder="मराठीत सोपा अर्थ..."
                    className="w-full rounded-xl border border-amber-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-emerald-900 block mb-1">हिन्दी शब्द (Hindi Word) *</label>
                  <input
                    type="text"
                    required
                    value={newHindiWord}
                    onChange={(e) => setNewHindiWord(e.target.value)}
                    placeholder="उदा. दृढ़ता"
                    className="w-full rounded-xl border border-emerald-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900 block mb-1">हिन्दी अर्थ (Hindi Meaning) *</label>
                  <input
                    type="text"
                    required
                    value={newHindiMeaning}
                    onChange={(e) => setNewHindiMeaning(e.target.value)}
                    placeholder="हिन्दी में सरल अर्थ..."
                    className="w-full rounded-xl border border-emerald-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Synonyms (comma-separated)</label>
                  <input
                    type="text"
                    value={newEnSyn}
                    onChange={(e) => setNewEnSyn(e.target.value)}
                    placeholder="Persistence, Grit"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">मराठी समानार्थी</label>
                  <input
                    type="text"
                    value={newMrSyn}
                    onChange={(e) => setNewMrSyn(e.target.value)}
                    placeholder="चिकाटी, जिद्द"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिन्दी पर्यायवाची</label>
                  <input
                    type="text"
                    value={newHiSyn}
                    onChange={(e) => setNewHiSyn(e.target.value)}
                    placeholder="लगन, अटलता"
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
                    placeholder="Laziness, Quitting"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">मराठी विरुद्धार्थी</label>
                  <input
                    type="text"
                    value={newMrAnt}
                    onChange={(e) => setNewMrAnt(e.target.value)}
                    placeholder="आळस, माघार"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिन्दी विलोम</label>
                  <input
                    type="text"
                    value={newHiAnt}
                    onChange={(e) => setNewHiAnt(e.target.value)}
                    placeholder="आलस्य, हार"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Example Sentence</label>
                  <input
                    type="text"
                    value={newEnEx}
                    onChange={(e) => setNewEnEx(e.target.value)}
                    placeholder="Example in English..."
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
                  Save Word to Dictionary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
