import React, { useState, useEffect, useRef } from 'react';
import { SHIVAJI_STORIES, ShivajiStory } from '../data/shivajiStoriesData';
import {
  speechService,
  SpeechParagraphState,
  READING_SPEED_OPTIONS,
  getReadingSpeedLabel
} from '../services/speechService';
import {
  Crown,
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  BookOpen,
  CheckCircle,
  Search,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  Sparkles,
  Gauge,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const ShivajiStoriesView: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'Marathi' | 'Hindi' | 'English'>('Marathi');
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  // Persistent reading speed across paragraphs, chunks, languages, and stories (defaults to 1.0x – Normal)
  const [speechRate, setSpeechRate] = useState<number>(() => speechService.getRate() || 1.0);

  const [speechState, setSpeechState] = useState<SpeechParagraphState>({
    isPlaying: false,
    isPaused: false,
    status: 'idle',
    currentParagraphIndex: 0,
    totalParagraphs: 0,
    currentSentenceIndex: 0,
    totalSentencesInParagraph: 1,
    currentChunkIndex: 0,
    totalChunks: 0,
    progressPercent: 0,
    rate: 1.0
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedStories, setCompletedStories] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vc_shivaji_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activeParagraphRef = useRef<HTMLDivElement | null>(null);

  const currentStory: ShivajiStory = SHIVAJI_STORIES[activeStoryIndex] || SHIVAJI_STORIES[0];
  const bodyParagraphs = currentStory.paragraphs[selectedLanguage] || [];
  const moralText = currentStory.moral[selectedLanguage] || '';

  // Full narration sequence from first word to final word:
  // [0: Story Title, 1..N: Body Paragraphs, N+1: Moral Lesson]
  const getFullNarrationParagraphs = (): string[] => {
    const titleText = currentStory.title[selectedLanguage] || '';
    const moralPrefix =
      selectedLanguage === 'Marathi'
        ? 'या कथेतून शिवरायांची शिकवण: '
        : selectedLanguage === 'Hindi'
        ? 'इस प्रसंग की अमर सीख: '
        : 'Moral of this story: ';
    return [titleText, ...bodyParagraphs, `${moralPrefix}${moralText}`];
  };

  // Filtered stories list
  const filteredStories = SHIVAJI_STORIES.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.title.English.toLowerCase().includes(q) ||
      s.title.Marathi.toLowerCase().includes(q) ||
      s.title.Hindi.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.year.toLowerCase().includes(q) ||
      String(s.order).includes(q)
    );
  });

  // Stop speech synthesis on story or language change while keeping selected reading speed intact
  useEffect(() => {
    speechService.stop();
    setSpeechState({
      isPlaying: false,
      isPaused: false,
      status: 'idle',
      currentParagraphIndex: 0,
      totalParagraphs: bodyParagraphs.length + 2,
      currentSentenceIndex: 0,
      totalSentencesInParagraph: 1,
      currentChunkIndex: 0,
      totalChunks: 0,
      progressPercent: 0,
      rate: speechRate
    });
  }, [activeStoryIndex, selectedLanguage]);

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Keep active paragraph scrolled smoothly into view while playing
  useEffect(() => {
    if (speechState.isPlaying && activeParagraphRef.current) {
      activeParagraphRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [speechState.currentParagraphIndex, speechState.isPlaying]);

  const markAsCompleted = (id: string) => {
    setCompletedStories(prev => {
      const updated = { ...prev, [id]: true };
      try {
        localStorage.setItem('vc_shivaji_completed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Start full story narration from a given paragraph index (0 = Title, 1..N = Body, N+1 = Moral)
  const startFromParagraph = (index: number = 0) => {
    const allParas = getFullNarrationParagraphs();
    speechService.setRate(speechRate);
    speechService.startStoryNarration(
      allParas,
      selectedLanguage,
      state => {
        setSpeechState(state);
      },
      () => {
        markAsCompleted(currentStory.id);
      },
      index
    );
  };

  const handlePlayFullStory = () => {
    if (speechState.isPaused) {
      speechService.resume();
    } else {
      const startIdx =
        speechState.status === 'completed' || speechState.status === 'stopped'
          ? 0
          : speechState.currentParagraphIndex || 0;
      startFromParagraph(startIdx);
    }
  };

  const handlePauseAudio = () => {
    speechService.pause();
  };

  const handleResumeAudio = () => {
    speechService.resume();
  };

  const handleStopAudio = () => {
    speechService.stop();
    setSpeechState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      status: 'stopped',
      currentParagraphIndex: 0,
      currentSentenceIndex: 0,
      currentChunkIndex: 0,
      progressPercent: 0
    }));
  };

  const handleRestartStory = () => {
    startFromParagraph(0);
  };

  const totalPartsCount = bodyParagraphs.length + 2; // Title + Body Paragraphs + Moral
  const activeParaIndex = speechState.currentParagraphIndex || 0;

  const handleNextParagraph = () => {
    if (activeParaIndex + 1 < totalPartsCount) {
      if (speechState.isPlaying || speechState.isPaused) {
        speechService.jumpToParagraph(activeParaIndex + 1);
      } else {
        startFromParagraph(activeParaIndex + 1);
      }
    }
  };

  const handlePrevParagraph = () => {
    if (activeParaIndex > 0) {
      if (speechState.isPlaying || speechState.isPaused) {
        speechService.jumpToParagraph(activeParaIndex - 1);
      } else {
        startFromParagraph(activeParaIndex - 1);
      }
    } else {
      startFromParagraph(0);
    }
  };

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    speechService.setRate(newRate);
  };

  const completedCount = Object.keys(completedStories).length;
  const activePartNumber = Math.min(activeParaIndex + 1, totalPartsCount);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Historic Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide text-amber-200 border border-amber-300/30">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>CHHATRAPATI SHIVAJI MAHARAJ GATHA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
              छत्रपती शिवाजी महाराज: ५० ऐतिहासिक अमृतकथा
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Complete chronological saga of 50 inspiring stories in Marathi, Hindi, and English with natural Female Voice narration from first word to final word and 6 reading speeds (0.5x to 2.0x)!
            </p>
          </div>

          {/* Progress Pill & Language Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <p className="text-[10px] uppercase font-bold text-amber-200">Stories Completed</p>
              <p className="text-xl font-extrabold text-white">{completedCount} / 50</p>
            </div>

            {/* Language Selector */}
            <div className="bg-black/30 p-1 rounded-2xl border border-white/20 flex items-center gap-1">
              {(['Marathi', 'Hindi', 'English'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-amber-400 text-amber-950 shadow-md scale-102'
                      : 'text-amber-100 hover:text-white'
                  }`}
                >
                  {lang === 'Marathi' ? 'मराठी' : lang === 'Hindi' ? 'हिंदी' : 'English'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Story Reader (Left) and 50 Story Index (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Story Reader (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6">
            {/* Story Meta Header (Narrated as Part 1 / Index 0) */}
            <div
              onClick={() => startFromParagraph(0)}
              className={`flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-4 rounded-2xl p-2 transition-all cursor-pointer ${
                (speechState.isPlaying || speechState.isPaused) && activeParaIndex === 0
                  ? 'bg-amber-100/80 ring-2 ring-amber-400'
                  : 'hover:bg-amber-50/40'
              }`}
              title="Click to play story from the title"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
                  #{currentStory.order}
                </span>
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex flex-wrap items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    {currentStory.year} • <MapPin className="w-3 h-3 text-amber-600" /> {currentStory.location}
                    {speechState.isPlaying && activeParaIndex === 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold animate-pulse">
                        🔊 Reading Title...
                      </span>
                    )}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                    {currentStory.title[selectedLanguage]}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 text-[11px] font-extrabold px-3 py-1 rounded-full border border-amber-300">
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>
                    {selectedLanguage === 'Marathi'
                      ? 'Natural Marathi Female Voice'
                      : selectedLanguage === 'Hindi'
                      ? 'Natural Hindi Female Voice'
                      : 'Indian English Female Voice'}
                  </span>
                </span>

                {completedStories[currentStory.id] && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* Complete Audio Control Bar: Play, Pause, Resume, Stop, Restart, Prev/Next, Reading Speed */}
            <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Play Button */}
                  {!speechState.isPlaying && !speechState.isPaused && (
                    <button
                      onClick={handlePlayFullStory}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Play</span>
                    </button>
                  )}

                  {/* Pause Button */}
                  {speechState.isPlaying && (
                    <button
                      onClick={handlePauseAudio}
                      className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </button>
                  )}

                  {/* Resume Button */}
                  {speechState.isPaused && (
                    <button
                      onClick={handleResumeAudio}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Resume</span>
                    </button>
                  )}

                  {/* Stop Button */}
                  <button
                    onClick={handleStopAudio}
                    disabled={!speechState.isPlaying && !speechState.isPaused && speechState.status !== 'playing'}
                    className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                    title="Stop Audio Playback"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Stop</span>
                  </button>

                  {/* Restart Button */}
                  <button
                    onClick={handleRestartStory}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Restart Story from First Word"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart</span>
                  </button>

                  {/* Prev / Next Paragraph */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevParagraph}
                      disabled={activeParaIndex === 0}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 disabled:opacity-40 text-amber-900 border border-amber-300 cursor-pointer"
                      title="Previous Paragraph"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextParagraph}
                      disabled={activeParaIndex >= totalPartsCount - 1}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 disabled:opacity-40 text-amber-900 border border-amber-300 cursor-pointer"
                      title="Next Paragraph"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Reading Speed Selector (0.5x to 2.0x) & Active Speed Display */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-amber-950 bg-amber-200/70 px-2.5 py-1.5 rounded-xl">
                    Part {activePartNumber} of {totalPartsCount}
                  </span>

                  <div className="flex items-center gap-1.5 bg-white border-2 border-amber-400 rounded-xl px-3 py-1.5 shadow-2xs">
                    <Gauge className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-bold text-slate-600">Reading Speed:</span>
                    <select
                      aria-label="Reading Speed Selector"
                      value={speechRate}
                      onChange={e => handleRateChange(parseFloat(e.target.value))}
                      className="bg-transparent text-xs font-extrabold text-amber-950 focus:outline-hidden cursor-pointer"
                    >
                      {READING_SPEED_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Continuous Story Progress & Current Playback Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-amber-950">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      speechState.isPlaying
                        ? 'bg-emerald-600 text-white'
                        : speechState.isPaused
                        ? 'bg-amber-600 text-white'
                        : speechState.status === 'completed'
                        ? 'bg-indigo-600 text-white'
                        : speechState.status === 'stopped'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {speechState.isPlaying
                      ? '● Playing'
                      : speechState.isPaused
                      ? '⏸ Paused'
                      : speechState.status === 'completed'
                      ? '✓ Completed'
                      : speechState.status === 'stopped'
                      ? '■ Stopped'
                      : 'Ready'}
                  </span>
                  <span>
                    {speechState.isPlaying
                      ? `Part ${activePartNumber} of ${totalPartsCount} (Sentence ${(speechState.currentSentenceIndex || 0) + 1} of ${speechState.totalSentencesInParagraph || 1}) • ${getReadingSpeedLabel(speechRate)}`
                      : speechState.isPaused
                      ? `Paused at Part ${activePartNumber} of ${totalPartsCount} (Sentence ${(speechState.currentSentenceIndex || 0) + 1}) • ${getReadingSpeedLabel(speechRate)}`
                      : speechState.status === 'completed'
                      ? `Completed Full Story (${totalPartsCount} of ${totalPartsCount} Parts) • ${getReadingSpeedLabel(speechRate)}`
                      : speechState.status === 'stopped'
                      ? `Audio Stopped • Ready to Play (${totalPartsCount} Parts) • ${getReadingSpeedLabel(speechRate)}`
                      : `Ready to Play Complete Story (${totalPartsCount} Parts) • ${getReadingSpeedLabel(speechRate)}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                  <div className="flex-1 h-2 bg-amber-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${speechState.progressPercent || 0}%` }}
                    />
                  </div>
                  <span>{speechState.progressPercent || 0}%</span>
                </div>
              </div>

              {/* Voice Availability Warning if device lacks native voice pack */}
              {speechState.voiceWarning && (
                <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300 flex items-center gap-2 text-xs text-amber-950 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>{speechState.voiceWarning}</span>
                </div>
              )}

              {/* Audio Error with Retry Banner if needed */}
              {speechState.error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between text-xs text-red-700">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{speechState.error}</span>
                  </div>
                  <button
                    onClick={() => speechService.retry()}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              )}
            </div>

            {/* Story Paragraphs with Synchronized Paragraph & Sentence Audio Highlighting */}
            <div className="space-y-4 text-slate-800 leading-relaxed text-sm sm:text-base">
              {bodyParagraphs.map((p, idx) => {
                const paraIndexInSpeech = idx + 1; // 0 is Title, 1..N is bodyParagraphs, N+1 is Moral
                const isParaActive =
                  (speechState.isPlaying || speechState.isPaused) &&
                  activeParaIndex === paraIndexInSpeech;
                const sentences = speechService.splitParagraphIntoSentences(p, selectedLanguage);

                return (
                  <div
                    key={idx}
                    ref={isParaActive ? activeParagraphRef : null}
                    onClick={() => startFromParagraph(paraIndexInSpeech)}
                    className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                      isParaActive && speechState.isPlaying
                        ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400/40 scale-[1.005]'
                        : isParaActive
                        ? 'bg-amber-50 border-amber-400'
                        : 'bg-white hover:bg-amber-50/40 border-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          startFromParagraph(paraIndexInSpeech);
                        }}
                        className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isParaActive && speechState.isPlaying
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                        title="Play from this paragraph"
                      >
                        {isParaActive && speechState.isPlaying ? (
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <Play className="w-3 h-3 ml-0.5" />
                        )}
                      </button>
                      <p className="flex-1 font-serif text-slate-800 font-medium leading-relaxed">
                        {sentences.map((sentence, sIdx) => {
                          const isSentenceActive = isParaActive && speechState.currentSentenceIndex === sIdx;
                          return (
                            <span
                              key={sIdx}
                              className={`transition-colors rounded ${
                                isSentenceActive
                                  ? 'bg-amber-300/90 text-slate-950 font-bold px-1 py-0.5 shadow-2xs underline decoration-amber-700 decoration-2 underline-offset-4'
                                  : ''
                              }`}
                            >
                              {sentence}{sIdx < sentences.length - 1 ? ' ' : ''}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Moral of the Story Card (narrated automatically as the final part) */}
            {(() => {
              const moralIdx = bodyParagraphs.length + 1;
              const isMoralActive =
                (speechState.isPlaying || speechState.isPaused) &&
                activeParaIndex === moralIdx;
              return (
                <div
                  ref={isMoralActive ? activeParagraphRef : null}
                  onClick={() => startFromParagraph(moralIdx)}
                  className={`rounded-2xl p-5 transition-all cursor-pointer border ${
                    isMoralActive
                      ? 'bg-amber-200/90 border-amber-600 shadow-md ring-2 ring-amber-500/40'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-2">
                        <span>
                          {selectedLanguage === 'Marathi'
                            ? 'या कथेतून शिवरायांची शिकवण (Moral Lesson):'
                            : selectedLanguage === 'Hindi'
                            ? 'इस प्रसंग की अमर सीख (Moral Lesson):'
                            : 'Moral of this Chapter:'}
                        </span>
                        {isMoralActive && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-700 text-white text-[10px]">
                            🔊 Reading Moral
                          </span>
                        )}
                      </h4>
                      <p
                        className={`text-sm sm:text-base font-bold text-amber-950 mt-1 leading-snug ${
                          isMoralActive ? 'underline decoration-amber-700 decoration-2 underline-offset-4' : ''
                        }`}
                      >
                        &ldquo;{moralText}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Story Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <button
                onClick={() => {
                  if (activeStoryIndex > 0) setActiveStoryIndex(activeStoryIndex - 1);
                }}
                disabled={activeStoryIndex === 0}
                className="px-4 py-2 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Story
              </button>

              <button
                onClick={() => markAsCompleted(currentStory.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Story Completed
              </button>

              <button
                onClick={() => {
                  if (activeStoryIndex < SHIVAJI_STORIES.length - 1) setActiveStoryIndex(activeStoryIndex + 1);
                }}
                disabled={activeStoryIndex >= SHIVAJI_STORIES.length - 1}
                className="px-4 py-2 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                Next Story
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 50 Stories Chronological Index (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-md space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-display font-extrabold text-slate-900 text-sm">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>५० अमृतकथांची अनुक्रमणिका</span>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                1630 - 1680 CE
              </span>
            </div>

            {/* Search stories */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search story, fort, or year..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-amber-50/50 border border-amber-200 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            {/* Scrollable List of 50 Stories */}
            <div className="max-h-[560px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredStories.map(story => {
                const isSelected = SHIVAJI_STORIES[activeStoryIndex]?.id === story.id;
                const isDone = completedStories[story.id];

                return (
                  <button
                    key={story.id}
                    onClick={() => {
                      const idx = SHIVAJI_STORIES.findIndex(s => s.id === story.id);
                      if (idx !== -1) setActiveStoryIndex(idx);
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-400 text-amber-950 font-bold shadow-xs'
                        : 'bg-white hover:bg-amber-50/70 border-amber-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {story.order}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-xs truncate font-bold text-slate-900">
                          {story.title[selectedLanguage]}
                        </p>
                        <p className="text-[10px] text-amber-800 truncate">
                          {story.year} • {story.location}
                        </p>
                      </div>
                    </div>

                    {isDone && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
