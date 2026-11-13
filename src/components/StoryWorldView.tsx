import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { StoryItem } from '../types';
import {
  speechService,
  SpeechParagraphState,
  READING_SPEED_OPTIONS,
  getReadingSpeedLabel
} from '../services/speechService';
import { 
  Play, 
  Pause, 
  Square,
  RotateCcw, 
  Volume2, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  X, 
  SkipForward, 
  SkipBack, 
  AlertCircle,
  RefreshCw,
  Award,
  Gauge
} from 'lucide-react';

export const StoryWorldView: React.FC = () => {
  const { allStories, currentStudent, markStoryCompleted } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi' | 'Marathi'>('English');
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  // Persistent reading speed across paragraphs, chunks, and stories (defaults to 1.0x – Normal)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(() => speechService.getRate() || 1.0);
  const [volume] = useState<number>(1.0);

  // Audio player state
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

  // Comprehension quiz inside story reader
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Ref to active paragraph to scroll smoothly into view during long stories
  const activeParagraphRef = useRef<HTMLElement | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Stop audio when switching stories or closing modal, while keeping selected reading speed intact
  useEffect(() => {
    speechService.stop();
    setSpeechState({
      isPlaying: false,
      isPaused: false,
      status: 'idle',
      currentParagraphIndex: 0,
      totalParagraphs: selectedStory ? selectedStory.content.length + 2 : 0,
      currentSentenceIndex: 0,
      totalSentencesInParagraph: 1,
      currentChunkIndex: 0,
      totalChunks: 0,
      progressPercent: 0,
      rate: playbackSpeed
    });
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [selectedStory]);

  // Keep active paragraph in view while speaking
  useEffect(() => {
    if (speechState.isPlaying && activeParagraphRef.current) {
      activeParagraphRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [speechState.currentParagraphIndex, speechState.isPlaying]);

  const filteredStories = allStories.filter(s => s.language === selectedLanguage);

  // Assemble full narrative paragraphs from first word to final word: [Title, ...content, Moral]
  const getStoryParagraphs = (story: StoryItem): string[] => {
    const list: string[] = [];
    list.push(story.title);
    story.content.forEach(p => list.push(p));
    const moralPrefix =
      story.language === 'Marathi'
        ? 'या गोष्टीचे तात्पर्य: '
        : story.language === 'Hindi'
        ? 'इस कहानी की सीख: '
        : 'Moral of the story: ';
    list.push(`${moralPrefix}${story.moral}`);
    return list;
  };

  const startStoryFromIndex = (startIndex: number = 0) => {
    if (!selectedStory) return;
    const paragraphs = getStoryParagraphs(selectedStory);
    speechService.setRate(playbackSpeed);
    speechService.setVolume(volume);

    speechService.startStoryNarration(
      paragraphs,
      selectedStory.language,
      (state) => {
        setSpeechState(state);
      },
      () => {
        // Complete story audio finished from first word to final word!
        markStoryCompleted(selectedStory.id);
      },
      startIndex
    );
  };

  const handlePlayAudio = () => {
    if (!selectedStory) return;

    if (speechState.isPaused) {
      speechService.resume();
      return;
    }

    const startIdx =
      speechState.status === 'completed' || speechState.status === 'stopped'
        ? 0
        : speechState.currentParagraphIndex || 0;
    startStoryFromIndex(startIdx);
  };

  const handlePauseAudio = () => {
    speechService.pause();
  };

  const handleResumeAudio = () => {
    speechService.resume();
  };

  const handleStopAudio = () => {
    speechService.stop();
    if (selectedStory) {
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
    }
  };

  const handleRestartAudio = () => {
    startStoryFromIndex(0);
  };

  const handleForwardParagraph = () => {
    if (!selectedStory) return;
    const total = selectedStory.content.length + 2;
    if (speechState.currentParagraphIndex + 1 < total) {
      if (speechState.isPlaying || speechState.isPaused) {
        speechService.jumpToParagraph(speechState.currentParagraphIndex + 1);
      } else {
        startStoryFromIndex(speechState.currentParagraphIndex + 1);
      }
    }
  };

  const handleRewindParagraph = () => {
    if (speechState.currentParagraphIndex > 0) {
      if (speechState.isPlaying || speechState.isPaused) {
        speechService.jumpToParagraph(speechState.currentParagraphIndex - 1);
      } else {
        startStoryFromIndex(speechState.currentParagraphIndex - 1);
      }
    } else {
      startStoryFromIndex(0);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    speechService.setRate(newSpeed);
  };

  const handleRetryAudio = () => {
    startStoryFromIndex(speechState.currentParagraphIndex || 0);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitStoryQuiz = () => {
    setQuizSubmitted(true);
    if (selectedStory) {
      markStoryCompleted(selectedStory.id);
    }
  };

  const totalPartsCount = selectedStory ? selectedStory.content.length + 2 : 0;
  const activePartNumber = Math.min((speechState.currentParagraphIndex || 0) + 1, Math.max(1, totalPartsCount));

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header and Language Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                Story World (45 Complete Audio Stories)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Listen to complete stories from first word to final word in Indian English, Hindi, and Marathi with live sentence &amp; paragraph highlighting and 6 reading speeds (0.5x to 2.0x)!
            </p>
          </div>

          {/* Stories completed count badge */}
          <div className="bg-amber-100/70 border border-amber-300 text-amber-900 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{currentStudent?.completedStoryIds.length || 0} / 45 Stories Completed</span>
          </div>
        </div>

        {/* 3 Language Tabs: English (15), Hindi (15), Marathi (15) */}
        <div className="flex items-center gap-2 bg-amber-50 p-1.5 rounded-2xl border border-amber-200 max-w-md">
          <button
            onClick={() => {
              speechService.stop();
              setSelectedLanguage('English');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedLanguage === 'English' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-amber-900'}`}
          >
            English (15 Stories)
          </button>
          <button
            onClick={() => {
              speechService.stop();
              setSelectedLanguage('Hindi');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedLanguage === 'Hindi' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-amber-900'}`}
          >
            हिन्दी (15 कहानियाँ)
          </button>
          <button
            onClick={() => {
              speechService.stop();
              setSelectedLanguage('Marathi');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedLanguage === 'Marathi' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-amber-900'}`}
          >
            मराठी (15 गोष्टी)
          </button>
        </div>
      </div>

      {/* Story Cards Grid (15 items per tab) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStories.map((story, idx) => {
          const isCompleted = currentStudent?.completedStoryIds.includes(story.id);

          return (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    Story #{idx + 1} • {story.classRecommendation}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
                  {story.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                  {story.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {story.estimatedReadMinutes} min read
                </span>
                <span className="flex items-center gap-1 text-amber-700 group-hover:translate-x-1 transition-transform">
                  Full Audio Story 🎧
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPLETE STORY READER & AUDIO NARRATION MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-amber-300 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div
              onClick={() => startStoryFromIndex(0)}
              className={`bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 shadow-xs cursor-pointer transition-all ${
                (speechState.isPlaying || speechState.isPaused) && speechState.currentParagraphIndex === 0
                  ? 'ring-4 ring-inset ring-emerald-300'
                  : ''
              }`}
              title="Click to play story from the title"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-white/20 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                    {selectedStory.language} Story World
                  </span>
                  <span className="bg-black/20 px-2.5 py-0.5 rounded text-[11px] font-bold">
                    Speed: {getReadingSpeedLabel(playbackSpeed)}
                  </span>
                  {speechState.isPlaying && speechState.currentParagraphIndex === 0 && (
                    <span className="bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse">
                      🔊 Reading Title...
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold mt-1">
                  {selectedStory.title}
                </h2>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStory(null);
                }}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Complete Audio Narration Toolbar: Play, Pause, Resume, Stop, Restart, Reading Speed */}
            <div className="bg-amber-100/90 px-4 sm:px-6 py-3.5 border-b border-amber-200 space-y-2.5 shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Playback Controls: Play, Pause, Resume, Stop, Restart, Prev/Next */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {/* Play Button */}
                  {!speechState.isPlaying && !speechState.isPaused && (
                    <button
                      onClick={handlePlayAudio}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Play</span>
                    </button>
                  )}

                  {/* Pause Button */}
                  {speechState.isPlaying && (
                    <button
                      onClick={handlePauseAudio}
                      className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </button>
                  )}

                  {/* Resume Button */}
                  {speechState.isPaused && (
                    <button
                      onClick={handleResumeAudio}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Resume</span>
                    </button>
                  )}

                  {/* Stop Button */}
                  <button
                    onClick={handleStopAudio}
                    disabled={!speechState.isPlaying && !speechState.isPaused && speechState.status !== 'playing'}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    title="Stop Audio Playback"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Stop</span>
                  </button>

                  {/* Restart Button */}
                  <button
                    onClick={handleRestartAudio}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs border border-amber-300 cursor-pointer flex items-center gap-1.5"
                    title="Restart story from first word"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-900" />
                    <span>Restart</span>
                  </button>

                  {/* Rewind paragraph */}
                  <button
                    onClick={handleRewindParagraph}
                    disabled={speechState.currentParagraphIndex === 0}
                    className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 text-xs border border-amber-300 disabled:opacity-40 cursor-pointer"
                    title="Previous Paragraph"
                  >
                    <SkipBack className="w-4 h-4 text-amber-900" />
                  </button>

                  {/* Forward paragraph */}
                  <button
                    onClick={handleForwardParagraph}
                    disabled={speechState.currentParagraphIndex >= (selectedStory.content.length + 1)}
                    className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 text-xs border border-amber-300 disabled:opacity-40 cursor-pointer"
                    title="Next Paragraph"
                  >
                    <SkipForward className="w-4 h-4 text-amber-900" />
                  </button>
                </div>

                {/* Reading Speed Selector (0.5x to 2.0x) & Voice Info */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border-2 border-amber-400 shadow-2xs">
                    <Gauge className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="text-slate-600">Reading Speed:</span>
                    <select
                      aria-label="Reading Speed Selector"
                      value={playbackSpeed}
                      onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                      className="bg-transparent font-extrabold text-amber-950 focus:outline-hidden cursor-pointer"
                    >
                      {READING_SPEED_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-300">
                    <Volume2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>
                      {selectedStory.language === 'English'
                        ? 'Indian English Female Voice'
                        : selectedStory.language === 'Hindi'
                        ? 'Natural Hindi Female Voice'
                        : 'Natural Marathi Female Voice'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Continuous Story Progress & Playback Status Bar */}
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
                      ? `Part ${activePartNumber} of ${totalPartsCount} (Sentence ${(speechState.currentSentenceIndex || 0) + 1} of ${speechState.totalSentencesInParagraph || 1}) • ${getReadingSpeedLabel(playbackSpeed)}`
                      : speechState.isPaused
                      ? `Paused at Part ${activePartNumber} of ${totalPartsCount} (Sentence ${(speechState.currentSentenceIndex || 0) + 1}) • ${getReadingSpeedLabel(playbackSpeed)}`
                      : speechState.status === 'completed'
                      ? `Finished Complete Story (${totalPartsCount} of ${totalPartsCount} Parts) • ${getReadingSpeedLabel(playbackSpeed)}`
                      : speechState.status === 'stopped'
                      ? `Audio Stopped • Ready to Play (${totalPartsCount} Parts) • ${getReadingSpeedLabel(playbackSpeed)}`
                      : `Ready to Play Full Story (${totalPartsCount} Parts) • ${getReadingSpeedLabel(playbackSpeed)}`}
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
            </div>

            {/* Voice Availability Warning Banner if device lacks native voice pack */}
            {speechState.voiceWarning && (
              <div className="bg-amber-50 border-b border-amber-200 p-2.5 px-6 flex items-center gap-2 text-xs text-amber-900 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{speechState.voiceWarning}</span>
              </div>
            )}

            {/* Audio Error with Retry Banner if needed */}
            {speechState.error && (
              <div className="bg-red-50 border-b border-red-200 p-3 px-6 flex items-center justify-between text-xs text-red-700">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{speechState.error}</span>
                </div>
                <button
                  onClick={handleRetryAudio}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry Audio</span>
                </button>
              </div>
            )}

            {/* Scrollable Story Content & Comprehension */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Full Story Paragraphs with Synchronized Paragraph & Sentence Highlighting */}
              <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed font-serif">
                {selectedStory.content.map((para, i) => {
                  const paraIndexInSpeech = i + 1; // 0 is title, 1..N is content, N+1 is moral
                  const isParaActive =
                    (speechState.isPlaying || speechState.isPaused) &&
                    speechState.currentParagraphIndex === paraIndexInSpeech;
                  const sentences = speechService.splitParagraphIntoSentences(para, selectedStory.language);

                  return (
                    <p
                      key={i}
                      ref={isParaActive ? (el) => { activeParagraphRef.current = el; } : null}
                      onClick={() => startStoryFromIndex(paraIndexInSpeech)}
                      className={`text-justify p-3.5 rounded-2xl transition-all cursor-pointer ${
                        isParaActive 
                          ? 'bg-amber-100/90 border-2 border-amber-500 shadow-sm text-slate-950 font-medium scale-[1.005]' 
                          : 'hover:bg-amber-50/50 border border-transparent'
                      }`}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-sans font-bold mr-2 align-middle">
                        {i + 1}
                      </span>
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
                  );
                })}
              </div>

              {/* Moral of the Story Card (narrated automatically as the final paragraph) */}
              {(() => {
                const moralParaIndex = selectedStory.content.length + 1;
                const isMoralActive =
                  (speechState.isPlaying || speechState.isPaused) &&
                  speechState.currentParagraphIndex === moralParaIndex;

                return (
                  <div 
                    ref={isMoralActive ? (el) => { activeParagraphRef.current = el; } : null}
                    onClick={() => startStoryFromIndex(moralParaIndex)}
                    className={`p-5 rounded-2xl transition-all cursor-pointer ${
                      isMoralActive 
                        ? 'bg-amber-200 border-2 border-amber-600 shadow-md scale-[1.01]' 
                        : 'bg-amber-50 border-2 border-amber-300/80'
                    }`}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Moral &amp; Learning Message
                      {isMoralActive && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px]">
                          🔊 Reading Moral
                        </span>
                      )}
                    </span>
                    <p
                      className={`text-amber-950 font-bold text-sm sm:text-base leading-snug ${
                        isMoralActive ? 'underline decoration-amber-700 decoration-2 underline-offset-4' : ''
                      }`}
                    >
                      &ldquo;{selectedStory.moral}&rdquo;
                    </p>
                  </div>
                );
              })()}

              {/* Important Vocabulary Cards */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Important Vocabulary &amp; Meanings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStory.vocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                      <span className="font-bold text-amber-900 block">{vocab.word}</span>
                      <span className="text-slate-600">{vocab.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Comprehension Questions */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">
                    5 Comprehension Questions
                  </h4>
                  <span className="text-xs text-slate-500">Test your reading comprehension</span>
                </div>

                <div className="space-y-4">
                  {selectedStory.questions.map((q, qIndex) => {
                    const chosen = quizAnswers[q.id];
                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2.5 text-xs sm:text-sm">
                        <p className="font-bold text-slate-900">
                          {qIndex + 1}. {q.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIndex) => {
                            const isChosen = chosen === optIndex;
                            const isCorrect = optIndex === q.correctIndex;

                            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-amber-300';
                            if (quizSubmitted) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-red-100 border-red-300 text-red-900 font-bold';
                              } else {
                                btnStyle = 'bg-white/50 border-slate-200 text-slate-400';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-amber-600 border-amber-600 text-white font-bold';
                            }

                            return (
                              <button
                                key={optIndex}
                                disabled={quizSubmitted}
                                onClick={() => handleSelectQuizOption(q.id, optIndex)}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${btnStyle}`}
                              >
                                <span>{String.fromCharCode(65 + optIndex)}. {opt}</span>
                                {quizSubmitted && isCorrect && <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs text-slate-600">
                            <strong className="text-amber-900">Explanation: </strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitStoryQuiz}
                    disabled={Object.keys(quizAnswers).length < selectedStory.questions.length}
                    className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Story Quiz &amp; Earn 25 Champion Points</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                    <p className="font-bold text-emerald-900 text-sm">
                      🎉 Great reading! Story and comprehension questions completed!
                    </p>
                    <p className="text-xs text-emerald-700">
                      Points added to your Champion Profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
