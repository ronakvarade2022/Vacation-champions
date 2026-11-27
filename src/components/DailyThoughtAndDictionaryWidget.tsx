import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Languages,
  Copy,
  Check,
  Share2,
  Volume2,
  Search,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { getThoughtForDate } from '../data/thoughtsOfTheDayData';
import {
  loadTrilingualDictionaryEntries,
  getDailyVocabularyWords,
} from '../data/trilingualDictionaryData';

interface DailyThoughtAndDictionaryWidgetProps {
  onOpenDictionary: (initialQuery?: string) => void;
  onOpenThoughts: () => void;
}

export const DailyThoughtAndDictionaryWidget: React.FC<DailyThoughtAndDictionaryWidgetProps> = ({
  onOpenDictionary,
  onOpenThoughts,
}) => {
  const todayInfo = useMemo(() => getThoughtForDate(new Date()), []);
  const dictionaryEntries = useMemo(() => loadTrilingualDictionaryEntries(), []);
  const dailyWords = useMemo(
    () => getDailyVocabularyWords(dictionaryEntries, new Date(), 5),
    [dictionaryEntries]
  );

  const [quickQuery, setQuickQuery] = useState('');
  const [copiedThought, setCopiedThought] = useState(false);
  const [sharedThought, setSharedThought] = useState(false);

  const todayThought = todayInfo.thought;

  // Quick instant suggestions (top 4 matches)
  const quickSuggestions = useMemo(() => {
    const q = quickQuery.trim().toLowerCase();
    if (!q) return [];
    return dictionaryEntries
      .filter(
        (w) =>
          w.english.toLowerCase().includes(q) ||
          w.marathiWord.toLowerCase().includes(q) ||
          w.hindiWord.toLowerCase().includes(q) ||
          w.englishMeaning.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [dictionaryEntries, quickQuery]);

  const handleCopyTodayThought = async () => {
    const authorLine =
      todayThought.isVerifiedPersonalityQuote && todayThought.author
        ? `\n— ${todayThought.author}`
        : '';
    const text = [
      `🌟 MyStudyZone — Thought of the Day (${todayInfo.formattedDate})`,
      `🇬🇧 English: “${todayThought.english}”`,
      `🇮🇳 मराठी सुविचार: “${todayThought.marathi}”`,
      `🇮🇳 हिन्दी सुविचार: “${todayThought.hindi}”${authorLine}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setCopiedThought(true);
    setTimeout(() => setCopiedThought(false), 2500);
  };

  const handleShareTodayThought = async () => {
    const authorLine =
      todayThought.isVerifiedPersonalityQuote && todayThought.author
        ? `\n— ${todayThought.author}`
        : '';
    const text = [
      `🌟 MyStudyZone — Thought of the Day (${todayInfo.formattedDate})`,
      `🇬🇧 English: “${todayThought.english}”`,
      `🇮🇳 मराठी सुविचार: “${todayThought.marathi}”`,
      `🇮🇳 हिन्दी सुविचार: “${todayThought.hindi}”${authorLine}`,
    ].join('\n');

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'MyStudyZone — Thought of the Day (सुविचार)',
          text,
        });
        return;
      } catch {
        // fallback
      }
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setSharedThought(true);
    setTimeout(() => setSharedThought(false), 2500);
  };

  const handleSpeak = (text: string, lang: 'en-IN' | 'mr-IN' | 'hi-IN') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <section
      aria-label="Thought of the Day and Trilingual Dictionary Quick Hub"
      className="grid grid-cols-1 xl:grid-cols-12 gap-4"
    >
      {/* =====================================================================
          LEFT / TOP CARD (7 cols): THOUGHT OF THE DAY (आजचा सुविचार • आज का सुविचार)
          ===================================================================== */}
      <div className="xl:col-span-7 rounded-3xl bg-gradient-to-br from-[#fffbeb] via-white to-[#f0f9ff] border-2 border-amber-400 shadow-md overflow-hidden flex flex-col justify-between">
        <div>
          {/* Top Ribbon */}
          <div className="bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-[#0f2952] flex items-center justify-center shadow-2xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-display font-black tracking-wide uppercase text-amber-300">
                  Thought of the Day • आजचा सुविचार • आज का सुविचार
                </h2>
                <p className="text-[11px] text-sky-200 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {todayInfo.formattedDate} • Day {todayInfo.dayCycleNumber} of{' '}
                    {todayInfo.totalCollectionSize.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-[11px]">
                {todayThought.category}
              </span>
              {todayThought.isVerifiedPersonalityQuote && todayThought.author && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/50 text-emerald-100 font-display font-bold text-[11px] inline-flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {todayThought.author}
                </span>
              )}
            </div>
          </div>

          {/* 3-Language Thought Display */}
          <div className="p-4 sm:p-5 space-y-2.5">
            <div className="rounded-2xl bg-sky-50/90 border border-sky-200 p-3 flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-display font-black text-sky-900 uppercase tracking-wider block">
                  🇬🇧 English Thought
                </span>
                <p className="text-xs sm:text-sm font-display font-bold text-[#0f2952]">
                  “{todayThought.english}”
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSpeak(todayThought.english, 'en-IN')}
                title="Listen in English"
                className="p-1.5 rounded-lg bg-white hover:bg-sky-100 text-[#0f2952] border border-sky-200 shrink-0 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-3 flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-display font-black text-amber-900 uppercase tracking-wider block">
                  🇮🇳 मराठी सुविचार
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  “{todayThought.marathi}”
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSpeak(todayThought.marathi, 'mr-IN')}
                title="Listen in Marathi"
                className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-[#0f2952] border border-amber-200 shrink-0 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-2xl bg-emerald-50/90 border border-emerald-200 p-3 flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-display font-black text-emerald-900 uppercase tracking-wider block">
                  🇮🇳 हिन्दी सुविचार
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  “{todayThought.hindi}”
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSpeak(todayThought.hindi, 'hi-IN')}
                title="Listen in Hindi"
                className="p-1.5 rounded-lg bg-white hover:bg-emerald-100 text-[#0f2952] border border-emerald-200 shrink-0 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 sm:px-5 py-3 bg-amber-50/70 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyTodayThought}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#0f2952] border border-slate-300 font-display font-bold text-xs cursor-pointer transition"
            >
              {copiedThought ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareTodayThought}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs cursor-pointer transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{sharedThought ? 'Copied to Share!' : 'Share'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenThoughts}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs shadow-2xs cursor-pointer transition"
          >
            <span>Browse 1,085+ Thoughts & History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          RIGHT / BOTTOM CARD (5 cols): TRILINGUAL DICTIONARY (EN • मराठी • हिन्दी)
          ===================================================================== */}
      <div className="xl:col-span-5 rounded-3xl bg-white border-2 border-sky-300 shadow-md overflow-hidden flex flex-col justify-between">
        <div>
          <div className="bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-400 text-[#0f2952] flex items-center justify-center shadow-2xs shrink-0">
                <Languages className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-display font-black tracking-wide uppercase text-white">
                  Trilingual Dictionary (शब्दकोश)
                </h2>
                <p className="text-[11px] text-sky-200">
                  English • मराठी • हिन्दी | Classes 1–10 Vocabulary
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0f2952] font-display font-black text-[11px]">
              A–Z ({dictionaryEntries.length}+)
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            {/* Quick Search Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onOpenDictionary(quickQuery);
              }}
              className="relative"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Search word in English, मराठी or हिन्दी..."
                className="w-full pl-9 pr-20 py-2.5 rounded-2xl bg-slate-50 focus:bg-white border-2 border-sky-200 focus:border-[#0f2952] text-xs sm:text-sm font-medium text-slate-900 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-amber-300 font-display font-black text-xs cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Quick Live Suggestions if typing */}
            {quickSuggestions.length > 0 && (
              <div className="rounded-2xl bg-sky-50 border border-sky-200 p-2.5 space-y-1.5">
                <div className="text-[10px] font-display font-black text-[#0f2952] uppercase">
                  Instant Dictionary Matches:
                </div>
                {quickSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenDictionary(item.english)}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-sky-100 flex items-center justify-between gap-2 text-xs cursor-pointer transition"
                  >
                    <span className="font-display font-black text-[#0f2952]">{item.english}</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">
                      मराठी: {item.marathiWord} • हिन्दी: {item.hindiWord}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Today's 5 Daily Vocabulary Words */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-display font-black text-[#0f2952] uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  Today’s Daily Vocabulary (आजचे ५ शब्द):
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {dailyWords.slice(0, 4).map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onOpenDictionary(w.english)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-[#0f2952] transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-xs text-[#0f2952]">
                        {w.english}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">{w.partOfSpeech}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-700 truncate">
                      मराठी: <span className="text-amber-900">{w.marathiWord}</span> • हिन्दी:{' '}
                      <span className="text-emerald-900">{w.hindiWord}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Open Full Dictionary Button */}
        <div className="px-4 sm:px-5 py-3 bg-sky-50/80 border-t border-sky-200/80 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-600">
            Synonyms • Antonyms • Audio • Examples
          </span>
          <button
            type="button"
            onClick={() => onOpenDictionary(quickQuery)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-[#0f2952] font-display font-black text-xs shadow-2xs cursor-pointer transition"
          >
            <span>Open Trilingual Dictionary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
