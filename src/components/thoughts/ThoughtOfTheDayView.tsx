import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  Calendar,
  Search,
  Award,
  Volume2,
  ArrowLeft,
  History,
  BookOpen,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  ThoughtCategory,
  THOUGHT_CATEGORIES,
  TrilingualThoughtEntry,
  getAllTrilingualThoughts,
  getThoughtForDate,
  getPreviousDaysThoughts,
} from '../../data/thoughtsOfTheDayData';
import { speechService } from '../../services/speechService';

interface ThoughtOfTheDayViewProps {
  onBack?: () => void;
}

export const ThoughtOfTheDayView: React.FC<ThoughtOfTheDayViewProps> = ({ onBack }) => {
  const allThoughts = useMemo(() => getAllTrilingualThoughts(), []);
  const todayInfo = useMemo(() => getThoughtForDate(new Date()), []);
  const previous30Days = useMemo(() => getPreviousDaysThoughts(30, new Date()), []);

  const [activeTab, setActiveTab] = useState<'today-and-library' | 'previous-days'>('today-and-library');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ThoughtCategory>('All');
  const [onlyVerifiedPersonalities, setOnlyVerifiedPersonalities] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  // Category counts across the 1,085-thought collection
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: allThoughts.length };
    for (const cat of THOUGHT_CATEGORIES) map[cat] = 0;
    for (const t of allThoughts) {
      map[t.category] = (map[t.category] || 0) + 1;
    }
    return map;
  }, [allThoughts]);

  const verifiedQuotesCount = useMemo(
    () => allThoughts.filter((t) => t.isVerifiedPersonalityQuote).length,
    [allThoughts]
  );

  // Filtered thoughts in the 1,085+ collection explorer
  const filteredThoughts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allThoughts.filter((t) => {
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
      if (onlyVerifiedPersonalities && !t.isVerifiedPersonalityQuote) return false;
      if (!q) return true;
      return (
        t.english.toLowerCase().includes(q) ||
        t.marathi.toLowerCase().includes(q) ||
        t.hindi.toLowerCase().includes(q) ||
        (t.author && t.author.toLowerCase().includes(q)) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        String(t.number) === q
      );
    });
  }, [allThoughts, selectedCategory, onlyVerifiedPersonalities, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredThoughts.length / pageSize));
  const paginatedThoughts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredThoughts.slice(start, start + pageSize);
  }, [filteredThoughts, currentPage]);

  const formatThoughtForClipboard = (t: TrilingualThoughtEntry, dateHeader?: string) => {
    const header = dateHeader
      ? `🌟 MyStudyZone — Thought of the Day (${dateHeader})`
      : `🌟 MyStudyZone — Thought #${t.number} (${t.category})`;
    const authorLine =
      t.isVerifiedPersonalityQuote && t.author ? `\n— ${t.author} (Verified Quote)` : '';
    return [
      header,
      `🇬🇧 English: “${t.english}”`,
      `🇮🇳 मराठी (सुविचार): “${t.marathi}”`,
      `🇮🇳 हिन्दी (सुविचार): “${t.hindi}”${authorLine}`,
      `https://mystudyzone.in`,
    ].join('\n');
  };

  const handleCopyThought = async (t: TrilingualThoughtEntry, dateHeader?: string) => {
    const text = formatThoughtForClipboard(t, dateHeader);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback handled cleanly
    }
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareThought = async (t: TrilingualThoughtEntry, dateHeader?: string) => {
    const text = formatThoughtForClipboard(t, dateHeader);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'MyStudyZone — Thought of the Day (सुविचार)',
          text,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareFeedback(`Thought #${t.number} copied to clipboard for sharing on WhatsApp or Social Media!`);
      setTimeout(() => setShareFeedback(null), 3500);
    } catch {
      setShareFeedback(`Thought #${t.number} ready to share!`);
      setTimeout(() => setShareFeedback(null), 3500);
    }
  };

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handleSpeak = (text: string, lang: 'en-IN' | 'mr-IN' | 'hi-IN') => {
    void speechService.speakSimpleText(text, lang, {
      rate: 0.92,
      onState: (info) => {
        if (info.error) {
          setShareFeedback(info.error);
        }
      },
    });
  };

  const todayThought = todayInfo.thought;

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================================
          TOP HEADER & COLLECTION SUMMARY
          ===================================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0f2952] via-[#1e3a8a] to-[#0f2952] text-white p-5 sm:p-7 shadow-xl border-2 border-amber-400/80">
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
                <Sparkles className="w-3.5 h-3.5" />
                आजचा सुविचार • आज का सुविचार • Thought of the Day
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 font-display font-bold text-xs">
                {allThoughts.length.toLocaleString()}+ Unique Trilingual Thoughts
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-white">
              Thought of the Day{' '}
              <span className="text-amber-300">(English • मराठी • हिन्दी)</span>
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed">
              A new inspiring trilingual thought is displayed automatically every day without
              repeating any thought until all{' '}
              <strong>{allThoughts.length.toLocaleString()} unique thoughts</strong> have been
              completed. Explore Motivational, Educational, Inspirational, Moral, and Personality
              Development thoughts plus verified quotes from great personalities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-center">
              <div className="text-xl sm:text-2xl font-display font-black text-amber-300">
                Day {todayInfo.dayCycleNumber} / {todayInfo.totalCollectionSize}
              </div>
              <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                Non-Repeating Cycle
              </div>
            </div>
          </div>
        </div>
      </div>

      {shareFeedback && (
        <div className="rounded-2xl bg-emerald-600 text-white px-4 py-3 text-xs sm:text-sm font-display font-bold shadow-md flex items-center justify-between">
          <span>{shareFeedback}</span>
          <button
            type="button"
            onClick={() => setShareFeedback(null)}
            className="text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          ATTRACTIVE TODAY'S THOUGHT OF THE DAY HERO CARD
          ===================================================================== */}
      <section
        aria-label="Today's Thought of the Day Card"
        className="rounded-3xl bg-gradient-to-br from-[#fffbeb] via-white to-[#f0f9ff] border-2 border-amber-400 shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#0f2952]">
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider">
              Today’s Automatic Thought • {todayInfo.formattedDate}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#0f2952] text-amber-300 font-display font-black text-xs">
              Thought #{todayThought.number} • {todayThought.category}
            </span>
            {todayThought.isVerifiedPersonalityQuote && todayThought.author && (
              <span className="px-3 py-0.5 rounded-full bg-emerald-800 text-white font-display font-bold text-xs inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Verified Quote: {todayThought.author}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* English Thought */}
            <div className="rounded-2xl bg-sky-50/90 border-2 border-sky-200 p-4 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-sky-200/80 text-sky-950 font-display font-black text-[11px] uppercase">
                    🇬🇧 English Thought
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeak(todayThought.english, 'en-IN')}
                    title="Listen in English"
                    className="p-1.5 rounded-lg bg-white hover:bg-sky-100 text-[#0f2952] border border-sky-200 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm sm:text-base font-display font-bold text-[#0f2952] leading-relaxed">
                  “{todayThought.english}”
                </p>
              </div>
              {todayThought.isVerifiedPersonalityQuote && todayThought.author && (
                <div className="text-xs font-black text-sky-900 pt-2 border-t border-sky-200/70">
                  — {todayThought.author}
                </div>
              )}
            </div>

            {/* Marathi Suvichar */}
            <div className="rounded-2xl bg-amber-50/90 border-2 border-amber-300 p-4 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-200/90 text-amber-950 font-display font-black text-[11px] uppercase">
                    🇮🇳 आजचा मराठी सुविचार
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeak(todayThought.marathi, 'mr-IN')}
                    title="Listen in Marathi"
                    className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-[#0f2952] border border-amber-300 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  “{todayThought.marathi}”
                </p>
              </div>
              {todayThought.isVerifiedPersonalityQuote && todayThought.author && (
                <div className="text-xs font-black text-amber-900 pt-2 border-t border-amber-200/70">
                  — {todayThought.author}
                </div>
              )}
            </div>

            {/* Hindi Suvichar */}
            <div className="rounded-2xl bg-emerald-50/90 border-2 border-emerald-200 p-4 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-200/80 text-emerald-950 font-display font-black text-[11px] uppercase">
                    🇮🇳 आज का हिन्दी सुविचार
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeak(todayThought.hindi, 'hi-IN')}
                    title="Listen in Hindi"
                    className="p-1.5 rounded-lg bg-white hover:bg-emerald-100 text-[#0f2952] border border-emerald-200 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  “{todayThought.hindi}”
                </p>
              </div>
              {todayThought.isVerifiedPersonalityQuote && todayThought.author && (
                <div className="text-xs font-black text-emerald-900 pt-2 border-t border-emerald-200/70">
                  — {todayThought.author}
                </div>
              )}
            </div>
          </div>

          {/* Copy & Share Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {todayThought.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleCopyThought(todayThought, todayInfo.formattedDate)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] text-white font-display font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition"
              >
                {copiedId === todayThought.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied All 3 Languages!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-300" />
                    <span>Copy Today’s Thought</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleShareThought(todayThought, todayInfo.formattedDate)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white font-display font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Thought</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODE SWITCHER: 1,085+ THOUGHTS LIBRARY vs PREVIOUS 30 DAYS ARCHIVE
          ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('today-and-library')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-black text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'today-and-library'
              ? 'bg-[#0f2952] text-amber-300 shadow-md'
              : 'bg-white hover:bg-sky-50 text-[#0f2952] border-2 border-sky-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore All {allThoughts.length.toLocaleString()}+ Trilingual Thoughts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('previous-days')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-black text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'previous-days'
              ? 'bg-[#0f2952] text-amber-300 shadow-md'
              : 'bg-white hover:bg-sky-50 text-[#0f2952] border-2 border-sky-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Browse Previous Daily Thoughts (Past 30 Days)</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: PREVIOUS 30 DAYS DAILY ARCHIVE
          ===================================================================== */}
      {activeTab === 'previous-days' && (
        <section className="space-y-4">
          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-display font-black text-[#0f2952]">
                Previous Daily Thoughts Archive (मागील ३० दिवसांचे सुविचार)
              </h2>
              <p className="text-xs text-slate-600">
                Missed a day? Browse the exact thought displayed on each of the past 30 calendar days.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {previous30Days.map((item) => (
              <article
                key={item.isoDate}
                className="rounded-3xl bg-white border-2 border-sky-200 hover:border-[#0f2952] p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-display font-black text-[#0f2952]">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {item.daysAgo === 0
                        ? `Today (${item.dateLabel})`
                        : item.daysAgo === 1
                        ? `Yesterday (${item.dateLabel})`
                        : item.dateLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-display font-bold text-[11px]">
                      #{item.thought.number} • {item.thought.category}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="font-bold text-[#0f2952]">
                      <strong className="text-sky-800">EN:</strong> “{item.thought.english}”
                    </p>
                    <p className="font-semibold text-slate-900">
                      <strong className="text-amber-800">मराठी:</strong> “{item.thought.marathi}”
                    </p>
                    <p className="font-semibold text-slate-900">
                      <strong className="text-emerald-800">हिन्दी:</strong> “{item.thought.hindi}”
                    </p>
                    {item.thought.isVerifiedPersonalityQuote && item.thought.author && (
                      <p className="text-xs font-black text-indigo-900">
                        — {item.thought.author} (Verified Personality Quote)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleCopyThought(item.thought, item.dateLabel)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f2952] font-bold text-xs cursor-pointer"
                  >
                    {copiedId === item.thought.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
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
                    onClick={() => handleShareThought(item.thought, item.dateLabel)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          TAB 2: COMPLETE 1,085+ THOUGHTS COLLECTION EXPLORER WITH CATEGORY FILTER
          ===================================================================== */}
      {activeTab === 'today-and-library' && (
        <section className="space-y-4">
          {/* Search & Category Filter Card */}
          <div className="rounded-3xl bg-white border-2 border-sky-200 p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#0f2952]" />
                <h2 className="text-sm sm:text-base font-display font-black text-[#0f2952]">
                  Filter by Category & Search (English • मराठी • हिन्दी)
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-600">
                Showing {filteredThoughts.length.toLocaleString()} thoughts
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', ...THOUGHT_CATEGORIES] as Array<'All' | ThoughtCategory>).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-2 rounded-xl font-display font-black text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0f2952] text-amber-300 shadow-xs'
                        : 'bg-slate-100 hover:bg-sky-100 text-[#0f2952]'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Categories' : cat}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px]">
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setOnlyVerifiedPersonalities((prev) => !prev);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl font-display font-black text-xs transition cursor-pointer inline-flex items-center gap-1.5 ${
                  onlyVerifiedPersonalities
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verified Famous Personalities ({verifiedQuotesCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search across 1,085+ thoughts by keyword in English, मराठी, हिन्दी, author (e.g., Vivekananda, Kalam, Shivaji Maharaj)..."
                className="w-full pl-10 pr-20 py-3 rounded-2xl bg-slate-50 focus:bg-white border-2 border-sky-200 focus:border-[#0f2952] text-xs sm:text-sm font-medium text-slate-900 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Thoughts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedThoughts.map((t) => (
              <article
                key={t.id}
                className="rounded-3xl bg-white border-2 border-sky-200 hover:border-[#0f2952] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#0f2952] text-amber-300 font-display font-black text-xs">
                        #{t.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 font-display font-bold text-xs">
                        {t.category}
                      </span>
                    </div>
                    {t.isVerifiedPersonalityQuote && t.author && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-display font-black text-[11px] inline-flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {t.author}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-2.5">
                      <span className="font-display font-black text-sky-900 text-[11px] uppercase block mb-0.5">
                        🇬🇧 English
                      </span>
                      <p className="font-bold text-[#0f2952]">“{t.english}”</p>
                    </div>

                    <div className="rounded-xl bg-amber-50/70 border border-amber-100 p-2.5">
                      <span className="font-display font-black text-amber-900 text-[11px] uppercase block mb-0.5">
                        🇮🇳 मराठी सुविचार
                      </span>
                      <p className="font-semibold text-slate-900">“{t.marathi}”</p>
                    </div>

                    <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-2.5">
                      <span className="font-display font-black text-emerald-900 text-[11px] uppercase block mb-0.5">
                        🇮🇳 हिन्दी सुविचार
                      </span>
                      <p className="font-semibold text-slate-900">“{t.hindi}”</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleSpeak(t.english, 'en-IN')}
                      title="Listen English"
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 text-[#0f2952] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSpeak(t.marathi, 'mr-IN')}
                      title="Listen Marathi"
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-[#0f2952] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>मराठी</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSpeak(t.hindi, 'hi-IN')}
                      title="Listen Hindi"
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-[#0f2952] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>हिन्दी</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyThought(t)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f2952] font-bold text-xs cursor-pointer"
                    >
                      {copiedId === t.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
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
                      onClick={() => handleShareThought(t)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="rounded-2xl bg-white border-2 border-sky-200 p-3.5 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-sky-100 disabled:opacity-40 text-[#0f2952] font-display font-bold text-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              <span className="text-xs font-display font-black text-[#0f2952]">
                Page {currentPage} of {totalPages} ({filteredThoughts.length.toLocaleString()}{' '}
                Thoughts)
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#0f2952] hover:bg-[#1e3a8a] disabled:opacity-40 text-amber-300 font-display font-bold text-xs cursor-pointer"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
